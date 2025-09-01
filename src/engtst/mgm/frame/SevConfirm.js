
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import PackageTools from "../../../engine/PackageTools"
import XButton from "../../../engine/control/XButton"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../engtst/mgm/GmProtocol"
import XStat from "../../../engtst/mgm/XStat"
import FormatString from "../../../engtst/mgm/frame/format/FormatString"

export default class SevConfirm extends BaseClass{
	
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=350;
		this.iH=200;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_ok.InitButton("内框按钮");
		this.btn_ok.Move(this.iX+10,this.iY+this.iH-60, 70, 40);
//		this.btn_ok.bSingleButton=true;
//		this.btn_ok.sName="确定";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_cancel.InitButton("内框按钮");
		this.btn_cancel.Move(this.iX+this.iW-90,this.iY+this.iH-60, 70, 40);
//		this.btn_cancel.bSingleButton=true;
//		this.btn_cancel.sName="取消";
	}
	Draw()
	{
		FormatString.gi().FormatEx(this.sMsg, this.iW-40, 26, 0, 0, 30);

		this.iH=20+FormatString.gi().iH+20+55+20;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok.Move(this.iX+20,this.iY+this.iH-70, 98, 55);
		this.btn_cancel.Move(this.iX+this.iW-98-20,this.iY+this.iH-70, 98, 55);
		
	//	DrawMode.Frame1_BR(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		
		FormatString.gi().Draw(this.iX+20, this.iY+20);
		
		this.btn_ok.Draw();
		this.btn_cancel.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				GmProtocol.gi().s_SevConfirm(this.sCmd);
				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}
SevConfirm.Open=function( pls)
{
	if(XStat.gi().LastStatType(0)!=XStat.GS_CONFIRM2)
	{
		var psc=XStat.gi().PushStat(XStat.GS_CONFIRM2);
		psc.sMsg=pls.GetNextString();
		psc.btn_ok.sName=pls.GetNextString();
		psc.btn_cancel.sName=pls.GetNextString();
		psc.sCmd=pls.GetNextString();
	}
}