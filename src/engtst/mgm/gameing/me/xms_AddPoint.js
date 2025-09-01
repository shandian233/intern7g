
import GameData from "../../../../config/GameData"
import RunFirst from "../../../../engine/xms/RunFirst"
import XmsEngine from "../../../../engine/xms/XmsEngine"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import PromptMessage from "../../../../engtst/mgm/frame/message/PromptMessage"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

import GmMe from "./GmMe"

export default class xms_AddPoint extends RunFirst {
	constructor() {
		super();
			//剑侠居","茅蓬坞","庐医崖","武安阁","溶洞","鬼谷","封神台","仙人洞","神女峰"};
	 this._RMD=[
			"10级前自动升级加点，10级拜师后方可自己分配属性点数",
			"#c0000ff4力量1体质# #cffffff常用加点，站得稳生存强 有输出#e#c0000ff5力量# #cffffff高物理输出，克制法系#e#c0000ff4力量1敏捷# #cffffff适用于竞技玩法，出手快输出强",
			"#c0000ff3敏捷2耐力# #cffffff常用加点，出手快，站得稳，生存强#e#c0000ff4敏捷1体/5敏捷# #cffffff高端玩法，出手快，生存弱，适合高端玩家",
			"#c0000ff2体力3耐力/3体力2耐力# #cffffff主流加点，站得住，生存强#e#c0000ff3灵力/1体力/1耐力# #cffffff任务加点，输出高，生存强",
			
			"#c0000ff4力量1体质# #cffffff常用加点，站得稳生存强 有输出#e#c0000ff5力量# #cffffff高物理输出，克制法系#e#c0000ff4力量1敏捷# #cffffff适用于竞技玩法，出手快输出强",
			"#c0000ff4灵力1体力/5灵力# #cffffff任务加点，输出高#e#c0000ff3灵力 2耐力# #cffffff竞技玩法，有输出，双抗高",
			"#c0000ff	3敏捷2体力# #cffffff常用加点，出手快，站得稳，生存强#e#c0000ff4敏捷1体/5敏捷# #cffffff高端玩法，出手快，生存弱，适合高端玩家#e#c0000ff4力量1体力# #cffffff适合任务，能输出，生存强",
			
			"#c0000ff4灵力1体力/5灵力# #cffffff任务加点，输出高#e#c0000ff3灵力 2耐力# #cffffff竞技玩法，有输出，双抗高",
			"#c0000ff2体力2耐力1法力# #cffffff任务型加点，站的住，蓝量够#e#c0000ff2体3耐# #cffffff钢板型仙人，团队中流砥柱的辅助人才",
			"#c0000ff4力量1体力/4力量1耐力/5力量# #cffffff常用加点，物理伤害影响高#e#c0000ff3力量2灵力# #cffffff主流加点，双输出影响高，抗性高#e#c0000ff3体2耐力/2体力2耐力1敏# #cffffff高防御，生存强，辅助路线",
		];
	}

	InitBefore() {

	}

	InitAfter() {
		console.log('什么鬼:',this.prunclass)
		var i;
		this.ptxt_base = new Array(7);//
		for (i = 0; i < 7; i++)
		{
			this.ptxt_base[i] = this.FindControl(this.prunclass, "显示" + i);
			this.ptxt_base[i].iY-=30;
		}

		this.pbtn_sub = new Array(5);//
		this.psli_point = new Array(5);//
		this.pbtn_add = new Array(5);//
		this.ptxt_value = new Array(5);//
		for (i = 0; i < 5; i++) {
			this.pbtn_sub[i] = this.FindControl(this.prunclass, "减按钮" + i);
			this.psli_point[i] = this.FindControl(this.prunclass, "滑杆" + i);
			this.pbtn_add[i] = this.FindControl(this.prunclass, "加按钮" + i);
			this.ptxt_value[i] =  this.FindControl(this.prunclass, "数值" + i);
			
			this.ptxt_value[i].iY-=30;

			this.psli_point[i].SetRange(GmMe.me.rbs.iLev * 6);
		}
		this.pbtn_confirm = this.FindControl(this.prunclass, "确认加点");
		this.pbtn_wash =this.FindControl(this.prunclass, "洗点");

		this.iAddAtt = new Int32Array(5);//
		for (i = 0; i < 5; i++)
			this.iAddAtt[i] = 0;
		
		this.pbtn_plan= this.FindControl(this.prunclass, "加点方案");
		this.pbtn_recommend= this.FindControl(this.prunclass, "推荐加点");
		
		this.iOldFlag=new Int32Array(6);//
		
		this.InitValue();
	}

