import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButton from "../../../../engine/control/XButton"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"

	export default class SelectColor {

    
	 
	
	 tostr()
	{
		var s=parseInt(this.iColor,16);
		while(s.length<6)s="0"+s;
		if(s.length>6)s.substring(s.length-6, s.length);
		return s;
	}
	 Init( c)
	{
		if(c>=0)
		{
			this.iColor=c;
			this.iR=(c>>16)&0xff;
			this.iG=(c>>8)&0xff;
			this.iB=c&0xff;
		}
		this.iSelectStat=0;
	}
	SelectColor()
	{
		this.iR=0xff;
		this.iG=0xff;
		this.iB=0xff;
		this.iColor=0xffffffff;
	}
	 Draw()
	{
		var i,j;
		if(this.btn_ok==null)
		{
			this.btn_ok=new XButton(GmPlay.xani_nui2);
			this.btn_ok.InitButton("按钮1_110");
			this.btn_ok.sName="选择";
		}
		var offx,offy;
		this.iW=256+50+110+20;
		this.iH=256+50+52+20;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		offx=this.iX+25;
		offy=this.iY+25;
		i=0xff000000|this.iB;
		j=15;
		M3DFast.gi().FillRect_2D_ex(offx,offy,offx+256,offy+256, i,0xff00|i,0xffff00|i,0xff0000|i);
		M3DFast.gi().DrawCircle(offx+this.iR, offy+255-this.iG, j+1, j+1, 0xff000000);
		M3DFast.gi().DrawCircle(offx+this.iR, offy+255-this.iG, j, j, 0xffffffff);
		M3DFast.gi().DrawCircle(offx+this.iR, offy+255-this.iG, j-1, j-1, 0xff000000);

		offx+=256+20;
		i=0xff000000|(this.iR<<16)|(this.iG<<8);
		M3DFast.gi().FillRect_2D_ex(offx,offy,offx+110,offy+256,i,i|0xff,i|0xff,i);
		M3DFast.gi().DrawCircle(offx+70/2, offy+255-this.iB, j+1, j+1, 0xff000000);
		M3DFast.gi().DrawCircle(offx+70/2, offy+255-this.iB, j, j, 0xffffffff);
		M3DFast.gi().DrawCircle(offx+70/2, offy+255-this.iB, j-1, j-1, 0xff000000);

		offx=this.iX+25;
		offy=this.iY+25+256+20;
		M3DFast.gi().FillRect_2D(offx+80,offy,offx+256,offy+52,0xff000000|this.iColor);
		M3DFast.gi().DrawTextEx(offx, offy+52/2, "颜色：", 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
		
		offx=this.iX+25+256+20;
		offy=this.iY+25+256+20;
		this.btn_ok.Move(offx, offy, 110, 52);
		this.btn_ok.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(msg==3 && !XDefine.bInRect(x,y,this.iX,this.iY, this.iW, this.iH))
		{
			this.iSelectStat=10;
			return true;
		}
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				this.iSelectStat=1;
				return true;
			}
			return false;
		}
		if(XDefine.bInRect(x, y, this.iX+25, this.iY+25, 256, 256))
		{
			this.iR=x-(this.iX+25);
			this.iG=255-(y-(this.iY+25));
			this.iColor=(this.iR<<16)|(this.iG<<8)|this.iB;
		}
		if(XDefine.bInRect(x, y, this.iX+25+256+20, this.iY+25, 70, 256))
		{
			this.iB=255-(y-(this.iY+25));
			this.iColor=(this.iR<<16)|(this.iG<<8)|this.iB;
		}
		return false;
	}
}

SelectColor.sc=new SelectColor();