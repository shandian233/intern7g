import XDefine from "../config/XDefine"

class _OneFinger
{
    constructor()
    {
        this.iFingerId=_OneFinger.FREEFINGER;
        this.m_TouchStack=new Array(_OneFinger.MAXTOUCHSTACK);
        for(var i=0;i<_OneFinger.MAXTOUCHSTACK;i++)
        {
            this.m_TouchStack[i]=new Object();
        }
        this.iStackPoint=-1;
        this.iProcPoint=-1;
    }
    Push(type,x,y)
    {
        // XDefine.sop("type="+type);
        this.iStackPoint++;
        var i=this.iStackPoint%_OneFinger.MAXTOUCHSTACK;
        this.m_TouchStack[i].type=type;
        this.m_TouchStack[i].x=x;
        this.m_TouchStack[i].y=y;
    }
    Pop()
    {
        if(this.iProcPoint>=this.iStackPoint)return null;
        this.iProcPoint++;
        var i=this.iProcPoint%_OneFinger.MAXTOUCHSTACK;
//this.iProcPoint>=this.iStackPoint && 
        if(this.m_TouchStack[i].type==XTouchManager.TYPE_UP)this.iFingerId=_OneFinger.FREEFINGER;
        return this.m_TouchStack[i];
    }
    TouchDown(fid,x,y)
    {
        this.iFingerId=fid;
        this.Push(XTouchManager.TYPE_DOWN,x,y);
    }
    TouchMove(x,y)
    {
        this.Push(XTouchManager.TYPE_MOVE,x,y);
    }
    TouchUp(x,y)
    {
        this.Push(XTouchManager.TYPE_UP,x,y);
    }
}
_OneFinger.FREEFINGER=-1;
_OneFinger.MAXTOUCHSTACK=16;


export default class XTouchManager {
    constructor()
    {

    }

    Init()
    {
        this.fingers=new Array(XTouchManager.MAXFINGERCOUNT);
        for(var i=0;i<XTouchManager.MAXFINGERCOUNT;i++)
        {
            this.fingers[i]=new _OneFinger();
        }
    }
    FindSinger(fid)
    {
        for(var i=0;i<XTouchManager.MAXFINGERCOUNT;i++)
        {
            if(this.fingers[i].iFingerId==fid)
            {
                return this.fingers[i];
            }
        }
        return null;
    }
    _test()
    {
        var j=0;
        for(var i=0;i<XTouchManager.MAXFINGERCOUNT;i++)
        {
            if(this.fingers[i].iFingerId==_OneFinger.FREEFINGER)j++;
        }
        return j+","+this.fingers[0].iProcPoint+","+this.fingers[0].iStackPoint;
    }
    TouchDown(fid,x,y)
    {
        var pfinger=this.FindSinger(_OneFinger.FREEFINGER);
        if(pfinger!=null)pfinger.TouchDown(fid,x,y);
        // else XDefine.sop("error");
        XTouchManager.TOUCH_STAT=1;
    }
    TouchMove(fid,x,y)
    {
        var pfinger=this.FindSinger(fid);
        if(pfinger!=null)pfinger.TouchMove(x,y);
        if(XTouchManager.TOUCH_STAT!=3)XTouchManager.TOUCH_STAT=2;
    }
    TouchUp(fid,x,y)
    {
        var pfinger=this.FindSinger(fid);
        if(pfinger!=null)pfinger.TouchUp(x,y);
        // else XDefine.sop("error2");
        XTouchManager.TOUCH_STAT=3;
    }
    PopTouch()
    {
        var i;
        for(i=0;i<XTouchManager.MAXFINGERCOUNT;i++)
        {
            var ret=this.fingers[i].Pop();
            if(ret!=null)return ret;
        }
        return null;
    }
}

XTouchManager.TOUCH_STAT=3;
XTouchManager.MAXFINGERCOUNT=8;
XTouchManager.TYPE_DOWN=1;
XTouchManager.TYPE_MOVE=2;
XTouchManager.TYPE_UP=3;
XTouchManager.TOUCH_DOWN=1;
XTouchManager.TOUCH_MOVE=2;
XTouchManager.TOUCH_UP=3;
XTouchManager.ptouch=null;
XTouchManager.gi=function()
{
    if(XTouchManager.ptouch==null)XTouchManager.ptouch=new XTouchManager();
    return XTouchManager.ptouch;
}
