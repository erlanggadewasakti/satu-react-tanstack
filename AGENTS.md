# AI Agent & Developer Rules for SATU / LENS Application

This document outlines mandatory guidelines and architectural rules that all AI coding assistants and developers MUST follow when working in this codebase.

---

## 🌐 1. MANDATORY INTERNATIONALIZATION (i18n) RULES

> [!CRITICAL]
> **Strict Two-Language Rule (Indonesian & English)**:
> This application strictly supports **only two languages**:
> - **Indonesian (`id`)**: `src/utils/locales/id.json`
> - **English (`en`)**: `src/utils/locales/en.json`

### Agent Instructions:
1. **Always Update Both Files**: Whenever you create or modify any UI component, page, form, modal, menu item, button, label, placeholder, or error message:
   - You **MUST** add the translation key to **BOTH** `src/utils/locales/id.json` AND `src/utils/locales/en.json`.
   - Never add a key to only one language file.
2. **Never Use Default Fallbacks**:
   - **DO NOT** use `defaultMessage` props in `<FormattedMessage id="..." />` or `intl.formatMessage({ id: '...' })`.
   - The application is configured to strictly **throw an error** if a translation is missing. Silent fallbacks mask missing translations.
3. **No Hardcoded UI Strings in JSX**:
   - Never write raw text like `<Typography>Welcome to the Dashboard</Typography>` or `<Button>Submit</Button>`.
   - Always use `<FormattedMessage id="dashboard.welcome" />` or `intl.formatMessage({ id: 'action.submit' })`.
4. **Always Validate i18n Before Completing Work**:
   - Run `bun run check:i18n`
   - Run `bun x tsc --noEmit`
   - If `check:i18n` fails, fix the missing keys before presenting the solution to the user.

---

## 🛠️ 2. PACKAGE MANAGER & RUNTIME

- **Package Manager**: Use `bun` (version 1.3+).
- **Scripts**:
  - `bun run dev` : Start Vite development server (automatically runs `check:i18n`).
  - `bun run check:i18n` : Validate 100% key parity between `en.json` and `id.json`.
  - `bun x tsc --noEmit` : TypeScript static analysis check.
  - `bun run build` : Full production build.

---

## 🧩 3. COMPONENT & ROUTING PATTERNS

- **Routing**: TanStack Router (file-based routes in `src/routes/`).
- **State & Data Fetching**: TanStack Query (React Query) + Axios fetcher.
- **UI Framework**: Material UI (MUI v5/v6) + `@mui/material` with custom theme tokens.
- **Icons**: `iconsax-reactjs`.
- **Sub-App Architecture**: 7 OBE sub-apps (`super-admin`, `akademik-admin`, `kurikulum`, `silabus`, `perkuliahan`, `penilaian`, `portofolio`) plus `example`.
