
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import Pets from "../../../../engtst/mgm/gameing/me/pet/Pets"

import XFight from "./XFight"

export default class XFightPetSkill {
    
	constructor()
	{
        this.MAXSKILLCOUNT=9;
		this.iFightSkillId=new Int32Array(this.MAXSKILLCOUNT);//
		this.btn_skills=new Array(this.MAXSKILLCOUNT);//
	}
	
	InitPetSkill( p)
	{
		this.iW=20+130*2+80+20;
		this.iH=345;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		this.btn_skills[0]=null;
		var i;
		this.pet=p;
		this.iFightSkillCount=0;
		for(i=0;i<this.MAXSKILLCOUNT;i++)
		{
			if(p.jn[i]>0)
			{//判断是否为可使用技能
				if(GmPlay.de_skill.intValue(p.jn[i], 0, 32)==0)
				{//主动，加入技能列表
					this.iFightSkillId[this.iFightSkillCount]=p.jn[i];
					this.iFightSkillCount++;
				}
			}
		}
		this.bReturn=false;
		this.bUsed=false;
		this.iPoint=-1;
		
		this.iW=30+130*2+80+30;
		if(this.iFightSkillCount>2)this.iH=30+150*2;
		else this.iH=30+150*1;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		return this.iFightSkillCount;
	}
	
	Draw()
	{
		this.iW=30+130*2+80+30;
		if(this.iFightSkillCount>2)this.iH=30+150*2;
		else this.iH=30+150*1;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		var i,c;
		if(this.iFightSkillCount>0 && this.btn_skills[0]==null)
		{
			for(i=0;i<this.iFightSkillCount;i++)
			{
				this.btn_skills[i]=new XButtonEx2(GmPlay.xani_nicon);
				this.btn_skills[i].InitButton(GmPlay.de_skill.strValue(this.iFightSkillId[i], 0, 5));
				this.btn_skills[i].Move(this.iX+30+(i%3)*130, this.iY+30+parseInt(i/3)*150, 80, 80);
			}
		}
//		x=GmConfig.SCRW/2;
//		y=GmConfig.SCRH/3;
		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);
		
		var idt=-1;
		for(i=0;i<this.iFightSkillCount;i++)
		{
			this.btn_skills[i].Draw();
			if(this.btn_skills[i].bMouseDown)idt=i;
			c=0xfffeeede;
			M3DFast.gi().DrawTextEx(this.btn_skills[i].iX+40,this.btn_skills[i].iY+80+15, GmPlay.de_skill.strValue(this.iFightSkillId[i], 0, 6), c, 25, 101, 1, 1, 0, -2, 0);

//			if(this.iPoint==i)M3DFast.gi().FillRect_2D(this.iX, this.iY+i*85, this.iX+this.iW, this.iY+i*85+85, 0xffb0b0b0);
////			if(this.iFightSkillId[i]>1000)c=0xff0080ff;
////			else c=0xffff0000;
//			c=0xff0080ff;
//			M3DFast.gi().DrawTextEx(this.iX+90, this.iY+i*85+85/2, GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 6), c, 30, 101, 1, 1, 0, 0, -2);
////			GmPlay.xani_skillicon.DrawAnima_aa(this.iX, this.iY+i*85, GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 5), 0);
//			GmPlay.xani_nicon.DrawAnima_aa(this.iX, this.iY+i*85, GmPlay.de_skill.strValue(this.iFightSkillId[i]%1000, 0, 5), 0);
		}
		if(idt>=0)
		{
			MyAttFrame.Skill_Detail(this.iFightSkillId[idt]%1000, this.btn_skills[idt].iX,this.btn_skills[idt].iY, -1);
		}
//		var i;
//		this.iW=120;
//		this.iH=this.iFightSkillCount*30+20;
//		this.iX=GmConfig.SCRW-this.iW-83;
//		this.iY=GmConfig.SCRH-this.iH-83;
//		
//		DrawMode.Frame1_BR(this.iX,this.iY,this.iW,this.iH);
//		for(i=0;i<this.iFightSkillCount;i++)
//		{
//			if(this.iPoint==i)
//			{
//				M3DFast.gi().FillRect_2D(this.iX+10, this.iY+10+i*30, this.iX+this.iW-20, this.iY+10+i*30+30, 0x80ffffff);
//				M3DFast.gi().DrawTextEx(this.iX+10, this.iY+10+15+30*i, ""+GmPlay.de_skill.strValue(this.iFightSkillId[i], 0, 6), 0xff00ff00, 20, 101, 1, 1, 0, 0, -2);
//			}
//			else M3DFast.gi().DrawTextEx(this.iX+10, this.iY+10+15+30*i, ""+GmPlay.de_skill.strValue(this.iFightSkillId[i], 0, 6), 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
//		}
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
					this.btn_skills[i].SetNormal();
					this.iPoint=i;
					this.bUsed=true;
					this.iUseSkillId=this.iFightSkillId[i];
					return true;
				}
			}
		}
		
		if(msg==3 && !XDefine.bInRect(x, y, this.iX-20, this.iY-20, this.iW+40, this.iH+40))
		{
			this.bReturn=true;
			return true;
		}
		return false;
	}
}
XFightPetSkill.xfps=new XFightPetSkill();