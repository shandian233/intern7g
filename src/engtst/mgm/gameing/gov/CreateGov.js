
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XInput from "../../../../engine/control/XInput"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"

export default class CreateGov extends BaseClass{
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=480;
		this.iH=440;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_govname=new XInput(GmPlay.xani_frame);
		this.in_govname.Move(this.iX+25+20, this.iY+25+20+30, this.iW-90, 50);
		this.in_govname.bHideText=true;
		
		this.in_govdetail=new XInput(GmPlay.xani_frame);
		this.in_govdetail.Move(this.iX+25+20, this.iY+25+20+30+50+20+30, this.iW-90, 150);
		this.in_govdetail.bHideText=true;
		
		this.btn_create=new XButton(GmPlay.xani_nui2);
		this.btn_create.Move(this.iX+this.iW-25-20-110,this.iY+this.iH-25-20-52, 110, 52);
		this.btn_create.InitButton("按钮1_110");
		this.btn_create.sName="创建";
		
		this.btn_cancel=new XButton(GmPlay.xani_nui2);
		this.btn_cancel.Move(this.iX+25+20,this.iY+this.iH-25-20-52, 110, 52);
		this.btn_cancel.InitButton("按钮1_110");
		this.btn_cancel.sName="取消";
	}

	Draw()
	{
		DrawMode.new_bigframe(this.iX,this.iY,this.iW,this.iH);//, "创","建","帮","派");
		DrawMode.new_framein(this.iX+25, this.iY+25, this.iW-50, this.iH-50);

		this.pm3f.DrawTextEx(this.in_govname.iX, this.in_govname.iY-30, "输入帮派名称(2~8字)：", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		DrawMode.new_frameon(this.in_govname.iX, this.in_govname.iY, this.in_govname.iW, this.in_govname.iH, 1);
		DrawMode.new_framepc(this.in_govname.iX, this.in_govname.iY, this.in_govname.iW, this.in_govname.iH);
		this.pm3f.DrawTextEx(this.in_govname.iX+10,this.in_govname.iY+25,this.in_govname.sDetail,0xffffffff,30, 101, 1, 1, 0, 0, -2);

		this.pm3f.DrawTextEx(this.in_govdetail.iX, this.in_govdetail.iY-30, "输入帮派简介：", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		DrawMode.new_frameon(this.in_govdetail.iX, this.in_govdetail.iY, this.in_govdetail.iW, this.in_govdetail.iH, 1);
		DrawMode.new_framepc(this.in_govdetail.iX, this.in_govdetail.iY, this.in_govdetail.iW, this.in_govdetail.iH);		
		FormatString.gi().Format(this.in_govdetail.sDetail, this.in_govdetail.iW-20, 30);//"#c000000"+
		FormatString.gi().Draw(this.in_govdetail.iX+10, this.in_govdetail.iY+10);

		this.btn_create.Draw();
		this.btn_cancel.Draw();

		this.in_govname.onscr();
		this.in_govdetail.onscr();
	}

	ProcTouch( msg, x, y)
	{
		this.in_govname.ProcTouch(msg, x, y);
		this.in_govdetail.ProcTouch(msg, x, y);
		
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{//检测文字是否合理，创建帮派
					if(this.in_govname.length<2 || this.in_govname.length>8)
					{
						EasyMessage.easymsg.AddMessage("帮派名称2-8个字");
						return true;
					}

					if(this.in_govdetail.length<2 || this.in_govdetail.length>40)
					{
						EasyMessage.easymsg.AddMessage("帮派宗旨2-40个字");
						return true;
					}

				//发送创建请求
				GmProtocol.gi().s_CreateGov(this.in_govname.sDetail, this.in_govdetail.sDetail);
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
