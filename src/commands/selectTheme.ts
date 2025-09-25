import { showInfoMessage, showQuickPick, updateConfiguration } from "../utils/helpers";

export async function selectTheme(): Promise<void> {
    const temas = [
        'Default Dark+',
        'Default Light+',
        'Visual Studio Dark',
        'Visual Studio Light'
    ];

    const temaSeleccionado = await showQuickPick(temas, 'Selecciona un tema de color');

    if (temaSeleccionado) {
        await updateConfiguration('workbench.colorTheme', temaSeleccionado);
        showInfoMessage(`Tema cambiado a: ${temaSeleccionado}`);
    }
}

