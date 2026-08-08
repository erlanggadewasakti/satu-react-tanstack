# Dokumentasi Alur & Arsitektur Aplikasi LENS

Dokumentasi ini menjelaskan arsitektur sistem, alur navigasi pengguna, manajemen state sub-aplikasi, serta mekanisme keamanan **Role-Based Access Control (RBAC)** pada aplikasi **LENS (Learning Outcome Based Information System)**.

---

## 📐 1. Arsitektur Modul Sub-Aplikasi

Aplikasi ini menggunakan pendekatan **Modular Sub-Application Navigation** untuk memecah sistem yang memiliki banyak fitur menjadi sub-aplikasi yang terisolasi dan terfokus. 

### Sub-Aplikasi & Namespace Rute
Setiap sub-aplikasi memiliki namespace **prefix URL** tersendiri dan rute utama berformat `/<subapp-prefix>/home`:

| No | Nama Sub-Aplikasi | ID | Prefix URL | Default Home Route | Hak Akses (`allowedRoles`) |
|----|-------------------|----|------------|--------------------|----------------------------|
| - | **Universal Home** | `-` | `/home` | `/home` | Bebas diakses semua role yang login |
| 1 | **Super Admin** | `super-admin` | `/super-admin` | `/super-admin/home` | `Role.Developer` |
| 2 | **Akademik Administrator** | `akademik-admin` | `/akademik-admin` | `/akademik-admin/home` | `Role.Akademik`, `Role.BAA`, `Role.Developer` |
| 3 | **Manajemen Kurikulum** | `kurikulum` | `/kurikulum` | `/kurikulum/home` | `Role.Akademik`, `Role.Kaprodi`, `Role.BAA`, `Role.Developer` |
| 4 | **Silabus (SUB CLO & RPS)** | `silabus` | `/silabus` | `/silabus/home` | `Role.Dosen`, `Role.KoordinatorMK`, `Role.Kaprodi`, `Role.Akademik`, `Role.Developer` |
| 5 | **Perkuliahan & Presensi** | `perkuliahan` | `/perkuliahan` | `/perkuliahan/home` | `Role.Dosen`, `Role.KoordinatorMK`, `Role.LAA`, `Role.BAA`, `Role.Developer` |
| 6 | **Penilaian & Evaluasi** | `penilaian` | `/penilaian` | `/penilaian/home` | `Role.Dosen`, `Role.Wadek1`, `Role.Akademik`, `Role.Developer` |
| 7 | **Portofolio** | `portofolio` | `/portofolio` | `/portofolio/home` | `Role.Kaprodi`, `Role.Warek`, `Role.Wadek1`, `Role.Akademik`, `Role.Developer` |

---

## 🔄 2. Alur Navigasi Pengguna (User Flow)

```
[ Pengguna Login (/login) ]
            │
            ▼
[ Auth Provider (`JWTContext`) Memuat Session User & Role ]
            │
            ▼
[ Dynamic Redirect ke Rute Universal `/home` ]
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                    Halaman `/home`                      │
├─────────────────────────────────────────────────────────┤
│ 1. Welcome Hero Section & Deskripsi LENS                │
│ 2. List Sub-Aplikasi Akses Cepat (Disaring per Role)   │
│ 3. Kontak Informasi & Link User Manual SharePoint       │
└──────────────────────────┬──────────────────────────────┘
                           │
             Pengguna Memilih Sub-App
        (Lewat Dropdown Sidebar / Card Quick Action)
                           │
                           ▼
  [ `SubAppProvider.changeSubApp(subAppId)` ]
  - Update `activeAppId` di State & LocalStorage
  - TanStack Router Navigate ke `/<prefix>/home`
                           │
                           ▼
  [ `SubAppGuard` Validasi Hak Akses URL ]
            │                         │
      (Izin Diperbolehkan)     (Tidak Berhak)
            │                         │
            ▼                         ▼
  [ Render Layout Sub-App ]    [ Render Error 404 ]
  - Sidebar merender menu     - Blokir akses rute
    khusus sub-app aktif
```

---

## 🔐 3. Mekanisme Keamanan (RBAC & 404 Guard)

Sistem proteksi keamanan terdiri dari 3 lapis:

### A. Enum Role Berstandar (`src/types/role.ts`)
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
Fungsi `hasRoleAccess(user, allowedRoles)` bertugas memverifikasi izin:
- **SuperAdmin Bypass**: Jika `user.isSuperAdmin === true`, seluruh pengecekan di-bypass dan otomatis mengembalikan `true`.
- **Match Role**: Memeriksa apakah salah satu role pengguna yang ada di JWT/session cocok dengan `allowedRoles` sub-app atau menu.

### C. Proteksi Rute Langsung (`SubAppGuard`)
- Berada di `src/utils/route-guard/SubAppGuard.tsx`.
- Membungkus rute utama dashboard di `src/layout/Main/index.tsx`.
- Jika pengguna mencoba mengetik URL sub-app secara manual di browser yang **tidak diizinkan** untuk role-nya, `SubAppGuard` langsung merender komponen `<Error404 />`.

---

## 💼 4. Manajemen State Sub-Aplikasi (`SubAppContext`)

State sub-aplikasi dikelola oleh `SubAppProvider` (`src/contexts/SubAppContext.tsx`) yang bertindak sebagai *single source of truth*:

1. **State Persistence**: Menyimpan `activeAppId` di LocalStorage key `'active-sub-app-id'` menggunakan hook `useLocalStorage`.
2. **Sinkronisasi Otomatis**:
   - Jika pengguna bernavigasi ke URL yang diawali prefix sub-app tertentu (contoh: `/kurikulum/home`), `SubAppProvider` secara otomatis menyelaraskan `activeAppId`.
   - Jika pengguna baru login dan sub-app yang tersimpan di LocalStorage tidak diizinkan untuk role-nya, `SubAppProvider` secara otomatis mengalihkan `activeAppId` ke sub-app pertama yang diizinkan.
3. **Penyediaan Menu Dinamis**:
   - Mengombinasikan `globalHomeMenuItem` (Beranda LENS di posisi teratas tanpa induk role) dengan daftar menu milik sub-app yang sedang aktif.

---

## 🎨 5. Komponen UI Navigasi

1. **`SubAppSelector` (`src/components/SubAppSelector.tsx`)**:
   - Komponen Dropdown Material-UI (Outlined Select) di bagian atas sidebar.
   - Mendukung mode sidebar mengecil (*collapsed/mini-drawer*) dengan menampilkan badge inisial sub-app beserta tooltip.
2. **`Navigation` (`src/layout/Main/Drawer/DrawerContent/Navigation/index.tsx`)**:
   - Merender menu ter-filter dari `useSubApp()`.
   - Mendukung tipe menu `item` tunggal (seperti Beranda LENS) dan tipe `group` beranak.
