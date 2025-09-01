
import M3DFast from "../../../engine/graphics/M3DFast"
import RunFirst from "../../../engine/xms/RunFirst"
import _LINKCONTROL from "../../../engine/xms/control/head/_LINKCONTROL"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import X_FIRST from "../../../engine/xms/first/X_FIRST"
import XmsCBaseControl from "./XmsCBaseControl"

import XmsCButton from "./XmsCButton"
import XmsCFrame from "./XmsCFrame"
import XmsCText from "./XmsCText"
import XmsCAnima from "./XmsCAnima"
import XmsCList from "./XmsCList"
import XmsCSlider from "./XmsCSlider"

export default class XmsCOle extends XmsCBaseControl{
	 constructor( m3f,  pc,  pr)
	{
		super();
		this.iX=0;
		this.iY=0;
		this.plc=null;
		this.pm3f=m3f;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var pc,pc1;
		var pn1,pn2,pn3,pn4;
//		X30_WORD *pw;

		pc=this.pclass.FindClass("容器区域");//列表区域
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

		//容器中的东西
		pc=this.pclass.FindClass("内容");
		if(pc!=null)
		{//
			var pf=pc.pca.phead;
			while(pf!=null)
			{
				if(pf.iType==40)
				{
					pc1=pf;
					if(pc1.pca.phead!=null)
					{
						if(pc1.pca.phead.iType==10 && pc1.pca.phead.sName=="唯一处理标识")
						{
							pn1=pc1.pca.phead;
							switch(pn1.iNumber)
							{
							case 101://按钮
								pc1.pobj=new XmsCButton(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_BUTTON,pc1.pobj);
								break;
							case 201://框体
								pc1.pobj=new XmsCFrame(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_FRAME,pc1.pobj);
								break;
							case 203://文字
								pc1.pobj=new XmsCText(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_TEXT,pc1.pobj);
								break;
							case 202://动画
								pc1.pobj=new XmsCAnima(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_ANIMA,pc1.pobj);
								break;
							case 102://列表
								pc1.pobj=new XmsCList(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_LIST,pc1.pobj);
								break;
							case 105://滑杆
								pc1.pobj=new XmsCSlider(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_SLIDER,pc1.pobj);
								break;
							case 103://容器
								pc1.pobj=new XmsCOle(this.pm3f,pc1,this.prun);
								this.AddControl(XmsCOle.CTYPE_OLE,pc1.pobj);
								break;
							}
						}
					}
				}
				pf=pf.pdown;
			}
		}
		pc=this.pclass.FindClass("扩展下拉容器");
		if(pc!=null)
		{
			this.pExtend=new XmsCOle(this.pm3f,pc,this.prun);
			this.bHaveExtend=true;
		}
		else this.bHaveExtend=false;

		this.bShowExtend=true;
	}
	Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
	}
	AddControl( type, p)
	{
		var pp;
		if(this.plc==null)
		{
			this.plc=new _LINKCONTROL();
			pp=this.plc;
		}
		else
		{
			pp=this.plc;
			while(pp.pnext!=null)pp=pp.pnext;
			pp.pnext=new _LINKCONTROL();
			pp=pp.pnext;
		}
		pp.iType=type;
		pp.pobj=p;
	}

	Draw( offx, offy)
	{
		this.iOffX=offx;
		this.iOffY=offy;
		var pp=this.plc;
		var xx=offx+this.iX;
		var yy=offy+this.iY;
		this.pm3f.DrawRect_2D(xx,yy,xx+this.iW,yy+this.iH,0xffffffff);

		if(this.bHaveExtend && this.bShowExtend)this.pExtend.Draw(offx,offy);

		var pbc;
		var hh;
		this.iH=0;
		while(pp!=null)
		{
			pbc= pp.pobj;
			pbc.Draw(xx,yy);
			hh=pbc.iY+pbc.iH;
			if(hh>this.iH)this.iH=hh;
//			switch(pp.iType)
//			{
//			case CTYPE_BUTTON:
//				((XmsCButton )pp.pobj).Draw(xx,yy);
//				break;
//			case CTYPE_FRAME:
//				((XmsCFrame )pp.pobj).Draw(xx,yy);
//				break;
//			case CTYPE_TEXT:
//				((XmsCText )pp.pobj).Draw(xx,yy);
//				break;
//			case CTYPE_ANIMA:
//				((XmsCAnima )pp.pobj).Draw(xx,yy);
//				break;
//			}
			pp=pp.pnext;
		}
	}
	ProcTouch( msg, x, y)
	{
		x-=this.iOffX;
		y-=this.iOffY;
		var pp=this.plc;
		while(pp!=null)
		{
			switch(pp.iType)
			{
			case CTYPE_BUTTON:
				if((pp.pobj).ProcTouch(msg,x+this.iOffX,y+this.iOffY))
				{
					return true;
				}
				break;
			case CTYPE_FRAME:
				if((pp.pobj).ProcTouch(msg,x+this.iOffX,y+this.iOffY))
				{
					return true;
				}
				break;
			case CTYPE_LIST:
				if((pp.pobj).ProcTouch(msg,x+this.iOffX,y+this.iOffY))
				{
					return true;
				}
				break;
			case CTYPE_SLIDER:
				if((pp.pobj).ProcTouch(msg,x+this.iOffX,y+this.iOffY))
				{
					return true;
				}
				break;
			case CTYPE_OLE:
				if((pp.pobj).ProcTouch(msg,x+this.iOffX,y+this.iOffY))
				{
					return true;
				}
				break;
			}
			pp=pp.pnext;
		}
		if(this.bHaveExtend && this.bShowExtend)return this.pExtend.ProcTouch(msg,x,y);
		return false;
	}
}
	XmsCBaseControl.CTYPE_BUTTON =1;
	XmsCBaseControl.CTYPE_FRAME =2;
	XmsCBaseControl.CTYPE_TEXT =3;
	XmsCBaseControl.CTYPE_ANIMA =4;
	XmsCBaseControl.CTYPE_LIST =5;
	XmsCBaseControl.CTYPE_SLIDER=6;
	XmsCBaseControl.CTYPE_OLE=7;
