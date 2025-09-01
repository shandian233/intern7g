import M_SEGMENT from "./M_SEGMENT";
import M_POINT from "./M_POINT";

export default class XMath
{
    constructor()
    {

    }
}

XMath._sin=new Array();
XMath._cos=new Array();

XMath.xsin=function(jd)
{
    var tt=parseInt(jd*1800/Math.PI);
    while(tt<0)tt+=3600;
    tt=tt%3600;
    return XMath._sin[tt];
}
XMath.xcos=function(jd)
{
    var tt=parseInt(jd*1800/Math.PI);
    while(tt<0)tt+=3600;
    tt=tt%3600;
    return XMath._cos[tt];
}
XMath.vector_devide=function(vox,voy,v1x,v1y)
{//分解向量
    if(Math.abs(v1x) < 0.0000001 && Math.abs(v1y) < 0.0000001 ) 
    { 
        XMath.v1x = v1x;
        XMath.v1y = v1y;
    }
    else
    {
        var u = (vox - v1x)*v1x + (voy - v1y)*v1y; 
        u = u/(v1x*v1x+v1y*v1y); 
       
        XMath.v1x = v1x + u*v1x;
        XMath.v1y = v1y + u*v1y;
    }
    XMath.v2x=vox-XMath.v1x;
    XMath.v2y=voy-XMath.v1y;
}
XMath.v1x=0;
XMath.v1y=0;
XMath.v2x=0;
XMath.v2y=0;

XMath.angle_aox=function(ax,ay)
{
    var tjd;

    if (-0.0000001<ax && ax<0.0000001)
    {
        if(ay>0)return Math.PI/2;
        else return Math.PI*3/2;
    }
    tjd = Math.atan(ay / ax);
    if (ax < 0)tjd += Math.PI;
    if (tjd < 0)tjd += Math.PI*2;

    return tjd;
//	    return (tjd * 180 / Math.PI);
}

XMath.angle_aob=function(ax,ay,ox,oy,bx,by)
{//(ox,oy)=(0,0)
    if(ox!=0)
    {
        ax-=ox;
        bx-=ox;
    }
    if(oy!=0)
    {
        ay-=oy;
        by-=oy;
    }
    // var OA=Math.sqrt((ox-ax)*(ox-ax)+(oy-ay)*(oy-ay));
    // var OB=Math.sqrt((ox-bx)*(ox-bx)+(oy-by)*(oy-by));
    var OA=Math.sqrt(ax*ax+ay*ay);
    var OB=Math.sqrt(bx*bx+by*by);
    var AB=Math.sqrt((bx-ax)*(bx-ax)+(by-ay)*(by-ay));
    var l=2*OA*OB;
    if(l<0.0000001)l=0.0000001;
    return Math.acos( (OA*OA+OB*OB-AB*AB) / (2*OA*OB) );
}

XMath.angle_90=function(ax,ay,ox,oy,bx,by)
{
    var OA=Math.sqrt(ax*ax+ay*ay);
    var OB=Math.sqrt(bx*bx+by*by);
    var AB=Math.sqrt((bx-ax)*(bx-ax)+(by-ay)*(by-ay));
    if(OA*OA+OB*OB>AB*AB)return false;
    return true;
}

XMath.angle_redress=function(ao,ad,gap)
{
    if(ao>360)ao-=360;
    if(ao<0)ao+=360;
    if(ad>360)ad-=360;
    if(ad<0)ad+=360;

    if(ao-ad>180)
    {
        if(Math.abs(ao-ad-360)>gap)ao+=gap;
        else ao=ad;
    }
    else if(ao-ad>0)
    {
        if(ao-ad>gap)ao-=gap;
        else ao=ad;
    }
    else if(ao-ad>-180)
    {
        if(Math.abs(ao-ad)>gap)ao+=gap;
        else ao=ad;
    }
    else
    {
        if(Math.abs(ao-ad+360)>gap)ao-=gap;
        else ao=ad;
    }

    if(ad>360)ad-=360;
    if(ad<0)ad+=360;

    return ao;
}

XMath.segment_node=function(s1,s2,ol)
{//线段交点
    if(s1.k==s2.k)return false;

    ol.x=-(s1.b-s2.b)/(s1.k-s2.k);
    ol.y=ol.x*s1.k+s1.b;

    if(ol.x<s1.x1 && ol.x<s1.x2)return false;
    if(ol.x>s1.x1 && ol.x>s1.x2)return false;
    if(ol.x<s2.x1 && ol.x<s2.x2)return false;
    if(ol.x>s2.x1 && ol.x>s2.x2)return false;

    return true;
}
XMath.foot_drop=function(p1,s1,op)
{//点到直线垂足
    var s2=M_SEGMENT.gi(20);
    if(s1.k==0)s2.k=99999999;
    else s2.k=-1/s1.k;
    s2.b=p1.y-s2.k*p1.x;

    op.x=-(s1.b-s2.b)/(s1.k-s2.k);
    op.y=op.x*s1.k+s1.b;

    if(op.x<s1.x1 && op.x<s1.x2)return false;
    if(op.x>s1.x1 && op.x>s1.x2)return false;

    return true;
}
XMath.ps_distance=function(p1,s1)
{//点到直线距离
    var p2=M_POINT.gi(20);
    if(XMath.foot_drop(p1,s1,p2))return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
    else return 99999999;//垂足不在线段上
}

XMath.ps_distance_less=function(p1,s1,than)
{//点到直线距离
    if(p1.x<s1.x1-than && p1.x<s1.x2-than)return false;
    if(p1.x>s1.x1+than && p1.x>s1.x2+than)return false;
    if(p1.y<s1.y1-than && p1.x<s1.y2-than)return false;
    if(p1.y>s1.y1+than && p1.x>s1.y2+than)return false;
    var p2=M_POINT.gi(20);
    if(XMath.foot_drop(p1,s1,p2))
    {
        return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y))<than;
    }
    else return false;//垂足不在线段上
}