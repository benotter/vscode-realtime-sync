import * as code from 'vscode';

import { RSServer } from './lib/rs-server/rs-server';
import { RSClient } from './lib/rs-client/rs-client';
import { RSStatusBar } from './lib/ui/rs-status-bar';

let server: RSServer;
let client: RSClient;
let statusBar: RSStatusBar;

export function activate ( context: code.ExtensionContext )
{
    let {
        realtime_sync: {
            serverPort = 8117,
            clientPort = 8117,
            // userName = null,
        } = {}
    } = code.workspace.getConfiguration( 'realtime-sync' );

    statusBar = new RSStatusBar( code.window.createStatusBarItem( code.StatusBarAlignment.Right ) );

    let startUpDisp = code.commands.registerCommand( 'extension.startUpRS', () =>
    {
        server = new RSServer();
        client = new RSClient();
    } );

    let startServerDisp = code.commands.registerCommand( 'extension.startRSServer', () => 
    {
        server.start( serverPort );
        statusBar.setServer();
    } );

    let stopServerDisp = code.commands.registerCommand( 'extension.stopRSServer', () => 
    {
        server.stop();
        statusBar.setIdle();
    } );

    let joinServerDisp = code.commands.registerCommand( 'extension.joinRSServer', () =>
    {
        code.window.showInputBox( { placeHolder: "localhost" } )
            .then( addr =>
            {
                if ( !addr )
                    return;

                client.join( addr, clientPort );
                statusBar.setClient();
            } );
    } );

    let leaveServerDisp = code.commands.registerCommand( 'extension.leaveRSServer', () =>
    {
        client.leave();
        statusBar.setIdle();
    } );

    let addFileDisp = code.commands.registerCommand( 'extension.addFileToRS', () => { } );
    let remFileDisp = code.commands.registerCommand( 'extension.remFileFromRS', () => { } );

    context.subscriptions.push(
        startUpDisp,
        startServerDisp,
        stopServerDisp,
        addFileDisp,
        remFileDisp,
        joinServerDisp,
        leaveServerDisp,
    );
}

export function deactivate ()
{
    code.window.showInformationMessage( "Extension Done!" );
    console.log( "Extension Deactived!" );
}

const notify = {
    info: ( note: string ) => code.window.showInformationMessage( note ),
    warn: ( note: string ) => code.window.showWarningMessage( note ),
    error: ( note: string ) => code.window.showErrorMessage( note ),
};