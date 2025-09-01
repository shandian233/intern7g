
import MapManager from "../../../../map/MapManager"
import SmallMap from "../../../../map/SmallMap"
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import PackageTools from "../../../../engine/PackageTools"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XmsEngine from "../../../../engine/xms/XmsEngine"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import MyAI from "../../../../engtst/mgm/MyAI"
import XStat from "../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../engtst/mgm/History/XRecordFast"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import FrameMessageEx from "../../../../engtst/mgm/frame/message/FrameMessageEx"
import FriendList from "../../../../engtst/mgm/gameing/chat/privatechat/FriendList"
import MakeEquip from "../../../../engtst/mgm/gameing/equip/MakeEquip"
import FastButton from "../../../../engtst/mgm/gameing/fast/FastButton"
import FastOperate from "../../../../engtst/mgm/gameing/fast/FastOperate"
import AutoFightFrame from "../../../../engtst/mgm/gameing/fight/AutoFightFrame"
import XFight from "../../../../engtst/mgm/gameing/fight/XFight"
import XFightGoods from "../../../../engtst/mgm/gameing/fight/XFightGoods"
import XFightRoleSkill from "../../../../engtst/mgm/gameing/fight/XFightRoleSkill"
import ExtHelp from "../../../../engtst/mgm/gameing/help/ExtHelp/ExtHelp"
import AddPoint from "../../../../engtst/mgm/gameing/me/AddPoint"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import xms_AddPoint from "../../../../engtst/mgm/gameing/me/xms_AddPoint"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyGoodsFrame from "../../../../engtst/mgm/gameing/me/goods/MyGoodsFrame"
import MissionFrame from "../../../../engtst/mgm/gameing/me/mission/MissionFrame"
import MissionLead from "../../../../engtst/mgm/gameing/me/mission/MissionLead"
import MyMission from "../../../../engtst/mgm/gameing/me/mission/MyMission"
import MountsFrame from "../../../../engtst/mgm/gameing/me/mounts/MountsFrame"
import MyMounts from "../../../../engtst/mgm/gameing/me/mounts/MyMounts"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import PetsFrame from "../../../../engtst/mgm/gameing/me/pet/PetsFrame"
import TeamOperate from "../../../../engtst/mgm/gameing/me/team/TeamOperate"

import JQMode from "./JQMode"

