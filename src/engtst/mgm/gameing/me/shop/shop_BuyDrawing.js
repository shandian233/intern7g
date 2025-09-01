
import GameData from "../../../../../config/GameData"
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

// class _BUYDRAWING
// {/*
// 	public int iLev;
// 	public int iType;
// 	public int iPrice;*/
// }
//id1,id2,cs1,cs2
//等级,类型,金币价,元宝价
//特殊商店，购买装备制造图纸
export default class shop_BuyDrawing extends BaseClass{
	

	_getpage( pls)
	{
		
		this.iPage=pls.GetNextByte();
		this.iCount=pls.GetNextInt();
		if(this.iCount>this.MAXBDS)this.iCount=this.MAXBDS;
		for(var i=0;i<this.iCount;i++)
		{
			this.bds[i].iLev=pls.GetNextByte();
			this.bds[i].iType=pls.GetNextByte();
			this.bds[i].iPrice=pls.GetNextInt();
		}
	}
	 constructor( ani)
	{
		super();
		this.MAXBDS=10;
		this.iW=660;
		this.iH=660;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.bds=new Array(this.MAXBDS);//
		for(var i=0;i<this.MAXBDS;i++)this.bds[i]=new Object();
		
		this.list_drawing=new UIList(0,3,this.iW-100,50+40*9);
		this.list_drawing.SetTitle(0, "类型", 160,false);
		this.list_drawing.SetTitle(1, "等级", 100,true);
		this.list_drawing.SetTitle(2, "价格", 260,true);
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_page=new Array(8);//
		for(var i=0;i<6;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_page[i].InitButton("频道选择");
			this.btn_page[i].sName=(i+3)*10+"";
		}
		
		this.btn_buy=new XButtonEx2(GmPlay.xani_button);
		this.btn_buy.InitButton("普通按钮140_55");
		this.btn_buy.sName="购买";
	}
	
	Draw()
	{
		console.log('购买')
		var i;
		
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW,this.iH,"图","纸","商","店");
		this.btn_close.Draw();
		
		DrawMode.new_framein(this.iX+30, this.iY+30, this.iW-60, this.iH-60);
		
		M3DFast.gi().DrawTextEx(this.iX+30+20, this.iY+30+30+20, "选择等级", 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
		for(i=0;i<6;i++)
		{
			if(this.iPage==i+3)
			{
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Move(this.iX+30+20+140+i*70, this.iY+30+20, 60, 60);
			this.btn_page[i].Draw();
		}
		this.list_drawing.BeginDraw(this.iX+30+20, this.iY+30+20+60+20);
		for(i=0;i<this.iCount;i++)
		{
			this.list_drawing.DrawUnit(0, i, shop_BuyDrawing._TYPE[i]);
			this.list_drawing.DrawUnit(1, i, this.bds[i].iLev*10+"级");
			this.list_drawing.DrawUnit(2, i, this.bds[i].iPrice+"铜币");
		}
		this.list_drawing.FinishDraw();
		
		M3DFast.gi().DrawTextEx(this.iX+30+20, this.iY+this.iH-30-20-30, "铜币："+GmMe.me.rbs.iMoney, 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
		this.btn_buy.Move(this.iX+this.iW-30-20-140, this.iY+this.iH-30-20-55, 140, 55);
		this.btn_buy.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if(this.list_drawing.ProcTouch(msg, x, y))return true;
		for(i=0;i<6;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{//获取所选页
					if(this.iPage!=i+3)
					{
						this.iPage=i+3;
						this.iCount=0;
						shop_BuyDrawing.GetPage(i+3);
					}
				}
			}
		}
		if(this.btn_buy.ProcTouch(msg, x, y))
		{
			if(this.btn_buy.bCheck())
			{
				if(this.list_drawing.iLockPoint<0)EasyMessage.easymsg.AddMessage("请先选中行");
				else if(GmMe.me.rbs.iMoney<this.bds[this.list_drawing.iLockPoint].iPrice)EasyMessage.easymsg.AddMessage("铜币不足");
				else GmProtocol.gi().s_SeverEvent(34, 1, this.iPage, this.bds[this.list_drawing.iLockPoint].iType, this.bds[this.list_drawing.iLockPoint].iPrice);
			}
			return true;
		}
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
shop_BuyDrawing.GetPage=function( page)
	{
		GmProtocol.gi().s_SeverEvent(34, 0, page, 0, 0);
	}
shop_BuyDrawing.Open=function( pls)
	{
		var sbd=XStat.gi().FindStat(XStat.GS_SHOPBUYDRAWING);
		if(sbd==null)sbd=XStat.gi().PushStat(XStat.GS_SHOPBUYDRAWING);
		sbd._getpage(pls);
	}
	shop_BuyDrawing._TYPE=["头盔","项链","剑","刀","枪","男衣","女衣","腰带","鞋子"];