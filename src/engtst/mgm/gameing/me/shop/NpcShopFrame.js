
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import TouchManager from "../../../../../engine/TouchManager"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import NpcShop from "./NpcShop"

export default class NpcShopFrame extends BaseClass{
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=730;
		this.iH=345+60;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.lockgoods=null;

		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_buy=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_buy.InitButton("按钮1_110");
		this.btn_buy.sName="购买";
		this.btn_buy.Move(this.iX+this.iW-110-30,this.iY+this.iH-52-30,110,52);
		
		this.in_count=new XInputNumber(GmPlay.xani_nui3);
		this.in_count.iNumber=1;

		this.cityshop=[3,1,4,2,5,9,6,10,7,11];
	}

	Draw()
	{
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		this.btn_close.Draw();
		
		this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+35, NpcShop.ns.sShopName, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30, NpcShop.ns.goods, null, null);
		
		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iX+30, this.iY+30, NpcShop.ns.goods,this.lockgoods, 0);
			this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+90+30*0, "名称 "+GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4), 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+90+30*1, "单价 "+NpcShop.ns.price[this.lockgoods.iPos]+NpcShop._USETYPE, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			
			this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+80+30*3, "数量 ", 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			this.in_count.Move(this.iX+430+30+15+60, this.iY+80+30*3+25/2-52/2, 100);
			this.in_count.Draw();
			
			this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+70+30*5, "总价 "+NpcShop.ns.price[this.lockgoods.iPos]*this.in_count.iNumber+NpcShop._USETYPE, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			if(NpcShop.ns.iUseType==0)
			{
				this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+70+30*6, "铜币 "+GmMe.me.rbs.iMoney, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
				if(GmMe.me.rbs.iLev<40 && this.bCityShop(NpcShop.ns.iShopId))this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+70+30*7, "储备 "+GmMe.me.rbs.iReserve, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			}
			else if(NpcShop.ns.iUseType==1)this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+70+30*6, "现有 "+(GmMe.me.iFlag[48]/1000)+NpcShop._USETYPE, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			else if(NpcShop.ns.iUseType==2)this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+70+30*6, "现有 "+GmMe.me.rbs.iInGot+NpcShop._USETYPE, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
		}
		this.btn_buy.Draw();
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	
	 bCityShop( sid)
	{
		for(var i=0;i<this.cityshop.length;i++)
		{
			if(this.cityshop[i]==sid)return true;
		}
		return false;
	}
	ProcTouch( msg, x, y)
	{
		if(this.lockgoods!=null)
		{
			if(this.in_count.ProcTouch(msg, x, y))
			{
				return true;
			}
			if(this.btn_buy.ProcTouch(msg, x, y))
			{
				if(this.btn_buy.bCheck())
				{
					if(this.in_count.iNumber<=0)EasyMessage.easymsg.AddMessage("购买数量不能为0");
					else if(this.in_count.iNumber>this.lockgoods.iCount)EasyMessage.easymsg.AddMessage("购买数量超过上限");
					else if(NpcShop.ns.iUseType==0)
					{
						var i=GmMe.me.rbs.iMoney;
						
						if(GmMe.me.rbs.iLev<40 && this.bCityShop(NpcShop.ns.iShopId))
						{//部分商店40级以下可用绑铜代替铜币
							i+=GmMe.me.rbs.iReserve;
						}
						if(i<NpcShop.ns.price[this.lockgoods.iPos]*this.in_count.iNumber)EasyMessage.easymsg.AddMessage("铜币不足");
						else GmProtocol.gi().s_NpcShopBuy(NpcShop.ns.iShopId, this.lockgoods.iTid, this.in_count.iNumber);
					}
					else GmProtocol.gi().s_NpcShopBuy(NpcShop.ns.iShopId, this.lockgoods.iTid, this.in_count.iNumber);
				}
				return true;
			}
		}

		var g;
		g=GoodsDraw.new_LockGoods(x,y,this.iX+30, this.iY+30, NpcShop.ns.goods,msg);
		GoodsDraw.NoMove();
		if(msg==3 && g!=null)
		{//点击物品，选中准备购买
			this._lockgoods(g);
//			if(iNeedCount==0)iNeedCount=1;
//			else if(iNeedCount==1)iNeedCount=10;
//			else if(iNeedCount==10)iNeedCount=this.lockgoods.iCount;
//			if(iNeedCount>this.lockgoods.iCount)iNeedCount=this.lockgoods.iCount;
		}
		else if(g==null)this.lockgoods=null;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
	_lockgoods( g)
	{
		if(g!=this.lockgoods)this.in_count.iNumber=1;
		this.lockgoods=g;
		var i=GmMe.me.rbs.iMoney/NpcShop.ns.price[this.lockgoods.iPos];
		if(i<1)i=1;
		if(i>this.lockgoods.iCount)i=this.lockgoods.iCount;
		this.in_count.MinMax(1, i);
	}
}
