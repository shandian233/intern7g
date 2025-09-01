
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import PackageTools from "../../../../../engine/PackageTools"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"

export default class TmpGoods {

	constructor()
	{
		TmpGoods.iTmpGoodsCount=0;
	}
	

}
TmpGoods.iTmpGoodsCount=0;
TmpGoods.iDelay=0;

TmpGoods.tgs=new TmpGoods();

TmpGoods.getgoods=function( pls)
{
	TmpGoods.iTmpGoodsCount=pls.GetNextByte();
}

TmpGoods.Draw=function()
{
	if(TmpGoods.iTmpGoodsCount<=0)return;
	var x,y;
	x=GmConfig.SCRW/2;
	y=GmConfig.SCRH*2/3;
	if(parseInt(TmpGoods.iDelay/3)%2==0)
	{
		x+=2;
		y+=2;
	}
	GmPlay.xani_ui.DrawAnima(x,y,"物品格",0);
//		if(TmpGoods.iDelay/2%2==0)GmPlay.xani_goods.DrawAnima(x, y, "物品锁定框", 1);
	M3DFast.gi().DrawTextEx(x+30, y+30-15, "临时", 0xff000000, 20, 101, 1, 1, 0, -2, -2);
	M3DFast.gi().DrawTextEx(x+30, y+30+15, "("+TmpGoods.iTmpGoodsCount+")", 0xff000000, 20, 101, 1, 1, 0, -2, -2);
	TmpGoods.iDelay++;
}
TmpGoods.ProcTouch=function( msg, x, y)
{
	var xx,yy;
	xx=GmConfig.SCRW/2;
	yy=GmConfig.SCRH*2/3;
	if(TmpGoods.iTmpGoodsCount<=0)return false;
	if(XDefine.bInRect(x, y, xx, yy, 60, 60))
	{
		if(msg==3)
		{
			TmpGoods.iTmpGoodsCount=0;
			GmProtocol.gi().s_SeverEvent(4, 0, 0, 0, 0);
		}
		return true;
	}
	return false;
}