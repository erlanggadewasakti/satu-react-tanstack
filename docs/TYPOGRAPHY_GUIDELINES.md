# Panduan & Standar Tipografi Enterprise (Typography Guidelines)

Dokumen ini adalah pedoman resmi untuk AI agent dan software engineer saat membuat komponen baru atau memperbarui komponen yang sudah ada di repositori **SATU / LENS**.

Standar ini diadopsi dari arsitektur desain sistem enterprise (**IBM Carbon Design System**, **Salesforce Lightning Design System**, dan **Microsoft Fluent UI**) untuk menjamin konsistensi visual, keterbacaan (_readability_), aksesibilitas (_a11y_), dan integrasi bebas _layout shift_.

---

## 1. Skala Tipografi Resmi (Typography Scale Reference)

Semua komponen **wajib** menggunakan variant bawaan Material UI yang telah dikonfigurasi di [`src/themes/typography.ts`](../src/themes/typography.ts). Dilarang membuat ukuran font manual sembarangan melalui `sx={{ fontSize: '...' }}`.

| Variant     | Desktop Size      | Mobile Size (`<=600px`) | Weight             | Line Height | Penggunaan Semantik                                               |
| :---------- | :---------------- | :---------------------- | :----------------- | :---------- | :---------------------------------------------------------------- |
| `h1`        | `2.25rem` (36px)  | `1.75rem` (28px)        | **700** (Bold)     | 1.2         | Hero headline halaman login/publik                                |
| `h2`        | `1.875rem` (30px) | `1.5rem` (24px)         | **700** (Bold)     | 1.27        | Judul utama halaman aplikasi (`Page Title`), Judul Card Utama     |
| `h3`        | `1.5rem` (24px)   | `1.25rem` (20px)        | **600** (SemiBold) | 1.33        | Judul section besar, welcome banners                              |
| `h4`        | `1.25rem` (20px)  | `1.25rem` (20px)        | **600** (SemiBold) | 1.4         | Judul sub-section, Card Header sekunder, KPI metrics              |
| `h5`        | `1rem` (16px)     | `1rem` (16px)           | **600** (SemiBold) | 1.5         | Judul card kecil, modal dialog title, widget title                |
| `h6`        | `0.875rem` (14px) | `0.875rem` (14px)       | **600** (SemiBold) | 1.57        | Header tabel, item navigasi sidebar                               |
| `subtitle1` | `0.875rem` (14px) | `0.875rem` (14px)       | **600** (SemiBold) | 1.57        | **Kolom utama tabel (Nama/Kode)**, label tebal, subjudul penting  |
| `subtitle2` | `0.75rem` (12px)  | `0.75rem` (12px)        | **600** (SemiBold) | 1.66        | Sub-header badge, user card name di mini drawer                   |
| `body1`     | `0.875rem` (14px) | `0.875rem` (14px)       | **400** (Regular)  | 1.57        | **Standar teks konten**, paragraf, isi sel tabel, form input      |
| `body2`     | `0.75rem` (12px)  | `0.75rem` (12px)        | **400** (Regular)  | 1.66        | Teks deskripsi pembantu, pesan kosong (_empty state_), modal desc |
| `caption`   | `0.75rem` (12px)  | `0.75rem` (12px)        | **400** (Regular)  | 1.66        | **Metadata**, timestamp/waktu, form helper text, pagination label |
| `overline`  | `0.75rem` (12px)  | `0.75rem` (12px)        | **600** (SemiBold) | 1.57        | **Sidebar group header**, badge kategori UPPERCASE, tracking kbd  |
| `button`    | `0.875rem` (14px) | `0.875rem` (14px)       | **500** (Medium)   | 1.57        | Label tombol interaktif (`textTransform: 'none'`)                 |

---

## 2. Standar Warna Teks (Theme Text Color Tokens)

Gunakan token warna tema Material UI. **Dilarang keras menggunakan hex manual (`#fff`, `#333`) atau `color="secondary"` pada teks.**

