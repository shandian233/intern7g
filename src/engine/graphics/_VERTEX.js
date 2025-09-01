

export default class _VERTEX
{
    constructor()
    {
        this.x=0;
        this.y=0;
        this.z=0;
    }
    copyfrom( v)
	{
		x=v.x;
		y=v.y;
		z=v.z;
	}
	toString()
	{
		return "x="+x+",y="+y+",z="+z;
	}
	To( tx, ty, tz)
	{
		x=tx;
		y=ty;
		z=tz;
	}
	Move( v)
	{
		x+=v.x;
		y+=v.y;
		z+=v.z;
	}
	Move( mx, my, mz)
	{
		x+=mx;
		y+=my;
		z+=mz;
	}

	scale( s)
	{
		x*=s;
		y*=s;
		z*=s;
	}
	Rotate( c, jd)
	{
		jd=(jd*Math.PI/180);
		var l, tjd;
		switch(c)
		{
			case '0'://x
			case 'x':
			case 'X':
				l=(Math.sqrt(y*y+z*z));
				if(y==0)y=0.0000001;
				tjd=(Math.atan(z/y));
				if(y<0)tjd+=(Math.PI);
				tjd+=jd;
				z= (Math.sin(tjd)*l);
				y= (Math.cos(tjd)*l);
				break;
			case '1'://y
			case 'y':
			case 'Y':
				l=(Math.sqrt(z*z+x*x));
				if(x==0)x=0.0000001;
				tjd=(Math.atan(z/x));
				if(x<0)tjd+=(Math.PI);
				tjd+=jd;
				z= (Math.sin(tjd)*l);
				x= (Math.cos(tjd)*l);
				break;
			case '2'://z
			case 'z':
			case 'Z':
				l=(Math.sqrt(y*y+x*x));
				if(x==0)x=0.0000001;
				tjd=(Math.atan(y/x));
				if(x<0)tjd+=(Math.PI);
				tjd+=jd;
//				GmPlay.sop("before:"+x+":"+y+":"+z);
				y= (Math.sin(tjd)*l);
				x= (Math.cos(tjd)*l);
//				GmPlay.sop("after:"+x+":"+y+":"+z);
				break;
		}
	}
	LengthTo( v)
	{
		return (Math.sqrt((v.x-x)*(v.x-x)+(v.y-y)*(v.y-y)+(v.z-z)*(v.z-z)));
	}
	LengthTo( tx, ty, tz)
	{
		return (Math.sqrt((tx-x)*(tx-x)+(ty-y)*(ty-y)+(tz-z)*(tz-z)));
	}
}