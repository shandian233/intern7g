

import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import MyFT from "../../../../../engtst/mgm/gameing/fteam/MyFT"
import FTPutIn from "./FTPutIn"
import FTGetOut from "./FTGetOut"
import FTMiJing from "./FTMiJing"

//战队属性界面
export default class FTFrame extends BaseClass{
	//注入资金，提取资金
	//免战：关，领取声望
	//解散战队

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=590;
		this.iH=420;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_putin=new XButtonEx2(GmPlay.xani_button);
		this.btn_putin.Move(this.iX+30,this.iY+this.iH-30-60-10-60, 150, 60);
		this.btn_putin.InitButton("1号按钮150_60");
		this.btn_putin.sName="存入资金";
		
		this.btn_getout=new XButtonEx2(GmPlay.xani_button);
		this.btn_getout.Move(this.iX+30,this.iY+this.iH-30-60, 150, 60);
		this.btn_getout.InitButton("1号按钮150_60");
		this.btn_getout.sName="提取资金";
		
		this.btn_nowar=new XButtonEx2(GmPlay.xani_button);
		this.btn_nowar.Move(this.iX+this.iW/2-150/2,this.iY+this.iH-30-60-10-60, 150, 60);
		this.btn_nowar.InitButton("1号按钮150_60");
		this.btn_nowar.sName="免战";
		
		this.btn_sw=new XButtonEx2(GmPlay.xani_button);
		this.btn_sw.Move(this.iX+this.iW/2-150/2,this.iY+this.iH-30-60, 150, 60);
		this.btn_sw.InitButton("1号按钮150_60");
		this.btn_sw.sName="领取声望";
		
		this.btn_secret=new XButtonEx2(GmPlay.xani_button);
		this.btn_secret.Move(this.iX+this.iW-30-150,this.iY+this.iH-30-60-10-60, 150, 60);
		this.btn_secret.InitButton("1号按钮150_60");
		this.btn_secret.sName="战队秘境";
		
