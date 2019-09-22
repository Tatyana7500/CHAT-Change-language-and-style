import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Routes />
    </I18nextProvider>,
    document.getElementById('root')
);