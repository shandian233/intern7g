
import MainMenu from "../../mgm/mainmenu/MainMenu"
import _ROLELIST from "../../mgm/mainmenu/_ROLELIST"
import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButton from "../../engine/control/XButton"
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
import GmMe from "../../engtst/mgm/gameing/me/GmMe"
import StarEffect from "./StarEffect"
import StartGame from "./StartGame"

export default class SelectRole extends BaseClass{
	
	constructor( ani)
	{
		super();
		this.MAXROLECOUNT=6;
		this.posX = new Int32Array(5);
		this.posY = new Int32Array(5);

		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.posX[0] = 130; this.posY[0] = 480;
		this.posX[1] = 330; this.posY[1] = 380;
		this.posX[2] = 530; this.posY[2] = 480;
		this.posX[3] = 730; this.posY[3] = 380;
		this.posX[4] = 930; this.posY[4] = 480;
		
		
		this.rlist=new Array(this.MAXROLECOUNT);//
		for(i=0;i<this.MAXROLECOUNT;i++)
		{
			this.rlist[i]=new _ROLELIST(); 
		}
		
		this.btn_select=new Array(this.MAXROLECOUNT+1);//
		for(i=0;i<this.MAXROLECOUNT+1;i++)
		{
			this.btn_select[i]=new XButton(ani);
			this.btn_select[i].bSingleButton=true;
			this.btn_select[i].sName="";
//			this.btn_select[i].Move(this.pm3f.imf.SCRW/2-200, 20+i*90, 400, 80);
		}
		this.iRoleCount=0;
		
		this.btn_changesever=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_changesever.InitButton("选服按钮");
		this.btn_changesever.sName="选择服务器";
		this.btn_changesever.Move(GmConfig.OX+919, 50, 183, 54);
		
		this.btn_createrole=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_createrole.InitButton("选服按钮");
		this.btn_createrole.sName="创建角色";
		this.btn_createrole.Move(GmConfig.OX+1057, 299, 183, 54);
		
		this.btn_startgame=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_startgame.InitButton("选服按钮");
		this.btn_startgame.sName="进入游戏";
		this.btn_startgame.Move(GmConfig.OX+1057, 391, 183, 54);
		
		this.se=new StarEffect();
		this.se.Init2(0, 0, 80, 50);

		this.iSelectRolePoint=0;
	}
	

