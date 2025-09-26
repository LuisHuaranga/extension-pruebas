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

/**
 * Muestra una lista de opciones al usuario y retorna la seleccionada.
 * @param items Lista de opciones a mostrar.
 * @param placeHolder Texto de ayuda que se muestra en el selector.
 * @returns La opción seleccionada o undefined si se cancela.
 */
export async function showQuickPick(items: string[], placeHolder: string): Promise<string | undefined>  {
    const quickPickItems: vscode.QuickPickItem[] = items.map(item => ({ label: item }));
    const selected = await vscode.window.showQuickPick(quickPickItems, {placeHolder: placeHolder});
    return selected?.label;
}

/**
 * Actualiza la configuración de VS Code en el espacio de trabajo.
 * @param section Sección de configuración a actualizar.
 * @param value Nuevo valor para la configuración.
 */
export async function updateConfiguration(section: string, value: any): Promise<void> {
    vscode.workspace.getConfiguration().update(
        section,
        value,
        vscode.ConfigurationTarget.Workspace
    );
}
