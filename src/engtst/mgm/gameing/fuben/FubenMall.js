
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
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"

class _SHOPGOODS
{
/*	int iFlag;
	int iTid;
	int iCount;
	int iPrice;*/
	constructor()
	{

	}
}
export default class FubenMall extends BaseClass{

	 constructor( ani)
	{
		super();
        this.sTitle="";
		var i,j;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=800;
		this.iH=405;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.sgs=new Array(20);//
		for(i=0;i<20;i++)this.sgs[i]=new _SHOPGOODS();
		

		
		this.btn_buy=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_buy.InitButton("按钮1_110");
		this.btn_buy.sName="兑换";
		
		this.goods=new Array(20);//
		for(i=0;i<20;i++)
		{
			this.goods[i]=new Goods();
			this.goods[i].iPos=i;
		}
	}

	Draw_0()
	{
		var i;
		
		var offx,offy;
		offx=this.iX+30;
		offy=this.iY+30;
		GoodsDraw.new_DrawGoods(offx, offy, this.goods, null, null);
		
//		offx=this.iX+240;
//		offy=this.iY+this.iH-60-60;
//		DrawMode.Frame1_BR(offx,offy, this.iW-250-40, 60);
//		GmPlay.xani_ui.DrawAnimaEx(offx+10,offy+17, "元宝", 0, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(offx+10+40, offy+20, ""+GmMe.me.rbs.iInGot, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(offx+10+40+200, offy+20, "1元=10元宝", 0xffffff00, 20, 101, 1, 1, 0, 0, 0);
		
		M3DFast.gi().DrawTextEx(offx+430+20, offy+10, "拥有:"+GmMe.me.iFlag[25]+"积分", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		if(this.lockgoods!=null)
		{
			M3DFast.gi().DrawTextEx(offx+430+20, offy+10+50, "名称:"+GmPlay.de_goods.strValue(this.lockgoods.iTid, 0, 4), 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(offx+430+20, offy+10+50*2, "数量:1", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(offx+430+20, offy+10+50*3, "价格:"+this.sgs[this.lockgoods.iPos].iPrice+"积分", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			this.btn_buy.Move(this.iX+this.iW-110-30, this.iY+this.iH-30-52, 110, 52);
			this.btn_buy.Draw();
			GoodsDraw.new_DrawRect(offx, offy, this.goods, this.lockgoods, 0);
		}
		if(GoodsDraw.bShowDetail())GoodsDraw.new_DrawDetail(null, -1, -1,0);
	}

	Draw()
	{
//		var i;
//		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		this.btn_close.Draw();

		this.Draw_0();
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

		var offx,offy;

		offx=this.iX+30;
		offy=this.iY+30;
		
		if(this.lockgoods!=null)
		{
			if(this.btn_buy.ProcTouch(msg, x, y))
			{
				if(this.btn_buy.bCheck())
				{
					if(GmMe.me.iFlag[25]<this.sgs[this.lockgoods.iPos].iPrice)EasyMessage.easymsg.AddMessage("积分不足");
					else
					{
						GmProtocol.gi().s_FubenMallBuy(this.sgs[this.lockgoods.iPos].iFlag, this.sgs[this.lockgoods.iPos].iTid, this.sgs[this.lockgoods.iPos].iPrice);
						XStat.gi().PushStat(XStat.GS_LOADING1);
					}
				}
				return true;
			}
		}
		
		this.lockgoods=GoodsDraw.new_LockGoods(x, y, offx, offy, this.goods, msg);
		GoodsDraw.NoMove();

		return false;
	}
}
FubenMall.OPEN=function( pls)
	{
		var i,j;
		if(XStat.gi().iXStat!=XStat.GS_FUBENMALL)
		{
			XStat.gi().PushStat(XStat.GS_FUBENMALL);
		}
		var im=XStat.gi().LastStat(0);
		im.iShopId=pls.GetNextInt();
		im.sShopName=pls.GetNextString();
//		im.iSgCount=pls.GetNextInt();
		
		if(im.iShopId!=0)
		{
			XStat.gi().PopStat(1);
			return;
		}
		for(i=0;i<20;i++)
		{
			im.goods[i].iGid=-1;
		}
		
		i=0;
		while(true)
		{//下标，类型，价格
			im.sgs[i].iFlag=pls.GetNextInt();
			if(im.sgs[i].iFlag==-1)break;
			im.sgs[i].iTid=pls.GetNextInt();
			im.sgs[i].iPrice=pls.GetNextInt();
			im.sgs[i].iCount=1;

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
	}