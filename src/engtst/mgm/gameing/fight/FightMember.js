
import GameVersion from "../../../../zero/Interface/GameVersion"
import GmConfig from "../../../../config/GmConfig"
import SortAnima from "../../../../config/SortAnima"
import XDefine from "../../../../config/XDefine"
import DrawBuffer from "../../../../map/DrawBuffer"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import XAnima from "../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import NearRole from "../../../../engtst/mgm/gameing/NearRole"
import SystemOperate from "../../../../engtst/mgm/gameing/fast/SystemOperate"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import XFight from "./XFight"


export default class FightMember {

	constructor()
	{
		var i,j;
		this.iWeapTid=-1;
		this.aa_body=new AnimaAction();
		this.aa_weapon=new AnimaAction();
		this.iStatus=new Int32Array(FightMember.iMaxStatusCount);//
		this.aa_status=new Array(FightMember.iMaxStatusCount);//
		for(i=0;i<FightMember.iMaxStatusCount;i++)
		{
			this.aa_status[i]=null;
		}
		this.ianPoint=0;
		this.bActed=true;
        
        this.an_list=new Array (this.MAXLIST);
		this.aa_cls=new Array(6);//
		this.iColor=new Int32Array(6);//
		for(i=0;i<6;i++)
		{
//			aa_mts[i]=new AnimaAction();
//			aa_bds[i]=new AnimaAction();
			this.aa_cls[i]=new Array(5);
			for(j=0;j<5;j++)
			{
				this.aa_cls[i][j]=new AnimaAction();
			}
			this.iColor[i]=0;
        }
        
        this.rotajd=0;
	}
	FaceTo( front)
	{
		if(front)
		{
			if(this.iPos<20)
			{
				this.sFaceTo="_左上";
				this.sSkillFaceTo="_左";
			}
			else
			{
				this.sFaceTo="_右下";
				this.sSkillFaceTo="_右";
			}
		}
		else
		{
			if(this.iPos<20)
			{
				this.sFaceTo="_右下";
				this.sSkillFaceTo="_右";
			}
			else
			{
				this.sFaceTo="_左上";
				this.sSkillFaceTo="_左";
			}
		}
	}
	Clear()
	{
		var i;
		for(i=0;i<FightMember.iMaxStatusCount;i++)
		{//状态持续回合
			this.iStatus[i]=0;
			this.aa_status[i]=null;
		}
		this.bUseing=false;
		this.iMaxHp=1;
		this.iWeapTid=-1;
		this.nr=null;
		this.bMe=false;
		this.iActDelay=0;
		this.iFlying=0;
		this.ianPoint=0;
		this.bActed=false;
		this.iPopoDelay=0;
		this.iRace_Sex=-1;
		this.iShowSNDelay=0;
	}
	ChangeStatus( stat, last)
	{
		if(stat>=0 && stat<FightMember.iMaxStatusCount)this.iStatus[stat]=last;
//		GmPlay.sop("stat="+stat+",last="+last);
	}
	ActionStatus()
	{
		var i;
		for(i=0;i<FightMember.iMaxStatusCount;i++)
		{
			if(this.iStatus[i]>0)
			{
//				GmPlay.sop("zzz stat="+i+",last="+this.iStatus[i]);
				this.iStatus[i]--;
			}
		}
	}
	AddAnima( s)
	{
		if(!this.bUseing)return;
//		if(this.ianPoint>=6)this.ianPoint=0;
		if(this.iType==1 && parseInt(this.iTid/10000)!=0)this.an_list[this.ianPoint]="变异_"+s;
		else if(this.iType==2 && this.iSpecialType==2 && parseInt(this.iTid/10000)!=0)this.an_list[this.ianPoint]="变异_"+s;
		else this.an_list[this.ianPoint]=s;
		this.ianPoint++;
	}
	PopAnima()
	{
		if(this.ianPoint==0)return;
		this.ianPoint--;
		for(var i=0;i<this.ianPoint;i++)
		{
			this.an_list[i]=this.an_list[i+1];
		}
	}
	SetBaseAnima( s)
	{
		if(this.iType==1 && parseInt(this.iTid/10000)!=0)this.an_base="变异_"+s;
		else if(this.iType==2 && this.iSpecialType==2 && parseInt(this.iTid/10000)!=0)this.an_base="变异_"+s;
		else this.an_base=s;
		if(this.bBaseWaiting)
		{
			this.ChangeAnima(this.an_base);
		}
	}
	ChangeAnima( s)
	{
		if(this.iType==0 || (this.iType==2 && this.iSpecialType==1))
		{//人形
			XDefine.sop(""+this.iRace_Sex);
			GmPlay.xani_newrole[this.iRace_Sex].InitAnimaWithName(s+this.sFaceTo, this.aa_body);
			//换色
//			GmPlay.sop(""+this.iColor[0]+",,,,"+this.iColor[1]);
			this.ChangeColor(this.iRace_Sex,s+this.sFaceTo,0);
			if(this.iWeapTid>0)GmPlay.xani_weap[this.iRace_Sex][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName(s+this.sFaceTo, this.aa_weapon);
			return;
		}
//		switch(GameVersion.QUDAO)
//		{
//		case 0:
////			if(this.iRace_Sex==0 || this.iRace_Sex==1 || this.iRace_Sex==3 || this.iRace_Sex==4 || this.iRace_Sex==5)
//			if(this.iRace_Sex==0 || this.iRace_Sex==1)
//			{
//				if(this.iType==0 || (this.iType==2 && this.iSpecialType==1))
//				{
//					GmPlay.xani_newrole[this.iRace_Sex].InitAnimaWithName(s+this.sFaceTo, this.aa_body);
//					if(this.iWeapTid>0)GmPlay.xani_weap[this.iRace_Sex][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName(s+this.sFaceTo, this.aa_weapon);
//					return;
//				}
//			}
//			break;
//		}
		this.xani.InitAnimaWithName(s+this.sFaceTo,this.aa_body);
//		if(this.iWeapTid>0)
//		{
////			GmPlay.sop("zzzzzzzzzzzzzz="+GmMe.me.weapname(this.iTid, iWeapLev)+"_"+s+this.sFaceTo);
//			if(this.iWeapTid==248 || this.iWeapTid==249 || this.iWeapTid==250)
//			{//70武器this.xani_weap70
//				GmPlay.xani_weap70.InitAnimaWithName(GmMe.sSex(this.iSex)+GmPlay.de_goods.strValue(this.iWeapTid, 0, 4)+"_"+s+this.sFaceTo, this.aa_weapon);
//			}
//			else this.xani.InitAnimaWithName(GmPlay.de_goods.strValue(this.iWeapTid, 0, 4)+"_"+s+this.sFaceTo,this.aa_weapon);
//		}
	}
	NextAnima()
	{
		if(this.ianPoint>0)
		{
			this.ChangeAnima(this.an_list[0]);
			this.PopAnima();
			this.bBaseWaiting=false;
		}
		else
		{
			this.ChangeAnima(this.an_base);
			this.bBaseWaiting=true;
		}
	}
	NextFrame()
	{
		if(this.bBaseWaiting && this.ianPoint>0)
		{
			this.NextAnima();
		}
		else if(this.aa_body.NextFrame())
		{
			this.NextAnima();
		}
		else if(this.iWeapTid>0)
		{
			this.aa_weapon.iFrame=this.aa_body.iFrame;
			//this.aa_weapon.NextFrame();
		}
	}

	InitSN( skillid)
	{
		this.sShowSNDetail=GmPlay.de_skill.strValue(skillid, 0, 6);
		if(this.sShowSNDetail=="-1")return;
		this.iShowSNDelay=100;
	}
	ShowSN()
	{
		if(this.iShowSNDelay<=0)return;
	}

	FightPopo( x, y, h)
	{
		if(this.iPopoDelay<=0)return;
		
		this.iPopoDelay--;
		FormatString.gi().Format(this.sPopoString, 151, 25);
		x-=FormatString.gi().iW/2;
		var sy=y+h+40-FormatString.gi().iH;
		DrawBuffer.gi().FillRect(y, x, sy, x+FormatString.gi().iW, sy+FormatString.gi().iH, 0x50000000);
		FormatString.gi().DrawToBuffer(y+1,x,sy);
	}
	
	ChangeColor( xb, sa, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			GmPlay.xani_color[xb][this.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_"+sa, this.aa_cls[m][i]);
			GmPlay.sop(""+SortAnima._CHANGECOLOR[xb][i]+"_"+sa);
		}
	}
	DrawColor( xb, frame, offy, x, y, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			this.aa_cls[m][i].iFrame=frame;
//			DrawBuffer.gi().DrawAnima_aa(offy,null, x, y, this.aa_cls[m][i]);
			DrawBuffer.gi().DrawAnimaEx(offy, x, y, this.aa_cls[m][i],this.iStatus[38]>0?50:101,1,1,0,0,0);
			
			//this.iStatus[38]>0?50:101
		}
	}
	
