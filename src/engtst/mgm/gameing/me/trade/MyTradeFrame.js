
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import WatchOn from "../../../../../engtst/mgm/gameing/fast/WatchOn"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"

import MyTrade from "./MyTrade"

export default class MyTradeFrame extends BaseClass{

	constructor( ani)
	{
		super();
		this.maxcount=[999,999,999];
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;

		this.iW=(80*3+20*2+30*2)*2;
		this.iH=475;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_dgoods=new Array(3);//
		this.btn_dpet=new Array(3);//
		this.btn_mgoods=new Array(3);//
		this.btn_mpet=new Array(3);//
		this.in_count=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_dgoods[i]=new XButton(GmPlay.xani_nui3);
			this.btn_dgoods[i].InitButton("物品格子");
			this.btn_mgoods[i]=new XButton(GmPlay.xani_nui3);
			this.btn_mgoods[i].InitButton("物品格子");
			
			this.btn_dpet[i]=new XButton(GmPlay.xani_nui2);
			this.btn_dpet[i].InitButton("宠物头像框");
			this.btn_mpet[i]=new XButton(GmPlay.xani_nui2);
			this.btn_mpet[i].InitButton("宠物头像框");			

			this.in_count[i]=new XInputNumber(GmPlay.xani_nui3);
			this.in_count[i].iNumber=1;
		}

		this.btn_selgp=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_selgp[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_selgp[i].InitButton("3号按钮250_42");
		}
		
		this.bSelectGoods=false;
		this.lockgoods=null;
		this.iPetPoint=0;
		this.iPetSelect=-1;
		
		this.iShowDGoodsPoint=-1;
		
		this.in_money=new XInputNumber(GmPlay.xani_nui3);
//		this.in_money.Move(this.iX+this.iW/2+60, this.iY+140, 128,50);
		this.in_money.iNumber=0;
		this.in_money.MinMax(0, GmMe.me.rbs.iMoney);
		
		
		this.btn_ready=new XButton(GmPlay.xani_nui3);
		this.btn_ready.InitButton("内框按钮");
		this.btn_ready.Move(this.iX+this.iW/2+30, this.iY+this.iH-30-55, 98,55);
		this.btn_ready.sName="准备";
		
		this.btn_trade=new XButton(GmPlay.xani_nui3);
		this.btn_trade.InitButton("内框按钮");
		this.btn_trade.Move(this.iX+this.iW/2+30, this.iY+this.iH-30-55, 98,55);
		this.btn_trade.sName="交易";
		
