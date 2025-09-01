
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import MapManager from "../../../../../map/MapManager"
import StarEffect from "../../../../../mgm/newmainmenu/StarEffect"

export default class FuYuan {

	FuYuan()
	{
		this.bInited=false;
		this.bShow=false;
		this.bShowEffect=true;
		this.bShowFrame=false;
	}
	
	Draw()
	{
		//icon
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(!this.bShow)return;
		var offx=Gameing.iTopIconOffX;
		if(!this.bInited)
		{
			this.btn_open=new XButtonEx2(GmPlay.xani_nui6);
			this.btn_open.InitButton("首充图标");
			
			this.aa_effect=GmPlay.xani_nui6.InitAnimaWithName("转圈效果", null);
			
			this.bInited=true;
		}
		this.btn_open.Move(offx, 0, 80, 80);
		this.btn_open.Draw();
		if(this.bShowEffect)
		{
			this.aa_effect.Draw(offx+40, 0+40);
			this.aa_effect.NextFrame();
		}
		//框体
		if(this.bShowFrame)
		{
		}
		Gameing.iTopIconOffX+=90;
	}
	ProcTouch( msg, x, y)
	{
		//框体操作
		
		//点击icon
		return false;
	}
}
FuYuan.fy=new FuYuan();