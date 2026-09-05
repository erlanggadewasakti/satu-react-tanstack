# Dokumentasi Alur & Arsitektur Aplikasi SATU / LENS

Dokumentasi ini menjelaskan arsitektur modular, alur navigasi pengguna, hierarki rute TanStack Router, manajemen state terpusat, serta mekanisme keamanan **Role-Based Access Control (RBAC)** pada aplikasi **SATU / LENS (Learning Outcome Based Information System)**.

---

## 📐 1. Arsitektur Modular Sub-Aplikasi

Aplikasi SATU / LENS menggunakan arsitektur **Modular Sub-Application Navigation**. Pendekatan ini mempartisi sistem Outcome-Based Education (OBE) yang berskala besar menjadi domain sub-aplikasi yang terfokus, terisolasi, dan aman sesuai wewenang peran masing-masing pemangku kepentingan.

### Tabel Sub-Aplikasi & Namespace Rute

Setiap sub-aplikasi didaftarkan pada `src/config/subApps.ts` dengan namespace **prefix URL** tersendiri dan rute utama berformat `/<subapp-prefix>/home`:

| No | Nama Sub-Aplikasi | ID | Prefix URL | Default Home Route | Deskripsi Domain | Hak Akses (`allowedRoles`) |
|:---|:---|:---|:---|:---|:---|:---|
| **-** | **Universal Home** | `-` | `/home` | `/home` | Portal ringkasan, hero banner, dan akses cepat sub-app | Bebas diakses semua user yang terotentikasi |
| **1** | **Super Admin** | `super-admin` | `/super-admin` | `/super-admin/home` | Manajemen sistem, data pengguna, dan konfigurasi hak akses global | `Role.Developer` |
| **2** | **Akademik Administrator** | `akademik-admin` | `/akademik-admin` | `/akademik-admin/home` | Pengelolaan data master institusi, tahun ajaran, dan administrasi akademik | `Role.Akademik`, `Role.BAA`, `Role.Developer` |
| **3** | **Manajemen Kurikulum** | `kurikulum` | `/kurikulum` | `/kurikulum/home` | Penyusunan kurikulum OBE, pemetaan CPL/PLO, dan struktur mata kuliah | `Role.Akademik`, `Role.Kaprodi`, `Role.BAA`, `Role.Developer` |
| **4** | **Silabus (SUB CLO & RPS)** | `silabus` | `/silabus` | `/silabus/home` | Perumusan Sub-CLO dan Rencana Pembelajaran Semester (RPS) mata kuliah | `Role.Dosen`, `Role.KoordinatorMK`, `Role.Kaprodi`, `Role.Akademik`, `Role.Developer` |
| **5** | **Perkuliahan & Presensi** | `perkuliahan` | `/perkuliahan` | `/perkuliahan/home` | Jadwal sesi perkuliahan, jurnal kelas, dan pencatatan presensi mahasiswa | `Role.Dosen`, `Role.KoordinatorMK`, `Role.LAA`, `Role.BAA`, `Role.Developer` |
| **6** | **Penilaian & Evaluasi** | `penilaian` | `/penilaian` | `/penilaian/home` | Input nilai mahasiswa, pembobotan rubrik asesmen OBE, dan periode nilai | `Role.Dosen`, `Role.Wadek1`, `Role.Akademik`, `Role.Developer` |
| **7** | **Portofolio** | `portofolio` | `/portofolio` | `/portofolio/home` | Analisis portofolio capaian pembelajaran mahasiswa dan evaluasi outcome | `Role.Kaprodi`, `Role.Warek`, `Role.Wadek1`, `Role.Akademik`, `Role.Developer` |
| **8** | **Example Pages** | `example` | `/example` | `/example/home` | Katalog komponen UI, pengujian mock client/server, dan dokumentasi template | Seluruh 10 Role (`Role.Developer` s/d `Role.User`) |

---

## 🔄 2. Alur Navigasi Pengguna (User Flow) & Hierarki Rute

