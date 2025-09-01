import AnimaAction from "../graphic/AnimaAction"
import M2DFast from "../graphic/M2DFast"
import XTouchManager from "../XTouchManager"
import XWavFast from "../XWavFast";

export default class XButton
{
    // _bMouseDown:false,
    // _bChecked:false,
    // _bMouseIn:false,
    // iX:0,
    // iY:0,
    // iW:0,
    // iH:0,
    // sName:"",
    // aa_normal:null,
    // aa_down:null,
    // iFontSize:0,

    // bSingleButton:true,
    constructor(ani)
    {
        this.bDisable=false;
        this.bSingleButton=true;
        this.iTextColor=0xf1f8ff;
        this.iFontSize=24;
        this.iOffX=0;
        this.iOffY=0;

        this.iBtnType=-1;

        this.iSoundId=3;
        this.iDownTick=0;

        this._bChecked=false;
        this._bDisableChecked=false;
    }
    SetAnima(pani,aname)
    {
        this.aa_normal=new AnimaAction(pani.InitAnimaWithName(aname));
        this.aa_down=new AnimaAction(pani.InitAnimaWithName(aname));
        this.aa_disable=new AnimaAction(pani.InitAnimaWithName(aname));
        this.aa_down.iFrame=1;
        this.aa_disable.iFrame=2;

        this.aa=new AnimaAction();

        this.bSingleButton=false;
        this.iBtnType=0;
    }
    Move(x,y,w,h)
    {
        this.iX=x;
        this.iY=y;
        this.iW=w;
        this.iH=h;
    }
    SetType1(namex,namey,namesize)
    {//按钮名字偏移，大小
        this.iBtnType=1;
        this.iT1_namex=namex;
        this.iT1_namey=namey;
        this.bT1_locked=false;
        this.iFontSize=namesize;
    }
    Draw_Single()
    {
        var pm3f=M2DFast.gi();
        if(this._bMouseIn)
        {
            if(this._bMouseDown)pm3f.FillRect(this.iX,this.iY,this.iW,this.iH,0xffffff);
            else pm3f.FillRect(this.iX,this.iY,this.iW,this.iH,0xffffff);
        }
        else pm3f.DrawRect(this.iX,this.iY,this.iW,this.iH,0xffffff);

        if(this.sName!=null)pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2,this.sName,0xffffff,this.iFontSize,101,1,1,0,-2,-2);
    }
    DrawText()
    {
        M2DFast.pm2f.DrawTextEx(this.iX+this.iW/2+this.iOffX,this.iY+this.iH/2+this.iOffY,this.sName,0xffffff,this.iFontSize,101,1,1,0,-2,-2);
    }
    Draw()
    {
        if(!this.bDisable && this._bMouseDown)this.iDownTick++;
        else this.iDownTick=0;
        if(this.bSingleButton)
        {
            this.Draw_Single();
            return;
        }
        else
        {
            // this.aa_normal.NextFrame();
        }
        var x,y;
        var pm3f=M2DFast.gi();
        // this.DoScale();


        if(this.bDisable)
        {
            this.aa.copyfrom(this.aa_disable);
        }
        else if(this._bMouseIn)
        {
            if(this._bMouseDown)
            {
                this.aa.copyfrom(this.aa_down);
            }
            else this.aa.copyfrom(this.aa_normal);
        }
        else this.aa.copyfrom(this.aa_normal);
        x=this.iX;
        y=this.iY;
        // this.aa.iFrame=0;
        if(this.iBtnType==1)
        {
            if(this.bT1_locked)
            {
                this.aa.iFrame=2;
                y-=5;
            }
            else if(this._bMouseDown)y+=5;
        }
        this.aa.Draw(x,y);

        if(this.sName!=null)
        {
            if(this.bSingleButton)pm3f.DrawTextEx(this.iX+this.iW/2+this.iOffX,this.iY+this.iH/2+this.iOffY,this.sName,0xffffffff,this.iFontSize,101,1,1,0,-2,-2);
            else
            {
                x=this.iX+this.iW/2;
                y=this.iY+this.iH/2;

                if(this.iBtnType==1)
                {
                    x+=this.iT1_namex;
                    y+=this.iT1_namey;
                    if(this.bT1_locked)y-=5;
                    else if(this._bMouseDown)y+=5;
                }

                pm3f.DrawTextEx(x+2,y+2,this.sName,0x47636a,this.iFontSize,100,1,1,0,-2,-2);
                pm3f.DrawTextEx(x,y,this.sName,this.iTextColor,this.iFontSize,101,1,1,0,-2,-2);
            }
        }
    }

    ProcTouch(msg,x,y)
    {
        if(!XButton.bEnableEvent)return false;
        if(!this.bMoveIn(x,y))
        {
            this._bMouseDown=false;
            // if (this.iScaleStat == 0 && this.fScale != 1.0)this.iScaleStat = 11;
            return false;
        }
        // if(this.bDisable)return false;
        switch(msg)
        {
            case XTouchManager.TOUCH_DOWN:
                this._bMouseDown=true;
                // this.iScaleStat = 1;
                break;
            case XTouchManager.TOUCH_MOVE:
                break;
            case XTouchManager.TOUCH_UP:
                if(this._bMouseDown)
                {
                    this._bMouseDown=false;
                    if(this.bDisable)this._bDisableChecked=true;
                    else
                    {
                        this._bChecked=true;

                        XWavFast.PlaySoundEx("btn_click",false);
                    }
                    // this.iScaleStat = 11;
                }
                this._bMouseIn=false;
                break;
        }
        return true;
    }
    bCheck()
    {
        if (this._bChecked)
        {
            this._bChecked = false;
            return true;
        }
        return false;
    }
    bDisableCheck()
    {
        if (this._bDisableChecked)
        {
            this._bDisableChecked = false;
            return true;
        }
        return false;
    }
    bMoveIn(x,y)
    {
        this._bMouseIn=false;
        if(this.bSingleButton)
        {
            if(x>=this.iX && x<=this.iX+this.iW && y>=this.iY && y<=this.iY+this.iH)this._bMouseIn=true;
            else this._bMouseIn=false;
        }
        else
        {
            if(x>=this.iX && x<=this.iX+this.iW && y>=this.iY && y<=this.iY+this.iH)this._bMouseIn=true;
            else this._bMouseIn=false;
        }
        return this._bMouseIn;
    }
    //////////////////////////////////////////////////////////////////////////////////////
    SetOff(x,y)
    {
        this.iOffX = x;
        this.iOffY = y;
    }
    // iScaleStat:0,
    // fScale:1,
    SetNormal()
    {
        this.bMouseDown = false;
        this.iScaleStat = 0;
        this.fScale = 1;
    }
    DoScale()
    {
        switch (this.iScaleStat)
        {
            case 0://什么都不做
                break;
            case 1://变大
                this.fScale += 0.05;
                if (this.fScale>1.1)this.iScaleStat = 2;
                break;
            case 2://缩小一点点
                this.fScale = 1.1;
                this.iScaleStat = 0;
                break;
            case 11://缩小
                this.fScale -= 0.05;
                if (this.fScale<1.0)this.iScaleStat = 12;
                break;
            case 12://变大一点点
                this.fScale = 1.0;
                this.iScaleStat = 0;
                break;
        }
    }
    cx()
    {
        return this.iX+this.iW/2;
    }
    cy()
    {
        return this.iY+this.iH/2;
    }
};

XButton.bEnableEvent=true;