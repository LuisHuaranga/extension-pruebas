"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
class MiElemento extends vscode.TreeItem {
    label;
    collapsibleState;
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.tooltip = `${this.label} - Mi elemento personalizado`;
        this.description = "Click para acción";
    }
}
class MiProveedor {
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    elementos = [
        new MiElemento("Elemento 1", vscode.TreeItemCollapsibleState.None),
        new MiElemento("Elemento 2", vscode.TreeItemCollapsibleState.None),
        new MiElemento("Carpeta", vscode.TreeItemCollapsibleState.Collapsed)
    ];
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
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
        const nuevoElemento = new MiElemento(`Elemento ${this.elementos.length + 1}`, vscode.TreeItemCollapsibleState.None);
        this.elementos.push(nuevoElemento);
        this._onDidChangeTreeData.fire(undefined);
    }
    eliminarElemento(element) {
        this.elementos = this.elementos.filter(e => e !== element);
        this._onDidChangeTreeData.fire(undefined);
    }
}
let miProveedor;
function activate(context) {
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
    let clickElemento = vscode.commands.registerCommand('mi-extension.clickElemento', (element) => {
        vscode.window.showInformationMessage(`🎯 Hiciste clic en: ${element.label}`);
    });
    // Comando para eliminar elemento
    let eliminarElemento = vscode.commands.registerCommand('mi-extension.eliminarElemento', (element) => {
        miProveedor.eliminarElemento(element);
        vscode.window.showInformationMessage(`🗑️ Elemento eliminado: ${element.label}`);
    });
    context.subscriptions.push(treeView, agregarElemento, actualizarPanel, clickElemento, eliminarElemento);
}
//# sourceMappingURL=v2.js.map