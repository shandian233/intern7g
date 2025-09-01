
import XDefine from "../../../config/XDefine"
import M3DFast from "../../../engine/graphics/M3DFast"
import RunFirst from "../../../engine/xms/RunFirst"
import _LISTLINE from "../../../engine/xms/control/head/_LISTLINE"
import _LISTTITLE from "../../../engine/xms/control/head/_LISTTITLE"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X30_WORD from "../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import X_FIRST from "../../../engine/xms/first/X_FIRST"
import XmsCBaseControl from "./XmsCBaseControl"

export default class XmsCList extends XmsCBaseControl{
	
	 constructor( p,  pc,  pr)
	{
		super();
		this.iX=0;
		this.iY=0;
		this.plines=null;
		this.iScrollY=0;
		this.bTouchDown=false;
		this.bLockScroll=false;
		this.iSelectLine=-1;
		this.pm3f=M3DFast.xm3f;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var i,j;
		var pc,pc2,pc3;
		var pn1,pn2,pn3,pn4;
		var pw;

		pc=this.pclass.FindClass("列表区域");//列表区域
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
		pn1=this.pclass.FindNumber("列数");
		if(pn1!=null)this.iTitleCount=pn1.iNumber;

		pn1=this.pclass.FindNumber("标题高度");
		if(pn1!=null)this.iTitleHeight=pn1.iNumber;

		this.ptitles=new Array(this.iTitleCount);//
		pc2=this.pclass.FindClass("标题");
		if(pc2!=null)
		{
			for(i=0;i<this.iTitleCount;i++)
			{
				this.ptitles[i]=new _LISTTITLE();
				pc=pc2.FindClass("标题"+(i+1));
				if(pc!=null)
				{
					pn1=pc.FindNumber("宽度");
					if(pn1!=null)this.ptitles[i].iWidth=pn1.iNumber;
					pw=pc.FindWord("标题名");
					if(pw!=null)this.ptitles[i].sName=pw.pword;
					pw=pc.FindWord("类型");
					if(pw!=null)
					{
						if(pw.pword=="容器")this.ptitles[i].iType=2;
					}
					pw=pc.FindWord("对齐方式");
					if(pw!=null)
					{
						if(pw.pword=="中")this.ptitles[i].iLocate=1;
					}
					pc3=pc.FindClass("背景框");
					if(pc3!=null && this.iTitleHeight>0)
					{
						this.ptitles[i].pframe=new XmsCFrame(this.pm3f,pc3,this.prun);
						pc3.pobj=this.ptitles[i].pframe;
					}
				}
			}
		}
		j=0;
		pc2=this.pclass.FindClass("行内容");
		if(pc2!=null)
		{
			while(true)
			{
				pc=pc2.FindClass("行内容"+(j+1));
				if(pc==null)break;
				var pf=pc.pca.phead;
				var pll=this.AddLine();
				for(i=0;i<this.iTitleCount;i++)
				{
					switch(this.ptitles[i].iType)
					{
					case 2://容器
						pll.pfiled[i]=new XmsCOle(this.pm3f,pf,this.prun);
						pc3=pc.FindFirst("选中覆盖框",5);
						if(pc3!=null)pll.pcoverframe[i]=pc3.pobj;
						break;
					}
				}
				pf=pf.pdown;
				j++;
			}
		}
		
		pw=this.pclass.FindWord("标题可开关");
		if(pw==null)this.iSwitch=0;
		else if(pw.pword=="开")this.iSwitch=1;
		else this.iSwitch=2;
	}
	Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
	}
	 AddLine()
	{
		if(this.plines==null)
		{
			this.plines=new _LISTLINE();
			return this.plines;
		}
		else
		{
			var pend=this.plines;
			while(pend.pnext!=null)pend=pend.pnext;
			pend.pnext=new _LISTLINE();
			return pend.pnext;
		}
	}
	Draw( offx, offy)
	{
		var i,j,k;
		var xx,yy;

		this.iOffX=offx;
		this.iOffY=offy;

		xx=this.iX+offx;
		yy=this.iY+offy;
		this.pm3f.DrawRect_2D(xx,yy,xx+this.iW,yy+this.iH,0xffffffff);
		if(this.iTitleHeight>0)
		{//有标题栏
			j=0;
			for(i=0;i<this.iTitleCount;i++)
			{
				if(this.iTitleHeight>0)
				{
					if(this.ptitles[i].pframe!=null)this.ptitles[i].pframe.Draw(xx+j,yy);
				}
				if(this.ptitles[i].sName.length>0)
				{
					this.pm3f.DrawTextEx(xx+j+this.ptitles[i].iWidth/2,yy+this.iTitleHeight/2,this.ptitles[i].sName,0xffffffff,30,101,1,1,0,-2,-2);
				}
				j+=this.ptitles[i].iWidth;
			}
			yy+=this.iTitleHeight;
			this.pm3f.DrawLine(xx,yy,xx+this.iW,yy,0xffffffff);
		}
		if(this.iSwitch==2)
		{
			this.iH=this.iTitleHeight;
			return;
		}
		this.pm3f.SetViewClip(xx,yy,xx+this.iW,yy+this.iH-this.iTitleHeight);
		var pll=this.plines;
		var addh;
		j=0;k=0;
		while(pll!=null)
		{
			if(this.iSelectLine==k)
			{//被选中背景
				addh=0;
				for(i=0;i<this.iTitleCount;i++)
				{
					if(this.ptitles[i].iType==2)
					{//控件容器
						var pcole=pll.pfiled[i];
						if(addh<pcole.iH+(pcole.bHaveExtend&pcole.bShowExtend?pcole.pExtend.iH:0))addh=pcole.iH+(pcole.bHaveExtend&pcole.bShowExtend?pcole.pExtend.iH:0);
					}
				}
				//this.pm3f.FillRect_2D(xx,yy+j+this.iScrollY,xx+this.iW,yy+j+this.iScrollY+addh,0xff0000ff);
			}
			addh=0;
			for(i=0;i<this.iTitleCount;i++)
			{
				if(this.ptitles[i].iType==2)
				{//控件容器
					var pcole=pll.pfiled[i];
					if(this.iSelectLine==k)
					{
						if(pll.pcoverframe[i]!=null)pll.pcoverframe[i].bHide=false;
						pcole.bShowExtend=true;
					}
					else
					{
						if(this.iSelectLine>=0)
						{
							pcole.bShowExtend=false;
							if(pll.pcoverframe[i]!=null)pll.pcoverframe[i].bHide=true;
						}
					}
					pcole.Draw(xx,yy+j+this.iScrollY);
					if(addh<pcole.iH+(pcole.bHaveExtend&pcole.bShowExtend?pcole.pExtend.iH:0))addh=pcole.iH+(pcole.bHaveExtend&pcole.bShowExtend?pcole.pExtend.iH:0);
					
				}
			}
			j+=addh;
			k++;
			pll=pll.pnext;
		}
		this.iDetailHeight=j;
		this.pm3f.NoClip();
		if(this.iSwitch==1)this.iH=this.iTitleHeight+this.iDetailHeight;
		
		if(!this.bLockScroll)
		{//不在拉动，反弹到正确位置
			if(this.iDetailHeight<this.iH-this.iTitleHeight)
			{
				if(this.iScrollY>10 || this.iScrollY<-10)this.iScrollY/=2;
				else this.iScrollY=0;
			}
			else
			{
				j=-(this.iDetailHeight-(this.iH-this.iTitleHeight));//可拉动范围(j,0)
				if(this.iScrollY<j)
				{
					i=j-this.iScrollY;
					if(i>10)i/=2;
					this.iScrollY+=i;
				}
				if(this.iScrollY>0)
				{
					if(this.iScrollY>10)this.iScrollY/=2;
					else this.iScrollY=0;
				}
			}
		}
	}
	CleanSelect()
	{
		var i;
		var pll=this.plines;
		while(pll!=null)
		{
			for(i=0;i<this.iTitleCount;i++)
			{
				if(this.ptitles[i].iType==2)
				{//控件容器
					if(pll.pcoverframe[i]!=null)pll.pcoverframe[i].bHide=true;
				}
			}
			pll=pll.pnext;
		}
		this.iSelectLine=-1;
	}
	ProcTouch( msg, x, y)
	{
		x-=this.iOffX;
		y-=this.iOffY;
		if(this.bTouchDown)
		{
			if(msg==2)
			{
				if(this.bLockScroll)
				{
					if(this.iSwitch==0)
					{
						this.iScrollY-=(this.iLockY-y);
						this.iLockY=y;
					}
					return true;
				}
				else if(Math.abs(this.iLockY-y)>10)
				{
					if(this.iSwitch==0)
					{
						this.iLockY=y;
						this.bLockScroll=true;
					}
					else this.bTouchDown=false;
//					return true;
				}
			}
			if(msg==3)
			{
				if(this.bLockScroll)
				{
					this.bLockScroll=false;
					this.bTouchDown=false;
					return true;
				}
				else
				{//选中
					this.iSelectLine=this.iSelectLineTmp;
				}
				this.bTouchDown=false;
			}
		}
		if(XDefine.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))
		{
			var pll=this.plines;
			var i,j=0,k=0;
			var addh;
			
			if(this.iTitleHeight>0)
			{//有标题栏
				for(i=0;i<this.iTitleCount;i++)
				{
					if(this.ptitles[i].pframe!=null)
					{
						if(this.ptitles[i].pframe.bInConrtolRect(this.iOffX+x,this.iOffY+y))
						{
							if(msg==1)
							{
								this.ptitles[i].bDown=true;
								//return true;
							}
							else if(msg==3)
							{
								if(this.ptitles[i].bDown)
								{
									this.ptitles[i].bDown=false;
									if(this.iSwitch==1)this.iSwitch=2;
									else if(this.iSwitch==2)this.iSwitch=1;
								}
							}
						}
					}
				}
			}
			if(this.iSwitch==2)return false;
			this.iSelectLineTmp=-1;
			while(pll!=null)
			{
				addh=0;
				for(i=0;i<this.iTitleCount;i++)
				{
					if(this.ptitles[i].iType==2)
					{//控件容器
						var pcole=pll.pfiled[i];
//						this.iX+this.iOffX
//						this.iY+this.iOffY+this.iTitleHeight
						if(pcole.ProcTouch(msg,x+this.iOffX,y+this.iOffY))
						{
							return true;
						}
						if(addh<pcole.iH+(pcole.bHaveExtend&pcole.bShowExtend?pcole.pExtend.iH:0))addh=pcole.iH+(pcole.bHaveExtend&pcole.bShowExtend?pcole.pExtend.iH:0);
					}
				}
				if(y-this.iTitleHeight>=this.iY+j+this.iScrollY && y-this.iTitleHeight<=this.iY+j+this.iScrollY+addh)
				{
					this.iSelectLineTmp=k;
				}
				j+=addh;
				k++;
				pll=pll.pnext;
			}
			if(msg==1)
			{
				this.bTouchDown=true;
				this.iLockY=y;
			}
			if(this.iSwitch>0)return false;
			return true;
		}
		this.bTouchDown=false;
		return false;
	}


}
