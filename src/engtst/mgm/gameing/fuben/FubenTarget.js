
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"

export default class FubenTarget extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=750;
		this.iH=430;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_ui);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX+this.iW-60-5, this.iY, 60, 60);
	}

	Draw()
	{
		DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"商城");
		this.btn_close.Draw();
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
		return false;
	}

}