export default class BeginersGuide {
//新手引导
	constructor()
	{
		var i;
		this.iGuideing=-1;
		this.aa_fx=new Array(8);//
		for(i=0;i<8;i++)this.aa_fx[i]=null;
		this.iStartDelay=1;
		this.iTime=0;
	}
	DrawTextFrame( x, y, w)
	{
		GmPlay.xani_nui3.DrawAnima(x, y, "指示内容框",0);
		if(w>120)GmPlay.xani_nui3.DrawAnimaEx(x+60, y, "指示内容框", 1, 101, 1.0*(w-120)/60, 1, 0, 0, 0);
		GmPlay.xani_nui3.DrawAnima(x+w-60, y, "指示内容框",2);
	}
	_DrawText( x, y, text, tw)
	{
		this.DrawTextFrame(x-(tw+30)/2,y-33,tw+30);
//		M3DFast.gi().DrawText_2(dx, dy, s, c, size, ab, sw, sh, ra, ratx, raty, type, c2)
		M3DFast.gi().DrawText_2(x, y, text, 0xffffff00, 36, 101, 1, 1, 0, -2, -2,3,0xff000000);
	}
	DrawGuide( x, y, w, h, msg, fx)
	{
		var c=this.iGuideDelay<<24;
		GmPlay.xani_nui3.DrawAnima(x, y, "指示框1",GmPlay.iDelay/2);
		GmPlay.xani_nui3.DrawAnima(x+w, y, "指示框2",GmPlay.iDelay/2);
		GmPlay.xani_nui3.DrawAnima(x+w, y+h, "指示框3",GmPlay.iDelay/2);
		GmPlay.xani_nui3.DrawAnima(x, y+h, "指示框4",GmPlay.iDelay/2);
		
		if(fx<0)return;
//		M3DFast.gi().FillRect_2D(0, 0, x, GmConfig.SCRH, c);
//		M3DFast.gi().FillRect_2D(x+w, 0, GmConfig.SCRW, GmConfig.SCRH, c);
//		M3DFast.gi().FillRect_2D(x, 0, x+w, y, c);
//		M3DFast.gi().FillRect_2D(x, y+h, x+w, GmConfig.SCRH, c);
		//fx=0上，1左上，2左，4下，6右
		var tw=M3DFast.gi().GetTextWidth(msg, 36);
//		M3DFast.gi().DrawTextEx(x+w/2, dy, s, c, size, ab, sw, sh, ra, ratx, raty)
		
		c=0xffffff00;
		var mx=0,my=0;
		switch(fx)
		{
		case 0://上
			mx=x+w/2;
			my=y+h;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", GmPlay.iDelay/2, 101, 1, 1, 270, mx, my);
			this._DrawText(mx,my+60+66/2,msg,tw);
//			this.DrawTextFrame(mx,my,tw+);
//			M3DFast.gi().DrawTextEx(mx, my+38, msg, c, 30, 101, 1, 1, 0, -2, 0);
			break;
		case 1://左上
			mx=x+w;
			my=y+h;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", GmPlay.iDelay/2, 101, 1, 1, 270-45, mx, my);
			this._DrawText(mx+42+(tw+30)/2,my+42+66/2,msg,tw);
//			M3DFast.gi().DrawTextEx(mx+30, my+32/2, msg, c, 30, 101, 1, 1, 0, 0, -2);
			break;
		case 2:
			mx=x+w;
			my=y+h/2;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头",GmPlay.iDelay/2, 101, 1, 1, 270-90, mx, my);
			this._DrawText(mx+60+(tw+30)/2,my,msg,tw);
//			M3DFast.gi().DrawTextEx(mx+30, my, msg, c, 30, 101, 1, 1, 0, 0, -2);
			break;
		case 3:
			mx=x+w;
			my=y;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", GmPlay.iDelay/2, 101, 1, 1, 180-45, mx, my);
			this._DrawText(mx+42+(tw+30)/2,my-42-66/2,msg,tw);
//			M3DFast.gi().DrawTextEx(mx+30, my-32/2, msg, c, 30, 101, 1, 1, 0, 0, -2);
			break;
		case 4:
			mx=x+w/2;
			my=y;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", GmPlay.iDelay/2, 101, 1, 1, 180-90, mx, my);
			this._DrawText(mx,my-60-66/2,msg,tw);
//			M3DFast.gi().DrawTextEx(mx, my-38, msg, c, 30, 101, 1, 1, 0, -2, -3);
			break;
		case 5:
			mx=x;
			my=y;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", GmPlay.iDelay/2, 101, 1, 1, 90-45, mx, my);
			this._DrawText(mx-42-(tw+30)/2,my-42-66/2,msg,tw);
//			M3DFast.gi().DrawTextEx(mx-30, my-32/2, msg, c, 30, 101, 1, 1, 0, -3, -2);
			break;
		case 6:
			mx=x;
			my=y+h/2;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", GmPlay.iDelay/2, 101, 1, 1, 0, mx, my);
			this._DrawText(mx-60-(tw+30)/2,my,msg,tw);
//			M3DFast.gi().DrawTextEx(mx-30, my, msg, c, 30, 101, 1, 1, 0, -3, -2);
			break;
		case 7:
			mx=x;
			my=y+h;
			GmPlay.xani_nui3.DrawAnimaEx(mx, my, "指示箭头", 0, 101, 1, 1, 270+45, mx, my);
			this._DrawText(mx-42-(tw+30)/2,my+42+66/2,msg,tw);
//			M3DFast.gi().DrawTextEx(mx-30, my+32/2, msg, c, 30, 101, 1, 1, 0, -3, -2);
			break;
		}
		
//		this.aa_fx[fx].Draw(mx, my);
//		this.aa_fx[fx].NextFrame();
	}
	Draw()
	{
//		GmPlay.sop(""+this.bCheckGuide(0));
//		if(BeginersGuide.iEventGuide==0)
		var i;

		if(this.iGuideing==-1)return;
		else
		{
//			GmPlay.sop("="+this.iGuideStat+"="+this.iGuideDelay+"="+this.iDelay+"="+this.iGuideing);
			if(FrameMessage.fm.bShow)FrameMessage.fm.bShow=false;
			for(i=0;i<8;i++)
			{
				if(this.aa_fx[i]==null)this.aa_fx[i]=GmPlay.xani_ui.InitAnimaWithName("引导指向_"+i, null);
			}
			this.DrawGuide(this.iX,this.iY,this.iW,this.iH,this.sMessage,this.iFx);
			switch(this.iGuideStat)
			{
			case 0://进入过程
				this.iGuideDelay+=0x10;
				if(this.iGuideDelay>=0x80)
				{
					this.iGuideStat=1;
					this.iDelay=0;
				}
				break;
			case 1://等待看清
				this.iDelay++;
				if(this.iDelay>30)
				{//大约1.5秒
					this.iGuideStat=2;
				}
				break;
			case 3://离开过程
				this.iGuideDelay-=0x10;
				if(this.iGuideDelay<=0)this.iGuideing=-1;
				break;
			}
		}
	}
	 bCheckGuideExt( i)
	{//100以上
		if((XRecordFast.iGuideFlags[parseInt(i/10)]&(1<<(i%10)))==0)
		{
			XRecordFast.iGuideFlags[parseInt(i/10)]|=(1<<(i%10));
			return true;
		}
		return false;
	}
	 bCheckGuide( i)
	{//检测引导是否已经完成过
//		if(i>=33 && i<=39)return false;
//		if(i==76)return false;
		if((XRecordFast.iGuideFlags[parseInt(i/10)]&(1<<(i%10)))==0)return false;//还未指导过
		return true;//已经指导过;
	}
	SetGuideExt( x, y, w, h, fx, msg)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
		this.iFx=fx;
		if(this.iFx>=0)this.sMessage=msg;
		this.iGuideing=9999;
		this.iGuideStat=0;
		this.iGuideDelay=0;
		this.bForce=false;
	}
	SetGuide( gd)
	{
		if(this.bCheckGuide(gd))return false;//已经指导过
		this.iGuideing=gd;
		XRecordFast.iGuideFlags[parseInt(gd/10)]|=1<<(gd%10);
		GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);
		GmPlay.sop("打开gd="+gd);
		var obj=XStat.gi().LastStat(0);
		BeginersGuide.iEventGuide=0;
		this.bForce=true;
		var i,j;
		switch(gd)
		{
		case 1:
			this.iX=obj.btn_prompt.iX;this.iY=obj.btn_prompt.iY;
			this.iW=obj.btn_prompt.iW;this.iH=obj.btn_prompt.iH;
			this.sMessage="点击打开任务详细提示";
			this.iFx=4;
			break;
		case 2:
			this.iX=0;this.iY=0;
			this.iW=118;this.iH=83;
			this.sMessage="点击打开小地图";
			this.iFx=1;
			break;
		case 3:
			this.iX=SmallMap.x_x;
			this.iY=SmallMap.x_y;
			this.iW=SmallMap.x_w;
			this.iH=SmallMap.x_h;
			this.sMessage="点击自动前往";
			this.iFx=6;
			break;
		case 4://提示右测点击任务完成
			this.iX=MissionLead.gi().iX;
			this.iY=MissionLead.gi().iY;
			this.iW=MissionLead.gi().iW;
			this.iH=80;
			this.sMessage="点击前往完成任务";
			this.iFx=7;
			break;
		case 5://
		case 6:
			this.iX=GmConfig.SCRW-255;
			this.iY=MissionLead.gi().iY;
			this.iW=MissionLead.gi().iW;
			this.iH=80;
			this.sMessage="点击继续任务";
			this.iFx=7;
			break;
		case 10:
			this.iX=GmConfig.SCRW-83;this.iY=0;
			this.iW=83;this.iH=83;
			this.sMessage="点击头像打开属性页面";
			this.iFx=7;
			break;
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58:
		case 59:
		case 60:
			this.iX=GmConfig.SCRW-83;this.iY=0;
			this.iW=83;this.iH=83;
			this.sMessage="经验足够，点击头像/升级按钮";
			this.iFx=7;
			break;
		case 50:
			ExtHelp.Initex("经验已足够升入下一级，点击右上角人物头像打开属性栏，点击#cff0000升级按钮#o升级", 0, 0, "", 0, 0, "", 2, 0, "确定");
			this.iGuideing=-1;
			break;
		case 11:
			this.iX=obj.btn_upgrade.iX;
			this.iY=obj.btn_upgrade.iY;
			this.iW=obj.btn_upgrade.iW;
			this.iH=obj.btn_upgrade.iH;
			this.sMessage="你的经验以足够升级，点击升级按钮";
			this.iFx=6;
			break;
		case 12:
			this.iX=obj.btn_addpoint.iX;
			this.iY=obj.btn_addpoint.iY;
			this.iW=obj.btn_addpoint.iW;
			this.iH=obj.btn_addpoint.iH;
			this.sMessage="每次升级有5点属性可自由分配";
			this.iFx=6;
			break;
		case 13:
			this.iX=obj.btn_add[2].iX;
			this.iY=obj.btn_add[2].iY;
			this.iW=obj.btn_add[2].iW;
			this.iH=obj.btn_add[2].iH;
			this.sMessage="新玩家建议加力量，以便前期杀怪";
			this.iFx=0;
			break;
		case 14:
			this.iX=FriendList.gi().btn_chat1.iX;
			this.iY=FriendList.gi().btn_chat1.iY;
			this.iW=FriendList.gi().btn_chat1.iW;
			this.iH=FriendList.gi().btn_chat1.iH;
			this.sMessage="收到新的消息，点击查看";
			this.iFx=6;
			break;
		case 20:
			this.iX=FastButton.gi().btn_bag.iX;
			this.iY=FastButton.gi().btn_bag.iY;
			this.iW=80;this.iH=80;
			this.sMessage="点击打开背包";
			this.iFx=5;
			break;
		case 21:
			//找到背包中0级武器
			for(j=0;j<20;j++)
			{
				if(MyGoods.gi().goods[2][j].iGid>0)					
				{
					if(GmPlay.de_goods.intValue(MyGoods.gi().goods[2][j].iTid, 0, 16)==2 &&//武器
							GmPlay.de_goods.intValue(MyGoods.gi().goods[2][j].iTid, 0, 19)==GmMe.me.iRace &&//种族
							GmPlay.de_goods.intValue(MyGoods.gi().goods[2][j].iTid, 0, 9)==0)
					{
						this.iX=MyGoodsFrame.iGx+5+(j%5)*85;
						this.iY=MyGoodsFrame.iGy+5+(j/5)*85;
						this.iW=80;this.iH=80;
						this.sMessage="双击装备穿戴";
						this.iFx=7;
						break;
					}
				}
			}
			if(j>=20)this.iGuideing=-1;
/*			this.iX=MyGoods.iX+395;
			this.iY=MyGoods.iY+155;
			this.iW=60;this.iH=60;
			this.sMessage="单击查看，双击使用";
			this.iFx=0;
			ExtHelp.Initex("单击物品查看属性，#cff0000双击使用物品#o(快速点击物品两次)，双击装备可直接穿戴", 0, 0, "", 0, 0, "", 2, 0, "确定");
			this.iGuideing=-1;*/
			break;
		case 22:
			this.iX=MyGoods.iX+395;
			this.iY=MyGoods.iY+155;
			this.iW=60;this.iH=60;
			this.sMessage="双击使用/穿戴";
			this.iFx=0;
			break;
		case 30:
			this.iX=FastButton.gi().btn_team.iX;
			this.iY=FastButton.gi().btn_team.iY;
			this.iW=FastButton.gi().btn_team.iW;
			this.iH=FastButton.gi().btn_team.iH;
			this.sMessage="组队打怪可以事半功倍";
			this.iFx=5;
			break;
		case 31:
			this.iX=FastButton.gi().btn_team.iX;
			this.iY=FastButton.gi().btn_team.iY;
			this.iW=FastButton.gi().btn_team.iW;
			this.iH=FastButton.gi().btn_team.iH;
			this.sMessage="闪烁时有玩家申请入队";
			this.iFx=5;
			break;
		case 32:
			this.iX=obj.btn_roles[0].iX;
			this.iY=obj.btn_roles[0].iY;
			this.iW=obj.btn_roles[0].iW;
			this.iH=obj.btn_roles[0].iH;
			this.sMessage="点击玩家，同意入队";
			this.iFx=2;
			break;
		case 33:
			this.iX=XFight.gi().fat[2][0].iX-30;
			this.iY=XFight.gi().fat[2][0].iY-60;
			this.iW=60;
			this.iH=60;
			this.sMessage="直接点击敌人攻击";
			this.iFx=2;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
		case 34://点击法术选择技能攻击
		case 95:
			this.iX=XFight.gi().btn_operate[0].iX;
			this.iY=XFight.gi().btn_operate[0].iY;
			this.iW=80;
			this.iH=80;
			this.sMessage="点击法术选择技能";
			this.iFx=4;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
		case 35://点击防御
			this.iX=XFight.gi().btn_operate[3].iX;
			this.iY=XFight.gi().btn_operate[3].iY;
			this.iW=80;
			this.iH=80;
			this.sMessage="点击防御可以减少伤害";
			this.iFx=5;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
		case 36://点击道具使用药品
			this.iX=XFight.gi().btn_operate[1].iX;
			this.iY=XFight.gi().btn_operate[1].iY;
			this.iW=80;
			this.iH=80;
			this.sMessage="点击道具后使用一个止血草";
			this.iFx=5;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
		case 37://点击逃跑
			this.iX=XFight.gi().btn_operate[7].iX;
			this.iY=XFight.gi().btn_operate[7].iY;
			this.iW=80;
			this.iH=80;
			this.sMessage="打不过可以选择逃跑";
			this.iFx=5;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
		case 38://点击捕捉
			this.iX=XFight.gi().btn_operate[8].iX;
			this.iY=XFight.gi().btn_operate[8].iY;
			this.iW=80;
			this.iH=80;
			this.sMessage="点击捕捉后选择目标";
			this.iFx=6;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
		case 39://点击道具使用药品
			this.iX=XFight.gi().btn_operate[1].iX;
			this.iY=XFight.gi().btn_operate[1].iY;
			this.iW=80;
			this.iH=80;
			this.sMessage="点击道具后使用一个薄荷";
			this.iFx=5;
			AutoFightFrame.aff.iAutoFightLast=0;
			break;
			
		case 61:
			ExtHelp.Initex("点击下方任务按钮，可以查看当前已领的任务，和任务完成条件", 0, 0, "", 0, 0, "", 5, 75, "确定");
			this.iGuideing=-1;
			break;
		case 62:
		case 63:
		case 64:
		case 65:
		case 66:
		case 67:
		case 68:
		case 69:
		case 70:
			ExtHelp.Initex("您有未分配的属性点，可点击#cff0000人物头像/加点#o按钮进行加点，前期建议加力量，加入门派后会自动洗点一次", 0, 0, "", 0, 0, "", 2, 0, "确定");
			this.iGuideing=-1;
			break;
		case 71:
			ExtHelp.Initex("您当前气血不满，可以打开右下角#cff0000快捷/快捷恢复#o按钮恢复，也可以使用#cff0000红池#o战斗结束自动恢复满气血", 0, 0, "", 0, 0, "", 2, 0, "确定");
			this.iGuideing=-1;
			break;
		case 72:
			ExtHelp.Initex("您当前魔法不满，可以打开右下角#cff0000快捷/快捷恢复#o按钮恢复，也可以使用#cff0000蓝池#o战斗结束自动恢复满魔法", 0, 0, "", 0, 0, "", 2, 0, "确定");
			this.iGuideing=-1;
			break;
		case 73:
			ExtHelp.Initex("在野外行走时，怪物会自动与你战斗，可以打开右下角#cff0000快捷/遇怪:开/关#o按钮来屏蔽野外怪物", 0, 0, "", 0, 0, "", 2, 0, "确定");
			this.iGuideing=-1;
			break;
		case 74:
			this.iX=FastButton.gi().btn_qq.iX;
			this.iY=FastButton.gi().btn_qq.iY;
			this.iW=FastButton.gi().btn_qq.iW;
			this.iH=FastButton.gi().btn_qq.iH;
			this.sMessage="点击这里可打开上次提示";
			this.iFx=2;
			break;
		case 75:
			this.iX=FastButton.gi().btn_mission.iX-40;
			this.iY=FastButton.gi().btn_mission.iY-80;
			this.iW=80;this.iH=80;
			this.sMessage="点击打开任务，可以看到当前任务提示";
			this.iFx=5;
			break;
		case 76:
			//找到背包中图纸
			for(j=0;j<20;j++)
			{
				if(MyGoods.gi().goods[2][j].iGid>0)
				{
					if(MyGoods.gi().goods[2][j].iTid==97)
					{
						this.iX=MakeEquip.iGx+5+(j%5)*85;
						this.iY=MakeEquip.iGy+5+(j/5)*85;
						this.iW=80;this.iH=80;
						this.sMessage="双击图纸";
						this.iFx=4;
						break;
					}
				}
			}
			if(j>=20)this.iGuideing=-1;
//			ExtHelp.Initex("双击图纸，如果材料齐备，点击制造按钮", 0, 0, "", 0, 0, "", 2, 0, "确定");
//			this.iGuideing=-1;
			break;
		case 79:
			this.iX=MakeEquip.iX+30+400-20-110;
			this.iY=MakeEquip.iY+MakeEquip.iH-30-160+160-20-52;
			this.iW=110;this.iH=52;
			this.sMessage="点击制造装备";
			this.iFx=0;
			break;
		case 77:
			ExtHelp.Initex("点击上方宠物头像，可以查看#cff0000宠物属性，资质，成长，技能#o", 0, 0, "", 0, 0, "", 5, 78, "确定");
			this.iGuideing=-1;
			break;
		case 78:
			this.iX=GmConfig.SCRW-83-104-83;
			this.iY=0;
			this.iW=83;this.iH=83;
			this.sMessage="点击宠物头像，查看宠物属性";
			this.iFx=7;
			break;
		case 80://打开快捷
		case 82:
			this.iX=FastButton.gi().btn_fast.iX;
			this.iY=FastButton.gi().btn_fast.iY;
			this.iW=FastButton.gi().btn_fast.iW;
			this.iH=FastButton.gi().btn_fast.iH;
			this.sMessage="点击打开快捷";
			this.iFx=5;
			break;
		case 81://引导遁地术
			this.iX=obj.btn_dundi.iX;
			this.iY=obj.btn_dundi.iY;
			this.iW=obj.btn_dundi.iW;
			this.iH=obj.btn_dundi.iH;
			this.sMessage="点击使用遁地术";
			this.iFx=6;
			break;
		case 83://引导关闭遇怪
			this.iX=obj.btn_dark.iX;
			this.iY=obj.btn_dark.iY;
			this.iW=obj.btn_dark.iW;
			this.iH=obj.btn_dark.iH;
			this.sMessage="点击关闭遇怪，在野外地图不再碰到怪物";
			this.iFx=6;
			break;
		case 84://
			this.iX=XFightRoleSkill.xfs.btn_skills[0].iX;
			this.iY=XFightRoleSkill.xfs.btn_skills[0].iY;
			this.iW=XFightRoleSkill.xfs.btn_skills[0].iW;
			this.iH=XFightRoleSkill.xfs.btn_skills[0].iH;
			this.sMessage="点击技能";
			this.iFx=5;
			break;
		case 85:
			for(i=0;i<20;i++)
			{
				if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==70 && MyGoods.gi().goods[2][i].iCount>=1)
				{
					this.iX=XFightGoods.xfg.iX+5+(i%5)*85;
					this.iY=XFightGoods.xfg.iY+5+(i/5)*85;
					this.iW=80;
					this.iH=80;
					this.sMessage="双击使用止血草";
					this.iFx=5;
					break;
				}
			}
			break;
		case 86://点击活动
			this.iX=FastButton.gi().btn_act.iX;
			this.iY=FastButton.gi().btn_act.iY;
			this.iW=80;this.iH=80;
			this.sMessage="看看有什么活动可以做";
			this.iFx=2;
			break;
		case 87://点击花拳绣腿
		case 96:
			this.iX=XFightRoleSkill.xfs.btn_skills[0].iX;
			this.iY=XFightRoleSkill.xfs.btn_skills[0].iY;
			this.iW=80;this.iH=80;
			this.sMessage="选择花拳绣腿";
			this.iFx=5;
			break;
		case 88://点击目标
		case 97:
			this.iX=XFight.gi().fat[2][0].iX-30;
			this.iY=XFight.gi().fat[2][0].iY-60;
			this.iW=60;
			this.iH=60;
			this.sMessage="选择攻击目标";
			this.iFx=2;
			break;
		case 89://点宠物头像
			this.iX=GmMe.me.btn_petatt.iX;
			this.iY=GmMe.me.btn_petatt.iY;
			this.iW=GmMe.me.btn_petatt.iW;
			this.iH=GmMe.me.btn_petatt.iH;
			this.sMessage="点击打开宠物界面";
			this.iFx=0;
			break;
		case 90://点出战
			this.iX=obj.btn_joinfight.iX;
			this.iY=obj.btn_joinfight.iY;
			this.iW=obj.btn_joinfight.iW;
			this.iH=obj.btn_joinfight.iH;
			this.sMessage="点击设置宠物出战";
			this.iFx=4;
			break;
		case 91://加点引导
			this.iX=GmMe.me.btn_att.iX;this.iY=0;
			this.iW=83;this.iH=83;
			this.sMessage="点击头像打开人物属性面板";
			this.iFx=7;
			break;
		case 92://加点按钮//加点按钮
			this.iX=obj.btn_addpoint.iX;
			this.iY=obj.btn_addpoint.iY;
			this.iW=obj.btn_addpoint.iW;
			this.iH=obj.btn_addpoint.iH;
			this.sMessage="点击加点，可以分配剩余潜力点";
			this.iFx=6;
			break;
		case 93://推荐加点
			
			this.iX=obj.pbtn_recommend.iOffX+obj.pbtn_recommend.iX;
			this.iY=obj.pbtn_recommend.iOffY+obj.pbtn_recommend.iY;
			this.iW=obj.pbtn_recommend.iW;
			this.iH=obj.pbtn_recommend.iH;
			this.sMessage="看看怎么加点更合适";
			this.iFx=6;
			break;
		case 94://点自动
		case 99:
			this.iX=XFight.gi().btn_operate[6].iX;
			this.iY=XFight.gi().btn_operate[6].iY;
			this.iW=XFight.gi().btn_operate[6].iW;
			this.iH=XFight.gi().btn_operate[6].iH;
			this.sMessage="选择自动模式，即可自动战斗哦~";
			this.iFx=5;
			break;
		case 98://宠物点攻击
			this.iX=XFight.gi().fat[2][0].iX-30;
			this.iY=XFight.gi().fat[2][0].iY-60;
			this.iW=60;
			this.iH=60;
			this.sMessage="点击目标攻击";
			this.iFx=2;
			break;
		case 100:
			FrameMessageEx.fm.Open("有一只萌萌的宠物可以跟你一起战斗啦~小心~宠物也会死的哦~");
			this.iGuideing=-1;
			break;
		case 101:
			FrameMessageEx.fm.Open("分配好潜能点以后不要忘记点击确认保存哦");
			this.iGuideing=-1;
			break;
		case 102://指导点击坐骑按钮
			this.iX=FastButton.gi().btn_mounts.iX;
			this.iY=FastButton.gi().btn_mounts.iY;
			this.iW=FastButton.gi().btn_mounts.iW;
			this.iH=FastButton.gi().btn_mounts.iH;
			this.sMessage="点击打开坐骑界面";
			this.iFx=5;
			break;
		case 103://
			this.iX=obj.btn_joinfight.iX;
			this.iY=obj.btn_joinfight.iY;
			this.iW=obj.btn_joinfight.iW;
			this.iH=obj.btn_joinfight.iH;
			this.sMessage="点击骑乘坐骑";
			this.iFx=5;
			break;
		}
		if(this.iX<=0 && this.iY<=0)
		{
			this.iGuideing=-1;
			GmPlay.sop("error guide = "+this.iGuideing);
		}
		this.iGuideDelay=0;
		this.iGuideStat=0;//开始
		return true;
	}
	
	InitGuide()
	{//触发引导
		if(XRecordFast.iExtHelp==3)return;
		if(this.iStartDelay>0)
		{
			if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING)this.iStartDelay--;
			return;
		}
		if(GmMe.me.rbs.iLev>40)return;
		if(this.iGuideing>=0)return;
		if(FrameMessage.fm.bShow)return;
		if(MapManager.gi().vbk.mapdialog.bDialoging)return;

