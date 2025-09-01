
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import RunFirst from "../../../engine/xms/RunFirst"
import XmsEngine from "../../../engine/xms/XmsEngine"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X30_WORD from "../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import XmsCBaseControl from "./XmsCBaseControl"
import PublicInterface from "../../../zero/Interface/PublicInterface";

export default class XmsCButton extends XmsCBaseControl{
	
	 constructor( p,  pc,  pr)
	{
		super();
		this.exts=new Int32Array(16);
		this.pm3f=p;
		this.ClearButton();
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var pc;
		var pw1,pw2;
		var pn1,pn2,pn3,pn4;
//		XmsCButton pbtn=new XmsCButton(M3DFast.xm3f);

		pw1=this.pclass.FindWord("按钮文字");
		if(pw1!=null)this.sName=pw1.pword;

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
		
		pc=this.pclass.FindMark(10);//绘制大小
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
	}
	 ClearButton()
	{
		this.bSingleButton=true;

		this.bMouseIn=false;
		this.bMouseDown=false;
		this.bVisible=true;
		this.bDisable=false;
		this.bChecked=false;

		this.sName="";

		this.iX=0;
		this.iY=0;
		this.iOffX=0;
		this.iOffY=0;
	}
	Init( pani, s)
	{
		this.xaa=pani.InitAnimaWithName(s, null);
		if(this.xaa.iDelay>=0)this.bSingleButton=false;
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
		this.iOffY=offy;
		if(!this.bVisible)return;
		if(this.bDisable)
		{
			this.pm3f.FillRect_2D(this.iX+this.iOffX,this.iY+this.iOffY,this.iX+this.iW,this.iY+this.iH,0xC0ffffff);
			return;
		}
		while(PublicInterface.gi().bInBound(this.iX,this.iY,this.iW,this.iH))this.iX--;
		this.prun.RunCode(this.pclass.FindCode("自动执行"));
		if(this.bMouseIn)
		{
			if(this.bMouseDown)
			{
				if(!this.bSingleButton)this.xaa.Draw(this.iX+this.iOffX,this.iY+this.iOffY,1);
				else
				{
					this.pm3f.FillRect_2D(this.iX+this.iOffX,this.iY+this.iOffY,this.iX+this.iOffX+this.iW,this.iY+this.iOffY+this.iH,0x80ffffff);
					this.pm3f.DrawRect_2D(this.iX+this.iOffX,this.iY+this.iOffY,this.iX+this.iOffX+this.iW,this.iY+this.iOffY+this.iH,0xffffffff);
				}
			}
			else
			{
				if(!this.bSingleButton)this.xaa.Draw(this.iX+this.iOffX,this.iY+this.iOffY,0);
				else
				{
					this.pm3f.FillRect_2D(this.iX+this.iOffX,this.iY+this.iOffY,this.iX+this.iOffX+this.iW,this.iY+this.iOffY+this.iH,0x40ffffff);
					this.pm3f.DrawRect_2D(this.iX+this.iOffX,this.iY+this.iOffY,this.iX+this.iOffX+this.iW,this.iY+this.iOffY+this.iH,0xffffffff);
				}
			}
		}
		else
		{
			if(!this.bSingleButton)this.xaa.Draw(this.iX+this.iOffX,this.iY+this.iOffY,0);
			else
			{
				this.pm3f.DrawRect_2D(this.iX+this.iOffX,this.iY+this.iOffY,this.iX+this.iW+this.iOffX,this.iY+this.iH+this.iOffY,0xffffffff);
			}
		}
		if(this.sName.length>0)
		{
			if(this.bSingleButton)this.pm3f.DrawTextEx(this.iX+this.iW/2+this.iOffX,this.iY+this.iH/2+this.iOffY,this.sName,0xffffffff,15,101,1,1,0,-2,-2);
			else this.pm3f.DrawTextEx(this.iX+this.iW/2+this.iOffX,this.iY+this.iH/2+this.iOffY,this.sName,0xffffff00,30,101,1,1,0,-2,-2);
		}
	}
	ProcTouch( msg, x, y)
	{
		if(!this.bVisible)return false;
		if(this.bDisable)return false;

		if(!this.bMoveIn(x,y))
		{
			this.bMouseDown=false;
			return false;
		}
		switch(msg)
		{
		case 1:
			this.bMouseDown=true;
			break;
		case 2:
			break;
		case 3:
			if(this.bMouseDown)
			{
				this.bMouseDown=false;
				this.bChecked=true;

				this.prun.RunCode(this.pclass.FindCode("点击执行"));
			}
			break;
		}

		return true;
	}
	 bMoveIn( x, y)
	{
		this.bMouseIn=false;
		if(this.bSingleButton)
		{
			if(x>=this.iX+this.iOffX && x<=this.iX+this.iW+this.iOffX && y>=this.iY+this.iOffY && y<=this.iY+this.iH+this.iOffY)this.bMouseIn=true;
			else this.bMouseIn=false;
		}
		else
		{
			if(x>=this.iX+this.iOffX && x<=this.iX+this.iW+this.iOffX && y>=this.iY+this.iOffY && y<=this.iY+this.iH+this.iOffY)this.bMouseIn=true;
			else this.bMouseIn=false;
		}
		return this.bMouseIn;
	}
	IsChecked()
	{
		if(this.bChecked)
		{
			this.bChecked=false;
			return true;
		}
		return false;
	}
}
