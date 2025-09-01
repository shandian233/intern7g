import GameVersion from "../../zero/Interface/GameVersion";
import PublicInterface from "../../zero/Interface/PublicInterface";

import GameData from "../../config/GameData";
import GmConfig from "../../config/GmConfig";
import XDefine from "../../config/XDefine";

import MapManager from "../../map/MapManager";
import CreateRole from "../../mgm/newmainmenu/CreateRole";
import LeadPage from "../../mgm/newmainmenu/LeadPage";
import SelectRole from "../../mgm/newmainmenu/SelectRole";
import SelectSever from "../../mgm/newmainmenu/SelectSever";
import Login_local from "../../mgm/newmainmenu/local/Login_local";
import Regist_local from "../../mgm/newmainmenu/local/Regist_local";
//import android.util.Log;
import PackageTools from "../../engine/PackageTools";
import TouchManager from "../../engine/TouchManager";
import XButton from "../../engine/control/XButton";
import DataEngine from "../../engine/data/DataEngine";
import AnimaAction from "../../engine/graphics/AnimaAction";
import M3DFast from "../../engine/graphics/M3DFast";
//import engine.graphics.XImgFast;
import XAnima from "../../engine/graphics/XAnima";
import NetFast from "../../engine/network/NetFast";
import WavFast from "../../engine/sound/WavFast";
import XmsEngine from "../../engine/xms/XmsEngine";
import XRecordFast from "../../engtst/mgm/History/XRecordFast";
import KickOut from "../../engtst/mgm/frame/KickOut";
import Message1 from "../../engtst/mgm/frame/Message1";
import SevConfirm from "../../engtst/mgm/frame/SevConfirm";
import FormatString from "../../engtst/mgm/frame/format/FormatString";
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage";
import FrameMessage from "../../engtst/mgm/frame/message/FrameMessage";
import FrameMessageEx from "../../engtst/mgm/frame/message/FrameMessageEx";
import ExtendButton from "../../engtst/mgm/gameing/ExtendButton";
import Gameing from "../../engtst/mgm/gameing/Gameing";
import NearRole from "../../engtst/mgm/gameing/NearRole";
import ProgressBar from "../../engtst/mgm/gameing/ProgressBar";
import PeakFight from "../../engtst/mgm/gameing/act/PeakFight";
import AQDoing from "../../engtst/mgm/gameing/afternoonquestion/AQDoing";
import AQStart from "../../engtst/mgm/gameing/afternoonquestion/AQStart";
import FriendList from "../../engtst/mgm/gameing/chat/privatechat/FriendList";
import PrivateChatWatch from "../../engtst/mgm/gameing/chat/privatechat/PrivateChatWatch";
import PublicChat_SmallFrame from "../../engtst/mgm/gameing/chat/publicchat/PublicChat_SmallFrame";
import IngotMall from "../../engtst/mgm/gameing/fast/IngotMall";
import SteeringWheel from "../../engtst/mgm/gameing/fast/SteeringWheel";
import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate";
import WatchOn from "../../engtst/mgm/gameing/fast/WatchOn";
import DiePrompt from "../../engtst/mgm/gameing/fight/DiePrompt";
import XFight from "../../engtst/mgm/gameing/fight/XFight";
import FTRank from "../../engtst/mgm/gameing/fteam/FTRank";
import MyFT from "../../engtst/mgm/gameing/fteam/MyFT";
import FTFrame from "../../engtst/mgm/gameing/fteam/manage/FTFrame";
import FTAgree from "../../engtst/mgm/gameing/fteam/member/FTAgree";
import FTApply from "../../engtst/mgm/gameing/fteam/member/FTApply";
import FTMember from "../../engtst/mgm/gameing/fteam/member/FTMember";
import FubenMall from "../../engtst/mgm/gameing/fuben/FubenMall";
import MyFuBen from "../../engtst/mgm/gameing/fuben/MyFuBen";
import ExtLearnSkill from "../../engtst/mgm/gameing/gov/ExtLearnSkill";
import MemberDetail from "../../engtst/mgm/gameing/gov/MemberDetail";
import MyGov from "../../engtst/mgm/gameing/gov/MyGov";
import HireTraderWorker from "../../engtst/mgm/gameing/gov/ext/HireTraderWorker";
import NewShop from "../../engtst/mgm/gameing/gov/ext/NewShop";
import ApplyForGov from "../../engtst/mgm/gameing/gov/ext/apply/ApplyForGov";
import NewGovFrame from "../../engtst/mgm/gameing/gov/ext/base/NewGovFrame";
import NewGovManage from "../../engtst/mgm/gameing/gov/ext/manage/NewGovManage";
import EntrustMission from "../../engtst/mgm/gameing/gov/ext/mission/EntrustMission";
import GovFBTarget from "../../engtst/mgm/gameing/gov/fuben/GovFBTarget";
import BeginersGuide from "../../engtst/mgm/gameing/help/BeginersGuide";
import DayAttend from "../../engtst/mgm/gameing/help/DayAttend";
import FastGoods from "../../engtst/mgm/gameing/help/FastGoods";
import JQMode from "../../engtst/mgm/gameing/help/JQMode";
import MySelect from "../../engtst/mgm/gameing/help/MySelect";
import ExtHelp from "../../engtst/mgm/gameing/help/ExtHelp/ExtHelp";
import FuYuan from "../../engtst/mgm/gameing/help/FuYuan/FuYuan";
import LeaderBoard from "../../engtst/mgm/gameing/help/TopIcon/LeaderBoard";
import LeaderBoardFrame from "../../engtst/mgm/gameing/help/TopIcon/LeaderBoard_/LeaderBoardFrame";
import NewActivity from "../../engtst/mgm/gameing/help/ang/NewActivity";
import NoviceCheckAnswer from "../../engtst/mgm/gameing/help/novice/NoviceCheckAnswer";
import NoviceHelp from "../../engtst/mgm/gameing/help/novice/NoviceHelp";
import NoviceQuestionList from "../../engtst/mgm/gameing/help/novice/NoviceQuestionList";
import GmMe from "../../engtst/mgm/gameing/me/GmMe";
import SetTitle from "../../engtst/mgm/gameing/me/SetTitle";
import MyPets from "../../engtst/mgm/gameing/me/pet/MyPets";
import BackToSchool from "../../engtst/mgm/gameing/me/school/BackToSchool";
import MyBuy from "../../engtst/mgm/gameing/me/shop/MyBuy";
import MySell from "../../engtst/mgm/gameing/me/shop/MySell";
import shop_BuyDrawing from "../../engtst/mgm/gameing/me/shop/shop_BuyDrawing";
import shop_PeakFight from "../../engtst/mgm/gameing/me/shop/shop_PeakFight";
import MyGoods from "../../engtst/mgm/gameing/me/goods/MyGoods";
import TmpGoods from "../../engtst/mgm/gameing/me/goods/TmpGoods";
import LandFrame from "../../engtst/mgm/gameing/me/land/LandFrame";
import MyLand from "../../engtst/mgm/gameing/me/land/MyLand";
import PlantFrame from "../../engtst/mgm/gameing/me/land/PlantFrame";
import MissionLead from "../../engtst/mgm/gameing/me/mission/MissionLead";
import MyMission from "../../engtst/mgm/gameing/me/mission/MyMission";
import UpgradeEffect from "../../engtst/mgm/gameing/me/mission/UpgradeEffect";
import MyMounts from "../../engtst/mgm/gameing/me/mounts/MyMounts";
import NpcShop from "../../engtst/mgm/gameing/me/shop/NpcShop";
import MyTeam from "../../engtst/mgm/gameing/me/team/MyTeam";
import TeamCreate from "../../engtst/mgm/gameing/me/team/TeamCreate";
import TeamOperate from "../../engtst/mgm/gameing/me/team/TeamOperate";
import TeamZhen from "../../engtst/mgm/gameing/me/team/TeamZhen";
import MyTrade from "../../engtst/mgm/gameing/me/trade/MyTrade";
import PetStoreFrame from "../../engtst/mgm/gameing/me/trade/PetStoreFrame";
import XStat from "./XStat";
import MyAI from "./MyAI";
import GmProtocol from "./GmProtocol";
import VoiceInterface from "./VoiceInterface";

import FireworksEffect from "./FireworksEffect";

