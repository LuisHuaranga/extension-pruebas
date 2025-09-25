import { showInfoMessage,getActiveEditor } from "../utils/helpers"

export function insertDate():void {
    
    const editor = getActiveEditor();
    
    if (!editor) {
        showInfoMessage('¡No hay un editor activo!');
        return;
    }

    const fecha = new Date().toLocaleDateString()

    editor.edit(editBuilder => {
        const position = editor.selection.active;
        editBuilder.insert(position, fecha);
    });

    showInfoMessage(`Fecha insertada: ${fecha}`);    


}