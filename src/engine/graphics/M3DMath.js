import _VERTEX from "./_VERTEX"

class _EQUATIONLINE
{//直线方程
	constructor()
	{

	}
	/*
	float a,b,c,d;
	// /x=ay+b
	// \y=cz+d
	//已知2点求直线方程:
	// a=(x1-x2)/(y1-y2);
	// b=x1-ay1;
	// c=(y1-y2)/(z1-z2);
	// d=y1-cz1;
	// 已知2直线求交�?	//y=(b2-b1)/(a1-a2);
	//x=a1y+b1
	//z=(y-d1)/c1
	//
	boolean bFixedx,bFixedy,bFixedz;
	float x,y,z;*/
}

export default class M3DMath {

	constructor()
	{
		this.vTmpVertex=new _VERTEX();
	}
	GetLineEquation( l, v1, v2)
	{
		if(v1.x==v2.x)
		{
			l.bFixedx=true;
			l.x=v1.x;
		}
		else l.bFixedx=false;
		
		if(v1.y==v2.y)
		{
			l.bFixedy=true;
			l.y=v1.y;
		}
		else l.bFixedy=false;
		
		if(v1.z==v2.z)
		{
			l.bFixedz=true;
			l.z=v1.z;
		}
		else l.bFixedz=false;
		
		if(l.bFixedy)l.a=9999999;
		else l.a=(v1.x-v2.x)/(v1.y-v2.y);
		l.b=v1.x-l.a*v1.y;
		if(l.bFixedz)l.c=9999999;
		else l.c=(v1.y-v2.y)/(v1.z-v2.z);
		l.d=v1.y-l.c*v1.z;
		
		return true;
	}

	GetVertexInLine( dv, l, xyz, p)
	{
		switch(xyz)
		{
			case 0:
			case 'x':
			case 'X':
				if(l.bFixedx)return false;
				dv.x=p;
				dv.y=(dv.x-l.b)/l.a;
				dv.z=(dv.y-l.d)/l.c;
				break;
			case 1:
			case 'y':
			case 'Y':
				if(l.bFixedy)return false;
				dv.y=p;
				dv.x=l.a*dv.y+l.b;
				dv.z=(dv.y-l.d)/l.c;
				break;
			case 2:
			case 'z':
			case 'Z':
				if(l.bFixedz)return false;
				dv.z=p;
				dv.y=l.c*dv.z+l.d;
				dv.x=l.a*dv.y+l.b;
				break;
		}
		if(l.bFixedx)dv.x=l.x;
		if(l.bFixedy)dv.y=l.y;
		if(l.bFixedz)dv.z=l.z;
		// /x=ay+b
		// \y=cz+d
		return true;
	}

	GetLineIntersect( dv, l1, l2)
	{//计算两直线交�?	
		if(l1.bFixedx)return this.GetVertexInLine(dv,l2,'x',l1.x);
		if(l1.bFixedy)return this.GetVertexInLine(dv,l2,'y',l1.y);
		if(l1.bFixedz)return this.GetVertexInLine(dv,l2,'z',l1.z);
		
		if(l2.bFixedx)return this.GetVertexInLine(dv,l1,'x',l2.x);
		if(l2.bFixedy)return this.GetVertexInLine(dv,l1,'y',l2.y);
		if(l2.bFixedz)return this.GetVertexInLine(dv,l1,'z',l2.z);
		
		dv.y=(l2.b-l1.b)/(l1.a-l2.a);
		dv.x=l1.a+dv.y+l1.b;
		dv.z=(dv.y-l1.d)/l1.c;
		
		return true;
	}

	InsertValue(  dv, v1, v2, weight, total)
	{//两点间根据权重插�?	
		dv.x=v1.x+(v2.x-v1.x)*weight/total;
		dv.y=v1.y+(v2.y-v1.y)*weight/total;
		dv.z=v1.z+(v2.z-v1.z)*weight/total;	
	}

	GetAngleZ( d, o)
	{
		var tjd;
		this.vTmpVertex.x=d.x-o.x;
		this.vTmpVertex.y=d.y-o.y;
		this.vTmpVertex.z=d.z-o.z;
//		l= Math.sqrt(this.vTmpVertex.y*this.vTmpVertex.y+this.vTmpVertex.x*this.vTmpVertex.x);
		tjd= Math.atan(this.vTmpVertex.y/this.vTmpVertex.x);
		if(this.vTmpVertex.x<0)tjd+=M3DMath.PI;
		return tjd;
	}

