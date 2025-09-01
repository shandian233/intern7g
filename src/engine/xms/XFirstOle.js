

import GameData from "../../config/GameData"
import PackageTools from "../../engine/PackageTools"
import X10_NUMBER from "../../engine/xms/first/X10_NUMBER"
import X20_FLOAT from "../../engine/xms/first/X20_FLOAT"
import X30_WORD from "../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../engine/xms/first/X40_CLASS"
import X50_CODE from "../../engine/xms/first/X50_CODE"
import X60_DATA from "../../engine/xms/first/X60_DATA"
import X_FIRST from "../../engine/xms/first/X_FIRST"
import GmPlay from "../../engtst/mgm/GmPlay"
import XDefine from "../../config/XDefine";

class _ONEFIRST
{
//	String sName;
//	X_FIRST pf;
	
//    _ONEFIRST pnext;
    constructor()
    {

    }
}
export default class XFirstOle
{
    constructor()
    {
        this.MAXMAIN=256;
        GmPlay.sop("new first 1");
		this.pmains=new Array(this.MAXMAIN);
		GmPlay.sop("new first 2");
		this.Clear();
		GmPlay.sop("new first 3");
    }
    Clear()
	{
		for(var i=0;i<this.MAXMAIN;i++)this.pmains[i]=null;
    }
    LockMain( s)
	{
		for(var i=0;i<this.MAXMAIN;i++)
		{
//			GmPlay.sop("name="+this.pmains[i].sName+"==="+s);
			if(this.pmains[i]==null)continue;
			if(this.pmains[i].sName==s)return this.pmains[i];
		}
		return null;
    }
    LoadFile( fn, blocal)
	{
		GmPlay.sop("load "+fn+" 1");
		if(blocal)
		{
			Laya.loader.load(XDefine.BASE_URL+ fn,
            	Laya.Handler.create(this, this._LoadFile,[this,fn]),
            	null,Laya.Loader.BUFFER);
		}
	}
	_LoadFile(p,path,data)
	{
		var pls=GmPlay.gi().pls;
		pls.GetData3(data);
		GmPlay.sop("load "+path+" 2");
		var ftype=pls.GetNextString();
		var i,x,y;
		if(ftype=="xf")
		{
			pls.GetNextInt();//版本号
			for(i=0;i<this.MAXMAIN;i++)
			{
				if(this.pmains[i]==null)
				{
					x=pls.GetNextInt();
					y=pls.GetNextInt();
					this.pmains[i]=this.LoadFirst(pls);
					this.pmains[i].SetPos(x,y);
					break;
				}
			}
		}
		if(ftype=="xal")
		{
			GmPlay.sop("load "+path+" 3");
			pls.GetNextInt();//版本号
			while(true)
			{
				if(pls.GetNextInt()<0)break;
				for(i=0;i<this.MAXMAIN;i++)
				{
					if(this.pmains[i]==null)
					{
						x=pls.GetNextInt();
						y=pls.GetNextInt();
						this.pmains[i]=this.LoadFirst(pls);
						this.pmains[i].SetPos(x,y);
						break;
					}
				}
			}
			GmPlay.sop("load "+path+" 4");
		}
		else
		{
//			AfxMessageBox("未知文件格式");
		}
    }
    LoadFirst( pls)
	{
		var pnum;
		var pfloat;
		var pword;
		var pclass;
		var pcode;
		var pdata;
		var pret=null;
		var tmpfirst;

		var type=pls.GetNextInt();
		
//		GmPlay.sop("type="+type+",,,,off="+pls.iOffset);//10,24392,10.22657
		switch(type)
		{
		case 10:
			pnum=new X10_NUMBER();
			pret=pnum;
			pret.iType=type;
			pret.sName=pls.GetNextString();
			pret.iLen=pls.GetNextInt();
			pnum.iNumber=pls.GetNextInt();
			break;
		case 20:
			pfloat=new X20_FLOAT();
			pret=pfloat;
			pret.iType=type;
			pret.sName=pls.GetNextString();
			pret.iLen=pls.GetNextInt();
			pfloat.fFloat=pls.GetNextFloat();
			break;
		case 30:
			pword=new X30_WORD();
			pret=pword;
			pret.iType=type;
			pret.sName=pls.GetNextString();
			pls.GetNextInt();
			pls.GetNextData();
			pword.Set(pls.DataToString());
			break;
		case 40:
			pclass=new X40_CLASS();
			pret=pclass;
			pret.iType=type;
			pret.sName=pls.GetNextString();
			pret.iLen=pls.GetNextInt();
			pclass.iArray=pls.GetNextInt();
			while(true)
			{
//				GmPlay.sop("11111");
				tmpfirst=this.LoadFirst(pls);
//				GmPlay.sop("22222");
				if(tmpfirst==null)break;
				pclass.LinkFirst(tmpfirst);
//				GmPlay.sop("33333");
			}
			break;
		case 50:
			pcode=new X50_CODE();
			pret=pcode;
			pret.iType=type;
			pret.sName=pls.GetNextString();
			//pret.iLen=
			pls.GetNextInt();
			pls.GetNextData();
			pcode.Set(pls.obd,pls.obi);
			break;
		case 60:
			pdata=new X60_DATA();
			pret=pdata;
			pret.iType=type;
			pret.sName=pls.GetNextString();
			//pret.iLen=
			pls.GetNextInt();
			pls.GetNextData();
			pdata.Set(pls.obd, pls.obi);
			break;
		}
//		if(pret!=null)GmPlay.sop("name="+pret.sName);
		return pret;
	}
}