
import CreateRole from "../../../../mgm/newmainmenu/CreateRole"
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../engine/control/XCheckBox"
import XInput from "../../../../engine/control/XInput"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"

export default class ChangeName extends BaseClass{

	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=400;
		this.iH=250;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_change=new XButtonEx2(GmPlay.xani_button);
		this.btn_change.InitButton("1号按钮90_60");
		this.btn_change.Move(this.iX+40, this.iY+this.iH-60-40, 90, 60);
		this.btn_change.sName="改名";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_button);
		this.btn_cancel.InitButton("1号按钮90_60");
		this.btn_cancel.Move(this.iX+this.iW-40-90, this.iY+this.iH-60-40, 90, 60);
		this.btn_cancel.sName="取消";
		
		this.in_nick=new XInput(GmPlay.xani_frame);
		this.in_nick.Move(this.iX+140, this.iY+20,this.iW-160,50);
		this.in_nick.sDetail="";
		this.in_nick.iTextSize=30;
	}

	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		
		M3DFast.gi().DrawTextEx(this.iX+40, this.iY+40, "输入新的昵称：", 0xff114e61, 30, 101, 1, 1, 0, 0,0);
		this.in_nick.Move(this.iX+40, this.iY+80, this.iW-80, 50);
		DrawMode.frame_type4("8号框20_20", this.in_nick.iX, this.in_nick.iY, this.in_nick.iW, 50, 20, 20);
		
		this.pm3f.DrawTextEx(this.in_nick.iX + 10, this.in_nick.iY + this.in_nick.iH / 2, this.in_nick.sDetail, 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		
		this.btn_change.Draw();
		this.btn_cancel.Draw();
		this.in_nick.onscr();
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_change.ProcTouch(msg, x, y))
		{
			if(this.btn_change.bCheck())
			{//确定改名
				if(!CreateRole.bCheckNick(this.in_nick.sDetail,4,24))
				{//昵称格式有问题
					EasyMessage.easymsg.AddMessage("昵称填写有误");
				}
				else
				{//昵称没问题,申请注册
					GmProtocol.gi().s_changenick(this.in_nick.sDetail);
					XStat.gi().PopStat(1);
//					GmProtocol.gi().s_CreateRole(XRecordFast.iLastSector,
//							XRecordFast.iLastSever,
//							this.in_nick.sDetail, iSelectPoint%2, iSelectPoint/2);
//					XStat.gi().PushStat(XStat.GS_LOADING1);
//					((Loading1)(XStat.gi().LastStat(0))).sDetail="创建中...";
				}
			}
			return true;
		}
		this.in_nick.ProcTouch(msg, x, y);
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}