	Draw()
	{
		StartGame.drawback(true);
		M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0x50000000);
		GmPlay.xani_nui1.DrawAnima(GmConfig.OX+186, 47, "区服条",0);
		M3DFast.gi().DrawTextEx(GmConfig.OX+380, 74, this.sSectorName, 0xffffffff, SystemOperate.WordSize(30), 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(GmConfig.OX+700, 74, this.sSeverName, 0xffffffff, SystemOperate.WordSize(30), 101, 1, 1, 0, -2, -2);
		
		this.btn_changesever.Draw();
		
		DrawMode.local_frame1(GmConfig.OX+1046, 262, 207, 219);
		this.btn_createrole.Draw();
		this.btn_startgame.Draw();
		var i;

		for(i=0;i<5;i++)
		{
			GmPlay.xani_nui1.DrawAnimaEx(GmConfig.OX+this.posX[i], this.posY[i], "站台", 0, 101, 1.0, 1.0, 0, 0, 0);
			if(this.iSelectRolePoint==i)
			{
				GmPlay.xani_nui1.DrawAnimaEx(GmConfig.OX+this.posX[i], this.posY[i], "选中角色底", GmPlay.iDelay, 101, 1.0, 1.0, 0, 0, 0);
				this.se.Draw(GmConfig.OX+this.posX[i], this.posY[i]);
			}
			this.btn_select[i].Move(GmConfig.OX+this.posX[i]-120/2, this.posY[i]-250, 120, 300);
			if(i<this.iRoleCount)
			{
				this.rlist[i].aa.Draw(GmConfig.OX+this.posX[i], this.posY[i]);
				this.rlist[i].aa.NextFrame();
//				this.rlist[i].xani.DrawAnimaEx(this.posX[i], this.posY[i], this.rlist[i].aa,101,2,2,0,0,0);
//				this.rlist[i].xani.NextFrame(this.rlist[i].aa);
				
				GmPlay.xani_nui1.DrawAnimaEx(GmConfig.OX+this.posX[i], this.posY[i]-250, "名字框", 0, 101, 1.0, 1.0, 0, 0, 0);
				this.pm3f.DrawTextEx(GmConfig.OX+this.posX[i], this.posY[i]-250, this.rlist[i].sName, 0xffffffff, SystemOperate.WordSize(30), 101, 1, 1, 0, -2, -2);
			}
			if(this.iSelectRolePoint==i)
			{
				this.se.DrawFront(GmConfig.OX+this.posX[i], this.posY[i]);
			}
		}
		
/*		for(i=0;i<this.iRoleCount+1;i++)
		{
			this.btn_select[i].Draw();
			if(i<this.iRoleCount)
			{
				this.pm3f.DrawText(this.btn_select[i].iX+5+50, this.btn_select[i].iY+5, this.rlist[i].sName+"(号码:"+this.rlist[i].iRid+")", 0xffffffff);
				this.pm3f.DrawText(this.btn_select[i].iX+5+50, this.btn_select[i].iY+5+30, this.rlist[i].sSs, 0xffffffff);
			}
		}*/
		if(GameData.bAutoGetInForDebug)
		{
			XStat.gi().PopStat(1);
			XStat.gi().PushStat(XStat.GS_LOADING1);
			GmProtocol.gi().s_StartGame(this.rlist[0].iRid);
			GmMe.me.iSex=this.rlist[0].iSex;
			GmMe.me.iRace=this.rlist[0].iRace;
			GmMe.me.bsc=true;
		}
	}
	
	ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_createrole.ProcTouch(msg, x, y))
		{
			if(this.btn_createrole.bCheck())
			{
				if(this.iRoleCount>=5)EasyMessage.easymsg.AddMessage("最多创建5个角色");
				else XStat.gi().PushStat(XStat.GS_CREATEROLE);
			}
			return true;
		}
		if(this.btn_startgame.ProcTouch(msg, x, y))
		{
			if(this.btn_startgame.bCheck())
			{
				if(this.iRoleCount<=0)EasyMessage.easymsg.AddMessage("请先创建角色");
				else if(this.iSelectRolePoint<0 || this.iSelectRolePoint>=this.iRoleCount)EasyMessage.easymsg.AddMessage("请先选择角色");
				else
				{
					XStat.gi().PushStat(XStat.GS_LOADING1);
					GmProtocol.gi().s_StartGame(this.rlist[this.iSelectRolePoint].iRid);
					GmMe.me.iSex=this.rlist[this.iSelectRolePoint].iSex;
					GmMe.me.iRace=this.rlist[this.iSelectRolePoint].iRace;
					GmMe.me.bsc=true;
				}
			}
			return true;
		}
		if(this.btn_changesever.ProcTouch(msg, x, y))
		{
			if(this.btn_changesever.bCheck())
			{
				GmProtocol.gi().s_GetSeverList(XRecordFast.iLastSector);
				XStat.gi().PushStat(XStat.GS_LOADING1);
			}
			return true;
		}
		for(i=0;i<5;i++)
		{
			if(this.btn_select[i].ProcTouch(msg, x, y))
			{
				if(this.btn_select[i].bCheck())
				{
					if(i<this.iRoleCount)
					{//选择了角色,开始游戏
						if(this.rlist[i].iStat==0)
						{
							EasyMessage.easymsg.AddMessage("服务器维护中,进入失败");
						}
						else
						{/*
							XStat.gi().PushStat(XStat.GS_LOADING1);
							GmProtocol.gi().s_StartGame(this.rlist[i].iRid);
							engtst.mgm.gameing.me.GmMe.me.iSex=this.rlist[i].iSex;
							engtst.mgm.gameing.me.GmMe.me.iRace=this.rlist[i].iRace;
							engtst.mgm.gameing.me.GmMe.me.bsc=true;*/
							if(this.iSelectRolePoint==i)
							{
								XStat.gi().PushStat(XStat.GS_LOADING1);
								GmProtocol.gi().s_StartGame(this.rlist[this.iSelectRolePoint].iRid);
								GmMe.me.iSex=this.rlist[this.iSelectRolePoint].iSex;
								GmMe.me.iRace=this.rlist[this.iSelectRolePoint].iRace;
								GmMe.me.bsc=true;
							}
							else this.iSelectRolePoint=i;
						}
					}
					else if(i>=this.iRoleCount)
					{//新建角色
						XStat.gi().PushStat(XStat.GS_CREATEROLE);
	//					XStat.gi().PushStat(XStat.GS_SELECTSEVER);
	//					XStat.gi().PushStat(XStat.GS_LOADING1);
	//					GmProtocol.gi().s_GetSeverList(0);
					}
					return true;
				}
			}
		}
		return false;
	}
}

