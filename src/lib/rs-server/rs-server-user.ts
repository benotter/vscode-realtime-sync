import * as net from 'net';
import * as lib from '../lib';

export class RSUserServer extends lib.RSUserBase 
{
    constructor(socket: net.Socket, ...args: any[])
    {
        super(...args);
        this.socket = socket;
    }

    
}