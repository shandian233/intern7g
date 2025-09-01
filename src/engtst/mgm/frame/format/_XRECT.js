
export default class _XRECT {
	constructor()
	{
		this.iX=-1;
		this.iY=-1;
		this.iW=-1;
		this.iH=-1;
	}
	Set( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
	}
	bIn( x, y)
	{
		if(x<this.iX)return false;
		if(y<this.iY)return false;
		if(x>this.iX+this.iW)return false;
		if(y>this.iY+this.iH)return false;
		return true;
	}
	CopyFrom( r)
	{
		this.iX=r.iX;
		this.iY=r.iY;
		this.iW=r.iW;
		this.iH=r.iH;
	}
}
