
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import SortAnima from "../../../../config/SortAnima"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import XmsEngine from "../../../../engine/xms/XmsEngine"
import FireworksEffect from "../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../engtst/mgm/frame/UIList"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

import GmMe from "./GmMe"
import AddPoint from "./AddPoint"

export default class MyAttFrame extends BaseClass{
	constructor( ani)
	{
		super();
		this._SVIPT=[
			["特权","剩余天数<=30","剩余天数<=60","剩余天数>60"],
			["大表情","可使用","可使用","可使用"],
			["自动回合数","无限","无限","无限"],
			["使用三倍卡","+1次","+1次","+1次"],
			["活跃度","+6点","+8点","+10点"],
			["门派奖励","+20%","+30%","+40%"],
			["签到奖励","","+50%","+100%"],
			["体力恢复速度","","+1点","+2点"],
			["实时仓库","","","可使用"],
	];
	 this.list_vip=null;
		var i;
		this.pm3f=M3DFast.gi();
		MyAttFrame.iW=916;
		MyAttFrame.iH=608;
		
		MyAttFrame.iX=(GmConfig.SCRW-MyAttFrame.iW)/2;
		MyAttFrame.iY=(GmConfig.SCRH-MyAttFrame.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(MyAttFrame.iX+MyAttFrame.iW-35, MyAttFrame.iY-25, 60, 60);
		
		this.iPage=0;this.iPage_jn = 1;
		this.btn_page=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
			this.btn_page[i].Move(MyAttFrame.iX+MyAttFrame.iW-15, MyAttFrame.iY+40+125*i, 50, 140);
			
			/*
			if(i==0)this.btn_page[i].InitButton("标签按钮上");
			else if(i==4)this.btn_page[i].InitButton("标签按钮下");
			else this.btn_page[i].InitButton("标签按钮中");*/
		}
		
		this.btn_title=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_title.InitButton("宠物改名按钮");
		//this.btn_title.sName="称 谓";
		
		this.btn_upgrade=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_upgrade.sName="升 级";
		this.btn_upgrade.InitButton("按钮1_110");
		
		this.btn_addpoint=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_addpoint.sName="加 点";
		this.btn_addpoint.InitButton("按钮1_110");
		
		this.btn_vip=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_vip.sName="开通/续费";
		this.btn_vip.InitButton("按钮3");
		this.btn_vip.iNameSize=25;
		this.btn_vip.iNameColor = 0xffffd700;
		
		this.btn_mpjn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_mpjn.sName="门派技能";
		this.btn_mpjn.InitButton("按钮2");
		this.btn_mpjn.iNameSize=25;
		this.btn_mpjn.iNameColor = 0xffffd700;
		
		this.btn_fzjn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_fzjn.sName="辅助技能";
		this.btn_fzjn.InitButton("按钮2");
		this.btn_fzjn.iNameSize=25;
		this.btn_fzjn.iNameColor = 0xffffd700;
		
		this.btn_jqjn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_jqjn.sName="剧情技能";
		this.btn_jqjn.InitButton("按钮2");
		this.btn_jqjn.iNameSize=25;
		this.btn_jqjn.iNameColor = 0xffffd700;
		
		
/////------------------------------------------------------

		
		this.iMainSkillPoint=0;
		this.btn_mainskill=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn_mainskill[i]=new XButton(GmPlay.xani_ui);
			this.btn_mainskill[i].bCheckByRect=true;
		}
		
		this.iGovSkillPoint=-1;
		this.btn_govskill=new Array(10);//
		for(i=0;i<10;i++)
		{
			this.btn_govskill[i]=new XButton(GmPlay.xani_ui);
			this.btn_govskill[i].bCheckByRect=true;
		}

		this.aa_body=new AnimaAction();
		this.aa_weapon=new AnimaAction();
		
		this.iWeapTid=MyGoods.gi().GetWeaponTid();
		
		var xb=GmMe.me.iRace*2+GmMe.me.iSex;
		GmPlay.xani_newrole[xb].InitAnimaWithName("站立_下", this.aa_body);
		if(this.iWeapTid>=0)
		{
			GmPlay.xani_weap[GmMe.me.iRace*2+GmMe.me.iSex][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName("站立_下", this.aa_weapon);
		}
		this.aa_cls=new Array(5);//
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(GmMe.me.iColor[i]<=0 || GmMe.me.iColor[i]>=6)continue;
			this.aa_cls[i]=new AnimaAction();
			GmPlay.xani_color[xb][GmMe.me.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_站立_下", this.aa_cls[i]);
		}
//		GmPlay.xani_role[GmMe.me.iRace*2+GmMe.me.iSex].InitAnimaWithName("站立_下", this.aa_body);
//		if(this.iWeapTid>=0)
//		{
//			if(this.iWeapTid==248 || this.iWeapTid==249 || this.iWeapTid==250)
//			{//70武器xani_weap70
//				GmPlay.xani_weap70.InitAnimaWithName(GmMe.sSex(GmMe.me.iSex)+GmPlay.de_goods.strValue(this.iWeapTid, 0, 4)+"_站立_下", this.aa_weapon);
//			}
//			else GmPlay.xani_role[GmMe.me.iRace*2+GmMe.me.iSex].InitAnimaWithName(GmPlay.de_goods.strValue(this.iWeapTid, 0, 4)+"_站立_下", this.aa_weapon);
//		}
	}


