
import XDefine from "../../../config/XDefine"
import XInput from "../../../engine/control/XInput"
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import RunFirst from "../../../engine/xms/RunFirst"
import XmsEngine from "../../../engine/xms/XmsEngine"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X30_WORD from "../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import GmPlay from "../../../engtst/mgm/GmPlay"
import XmsCBaseControl from "./XmsCBaseControl"

import XmsCText from "./XmsCText"

export default class XmsCFrame extends XmsCBaseControl{
	
	constructor( p,  pc,  pr)
	{
		super();
		this.pm3f=p;
		this.xin=null;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var pc;
		var pn1,pn2,pn3,pn4;
		var pw1,pw2;

		pc=this.pclass.FindClass("框体区域");
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

		pc=this.pclass.FindClass("动画指向");//动画指向
		if(pc!=null)
		{
			pw1=pc.FindWord("动画分类名");
			pw2=pc.FindWord("动画名");
			if(pw1!=null && pw2!=null)
			{
				this.Init(XmsEngine.panimaole.FindAnima(pw1.pword),pw2.pword);
			}
		}

		pw1=this.pclass.FindWord("框体类型");
		if(pw1!=null)
		{
			if(pw1.pword=="整框")this.iFrameType=0;
			else if(pw1.pword=="横向框")this.iFrameType=1;
		}
		pn1=this.pclass.FindNumber("动画单位宽");
		if(pn1!=null)this.iBw=pn1.iNumber;
		pn1=this.pclass.FindNumber("动画单位高");
		if(pn1!=null)this.iBh=pn1.iNumber;
		
		pc=this.pclass.FindClass("可输入");
		if(pc!=null)
		{
			this.bCanInput=true;
			pc.pobj=new XmsCText(this.pm3f,pc,this.prun);
			this.pinput=pc.pobj;
			this.px30_word=pc.FindWord("文字内容");
		}
		else this.bCanInput=false;

		pw1=this.pclass.FindWord("默认隐藏");
		if(pw1==null)this.bHide=false;
		else this.bHide=true;
	}
	Init( pani, s)
	{
		this.faa=pani.InitAnimaWithName(s,null);
	}
	Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
	}
	SetDetail( s)
	{
		this.px30_word.Set(s);
		this.pinput.sText=s;
	}
	Draw( offx, offy)
	{
		if(this.bHide)return;
		this.iOffX=offx;
		this.iOffY=offy;
		var xx=this.iX+offx;
		var yy=this.iY+offy;
		
		var scalw=1,scalh=1;
		if(this.iBw+this.iBw>this.iW)scalw=0.5*this.iW/this.iBw;
		if(this.iBh+this.iBh>this.iH)scalh=0.5*this.iH/this.iBh;
		
		if(this.iFrameType==0)
		{//整框
			if(this.iW-this.iBw-this.iBw>0 && this.iH-this.iBh-this.iBh>0)this.faa.DrawEx(xx+this.iBw-2, yy+this.iBh-2, 8, 101, 1.0*(this.iW-this.iBw-this.iBw+4)/this.iBw, 1.0*(this.iH-this.iBh-this.iBh+4)/this.iBh, 0, 0, 0);
			if(this.iW-this.iBw-this.iBw>0)this.faa.DrawEx(xx+this.iBw-2, yy, 1, 101, 1.0*(this.iW-this.iBw-this.iBw+4)/this.iBw, 1, 0, 0, 0);
			if(this.iH-this.iBh-this.iBh>0)this.faa.DrawEx(xx+this.iW-this.iBw, yy+this.iBh-2, 3, 101, 1,1.0*(this.iH-this.iBh-this.iBh+4)/this.iBh, 0, 0, 0);
			if(this.iW-this.iBw-this.iBw>0)this.faa.DrawEx(xx+this.iBw-2, yy+this.iH-this.iBh, 5, 101, 1.0*(this.iW-this.iBw-this.iBw+4)/this.iBw, 1, 0, 0, 0);
			if(this.iH-this.iBh-this.iBh>0)this.faa.DrawEx(xx, yy+this.iBh-2, 7, 101, 1,1.0*(this.iH-this.iBh-this.iBh+4)/this.iBh,  0, 0, 0);
			
			this.faa.DrawEx(xx,yy,0,101,scalw,scalh,0,0,0);
			this.faa.DrawEx( (xx+this.iW-scalw*(this.iBw)),yy,2,101,scalw,scalh,0,0,0);
			this.faa.DrawEx( (xx+this.iW-scalw*(this.iBw)), (yy+this.iH-scalh*(this.iBh)),4,101,scalw,scalh,0,0,0);
			this.faa.DrawEx(xx, (yy+this.iH-scalh*(this.iBh)),6,101,scalw,scalh,0,0,0);
		}
		else if(this.iFrameType==1)
		{//横向框
			this.faa.Draw(xx,yy,0);
			if(this.iW-this.iBw-this.iBw>0)this.faa.DrawEx(xx+this.iBw,yy,1,101,1.0*(this.iW-this.iBw-this.iBw)/this.iBw,1,0,0,0);
			this.faa.Draw(xx+this.iW-this.iBw,yy,2);
		}
		if(this.bCanInput)
		{
			this.pinput.Draw(xx,yy);
			if(this.xin!=null && this.xin.bChanged())this.SetDetail(this.xin.sDetail);
		}
		if(this.xin!=null)this.xin.onscr();
	}
	ProcTouch( msg,  x,  y) 
	{
		if(this.bHide)return false;
		if(this.bCanInput)
		{
			if(XDefine.bInRect(x,y,this.iOffX+this.iX,this.iOffY+this.iY,this.iW,this.iH))
			{
				if(msg==3)
				{
					if(this.xin==null)this.xin=new XInput(GmPlay.xani_ui);
					this.xin.sDetail=this.pinput.sText;
					this.xin.OpenInput();
				}
				return true;
			}
		}
		return false;
	}
}