```
┌─────────────────────────────────────────────────────────┐
│              Akses URL Root Aplikasi (`/`)              │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
          [ Redirect Otomatis ke Rute `/home` ]
                             │
                             ▼
              [ Pemeriksaan Sesi `AuthGuard` ]
              ├── Belum Login?  ──► Redirect ke `/login` (dengan query `redirect`)
              └── Sudah Login?  ──► Lanjutkan ke `MainLayout`
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│        Root Layout Shell (`src/routes/__root.tsx`)      │
│  - `SubAppProvider` (Sinkronisasi Active Sub-App)       │
│  - `SearchProvider` (Global Omnibox Listener `Ctrl+K`)  │
│  - `TanStackDevtools` (Dev mode)                        │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│         Sub-App Layout (`src/routes/_lens/route.tsx`)    │
│  - `layout/Main` (Header, Drawer Sidebar, Footer)       │
│  - `SubAppGuard` (Validasi Role terhadap URL Prefix)    │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [ URL Izin Sah ]                  [ URL Tidak Sah ]
            │                                 │
            ▼                                 ▼
[ Render Halaman Sub-App ]           [ Render `<Error404 />` ]
  - Rute: `/_lens/<subapp>/...`        - Memblokir akses rute
  - Sidebar memuat menu aktif           secara transparan tanpa
  - Breadcrumb dinamis                  membocorkan info sistem
```

### Interaksi Navigasi Antar Sub-Aplikasi

Pengguna dapat berpindah antar sub-aplikasi melalui 3 pintu navigasi yang selalu tersinkronisasi:

1. **Dropdown SubAppSelector di Sidebar**:
   - Memilih sub-aplikasi dari dropdown Outlined Select.
   - Memicu `changeSubApp(targetId)` -> memperbarui state `activeAppId`, menyimpan ke `localStorage`, dan mengarahkan rute TanStack Router ke `/<prefix>/home`.
2. **Quick Cards di Halaman Beranda Universal (`/home`)**:
   - Kartu sub-aplikasi interaktif yang difilter otomatis sesuai hak akses pengguna.
   - Mengklik tombol "Buka Aplikasi" akan langsung mengaktifkan sub-app tersebut.
3. **Omnibox Global Search (`Ctrl+K` / `Cmd+K`)**:
   - Modal pencarian instan berbasis Fuse.js.
   - Jika pengguna memilih menu milik sub-app yang berbeda, sistem secara otomatis mengeksekusi `changeSubApp(item.subAppId)` sebelum bernavigasi ke URL target.

---

## 🔐 3. Mekanisme Keamanan (RBAC, AuthGuard, & SubAppGuard)

Sistem proteksi akses SATU / LENS dibangun dengan pendekatan **Defense in Depth** (3 lapis proteksi):

```
                      Permintaan Rute Masuk
                                │
                                ▼
         [ Lapis 1: `AuthGuard` (Autentikasi Session) ]
         Apakah token JWT valid dan user telah terotentikasi?
                 ├── Tidak ──► Redirect ke `/login?redirect=...`
                 └── Ya
                      │
                      ▼
         [ Lapis 2: `SubAppGuard` (Otorisasi URL Prefix) ]
         Apakah `user` memiliki role yang cocok dengan `allowedRoles` sub-app?
                 ├── Tidak ──► Render `<Error404 />`
                 └── Ya
                      │
                      ▼
         [ Lapis 3: `filterMenuItemsByRole` (Otorisasi Visual) ]
         Saring individual menu item di sidebar berdasarkan role user
                      │
                      ▼
            Akses Diberikan Penuh
```

### A. Definisi Peran Terstandarisasi (`src/types/role.ts`)

```typescript
export enum Role {
  Developer = 'Console Dev',
  User = 'Console User',
  Akademik = 'old-bpa',
  BAA = 'old-baa',
  Kaprodi = 'old-kaprodi',
  KoordinatorMK = 'old-subject-coordinator',
  Dosen = 'old-dosen',
  Wadek1 = 'old-wakil-dekan-i',
  Warek = 'old-warek-1',
  LAA = 'old-admin-laak'
}
```

### B. Helper Pengecekan Izin (`src/utils/auth.ts`)

Fungsi `hasRoleAccess(user, allowedRoles)` memverifikasi hak akses dengan dua aturan:
1. **Super Admin Bypass**: Jika `user.isSuperAdmin === true`, seluruh validasi role dilewati dan otomatis mengembalikan nilai `true`.
2. **Role Matching**: Memeriksa apakah minimal salah satu role yang dimiliki pengguna terdaftar di dalam array `allowedRoles`.

### C. Proteksi Rute Sub-Aplikasi (`SubAppGuard`)

