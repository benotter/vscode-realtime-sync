export const PREFIX = "reatime-sync";

export namespace SETTINGS 
{
    const C_PREFIX = `${ PREFIX }.client`;
    export const CLIENT_DEF_USERNAME = `${ C_PREFIX }.defaultUserName`;
    export const CLIENT_DEF_PORT = `${ C_PREFIX }.port`;
    export const CLIENT_DEF_ID = `${ C_PREFIX }.defaultID`;

    const S_PREFIX = `${ PREFIX }.server`;
    export const SERVER_DEF_PORT = `${ S_PREFIX }.port`;
    export const SERVER_DEF_HOST = `${ S_PREFIX }.host`;
}

export namespace LOG 
{
    export const INFO_SERVER_STARTED =
        ( port: number, host: string ) =>
            `Server Started on ${ host }:${ port }`;
    export const INFO_SERVER_STOPPED = "";
    export const WARN_SERVER_NOT_STARTED = "";

    export const ERROR_SERVER_ALREADY_STARTED = "";
}