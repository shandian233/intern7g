
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../../engtst/mgm/MyAI"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import IngotMall from "../../../../../engtst/mgm/gameing/fast/IngotMall"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class ExchangeMoney extends BaseClass{
	
	 constructor( xani_ui)
	{
		super();
		this.pm3f=M3DFast.gi();
		
		this.iW=500;
		this.iH=350;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_count=new XInputNumber(GmPlay.xani_nui3);
		this.in_count.iNumber=1;
		this.in_count.MinMax(1, 200);
		
		this.btn_exchange=new XButtonEx2(GmPlay.xani_button);
		this.btn_exchange.InitButton("1号按钮150_60");
		this.btn_exchange.sName="兑换";
	}


	
	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+30, "铜币兑换", 0xfffeec7e, 32, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
		
		this.pm3f.DrawText_2(this.iX+50, this.iY+30+60+14, "兑换数目", 0xfffeec7e, 28, 101, 1, 1, 0, 0, -2, 3, 0xff01152e);
		this.in_count.Move(this.iX+50+120, this.iY+30+60-11, 140);
		this.in_count.Draw();
		this.pm3f.DrawText_2(this.iX+50+120+140+8, this.iY+30+60+14, "*10万", 0xfffeec7e, 28, 101, 1, 1, 0, 0, -2, 3, 0xff01152e);
		
		this.pm3f.DrawText_2(this.iX+50, this.iY+30+60+60+14, "需要元宝", 0xfffeec7e, 28, 101, 1, 1, 0, 0, -2, 3, 0xff01152e);
		this.pm3f.DrawTextEx(this.iX+50+120, this.iY+30+60+60+14, ""+this.in_count.iNumber*10, 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		
		this.pm3f.DrawText_2(this.iX+50, this.iY+30+60+60+60+14, "拥有元宝", 0xfffeec7e, 28, 101, 1, 1, 0, 0, -2, 3, 0xff01152e);
		this.pm3f.DrawTextEx(this.iX+50+120, this.iY+30+60+60+60+14, ""+GmMe.me.rbs.iInGot, 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		
		this.btn_exchange.Move(this.iX+this.iW/2-150/2, this.iY+this.iH-30-60, 150, 60);
		this.btn_exchange.Draw();
		
		
		if (Confirm1.end(Confirm1.CONFIRM_GOTOCHARGE))
		{//
			if (Confirm1.bConfirm) 
			{// 同意，打开充值
				IngotMall.OpenEx();
			}
		}
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.in_count.ProcTouch(msg, x, y))
		{
//			if(this.in_count.iNumber>GmMe.me.rbs.iInGot/10)this.in_count.iNumber=GmMe.me.rbs.iInGot/10;
//			if(this.in_count.iNumber<=0)this.in_count.iNumber=1;
			return true;
		}
		if(this.btn_exchange.ProcTouch(msg, x, y))
		{
			if(this.btn_exchange.bCheck())
			{
				if(this.in_count.iNumber*10<=GmMe.me.rbs.iInGot)
				{
					GmProtocol.gi().s_SeverEvent(36, 0, this.in_count.iNumber, 0, 0);
					XStat.gi().PopStat(1);
				}
				else
				{
					Confirm1.start(Confirm1.CONFIRM_GOTOCHARGE, "当前元宝不足，是否前往充值？");
//					EasyMessage.easymsg.AddMessage("当前元宝不够");
				}
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
			return true;
		}
		return false;
	}
}
ExchangeMoney.Open=function()
{
	XStat.gi().PushStat(XStat.GS_EXCHANGEMONEY);
}