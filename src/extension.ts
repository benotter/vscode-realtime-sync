import * as vscode from 'vscode';

export function activate ( context: vscode.ExtensionContext )
{
    console.log( 'Congratulations, your extension "realtime-sync" is now active!' );

    let disposable = vscode.commands.registerCommand( 'extension.startRSServer', () =>
    {
        vscode.window.showInformationMessage( 'Hello World!' );
    } );

    context.subscriptions.push( disposable );
}

export function deactivate ()
{

    vscode.window.showInformationMessage( "Extension Done!" );
    console.log( "Extension Deactived!" );
}