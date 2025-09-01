
import MapManager from "../../../../../map/MapManager"
import StarEffect from "../../../../../mgm/newmainmenu/StarEffect"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"


//登陆送礼
export default class LoginGift {

	constructor() {
		this.bInited = false;
		this.btn_gift2 = null;
		this.btn_get = null;
		this.bShow = false;
		this.iDelay = 0;
	}

	

	 DrawGift2() {
		var money, exp;
		if ((GmMe.me.iFlag[24] & 8) == 0)
			money = GmMe.me.rbs.iLev * 500 + 100;
		else if ((GmMe.me.iFlag[24] & 16) == 0)
			money = GmMe.me.rbs.iLev * 100 + 100;
		else if ((GmMe.me.iFlag[24] & 32) == 0)
			money = GmMe.me.rbs.iLev * 200 + 100;
		else if ((GmMe.me.iFlag[24] & 64) == 0)
			money = GmMe.me.rbs.iLev * 300 + 100;
		else if ((GmMe.me.iFlag[24] & 128) == 0)
			money = GmMe.me.rbs.iLev * 400 + 100;
		else {
			this.bGet2 = false;
			return;
		}
		exp = money * 3;

		this.iW = 80 * 2 + 40 + 40 * 2;
		this.iH = 240;
		this.iX = (GmConfig.SCRW - this.iW) / 2;
		this.iY = (GmConfig.SCRH - this.iH) / 2;

		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);

		GmPlay.xani_nui3.DrawAnima(this.iX + 40, this.iY + 30, "物品格子", 0);
		GmPlay.xani_ngoods.DrawAnima(this.iX + 40, this.iY + 30, "物品经验", 0);
		M3DFast.gi().DrawText_2(this.iX + 40 + 40, this.iY + 30 + 80 + 5, "" + exp,
				0xffffff00, 20, 101, 1, 1, 0, -2, 0, 1, 0xff000000);


				


		 GmPlay.xani_nui3.DrawAnima(this.iX + 40 + 80 + 40, this.iY + 30, "物品格子", 0);
		 GmPlay.xani_ngoods.DrawAnima(this.iX + 40 + 80 + 40, this.iY + 30, "物品储备金", 0);

	






		M3DFast.gi().DrawText_2(this.iX + 40 + 80 + 40 + 40, this.iY + 30 + 80 + 5, ""
				+ money, 0xffffff00, 20, 101, 1, 1, 0, -2, 0, 1, 0xff000000);

