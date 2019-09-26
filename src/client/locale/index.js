import en from './strings/en.json';
import ua from './strings/ua.json';
import de from './strings/de.json';
import ae from './strings/ae.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const options = {
    interpolation: {
        escapeValue: false,
    },

    debug: true,

    resources: {
        DE: {
            common: de.de,
        },
        EN: {
            common: en.en,
        },
        UA: {
            common: ua.ua,
        },
        AE: {
            common: ae.ae,
        },
    },

    fallbackLng: 'EN',

    ns: ['common'],

    defaultNS: 'common',

    react: {
        wait: false,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
    },
};

i18n
    .use(initReactI18next)
    .init(options);

export default i18n;