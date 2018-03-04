import { ERSClientMessageType, RSClieantMessages } from './rs-i-types';

export namespace SafeJSON 
{
    export function parse<T = any>( str: string, def = null ): T | null
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
    export function getBaseMess<T = RSClieantMessages.IRSClientMessage>(
        messType: ERSClientMessageType,
        data: T
    ): T
    {
        return Object.assign( { type: messType, }, data as T) as T;
    }

    export function formatMess ( mess: RSClieantMessages.IRSClientMessage ): string 
    {
        return SafeJSON.stringify( mess );
    }
}