import { JSDOM } from 'jsdom';
import localStorage from 'localStorage';

const dom = new JSDOM(`<!doctype html>
    <html>
    <head>
    <script/>
    <link rel=\'stylesheet\' href=\'crypto.css\'/>
    <link rel=\'stylesheet\' href=\'crypto.rtl.css\'/>
    </head>
    <body>
    </div>
    </body>
    </html>`);
const { window } = dom;
const { navigator } = dom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}

global.dom = dom;
global.window = window;
global.navigator = navigator;
global.document = window.document;
global.localStorage = localStorage;
global.window.matchMedia =
    window.matchMedia ||
    (() => {
        return { matches: false, addListener: () => {}, removeListener: () => {} };
    });
global.navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
    javaEnabled: () => true,
    cookieEnabled: true,
    vendor: 'Google Inc.',
};
copyProps(window, global);