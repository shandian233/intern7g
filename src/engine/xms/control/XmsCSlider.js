
import XDefine from "../../../config/XDefine"
import M3DFast from "../../../engine/graphics/M3DFast"
import RunFirst from "../../../engine/xms/RunFirst"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import GmPlay from "../../../engtst/mgm/GmPlay"
import XmsCBaseControl from "./XmsCBaseControl"

import XmsCFrame from "./XmsCFrame"
import XmsCAnima from "./XmsCAnima"
import GmConfig from "../../../config/GmConfig";

export default class XmsCSlider extends XmsCBaseControl{
	
	SetPos( p)
	{
		this.iPos=p;	
	}
	SetRange( r)
	{
		this.iRange=r;
		this.iMax=r;
	}
	IsChanged()
	{
		if(this.bChanged)
		{
			this.bChanged=false;
			return true;
		}
		return false;
	}
	
	 constructor( m3f,  pc,  pr)
	{
		super();
		this.pm3f=m3f;
		this.bLock=false;
		this.iRange=10000;
		this.iPos=0;
		this.iMin=0;
		this.iMax=10000;
		this.bChanged=false;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var pc;
		var pn1,pn2,pn3,pn4;

		pc=this.pclass.FindClass("背景条");
		if(pc!=null)
		{
			pc.pobj=new XmsCFrame(this.pm3f,pc,this.prun);
			this.pline=pc.pobj;
		}

		pc=this.pclass.FindClass("滑块");
		if(pc!=null)
		{
			pc.pobj=new XmsCAnima(this.pm3f,pc,this.prun);
			this.pblock=pc.pobj;
		}

		pc=this.pclass.FindClass("滑杆区域");
		if(pc!=null)
		{
			pn1=pc.FindNumber("坐标X");
			pn2=pc.FindNumber("坐标Y");
			pn3=pc.FindNumber("宽度");
			pn4=pc.FindNumber("高度");
			if(pn1!=null && pn2!=null && pn3!=null && pn4!=null)
			{
				this.Move(pn1.iNumber,pn2.iNumber,pn3.iNumber,pn4.iNumber);
			}
		}

		pc=this.pclass.FindClass("滑块大小");
		if(pc!=null)
		{
			pn3=pc.FindNumber("宽度");
			pn4=pc.FindNumber("高度");
			if(pn3!=null && pn4!=null)
			{
				this.iBlockW=pn3.iNumber;
				this.iBlockH=pn4.iNumber;
			}
		}
	}
	Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
	}
	Draw( offx, offy)
	{
		this.iOffX=offx;
		this.iOffX=offy;
		this.pline.Draw(offx+this.iX,offy+this.iY);
		this.pblock.Draw(offx+this.iX-this.iBlockW/2+this.iPos*this.iW/this.iRange,offy+this.iY+this.iH/2-this.iBlockH/2);
	}

	ProcTouch( msg, x, y)
	{
		if(msg==3)
		{
			this.bLock=false;
			return false;
		}
		x-=(GmConfig.SCRW-1280)/2;
		var op=this.iPos;
		if(this.bLock)
		{
			if(msg==2)
			{
				var j=(this.iLockX-x)*this.iRange/this.iW;
				GmPlay.sop("this.iPos="+this.iPos+"this.iLockX="+this.iLockX+"x="+x+"j="+j+"---------"+this.iRange+"=mmmmm="+this.iW);
				if(j!=0)
				{
					this.iPos-=(this.iLockX-x)*this.iRange/this.iW;
					if(this.iPos<this.iMin)this.iPos=this.iMin;
					if(this.iPos>this.iRange)this.iPos=this.iRange;
					if(this.iPos>this.iMax)this.iPos=this.iMax;
					this.iLockX=x;
				}
				GmPlay.sop("this.iPos="+this.iPos);
				if(op!=this.iPos)this.bChanged=true;
				return true;
			}
		}
		if(XDefine.bInRect(x,y,this.iOffX+this.iX-this.iBlockW/2,this.iOffX+this.iY,this.iW+this.iBlockW,this.iH))
		{
			if(msg==1)
			{
				this.bLock=true;
				this.iLockX=x;
				var j=this.iOffX+this.iX+this.iPos*this.iW/this.iRange;
				if(x<j-this.iBlockW/2 || x>j+this.iBlockW/2)
				{
					this.iPos=(x-this.iOffX-this.iX)*this.iRange/this.iW;
					if(this.iPos<this.iMin)this.iPos=this.iMin;
					if(this.iPos>this.iRange)this.iPos=this.iRange;
					if(this.iPos>this.iMax)this.iPos=this.iMax;
				}
				if(op!=this.iPos)this.bChanged=true;
				return true;
			}
		}
		return false;
	}
}
