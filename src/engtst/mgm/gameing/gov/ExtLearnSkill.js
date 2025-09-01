
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import PromptActivity from "../../../../engtst/mgm/gameing/help/ang/PromptActivity"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"

import GovFrame from "./GovFrame"

class _EXTSKILL
{/*
	public int iPoint;
	public int iSid;
	public int iLev,iMaxLev;
	public int iNeedExp,iNeedMoney;
	public int iNeedOther;*/
	constructor()
	{

	}
}
export default class ExtLearnSkill extends BaseClass{


	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=800;
		this.iH=400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.elist=new Array(8);//
		for(i=0;i<8;i++)this.elist[i]=new _EXTSKILL();
		
		this.btn_learn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_learn.InitButton("按钮1_110");
		this.btn_learn.sName="学习";
		
		this.btn_select=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_select[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_select[i].InitButton("按钮2");
		}
		this.iSelectPoint=0;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
	}

	Draw()
	{//145+20+20
		var i,w;
		var offx,offy;
		w=this.iW-185-20-25-25;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_framein(this.iX+25, this.iY+25, 185, this.iH-25-25);
		DrawMode.new_framein(this.iX+25+185+20, this.iY+25, w, this.iH-25-25);
		
		for(i=0;i<this.iCount;i++)
		{
			offx=this.iX+20+25;
			offy=this.iY+25+20+i*70;
			this.btn_select[i].Move(offx, offy, 145, 56);
			this.btn_select[i].sName=GovFrame.sSkill(this.elist[i].iPoint);
			if(this.iSelectPoint==i)
			{
				this.btn_select[i].bMouseDown=true;
				this.btn_select[i].bMouseIn=true;
			}
			this.btn_select[i].Draw();
			
//			if(this.iSelectPoint==i)GmPlay.xani_ui.DrawAnimaEx(offx,offy, "统一红黑框",9, 101, 1.0f*160/10, 1, 0,0, 0);
//			this.pm3f.DrawTextEx(offx,offy, GovFrame.sSkill(this.elist[i].iPoint)+this.elist[i].iLev+"/"+this.elist[i].iMaxLev, 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		}
		
		if(this.iSelectPoint>=0)
		{
			offx=this.iX+25+185+20+20;
			offy=this.iY+25+20;
//			this.pm3f.DrawTextEx(x,y,"当前等级"+GmMe.me.rbs.iGovSkill[i], 0xffffffff, 25, 101, 1, 1, 0, 0, 0);
//			y+=30;
//			this.pm3f.DrawTextEx(x,y,"学习上限"+GmMe.me.rbs.iGovSkill[i], 0xffffffff, 25, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_nicon.DrawAnima_aa(offx, offy, GmPlay.de_skill.strValue(this.elist[this.iSelectPoint].iSid, 0, 6),0);
			this.pm3f.DrawTextEx(offx+90,offy+25, GmPlay.de_skill.strValue(this.elist[this.iSelectPoint].iSid, 0, 6), 0xff003e57, 40, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(offx+90,offy+80, "等级："+this.elist[this.iSelectPoint].iLev+"/"+this.elist[this.iSelectPoint].iMaxLev, 0xff003e57, 30, 101, 1, 1, 0, 0, -3);
			offy+=90;
			FormatString.gi().FormatEx("#c003e57"+GmPlay.de_skill.strValue(this.elist[this.iSelectPoint].iSid, 0, 3), w-40, 30, 0, 0, 32);
			FormatString.gi().Draw(offx, offy);
			offy+=FormatString.gi().iH+8;

			if(this.elist[this.iSelectPoint].iNeedExp<=GmMe.me.rbs.iExp)this.pm3f.DrawTextEx(offx,offy, "升级经验："+this.elist[this.iSelectPoint].iNeedExp+"/"+GmMe.me.rbs.iExp, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			else this.pm3f.DrawTextEx(offx,offy, "升级经验："+this.elist[this.iSelectPoint].iNeedExp+"/"+GmMe.me.rbs.iExp, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			offy+=35;
			if(this.elist[this.iSelectPoint].iNeedMoney<=GmMe.me.rbs.iMoney)this.pm3f.DrawTextEx(offx,offy, "升级金钱:"+this.elist[this.iSelectPoint].iNeedMoney+"/"+GmMe.me.rbs.iMoney, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			else this.pm3f.DrawTextEx(offx,offy, "升级金钱:"+this.elist[this.iSelectPoint].iNeedMoney+"/"+GmMe.me.rbs.iMoney, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			offy+=35;
			this.pm3f.DrawTextEx(offx,offy, "绑铜："+GmMe.me.rbs.iReserve, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);

			this.btn_learn.Move(this.iX+this.iW-110-25-20, this.iY+this.iH-52-25-20, 110, 52);
			this.btn_learn.Draw();
		}
		this.btn_close.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
			return true;
		}

		if(this.iSelectPoint>=0)
		{
			if(this.btn_learn.ProcTouch(msg, x, y))
			{
				if(this.btn_learn.bCheck())
				{
					GmProtocol.gi().s_SeverEvent(6, this.stype, this.elist[this.iSelectPoint].iPoint, this.elist[this.iSelectPoint].iSid, 0);
					XStat.gi().PushStat(XStat.GS_LOADING1);
				}
				return true;
			}
		}
		
		for(i=0;i<this.iCount;i++)
		{
			if(this.btn_select[i].ProcTouch(msg, x, y))
			{
				if(this.btn_select[i].bCheck())
				{
					this.iSelectPoint=i;
				}
			}
		}
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}
ExtLearnSkill. Open=function( pls)
{
	var i;
	var es;
	if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
	if(XStat.gi().iXStat==XStat.GS_EXTLEARNSKILL)es=XStat.gi().LastStat(0);
	else es=XStat.gi().PushStat(XStat.GS_EXTLEARNSKILL);
	
	es.stype=pls.GetNextInt();
	es.iCount=pls.GetNextByte();
	for(i=0;i<es.iCount;i++)
	{
		es.elist[i].iPoint=pls.GetNextByte();
		es.elist[i].iSid=pls.GetNextShort();
		
		es.elist[i].iLev=pls.GetNextShort();
		es.elist[i].iMaxLev=pls.GetNextShort();
		
		es.elist[i].iNeedExp=pls.GetNextInt();
		es.elist[i].iNeedMoney=pls.GetNextInt();
		es.elist[i].iNeedOther=pls.GetNextInt();
	}
	
//		es.iW=800;
//		es.iH=400;
//		es.iX=(GmConfig.SCRW-es.iW)/2;
//		es.iY=(GmConfig.SCRH-es.iH)/2;
	

//		es.iSelectPoint=0;
}