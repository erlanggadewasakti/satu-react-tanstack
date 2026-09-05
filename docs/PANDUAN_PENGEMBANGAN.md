# Panduan Pengembangan & Penambahan Sub-Aplikasi Baru

Panduan ini ditujukan bagi software engineer dan AI coding agent untuk menambah sub-aplikasi baru, memperluas halaman pada sub-aplikasi yang sudah ada, membuat service API dengan TanStack Query, serta mematuhi guardrail kualitas di template **SATU / LENS**.

---

## 🚀 1. Cara Menambahkan Sub-Aplikasi Baru (6 Langkah Lengkap)

Sebagai contoh kasus, kita akan menambahkan sub-aplikasi baru bernama **"Keuangan & Beasiswa"** dengan ID `keuangan` dan prefix URL `/keuangan`:

### Langkah 1: Registrasikan Sub-App di `src/config/subApps.ts`

Buka file [`src/config/subApps.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/config/subApps.ts) dan tambahkan objek konfigurasi ke dalam array `SUB_APPS`:

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
    allowedRoles: [Role.BAA, Role.Developer] // Sesuaikan role yang berwenang
  }
];
```

---

### Langkah 2: Buat Halaman Komponen UI di `src/pages/`

Buat file halaman utama di `src/pages/keuangan/home.tsx`.

> ⚠️ **Aturan i18n & Tipografi Wajib**:
> - Jangan pernah menulis teks langsung (raw string) di dalam JSX.
> - Gunakan `useIntl()` atau `<FormattedMessage id="..." />`.
> - Deklarasikan properti `variant` secara eksplisit pada setiap elemen `<Typography>`.

```tsx
// src/pages/keuangan/home.tsx
import Typography from '@mui/material/Typography';
import { FormattedMessage, useIntl } from 'react-intl';
import MainCard from 'components/MainCard';

export default function KeuanganHomePage() {
  const intl = useIntl();

  return (
    <MainCard title={intl.formatMessage({ id: 'keuangan.home-title' })}>
      <Typography variant="body1">
        <FormattedMessage id="keuangan.home-desc" />
      </Typography>
    </MainCard>
  );
}
```

---

### Langkah 3: Buat Rute TanStack Router di `src/routes/_lens/`

Buat file rute di `src/routes/_lens/keuangan/home.tsx`.

> ⚠️ **PENTING**: Seluruh rute sub-aplikasi yang terproteksi berada di bawah path **`/_lens/`** (bukan `/_dashboard/`). Rute wajib menggunakan pemisahan kode (*code-splitting*) via `Loadable(lazy(...))`.

```tsx
// src/routes/_lens/keuangan/home.tsx
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import Loadable from 'components/Loadable';

const KeuanganHomePage = Loadable(lazy(() => import('pages/keuangan/home')));

export const Route = createFileRoute('/_lens/keuangan/home')({
  component: KeuanganHomePage
});
```

*Catatan: File `src/routeTree.gen.ts` akan otomatis diperbarui oleh TanStack Router Vite plugin saat development server berjalan atau saat `bun run build`.*

---

### Langkah 4: Buat Menu Navigasi di `src/menu-items/`

Buat file konfigurasi menu sub-aplikasi di `src/menu-items/keuangan.ts`:

```typescript
// src/menu-items/keuangan.ts
import { Home3, MoneyRecive } from 'iconsax-reactjs';
import { NavItemType } from 'types/menu';
import { Role } from 'types/role';

const icons = {
  home: Home3,
  keuangan: MoneyRecive
};

const keuanganMenuItems: NavItemType = {
  id: 'group-keuangan',
  title: 'group-keuangan', // ID translation key di locales JSON
  type: 'group',
  children: [
    {
      id: 'keuangan-home',
      title: 'keuangan-home', // ID translation key di locales JSON
      type: 'item',
      url: '/keuangan/home',
      icon: icons.home,
      allowedRoles: [Role.BAA, Role.Developer]
    }
  ]
};

export default keuanganMenuItems;
```

---

### Langkah 5: Registrasikan Menu ke `src/menu-items/index.ts`

Buka file [`src/menu-items/index.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/menu-items/index.ts) dan tambahkan menu sub-app ke dalam objek `menuItemsBySubApp`:

```typescript
import keuanganMenuItems from './keuangan';

export const menuItemsBySubApp: Record<string, { items: NavItemType[] }> = {
  // ...
  keuangan: { items: [keuanganMenuItems] }
};
```

---

### Langkah 6: Tambahkan Terjemahan di KEDUA File Kamus (`id.json` & `en.json`)

Setiap sub-aplikasi baru wajib menambahkan entri nama sub-app, deskripsi, judul menu, dan teks halaman pada **KEDUA** file berikut:

1. **`src/utils/locales/id.json`**:
```json
{
  "subapp.keuangan.name": "Keuangan & Beasiswa",
  "subapp.keuangan.desc": "Manajemen Pembayaran UKT dan Beasiswa Mahasiswa",
  "group-keuangan": "Menu Keuangan",
  "keuangan-home": "Beranda Keuangan",
  "keuangan.home-title": "Beranda Keuangan & Beasiswa",
  "keuangan.home-desc": "Selamat datang di Sub-Aplikasi Keuangan & Beasiswa."
}
```

2. **`src/utils/locales/en.json`**:
```json
{
  "subapp.keuangan.name": "Finance & Scholarships",
  "subapp.keuangan.desc": "Tuition Fee Payments and Student Scholarship Management",
  "group-keuangan": "Finance Menu",
  "keuangan-home": "Finance Home",
  "keuangan.home-title": "Finance & Scholarships Home",
  "keuangan.home-desc": "Welcome to the Finance & Scholarships Sub-Application."
}
```

---

## 📑 2. Menambahkan Halaman Baru pada Sub-App yang Sudah Ada

Jika Anda ingin menambah fitur/halaman baru pada sub-aplikasi yang sudah ada (misal halaman "Daftar Beasiswa" di sub-app `keuangan`):

1. **Buat Komponen UI**:
   - Buat `src/pages/keuangan/beasiswa-list.tsx`.
   - Gunakan layout card terstandarisasi, komponen `@mui/material`, dan terjemahan `react-intl`.
2. **Buat Rute File**:
   - Buat `src/routes/_lens/keuangan/beasiswa.tsx`.
   - Gunakan `createFileRoute('/_lens/keuangan/beasiswa')({ component: BeasiswaListPage })`.
3. **Tambahkan Navigasi Menu**:
   - Tambahkan item di `src/menu-items/keuangan.ts` di dalam `children`:
     ```typescript
     {
       id: 'keuangan-beasiswa',
       title: 'keuangan-beasiswa',
       type: 'item',
       url: '/keuangan/beasiswa',
       icon: icons.keuangan,
       allowedRoles: [Role.BAA, Role.Developer]
     }
     ```
4. **Sinkronkan Terjemahan**:
   - Tambahkan key `"keuangan-beasiswa"` dan teks halaman lainnya ke `id.json` dan `en.json`.

---

## 🌐 3. Membuat Layanan API & Query Hook (TanStack Query)

Aplikasi menggunakan arsitektur pemanggilan API terpusat berbasis **Axios** dan **TanStack Query (React Query v5)**:

### 1. Daftarkan Endpoint di `src/api/endpoints.ts`

```typescript
// src/api/endpoints.ts
export const ENDPOINTS = {
  // ...
  KEUANGAN: {
    BEASISWA_LIST: '/api/keuangan/beasiswa',
    PAYMENT_STATUS: '/api/keuangan/payment-status'
  }
} as const;
```

### 2. Buat API Service di `src/api/services/`

Gunakan instance `axiosServices` dari [`src/api/client.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/api/client.ts):

```typescript
// src/api/services/keuanganService.ts
import axiosServices from 'api/client';
import { ENDPOINTS } from 'api/endpoints';

export interface BeasiswaItem {
  id: string;
  nama: string;
  kuota: number;
  status: 'aktif' | 'tutup';
}

export async function fetchBeasiswaList(): Promise<BeasiswaItem[]> {
  const response = await axiosServices.get(ENDPOINTS.KEUANGAN.BEASISWA_LIST);
  return response.data;
}
```

### 3. Gunakan TanStack Query di Komponen

```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchBeasiswaList } from 'api/services/keuanganService';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export function BeasiswaListWidget() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['keuangan', 'beasiswa-list'],
    queryFn: fetchBeasiswaList
  });

  if (isLoading) return <CircularProgress size={24} />;
  if (error) return <Typography variant="caption" color="error.main">Gagal memuat data</Typography>;

  return (
    <div>
      {data?.map((item) => (
        <Typography key={item.id} variant="body1">
          {item.nama}
        </Typography>
      ))}
    </div>
  );
}
```

---

## 🔍 4. Menambahkan Shortcut Omnibox Global (`Ctrl + K`)

Agar rute atau tindakan penting cepat ditemukan melalui modal pencarian global, daftarkan shortcut di [`src/config/customSearchItems.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/config/customSearchItems.ts):

```typescript
{
  id: 'quick-beasiswa',
  title: {
    id: 'Daftar Beasiswa',
    en: 'Scholarship List'
  },
  subTitle: {
    id: 'Pengajuan & Kuota Beasiswa',
    en: 'Scholarship Submission & Quota'
  },
  description: {
    id: 'Kelola alokasi beasiswa mahasiswa semester aktif',
    en: 'Manage student scholarship allocations for active semester'
  },
  category: {
    id: 'KEUANGAN',
    en: 'FINANCE'
  },
  subAppId: 'keuangan',
  url: '/keuangan/beasiswa',
  icon: MoneyRecive,
  keywords: ['beasiswa', 'ukt', 'keuangan', 'scholarship', 'bantuan']
}
```

---

## 🔐 5. Mengatur Proteksi Role per Menu Item

Selain proteksi di tingkat sub-aplikasi, Anda dapat memproteksi individual menu item di dalam sub-aplikasi dengan menambahkan properti `allowedRoles`:

```typescript
{
  id: 'keuangan-verifikasi',
  title: 'keuangan-verifikasi',
  type: 'item',
  url: '/keuangan/verifikasi',
  icon: icons.keuangan,
  allowedRoles: [Role.BAA] // Hanya role BAA yang dapat melihat menu ini
}
```

Fungsi `filterMenuItemsByRole` di [`src/utils/auth.ts`](file:///d:/Coding/Project/Template/satu%20react%20aio/satu-react-tanstack/src/utils/auth.ts) akan menyaring menu item secara otomatis sebelum ditampilkan di sidebar dan omnibox.

---

## 🛠️ 6. Standar Verifikasi & Definisi Selesai (Definition of Done)

Sebelum melakukan commit kode atau menyelesaikan tugas fitur, jalankan seluruh perintah verifikasi berikut secara berurutan:

```bash
# 1. Periksa keselarasan kamus terjemahan (Wajib 100% sinkron)
bun run check:i18n

# 2. Periksa tipe TypeScript (Zero compile errors)
bun x tsc --noEmit

# 3. Jalankan linter kode berbasis Rust (Oxlint)
bun run lint

# 4. (Opsional) Perbaiki masalah lint yang auto-fixable
bun run lint:fix

# 5. Jalankan audit arsitektur React
bun run doctor

# 6. Uji coba build produksi lengkap
bun run build
```
Semua perintah di atas harus berhasil dieksekusi tanpa error (`exit code 0`).
