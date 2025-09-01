
import GmPlay from "../../../../engtst/mgm/GmPlay"
import _XRECT from "./_XRECT"

export default class LockRect {
	constructor()
	{
		this.rs=new Array(3);
		for(var i=0;i<3;i++)this.rs[i]=new _XRECT();
	}
	bIn( x, y)
	{
		return (this.rs[0].bIn(x, y) || this.rs[1].bIn(x, y) || this.rs[2].bIn(x, y));
	}
	Clear()
	{
		this.rs[0].Set(-1, -1, -1, -1);
		this.rs[1].Set(-1, -1, -1, -1);
		this.rs[2].Set(-1, -1, -1, -1);
		this.iCount=0;
	}
	Add( x, y, w, h)
	{
	//	GmPlay.sop(""+x+""+y+""+w+""+h);
		if(this.iCount>=3)return;
		this.rs[this.iCount].Set(x, y, w, h);
		this.iCount++;
	}
	CopyFrom( lr)
	{
		this.iCount=lr.iCount;
		this.rs[0].CopyFrom(lr.rs[0]);
		this.rs[1].CopyFrom(lr.rs[1]);
		this.rs[2].CopyFrom(lr.rs[2]);
	}
}
