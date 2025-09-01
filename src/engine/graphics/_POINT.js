export default class _POINT {
    constructor()
    {
        this.x=0;
        this.y=0;
    }

	To( xx, yy)
	{
		this.x=xx;
		this.y=yy;
	}
	copyfrom( p)
	{
		this.x=p.x;
		this.y=p.y;
	}
}
