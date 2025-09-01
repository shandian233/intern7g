
import GameVersion from "../../../../zero/Interface/GameVersion"
import PublicInterface from "../../../../zero/Interface/PublicInterface"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButton from "../../../../engine/control/XButton"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import XInput from "../../../../engine/control/XInput"
import XInputNumber from "../../../../engine/control/XInputNumber"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"

class _SHOPGOODS
{
/*	int iTid;
	int iCount;
	int iPrice;
	int iMoney;
	int iReserve;
	int iBuyLimit;*/
	 _SHOPGOODS()
	{
	}
}

export default class IngotMall extends BaseClass{

	constructor( ani)
	{
		super();
		var i,j;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=920;
		this.iH=550;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.sgs=new Array(20);//
		for(i=0;i<20;i++)this.sgs[i]=new _SHOPGOODS();
		
		this.btn_page=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_page[i]=new XButton(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("按钮2");
		}
		
		this.in_num=new XInputNumber(GmPlay.xani_nui2);
		this.in_num.MinMax(1, 10);
		this.in_num.iNumber=1;
		
		this.btn_buy=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_buy.InitButton("按钮1_110");
		this.btn_buy.sName="购买";
		
		this.btn_charge=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_charge.InitButton("按钮3");
		this.btn_charge.sName="充  值";
		
		
		this.goods=new Array(20);//
		for(i=0;i<20;i++)
		{
			this.goods[i]=new Goods();
			this.goods[i].iPos=i;
		}

		this.iSelect=IngotMall.iLastSelect;
		IngotMall.iLastSelect=0;
		this.btn_select=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_select[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_select[i].InitButton("右侧标签");
//			this.btn_select[i].Move(this.iX+760, this.iY+50+80*i, 30, 80);
//			if(i==0)this.btn_select[i].InitButton("标签按钮上");
//			else if(i==1)this.btn_select[i].InitButton("标签按钮下");
//			else this.btn_select[i].InitButton("标签按钮中");
		}
		this.btn_pay=new Array(8);//
		for(j=0;j<2;j++)
		{
			for(i=0;i<4;i++)
			{
				this.btn_pay[j*4+i]=new XButton(GmPlay.xani_nui3);
				this.btn_pay[j*4+i].Move(this.iX+67+410*j, this.iY+50+100*i, 376, 94);
				this.btn_pay[j*4+i].InitButton("充值大按钮");
			}
		}
		this.btn_pay1=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_pay1.InitButton("按钮1");
		this.btn_pay1.Move(this.iX+this.iW-67-161, this.iY+this.iH-30-53, 161, 53);
		this.btn_pay1.sName="自定义额度";
//		this.btn_pay1.iNameSize=25;
		
		this.in_price=new XInputNumber(GmPlay.xani_nui2);
//		this.in_price.Move(this.iX+140, this.iY+20,this.iW-160);
		this.in_price.iNumber=1;
		this.in_price.MinMax(1, 1000);
		
		this.btn_act=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_act.InitButton("感叹提示");
		this.btn_act.Move(this.iX+67, this.iY+this.iH-30-26-32, 65, 65);
		this.bShowAct=false;
	}

