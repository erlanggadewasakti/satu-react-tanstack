import { SubAppConfig } from 'types/subApp';
import { Role } from 'types/role';

export const SUB_APPS: SubAppConfig[] = [
  {
    id: 'super-admin',
    name: 'Super Admin',
    prefix: '/super-admin',
    defaultRoute: '/super-admin/home',
    description: 'Manajemen Sistem, Pengguna, dan Hak Akses Global',
    allowedRoles: [Role.Developer]
  },
  {
    id: 'akademik-admin',
    name: 'Akademik Administrator',
    prefix: '/akademik-admin',
    defaultRoute: '/akademik-admin/home',
    description: 'Manajemen Data Master Akademik dan Administrator',
    allowedRoles: [Role.Akademik, Role.BAA, Role.Developer]
  },
  {
    id: 'kurikulum',
    name: 'Manajemen Kurikulum',
    prefix: '/kurikulum',
    defaultRoute: '/kurikulum/home',
    description: 'Manajemen Struktur Kurikulum, CPL, dan Mata Kuliah',
    allowedRoles: [Role.Akademik, Role.Kaprodi, Role.BAA, Role.Developer]
  },
  {
    id: 'silabus',
    name: 'Silabus (SUB CLO & RPS)',
    prefix: '/silabus',
    defaultRoute: '/silabus/home',
    description: 'Penyusunan Sub-CLO dan Rencana Pembelajaran Semester',
    allowedRoles: [Role.Dosen, Role.KoordinatorMK, Role.Kaprodi, Role.Akademik, Role.Developer]
  },
  {
    id: 'perkuliahan',
    name: 'Perkuliahan & Presensi',
    prefix: '/perkuliahan',
    defaultRoute: '/perkuliahan/home',
    description: 'Manajemen Jadwal Perkuliahan dan Presensi Mahasiswa',
    allowedRoles: [Role.Dosen, Role.KoordinatorMK, Role.LAA, Role.BAA, Role.Developer]
  },
  {
    id: 'penilaian',
    name: 'Penilaian & Evaluasi',
    prefix: '/penilaian',
    defaultRoute: '/penilaian/home',
    description: 'Input Nilai, Pembobotan Asesmen, dan Periode Nilai',
    allowedRoles: [Role.Dosen, Role.Wadek1, Role.Akademik, Role.Developer]
  },
  {
    id: 'portofolio',
    name: 'Portofolio',
    prefix: '/portofolio',
    defaultRoute: '/portofolio/home',
    description: 'Portofolio Pembelajaran dan Evaluation Outcome',
    allowedRoles: [Role.Kaprodi, Role.Warek, Role.Wadek1, Role.Akademik, Role.Developer]
  },
  {
    id: 'example',
    name: 'Example Pages',
    prefix: '/example',
    defaultRoute: '/example/home',
    description: 'Halaman Contoh Komponen, Mock Data, dan Fitur Template',
    allowedRoles: [
      Role.Developer,
      Role.Akademik,
      Role.BAA,
      Role.Kaprodi,
      Role.KoordinatorMK,
      Role.Dosen,
      Role.Wadek1,
      Role.Warek,
      Role.LAA,
      Role.User
    ]
  }
];
