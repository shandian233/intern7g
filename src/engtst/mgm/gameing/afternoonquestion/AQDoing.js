import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"

export default class AQDoing extends BaseClass{
	
	
	 constructor( ani)
	{
		super();
		var i;
		this.sAnswers=new Array(4);
		
		this.iW=750;
		this.iH=540;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_sel=new Array(4);
		for(i=0;i<4;i++)
		{
			this.btn_sel[i]=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_sel[i].InitButton("分类标签按钮");
		}
		this.btn_exit=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_exit.InitButton("分类标签按钮");
		this.btn_exit.sName="退出答题";
		this.btn_exit.Move(this.iX+this.iW-40-190,this.iY+this.iH-40-40,190,40);
		
		this.btn_get=new XButtonEx2(GmPlay.xani_ngoods);
		this.btn_get.InitButton("礼包1");
//		this.btn_get.sName="领奖";
        this.bWin=false;
        this._bigletter=["A.","B.","C.","D."];
	}
	
	
	Draw()
	{
		var i;
		var offx,offy;
		var offw=200;
		var offh=200;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		offx=this.iX+30;
		offy=this.iY+30;
		DrawMode.new_framein(offx,offy,offw,offh);//左上
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "答对题数", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+50, offy+60, this.iRightCount+"/"+this.iReplyCount, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		
		offx+=offw+20;
		DrawMode.new_framein(offx,offy,this.iW-offw-30-30-20,offh);//右上
		if(!this.bWin)
		{
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "题目"+GameData.sBigNum[this.iReplyCount+1], 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		FormatString.gi().FormatEx("#c003e57"+this.sQuestion, this.iW-offw-30-30-20, 30, 0, 0,35);
		FormatString.gi().Draw(offx+20, offy+60);
//		M3DFast.gi().DrawTextEx(offx+20, offy+60, this.sQuestion, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		i= parseInt((this.iTm-GmPlay.iNowMillis)/1000);
		if(i<0)i=0;
		M3DFast.gi().DrawTextEx(this.iX+this.iW-30-20, offy+offh-20, "倒计时："+i+"s", 0xff003e57, 30, 101, 1, 1, 0, -3, -3);
		}
		
		offx=this.iX+30;
		offy+=offh+20;
		DrawMode.new_framein(offx,offy,offw,this.iH-offh-30-30-20);//左下
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "活动奖励", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		if(this.bWin)
		{
			this.btn_get.Move(offx+offw/2-80/2, offy+100, 80, 80);
			this.btn_get.Draw();
		}
		
		offx+=offw+20;
		DrawMode.new_framein(offx,offy,this.iW-offw-30-30-20,this.iH-offh-30-30-20-40-40);//右下
		if(!this.bWin)
		{
		for(i=0;i<this.iACount;i++)
		{
			this.btn_sel[i].Move(offx+30+i%2*220,offy+30+parseInt(i/2)*80,190,40);
			this.btn_sel[i].sName=this._bigletter[i]+this.sAnswers[i];
			this.btn_sel[i].Draw();
		}
		}
		
		this.btn_exit.Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_EXITAQ))
		{
			if(Confirm1.bConfirm)
			{//同意升级
				GmProtocol.gi().s_AfternoooQuestion(3,0,0);
				XStat.gi().PopStat(1);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<this.iACount;i++)
		{
			if(this.btn_sel[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sel[i].bCheck())
				{
					GmProtocol.gi().s_AfternoooQuestion(1, this.iCheck, i);
				}
			}
		}
		if(this.btn_exit.ProcTouch(msg, x, y))
		{
			if(this.btn_exit.bCheck())
			{//点退出，确认结束答题
				if(this.bWin)Confirm1.start(Confirm1.CONFIRM_EXITAQ,"你已答满15道题，可以点击左侧图标领取额外奖励，退出后奖励无法领取");
				else Confirm1.start(Confirm1.CONFIRM_EXITAQ,"离开活动界面后计算为活动失败，是否确定退出活动？");
			}
		}
		if(this.bWin)
		{
			if(this.btn_get.ProcTouch(msg, x, y))
			{
				if(this.btn_get.ProcTouch(msg, x, y))
				{//领奖
					GmProtocol.gi().s_AfternoooQuestion(2, 0, 0);
					XStat.gi().PopStat(1);
				}
			}
		}
		return false;
	}
}

AQDoing.Open=function( pls)
	{
		var i;
		var type=pls.GetNextInt();
		if(type==1)
		{//得到题目
			if(XStat.gi().iXStat!=XStat.GS_AQDOING)XStat.gi().PushStat(XStat.GS_AQDOING);
			
			var aqd=XStat.gi().LastStat(0);
			aqd.sQuestion=pls.GetNextString();
			aqd.iACount=pls.GetNextInt();
			for(i=0;i<aqd.iACount;i++)
			{
				aqd.sAnswers[i]=pls.GetNextString();
			}
			aqd.iCheck=pls.GetNextInt();
			aqd.iReplyCount=pls.GetNextInt();
			aqd.iRightCount=pls.GetNextInt();
			aqd.iTm=GmPlay.iNowMillis+20000;
		}
		if(type==2)
		{//失败结束
			if(XStat.gi().iXStat==XStat.GS_AQDOING)XStat.gi().PopStat(1);
		}
		if(type==3)
		{//胜利领奖
			if(XStat.gi().iXStat!=XStat.GS_AQDOING)XStat.gi().PushStat(XStat.GS_AQDOING);
			var aqd=XStat.gi().LastStat(0);
			aqd.iReplyCount=pls.GetNextInt();
			aqd.iRightCount=pls.GetNextInt();
			aqd.bWin=true;
		}
	}