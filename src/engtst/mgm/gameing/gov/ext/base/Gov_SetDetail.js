
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
import FormatString from "../../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"

export default class Gov_SetDetail extends BaseClass{

	constructor( a)
	{
		super();
		this.iW=500;
		this.iH=400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_button);
		this.btn_ok.InitButton("普通按钮140_55");
		this.btn_ok.Move(this.iX+this.iW-30-140, this.iY+this.iH-30-55, 140, 55);
		this.btn_ok.sName="修改";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_button);
		this.btn_cancel.InitButton("普通按钮140_55");
		this.btn_cancel.Move(this.iX+30, this.iY+this.iH-30-55, 140, 55);
		this.btn_cancel.sName="取消";
		
		this.in_name=new XInput(GmPlay.xani_ui);
		this.in_name.sDetail="";
	}

	Draw()
	{
		DrawMode.frame_type4("中等框a52_50",this.iX,this.iY,this.iW,this.iH,52,50);
//		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+20+15, "选择所需建造的建筑", 0xff005b41, 30, 101, 1, 1, 0, -2, -2);

		var offx,offy;
		
		DrawMode.frame_type1("帮派宣言a20_44",this.iX+this.iW/2-60,this.iY+30,120,20);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2,this.iY+30+22, "帮派宣言", 0xff000000, 25, 101, 1, 1, 0, -2, -2);
		
		offx=this.iX+30;
		offy=this.iY+20+44+20+5;

		this.in_name.Move(offx,offy,this.iW-60,200);
		DrawMode.new_framepc(offx,offy,this.iW-60,200);
		this.in_name.onscr();
//		DrawMode.frame_type1("输入框a20_47",offx,offy,300,200);
		
		if(this.in_name.sDetail.length<=0)
		{
			M3DFast.gi().DrawTextEx(offx+10, offy+10, "点击这里输入新的帮派宣言",0x60ffffff, 24, 101, 1, 1, 0, 0, 0);
		}
		else
		{
			FormatString.gi().FormatEx(this.in_name.sDetail, this.iW-60-20, 25, 0, 0, 30);
			FormatString.gi().Draw(offx+10, offy+10);
		}
		
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
						if(buf.length<4 || buf.length>80)
						{
							EasyMessage.easymsg.AddMessage("帮派宣言2-40个字");
							return true;
						}

					GmProtocol.gi().s_NewGovOperate(19, 0, 0, 0, 0, this.in_name.sDetail);
					XStat.gi().PopStat(1);
				}
				else EasyMessage.easymsg.AddMessage("请输入新的帮派宣言");
			}
			return true;
		}

		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}

Gov_SetDetail.Open=function( def)
{
    var gsd=XStat.gi().PushStat(XStat.GS_GOV_SETDETAIL);
    gsd.in_name.sDetail=def;
}
