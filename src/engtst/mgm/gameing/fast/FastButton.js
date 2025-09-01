
import GameVersion from "../../../../zero/Interface/GameVersion"
import MapManager from "../../../../map/MapManager"
import StarEffect from "../../../../mgm/newmainmenu/StarEffect"
import GmConfig from "../../../../config/GmConfig"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import TestRun from "../../../../engine/xms/TestRun"
import XmsEngine from "../../../../engine/xms/XmsEngine"
import X_FIRST from "../../../../engine/xms/first/X_FIRST"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../engtst/mgm/History/XRecordFast"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import AQStart from "../../../../engtst/mgm/gameing/afternoonquestion/AQStart"
import MyFuBen from "../../../../engtst/mgm/gameing/fuben/MyFuBen"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import JQMode from "../../../../engtst/mgm/gameing/help/JQMode"
import MainHelp from "../../../../engtst/mgm/gameing/help/MainHelp"
import ExtHelp from "../../../../engtst/mgm/gameing/help/ExtHelp/ExtHelp"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MissionFrame from "../../../../engtst/mgm/gameing/me/mission/MissionFrame"
import MyMounts from "../../../../engtst/mgm/gameing/me/mounts/MyMounts"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import MyTeam from "../../../../engtst/mgm/gameing/me/team/MyTeam"
import TeamCreate from "../../../../engtst/mgm/gameing/me/team/TeamCreate"
import TeamOperate from "../../../../engtst/mgm/gameing/me/team/TeamOperate"
import PublicInterface from "../../../../zero/Interface/PublicInterface";
    
export default class FastButton{
//	StarEffect se;

	constructor()
	{
		this.bShow=false;

		this.iTeamButtonDelay=0;
		this.bRequestFlash=false;

		this.btn_oc=new XButtonEx2(GmPlay.xani_frame);
		this.btn_oc.InitButton("右下底框72_72");

		this.bOpening=false;
		this.bCloseing=false;
		this.iModifyX=0;

		this.btn_list1=new Array(8);//
		this.btn_list2=new Array(3);//
		this.btn_list3=new Array(5);//

		this.btn_team=new XButtonEx2(GmPlay.xani_icon);
		this.btn_team.InitButton("队伍");
		this.btn_fast=new XButtonEx2(GmPlay.xani_icon);
		this.btn_fast.InitButton("快捷");

		this.btn_bag=new XButtonEx2(GmPlay.xani_icon);
		this.btn_bag.InitButton("背包");
		this.btn_mission=new XButtonEx2(GmPlay.xani_icon);
		this.btn_mission.InitButton("任务");
		this.btn_gov=new XButtonEx2(GmPlay.xani_icon);
		this.btn_gov.InitButton("帮派");
		this.btn_mounts=new XButtonEx2(GmPlay.xani_icon);
		this.btn_mounts.InitButton("坐骑");
		this.btn_fuben=new XButtonEx2(GmPlay.xani_icon);
		this.btn_fuben.InitButton("副本");
		this.btn_system=new XButtonEx2(GmPlay.xani_icon);
		this.btn_system.InitButton("系统");

		var offx=0;
		if(PublicInterface.gi().iLHX>0)offx=PublicInterface.gi().iLHX;
		this.btn_act=new XButtonEx2(GmPlay.xani_icon);
		this.btn_act.Move(5+offx,90, 72, 72);
		this.btn_act.InitButton("活动");
		this.btn_mall=new XButtonEx2(GmPlay.xani_icon);
		this.btn_mall.Move(5+offx,90+79+10, 72,72);
		this.btn_mall.InitButton("商城");
		this.btn_aq=new XButtonEx2(GmPlay.xani_icon);
		this.btn_aq.Move(5+offx,90+79+10+79+10, 72,72);
		this.btn_aq.InitButton("答题图标");
		this.btn_aq.sAnimaName="答题";
		this.btn_help=new XButtonEx2(GmPlay.xani_icon);
		this.btn_help.Move(5+offx,90+79+10+79+10, 72,72);
		this.btn_help.InitButton("帮助");
		this.btn_qq=new XButtonEx2(GmPlay.xani_icon);
		this.btn_qq.Move(5+offx,90+79+10+79+10, 72,72);
		this.btn_qq.InitButton("引导");

		this.bCloseing=false;
		this.bOpening=true;
		this.bShow=true;
		this.iModifyX=0;

		this.aa_effect=GmPlay.xani_skill.InitAnimaWithName("起死回生_右",null);

		this.btn_list2[0]=this.btn_fast;
		this.btn_list2[1]=this.btn_team;
		this.iBtnCount2=2;

//		this.se=new StarEffect();
//		this.se.Init3(0, 0, 37, 50);
	}
	Draw()
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(this.bOpening)
		{
			this.iModifyX+=15;
			if(this.iModifyX>=FastButton.MODIFYW)
			{
				this.iModifyX=FastButton.MODIFYW;
				this.bOpening=false;
			}
		}
		if(this.bCloseing)
		{
			this.iModifyX-=15;
			if(this.iModifyX<0)
			{
				this.iModifyX=0;
				this.bCloseing=false;
				this.bShow=false;
			}
		}
		var i=0;
		var wsize=22;
//		this.btn_mall.Move(GmConfig.SCRW-80, 90, 80, 80);
//		this.btn_mall.Draw();
//		M3DFast.gi().DrawText_2(this.btn_mall.iX+40, this.btn_mall.iY+80, this.btn_mall.sAnimaName, 0xffffffff, wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);

