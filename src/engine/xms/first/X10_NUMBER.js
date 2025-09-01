import X_FIRST from "./X_FIRST";

export default class X10_NUMBER extends X_FIRST
{
    constructor()
    {
        super();

        this.iNumber= 0;
        this.iType = 10;
        this.iLen = 4;
        this.iNumber = 0;
    }
    Set(ii)
    {
        this.iNumber = ii;
    }

    Get ()
    {
        return this.iNumber;
    }
    copyfrom (p)
    {
        this.iX = p.iX;
        this.iY = p.iY;
        this.sName = p.sName;
        this.iNumber = p.iNumber;
    }
    GetCopy()
    {
        var pret=new X10_NUMBER();
        pret.copyfrom(this);
        return pret;
    }
}
