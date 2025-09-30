// Módulo: comando que muestra información contextual del editor activo.
// - Si hay selección de texto: muestra la selección y las líneas, y convierte la selección a mayúsculas.
// - Si no hay selección: muestra la posición del cursor.
// - Si no hay editor activo: notifica al usuario.

import { showInfoMessage,getActiveEditor } from "../utils/helpers";

export function mensajeContextual():void {

    // Obtener el editor activo en VSCode (si existe)
    const editor = getActiveEditor();
        
    if (!editor) {
        // Sin editor activo: informar al usuario y terminar
        showInfoMessage('No hay editor activo');
        return;
    }

    // Obtener la selección actual en el editor
    const selection = editor.selection;
    const textoSeleccionado = editor.document.getText(selection);
    const lineaInicio = selection.start.line + 1;
    const lineaFin = selection.end.line + 1;

    if (textoSeleccionado) {
        // Caso: hay texto seleccionado
        // Mostrar mensaje con el texto y el rango de líneas seleccionado
        showInfoMessage(
            `Selección: "${textoSeleccionado}" (Líneas ${lineaInicio}-${lineaFin})`
        );

        // Reemplazar la selección por su versión en mayúsculas
        if (editor && !editor.selection.isEmpty) {
            // Ejecutar la edición y notificar al usuario cuando termine
            editor.edit(editBuilder => {
                const selection = editor.selection;
                const textoOriginal = editor.document.getText(selection);
                editBuilder.replace(selection, textoOriginal.toUpperCase());
            }).then(success => {
                if (success) {
                    // Acción completada: informar que la selección fue convertida
                    showInfoMessage('Selección convertida a mayúsculas');
                } else {
                    // Si la edición falló, informar también
                    showInfoMessage('No se pudo convertir la selección');
                }
            });
        }

    } else {
        // Caso: no hay selección, sólo el cursor
        // Mostrar la posición del cursor (línea y columna)
        const posicion = selection.active;
        showInfoMessage(
            `📍 Cursor en línea ${posicion.line + 1}, columna ${posicion.character + 1}`
        );
    }
}