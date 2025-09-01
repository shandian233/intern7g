
import MapManager from "../../../../../map/MapManager"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import SortAnima from "../../../../../config/SortAnima"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../../engine/control/XCheckBox"
import XInput from "../../../../../engine/control/XInput"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import NearRole from "../../../../../engtst/mgm/gameing/NearRole"
import PublicChat_Send from "../../../../../engtst/mgm/gameing/chat/publicchat/PublicChat_Send"
import FastButton from "../../../../../engtst/mgm/gameing/fast/FastButton"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"

import TeamRequestList from "./TeamRequestList"
import MyTeam from "./MyTeam"
import TeamCreate from "./TeamCreate"
import TeamZhen from "./TeamZhen"

class _NEARROLES
{//附近玩家列表
/*	public int iRid;
	public String sName;
	public int iLev;
	public int iRaX;
	public int iSchool;
	public boolean bApplyed;//申请者，提示同意/拒绝
	*/
	copy( nr)
	{
		this.iRid=nr.iRid;
		this.sName=nr.sName;
		this.iLev=nr.iLev;
		this.iRaX=nr.iRaX;
		this.iSchool=nr.iSchool;
		this.bApplyed=nr.bApplyed;
	}
	swap( nr)
	{
		var i;
		var s;
		var b;
		i=this.iRid;
		this.iRid=nr.iRid;
		nr.iRid=i;
		
		s=this.sName;
		this.sName=nr.sName;
		nr.sName=s;
		
		i=this.iLev;
		this.iLev=nr.iLev;
		nr.iLev=i;
		
		i=this.iRaX;
		this.iRaX=nr.iRaX;
		nr.iRaX=i;
		
		i=this.iSchool;
		this.iSchool=nr.iSchool;
		nr.iSchool=i;
		
		b=this.bApplyed;
		this.bApplyed=nr.bApplyed;
		nr.bApplyed=b;
	}
}

export default class TeamOperate extends BaseClass{
	



	_rolelist( pls)
	{
		var i,j;
		if(pls.GetNextByte()==1)this.iNRCount=0;
		j=this.iNRCount;
		while(true)
		{
			i=pls.GetNextInt();
			if(i==0)break;
			this.nrs[j]=new _NEARROLES();
			this.nrs[j].iRid=i;
			this.nrs[j].sName=pls.GetNextString();
			this.nrs[j].iLev=pls.GetNextShort();
			i=pls.GetNextByte();
			this.nrs[j].iRaX=i%10;
			this.nrs[j].iSchool=parseInt(i/10);
			this.nrs[j].bApplyed=false;
			j++;
			if(j>=TeamOperate.MAXNEARROLE)break;
		}
		this.iNRCount=j;
	}
	remove_from_list( rid)
	{
		var i;
		for(i=0;i<this.iNRCount;i++)
		{
			if(this.nrs[i].iRid==rid)
			{//去除这个
				this.iNRCount--;
				for(;i<this.iNRCount;i++)
				{
					this.nrs[i].copy(this.nrs[i+1]);
				}
				return;
			}
		}
	}
	