		if(this.bShow)
		{
			if(this.iTeamButtonDelay>0)this.iTeamButtonDelay--;
			
			this.btn_list1[i++]=this.btn_system;
			if(GmMe.me.rbs.iLev>=40)this.btn_list1[i++]=this.btn_fuben;
			if(GmMe.me.rbs.iLev>=30)this.btn_list1[i++]=this.btn_mounts;
			if(GmMe.me.rbs.iLev>=20)this.btn_list1[i++]=this.btn_gov;
			this.btn_list1[i++]=this.btn_mission;
			this.btn_list1[i++]=this.btn_bag;
			this.iBtnCount1=i;
			
			for(i=0;i<this.iBtnCount1;i++)
			{
				this.btn_list1[i].Move(GmConfig.SCRW-80-this.iModifyX*(i+1),GmConfig.SCRH-84, 72, 72);
			}
			for(i=0;i<this.iBtnCount1;i++)
			{
				this.btn_list1[i].Draw();
				M3DFast.gi().DrawText_2(this.btn_list1[i].iX+36, this.btn_list1[i].iY+71, this.btn_list1[i].sAnimaName, 0xfffdf5e8, wsize, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
			}
			for(i=0;i<this.iBtnCount2;i++)
			{
				this.btn_list2[i].Move(GmConfig.SCRW-80,GmConfig.SCRH-80-this.iModifyX*(i+1), 72, 72);
			}
			if (this.bRequestFlash && GmPlay.iDelay / 2 % 2 == 0)this.btn_team.Move(this.btn_team.iX+2,this.btn_team.iY+2, 72, 72);
			for(i=0;i<this.iBtnCount2;i++)
			{
				this.btn_list2[i].Draw();
				M3DFast.gi().DrawText_2(this.btn_list2[i].iX+36, this.btn_list2[i].iY+71, this.btn_list2[i].sAnimaName, 0xfffdf5e8, wsize, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
			}
		}
		this.btn_oc.Move(GmConfig.SCRW-80,GmConfig.SCRH-84, 72, 72);
		this.btn_oc.Draw();
		GmPlay.xani_icon.DrawAnimaEx(GmConfig.SCRW-80-12, GmConfig.SCRH-84-12, "开关箭头",0, 101, 1, 1, 180-this.iModifyX*180/FastButton.MODIFYW, -2,-2);
//		GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW-80, GmConfig.SCRH-80, "开关高光",0, 101, 1, 1, 0,0,0);
		/*
		if(GmMe.me.rbs.iLev<20)
		{
			this.aa_effect.Draw(this.btn_help.iX+30, this.btn_help.iY+70);
		}
		this.aa_effect.Draw(this.btn_act.iX+30, this.btn_act.iY+70);
		this.aa_effect.NextFrame();
		*/
//		this.se.Logic();
//		if(GmMe.me.rbs.iLev<20)this.se.Draw(this.btn_help.iX+37, this.btn_help.iY+37);
//		this.btn_help.Draw();
		
		this.btn_list3[0]=this.btn_act;
		this.btn_list3[1]=this.btn_mall;
		this.btn_list3[2]=this.btn_help;
		this.iBtnCount3=3;
		if(AQStart.bShow)
		{
			this.btn_list3[3]=this.btn_aq;
			this.iBtnCount3++;
		}
		var offx=0;
		if(PublicInterface.gi().iLHX>0)offx=PublicInterface.gi().iLHX;
		for(i=0;i<this.iBtnCount3;i++)
		{
			this.btn_list3[i].Move(5+offx,90+89*i, 72, 72);
			this.btn_list3[i].Draw();
			M3DFast.gi().DrawText_2(this.btn_list3[i].iX+36, this.btn_list3[i].iY+71, this.btn_list3[i].sAnimaName, 0xfffdf5e8, wsize, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
		}
/*		this.btn_act.Draw();
		M3DFast.gi().DrawText_2(this.btn_act.iX+40, this.btn_act.iY+80, this.btn_act.sAnimaName, 0xffffffff, wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);
		this.btn_mall.Draw();
		M3DFast.gi().DrawText_2(this.btn_mall.iX+40, this.btn_mall.iY+80, this.btn_mall.sAnimaName, 0xffffffff, wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);
		if(AQStart.bShow)
		{
			this.btn_aq.Draw();
			M3DFast.gi().DrawText_2(this.btn_aq.iX+40, this.btn_aq.iY+80, "答题", 0xffffffff, wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);
		}*/

		if(ExtHelp.iHead>0 && XRecordFast.iExtHelp!=3)
		{//GmMe.me.rbs.iLev<20 && 
			this.btn_qq.Draw();
			M3DFast.gi().DrawText_2(this.btn_qq.iX+40, this.btn_qq.iY+80, this.btn_qq.sAnimaName, 0xffffffff, wsize, 101, 1, 1, 0, -2, -3,3,0xff000000);
		}
	}
	ProcTouch( msg, x, y)
	{
		if(ExtHelp.iHead>0 && XRecordFast.iExtHelp!=3)
		{
			if(this.btn_qq.ProcTouch(msg, x, y))
			{
				if(this.btn_qq.bCheck())
				{
					ExtHelp.iPrev=ExtHelp.iTall;//指向最后，往前
					ExtHelp.iHead=ExtHelp.iTall;
					ExtHelp.eh=XStat.gi().PushStat(XStat.GS_EXTHELP);
					ExtHelp.PreviousHelp();
				}
				return true;
			}
		}
//		if(this.btn_help.ProcTouch(msg, x, y))
//		{
//			if(this.btn_help.bCheck())
//			{
//				XStat.gi().PushStat(XStat.GS_NOVICEHELP);
//			}
//			return true;
//		}
		if(this.btn_act.ProcTouch(msg, x, y))
		{
			if(this.btn_act.bCheck())
			{
				GmProtocol.gi().s_PromptActivity(0, 0);//请求获得活跃度数据
				XStat.gi().PushStat(XStat.GS_LOADING1);
			}
			return true;
		}
		if(this.btn_mall.ProcTouch(msg, x, y))
		{
			if(this.btn_mall.bCheck())
			{
				GmProtocol.gi().s_IngotMall(0, 0);
			}
			return true;
		}
		if(this.btn_help.ProcTouch(msg, x, y))
		{
			if(this.btn_help.bCheck())
			{
				MainHelp.Open();
			}
			return true;
		}
		if(AQStart.bShow)
		{
			if(this.btn_aq.ProcTouch(msg, x, y))
			{
				if(this.btn_aq.bCheck())
				{
					AQStart.Open();
				}
				return true;
			}
		}

		if(this.btn_oc.ProcTouch(msg, x, y))
		{
			if(this.btn_oc.bCheck())
			{
				if(this.bShow)
				{
					this.bCloseing=true;
					this.bOpening=false;
					this.iModifyX=FastButton.MODIFYW;
				}
				else
				{
					this.bCloseing=false;
					this.bOpening=true;
					this.bShow=true;
					this.iModifyX=0;
				}
			}
			return true;
		}
		if(!this.bShow)return false;
//		public XButtonEx2 this.btn_bag;//背包，
//		public XButtonEx2 this.btn_mission;//任务，
//		XButtonEx2 this.btn_gov;//帮派，20
//		XButtonEx2 this.btn_mounts;//坐骑//坐骑，30
//		XButtonEx2 this.btn_fuben;//副本//副本，40
//		XButtonEx2 this.btn_system;//系统
		if(this.btn_bag.ProcTouch(msg, x, y))
		{
			if(this.btn_bag.bCheck())
			{
//				TestRun.Run(100000, GmPlay.pxe.FindMain("工作项目测试"),new TestRun());
				MyGoods.gi().Open();
			}
			return true;
		}
		if(this.btn_mission.ProcTouch(msg, x, y))
		{
			if(this.btn_mission.bCheck())
			{
//				if(GameVersion.QUDAO==0)XmsEngine.pxe.RunXms(XmsEngine.XS_TESTRUN);//TestRun.Run(100000, GmPlay.pxe.FindMain("工作项目测试"),new TestRun());
//				else 
					MissionFrame.Open(0);
			}
			return true;
		}
		if(GmMe.me.rbs.iLev>=20)
		{
			if(this.btn_gov.ProcTouch(msg, x, y))
			{
				if(this.btn_gov.bCheck())
				{
					if(MyGov.mg.iRealGid==-1)
					{
//						EasyMessage.easymsg.AddMessage("你还未加入帮派");
						GmProtocol.gi().s_NewGovOperate(0,0,0,0,0,"");//获得帮派id列表
						GmProtocol.gi().s_NewGovOperate(2,0,0,0,0,"");//获得已申请列表
//						GmProtocol.gi().s_GetGovList(0);
					}
					else
					{//获得帮派基本信息，打开帮派属性页面
						GmProtocol.gi().s_NewGovOperate(3,0,0,0,0,"");
					}
				}
				return true;
			}
		}
		if(GmMe.me.rbs.iLev>=30)
		{
			if(this.btn_mounts.ProcTouch(msg, x, y))
			{
				if(this.btn_mounts.bCheck())
				{//打开坐骑页面
					if(MyMounts.mm.iMountsCount>0)XStat.gi().PushStat(XStat.GS_MOUNTSFRAME);
					else EasyMessage.easymsg.AddMessage("你还没有坐骑");
				}
				return true;
			}
		}
		if(GmMe.me.rbs.iLev>=40)
		{
			if(this.btn_fuben.ProcTouch(msg, x, y))
			{
				if(this.btn_fuben.bCheck())
				{//打开坐骑页面
					if(MyFuBen.iStat==0)
					{//不在副本中，打开申请表
						GmProtocol.gi().s_FuBen(2,0);
					}
					else if(MyFuBen.iStat==1)
					{//在副本中，打开管理页面
						GmProtocol.gi().s_FuBen(1,0);
					}
					else if(MyFuBen.iStat==2)
					{
						FrameMessage.fm.Open("#cffffff"+MyFuBen.sDetail+"#e#c00ff00"+MyFuBen.sTarget);
					}
				}
				return true;
			}
		}
		if(this.btn_system.ProcTouch(msg, x, y))
		{
			if(this.btn_system.bCheck())
			{
				XStat.gi().PushStat(XStat.GS_SYSTEMOPERATE);
			}
			return true;
		}
		/*
		var i;
		for(i=0;i<this.iBtnCount1;i++)
		{
			if(this.btn_list1[i].ProcTouch(msg, x, y))
			{
				if(this.btn_list1[i].bCheck())
				{
					switch(i)
					{
					case 4://背包，
						MyGoods.gi().Open();
						break;
					case 3://任务，
						MissionFrame.Open();
						break;
					case 2://帮派，
						if(MyGov.mg.iRealGid==-1)EasyMessage.easymsg.AddMessage("你还未加入帮派");
						else
						{
							XStat.gi().PushStat(XStat.GS_GOVFRAME);
						}
						break;
					case 1://商城
						GmProtocol.gi().s_IngotMall(0, 0);
						break;
					case 0://系统
						XStat.gi().PushStat(XStat.GS_SYSTEMOPERATE);
						break;
					}
				}
				return true;
			}
		}*/
		if (this.iTeamButtonDelay == 0)
		{
			if (this.btn_team.ProcTouch(msg, x, y)) 
			{
				if (this.btn_team.bCheck()) 
				{
					if (MyTeam.bNoTeam()) 
					{//没队，打开申请页面cx
						TeamCreate.Open();
//						GmProtocol.gi().s_TeamOperate(0, 0, 0);// 组队
						this.iTeamButtonDelay = 30;
					} 
					else 
					{// 自己在队伍里面,打开队伍操作界面
						var to=XStat.gi().PushStat(XStat.GS_TEAMOPERATE);
						//发送请求，获取附近玩家和申请列表
						GmProtocol.gi().s_TeamOperate(10,0,0);
						if (this.bRequestFlash)
						{// 申请页面
//							((TeamOperate) XStat.gi().LastStat(0)).iModePoint = 1;
							this.bRequestFlash = false;
							to.iPage=1;
						}
						// GmProtocol.gi().s_TeamOperate(1,0);//离开/解散队伍
					}
				}
				return true;
			}
		}
//		if(this.btn_team.ProcTouch(msg, x, y))
//		{
//			if(this.btn_team.bCheck())
//			{//打开队伍界面
//			}
//			return true;
//		}
		if(this.btn_fast.ProcTouch(msg, x, y))
		{
			if(this.btn_fast.bCheck())
			{//打开快捷操作页面
				XStat.gi().PushStat(XStat.GS_FASTOPERATE);
			}
			return true;
		}
		
		return false;
	}
}

FastButton.MODIFYW=85;
FastButton.fb=null;
FastButton.gi=function()
{
	if(FastButton.fb==null)FastButton.fb=new FastButton();
	return FastButton.fb;
}