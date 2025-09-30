import * as vscode from 'vscode';

class MiElemento extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label} - Mi elemento personalizado`;
        this.description = "Click para acción";
    }
}

class MiProveedor implements vscode.TreeDataProvider<MiElemento> {
    private _onDidChangeTreeData = new vscode.EventEmitter<MiElemento | undefined>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    private elementos: MiElemento[] = [
        new MiElemento("Elemento 1", vscode.TreeItemCollapsibleState.None),
        new MiElemento("Elemento 2", vscode.TreeItemCollapsibleState.None),
        new MiElemento("Carpeta", vscode.TreeItemCollapsibleState.Collapsed)
    ];

    getTreeItem(element: MiElemento): vscode.TreeItem {
        return element;
    }

    getChildren(element?: MiElemento): Thenable<MiElemento[]> {
        if (element) {
            // Elementos hijos (para carpetas)
            return Promise.resolve([
                new MiElemento("Sub-elemento 1", vscode.TreeItemCollapsibleState.None),
                new MiElemento("Sub-elemento 2", vscode.TreeItemCollapsibleState.None)
            ]);
        }
        return Promise.resolve(this.elementos);
    }

    agregarElemento() {
        const nuevoElemento = new MiElemento(
            `Elemento ${this.elementos.length + 1}`,
            vscode.TreeItemCollapsibleState.None
        );
        this.elementos.push(nuevoElemento);
        this._onDidChangeTreeData.fire(undefined);
    }

    eliminarElemento(element: MiElemento) {
        this.elementos = this.elementos.filter(e => e !== element);
        this._onDidChangeTreeData.fire(undefined);
    }
}

let miProveedor: MiProveedor;

export function activate(context: vscode.ExtensionContext) {
    miProveedor = new MiProveedor();
    
    // Registrar la vista
    const treeView = vscode.window.createTreeView('mi-extension.miPanel', {
        treeDataProvider: miProveedor
    });

    // Comando para agregar elementos
    let agregarElemento = vscode.commands.registerCommand('mi-extension.agregarElemento', () => {
        miProveedor.agregarElemento();
        vscode.window.showInformationMessage('✅ Elemento agregado al panel');
    });

    // Comando para actualizar
    let actualizarPanel = vscode.commands.registerCommand('mi-extension.actualizarPanel', () => {
        vscode.window.showInformationMessage('🔄 Panel actualizado');
    });

    // Comando cuando se hace clic en un elemento
    let clickElemento = vscode.commands.registerCommand('mi-extension.clickElemento', (element: MiElemento) => {
        vscode.window.showInformationMessage(`🎯 Hiciste clic en: ${element.label}`);
    });

    // Comando para eliminar elemento
    let eliminarElemento = vscode.commands.registerCommand('mi-extension.eliminarElemento', (element: MiElemento) => {
        miProveedor.eliminarElemento(element);
        vscode.window.showInformationMessage(`🗑️ Elemento eliminado: ${element.label}`);
    });

    context.subscriptions.push(
        treeView,
        agregarElemento,
        actualizarPanel,
        clickElemento,
        eliminarElemento
    );
}