- File: [`src/utils/route-guard/SubAppGuard.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/utils/route-guard/SubAppGuard.tsx).
- Komponen guard ini membungkus outlet konten di [`src/layout/Main/index.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/layout/Main/index.tsx).
- Ketika pengguna mencoba mengetikkan URL sub-aplikasi secara manual di address bar peramban (misal: `/super-admin/home`) tanpa memiliki role yang sesuai, `SubAppGuard` langsung merender komponen `<Error404 />` alih-alih menampilkan halaman error permission generic. Pendekatan ini adalah praktik terbaik keamanan web modern untuk mencegah *route enumeration*.

---

## 💼 4. Manajemen State Terpusat

### A. Context Sub-Aplikasi (`SubAppContext` & `SubAppProvider`)

- Context: [`src/contexts/SubAppContext.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/contexts/SubAppContext.ts)
- Provider: [`src/contexts/SubAppProvider.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/contexts/SubAppProvider.tsx)

**Tanggung Jawab**:
1. **State Persistence**: Menyimpan ID sub-aplikasi aktif ke `localStorage` dengan key `'active-sub-app-id'` via hook `useLocalStorage`.
2. **Sinkronisasi Rute URL Reaktif**: Memantau `location.pathname`. Jika pengguna bernavigasi ke rute yang diawali prefix tertentu (misal `/silabus/home`), `SubAppProvider` menyelaraskan `activeAppId` secara otomatis.
3. **Penyusunan Menu Dinamis**: Menggabungkan `globalHomeMenuItem` (Beranda LENS universal tanpa subordinasi sub-app) di posisi paling atas, diikuti dengan daftar menu dari sub-aplikasi yang sedang aktif yang telah disaring melalui `filterMenuItemsByRole`.

### B. Context Pencarian Global Omnibox (`SearchContext` & `SearchProvider`)

- Context: [`src/contexts/SearchContext.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/contexts/SearchContext.ts)
- Provider: [`src/contexts/SearchProvider.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/contexts/SearchProvider.tsx)
- Konfigurasi: [`src/config/searchConfig.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/config/searchConfig.ts) & [`src/config/customSearchItems.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/config/customSearchItems.ts)

**Tanggung Jawab**:
1. **Pendaftaran Shortcut Global**: Menangkap event keyboard `Ctrl + K` atau `Cmd + K` dari mana saja di seluruh aplikasi untuk membuka modal pencarian.
2. **Agregasi Index Menu**: Mengompilasi seluruh navigasi menu dari semua sub-aplikasi yang diizinkan untuk user aktif, ditambah menu bantuan (`support`) dan shortcut kustom (`CUSTOM_SEARCH_ITEMS`).
3. **Bilingual Fuzzy Search Engine**: Menggunakan Fuse.js dengan bobot bertingkat untuk judul (`title.id` & `title.en`), kata kunci (`keywords`), subjudul, deskripsi, dan kategori.
4. **Auto Cross-App Switching**: Menavigasi ke URL hasil pencarian sekaligus menyinkronkan `activeSubApp` jika item yang dipilih berasal dari sub-app yang berbeda.

---

## 🎨 5. Komponen UI Navigasi

1. **`SubAppSelector` ([`src/components/SubAppSelector.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/components/SubAppSelector.tsx))**:
   - Berada di header Drawer Sidebar.
   - Pada mode drawer normal: menampilkan Dropdown Outlined Select lengkap dengan nama dan icon sub-app.
   - Pada mode mini-drawer (sidebar collapsed): otomatis berubah menjadi Avatar badge inisial sub-app dengan Tooltip interaktif.
2. **`Navigation` ([`src/layout/Main/Drawer/DrawerContent/Navigation/index.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/layout/Main/Drawer/DrawerContent/Navigation/index.tsx))**:
   - Merender struktur menu hierarkis: grup (`NavGroup`), dropdown bersarang (`NavCollapse`), dan item tunggal (`NavItem`).
   - Mendukung dua mode orientasi layout: Vertical Sidebar Drawer dan Top Horizontal Bar (`NavGroupHorizontal`, `NavItemHorizontal`).
3. **`Breadcrumbs` ([`src/components/@extended/Breadcrumbs.tsx`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/components/@extended/Breadcrumbs.tsx))**:
   - Menghasilkan rekam jejak navigasi halaman secara otomatis berdasarkan pohon rute aktif.
   - Mengikuti kaidah aksesibilitas tanpa merender tag `<h6>` palsu.
