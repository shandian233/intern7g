
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import AddPoint from "../../../../../engtst/mgm/gameing/me/AddPoint"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Pets from "./Pets"

export default class MyPets {
	
	
	constructor()
	{
		var i;
		
		this.pm3f=M3DFast.xm3f;

		this.pets=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.pets[i]=new Pets();
		}

		 this.RETPET_HPMPLIFE=1;
		 this.RETPET_ATT=2;
		 this.RETPET_SKILL=4;
		 this.RETPET_ZZCZ=8;
		 this.RETPET_EXPLEV=16;

		 	//#define RETBASE_LEV 32
	//#define RETBASE_CZ 64
	 this.RETPET_OTHER=128;
	}

	FindPet( pid)
	{
		var i;
		if(pid<=0)return null;
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid>0 && pid==this.pets[i].iPid)return this.pets[i];
		}
		return null;
	}
	GetUseingPet()
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid!=-1 && GmMe.me.iFightPid==this.pets[i].iPid)return this.pets[i];
		}
		return null;
	}
	

	RemovePet( pid)
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid==pid)break;
		}
		if(i>=8)return;
		var tmp=this.pets[i];
		for(;i<7;i++)
		{
			this.pets[i]=this.pets[i+1];
		}
		this.pets[7]=tmp;
		this.pets[7].iPid=-1;
		this.iPetCount=0;
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid>0)this.iPetCount++;
		}
	}
//	RemovePet( pid)
//	{
//		var i;
//		for(i=0;i<8;i++)
//		{
//			if(this.pets[i].iPid==pid)break;
//		}
//		if(i>=8)return;
//		for(;i<7;i++)
//		{
//			this.pets[i].copyfrom(this.pets[i+1]);
//		}
//		this.pets[7].iPid=-1;
//		this.iPetCount=0;
//		for(i=0;i<8;i++)
//		{
//			if(this.pets[i].iPid>0)this.iPetCount++;
//		}
//	}
	ProcTouch( msg, x, y)
	{
		return false;
	}


	GetPetBaseAtt( pls)
	{//更新宠物属性
		var i,flag;
		var pid=pls.GetNextInt();
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid==pid)break;
		}
		if(i>=8)return;
		var ppet=this.pets[i];
		flag=pls.GetNextByte();
		if((flag&this.RETPET_HPMPLIFE)!=0)
		{
			ppet.iHp=pls.GetNextShort();
			ppet.iMaxHp=pls.GetNextShort();
			ppet.iMp=pls.GetNextShort();
			ppet.iMaxMp=pls.GetNextShort();
			ppet.iLife=pls.GetNextShort();
		}
		if((flag&this.RETPET_ATT)!=0)
		{
			for(i=0;i<5;i++)ppet.iBaseAtt[i]=pls.GetNextShort();
		}
		if((flag&this.RETPET_SKILL)!=0)
		{
			for(i=0;i<8;i++)ppet.jn[i]=pls.GetNextShort();
		}
		if((flag&this.RETPET_ZZCZ)!=0)
		{
			for(i=0;i<5;i++)ppet.zz[i]=pls.GetNextShort();
			ppet.cz=pls.GetNextShort();
		}
		if((flag&this.RETPET_EXPLEV)!=0)
		{
			ppet.iExp=pls.GetNextInt();
			ppet.iLev=pls.GetNextShort();
		}
		MyPets.CalcFightAtt(ppet);
	}
	UpdateOnePet( pls)
	{
		var i,j,k;
		var rt=pls.GetNextByte();//request type
		var pid;
		if(rt==0)
		{//删除一个宠物
			pid=pls.GetNextInt();
			this.RemovePet(pid);
		}
		else if(rt==1)//更新或添加自己的宠物
		{
			pid=pls.GetNextInt();
			for(i=0;i<8;i++)
			{
				if(this.pets[i].iPid>0 && this.pets[i].iPid==pid)break;
			}
			if(i>=8)
			{//没找到对应已有的宠物，不是更新，是添加
				for(i=0;i<8;i++)
				{
					if(this.pets[i].iPid<=0)break;
				}
			}
			j=i;
			this.pets[j].iPid=pid;
			this.pets[j].iTid=pls.GetNextShort();
			this.pets[j].sName=pls.GetNextString();
			this.pets[j].iLev=pls.GetNextShort();
			this.pets[j].iExp=pls.GetNextInt();
			this.pets[j].iHp=pls.GetNextShort();
			this.pets[j].iMp=pls.GetNextShort();
			this.pets[j].iLife=pls.GetNextShort();
			for(k=0;k<5;k++)this.pets[j].iBaseAtt[k]=pls.GetNextShort();
			for(k=0;k<5;k++)this.pets[j].zz[k]=pls.GetNextShort();
			this.pets[j].cz=pls.GetNextShort();
			for(k=0;k<12;k++)this.pets[j].jn[k]=pls.GetNextShort();
			this.pets[j].iAddAtt=pls.GetNextByte();
			this.pets[j].iBaobao=pls.GetNextByte();
			this.pets[j].iFlag=pls.GetNextShort();
			if((this.pets[j].iBaobao&2)==0)GmPlay.xani_pets[this.pets[j].iTid].InitAnimaWithName("站立_右下", this.pets[j].aa_body);
			else GmPlay.xani_pets[this.pets[j].iTid].InitAnimaWithName("变异_站立_右下", this.pets[j].aa_body);
			MyPets.CalcFightAtt(this.pets[j]);
			
			if(XStat.gi().iXStat==XStat.GS_PETSFRAME)
			{
				var ppf=XStat.gi().LastStat(0);
				ppf.iPetPoint=j;
			}
		}
		this.iPetCount=0;
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid>0)this.iPetCount++;
		}
	}
	GetPets( pls)
	{
		var i,j,k;
		var pid,oid;
		for(i=0;i<8;i++)this.pets[i].iPid=-1;
		oid=pls.GetNextByte();
		if(oid!=2)
		{
			return;
		}
		j=0;
		while(true)
		{
			pid=pls.GetNextInt();
			if(pid==-1)break;
			this.pets[j].iPid=pid;
			this.pets[j].iTid=pls.GetNextShort();
			this.pets[j].sName=pls.GetNextString();
			this.pets[j].iLev=pls.GetNextShort();
			this.pets[j].iExp=pls.GetNextInt();
			this.pets[j].iHp=pls.GetNextShort();
			this.pets[j].iMp=pls.GetNextShort();
			this.pets[j].iLife=pls.GetNextShort();
			for(k=0;k<5;k++)this.pets[j].iBaseAtt[k]=pls.GetNextShort();
			for(k=0;k<5;k++)this.pets[j].zz[k]=pls.GetNextShort();
			this.pets[j].cz=pls.GetNextShort();
			for(k=0;k<12;k++)this.pets[j].jn[k]=pls.GetNextShort();
			this.pets[j].iAddAtt=pls.GetNextByte();
			this.pets[j].iBaobao=pls.GetNextByte();
			this.pets[j].iFlag=pls.GetNextShort();
			
			if((this.pets[j].iBaobao&2)==0)GmPlay.xani_pets[this.pets[j].iTid].InitAnimaWithName("站立_右下", this.pets[j].aa_body);
			else GmPlay.xani_pets[this.pets[j].iTid].InitAnimaWithName("变异_站立_右下", this.pets[j].aa_body);

			MyPets.CalcFightAtt(this.pets[j]);
			j++;
		}
		this.iPetCount=j;
	}
	
	
	CalcAll()
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(this.pets[i].iPid!=-1)MyPets.CalcFightAtt(this.pets[i]);
		}
	}
}

