
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import DrawBuffer from "../../../../map/DrawBuffer"
import MapManager from "../../../../map/MapManager"
import VisualBlock from "../../../../map/VisualBlock"
import PackageTools from "../../../../engine/PackageTools"
import TouchManager from "../../../../engine/TouchManager"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import M3DMath from "../../../../engine/graphics/M3DMath"
import XAnima from "../../../../engine/graphics/XAnima"
import _POINT from "../../../../engine/graphics/_POINT"
import _VERTEX from "../../../../engine/graphics/_VERTEX"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import Gameing from "../../../../engtst/mgm/gameing/Gameing"
import FriendList from "../../../../engtst/mgm/gameing/chat/privatechat/FriendList"
import PublicChat_SmallFrame from "../../../../engtst/mgm/gameing/chat/publicchat/PublicChat_SmallFrame"
import JQMode from "../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../engtst/mgm/gameing/me/pet/Pets"

import FightMember from "./FightMember"
import XFightRoleSkill from "./XFightRoleSkill"
import XFightSpecialSkill from "./XFightSpecialSkill"
import XFightEffect from "./XFightEffect"
import NumberEffect from "./NumberEffect"
import AutoFightFrame from "./AutoFightFrame"
import DiePrompt from "./DiePrompt"
import XFightGoods from "./XFightGoods"
import XFightCallPet from "./XFightCallPet"
import XFightPetSkill from "./XFightPetSkill"

class FightData {
/*	public int iAPos;
	public int this.iTimeStamp;
	public int iActType;
	public Int32Array iValues = new Int32Array(5);//
	public String sValue;
	public AnimaAction aa;

	public boolean bActing;*/

	constructor() {
		this.aa = new AnimaAction();
        this.sValue = "";
        this.iValues=new Int32Array(5);
	}
}

class _UPDATEBUFFER {
    /*
	public boolean bUseing;
	public int iPos;// 位置
	public byte sBuffer;// 更新数据
	public int iLen;// 数据长度
*/
	 constructor() {
		this.bUseing = false;
		this.sBuffer = new Uint8Array(64);
	}
}




export default class XFight {
    


    btnmov()
     {
		var k = 85;
		var m=10;
		this.btn_operate[0].Move(GmConfig.SCRW - 80 - k * 5, GmConfig.SCRH - 80-m, 80,				80);// 法术
		this.btn_operate[1].Move(GmConfig.SCRW - 80 - k * 4, GmConfig.SCRH - 80-m, 80,				80);// 道具
		this.btn_operate[2].Move(GmConfig.SCRW - 80 - k * 3, GmConfig.SCRH - 80-m, 80,				80);// 保护
		this.btn_operate[3].Move(GmConfig.SCRW - 80 - k * 2, GmConfig.SCRH - 80-m, 80,				80);// 防御
		this.btn_operate[7].Move(GmConfig.SCRW - 80 - k * 1, GmConfig.SCRH - 80-m, 80,				80);// 逃跑

		this.btn_operate[6].Move(GmConfig.SCRW - 80, GmConfig.SCRH - 80-m, 80, 80);// 自动

		this.btn_operate[5].Move(GmConfig.SCRW - 80, GmConfig.SCRH - 80 - k * 1-m, 80,				80);// 召还
		this.btn_operate[4].Move(GmConfig.SCRW - 80, GmConfig.SCRH - 80 - k * 2-m, 80,				80);// 召唤
		this.btn_operate[8].Move(GmConfig.SCRW - 80, GmConfig.SCRH - 80 - k * 3-m, 80,				80);// 捕捉

		this.btn_operate[9].Move(GmConfig.SCRW - 80 - 80, GmConfig.SCRH - 80 - 80-m,				80, 80);
		// ----------------------------------------------------------------------------------------------
		this.btn_petoperate[0].Move(GmConfig.SCRW - 80 - k * 5, GmConfig.SCRH - 80-m,				80, 80);// 法术
		this.btn_petoperate[1].Move(GmConfig.SCRW - 80 - k * 4, GmConfig.SCRH - 80-m,				80, 80);// 道具
		this.btn_petoperate[2].Move(GmConfig.SCRW - 80 - k * 3, GmConfig.SCRH - 80-m,				80, 80);// 保护
		this.btn_petoperate[3].Move(GmConfig.SCRW - 80 - k * 2, GmConfig.SCRH - 80-m,				80, 80);// 防御
		this.btn_petoperate[4].Move(GmConfig.SCRW - 80 - k * 1, GmConfig.SCRH - 80-m,				80, 80);// 逃跑

		this.btn_petoperate[5].Move(GmConfig.SCRW - 80, GmConfig.SCRH - 80-m, 80, 80);// 自动

		this.btn_cancel.Move(GmConfig.SCRW - 80, GmConfig.SCRH - 80-m, 80, 80);// 取消
	}

	constructor()
	{
		this.MAXFIGHTDATA=1024;

         this.FIGHTACTION_NORMAL = 0;// 普通攻击
         this.FIGHTACTION_DEFENCE = 1;
         this.FIGHTACTION_ESCAPE = 2;
         this.FIGHTACTION_CATCH = 3;
         this.FIGHTACTION_CALLBB = 4;
         this.FIGHTACTION_CALLBACKBB = 5;// 召回
         this.FIGHTACTION_MAGIC = 6;
         this.FIGHTACTION_USEGOODS = 7;
         this.FIGHTACTION_PROTECT = 8;
         this.FIGHTACTION_SPECIAL = 9;

          this.iCmd = new Int32Array(10);// 操作指令
          this.iLastRoleCmd = new Int32Array(10);
          this.iLastPetCmd = new Int32Array(10);

          this.iShiQi = [0,0];// 士气
          this.iZhen = [0,0];// 阵

		var i, j;

		this.iUsedPetsId = new Int32Array(8);//

		this.fat = new Array(4);
		// btn_select=new XButton(4)(GmMe.MAXTEAMOLE);//
		for (i = 0; i < 4; i++) {
            this.fat[i]=new Array(GmMe.MAXTEAMOLE);
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				this.fat[i][j] = new FightMember();
				// btn_select[i][j]=new XButton(GmPlay.xani_ui);
				// btn_select[i][j].InitButton("选择目标");
			}
		}
		this.aa_select1 = GmPlay.xani_nui4.InitAnimaWithName("选择敌人", null);
		this.aa_select2 = GmPlay.xani_nui4.InitAnimaWithName("选择队友", null);
		this.fat_base = new Array(2);//
		this.fat_base[0] = new FightMember();
		this.fat_base[1] = new FightMember();
		this.fat_base[0].iPos = 5;
		this.fat_base[0].sFaceTo = "_左";
		this.fat_base[1].iPos = 25;
		this.fat_base[1].sFaceTo = "_右";

		this.btn_operate = new Array(10);//
		for (i = 0; i < 9; i++)
		{
			this.btn_operate[i] = new XButtonEx2(GmPlay.xani_nui4);
			this.btn_operate[i].Move(GmConfig.SCRW - 170 - 40 + i % 2 * 85,GmConfig.SCRH / 3 + i / 2 * 80, 80, 80);
		}

		this.btn_operate[0].InitButton("战斗_法术");
		this.btn_operate[0].sAnimaName = "法术";
		this.btn_operate[1].InitButton("战斗_道具");
		this.btn_operate[1].sAnimaName = "道具";
		this.btn_operate[2].InitButton("战斗_保护");
		this.btn_operate[2].sAnimaName = "保护";
		this.btn_operate[3].InitButton("战斗_防御");
		this.btn_operate[3].sAnimaName = "防御";
		this.btn_operate[7].InitButton("战斗_逃跑");
		this.btn_operate[7].sAnimaName = "逃跑";

		this.btn_operate[4].InitButton("战斗_召唤");
		this.btn_operate[4].sAnimaName = "召唤";
		this.btn_operate[8].InitButton("战斗_捕捉");
		this.btn_operate[8].sAnimaName = "捕捉";
		this.btn_operate[5].InitButton("战斗_召还");
		this.btn_operate[5].sAnimaName = "召还";
		this.btn_operate[6].InitButton("战斗_自动");
		this.btn_operate[6].sAnimaName = "自动";

		this.btn_operate[9] = new XButtonEx2(GmPlay.xani_nui4);
		this.btn_operate[9].InitButton("战斗_特技");
		this.btn_operate[9].sAnimaName = "特技";

		this.btn_petoperate = new Array(7);//
		for (i = 0; i < 7; i++) {
			this.btn_petoperate[i] = new XButtonEx2(GmPlay.xani_nui4);
			this.btn_petoperate[i].Move(GmConfig.SCRW / 2 + i % 2 * 85,GmConfig.SCRH / 3 + i / 2 * 80, 80, 80);
		}

		this.btn_petoperate[0].InitButton("战斗_法术");
		this.btn_petoperate[0].sAnimaName = "法术";
		this.btn_petoperate[1].InitButton("战斗_道具");
		this.btn_petoperate[1].sAnimaName = "道具";
		this.btn_petoperate[2].InitButton("战斗_保护");
		this.btn_petoperate[2].sAnimaName = "保护";
		this.btn_petoperate[3].InitButton("战斗_防御");
		this.btn_petoperate[3].sAnimaName = "防御";
		this.btn_petoperate[4].InitButton("战斗_逃跑");
		this.btn_petoperate[4].sAnimaName = "逃跑";
		this.btn_petoperate[5].InitButton("战斗_自动");
		this.btn_petoperate[5].sAnimaName = "自动";

		this.btn_cancel = new XButtonEx2(GmPlay.xani_nui4);
		this.btn_cancel.InitButton("战斗_自动");
		this.btn_cancel.sAnimaName = "取消";

		this.btnmov();

		this.fds = new Array(this.MAXFIGHTDATA);//
		for (i = 0; i < this.MAXFIGHTDATA; i++)
			this.fds[i] = new FightData();

		// fatpos
		// int w,h;
		// w=GmConfig.SCRW/8;//100
		// h=GmConfig.SCRH/8;//60

