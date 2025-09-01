import BaseClass from "../../engine/BaseClass"

import GameVersion from "../../zero/Interface/GameVersion"
import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"
import SmallMap from "../../map/SmallMap"
import WorldMap from "../../map/WorldMap"
import FastGetin_uc from "../../mgm/mainmenu/FastGetin_uc"
import Logo from "../../mgm/mainmenu/Logo"
import MainMenu from "../../mgm/mainmenu/MainMenu"
import CreateRole from "../../mgm/newmainmenu/CreateRole"
import LeadPage from "../../mgm/newmainmenu/LeadPage"
import SelectRole from "../../mgm/newmainmenu/SelectRole"
import SelectSever from "../../mgm/newmainmenu/SelectSever"
import StartGame from "../../mgm/newmainmenu/StartGame"
import FastGetin_local from "../../mgm/newmainmenu/local/FastGetin_local"
import Login_local from "../../mgm/newmainmenu/local/Login_local"
import Regist_local from "../../mgm/newmainmenu/local/Regist_local"
//import engine.BaseClass;
import TouchManager from "../../engine/TouchManager"
import XAnima from "../../engine/graphics/XAnima"
import Confirm1 from "../../engtst/mgm/frame/Confirm1"
import ExitConfirm from "../../engtst/mgm/frame/ExitConfirm"
import InNumber from "../../engtst/mgm/frame/InNumber"
import KickOut from "../../engtst/mgm/frame/KickOut"
import Loading1 from "../../engtst/mgm/frame/Loading1"
import Loading2 from "../../engtst/mgm/frame/Loading2"
import Message1 from "../../engtst/mgm/frame/Message1"
import SevConfirm from "../../engtst/mgm/frame/SevConfirm"
import PromptMessage from "../../engtst/mgm/frame/message/PromptMessage"
import Gameing from "../../engtst/mgm/gameing/Gameing"
import PeakFight from "../../engtst/mgm/gameing/act/PeakFight"
import AQDoing from "../../engtst/mgm/gameing/afternoonquestion/AQDoing"
import AQStart from "../../engtst/mgm/gameing/afternoonquestion/AQStart"
import SelectGoods from "../../engtst/mgm/gameing/chat/SelectGoods"
import SelectPet from "../../engtst/mgm/gameing/chat/SelectPet"
import FriendTeam from "../../engtst/mgm/gameing/chat/privatechat/FriendTeam"
import PrivateChat_Send from "../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import PrivateChatRecord from "../../engtst/mgm/gameing/chat/privatechat/PrivateChatRecord"
import PublicChat_BigFrame from "../../engtst/mgm/gameing/chat/publicchat/PublicChat_BigFrame"
import PublicChat_Send from "../../engtst/mgm/gameing/chat/publicchat/PublicChat_Send"
import SetChatValue from "../../engtst/mgm/gameing/chat/publicchat/SetChatValue"
import CameoOperate from "../../engtst/mgm/gameing/equip/CameoOperate"
import ImproveEquip from "../../engtst/mgm/gameing/equip/ImproveEquip"
import MakeEquip from "../../engtst/mgm/gameing/equip/MakeEquip"
import RepairEquip from "../../engtst/mgm/gameing/equip/RepairEquip"
import FastOperate from "../../engtst/mgm/gameing/fast/FastOperate"
import FindFriend from "../../engtst/mgm/gameing/fast/FindFriend"
import IngotMall from "../../engtst/mgm/gameing/fast/IngotMall"
import LianDanShu from "../../engtst/mgm/gameing/fast/LianDanShu"
import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate"
import WatchOn from "../../engtst/mgm/gameing/fast/WatchOn"
import DiePrompt from "../../engtst/mgm/gameing/fight/DiePrompt"
import CreateFT from "../../engtst/mgm/gameing/fteam/CreateFT"
import FTChallenge from "../../engtst/mgm/gameing/fteam/FTChallenge"
import FTRank from "../../engtst/mgm/gameing/fteam/FTRank"
import FTFrame from "../../engtst/mgm/gameing/fteam/manage/FTFrame"
import FTGetOut from "../../engtst/mgm/gameing/fteam/manage/FTGetOut"
import FTMiJing from "../../engtst/mgm/gameing/fteam/manage/FTMiJing"
import FTPutIn from "../../engtst/mgm/gameing/fteam/manage/FTPutIn"
import FTAgree from "../../engtst/mgm/gameing/fteam/member/FTAgree"
import FTApply from "../../engtst/mgm/gameing/fteam/member/FTApply"
import FTMember from "../../engtst/mgm/gameing/fteam/member/FTMember"
import ApplyFuBen from "../../engtst/mgm/gameing/fuben/ApplyFuBen"
import CreateFuBen from "../../engtst/mgm/gameing/fuben/CreateFuBen"
import FubenMall from "../../engtst/mgm/gameing/fuben/FubenMall"
import ManageFuBen from "../../engtst/mgm/gameing/fuben/ManageFuBen"
import ApplyGovFight from "../../engtst/mgm/gameing/gov/ApplyGovFight"
import CreateGov from "../../engtst/mgm/gameing/gov/CreateGov"
import ExtLearnSkill from "../../engtst/mgm/gameing/gov/ExtLearnSkill"
import GovFrame from "../../engtst/mgm/gameing/gov/GovFrame"
import GovXiu from "../../engtst/mgm/gameing/gov/GovXiu"
import LearnGovSkill from "../../engtst/mgm/gameing/gov/LearnGovSkill"
import MemberDetail from "../../engtst/mgm/gameing/gov/MemberDetail"
import PetXiu from "../../engtst/mgm/gameing/gov/PetXiu"
import ApplyForGov from "../../engtst/mgm/gameing/gov/ext/apply/ApplyForGov"
import GetInGov from "../../engtst/mgm/gameing/gov/ext/apply/GetInGov"
import ConfirmApply from "../../engtst/mgm/gameing/gov/ext/base/ConfirmApply"
import Gov_SetDetail from "../../engtst/mgm/gameing/gov/ext/base/Gov_SetDetail"
import MemberOperate from "../../engtst/mgm/gameing/gov/ext/base/MemberOperate"
import NewGovFrame from "../../engtst/mgm/gameing/gov/ext/base/NewGovFrame"
import SetGovPower from "../../engtst/mgm/gameing/gov/ext/base/SetGovPower"
import Gov_SetBuilding from "../../engtst/mgm/gameing/gov/ext/manage/Gov_SetBuilding"
import Gov_SetHostility from "../../engtst/mgm/gameing/gov/ext/manage/Gov_SetHostility"
import Gov_SetMtLev from "../../engtst/mgm/gameing/gov/ext/manage/Gov_SetMtLev"
import Gov_SetName from "../../engtst/mgm/gameing/gov/ext/manage/Gov_SetName"
import Gov_SetResearch from "../../engtst/mgm/gameing/gov/ext/manage/Gov_SetResearch"
import NewGovManage from "../../engtst/mgm/gameing/gov/ext/manage/NewGovManage"
import EntrustMission from "../../engtst/mgm/gameing/gov/ext/mission/EntrustMission"
import HireTraderWorker from "../../engtst/mgm/gameing/gov/ext/HireTraderWorker"
import NewShop from "../../engtst/mgm/gameing/gov/ext/NewShop"
import RemedyMerge from "../../engtst/mgm/gameing/gov/ext/RemedyMerge"
import ReleaseGovMission from "../../engtst/mgm/gameing/gov/ext/mission/ReleaseGovMission"
import GovFBTarget from "../../engtst/mgm/gameing/gov/fuben/GovFBTarget"
import DayAttend from "../../engtst/mgm/gameing/help/DayAttend"
import MainHelp from "../../engtst/mgm/gameing/help/MainHelp"
import MySelect from "../../engtst/mgm/gameing/help/MySelect"
import SelectNewPet from "../../engtst/mgm/gameing/help/SelectNewPet"
import SelectSchool from "../../engtst/mgm/gameing/help/SelectSchool"
import ExtHelp from "../../engtst/mgm/gameing/help/ExtHelp/ExtHelp"
import LeaderBoardFrame from "../../engtst/mgm/gameing/help/TopIcon/LeaderBoard_/LeaderBoardFrame"
import LeaderBoardRole from "../../engtst/mgm/gameing/help/TopIcon/LeaderBoard_/LeaderBoardRole"
import NewActivity from "../../engtst/mgm/gameing/help/ang/NewActivity"
import PromptActivity from "../../engtst/mgm/gameing/help/ang/PromptActivity"
import ShowActivityDetail from "../../engtst/mgm/gameing/help/ang/ShowActivityDetail"
import WeeklyActivity from "../../engtst/mgm/gameing/help/ang/WeeklyActivity"
import NoviceCheckAnswer from "../../engtst/mgm/gameing/help/novice/NoviceCheckAnswer"
import NoviceHelp from "../../engtst/mgm/gameing/help/novice/NoviceHelp"
import NoviceQuestionList from "../../engtst/mgm/gameing/help/novice/NoviceQuestionList"
import Send_AceAnswer from "../../engtst/mgm/gameing/help/novice/Send_AceAnswer"
import Send_NoviceAsk from "../../engtst/mgm/gameing/help/novice/Send_NoviceAsk"
import AddPoint from "../../engtst/mgm/gameing/me/AddPoint"
import ChangeName from "../../engtst/mgm/gameing/me/ChangeName"
import MyAttFrame from "../../engtst/mgm/gameing/me/MyAttFrame"
import SetTitle from "../../engtst/mgm/gameing/me/SetTitle"
import ExchangeMoney from "../../engtst/mgm/gameing/me/goods/ExchangeMoney"
import GiveGoods from "../../engtst/mgm/gameing/me/goods/GiveGoods"
import GoodsDraw from "../../engtst/mgm/gameing/me/goods/GoodsDraw"
import LockFrame from "../../engtst/mgm/gameing/me/goods/LockFrame"
import LockOpen from "../../engtst/mgm/gameing/me/goods/LockOpen"
import LockSet from "../../engtst/mgm/gameing/me/goods/LockSet"
import MyGoodsFrame from "../../engtst/mgm/gameing/me/goods/MyGoodsFrame"
import SmallSpeaker from "../../engtst/mgm/gameing/me/goods/SmallSpeaker"
import LandFrame from "../../engtst/mgm/gameing/me/land/LandFrame"
import PlantFrame from "../../engtst/mgm/gameing/me/land/PlantFrame"
import SelectLS from "../../engtst/mgm/gameing/me/land/SelectLS"
import MissionFrame from "../../engtst/mgm/gameing/me/mission/MissionFrame"
import SelectGoodsForMission from "../../engtst/mgm/gameing/me/mission/SelectGoodsForMission"
import FeedMounts from "../../engtst/mgm/gameing/me/mounts/FeedMounts"
import MountsFrame from "../../engtst/mgm/gameing/me/mounts/MountsFrame"
import LearnPetSkill from "../../engtst/mgm/gameing/me/pet/LearnPetSkill"
import PetEat from "../../engtst/mgm/gameing/me/pet/PetEat"
import PetsFrame from "../../engtst/mgm/gameing/me/pet/PetsFrame"
import WashPet from "../../engtst/mgm/gameing/me/pet/WashPet"
import ApprovePet from "../../engtst/mgm/gameing/me/pet/fuse/ApprovePet"
import FusePet from "../../engtst/mgm/gameing/me/pet/fuse/FusePet"
import SelectMyPet from "../../engtst/mgm/gameing/me/pet/fuse/SelectMyPet"
import JJPet from "../../engtst/mgm/gameing/me/pet/jj/JJPet"
import MergeZR from "../../engtst/mgm/gameing/me/pet/jj/MergeZR"
import BackToSchool from "../../engtst/mgm/gameing/me/school/BackToSchool"
import LearnSkill from "../../engtst/mgm/gameing/me/school/LearnSkill"
import MyRecover from "../../engtst/mgm/gameing/me/shop/MyRecover"
import ShelvesFrame from "../../engtst/mgm/gameing/me/shop/ShelvesFrame"
import NpcShopFrame from "../../engtst/mgm/gameing/me/shop/NpcShopFrame"
import shop_BuyDrawing from "../../engtst/mgm/gameing/me/shop/shop_BuyDrawing"
import shop_PeakFight from "../../engtst/mgm/gameing/me/shop/shop_PeakFight"
import CreateShop from "../../engtst/mgm/gameing/me/shop/business/CreateShop"
import TeamCreate from "../../engtst/mgm/gameing/me/team/TeamCreate"
import TeamDest from "../../engtst/mgm/gameing/me/team/TeamDest"
import TeamOperate from "../../engtst/mgm/gameing/me/team/TeamOperate"
import TeamZhen from "../../engtst/mgm/gameing/me/team/TeamZhen"
import GoodsStoreFrame from "../../engtst/mgm/gameing/me/trade/GoodsStoreFrame"
import MyTrade from "../../engtst/mgm/gameing/me/trade/MyTrade"
import MyTradeFrame from "../../engtst/mgm/gameing/me/trade/MyTradeFrame"
import PetStoreFrame from "../../engtst/mgm/gameing/me/trade/PetStoreFrame"
import ChangeColor from "../../engtst/mgm/gameing/system/ChangeColor"
import GetCodeReward from "../../engtst/mgm/gameing/system/GetCodeReward"
import Tetris from "../../engtst/mgm/gameing/system/Tetris"
import GmPlay from "./GmPlay"
import GmProtocol from "./GmProtocol"

