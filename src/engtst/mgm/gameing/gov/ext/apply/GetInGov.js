
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"

export default class GetInGov extends BaseClass{

	
	 constructor( ani)
	{
		super();
		this.iW=500;
		this.iH=240;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_govid=new XInputNumber(GmPlay.xani_nui3);
		this.in_govid.iNumber=0;
		this.in_govid.MinMax(0, 30000);
		
		this.btn_go=new XButtonEx2(GmPlay.xani_button);
		this.btn_go.InitButton("普通按钮195_55");
		this.btn_go.sName="前往";
	}

	Draw()
	{
		var offx,offy;
		var w,h;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		offx=this.iX+25;
		offy=this.iY+25;
		w=this.iW-50;
		h=this.iH-50;
//		DrawMode.new_framein(offx, offy, w, h);
		DrawMode.frame_type4("中等框a52_50",offx, offy, w, h,52,50);
		
		M3DFast.gi().DrawTextEx(offx+10,offy+35, "请输入想要前往的帮派号码", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		
		this.in_govid.Move(offx+25*11+10, offy+35-(47-25)/2, 140);
		this.in_govid.Draw();
		
		this.btn_go.Move(this.iX+this.iW-50-195, this.iY+this.iH-50-55, 195, 55);
		this.btn_go.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.in_govid.ProcTouch(msg, x, y))return true;
		if(this.btn_go.ProcTouch(msg, x, y))
		{
			if(this.btn_go.bCheck())
			{
				XStat.gi().PopStat(1);
				GmProtocol.gi().s_GetIntoGov(this.in_govid.iNumber);
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}
GetInGov.Open=function()
{
    if (XStat.gi().iXStat != XStat.GS_GETINGOV)XStat.gi().PushStat(XStat.GS_GETINGOV);
}