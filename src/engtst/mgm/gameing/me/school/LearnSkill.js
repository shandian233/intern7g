
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class LearnSkill extends BaseClass{

	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=900;
		this.iH=620;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		/////////////////////////////////////////////////////////////////////////////////////////////////
		
		this.iMainSkillId=new Int32Array(LearnSkill.MAXSKILLCOUNT);//
		this.btn_main=new Array(LearnSkill.MAXSKILLCOUNT);//
		for(i=0;i<LearnSkill.MAXSKILLCOUNT;i++)
		{
			this.btn_main[i]=new XButton(GmPlay.xani_ui);
			this.btn_main[i].bSingleButton=true;
		}
//		this.btn_main[0].Move(this.iX+90, this.iY+10, 60, 60);
//		this.btn_main[1].Move(this.iX+10, this.iY+30, 60, 60);
//		this.btn_main[2].Move(this.iX+120-65, this.iY+100, 60, 60);
//		this.btn_main[3].Move(this.iX+120+5, this.iY+100, 60, 60);
//		this.btn_main[4].Move(this.iX+170, this.iY+30, 60, 60);

		this.iUseSkillId=new Int32Array(LearnSkill.MAXSKILLCOUNT);//
		this.btn_use=new Array(LearnSkill.MAXSKILLCOUNT);//
		for(i=0;i<LearnSkill.MAXSKILLCOUNT;i++)
		{
			this.btn_use[i]=new XButton(GmPlay.xani_ui);
			this.btn_use[i].bSingleButton=true;
		}

		this.iMainPoint=-1;
		this.iUsePoint=-1;
		this.InitSkill();
//		this.btn_learn.Move(this.iX+this.iW-80-5-20, this.iY+this.iH-50-5-20, 70, 40);
		this.btn_learn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_learn.InitButton("按钮1_110");
		this.btn_learn.Move(this.iX+this.iW-155, this.iY+this.iH-100, 110, 52);
		this.btn_learn.sName="学  习";
	}
	InitSkill()
	{
		var i,j,k;
		k=1;
		for(i=0;i<GmPlay.de_skill.iDataCount;i++)
		{
			j=GmPlay.de_skill.intValue(GmPlay.de_skill.datas[i].iDid, -1, 1);
			if(j==0)
			{//主技能A
				j=GmPlay.de_skill.intValue(GmPlay.de_skill.datas[i].iDid, -1, 2);
				if(j==GmMe.me.rbs.iSchoolId)
				{//门派对应
					this.iMainSkillId[0]=GmPlay.de_skill.datas[i].iDid;
				}
			}
			else if(j==1)
			{//主技能B
				j=GmPlay.de_skill.intValue(GmPlay.de_skill.datas[i].iDid, -1, 2);
				if(j==GmMe.me.rbs.iSchoolId)
				{//门派对应
					this.iMainSkillId[k]=GmPlay.de_skill.datas[i].iDid;
					k++;
				}
			}
		}
	}
	Draw()
	{
		var i,j,k;
		var offx,offy;
		var sid,lev;
		var dx,dy;
//		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
//		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		
		DrawMode.new_framein(this.iX+25, this.iY+25, 270, 570);
		for(i=0;i<LearnSkill.MAXSKILLCOUNT;i++)
		{
			offx=this.iX+25+20;
			offy=this.iY+25+20+i*90;
			this.btn_main[i].Move(offx,offy, 230, 80);
			if(this.iMainPoint==i)GmPlay.xani_nui2.DrawAnima(offx,offy, "选择主技能",1);
			else GmPlay.xani_nui2.DrawAnima(offx,offy, "选择主技能",0);
//			this.btn_main[i].Draw();
			GmPlay.xani_nicon.DrawAnima_aa(offx,offy, GmPlay.de_skill.strValue(GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], 0, 5), 0);//技能图标
			this.pm3f.DrawTextEx(offx+95,offy+25, GmPlay.de_skill.strValue(GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(offx+95, offy+60, GmMe.me.rbs.iSchoolSkill[i]+"级", 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
//			if(this.iMainPoint==i)
//			{
//				this.pm3f.DrawTextEx(this.iX+20+60, this.iY+20+i*60+8, GmPlay.de_skill.strValue(GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, 0);
//				this.pm3f.DrawTextEx(this.iX+20+60, this.iY+20+i*60+35, "Lv."+GmMe.me.rbs.iSchoolSkill[i], 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//			}
//			else
//			{
//				this.pm3f.DrawTextEx(this.iX+20+60, this.iY+20+i*60+8, GmPlay.de_skill.strValue(GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1, 6), 0xff000000, 25, 101, 1, 1, 0, 0, 0);
//				this.pm3f.DrawTextEx(this.iX+20+60, this.iY+20+i*60+35, "Lv."+GmMe.me.rbs.iSchoolSkill[i], 0xff000000, 20, 101, 1, 1, 0, 0, 0);
//			}
		}
		dx=this.iX+25+270+15+15;
		dy=this.iY+25+270+7+15;
		GmPlay.xani_nui2.DrawAnima(dx,dy, "技能说明框",0);
		// M3DFast.gi().FillRect_2D(dx,dy, dx+535, dy+110, 0xffff0000);

		offx=this.iX+25+270+15;
		offy=this.iY+25;
		DrawMode.new_framein(offx,offy, 565, 570);
		M3DFast.gi().FillRect_2D(offx+15,offy+15, offx+550, dy-15, 0xff649ea8);
		// GmPlay.xani_nui2.DrawAnima(offx+15,offy+15, "子技能大框",0);
		this.iUseSkillCount=0;
		if(this.iMainPoint>=0)
		{
			sid=GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][this.iMainPoint];
			lev=GmMe.me.rbs.iSchoolSkill[this.iMainPoint];
			
			if(this.iUsePoint==-1)
			{
				M3DFast.gi().DrawText_2(dx+5, dy+18, GmPlay.de_skill.strValue(sid, 0, 6), 0xff3de1e5, 28, 101, 1, 1, 0, 0, -2, 4, 0xff003e57);

				k=GmPlay.de_skill.intValue(sid, 0, 7);
				if(k==1)M3DFast.gi().DrawTextEx(dx+120, dy+18, "战斗中使用", 0xff3de1e5, 24, 101, 1, 1, 0, 0, -2);
				else if(k==0)M3DFast.gi().DrawTextEx(dx+120, dy+18, "漫游中使用", 0xff3de1e5, 24, 101, 1, 1, 0, 0, -2);
				else if(k==3)M3DFast.gi().DrawTextEx(dx+120, dy+18, "被动技能", 0xff3de1e5, 24, 101, 1, 1, 0, 0, -2);
				
				FormatString.gi().Format(GmPlay.de_skill.strValue(sid, 0, 3), 514, 20);
				FormatString.gi().Draw(dx+5, dy+38);
			}
			for(i=0;i<5;i++)
			{//包含子技能
				j=GmPlay.de_skill.intValue(sid, i, 4);
				if(j==-1)break;
				this.iUseSkillId[i]=j;
				offx=this.iX+25+270+15+15+7;
				offy=this.iY+25+15+7+i*84;
				if(this.iUsePoint==i)
				{
					GmPlay.xani_nui2.DrawAnima(offx, offy, "选择子技能",0);

					M3DFast.gi().DrawText_2(dx+5, dy+18, GmPlay.de_skill.strValue(j, 0, 6), 0xff3de1e5, 28, 101, 1, 1, 0, 0, -2, 4, 0xff003e57);

					k=GmPlay.de_skill.intValue(j, 0, 7);
					if(k==1)M3DFast.gi().DrawTextEx(dx+120, dy+18, "战斗中使用", 0xff3de1e5, 24, 101, 1, 1, 0, 0, -2);
					else if(k==0)M3DFast.gi().DrawTextEx(dx+120, dy+18, "漫游中使用", 0xff3de1e5, 24, 101, 1, 1, 0, 0, -2);
					else if(k==3)M3DFast.gi().DrawTextEx(dx+120, dy+18, "被动技能", 0xff3de1e5, 24, 101, 1, 1, 0, 0, -2);
					
					FormatString.gi().Format(GmPlay.de_skill.strValue(j, 0, 3), 514, 20);
					FormatString.gi().Draw(dx+5, dy+38);
				}
				else GmPlay.xani_nui2.DrawAnima(offx, offy, "选择子技能",1);
				this.btn_use[i].Move(offx,offy,520,84);
//				this.btn_use[i].Draw();
				GmPlay.xani_nicon.DrawAnima_aa(offx+2,offy+2, GmPlay.de_skill.strValue(j, 0, 5), 0);//技能图标

				this.pm3f.DrawTextEx(offx+95,offy+25, GmPlay.de_skill.strValue(j, -1, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);//名称
				k=GmPlay.de_skill.intValue(j, -1, 9);
				this.pm3f.DrawTextEx(offx+95,offy+60, "要求"+GmPlay.de_skill.strValue(GmPlay.de_skill.intValue(j, -1, 8), -1, 6)+">="+k+"级", lev>=k?0xff00ff00:0xffff0000, 20, 101, 1, 1, 0, 0, -2);
				
//				{
//					MyAttFrame.Skill_Detail(j, this.btn_use[i].iX, this.btn_use[i].iY, -1);
//				}
			}
			this.iUseSkillCount=i;
			
			offx=this.iX+25+270+15+15;
			offy=this.iY+25+270+7+110+7+18;
			GmPlay.xani_nui2.DrawAnima(offx, offy, "提示1",2);
			M3DFast.gi().DrawTextEx(offx+110/2, offy+32/2, "当前经验", 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			GmPlay.xani_nui2.DrawAnima(offx+110, offy, "提示2",0);
			M3DFast.gi().DrawTextEx(offx+110+120/2, offy+32/2, ""+GmMe.me.rbs.iExp, 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			
			offy+=40;
			GmPlay.xani_nui2.DrawAnima(offx, offy, "提示1",2);
			M3DFast.gi().DrawTextEx(offx+110/2, offy+32/2, "当前铜币", 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			GmPlay.xani_nui2.DrawAnima(offx+110, offy, "提示2",0);
			M3DFast.gi().DrawTextEx(offx+110+120/2, offy+32/2, ""+GmMe.me.rbs.iMoney, 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			
			offy+=40;
			GmPlay.xani_nui2.DrawAnima(offx, offy, "提示1",2);
			M3DFast.gi().DrawTextEx(offx+110/2, offy+32/2, "绑铜", 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			GmPlay.xani_nui2.DrawAnima(offx+110, offy, "提示2",0);
			M3DFast.gi().DrawTextEx(offx+110+120/2, offy+32/2, ""+GmMe.me.rbs.iReserve, 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			
			offx=this.iX+25+270+15+15+304;
			offy=this.iY+25+270+7+110+7+18;
			GmPlay.xani_nui2.DrawAnima(offx, offy, "提示1",2);
			M3DFast.gi().DrawTextEx(offx+110/2, offy+32/2, "所需经验", 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			GmPlay.xani_nui2.DrawAnima(offx+110, offy, "提示2",0);
			M3DFast.gi().DrawTextEx(offx+110+120/2, offy+32/2, ""+parseInt(GameData.iUpgradeExp[lev]/6), 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			
			offy+=40;
			GmPlay.xani_nui2.DrawAnima(offx, offy, "提示1",2);
			M3DFast.gi().DrawTextEx(offx+110/2, offy+32/2, "所需铜币", 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			GmPlay.xani_nui2.DrawAnima(offx+110, offy, "提示2",0);
			M3DFast.gi().DrawTextEx(offx+110+120/2, offy+32/2, ""+parseInt(GameData.iUpgradeMoney[lev]/18), 0xffffffff, 24, 101, 1, 1, 0, -2,-2);
			
//			DrawMode.Data1_BR(this.iX+220+10, this.iY+170, "花费经验",""+GameData.iUpgradeExp[lev]/6, 90, 140);
//			DrawMode.Data1_BR(this.iX+220+10, this.iY+195, "当前经验",""+GmMe.me.rbs.iExp, 90, 140);
//
//			
//			DrawMode.Data1_BR(this.iX+220+10, this.iY+240, "花费金钱",""+GameData.iUpgradeMoney[lev]/18, 90, 140);
//			DrawMode.Data1_BR(this.iX+220+10, this.iY+265, "当前金钱",""+GmMe.me.rbs.iMoney, 90, 140);
//			DrawMode.Data1_BR(this.iX+220+10, this.iY+290, "绑铜",""+GmMe.me.rbs.iReserve, 90, 140);
			
			this.btn_learn.Draw();
			
//			for(i=0;i<LearnSkill.MAXSKILLCOUNT;i++)
//			{
//				if(this.btn_main[i].bMouseDown)
//				{
//					MyAttFrame.Skill_Detail(GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], this.btn_main[i].iX, this.btn_main[i].iY, GmMe.me.rbs.iSchoolSkill[i]);
//				}
//			}
		}

		this.btn_close.Draw();

	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		///////////////////////////////////
		var i;
		for(i=0;i<6;i++)
		{
			if(this.btn_main[i].ProcTouch(msg, x, y))
			{
				if(this.btn_main[i].bMouseDown)
//				if(this.btn_main[i].bCheck())
				{
					this.iMainPoint=i;
					this.iUsePoint=-1;
				}
			}
		}
		for(i=0;i<this.iUseSkillCount;i++)
		{
			if(this.btn_use[i].ProcTouch(msg, x, y))
			{
				if(this.btn_use[i].bMouseDown)
//				if(this.btn_use[i].bCheck())
				{
					this.iUsePoint=i;
				}
			}
		}
		if(this.iMainPoint>=0)
		{
			if(this.btn_learn.ProcTouch(msg, x, y))
			{
				if(this.btn_learn.bCheck())
				{
					if(GmMe.me.rbs.iSchoolSkill[this.iMainPoint]>=GmMe.me.rbs.iLev+10)
					{
						EasyMessage.easymsg.AddMessage("不能超过人物等级10级");
					}
					else if(this.iMainPoint>0 && GmMe.me.rbs.iSchoolSkill[this.iMainPoint]>=GmMe.me.rbs.iSchoolSkill[0])
					{//
						EasyMessage.easymsg.AddMessage("不能超过主技能等级");
					}
					else if(parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iSchoolSkill[this.iMainPoint]]/6)>GmMe.me.rbs.iExp)
					{
						EasyMessage.easymsg.AddMessage("当前经验不足");
					}
					else if(parseInt(GameData.iUpgradeMoney[GmMe.me.rbs.iSchoolSkill[this.iMainPoint]]/18)>GmMe.me.rbs.iMoney+GmMe.me.rbs.iReserve)
					{
						EasyMessage.easymsg.AddMessage("当前铜币不足");
					}
					else
					{//升级
						GmProtocol.gi().s_learnschoolskill(GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][this.iMainPoint],this.iMainPoint);
						GmMe.me.rbs.iExp-=parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iSchoolSkill[this.iMainPoint]]/6);
						if(GmMe.me.rbs.iReserve>=parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iSchoolSkill[this.iMainPoint]]/18))
						{
							GmMe.me.rbs.iReserve-=parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iSchoolSkill[this.iMainPoint]]/18);
						}
						else
						{
							i=parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iSchoolSkill[this.iMainPoint]]/18)-GmMe.me.rbs.iReserve;
							GmMe.me.rbs.iReserve=0;
							GmMe.me.rbs.iMoney-=i;
						}
						
						GmMe.me.rbs.iSchoolSkill[this.iMainPoint]++;
					}
				}
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}
LearnSkill.MAXSKILLCOUNT=6; 