| Token Warna      | Kegunaan                                                       | Contoh Kode                                                                         |
| :--------------- | :------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `text.primary`   | Konten utama, heading, active text, nilai form input           | `<Typography variant="body1" color="text.primary">` (atau default tanpa prop color) |
| `text.secondary` | Subjudul, deskripsi bantuan, timestamp, placeholder, copyright | `<Typography variant="body2" color="text.secondary">`                               |
| `text.disabled`  | Placeholder tidak aktif, copyright sekunder, disabled text     | `<Typography variant="caption" color="text.disabled">`                              |
| `common.white`   | Teks di atas background solid gelap (solid chips/dark cards)   | `sx={{ color: 'common.white' }}`                                                    |
| `primary.main`   | Teks tautan penting, link aktif, status brand                  | `<Typography variant="subtitle1" sx={{ color: 'primary.main' }}>`                   |
| `success.main`   | Status sukses, indikator nilai positif                         | `<Typography variant="body2" sx={{ color: 'success.main' }}>`                       |
| `error.main`     | Pesan galat, peringatan kritis                                 | `<Typography variant="caption" sx={{ color: 'error.main' }}>`                       |

> ⚠️ **Peringatan Penting mengenai `color="secondary"`**:
> Di MUI `<Typography color="secondary">` mengarah ke `theme.palette.secondary.main` (warna aksen/ungu), **bukan** warna teks redup. Untuk teks abu-abu/redup, selalu gunakan `color="text.secondary"`.

---

## 3. Penerapan Spesifik per Komponen

### A. Tabel Data (Data Tables)

Mengikuti standar enterprise (_high-density financial & academic tables_):

1. **Header Tabel (`<thead>` / `TableHead`)**:
   - Diatur otomatis oleh `TableCell.head`: `fontSize: '0.75rem'` (12px), `fontWeight: 700`, `textTransform: 'uppercase'`.
2. **Kolom Kunci / Primer (Nama Orang, Judul Kursus, Kode MK)**:
   - Gunakan `variant="subtitle1"` (14px SemiBold) agar data primer paling mudah di-scan oleh mata pengguna.
3. **Kolom Data Biasa (Alamat, Program Studi, Fakultas)**:
   - Gunakan `variant="body1"` (14px Regular) dengan `color="text.secondary"` jika sekunder atau `color="text.primary"` jika primer.
4. **Kolom Angka, Tanggal, dan Kode Unik (Phone, NIM, Tanggal Lahir, Nilai)**:
   - Gunakan `fontVariantNumeric: 'tabular-nums'` agar karakter angka memiliki lebar monospaced vertikal yang rata dan tidak bergelombang.
5. **Kolom Timestamp / Audit (`created_at`, `updated_at`)**:
   - Gunakan `variant="caption"` (12px) `color="text.secondary"`.
6. **State Kosong (Empty Table)**:
   - Gunakan `<Typography variant="body2" align="center" color="text.secondary">{msg}</Typography>`.

```tsx
// ✅ BENAR: Implementasi Cell Tabel Enterprise
{
  header: 'Nama Lengkap',
  accessorKey: 'name',
  cell: ({ getValue }) => (
    <Typography variant="subtitle1" color="text.primary">
      {getValue<string>()}
    </Typography>
  )
},
{
  header: 'Nomor Telepon',
  accessorKey: 'phone',
  cell: ({ getValue }) => (
    <Typography variant="body1" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
      {getValue<string>()}
    </Typography>
  )
},
{
  header: 'Terdaftar',
  accessorKey: 'created_at',
  cell: ({ getValue }) => (
    <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
      {getValue<string>()}
    </Typography>
  )
}
```

---

### B. Summary Cards / KPI Metrics

Pada dashboard analitik atau kartu ringkasan:

- **Label Metrik**: Gunakan `variant="caption"` dengan `color="text.secondary"`.
- **Angka Metrik (Counter/Nilai)**: Gunakan `variant="h4"` (atau `h3`) dengan `sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}` agar angka tidak bergeser saat data selesai loading.

```tsx
// ✅ BENAR: KPI Card
<Card variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
  <Typography variant="caption" color="text.secondary">
    <FormattedMessage id="stat.total-students" />
  </Typography>
  <Typography variant="h4" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
    {totalCount}
  </Typography>
</Card>
```

---

### C. Navigasi & Breadcrumbs (Aksesibilitas Semantik)

1. **Menu Item Sidebar (`NavItem.tsx`)**:
   - Menu item menggunakan `variant="h6"` untuk ukuran visual 14px 600, tetapi **WAJIB** menyertakan `component="span"`. Tanpa `component="span"`, MUI merender tag `<h6>` di HTML yang menghasilkan puluhan landmark heading palsu bagi screen reader.
2. **Subheader Grup Sidebar (`NavGroup.tsx`)**:
   - Gunakan `variant="overline"` (12px uppercase semibold dengan letter-spacing).
3. **Breadcrumbs (`Breadcrumbs.tsx`)**:
   - Tautan root dan item perantara **wajib** menggunakan `variant="body1"` (14px). **Dilarang** menggunakan `variant="h6"` pada breadcrumb.
   - Halaman aktif breadcrumb menggunakan `variant="body1"` dengan `color="text.primary"` dan `fontWeight: 500`.

