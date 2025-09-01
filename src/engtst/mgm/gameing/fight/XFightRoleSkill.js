
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import LearnSkill from "../../../../engtst/mgm/gameing/me/school/LearnSkill"

import XFight from "./XFight"

export default class XFightRoleSkill {

	constructor()
	{
        this.MAXSKILLCOUNT=10;

		this.iFightSkillId=new Int32Array(this.MAXSKILLCOUNT);//
		this.btn_skills=new Array(this.MAXSKILLCOUNT);//
		this.iW=20+130*3+80+20;
		this.iH=345;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
	}
	InitFightSkill()
	{//初始化我可用的技能列表
		this.iW=30+130*3+80+30;
		this.iH=30+150*2;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		this.btn_skills[0]=null;
		var i,j,k,o,m,n;
		for(i=0;i<this.MAXSKILLCOUNT;i++)
		{
			this.iFightSkillId[i]=-1;
		}
		this.iFightSkillCount=0;
		if(GmMe.me.rbs.iLev<30)
		{//没入门派，花拳绣腿
			this.iFightSkillId[this.iFightSkillCount++]=1201;
			this.iShowPoint=-1;
		}
		if(GmMe.me.rbs.iSchoolId==0)return;
		for(i=0;i<LearnSkill.MAXSKILLCOUNT;i++)
		{
			j=GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i];
			for(k=0;k<10;k++)
			{
				o=GmPlay.de_skill.intValue(j, k, 4);//得到子技能ID
				if(o<=0)break;
				m=GmPlay.de_skill.intValue(o, 0, 9);//对主技能等级要求
				n=GmPlay.de_skill.intValue(o, 0, 7);//使用场景,0漫游，1战斗，2通用
				if(GmMe.me.rbs.iSchoolSkill[i]>=m)o+=1000;//主技能等级达到，可使用
//				if(n>=0)o+=n*1000;
//				GmPlay.sop("j="+j+",o="+o+",p1="+p1+",p2="+p2+",GmMe.me.rbs.iSchoolSkill[i]="+GmMe.me.rbs.iSchoolSkill[i]+",m="+m);
				if(n==0)continue;
//				if(o<1000)continue;//主技能未达
				this.iFightSkillId[this.iFightSkillCount++]=o;
			}
		}
		i=GmMe.me.iFlag[33]%10;
		if(XFight.gi().iFightType==XFight.FIGHTWITH_DARK && i>0)
		{//无影手
			this.iFightSkillId[this.iFightSkillCount++]=1203;
		}
//		i=GmMe.me.iFlag[33]/10%10;
//		if(i>0)
//		{//变化术
//		}
		this.iShowPoint=-1;
	}
	DrawFightSkill()
	{
		this.iW=30+130*3+80+30;
		this.iH=30+150*2;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		var i,c;
		if(this.iFightSkillCount>0 && this.btn_skills[0]==null)
		{
			for(i=0;i<this.iFightSkillCount;i++)
			{
				this.btn_skills[i]=new XButtonEx2(GmPlay.xani_nicon);
				this.btn_skills[i].InitButton(GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 5));
				this.btn_skills[i].Move(this.iX+30+(i%4)*130, this.iY+30+parseInt(i/4)*150, 80, 80);
			}
		}
		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);

//		GmPlay.xani_nicon.DrawAnima_aa(x, y, GmPlay.de_skill.strValue(sid, 0, 5),0);
		var idt=-1;
		for(i=0;i<this.iFightSkillCount;i++)
		{
			GmPlay.xani_nicon.DrawAnimaEx((this.btn_skills[i].iX-((this.btn_skills[i].fScale-1)*80/2)), (this.btn_skills[i].iY-((this.btn_skills[i].fScale-1)*80/2)), "技能外框",0, 101, this.btn_skills[i].fScale, this.btn_skills[i].fScale, 0, 0, 0);
//			GmPlay.xani_nicon.DrawAnima(this.btn_skills[i].iX, this.btn_skills[i].iY, "技能外框",0);
			this.btn_skills[i].Draw();
			if(this.btn_skills[i].bMouseDown)idt=i;
			if(this.iFightSkillId[i]>1000)c=0xfffeeede;
			else c=0xffff0000;
			M3DFast.gi().DrawTextEx(this.btn_skills[i].iX+40,this.btn_skills[i].iY+80+15, GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 6), c, 25, 101, 1, 1, 0, -2, 0);
//			if(this.iShowPoint==i)M3DFast.gi().FillRect_2D(this.iX, this.iY+i*60, this.iX+this.iW, this.iY+i*60+60, 0xffb0b0b0);

//			M3DFast.gi().DrawTextEx(this.iX+70, this.iY+i*60+15, GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 6), c, 30, 101, 1, 1, 0, 0, 0);
//			GmPlay.xani_skill.DrawAnima_aa(this.iX, this.iY+i*60, GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 5), 0);
		}
		if(idt>=0)
		{
			MyAttFrame.Skill_Detail(this.iFightSkillId[idt]%1000, this.btn_skills[idt].iX,this.btn_skills[idt].iY, -1);
		}
	}
	
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<this.iFightSkillCount;i++)
		{
			if(this.btn_skills[i].ProcTouch(msg, x, y))
			{
				if(this.btn_skills[i].bCheck())
				{
					this.iShowPoint=i;
					if(this.iFightSkillId[i]<=1000)
					{//不可使用
						EasyMessage.easymsg.AddMessage("技能等级不足无法使用");
					}
					else
					{
						this.iUseSkillId=this.iFightSkillId[i]%1000;
						this.iSelectTarget=GmPlay.de_skill.intValue(this.iUseSkillId, 0, 23);
						this.btn_skills[i].SetNormal();
						return true;
					}
				}
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX-20, this.iY-20, this.iW+40, this.iH+40))
		{
				this.iUseSkillId=-1;
				return true;
		}
		return false;
	}
}

XFightRoleSkill.xfs=new XFightRoleSkill();