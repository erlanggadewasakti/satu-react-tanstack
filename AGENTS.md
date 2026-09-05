# AI Agent Development Guide & Instructions for SATU / LENS

This document serves as the primary engineering guide and operational contract for AI coding agents and developers working in this repository. Follow these conventions and workflows strictly during all feature additions, refactoring, and debugging tasks.

---

## 1. Project Overview & Tech Stack

**SATU / LENS** is an enterprise Outcome-Based Education (OBE) Academic Information System frontend built on modern React and TypeScript:

- **Core**: React 19, TypeScript (strict mode), Vite 8 with `@tanstack/router-plugin` & `nitro`
- **Routing**: TanStack Router (file-based routing under `src/routes/`)
- **Server State & Networking**: TanStack Query (`@tanstack/react-query`) + Axios (`src/api/client.ts`)
- **UI Framework**: Material UI (MUI v6/Emotion) with custom theme tokens & `iconsax-react`
- **Form Management**: Formik + Yup validation schemas
- **Internationalization (i18n)**: `react-intl` with strict dual-language parity (Indonesian `id` & English `en`)

---

## 2. Environment & Tooling

- **Package Manager**: **Bun** (`bun@1.3.14+`) — **ALWAYS** use `bun` for installing packages and executing scripts. Do not use `npm` or `yarn`.
- **Runtime**: Node.js v20+ / Bun v1.3+
- **Dev Server Port**: Port `3000` (auto-opens in browser upon `bun run dev`)
- **Path Resolution**: Absolute imports configured from `src/` (e.g. `import MainCard from 'components/MainCard'`). Do not use relative paths like `../../components/MainCard`.

---

## 3. Essential Commands Cheat Sheet

| Task                      | Command              | Description                                               |
| :------------------------ | :------------------- | :-------------------------------------------------------- |
| **Install Dependencies**  | `bun install`        | Installs project dependencies via Bun lockfile            |
| **Start Development**     | `bun run dev`        | Runs i18n parity check and starts Vite dev server         |
| **Check i18n Parity**     | `bun run check:i18n` | Validates 100% key match between `id.json` and `en.json`  |
| **TypeScript Validation** | `bun x tsc --noEmit` | Runs static type checks across the entire codebase        |
| **Lint Codebase**         | `bun run lint`       | Runs ESLint on all `src/**/*.{js,jsx,ts,tsx}` files       |
| **Fix Lint Issues**       | `bun run lint:fix`   | Automatically fixes auto-fixable ESLint errors            |
| **Format Code**           | `bun run prettier`   | Formats all source files according to `.prettierrc`       |
| **Production Build**      | `bun run build`      | Validates i18n, runs `tsc`, and creates production bundle |
| **Preview Build**         | `bun run preview`    | Serves the production build locally                       |

---

## 4. Repository Layout & Architecture

```
satu-react-tanstack/
├── docs/                 # Architectural documentation & developer guides
├── scripts/              # Build scripts (e.g. check-i18n.mjs)
├── src/
│   ├── api/              # Axios HTTP client, API services, endpoints, and query hooks
│   ├── assets/           # Static assets, SVGs, and images
│   ├── components/       # Generic, domain-agnostic UI components (MainCard, Loadable, etc.)
│   ├── config/           # Sub-app registrations (subApps.ts) & search configs
│   ├── contexts/         # Global React Contexts (ConfigContext, JWTContext, SubAppContext, SearchContext)
│   ├── layout/           # Global layouts (LensLayout, DashboardLayout, Header, Sidebar)
│   ├── menu-items/       # Sidebar menu definitions per sub-app with role filters
│   ├── pages/            # Page components grouped by sub-app and domain
│   ├── routes/           # TanStack Router file-based route definitions
│   │   ├── __root.tsx    # Root layout & context shell
│   │   ├── _auth/        # Authentication routes (login, register)
│   │   ├── _lens/        # Authenticated sub-app layout & sub-routes
│   │   └── routeTree.gen.ts # AUTO-GENERATED - DO NOT EDIT MANUALLY
│   ├── sections/         # Domain/feature-specific UI widgets, tables, forms, and dialogs
│   ├── themes/           # MUI custom theme overrides, palettes, typography, shadows
│   ├── types/            # TypeScript interfaces & types (subApp.ts, role.ts, menu.ts)
│   └── utils/
│       ├── locales/      # Translation dictionary files (id.json & en.json)
│       └── auth.ts       # Role-based menu and permission utilities
```

### The 8 Sub-Applications

The system is partitioned into 8 distinct OBE sub-apps configured in `src/config/subApps.ts`:

