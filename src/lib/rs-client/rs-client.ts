import * as net from 'net';
import { SafeJSON, RSMessageUtils } from '../util';
import
{
    ERSClientMessageType, RSClientMessages,
    ERSServerMessageType, RSServerMessages,
} from '../rs-i-types';

const {
    getBaseClientMess,
    formatMess
} = RSMessageUtils;

export class RSClient 
{
    public id: string = "";
    public userName: string = "";

    public socket: net.Socket = new net.Socket();
    public fullJoined: boolean = false;

    constructor () 
    {
        this.socket.on( 'error', () => { } );

        this.socket.on( 'connect', () =>
        {
            this.sendJoinMessage();
        } );

        this.socket.on( 'timeout', () => { } );
        this.socket.on( 'close', () => { } );
        this.socket.on( 'end', () => { } );

        this.socket.on( 'drain', () => { } );
        this.socket.on( 'data', ( data ) =>
        {
            this.handleMessage(
                SafeJSON.parse<RSServerMessages.IRSServerMessage>(
                    data.toString( 'utf-8' ),
                    {
                        type: ERSServerMessageType.BaseMessage
                    }
                ),
            );
        } );

    }

    public send ( mess: RSClientMessages.IRSClientMessage )
    {
        return this.socket.write( formatMess( mess ) );
    }

    public join ( host: string, port: number )
    {
        return new Promise( ( res, rej ) =>
        {
            this.socket.connect( port, host, ()=>{
                res();
            });
        } )
    }
    public leave () 
    {
        this.sendLeaveMessage();
    }

    private sendJoinMessage ()
    {
        this.send(
            getBaseClientMess<RSClientMessages.IRSJoinMessage>(
                ERSClientMessageType.Join,
                {
                    userName: "",
                    uuid: ""
                }
            )
        );
    }

    private sendLeaveMessage ()
    {
        this.send(
            getBaseClientMess<RSClientMessages.IRSLeaveMessage>(
                ERSClientMessageType.Leave,
                {
                    uuid: "",
                }
            )
        );
    }

    private handleMessage ( mess: RSServerMessages.IRSServerMessage )
    {
        switch ( mess.type )
        {
            case ERSServerMessageType.UserJoined:
                break;

            case ERSServerMessageType.UserLeft:
                break;

            case ERSServerMessageType.UserAddFile:
                break;

            case ERSServerMessageType.UserRemFile:
                break;

            case ERSServerMessageType.UserEditFile:
                break;

            default:
                break;
        }
    }
}