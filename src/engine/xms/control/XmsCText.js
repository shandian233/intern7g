
import XDefine from "../../../config/XDefine"
import M3DFast from "../../../engine/graphics/M3DFast"
import RunFirst from "../../../engine/xms/RunFirst"
import X10_NUMBER from "../../../engine/xms/first/X10_NUMBER"
import X20_FLOAT from "../../../engine/xms/first/X20_FLOAT"
import X30_WORD from "../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../engine/xms/first/X40_CLASS"
import GmPlay from "../../../engtst/mgm/GmPlay"
import FormatString from "../../../engtst/mgm/frame/format/FormatString"
import XmsCBaseControl from "./XmsCBaseControl"

export default class XmsCText extends XmsCBaseControl{
	 constructor( m3f,  pc,  pr)
	{
		super();
		this.iX=0;
		this.iY=0;
		this.pm3f=m3f;
		this.pclass = pc;
		this.prun = pr;
		this.ReLoad();
	}
	ReLoad()
	{
		var pn;
		var pf;
		var pw;

		pn=this.pclass.FindNumber("坐标X");
		if(pn!=null)this.iX=pn.iNumber;
		pn=this.pclass.FindNumber("坐标Y");
		if(pn!=null)this.iY=pn.iNumber;

		pw=this.pclass.FindWord("文字内容");
		if(pw!=null)this.sText=pw.pword;

		GmPlay.sop("Reload Text = "+this.sText);
		
		pw=this.pclass.FindWord("颜色");
		if(pw!=null)
		{
			var i=0;
			this.iColor=0;
			while(pw.pword.length>i)
			{
				if(pw.pword.charAt(i)>='0' && pw.pword.charAt(i)<='9')this.iColor=(this.iColor<<4)|(pw.pword.charAt(i)-'0');
				else if(pw.pword.charAt(i)>='a' && pw.pword.charAt(i)<='f')this.iColor=(this.iColor<<4)|(pw.pword.charAt(i)-'a'+10);
				else if(pw.pword.charAt(i)>='A' && pw.pword.charAt(i)<='F')this.iColor=(this.iColor<<4)|(pw.pword.charAt(i)-'A'+10);
				i++;
			}
			this.iColor|=0xff000000;
		}

		pn=this.pclass.FindNumber("文字大小");
		if(pn!=null)this.iSize=pn.iNumber;
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
		
		var pc//=this.pclass.FindClass("描边");
		if(pc==null)this.bStroke=false;
		else
		{
			this.bStroke=true;
			pn=pc.FindNumber("类型");
			if(pn!=null)this.iStrokeType=pn.iNumber;

			pw=pc.FindWord("颜色");
			if(pw!=null)
			{
				var i=0;
				this.iStrokeColor=0;
				while(pw.pword.length>i)
				{
					if(pw.pword.charAt(i)>='0' && pw.pword.charAt(i)<='9')this.iStrokeColor=(this.iStrokeColor<<4)|(pw.pword.charAt(i)-'0');
					else if(pw.pword.charAt(i)>='a' && pw.pword.charAt(i)<='f')this.iStrokeColor=(this.iStrokeColor<<4)|(pw.pword.charAt(i)-'a'+10);
					else if(pw.pword.charAt(i)>='A' && pw.pword.charAt(i)<='F')this.iStrokeColor=(this.iStrokeColor<<4)|(pw.pword.charAt(i)-'A'+10);
					i++;
				}
				this.iStrokeColor|=0xff000000;
			}
		}
		pc=this.pclass.FindClass("格式化输出");
		if(pc==null)this.bFormat=false;
		else
		{
			this.bFormat=true;
			pn=pc.FindNumber("行宽");
			if(pn!=null)this.iFormatW=pn.iNumber;
			pn=pc.FindNumber("行高");
			if(pn!=null)this.iFormatH=pn.iNumber;
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
		this.iOffY=offy;
		if(this.bFormat)
		{
			FormatString.gi().FormatEx(this.sText,this.iFormatW,this.iSize,this.bStroke?this.iStrokeType:0,this.iStrokeColor,this.iFormatH);
//			x_pole.pfs.iBaseColor=this.iColor;
//			x_pole.pfs.FormatEx(this.sText,this.iFormatW,this.iSize,this.bStroke?this.iStrokeType:0,this.iStrokeColor,this.iFormatH);
//			x_pole.pfs.Draw(this.iX+offx,this.iY+offy);
			FormatString.gi().Draw(this.iX+offx,this.iY+offy);

			this.iTextX=this.iX+offx;
			this.iTextY=this.iY+offy;
			this.iTextW=FormatString.gi().iW;
			this.iTextH=FormatString.gi().iH;
		}
		else
		{
			if(this.bStroke)this.pm3f.DrawText_2(this.iX+offx,this.iY+offy,this.sText,this.iColor,this.iSize,this.iAlpha,this.fSw,this.fSh,this.iRa,this.iRax,this.iRay,this.iStrokeType,this.iStrokeColor);
			else this.pm3f.DrawTextEx(this.iX+offx,this.iY+offy,this.sText,this.iColor,this.iSize,this.iAlpha,this.fSw,this.fSh,this.iRa,this.iRax,this.iRay);
			this.iTextX=this.pm3f.drawrect[0];
			this.iTextY=this.pm3f.drawrect[1];
			this.iTextW=this.pm3f.drawrect[2]-this.pm3f.drawrect[0];
			this.iTextH=this.pm3f.drawrect[3]-this.pm3f.drawrect[1];
		}
//		
//		if(this.bStroke)this.pm3f.DrawText_2(this.iX+offx,this.iY+offy,this.sText,this.iColor,this.iSize,this.iAlpha,this.fSw,this.fSh,this.iRa,this.iRax,this.iRay,this.iStrokeType,this.iStrokeColor);
//		else this.pm3f.DrawTextEx(this.iX+offx,this.iY+offy,this.sText,this.iColor,this.iSize,this.iAlpha,this.fSw,this.fSh,this.iRa,this.iRax,this.iRay);
//		
//		this.iTextX=this.pm3f.drawrect[0];
//		this.iTextY=this.pm3f.drawrect[1];
//		this.iTextW=this.pm3f.drawrect[2]-this.pm3f.drawrect[0];
//		this.iTextH=this.pm3f.drawrect[3]-this.pm3f.drawrect[1];
	}
	
	 bInConrtolRect( x, y)
	{
		return XDefine.bInRect(x,y,this.iTextX,this.iTextY,this.iTextW,this.iTextH);
	}

	DrawControlRect( pm3f)
	{
		var i;
		var x=this.iTextX;
		var y=this.iTextY;
		var w=this.iTextW;
		var h=this.iTextH;
		for(i=0;i<5;i++)
		{
//			this.pm3f.DrawRect(x-i,y-i,w+i*2,h+i*2,0xff000000|((i*50)<<16)|((255-i*50)<<8));
			this.pm3f.DrawRect_2D(x-i,y-i,w+i*2,h+i*2,0xffff0000|((255-i*50)<<8));
		}
	}
}
