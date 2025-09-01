
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import MapManager from "../../../../map/MapManager"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyMission from "../../../../engtst/mgm/gameing/me/mission/MyMission"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import MySell from "../../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../../engtst/mgm/gameing/me/team/MyTeam"

import LianDanShu from "./LianDanShu"

export default class FastOperate extends BaseClass
{
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=910;
		this.iH=610;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
//		this.btn_close=new XButtonEx1(GmPlay.xani_ui3);
//		this.btn_close.InitButton("统一关闭按钮");
//		this.btn_close.Move(this.iX+748, this.iY, 60, 60);
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		
		this.btn_dundi=new XButton(GmPlay.xani_nicon);
		this.btn_dundi.InitButton("遁地术");
		this.btn_dundi.Move(GmConfig.SCRW,GmConfig.SCRH, 1, 1);
		
		
		this.btn_duanzao=new XButton(GmPlay.xani_nicon);
		this.btn_duanzao.InitButton("锻造");
		this.btn_duanzao.Move(GmConfig.SCRW,GmConfig.SCRH, 1, 1);
		
		this.btn_yejin=new XButton(GmPlay.xani_nicon);
		this.btn_yejin.InitButton("冶金");
		this.btn_yejin.Move(GmConfig.SCRW,GmConfig.SCRH, 1, 1);
		
		this.btn_jiancai=new XButton(GmPlay.xani_nicon);
		this.btn_jiancai.InitButton("剪裁");
		this.btn_jiancai.Move(GmConfig.SCRW,GmConfig.SCRH, 1, 1);
		
		this.btn_zhiyao=new XButton(GmPlay.xani_nicon);
		this.btn_zhiyao.InitButton("炼丹术");
		this.btn_zhiyao.Move(GmConfig.SCRW,GmConfig.SCRH, 1, 1);
		
		this.btn_pengren=new XButton(GmPlay.xani_nicon);
		this.btn_pengren.InitButton("烹饪");
		this.btn_pengren.Move(GmConfig.SCRW,GmConfig.SCRH, 1, 1);
		//////////////////////////////////////////////////////////////
		i=66; var w=120; var h = 60+185;
		
		this.btn_vip = new XButtonEx2(GmPlay.xani_nui2);
		this.btn_vip.InitButton("按钮3");
		this.btn_vip.sName="开通会员";
		this.btn_vip.Move(this.iX+this.iW-w-60, this.iY+h-i, 141, 49);
		this.btn_vip.iNameSize=25;
		
//		this.btn_sell=new XButtonEx1(GmPlay.xani_ui3);
		this.btn_sell = new XButtonEx2(GmPlay.xani_nui2);
		this.btn_sell.InitButton("按钮4");
		this.btn_sell.sName="摆    摊";
		this.btn_sell.Move(this.iX+this.iW-w-60, this.iY+h, 141, 49);
		this.btn_sell.iNameSize=25;
		
		this.btn_find=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_find.InitButton("按钮4");
		this.btn_find.sName="查找好友";
		this.btn_find.Move(this.iX+this.iW-w-60, this.iY+h+i, 141, 49);
		this.btn_find.iNameSize=25;
		
		this.btn_restore=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_restore.InitButton("按钮4");
		this.btn_restore.sName="快捷恢复";
		this.btn_restore.Move(this.iX+this.iW-w-60, this.iY+h+i*2, 141, 49);
		this.btn_restore.iNameSize=25;
		
		this.btn_dark=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_dark.InitButton("按钮4");
		if(GmMe.me.bDark)this.btn_dark.sName="遇怪:开";
		else this.btn_dark.sName="遇怪:关";
		this.btn_dark.Move(this.iX+this.iW-w-60, this.iY+h+i*3, 141, 49);
		this.btn_dark.iNameSize=25;
		
