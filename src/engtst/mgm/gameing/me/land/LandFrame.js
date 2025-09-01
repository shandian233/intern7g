
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"

import MyLand from "./MyLand"
import SelectLS from "./SelectLS"

export default class LandFrame extends BaseClass{
	constructor( a)
	{
		super();
		var i;
		this.iW=490;
		this.iH=410;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_give=new Array(5);
		for(i=0;i<5;i++)
		{
			this.btn_give[i]=new XButton(GmPlay.xani_ui3);
			this.btn_give[i].bSingleButton=true;
//			this.btn_give[i].InitButton("统一按钮1");
//			this.btn_give[i].Move(this.iX+220, this.iY+20+215, 117, 40);
//			this.btn_give[i].sName="使用灵石";
		}
		this.iWx=new Int32Array(5);
	}

	Draw()
	{
		var i;
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		//植物名称
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20, "土地类型:"+MyLand.sLandName[this.iType], 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+40, "风水等级:"+this.iLev, 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+80, "风水经验:"+this.iExp, 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+120, "五行总灵气:"+(this.iWx[0]+this.iWx[1]+this.iWx[2]+this.iWx[3]+this.iWx[4])+"/"+(100+this.iExp), 0xff114e61, 30, 101, 1, 1, 0, 0, 0);

		//五行
		for(i=0;i<5;i++)
		{
//			GmPlay.xani_ui4.DrawAnimaEx(this.iX+40+i*90, this.iY+140, GameData.sWuXing[i]+"水晶",0,51+this.iWx[i]/2,1,1,0,0,0);
			GmPlay.xani_ui4.DrawAnimaEx(this.iX+40+i*90, this.iY+180, GameData.sWuXing[i]+"水晶",0,101,1,1,0,0,0);
			M3DFast.gi().DrawTextEx(this.iX+40+i*90+25, this.iY+180+160+25, this.iWx[i]+"/100", 0xff114e61, 20, 101, 1, 1, 0, -2, 0);
			M3DFast.gi().DrawTextEx(this.iX+40+i*90+25, this.iY+180+160,GameData.sWuXing[i], 0xff114e61, 20, 101, 1, 1, 0, -2, 0);
			
			this.btn_give[i].Move(this.iX+40+i*90-10, this.iY+180,50+20, 160);
//			this.btn_give[i].Draw();
		}
		//上交灵石
	}
	
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<5;i++)
		{
			if(this.btn_give[i].ProcTouch(msg, x, y))
			{
				if(this.btn_give[i].bCheck())
				{
//					SelectLS.Open("使用"+GameData.sWXS[i]+"灵石提高灵气","使用"+GameData.sWXK[i]+"灵石降低灵气");
					SelectLS.Open(GameData.sWXS[i]+"生"+GameData.sWuXing[i]+"(选择"+GameData.sWXS[i]+"灵石)",GameData.sWXK[i]+"克"+GameData.sWuXing[i]+"(选择"+GameData.sWXK[i]+"灵石)",i);
				}
				return true;
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX,this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
			return true;
		}
		return false;
	}
}
LandFrame.Open=function( pls)
{
	var lf;
	if(XStat.gi().iXStat==XStat.GS_LANDFRAME)lf=XStat.gi().LastStat(0);
	else lf=XStat.gi().PushStat(XStat.GS_LANDFRAME);
	lf.iLid=pls.GetNextInt();
	lf.iType=pls.GetNextInt();
	lf.iLev=pls.GetNextInt();
	lf.iExp=pls.GetNextInt();
	lf.iWx[0]=pls.GetNextInt();
	lf.iWx[1]=pls.GetNextInt();
	lf.iWx[2]=pls.GetNextInt();
	lf.iWx[3]=pls.GetNextInt();
	lf.iWx[4]=pls.GetNextInt();
}