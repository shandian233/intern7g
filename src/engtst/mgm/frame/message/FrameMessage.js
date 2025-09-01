
import GmConfig from "../../../../config/GmConfig"
import MapManager from "../../../../map/MapManager"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"

export default class FrameMessage {
	
	
	FrameMessage()
	{
		this.iW=300;
		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.pm3f=M3DFast.xm3f;
		this.bShow=false;
	}
	Open( s)
	{
		this.sDetail=s;
		this.bShow=true;
		
		this.iW=GmConfig.SCRW/2;
		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
//		this.iX+=100;
		this.iY=GmConfig.SCRH/2-10;
		
//		MapManager.gi().vbk.mapdialog.bDialoging=false;
		this.bLock=true;
	}
	
	Draw()
	{
		if(!this.bShow)return;
//		this.pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xff000000);
		
		this.iW=500;
		this.iH=200;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2+40;
		
		
//		FormatString.gi().Format("#cffffff"+this.sDetail, this.iW-40, 25);
//		FormatString.gi().Format("#c000000"+this.sDetail, this.iW-40, 25);
		
//		FormatString.gi().Format("#c000000"+this.sDetail, this.iW-40, 22);
//		FormatString.gi().Draw(this.iX+20+1, this.iY+20+1);
//		FormatString.gi().Format("#cffff00"+this.sDetail, this.iW-40, 22);
//		FormatString.gi().Draw(this.iX+20, this.iY+20);
		FormatString.gi().FormatEx("#cffff00"+this.sDetail, this.iW-50, 30,1,0xff000000,35);
		
		this.iH=240;
		if(FormatString.gi().iH+50>this.iH)this.iH=FormatString.gi().iH+50;
		this.iY=(GmConfig.SCRH-this.iH)/2+40;
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		
		FormatString.gi().Draw(this.iX+25, this.iY+25);
		
//		FormatString.gi().Format("#c00ff00"+this.sDetail, this.iW-20, 25);
//		if(FormatString.gi().iH<100)this.iH=120;
//		else this.iH=FormatString.gi().iH+20;
//		DrawMode.Frame1_BR(this.iX,this.iY,this.iW,this.iH);
//		FormatString.gi().Draw(this.iX+10, this.iY+10);
	}
	
	ProcTouch( msg, x, y)
	{
		if(!this.bShow)return false;
		if(msg==1)this.bLock=false;
		if(msg==3 && !this.bLock)
		{
			this.bShow=false;
		}
		return true;
	}
}
FrameMessage.fm=new FrameMessage();