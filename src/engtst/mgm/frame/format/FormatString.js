
import DrawBuffer from "../../../../map/DrawBuffer"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import LockRect from "./LockRect"
import UnitList from "./UnitList"


export default class FormatString {
	

//	public int iX,iY,iW,iH;//格式化后，字符所占宽高
	
	constructor()
	{
		this.iLineY=new Int32Array(FormatString.MAXUNIT);
		this.iLineH=new Int32Array(FormatString.MAXUNIT);
		var i;
		this.pm3f=M3DFast.gi();
		this.uls=new Array(FormatString.MAXUNIT);
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			this.uls[i]=new UnitList();
		}
		this.aa_face=new AnimaAction();
		
		this.lrs=new Array(10);
		for(i=0;i<10;i++)this.lrs[i]=new LockRect();

		this.ilp=0;//当前行号
	}
	  InsertLocker( p, base, ls, exc, exd)
	{
		if(base.indexOf(exc+ls)>=0)
		{
			return base.replace(exc+ls, exd+"#L"+p+"["+ls+"#]");
		}
		return base;
	}
	CheckOutRect()
	{
		var i;
		var sx=-1,sy=-1;
		var rectpoint=-1;
		var linepoint=-1;
		for(i=0;i<10;i++)this.lrs[i].Clear();
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			if(this.uls[i].iLp==-1)break;
			switch(this.uls[i].iType)
			{
			case 2://锁定头
				rectpoint=this.uls[i].iColor;
				linepoint=this.uls[i].iLp;
				this.lrs[rectpoint].Clear();
				sx=this.uls[i].iX;
				sy=this.iLineY[linepoint];
				break;
			case 3://锁定尾
				if(rectpoint>=0)
				{
					this.lrs[rectpoint].Add(sx, sy, this.uls[i].iX-sx, this.iLineH[linepoint]);
					rectpoint=-1;
				}
				break;
			default://其他情况
				if(rectpoint>=0 && this.uls[i].iLp!=linepoint)
				{
					this.lrs[rectpoint].Add(sx, sy, this.iW-sx, this.iLineH[linepoint]);
					linepoint=this.uls[i].iLp;
					sx=this.uls[i].iX;
					sy=this.iLineY[linepoint];
				}
				break;
			}
		}

	}
	 hto( c)
	{
		switch(c)
		{
		case '0':return 0;
		case '1':return 1;
		case '2':return 2;
		case '3':return 3;
		case '4':return 4;
		case '5':return 5;
		case '6':return 6;
		case '7':return 7;
		case '8':return 8;
		case '9':return 9;
		case 'a':case 'A':return 10;
		case 'b':case 'B':return 11;
		case 'c':case 'C':return 12;
		case 'd':case 'D':return 13;
		case 'e':case 'E':return 14;
		case 'f':case 'F':return 15;
		}
		return -1;
	}
	  NextUnit( s, p)
	{//0文字，1表情，2物品，3宠物
		var i,j,k;
		var c=s[p];
		if(c==FormatString.KEY)
		{//特殊意义
			this.iCurrentType=999;
			if(p+1>=s.length)
			{
				this.sCurrentString="";
				return p+1;
			}
			c=s[p+1];

			if(c==' ')
			{
				this.iSpaceWidth+=this.WORDSIZE;
				return p+2;
			}
			else if(c=='o' || c=='O')
			{
				this.iCurrentColor=this.iOldColor;
				this.iCurrentType=999;
				return p+2;
			}
			else if(c=='|')
			{
				return p+2;
			}
			else if(c=='l' || c=='L')
			{//锁定位置cxb
				this.iLockRectPoint=s.charAt(p+2)-'0';
				this.iCurrentType=3;
				this.sCurrentString="";
				return p+=4;
			}
			else if(c==']')
			{//锁定结束
				this.iCurrentType=4;
				this.sCurrentString="";
				return p+=2;
			}
			else if(c=='e' || c=='E')
			{//换行
				this.iCurrentType=2;
				this.sCurrentString="";
				return p+2;
			}
			else if(c=='f' || c=='F')
			{//表情
				this.sCurrentString="";
				p+=2;
				j=0;
				
				for(k=0;k<3;k++)
				{
					if(p>=s.length)break;
					//c=s.charAt(p);
					i=this.hto(s[p]);
					if(i==-1)break;
					j=j*10+i;
					p++;
				}
//				if(p>=s.length)return p;
//				c=s.charAt(p);
//				i=this.hto(c);
//				if(i==-1)return p;
//				j=j*10+i;
//				p++;
//				
//				if(p>=s.length)
//				{
//					if(j>=1 && j<=12)
//					{
//						this.iCurrentType=1;
//						this.sCurrentString="表情"+j;
//					}
//					return p;
//				}
//				c=s.charAt(p);
//				i=this.hto(c);
//				if(i==-1)
//				{
//					if(j>=1 && j<=12)
//					{
//						this.iCurrentType=1;
//						this.sCurrentString="表情"+j;
//					}
//					return p;
//				}
//				j=j*10+i;
//				p++;
				
				if(j>=0 && j<900)
				{
					this.iCurrentType=1;
					this.sCurrentString="表情"+j;
				}
				return p;
			}
			else if(c=='c' || c=='C')
			{//颜色
				this.iCurrentType=999;
				p+=2;
				this.iOldColor=this.iCurrentColor;
				this.iCurrentColor=0;
				for(i=0;i<6;i++)
				{
					if(p>=s.length)
					{
						this.sCurrentString="";
						return p;
					}
					c=s.charAt(p);
					j=this.hto(c);
					if(j==-1)
					{
						this.iCurrentColor|=0xff000000;
						return p;
					}
					else
					{
						this.iCurrentColor=(this.iCurrentColor<<4)|j;
					}
					p++;
				}
				this.iCurrentColor|=0xff000000;
				return p;
			}
			else
			{
				this.iCurrentType=0;
				this.sCurrentString=""+FormatString.KEY;
				return p+1;
			}
		}
		else
		{
			this.iCurrentType=0;
			this.sCurrentString=""+c;
//			this.iCurrentWidth=this.pm3f.GetTextWidth(this.sCurrentString, 30);
			p++;
		}

		return p;
	}
	  AddUnit( lp, up, type, color, x, h, detail)
	{//添加一个单位
		this.uls[up].iType=type;
		this.uls[up].sDetail=detail;
		this.uls[up].iColor=color;
		this.uls[up].iX=x;
		this.uls[up].iH=h;
		this.uls[up].iLp=lp;
		up++;
		return up;
	}
	AddLine( lp, up)
	{
		var i;
		var th=0;
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			if(this.uls[i].iLp==lp)
			{//是这一行的
				if(th<this.uls[i].iH)th=this.uls[i].iH;
			}
		}
		if(this.bEx)
		{
			if(th<this.iExLineGap)th=this.iExLineGap;
		}
