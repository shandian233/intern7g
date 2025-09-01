import XDefine from "../config/XDefine"
import SE_EVENT from "../map/npcboomstruct/SE_EVENT"
import SE_REQUIREMENT from "../map/npcboomstruct/SE_REQUIREMENT"
import GmPlay from "../engtst/mgm/GmPlay"
import GmProtocol from "../engtst/mgm/GmProtocol"
import XStat from "../engtst/mgm/XStat"
import InNumber from "../engtst/mgm/frame/InNumber"
import EasyMessage from "../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../engtst/mgm/frame/message/FrameMessage"
import RepairEquip from "../engtst/mgm/gameing/equip/RepairEquip"
import CreateFT from "../engtst/mgm/gameing/fteam/CreateFT"
import MyFT from "../engtst/mgm/gameing/fteam/MyFT"
import MyFuBen from "../engtst/mgm/gameing/fuben/MyFuBen"
import ApplyGovFight from "../engtst/mgm/gameing/gov/ApplyGovFight"
import MyGov from "../engtst/mgm/gameing/gov/MyGov"
import RemedyMerge from "../engtst/mgm/gameing/gov/ext/RemedyMerge"
import GetInGov from "../engtst/mgm/gameing/gov/ext/apply/GetInGov"
import NewGovManage from "../engtst/mgm/gameing/gov/ext/manage/NewGovManage"
import EntrustMission from "../engtst/mgm/gameing/gov/ext/mission/EntrustMission"
import GovFBTarget from "../engtst/mgm/gameing/gov/fuben/GovFBTarget"
import SelectNewPet from "../engtst/mgm/gameing/help/SelectNewPet"
import SelectSchool from "../engtst/mgm/gameing/help/SelectSchool"
import GmMe from "../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../engtst/mgm/gameing/me/goods/MyGoods"
import MyMission from "../engtst/mgm/gameing/me/mission/MyMission"
import SelectGoodsForMission from "../engtst/mgm/gameing/me/mission/SelectGoodsForMission"
import ApprovePet from "../engtst/mgm/gameing/me/pet/fuse/ApprovePet"
import FusePet from "../engtst/mgm/gameing/me/pet/fuse/FusePet"
import JJPet from "../engtst/mgm/gameing/me/pet/jj/JJPet"
import MergeZR from "../engtst/mgm/gameing/me/pet/jj/MergeZR"
import shop_BuyDrawing from "../engtst/mgm/gameing/me/shop/shop_BuyDrawing"
import CreateShop from "../engtst/mgm/gameing/me/shop/business/CreateShop"
import MyTeam from "../engtst/mgm/gameing/me/team/MyTeam"
import ChangeColor from "../engtst/mgm/gameing/system/ChangeColor"
import GetCodeReward from "../engtst/mgm/gameing/system/GetCodeReward"

import MapManager from "./MapManager"
import VisualBlock from "./VisualBlock"

