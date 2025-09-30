import * as vscode from 'vscode';
import { helloWorld } from './helloWorld';
import { wordCount } from './wordCount';
import { insertDate } from './insertDate';
import { selectTheme } from './selectTheme';
import {mensajeContextual} from './mensajeContextual';

// Interface para estandarizar los comandos
export interface Command {
    id: string;
    execute: (...args: any[]) => any;
}

// Lista de todos los comandos
export const allCommands: Command[] = [
    { id: 'luiso-extension.helloWorld', execute: helloWorld },
    { id: 'luiso-extension.wordCount', execute: wordCount },
    { id: 'luiso-extension.insertDate', execute: insertDate },
    { id: 'luiso-extension.selectTheme', execute: selectTheme },
    { id: 'luiso-extension.mensajeContextual', execute: mensajeContextual },    
];

// Función para registrar todos los comandos
export function registerAll(context: vscode.ExtensionContext): vscode.Disposable[] {
    return allCommands.map(command => 
        vscode.commands.registerCommand(command.id, command.execute)
    );
}

