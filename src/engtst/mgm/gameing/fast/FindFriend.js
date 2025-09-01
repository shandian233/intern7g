
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XInput from "../../../../engine/control/XInput"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"

export default class FindFriend extends BaseClass{

	
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW = 40 + 80 + 20 + 160 + 20+90+40;
		this.iH = 40+50+40+50+40;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		//30,50,30,50,30
		this.in_name=new XInput(GmPlay.xani_ui);
		this.in_name.Move(this.iX + 40+80+20, this.iY + 40, 160, 50);
		this.in_name.sDetail="";
		this.in_name.iTextSize=30;
		this.in_name.iLength=12;
		this.in_name.iTextColor = 0xff114e61;
		
		this.in_id=new XInput(GmPlay.xani_ui);
		this.in_id.Move(this.iX + 40+80+20, this.iY + 40+50+40 , 160, 50);
		this.in_id.sDetail="";
		this.in_id.bNumber=true;
		this.in_id.iTextSize=30;
		this.in_id.iMaxNumber=99999999;//2147483647;
		this.in_id.iTextColor = 0xff114e61;
		
		this.btn_name=new XButton(GmPlay.xani_button);
		this.btn_name.InitButton("1号按钮90_60");
		this.btn_name.sName="查找";
		this.btn_name.Move(this.iX + 40+80+20+160+20, this.iY + 35, 90, 60);
		
		this.btn_id=new XButton(GmPlay.xani_button);
		this.btn_id.InitButton("1号按钮90_60");
		this.btn_id.sName="查找";
		this.btn_id.Move(this.iX + 40 + 80 + 20 + 160 + 20, this.iY + 40 + 50 + 40 - 5, 90, 60);
	}

	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		
		M3DFast.gi().DrawTextEx(this.iX + 40, this.iY + 40+25, "根据名字", 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		DrawMode.frame_type4("8号框20_20", this.in_name.iX, this.in_name.iY, this.in_name.iW, 50, 20, 20);
		this.in_name.DrawText();
		this.btn_name.Draw();
		
		M3DFast.gi().DrawTextEx(this.iX + 40, this.iY + 40 + 50 + 40 + 25, "根据号码", 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		DrawMode.frame_type4("8号框20_20", this.in_id.iX, this.in_id.iY, this.in_id.iW, 50, 20, 20);
		this.in_id.DrawText();
		this.btn_id.Draw();

		this.in_name.onscr();
		this.in_id.onscr();
	}
	ProcTouch( msg, x, y)
	{
		this.in_name.ProcTouch(msg, x, y);
		this.in_id.ProcTouch(msg, x, y);
		
		if(this.btn_name.ProcTouch(msg, x, y))
		{
			if(this.btn_name.bCheck())
			{
				if(this.in_name.sDetail.length<=0)EasyMessage.easymsg.AddMessage("请先输入玩家名字");
				else GmProtocol.gi().s_WatchOn(4, 0, 0,this.in_name.sDetail);
			}
		}
		if(this.btn_id.ProcTouch(msg, x, y))
		{
			if(this.btn_id.bCheck())
			{
				if(this.in_id.sDetail.length<=0)EasyMessage.easymsg.AddMessage("请先输入号码");
				else GmProtocol.gi().s_WatchOn(0, parseInt(this.in_id.sDetail), 0,"");
			}
		}
		
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}

}
