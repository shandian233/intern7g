
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import MyGov from "../../../../../engtst/mgm/gameing/gov/MyGov"
import EntrustMission from "../../../../../engtst/mgm/gameing/gov/ext/mission/EntrustMission"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import NpcShop from "../../../../../engtst/mgm/gameing/me/shop/NpcShop"

class _MYPRICE
{/*
	int iFlag;
	int iLable;
	int iMoney;
	int iIngot;
	int iGovTick;*/
	constructor()
	{
		this.Clear();
	}
	 Clear()
	{
		this.iMoney=0;
		this.iIngot=0;
		this.iGovTick=0;
	}
}

export default class NewShop extends BaseClass{
	_Open( pls)
	{
		var i,j,k;
		this.iShopId=pls.GetNextInt();
		this.sName=pls.GetNextString();
		for(i=0;i<20;i++)
		{
			this.goods[i].iGid=-1;
			this.goods[i].iTid=pls.GetNextInt();
			if(this.goods[i].iTid==0)continue;
			this.goods[i].iGid=1;
			this.goods[i].iCount=pls.GetNextByte();
			this.iOnceBuyCount[i]=pls.GetNextByte();
			k=pls.GetNextByte();
			for(j=0;j<8;j++)
			{
				if((k&(1<<j))!=0)this.goods[i].iAtts[j]=pls.GetNextInt();
			}
			GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(this.goods[i].iTid, 0, 10), this.goods[i].aa);
			
			k=pls.GetNextShort();
			this.price[i].iFlag=k;
			if((k&1)!=0)this.price[i].iMoney=pls.GetNextInt();
			if((k&2)!=0)this.price[i].iIngot=pls.GetNextInt();
			if((k&4)!=0)this.price[i].iGovTick=pls.GetNextInt();
			if((k&8)!=0)pls.GetNextInt();
			if((k&16)!=0)pls.GetNextInt();
			if((k&32)!=0)pls.GetNextInt();
			if((k&64)!=0)pls.GetNextInt();
			if((k&128)!=0)pls.GetNextInt();
			
			if((k&256)!=0)pls.GetNextInt();
			if((k&512)!=0)pls.GetNextInt();
			if((k&1024)!=0)pls.GetNextInt();
			if((k&2048)!=0)pls.GetNextInt();
			if((k&4096)!=0)pls.GetNextInt();
			if((k&8192)!=0)pls.GetNextInt();
			if((k&16384)!=0)pls.GetNextInt();
			if((k&32768)!=0)pls.GetNextInt();
			
			this.price[i].iLable=pls.GetNextByte();
		}
//		GmPlay.sop("zzzzz"+this.lockgoods);
		if(this.lockgoods!=null)
		{
//			GmPlay.sop("zzzzzzzz"+this.lockgoods.iGid);
			if(this.lockgoods.iGid<=0)
			{
				this.lockgoods=null;
				GoodsDraw.Reset();
			}
		}
	}
	 constructor( a)
	{
		super();
		var i;
		this.goods=new Array(20);//
		this.price=new Array(20);//
		this.iOnceBuyCount=new Int32Array(20);//

		for(i=0;i<20;i++){
			this.goods[i]=new Goods();
			this.goods[i].iPos=i;
			this.price[i]=new _MYPRICE();
		}
		
		this.pani=a;
		this.pm3f=a.pm3f;
		
		this.iW=710;
		this.iH=345+60;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.lockgoods = null;

		this.btn_close = new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_buy=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_buy.InitButton("按钮1_110");
		this.btn_buy.sName="购买";
		this.btn_buy.Move(this.iX+this.iW-110-30,this.iY+this.iH-52-30,110,52);
		
		this.in_count=new XInputNumber(GmPlay.xani_nui3);
		this.in_count.iNumber=1;
	}
	Draw()
	{
		var i,j;
		var x,y,offx,offy;
//		DrawMode.new_baseframe4(x, y, w, h, s1, s2, s3, s4)
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		this.btn_close.Draw();
		
		this.pm3f.DrawTextEx(this.iX+430+30+15, this.iY+35, this.sName, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30, this.goods, null, null);
		offx=this.iX+30+5;
		offy=this.iY+30+5;

		for(i=0;i<5;i++)
		{
			for(j=0;j<4;j++)
			{
				x=offx+i*85;
				y=offy+j*85;
				if(this.goods[j*5+i].iGid!=-1 && this.price[j*5+i].iLable>0)
				{//折扣标签
					GmPlay.xani_other.DrawAnima(x, y, "商店标签"+this.price[j*5+i].iLable,0);
				}
			}
		}
		
		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iX+30, this.iY+30, this.goods,this.lockgoods, 0);
			offx=this.iX+430+30+15;
			offy=this.iY+80;
			this.pm3f.DrawTextEx(offx,offy, "名称："+GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4), 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			offy+=30;
			this.pm3f.DrawTextEx(offx,offy, "单价：", 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			offy+=30;
			j=this.lockgoods.iPos;
			if((this.price[j].iFlag&1)!=0)
			{
				this.pm3f.DrawTextEx(offx+20,offy, "铜币："+this.price[j].iMoney, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
				offy+=30;
			}
			if((this.price[j].iFlag&2)!=0)
			{
				this.pm3f.DrawTextEx(offx+20,offy, "元宝："+this.price[j].iIngot, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
				offy+=30;
			}
			if((this.price[j].iFlag&4)!=0)
			{
				this.pm3f.DrawTextEx(offx+20,offy, "帮贡："+this.price[j].iGovTick, 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
				offy+=30;
			}

			this.pm3f.DrawTextEx(offx,offy, "数量：", 0xff003e57, 25, 101, 1, 1, 0, 0, 0);
			offy+=30;
			this.in_count.Move(offx+20,offy, 100);
			this.in_count.Draw();
		}
		if(this.btn_buy.bDisable)
		{
			this.iBuyDelay--;
			if(this.iBuyDelay<=0)this.btn_buy.bDisable=false;
		}
		this.btn_buy.Draw();
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
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
					i=this.lockgoods.iPos;
//					GmPlay.sop(""+MyGov.mg.iGovTick+",,,,,,,,,,,,,,"+this.price[i].iGovTick*this.in_count.iNumber);
					
					if(this.in_count.iNumber<=0)EasyMessage.easymsg.AddMessage("购买数量不能为0");
					else if(this.in_count.iNumber>this.iOnceBuyCount[i])EasyMessage.easymsg.AddMessage("购买数量超过单次可购买上限");
					else if(this.in_count.iNumber>this.lockgoods.iCount)EasyMessage.easymsg.AddMessage("购买数量超过上限");
					else if((this.price[i].iFlag&1)!=0 && GmMe.me.rbs.iMoney<this.price[i].iMoney*this.in_count.iNumber)EasyMessage.easymsg.AddMessage("铜币不足");
					else if((this.price[i].iFlag&2)!=0 && GmMe.me.rbs.iInGot<this.price[i].iIngot*this.in_count.iNumber)EasyMessage.easymsg.AddMessage("铜币不足");
					else if((this.price[i].iFlag&4)!=0 && MyGov.mg.iTick<this.price[i].iGovTick*this.in_count.iNumber)EasyMessage.easymsg.AddMessage("帮贡不足");
					else
					{
						GmProtocol.gi().s_NewShopBuy(this.iShopId, this.lockgoods.iPos,this.lockgoods.iTid, this.in_count.iNumber);
						this.btn_buy.bDisable=true;
						this.iBuyDelay=30;
					}
//					else if(NpcShop.ns.iUseType==0 && GmMe.me.rbs.iMoney<NpcShop.ns.price[this.lockgoods.iPos]*this.in_count.iNumber)EasyMessage.easymsg.AddMessage("铜币不足");
//					else GmProtocol.gi().s_NpcShopBuy(NpcShop.ns.iShopId, this.lockgoods.iTid, this.in_count.iNumber);
				}
				return true;
			}
		}

		var g;
		g=GoodsDraw.new_LockGoods(x,y,this.iX+30, this.iY+30, this.goods,msg);
		GoodsDraw.NoMove();
		if(msg==3 && g!=null)
		{//点击物品，选中准备购买
			if(g!=this.lockgoods)this.in_count.iNumber=1;
			this.lockgoods=g;
			i=this.lockgoods.iCount;
			if(i>this.iOnceBuyCount[this.lockgoods.iPos])i=this.iOnceBuyCount[this.lockgoods.iPos];
			this.in_count.MinMax(1, i);
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
}
NewShop.Open=function( pls)
{
	var ns;
	ns= XStat.gi().FindStat(XStat.GS_NEWSHOP);
	if(ns==null)ns= XStat.gi().PushStat(XStat.GS_NEWSHOP);
	ns._Open(pls);
}