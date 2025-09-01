
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import InNumber from "../../../../../engtst/mgm/frame/InNumber"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"

export default class GoodsStoreFrame extends BaseClass{

	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;

		this.iW=30+430+20+430+30;
		this.iH=30+60+20+345+20+50+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

//		btn_close=new XButton(GmPlay.xani_ui);
//		btn_close.InitButton("统一关闭按钮");
//		btn_close.Move(this.iX+this.iW-60-5, this.iY, 60, 60);

		this.btn_switch=new Array(20);//
		for(i=0;i<20;i++)
		{
			this.btn_switch[i]=new XButton(GmPlay.xani_nui3);
			this.btn_switch[i].InitButton("仓库按钮");
		}
		
		this.btn_out=new XButton(GmPlay.xani_nui2);
		this.btn_out.InitButton("按钮1_110");
		this.btn_out.sName="取出";
		
		this.btn_in=new XButton(GmPlay.xani_nui2);
		this.btn_in.InitButton("按钮1_110");
		this.btn_in.sName="存入";

		this.iStorePoint=0;
	}
	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		offx=this.iX+30;
		offy=this.iY+30;
		for(i=0;i<13;i++)
		{
			if(i==this.iStorePoint)
			{
				this.btn_switch[i].bMouseDown=true;
				this.btn_switch[i].bMouseIn=true;
			}
			this.btn_switch[i].Move(offx+i*68, offy, 60, 60);
			this.btn_switch[i].iNameColor=0xff003e57;
			if(i<GoodsStoreFrame.iStoreCount)
			{
				this.btn_switch[i].sName=""+(i+1);
				this.btn_switch[i].Draw();
			}
			else
			{
				this.btn_switch[i].sName="开";
				this.btn_switch[i].Draw();
				break;
			}
		}
		offy+=60+20;
		this.iGx1=offx;
		this.iGy1=offy;
		GoodsDraw.new_DrawGoods(offx, offy, MyGoods.gi().goods[this.iStorePoint+10], null, null);
		if(this.lockgoods1!=null)
		{
			GoodsDraw.new_DrawRect(offx, offy, MyGoods.gi().goods[this.iStorePoint+10], this.lockgoods1, 0);
//			GoodsDraw.Draw_Detail(this.lockgoods1, -1, -1);
		}
		
		this.iGx2=offx+430+20;
		this.iGy2=offy;
		GoodsDraw.new_DrawGoods(this.iGx2, offy, MyGoods.gi().goods[2], null, null);
		if(this.lockgoods2!=null)GoodsDraw.new_DrawRect(this.iGx2, offy, MyGoods.gi().goods[2], this.lockgoods2, 0);
		
		offy+=345+20;

		this.btn_out.Move(offx+430-110, offy-1, 110, 52);
		this.btn_out.Draw();
		DrawMode.new_TagText2(offx, offy+9, 150, "存银", ""+GmMe.me.rbs.iStore);

		this.btn_in.Move(offx+430+20+430-110, offy, 110, 52);
		this.btn_in.Draw();//+"/20000000"
		DrawMode.new_TagText2(offx+430+20, offy+9, 150, "铜币", ""+GmMe.me.rbs.iMoney);
		
		if(Confirm1.end(Confirm1.CONFIRM_BUYSTORE))
		{//
			if(Confirm1.bConfirm)
			{//购买一个仓库
				GmProtocol.gi().s_OpenStore(10, 10*(GoodsStoreFrame.iStoreCount-GoodsStoreFrame.MAXFREESTORE+1),0);
			}
		}
		if(InNumber.end(InNumber.IN_IN))
		{//
			if(InNumber.bOk)
			{//确认踢人
				GmProtocol.gi().s_OpenStore(20,InNumber.iNumber,0);
			}
		}
		if(InNumber.end(InNumber.IN_OUT))
		{//
			if(InNumber.bOk)
			{//确认踢人
				GmProtocol.gi().s_OpenStore(21,InNumber.iNumber,0);
			}
		}
		if(GoodsDraw.bShowDetail())GoodsDraw.new_DrawDetail(null, -1, -1,0);
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if((this.lockgoods1==null && this.lockgoods2==null) || this.lockgoods1!=null)
		{
			this.lockgoods1=GoodsDraw.new_LockGoods(x, y, this.iGx1, this.iGy1, MyGoods.gi().goods[this.iStorePoint+10], msg);
			if(GoodsDraw.bCanProc() && this.lockgoods1!=null)
			{//从背包到道具栏
				for(i=0;i<20;i++)
				{
					if(MyGoods.gi().goods[2][i].iGid<=0)
					{
						MyGoods.gi().MoveGoods(this.lockgoods1, MyGoods.gi().goods[2][i]);
//						GmProtocol.gi().s_MoveGoods(this.lockgoods1.iGid, this.iStorePoint+10, this.lockgoods1.iPos, -1, 2, i);
//						MyGoods.gi().goods[2][i].copyfrom(this.lockgoods1);
//						this.lockgoods1.iGid=-1;
						this.lockgoods1=null;
						break;
					}
				}
			}
			if(GoodsDraw.bCanMove() && this.lockgoods1!=null)
			{//交换物品
				MyGoods.gi().MoveGoods(this.lockgoods1,GoodsDraw.swaplock);
			}
		}
		
		if((this.lockgoods1==null && this.lockgoods2==null) || this.lockgoods2!=null)
		{
			this.lockgoods2=GoodsDraw.new_LockGoods(x, y, this.iGx2, this.iGy2, MyGoods.gi().goods[2], msg);
			if(GoodsDraw.bCanProc() && this.lockgoods2!=null)
			{//从道具栏到背包
				for(i=0;i<20;i++)
				{
					if(MyGoods.gi().goods[this.iStorePoint+10][i].iGid<=0)
					{
						MyGoods.gi().MoveGoods(this.lockgoods2, MyGoods.gi().goods[this.iStorePoint+10][i]);
//						GmProtocol.gi().s_MoveGoods(this.lockgoods2.iGid, 2, this.lockgoods2.iPos, -1, this.iStorePoint+10, i);
//						MyGoods.gi().goods[this.iStorePoint+10][i].copyfrom(this.lockgoods2);
//						this.lockgoods2.iGid=-1;
						this.lockgoods2=null;
						break;
					}
				}
			}
			if(GoodsDraw.bCanMove() && this.lockgoods2!=null)
			{//交换物品
				MyGoods.gi().MoveGoods(this.lockgoods2,GoodsDraw.swaplock);
			}
		}
		if(this.btn_out.ProcTouch(msg, x, y))
		{
			if(this.btn_out.bCheck())
			{//取出
				InNumber.start(InNumber.IN_OUT, "输入要取出金额", GmMe.me.rbs.iStore, GmMe.me.rbs.iStore);
			}
		}
		if(this.btn_in.ProcTouch(msg, x, y))
		{
			if(this.btn_in.bCheck())
			{//存入
				if(GmMe.me.rbs.iStore+GmMe.me.rbs.iMoney>20000000)
				{
					i=20000000-GmMe.me.rbs.iStore;
				}
				else i=GmMe.me.rbs.iMoney;
				InNumber.start(InNumber.IN_IN, "输入要存入金额", i,i);
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
			return true;
		}
		for(i=0;i<13;i++)
		{
			if(this.btn_switch[i].ProcTouch(msg, x, y))
			{
				if(this.btn_switch[i].bCheck())
				{
					if(i<GoodsStoreFrame.iStoreCount)
					{
						if(i!=this.iStorePoint)
						{
							this.iStorePoint=i;
							XStat.gi().PushStat(XStat.GS_LOADING1);
							GmProtocol.gi().s_OpenStore(0, i,0);
						}
					}
					else if(i==GoodsStoreFrame.iStoreCount)
					{//开启新背包格子
						Confirm1.start(Confirm1.CONFIRM_BUYSTORE,"是否确认花费"+10*(GoodsStoreFrame.iStoreCount-GoodsStoreFrame.MAXFREESTORE+1)+"元宝开启一个仓库？");
					}
				}
			}
		}
//		if(btn_close.ProcTouch(msg, x, y))
//		{
//			if(btn_close.bCheck())
//			{
//				XStat.gi().PopStat(1);
//			}
//			return true;
//		}
		return false;
	}
}

GoodsStoreFrame.MAXFREESTORE=3;

GoodsStoreFrame.iStoreCount;
	
	
GoodsStoreFrame.ResetStoreCount=function( flag8)
	{
		GoodsStoreFrame.iStoreCount=flag8%100+GoodsStoreFrame.MAXFREESTORE;
	}