	constructor( ani)
	{
		super();
		var i,j;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=1100;
		this.iH=585;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		
		this.btn_zf=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_zf.InitButton("按钮2");
		this.btn_zf.sName="设置阵法";
		
		this.btn_dest=new XButton(GmPlay.xani_nui4);
		this.btn_dest.InitButton("队伍目标改变");
		this.btn_dest.bSingleButton=true;
//		this.btn_dest.sName="设置宗旨";
		
		this.btn_change=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_change.InitButton("按钮2");
		this.btn_change.sName="升为队长";
		
		this.chk_autoback=new XCheckBox(GmPlay.xani_button);
		this.chk_autoback.InitBox("复选框50_53");
		if((GmMe.me.iFlag[2]&2048)==0)this.chk_autoback.bTrue=true;
		else this.chk_autoback.bTrue=false;
		this.chk_autoback.sDetail="自动响应召回";
		
		this.btn_fastsend=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_fastsend.InitButton("按钮2");
		this.btn_fastsend.sName="发送队伍";
		
		this.btn_autoteam=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_autoteam.InitButton("按钮2");
		this.btn_autoteam.sName="自动匹配";

		this.bLock=false;

		this.iNRCount=0;
		this.nrs=new Array(TeamOperate.MAXNEARROLE);//
		for(i=0;i<TeamOperate.MAXNEARROLE;i++)this.nrs[i]=null;
		this.iOffY=0;
		this.iLockY=-1;
		this.iLockDelay=100;
		this.iRolePoint=-1;
		
		this.iOBCount=0;
		this.bResetOBC=false;

		this.btn_operate=new Array(12);//
		for(i=0;i<12;i++)this.btn_operate[i]=new XButtonEx2(GmPlay.xani_nui2);
		
		this.iPage=0;
		this.btn_page=new Array(2);//
		for(i=0;i<2;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
			this.btn_page[i].Move(this.iX+this.iW-15, this.iY+40+125*i, 50, 140);
		}

		
		this.btn_refuse=new Array(TeamOperate.MAXLIST);//
		this.btn_roles=new Array(TeamOperate.MAXLIST);//
		this.btn_away=new Array(TeamOperate.MAXLIST);//
		this.aa_body=new Array(TeamOperate.MAXLIST);//
		this.aa_weapon=new Array(TeamOperate.MAXLIST);//
		this.aa_cls=new Array(TeamOperate.MAXLIST);//
		this.btn_watch=new Array(TeamOperate.MAXLIST);//
		for(i=0;i<TeamOperate.MAXLIST;i++)
		{
			this.aa_cls[i]=new Array(5);
			this.btn_watch[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_watch[i].InitButton("队伍查看50_50");
			
			this.btn_refuse[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_refuse[i].sName="拒绝";//踢出
			this.btn_refuse[i].InitButton("按钮1_110");

			this.btn_roles[i]=new XButton(ani);
//			this.btn_roles[i].sName=""+(i+1);
			this.btn_roles[i].bSingleButton=true;
			
			this.btn_away[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_away[i].InitButton("队伍暂离72_42");
			this.btn_away[i].sName="暂离";
			this.btn_away[i].iNameSize=25;

			this.aa_body[i]=null;
			this.aa_weapon[i]=null;
			for(j=0;j<5;j++)this.aa_cls[i][j]=new AnimaAction();
		}
		this.iScrollX=0;
		if(TeamOperate.trl==null)
		{
			TeamOperate.trl=new Array(TeamOperate.MAXLIST);//
			for(i=0;i<TeamOperate.MAXLIST;i++)TeamOperate.trl[i]=new TeamRequestList();
			TeamOperate.iRequestCount=0;
		}
		this.bLock=true;
	}
	DrawName( offx, offy, name, school, lev, map)
	{
		this.pm3f.DrawTextEx(offx,offy+55, name, 0xffffffff, 20, 101, 1, 1, 0, -2,-2);
		
		this.pm3f.DrawTextEx(offx-50,offy+55+40, school, 0xffffffff, 20, 101, 1, 1, 0, -1,-2);
		this.pm3f.DrawTextEx(offx+50,offy+55+40, ""+lev, 0xffffffff, 20, 101, 1, 1, 0, -3,-2);
		
		this.pm3f.DrawTextEx(offx,offy+55+80, map, 0xffffffff, 20, 101, 1, 1, 0, -2,-2);
	}
	
	Draw()
	{
		if(MyTeam.bNoTeam())
		{
			XStat.gi().PopStat(1);
			return;
		}
		
		if(MyTeam.bTeamLeader())this.iW=1100;
		else this.iW=1100-360-50;
		this.iH=585;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "队", "伍");
		DrawMode.new_framein(this.iX+30, this.iY+30, 630, this.iH-60);
		
		this.btn_close.Move(this.iX+this.iW-35, this.iY+-25, 60, 60);
		this.btn_close.Draw();
		
		if(this.iPage==0)this.Draw_0();
		else this.Draw_1();
		
		if(MyTeam.bTeamLeader())
		{
			this.Draw_near();//附近玩家
			
			for(var i=0;i<2;i++)
			{
				if(this.iPage==i)
				{
					this.btn_page[i].bMouseIn=true;
					this.btn_page[i].bMouseDown=true;
				}
				this.btn_page[i].Draw();
			}

			DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+125*0-4, 40, 70,this.iPage==0,"我","的","队","伍");
			DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+125*1-4, 40, 70,this.iPage==1,"申","请","列","表");
		}
		else
		{
			if(this.iPage==1)this.iPage=0;
		}
		
//		M3DFast.gi().FillRect_2D(this.iX+50, this.iY+180, this.iX+50+120*5, this.iY+180+300+65, 0x80ffffff);
	}
	Draw_1()
	{
		var i,j,offx,offy;
		var xb;

		this.btn_zf.Move(this.iX+50, this.iY+50, 145, 56);
		this.btn_change.Move(this.iX+50+120*5-145-10, this.iY+50, 145, 56);
		this.btn_fastsend.Move(this.iX+50+280+10, this.iY+50+65, 145, 56);
		this.btn_autoteam.Move(this.iX+50+280+10+145+10, this.iY+50+65, 145, 56);
		this.btn_dest.Move(this.iX+50, this.iY+50+65, 280, 54);
		
		this.btn_zf.Draw();
		if(MyTeam.bTeamLeader())
		{
			this.btn_fastsend.Draw();
			if(MyTeam.bLeaderAutoTeaming)this.btn_autoteam.sName="匹配中...";
			else this.btn_autoteam.sName="自动匹配";
			this.btn_autoteam.Draw();
		}
		
//		this.btn_dest.Draw();
		this.Draw_Target();
		
		M3DFast.gi().SetViewClip(this.iX+50, this.iY+180, this.iX+50+120*5, this.iY+180+300+65);
		for(i=0;i<TeamOperate.iRequestCount;i++)
		{
			offx=this.iX+50+i*120+55-this.iScrollX;
			offy=this.iY+180+150;
			
			GmPlay.xani_nui2.DrawAnima(offx-55, offy-150, "队伍人物格子1",0);
			if(this.bLock==true && this.iLockPoint1==i)DrawMode.frame_type2("黄色透明框a25_25", offx-55,offy-150, 110, 180, 25, 25);

			this.btn_roles[i].Move(offx-55, offy-150, 110,180);
			this.btn_refuse[i].Move(offx-55, offy+310-150, 110, 52); 
			this.btn_away[i].Move(offx-55+110-72, offy+180-42-150, 72, 42);
			this.btn_watch[i].Move(offx-55+110-50, offy-150, 50, 50);
			
			GmPlay.xani_nui1.DrawAnimaEx(offx,offy, "选中角色底", GmPlay.iDelay, 101, 0.5, 0.5, 0, -2, -2);

			{//其他人
				xb=TeamOperate.trl[i].iRas;
				
				if(this.aa_body[i]==null)
				{
					this.aa_body[i]=GmPlay.xani_newrole[xb].InitAnimaWithName("站立_下", null);
					for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
					{
						if(TeamOperate.trl[i].iColor[j]<=0 || TeamOperate.trl[i].iColor[j]>=6)continue;
						GmPlay.xani_color[xb][TeamOperate.trl[i].iColor[j]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][j]+"_站立_下", this.aa_cls[i][j]);
					}
				}
				if(TeamOperate.trl[i].iWeapTid>=0 && this.aa_weapon[i]==null)
				{
					this.aa_weapon[i]=GmPlay.xani_weap[TeamOperate.trl[i].iRas][SortAnima.WeapFlag(TeamOperate.trl[i].iWeapTid)].InitAnimaWithName("站立_下", null);
				}
				
				this.aa_body[i].Draw(offx,offy);
				for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
				{
					if(TeamOperate.trl[i].iColor[j]<=0 || TeamOperate.trl[i].iColor[j]>=6)continue;
					this.aa_cls[i][j].iFrame=this.aa_body[i].iFrame;
					this.aa_cls[i][j].Draw(offx,offy);
				}
				if(this.aa_weapon[i]!=null && TeamOperate.trl[i].iWeapTid>=0)
				{
					this.aa_weapon[i].Draw(offx,offy);
					this.aa_weapon[i].NextFrame();
				}
				this.aa_body[i].NextFrame();
				this.DrawName(offx,offy,TeamOperate.trl[i].sName,GameData.sSchools[TeamOperate.trl[i].iSchoolId],TeamOperate.trl[i].iLev,TeamOperate.trl[i].sMapName);
			}
			
			this.btn_refuse[i].sName="同意";
			this.btn_refuse[i].Draw();

			this.btn_away[i].sName="拒绝";
			this.btn_away[i].Draw();

			this.btn_watch[i].Draw();
		}
		M3DFast.gi().NoClip();
		if(TeamOperate.iRequestCount<=5)this.iScrollW=0;
		else this.iScrollW=(TeamOperate.iRequestCount-5)*120;
		if(!this.bLockX)
		{
			if(this.iScrollX<0)this.iScrollX=0;
			if(this.iScrollX>this.iScrollW)this.iScrollX=this.iScrollW;
		}
	}

	Draw_Target()
	{
		DrawMode.frame_type1("队伍目标40_54", this.btn_dest.iX, this.btn_dest.iY, this.btn_dest.iW, 40);
//		if(MyTeam.iTeamTarget==0)TeamOperate.sZz="无目标";
//		else 
			if(MyTeam.iTeamTarget>=0 && MyTeam.iTeamTarget<8)
		{
			TeamOperate.sZz=TeamCreate._TARGET[MyTeam.iTeamTarget]+"   "+MyTeam.iLev1+"级~"+MyTeam.iLev2+"级";
		}
		M3DFast.gi().DrawText_2(this.btn_dest.iX+20, this.btn_dest.iY+27, TeamOperate.sZz, 0xff003e57, 24, 101, 1, 1, 0, 0, -2, 3,0xffffffff);
	}
	Draw_0()
	{
		var i,j,offx,offy;
		var xb;

		this.btn_zf.Move(this.iX+50, this.iY+50, 145, 56);
		this.chk_autoback.Move(this.iX+50+350, this.iY+50, 50, 53);
		this.btn_change.Move(this.iX+50+120*5-145-10, this.iY+50, 145, 56);
		this.btn_dest.Move(this.iX+50, this.iY+50+65, 280, 54);
		this.btn_fastsend.Move(this.iX+50+280+10, this.iY+50+65, 145, 56);
		this.btn_autoteam.Move(this.iX+50+280+10+145+10, this.iY+50+65, 145, 56);

		this.btn_zf.Draw();
		if(MyTeam.bTeamLeader())
		{
			this.btn_fastsend.Draw();
			if(MyTeam.bLeaderAutoTeaming)this.btn_autoteam.sName="匹配中...";
			else this.btn_autoteam.sName="自动匹配";
			this.btn_autoteam.Draw();
		}
		else
		{
			this.chk_autoback.Draw();
		}
//		this.btn_dest.Draw();
		this.Draw_Target();

		for(i=0;i<5;i++)
		{
			offy=this.iY+180;
			
			GmPlay.xani_nui2.DrawAnima(this.iX+50+i*120, offy, "队伍人物格子1",0);
			
			if(MyTeam.iTmpTeamRid[i]==0)continue;

			this.btn_roles[i].Move(this.iX+50+i*120, offy, 110,180);
			this.btn_refuse[i].Move(this.iX+50+i*120, offy+310, 110, 52); 
			this.btn_away[i].Move(this.iX+50+i*120+110-72, offy+180-42, 72, 42);
			this.btn_watch[i].Move(this.iX+50+i*120+110-50, offy, 50, 50);
			
			offx=this.iX+50+i*120+55;
			offy=this.iY+180+150;
			GmPlay.xani_nui1.DrawAnimaEx(offx,offy, "选中角色底", GmPlay.iDelay, 101, 0.5, 0.5, 0, -2, -2);
			if(MyTeam.iTmpTeamRid[i]==GmMe.me.iRid)
			{//自己
				xb=GmMe.me.iRace*2+GmMe.me.iSex;
				if(this.aa_body[i]==null)
				{
					this.aa_body[i]=GmPlay.xani_newrole[GmMe.me.iRace*2+GmMe.me.iSex].InitAnimaWithName("站立_下", null);
					for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
					{
						if(GmMe.me.iColor[j]<=0 || GmMe.me.iColor[j]>=6)continue;
						GmPlay.xani_color[xb][GmMe.me.iColor[j]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][j]+"_站立_下", this.aa_cls[i][j]);
					}
				}
//				GmPlay.sop("tid="+GmMe.me.iWeapTid);
				
				if(this.aa_weapon[i]==null && GmMe.me.iWeapTid>=0)
				{
					this.aa_weapon[i]=GmPlay.xani_weap[GmMe.me.iRace*2+GmMe.me.iSex][SortAnima.WeapFlag(GmMe.me.iWeapTid)].InitAnimaWithName("站立_下", null);
				}

				if(MyTeam.iTeamRid[i]==0)this.aa_body[i].DrawEx(offx, offy, 50, 1, 1, 0, 0, 0);
				else this.aa_body[i].Draw(offx,offy);
				for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
				{
					if(GmMe.me.iColor[j]<=0 || GmMe.me.iColor[j]>=6)continue;
					this.aa_cls[i][j].iFrame=this.aa_body[i].iFrame;
					if(MyTeam.iTeamRid[i]==0)this.aa_cls[i][j].DrawEx(offx, offy, 50, 1, 1, 0, 0, 0);
					else this.aa_cls[i][j].Draw(offx,offy);
				}
				if(this.aa_weapon[i]!=null && GmMe.me.iWeapTid>=0)
				{
					if(MyTeam.iTeamRid[i]==0)this.aa_weapon[i].DrawEx(offx, offy, 50, 1, 1, 0, 0, 0);
					else this.aa_weapon[i].Draw(offx,offy);
					this.aa_weapon[i].NextFrame();
				}
				this.aa_body[i].NextFrame();
				this.DrawName(offx,offy,GmMe.me.sName,GameData.sSchools[GmMe.me.rbs.iSchoolId],GmMe.me.rbs.iLev,MyTeam.sMapName[i]);
			}
			else
			{//其他人
				xb=MyTeam.iRas[i];
				if(this.aa_body[i]==null)
				{
					this.aa_body[i]=GmPlay.xani_newrole[xb].InitAnimaWithName("站立_下", null);
					for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
					{
						if(MyTeam.iColor[i][j]<=0 || MyTeam.iColor[i][j]>=6)continue;
						GmPlay.xani_color[xb][MyTeam.iColor[i][j]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][j]+"_站立_下", this.aa_cls[i][j]);
					}
				}
				if(this.aa_weapon[i]==null && MyTeam.iWeapTid[i]>=0)
				{
					this.aa_weapon[i]=GmPlay.xani_weap[MyTeam.iRas[i]][SortAnima.WeapFlag(MyTeam.iWeapTid[i])].InitAnimaWithName("站立_下", null);
				}

				if(MyTeam.iTeamRid[i]==0)this.aa_body[i].DrawEx(offx, offy, 50, 1, 1, 0, 0, 0);
				else this.aa_body[i].Draw(offx,offy);
				for(j=0;j<SortAnima._CHANGECOLOR[xb].length;j++)
				{
					if(MyTeam.iColor[i][j]<=0 || MyTeam.iColor[i][j]>=6)continue;
					this.aa_cls[i][j].iFrame=this.aa_body[i].iFrame;
					if(MyTeam.iTeamRid[i]==0)this.aa_cls[i][j].DrawEx(offx, offy, 50, 1, 1, 0, 0, 0);
					else this.aa_cls[i][j].Draw(offx,offy);
				}
				if(this.aa_weapon[i]!=null && MyTeam.iWeapTid[i]>=0)
				{
					this.aa_weapon[i].Draw(offx,offy);
					if(MyTeam.iTeamRid[i]==0)this.aa_weapon[i].DrawEx(offx, offy, 50, 1, 1, 0, 0, 0);
					else this.aa_weapon[i].NextFrame();
				}
				this.aa_body[i].NextFrame();
				this.DrawName(offx,offy,MyTeam.sName[i],GameData.sSchools[MyTeam.iSchoolId[i]],MyTeam.iLev[i],MyTeam.sMapName[i]);
			}
			
			if(this.bLock==true)
			{
				if(this.iLockPoint1==i)DrawMode.frame_type2("黄色透明框a25_25", this.iX+50+i*120,this.iY+180, 110, 180, 25, 25);
				else if(this.iLockPoint1>=0 && this.iLockPoint1<5 && MyTeam.iTeamRid[this.iLockPoint1]>0)M3DFast.gi().DrawTextEx(this.iX+50+i*120+55,this.iY+180+100, "点击交换", 0xffffff00, 25, 101, 1, 1, 0, -2, -2);
			}
			
			if(MyTeam.bTeamLeader())
			{//自己是队长，可以解散和踢其他所有人
				if(i==0)
				{
					this.btn_refuse[i].sName="解散";
					this.btn_refuse[i].Draw();
				}
				else
				{
					this.btn_refuse[i].sName="请离";
					this.btn_refuse[i].Draw();
				}
				if(MyTeam.iTeamRid[i]<=0)
				{//此人处于暂离状态，显示召回按钮
					this.btn_away[i].sName="召回";
					this.btn_away[i].Draw();
				}
			}
			else if(MyTeam.iTmpTeamRid[i]==GmMe.me.iRid)
			{//只能自己离队
				
				
				this.btn_refuse[i].sName="离队";
				this.btn_refuse[i].Draw();
				
				if(MyTeam.iTeamRid[i]<=0)
				{//自己处于暂离状态
					this.btn_away[i].sName="归队";
				}
				else this.btn_away[i].sName="暂离";
				this.btn_away[i].Draw();
			}
			this.btn_watch[i].Draw();
		}
		


		if(!MyTeam.bTeamLeader())
		{
			this.btn_change.Move(this.iX+50+120*5-145-10, this.iY+50+70, 145, 56);
			this.btn_change.sName="申请带队";
			this.btn_change.Draw();
			return;
		}

		if(this.bLock && this.iLockPoint1>0)
		{
			this.btn_change.sName="升为队长";
			this.btn_change.Draw();
		}
	}
	 Draw_near()
	{
		var i;
		var offx,offy;
		//队长才能看到附近玩家列表
		offx=this.iX+30+630+20;
		offy=this.iY+30;
		var offw=360+30;
		DrawMode.new_framein(offx,offy, offw, this.iH-60);//95*5=475+30=505
//		var offh=550;
		M3DFast.gi().DrawText_2(offx+offw/2, offy+30, "附 近 玩 家("+this.iNRCount+")", 0xff000000, 30, 101, 1, 1, 0, -2, -2, 3, 0xff80ffff);
		offx+=15;
		offy+=55;
		M3DFast.gi().SetViewClip(offx, offy, offx+360, offy+95*4);
		offy-=this.iOffY;
		if(this.bResetOBC)this.iOBCount=0;
		for(i=0;i<this.iNRCount;i++)
		{
			if(offy<this.iY+85-95 || offy>this.iY+85+95*4)
			{
				offy+=95;
				continue;
			}
			GmPlay.xani_nui2.DrawAnima(offx, offy, "队伍列表标签",this.iRolePoint==i?1:0);
			GmPlay.xani_head.DrawAnima(offx+4, offy+4, "新头像"+(this.nrs[i].iRaX), 0);
			M3DFast.gi().DrawTextEx(offx+4+83+10, offy+25, this.nrs[i].sName, 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			M3DFast.gi().DrawTextEx(offx+4+83+10, offy+65, GameData.sSchools[this.nrs[i].iSchool]+" 等级"+this.nrs[i].iLev, 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
			
			if(this.bResetOBC)
			{//重设按钮
				this.btn_operate[this.iOBCount].exts[0]=this.nrs[i].iRid;
				if(this.nrs[i].bApplyed)
				{//申请者，同意，拒绝
					if(this.iRolePoint==i)
					{//选中时为拒绝
						this.btn_operate[this.iOBCount].InitButton("拒绝入队");
						this.btn_operate[this.iOBCount].exts[1]=0;
					}
					else
					{
						//没选中为同意
						this.btn_operate[this.iOBCount].InitButton("同意入队");
						this.btn_operate[this.iOBCount].exts[1]=1;
					}
					this.btn_operate[this.iOBCount].Move(offx+offw-130, offy+(95-60)/2, 90, 60);
				}
				else
				{//邀请
					this.btn_operate[this.iOBCount].InitButton("邀请入队");
					this.btn_operate[this.iOBCount].Move(offx+offw-130, offy+(95-60)/2, 90, 60);
					this.btn_operate[this.iOBCount].exts[1]=2;
				}
				this.iOBCount++;
			}
//			M3DFast.gi().DrawTextEx(offx+offw-60, offy+95/2, this.nrs[i].bApplyed?"同意":"邀请", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			//tl[i].sName
			offy+=95;
		}
		for(i=0;i<this.iOBCount;i++)
		{
			this.btn_operate[i].Draw();
		}
		M3DFast.gi().NoClip();
		this.iLockDelay++;
		this.bResetOBC=false;
		this.bResetOBC=true;
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(this.iPage==1)
		{///申请列表操作
			if(this.bLockX)
			{
				if(msg==2)
				{
					this.iScrollX+=(this.iLockX-x);
					this.iLockX=x;
				}
				if(msg==3)
				{
					this.bLockX=false;
				}
				return true;
			}
		}
		if(MyTeam.bTeamLeader())//是队长才能滑动右边附近玩家
		{//滑动申请列表
			for(i=0;i<2;i++)
			{
				if(this.btn_page[i].ProcTouch(msg, x, y))
				{
					if(this.btn_page[i].bCheck())
					{
						if(this.iPage!=i)
						{
							this.iPage=i;
							TeamOperate.CleanAnima();
						}
					}
					return true;
				}
			}
			if(this.btn_fastsend.ProcTouch(msg, x, y))
			{
				if(this.btn_fastsend.bCheck())
				{
					PublicChat_Send.bOpenInput=false;
					PublicChat_Send.Open();
					PublicChat_Send.in_speak.sDetail="";
					PublicChat_Send.ClearCext();
					PublicChat_Send.AddTeam();
				}
				return true;
			}
			if(this.btn_autoteam.ProcTouch(msg, x, y))
			{
				if(this.btn_autoteam.bCheck())
				{
					GmProtocol.gi().s_TeamOperate(25,0,0);
				}
				return true;
			}
			if(this.bLock && this.iLockPoint1>0)
			{//锁定，并且不是第一个，提升队长（跟自己交换）
				if(this.btn_change.ProcTouch(msg, x, y))
				{
					if(this.btn_change.bCheck())
					{
						GmProtocol.gi().s_TeamOperate(8,this.iLockPoint1,0);
						this.bLock=false;
					}
					return true;
				}
			}
			if(this.btn_dest.ProcTouch(msg, x, y))
			{
				if(this.btn_dest.bCheck())
				{//设置宗旨
					TeamDest.Open();
				}
				return true;
			}
			var offx=this.iX+30+630+20+15;
			var offy=this.iY+30+55;
			if(XDefine.bInRect(x, y, offx, offy, 360, 95*4))
			{
				for(i=0;i<this.iOBCount;i++)
				{
					if(this.btn_operate[i].ProcTouch(msg, x, y))
					{
						if(this.btn_operate[i].bCheck())
						{
							if(this.btn_operate[i].exts[1]==0)
							{//拒绝
								GmProtocol.gi().s_TeamOperate(5,this.btn_operate[i].exts[0],0);
								this.remove_from_list(this.btn_operate[i].exts[0]);
								this.bResetOBC=true;
							}
							else if(this.btn_operate[i].exts[1]==1)
							{//同意
								GmProtocol.gi().s_TeamOperate(4,this.btn_operate[i].exts[0],0);
								this.remove_from_list(this.btn_operate[i].exts[0]);
								this.bResetOBC=true;
							}
							else
							{//邀请
								GmProtocol.gi().s_TeamOperate(6,this.btn_operate[i].exts[0],0);
								this.remove_from_list(this.btn_operate[i].exts[0]);
								this.bResetOBC=true;
							}
						}
						return true;
					}
				}
				if(msg==1)
				{//按下
					this.iLockDelay=0;
					this.iLockY=y;
				}
				else if(msg==2 && this.iLockY>0)
				{//移动
					this.iOffY+=(this.iLockY-y);
					this.iLockY=y;
					this.bResetOBC=true;
				}
				else if(msg==3 && this.iLockY>0)
				{
					this.iOffY+=(this.iLockY-y);
					this.iLockY=-1;
					this.bResetOBC=true;
					if(this.iLockDelay<6)
					{//选中
						this.iRolePoint=(y-offy+this.iOffY)/95;
						GmPlay.sop("iTeamPoint="+this.iRolePoint+",,,"+this.iOffY);
					}
				}
				i=(this.iNRCount-4)*95;
				if(i<0)i=0;
				if(this.iOffY<0)this.iOffY=0;
				if(this.iOffY>i)this.iOffY=i;
				return true;
			}
		}
		else
		{
			if(this.chk_autoback.ProcTouch(msg, x, y))
			{
				if(this.chk_autoback.bTrue)GmProtocol.gi().s_setflag(2, 11, 0);
				else GmProtocol.gi().s_setflag(2, 11, 1);
			}
			if(this.btn_change.ProcTouch(msg, x, y))
			{//申请队长
				if(this.btn_change.bCheck())
				{
					GmProtocol.gi().s_TeamOperate(23,0,0);
				}
				return true;
			}
		}
		this.iLockY=-1;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_zf.ProcTouch(msg, x, y))
		{//设置/查看阵法
			if(this.btn_zf.bCheck())
			{
				TeamZhen.Open();
			}
			return true;
		}
//		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
//		{
//			XStat.gi().PopStat(1);
//			return true;
//		}
		if(this.iPage==0)
		{
			for(i=0;i<5;i++)
			{
				if(MyTeam.iTmpTeamRid[i]==0)continue;

				if(this.btn_watch[i].ProcTouch(msg, x, y))
				{
					if(this.btn_watch[i].bCheck())
					{
						GmProtocol.gi().s_WatchOn(0, MyTeam.iTmpTeamRid[i], 0, "");
					}
					return true;
				}
				if(this.btn_away[i].ProcTouch(msg, x, y))
				{
					if(this.btn_away[i].bCheck())
					{
						if(MyTeam.bTeamLeader())
						{//队长
							if(MyTeam.iTeamRid[i]==0)
							{//召回暂离的队员
								GmProtocol.gi().s_TeamOperate(22,MyTeam.iTmpTeamRid[i],0);
							}
						}
						else
						{//队员
							if(MyTeam.iTeamRid[i]==0)
							{//归队
								GmProtocol.gi().s_TeamOperate(21,0,0);
							}
							else
							{//暂离
								GmProtocol.gi().s_TeamOperate(20,0,0);
							}
						}
					}
					break;
				}
				if(this.btn_roles[i].ProcTouch(msg, x, y))
				{//交换成员
					if(this.btn_roles[i].bCheck())
					{//如果我是队长，第一次点击锁定，第二次点击与目标交换
						if(MyTeam.bTeamLeader())
						{//是队长
							if(!this.bLock)
							{
								this.bLock=true;
								this.iLockPoint1=i;
							}
							else
							{//第二次点击，进行交换
								if(this.iLockPoint1!=i)GmProtocol.gi().s_TeamOperate(8,this.iLockPoint1,i);
								this.bLock=false;
							}
						}
					}
				}
				if(this.btn_refuse[i].ProcTouch(msg, x, y))
				{
					if(this.btn_refuse[i].bCheck())
					{
						if(MyTeam.bTeamLeader())
						{//自己是队长，可以随便踢人
							if(i==0)
							{//队长，自己离队
								GmProtocol.gi().s_TeamOperate(1,GmMe.me.iRid,0);//'
								XStat.gi().PopStat(1);
							}
							else
							{//把队员踢出
								GmProtocol.gi().s_TeamOperate(2,MyTeam.iTmpTeamRid[i],0);//'
							}
							MyTeam.iTeamRid[i]=0;
							MyTeam.iTmpTeamRid[i]=0;
						}
						else if(MyTeam.iTmpTeamRid[i]==GmMe.me.iRid)
						{//自己离队
							GmProtocol.gi().s_TeamOperate(1,GmMe.me.iRid,0);//'
//							GmMe.me.iTeamRid[i]=0;
							XStat.gi().PopStat(1);
						}
					}
				}
			}
		}
		else if(this.iPage==1)
		{///申请列表操作
//			if(this.bLockX)
//			{
//				if(msg==2)
//				{
//					this.iScrollX+=(this.iLockX-x);
//					this.iLockX=x;
//				}
//				if(msg==3)
//				{
//					this.bLockX=false;
//				}
//				return true;
//			}
			if(XDefine.bInRect(x, y, this.iX+50, this.iY+180, 120*5, 300+65))
			{
				for(i=0;i<TeamOperate.iRequestCount;i++)
				{
					if(this.btn_watch[i].ProcTouch(msg, x, y))
					{
						if(this.btn_watch[i].bCheck())
						{
							GmProtocol.gi().s_WatchOn(0, TeamOperate.trl[i].iRid, 0, "");
						}
						return true;
					}
					if(this.btn_away[i].ProcTouch(msg, x, y))
					{
						if(this.btn_away[i].bCheck())
						{//拒绝
							GmProtocol.gi().s_TeamOperate(5,TeamOperate.trl[i].iRid,0);
							TeamOperate.RemoveFromRequest(TeamOperate.trl[i].iRid);
						}
						return true;
					}
					if(this.btn_roles[i].ProcTouch(msg, x, y))
					{//交换成员
						if(this.btn_roles[i].bCheck())
						{//如果我是队长，第一次点击锁定，第二次点击与目标交换
//							if(MyTeam.bTeamLeader())
//							{//是队长
//								if(!this.bLock)
//								{
//									this.bLock=true;
//									this.iLockPoint1=i;
//								}
//								else
//								{//第二次点击，进行交换
//									if(this.iLockPoint1!=i)GmProtocol.gi().s_TeamOperate(8,this.iLockPoint1,i);
//									this.bLock=false;
//								}
//							}
						}
					}
					if(this.btn_refuse[i].ProcTouch(msg, x, y))
					{
						if(this.btn_refuse[i].bCheck())
						{//同意
							GmProtocol.gi().s_TeamOperate(4,TeamOperate.trl[i].iRid,0);
							TeamOperate.RemoveFromRequest(TeamOperate.trl[i].iRid);
						}
						return true;
					}
				}

				if(msg==1)
				{
					this.bLockX=true;
					this.iLockX=x;
				}
			}
		}
		return false;
	}
}
TeamOperate.MAXNEARROLE=128;