//		GmPlay.sop("bbbbbbbbbbbbbbbbbbbbb"+BeginersGuide.iEventGuide);
		//extsel[i].type
//		if(XStat.gi().LastStatType(0)==XStat.GS_MISSIONFRAME && this.SetGuide(1))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && MyMission.m.bCheckDoing(56) && this.SetGuide(2))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_SMALLMAP && this.SetGuide(3))return;

		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && !JQMode.jq.bJQLock() && MyMission.m.bCheckDoing(48) && this.SetGuide(4))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && !JQMode.jq.bJQLock() && MyMission.m.bCheckDoing(49) && this.SetGuide(5))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && !JQMode.jq.bJQLock() && MyMission.m.bCheckDoing(50) && this.SetGuide(6))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && !JQMode.jq.bJQLock() && !FrameMessageEx.fm.bShow && MyMission.m.bCheckDoing(147) && this.SetGuide(4))return;
		
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && !JQMode.jq.bJQLock() && MissionLead.gi().bOpen && MyMission.m.bCheckDoing(148) && this.SetGuide(5))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && !JQMode.jq.bJQLock() && MyMission.m.bCheckDoing(149) && this.SetGuide(6))return;
		
///		if(GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && this.SetGuide(10))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_MYATTFRAME && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && this.SetGuide(11))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_MYATTFRAME && GmMe.me.rbs.nut>0 && this.SetGuide(12))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_ADDPOINT && this.SetGuide(13))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && FriendList.gi().bPrivateChatFlash && this.SetGuide(14))return;
		
		if(XStat.gi().LastStatType(0)==XStat.GS_MYGOODSFRAME && this.SetGuide(21))return;
