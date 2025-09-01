
import GmConfig from "../../config/GmConfig"
import DrawBuffer from "../../map/DrawBuffer"
import MapManager from "../../map/MapManager"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import GmPlay from "./GmPlay"
import XDefine from "../../config/XDefine";

class _FIREWORKS
{/*
	public boolean bUseing;
	public int iX,iY;
	public int iDelay,iLoop;
	public AnimaAction aa;
	public int iMode;
	public int iCs1,iCs2;
	public int iAlpha;*/
	
	constructor()
	{
		this.bUseing=false;
		this.aa=new AnimaAction();
	}
};

export default class FireworksEffect {

	constructor()
	{
		var i;
		this.flist=new Array(FireworksEffect.MAXFIREWORKS);
		for(i=0;i<FireworksEffect.MAXFIREWORKS;i++)
		{
			this.flist[i]=new _FIREWORKS();
		}
		this.iShadow=0;
	}
	Draw()
	{
		var bShadow=false;
		var i,x,y;
		for(i=0;i<FireworksEffect.MAXFIREWORKS;i++)
		{
			if(this.flist[i].bUseing)
			{
				if(this.flist[i].iDelay>0)
				{
					this.flist[i].iDelay--;
					continue;
				}
				x=MapManager.gi().iOffx+this.flist[i].iX;
				y=MapManager.gi().iOffy+this.flist[i].iY;
				if(!bShadow && x>0 && y>0 && x<GmConfig.SCRW && y<GmConfig.SCRH)
				{//
					M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, this.iShadow<<24);
					bShadow=true;
				}
				switch(this.flist[i].iMode)
				{
				case 0://烟花，原地播放
					this.flist[i].aa.Draw(x,y);
					break;
				case 1://孔明灯，向上飘
					if(this.flist[i].iLoop<=3)this.flist[i].iAlpha-=1;
					this.flist[i].aa.DrawEx(x, y, this.flist[i].iAlpha, 1, 1, 0, 0, 0);
					this.flist[i].iX=this.flist[i].iX+this.flist[i].iCs1-1000;
					this.flist[i].iY=this.flist[i].iY+this.flist[i].iCs2-1000;
					break;
				case 2://放大倍数后显示
					this.flist[i].aa.DrawEx(x, y, 101, 0.1*this.flist[i].iCs1, 0.1*this.flist[i].iCs2, 0, 0, 0);
					break;
				}
				
				if(this.flist[i].aa.NextFrame())
				{
					if(this.flist[i].iLoop>1)this.flist[i].iLoop--;
					else this.flist[i].bUseing=false;
				}
			}
		}
		if(bShadow)
		{
			if(this.iShadow<100)this.iShadow+=10;
		}
		else
		{
			if(this.iShadow>0)
			{
				M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, this.iShadow<<24);
				this.iShadow-=10;
			}
		}
	}
	
	AddFireworks( x, y, type, na, delay, loop, mode, cs1, cs2)
	{
		var i;
		for(i=0;i<FireworksEffect.MAXFIREWORKS;i++)
		{
			if(!this.flist[i].bUseing)
			{
				this.flist[i].aa.iAnimaPoint=0;
				if(type==0)GmPlay.xani_skill.InitAnimaWithName(na, this.flist[i].aa);
				else if(type==1)GmPlay.xani_effect.InitAnimaWithName(na, this.flist[i].aa);
				else if(type>=10 && type<=12)GmPlay.xani_skills[type-10].InitAnimaWithName(na, this.flist[i].aa);
				GmPlay.sop(",,,"+na+",,,"+this.flist[i].aa.iAnimaPoint);
				if(this.flist[i].aa.iAnimaPoint==0)return;
				this.flist[i].iX=x;
				this.flist[i].iY=y;
				this.flist[i].iDelay=delay;
				this.flist[i].iLoop=loop;
				this.flist[i].iMode=mode;
				this.flist[i].iCs1=cs1;
				this.flist[i].iCs2=cs2;
				this.flist[i].iAlpha=101;
				this.flist[i].bUseing=true;
				return;
			}
		}
	}

}
FireworksEffect.MAXFIREWORKS=64;

FireworksEffect.fe=new FireworksEffect();

FireworksEffect.DrawAura=function( iaura, x, y, pdb, offy)
{//光环
//	XDefine.sop(iaura,x,y,pdb,offy);
	if(iaura<0 || iaura>=128)return;
	
	if(pdb==null)
	{
		GmPlay.aa_auras[iaura].Draw(x,y);
	}
	else
	{
		pdb.DrawAnima_aa(offy, null, x, y, GmPlay.aa_auras[iaura]);
	}
}