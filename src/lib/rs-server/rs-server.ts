import * as net from 'net';
import { RSUser } from './rs-user';

export class RSServer 
{
    public ser: net.Server = net.createServer( this._defOpts );

    public users: RSUser[] = [];

    constructor (
        public _defOpts: any = {},
    )
    { }

    public start ( port: number )
    {
        this.ser.listen( port, () => { } );
        this.ser.on('close', ()=> { });

        this.ser.on( 'connection',
            ( sock ) =>
            {
                let newUser = new RSUser( this, sock );
                newUser.onJoin( () => { } );
                newUser.onLeave( () => { } );
            } );
        this.ser.on( 'error',
            ( err ) =>
            {

            } );
    }

    public stop ()
    {
        this.ser.close( () => { } );
    }


    private onJoin () { }
    private onLeave () { }
}