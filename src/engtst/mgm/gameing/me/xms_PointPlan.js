
import GameData from "../../../../config/GameData"
import RunFirst from "../../../../engine/xms/RunFirst"
import XmsCButton from "../../../../engine/xms/control/XmsCButton"
import XmsCSlider from "../../../../engine/xms/control/XmsCSlider"
import XmsCText from "../../../../engine/xms/control/XmsCText"
import X40_CLASS from "../../../../engine/xms/first/X40_CLASS"
import X_FIRST from "../../../../engine/xms/first/X_FIRST"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

import GmMe from "./GmMe"

export default class xms_PointPlan extends RunFirst {

	 constructor() {
		 super();
	}

	InitBefore() {
	}

	InitAfter() {
		var i;
		this.ptxt_atts = new Array(3);//
		this.pbtn_proc = new Array(3);//
		for (i = 0; i < 3; i++)
		{
			this.pbtn_proc[i] =  this.FindControl(this.prunclass, "方案" + i+"按钮");
			this.ptxt_atts[i] =  this.FindControl(this.prunclass, "方案" + i+"点数");
		}
		this.iOldFlag=new Int32Array(6);//
		for(i=0;i<6;i++)
		{
			this.iOldFlag[i]=GmMe.me.iFlagExt[11+i];
		}
		this.InitValue();
	}

	 InitValue() {
		var i;

		for(i=0;i<3;i++)
		{
			if((GmMe.me.iFlagExt[11+i*2]&1)==0)
			{//未激活
				this.pbtn_proc[i].sName="开启";
				this.ptxt_atts[i].sText="未开启";
			}
			else
			{//已激活
				if((GmMe.me.iFlagExt[11+i*2]&2)==0)
				{//未启用
					this.pbtn_proc[i].sName="切换";
				}
				else
				{//已启用
					this.pbtn_proc[i].sName="使用中";
				}
				this.ptxt_atts[i].sText="体质:"+((GmMe.me.iFlagExt[11+i*2]>>20)&0x3ff)+
						"，法力:"+((GmMe.me.iFlagExt[11+i*2]>>10)&0x3ff)+
						"，力量:"+((GmMe.me.iFlagExt[12+i*2]>>20)&0x3ff)+
						"，耐力:"+((GmMe.me.iFlagExt[12+i*2]>>10)&0x3ff)+
						"，敏捷:"+((GmMe.me.iFlagExt[12+i*2])&0x3ff);
			}
		}
	}

	Draw() {
		var i;
		var change=false;
		for(i=0;i<6;i++)
		{
			if(this.iOldFlag[i]!=GmMe.me.iFlagExt[11+i])
			{
				this.iOldFlag[i]=GmMe.me.iFlagExt[11+i];
				change=true;
			}
		}
		if(change)this.InitValue();
		
		this._Draw();
		
		if (Confirm1.end(Confirm1.CONFIRM_OPENPOINTPLAN)) {
			if (Confirm1.bConfirm) {// 开启方案
				GmProtocol.gi().s_SeverEvent(32, 0, this.iPlanPoint, 0, 0);
			}
		}
		if (Confirm1.end(Confirm1.CONFIRM_SWAPPOINTPLAN)) {
			if (Confirm1.bConfirm) {// 切换方案
				GmProtocol.gi().s_SeverEvent(32, 1, this.iPlanPoint, 0, 0);
			}
		}
	}
	

	ProcTouch( msg,  x,  y) {
		var i;
		this._ProcTouch(msg, x, y);
		for (i = 0; i < 3; i++) {
			if(this.pbtn_proc[i].IsChecked())
			{
				if((GmMe.me.iFlagExt[11+i*2]&1)==0)
				{//未激活
					if(i==1)Confirm1.start(Confirm1.CONFIRM_OPENPOINTPLAN,"开启方案2需要消耗800元宝，是否确认开启？");
					if(i==2)Confirm1.start(Confirm1.CONFIRM_OPENPOINTPLAN,"开启方案3需要消耗1600元宝，是否确认开启？");
					this.iPlanPoint=i;
				}
				else
				{//已激活
					if((GmMe.me.iFlagExt[11+i*2]&2)==0)
					{//未启用
						if(((GmMe.me.iFlag[60]>>6)%3)==0)Confirm1.start(Confirm1.CONFIRM_SWAPPOINTPLAN,"本次切换方案免费，是否确认切换？");
						else Confirm1.start(Confirm1.CONFIRM_SWAPPOINTPLAN,"切换方案需要消耗"+((GmMe.me.iFlag[60]>>6)%3)*10+"万铜币，是否确认切换？");
						this.iPlanPoint=i;
					}
					else
					{//已启用，无处理
					}
				}
			}
		}

		return true;
	}
}