TeamOperate.rolelist=function( pls)
	{
		if(!XStat.gi().CheckStat(XStat.GS_TEAMOPERATE))return;
		var to=XStat.gi().LastStat(0);
		to._rolelist(pls);
	}
TeamOperate.CleanAnima=function()
	{
		var i;
//		if(!XStat.gi().CheckStat(XStat.GS_TEAMOPERATE))return;
//		TeamOperate to=(TeamOperate)XStat.gi().LastStat(0);
		var to=XStat.gi().FindStat(XStat.GS_TEAMOPERATE);
		if(to==null)return;
		for(i=0;i<TeamOperate.MAXLIST;i++)
		{
			to.aa_body[i]=null;
			to.aa_weapon[i]=null;
		}
	}
 TeamOperate.ResetWeapon=function( tid, sex, stat, aaw)
	{
		var race=GmPlay.de_goods.intValue(tid, 0, 19);
		aaw=GmPlay.xani_weap[race*2+sex][SortAnima.WeapFlag(tid)].InitAnimaWithName(stat, aaw);
//		if(tid==248 || tid==249 || tid==250)
//		{//70武器xani_weap70
//			aaw=GmPlay.xani_weap70.InitAnimaWithName(GmMe.sSex(sex)+GmPlay.de_goods.strValue(tid, 0, 4)+stat, aaw);
//		}
//		else aaw=GmPlay.xani_role[race*2+sex].InitAnimaWithName(GmPlay.de_goods.strValue(tid, 0, 4)+stat, aaw);
		return aaw;
	}
