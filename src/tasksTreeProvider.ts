import * as vscode from 'vscode';

export class TasksTreeProvider implements vscode.TreeDataProvider<TaskTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<TaskTreeItem | undefined | null | void> = new vscode.EventEmitter<TaskTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<TaskTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    constructor() {}

    getTreeItem(element: TaskTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TaskTreeItem): Thenable<TaskTreeItem[]> {
        return Promise.resolve(vscode.tasks.fetchTasks().then(tasks => tasks.map(task => new TaskTreeItem(task))));
    }
    fetch():void{
        this._onDidChangeTreeData.fire();
    }
}

const icons : {[type: string]: string} = {
    "shell": "terminal",
    "process": "gear"
}

export class TaskTreeItem extends vscode.TreeItem {
  constructor(
    public readonly task: vscode.Task
  ) {
    super(task.name, vscode.TreeItemCollapsibleState.None);
    this.iconPath = new vscode.ThemeIcon(icons[task.definition.type])
    this.task = task
  }

}

