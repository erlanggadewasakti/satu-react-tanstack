import { ReactElement } from 'react';
import { Role } from './role';

export { Role };

// ==============================|| TYPES - AUTH  ||============================== //

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id?: string;
  sub?: string;
  username?: string;
  name?: string;
  email?: string;
  avatar?: string;
  image?: string;
  photo?: string;
  role?: Role | Role[] | string | string[];
  tier?: string;
  studyProgramId?: string[];
  lecturerCode?: string;
  identifyNumber?: string;
  activeStatus?: boolean;
  employeeId?: string | null;
  employeeType?: string;
  homeBaseStudyProgramId?: string[];
  isSuperAdmin?: boolean;
  isCoordinatorTUNC?: boolean;
  isKaprodiCabang?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
};
