
import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import BaseClass from "../../engine/BaseClass"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import XStat from "../../engtst/mgm/XStat"

export default class Logo extends BaseClass{

	 constructor( ani)
	{
		super();
		iStatType=XStat.GS_LOGO;
		
		this.pani=ani;
		this.pm3f=M3DFast.xm3f;
		this.iDelay=40;
		
		this.iLogoId1=M3DFast.gi().LoadFromFile("bk/ca.xxx",-1,false);
		this.iLogoId2=M3DFast.gi().LoadFromFile("bk/cb.xxx",-1,false);
		this.iW=480;
		this.iH=320;
	}
	Draw()
	{
		this.pm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
		this.pm3f.DrawImageEx(0, 0, 0, this.iLogoId1, 0, 0, 512, 480, 101, 1,1, 0, 0, 0);
		this.pm3f.DrawImageEx(0, 512, 0, this.iLogoId2, 0, 0, 800-512, 480, 101, 1,1, 0, 0, 0);
//		this.pm3f.DrawText(0, 0, "LOGO"+this.iDelay, 0xffffffff);
	//	this.pani.DrawAnima(GmConfig.SCRW/2,GmConfig.SCRH/2, "Logo",0);
		this.iDelay--;
		if(this.iDelay<=0 && Logo.bInited)
		{
			XStat.gi().PopStat(1);
//			XStat.gi().PushStat(XStat.GS_FASTLOGIN);
			XStat.gi().PushStat(XStat.GS_LEADPAGE);
		}
		if(GameData.bAutoGetInForDebug)
		{
			XStat.gi().PopStat(1);
			XStat.gi().PushStat(XStat.GS_LOGIN);
			XStat.gi().oCurrentView.in_user.sDetail="user";
			XStat.gi().oCurrentView.in_pass.sDetail="pass";
		}
	}
	ProcTouch( msg, x, y)
	{
		return false;
	}
}
Logo.bInited=false;
/*
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"

	XAnima this.pani;
	M3DFast this.pm3f;
	
	public MainMenu( ani)
	{
		this.pani=ani;
		this.pm3f=ani.pm3f;
	}
	Draw()
	{
		this.pm3f.FillRect_2D(0, 0, this.pm3f.imf.SCRW, this.pm3f.imf.SCRH, 0xff000000);
		this.pm3f.DrawText(0, 0, "LOGO", 0xffffffff);
	}
	public boolean ProcTouch( msg, x, y)
	{
		return false;
	}
 
*/