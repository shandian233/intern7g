
import GmConfig from "../../../../../../config/GmConfig"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../../engtst/mgm/frame/UIList"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import MemberOperate from "../../../../../../engtst/mgm/gameing/gov/ext/base/MemberOperate"
import NewGovFrame from "../../../../../../engtst/mgm/gameing/gov/ext/base/NewGovFrame"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

class GOV_ENTRUST
{/*
	int iMid;
	int iType;//类型，(0朱雀/1青龙/2白虎/3玄武)
	int iStat;//(0等待领取，1进行中，2过期失效，3已完成)
	
	String sSName;//发布人
	int iSRid;
	int iSIngot;
	int iSMoney;
	String sSTime;
	
	String sTName;//接受人
	int iTRid;
	String sTTime;
	
	int iInitStat;*/
	constructor()
	{

	}
}

export default class EntrustMission extends BaseClass{
	
	constructor( a)
	{
		super();
		this._MSTAT=["等待领取","进行中","已过期","已完成"];
		var i;
		this.iW=1100;
		this.iH=620;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.iPage=0;
		this.btn_page=new Array(2);//
		for(i=0;i<2;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
			this.btn_page[i].Move(this.iX+this.iW-15, this.iY+40+125*i, 50, 140);
		}
		
		this.iSelect=0;
		this.btn_select=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_select[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_select[i].InitButton("选择按钮145_56");
			this.btn_select[i].Move(this.iX+25+20+160*i, this.iY+25+20, 145, 55);
		}
		this.btn_select[0].sName="朱雀任务";
		this.btn_select[1].sName="青龙任务";
		this.btn_select[2].sName="白虎任务";
		this.btn_select[3].sName="玄武任务";
		
		this.btn_addmission=new XButtonEx2(GmPlay.xani_button);
		this.btn_addmission.InitButton("普通按钮170_55");
		this.btn_addmission.Move(this.iX+this.iW-25-20-170, this.iY+25+20, 170, 55);
		this.btn_addmission.sName="发布委托";
		
		this.ui0_missionlist=new UIList(0,9,this.iW-90,50+40*10);
		this.ui0_missionlist.SetTitle(0, "任务佣金", 300,false);
		this.ui0_missionlist.SetTitle(1, "发布人", 200,true);
		this.ui0_missionlist.SetTitle(2, "发布时间", 510,true);
		
		this.ui1_missionlist=new UIList(0,9,this.iW-90,50+40*10);
		this.ui1_missionlist.SetTitle(0, "任务佣金", 300,false);
		this.ui1_missionlist.SetTitle(1, "任务状态", 200,true);
		this.ui1_missionlist.SetTitle(2, "发布时间", 510,true);
	}

	_GetMyDetail( pls)
	{
		var i;
		var cs1=pls.GetNextInt();
		var cs2=pls.GetNextInt();
		if(cs1==100)
		{
			for(i=0;i<this.iM1Count;i++)
			{
				if(this.ets1[i].iInitStat==2 && this.ets1[i].iMid==cs2)
				{
					this.ets1[i].iStat=pls.GetNextByte();
					this.ets1[i].iSIngot=pls.GetNextShort();
					this.ets1[i].iSMoney=pls.GetNextInt();
					this.ets1[i].sSTime=pls.GetNextString();
					this.ets1[i].iType=pls.GetNextByte();
					this.ets1[i].sSName=pls.GetNextString();
					this.ets1[i].iInitStat=3;
				}
			}
		}
		else
		{
			for(i=0;i<this.iM0Count;i++)
			{
				if(this.ets0[i].iInitStat==2 && this.ets0[i].iMid==cs2)
				{
					this.ets0[i].iStat=pls.GetNextByte();
					this.ets0[i].iSIngot=pls.GetNextShort();
					this.ets0[i].iSMoney=pls.GetNextInt();
					this.ets0[i].sSTime=pls.GetNextString();
					this.ets0[i].iType=pls.GetNextByte();
					this.ets0[i].sSName=pls.GetNextString();
					this.ets0[i].iInitStat=3;
				}
			}
		}
	}

	_GetMyMission( pls)
	{
		var i;
		var cs1=pls.GetNextInt();
		if(cs1==100)
		{//获得我发布的任务列表
			this.iM1Count=pls.GetNextInt();
			this.ets1=new Array(this.iM1Count);//
			for(i=0;i<this.iM1Count;i++)
			{
				this.ets1[i]=new GOV_ENTRUST();
				this.ets1[i].iMid=pls.GetNextInt();;
				this.ets1[i].iInitStat=1;
			}
			this.iAlreadyEntrusted=pls.GetNextInt();
		}
		else
		{
			this.iM0Count=pls.GetNextInt();
			this.ets0=new Array(this.iM0Count);//
			for(i=0;i<this.iM0Count;i++)
			{
				this.ets0[i]=new GOV_ENTRUST();
				this.ets0[i].iMid=pls.GetNextInt();;
				this.ets0[i].iInitStat=1;
			}
		}
	}

