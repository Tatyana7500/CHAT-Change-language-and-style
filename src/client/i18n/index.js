import i18n from 'i18next';
import { en, ua, de, ar } from './locales';

const options = {
    interpolation: {
        escapeValue: false,
    },

    debug: true,

    resources: {
        de: {
            common: de.de,
        },
        en: {
            common: en.en,
        },
        ua: {
            common: ua.ua,
        },
        ar: {
            common: ar.ar,
        },
    },

    fallbackLng: 'en',

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
    .init(options)
    .changeLanguage('en', (err, t) => {
        if (err) return console.log('something went wrong loading', err);
    });

export default i18n;