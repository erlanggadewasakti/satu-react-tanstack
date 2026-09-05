# Dokumentasi Sistem SATU / LENS (Learning Outcome Based Information System)

Selamat datang di direktori dokumentasi resmi arsitektur, standar pengembangan, dan panduan teknis aplikasi **SATU / LENS**.

Dokumentasi ini disusun untuk membantu developer dan AI coding agent dalam memahami arsitektur, mengikuti konvensi rekayasa perangkat lunak, serta memelihara kualitas kode secara konsisten di seluruh repositori.

---

## 📑 Daftar Dokumentasi

1. **[Dokumentasi Alur & Arsitektur Aplikasi (`ALUR_APLIKASI.md`)](./ALUR_APLIKASI.md)**:
   - Arsitektur modular 8 sub-aplikasi + Universal Home (`/home`).
   - Tabel rute, prefix namespace URL, dan pemetaan hak akses role (`allowedRoles`).
   - Diagram menyeluruh alur navigasi pengguna (User Flow) dan integrasi login JWT.
   - Mekanisme keamanan Role-Based Access Control (RBAC), `AuthGuard`, dan `SubAppGuard` 404.
   - Arsitektur state terpusat (`SubAppProvider`, `SearchProvider`, `JWTProvider`).
   - Fitur Global Omnibox Search (`Ctrl+K` / `Cmd+K`) berbasis Fuse.js bilingual.

2. **[Panduan Pengembangan Sub-Aplikasi & Fitur (`PANDUAN_PENGEMBANGAN.md`)](./PANDUAN_PENGEMBANGAN.md)**:
   - Panduan langkah demi langkah (6 langkah lengkap) untuk menambahkan sub-aplikasi baru.
   - Panduan menambahkan halaman baru pada sub-aplikasi yang sudah ada.
   - Panduan pembuatan API Service, registry endpoint terpusat, dan integrasi TanStack Query (`useQuery` & `useMutation`).
   - Pengaturan proteksi role pada individual navigation menu item.
   - Penambahan shortcut pencarian global di `customSearchItems.ts`.
   - Standar perintah build, lint, dan validasi kualitas.

3. **[Panduan Standar Internationalization (`I18N_GUIDELINES.md`)](./I18N_GUIDELINES.md)**:
   - Aturan ketat 100% key parity antara Bahasa Indonesia (`id.json`) dan Bahasa Inggris (`en.json`).
   - Penegakan compile-time type-safety & autocomplete melalui `src/types/i18n.ts`.
   - Panduan implementasi menggunakan `<FormattedMessage>` dan `useIntl()`.
   - Larangan penggunaan raw strings dan larangan `defaultMessage` fallback.
   - 3 lapis proteksi error terjemahan (CLI parity checker, Vite HMR plugin, DEV runtime error).

4. **[Panduan Standar Tipografi Enterprise (`TYPOGRAPHY_GUIDELINES.md`)](./TYPOGRAPHY_GUIDELINES.md)**:
   - Skala tipografi resmi enterprise (IBM Carbon, Salesforce Lightning, Microsoft Fluent).
   - Tabel spesifikasi font variant sesuai konfigurasi `src/themes/typography.ts`.
   - Standar token warna teks tema Material UI (`text.primary`, `text.secondary`, `text.disabled`, `common.white`).
   - Standar tipografi tabel data (kolom primer `subtitle1`, format angka `fontVariantNumeric: 'tabular-nums'`).
   - Semantik aksesibilitas (pencegahan heading palsu `<h6>` pada navigasi via `component="span"`).
   - Daftar anti-pattern dan checklist mandiri developer.

---

## 💻 Tech Stack & Tooling

Aplikasi SATU / LENS dibangun dengan fondasi teknologi web modern berstandar enterprise:

| Layer / Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Package Manager & Runtime** | **Bun** (`bun@1.4.1+`) | Runtime & package manager utama untuk instalasi dependensi dan eksekusi skrip |
| **Core Framework** | **React 19** (`19.2.8`) & **TypeScript** (`7.0.2`) | Strict mode TypeScript, React Server/Client compatibility |
| **Build Tool & Server** | **Vite 8** (`8.2.2`) + **Nitro Server** | High-performance bundler, HMR cepat, dan runtime serverless/Nitro backend proxy |
| **Routing Engine** | **TanStack Router** (`@tanstack/react-router` v1) | File-based routing di `src/routes/` dengan code-splitting otomatis (`Loadable`) |
| **Server State & Networking** | **TanStack Query** (`@tanstack/react-query` v5) + **Axios** | Caching, deduplikasi request, optimasi network, dan central API client |
| **UI Framework & Styling** | **Material UI** (`@mui/material` 9.4.0) + **Emotion** | Design system kustom, responsive grid, dynamic theme token switcher, dan RTL support |
| **Iconography** | **iconsax-reactjs** | Koleksi icon bergaya modern dan konsisten |
| **Form Management** | **Formik** (`2.4.9`) + **Yup** (`1.7.1`) | Manajemen form reaktif dengan skema validasi deklaratif |
| **Omnibox & Search** | **Fuse.js** (`7.5.0`) | Mesin pencarian fuzzy client-side cepat dengan index bilingual (`id`/`en`) |
| **Internationalization (i18n)** | **react-intl** (`10.1.26`) | Dual-language parity (`id` dan `en`) dengan type-checking compile-time |
| **Code Quality & Linter** | **Oxlint** + **ESLint** + **Prettier** + **React Doctor** | Rust-powered linting super cepat (`oxlint src`), code formatting, dan triage diagnostik React |

---

## 🚀 Perintah Cepat Pengembang (Cheat Sheet)

```bash
# Instalasi dependensi (wajib menggunakan Bun)
bun install

# Menjalankan development server (Port 3000)
bun run dev

# Memvalidasi 100% keselarasan kamus i18n
bun run check:i18n

# Pengecekan tipe TypeScript secara statis
bun x tsc --noEmit

# Menjalankan linter kode (Oxlint)
bun run lint

# Memperbaiki error linter yang dapat diperbaiki otomatis
bun run lint:fix

# Memformat seluruh kode sumber
bun run prettier

# Menjalankan analisis kesehatan arsitektur React
bun run doctor

# Membangun bundle produksi (generate route tree, validasi i18n & tsc)
bun run build
```
