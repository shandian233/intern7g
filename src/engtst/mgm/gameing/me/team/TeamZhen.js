
import DrawBuffer from "../../../../../map/DrawBuffer"
import MapManager from "../../../../../map/MapManager"
import StarEffect from "../../../../../mgm/newmainmenu/StarEffect"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import SortAnima from "../../../../../config/SortAnima"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import NearRole from "../../../../../engtst/mgm/gameing/NearRole"
import PromptActivity from "../../../../../engtst/mgm/gameing/help/ang/PromptActivity"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

import MyTeam from "./MyTeam"

export default class TeamZhen extends BaseClass{

	constructor( ani)
	{
		super();
		var i,j;
		
		this.iW=900;
		this.iH=600;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_zhen=new Array(8);//
		for(i=0;i<6;i++)
		{
			this.btn_zhen[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_zhen[i].InitButton("按钮2_121");
			this.btn_zhen[i].sName=TeamZhen._ZHEN[i+1][0];
		}
		
		this.se=new StarEffect();
		this.se.Init1(0, 0, 120, 48, 50);
		
		this.aa_body=new Array(5);//
		this.aa_weapon=new Array(5);//
		this.aa_cls=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.aa_body[i]=null;
			this.aa_weapon[i]=null;
			this.aa_cls[i]=new Array(5);
			for(j=0;j<5;j++)this.aa_cls[i][j]=new AnimaAction();
		}
		this.aa_add=GmPlay.xani_nui2.InitAnimaWithName("增减提示", null);
		
		this.poslist=new Array(5);//
		for(i=0;i<5;i++)this.poslist[i]=new Int32Array(2);
		this.iLockPos=-1;
		
		this.btn_ts=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_ts.InitButton("感叹提示");
		this.btn_ts.Move(this.iX+this.iW-120, this.iY+this.iH-120, 65, 65);
		
		this.bShowKe=false;
	}

	Draw()
	{
		var i,j,k;
		var offx,offy;
		
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "阵", "法");
		this.btn_close.Draw();
		
		DrawMode.new_framein(this.iX+25, this.iY+25, 150, this.iH-50);
		for(i=0;i<6;i++)
		{
			if((GmMe.me.iFlag[14]&(1<<i))==0 || !MyTeam.bTeamLeader())
			{//没有此阵，不是队长
				this.btn_zhen[i].bDisable=true;
			}
			if(GmMe.iTeamZhen==i)
			{
				this.btn_zhen[i].bMouseDown=true;
				this.btn_zhen[i].bMouseIn=true;
			}
			this.btn_zhen[i].Move(this.iX+25+15, this.iY+25+15+(48+15)*i, 121, 48);
			this.btn_zhen[i].Draw();
			if(GmMe.iTeamZhen==i)
			{
				this.se.Logic();
				this.se.Draw(this.iX+25+15, this.iY+25+15+(48+15)*i);
			}
		}
		
		offx=this.iX+300;
		offy=this.iY+360;
		DrawMode.new_framein(this.iX+25+150+25, this.iY+25, this.iW-150-75, this.iH-50);

		for(j=0;j<3;j++)
		{
			for(i=0;i<5;i++)
			{
				offx=this.iX+300+80*i+80*j;
				offy=this.iY+360-60*i+60*j;
				if(TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]>0)
				{
					if(TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]==1)GmPlay.xani_nui2.DrawAnima(offx, offy, "地上格子",1);
					else if(TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]>1)GmPlay.xani_nui2.DrawAnima(offx, offy, "地上格子",2);
					
					this.poslist[TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]-1][0]=offx;
					this.poslist[TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]-1][1]=offy;
				}
				else GmPlay.xani_nui2.DrawAnima(offx, offy, "地上格子",0);
				
