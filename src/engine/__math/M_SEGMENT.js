


export default class M_SEGMENT
{
    constructor(x1,y1,x2,y2)
    {
        this.Set(x1,y1,x2,y2);
    }
    Set(x1,y1,x2,y2)
    {
        this.x1=x1;
        this.y1=y1;
        this.x2=x2;
        this.y2=y2;

        if(x1<x2)
        {
            this.left=x1;
            this.right=x2;
        }
        else
        {
            this.left=x2;
            this.right=x1; 
        }

        if(y1<y2)
        {
            this.top=y1;
            this.bottom=y2;
        }
        else
        {
            this.top=y2;
            this.bottom=y1;
        }

        this.Calc();
    }
    Calc()
    {
        if(this.x1==this.x2)this.k=99999999;
        else this.k=(this.y2-this.y1)/(this.x2-this.x1);

        this.b=this.y1-this.k*this.x1;
    }
    IsUp(x,y)
    {
        var ty=this.k*x+this.b;
        if(y<ty)return true;
        return false;
    }
    FastBoom(x,y,gap)
    {
        if(x<this.left-gap)return false;
        if(x>this.right+gap)return false;
        if(y<this.top-gap)return false;
        if(y>this.bottom+gap)return false;
        var tt=Math.abs((y-this.b)/this.k-x);
        if(tt<gap)return true;
        tt=Math.abs(this.k*x+this.b-y);
        if(tt<gap)return true;
        return false;
    }
}

M_SEGMENT.pp=new Array();
M_SEGMENT.gi=function(i)
{
    if(M_SEGMENT.pp[i]==null)M_SEGMENT.pp[i]=new M_SEGMENT();
    return M_SEGMENT.pp[i];
}