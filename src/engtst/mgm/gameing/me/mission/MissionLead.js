
import MapManager from "../../../../../map/MapManager"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import E_DATA from "../../../../../engine/data/E_DATA"
import E_ITEM from "../../../../../engine/data/E_ITEM"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import MyAI from "../../../../../engtst/mgm/MyAI"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import FormatStringBuffer from "../../../../../engtst/mgm/frame/format/FormatStringBuffer"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import FriendList from "../../../../../engtst/mgm/gameing/chat/privatechat/FriendList"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import NormalMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/NormalMission"
import SpecialItem from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/SpecialItem"
import SpecialMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/SpecialMission"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"

import MyMission from "./MyMission"
import MissionFrame from "./MissionFrame"

class _MISSIONINDEX
{/*
	int sort;//任务优先级
	public String sName,sDetail,sDest;
	public int iProcType;//-1无，0寻路到npc，1寻路到(地图,x,y)，2文本提示，10打开可接任务
	public int iDestNpcId;
	public int iDestMapId;
	public String sPrompt;
	public boolean bFight,bJQ;
	public int iOx,iOy;
	public int iOh,iEh;
	
	public boolean bPaoHuan;
	public int iPHTime;
	
	public FormatStringBuffer fsb;
	
	NormalMission nm;
	SpecialMission sm;
	*/
	constructor()
	{
		this.fsb=new FormatStringBuffer();
		this.sDest="";
		this.sPrompt="";
	}
	Clean()
	{
		this.bFight=false;
		this.iProcType=-1;
		this.bPaoHuan=false;
	}
}
export default class MissionLead {
	//任务快捷引导
//new_framepc

	constructor()
	{
		var i;
		this.mi=new Array(MissionLead.MAXMI);//
		for(i=0;i<MissionLead.MAXMI;i++)
		{
			this.mi[i]=new _MISSIONINDEX();
		}
		this.iW=250;
//		this.iH=212;
		this.iH=300;
		this.iX=GmConfig.SCRW-this.iW-5;
		this.iY=85;
		
		this.btn_oc=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_oc.InitButton("关闭任务");
		
		this.bOpen=true;
		
		this.iMCount=0;
		this.mi[this.iMCount].sort=0;
		this.mi[this.iMCount].sName="可接任务";
		this.mi[this.iMCount].sDest="点击查看";
		this.mi[this.iMCount].Clean();
		this.mi[this.iMCount].bJQ=false;
		this.mi[this.iMCount].nm=null;
		this.mi[this.iMCount].sm=null;
		this.mi[this.iMCount].iProcType=10;
		this.iMCount++;

		 this.iOffX=0;
		 this.iOffY=0;

		 this.bLock=false;
		 this.iLockPoint=-1;
		 this.iLockY=-1;
		 this.bMove=false;
	

	}
	

