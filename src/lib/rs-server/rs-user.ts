import * as net from 'net';
import { SafeJSON, RSMessageUtils } from '../util'
import { RSServer } from './rs-server';
import
{
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

    private _onAddFile: ( fileName: string, fileStr: string ) => void = () => { };
    private _onRemFile: ( fileName: string ) => void = () => { };

    private _onFileEdit: ( fileID: string, deltaUpdate: string ) => void = () => { };

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

    private send ( mess: RSServerMessages.IRSServerMessage )
    {
        this.socket.write( RSMessageUtils.formatMess( mess ) );
    }

    public onJoin ( cb: () => void ) { this._onJoin = cb; }
    public onLeave ( cb: () => void ) { this._onLeave = cb; }

    public onAddFile ( cb: ( fileName: string, fileStr: string ) => void ) { this._onAddFile = cb; }
    public onRemFile ( cb: ( fileName: string ) => void ) { this._onRemFile = cb; }
    public onFileEdit ( cb: ( fileID: string, deltaUpdate: string ) => void ) { this._onFileEdit = cb; }

    private handleMessage ( mess: RSClientMessages.IRSClientMessage )
    {
        switch ( mess.type )
        {
            case ERSClientMessageType.Join:
                {
                    let { userName = "", uuid = "" } = mess as RSClientMessages.IRSJoinMessage;

                    this.userName = userName;
                    this.id = uuid;

                    this._onJoin();
                    break;
                }

            case ERSClientMessageType.AddFile:
                {
                    let { fileName, fileStr } = mess as RSClientMessages.IRSAddFile;

                    this._onAddFile( fileName, fileStr );
                    break;
                }

            case ERSClientMessageType.RemFile
                {
                    let { fileName } = mess as RSClientMessages.IRSRemFile;

                    this._onRemFile( fileName );
                    break;
                }

            case ERSClientMessageType.
            default:
                break;
        }
    }

    public sendJoinSuccessMessage ()
    {
        this.send(
            RSMessageUtils.getBaseServerMess<RSServerMessages.IRSJoinSuccessMessage>(
                ERSServerMessageType.JoinSuccess,
                {}
            )
        );
    }

    public sendJoinedMessage ( userName: string, uuid: string )
    {
        this.send(
            RSMessageUtils.getBaseServerMess<RSServerMessages.IRSUserJoinedMessage>(
                ERSServerMessageType.UserJoined,
                { userName, uuid }
            )
        );
    }

    public sendLeftMessage ( userName: string, uuid: string )
    {
        this.send(
            RSMessageUtils.getBaseServerMess<RSServerMessages.IRSUserLeftMessage>(
                ERSServerMessageType.UserLeft,
                { userName, uuid }
            )
        )
    }
}