//		if(MyGoods.gi().bShow && MyGoods.gi().goods[2][0].iGid>0 && this.SetGuide(22))return;
		
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && MapManager.gi().iCurrentMapId==2 && this.SetGuide(30))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && FastButton.gi().bRequestFlash && this.SetGuide(31))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_TEAMOPERATE && TeamOperate.iModePoint==1 && this.SetGuide(32))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && XFight.bFighting && this.SetGuide(33))return;
		
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==0 && this.SetGuide(50))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==0 && this.SetGuide(51))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==1 && this.SetGuide(52))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==2 && this.SetGuide(53))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==3 && this.SetGuide(54))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==4 && this.SetGuide(55))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==5 && this.SetGuide(56))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==6 && this.SetGuide(57))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==7 && this.SetGuide(58))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==8 && this.SetGuide(59))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev] && GmMe.me.rbs.iLev==9 && this.SetGuide(60))return;


//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==1 && GmMe.me.rbs.nut>0 && this.SetGuide(62))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==2 && GmMe.me.rbs.nut>0 && this.SetGuide(63))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==3 && GmMe.me.rbs.nut>0 && this.SetGuide(64))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==4 && GmMe.me.rbs.nut>0 && this.SetGuide(65))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==5 && GmMe.me.rbs.nut>0 && this.SetGuide(66))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==6 && GmMe.me.rbs.nut>0 && this.SetGuide(67))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==7 && GmMe.me.rbs.nut>0 && this.SetGuide(68))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==8 && GmMe.me.rbs.nut>0 && this.SetGuide(69))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.iLev==9 && GmMe.me.rbs.nut>0 && this.SetGuide(70))return;

		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.iFlag[3]<=0 && GmMe.me.rbs.iHp<GmMe.me.rbs.iMaxHp && this.SetGuide(71))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.iFlag[4]<=0 && GmMe.me.rbs.iMp<GmMe.me.rbs.iMaxMp && this.SetGuide(72))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && XFight.bFighting && MapManager.gi().iCurrentMapId!=1 && this.SetGuide(73))return;//遇怪开关

		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && MyPets.mp.iPetCount>0 && this.SetGuide(77))return;
		
		if(XStat.gi().LastStatType(0)==XStat.GS_MAKEEQUIP  && this.SetGuide(76))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_MAKEEQUIP  && MakeEquip.bCanMake && this.SetGuide(79))return;
		
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && MyMission.m.bCheckDoing(143) && this.SetGuide(80))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_FASTOPERATE && this.bCheckGuide(80) && MyMission.m.bCheckDoing(143) && this.SetGuide(81))return;
		
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && MapManager.gi().iCurrentMapId==4 && MyMission.m.bCheckDoing(160) && this.SetGuide(82))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_FASTOPERATE && this.bCheckGuide(82) && MapManager.gi().iCurrentMapId==4 && MyMission.m.bCheckDoing(160) && this.SetGuide(83))return;
		//完成新手剧情，提示除害
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && MyMission.m.bCheckDoing(23) && this.SetGuide(86))return;
//		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && this.bCheckGuide(86) && MyMission.m.bCheckDoing(23) && this.SetGuide(87))return;
		
