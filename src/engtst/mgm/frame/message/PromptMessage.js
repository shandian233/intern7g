
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"

export default class PromptMessage extends BaseClass{

	 constructor( a)
	{
		super();
	}

	Draw()
	{
		FormatString.gi().FormatEx(this.sDetail, 500, 20, 0, 0, 25);
		this.iW=580;
		this.iH=FormatString.gi().iH+20+30+30+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.frame_type4("提示框a32_32", this.iX, this.iY, this.iW, this.iH, 32, 32);
		M3DFast.gi().DrawText_2(this.iX+this.iW/2, this.iY+30+15, this.sTitle, 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 4, 0xffa57841);
		FormatString.gi().Draw(this.iX+40, this.iY+30+30+20);
	}
	ProcTouch( msg, x, y)
	{
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}
PromptMessage.Open=function( title, detail)
{
	var msg=XStat.gi().PushStat(XStat.GS_PROMPTMESSAGE);
	msg.sTitle =title;
	msg.sDetail =detail;
}