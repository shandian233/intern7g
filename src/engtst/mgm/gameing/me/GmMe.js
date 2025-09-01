
import PublicInterface from "../../../../zero/Interface/PublicInterface"
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import SortAnima from "../../../../config/SortAnima"
import XDefine from "../../../../config/XDefine"
import DrawBuffer from "../../../../map/DrawBuffer"
import MapManager from "../../../../map/MapManager"
import PackageTools from "../../../../engine/PackageTools"
import XButton from "../../../../engine/control/XButton"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import FireworksEffect from "../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../engtst/mgm/History/XRecordFast"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import Gameing from "../../../../engtst/mgm/gameing/Gameing"
import NearRole from "../../../../engtst/mgm/gameing/NearRole"
import FastButton from "../../../../engtst/mgm/gameing/fast/FastButton"
import SystemOperate from "../../../../engtst/mgm/gameing/fast/SystemOperate"
import XFight from "../../../../engtst/mgm/gameing/fight/XFight"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import JQMode from "../../../../engtst/mgm/gameing/help/JQMode"
import ExtHelp from "../../../../engtst/mgm/gameing/help/ExtHelp/ExtHelp"
import FirstCharge from "../../../../engtst/mgm/gameing/help/TopIcon/FirstCharge"
import FiveGift from "../../../../engtst/mgm/gameing/help/TopIcon/FiveGift"
import LoginGift from "../../../../engtst/mgm/gameing/help/TopIcon/LoginGift"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyGoodsFrame from "../../../../engtst/mgm/gameing/me/goods/MyGoodsFrame"
import Mounts from "../../../../engtst/mgm/gameing/me/mounts/Mounts"
import MyMounts from "../../../../engtst/mgm/gameing/me/mounts/MyMounts"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import PetsFrame from "../../../../engtst/mgm/gameing/me/pet/PetsFrame"
import MySell from "../../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../../engtst/mgm/gameing/me/team/MyTeam"
import GoodsStoreFrame from "../../../../engtst/mgm/gameing/me/trade/GoodsStoreFrame"
import PetStoreFrame from "../../../../engtst/mgm/gameing/me/trade/PetStoreFrame"
import _ROLEBASE from "./_ROLEBASE"

export default class GmMe {
	constructor() {
		this.iRace=0;
		this.iSex=0;
		this.bInited = false;
		this.rbs = new _ROLEBASE();
		this.iOldType = -1;

		this.bShowHpDetail = false;
		this.RETEXT_CHANGETYPE = 1;
		this.RETEXT_LOCKER = 2;
		this.RETEXT_ANGER = 4;
		this.bHaveLock = false;
	   this.bLocked;
	   this.iUnlockTime;
		this.RETBASE_HP = 1;
		this.RETBASE_MP = 2;
		this.RETBASE_POWER = 4;
		this.RETBASE_MONEY = 8;
		this.RETBASE_EXP = 16;
		this.RETBASE_LEV = 32;
		this.RETBASE_ATT = 64;
		this.RETBASE_OTHER = 128;
	   this.iScore;
	   this.iComplexScore;
	}

	Init()
	{
		var i,j;
		this.iFlag = new Int32Array(64);//
		this.iFlagExt=new Int32Array(64);//

		this.aa_body = new AnimaAction();
		this.aa_weapon = new AnimaAction();
		this.aa_mounts = new AnimaAction();
		this.iSpeed = 8;
		this.iPopoDelay = 0;

		this.iWeapTid = -1;
		this.bwc = true;
		this.bsc = true;
		this.bfc8 = false;
		this.bfc4 = true;
		this.bfc6 = false;
		this.sStat = "站立";
		this.iFace8 = 0;
		this.sFace8 = "左";
		this.iRid = 0;
		this.iMarks = new Array(GmMe.MAXMARK);//
		for(i=0;i<GmMe.MAXMARK;i++)this.iMarks[i]=new Int32Array(3);

		this.iFollowPid = 0;
		this.iFollowX = 0;
		this.iFollowY = 0;
		this.aa_follow = new AnimaAction();

		this.aa_team = new AnimaAction();
		GmPlay.xani_ui.InitAnimaWithName("队伍图标", this.aa_team);

		this.btn_reset = new XButton(GmPlay.xani_ui);
		this.btn_reset.Move(0, 0, 118, 83);
		this.btn_reset.bSingleButton = true;
		this.btn_reset.sName = "重置";

		this.btn_att = new XButton(GmPlay.xani_ui);
		this.btn_att.bSingleButton = true;
		this.btn_att.sName = "属性";

		this.btn_petatt = new XButton(GmPlay.xani_ui);
		this.btn_petatt.bSingleButton = true;
		this.btn_petatt.sName = "宠物";
		this.btn_petatt.Move(GmConfig.SCRW - 190-83, 0, 83, 83);

		this.iFightPid = -1;
		this.iFollowPid = -1;
		this.iFightMid = -1;
		this.iMountsTid=-1;
		this.iMountsJjLev=-1;
		this.bInited = true;
		
		this.aa_mts=new Array(6);//
		this.aa_bds=new Array(6);//
		this.aa_cls=new Array(6);//
		this.iColor=new Int32Array(6);//
		for(i=0;i<6;i++)
		{
			this.aa_mts[i]=new AnimaAction();
			this.aa_bds[i]=new AnimaAction();
			this.aa_cls[i]=new Array(5);
			for(j=0;j<5;j++)
			{
				this.aa_cls[i][j]=new AnimaAction();
			}
			this.iColor[i]=0;
		}
	}

	BeInvite( pls) {// 被邀请
		this.iInviteId = pls.GetNextInt();
		var name = pls.GetNextString();

		Confirm1.start(Confirm1.CONFIRM_INVITE, name + "邀请你加入队伍，是否同意？");
	}



	start( pathxy,  pathcount) {
		this.iPathPoint = 0;

		this.iSx = pathxy[this.iPathPoint][0];
		this.iSy = pathxy[this.iPathPoint][1];
		this.iDx = pathxy[this.iPathPoint + 1][0];
		this.iDy = pathxy[this.iPathPoint + 1][1];

		this.iTick = parseInt(XDefine.llength(this.iSx, this.iSy, this.iDx, this.iDy) / this.iSpeed);
		this.iAt = 0;

		if (this.iTick == 0) {
			this.iX = this.iDx;
			this.iY = this.iDy;
		} else {
			this.iX = this.iSx + (this.iDx - this.iSx) * this.iAt / this.iTick;
			this.iY = this.iSy + (this.iDy - this.iSy) * this.iAt / this.iTick;
		}
		this.FaceTo();
		this.ChangeStat("跑步");
	}

	TeamFollow() {// 队伍跟随
		var i;
		if (MyTeam.bTeamLeader()) 
		{// 自己是队长，让队员跟随
			for (i = 1; i < GmMe.MAXTEAMOLE; i++) 
			{
				if (MyTeam.iTeamRid[i] != 0) 
				{
					var nr = Gameing.gameing.findnrs(MyTeam.iTeamRid[i]);
					if (nr != null)
					{
						nr.iDx = this.iMarks[i * 10][0];
						nr.iDy = this.iMarks[i * 10][1];
						nr.iDFaceTo = this.iMarks[i * 10][2];
					}
				}
			}
		}
	}

	next( pathxy,  pathcount) {
		var i;
		if (!this.IsStat("跑步"))
			return true;
		this.iAt++;
		if (this.iTick == 0) {
			this.iX = this.iDx;
			this.iY = this.iDy;
		} else {
			for (i = GmMe.MAXMARK - 1; i > 0; i--) {
				this.iMarks[i][0] = this.iMarks[i - 1][0];
				this.iMarks[i][1] = this.iMarks[i - 1][1];
				this.iMarks[i][2] = this.iMarks[i - 1][2];
			}
			this.iMarks[0][0] = this.iX;
			this.iMarks[0][1] = this.iY;
			this.iMarks[0][2] = this.iFace8 + this.iFace4 * 10;
			this.iX = this.iSx + (this.iDx - this.iSx) * this.iAt / this.iTick;
			this.iY = this.iSy + (this.iDy - this.iSy) * this.iAt / this.iTick;
		}
		if (this.iAt >= this.iTick) {
			this.iPathPoint++;
			if (this.iPathPoint >= pathcount - 1) {
				this.ChangeStat("站立");
				return true;
			}

			this.iSx = pathxy[this.iPathPoint][0];
			this.iSy = pathxy[this.iPathPoint][1];
			this.iDx = pathxy[this.iPathPoint + 1][0];
			this.iDy = pathxy[this.iPathPoint + 1][1];

			this.iTick = parseInt(XDefine.llength(this.iSx, this.iSy, this.iDx, this.iDy) / this.iSpeed);
			this.iAt = 0;

			if (this.iTick == 0) {
				this.iX = this.iDx;
				this.iY = this.iDy;
			} else {
				this.iX = this.iSx + (this.iDx - this.iSx) * this.iAt / this.iTick;
				this.iY = this.iSy + (this.iDy - this.iSy) * this.iAt / this.iTick;
			}
			this.FaceTo();
		}

		return false;
	}

