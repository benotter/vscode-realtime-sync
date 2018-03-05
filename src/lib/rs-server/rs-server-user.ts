import * as net from 'net';
import { RSMessages_C, RSClientMessageType, RSUserBase, SafeJSON } from '../lib';

export class RSUserServer extends RSUserBase
{
    constructor ( socket: net.Socket )
    {
        super();
        this.socket = socket;

        socket.on( 'error', ( err ) => { } );
        socket.on( 'close', () => { } );
        socket.on( 'end', () => { } );

        socket.on( 'data', ( data ) => {
            let datStr = data.toString('utf-8');
            let datO = SafeJSON.parse<RSMessages_C.Base>( datStr, null);
            if(datO === null) { return; } // @TODO - Add Logging

            this.handleMessage( datO );
        } );
    }

    public handleMessage ( mess: RSMessages_C.Base ): boolean
    {
        switch ( mess.type )
        {
            case RSClientMessageType.Join_Request:
                return this.emit( 'join-request', mess );
            case RSClientMessageType.Leave_Report:
                return this.emit( 'leave-report', mess );
            case RSClientMessageType.AddFile_Request:
                return this.emit( 'add-file-request', mess );
            case RSClientMessageType.RemFile_Request:
                return this.emit( 'rem-file-request', mess );
            case RSClientMessageType.UpdateFile_Request:
                return this.emit( 'update-file-request', mess );
            default:
                return false;
        }
    }
}

export declare interface RSUserServer
{
    emit ( event: 'join-request', data: RSMessages_C.Base );
    on ( event: 'join-request', listener: ( data: RSMessages_C.Base ) => void );

    emit ( event: 'leave-report', data: RSMessages_C.Base );
    on ( event: 'leave-report', listener: ( data: RSMessages_C.Base ) => void );

    emit ( event: 'add-file-request', data: RSMessages_C.Base );
    on ( event: 'add-file-request', listener: ( data: RSMessages_C.Base ) => void );

    emit ( event: 'rem-file-request', data: RSMessages_C.Base );
    on ( event: 'rem-file-request', listener: ( data: RSMessages_C.Base ) => void );

    emit ( event: 'update-file-request', data: RSMessages_C.Base );
    on ( event: 'update-file-request', listener: ( data: RSMessages_C.Base ) => void );
}