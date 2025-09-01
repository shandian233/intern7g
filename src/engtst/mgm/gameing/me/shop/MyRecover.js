
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
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"

//回收一些物品
export default class MyRecover extends BaseClass{
	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=710;
		this.iH=345+60;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.lockgoods=null;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_recover=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_recover.InitButton("按钮1_110");
		this.btn_recover.sName="出售";
		this.btn_recover.Move(this.iX+this.iW-110-30,this.iY+this.iH-52-30,110,52);
		
		this.bCanRecover=false;
	}

	Draw()
	{
		var i,j;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
//		this.pm3f.DrawTextEx(this.iX+345, this.iY+25, NpcShop.ns.sShopName, 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		this.btn_close.Draw();
		
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30, MyGoods.gi().goods[2], null, null);
		
		if(this.lockgoods!=null && this.lockgoods.iGid>0)
		{
			GoodsDraw.new_DrawRect(this.iX+30, this.iY+30, MyGoods.gi().goods[2],this.lockgoods, 0);
			
			i=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 9);//穿戴等级限制
			
			this.bCanRecover=false;
			if(i<0 || i>40)this.pm3f.DrawTextEx(this.iX+430+30+20, this.iY+35, "本店不收此物品", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			else
			{
				this.bCanRecover=true;
				j=0;
				if(i==0)j=100/2;
				else if(i==10)j=1000/2;
				else if(i==20)j=4000/2;
				else if(i==30)j=9000/2;
				else if(i==40)j=14000/2;
				this.pm3f.DrawTextEx(this.iX+430+30+20, this.iY+35, "回收价格 "+j, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			}
			this.btn_recover.Draw();
		}
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.lockgoods!=null)
		{
			if(this.btn_recover.ProcTouch(msg, x, y))
			{
				if(this.btn_recover.bCheck())
				{//出售物品
					GmProtocol.gi().s_RecoverGoods(this.lockgoods.iGid);
					this.lockgoods=null;
					GoodsDraw.new_LockGoods(x,y,this.iX+30, this.iY+30, MyGoods.gi().goods[2],msg);
					/*
					if(this.bCanRecover)
					{
					}
					else
					{
						EasyMessage.easymsg.AddMessage("本店不收此物品");
					}*/
				}
				return true;
			}
		}
		
		this.lockgoods=GoodsDraw.new_LockGoods(x,y,this.iX+30, this.iY+30, MyGoods.gi().goods[2],msg);
		GoodsDraw.NoMove();
		
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}

}