	InitValue() {
		var i;

		var race = GmMe.me.iRace;
		var tz = GameData.iBaseAttAdd[race][0] + GmMe.me.rbs.iBaseAtt[0]
				+ GmMe.me.rbs.iLev;// 0级基础+所加点+等级
		var fl = GameData.iBaseAttAdd[race][1] + GmMe.me.rbs.iBaseAtt[1]
				+ GmMe.me.rbs.iLev;
		var ll = GameData.iBaseAttAdd[race][2] + GmMe.me.rbs.iBaseAtt[2]
				+ GmMe.me.rbs.iLev;
		var nl = GameData.iBaseAttAdd[race][3] + GmMe.me.rbs.iBaseAtt[3]
				+ GmMe.me.rbs.iLev;
		var mj = GameData.iBaseAttAdd[race][4] + GmMe.me.rbs.iBaseAtt[4]
				+ GmMe.me.rbs.iLev;

		this.ptxt_value[0].sText = "#c003e57" + tz;
		this.ptxt_value[1].sText = "#c003e57" + fl;
		this.ptxt_value[2].sText = "#c003e57" + ll;
		this.ptxt_value[3].sText = "#c003e57" + nl;
		this.ptxt_value[4].sText = "#c003e57" + mj;

		for (i = 0; i < 5; i++){
			this.psli_point[i].SetPos(GmMe.me.rbs.iBaseAtt[i] + this.iAddAtt[i]);
			if (this.iAddAtt[i] > 0)this.ptxt_value[i].sText += ("#c00ff00+" + this.iAddAtt[i]);
		}

		for (i = 0; i < 5; i++)
			GmMe.me.rbs.iBaseAtt[i] += this.iAddAtt[i];
		GmMe.me.CalcFightAtt();
		var maxhp = GmMe.me.rbs.iMaxHp;
		var maxmp = GmMe.me.rbs.iMaxMp;
		var spirit = GmMe.me.rbs.iSpirit;
		var attack = GmMe.me.rbs.iAttack;
		var defence = GmMe.me.rbs.iDefence;
		var speed = GmMe.me.rbs.iSpeed;
		var nut = GmMe.me.rbs.nut;

		for (i = 0; i < 5; i++)
			GmMe.me.rbs.iBaseAtt[i] -= this.iAddAtt[i];
		GmMe.me.CalcFightAtt();

		this.ptxt_base[0].sText = "#c003e57气  血：" + GmMe.me.rbs.iMaxHp;
		if (GmMe.me.rbs.iMaxHp > maxhp)
			this.ptxt_base[0].sText += "#c00ff00-" + (GmMe.me.rbs.iMaxHp - maxhp);
		else if (GmMe.me.rbs.iMaxHp < maxhp)
			this.ptxt_base[0].sText += "#c00ff00+" + (maxhp - GmMe.me.rbs.iMaxHp);

		this.ptxt_base[1].sText = "#c003e57魔  法：" + GmMe.me.rbs.iMaxMp;
		if (GmMe.me.rbs.iMaxMp > maxmp)
			this.ptxt_base[1].sText += "#c00ff00-" + (GmMe.me.rbs.iMaxMp - maxmp);
		else if (GmMe.me.rbs.iMaxMp < maxmp)
			this.ptxt_base[1].sText += "#c00ff00+" + (maxmp - GmMe.me.rbs.iMaxMp);

		this.ptxt_base[2].sText = "#c003e57灵  力：" + GmMe.me.rbs.iSpirit;
		if (GmMe.me.rbs.iSpirit > spirit)
			this.ptxt_base[2].sText += "#c00ff00-" + (GmMe.me.rbs.iSpirit - spirit);
		else if (GmMe.me.rbs.iSpirit < spirit)
			this.ptxt_base[2].sText += "#c00ff00+" + (spirit - GmMe.me.rbs.iSpirit);

		this.ptxt_base[3].sText = "#c003e57伤  害：" + GmMe.me.rbs.iAttack;
		if (GmMe.me.rbs.iAttack > attack)
			this.ptxt_base[3].sText += "#c00ff00-" + (GmMe.me.rbs.iAttack - attack);
		else if (GmMe.me.rbs.iAttack < attack)
			this.ptxt_base[3].sText += "#c00ff00+" + (attack - GmMe.me.rbs.iAttack);

		this.ptxt_base[4].sText = "#c003e57防  御：" + GmMe.me.rbs.iDefence;
		if (GmMe.me.rbs.iDefence > defence)
			this.ptxt_base[4].sText += "#c00ff00-" + (GmMe.me.rbs.iDefence - defence);
		else if (GmMe.me.rbs.iDefence < defence)
			this.ptxt_base[4].sText += "#c00ff00+" + (defence - GmMe.me.rbs.iDefence);

		this.ptxt_base[5].sText = "#c003e57速  度：" + GmMe.me.rbs.iSpeed;
		if (GmMe.me.rbs.iSpeed > speed)
			this.ptxt_base[5].sText += "#c00ff00-" + (GmMe.me.rbs.iSpeed - speed);
		else if (GmMe.me.rbs.iSpeed < speed)
			this.ptxt_base[5].sText += "#c00ff00+" + (speed - GmMe.me.rbs.iSpeed);

		this.ptxt_base[6].sText = "#c003e57潜  能：" + GmMe.me.rbs.nut;
		if (GmMe.me.rbs.nut > nut)
			this.ptxt_base[6].sText += "#c00ff00-" + (GmMe.me.rbs.nut - nut);
		else if (GmMe.me.rbs.nut < nut)
			this.ptxt_base[6].sText += "#c00ff00+" + (nut - GmMe.me.rbs.nut);
		
		if((GmMe.me.iFlagExt[11]&2)!=0)this.pbtn_plan.sName="方案1";
		else if((GmMe.me.iFlagExt[13]&2)!=0)this.pbtn_plan.sName="方案2";
		else if((GmMe.me.iFlagExt[15]&2)!=0)this.pbtn_plan.sName="方案3";
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

		if (Confirm1.end(Confirm1.CONFIRM_WASHROLEPOINT)) {
			if (Confirm1.bConfirm) {// 同意开通VIP
				GmProtocol.gi().s_UseGoods(MyGoods.gi().GetGid(191), 1,"");
			}
		}
	}

