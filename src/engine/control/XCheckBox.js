import XDefine from "../../config/XDefine"
import TouchManager from "../../engine/TouchManager"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"

export default class XCheckBox
{
    constructor(ani)
    {
		this.pani=ani;
		this.pm3f=ani.pm3f;
		this.bTrue=false;
		this.sDetail="";
		this.bInited=false;
    }
    InitBox( an)
	{
		this.pani.InitAnimaWithName(an,GmPlay.aaa);
		this.aa_true=new AnimaAction();
		this.aa_false=new AnimaAction();
		GmPlay.aaa.iFrame=0;this.aa_true.copyfrom(GmPlay.aaa);
		GmPlay.aaa.iFrame=1;this.aa_false.copyfrom(GmPlay.aaa);
		this.bInited=true;
    }
    Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
	}
	Draw()
	{
		if(this.bInited)
		{
			if(this.bTrue)this.pani.DrawAnima_aa(this.iX, this.iY, this.aa_true);
			else this.pani.DrawAnima_aa(this.iX, this.iY, this.aa_false);
		}
		else
		{
			this.pm3f.DrawRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0xffffffff);
			if(this.bTrue)this.pm3f.FillRect_2D(this.iX+2,this.iY+2,this.iX+this.iW-4,this.iY+this.iH-4,0xffffffff);
		}

		this.pm3f.DrawTextEx(this.iX+this.iW+3,this.iY+(this.iH-30)/2,this.sDetail,0xff003e57,30,101,1,1,0,0,0);
//		this.pm3f.DrawText(this.iX+this.iW+3, this.iY+(this.iH-30)/2, this.sDetail, 0xffffffff);
	}
	ProcTouch( msg, x, y)
	{
		if(this.bInited)
		{
			if(this.pani.bInAnima(this.aa_true,this.iX,this.iY,x,y))
			{
				if(msg==TouchManager.TOUCH_UP)this.bTrue=!this.bTrue;
				return true;
			}
		}
		else
		{
			if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW+this.sDetail.length*30, this.iH))
			{
				if(msg==TouchManager.TOUCH_UP)this.bTrue=!this.bTrue;
				return true;
			}
		}
		return false;
	}

	checkStatus(){
		return this.bTrue
	}
}