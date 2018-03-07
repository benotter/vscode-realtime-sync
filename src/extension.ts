import * as code from 'vscode';
import * as rs from '@otter-co/realtime-sync';
import * as CONST from './const';
export function activate ( context: code.ExtensionContext )
{
    const config = code.workspace.getConfiguration(),
        cfg = config.get<VSCodeRSConfig>( 'realtime-sync' ) as VSCodeRSConfig;

    console.log( cfg );

    const mem: {
        client: rs.RSClient | null,
        server: rs.RSServer | null
    } = {
            client: null,
            server: null,
        };

    context.subscriptions.push(
        code.commands.registerCommand( 'rs.startServer', ( ...args ) =>
        {
            if ( !mem.server )
                mem.server = new rs.RSServer( notify, cfg.server.port, cfg.server.host || void 0 );

            mem.server.start()
                .then( () =>
                    notify.info( CONST.LOG.INFO_SERVER_STARTED( cfg.server.port, cfg.server.host ) )
                )
                .catch( ( err ) => notify.error( err ) );
        } ),

        code.commands.registerCommand( 'rs.stopServer', ( ...args ) =>
        {
            if ( mem.server )
                mem.server.stop()
                    .then( () => notify.info( CONST.LOG.INFO_SERVER_STOPPED ) )
                    .catch( () => notify.warn( CONST.LOG.WARN_SERVER_NOT_STARTED ) );
        } ),
        code.commands.registerCommand( 'rs.joinServer', ( ...args ) =>
        {

        } ),
        code.commands.registerCommand( 'rs.leaveServer', ( ...args ) =>
        {

        } ),
        code.commands.registerCommand( 'rs.setDefaultUsername', ( ...args ) =>
        {
            code.window.showInputBox( {
                placeHolder: "realtime-sync username",
            } ).then( ( userN ) =>
            {

                if ( userN = ' ' )
                {
                    config.update( CONST.SETTINGS.CLIENT_DEF_USERNAME, void 0 );
                    notify.info( `Clearing Default Username!` );
                }
                else if ( userN )
                {
                    config.update( CONST.SETTINGS.CLIENT_DEF_USERNAME, userN );
                    notify.info( `Set Default Username to "${ userN }"!` );
                }
                else
                    notify.info( 'Did not set Default Username!' );
            } );
        } ),
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