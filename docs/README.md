# Dokumentasi Sistem LENS (Learning Outcome Based Information System)

Selamat datang di direktori dokumentasi arsitektur dan pengembangan aplikasi **LENS**.

---

## 📑 Daftar Dokumentasi

1. **[Dokumentasi Alur & Arsitektur Aplikasi (`ALUR_APLIKASI.md`)](./ALUR_APLIKASI.md)**:
   - Penjelasan arsitektur modular sub-aplikasi.
   - Tabel rute & namespace URL sub-aplikasi.
   - Diagram & alur navigasi pengguna (User Flow).
   - Mekanisme keamanan Role-Based Access Control (RBAC) & `SubAppGuard` 404.
   - Manajemen state terpusat (`SubAppContext` & LocalStorage).

2. **[Panduan Pengembangan & Penambahan Sub-App (`PANDUAN_PENGEMBANGAN.md`)](./PANDUAN_PENGEMBANGAN.md)**:
   - Panduan langkah-demi-langkah (5 langkah) untuk menambah sub-aplikasi baru.
   - Cara mengatur proteksi role pada individual menu item.
   - Perintah build & verifikasi.

---

## 💻 Tech Stack
- **Framework UI**: React 19 + Material UI (MUI v9)
- **Router**: TanStack Router (`@tanstack/react-router`)
- **State Management**: React Context (`SubAppContext`, `ConfigContext`, `JWTContext`)
- **Build Tool**: Vite + Nitro Server
