//宠物进阶升星

import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx1 from "../../../../../../engine/control/XButtonEx1"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import MyFT from "../../../../../../engtst/mgm/gameing/fteam/MyFT"
import Goods from "../../../../../../engtst/mgm/gameing/me/goods/Goods"
import MyGoods from "../../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../../engtst/mgm/gameing/me/pet/Pets"

export default class MergeZR extends BaseClass{

	
	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=550;
		this.iH=410;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_one=new XButtonEx1(GmPlay.xani_button);
		this.btn_one.Move(this.iX + 20, this.iY + this.iH - 20-60, 150, 60);
		this.btn_one.InitButton("1号按钮150_60");
		this.btn_one.sName="融合一次";
		
		this.btn_all=new XButtonEx1(GmPlay.xani_button);
		this.btn_all.Move(this.iX + this.iW - 150 - 20, this.iY + this.iH - 20-60, 150, 60);
		this.btn_all.InitButton("1号按钮150_60");
		this.btn_all.sName="融合全部";
		
		this.btn_close=new XButtonEx1(GmPlay.xani_button);
		this.btn_close.Move(this.iX + this.iW - 35, this.iY - 25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
	}
	
	Draw()
	{
		var offx,offy;
		DrawMode.frame_type4("10号框20_20",this.iX, this.iY, this.iW, this.iH,20,20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+15, "融合自然之力", 0xffffC800, 40, 101, 1, 1, 0, -2, 0,2,0xff000000);
		
		offx=this.iX+20;
		offy=this.iY+70;
		
		GmPlay.xani_nui3.DrawAnima(offx,offy,"物品格子", 0);
		GmPlay.xani_ngoods.DrawAnima_aa(offx, offy, GmPlay.de_goods.strValue(this.gp.iTid, 0, 10), 0);
		if(this.gp.iCount<=2)this.pm3f.DrawTextEx(offx+85, offy+25, GmPlay.de_goods.strValue(this.gp.iTid, 0, 4)+" x "+this.gp.iCount, 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
		else this.pm3f.DrawTextEx(offx+85, offy+25, GmPlay.de_goods.strValue(this.gp.iTid, 0, 4)+" x "+this.gp.iCount, 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
		
		offy+=100;
		DrawMode.frame_type4("11号框20_20", offx, offy, this.iW-40, 145, 20, 20);
		offx += 10;
		offy += 10;
		this.pm3f.DrawTextEx(offx, offy, "融合规则：", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx, offy+25, "3个一级自然之力+3万铜币=1个二级自然之力", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx, offy+25*2, "3个二级自然之力+3万铜币+10元宝=1个三级自然之力", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx, offy+25*3, "3个三级自然之力+3万铜币+20元宝=1个四级自然之力", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx, offy+25*4, "3个四级自然之力+3万铜币+30元宝=1个五级自然之力", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
//		this.pm3f.DrawTextEx(this.iX+20, this.iY+this.iH-20-15, "注：每次进阶可提升每项5点固定属性和25点可分配属性", 0xffffC800, 20, 101, 1, 1, 0,0,0);
		
		this.btn_one.Draw();
		this.btn_all.Draw();
		this.btn_close.Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_MERGEONE))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_FTOperate(8, 1, this.gp.iGid);
				XStat.gi().PopStat(1);
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_MERGEALL))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_FTOperate(8, 2, this.gp.iGid);
				XStat.gi().PopStat(1);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_one.ProcTouch(msg, x, y))
		{
			if(this.btn_one.bCheck())
			{
				if(this.gp.iTid==285)Confirm1.start(Confirm1.CONFIRM_MERGEONE, "3个一级自然之力+3万铜币=1个二级自然之力#e是否确定融合？");
				else if(this.gp.iTid==286)Confirm1.start(Confirm1.CONFIRM_MERGEONE, "3个二级自然之力+3万铜币+10元宝=1个三级自然之力#e是否确定融合？");
				else if(this.gp.iTid==287)Confirm1.start(Confirm1.CONFIRM_MERGEONE, "3个三级自然之力+3万铜币+20元宝=1个四级自然之力#e是否确定融合？");
				else if(this.gp.iTid==288)Confirm1.start(Confirm1.CONFIRM_MERGEONE, "3个四级自然之力+3万铜币+30元宝=1个五级自然之力#e是否确定融合？");
			}
			return true;
		}
		if(this.btn_all.ProcTouch(msg, x, y))
		{
			if(this.btn_all.bCheck())
			{
				i=this.gp.iCount/3;
				if(this.gp.iTid==285)Confirm1.start(Confirm1.CONFIRM_MERGEALL, i*3+"个一级自然之力+"+i*3+"万铜币="+i+"个二级自然之力#e是否确定融合？");
				else if(this.gp.iTid==286)Confirm1.start(Confirm1.CONFIRM_MERGEALL,  i*3+"个二级自然之力+"+i*3+"万铜币+"+i*10+"元宝="+i+"个三级自然之力#e是否确定融合？");
				else if(this.gp.iTid==287)Confirm1.start(Confirm1.CONFIRM_MERGEALL,  i*3+"个三级自然之力+"+i*3+"万铜币+"+i*20+"元宝="+i+"个四级自然之力#e是否确定融合？");
				else if(this.gp.iTid==288)Confirm1.start(Confirm1.CONFIRM_MERGEALL,  i*3+"个四级自然之力+"+i*3+"万铜币+"+i*30+"元宝="+i+"个五级自然之力#e是否确定融合？");
			}
			return true;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}
MergeZR.Open=function()
	{
		if(MyGoods.gi().goods[2][0].iGid<=0 ||
				(MyGoods.gi().goods[2][0].iTid!=285 &&
						MyGoods.gi().goods[2][0].iTid!=286 &&
						MyGoods.gi().goods[2][0].iTid!=287 &&
						MyGoods.gi().goods[2][0].iTid!=288))
		{
			FrameMessage.fm.Open("请先将待融合的自然之力放到物品栏第一格");
			return;
		}
		
		var mzr;
		
		if(XStat.gi().iXStat==XStat.GS_MERGEZR)
		{
			mzr= XStat.gi().oCurrentView;
		}
		else mzr=XStat.gi().PushStat(XStat.GS_MERGEZR);
		
		mzr.gp=MyGoods.gi().goods[2][0];
	}