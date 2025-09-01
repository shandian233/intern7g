import X_FIRST from "./X_FIRST";
import GU from "../../gbk";

export default class X50_CODE extends X_FIRST
{
    constructor()
    {
        super();
        this.iType = 50;
        this.iLen = 7;
        this.pcode = "";
    }

    Set (s,len)
    {
//        this.pcode=new byte[len];
//		System.arraycopy(data, 0, pcode, 0, len);
//		iLen=len;
var data=new Uint8Array(len);
for(var i=0;i<len;i++)data[i]=s[i];
this.pcode=GU.gb2312a_to_utf8(data);

this.iLen=this.pcode.length;
//        this.pcode = s;
    }

    Get ()
    {
        return this.pcode;
    }
    copyfrom (p)
    {
        this.iX = p.iX;
        this.iY = p.iY;
        this.sName = p.sName;
        this.pcode = p.pcode;
        this.iLen=p.iLen;
    }
    GetCopy()
    {
        var pret=new X50_CODE();
        pret.copyfrom(this);
        return pret;
    }
}