	setatt( pos,  value) {
		var i;
		var sum = value;
		for (i = 0; i < 5; i++) {
			if (pos != i)
				sum += this.iAddAtt[i];
		}
		if (value < 0) {
			value = 0;
		} else if (sum > GmMe.me.rbs.nut) {
			value -= (sum - GmMe.me.rbs.nut);
		}
		this.iAddAtt[pos] = value;
		this.InitValue();
	}

	ProcTouch( msg,  x,  y) {
		var i;
		this._ProcTouch(msg, x, y);
		for (i = 0; i < 5; i++) {
			if (this.pbtn_sub[i].IsChecked()) {
				this.setatt(i, this.iAddAtt[i] - 1);
			}
			if (this.psli_point[i].IsChanged()) {
				this.setatt(i, this.psli_point[i].iPos - GmMe.me.rbs.iBaseAtt[i]);
			}
			if (this.pbtn_add[i].IsChecked()) {
				this.setatt(i, this.iAddAtt[i] + 1);
			}
		}

		if (this.pbtn_confirm.IsChecked())
		{
			for (i = 0; i < 5; i++)GmMe.me.rbs.iBaseAtt[i] += this.iAddAtt[i];
			GmMe.me.CalcFightAtt();
			GmProtocol.gi().s_AddPoint(this.iAddAtt[0], this.iAddAtt[1], this.iAddAtt[2],this.iAddAtt[3], this.iAddAtt[4]);
			for (i = 0; i < 5; i++)this.iAddAtt[i] = 0;
			this.InitValue();
		}

		if (this.pbtn_wash.IsChecked())
		{
			if (MyGoods.bHaveGoods(191, 1))
			{
				Confirm1.start(Confirm1.CONFIRM_WASHROLEPOINT,"是否消耗一颗涅槃丹#e重置属性点？");
			}
			else FrameMessage.fm.Open("背包中没有可消耗的涅槃丹（可在商城购买）");
		}
		
		if(this.pbtn_plan.IsChecked())
		{
			XmsEngine.pxe.RunXms("人物加点方案");
		}

		if(this.pbtn_recommend.IsChecked())
		{
//			var maxnut=GmMe.me.rbs.iLev*5+(GmMe.me.iFlag[54]%1000);

			PromptMessage.Open("加点说明",
					"#c0000ff体质# #cffffff影响# 气血，灵力，速度# #c0000ff已分配:"+GmMe.me.rbs.iBaseAtt[0]+"点#e"+
					"#c0000ff法力# #cffffff影响# 灵力，魔法# #c0000ff已分配:"+GmMe.me.rbs.iBaseAtt[1]+"点#e"+
					"#c0000ff力量# #cffffff影响# 灵力，伤害，速度# #c0000ff已分配:"+GmMe.me.rbs.iBaseAtt[2]+"点#e"+
					"#c0000ff耐力# #cffffff影响# 灵力，防御，速度# #c0000ff已分配:"+GmMe.me.rbs.iBaseAtt[3]+"点#e"+
					"#c0000ff敏捷# #cffffff影响# 速度# #c0000ff已分配:"+GmMe.me.rbs.iBaseAtt[4]+"点#e"+
					"#cffff00加点方案推荐#e"+this._RMD[GmMe.me.rbs.iSchoolId]);
		}
		return true;
	}

}
