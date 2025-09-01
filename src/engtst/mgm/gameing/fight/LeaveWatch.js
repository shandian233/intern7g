
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButton from "../../../../engine/control/XButton"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"

export default class LeaveWatch {
	LeaveWatch()
	{
		this.iAutoFightLast=0;

		this.iW=83;
		this.iH=83;
	}
	Draw()
	{
		if(this.iAutoFightLast<=0)return;
		if(this.btn_cancel==null)
		{
			this.btn_cancel=new XButton(GmPlay.xani_ui);
			this.btn_cancel.InitButton("自动倒计时");
		}
		this.iX=GmConfig.SCRW-83;
		this.iY=GmConfig.SCRH-83;
		this.btn_cancel.Move(this.iX,this.iY,this.iW,this.iH);
//		DrawMode.DrawFrame2(this.iX, this.iY, this.iW, this.iH);
//		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, "剩余自动 "+this.iAutoFightLast+" 回合", 0xffffffff, 20, 101, 1, 1, 0, -2, 0);
		this.btn_cancel.Draw();
		NumberEffect.ne.Draw_RoundNumber(this.iX+83/2,this.iY+55,this.iAutoFightLast);
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.iAutoFightLast<=0)return false;
		if(this.btn_cancel!=null && this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				this.iAutoFightLast=0;
			}
			return true;
		}
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}
LeaveWatch.aff=new LeaveWatch();