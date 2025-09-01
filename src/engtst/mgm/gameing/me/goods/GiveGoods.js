
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

import GoodsDraw from "./GoodsDraw"
import MyGoods from "./MyGoods"

export default class GiveGoods extends BaseClass{

	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=30+430+20+280+30;
		this.iH=30+345+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.givegoods=new Array(3);//
		this.btn_goods=new Array(3);//
		this.xigsub=new Int32Array(3);//
		this.in_count=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_goods[i]=new XButton(GmPlay.xani_nui3);
			this.btn_goods[i].InitButton("物品格子");
			
			this.givegoods[i]=null;
			this.xigsub[i]=1;
			
			this.in_count[i]=new XInputNumber(GmPlay.xani_nui3);
			this.in_count[i].iNumber=1;
		}
		
		this.in_money=new XInputNumber(GmPlay.xani_nui3);
		this.in_money.iNumber=0;
		this.in_money.MinMax(0, GmMe.me.rbs.iMoney);
		
		this.btn_give=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_give.sName="给予";
		this.btn_give.InitButton("按钮1_110");
		
///////////////////////////////////////////////////////
		


		this.bLocked=false;
	}

	Draw()
	{
		var i,j;
		var offx,offy;
		offx=this.iX+30;
		offy=this.iY+30;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		for(i=0;i<3;i++)this.xigsub[i]=this.in_count[i].iNumber;
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30, MyGoods.gi().goods[2], this.givegoods, this.xigsub);
		if(this.lockgoods!=null)GoodsDraw.new_DrawRect(this.iX+30, this.iY+30, MyGoods.gi().goods[2], this.lockgoods, 0);
		
		offx+=430+20;
		
		for(i=0;i<3;i++)
		{
			this.btn_goods[i].Move(offx+i*(80+20), offy, 80, 80);
			this.btn_goods[i].Draw();
			if(this.givegoods[i]!=null)
			{
				GoodsDraw.new_DrawOneGoods_ext(this.btn_goods[i].iX, this.btn_goods[i].iY, this.givegoods[i], this.xigsub[i]);
			}
		}
		for(i=0;i<3;i++)
		{
			if(this.givegoods[i]!=null)
			{
				j=GmPlay.de_goods.intValue(this.givegoods[i].iTid, 0, 28);
				if(j>1)
				{
					this.in_count[i].Move(this.btn_goods[i].iX, this.btn_goods[i].iY+80, 80);
					this.in_count[i].Draw();
				}
			}
		}
		offy+=80+50+20;
		
		this.pm3f.DrawTextEx(offx,offy+25, "铜币:", 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		DrawMode.DrawTextFrame1(this.in_money.iX, this.in_money.iY,this.in_money.iW);
		this.in_money.Move(offx+100, offy, 150);
		this.in_money.Draw();
		
		offy+=50+20;
		this.pm3f.DrawTextEx(offx,offy+15, "铜币:"+GmMe.me.rbs.iMoney, 0xff000000, 30, 101, 1, 1, 0, 0, -2);

		offy+=30+20;
		DrawMode.new_Text(offx, offy, 150, GiveGoods.sName);
		offy+=30+10;
		DrawMode.new_Text(offx, offy, 150, "号码:"+GiveGoods.iRid);
		
		this.btn_give.Move(this.iX+this.iW-30-110, this.iY+this.iH-30-52-10, 110, 52);
		this.btn_give.Draw();
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		if(this.in_money.ProcTouch(msg, x,y))return true;
		for(i=0;i<3;i++)
		{
			if(this.givegoods[i]!=null)
			{
				j=GmPlay.de_goods.intValue(this.givegoods[i].iTid, 0, 28);//是否可叠加
				if(j>1)
				{
					if(this.in_count[i].ProcTouch(msg, x, y))return true;
				}
			}
		}
		this.lockgoods=GoodsDraw.new_LockGoods(x, y, this.iX+30, this.iY+30, MyGoods.gi().goods[2], msg);
		GoodsDraw.NoMove();
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{//点击物品
			if(this.lockgoods.iAtts[7]!=0 && this.lockgoods.iTid!=123)
			{
				EasyMessage.easymsg.AddMessage("绑定物品不可给予");
				return true;
			}
			//不在格子里的，直接放入
			j=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 28);//是否可叠加
//			if(i<=1)
			{//不可叠加，直接放入格子
				if(this.givegoods[0]==this.lockgoods || this.givegoods[1]==this.lockgoods || this.givegoods[2]==this.lockgoods)
				{//已经放入了
				}
				else
				{
					for(i=0;i<3;i++)
					{
						if(this.givegoods[i]==null)
						{
							this.givegoods[i]=this.lockgoods;
							this.in_count[i].iNumber=1;
							if(j>1)this.in_count[i].MinMax(1, this.lockgoods.iCount);
							break;
						}
					}
				}
//				else if(this.givegoods[0]==null)
//				{
//					this.givegoods[0]=this.lockgoods;
//					this.in_count[0].iNumber=1;
//				}
//				else if(this.givegoods[1]==null)
//				{
//					this.givegoods[1]=this.lockgoods;
//					this.in_count[1].iNumber=1;
//				}
//				else if(this.givegoods[2]==null)
//				{
//					this.givegoods[2]=this.lockgoods;
//					this.in_count[2].iNumber=1;
//				}
			}
		}
		for(i=0;i<3;i++)
		{
			if(this.btn_goods[i].ProcTouch(msg,	x, y))
			{
				if(this.btn_goods[i].bCheck())
				{
					this.givegoods[i]=null;
				}
			}
		}
		
		////////////////////////////////////////////
		if(this.btn_give.ProcTouch(msg, x, y))
		{
			if(this.btn_give.bCheck())
			{//发送给与物品和钱的消息
				if(this.in_money.iNumber>0 && this.in_money.iNumber<=GmMe.me.rbs.iMoney)
				{
					GmMe.me.rbs.iMoney-=this.in_money.iNumber;
					GmProtocol.gi().s_GiveGoods(0, GiveGoods.iRid, this.in_money.iNumber,1);
				}
				for(i=0;i<3;i++)
				{
					if(this.givegoods[i]!=null && this.givegoods[i].iGid!=-1)
					{
						GmProtocol.gi().s_GiveGoods(1, GiveGoods.iRid, this.givegoods[i].iGid,this.in_count[i].iNumber);
						j=GmPlay.de_goods.intValue(this.givegoods[i].iTid, 0, 28);//是否可叠加
						if(j<=1)this.givegoods[i].iGid=-1;
						else
						{
							this.givegoods[i].iCount-=this.in_count[i].iNumber;
							if(this.givegoods[i].iCount<=0)this.givegoods[i].iGid=-1;
						}
					}
				}
				
				XStat.gi().PopStat(1);
			}
			return true;
		}

		if(msg==3 && !XDefine.bOnRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}
}

GiveGoods.iRid;
GiveGoods.sName;

GiveGoods.GiveTo=function( drid, dname)
{
	GiveGoods.iRid=drid;
	GiveGoods.sName=dname;

	XStat.gi().PushStat(XStat.GS_GIVEGOODS);
}