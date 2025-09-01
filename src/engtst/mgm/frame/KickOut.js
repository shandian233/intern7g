
import PublicInterface from "../../../zero/Interface/PublicInterface"
import GmConfig from "../../../config/GmConfig"
import XDefine from "../../../config/XDefine"
import BaseClass from "../../../engine/BaseClass"
import XButton from "../../../engine/control/XButton"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import FormatString from "../../../engtst/mgm/frame/format/FormatString"

export default class KickOut extends BaseClass{
	 constructor( ani)
	{
		super();
		this.iW=300;
		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

		this.sDetail="点击确定关闭游戏";

		this.btn_ok=null;
	}
	
	Draw()
	{
		if(this.btn_ok==null)
		{
			this.btn_ok=new XButtonEx2(GmPlay.xani_button);
			this.btn_ok.sName="确定";
			this.btn_ok.Move(this.iX + (this.iW - 90) / 2, this.iY + this.iH - 60 - 20, 90, 60);
			this.btn_ok.InitButton("1号按钮90_60");
		}
		M3DFast.gi().FillRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH, 0x80000000);
		M3DFast.gi().DrawRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH, 0xffffffff);
		
		// FormatString.gi().Format("#cffff00"+this.sDetail, this.iW-40, 20);
		FormatString.gi().Format("#cffff00已掉线", this.iW-40, 20);
		FormatString.gi().Draw(this.iX+20, this.iY+20);
		
		// this.btn_ok.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_ok==null)return false;
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				PublicInterface.gi().Exit();
			}
		}
		return false;
	}
}
