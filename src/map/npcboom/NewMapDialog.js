

import GmPlay from "../../engtst/mgm/GmPlay"
import GmMe from "../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../engtst/mgm/gameing/me/goods/MyGoods"
import MyMission from "../../engtst/mgm/gameing/me/mission/MyMission"
import SpecialMission from "../../engtst/mgm/gameing/me/mission/missionstruct/SpecialMission"
import MyPets from "../../engtst/mgm/gameing/me/pet/MyPets"
import MapManager from "../../map/MapManager"
import VisualBlock from "../../map/VisualBlock"
import _VISUALBLOCK from "../../map/_VISUALBLOCK"
import BASESEQUENCE from "../../map/npcboomstruct/BASESEQUENCE"
import SE_BRANCH from "../../map/npcboomstruct/SE_BRANCH"
import SE_EVENT from "../../map/npcboomstruct/SE_EVENT"
import SE_HEAD from "../../map/npcboomstruct/SE_HEAD"
import SE_REQUIREMENT from "../../map/npcboomstruct/SE_REQUIREMENT"
import SE_SELECT from "../../map/npcboomstruct/SE_SELECT"

export default class NewMapDialog {
/*	SE_SELECT this.opendialog;
	SE_SELECT this.defaultdialog;
	
	int this.iCdCount;
	BASESEQUENCE this.cdlist;//可完成剧情列表
	
	int this.iSpCount;
    SE_EVENT this.splist;//可完成特殊任务列表
    
    	SE_HEAD this.phead;
	SE_BRANCH this.pbranch;
	SE_REQUIREMENT this.prequirement;
	SE_SELECT this.pselect;
	SE_EVENT this.pevent;
	*/
	constructor ()
	{
		this.opendialog=new SE_SELECT();
		this.opendialog.iType=4;
		
		this.cdlist=new BASESEQUENCE(32);
		this.splist=new SE_EVENT(32);
		for(var i=0;i<32;i++)this.splist[i]=new SE_EVENT();
	}
	

