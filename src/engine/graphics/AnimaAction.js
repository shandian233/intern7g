// import AnimaAction from "./AnimaAction"

export default class AnimaAction
{

    constructor(fromaa)
    {
        this.iAnimaPoint=-1,
        this.iDelay=-1,
        this.iFrame=-1,
        this.pani=null,
        this.iRect=[0,0,0,0];
        if(fromaa!=null)this.copyfrom(fromaa);
    }
    copyfrom(a)
    {
        this.iAnimaPoint=a.iAnimaPoint;
        this.iDelay=a.iDelay;
        this.iFrame=a.iFrame;
        this.pani=a.pani;
        this.iRect[0]=a.iRect[0];
        this.iRect[1]=a.iRect[1];
        this.iRect[2]=a.iRect[2];
        this.iRect[3]=a.iRect[3];
    }
    Reset()
    {
        this.iFrame=0;
        this.iDelay=0;
    }
/*    Draw(x,y)
    {
        this.pani.DrawAnimaEx_ByOffset(x,y,this.iAnimaPoint,this.iFrame,101,1,1,0,-2,-2);
    }*/
    Draw(x,y,frameoffset)
    {
        if(frameoffset==null)frameoffset=this.iFrame;
        this.pani.DrawAnimaEx_ByOffset(x,y,this.iAnimaPoint,frameoffset,101,1,1,0,0,0);
    }
    DrawEx1(x,y,frameoffset,alpha,sw,sh,ra,ratx,raty,turn)
    {
        this.pani.DrawAnimaEx_ByOffset(x,y,this.iAnimaPoint,frameoffset,alpha,sw,sh,ra,ratx,raty,turn);
    }
    DrawEx(x, y,alpha,sw,sh,ra,ratx,raty,turn,ex)
    {
        if(sw==101)
        {
            this.DrawEx1(x, y,alpha,sw,sh,ra,ratx,raty,turn,ex);
            return;
        }
//        ratx=-2;
//        raty=-2;
        this.pani.DrawAnimaEx_ByOffset(x,y,this.iAnimaPoint,this.iFrame,alpha,sw,sh,ra,ratx,raty,turn);
    }
    NextFrame()
    {
        if (this.pani == null) return false;
        return this.pani.NextFrame(this);
    }

    bIn( ax, ay, mx, my)
	{
		if(this.pani==null)return false;
		return this.pani.bInAnima(this, ax, ay, mx, my);
    }
    SetFrame( tick)
	{
		if(this.pani==null)return;
		this.pani.SetFrame(this, tick);
	}
}