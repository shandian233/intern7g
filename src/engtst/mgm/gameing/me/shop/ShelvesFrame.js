
import GmConfig from "../../../../../config/GmConfig"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../../engine/control/XCheckBox"
import XInput from "../../../../../engine/control/XInput"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

import MySell from "./MySell"

export default class ShelvesFrame extends BaseClass{//上架


//	public static ShelvesFrame sf=new ShelvesFrame();
	constructor( ani)
	{
		super();
		this.iW=360;
		this.iH=280;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_shelves=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_shelves.InitButton("内框按钮");
		this.btn_shelves.sName="上架";
		this.btn_shelves.Move(this.iX+20, this.iY+this.iH-55-20, 98, 55);
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_cancel.InitButton("内框按钮");
		this.btn_cancel.sName="取消";
		this.btn_cancel.Move(this.iX+this.iW-98-20, this.iY+this.iH-55-20, 98, 55);
		
		this.chk_watch=new XCheckBox(GmPlay.xani_nui3);
		this.chk_watch.InitBox("统一勾选");
		this.chk_watch.bTrue=false;
		this.chk_watch.Move(this.iX+10, this.iY+130, 50, 50);
		
		this.in_number=new XInputNumber(GmPlay.xani_nui3);
		this.in_number.MinMax(0,99999999);
	}
	
	Draw()
	{
		var offy;
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		
		offy=this.iY+20;
		if(MySell.gi().lockgoods!=null)
		{
			M3DFast.gi().DrawTextEx(this.iX+20,offy,"物品："+GmPlay.de_goods.strValue(MySell.gi().lockgoods.iTid, -1, 4),0xffffffff,30,100,1,1,0,0,0);
		}
		else if(MySell.gi().lockpet!=null)
		{
			M3DFast.gi().DrawTextEx(this.iX+20,offy,"宠物："+MySell.gi().lockpet.sName,0xffffffff,30,100,1,1,0,0,0);
		}
		offy+=30+20+10;
		M3DFast.gi().DrawTextEx(this.iX+20, offy, "上架价格:", 0xffffffff, 30, 100, 1, 1, 0, 0, 0);
		this.in_number.Move(this.iX+20+130, offy-10, this.iW-170);
		this.in_number.Draw();
//		DrawMode.new_numberframe(in_price.iX, in_price.iY,in_price.iW, in_price.sDetail);

		offy+=30+10+20+10;
		M3DFast.gi().DrawTextEx(this.iX+80, offy, "观赏", 0xffffffff, 30, 100, 1, 1, 0, 0, 0);
		this.chk_watch.Move(this.iX+20, offy-10, 50, 50);
		this.chk_watch.Draw();
		
		this.btn_shelves.Draw();
		this.btn_cancel.Draw();
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.btn_shelves.ProcTouch(msg, x, y))
		{
			if(this.btn_shelves.bCheck())
			{//上架
				if(this.chk_watch.bTrue)
				{
					if(MySell.gi().lockgoods!=null)GmProtocol.gi().s_StartSell(1, MySell.gi().lockgoods.iGid, 0,"");//观赏
					if(MySell.gi().lockpet!=null)GmProtocol.gi().s_StartSell(3, MySell.gi().lockpet.iPid, 0,"");//观赏
					XStat.gi().PopStat(1);
				}
				else
				{
					if(this.in_number.iNumber>0)
					{
						if(MySell.gi().lockgoods!=null)GmProtocol.gi().s_StartSell(1, MySell.gi().lockgoods.iGid, this.in_number.iNumber,"");
						if(MySell.gi().lockpet!=null)GmProtocol.gi().s_StartSell(3, MySell.gi().lockpet.iPid, this.in_number.iNumber,"");
						XStat.gi().PopStat(1);
					}
					else
					{
						EasyMessage.easymsg.AddMessage("请先输入上架价格");
					}
				}
			}
			return true;
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
//		in_price.ProcTouch(msg, x, y);
		this.in_number.ProcTouch(msg, x, y);
		this.chk_watch.ProcTouch(msg, x, y);
		return false;
	}
}
