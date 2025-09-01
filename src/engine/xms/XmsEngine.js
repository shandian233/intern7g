import GameVersion from "../../zero/Interface/GameVersion"
import PackageTools from "../../engine/PackageTools"
import XAnimaActionOle from "../../engine/xms/anima/XAnimaActionOle"
import XAnimaOle from "../../engine/xms/anima/XAnimaOle"
import X40_CLASS from "../../engine/xms/first/X40_CLASS"
import X_FIRST from "../../engine/xms/first/X_FIRST"
import GmPlay from "../../engtst/mgm/GmPlay"
import XStat from "../../engtst/mgm/XStat"
import xms_AddPoint from "../../engtst/mgm/gameing/me/xms_AddPoint"
import xms_PointPlan from "../../engtst/mgm/gameing/me/xms_PointPlan"

import XFirstOle from "./XFirstOle"
import RunFirst from "./RunFirst"

export default class XmsEngine
{
    constructor()
    {
        this.pfole=new XFirstOle();
		GmPlay.sop("Ｘｍｓ　ＩｎｉｔＦｉｎｉｓｈ1");
//		if(GameVersion.QUDAO==0)this.pfole.LoadFile("localres/7gol.xal", false);
//		else 
			this.pfole.LoadFile("res/datapackage/data/7gol.xal", true);
		GmPlay.sop("Ｘｍｓ　ＩｎｉｔＦｉｎｉｓｈ2");
		XmsEngine.panimaole=new XAnimaOle();
		GmPlay.sop("Ｘｍｓ　ＩｎｉｔＦｉｎｉｓｈ3");
		XmsEngine.paaole=new XAnimaActionOle();
		XmsEngine.pxe=this;
		GmPlay.sop("Ｘｍｓ　ＩｎｉｔＦｉｎｉｓｈ4");
		this.iStatPoint=0;
    }
    FindMain( s)
	{
		return this.pfole.LockMain(s);
	}
	
	
	 FindLink( s)
	{
		for(var i=0;i<XmsEngine._STATLINK.length;i++)
		{
			if(XmsEngine._STATLINK[i][0]==s)
			{
				return i;
			}
		}
		return -1;
	}

//	public void this.RunXms(X_FIRST pf)
//	{
//		Run(XS_TESTRUN, pf,new RunFirst());
//	}
/*	 RunXms( index)
	{
		var p=this.FindLink(index);
		if(p==-1)return;
		this.RunXms(p);
	}*/
	

	
	 IsStat( index)
	{
		var p=this.FindLink(index);
//		GmPlay.sop("p="+p+"--------------"+XStat.x_stat.iXStat);
		if(p==-1)return false;
		if(XStat.x_stat.iXStat==XmsEngine.XS_BASESTAT+p)return true;
		return false;
	}
	 RunXms( stat)
	{
        if(typeof(stat)=="string")
        {
            var p=this.FindLink(stat);
            if(p==-1)return;
            this.RunXms(p);
            return;
        }
		var pc;
		var mainname=XmsEngine._STATLINK[stat][1];
		var runname=XmsEngine._STATLINK[stat][2];
		var prf=null;
		switch(stat)
		{
		case 0:prf=new xms_AddPoint();break;
		case 1:prf=new xms_PointPlan();break;
		}
		pc=this.FindMain(mainname);
		if(pc!=null)
		{
			pc=pc.FindFirst(runname,5);
			if(pc!=null)this.Run(XmsEngine.XS_BASESTAT+stat, pc,prf);
		}
	}
	
//	public final static int XS_BASESTAT=200000;
//	public boolean this.RunXms(String mainname,String runname,RunFirst prf)
//	{
//		X40_CLASS pc=(X40_CLASS) this.FindMain(mainname);
//		if(pc!=null)
//		{
//			pc=(X40_CLASS) pc.FindFirst(runname,5);
//			if(pc!=null)
//			{
//				Run(XS_BASESTAT+this.iStatPoint, pc,prf);
//				this.iStatPoint++;
//				return true;
//			}
//		}
//		return false;
//	}
	 Run( stat, pf, prf)
	{
		XStat.x_stat.PushXmsStat(stat,prf);
		prf.prunclass=pf;
		prf.XMS_MYSTAT=stat;
		
		prf._Init();
	}
	
	 RunByPls( pls)
	{
		var pc = this.FindMain("七国");
		if (pc == null)return;

		var buf=pls.GetNextString();
//		GmPlay.sop(buf);

		pc =pc.FindFirstByPath(buf);
		if (pc == null)return;
//		GmPlay.sop(pc.sName);
		var prf = new RunFirst();
		prf.prunclass = pc;
		prf._Init();

		XStat.x_stat.PushXmsStat(XmsEngine.XS_BASESTAT+2000, prf);
		prf.XMS_MYSTAT = XmsEngine.XS_BASESTAT+2000;
	}
}
XmsEngine.XS_BASESTAT=100000;
XmsEngine.panimaole;
XmsEngine.paaole;

XmsEngine.pxe;

XmsEngine._STATLINK=[
    ["人物加点","七国","人物加点界面"],//0------xms_AddPoint
    ["人物加点方案","七国","人物加点方案"],//1------xms_PointPlan
];