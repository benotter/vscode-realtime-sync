import * as code from 'vscode';
import * as rs from '@otter-co/realtime-sync';

export function activate ( context: code.ExtensionContext )
{
    
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