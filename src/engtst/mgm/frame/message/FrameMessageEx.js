
import GmConfig from "../../../../config/GmConfig"
import MapManager from "../../../../map/MapManager"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import JQMode from "../../../../engtst/mgm/gameing/help/JQMode"

export default class FrameMessageEx {
	constructor()
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
		
		this.iW=512;
		this.iH=195;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2+40;
		
		this.bLock=true;
		
		this.iot=GmPlay.iNowMillis;
	}
	
	Draw()
	{
		if(!this.bShow)return;
		if(JQMode.jq.bJQLock())
		{
			this.iot=GmPlay.iNowMillis;
			return;
		}
		
		GmPlay.xani_other.DrawAnima(this.iX, this.iY, "欢迎框",0);
		GmPlay.xani_other.DrawAnima(this.iX, this.iY, "欢迎仙女",0);
		FormatString.gi().FormatEx("#cd1ecf5"+this.sDetail, 300, 25,1,0xff000000,40);
		
		FormatString.gi().Draw(this.iX+180, this.iY+40);

		if(GmPlay.iNowMillis-this.iot>5000)this.bShow=false;
	}
	
	ProcTouch( msg, x, y)
	{
		if(JQMode.jq.bJQLock())return false;
		if(!this.bShow)return false;
		if(msg==1)this.bLock=false;
		if(msg==3 && !this.bLock)
		{
			if(GmPlay.iNowMillis-this.iot>1000)this.bShow=false;
		}
		return true;
	}
}
FrameMessageEx.fm=new FrameMessageEx();