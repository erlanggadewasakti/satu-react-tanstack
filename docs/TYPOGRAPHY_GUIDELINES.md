# Panduan & Standar Tipografi Enterprise (Typography Guidelines)

Dokumen ini adalah pedoman resmi bagi developer dan AI coding agent saat membuat komponen baru atau memodifikasi tampilan UI yang sudah ada di repositori **SATU / LENS**.

Standar ini diadopsi dari arsitektur desain sistem enterprise (**IBM Carbon Design System**, **Salesforce Lightning Design System**, dan **Microsoft Fluent UI**) untuk menjamin konsistensi visual, keterbacaan (_readability_), aksesibilitas (_a11y_), dan integrasi bebas pergeseran tata letak (_zero layout shift_).

---

## 1. Skala Tipografi Resmi (Typography Scale Reference)

Semua komponen **wajib** menggunakan variant bawaan Material UI yang telah dikonfigurasi di [`src/themes/typography.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/themes/typography.ts). Dilarang membuat ukuran font manual sembarangan melalui `sx={{ fontSize: '...' }}`.

| Variant     | Desktop Size      | Mobile Size (`<=600px`) | Weight             | Line Height                   | Penggunaan Semantik                                                 |
| :---------- | :---------------- | :---------------------- | :----------------- | :---------------------------- | :------------------------------------------------------------------ |
| `h1`        | `2.25rem` (36px)  | `1.75rem` (28px)        | **700** (Bold)     | 1.25 (desktop) / 1.3 (mobile) | Hero headline halaman login/publik                                  |
| `h2`        | `1.875rem` (30px) | `1.5rem` (24px)         | **700** (Bold)     | 1.3 (desktop) / 1.35 (mobile) | Judul utama halaman aplikasi (`Page Title`), Judul Card Utama       |
| `h3`        | `1.5rem` (24px)   | `1.25rem` (20px)        | **600** (SemiBold) | 1.33 (desktop) / 1.4 (mobile) | Judul section besar, welcome banners                                |
| `h4`        | `1.25rem` (20px)  | `1.25rem` (20px)        | **600** (SemiBold) | 1.4                           | Judul sub-section, Card Header sekunder, KPI metrics                |
| `h5`        | `1rem` (16px)     | `1rem` (16px)           | **600** (SemiBold) | 1.5                           | Judul card kecil, modal dialog title, widget title                  |
| `h6`        | `0.875rem` (14px) | `0.875rem` (14px)       | **600** (SemiBold) | 1.57                          | Header tabel, item navigasi sidebar                                 |
| `subtitle1` | `0.875rem` (14px) | `0.875rem` (14px)       | **600** (SemiBold) | 1.57                          | **Kolom utama tabel (Nama/Kode MK)**, label tebal, subjudul penting |
| `subtitle2` | `0.75rem` (12px)  | `0.75rem` (12px)        | **500** (Medium)   | 1.66                          | Sub-header badge, user card subtitle di drawer                      |
| `body1`     | `0.875rem` (14px) | `0.875rem` (14px)       | **400** (Regular)  | 1.57                          | **Standar teks konten**, paragraf, isi sel tabel, form input        |
| `body2`     | `0.75rem` (12px)  | `0.75rem` (12px)        | **400** (Regular)  | 1.66                          | Teks deskripsi pembantu, pesan kosong (_empty state_), modal desc   |
| `caption`   | `0.75rem` (12px)  | `0.75rem` (12px)        | **400** (Regular)  | 1.66                          | **Metadata**, form helper text, pagination label                    |
| `overline`  | `0.75rem` (12px)  | `0.75rem` (12px)        | **600** (SemiBold) | 1.66                          | **Sidebar group header**, badge kategori UPPERCASE, tracking 0.8px  |
| `button`    | `0.875rem` (14px) | `0.875rem` (14px)       | **500** (Medium)   | 1.57                          | Label tombol interaktif (`textTransform: 'none'`)                   |

---

## 2. Standar Warna Teks (Theme Text Color Tokens)

Gunakan token warna tema Material UI. **Dilarang keras menggunakan hex manual (`#fff`, `#333`) atau `color="secondary"` pada teks.**

| Token Warna      | Kegunaan                                                       | Contoh Kode                                                       |
| :--------------- | :------------------------------------------------------------- | :---------------------------------------------------------------- |
| `text.primary`   | Konten utama, heading, teks aktif, nilai input form            | `<Typography variant="body1" color="text.primary">`               |
| `text.secondary` | Subjudul, deskripsi bantuan, timestamp, placeholder, copyright | `<Typography variant="body2" color="text.secondary">`             |
| `text.disabled`  | Placeholder tidak aktif, copyright sekunder, disabled text     | `<Typography variant="caption" color="text.disabled">`            |
| `common.white`   | Teks di atas background solid gelap (solid chips/dark cards)   | `sx={{ color: 'common.white' }}`                                  |
| `primary.main`   | Teks tautan penting, link aktif, status brand                  | `<Typography variant="subtitle1" sx={{ color: 'primary.main' }}>` |
| `success.main`   | Status sukses, indikator nilai positif                         | `<Typography variant="body2" sx={{ color: 'success.main' }}>`     |
| `error.main`     | Pesan galat, peringatan kritis                                 | `<Typography variant="caption" sx={{ color: 'error.main' }}>`     |

> ⚠️ **Peringatan Kritis Mengenai `color="secondary"`**:
> Di Material UI, `<Typography color="secondary">` merujuk ke `theme.palette.secondary.main` (warna aksen ungu brand), **bukan** teks abu-abu sekunder. Untuk teks sekunder/redup, **selalu** gunakan `color="text.secondary"`.

---

## 3. Penerapan Spesifik per Komponen

### A. Tabel Data (Enterprise High-Density Tables)

1. **Header Tabel (`<thead>` / `TableHead`)**:
   - Diatur otomatis oleh tema: `fontSize: '0.75rem'` (12px), `fontWeight: 700`, `textTransform: 'uppercase'`.
2. **Kolom Identitas Primer (Nama Mahasiswa, Judul Mata Kuliah, Kode MK)**:
   - Gunakan `variant="subtitle1"` (14px SemiBold) agar data kunci langsung dapat diidentifikasi saat mata pengguna memindai tabel (_visual scanning_).
3. **Kolom Data Umum (Fakultas, Program Studi, Kelas)**:
   - Gunakan `variant="body1"` (14px Regular).
4. **Kolom Angka, Tanggal, NIM, dan Nilai**:
   - Wajib menyertakan `sx={{ fontVariantNumeric: 'tabular-nums' }}` agar setiap digit angka memiliki lebar monospaced seragam dan tidak tampak bergelombang secara vertikal.
5. **Kolom Timestamp & Audit (`created_at`, `updated_at`)**:
   - Gunakan `variant="caption"` (12px Regular) dengan `color="text.secondary"`.
6. **State Tabel Kosong (Empty State)**:
   - Gunakan `<Typography variant="body2" align="center" color="text.secondary">{pesan}</Typography>`.

```tsx
// ✅ BENAR: Implementasi Cell Tabel Enterprise Sesuai Pedoman
{
  header: 'Nama Mahasiswa',
  accessorKey: 'name',
  cell: ({ getValue }) => (
    <Typography variant="subtitle1" color="text.primary">
      {getValue<string>()}
    </Typography>
  )
},
{
  header: 'Nomor Induk Mahasiswa (NIM)',
  accessorKey: 'nim',
  cell: ({ getValue }) => (
    <Typography variant="body1" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
      {getValue<string>()}
    </Typography>
  )
},
{
  header: 'Terakhir Diperbarui',
  accessorKey: 'updated_at',
  cell: ({ getValue }) => (
    <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
      {getValue<string>()}
    </Typography>
  )
}
```

---

### B. Summary Cards & KPI Metrics

Pada widget ringkasan atau KPI metric cards:

- **Label Metrik**: Gunakan `variant="caption"` dengan `color="text.secondary"`.
- **Angka Metrik (Counter / Nilai)**: Gunakan `variant="h4"` (atau `h3`) dengan `sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}` agar angka tidak bergeser saat data selesai dimuat.

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
   - Menu item menggunakan `variant="h6"` untuk ukuran visual 14px 600, namun **WAJIB** menyertakan `component="span"`. Tanpa `component="span"`, MUI merender tag `<h6>` ke HTML yang memicu puluhan landmark heading palsu dan merusak navigasi pembaca layar (_screen reader accessibility_).
2. **Subheader Grup Sidebar (`NavGroup.tsx`)**:
   - Gunakan `variant="overline"` (12px uppercase semibold dengan letter-spacing 0.8px).
3. **Breadcrumbs (`Breadcrumbs.tsx`)**:
   - Tautan root dan item perantara wajib menggunakan `variant="body1"` (14px). Dilarang menggunakan `variant="h6"` pada breadcrumb.
   - Halaman aktif menggunakan `variant="body1"` dengan `color="text.primary"` dan `fontWeight: 500`.

---

### D. Form Inputs & Modal Dialog

1. **Input Label**: Label form menggunakan `<InputLabel sx={{ fontWeight: 500 }}>` (14px).
2. **Form Helper Text / Pesan Validasi**: Helper text menggunakan ukuran `caption` (12px).
3. **Dialog Title**: Header modal dialog menggunakan `variant="h5"` (16px SemiBold) atau `MuiDialogTitle` default.
4. **Dialog Content**: Teks konfirmasi menggunakan `variant="body2"` (12px) atau `variant="body1"` (14px) dengan `color="text.secondary"`.

---

## 4. Daftar Anti-Pattern (Hal yang DILARANG)

### ❌ Anti-Pattern 1: Font Size Manual Sub-Pixel

```tsx
// ❌ SALAH: Menyebabkan teks buram di layar non-Retina (100% DPI) dan merusak skala tema
sx={{ fontSize: '0.675rem' }} // 10.8px
sx={{ fontSize: '0.7rem' }}   // 11.2px
sx={{ fontSize: '0.85rem' }}  // 13.6px
sx={{ fontSize: '0.95rem' }}  // 15.2px

// ✅ BENAR: Gunakan variant resmi dari skala tema
variant="caption"   // 0.75rem (12px)
variant="body2"     // 0.75rem (12px)
variant="body1"     // 0.875rem (14px)
variant="h5"        // 1rem (16px)
variant="h4"        // 1.25rem (20px)
```

### ❌ Anti-Pattern 2: Typography Tanpa Variant

```tsx
// ❌ SALAH: Merender default body1 tanpa kepastian intent desain
<Typography>{item.message}</Typography>
<Typography align="center" color="secondary">{emptyMsg}</Typography>

// ✅ BENAR: Selalu deklarasikan variant dan warna semantik secara eksplisit
<Typography variant="body2" color="text.secondary">{item.message}</Typography>
<Typography variant="body2" align="center" color="text.secondary">{emptyMsg}</Typography>
```

### ❌ Anti-Pattern 3: Hardcoded Hex Colors

```tsx
// ❌ SALAH: Mengabaikan mode Dark/Light dan tema kustom
sx={{ color: '#fff' }}
sx={{ color: '#262626' }}
sx={{ color: 'rgba(0, 0, 0, 0.45)' }}

// ✅ BENAR: Gunakan token tema Material UI
sx={{ color: 'common.white' }}
color="text.primary"
color="text.secondary"
```

---

## 5. Checklist Verifikasi Developer & AI Agent

Sebelum menyelesaikan tugas atau commit kode yang melibatkan komponen antarmuka pengguna:

- [ ] Apakah setiap elemen `<Typography>` memiliki properti `variant="..."` yang eksplisit?
- [ ] Apakah teks sekunder/bantuan menggunakan `color="text.secondary"` (bukan `color="secondary"`)?
- [ ] Apakah tidak ada `fontSize` manual di `sx` yang menyimpang dari skala modular tema?
- [ ] Apakah kolom angka, tanggal, NIM, dan telepon di tabel data sudah menyertakan `fontVariantNumeric: 'tabular-nums'`?
- [ ] Apakah menu item sidebar dan breadcrumbs tidak merender tag `<h6>` liar di DOM?
- [ ] Apakah seluruh teks antarmuka dibungkus oleh `<FormattedMessage id="..." />` atau `useIntl()` tanpa raw strings?
- [ ] Apakah seluruh pemeriksaan lolos (`bun run check:i18n`, `bun x tsc --noEmit`, `bun run lint`)?
