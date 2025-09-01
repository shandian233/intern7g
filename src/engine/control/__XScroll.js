export default class XScroll
{
    constructor()
    {
        this.iLockX=0;
        this.bLocked=false;
        this.iScrollOffX=0;
        this.bScrolling=false;
        this.iScrolling=0;
        this.iScrollDelay=0;
        this.iStartScrollX=0;
    }
    SetScrollRect(x1,x2,y1,y2,size,type)
    {
        this.offx1=x1;//滚动区域
        this.offx2=x2;
        this.offy1=y1;
        this.offy2=y2;
        this.iSize=size;
        this.sType=type;
    }
    Logic()
    {
        if(this.bLocked)
        {
            // if(XTouchManager.TOUCH_STAT==3)
            // {
            //     this.bLocked=false;
            //     this.bScrolling=false;
            // }
        }
        else if(!this.bScrolling)
        {
            var m;
            if(this.sType=="x")m=this.iSize-this.offx2+this.offx1;
            else m=this.iSize-this.offy2+this.offy1;
            if(this.iScrolling!=0)
            {
                if(this.iScrolling>5)this.iScrolling-=5;
                else if(this.iScrolling<-5)this.iScrolling+=5;
                else this.iScrolling=0;
                // this.iScrolling=this.iScrolling/1.3;

                if(this.iScrollOffX<0)this.iScrolling=0;
                if(this.iScrollOffX>m)this.iScrolling=0;
                if(Math.abs(this.iScrolling)<1)this.iScrolling=0;
                this.iScrollOffX+=this.iScrolling;
            }
            else
            {
                if(this.iScrollOffX<0)this.iScrollOffX/=2;
                
                if(m<0)m=0;
                if(this.iScrollOffX>m)this.iScrollOffX-=(this.iScrollOffX-m)/2;
            }
        }

        if(this.iScrollDelay>0)this.iScrollDelay--;
    }
    _bScrolling()
    {
        if(this.bLocked)return true;
        else if(this.bScrolling)return true;
        else
        {
            if(this.iScrolling!=0)return true;
            else
            {
                var m;
                if(this.sType=="x")m=this.iSize-this.offx2+this.offx1;
                else m=this.iSize-this.offy2+this.offy1;

                if(this.iScrollOffX<-1)return true;
                if(this.iScrollOffX>m+1)return true;
            }
        }
        return false;
    }
    ProcTouch(msg,x,y)
    {
        var xy;
        if(this.sType=="x")xy=x;
        else xy=y;
        if(msg==1)
        {
            if(x>=this.offx1 && x<=this.offx2 && y>this.offy1 && y<this.offy2)
            {
                this.bLocked=true;
                this.iLockX=xy;
                this.iStartScrollX=xy;
                this.iScrollDelay=6;
            }
        }
        if(this.bLocked)
        {
            if(msg==3)
            {
                if(this.iScrollDelay>0 && this.bScrolling)
                {
                    this.iScrolling=(this.iStartScrollX-xy)/3;
                }
                this.bLocked=false;
                this.bScrolling=false;
            }
            else
            {
                if(this.bScrolling)
                {
                    this.iScrollOffX+=(this.iLockX-xy);
                    this.iLockX=xy;
                }
                if(Math.abs(this.iLockX-xy)>10)
                {//清除按键按下状态
                    this.bScrolling=true;
    
                    msg=3;
                    y=-1;
                }
            }
        }
        if(this.bScrolling)return true;
        return false;
    }
}