
import GmConfig from "../../../config/GmConfig"
import XDefine from "../../../config/XDefine"
import DrawBuffer from "../../../map/DrawBuffer"
import MapManager from "../../../map/MapManager"
import TouchEffect from "../../../map/TouchEffect"
import BaseClass from "../../../engine/BaseClass"
import PackageTools from "../../../engine/PackageTools"
import TouchManager from "../../../engine/TouchManager"
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import FireworksEffect from "../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../engtst/mgm/GmProtocol"
import MyAI from "../../../engtst/mgm/MyAI"
import XStat from "../../../engtst/mgm/XStat"
import FriendList from "../../../engtst/mgm/gameing/chat/privatechat/FriendList"
import PrivateChatWatch from "../../../engtst/mgm/gameing/chat/privatechat/PrivateChatWatch"
import PublicChat_BigFrame from "../../../engtst/mgm/gameing/chat/publicchat/PublicChat_BigFrame"
import PublicChat_SmallFrame from "../../../engtst/mgm/gameing/chat/publicchat/PublicChat_SmallFrame"
import FastButton from "../../../engtst/mgm/gameing/fast/FastButton"
import SteeringWheel from "../../../engtst/mgm/gameing/fast/SteeringWheel"
import SystemOperate from "../../../engtst/mgm/gameing/fast/SystemOperate"
import AutoFightFrame from "../../../engtst/mgm/gameing/fight/AutoFightFrame"
import XFight from "../../../engtst/mgm/gameing/fight/XFight"
import FastGoods from "../../../engtst/mgm/gameing/help/FastGoods"
import GamePost from "../../../engtst/mgm/gameing/help/GamePost"
import JQMode from "../../../engtst/mgm/gameing/help/JQMode"
import MySelect from "../../../engtst/mgm/gameing/help/MySelect"
import ShowPath from "../../../engtst/mgm/gameing/help/ShowPath"
import FirstCharge from "../../../engtst/mgm/gameing/help/TopIcon/FirstCharge"
import FiveGift from "../../../engtst/mgm/gameing/help/TopIcon/FiveGift"
import LeaderBoard from "../../../engtst/mgm/gameing/help/TopIcon/LeaderBoard"
import LoginGift from "../../../engtst/mgm/gameing/help/TopIcon/LoginGift"
import StrengthUpgrade from "../../../engtst/mgm/gameing/help/TopIcon/StrengthUpgrade"
import GmMe from "../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../engtst/mgm/gameing/me/goods/MyGoods"
import TmpGoods from "../../../engtst/mgm/gameing/me/goods/TmpGoods"
import MissionFinish from "../../../engtst/mgm/gameing/me/mission/MissionFinish"
import MissionLead from "../../../engtst/mgm/gameing/me/mission/MissionLead"
import UpgradeEffect from "../../../engtst/mgm/gameing/me/mission/UpgradeEffect"
import MyBuy from "../../../engtst/mgm/gameing/me/shop/MyBuy"
import MySell from "../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../engtst/mgm/gameing/me/team/MyTeam"
import TeamCreate from "../../../engtst/mgm/gameing/me/team/TeamCreate"
import NearRole from "./NearRole"
import NearBy from "./NearBy"
import ExtendButton from "./ExtendButton"
import ProgressBar from "./ProgressBar"

export default class Gameing extends BaseClass{

	findnrs( rid)
	{
		var i;
		for(i=0;i<Gameing.iNearMax;i++)
		{
			if(this.nrs[i].bUseing && this.nrs[i].iRid==rid)return this.nrs[i];
		}
		return null;
	}
	ClearPopo()
	{
		var i;
		for(i=0;i<Gameing.iNearMax;i++)
		{
			if(this.nrs[i].bUseing)this.nrs[i].iPopoDelay=0;
		}
	}
	findnrsbyname( name)
	{
		var i;
		for(i=0;i<Gameing.iNearMax;i++)
		{
			if(this.nrs[i].bUseing && this.nrs[i].sName==name)return this.nrs[i];
		}
		return null;
	}

