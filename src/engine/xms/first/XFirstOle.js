import X_FIRST from "./X_FIRST"
import X10_NUMBER from "./X10_NUMBER"
import X20_FLOAT from "./X20_FLOAT"
import X30_WORD from "./X30_WORD"
import X40_CLASS from "./X40_CLASS"
import X50_CODE from "./X50_CODE"
import X60_DATA from "./X60_DATA"
import X70_POINT from "./X70_POINT"
import XDefine from "../../../config/XDefine"

var MAXMAIN=256;
var XID_OFFSET=0;
export default class XFirstOle
{
    constructor()
    {
        var i;
        this.pmains=new Array(MAXMAIN);
        for(i=0;i<MAXMAIN;i++)
        {
            this.pmains[i]=null;
        }
    }
    LoadFile(pls)
    {
        var i, x, y;
        var buf;
        buf=pls.GetNextString();
        if (buf=="xf")
        {
            pls.GetNextInt();//版本号
            //XID_GetOffset();

            for (i = 0; i < MAXMAIN; i++)
            {
                if (this.pmains[i] == null)
                {
                    x = pls.GetNextInt();
                    y = pls.GetNextInt();
                    this.pmains[i] = this.LoadFirst(pls);
                    this.pmains[i].SetPos(x, y);

                    //XID_FreshList(pmains[i]);
                    break;
                }
            }
        }
        else if (buf== "xal")
        {
            pls.GetNextInt();//版本号
            //XID_GetOffset();
            XFirstOle.MAXXID=0;
            while (true)
            {
                if (pls.GetNextInt()<0)break;
                for (i = 0; i<MAXMAIN; i++)
                {
                    if (this.pmains[i] == null)
                    {
                        x = pls.GetNextInt();
                        y = pls.GetNextInt();
                        this.pmains[i] = this.LoadFirst(pls);

                        XDefine.sop("main "+i+":"+this.pmains[i].sName);
                        this.pmains[i].SetPos(x, y);

                        //XID_FreshList(pmains[i]);
                        break;
                    }
                }
            }
            XDefine.sop("MAXXID:"+XFirstOle.MAXXID);
            //XID_OrderList();
        }
        else return false;
        return true;
    }
    LoadFirst(pls)
    {
        var pret = null;
        var tmpfirst=null;

        var type = pls.GetNextInt();
        switch (type)
        {
            case 10:
                pret = new X10_NUMBER();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                pret.iLen = pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pret.iNumber = pls.GetNextInt();

                if (pret.sName== "x_link_xid")
                {
                    pret.iNumber += XID_OFFSET;
                }
                break;
            case 20:
                pret = new X20_FLOAT();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                pret.iLen = pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pret.fFloat = pls.GetNextFloat();
                break;
            case 30:
                pret = new X30_WORD();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pls.GetNextData();
                pret.Set(pls.obs);
                break;
            case 40:
                pret = new X40_CLASS();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                pret.iLen = pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pret.iArray = pls.GetNextInt();
                while (true)
                {
                    tmpfirst = this.LoadFirst(pls);
                    if (tmpfirst == null)break;
                    pret.LinkFirst(tmpfirst);
                }
                break;
            case 50:
                pret = new X50_CODE();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                //pret.iLen=
                pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pls.GetNextData();
                pret.Set(pls.obs);
                break;
            case 60:
                pret = new X60_DATA();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                //pret.iLen=
                pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pls.GetNextData();
                pret.Set(pls.obs);
                break;
            case 70:
                pret = new X70_POINT();
                pret.iType = type;
                pret.sName=pls.GetNextString();
                pls.GetNextInt();
                pret.iXID = pls.GetNextInt() + XID_OFFSET;
                pret.iDestXid=pls.GetNextInt();
                break;
            default:
                pret=null;
                break;
        }
        if(pret!=null)
        {
            // XDefine.sop("name="+pret.sName+","+pret.iType);
            XFirstOle.pxms[pret.iXID]=pret;
            if(XFirstOle.MAXXID<pret.iXID)XFirstOle.MAXXID=pret.iXID;
        }
        return pret;
    }

    LockMain(name)
    {
        for (var i = 0; i < MAXMAIN; i++)
        {
            if(this.pmains[i]==null)continue;
            if(this.pmains[i].sName==name)return this.pmains[i];
        }
        return null;
    }


}
XFirstOle.pxms=new Array();
XFirstOle.MAXXID=0;