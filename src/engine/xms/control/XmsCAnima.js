
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import RunFirst from "../../../engine/xms/RunFirst"
import XmsEngine from "../../../engine/xms/XmsEngine"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X20_FLOAT from "../../../engine/xms/first/X20_FLOAT"
import X30_WORD from "../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import XmsCBaseControl from "./XmsCBaseControl"

export default class XmsCAnima extends XmsCBaseControl{
	constructor( p,  pc,  pr)
	{
		super();
		this.iX=0;
		this.iY=0;
		this.pm3f=M3DFast.xm3f;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}

	ReLoad()
	{
		var pw1,pw2;
		var pc;
		var pn;
		var pf;

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

		pn=this.pclass.FindNumber("坐标X");
		if(pn!=null)this.iX=pn.iNumber;
		pn=this.pclass.FindNumber("坐标Y");
		if(pn!=null)this.iY=pn.iNumber;

		pn=this.pclass.FindNumber("绘制第几帧");
		if(pn!=null)this.xaa.iFrame=pn.iNumber;

		pn=this.pclass.FindNumber("透明度");
		if(pn!=null)this.iAlpha=pn.iNumber;

		pf=this.pclass.FindFloat("水平缩放");
		if(pf!=null)this.fSw=pf.fFloat;
		pf=this.pclass.FindFloat("垂直缩放");
		if(pf!=null)this.fSh=pf.fFloat;

		pn=this.pclass.FindNumber("旋转角度");
		if(pn!=null)this.iRa=pn.iNumber;
		pn=this.pclass.FindNumber("旋转锚点X");
		if(pn!=null)this.iRax=pn.iNumber;
		pn=this.pclass.FindNumber("旋转锚点Y");
		if(pn!=null)this.iRay=pn.iNumber;

	}
	Init( pani, s)
	{
		this.xaa=pani.InitAnimaWithName(s,null);
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
		this.xaa.DrawEx(this.iX+offx,this.iY+offy,this.iAlpha,this.fSw,this.fSh,this.iRa,this.iRax,this.iRay);
	}
}
