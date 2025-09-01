
import PublicInterface from "../../zero/Interface/PublicInterface"
import GmConfig from "../../config/GmConfig"
import BaseClass from "../../engine/BaseClass"
import XButtonEx2 from "../../engine/control/XButtonEx2"
import M3DFast from "../../engine/graphics/M3DFast"
import GmPlay from "../../engtst/mgm/GmPlay"

export default class StartGame  extends BaseClass{

	constructor()
	{
		super();
		this.btn_startgame=new XButtonEx2(GmPlay.xani_local);
		this.btn_startgame.InitButton("登陆游戏");
		this.btn_startgame.Move(GmConfig.SCRW/2, GmConfig.SCRH/2+200, 50, 50);
		this.btn_startgame.SetCheckRect(GmConfig.SCRW/2-100, GmConfig.SCRH/2+200-100,200,200);
		
		this.bLogined=false;
	}

	Draw()
	{
		drawback(true);
		this.btn_startgame.Draw();
		
		if(!this.bLogined)
		{
			this.bLogined=true;
			PublicInterface.gi().Login();
		}
	}

	ProcTouch( msg, x, y)
	{
		if(this.btn_startgame.ProcTouch(msg, x, y))
		{
			if(this.btn_startgame.bCheck())
			{//打开登陆
				PublicInterface.gi().Login();
			}
		}
		return false;
	}
}
	StartGame.res_bk=-1;
	StartGame.drawback=function( withside)
	{
		if(StartGame.res_bk<0)StartGame.res_bk=M3DFast.gi().LoadFromFile("datapackage/others/back.png",-1,true);
		M3DFast.gi().DrawImageEx(0, 0, 0, StartGame.res_bk, 0, 0, 1280, 720, 101, GmConfig.SCRW/1280, 1, 0, 0, 0);
		
		if(withside)
		{
			M3DFast.gi().DrawImageEx(0, 0, 720-100, StartGame.res_bk,       0, 720, 1280, 99, 101, GmConfig.SCRW/1280, 1, 0, 0, 0);
			//M3DFast.gi().DrawImageEx(0, (GmConfig.SCRW-1280)/2, 720-100, StartGame.res_bk, 0, 720, 1280, 99, 101, GmConfig.SCRW/1280, 1, 180, GmConfig.SCRW/2, 720-50);
		}
	}