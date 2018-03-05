import { RSUserID } from './rs-base-user';

export type RSFileID = string;
export class RSFile 
{
    public id: RSFileID = "";
    
    public fileName: string = "";
    public fileBuffer: Buffer | null = null;

    public owner: RSUserID = "" ;
}