import X_FIRST from "./X_FIRST";

export default class X20_FLOAT extends X_FIRST
{
    constructor()
    {
        super();
        this.fFloat=0;

        this.iType = 20;
        this.iLen = 4;
        this.sName = "";
        this.fFloat = 0;
    }
    Set (f)
    {
        this.fFloat = f;
    }

    Get ()
    {
        return this.fFloat;
    }
    copyfrom (p)
    {
        this.iX = p.iX;
        this.iY = p.iY;
        this.sName = p.sName;
        this.fFloat = p.fFloat;
    }
    GetCopy()
    {
        var pret=new X20_FLOAT();
        pret.copyfrom(this);
        return pret;
    }
}