		this.btn_pk=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_pk.InitButton("按钮4");
		if(GmMe.me.bPk)this.btn_pk.sName="对战:开";
		else this.btn_pk.sName="对战:关";
		this.btn_pk.Move(this.iX+this.iW-w-60, this.iY+h+i*4, 141, 49);
		this.btn_pk.iNameSize=25;
		
//		btn_strange=new XButtonEx2(GmPlay.xani_nui2);
//		btn_strange.InitButton("按钮4");
//		if(GmMe.me.bStrange)btn_strange.sName="陌生:开";
//		else btn_strange.sName="陌生:关";
//		btn_strange.Move(this.iX+this.iW-w-60, this.iY+h+i*5, 141, 49);
//		btn_strange.iNameSize=25;
		this.bLockStatus=false;
		this.iStatusOffY = 0
	}
	
	Draw()
	{//快捷操作\\
//xuc	int i;
		var lt2;
//xuc	int offx,offy;
		var wgap=220;
		var hgap=36;
		var locky=0;
	//	DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"快捷操作");

		//12.20   画左按钮图标、文字、以及 基本大框
	//	DrawMode.ui3_BaseFrame4(this.iX,this.iY,"快","捷","操","作");
		
		//xuc 0325  =============
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "快","捷");
		
		var i,j;
		var offx,offy,offw,offh;
		
		offx=this.iX+30;
		offy=this.iY+30;
		offw=670;
		offh=315-30;
		
		DrawMode.new_framein(offx,offy,offw,offh);//左上背景
		
		offy=offy+offh+15;
		offh=220+30;

		DrawMode.new_framein(offx,offy,offw,offh);//左下背景
//		GmPlay.sop(""+(offx-this.iX)+",,,"+(offy-this.iY)+",,,"+offw+",,,"+offh);

	//	offx=this.iX+718;
		offx=offx+offw+15;
		offy=this.iY+30;
		offw=170;
		offh=550;

		DrawMode.new_framein(offx,offy,offw,offh);//右边背景

		this.btn_close.Draw();

//		DrawMode.Frame2_MD(this.iX+10, this.iY+65, this.iW-20, 115);
		//查看自身技能
		offx=this.iX+10+20;
		offy=this.iY+65+20;
		this.Draw_Skill(offx,offy);

		this.btn_vip.Draw();//vip
		this.btn_sell.Draw();//摆摊
		this.btn_find.Draw();
		this.btn_restore.Draw();
		this.btn_dark.Draw();//遇怪
		this.btn_pk.Draw();//pk
