
import GmConfig from "../../../../../config/GmConfig"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FTChallenge from "../../../../../engtst/mgm/gameing/fteam/FTChallenge"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

//注入资金
export default class FTPutIn extends BaseClass{
	
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=30+200+20+150+30;
		this.iH=30+50+10+40+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_money=new XInput(GmPlay.xani_ui);
		this.in_money.sDetail="0";
		this.in_money.bNumber=true;
		this.in_money.iTextSize=20;
		this.in_money.iMaxNumber=20000000;
		this.in_money.iTextColor=0xff114e61;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_button);
		this.btn_ok.Move(this.iX+30+200+20,this.iY+30-5, 150, 60);
		this.btn_ok.InitButton("1号按钮150_60");
		this.btn_ok.sName="存入";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
	}
	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		
		this.in_money.Move(this.iX+30,this.iY+30, 200, 50);
		DrawMode.frame_type4("8号框20_20", this.in_money.iX, this.in_money.iY, this.in_money.iW, this.in_money.iH, 20, 20);
		this.in_money.DrawText();
		this.in_money.onscr();
		
		FormatString.gi().Format("#c000000说明：将你的铜币存入到战队资金，战队资金总额最高不能超过2000万", this.iW-40, 20);
		FormatString.gi().Draw(this.iX+30, this.iY+30+50+10);
		
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
					if(i<=0)
					{
						EasyMessage.easymsg.AddMessage("存入资金不能为0");
						return true;
					}
					else if(i>GmMe.me.rbs.iMoney)
					{
						EasyMessage.easymsg.AddMessage("存入资金不能超过上限");
						return true;
					}
					else
					{//确定注入
						GmProtocol.gi().s_FTOperate(1,i,0);
					}
					XStat.gi().PopStat(1);
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

FTPutIn.Open=function( m)
{
    var ftc;
    if(XStat.gi().iXStat==XStat.GS_FTPUTIN)
    {
        ftc= XStat.gi().oCurrentView;
    }
    else
    {
        ftc=XStat.gi().PushStat(XStat.GS_FTPUTIN);
    }
    ftc.in_money.iMaxNumber=20000000-m;
    if(ftc.in_money.iMaxNumber>GmMe.me.rbs.iMoney)ftc.in_money.iMaxNumber=GmMe.me.rbs.iMoney;
}