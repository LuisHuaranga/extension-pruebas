// Módulo principal de la extensión VSCode.
// - Registra comandos, crea un elemento en la barra de estado y mantiene actualizado un contador de líneas.
// - Escucha cambios de editor activo y del contenido para refrescar la información mostrada.

import * as vscode from 'vscode';
import * as commands from './commands';
import { lineCounter } from './commands/lineCounter';


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
    const treeView = vscode.window.createTreeView('luiso-extension.miPanel', {
        treeDataProvider: miProveedor
    });

    // Comando para agregar elementos
    let agregarElemento = vscode.commands.registerCommand('luiso-extension.agregarElemento', () => {
        miProveedor.agregarElemento();
        vscode.window.showInformationMessage('✅ Elemento agregado al panel');
    });

    // Comando para actualizar
    let actualizarPanel = vscode.commands.registerCommand('luiso-extension.actualizarPanel', () => {
        vscode.window.showInformationMessage('🔄 Panel actualizado');
    });

    // Comando cuando se hace clic en un elemento
    let clickElemento = vscode.commands.registerCommand('luiso-extension.clickElemento', (element: MiElemento) => {
        vscode.window.showInformationMessage(`🎯 Hiciste clic en: ${element.label}`);
    });

    // Comando para eliminar elemento
    let eliminarElemento = vscode.commands.registerCommand('luiso-extension.eliminarElemento', (element: MiElemento) => {
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


    // Construir y mostrar un elemento en la barra de estado donde se mostrará el contador de líneas.
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
    statusBarItem.show();

    // Registrar todos los comandos de la extensión y añadir sus disposables al contexto para limpieza posterior.
    const disposables = commands.registerAll(context);
    context.subscriptions.push(...disposables);

    // Suscribirse a cambios del editor activo para actualizar el contador cuando el usuario cambie de archivo.
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(() => lineCounter(statusBarItem))
    );

    // Suscribirse a cambios en el contenido del documento para actualizar el contador cuando se edita el archivo.
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(() => lineCounter(statusBarItem))
    );

    // Realizar una actualización inicial del contador al activar la extensión.
    lineCounter(statusBarItem);
}

export function deactivate() { }