1. `super-admin`: System administration, user roles, and global permissions (`/super-admin`)
2. `akademik-admin`: Academic master data and institutional configuration (`/akademik-admin`)
3. `kurikulum`: Curriculum management, CPL / Learning Outcomes, and course structures (`/kurikulum`)
4. `silabus`: Sub-CLO and Semester Learning Plans (RPS) (`/silabus`)
5. `perkuliahan`: Class schedules, lectures, and student attendance (`/perkuliahan`)
6. `penilaian`: Grade entry, rubric weighting, and assessment periods (`/penilaian`)
7. `portofolio`: Student OBE portfolios and outcome evaluation (`/portofolio`)
8. `example`: Demonstration pages, UI sandbox, and component catalog (`/example`)

---

## 5. Standard Development Workflows

### A. Adding a New Sub-Application (6-Step Checklist)

When introducing a new sub-application (e.g., `keuangan` with prefix `/keuangan`):

1. **Register the Sub-App in `src/config/subApps.ts`**:

   ```typescript
   import { SubAppConfig } from 'types/subApp';
   import { Role } from 'types/role';

   export const SUB_APPS: SubAppConfig[] = [
     // ...
     {
       id: 'keuangan',
       name: 'Keuangan & Beasiswa',
       prefix: '/keuangan',
       defaultRoute: '/keuangan/home',
       description: 'Manajemen Pembayaran UKT dan Beasiswa',
       allowedRoles: [Role.BAA, Role.Developer]
     }
   ];
   ```

2. **Create Page Component in `src/pages/<sub-app>/...`**:
   Create `src/pages/keuangan/home.tsx`:

   ```tsx
   import Typography from '@mui/material/Typography';
   import { FormattedMessage } from 'react-intl';
   import MainCard from 'components/MainCard';

   export default function KeuanganHomePage() {
     return (
       <MainCard title={<FormattedMessage id="keuangan.home.title" />}>
         <Typography variant="body1">
           <FormattedMessage id="keuangan.home.welcome" />
         </Typography>
       </MainCard>
     );
   }
   ```

3. **Create TanStack Router File in `src/routes/_lens/<sub-app>/...`**:
   Create `src/routes/_lens/keuangan/home.tsx`:

   ```tsx
   import { createFileRoute } from '@tanstack/react-router';
   import { lazy } from 'react';
   import Loadable from 'components/Loadable';

   const KeuanganHomePage = Loadable(lazy(() => import('pages/keuangan/home')));

   export const Route = createFileRoute('/_lens/keuangan/home')({
     component: KeuanganHomePage
   });
   ```

4. **Create Menu Configuration in `src/menu-items/<sub-app>.ts`**:
   Create `src/menu-items/keuangan.ts`:

   ```typescript
   import { MoneyRecive, Home3 } from 'iconsax-reactjs';
   import { NavItemType } from 'types/menu';
   import { Role } from 'types/role';

   const keuanganMenuItems: NavItemType = {
     id: 'group-keuangan',
     title: 'menu.keuangan.group',
     type: 'group',
     children: [
       {
         id: 'keuangan-home',
         title: 'menu.keuangan.home',
         type: 'item',
         url: '/keuangan/home',
         icon: Home3,
         allowedRoles: [Role.BAA, Role.Developer]
       }
     ]
   };

   export default keuanganMenuItems;
   ```

5. **Register Menu in `src/menu-items/index.tsx`**:

   ```typescript
   import keuanganMenuItems from './keuangan';

   export const menuItemsBySubApp: Record<string, { items: NavItemType[] }> = {
     // ...
     keuangan: { items: [keuanganMenuItems] }
   };
   ```

6. **Add Translation Keys to BOTH `id.json` and `en.json`**:
   - In `src/utils/locales/id.json`:
     ```json
     "subapp.keuangan.name": "Keuangan & Beasiswa",
     "subapp.keuangan.desc": "Manajemen Pembayaran UKT dan Beasiswa",
     "menu.keuangan.group": "Menu Keuangan",
     "menu.keuangan.home": "Beranda Keuangan",
     "keuangan.home.title": "Beranda Keuangan & Beasiswa",
     "keuangan.home.welcome": "Selamat datang di Sub-Aplikasi Keuangan & Beasiswa."
     ```
   - In `src/utils/locales/en.json`:
     ```json
     "subapp.keuangan.name": "Finance & Scholarships",
     "subapp.keuangan.desc": "Tuition Fee Payments and Scholarship Management",
     "menu.keuangan.group": "Finance Menu",
     "menu.keuangan.home": "Finance Home",
     "keuangan.home.title": "Finance & Scholarships Home",
     "keuangan.home.welcome": "Welcome to the Finance & Scholarships Sub-Application."
     ```

---

### B. Adding a New Page to an Existing Sub-App

1. **Create the UI Page**: Add `src/pages/<sub-app>/<feature-name>.tsx`.
2. **Create the Route**: Add `src/routes/_lens/<sub-app>/<feature-name>.tsx` using `createFileRoute('/_lens/<sub-app>/<feature-name>')` and `Loadable(lazy(...))`.
3. **Update Sidebar Navigation**: Add navigation item to `src/menu-items/<sub-app>.ts`.
4. **Synchronize Translations**: Add all new translation keys to both `src/utils/locales/id.json` and `src/utils/locales/en.json`.

