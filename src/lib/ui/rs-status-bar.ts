import * as code from 'vscode';

export class RSStatusBar 
{
    public baseText = "RS Status: ";

    public idleText = "Idle";
    public serverText = "Server Mode";
    public clientText = "Client Mode";

    public errorText = "Error";

    constructor (
        public statBar: code.StatusBarItem,
    )
    {
        this.setIdle();
        statBar.show();
    }

    private setText ( str: string )
    {
        this.statBar.text = str;
    }

    public setIdle ()
    {
        this.setText( this.baseText + this.idleText );
    }

    public setServer ()
    {
        this.setText( this.baseText + this.serverText );
    }

    public setClient ()
    {
        this.setText( this.baseText + this.clientText );
    }

    public setError ()
    {
        this.setText( this.baseText + this.errorText );
    }
}