import Convert = require("ansi-to-html");

function replace(s: string): string {
  return s.replace(/\\x1b/g, "\x1b").replace(/\\n/g, "\n");
}

function colorReplacer(match: string, rgb: string, offset: string, s: string): string {
  return `color:#${rgb.toUpperCase()};`;
}

function replaceStyles(s: string): string {
  // renderer accepts only <span style="color:#a00;">foo</span> format...
  // https://github.com/microsoft/vscode/blob/main/src/vs/base/browser/markdownRenderer.ts
  return s.replace(/color:#([0-9a-fA-F]+)/g, colorReplacer);
}

function containsAnsi(s: string): boolean {
  return s.indexOf("\x1b") !== -1;
}

export function toHtml(s: string): string | null {
  const c = new Convert({
    newline: true,
  });
  const t = replace(s);
  if (!containsAnsi(t)) {
    return null;
  }
  const html = c.toHtml(t);
  return replaceStyles(html);
}
