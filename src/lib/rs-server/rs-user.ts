import * as net from 'net';
import { SafeJSON, RSMessageUtils } from '../util'
import { RSServer } from './rs-server';
import { 
    ERSServerMessageType, RSServerMessages,
    ERSClientMessageType, RSClientMessages
} from '../rs-i-types';

export class RSUser
{

    public id: string = '';
    public userName: string = '';
    
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

        socket.on( 'drain', () => { } );
        socket.on( 'data',
            ( data ) =>
            {
                this.handleMessage(
                    SafeJSON.parse<RSClientMessages.IRSClientMessage>(
                        data.toString( 'utf-8' ),
                        {
                            type: ERSClientMessageType.BaseMessage,
                        }
                    )
                );
            } );
    }
    
    private send( mess: RSServerMessages.IRSServerMessage )
    {
        this.socket.write( RSMessageUtils.formatMess( mess ) );
    }

    public onJoin ( cb: () => void ) { this._onJoin = cb; }
    public onLeave ( cb: () => void ) { this._onLeave = cb; }

    private handleMessage ( mess: RSClientMessages.IRSClientMessage )
    {
        switch ( mess.type )
        {
            case ERSClientMessageType.BaseMessage:
            default:
                break;
        }
    }

    public sendJoinedMessage()
    {
        this.send(
            RSMessageUtils.getBaseServerMess(
                ERSServerMessageType.UserJoinedMessage,
                {}
            )
        );
    }

    public sendLeftMessage()
    {
        this.send(
            RSMessageUtils.getBaseServerMess(
                ERSServerMessageType.UserLeftMessage,
                {}
            )
        )
    }
}