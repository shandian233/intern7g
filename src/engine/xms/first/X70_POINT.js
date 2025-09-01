import XFirstOle from "./XFirstOle"
import X_FIRST from "./X_FIRST";

export default class X70_POINT extends X_FIRST
{
    constructor()
    {
        super();
        this.iType = 70;
        this.iLen = 4;
        this.sName = "";
        this.iDestXid = 0;
    }

    Set (i)
    {
        this.iDestXid = i;
    }

    Get ()
    {
        return this.iDestXid;
    }
    GetFirst()
    {
        return XFirstOle.pxms[this.iDestXid];
    }
    copyfrom (p)
    {
        this.iX = p.iX;
        this.iY = p.iY;
        this.sName = p.sName;
        this.iDestXid = p.iDestXid;
    }
    GetCopy()
    {
        var pret=new X70_POINT();
        pret.copyfrom(this);
        return pret;
    }
}