import * as net from 'net';
import { RSUser } from './rs-user';
import { RSFile, RSFileID } from '../rs-file';

export class RSServer 
{
    public ser: net.Server = net.createServer( this._defOpts );

    public users: RSUser[] = [];
    public fileList: RSFile[] = [];

    constructor (
        public _defOpts: any = void 0,
    )
    { }

    public start ( port: number )
    {
        return new Promise( ( res, rej ) =>
        {
            this.ser.on( 'error',
                ( err ) =>
                {
                    throw err;
                } );

            this.ser.on( 'close', () => { } );

            this.ser.on( 'connection',
                ( sock ) =>
                {
                    let newUser = new RSUser( this, sock );

                    newUser.onJoin( () => this.onJoin( newUser ) );
                    newUser.onLeave( () => this.onLeave( newUser ) );
                    newUser.onAddFile( ( fileName, fileStr ) => this.addFile( fileName, fileStr ) );
                    newUser.onRemFile( ( fileName ) => this.remFile( fileName ) );
                    newUser.onFileEdit( ( fileID, updateDelta ) => this.updateFile( fileID, updateDelta ) );
                } );

            this.ser.listen( port, () => res() );
        } );
    }

    public stop ()
    {
        this.ser.close( () => { } );
    }

    public blast ( cb: ( user: RSUser ) => void = () => { } )
    {
        for ( let u of this.users )
            cb( u );
    }

    private onJoin ( user: RSUser ) 
    {
        if ( !this.users.find( cu => cu.id === user.id ) )
        {
            this.users.push( user );
            this.blast( u => u.sendJoinedMessage( user.userName, user.id ) );
        }
    }

    private onLeave ( user: RSUser ) 
    {
        this.users = this.users.filter( cu => cu.id !== user.id );
        this.blast( u => u.sendLeftMessage( user.userName, user.id ) );
    }

    private addFile ( filePath: string, fileStr: string )
    {
        if ( !this.fileList.find( f => f.fileName === filePath ) )
        {
            this.fileList.push( new RSFile() );
            this.blast( u => void 0 );
        }
    }

    private remFile ( filePath: string )
    {
        this.fileList.filter( f => f.fileName !== filePath );
        this.blast( u => void 0 );
    }

    private updateFile ( fileID: string, updateDelta: string )
    {

    }

}