	FreshMission()
	{//把任务整合到这里
		this.iMCount=0;

		var i,j;
		var s;
		var pde;
		var pie;
		var nm;
		var sm;
		var si;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(MyMission.m.nmlist[i].bUseing)
			{
				nm=MyMission.m.nmlist[i];
				pde=MyMission.de_mission.fdata(nm.iMPoint);
				//mi[this.iMCount].sort=50;
				this.mi[this.iMCount].sort=nm.iMid;
				this.mi[this.iMCount].sName=MyMission.de_mission.strValue(nm.iMPoint, 0, 19);
				this.mi[this.iMCount].sDetail=MyMission.de_mission.strValue(nm.iMPoint, 0, 23);
				this.mi[this.iMCount]. Clean();
				this.mi[this.iMCount].bJQ=true;
				this.mi[this.iMCount].nm=nm;
				this.mi[this.iMCount].sm=null;
//				GmPlay.sop("-----------------------"+this.mi[this.iMCount].sName+"===="+this.mi[this.iMCount].iProcType);
				for(j=0;j<nm.iItemCount;j++)
				{
//					GmPlay.sop("nm.ni[i].iItemId="+nm.ni[i].iItemId);
					pie=pde.fitem(nm.ni[j].iItemId);
					if(pie==null)continue;
	//				GmPlay.sop("type="+pie.iType);
					switch(pie.iType)
					{
					case 10://npc对话ok
						this.mi[this.iMCount].sDest=pde.strValue(16);
						this.mi[this.iMCount].iDestNpcId=pde.intValue(5);
						this.mi[this.iMCount].iProcType=0;
//					GmPlay.sop("-----------------------"+this.mi[this.iMCount].sName+"===="+this.mi[this.iMCount].iProcType);
						break;
					case 14://杀怪，根据怪物id前往地图ok
						//xxx出现在xxx,xxx地图
						this.mi[this.iMCount].sPrompt=MissionLead.sPetFrom(pie.intValue(9));//怪物类型
						this.mi[this.iMCount].sDest=pie.strValue(17);
						this.mi[this.iMCount].bFight=true;
						this.mi[this.iMCount].iProcType=2;
						break;
					case 15://交物品,判断身上是否有物品，没有提示前往找物品，有了寻路去交8ok
						this.mi[this.iMCount].sDest=pde.strValue(18);
						if(MyGoods.bHaveGoods(pde.intValue(8), pde.intValue(7)))
						{//已有物品，寻路交回
							this.mi[this.iMCount].iDestNpcId=pde.intValue(33);
							this.mi[this.iMCount].iProcType=0;
						}
						else
						{//没有物品，提示上哪去弄
							this.mi[this.iMCount].sPrompt=MissionLead.sGoodsFrom(pde.intValue(8));
							this.mi[this.iMCount].iProcType=2;
						}
						break;
					case 20://npc战斗ok
						this.mi[this.iMCount].sDest=pde.strValue(24);
						this.mi[this.iMCount].iDestNpcId=pde.intValue(15);
						this.mi[this.iMCount].bFight=true;
						this.mi[this.iMCount].iProcType=0;
						break;
					case 26://捕捉怪物，根据怪物id前往地图ok
						this.mi[this.iMCount].sPrompt=MissionLead.sPetFrom(pie.intValue(30));
						this.mi[this.iMCount].sDest=pie.strValue(32);
						this.mi[this.iMCount].bFight=true;
						this.mi[this.iMCount].iProcType=2;
						break;
					}
//					GmPlay.sop("-----------------------"+this.mi[this.iMCount].sName+"===="+this.mi[this.iMCount].iProcType);
				}
				s=pde.strValue(22);
				if(s!="-1")
				{//有内容，必定提示
					this.mi[this.iMCount].sPrompt=s;
					this.mi[this.iMCount].iProcType=2;
				}
//				for(int zz=0;zz<10;zz++)GmPlay.sop(""+this.mi[this.iMCount].sName+"===="+this.mi[this.iMCount].iProcType);
				this.iMCount++;
			}
			///师门0
			//押镖10
			///剧情50
			if(MyMission.m.smlist[i].bUseing)
			{
				sm=MyMission.m.smlist[i];
				//if(sm.iMPoint==0 || sm.iMPoint==50 || sm.iMPoint==51 || sm.iMPoint==52 || sm.iMPoint==53 || sm.iMPoint==54)this.mi[this.iMCount].sort=0;//师门最优先
				//else if(sm.iMPoint==10)this.mi[this.iMCount].sort=10;
				//else this.mi[this.iMCount].sort=100;
				this.mi[this.iMCount].sort=sm.iMid;
				this.mi[this.iMCount].sName=sm.sName;
				if(sm.iMPoint==0 || sm.iMPoint==50 || sm.iMPoint==51 || sm.iMPoint==52 || sm.iMPoint==53 || sm.iMPoint==54)this.mi[this.iMCount].sName+="("+sm.iCount+"/10)";
				this.mi[this.iMCount].sDetail=sm.sDetail;
				this.mi[this.iMCount].Clean();
				this.mi[this.iMCount].bJQ=false;
				this.mi[this.iMCount].nm=null;
				this.mi[this.iMCount].sm=sm;
				
				for(j=0;j<sm.iItemCount;j++)
				{
					si=sm.si[j];
					if(si.iSType!=9 && si.iProc>=100)continue;
					if(si.iMType==0)
					{//任务目标
						switch(si.iSType)
						{
						case 1://找到npc          接触完成------------门派，帮派建造，朱雀，赛跑，跑环ok
						case 7://找到静态npc，需要对话---------------坐骑
							this.mi[this.iMCount].sDest=si.sDetail;
							this.mi[this.iMCount].iDestNpcId=si.iV1;
							this.mi[this.iMCount].iProcType=0;
							break;
						case 5://与静态npc战斗------------厢房，跑环ok
						case 8://与静态npc战斗------------坐骑的火妖
							this.mi[this.iMCount].sDest=si.sDetail;
							this.mi[this.iMCount].iDestNpcId=si.iV1;
							this.mi[this.iMCount].iProcType=0;
							this.mi[this.iMCount].bFight=true;
							break;
						case 0://找到物品交给静态npc--------押镖ok
							if(sm.iMPoint!=10)this.mi[this.iMCount].sDest=si.sDetail;
							GmPlay.sop(""+si.iV1);
							if(MyGoods.bHaveGoods(si.iV1, si.iV2))
							{//有物品，寻路到npc
								this.mi[this.iMCount].iDestNpcId=si.iV3;
								this.mi[this.iMCount].iProcType=0;
								if(sm.iMPoint==10)
								{//押镖
									this.mi[this.iMCount].sPrompt=sm.sDetail+"#e#e(手动押镖不能自动寻路)";
									this.mi[this.iMCount].iProcType=2;
									this.mi[this.iMCount].sDest=si.sDetail;
								}
							}
							else
							{//没有物品，提示在哪里
								if(sm.iMPoint==10)
								{//押镖，没有任务物品，不显示
									continue;
								}
								this.mi[this.iMCount].sPrompt=MissionLead.sGoodsFrom(si.iV1);
								this.mi[this.iMCount].iProcType=2;
							}
							break;
						case 2://与动态npc战斗------强盗任务，师门冒充，厢房，执法大鬼，师徒，门派闯关，直接显示任务详细描述ok
							this.mi[this.iMCount].bFight=true;
						case 6://与动态npc交谈------师徒
							this.mi[this.iMCount].sDest=si.sDetail;
							this.mi[this.iMCount].sPrompt=sm.sDetail;
							this.mi[this.iMCount].iProcType=2;
							break;
						case 9://杀怪----------------除害ok
							this.mi[this.iMCount].sPrompt=MissionLead.sPetFrom(si.iV1);
							if(this.mi[this.iMCount].sPrompt.length<=0)
							{
								this.mi[this.iMCount].sPrompt=sm.sDetail;
								//this.mi[this.iMCount].sPrompt="小地图/世界地图查看野外地图#e在野外地图走动，会遭遇怪物";
							}
							this.mi[this.iMCount].sDest=si.sDetail+"("+si.iProc+"/"+si.iV2+")";
							this.mi[this.iMCount].bFight=true;
							this.mi[this.iMCount].iProcType=2;
							if(si.iProc>=si.iV2)
							{//完成任务，自动寻路前往交任务
								if(sm.iMPoint==13)
								{//除害
									this.mi[this.iMCount].iDestNpcId=20;
									this.mi[this.iMCount].iProcType=0;
								}
							}
							break;
						case 3://抓宠物上交---------门派，手艺，坐骑，跑环ok
							this.mi[this.iMCount].sDest=si.sDetail;
							if(MyPets.bHavePet(si.iV1, si.iV3))
							{//有宠物，寻路到目标npc
								this.mi[this.iMCount].iDestNpcId=si.iV2;
								this.mi[this.iMCount].iProcType=0;
							}
							else
							{//没有宠物，提示上哪抓
								this.mi[this.iMCount].sPrompt=MissionLead.sPetFrom(si.iV1);
								this.mi[this.iMCount].iProcType=2;
							}
							break;
						case 4://巡逻---------------厢房ok
							this.mi[this.iMCount].bFight=true;
							this.mi[this.iMCount].sDest=si.sDetail;
							this.mi[this.iMCount].sPrompt=sm.sDetail;
							this.mi[this.iMCount].iProcType=2;
							break;
						case 10://交物品给动态npc---师徒ok
							this.mi[this.iMCount].sDest=si.sDetail;
							if(MyGoods.bHaveGoods(si.iV1, si.iV2))
							{//有物品
								this.mi[this.iMCount].sPrompt=sm.sDetail;
								this.mi[this.iMCount].iProcType=2;
							}
							else
							{//没有物品，提示在哪里
								this.mi[this.iMCount].sPrompt=MissionLead.sGoodsFrom(si.iV1);
								this.mi[this.iMCount].iProcType=2;
							}
							break;
						case 11://巡逻不战斗---------师徒ok
						case 14://无目标，服务器判断，福缘
						case 15:
						case 16:
						case 17:
							this.mi[this.iMCount].sDest=si.sDetail;
							this.mi[this.iMCount].sPrompt=sm.sDetail;
							this.mi[this.iMCount].iProcType=2;
							break;
						case 12://倒计时-------------跑环
							this.mi[this.iMCount].bPaoHuan=true;
							this.mi[this.iMCount].iPHTime=si.iV1;
							//this.mi[this.iMCount].sDest="传说剩余"+((this.mi[this.iMCount].iPHTime-(GmPlay.iNowMillis-GmMe.iMillis)/1000-GmMe.iSecond)/60)+"分钟";
							break;
						case 13://传说---------------跑环
							this.mi[this.iMCount].sDest=si.sDetail;
							this.mi[this.iMCount].sPrompt=sm.sDetail;
							this.mi[this.iMCount].iProcType=2;
							break;
						case 18:
							this.mi[this.iMCount].sDest=si.sDetail+si.iProc+"/10";
							this.mi[this.iMCount].sPrompt=sm.sDetail;
							this.mi[this.iMCount].iProcType=2;
							break;
						}
					}
				}
				this.iMCount++;
			}
		}
		