	frame_type1( name, x, y, w, bw)
	{//横向框
		GmPlay.xani_frame.InitAnimaWithName(name, GmPlay.aaa);
		if(w<bw*2)
		{
			GmPlay.aaa.iFrame=0;
			DrawBuffer.gi().DrawAnimaEx(this.iY+5, x, y, GmPlay.aaa, 101, 1.0*w/2/bw, 1, 0, 0, 0);
			GmPlay.aaa.iFrame=2;
			DrawBuffer.gi().DrawAnimaEx(this.iY+5, x+w/2, y, GmPlay.aaa, 101, 1.0*w/2/bw, 1, 0, 0, 0);
//			GmPlay.xani_frame.DrawAnimaEx(x, y, name, 0, 101, 1.0f*w/2/bw, 1, 0, 0, 0);
//			GmPlay.xani_frame.DrawAnimaEx(x+w/2, y, name, 2, 101, 1.0f*w/2/bw, 1, 0, 0, 0);
		}
		else
		{
			GmPlay.aaa.iFrame=1;
			DrawBuffer.gi().DrawAnimaEx(this.iY+5, x+bw/2, y, GmPlay.aaa, 101, 1.0*(w-bw)/bw, 1, 0, 0, 0);
	
			GmPlay.aaa.iFrame=0;
			DrawBuffer.gi().DrawAnimaEx(this.iY+5, x, y, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
			
			GmPlay.aaa.iFrame=2;
			DrawBuffer.gi().DrawAnimaEx(this.iY+5, x+w-bw, y, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
			
//			GmPlay.xani_frame.DrawAnimaEx(x+bw/2, y, name, 1, 101, 1.0f*(w-bw)/bw, 1, 0, 0, 0);
//			
//			GmPlay.xani_frame.DrawAnima_aa(x,y,name,0);
//			GmPlay.xani_frame.DrawAnima_aa(x+w-bw,y,name,2);
		}
	}

	Draw()
	{
		var i,j,k,m,by;
		var BLOODSIZE=72;
		if(this.iPos!=5 && this.iPos!=25)
		{
			k=BLOODSIZE*this.iHp/this.iMaxHp;
			//
//			by=-this.pani.iAnimaY(this.aa_body)+10;
			by=115;
			if(this.iPos<20 || this.iStatus[16]>0)
			{//己方血条
//				DrawBuffer.gi().FillRect(this.iY+3, this.iX-BLOODSIZE/2, this.iY-by, this.iX+BLOODSIZE/2,this.iY-by+8, 0xfffcdc08);
//				DrawBuffer.gi().FillRect(this.iY+4, this.iX-BLOODSIZE/2+1, this.iY-by+1, this.iX+BLOODSIZE/2-1,this.iY-by+8-1, 0xff451c0e);
//				if(k>0)DrawBuffer.gi().FillRect(this.iY+5, this.iX-BLOODSIZE/2+1, this.iY-by+1, this.iX-BLOODSIZE/2+k-1,this.iY-by+8-1, 0xffff0000);
				GmPlay.xani_frame.InitAnimaWithName("血条外框76_13", GmPlay.aaa);
				DrawBuffer.gi().DrawAnima_aa(this.iY+4, null, this.iX-76/2, this.iY-by-10, GmPlay.aaa);
				this.frame_type1("血条10_9",this.iX-76/2+2, this.iY-by-10+2,k,10);
				//(this.iY+4,null,this.iX-76/2,this.iY-by-10,GmPlay.aaa);
				//frame_type1
				if(!this.bActed)DrawBuffer.gi().DrawAnima_aa(this.iY+5, null, this.iX, this.iY-by-15, GmPlay.aa_fightready);//准备
			}
			//头顶使用技能名称
			if(this.iShowSNDelay>0)
			{
				this.iShowSNDelay-=5;
				
				GmPlay.xani_skills[0].InitAnimaWithName("技能名称背景", GmPlay.aaa);
				if(this.iShowSNDelay>75)i=30-(this.iShowSNDelay-75);
				else i=30;
				if(this.iShowSNDelay<25)j=this.iShowSNDelay*4;
				else j=101;
				DrawBuffer.gi().DrawAnimaEx(this.iY+5, this.iX-60, this.iY-by-20, GmPlay.aaa, j, 1.0*i/30, 1.0*i/30, 0, 0, 0);
				
				if(this.iShowSNDelay<25)j=this.iShowSNDelay*10;
				else j=0xff;
				DrawBuffer.gi().DrawText(this.iY+6, 0, this.iX-60, this.iY-by-20-i, this.sShowSNDetail, (j<<24)|0xffffff, i);
			}
			
			var c=0x00ffffff;//0xff80ff80
//			if(this.bActed)c=0x00ffffff;
//			else c=0x00ff0000;
			FireworksEffect.DrawAura(0,this.iX, this.iY,DrawBuffer.gi(),this.iY-2);//战斗中影子
//			DrawBuffer.gi().DrawText(this.iY+1, 1,this.iX,this.iY+20, this.sName, 0xa0000000|c, 20);//名字
			if(this.bActed)
			{
				DrawBuffer.gi().DrawText_2(this.iY+1, 1,this.iX,this.iY+20, this.sName, 0xff80ff80, 20,1,0xff000000);
				DrawBuffer.gi().DrawText(this.iY+GmConfig.SCRH, 1,this.iX,this.iY+20, this.sName, 0x6080ff80, 20);//颜色覆盖			
			}
			else
			{
				DrawBuffer.gi().DrawText_2(this.iY+1, 1,this.iX,this.iY+20, this.sName, 0xffff8000, 20,1,0xff000000);
				DrawBuffer.gi().DrawText(this.iY+GmConfig.SCRH, 1,this.iX,this.iY+20, this.sName, 0x60ffb080, 20);//颜色覆盖			
			}

//			DrawBuffer.gi().DrawText(this.iY+GmConfig.SCRH, 1,this.iX,this.iY+20, this.sName, 0x60ff00ff, 20);//颜色覆盖
			
			if(this.iFlying>10)
			{
/*				String ss="";
				if(this.iType==1 && this.iTid/10000!=0)ss="变异_";
				if(iFly/2%2==0)this.xani.InitAnimaWithName(ss+"被攻击_右",this.aa_body);
				else this.xani.InitAnimaWithName(ss+"被攻击_左",this.aa_body);*/

				if(this.iFlying%2==0)
				{
					this.FaceTo(true);
					this.SetBaseAnima("被攻击");
				}
				else
				{
					this.FaceTo(false);
					this.SetBaseAnima("被攻击");
				}
			}
			i=0;k=0;
			if(this.iStatus[18]>0)//疯狂状态
			{
				i=XDefine.GetRand(-2,2);
				k=XDefine.GetRand(-2,2);
			}
//			if(this.sFaceTo=="_左上")
//			{
//				if(this.iWeapTid>0)DrawBuffer.gi().DrawAnima_aa(this.iY-1, this.xani, this.iX+i, this.iY+k, this.aa_weapon);
//			}

			DrawBuffer.gi().DrawAnimaEx(this.iY, this.iX+i, this.iY+k, this.aa_body,this.iStatus[38]>0?50:101,1,1,0,0,0);//隐身
			if(this.iType==0 || (this.iType==2 && this.iSpecialType==1))//人形
			{//染色
//				GmPlay.sop("dc");
				this.DrawColor(this.iRace_Sex,this.aa_body.iFrame,this.iY+1, this.iX+i, this.iY+k,0);
				if(this.iWeapTid>0)DrawBuffer.gi().DrawAnima_aa(this.iY+2, this.xani, this.iX+i, this.iY+k, this.aa_weapon);
			}

//			if(this.sFaceTo!="_左上")
			{
//				if(this.iWeapTid>0)DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX+i, this.iY+k, this.aa_weapon);
			}
			
			if(!this.bActed)
			{//没出手,准备中
				if(this.iActDelay%2==0)this.NextFrame();
//				DrawMode.frame_type1(String name,int x,int y,int w,int bw);
			}
			else this.NextFrame();
			this.iActDelay++;
			
			if(this.bMe)
			{
				GmMe.me.DrawPopo(this.iX, this.iY+10);
			}
			else if(this.nr!=null)
			{
				if(this.nr.sName==this.sName)this.nr.DrawPopo(this.iX, this.iY+10);
				else this.nr=null;
			}
			
			this.FightPopo(this.iX,this.iY+10,this.xani.iAnimaY(this.aa_body)-30);
		}

		var offx,offy;
		this.rotajd+=0.1;
		//状态
		for(i=0;i<FightMember.iMaxStatusCount;i++)
		{
			if(this.iStatus[i]>0)
			{
				switch(i)
				{
				case 0://+物攻
				case 1://+物防
				case 2://+法攻
				case 3://+法防
				case 4://+速度
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_ui.InitAnimaWithName("祝福标记"+this.sSkillFaceTo, null);
					
					this.aa_status[i].iFrame= i;
					if(this.iPos<20)DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX+30, this.iY-90, this.aa_status[i]);
					else DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX-30, this.iY-90, this.aa_status[i]);
					break;
				case 5://狂暴诀
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[4].InitAnimaWithName("狂暴_持续", null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani,this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 6://定心诀
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[4].InitAnimaWithName("定心诀_持续", null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 7://魔甲术
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[4].InitAnimaWithName("魔甲术"+this.sSkillFaceTo, null);
					if(this.sSkillFaceTo=="_左")DrawBuffer.gi().DrawAnima_aa(this.iY-3, this.xani,this.iX, this.iY, this.aa_status[i]);
					else DrawBuffer.gi().DrawAnima_aa(this.iY+3,this.xani ,this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 8://壁垒
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[4].InitAnimaWithName("壁垒_持续", null);
					DrawBuffer.gi().DrawAnimaEx(this.iY+1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 10://+物攻
				case 11://+物防
				case 12://+法攻
				case 13://+法防
				case 14://+速度
				case 15://休息标记
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_ui.InitAnimaWithName("诅咒标记"+this.sSkillFaceTo, null);
					
					this.aa_status[i].iFrame= ( i-10);
					if(this.iPos<20)DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX+30, this.iY-90, this.aa_status[i]);
					else DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX-30, this.iY-90, this.aa_status[i]);
					break;
				case 20://陷阱
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[2].InitAnimaWithName("陷阱_持续", null);
					DrawBuffer.gi().DrawAnimaEx(this.iY-2, this.iX, this.iY, this.aa_status[i],101,2,2,0,-2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 21://火牢
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[5].InitAnimaWithName("火牢_持续", null);
					DrawBuffer.gi().DrawAnimaEx(this.iY-2,  this.iX, this.iY, this.aa_status[i],101,1,1,0,0,0);
					this.aa_status[i].NextFrame();
					break;
				case 22://飞钳术
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[6].InitAnimaWithName("飞箝术_持续", null);
					DrawBuffer.gi().DrawAnima_aa(this.iY-1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 23://仙绫缚
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[8].InitAnimaWithName("仙绫缚_持续", null);
					DrawBuffer.gi().DrawAnima_aa(this.iY-1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 24://眩晕
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skill.InitAnimaWithName("眩晕"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 25://流沙
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[11].InitAnimaWithName("流沙_持续", null);
					//DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					DrawBuffer.gi().DrawAnimaEx(this.iY+1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 27://巫毒
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[11].InitAnimaWithName("巫毒_持续", null);
					//DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					DrawBuffer.gi().DrawAnimaEx(this.iY+1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 28://心如止水
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[12].InitAnimaWithName("心如止水"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 29://幽冥鬼眼
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[12].InitAnimaWithName("幽冥鬼眼"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 30://火甲术
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[5].InitAnimaWithName("火甲术"+this.sSkillFaceTo, null);
					if(this.sSkillFaceTo=="_左")DrawBuffer.gi().DrawAnimaEx(this.iY-3,  this.iX, this.iY, this.aa_status[i],101,1,1,0,0,0);
					else DrawBuffer.gi().DrawAnimaEx(this.iY+3,  this.iX, this.iY, this.aa_status[i],101,1,1,0,0,0);
					this.aa_status[i].NextFrame();
					break;
				case 31://火灵诀
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[5].InitAnimaWithName("火灵诀_持续", null);
					DrawBuffer.gi().DrawAnimaEx(this.iY+2, this.iX, this.iY, this.aa_status[i],101,1,1,0,0,0);
					this.aa_status[i].NextFrame();
					break;
				case 32://凝神诀
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[6].InitAnimaWithName("凝神诀"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 34://五行甲
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[9].InitAnimaWithName("五行甲"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 35://定天弓
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[8].InitAnimaWithName("定天弓"+this.sSkillFaceTo, null);
					if(this.sSkillFaceTo=="_左")DrawBuffer.gi().DrawAnima_aa(this.iY-2, this.xani, this.iX, this.iY, this.aa_status[i]);
					else DrawBuffer.gi().DrawAnima_aa(this.iY+2, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 36://灵动九天
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[8].InitAnimaWithName("灵动九天_持续"+this.sSkillFaceTo, null);
					if(this.sSkillFaceTo=="_左")DrawBuffer.gi().DrawAnima_aa(this.iY+3,this.xani, this.iX, this.iY, this.aa_status[i]);
					else DrawBuffer.gi().DrawAnima_aa(this.iY-3,this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 37://凝神聚气
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[1].InitAnimaWithName("凝神聚气_持续", null);
					offx= (Math.cos(this.rotajd)*60);
					offy= (Math.sin(this.rotajd)*30);
					DrawBuffer.gi().DrawAnima_aa(this.iY+offy, this.xani, this.iX+offx, this.iY+offy, this.aa_status[i]);
					offx= (Math.cos(this.rotajd+XDefine.PI*2/3)*60);
					offy= (Math.sin(this.rotajd+XDefine.PI*2/3)*30);
					DrawBuffer.gi().DrawAnima_aa(this.iY+offy, this.xani, this.iX+offx, this.iY+offy, this.aa_status[i]);
					offx= (Math.cos(this.rotajd+XDefine.PI*4/3)*60);
					offy= (Math.sin(this.rotajd+XDefine.PI*4/3)*30);
					DrawBuffer.gi().DrawAnima_aa(this.iY+offy, this.xani, this.iX+offx, this.iY+offy, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 39://天魔甲
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[12].InitAnimaWithName("天魔甲"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 40://迷雾
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[2].InitAnimaWithName("迷雾_左", null);
					if(this.iPos==5)m=0;
					else m=2;
					for(j=m;j<m+2;j++)
					{
						for(k=0;k<5;k++)
						{
							DrawBuffer.gi().DrawAnimaEx(GmConfig.SCRH, XFight.gi().fat[j][k].iOx, XFight.gi().fat[j][k].iOy-100, this.aa_status[i],101,3,3,0,-2, -2);
						}
					}
					//DrawBuffer.gi().DrawAnimaEx(GmConfig.SCRH, this.iX, this.iY, this.aa_status[i],101,1,1,0,0,0);
					this.aa_status[i].NextFrame();
					break;
				case 41://兵诡
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[2].InitAnimaWithName("兵诡_左", null);
					if(this.iPos==5)m=0;
					else m=2;
					j=(XFight.gi().fat[m][0].iOx+XFight.gi().fat[m][1].iOx+XFight.gi().fat[m+1][0].iOx+XFight.gi().fat[m+1][1].iOx)/4;
					k=(XFight.gi().fat[m][0].iOy+XFight.gi().fat[m][1].iOy+XFight.gi().fat[m+1][0].iOy+XFight.gi().fat[m+1][1].iOy)/4;
					DrawBuffer.gi().DrawAnimaEx(k,j,k, this.aa_status[i],101,2,2,0,-2, -2);
					j=(XFight.gi().fat[m][0].iOx+XFight.gi().fat[m][2].iOx+XFight.gi().fat[m+1][0].iOx+XFight.gi().fat[m+1][2].iOx)/4;
					k=(XFight.gi().fat[m][0].iOy+XFight.gi().fat[m][2].iOy+XFight.gi().fat[m+1][0].iOy+XFight.gi().fat[m+1][2].iOy)/4;
					DrawBuffer.gi().DrawAnimaEx(k,j,k, this.aa_status[i],101,2,2,0,-2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 42://天阵
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[9].InitAnimaWithName("天阵"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnimaEx(1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
//					DrawBuffer.gi().DrawAnima_aa(1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 43://地阵
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[9].InitAnimaWithName("地阵"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnimaEx(1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					//DrawBuffer.gi().DrawAnima_aa(0, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 44://神灵护佑
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[12].InitAnimaWithName("神灵护佑"+this.sSkillFaceTo, null);
					//DrawBuffer.gi().DrawAnima_aa(0, this.xani, this.iX, this.iY, this.aa_status[i]);
					DrawBuffer.gi().DrawAnimaEx(0, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 18://疯狂状态
					break;
				case 19://奇谋命中
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[2].InitAnimaWithName("奇谋_持续", null);
					DrawBuffer.gi().DrawAnimaEx(this.iY+1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					this.aa_status[i].NextFrame();
					break;
				case 17://宠物11-撕裂
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[11].InitAnimaWithName("撕裂"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 33://sc7-灵智术
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[7].InitAnimaWithName("灵智术"+this.sSkillFaceTo, null);
					DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				case 50://仙甲术
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[7].InitAnimaWithName("仙甲术"+this.sSkillFaceTo, null);
					if(this.sSkillFaceTo=="_左")DrawBuffer.gi().DrawAnima_aa(this.iY-3, this.xani,this.iX, this.iY, this.aa_status[i]);
					else DrawBuffer.gi().DrawAnima_aa(this.iY+3,this.xani ,this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
					
				case 100://五行灵体效果
				case 101:
				case 102:
				case 103:
				case 104:
					if(this.aa_status[i]==null)this.aa_status[i]=GmPlay.xani_skills[0].InitAnimaWithName("五行灵体"+(i-100), null);
					DrawBuffer.gi().DrawAnimaEx(this.iY+1, this.iX, this.iY, this.aa_status[i], 101, 2, 2, 0, -2, -2);
					//DrawBuffer.gi().DrawAnima_aa(this.iY+1, this.xani, this.iX, this.iY, this.aa_status[i]);
					this.aa_status[i].NextFrame();
					break;
				}
			}
		}
	}
}

FightMember.iMaxStatusCount=200;