	FaceTo() {//
		var i, j;
		var s;

		i = 360 - XDefine.GetAngleXY(this.iDx, this.iDy, this.iSx, this.iSy);
		i %= 360;

		j = this.iFace4;
		if (0 <= i && i <= 90)
			this.iFace4 = 0;
		else if (90 <= i && i <= 180)
			this.iFace4 = 3;
		else if (180 <= i && i <= 270)
			this.iFace4 = 2;
		else
			this.iFace4 = 1;
		if (j != this.iFace4)
			this.bfc4 = true;

		j = this.iFace6;
		if (0 <= i && i <= 30)
			this.iFace6 = 0;
		else if (30 < i && i <= 90)
			this.iFace6 = 5;
		else if (90 < i && i <= 150)
			this.iFace6 = 4;
		else if (150 < i && i <= 210)
			this.iFace6 = 3;
		else if (210 < i && i <= 270)
			this.iFace6 = 2;
		else if (270 < i && i <= 330)
			this.iFace6 = 1;
		else
			this.iFace6 = 0;
		if (j != this.iFace6)
			this.bfc6 = true;

		s = this.sFace8;
		if (45 * 1 - 23 < i && i < 45 * 1 + 23) {
			this.iFace8 = 1;
			this.sFace8 = "右上";
		} else if (45 * 2 - 23 < i && i < 45 * 2 + 23) {
			this.iFace8 = 2;
			this.sFace8 = "上";
		} else if (45 * 3 - 23 < i && i < 45 * 3 + 23) {
			this.iFace8 = 3;
			this.sFace8 = "左上";
		} else if (45 * 4 - 23 < i && i < 45 * 4 + 23) {
			this.iFace8 = 4;
			this.sFace8 = "左";
		} else if (45 * 5 - 23 < i && i < 45 * 5 + 23) {
			this.iFace8 = 5;
			this.sFace8 = "左下";
		} else if (45 * 6 - 23 < i && i < 45 * 6 + 23) {
			this.iFace8 = 6;
			this.sFace8 = "下";
		} else if (45 * 7 - 23 < i && i < 45 * 7 + 23) {
			this.iFace8 = 7;
			this.sFace8 = "右下";
		} else {
			this.iFace8 = 0;
			this.sFace8 = "右";
		}
		// if(i<180)
		// {
		// iFaceTo=1;
		// sFaceTo="右";
		// }
		// else
		// {
		// iFaceTo=0;
		// sFaceTo="左";
		// }
		if (s!=this.sFace8)
			this.bfc8 = true;
		// if(j!=iFaceTo)bfc=true;
	}

	ChangeStat( s) {
		if (this.sStat!=s) {
			this.sStat = s;
			this.bsc = true;
		}
	}

	IsStat( s) {
		if (this.sStat==s)
			return true;
		else
			return false;
	}


//	static int iOldFaceto=-1,iOldStat=-1;
	DrawMounts( x, y, faceto, stat, changed)
	{//1鹿,2狮,3马
//		if(1==1)return;
		var i,j=0;
		var xb=this.iRace*2+this.iSex;
		var ifaceto=GmMe.face_sti(faceto);
		var istat=GmMe.stat_sti(stat);
		var itype=this.iMountsTid-1;
		var ijj=this.iMountsJjLev-1;
//{{"前","人前","后","人后","武器"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"后","人","武器","前"},{"左翅膀","人左","身体","人右","右翅膀","武器"},{"左翅膀","人左","身体","人右","右翅膀","武器"},{"左翅膀","人左","身体","人右","右翅膀","武器"}},//二阶
//GmPlay.xani_nmounts[itype]
		var offy=0;
		if(changed)this.iOffY=0;
		var lionoff=0;
		if(this.iMountsTid==2)lionoff=12;
//		this.iMountsJjLev--;
//		GmPlay.sop("itype="+itype+",,,,ijj="+ijj+",,,,istat="+istat+",,,ifaceto="+ifaceto);
//		this.aa_mts,this.aa_bds，0up     1down      2left     ,3right        ,4middle
		for(i=0;i<SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto].length;i++)
		{
//			GmPlay.sop(i+"="+SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]);
			if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="左翅膀")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(this.iMountsJjLev+"_"+stat+"_"+faceto+"_左翅膀",this.aa_mts[2]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[2]);
				this.aa_mts[2].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="右翅膀")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(this.iMountsJjLev+"_"+stat+"_"+faceto+"_右翅膀",this.aa_mts[3]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[3]);
				this.aa_mts[3].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="前")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(this.iMountsJjLev+"_"+stat+"_"+faceto+"_前",this.aa_mts[0]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[0]);
				this.aa_mts[0].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="后")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(this.iMountsJjLev+"_"+stat+"_"+faceto+"_后",this.aa_mts[1]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[1]);
				this.aa_mts[1].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="身体")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(this.iMountsJjLev+"_"+stat+"_"+faceto+"_身体",this.aa_mts[4]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[4]);
				this.aa_mts[4].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="飘带")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(this.iMountsJjLev+"_"+stat+"_"+faceto+"_飘带",this.aa_mts[5]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[5]);
				this.aa_mts[5].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人前")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_前",this.aa_bds[0]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_前",0);
					j=this.aa_bds[0].pani.iAnimaY(this.aa_bds[0]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[0]);
				this.DrawColor(xb,this.aa_bds[0].iFrame,y+offy,x,y+lionoff,0);
				this.aa_bds[0].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人后")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_后",this.aa_bds[1]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_后",1);
					j=this.aa_bds[1].pani.iAnimaY(this.aa_bds[1]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[1]);
				this.DrawColor(xb,this.aa_bds[1].iFrame,y+offy,x,y+lionoff,1);

				this.aa_bds[1].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人左")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_左",this.aa_bds[2]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_左",2);
					j=this.aa_bds[2].pani.iAnimaY(this.aa_bds[2]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[2]);
				this.DrawColor(xb,this.aa_bds[2].iFrame,y+offy,x,y+lionoff,2);

				this.aa_bds[2].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人右")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_右",this.aa_bds[3]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_右",3);
					j=this.aa_bds[3].pani.iAnimaY(this.aa_bds[3]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[3]);
				this.DrawColor(xb,this.aa_bds[3].iFrame,y+offy,x,y+lionoff,3);

				this.aa_bds[3].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto,this.aa_bds[4]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto,4);
					j=this.aa_bds[4].pani.iAnimaY(this.aa_bds[4]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[4]);
				this.DrawColor(xb,this.aa_bds[4].iFrame,y+offy,x,y+lionoff,4);

				this.aa_bds[4].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="武器")
			{
				if(changed)
				{
					this.iWeapTid = MyGoods.gi().GetWeaponTid();
					if(this.iWeapTid>=0)GmPlay.xani_weap[xb][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName("骑"+stat+"_"+faceto, this.aa_weapon);
				}
				if(this.iWeapTid>=0)
				{
					if(SystemOperate.bShowWeapon)DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_weapon);
					this.aa_weapon.NextFrame();
				}
				offy++;
			}
		}