export default class XStat {


    constructor()
    {
        this.MAXSTACKSIZE = 32;
        this.iXStat=-1;
         this.iStatStack = new Int32Array(this.MAXSTACKSIZE);
         this.iPointStack = new Int32Array(this.MAXSTACKSIZE);
         this.iPageStack = new Int32Array(this.MAXSTACKSIZE);
         this.objstack = new Array(this.MAXSTACKSIZE);
        this.oCurrentView=null;
        this.oPreviousView=null;
        this.iStatPoint=0;
        this.iPoint=0;
        this.iPage=0;

		for (var i = 0; i < this.MAXSTACKSIZE; i++)this.objstack[i] = null;
		this.ResetStat();
    }
    ResetStat()
    {
      for (var i = 0; i < this.MAXSTACKSIZE; i++)
          this.objstack[i] = null;
      this.iStatPoint = 0;
      this.iStatStack[this.iStatPoint] = 0;
      this.PushStat(0);
  }

	PopStat( type, p)
	{
		if(this.oPreviousView!=null)this.oPreviousView.CallBack(type, p);
		return this.PopStat(1);
	}
    PopStat( i) 
    {
		if (MyTrade.bCheckTradeing && this.iXStat == XStat.GS_MYTRADEFRAME) {
			GmProtocol.gi().s_Trade(10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			MyTrade.bCheckTradeing = false;
		}
		if (this.iXStat == XStat.GS_SYSTEMOPERATE) {// 系统菜单，更新配置到服务器
			GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);
			GmProtocol.gi().s_UseSkill(100, SystemOperate.iNearRoleCount, 0, 0,
					0, 0, 0);
		}
		if (i > 1)
        this.PopStat(i - 1);
		if (this.iStatPoint > 1) {
			this.iPoint = this.iPointStack[this.iStatPoint];
			this.iPage = this.iPageStack[this.iStatPoint];
			this.objstack[this.iStatPoint] = null;
			this.iStatPoint--;
		}
		this.iXStat = this.iStatStack[this.iStatPoint];
		this.oCurrentView = this.objstack[this.iStatPoint];
		this.oPreviousView = this.objstack[this.iStatPoint - 1];
		return this.iStatStack[this.iStatPoint];
	}
	
