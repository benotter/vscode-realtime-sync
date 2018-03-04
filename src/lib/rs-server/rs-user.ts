import * as net from 'net';
import { RSServer } from './rs-server';
import { ERSClientMessageType, RSClieantMessages } from '../rs-i-types';

export class RSUser
{
    public fullyJoined: boolean = false;

    private _onJoin: () => void = () => { };
    private _onLeave: () => void = () => { };

    constructor (
        public rs: RSServer,
        private socket: net.Socket,
    )
    {
        socket.on( 'error', ( err ) => { } );
        socket.on( 'connect', () => { } );
        socket.on( 'lookup', ( err, addr, fam, host ) => { } );
        
        socket.on( 'close', ( hadErr ) => { } );
        socket.on( 'timeout', () => { } );
        socket.on( 'end', () =>
        {
            this.fullyJoined = false;
            this._onLeave();
        } );

        socket.on( 'data', ( data ) => { } );
        socket.on( 'drain', () => { } );
    }

    public onJoin ( cb: () => void ) { this._onJoin = cb; }
    public onLeave ( cb: () => void ) { this._onLeave = cb; }

    private handleMessage( mess: RSClieantMessages.IRSClientMessage )
    {
        switch(mess.type)
        {
            case ERSClientMessageType.BaseMessage:
                break;

            default:
                break;
        }
    }
}