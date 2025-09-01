import TouchManager from "../../engine/TouchManager"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import PublicInterface from "../../zero/Interface/PublicInterface";

export default class XButton
{
    constructor(ani)
    {
		this.pani=ani;
		this.pm3f=M3DFast.gi();
//		this.pm3f=M3DFast.xm3f;
		this.bSingleButton=false;
		this.bCheckByRect=false;
		this.bCheckByRect1=false;
		
		this.ReleaseButton();
		this.sName="";
		this.iNameColor=0xffffffff;
		this.Move(0,0,100,100);
//		bHide=false;
		this.iFingerLocker=-1;
		this.iNameSize=-1;
    }
    SetCheckRect( x, y, w, h)
	{
		this.bCheckByRect1=true;
		this.iCheckX=x;
		this.iCheckY=y;
		this.iCheckW=w;
		this.iCheckH=h;
    }
    InitButton( an)
	{
		if(this.pani==null)return;
		this.pani.InitAnimaWithName(an,GmPlay.aaa);
		GmPlay.aaa.iFrame=0;this.SetAnimaNormal(GmPlay.aaa,false);
		GmPlay.aaa.iFrame=1;this.SetAnimaMouseon(GmPlay.aaa,false);
		this.SetAnimaMousedown(GmPlay.aaa,false);
		GmPlay.aaa.iFrame=0;this.SetAnimaDisable(GmPlay.aaa,false);
    }
    ReleaseButton()
	{
//		this.aa_normal_to_on=null;
//		iStat_normal_to_on=0;

		this.aa_normal=null;
		this.act_normal=false;
		this.aa_mouseon=null;
		this.act_mouseon=false;
		this.aa_mousedown=null;
		this.act_mousedown=false;

		this.bMouseIn=false;
		this.bMouseDown=false;
		this.bVisible=true;
		this.bDisable=false;

		this.iX=0;
		this.iY=0;
    }
    SetAnimaNormal( aa, bact)
	{
		if(this.aa_normal==null)this.aa_normal=new AnimaAction();
		this.aa_normal.copyfrom(aa);
		this.act_normal=bact;
    }
    SetAnimaMouseon( aa, bact)
	{
		if(this.aa_mouseon==null)this.aa_mouseon=new AnimaAction();
		this.aa_mouseon.copyfrom(aa);
		this.act_mouseon=bact;
    }
    SetAnimaMousedown( aa, bact)
	{
		if(this.aa_mousedown==null)this.aa_mousedown=new AnimaAction();
		this.aa_mousedown.copyfrom(aa);
		this.act_mousedown=bact;
    }
    SetAnimaDisable( aa, bact)
	{
		if(this.aa_disable==null)this.aa_disable=new AnimaAction();
		this.aa_disable.copyfrom(aa);
		this.act_disable=bact;
    }
    Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
		
    }
    ProcTouch( msg, x, y)
	{
		if(this.iFingerLocker!=-1 && this.iFingerLocker!=TouchManager.iFingerId)return false;
		
		if(!this.bVisible)return false;
		if(this.bDisable)return false;
		
		if(msg==3)this.iFingerLocker=-1;
		if(!this.bMoveIn(x,y))
		{
			this.iFingerLocker=-1;
			this.bMouseDown=false;
			return false;
		}
		switch(msg)
		{
		case 1://down
			this.iFingerLocker=TouchManager.iFingerId;
			this.bMouseDown=true;
			break;
		case 2://move
			break;
		case 3://up
			if(this.bMouseDown)
			{
				this.bMouseDown=false;
				this.bChecked=true;
			}
			this.iFingerLocker=-1;
			break;
		}
		return true;
    }
    bCheck()
	{
		if(this.bChecked)
		{
			this.bChecked=false;
			return true;
		}
		return false;
    }
    bMoveIn( x, y)
	{
		this.bMouseIn=false;
		if(this.bCheckByRect1)
		{
			if(x>=this.iCheckX && x<=this.iCheckX+this.iCheckW && y>=this.iCheckY && y<=this.iCheckY+this.iCheckH)this.bMouseIn=true;
			else this.bMouseIn=false;
		}
		else if(this.bSingleButton || this.bCheckByRect)
		{
			if(x>=this.iX && x<=this.iX+this.iW && y>=this.iY && y<=this.iY+this.iH)this.bMouseIn=true;
			else this.bMouseIn=false;
		}
		else
		{
//			if(x>=this.iX && x<=this.iX+this.iW && y>=this.iY && y<=this.iY+this.iH)this.bMouseIn=true;
			if(this.pani.bInAnima(this.aa_normal,this.iX,this.iY,x,y))this.bMouseIn=true;
			else this.bMouseIn=false;
		}
		return this.bMouseIn;
    }
    Draw()
	{
		if(this.pani==null)return;
		if(!this.bVisible)return;
		while(PublicInterface.gi().bInBound(this.iX,this.iY,this.iW,this.iH))this.iX--;
		if(this.bDisable)
		{
			if(this.bSingleButton)this.pm3f.FillRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0xC0ffffff);
			else this.pani.DrawAnima_aa(this.iX, this.iY, this.aa_disable);
		}
		else if(this.bMouseIn)
		{
			if(this.bMouseDown)
			{
				if(this.bSingleButton)
				{
					this.pm3f.FillRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0x80ffffff);
					this.pm3f.DrawRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0xffffffff);
				}
				else this.pani.DrawAnima_aa(this.iX, this.iY, this.aa_mousedown);
			}
			else
			{
				if(this.bSingleButton)
				{
					this.pm3f.FillRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0x40ffffff);
					this.pm3f.DrawRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0xffffffff);
				}
				else this.pani.DrawAnima_aa(this.iX, this.iY, this.aa_normal);
			}
		}
		else
		{
			if(this.bSingleButton)this.pm3f.FillRect_2D(this.iX,this.iY,this.iX+this.iW,this.iY+this.iH,0x20ffffff);//0x90305070
			else this.pani.DrawAnima_aa(this.iX, this.iY,this.aa_normal);
		}

		var offx,offy;
		if(this.bMouseDown)
		{
			offx=2;
			offy=2;
		}
		else
		{
			offx=0;
			offy=-2;
		}
		if(this.bSingleButton || this.sName.length>0)
		{
			var c=this.iNameColor;
			if(this.bDisable)c=0xff808080;
			if(this.iNameSize>0)this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2,this.sName,c,this.iNameSize,101,1,1,0,-2,-2);
			else if(this.iH<=30)this.pm3f.DrawTextEx(this.iX+this.iW/2+offx,this.iY+this.iH/2+offy,this.sName,c,20,101,1,1,0,-2,-2);
			else if(this.iH<=40)this.pm3f.DrawTextEx(this.iX+this.iW/2+offx,this.iY+this.iH/2+offy,this.sName,c,28,101,1,1,0,-2,-2);
			else this.pm3f.DrawTextEx(this.iX+this.iW/2+offx,this.iY+this.iH/2+offy,this.sName,c,30,101,1,1,0,-2,-2);
		}
//		GmPlay.sop(this.sName+","+this.iX+","+this.iY);
	}
}