	Draw_0()
	{
		this.btn_page[0].sName="热卖品";
		this.btn_page[1].sName="装备相关";
		this.btn_page[2].sName="宠物相关";
		this.btn_page[3].sName="二级丹药";
		this.btn_page[4].sName="三级草药";
		this.btn_page[5].sName="其他";
		this.btn_page[6].sName="铜币区";
		var i;
		DrawMode.new_framein(this.iX+30, this.iY+30, 145+40, this.iH-60);
		for(i=0;i<7;i++)
		{
			this.btn_page[i].Move(this.iX+30+20, this.iY+30+20+i*(56+11), 145, 56);
			if(this.iPage==i)
			{
//				GmPlay.xani_ui3.DrawAnimaEx(this.iX+30+20, this.iY+30+20+i*(56+14), "选中背景",0,101,0.9f,0.71f,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32

				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
		}
		
//		GmPlay.xani_ui3.DrawAnima(this.iX+190, this.iY, "大框分割线",0);
		
		var offx,offy,offw,offh;
		offx=this.iX+30+145+40+20;
		offy=this.iY+30;
		offw=this.iW-60-145-40-20;
		DrawMode.new_framein(offx, offy, offw,345+40);
		this.iGx=offx+20;
		this.iGy=offy+20;
		GoodsDraw.new_DrawGoods(this.iGx,this.iGy, this.goods, null, null);
		offx+=20+430+15;
		offy+=20;
		if(this.lockgoods!=null)
		{
			DrawMode.new_TagText2(offx, offy, 100, "名称", GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
			offy+=50;
			if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney>0)
			{
				i=this.sgs[this.lockgoods.iPos].iMoney;
				DrawMode.new_TagText2(offx, offy, 100, "单价", (i%10000)==0?(i/10000)+"万铜币":i+"铜币");
			}
			else DrawMode.new_TagText2(offx, offy, 100, "单价", this.sgs[this.lockgoods.iPos].iPrice+"元宝");
			offy+=50;
			//数量
			M3DFast.gi().DrawTextEx(offx, offy+25, "数量:", 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			this.in_num.Move(offx+67, offy, 100);
			this.in_num.Draw();
			
			offy+=70;
			if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney>0)
			{
				i=this.sgs[this.lockgoods.iPos].iMoney*this.in_num.iNumber;
				DrawMode.new_TagText2(offx, offy, 100, "总价", (i%10000)==0?(i/10000)+"万铜币":i+"铜币");
			}
			else DrawMode.new_TagText2(offx, offy, 100, "总价", this.sgs[this.lockgoods.iPos].iPrice*this.in_num.iNumber+"元宝");
			offy+=100;
			this.btn_buy.Move(offx+57, offy, 110, 52);
			this.btn_buy.Draw();
		}
		
		offx=this.iX+30+40+145+20;
		offy=this.iY+30+20+345+20+20;
		offh=this.iH-60-345-40-20;
		DrawMode.new_framein(offx,offy, offw,offh);
		
		DrawMode.new_TagText2(offx+20, offy+(offh-32)/2, 150, "元宝", ""+GmMe.me.rbs.iInGot);
		DrawMode.new_TagText2(offx+20+235, offy+(offh-32)/2, 150, "铜币", ""+GmMe.me.rbs.iMoney);
//		GmPlay.xani_ui.DrawAnimaEx(offx+20,offy+17, "元宝", 0, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(offx+20+40, offy+20, ""+ 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(offx+20+40+200, offy+20, "1元=10元宝", 0xffffff00, 20, 101, 1, 1, 0, 0, 0);
		this.btn_charge.Move(offx+490,offy+(offh/2-49/2),141,49);
		this.btn_charge.Draw();
		
		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iGx, this.iGy, this.goods, this.lockgoods, 0);
		}
		if(GoodsDraw.bShowDetail())GoodsDraw.new_DrawDetail(null, -1, -1,0);
	}
	Draw_1()
	{
		var i;
		for(i=0;i<8;i++)
		{
			this.btn_pay[i].Draw();
			GmPlay.xani_nui3.DrawAnima(this.btn_pay[i].iX+7, this.btn_pay[i].iY+7, "充值图标",i);
			M3DFast.gi().DrawText_2(this.btn_pay[i].iX+7+80+7,this.btn_pay[i].iY+12+17, "￥"+IngotMall.amount[i]+"="+IngotMall.amount[i]*10+"元宝", 0xffffffff, 28, 101, 1, 1, 0, 0, -2, 1, 0xff000000);
			if(IngotMall.iAddType==1)
			{//加送元宝
				if(i>=4)
				{
					GmPlay.xani_nui3.DrawAnima(this.btn_pay[i].iX, this.btn_pay[i].iY, "加送标签",i-4);
					M3DFast.gi().DrawTextEx(this.btn_pay[i].iX+7+80+7,this.btn_pay[i].iY+12+17+38, "加送"+IngotMall.addmount[i]+"元宝", 0xffff00ff, 28, 101, 1, 1, 0, 0, -2);
				}
			}
			if(IngotMall.iAddType==2)
			{//加送礼包
				if(i>=4)
				{
					GmPlay.xani_nui3.DrawAnima(this.btn_pay[i].iX, this.btn_pay[i].iY, "加送标签",4);
					M3DFast.gi().DrawTextEx(this.btn_pay[i].iX+7+80+7,this.btn_pay[i].iY+12+17+38, "送：充值礼包 x "+IngotMall.addlibao[i]+"", 0xffff00ff, 28, 101, 1, 1, 0, 0, -2);
				}
			}
//			if(PublicInterface.gi().QUDAO()==2)M3DFast.gi().DrawText_2(this.btn_pay[i].iX+16,this.btn_pay[i].iY+34, IngotMall.amount[i]+"个91豆", 0xffffffff, 20, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
//			else M3DFast.gi().DrawText_2(this.btn_pay[i].iX+16,this.btn_pay[i].iY+34, "￥"+IngotMall.amount[i], 0xffffffff, 20, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
//			M3DFast.gi().DrawText_2(this.btn_pay[i].iX+285,this.btn_pay[i].iY+34, IngotMall.amount[i]*IngotMall.addmount[i]/10+"元宝", 0xffffffff, 20, 101, 1, 1, 0, -3, -2, 3, 0xff000000);
		}
//		if(this.sTitle.length>0)M3DFast.gi().DrawTextEx(this.btn_pay[0].iX,this.btn_pay1.iY+12, this.sTitle, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		this.btn_act.Move(this.btn_pay[0].iX, this.iY+this.iH-30-26-32, 65, 65);
		this.btn_act.Draw();
		M3DFast.gi().DrawTextEx(this.btn_pay[0].iX+70,this.btn_act.iY+32, "充值活动", 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
		if(this.bShowAct)
		{
//			var ox=this.btn_pay[0].iX+32;
//			var oy=this.btn_act.iY+32-;
		}
		if(this.CanDefine(GameVersion.QUDAO))
		{//充值金额
			M3DFast.gi().DrawTextEx(this.btn_pay1.iX-130-190, this.btn_pay1.iY+12, "充值金额(元):", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			this.in_price.Move(this.btn_pay1.iX-130, this.btn_pay1.iY+2, 120);
			this.in_price.Draw();
			this.btn_pay1.Draw();
		}
	}
	 CanDefine( i)
	{//3当乐，5木蚂蚁，禁止自定义额度
//		if(i==3)return false;
//		if(i==5)return false;
		return true;
	}
	
	Draw_2()
	{
		this.btn_page[0].sName="储备区";
//		this.btn_page[1].sName="装备相关";
//		this.btn_page[2].sName="宠物相关";
//		this.btn_page[3].sName="二级丹药";
//		this.btn_page[4].sName="三级草药";
//		this.btn_page[5].sName="其他";
//		this.btn_page[6].sName="铜币区";
		var i;
		DrawMode.new_framein(this.iX+30, this.iY+30, 145+40, this.iH-60);
		for(i=0;i<1;i++)
		{
			this.btn_page[i].Move(this.iX+30+20, this.iY+30+20+i*(56+11), 145, 56);
			if(this.iPage==i)
			{
//				GmPlay.xani_ui3.DrawAnimaEx(this.iX+30+20, this.iY+30+20+i*(56+14), "选中背景",0,101,0.9f,0.71f,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32

				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
		}
		
//		GmPlay.xani_ui3.DrawAnima(this.iX+190, this.iY, "大框分割线",0);
		
		var offx,offy,offw,offh;
		offx=this.iX+30+145+40+20;
		offy=this.iY+30;
		offw=this.iW-60-145-40-20;
		DrawMode.new_framein(offx, offy, offw,345+40);
		this.iGx=offx+20;
		this.iGy=offy+20;
		GoodsDraw.new_DrawGoods(this.iGx,this.iGy, this.goods, null, null);
		offx+=20+430+15;
		offy+=20;
		if(this.lockgoods!=null)
		{//cxunmz
			DrawMode.new_TagText2(offx, offy, 100, "名称", GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
			offy+=50;
			if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney==0 && this.sgs[this.lockgoods.iPos].iReserve>0)
			{
				i=this.sgs[this.lockgoods.iPos].iReserve;
				DrawMode.new_TagText2(offx, offy, 100, "单价", (i%10000)==0?(i/10000)+"万绑铜":i+"绑铜");
			}
			else if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney>0)
			{
				i=this.sgs[this.lockgoods.iPos].iMoney;
				DrawMode.new_TagText2(offx, offy, 100, "单价", (i%10000)==0?(i/10000)+"万铜币":i+"铜币");
			}
			else DrawMode.new_TagText2(offx, offy, 100, "单价", this.sgs[this.lockgoods.iPos].iPrice+"元宝");
			offy+=50;
			//数量
			M3DFast.gi().DrawTextEx(offx, offy+25, "数量:", 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			this.in_num.Move(offx+67, offy, 100);
			this.in_num.Draw();
			
			offy+=70;
			if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney==0 && this.sgs[this.lockgoods.iPos].iReserve>0)
			{
				i=this.sgs[this.lockgoods.iPos].iReserve*this.in_num.iNumber;
				DrawMode.new_TagText2(offx, offy, 100, "总价", (i%10000)==0?(i/10000)+"万绑铜":i+"绑铜");
			}
			else if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney>0)
			{
				i=this.sgs[this.lockgoods.iPos].iMoney*this.in_num.iNumber;
				DrawMode.new_TagText2(offx, offy, 100, "总价", (i%10000)==0?(i/10000)+"万铜币":i+"铜币");
			}
			else DrawMode.new_TagText2(offx, offy, 100, "总价", this.sgs[this.lockgoods.iPos].iPrice*this.in_num.iNumber+"元宝");
			
			if(this.sgs[this.lockgoods.iPos].iBuyLimit>0)M3DFast.gi().DrawTextEx(offx, offy + 60, "每日限购:"+this.sgs[this.lockgoods.iPos].iBuyLimit, 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			
			offy+=100;
			this.btn_buy.Move(offx+57, offy, 110, 52);
			this.btn_buy.Draw();
		}
		
		offx=this.iX+30+40+145+20;
		offy=this.iY+30+20+345+20+20;
		offh=this.iH-60-345-40-20;
		DrawMode.new_framein(offx,offy, offw,offh);
		
		DrawMode.new_TagText2(offx+20, offy+(offh-32)/2, 150, "元宝", ""+GmMe.me.rbs.iInGot);
		DrawMode.new_TagText2(offx+20+235, offy+(offh-32)/2, 150, "绑铜", ""+GmMe.me.rbs.iReserve);
//		GmPlay.xani_ui.DrawAnimaEx(offx+20,offy+17, "元宝", 0, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(offx+20+40, offy+20, ""+ 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(offx+20+40+200, offy+20, "1元=10元宝", 0xffffff00, 20, 101, 1, 1, 0, 0, 0);
		this.btn_charge.Move(offx+490,offy+(offh/2-49/2),141,49);
		this.btn_charge.Draw();
		
		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iGx, this.iGy, this.goods, this.lockgoods, 0);
		}
		if(GoodsDraw.bShowDetail())GoodsDraw.new_DrawDetail(null, -1, -1,0);
	}
	Draw()
	{
		var i;
		
		if(this.iSelect==0)DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH,"商","城");
		else if(this.iSelect==1)DrawMode.new_baseframe4(this.iX, this.iY, this.iW, this.iH,"绑","定","商","城");
		else DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH,"充","值");
		this.btn_close.Draw();
		for(i=0;i<3;i++)
		{
			this.btn_select[i].Move(this.iX+this.iW-15, this.iY+40+130*i, 50, 130);
			if(this.iSelect==i)this.btn_select[i].bMouseDown=true;
			this.btn_select[i].Draw();
			if(i==0)DrawMode.new_lableword2(this.iX+this.iW-15, this.iY+40+130*i, 40, 130,this.iSelect==i,"商","城");
			else if(i==1)DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+46+130*i, 40, 70,this.iSelect==i,"绑","定","商","城");
			else DrawMode.new_lableword2(this.iX+this.iW-15, this.iY+40+130*i, 40, 130,this.iSelect==i,"充","值");
