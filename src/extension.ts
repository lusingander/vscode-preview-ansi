import * as vscode from 'vscode';
import { toHtml } from './ansi';

function toMarkdownString(s: string): vscode.MarkdownString | null {
  const html = toHtml(s);
  if (!html) {
    return null;
  }
  const md = new vscode.MarkdownString(html);
  md.supportHtml = true;
  md.isTrusted = true;
  return md;
}

export function activate(context: vscode.ExtensionContext) {
  vscode.languages.registerHoverProvider('*', {
    provideHover(document, position, token) {
      const selection = vscode.window.activeTextEditor?.selection;
      if (!selection?.contains(position)) {
        return null;
      }
      const selectedText = document.getText(selection);
      const md = toMarkdownString(selectedText);
      if (!md) {
        return null;
      }
      return new vscode.Hover(md);
    }
  });
}

export function deactivate() {}
