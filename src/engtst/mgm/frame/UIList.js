
import XDefine from "../../../config/XDefine"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
import DrawMode from "./DrawMode"

export default class UIList {
	
	Clean()
	{
		this.iOffY=0;
		this.iSortType=-1;
		this.iSortUD=0;
		this.iLockPoint=-1;
	}
	constructor( type, count, w, h)
	{
		this.iType=type;
		this.iTitleCount=count;
		this.iW=w;
		this.iH=h;
		this.sTitleName=new Array(this.iTitleCount);//
		this.iTitleWidth=new Int32Array(this.iTitleCount);//
		this.iTitleOffx=new Int32Array(this.iTitleCount);//
		this.bCanSort=new Array(this.iTitleCount);//
		this.iAlign=new Int32Array(this.iTitleCount);//
		for(var i=0;i<this.iTitleCount;i++)
		{
			this.sTitleName[i]="";
			this.iTitleWidth[i]=0;
			this.iAlign[i]=-2;
		}
		this.iTitleHeight=50;
		this.iRowHeight=40;
		this.iOffY=0;
		this.bTouchLock=false;
		this.iCheckPoint=-1;
		this.iLockPoint=-1;
		this.iSortLock=-1;
		
		this.iSortType=-1;
		this.iSortUD=0;
		
		this.btn_list=new Array(3);//
	}
	SetTitle( num, name, width, cansort)
	{
		if(num<0 || num>=this.iTitleCount)return;
		this.sTitleName[num]=name;
		this.iTitleWidth[num]=width;
		this.bCanSort[num]=cansort;
	}
	BeginDraw( x, y)
	{
		var i,j;
		this.iTitleOffx[0]=0;
		for(i=1;i<this.iTitleCount;i++)
		{
			this.iTitleOffx[i]=this.iTitleOffx[i-1]+this.iTitleWidth[i-1];
		}
		this.iX=x;
		this.iY=y;
		M3DFast.gi().SetViewClip(x, y, x+this.iW, y+this.iH);
		
		var offx,offy;
		offx=this.iX;
		offy=this.iY+this.iTitleHeight-this.iOffY%(this.iRowHeight*2)-this.iRowHeight*2;
		j=(this.iH-this.iTitleHeight)/this.iRowHeight+4;
		for(i=0;i<j;i++)
		{
			if(i%2==0)DrawMode.frame_type3("纯色a10_10",offx,offy,this.iW,this.iRowHeight,10,10);
			else DrawMode.frame_type3("纯色b10_10",offx,offy,this.iW,this.iRowHeight,10,10);
			
			offy+=this.iRowHeight;
		}
		if(this.iLockPoint>=0)
		{
			offy=this.iY+this.iTitleHeight+this.iLockPoint*this.iRowHeight-this.iOffY;
//			DrawMode.frame_type1("选中条a20_40", offx, offy, this.iW, 20);
			DrawMode.frame_type4("19号框20_20", offx, offy, this.iW,40,20,20);
		}
		
		this.iMaxLine=0;
		this.iBtnCount=0;
	}
	DrawUnitEx_Anima( x, y, aa, ox, oy)
	{
		if(this.iMaxLine<y)this.iMaxLine=y;
		if(!this.bShow(y))return;
		
		var offx,offy,offw;
		
		offx=this.iTitleOffx[x];
		offw=this.iTitleWidth[x];
		offy=this.iTitleHeight-this.iOffY+y*this.iRowHeight;

		aa.Draw(this.iX+offx+ox,this.iY+offy+oy);
	}
	