	Draw()
	{
		var i;
		var offx,offy;
		var w,h;

		DrawMode.new_baseframe4(this.iX, this.iY, this.iW,this.iH,"委","托","任","务");
		this.btn_close.Draw();
		
		for(i=0;i<2;i++)
		{
			if(this.iPage==i)
			{
				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
		}
		DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*0-4, 40, 70,this.iPage==0,"委","托","任","务");
		DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*1-8, 40, 70,this.iPage==1,"我","的","委","托");
		
		offx=this.iX+25;
		offy=this.iY+25;
		w=this.iW-50;
		h=this.iH-50;
		DrawMode.new_framein(offx, offy, w, h);
		
		switch(this.iPage)
		{
		case 0:
			this.Draw_0(offx+20,offy+20);
			break;
		case 1:
			this.Draw_1(offx+20,offy+20);
			break;
		}

	}
	 Draw_0( offx, offy)
	{
		var i;
		for(i=0;i<4;i++)
		{
			if(this.iSelect==i)
			{
				this.btn_select[i].bMouseIn=true;
				this.btn_select[i].bMouseDown=true;
			}
			this.btn_select[i].Draw();
		}

		this.ui0_missionlist.BeginDraw(offx, offy+55+20);
		for(i=0;i<this.iM0Count;i++)
		{
			if(this.ui0_missionlist.bShow(i) && this.ets0[i]!=null)
			{
				if(this.ets0[i].iInitStat==1)
				{
					GmProtocol.gi().s_NewGovOperate(15,this.iSelect,this.ets0[i].iMid,0,0,"");
					this.ets0[i].iInitStat=2;
				}
				else if(this.ets0[i].iInitStat==2)
				{
					this.ui0_missionlist.DrawUnit(0, i, "获取中");
				}
				else if(this.ets0[i].iInitStat==3)
				{
					this.ui0_missionlist.DrawUnit(0, i, this.ets0[i].iSIngot+"元宝+"+this.ets0[i].iSMoney+"铜币");
					this.ui0_missionlist.DrawUnit(1, i, this.ets0[i].sSName);;
					this.ui0_missionlist.DrawUnit(2, i, this.ets0[i].sSTime);
				}
			}
		}
		this.ui0_missionlist.FinishDraw();
		i=this.ui0_missionlist.iChecked();
		if(i>=0)
		{
			this.pge=this.ets0[i];
			Confirm1.start(Confirm1.CONFIRM_GOVGETENTRUST,ReleaseGovMission._FOUR[this.pge.iType]+"#e#e委托人:"+this.pge.sSName+"#e#e接受委托任务后半小时内未完成则任务失败#e#e是否确定接受委托？");
		}
		
		if(Confirm1.end(Confirm1.CONFIRM_GOVGETENTRUST))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_NewGovOperate(17, 1,this.pge.iMid,this.pge.iType,0 ,"");
				this.ui0_missionlist.Clean();
			}
		}
	}
	 Draw_1( offx, offy)
	{
		var i,j,k,m;
		for(i=0;i<4;i++)
		{
			if(this.iSelect==i)
			{
				this.btn_select[i].bMouseIn=true;
				this.btn_select[i].bMouseDown=true;
			}
			this.btn_select[i].Draw();
		}
		this.btn_addmission.Draw();
		
		m=this.ui1_missionlist.iChecked();
		
		this.ui1_missionlist.BeginDraw(offx, offy+55+20);
		j=0;k=0;
		for(i=0;i<this.iM1Count;i++)
		{
			if(this.ets1[i].iInitStat==1)
			{
				if(k<6)
				{
					GmProtocol.gi().s_NewGovOperate(15,100,this.ets1[i].iMid,0,0,"");
					this.ets1[i].iInitStat=2;
				}
				k++;
			}
			else if(this.ets1[i].iInitStat==2)
			{
//				this.ui1_missionlist.DrawUnit(1, i, "获取中");
				k++;
			}
			else if(this.ets1[i].iInitStat==3)
			{
				if(this.ets1[i].iType==this.iSelect)
				{
					this.ui1_missionlist.DrawUnit(0, j, this.ets1[i].iSIngot+"元宝+"+this.ets1[i].iSMoney+"铜币");
					this.ui1_missionlist.DrawUnit(1, j, this._MSTAT[this.ets1[i].iStat]);
					this.ui1_missionlist.DrawUnit(2, j, this.ets1[i].sSTime);
					if(m==j)
					{//所点击的选项，撤销
						this.pge=this.ets1[i];
						switch(this.pge.iStat)
						{
						case 0://等待领取
							Confirm1.start(Confirm1.CONFIRM_GOVCANCELENTRUST,ReleaseGovMission._FOUR[this.pge.iType]+"#e#e委托任务持续一天，一天后未完成的委托任务失效#e撤销任务返还佣金，手续费不返还#e#e是否确认撤销所选委托？");
							break;
						case 1://进行中
							FrameMessage.fm.Open(ReleaseGovMission._FOUR[this.pge.iType]+"#e#e委托任务持续一天，一天后未完成的委托任务失效#e撤销任务返还佣金，手续费不返还");
							break;
						case 2://已过期
							Confirm1.start(Confirm1.CONFIRM_GOVCANCELENTRUST,ReleaseGovMission._FOUR[this.pge.iType]+"#e#e委托任务持续一天，一天后未完成的委托任务失效#e撤销任务返还佣金，手续费不返还#e#e是否确认撤销所选委托？");
							break;
						case 3://已完成//不会出现
							break;
						}
					}
					j++;
				}
			}
		}
		this.ui1_missionlist.FinishDraw();

		if(Confirm1.end(Confirm1.CONFIRM_GOVCANCELENTRUST))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_NewGovOperate(17, 0,this.pge.iMid,this.pge.iType,0 ,"");
				this.ui1_missionlist.Clean();
			}
		}
	}
	 

	 ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<2;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
					if(this.iPage!=i)
					{
						this.iPage=i;
						if(i==1)
						{
							GmProtocol.gi().s_NewGovOperate(14, 100, 0, 0,0,"");
							this.ui1_missionlist.Clean();
							this.iSelect=0;
							this.iM1Count=0;
						}
						if(i==0)
						{
							GmProtocol.gi().s_NewGovOperate(14, 0, 0, 0,0,"");
							this.ui0_missionlist.Clean();
							this.iSelect=0;
							this.iM0Count=0;
						}
					}
				}
			}
		}
		switch(this.iPage)
		{
		case 0:
			for(i=0;i<4;i++)
			{//切换朱雀青龙
				if(this.btn_select[i].ProcTouch(msg, x, y))
				{
					if(this.btn_select[i].bCheck())
					{
						if(this.iSelect!=i)
						{
							this.iSelect=i;
							GmProtocol.gi().s_NewGovOperate(14, i, 0, 0,0,"");
							this.ui0_missionlist.Clean();
							this.iM0Count=0;
						}
					}
				}
			}
			this.ui0_missionlist.ProcTouch(msg, x, y);
			break;
		case 1:
			for(i=0;i<4;i++)
			{//切换朱雀青龙
				if(this.btn_select[i].ProcTouch(msg, x, y))
				{
					if(this.btn_select[i].bCheck())
					{
						this.iSelect=i;
					}
				}
			}
			if(this.btn_addmission.ProcTouch(msg, x, y))
			{
				if(this.btn_addmission.bCheck())
				{//打开发布任务页面
					i=GmMe.me.rbs.iLev/2;
					if(i>20)i=20;
					if(this.iAlreadyEntrusted>=i)FrameMessage.fm.Open("发布任务次数已达上限");
					else ReleaseGovMission.Open(this.iSelect,i-this.iAlreadyEntrusted,i);
				}
			}
			this.ui1_missionlist.ProcTouch(msg, x, y);
			break;
		}
		return false;
	}
}
EntrustMission.Open=function()
{
	var afg;
	if (XStat.gi().iXStat != XStat.GS_ENTRUSTMISSION)afg= XStat.gi().PushStat(XStat.GS_ENTRUSTMISSION);
	else afg =  XStat.gi().LastStat(0);
	//发送信息，获取朱雀任务列表
	GmProtocol.gi().s_NewGovOperate(14, 0, 0, 0,0,"");
}
EntrustMission.CancelEntrust=function( pls)
{
	var afg;
	afg=XStat.gi().FindStat(XStat.GS_ENTRUSTMISSION);
	if (afg!=null)
	{
		var i=pls.GetNextInt();
		if(i==0)
		{//撤销委托，从当前列表中去掉
			var mid=pls.GetNextInt();
			var j=0;
			for(i=0;i<afg.iM1Count-1;i++)
			{
				if(afg.ets1[i].iMid==mid)j=1;
				if(j==1)afg.ets1[i]=afg.ets1[i+1];
			}
			if(j==1)afg.iM1Count--;
		}
		else
		{//接了委托，去除任务
			var mid=pls.GetNextInt();
			var j=0;
			for(i=0;i<afg.iM0Count-1;i++)
			{
				if(afg.ets0[i].iMid==mid)j=1;
				if(j==1)afg.ets0[i]=afg.ets0[i+1];
			}
			if(j==1)afg.iM0Count--;
		}
	}
}
EntrustMission.GetMyDetail=function( pls)
{
	var afg;
	afg=XStat.gi().FindStat(XStat.GS_ENTRUSTMISSION);
	if (afg!=null)afg._GetMyDetail(pls);
}
EntrustMission.GetMyMission=function( pls)
{
	var afg;
	afg=XStat.gi().FindStat(XStat.GS_ENTRUSTMISSION);
	if (afg!=null)afg._GetMyMission(pls);
}