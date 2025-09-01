//宠物进阶升星

import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx1 from "../../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
import MyFT from "../../../../../../engtst/mgm/gameing/fteam/MyFT"
import MyGoods from "../../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../../engtst/mgm/gameing/me/pet/Pets"

export default class JJPet extends BaseClass{
	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=600;
		this.iH=360;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_jj=new XButtonEx2(GmPlay.xani_button);
		this.btn_jj.Move(this.iX+this.iW-120-30,this.iY+this.iH- 30-60, 120, 60);
		this.btn_jj.InitButton("1号按钮120_60");
		this.btn_jj.sName="进 阶";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX + this.iW - 35, this.iY - 25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
		
		this.iPetPoint=-1;
	}
	
	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+15, "宠物进阶", 0xfffeec7e, 40, 101, 1, 1, 0, -2, 0, 2, 0xff01152e);
		
		this.pm3f.DrawTextEx(this.iX+20, this.iY+this.iH-20-15, "注：每次进阶可提升每项5点固定属性和25点可分配属性", 0xff114e61, 20, 101, 1, 1, 0,0,0);
		
		offx=this.iX+20;
		offy=this.iY+60;
		
		DrawMode.frame_type4("11号框20_20",offx, offy, 200, 30 * 8 + 10,20,20);
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			if(this.iPetPoint==i)
			{
				DrawMode.frame_type1("12号框20_30", offx + 5, offy + 5 + i * 30, 190, 20);
			}
			this.pm3f.DrawTextEx(offx+5, offy+5+i*30, MyPets.mp.pets[i].sName, 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		}

		this.iCanJJ=0;
		offx=this.iX+240;
		offy=this.iY+70;
		if(this.iPetPoint>=0 && this.iPetPoint<MyPets.mp.iPetCount)
		{
			var pet=MyPets.mp.pets[this.iPetPoint];
			if(pet.iStar>=5)
			{//
				this.pm3f.DrawTextEx(offx, offy, "当前宠物已进阶至最高", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
			}
			else
			{
				var iNeedLev=(pet.iStar+1)*20;
				var iGType1=280+pet.iStar;
				var iGType2=285+pet.iStar;
				
				if(pet.iLev<iNeedLev)this.pm3f.DrawTextEx(offx, offy, "等级："+pet.iLev+"(>="+iNeedLev+")", 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
				else
				{
					this.pm3f.DrawTextEx(offx, offy, "等级："+pet.iLev+"(>="+iNeedLev+")", 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
					this.iCanJJ|=1;
				}
				
				for(i=0;i<20;i++)
				{
					if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==iGType1)
					{
						this.iCanJJ|=2;
					}
					if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==iGType2 && MyGoods.gi().goods[2][i].iCount>=30)
					{
						this.iCanJJ|=4;
					}
				}
				GmPlay.xani_nui3.DrawAnima(offx,offy+40,"物品格子", 0);
				GmPlay.xani_ngoods.DrawAnima_aa(offx, offy+40, GmPlay.de_goods.strValue(iGType1, 0, 10), 0);
				if((this.iCanJJ&2)==0)this.pm3f.DrawTextEx(offx+85, offy+40+25, GmPlay.de_goods.strValue(iGType1, 0, 4)+" x 1", 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
				else this.pm3f.DrawTextEx(offx+85, offy+40+25, GmPlay.de_goods.strValue(iGType1, 0, 4)+" x 1", 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
				
				GmPlay.xani_nui3.DrawAnima(offx,offy+40+100,"物品格子", 0);
				GmPlay.xani_ngoods.DrawAnima_aa(offx, offy+40+100, GmPlay.de_goods.strValue(iGType2, 0, 10), 0);
				if((this.iCanJJ&4)==0)this.pm3f.DrawTextEx(offx+85, offy+40+100+25, GmPlay.de_goods.strValue(iGType2, 0, 4)+" x 30", 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
				else this.pm3f.DrawTextEx(offx+85, offy+40+100+25, GmPlay.de_goods.strValue(iGType2, 0, 4)+" x 30", 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			}
		}
		
//		this.pm3f.DrawTextEx(this.iX+40,this.iY+80, "战队队长："+sLeader+"("+iRid+")", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
//		DrawMode.ui3_Text2(this.iX+20, this.iY+50, 100, 200,"队长", sLeader+"("+iRid+")");
		if(this.iCanJJ==7)this.btn_jj.Draw();
		this.btn_close.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var offx,offy;
		offx=this.iX+20;
		offy=this.iY+60;
		if(this.iCanJJ==7)
		{
			if(this.btn_jj.ProcTouch(msg, x, y))
			{
				if(this.btn_jj.bCheck())
				{
					GmProtocol.gi().s_PetJJ(MyPets.mp.pets[this.iPetPoint].iPid, 0, 0);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		if(XDefine.bInRect(x, y, offx, offy, 200, 30*8+10))
		{//计算
			this.iPetPoint=parseInt((y-offy)/30);
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{//
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}
JJPet.Open=function()
{
	var jp;
	
	if(XStat.gi().iXStat==XStat.GS_JJPET)
	{
		jp= XStat.gi().oCurrentView;
	}
	else jp= XStat.gi().PushStat(XStat.GS_JJPET);
}