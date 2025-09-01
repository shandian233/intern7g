
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

//特技
export default class XFightSpecialSkill {

	
	constructor()
	{
        this.MAXSKILLCOUNT=10;

		this.iGoodsSkillId=new Int32Array(this.MAXSKILLCOUNT);////装备技能
//		aa_goods=new Array(this.MAXSKILLCOUNT);//
		this.btn_skills=new Array(this.MAXSKILLCOUNT);//
	}
	InitSpecialSkill()
	{
		var i,j,k;
		for(i=0;i<this.MAXSKILLCOUNT;i++)
		{
			this.iGoodsSkillId[i]=-1;
			this.btn_skills[i]=new XButtonEx2(GmPlay.xani_ngoods);
		}
		
		this.iSkillCount=0;
		for(i=0;i<6;i++)
		{//看装备技能
			if(MyGoods.gi().goods[1][i].iGid<=0)continue;
			j=MyGoods.gi().goods[1][i].iAtts[4];
			k=j&0x3ff;//技能ID
			if(k<=0)continue;
			this.btn_skills[this.iSkillCount].InitButton(GmPlay.de_goods.strValue(MyGoods.gi().goods[1][i].iTid, -1, 10));
			this.iGoodsSkillId[this.iSkillCount++]=k;
		}

		this.iShowPoint=-1;
		
		this.iW=30+130*2+80+30;
		if(this.iSkillCount>2)this.iH=30+150*2;
		else this.iH=30+150*1;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		
//		for(i=0;i<this.iSkillCount;i++)
//		{
//			this.btn_skills[i].Move(this.iX+30+(i%3)*130, this.iY+30+(i/3)*150, 80, 80);
//		}
	}
	DrawSpecialSkill()
	{
		this.iW=30+130*2+80+30;
		if(this.iSkillCount>2)this.iH=30+150*2;
		else this.iH=30+150*1;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		var i,j,c;
		
		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);
		
		for(i=0;i<this.iSkillCount;i++)
		{
			this.btn_skills[i].Move(this.iX+30+(i%3)*130, this.iY+30+(i/3)*150, 80, 80);
			GmPlay.xani_nicon.DrawAnimaEx((this.btn_skills[i].iX-((this.btn_skills[i].fScale-1)*80/2)), (this.btn_skills[i].iY-((this.btn_skills[i].fScale-1)*80/2)), "技能外框",0, 101, this.btn_skills[i].fScale, this.btn_skills[i].fScale, 0, 0, 0);
//			GmPlay.xani_nicon.DrawAnima(this.btn_skills[i].iX, this.btn_skills[i].iY, "技能外框",0);
			this.btn_skills[i].Draw();

			j=GmPlay.de_skill.intValue(this.iGoodsSkillId[i], 0, 35);
			if(MyGoods.gi().goods[1][4].iGid>0 && ((MyGoods.gi().goods[1][4].iAtts[4]>>10)&0x3ff)==267)j=j*8/10;
			if(j<=GmMe.me.rbs.iAnger)c=0xfffeeede;
			else c=0xffff0000;
			
			M3DFast.gi().DrawTextEx(this.btn_skills[i].iX+40,this.btn_skills[i].iY+80+15, GmPlay.de_skill.strValue(this.iGoodsSkillId[i], 0, 6), c, 22, 101, 1, 1, 0, -2, 0);
			M3DFast.gi().DrawTextEx(this.btn_skills[i].iX+40,this.btn_skills[i].iY+80+15+24, "SP:"+j+"/"+GmMe.me.rbs.iAnger, c, 20, 101, 1, 1, 0, -2, 0);

//			M3DFast.gi().DrawTextEx(this.iX+70, this.iY+i*60+6, GmPlay.de_skill.strValue(this.iGoodsSkillId[i], 0, 6), c, 30, 101, 1, 1, 0, 0, 0);
//			M3DFast.gi().DrawTextEx(this.iX+70, this.iY+i*60+36, "消耗SP:"+j, 0xff0080ff, 16, 101, 1, 1, 0, 0, 0);//GmPlay.de_skill.strValue(this.iGoodsSkillId[i], 0, 35)
//			//GmPlay.xani_ui3.InitAnimaWithName("背包格子背景", null);
//			GmPlay.xani_ui3.DrawAnima(this.iX, this.iY+i*60, "背包格子背景",0);
//			aa_goods[i].Draw(this.iX, this.iY+i*60);
//			GmPlay.xani_skill.DrawAnima_aa(this.iX, this.iY+i*60, GmPlay.de_skill.strValue(this.iGoodsSkillId[i], 0, 5), 0);
		}
		if(this.iShowPoint>=0 && this.iShowPoint<this.iSkillCount)
		{
			MyAttFrame.Skill_Detail(this.iGoodsSkillId[this.iShowPoint], this.iX, this.iY+this.iShowPoint*60+30, -1);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		for(i=0;i<this.iSkillCount;i++)
		{
			if(this.btn_skills[i].ProcTouch(msg, x, y))
			{
				if(this.btn_skills[i].bCheck())
				{
					this.btn_skills[i].SetNormal();
					this.iShowPoint=i;
					//看愤怒是否够
					j=GmPlay.de_skill.intValue(this.iGoodsSkillId[i], 0, 35);
					if(MyGoods.gi().goods[1][4].iGid>0 && ((MyGoods.gi().goods[1][4].iAtts[4]>>10)&0x3ff)==267)j=j*8/10;
					if(j>GmMe.me.rbs.iAnger)
					{//愤怒不足
						EasyMessage.easymsg.AddMessage("怒气不足，可能使用失败");
						//EasyMessage.easymsg.AddMessage("怒气不足无法使用");
						this.iUseSkillId=this.iGoodsSkillId[i];
						this.iSelectTarget=GmPlay.de_skill.intValue(this.iUseSkillId, 0, 36);
						return true;
					}
					else
					{
						this.iUseSkillId=this.iGoodsSkillId[i];
						this.iSelectTarget=GmPlay.de_skill.intValue(this.iUseSkillId, 0, 36);
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
XFightSpecialSkill.xss=new XFightSpecialSkill();