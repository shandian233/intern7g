
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
import UIList from "../../../../../engtst/mgm/frame/UIList"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import PrivateChat_Send from "../../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import MyFT from "../../../../../engtst/mgm/gameing/fteam/MyFT"

class _FTMEMBER
{/*
	public int rid,job,tick,maxtick;
	public String name;
    public int online;*/
    constructor()
    {

    }
};
//战队属性界面
export default class FTMember extends BaseClass{
	
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=600+60;
		this.iH=30+50+50+40*10+20+60+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
	
		this.btn_watch=new XButtonEx2(GmPlay.xani_button);
		this.btn_watch.Move(this.iX+30,this.iY+this.iH-30-60, 90, 60);
		this.btn_watch.InitButton("1号按钮90_60");
		this.btn_watch.sName="查看";
		
		this.btn_tranfer=new XButtonEx2(GmPlay.xani_button);
		this.btn_tranfer.Move(this.iX+30+(90+20)*1,this.iY+this.iH-30-60, 90, 60);
		this.btn_tranfer.InitButton("1号按钮90_60");
		this.btn_tranfer.sName="转让";
		
		this.btn_kick=new XButtonEx2(GmPlay.xani_button);
		this.btn_kick.Move(this.iX+30+(90+20)*2,this.iY+this.iH-30-60, 90, 60);
		this.btn_kick.InitButton("1号按钮90_60");
		this.btn_kick.sName="踢出";
		
		this.btn_agree=new XButtonEx2(GmPlay.xani_button);
		this.btn_agree.Move(this.iX+this.iW-30-90-20-150,this.iY+this.iH-30-60, 150, 60);
		this.btn_agree.InitButton("1号按钮150_60");
		this.btn_agree.sName="申请列表";
		
		this.btn_message=new XButtonEx2(GmPlay.xani_button);
		this.btn_message.Move(this.iX+this.iW-30-90,this.iY+this.iH-30-60, 90, 60);
		this.btn_message.InitButton("1号按钮90_60");
		this.btn_message.sName="群邮";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
		
		this.ui_mlist=new UIList(0,5,600,50+40*10);
		this.ui_mlist.SetTitle(0, "序号", 80, false);
		this.ui_mlist.SetTitle(1, "名字", 200, false);
		this.ui_mlist.SetTitle(2, "贡献", 120, false);
		this.ui_mlist.SetTitle(3, "职位", 80, false);
		this.ui_mlist.SetTitle(4, "是否在线", 120, false);
	}
	
	Draw()
	{
		var i;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+30+25, "战队成员", 0xfffeec7e, 36, 101, 1, 1, 0, -2, -2,2,0xff01152e);
		
		this.ui_mlist.BeginDraw(this.iX+30, this.iY+30+50);
		for(i=0;i<this.iMemberCount;i++)
		{
			this.ui_mlist.DrawUnit(0, i, ""+(i+1));
			this.ui_mlist.DrawUnit(1, i, this.ftmember[i].name);
			this.ui_mlist.DrawUnit(2, i, this.ftmember[i].tick+"/"+this.ftmember[i].maxtick);
			if(this.ftmember[i].online!=0)this.ui_mlist.DrawUnit(4, i, "在线");
			
			if(this.ftmember[i].job==0)this.ui_mlist.DrawUnit(3, i, "队长");
			else if(this.ftmember[i].job==1)this.ui_mlist.DrawUnit(3, i, "副队长");
			else this.ui_mlist.DrawUnit(3, i, "队员");
		}
		this.ui_mlist.FinishDraw();
