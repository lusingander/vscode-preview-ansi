import * as assert from 'assert';
import { toHtml } from '../../ansi';

suite('ansi test', () => {

  suite('toHtml', () => {

    test('foreground color', () => {
      const s = `\x1b[31mfoo`;
      const expected = `<span style="color:#A00;">foo</span>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('background color', () => {
      const s = `\x1b[43mfoo`;
      const expected = `<span style="background-color:#A50;">foo</span>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('bright foreground color', () => {
      const s = `\x1b[92mfoo`;
      const expected = `<span style="color:#5F5;">foo</span>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('bright background color', () => {
      const s = `\x1b[104mfoo`;
      const expected = `<span style="background-color:#55F;">foo</span>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('foreground color (256 colors)', () => {
      const s = `\x1b[38;5;150mfoo`;
      const expected = `<span style="color:#AFD787;">foo</span>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('background color (256 colors)', () => {
      const s = `bar\x1b[48;5;41mbar\x1b[0mbar`;
      const expected = `bar<span style="background-color:#00D75F;">bar</span>bar`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('foreground color (24bit colors)', () => {
      const s = `あいう\x1b[38;2;16;33;63mえお`;
      const expected = `あいう<span style="color:#10213F;">えお</span>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('background color (24bit colors)', () => {
      const s = `\x1b[48;2;255;128;64m0123\x1b[m4567`;
      const expected = `<span style="background-color:#FF8040;">0123</span>4567`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('bold', () => {
      const s = `\x1b[1mあいうえお\x1b[0m`;
      const expected = `<b>あいうえお</b>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('italic', () => {
      const s = `\x1b[3mabc\x1b[0m`;
      const expected = `<i>abc</i>`;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

    test('not contains ansi', () => {
      const s = `foo`;
      const expected = null;
      const actual = toHtml(s);
      assert.strictEqual(actual, expected);
    });

  });

});
