
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import XButton from "../../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../../engine/control/XButtonEx1"
import XInput from "../../../../../../engine/control/XInput"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
export default class CreateShop extends BaseClass{

	

	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=400;
		this.iH=400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.in_shopname=new XInput(GmPlay.xani_frame);
		this.in_shopname.Move(this.iX+10, this.iY+100, this.iW-20, 60);
		this.in_shopname.bHideText=true;
		
		this.btn_pet=new XButton(GmPlay.xani_button);
		this.btn_pet.InitButton("统一大按钮3");
		this.btn_pet.Move(this.iX+150,this.iY+170, 110, 50);
		this.btn_pet.sName="宠物店";
		this.btn_goods=new XButton(GmPlay.xani_button);
		this.btn_goods.InitButton("统一大按钮3");
		this.btn_goods.Move(this.iX+150+120,this.iY+170, 110, 50);
		this.btn_goods.sName="物品店";
		
		this.btn_create=new XButtonEx1(GmPlay.xani_ui3);
		this.btn_create.Move(this.iX+this.iW-117-20,this.iY+this.iH-50-15, 117, 40);
		this.btn_create.InitButton("统一按钮1");
		this.btn_create.sName="创建";
		
		this.btn_cancel=new XButtonEx1(GmPlay.xani_ui3);
		this.btn_cancel.Move(this.iX+20,this.iY+this.iH-50-15, 117, 40);
		this.btn_cancel.InitButton("统一按钮1");
		this.btn_cancel.sName="取消";
		
		this.ipog=0;
	}
	
	Draw()
	{
		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, this.iH);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+15, "创建店铺", 0xffffC800, 40, 101, 1, 1, 0, -2, 0,2,0xff000000);
		
		this.pm3f.DrawTextEx(this.in_shopname.iX, this.in_shopname.iY-30, "输入店铺名称：", 0xff000000, 30, 101, 1, 1, 0, 0, 0);
		DrawMode.Frame1_BR(this.in_shopname.iX, this.in_shopname.iY, this.in_shopname.iW, this.in_shopname.iH);
		FormatString.gi().Format(this.in_shopname.sDetail, this.in_shopname.iW-10, 30);//"#c000000"+
		FormatString.gi().Draw(this.in_shopname.iX+15, this.in_shopname.iY+15);
		
		this.pm3f.DrawTextEx(this.in_shopname.iX, this.iY+180, "店铺类型：", 0xff000000, 30, 101, 1, 1, 0, 0, 0);
		if(this.ipog==0)
		{
			this.btn_pet.bMouseIn=true;
			this.btn_pet.bMouseDown=true;
		}
		else
		{
			this.btn_goods.bMouseIn=true;
			this.btn_goods.bMouseDown=true;
		}
		this.btn_pet.Draw();
		this.btn_goods.Draw();
		
		FormatString.gi().Format("#c000000说明：新建店铺需要缴纳150万铜币#e营业状态下每个柜台每天收取5万维护费#e休息状态下每个柜台每天收取2万维护费#e交易成功，收取成交价5%的交易税", this.iW-40, 20);//，运营资金
		FormatString.gi().Draw(this.iX+20, this.iY+230);

		this.btn_create.Draw();
		this.btn_cancel.Draw();

		this.in_shopname.onscr();
	}
	
	ProcTouch( msg, x, y)
	{
		this.in_shopname.ProcTouch(msg, x, y);
		if(this.btn_pet.ProcTouch(msg, x, y))
		{
			if(this.btn_pet.bCheck())this.ipog=0;
		}
		if(this.btn_goods.ProcTouch(msg, x, y))
		{
			if(this.btn_goods.bCheck())this.ipog=1;
		}
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{//检测文字是否合理，创建帮派

					var buf=this.in_shopname.sDetail.getBytes("GBK");
					if(buf.length<4 || buf.length>16)
					{
						EasyMessage.easymsg.AddMessage("店铺名称2-8个字");
						return true;
					}

				//发送创建请求
				GmProtocol.gi().s_CreateShop(this.in_shopname.sDetail,this.ipog);
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{//
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}
CreateShop.Open=function()
{
	XStat.gi().PushStat(XStat.GS_CREATESHOP);
}