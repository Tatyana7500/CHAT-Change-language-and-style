import { I18nextProvider } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import i18n from '../locale/index';
import React from 'react';

export default function(Component) {
    class WithLocalization extends React.Component {
        render() {
            if (Component) {

                return (
                    <I18nextProvider i18n={ i18n }>
                        <Component {...this.props} />
                    </I18nextProvider>
                );
            }
        }
    }

    return withTranslation('common')(WithLocalization);
}