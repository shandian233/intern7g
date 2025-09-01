
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"

export default class AutoFightFrame {
	

	
	constructor()
	{
		this.iAutoFightLast=0;

		this.iW=83;
        this.iH=83;
        
         this.wsize=22;
	}

	 Draw()
	{
		if(this.iAutoFightLast<=0)return;
		if(this.btn_cancel==null)
		{
			this.btn_cancel=new XButtonEx2(GmPlay.xani_nui4);
			this.btn_cancel.InitButton("战斗_自动");
		}
		this.iX=GmConfig.SCRW-80;
		this.iY=GmConfig.SCRH-80-10;
		this.btn_cancel.Move(this.iX,this.iY,this.iW,this.iH);
//		DrawMode.DrawFrame2(this.iX, this.iY, this.iW, this.iH);
//		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, "剩余自动 "+this.iAutoFightLast+" 回合", 0xffffffff, 20, 101, 1, 1, 0, -2, 0);
		this.btn_cancel.Draw();
		if(GmMe.me.iFlag[20]>0)
		{
			this.iAutoFightLast=AutoFightFrame.AUTOLAST;
			M3DFast.gi().DrawText_2(this.btn_cancel.iX+40, this.btn_cancel.iY+80, "无限", 0xffffffff, this.wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);

//			M3DFast.gi().DrawText_2(this.iX+41, this.iY+41, "无限", 0xffff0000, 30, 101, 1, 1, 0, -2, -2, 3, 0xffffff00);
		}
		else
		{
			M3DFast.gi().DrawText_2(this.btn_cancel.iX+40, this.btn_cancel.iY+80, ""+this.iAutoFightLast, 0xffffffff, this.wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);

//			NumberEffect.ne.Draw_RoundNumber(this.iX+83/2,this.iY+55,this.iAutoFightLast);
		}
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

AutoFightFrame.AUTOLAST=100;
AutoFightFrame.aff=new AutoFightFrame();