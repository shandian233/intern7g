
import GmConfig from "../../../../../config/GmConfig"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"

export default class LockSet extends BaseClass{
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=400;
		this.iH = 40 + 50 + 40;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX + this.iW - 35, this.iY - 25, 60, 60);
		
		this.btn_send=new XButton(GmPlay.xani_button);
		this.btn_send.InitButton("1号按钮90_60");
		this.btn_send.Move(this.iX + this.iW - 40 - 90, this.iY + 40 - 5, 90, 60);
		this.btn_send.sName="设置";
	
		this.in_speak=new XInput(GmPlay.xani_ui);
		this.in_speak.Move(this.iX + 40, this.iY + 40, this.iW - 40 - 40 - 90 - 20, 50);
		this.in_speak.bHideText=true;
		this.in_speak.OpenInput();
	}


	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		
//		DrawMode.frame_type1("8号框20_50", this.in_speak.iX, this.in_speak.iY, this.in_speak.iW, 20);
		DrawMode.frame_type4("8号框20_20", this.in_speak.iX, this.in_speak.iY, this.in_speak.iW, 50, 20, 20);
		
		this.pm3f.DrawTextEx(this.in_speak.iX + 10, this.in_speak.iY + this.in_speak.iH / 2, this.in_speak.sDetail, 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		
		this.btn_send.Draw();
		this.btn_close.Draw();
		this.in_speak.onscr();
	}
	 ProcTouch( msg, x, y)
	{
		if(this.in_speak.ProcTouch(msg, x, y))
		{
		}
		if(this.btn_send.ProcTouch(msg, x, y))
		{
			if(this.btn_send.bCheck())
			{//发送小喇叭内容
				if(this.in_speak.sDetail.length<=0)
				{
					EasyMessage.easymsg.AddMessage("请先输入密码");
				}
				else if(this.in_speak.sDetail.length>=20)
				{
					EasyMessage.easymsg.AddMessage("密码过长");
				}
				else
				{///cx
					GmProtocol.gi().s_SetLock(0, 0, this.in_speak.sDetail);
					XStat.gi().PopStat(1);
				}
			}
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}
LockSet.Open=function()
{
	XStat.gi().PushStat(XStat.GS_LOCKSET);
//		(SmallSpeaker)(XStat.gi().LastStat(0))
}