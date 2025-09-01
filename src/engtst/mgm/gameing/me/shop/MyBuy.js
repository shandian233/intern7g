
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"

class BuyGoods
{/*
	int iGid;
	int iPrice;
	int iTid;
	int iCount;
	
	AnimaAction aa;
	*/
	constructor()
	{
		this.aa=new AnimaAction();
	}
}
class BuyPets
{/*
	int iPid;
	int iPrice;
	int iTid;
	String sName;*/
	constructor()
	{

	}
}

export default class MyBuy {

	constructor()
	{
		var i;
		this.bBuying=false;
		this.bg=new Array(20);//
		this.goods =new Array(20);//
		this.bp=new Array(8);//
		for(i=0;i<20;i++)
		{
			this.bg[i]=new BuyGoods();
			this.goods[i]=new Goods();
		}
		for(i=0;i<8;i++)this.bp[i]=new BuyPets();
		
		this.iW=900;
		this.iH=580;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		
		this.btn_buy=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_buy.InitButton("按钮1_110");
		this.btn_buy.sName="购买";
		
		this.btn_watch=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_watch.InitButton("按钮1_110");
		this.btn_watch.sName="查看";
		
		this.in_count=new XInputNumber(GmPlay.xani_nui3);
		this.in_count.iNumber=1;
		
		this.iPetPoint=-1;
	}

	Draw()
	{
		var i,j;
		var ox,oy;
		var offx,offy;
		if(!this.bBuying)return;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.new_baseframe2(this.iX,this.iY,this.iW,this.iH,"摊","位");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		DrawMode.new_framein(this.iX+30,this.iY+30,this.iW-60,this.iH-60);
		
		DrawMode.new_numberframe(this.iX+30+20, this.iY+30+30-5, 430+20+345-110, this.sSellName+"   ---   ("+this.sSeller+this.iSellerId+")");
		this.btn_watch.Move(this.iX+30+20+(430+20+345-110), this.iY+30+30-5-1, 110, 52);
		this.btn_watch.Draw();
		
		offx=this.iX+30+20;
		offy=this.iY+30+30+40+30;
		GmPlay.xani_nui3.DrawAnima(offx, offy, "摊位分类框",0);
		M3DFast.gi().DrawTextEx(offx+105/2, offy+33/2, "物品", 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
		offy+=33+10;
		this.iGx=offx;
		this.iGy=offy;
		GoodsDraw.new_DrawGoods(offx,offy, this.goods, null,null);

		for(i=0;i<20;i++){
			if(this.bg[i].iGid>0 && this.bg[i].iPrice==0)
			{
				ox=this.iGx+5+i%5*85;
				oy=this.iGy+5+Math.floor(i/5)*85;
				GmPlay.xani_nui3.DrawAnima(ox, oy, "观赏标签",0);
			}
		}
		
		var gap=32+10;
		//宠物部分
		offx=this.iX+30+20+430+20;
		offy=this.iY+30+30+40+30;
		GmPlay.xani_nui3.DrawAnima(offx, offy, "摊位分类框",0);
		M3DFast.gi().DrawTextEx(offx+105/2, offy+33/2, "宠物", 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
		offy+=33+10;
		this.iPx=offx;
		this.iPy=offy;
		DrawMode.new_frameon(offx, offy, 345, 175, 0);
		for(i=0;i<8;i++)
		{
			ox=offx+5+i%4*85;
			oy=offy+5+Math.floor(i/4)*85;
			
			GmPlay.xani_nui3.DrawAnima(ox,oy, "基本头像框",0);

			if(this.bp[i].iPid<=0)continue;

			GmPlay.xani_head.DrawAnima_aa(ox+3,oy+3,GmPlay.de_pet.strValue(this.bp[i].iTid, 0, 1),0);//宠物头像
			if(this.bp[i].iPrice==0)GmPlay.xani_nui3.DrawAnima(ox, oy, "观赏标签",0);
//			M3DFast.gi().DrawTextEx(offx, offy+i*offh+10, this.bp[i].sName, c, 20, 101, 1, 1, 0, 0, -2);
//			if(this.bp[i].iPrice==0)M3DFast.gi().DrawTextEx(offx+offw-80, offy+i*offh+10, "观赏", c, 20, 101, 1, 1, 0, -3, -2);
//			else M3DFast.gi().DrawTextEx(offx+offw-80, offy+i*offh+10, ""+this.bp[i].iPrice, c, 20, 101, 1, 1, 0, -3, -2);

			if(this.iPetPoint==i)
			{//选中，显示名字
				GmPlay.xani_nui3.DrawAnimaEx(ox, oy, "物品选中框", 0, 101, 1, 1, 0, 0, 0);
				DrawMode.new_TagText2(this.iPx, this.iPy+175+10, 150, "名称", GmPlay.de_pet.strValue(this.bp[i].iTid, 0, 1));
				
				if(this.bp[i].iPrice==0)DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap, 150, "单价", "观赏");
				else DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap, 150, "单价", ""+this.bp[i].iPrice);
				DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap*2, 150, "总价", ""+this.bp[i].iPrice);
				this.btn_buy.Move(this.iPx+235,this.iPy+175+10+gap*3-20,110,52);
				this.btn_buy.Draw();
			}
		}
		