		this.btn_close=new XButton(GmPlay.xani_nui3);
		this.btn_close.InitButton("内框按钮");
		this.btn_close.Move(this.iX+this.iW-98-30, this.iY+this.iH-30-55, 98, 55);
		this.btn_close.sName="取消";
	}

	Draw()
	{
		var i,j;

		DrawMode.new_bigframe(this.iX, this.iY, this.iW/2, this.iH);
		DrawMode.new_bigframe(this.iX+this.iW/2, this.iY, this.iW/2, this.iH);
		
		var offx,offy;
		var w,h;
		//画对方;
		offx=this.iX+30;
		offy=this.iY+30;
		this.pm3f.DrawTextEx(offx, offy, MyTrade.mt.sDName+"("+MyTrade.mt.iDRid+")", 0xff000000, 30, 101, 1, 1, 0, 0, 0);
		offy+=30+15;
		for(i=0;i<3;i++)
		{
			this.btn_dgoods[i].Move(offx+i*(80+20), offy, 80, 80);
			this.btn_dgoods[i].Draw();
			if(MyTrade.mt.dproc>=1)
			{
				if(MyTrade.mt.dgs[i].iGid>0)
				{
					GoodsDraw.new_DrawOneGoods(this.btn_dgoods[i].iX, this.btn_dgoods[i].iY, MyTrade.mt.dgs[i], null, null);
					DrawMode.new_Text(this.btn_dgoods[i].iX, this.btn_dgoods[i].iY+80+10, 80, ""+MyTrade.mt.dgs[i].iCount);
				}
				else DrawMode.new_Text(this.btn_dgoods[i].iX, this.btn_dgoods[i].iY+80+10, 80, "");
			}
			else DrawMode.new_Text(this.btn_dgoods[i].iX, this.btn_dgoods[i].iY+80+10, 80, "");
		}
		offy+=80+10+30+20;

		this.pm3f.DrawTextEx(offx+10, offy+25, "铜币:", 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		if(MyTrade.mt.dproc==0)DrawMode.new_Text(offx+100, offy+10, 180, "");
		else DrawMode.new_Text(offx+100, offy+10, 180, ""+MyTrade.mt.dmoney);
	//	if(MyTrade.mt.dproc==0)this.pm3f.DrawTextEx(offx, offy+25, "铜币:", 0xff000000, 30, 101, 1, 1, 0, 0, -2);
//		else this.pm3f.DrawTextEx(offx, offy+25, "铜币:"+MyTrade.mt.dmoney, 0xff000000, 20, 101, 1, 1, 0, 0, -2);

		offy+=50+15;
		
		this.pm3f.DrawTextEx(offx+10, offy+40, "宠物:", 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		for(i=0;i<2;i++)
		{
			this.btn_dpet[i].Move(offx+100+i*(80+20), offy, 80, 80);
			GmPlay.xani_nui2.DrawAnima(this.btn_dpet[i].iX, this.btn_dpet[i].iY, "宠物头像框",0);
//			this.btn_dpet[i].Draw();
//			this.pm3f.DrawTextEx(offx, offy+190+i*45, "宠物"+(i+1), 0xff000000, 20, 101, 1, 1, 0, 0, 0);
			if(MyTrade.mt.dproc>=1)
			{
				if(MyTrade.mt.dps[i].iPid>0)GmPlay.xani_head.DrawAnima_aa(offx+100+i*(80+20), offy,GmPlay.de_pet.strValue(MyTrade.mt.dps[i].iTid, 0, 1),0);//宠物头像
//				else this.btn_dpet[i].sName="";
				//头像
			}
		}
		offy+=80+30;
		if(MyTrade.mt.dproc==0)
		{
			this.pm3f.DrawText_2(this.iX+this.iW/4,offy+15,"未准备",0xffff0000,30,101,1,1,0,-2,0,1,0xff000000);
		}
		else if(MyTrade.mt.dproc==1)
		{
			this.pm3f.DrawText_2(this.iX+this.iW/4,offy+15,"已准备",0xff00ff00,30,101,1,1,0,-2,0,1,0xff000000);
		}
		
		//画己方------------------------------------------------------------------------------
		offx=this.iX+this.iW/2+30;
		offy=this.iY+30;
		offy+=30+15;
		for(i=0;i<3;i++)
		{
			this.btn_mgoods[i].Move(offx+i*(80+20), offy, 80, 80);
			this.btn_mgoods[i].Draw();
			if(MyTrade.mt.mgs[i]!=null)
			{
///				GoodsDraw.new_DrawOneGoods(this.btn_mgoods[i].iX, this.btn_mgoods[i].iY, MyTrade.mt.mgs[i],null,null);
				GoodsDraw.new_DrawOneGoods_ext(this.btn_mgoods[i].iX, this.btn_mgoods[i].iY, MyTrade.mt.mgs[i], this.in_count[i].iNumber);
			}
		}
		for(i=0;i<3;i++)
		{
			if(MyTrade.mt.mgs[i]!=null)
			{//看此物品是否可叠加
				j=GmPlay.de_goods.intValue(MyTrade.mt.mgs[i].iTid, 0, 28);
				if(j>1)
				{//可叠加，显示按钮
//					btn_mgcount[i].sName=""+MyTrade.mt.mgcount[i];
//					btn_mgcount[i].Draw();
					this.in_count[i].Move(this.btn_mgoods[i].iX, this.btn_mgoods[i].iY+80,80);
					this.in_count[i].MinMax(1, MyTrade.mt.mgs[i].iCount);
					this.in_count[i].Draw();
				}
				else
				{
					this.in_count[i].iNumber=1;
				}
			}
		}
		offy+=80+50+10;
		this.pm3f.DrawTextEx(offx+10, offy+25, "铜币:", 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		this.in_money.Move(offx+100, offy, 180);
		this.in_money.Draw();
//		this.in_money.Move(offx+60, offy+140-25, 155, 50);
//		DrawMode.DrawTextFrame1(this.in_money.iX, this.in_money.iY,this.in_money.iW);
//		this.in_money.DrawText();
		offy+=50+15;
		
		this.pm3f.DrawTextEx(offx+10, offy+40, "宠物:", 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		for(i=0;i<2;i++)
		{
			this.btn_mpet[i].Move(offx+100+i*(80+20), offy, 80, 80);
			GmPlay.xani_nui2.DrawAnima(this.btn_mpet[i].iX, this.btn_mpet[i].iY, "宠物头像框",0);
//			this.btn_mpet[i].Draw();
//			this.pm3f.DrawTextEx(offx, offy+190+i*45, "宠物"+(i+1), 0xff000000, 20, 101, 1, 1, 0, 0, 0);
			if(MyTrade.mt.mps[i]!=null)
			{
				if(MyTrade.mt.mps[i].iPid>0)GmPlay.xani_head.DrawAnima_aa(offx+100+i*(80+20), offy,GmPlay.de_pet.strValue(MyTrade.mt.mps[i].iTid, 0, 1),0);//宠物头像
			}
//			if(MyTrade.mt.mps[i]==null)this.btn_mpet[i].sName="";
//			else this.btn_mpet[i].sName=MyTrade.mt.mps[i].sName;
		}
		offy+=80+30;
		
		if(MyTrade.mt.mproc==0)
		{
			this.pm3f.DrawText_2(this.iX+this.iW/2+this.iW/4,offy+15,"未准备",0xffff0000,30,101,1,1,0,-2,0,1,0xff000000);
			this.btn_ready.Draw();
		}
		else if(MyTrade.mt.mproc==1)
		{
			this.pm3f.DrawText_2(this.iX+this.iW/2+this.iW/4,offy+15,"已准备",0xff00ff00,30,101,1,1,0,-2,0,1,0xff000000);
		}
		else if(MyTrade.mt.mproc==2)
		{
			this.pm3f.DrawText_2(this.iX+this.iW/2+30,offy+15,"等待对方交易",0xff00ff00,30,101,1,1,0,0,0,1,0xff000000);
		}
		if(MyTrade.mt.mproc==1 && MyTrade.mt.dproc>=1)this.btn_trade.Draw();
		this.btn_close.Draw();
		
		for(i=0;i<3;i++)
		{
			if(MyTrade.mt.dproc>=1)
			{
				if(MyTrade.mt.dgs[i].iGid>0)
				{
					if(this.iShowDGoodsPoint==i)GoodsDraw.new_DrawDetail(MyTrade.mt.dgs[i], this.btn_dgoods[i].iX, this.btn_dgoods[i].iY,0);
				}
			}
		}
		////选择物品，选择宠物---------------------------------------------------------------------------------------
		if(this.bSelectGoods)
		{//320,256
			w=430+60;
			h=345+60;//+40;
			offx=(GmConfig.SCRW-w)/2;
			offy=(GmConfig.SCRH-h)/2;
			this.iGx=offx+30;
			this.iGy=offy+30;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
			DrawMode.new_bigframe(offx, offy, w, h);
			GoodsDraw.new_DrawGoods(offx+30, offy+30, MyGoods.gi().goods[2], MyTrade.mt.mgs, this.maxcount);
			
			if(this.lockgoods!=null)
			{
				GoodsDraw.new_DrawRect(offx+30, offy+30, MyGoods.gi().goods[2], this.lockgoods, 0);
				if(GoodsDraw.bShowDetail())GoodsDraw.new_DrawDetail(this.lockgoods, -1, -1,0);
			}
		}
		if(this.bSelectPet)
		{
			w=250+30+30;
			h=MyPets.mp.iPetCount*50+50;
			offx=(GmConfig.SCRW-w)/2;
			offy=(GmConfig.SCRH-h)/2;
			DrawMode.frame_type4("10号框20_20", offx, offy, w, h, 20, 20);
			for(i=0;i<MyPets.mp.iPetCount;i++)
			{
				for(j=0;j<2;j++)
				{
					if(MyPets.mp.pets[i]==MyTrade.mt.mps[j])break;
				}
				if(j<2)continue;

				this.btn_selgp[i].Move(offx+30,offy+30+i*50, 250,42);
				this.btn_selgp[i].sName=MyPets.mp.pets[i].sName;
				this.btn_selgp[i].Draw();
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		var offx,offy,w,h;
		if(MyTrade.mt.mproc==0)
		{//我未准备
			if(this.bSelectPet)
			{
				w=250+30+30;
				h=MyPets.mp.iPetCount*50+50;
				offx=(GmConfig.SCRW-w)/2;
				offy=(GmConfig.SCRH-h)/2;
				
				for(i=0;i<MyPets.mp.iPetCount;i++)
				{
					for(j=0;j<2;j++)
					{
						if(MyPets.mp.pets[i]==MyTrade.mt.mps[j])break;
					}
					if(j<2)continue;

					if(this.btn_selgp[i].ProcTouch(msg, x, y))
					{
						if(this.btn_selgp[i].bCheck())
						{
							this.iPetSelect=i;
							if((parseInt(MyPets.mp.pets[this.iPetSelect].iFlag/100)%10)==0)
							{
								this.bSelectPet=false;
								MyTrade.mt.mps[this.iPetPoint]=MyPets.mp.pets[this.iPetSelect];
							}
							else EasyMessage.easymsg.AddMessage("绑定宠物无法交易");
						}
					}
				}

				if(msg==3 && !XDefine.bInRect(x, y, offx, offy, w, h))
				{
					this.bSelectPet=false;
				}
				return true;
			}
			if(this.bSelectGoods)
			{
//				if(this.lockgoods!=null)
//				{
//					if(this.btn_selgp.ProcTouch(msg, x, y))
//					{
//						if(this.btn_selgp.bCheck())
//						{
//							for(i=0;i<3;i++)
//							{
//								if(MyTrade.mt.mgs[i]==this.lockgoods)return true;
//							}
//							MyTrade.mt.mgs[this.iGoodsPoint]=this.lockgoods;
//							MyTrade.mt.mgcount[this.iGoodsPoint]=1;
//							this.bSelectGoods=false;
//							this.lockgoods=null;
//						}
//						return true;
//					}
//				}
				this.lockgoods=GoodsDraw.new_LockGoods(x, y, this.iGx, this.iGy, MyGoods.gi().goods[2], msg);
				if(this.lockgoods!=null)
				{
					for(i=0;i<3;i++)
					{
						if(MyTrade.mt.mgs[i]==this.lockgoods)
						{
							this.lockgoods=null;
							return true;
						}
					}
					if(GoodsDraw.bCanProc())
					{
						MyTrade.mt.mgs[this.iGoodsPoint]=this.lockgoods;
						//MyTrade.mt.mgcount[this.iGoodsPoint]=1;
						this.bSelectGoods=false;
						this.lockgoods=null;
						this.in_count[this.iGoodsPoint].iNumber=1;
						return true;
					}
				}
				if(msg==3 && !XDefine.bInRect(x, y, this.iGx-30, this.iGy-30, 430+60, 345+60))
				{
					this.bSelectGoods=false;
				}
				return true;
			}
			if(this.in_money.ProcTouch(msg, x,y))return true;
			for(i=0;i<3;i++)
			{
				if(MyTrade.mt.mgs[i]!=null)
				{
					j=GmPlay.de_goods.intValue(MyTrade.mt.mgs[i].iTid, 0, 28);
					if(j>1)
					{//可叠加，显示按钮
						if(this.in_count[i].ProcTouch(msg, x, y))return true;
					}
				}
			}
			for(i=0;i<3;i++)
			{
				if(this.btn_mgoods[i].ProcTouch(msg, x, y))
				{
					if(this.btn_mgoods[i].bCheck())
					{
						if(MyTrade.mt.mgs[i]==null)
						{//选择物品放入
							this.iGoodsPoint=i;
							this.bSelectGoods=true;
							this.lockgoods=null;
						}
						else MyTrade.mt.mgs[i]=null;
					}
				}
			}
			
			for(i=0;i<2;i++)
			{
				if(this.btn_mpet[i].ProcTouch(msg, x, y))
				{
					if(this.btn_mpet[i].bCheck())
					{
						if(MyTrade.mt.mps[i]==null)
						{
							this.iPetPoint=i;
							this.iPetSelect=-1;
							this.bSelectPet=true;
						}
						else MyTrade.mt.mps[i]=null;
					}
					return true;
				}
			}
			
			if(this.btn_ready.ProcTouch(msg, x, y))
			{
				if(this.btn_ready.bCheck())
				{
					var ready=new Int32Array(10);
					for(i=0;i<10;i++)ready[i]=0;
					for(i=0;i<3;i++)
					{
						if(MyTrade.mt.mgs[i]==null)
						{
							ready[i*2]=0;
						}
						else
						{
							ready[i*2]=MyTrade.mt.mgs[i].iGid;
							ready[i*2+1]=this.in_count[i].iNumber;
						}
						if(MyTrade.mt.mps[i]==null)ready[i+6]=0;
						else ready[i+6]=MyTrade.mt.mps[i].iPid;
					}
					if(this.in_money.iNumber>0 && this.in_money.iNumber<=GmMe.me.rbs.iMoney)
					{
						ready[9]=this.in_money.iNumber;
					}
					GmProtocol.gi().s_Trade(1, ready[0],ready[1], ready[2], ready[3], ready[4], ready[5],    ready[6],ready[7],ready[8],ready[9]);
					MyTrade.mt.mproc=1;//我自己进入准备阶段
				}
				return true;
			}
		}
		if(MyTrade.mt.dproc==1)
		{//对方已准备，点击物品查看，点击宠物查看
			this.iShowDGoodsPoint=-1;
			for(i=0;i<3;i++)
			{
				if(this.btn_dgoods[i].ProcTouch(msg, x, y))
				{
					if(this.btn_dgoods[i].bCheck())
					{
						if(MyTrade.mt.dgs[i].iGid>0)
						{
							this.iShowDGoodsPoint=i;
						}
					}
					return true;
				}
			}
			for(i=0;i<2;i++)
			{
				if(this.btn_dpet[i].ProcTouch(msg, x, y))
				{
					if(this.btn_dpet[i].bCheck())
					{
						if(MyTrade.mt.dps[i].iPid>0)
						{
							WatchOn.Init_Pet(MyTrade.mt.dps[i]);
						}
					}
					return true;
				}
			}
		}
		if(MyTrade.mt.mproc==1 && MyTrade.mt.dproc>=1)
		{
			if(this.btn_trade.ProcTouch(msg, x, y))
			{
				if(this.btn_trade.bCheck())
				{//交易
					GmProtocol.gi().s_Trade(2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
					MyTrade.mt.mproc=2;
				}
				return true;
			}
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