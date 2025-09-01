
import GmConfig from "../../../../../../config/GmConfig"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../../engine/control/XInput"
import AnimaAction from "../../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../../engtst/mgm/frame/UIList"
import FormatString from "../../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import PrivateChat_Send from "../../../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

class _GOVLIST
{/*
	String sGovName;
	int iGovId;
	int iGovLev;
	int iMemberCount,iMaxMemberCount;
	String sMaster;
	int iMasterId;
	String sDetail;
	boolean bApplyed;
    short iInitStat;*/
    constructor()
    {

    }
}
//申请入帮
export default class ApplyForGov extends BaseClass{

	 constructor( ani)
	{
		super();
        this.MAXGOVLIST=32;
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.govlist=new Array(this.MAXGOVLIST);

		for(i=0;i<this.MAXGOVLIST;i++)
		{
			this.govlist[i]=new _GOVLIST();
		}
		this.Init();
	}

	///////////////////////////////////////////////////////////////////////////

	ApplyedGovs( pls)
	{
		var i,j,k,m;
		j=pls.GetNextInt();
		
		for(i=0;i<j;i++)
		{
			m=pls.GetNextShort();
			for(k=0;k<this.iGovCount;k++)
			{
				if(this.govlist[k]!=null && this.govlist[k].iGovId==m)
				{
					this.govlist[k].bApplyed=true;
				}
			}
		}
    }

	 GetGovDetail( pls)
	{
		var i=pls.GetNextInt();
		var j=pls.GetNextByte();
		for(var k=0;k<this.iGovCount;k++)
		{
			if(this.govlist[k]!=null && this.govlist[k].iGovId==i)
			{
				if(this.govlist[k].iInitStat==1)
				{
					if(j==0)this.govlist[k].iInitStat=3;
					else
					{
						this.govlist[k].iInitStat=2;
						this.govlist[k].sGovName=pls.GetNextString();
						this.govlist[k].iGovLev=pls.GetNextInt();
						this.govlist[k].iMemberCount=pls.GetNextInt();
						this.govlist[k].iMaxMemberCount=pls.GetNextInt();
						this.govlist[k].sMaster=pls.GetNextString();
						this.govlist[k].iMasterId=pls.GetNextInt();
						this.govlist[k].sDetail=pls.GetNextString();
					}
				}
				break;
			}
		}
    }

	 GetIdList( pls)
	{
		var i,off;
		i=pls.GetNextInt();
		off=pls.GetNextShort();//起始偏移量
		if(off==0)
		{
			this.iGovCount=i;
			this.govlist=new Array(this.iGovCount);//
			this.iOffY=0;
		}
		
		while(true)
		{
			i=pls.GetNextShort();
			if(i==30000 || pls.iOffset>1024 || off>=this.iGovCount)break;
			if(this.govlist[off]==null)this.govlist[off]=new _GOVLIST();
			this.govlist[off].iGovId=i;
			this.govlist[off].iInitStat=0;
			this.govlist[off].bApplyed=false;
			off++;
		}
	}

	 Init()
	{
		this.iW=920;
		this.iH=620;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.ui_govlist=new UIList(0,6,this.iW-90,330);
		this.ui_govlist.SetTitle(0, "序号", 90,false);
		this.ui_govlist.SetTitle(1, "名称", 200,false);
		this.ui_govlist.SetTitle(2, "帮派号码", 130,false);
		this.ui_govlist.SetTitle(3, "等级", 90,false);
		this.ui_govlist.SetTitle(4, "人数", 140,false);
		this.ui_govlist.SetTitle(5, "帮主", 180,false);
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.govlist=null;
		this.iGovCount=-1;
		
		this.in_govni=new XInput(GmPlay.xani_ui);
		this.in_govni.sDetail="";
		this.in_govni.sBackPrompt="点击这里输入帮派号码或名称";
		this.in_govni.iBackSize=24;
		this.in_govni.iTextSize=30;
		
		this.btn_find=new XButtonEx2(GmPlay.xani_button);
		this.btn_find.InitButton("查找按钮60_60");
		
		this.btn_callmaster=new XButtonEx2(GmPlay.xani_button);
		this.btn_callmaster.InitButton("普通按钮195_55");
		this.btn_callmaster.sName="联系帮主";
		this.btn_applyall=new XButtonEx2(GmPlay.xani_button);
		this.btn_applyall.InitButton("普通按钮195_55");
		this.btn_applyall.sName="一键申请";
		this.btn_applyone=new XButtonEx2(GmPlay.xani_button);
		this.btn_applyone.InitButton("普通按钮195_55");
		this.btn_applyone.sName="申请加入";
		this.btn_creategov=new XButtonEx2(GmPlay.xani_button);
		this.btn_creategov.InitButton("普通按钮195_55");
		this.btn_creategov.sName="创建帮派";
		
		this.btn_getingov=new XButtonEx2(GmPlay.xani_button);
		this.btn_getingov.InitButton("普通按钮195_55");
		this.btn_getingov.sName="进入帮派";
		
		this.aa_applyed=GmPlay.xani_frame.InitAnimaWithName("选中勾a43_36", null);
		this.bApplyAll=false;
		
	}
	Draw()
	{
		var i;
		var offx,offy;
		var w,h;
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW,this.iH,"帮","派","列","表");
//		DrawMode.Frame3_BK(this.iX, this.iY, this.iW,this.iH,"申请入帮");
		this.btn_close.Draw();
		