    PushXmsStat( i, bc) 
    {
		if (MyTrade.bCheckTradeing)// && this.iXStat==GS_MYTRADEFRAME)
		{
			if (i != XStat.GS_WATCHON) {
				GmProtocol.gi().s_Trade(10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				MyTrade.bCheckTradeing = false;
			}
		}
		if (this.iStatPoint < 0 || this.iStatPoint >= this.MAXSTACKSIZE)
			return null;
		this.iStatPoint++;
		this.iStatStack[this.iStatPoint] = i;
		this.iPointStack[this.iStatPoint] = this.iPoint;
		this.iPageStack[this.iStatPoint] = this.iPage;
		this.iPoint = 0;
		this.iPage = 0;
		this.iXStat = i;

		if (GmConfig.bBigUI && i != XStat.GS_GAMEING && GmConfig.SCRW > GmConfig.BUW) {
//			var j = SystemOperate.iScreenSet;
//			SystemOperate.SetScreenMode(4);
			this.objstack[this.iStatPoint] = bc;
//			SystemOperate.SetScreenMode(j);
		} else
			this.objstack[this.iStatPoint] = bc;

		if (this.objstack[this.iStatPoint] != null)
			this.objstack[this.iStatPoint].iStatType = i;
		this.oCurrentView = this.objstack[this.iStatPoint];
		this.oPreviousView = this.objstack[this.iStatPoint - 1];

		GoodsDraw.Reset();

		return this.oCurrentView;
	}

    PushStat( i)
    {
		if (MyTrade.bCheckTradeing)// && this.iXStat==GS_MYTRADEFRAME)
		{
			if (i != XStat.GS_WATCHON) {
				GmProtocol.gi().s_Trade(10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				MyTrade.bCheckTradeing = false;
			}
		}
		if (this.iStatPoint < 0 || this.iStatPoint >= this.MAXSTACKSIZE)
			return null;
		this.iStatPoint++;
		this.iStatStack[this.iStatPoint] = i;
		this.iPointStack[this.iStatPoint] = this.iPoint;
		this.iPageStack[this.iStatPoint] = this.iPage;
		this.iPoint = 0;
		this.iPage = 0;
		this.iXStat = i;

		if (GmConfig.bBigUI && i != XStat.GS_GAMEING && GmConfig.SCRW > GmConfig.BUW) {
//			var j = SystemOperate.iScreenSet;
//			SystemOperate.SetScreenMode(4);
			this.objstack[this.iStatPoint] = this.InitStat();
//			SystemOperate.SetScreenMode(j);
		} else
			this.objstack[this.iStatPoint] = this.InitStat();

		if (this.objstack[this.iStatPoint] != null)
			this.objstack[this.iStatPoint].iStatType = i;
		this.oCurrentView = this.objstack[this.iStatPoint];
		this.oPreviousView = this.objstack[this.iStatPoint - 1];

		GoodsDraw.Reset();

		return this.oCurrentView;
	}

    bGameing()
    {
		for (var i = this.iStatPoint; i > 0; i--) {
			if (this.iStatStack[i] == XStat.GS_GAMEING)
				return true;
		}
		return false;
	}
	
    bHaveStat( st) 
    {
		for (var i = this.iStatPoint; i > 0; i--) {
			if (this.iStatStack[i] == st)
				return true;
		}
		return false;
	}
	FindStat( st)
	{
//		if(1==1)return null;
		for (var i = this.iStatPoint; i > 0; i--) {
			if (this.iStatStack[i] == st)
				return this.objstack[i];
		}
		return null;
	}

    LastStat( i) 
    {
		return this.objstack[this.iStatPoint - i];
	}

	 CheckStat( st)
	{
		if(this.LastStatType(0)==st)return true;
		return false;
	}
     LastStatType( i) 
     {
		return this.iStatStack[this.iStatPoint - i];
	}



    InitStat()
    {
		switch (this.iXStat) {
		case XStat.GS_EXITCONFIRM:
			return new ExitConfirm(GmPlay.xani_ui);
		case XStat.GS_KICKOUT:
			return new KickOut(GmPlay.xani_back);
		case XStat.GS_LOADING1:
			return new Loading1(GmPlay.xani_ui);
		case XStat.GS_LOADING2:
			return new Loading2(GmPlay.xani_ui);
		case XStat.GS_MESSAGE1:
			return new Message1(GmPlay.xani_ui);
		case XStat.GS_PROMPTMESSAGE:
			return new PromptMessage(GmPlay.xani_ui);
		case XStat.GS_CONFIRM1:
			return new Confirm1(GmPlay.xani_ui);
		case XStat.GS_CONFIRM2:
			return new SevConfirm(GmPlay.xani_ui);
		case XStat.GS_INNUMBER:
			return new InNumber(GmPlay.xani_ui);
		case XStat.GS_LOGO:
			return new Logo(GmPlay.xani_ui);
		case XStat.GS_LEADPAGE:
			return new LeadPage();
		case XStat.GS_STARTGAME:
			return new StartGame();
		case XStat.GS_MAINMENU:
			return new MainMenu(GmPlay.xani_ui);
		case XStat.GS_FASTLOGIN: {// 根据平台，设置登陆页面
			switch (GameVersion.QUDAO) {
			case 0:
				return new FastGetin_local();
			case 1:
			default:
				return new StartGame();
//				return new FastGetin_uc(GmPlay.xani_ui);
			}
			// if(GameData.QUDAO==1)return new FastGetin_uc(GmPlay.xani_ui);
			// else return new FastGetin_local(GmPlay.xani_ui);
		}
		case XStat.GS_REGIST:
			return new Regist_local(GmPlay.xani_ui);
		case XStat.GS_LOGIN:
			return new Login_local(GmPlay.xani_ui);
		case XStat.GS_SELECTROLE:
			return new SelectRole(GmPlay.xani_ui);
		case XStat.GS_CREATEROLE:
			return new CreateRole(GmPlay.xani_ui);
		case XStat.GS_SELECTSEVER:
			return new SelectSever(GmPlay.xani_ui);
		case XStat.GS_GAMEING:
			return new Gameing(GmPlay.xani_ui);
		case XStat.GS_TEAMOPERATE:
			return new TeamOperate(GmPlay.xani_ui);
		case XStat.GS_TEAMCREATE:
			return new TeamCreate(GmPlay.xani_ui);
		case XStat.GS_TEAMZHEN:
			return new TeamZhen(GmPlay.xani_ui);
		case XStat.GS_TEAMDEST:
			return new TeamDest(GmPlay.xani_ui);
		case XStat.GS_SENDPUBLICCHAT:
			return new PublicChat_Send(GmPlay.xani_ui);
		case XStat.GS_SETCHATVALUE:
			return new SetChatValue(GmPlay.xani_ui);
		case XStat.GS_ADDPOINT:
			return new AddPoint(GmPlay.xani_ui);
		case XStat.GS_PRIVATECHAT:
			return new PrivateChat_Send(GmPlay.xani_ui);
		case XStat.GS_GIVEGOODS:
			return new GiveGoods(GmPlay.xani_ui);
		case XStat.GS_LEARNSKILL:
			return new LearnSkill(GmPlay.xani_ui);
		case XStat.GS_BACKTOSCHOOL:
			return new BackToSchool(GmPlay.xani_ui);
		case XStat.GS_MISSIONFRAME:
			return new MissionFrame(GmPlay.xani_ui);
		case XStat.GS_SELECTGOODSFORMISSION:
			return new SelectGoodsForMission(GmPlay.xani_ui);
		case XStat.GS_FULLCHATFRAME:
			return new PublicChat_BigFrame(GmPlay.xani_ui);
		case XStat.GS_SHOPFRAME:
			return new NpcShopFrame(GmPlay.xani_ui);
		case XStat.GS_SHELVESFRAME:
			return new ShelvesFrame(GmPlay.xani_ui);
		case XStat.GS_CREATEGOV:
			return new CreateGov(GmPlay.xani_ui);
		case XStat.GS_APPLYFORGOV:
			return new ApplyForGov(GmPlay.xani_ui);
		case XStat.GS_GOVFRAME:
			return new GovFrame(GmPlay.xani_ui);
		case XStat.GS_LEARNGOVSKILL:
			return new LearnGovSkill(GmPlay.xani_ui);
		case XStat.GS_GOVXIU:
			return new GovXiu(GmPlay.xani_ui);
		case XStat.GS_SMALLMAP:
			return new SmallMap(GmPlay.xani_ui);
		case XStat.GS_WORLDMAP:
			return new WorldMap(GmPlay.xani_ui);
		case XStat.GS_SYSTEMOPERATE:
			return new SystemOperate(GmPlay.xani_ui);
		case XStat.GS_MYATTFRAME:
			return new MyAttFrame(GmPlay.xani_ui);
		case XStat.GS_MEMBERDETAIL:
			return new MemberDetail(GmPlay.xani_ui);
		case XStat.GS_MAKEEQUIP:
			return new MakeEquip(GmPlay.xani_ui);
		case XStat.GS_FASTOPERATE:
			return new FastOperate(GmPlay.xani_ui);
		case XStat.GS_CAMEOOPERATE:
			return new CameoOperate(GmPlay.xani_ui);
		case XStat.GS_PETSFRAME:
			return new PetsFrame(GmPlay.xani_ui);
		case XStat.GS_FUSEPET:
			return new FusePet(GmPlay.xani_ui);
		case XStat.GS_APPROVEPET:
			return new ApprovePet(GmPlay.xani_ui);
		case XStat.GS_SELECTMYPET:
			return new SelectMyPet(GmPlay.xani_ui);
		case XStat.GS_INGOTMALL:
			return new IngotMall(GmPlay.xani_ui);
		case XStat.GS_FUBENMALL:
			return new FubenMall(GmPlay.xani_ui);
		case XStat.GS_IMPROVEEQUIP:
			return new ImproveEquip(GmPlay.xani_ui);
		case XStat.GS_REPAIREQUIP:
			return new RepairEquip(GmPlay.xani_ui);
		case XStat.GS_WATCHON:
			return new WatchOn(GmPlay.xani_ui);
		case XStat.GS_FINDFRIEND:
			return new FindFriend(GmPlay.xani_ui);
		case XStat.GS_SMALLSPEAKER:
			return new SmallSpeaker(GmPlay.xani_ui);
		case XStat.GS_SENDNOVICEASK:
			return new Send_NoviceAsk(GmPlay.xani_ui);
		case XStat.GS_SENDACEANSWER:
			return new Send_AceAnswer(GmPlay.xani_ui);
		case XStat.GS_GETCODEREWARD:
			return new GetCodeReward(GmPlay.xani_ui);
		case XStat.GS_LEARNPETSKILL:
			return new LearnPetSkill(GmPlay.xani_ui);
		case XStat.GS_PETEAT:
			return new PetEat(GmPlay.xani_ui);
		case XStat.GS_WASHPET:
			return new WashPet(GmPlay.xani_ui);
		case XStat.GS_MYRECOVER:
			return new MyRecover(GmPlay.xani_ui);
		case XStat.GS_MYGOODSFRAME:
			return new MyGoodsFrame(GmPlay.xani_ui);
		case XStat.GS_EXCHANGEMONEY:
			return new ExchangeMoney(GmPlay.xani_ui);
		case XStat.GS_MYTRADEFRAME:
			return new MyTradeFrame(GmPlay.xani_ui);
		case XStat.GS_GOODSSTOREFROME:
			return new GoodsStoreFrame(GmPlay.xani_ui);
		case XStat.GS_PETSTOREFRAME:
			return new PetStoreFrame(GmPlay.xani_ui);
		case XStat.GS_PRIVATECHATRECORD:
			return new PrivateChatRecord(GmPlay.xani_ui);
		case XStat.GS_LIANDANSHU:
			return new LianDanShu(GmPlay.xani_ui);
		case XStat.GS_SETTITLE:
			return new SetTitle(GmPlay.xani_ui);
		case XStat.GS_PETXIU:
			return new PetXiu(GmPlay.xani_ui);
		case XStat.GS_MOUNTSFRAME:
			return new MountsFrame(GmPlay.xani_ui);
		case XStat.GS_FEEDMOUNTS:
			return new FeedMounts(GmPlay.xani_ui);
		case XStat.GS_NOVICEHELP:
			return new NoviceHelp(GmPlay.xani_ui);
		case XStat.GS_NOVICEQUESTIONLIST:
			return new NoviceQuestionList(GmPlay.xani_ui);
		case XStat.GS_NOVICECHECKANSWER:
			return new NoviceCheckAnswer(GmPlay.xani_ui);
		case XStat.GS_PROMPTACTIVITY:
			return new NewActivity(GmPlay.xani_ui);
//			return new PromptActivity(GmPlay.xani_ui);
		case XStat.GS_SHOWACTIVITYDETAIL:
			return new ShowActivityDetail(GmPlay.xani_ui);
		case XStat.GS_WEEKLYACTIVITY:
			return new WeeklyActivity(GmPlay.xani_ui);
		case XStat.GS_DAYATTEND:
			return new DayAttend(GmPlay.xani_ui);
		case XStat.GS_CHANGENAME:
			return new ChangeName(GmPlay.xani_ui);
		case XStat.GS_LOCKOPEN:
			return new LockOpen(GmPlay.xani_ui);
		case XStat.GS_LOCKSET:
			return new LockSet(GmPlay.xani_ui);
		case XStat.GS_LOCKFRAME:
			return new LockFrame(GmPlay.xani_ui);
		case XStat.GS_SELECTGOODS:
			return new SelectGoods(GmPlay.xani_ui);
		case XStat.GS_SELECTPET:
			return new SelectPet(GmPlay.xani_ui);
		case XStat.GS_EXTHELP:
			return new ExtHelp(GmPlay.xani_ui);
		case XStat.GS_PLANTFRAME:
			return new PlantFrame(GmPlay.xani_ui);
		case XStat.GS_LANDFRAME:
			return new LandFrame(GmPlay.xani_ui);
		case XStat.GS_SELECTLS:
			return new SelectLS(GmPlay.xani_ui);
			
		case XStat.GS_EXTLEARNSKILL:
			return new ExtLearnSkill(GmPlay.xani_ui);
		case XStat.GS_APPLYGOVFIGHT:
			return new ApplyGovFight(GmPlay.xani_ui);
		case XStat.GS_GETINGOV:
			return new GetInGov(GmPlay.xani_ui);
		case XStat.GS_NEWGOVFRAME:
			return new NewGovFrame(GmPlay.xani_ui);
		case XStat.GS_MEMBEROPERATE:
			return new MemberOperate(GmPlay.xani_ui);
		case XStat.GS_SETGOVPOWER:
			return new SetGovPower(GmPlay.xani_ui);
		case XStat.GS_CONFIRMAPPLY:
			return new ConfirmApply(GmPlay.xani_ui);
		case XStat.GS_ENTRUSTMISSION:
			return new EntrustMission(GmPlay.xani_ui);
		case XStat.GS_RELEASEGOVMISSION:
			return new ReleaseGovMission(GmPlay.xani_ui);
		case XStat.GS_NEWGOVMANAGE:
			return new NewGovManage(GmPlay.xani_ui);
		case XStat.GS_GOV_SETBUILDING:
			return new Gov_SetBuilding(GmPlay.xani_ui);
		case XStat.GS_GOV_SETRESEARCH:
			return new Gov_SetResearch(GmPlay.xani_ui);
		case XStat.GS_GOV_SETMTLEV:
			return new Gov_SetMtLev(GmPlay.xani_ui);
		case XStat.GS_GOV_SETHOSTILITY:
			return new Gov_SetHostility(GmPlay.xani_ui);
		case XStat.GS_GOV_SETNAME:
			return new Gov_SetName(GmPlay.xani_ui);
		case XStat.GS_GOV_SETDETAIL:
			return new Gov_SetDetail(GmPlay.xani_ui);
		case XStat.GS_GOV_REMEDYMERGE:
			return new RemedyMerge(GmPlay.xani_ui);
		case XStat.GS_HIRETRADERWORKER:
			return new HireTraderWorker(GmPlay.xani_ui);
		case XStat.GS_GOVFBTARGET:
			return new GovFBTarget(GmPlay.xani_ui);
			
		case XStat.GS_CREATEFT:
			return new CreateFT(GmPlay.xani_ui);
		case XStat.GS_FTFRAME:
			return new FTFrame(GmPlay.xani_ui);
		case XStat.GS_FTAPPLY:
			return new FTApply(GmPlay.xani_ui);
		case XStat.GS_FTMEMBER:
			return new FTMember(GmPlay.xani_ui);
		case XStat.GS_FTAGREE:
			return new FTAgree(GmPlay.xani_ui);
		case XStat.GS_FTRANK:
			return new FTRank(GmPlay.xani_ui);
		case XStat.GS_FTCHALLENGE:
			return new FTChallenge(GmPlay.xani_ui);
		case XStat.GS_FTPUTIN:
			return new FTPutIn(GmPlay.xani_ui);
		case XStat.GS_FTGETOUT:
			return new FTGetOut(GmPlay.xani_ui);
		case XStat.GS_FTMIJING:
			return new FTMiJing(GmPlay.xani_ui);
		case XStat.GS_JJPET:
			return new JJPet(GmPlay.xani_ui);
		case XStat.GS_MERGEZR:
			return new MergeZR(GmPlay.xani_ui);
			
		case XStat.GS_CREATESHOP:
			return new CreateShop(GmPlay.xani_ui);
		case XStat.GS_FRIENDTEAM:
			return new FriendTeam(GmPlay.xani_ui);
		case XStat.GS_CHANGECOLOR:
			return new ChangeColor(GmPlay.xani_ui);
		case XStat.GS_SELECTSCHOOL:
			return new SelectSchool(GmPlay.xani_ui);
		case XStat.GS_NEWSHOP:
			return new NewShop(GmPlay.xani_ui);
		case XStat.GS_SELECTNEWPET:
			return new SelectNewPet(GmPlay.xani_ui);
		case XStat.GS_CREATEFUBEN:
			return new CreateFuBen(GmPlay.xani_ui);
		case XStat.GS_APPLYFUBEN:
			return new ApplyFuBen(GmPlay.xani_ui);
		case XStat.GS_MANAGEFUBEN:
			return new ManageFuBen(GmPlay.xani_ui);
			
		case XStat.GS_AQSTART:///开始
			return new AQStart(GmPlay.xani_ui);
		case XStat.GS_AQDOING://进行中
			return new AQDoing(GmPlay.xani_ui);
		case XStat.GS_MAINHELP:
			return new MainHelp(GmPlay.xani_ui);
			
		case XStat.GS_TETRIS:
			return new Tetris(GmPlay.xani_ui);
			
		case XStat.GS_DIEPROMPT:
			return new DiePrompt(GmPlay.xani_ui);
		case XStat.GS_MYSELECT:
			return new MySelect(GmPlay.xani_ui);
		case XStat.GS_SHOPBUYDRAWING:
			return new shop_BuyDrawing(GmPlay.xani_ui);
		case XStat.GS_PEAKFIGHT:
			return new PeakFight(GmPlay.xani_ui);
		case XStat.GS_PEAKFIGHTSHOP:
			return new shop_PeakFight(GmPlay.xani_ui);
		case XStat.GS_LEADERBOARDFRAME:
			return new LeaderBoardFrame(GmPlay.xani_ui);
		case XStat.GS_LEADERBOARDROLE:
			return new LeaderBoardRole(GmPlay.xani_ui);
			
		default:
			GmPlay.sop("un init stat = " + this.iXStat);
		}
		return null;
	}

     Draw()
      {
		var i;
//		GmPlay.sop("----");
		for (i = 0; i <= this.iStatPoint; i++) {
			if (this.objstack[i] != null) {
				if (GmConfig.bBigUI && this.objstack[i].iStatType != GS_GAMEING
						&& GmConfig.SCRW > GmConfig.BUW) {
//					var j = SystemOperate.iScreenSet;
//					SystemOperate.SetScreenMode(4);
					this.objstack[i].Draw();
//					SystemOperate.SetScreenMode(j);
				} else
					this.objstack[i].Draw();
	//			GmPlay.sop(""+this.iStatStack[i]);
			}
		}
	}

	ProcTouch( msg,  x,  y,  sx,  sy) {
		if (this.objstack[this.iStatPoint] != null) {
			if (GmConfig.bBigUI && this.objstack[this.iStatPoint].iStatType != GS_GAMEING
					&& GmConfig.SCRW > GmConfig.BUW) {
//				var j = SystemOperate.iScreenSet;
//				SystemOperate.SetScreenMode(4);
				TouchManager.gi().calcxy(sx, sy);
				var ret = this.objstack[this.iStatPoint].ProcTouch(msg,
						TouchManager.gi().cx, TouchManager.gi().cy);
//				SystemOperate.SetScreenMode(j);
				return ret;
			} else
				return this.objstack[this.iStatPoint].ProcTouch(msg, x, y);
		}
		/*
		 * int i; for(i=this.iStatPoint;i>=0;i--) { if(this.objstack[i]!=null) {
		 * if(this.objstack[i].ProcTouch(msg, x, y))return true; } }
		 */
		return false;
	}
}

XStat.GS_EXITCONFIRM = 1;
XStat.GS_KICKOUT = 2;
XStat.GS_LOADING1 = 10;
XStat.GS_LOADING2 = 11;
XStat.GS_MESSAGE1 = 50;
XStat.GS_PROMPTMESSAGE=60;
XStat.GS_CONFIRM1 = 70;
XStat.GS_CONFIRM2 = 71;
XStat.GS_INNUMBER = 80;

XStat.GS_LEADPAGE=101;
XStat.GS_STARTGAME=102;

XStat.GS_LOGO = 100;
XStat.GS_MAINMENU = 200;
XStat.GS_FASTLOGIN = 300;
XStat.GS_REGIST = 400;
XStat.GS_LOGIN = 500;
XStat.GS_SELECTROLE = 600;
XStat.GS_CREATEROLE = 700;
XStat.GS_SELECTSEVER = 800;

XStat.GS_GAMEING = 2000;
XStat.GS_TEAMOPERATE = 2100;
XStat.GS_TEAMCREATE = 2101;
XStat.GS_TEAMZHEN = 2102;
XStat.GS_TEAMDEST=2103;
XStat.GS_SENDPUBLICCHAT = 2200;
XStat.GS_SETCHATVALUE=2202;
XStat.GS_ADDPOINT = 2300;
XStat.GS_PRIVATECHAT = 2400;
XStat.GS_GIVEGOODS = 2500;
XStat.GS_LEARNSKILL = 2600;
XStat.GS_BACKTOSCHOOL=2601;
XStat.GS_MISSIONFRAME = 2700;
XStat.GS_SELECTGOODSFORMISSION=2701;//选择物品完成任务
XStat.GS_FULLCHATFRAME = 2800;
XStat.GS_SHOPFRAME = 2900;
XStat.GS_SHELVESFRAME = 3000;// 上架确认框
XStat.GS_SMALLMAP = 3010;// 小地图
XStat.GS_WORLDMAP = 3011;// 世界地图
XStat.GS_SYSTEMOPERATE = 3020;// 系统
XStat.GS_MYATTFRAME = 3030;// 我的属性框
XStat.GS_FASTOPERATE = 3040;// 快捷操作
XStat.GS_PETSFRAME = 3050;// 我的宠物
XStat.GS_FUSEPET = 3051;// 合成宠物
XStat.GS_APPROVEPET = 3052;// 认证宠物
XStat.GS_SELECTMYPET=3053;//选择宠物
XStat.GS_INGOTMALL = 3060;// 元宝商城
XStat.GS_FUBENMALL=3061;//副本积分商城
XStat.GS_WATCHON = 3070;// 我的摊位
XStat.GS_FINDFRIEND = 3080;// 查找好友
XStat.GS_SMALLSPEAKER = 3090;// 小喇叭
XStat.GS_SENDNOVICEASK = 3091;// 新手提问
XStat.GS_SENDACEANSWER = 3092;// 新手提问
XStat.GS_GETCODEREWARD = 3093;// 用CD-KEY兑换奖品
XStat.GS_LEARNPETSKILL = 3100;// 宠物学技能
XStat.GS_PETEAT = 3101;// 宠物食用物品
XStat.GS_WASHPET = 3110;// 洗宝宝
XStat.GS_MYRECOVER = 3120;// 回收物品
XStat.GS_MYGOODSFRAME = 3130;// 我的物品栏
XStat.GS_EXCHANGEMONEY=3131;//元宝兑换钱
XStat.GS_MYTRADEFRAME = 3140;// 交易
XStat.GS_GOODSSTOREFROME = 3150;// 仓库
XStat.GS_PETSTOREFRAME = 3151;// 宠物仓库
XStat.GS_PRIVATECHATRECORD = 3160;// 私聊记录
XStat.GS_LIANDANSHU = 3170;// 炼丹术
XStat.GS_SETTITLE = 3180;// 称谓设置
XStat.GS_PETXIU = 3190;// 宠物修炼
XStat.GS_MOUNTSFRAME = 3200;// 坐骑窗口
XStat.GS_FEEDMOUNTS = 3210;// 喂养坐骑
XStat.GS_NOVICEHELP = 3220;// 新手帮助
XStat.GS_NOVICEQUESTIONLIST = 3230;// 打开问题列表
XStat.GS_NOVICECHECKANSWER = 3240;// 新手检查问题的答案
XStat.GS_PROMPTACTIVITY = 3250;// 活跃度
XStat.GS_SHOWACTIVITYDETAIL=3251;//活跃度细节弹框
XStat.GS_WEEKLYACTIVITY=3252;//周历
XStat.GS_DAYATTEND = 3260;// 每日报到
XStat.GS_CHANGENAME = 3270;//改名
XStat.GS_LOCKSET=3280;//设置锁
XStat.GS_LOCKOPEN=3290;//解锁
XStat.GS_LOCKFRAME=3300;//锁页面
XStat.GS_SELECTGOODS=3310;//聊天框选择物品
//	XStat.GS_WATCHSELECT=3320;//选择聊天发送的物品
XStat.GS_SELECTPET=3330;//选择聊天发送的宠物
XStat.GS_EXTHELP=3340;//扩展帮助
XStat.GS_PLANTFRAME=3350;//植物框
XStat.GS_LANDFRAME=3360;//土地属性框
XStat.GS_SELECTLS=3370;//选择灵石

XStat.GS_CREATEGOV = 4000;// 创建帮派页面
XStat.GS_APPLYFORGOV = 4001;// 申请加入帮派--------
XStat.GS_GOVFRAME = 4002;// 帮派页面
XStat.GS_LEARNGOVSKILL = 4003;// 学习帮派技能
XStat.GS_GOVXIU = 4004;// 帮派修炼
XStat.GS_MEMBERDETAIL = 4005;// 帮派成员详细信息
XStat.GS_EXTLEARNSKILL = 4006;// 扩展学习技能到30级
XStat.GS_APPLYGOVFIGHT=4007;//申请帮战
XStat.GS_GETINGOV=4008;//用id进入帮派-----------
XStat.GS_NEWGOVFRAME=4009;//用id进入帮派-------
XStat.GS_MEMBEROPERATE=4010;//成员管理----------
XStat.GS_SETGOVPOWER=4011;//设置权限--------
XStat.GS_CONFIRMAPPLY=4012;//同意拒绝申请-----
XStat.GS_ENTRUSTMISSION=4013;//委托任务---
XStat.GS_RELEASEGOVMISSION=4014;//发布委托页面---
XStat.GS_NEWGOVMANAGE=4015;//帮派管理---
XStat.GS_GOV_SETBUILDING=4016;//建筑设置---
XStat.GS_GOV_SETRESEARCH=4017;//研究设置---
XStat.GS_GOV_SETMTLEV=4018;//维护级别设置---
XStat.GS_GOV_SETHOSTILITY=4019;//设置敌对---
XStat.GS_GOV_SETNAME=4020;//设置敌对---
XStat.GS_GOV_SETDETAIL=4021;//设置帮派宣言---
XStat.GS_GOV_REMEDYMERGE=4022;//丹方合成---
XStat.GS_HIRETRADERWORKER=4023;//雇佣商人和工人
XStat.GS_GOVFBTARGET=4024;//帮派副本进度显示

XStat.GS_CREATEFT=4100;//创建战队
XStat.GS_FTFRAME=4101;//战队属性页面
XStat.GS_FTAPPLY=4102;//战队申请页面
XStat.GS_FTMEMBER=4103;//战队成员列表
XStat.GS_FTAGREE=4104;//同意入队
XStat.GS_FTRANK=4105;//排行
XStat.GS_FTCHALLENGE=4106;//排行
XStat.GS_FTPUTIN=4107;//战队资金注入
XStat.GS_FTGETOUT=4108;//战队资金取出
XStat.GS_FTMIJING=4109;//战队秘境
XStat.GS_JJPET=4110;//进阶宠物
XStat.GS_MERGEZR=4111;//融合自然之力

XStat.GS_CREATESHOP=4200;//创建商店
XStat.GS_FRIENDTEAM=4300;//好友分组
XStat.GS_CHANGECOLOR=4400;//染色
XStat.GS_SELECTSCHOOL=4500;//选择门派
XStat.GS_NEWSHOP=4600;//新商店
XStat.GS_SELECTNEWPET=4700;//选择新宠物

XStat.GS_MAKEEQUIP = 5000;// 装备制造
XStat.GS_CAMEOOPERATE = 5010;// 宝石合成镶嵌
XStat.GS_IMPROVEEQUIP = 5020;// 强化装备
XStat.GS_REPAIREQUIP=5030;//修理装备

XStat.GS_CREATEFUBEN = 6000;// 创建副本
XStat.GS_APPLYFUBEN = 6010;// 申请副本
XStat.GS_MANAGEFUBEN = 6020;// 管理副本

XStat.GS_AQSTART=6500;//中午答题活动
XStat.GS_AQDOING=6501;
XStat.GS_MAINHELP=6502;//资料库

XStat.GS_DIEPROMPT=7000;//死亡提示
XStat.GS_MYSELECT=7001;//选择
XStat.GS_SHOPBUYDRAWING=7002;//图纸商店
XStat.GS_PEAKFIGHT=7003;//巅峰之战
XStat.GS_PEAKFIGHTSHOP=7004;//巅峰之战商店

XStat.GS_LEADERBOARDFRAME=7005;//排行榜
XStat.GS_LEADERBOARDROLE=7006;//排行榜人物

XStat.GS_TETRIS=10000;//

XStat.x_stat = null;
XStat.gi=function()
{
	if(XStat.x_stat==null)XStat.x_stat=new XStat();
	return XStat.x_stat;
}