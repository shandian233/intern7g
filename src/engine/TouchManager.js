
import GmConfig from "../config/GmConfig"
import XDefine from "../config/XDefine"
import GmPlay from "../engtst/mgm/GmPlay"
import SystemOperate from "../engtst/mgm/gameing/fast/SystemOperate"
import _TOUCHMANAGE from "./_TOUCHMANAGE"

export default class TouchManager {

	
	constructor()
	{
		this.procstack=new _TOUCHMANAGE(TouchManager.MAXTOUCHPROC);
		this.procing=new _TOUCHMANAGE();

		this.ISHENGPING = false;//判断是否横屏，使用系统横屏
		var i;
		for(i=0;i<TouchManager.MAXTOUCH;i++)
		{
			TouchManager.ths[i]=new _TOUCHMANAGE();
			TouchManager.ths[i].iTouchStat=TouchManager.TOUCH_NONE;
		}
		for(i=0;i<TouchManager.MAXTOUCHPROC;i++)
		{
			this.procstack[i]=new _TOUCHMANAGE();
		}
		this.iTouchCount=0;
		this.iProcPoint=0;
		this.iProcEnd=0;
		TouchManager.iFingerId=-1;
	}
	clear()
	{
		var i;
		for(i=0;i<TouchManager.MAXTOUCH;i++)
		{
			TouchManager.ths[i].iTouchStat=TouchManager.TOUCH_NONE;
		}
		this.iTouchCount=0;
		this.iProcPoint=0;
		this.iProcEnd=0;
		TouchManager.iFingerId=-1;
	}
	pushtouch( index)
	{
		if(this.iProcEnd<this.iProcPoint+TouchManager.MAXTOUCHPROC)
		{
			this.procstack[this.iProcEnd%TouchManager.MAXTOUCHPROC].copyfrom(TouchManager.ths[index]);
			this.iProcEnd++;
			return true;
		}
		GmPlay.sop("Not Enuphy touch");
		return false;
	}
	poptouch()
	{
		if(this.iProcPoint<this.iProcEnd)
		{
			this.procing.copyfrom(this.procstack[this.iProcPoint%TouchManager.MAXTOUCHPROC]);
			TouchManager.iFingerId=this.procing.iTid;
//			this.procingbuffer.copyfrom(this.procing);
			this.iProcPoint++;
			return true;
		}
		return false;
	}

//	SwapSCRWH( fScaleRate)
//	{
//		this.procing.iX= (1.0f*this.procingbuffer.iX/fScaleRate);
//		this.procing.iY= (1.0f*this.procingbuffer.iY/fScaleRate);
//	}
	
	touch_count()
	{
		return this.iTouchCount;
	}
	calcxy( x, y)
	{
		if(this.ISHENGPING)
		{
			x= ((x*GmConfig.SCRH)/GmConfig.REALW);
			y= ((y*GmConfig.SCRW)/GmConfig.REALH);
			
			this.cy=x;
			this.cx=y;
		}
		else 
		{//
//			this.cx= (((x-GmConfig.OFFX)*GmConfig.SCRW)/GmConfig.REALW);
//			this.cy= (((y-GmConfig.OFFY)*GmConfig.SCRH)/GmConfig.REALH);
			this.cx= (((x-GmConfig.OFFX)*SystemOperate.BASEW)/GmConfig.REALW);
			this.cy= (((y-GmConfig.OFFY)*SystemOperate.BASEH)/GmConfig.REALH);
		}
	}
//	GmConfig.SCRW = 800+(iScreenLS*(GmConfig.SYSW-800)/400);
//	GmConfig.SCRH = 480+(iScreenLS*(GmConfig.SYSH-480)/400);

