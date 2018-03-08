import * as code from 'vscode';
import * as rs from '@otter-co/realtime-sync';
import * as CONST from './const';

import SetDefUserN from './commands/rs.set_default_username';

export type ExtMemory = {
    client: rs.RS_C_Client | null;
    server: rs.RS_C_Server | null;

    userName: string | null;
    userID: string | null;

    config: code.WorkspaceConfiguration;
    cfg: VSCodeRSConfig;
    notify: {
        info: ( note: string ) => Thenable<string | void>;
        warn: ( note: string ) => Thenable<string | void>;
        error: ( note: string ) => Thenable<string | void>;
    }
};

export function activate ( context: code.ExtensionContext )
{
    const config = code.workspace.getConfiguration();
    const cfg = config.get<VSCodeRSConfig>( 'realtime-sync' ) as VSCodeRSConfig;

    const notify = {
        info: ( note: string ) => code.window.showInformationMessage( note ),
        warn: ( note: string ) => code.window.showWarningMessage( note ),
        error: ( note: string ) => code.window.showErrorMessage( note ),
    };

    const mem: ExtMemory = {
        client: null,
        server: null,
        userName: null,
        userID: null,
        config,
        cfg,
        notify
    };

    context.subscriptions.push(
        code.commands.registerCommand( 'rs.startServer',
            ( ...args ) => { }
        ),
        code.commands.registerCommand( 'rs.stopServer',
            ( ...args ) => { }
        ),
        code.commands.registerCommand( 'rs.joinServer',
            ( ...args ) => { }
        ),
        code.commands.registerCommand( 'rs.leaveServer',
            ( ...args ) => { }
        ),
        code.commands.registerCommand( 'rs.setDefaultUsername',
            ( ...args ) => SetDefUserN( mem )
        ),
    );
}

export function deactivate ()
{
    code.window.showInformationMessage( "Extension Done!" );
    console.log( "Extension Deactived!" );
}

