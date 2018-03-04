import * as net from 'net';
import { ERSClientMessageType, RSClieantMessages } from '../rs-i-types';
import { RSMessageUtils } from '../util';

const {
    getBaseMess,
    formatMess
} = RSMessageUtils;

export class RSClient 
{
    public socket: net.Socket = new net.Socket();
    public fullJoined: boolean = false;

    constructor () { }

    public send ( mess: RSClieantMessages.IRSClientMessage )
    {
        return this.socket.write( formatMess( mess ) );
    }

    public join ( host: string, port: number )
    {
        this.socket.connect( port, host, () =>
        {
            this.sendJoinMessage();
        } );

    }
    public leave () { }

    private sendJoinMessage ()
    {
        this.send(
            getBaseMess<RSClieantMessages.IRSJoinMessage>(
                ERSClientMessageType.JoinMessage,
                {
                    userName: "",
                    uuid: ""
                }
            )
        );
    }

    private sendLeaveMessage ()
    {
        
    }
}