		this.btn_get.Move(this.iX + this.iW / 2 - 98 / 2, this.iY + this.iH - 50 - 30, 98, 50);
		this.btn_get.Draw();
	}

	SetStatByFlag() {
		this.bGift2 = false;
		this.bGet2 = false;

		// if(GmMe.me.iFlag[35]<5 &&
		// (GmMe.me.iFlag[36]&(1<<GmMe.me.iFlag[35]))==0)
		// if(GmMe.me.iFlag[35]<4 || (GmMe.me.iFlag[35]==4 &&
		// (GmMe.me.iFlag[36]&(1<<GmMe.me.iFlag[35]))==0))
		/*
		 * if((GmMe.me.iFlag[36]&31)<=0) {//没领过老礼包 int i=GmMe.me.iFlag[36]>>5;
		 * if(i<31) {//新礼包还没领完 if(GmMe.me.iFlag[1]/100000000==0) {//今日未领
		 * bGift1=true; } } }
		 */
		if ((GmMe.me.iFlag[24] & 8) == 0 || (GmMe.me.iFlag[24] & 16) == 0
				|| (GmMe.me.iFlag[24] & 32) == 0
				|| (GmMe.me.iFlag[24] & 64) == 0
				|| (GmMe.me.iFlag[24] & 128) == 0) {// 显示在线礼包按钮
			this.bGift2 = true;
		}
		this.bShow = true;
	}

	Draw() {// flag[35]0,1,2,3,4时
		if (GmMe.me.rbs.iLev < 10)
			return;
		if (MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())
			return;
		if (!this.bShow)
			return;
		var lt2;
		this.iDelay++;
		if (this.btn_gift2 == null)
		{
			this.btn_gift2 = new XButtonEx2(GmPlay.xani_icon);
			this.btn_gift2.InitButton("登录礼包");

			this.aa_effect = GmPlay.xani_nui6.InitAnimaWithName("转圈效果", null);

			this.btn_get = new XButtonEx1(GmPlay.xani_nui3);
			this.btn_get.InitButton("内框按钮");
			this.btn_get.sName = "领取";

			this.bInited = true;
		}

		this.iY = 10;
		this.iW = 72;
		this.iH = 72;

		this.iX = Gameing.iTopIconOffX;
		if (this.bGift2 && GmMe.me.rbs.iLev >= 10)
		{
			Gameing.iTopIconOffX += 90;
			this.btn_gift2.Move(this.iX, this.iY, this.iW, this.iH);
			this.btn_gift2.Draw();
			// i=this.iDelay%12;

			if (GmMe.me.iFlag[37] <= 0) 
			{
//				this.aa_effect.Draw(this.iX + 40, 0 + 40);
//				this.aa_effect.NextFrame();
				
				GmPlay.xani_icon.DrawAnima(this.iX + 48, 2, "红点提示", 0);
				// GmPlay.xani_nui3.DrawAnima(this.iX, this.iY+(i<6?i:12-i)-3, "每日在线奖励",
				// 0);
			}

			// 画倒计时
			if (GmMe.me.iFlag[37] > 0)
			{
				lt2 = XDefine.get_ms() / 1000;
				lt2 = (lt2 - GmMe.me.lt1);
				lt2 = GmMe.me.iFlag[37] - lt2;
				if (lt2 < 0)GmMe.me.iFlag[37] = 0;
				else LoginGift.DrawTime(this.iX + 36, this.iY + 71,  lt2);
			}
			else M3DFast.gi().DrawText_2(this.btn_gift2.iX+36, this.btn_gift2.iY+71, "领取", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
		}
		if (this.bGet2)this.DrawGift2();
	}

	ProcTouch( msg,  x,  y) {
		if (GmMe.me.rbs.iLev < 10)
			return false;
		if (MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())
			return false;
		if (!this.bShow)
			return false;
		if (!this.bInited)
			return false;

		if (this.bGet2) {
			if (this.btn_get.ProcTouch(msg, x, y)) {
				if (this.btn_get.bCheck()) {// 领
					GmProtocol.gi().s_SeverEvent(14, 1, 0, 0, 0);
					this.bGet2 = false;
				}
				return true;
			}
			if (!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg == 3) {
				this.bGet2 = false;
			}
			return true;
		}

		if (this.bGift2 && GmMe.me.rbs.iLev >= 10) {
			if (this.btn_gift2.ProcTouch(msg, x, y)) {
				if (this.btn_gift2.bCheck()) {// 打开领取页面
					if (GmMe.me.iFlag[37] == 0)
						this.bGet2 = true;
					else
						EasyMessage.easymsg.AddMessage("倒计时结束后可领");
				}
				return true;
			}
		}

		return false;
	}
}
LoginGift.lg = new LoginGift();

LoginGift.DrawNum=function( x,  y,  num) {
	// GmPlay.xani_ui2.DrawAnima_aa(x+5, y, Gameing.aa_xy.iAnimaPoint,num/10);
	// GmPlay.xani_ui2.DrawAnima_aa(x+15, y, Gameing.aa_xy.iAnimaPoint,num%10);

	// M3DFast.gi().DrawTextEx(x+5, y, ""+num/10, 0xffffffff, 20, 101, 1, 1,
	// 0, -2, -3);
	// M3DFast.gi().DrawTextEx(x+15, y, ":"+num%10, 0xffffffff, 20, 101, 1,
	// 1, 0, -2, -3);
}

LoginGift.DrawTime=function( x,  y,  sec) {// 共80-8=72/2=36宽
	sec=parseInt(sec);
	var str = "";
	var i = parseInt(sec / 60 / 60) % 60;
	str = str + parseInt(i / 10) + (i % 10) + ":";
	i = parseInt(sec / 60) % 60;
	str = str + parseInt(i / 10) + (i % 10) + ":";
	i = sec % 60;
	str = str + parseInt(i / 10) + (i % 10);
	
	M3DFast.gi().DrawText_2(x,y, str, 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3, 3, 0xff1a0000);

	/*
	 * DrawNum(x+52,y,sec%60); M3DFast.gi().DrawTextEx(x+50-4-2+5, y, ":",
	 * 0xffffffff, 20, 101, 1, 1, 0, -2, -3); //
	 * GmPlay.xani_ui2.DrawAnima_aa(x+50-4-2+5, y,
	 * Gameing.aa_xy.iAnimaPoint,10); sec/=60; DrawNum(x+26,y,sec%60);
	 * M3DFast.gi().DrawTextEx(x+20-2+5, y, ":", 0xffffffff, 20, 101, 1, 1,
	 * 0, -2, -3); // GmPlay.xani_ui2.DrawAnima_aa(x+20-2+5, y,
	 * Gameing.aa_xy.iAnimaPoint,10); sec/=60; DrawNum(x,y,sec%60);
	 */
}