//				M3DFast.gi().DrawTextEx(offx, offy, ""+i+","+j, 0xffffffff, 50, 101, 1, 1, 0, 0, 0);
			}
		}
		if(this.iLockPos>0)
		{
			GmPlay.xani_nui2.DrawAnima(this.poslist[this.iLockPos][0],this.poslist[this.iLockPos][1], "地上格子",3);
		}
		DrawBuffer.gi().ClearBuffer();
		for(j=0;j<3;j++)
		{
			for(i=0;i<5;i++)
			{
				offx=this.iX+300+80*i+80*j;
				offy=this.iY+360-60*i+60*j;
				if(TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]>0)
				{
					//画点上的人
					this.Draw_role(offx,offy,TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]-1);
					//画对应位置的加成
					//Draw_add(offx,offy,TeamZhen._ZHENSTAND[GmMe.iTeamZhen][j][i]-1);
				}
				
//				M3DFast.gi().DrawTextEx(offx, offy, ""+i+","+j, 0xffffffff, 50, 101, 1, 1, 0, 0, 0);
			}
		}
		DrawBuffer.gi().SortAndDraw();

		if(!MyTeam.bFullTeam())M3DFast.gi().DrawTextEx(this.iX+25+150+25+25, this.iY+this.iH-60, "提示：组满5人阵型才会生效", 0xffff0000, 20, 101, 1, 1, 0, 0, 0);
		else M3DFast.gi().DrawTextEx(this.iX+25+150+25+25, this.iY+this.iH-60, "提示：队长点击格子可交换队员位置", 0xffff0000, 20, 101, 1, 1, 0, 0, 0);

