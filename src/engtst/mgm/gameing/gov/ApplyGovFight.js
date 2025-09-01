
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
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

export default class ApplyGovFight extends BaseClass{
	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=460;
		this.iH=420;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx1(GmPlay.xani_button);
		this.btn_ok.InitButton("1号按钮90_60");
		this.btn_ok.Move(this.iX + 30, this.iY + this.iH - 30-60, 90, 60);
		this.btn_ok.sName="报名";

		this.btn_cancel=new XButtonEx1(GmPlay.xani_button);
		this.btn_cancel.InitButton("1号按钮90_60");
		this.btn_cancel.Move(this.iX + this.iW - 30 - 90, this.iY + this.iH - 30-60, 90, 60);
		this.btn_cancel.sName="取消";

		this.in_price=new XInput(GmPlay.xani_frame);
		this.in_price.Move(this.iX + 180, this.iY + 80, 200, 50);
		this.in_price.sDetail="500000";
		this.in_price.bNumber=true;
		this.in_price.iTextSize=30;
		this.in_price.iMaxNumber=99999999;//2147483647;
		this.in_price.iTextColor = 0xff114e61;
	}

	Draw()
	{
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		
		M3DFast.gi().DrawText_2(this.iX + this.iW / 2, this.iY + 30, "帮战报名", 0xfffeec7e, 32, 100, 1, 1, 0, -2, 0, 2, 0xff01152e);
		M3DFast.gi().DrawText_2(this.iX + 35, this.iY + 90, "竞选资金:", 0xfffeec7e, 30, 100, 1, 1, 0, 0, 0, 2, 0xff01152e);
//		DrawMode.DrawFrame1(this.in_price.iX, this.in_price.iY, this.in_price.iW, this.in_price.iH);
//		this.in_price.Draw();
		DrawMode.frame_type4("8号框20_20",this.in_price.iX, this.in_price.iY, this.in_price.iW,this.in_price.iH,20,20);
		this.in_price.DrawText();
		this.in_price.onscr();
		
		FormatString.gi().Format("#c114e611,帮战报名时间: 每周四12:00:00~周五18:00:00#e2,竞选要求当前帮派资金>=100万#e3,竞选资金最低为50万，且不能超过[当前帮派资金/3]#e4,周五19:00:00，按竞选资金数额顺序，前8名获得本周帮战资格，系统自动扣除竞选资金(如当前帮派资金低于100万，或低于[竞选资金+(帮派等级+1)*50万]时，取消帮战资格)。", this.iW-40, 18);
		FormatString.gi().Draw(this.iX+20, this.iY+160);
		
		this.btn_ok.Draw();
		this.btn_cancel.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		this.in_price.ProcTouch(msg, x, y);
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{//确定报名
				i=parseInt(this.in_price.sDetail);
				if(i<500000)EasyMessage.easymsg.AddMessage("竞选资金不能低于50万");
				else
				{
					GmProtocol.gi().s_SeverEvent(10, 1, i, 0, 0);
					XStat.gi().PopStat(1);
				}
			}
		}
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
ApplyGovFight.Open=function()
{
	XStat.gi().PushStat(XStat.GS_APPLYGOVFIGHT);
}