//		GmPlay.sop(""+XFight.gi().btn_operate[0].iX+"======="+XFight.gi().btn_operate[0].iY);
		if(XFight.bFighting && XFight.gi().iFightStat==0 && MyMission.m.bCheckDoing(150) &&  this.SetGuide(34))return;//点技能
		if(XFight.bFighting && XFight.gi().iFightStat==1 && MyMission.m.bCheckDoing(150) &&  this.SetGuide(87))return;//点花拳绣腿
		if(XFight.bFighting && XFight.gi().iFightStat==4 && MyMission.m.bCheckDoing(150) &&  this.SetGuide(88))return;//点敌人
		if(XFight.bFighting && XFight.gi().iFightStat==0 && MyMission.m.bCheckDoing(150) &&  this.bCheckGuide(88) && this.SetGuide(94))return;//点自动
		
		if(XFight.bFighting && XFight.gi().iFightStat==0 && MyMission.m.bCheckDoing(157) &&  this.SetGuide(95))return;//点技能
		if(XFight.bFighting && XFight.gi().iFightStat==1 && MyMission.m.bCheckDoing(157) &&  this.SetGuide(96))return;//点花拳绣腿
		if(XFight.bFighting && XFight.gi().iFightStat==4 && MyMission.m.bCheckDoing(157) &&  this.SetGuide(97))return;//点敌人
		if(XFight.bFighting && XFight.gi().iFightStat==10 && MyMission.m.bCheckDoing(157) &&  this.SetGuide(98))return;//宠物点敌人
		if(XFight.bFighting && XFight.gi().iFightStat==0 && MyMission.m.bCheckDoing(157) &&  this.bCheckGuide(97) && this.SetGuide(99))return;//点自动
		
		if(XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !XFight.bFighting && MyMission.m.bCheckDoing(157) && this.SetGuide(89))return;//点宠物头像
		if(XStat.gi().LastStatType(0)==XStat.GS_PETSFRAME && this.bCheckGuide(89) && this.SetGuide(90))return;//点出战
		if(this.bCheckGuide(90) && this.SetGuide(100))return;
		
