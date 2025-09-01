
import PublicInterface from "../../zero/Interface/PublicInterface"
import MainMenu from "../../mgm/mainmenu/MainMenu"
import GmConfig from "../../config/GmConfig"
import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButton from "../../engine/control/XButton"
import XButtonEx1 from "../../engine/control/XButtonEx1"
import XButtonEx2 from "../../engine/control/XButtonEx2"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import XRecordFast from "../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"
import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate"
import CreateFuBen from "../../engtst/mgm/gameing/fuben/CreateFuBen"
import StarEffect from "./StarEffect"
import StartGame from "./StartGame"
import GameData from "../../config/GameData";

class _SEVERLIST
{/*
	public int iSeverId;
	public String sName;
	public int iStatus;//0维护，1正常，3爆满，5爆满无法进入
	public int this.iSectorId;
	public boolean bNew;
//	public int iTuiJian;//是否推荐
*/
}

export default class SelectSever extends BaseClass{

	constructor( ani)
	{
		super();
		 this.MAXSECTORCOUNT=10;
		 this.MAXSEVERCOUNT=10;
		this.iW=800;
		this.iH=480;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		this.sSectorName=new Array(this.MAXSECTORCOUNT);//
		this.iSectorId=new Int32Array(this.MAXSECTORCOUNT);//
		
		this.slist=new Array(this.MAXSEVERCOUNT);//
		this.tjlist=new Array(this.MAXSEVERCOUNT);//
		for(i=0;i<this.MAXSEVERCOUNT;i++)
		{
			this.slist[i]=new _SEVERLIST();
			this.tjlist[i]=new _SEVERLIST();
		}
		this.iSeverCount=0;
		this.iSectorCount=0;
		this.iCurrentSectorId=0;
		
		this.btn_sector=new Array(this.MAXSECTORCOUNT);//
		for(i=0;i<this.MAXSECTORCOUNT;i++)
		{
			this.btn_sector[i]=new XButtonEx2(GmPlay.xani_nui1);
			this.btn_sector[i].InitButton("选区按钮1");
			this.btn_sector[i].sName="";
			this.btn_sector[i].Move(GmConfig.OX+200, 270+i*73, 183, 54);
		}
		
		this.btn_sever=new Array(this.MAXSEVERCOUNT);//
		this.btn_tj=new Array(this.MAXSEVERCOUNT);//
		for(i=0;i<this.MAXSEVERCOUNT;i++)
		{
			this.btn_sever[i]=new XButtonEx2(GmPlay.xani_nui1);
			this.btn_sever[i].InitButton("选服按钮2");
			this.btn_sever[i].sName="";
			this.btn_sever[i].Move(GmConfig.OX+457+(i%3)*220,253+parseInt(i/3)*86, 178, 51);
			
			this.btn_tj[i]=new XButtonEx2(GmPlay.xani_nui1);
			this.btn_tj[i].InitButton("选服按钮2");
			this.btn_tj[i].sName="";
			this.btn_tj[i].Move(GmConfig.OX+457+(i%3)*220,112+(i/3)*86, 178, 51);
		}
		
		this.btn_create=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_create.InitButton("确定服务器");
		this.btn_create.Move(GmConfig.SCRW-126-25, 576, 126, 128);
		
		this.btn_back=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_back.InitButton("返回按钮");
		this.btn_back.Move(25, 576, 126, 128);
		
		this.se=new StarEffect();
		this.se.Init1(0, 0, 178, 50, 100);
	}