		// 可根据屏幕宽高计算
		for (i = 0; i < 2; i++) {
			for (j = 0; j < 5; j++) {
				XFight.basepos[i][j][0] *= 80;// 左右间距
				XFight.basepos[i][j][1] *= 80;// 前后间距
				// XFight.basepos[i][j][0]*=80;//左右间距
				// XFight.basepos[i][j][1]*=100;//前后间距
			}
		}
		for (i = 0; i < 6 * 2; i++) {
			for (j = 0; j < 5; j++) {
				XFight.zhenpos[i][j][0] *= 80;// 左右间距
				XFight.zhenpos[i][j][1] *= 25;// 前后间距
			}
		}
		this.iLastRoleCmd[0] = this.FIGHTACTION_NORMAL;
		this.iLastRoleCmd[1] = 0;
		this.iLastRoleCmd[2] = -1;
		this.iLastPetCmd[0] = this.FIGHTACTION_NORMAL;
		this.iLastPetCmd[1] = 0;
		this.iLastPetCmd[2] = -1;

		this.btn_leavewatch = new XButtonEx2(GmPlay.xani_nui4);
		this.btn_leavewatch.InitButton("战斗_自动");
		this.btn_leavewatch.sAnimaName = "离开";

		this.ub = new Array(10);
		for (i = 0; i < 10; i++)
            this.ub[i] = new _UPDATEBUFFER();
            

