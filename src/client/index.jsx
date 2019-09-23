import { I18nextProvider } from 'react-i18next';
import ReactDOM from 'react-dom';
import React from 'react';
import i18n from './locale';
import App from './App';

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>,
    document.getElementById('root')
);