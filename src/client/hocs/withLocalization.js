import {withTranslation, I18nextProvider} from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import React from 'react';

function withLocalization(Component, resources) {
    const options = {
        interpolation: {
            escapeValue: false,
        },

        debug: true,

        resources,

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

    i18n.use(initReactI18next).init(options);

    const Wrapper = withTranslation('common')(
        props => (
            <Component
                {...props}
                setLanguage={lang => props.i18n.changeLanguage(lang)}
                translate={props.t}
            />
        )
    );

    return class WithLocalizationWrapper extends React.Component {

        render() {
            return (
                <I18nextProvider i18n={i18n}>
                    <Wrapper
                        {...this.props}
                    />
                </I18nextProvider>
            );
        }
    };
}

export default withLocalization;