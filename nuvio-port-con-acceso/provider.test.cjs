const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const fakeModule = { exports: {} };
const sandbox = { module: fakeModule, exports: fakeModule.exports, Promise, console: { warn() {}, error() {}, log() {} } };
vm.runInNewContext(fs.readFileSync(__dirname + '/provider.js', 'utf8'), sandbox);
const provider = fakeModule.exports;
test('exports getStreams', () => assert.equal(typeof provider.getStreams, 'function'));
test('returns an array for movie and series requests', async () => {
  assert.ok(Array.isArray(await provider.getStreams('550', 'movie', null, null)));
  assert.ok(Array.isArray(await provider.getStreams('1399', 'tv', 1, 1)));
});
