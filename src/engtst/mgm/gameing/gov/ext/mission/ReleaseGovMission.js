
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

export default class ReleaseGovMission extends BaseClass{

	 constructor( a)
	{
		super();
		var i;
		this.iW=640;
		this.iH=560;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_select=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_select[i]=new XButtonEx2(GmPlay.xani_icon);
			this.btn_select[i].InitButton(_FOUR[i]);
		}
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_button);
		this.btn_ok.InitButton("普通按钮140_55");
		this.btn_ok.sName="确定";
		this.btn_cancel=new XButtonEx2(GmPlay.xani_button);
		this.btn_cancel.InitButton("普通按钮140_55");
		this.btn_cancel.sName="取消";
		
		this.in_ingot=new XInputNumber(GmPlay.xani_nui3);
		this.in_ingot.iNumber=0;
		this.in_ingot.MinMax(0, 200);
		
		this.in_money=new XInputNumber(GmPlay.xani_nui3);
		this.in_money.iNumber=0;
		this.in_money.MinMax(0, 2000000);
		
		this.in_count=new XInputNumber(GmPlay.xani_nui3);
		this.in_count.iNumber=1;
		this.in_count.MinMax(1, 20);
	}

	
	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.frame_type4("中等框a52_50",this.iX,this.iY,this.iW,this.iH,52,50);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+20+15, "发布委托", 0xff005b41, 30, 101, 1, 1, 0, -2, -2);
		
		offx=this.iX+30;
		offy=this.iY+20+30+20;
		M3DFast.gi().DrawTextEx(offx, offy, "任务类型:", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		offy+=25+10;
		for(i=0;i<4;i++)
		{
			this.btn_select[i].Move(offx+50+i*130,offy,73,73);
			this.btn_select[i].Draw();
			M3DFast.gi().DrawTextEx(this.btn_select[i].iX+this.btn_select[i].iW/2,this.btn_select[i].iY+this.btn_select[i].iH+5 ,_FOUR[i], 0xff000000, 25, 101, 1, 1, 0, -2, 0);
			if(this.iMissionType==i)DrawMode.frame_type2("黄色透明框a25_25", this.btn_select[i].iX, this.btn_select[i].iY, 73, 73,25,25);
		}
		
		offy+=73+5+25+20;
		M3DFast.gi().DrawTextEx(offx, offy, "委托花费:", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		offy+=25+15;
		M3DFast.gi().DrawTextEx(offx+40, offy, "元宝:", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		this.in_ingot.Move(offx+40+70, offy+(25-47)/2, 140);
		this.in_ingot.Draw();
		i=(this.in_ingot.iNumber*5/100);
		i=i<1?1:i;
		if(this.in_ingot.iNumber==0)i=0;
		M3DFast.gi().DrawTextEx(offx+40+70+150, offy, "(额外收取手续费"+i+"元宝)", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		offy+=25+15+15;
		i=(this.in_money.iNumber*5/100);
		i=i<10000?10000:i;
		if(this.in_money.iNumber==0)i=0;
		M3DFast.gi().DrawTextEx(offx+40+70+150, offy, "(额外收取手续费"+i+"铜币)", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+40, offy, "铜币:", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		this.in_money.Move(offx+40+70, offy+(25-47)/2, 140);
		this.in_money.Draw();

		offy+=25+15+20;
		M3DFast.gi().DrawTextEx(offx, offy, "委托轮数:", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		offy+=25+15;
		M3DFast.gi().DrawTextEx(offx+40, offy, "数量:", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		this.in_count.Move(offx+40+70, offy+(25-47)/2, 140);
		this.in_count.Draw();
		M3DFast.gi().DrawTextEx(offx+40+70+150, offy, "(当前可发布"+this.iCanEntrust+"轮)", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		
		this.btn_ok.Move(this.iX+this.iW-30-140, this.iY+this.iH-30-55, 140, 55);
		this.btn_ok.Draw();
		this.btn_cancel.Move(this.iX+30, this.iY+this.iH-30-55, 140, 55);
		this.btn_cancel.Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_GOVRELEASEENTRUST))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_NewGovOperate(16, this.iMissionType,this.in_count.iNumber,this.in_ingot.iNumber, this.in_money.iNumber, "");
				XStat.gi().PopStat(1);
				GmProtocol.gi().s_NewGovOperate(14,100,0,0,0,"");
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		
		if(this.in_count.ProcTouch(msg, x, y))
		{
			this.in_money.bShow=false;
			this.in_ingot.bShow=false;
			return true;
		}
		if(this.in_money.ProcTouch(msg, x, y))
		{
			this.in_count.bShow=false;
			this.in_ingot.bShow=false;
			return true;
		}
		if(this.in_ingot.ProcTouch(msg, x, y))
		{
			this.in_count.bShow=false;
			this.in_money.bShow=false;
			return true;
		}
		
		for(i=0;i<4;i++)
		{
			if(this.btn_select[i].ProcTouch(msg, x, y))
			{
				if(this.btn_select[i].bCheck())
				{
					this.iMissionType=i;
				}
				return true;
			}
		}
		
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				if(this.in_ingot.iNumber==0)i=0;
				else
				{
					i=(this.in_ingot.iNumber*5/100);
					if(i<1)i=1;
					i+=this.in_ingot.iNumber;
					i*=this.in_count.iNumber;
				}
				
				if(this.in_money.iNumber==0)j=0;
				else
				{
					j=(this.in_money.iNumber*5/100);
					if(j<10000)j=10000;
					j+=this.in_money.iNumber;
					j*=this.in_count.iNumber;
				}
				if(i==0 && j==0)EasyMessage.easymsg.AddMessage("请先设置委托奖励");
				else if(GmMe.me.rbs.iInGot<i)FrameMessage.fm.Open("元宝不足");
				else if(GmMe.me.rbs.iMoney<j)FrameMessage.fm.Open("铜币不足");
				else Confirm1.start(Confirm1.CONFIRM_GOVRELEASEENTRUST,"发布"+this.in_count.iNumber+"轮"+_FOUR[this.iMissionType]+"共需花费"+i+"元宝，"+j+"铜币#e#e撤销委托不退还手续费，是否确定发布？");//转让确认
			}
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}
ReleaseGovMission._FOUR=["朱雀任务","青龙任务","白虎任务","玄武任务"];

ReleaseGovMission.Open=function( defmtype, cs1, cs2)
{
	var afg;
	if (XStat.gi().iXStat != XStat.GS_RELEASEGOVMISSION)
	{
		afg= XStat.gi().PushStat(XStat.GS_RELEASEGOVMISSION);
		afg.iMissionType=defmtype;
		afg.iCanEntrust=cs1;
		afg.iMaxCanEntrust=cs2;
		afg.in_count.MinMax(1,cs1);
	}
}