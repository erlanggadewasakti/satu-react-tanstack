# Internationalization (i18n) Rules for Satu React Tanstack

## Strict Dual-Language Parity Requirement

1. **Both Languages Are Mandatory**:
   Whenever adding or modifying UI strings, components, menus, pages, or forms, you MUST define translation keys in **BOTH**:
   - `src/utils/locales/id.json` (Bahasa Indonesia)
   - `src/utils/locales/en.json` (English)

2. **No Default Fallbacks**:
   - Never use `defaultMessage` in `<FormattedMessage>` or `intl.formatMessage()`.
   - The application intentionally throws runtime errors when a key is missing.

3. **Mandatory Verification**:
   Before completing any task that touches UI or translations:
   - Run `bun run check:i18n` to ensure 100% key parity.
   - Run `bun x tsc --noEmit` to verify type safety.
