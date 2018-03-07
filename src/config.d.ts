declare interface VSCodeRSConfig
{
    server: {
        port: number;
        host: string;
    };
    client: {
        defaultUsername: string;
        defaultID: string;
        port: string;
    }
}