	Draw_0( x, y)
	{
		var i,j;
		DrawMode.new_framein(MyAttFrame.iX+28,MyAttFrame.iY+28,397,552);//左背景
		DrawMode.new_framein(MyAttFrame.iX+435,MyAttFrame.iY+28,451,552);//右背景
		
		var offx=MyAttFrame.iX+28;
		var offy=MyAttFrame.iY+28;
		var offw=397;
		var offh=552;
		
		MyAttFrame.wordframe(offx+offw/2-200/2,offy+30,200);
		M3DFast.gi().DrawText_2(offx+offw/2,offy+30+16, GmMe.me.sName, 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmMe.me.CalcUserScore();
		M3DFast.gi().DrawText_2(offx+offw/2,offy+30+16+40, "评分:"+GmMe.me.iScore, 0xffffffff, 26, 101, 1, 1, 0, -2, -2, 3, 0xff000000);

		GmPlay.xani_nui2.DrawAnima(offx+offw/2-260/2,offy+90 ,"宠物背景",0);

		FireworksEffect.DrawAura(0, offx+offw/2,offy+280, null, 0);//人物属性页面
		this.aa_body.Draw(offx+offw/2,offy+280);
		var xb=GmMe.me.iRace*2+GmMe.me.iSex;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(GmMe.me.iColor[i]<=0 || GmMe.me.iColor[i]>=6)continue;
			this.aa_cls[i].iFrame=this.aa_body.iFrame;
			this.aa_cls[i].Draw(offx+offw/2,offy+280);
		}
		this.aa_body.NextFrame();
		if(this.iWeapTid>=0)
		{
			this.aa_weapon.Draw(offx+offw/2,offy+280);
			this.aa_weapon.NextFrame();
		}
		
		i=370;
		j=40;
		DrawMode.ui3_Text1_(offx+20, offy+i+j*0,67,100,"号码",""+GmMe.me.iRid);
		DrawMode.ui3_Text1_(offx+20, offy+i+j*1,67,100,"等级",""+GmMe.me.rbs.iLev);
		
		DrawMode.ui3_Text1_(offx+offw/2+10, offy+i+j*0,67,100,"门派",""+GameData.sSchools[GmMe.me.rbs.iSchoolId]);
		if(MyGov.mg.iRealGid==-1)DrawMode.ui3_Text1_(offx+offw/2+10, offy+i+j*1,67,100,"帮派","无帮派");
		else DrawMode.ui3_Text1_(offx+offw/2+10, offy+i+j*1,67,100,"帮派",MyGov.mg.sName);

		if(GmMe.me.rbs.sTitle.length<=0)DrawMode.ui3_Text1_(offx+20, offy+i+j*2+30,67,200,"称谓","无");
		else DrawMode.ui3_Text1_(offx+20, offy+i+j*2+30,67,200,"称谓",GmMe.me.rbs.sTitle);
		
		this.btn_title.Move(offx+290, offy+i+j*2+30+16-30, 60, 60);
		this.btn_title.Draw();
		
	//	M3DFast.gi().DrawText_2(x+70, y+365, "气血", 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	//	M3DFast.gi().DrawText_2(x+70, y+365+33, "魔法", 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	//	M3DFast.gi().DrawText_2(x+70, y+365+33*2, "体力", 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		var xx = MyAttFrame.iX+470, yy = MyAttFrame.iY+56;
		GmPlay.xani_nui2.DrawAnima(xx, yy, "提示1",0);
		M3DFast.gi().DrawText_2(xx+67/2, yy+16, "气血", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmPlay.xani_nui2.DrawAnima(xx, yy+38, "提示1",0);
		M3DFast.gi().DrawText_2(xx+67/2, yy+38+16, "魔法", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmPlay.xani_nui2.DrawAnima(xx, yy+76, "提示1",0);
		M3DFast.gi().DrawText_2(xx+67/2, yy+76+16, "经验", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmPlay.xani_nui2.DrawAnima(xx, yy+38*3, "提示1",0);
		M3DFast.gi().DrawText_2(xx+67/2, yy+38*3+16, "愤怒", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmPlay.xani_nui2.DrawAnima(xx, yy+38*4, "提示1",0);
		M3DFast.gi().DrawText_2(xx+67/2, yy+38*4+16, "体力", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		
	//	GmPlay.xani_ui3.DrawAnima(x+100, y+365-11, "大血条",0);
	//	GmPlay.xani_ui3.DrawAnima(x+100, y+365+33-11, "大血条",0);
	//	GmPlay.xani_ui3.DrawAnima(x+100, y+365+33*2-11, "大血条",0);
		
		var w=67,h=38;
		
		GmPlay.xani_nui2.DrawAnima(xx+w, yy, "宠物大血条",0);
		GmPlay.xani_nui2.DrawAnima(xx+w, yy+h, "宠物大血条",0);
		GmPlay.xani_nui2.DrawAnima(xx+w, yy+h*2, "宠物大血条",0);
		GmPlay.xani_nui2.DrawAnima(xx+w, yy+h*3, "宠物大血条",0);
		GmPlay.xani_nui2.DrawAnima(xx+w, yy+h*4, "宠物大血条",0);
		
		M3DFast.gi().SetViewClip(xx, yy, xx+w+311*GmMe.me.rbs.iHp/GmMe.me.rbs.iMaxHp, yy+480);
		GmPlay.xani_nui2.DrawAnima(xx+w+2, yy+3, "宠物大血条",1);
		M3DFast.gi().NoClip();
		M3DFast.gi().SetViewClip(xx, yy, xx+w+311*GmMe.me.rbs.iMp/GmMe.me.rbs.iMaxMp, yy+480);
		GmPlay.xani_nui2.DrawAnima(xx+w+2, yy+h+3, "宠物大血条",2);
		M3DFast.gi().NoClip();
		var l=311;
		l=l*GmMe.me.rbs.iExp/GameData.iUpgradeExp[GmMe.me.rbs.iLev];
		M3DFast.gi().SetViewClip(xx, yy,  (xx+w+l), yy+480);
		GmPlay.xani_nui2.DrawAnima(xx+w+2, yy+h*2+3, "宠物大血条",3);
		M3DFast.gi().NoClip();
		//愤怒
		M3DFast.gi().SetViewClip(xx, yy, xx+w+311*GmMe.me.rbs.iAnger/150, yy+480);
		GmPlay.xani_nui2.DrawAnima(xx+w+2, yy+h*3+3, "宠物大血条",5);
		M3DFast.gi().NoClip();
		//体力
		M3DFast.gi().SetViewClip(xx, yy, xx+w+311*GmMe.me.rbs.iPower/GmMe.me.rbs.iMaxPower, yy+480);
		GmPlay.xani_nui2.DrawAnima(xx+w+2, yy+h*4+3, "宠物大血条",4);
		M3DFast.gi().NoClip();
	
		M3DFast.gi().DrawTextEx(xx+w+311/2, yy+15,GmMe.me.rbs.iHp+"/"+GmMe.me.rbs.iMaxHp, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(xx+w+311/2, yy+40+13,GmMe.me.rbs.iMp+"/"+GmMe.me.rbs.iMaxMp, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(xx+w+311/2, yy+80+12,GmMe.me.rbs.iExp+"/"+GameData.iUpgradeExp[GmMe.me.rbs.iLev], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(xx+w+311/2, yy+120+13,GmMe.me.rbs.iAnger+"/"+150, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(xx+w+311/2, yy+160+12,GmMe.me.rbs.iPower+"/"+GmMe.me.rbs.iMaxPower, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);

		
	//	GmPlay.xani_ui3.DrawAnima(x+345, y, "大框分割线",0);
		
		
		
	//	if(GmMe.me.rbs.sTitle.length<=0)DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40,70,150,"称谓","无");
	//	else DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40,70,150,"称谓",""+GmMe.me.rbs.sTitle);
	//	DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*2,70,150,"门派",GameData.sSchools[GmMe.me.rbs.iSchoolId]);
	//	if(MyGov.mg.iRealGid==-1)DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*3,70,150,"帮派","无");
	//	else DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*3,70,150,"帮派",MyGov.mg.sName);

		
		
		/*
		DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*4,70,90,"体质",""+GmMe.me.rbs.tz);
		DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*5,70,90,"法力",""+GmMe.me.rbs.fl);
		DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*6,70,90,"力量",""+GmMe.me.rbs.ll);
		DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*7,70,90,"耐力",""+GmMe.me.rbs.nl);
		DrawMode.ui3_Text1(MyAttFrame.iX+390,MyAttFrame.iY+40*8,70,90,"敏捷",""+GmMe.me.rbs.mj);
		
		DrawMode.ui3_Text1(MyAttFrame.iX+570,MyAttFrame.iY+40*4,70,90,"灵力",""+GmMe.me.rbs.iSpirit);
		DrawMode.ui3_Text1(MyAttFrame.iX+570,MyAttFrame.iY+40*5,70,90,"伤害",""+GmMe.me.rbs.iAttack);
		DrawMode.ui3_Text1(MyAttFrame.iX+570,MyAttFrame.iY+40*6,70,90,"防御",""+GmMe.me.rbs.iDefence);
		DrawMode.ui3_Text1(MyAttFrame.iX+570,MyAttFrame.iY+40*7,70,90,"速度",""+GmMe.me.rbs.iSpeed);
		
		M3DFast.gi().DrawText_2(MyAttFrame.iX+570+20,MyAttFrame.iY+40*8+16, "剩余："+GmMe.me.rbs.nut, 0xffffff00, 22, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
		*/
		x = MyAttFrame.iX+472; y = MyAttFrame.iY+242+35;
		DrawMode.ui3_Text1_(x, y,67,100,"体质",""+GmMe.me.rbs.tz);
		DrawMode.ui3_Text1_(x, y+40,67,100,"法力",""+GmMe.me.rbs.fl);
		DrawMode.ui3_Text1_(x, y+80,67,100,"力量",""+GmMe.me.rbs.ll);
		DrawMode.ui3_Text1_(x, y+120,67,100,"耐力",""+GmMe.me.rbs.nl);
		DrawMode.ui3_Text1_(x, y+160,67,100,"敏捷",""+GmMe.me.rbs.mj);
		
		DrawMode.ui3_Text1_(x+210, y,67,100,"灵力",""+GmMe.me.rbs.iSpirit);
		DrawMode.ui3_Text1_(x+210, y+40,67,100,"伤害",""+GmMe.me.rbs.iAttack);
		DrawMode.ui3_Text1_(x+210, y+80,67,100,"防御",""+GmMe.me.rbs.iDefence);
		DrawMode.ui3_Text1_(x+210, y+120,67,100,"速度",""+GmMe.me.rbs.iSpeed);
		DrawMode.ui3_Text1_(x+210, y+160,67,100,"潜能",""+GmMe.me.rbs.nut);
		
		
		
	//	DrawMode.ui3_Text2(MyAttFrame.iX+390,MyAttFrame.iY+360,90,150,"升级经验",""+GameData.iUpgradeExp[GmMe.me.rbs.iLev]);
	//	DrawMode.ui3_Text2(MyAttFrame.iX+390,MyAttFrame.iY+360+50,90,150,"获得经验",""+GmMe.me.rbs.iExp);
		
		this.btn_upgrade.Move(MyAttFrame.iX+472, MyAttFrame.iY+503, 110, 52);
		this.btn_addpoint.Move(MyAttFrame.iX+733, MyAttFrame.iY+503, 110, 52);
		this.btn_upgrade.Draw();
		this.btn_addpoint.Draw();
	}
	
	
	Draw_12( x,  y)
	{	
		var offxx,offyy,offww,offhh;
		
		offxx=MyAttFrame.iX+28;
		offyy=MyAttFrame.iY+28;
		offww=MyAttFrame.iW-28-28;
		offhh=MyAttFrame.iH-28-28;
		
		DrawMode.new_framein(offxx,offyy,offww,offhh);//背景
		
		if(this.iPage_jn == 1){//显示门派技能
			this.btn_mpjn.iNameColor = 0xffffd700;
			this.btn_fzjn.iNameColor = 0xffb0e0e6;
			this.btn_jqjn.iNameColor = 0xffb0e0e6;
			
			this.Draw_1(x, y);
		}
		else if(this.iPage_jn == 2){//显示辅助技能
			this.btn_mpjn.iNameColor = 0xffb0e0e6;
			this.btn_fzjn.iNameColor = 0xffffd700;
			this.btn_jqjn.iNameColor = 0xffb0e0e6;
			
			this.Draw_2(x, y);
		}
		else if(this.iPage_jn == 3){//显示剧情技能
			this.btn_mpjn.iNameColor = 0xffb0e0e6;
			this.btn_fzjn.iNameColor = 0xffb0e0e6;
			this.btn_jqjn.iNameColor = 0xffffd700;
			
		}
		
		this.btn_mpjn.Move(MyAttFrame.iX+53, MyAttFrame.iY+53, 145, 56);
		this.btn_mpjn.Draw();
		
		this.btn_fzjn.Move(MyAttFrame.iX+209, MyAttFrame.iY+53, 145, 56);
		this.btn_fzjn.Draw();
		
//		this.btn_jqjn.Move(MyAttFrame.iX+374, MyAttFrame.iY+53, 145, 56);
//		this.btn_jqjn.Draw();
		
	}
	
	Draw_1( x, y)
	{
		
		if(GmMe.me.rbs.iSchoolId<=0)
		{
			this.pm3f.DrawTextEx(x+150, y+150, "你还未加入门派", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			return;
		}
		
		var i,j;
		var schoolid=GmMe.me.rbs.iSchoolId;//门派ID
		var mid;//主技能ID列表
		
		DrawMode.new_frameon(MyAttFrame.iX+459,MyAttFrame.iY+115,408,109,0);
		DrawMode.new_frameon(MyAttFrame.iX+459,MyAttFrame.iY+235,408,324,0);
		
		for(i=0;i<6;i++)
		{
		
			mid=GameData.iSchoolSkillId[schoolid][i];//
		/*	if(this.iMainSkillPoint==i)GmPlay.xani_ui3.DrawAnima(x+40, y+35+i*70, "选中背景",0);
			GmPlay.xani_ui3.DrawAnima(x+50, y+35+i*70, "技能外框",0);
			
			GmPlay.xani_skill.DrawAnima_aa(x+50, y+35+i*70, GmPlay.de_skill.strValue(mid, 0, 5),0);
			M3DFast.gi().DrawText_2(x+120, y+35+i*70+15, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffe0c0, 20, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
			M3DFast.gi().DrawText_2(x+120, y+35+i*70+45, GmMe.me.rbs.iSchoolSkill[i]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, 0, -2, 2, 0xff000000);

			this.btn_mainskill[i].Move(x+50, y+35+i*70, 170, 60);
			*/
//			if(this.btn_mainskill[i].bMouseDown)
//			{//按下，显示技能详细
//				MyAttFrame.Skill_Detail(mid,x+10+w+(w+60)*(i%3), y+w+i/3*h,GmMe.me.rbs.iSchoolSkill[i]);
//			}
			
			var xx=0,yy=0;
			switch(i)
			{
			case 0:
				xx = MyAttFrame.iX+200; yy = MyAttFrame.iY+115+11;
				break;
			case 1:
				xx = MyAttFrame.iX+350; yy=MyAttFrame.iY+188+11;
				break;
			case 2:
				xx = MyAttFrame.iX+350; yy=MyAttFrame.iY+341+11;
				break;
			case 3:
				xx = MyAttFrame.iX+200; yy=MyAttFrame.iY+414+11;
				break;
			case 4:
				xx = MyAttFrame.iX+50; yy=MyAttFrame.iY+341+11;
				break;
			case 5:
				xx = MyAttFrame.iX+50; yy=MyAttFrame.iY+188+11;
				break;
			}
			GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",0);
			GmPlay.xani_nicon.DrawAnima_aa(xx, yy, GmPlay.de_skill.strValue(mid, 0, 5),0);
//			GmPlay.xani_skill.DrawAnima_aa(xx, yy, GmPlay.de_skill.strValue(mid, 0, 5),0);
			
			GmPlay.xani_nui2.DrawAnimaEx(xx+1, yy+87, "可变长文字框",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
			GmPlay.xani_nui2.DrawAnimaEx(xx+20+1, yy+87, "可变长文字框",1,101,2.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
			GmPlay.xani_nui2.DrawAnimaEx(xx+20+40+1, yy+87, "可变长文字框",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
			
			M3DFast.gi().DrawTextEx(xx+42, yy+92+12, ""+GmMe.me.rbs.iSchoolSkill[i], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawText_2(xx+42, yy+92+40, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffa500, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			
			this.btn_mainskill[i].Move(xx, yy, 92, 92);
			
		}
		
		//显示所选主技能
		var hhh = 5, www = 5;
		mid=GameData.iSchoolSkillId[schoolid][this.iMainSkillPoint];
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+466+www, MyAttFrame.iY+123+hhh, "技能框",0);
		GmPlay.xani_nicon.DrawAnima_aa(MyAttFrame.iX+466+www, MyAttFrame.iY+123+hhh, GmPlay.de_skill.strValue(mid, 0, 5),0);
		M3DFast.gi().DrawText_2(MyAttFrame.iX+466+42+www, MyAttFrame.iY+123+90+hhh-10, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffa500, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(mid, 0, 3), 309, 20);
		FormatString.gi().Draw(MyAttFrame.iX+560+www,MyAttFrame.iY+121+hhh);
		
		hhh = 8;
		//显示子技能背景框
		for(i=0;i<3;i++)
		{
		//	GmPlay.xani_ui3.DrawAnima(x+215, y+140+i*75, "技能分隔",0);
		//	GmPlay.xani_ui3.DrawAnima(x+230, y+150+i*75, "技能外框",0);
		//	DrawMode.ui3_Frame2(x+390,y+140+i*75+5,350,70);
			
			GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+466+www, MyAttFrame.iY+238+i*109+hhh, "技能框",0);
		}
		
		if(this.iMainSkillPoint>=0 && this.iMainSkillPoint<6)
		{//显示主技能所包含的子技能
			mid=GameData.iSchoolSkillId[schoolid][this.iMainSkillPoint];
			for(i=0;i<10;i++)
			{
				j=GmPlay.de_skill.intValue(mid, i, 4);//得到子技能ID
				if(j<=0)break;
				GmPlay.xani_nicon.DrawAnima_aa(MyAttFrame.iX+466+www,MyAttFrame.iY+238+i*109+hhh, GmPlay.de_skill.strValue(j,0, 5),0);
				M3DFast.gi().DrawText_2(MyAttFrame.iX+466+42+www,MyAttFrame.iY+238+i*109+90+hhh-10, GmPlay.de_skill.strValue(j, 0, 6), 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);

				FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(j, 0, 3), 309, 20);
				FormatString.gi().Draw(MyAttFrame.iX+560+www,MyAttFrame.iY+238+i*109+hhh);
			}
		}
		
		
	/*
		DrawMode.ui3_Frame2(x+230,y+30,510,90);
		mid=GameData.iSchoolSkillId[schoolid][this.iMainSkillPoint];//
		M3DFast.gi().DrawText_2(x+240, y+50, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffe0c0, 20, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
		FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(mid, 0, 3), 480, 20);
		FormatString.gi().Draw(x+240,y+70);
		
		for(i=0;i<4;i++)
		{
			GmPlay.xani_ui3.DrawAnima(x+215, y+140+i*75, "技能分隔",0);
			GmPlay.xani_ui3.DrawAnima(x+230, y+150+i*75, "技能外框",0);
			DrawMode.ui3_Frame2(x+390,y+140+i*75+5,350,70);
		}
		if(this.iMainSkillPoint>=0 && this.iMainSkillPoint<6)
		{//显示主技能所包含的子技能
			mid=GameData.iSchoolSkillId[schoolid][this.iMainSkillPoint];
			for(i=0;i<10;i++)
			{
				j=GmPlay.de_skill.intValue(mid, i, 4);//得到子技能ID
				if(j<=0)break;
				GmPlay.xani_skill.DrawAnima_aa(x+230,y+150+i*75, GmPlay.de_skill.strValue(j,0, 5),0);
				M3DFast.gi().DrawText_2(x+300,y+150+i*75+30, GmPlay.de_skill.strValue(j, 0, 6), 0xffffe0c0, 20, 101, 1, 1, 0, 0, -2, 3, 0xff000000);

				FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(j, 0, 3), 320, 20);
				FormatString.gi().Draw(x+400,y+150+i*75+30-FormatString.gi().MyAttFrame.iH/2);
			}
		}
		GmPlay.xani_ui3.DrawAnima(x+200, y, "大框分割线",0);
		*/
	}


	
	Draw_2( x, y)
	{
		var i,j,k=0;
		var mid;
		
	//	int w=60;
	//	int h=40+60;
		
		var offx,offy;
		
		DrawMode.new_frameon(MyAttFrame.iX+537,MyAttFrame.iY+118,331,269,0);
		DrawMode.new_frameon(MyAttFrame.iX+537,MyAttFrame.iY+417,331,144,0);
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+554, MyAttFrame.iY+127, "背景图案",0);
		
		//显示子技能背景框
		for(i=0;i<12;i++)
		{
			GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+52+(i%4)*120, MyAttFrame.iY+119+parseInt(i/4)*150, "技能框",0);
		}
		
		for(i=0;i<10;i++)
		{
			mid=0;
			offx=MyAttFrame.iX+52+(i%4)*120;
			offy=MyAttFrame.iY+119+parseInt(i/4)*150;
			this.btn_govskill[i].Move(-100, -100, 60, 60);
			if(i<8)
			{//帮派技能
				if(GmMe.me.rbs.iGovSkill[i]<=0)continue;//技能0级不显示
			//	if(this.iGovSkillPoint==i)GmPlay.xani_ui3.DrawAnima(offx,offy, "技能外框",0);
				mid=GameData.iGovSkillId[i];
			
				GmPlay.xani_nicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(mid, 0, 5),0);
			//	M3DFast.gi().DrawText_2(offx+30, offy+75, GmPlay.de_skill.strValue(mid, 0, 6)+"Lv."+GmMe.me.rbs.iGovSkill[i], 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			
				GmPlay.xani_nui2.DrawAnimaEx(offx+1, offy+87, "可变长文字框",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				GmPlay.xani_nui2.DrawAnimaEx(offx+20+1, offy+87, "可变长文字框",1,101,2.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				GmPlay.xani_nui2.DrawAnimaEx(offx+20+40+1, offy+87, "可变长文字框",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				M3DFast.gi().DrawTextEx(offx+42, offy+92+12, ""+GmMe.me.rbs.iGovSkill[i], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
				M3DFast.gi().DrawText_2(offx+42, offy+92+38, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffa500, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
				
			
			}
			else if(i==8)//额外技能，无影手203，变身术204
			{//8,9
				j=GmMe.me.iFlag[33]%10;//无影手等级
				if(j<=0)continue;
			//	if(this.iGovSkillPoint==i)GmPlay.xani_ui3.DrawAnima(offx,offy, "技能外框",0);
				mid=203;
				GmPlay.xani_nicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(mid, 0, 5),0);
			//	M3DFast.gi().DrawText_2(offx+30, offy+75, GmPlay.de_skill.strValue(mid, 0, 6)+"Lv."+j, 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			
				GmPlay.xani_nui2.DrawAnimaEx(offx+1, offy+87, "可变长文字框",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				GmPlay.xani_nui2.DrawAnimaEx(offx+20+1, offy+87, "可变长文字框",1,101,2.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				GmPlay.xani_nui2.DrawAnimaEx(offx+20+40+1, offy+87, "可变长文字框",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				M3DFast.gi().DrawTextEx(offx+42, offy+92+12, ""+j, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
				M3DFast.gi().DrawText_2(offx+42, offy+92+38, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffa500, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
				
			
			}
			else if(i==9)
			{
				j=parseInt(GmMe.me.iFlag[33]/10)%10;//变身术等级
				if(j<=0)continue;
			//	if(this.iGovSkillPoint==i)GmPlay.xani_ui3.DrawAnima(offx,offy, "技能外框",0);
				mid=204;
				GmPlay.xani_nicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(mid, 0, 5),0);
			//	M3DFast.gi().DrawText_2(offx+30, offy+75, GmPlay.de_skill.strValue(mid, 0, 6)+"Lv."+j, 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			
				GmPlay.xani_nui2.DrawAnimaEx(offx+1, offy+87, "可变长文字框",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				GmPlay.xani_nui2.DrawAnimaEx(offx+20+1, offy+87, "可变长文字框",1,101,2.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				GmPlay.xani_nui2.DrawAnimaEx(offx+20+40+1, offy+87, "可变长文字框",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
				M3DFast.gi().DrawTextEx(offx+42, offy+92+12, ""+j, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
				M3DFast.gi().DrawText_2(offx+42, offy+92+38, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffa500, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			}
			else continue;
			this.btn_govskill[i].Move(offx, offy, 92, 92);
			k++;
			
			if(this.iGovSkillPoint==i && mid!=0)
			{
				
				M3DFast.gi().DrawTextEx(MyAttFrame.iX+542,MyAttFrame.iY+421, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffffff, 22, 101, 1, 1, 0, 0, 0);

				FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(mid, 0, 3), 320, 20);
				FormatString.gi().Draw(MyAttFrame.iX+542,MyAttFrame.iY+458);
			}
		}
		
//		M3DFast.gi().DrawText_2(MyAttFrame.iX+537, MyAttFrame.iY+393, "可用剧情点 ", 0xffaeeeee, 22, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		
		
		
		
		/*
		
		//======================
		var i,j,k;
		var mid;
		
		var w=60;
		var h=40+60;
		
		var offx,offy;
		
		x+=10;
//		y+=10;
		
		GmPlay.xani_ui3.DrawAnima(MyAttFrame.iX+437, MyAttFrame.iY, "大框分割线",0);
		DrawMode.ui3_Frame2(MyAttFrame.iX+500,MyAttFrame.iY+60,200,350);
		k=0;
		for(i=0;i<10;i++)
		{
			mid=0;
			offx=x+10+w+(w+60)*(k%3);
			offy=y+w+k/3*h;
			this.btn_govskill[i].Move(-100, -100, 60, 60);
			if(i<8)
			{//帮派技能
				if(GmMe.me.rbs.iGovSkill[i]<=0)continue;//技能0级不显示
				if(this.iGovSkillPoint==i)GmPlay.xani_ui3.DrawAnima(offx,offy, "技能外框",0);
				mid=GameData.iGovSkillId[i];
				GmPlay.xani_skillicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(mid, 0, 5),0);
				M3DFast.gi().DrawText_2(offx+30, offy+75, GmPlay.de_skill.strValue(mid, 0, 6)+GmMe.me.rbs.iGovSkill[i]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			}
			else if(i==8)//额外技能，无影手203，变身术204
			{//8,9
				j=GmMe.me.iFlag[33]%10;//无影手等级
				if(j<=0)continue;
				if(this.iGovSkillPoint==i)GmPlay.xani_ui3.DrawAnima(offx,offy, "技能外框",0);
				mid=203;
				GmPlay.xani_skillicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(mid, 0, 5),0);
				M3DFast.gi().DrawText_2(offx+30, offy+75, GmPlay.de_skill.strValue(mid, 0, 6)+j+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			}
			else if(i==9)
			{
				j=GmMe.me.iFlag[33]/10%10;//变身术等级
				if(j<=0)continue;
				if(this.iGovSkillPoint==i)GmPlay.xani_ui3.DrawAnima(offx,offy, "技能外框",0);
				mid=204;
				GmPlay.xani_skillicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(mid, 0, 5),0);
				M3DFast.gi().DrawText_2(offx+30, offy+75, GmPlay.de_skill.strValue(mid, 0, 6)+j+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			}
			else continue;
			this.btn_govskill[i].Move(offx, offy, 60, 60);
			k++;
			
			if(this.iGovSkillPoint==i && mid!=0)
			{
				
				M3DFast.gi().DrawText_2(MyAttFrame.iX+510,MyAttFrame.iY+70, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffe0c0, 20, 101, 1, 1, 0, 0, 0, 3, 0xff000000);

				FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(mid, 0, 3), 180, 20);
				FormatString.gi().Draw(MyAttFrame.iX+510,MyAttFrame.iY+70+30);

//				GmPlay.xani_goods.DrawAnimaEx(x+10+w+(w+60)*(i%3), y+w+i/3*h,"物品锁定框", 0, 101, 1, 1, 0, 0, 0);
			}
//			if(this.btn_govskill[i].bMouseDown)
//			{//按下，显示技能详细
//				MyAttFrame.Skill_Detail(mid,x+10+w+(w+60)*(i%3), y+w+i/3*h,GmMe.me.rbs.iGovSkill[i]);
//			}
		}
		

//		if(this.iGovSkillPoint!=-1)
//		{
//			mid=GameData.iGovSkillId[this.iGovSkillPoint];
//			M3DFast.gi().DrawText_2(MyAttFrame.iX+510,MyAttFrame.iY+70, GmPlay.de_skill.strValue(mid, 0, 6), 0xffffe0c0, 20, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
//
//			FormatString.gi().Format("#cffe0c0"+GmPlay.de_skill.strValue(mid, 0, 3), 180, 20);
//			FormatString.gi().Draw(MyAttFrame.iX+510,MyAttFrame.iY+70+30);
//		}
 */
 
	}
	Draw_3( x, y)
	{
		var offxx,offyy,offww,offhh;
		
		offxx=MyAttFrame.iX+28;
		offyy=MyAttFrame.iY+28;
		offww=MyAttFrame.iW-28-28;
		offhh=MyAttFrame.iH-28-28;
		
		DrawMode.new_framein(offxx,offyy,offww,offhh);//背景
		
		var i;
		DrawMode.new_frameon(MyAttFrame.iX+55,MyAttFrame.iY+54,84,294,0);
		DrawMode.new_frameon(MyAttFrame.iX+55,MyAttFrame.iY+344,84,211,0);
		
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+81, MyAttFrame.iY+126, "人物宠物修炼",0);
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+81, MyAttFrame.iY+383, "人物宠物修炼",1);
		
		GmPlay.xani_nui2.DrawAnimaEx(MyAttFrame.iX+135, MyAttFrame.iY+56, "标题条",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(MyAttFrame.iX+135+20,MyAttFrame.iY+56, "标题条",1,101,(720-40)/20,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(MyAttFrame.iX+135+720-20, MyAttFrame.iY+56, "标题条",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
		
		M3DFast.gi().DrawText_2(MyAttFrame.iX+258,MyAttFrame.iY+82, "修炼选项", 0xffeeee00, 30, 101, 1, 1, 0, -2, -2, 3, 0xffcd3700);
		M3DFast.gi().DrawText_2(MyAttFrame.iX+496,MyAttFrame.iY+82, "等级", 0xffeeee00, 30, 101, 1, 1, 0, -2, -2, 3, 0xffcd3700);
		M3DFast.gi().DrawText_2(MyAttFrame.iX+737,MyAttFrame.iY+82, "修炼经验", 0xffeeee00, 30, 101, 1, 1, 0, -2, -2, 3, 0xffcd3700);
		
		for(i=0;i<6;i++)
		{
		//	DrawMode.ui3_Text1(MyAttFrame.iX+90,MyAttFrame.iY+150+40*i,130,120,GmPlay.de_skill.strValue(GameData.iGovXiuId[i], 0, 5),""+GmMe.me.rbs.iGovXiu[i][0]+"/"+(GmMe.me.rbs.iLev/5));
			if(i%2==0)
				DrawMode.new_bgbar(MyAttFrame.iX+135, MyAttFrame.iY+107+i*40, 720, 20,"内容条1");
			else
				DrawMode.new_bgbar(MyAttFrame.iX+135, MyAttFrame.iY+107+i*40, 720, 20,"内容条2");
			
			M3DFast.gi().DrawTextEx(MyAttFrame.iX+258, MyAttFrame.iY+129+40*i, GmPlay.de_skill.strValue(GameData.iGovXiuId[i], 0, 5), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(MyAttFrame.iX+496, MyAttFrame.iY+129+40*i, GmMe.me.rbs.iGovXiu[i][0]+"/"+parseInt(GmMe.me.rbs.iLev/5), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(MyAttFrame.iX+737, MyAttFrame.iY+129+40*i, GmMe.me.rbs.iGovXiu[i][1]+"/"+parseInt(MyGov.iBuildingUpgrad[GmMe.me.rbs.iGovXiu[i][0]]/10), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			
		//	DrawMode.ui3_Text1_(MyAttFrame.iX+323, MyAttFrame.iY+104+36*i,67,100,"等级",""+GmMe.me.rbs.iGovXiu[i][0]+"/"+(GmMe.me.rbs.iLev/5));
		//	DrawMode.ui3_Text1_4word_(MyAttFrame.iX+593, MyAttFrame.iY+104+36*i,110,120,"修炼经验",""+"999／9999");
				
		}
		
		//GmPlay.xani_ui3.DrawAnima(MyAttFrame.iX+390, MyAttFrame.iY, "大框分割线",0);

		//M3DFast.gi().DrawText_2(MyAttFrame.iX+220,MyAttFrame.iY+373, "宠物修炼", 0xff003e57, 30, 101, 1, 1, 0, -2, -2, 3, 0xff8dffff);
		
		GmPlay.xani_nui2.DrawAnimaEx(MyAttFrame.iX+135, MyAttFrame.iY+346, "标题条",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(MyAttFrame.iX+135+20,MyAttFrame.iY+346, "标题条",1,101,(720-40)/20,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(MyAttFrame.iX+135+720-20, MyAttFrame.iY+346, "标题条",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
		
		M3DFast.gi().DrawText_2(MyAttFrame.iX+258,MyAttFrame.iY+373, "修炼选项", 0xffeeee00, 30, 101, 1, 1, 0, -2, -2, 3, 0xffcd3700);
		M3DFast.gi().DrawText_2(MyAttFrame.iX+496,MyAttFrame.iY+373, "等级", 0xffeeee00, 30, 101, 1, 1, 0, -2, -2, 3, 0xffcd3700);
		M3DFast.gi().DrawText_2(MyAttFrame.iX+737,MyAttFrame.iY+373, "修炼经验", 0xffeeee00, 30, 101, 1, 1, 0, -2, -2, 3, 0xffcd3700);
		
		for(i=6;i<10;i++)
		{
		//	DrawMode.ui3_Text1(MyAttFrame.iX+460,MyAttFrame.iY+150+40*(i-6),130,120,GmPlay.de_skill.strValue(GameData.iGovXiuId[i], 0, 5),""+GmMe.me.rbs.iGovXiu[i][0]+"/"+(GmMe.me.rbs.iLev/5));
		
			if(i%2==0)
				DrawMode.new_bgbar(MyAttFrame.iX+135, MyAttFrame.iY+107+i*40+50, 720, 20,"内容条1");
			else
				DrawMode.new_bgbar(MyAttFrame.iX+135, MyAttFrame.iY+107+i*40+50, 720, 20,"内容条2");
			
			M3DFast.gi().DrawTextEx(MyAttFrame.iX+258, MyAttFrame.iY+129+40*i+50, GmPlay.de_skill.strValue(GameData.iGovXiuId[i], 0, 5), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(MyAttFrame.iX+496, MyAttFrame.iY+129+40*i+50, GmMe.me.rbs.iGovXiu[i][0]+"/"+parseInt(GmMe.me.rbs.iLev/5), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(MyAttFrame.iX+737, MyAttFrame.iY+129+40*i+50, GmMe.me.rbs.iGovXiu[i][1]+"/"+parseInt(MyGov.iBuildingUpgrad[GmMe.me.rbs.iGovXiu[i][0]]/10), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			
			
		//	DrawMode.ui3_Text1_(MyAttFrame.iX+323, MyAttFrame.iY+104+36*i+92,67,100,"等级",""+GmMe.me.rbs.iGovXiu[i][0]+"/"+(GmMe.me.rbs.iLev/5));
		//	DrawMode.ui3_Text1_4word_(MyAttFrame.iX+593, MyAttFrame.iY+104+36*i+92,110,120,"修炼经验",""+"999／9999");
			
		}
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+55+2, MyAttFrame.iY+344, "分隔条1",0);
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+376, MyAttFrame.iY+56, "分隔条1",1);
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+618, MyAttFrame.iY+56, "分隔条1",1);
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+376, MyAttFrame.iY+346, "分隔条1",1);
		GmPlay.xani_nui2.DrawAnima(MyAttFrame.iX+618, MyAttFrame.iY+346, "分隔条1",1);
	}
	

	Draw_4( x, y)
	{//VIP
		var i,j;
		var offxx,offyy,offww,offhh;
		
		offxx=MyAttFrame.iX+28;
		offyy=MyAttFrame.iY+28;
		offww=MyAttFrame.iW-28-28;
		offhh=MyAttFrame.iH-28-28;
		
		DrawMode.new_framein(offxx,offyy,offww,offhh);//背景
		
		if(this.list_vip==null)
		{//916-28-28-30-30=800
			this.list_vip=new UIList(0,4,MyAttFrame.iW-28-28-30-30,50+40*8);
			this.list_vip.SetTitle(0, "特权", 200,false);
			this.list_vip.SetTitle(1, "剩余天数<=30", 200,true);
			this.list_vip.SetTitle(2, "剩余天数<=60", 200,true);
			this.list_vip.SetTitle(3, "剩余天数>60", 200,true);
		}
		this.list_vip.BeginDraw(MyAttFrame.iX+28+30, MyAttFrame.iY+28+80);
		for(i=0;i<8;i++)
		{
			for(j=0;j<4;j++)
			{
				this.list_vip.DrawUnit(j, i, this._SVIPT[i+1][j]);
			}
		}
		this.list_vip.FinishDraw();
		
		if(GmMe.me.iFlag[20]>60)DrawMode.frame_type2("黄色透明框a25_25", MyAttFrame.iX+28+30+600, MyAttFrame.iY+28+80+50, 200, 40*8, 25, 25);
		else if(GmMe.me.iFlag[20]>30)DrawMode.frame_type2("黄色透明框a25_25", MyAttFrame.iX+28+30+400, MyAttFrame.iY+28+80+50, 200, 40*8, 25, 25);
		else if(GmMe.me.iFlag[20]>0)DrawMode.frame_type2("黄色透明框a25_25", MyAttFrame.iX+28+30+200, MyAttFrame.iY+28+80+50, 200, 40*8, 25, 25);
		
		
		M3DFast.gi().DrawText_2(MyAttFrame.iX+MyAttFrame.iW/2, MyAttFrame.iY+28+40, "会员特权", 0xff003e57, 40, 101, 1, 1, 0, -2, -2, 3, 0xff8dffff);
		
		if(GmMe.me.iFlag[20]<=0)M3DFast.gi().DrawTextEx(MyAttFrame.iX+MyAttFrame.iW/2+80, MyAttFrame.iY+28+40+20, "（还未开通）", 0xffff0000, 25, 101, 1, 1, 0, 0, -3);
		else  M3DFast.gi().DrawTextEx(MyAttFrame.iX+MyAttFrame.iW/2+80, MyAttFrame.iY+28+40+20, "（已开通：剩余"+GmMe.me.iFlag[20]+"天）", 0xffff0000, 25, 101, 1, 1, 0, 0, -3);
		
		this.btn_vip.Move(MyAttFrame.iX+MyAttFrame.iW-28-30-141, MyAttFrame.iY+MyAttFrame.iH-28-30-49, 141, 49);
		this.btn_vip.Draw();
		
		
		if(Confirm1.end(Confirm1.CONFIRM_VIP))
		{
			if(Confirm1.bConfirm)
			{//同意开通VIP
				GmProtocol.gi().s_SeverEvent(7, 0, 0, 0, 0);
//				if(GmMe.me.rbs.iInGot<300)EasyMessage.easymsg.AddMessage("元宝不足");
//				GmProtocol.gi().s_UpgradeMe(GmMe.me.rbs.iLev);
			}
		}
	}
	Draw()
	{
		var i;
	/*	if(this.iPage==0)DrawMode.ui3_BaseFrame4(MyAttFrame.iX,MyAttFrame.iY,"人","物","属","性");
		else if(this.iPage==1)DrawMode.ui3_BaseFrame4(MyAttFrame.iX,MyAttFrame.iY,"人","物","技","能");
		else if(this.iPage==2)DrawMode.ui3_BaseFrame4(MyAttFrame.iX,MyAttFrame.iY,"辅","助","技","能");
		else if(this.iPage==3)DrawMode.ui3_BaseFrame2(MyAttFrame.iX,MyAttFrame.iY,"修","炼");
		else DrawMode.ui3_BaseFrame3(MyAttFrame.iX,MyAttFrame.iY,"V","I","P");*/
//		GmPlay.xani_ui3.DrawAnima(MyAttFrame.iX, MyAttFrame.iY, "基本大框",0);
//		GmPlay.xani_ui3.DrawAnima(MyAttFrame.iX, MyAttFrame.iY, "大标签文字_人物",this.iPage);
		
		DrawMode.new_baseframe2(MyAttFrame.iX, MyAttFrame.iY, MyAttFrame.iW, MyAttFrame.iH, "人", "物");

		this.btn_close.Draw();
		
		for(i=0;i<4;i++)
		{
			if(this.iPage==i)
			{
				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
		}
		DrawMode.new_lableword4(MyAttFrame.iX+MyAttFrame.iW-15, MyAttFrame.iY+50+130*0-4, 40, 70,this.iPage==0,"人","物","属","性");
		DrawMode.new_lableword4(MyAttFrame.iX+MyAttFrame.iW-15, MyAttFrame.iY+50+130*1-8, 40, 70,this.iPage==1,"人","物","技","能");
		DrawMode.new_lableword2(MyAttFrame.iX+MyAttFrame.iW-15, MyAttFrame.iY+50+130*2+7, 40, 70,this.iPage==2,"修","炼");
		DrawMode.new_lableword2(MyAttFrame.iX+MyAttFrame.iW-15, MyAttFrame.iY+50+130*3-4, 40, 70,this.iPage==3,"会","员");
		
		
		switch(this.iPage)
		{
		case 0://base
			this.Draw_0(MyAttFrame.iX,MyAttFrame.iY);
			break;
		case 1://门派／辅助/剧情技能
			this.Draw_12(MyAttFrame.iX,MyAttFrame.iY);
			break;
		case 2://修炼
			this.Draw_3(MyAttFrame.iX,MyAttFrame.iY);
			break;
		case 3://VIP
//			Draw_Left(MyAttFrame.iX+10+70+10+20,MyAttFrame.iY+65+20);
			this.Draw_4(MyAttFrame.iX,MyAttFrame.iY);
			break;
	//	case 4://VIP
	//		this.Draw_4(MyAttFrame.iX,MyAttFrame.iY);
	//		break;
		}


		
		if(Confirm1.end(Confirm1.CONFIRM_UPGRADE))
		{
			if(Confirm1.bConfirm)
			{//同意升级
//				GmMe.me.rbs.iExp-=GameData.iUpgradeExp[GmMe.me.rbs.iLev];
//				GmMe.me.rbs.iLev++;
//				GmMe.me.CalcFightAtt();
//				GmMe.me.rbs.iHp=GmMe.me.rbs.iMaxHp;
//				GmMe.me.rbs.iMp=GmMe.me.rbs.iMaxMp;
				GmProtocol.gi().s_UpgradeMe(GmMe.me.rbs.iLev);
			}
		}
		if(AddPoint.end(AddPoint.ADDPOINT_USER))
		{
			if(AddPoint.bConfirm)
			{
				for(i=0;i<5;i++)GmMe.me.rbs.iBaseAtt[i]+=AddPoint.iModifys[i];
				GmMe.me.CalcFightAtt();
				GmProtocol.gi().s_AddPoint(AddPoint.iModifys[0],AddPoint.iModifys[1],AddPoint.iModifys[2],AddPoint.iModifys[3],AddPoint.iModifys[4]);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<4;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
//					if(i==4)EasyMessage.easymsg.AddMessage("功能暂未开放");
//					else 
						this.iPage=i;
				}
			}
		}
		if(this.btn_mpjn.ProcTouch(msg, x, y))
		{
			if(this.btn_mpjn.bCheck())
			{
				this.iPage_jn = 1;
			}
		}
		if(this.btn_fzjn.ProcTouch(msg, x, y))
		{
			if(this.btn_fzjn.bCheck())
			{
				this.iPage_jn = 2;
			}
		}
/*		if(this.btn_jqjn.ProcTouch(msg, x, y))
		{
			if(this.btn_jqjn.bCheck())
			{
				this.iPage_jn = 3;
			}
		}*/

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())XStat.gi().PopStat(1);
			return true;
		}
		switch(this.iPage)
		{
		case 0:
			if(this.btn_upgrade.ProcTouch(msg, x, y))
			{
				if(this.btn_upgrade.bCheck())
				{
					if(GmMe.me.rbs.iLev>=80)EasyMessage.easymsg.AddMessage("等级已到达上限");
					else if(GmMe.me.rbs.iLev>=10 && GmMe.me.rbs.iSchoolId<=0)FrameMessage.fm.Open("少侠先去找个靠谱的门派拜师后再升级吧");
					else if(GmMe.me.rbs.iLev>=70 && (GmMe.me.iFlag[39]&4)==0)FrameMessage.fm.Open("你的等级上限还未突破70，请先完成修仙灵丹任务");
					else if(GmMe.me.rbs.iExp<GameData.iUpgradeExp[GmMe.me.rbs.iLev])EasyMessage.easymsg.AddMessage("经验不足，先去练练吧");
					else
					{//升级确认框
						if(GmMe.me.rbs.iLev>=10 && GmMe.me.rbs.iLev<=25)Confirm1.start(Confirm1.CONFIRM_UPGRADE,"10~25级之间可以拜师#e是否确认升级？");
						else Confirm1.start(Confirm1.CONFIRM_UPGRADE,"是否确认升级？");
					}
				}
				return true;
			}
			if(this.btn_addpoint.ProcTouch(msg, x, y))
			{
				if(this.btn_addpoint.bCheck())
				{//加点界面
//					if(GmMe.me.rbs.nut<=0)EasyMessage.easymsg.AddMessage("当前没有剩余点数可以加");
//					else
//					{
//						AddPoint.start(AddPoint.ADDPOINT_USER,GmMe.me.rbs.tz, GmMe.me.rbs.fl, GmMe.me.rbs.ll, GmMe.me.rbs.nl, GmMe.me.rbs.mj, GmMe.me.rbs.nut);
//					}
					XmsEngine.pxe.RunXms("人物加点");//TestRun.Run(100000, GmPlay.pxe.FindMain("工作项目测试"),new TestRun());
				}
				return true;
			}
			if(this.btn_title.ProcTouch(msg, x, y))
			{
				if(this.btn_title.bCheck())
				{//打开称谓选择
					GmProtocol.gi().s_proctitle(100, "");
					XStat.gi().PushStat(XStat.GS_SETTITLE);
				}
				return false;
			}
			break;
		case 1:
			switch(this.iPage_jn)
			{
			case 1://门派技能
				for(i=0;i<6;i++)
				{
					if(this.btn_mainskill[i].ProcTouch(msg, x, y))
					{
						if(this.btn_mainskill[i].bCheck())
						{
							this.iMainSkillPoint=i;
						}
					}
				}
				break;
			case 2://辅助技能
				for(i=0;i<10;i++)
				{
					if(this.btn_govskill[i].ProcTouch(msg, x, y))
					{
						if(this.btn_govskill[i].bCheck())
						{
							this.iGovSkillPoint=i;
						}
					}
				}
				break;
			case 3://剧情技能
				break;
			}
			break;
		case 2://修炼
			
			break;
		case 3://vip
			if(this.btn_vip.ProcTouch(msg, x, y))
			{
				if(this.btn_vip.bCheck())
				{//打开开通确认框
					Confirm1.start(Confirm1.CONFIRM_VIP,"是否确定花费300元宝增加30天会员期限？");
				}
				return true;
			}
			break;
		}

		if(XDefine.bOnRect(x, y, MyAttFrame.iX, MyAttFrame.iY, MyAttFrame.iW, MyAttFrame.iH))return true;
		return false;
	}
}
MyAttFrame.iX,MyAttFrame.iY,MyAttFrame.iW,MyAttFrame.iH;
	
MyAttFrame.Open=function( page)
{
	var maf=XStat.gi().PushStat(XStat.GS_MYATTFRAME);
	maf.iPage=page;
	return maf;
}

 MyAttFrame.wordframe=function( x, y, w)
{
	GmPlay.xani_nui2.DrawAnimaEx(x,y, "可变长文字框",0,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
	GmPlay.xani_nui2.DrawAnimaEx(x+15,y, "可变长文字框",1,101,1.0*(w-30)/20,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
	GmPlay.xani_nui2.DrawAnimaEx(x+w-20,y, "可变长文字框",2,101,1.0,1.0,0,0,0);//MyAttFrame.iX+50, MyAttFrame.iY+65+i*45, 128, 32
}

MyAttFrame.Skill_Detail=function( sid, x, y, lev)
{//技能详细描述
	var i;
	var w,h;
	w=300;

	FormatString.gi().FormatEx(GmPlay.de_skill.strValue(sid, 0, 3), w-30, 24, 0, 0, 28);
	h=20+80+10+FormatString.gi().iH+10+20;
	if(h<120)h=120;
	x-=w;
	y-=h-85;
	if(x<0)x=x+w+85;
	DrawMode.new_framewatch(x, y, w, h);
	GmPlay.xani_nicon.DrawAnima_aa(x+20, y+20, GmPlay.de_skill.strValue(sid, 0, 5),0);
	M3DFast.gi().DrawTextEx(x+20+80+10, y+20, GmPlay.de_skill.strValue(sid, 0, 6), 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
	
	i=GmPlay.de_skill.intValue(sid, 0, 7);
	if(i==1)M3DFast.gi().DrawTextEx(x+20+80+10, y+20+32, "战斗中使用", 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
	else if(i==0)M3DFast.gi().DrawTextEx(x+20+80+10, y+20+32, "漫游中使用", 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
	else if(i==3)M3DFast.gi().DrawTextEx(x+20+80+10, y+20+32, "被动技能", 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
	
	if(lev>=0)M3DFast.gi().DrawTextEx(x+20+80+10, y+20+56, "等级"+lev, 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
	FormatString.gi().Draw(x+20, y+20+80+10);
}