	GetVertexDistance( v1, v2)
	{
		return Math.sqrt((v1.x-v2.x)*(v1.x-v2.x)+
					(v1.y-v2.y)*(v1.y-v2.y)+
					(v1.z-v2.z)*(v1.z-v2.z));
	}

	RotationAngle( d, jd, to)
	{//向目标角度小于半圆的旋转
		var ft;
		while(jd>M3DMath.PI*2)jd-=M3DMath.PI*2;
		while(jd<0)jd+=M3DMath.PI*2;
		while(to>M3DMath.PI*2)to-=M3DMath.PI*2;
		while(to<0)to+=M3DMath.PI*2;
		
		if(jd>to)
		{
			ft=jd-to;
			if(ft<M3DMath.PI)
			{
				if(ft<d)return -ft;
				else return -d;
			}
			else {
				if(M3DMath.PI*2-ft<d)return ft;
				else return d;
			}
		}
		else {
			ft=to-jd;
			if(ft<M3DMath.PI)
			{
				if(ft<d)return ft;
				else return d;
			}
			else {
				if(M3DMath.PI*2-ft<d)return -ft;
				else return -d;
			}
		}
	}

	RotationVertex_2D( v, dv, jd)
	{
		var l;
		var tx,ty,tjd;
		
		tx=v.x-dv.x;
		ty=v.y-dv.y;
		if(tx==0)tx= 0.0000001;
		tjd=Math.atan(ty/tx);
		if(tx<0)tjd+=M3DMath.PI;
		tjd=tjd+M3DMath.PI*jd/180;//弧度
		l=Math.sqrt(tx*tx+ty*ty);
		v.x=Math.cos(tjd)*l+dv.x;
		v.y=Math.sin(tjd)*l+dv.y;
	}
	
	GetAngleXY( d, o)
	{//弧度
		var tx,ty,tjd;
		
		tx=d.x-o.x;
		ty=d.y-o.y;
		if(tx==0)tx=(0.0000001);
		tjd=(Math.atan(ty / tx));
		if(tx<0)tjd+=(M3DMath.PI);

		return (tjd*180/M3DMath.PI);
	}
	GetAngleXY( dx, dy, ox, oy)
	{//返回角度制
		var tx,ty,tjd;
		
		tx=dx-ox;
		ty=dy-oy;
		if(tx==0)tx=(0.0000001);
		tjd=(Math.atan(ty/tx));
		if(tx<0)tjd+=(M3DMath.PI);

		return (tjd*180/M3DMath.PI);
	}
	

}
M3DMath.PI= 3.1415926;
M3DMath.m=new M3DMath();


M3DMath.GetAngleXZ=function( o, d)
{//弧度
	var tx,tz,tjd;
	
	tx=o.x-d.x;
	tz=o.z-d.z;
	if(tx==0)tx=0.0000001;
	tjd=(Math.atan(tz / tx));
	if(tx<0)tjd+=(M3DMath.PI);
	if(tjd<0)tjd+=M3DMath.PI*2;

	return tjd*180/M3DMath.PI;
}
M3DMath.GetAngleY=function( o, d)
{
	var l,tjd;
	l= o.LengthTo(d);
	if(l==0)l=0.0000001;
	tjd= Math.asin((o.y-d.y)/l);
//		if(this.vTmpVertex.x<0)tjd+=M3DMath.PI;
	return tjd*180/M3DMath.PI;
}

M3DMath.xmax=function( f1, f2)
{
	if(f1>f2)return f1;
	return f2;
}
M3DMath.xmin=function( f1, f2)
{
	if(f1<f2)return f1;
	return f2;
}
M3DMath.intersect=function( uax, uay, ubx, uby, vax, vay, vbx, vby)
 {
	 return (((uax>ubx?uax:ubx)>=(vax<vbx?vax:vbx))&&
			 ((vax>vbx?vax:vbx)>=(uax<ubx?uax:ubx))&&
			 ((uay>uby?uay:uby)>=(vay<vby?vay:vby))&&
			 ((vay>vby?vay:vby)>=(uay<uby?uay:uby))&&
			 ( M3DMath.multiply(vax,vay,ubx,uby,uax,uay)* M3DMath.multiply(ubx,uby,vbx,vby,uax,uay)>=0)&&
			 ( M3DMath.multiply(uax,uay,vbx,vby,vax,vay)* M3DMath.multiply(vbx,vby,ubx,uby,vax,vay)>=0));
 }
 M3DMath.multiply=function( p1x, p1y,
		 p2x, p2y,
		 p0x, p0y)
 {
	 return((p1x-p0x)*(p2y-p0y)-(p2x-p0x)*(p1y-p0y));    
 }