TeamOperate.trl;
TeamOperate.MAXLIST=32;
//	public static int requestlist=new int[32][2];//最多32个申请(id,vmid)，切换地图时清空
TeamOperate.iRequestCount=0;
	
TeamOperate.sZz="无";//队伍宗旨
	
TeamOperate.Open=function( page)
	{
		var to=XStat.gi().PushStat(XStat.GS_TEAMOPERATE);
		to.iPage=page;
	}
	
TeamOperate.AddTeamRequest=function( pls)
	{
		var i,j;
		var rid=pls.GetNextInt();
		TeamOperate.RemoveFromRequest(rid);

		if(!TeamOperate.trl || !TeamOperate.trl.length) return;

		for(i=TeamOperate.MAXLIST-1;i>0;i--)
		{
			TeamOperate.trl[i].copyfrom(TeamOperate.trl[i-1]);
		}

		TeamOperate.trl[0].iRid=rid;
		TeamOperate.trl[0].sName=pls.GetNextString();
		TeamOperate.trl[0].iRas=pls.GetNextByte();
		TeamOperate.trl[0].iSchoolId=pls.GetNextByte();
		TeamOperate.trl[0].iLev=pls.GetNextShort();
		j=pls.GetNextShort();
		TeamOperate.trl[0].iColor[0]=j&7;
		TeamOperate.trl[0].iColor[1]=(j>>3)&7;
		TeamOperate.trl[0].iColor[2]=(j>>6)&7;
		TeamOperate.trl[0].iColor[3]=(j>>9)&7;
		TeamOperate.trl[0].iColor[4]=(j>>12)&7;
		TeamOperate.trl[0].iWeapTid=pls.GetNextShort();
		TeamOperate.trl[0].sMapName=pls.GetNextString();
		
		if(TeamOperate.iRequestCount<TeamOperate.MAXLIST)TeamOperate.iRequestCount++;
		
		FastButton.gi().bRequestFlash=true;
	}
	TeamOperate.RemoveFromRequest=function( rid)
	{
		var i,j=0;
		for(i=0;i<TeamOperate.iRequestCount;i++)
		{
			if(TeamOperate.trl[i].iRid==rid)j=1;
			if(j==1 && i<TeamOperate.iRequestCount-1)
			{
				TeamOperate.trl[i].copyfrom(TeamOperate.trl[i+1]);
			}
		}
		if(j==1)TeamOperate.iRequestCount--;
		TeamOperate.CleanAnima();
	}