		offx=this.iX+25;
		offy=this.iY+25;
		w=this.iW-50;
		h=this.iH-50;
		DrawMode.new_framein(offx, offy, w, h);
		
		offx+=20;offy+=20;
		this.ui_govlist.BeginDraw(offx,offy);
		for(i=0;i<this.iGovCount;i++)
		{
			this.ui_govlist.DrawUnit(0, i, ""+(i+1));
			
			if(this.ui_govlist.bShow(i) && this.govlist[i]!=null)
			{
//				this.ui_govlist.DrawUnit(2, i, ""+govlist[i].iGovId);
				if(this.govlist[i].iInitStat==0)
				{//获取信息
					this.govlist[i].iInitStat=1;
					GmProtocol.gi().s_NewGovOperate(1, this.govlist[i].iGovId, 0, 0,0,"");
				}
				else if(this.govlist[i].iInitStat==1)
				{//正在获取
					this.ui_govlist.DrawUnit(1, i, "获取中...");
				}
				else if(this.govlist[i].iInitStat==2)
				{//已获取显示
					if(this.govlist[i].bApplyed)this.ui_govlist.DrawUnitEx_Anima(0,i,this.aa_applyed,60,2);
					else if(this.bApplyAll)
					{
						GmProtocol.gi().s_ApplyForGov(this.govlist[i].iGovId);
						this.govlist[i].bApplyed=!this.govlist[i].bApplyed;
					}
					this.ui_govlist.DrawUnit(1, i, this.govlist[i].sGovName);
					this.ui_govlist.DrawUnit(2, i, ""+this.govlist[i].iGovId);
					this.ui_govlist.DrawUnit(3, i, ""+(this.govlist[i].iGovLev+1));
					this.ui_govlist.DrawUnit(4, i, this.govlist[i].iMemberCount+"/"+this.govlist[i].iMaxMemberCount);
					this.ui_govlist.DrawUnit(5, i, this.govlist[i].sMaster);
				}
			}
		}
		this.ui_govlist.FinishDraw();
		
		offx=this.iX+25+20;
		offy=this.iY+25+20+330+20;
		
		DrawMode.frame_type3("纯色b10_10",offx,offy,400,180,10,10);
		DrawMode.frame_type2("外边框a10_10",offx,offy,400,180,10,10);
		DrawMode.frame_type1("帮派宣言a20_44",offx+200-60,offy+20,120,20);
		M3DFast.gi().DrawTextEx(offx+200,offy+20+22, "帮派宣言", 0xff000000, 25, 101, 1, 1, 0, -2, -2);
		if(this.ui_govlist.iLockPoint>=0 && this.ui_govlist.iLockPoint<this.iGovCount)
		{//宣言
			i=this.ui_govlist.iLockPoint;
			if(this.govlist[i].iInitStat==2)
			{
				FormatString.gi().FormatEx("#c000000"+this.govlist[i].sDetail, 360, 20, 0, 0, 20);
				FormatString.gi().Draw(offx+20,offy+80);
			}
			
			this.btn_callmaster.bDisable=false;
			this.btn_applyone.bDisable=false;
			if(this.govlist[i].bApplyed)this.btn_applyone.sName="撤销申请";
			else this.btn_applyone.sName="申请加入";
			this.btn_getingov.bDisable=false;
		}
		else
		{
			this.btn_callmaster.bDisable=true;
			this.btn_applyone.bDisable=true;
			this.btn_getingov.bDisable=true;
		}
		
