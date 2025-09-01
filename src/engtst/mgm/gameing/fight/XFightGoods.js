
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import TouchManager from "../../../../engine/TouchManager"
import XButton from "../../../../engine/control/XButton"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
import XFight from "./XFight"
export default class XFightGoods {
	
	XFightGoods()
	{
	}
	
	InitFightGoods()
	{
		this.bReturn=false;
		this.bSelectFinished=false;
		this.lockgoods=null;
//		GoodsDraw.lastlock=null;
	}
	DrawFightGoods()
	{//画当前背包中的物品，选择使用
		this.iW=430;
		this.iH=345;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=GmConfig.SCRH-this.iH-20;
//		DrawMode.Frame2_MD(this.iX, this.iY,this.iW,this.iH);
		GoodsDraw.new_DrawGoods(this.iX, this.iY, MyGoods.gi().goods[2], null, null);
		if(this.lockgoods!=null)GoodsDraw.new_DrawRect(this.iX, this.iY, MyGoods.gi().goods[2], this.lockgoods, 0);
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		var k;
		this.bFood=false;
		this.bUseToDest=false;
		this.lockgoods=GoodsDraw.new_LockGoods(x, y, this.iX, this.iY, MyGoods.gi().goods[2], msg);
		GoodsDraw.NoMove();
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{
			k=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 30);
			if(k==4)
			{//对敌人使用道具
				if(XFight.gi().iFightStat!=2)
				{
					EasyMessage.easymsg.AddMessage("宠物不能使用");
				}
				else
				{
					this.bUseToDest=true;
					this.bSelectFinished=true;
				}
			}
			else
			{
				k=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 26);
				if(k==1 || k==2)
				{//只能战斗，或战斗漫游都能用
					this.bSelectFinished=true;
				}
				else
				{
					k=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 34);
					if(k==2 || k==3)
					{//烹饪使用
						if(XFight.gi().iFightStat!=2)
						{
							EasyMessage.easymsg.AddMessage("宠物不能使用烹饪");
						}
						else
						{
							this.bFood=true;
							this.bSelectFinished=true;
						}
					}
					else
					{
						EasyMessage.easymsg.AddMessage("所选物品不能在战斗中使用");
					}
				}
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			this.bReturn=true;
		}
		return true;
	}
}

XFightGoods.xfg=new XFightGoods();