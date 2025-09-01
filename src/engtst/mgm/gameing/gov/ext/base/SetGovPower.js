
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../../../engine/control/XCheckBox"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import PromptMessage from "../../../../../../engtst/mgm/frame/message/PromptMessage"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

export default class SetGovPower extends BaseClass{
	 constructor( a)
	{
		super();
		var i;
		
		this.iW=500;
		this.iH=400;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.chk_powers=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.chk_powers[i]=new XCheckBox(GmPlay.xani_button);
			this.chk_powers[i].InitBox("复选框50_53");
			this.chk_powers[i].bTrue=false;
			this.chk_powers[i].Move(this.iX+50+i%2*200, this.iY+50+80+20+Math.floor(i/2)*70, 50, 50);
		}
		this.chk_powers[0].sDetail="人员管理";
		this.chk_powers[1].sDetail="帮派管理";
		this.chk_powers[2].sDetail="开启副本";
		this.chk_powers[3].sDetail="群发消息";
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_button);
		this.btn_ok.InitButton("普通按钮140_55");
		this.btn_ok.sName="确定";
		this.btn_ok.Move(this.iX+this.iW/2-140/2, this.iY+this.iH-50-55, 140, 55);
		
		this.btn_question=new XButtonEx2(GmPlay.xani_button);
		this.btn_question.InitButton("问号按钮60_60");
		this.btn_question.Move(this.iX+this.iW-50-60, this.iY+this.iH-50-60, 60, 60);
	}

	Draw()
	{
		var i;
		DrawMode.frame_type4("中等框a52_50",this.iX,this.iY,this.iW,this.iH,52,50);
		GmPlay.xani_head.DrawAnima(this.iX+50,this.iY+50,"新头像"+this.pgm.iRas,0);
		M3DFast.gi().DrawTextEx(this.iX+50+80+10, this.iY+50+20, this.pgm.sName, 0xff000000, 25, 101, 1, 1, 0, 0, -2);
		M3DFast.gi().DrawTextEx(this.iX+50+80+10, this.iY+50+20+40, MyGov.sJob(this.pgm.iJob), 0xff000000, 25, 101, 1, 1, 0, 0, -2);

		for(i=0;i<4;i++)
		{
			this.chk_powers[i].Draw();
		}
		this.btn_ok.Draw();
		this.btn_question.Draw();
	}
	
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<4;i++)
		{
			if(this.chk_powers[i].ProcTouch(msg, x, y))return true;
		}
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				this.pgm.iPower=0;
				if(this.chk_powers[0].bTrue)this.pgm.iPower|=1;
				if(this.chk_powers[1].bTrue)this.pgm.iPower|=2;
				if(this.chk_powers[2].bTrue)this.pgm.iPower|=4;
				if(this.chk_powers[3].bTrue)this.pgm.iPower|=8;
				GmProtocol.gi().s_NewGovOperate(8, this.pgm.iRid, this.pgm.iPower, 0,0,this.pgm.sName);
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_question.ProcTouch(msg, x, y))
		{
			if(this.btn_question.bCheck())
			{
				PromptMessage.Open("界面说明", "#c000000# # 权限系统可以让帮主管理各个帮派官员所拥有的管理权限。#e#e1.人员管理#e# # 授予该管理人员任命权限，以及加入帮众与踢出帮众的权限#e#e2.帮派管理#e# # 授予该管理人员管理帮派建筑，帮派技能，帮派维护等级和帮派升级的权限#e#e3.开启副本#e# # 授予该管理人员主动开启帮派副本的权限#e#e4.群发消息#e# # 授予该管理人员群发消息的权限");
			}
			return true;
		}
		if(!XDefine.bInRect(x, y, this.iX,this.iY, this.iW, this.iH) && msg==3)
		{
			XStat.gi().PopStat(1);
			return true;
		}
		return false;
	}
}

SetGovPower.Open=function( gm)
{
    if(MyGov.mg.iJob!=0)return;
    var afg;
    if (XStat.gi().iXStat != XStat.GS_SETGOVPOWER)afg= XStat.gi().PushStat(XStat.GS_SETGOVPOWER);
    else afg = XStat.gi().LastStat(0);

    afg.pgm=gm;
    afg.chk_powers[0].bTrue=((gm.iPower&1)!=0);
    afg.chk_powers[1].bTrue=((gm.iPower&2)!=0);
    afg.chk_powers[2].bTrue=((gm.iPower&4)!=0);
    afg.chk_powers[3].bTrue=((gm.iPower&8)!=0);
}