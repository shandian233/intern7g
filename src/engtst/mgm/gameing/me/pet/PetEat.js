
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"

export default class PetEat extends BaseClass{

	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=430+60;
		this.iH=30+30+20+345+5+52+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_learn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_learn.InitButton("按钮1_110");
		this.btn_learn.sName="食用";
		this.btn_learn.Move(this.iX+this.iW-110-30, this.iY+this.iH-52-30, 110, 52);
		
		this.lockgoods=null;
	}

	Draw()
	{//430
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30, "选择仙露，仙桃，丹药或烹饪", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30+30+15, MyGoods.gi().goods[2], null, null);
		
//		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+this.iH-40-30, "宠物:"+this.lpet.sName+"("+GmPlay.de_pet.strValue(this.lpet.iTid, 0, 1)+")", 0xff000000, 20, 101, 1, 1, 0, 0, 0);

		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iX+30, this.iY+30+30+15, MyGoods.gi().goods[2], this.lockgoods, 0);
			
//			if(this.lockgoods.iTid==154 || this.lockgoods.iTid==155 || this.lockgoods.iTid==156)
			{
//				M3DFast.gi().DrawTextEx(this.iX+20, this.iY+this.iH-40,"食用:"+GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4), 0xff000000, 20, 101, 1, 1, 0, 0, 0);
				this.btn_learn.Draw();
			}
//			else M3DFast.gi().DrawTextEx(this.iX+20, this.iY+this.iH-40, "选择烹饪或药品", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		}
//		else M3DFast.gi().DrawTextEx(this.iX+20, this.iY+this.iH-40, "选择烹饪或药品", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+this.iH-30-52/2, "选择烹饪或药品", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.lockgoods!=null)
		{
//			if(this.lockgoods.iTid==154 || this.lockgoods.iTid==155 || this.lockgoods.iTid==156)
			{
				if(this.btn_learn.ProcTouch(msg, x, y))
				{
					if(this.btn_learn.bCheck())
					{
						GmProtocol.gi().s_LearnPetSkill(this.lpet.iPid, this.lockgoods.iGid);
						XStat.gi().PopStat(1);
					}
					return true;
				}
			}
		}
		this.lockgoods=GoodsDraw.new_LockGoods(x, y, this.iX+30, this.iY+30+30+15, MyGoods.gi().goods[2], msg);
		GoodsDraw.NoMove();
//		if(this.lockgoods.iTid==154 || this.lockgoods.iTid==155 || this.lockgoods.iTid==156);
//		else
		{
//			this.lockgoods=null;
		}
		
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}

}
PetEat.Open=function( p)
{
	XStat.gi().PushStat(XStat.GS_PETEAT);
	((XStat.gi().LastStat(0))).lpet=p;
}