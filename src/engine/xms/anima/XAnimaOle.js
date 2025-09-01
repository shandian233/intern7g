import GameData from "../../../config/GameData"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import _XANIMA from "./_XANIMA"

export default class XAnimaOle {

	constructor()
	{
		this.phead=null;
		this.pend=null;
	}
	 ReleaseAll()
	{
		this.phead=null;
		this.pend=null;
	}
	LoadOleAnima( mark, fn)
	{
		fn="res/datapackage/"+fn;
		
		var p=this.phead;
		while(p!=null)
		{
			if(p.sMark==mark)return;//已经载入过
			p=p.pnext;
		}
		p=new _XANIMA();
		
		p.xani=XAnima._GET(fn);
		if(p.xani==null)
		{
			var i=0;
		}
		/*
		p.xani=new XAnima(GmPlay.gp.xm3f);
		GmPlay.sop(""+fn);
		p.xani.LoadAnima_fullpath(fn, GmPlay.gp.pls, GameData.bFromSD);
*/
		p.sMark=mark;

		if(this.phead==null)
		{
			this.phead=p;
			this.pend=p;
		}
		else
		{
			this.pend.pnext=p;
			this.pend=p;
		}
	}
	  FindAnima( mark)
	{
		var p=this.phead;
		while(p!=null)
		{
//			GmPlay.sop(""+p.sMark+"====="+mark);
			if(p.sMark==mark)return p.xani;
			p=p.pnext;
		}
		return null;
	}
}