//			if(i==0)DrawMode.ui3_TagText2(this.btn_select[i].iX, this.btn_select[i].iY,"商","城");
//			else if(i==1)DrawMode.ui3_TagText2(this.btn_select[i].iX, this.btn_select[i].iY,"充","值");
		}
		switch(this.iSelect)
		{
		case 0:
			this.Draw_0();
			break;
		case 1:
			this.Draw_2();
			break;
		case 2:
			this.Draw_1();
			break;
		}
//		GmPlay.xani_nui2.DrawAnima(0, 0, "按钮2",0);

	}
	ProcTouch( msg, x, y)
	{
		this.bShowAct=false;
		if(this.iSelect==2)
		{
			if(this.CanDefine(GameVersion.QUDAO))
			{
				if(this.in_price.ProcTouch(msg, x, y))return true;
			}
		}
		var i;
		if(this.iSelect==0)
		{
			if(this.lockgoods!=null)
			{
				if(this.in_num.ProcTouch(msg, x, y))return true;
				if(this.btn_buy.ProcTouch(msg, x, y))
				{
					if(this.btn_buy.bCheck())
					{
						if(this.in_num.iNumber>=1 && this.in_num.iNumber<=10)
						{
							if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney>0)
							{
								if(GmMe.me.rbs.iMoney<this.sgs[this.lockgoods.iPos].iMoney*this.in_num.iNumber)EasyMessage.easymsg.AddMessage("铜币不足");
								else
								{
									for(i=0;i<this.in_num.iNumber;i++)
									{
										//PublicInterface.gi().mta_record(5, this.sgs[this.lockgoods.iPos].iPrice, GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
										GmProtocol.gi().s_IngotMallBuy(this.iShopId, this.sgs[this.lockgoods.iPos].iTid, this.sgs[this.lockgoods.iPos].iCount);
									}
									XStat.gi().PushStat(XStat.GS_LOADING1);
								}
							}
							else
							{
								if(GmMe.me.rbs.iInGot<this.sgs[this.lockgoods.iPos].iPrice*this.in_num.iNumber)EasyMessage.easymsg.AddMessage("元宝不足");
								else
								{
									for(i=0;i<this.in_num.iNumber;i++)
									{
										PublicInterface.gi().mta_record(5, this.sgs[this.lockgoods.iPos].iPrice, GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
										GmProtocol.gi().s_IngotMallBuy(this.iShopId, this.sgs[this.lockgoods.iPos].iTid, this.sgs[this.lockgoods.iPos].iCount);
									}
									XStat.gi().PushStat(XStat.GS_LOADING1);
								}
							}
						}
					}
					return true;
				}
			}
			else this.in_num.iNumber=1;
			
			this.lockgoods=GoodsDraw.new_LockGoods(x,y, this.iGx,this.iGy, this.goods, msg);
			GoodsDraw.NoMove();
			if(this.lockgoods!=null)
			{
				if(this.lockgoods.iTid==121)
				{
					this.in_num.MinMax(1, 1);
					this.in_num.iNumber=1;
				}
				else this.in_num.MinMax(1, 10);
			}
			
			if(this.btn_charge.ProcTouch(msg, x, y))
			{
				if(this.btn_charge.bCheck())
				{
					this.iSelect=2;
//					PublicInterface.gi().Pay(0);
				}
			}

			for(i=0;i<7;i++)
			{
				if(this.btn_page[i].ProcTouch(msg, x, y))
				{
					if(this.btn_page[i].bCheck())
					{//获取不同页的道具列表
						this.iPage=i;
						GmProtocol.gi().s_IngotMall(this.iPage, 0);
					}
				}
			}
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<3;i++)
		{
			if(this.btn_select[i].ProcTouch(msg, x, y))
			{
				if(this.btn_select[i].bCheck())
				{
					if(i!=this.iSelect)
					{
						this.iSelect=i;
						this.iPage = 0;
						if(this.iSelect==0)GmProtocol.gi().s_IngotMall(this.iPage, 0);
						if (this.iSelect == 1)GmProtocol.gi().s_IngotMall(10 + this.iPage, 1);
					}
				}
//				return true;
			}
		}
		if(this.iSelect==1)
		{
			if(this.lockgoods!=null)
			{
				if(this.in_num.ProcTouch(msg, x, y))return true;
				if(this.btn_buy.ProcTouch(msg, x, y))
				{
					if(this.btn_buy.bCheck())
					{
						if(this.in_num.iNumber>=1 && this.in_num.iNumber<=10)
						{
							if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney==0 && this.sgs[this.lockgoods.iPos].iReserve>0)
							{
								if(GmMe.me.rbs.iReserve<this.sgs[this.lockgoods.iPos].iReserve*this.in_num.iNumber)EasyMessage.easymsg.AddMessage("绑铜不足");
								else
								{
									for(i=0;i<this.in_num.iNumber;i++)
									{
										//PublicInterface.gi().mta_record(5, this.sgs[this.lockgoods.iPos].iPrice, GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
										GmProtocol.gi().s_IngotMallBuy(this.iShopId, this.sgs[this.lockgoods.iPos].iTid, this.sgs[this.lockgoods.iPos].iCount);
									}
									XStat.gi().PushStat(XStat.GS_LOADING1);
								}
							}
							else if(this.sgs[this.lockgoods.iPos].iPrice==0 && this.sgs[this.lockgoods.iPos].iMoney>0)
							{
								if(GmMe.me.rbs.iMoney<this.sgs[this.lockgoods.iPos].iMoney*this.in_num.iNumber)EasyMessage.easymsg.AddMessage("铜币不足");
								else
								{
									for(i=0;i<this.in_num.iNumber;i++)
									{
										//PublicInterface.gi().mta_record(5, this.sgs[this.lockgoods.iPos].iPrice, GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
										GmProtocol.gi().s_IngotMallBuy(this.iShopId, this.sgs[this.lockgoods.iPos].iTid, this.sgs[this.lockgoods.iPos].iCount);
									}
									XStat.gi().PushStat(XStat.GS_LOADING1);
								}
							}
							else
							{
								if(GmMe.me.rbs.iInGot<this.sgs[this.lockgoods.iPos].iPrice*this.in_num.iNumber)EasyMessage.easymsg.AddMessage("元宝不足");
								else
								{
									for(i=0;i<this.in_num.iNumber;i++)
									{
										PublicInterface.gi().mta_record(5, this.sgs[this.lockgoods.iPos].iPrice, GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4));
										GmProtocol.gi().s_IngotMallBuy(this.iShopId, this.sgs[this.lockgoods.iPos].iTid, this.sgs[this.lockgoods.iPos].iCount);
									}
									XStat.gi().PushStat(XStat.GS_LOADING1);
								}
							}
						}
					}
					return true;
				}
			}
			else this.in_num.iNumber=1;
			
			this.lockgoods=GoodsDraw.new_LockGoods(x,y, this.iGx,this.iGy, this.goods, msg);
			GoodsDraw.NoMove();
			if(this.lockgoods!=null)
			{
				if(this.lockgoods.iTid==121)
				{
					this.in_num.MinMax(1, 1);
					this.in_num.iNumber=1;
				}
				else this.in_num.MinMax(1, 10);
			}
			
			if(this.btn_charge.ProcTouch(msg, x, y))
			{
				if(this.btn_charge.bCheck())
				{
					this.iSelect=2;
//					PublicInterface.gi().Pay(0);
				}
			}

			for(i=0;i<1;i++)
			{
				if(this.btn_page[i].ProcTouch(msg, x, y))
				{
					if(this.btn_page[i].bCheck())
					{//获取不同页的道具列表
						this.iPage=i;
						GmProtocol.gi().s_IngotMall(this.iPage+10, 1);
					}
				}
			}
		}
		if(this.iSelect==2)
		{//充值界面
			for(i=0;i<8;i++)
			{
				if(this.btn_pay[i].ProcTouch(msg, x, y))
				{
					if(this.btn_pay[i].bCheck())
					{
						PublicInterface.gi().Pay(IngotMall.amount[i]);
					}
				}
			}
			if(this.btn_act.ProcTouch(msg, x, y))
			{
				if(this.btn_act.bCheck())
				{
					this.bShowAct=!this.bShowAct;
					FrameMessage.fm.Open("1，单次充值50元可参与神兽抽奖活动，详情请在西阳城神兽使者处查询");
				}
			}
			if(this.CanDefine(GameVersion.QUDAO))
			{
				if(this.btn_pay1.ProcTouch(msg, x, y))
				{
					if(this.btn_pay1.bCheck())
					{
						i=this.in_price.iNumber;
						if(i<1 || i>1000)EasyMessage.easymsg.AddMessage("充值额度为1~1000");
						else PublicInterface.gi().Pay(i);
					}
				}
			}
		}

		return false;
	}
}