		var tmpmi;
		for(i=0;i<this.iMCount-1;i++)
		{
			for(j=i+1;j<this.iMCount;j++)
			{
				if(this.mi[j].sort>this.mi[i].sort)
				{
					tmpmi=this.mi[j];
					this.mi[j]=this.mi[i];
					this.mi[i]=tmpmi;
				}
			}
		}

		if(GmMe.me.rbs.iLev>=10)
		{//10级以上出现可接任务选项
			this.mi[this.iMCount].sort=0;
			this.mi[this.iMCount].sName="可接任务";
			this.mi[this.iMCount].sDest="点击查看";
			this.mi[this.iMCount].Clean();
			this.mi[this.iMCount].bJQ=false;
			this.mi[this.iMCount].nm=null;
			this.mi[this.iMCount].sm=null;
			this.mi[this.iMCount].iProcType=10;
			this.iMCount++;
		}
		
		for(i=0;i<this.iMCount;i++)
		{
			FormatString.gi().FormatEx("#cfeeede"+this.mi[i].sDest, 230, 22, 0, 0, 26);
			this.mi[i].fsb.Init();
			this.mi[i].iEh=FormatString.gi().iH;
			this.mi[i].iOh=8+24+5+this.mi[i].iEh+8;
			
//			for(j=0;j<10;j++)
			{
//				GmPlay.sop(""+i+":"+this.mi[i].sName+"==="+this.mi[i].sort);
			}
		}
	}


	

	Draw()
	{//h根据文字长度来
		
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(this.iMCount<=0)return;
		var i,j;
//		String ts;
		this.iOffH=0;
		if(this.iX>GmConfig.SCRW)this.iX=GmConfig.SCRW;
		this.btn_oc.Move(this.iX-50, this.iY, 50, 70);
		i=this.iW/4;
		if(FriendList.gi().bShow && !FriendList.gi().bCloseing)
		{
			if(this.iX<GmConfig.SCRW-5)this.iX+=i;
			else return;
		}
		else if(!this.bOpen)
		{
			if(this.iX<GmConfig.SCRW)
			{
				this.iX+=i;
				this.btn_oc.Move(this.iX-50, this.iY, 50, 70);
				this.btn_oc.Draw();
			}
			else
			{
				this.btn_oc.Draw();
				return;
			}
		}
		else
		{
			if(this.iX>GmConfig.SCRW-this.iW-5+i)this.iX-=i;
			else this.iX=GmConfig.SCRW-this.iW-5;

			this.btn_oc.Move(this.iX-50, this.iY, 50, 70);
			this.btn_oc.Draw();
		}

		//物品数量，宠物数量变化，可能影响任务进度，需要fresh
		i=MyGoods.iHaveGoodsCount();
		j=MyPets.bHavePetCount();
		if(MissionLead.iOldGoodsCount!=i || MissionLead.iOldPetCount!=j)
		{
			MissionLead.iOldGoodsCount=i;
			MissionLead.iOldPetCount=j;
			this.FreshMission();
		}
//		this.FreshMission();
		M3DFast.gi().SetViewClip(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH);
		for(i=0;i<this.iMCount;i++)
		{
			this.mi[i].iOx=this.iX;
			this.mi[i].iOy=this.iY+this.iOffH+this.iOffY;
			
//			if(this.mi[i].bPaoHuan)
//			{
//				ts="传说剩余"+((this.mi[this.iMCount].iPHTime-(GmPlay.iNowMillis-GmMe.iMillis)/1000-GmMe.iSecond)/60)+"分钟";
//				if(ts!=this.mi[this.iMCount].sDest)
//				{
//					this.mi[this.iMCount].sDest=ts;
//					FormatString.gi().FormatEx("#cfeeede"+this.mi[i].sDest, 230, 22, 0, 0, 26);
//					this.mi[i].fsb.Init();
//					this.mi[i].iEh=FormatString.gi().iH;
//					this.mi[i].iOh=10+24+10+this.mi[i].iEh+10;
//				}
//			}
			
			if(this.bLock && this.iLockPoint==i)DrawMode.new_framepc(this.mi[i].iOx,this.mi[i].iOy,this.iW,this.mi[i].iOh);
			else M3DFast.gi().FillRect_2D(this.mi[i].iOx,this.mi[i].iOy, this.mi[i].iOx+this.iW,this.mi[i].iOy+this.mi[i].iOh, 0x80000000);
			M3DFast.gi().DrawTextEx(this.mi[i].iOx+8,this.mi[i].iOy+8, this.mi[i].sName, this.mi[i].bJQ?0xffff00ff:0xffffff00, 24, 101, 1, 1, 0, 0, 0);
			this.mi[i].fsb.Draw(this.mi[i].iOx+8,this.mi[i].iOy+8+24+5);
			if(this.mi[i].bFight)
			{
				GmPlay.xani_nui3.DrawAnima(this.mi[i].iOx+225, this.mi[i].iOy+25, "战斗标签", 0);
			}
			
			this.iOffH+=this.mi[i].iOh+2;
		}
		M3DFast.gi().NoClip();
		if(!this.bMove)
		{//超限的，恢复
			j=this.iH-this.iOffH;
			if(j>0)j=0;
			if(this.iOffY<j)
			{
				if(this.iOffY<j-50)this.iOffY+=50;
				else this.iOffY=j;
			}
			if(this.iOffY>0)
			{
				if(this.iOffY>50)this.iOffY-=50;
				else this.iOffY=0;
			}
		}
	}

	ProcTouch( msg, x, y)
	{
		if(this.iMCount<=0)return false;
		if(FriendList.gi().bShow && !FriendList.gi().bCloseing)
		{
			return false;
		}
		else if(!this.bOpen)
		{
			if(this.btn_oc.ProcTouch(msg, x, y))
			{
				if(this.btn_oc.bCheck())
				{
					this.bOpen=true;
					this.btn_oc.InitButton("关闭任务");
				}
				return true;
			}
			return false;
		}
		if(this.btn_oc.ProcTouch(msg, x, y))
		{
			if(this.btn_oc.bCheck())
			{
				this.bOpen=false;
				this.btn_oc.InitButton("打开任务");
			}
			return true;
		}
		var i;
		if(this.bLock)
		{
			if(msg==2)
			{
				i=y-this.iLockY;
				if(!this.bMove)
				{
					if(i>20 || i<-20)this.bMove=true;
				}
				if(this.bMove)
				{//移动中
					this.iOffY+=i;
					this.iLockY=y;
					if(this.iOffY>this.iH-5)this.iOffY=this.iH-5;
					if(this.iOffY<5-this.iOffH)this.iOffY=5-this.iOffH;
				}
			}
			if(msg==3)
			{
				this.bLock=false;
				if(this.bMove)
				{//拉动放开
					this.bMove=false;
				}
				else
				{//点了一个任务，提示或寻路
					if(this.mi[this.iLockPoint].iProcType==10)
					{//打开可接任务
						MissionFrame.Open(1);
						return true;
					}
					if(this.mi[this.iLockPoint].nm!=null)
					{
						if(this.mi[this.iLockPoint].nm.iMPoint==56 || this.mi[this.iLockPoint].nm.iMPoint==59 || this.mi[this.iLockPoint].nm.iMPoint==139 || this.mi[this.iLockPoint].nm.iMPoint==140 || this.mi[this.iLockPoint].nm.iMPoint==141 || this.mi[this.iLockPoint].nm.iMPoint==144)
						{//师门抓猪
							MyAI.gi().AutoNormalMission(this.mi[this.iLockPoint].nm);
							return true;
						}
					}
					if(this.mi[this.iLockPoint].sm!=null)
					{
						if(this.mi[this.iLockPoint].sm.iMPoint==50 || this.mi[this.iLockPoint].sm.iMPoint==51 || this.mi[this.iLockPoint].sm.iMPoint==52 || this.mi[this.iLockPoint].sm.iMPoint==53 || this.mi[this.iLockPoint].sm.iMPoint==54)
						{//新自动师门
							MyAI.gi().AutoSpecialMission(this.mi[this.iLockPoint].sm);
							return true;
						}
						if(this.mi[this.iLockPoint].sm.iMPoint==10)
						{//押镖
							if(parseInt(GmMe.me.iFlag[1]/100000000)==1)
							{//自动押镖，可执行自动寻路
								MyAI.gi().AutoSpecialMission(this.mi[this.iLockPoint].sm);
								return true;
							}
						}
					}
					//for(i=0;i<10;i++)GmPlay.sop("cccccccccccccc"+this.mi[this.iLockPoint].iProcType);
					if(this.mi[this.iLockPoint].iProcType==0)
					{//寻路npc
//						MapManager.gi().vbk.GoToNpc_byid(this.mi[this.iLockPoint].iDestNpcId);
						MyAI.gi().FindNpc(this.mi[this.iLockPoint].iDestNpcId,this.mi[this.iLockPoint].nm!=null,this.mi[this.iLockPoint].nm!=null);//
					}
					if(this.mi[this.iLockPoint].iProcType==2)
					{//文字提示
						if(this.mi[this.iLockPoint].bPaoHuan)
						{
							FrameMessage.fm.Open(this.mi[this.iLockPoint].sPrompt+"#e#e剩余时间："+Math.floor((this.mi[this.iLockPoint].iPHTime-(GmPlay.iNowMillis-GmMe.iMillis)/1000-GmMe.iSecond)/60)+"分钟");
						}
						else FrameMessage.fm.Open(this.mi[this.iLockPoint].sPrompt);
					}
				}
				
			}
			return true;
		}
		if(msg==1)
		{//按下，锁定
			if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
			{
				for(i=0;i<this.iMCount;i++)
				{
					if(this.mi[i].iOy<=y && y<=this.mi[i].iOy+this.mi[i].iOh+2)
					{
						this.bLock=true;
						this.iLockPoint=i;
						this.iLockY=y;
						return true;
					}
				}
			}
		}
		return false;
	}
	special_doyb()
	{
		var i;
		for(i=0;i<this.iMCount;i++)
		{
			if(this.mi[i].sm!=null)
			{
				if(this.mi[i].sm.iMPoint==10)
				{//押镖
					if(parseInt(GmMe.me.iFlag[1]/100000000)==1)
					{//自动押镖，可执行自动寻路
						MyAI.gi().AutoSpecialMission(this.mi[i].sm);
					}
				}
			}
		}
	}
}
MissionLead.MAXMI=20;
	