//		btn_strange.Draw();

		offx=this.iX+30;offy=this.iY+330;
		offw=670;offh=250;
		M3DFast.gi().SetViewClip(offx+20,offy+20,offx+offw-20,offy+offh-20);
		i=0;
		if(GmMe.me.bStandIn)this.DrawStatus(i++,"替身状态","开启");
		if(GmMe.me.bQP)this.DrawStatus(i++,"强行对战","开启");
		if(GmMe.me.iFlag[3]>0)this.DrawStatus(i++,"血池剩余:",""+GmMe.me.iFlag[3]);
		if(GmMe.me.iFlag[4]>0)this.DrawStatus(i++,"蓝池剩余:",""+GmMe.me.iFlag[4]);
		
		if(GmMe.me.iFlag[28]>0)i=this.DrawStatusEx1(i,"临时体质:","\t\t\t\t\t\t\t+"+((GmMe.me.iFlag[27]>>24)&0x1f),GmMe.me.iFlag[28]); //+((GmMe.me.iFlag[27]>>24)&0x1f)
		if(GmMe.me.iFlag[29]>0)i=this.DrawStatusEx1(i,"临时法力:","\t\t\t\t\t\t\t+"+((GmMe.me.iFlag[27]>>18)&0x1f),GmMe.me.iFlag[29]); //+((GmMe.me.iFlag[27]>>18)&0x1f)
		if(GmMe.me.iFlag[30]>0)i=this.DrawStatusEx1(i,"临时力量:","\t\t\t\t\t\t\t+"+((GmMe.me.iFlag[27]>>12)&0x1f),GmMe.me.iFlag[30]); //+((GmMe.me.iFlag[27]>>12)&0x1f)
		if(GmMe.me.iFlag[31]>0)i=this.DrawStatusEx1(i,"临时耐力:","\t\t\t\t\t\t\t+"+((GmMe.me.iFlag[27]>>6)&0x1f),GmMe.me.iFlag[31]); //+((GmMe.me.iFlag[27]>>6)&0x1f)
		if(GmMe.me.iFlag[32]>0)i=this.DrawStatusEx1(i,"临时敏捷:","\t\t\t\t\t\t\t+"+((GmMe.me.iFlag[27])&0x1f),GmMe.me.iFlag[32]); //+((GmMe.me.iFlag[27])&0x1f)
		
		if(GmMe.me.iFlagExt[1]>0)i=this.DrawStatusEx1(i,"临时愤怒:","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+((GmMe.me.iFlagExt[0])&0x1f),GmMe.me.iFlagExt[1]); //+((GmMe.me.iFlagExt[0])&0x1f)
		if(GmMe.me.iFlagExt[2]>0)i=this.DrawStatusEx1(i,"治疗能力:","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+((GmMe.me.iFlagExt[0]>>6)&0x1f)+"%",GmMe.me.iFlagExt[2]); //+((GmMe.me.iFlagExt[0]>>6)&0x1f)
		if(GmMe.me.iFlagExt[3]>0)i=this.DrawStatusEx1(i,"固定伤害:","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+((GmMe.me.iFlagExt[0]>>12)&0x1f),GmMe.me.iFlagExt[3]); //+((GmMe.me.iFlagExt[0]>>12)&0x1f)
		if(GmMe.me.iFlagExt[4]>0)
		{
			j=50+((GmMe.me.iFlagExt[0]>>18)&0x1f)*5;
			if(j%10==0)i=this.DrawStatusEx1(i,"物法命中","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+Math.floor(j/10)+"%",GmMe.me.iFlagExt[4]);
			else i=this.DrawStatusEx1(i,"物法命中","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+Math.floor(j/10)+"."+(j%10)+"%",GmMe.me.iFlagExt[4]);
		}
		if(GmMe.me.iFlagExt[5]>0)
		{
			j=10+((GmMe.me.iFlagExt[0]>>24)&0x1f)*5;
			if(j%10==0)i=this.DrawStatusEx1(i,"物法暴击","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+Math.floor(j/10)+"%",GmMe.me.iFlagExt[5]);
			else i=this.DrawStatusEx1(i,"物法暴击","\t\t\t\t\t\t\t\t\t\t\t\t\t+"+Math.floor(j/10)+"."+(j%10)+"%",GmMe.me.iFlagExt[5]);
		}
		if(GmMe.me.iFlagExt[7]>0)i=this.DrawStatusEx1(i,"人物修炼","\t\t\t\t\t\t\t+"+((GmMe.me.iFlagExt[6])&0x1f),GmMe.me.iFlagExt[7]);
		if(GmMe.me.iFlagExt[9]>0)i=this.DrawStatusEx1(i,"伤害结果","\t\t\t\t\t\t\t+"+((GmMe.me.iFlagExt[6]>>12)&0x1f)*20,GmMe.me.iFlagExt[9]);
		if(GmMe.me.iFlagExt[10]>0)i=this.DrawStatusEx1(i,"宠物属性","\t\t\t\t\t\t\t+"+((GmMe.me.iFlagExt[6]>>18)&0x1f),GmMe.me.iFlagExt[10]);
		
		if(GmMe.me.iFlag[5]>0)i=this.DrawStatusEx1(i,"双倍时间","",GmMe.me.iFlag[5]);
		if(GmMe.me.iFlag[34]>0)i=this.DrawStatusEx1(i,"三倍时间","",GmMe.me.iFlag[34]);
		if(GmMe.me.iFlag[22]>0)i=this.DrawStatusEx1(i,"双倍体力","",GmMe.me.iFlag[22]);
		if(GmMe.me.iFlag[23]>0)i=this.DrawStatusEx1(i,"自动遇怪","",GmMe.me.iFlag[23]);
		
		if(GmMe.me.iChangeType>0)
		{
			lt2=GmMe.me.iChangeLast+GmMe.me.ltex-XDefine.get_ms()/1000;
			if(lt2<0)GmMe.me.iChangeType=0;
			else
			{
				i=this.DrawStatusEx1(i,"变身状态\t\t\t\t\t\t\t\t\t\t\t\t\t",':'+GmPlay.de_pet.strValue(GmMe.me.iChangeType%10000, 0, 1),GmMe.me.iChangeLast);
				if(GmMe.me.iChangeSkill>0)this.DrawStatus(i++,"变身技能\t\t\t\t\t\t\t",GmPlay.de_skill.strValue(GmMe.me.iChangeSkill, 0, 6));
				if(GmMe.me.iChangeAtt>0)
				{
					j=GmMe.me.iChangeAtt%1000-100;
					var _ss=["气血","灵力","伤害","防御","速度"];
					this.DrawStatus(i++,"变身属性\t\t\t\t\t\t\t",(j>0?"+"+j:j)+"%"+_ss[Math.floor(GmMe.me.iChangeAtt/1000)%10]);
				}
				this.DrawStatus(i++,"变身对战\t\t\t\t\t\t\t","剩余"+GmMe.me.iChangeFC+"次");
			}
		}
		M3DFast.gi().NoClip();
		j=(i+1)/2;
		if(!this.bLockStatus)
		{
			if(this.iStatusOffY<0)this.iStatusOffY/=2;
			i=j*36-210;
			if(i<0)i=0;
			if(this.iStatusOffY>i)
			{
				this.iStatusOffY-=(this.iStatusOffY-i)/2;
			}
		}
	}
	
	 DrawStatusEx1( at, name, add, tm)
	{
		var lt=tm+GmMe.me.lt1-XDefine.get_ms()/1000;
		if(lt<0)return at;
		
		this.DrawStatus(at++,name,add+"("+Math.floor(lt/3600)+":"+Math.floor(lt/60%60)+":"+Math.floor(lt%60)+")");
		return at;
	}
	/**
	 * 
	 * @param {number} at 
	 * @param {string} name 
	 * @param {string} detail 
	 */
	 DrawStatus( at, name, detail)
	{//30,330,670,250
		var offx,offy;
		
		offx=this.iX+30+(at%2)*300+50;
		offy=this.iY+330+Math.floor(at/2)*36+10-this.iStatusOffY;
		
		DrawMode.ui3_Text2_(offx, offy,110,50,name,detail);
	}
	
	Draw_Skill( offx, offy)
	{//(this.iW-60-6*60)/7
	//	int space=(this.iW-60-6*60)/7;
		var basex=offx;
		var space = 35;
		offx+=space;
		offy-=35;
		
		GmPlay.xani_nui2.DrawAnima(this.iX+760,this.iY+50, "技能框",0);
		if(GmMe.me.rbs.iSchoolId>0)
		{//有门派，可遁地
//			GmPlay.sop("offx="+(offx-this.iX)+",,,,offy="+(offy-this.iY));
			this.btn_dundi.Move(this.iX+760,this.iY+50, 80, 80);
			this.btn_dundi.Draw();
			M3DFast.gi().DrawText_2(this.iX+760+40,this.iY+50+105, "遁地术", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		}
		
		GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
		if(GmMe.me.rbs.iGovSkill[1]>0)
		{
			this.btn_zhiyao.Move(offx, offy, 80, 80);
			this.btn_zhiyao.Draw();
			M3DFast.gi().DrawText_2(offx+40,offy+105, GmPlay.de_skill.strValue(GameData.iGovSkillId[1], 0, 6)+GmMe.me.rbs.iGovSkill[1]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		}
		offx+=90+space;
		
		GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
		if(GmMe.me.rbs.iGovSkill[2]>0)
		{
			this.btn_pengren.Move(offx, offy, 80, 80);
			this.btn_pengren.Draw();
			M3DFast.gi().DrawText_2(offx+40,offy+105, GmPlay.de_skill.strValue(GameData.iGovSkillId[2], 0, 6)+GmMe.me.rbs.iGovSkill[2]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		}
		offx+=90+space;
		
		GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
		if(GmMe.me.rbs.iGovSkill[3]>0)
		{
			this.btn_duanzao.Move(offx, offy, 80, 80);
			this.btn_duanzao.Draw();
			M3DFast.gi().DrawText_2(offx+40,offy+105, GmPlay.de_skill.strValue(GameData.iGovSkillId[3], 0, 6)+GmMe.me.rbs.iGovSkill[3]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		}
		offx+=90+space;
		
		GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
		if(GmMe.me.rbs.iGovSkill[4]>0)
		{
			this.btn_yejin.Move(offx, offy, 80, 80);
			this.btn_yejin.Draw();
			M3DFast.gi().DrawText_2(offx+40,offy+105, GmPlay.de_skill.strValue(GameData.iGovSkillId[4], 0, 6)+GmMe.me.rbs.iGovSkill[4]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			
		}
		offx+=90+space;
		
		GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
		if(GmMe.me.rbs.iGovSkill[5]>0)
		{
			this.btn_jiancai.Move(offx, offy, 80, 80);
			this.btn_jiancai.Draw();
			M3DFast.gi().DrawText_2(offx+40,offy+105, GmPlay.de_skill.strValue(GameData.iGovSkillId[5], 0, 6)+GmMe.me.rbs.iGovSkill[5]+"级", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		}
		offx+=90+space + 70;
		
//		offx = offx -(90+space)*6 - 70;
		offx=basex+space;
		offy += 135;
		//第二行 四个新技能
		{
			GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
			
			//this.btn_jiancai.Move(offx+10, offy+10, 60, 60);
			//this.btn_jiancai.Draw();
			//M3DFast.gi().DrawText_2(offx+45,offy+105, "探索", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			offx+=90+space;
		}
		{
			GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
			
			//this.btn_jiancai.Move(offx+10, offy+10, 60, 60);
			//this.btn_jiancai.Draw();
			//M3DFast.gi().DrawText_2(offx+45,offy+105, "识破", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			offx+=90+space;
		}
		{
			GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
			
			//this.btn_jiancai.Move(offx+10, offy+10, 60, 60);
			//this.btn_jiancai.Draw();
			//M3DFast.gi().DrawText_2(offx+45,offy+105, "建造", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			offx+=90+space;
		}
		{
			GmPlay.xani_nui2.DrawAnima(offx,offy, "技能框",0);
			
			//this.btn_jiancai.Move(offx+10, offy+10, 60, 60);
			//this.btn_jiancai.Draw();
			//M3DFast.gi().DrawText_2(offx+45,offy+105, "能工巧匠", 0xffffe0c0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			offx+=90+space;
		}
	}
//case 1:return "炼丹术";
//case 2:return "烹饪";
//case 3:return "锻造";
//case 4:return "冶金";
//case 5:return "剪裁";

	ProcTouch( msg, x, y)
	{
		var i;
		var offx,offy,offw,offh;
		offx=this.iX+30;offy=this.iY+330;
		offw=670;offh=250;
		if(this.bLockStatus)
		{
			if(msg==2)
			{
				this.iStatusOffY+=(this.iLockY-y);
				this.iLockY=y;
			}
			if(msg==3)this.bLockStatus=false;
		}
		if(XDefine.bInRect(x, y, offx, offy, offw, offh))
		{//可见高度210
			if(msg==1)
			{
				this.bLockStatus=true;
				this.iLockY=y;
			}
		}

		if(GmMe.me.rbs.iSchoolId>0)
		{//有门派，可遁地
			if(this.btn_dundi.ProcTouch(msg, x, y))
			{
				if(this.btn_dundi.bCheck())
				{
					if(MyTeam.bNoTeam() || MyTeam.bAway())
					{
						if(GmMe.me.rbs.iSchoolId>0)
						{
							GmProtocol.gi().s_UseSkill(0,0,0,0,0,0,0);
							XStat.gi().PopStat(1);
							MapManager.gi().iMapChangeing=100;
							
							if(MyMission.m.bCheckDoing(143))GmProtocol.gi().s_FinishMission(0,143,0,0);
						}
					}
					else EasyMessage.easymsg.AddMessage("队伍中不能使用遁地术");
				}
			}
		}
		if(GmMe.me.rbs.iGovSkill[1]>0)
		{//炼丹
			if(this.btn_zhiyao.ProcTouch(msg, x, y))
			{
				if(this.btn_zhiyao.bCheck())
				{
					XStat.gi().PopStat(1);
					LianDanShu.Open(null, null);
				}
				return true;
			}
		}
		if(GmMe.me.rbs.iGovSkill[2]>0)
		{//烹饪
			if(this.btn_pengren.ProcTouch(msg, x, y))
			{
				if(this.btn_pengren.bCheck())
				{
					if(GmMe.me.rbs.iGovSkill[2]<10)EasyMessage.easymsg.AddMessage("烹饪技能达到10级才可使用");
					else if(GmMe.me.rbs.iPower<GmMe.me.rbs.iGovSkill[2])EasyMessage.easymsg.AddMessage("体力不足无法烹饪");
					else GmProtocol.gi().s_UseSkill(9,0,0,0,0,0,0);
				}
				return true;
			}
		}
		if(GmMe.me.rbs.iGovSkill[3]>0)
		{//锻造
			if(this.btn_duanzao.ProcTouch(msg, x, y))
			{
				if(this.btn_duanzao.bCheck())
				{
					GmProtocol.gi().s_UseSkill(1,0,0,0,0,0,0);
				}
			}
		}
		if(GmMe.me.rbs.iGovSkill[4]>0)
		{//冶金
			if(this.btn_yejin.ProcTouch(msg, x, y))
			{
				if(this.btn_yejin.bCheck())
				{
					GmProtocol.gi().s_UseSkill(2,0,0,0,0,0,0);
				}
			}
		}		
		if(GmMe.me.rbs.iGovSkill[5]>0)
		{//剪裁
			if(this.btn_jiancai.ProcTouch(msg, x, y))
			{
				if(this.btn_jiancai.bCheck())
				{
					GmProtocol.gi().s_UseSkill(3,0,0,0,0,0,0);
				}
			}
		}
		////////////////////////////////////////////////////////////
		if(this.btn_vip.ProcTouch(msg, x, y))
		{
			if(this.btn_vip.bCheck())
			{
				XStat.gi().PopStat(1);
				MyAttFrame.Open(3);
			}
			return true;
		}
		if(this.btn_sell.ProcTouch(msg, x, y))
		{
			if(this.btn_sell.bCheck())
			{//摆摊/打开我的摊位
				if(GmMe.me.bHaveLock && GmMe.me.bLocked)EasyMessage.easymsg.AddMessage("未解锁不能摆摊");
				else if(MyTeam.bInTeam())EasyMessage.easymsg.AddMessage("队伍中不能摆摊");
				else if(GmMe.me.rbs.iLev<10)EasyMessage.easymsg.AddMessage("10级以上才能摆摊");
				else if(MySell.gi().bSelling)
				{
					MySell.gi().bShow=true;
					XStat.gi().PopStat(1);
				}
				else
				{//开始摆摊，是否离npc太近
					for(i=0;i<MapManager.gi().vbk.MAXVISUALBLOCK;i++)
					{
						if(MapManager.gi().vbk.vbs[i]!=null)
						{
							if(!MapManager.gi().vbk.vbs[i].bCurrentBlock)continue;
							if(XDefine.bInRect(MapManager.gi().vbk.vbs[i].iX, MapManager.gi().vbk.vbs[i].iY, GmMe.me.iX-100, GmMe.me.iY-160, 200, 200))
							//if(XDefine.llength(GmMe.me.iX, GmMe.me.iY, MapManager.gi().vbk.vbs[i].iX, MapManager.gi().vbk.vbs[i].iY)<150)
							{
								EasyMessage.easymsg.AddMessage("摆摊不能距离NPC太近");
								return true;
							}
						}
					}
					XStat.gi().PopStat(1);
					GmProtocol.gi().s_StartSell(0,0,0,"");
					if(GmMe.me.iFightMid>0)
					{
						GmMe.me.iFightMid=0;
						GmProtocol.gi().s_ChangeFightMounts(0);
					}
					GmMe.me.ChangeStat("站立");
				}
			}
			return true;
		}
		if(this.btn_find.ProcTouch(msg, x, y))
		{
			if(this.btn_find.bCheck())
			{//查找好友
				XStat.gi().PopStat(1);
				XStat.gi().PushStat(XStat.GS_FINDFRIEND);
			}
			return true;
		}
		if(this.btn_restore.ProcTouch(msg, x, y))
		{
			if(this.btn_restore.bCheck())
			{//恢复气血和魔法
				i=(GmMe.me.rbs.iMaxHp-GmMe.me.rbs.iHp);
				i+=(GmMe.me.rbs.iMaxMp-GmMe.me.rbs.iMp)*2;
				var pt=MyPets.mp.GetUseingPet();
				if(pt!=null)
				{
					i+=(pt.iMaxHp-pt.iHp);
					i+=(pt.iMaxMp-pt.iMp);
				}
				GmProtocol.gi().s_UseSkill(7,0,0,0,0,0,0);
//				XStat.gi().PopStat(1);
//				XStat.gi().PushStat(XStat.GS_SMALLMAP);
			}
			return true;
		}
		if(this.btn_dark.ProcTouch(msg, x, y))
		{
			if(this.btn_dark.bCheck())
			{
				GmMe.me.bDark=!GmMe.me.bDark;
				if(GmMe.me.bDark)
				{
					this.btn_dark.sName="遇怪:开";
					GmProtocol.gi().s_setflag(2, 0, 0);
				}
				else
				{
					this.btn_dark.sName="遇怪:关";
					GmProtocol.gi().s_setflag(2, 0, 1);
				}
			}
		}
		if(this.btn_pk.ProcTouch(msg, x, y))
		{
			if(this.btn_pk.bCheck())
			{
				GmMe.me.bPk=!GmMe.me.bPk;
				if(GmMe.me.bPk)
				{
					this.btn_pk.sName="对战:开";
					GmProtocol.gi().s_setflag(2, 1, 0);
				}
				else
				{
					this.btn_pk.sName="对战:关";
					GmProtocol.gi().s_setflag(2, 1, 1);
				}
			}
		}
//		if(btn_strange.ProcTouch(msg, x, y))
//		{
//			if(btn_strange.bCheck())
//			{
//				GmMe.me.bStrange=!GmMe.me.bStrange;
//				if(GmMe.me.bStrange)
//				{
//					btn_strange.sName="陌生:开";
//					GmProtocol.gi().s_setflag(2, 7, 0);
//				}
//				else
//				{
//					btn_strange.sName="陌生:关";
//					GmProtocol.gi().s_setflag(2, 7, 1);
//				}
//			}
//		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}
