import { ReactNode, useEffect, useState, useMemo } from 'react';

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl';

// project-imports
import useConfig from 'hooks/useConfig';

// types
import { I18n } from 'types/config';

// load locales files
const loadLocaleData = (locale: I18n) => {
  switch (locale) {
    case 'id':
      return import('utils/locales/id.json');
    case 'en':
    default:
      return import('utils/locales/en.json');
  }
};

interface Props {
  children: ReactNode;
}

// ==============================|| LOCALIZATION ||============================== //

export default function Locales({ children }: Props) {
  const {
    state: { i18n }
  } = useConfig();

  const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>();
  const localeDataPromise = useMemo(() => loadLocaleData(i18n), [i18n]);

  useEffect(() => {
    localeDataPromise.then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
      setMessages(d.default);
    });
  }, [localeDataPromise]);

  return (
    <>
      {messages && (
        <IntlProvider
          locale={i18n}
          defaultLocale="en"
          messages={messages}
          onError={(err) => {
            if (err.code === 'MISSING_TRANSLATION') {
              console.error(`[i18n Error] Missing translation key: "${err.descriptor?.id}" for locale: "${i18n}"`);
              throw new Error(
                `[i18n Error] Missing translation for key: "${err.descriptor?.id}" in locale: "${i18n}". Please add it to ${i18n}.json.`
              );
            }
            console.error(err);
          }}
        >
          {children}
        </IntlProvider>
      )}
    </>
  );
}