		offx+=400+20;
		this.in_govni.Move(offx,offy,300,47);
		DrawMode.frame_type1("输入框a20_47",offx,offy,300,20);
		this.in_govni.DrawText();
		this.btn_find.Move(offx+300+30, offy-(60-47)/2, 60, 60);
		this.btn_find.Draw();
		this.in_govni.onscr();
		
		offy+=47+20;
		this.btn_callmaster.Move(offx, offy, 195, 55);
		this.btn_callmaster.Draw();
		if(MyGov.mg.iRealGid==-1)
		{
			this.btn_applyall.Move(offx+205, offy, 195, 55);
			this.btn_applyall.Draw();
			this.btn_applyone.Move(offx, offy+60, 195, 55);
			this.btn_applyone.Draw();
			this.btn_creategov.Move(offx+205, offy+60, 195, 55);
			this.btn_creategov.Draw();
		}
		else
		{
			this.btn_getingov.Move(offx+205, offy, 195, 55);
			this.btn_getingov.Draw();
		}
		this.bApplyAll=false;
	}
	ProcTouch( msg, x, y)
	{
		if(this.ui_govlist.ProcTouch(msg, x, y))
		{
			return true;
		}
		if(this.in_govni.ProcTouch(msg, x, y))return true;
		

		
		if(this.btn_find.ProcTouch(msg, x, y))
		{
			if(this.btn_find.bCheck())
			{
				if(this.in_govni.sDetail.length>0)
				{
					GmProtocol.gi().s_NewGovOperate(0,0,0,0,0,this.in_govni.sDetail);
					GmProtocol.gi().s_NewGovOperate(2,0,0,0,0,"");
					this.ui_govlist.iLockPoint=-1;
				}
				else EasyMessage.easymsg.AddMessage("请先输入搜索内容");
			}
			return true;
		}
		if(this.ui_govlist.iLockPoint>=0 && this.ui_govlist.iLockPoint<this.iGovCount)
		{//宣言
			var i=this.ui_govlist.iLockPoint;
			if(this.btn_callmaster.ProcTouch(msg, x, y))
			{
				if(this.btn_callmaster.bCheck())
				{//联系帮主
					PrivateChat_Send.OpenChat( this.govlist[i].iMasterId, this.govlist[i].sMaster,6);
//					this.govlist[i].iMasterId;
				}
				return true;
			}
			if(MyGov.mg.iRealGid==-1)
			{
				if(this.btn_applyone.ProcTouch(msg, x, y))
				{
					if(this.btn_applyone.bCheck())
					{
						if(GmMe.me.rbs.iLev<20)FrameMessage.fm.Open("达到20级才能申请入帮");
						else
						{
							GmProtocol.gi().s_ApplyForGov(this.govlist[i].iGovId);
							this.govlist[i].bApplyed=!this.govlist[i].bApplyed;
						}
					}
					return true;
				}
			}
			else
			{
				if(this.btn_getingov.ProcTouch(msg, x, y))
				{
					if(this.btn_getingov.bCheck())
					{//根据id进入帮派
						XStat.gi().PopStat(1);
						GmProtocol.gi().s_GetIntoGov(this.govlist[i].iGovId);
					}
					return true;
				}
			}
		}
		if(MyGov.mg.iRealGid==-1)
		{
			if(this.btn_applyall.ProcTouch(msg, x, y))
			{
				if(this.btn_applyall.bCheck())
				{
					if(GmMe.me.rbs.iLev<20)FrameMessage.fm.Open("达到20级才能申请入帮");
					else this.bApplyAll=true;
				}
				return true;
			}
			if(this.btn_creategov.ProcTouch(msg, x, y))
			{
				if(this.btn_creategov.bCheck())
				{
					FrameMessage.fm.Open("集齐七国旗后可以找郢城的帮派总管创建帮派");
				}
				return true;
			}
		}
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		
		return false;
	}
}
ApplyForGov.Applyed=function( pls)
{
    var afg;
    afg=XStat.gi().FindStat(XStat.GS_APPLYFORGOV);
    if (afg!=null)
    {
        afg.ApplyedGovs(pls);
    }
}
ApplyForGov.Get=function( pls)
{
    var afg;
    afg=XStat.gi().FindStat(XStat.GS_APPLYFORGOV);
    if (afg!=null)
    {
        afg.GetGovDetail(pls);
    }
}
ApplyForGov.Open=function( pls)
{
    var afg;
    if (XStat.gi().iXStat != XStat.GS_APPLYFORGOV)afg= XStat.gi().PushStat(XStat.GS_APPLYFORGOV);
    else afg =  XStat.gi().LastStat(0);
    afg.GetIdList(pls);
}