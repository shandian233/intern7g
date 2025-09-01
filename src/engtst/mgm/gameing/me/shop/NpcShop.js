
import PackageTools from "../../../../../engine/PackageTools"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"

export default class NpcShop {
	
	constructor()
	{
		var i;
		this.price=new Int32Array(20);//
		this.goods=new Array(20);//
		
		for(i=0;i<20;i++){
			this.goods[i]=new Goods();
		}
	}
	
	Open()
	{
		if(XStat.gi().iXStat!=XStat.GS_SHOPFRAME)XStat.gi().PushStat(XStat.GS_SHOPFRAME);
	}
	
	Draw()
	{
		console.log('商店')
	}
	ProcTouch()
	{
		return false;
	}
	FreshGoods( pls)
	{//刷新商店物品
		var i,j,k,m;
		j=0;
		this.iShopId=pls.GetNextInt();
		this.sShopName=pls.GetNextString();
		for(i=0;i<20;i++)this.goods[i].iGid=-1;
		while(true)
		{
			i=pls.GetNextInt();
			if(i==-1)break;
			this.goods[j].iGid=10;
			this.goods[j].iTid=i;
			this.goods[j].iCount=pls.GetNextInt();
			this.goods[j].iPos=j;
			this.price[j]=pls.GetNextInt();
			this.goods[j].iAtts[0]=pls.GetNextInt();
			GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(i, 0, 10), this.goods[j].aa);
			
			k=GmPlay.de_goods.intValue(i,0,16);
			if(k>=0)
			{//是否为装备，是的话根据等级，设置a5耐久度
				k=GmPlay.de_goods.intValue(i,0,9);
				if(k>=0 && k<=100)
				{//得到等级j
					m=100+k*5;
					this.goods[j].iAtts[5]=m*100000+m*20;//上限和当前
				}
			}
			
			j++;
		}
		this.iSGCount=j;
		this.iUseType=pls.GetNextInt();
		NpcShop._USETYPE=pls.GetNextString();
		if(this.iUseType>=0 && this.iUseType<=5)this.Open();
	}
}
NpcShop._USETYPE;
NpcShop.ns=new NpcShop();