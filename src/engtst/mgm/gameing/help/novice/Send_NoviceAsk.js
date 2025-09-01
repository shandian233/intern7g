
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
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"

export default class Send_NoviceAsk extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;

		this.iW=600;
		this.iH=100;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

		this.btn_close=new XButton(GmPlay.xani_ui);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX+this.iW-60-20, this.iY+20, 60, 60);

		this.btn_send=new XButton(GmPlay.xani_ui);
		this.btn_send.InitButton("统一大按钮2");
		this.btn_send.Move(this.iX+this.iW-80-100, this.iY+25, 80, 50);
		this.btn_send.sName="发送";

		this.in_speak=new XInput(GmPlay.xani_ui);
		this.in_speak.Move(this.iX+20, this.iY+20, this.iW-220, this.iH-40);
		this.in_speak.bHideText=true;
		this.in_speak.OpenInput();
	}


	Draw()
	{
		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
		
		DrawMode.Frame1_BR(this.iX+20, this.iY+20, this.iW-220, this.iH-40);
		
		FormatString.gi().Format(this.in_speak.sDetail, this.in_speak.iW-10, 20);//"#c000000"+
//		FormatString.gi().iH
		FormatString.gi().Draw(this.in_speak.iX+10, this.in_speak.iY+10);
		
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
					EasyMessage.easymsg.AddMessage("请先输入内容");
				}
				else if(this.in_speak.sDetail.length>=40)
				{
					EasyMessage.easymsg.AddMessage("内容过长");
				}
				else
				{
					GmProtocol.gi().s_NoviceHelp(0,0,0,this.in_speak.sDetail);
//					GmProtocol.gi().s_UseGoods(goods.iGid, 1,this.in_speak.sDetail);
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
Send_NoviceAsk.Open=function()
{
	XStat.gi().PushStat(XStat.GS_SENDNOVICEASK);
//		(SmallSpeaker)(XStat.gi().LastStat(0))
}