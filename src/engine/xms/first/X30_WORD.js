import X_FIRST from "./X_FIRST";

export default class X30_WORD extends X_FIRST
{
    constructor()
    {
        super();
        this.pword="";
        this.iType = 30;
        this.iLen = 8;
        this.sName = "";
        this.pword = "";
    }
    Set (ss)
    {
        this.pword = ss;
    }

    Get ()
    {
        return this.pword;
    }
    copyfrom (p)
    {
        this.iX = p.iX;
        this.iY = p.iY;
        this.sName = p.sName;
        this.pword = p.pword;
    }
    GetCopy()
    {
        var pret=new X30_WORD();
        pret.copyfrom(this);
        return pret;
    }
}