export default class GmPlay {
  constructor() {
    this.bTimerOnce = false;
    this.sCheckError = "验证错误，强制退出游戏";
    this.btn_checkok = null;
    this.btn_checkreset = null;
    GmPlay.iNowMillis = XDefine.get_ms();

    GmPlay.gp = this;

    GmMe.me = new GmMe();
    MyLand.ml = new MyLand();

    this.bCheck = false;
    this.iCheckFace = new Int32Array(4); //
    this.iCheckRot = new Int32Array(4); //
    this.iCheckAnima = new Int32Array(4); //

    this.mapChanging = { changed: false, type: 0, dest: 0 };

    this.bCheck2 = false;
    this.sCheckWord = new Array(4); //
    this.iCheckValue = new Array(4); //cx_arr_flag
    this.iCheckResult = new Int32Array(4); //cx_arr_flag
    this.iResultValue = new Array(4); //cx_arr_flag
    for (var i = 0; i < 4; i++) {
      this.iCheckValue[i] = new Int32Array(9);
      this.iResultValue[i] = new Int32Array(9);
    }
    // for(i=0;i<100;i++)
    // {
    // if(MapData.llcollision_ai(352,224,352,260,87,138,352,237))sop("bbbbbb");
    // else sop("nnnnnnnnnnnnn");
    // }
    // for(i=0;i<100;i++)
    // {
    // if(MapData.llcollision(352,224,352,260,87,138,352,237))sop("bbbbbb");
    // else sop("nnnnnnnnnnnnn");
    // }
    // downloadfile();
    // GmPlay.xntf=new NetFast("192.168.1.101",8002);
    // GmPlay.xntf=new NetFast("222.73.182.166",8002);
    this.pls = new PackageTools();
    GmPlay.iDelay = 0;

    GmPlay.x_record = new XRecordFast(this.pls);
    GmPlay.x_record.ReadFrom(XDefine.RECORDFILENAME);

    // for(int
    // i=0;i<100;i++)EasyMessage.easymsg.AddMessage(de_mission.strValue(2,
    // 3, 16));
    /*
     * byte tmp[]; String hello="好"; try { tmp=hello.getBytes("GBK");
     * sop(""+tmp[0]); } catch (UnsupportedEncodingException e) { // TODO
     * Auto-generated catch block e.printStackTrace(); }
     */
    this.xm3f = M3DFast.gi();

    GmPlay.xani_local = new XAnima();
    GmPlay.xani_local.LoadAnima_fullpath(
      "res/localres/anima",
      this.pls,
      true,
      this._LoadFinish
    );
    this.iLoadStat = 0;
  }
  _LoadFinish() {
    XStat.gi().PushStat(XStat.GS_LEADPAGE);
  }
  init_data(blocal) {
    MyMission.de_mission = new DataEngine(this.pls, "data/mission.dat", blocal);
    GmPlay.de_goods = new DataEngine(this.pls, "data/goods.dat", blocal);
    GmPlay.de_pet = new DataEngine(this.pls, "data/pet.dat", blocal);
    GmPlay.de_map = new DataEngine(this.pls, "data/map.dat", blocal);
    GmPlay.de_skill = new DataEngine(this.pls, "data/skill.dat", blocal);
    GmPlay.de_npc = new DataEngine(this.pls, "data/npc.dat", blocal);
    GmPlay.de_mounts = new DataEngine(this.pls, "data/mounts.dat", blocal);
    GmPlay.de_fuben = new DataEngine(this.pls, "data/fuben.dat", blocal);
    GmPlay.de_chuan_song = new DataEngine(
      this.pls,
      "data/chuan_song.dat",
      blocal
    );
    GmPlay.de_grow = new DataEngine(this.pls, "data/grow.dat", blocal);
  }
  init_data_finished() {
    if (
      MyMission.de_mission.bLoadSuccess &&
      GmPlay.de_goods.bLoadSuccess &&
      GmPlay.de_pet.bLoadSuccess &&
      GmPlay.de_map.bLoadSuccess &&
      GmPlay.de_skill.bLoadSuccess &&
      GmPlay.de_npc.bLoadSuccess &&
      GmPlay.de_mounts.bLoadSuccess &&
      GmPlay.de_fuben.bLoadSuccess &&
      GmPlay.de_chuan_song.bLoadSuccess &&
      GmPlay.de_grow.bLoadSuccess
    )
      return true;
    return false;
  }
  init_anima1(blocal) {
    console.log("初始化动画");
    var ss = "res/datapackage/";
    var pls = this.pls;
    GmPlay.xani_ui = new XAnima(this.xm3f);
    GmPlay.xani_ui.LoadAnima_fullpath(ss + "ui", pls, blocal);
    GmPlay.xani_ui2 = new XAnima(this.xm3f);
    GmPlay.xani_ui2.LoadAnima_fullpath(ss + "ui2", pls, blocal);
    GmPlay.xani_ui3 = new XAnima(this.xm3f);
    GmPlay.xani_ui3.LoadAnima_fullpath(ss + "ui3", pls, blocal);
    GmPlay.xani_ui4 = new XAnima(this.xm3f);
    GmPlay.xani_ui4.LoadAnima_fullpath(ss + "ui4", pls, blocal);
    // GmPlay.xani_ui3.LoadAnima_fullpath("ui3", pls,GameData.bFromSD);
    GmPlay.xani_nui1 = new XAnima(this.xm3f);
    GmPlay.xani_nui1.LoadAnima_fullpath(ss + "uis/nui1", pls, blocal);

    GmPlay.xani_nui2 = new XAnima(this.xm3f);
    GmPlay.xani_nui2.LoadAnima_fullpath(ss + "uis/nui2", pls, blocal);

    GmPlay.xani_nui3 = new XAnima(this.xm3f);
    // GmPlay.xani_nui3.LoadAnima_fullpath("uis/nui3", pls, GameData.bFromSD);
    GmPlay.xani_nui3.LoadAnima_fullpath(ss + "uis/nui3", pls, blocal);

    GmPlay.xani_nui4 = new XAnima(this.xm3f);
    GmPlay.xani_nui4.LoadAnima_fullpath(ss + "uis/nui4", pls, blocal);

    GmPlay.xani_nui5 = new XAnima(this.xm3f);
    GmPlay.xani_nui5.LoadAnima_fullpath(ss + "uis/nui5", pls, blocal);

    GmPlay.xani_nui6 = new XAnima(this.xm3f);
    GmPlay.xani_nui6.LoadAnima_fullpath(ss + "uis/nui6", pls, blocal);

    GmPlay.xani_nicon = new XAnima(this.xm3f);
    GmPlay.xani_nicon.LoadAnima_fullpath(ss + "skills/nicon", pls, blocal);

    GmPlay.xani_aura = new XAnima(this.xm3f);
    GmPlay.xani_aura.LoadAnima_fullpath(ss + "anima/aura", pls, blocal);

    GmPlay.xani_frame = new XAnima(this.xm3f);
    GmPlay.xani_frame.LoadAnima_fullpath(ss + "uis/ui_frame", pls, blocal);
    GmPlay.xani_button = new XAnima(this.xm3f);
    GmPlay.xani_button.LoadAnima_fullpath(ss + "uis/ui_button", pls, blocal);
    GmPlay.xani_icon = new XAnima(this.xm3f);
    GmPlay.xani_icon.LoadAnima_fullpath(ss + "uis/ui_icon", pls, blocal);
    GmPlay.xani_other = new XAnima(this.xm3f);
    GmPlay.xani_other.LoadAnima_fullpath(ss + "uis/ui_other", pls, blocal);

    GmPlay.xani_newrole = new Array(6); //
    GmPlay.xani_weap = new Array(6); //
    GmPlay.xani_color = new Array(6); //
    for (var i = 0; i < 6; i++) {
      GmPlay.xani_newrole[i] = new XAnima(this.xm3f);
      GmPlay.xani_newrole[i].LoadAnima_fullpath(
        ss + "nroles/role" + i,
        pls,
        blocal
      );

      GmPlay.xani_weap[i] = new Array(10);
      for (var j = 0; j < 10; j++) {
        GmPlay.xani_weap[i][j] = new XAnima(this.xm3f);
        GmPlay.xani_weap[i][j].LoadAnima_fullpath(
          ss + "nroles/role" + i + "/weap_" + i + "_" + j,
          pls,
          blocal
        );
      }
      GmPlay.xani_color[i] = new Array(5);
      for (var j = 0; j < 5; j++) {
        GmPlay.xani_color[i][j] = new XAnima(this.xm3f);
        GmPlay.xani_color[i][j].LoadAnima_fullpath(
          ss + "nroles/role" + i + "/c" + j,
          pls,
          blocal
        );
      }
    }
    GmPlay.xani_ngoods = new XAnima(this.xm3f);
    GmPlay.xani_ngoods.LoadAnima_fullpath(ss + "anima/ngoods", pls, blocal);

    GmPlay.xani_stand = new Array(5); //
    GmPlay.xani_shot = new Array(5); //
    for (i = 0; i < 5; i++) {
      GmPlay.xani_stand[i] = new XAnima(this.xm3f);
      GmPlay.xani_shot[i] = new XAnima(this.xm3f);
    }
    GmPlay.xani_shot[0].LoadAnima_fullpath(ss + "anima/shot0", pls, blocal);
    GmPlay.xani_shot[1].LoadAnima_fullpath(ss + "anima/shot1", pls, blocal);
    GmPlay.xani_stand[0].LoadAnima_fullpath(ss + "anima/stand0", pls, blocal);
    GmPlay.xani_stand[1].LoadAnima_fullpath(ss + "anima/stand1", pls, blocal);
    GmPlay.xani_stand[2].LoadAnima_fullpath(ss + "anima/stand2", pls, blocal);

    ///////////////////////
    GmPlay.xani_face = new XAnima(this.xm3f);
    GmPlay.xani_face.LoadAnima_fullpath(ss + "anima/face", pls, blocal);

    GmPlay.xani_head = new XAnima(this.xm3f);
    GmPlay.xani_head.LoadAnima_fullpath(ss + "anima/head", pls, blocal);

    GmPlay.xani_skill = new XAnima(this.xm3f);
    GmPlay.xani_skill.LoadAnima_fullpath(ss + "skill", pls, blocal);

    GmPlay.xani_skills = new Array(13);
    var skill_anima_name = [
      "other",
      "sc1",
      "sc2",
      "sc3",
      "sc4",
      "sc5",
      "sc6",
      "sc7",
      "sc8",
      "sc9",
      "equip",
      "pet",
      "equip2",
    ];
    for (var i = 0; i < 13; i++) {
      GmPlay.xani_skills[i] = new XAnima(this.xm3f);
      GmPlay.xani_skills[i].LoadAnima_fullpath(
        ss + "skills/" + skill_anima_name[i],
        pls,
        blocal
      ); // 其他
    }

    GmPlay.xani_effect = new XAnima(this.xm3f);
    GmPlay.xani_effect.LoadAnima_fullpath(ss + "effect", pls, blocal);

    GmPlay.xani_grow = new XAnima(this.xm3f);
    GmPlay.xani_grow.LoadAnima_fullpath(ss + "grow", pls, blocal);

    GmPlay.xani_pets = new Array(40); //
    for (var i = 0; i < 40; i++) {
      GmPlay.xani_pets[i] = new XAnima(this.xm3f);
      var j = GmPlay.de_pet.intValue(i, 0, 2);
      if (j == -1)
        GmPlay.xani_pets[i].LoadAnima_fullpath(ss + "pet/1", pls, blocal);
      else GmPlay.xani_pets[i].LoadAnima_fullpath(ss + "pet/" + i, pls, blocal);
      // GmPlay.sop("--------------pets="+j+":"+i);
    }

    GmPlay.xani_nmounts = new Array(3); //
    for (var i = 0; i < 3; i++) {
      GmPlay.xani_nmounts[i] = new Array(3);
      // s = GmPlay.de_mounts.strValue(i+1, 0, 1);// 名称
      for (var j = 0; j < 3; j++) {
        GmPlay.xani_nmounts[i][j] = new XAnima(this.xm3f);

        // if (s.length > 0 && s.compareTo("-1") != 0)
        {
          // 载入动画
          GmPlay.xani_nmounts[i][j].LoadAnima_fullpath(
            ss + "anima/nmounts/" + (i + 1) + "/" + (j + 1),
            pls,
            blocal
          );
          // GmPlay.xani_nmounts[i].LoadAnima_fullpath("anima/nmounts/" + (i+1),
          // pls,blocal);
        }
      }
    }
  }
  init_anima1_finished() {
    if (!GmPlay.xani_ui.bLoadSuccess) return false;
    if (!GmPlay.xani_ui2.bLoadSuccess) return false;
    if (!GmPlay.xani_ui3.bLoadSuccess) return false;
    if (!GmPlay.xani_ui4.bLoadSuccess) return false;
    // GmPlay.xani_ui3.LoadAnima_fullpath("ui3", pls,GameData.bFromSD);
    if (!GmPlay.xani_nui1.bLoadSuccess) return false;
    if (!GmPlay.xani_nui2.bLoadSuccess) return false;
    if (!GmPlay.xani_nui3.bLoadSuccess) return false;
    if (!GmPlay.xani_nui4.bLoadSuccess) return false;
    if (!GmPlay.xani_nui5.bLoadSuccess) return false;
    if (!GmPlay.xani_nui6.bLoadSuccess) return false;
    if (!GmPlay.xani_nicon.bLoadSuccess) return false;
    if (!GmPlay.xani_aura.bLoadSuccess) return false;
    if (!GmPlay.xani_frame.bLoadSuccess) return false;
    if (!GmPlay.xani_button.bLoadSuccess) return false;
    if (!GmPlay.xani_icon.bLoadSuccess) return false;
    if (!GmPlay.xani_other.bLoadSuccess) return false;

    for (var i = 0; i < 6; i++) {
      if (!GmPlay.xani_newrole[i].bLoadSuccess) return false;

      for (var j = 0; j < 10; j++) {
        if (!GmPlay.xani_weap[i][j].bLoadSuccess) return false;
      }
      for (var j = 0; j < 5; j++) {
        if (!GmPlay.xani_color[i][j].bLoadSuccess) return false;
      }
    }

    if (!GmPlay.xani_ngoods.bLoadSuccess) return false;

    if (!GmPlay.xani_shot[0].bLoadSuccess) return false;
    if (!GmPlay.xani_shot[1].bLoadSuccess) return false;
    if (!GmPlay.xani_stand[0].bLoadSuccess) return false;
    if (!GmPlay.xani_stand[1].bLoadSuccess) return false;
    if (!GmPlay.xani_stand[2].bLoadSuccess) return false;
    ///////////////
    if (!GmPlay.xani_face.bLoadSuccess) return false;

    if (!GmPlay.xani_head.bLoadSuccess) return false;

    if (!GmPlay.xani_skill.bLoadSuccess) return false;

    for (var i = 0; i < 13; i++) {
      if (!GmPlay.xani_skills[i].bLoadSuccess) return false;
    }

    if (!GmPlay.xani_effect.bLoadSuccess) return false;

    if (!GmPlay.xani_grow.bLoadSuccess) return false;

    for (var i = 0; i < 40; i++) {
      if (!GmPlay.xani_pets[i].bLoadSuccess) return false;
      // GmPlay.sop("--------------pets="+j+":"+i);
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (!GmPlay.xani_nmounts[i][j].bLoadSuccess) return false;
      }
    }
    return true;
  }
  InitAnimaAndData() {
    switch (this.iLoadStat) {
      case 0:
        // if (GameVersion.bDebugMode)	GmPlay.xntf = new NetFast("121.40.40.172", 8002);//127.0.0.1,,121.40.40.172
        // else GmPlay.xntf = new NetFast(GmPlay.sLoginIp, GmPlay.iLoginPort);
        GmPlay.xntf = new NetFast("ws://121.40.40.172:11000/login");
        // GmPlay.xntf = new NetFast("wss://login.qi-guo.cn/login");
        //cxunmzhttps://121.40.40.172:11000/
        this.init_data(true);
        this.iLoadStat = 1;
        break;
      case 1:
        if (this.init_data_finished()) this.iLoadStat = 2;
        break;
      case 2:
        MyAI.gi().InitLink();
        this.iLoadStat = 3;
        break;
      case 3:
        this.init_anima1(true);
        this.iLoadStat = 4;
        break;
      case 4:
        if (this.init_anima1_finished()) this.iLoadStat = 5;
        break;
      case 5:
        GmPlay.aa_auras = new Array(128); //
        for (var i = 0; i < 128; i++) {
          GmPlay.aa_auras[i] = new AnimaAction();
          if (i < 2)
            GmPlay.xani_aura.InitAnimaWithName("aura" + i, GmPlay.aa_auras[i]);
        }

        GmPlay.aa_fightready = new AnimaAction();
        GmPlay.xani_skills[0].InitAnimaWithName("准备中", GmPlay.aa_fightready);
        this.iLoadStat = 6;
        break;
      case 6:
        if (MapManager.gi().LoadLogic()) {
          GmMe.me.Init();
          GmPlay.m_vi = new VoiceInterface();
          GmPlay.m_vi.Init();
          GmPlay.pxe = new XmsEngine();
          GmPlay.x_wav = new WavFast();
          this.iLoadStat = 7;
        }
        break;
      case 7:
        return true;
        break;
    }
    return false;
    // TODO Auto-generated method stub

    //honglajiao-qiguo.cn

    this.gmprotocol = GmProtocol.gi();

    GmPlay.bCheckRes = true; // 改成下次登录需要更新，如果中间异常退出，就自动检测客户顿
    GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);
    LeadPage.iProcDest = 80;

    // GmPlay.x_wav.StartBackMusic("start", true);

    // LeadPage.iProcDest=100;

    GmPlay.bInited = true;
    LeadPage.iProcDest = 100;
  }

  GmTimer() {
    //ExtHelp.Open();
    GmPlay.iNowMillis = XDefine.get_ms();
    GmPlay.ResetSound();
    var i, j;
    //XDefine.sop("timer"+Laya.stage.width+","+Laya.stage.height);
    if (MapManager.gi().iMapChangeing == 0) {
      // && !ProgressBar.gi().bShow)
      this.ProcTouch();
    } else {
      TouchManager.gi().clear();
      SteeringWheel.sw.bLocked = false;
    }
    //M3DFast.pm3f.FillRect(100,100,50,50,0xffffff,1,50);
    XStat.gi().Draw();

    if (XStat.gi().bGameing()) {
      FastGoods.gi().Draw();
    }
    MyAI.gi().AILogic();

    PublicChat_SmallFrame.gi().DrawSpeaker(); // 小喇叭
    BeginersGuide.gi().Draw();
    ProgressBar.gi().Draw();

    if (MapManager.gi().iMapChangeing > 0) {
      i = MapManager.gi().iMapChangeing % 100;
      i = (i * 29) << 24;
      this.xm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, i);
      // sop("ccc"+i);
      if (MapManager.gi().iMapChangeing >= 100) {
        if (MapManager.gi().iMapChangeing < 108)
          MapManager.gi().iMapChangeing++;
      } else {
        MapManager.gi().iMapChangeing--;
      }
    }

    if (GmPlay.xntf != null) {
      GmPlay.xntf.NetLogic();
      /*
				if (GmPlay.xntf.bAllow)
				{
					
					// sop("stat"+GmPlay.xntf.iConnectingStat+" ,delay"+GmPlay.xntf.iLastConnectDelay);
					GmPlay.xntf.iLastConnectDelay++;
					if (GmPlay.xntf.iLastConnectDelay > 300) {
						GmPlay.xntf.CloseClient();
						GmPlay.xntf.bReconnect = true;
						GmPlay.xntf.iLastConnectDelay = 0;
						EasyMessage.easymsg.AddMessage("断线重连");

						// FrameMessage.fm.Open("10秒断线重连");
					}
				}
				if (GmPlay.xntf.iLastConnectDelay > GmPlay.xntf.iMaxConnectDelay)	GmPlay.xntf.iMaxConnectDelay = GmPlay.xntf.iLastConnectDelay;
				*/
    }
    /*			if (GmConfig.bDebug) {
				for (i = 0; i < XStat.gi().iStatPoint + 1; i++) {
					this.xm3f.DrawTextEx(GmConfig.SCRW, 100 + i * 30, ""
							+ XStat.gi().iStatStack[i] + "[" + i + "]",
							0xffffffff, 30, 50, 1, 1, 0, -3, -1);
				}
				// this.xm3f.DrawTextEx(GmConfig.SCRW,GmConfig.SCRH-30,"["+GmPlay.xntf.iConnectingStat+"]"+GmPlay.xntf.iLastConnectDelay+"/"+GmPlay.xntf.iMaxConnectDelay,0xffffffff,30,50,1,1,0,-3,-1);

				// GmPlay.xani_pets[0].DrawAnima(200, 200, "战斗站立_左", 0);
				XDefine.ShowFM();
			}
			// XDefine.ShowFM();
			// XDefine.ShowFM();
			//
			// M3DFast.xm3f.DrawTextEx(0, 0,
			// "NativeHeapSizeTotal:"+Debug.getNativeHeapSize()/1024,
			// 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
			// M3DFast.xm3f.DrawTextEx(0, 30,
			// "NativeAllocatedHeapSize:"+Debug.getNativeHeapAllocatedSize()/1024,
			// 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
			// M3DFast.xm3f.DrawTextEx(0, 60,
			// "NativeAllocatedFree:"+Debug.getNativeHeapFreeSize()/1024,
			// 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
			// GmPlay.sop("NativeHeapSizeTotal:"+(Debug.getNativeHeapSize()>>10));
			// GmPlay.sop("NativeAllocatedHeapSize:"+(Debug.getNativeHeapAllocatedSize()>>10));
			// GmPlay.sop("NativeAllocatedFree:"+(Debug.getNativeHeapFreeSize()>>10));
*/ this.OnReceive();
    GmPlay.iDelay++;
    // if(1==1)return;

    FrameMessageEx.fm.Draw();
    FrameMessage.fm.Draw();
    EasyMessage.easymsg.Draw();
    // this.xm3f.DrawText(100, 100, "ookk="+this.gi().SCRW+","+this.gi().SCRH,
    // 0xffffff00);

    BeginersGuide.gi().InitGuide();

    if (this.bCheck) {
      // 画头像
      var x, y, w, h;
      w = 150 * 4;
      h = 200;
      x = (GmConfig.SCRW - w) / 2;
      y = (GmConfig.SCRH - h) / 2;

      // j=GmPlay.iDelay%120;
      // if(j>60)j=120-j;
      // if(j<60)j+=20;
      // else j=(120-j)+20;
      // this.xm3f.FillRect_2D(x, y, x+w, y+h, j<<24);
      this.xm3f.FillRect_2D(x, y, x + w, y + h, 0x80000000);

      for (i = 0; i < 4; i++) {
        // j=(GmPlay.iDelay*6+i*30)%160;
        // if(j>80)j=160-j;
        j = 60;
        if (this.iCheckFace[i] == 0)
          GmPlay.xani_newrole[this.iCheckAnima[i]].InitAnimaWithName(
            "站立_下",
            GmPlay.aaa
          );
        else if (this.iCheckFace[i] == 1)
          GmPlay.xani_newrole[this.iCheckAnima[i]].InitAnimaWithName(
            "站立_上",
            GmPlay.aaa
          );
        else if (this.iCheckFace[i] == 2)
          GmPlay.xani_newrole[this.iCheckAnima[i]].InitAnimaWithName(
            "站立_左",
            GmPlay.aaa
          );
        else if (this.iCheckFace[i] == 3)
          GmPlay.xani_newrole[this.iCheckAnima[i]].InitAnimaWithName(
            "站立_右",
            GmPlay.aaa
          );
        else break;
        GmPlay.aaa.SetFrame(GmPlay.iDelay);
        if (this.iCheckRot[i] < 0)
          GmPlay.aaa.DrawEx(
            x + i * 150 + 150 / 2,
            y + 130,
            j,
            1,
            1,
            360 + this.iCheckRot[i],
            -1,
            -1
          );
        else
          GmPlay.aaa.DrawEx(
            x + i * 150 + 150 / 2,
            y + 130,
            j,
            1,
            1,
            this.iCheckRot[i],
            -1,
            -1
          );
      }
      if (this.iCheckLast > 0) {
        this.iCheckLast--;
        this.xm3f.DrawTextEx(
          x + 150 * 2,
          y + h - 30,
          "等待" + parseInt(this.iCheckLast / 15),
          0xffffffff,
          30,
          101,
          1,
          1,
          0,
          -2,
          -2
        );
      } else {
        if ((GmPlay.iDelay / 5) % 2 == 0)
          this.xm3f.DrawTextEx(
            x + 150 * 2,
            y + h - 30,
            "选择一个面向你的角色",
            0xffffffff,
            30,
            101,
            1,
            1,
            0,
            -2,
            -2
          );
      }
    }
    if (this.bCheck2) {
      // 成语验证
      this.xm3f.FillRect_2D(
        this.C2X,
        this.C2Y,
        this.C2X + this.C2W + 100,
        this.C2Y + this.C2H + 100,
        0x80000000
      );
      for (i = 0; i < 4; i++) {
        // 大小，方向，压扁w，h，颜色，x，y
        // this.xm3f.DrawTextEx(this.C2X+this.iCheckValue[i][5],this.C2Y+this.iCheckValue[i][6],
        // this.sCheckWord[i], this.iCheckValue[i][4],
        // this.iCheckValue[i][0], 101,
        // 0.01f*this.iCheckValue[i][2],
        // 0.01f*this.iCheckValue[i][3],
        // this.iCheckValue[i][1], -2, -2);
        this.xm3f.DrawTextEx(
          this.C2X + this.iCheckValue[i][5],
          this.C2Y + this.iCheckValue[i][6],
          this.sCheckWord[i],
          this.iCheckValue[i][4],
          this.iCheckValue[i][0],
          101,
          0.01 * this.iCheckValue[i][2],
          0.01 * this.iCheckValue[i][3],
          this.iCheckValue[i][1],
          this.C2X +
            this.iCheckValue[i][5] +
            0.005 * this.iCheckValue[i][2] * this.iCheckValue[i][0],
          this.C2Y +
            this.iCheckValue[i][6] +
            0.005 * this.iCheckValue[i][3] * this.iCheckValue[i][0]
        );
        this.iCheckValue[i][5] += this.iCheckValue[i][7];
        this.iCheckValue[i][6] += this.iCheckValue[i][8];
        if (this.iCheckValue[i][5] < 0) {
          if (this.iCheckValue[i][7] < 0)
            this.iCheckValue[i][7] = -this.iCheckValue[i][7];
        }
        if (this.iCheckValue[i][5] > this.C2W - this.iCheckValue[i][0]) {
          if (this.iCheckValue[i][7] > 0)
            this.iCheckValue[i][7] = -this.iCheckValue[i][7];
        }
        if (this.iCheckValue[i][6] < 0) {
          if (this.iCheckValue[i][8] < 0)
            this.iCheckValue[i][8] = -this.iCheckValue[i][8];
        }
        if (this.iCheckValue[i][6] > this.C2H - this.iCheckValue[i][0]) {
          if (this.iCheckValue[i][8] > 0)
            this.iCheckValue[i][8] = -this.iCheckValue[i][8];
        }
      }
      this.xm3f.DrawTextEx(
        this.C2X + 20,
        this.C2Y + this.C2H,
        "请按顺序点击文字组成成语",
        0xffffffff,
        30,
        101,
        1,
        1,
        0,
        0,
        0
      );
      for (i = 0; i < this.iCRP; i++) {
        j = this.iCheckResult[i];
        this.xm3f.DrawTextEx(
          this.C2X + 20 + 80 * i,
          this.C2Y + this.C2H + 40,
          this.sCheckWord[j],
          this.iResultValue[i][4],
          this.iResultValue[i][0],
          101,
          0.01 * this.iResultValue[i][2],
          0.01 * this.iResultValue[i][3],
          this.iResultValue[i][1],
          this.C2X +
            20 +
            80 * i +
            0.005 * this.iResultValue[i][2] * this.iResultValue[i][0],
          this.C2Y +
            this.C2H +
            10 +
            0.005 * this.iResultValue[i][3] * this.iResultValue[i][0]
        );
      }
      this.btn_checkreset.Draw();
      this.btn_checkok.Draw();
    }

    PublicInterface.gi().Draw();
  }
  ProcTouch() {
    var msg, x, y;
    while (TouchManager.gi().poptouch()) {
      msg = TouchManager.gi().procing.iTouchStat;
      x = TouchManager.gi().procing.iX;
      y = TouchManager.gi().procing.iY;
      //XDefine.sop("p  x="+x+",y="+y);
      if (
        PublicInterface.gi().ProcTouch(
          TouchManager.gi().procing.iTouchStat,
          TouchManager.gi().procing.iX,
          TouchManager.gi().procing.iY
        )
      )
        continue;
      if (this.bCheck2) {
        var i, j;
        if (this.btn_checkok.ProcTouch(msg, x, y)) {
          if (this.btn_checkok.bCheck()) {
            // 提交结果
            this.bCheck2 = false;
            GmProtocol.gi().s_Check2Reply(
              this.iCheckResult[0] * 1000 +
                this.iCheckResult[1] * 100 +
                this.iCheckResult[2] * 10 +
                this.iCheckResult[3]
            );
          }
          return true;
        }
        if (this.btn_checkreset.ProcTouch(msg, x, y)) {
          if (this.btn_checkreset.bCheck()) {
            // 重新点击
            this.iCRP = 0;
            this.iCheckResult[0] = 0;
            this.iCheckResult[1] = 0;
            this.iCheckResult[2] = 0;
            this.iCheckResult[3] = 0;
          }
          return true;
        }
        if (TouchManager.gi().procing.iTouchStat == 1) {
          for (i = 0; i < 4; i++) {
            if (
              XDefine.bInRect(
                TouchManager.gi().procing.iX,
                TouchManager.gi().procing.iY,
                this.C2X + this.iCheckValue[i][5],
                this.C2Y + this.iCheckValue[i][6],
                80,
                80
              )
            ) {
              if (this.iCRP < 4) {
                this.iCheckResult[this.iCRP] = i;
                for (j = 0; j < 7; j++)
                  this.iResultValue[this.iCRP][j] = this.iCheckValue[i][j];
                this.iCRP++;
                // 记录文字，改变所有
                this.ResetCheckValue();
              }
            }
          }
        }
        return true;
      }
      if (this.bCheck) {
        var i, xx, yy, w, h;
        w = 150 * 4;
        h = 200;
        xx = (GmConfig.SCRW - w) / 2;
        yy = (GmConfig.SCRH - h) / 2;
        for (i = 0; i < 4; i++) {
          if (this.iCheckLast > 0) break;
          if (TouchManager.gi().procing.iTouchStat == 3) {
            if (
              XDefine.bInRect(
                TouchManager.gi().procing.iX,
                TouchManager.gi().procing.iY,
                xx + i * 150,
                yy,
                150,
                200
              )
            ) {
              if (this.iCheckFace[i] == 0) {
                this.bCheck = false;
                GmProtocol.gi().s_CheckReply(i);
              } else {
                GmPlay.xntf.bAllow = false;
                if (XStat.gi().iXStat != XStat.GS_KICKOUT)
                  XStat.gi().PushStat(XStat.GS_KICKOUT);
                XStat.gi().LastStat(0).sDetail = this.sCheckError;
                this.bCheck = false;
                // XDefine.Exit();
              }
            }
          }
        }

        return true;
      }
      if (
        BeginersGuide.gi().ProcTouch(
          TouchManager.gi().procing.iTouchStat,
          TouchManager.gi().procing.iX,
          TouchManager.gi().procing.iY
        )
      )
        continue;

      if (
        FrameMessage.fm.ProcTouch(
          TouchManager.gi().procing.iTouchStat,
          TouchManager.gi().procing.iX,
          TouchManager.gi().procing.iY
        )
      )
        continue;
      if (
        FrameMessageEx.fm.ProcTouch(
          TouchManager.gi().procing.iTouchStat,
          TouchManager.gi().procing.iX,
          TouchManager.gi().procing.iY
        )
      )
        continue;
      XStat.gi().ProcTouch(
        TouchManager.gi().procing.iTouchStat,
        TouchManager.gi().procing.iX,
        TouchManager.gi().procing.iY,
        TouchManager.gi().procing.iSourceX,
        TouchManager.gi().procing.iSourceY
      );
    }
    return false;
  }
  ResetCheckValue() {
    var i;
    for (i = 0; i < 4; i++) {
      this.iCheckValue[i][0] = XDefine.GetRand(60, 80); // 大小
      if (XDefine.GetRand(0, 1) == 0)
        this.iCheckValue[i][1] = XDefine.GetRand(0, 30);
      else this.iCheckValue[i][1] = XDefine.GetRand(330, 360);
      this.iCheckValue[i][2] = XDefine.GetRand(50, 100); // w缩放
      this.iCheckValue[i][3] = XDefine.GetRand(50, 100); // h缩放
      this.iCheckValue[i][4] =
        0xff000000 |
        (XDefine.GetRand(128, 255) << 16) |
        (XDefine.GetRand(128, 255) << 8) |
        XDefine.GetRand(128, 255); // 颜色
      this.iCheckValue[i][5] = XDefine.GetRand(0, this.C2W);
      this.iCheckValue[i][6] = XDefine.GetRand(0, this.C2H);
      this.iCheckValue[i][7] = XDefine.GetRand(2, 4);
      this.iCheckValue[i][8] = 6 - this.iCheckValue[i][7];
      if (XDefine.GetRand(0, 1) == 0)
        this.iCheckValue[i][7] = -this.iCheckValue[i][7];
      if (XDefine.GetRand(0, 1) == 0)
        this.iCheckValue[i][8] = -this.iCheckValue[i][8];
    }
  }
  OnReceive() {
    if (GmPlay.xntf == null) return;
    var iid = 0;
    var pls = this.pls;
    while (GmPlay.xntf.GetQueue()) {
      XDefine.arraycopy(
        GmPlay.xntf.msg.recvout.data,
        0,
        pls.databuf,
        0,
        GmPlay.xntf.msg.recvout.iSize
      );
      pls.iOffset = 0;
      pls.iLength = GmPlay.xntf.msg.recvout.iSize;
      //this.pls.SetDataAndOffset(GmPlay.xntf.msg.recvout.data, 0,GmPlay.xntf.msg.recvout.iSize);
      iid = pls.GetNextShort();

      // sop1("iid="+iid+"="+GmPlay.xntf.msg.recvout.iSize);
      //				 sop("-----------------------------------Recv msg : "+iid);
      if (iid != 503 && iid != 2032)
        XDefine.sop("------------------Recv msg : " + iid);
      this.OnReceiveOrder(iid);
    }
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  OnReceiveOrder(id) {
    var i, j, k, m, n, o, p, q;
    var ts1, ts2;
    var pls = this.pls;
    switch (id) {
      case 500: // 得到基本的Aid,session,pid
        GmProtocol.gi().GetBase(pls);
        GmPlay.bConnected = true;
        GmProtocol.gi().s_CheckVersion();
        break;
      case 502: // 同步心跳,游戏开始后提交自己当前位置和前行路径
        // if(XStat.gi().bGameing())GmProtocol.gi().s_UploadMyPos();
        break;
      case 503:
        GmProtocol.gi().iEchoId = pls.GetNextByte();
        GmPlay.xntf.msg.startmessage.data[
          GmPlay.xntf.msg.startmessage.iSize - 1
        ] = GmProtocol.gi().iEchoId;
        //	GmPlay.sop("eid"+GmProtocol.gi().iEchoId);
        break;
      case 510: // 版本号检测回复
        console.log("下线510");
        i = pls.GetNextByte();
        XRecordFast.iClientID = pls.GetNextInt();
        // GmPlay.sop("XRecordFast.iClientID="+XRecordFast.iClientID);
        if (i == 0) {
          // 客户端版本号不符
          GmPlay.xntf.bAllow = false;
          XStat.gi().PushStat(XStat.GS_KICKOUT);
          XStat.gi().LastStat(0).sDetail =
            "当前游戏版本号过低，请下载最新版本的游戏后重新登录，点击确定按钮退出游戏";
        }
        break;
      case 511: // 顶号，掉线，被踢
        this.bCheck = false;
        this.bCheck2 = false;
        GmPlay.xntf.bAllow = false;
        if (XStat.gi().iXStat == XStat.GS_KICKOUT) break;
        XStat.gi().PushStat(XStat.GS_KICKOUT);
        XStat.gi().LastStat(0).sDetail = pls.GetNextString();
        // FrameMessage.fm.Open(pls.GetNextString());
        break;
      case 512: // 客户端弹框验证
        for (i = 0; i < 4; i++) {
          this.iCheckFace[i] = XDefine.GetRand(1, 3);
          this.iCheckAnima[i] = XDefine.GetRand(0, 5);
          this.iCheckRot[i] = XDefine.GetRand(0, 60) - 30;
        }
        this.iCheckFace[pls.GetNextByte()] = 0;
        this.iCheckLast = 80;
        this.bCheck = true;
        break;
      case 513: // 改变IP，端口
        ts1 = pls.GetNextString();
        m = pls.GetNextInt();
        GmPlay.xntf.ResetSever(ts1, m);
        break;
      case 514: // 成语验证
        this.C2W = GmConfig.SCRW / 2;
        this.C2H = GmConfig.SCRH / 2;
        this.C2X = (GmConfig.SCRW - this.C2W) / 2;
        this.C2Y = (GmConfig.SCRH - this.C2H) / 2;
        this.iCRP = 0;
        for (i = 0; i < 4; i++) {
          this.sCheckWord[i] = pls.GetNextString();
          this.iCheckResult[i] = 0;
        }
        this.ResetCheckValue();
        if (this.btn_checkok == null) {
          // 初始化两个按钮
          this.btn_checkok = new XButton(GmPlay.xani_ui);
          this.btn_checkok.InitButton("统一大按钮2");
          this.btn_checkok.sName = "确定";

          this.btn_checkreset = new XButton(GmPlay.xani_ui);
          this.btn_checkreset.InitButton("统一大按钮2");
          this.btn_checkreset.sName = "重置";
        }
        // this.btn_checkok.Move(this.C2X+this.C2W-20-80, this.C2Y+this.C2H+20, 80, 50);
        // this.btn_checkreset.Move(this.C2X+this.C2W-20-80-20-80, this.C2Y+this.C2H+20, 80,
        // 50);
        this.btn_checkok.Move(
          this.C2X + this.C2W,
          this.C2Y + this.C2H - 20 - 50,
          80,
          50
        );
        this.btn_checkreset.Move(this.C2X + this.C2W, this.C2Y + 20, 80, 50);

        this.bCheck2 = true;
        break;
      case 515: // 路障
        GmPlay.iTraverse = pls.GetNextInt(); // 障碍
        if (GmPlay.iTraverse == 1) {
          // 去除障碍
          MapManager.gi().RemoveTraverse(0);
        }
        break;
      case 1000: // regist
        if (
          XStat.gi().LastStatType(0) != XStat.GS_LOADING1 ||
          XStat.gi().LastStatType(1) != XStat.GS_REGIST
        )
          break;
        i = pls.GetNextByte();
        if (i == 1) {
          // 注册成功,转为登录页面
          ts1 = XStat.gi().LastStat(1).in_user.sDetail;
          ts2 = XStat.gi().LastStat(1).in_pass.sDetail;
          XStat.gi().PopStat(2);
          XStat.gi().PushStat(XStat.GS_LOGIN);
          XStat.gi().PushStat(XStat.GS_MESSAGE1);
          XStat.gi().LastStat(1).in_user.sDetail = ts1;
          XStat.gi().LastStat(1).in_pass.sDetail = ts2;
          XStat.gi().LastStat(0).sDetail = "注册成功，进入登录页面";
        } else {
          // 注册失败
          XStat.gi().PopStat(1);
          XStat.gi().PushStat(XStat.GS_MESSAGE1);
          XStat.gi().LastStat(0).sDetail = pls.GetNextString();
        }
        break;
      case 1001: // 登录
        i = pls.GetNextByte();
        if (i == 1) {
          // 登录成功,转为选择角色页面
          if (GameVersion.QUDAO == 31)
            PublicInterface.gi().proc_extend(
              "uc_get_acid",
              0,
              pls.GetNextString()
            );
          if (XRecordFast.iHaveSeverRecord == 0) {
            // 没有服务器记录,打开选择服务器列表
            GmProtocol.gi().s_GetSeverList(100);
          } else {
            // 有服务器记录，根据记录获得区服下的玩家列表
            GmProtocol.gi().s_GetRoleList(
              XRecordFast.iLastSector,
              XRecordFast.iLastSever
            );
            // XStat.gi().PopStat(1);
            // XStat.gi().PushStat(XStat.GS_SELECTROLE);
          }
          PublicInterface.gi().iStat = 10;
          XDefine.sop("登陆成功");
        } else {
          // 登录失败
          XStat.gi().PopStat(1);
          Message1.Open(pls.GetNextString());
        }
        break;
      case 1006: // 接收到角色列表
        GmMe.me.iRid = 0;
        SelectRole.Open(pls);
        break;
      case 1003: // 接收到服务器列表
        // sop("1003");
        // SelectSever.Open(pls);
        break;
      case 1002: // 新的服务器列表
        // sop("1002");
        SelectSever.Open(pls);
        // PublicInterface.gi().Exit();
        break;
      case 1004: // 接收到创建角色回复
        if (
          XStat.gi().LastStatType(0) != XStat.GS_LOADING1 ||
          XStat.gi().LastStatType(1) != XStat.GS_CREATEROLE
        )
          break;
        j = pls.GetNextByte();
        // sop("1004 result = "+j+","+pls.GetNextString());
        if (j == 0) {
          // 创建角色成功，重新获得角色列表，返回选择角色登录页面
          pls.GetNextString();
          GmProtocol.gi().s_StartGame(pls.GetNextInt()); // rid
          // GmProtocol.gi().s_getrolelist();
          // XStat.gi().PopStat(3);
          // XStat.gi().PushStat(XStat.GS_LOADING1);
        } else {
          // 创建角色失败
          EasyMessage.easymsg.AddMessage(pls.GetNextString());
          XStat.gi().PopStat(1);
          // FrameMessage.fm.Open(pls.GetNextString());
        }
        break;
      case 1005: // 进入游戏回复
        // if(XStat.gi().LastStatType(0)!=XStat.GS_LOADING1 ||
        // XStat.gi().LastStatType(1)!=XStat.GS_SELECTROLE)break;
        console.log("进入游戏:", GmMe.me.iRace, GmMe.me.iSex);
        j = pls.GetNextByte();
        if (j == 0) {
          // 登录成功,重置服务器
          GmProtocol.gi().iUid = pls.GetNextInt(); // rid
          GmProtocol.gi().iPid = pls.GetNextInt();

          ts1 = pls.GetNextString();
          m = pls.GetNextInt();

          GmProtocol.gi().iEchoId = 0;
          GmProtocol.gi().set_Head();

          console.log("重置链接：", PublicInterface.QUDAO);
          if (PublicInterface.QUDAO == 0) {
            GmPlay.xntf.ResetSever("ws://" + ts1 + ":" + m);
            GmPlay.xntf.onClose();
          } else {
            const url = "wss://login.qi-guo.cn/game" + m;
            GmPlay.xntf.ResetSever(url);
            console.log("server:", url);
          }
          // GmPlay.xntf.ResetSever("ws://121.40.40.172:11000/game" + m);

          //GmPlay.xntf.ResetSever("ws://"+ts1+":"+m);
          // sop1("ip="+tip+",,,port="+tport);
          XStat.gi().ResetStat();
          XStat.gi().PushStat(XStat.GS_GAMEING);
          XStat.gi().PushStat(XStat.GS_LOADING2);

          // if(XRecordFast.iExtHelp==0)ExtHelp.Init("欢迎来到七国，我是琴清，下面我将带您熟悉游戏#e(老玩家可在系统设置关闭引导)",
          // 0, 1, "普通引导", 0, 2, "语音引导", 1,3 , "跳过引导");
          if (XRecordFast.iQQSay == 0) {
            ExtHelp.Initex(
              "欢迎来到七国，我是琴清，下面我将带您熟悉游戏#e#cff0000老玩家可在系统设置关闭引导",
              0,
              1,
              "普通引导",
              0,
              2,
              "语音引导",
              1,
              1,
              "确定"
            );
            XRecordFast.iQQSay++;
          }

          //						if (XRecordFast.iFirstOpen)
          {
            if (GmConfig.SYSW >= 1280) {
              //SystemOperate.iScreenLS=400;//最大缩放，高清
              SystemOperate.iScreenLS =
                ((1280 - 800) * 400) / (GmConfig.SYSW - 800);
            } else {
              SystemOperate.iScreenLS =
                ((GmConfig.SYSW - 800) * 400) / (1280 - 800);
            }
            SystemOperate.iSameRate = 0;
          }
          console.log("登录成功");
          // 发送本地设置到服务器
          GmProtocol.gi().s_UseSkill(
            100,
            SystemOperate.iNearRoleCount,
            0,
            0,
            0,
            0,
            0
          );
        } else if (j == 5) {
          // 失败
          console.log("登录失败");
          XStat.gi().PopStat(1);
          XStat.gi().PushStat(XStat.GS_MESSAGE1);
          XStat.gi().objstack[XStat.gi().iStatPoint].sDetail =
            "进入失败，联系GM";
        }
        break;
      case 1007: // 获得随机名字
        CreateRole.GetRandName(pls);
        break;
      case 1100: // 渠道返回的信息
        PublicInterface.gi().OnReceive(pls);
        break;
      // //////////////
      case 2000: // 角色所在位置更新
        i = pls.GetNextInt(); // mapid
        j = pls.GetNextInt();
        // GmPlay.sop("Map ChangeTo:"+i+Gameing.gameing.m_map.IdToName(i));
        GmMe.me.iX = pls.GetNextInt();
        GmMe.me.iY = pls.GetNextInt();
        GmMe.me.iDx = GmMe.me.iX;
        GmMe.me.iDy = GmMe.me.iY;

        //MapManager.gi().vbk.ClearVisual();
        Gameing.gameing.m_map.LoadMap(
          i,
          j,
          Gameing.gameing.me.iX,
          Gameing.gameing.me.iY
        );
        MapManager.gi().mapdata.sMapDetail = pls.GetNextString();
        MapManager.gi().iKeepDetialAsMapId = i;
        MapManager.gi().mapdata.iMapFlag = pls.GetNextInt();
        if ((MapManager.gi().mapdata.iMapFlag & 1) != 0)
          MapManager.gi().vbk.ClearVisual();
        Gameing.gameing.me.ChangeStat("站立");
        // for(j=0;j<100;j++)sop("2000"+i+Gameing.gameing.m_map.IdToName(i));
        for (i = 0; i < GmMe.MAXMARK; i++) {
          Gameing.gameing.me.iMarks[i][0] = Gameing.gameing.me.iX;
          Gameing.gameing.me.iMarks[i][1] = Gameing.gameing.me.iY;
          Gameing.gameing.me.iMarks[i][2] = Gameing.gameing.me.iFace8;
        }
        // GmProtocol.gi().pat=pls.GetNextInt();
        // GmProtocol.gi().pos1=XDefine.get_ms();
        break;
      case 2001: // 角色基本信息更新，不可变的
        console.log("角色信息更新");
        GmMe.me.getinit(pls);
        GmProtocol.gi().s_CheckVersion();
        PublicInterface.gi().mta_record(6, 0, "");
        break;
      case 2002: // 可能改变的
        GmMe.me.GetBaseAtt(pls);
        break;
      case 2003: // 门派技能等级
        GmMe.me.getschoolskill(pls);
        break;
      case 2004: // 帮派技能等级
        GmMe.me.getgovskill(pls);
        break;
      case 2005: // 帮派修炼等级
        GmMe.me.getgovxiu(pls);
        break;
      case 2006: // getflag
        GmMe.me.getflag(pls);
        break;
      case 2007: // 称谓
        if (XStat.gi().LastStatType(0) == XStat.GS_SETTITLE) {
          XStat.gi().LastStat(0).getlist(pls);
        }
        break;
      case 2008: // 改名成功
        GmMe.me.sName = pls.GetNextString();
        break;
      case 2009: // retext
        GmMe.me.GetExt(pls);
        break;
      case 2020: // 公聊
        PublicChat_SmallFrame.gi().GetMessage(pls);
        break;
      case 2021: // 取得好友列表
        FriendList.gi().GetFriends(pls);
        break;
      case 2022:
        //					i=pls.iOffset;
        //					for(j=0;j<50;j++)
        {
          //						pls.iOffset=i;
          PrivateChatWatch.gi().GetPrivateMessage(pls);
        }
        break;
      case 2030: // 切换地图(强制)
        //XStat.gi().PushStat(XStat.GS_LOADING2);
        i = pls.GetNextInt(); // mapid
        j = pls.GetNextInt(); // visualmapid
        GmMe.me.iX = pls.GetNextInt();
        GmMe.me.iY = pls.GetNextInt();
        if (MapManager.gi().iCurrentMapId != i) {
          MapManager.gi().vbk.ClearVisual();
        } else {
          if (MapManager.gi().iMapChangeing >= 100)
            MapManager.gi().iMapChangeing -= 100; // 变亮
          return;
        }

        console.log("地图传送:", this.getTime());

        MapManager.gi().LoadMap(i, j, GmMe.me.iX, GmMe.me.iY);
        MapManager.gi().mapdata.sMapDetail = pls.GetNextString();
        MapManager.gi().iKeepDetialAsMapId = i;
        MapManager.gi().mapdata.iMapFlag = pls.GetNextInt();
        //console.log('MapManager.gi().mapdata.iMapFlag:',MapManager.gi().mapdata.iMapFlag)
        if ((MapManager.gi().mapdata.iMapFlag & 1) != 0)
          MapManager.gi().vbk.ClearVisual();

        GmMe.me.ChangeStat("站立");
        // EasyMessage.easymsg.AddMessage("map change to "+i);
        for (i = 0; i < GmMe.MAXMARK; i++) {
          Gameing.gameing.me.iMarks[i][0] = Gameing.gameing.me.iX;
          Gameing.gameing.me.iMarks[i][1] = Gameing.gameing.me.iY;
          Gameing.gameing.me.iMarks[i][2] = Gameing.gameing.me.iFace8;
        }
        // 清空附近玩家列表
        i = 0;
        for (j = 0; j < Gameing.iNearMax; j++) {
          Gameing.gameing.nrs[j].bUseing = false;
        }
        if (MapManager.gi().iMapChangeing >= 100)
          MapManager.gi().iMapChangeing -= 100; // 变亮
        // if(XStat.gi().LastStatType(0)!=XStat.GS_GAMEING)XStat.gi().PopStat(1);

        // setTimeout(()=>{
        // 	if (XStat.gi().LastStatType(0) != XStat.GS_GAMEING)
        // 		XStat.gi().PopStat(1);
        // 	},1500)
        break;
      case 2031: // 在队伍中被迫更新目标
        i = pls.GetNextInt();
        j = pls.GetNextInt();
        if (i != GmMe.me.iX || j != GmMe.me.iY) {
          MapManager.gi().mfy.iPath[0][0] = GmMe.me.iX;
          MapManager.gi().mfy.iPath[0][1] = GmMe.me.iY;
          MapManager.gi().mfy.iPath[1][0] = i;
          MapManager.gi().mfy.iPath[1][1] = j;
          MapManager.gi().mfy.iPathDeep = 2;
          MapManager.gi().vbk.iGoToNpcFlag = -1;
          MapManager.gi().vbk.iGoToNpcId = -1;
          GmMe.me.start(
            MapManager.gi().mfy.iPath,
            MapManager.gi().mfy.iPathDeep
          );
        }
        break;
      case 2032: // 附近玩家更新
        // m=pls.GetNextInt();
        // if(m!=MapManager.gi().iCurrentMapId)break;
        m = 0;
        var pnr;
        var bNew;
        i = pls.GetNextInt();
        while (i > 0) {
          // 有附近玩家数据更新
          bNew = false;
          for (j = 0; j < Gameing.iNearMax; j++) {
            if (
              Gameing.gameing.nrs[j].bUseing &&
              Gameing.gameing.nrs[j].iRid == i
            )
              break;
          }
          if (j >= Gameing.iNearMax) {
            // 没找到，新放入
            for (j = 0; j < Gameing.iNearMax; j++) {
              if (!Gameing.gameing.nrs[j].bUseing) break;
            }
            if (j >= Gameing.iNearMax) {
              // 没找到空闲的!!!
              j = 0;
            }
            bNew = true;
            Gameing.gameing.nrs[j].bUseing = true;
            Gameing.gameing.nrs[j].iRid = i;
            Gameing.gameing.nrs[j].iPopoDelay = 0;
            Gameing.gameing.nrs[j].sTitle = "";
            Gameing.gameing.nrs[j].iFollowPid = 0;
            Gameing.gameing.nrs[j].iFollowTid = 10000;
          }
          pnr = Gameing.gameing.nrs[j];

          j = pls.GetNextByte();
          if ((j & 1) != 0) {
            pnr.iDx = pls.GetNextShort();
            pnr.iDy = pls.GetNextShort();
            // sop("xx="+pnr.iDx+"yy="+pnr.iDy);
          }
          if ((j & 2) != 0) {
            pnr.iFighting = pls.GetNextByte();
          }
          if ((j & 4) != 0) pnr.iIsLeader = pls.GetNextByte();
          if ((j & 8) != 0) {
            pnr.sName = pls.GetNextString();
            k = pls.GetNextByte();
            pnr.iSex = parseInt(k / 10);
            pnr.iRace = k % 10;
            pnr.bsc = true;
          }
          if ((j & 16) != 0) pnr.iDFaceTo = pls.GetNextByte();
          if ((j & 32) != 0) {
            k = pls.GetNextByte();
            if ((k & 1) == 0) pnr.iIsSelling = 0;
            else {
              pnr.iIsSelling = 1;
              pnr.sSellName = pls.GetNextString();
            }
            if ((k & 2) == 0) pnr.iIsVip = 0;
            else pnr.iIsVip = 1;
            if ((k & 4) == 0) pnr.iDChangeType = 0; // 变身状态
            else pnr.iDChangeType = pls.GetNextShort();
            if ((k & 8) == 0) {
              pnr.iColor[0] = 0; //无染色
              pnr.iColor[1] = 0;
              pnr.iColor[2] = 0;
              pnr.iColor[3] = 0;
              pnr.iColor[4] = 0;
              pnr.iColor[5] = 0;
            } else {
              //分解各部位颜色
              n = pls.GetNextShort(); //染色
              pnr.iColor[0] = n & 7;
              pnr.iColor[1] = (n >> 3) & 7;
              pnr.iColor[2] = (n >> 6) & 7;
              pnr.iColor[3] = (n >> 9) & 7;
              pnr.iColor[4] = (n >> 12) & 7;
            }
            if ((k & 16) == 0) pnr.iAura = 0; // 光环
            else pnr.iAura = pls.GetNextShort();
          }
          if ((j & 64) != 0) {
            // 坐骑id*10000+武器id
            pnr.iDMountsTid = pls.GetNextShort();
            k = pls.GetNextInt();
            pnr.iDWeapTid = k % 10000;
            pnr.bwc = true;
            k = pls.GetNextShort();
            pnr.iSchoolId = parseInt(k / 1000);
            pnr.iLev = k % 1000;
            pnr.sTitle = pls.GetNextString();

            pnr.iFollowPid = pls.GetNextInt();
            pnr.iFollowTid = pls.GetNextShort();
            pnr.sFollowName = pls.GetNextString();
          }
          if (bNew) {
            pnr.iX = pnr.iDx;
            pnr.iY = pnr.iDy;
            pnr.SetMarks();
            pnr.iFaceTo = pnr.iDFaceTo;
            pnr.bfc8 = true;
            // GmPlay.sop(pnr.sName+pnr.iDFaceTo);
            // EasyMessage.easymsg.AddMessage("新入坐标:"+pnr.sName+","+pnr.iX+","+pnr.iY);
            // EasyMessage.easymsg.AddMessage(""+m+","+MapManager.gi().iCurrentMapId);
          }
          // else
          // EasyMessage.easymsg.AddMessage("更新坐标"+pnr.iDx+","+pnr.iDy);
          if ((j & 128) != 0) {
            pnr.bUseing = false;
            m++;
            if (bNew) GmPlay.sop1("m error");
          }

          i = pls.GetNextInt();
        }
        // GmPlay.sop1("release count : "+m+"  ,, "+GmPlay.xntf.msg.recvout.iSize);
        break;
      case 2033: //
        i = pls.GetNextByte();
        if (i == 3) TeamCreate.teamlist(pls); // 得到附近队伍列表
        else if (i == 1) TeamOperate.rolelist(pls); // 得到附近玩家列表
        else if (i == 2) TeamOperate.sZz = pls.GetNextString();
        else if (i == 4) {
          //创建队伍成功，打开队伍界面
          XStat.gi().PushStat(XStat.GS_TEAMOPERATE);
          //发送请求，获取附近玩家和申请列表
          GmProtocol.gi().s_TeamOperate(10, 0, 0);
        } else if (i == 5) {
          if (pls.GetNextByte() == 1) MyTeam.bSingleAutoTeaming = true;
          else MyTeam.bSingleAutoTeaming = false;
        }
        break;
      case 2034: // 直接改变坐标回去
        i = pls.GetNextInt();
        j = pls.GetNextInt();
        GmMe.me.iX = i;
        GmMe.me.iY = j;
        MapManager.gi().mfy.iPath[0][0] = GmMe.me.iX;
        MapManager.gi().mfy.iPath[0][1] = GmMe.me.iY;
        MapManager.gi().mfy.iPath[1][0] = GmMe.me.iX;
        MapManager.gi().mfy.iPath[1][1] = GmMe.me.iY;
        MapManager.gi().mfy.iPathDeep = 1;
        GmMe.me.ChangeStat("站立");
        break;
      case 2035: // 队伍成员id更新
        MyTeam.iTeamRid[0] = pls.GetNextInt();
        if (MyTeam.iTeamRid[0] == 0) MyTeam.iTmpTeamRid[0] = 0;
        else {
          for (i = 0; i < GmMe.MAXTEAMOLE; i++) {
            if (i > 0) MyTeam.iTeamRid[i] = pls.GetNextInt();
            MyTeam.iTmpTeamRid[i] = pls.GetNextInt();
            if (MyTeam.iTmpTeamRid[i] == 0) continue;

            MyTeam.sName[i] = pls.GetNextString();
            MyTeam.iRas[i] = pls.GetNextByte();
            MyTeam.iSchoolId[i] = pls.GetNextByte();
            MyTeam.iLev[i] = pls.GetNextShort();
            n = pls.GetNextShort(); //染色
            MyTeam.iColor[i][0] = n & 7;
            MyTeam.iColor[i][1] = (n >> 3) & 7;
            MyTeam.iColor[i][2] = (n >> 6) & 7;
            MyTeam.iColor[i][3] = (n >> 9) & 7;
            MyTeam.iColor[i][4] = (n >> 12) & 7;
            MyTeam.iWeapTid[i] = pls.GetNextShort();
            MyTeam.sMapName[i] = pls.GetNextString();
          }
          GmMe.iTeamZhen = pls.GetNextByte();
          MyTeam.iTeamTarget = pls.GetNextByte();
          GmMe.iTeamMap = pls.GetNextShort();
          MyTeam.iLev1 = pls.GetNextShort();
          MyTeam.iLev2 = pls.GetNextShort();
          if (pls.GetNextByte() == 1) MyTeam.bLeaderAutoTeaming = true;
          else MyTeam.bLeaderAutoTeaming = false;
          //						sop(",,,,,,,,,,,,,,"+GmMe.iTeamTarget+",,,,,,,,,,,,,"+GmMe.iTeamTarget);
        }
        // 如果当前状态时队伍页面，关闭后重新打开
        TeamOperate.CleanAnima();
        TeamZhen.CleanAnima();
        if (XStat.gi().LastStatType(0) == XStat.GS_TEAMCREATE)
          XStat.gi().PopStat(1);
        // if(XStat.gi().LastStatType(0)==XStat.GS_TEAMOPERATE)
        // {
        // XStat.gi().PopStat(1);
        // XStat.gi().PushStat(XStat.GS_TEAMOPERATE);
        // }
        break;
      case 2036: // 申请/邀请入队,
        i = pls.GetNextByte();
        if (i == 0) {
          // 有人申请入队
          TeamOperate.AddTeamRequest(pls);
          // GmMe.me.AddTeamRequest(pls.GetNextInt());
        } else if (i == 1) {
          // 有人邀请我入队
          GmMe.me.BeInvite(pls);
        }
        break;
      case 2040: // 更新所有物品
        MyGoods.gi().GetGoods(pls);
        break;
      case 2041: // 获得一个物品更新
        MyGoods.gi().UpdateOneGoods(pls);
        break;
      case 2043: // 初始化我的摆摊
        MySell.gi().InitSell(pls);
        break;
      case 2044: // 我的摊位物品索引
        MySell.gi().IndexSell(pls);
        break;
      case 2045: // 初始化购买索引
        MyBuy.gi().IndexBuy(pls);
        break;
      case 2046: // 临时背包
        TmpGoods.getgoods(pls);
        break;
      case 2047: // 销售记录
        MySell.gi().AddSellRecord(pls);
        break;
      case 2048:
        FastGoods.gi().PushGoods(pls);
        break;
      case 2049: //新物品
        NewShop.Open(pls);
        break;
      case 2050: // 更新所有宠物
        MyPets.mp.GetPets(pls);
        break;
      case 2051: // 更新一个宠物
        MyPets.mp.UpdateOnePet(pls);
        break;
      case 2052: // 更新宠物base
        MyPets.mp.GetPetBaseAtt(pls);
        break;
      case 2056: // 打开宠物仓库
        PetStoreFrame.Open(pls);
        break;
      case 2060: // 刷新地图上的npc
        MapManager.gi().vbk.getnpc(pls);
        break;
      case 2061: // 打开选择框
        MySelect.Open(pls);
        break;
      case 2062: // npc talk
        MapManager.gi().vbk.npctalk(pls);
        break;
      case 2063: // 清除一个npc
        MapManager.gi().vbk.clearnpc(pls);
        break;
      case 2064: // npc商店
        NpcShop.ns.FreshGoods(pls);
        break;
      case 2065: // npc move
        MapManager.gi().vbk.npcmove(pls);
        break;
      case 2066: // 元宝商城
        IngotMall.OPEN(pls);
        break;
      case 2067: //npc详细对话
        MapManager.gi().vbk.getnpctalkext(pls);
        break;
      case 2068: //服务器二次确认
        SevConfirm.Open(pls);
        break;
      case 2069: // 放烟花
        i = pls.GetNextInt();
        j = pls.GetNextInt();
        k = pls.GetNextByte();
        ts1 = pls.GetNextString();
        m = pls.GetNextInt();
        n = pls.GetNextInt();
        o = pls.GetNextByte();
        p = pls.GetNextInt();
        q = pls.GetNextInt();
        FireworksEffect.fe.AddFireworks(i, j, k, ts1, m, n, o, p, q);
        break;
      case 2070: // 任务索引
        MyMission.m.getmissionindex(pls);
        break;
      case 2071: // 任务详细
        MyMission.m.getmissiondetail(pls);
        MissionLead.gi().FreshMission();
        break;
      case 2072: // 删除一个任务
        MyMission.m.cleanclientmission(pls);
        MissionLead.gi().FreshMission();
        break;
      case 2080: // 帮派基本数据
        MyGov.mg.initmygov(pls);
        break;
      case 2081: // 打开申请入帮列表
        //					if (XStat.gi().iXStat != XStat.GS_APPLYFORGOV)
        //						XStat.gi().PushStat(XStat.GS_APPLYFORGOV);
        //
        //					ApplyForGov afg = (ApplyForGov) XStat.gi().LastStat(0);
        //					afg.ResetList(pls);
        break;
      case 2083: // 帮派数据返回
        if (XStat.gi().iXStat == XStat.GS_GOVFRAME) {
          var gf = XStat.gi().LastStat(0);
          gf.getgovdata(pls);
        } else if (XStat.gi().LastStatType(0) == XStat.GS_MEMBERDETAIL) {
          var md = XStat.x_stat.LastStat(0);
          md.getgovdata(pls);
        }
        break;
      case 2085: // 进入帮派地图特殊数据
        MapManager.gi().mapdata.sMapDetail = pls.GetNextString();
        MapManager.gi().iKeepDetialAsMapId = i;
        break;
      case 2088: // 打开帮派相关窗口
        MyGov.mg.govoperateframe(pls);
        // for(int zz=0;zz<100;zz++)GmPlay.sop("flagflagflag");
        break;
      case 2090: // 打开学习野外技能页面
        ExtLearnSkill.Open(pls);
        break;
      case 2093: // watchon
        if (XStat.gi().LastStatType(0) == XStat.GS_LOADING1)
          XStat.gi().PopStat(1);
        if (XStat.gi().LastStatType(0) == XStat.GS_FINDFRIEND)
          XStat.gi().PopStat(1);
        if (XStat.gi().LastStatType(0) != XStat.GS_WATCHON)
          XStat.gi().PushStat(XStat.GS_WATCHON);
        XStat.gi().LastStat(0).InitData(pls);
        break;
      case 2094:
        NoviceHelp.sDetail = pls.GetNextString();
        NoviceHelp.sTitle = pls.GetNextString();
        pls.GetNextData();
        NoviceHelp.sDetail = pls.DataToString();
        break;
      case 2095: //新帮派操作
        j = pls.GetNextByte();
        if (j == 0) ApplyForGov.Open(pls);
        else if (j == 1) ApplyForGov.Get(pls);
        else if (j == 2) ApplyForGov.Applyed(pls);
        else if (j == 3) NewGovFrame.Open(pls);
        else if (j == 5) NewGovFrame.InitMemberList(pls);
        else if (j == 6) NewGovFrame.InitMemberDetail(pls);
        else if (j == 7) NewGovFrame.ChangeJob(pls);
        else if (j == 9) NewGovFrame.ApplyList(pls);
        else if (j == 10) NewGovFrame.ApplyDetail(pls);
        else if (j == 11) NewGovFrame.ApplyCheck(pls);
        else if (j == 12) NewGovFrame.InitGovEvent(pls);
        else if (j == 13) NewGovFrame.InitEventDetail(pls);
        else if (j == 14) EntrustMission.GetMyMission(pls);
        else if (j == 15) EntrustMission.GetMyDetail(pls);
        else if (j == 17) EntrustMission.CancelEntrust(pls);
        else if (j == 18) NewGovManage.GetSet(pls);
        else if (j == 19) NewGovFrame.UpdateDetail(pls);
        else if (j == 21) HireTraderWorker.Open(pls);
        else if (j == 22) GovFBTarget.GetData(pls);
        break;
      case 2096: //获得2个点，巡逻路径
        MyAI.gi().getlogicpath(pls);
        break;
      case 2097: //特殊处理
        j = pls.GetNextByte();
        if (j == 0) MissionLead.gi().special_doyb();
        else if (j == 1) FuYuan.fy.bShow = true; //显示福源图标
        break;
      case 2010: // 开始交易
        MyTrade.mt.tradestart(pls);
        break;
      case 2011: // 关闭交易
        if (XStat.gi().iXStat == XStat.GS_MYTRADEFRAME) XStat.gi().PopStat(1);
        MyTrade.bCheckTradeing = false;
        break;
      case 2012: // 对方准备
        if (XStat.gi().iXStat == XStat.GS_MYTRADEFRAME)
          MyTrade.mt.tradeready(pls);
        break;
      case 2900: //
        i = pls.GetNextByte();
        if (i == 0) shop_BuyDrawing.Open(pls);
        else if (i == 1) shop_PeakFight.Open(pls);
        break;
      case 2100: // 更新本地坐骑
        MyMounts.mm.UpdateOneMounts(pls);
        break;
      case 2150: // land属性，耕地
        MyLand.ml.Init(pls);
        break;
      case 2151:
        MyLand.bShowBlock = true;
        break;
      case 2152: // 打开植物状态
        PlantFrame.Open(pls);
        break;
      case 2153: // 打开土地状态
        LandFrame.Open(pls);
        break;
      case 2205: // 初始化进入战斗
        while (
          XStat.gi().iXStat != XStat.GS_GAMEING &&
          XStat.gi().iXStat != XStat.GS_PRIVATECHAT &&
          XStat.gi().iXStat != XStat.GS_SENDPUBLICCHAT
        ) {
          XStat.gi().PopStat(1);
        }
        MapManager.gi().iMapChangeing = 0;
        MapManager.gi().mfy.iPathDeep = 0;
        GmMe.me.ChangeStat("站立");
        SystemOperate.SetScreenMode(10);
        XFight.gi().InitFight(pls);
        SystemOperate.SetScreenMode(11);
        SteeringWheel.sw.bLocked = false;
        break;
      case 2206: // 更新一个fat(召唤宠物)
        XFight.gi().updatefat(pls);
        break;
      case 2207: // 设置当前已召唤宠物和出战宠物
        XFight.gi().setpetused(pls);
        break;
      case 2202: // 战斗过程动画数据
        XFight.gi().getfightdata(pls); // 战斗数据
        break;
      case 2203: // 战斗结束
        XFight.gi().bFightFinished = true;
        break;
      case 2204: // 战斗标记，看是否已出手
        XFight.gi().getfightflag(pls);
        break;
      case 2208: //死亡提示
        DiePrompt.bOpen = true;
        pls.GetNextByte();
        DiePrompt.iLostExp = pls.GetNextInt();
        DiePrompt.iLostMoney = pls.GetNextInt();
        DiePrompt.sDetail = pls.GetNextString();
        break;
      case 2209: //更新装备耐久值
        for (m = 0; m < 6; m++) {
          i = pls.GetNextByte();
          if (i >= 64) break;
          j = pls.GetNextInt();
          k = pls.GetNextInt();
          if (MyGoods.gi().goods[1][i].iGid == j)
            MyGoods.gi().goods[1][i].iAtts[5] = k;
        }
        break;
      case 2301: // 新手问题列表
        NoviceQuestionList.getquestion(pls);
        break;
      case 2302: // 推送高手回答的问题
        NoviceCheckAnswer.getanswer(pls);
        break;
      case 2303: // 活跃度
        //PromptActivity.Open(pls);
        NewActivity.Open(pls);
        break;
      case 2304: // 累计签到
        DayAttend.Open(pls);
        break;
      case 2305: // 服务器要求打开客户端的引导
        BeginersGuide.gi().InitGuideFromSever(pls);
        break;
      case 2306: // 打开扩展提示
        ExtHelp.Init(pls);
        break;
      case 2307: //打开回师门确认页面
        BackToSchool.Open(pls);
        break;
      case 2400: // 打开副本创建界面
        //					MyFuBen.OpenCreate(pls);
        break;
      case 2401: // 管理副本页面
        MyFuBen.OpenManage(pls);
        break;
      case 2402: // 申请加入副本
        MyFuBen.OpenApply(pls);
        break;
      case 2403: // 我的副本状态
        MyFuBen.GetStat(pls);
        GmPlay.bInitFinished = true;
        break;
      case 2404: // 当前副本目标
        MyFuBen.GetTarget(pls);
        break;
      case 2408: // 获得副本积分商城的物品列表
        FubenMall.OPEN(pls);
        break;
      case 2500: // 战队相关
        MyFT.mft.iFTid = pls.GetNextInt();
        MyFT.mft.iFTJob = pls.GetNextInt();
        break;
      case 2501: // 战队属性页面
        FTFrame.Open(pls);
        break;
      case 2502: // 申请加入战队
        FTApply.Open(pls);
        break;
      case 2503: // 战队成员列表
        FTMember.Open(pls);
        break;
      case 2504: // 战队系统
        FTAgree.Open(pls);
        break;
      case 2505: // 战队排行，挑战
        FTRank.Open(pls);
      case 2506: // 挑战状态
        FTRank._2506c(pls);
        break;
      case 2600: // easymessage
        EasyMessage.easymsg.AddMessage(pls.GetNextString());
        if (XStat.gi().iXStat == XStat.GS_LOADING1) XStat.gi().PopStat(1);
        MapManager.gi().iMapChangeing = 0;
        break;
      case 2601: // framemessage;
        FrameMessage.fm.Open(pls.GetNextString());
        if (XStat.gi().iXStat == XStat.GS_LOADING1) XStat.gi().PopStat(1);
        MapManager.gi().iMapChangeing = 0;
        break;
      case 2602: //进度条设置
        ProgressBar.gi().InitProgress(pls);
        break;
      case 2700: //中午答题活动
        j = pls.GetNextByte();
        if (j == 1) {
          AQStart.bShow = true;
          AQStart.Open();
        } else AQStart.bShow = false;
        break;
      case 2701: //
        AQDoing.Open(pls);
        break;
      case 2800: //添加扩展按钮
        ExtendButton.peb.SetIcon(pls);
        break;
      case 2801: //runcmd
        this.RunCommand(pls);
        break;
      case 2802: //
        FrameMessageEx.fm.Open(pls.GetNextString());
        if (XStat.gi().iXStat == XStat.GS_LOADING1) XStat.gi().PopStat(1);
        MapManager.gi().iMapChangeing = 0;
        break;
      case 2910: //排行榜
        LeaderBoardFrame.LeaderBoardFresh(pls);
        break;
      case 2901: //巅峰决战集合
        i = pls.GetNextByte();
        if (i == 0) PeakFight.Open(pls);
        break;
      case 5000: //xms_rundirect
        GmPlay.pxe.RunByPls(pls);
        break;
    }
  }

  getTime() {
    let now = new Date(Date.now()),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
    return (
      y +
      "-" +
      (m < 10 ? "0" + m : m) +
      "-" +
      (d < 10 ? "0" + d : d) +
      " " +
      now.toTimeString().substr(0, 8)
    );
  }

  RunCommand(pls) {
    var cmd = pls.GetNextString();
    var cs1 = pls.GetNextInt();
    var cs2 = pls.GetNextString();
    if (cmd == "首次登陆黑屏提示语") {
      JQMode.jq.StartJQ(2);
    } else if (cmd == "升级效果") {
      UpgradeEffect.ue.Init();
    } else if (cmd == "活跃抽奖结果") {
      if (XStat.gi().iXStat == XStat.GS_PROMPTACTIVITY) {
        XStat.gi().LastStat(0).lottery_startround(cs1);
      }
    } else if (cmd == "帮派副本进度查询") {
      GovFBTarget.Open();
    } else if (cmd == "升级") {
      PublicInterface.gi().mta_record(10, 0, "");
    } else if (cmd == "uc_get_sign") {
      PublicInterface.gi().proc_extend(cmd, cs1, cs2);
    }
  }
}
GmPlay.iPlayingId = -1;
GmPlay.ResetSound = function () {
  if (GmPlay.x_wav == null) return;
  if (SystemOperate.iMusic == 0 || WavFast.bPause) {
    // 停止
    GmPlay.x_wav.StopBackMusic();
    GmPlay.iPlayingId = -1;
    return;
  }
  var pid = -1; // 1 fight
  if (!XStat.gi().bGameing()) pid = 0;
  else if (XFight.bFighting)
    pid = 1; //GmPlay.x_wav.StartBackMusic("fight", true);
  else {
    if (
      MapManager.gi().iCurrentMapId == 1 ||
      MapManager.gi().iCurrentMapId == 3 ||
      MapManager.gi().iCurrentMapId == 14 ||
      MapManager.gi().iCurrentMapId == 15 ||
      MapManager.gi().iCurrentMapId == 16
    )
      pid = 2;
    else pid = 3;
  }
  // GmPlay.sop(""+pid);
  if (pid == GmPlay.iPlayingId) return;
  GmPlay.iPlayingId = pid;
  switch (pid) {
    case 0:
      GmPlay.x_wav.StartBackMusic("start", true);
      break;
    case 1:
      GmPlay.x_wav.StartBackMusic("fight", true);
      break;
    case 2:
      GmPlay.x_wav.StartBackMusic("city", true);
      break;
    case 3:
      GmPlay.x_wav.StartBackMusic("site", true);
      break;
  }
};

