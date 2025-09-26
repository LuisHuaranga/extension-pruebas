import { getActiveEditor,showInfoMessage } from '../utils/helpers';

export function wordCount(): void {
    const editor = getActiveEditor();

    if (!editor) {
        showInfoMessage('No hay un editor de texto activo.');
        return;
    }

    const document = editor.document;
    const texto = document.getText();
    const palabras = texto.split(/\s+/).filter(word => word.length > 0);
    const numeroPalabras = palabras.length;
    
    showInfoMessage(`El documento tiene ${numeroPalabras} palabras.`);
}