	//	DrawMode.new_TagText2(this.iPx, this.iPy+175+10, 150, "名称", MyPets.mp.pets[i].sName);
		
		if(this.lockgoods!=null)
		{//显示购买
			GoodsDraw.new_DrawRect(this.iGx,this.iGy, this.goods, this.lockgoods, 0);
			for(i=0;i<20;i++)
			{
				if(this.bg[i].iGid>0 && this.bg[i].iGid==this.lockgoods.iGid)
				{//物品名称
					DrawMode.new_TagText2(this.iPx, this.iPy+175+10, 150, "名称", GmPlay.de_goods.strValue(this.lockgoods.iTid, -1, 4));
					if(this.bg[i].iPrice==0)
					{//价格0，观赏物品
						DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap, 150, "单价", "观赏");
						GoodsDraw.detail_add="#e#cc8bfe7观赏";
					}
					else
					{//显示价格
//						if(GmMe.me.rbs.iMoney<this.bg[i].iPrice*iBuyCount)iBuyCount=GmMe.me.rbs.iMoney/this.bg[i].iPrice;

//						if(this.bg[i].iPrice<100000)M3DFast.gi().DrawText_2(this.iX+370, this.iY+this.iH-30-70, "单价:"+this.bg[i].iPrice, 0xffffffff, 20, 101, 1, 1, 0, 0, 0,1,0xff000000);
//						else if(this.bg[i].iPrice<1000000)M3DFast.gi().DrawText_2(this.iX+370, this.iY+this.iH-30-70, "单价:"+this.bg[i].iPrice, 0xffffff00, 20, 101, 1, 1, 0, 0, 0,1,0xff000000);
//						else if(this.bg[i].iPrice<10000000)M3DFast.gi().DrawText_2(this.iX+370, this.iY+this.iH-30-70, "单价:"+this.bg[i].iPrice, 0xff00ff00, 20, 101, 1, 1, 0, 0, 0,1,0xff000000);
//						else M3DFast.gi().DrawText_2(this.iX+370, this.iY+this.iH-30-70, "单价:"+this.bg[i].iPrice, 0xffff00ff, 20, 101, 1, 1, 0, 0, 0,1,0xff000000);
						DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap, 150, "单价", ""+Math.floor(this.bg[i].iPrice));
						DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap*2, 150, "总价", ""+Math.floor(this.bg[i].iPrice*this.in_count.iNumber));
						GoodsDraw.detail_add="#e#cc8bfe7单价："+Math.floor(this.bg[i].iPrice);//MyBuy.money_show(this.bg[i].iPrice);
						//如果是可叠加物品，增加选择数量按钮
						j=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 28);//是否叠加
						if(j>1)
						{//可叠加
							this.in_count.Move(this.iPx+230, this.iPy+175+10,115);
							this.in_count.Draw();
						}
					}
				}
			}
			this.btn_buy.Move(this.iPx+235,this.iPy+175+10+gap*3-20,110,52);
			this.btn_buy.Draw();
		}
		DrawMode.new_TagText2(this.iPx, this.iPy+175+10+gap*3, 150, "铜币", ""+GmMe.me.rbs.iMoney);

		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
		GoodsDraw.detail_add="";
		
		if(Confirm1.end(Confirm1.CONFIRM_MYBUY))
		{//
			if(Confirm1.bConfirm)
			{//同意购买
				if(this.lockgoods!=null)GmProtocol.gi().s_MyBuy(0,this.iSellerId,this.lockgoods.iGid,this.in_count.iNumber);
				else if(this.iPetPoint!=-1)GmProtocol.gi().s_MyBuy(1,this.iSellerId,this.bp[this.iPetPoint].iPid,1);
			}
		}
	}
	
	ProcTouch( msg, x, y)
	{
		var i,j;
		var ox,oy;
		if(this.iPetPoint>=0)
		{
			for(i=0;i<8;i++)
			{
				ox=this.iPx+5+i%4*85;
				oy=this.iPy+5+Math.floor(i/4)*85;
				if(this.bp[i].iPid>0)
				{
					if(XDefine.bInRect(x, y, ox,oy, 80,80))
					{
						if(this.iPetPoint==i)
						{//点击两次，查看属性
							if(msg==1)GmProtocol.gi().s_WatchOn(2,this.bp[this.iPetPoint].iPid,0,"");
							return true;
						}
					}
				}
			}
//			if(this.btn_watch.ProcTouch(msg, x, y))
//			{
//				if(this.btn_watch.bCheck())
//				{//查看宠物属性
//					GmProtocol.gi().s_WatchOn(2,this.bp[this.iPetPoint].iPid,0,"");
//				}
//				return true;
//			}
			if(this.btn_buy.ProcTouch(msg, x, y))
			{
				if(this.btn_buy.bCheck())
				{
					if(this.bp[this.iPetPoint].iPrice==0)EasyMessage.easymsg.AddMessage("观赏宠物，不能购买");
					else if(GmMe.me.rbs.iMoney<this.bp[this.iPetPoint].iPrice)EasyMessage.easymsg.AddMessage("铜币不足，不能购买");
					else  Confirm1.start(Confirm1.CONFIRM_MYBUY, "是否确定#e花费"+MyBuy.money_show(this.bp[this.iPetPoint].iPrice)+"#e购买#c00ff00["+this.bp[this.iPetPoint].sName+"]#cffffff？");
				}
				return true;
			}
		}
		if(this.lockgoods!=null)
		{//显示购买
			for(i=0;i<20;i++)
			{
				if(this.bg[i].iGid>0 && this.bg[i].iGid==this.lockgoods.iGid)
				{
					if(this.bg[i].iPrice==0)
					{//价格0，观赏物品
					}
					else
					{//显示价格
						//如果是可叠加物品，增加选择数量按钮
						j=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 28);//是否叠加
						if(j>1)
						{//可叠加
							if(this.in_count.ProcTouch(msg, x, y))
							{
									if(this.in_count.iNumber>=this.bg[i].iCount)this.in_count.iNumber=this.bg[i].iCount;
									if(this.in_count.iNumber<0)this.in_count.iNumber=0;

									if(GmMe.me.rbs.iMoney<this.bg[i].iPrice*this.in_count.iNumber)this.in_count.iNumber= Math.floor(GmMe.me.rbs.iMoney/this.bg[i].iPrice);
								return true;
							}
						}
					}
					if(this.btn_buy.ProcTouch(msg, x, y))
					{
						if(this.btn_buy.bCheck())
						{
							if(this.bg[i].iPrice==0)EasyMessage.easymsg.AddMessage("观赏物品，不能购买");
							else if(GmMe.me.rbs.iMoney<this.bg[i].iPrice*this.in_count.iNumber)EasyMessage.easymsg.AddMessage("铜币不足，不能购买");
							else if(this.in_count.iNumber<=0)EasyMessage.easymsg.AddMessage("购买数量不能为0");
							else Confirm1.start(Confirm1.CONFIRM_MYBUY, "是否确定#e花费"+MyBuy.money_show(this.bg[i].iPrice*this.in_count.iNumber)+"#e购买"+this.in_count.iNumber+"个#c00ff00["+GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4)+"]#cffffff？");
						}
						return true;
					}
					break;
				}
			}
		}
		if(this.btn_watch.ProcTouch(msg, x, y))
		{
			if(this.btn_watch.bCheck())
			{//查看摊主
				GmProtocol.gi().s_WatchOn(0, this.iSellerId, 0,"");
			}
			return true;
		}
		this.lockgoods=GoodsDraw.new_LockGoods(x,y,this.iGx,this.iGy, this.goods,msg);
		GoodsDraw.NoMove();
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{
		}
		this.in_count.iNumber=1;
		
		this.iPetPoint=-1;
		for(i=0;i<8;i++)
		{
			ox=this.iPx+5+i%4*85;
			oy=this.iPy+5+Math.floor(i/4)*85;
			if(this.bp[i].iPid>0)
			{
				if(XDefine.bInRect(x, y, ox,oy, 80,80))
				{
					this.iPetPoint=i;
				}
			}
		}
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				this.bBuying=false;
			}
			return true;
		}
		return true;
	}
	
	InitBuy( drid, bname, sl)
	{
		var i;
		this.iSellerId=drid;
		this.sSellName=bname;
		this.sSeller=sl;
		this.bBuying=true;
		for(i=0;i<20;i++)
		{
			this.bg[i].iGid=0;
			this.goods[i].iGid=-1;
		}
		for(i=0;i<8;i++)
		{
			this.bp[i].iPid=0;
		}
	}
	IndexBuy( pls)
	{
		var i,j;
		i=pls.GetNextByte();
		if(i==0)
		{//获取物品列表
			for(i=0;i<20;i++)
			{
				this.bg[i].iGid=-1;
				this.goods[i].iGid=-1;
			}
			for(i=0;i<20;i++)
			{
				j=pls.GetNextByte();
				if(j==0)break;
				this.bg[i].iGid=pls.GetNextInt();
				this.bg[i].iPrice=pls.GetNextInt();
				this.bg[i].iTid=pls.GetNextShort();
				this.bg[i].iCount=pls.GetNextShort();

				this.goods[i].iGid=this.bg[i].iGid;
				this.goods[i].iTid=this.bg[i].iTid;
				this.goods[i].iCount=this.bg[i].iCount;
				for(j=0;j<8;j++)this.goods[i].iAtts[j]=pls.GetNextInt();
				this.goods[i].iPos=i;
				GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(this.bg[i].iTid, 0, 10), this.goods[i].aa);
			}
		}
		else if(i==1)
		{//获取宠物列表
			for(i=0;i<8;i++)this.bp[i].iPid=0;
			for(i=0;i<8;i++)
			{
				j=pls.GetNextByte();
				if(j==0)break;
				this.bp[i].iPid=pls.GetNextInt();
				this.bp[i].iPrice=pls.GetNextInt();
				this.bp[i].iTid=pls.GetNextInt();
				j=pls.GetNextShort();//baobao
				this.bp[i].sName=GmPlay.de_pet.strValue(this.bp[i].iTid, 0, 1);
				if((j&1)!=0)this.bp[i].sName=this.bp[i].sName+"宝宝";
				if((j&2)!=0)this.bp[i].sName="变异"+this.bp[i].sName;
			}
		}
	}
}
MyBuy.mb=null;
MyBuy.gi=function()
{
	if(MyBuy.mb==null)MyBuy.mb=new MyBuy();
	return MyBuy.mb;
}
MyBuy.its=function( i)
	{
		if(i>=1000)return ""+i;
		if(i>=100)return "0"+i;
		if(i>=10)return "00"+i;
		if(i>=0)return "000"+i;
		return "0000";
	}
MyBuy.money_show=function( money)
	{
		var a,b,c;
		a=Math.floor(money/100000000);
		b=Math.floor(money/10000)%10000;
		c=money%10000;
		if(a>0)return a+","+MyBuy.its(b)+","+MyBuy.its(c);
		if(b>0)return b+","+MyBuy.its(c);
		return ""+c;
	}