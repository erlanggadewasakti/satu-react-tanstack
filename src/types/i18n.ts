import type enJson from 'utils/locales/en.json';

export type LocaleKey = keyof typeof enJson;

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: LocaleKey;
    }
  }
}
