import {
  Award,
  Book,
  Briefcase,
  Calendar,
  DocumentText,
  Element3,
  Profile,
  SecurityUser,
  UserSquare
} from 'iconsax-reactjs';

interface SubAppIconProps {
  id?: string;
  size?: number;
  variant?: 'Linear' | 'Bold' | 'Outline' | 'Bulk' | 'Broken' | 'TwoTone';
}

export default function SubAppIcon({ id, size = 18, variant = 'Linear' }: SubAppIconProps) {
  switch (id) {
    case 'super-admin':
      return <SecurityUser size={size} variant={variant} />;
    case 'akademik-admin':
      return <UserSquare size={size} variant={variant} />;
    case 'kurikulum':
      return <Book size={size} variant={variant} />;
    case 'silabus':
      return <DocumentText size={size} variant={variant} />;
    case 'perkuliahan':
      return <Calendar size={size} variant={variant} />;
    case 'penilaian':
      return <Award size={size} variant={variant} />;
    case 'portofolio':
      return <Briefcase size={size} variant={variant} />;
    case 'example':
      return <Element3 size={size} variant={variant} />;
    default:
      return <Profile size={size} variant={variant} />;
  }
}
