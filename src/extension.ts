// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TasksTreeProvider, TaskTreeItem } from './tasksTreeProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const tasksTreeProvider = new TasksTreeProvider();
	vscode.window.createTreeView('tasksExplorer', {
		treeDataProvider: tasksTreeProvider
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tasker.fetchTasks', () => {
		tasksTreeProvider.fetch();
	});
	
	const taskWatcher = vscode.workspace.createFileSystemWatcher('**/.vscode/tasks.json');
	taskWatcher.onDidChange(()=>vscode.commands.executeCommand('tasker.fetchTasks'));

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('tasker.executeTask', (node: TaskTreeItem) => {
		vscode.tasks.executeTask(node.task);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
