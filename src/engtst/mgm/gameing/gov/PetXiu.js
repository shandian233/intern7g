
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

import MyGov from "./MyGov"

export default class PetXiu extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=540;
		this.iH=350;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.iDelay=0;
		this.btn_xiu=new XButtonEx2(GmPlay.xani_button);
		this.btn_xiu.InitButton("1号按钮90_60");
		this.btn_xiu.sName="修炼";
		
		this.iXiuPoint=0;
	}
	
	Draw()
	{
		var i;
		var x,y;
		var lev;
		var c;
		
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.btn_close.Draw();
		
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+30, "宠物修炼", 0xfffeec7e, 36, 101, 1, 1, 0, -2, 0, 2, 0xff01152e);
		DrawMode.frame_type4("11号框20_20", this.iX+20, this.iY+70, this.iW-40, 150, 20, 20);
		
		for(i=0;i<4;i++)
		{
			x=this.iX+30;
			y=this.iY+65+20+i*30;
			c=0xff114e61;
			
			if(this.iXiuPoint==i)
			{
				DrawMode.frame_type1("12号框20_30", x,y, this.iW-60, 20);

				if(this.iDelay>0)
				{
					this.iDelay--;
					this.btn_xiu.bDisable=true;
				}
				else this.btn_xiu.bDisable=false;

			}
			
			lev=GmMe.me.rbs.iGovXiu[i+6][0];
			this.pm3f.DrawTextEx(x+10, y+15, ""+GmPlay.de_skill.strValue(GameData.iGovXiuId[i+6], 0, 6)+lev+"级", c, 20, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(this.iX+this.iW-40, y+15, ""+GmMe.me.rbs.iGovXiu[i+6][1]+"/"+MyGov.iBuildingUpgrad[lev]/10, c, 20, 101, 1, 1, 0, -3, -2);
		}
		
		this.btn_xiu.Move(this.iX+this.iW-20-90, this.iY+this.iH-20-60, 90, 60);
		this.btn_xiu.Draw();
		
		DrawMode.frame_type4("11号框20_20", this.iX+20, this.iY+70+150+20, this.iW-40-90-20, 90, 20, 20);
//		DrawMode.Frame1_BR(this.iX+30, this.iY+270-30, this.iW-60, 40+30);
		this.pm3f.DrawTextEx(this.iX+40, this.iY+260, "当前拥有修炼积分:"+GmMe.me.iFlag[13], 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(this.iX+40, this.iY+290, "每次修炼花费10点修炼积分", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
	}

	ProcTouch( msg, x, y)
	{
		var i;
		var lev;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		for(i=0;i<4;i++)
		{
			var xx=this.iX+30;
			var yy=this.iY+65+20+i*30;
			if(XDefine.bInRect(x, y, xx, yy, this.iW-60, 30))
			{
				this.iXiuPoint=i;
			}
		}
		if(this.iXiuPoint>=0 && this.iXiuPoint<4 && this.iDelay<=0)
		{
			i=this.iXiuPoint;
			if(this.btn_xiu.ProcTouch(msg, x, y))
			{
				if(this.btn_xiu.bCheck())
				{
					lev=GmMe.me.rbs.iGovXiu[i+6][0];
					if(lev>=GmMe.me.rbs.iLev/5)
					{
						EasyMessage.easymsg.AddMessage("修炼不能超过人物等级/5");
					}
					else if(GmMe.me.iFlag[13]<10)
					{
						EasyMessage.easymsg.AddMessage("宠修积分不足");
					}
					else
					{
//						this.iDelay=20;
						GmMe.me.iFlag[13]-=10;
						
						GmMe.me.rbs.iGovXiu[i+6][1]+=10;
						if(GmMe.me.rbs.iGovXiu[i+6][1]>=MyGov.iBuildingUpgrad[lev]/10)
						{
							GmMe.me.rbs.iGovXiu[i+6][0]++;
							GmMe.me.rbs.iGovXiu[i+6][1]-=MyGov.iBuildingUpgrad[lev]/10;
						}
						GmProtocol.gi().s_GovXiu(GameData.iGovXiuId[i+6],i+6);
					}
				}
			}
		}
		return false;
	}
}