	constructor( ani)
	{
		super();
		var i;
		Gameing.gameing=this;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		this.pls=new PackageTools(512*1024);
		
		this.m_map=MapManager.gi();
//cxunmz		this.m_map.OpenProject("maps", this.pls);
//		this.m_map.LoadMap("map1.map",50,50);
		
		this.m_dbf=DrawBuffer.gi();
		
		this.me=GmMe.me;
		this.me.iX=50;this.me.iY=50;
		this.me.iRid=0;
//		GmPlay.xani_role1.InitAnimaWithName("站立_1", me.aa);
		
		this.nrs=new Array(Gameing.iNearMax);//
		for(i=0;i<Gameing.iNearMax;i++)
		{
			this.nrs[i]=new NearRole();
		}
		
		this.nb=new NearBy();
		
		this.aa_pos=GmPlay.xani_nui3.InitAnimaWithName("地图坐标", null);
		this.aa_network=GmPlay.xani_nui2.InitAnimaWithName("网络状况", null);
		this.aa_numtime=GmPlay.xani_nui2.InitAnimaWithName("时间", null);
		this.aa_numpos=GmPlay.xani_nui2.InitAnimaWithName("坐标", null);
		
		this.oldhour=0;
		 this.iFStat=0;//无，1按下
		 this.iFDT1=0;this.iFDT2=0;this.iFDT3=0;
	}
	FreshNearRole()
	{
		var i;
		for(i=0;i<Gameing.iNearMax;i++)
		{
			this.nrs[i].bsc=true;
		}
	}
/*画面顺序
 * 地面层
 * 角色+景物+npc+气泡聊天
 * 天空层
右上角UI(头像,血条，队伍按钮，队员头像列表，重置按钮)

点击附近玩家后，出现快捷操作按钮列表

左下公共聊天框

方向盘控制行走

右下角快捷系统按钮

右侧好友列表

物品装备框

别人发的私聊消息

宠物属性页面

人物属性页面
 */
	DrawMapUI()
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		var i,j,k;
		this.aa_pos.Draw(0, 0);//框子
		
		j=GmPlay.xntf.NetBusy();//网络条
		for(i=j;i<j+5;i++)
		{
			if(i<5)k=0;
			else if(i<9)k=i-4;
			else k=4;
			this.aa_network.iFrame= k;
			this.aa_network.Draw((i-j)*23, 0);
		}
		
		//地图名字
		this.pm3f.DrawText_2(59, 42, MapManager.gi().mapdata.sMapDetail, 0xffffffff, 20, 101, 1, 1, 0, -2, -2,1,0xff000000);
//		this.aa_numtime.iFrame=10;//冒号
//		this.aa_numtime.Draw(59-17, 23);
//		this.aa_numtime.Draw(59+17, 23);
		M3DFast.gi().DrawTextEx(59-17,17,":",0xffffffff,20,101,1,1,0,-2,-2);
		M3DFast.gi().DrawTextEx(59+17,17,":",0xffffffff,20,101,1,1,0,-2,-2);
		
		//画时间
		i= parseInt((GmPlay.iNowMillis-GmMe.iMillis)/1000);
		
		j=GmMe.iTime[2]+i%60;
//		GmPlay.sop("j="+j+",GmMe.iTime[2]="+GmMe.iTime[2]+",i="+(i%60));
		k=(j>=60)?1:0;
//		DrawXY(59+35,23,14,j%60,this.aa_numtime,true);
		j=j%60;
		M3DFast.gi().DrawTextEx(59+35,17,""+parseInt(j/10)+(j%10),0xffffffff,20,101,1,1,0,-2,-2);
		
		j=GmMe.iTime[1]+parseInt(i/60)%60+k;
		k=(j>=60)?1:0;
//		DrawXY(59,23,14,j%60,this.aa_numtime,true);
		j=j%60;
		M3DFast.gi().DrawTextEx(59,17,""+parseInt(j/10)+(j%10),0xffffffff,20,101,1,1,0,-2,-2);

