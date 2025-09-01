
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
import UIList from "../../../../engtst/mgm/frame/UIList"

import GmMe from "./GmMe"

export default class SetTitle extends BaseClass{

	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=240+50;
		this.iH = 40 * 8 + 50 +60 + 10;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_set=new XButtonEx2(GmPlay.xani_button);
		this.btn_set.InitButton("1号按钮90_60");
		this.btn_set.Move(this.iX + this.iW - 90 - 25, this.iY + this.iH - 60 - 25, 90, 60);
		this.btn_set.sName="设置";
		
		this.btn_shadow=new XButtonEx2(GmPlay.xani_button);
		this.btn_shadow.InitButton("1号按钮90_60");
		this.btn_shadow.Move(this.iX + 25, this.iY + this.iH - 60 - 25, 90, 60);
		this.btn_shadow.sName="隐藏";
		
		this.sTitles=new Array(64);//
		this.iCount=0;
		this.bNoTitile=false;
		
		this.list_titles=new UIList(0,1,this.iW-50,this.iH-50-60-10);
		this.list_titles.SetTitle(0, "", this.iW-50, false);
		this.list_titles.iTitleHeight=0;
	}

	getlist( pls)
	{
		var i;
		pls.GetNextByte();//type
		this.iCount=pls.GetNextByte();
		for(i=0;i<this.iCount;i++)
		{
			this.sTitles[i]=pls.GetNextString();
		}
		if(this.iCount==0)this.bNoTitile=true;
	}
	Draw()
	{
		var i;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
//		DrawMode.frame_type4("11号框20_20", this.iX+25, this.iY+25, this.iW-50, this.iH-50-70, 20, 20);
		if(this.bNoTitile)M3DFast.gi().DrawTextEx(this.iX+45, this.iY+45+5, "没有可用称谓", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		else
		{
			this.list_titles.BeginDraw(this.iX+25, this.iY+25);
			for(i=0;i<this.iCount;i++)
			{
				this.list_titles.DrawUnit(0, i, this.sTitles[i]);
			}
			this.list_titles.FinishDraw();
		}
		this.btn_set.Draw();
		this.btn_shadow.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(!this.bNoTitile)
		{
			this.list_titles.ProcTouch(msg, x, y);
		}
		if(this.btn_shadow.ProcTouch(msg, x, y))
		{
			if(this.btn_shadow.bCheck())
			{
				GmMe.me.rbs.sTitle="";
				GmProtocol.gi().s_proctitle(99, "");
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_set.ProcTouch(msg, x, y))
		{
			if(this.btn_set.bCheck())
			{
				if(this.list_titles.iLockPoint>=0 && this.list_titles.iLockPoint<this.iCount)
				{
					GmMe.me.rbs.sTitle=this.sTitles[this.list_titles.iLockPoint];
					GmProtocol.gi().s_proctitle(this.list_titles.iLockPoint, this.sTitles[this.list_titles.iLockPoint]);
					XStat.gi().PopStat(1);
				}
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}
