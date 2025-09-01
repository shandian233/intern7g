
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../../engine/control/XInput"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"

export default class Gov_SetName extends BaseClass{

	 constructor( a)
	{
		super();
		this.iW=360;
		this.iH=260;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_button);
		this.btn_ok.InitButton("普通按钮140_55");
		this.btn_ok.Move(this.iX+this.iW-30-140, this.iY+this.iH-30-55, 140, 55);
		this.btn_ok.sName="确定";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_button);
		this.btn_cancel.InitButton("普通按钮140_55");
		this.btn_cancel.Move(this.iX+30, this.iY+this.iH-30-55, 140, 55);
		this.btn_cancel.sName="取消";
		
		this.in_name=new XInput(GmPlay.xani_ui);
		this.in_name.sDetail="";
		this.in_name.sBackPrompt="点击这里输入新的帮派名字";
		this.in_name.iBackSize=24;
		this.in_name.iTextSize=30;
	}

	Draw()
	{
		var offx,offy;
		
		DrawMode.frame_type4("中等框a52_50",this.iX,this.iY,this.iW,this.iH,52,50);
//		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+20+15, "选择所需建造的建筑", 0xff005b41, 30, 101, 1, 1, 0, -2, -2);

		DrawMode.frame_type1("帮派宣言a20_44",this.iX+this.iW/2-60,this.iY+30,120,20);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2,this.iY+30+22, "帮派改名", 0xff000000, 25, 101, 1, 1, 0, -2, -2);

		offx=this.iX+30;
		offy=this.iY+20+44+30;
		
		this.in_name.Move(offx,offy,300,47);
		DrawMode.frame_type1("输入框a20_47",offx,offy,300,20);
		this.in_name.DrawText();
		this.in_name.onscr();
		
		this.btn_ok.Draw();
		this.btn_cancel.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.in_name.ProcTouch(msg, x, y))return true;
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				if(this.in_name.sDetail.length>0)
				{

						var buf=this.in_name.sDetail.getBytes("GBK");
						if(buf.length<4 || buf.length>16)
						{
							EasyMessage.easymsg.AddMessage("帮派名称2-8个字");
							return true;
						}

					GmProtocol.gi().s_NewGovOperate(18, 6, 0, 0, 0, this.in_name.sDetail);
					GmProtocol.gi().s_NewGovOperate(18, 0, 0, 0, 0, "");
					XStat.gi().PopStat(1);
				}
				else EasyMessage.easymsg.AddMessage("请先输入新的帮派名称");
			}
			return true;
		}

		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}
Gov_SetName.Open=function()
{
	XStat.gi().PushStat(XStat.GS_GOV_SETNAME);
}