	InitSeverList( pls)
	{
		var i,j;
		this.iCurrentSectorId=pls.GetNextInt();//区号
		this.iSectorCount=pls.GetNextByte();//区数量
		for(i=0;i<this.iSectorCount;i++)
		{//区列表
			this.sSectorName[i]=pls.GetNextString();
			this.iSectorId[i]=pls.GetNextInt();
			this.btn_sector[i].bMouseIn=false;
			this.btn_sector[i].bMouseDown=false;
			this.btn_sector[i].sName=this.sSectorName[i];
//			GmPlay.sop(""+this.sSectorName[i]);
		}
		/////////////服务器列表
		this.iCurrentSeverId=-1;
		for(i=0;i<100;i++)
		{
			j=pls.GetNextByte();
			if(j!=1)break;
			this.slist[i].sName=pls.GetNextString();
			this.slist[i].iSeverId=pls.GetNextInt();
			this.slist[i].iStatus=pls.GetNextByte();
//			this.slist[i].iTuiJian=pls.GetNextByte();
			this.btn_sever[i].sName=this.slist[i].sName;
			switch(this.slist[i].iStatus)
			{
			case 0://维护
			default://其他异常状态
				this.btn_sever[i].InitButton("选服按钮a");
				break;
			case 1://良好
				this.btn_sever[i].InitButton("选服按钮b");
				break;
			case 2://繁忙
				this.btn_sever[i].InitButton("选服按钮c");
				break;
			case 3://火爆
			case 5://火爆到无法进入
				this.btn_sever[i].InitButton("选服按钮d");
				break;
			}
			if(this.slist[i].iSeverId==XRecordFast.iLastSever)this.iCurrentSeverId=XRecordFast.iLastSever;
			this.slist[i].bNew=false;
		}
		this.iSeverCount=i;
		if(this.iCurrentSeverId==-1 && this.iSeverCount>0)this.iCurrentSeverId=this.slist[0].iSeverId;
		///////////推荐服列表
		for(i=0;i<100;i++)
		{
			j=pls.GetNextByte();
			if(j!=2)break;
			this.tjlist[i].sName=pls.GetNextString();
			this.tjlist[i].iSectorId=pls.GetNextInt();
			this.tjlist[i].iSeverId=pls.GetNextInt();
			this.tjlist[i].iStatus=pls.GetNextByte();
//			this.slist[i].iTuiJian=pls.GetNextByte();
			this.btn_tj[i].sName=this.tjlist[i].sName;
			switch(this.tjlist[i].iStatus)
			{
			case 0://维护
			default://其他异常状态
				this.btn_tj[i].InitButton("选服按钮a");
				break;
			case 1://良好
				this.btn_tj[i].InitButton("选服按钮b");
				break;
			case 2://繁忙
				this.btn_tj[i].InitButton("选服按钮c");
				break;
			case 3://火爆
			case 5://火爆到无法进入
				this.btn_tj[i].InitButton("选服按钮d");
				break;
			}
			if(this.tjlist[i].iSeverId==XRecordFast.iLastSever)this.iCurrentSeverId=XRecordFast.iLastSever;
		}
		this.iTJCount=i;
		
//		GmPlay.sop(":=============");
		var k;
		for(i=0;i<100;i++)
		{
			j=pls.GetNextByte();
//			GmPlay.sop(":============="+j);
			if(j!=3)break;
			k=pls.GetNextInt();//iSeverId
			for(j=0;j<this.iSeverCount;j++)
			{
				if(this.slist[j].iSeverId==k)
				{
					this.slist[j].bNew=true;
					break;
				}
			}
		}
//		GmPlay.sop("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz="+this.iCurrentSectorId+"?="+this.iSectorId[0]);
	}
	Draw()
	{
		var i,j;
		StartGame.drawback(true);
		
		DrawMode.local_frame2((GmConfig.SCRW-950)/2, (GmConfig.SCRH-560)/2, 950, 560);
		
		GmPlay.xani_nui1.DrawAnimaEx(GmConfig.OX+640, 80, "背景框2", 8, 101, 1, 1, 0, 0, 0);
		
		GmPlay.xani_nui1.DrawAnimaEx(GmConfig.OX+300,137, "推荐区标题", 0, 101, 1, 1, 0, 0, 0);
		
		GmPlay.xani_local.DrawAnimaEx(GmConfig.OX+140, 210, "分隔条", 0,101,1.0*1000/400,1,0,0,0);
		GmPlay.xani_local.DrawAnimaEx(GmConfig.OX+420, 210, "分隔条", 0,101,1,1,90,GmConfig.OX+420, 210);
		for(i=-6;i<6;i++)GmPlay.xani_nui1.DrawAnimaEx(GmConfig.OX+640+76*i, 180, "底纹", 0, 101, 1, 1, 0, 0, 0);
		
		GmPlay.xani_local.DrawAnimaEx(GmConfig.OX+291, 239, "方向指引", 0,101,1,1,0,0, 0);
		GmPlay.xani_local.DrawAnimaEx(GmConfig.OX+291, 586, "方向指引", 0,101,1,1,180,-1, -1);
		for(i=0;i<this.iSectorCount;i++)
		{
			if(this.iSectorId[i]==this.iCurrentSectorId)
			{
				GmPlay.xani_nui1.DrawAnimaEx(this.btn_sector[i].iX, this.btn_sector[i].iY, "选区按钮2", 0, 101, 1, 1, 0, 0, 0);
				this.btn_sector[i].DrawText(0,0);
			}
			else this.btn_sector[i].Draw();
		}
		this.se.Logic();
		for(i=0;i<this.iSeverCount;i++)
		{
			this.btn_sever[i].Draw();
			if(this.slist[i].iSeverId==this.iCurrentSeverId)
			{//画选中效果框
				this.se.Draw(this.btn_sever[i].iX-20, this.btn_sever[i].iY);
			}
			if(this.slist[i].bNew)
			{//画新服标记
				GmPlay.xani_nui4.DrawAnima(this.btn_sever[i].iX+160-44+15, this.btn_sever[i].iY-15, "新服提示",0);
			}
		}
		for(i=0;i<this.iTJCount;i++)
		{
			this.btn_tj[i].Draw();
			if(this.tjlist[i].iSeverId==this.iCurrentSeverId)
			{//画选中效果框
				this.se.Draw(this.btn_tj[i].iX-20, this.btn_tj[i].iY);
			}
		}
		
		i=GmConfig.OX+560;j=580;
		GmPlay.xani_nui1.DrawAnimaEx(i, j, "状态说明", 0,101,1,1,0,0, 0);
		GmPlay.xani_nui1.DrawAnimaEx(i+30, j+16, "状态说明", 1,101,1,1,0,0, 0);
		M3DFast.gi().DrawTextEx(i+50, j+16, "维护", 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
		i+=124;
		GmPlay.xani_nui1.DrawAnimaEx(i+30, j+16, "状态说明", 2,101,1,1,0,0, 0);
		M3DFast.gi().DrawTextEx(i+50, j+16, "良好", 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
		i+=124;
		GmPlay.xani_nui1.DrawAnimaEx(i+30, j+16, "状态说明", 3,101,1,1,0,0, 0);
		M3DFast.gi().DrawTextEx(i+50, j+16, "繁忙", 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
		i+=124;
		GmPlay.xani_nui1.DrawAnimaEx(i+30, j+16, "状态说明", 4,101,1,1,0,0, 0);
		M3DFast.gi().DrawTextEx(i+50, j+16, "火爆", 0xffffffff, 20, 101, 1, 1, 0, 0, -2);

		this.btn_create.Draw();
		this.btn_back.Draw();

		
		if(GameData.bAutoGetInForDebug)
		{
			this.iCurrentSeverId=this.slist[1].iSeverId;
			GmProtocol.gi().s_GetRoleList(this.iCurrentSectorId,this.iCurrentSeverId);
			XStat.gi().PushStat(XStat.GS_LOADING1);
		}
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{//选择了服务器进入
				for(i=0;i<this.iSeverCount;i++)
				{
					if(this.iCurrentSeverId==this.slist[i].iSeverId)
					{
						if(this.slist[i].iStatus==0)EasyMessage.easymsg.AddMessage("服务器维护中，不能进入");
						else
						{//根据所选服务器，获取角色列表
							GmProtocol.gi().s_GetRoleList(this.iCurrentSectorId,this.iCurrentSeverId);
							XStat.gi().PushStat(XStat.GS_LOADING1);
							return true;
						}
					}
				}
				for(i=0;i<this.iTJCount;i++)
				{
					if(this.iCurrentSeverId==this.tjlist[i].iSeverId)
					{
						if(this.tjlist[i].iStatus==0)EasyMessage.easymsg.AddMessage("服务器维护中，不能进入");
						else
						{//根据所选服务器，获取角色列表
							GmProtocol.gi().s_GetRoleList(this.tjlist[i].iSectorId,this.iCurrentSeverId);
							XStat.gi().PushStat(XStat.GS_LOADING1);
							return true;
						}
					}
				}
				EasyMessage.easymsg.AddMessage("请先选中服务器");
			}
			return true;
		}
		if(this.btn_back.ProcTouch(msg, x, y))
		{
			if(this.btn_back.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<this.iSectorCount;i++)
		{
			if(this.btn_sector[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sector[i].bCheck())
				{//换区
					if(this.iSectorId[i]!=this.iCurrentSectorId)
					{
						XStat.gi().PushStat(XStat.GS_LOADING1);
						GmProtocol.gi().s_GetSeverList(this.iSectorId[i]);
					}
				}
			}
		}
		for(i=0;i<this.iSeverCount;i++)
		{
			if(this.btn_sever[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sever[i].bCheck())
				{//选择了某个服务器，进入创建角色
					this.iCurrentSeverId=this.slist[i].iSeverId;
				}
			}
		}
		for(i=0;i<this.iTJCount;i++)
		{
			if(this.btn_tj[i].ProcTouch(msg, x, y))
			{
				if(this.btn_tj[i].bCheck())
				{//选择了某个服务器，进入创建角色
					this.iCurrentSeverId=this.tjlist[i].iSeverId;
				}
			}
		}
		return false;
	}
}
SelectSever.Open=function( pls)
{
	var ss;
	while(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
	if(XStat.gi().iXStat==XStat.GS_LEADPAGE)XStat.gi().PopStat(1);
	if(XStat.gi().iXStat==XStat.GS_SELECTSEVER)ss=XStat.gi().LastStat(0);
	else ss=XStat.gi().PushStat(XStat.GS_SELECTSEVER);
	
	ss.InitSeverList(pls);
}