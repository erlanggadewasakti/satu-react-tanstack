import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enPath = path.resolve(__dirname, '../src/utils/locales/en.json');
const idPath = path.resolve(__dirname, '../src/utils/locales/id.json');
const srcDir = path.resolve(__dirname, '../src');

function getAllFiles(dir, extensions = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, extensions));
    } else {
      const ext = path.extname(filePath);
      if (extensions.includes(ext) && !filePath.endsWith('.d.ts')) {
        results.push(filePath);
      }
    }
  }
  return results;
}

function scanUsedKeys() {
  const files = getAllFiles(srcDir);
  const usedKeys = new Map(); // key -> Set of relative file paths

  // Regex patterns:
  // 1. <FormattedMessage id="key" /> or id={'key'}
  const formattedMessageRegex = /<FormattedMessage[^>]+id=(?:["']([^"']+)["']|\{\s*["']([^"']+)["']\s*\})/g;
  // 2. formatMessage({ id: 'key' })
  const formatMessageRegex = /formatMessage\(\s*\{\s*id:\s*["']([^"']+)["']/g;
  // 3. In menu-items, title: 'key'
  const menuTitleRegex = /title:\s*["']([a-zA-Z0-9_\-\.]+)["']/g;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relPath = path.relative(path.resolve(__dirname, '..'), filePath).replace(/\\/g, '/');

    let match;
    while ((match = formattedMessageRegex.exec(content)) !== null) {
      const key = match[1] || match[2];
      if (key && !key.includes('${')) {
        if (!usedKeys.has(key)) usedKeys.set(key, new Set());
        usedKeys.get(key).add(relPath);
      }
    }

    while ((match = formatMessageRegex.exec(content)) !== null) {
      const key = match[1];
      if (key && !key.includes('${')) {
        if (!usedKeys.has(key)) usedKeys.set(key, new Set());
        usedKeys.get(key).add(relPath);
      }
    }

    if (relPath.includes('src/menu-items/')) {
      while ((match = menuTitleRegex.exec(content)) !== null) {
        const key = match[1];
        if (key && !key.includes('${')) {
          if (!usedKeys.has(key)) usedKeys.set(key, new Set());
          usedKeys.get(key).add(relPath);
        }
      }
    }
  }

  return usedKeys;
}

function checkI18nParity() {
  console.log('🔍 Checking i18n translation key parity and source code usage...\n');

  if (!fs.existsSync(enPath)) {
    console.error(`❌ Error: en.json not found at ${enPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(idPath)) {
    console.error(`❌ Error: id.json not found at ${idPath}`);
    process.exit(1);
  }

  const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const idData = JSON.parse(fs.readFileSync(idPath, 'utf-8'));

  const enKeys = Object.keys(enData);
  const idKeys = Object.keys(idData);

  const missingInId = enKeys.filter((key) => !(key in idData));
  const missingInEn = idKeys.filter((key) => !(key in enData));

  // Check for empty string translations
  const emptyInEn = enKeys.filter((key) => typeof enData[key] !== 'string' || enData[key].trim() === '');
  const emptyInId = idKeys.filter((key) => typeof idData[key] !== 'string' || idData[key].trim() === '');

  // Scan source code for used translation keys
  const usedKeysMap = scanUsedKeys();
  const missingFromDict = [];

  for (const [key, files] of usedKeysMap.entries()) {
    const inEn = key in enData;
    const inId = key in idData;
    if (!inEn || !inId) {
      missingFromDict.push({ key, files: Array.from(files), missingIn: !inEn && !inId ? 'both' : !inEn ? 'en' : 'id' });
    }
  }

  let hasErrors = false;

  if (missingInId.length > 0) {
    hasErrors = true;
    console.error(`❌ Missing ${missingInId.length} key(s) in id.json:`);
    missingInId.forEach((k) => console.error(`   - "${k}" (Defined in en.json)`));
  }

  if (missingInEn.length > 0) {
    hasErrors = true;
    console.error(`❌ Missing ${missingInEn.length} key(s) in en.json:`);
    missingInEn.forEach((k) => console.error(`   - "${k}" (Defined in id.json)`));
  }

  if (emptyInEn.length > 0) {
    hasErrors = true;
    console.error(`❌ Empty translation value(s) in en.json for keys:`);
    emptyInEn.forEach((k) => console.error(`   - "${k}"`));
  }

  if (emptyInId.length > 0) {
    hasErrors = true;
    console.error(`❌ Empty translation value(s) in id.json for keys:`);
    emptyInId.forEach((k) => console.error(`   - "${k}"`));
  }

  if (missingFromDict.length > 0) {
    hasErrors = true;
    console.error(`\n❌ Found ${missingFromDict.length} key(s) used in source code that are missing from translation dictionaries:`);
    missingFromDict.forEach(({ key, files, missingIn }) => {
      console.error(`   - "${key}" (missing in: ${missingIn})`);
      console.error(`     used in: ${files.join(', ')}`);
    });
  }

  if (hasErrors) {
    console.error('\n💥 i18n validation FAILED! Please fix the errors above.');
    process.exit(1);
  }

  console.log(`✅ Success: All ${enKeys.length} translation keys are perfectly aligned between en.json and id.json.`);
  console.log(`✅ Success: All ${usedKeysMap.size} unique keys scanned in source code are registered in both dictionaries!\n`);
}

checkI18nParity();
