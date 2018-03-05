import
{
    ERSServerMessageType, RSServerMessages,
    ERSClientMessageType, RSClientMessages,
} from './rs-i-types';

export namespace SafeJSON 
{
    export function parse<T = any>( str: string, def: T ): T
    {
        try { return JSON.parse( str ) as T; }
        catch ( e ) { return def; }
    }

    export function stringify ( obj: any, prettyPrint: boolean = false ): string
    {
        return JSON.stringify( obj, void 0, prettyPrint ? ' ' : void 0 );
    }
}

export namespace RSMessageUtils 
{
    export function formatMess (
        mess: RSClientMessages.IRSClientMessage | RSServerMessages.IRSServerMessage
    ): string 
    {
        return SafeJSON.stringify( mess );
    }

    export function getBaseClientMess<T = RSClientMessages.IRSClientMessage>(
        type: ERSClientMessageType,
        data: T,
    ): T
    {
        return Object.assign( { type, }, data );
    }

    export function getBaseServerMess<T = RSServerMessages.IRSServerMessage>(
        type: ERSServerMessageType,
        data: T,
    ): T
    {
        return Object.assign( { type, }, data );
    }
}