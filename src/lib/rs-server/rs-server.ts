import * as net from 'net';
import 
{
    CONST,
    RSFile,
    RSFileID,
    RSUserID,
    RSUserServer,
    RSMessages_S,
    RSMessages_C,
    RSServerMessageType,
    RSClientMessageType,
} from '../lib';

export class RSServer
{
    public server: net.Server = net.createServer();

    public get serverStarted () { return this.server.listening; }

    public userList: RSUserServer[] = [];
    public fileList: RSFile[] = [];

    constructor (
        public log: {
            info: ( str: string ) => any,
            warn: ( str: string ) => any,
            error: ( str: any ) => any
        } = { info: () => { }, warn: () => { }, error: () => { }, },

        public port: number = CONST.NETWORK.DEFAULT_PORT,
        public host?: string,
    )
    {
        let s = this.server;

        s.on( 'error', ( err ) => this.handleError( err ) );
        s.on( 'connection', ( s ) => this.handleNewUser( s ) );
        s.on( 'close', () => { } );
    }

    public start ( cb: () => void = () => { } )
    {
        this.server.on( 'listening', () =>
        {
            this.log.info( CONST.LOG.SERVER_START );
            cb();
        } );

        this.server.listen( this.port, this.host );
    }

    public stop ( cb: () => void = () => { } )
    {
        if ( this.serverStarted )
            this.server.close();
    }

    public blast ( mess: RSMessages_S.Base )
    {
        for ( let user of this.userList )
            user.send( mess );
    }

    private handleError ( err: Error )
    {
        this.log.error( err );
    }

    private handleNewUser ( soc: net.Socket ) 
    {
        let newUser = new RSUserServer( soc );

        newUser.on( 'join-request', ( mess: RSMessages_C.Base ) =>
        {
            newUser.on( 'leave-report', () => { } );
            newUser.on( 'add-file-request', () => { } );
            newUser.on( 'rem-file-request', () => { } );
            newUser.on( 'update-file-request', () => { } );
        } );
    }

    private 
}