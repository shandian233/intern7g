
import PublicInterface from "../../../zero/Interface/PublicInterface"
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import XButton from "../../../engine/control/XButton"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import XStat from "../../../engtst/mgm/XStat"
import FormatString from "../../../engtst/mgm/frame/format/FormatString"

export default class ExitConfirm extends BaseClass{
	 constructor( ani)
	{
		super();
		this.pani=ani;
		
		this.iW=350;
		this.iH=200;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=null;
		this.btn_cancel=null;
	}
	Draw()
	{
		if(!GmPlay.bInited)return;
		if(this.btn_ok==null)
		{
			this.btn_ok=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_ok.InitButton("内框按钮");
			this.btn_ok.Move(this.iX+10,this.iY+this.iH-60, 70, 40);
//			this.btn_ok.bSingleButton=true;
			this.btn_ok.sName="确定";
			
			this.btn_cancel=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_cancel.InitButton("内框按钮");
			this.btn_cancel.Move(this.iX+this.iW-90,this.iY+this.iH-60, 70, 40);
//			this.btn_cancel.bSingleButton=true;
			this.btn_cancel.sName="取消";
		}
		FormatString.gi().FormatEx("是否确定退出游戏", this.iW-40, 26, 0, 0, 30);
//		pm3f.DrawText(0, pm3f.imf.SCRH-30, "Confirm", 0xffffffff);
		
//		pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xff000000);
//		pm3f.DrawRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xffffffff);
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
		if(!GmPlay.bInited)return false;
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				XStat.gi().PopStat(1);
				PublicInterface.gi().Exit();
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