//		GmPlay.sop(this.bCheckGuide(38)?"true":"false");
		if(XFight.bFighting && XFight.gi().iFightStat==0 && XFight.gi().iFightType==1 && this.SetGuide(38))return;//提示捕捉
		if(!XFight.bFighting && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && this.bCheckGuide(38) && this.SetGuide(82))return;//打开快捷
		if(!XFight.bFighting && XStat.gi().LastStatType(0)==XStat.GS_FASTOPERATE && this.bCheckGuide(82) && this.SetGuide(83))return;//关闭遇怪开关
		if(GmMe.me.rbs.iLev>=10 && GmMe.me.rbs.iSchoolId>0 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && GmMe.me.rbs.nut>0 && this.SetGuide(91))return;//加点引导--打开人物属性面板
		if(GmMe.me.rbs.iLev>=10 && GmMe.me.rbs.iSchoolId>0 && XStat.gi().LastStatType(0)==XStat.GS_MYATTFRAME && GmMe.me.rbs.nut>0 && this.SetGuide(92))return;
		if(GmMe.me.rbs.iLev>=10 && GmMe.me.rbs.iSchoolId>0 && XmsEngine.pxe.IsStat("人物加点") && this.SetGuide(93))return;
		if(this.bCheckGuide(93) && this.SetGuide(101))return;
		
