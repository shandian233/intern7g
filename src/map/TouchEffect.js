import AnimaAction from "../engine/graphics/AnimaAction";
import MapManager from "./MapManager"
import XDefine from "../config/XDefine"
import GmPlay from "../engtst/mgm/GmPlay"

class _TEFFECT
{
//	boolean bUseing;
//	int iX,iY;
//	short iFrame;
constructor()
{

}
}

export default class TouchEffect {
/*	_TEFFECT t;

	AnimaAction aa_t=null;
	*/
	
	constructor()
	{
		this.MAXT=32;
		this.t=new Array(this.MAXT);//
		for(var i=0;i<this.MAXT;i++)
		{
			this.t[i]=new _TEFFECT();
			this.t[i].bUseing=false;
		}
		this.aa_t=null;
	}
	Add( x, y)
	{//先看距离很近的跳过
		for(var i=0;i<this.MAXT;i++)
		{
			if(this.t[i].bUseing)
			{
				if(XDefine.llength(x, y, this.t[i].iX, this.t[i].iY)<30)return;
			}
		}
		for(var i=0;i<this.MAXT;i++)
		{
			if(!this.t[i].bUseing)
			{
				this.t[i].bUseing=true;
				this.t[i].iX=x;
				this.t[i].iY=y;
				this.t[i].iFrame=0;
				break;
			}
		}
	}
	 Draw()
	{
		var i;
		if(this.aa_t==null)this.aa_t=GmPlay.xani_nui3.InitAnimaWithName("点击效果",null);
		for(i=0;i<this.MAXT;i++)
		{
			if(this.t[i].bUseing)
			{
				this.aa_t.iFrame=this.t[i].iFrame;
				this.aa_t.Draw(MapManager.gi().iOffx+this.t[i].iX, MapManager.gi().iOffy+this.t[i].iY);
				this.t[i].iFrame++;
				if(this.t[i].iFrame>=13)this.t[i].bUseing=false;
			}
		}
	}
}
TouchEffect.te=new TouchEffect();