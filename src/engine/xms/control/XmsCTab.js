
import M3DFast from "../../../engine/graphics/M3DFast"
import RunFirst from "../../../engine/xms/RunFirst"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import XmsCBaseControl from "./XmsCBaseControl"

class _TABLIST
{
//	XmsCButton pbtn;//标签按钮
//	XmsCOle pole;//点击标签后的内容
constructor()
{

}
};

export default class XmsCTab extends XmsCBaseControl{
	
	constructor( p,  pc,  pr)
	{
		super();
		this.iX=0;
		this.iY=0;
		this.pm3f=p;
		this.ptablist=new Array(16);//
		for(var i=0;i<16;i++)this.ptablist[i]=new _TABLIST();
		this.iTabPoint=0;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var pc,pc1,pc2;

		var j=0;
		while(true)
		{
			pc=this.pclass.FindClass("标签"+(j+1));
			if(pc==null)break;
			pc1=pc.FindClass("标签按钮");
			if(pc1==null)break;
			pc2=pc.FindClass("标签容器");
			if(pc2==null)break;
			pc1.pobj=new XmsCButton(this.pm3f,pc1,this.prun);
			pc2.pobj=new XmsCOle(this.pm3f,pc2,this.prun);
			this.AddTab(pc1.pobj,pc2.pobj);
			j++;
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
		var i;
		this.iOffX=offx;
		this.iOffY=offy;
		
		for(i=0;i<this.iTabListCount;i++)
		{
			if(i==this.iTabPoint)
			{
				this.ptablist[i].pole.Draw(offx,offy);
			}
			this.ptablist[i].pbtn.Draw(offx,offy);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<this.iTabListCount;i++)
		{
			if(i==this.iTabPoint)
			{
				if(this.ptablist[i].pole.ProcTouch(msg,x,y))return true;
			}
			if(this.ptablist[i].pbtn.ProcTouch(msg,x,y))
			{
				if(this.ptablist[i].pbtn.IsChecked())
				{
					this.iTabPoint=i;
				}
				return true;
			}
		}
		return false;
	}
	AddTab( pb, po)
	{
		if(this.iTabListCount<16)
		{
			this.ptablist[this.iTabListCount].pbtn=pb;
			this.ptablist[this.iTabListCount].pole=po;
			this.iTabListCount++;
		}
	}
}
