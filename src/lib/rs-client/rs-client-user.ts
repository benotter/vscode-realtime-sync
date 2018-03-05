import { EventEmitter } from 'events';
import
{
    RSUserBase,
    RSMessages_C,
    RSMessages_S,
    RSClientMessageType,
    RSServerMessageType,
    RSUserID,
} from '../lib';

export class RSUserClient extends RSUserBase
{
    constructor ( userName: string )
    {
        super( userName, false );
    }

    public join ( host: string, port: number )
    {
        return new Promise( ( res, rej ) =>
        {
            let errFunc = err => rej( err );

            this.socket.once( 'error', errFunc );
            this.socket.connect( port, host, () =>
            {
                this.socket.removeListener( 'error', errFunc );
                return res( this );
            } );
        } );
    }

    public handleMessage ( mess: RSMessages_S.Base )
    {
        switch ( mess.type )
        {
            case RSServerMessageType.Join_Response:
                return this.emit( 'join-response', mess );
            case RSServerMessageType.AddFile_Response:
                return this.emit( 'add-file-response', mess );
            case RSServerMessageType.RemFile_Response:
                return this.emit( 'rem-file-response', mess );
            case RSServerMessageType.UpdateFile_Response:
                return this.emit( 'update-file-response', mess );
            case RSServerMessageType.Blast_OnJoin:
                return this.emit( 'blast-on-join', mess );
            case RSServerMessageType.Blast_OnLeave:
                return this.emit( 'blast-on-leave', mess );
            case RSServerMessageType.Blast_FileAdded:
                return this.emit( 'blase-file-added', mess );
            case RSServerMessageType.Blast_FileRemoved:
                return this.emit( 'blast-file-removed', mess );
            case RSServerMessageType.Blast_FileUpdated:
                return this.emit( 'blast-file-updated', mess );
            default:
                break;
        }
    }
}

export declare interface RSUserClient 
{
    on ( event: "join-response", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "join-response", data: RSMessages_S.Base );

    on ( event: "add-file-response", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "add-file-response", data: RSMessages_S.Base );

    on ( event: "rem-file-response", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "rem-file-response", data: RSMessages_S.Base );

    on ( event: "update-file-response", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "update-file-response", data: RSMessages_S.Base );

    on ( event: "blast-on-join", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "blast-on-join", data: RSMessages_S.Base );

    on ( event: "blast-on-leave", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "blast-on-leave", data: RSMessages_S.Base );

    on ( event: "blase-file-added", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "blase-file-added", data: RSMessages_S.Base );

    on ( event: "blast-file-removed", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "blast-file-removed", data: RSMessages_S.Base );

    on ( event: "blast-file-updated", listener: ( mess: RSMessages_S.Base ) => void );
    emit ( event: "blast-file-updated", data: RSMessages_S.Base );
}