		j=GmMe.iTime[0]+parseInt(i/60/60)+k;
//		DrawXY(59-35,23,14,j%24,this.aa_numtime,true);
		j=j%24;
		M3DFast.gi().DrawTextEx(59-35,17,""+parseInt(j/10)+(j%10),0xffffffff,20,101,1,1,0,-2,-2);
		if(this.oldhour==23 && j==0)
		{//清除背包中的五行本源
			for(var m=0;m<20;m++)
			{
				if(MyGoods.gi().goods[2][m].iGid>0 && MyGoods.gi().goods[2][m].iTid>=347 && MyGoods.gi().goods[2][m].iTid<=351)MyGoods.gi().goods[2][m].iGid=-1;
				if(MyGoods.gi().goods[3][m].iGid>0 && MyGoods.gi().goods[3][m].iTid>=347 && MyGoods.gi().goods[3][m].iTid<=351)MyGoods.gi().goods[3][m].iGid=-1;
			}
		}
		this.oldhour=j;

//		this.aa_numpos.iFrame=10;
//		this.aa_numpos.Draw(59-40, 75);
//		this.aa_numpos.iFrame=11;
//		this.aa_numpos.Draw(59+19, 75);
		M3DFast.gi().DrawTextEx(59,69,":",0xffffff00,20,101,1,1,0,-2,-2);
//		this.aa_numpos.iFrame=12;
//		this.aa_numpos.Draw(59, 75);//坐标
//		DrawXY(59-30,75,12,GmMe.me.iX/16,this.aa_numpos,false);
//		DrawXY(59+30,75,12,GmMe.me.iY/16,this.aa_numpos,false);
		M3DFast.gi().DrawTextEx(59-30,69,""+parseInt(GmMe.me.iX/16),0xffffff00,20,101,1,1,0,-2,-2);
		M3DFast.gi().DrawTextEx(59+30,69,""+parseInt(GmMe.me.iY/16),0xffffff00,20,101,1,1,0,-2,-2);

//		GmPlay.xani_ui2.DrawAnima_aa(50, 40, aa_xy.iAnimaPoint,10);
//		DrawXY(25,40,GmMe.me.iX/16);
//		DrawXY(25+50,40,GmMe.me.iY/16);
		
		
//		this.pm3f.DrawTextEx(50, 28, "X:"+GmMe.me.iX/16+",Y:"+GmMe.me.iY/16, 0xffffffff, 16, 101, 1, 1, 0, -2, 0);
//		GmPlay.sop("MapManager.gi().vbk.iGoToNpcId=="+MapManager.gi().vbk.iGoToNpcId);
//		Calendar c = Calendar.getInstance();
//		var hour = c.get(Calendar.HOUR_OF_DAY);
//		var minute = c.get(Calendar.MINUTE);
//		var second = c.get(Calendar.SECOND);
//		this.pm3f.DrawTextEx(100, 0,""+hour+":"+minute+":"+second, 0xffffffff, 16, 101, 1, 1, 0, 0, 0);
	}
	

	Draw()
	{
		var i,j,k;
//		GmPlay.sop("aaaaaa");
//		this.pm3f.FillRect_2D(0, 0, this.pm3f.imf.SCRW, this.pm3f.imf.SCRH, 0xff000000);

//GmPlay.sop("bbbbbb");
		//////////////////////////////////////////////////////////////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~地图开始
//		SystemOperate.iScreenLS=0;
		// SystemOperate.SetScreenMode(10);
		if(MapManager.gi().bMapLoaded)this.m_map.mto(this.me.iX,this.me.iY);

		if(MapManager.gi().bMapLoaded)this.m_map.DrawGround();
//		SystemOperate.SetScreenMode(10);
		if(XFight.bFighting)
		{//战斗中
			MapManager.gi().iMapChangeing=0;
			if(MapManager.gi().bMapLoaded)this.m_map.DrawMiddleDirect();
			SystemOperate.SetScreenMode(11);
			XFight.gi().Draw_UI1();
			SystemOperate.SetScreenMode(10);
			XFight.gi().Draw();
			SystemOperate.SetScreenMode(11);
			XFight.gi().Draw_UI2();
			
			PublicChat_SmallFrame.gi().Draw();//公聊
			
			this.DrawMapUI();
			AutoFightFrame.aff.Draw();
			this.me.TeamFollow();
			
			PublicChat_BigFrame.gi().Draw();
			PrivateChatWatch.gi().Draw();//看别人发来的消息
			
			ExtendButton.peb.Draw(2);

			this.me.DrawExp();
			
			if(XFight.gi().iAlphaEffect>=GmConfig.SCRW || XFight.gi().iFightStat!=300)return;
			SystemOperate.SetScreenMode(10);
		}
		/////////////////////////////////////////////
		this.m_dbf.ClearBuffer();
		if(MapManager.gi().bMapLoaded)this.m_map.DrawMiddle(this.m_dbf);//地图中间层

		//画主角自己
		this.me.Draw();
		ShowPath.psp.Draw();

		this.me.next(this.m_map.mfy.iPath,this.m_map.mfy.iPathDeep);//走路

		if(GmConfig.bDebug)
		{
			for(i=1;i<this.m_map.mfy.iPathDeep;i++)
			{
				M3DFast.gi().DrawLine(MapManager.gi().iOffx+this.m_map.mfy.iPath[i][0], MapManager.gi().iOffy+this.m_map.mfy.iPath[i][1],
						MapManager.gi().iOffx+this.m_map.mfy.iPath[i-1][0], MapManager.gi().iOffy+this.m_map.mfy.iPath[i-1][1], 0xffff0000);
			}
			if(MapManager.gi().bMapLoaded)MapManager.gi().mfy.Draw();
		}

		this.me.TeamFollow();

		//画附近玩家
		this.iNearRoleCount=0;
		for(i=0;i<Gameing.iNearMax;i++)
		{
			if(this.nrs[i].bUseing)
			{
				this.nrs[i].Go();
				this.nrs[i].Draw();
				this.iNearRoleCount++;
			}
		}
		
		this.m_dbf.SortAndDraw();
		FireworksEffect.fe.Draw();
		/////////////////////////////////////////////
		if(MapManager.gi().bMapLoaded)this.m_map.DrawSky();

		SystemOperate.SetScreenMode(11);
		/////////////////////////////////////////////////////////////////////////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~地图结束
		this.me.DrawUI();//右上角头像，血条，队伍人员等

		this.DrawMapUI();//左上角

		this.nb.Draw();//对其他玩家快捷操作

		PublicChat_SmallFrame.gi().Draw();//左下公共聊天框
		SteeringWheel.sw.Draw();//方向盘控制行走

		FastButton.gi().Draw();//右下角快捷按钮
		FriendList.gi().Draw();//好友列表
		MissionLead.gi().Draw();
//		MyGoods.gi().Draw();//物品，装备框
		

//		if(PrivateChat.pc.bShow)PrivateChat.pc.Draw();
		PrivateChatWatch.gi().Draw();//看别人发来的消息
	//	GmPlay.sop(""+PrivateChatWatch.gi().iMessageCount);

//		M3DFast.gi().SetViewClip(10, 10, 100, 100);
//		M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0xffffffff);
//		M3DFast.gi().DrawTextEx(0, 0, "大家好", 0xffff0000, 50, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().NoClip();
//		M3DFast.gi().DrawImageEx(0, 0, 0, trid, 0, 0, 1000, 1000, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawImageEx(0, 0, 0, 2, 0, 0, 500, 500, 101, 1, 1, 0, 0, 0);
		if(Gameing.iFindWayOnce>0)Gameing.iFindWayOnce--;

//		this.pm3f.DrawText(0, 0, "Gameing"+MapManager.gi().mapdata.iMapWidth+","+MapManager.gi().mapdata.iMapHeight, 0xffffffff);
//		this.pm3f.DrawText(0, 30, "["+GmMe.me.iX+","+GmMe.me.iY, 0xffffffff);
//		this.pm3f.DrawText(0, 30, MapManager.gi().mapdata.sMapName+"("+GmMe.me.iX+","+GmMe.me.iY+")", 0xffffffff);

//		MyPets.mp.Draw();
		
		if(MySell.gi().bSelling)MySell.gi().Draw();
		if(MyBuy.gi().bBuying)MyBuy.gi().Draw();
		
		TmpGoods.Draw();
		MyAI.gi().Draw();
		if(TeamCreate.iWaitingApplyMapId>0 && TeamCreate.iWaitingApplyMapId==MapManager.gi().iCurrentMapId)
		{
			TeamCreate.iWaitingApplyMapId=0;
			GmProtocol.gi().s_TeamOperate(3, TeamCreate.iWaitingApplyRid, 0);
		}
		AutoFightFrame.aff.Draw();

		GamePost.gi().Draw();
		
		
		

		Gameing.iTopIconOffX=130;
		LeaderBoard.lb.Draw();
		FiveGift.fg.Draw();
		LoginGift.lg.Draw();
		FirstCharge.fg.Draw();
		StrengthUpgrade.su.Draw();
		
		if(this.iFStat==1)
		{
			this.iFDT2=XDefine.get_ms();
			
			if(this.iFDT2-this.iFDT1>500)
			{//按下超过500ms，行走
				this.iFDT1=this.iFDT2;
				this.goon(this.iFX,this.iFY);
//				GmPlay.sop("x="+this.iFX+",,,y="+this.iFY);
			}
		}
		PublicChat_BigFrame.gi().Draw();
		ExtendButton.peb.Draw(1);
		this.m_map.vbk.mapdialog.Draw();
		
		MissionFinish.mf.Draw();
		UpgradeEffect.ue.Draw();
		
		this.me.DrawExp();
//		GmPlay.xani_skill.DrawAnima(300,300, "地阵_右",0);
//		GmPlay.sop("flag="+MapManager.gi().vbk.iGoToNpcFlag+",id="+MapManager.gi().vbk.iGoToNpcId);
//		GmPlay.xani_skill.DrawAnimaEx(500, 200, "火流星_左",GmPlay.iDelay/10,101,1,1,0,-1,-1);aas
		JQMode.jq.JQLogic();
		
//		GmPlay.sop("SystemOperate.iPictureQuality="+SystemOperate.iPictureQuality+","+SystemOperate.iPictureBuffer);
	}

	ProcTouch( msg, x, y)
	{
		if(JQMode.jq.ProcTouch(msg, x, y))return true;
		
		if(AutoFightFrame.aff.ProcTouch(msg, x, y))return true;
		if(XFight.bFighting)
		{
			if(ExtendButton.peb.ProcTouch(2,msg, x, y))return true;
			if(PrivateChatWatch.gi().ProcTouch(msg, x, y))return true;
			if(PublicChat_BigFrame.gi().ProcTouch(msg, x, y))return true;
			if(PublicChat_SmallFrame.gi().ProcTouch(msg, x, y))return true;
			//////////////////////////////////////////////////////////////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~地图开始
			//SystemOperate.SetScreenMode(10);
			//oldx=x;oldy=y;x=TouchManager._swapx(x);y=TouchManager._swapy(y);
			XFight.gi().ProcTouch(msg, x, y);
			//x=oldx;y=oldy;
			//SystemOperate.SetScreenMode(11);
			if(XFight.gi().iFightStat>=100)
			{
				if(FriendList.gi().ProcTouch(msg, x, y))return true;
			}
			return true;
		}
		
		if(XStat.gi().iXStat==XStat.GS_GAMEING)
		{
			if(FastGoods.gi().ProcTouch(msg,x,y))return true;
		}
		if(this.m_map.vbk.mapdialog.ProcTouch(msg,x,y))
		{
			//回答对话框选项
			return true;
		}
		if(ExtendButton.peb.ProcTouch(1,msg, x, y))return true;
		if(PrivateChatWatch.gi().ProcTouch(msg, x, y))return true;//私聊窗口
		if(PublicChat_BigFrame.gi().ProcTouch(msg, x, y))return true;
		
		var i,j;
		var oldx,oldy;
		var ox=MapManager.gi().iOffx;
		var oy=MapManager.gi().iOffy;
		
		oldx=x;oldy=y;//x=TouchManager._swapx(x);y=TouchManager._swapy(y);
		if(msg==2 && this.iFStat==1)
		{
			this.iFDT2=XDefine.get_ms();
			
			if(this.iFDT2-this.iFDT1>50 && this.iFDT2-this.iFDT3>500)
			{//按下超过500ms，行走
				this.iFDT1=this.iFDT2;
				this.iFX=x;this.iFY=y;
				this.goon(x,y);
			}
			return true;
		}
		if(msg==3 && this.iFStat==1)
		{
			this.iFStat=0;
			this.iFDT2=XDefine.get_ms();
			if(this.iFDT2-this.iFDT3<500)
			{//快速点击才打开
				if(MapManager.gi().vbk.GoToNpc(x-this.m_map.iOffx,y-this.m_map.iOffy))
				{//按在npc身上
					if((MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway()) && !MySell.gi().bSelling)
					{//不在队里	或		自己是队长
//						MyAI.gi().FindNpc(MapManager.gi().vbk.iLockNpcId);
						x=MapManager.gi().vbk.iNpcX+this.m_map.iOffx;
						y=MapManager.gi().vbk.iNpcY+this.m_map.iOffy;

						if(this.m_map.mfy.findway(this.me.iX,this.me.iY,x-this.m_map.iOffx,y-this.m_map.iOffy))
						{
							if(this.m_map.mfy.checkagain())
							{
								this.me.start(this.m_map.mfy.iPath,this.m_map.mfy.iPathDeep);
								
								TouchEffect.te.Add(x-this.m_map.iOffx,y-this.m_map.iOffy);
							}
						}
						this.nb.Clear();
					}
				}
				else
				{
					this.nb.Clear();
					if(MySell.gi().bSelling)
					{//自己的摊位
					}
					for(i=0;i<Gameing.iNearMax;i++)
					{//判断选中其他玩家,弹出快捷菜单，对其操作
						if(this.nrs[i].bUseing)
						{
							if(SystemOperate.bShowRole || MyTeam.bInTmpTeam(this.nrs[i].iRid))
							{
								if(GmPlay.xani_newrole[this.nrs[i].iRace*2+this.nrs[i].iSex].bInAnima(this.nrs[i].aa_body, ox+this.nrs[i].iX, oy+this.nrs[i].iY, x, y) || XDefine.bInRect(x-this.m_map.iOffx,y-this.m_map.iOffy,this.nrs[i].iX-20,this.nrs[i].iY-60,40,60))
								{
									GmPlay.sop("ppp===="+this.nrs[i].aa_body.iAnimaPoint);
									if(this.nrs[i].iIsLeader==1)this.nb.Add(2,this.nrs[i].sName,this.nrs[i]);//队长
									else this.nb.Add(4,this.nrs[i].sName,this.nrs[i]);//非队长
								}
							}
						}
					}
					if(SystemOperate.bShowSell)
					{
						for(i=0;i<Gameing.iNearMax;i++)
						{//判断选中其他玩家,弹出快捷菜单，对其操作
							if(this.nrs[i].bUseing && XDefine.bInRect(x, y, ox+this.nrs[i].iX-this.nrs[i].iSellWidth/2, oy+this.nrs[i].iY-140, this.nrs[i].iSellWidth, 40))
							{
								if(this.nrs[i].iIsSelling==1)this.nb.Add(3,this.nrs[i].sSellName,this.nrs[i]);//点中摊位
							}
						}
					}
					if(this.nb.iSelectCount==0)
					{//什么都没按到的话，直接行走
						this.goon(x,y);
					}
				}
			}
			else this.goon(x,y);
			return true;
		}
		x=oldx;y=oldy;
		
		if(LeaderBoard.lb.ProcTouch(msg, x, y))return true;
		if(FirstCharge.fg.ProcTouch(msg, x, y))return true;
		if(FiveGift.fg.ProcTouch(msg, x, y))return true;
		if(LoginGift.lg.ProcTouch(msg, x, y))return true;
		if(StrengthUpgrade.su.ProcTouch(msg, x, y))return true;
		if(GamePost.gi().ProcTouch(msg, x, y))return true;

		if(MyAI.gi().ProcTouch(TouchManager.gi().procing.iTouchStat,TouchManager.gi().procing.iX,TouchManager.gi().procing.iY))return true;
		if(TmpGoods.ProcTouch(msg, x, y))return true;

		if(MyBuy.gi().bBuying)
		{
			MyBuy.gi().ProcTouch(msg,x,y);
			return true;
		}
		if(MySell.gi().bSelling && MySell.gi().bShow)
		{//摆摊页面无法做其他任何操作
			MySell.gi().ProcTouch(msg, x, y);
			return true;
		}

		if(this.me.ProcTouch_AttFrame(msg, x, y))return true;//人物属性，宠物属性
//		if(MyGoods.gi().ProcTouch(msg, x, y))return true;//物品栏
//		GmPlay.sop("111111111111");
//		if(PrivateChat.pc.bShow)
//		{
//			if(PrivateChat.pc.ProcTouch(msg, x, y))return true;
//		}
//		GmPlay.sop("222222222222222222");
		if(FriendList.gi().ProcTouch(msg, x, y))return true;//右边好友列表
		if(PublicChat_SmallFrame.gi().ProcTouch(msg, x, y))return true;
		if(ProgressBar.gi().bShow)return true;

		if(MissionLead.gi().ProcTouch(msg, x, y))return true;//快捷任务指引
		
		if(FastButton.gi().ProcTouch(msg,x,y))return true;//右下快捷菜单
//		GmPlay.sop("3333333333");
		if(SteeringWheel.sw.ProcTouch(msg,x,y))return true;

		if(this.me.ProcTouch(msg, x, y))return true;
		if(this.nb.ProcTouch(msg, x, y))return true;//附近玩家快捷菜单
		
//		x= ((x*GmConfig.SCRH)/GmConfig.REALW);
//		y= ((y*GmConfig.SCRW)/GmConfig.REALH);
		//////////////////////////////////////////////////////////////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~地图开始
		//SystemOperate.SetScreenMode(10);
		oldx=x;oldy=y;//x=TouchManager._swapx(x);y=TouchManager._swapy(y);
//		GmPlay.sop("x="+x+",,,,,,y="+y+",,,,,oldy="+oldy+",,,,,,mxh="+SystemOperate.MAXH+",,,,,,,sysh="+GmConfig.SYSH);
		MyAI.gi().bFinding=false;//停止自动寻路
		////开始判断行走----------------------------------------------------
		if(msg==1)
		{//按下，空地上的话马上行走，否则记录按下时间，等待
			if(MapManager.gi().vbk.bOnNpc(x-this.m_map.iOffx,y-this.m_map.iOffy))
			{//按在npc身上
			}
			else
			{
				this.nb.Clear();
				if(MySell.gi().bSelling)
				{//自己的摊位
				}
				j=0;
				for(i=0;i<Gameing.iNearMax;i++)
				{//判断选中其他玩家,弹出快捷菜单，对其操作
					if(this.nrs[i].bUseing)
					{
						if(SystemOperate.bShowRole || MyTeam.bInTmpTeam(this.nrs[i].iRid))
						{
							if(GmPlay.xani_newrole[this.nrs[i].iRace*2+this.nrs[i].iSex].bInAnima(this.nrs[i].aa_body, ox+this.nrs[i].iX, oy+this.nrs[i].iY, x, y) || XDefine.bInRect(x-this.m_map.iOffx,y-this.m_map.iOffy,this.nrs[i].iX-20,this.nrs[i].iY-60,40,60))
							{
								j++;
							}
						}
					}
				}
				if(SystemOperate.bShowSell)
				{
					for(i=0;i<Gameing.iNearMax;i++)
					{//判断选中其他玩家,弹出快捷菜单，对其操作
						if(this.nrs[i].bUseing && XDefine.bInRect(x, y, ox+this.nrs[i].iX-this.nrs[i].iSellWidth/2, oy+this.nrs[i].iY-140, this.nrs[i].iSellWidth, 40))
						{
							j++;
						}
					}
				}
				if(j==0)
				{//什么都没按到的话，直接行走
					this.goon(x,y);
				}
			}
			this.iFStat=1;
			this.iFX=x;this.iFY=y;
			this.iFDT1=XDefine.get_ms();
			this.iFDT3=XDefine.get_ms();
		}
		x=oldx;y=oldy;
		//SystemOperate.SetScreenMode(11);
		
		if(1==1)
		{
			return false;
		}
		i=0;
		if(MapManager.gi().vbk.GoToNpc(x-this.m_map.iOffx,y-this.m_map.iOffy))
		{//判断是否点击npc，走向npc
//			x=MapManager.gi().vbk.iNpcX+this.m_map.iOffx;
//			y=MapManager.gi().vbk.iNpcY+this.m_map.iOffy;
			i=1;
			this.nb.Clear();
		}
		if(i==0)
		{
			this.nb.Clear();
//			if(GmPlay.xani_role[GmMe.me.iRace*2+GmMe.me.iSex].bInAnima(me.aa_body, ox+me.iX, oy+me.iY, x, y))
//			{//点中自己，加入列表
//				this.nb.Add(1, me.sName, me);
//			}
			if(MySell.gi().bSelling)
			{//自己的摊位
			}

			for(i=0;i<Gameing.iNearMax;i++)
			{//判断选中其他玩家,弹出快捷菜单，对其操作
				if(this.nrs[i].bUseing)
				{
					if(SystemOperate.bShowRole || MyTeam.bInTmpTeam(this.nrs[i].iRid))
					{
						if(GmPlay.xani_newrole[this.nrs[i].iRace*2+this.nrs[i].iSex].bInAnima(this.nrs[i].aa_body, ox+this.nrs[i].iX, oy+this.nrs[i].iY, x, y) || XDefine.bInRect(x-this.m_map.iOffx,y-this.m_map.iOffy,this.nrs[i].iX-20,this.nrs[i].iY-60,40,60))
						{
							if(this.nrs[i].iIsLeader==1)this.nb.Add(2,this.nrs[i].sName,this.nrs[i]);//队长
							else this.nb.Add(4,this.nrs[i].sName,this.nrs[i]);//非队长
						}
					}
				}
			}
			if(SystemOperate.bShowSell)
			{
				for(i=0;i<Gameing.iNearMax;i++)
				{//判断选中其他玩家,弹出快捷菜单，对其操作
					if(this.nrs[i].bUseing && XDefine.bInRect(x, y, ox+this.nrs[i].iX-this.nrs[i].iSellWidth/2, oy+this.nrs[i].iY-140, this.nrs[i].iSellWidth, 40))
					{
						if(this.nrs[i].iIsSelling==1)this.nb.Add(3,this.nrs[i].sSellName,this.nrs[i]);//点中摊位
					}
				}
			}
		}
		MyAI.gi().bFinding=false;
		if(this.nb.iSelectCount==0 && Gameing.iFindWayOnce<=0 && !MySell.gi().bSelling)//地图行走
		{
			Gameing.iFindWayOnce=1;
			if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
			{//没队伍，或是队长，才能走
				i=0;
				if(MapManager.gi().vbk.GoToNpc(x-this.m_map.iOffx,y-this.m_map.iOffy))
				{//判断是否点击npc，走向npc
					x=MapManager.gi().vbk.iNpcX+this.m_map.iOffx;
					y=MapManager.gi().vbk.iNpcY+this.m_map.iOffy;
					i=1;
				}
				if(this.m_map.mfy.findway(this.me.iX,this.me.iY,x-this.m_map.iOffx,y-this.m_map.iOffy))
				{
//					GmPlay.sop("check again start");
					if(this.m_map.mfy.checkagain())
					{
//						GmPlay.sop("check again end1");
//					GmPlay.sop("From"+me.iX+","+me.iY+"To"+(x-this.m_map.iOffx)+","+(y-this.m_map.iOffy));
//					for(i=0;i<this.m_map.mfy.iPathDeep;i++)
//					{
//						GmPlay.sop("path:"+i+",x:"+this.m_map.mfy.iPath[i][0]+",y:"+this.m_map.mfy.iPath[i][1]);
//					}
						if(i==0)
						{
							MapManager.gi().vbk.iGoToNpcFlag=-1;
							MapManager.gi().vbk.iGoToNpcId=-1;
						}
						this.me.start(this.m_map.mfy.iPath,this.m_map.mfy.iPathDeep);
					}
	//				else GmPlay.sop("check again end2");
				}
				else
				{
					SteeringWheel.sw.bLocked=true;
					SteeringWheel.sw.iLockX=x-(MapManager.gi().iOffx+GmMe.me.iX)+SteeringWheel.sw.iX;
					SteeringWheel.sw.iLockY=y-(MapManager.gi().iOffy+GmMe.me.iY)+SteeringWheel.sw.iY;
					SteeringWheel.sw.bAutoRun=true;
				}
			}
		}
//		ChatFrame.chat.AddMessage(0, 0, "你好", "谢谢"+GmPlay.iDelay);
		return false;
	}

	
	 goon( x, y)
	{
		if(Gameing.iFindWayOnce>0)return;
		Gameing.iFindWayOnce++;
		if(!MySell.gi().bSelling)
		{
			if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
			{//没队伍，或是队长，才能走
				if(this.m_map.mfy.findway(this.me.iX,this.me.iY,x-this.m_map.iOffx,y-this.m_map.iOffy))
				{
					if(this.m_map.mfy.checkagain())
					{
						MapManager.gi().vbk.iGoToNpcFlag=-1;
						MapManager.gi().vbk.iGoToNpcId=-1;
						this.me.start(this.m_map.mfy.iPath,this.m_map.mfy.iPathDeep);
						SteeringWheel.sw.bLocked=false;
						SteeringWheel.sw.bAutoRun=false;
						
						TouchEffect.te.Add(x-this.m_map.iOffx,y-this.m_map.iOffy);
					}
				}
				else
				{
					SteeringWheel.sw.bLocked=true;
					SteeringWheel.sw.iLockX=x-(MapManager.gi().iOffx+GmMe.me.iX)+SteeringWheel.sw.iX;
					SteeringWheel.sw.iLockY=y-(MapManager.gi().iOffy+GmMe.me.iY)+SteeringWheel.sw.iY;
					SteeringWheel.sw.bAutoRun=true;
				}
			}
		}
	}
}

	Gameing.iNearMax=50;

	Gameing.iFindWayOnce=0;
	
	Gameing.bSheildRoles=false;//屏蔽所有其他玩家
	Gameing.bSheildUis=false;//屏蔽所有UI
	
	Gameing.iTopIconOffX;