import * as net from 'net';
import * as uuid from 'uuid';
import { RSFileID, SafeJSON } from './lib';

export type RSUserID = string;

export class RSUserBase
{
    public socket: net.Socket = new net.Socket();

    public host: boolean = false;

    public ownedFiles: RSFileID[] = [];
    public openFiles: RSFileID[] = [];

    constructor (
        public userName: string = "",
        public isServer: boolean = false,
        public id: RSUserID = uuid.v4(),
    )
    { }

    public send ( sendObj: any )
    {
        this.socket.write( SafeJSON.stringify( sendObj ) );
    }
}