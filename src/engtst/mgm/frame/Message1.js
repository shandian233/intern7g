
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import TouchManager from "../../../engine/TouchManager"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import XStat from "../../../engtst/mgm/XStat"

export default class Message1 extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
	}

	Draw()
	{
		this.pm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
		this.pm3f.DrawText(0, 0, "Message", 0xffffffff);
		this.pm3f.DrawText(100, GmConfig.SCRH/2, this.sDetail, 0xffffffff);
		if(parseInt(this.iDelay/5)%2==0)this.pm3f.DrawText(100, GmConfig.SCRH/2+50, "按任意键继续...", 0xffffffff);
		this.iDelay++;
	}
	ProcTouch( msg, x, y)
	{
		if(msg==TouchManager.TOUCH_UP)XStat.gi().PopStat(1);
		return false;
	}
}
Message1.Open=function( detail)
{
	var msg=XStat.gi().PushStat(XStat.GS_MESSAGE1);
	msg.sDetail =detail;
}