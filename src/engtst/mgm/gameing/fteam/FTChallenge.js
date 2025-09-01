
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import XInput from "../../../../engine/control/XInput"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"

//花费资金挑战自己往前的10名
export default class FTChallenge extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=500;
		this.iH=350;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_money=new XInput(GmPlay.xani_ui);
//		this.in_money.Move(this.iX+this.iW/2+60, this.iY+140, 128,50);
		this.in_money.sDetail="100000";
		this.in_money.bNumber=true;
		this.in_money.iTextSize=20;
		this.in_money.iMaxNumber=20000000;
		this.in_money.iTextColor=0xff114e61;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_button);
		this.btn_ok.Move(this.iX+330,this.iY+60+50+10, 150, 60);
		this.btn_ok.InitButton("1号按钮150_60");
		this.btn_ok.sName="确定挑战";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
	}
	
	Draw()
	{
		var yy;
		yy=this.iY+15;
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		this.pm3f.DrawText_2(this.iX+this.iW/2, yy, "发起挑战", 0xfffeec7e, 40, 101, 1, 1, 0, -2, 0,2,0xff01152e);
		yy+=60;
		this.pm3f.DrawText_2(this.iX+20, yy, "挑战战队:"+this.sDName, 0xfffeec7e, 30, 101, 1, 1, 0, 0, 0,2,0xff01152e);
		yy+=60;
		this.pm3f.DrawText_2(this.iX+20, yy, "挑战金", 0xfffeec7e, 30, 101, 1, 1, 0, 0, 0,2,0xff01152e);
		
		this.in_money.Move(this.iX+120,yy-10, 155, 50);
//		DrawMode.DrawTextFrame1(this.in_money.iX, this.in_money.iY,this.in_money.iW);
		DrawMode.frame_type4("8号框20_20", this.in_money.iX, this.in_money.iY,this.in_money.iW,50, 20, 20);
		this.in_money.DrawText();

		this.in_money.onscr();
		
		yy+=60;
		FormatString.gi().Format("#c114e61说明：挑战金从战队资金支出，最低10万，扣除挑战金后，战队资金不能低于100万，否则挑战无效。#e如同一战队被多个战队挑战，挑战金高者配对成功#e配对成功后，系统将扣除10%挑战金#e挑战胜利，剩余90%挑战金归还挑战方；#e挑战失败，挑战金归被挑战方所有", this.iW-40, 20);
		FormatString.gi().Draw(this.iX+20, yy);
		
		this.btn_ok.Draw();
		this.btn_close.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				if(this.in_money.sDetail.length>0)
				{
					i=parseInt(this.in_money.sDetail);
					if(i<100000)EasyMessage.easymsg.AddMessage("挑战金不能低于10万");
					else
					{
						GmProtocol.gi().s_FTChallenge(1,i,this.iDFid);
						XStat.gi().PopStat(1);
					}
				}
			}
			return true;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		this.in_money.ProcTouch(msg, x,y);
		return false;
	}
}
FTChallenge.Open=function( nm, fid)
{
    var ftc;
    if(XStat.gi().iXStat==XStat.GS_FTCHALLENGE)
    {
        ftc= XStat.gi().oCurrentView;
    }
    else
    {
        ftc= XStat.gi().PushStat(XStat.GS_FTCHALLENGE);
    }
    ftc.sDName=nm;
    ftc.iDFid=fid;
}