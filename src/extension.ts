import * as vscode from 'vscode';
import * as commands from './commands';

export function activate(context: vscode.ExtensionContext) {
    const disposables = commands.registerAll(context);
    context.subscriptions.push(...disposables);	
}

export function deactivate() {}
