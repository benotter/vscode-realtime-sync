// >>> Client Messages <<< \\
export enum ERSClientMessageType 
{
    BaseMessage,

    Join,
    Leave,

    UpdateUser,

    AddFile,
    RemFile,
}
export namespace RSClientMessages
{
    export interface IRSClientMessage 
    {
        type?: ERSClientMessageType;
        uuid?: string;
    }

    export interface IRS extends IRSClientMessage {};

    export interface IRSJoinMessage extends IRSClientMessage
    {
        userName: string;
    }
    export interface IRSLeaveMessage extends IRSClientMessage {};

    export interface IRSUpdateUser extends IRSClientMessage 
    {
        userName: string;
    }

    export interface IRSAddFile extends IRSClientMessage 
    {
        fileName: string;
        fileStr: string;
    };
    export interface IRSRemFile extends IRSClientMessage 
    {
        fileName: string;
    };
}

// >>> Server Messages <<< \\
export enum ERSServerMessageType 
{
    BaseMessage,

    JoinSuccess,

    UserJoined,
    UserLeft,

    UserAddFile,
    UserRemFile,

    UserEditFile,
}
export namespace RSServerMessages 
{
    export interface IRSServerMessage 
    {
        type?: ERSServerMessageType;
    }

    export interface IRSJoinSuccessMessage extends IRSServerMessage {}

    export interface IRSUserJoinedMessage extends IRSServerMessage 
    {
        userName: string;
        uuid: string;
    };
    export interface IRSUserLeftMessage extends IRSServerMessage 
    {
        userName: string;
        uuid: string;
    };

    export interface IRSAddFileMessage extends IRSServerMessage 
    {
        fileName: string;
        fileStr: string;
    };
    export interface IRSRemFileMessage extends IRSServerMessage 
    {
        fileName: string;
    };

    export interface IRSEditFileMessage extends IRSServerMessage {};
}