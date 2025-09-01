
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
export default class GovXiu extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=560;
		this.iH=500;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		var i;
		this.iDelay=new Int32Array(6);//
		this.btn_xiu=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.iDelay[i]=0;
			this.btn_xiu[i]=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_xiu[i].InitButton("内框按钮");
			this.btn_xiu[i].sName="修炼";
		}
	}
	
	Draw()
	{
		var i;
		var x,y;
		var offx,offy,w,h;
		var lev;
		
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "修","炼");
		this.btn_close.Draw();
		
		offx=this.iX+25;
		offy=this.iY+25;
		w=this.iW-50;
		h=this.iH-50-70;
		DrawMode.new_framein(offx, offy, w, h);
		
		for(i=0;i<6;i++)
		{
			x=offx+10;
			y=offy+i*60+10;
			DrawMode.new_frameon(x, y, w-20, 60, 0);
			
			lev=GmMe.me.rbs.iGovXiu[i][0];
			this.pm3f.DrawTextEx(x+10, y+30, GmPlay.de_skill.strValue(GameData.iGovXiuId[i], 0, 6)+lev+"级", 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(x+w-20-180, y+30, ""+GmMe.me.rbs.iGovXiu[i][1]+"/"+MyGov.iBuildingUpgrad[lev]/10, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);

			this.btn_xiu[i].Move(x+w-20-2-98, y+(60-55)/2, 98, 55);
			if(this.iDelay[i]>0)
			{
				this.iDelay[i]--;
				this.btn_xiu[i].bDisable=true;
			}
			else
			{
				this.btn_xiu[i].bDisable=false;
			}

			this.btn_xiu[i].Draw();
		}
		this.pm3f.DrawTextEx(this.iX+25, this.iY+this.iH-25-60, "每次修炼花费30000金钱和5点帮贡，并消耗5点帮派行动力", 0xff003e57, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(this.iX+25, this.iY+this.iH-25-30, "如果背包中有修炼丹，优先消耗修炼丹", 0xff003e57, 20, 101, 1, 1, 0, 0, 0);
	}

	ProcTouch( msg, x, y)
	{
		var i,j;
		var lev;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		for(i=0;i<6;i++)
		{
			if(this.btn_xiu[i].ProcTouch(msg, x, y))
			{
				if(this.btn_xiu[i].bCheck())
				{
					lev=GmMe.me.rbs.iGovXiu[i][0];
					if(lev>=GmMe.me.rbs.iLev/5)
					{
						EasyMessage.easymsg.AddMessage("修炼不能超过人物等级/5");
					}
					else if(MyGov.mg.iTick<5)
					{
						EasyMessage.easymsg.AddMessage("帮贡不足");
					}
					else if(MyGov.mg.iGovTick<5)
					{
						EasyMessage.easymsg.AddMessage("帮派行动力不足");
					}
					else if(GmMe.me.rbs.iMoney+GmMe.me.rbs.iReserve<30000)
					{
						EasyMessage.easymsg.AddMessage("金钱不足");
					}
					else
					{
						this.iDelay[i]=20;
						if(GmMe.me.rbs.iReserve>=30000)
						{
							GmMe.me.rbs.iReserve-=30000;
						}
						else
						{
							j=30000-GmMe.me.rbs.iReserve;
							GmMe.me.rbs.iReserve=0;
							GmMe.me.rbs.iMoney-=j;
						}
//						GmMe.me.rbs.iMoney-=30000;
						MyGov.mg.iGovTick-=5;
						MyGov.mg.iTick-=5;
						
						GmMe.me.rbs.iGovXiu[i][1]+=10;
						if(GmMe.me.rbs.iGovXiu[i][1]>=MyGov.iBuildingUpgrad[lev]/10)
						{
							GmMe.me.rbs.iGovXiu[i][0]++;
							GmMe.me.rbs.iGovXiu[i][1]-=MyGov.iBuildingUpgrad[lev]/10;
						}
						GmProtocol.gi().s_GovXiu(GameData.iGovXiuId[i],i);
					}
				}
			}
		}
		return false;
	}
}
