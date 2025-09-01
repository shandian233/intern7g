
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XInput from "../../../../engine/control/XInput"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"

export default class CreateFT extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=400;
		this.iH=410;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_ftname=new XInput(GmPlay.xani_frame);
		this.in_ftname.Move(this.iX + 20, this.iY + 100, this.iW - 40, 60);
		this.in_ftname.bHideText=true;
		
		this.in_ftdetail=new XInput(GmPlay.xani_frame);
		this.in_ftdetail.Move(this.iX + 20, this.iY + 200, this.iW - 40, 120);
		this.in_ftdetail.bHideText=true;
		
		this.btn_create=new XButtonEx1(GmPlay.xani_button);
		this.btn_create.Move(this.iX + this.iW - 20-90, this.iY + this.iH - 20 - 60, 90, 60);
		this.btn_create.InitButton("1号按钮90_60");
		this.btn_create.sName="创建";
		
		this.btn_cancel=new XButtonEx1(GmPlay.xani_button);
		this.btn_cancel.Move(this.iX + 20, this.iY + this.iH - 20 - 60, 90, 60);
		this.btn_cancel.InitButton("1号按钮90_60");
		this.btn_cancel.sName="取消";
	}
	
	Draw()
	{
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX + this.iW / 2, this.iY + 20, "创建战队", 0xfffeec7e, 32, 101, 1, 1, 0, -2, 0, 2, 0xff01152e);
		
		this.pm3f.DrawText_2(this.in_ftname.iX, this.in_ftname.iY - 30, "输入战队名称：", 0xfffeec7e, 28, 101, 1, 1, 0, 0, 0, 2, 0xff01152e);
		DrawMode.frame_type4("8号框20_20", this.in_ftname.iX, this.in_ftname.iY, this.in_ftname.iW, this.in_ftname.iH, 20, 20);
		FormatString.gi().Format("#c114e61"+this.in_ftname.sDetail, this.in_ftname.iW-10, 30);//"#c000000"+
		FormatString.gi().Draw(this.in_ftname.iX+5, this.in_ftname.iY+5);
		
		this.pm3f.DrawText_2(this.in_ftdetail.iX, this.in_ftdetail.iY - 30, "输入战队简介：", 0xfffeec7e, 28, 101, 1, 1, 0, 0, 0, 2, 0xff01152e);
		DrawMode.frame_type4("8号框20_20", this.in_ftdetail.iX, this.in_ftdetail.iY, this.in_ftdetail.iW, this.in_ftdetail.iH, 20, 20);
		FormatString.gi().Format("#c114e61"+this.in_ftdetail.sDetail, this.in_ftdetail.iW-10, 30);//"#c000000"+
		FormatString.gi().Draw(this.in_ftdetail.iX+5, this.in_ftdetail.iY+5);
		
		this.btn_create.Draw();
		this.btn_cancel.Draw();

		this.in_ftname.onscr();
		this.in_ftdetail.onscr();
	}
	
	ProcTouch( msg, x, y)
	{
		this.in_ftname.ProcTouch(msg, x, y);
		this.in_ftdetail.ProcTouch(msg, x, y);
		
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{//检测文字是否合理，创建帮派
					if(this.in_ftname.sDetail.length<2 || this.in_ftname.sDetail.length>8)
					{
						EasyMessage.easymsg.AddMessage("战队名称2-8个字");
						return true;
					}
					
					if(this.in_ftdetail.sDetail.length<2 || this.in_ftdetail.sDetail.length>40)
					{
						EasyMessage.easymsg.AddMessage("战队宗旨2-40个字");
						return true;
					}

				//发送创建请求
				GmProtocol.gi().s_CreateFT(this.in_ftname.sDetail, this.in_ftdetail.sDetail);
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{//
				XStat.gi().PopStat(1);
			}
			return true;
		}

		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}

CreateFT.Open=function()
{
    XStat.gi().PushStat(XStat.GS_CREATEFT);
}