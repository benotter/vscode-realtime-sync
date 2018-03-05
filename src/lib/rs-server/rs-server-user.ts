import * as net from 'net';
import { RSMessages_C, RSClientMessageType, RSUserBase } from '../lib';

export class RSUserServer extends RSUserBase
{
    constructor ( socket: net.Socket, ...args: any[] )
    {
        super( ...args );
        this.socket = socket;
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
                return this.emit('add-file-request', mess );
            case RSClientMessageType.RemFile_Request:
                return this.emit('rem-file-request', mess );
            case RSClientMessageType.UpdateFile_Request:
                return this.emit('update-file-request', mess );
            default:
                return false;
        }
    }
}

export declare interface RSUserServer
{
    emit ( event: 'join-request', data: RSMessages_C.Base );
    on ( event: 'join-request', listener: () => void );

    emit ( event: 'leave-report', data: RSMessages_C.Base );
    on ( event: 'leave-report', listener: () => void );

    emit ( event: 'add-file-request', data: RSMessages_C.Base );
    on ( event: 'add-file-request', listener: () => void );

    emit ( event: 'rem-file-request', data: RSMessages_C.Base );
    on ( event: 'rem-file-request', listener: () => void );

    emit ( event: 'update-file-request', data: RSMessages_C.Base );
    on ( event: 'update-file-request', listener: () => void );
}