//		M3DFast.gi().DrawTextEx(this.iX+this.iW, this.iY+this.iH-60, "提示：队长点击格子可交换队员位置", 0xffff0000, 20, 101, 1, 1, 0, 0, 0);
		this.btn_ts.Draw();
		
		if(this.bShowKe)
		{
			offx=this.iX+this.iW-120-7*80+30;
			offy=this.iY+this.iH-120-7*30+30;
			M3DFast.gi().FillRect_2D(offx, offy, offx+7*80, offy+7*30, 0xa0000000);
			
			M3DFast.gi().FillRect_2D(offx, offy+GmMe.iTeamZhen*30+30, offx+7*80, offy+GmMe.iTeamZhen*30+60, 0xa0ff0000);
			for(i=0;i<7;i++)
			{
				for(j=0;j<7;j++)
				{
					M3DFast.gi().DrawTextEx(offx+i*80+40, offy+j*30+15, TeamZhen._ZHEN[j][i], 0xffffffff, 20, 101, 1, 1, 0, -2,-2);
				}
			}
		}
	}

	Draw_role( offx, offy, i)
	{//增减提示
		var j;
		var xb;
		var nr;
		if(MyTeam.iTmpTeamRid[i]==Gameing.gameing.me.iRid)
		{//自己
			xb=GmMe.me.iRace*2+GmMe.me.iSex;
			DrawBuffer.gi().BeginGroup();
			FireworksEffect.DrawAura(0,offx, offy,DrawBuffer.gi(),offy);
			if(this.aa_body[i]==null)
			{
				this.aa_body[i]=GmPlay.xani_newrole[GmMe.me.iRace*2+GmMe.me.iSex].InitAnimaWithName("战斗站立_左上", null);
				for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
				{
					if(GmMe.me.iColor[j]<=0 || GmMe.me.iColor[j]>=6)continue;
					GmPlay.xani_color[xb][GmMe.me.iColor[j]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][j]+"_战斗站立_左上", this.aa_cls[i][j]);
				}
			}
//			GmPlay.sop("tid="+GmMe.me.iWeapTid);
			
			if(this.aa_weapon[i]==null && GmMe.me.iWeapTid>=0)
			{
				this.aa_weapon[i]=GmPlay.xani_weap[GmMe.me.iRace*2+GmMe.me.iSex][SortAnima.WeapFlag(GmMe.me.iWeapTid)].InitAnimaWithName("战斗站立_左上", null);
			}

			DrawBuffer.gi().DrawAnima_aa(offy, null,offx, offy, this.aa_body[i]);
			for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
			{
				if(GmMe.me.iColor[j]<=0 || GmMe.me.iColor[j]>=6)continue;
				this.aa_cls[i][j].iFrame=this.aa_body[i].iFrame;
				DrawBuffer.gi().DrawAnima_aa(offy, null, offx, offy, this.aa_cls[i][j]);
			}
			if(this.aa_weapon[i]!=null && GmMe.me.iWeapTid>=0)
			{
				DrawBuffer.gi().DrawAnima_aa(offy, null,offx, offy, this.aa_weapon[i]);
				this.aa_weapon[i].NextFrame();
			}
			this.aa_body[i].NextFrame();
			DrawBuffer.gi().DrawText_2(offy, 1,offx,offy+20,GmMe.me.sName, 0xff80ff80, 20, 1, 0xff000000);
			DrawBuffer.gi().EndGroup();
//			\(MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 30,sName, 0xff80ff80, 20, 1, 0xff000000);
//			DrawName(offx,offy,GmMe.me.sName,GameData.sSchools[GmMe.me.rbs.iSchoolId],GmMe.me.rbs.iLev);
		}
		else
		{//其他人
			nr=Gameing.gameing.findnrs(MyTeam.iTmpTeamRid[i]);
			if(nr!=null)
			{
				xb=nr.iRace*2+nr.iSex;
				DrawBuffer.gi().BeginGroup();
				FireworksEffect.DrawAura(0,offx, offy,DrawBuffer.gi(),offy);
				if(this.aa_body[i]==null)
				{
					this.aa_body[i]=GmPlay.xani_newrole[nr.iRace*2+nr.iSex].InitAnimaWithName("战斗站立_左上", null);
					for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
					{
						if(nr.iColor[j]<=0 || nr.iColor[j]>=6)continue;
						GmPlay.xani_color[xb][nr.iColor[j]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][j]+"_战斗站立_左上", this.aa_cls[i][j]);
					}
				}
				if(this.aa_weapon[i]==null && nr.iWeapTid>=0)
				{
					this.aa_weapon[i]=GmPlay.xani_weap[nr.iRace*2+nr.iSex][SortAnima.WeapFlag(nr.iWeapTid)].InitAnimaWithName("战斗站立_左上", null);
				}

				DrawBuffer.gi().DrawAnima_aa(offy, null,offx, offy, this.aa_body[i]);
				for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
				{
					if(nr.iColor[j]<=0 || nr.iColor[j]>=6)continue;
					this.aa_cls[i][j].iFrame=this.aa_body[i].iFrame;
					DrawBuffer.gi().DrawAnima_aa(offy, null, offx, offy, this.aa_cls[i][j]);
				}
				if(this.aa_weapon[i]!=null && nr.iWeapTid>=0)
				{
					DrawBuffer.gi().DrawAnima_aa(offy, null,offx, offy, this.aa_weapon[i]);
					this.aa_weapon[i].NextFrame();
				}
				this.aa_body[i].NextFrame();
				
				DrawBuffer.gi().DrawText_2(offy, 1,offx,offy+20,nr.sName, 0xff80ff80, 20, 1, 0xff000000);
				DrawBuffer.gi().EndGroup();
//				M3DFast.gi().DrawText_2(offx, offy+20, nr.sName, 0xff80ff80, 20, 101, 1, 1, 0, -2, 0, 1, 0xff000000);
//				DrawName(offx,offy,nr.sName,GameData.sSchools[nr.iSchoolId],nr.iLev);
			}
		}
		var k=0;
		switch(TeamZhen._ZHENADD[GmMe.iTeamZhen][i].length)
		{
		case 1:
			k=25;
			break;
		case 2:
			k=35;
			break;
		case 3:
			k=45;
			break;
		}
		for(j=0;j<TeamZhen._ZHENADD[GmMe.iTeamZhen][i].length;j++)
		{//58*21
			DrawBuffer.gi().DrawAnima_aa(offy+1, null, offx, offy+j*20-k, this.aa_add);
			DrawBuffer.gi().DrawText(offy+2, 1, offx+58/2, offy+21/2+j*20-k, TeamZhen._ZHENADD[GmMe.iTeamZhen][i][j], 0xffffffff, 16);
		}
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(this.bShowKe)
		{
			if(msg==3)this.bShowKe=false;
			return true;
		}
		if(this.btn_ts.ProcTouch(msg, x, y))
		{
			if(this.btn_ts.bCheck())
			{//查看相克情况
				this.bShowKe=true;
			}
			return true;
		}
		for(i=0;i<6;i++)
		{
			if(this.btn_zhen[i].ProcTouch(msg, x, y))
			{
				if(this.btn_zhen[i].bCheck())
				{
					GmMe.iTeamZhen=i;
					GmProtocol.gi().s_ChangeZhen(i);
//					EasyMessage.easymsg.AddMessage("5人组队阵法才可生效");
				}
			}
		}
		for(i=1;i<5;i++)
		{//看是否在菱形内
			if(XDefine.bInLX(x, y, this.poslist[i][0], this.poslist[i][1], 148, 112))
			{
				if(msg==1 && this.iLockPos>0 && this.iLockPos!=i)
				{//交换
					GmProtocol.gi().s_TeamOperate(8,this.iLockPos,i);
					this.iLockPos=-1;
				}
				else
				{//选中
					this.iLockPos=i;
				}
				return true;
			}
		}
		this.iLockPos=-1;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
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
TeamZhen._ZHEN=[
	["          ","普通阵","天罡阵","八卦阵","疾风阵","飞龙阵","聚星阵"],
	["普通阵","0%",     "-5%",   "-5%",   "-5%",   "-5%",    "-5%"],
	["天罡阵","5%",     "0%",    "-5%",    "5%",    "10%",   "-10%"],
	["八卦阵","5%",     "5%",     "0%",     "10%",  "-10%", "-5%"],
	["疾风阵","5%",     "-5%",   "-10%",  "0%",   "5%",      "10%"],
	["飞龙阵","5%",     "-10%", "10%",    "-5%", "0%",      "5%"],
	["聚星阵","5%",     "10%",   "5%",     "-10%","-5%",    "0%"]];