MyPets.mp=new MyPets();
	MyPets.bHavePetCount=function()
	{
		var i,j=0;
		for(i=0;i<8;i++)
		{
			if(MyPets.mp.pets[i].iPid!=-1)j++;
		}
		return j;
	}
	MyPets.bHavePet=function( ptype, bybb)
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(MyPets.mp.pets[i].iPid!=-1 &&MyPets.mp.pets[i].iTid==ptype)
			{
				if((bybb&1)!=0)
				{//要求宝宝
					if((MyPets.mp.pets[i].iBaobao&1)==0)continue;//不是宝宝
				}
				if((bybb&2)!=0)
				{//要求变异
					if((MyPets.mp.pets[i].iBaobao&2)==0)continue;//不是变异
				}
				return true;
			}
		}
		return false;
	}
	MyPets.swapcz=function( cz)
	{//成长转换
		var s=""+parseInt(cz/1000)+".";
		if(parseInt(cz/100)%10==0)s+="0";
		else s+=parseInt(cz/100)%10;
		
		if(parseInt(cz/10)%10==0)s+="0";
		else s+=parseInt(cz/10)%10;
		
		if(cz%10==0)s+="";
		else s+=cz%10;
		return s;
	}

	/*
	 * ①、伤害＝等级＊攻资＊（14＋10＊成长）／7500＋成长＊总力量点数

　　②、防御＝等级＊防资＊（9.4＋19／3＊成长）／7500＋成长＊总防御点数＊4／3

　　③、气血＝等级＊体资／1000＋成长＊体质点数＊6

　　④、速度＝速资＊总速度点数／1000

　　⑤、灵力=等级*(资质+1640)(成长率+1)/7500+体力点数*0.3+法力点数*0.7+力量点数*0.4+耐力点数*0.2
	 * */
	MyPets.CalcFightAtt=function( ppet)
	{//计算Maxhp,attack,多余属性
		var i,j;
		var ismine=(MyPets.mp.FindPet(ppet.iPid)==ppet);//是否是自己的宠物，如果是，影响属性
		var attaddex=0;
		if(ismine)
		{
			if(GmMe.me.iFlagExt[10]>0)attaddex=((GmMe.me.iFlagExt[6]>>18)&0x1f);
		}
		//星级计算
		if((ppet.iBaobao&4)==0)ppet.iStar=0;
		else if((ppet.iBaobao&8)==0)ppet.iStar=1;
		else if((ppet.iBaobao&16)==0)ppet.iStar=2;
		else if((ppet.iBaobao&32)==0)ppet.iStar=3;
		else if((ppet.iBaobao&64)==0)ppet.iStar=4;
		else ppet.iStar=5;
		
		if((ppet.iBaobao&128)==0)ppet.iSkillBlock=8;
		else ppet.iSkillBlock=9;
		
		i=ppet.iLev*5+ppet.iAddAtt+ppet.iStar*25;//当前可能的属性上限
		j=ppet.iBaseAtt[0]+ppet.iBaseAtt[1]+ppet.iBaseAtt[2]+ppet.iBaseAtt[3]+ppet.iBaseAtt[4];//当前已加属性
		ppet.nut=i-j;//剩余属性点//潜力点
		if((ppet.iBaobao&1)!=0)
		{//宝宝多50属性
			ppet.nut+=50;
//			for(i=0;i<100;i++)GmPlay.sop("BAOBAOBAOBAOBAOBAOBAOBAO"+ppet.nut);
		}
		//显示属性点是  baseatt+lev+0级默认点

		//iRace种族0人   1魔   2仙
		//0体   1魔   2力   3耐   4敏
		var tz=10+ppet.iBaseAtt[0]+ppet.iLev+ppet.iStar*5+attaddex;//0级基础+所加点+等级
		var fl=10+ppet.iBaseAtt[1]+ppet.iLev+ppet.iStar*5+attaddex;
		var ll=10+ppet.iBaseAtt[2]+ppet.iLev+ppet.iStar*5+attaddex;
		var nl=10+ppet.iBaseAtt[3]+ppet.iLev+ppet.iStar*5+attaddex;
		var mj=10+ppet.iBaseAtt[4]+ppet.iLev+ppet.iStar*5+attaddex;
		var cz=ppet.cz;

		//    1灵   2伤   3防   4速
		ppet.iMaxHp=ppet.iLev*ppet.zz[0]+tz*cz*6;
		ppet.iMaxMp=ppet.iLev*ppet.zz[1]+fl*cz*6;
		ppet.iSpirit=ppet.iLev*(ppet.zz[1]+1640)*(cz+1000)/7500+tz*300+fl*700+ll*400+nl*200;
		ppet.iSpeed=ppet.zz[4]*mj;
		ppet.iAttack=ppet.iLev*ppet.zz[2]*(1400+ppet.cz)/750+ppet.cz*ll;
		ppet.iDefence=ppet.iLev*ppet.zz[3]*(1900/3+ppet.cz)/750+ppet.cz*nl*4/3;
		
		if(ppet.bHaveSkill(282))ppet.iMaxHp+=ppet.iLev*3600;
		else if(ppet.bHaveSkill(281))ppet.iMaxHp+=ppet.iLev*2400;
		else if(ppet.bHaveSkill(280))ppet.iMaxHp+=ppet.iLev*1200;
		
		if(ppet.bHaveSkill(212))ppet.iDefence+=ppet.iLev*1800;
		else if(ppet.bHaveSkill(211))ppet.iDefence+=ppet.iLev*1200;
		else if(ppet.bHaveSkill(210))ppet.iDefence+=ppet.iLev*600;
		
		if(ppet.bHaveSkill(215))ppet.iAttack+=ppet.iLev*1500;
		else if(ppet.bHaveSkill(214))ppet.iAttack+=ppet.iLev*1000;
		else if(ppet.bHaveSkill(213))ppet.iAttack+=ppet.iLev*500;

		ppet.tz=tz;
		ppet.fl=fl;
		ppet.ll=ll;
		ppet.nl=nl;
		ppet.mj=mj;
		
		ppet.iMaxHp=parseInt((ppet.iMaxHp+500)/1000);
		ppet.iMaxMp=parseInt((ppet.iMaxMp+500)/1000);
		ppet.iSpirit=parseInt((ppet.iSpirit+500)/1000);
		ppet.iAttack=parseInt((ppet.iAttack+500)/1000);
		ppet.iDefence=parseInt((ppet.iDefence+500)/1000);
		ppet.iSpeed=parseInt((ppet.iSpeed+500)/1000);
		
		if(ppet.iHp<=0)
		{
			ppet.iHp=ppet.iMaxHp;
			ppet.iMp=ppet.iMaxMp;
		}
		if(ppet.iHp>ppet.iMaxHp)ppet.iHp=ppet.iMaxHp;
		if(ppet.iMp>ppet.iMaxMp)ppet.iMp=ppet.iMaxMp;
	}