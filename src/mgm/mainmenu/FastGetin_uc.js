
import PublicInterface from "../../zero/Interface/PublicInterface"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"
import BaseClass from "../../engine/BaseClass"
import XButton from "../../engine/control/XButton"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import XStat from "../../engtst/mgm/XStat"

export default class FastGetin_uc  extends BaseClass{
	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.btn_autogetin=new XButton(GmPlay.xani_ui3);
//		this.btn_autogetin.sName="UC登陆";
		this.btn_autogetin.InitButton("登录按钮");
		this.bLogined=false;
	}
	Draw()
	{
//		MainMenu.dpics(1);
		GmPlay.xani_ui3.DrawAnimaEx((GmConfig.SCRW-354)/2, GmConfig.SCRH/2-204, "登陆logo", 0, 101, 1,1, 0, 0, 0);

		this.btn_autogetin.Move((GmConfig.SCRW-170)/2, 300, 170, 65);
		this.btn_autogetin.Draw();
		
		if(!this.bLogined)
		{
			this.bLogined=true;
			PublicInterface.gi().Login();
		}
	}
	 ProcTouch( msg, x, y)
	{
		if(this.btn_autogetin.ProcTouch(msg, x, y))
		{
			if(this.btn_autogetin.bCheck())
			{
//				EasyMessage.easymsg.AddMessage("此功能暂未开发");
				PublicInterface.gi().Login();
			}
		}
		
		return false;
	}
}
