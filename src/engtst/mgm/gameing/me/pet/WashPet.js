
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"

export default class WashPet extends BaseClass{
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=200;
		this.iH=MyPets.mp.iPetCount*24+40+50;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_selectpet=new XButton(GmPlay.xani_ui);
		this.btn_selectpet.InitButton("统一中按钮2");
		this.btn_selectpet.sName="选择";
		this.btn_selectpet.Move(this.iX+this.iW-70-20, this.iY+this.iH-40-20, 70, 40);
		
		this.iSelectPoint=-1;
	}


	
	Draw()
	{
		var i,offx,offy;
		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
		
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			offx=this.iX+20;
			offy=this.iY+20+i*24;
			if(this.iSelectPoint==i)
			{
				this.pm3f.FillRect_2D(offx,offy, offx+(this.iW-40), offy+24, 0xff0000ff);
				this.pm3f.DrawTextEx(offx,offy+12, MyPets.mp.pets[i].sName, 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
			}
			else this.pm3f.DrawTextEx(offx,offy+12, MyPets.mp.pets[i].sName, 0xff000000, 20, 101, 1, 1, 0, 0, -2);
		}
		if(this.iSelectPoint>=0)this.btn_selectpet.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			if(XDefine.bInRect(x, y, this.iX+20, this.iY+20+i*24, this.iW-40, 24))
			{
				this.iSelectPoint=i;
			}
		}
		if(this.iSelectPoint>=0)
		{
			if(this.btn_selectpet.ProcTouch(msg, x, y))
			{
				if(this.btn_selectpet.bCheck())
				{
					GmProtocol.gi().s_WashPet(MyPets.mp.pets[this.iSelectPoint].iPid, this.lockgoods.iGid);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}

}
WashPet.Open=function( g)
{
	XStat.gi().PushStat(XStat.GS_WASHPET);
	((XStat.gi().LastStat(0))).lockgoods=g;
}