	DrawUnitEx_Button( x, y, btn, ox, oy)
	{
		if(this.iMaxLine<y)this.iMaxLine=y;
		if(!this.bShow(y))return;
		
		var offx,offy,offw;
		
		offx=this.iTitleOffx[x];
		offw=this.iTitleWidth[x];
		offy=this.iTitleHeight-this.iOffY+y*this.iRowHeight;

		btn.Move(this.iX+offx+ox,this.iY+offy+oy, btn.iW, btn.iH);
		btn.Draw();
		
		this.btn_list[this.iBtnCount++]=btn;
	}
	DrawUnit( x, y, detail)
	{
		if(this.iMaxLine<y)this.iMaxLine=y;
		if(!this.bShow(y))return;
		
		if(detail.length<=0)return;
		
		var offx,offy,offw;
		
		offx=this.iTitleOffx[x];
		offw=this.iTitleWidth[x];
		offy=this.iTitleHeight-this.iOffY+y*this.iRowHeight;

		if(this.iAlign[x]==0 || this.iAlign[x]==-1)M3DFast.gi().DrawTextEx(this.iX+offx,this.iY+offy+this.iRowHeight/2,detail,0xffffffff,20,101,1,1,0,this.iAlign[x],-2);
		else if(this.iAlign[x]==-2)M3DFast.gi().DrawTextEx(this.iX+offx+offw/2,this.iY+offy+this.iRowHeight/2,detail,0xffffffff,20,101,1,1,0,this.iAlign[x],-2);
		else if(this.iAlign[x]==-3)M3DFast.gi().DrawTextEx(this.iX+offx+offw,this.iY+offy+this.iRowHeight/2,detail,0xffffffff,20,101,1,1,0,this.iAlign[x],-2);
	}
	  OffX( x)
	{
		var offx,offw;
		
		offx=this.iTitleOffx[x];
		offw=this.iTitleWidth[x];
		
		if(this.iAlign[x]==0 || this.iAlign[x]==-1)return this.iX+offx;
		else if(this.iAlign[x]==-2)return this.iX+offx+offw/2;
		else if(this.iAlign[x]==-3)return this.iX+offx+offw;
		return 0;
	}
	 bShow( y)
	{
//		GmPlay.sop("this.iOffY="+this.iOffY);
//		GmPlay.sop("y="+y);
//		GmPlay.sop("this.iRowHeight="+this.iRowHeight);
//		GmPlay.sop("this.iH="+this.iH);
		var offy=-this.iOffY+y*this.iRowHeight;
		if(offy<-this.iRowHeight || offy>this.iH)return false;
		return true;
	}
	FinishDraw()
	{
		var i,j;
		M3DFast.gi().NoClip();
		DrawMode.frame_type2("内阴影a10_10",this.iX,this.iY,this.iW,this.iH,10,10);
		
		if(this.iTitleHeight>0)
		{
		DrawMode.frame_type1("列表标题a20_50", this.iX, this.iY, this.iW, 20);
		for(i=0;i<this.iTitleCount;i++)
		{
			if(this.iTitleWidth[i]>0)
			{
				if(i>0)GmPlay.xani_frame.DrawAnima(this.iX+this.iTitleOffx[i], this.iY+3, "列表分割线a3_44", 0);
				if(this.iSortType==i)M3DFast.gi().DrawText_2(this.iX+this.iTitleOffx[i]+this.iTitleWidth[i]/2, this.iY+25, this.sTitleName[i], 0xffffff00, 26, 101, 1, 1, 0, -2, -2, 4, 0xff008000);
				else M3DFast.gi().DrawText_2(this.iX+this.iTitleOffx[i]+this.iTitleWidth[i]/2, this.iY+25, this.sTitleName[i], 0xffffff00, 25, 101, 1, 1, 0, -2, -2, 4, 0xff800000);
			}
//			if(i%2==0)DrawMode.frame_type3("纯色a10_10",this.iX)
		}
		}
		if(!this.bTouchLock)
		{
			if(this.iOffY<0)this.iOffY/=2;
			j=(this.iH-this.iTitleHeight)/this.iRowHeight-1;
			i=this.iMaxLine*this.iRowHeight-this.iRowHeight*j;
			if(i<0)i=0;
			if(this.iOffY>i)
			{
				this.iOffY-=(this.iOffY-i)/2;
			}
		}
	}
	iChecked()
	{
		var i=this.iCheckPoint;
		this.iCheckPoint=-1;
		if(i>=0)return i;
		return -1;
	}

	 ProcTouch( msg, x, y)
	{
		var i,j,k;
		for(i=0;i<this.iBtnCount;i++)
		{
			if(this.btn_list[i].ProcTouch(msg, x, y))return true;
		}
		for(i=0;i<this.iTitleCount;i++)
		{
			if(!this.bCanSort[i])continue;
			if(XDefine.bInRect(x, y, this.iX+this.iTitleOffx[i], this.iY, this.iTitleWidth[i], this.iTitleHeight))
			{
				if(msg==1)this.iSortLock=i;
				if(msg==3 && this.iSortLock==i)
				{//选中
					if(this.iSortType==i)this.iSortUD=1-this.iSortUD;
					else
					{
						this.iSortType=i;
						this.iSortUD=0;
					}

					this.iSortLock=-1;
				}
				break;
			}
		}
		if(i>=this.iTitleCount)this.iSortLock=-1;
		if(msg==2 && this.bTouchLock)
		{
			if(Math.abs(this.iLockY-y)>=10)this.bTouchMoving=true;
			if(this.bTouchMoving)
			{
				this.iOffY+=(this.iLockY-y);
				this.iLockY=y;
				return true;
			}
		}
		if(msg==3 && this.bTouchLock)
		{
			this.bTouchLock=false;
			if(!this.bTouchMoving)
			{///点击一个选项
				this.iLockPoint=parseInt((this.iLockY-this.iY-this.iTitleHeight+this.iOffY)/this.iRowHeight);
				if(this.iLockPoint<0 || this.iLockPoint>this.iMaxLine)this.iLockPoint=-1;
				if(this.iLockPoint>=0)this.iCheckPoint=this.iLockPoint;
				{//所点击列
					j=x-this.iX;
					k=0;
					for(i=0;i<this.iTitleCount;i++)
					{
						k+=this.iTitleWidth[i];
						if(j<k)break;
					}
					this.iCheckX=i;
				}
			}
			return true;
		}
		if(XDefine.bInRect(x, y, this.iX, this.iY+this.iTitleHeight, this.iW, this.iH-this.iTitleHeight))
		{
			if(msg==1)
			{//按下，选中某条，记录y
				this.iLockY=y;
				this.bTouchLock=true;
				this.bTouchMoving=false;
				return true;
			}
		}
		return false;
	}
}
