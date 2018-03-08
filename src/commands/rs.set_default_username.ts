import * as code from 'vscode';
import { ExtMemory } from '../extension';
import * as CONST from '../const';

export default function SetDefaultUsername ( mem: ExtMemory )
{
    let { config, notify } = mem;

    code.window
    .showInputBox( { placeHolder: "realtime-sync username", } )
    .then( ( userN ) =>
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
}