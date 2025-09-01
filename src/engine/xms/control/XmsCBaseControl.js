
import XDefine from "../../../config/XDefine"
import M3DFast from "../../../engine/graphics/M3DFast"

export default class XmsCBaseControl {
	constructor()
	{
		
	}
	Draw()
	{
	}
	Draw( offx, offy)
	{
	}
	
	ProcTouch( msg, x, y)
	{
		return false;
	}

	bInConrtolRect( x, y)
	{
		return XDefine.bInRect(x,y,this.iOffX+this.iX,this.iOffY+this.iY,this.iW,this.iH);
	}
	DrawControlRect( pm3f)
	{
		var i;
		var x=this.iX+this.iOffX;
		var y=this.iY+this.iOffY;
		var w=this.iW;
		var h=this.iH;
		for(i=0;i<5;i++)
		{
//			pm3f->DrawRect(x-i,y-i,w+i*2,h+i*2,0xff000000|((i*50)<<16)|((255-i*50)<<8));
			pm3f.DrawRect_2D(x-i,y-i,w+i*2,h+i*2,0xffff0000|((255-i*50)<<8));
		}
	}
}
