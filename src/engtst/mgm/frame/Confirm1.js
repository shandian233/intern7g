
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import XButton from "../../../engine/control/XButton"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import XStat from "../../../engtst/mgm/XStat"
import FormatString from "../../../engtst/mgm/frame/format/FormatString"

import DrawMode from "./DrawMode"

export default class Confirm1 extends BaseClass{
	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=350;
		this.iH=200;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_ok.InitButton("内框按钮");
		this.btn_ok.Move(this.iX+10,this.iY+this.iH-60, 70, 40);
//		this.btn_ok.bSingleButton=true;
		this.btn_ok.sName="确定";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_cancel.InitButton("内框按钮");
		this.btn_cancel.Move(this.iX+this.iW-90,this.iY+this.iH-60, 70, 40);
//		this.btn_cancel.bSingleButton=true;
		this.btn_cancel.sName="取消";
		
		Confirm1.bFinished=false;
	}
	Draw()
	{
//		FormatString.gi().Format(Confirm1.sDetail, this.iW-40, 25);
		FormatString.gi().FormatEx(Confirm1.sDetail, this.iW-40, 26, 0, 0, 30);
//		this.pm3f.DrawText(0, this.pm3f.imf.SCRH-30, "Confirm", 0xffffffff);
		
//		this.pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xff000000);
//		this.pm3f.DrawRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xffffffff);
		this.iH=20+FormatString.gi().iH+20+55+20;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok.Move(this.iX+20,this.iY+this.iH-70, 98, 55);
		this.btn_cancel.Move(this.iX+this.iW-98-20,this.iY+this.iH-70, 98, 55);
		
	//	DrawMode.Frame1_BR(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		
		FormatString.gi().Draw(this.iX+20, this.iY+20);
		
		this.btn_ok.Draw();
		this.btn_cancel.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				Confirm1.bFinished=true;
				Confirm1.bConfirm=true;
				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				Confirm1.bFinished=true;
				Confirm1.bConfirm=false;
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}
	Confirm1.CONFIRM_UPGRADE=10;//升级
	Confirm1.CONFIRM_DROPGOODS=20;//丢弃物品
	Confirm1.CONFIRM_BREAKGOODS=21;//分解物品
	Confirm1.CONFIRM_DROPPET=30;//放生宠物
	Confirm1.CONFIRM_INVITE=40;//邀请入队
	Confirm1.CONFIRM_MYBUY=50;//购买其他玩家摊位上的东西
	Confirm1.CONFIRM_LEAVEGOV=60;//离帮/解散
	Confirm1.CONFIRM_UPGRADEGOV=61;//帮派升级
	Confirm1.CONFIRM_SWAPGOV=62;//帮派升级
	Confirm1.CONFIRM_GOVKICK=70;//帮派踢人
	Confirm1.CONFIRM_BUYSTORE=80;//开启背包
	Confirm1.CONFIRM_DROPMOUNTS=90;//丢弃坐骑
	Confirm1.CONFIRM_JJMOUNTS=100;//坐骑进阶
	Confirm1.CONFIRM_ESCAPE=110;//战斗中逃跑
	Confirm1.CONFIRM_LEAVEFUBEN=120;//解散/离开副本
	Confirm1.CONFIRM_STARTFUBEN=130;//开始副本
	Confirm1.CONFIRM_VIP=140;//开通vip
	Confirm1.CONFIRM_LOCK=150;//加锁确认
	Confirm1.CONFIRM_UNLOCK=160;//强制解锁
	Confirm1.CONFIRM_NOWAR=200;//免战开关
	Confirm1.CONFIRM_SWADD=201;//每日战队声望领取
	Confirm1.CONFIRM_FTDISMISS=202;//解散/退出战队
	Confirm1.CONFIRM_FTKICK=203;//踢出队员
	Confirm1.CONFIRM_FTTRANFER=204;//转换队长
	Confirm1.CONFIRM_FTMJ1=210;//战队秘境1
	Confirm1.CONFIRM_FTMJ2=211;//战队秘境1
	Confirm1.CONFIRM_FTMJ3=212;//战队秘境1
	Confirm1.CONFIRM_FTMJ4=213;//战队秘境1
	Confirm1.CONFIRM_FTMJ5=214;//战队秘境1
	Confirm1.CONFIRM_MERGEONE=250;//自然之力合成
	Confirm1.CONFIRM_MERGEALL=251;//合成所有
	Confirm1.CONFIRM_IMPROVEEQUIP=260;//装备强化
	Confirm1.CONFIRM_EXITAQ=270;//退出中午答题活动
	Confirm1.CONFIRM_FUSEPET=280;//炼妖确认
	Confirm1.CONFIRM_APPROVEPET=281;//认证技能
	Confirm1.CONFIRM_CHANGECOLOR=290;//染色确认
	Confirm1.CONFIRM_BACKGOV=300;//回帮
	Confirm1.CONFIRM_GOVAPPOINT=301;//职位转让确认
	Confirm1.CONFIRM_GOVKICKMEMBER=302;//踢出帮派
	Confirm1.CONFIRM_GOVRELEASEENTRUST=303;//发布委托
	Confirm1.CONFIRM_GOVCANCELENTRUST=304;//撤销所发布的委托
	Confirm1.CONFIRM_GOVGETENTRUST=305;//接受委托
	Confirm1.CONFIRM_GOVUPGRADE=306;//升级帮派
	Confirm1.CONFIRM_GOVDISBAND=307;//解散帮派
	Confirm1.CONFIRM_GOVCONVEY1=[310,311,312,313,314,315,316];//帮派的传送
	Confirm1.CONFIRM_GOVCONVEY2=[320,321,322,323,324,325,326];
	Confirm1.CONFIRM_BACKTOSCHOOL=400;//回师门
	Confirm1.CONFIRM_WASHROLEPOINT=500;//洗人物属性点
	Confirm1.CONFIRM_OPENPOINTPLAN=501;//开启加点方案
	Confirm1.CONFIRM_SWAPPOINTPLAN=502;//切换加点方案
	Confirm1.CONFIRM_WASHPET=600;//洗宝宝
	Confirm1.CONFIRM_WASHPETBYINGOT=601;//洗宝宝
	Confirm1.CONFIRM_CANCELMISSION=700;//放弃任务
	Confirm1.iCid;
	Confirm1.bFinished=false;
	Confirm1.bConfirm;
	Confirm1.iCid;
	Confirm1.sDetail;
	

	
	Confirm1.start=function( cid, detail)
	{
		if(XStat.gi().LastStatType(0)==XStat.GS_CONFIRM1)return;
		Confirm1.iCid=cid;
		Confirm1.sDetail=detail;
		Confirm1.bFinished=false;
		XStat.gi().PushStat(XStat.GS_CONFIRM1);
	}
	Confirm1.end=function( cid)
	{
		if(Confirm1.bFinished && Confirm1.iCid==cid)
		{
			Confirm1.iCid=0;
			Confirm1.bFinished=false;
			return true;
		}
		return false;
	}