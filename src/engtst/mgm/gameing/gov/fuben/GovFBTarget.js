
import GmConfig from "../../../../../config/GmConfig"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"

class _GOVFBTARGET
{/*
	public int iStat;
	public int iType;
	public String sTarget;
	public String sProc;*/
}
export default class GovFBTarget extends BaseClass{

	constructor( a)
	{
		super();
		this.iW=700;
		this.iH=400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
	}
	
	Draw()
	{
		var i;
		var ww=(this.iW-30-30-20)/2;
		var hh=this.iH-30-30-30-20;
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		M3DFast.gi().DrawText_2(this.iX+30+ww/2, this.iY+30+15, "进度描述", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(this.iX+30+ww+20+ww/2, this.iY+30+15, "进度目标", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		DrawMode.frame_type4("单色内框b20_20", this.iX+30, this.iY+30+30+20, ww, hh, 20, 20);
		DrawMode.frame_type4("单色内框b20_20", this.iX+30+ww+20, this.iY+30+30+20, ww, hh, 20, 20);
		
		FormatString.gi().FormatEx(GovFBTarget.sDetail, ww-30, 20, 0, 0, 25);
		FormatString.gi().Draw(this.iX+30+15, this.iY+30+30+20+15);
		
		var offx=this.iX+30+ww+20;
		var offy=this.iY+30+30+20;
		for(i=0;i<GovFBTarget.iTargetCount;i++)
		{
			M3DFast.gi().DrawTextEx(offx+15, offy+15, GovFBTarget.mTargets[i].sTarget, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(offx+ww-15, offy+15, GovFBTarget.mTargets[i].sProc, 0xffffffff, 20, 101, 1, 1, 0, -3, 0);
			offy+=25;
		}
	}
	ProcTouch( msg, x, y)
	{
		if(msg==3)XStat.gi().PopStat(1);
		return false;
	}
}


GovFBTarget.sDetail;
GovFBTarget.iTargetCount;
GovFBTarget.mTargets;
GovFBTarget.iPlanId;

GovFBTarget.Open=function()
	{
		if(XStat.gi().iXStat==XStat.GS_GOVFBTARGET)return;
		XStat.gi().PushStat(XStat.GS_GOVFBTARGET);
	}
	GovFBTarget.GetData=function( pls)
	{
		var i;
		if(GovFBTarget.mTargets==null)
		{
			GovFBTarget.mTargets=new Array(10);//
			for(i=0;i<10;i++)
			{
				GovFBTarget.mTargets[i]=new _GOVFBTARGET();
			}
		}
		GovFBTarget.sDetail=pls.GetNextString();
		GovFBTarget.iTargetCount=pls.GetNextByte();
		for(i=0;i<GovFBTarget.iTargetCount;i++)
		{
			GovFBTarget.mTargets[i].iStat=pls.GetNextByte();
			GovFBTarget.mTargets[i].iType=pls.GetNextByte();
			GovFBTarget.mTargets[i].sTarget=pls.GetNextString();
			GovFBTarget.mTargets[i].sProc=pls.GetNextString();
		}
		GovFBTarget.iPlanId=pls.GetNextInt();
		GmPlay.sop("GovFBTarget.iPlanId="+GovFBTarget.iPlanId+"GovFBTarget.iTargetCount"+GovFBTarget.iTargetCount);
	}