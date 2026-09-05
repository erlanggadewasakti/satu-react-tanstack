// assets
import { CloudConnection, DocumentText, Home3, Profile } from 'iconsax-reactjs';

// types
import type { SearchableItem } from './searchConfig';

// ==============================|| CUSTOM SEARCH ITEMS ||============================== //
/**
 * Developer-friendly array to easily add custom search shortcuts, quick actions,
 * documentation links, or external tools to the Fuse.js search engine.
 * Stores both Bahasa Indonesia (id) and English (en) locally without polluting locales JSON files.
 */
export const CUSTOM_SEARCH_ITEMS: SearchableItem[] = [
  {
    id: 'quick-home',
    title: {
      id: 'Beranda Utama LENS',
      en: 'LENS Main Home'
    },
    subTitle: {
      id: 'Halaman Beranda Universal',
      en: 'Universal Home Page'
    },
    description: {
      id: 'Akses cepat ke portal beranda utama LENS',
      en: 'Quick access to the main LENS home portal'
    },
    category: {
      id: 'UMUM',
      en: 'GENERAL'
    },
    url: '/home',
    icon: Home3,
    keywords: ['beranda', 'home', 'dashboard', 'lens', 'utama', 'portal', 'main', 'universal']
  },
  {
    id: 'quick-mock-client',
    title: {
      id: 'Data Mock (Client-side Query)',
      en: 'Mock Data (Client-side Query)'
    },
    subTitle: {
      id: 'Mock Data TanStack Query',
      en: 'TanStack Query Mock Data'
    },
    description: {
      id: 'Halaman pengujian data mock di sisi client dengan TanStack Query',
      en: 'Client-side mock data testing page with TanStack Query'
    },
    category: {
      id: 'PENGEMBANG & PENGUJIAN',
      en: 'DEVELOPER & TESTING'
    },
    subAppId: 'example',
    subAppName: {
      id: 'Example Pages',
      en: 'Example Pages'
    },
    url: '/example/mock',
    icon: DocumentText,
    keywords: ['mock', 'client', 'tanstack query', 'dummy data', 'test', 'offline data', 'example']
  },
  {
    id: 'quick-mock-server',
    title: {
      id: 'Data Mock (Server-side API)',
      en: 'Mock Data (Server-side API)'
    },
    subTitle: {
      id: 'Mock Server Endpoint',
      en: 'Mock Server Endpoint'
    },
    description: {
      id: 'Halaman pengujian API server mock dengan Nitro server route',
      en: 'Server-side API testing page with Nitro server routes'
    },
    category: {
      id: 'PENGEMBANG & PENGUJIAN',
      en: 'DEVELOPER & TESTING'
    },
    subAppId: 'example',
    subAppName: {
      id: 'Example Pages',
      en: 'Example Pages'
    },
    url: '/example/mock-server',
    icon: CloudConnection,
    keywords: ['mock', 'server', 'nitro api', 'endpoint', 'backend mock', 'rest api', 'example']
  },
  {
    id: 'quick-student-profile',
    title: {
      id: 'Profil Pengguna',
      en: 'User Profile'
    },
    subTitle: {
      id: 'Informasi Akun & Data Pribadi',
      en: 'Account Information & Personal Data'
    },
    description: {
      id: 'Lihat informasi profil dan detail identitas pengguna',
      en: 'View user profile information and identity details'
    },
    category: {
      id: 'PENGGUNA & PROFIL',
      en: 'USER & PROFILE'
    },
    url: '/home',
    icon: Profile,
    keywords: ['profile', 'akun', 'user', 'biodata', 'mahasiswa', 'dosen', 'identitas', 'account', 'identity']
  }
];