//		if(th<this.WORDSIZE)th=this.WORDSIZE;
		this.iLineH[lp]=th;
		this.iLineY[lp+1]=this.iLineY[lp]+th;
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			if(this.uls[i].iLp==lp)
			{//是这一行的
				if(th<this.uls[i].iH)th=this.uls[i].iH;
				this.uls[i].iY=this.iLineY[lp]+th-this.uls[i].iH;
	//			GmPlay.sop("new line:"+this.uls[i].sDetail+","+this.uls[i].iY);
			}
		}
	}

	FormatEx( s, w, size, type, backcolor, linegap)
	{
		this.bEx=true;
		this.iExType=type;
		this.iExColor=backcolor;
		this.iExLineGap=linegap;
		
		this.WORDSIZE=size;
		var i;
		var isp=0;
		var iup=0;
		var ts="";
		var tc=0xffffffff;
		this.iW=0;
		this.ilp=0;
		
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			this.uls[i].iLp=-1;
			this.iLineY[i]=0;
			this.iLineH[i]=0;
		}

		this.iCurrentColor=0xffffffff;
		this.iOldColor=0xffffffff;
		this.iSpaceWidth=0;
		while(isp<s.length)
		{
			isp=this.NextUnit(s,isp);//取到，看是否能放下去
//			GmPlay.sop("isp="+isp);
			if(this.iCurrentType==0)
			{
				if(this.iW+this.pm3f.GetTextWidth(ts+this.sCurrentString, this.WORDSIZE)>=w)
				{//加上新文字超长
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.AddLine(this.ilp,iup);
					this.ilp++;
					ts=this.sCurrentString;
					this.iW=0;
				}
				else if(this.iCurrentColor!=tc || this.iSpaceWidth>0)
				{//颜色不同
					if(ts.length>0)
					{
						this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
						iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
						this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
					}
					ts=this.sCurrentString;
					tc=this.iCurrentColor;
					this.iW+=this.iSpaceWidth;
					this.iSpaceWidth=0;
				}
				else
				{
					ts+=this.sCurrentString;
				}
			}
			else if(this.iCurrentType==1)
			{//表情
				GmPlay.xani_face.InitAnimaWithName(this.sCurrentString, this.aa_face);//表情，获取图片高度
				if(this.aa_face.iDelay<0)continue;//未找到动画
				if(ts.length>0)
				{
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
				}
				
				var tw=GmPlay.xani_face.iAnimaW(this.aa_face);
				var th=GmPlay.xani_face.iAnimaH(this.aa_face);
				if(this.iW+tw>w)
				{//先换行再加表情
					this.AddLine(this.ilp,iup);
					this.ilp++;
					this.iW=0;
				}
				iup=this.AddUnit(this.ilp,iup,1,tc,this.iW,th,this.sCurrentString);//根据表情高度
				this.iW+=tw;
				if(this.iW>=w)
				{//加上新文字超长
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					this.AddLine(this.ilp,iup);
					this.ilp++;
					this.iW=0;
				}
				ts="";
			}
			else if(this.iCurrentType==2)
			{//换行
				this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
				iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
				this.AddLine(this.ilp,iup);
				this.ilp++;
				ts=this.sCurrentString;
				this.iW=0;
			}
			else if(this.iCurrentType==3)
			{//发现锁定头，重新开始字符串cxa
				if(ts.length>0)
				{
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
				}
				ts=this.sCurrentString;
				//加入锁定头
				iup=this.AddUnit(this.ilp,iup,2,this.iLockRectPoint,this.iW,0,"");
			}
			else if(this.iCurrentType==4)
			{//发现锁定尾，重新开始字符串
				if(ts.length>0)
				{
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
				}
				ts=this.sCurrentString;
				//加入锁定尾
				iup=this.AddUnit(this.ilp,iup,3,this.iLockRectPoint,this.iW,0,"");
			}
		}
		if(ts!="")
		{
			this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
			iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
			this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
		}
		this.AddLine(this.ilp,iup);
		this.ilp++;
		this.iH=this.ilp*this.WORDSIZE;
		this.iH=this.iLineY[this.ilp];
		if(this.ilp>=2)this.iW=w;
	}
	
	
	Format( s, w, size)
	{
		this.bEx=false;
//		GmPlay.sop(s);
		this.WORDSIZE=size;
		var i;
		var isp=0;
		var iup=0;
		var ts="";
		var tc=0xffffffff;
		this.iW=0;
		this.ilp=0;
		
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			this.uls[i].iLp=-1;
			this.iLineY[i]=0;
			this.iLineH[i]=0;
		}

		this.iCurrentColor=0xffffffff;
		this.iSpaceWidth=0;
		while(isp<s.length)
		{
			isp=this.NextUnit(s,isp);//取到，看是否能放下去
//			GmPlay.sop("isp="+isp);
			if(this.iCurrentType==0)
			{
				if(this.iW+this.pm3f.GetTextWidth(ts+this.sCurrentString, this.WORDSIZE)>=w)
				{//加上新文字超长
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.AddLine(this.ilp,iup);
					this.ilp++;
					ts=this.sCurrentString;
					this.iW=0;
				}
				else if(this.iCurrentColor!=tc || this.iSpaceWidth>0)
				{//颜色不同
					if(ts.length>0)
					{
						this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
						iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
						this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
					}
					ts=this.sCurrentString;
					tc=this.iCurrentColor;
					this.iW+=this.iSpaceWidth;
					this.iSpaceWidth=0;
				}
				else
				{
					ts+=this.sCurrentString;
				}
			}
			else if(this.iCurrentType==1)
			{//表情
				GmPlay.xani_face.InitAnimaWithName(this.sCurrentString, this.aa_face);//表情，获取图片高度
				if(this.aa_face.iDelay<0)continue;//未找到动画
				if(ts.length>0)
				{
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
				}
				var tw=GmPlay.xani_face.iAnimaW(this.aa_face);
				var th=GmPlay.xani_face.iAnimaH(this.aa_face);
				if(this.iW+tw>w)
				{//先换行再加表情
					this.AddLine(this.ilp,iup);
					this.ilp++;
					this.iW=0;
				}
				iup=this.AddUnit(this.ilp,iup,1,tc,this.iW,th,this.sCurrentString);//根据表情高度
				this.iW+=tw;
				if(this.iW>=w)
				{//加上新文字超长
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					this.AddLine(this.ilp,iup);
					this.ilp++;
					this.iW=0;
				}
				ts="";
			}
			else if(this.iCurrentType==2)
			{//换行
				this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
				iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
				this.AddLine(this.ilp,iup);
				this.ilp++;
				ts=this.sCurrentString;
				this.iW=0;
			}
			else if(this.iCurrentType==3)
			{//发现锁定头，重新开始字符串cxa
				if(ts.length>0)
				{
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
				}
				ts=this.sCurrentString;
				//加入锁定头
				iup=this.AddUnit(this.ilp,iup,2,this.iLockRectPoint,this.iW,0,"");
//				GmPlay.sop("start lock="+this.iLockRectPoint);
			}
			else if(this.iCurrentType==4)
			{//发现锁定尾，重新开始字符串
				if(ts.length>0)
				{
					this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
					iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
					this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
				}
				ts=this.sCurrentString;
				//加入锁定尾
				iup=this.AddUnit(this.ilp,iup,3,this.iLockRectPoint,this.iW,0,"");
//				GmPlay.sop("end lock="+this.iLockRectPoint);
			}
		}
		if(ts!="")
		{
			this.pm3f.GetTextWidth(ts,this.WORDSIZE);//获得当前字符宽高
			iup=this.AddUnit(this.ilp,iup,0,tc,this.iW,this.pm3f.GetTextHeight(),ts);
			this.iW+=this.pm3f.GetTextWidth(ts, this.WORDSIZE);
		}
		this.AddLine(this.ilp,iup);
		this.ilp++;
		this.iH=this.ilp*this.WORDSIZE;
		this.iH=this.iLineY[this.ilp];
		if(this.ilp>=2)this.iW=w;
	}
	Draw( iOx, iOy)
	{
		var i;
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
//			GmPlay.sop("lp : "+this.uls[i].iLp);
			if(this.uls[i].iLp==-1)return;
			switch(this.uls[i].iType)
			{
			case 0:
//				GmPlay.sop("Draw : "+this.uls[i].sDetail);
				if(this.bEx)this.pm3f.DrawText_2(iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.uls[i].sDetail, this.uls[i].iColor, this.WORDSIZE, 101, 1, 1, 0, 0, 0,this.iExType,this.iExColor);
				else this.pm3f.DrawTextEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.uls[i].sDetail, this.uls[i].iColor, this.WORDSIZE, 101, 1, 1, 0, 0, 0);
				break;
			case 1://表情
//				GmPlay.sop("face="+this.uls[i].sDetail);
				GmPlay.xani_face.InitAnimaWithName(this.uls[i].sDetail, this.aa_face);
				this.aa_face.SetFrame(GmPlay.iDelay);
//				DrawBuffer.gi().DrawAnima_aa(iOy+iH+100, null, iOx+this.uls[i].iX, iOy+this.uls[i].iY+20, this.aa_face);
//				this.aa_face.xani.DrawAnimaEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY+20, this.aa_face, 101, 1, 1, 0, 0, 0);
				this.aa_face.DrawEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY, 101, 1, 1, 0, -1, -1);
				break;
			}
		}
	}
	DrawToBuffer( ly, iOx, iOy)
	{
		var i;
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
//			GmPlay.sop("lp : "+this.uls[i].iLp);
			if(this.uls[i].iLp==-1)return;
			switch(this.uls[i].iType)
			{
			case 0:
//				GmPlay.sop("Draw : "+this.uls[i].sDetail);
				DrawBuffer.gi().DrawText(ly, 0, iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.uls[i].sDetail, this.uls[i].iColor,this.WORDSIZE);
//				this.pm3f.DrawTextEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.uls[i].sDetail, this.uls[i].iColor, 30, 101, 1, 1, 0, 0, 0);
				break;
			case 1://表情
//				GmPlay.sop("face="+this.uls[i].sDetail);
				GmPlay.xani_face.InitAnimaWithName(this.uls[i].sDetail, this.aa_face);
				this.aa_face.SetFrame(GmPlay.iDelay);
//				DrawBuffer.gi().DrawAnima_aa(iOy+iH+100, null, iOx+this.uls[i].iX, iOy+this.uls[i].iY+20, this.aa_face);
//				DrawBuffer.gi().DrawAnimaEx(iOy+iH+100, iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.aa_face, 101, 1, 1, 0, 0, 0);
				DrawBuffer.gi().DrawAnimaEx(ly, iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.aa_face, 101, 1, 1, 0, -1, -1);
				break;
			}
		}
	}
}
FormatString.KEY='#';
FormatString.MAXUNIT=64;
FormatString.fs=null;
FormatString.gi=function()
{
	if(FormatString.fs==null)FormatString.fs=new FormatString();
	return FormatString.fs;
}