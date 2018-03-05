import * as uuid from 'uuid';
import { RSFileID } from './rs-file-base';

export type RSUserID = string;

export class RSUserBase
{
    public host: boolean = false;
    public ownedFiles: RSFileID[] = [];
    public openFiles: RSFileID[] = [];

    constructor (
        public userName: string = "",
        public id: RSUserID = uuid.v4(),
    )
    {}
}