const sinon = require('sinon');
const mochaSnapshots = require('mocha-snapshots');
const Adapter = require('enzyme-adapter-react-16');
const { expect, assert } = require('chai');
const { mount, render, shallow, configure } = require('enzyme');

configure({ adapter: new Adapter() });

global.mochaSnapshots = mochaSnapshots;
mochaSnapshots.setup({ sanitizeClassNames: false });

global.expect = expect;
global.assert = assert;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.sinon = sinon;

if (process.argv.includes('--silent')) {
    global.console.error = () => {};
    global.console.warn = () => {};
}