//		if(this.iPoint>=0 && this.iPoint<iFtCount)btn_apply.Draw();

		this.btn_close.Draw();
		
		this.iPoint=this.ui_mlist.iLockPoint;
		if(this.iPoint>=0 && this.iPoint<this.iMemberCount)this.btn_watch.Draw();
		this.btn_message.Draw();
		//job==0才能看到
		if(MyFT.mft.iFTid>0 && MyFT.mft.iFTJob==0)
		{
			if(this.iPoint>0 && this.iPoint<this.iMemberCount)
			{
				this.btn_kick.Draw();
				this.btn_tranfer.Draw();
			}
			this.btn_agree.Draw();
			
			if(Confirm1.end(Confirm1.CONFIRM_FTKICK))
			{
				if(Confirm1.bConfirm)
				{//同意切换免战
					if(this.iPoint>=0 && this.iPoint<this.iMemberCount)
					{
						GmProtocol.gi().s_FTOperate(6, this.ftmember[this.iPoint].rid, 0);
					}
				}
			}
			if(Confirm1.end(Confirm1.CONFIRM_FTTRANFER))
			{
				if(Confirm1.bConfirm)
				{//同意转让战队
					if(this.iPoint>=0 && this.iPoint<this.iMemberCount)
					{
						GmProtocol.gi().s_FTOperate(9, this.ftmember[this.iPoint].rid, 0);
						XStat.gi().PopStat(1);
					}
				}
			}
		}

	}
	
	 ProcTouch( msg, x, y)
	{
		if(this.ui_mlist.ProcTouch(msg, x, y))return true;
		if(MyFT.mft.iFTid>0 && MyFT.mft.iFTJob==0)
		{
			if(this.btn_agree.ProcTouch(msg, x, y))
			{
				if(this.btn_agree.bCheck())
				{//打开申请列表，同意/拒绝申请者加入
					XStat.gi().PopStat(1);
					GmProtocol.gi().s_GetApply(0);
				}
				return true;
			}
			if(this.iPoint>=0 && this.iPoint<this.iMemberCount)
			{
				if(this.btn_kick.ProcTouch(msg, x, y))
				{
					if(this.btn_kick.bCheck())
					{
						Confirm1.start(Confirm1.CONFIRM_FTKICK, "是否确定将"+this.ftmember[this.iPoint].name+"("+this.ftmember[this.iPoint].rid+")"+"踢出战队？");
					}
					return true;
				}
				if(this.btn_tranfer.ProcTouch(msg, x, y))
				{
					if(this.btn_tranfer.bCheck())
					{
						Confirm1.start(Confirm1.CONFIRM_FTTRANFER, "是否确定将战队转让给"+this.ftmember[this.iPoint].name+"("+this.ftmember[this.iPoint].rid+")"+"？(转让战队需要扣除20万战队资金)");
					}
					return true;
				}
			}
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.iPoint>=0 && this.iPoint<this.iMemberCount)
		{
			if(this.btn_watch.ProcTouch(msg, x, y))
			{
				if(this.btn_watch.bCheck())
				{//查看
					GmProtocol.gi().s_WatchOn(0, this.ftmember[this.iPoint].rid, 0, "");
				}
				return true;
			}
		}
		if(this.btn_message.ProcTouch(msg, x, y))
		{
			if(this.btn_message.bCheck())
			{
				PrivateChat_Send.OpenChat( 10001, "战队群邮",6);
				EasyMessage.easymsg.AddMessage("发送收取1万铜币");
			}
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}

FTMember. Open=function( pls)
{
    var i;
    var ftm;
    if(XStat.gi().iXStat==XStat.GS_FTMEMBER)
    {
        ftm=XStat.gi().oCurrentView;
    }
    else
    {
        ftm=XStat.gi().PushStat(XStat.GS_FTMEMBER);
        ftm.ftmember=new Array(10);//
        for(i=0;i<10;i++)ftm.ftmember[i]=new _FTMEMBER();
    }
    ftm.iMemberCount=pls.GetNextByte();
    for(i=0;i<ftm.iMemberCount;i++)
    {
        ftm.ftmember[i].rid=pls.GetNextInt();
        ftm.ftmember[i].online=pls.GetNextByte();
        ftm.ftmember[i].name=pls.GetNextString();
        ftm.ftmember[i].job=pls.GetNextInt();
        ftm.ftmember[i].tick=pls.GetNextInt();
        ftm.ftmember[i].maxtick=pls.GetNextInt();
    }
    ftm.iPoint=-1;
}