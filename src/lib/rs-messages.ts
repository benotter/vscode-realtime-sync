export enum RSClientMessageType 
{
    Base,
    Leave_Report,

    Join_Request,
    AddFile_Request,
    RemFile_Request,
    UpdateFile_Request,
}

export namespace RSMessages_C 
{
    export interface Base { type: RSClientMessageType }
}

export enum RSServerMessageType 
{
    Base,

    Join_Response,
    AddFile_Response,
    RemFile_Response,
    UpdateFile_Response,

    Blast_OnJoin,
    Blast_OnLeave,
    Blast_FileAdded,
    Blast_FileRemoved,
    Blast_FileUpdated,
}

export namespace RSMessages_S 
{
    export interface Base { type: RSServerMessageType }
}