//1物攻，2物防，3法攻，4法防，5+速，6-速，7+封，8+物爆，9+法爆
TeamZhen._ZHENADD=[
	[[ ],[ ],[ ],[ ],[ ]],
	
	[["+5%物攻","+5%法攻"],//天罡，攻
	["+5%物攻","+5%法攻"],
	["+5%物攻","+5%法攻"],
	["+5%物攻","+5%法攻"],
	["+5%物攻","+5%法攻"]],
	
	[["+3%物防","+3%法防"],//八卦，防
	["+5%法防"],
	["+5%法防"],
	["+5%物防"],
	["+5%物防"]],
	
	[["+5%速度"],//疾风，速度
	["+5%速度"],
	["+5%速度"],
	["+5%速度"],
	["+5%速度"]],
	
	[["+8%物暴"],//飞龙，法术
	["+5%法攻"],
	["+5%法攻"],
	["+5%速度"],
	["+5%速度"]],
	
	[["+8%法攻"],//聚星，搭配
	["+5%封中"],
	["+5%法防"],
	["+5%物防"],
	["+5%物防"]],
];
TeamZhen._ZHENSTAND=[
	[[0,0,0,0,0],//普通阵
	[4,2,1,3,5],
	[0,0,0,0,0]],
	
	[[0,0,0,0,0],//天罡阵
	[4,2,0,3,5],
	[0,0,1,0,0]],
	
	[[0,0,0,0,0],//八卦阵
	[4,0,0,0,5],
	[0,2,1,3,0]],
	
	[[0,0,0,0,0],//疾风阵
	[4,0,1,0,5],
	[0,2,0,3,0]],
	
	[[0,0,0,0,0],//飞龙阵
	[0,2,0,3,0],
	[4,0,1,0,5]],
	
	[[0,0,0,0,0],//聚星阵
	[0,2,0,3,0],
	[0,4,1,5,0]]
];
TeamZhen.CleanAnima=function()
{
	var i;
	if(!XStat.gi().CheckStat(XStat.GS_TEAMZHEN))return;
	var to=XStat.gi().LastStat(0);
	for(i=0;i<5;i++)
	{
		to.aa_body[i]=null;
		to.aa_weapon[i]=null;
	}
	to.iLockPos=-1;
	//检查队伍列表页面，也要置null
}
TeamZhen.Open=function()
{
	var tz;
	if(XStat.gi().iXStat==XStat.GS_TEAMZHEN)tz=XStat.gi().LastStat(0);
	else tz=XStat.gi().PushStat(XStat.GS_TEAMZHEN);
}