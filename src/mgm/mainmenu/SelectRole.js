
import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButton from "../../engine/control/XButton"
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
		
		this.posX[0] = 84; this.posY[0] = 325;
		this.posX[1] = 210; this.posY[1] = 265;
		this.posX[2] = 310; this.posY[2] = 367;
		this.posX[3] = 410; this.posY[3] = 265;
		this.posX[4] = 540; this.posY[4] = 325;
		
		
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
		
		this.btn_changesever=new XButton(GmPlay.xani_ui3);
		this.btn_changesever.InitButton("切换图标");
		
		this.btn_cs=new XButton(GmPlay.xani_ui3);
		this.btn_cs.InitButton("已选服务器背景条");
		
		this.InitBtns();
	}
	
	InitBtns()
	{
		var i;
		for(i=0;i<this.iRoleCount;i++)
		{
			this.btn_select[i].sName="";
			this.btn_select[i].Move(GmConfig.SCRW/2-200, 20+i*90, 400, 80);
		}
		this.btn_select[i].sName="创建角色";
		this.btn_select[i].Move(GmConfig.SCRW/2-200, 20+i*90, 400, 80);
		
		this.btn_changesever.Move(400+250-20, 37, 35, 35);
		this.btn_changesever.sName="";
		this.btn_changesever.iNameSize=20;
//		GmConfig.SCRW/2-508/2-20, 20+100+i*70+30, 
		this.btn_cs.Move(GmConfig.SCRW/2-508/2-20, 30,508, 47);
		this.btn_cs.iNameSize=26;
	}
	Draw()
	{
		var i;
		var bw,bh;
		
		MainMenu.dpics(2);
//		this.pm3f.FillRect_2D(0, 0, this.pm3f.imf.SCRW, this.pm3f.imf.SCRH, 0xff000000);
//		GmPlay.xani_back.DrawAnimaEx(0, 0, "大背景", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
//		this.pm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0x50000000);

		this.btn_cs.sName=this.sSectorName+"        —        "+this.sSeverName;
		this.btn_cs.Draw();
//		GmPlay.xani_ui3.DrawAnimaEx(400-254-20, 30, "已选服务器背景条", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
//		this.pm3f.DrawTextEx(400-254+140, 53, this.sSectorName, 0xffffffff, 26, 101, 1, 1, 0, -2, -2);
//		this.pm3f.DrawTextEx(400-254+140+70+20, 57, "—", 0xffffffff, 26, 101, 1, 1, 0, -2, -2);
//		this.pm3f.DrawTextEx(400-254+140+150+40, 53, this.sSeverName, 0xffffffff, 26, 101, 1, 1, 0, -2, -2);
		
		bw=120;

		for(i=0;i<5;i++)
		{
			GmPlay.xani_ui3.DrawAnimaEx(this.posX[i], this.posY[i], "莲花座", 0, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);

			this.btn_select[i].Move(this.posX[i]+70-bw/2, 100, bw, GmConfig.SCRH-100);
//			M3DFast.gi().DrawRect_2D(this.btn_select[i].iX,this.btn_select[i].iY,this.btn_select[i].iX+this.btn_select[i].iW,this.btn_select[i].iY+this.btn_select[i].iH, 0xffffffff);
			if(i<this.iRoleCount)
			{
				this.rlist[i].xani.DrawAnima_aa(this.posX[i]+70, this.posY[i]+25, this.rlist[i].aa);
				this.rlist[i].xani.NextFrame(this.rlist[i].aa);
				
//				this.pm3f.DrawTextEx(ox+bw/2+i*(bw+10), oy-60, this.rlist[i].sSectorName, 0xffffffff, 30, 101, 1, 1, 0, -2, 0);
//				if(this.rlist[i].iStat==0)
//					this.pm3f.DrawTextEx(this.posX[i], this.posY[i], "维护中", 0xffff0000, 30, 101, 1, 1, 0, -2, -2);
//				else 
//					this.pm3f.DrawTextEx(this.posX[i], this.posY[i]+30, this.rlist[i].sSeverName, 0xff00ff00, 30, 101, 1, 1, 0, -2, -2);
				
				GmPlay.xani_ui3.DrawAnimaEx(this.posX[i]+2, this.posY[i]-120, "角色名背景框", 0, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
				this.pm3f.DrawTextEx(this.posX[i]+70, this.posY[i] - 105, this.rlist[i].sName, 0xff00ff00, 20, 101, 1, 1, 0, -2, -2);
			}
			else
			{
//				this.pm3f.DrawTextEx(ox+bw/2+i*(bw+10), oy+bh/2, "创建", 0xff00ff00, 30, 101, 1, 1, 0, -2, -2);
			}
		}
		this.btn_changesever.Draw();
/*		for(i=0;i<this.iRoleCount+1;i++)
		{
			this.btn_select[i].Draw();
			if(i<this.iRoleCount)
			{
				this.pm3f.DrawText(this.btn_select[i].iX+5+50, this.btn_select[i].iY+5, this.rlist[i].sName+"(ID:"+this.rlist[i].iRid+")", 0xffffffff);
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
		if(this.btn_changesever.ProcTouch(msg, x, y))
		{
			if(this.btn_changesever.bCheck())
			{
				GmProtocol.gi().s_GetSeverList(XRecordFast.iLastSector);
				XStat.gi().PushStat(XStat.GS_LOADING1);
			}
			return true;
		}
		if(this.btn_cs.ProcTouch(msg, x, y))
		{
			if(this.btn_cs.bCheck())
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
						{
							XStat.gi().PushStat(XStat.GS_LOADING1);
							GmProtocol.gi().s_StartGame(this.rlist[i].iRid);
							GmMe.me.iSex=this.rlist[i].iSex;
							GmMe.me.iRace=this.rlist[i].iRace;
							GmMe.me.bsc=true;
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
			
			sr.rlist[i].xani=GmPlay.xani_newrole[sr.rlist[i].iRace*2+sr.rlist[i].iSex];
			GmPlay.sop("psr.rlist[i].iRace*2+psr.rlist[i].iSex="+(sr.rlist[i].iRace*2+sr.rlist[i].iSex));
			sr.rlist[i].xani.InitAnimaWithName("站立_下", sr.rlist[i].aa);
			
			sr.rlist[i].iStat=1;
//			ts1=pls.GetNextString();
//			ts2=pls.GetNextString();
//			sr.rlist[i].sSectorName=pls.GetNextString();//区名称
//			sr.rlist[i].iStat=pls.GetNextByte();//服务器状态，0维护中，1正常
//			sr.rlist[i].sSeverName=pls.GetNextString();//服务器名称
//			psr.rlist[i].sSs=ts1+","+ts2;
			pls.GetNextByte();//busy
		}
		sr.InitBtns();
	}