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
      const selection = vscode.window.activeTextEditor?.selection;
      if (!selection?.contains(position)) {
        return null;
      }
      const selectedText = document.getText(selection);
      const md = toMarkdownString(selectedText);
      return new vscode.Hover(md);
    }
  });
}

export function deactivate() {}
