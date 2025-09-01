import XDefine from "../../config/XDefine";
import M2DFast from "./M2DFast"

export default class M3DFast extends M2DFast
{
    constructor()
    {
        super();
    }
    LoadFromFile(fn,rid,blocal,cb){
        return this.LoadImage("res/"+fn,blocal,cb);
    }
    
    DrawImageEx(dest,x,y,index,sx,sy,w,h,ab,sw,sh,ra,ratx,raty)
    {
        this._DrawImageEx(x,y,index,sx,sy,w,h,ab,sw,sh,ra,ratx,raty);
    }
    SetViewClip(x1,y1,x2,y2)
    {
        this._SetViewClip(x1,y1,x2-x1,y2-y1);
    }
    FillRect_2D(x,y,x2,y2,c)
    {
//        if(c<0)c=c+0x100000000;
        var a=(c&0xff000000)>>24;
        if(a<0)a=a+0x100;
        this.FillRect(x,y,x2-x,y2-y,c&0xffffff,1,a/2.55);
    }
    DrawTextEx(x,y,s,c,size,ab,sw,sh,ra,ratx,raty)
    {
        this._DrawTextEx(x,y,s,c&0xffffff,size,ab,sw,sh,ra,ratx,raty);
    }
    DrawText( dx, dy, s, c)
	{
		this.DrawTextEx(dx, dy, s, c, 30, 101, 1, 1, 0, 0, 0);
    }
    DrawText_2( dx, dy, s, c, size, ab, sw, sh, ra, ratx, raty, type, c2)
    {
        //this.DrawTextEx(dx+2,dy+2,s,c2,size,ab,sw,sh,ra,ratx,raty);

        this.DrawTextEx(dx,dy,s,c,size,ab,sw,sh,ra,ratx,raty);
    }
    DrawRect_2D(x,y,x2,y2,c)
    {
        this.DrawRect(x,y,x2-x,y2-y,c&0xffffff,1);
    }
    GetTextWidth(s,size)
    {
        return this.TextWidth(s,size);
    }
    GetTextHeight()
    {
        return this.iTextHeight;
    }
    CheckImageLoaded()
    {
        var c1=0,c2=0;
        for(var i=0;i<M2DFast.MAXIMAGECOUNT;i++)
        {
            if(this.m_ImageList[i].bUseing)
            {
                c1++;
                if(this.m_ImageList[i].bLoaded)c2++;
            }
        }
        if(c1==c2)return;
        this.DrawTextEx22(Laya.stage.width/2,Laya.stage.height,c1+"/"+c2,0xffffffff,30,101,1,1,0,-2,-3);
    }
}
M3DFast.pm3f=null;
M3DFast.gi=function()
{
    if(M3DFast.pm3f==null)M3DFast.pm3f=new M3DFast();
    return M3DFast.pm3f;
}