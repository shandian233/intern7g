
import GmConfig from "../../../../../config/GmConfig"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../engtst/mgm/frame/UIList"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"

export default class shop_PeakFight extends BaseClass{
	
	constructor( ani)
	{
		super();
		var i;
		
		this.goods=new Array(20);//
		this.iPrice=new Int32Array(20);//
		for(i=0;i<20;i++)
		{
			this.goods[i]=new Goods();
			this.iPrice[i]=0;
		}

		this.iW=800;
		this.iH=450;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
//		list_goods=new UIList(0,2,this.iW-100,50+40*7);
//		list_goods.SetTitle(0, "类型", 200,false);
//		list_goods.SetTitle(1, "价格", 200,true);
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_buy=new XButtonEx2(GmPlay.xani_button);
		this.btn_buy.InitButton("普通按钮140_55");
		this.btn_buy.sName="购买";
		
		this.lockgoods=null;
	}

	_open( pls)
	{
		this.iCount=pls.GetNextInt();
		if(this.iCount>20)this.iCount=20;
		for(var i=0;i<20;i++)
		{//名称，价格
			if(i<this.iCount)
			{
				this.goods[i].iTid=pls.GetNextInt();
				this.goods[i].iGid=1;
				this.goods[i].iCount=1;
				this.iPrice[i]=pls.GetNextInt();
				GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(this.goods[i].iTid, 0, 10), this.goods[i].aa);
			}
			else
			{
				this.goods[i].iGid=-1;
				this.iPrice[i]=0;
			}
			this.goods[i].iPos=i;
		}
	}
	Draw()
	{
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW,this.iH,"积","分","商","店");
		this.btn_close.Draw();
		
		DrawMode.new_framein(this.iX+30, this.iY+30, this.iW-60, this.iH-60);
		
		GoodsDraw.new_DrawGoods(this.iX+50, this.iY+50, this.goods, null, null);
		
		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iX+50, this.iY+50, this.goods,this.lockgoods, 0);
			M3DFast.gi().DrawTextEx(this.iX+430+50+15, this.iY+90+50*0, "名称 "+GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4), 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(this.iX+430+50+15, this.iY+90+50*1, "价格 "+this.iPrice[this.lockgoods.iPos]+"积分", 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
		}
//		list_goods.BeginDraw(this.iX+30+20, this.iY+30+20);
//		for(i=0;i<this.iCount;i++)
//		{
//			list_goods.DrawUnit(0, i, bls[i].sName);
//			list_goods.DrawUnit(1, i, bls[i].iPrice+"活动积分");
//		}
//		list_goods.FinishDraw();
		
		M3DFast.gi().DrawTextEx(this.iX+430+50+15, this.iY+90+50*3, "可用积分："+GmMe.me.iFlagExt[23], 0xffffff00, 25, 101, 1, 1, 0, 0, -2);
		this.btn_buy.Move(this.iX+this.iW-30-20-140, this.iY+this.iH-30-20-55, 140, 55);
		this.btn_buy.Draw();
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_buy.ProcTouch(msg, x, y))
		{
			if(this.btn_buy.bCheck())
			{
				if(this.lockgoods==null)EasyMessage.easymsg.AddMessage("请先选中物品");
				else if(GmMe.me.iFlagExt[23]<this.iPrice[this.lockgoods.iPos])EasyMessage.easymsg.AddMessage("积分不足");
				else GmProtocol.gi().s_SeverEvent(35, 1, this.lockgoods.iPos, this.lockgoods.iTid,this.iPrice[this.lockgoods.iPos]);
			}
			return true;
		}

		var g;
		g=GoodsDraw.new_LockGoods(x,y,this.iX+50, this.iY+50, this.goods,msg);
		GoodsDraw.NoMove();
		if(msg==3 && g!=null)
		{//点击物品，选中准备购买
			this.lockgoods=g;
		}
		else if(g==null)this.lockgoods=null;

//		if(list_goods.ProcTouch(msg, x, y))return true;

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}
shop_PeakFight.Open=function( pls)
{
	var spf=XStat.gi().FindStat(XStat.GS_PEAKFIGHTSHOP);
	if(spf==null)spf=XStat.gi().PushStat(XStat.GS_PEAKFIGHTSHOP);
	spf._open(pls);
}