//		this.iMountsJjLev++;
//		this.iMountsTid
//		if (pms == null) {
//			this.bsc = true;
//			return;
//		}
		//_ANIMASORT_MOUNT[2马][1二阶][0站立1跑步][方向][切割]
	}
	ChangeColor( xb, sa, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			GmPlay.xani_color[xb][this.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_"+sa, this.aa_cls[m][i]);
//			GmPlay.sop(""+SortAnima._CHANGECOLOR[xb][i]+"_"+sa);
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
			DrawBuffer.gi().DrawAnima_aa(offy,null, x, y, this.aa_cls[m][i]);
		}
	}

	DrawRole( x,  y, faceto, stat, changed) 
	{
		var i;
		var xb=this.iRace*2+this.iSex;
		var ifaceto=GmMe.face_sti(faceto);
		var istat=GmMe.stat_sti(stat);
//		GmPlay.sop("SortAnima="+SortAnima.iii);
//		GmPlay.sop("xb="+xb+",,,istat="+istat+",,,ifaceto="+ifaceto+",,,"+stat);
//		GmPlay.sop("AnimaSort._ANIMASORT="+AnimaSort._ANIMASORT.length);
		var offy=0;
		for(i=0;i<SortAnima._ANIMASORT[xb][istat][ifaceto].length;i++)
		{
//			GmPlay.sop("");
			if(SortAnima._ANIMASORT[xb][istat][ifaceto][i]=="人物")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName(stat+"_"+faceto, this.aa_body);
					this.ChangeColor(xb,stat+"_"+faceto,0);
					this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y, this.aa_body);
				this.DrawColor(xb,this.aa_body.iFrame,y+offy,x,y,0);
				this.aa_body.NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT[xb][istat][ifaceto][i]=="武器")
			{
				if(changed)
				{
					this.iWeapTid = MyGoods.gi().GetWeaponTid();
					if(this.iWeapTid>=0)GmPlay.xani_weap[xb][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName(stat+"_"+faceto, this.aa_weapon);
				}
				if(this.iWeapTid>=0)
				{
//					GmPlay.sop("SortAnima.WeapFlag(this.iWeapTid)="+SortAnima.WeapFlag(this.iWeapTid));
					if(SystemOperate.bShowWeapon)DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y, this.aa_weapon);
					this.aa_weapon.NextFrame();
				}
//				GmPlay.sop("this.iWeapTid="+this.iWeapTid);
				offy++;
			}
		}
		// int xb=race*2+sex;
		// xani_newrole[0]
	}

	Draw() 
	{
//		GmPlay.sop("len1="+_ANIMASORT[1].length+"__"+_ANIMASORT[1][0].length+"__"+_ANIMASORT[1][1].length);
//		this.iRace = 1;
//		this.iSex = 1;
		var bchanged = false;

		var i;
		if (this.iChangeType > 0)
		{
			if (this.iOldType != 0)
			{
				this.iOldType = 0;
				bchanged = true;
			}
			bchanged = this.bStatChanged() | bchanged;
			bchanged = this.bFaceChanged6() | bchanged;
			if (bchanged) 
			{// 变身
				if (this.iFace6 == 0)this.sFace6 = "右";
				else if (this.iFace6 == 1)this.sFace6 = "右下";
				else if (this.iFace6 == 2)this.sFace6 = "左下";
				else if (this.iFace6 == 3)this.sFace6 = "左";
				else if (this.iFace6 == 4)this.sFace6 = "左上";
				else if (this.iFace6 == 5)this.sFace6 = "右上";

				if (this.iChangeType >= 10000)GmPlay.xani_pets[this.iChangeType % 10000].InitAnimaWithName("变异_" + this.sStat + "_" + this.sFace6, this.aa_body);
				else GmPlay.xani_pets[this.iChangeType % 10000].InitAnimaWithName(this.sStat + "_" + this.sFace6, this.aa_body);
				this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
			}
		} 
		else if (this.iFightMid > 0 && !MySell.gi().bSelling && SystemOperate.bShowMount) 
		{// 非骑乘状态
			if (this.iOldType != 2) {
				this.iOldType = 2;
				bchanged = true;
			}
			
			bchanged = this.bWeapChanged() | bchanged;//武器变化
			bchanged = this.bStatChanged() | bchanged;//站立/行走变化
			bchanged = this.bFaceChanged8() | bchanged;//方向变化
			
			if (bchanged)
			{
				var pms = MyMounts.mm.FindMounts(this.iFightMid);
				if (pms == null)
				{
					this.bsc = true;
					return;
				}
				this.iMountsTid=pms.iTid;
				this.iMountsJjLev=pms.iJjLev;
			}
		} 
		else
		{//有坐骑
			if (this.iOldType != 1) 
			{
				this.iOldType = 1;
				bchanged = true;
			}
			bchanged = this.bStatChanged() | bchanged;//动作变化
			bchanged = this.bFaceChanged8() | bchanged;//方向变化
			bchanged = this.bWeapChanged() | bchanged;//武器变化

			
		}

		if (this.iFollowPid > 0 && SystemOperate.bShowFollow)
		{
			var ppet = MyPets.mp.FindPet(this.iFollowPid);
			if (ppet != null) 
			{// 跟人物对应起来
					this.iFollowX = this.iMarks[5][0];
					this.iFollowY = this.iMarks[5][1];
					var s = "";
					if ((ppet.iBaobao & 2) == 0)s = "";
					else s = "变异_";
					if (this.iFollowX > this.iX)s += this.sStat + "_左";
					else s += this.sStat + "_右";
					GmPlay.xani_pets[ppet.iTid].InitAnimaWithName(s, this.aa_follow);// 左
					this.aa_follow.SetFrame(GmPlay.iDelay);

					DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iFollowY,null, MapManager.gi().iOffx + this.iFollowX,MapManager.gi().iOffy + this.iFollowY, this.aa_follow);// 跟随的宠物
					FireworksEffect.DrawAura(0,MapManager.gi().iOffx + this.iFollowX, MapManager.gi().iOffy+ this.iFollowY,DrawBuffer.gi(),MapManager.gi().iOffy + this.iFollowY - 1);

					DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iFollowY+ 1, 1, MapManager.gi().iOffx + this.iFollowX,MapManager.gi().iOffy + this.iFollowY + 30, ppet.sName,0xffffb080, 20, 1, 0xff000000);
			}
		}
		DrawBuffer.gi().BeginGroup();
		//1影子
		FireworksEffect.DrawAura(0,MapManager.gi().iOffx + this.iX,MapManager.gi().iOffy + this.iY,DrawBuffer.gi(),MapManager.gi().iOffy + this.iY);

		//4称谓，名字
		if (this.rbs.sTitle.length > 0 && SystemOperate.bShowTitle)
		{//有称谓
			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iY, 1,	MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 20,this.rbs.sTitle, 0xff80c0ff, 20, 1, 0xff000000);// 蓝色
			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iY, 1,MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 20+ 20, this.sName, 0xff80ff80, 20, 1, 0xff000000);// 绿色
		} 
		else
		{//无称谓
			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iY, 1,MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 30,this.sName, 0xff80ff80, 20, 1, 0xff000000);
		}
//2人物，武器，坐骑，变身
		if (this.iChangeType > 0) 
		{//变身
			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY,null, MapManager.gi().iOffx+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_body);
			this.aa_body.NextFrame();
		} 
		else if (this.iFightMid > 0 && !MySell.gi().bSelling && SystemOperate.bShowMount)
		{//非骑乘状态
			this.DrawMounts(MapManager.gi().iOffx+this.iX,MapManager.gi().iOffy+this.iY,this.sFace8,this.sStat,bchanged);
		} 
		else
		{// 骑乘状态
			this.DrawRole(MapManager.gi().iOffx+this.iX,MapManager.gi().iOffy+this.iY,this.sFace8,this.sStat,bchanged);
			
//			this.iWeapTid = MyGoods.gi().GetWeaponTid();
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY,GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_mounts);// 人
//			this.aa_mounts.NextFrame();
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY + 1,GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_body);// 人
//			this.aa_body.NextFrame();
		}
		
		//3摊位
		if (MySell.gi().bSelling)
		{// 摆摊中
			var tw = M3DFast.gi().GetTextWidth(MySell.gi().sSellName, 25);
			i = (tw - 60) / 30 + 2;// 摊位长度
			if (i < 2)i = 2;
			else if (i > 6)i = 6;
			GmPlay.xani_ui2.InitAnimaWithName("普通摊位", GmPlay.aaa);

			GmPlay.aaa.iFrame = 0;
			DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy + this.iY - 2,MapManager.gi().iOffx + this.iX - tw / 2 - 9, MapManager.gi().iOffy	+ this.iY +this.iOffY + 5, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
			GmPlay.aaa.iFrame = 1;
			DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy + this.iY - 2,MapManager.gi().iOffx + this.iX - tw / 2, MapManager.gi().iOffy + this.iY+this.iOffY + 5, GmPlay.aaa, 101, 1.0 * tw / 10, 1, 0,0, 0);
			GmPlay.aaa.iFrame = 2;
			DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy + this.iY - 2,MapManager.gi().iOffx + this.iX + tw / 2, MapManager.gi().iOffy + this.iY+this.iOffY + 5, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
			DrawBuffer.gi().DrawText(MapManager.gi().iOffy + this.iY - 1, 1,MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY +this.iOffY+20,	MySell.gi().sSellName, 0xff40c0ff, 25);
		}

		//5战斗，队伍标记
		if (MyTeam.bTeamLeader()) {// 自己是队长，头上画队伍标记
			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY, GmPlay.xani_ui,
					MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + this.iOffY,
					this.aa_team);
			// GmPlay.sop("offy="+offy);
			// GmPlay.xani_ui.DrawAnima_aa(MapManager.gi().iOffx+this.iX,
			// MapManager.gi().iOffy+this.iY-120, this.aa_team);
			GmPlay.xani_ui.NextFrame(this.aa_team);
		}
		//6头顶聊天
		this.DrawPopo(MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY);
		DrawBuffer.gi().EndGroup();
	}


