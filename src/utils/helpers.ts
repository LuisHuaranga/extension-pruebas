import * as vscode from 'vscode';

/**
 * Obtiene el editor de texto activo en VS Code.
 * @returns El editor activo o undefined si no hay ninguno.
 */
export function getActiveEditor(): vscode.TextEditor | undefined {
    return vscode.window.activeTextEditor;
}

/**
 * Muestra un mensaje informativo en la barra de VS Code.
 * @param message El mensaje a mostrar.
 */
export function showInfoMessage(message: string): void {
    vscode.window.showInformationMessage(message);
}

export async function showQuickPick(items: string[], placeHolder: string): Promise<string | undefined>  {
    const quickPickItems: vscode.QuickPickItem[] = items.map(item => ({ label: item }));
    const selected = await vscode.window.showQuickPick(quickPickItems, {placeHolder: placeHolder});
    return selected?.label;
}

export async function updateConfiguration(section: string, value: any): Promise<void> {
    vscode.workspace.getConfiguration().update(
        section,
        value,
        vscode.ConfigurationTarget.Workspace
    );
}
