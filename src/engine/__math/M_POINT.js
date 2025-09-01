

export default class M_POINT
{
    constructor(x,y)
    {
        this.Set(x,y);
    }
    Set(x,y)
    {
        this.x=x;
        this.y=y;
    }
    copyfrom(mp)
    {
        this.x=mp.x;
        this.y=mp.y;
    }
}

M_POINT.pp=new Array();
M_POINT.gi=function(i)
{
    if(M_POINT.pp[i]==null)M_POINT.pp[i]=new M_POINT();
    return M_POINT.pp[i];
}