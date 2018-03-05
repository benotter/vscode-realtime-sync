// >>> Client Messages <<< \\
export enum ERSClientMessageType 
{
    BaseMessage,

    JoinMessage,
    LeaveMessage,
}
export namespace RSClientMessages
{
    export interface IRSClientMessage 
    {
        type?: ERSClientMessageType;
    }

    export interface IRS extends IRSClientMessage {};

    export interface IRSJoinMessage extends IRSClientMessage
    {
        userName: string;
        uuid: string;
    }
    export interface IRSLeaveMessage extends IRSClientMessage 
    {
        uuid: string;
    };
}

// >>> Server Messages <<< \\
export enum ERSServerMessageType 
{
    BaseMessage,

    UserJoinedMessage,
    UserLeftMessage,

    AddFileMessage,
    RemFileMessage,

    EditFileMessage,
}
export namespace RSServerMessages 
{
    export interface IRSServerMessage 
    {
        type?: ERSServerMessageType;
    }
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

    export interface IRSAddFileMessage extends IRSServerMessage {};
    export interface IRSRemFileMessage extends IRSServerMessage {};

    export interface IRSEditFileMessage extends IRSServerMessage {};
}