		this.btn_dismiss=new XButtonEx2(GmPlay.xani_button);
		this.btn_dismiss.Move(this.iX+this.iW-30-150,this.iY+this.iH-30-60, 150, 60);
		this.btn_dismiss.InitButton("1号按钮150_60");
		if(MyFT.mft.iFTJob==0)this.btn_dismiss.sName="解散战队";
		else this.btn_dismiss.sName="退出战队";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
	}
	
	Draw()
	{
		DrawMode.frame_type4("10号框20_20",this.iX, this.iY, this.iW, this.iH,20,20);
//		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+15, this.sName, 0xfffeec7e, 40, 101, 1, 1, 0, -2, 0,2,0xff01152e);
		
		DrawMode.ui3_Text1(this.iX+30, this.iY+40, 80, 160, "名称", this.sName);
		DrawMode.ui3_Text1(this.iX+30, this.iY+40+40*1, 80, 160, "队长", this.sLeader);
		DrawMode.ui3_Text1(this.iX+30, this.iY+40+40*2, 80, 160, "号码", ""+this.iRid);
		DrawMode.ui3_Text1(this.iX+30, this.iY+40+40*3, 80, 160, "荣誉", ""+this.iRy);
		DrawMode.ui3_Text1(this.iX+30, this.iY+40+40*4, 80, 160, "声望", ""+this.iSw);
		
		if(this.iRank>=100000)DrawMode.ui3_Text1(this.iX+30+250, this.iY+40,120,160,"战队排名", "暂无");
		else DrawMode.ui3_Text1(this.iX+30+250, this.iY+40,120,160,"战队排名", ""+this.iRank);
		DrawMode.ui3_Text1(this.iX+30+250, this.iY+40+40*1,120,160,"胜利场次", ""+this.iWin);
		DrawMode.ui3_Text1(this.iX+30+250, this.iY+40+40*2,120,160,"失败场次", ""+this.iLost);
		DrawMode.ui3_Text1(this.iX+30+250, this.iY+40+40*3,120,160,"放弃场次", ""+this.iGiveup);
		DrawMode.ui3_Text1(this.iX+30+250, this.iY+40+40*4,120,160,"战队资金", ""+this.iMoney);
		
		if(MyFT.mft.iFTJob==0)
		{//队长
			this.btn_putin.Draw();
			this.btn_getout.Draw();
			if(this.iNoWar==0)this.btn_nowar.sName="免战：关";
			else this.btn_nowar.sName="免战：开";
			this.btn_nowar.Draw();
			if(this.iSwAdd>0)
			{
				this.btn_sw.Draw();
				if(Confirm1.end(Confirm1.CONFIRM_SWADD))
				{
					if(Confirm1.bConfirm)
					{//领取当日声望
						GmProtocol.gi().s_FTOperate(4, this.iSwAdd, 0);
						this.iSwAdd=0;
					}
				}
			}
			
			if(Confirm1.end(Confirm1.CONFIRM_NOWAR))
			{
				if(Confirm1.bConfirm)
				{//同意切换免战
					if(this.iNoWar==0)this.iNoWar=1;
					else this.iNoWar=0;
					GmProtocol.gi().s_FTOperate(3, this.iNoWar, 0);
				}
			}
		}
		this.btn_secret.Draw();
		this.btn_dismiss.Draw();
		if(Confirm1.end(Confirm1.CONFIRM_FTDISMISS))
		{
			if(Confirm1.bConfirm)
			{//离开战队
				GmProtocol.gi().s_FTOperate(5, MyFT.mft.iFTJob, 0);
				XStat.gi().PopStat(1);
			}
		}
		this.btn_close.Draw();
	}
	
	 ProcTouch( msg, x, y)
	{
		if(MyFT.mft.iFTJob==0)
		{//队长
			if(this.btn_putin.ProcTouch(msg, x, y))
			{
				if(this.btn_putin.bCheck())
				{
					if(this.iMoney>=20000000)EasyMessage.easymsg.AddMessage("战队资金已达2000万");
					else FTPutIn.Open(this.iMoney);
				}
				return true;
			}
			if(this.btn_getout.ProcTouch(msg, x, y))
			{
				if(this.btn_getout.bCheck())
				{
					if(this.iMoney<=1000000)EasyMessage.easymsg.AddMessage("战队资金不能低于100万");
					else FTGetOut.Open(this.iMoney);
				}
				return true;
			}
			if(this.btn_nowar.ProcTouch(msg, x, y))
			{
				if(this.btn_nowar.bCheck())
				{
					Confirm1.start(Confirm1.CONFIRM_NOWAR, "每天20:00:00~24:00:00之间可切换免战状态#e免战开启后，可免受其他战队的挑战(每天0点将扣除10万战队资金)#e是否确定切换免战状态？");
				}
				return true;
			}
			if(this.iSwAdd>0)
			{
				if(this.btn_sw.ProcTouch(msg, x, y))
				{
					if(this.btn_sw.bCheck())
					{
						Confirm1.start(Confirm1.CONFIRM_SWADD, "每天18:00:00之前可领取当日战队声望奖励#e当前可领"+this.iSwAdd+"点战队声望，战队排名越靠前，每日可领取声望越多#e是否确定领取？");
					}
					return true;
				}
			}
		}
		if(this.btn_secret.ProcTouch(msg, x, y))
		{
			if(this.btn_secret.bCheck())
			{
				XStat.gi().PushStat(XStat.GS_FTMIJING);
			}
			return true;
		}
		if(this.btn_dismiss.ProcTouch(msg, x, y))
		{
			if(this.btn_dismiss.bCheck())
			{
				if(MyFT.mft.iFTJob==0)Confirm1.start(Confirm1.CONFIRM_FTDISMISS, "战队解散后，战队资金将消失#e是否确定解散战队？");
				else Confirm1.start(Confirm1.CONFIRM_FTDISMISS, "是否确定离开战队？");
			}
			return true;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{//
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}
FTFrame.Open=function( pls)
{
    var ftf;
    
    if(XStat.gi().iXStat==XStat.GS_FTFRAME)
    {
        ftf= XStat.gi().oCurrentView;
    }
    else ftf= XStat.gi().PushStat(XStat.GS_FTFRAME);
    
    ftf.sName=pls.GetNextString();
    ftf.iRank=pls.GetNextInt();
    ftf.iMoney=pls.GetNextInt();
    ftf.iWin=pls.GetNextInt();
    ftf.iLost=pls.GetNextInt();
    ftf.iGiveup=pls.GetNextInt();
    ftf.iSw=pls.GetNextInt();
    ftf.iSwAdd=pls.GetNextInt();
    ftf.iRy=pls.GetNextInt();
    ftf.iNoWar=pls.GetNextInt();
    ftf.sLeader=pls.GetNextString();
    ftf.iRid=pls.GetNextInt();
}