
import GmConfig from "../config/GmConfig"
import BaseClass from "../engine/BaseClass"
import XButtonEx1 from "../engine/control/XButtonEx1"
import M3DFast from "../engine/graphics/M3DFast"
import XAnima from "../engine/graphics/XAnima"
import GmPlay from "../engtst/mgm/GmPlay"
import XStat from "../engtst/mgm/XStat"
import DrawMode from "../engtst/mgm/frame/DrawMode"

export default class WorldMap extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=800;
		this.iH=480;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx1(GmPlay.xani_ui3);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX+this.iW-60-5, this.iY, 60, 60);
	}

	 Draw()
	{
		if(WorldMap.ipid1<0)WorldMap.ipid1=M3DFast.gi().LoadFromFile("bk/ba.xxx",-1,false);
		if(WorldMap.ipid2<0)WorldMap.ipid2=M3DFast.gi().LoadFromFile("bk/bb.xxx",-1,false);
		
		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
		M3DFast.gi().DrawImageEx(0, this.iX, this.iY, WorldMap.ipid1, 0, 0, 512, 480, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawImageEx(0, this.iX+512, this.iY, WorldMap.ipid2, 0, 0, 800-512, 480, 101, 1, 1, 0, 0, 0);
//		GmPlay.xani_ui2.DrawAnima(this.iX, this.iY, "世界地图",0);
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

WorldMap.ipid1=-1;
WorldMap.ipid2=-1;