	touch_down( tid, x, y)
	{
		if(TouchManager.ths[tid].iTouchStat!=TouchManager.TOUCH_NONE)return;//触摸中，不再次触发
		this.calcxy(x,y);
		
		this.iLastDownX=this.cx;
		this.iLastDownY=this.cy;
		TouchManager.ths[tid].iTouchStat=TouchManager.TOUCH_DOWN;
		TouchManager.ths[tid].iTid=tid;
		TouchManager.ths[tid].iX=this.cx;
		TouchManager.ths[tid].iY=this.cy;
		TouchManager.ths[tid].iPX=this.cx;
		TouchManager.ths[tid].iPY=this.cy;
		TouchManager.ths[tid].iSourceX=x;
		TouchManager.ths[tid].iSourceY=y;
		this.pushtouch(tid);
		
		this.iTouchCount++;
	}
	touch_up( tid, x, y)
	{
		if(TouchManager.ths[tid].iTouchStat==TouchManager.TOUCH_NONE)return;
		this.calcxy(x,y);

		TouchManager.ths[tid].iTouchStat=TouchManager.TOUCH_UP;
		TouchManager.ths[tid].iX=this.cx;
		TouchManager.ths[tid].iY=this.cy;
		TouchManager.ths[tid].iSourceX=x;
		TouchManager.ths[tid].iSourceY=y;
		this.pushtouch(tid);
		TouchManager.ths[tid].iTouchStat=TouchManager.TOUCH_NONE;
		this.iTouchCount--;
	}

	touch_move( x, y)
	{
		var i,j,k=99999;
		var tid=-1;
		this.calcxy(x,y);
		for(i=0;i<TouchManager.MAXTOUCH;i++)
		{
			if(TouchManager.ths[i].iTouchStat==TouchManager.TOUCH_NONE)continue;
			j=XDefine.llength(this.cx, this.cy, TouchManager.ths[i].iX, TouchManager.ths[i].iY);
			if(j==0)return;
			if(tid==-1)
			{
				tid=i;
				k=j;
			}
			else if(j<k)
			{
				tid=i;
				k=j;
			}
		}
		if(tid==-1)return;
//		if(k>50)return;

		TouchManager.ths[tid].iTouchStat=TouchManager.TOUCH_MOVE;
		TouchManager.ths[tid].iPX=TouchManager.ths[tid].iX;
		TouchManager.ths[tid].iPY=TouchManager.ths[tid].iY;
		TouchManager.ths[tid].iX=this.cx;
		TouchManager.ths[tid].iY=this.cy;
		TouchManager.ths[tid].iSourceX=x;
		TouchManager.ths[tid].iSourceY=y;
		this.pushtouch(tid);
	}
	
//	touch_realwh( fromw,  fromh, tow, toh) {
//		this.iRealScrW = fromw;
//		this.iRealScrH = fromh;
//		this.SCRW = tow;
//		this.SCRH = toh;
//	}

}
	TouchManager.TOUCH_NONE=0;
	TouchManager.TOUCH_DOWN=1;
	TouchManager.TOUCH_MOVE=2;
	TouchManager.TOUCH_UP=3;

	TouchManager.MAXTOUCHPROC=64;
	TouchManager.MAXTOUCH=64;
	TouchManager.ths=new Array(TouchManager.MAXTOUCH);//
	//TouchManager.tm=new TouchManager();
	TouchManager.iFingerId;

	TouchManager.tm=null;
	TouchManager.gi=function()
	{
		if(TouchManager.tm==null)TouchManager.tm=new TouchManager();
		return TouchManager.tm;
	}
	TouchManager.FingerLocker=function( fg)
{
	if(fg==-1)return -1;
	if(TouchManager.ths[fg].iTouchStat==TouchManager.TOUCH_NONE)return -1;
	return fg;
}
TouchManager._swapx=function( x)
	{
		var i;

		i = 800+(SystemOperate.iScreenLS*(SystemOperate.MAXW-800)/400);
//		if(SystemOperate.iSameRate==0)j=GmConfig.SCRW*GmConfig.SYSH/GmConfig.SYSW;//
//		else j = 480+(SystemOperate.iScreenLS*(maxh-480)/400);

		return x*i/SystemOperate.BASEW;
	}
	TouchManager. _swapy=function( y)
	{
		var i,j;

		if(SystemOperate.iSameRate==0)
		{
			i = 800+(SystemOperate.iScreenLS*(SystemOperate.MAXW-800)/400);
			j=i*GmConfig.SYSH/GmConfig.SYSW;//
		}
		else j = 480+(SystemOperate.iScreenLS*(SystemOperate.MAXH-480)/400);
		
		return y*j/SystemOperate.BASEH;
	}