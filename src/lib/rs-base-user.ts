import { RSFileID } from './rs-file';
export type RSUserID = string;
export class RSBaseUser 
{
    public id: RSUserID = "";
    public userName: string = "";

    public joined: boolean = false;

    public ownedFiles: RSFileID[] = [];

    constructor()
    {

    }

}