import XDefine from "../../config/XDefine"
import PublicInterface from "../../zero/Interface/PublicInterface"
//import android.os.Message;
import TouchManager from "../../engine/TouchManager"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import XButtonEx2 from "./XButtonEx2"

export default class XInputNumber
{
    constructor(ani)
    {
		var i;
		this.pani=ani;
		this.pm3f=M3DFast.gi();
		this.bChanged=false;
		this.bFinished=false;
		this.iNumber=0;
		this.iMinNumber=0;
		this.iMaxNumber=0x7fffffff;
		this.bShow=false;
		
		this.btn_num=new Array(12);//
		for(i=0;i<12;i++)
		{
			this.btn_num[i]=new XButtonEx2(GmPlay.xani_nui3);
			if(i==3)this.btn_num[i].InitButton("键盘按钮_退格");
			else if(i==11)this.btn_num[i].InitButton("键盘按钮_确定");
			else this.btn_num[i].InitButton("键盘按钮");
		}
		this.btn_num[0].sName="1";
		this.btn_num[1].sName="2";
		this.btn_num[2].sName="3";
//		this.btn_num[3].InitButton("键盘按钮_退格");//退格
		this.btn_num[4].sName="4";
		this.btn_num[5].sName="5";
		this.btn_num[6].sName="6";
		this.btn_num[7].sName="0";
		this.btn_num[8].sName="7";
		this.btn_num[9].sName="8";
		this.btn_num[10].sName="9";

		this.aa_frame=null;
    }

    MinMax( min, max)
	{
		this.iMinNumber=min;
		this.iMaxNumber=max;
	}
	Draw()
	{
		DrawMode.new_numberframe(this.iX,this.iY,this.iW,""+this.iNumber);
		if(!this.bShow)return;
		this.DrawBack();
		var i;
		for(i=0;i<12;i++)
		{
			this.btn_num[i].Move(this.iFx+10+(i%4)*(64+10), this.iFy+10+parseInt(i/4)*(64+10), 64, 64);
			this.btn_num[i].Draw();
		}
	}
	ProcTouch( msg, x, y)
	{
//		if(!XDefine.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))
//		{
//			this.bShow=false;
//			return false;
//		}
		var i;
		if(this.bShow)
		{
			if(XDefine.bInRect(x, y, this.iFx, this.iFy, this.iFw, this.iFh))
			{
				for(i=0;i<12;i++)
				{
					if(this.btn_num[i].ProcTouch(msg, x, y))
					{
						if(this.btn_num[i].bCheck())
						{
							if(i==0 || i==1 || i==2)this.iNumber=this.iNumber*10+(i+1);
							else if(i==3)this.iNumber=parseInt(this.iNumber/10);
							else if(i==4 || i==5 || i==6)this.iNumber=this.iNumber*10+i;
							else if(i==7)this.iNumber=this.iNumber*10;
							else if(i==8 || i==9 || i==10)this.iNumber=this.iNumber*10+(i-1);
							else if(i==11)this.bShow=false;
							if(this.iNumber<this.iMinNumber)this.iNumber=this.iMinNumber;
							if(this.iNumber>this.iMaxNumber)this.iNumber=this.iMaxNumber;
						}
					}
				}
			}
			else if(msg==3)
			{
				if(this.iNumber<this.iMinNumber)this.iNumber=this.iMinNumber;
				this.bShow=false;
			}
			this.iNumber = Math.floor(this.iNumber);
			return true;
		}
		else
		{
			if(XDefine.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))
			{
				if(msg==1)this.bMouseDown=true;
				if(msg==3)
				{
					if(this.bMouseDown)
					{
						this.bMouseDown=false;
						this.bShow=true;
						this.iNumber=0;
					}
				}
				return true;
			}
		}

		return false;
	}
	DrawBack()
	{
		if(this.aa_frame==null)this.aa_frame=GmPlay.xani_nui3.InitAnimaWithName("键盘框", null);
		this.aa_frame.iFrame=0;this.aa_frame.Draw(this.iFx, this.iFy);//左上
		this.aa_frame.iFrame=1;this.aa_frame.DrawEx(this.iFx+10, this.iFy, 101, 1.0*(this.iFw-20)/20, 1, 0, 0, 0);//上
		this.aa_frame.iFrame=2;this.aa_frame.Draw(this.iFx+this.iFw, this.iFy);//右上
		this.aa_frame.iFrame=3;this.aa_frame.DrawEx(this.iFx+this.iFw, this.iFy+10, 101, 1,1.0*(this.iFh-20)/20, 0, 0, 0);//右
		this.aa_frame.iFrame=4;this.aa_frame.Draw(this.iFx+this.iFw, this.iFy+this.iFh);//右下
		this.aa_frame.iFrame=5;this.aa_frame.DrawEx(this.iFx+10, this.iFy+this.iFh, 101, 1.0*(this.iFw-20)/20, 1, 0, 0, 0);//下
		this.aa_frame.iFrame=6;this.aa_frame.Draw(this.iFx, this.iFy+this.iFh);//左下
		this.aa_frame.iFrame=7;this.aa_frame.DrawEx(this.iFx, this.iFy+10, 101, 1,1.0*(this.iFh-20)/20, 0, 0, 0);//左
		this.aa_frame.iFrame=8;this.aa_frame.DrawEx(this.iFx+10, this.iFy+10, 101, 1.0*(this.iFw-20)/20,1.0*(this.iFh-20)/20, 0, 0, 0);//中
		this.aa_frame.iFrame=9;this.aa_frame.Draw(this.iPx, this.iPy);//箭头
	}
	Move( x, y, w)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=50;
		this._numframe(this.iX+this.iW/2,this.iY-15);
	}
	_numframe( x, y)
	{
		this.iPx=x;
		this.iPy=y;
		this.iFw=306;
		this.iFh=232;
		this.iFx=this.iPx-this.iFw/2;
		this.iFy=this.iPy-this.iFh;
	}
}