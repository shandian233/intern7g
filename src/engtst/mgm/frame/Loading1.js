
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"

export default class Loading1 extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		this.iDelay=0;
		
		this.aa_loading=GmPlay.xani_ui.InitAnimaWithName("载入中", null);
	}
	Draw()
	{
		if(this.iDelay<0x80)this.iDelay+=15;
		M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, this.iDelay<<24);
		this.aa_loading.Draw(GmConfig.SCRW/2, GmConfig.SCRH*3/5);
		
//		this.aa_loading.Draw(GmConfig.SCRW/2, GmConfig.SCRH*3/5,16);
//		this.aa_loading.Draw(GmConfig.SCRW/2, GmConfig.SCRH*3/5,17);
//		this.aa_loading.Draw(GmConfig.SCRW/2, GmConfig.SCRH*3/5,18);
		this.aa_loading.NextFrame();
	}
	ProcTouch( msg, x, y)
	{
		return false;
	}
}