MissionLead.ml=null;
MissionLead.gi=function()
{
	if(MissionLead.ml==null)MissionLead.ml=new MissionLead();
	return MissionLead.ml;
}
MissionLead.sGoodsFrom=function( gtype)
	{
		var i;
		var ed=GmPlay.de_goods.fdata(gtype);
		if(ed==null)return "";
		var sResult;
		sResult=ed.strValue(4)+"#e#cffffff";
		i=ed.intValue(9);
		if(i>=0)
		{//装备
			if(i==0)sResult+="0级装备可在【乡水镇】装备商人处购买";
			if(i==10)sResult+="10级装备可在【西阳城】装备商人处购买";
			if(i==20)sResult+="20级装备可在【郢城】装备商人处购买#e#e通过西阳城轿夫前往";
			if(i==30)sResult+="30级装备可在【临淄】装备商人处购买#e#e通过西阳城轿夫前往";
			if(i==40)sResult+="40级装备可在【咸阳】装备商人处购买#e#e通过西阳城轿夫前往";
			if(i>=50)sResult+=i+"级装备，可使用图纸和材料，在【乡水镇】铁匠处打造";
			return sResult;
		}
		i=ed.intValue(27);
		if(i>0)
		{
			if(i==1 || i==2)
			{
				switch(gtype)
				{
				case 65:sResult+="竹叶可在【乡水镇】药品商购买";break;
				case 66:sResult+="香草可在【乡水镇】或【西阳城】药品商购买";break;
				case 67:sResult+="薄荷可在【西阳城】或【郢城】药品商购买";break;
				case 68:sResult+="夏枯草可在【乡水镇】药品商购买";break;
				case 69:sResult+="石蜜可在【乡水镇】或【西阳城】药品商购买";break;
				case 70:sResult+="止血草可在【西阳城】药品商购买";break;
				case 71:sResult+="甘草可在【乡水镇】或【郢城】药品商购买";break;
				case 72:sResult+="勺药可在【乡水镇】或【临淄】药品商购买";break;
				case 73:sResult+="蜂蜜可在【西阳城】或【临淄】药品商购买";break;
				case 74:sResult+="松脂可在【西阳城】药品商购买";break;
				
				case 75:sResult+="云母可在【郢城】药品商购买#e#e通过西阳城轿夫前往";break;
				case 76:sResult+="麝香可在【临淄】药品商购买#e#e通过西阳城轿夫前往";break;
				case 77:sResult+="赤芝可在【咸阳】药品商购买#e#e通过西阳城轿夫前往";break;
				case 78:sResult+="人参可在【郢城】药品商购买#e#e通过西阳城轿夫前往";break;
				case 79:sResult+="鹿茸可在【临淄】药品商购买#e#e通过西阳城轿夫前往";break;
				case 80:sResult+="熊胆可在【临淄】或【咸阳】药品商购买#e#e通过西阳城轿夫前往";break;
				case 81:sResult+="雄黄可在【郢城】或【咸阳】药品商购买#e#e通过西阳城轿夫前往";break;
				case 82:sResult+="当归可在【临淄】或【咸阳】药品商购买#e#e通过西阳城轿夫前往";break;
				case 83:sResult+="白石英可在【郢城】或【咸阳】药品商购买#e#e通过西阳城轿夫前往";break;
				case 84:sResult+="紫石英可在【咸阳】药品商购买#e#e通过西阳城轿夫前往";break;
				}
			}
			if(i==3)sResult+="三级草药通过挖宝或副本获得，部分三级草药可在商城购买";
			return sResult;
		}
		i=ed.intValue(33);
		if(i>0)
		{
			if(i==1)sResult+="一级丹药，使用丹方进行炼丹可获得，每完成一轮帮派朱雀任务，可获得一张丹方。在帮派中学习炼丹术，可提高炼出丹药的品质";
			if(i==2)sResult+="二级丹药，可在商城购买";
			return sResult;
		}
		i=ed.intValue(31);
		if(i>0)
		{
			if(i==1)sResult+="一级材料，完成一轮护法任务有几率获得，护法任务在【咸阳】商鞅处领取，30级以下地图战斗也有几率掉落一级材料。#e任务获得材料种类随机，建议玩家向其他玩家购买所需材料";
			if(i==2)sResult+="二级材料，30级以上完成一轮护法任务有几率获得，护法任务在【咸阳】商鞅处领取，30级以上地图战斗也有几率掉落二级材料。#e任务获得材料种类随机，建议玩家向其他玩家购买所需材料";
			if(i==3)sResult+="三级材料，挖宝有几率获得，或在【咸阳】副本官处使用副本积分兑换#e建议玩家通过交易获得所需材料";
			return sResult;
		}
		i=ed.intValue(34);
		if(i>=0)
		{//烹饪
			sResult+="在帮派学院学习烹饪技能，即可制作烹饪，技能等级越高，制出烹饪品质越高，也可直接向其他玩家购买";
			return sResult;
		}
	
		if(gtype==154 || gtype==155 || gtype==156)
		{//宠物技能书
			sResult+="挖宝有几率获得#e战胜嚣张有几率获得#e打开宠物技能包可获得#e建议玩家通过交易购买所需特定宠物技能书";
			return sResult;
		}
		if(gtype==157 || gtype==158 || gtype==159)
		{//宠物技能包
			sResult+="可在商城购买获得";
			return sResult;
		}
		if(gtype==160 || gtype==161)
		{//仙灵果
			sResult+="挖宝有几率获得#e活动，副本掉落#e向其他玩家购买#e商城购买";
			return sResult;
		}
		if(gtype==226 || gtype==227 || gtype==227)
		{//仙露仙桃玉灵果
			sResult+="周二门派闯关活动中掉落#e或向其他玩家购买";
			return sResult;
		}
		if(gtype==116 || gtype==117 || gtype==118 || gtype==119 || gtype==120 || gtype==121 || gtype==122 || gtype==123 || gtype==207 || gtype==208 || gtype==236 || gtype==106 || gtype==107 || gtype==108 || gtype==229)
		{//双倍经验卡等道具
			sResult+="日常活动中获得#e向其他玩家购买#e商城购买";
			return sResult;
		}
		if(gtype==209)
		{//修炼果
			sResult+="在【临淄】慎到处拜师或收徒，领取师徒任务，完成师徒任务可获得修炼积分，用于兑换修炼果。也可向其他玩家购买获得";
			return sResult;
		}
		if(gtype==209 || gtype==211 || gtype==212)
		{//锦盒，福袋，烟花
			sResult+="活动中获得，也可向其他玩家购买获得";
			return sResult;
		}
		if(gtype==278 || gtype==279)
		{//国庆礼花
			sResult+="国庆活动中获得";
			return sResult;
		}
		if(gtype>=109 && gtype<=115)
		{
			sResult+="野外地图战斗有几率掉落，挖宝有几率获得，或向其他玩家购买";
			return sResult;
		}
		if(gtype>=213 && gtype<=224)
		{
			sResult+="新年活动中获得";
			return sResult;
		}
		if(gtype>=101 && gtype<=105)
		{
			sResult+="打败妖怪叔叔掉落#e副本，活动中掉落#e或向其他玩家购买";
			return sResult;
		}
		if(gtype==96)
		{
			sResult+="完成除害任务获得#e副本，活动中掉落#e或向其他玩家购买";
			return sResult;
		}
		if(gtype==97)
		{
			sResult+="【郢城】栾千盛处完成一轮强盗任务可获得#e挖宝有几率获得#e高级图纸可跑环获得，或用副本积分兑换#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==98 || gtype==99 || gtype==100)
		{
			sResult+="在帮派学院学习相应技能即可制作#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==162 || gtype==225 || gtype==237)
		{
			sResult+="系统赠送给新玩家的礼物，没有其他获得途径";
			return sResult;
		}
		if(gtype==163 || gtype==164)
		{
			sResult+="押镖任务物品，任务中自动获得";
			return sResult;
		}
		if(gtype==192 || gtype==193 || gtype==194)
		{
			sResult+="帮派任务物品，领取任务自动获得";
			return sResult;
		}
		if(gtype==195)
		{
			sResult+="每完成一轮帮派朱雀任务，可获得一张丹方。#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==196)
		{
			sResult+="完成押镖任务有几率获得#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==230)
		{
			sResult+="集齐一套七国旗，可在【西阳城】乞丐处兑换高级藏宝图#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype>=231 && gtype<=235)
		{
			sResult+="对怪物贝贝使用偷窃技能可获得，偷窃技能可在【西阳山道】狐狸精处学习#e周二门派闯关活动中掉落#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==238 || gtype==239 || gtype==240 || gtype==241 || gtype==242 || gtype==243)
		{//经验，钱，绑铜
			sResult+="展示物品";
			return sResult;
		}
		if(gtype==312)
		{//彩果
			sResult+="周三西阳保卫战中有几率掉落#e【乡水镇】新手指导员处侠义值兑换#e商城购买#e向其他玩家购买";
			return sResult;
		}
		if(gtype==255 || gtype==256 || gtype==257 || gtype==258 || gtype==259)
		{
			sResult+="挖宝有几率获得#e打开果实有几率获得";
			return sResult;
		}
		if(gtype==260 || gtype==261 || gtype==262)
		{//锄头，地契，房契
			sResult+="商城购买";
			return sResult;
		}
		if(gtype==263 || gtype==264 || gtype==265)
		{//空水壶，满水壶，肥料
			sResult+="照料土地时获得的任务物品";
			return sResult;
		}
		if(gtype>=266 && gtype<=270)
		{//灵石
			sResult+="挖宝获得#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==271 || gtype==272 || gtype==273 || gtype==274 || gtype==275)
		{//果实
			sResult+="土地上植物成熟后，采摘得到#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==276 || gtype==277)
		{//经验丹
			sResult+="打开果实有几率获得#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==280 || gtype==281 || gtype==282 || gtype==283 || gtype==284)
		{//兽魂
			sResult+="完成战队秘境可获得#e也可向其他玩家购买";
			return sResult;
		}
		if(gtype==280 || gtype==281 || gtype==282 || gtype==283 || gtype==284)
		{//自然之力
			sResult+="打开果实有几率获得#e也可向其他玩家购买";
			return sResult;
		}
		return sResult;
	}
	MissionLead.sPetFrom=function( ptype)
	{
		var i,j,k=0;
		var ed=GmPlay.de_pet.fdata(ptype);
		if(ed==null)return "";
		var sResult;
		sResult=ed.strValue(1)+"出现在#c00ff00";
		for(i=0;i<GmPlay.de_map.iDataCount;i++)
		{
			for(j=0;j<GmPlay.de_map.datas[i].iItemCount;j++)
			{
				if(GmPlay.de_map.datas[i].items[j].iType==4)
				{
					if(GmPlay.de_map.datas[i].items[j].intValue(6)==ptype)
					{
						if(k>0)sResult+="，";
						k++;
						sResult+=GmPlay.de_map.datas[i].strValue(1);
					}
				}
			}
			//E_DATA
		}
		sResult+="#o#e#e"+"小地图/#c00ff00世界地图#o查看如何前往#e在野外地图#c00ff00走动#o，会遭遇怪物#e注！将快捷中的#c00ff00遇怪开关#o打开";
		return sResult;
	}
MissionLead.iOldGoodsCount=0;
MissionLead.iOldPetCount=0;