//	Draw1() {
//		boolean bchanged = false;
//		this.btn_att.Move(GmConfig.SCRW - 60, 0, 60, 60);
//		this.btn_petatt.Move(GmConfig.SCRW - 200, 0, 60, 60);
//
//		var i;
//		if (this.iChangeType > 0) {
//			if (this.iOldType != 0) {
//				this.iOldType = 0;
//				bchanged = true;
//			}
//			bchanged = this.bStatChanged() | bchanged;
//			bchanged = this.bFaceChanged6() | bchanged;
//			if (bchanged) {// 变身
//				if (this.iFace6 == 0)
//					this.sFace6 = "右";
//				else if (this.iFace6 == 1)
//					this.sFace6 = "右下";
//				else if (this.iFace6 == 2)
//					this.sFace6 = "左下";
//				else if (this.iFace6 == 3)
//					this.sFace6 = "左";
//				else if (this.iFace6 == 4)
//					this.sFace6 = "左上";
//				else if (this.iFace6 == 5)
//					this.sFace6 = "右上";
//
//				// if(this.iFace6==0 || this.iFace6==1 || this.iFace6==5)this.sFace6="右";
//				// else this.sFace6="左";
//				if (this.iChangeType >= 10000)
//					GmPlay.xani_pets[this.iChangeType % 10000].InitAnimaWithName(
//							"变异_" + this.sStat + "_" + this.sFace6, this.aa_body);
//				else
//					GmPlay.xani_pets[this.iChangeType % 10000].InitAnimaWithName(
//							this.sStat + "_" + this.sFace6, this.aa_body);
//				this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
//			}
//		} else if (this.iFightMid <= 0 || MySell.gi().bSelling) {// 非骑乘状态
//			if (this.iOldType != 1) {
//				this.iOldType = 1;
//				bchanged = true;
//			}
//			bchanged = this.bStatChanged() | bchanged;
//			bchanged = this.bFaceChanged8() | bchanged;
//			if (bchanged) {
//				// GmPlay.xani_role.InitAnimaWithName(this.sStat+"_"+(iFaceTo+1),
//				// aa);
//				GmPlay.xani_role[this.iRace * 2 + this.iSex].InitAnimaWithName(this.sStat
//						+ "_" + this.sFace8, this.aa_body);
//				this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
//
//				if (this.iWeapTid >= 0)
//					ResetWeap();
//			}
//			if (this.bWeapChanged()) {// 获得当前武器栏
//				this.iWeapTid = MyGoods.gi().GetWeaponTid();
//				if (this.iWeapTid >= 0) {
//					ResetWeap();
//				}
//				// GmPlay.xani_role1.InitAnimaWithName(this.sStat+"_"+sFaceTo,
//				// this.aa_body);
//			}
//		} else {
//			if (this.iOldType != 2) {
//				this.iOldType = 2;
//				bchanged = true;
//			}
//			bchanged = this.bStatChanged() | bchanged;
//			bchanged = this.bFaceChanged4() | bchanged;
//			if (bchanged) {
//				Mounts pms = MyMounts.mm.FindMounts(this.iFightMid);
//				if (pms == null) {
//					this.bsc = true;
//					return;
//				}
//				if (this.iFace4 == 0)
//					this.sFace4 = "右";
//				else if (this.iFace4 == 1)
//					this.sFace4 = "右下";
//				else if (this.iFace4 == 2)
//					this.sFace4 = "左下";
//				else
//					this.sFace4 = "左";
//				GmPlay.xani_mounts[pms.iTid].InitAnimaWithName(pms.iJjLev + "_"
//						+ this.sStat + "_" + this.sFace4, this.aa_mounts);
//				GmPlay.xani_role[this.iRace * 2 + this.iSex].InitAnimaWithName(
//						pms.sAnimaName + pms.iJjLev + "_" + this.sStat + "_"
//								+ this.sFace4, this.aa_body);
//				this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
//			}
//		}
//
//		if (this.iFollowPid > 0) {
//			Pets ppet = MyPets.mp.FindPet(this.iFollowPid);
//			if (ppet != null) {
//				{// 跟人物对应起来
//					this.iFollowX = this.iMarks[5][0];
//					this.iFollowY = this.iMarks[5][1];
//					String s = "";
//					if ((ppet.iBaobao & 2) == 0)
//						s = "";
//					else
//						s = "变异_";
//					if (this.iFollowX > this.iX)
//						s += this.sStat + "_左";
//					else
//						s += this.sStat + "_右";
//					GmPlay.xani_pets[ppet.iTid].InitAnimaWithName(s, this.aa_follow);// 左
//					this.aa_follow.SetFrame(GmPlay.iDelay);
//
//					DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iFollowY,
//							null, MapManager.gi().iOffx + this.iFollowX,
//							MapManager.gi().iOffy + this.iFollowY, this.aa_follow);// 跟随的宠物
//					DrawBuffer.gi().DrawAnima_aa(
//							MapManager.gi().iOffy + this.iFollowY - 1, null,
//							MapManager.gi().iOffx + this.iFollowX, MapManager.gi().iOffy
//									+ this.iFollowY, GmPlay.aa_shadow);// 影子
//					// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iFollowY, 1,
//					// MapManager.gi().iOffx+this.iFollowX+1,
//					// MapManager.gi().iOffy+this.iFollowY+30+1, ppet.sName,
//					// 0xff000000,20);
//					// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iFollowY+1,
//					// 1, MapManager.gi().iOffx+this.iFollowX,
//					// MapManager.gi().iOffy+this.iFollowY+30, ppet.sName,
//					// 0xffffff00,20);
//					DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iFollowY
//							+ 1, 1, MapManager.gi().iOffx + this.iFollowX,
//							MapManager.gi().iOffy + this.iFollowY + 30, ppet.sName,
//							0xffffb080, 20, 1, 0xff000000);
//				}
//			}
//		}
//		if (MySell.gi().bSelling) {// 摆摊中
//			var tw = M3DFast.gi().GetTextWidth(MySell.gi().sSellName, 25);
//			i = (tw - 60) / 30 + 2;// 摊位长度
//			if (i < 2)
//				i = 2;
//			else if (i > 6)
//				i = 6;
//			// GmPlay.xani_ui.InitAnimaWithName("摊位"+i, GmPlay.aaa);
//			// DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY,GmPlay.xani_ui,
//			// MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-140, GmPlay.aaa);
//			// if(this.iFlag[20]>0)GmPlay.xani_ui2.InitAnimaWithName("vip摊位",
//			// GmPlay.aaa);
//			// else
//			GmPlay.xani_ui2.InitAnimaWithName("普通摊位", GmPlay.aaa);
//
//			GmPlay.aaa.iFrame = 0;
//			DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy + this.iY - 2,
//					MapManager.gi().iOffx + this.iX - tw / 2 - 9, MapManager.gi().iOffy
//							+ this.iY - 140 + 5, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
//			GmPlay.aaa.iFrame = 1;
//			DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy + this.iY - 2,
//					MapManager.gi().iOffx + this.iX - tw / 2, MapManager.gi().iOffy + this.iY
//							- 140 + 5, GmPlay.aaa, 101, 1.0f * tw / 10, 1, 0,
//					0, 0);
//			GmPlay.aaa.iFrame = 2;
//			DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy + this.iY - 2,
//					MapManager.gi().iOffx + this.iX + tw / 2, MapManager.gi().iOffy + this.iY
//							- 140 + 5, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
//			// DrawBuffer.gi().FillRect(MapManager.gi().iOffy+this.iY,
//			// MapManager.gi().iOffx+this.iX-tw/2, MapManager.gi().iOffy+this.iY-140,
//			// MapManager.gi().iOffx+this.iX+tw/2, MapManager.gi().iOffy+this.iY-100,
//			// 0xff000000);
//			// if(this.iFlag[20]>0)DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY-1,
//			// 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-120,
//			// MySell.gi().sSellName, 0xff8080ff,25);
//			// else
//			DrawBuffer.gi().DrawText(MapManager.gi().iOffy + this.iY - 1, 1,
//					MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY - 120,
//					MySell.gi().sSellName, 0xff40c0ff, 25);
//		}
//		if (this.iChangeType > 0) {
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY,
//					GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx
//							+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_body);
//		} else if (this.iFightMid <= 0 || MySell.gi().bSelling) {// 非骑乘状态
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY,
//					GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx
//							+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_body);// 人
//			if (this.iWeapTid >= 0) {
//				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY + 1,
//						GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx
//								+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_weapon);// 武器
//				this.aa_weapon.NextFrame();
//			}
//		} else {// 骑乘状态
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY,
//					GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx
//							+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_mounts);// 人
//			this.aa_mounts.NextFrame();
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY + 1,
//					GmPlay.xani_role[this.iRace * 2 + this.iSex], MapManager.gi().iOffx
//							+ this.iX, MapManager.gi().iOffy + this.iY, this.aa_body);// 人
//		}
//		DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY - 1,
//				GmPlay.aa_shadow.xani, MapManager.gi().iOffx + this.iX,
//				MapManager.gi().iOffy + this.iY, GmPlay.aa_shadow);// 影子
//		this.aa_body.NextFrame();
//		// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY+20, 1,
//		// MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+20,
//		// this.sName+"["+GmMe.sRace()+"]["+GmMe.sSex()+"]", 0xffffff00,25);
//		if (this.rbs.sTitle.length > 0) {
//			// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY, 1,
//			// MapManager.gi().iOffx+this.iX+1, MapManager.gi().iOffy+this.iY+20+1,this.rbs.sTitle,
//			// 0xff000000,20);//蓝色
//			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iY, 1,
//					MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 20,
//					this.rbs.sTitle, 0xff80c0ff, 20, 1, 0xff000000);// 蓝色
//
//			// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY, 1,
//			// MapManager.gi().iOffx+this.iX+1, MapManager.gi().iOffy+this.iY+20+20+1, this.sName,
//			// 0xff000000,20);
//			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iY, 1,
//					MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 20
//							+ 20, this.sName, 0xff80ff80, 20, 1, 0xff000000);// 绿色
//		} else {
//			// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY, 1,
//			// MapManager.gi().iOffx+this.iX+1, MapManager.gi().iOffy+this.iY+30+1, this.sName,
//			// 0xff000000,20);
//			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy + this.iY, 1,
//					MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + 30,
//					this.sName, 0xff80ff80, 20, 1, 0xff000000);
//		}
//		// DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY, 1,
//		// MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+20, this.sName,
//		// 0xffffff00,25);
//		if (iTeamRid[0] == this.iRid) {// 自己是队长，头上画队伍标记
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy + this.iY, GmPlay.xani_ui,
//					MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY + this.iOffY,
//					this.aa_team);
//			// GmPlay.sop("offy="+offy);
//			// GmPlay.xani_ui.DrawAnima_aa(MapManager.gi().iOffx+this.iX,
//			// MapManager.gi().iOffy+this.iY-120, this.aa_team);
//			GmPlay.xani_ui.NextFrame(this.aa_team);
//		}
//		this.DrawPopo(MapManager.gi().iOffx + this.iX, MapManager.gi().iOffy + this.iY);
//
//	}

	DrawPopo( x,  y)
	{
		if (this.iPopoDelay <= 0)return;

		this.iPopoDelay--;
		FormatString.gi().Format(this.sPopoString, 151, 25);
		x -= FormatString.gi().iW / 2;
		// y-=(FormatString.gi().iH-this.iOffY-40);
		var sy = y + this.iOffY + 40 - FormatString.gi().iH;
		DrawBuffer.gi().FillRect(y, x, sy, x + FormatString.gi().iW, sy+ FormatString.gi().iH, 0x50000000);
		FormatString.gi().DrawToBuffer(y + 1, x, sy);
	}

	weapname( race,  lev) {
		var i;
		for (i = 0; i < GmPlay.de_goods.iDataCount; i++) {
			if (GmPlay.de_goods.datas[i].intValue(16) == 2
					&& GmPlay.de_goods.datas[i].intValue(19) == race
					&& GmPlay.de_goods.datas[i].intValue(9) == lev)
				return GmPlay.de_goods.datas[i].strValue(4);
		}
		return "";
	}

	DrawFightUI() {
		GmPlay.xani_ui.DrawAnima(GmConfig.SCRW, 0, "test", 0);// 右上角头像

		// btn_chat.Move(iCbx,iCby, 80, 50);//私聊
		// if(bPrivateChatFlash &&
		// GmPlay.iDelay/2%2==0)btn_chat.Move(iCbx+1,iCby+1, 80+1, 50+1);
		// btn_chat.Draw();

		this.btn_att.Draw();// 属性
		this.btn_petatt.Draw();// 宠物
	}

	DrawHpDetail() {
		var x = GmConfig.SCRW - 88 - 60 - 150;
		M3DFast.gi().FillRect_2D(x, 0, x + 150, 60, 0x80000000);
		M3DFast.gi().DrawTextEx(x, 0, "气血:" + GmMe.me.rbs.iHp + "/"
				+ GmMe.me.rbs.iMaxHp, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x, 20, "魔法:" + GmMe.me.rbs.iMp + "/"
				+ GmMe.me.rbs.iMaxMp, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x, 40, "愤怒:" + GmMe.me.rbs.iAnger + "/150",
				0xffffffff, 20, 101, 1, 1, 0, 0, 0);
	}
	
	DrawHeadEx( hp, maxhp, mp, maxmp, angry, lev, pettid, pethp, maxpethp, petmp, maxpetmp, petlev, petexp)
	{
		if (this.rbs.iMaxHp <= 0)return;
		if (this.rbs.iMaxMp <= 0)return;
		if (this.rbs.iLev < 0)return;
		var offx=0;//cxunmz
		if(PublicInterface.gi().iBx>0)offx=GmConfig.SCRW-PublicInterface.gi().iBx;
		GmPlay.xani_frame.DrawAnima(GmConfig.SCRW-81-offx,1, "角色头像80_80", this.iRace*2+this.iSex);
		
		if(pettid<0)GmPlay.xani_frame.DrawAnima(GmConfig.SCRW-251-offx,3,"默认宠物头像框68_68",0);
		else
		{
			GmPlay.xani_frame.DrawAnima(GmConfig.SCRW-251-offx,3,"默认宠物头像框68_68",1);
			GmPlay.xani_head.DrawAnimaEx(GmConfig.SCRW-251-offx,3,GmPlay.de_pet.strValue(pettid, 0, 1),0,101,0.92,0.92,0x1000,0,0);
		}
		
		GmPlay.xani_frame.DrawAnima(GmConfig.SCRW-336-offx, 0, "漫游属性框336_82", 0);
		
		var i;
		var rat=0;
		if(pettid>=0)
		{
				rat=79.0*pethp/maxpethp;
				if(rat>1)DrawMode.frame_type1("气血框20_16",  (GmConfig.SCRW-336+3+79-rat)-offx, 3, rat, 20);
				
				rat=79.0*petmp/maxpetmp;
				if(rat>1)DrawMode.frame_type1("魔法框20_16",  (GmConfig.SCRW-336+3+79-rat)-offx, 22, rat, 20);

				if(petexp>GameData.iUpgradeExp[petlev]/3)i=GameData.iUpgradeExp[petlev]/3;
				else i=petexp;
				rat=79.0*i/(GameData.iUpgradeExp[petlev]/3);
				if(rat>1)DrawMode.frame_type1("经验框20_16",  (GmConfig.SCRW-336+3+79-rat)-offx, 41, rat, 20);
				
				M3DFast.gi().DrawTextEx(GmConfig.SCRW-336+140-offx, 62, ""+petlev, 0xff264547, 16, 101, 1, 1, 0, -2, -2);
		}
		rat=96.0*hp/maxhp;
		if(rat>1)DrawMode.frame_type1("气血框20_16",  (GmConfig.SCRW-336+158+96-rat)-offx, 3, rat, 20);
		rat=96.0*mp/maxmp;
		if(rat>1)DrawMode.frame_type1("魔法框20_16",  (GmConfig.SCRW-336+158+96-rat)-offx, 22, rat, 20);
		rat=96.0*angry/150;
		if(rat>1)DrawMode.frame_type1("愤怒框20_16",  (GmConfig.SCRW-336+158+96-rat)-offx, 41, rat, 20);
		
		M3DFast.gi().DrawTextEx(GmConfig.SCRW-336+320-offx, 71, ""+lev, 0xff264547, 16, 101, 1, 1, 0, -2, -2);
	}
	DrawHead()
	{
		if (this.rbs.iMaxHp <= 0)return;
		if (this.rbs.iMaxMp <= 0)return;
		if (this.rbs.iLev < 0)return;

		var ppet = MyPets.mp.GetUseingPet();
		if(ppet==null)this.DrawHeadEx(this.rbs.iHp,this.rbs.iMaxHp,this.rbs.iMp,this.rbs.iMaxMp,this.rbs.iAnger,this.rbs.iLev,-1,0,0,0,0,0,0);
		else this.DrawHeadEx(this.rbs.iHp,this.rbs.iMaxHp,this.rbs.iMp,this.rbs.iMaxMp,this.rbs.iAnger,this.rbs.iLev,ppet.iTid,ppet.iHp,ppet.iMaxHp,ppet.iMp,ppet.iMaxMp,ppet.iLev,ppet.iExp);
	}

	DrawExp()
	{
		var i,j;
		var k;
		var exp,maxexp;
		if (this.rbs.iExp > GameData.iUpgradeExp[GmMe.me.rbs.iLev])exp = GameData.iUpgradeExp[GmMe.me.rbs.iLev];
		else	exp = this.rbs.iExp;
		maxexp=GameData.iUpgradeExp[GmMe.me.rbs.iLev];
		
// 		j=maxexp/10;
// 		for(i=0;i<10;i++)
// 		{
// 			if(exp/j>i)GmPlay.xani_frame.DrawAnima(40+i*124, GmConfig.SCRH-10, "经验底框124_10",1);
// 			else GmPlay.xani_frame.DrawAnima(40+i*124, GmConfig.SCRH-10, "经验底框124_10",0);
// 			if(exp/j==i)
// 			{
// 				k=exp%j;
// //				GmPlay.sop("k1="+k);
// 				k=k*124/j;
// //				GmPlay.sop("k2="+k);
// 				DrawMode.frame_type1("经验框20_10", 40+i*124, GmConfig.SCRH-10,  k, 20);
// 			}
// 		}

j = maxexp/10;
var NEW_W = 159; // <- 每格的目标宽
var startX = 40;

var p = Math.floor(exp / j);
if (p < 0) p = 0;
if (p > 9) p = 9;

for (i = 0; i < 10; i++)
{
	var x = startX + i * NEW_W;
	// 已满格（i < p）
	if (i < p)
		GmPlay.xani_frame.DrawAnimaEx(x, GmConfig.SCRH-10, "经验底框124_10", 1, 101, NEW_W/124, 1, 0, 0, 0);
	else
		GmPlay.xani_frame.DrawAnimaEx(x, GmConfig.SCRH-10, "经验底框124_10", 0, 101, NEW_W/124, 1, 0, 0, 0);

	// 当前部分格（i == p）
	if (i == p)
	{
		if (exp >= maxexp)
		{
			// 全满
			DrawMode.frame_type1("经验框20_10", x, GmConfig.SCRH-10, NEW_W, 20);
		}
		else
		{
			k = exp - p * j; // 剩余经验落在当前格的量
			if (k > 0)
			{
				k = Math.floor(k * NEW_W / j);
				DrawMode.frame_type1("经验框20_10", x, GmConfig.SCRH-10, k, 20);
			}
		}
	}
}


		GmPlay.xani_frame.DrawAnima(0, GmConfig.SCRH-10, "经验标签40_10",0);
		M3DFast.gi().DrawTextEx(20, GmConfig.SCRH-5, "经  验", 0xffffff00, 10, 101, 1, 1, 0, -2, -2);
	}
	DrawUI() {
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		var offx=0;
		if(PublicInterface.gi().iBx>0)offx=GmConfig.SCRW-PublicInterface.gi().iBx;
		var i;
		this.btn_att.Move(GmConfig.SCRW - 83-offx, 0, 83, 83);
		this.btn_petatt.Move(GmConfig.SCRW - 253-offx, 0, 76, 76);
		this.DrawHead();

		// if(iTeamRid[0]==0)btn_team.sName="组队";
		// else if(iTeamRid[0]==this.iRid)btn_team.sName="队伍";
		// else btn_team.sName="队伍";
		// GmPlay.sop("iTeamRid[0]="+iTeamRid[0]);
//		if (iTeamButtonDelay == 0) {
//			btn_team.Move(GmConfig.SCRW - 360, 0, 60, 60);
//			if (bRequestFlash && GmPlay.iDelay / 2 % 2 == 0)
//				btn_team.Move(GmConfig.SCRW - 360 + 1, 0 + 1, 60, 60);
//			btn_team.Draw();
//		} else
//			iTeamButtonDelay--;

		if (MyTeam.bInTeam()) 
		{
			var t_ras;
			for (i = 0; i < 5; i++)
			{
				if (MyTeam.iTmpTeamRid[i] != 0)
				{
					if (MyTeam.iTmpTeamRid[i] == this.iRid) t_ras=this.iRace * 2 + this.iSex;
					else t_ras=MyTeam.iRas[i];

					
					if (MyTeam.iTeamRid[i] == 0)GmPlay.xani_head.DrawAnimaEx(GmConfig.SCRW - 500 - i * 83-offx,0, "新头像"+t_ras,0, 50, 1, 1, 0, 0, 0);
					else GmPlay.xani_head.DrawAnima(GmConfig.SCRW - 500 - i * 83-offx,0, "新头像"+t_ras,0);
				}
			}
		}

		// this.btn_reset.Draw();

		// this.btn_att.Draw();
		// this.btn_petatt.Draw();//宠物

		if (Confirm1.end(Confirm1.CONFIRM_INVITE)) {//
			if (Confirm1.bConfirm) {// 同意入队
				GmProtocol.gi().s_TeamOperate(7, this.iInviteId, 0);
			}
		}
		if (this.bShowHpDetail)
			this.DrawHpDetail();
	}

	ProcTouch_AttFrame( msg,  x,  y) {
		if (MyPets.mp.ProcTouch(msg, x, y))
			return true;
		return false;
	}

	ProcTouch( msg,  x,  y) {
		this.bShowHpDetail = false;
		if (this.btn_att.ProcTouch(msg, x, y)) {
			if (this.btn_att.bCheck()) {
				XStat.gi().PushStat(XStat.GS_MYATTFRAME);
			}
			return true;
		}
		if (this.btn_petatt.ProcTouch(msg, x, y)) {
			if (this.btn_petatt.bCheck()) {
				PetsFrame.Open();
				// MyPets.mp.bShow=!MyPets.mp.bShow;
			}
			return true;
		}
		if (this.btn_reset.ProcTouch(msg, x, y)) {
			if (this.btn_reset.bCheck()) {
				// GmPlay.x_wav.StartWav("role1_hurt",false);
				XStat.gi().PushStat(XStat.GS_SMALLMAP);
				/*
				 * if(MapManager.gi().iCurrentMapId==1) { GmMe.me.iX=760;
				 * GmMe.me.iY=730; MapManager.gi().mfy.initboom(GmMe.me.iX,
				 * GmMe.me.iY, MapManager.gi().mapdata.iMapWidth,
				 * MapManager.gi().mapdata.iMapHeight, MapManager.gi().iBlockWidth,
				 * MapManager.gi().iBlockHeight); } else { //
				 * GmProtocol.gi().s_ChangeMap(0,3799,1918);
				 * GmProtocol.gi().s_ChangeMap(1,760,730); //
				 * XStat.gi().PushStat(XStat.GS_LOADING2); //
				 * MapManager.gi().bMapLoaded=false; }
				 */
			}
			return true;
		}
		// 点击头像，打开属性界面

		if ((msg == 2 || msg == 1)
				&& XDefine.bInRect(x, y, GmConfig.SCRW - 191, 0, 108, 80)) {// 在人物血条按下或移动
			this.bShowHpDetail = true;
			return true;
		}

		return false;
	}

	getinit( pls) {
		this.iRid = pls.GetNextInt();
		this.sName = pls.GetNextString();
		GmPlay.m_vi.Login(""+this.iRid, this.sName);
		this.iSex = pls.GetNextByte();
		this.iRace = pls.GetNextByte();
		this.iFightPid = pls.GetNextInt();
		this.rbs.iSchoolId = pls.GetNextByte();
		this.rbs.iInGot = pls.GetNextInt();
		this.iFightMid = pls.GetNextInt();

		this.rbs.iLev = pls.GetNextShort();
		GmMe.iSecond = pls.GetNextInt();
		
		GmMe.iTime[0]=pls.GetNextShort();
		GmMe.iTime[1]=pls.GetNextShort();
		GmMe.iTime[2]=pls.GetNextShort();

		console.log('初始化角色数据：',pls,this.iRace,this.iSex)

		GmPlay.xani_newrole[this.iRace*2+this.iSex].LoadRes();  //预加载角色资源
//		GmMe.iTime[2]=30;
		GmMe.iMillis = XDefine.get_ms();

		if (this.rbs.iLev <= 0) {
			if(GmConfig.SYSW>=1280)
			{//设置为1280的
//				SystemOperate.iScreenLS=400;//最大缩放，高清
				SystemOperate.iScreenLS=(1280-800)*400/(GmConfig.SYSW-800);
			}
			else
			{
				SystemOperate.iScreenLS=(GmConfig.SYSW-800)*400/(1280-800);
			}
			SystemOperate.iSameRate=0;
//			if (GmConfig.SYSW >= 800 * 2 && GmConfig.SYSH >= 480 * 2)
//				SystemOperate.SetScreenMode(3);
//			else if (GmConfig.SYSW >= 1280) {
//				SystemOperate.iScreenLS = 1280 * 400 / GmConfig.SYSW;
//				SystemOperate.SetScreenMode(0);
//			} else if (GmConfig.SYSW >= 800 && GmConfig.SYSH >= 480)
//				SystemOperate.SetScreenMode(1);
//			else
//				SystemOperate.SetScreenMode(0);
		}

		PublicInterface.gi().mta_record(1, this.iRid, this.sName);

		this.bsc = true;
		// GmMe.me.bsc=true;//改变状态，重新载入角色动画

		// for(i=0;i<100;i++)sop("2001");
		// XStat.gi().ResetStat();
		// XStat.gi().PushStat(XStat.GS_GAMEING);

		// setTimeout(()=>{
			// if (XStat.gi().LastStatType(0) != XStat.GS_GAMEING){
			// 	XStat.gi().PopStat(1);
			// }
		// },1500)
		
		GmPlay.x_record.ReadPrivateChat();
	}

	getflag( pls) {
		var i;
		var oldcolor;
		var flagtype=pls.GetNextByte();
		if(flagtype==0)
		{
			oldcolor=this.iFlag[53];
			for (i = 0; i < 64; i++)
			{
				this.iFlag[i] = pls.GetNextInt();
//				GmPlay.sop(""+i+"=="+this.iFlag[i]);
			}
			this.iFlag[14] |= 1;
			this.bDark = ((this.iFlag[2] & 1) == 0);// 0遇怪
			this.bPk = ((this.iFlag[2] & 2) == 0);// 0可pk
			this.bStandIn = ((this.iFlag[2] & 4) != 0);// 是否替身
			this.bQP = ((this.iFlag[2] & 8) != 0);// 是否强P
//			bStrange = ((this.iFlag[2] & 128) == 0);// 0允许陌生,1不允许

			this.lt1 = XDefine.get_ms() / 1000;

			GoodsStoreFrame.ResetStoreCount(this.iFlag[8]);
			PetStoreFrame.ResetStoreCount(this.iFlag[8]);
			GmMe.me.CalcFightAtt();
			LoginGift.lg.SetStatByFlag();
			FiveGift.fg.SetStatByFlag();
			FirstCharge.fg.SetStatByFlag();
			MyGoodsFrame.bSELock=false;
			
			var n=this.iFlag[53];
			this.iColor[0]=n&7;
			this.iColor[1]=(n>>3)&7;
			this.iColor[2]=(n>>6)&7;
			this.iColor[3]=(n>>9)&7;
			this.iColor[4]=(n>>12)&7;
			if(oldcolor!=n)
			{//颜色改变，改变
				this.bsc=true;
			}
		}
		else if(flagtype==1)
		{
			for (i = 0; i < 64; i++)this.iFlagExt[i] = pls.GetNextInt();
		}
//		this.iColor[0]=1;
//		this.iColor[1]=1;
//		this.iColor[2]=1;
//		this.iColor[3]=1;
//		this.iColor[4]=1;
	}


	GetExt( pls) {
		var flag = pls.GetNextInt();
		if ((flag & this.RETEXT_CHANGETYPE) != 0) {
			this.iOldType = -1;
			this.iChangeType = pls.GetNextShort();
			this.iChangeLast = pls.GetNextInt();
			this.iChangeSkill = pls.GetNextInt();
			this.iChangeAtt = pls.GetNextInt();
			this.iChangeFC = pls.GetNextByte();
		}
		if ((flag & this.RETEXT_LOCKER) != 0) {
			if (pls.GetNextByte() == 1) {
				this.bHaveLock = true;
				if (pls.GetNextByte() == 1)
					this.bLocked = true;
				else
					this.bLocked = false;
				this.iUnlockTime = pls.GetNextInt();
			} else
				this.bHaveLock = false;
		}
		if ((flag & this.RETEXT_ANGER) != 0) {
			this.rbs.iAnger = pls.GetNextShort();// 更新当前怒气
		}
		GmMe.me.CalcFightAtt();
		this.ltex = XDefine.get_ms() / 1000;
	}


	GetBaseAtt( pls) {
		var i;
		var flag = pls.GetNextByte();
		if ((flag & this.RETBASE_HP) != 0) {
			this.rbs.iHp = pls.GetNextShort();
			this.rbs.iMaxHp = pls.GetNextShort();
		}
		if ((flag & this.RETBASE_MP) != 0) {
			this.rbs.iMp = pls.GetNextShort();
			this.rbs.iMaxMp = pls.GetNextShort();
		}
		if ((flag & this.RETBASE_POWER) != 0)
			this.rbs.iPower = pls.GetNextShort();
		if ((flag & this.RETBASE_MONEY) != 0)
			this.rbs.iMoney = pls.GetNextInt();
		if ((flag & this.RETBASE_EXP) != 0)
			this.rbs.iExp = pls.GetNextInt();
		if ((flag & this.RETBASE_LEV) != 0) {
			this.rbs.iLev = pls.GetNextShort();
			PublicInterface.gi().mta_record(2, this.rbs.iLev, ""
					+ XRecordFast.iLastSever);
		}
		if ((flag & this.RETBASE_ATT) != 0) {
			for (i = 0; i < 5; i++)
				this.rbs.iBaseAtt[i] = pls.GetNextShort();
		}
		if ((flag & this.RETBASE_OTHER) != 0) {
			this.rbs.iRenQi = pls.GetNextShort();
			this.rbs.sTitle = pls.GetNextString();
			MyGov.mg.iTick = pls.GetNextInt();
			this.rbs.iInGot = pls.GetNextInt();
			this.rbs.iStore = pls.GetNextInt();
			this.rbs.iReserve = pls.GetNextInt();
		}
		this.CalcFightAtt();
	}

	getschoolskill( pls) {
		var i;
		for (i = 0; i < 6; i++)
			this.rbs.iSchoolSkill[i] = pls.GetNextShort();
		i = pls.GetNextShort();
		if (i != this.rbs.iSchoolId && this.rbs.iSchoolId == 0) {// 入师门成功
			this.rbs.iSchoolId = i;
		}
		this.rbs.iHp = pls.GetNextShort();
		this.rbs.iMp = pls.GetNextShort();
		this.CalcFightAtt();
	}

	getgovskill( pls) {
		var i;
		for (i = 0; i < 8; i++)
			this.rbs.iGovSkill[i] = pls.GetNextShort();
		this.CalcFightAtt();
	}

	getgovxiu( pls) {
		var i;
		for (i = 0; i < 10; i++) {
			this.rbs.iGovXiu[i][0] = pls.GetNextShort();
			this.rbs.iGovXiu[i][1] = pls.GetNextInt();
		}
	}

	CalcFightAtt() 
	{// 计算Maxhp,attack,多余属性
		var i, j, m, n;
		var gp;

		i = this.rbs.iLev * 5;// 当前可能的属性上限
		j = this.rbs.iBaseAtt[0] + this.rbs.iBaseAtt[1] + this.rbs.iBaseAtt[2]
				+ this.rbs.iBaseAtt[3] + this.rbs.iBaseAtt[4];// 当前已加属性
		this.rbs.nut = i - j;// 剩余属性点//潜力点
		this.rbs.nut+=(this.iFlag[54]%1000);
		// 显示属性点是 baseatt+lev+0级默认点

		// this.iRace种族0人 1魔 2仙
		// 0体 1魔 2力 3耐 4敏
		var tz = GameData.iBaseAttAdd[this.iRace][0] + this.rbs.iBaseAtt[0] + this.rbs.iLev;// 0级基础+所加点+等级
		var fl = GameData.iBaseAttAdd[this.iRace][1] + this.rbs.iBaseAtt[1] + this.rbs.iLev;
		var ll = GameData.iBaseAttAdd[this.iRace][2] + this.rbs.iBaseAtt[2] + this.rbs.iLev;
		var nl = GameData.iBaseAttAdd[this.iRace][3] + this.rbs.iBaseAtt[3] + this.rbs.iLev;
		var mj = GameData.iBaseAttAdd[this.iRace][4] + this.rbs.iBaseAtt[4] + this.rbs.iLev;

		if (this.iFlag[28] > 0)tz += (this.iFlag[27] >> 24) & 0x1f;
		if (this.iFlag[29] > 0)fl += (this.iFlag[27] >> 18) & 0x1f;
		if (this.iFlag[30] > 0)ll += (this.iFlag[27] >> 12) & 0x1f;
		if (this.iFlag[31] > 0)nl += (this.iFlag[27] >> 6) & 0x1f;
		if (this.iFlag[32] > 0)mj += (this.iFlag[27]) & 0x1f;

		for (i = 0; i < 6; i++)
		{//
			if (MyGoods.gi().goods[1][i].iGid == -1)continue;
			if (MyGoods.gi().goods[1][i].iAtts[5]%100000 <=0)continue;
			gp = MyGoods.gi().goods[1][i];
			// 1级属性加成
			m = Math.floor(gp.iAtts[1] / 10000);
			n = gp.iAtts[1] % 10000;
			if (m > 0){
				const mm = Math.floor(m / 1000);
				if (mm == 0)					tz += m % 1000;
				else if (mm == 1)				fl += m % 1000;
				else if (mm == 2)				ll += m % 1000;
				else if (mm == 3)				nl += m % 1000;
				else if (mm == 4)				mj += m % 1000;
			}
			if (n > 0){
				const nn = Math.floor(n / 1000);
				if (nn == 0)					tz += n % 1000;
				else if (nn == 1)				fl += n % 1000;
				else if (nn == 2)				ll += n % 1000;
				else if (nn == 3)				nl += n % 1000;
				else if (nn == 4)				mj += n % 1000;
			}
		}

		// 1灵 2伤 3防 4速
		this.rbs.iMaxHp = tz * 50 + 1000;
		this.rbs.iMaxMp = fl * 30;
		this.rbs.iSpirit = tz * 3 + fl * 7 + ll * 4 + nl * 2;
		this.rbs.iSpeed = tz + ll + nl + mj * 7;
		switch (this.iRace)
		{
		case 0:// 人族
			this.rbs.iAttack = Math.floor(ll * 25 / 3);
			this.rbs.iDefence = nl * 15;
			break;
		case 1:// 魔族
			this.rbs.iMaxHp += tz * 10;
			this.rbs.iMaxMp -= fl * 5;

			this.rbs.iAttack = Math.floor(ll * 27 / 3);
			this.rbs.iDefence = nl * 14;
			break;
		case 2:// 仙族
			this.rbs.iMaxHp -= tz * 5;
			this.rbs.iMaxMp += fl * 5;

			this.rbs.iAttack = Math.floor(ll * 23 / 3);
			this.rbs.iDefence = nl * 16;
			break;
		}
		for (i = 0; i < 6; i++)
		{
			if (MyGoods.gi().goods[1][i].iGid == -1)continue;
			if (MyGoods.gi().goods[1][i].iAtts[5]%100000 <=0)continue;
			gp = MyGoods.gi().goods[1][i];
			// 2级属性加成
			j = GmPlay.de_goods.intValue(gp.iTid, -1, 3);
			if (j > 0)			this.rbs.iAttack += j * 10;
			j = GmPlay.de_goods.intValue(gp.iTid, -1, 25);
			if (j > 0)			this.rbs.iSpeed += j * 10;
			j = GmPlay.de_goods.intValue(gp.iTid, -1, 24);
			if (j > 0)			this.rbs.iMaxHp += j * 10;
			j = GmPlay.de_goods.intValue(gp.iTid, -1, 23);
			if (j > 0)			this.rbs.iSpirit += j * 10;
			j = GmPlay.de_goods.intValue(gp.iTid, -1, 22);
			if (j > 0)			this.rbs.iMaxMp += j * 10;
			j = GmPlay.de_goods.intValue(gp.iTid, -1, 21);
			if (j > 0)			this.rbs.iDefence += j * 10;

			m = Math.floor(gp.iAtts[0] / 10000);
			n = gp.iAtts[0] % 10000;
			switch (i) 
			{
			case 0:// 头盔防御|魔法
				this.rbs.iDefence += m * 10;
				this.rbs.iMaxMp += n * 10;
				break;
			case 1:// 项链灵力
				this.rbs.iSpirit += n * 10;
				break;
			case 2:// 武器伤害
				this.rbs.iAttack += n * 10;
				break;
			case 3:// 衣服防御
				this.rbs.iDefence += n * 10;
				break;
			case 4:// 腰带防御|血
				this.rbs.iDefence += m * 10;
				this.rbs.iMaxHp += n * 10;
				break;
			case 5:// 鞋子防御|速度
				this.rbs.iDefence += m * 10;
				this.rbs.iSpeed += n * 10;
				break;
			}
			m = Math.floor(gp.iAtts[2] / 10000);// 宝石加成1
			if (m > 0)
			{
				const mm = Math.floor(m / 1000)
				switch (mm) 
				{
				case 0:
					this.rbs.iAttack += (m % 1000) * 80;
					break;
				case 1:
					this.rbs.iDefence += (m % 1000) * 120;
					break;
				case 2:
					this.rbs.iMaxHp += (m % 1000) * 400;
					break;
				case 3:
					this.rbs.iSpeed += (m % 1000) * 80;
					break;
				case 4:
					this.rbs.iSpirit += (m % 1000) * 60;
					break;
				}
			}
			m = gp.iAtts[2] % 10000;// 宝石加成2
			if (m > 0)
			{
				const mm = Math.floor(m / 1000)
				switch (mm) 
				{
				case 0:
					this.rbs.iAttack += (m % 1000) * 80;
					break;
				case 1:
					this.rbs.iDefence += (m % 1000) * 120;
					break;
				case 2:
					this.rbs.iMaxHp += (m % 1000) * 400;
					break;
				case 3:
					this.rbs.iSpeed += (m % 1000) * 80;
					break;
				case 4:
					this.rbs.iSpirit += (m % 1000) * 60;
					break;
				}
			}
		}
		// 门派技能属性加成
		// GmPlay.sop("this.iAttack="+this.rbs.iAttack);
		if (GmMe.me.rbs.iSchoolId > 0 && GmMe.me.rbs.iSchoolId <= 9) {
			for (i = 0; i < 6; i++) {
				j = GmPlay.de_skill.intValue(
						GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1,
						17);// +攻击
				// GmPlay.sop("j="+j+",this.rbs.iSchoolSkill[i]="+this.rbs.iSchoolSkill[i]);
				if (j > 0)
					this.rbs.iAttack += this.rbs.iSchoolSkill[i] * j / 10;
				j = GmPlay.de_skill.intValue(
						GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1,
						18);// +防御
				if (j > 0)
					this.rbs.iDefence += this.rbs.iSchoolSkill[i] * j / 10;
				j = GmPlay.de_skill.intValue(
						GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1,
						19);// +速度
				if (j > 0)
					this.rbs.iSpeed += this.rbs.iSchoolSkill[i] * j / 10;
				j = GmPlay.de_skill.intValue(
						GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1,
						20);// +灵力
				if (j > 0)
					this.rbs.iSpirit += this.rbs.iSchoolSkill[i] * j / 10;
				j = GmPlay.de_skill.intValue(
						GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1,
						21);// +气血
				if (j > 0)
					this.rbs.iMaxHp += this.rbs.iSchoolSkill[i] * j / 10;
				j = GmPlay.de_skill.intValue(
						GameData.iSchoolSkillId[GmMe.me.rbs.iSchoolId][i], -1,
						22);// +魔法
				if (j > 0)
					this.rbs.iMaxMp += this.rbs.iSchoolSkill[i] * j / 10;
			}
		}

		var pms = MyMounts.mm.FindMounts(this.iFightMid);
		if (pms != null) {// 坐骑产生效果
							// if(pms.iBSD>=600)
		// {
		// j=pms.iLingQi*100/pms.iMaxLingQi;
		// if(j>60)
		// {
			this.rbs.iMaxHp += pms.iMaxHp;
			this.rbs.iMaxMp += pms.iMaxMp;
			this.rbs.iAttack += pms.iAttack;
			this.rbs.iDefence += pms.iDefence;
			this.rbs.iSpirit += pms.iSpirit;
			this.rbs.iSpeed += pms.iSpeed;
			// }
			// }
		}
		// GmPlay.sop("eiAttack="+this.rbs.iAttack);
		this.rbs.tz = Math.floor(tz);
		this.rbs.fl = Math.floor(fl);
		this.rbs.ll = Math.floor(ll);
		this.rbs.nl = Math.floor(nl);
		this.rbs.mj = Math.floor(mj);

		this.rbs.iMaxPower = this.rbs.iLev * 5 + 100;
		// 帮派技能加成
		if (this.rbs.iGovSkill[0] > 0) {// 强身
			this.rbs.iMaxHp += (this.rbs.iMaxHp * this.rbs.iGovSkill[0] / 100);
		}
		if (this.rbs.iGovSkill[6] > 0) {// 健体
			this.rbs.iMaxPower += this.rbs.iGovSkill[6] * 5;
		}
		if (this.rbs.iGovSkill[7] > 0) {// 修心
			this.rbs.iMaxMp += (this.rbs.iMaxMp * this.rbs.iGovSkill[7] / 100);
		}
		// 变身属性影响
		if (this.iChangeType > 0) {
			if (this.iChangeAtt > 0) {
				i = (this.iChangeAtt % 1000);
				switch (Math.floor(this.iChangeAtt / 1000) % 10) {
				case 0:// 气血
					this.rbs.iMaxHp = Math.floor(this.rbs.iMaxHp * i / 100);
					break;
				case 1:// 灵力
					this.rbs.iSpirit = Math.floor(this.rbs.iSpirit * i / 100);
					break;
				case 2:// 攻击
					this.rbs.iAttack = Math.floor(this.rbs.iAttack * i / 100);
					break;
				case 3:// 防御
					this.rbs.iDefence = Math.floor(this.rbs.iDefence * i / 100);
					break;
				case 4:// 速度
					this.rbs.iSpeed = Math.floor(this.rbs.iSpeed * i / 100);
					break;
				}
			}
			if (this.iChangeSkill > 0) {
				if (this.iChangeSkill == 212)
					this.rbs.iDefence += this.rbs.iLev * 18;
				else if (this.iChangeSkill == 211)
					this.rbs.iDefence += this.rbs.iLev * 12;
				else if (this.iChangeSkill == 210)
					this.rbs.iDefence += this.rbs.iLev * 6;

				if (this.iChangeSkill == 215)
					this.rbs.iAttack += this.rbs.iLev * 15;
				else if (this.iChangeSkill == 214)
					this.rbs.iAttack += this.rbs.iLev * 10;
				else if (this.iChangeSkill == 213)
					this.rbs.iAttack += this.rbs.iLev * 5;
			}
		}

		this.rbs.iMaxHp = parseInt(this.rbs.iMaxHp/10);
		this.rbs.iMaxMp = parseInt(this.rbs.iMaxMp/10);
		this.rbs.iSpirit = parseInt(this.rbs.iSpirit/10);
		this.rbs.iAttack = parseInt(this.rbs.iAttack/10);
		this.rbs.iDefence = parseInt(this.rbs.iDefence/10);
		this.rbs.iSpeed = parseInt(this.rbs.iSpeed/10);
		if (this.rbs.iHp > this.rbs.iMaxHp)
			this.rbs.iHp = this.rbs.iMaxHp;
		if (this.rbs.iMp > this.rbs.iMaxMp)
			this.rbs.iMp = this.rbs.iMaxMp;

		// this.rbs.iMaxPower=this.rbs.iLev*5+100;
	}

	CalcUserScore()
	{
		var a = 0, b=0, c=0, d = 0,e=0;
		var i, j, k;
		for (i = 1; i <= this.rbs.iLev; i++)
		{
			a += i;
		}
		a *= 2;//等级评分
		if(this.rbs.iSchoolId>0)
		{
			j = 0;
			for (i = 0; i < 6; i++)
			{
				if (this.rbs.iSchoolSkill[i]>0)j += this.rbs.iSchoolSkill[i];
			}
			b = j * 3;
		}
		j = 0;
		if (this.rbs.iGovSkill[0] > 0)j += this.rbs.iGovSkill[0];
		if (this.rbs.iGovSkill[6] > 0)j += this.rbs.iGovSkill[6];
		if (this.rbs.iGovSkill[7] > 0)j += this.rbs.iGovSkill[7];
		b += j * 3;
		j = 0;
		if (this.rbs.iGovSkill[1] > 0)j += this.rbs.iGovSkill[1];
		if (this.rbs.iGovSkill[2] > 0)j += this.rbs.iGovSkill[2];
		if (this.rbs.iGovSkill[3] > 0)j += this.rbs.iGovSkill[3];
		if (this.rbs.iGovSkill[4] > 0)j += this.rbs.iGovSkill[4];
		if (this.rbs.iGovSkill[5] > 0)j += this.rbs.iGovSkill[5];
		b += j * 2;//技能评分

		for(i=0;i<6;i++)
		{
			if(MyGoods.gi().goods[1][i].iGid>0)
			{
				c+=MyGoods.gi().goods[1][i].CalcSetScore();
			}
		}
		
		j = 0;//修炼评分
		for (i = 0; i < 10; i++) j += this.rbs.iGovXiu[i][0];
		k = 8;
		while (j > 0)
		{
			if(j>=10)d+=10*k;
			else d += j*k;
			j = j - 10;
			k = k + 8;
		}

		//阵法评分
		for (i = 1; i < 10; i++)
		{
			if ((this.iFlag[14] & (1 << i)) != 0)
			{
				e += 50;
//				GmPlay.sop(""+i);
			}
		}

//		GmPlay.sop("14="+this.iFlag[14]);
//		GmPlay.sop("+"+a+"+"+b+"+"+c+"+"+d+"+"+e);
		i = parseInt(a + b + c + d + e);
		if (i != this.iScore)
		{
			this.iScore = i;
		}

		this.CalcComplexScore();
		return this.iScore;
	}

	CalcComplexScore()
	{
		var i, j, ts = 0;
		var ps=new Int32Array(8);
		for (i = 0; i < 8; i++)
		{
			if (MyPets.mp.pets[i].iPid>0)
			{
				MyPets.mp.pets[i].CalcPetScore();
				ps[i] = MyPets.mp.pets[i].iScore;
			}
			else ps[i] = 0;
		}
		for (i = 0; i < 7; i++)
		{
			for (j = i+1; j < 8; j++)
			{
				if (ps[i] < ps[j])
				{
					ts = ps[i];
					ps[i] = ps[j];
					ps[j] = ts;
				}
			}
		}
		ts = ps[0] + ps[1] + ps[2] + ps[3];
		ts += this.iScore;
		if (ts != this.iComplexScore)
		{
			this.iComplexScore = ts;
		}
//		FrameMessage.fm.Open(""+GmMe.me.iComplexScore+",,"+GmMe.me.iScore+",,,"+ts);
		return this.iComplexScore;
	}

	bWeapChanged(){
		if (this.bwc)
		{
			this.bwc = false;
			return true;
		}
		return false;
	}
   
   bFaceChanged4() {
		if (this.bfc4) {
			this.bfc4 = false;
			return true;
		}
		return false;
	}
   
   bFaceChanged6() {
		if (this.bfc6) {
			this.bfc6 = false;
			return true;
		}
		return false;
	}
   
   bFaceChanged8() {
		if (this.bfc8) {
			this.bfc8 = false;
			return true;
		}
		return false;
	}
   
   bStatChanged() {
		if (this.bsc) {
			this.bsc = false;
			return true;
		}
		return false;
	}
}
GmMe.iTime=new Int32Array(3);
 GmMe.iSecond;
 GmMe.iMillis;//基准毫秒数

