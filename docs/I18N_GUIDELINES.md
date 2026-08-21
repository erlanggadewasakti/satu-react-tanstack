# Panduan Standar Internationalization (i18n) & Multi-Bahasa

Aplikasi ini menggunakan sistem lokalisasi **2 Bahasa Wajib**: **Bahasa Indonesia (`id`)** dan **Bahasa Inggris (`en`)**.

---

## ⚠️ ATURAN UTAMA (WAJIB DIIKUTI)

1. **Wajib Kedua Bahasa**: Setiap teks/label/pesan/judul/menu/tombol baru yang dibuat di UI **HARUS** didaftarkan di **KEDUA** file kamus:
   - `src/utils/locales/id.json` (Bahasa Indonesia)
   - `src/utils/locales/en.json` (Bahasa Inggris)
2. **Dilarang Fallback Default**: Jangan menggunakan `defaultMessage` di `<FormattedMessage>` atau `intl.formatMessage()`. Jika suatu key tidak memiliki terjemahan di salah satu bahasa, sistem akan **melempar error (throw error)** secara sengaja.
3. **Zero Untranslated Keys**: Jangan biarkan nilai translation kosong `""`.

---

## 📁 Struktur File & Kamus Bahasa

```
src/
├── utils/
│   └── locales/
│       ├── en.json      <-- Kamus Bahasa Inggris (Academic/OBE Terminology)
│       └── id.json      <-- Kamus Bahasa Indonesia (Baku & Formal)
├── types/
│   └── i18n.ts          <-- Strict TypeScript key definition & global types
scripts/
└── check-i18n.mjs       <-- Skrip validasi keselarasan key (Parity Checker)
```

---

## 💡 Cara Penggunaan di Komponen (Contoh Kode)

### 1. Menggunakan `<FormattedMessage />` (Direkomendasikan untuk JSX/HTML)

```tsx
import { FormattedMessage } from 'react-intl';

export default function MyComponent() {
  return (
    <div>
      {/* Label/Judul Biasa */}
      <h1><FormattedMessage id="kurikulum.title" /></h1>

      {/* Dengan Interpolasi Variabel / Tag HTML */}
      <p>
        <FormattedMessage
          id="home.welcome-user"
          values={{
            username: 'Erlangga',
            strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>
          }}
        />
      </p>
    </div>
  );
}
```

### 2. Menggunakan Hook `useIntl()` (Untuk Props String, Placeholder, Validation, Alert)

```tsx
import { useIntl } from 'react-intl';

export default function FormComponent() {
  const intl = useIntl();

  return (
    <TextField
      label={intl.formatMessage({ id: 'form.username-label' })}
      placeholder={intl.formatMessage({ id: 'form.username-placeholder' })}
      helperText={intl.formatMessage({ id: 'form.username-helper' })}
    />
  );
}
```

### 3. Mendaftarkan Menu Navigasi di `src/menu-items/`

Gunakan key translation sebagai `title`:

```typescript
// src/menu-items/kurikulum.ts
const kurikulumMenuItems: NavItemType = {
  id: 'group-kurikulum',
  title: 'menu.kurikulum-group', // Key yang ada di en.json dan id.json
  type: 'group',
  children: [
    {
      id: 'kurikulum-home',
      title: 'menu.kurikulum-home', // Key yang ada di en.json dan id.json
      type: 'item',
      url: '/kurikulum/home'
    }
  ]
};
```

---

## 🛡️ Mekanisme Deteksi & Error

Jika pengembang atau AI agent lupa menambahkan terjemahan di salah satu bahasa, error akan muncul di 3 tempat:

1. **Terminal saat `bun run dev` / `bun run build`**:
   Skrip `scripts/check-i18n.mjs` otomatis berjalan dan menggagalkan eksekusi jika ada key yang tidak sinkron:
   ```bash
   ❌ Missing 1 key(s) in id.json:
      - "feature.new-key" (Defined in en.json)
   💥 i18n parity check FAILED! Please provide translations for both languages.
   ```
2. **Terminal saat Live Coding (Vite Watcher)**:
   Plugin `i18nParityPlugin` di `vite.config.mts` langsung menampilkan peringatan di konsol terminal setiap kali file `.json` disimpan.
3. **Browser Screen (Vite Red Error Overlay)**:
   `IntlProvider` di `Locales.tsx` akan melempar `Error`:
   ```text
   [i18n Error] Missing translation for key: "feature.new-key" in locale: "id". Please add it to id.json.
   ```

---

## 🔍 Perintah Pemeriksaan Mandiri

Jalankan perintah berikut sebelum commit/deploy:

```bash
# Periksa keselarasan kamus terjemahan
bun run check:i18n

# Periksa tipe TypeScript
bun x tsc --noEmit

# Uji coba build produksi
bun run build
```