SelectRole.Open=function( pls)
	{
		var i;
		var sr;
		while(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
		while(XStat.gi().iXStat==XStat.GS_SELECTSEVER)XStat.gi().PopStat(1);
		if(XStat.gi().iXStat==XStat.GS_SELECTROLE)sr=XStat.gi().LastStat(0);
		else sr=XStat.gi().PushStat(XStat.GS_SELECTROLE);
		
		sr.iSectorId=pls.GetNextInt();
		sr.sSectorName=pls.GetNextString();
		sr.iSeverId=pls.GetNextInt();
		sr.sSeverName=pls.GetNextString();
		
		XRecordFast.iHaveSeverRecord=1;
		XRecordFast.iLastSector=sr.iSectorId;
		XRecordFast.iLastSever=sr.iSeverId;
		
		sr.iRoleCount=pls.GetNextByte();
		for(i=0;i<sr.iRoleCount;i++)
		{//
			sr.rlist[i].iRid=pls.GetNextInt();
			
			sr.rlist[i].sName=pls.GetNextString();
			sr.rlist[i].iSex=pls.GetNextByte();
			sr.rlist[i].iRace=pls.GetNextByte();//种族
			
//			sr.rlist[i].xani=GmPlay.xani_role[sr.rlist[i].iRace*2+sr.rlist[i].iSex];
//			GmPlay.sop("psr.rlist[i].iRace*2+psr.rlist[i].iSex="+(sr.rlist[i].iRace*2+sr.rlist[i].iSex));
//			sr.rlist[i].xani.InitAnimaWithName("站立_下", sr.rlist[i].aa);
			
			sr.rlist[i].aa=GmPlay.xani_nui1.InitAnimaWithName("展示"+(sr.rlist[i].iRace*2+sr.rlist[i].iSex), null);
//			sr.rlist[i].aa=GmPlay.xani_newrole[sr.rlist[i].iRace*2+sr.rlist[i].iSex].InitAnimaWithName("站立_下", null);
			
			sr.rlist[i].iStat=1;
//			ts1=pls.GetNextString();
//			ts2=pls.GetNextString();
//			sr.rlist[i].sSectorName=pls.GetNextString();//区名称
//			sr.rlist[i].iStat=pls.GetNextByte();//服务器状态，0维护中，1正常
//			sr.rlist[i].sSeverName=pls.GetNextString();//服务器名称
//			psr.rlist[i].sSs=ts1+","+ts2;
			pls.GetNextByte();//busy
		}
		if(sr.iRoleCount<=0)sr.iSelectRolePoint=-1;
		else sr.iSelectRolePoint=0;
	}
