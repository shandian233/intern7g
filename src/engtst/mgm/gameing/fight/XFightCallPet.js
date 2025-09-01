
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
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../engtst/mgm/gameing/me/pet/Pets"
import LearnSkill from "../../../../engtst/mgm/gameing/me/school/LearnSkill"

import XFight from "./XFight"

export default class XFightCallPet {


	constructor()
	{
        this.MAXPETCOUNT=10;

		this.pets=new Array(this.MAXPETCOUNT);//
		this.btn_pets=new Array(this.MAXPETCOUNT);//
		this.iW=20+130*3+80+20;
		this.iH=30+150*2;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
	}
	InitCallPet()
	{//初始化我可用的技能列表
		this.iW=30+130*3+80+30;
		this.iH=30+150*2;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		this.btn_pets[0]=null;
		var i;
		for(i=0;i<this.MAXPETCOUNT;i++)
		{
			this.pets[i]=null;
		}
		this.iPetCount=0;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			if(MyPets.mp.pets[i].iPid>0)
			{
				this.pets[this.iPetCount++]=MyPets.mp.pets[i];
			}
		}
		this.btn_pets[0]=null;
		return this.iPetCount;
	}
	DrawCallPet()
	{
		this.iW=30+130*3+80+30;
		this.iH=30+150*2;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
		var i,j,c;
		if(this.iPetCount>0 && this.btn_pets[0]==null)
		{
			for(i=0;i<this.iPetCount;i++)
			{
				this.btn_pets[i]=new XButtonEx2(GmPlay.xani_head);
				this.btn_pets[i].InitButton(GmPlay.de_pet.strValue(this.pets[i].iTid, 0, 1));
				this.btn_pets[i].Move(this.iX+30+(i%4)*130, this.iY+30+parseInt(i/4)*150, 80, 80);
			}
		}
		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);
//		for(i=0;i<MyPets.mp.iPetCount;i++)
//		{

//			if(j<8)continue;
//			if(btn_selectpet[i].ProcTouch(msg, x, y))
//			{
//				if(btn_selectpet[i].bCheck())
//				{//更换成这个宠物
//					iCmd[1]=MyPets.mp.pets[i].iPid;
//					iCmd[2]=MyPets.mp.pets[i].iPid;
////					for(j=0;j<100;j++)GmPlay.sop("ii="+iCmd[2]);
//					FinishRoleOperate();
//					break;
//				}
//			}
//		}

		for(i=0;i<this.iPetCount;i++)
		{
			GmPlay.xani_nui2.DrawAnimaEx((this.btn_pets[i].iX-((this.btn_pets[i].fScale-1)*80/2)), (this.btn_pets[i].iY-((this.btn_pets[i].fScale-1)*80/2)), "宠物头像框",0, 101, this.btn_pets[i].fScale, this.btn_pets[i].fScale, 0, 0, 0);
//			GmPlay.xani_nicon.DrawAnima(btn_skills[i].iX, btn_skills[i].iY, "技能外框",0);
			this.btn_pets[i].Draw();
			for(j=0;j<8;j++)
			{
				if(this.pets[i].iPid==XFight.gi().iUsedPetsId[j])break;//已经用过的宠物，无法按
			}
			if(j<8)c=0xffff0000;
			else c=0xfffeeede;
			M3DFast.gi().DrawTextEx(this.btn_pets[i].iX+40,this.btn_pets[i].iY+80+15, this.pets[i].sName, c, 22, 101, 1, 1, 0, -2, 0);
			M3DFast.gi().DrawTextEx(this.btn_pets[i].iX+40,this.btn_pets[i].iY+80+15+24, this.pets[i].iLev+"级", c, 20, 101, 1, 1, 0, -2, 0);
		}
	}
	
	ProcTouch( msg, x, y)
	{
		var i,j;
		for(i=0;i<this.iPetCount;i++)
		{
			if(this.btn_pets[i].ProcTouch(msg, x, y))
			{
				if(this.btn_pets[i].bCheck())
				{
					for(j=0;j<8;j++)
					{
						if(this.pets[i].iPid==XFight.gi().iUsedPetsId[j])break;//已经用过的宠物，无法按
					}
					if(j<8)
					{
						EasyMessage.easymsg.AddMessage("出战过的宠物，不能再次出战");
					}
					else
					{
						this.iCallPetId=this.pets[i].iPid;
						this.btn_pets[i].SetNormal();
						return true;
					}
				}
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX-20, this.iY-20, this.iW+40, this.iH+40))
		{
			this.iCallPetId=-1;
			return true;
		}
		return false;
	}
}

XFightCallPet.xfcp=new XFightCallPet();