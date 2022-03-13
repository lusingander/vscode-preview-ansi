import * as vscode from 'vscode';
import { toHtml } from './ansi';

function toMarkdownString(s: string): vscode.MarkdownString {
  const html = toHtml(s);
  const md = new vscode.MarkdownString(html);
  md.supportHtml = true;
  md.isTrusted = true;
  return md;
}

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerHoverProvider('*', {
    provideHover(document, position, token) {
      const selection = document.getText(vscode.window.activeTextEditor?.selection);
      const md = toMarkdownString(selection);
      return new vscode.Hover(md);
    }
  });
}

export function deactivate() {}
