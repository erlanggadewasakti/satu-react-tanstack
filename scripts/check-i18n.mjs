import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enPath = path.resolve(__dirname, '../src/utils/locales/en.json');
const idPath = path.resolve(__dirname, '../src/utils/locales/id.json');

function checkI18nParity() {
  console.log('🔍 Checking i18n translation key parity between en.json and id.json...');

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

  let hasErrors = false;

  if (missingInId.length > 0) {
    hasErrors = true;
    console.error(`\n❌ Missing ${missingInId.length} key(s) in id.json:`);
    missingInId.forEach((k) => console.error(`   - "${k}" (Defined in en.json)`));
  }

  if (missingInEn.length > 0) {
    hasErrors = true;
    console.error(`\n❌ Missing ${missingInEn.length} key(s) in en.json:`);
    missingInEn.forEach((k) => console.error(`   - "${k}" (Defined in id.json)`));
  }

  if (emptyInEn.length > 0) {
    hasErrors = true;
    console.error(`\n❌ Empty translation value(s) in en.json for keys:`);
    emptyInEn.forEach((k) => console.error(`   - "${k}"`));
  }

  if (emptyInId.length > 0) {
    hasErrors = true;
    console.error(`\n❌ Empty translation value(s) in id.json for keys:`);
    emptyInId.forEach((k) => console.error(`   - "${k}"`));
  }

  if (hasErrors) {
    console.error('\n💥 i18n parity check FAILED! Please provide translations for both languages.');
    process.exit(1);
  }

  console.log(`✅ Success: All ${enKeys.length} translation keys are perfectly aligned between en.json and id.json!\n`);
}

checkI18nParity();