export default class ProcMap {

	
	constructor()
	{
		this.bMapChanged=false;
	}
	RequirementCheck( prequirement)
	{//检查是否满足条件
		var i,j,k;
		switch(prequirement.iRid)
		{
		case 0://所在门派ID
			//prequirement.sValue[0]:0无，1剑侠居
			i=parseInt(prequirement.sValues[0]);
			if(GmMe.me.rbs.iSchoolId==i)return true;
			break;
		case 1://正在进行任务
			//prequirement.sValues[0]:任务ID
			if(MyMission.m.bCheckDoing(parseInt(prequirement.sValues[0])))return true;
			break;
		case 2://是否组队中
			//prequirement.sValues[0]:0要求没组队
			if(parseInt(prequirement.sValues[0])==0)
			{//要求没组队
				if(MyTeam.bNoTeam())return true;
			}
			else
			{//要求组队中
				if(MyTeam.bInTeam())
				{
					//要求队伍中人数parseInt(prequirement.sValues[1])
					return true;
				}
				else
				{
					EasyMessage.easymsg.AddMessage("请组队后再来");
					return false;
				}
			}
			break;
		case 3://等级限制
			//prequirement.sValues[0]:必须>=?级
			//prequirement.sValues[1]:必须<=?级
			if(GmMe.me.rbs.iLev>=parseInt(prequirement.sValues[0]) &&
					GmMe.me.rbs.iLev<=parseInt(prequirement.sValues[1]))return true;
			break;
		case 4://是否已加入帮派
			//prequirement.sValues[0]:0未加入帮派，1已加入帮派
			if(parseInt(prequirement.sValues[0])==0)
			{//要求未加入帮派
//				GmPlay.sop("GmMe.me.rbs.iGovId="+MyGov.mg.iRealGid);
				if(MyGov.mg.iRealGid<=0)return true;
			}
			else
			{//要求已经加入帮派
				if(MyGov.mg.iRealGid>0)return true;
			}
			break;
		case 5://是否在自己帮派中
			//prequirement.sValues[0]:0否，1是
			if(parseInt(prequirement.sValues[0])==1)
			{
				GmPlay.sop(""+MapManager.gi().mapdata.sMapDetail);
				GmPlay.sop(""+MyGov.mg.sName);
				if(MapManager.gi().mapdata.sMapDetail==MyGov.mg.sName)return true;
				else return false;
			}
			if(parseInt(prequirement.sValues[0])==0)
			{
				if(MapManager.gi().mapdata.sMapDetail==MyGov.mg.sName)return false;
				else return true;				
			}
			break;
		case 6://正在进行特殊任务
			//prequirement.sValues[0]:任务ID
			j=parseInt(prequirement.sValues[0]);
			GmPlay.sop("check special "+j);
			if(MyMission.m.bCheckSpecialDoing(j))return true;
			break;
		case 7://当前副本状态
//			GmPlay.sop1("MyFuBen.iFbType="+MyFuBen.iFbType);
//			GmPlay.sop1("parseInt(prequirement.sValues[0])="+parseInt(prequirement.sValues[0]));
//			GmPlay.sop1("MyFuBen.iFbProc="+MyFuBen.iFbProc);
			if(MyFuBen.iFbType==parseInt(prequirement.sValues[0]))
			{
				i=parseInt(prequirement.sValues[1]);
	//			GmPlay.sop(MyFuBen.iFbProc+"<"+i);
				if(i!=0 && MyFuBen.iFbProc<i)return true;
				i=parseInt(prequirement.sValues[2]);
		//		GmPlay.sop(MyFuBen.iFbProc+"="+i);
				if(i!=0 && MyFuBen.iFbProc==i)return true;
				i=parseInt(prequirement.sValues[3]);
	//			GmPlay.sop(MyFuBen.iFbProc+">"+i);
				if(i!=0 && MyFuBen.iFbProc>i)return true;
			}
			break;
		case 8://是否在本帮阵营条件
			if(parseInt(prequirement.sValues[0])==1)
			{//要求在本帮阵营
//				GmPlay.sop1("==="+MapManager.gi().mapdata.sMapName+"+++++"+MyGov.mg.sName);
				if(MapManager.gi().mapdata.sMapDetail==MyGov.mg.sName)return true;
			}
			break;
		case 9://是否已加入战队
			i=parseInt(prequirement.sValues[0]);
			if(i==0)
			{//要求未加入战队
//				GmPlay.sop("GmMe.me.rbs.iGovId="+MyGov.mg.iRealGid);
				if(MyFT.mft.iFTid<=0)return true;
			}
			else if(i==1)
			{
				if(MyFT.mft.iFTid>0)return true;
			}
			else if(i==2)
			{//要求已经加入战队
				if(MyFT.mft.iFTid>0 && MyFT.mft.iFTJob<=1)return true;
			}
			break;
		case 10://拥有物品
			j=parseInt(prequirement.sValues[0]);//物品id
			k=parseInt(prequirement.sValues[1]);//物品数量
			for(i=0;i<20;i++)
			{
				if(MyGoods.gi().goods[2][i].iGid>0)
				{
					if(MyGoods.gi().goods[2][i].iTid==j && MyGoods.gi().goods[2][i].iCount>=k)return true;
				}
			}
			break;
		case 11://要求在任务帮
			//prequirement.sValues[0]:帮派动态ID与任务相同
			return MyMission.m.bCheckInMissionMap(parseInt(prequirement.sValues[0]));
		case 12://正在进行特殊任务
			//prequirement.sValues[0]:mpoint=
			if(VisualBlock.talkingnpc!=null &&
					VisualBlock.talkingnpc.bCurrentBlock &&
					VisualBlock.talkingnpc.iNpcId==parseInt(prequirement.sValues[0]))
					return true;
			break;
		case 13://帮派副本状态检测
			i=parseInt(prequirement.sValues[0]);
			GmPlay.sop(""+GovFBTarget.iPlanId+"=================="+i);
			if(GovFBTarget.iPlanId==i)return true;
			break;
		case 14://随机条件
			i=parseInt(prequirement.sValues[0]);
			if(XDefine.GetRand(0, 100)<i)return true;
			break;
		case 15://特殊-赠送坐骑
			if(GmMe.me.rbs.iLev>=30 && (GmMe.me.iFlag[39]&8)==0)return true;
			break;
		}
		return false;
	}
	ProcEvent( pevent)
	{//触发事件
		var i,j;
		var npcid,order;
		var type,dest;
		switch(pevent.iEid)
		{
		case 0://地图传送
			//(string)pevent.sValue[0]:传送目标地图名称1
			//pevent.sValue[1]:传送目标坐标X
			//pevent.sValue[2]:传送目标坐标Y
			var did=MapManager.gi().NameToId(pevent.sValues[0]);
			var x=parseInt(pevent.sValues[1]);
			var y=parseInt(pevent.sValues[2]);
			if(MapManager.gi().iCurrentMapId==1 && GmMe.me.rbs.iLev<10)
			{
				if(MyGoods.gi().goods[1][2].iGid<=0)
				{
					FrameMessage.fm.Open("郊外比较危险，先带上武器再去吧（打开背包穿戴装备）");
					break;
				}
			}
			GmPlay.sop("go to "+did+","+pevent.sValues[0]);
			GmProtocol.gi().s_ChangeMap(did,x,y);
			break;
		case 1://拜入门派
			//pevent.sValue[0]:1剑侠居
			i=parseInt(pevent.sValues[0]);
			if(i>=1 && i<=9)
			{
//				j=(i-1)/3;
//				if(j!=GmMe.me.iRace)EasyMessage.easymsg.AddMessage("种族不对口");
//				else
				{
					GmProtocol.gi().s_GetInSchool(i);
//					GmMe.me.rbs.iSchoolId=i;
				}
			}
			break;
		case 2://打开学习技能界面
			XStat.gi().PushStat(XStat.GS_LEARNSKILL);
//			GmPlay.sop("zzzzzzzzzzzzz");
			break;
		case 3://领取任务
			i=parseInt(pevent.sValues[0]);
			j=parseInt(pevent.sValues[1]);
			GmProtocol.gi().s_GetMission(i,j);
			break;
		case 4://领取门派任务 
			//pevent.sValues[0]:门派ID
			GmProtocol.gi().s_GetSchoolMission(parseInt(pevent.sValues[0]));
			break;
		case 5://打开NPC商店
			//pevent.sValues[0]:NPC商店ID
			i=parseInt(pevent.sValues[0]);
			if(i==500)
			{//回收，出售装备
				XStat.gi().PushStat(XStat.GS_MYRECOVER);
			}
			else GmProtocol.gi().s_NpcShop(i);
			break;
		case 6://完成剧情任务
			//pevent.sValues[0]:完成任务ID
			GmProtocol.gi().s_FinishMission(0,parseInt(pevent.sValues[0]),0,0);
			break;
		case 7://打开创建帮派页面
			XStat.gi().PushStat(XStat.GS_CREATEGOV);
			break;
		case 8://帮派操作
			//pevent.sValues[0]:0申请入帮，1回帮
			switch(parseInt(pevent.sValues[0]))
			{
			case 0://申请入帮，发送消息，获取帮派列表
				GmProtocol.gi().s_NewGovOperate(0,0,0,0,0,"");//进入等待loading，以免重复获取列表
				GmProtocol.gi().s_NewGovOperate(2,0,0,0,0,"");
				break;
			case 1://回帮
				GmProtocol.gi().s_GetIntoGov(MyGov.mg.iRealGid);
				break;
			case 2://打开学技能页面
				GmProtocol.gi().s_GovOperateFrame(0);
				break;
			case 3://打开修炼页面
				GmProtocol.gi().s_GovOperateFrame(1);
				break;
			case 4://打开宠修页面
				GmProtocol.gi().s_getflag();
				XStat.gi().PushStat(XStat.GS_PETXIU);
				break;
			case 5://打开报名界面
				//判断是否帮主/副帮主
				if(MyGov.mg.iRealGid>0 && MyGov.mg.iJob<=1)
				{
					ApplyGovFight.Open();
				}
				else
				{
					EasyMessage.easymsg.AddMessage("帮主/副帮主才能报名");
				}
				break;
			case 6://打开改名页面
				XStat.gi().PushStat(XStat.GS_CHANGENAME);
				break;
			case 7://打开输入玩家id页面，进入对方家里
				InNumber.start(InNumber.IN_RID, "输入人物ID", 0, 99999999);
				break;
			case 8://打开创建战队页面
				CreateFT.Open();
				break;
			case 9://打开战队排行
				GmProtocol.gi().s_FTChallenge(0, 100000,0);
				break;
			case 10://打开新建商会页面
				EasyMessage.easymsg.AddMessage("系统暂未开放");
				//CreateShop.Open();
				break;
			case 11://打开宠物进阶页面
				JJPet.Open();
				break;
			case 12://融合自然之力
				MergeZR.Open();
				break;
			case 13://炼妖
//				EasyMessage.easymsg.AddMessage("系统暂未开放");
				FusePet.Open();
				break;
			case 14://打开染色界面
//				EasyMessage.easymsg.AddMessage("系统暂未开放");
				ChangeColor.Open();
				break;
			case 15://新手选门派页面
				SelectSchool.Open();
				break;
			case 16://认证
				ApprovePet.Open();
				break;
			case 17://去其他帮逛逛
				GetInGov.Open();
				break;
			case 18://委托任务
				EntrustMission.Open();
				break;
			case 19://帮派管理
				NewGovManage.Open();
				break;
			case 20://打开帮派药房买东西
				GmProtocol.gi().s_NewGovOperate(20,0,0,0,0,"");
				break;
			case 21://丹方合并
				RemedyMerge.Open();
				break;
			case 22://打开商会商店
				GmProtocol.gi().s_NewGovOperate(20,1,0,0,0,"");
				break;
			case 23://雇佣商人界面
				GmProtocol.gi().s_NewGovOperate(21,0,1,0,0,"");
				break;
			case 24://雇佣工人界面
				GmProtocol.gi().s_NewGovOperate(21,0,0,0,0,"");
				break;
			case 25://开启帮派副本
				GmProtocol.gi().s_NewGovOperate(23, 0, 0, 0,0,"");
				break;
			case 26://进入帮派副本
				GmProtocol.gi().s_NewGovOperate(24, 0, 0, 0,0,"");
				break;
			case 27://打开新手选宠页面
				SelectNewPet.Open();
				break;
			case 28://购买图纸
				i=GmMe.me.rbs.iLev/10;
				if(i<3)i=3;
				if(i>8)i=8;
				shop_BuyDrawing.GetPage(i);
				break;
			case 29://装备修理界面
				RepairEquip.Open(-1, 0);
				break;
			}
			break;
		case 9://雇佣帮派工人
			//pevent.sValues[0]:0建筑工人,1商人
			//pevent.sValues[1]:工人等级
			//pevent.sValues[2]:工作时间
			GmProtocol.gi().s_HireWorker(parseInt(pevent.sValues[0]), parseInt(pevent.sValues[1]), parseInt(pevent.sValues[2]));
			break;
		case 10://装备操作
			//pevent.sValues[0]:0制造,1镶嵌,2强化
			switch(parseInt(pevent.sValues[0]))
			{
			case 0://打开制造页面
				XStat.gi().PushStat(XStat.GS_MAKEEQUIP);
				break;
			case 1://打开镶嵌页面
				XStat.gi().PushStat(XStat.GS_CAMEOOPERATE);
				break;
			case 2://打开强化页面
				XStat.gi().PushStat(XStat.GS_IMPROVEEQUIP);
				break;
			case 3://学习手艺界面
				break;
			}
			break;
		case 11://完成特殊任务
			i=parseInt(pevent.sValues[0]);
			if(SelectGoodsForMission.Open(i))
			{//打开交物品框
			}
			else GmProtocol.gi().s_FinishMission(1,i,0,0);//直接完成
			break;
		case 12://打开仓库
			//pevent.sValues[0]:0物品仓库,1宠物仓库
			switch(parseInt(pevent.sValues[0]))
			{
			case 0:
				XStat.gi().PushStat(XStat.GS_GOODSSTOREFROME);
				XStat.gi().PushStat(XStat.GS_LOADING1);
				GmProtocol.gi().s_OpenStore(0, 0,0);
				break;
			case 1:
//				XStat.gi().PushStat(XStat.GS_GOODSSTOREFROME);
//				XStat.gi().PushStat(XStat.GS_LOADING1);
				GmProtocol.gi().s_OpenStore(1, 0,0);
				break;
			}
			break;
		case 13://服务器事件
			//pevent.sValues[0]:主类型
			//pevent.sValues[1]:子类型
			//pevent.sValues[2]:参数1
			//pevent.sValues[3]:参数2
			//pevent.sValues[4]:参数3
			GmProtocol.gi().s_SeverEvent(parseInt(pevent.sValues[0]), //mtype
					parseInt(pevent.sValues[1]), //stype
					parseInt(pevent.sValues[2]), 
					parseInt(pevent.sValues[3]), 
					parseInt(pevent.sValues[4]));
			break;
		case 14://特殊传送
			if(MapManager.gi().iCurrentMapId==1 && GmMe.me.rbs.iLev<10)
			{
				if(MyGoods.gi().goods[1][2].iGid<=0)
				{
					FrameMessage.fm.Open("郊外比较危险，先带上武器再去吧（打开背包穿戴装备）");
					break;
				}
			}
			type=parseInt(pevent.sValues[0]);
			dest=parseInt(pevent.sValues[1]);
			GmProtocol.gi().s_ChangeMapNew(type,dest);
			break;
		case 15://礼品官领取
			type=parseInt(pevent.sValues[0]);
			if(type==0)
			{//打开签到页面
				GmProtocol.gi().s_GetCodeReward(2,"");
			}
			else if(type==1)
			{//打开兑换码页面
				GetCodeReward.Open();
			}
			else if(type==2)
			{//我是冲级达人
				GmProtocol.gi().s_GetCodeReward(4,"");
			}
			break;
		case 16://副本操作
			GmProtocol.gi().s_FuBen(parseInt(pevent.sValues[0]),parseInt(pevent.sValues[1]));
			break;
		case 20://npc事件
			GmProtocol.gi().s_NpcCmd(pevent.sValues[0],pevent.sValues[1],pevent.sValues[2],pevent.sValues[3],
					pevent.sValues[4],pevent.sValues[5],pevent.sValues[6],pevent.sValues[7]);
			break;
		case 21:
			GmProtocol.gi().s_ExtendCmd(pevent.sValues[0],pevent.sValues[1],pevent.sValues[2],pevent.sValues[3],
					pevent.sValues[4],pevent.sValues[5],pevent.sValues[6],pevent.sValues[7]);
			break;
		case ProcMap.NPCREPLY_ANSWER:
		case ProcMap.NPCREPLY_QIANGDAO:
		case ProcMap.NPCREPLY_SHANZEI:
		case 103:
		case 104:
		case 105:
		case 106:
		case 107:
		case 108:
		case 109:
		case 110:
		case 111:
		case 112:
		case 113:
		case 114:
		case 115:
		case 116:
		case 117:
		case 118:
		case 119:
		case 120:
			if(VisualBlock.talkingnpc==null)break;
			if(VisualBlock.talkingnpc.bCurrentBlock)break;
			npcid=parseInt(pevent.sValues[0]);
			order=parseInt(pevent.sValues[1]);
			if(npcid!=VisualBlock.talkingnpc.iNpcId)break;
			GmProtocol.gi().s_NpcReply(npcid,VisualBlock.talkingnpc.iSid, order);
			break;
		default:
			if(pevent.iEid>=100)
			{
				if(VisualBlock.talkingnpc==null)break;
				if(VisualBlock.talkingnpc.bCurrentBlock)break;
				npcid=parseInt(pevent.sValues[0]);
				order=parseInt(pevent.sValues[1]);
				if(npcid!=VisualBlock.talkingnpc.iNpcId)break;
				GmProtocol.gi().s_NpcReply(npcid,VisualBlock.talkingnpc.iSid, order);
			}
			break;
		}
		return false;
	}
}

ProcMap.NPCREPLY_ANSWER=100;
ProcMap.NPCREPLY_QIANGDAO=101;
ProcMap.NPCREPLY_SHANZEI=102;