	  ProcBase_CheckOutDrama( be)
	{
		if(be==null)return;
		if(this.bBreakCheck)return;
		var i;
		GmPlay.sop("type="+be.iType);
		switch(be.iType)
		{
		case 1:
			this.phead=be;
			if(this.phead.next!=null)this.ProcBase_CheckOutDrama(this.phead.next);
			break;
		case 2://分支
			this.pbranch=be;
			for(i=0;i<this.pbranch.iCount;i++)
			{
				if(this.pbranch.next[i]!=null)
				{
					this.ProcBase_CheckOutDrama(this.pbranch.next[i]);
				}
			}
			break;
		case 3://条件，需要回调
			this.prequirement=be;
			if(this.prequirement.iRid==1)
			{//可处理的剧情任务，看自己任务列表中有没有
				i=parseInt(this.prequirement.sValues[0]);
				if(MyMission.m.bCheckDoing(i))
				{//有剧情，加入到可做事情列表
					this.opendialog.AddSelect("剧情："+MyMission.de_mission.strValue(i, 0, 19), this.prequirement.next);
					if(i==138)this.bBreakCheck=true;
				}
			}
			break;
		case 5://事件
			this.pevent=be;
//			for(i=0;i<10;i++)GmPlay.sop("eid"+this.pevent.iEid);
			VisualBlock.pvb.procmap.ProcEvent(this.pevent);
			break;
		}
	}
	ProcBase_CheckOutDefault( be)
	{
		if(be==null)return false;
		var i;
		switch(be.iType)
		{
		case 1:
			this.phead=be;
			if(this.phead.next!=null)return this.ProcBase_CheckOutDefault(this.phead.next);
			break;
		case 2://分支
			this.pbranch=be;
			for(i=0;i<this.pbranch.iCount;i++)
			{
				if(this.pbranch.next[i]!=null)
				{
					if(this.ProcBase_CheckOutDefault(this.pbranch.next[i]))return true;
				}
			}
			break;
		case 3://条件
			this.prequirement=be;
			if(this.prequirement.iRid==1)return false;
			if(VisualBlock.pvb.procmap.RequirementCheck(this.prequirement))
			{//满足条件，往下执行
				return this.ProcBase_CheckOutDefault(this.prequirement.next);
			}
			break;
		case 4://选择--默认
			this.pselect=be;
//			if(this.opendialog.iCount<=0)this.defaultdialog=this.pselect;
//			else
			{//有内容，添加到末尾
				this.opendialog.sHead=this.pselect.sHead;
				this.opendialog.sQuestion=this.pselect.sQuestion;
				if(this.bBreakCheck)return true;
//				GmPlay.sop1(""+this.pselect.sQuestion+",,,,,,,,"+this.pselect.iCount);
				for(i=0;i<this.pselect.iCount;i++)
				{
					if(GmMe.me.rbs.iLev>=40)
					{
						if(this.pselect.next[i]!=null && this.pselect.next[i].iType==5) 
						{
							this.pevent=this.pselect.next[i];
							if(this.pevent.iEid==4)
							{//领取门派任务，调整为自动师门和手动师门两个选项
								this.splist[this.iSpCount].iType=5;//事件
								this.splist[this.iSpCount].iEid=4;//师门任务
								this.splist[this.iSpCount].sValues[0]="22";
								this.opendialog.AddSelect("自动任务(得储备)", this.splist[this.iSpCount]);
								this.iSpCount++;
								
								this.opendialog.AddSelect("手动任务(得铜币)", this.pselect.next[i]);
								continue;
							}
						}
					}
					this.opendialog.AddSelect(this.pselect.sAnswers[i], this.pselect.next[i]);
				}
			}
			return true;
//			mapdialog.InitDialog(this.pselect);
//			break;
//		case 5://事件
//			this.pevent=(SE_EVENT)be;
//			VisualBlock.pvb.procmap.ProcEvent(this.pevent);
//			this.ProcBase_CheckOutDrama(this.pevent.next);
//			break;
		}
		return false;
	}
	CheckOutSpecialMission( npcid)
	{
		var i,j;
		var smlist=MyMission.m.smlist;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{//检测门派任务中的找人任务是否完成
			if(smlist[i].bUseing)
			{
//				GmPlay.sop("zzz="+i+",,,cc="+smlist[i].iItemCount);
				for(j=0;j<smlist[i].iItemCount;j++)
				{
//					GmPlay.sop("aaaaaaaaaaaaaaaaa"+smlist[i].si[j].iV2+"===="+npcid);
					if(smlist[i].si[j].iMType==0 && smlist[i].si[j].iSType==3 && smlist[i].si[j].iV2==npcid && smlist[i].si[j].iProc<100)
					{//完成条件，抓宠物
						if(MyPets.bHavePet(smlist[i].si[j].iV1, smlist[i].si[j].iV3))
						{
							this.splist[this.iSpCount].iType=5;//事件
							this.splist[this.iSpCount].iEid=11;//完成特殊任务
							this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
							this.opendialog.AddSelect("完成："+smlist[i].sName, this.splist[this.iSpCount]);
							this.iSpCount++;
//							GmPlay.sop("完成条件，抓宠物,finish 1,0");
//							GmProtocol.gi().s_FinishMission(1,smlist[i].iMPoint);
						}
					}
//					GmPlay.sop(","+smlist[i].si[j].iMType+","+smlist[i].si[j].iSType+","+smlist[i].si[j].iV1);
					if(smlist[i].si[j].iMType==0 && smlist[i].si[j].iSType==1 && smlist[i].si[j].iV1==npcid && smlist[i].si[j].iProc<100)
					{//完成条件，找npc
						this.splist[this.iSpCount].iType=5;//事件
						this.splist[this.iSpCount].iEid=11;//完成特殊任务
						this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
						this.opendialog.AddSelect("完成："+smlist[i].sName, this.splist[this.iSpCount]);
						this.iSpCount++;
//						GmPlay.sop("finish 1,0");
//						GmProtocol.gi().s_FinishMission(1,smlist[i].iMPoint);
						break;
					}
					if(smlist[i].si[j].iMType==0 && smlist[i].si[j].iSType==0 && (smlist[i].si[j].iV3==0 || smlist[i].si[j].iV3==npcid) && smlist[i].si[j].iProc<100)
					{//完成条件，交物品给npc 
						if(MyGoods.bHaveGoods(smlist[i].si[j].iV1, 1))
						{
							this.splist[this.iSpCount].iType=5;//事件
							this.splist[this.iSpCount].iEid=11;//完成特殊任务
							this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
							this.opendialog.AddSelect("完成："+smlist[i].sName, this.splist[this.iSpCount]);
							this.iSpCount++;
							//GmPlay.sop("aaaaaaaaaaaaaaaaa"+smlist[i].si[j].iV2+"===="+npcid);
//							GmProtocol.gi().s_FinishMission(1,smlist[i].iMPoint);
							break;
						}
					}
					if(smlist[i].si[j].iMType==0 && smlist[i].si[j].iSType==5 && smlist[i].si[j].iV1==npcid && smlist[i].si[j].iProc<100)
					{//完成条件，找npc
						this.splist[this.iSpCount].iType=5;//事件
						this.splist[this.iSpCount].iEid=11;//完成特殊任务
						this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
						this.opendialog.AddSelect("战斗："+smlist[i].sName, this.splist[this.iSpCount]);
						this.iSpCount++;
//						GmPlay.sop("finish 1,0");
//						GmProtocol.gi().s_FinishMission(1,smlist[i].iMPoint);
						break;
					}
					//GmPlay.sop("zzz"+ smlist[i].si[j].iV1+",,,,,,,,"+npcid);
					//GmPlay.sop("ttt"+ smlist[i].si[j].iV2+",,,,,,,,"+MapManager.gi().iVisualMapId);
					if(smlist[i].si[j].iMType==0 && smlist[i].si[j].iSType==15 && smlist[i].si[j].iV1==npcid && smlist[i].si[j].iV2==MapManager.gi().iVisualMapId && smlist[i].si[j].iProc<100)
					{
						this.splist[this.iSpCount].iType=5;//事件
						this.splist[this.iSpCount].iEid=11;//完成特殊任务
						this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
						this.opendialog.AddSelect("完成："+smlist[i].sName, this.splist[this.iSpCount]);
						this.iSpCount++;
						break;
					}
					if(smlist[i].si[j].iMType==0 && smlist[i].si[j].iSType==16 && smlist[i].si[j].iV1==npcid && smlist[i].si[j].iV2==MapManager.gi().iVisualMapId && smlist[i].si[j].iProc<100)
					{
						if(MyGoods.bHaveGoods(smlist[i].si[j].iV3, 1))
						{
							this.splist[this.iSpCount].iType=5;//事件
							this.splist[this.iSpCount].iEid=11;//完成特殊任务
							this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
							this.opendialog.AddSelect("完成："+smlist[i].sName, this.splist[this.iSpCount]);
							this.iSpCount++;
							//GmPlay.sop("aaaaaaaaaaaaaaaaa"+smlist[i].si[j].iV2+"===="+npcid);
//							GmProtocol.gi().s_FinishMission(1,smlist[i].iMPoint);
							break;
						}
//						this.splist[this.iSpCount].iType=5;//事件
//						this.splist[this.iSpCount].iEid=11;//完成特殊任务
//						this.splist[this.iSpCount].sValues[0]=""+smlist[i].iMPoint;
//						this.opendialog.AddSelect("完成："+smlist[i].sName, this.splist[this.iSpCount]);
//						this.iSpCount++;
//						break;
					}
				}
			}
		}
	}
	
//	GmMe.me.ChangeStat("站立");
//	SteeringWheel.sw.bLocked=false;
//	boolean this.bBreakCheck;
	Open( vb)
	{
		var j;
		
//			if(vb.pss[0]!=null)
//			{
//				GmPlay.sop("ttt="+vb.pss[0].iType);
//				if(vb.pss[0].iType==5)
//				{
//					VisualBlock.pvb.ProcBase(vb.pss[0]);
//					return;
//				}
//			}

		this.opendialog.iCount=0;
		this.opendialog.sQuestion="";
		this.defaultdialog=null;
		this.iCdCount=0;
		this.iSpCount=0;

		//1npc身上的剧情任务，看是否存在对应normalmission
		this.bBreakCheck=false;
		for(j=0;j<_VISUALBLOCK.MAXBASESEQUENCE;j++)
		{
			if(vb.pss[j]!=null)
			{
				this.ProcBase_CheckOutDrama(vb.pss[j]);
				if(this.bBreakCheck)break;
			}
		}
		//2身上specialmissioin，看是否指向npc
		if(vb.bCurrentBlock)this.CheckOutSpecialMission(vb.iNpcId);
		
		//3默认对话
		for(j=0;j<_VISUALBLOCK.MAXBASESEQUENCE;j++)
		{
			if(vb.pss[j]!=null)
			{
				GmPlay.sop("ggggggggggggggggggggg");
				if(this.ProcBase_CheckOutDefault(vb.pss[j]))break;
			}
		}
		
//		for(j=0;j<10;j++)GmPlay.sop(""+this.opendialog.iCount);
		if(this.defaultdialog!=null)
		{
//			this.opendialog.iCount=this.defaultdialog.iCount;
//			this.opendialog.sHead=this.defaultdialog.sHead;
//			this.opendialog.sQuestion=this.defaultdialog.sQuestion;
//			for(i=0;i<SE_SELECT.MAXSELECTCOUNT;i++)
//			{
//				if(GmMe.me.rbs.iLev>=40 && this.opendialog.next[i].iType==5)
//				{
//					this.pevent=(SE_EVENT)this.defaultdialog.next[i];
//					if(this.pevent.iEid==4)
//					{//领取门派任务，调整为自动师门和手动师门两个选项
//						this.splist[this.iSpCount].iType=5;//事件
//						this.splist[this.iSpCount].iEid=4;//师门任务
//						this.splist[this.iSpCount].sValues[0]="22";
//						this.opendialog.AddSelect("自动任务(得储备)", this.splist[this.iSpCount]);
//						this.iSpCount++;
//						
//						this.opendialog.AddSelect("手动任务(得铜币)", this.pselect.next[i]);
//						continue;
//					}
//				}
//				this.opendialog.sAnswers[i]=this.defaultdialog.sAnswers[i];
//				this.opendialog.next[i]=this.defaultdialog.next[i];
//			}
//			
			this.opendialog.copyfrom(this.defaultdialog);
		}

		if(!this.opendialog.sQuestion=="")
		{
			if(this.opendialog.sQuestion.charAt(0)!='@')
			{
				if(vb.bCurrentBlock)
				{//本地npc
					this.opendialog.sQuestion="@1n"+parseInt(vb.iNpcId/100)+(parseInt(vb.iNpcId/10)%10)+(vb.iNpcId%10)+"t"+this.opendialog.sQuestion;
				}
			}
			VisualBlock.pvb.mapdialog.InitDialog(this.opendialog,vb.sNpcName);
		}
	}
}
