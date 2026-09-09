import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { devtools } from '@tanstack/devtools-vite';
import react from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig, loadEnv, Plugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function i18nParityPlugin(): Plugin {
  const checkParity = () => {
    const enPath = path.resolve(__dirname, 'src/utils/locales/en.json');
    const idPath = path.resolve(__dirname, 'src/utils/locales/id.json');

    if (!fs.existsSync(enPath) || !fs.existsSync(idPath)) return;

    try {
      const enData = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
      const idData = JSON.parse(fs.readFileSync(idPath, 'utf-8'));

      const enKeys = Object.keys(enData);
      const idKeys = Object.keys(idData);

      const missingInId = enKeys.filter((k) => !(k in idData));
      const missingInEn = idKeys.filter((k) => !(k in enData));

      if (missingInId.length > 0 || missingInEn.length > 0) {
        console.error('\n\x1b[31m%s\x1b[0m', '💥 [i18n Parity Warning] Missing translations detected:');
        if (missingInId.length > 0) {
          console.error('\x1b[33m%s\x1b[0m', `   Missing in id.json (${missingInId.length}): ${missingInId.map((k) => `"${k}"`).join(', ')}`);
        }
        if (missingInEn.length > 0) {
          console.error('\x1b[33m%s\x1b[0m', `   Missing in en.json (${missingInEn.length}): ${missingInEn.map((k) => `"${k}"`).join(', ')}`);
        }
        console.error('');
      } else {
        console.log('\x1b[32m%s\x1b[0m', '✅ [i18n] All translation keys are synchronized between en.json and id.json');
      }
    } catch (e: any) {
      console.error('[i18n] Error reading locale files:', e.message);
    }
  };

  return {
    name: 'vite-plugin-i18n-parity',
    buildStart() {
      checkParity();
    },
    handleHotUpdate({ file }) {
      if (file.endsWith('en.json') || file.endsWith('id.json')) {
        checkParity();
      }
    }
  };
}

function sanitizeUrlPlugin(): Plugin {
  const sanitize = (req: any, res: any, next: any) => {
    if (req.url && req.url.startsWith('//')) {
      const cleanPath = req.url.replace(/^\/+/, '/');
      if (req.method === 'GET' && req.headers.accept?.includes('text/html')) {
        res.writeHead(301, { Location: cleanPath });
        res.end();
        return;
      }
      req.url = cleanPath;
    }
    next();
  };

  return {
    name: 'vite-plugin-sanitize-url',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(sanitize);
    },
    configurePreviewServer(server) {
      server.middlewares.use(sanitize);
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const rawBase = (env.VITE_APP_BASE_NAME || '/').trim();
  const base = rawBase === '' || rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
  const PORT = 3000;

  return {
    server: {
      open: true,
      port: PORT,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    resolve: {
      alias: []
    },
    base,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/@mui') || id.includes('node_modules/@emotion')) {
              return 'vendor-mui';
            }
            if (id.includes('node_modules/iconsax-reactjs')) {
              return 'vendor-icons';
            }
            if (id.includes('node_modules/@tanstack')) {
              return 'vendor-tanstack';
            }
          }
        }
      }
    },
    plugins: [
      sanitizeUrlPlugin(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true
      }),
      devtools(),
      react(),
      tsconfigPaths(),
      i18nParityPlugin(),
      nitro({
        baseURL: base,
        preset: 'bun'
      })
    ]
  };
});
