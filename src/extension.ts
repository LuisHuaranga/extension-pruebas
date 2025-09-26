import * as vscode from 'vscode';
import * as commands from './commands';
import { lineCounter } from './commands/lineCounter';

export function activate(context: vscode.ExtensionContext) {

    //Construir elementos 
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
    statusBarItem.show();

    //Registrar comandos    
    const disposables = commands.registerAll(context);
    context.subscriptions.push(...disposables);	

    // Actualizar cuando cambia el editor activo
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(() => lineCounter(statusBarItem))
    );

    // Actualizar cuando cambia el contenido
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(() => lineCounter(statusBarItem))
    );

    // Actualizar inicialmente
    lineCounter(statusBarItem);
}

export function deactivate() {}
