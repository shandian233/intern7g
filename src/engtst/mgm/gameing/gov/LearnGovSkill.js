
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import GovFrame from "../../../../engtst/mgm/gameing/gov/GovFrame"

export default class LearnGovSkill extends BaseClass{

	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=800;
		this.iH=550;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);

		this.btn_learn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_learn.InitButton("按钮1_110");
		this.btn_learn.sName="学习";
		
		this.btn_select=new Array(10);//
		for(i=0;i<10;i++)
		{
			this.btn_select[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_select[i].InitButton("按钮2");
		}
		this.iSelectPoint=0;
	}
	
	Draw()
	{
		var i,w;
		var offx,offy;
		w=this.iW-185-20-25-25;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_framein(this.iX+25, this.iY+25, 185, this.iH-25-25);
		DrawMode.new_framein(this.iX+25+185+20, this.iY+25, w, this.iH-25-25);
		this.btn_close.Draw();
		
		for(i=0;i<8;i++)
		{
			offx=this.iX+20+25;
			offy=this.iY+25+20+i*56;
			this.btn_select[i].Move(offx, offy, 145, 56);
			this.btn_select[i].sName=GovFrame.sSkill(i);
			if(this.iSelectPoint==i)
			{
				this.btn_select[i].bMouseDown=true;
				this.btn_select[i].bMouseIn=true;
			}
			this.btn_select[i].Draw();
			
//			x=this.iX+10+20;
//			y=this.iY+65+20+i*30;
//			if(iSkillPoint==i)GmPlay.xani_ui.DrawAnimaEx(x,y-2, "统一红黑框",9, 101, 1.0f*160/10, 1, 0,0, 0);
//			this.pm3f.DrawTextEx(x,y, GovFrame.sSkill(i)+GmMe.me.rbs.iGovSkill[i]+"/"+MyGov.mg.iGovSkillLev[i], 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		}
		
		if(this.iSelectPoint>=0)
		{
			offx=this.iX+25+185+20+20;
			offy=this.iY+25+20;
//			this.pm3f.DrawTextEx(x,y,"当前等级"+GmMe.me.rbs.iGovSkill[i], 0xffffffff, 25, 101, 1, 1, 0, 0, 0);
//			y+=30;
//			this.pm3f.DrawTextEx(x,y,"学习上限"+GmMe.me.rbs.iGovSkill[i], 0xffffffff, 25, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_nicon.DrawAnima_aa(offx, offy, GmPlay.de_skill.strValue(GameData.iGovSkillId[this.iSelectPoint], 0, 6),0);
			this.pm3f.DrawTextEx(offx+90,offy+25, GmPlay.de_skill.strValue(GameData.iGovSkillId[this.iSelectPoint], 0, 6), 0xff003e57, 40, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(offx+90,offy+80, "等级："+GmMe.me.rbs.iGovSkill[this.iSelectPoint]+"/"+MyGov.mg.iGovSkillLev[this.iSelectPoint], 0xff003e57, 30, 101, 1, 1, 0, 0, -3);
			offy+=90;
			FormatString.gi().FormatEx("#c003e57"+GmPlay.de_skill.strValue(GameData.iGovSkillId[this.iSelectPoint], 0, 3), w-40, 30, 0, 0, 32);
			FormatString.gi().Draw(offx, offy);
			offy+=FormatString.gi().iH+8;

			if(parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/6)<=GmMe.me.rbs.iExp)this.pm3f.DrawTextEx(offx,offy, "升级经验："+parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/6)+"/"+GmMe.me.rbs.iExp, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			else this.pm3f.DrawTextEx(offx,offy, "升级经验："+parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/6)+"/"+GmMe.me.rbs.iExp, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			offy+=35;
			if(parseInt(GameData.iUpgradeMoney[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/18)<=GmMe.me.rbs.iMoney)this.pm3f.DrawTextEx(offx,offy, "升级金钱:"+parseInt(GameData.iUpgradeMoney[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/18)+"/"+GmMe.me.rbs.iMoney, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			else this.pm3f.DrawTextEx(offx,offy, "升级金钱:"+parseInt(GameData.iUpgradeMoney[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/18)+"/"+GmMe.me.rbs.iMoney, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			offy+=35;
			if((GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)*5<=MyGov.mg.iTick)this.pm3f.DrawTextEx(offx,offy, "升级贡献:"+(GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)*5+"/"+MyGov.mg.iTick, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			else this.pm3f.DrawTextEx(offx,offy, "升级贡献:"+(GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)*5+"/"+MyGov.mg.iTick, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			offy+=35;
			if((GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)<=MyGov.mg.iGovTick)this.pm3f.DrawTextEx(offx,offy, "升级行动力:"+(GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)+"/"+MyGov.mg.iGovTick, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			else this.pm3f.DrawTextEx(offx,offy, "升级行动力:"+(GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)+"/"+MyGov.mg.iGovTick, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			offy+=35;
			this.pm3f.DrawTextEx(offx,offy, "绑铜："+GmMe.me.rbs.iReserve, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);

			this.btn_learn.Move(this.iX+this.iW-110-25-20, this.iY+this.iH-52-25-20, 110, 52);
			this.btn_learn.Draw();
		}
		//+GmMe.me.rbs.iGovSkill[i]+"/"+MyGov.mg.iGovSkillLev[i]
	}
	ProcTouch( msg, x, y)
	{
		var i;
		var xx,yy;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		for(i=0;i<8;i++)
		{
			if(this.btn_select[i].ProcTouch(msg, x, y))
			{
				if(this.btn_select[i].bCheck())
				{
					this.iSelectPoint=i;
				}
			}
		}

		if(this.iSelectPoint>=0)
		{
			if(this.btn_learn.ProcTouch(msg, x, y))
			{
				if(this.btn_learn.bCheck())
				{
					if(GmMe.me.rbs.iGovSkill[this.iSelectPoint]>=MyGov.mg.iGovSkillLev[this.iSelectPoint])
					{
						EasyMessage.easymsg.AddMessage("已达学习上限");
					}
					else if(GmMe.me.rbs.iGovSkill[this.iSelectPoint]>=GmMe.me.rbs.iLev+10)
					{
						EasyMessage.easymsg.AddMessage("不能超过人物等级10级");
					}
					else if(parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/6)>GmMe.me.rbs.iExp)
					{
						EasyMessage.easymsg.AddMessage("经验不足");
					}
					else if(parseInt(GameData.iUpgradeMoney[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/18)>GmMe.me.rbs.iMoney)
					{
						EasyMessage.easymsg.AddMessage("金钱不足");
					}
					else if((GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)*5>MyGov.mg.iTick)
					{
						EasyMessage.easymsg.AddMessage("帮派贡献不足");
					}
					else if((GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)>MyGov.mg.iGovTick)
					{
						EasyMessage.easymsg.AddMessage("帮派行动力不足");
					}
					else
					{
						GmProtocol.gi().s_LearnGovSkill(GameData.iGovSkillId[this.iSelectPoint], this.iSelectPoint);
						GmMe.me.rbs.iExp-=parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/6);
						GmMe.me.rbs.iMoney-=parseInt(GameData.iUpgradeExp[GmMe.me.rbs.iGovSkill[this.iSelectPoint]]/18);
						MyGov.mg.iTick-=(GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1)*5;
						MyGov.mg.iGovTick-=(GmMe.me.rbs.iGovSkill[this.iSelectPoint]+1);
						
						GmMe.me.rbs.iGovSkill[this.iSelectPoint]++;
						GmMe.me.CalcFightAtt();
					}
				}
			}
		}
		return false;
	}
}
