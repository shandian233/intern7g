import GmPlay from "../../engtst/mgm/GmPlay";
import M3DFast from "../graphics/M3DFast";
import AnimaAction from "../graphics/AnimaAction";
import XDefine from "../../config/XDefine";

export default class XAdjust
{
    constructor(ani)
    {
/*        XAnima pani;
        int iX,iY;
        int iW,iH;
        int iMin,iMax;
        public int iPos;
        
        AnimaAction aa_line,aa_btn;
        boolean bInited;*/
        this.pani=ani;
		this.iPos=0;
        this.bInited=false;
        this.bLock=false;
    }
    InitAdjust( an)
	{//
		this.pani.InitAnimaWithName(an,GmPlay.aaa);
		this.aa_line=new AnimaAction();
		this.aa_btn=new AnimaAction();
		GmPlay.aaa.iFrame=0;this.aa_line.copyfrom(GmPlay.aaa);
		GmPlay.aaa.iFrame=1;this.aa_btn.copyfrom(GmPlay.aaa);
		this.bInited=true;
    }
    SetPos( min, max, pos)
	{
		this.iMin=min;
		this.iMax=max;
		this.iPos=pos;
    }
    Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
    }
    Draw()
	{//min,max,iH;
		var w=this.iH;
		var offx=this.iX-w/2+(this.iPos-this.iMin)*this.iW/(this.iMax-this.iMin);
		
		if(this.bInited)
		{
			w=48;
			offx=this.iX-w/2+(this.iPos-this.iMin)*this.iW/(this.iMax-this.iMin);
			this.aa_line.DrawEx(this.iX,this.iY+this.iH/2, 101, 1.0*this.iW/387, 1, 0, 0, 0);
			this.aa_btn.Draw(offx, this.iY+this.iH/2);
			
//			M3DFast.gi().DrawTextEx(offx+w/2, iY+iH/2, ""+iPos, 0xff00ff00, 20, 101, 1, 1, 0, -2, -2);
		}
		else
		{
			w=this.iH;
			offx=iX-w/2+(this.iPos-this.iMin)*this.iW/(this.iMax-this.iMin);
			M3DFast.gi().DrawLine(this.iX, this.iY+this.iH/2, this.iX+this.iW, this.iY+this.iH/2, 0xffffffff);
			M3DFast.gi().FillRect_2D(offx, this.iY, offx+w, this.iY+w, 0xffffffff);
			
			M3DFast.gi().DrawTextEx((this.iX-40+offx)/2, this.iY+w/2, ""+this.iPos, 0xff00ff00, 20, 101, 1, 1, 0, -2, -2);
		}
    }
    ProcTouch( msg, x, y)
	{
		if(msg==3 && this.bLock)
		{
			this.bLock=false;
			return true;
		}
		if(XDefine.bInRect(x, y, this.iX-this.iH/2, this.iY, this.iW+this.iH, this.iH) && msg==1)
		{
            this.iPos=(x-this.iX)*(this.iMax-this.iMin)/this.iW+this.iMin;
				if(this.iPos<this.iMin)this.iPos=this.iMin;
				if(this.iPos>this.iMax)this.iPos=this.iMax;
				this.bLock=true;
				return true;
		}
		if(this.bLock && msg==2)
		{
			this.iPos=(x-this.iX)*(this.iMax-this.iMin)/this.iW+this.iMin;
			if(this.iPos<this.iMin)this.iPos=this.iMin;
			if(this.iPos>this.iMax)this.iPos=this.iMax;
			return true;
		}
		return false;
	}
}
