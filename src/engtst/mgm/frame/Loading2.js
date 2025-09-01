
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"

//全屏地图切换载入
export default class Loading2 extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		this.iStat=0;
		this.iDelay=0;
		
		this.aa_loading=GmPlay.xani_ui.InitAnimaWithName("载入中", null);
	}
	Draw()
	{
//		this.pm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0xff303030);
//		var i,j=5;
//		this.iDelay++;
//		if(this.iDelay>1)
//		{
//			this.iDelay=0;
//			this.iStat++;
//			this.iStat%=j;
//		}
//		for(i=0;i<j;i++)
//		{
//			if(this.iStat==i)GmPlay.xani_ui.DrawAnima(0+i*50, GmConfig.SCRH-50, "loading", 1);
//			else GmPlay.xani_ui.DrawAnima(0+i*50, GmConfig.SCRH-50, "loading", 0);
//		}
		M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
		this.aa_loading.Draw(GmConfig.SCRW/2, GmConfig.SCRH*3/5);
		
		this.aa_loading.NextFrame();
	}
	ProcTouch( msg, x, y)
	{
		return false;
	}
}
