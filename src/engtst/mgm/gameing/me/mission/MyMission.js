import MapManager from "../../../../../map/MapManager"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../../engtst/mgm/MyAI"
import BeginersGuide from "../../../../../engtst/mgm/gameing/help/BeginersGuide"
import ShowPath from "../../../../../engtst/mgm/gameing/help/ShowPath"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import NormalMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/NormalMission"
import SpecialMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/SpecialMission"
import MissionFinish from "./MissionFinish"

export default class MyMission{
	constructor(){
		var i;
		this.nmlist=new Array(MyMission.MAXMISSIONCOUNT);//
		this.smlist=new Array(MyMission.MAXMISSIONCOUNT);//
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++){
			this.nmlist[i]=new NormalMission();
			this.smlist[i]=new SpecialMission();
		}
		
		this.iNMCount=0;
		this.iSMCount=0;
	}
	bCheckInMissionMap( npcid)
	{//15,16
		var i,j;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(this.smlist[i].bUseing)
			{
				for(j=0;j<this.smlist[i].iItemCount;j++)
				{
					GmPlay.sop(""+this.smlist[i].si[j].iSType+",,,"+this.smlist[i].si[j].iV2+",,,"+MapManager.gi().iVisualMapId);
					if(this.smlist[i].si[j].iMType==0 && (this.smlist[i].si[j].iSType==15 || this.smlist[i].si[j].iSType==16 || this.smlist[i].si[j].iSType==17))
					{
						if(this.smlist[i].si[j].iV1==npcid && this.smlist[i].si[j].iV2==MapManager.gi().iVisualMapId)
						{
							GmPlay.sop("true"+this.smlist[i].si[j].iV1);
							return true;
						}
					}
				}
			}
		}
		return false;
	}
	 bCheckDoing( mpoint)
	{//检测是否正在执行此任务
		var i;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(this.nmlist[i].bUseing && this.nmlist[i].iMPoint==mpoint)
			{
				return true;
			}
		}
		return false;
	}
	 bCheckSpecialDoing( mpoint)
	{
		var i;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(this.smlist[i].bUseing && this.smlist[i].iMPoint==mpoint)
			{
				return true;
			}
		}
		return false;
	}
	bCheckRequirement( mid)
	{//检测是否满足执行条件
		var i,j,k;
		var mdata=MyMission.de_mission.datas[MyMission.de_mission.iValueIndex[mid]];
		for(i=0;i<mdata.iItemCount;i++)
		{
			for(j=0;j<mdata.items[i].iValueCount;j++)
			{
				switch(mdata.items[i].values[j].iVid)
				{
				case 2://等级下限
					k=parseInt(mdata.items[i].values[j].sValue);
					if(GmMe.me.rbs.iLev<k)return false;
					break;
				case 3://门派限制
					k=parseInt(mdata.items[i].values[j].sValue);
					if(GmMe.me.rbs.iSchoolId!=k)return false;
					break;
				case 4://性别限制
					k=parseInt(mdata.items[i].values[j].sValue);
					if(GmMe.me.iSex!=k)return false;
					break;
				case 1://已完成任务限制
					break;
				}
			}
		}
		return true;
	}
	 bCheckCanFinish( mid)
	{//检测是否满足完成条件
		return true;
	}
	
	CheckMission1( npcid)
	{
		var i,j,k;
//		for(i=0;i<10;i++)GmPlay.sop("npcid="+npcid);
		GmPlay.sop("Check Mission1 npcid="+npcid);
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{//检测门派任务中的找人任务是否完成
			if(this.smlist[i].bUseing)
			{
//				GmPlay.sop("zzz="+i+",,,cc="+this.smlist[i].iItemCount);
				for(j=0;j<this.smlist[i].iItemCount;j++)
				{
//					GmPlay.sop("aaaaaaaaaaaaaaaaa"+this.smlist[i].si[j].iV2+"===="+npcid);
					if(this.smlist[i].si[j].iMType==0 && this.smlist[i].si[j].iSType==3 && this.smlist[i].si[j].iV2==npcid && this.smlist[i].si[j].iProc<100)
					{//完成条件，抓宠物
						GmPlay.sop("完成条件，抓宠物,finish 1,0");
						GmProtocol.gi().s_FinishMission(1,this.smlist[i].iMPoint,0,0);
						break;
					}
//					GmPlay.sop(","+this.smlist[i].si[j].iMType+","+this.smlist[i].si[j].iSType+","+this.smlist[i].si[j].iV1);
					if(this.smlist[i].si[j].iMType==0 && this.smlist[i].si[j].iSType==1 && this.smlist[i].si[j].iV1==npcid && this.smlist[i].si[j].iProc<100)
					{//完成条件，找npc
//						GmPlay.sop("finish 1,0");
						GmProtocol.gi().s_FinishMission(1,this.smlist[i].iMPoint,0,0);
						break;
					}
					if(this.smlist[i].si[j].iMType==0 && this.smlist[i].si[j].iSType==0 && (this.smlist[i].si[j].iV3==0 || this.smlist[i].si[j].iV3==npcid) && this.smlist[i].si[j].iProc<100)
					{//完成条件，交物品给npc 
						for(k=0;k<20;k++)
						{
							if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==this.smlist[i].si[j].iV1)
							{
								//GmPlay.sop("aaaaaaaaaaaaaaaaa"+this.smlist[i].si[j].iV2+"===="+npcid);
								GmProtocol.gi().s_FinishMission(1,this.smlist[i].iMPoint,0,0);
								break;
							}
						}
					}
				}
			}
		}
	}
	
	getmissionindex( pls)
	{

		var i;
		var mid=pls.GetNextInt();
		var name=pls.GetNextString();
		var type=pls.GetNextByte();//0普通任务，>=1特殊任务
		if(type==0)
		{
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{
				if(this.nmlist[i].bUseing && this.nmlist[i].iMid==mid)
				{
					this.nmlist[i].iType=type;
					this.nmlist[i].sName=name;
					this.nmlist[i].iMPoint=pls.GetNextInt();
					this.nmlist[i].iItemCount=0;
					this.nmlist[i].bDetailed=false;
					GmProtocol.gi().s_GetMissionDetail(mid,type);
					if(this.nmlist[i].iMPoint==59)BeginersGuide.iEventGuide=61;
					return;
				}
			}
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{//没有，加入列表
				if(!this.nmlist[i].bUseing)
				{
					this.nmlist[i].bUseing=true;
					this.nmlist[i].iMid=mid;
					this.nmlist[i].iType=type;
					this.nmlist[i].sName=name;
					this.nmlist[i].iMPoint=pls.GetNextInt();//指向db_
					this.nmlist[i].iItemCount=0;
					this.nmlist[i].bDetailed=false;
					GmProtocol.gi().s_GetMissionDetail(mid,type);
					if(this.nmlist[i].iMPoint==59)BeginersGuide.iEventGuide=61;
					if(this.nmlist[i].iMPoint==56 && MapManager.gi().iCurrentMapId==1)
					{//在新手村，得到抓猪任务，提示路径
						ShowPath.psp.InitPath(1870, 1404);
					}
					return;
				}
			}
		}
		else
		{
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{//已有，更新
				if(this.smlist[i].bUseing && this.smlist[i].iMid==mid)
				{
					this.smlist[i].iType=type;
					this.smlist[i].sName=name;
					this.smlist[i].sDetail=pls.GetNextString();
					this.smlist[i].iItemCount=0;
					this.smlist[i].bDetailed=false;
					GmProtocol.gi().s_GetMissionDetail(mid,type);
					return;
				}
			}
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{//没有，加入列表
				if(!this.smlist[i].bUseing)
				{
					this.smlist[i].bUseing=true;
					this.smlist[i].iMid=mid;
					this.smlist[i].iType=type;
					this.smlist[i].sName=name;
					this.smlist[i].sDetail=pls.GetNextString();
					this.smlist[i].iMPoint=pls.GetNextInt();
					this.smlist[i].iCount=pls.GetNextInt();
					this.smlist[i].iItemCount=0;
					this.smlist[i].bDetailed=false;
					GmProtocol.gi().s_GetMissionDetail(mid,type);
					return;
				}
			}
		}
	}
	linktonpc()
	{//根据任务，设置npc头顶标记，感叹号(可交任务)，问号(可接任务)
		MapManager.gi().vbk.ClearNpcFlag();
		var i,j,k;
		var pde;
		var pie;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(this.smlist[i].bUseing && this.smlist[i].bDetailed)
			{
				for(j=0;j<this.smlist[i].iItemCount;j++)
				{
					if(this.smlist[i].si[j].iMType==0)
					{//条件
						switch(this.smlist[i].si[j].iSType)
						{
						case 0://找物品
							if(this.smlist[i].si[j].iV3>0)
							{
								if(this.smlist[i].si[j].iProc>=100)MapManager.gi().vbk.SetNpcFlag(this.smlist[i].si[j].iV3, 0);//无
								else MapManager.gi().vbk.SetNpcFlag(this.smlist[i].si[j].iV3, 1);//可交
							}
							break;
						case 1://找npc
							if(this.smlist[i].si[j].iProc>=100)MapManager.gi().vbk.SetNpcFlag(this.smlist[i].si[j].iV1, 0);//无
							else MapManager.gi().vbk.SetNpcFlag(this.smlist[i].si[j].iV1, 1);//可交
							break;
						}
					}
				}
			}
			if(this.nmlist[i].bUseing && this.nmlist[i].bDetailed)//this.nmlist[i].iItemCount>0
			{//普通剧情任务，存在于db_mission
				pde=MyMission.de_mission.fdata(this.nmlist[i].iMPoint);
//				for(j=0;j<pde.iItemCount;j++)
				for(j=0;j<this.nmlist[i].iItemCount;j++)
				{
					GmPlay.sop("---("+j+")this.nmlist[i].ni[j].iItemId="+this.nmlist[i].ni[j].iItemId);
					pie=pde.fitem(this.nmlist[i].ni[j].iItemId);
					if(pie==null)continue;
					switch(pie.iType)
					{
					case 10://跟npc对话
						k=pie.intValue(5);//npc id
						//可交任务
						MapManager.gi().vbk.SetNpcFlag(k, 1);
//						for(int z=0;z<50;z++)GmPlay.sop("2222222222222222");
						break;
					case 14://杀怪
						break;
					case 15://拥有物品
						break;
					case 20://NPC战斗
						k=pie.intValue(15);//npc id
						MapManager.gi().vbk.SetNpcFlag(k, 1);
						break;
					}
				}
			}
		}
	}
	getmissiondetail( pls)
	{
		var mid=pls.GetNextInt();
		var type=pls.GetNextByte();
		var i,j;
		if(type==0)
		{
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{
				if(this.nmlist[i].bUseing && this.nmlist[i].iMid==mid)
				{
					this.nmlist[i].iItemCount=pls.GetNextByte();//进度数量
					for(j=0;j<this.nmlist[i].iItemCount;j++)
					{
						this.nmlist[i].ni[j].iItemId=pls.GetNextInt();//itemid;
						this.nmlist[i].ni[j].iProc=pls.GetNextInt();
					}
					this.nmlist[i].bDetailed=true;
					this.linktonpc();
					return;
				}
			}
		}
		else
		{
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{
				if(this.smlist[i].bUseing && this.smlist[i].iMid==mid)
				{
					this.smlist[i].iItemCount=pls.GetNextByte();
					for(j=0;j<this.smlist[i].iItemCount;j++)
					{
						this.smlist[i].si[j].iMType=pls.GetNextInt();
						this.smlist[i].si[j].iSType=pls.GetNextInt();
						this.smlist[i].si[j].iV1=pls.GetNextInt();
						this.smlist[i].si[j].iV2=pls.GetNextInt();
						this.smlist[i].si[j].iV3=pls.GetNextInt();
						this.smlist[i].si[j].iProc=pls.GetNextInt();
						this.smlist[i].si[j].sDetail=pls.GetNextString();
						
//						GmPlay.sop(""+this.smlist[i].si[j].iV1);
//						GmPlay.sop("this.smlist[i].si[j].iMType="+this.smlist[i].si[j].iMType+",this.smlist[i].si[j].iSType="+this.smlist[i].si[j].iSType+",this.smlist[i].si[j].sDetail"+this.smlist[i].si[j].sDetail);
					}
					this.smlist[i].bDetailed=true;
					this.linktonpc();
					return;
				}
			}
		}
		
	}
	cleanclientmission( pls)
	{
		var i;
		var mid=pls.GetNextInt();
		if(pls.GetNextByte()==1)MissionFinish.mf.Init();
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(this.smlist[i].bUseing && this.smlist[i].iMid==mid)
			{
				this.smlist[i].bUseing=false;
			}
			if(this.nmlist[i].bUseing && this.nmlist[i].iMid==mid)
			{
				this.nmlist[i].bUseing=false;
			}
		}
		MapManager.gi().vbk.ClearNpcFlag();
		this.linktonpc();
	}

	GetAiDest()
	{//获取寻路目标
		var i,j;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(this.smlist[i].bUseing && GmMe.me.iFlag[20]>0)
			{//VIP部分任务自动寻路
				for(j=0;j<this.smlist[i].iItemCount;j++)
				{
					if(this.smlist[i].si[j].iMType==0)
					{//任务目标
							switch(this.smlist[i].si[j].iSType)
							{
							case 1://找到npc  v1npcid
							case 5://与静态npc战斗
							case 7://找到静态npc，需要对话完成
							case 8://与静态npc战斗
								MyAI.gi().iDestNpcId=this.smlist[i].si[j].iV1;
								MyAI.gi().sDestDetail=this.smlist[i].si[j].sDetail;
								return true;
							}
					}
				}
			}
			if(this.nmlist[i].bUseing)
			{
				var pde=MyMission.MyMission.de_mission.fdata(this.nmlist[i].iMPoint);
				if(pde.intValue(5)!=-1)
				{//npc对话ID-------------------------------------
					MyAI.gi().iDestNpcId=pde.intValue(5);
					MyAI.gi().sDestDetail=pde.strValue(16);
					return true;
				}
				if(pde.intValue(9)!=-1)
				{//杀怪怪物ID
				}
				if(pde.intValue(8)!=-1)
				{//交物品IDxxx
				}
				if(pde.intValue(15)!=-1)
				{//战斗npcid-----------------------------------
					MyAI.gi().iDestNpcId=pde.intValue(15);
					MyAI.gi().sDestDetail=pde.strValue(24);
					return true;
				}
				if(pde.intValue(30)!=-1)
				{//抓宠物类型ID
				}
			}
		}
		return false;
	}
}
MyMission.de_mission;

MyMission.MAXMISSIONCOUNT=32;
MyMission.m=new MyMission();