---

### D. Form Inputs & Dialogs

1. **Input Label**:
   - Label di atas form field menggunakan `<InputLabel sx={{ fontWeight: 500 }}>` (14px).
2. **Form Helper Text / Validation Error**:
   - Helper text menggunakan ukuran `caption` (12px).
3. **Dialog Title**:
   - Dialog header menggunakan `variant="h5"` (16px SemiBold) atau `MuiDialogTitle` default.
4. **Dialog Content / Confirmation Message**:
   - Teks isi konfirmasi modal menggunakan `variant="body2"` (12px) atau `variant="body1"` (14px) dengan `color="text.secondary"`.

---

## 4. Daftar Anti-Pattern (Hal yang DILARANG)

### ❌ Anti-Pattern 1: Font Size Manual Sub-Pixel

```tsx
// ❌ SALAH: Menyebabkan teks buram di layar non-Retina/100% DPI
sx={{ fontSize: '0.675rem' }} // 10.8px
sx={{ fontSize: '0.7rem' }}   // 11.2px
sx={{ fontSize: '0.85rem' }}  // 13.6px
sx={{ fontSize: '0.95rem' }}  // 15.2px
sx={{ fontSize: '1.2rem' }}   // 19.2px

// ✅ BENAR: Gunakan variant resmi atau skala modular (12px, 14px, 16px, 20px)
variant="caption"   // 0.75rem (12px)
variant="body2"     // 0.75rem (12px)
variant="body1"     // 0.875rem (14px)
variant="h5"        // 1rem (16px)
variant="h4"        // 1.25rem (20px)
```

### ❌ Anti-Pattern 2: Typography Tanpa Variant

```tsx
// ❌ SALAH: Tidak ada variant, merender default tanpa kepastian desain
<Typography>{item.message}</Typography>
<Typography align="center" color="secondary">{emptyMsg}</Typography>

// ✅ BENAR: Selalu nyatakan variant dan warna semantik secara eksplisit
<Typography variant="body2" color="text.secondary">{item.message}</Typography>
<Typography variant="body2" align="center" color="text.secondary">{emptyMsg}</Typography>
```

### ❌ Anti-Pattern 3: Duplikasi Font Weight Redundan

```tsx
// ❌ SALAH: variant="h2" sudah default fontWeight 700; subtitle2 sudah default 600
<Typography variant="h2" sx={{ fontWeight: 700 }}>Judul</Typography>
<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Label</Typography>
<Typography variant="h4" sx={{ fontWeight: 600 }}>Header</Typography>

// ✅ BENAR: Percayakan pada theme configuration
<Typography variant="h2">Judul</Typography>
<Typography variant="subtitle2">Label</Typography>
<Typography variant="h4">Header</Typography>
```

### ❌ Anti-Pattern 4: Hardcoded Hex Colors

```tsx
// ❌ SALAH: Mengabaikan Dark/Light mode theme switching
sx={{ color: '#fff' }}
sx={{ color: '#262626' }}
sx={{ color: 'rgba(0, 0, 0, 0.45)' }}

// ✅ BENAR: Gunakan theme tokens
sx={{ color: 'common.white' }}
color="text.primary"
color="text.secondary"
```

---

## 5. Checklist Verifikasi Developer & AI Agent

Sebelum commit kode yang menambahkan atau memodifikasi komponen:

- [ ] Apakah setiap elemen `<Typography>` memiliki properti `variant="..."` yang eksplisit?
- [ ] Apakah warna teks menggunakan `color="text.secondary"` (bukan `color="secondary"`) untuk teks redup/bantuan?
- [ ] Apakah ada `fontSize` manual di `sx` yang bukan kelipatan skala modular (`0.75rem`, `0.875rem`, `1rem`, `1.25rem`)?
- [ ] Apakah kolom angka, tanggal, dan telepon di tabel data sudah menggunakan `fontVariantNumeric: 'tabular-nums'`?
- [ ] Apakah tautan dan label di dalam navigation drawer/breadcrumbs tidak menghasilkan heading DOM (`<h6>`) liar?
- [ ] Apakah semua teks yang ditampilkan ke pengguna dibungkus dengan `<FormattedMessage id="..." />` atau `intl.formatMessage(...)`?
- [ ] Apakah perintah validasi lolos (`bun run check:i18n`, `bun x tsc --noEmit`, `bun run lint`)?
