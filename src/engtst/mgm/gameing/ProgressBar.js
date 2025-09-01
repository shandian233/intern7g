
import GmConfig from "../../../config/GmConfig"
import PackageTools from "../../../engine/PackageTools"
import M3DFast from "../../../engine/graphics/M3DFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
import DrawMode from "../../../engtst/mgm/frame/DrawMode"

export default class ProgressBar {
	
	constructor()
	{
		this.iW=200;
		this.iH=18+6;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)*2/3;
		this.bShow=false;
	}
	
	InitProgress( pls)
	{
		var i=pls.GetNextInt();
		if(i<=0)this.bShow=false;
		else
		{
			this.iStartMillis= GmPlay.iNowMillis;
			this.iLastMillis= GmPlay.iNowMillis+i;
			this.bShow=true;
			this.sDetail=pls.GetNextString();
			this.sCmd=pls.GetNextString();
		}
	}
	Draw()
	{
		if(!this.bShow)return;
		var f=1.0*(GmPlay.iNowMillis-this.iStartMillis)/(this.iLastMillis-this.iStartMillis);
		
		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);
//		M3DFast.gi().FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xffffffff);
		
		DrawMode.frame_type1("埋宝地进度条8_18", this.iX+3, this.iY+3,  (f*(this.iW-6)), 8);
//		M3DFast.gi().FillRect_2D(this.iX+1, this.iY+1,  (this.iX+1+f*(this.iW-2)), this.iY+this.iH-1, 0xffff0000);
		var i=GmPlay.iDelay/10;
		var ss="";
		if(i%3==0)ss=".";
		if(i%3==1)ss="..";
		if(i%3==2)ss="...";
		M3DFast.gi().DrawTextEx(this.iX, this.iY-30, this.sDetail+ss, 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
		if(GmPlay.iNowMillis>=this.iLastMillis)this.bShow=false;
	}
	
	ProcTouch( showtype, msg, x, y)
	{
		return false;
	}
}

ProgressBar.ppb=null;
ProgressBar.gi=function()
{
	if(ProgressBar.ppb==null)ProgressBar.ppb=new ProgressBar();
	return ProgressBar.ppb;
}