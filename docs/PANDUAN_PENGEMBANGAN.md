# Panduan Pengembangan & Penambahan Sub-Aplikasi Baru

Panduan ini ditujukan bagi pengembang (*developer*) yang ingin menambah, mengubah, atau mengelola modul sub-aplikasi dan rute pada template **React + TanStack Router + Material UI (MUI)**.

---

## 🚀 1. Cara Menambahkan Sub-Aplikasi Baru

Untuk menambahkan sub-aplikasi baru (misalnya: Sub-Aplikasi **"Keuangan & Beasiswa"** dengan prefix `/keuangan`), ikuti 5 langkah berikut:

### Langkah 1: Registrasikan Sub-App di `src/config/subApps.ts`
Buka file `src/config/subApps.ts` dan tambahkan objek konfigurasi baru ke dalam array `SUB_APPS`:

```typescript
import { SubAppConfig } from 'types/subApp';
import { Role } from 'types/role';

export const SUB_APPS: SubAppConfig[] = [
  // ... sub-apps yang sudah ada ...
  {
    id: 'keuangan',
    name: 'Keuangan & Beasiswa',
    prefix: '/keuangan',
    defaultRoute: '/keuangan/home',
    description: 'Manajemen Pembayaran UKT dan Beasiswa Mahasiswa',
    allowedRoles: [Role.BAA, Role.Developer] // Sesuaikan role yang berhak
  }
];
```

---

### Langkah 2: Buat Halaman Component di `src/pages/`
Buat folder dan file halaman baru di `src/pages/keuangan/home.tsx`:

```tsx
// src/pages/keuangan/home.tsx
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';

export default function KeuanganHomePage() {
  return (
    <MainCard title="Beranda Keuangan & Beasiswa">
      <Typography variant="body1">
        Selamat datang di Sub-Aplikasi Keuangan & Beasiswa.
      </Typography>
    </MainCard>
  );
}
```

---

### Langkah 3: Buat Rute TanStack Router di `src/routes/_dashboard/`
Buat file rute TanStack Router di `src/routes/_dashboard/keuangan/home.tsx`:

```tsx
// src/routes/_dashboard/keuangan/home.tsx
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const KeuanganHomePage = Loadable(lazy(() => import('pages/keuangan/home')));

export const Route = createFileRoute('/_dashboard/keuangan/home')({
  component: KeuanganHomePage
});
```

---

### Langkah 4: Buat Menu Items di `src/menu-items/`
Buat file konfigurasi menu khusus sub-app tersebut di `src/menu-items/keuangan.ts`:

```typescript
// src/menu-items/keuangan.ts
import { Home3, MoneyRecive } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';

const icons = {
  home: Home3,
  keuangan: MoneyRecive
};

const keuanganMenuItems: NavItemType = {
  id: 'group-keuangan',
  title: 'Menu Keuangan',
  type: 'group',
  children: [
    {
      id: 'keuangan-home',
      title: 'Beranda Keuangan',
      type: 'item',
      url: '/keuangan/home',
      icon: icons.home
    }
  ]
};

export default keuanganMenuItems;
```

---

### Langkah 5: Registrasikan Menu ke `src/menu-items/index.tsx`
Buka file `src/menu-items/index.tsx` dan tambahkan pemetaan menu baru pada `menuItemsBySubApp`:

```typescript
import keuanganMenuItems from './keuangan';

export const menuItemsBySubApp: Record<string, { items: NavItemType[] }> = {
  // ...
  keuangan: { items: [keuanganMenuItems] }
};
```

---

## 🔐 2. Mengatur Proteksi Role per Menu Item

Selain proteksi di tingkat sub-aplikasi, Anda juga dapat memproteksi individual menu item di dalam sub-aplikasi dengan menambahkan properti `allowedRoles`:

```typescript
const keuanganMenuItems: NavItemType = {
  id: 'group-keuangan',
  title: 'Menu Keuangan',
  type: 'group',
  children: [
    {
      id: 'keuangan-beasiswa',
      title: 'Kelola Beasiswa',
      type: 'item',
      url: '/keuangan/beasiswa',
      icon: icons.beasiswa,
      allowedRoles: [Role.BAA] // Hanya role BAA yang dapat melihat menu ini
    }
  ]
};
```

Fungsi `filterMenuItemsByRole` di `src/utils/auth.ts` akan menyaring menu item secara otomatis berdasarkan role user.

---

## 🛠️ 3. Perintah Verifikasi & Build

Setiap kali melakukan penambahan rute atau komponen baru, jalankan perintah kompilasi untuk memastikan tidak ada kesalahan tipe TypeScript:

```bash
# Uji coba build produksi
npm run build
```
