
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
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"

export default class SelectLS extends BaseClass{


	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=430+60;
		this.iH=345+60+15+52;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_sel=new XButton(GmPlay.xani_nui2);
		this.btn_sel.InitButton("按钮1_110");
		this.btn_sel.sName="选择";
		this.btn_sel.Move(this.iX+this.iW-110-30, this.iY+this.iH-55-30, 110, 52);
		
		this.lockgoods=null;
	}

	Draw()
	{
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30, MyGoods.gi().goods[2], null, null);
		
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+this.iH-30-52,SelectLS.s1, 0xff000000, 24, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+this.iH-30-26,SelectLS.s2, 0xff000000, 24, 101, 1, 1, 0, 0, 0);

		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iX+30, this.iY+30, MyGoods.gi().goods[2], this.lockgoods, 0);
			this.btn_sel.Draw();
		}
//		else M3DFast.gi().DrawTextEx(this.iX+20, this.iY+this.iH-40, "选择烹饪或药品", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		
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
				if(this.btn_sel.ProcTouch(msg, x, y))
				{
					if(this.btn_sel.bCheck())
					{//上交灵石
						GmProtocol.gi().s_LandOperate(0, SelectLS.iDest, this.lockgoods.iGid, 0);
//						PublicChat.AddGoods(this.lockgoods);
						XStat.gi().PopStat(1);
					}
					return true;
				}
			}
		}
		this.lockgoods=GoodsDraw.new_LockGoods(x, y, this.iX+30, this.iY+30, MyGoods.gi().goods[2], msg);
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
SelectLS.s1,SelectLS.s2;
SelectLS.iDest;
SelectLS.Open=function( sa, sb, d)
{
	XStat.gi().PushStat(XStat.GS_SELECTLS);
	SelectLS.s1=sa;
	SelectLS.s2=sb;
	SelectLS.iDest=d;
}