//		GmPlay.sop(""+GmMe.me.rbs.iLev+","+MyMounts.mm.iMountsCount+","+this.SetGuide(102));
		//有坐骑时
		if(GmMe.me.rbs.iLev>=30 && MyMounts.mm.iMountsCount>0 && this.SetGuide(102))return;
		if(XStat.gi().LastStatType(0)==XStat.GS_MOUNTSFRAME && GmMe.me.iFightMid<=0 && this.bCheckGuide(102) && this.SetGuide(103))return;
		
		if(XFight.bFighting && XFight.gi().iFightStat==2 && MyGoods.bHaveGoods(70, 1) && this.bCheckGuide(36) && this.SetGuide(85))return;//使用止血草
		
		if(BeginersGuide.iEventGuide>0)
		{
			if(BeginersGuide.iEventGuide==33 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(33))return;
			if(BeginersGuide.iEventGuide==34 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(34))return;
			if(BeginersGuide.iEventGuide==35 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(35))return;
			if(BeginersGuide.iEventGuide==36 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(36))return;
			if(BeginersGuide.iEventGuide==37 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(37))return;
			if(BeginersGuide.iEventGuide==38 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(38))return;
			if(BeginersGuide.iEventGuide==39 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(39))return;
//			if(BeginersGuide.iEventGuide==33 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(33))return;
//			if(BeginersGuide.iEventGuide==34 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(34))return;
//			if(BeginersGuide.iEventGuide==35 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(35))return;
//			if(BeginersGuide.iEventGuide==36 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(36))return;
//			if(BeginersGuide.iEventGuide==37 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(37))return;
//			if(BeginersGuide.iEventGuide==38 && XFight.bFighting && XFight.gi().iFightStat==0 && this.SetGuide(38))return;
			
			if(BeginersGuide.iEventGuide==20 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !FastButton.gi().bOpening && FastButton.gi().bShow && this.SetGuide(20))return;
			
			if(BeginersGuide.iEventGuide==61 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && this.SetGuide(61))return;
			
//			GmPlay.sop("747474747477474");
			if(BeginersGuide.iEventGuide==74 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && this.SetGuide(74))return;
			//游戏中，没有消息显示，提示打开任务栏
			if(BeginersGuide.iEventGuide==75 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && !FastButton.gi().bOpening && FastButton.gi().bShow && this.SetGuide(75))return;
			if(BeginersGuide.iEventGuide==78 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING && this.SetGuide(78))return;
		}
		//10级以下，经验足够，每1分钟提示一次升级
		this.iTime++;
		if(this.iTime%(15*60*5)==0 && XStat.gi().LastStatType(0)==XStat.GS_GAMEING)
		{
//			if(GmMe.me.rbs.iLev<10 && GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev])
//			{
//				ExtHelp.Initex("经验已足够升入下一级，点击右上角人物头像打开属性栏，点击#cff0000升级按钮#o升级", 0, 0, "", 0, 0, "", 2, 0, "确定");
//				this.iGuideing=-1;
//			}
//			else 
				if(GmMe.me.rbs.iLev<20 && GmMe.me.rbs.nut>0)
			{
				if(GmMe.me.rbs.iSchoolId==0)ExtHelp.Initex("您有未分配的属性点，可点击#cff0000人物头像/加点#o按钮进行加点，前期建议加力量，加入门派后会自动洗点一次", 0, 0, "", 0, 0, "", 2, 0, "确定");
				//else ExtHelp.Init("您有未分配的属性点，可点击#cff0000人物头像/加点#o按钮进行加点，打开左上角#cff0000帮助#o查看#cff0000门派推荐加点#o", 0, 0, "", 0, 0, "", 2, 0, "确定");
				this.iGuideing=-1;
			}
		}
	}
	
	
	InitGuideFromSever( pls)
	{//服务器触发引导
		var type=pls.GetNextInt();//打开引导类型
		BeginersGuide.iEventGuide=type;
		/*
		switch(type)
		{
		case 33://直接点我攻击
			this.SetGuide(33);
			break;
		case 34://点击法术选择技能攻击
			this.SetGuide(34);
			break;
		case 35://点击防御
			this.SetGuide(35);
			break;
		case 36://点击道具吃药
			this.SetGuide(36);
			break;
		case 37://点击逃跑
			this.SetGuide(37);
			break;
		case 38://点击捕捉
			this.SetGuide(38);
			break;
		}
		*/
	}
	ProcTouch( msg, x, y)
	{
		if(this.iGuideing>=0)
		{
			if(!this.bForce)
			{
				if(this.iGuideStat==2)
				{
					if(msg==3)
					{
						this.iGuideStat=3;
					}
				}
			}
//			if(this.iGuideStat==2)
//			{
//				if(msg==1 && XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
//				{
//					this.iGuideStat=2;
//					return false;
//				}
//				return true;
//				this.iGuideStat=3;
//			}
//			else
			{
				if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
				{
					if(msg==3)
					{
//						if(this.iGuideing==90)FrameMessageEx.fm.Open("有一只萌萌的宠物可以跟你一起战斗啦~小心~宠物也会死的哦~");//点击宠物出战后
//						if(this.iGuideing==93)FrameMessageEx.fm.Open("分配好潜能点以后不要忘记点击确认保存哦");//
						this.iGuideing=-1;
					}
					return false;
				}
				return true;
			}
		}

		return false;
	}
}
BeginersGuide.bg=null;
BeginersGuide.gi=function()
{
	if(BeginersGuide.bg==null)BeginersGuide.bg=new BeginersGuide();
	return BeginersGuide.bg;
}
BeginersGuide.iEventGuide=0;