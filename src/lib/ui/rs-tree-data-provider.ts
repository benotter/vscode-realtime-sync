import * as vscode from 'vscode';

class TestFile
{
    public fileName: string = "test.ts";
}

export class RSTreeDataProvider implements vscode.TreeDataProvider<TestFile>
{
    public getTreeItem ( el: TestFile ): vscode.TreeItem
    {
        let ti = new vscode.TreeItem( el.fileName );
        return ti;
    }
    public getChildren( el: TestFile ): TestFile[]
    {
        return [];
    }
}