---

### C. Creating API Services & Data Queries

1. **Declare Endpoints**: In `src/api/endpoints.ts`.
2. **Implement Service**: In `src/api/services/<domain>.ts` using `axiosServices` (`src/api/client.ts`).
3. **Use React Query**: In your components/sections:
   ```typescript
   import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
   import { fetchCurriculumList, updateCurriculum } from 'api/services/kurikulum';

   export function useCurriculumData(id: string) {
     return useQuery({
       queryKey: ['curriculum', id],
       queryFn: () => fetchCurriculumList(id)
     });
   }
   ```

---

## 6. Mandatory Agent Guardrails & Coding Rules

### 🌐 Guardrail 1: Strict Dual-Language Internationalization (i18n)

- **100% Key Parity**: Any key added to `src/utils/locales/id.json` **MUST** be added with appropriate English translation to `src/utils/locales/en.json`, and vice versa.
- **No `defaultMessage` Fallbacks**: Do NOT use `defaultMessage` in `<FormattedMessage />` or `intl.formatMessage()`. The app is explicitly configured to throw errors on missing keys so that missing translations are never hidden.
- **Zero Raw Strings in JSX**: Never hardcode user-facing text like `<Button>Simpan</Button>` or `<Typography>Title</Typography>`. Always use `<FormattedMessage id="..." />` or `intl.formatMessage({ id: '...' })`.

### 🛣️ Guardrail 2: Router & Generated File Integrity

- **Never Manually Edit `src/routeTree.gen.ts`**: This file is generated by the TanStack Router plugin. Allow Vite to generate it automatically upon creating route files in `src/routes/`.
- **Always Code-Split Routes**: Wrap page imports in `src/routes/` with `Loadable(lazy(() => import('pages/...')))`.

### 📦 Guardrail 3: Dependencies & Import Restrictions

- **No Unapproved Dependencies**: Do NOT run `bun add` or install new third-party packages without explicit user request or confirmation.
- **Absolute Path Imports**: Always import using the configured path aliases (e.g. `import SubAppSelector from 'sections/sub-app/SubAppSelector'`).
- **MUI Import Rule**: Avoid 3-level deep imports like `@mui/material/Button/Button`. Use `@mui/material/Button` or `@mui/material`.

### 🔒 Guardrail 4: Role-Based Permissions (RBAC)

- All user roles are defined in `src/types/role.ts` (`Developer`, `Akademik`, `BAA`, `Kaprodi`, `KoordinatorMK`, `Dosen`, `Wadek1`, `Warek`, `LAA`, `User`).
- Protect sub-apps via `allowedRoles` in `src/config/subApps.ts`.
- Protect individual navigation items via `allowedRoles` in `src/menu-items/<sub-app>.ts`.

### 🎨 Guardrail 5: Enterprise Typography & Text Color Standards

- **Explicit Variants**: Every `<Typography>` element **MUST** declare an explicit `variant="..."` (`h1`–`h6`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, `overline`). Do not render unstyled `<Typography>` without a variant.
- **Theme Color Tokens Only**: Never hardcode hex colors (e.g. `color: '#fff'`). Always use Material UI theme tokens: `text.primary`, `text.secondary`, `text.disabled`, `common.white`.
  - ⚠️ **Never use `color="secondary"` for muted text**: In MUI, `color="secondary"` resolves to `palette.secondary.main` (purple/accent). For muted/gray secondary text, use `color="text.secondary"`.
- **Zero Sub-Pixel Font Sizes**: Do not declare manual font sizes in `sx` (e.g. `0.675rem`, `0.7rem`, `0.85rem`). Rely on the theme typography scale defined in `src/themes/typography.ts`.
- **Table Data Column Standards**:
  - Primary identifier column (Name, Course Title, Code): use `variant="subtitle1"` (14px SemiBold).
  - General data cells: use `variant="body1"` (14px).
  - Numbers, dates, phone, NIM: always include `sx={{ fontVariantNumeric: 'tabular-nums' }}`.
  - Timestamps / audit metadata: use `variant="caption"` (12px) with `color="text.secondary"`.
- **Accessibility & DOM Cleanliness**: Never use `variant="h6"` in breadcrumbs or navigation links without `component="span"`, as this generates unwanted `<h6>` DOM tags that pollute screen reader accessibility landmarks.
- **Reference**: Full specification and examples are documented in [`docs/TYPOGRAPHY_GUIDELINES.md`](./docs/TYPOGRAPHY_GUIDELINES.md).

---

## 7. Definition of Done & Quality Gate

Before completing any task or presenting the result to the user, the AI agent **MUST** run and verify the following commands:

```bash
# 1. Verify i18n key synchronization
bun run check:i18n

# 2. Verify TypeScript static types
bun x tsc --noEmit

# 3. Verify ESLint rules
bun run lint
```

If any check fails, fix the errors before responding to the user.