GmPlay.bInitFinished = false;
GmPlay.sop = function (s) {
  //	if (GameVersion.QUDAO == 0)
  //		Log.e("SOP", s);
};

GmPlay.sop1 = function (s) {
  //	Log.e("SOP1", s);
};

GmPlay.sop2 = function (s) {
  // Log.e("SOP2",s);
};
GmPlay.pp = null;
GmPlay.gi = function () {
  if (GmPlay.pp == null) GmPlay.pp = new GmPlay();
  return GmPlay.pp;
};

GmPlay.iDelay;

GmPlay.aaa = new AnimaAction();

GmPlay.aa_auras;
GmPlay.aa_fightready;

GmPlay.xntf;

GmPlay.x_record;
GmPlay.x_wav = null;

GmPlay.xani_local;
GmPlay.xani_nui1; // 主菜单
GmPlay.xani_nui2; // 漫游界面
GmPlay.xani_nui3; //
GmPlay.xani_nui4; //战斗界面
GmPlay.xani_nui5; //帮助页面
GmPlay.xani_nui6; //五日礼包
GmPlay.xani_aura; //光环
GmPlay.xani_nicon;
GmPlay.xani_ngoods;
GmPlay.xani_stand, GmPlay.xani_shot;

GmPlay.xani_frame, GmPlay.xani_button, GmPlay.xani_icon, GmPlay.xani_other;

GmPlay.xani_back;

GmPlay.xani_color;
GmPlay.xani_newrole;
GmPlay.xani_weap;
GmPlay.xani_nmounts;

GmPlay.xani_ui, GmPlay.xani_ui2, GmPlay.xani_ui3, GmPlay.xani_ui4;
GmPlay.xani_face, GmPlay.xani_head;
GmPlay.xani_skill, GmPlay.xani_effect;
GmPlay.xani_skills;
GmPlay.xani_grow;

GmPlay.xani_pets;

GmPlay.de_goods;
GmPlay.de_pet;
GmPlay.de_map;
GmPlay.de_skill;
GmPlay.de_npc;
GmPlay.de_mounts;
GmPlay.de_fuben;
GmPlay.de_chuan_song;
GmPlay.de_grow;

GmPlay.pxe;

GmPlay.gp;

GmPlay.bCheckRes = false;

GmPlay.iTraverse = 0; // 西阳城障碍0有障碍，1无障碍

GmPlay.m_vi;

GmPlay.sLoginIp = GameData.sLGURL;
GmPlay.iLoginPort = 8002;

GmPlay.bInited = false;
GmPlay.bConnected = false;

GmPlay.iNowMillis;

GmPlay.xntf = null;