            this.bShowHpDetail = false;
            this.wsize = 22;
             this.jdjd = 0;
	}

	 InitPos() {
		var i, j;
		var f, l;
		var offx, offy;
		var pf;
		this.myfat = null;

		if (this.bSwap) {
			var tmp;
			for (i = 0; i < 2; i++) {
				for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
					tmp = this.fat[i][j];
					this.fat[i][j] = this.fat[i + 2][j];
					this.fat[i + 2][j] = tmp;
				}
			}
		}

		var offx1, offy1, offx2, offy2;
		// offx1=650;
		// offy1=300;
		// offx2=150;
		// offy2=250;
		offx1 = 800 - 200 + 30;
		offy1 = 480 - 200 + 50 + 30;
		offx2 = 200 - 30;
		offy2 = 200;
		this.fat_base[0].iX = offx1 * GmConfig.SCRW / 800;
		this.fat_base[0].iY = offy1 * GmConfig.SCRH / 480;
		this.fat_base[1].iX = offx2 * GmConfig.SCRW / 800;
		this.fat_base[1].iY = offy2 * GmConfig.SCRH / 480;

		this.fat_base[0].FaceTo(true);
		this.fat_base[1].FaceTo(true);
		var tx, ty;
		for (i = 0; i < 4; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				// if(fat[i][j].bUseing)
				{
					// fat[i][j].iOx=fatpos[i][j][0];
					// fat[i][j].iOy=fatpos[i][j][1];
					// fat[i][j].iX=fatpos[i][j][0];
					// fat[i][j].iY=fatpos[i][j][1];
					// this.iZhen[0]=0;
					// this.iZhen[1]=0;
					tx = XFight.basepos[i % 2][j][0]
							+ XFight.zhenpos[i % 2 + this.iZhen[parseInt(i / 2)] * 2][j][0];
					ty = XFight.basepos[i % 2][j][1]
							+ XFight.zhenpos[i % 2 + this.iZhen[parseInt(i / 2)] * 2][j][1];
					f = XDefine.GetAngleXY_ext(tx, ty, 0, 0);
					l = XDefine.llength(tx, ty, 0, 0);
					if (i < 2) {// 己方
						f += XDefine.PI * (180 - 55) / 180;
						offx = offx1;
						offy = offy1;
					} else {// 敌方
						f -= XDefine.PI * 55 / 180;
						offx = offx2;
						offy = offy2;
					}

					this.fat[i][j].iOx =  (offx + Math.cos(f) * l * 1.2);
					this.fat[i][j].iOy =  (offy + Math.sin(f) * l * 0.7);
					// 根据屏幕调整位置
					this.fat[i][j].iOx = this.fat[i][j].iOx * GmConfig.SCRW / 800;
					this.fat[i][j].iOy = this.fat[i][j].iOy * GmConfig.SCRH / 480;
					this.fat[i][j].iX = this.fat[i][j].iOx;
					this.fat[i][j].iY = this.fat[i][j].iOy;
					this.fat[i][j].iPos = i * 10 + j;

					if (i < 2) {
						this.fat[i][j].FaceTo(true);
						this.fat[i][j].iMoveOffX =  (Math
								.cos(20 * XDefine.PI / 180) * 100);
						this.fat[i][j].iMoveOffY =  (Math
								.sin(20 * XDefine.PI / 180) * 100);
					} else {
						this.fat[i][j].FaceTo(true);
						this.fat[i][j].iMoveOffX = - (Math
								.cos((20) * XDefine.PI / 180) * 100);
						this.fat[i][j].iMoveOffY = - (Math
								.sin((20) * XDefine.PI / 180) * 100);
					}
					if (!this.fat[i][j].bUseing)
						continue;
					pf = this.fat[i][j];
					this.fat[i][j].SetBaseAnima("战斗站立");
					if (this.fat[i][j].iHp <= 0)
						this.fat[i][j].SetBaseAnima("死亡");
					pf.NextAnima();

					if (pf.iPos == this.iMyPos) {
						pf.bMe = true;
						this.myfat = pf;
					}
				}
			}
		}
	}

	 SwapPos( pos) {
		if (this.bSwap) {
			if (pos < 20)
				return pos + 20;
			else
				return pos - 20;
		}
		return pos;
	}

	 SwapZhen() {
		if (this.bSwap) {
			var i = this.iZhen[0];
			this.iZhen[0] = this.iZhen[1];
			this.iZhen[1] = i;
		}
	}

	 SwapShiQi() {
		if (this.bSwap) {
			var i = this.iShiQi[0];
			this.iShiQi[0] = this.iShiQi[1];
			this.iShiQi[1] = i;
		}
	}

	setpetused( pls) {
		var pid = pls.GetNextInt();
		GmMe.me.iFightPid = pid;
		// 加入到已经用过列表中
		for (var j = 0; j < 8; j++) {
			if (this.iUsedPetsId[j] <= 0) {
				this.iUsedPetsId[j] = pid;
				break;
			}
		}
	}

	updatefat( pls) {
		var i;
		for (i = 0; i < 10; i++) {
			if (!this.ub[i].bUseing) {
				XDefine.arraycopy(pls.databuf, 3, this.ub[i].sBuffer, 0,
						pls.iLength - 3);
				this.ub[i].iLen = pls.iLength - 3;
				this.ub[i].iPos = pls.GetNextByte();
				this.ub[i].iPos = this.SwapPos(this.ub[i].iPos);
				this.ub[i].bUseing = true;
				break;
			}
		}
		GmPlay.sop1("len=" + pls.iLength + ",,offset=" + pls.iOffset);
	}

	DoUpdate( pos) {
		var i;
		for (i = 0; i < 10; i++) {
			if (this.ub[i].bUseing && this.ub[i].iPos == pos) {
				var pls = new PackageTools(256);
				pls.SetDataAndOffset(this.ub[i].sBuffer, 0, this.ub[i].iLen);
				this._updatefat(pls);
				this.ub[i].bUseing = false;
				return;
			}
		}
	}

	_updatefat( pls) {
		var i, j, k;
		var pos = pls.GetNextByte();
		pos = this.SwapPos(pos);
		var pf = this.fat[parseInt(pos / 10)][pos % 10];
		pf.Clear();
		MyPets.mp.CalcAll();

		if (pos == this.iMyPos + 10) {// 自己的宠物
			var ppet = MyPets.mp.GetUseingPet();

			if (ppet != null && ppet.iHp <= 0) {
				ppet.iHp = ppet.iMaxHp;
				ppet.iMp = ppet.iMaxMp;
			}
		}

		pf.bUseing = true;
		pf.sName = pls.GetNextString();
		pf.iMaxHp = pls.GetNextInt();
		pf.iHp = pls.GetNextInt();
		pf.iMaxMp = pls.GetNextInt();
		pf.iMp = pls.GetNextInt();
		// pf.iAnger=pls.GetNextShort();

		pf.iType = pls.GetNextByte();// 0user,1pet
		i = pls.GetNextByte();// race sex
		j = pls.GetNextInt();
		k = pls.GetNextInt();
		pf.iColor[0] = k & 7;
		pf.iColor[1] = (k >> 3) & 7;
		pf.iColor[2] = (k >> 6) & 7;
		pf.iColor[3] = (k >> 9) & 7;
		pf.iColor[4] = (k >> 12) & 7;
		if (pf.iType == 0) {// 人物
			pf.iRace_Sex = i;
			pf.iWeapTid = j;
			pf.nr = Gameing.gameing.findnrsbyname(pf.sName);// 玩家，绑定附近NearRole
			pf.xani = GmPlay.xani_newrole[pf.iRace_Sex];
			pf.iSex = pf.iRace_Sex % 2;
		} else if (pf.iType == 1) {// 怪物
			pf.iTid = j;
			pf.xani = GmPlay.xani_pets[pf.iTid % 10000];
		} else if (pf.iType == 2) {// 特殊：人变怪，怪变人
			pf.iSpecialType = i;
			if (i == 1) {// 怪心，人身
				pf.iWeapTid = j % 10000;
				pf.iRace_Sex = parseInt(j / 10000);
				pf.xani = GmPlay.xani_newrole[pf.iRace_Sex];
				pf.iSex = pf.iRace_Sex % 2;
			} else {// 人心，怪身
				pf.iTid = j;
				pf.xani = GmPlay.xani_pets[pf.iTid % 10000];
			}
		}

		pf.iX = pf.iOx;
		pf.iY = pf.iOy;
		pf.FaceTo(true);
		pf.SetBaseAnima("战斗站立");
		pf.NextAnima();
	}

	InitFight( pls) {
		this.btnmov();
		pls.bCompress = true;
		var i, j, k;
		var pos;
		var pf;
		for (i = 0; i < 4; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				this.fat[i][j].Clear();
			}
		}
		for (i = 0; i < 10; i++)
			this.ub[i].bUseing = false;
		for (i = 0; i < 2; i++)
			this.fat_base[i].Clear();
		this.iFightType = pls.GetNextByte();// 战斗类型

		while (true) {
			pos = pls.GetNextByte();
			// GmPlay.sop("pos : "+pos);
			if (pos == 100)
				break;
			pf = this.fat[parseInt(pos / 10)][pos % 10];
			pf.bUseing = true;
			pf.sName = pls.GetNextString();
			pf.iMaxHp = pls.GetNextInt();
			pf.iHp = pls.GetNextInt();
			pf.iMaxMp = pls.GetNextInt();
			pf.iMp = pls.GetNextInt();
			// pf.iAnger=pls.GetNextShort();

			pf.iType = pls.GetNextByte();// 0user,1pet,2特殊
			i = pls.GetNextByte();
			j = pls.GetNextInt();// 宠物/怪物类型,种族*2+性别

			k = pls.GetNextInt();
			// k=0;
			pf.iColor[0] = k & 7;
			pf.iColor[1] = (k >> 3) & 7;
			pf.iColor[2] = (k >> 6) & 7;
			pf.iColor[3] = (k >> 9) & 7;
			pf.iColor[4] = (k >> 12) & 7;
			if (pf.iType == 0) {// 人物
				pf.iRace_Sex = i;
				pf.iWeapTid = j;
				pf.nr = Gameing.gameing.findnrsbyname(pf.sName);// 玩家，绑定附近NearRole
				pf.xani = GmPlay.xani_newrole[pf.iRace_Sex];
				pf.iSex = pf.iRace_Sex % 2;
			} else if (pf.iType == 1) {// 怪物
				pf.iTid = j;
				pf.xani = GmPlay.xani_pets[j % 10000];
			} else if (pf.iType == 2) {// 特殊：人变怪，怪变人
				pf.iSpecialType = i;
				if (i == 1) {// 怪心，人身
					pf.iWeapTid = j % 10000;
					pf.iRace_Sex = parseInt(j / 10000);
					pf.xani = GmPlay.xani_newrole[pf.iRace_Sex];
					pf.iSex = pf.iRace_Sex % 2;
				} else {// 人心，怪身
					pf.iTid = j;
					pf.xani = GmPlay.xani_pets[j % 10000];
				}
			}
		}
		this.iMyPos = pls.GetNextByte();
		this.bSwap = false;
		if (this.iMyPos >= 100) {// 是观众
			if (this.iMyPos == 100)
				this.iMyTeam = 0;
			else {
				this.iMyTeam = 1;
				this.bSwap = true;
			}
		} else {
			if (this.iMyPos < 20)
				this.iMyTeam = 0;
			else {
				this.iMyTeam = 1;
				this.bSwap = true;
				this.iMyPos -= 20;
			}
			for (i = 0; i < 8; i++) {
				this.iUsedPetsId[i] = pls.GetNextInt();// 使用过的宠物ID列表
			}
			XFightRoleSkill.xfs.InitFightSkill();
			XFightSpecialSkill.xss.InitSpecialSkill();
		}
		this.iShiQi[0] = pls.GetNextShort();
		this.iShiQi[1] = pls.GetNextShort();
		this.iRound = pls.GetNextShort();
		this.iZhen[0] = pls.GetNextByte();
		this.iZhen[1] = pls.GetNextByte();
		this.SwapShiQi();
		this.SwapZhen();

		XFight.bFighting = true;
		this.iAlphaEffect = 0;
		this.iFightStat = 0;
		this.InitPos();
		this.bFightFinished = false;
		this.iWaited = 0;
		pls.bCompress = false;
	}

	 

	DrawHpDetail() {
		if (this.iMyPos >= 100)
			GmMe.me.DrawHpDetail();
		else {
			var pfm = this.getfm(this.iMyPos);
			var x = GmConfig.SCRW - 88 - 60 - 150;
			M3DFast.gi().FillRect_2D(x, 0, x + 150, 60, 0x80000000);
			M3DFast.gi().DrawTextEx(x, 0, "气血:" + pfm.iHp + "/" + pfm.iMaxHp,
					0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(x, 20, "魔法:" + pfm.iMp + "/" + pfm.iMaxMp,
					0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(x, 40, "愤怒:" + GmMe.me.rbs.iAnger + "/150",
					0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		}
	}

	DrawHead() {// 观战
		if (this.iMyPos >= 100)GmMe.me.DrawHead();
		else
		{
			var pfm = this.getfm(this.iMyPos);
			var pfmpet = this.getfm(this.iMyPos + 10);
			var ppet = MyPets.mp.GetUseingPet();

			if(ppet==null)GmMe.me.DrawHeadEx(pfm.iHp,GmMe.me.rbs.iMaxHp,pfm.iMp,GmMe.me.rbs.iMaxMp,GmMe.me.rbs.iAnger,GmMe.me.rbs.iLev,-1,0,0,0,0,0,0);
			else GmMe.me.DrawHeadEx(pfm.iHp,GmMe.me.rbs.iMaxHp,pfm.iMp,GmMe.me.rbs.iMaxMp,GmMe.me.rbs.iAnger,GmMe.me.rbs.iLev,ppet.iTid,pfmpet.iHp,ppet.iMaxHp,pfmpet.iMp,ppet.iMaxMp,ppet.iLev,ppet.iExp);
		}
		if (this.bShowHpDetail)this.DrawHpDetail();
	}

	Draw_UI1() {
		M3DFast.gi().FillRect_2D(0, 0, this.iAlphaEffect, GmConfig.SCRH, 0xa0000618);

		this.DrawHead();

		if (this.iAlphaEffect >= GmConfig.SCRW)
			GmPlay.xani_nui2.DrawAnimaEx(GmConfig.SCRW / 2 - 365,
					(GmConfig.SCRH - 327) / 2 + 80, "背景图案", 1, 101, 2.0, 1, 0,
					0, 0);
		// M3DFast.gi().DrawTextEx(GmConfig.SCRW-100, 100, ""+GmMe.me.rbs.iAnger,
		// 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
	}

	Draw() {
		var i, j;
		var bClipSeted = false;
		i = this.iAlphaEffect;// * GmConfig.SCRW / 1280;
		if (i < GmConfig.SCRW) {
			M3DFast.gi().SetViewClip(0, 0, i <= 0 ? 1 : i, GmConfig.SCRH);
			bClipSeted = true;
		}
		DrawBuffer.gi().ClearBuffer();
		for (i = 0; i < 4; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				if (this.fat[i][j].bUseing) {
					// m=this.fat[i][j].iX;
					// n=this.fat[i][j].iY;

					if (this.iFightStat > 100)
						this.fat[i][j].bActed = true;
					this.fat[i][j].Draw();
					// btn_select[i][j].Move(this.fat[i][j].iX, this.fat[i][j].iY, 1, 1);
					if (this.iFightStat == 4 || this.iFightStat == 14) {// 敌方
						if (i >= 2)
							DrawBuffer.gi()
									.DrawAnima_aa(this.fat[i][j].iY + 1, null,
											this.fat[i][j].iX, this.fat[i][j].iY - 40,
											this.aa_select1);
					}
					if (this.iFightStat == 5 || this.iFightStat == 15) {// 己方
						if (i < 2)
							DrawBuffer.gi()
									.DrawAnima_aa(this.fat[i][j].iY + 1, null,
											this.fat[i][j].iX, this.fat[i][j].iY - 40,
											this.aa_select2);
					}
				}
				// else if(1==0)
				// {
				// if(i<=1)
				// {
				// DrawBuffer.gi().DrawAnima_aa(this.fat[i][j].iY-2,GmPlay.aa_shadow.xani,
				// this.fat[i][j].iX, this.fat[i][j].iY, GmPlay.aa_shadow);//影子
				// DrawBuffer.gi().DrawAnima_aa(this.fat[i][j].iY, null,this.fat[i][j].iX,
				// this.fat[i][j].iY, this.fat[1][0].aa_body);
				// }
				// else
				// {
				// DrawBuffer.gi().DrawAnima_aa(this.fat[i][j].iY-2,GmPlay.aa_shadow.xani,
				// this.fat[i][j].iX, this.fat[i][j].iY, GmPlay.aa_shadow);//影子
				// DrawBuffer.gi().DrawAnima_aa(this.fat[i][j].iY, null,this.fat[i][j].iX,
				// this.fat[i][j].iY, this.fat[2][0].aa_body);
				// }
				// }
			}
		}
		this.aa_select1.NextFrame();// 可选转圈
		this.aa_select2.NextFrame();
		this.fat_base[0].Draw();// 全体状态显示
		this.fat_base[1].Draw();
		XFightEffect.fe.DrawGround();// 技能效果
		DrawBuffer.gi().SortAndDraw();

		NumberEffect.ne.Draw();// 数字

		if (bClipSeted)
			M3DFast.gi().NoClip();
	}


	Draw_UI2() {
		if (this.iAlphaEffect < GmConfig.SCRW) {
			M3DFast.gi().SetViewClip(0, 0, this.iAlphaEffect <= 0 ? 1 : this.iAlphaEffect,
					GmConfig.SCRH);
		}
		var i;
		this.btnmov();

		FriendList.gi().Draw();// 私聊

		if (this.iMyPos >= 100) {// 观战者，没有操作
			if (this.iFightStat < 100)
				this.iFightStat = 100;
			this.btn_leavewatch.Move(GmConfig.SCRW - 83, GmConfig.SCRH - 83, 83, 83);
			this.btn_leavewatch.Draw();
			M3DFast.gi().DrawText_2(this.btn_leavewatch.iX + 40,
					this.btn_leavewatch.iY + 80, this.btn_leavewatch.sAnimaName,
					0xffffffff, this.wsize, 101, 1, 1, 0, -2, -3, 3, 0xff000000);
		}

		if (this.iFightStat <= 100) {
			if (this.bFightFinished) {
				this.iFightStat = 300;
				this.iTimeOut = 0;
			}
		}
		switch (this.iFightStat) {
		case 0:// 等待操作,普通攻击，施法(技能)，防御，使用物品，逃跑，抓宠物，自动
			if (JQMode.jq.bJQLock()) {
				this.iCmd[0] = this.FIGHTACTION_DEFENCE;
				this.iCmd[1] = 0;
				this.iCmd[2] = 0;
				this.FinishRoleOperate();
				this.iCmd[0] = this.FIGHTACTION_DEFENCE;
				this.iCmd[1] = 0;
				this.iCmd[2] = 0;
				this.FinishPetOperate();
				break;
			}
			if (AutoFightFrame.aff.iAutoFightLast > 0) {
				if (this.iWaited / 20 >= 3 || this.iRound > 1
						|| this.iFightType != XFight.FIGHTWITH_DARK) {
					this.iCmd[0] = this.iLastRoleCmd[0];
					this.iCmd[1] = this.iLastRoleCmd[1];
					this.iCmd[2] = this.iLastRoleCmd[2];
					this.FinishRoleOperate();
					this.iCmd[0] = this.iLastPetCmd[0];
					this.iCmd[1] = this.iLastPetCmd[1];
					this.iCmd[2] = this.iLastPetCmd[2];
					this.FinishPetOperate();
					AutoFightFrame.aff.iAutoFightLast--;
				}
				break;
			}

			for (i = 0; i < 8; i++)
			{
				this.btn_operate[i].Draw();
				M3DFast.gi().DrawText_2(this.btn_operate[i].iX + 40,this.btn_operate[i].iY + 80, this.btn_operate[i].sAnimaName,0xfffdf5e8, this.wsize, 101, 1, 1, 0, -2, -3, 3, 0xff1a0000);
			}
			if (this.iFightType == XFight.FIGHTWITH_DARK	|| (this.iFightType == XFight.FIGHTWITH_NPC && this.fat[2][0].bUseing && this.fat[2][0].sName=="野猪"))
			{
				this.btn_operate[8].Draw();// 和野怪战斗中有捕捉按钮
				i = 8;
				M3DFast.gi().DrawText_2(this.btn_operate[i].iX + 40,this.btn_operate[i].iY + 80, this.btn_operate[i].sAnimaName,0xfffdf5e8, this.wsize, 101, 1, 1, 0, -2, -3, 3, 0xff1a0000);
			}
			if (XFightSpecialSkill.xss.iSkillCount > 0)
			{
				this.btn_operate[9].Draw();
				i = 9;
				M3DFast.gi().DrawText_2(this.btn_operate[i].iX + 40,this.btn_operate[i].iY + 80, this.btn_operate[i].sAnimaName,0xfffdf5e8, this.wsize, 101, 1, 1, 0, -2, -3, 3, 0xff1a0000);
			}
//			M3DFast.gi().DrawText_2(btn_list1[i].iX+36, btn_list1[i].iY+71, btn_list1[i].sAnimaName, 0xfffdf5e8, this.wsize, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
			// if(AutoFightFrame.aff.iAutoFightLast>0)
			// {//自动延续上次攻击动作
			// this.iCmd[0]=this.iLastRoleCmd[0];
			// this.iCmd[1]=this.iLastRoleCmd[1];
			// this.iCmd[2]=this.iLastRoleCmd[2];
			// this.FinishRoleOperate();
			// this.iCmd[0]=this.iLastPetCmd[0];
			// this.iCmd[1]=this.iLastPetCmd[1];
			// this.iCmd[2]=this.iLastPetCmd[2];
			// this.FinishPetOperate();
			// AutoFightFrame.aff.iAutoFightLast--;
			// }
			if (Confirm1.end(Confirm1.CONFIRM_ESCAPE)) {//
				if (Confirm1.bConfirm) {// 同意逃跑
					this.iCmd[0] = this.FIGHTACTION_ESCAPE;
					this.iCmd[1] = 0;
					this.iCmd[2] = 0;
					this.FinishRoleOperate();
				}
			}
			break;
		case 6:// 特技
			XFightSpecialSkill.xss.DrawSpecialSkill();
			break;
		case 1:// 选择门派技能
			XFightRoleSkill.xfs.DrawFightSkill();
			break;
		case 2:// 选择物品使用
		case 12:
			XFightGoods.xfg.DrawFightGoods();
			break;
		case 3:// 选择宠物招出来
			XFightCallPet.xfcp.DrawCallPet();
			break;
		case 10://
			for (i = 0; i < 6; i++)
			{
				this.btn_petoperate[i].Draw();
				M3DFast.gi().DrawText_2(this.btn_petoperate[i].iX + 40,this.btn_petoperate[i].iY + 80,this.btn_petoperate[i].sAnimaName, 0xfffdf5e8, this.wsize, 101,1, 1, 0, -2, -3, 3, 0xff1a0000);
			}
			if (AutoFightFrame.aff.iAutoFightLast > 0) {// 自动延续上次攻击动作
				this.iCmd[0] = this.iLastPetCmd[0];
				this.iCmd[1] = this.iLastPetCmd[1];
				this.iCmd[2] = this.iLastPetCmd[2];
				this.FinishPetOperate();
				AutoFightFrame.aff.iAutoFightLast--;
			}
			if (Confirm1.end(Confirm1.CONFIRM_ESCAPE)) {//
				if (Confirm1.bConfirm) {// 同意逃跑
					this.iCmd[0] = this.FIGHTACTION_ESCAPE;
					this.iCmd[1] = 0;
					this.iCmd[2] = 0;
					this.FinishPetOperate();
				}
			}
			break;
		case 11:// 宠物选择技能
			XFightPetSkill.xfps.Draw();
			break;
		case 4:// 人物选择敌方
		case 5:// 人物选择己方
		case 14:// 宠物选择敌方
		case 15:// 宠物选择的己方
			this.btn_cancel.Draw();
			M3DFast.gi().DrawText_2(this.btn_cancel.iX + 40, this.btn_cancel.iY + 80,
					this.btn_cancel.sAnimaName, 0xffffffff, this.wsize, 101, 1, 1, 0, -2,
					-3, 3, 0xff000000);
			break;
		case 100:// 等待其他人操作
			break;
		case 200:// 播放战斗动画
			this.ProcFightData();
			break;
		case 300:
			this.iTimeOut++;
			if (this.iTimeOut > 15)
				this.iAlphaEffect -= GmConfig.SCRW / 4;
			if (this.iTimeOut > 23) {
				XFight.bFighting = false;
				this.ClearPopo();
				DiePrompt.Open();
			}
			break;
		}
		if (XFight.bFighting) {
			i = 20;
			if (this.iFightStat < 100) {// 操作倒计时
				if (this.iWaited < 30 * i)
					this.iWaited++;
				else
					this.iFightStat = 100;
				NumberEffect.ne.Draw_TimeNumber(GmConfig.SCRW / 2, 150,
						(30 - this.iWaited / i));
				// M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 100, ""+(30-this.iWaited/i),
				// 0xffffffff, 80, 101, 1, 1, 0, -2, -2);
			} else if (this.iFightStat == 100) {// 等待
				GmPlay.xani_nui4.DrawAnima(GmConfig.SCRW / 2, 150, "倒计时等待", 0);
				// M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 100, "等待", 0xffff0000, 80,
				// 101, 1, 1, 0, -2, -2);
			}
		}
		GmPlay.xani_nui4.DrawAnima(GmConfig.SCRW / 2, 0, "战斗顶部UI", 0);
		GmPlay.xani_nui4.DrawAnimaEx(GmConfig.SCRW / 2 - 49+(120*(1-this.iShiQi[1] / 120)-3), 1, "战斗顶部UI", 1,
				101, 1.0 * this.iShiQi[1] / 120, 1, 0, 0, 0);
		GmPlay.xani_nui4.DrawAnimaEx(GmConfig.SCRW / 2 + 49, 1, "战斗顶部UI", 2,
				101, 1.0 * this.iShiQi[0] / 120, 1, 0, 0, 0);
		// GmPlay.xani_nui4.DrawAnimaEx(GmConfig.SCRW/2 ,0, "战斗顶部UI",1, 101, 1,
		// 1, (120-this.iShiQi[1])/2, GmConfig.SCRW/2, -4);
		// GmPlay.xani_nui4.DrawAnimaEx(GmConfig.SCRW/2 ,0, "战斗顶部UI",2, 101, 1,
		// 1,360-(120-this.iShiQi[0])/2, GmConfig.SCRW/2, -4);

		// 120最大值
		// GmPlay.xani_ui.DrawAnima(GmConfig.SCRW/2 ,0, "士气UI",1);
		// this.jdjd++;
		// if(this.jdjd>=60)this.jdjd=0;
		//
		M3DFast.gi().DrawTextEx(GmConfig.SCRW / 2 + 82, 45, "" + this.iShiQi[0], 0xff0080ff,
				28, 101, 1, 1, 0, -2, -3);
		M3DFast.gi().DrawTextEx(GmConfig.SCRW / 2 - 82, 45, "" + this.iShiQi[1], 0xffff0000,
				28, 101, 1, 1, 0, -2, -3);
		NumberEffect.ne.Draw_RoundNumber(GmConfig.SCRW / 2, 45, this.iRound);

		if (this.iAlphaEffect < GmConfig.SCRW) {
			M3DFast.gi().NoClip();
			this.iAlphaEffect += GmConfig.SCRW / 8;
			// this.iAlphaEffect+=5;
		}
	}

	ClearPopo() {
		Gameing.gameing.ClearPopo();
	}

	

	 bHavePet( pos) {
		GmPlay.sop("pos=" + pos);
		return this.fat[parseInt(pos / 10) + 1][pos % 10].bUseing;
	}

	  SelectOur( x,  y) {// DrawBuffer.gi().DrawAnima_aa(this.fat[i][j].iY+1,
										// null, this.fat[i][j].iX, this.fat[i][j].iY-40,
										// aa_select);
		// x = TouchManager._swapx(x);
		// y = TouchManager._swapy(y);
		var i, j;
		for (i = 0; i < 2; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				if (this.fat[i][j].bUseing) {
					if (XDefine.bInRect(x, y, this.fat[i][j].iX - 30,
							this.fat[i][j].iY - 40 - 30, 60, 60)) {// 点击了敌人
						return i * 10 + j;
					}
				}
			}
		}
		for (i = 0; i < 2; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				if (this.fat[i][j].bUseing) {
					if (this.fat[i][j].xani.bInAnima(this.fat[i][j].aa_body,
							this.fat[i][j].iOx, this.fat[i][j].iOy, x, y)) {// 点击了敌人
						return i * 10 + j;
					}
				}
			}
		}
		return -1;
	}

	  SelectEnemy( x,  y) {
		// x = TouchManager._swapx(x);
		// y = TouchManager._swapy(y);
		var i, j;
		for (i = 2; i < 4; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				if (this.fat[i][j].bUseing) {
					if (XDefine.bInRect(x, y, this.fat[i][j].iX - 30,
							this.fat[i][j].iY - 40 - 30, 60, 60)) {// 点击了敌人
						return i * 10 + j;
					}
				}
			}
		}
		for (i = 2; i < 4; i++) {
			for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
				if (this.fat[i][j].bUseing) {
					if (this.fat[i][j].xani.bInAnima(this.fat[i][j].aa_body,
							this.fat[i][j].iOx, this.fat[i][j].iOy, x, y)) {// 点击了敌人
						return i * 10 + j;
					}
				}
			}
		}
		return -1;
	}

	/*
	 * this.btn_operate[0].sName="法术"; this.btn_operate[1].sName="道具";
	 * this.btn_operate[2].sName="保护"; this.btn_operate[3].sName="防御";
	 * this.btn_operate[4].sName="召唤"; this.btn_operate[5].sName="召还";
	 * this.btn_operate[6].sName="自动"; this.btn_operate[7].sName="逃跑";
	 * this.btn_operate[8].sName="捕捉";
	 * 
	 * this.btn_petoperate[0].sName="法术"; this.btn_petoperate[1].sName="道具";
	 * this.btn_petoperate[2].sName="保护"; this.btn_petoperate[3].sName="防御";
	 * this.btn_petoperate[4].sName="逃跑";
	 */
	 ProcTouch( msg,  x,  y) {
		this.bShowHpDetail = false;
		if (this.iAlphaEffect < GmConfig.SCRW) {
			TouchManager.gi().clear();
			return true;
		}
		if (this.iMyPos >= 100) {// 观战者，没有操作
			if (this.btn_leavewatch.ProcTouch(msg, x, y)) {
				if (this.btn_leavewatch.bCheck()) {
					this.btn_leavewatch.SetNormal();
					GmProtocol.gi().s_WatchFight(1, 0);// 离开观战
					this.iFightStat = 300;
					this.iTimeOut = 0;
				}
			}
			return true;
		}

		var i;
		switch (this.iFightStat) {
		case 0:// 人物_选择操作类型
			if (AutoFightFrame.aff.iAutoFightLast > 0)
				break;
			for (i = 0; i < 10; i++) {
				if (i == 9) {
					if (XFightSpecialSkill.xss.iSkillCount > 0)
						;// 有装备技能
					else
						continue;
				}
				if (i == 8) {
					if (this.iFightType == XFight.FIGHTWITH_DARK
							|| (this.iFightType == XFight.FIGHTWITH_NPC && this.fat[2][0].sName=="野猪"))
						;// 和野怪战斗中有捕捉按钮
					else
						continue;

				}
				if (this.btn_operate[i].ProcTouch(msg, x, y)) {
					if (this.btn_operate[i].bCheck()) {
						this.btn_operate[i].SetNormal();
						switch (i) {
						case 0:// 法术
							// if(GmMe.me.rbs.iSchoolId==0)
							// {
							// EasyMessage.easymsg.AddMessage("未拜入门派，无可用法术");
							// }
							// else
						{
							this.iCmd[0] = this.FIGHTACTION_MAGIC;
							this.iFightStat = 1;
							XFightRoleSkill.xfs.iShowPoint = -1;
						}
							break;
						case 1:// 使用物品
							this.iCmd[0] = this.FIGHTACTION_USEGOODS;
							this.iFightStat = 2;
							XFightGoods.xfg.InitFightGoods();
							break;
						case 2:// 保护
							this.iCmd[0] = this.FIGHTACTION_PROTECT;
							this.iFightStat = 5;// 选择己方成员
							break;
						case 3:// 防御
							this.iCmd[0] = this.FIGHTACTION_DEFENCE;
							this.iCmd[1] = 0;
							this.iCmd[2] = 0;
							this.FinishRoleOperate();
							break;
						case 4:// 召唤
							if (XFightCallPet.xfcp.InitCallPet() <= 0) {
								EasyMessage.easymsg.AddMessage("当前没有宠物可召唤");
							} else {
								this.iCmd[0] = this.FIGHTACTION_CALLBB;
								this.iCmd[1] = 0;
								this.iFightStat = 3;// 选择我的宠物来招出来
							}
							break;
						case 5:// 召还
							this.iCmd[0] = this.FIGHTACTION_CALLBACKBB;
							this.FinishRoleOperate();
							break;
						case 6:// 自动，倒计时减
							this.iWaited += 60;
							AutoFightFrame.aff.iAutoFightLast = AutoFightFrame.AUTOLAST;
							break;
						case 7:// 逃跑
							Confirm1.start(Confirm1.CONFIRM_ESCAPE, "是否确定逃跑？");
							// this.iCmd[0]=this.FIGHTACTION_ESCAPE;
							// this.iCmd[1]=0;
							// this.iCmd[2]=0;
							// this.FinishRoleOperate();
							break;
						case 8:// 捕捉
							this.iCmd[0] = this.FIGHTACTION_CATCH;
							this.iCmd[1] = 0;
							this.iFightStat = 4;// 选择目标进行捕捉
							break;
						case 9:// 特技
							this.iCmd[0] = this.FIGHTACTION_SPECIAL;
							this.iFightStat = 6;
							XFightSpecialSkill.xss.iShowPoint = -1;
							break;
						}
					}
				}
			}
			this.iEnemyPoint = this.SelectEnemy(x, y);
			if (msg == 3 && this.iEnemyPoint != -1) {// 直接点击怪物攻击
				this.iCmd[0] = this.FIGHTACTION_NORMAL;
				this.iCmd[1] = 0;
				this.iCmd[2] = this.iEnemyPoint;
				this.FinishRoleOperate();
			}
			break;
		case 6:// 人物_选择特技
			if (XFightSpecialSkill.xss.ProcTouch(msg, x, y)) {
				if (XFightSpecialSkill.xss.iUseSkillId == -1)
					this.iFightStat = 0;
				else {
					this.iCmd[1] = XFightSpecialSkill.xss.iUseSkillId;
					if (XFightSpecialSkill.xss.iSelectTarget <= 0) {
						this.iCmd[2] = 0;
						this.FinishRoleOperate();
					} else if (XFightSpecialSkill.xss.iSelectTarget == 1)
						this.iFightStat = 5;// 选择己方
					else
						this.iFightStat = 4;// 选择敌方
				}
			}
			break;
		case 1:// 人物_选择法术
			if (XFightRoleSkill.xfs.ProcTouch(msg, x, y)) {
				if (XFightRoleSkill.xfs.iUseSkillId == -1)
					this.iFightStat = 0;
				else {
					this.iCmd[1] = XFightRoleSkill.xfs.iUseSkillId;
					if (XFightRoleSkill.xfs.iSelectTarget <= 0) {
						this.iCmd[2] = 0;
						this.FinishRoleOperate();
					} else if (XFightRoleSkill.xfs.iSelectTarget == 1)
						this.iFightStat = 5;// 选择己方
					else
						this.iFightStat = 4;// 选择敌方
				}
			}
			break;
		case 2:// 人物_选择物品
			XFightGoods.xfg.ProcTouch(msg, x, y);
			if (XFightGoods.xfg.bReturn)
				this.iFightStat = 0;
			else if (XFightGoods.xfg.bSelectFinished) {// 选择了物品，选择使用对象
				this.lastusegoods1 = XFightGoods.xfg.lockgoods;
				this.iCmd[1] = XFightGoods.xfg.lockgoods.iGid;
				if (XFightGoods.xfg.bUseToDest)
					this.iFightStat = 4;
				else if (XFightGoods.xfg.bFood) {// 烹饪只能给自己吃，不用选择使用目标
					this.iCmd[2] = 0;
					this.FinishRoleOperate();
				} else
					this.iFightStat = 5;
			}
			break;
		case 3:// 人物_选择宠物招出来
			if (XFightCallPet.xfcp.ProcTouch(msg, x, y)) {
				if (XFightCallPet.xfcp.iCallPetId == -1) {
					this.iFightStat = 0;
				} else {
					this.iCmd[1] = XFightCallPet.xfcp.iCallPetId;
					this.iCmd[2] = XFightCallPet.xfcp.iCallPetId;
					this.FinishRoleOperate();
				}
			}
			break;
		case 4:// 人物_选择目标
			if (this.btn_cancel.ProcTouch(msg, x, y)) {
				if (this.btn_cancel.bCheck()) {
					this.iFightStat = 0;
					this.btn_cancel.SetNormal();
				}
				break;
			}
			this.iEnemyPoint = this.SelectEnemy(x, y);
			if (msg == 3 && this.iEnemyPoint != -1) {
				this.iCmd[2] = this.iEnemyPoint;
				this.FinishRoleOperate();
			}
			break;
		case 5:// 人物_选择己方
			if (this.btn_cancel.ProcTouch(msg, x, y)) {
				if (this.btn_cancel.bCheck()) {
					this.btn_cancel.SetNormal();
					this.iFightStat = 0;
				}
				break;
			}
			this.iOurPoint = this.SelectOur(x, y);
			if (msg == 3 && this.iOurPoint != -1) {
				this.iCmd[2] = this.iOurPoint;
				this.FinishRoleOperate();
			}
			break;
		case 10:// 宠物_操作类型
			for (i = 0; i < 6; i++) {
				if (this.btn_petoperate[i].ProcTouch(msg, x, y)) {
					if (this.btn_petoperate[i].bCheck()) {
						this.btn_petoperate[i].SetNormal();
						switch (i) {
						case 0:// 法术
							if (XFightPetSkill.xfps.InitPetSkill(MyPets.mp
									.GetUseingPet()) <= 0) {
								EasyMessage.easymsg.AddMessage("当前宠物没有主动技能");
							} else {
								this.iCmd[0] = this.FIGHTACTION_MAGIC;
								this.iFightStat = 11;
							}
							break;
						case 1:// 使用物品
							this.iCmd[0] = this.FIGHTACTION_USEGOODS;
							this.iFightStat = 12;
							XFightGoods.xfg.InitFightGoods();
							break;
						case 2:// 保护
							this.iCmd[0] = this.FIGHTACTION_PROTECT;
							this.iFightStat = 15;// 选择己方成员
							break;
						case 3:// 宠物防御
							this.iCmd[0] = this.FIGHTACTION_DEFENCE;
							this.iCmd[1] = 0;
							this.iCmd[2] = 0;
							this.FinishPetOperate();
							break;
						case 4:// 逃跑
							Confirm1.start(Confirm1.CONFIRM_ESCAPE, "宠物是否确定逃跑？");
							// this.iCmd[0]=this.FIGHTACTION_ESCAPE;
							// this.iCmd[1]=0;
							// this.iCmd[2]=0;
							// this.FinishPetOperate();
							break;
						case 5:// 自动
							AutoFightFrame.aff.iAutoFightLast = AutoFightFrame.AUTOLAST;
							break;
						}
					}
				}
			}
			this.iEnemyPoint = this.SelectEnemy(x, y);
			if (msg == 3 && this.iEnemyPoint != -1) {
				this.iCmd[0] = this.FIGHTACTION_NORMAL;
				this.iCmd[1] = 0;
				this.iCmd[2] = this.iEnemyPoint;
				this.FinishPetOperate();
			}
			break;
		case 11:// 宠物_选择法术
			if (XFightPetSkill.xfps.ProcTouch(msg, x, y)) {
				if (XFightPetSkill.xfps.bReturn)
					this.iFightStat = 10;
				if (XFightPetSkill.xfps.bUsed) {// 选择目标使用，判断法术施放目标是敌人还是己方
					this.iCmd[1] = XFightPetSkill.xfps.iUseSkillId;
					this.iFightStat = 14;
				}
			}
			break;
		case 12:// 宠物_选择物品
			XFightGoods.xfg.ProcTouch(msg, x, y);
			if (XFightGoods.xfg.bReturn)
				this.iFightStat = 10;
			else if (XFightGoods.xfg.bSelectFinished) {// 选择了物品，选择使用对象
				this.lastusegoods2 = XFightGoods.xfg.lockgoods;
				this.iCmd[1] = XFightGoods.xfg.lockgoods.iGid;
				this.iFightStat = 15;
			}
			break;
		case 14:// 宠物_选择目标
			if (this.btn_cancel.ProcTouch(msg, x, y)) {
				if (this.btn_cancel.bCheck()) {
					this.btn_cancel.SetNormal();
					this.iFightStat = 10;
				}
				break;
			}
			this.iEnemyPoint = this.SelectEnemy(x, y);
			if (msg == 3 && this.iEnemyPoint != -1) {
				this.iCmd[2] = this.iEnemyPoint;
				this.FinishPetOperate();
			}
			break;
		case 15:// 宠物_选择己方
			if (this.btn_cancel.ProcTouch(msg, x, y)) {
				if (this.btn_cancel.bCheck()) {
					this.btn_cancel.SetNormal();
					this.iFightStat = 10;
				}
				break;
			}
			this.iOurPoint = this.SelectOur(x, y);
			if (msg == 3 && this.iOurPoint != -1) {
				this.iCmd[2] = this.iOurPoint;
				this.FinishPetOperate();
			}
			break;
		}
		if (this.iFightStat == 0 || this.iFightStat >= 100) {// 长按
			if (msg == 1) {// 按下开始计时
				i = this.SelectOur(x, y);
				if (i == -1)
					i = this.SelectEnemy(x, y);
				if (i != -1) {

				}
			}
		}
		if ((msg == 2 || msg == 1)
				&& XDefine.bInRect(x, y, GmConfig.SCRW - 191, 0, 108, 80)) {// 在人物血条按下或移动
			this.bShowHpDetail = true;
			return true;
		}
		return false;
	}

	// int iPoint
	 FinishPetOperate() {
		if (this.iCmd[0] == this.FIGHTACTION_USEGOODS) {
			if (this.lastusegoods2.iGid == -1) {// 已经用完
				this.iCmd[0] = this.FIGHTACTION_NORMAL;
				this.iCmd[1] = 0;
				this.iCmd[2] = -1;
			} else {
				// int k=GmPlay.de_goods.intValue(this.lastusegoods2.iTid, 0,
				// 28);//是否可叠加
				// if(k<=1)this.lastusegoods2.iGid=-1;
				// else
				// {
				// this.lastusegoods2.iCount--;
				// if(this.lastusegoods2.iCount<=0)this.lastusegoods2.iGid=-1;
				// }
			}
		}
		this.iLastPetCmd[0] = this.iCmd[0];
		this.iLastPetCmd[1] = this.iCmd[1];
		this.iLastPetCmd[2] = this.iCmd[2];
		this.iCmd[2] = this.SwapPos(this.iCmd[2]);
		GmProtocol.gi().s_FightOperate(1, this.iCmd);
		this.iFightStat = 100;
	}

	 FinishRoleOperate() {// 结束操作，把操作发到服务器，进入等待
		if (this.iCmd[0] == this.FIGHTACTION_USEGOODS) {
			if (this.lastusegoods1.iGid == -1) {
				this.iCmd[0] = this.FIGHTACTION_NORMAL;
				this.iCmd[1] = 0;
				this.iCmd[2] = -1;
			} else {
				// int k=GmPlay.de_goods.intValue(this.lastusegoods1.iTid, 0, 28);
				// if(k<=1)this.lastusegoods1.iGid=-1;
				// else
				// {
				// this.lastusegoods1.iCount--;
				// if(this.lastusegoods1.iCount<=0)this.lastusegoods1.iGid=-1;
				// }
			}
		}
		this.iLastRoleCmd[0] = this.iCmd[0];
		this.iLastRoleCmd[1] = this.iCmd[1];
		this.iLastRoleCmd[2] = this.iCmd[2];
		this.iCmd[2] = this.SwapPos(this.iCmd[2]);
		GmProtocol.gi().s_FightOperate(0, this.iCmd);
		if (this.bHavePet(this.iMyPos))
			this.iFightStat = 10;// 跳到宠物操作
		else
			this.iFightStat = 100;// 直接结束，进入等待状态
	}

	 getfm( pos) {
		// GmPlay.sop("pos="+pos);
		if (pos % 10 == 5)
		{//
			if (parseInt(pos / 10) < 2)
				return this.fat_base[0];// 己方
			else
				return this.fat_base[1];// 对方
		}
		else return this.fat[parseInt(pos / 10)][pos % 10];
	}

	ProcFightData() {
		var i, j;
		var pfd;
		var pfm;
		var bBreak = false;
		// GmPlay.sop("this.iFDPoint="+this.iFDPoint+"   this.iTimeStamp="+this.fds[this.iFDPoint].iTimeStamp);
		while (this.fds[this.iFDPoint].iTimeStamp <= this.iTimeStamp && this.iFDPoint < this.iFDCount) {
			// GmPlay.sop("this.iFDPoint="+this.iFDPoint+"   this.iTimeStamp="+this.fds[this.iFDPoint].iTimeStamp);
			pfd = this.fds[this.iFDPoint];
			switch (pfd.iActType) {
			case 0:// 移动
				pfd.bActing = true;
				pfd.iValues[1] = 0;
				this.getfm(pfd.iAPos).iDx = this.getfm(pfd.iValues[0]).iOx
						+ this.getfm(pfd.iAPos).iMoveOffX;
				this.getfm(pfd.iAPos).iDy = this.getfm(pfd.iValues[0]).iOy
						+ this.getfm(pfd.iAPos).iMoveOffY;
				break;
			case 18:// 保护
				pfd.bActing = true;
				pfd.iValues[1] = 0;
				this.getfm(pfd.iAPos).iDx = this.getfm(pfd.iValues[0]).iOx
						- this.getfm(pfd.iAPos).iMoveOffX / 2;
				this.getfm(pfd.iAPos).iDy = this.getfm(pfd.iValues[0]).iOy
						- this.getfm(pfd.iAPos).iMoveOffY / 2;
				break;// xxxx
			case 1:// 普通攻击
				pfm = this.getfm(pfd.iAPos);
				pfm.AddAnima("普通攻击");
				if (pfm.iType == 0 || (pfm.iType == 2 && pfm.iSpecialType == 1)) {// 人物，或怪物变人
					if (pfm.iSex == 0)
						GmPlay.x_wav.StartWav("role0_attack", false);
					else
						GmPlay.x_wav.StartWav("role1_attack", false);
				} else if (pfm.iType == 1
						|| (pfm.iType == 2 && pfm.iSpecialType != 1)) {
					GmPlay.x_wav.StartWav_Pet(pfm.iTid % 10000, 0);
				}
				break;
			case 2:// 受到伤害
				pfm = this.getfm(pfd.iAPos);
				pfm.AddAnima("被攻击");
				if (pfm.iType == 0 || (pfm.iType == 2 && pfm.iSpecialType == 1)) {
					if (pfm.iSex == 0)
						GmPlay.x_wav.StartWav("role0_hurt", false);
					else
						GmPlay.x_wav.StartWav("role1_hurt", false);
				} else if (pfm.iType == 1
						|| (pfm.iType == 2 && pfm.iSpecialType != 1)) {
					GmPlay.x_wav.StartWav_Pet(pfm.iTid % 10000, 2);
				}
				break;
			case 3:// 防御
				pfm = this.getfm(pfd.iAPos);
				pfm.AddAnima("防御");
				GmPlay.x_wav.StartWav("defence", false);
				XFightEffect.fe.AddEffect2(pfm.iX, pfm.iY, 10, "防御",
						pfd.iAPos / 10 < 2 ? false : true);
				break;
			case 4:// 返回原地
				pfd.bActing = true;
				pfd.iValues[1] = 0;
				break;
			case 5:// 延迟
				this.iDelay++;
				if (this.iDelay < pfd.iAPos) {
					bBreak = true;
					break;
				}
				this.iDelay = 0;
				break;
			case 6:// 一个人行动完
				this.iTimeStamp = 0;
				break;
			case 7:// 死亡
				pfm = this.getfm(pfd.iAPos);
				if (pfd.iValues[0] == 0) {
					pfm.AddAnima("死亡过程");
					pfm.SetBaseAnima("死亡");
					if (pfm.iType == 0
							|| (pfm.iType == 2 && pfm.iSpecialType == 1)) {
						if (pfm.iSex == 0)
							GmPlay.x_wav.StartWav("role0_die", false);
						else
							GmPlay.x_wav.StartWav("role1_die", false);
					} else if (pfm.iType == 1
							|| (pfm.iType == 2 && pfm.iSpecialType != 1)) {
						GmPlay.x_wav.StartWav_Pet(pfm.iTid % 10000, 3);
					}
				} else {
					pfm.SetBaseAnima("战斗站立");
				}
				break;
			case 8:// 逃跑
			case 25:// 逃跑失败
				this.getfm(pfd.iAPos).iDx = this.getfm(pfd.iAPos).iOx
						+ this.getfm(pfd.iAPos).iMoveOffX * 6;
				this.getfm(pfd.iAPos).iDy = this.getfm(pfd.iAPos).iOy
						+ this.getfm(pfd.iAPos).iMoveOffY * 6;
				this.getfm(pfd.iAPos).SetBaseAnima("逃跑");
				pfd.iValues[1] = 0;
				pfd.bActing = true;
				GmPlay.x_wav.StartWav("escape", false);
				break;
			case 21:// 行走
				pfm = this.getfm(pfd.iAPos);
				// GmPlay.sop1("apos="+pfd.iAPos+",,,value0="+pfd.iValues[0]);
				if (pfd.iAPos == pfd.iValues[0]) {
					this.getfm(pfd.iAPos).iDx = this.getfm(pfd.iValues[0]).iOx;
					this.getfm(pfd.iAPos).iDy = this.getfm(pfd.iValues[0]).iOy;
				} else {
					this.getfm(pfd.iAPos).iDx = this.getfm(pfd.iValues[0]).iOx
							+ this.getfm(pfd.iAPos).iMoveOffX;
					this.getfm(pfd.iAPos).iDy = this.getfm(pfd.iValues[0]).iOy
							+ this.getfm(pfd.iAPos).iMoveOffY;
				}
				if (pfm.iPos < 20 && pfm.iDx > pfm.iX)
					pfm.FaceTo(false);
				if (pfm.iPos >= 20 && pfm.iDx < pfm.iX)
					pfm.FaceTo(false);
				this.getfm(pfd.iAPos).iTx = this.getfm(pfd.iAPos).iX;
				this.getfm(pfd.iAPos).iTy = this.getfm(pfd.iAPos).iY;
				this.getfm(pfd.iAPos).SetBaseAnima("跑步");
				pfd.iValues[3] = 0;
				pfd.bActing = true;
				break;
			case 19:// 打飞出场
				pfd.iValues[1] = 0;
				pfd.bActing = true;
				this.getfm(pfd.iAPos).iFlying = 1;
				break;
			case 17:// 闪避
				// this.getfm(pfd.iAPos).iDx=this.getfm(pfd.iAPos).iOx+this.getfm(pfd.iAPos).iMoveOffX*3;
				// this.getfm(pfd.iAPos).iDy=this.getfm(pfd.iAPos).iOy;
				pfd.iValues[1] = 0;
				pfd.bActing = true;
				break;
			case 9:// 改变状态
				this.getfm(pfd.iAPos).ChangeStatus(pfd.iValues[0], pfd.iValues[1]);
				break;
			case 24:// 改变怒气
				if (this.getfm(pfd.iAPos).bMe)
					GmMe.me.rbs.iAnger = pfd.iValues[0];
				// fgh
				// this.getfm(pfd.iAPos).iAnger=pfd.iValues[0];
				break;
			case 12:// 改变血蓝
				// i=pfd.iValues[0]-this.getfm(pfd.iAPos).iHp;//掉多少血
				NumberEffect.ne.AddEffect(this.getfm(pfd.iAPos).iX,
						this.getfm(pfd.iAPos).iY - 80, pfd.iValues[0]
								- this.getfm(pfd.iAPos).iHp);
				this.getfm(pfd.iAPos).iHp = pfd.iValues[0];
				this.getfm(pfd.iAPos).iMp = pfd.iValues[1];
				if (this.getfm(pfd.iAPos).iHp < 0)
					this.getfm(pfd.iAPos).iHp = 0;
				if (this.getfm(pfd.iAPos).iMp < 0)
					this.getfm(pfd.iAPos).iMp = 0;

				// GmPlay.sop("sdf==="+this.getfm(pfd.iAPos).iMp);
				break;
			case 13:// 直接消失
				this.getfm(pfd.iAPos).bUseing = false;
				break;
			case 14:// 使用技能
				pfm = this.getfm(pfd.iAPos);
				pfm.AddAnima("施法");
				if (pfm.iType == 0 || (pfm.iType == 2 && pfm.iSpecialType == 1)) {
					if (pfm.iSex == 0)
						GmPlay.x_wav.StartWav("role0_magic", false);
					else
						GmPlay.x_wav.StartWav("role1_magic", false);
				} else if (pfm.iType == 1
						|| (pfm.iType == 2 && pfm.iSpecialType != 1)) {
					GmPlay.x_wav.StartWav_Pet(pfm.iTid % 10000, 1);
				}
				break;
			case 26:// 飞刀效果
				pfm = this.getfm(pfd.iValues[0]);// 目标fat
				GmPlay.sop("目标:" + pfd.iValues[0]);
				XFightEffect.fe.AddDarts(this.getfm(pfd.iAPos).iX,
						this.getfm(pfd.iAPos).iY, pfm.iX, pfm.iY, pfd.iValues[1],
						pfd.iValues[2]);
				break;
			case 27://技能名称展示
				pfm=this.getfm(pfd.iAPos);
				pfm.InitSN(pfd.iValues[0]);
				break;
			case 15:// 效果
				pfm = this.getfm(pfd.iValues[0]);// 目标fat
				XFightEffect.fe.AddEffect(pfm.iX, pfm.iY, pfd.iValues[1],
						pfd.iAPos / 10 < 2 ? false : true);
				break;
			case 23:// 带名字的效果
				pfm = this.getfm(pfd.iValues[0]);// 目标fat
				XFightEffect.fe.AddEffect2(pfm.iX, pfm.iY, pfd.iValues[1],
						pfd.sValue, pfd.iAPos / 10 < 2 ? false : true);
				break;
			case 16:// 士气更新
				this.iShiQi[0] = pfd.iValues[0];
				this.iShiQi[1] = pfd.iValues[1];
				this.SwapShiQi();
				break;
			case 20:
				pfm = this.getfm(pfd.iAPos);
				pfm.iPopoDelay = 200;
				pfm.sPopoString = pfd.sValue;
				PublicChat_SmallFrame.gi().AddMessage(0, 0, pfm.sName, 6, 0,
						pfd.sValue, null);
				break;
			case 22://
				this.DoUpdate(pfd.iAPos);
				break;
			case 100:// 状态变为操作
				for (i = 0; i < this.iFDPoint; i++) {
					pfd = this.fds[i];
					if (pfd.bActing) {
						if (pfd.iActType == 19) {
							break;
						}
					}
				}
				if (i < this.iFDPoint) {
					bBreak = true;
					break;
				}
				this.iFightStat = 0;
				this.iRound++;// 回合数增加
				for (i = 0; i < 4; i++) {
					for (j = 0; j < GmMe.MAXTEAMOLE; j++) {
						this.fat[i][j].ActionStatus();
					}
				}
				this.fat_base[0].ActionStatus();
				this.fat_base[1].ActionStatus();

				if (this.bFightFinished) {// 战斗结束，离开战斗画面
					this.iFightStat = 300;
					this.iTimeOut = 0;
					// XFight.bFighting=false;
				}
				break;
			}
			if (bBreak)
				break;
			this.iFDPoint++;
		}
		this.iTimeStamp++;

		for (i = 0; i < this.iFDPoint; i++) {
			pfd = this.fds[i];
			if (pfd.bActing) {
				switch (pfd.iActType) {
				case 0:// 移动到目标
					pfd.iValues[1]++;
					pfm = this.getfm(pfd.iAPos);
					pfm.iX = pfm.iOx + (pfm.iDx - pfm.iOx) * pfd.iValues[1] / 3;
					pfm.iY = pfm.iOy + (pfm.iDy - pfm.iOy) * pfd.iValues[1] / 3;
					if (pfd.iValues[1] >= 3)
						pfd.bActing = false;
					break;
				case 18:// 移动到保护目标
					pfd.iValues[1]++;
					pfm = this.getfm(pfd.iAPos);
					pfm.iX = pfm.iOx + (pfm.iDx - pfm.iOx) * pfd.iValues[1] / 3;
					pfm.iY = pfm.iOy + (pfm.iDy - pfm.iOy) * pfd.iValues[1] / 3;
					if (pfd.iValues[1] >= 3)
						pfd.bActing = false;
					break;
				case 4:// 返回原地
					j = 3 - pfd.iValues[1];
					pfm = this.getfm(pfd.iAPos);
					pfm.iX = pfm.iOx + (pfm.iX - pfm.iOx) / j;
					pfm.iY = pfm.iOy + (pfm.iY - pfm.iOy) / j;
					pfd.iValues[1]++;
					if (pfd.iValues[1] >= 3) {
						pfm.iX = pfm.iOx;
						pfm.iY = pfm.iOy;
						pfd.bActing = false;
					}
					break;
				case 8:// 逃跑
				case 25:// 逃跑失败
					pfd.iValues[1]++;
					if (pfd.iValues[1] < 10)
						break;
					j = pfd.iValues[1] - 10;
					pfm = this.getfm(pfd.iAPos);
					if (pfd.iActType == 8) {
						pfm.iX = pfm.iOx + (pfm.iDx - pfm.iOx) * j / 40;
						pfm.iY = pfm.iOy + (pfm.iDy - pfm.iOy) * j / 40;
					}
					if (pfd.iActType == 25) {
						if (j == 0) {
							pfm.FaceTo(true);
							pfm.SetBaseAnima("战斗站立");
						}
						if (j > 0) {
							if (j % 2 == 0)
								pfm.FaceTo(true);
							else
								pfm.FaceTo(false);
							if (j > 10) {
								pfm.FaceTo(true);
								pfd.bActing = false;
							}
							pfm.SetBaseAnima("战斗站立");
						}
						break;
					}
					if (j >= 40) {
						pfd.bActing = false;
						pfm.bUseing = false;
						if (pfm.iPos == this.iMyPos) {
							this.iFightStat = 0;
							if (this.bFightFinished) {
								this.iFightStat = 300;
								this.iTimeOut = 0;
							}
						}
					}
					break;
				case 21:// walk
					pfd.iValues[3]++;
					pfm = this.getfm(pfd.iAPos);
					pfm.iX = pfm.iTx + (pfm.iDx - pfm.iTx) * pfd.iValues[3]
							/ pfd.iValues[1];
					pfm.iY = pfm.iTy + (pfm.iDy - pfm.iTy) * pfd.iValues[3]
							/ pfd.iValues[1];
					if (pfd.iValues[3] >= pfd.iValues[2]) {
						pfm.FaceTo(true);
						pfm.SetBaseAnima("战斗站立");
						pfd.bActing = false;
					}
					break;
				case 19:// 飞出场
					pfm = this.getfm(pfd.iAPos);

					if (pfm.iFlying == 0) {
						pfd.bActing = false;
						break;
					} else if (pfm.iFlying < 10) {
					} else if (pfm.iFlying == 10) {
						this.getfm(pfd.iAPos).ianPoint = 0;
						this.getfm(pfd.iAPos).NextAnima();
						this.getfm(pfd.iAPos).SetBaseAnima("被攻击");
					} else {
						j = pfm.iFlying - 10;
						if (pfd.iAPos < 20) {
							if (j < 8) {
								pfm.iX += 30;
								pfm.iY -= 15;
							} else {
								pfm.iX -= 30;
								pfm.iY -= 15;
							}
						} else {
							if (j < 8) {
								pfm.iX -= 30;
								pfm.iY -= 15;
							} else {
								pfm.iX += 30;
								pfm.iY -= 15;
							}
						}
					}

					if (pfm.iY <= 0) {
						pfd.bActing = false;
						pfm.bUseing = false;
					}
					pfm.iFlying++;
					break;
				case 17:// 闪避
					pfm = this.getfm(pfd.iAPos);
					if (pfd.iValues[1] >= 0 && pfd.iValues[1] <= 3)
						pfm.iX += pfm.iMoveOffX / 8;
					if (pfd.iValues[1] >= 4 && pfd.iValues[1] <= 7)
						pfm.iX -= pfm.iMoveOffX / 8;
					// this.getfm(pfd.iAPos).iDx=this.getfm(pfd.iAPos).iOx+this.getfm(pfd.iAPos).iMoveOffX*3;
					// this.getfm(pfd.iAPos).iDy=this.getfm(pfd.iAPos).iOy;
					pfd.iValues[1]++;
					if (pfd.iValues[1] > 8) {
						pfm.iX = pfm.iOx;
						pfd.bActing = false;
					}
					break;
				}
			}
		}
	}

	getfightdata( pls) {
		pls.bCompress = true;
		var i = 0;
		var apos = pls.GetNextByte();
		GmPlay.sop("Fight Data Length : " + pls.iLength);

		var bbb;
		while (apos != 101) {
			apos = this.SwapPos(apos);
			this.fds[i].bActing = false;
			this.fds[i].iAPos = apos;
			bbb =  pls.GetNextByte();
			if (bbb < 0)
				this.fds[i].iTimeStamp = 256 + bbb;
			else
				this.fds[i].iTimeStamp = bbb;
			// GmPlay.sop("stamp="+this.fds[i].iTimeStamp);
			this.fds[i].iActType = pls.GetNextByte();
			GmPlay.sop("iActType=" + this.fds[i].iActType + "stamp="
					+ this.fds[i].iTimeStamp);
			switch (this.fds[i].iActType) {
			case 5:
				this.fds[i].iAPos = this.SwapPos(apos);
				break;
			case 0:// 移动到目标pos
			case 18:// 保护
				this.fds[i].iValues[0] = pls.GetNextByte();
				this.fds[i].iValues[0] = this.SwapPos(this.fds[i].iValues[0]);
				break;
			case 7:// 死亡/复活
				this.fds[i].iValues[0] = pls.GetNextByte();
				break;
			case 9:// 改变状态
				this.fds[i].iValues[0] = pls.GetNextByte();
				this.fds[i].iValues[1] = pls.GetNextByte();
				break;
			case 24:// 改变怒气
				this.fds[i].iValues[0] = pls.GetNextShort();
				break;
			case 12:// 修改血蓝
			case 16:// 改变士气
				this.fds[i].iValues[0] = pls.GetNextShort();
				this.fds[i].iValues[1] = pls.GetNextShort();
				// GmPlay.sop("edit xue lan"+this.fds[i].iValues[0]+",,, shi="+this.fds[i].iValues[1]);
				break;
			case 15:// 效果
				this.fds[i].iValues[0] = pls.GetNextByte();
				this.fds[i].iValues[0] = this.SwapPos(this.fds[i].iValues[0]);
				this.fds[i].iValues[1] = pls.GetNextShort();
				break;
			case 20:// 对应说话
				this.fds[i].sValue = pls.GetNextString();
				break;
			case 21:// walk
				this.fds[i].iValues[0] = pls.GetNextByte();
				this.fds[i].iValues[0] = this.SwapPos(this.fds[i].iValues[0]);
				this.fds[i].iValues[1] = pls.GetNextByte();// 分段数
				this.fds[i].iValues[2] = pls.GetNextByte();// 完成段数
				break;
			case 22:// 更新fat
				break;
			case 23:// 新效果
				this.fds[i].iValues[0] = pls.GetNextByte();
				this.fds[i].iValues[0] = this.SwapPos(this.fds[i].iValues[0]);
				this.fds[i].iValues[1] = pls.GetNextShort();
				this.fds[i].sValue = pls.GetNextString();
				break;
			case 26:// 飞刀效果
				this.fds[i].iValues[0] = pls.GetNextByte();
				this.fds[i].iValues[0] = this.SwapPos(this.fds[i].iValues[0]);
				this.fds[i].iValues[1] = pls.GetNextByte();
				this.fds[i].iValues[2] = pls.GetNextByte();
				break;
			case 27://技能名称展示
				this.fds[i].iValues[0] = pls.GetNextShort();
				break;
			}
			// GmPlay.sop("count="+i+","+this.fds[i].iActType);
			i++;
			apos = pls.GetNextByte();
		}

		this.iFDPoint = 0;
		this.iFDCount = i;
		this.iFightStat = 200;// 开始播放战斗动画
		this.iTimeStamp = 0;
		this.iDelay = 0;
		this.iWaited = 0;
		pls.bCompress = false;
	}

	getfightflag( pls) {
		var i, j, k, m;
		// 等待中，才更新，否则，全体置为已出手
		if (this.iFightStat > 100)
			return;
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 5; j++) {
				this.fat[i][j].bActed = false;
			}
		}

		for (i = 0; i < 4; i++) {
			m = i;
			if (this.bSwap) {
				if (m < 2)
					m = i + 2;
				else
					m = i - 2;
				;
			}
			j = pls.GetNextByte();
			for (k = 0; k < 5; k++) {
				if ((j & (1 << k)) != 0)
					this.fat[m][k].bActed = true;
			}
		}
	}
}
	// XFight.fatpos={
        	// {{800-80,240},{800-80,240-60},{800-80,240+60},{800-80,240-120},{800-80,240+120}},
	// {{800-200,240},{800-200,240-60},{800-200,240+60},{800-200,240-120},{800-200,240+120}},
	// {{80,240},{80,240-60},{80,240+60},{80,240-120},{80,240+120}},
	// {{200,240},{200,240-60},{200,240+60},{200,240-120},{200,240+120}}};
    
	XFight.FIGHTWITH_DARK = 1;
	XFight.FIGHTWITH_USER = 2;
	XFight.FIGHTWITH_NPC = 3;
	XFight.FIGHTWITH_SPECIAL = 4;

    XFight.zhenpos = [
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],// 普通阵
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],

        [ [ 0, -1 ], [ 0, 1 ], [ 0, 1 ], [ 0, 1 ], [ 0, 1 ] ],// 天罡
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],

        [ [ 0, -1 ], [ 0, -1 ], [ 0, -1 ], [ 0, 1 ], [ 0, 1 ] ],// 八卦
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],

        [ [ 0, 1 ], [ 0, -1 ], [ 0, -1 ], [ 0, 1 ], [ 0, 1 ] ],// 疾风
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],

        [ [ 0, -1 ], [ 0, 1 ], [ 0, 1 ], [ 0, -1 ], [ 0, -1 ] ],// 飞龙
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ],

        [ [ 0, -2 ], [ 0, 1 ], [ 0, 1 ], [ -1, -2 ], [ 1, -2 ] ],// 聚星
        [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ], ];
XFight.basepos = [
        [ [ 0, 0 ], [ 1, 0 ], [ -1, 0 ], [ 2, 0 ], [ -2, 0 ] ],
        [ [ 0, 1 ], [ 1, 1 ], [ -1, 1 ], [ 2, 1 ], [ -2, 1 ] ] ];
            
XFight.bFighting = false;
XFight.ft = null;
XFight.gi=function()
{
	if(XFight.ft==null)XFight.ft=new XFight();
	return XFight.ft;
}