GmMe.MAXTEAMOLE = 5;
 // public int iMapId;
GmMe.MAXMARK = 60;

GmMe.iTeamZhen = 0;
GmMe.iTeamMap=0;

 GmMe.me;


GmMe.sSex=function( i) {
	 return (i == 0 ? "女" : "男");
 }

GmMe.sRace=function( i) {
	 if (i == 0)return "人";
	 else if (i == 1)return "魔";
	 else	return "仙";
 }


 GmMe.face_sti=function( s)
 {
	 if(s=="上")return 0;
	 else if(s=="左上")return 1;
	 else if(s=="左")return 2;
	 else if(s=="左下")return 3;
	 else if(s=="下")return 4;
	 else if(s=="右下")return 5;
	 else if(s=="右")return 6;
	 else if(s=="右上")return 7;
	 return 0;
 }
 GmMe.stat_sti=function( s)
 {
	 if(s=="站立")return 0;
	 else if(s=="跑步")return 1;
	 else if(s=="战斗站立")return 2;
	 else if(s=="普通攻击")return 3;
	 else if(s=="施法")return 4;
	 else if(s=="防御")return 5;
	 else if(s=="死亡过程")return 6;
	 else if(s=="被攻击")return 6;
	 else if(s=="死亡")return 6;
	 return 7;
 }