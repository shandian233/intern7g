import X_FIRST from "./X_FIRST";

export default class X60_DATA extends X_FIRST
{
    constructor()
    {
        super();
        this.iType = 30;
        this.iLen = 8;
        this.sName = "";
        this.pdata = "";
    }

    SetPos(x,y)
    {
        this.iX = x;
        this.iY = y;
    }
    Set (s)
    {
        this.pdata = s;
    }

    Get ()
    {
        return this.pdata;
    }
    copyfrom (p)
    {
        this.iX = p.iX;
        this.iY = p.iY;
        this.sName = p.sName;
        this.pdata = p.pdata;
    }
    GetCopy()
    {
        var pret=new X60_DATA();
        pret.copyfrom(this);
        return pret;
    }
}