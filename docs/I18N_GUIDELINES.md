# Panduan Standar Internationalization (i18n) & Multi-Bahasa

Aplikasi **SATU / LENS** menggunakan sistem lokalisasi **2 Bahasa Wajib**: **Bahasa Indonesia (`id`)** dan **Bahasa Inggris (`en`)**. Seluruh teks antarmuka pengguna diatur oleh pustaka `react-intl` dengan jaminan keselarasan kunci 100% dan penegakan tipe data statis (*compile-time type-safety*).

---

## ⚠️ Aturan Utama (Guardrail Wajib Diikuti)

1. **Paritas Kunci 100% (Strict Key Parity)**:
   Setiap key baru yang ditambahkan ke salah satu bahasa **WAJIB** ditambahkan ke bahasa lainnya:
   - [`src/utils/locales/id.json`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/utils/locales/id.json) (Bahasa Indonesia — Formal & Baku)
   - [`src/utils/locales/en.json`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/utils/locales/en.json) (Bahasa Inggris — Standar Terminologi OBE Internasional)
2. **Dilarang Fallback Default (`defaultMessage`)**:
   Dilarang keras menggunakan prop `defaultMessage` pada `<FormattedMessage>` maupun di `intl.formatMessage()`. Kebijakan ini diterapkan agar terjemahan yang hilang tidak pernah disamarkan oleh fallback sementara.
3. **Zero Raw Strings di JSX**:
   Dilarang menulis teks antarmuka langsung seperti `<Button>Simpan</Button>` atau `<Typography>Selamat Datang</Typography>`. Seluruh teks yang tampil ke pengguna wajib dibungkus oleh komponen terjemahan.
4. **Zero Empty Translations**:
   Jangan pernah meninggalkan nilai terjemahan dalam kondisi string kosong `""`.

---

## 📁 Struktur File & Jaminan Tipe TypeScript

```
src/
├── utils/
│   └── locales/
│       ├── en.json         <-- Kamus Bahasa Inggris (Basis Definisi Type)
│       └── id.json         <-- Kamus Bahasa Indonesia
├── types/
│   └── i18n.ts             <-- Penegakan compile-time types FormatjsIntl
scripts/
└── check-i18n.mjs          <-- Skrip validasi CLI (Parity Checker)
```

### Penegakan Tipe Statis & Autocomplete (`src/types/i18n.ts`)

Repositori ini secara otomatis menginferensi seluruh key kamus dari file `en.json` untuk menimpa definisi bawaan `FormatjsIntl.Message`:

```typescript
// src/types/i18n.ts
import type enJson from 'utils/locales/en.json';

export type LocaleKey = keyof typeof enJson;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: LocaleKey;
    }
  }
}
```

**Dampak bagi Developer**:
- Editor (VS Code / Antigravity IDE) memberikan **autocomplete instan** untuk seluruh key translation saat mengetik `<FormattedMessage id="..." />`.
- Jika Anda salah mengetikkan key atau key tersebut belum terdaftar di `en.json`, TypeScript akan langsung memunculkan garis merah (*compile-time type error*).

---

## 💡 Panduan Penggunaan di Komponen

### 1. Menggunakan `<FormattedMessage />` (Untuk Elemen Teks JSX)

Gunakan `<FormattedMessage />` untuk judul, paragraf, label tombol, dan teks yang mendukung interpolasi variabel atau tag HTML:

```tsx
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormattedMessage } from 'react-intl';

export default function WelcomeCard({ username }: { username: string }) {
  return (
    <div>
      {/* Teks statis */}
      <Typography variant="h4">
        <FormattedMessage id="kurikulum.home-title" />
      </Typography>

      {/* Teks dengan interpolasi variabel & formatting kaya */}
      <Typography variant="body1">
        <FormattedMessage
          id="home.welcome-user"
          values={{
            username,
            bold: (chunks) => <strong>{chunks}</strong>
          }}
        />
      </Typography>

      <Button variant="contained">
        <FormattedMessage id="common.save" />
      </Button>
    </div>
  );
}
```

---

### 2. Menggunakan Hook `useIntl()` (Untuk Props Berupa Tipe `string`)

Komponen tertentu memerlukan nilai bertipe murni `string` (misalnya: properti `title` pada `MainCard`, `placeholder`, `label` TextField, atau pesan Formik/Yup):

```tsx
import TextField from '@mui/material/TextField';
import { useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function SearchForm() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'kurikulum.home-title' })}>
      <TextField
        fullWidth
        label={intl.formatMessage({ id: 'form.search-label' })}
        placeholder={intl.formatMessage({ id: 'form.search-placeholder' })}
        helperText={intl.formatMessage({ id: 'form.search-helper' })}
      />
    </MainCard>
  );
}
```

---

### 3. Mendaftarkan Menu Navigasi di `src/menu-items/`

Properti `title` pada objek `NavItemType` di file konfigurasi menu wajib menggunakan ID key terjemahan yang ada pada `id.json` dan `en.json`:

```typescript
// src/menu-items/kurikulum.ts
import { NavItemType } from 'types/menu';

const kurikulumMenuItems: NavItemType = {
  id: 'group-kurikulum',
  title: 'group-kurikulum', // Otomatis diterjemahkan oleh NavGroup
  type: 'group',
  children: [
    {
      id: 'kurikulum-home',
      title: 'kurikulum-home', // Otomatis diterjemahkan oleh NavItem
      type: 'item',
      url: '/kurikulum/home'
    }
  ]
};

export default kurikulumMenuItems;
```

---

## 🛡️ 3 Lapis Deteksi Error Terjemahan

Jika pengembang atau AI agent lupa menambahkan terjemahan pada salah satu bahasa, sistem memiliki 3 lapis perlindungan aktif:

1. **Lapis 1 — Validasi CLI Otomatis (`scripts/check-i18n.mjs`)**:
   Berjalan secara otomatis sebelum `bun run dev` dan `bun run build`. Skrip akan menghentikan proses (*exit code 1*) jika ditemukan ketimpangan kunci:
   ```bash
   ❌ Missing 1 key(s) in id.json:
      - "keuangan-home" (Defined in en.json)
   💥 i18n parity check FAILED! Please provide translations for both languages.
   ```

2. **Lapis 2 — Live HMR Watcher di Vite (`i18nParityPlugin`)**:
   Dikonfigurasi di [`vite.config.mts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/vite.config.mts). Setiap kali file `id.json` atau `en.json` disimpan, terminal development langsung menampilkan peringatan warna merah jika terdapat kunci yang tidak seimbang.

3. **Lapis 3 — Dev Runtime Error Throwing ([`src/components/Locales.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/components/Locales.tsx))**:
   Jika ada key yang dipanggil di UI namun tidak terdaftar pada file kamus locale aktif, `IntlProvider` secara sengaja melempar uncaught `Error` di mode development peramban:
   ```text
   [i18n Error] Missing translation for key: "keuangan-home" in locale: "id". Please add it to id.json.
   ```

---

## 🔍 Perintah Pemeriksaan Mandiri

Jalankan perintah ini untuk memastikan seluruh kamus terjemahan sinkron dan bebas dari kesalahan kompilasi:

```bash
# Validasi keselarasan key kamus (ID & EN)
bun run check:i18n

# Validasi static type TypeScript untuk seluruh pemanggilan i18n
bun x tsc --noEmit
```