IngotMall.iAddType=0;///0无奖励，1加送元宝，2加送充值礼包

IngotMall.iLastSelect=0;

IngotMall.amount=[10,20,30,50,100,300,500,1000];
IngotMall.addmount=[0,0,0,0,50,300,750,2000];
IngotMall.addlibao=[0,0,0,0,1,4,8,20];

IngotMall.OpenEx=function()
	{//仅打开充值界面
		GmProtocol.gi().s_IngotMall(0, 2);
	}
    IngotMall.OPEN=function( pls)
	{
		var i,j;
		if(XStat.gi().iXStat!=XStat.GS_INGOTMALL)
		{
			XStat.gi().PushStat(XStat.GS_INGOTMALL);
		}
		var im=XStat.gi().LastStat(0);
		im.iShopId=pls.GetNextInt();
		im.sShopName=pls.GetNextString();
		
		for(i=0;i<20;i++)
		{
			im.goods[i].iGid=-1;
		}
		
		i=0;
		while(true)
		{
			im.sgs[i].iTid=pls.GetNextInt();
			if(im.sgs[i].iTid==-1)break;
			im.sgs[i].iCount=pls.GetNextInt();
			im.sgs[i].iPrice=pls.GetNextInt();
			im.sgs[i].iMoney=pls.GetNextInt();
			im.sgs[i].iReserve=pls.GetNextInt();
			im.sgs[i].iBuyLimit=pls.GetNextByte();
			
			im.goods[i].iGid=1;
			im.goods[i].iTid=im.sgs[i].iTid;
			im.goods[i].iCount=im.sgs[i].iCount;
			for(j=0;j<8;j++)im.goods[i].iAtts[j]=0;
			GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(im.goods[i].iTid, -1, 10), im.goods[i].aa);
			i++;
		}
		im.iSgCount=i;
		im.lockgoods=null;
		im.sTitle=pls.GetNextString();
		IngotMall.iAddType=pls.GetNextByte();
		im.iPage=pls.GetNextByte();
		im.iSelect=pls.GetNextByte();
//		IngotMall.iAddType=2;
	}