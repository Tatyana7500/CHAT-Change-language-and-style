import i18n from 'i18next';
import { en, ua, de, ar } from './locales';

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
        AR: {
            common: ar.ar,
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

i18n.init(options);

export default i18n;