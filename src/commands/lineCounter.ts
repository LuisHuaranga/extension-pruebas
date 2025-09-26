import {getActiveEditor} from '../utils/helpers';
import * as vscode from 'vscode';


export function lineCounter(statusBarItem: vscode.StatusBarItem): void {


    const editor = getActiveEditor();
    if (editor) {
        const lineCount = editor.document.lineCount;
        statusBarItem.text = `📊 MIRA LAS ALINEAS PERRO: ${lineCount}`;
    }
        
}
