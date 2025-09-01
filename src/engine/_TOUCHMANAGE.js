
export default class _TOUCHMANAGE
{/*
	public byte iTouchStat; //1 :点中  2拖动   3up
	public int iTid;//第几次点击，用于判断多点触摸
	public int iPX,iPY;
	public int iX,iY;
	public int iSourceX,iSourceY;
	*/
	constructor()
	{
		this.iTouchStat=0;
	}
	 copyfrom( t)
	{
		this.iTid=t.iTid;
		this.iTouchStat=t.iTouchStat;
		this.iPX=t.iPX;
		this.iPY=t.iPY;
		this.iX=t.iX;
		this.iY=t.iY;
		this.iSourceX=t.iSourceX;
		this.iSourceY=t.iSourceY;
	}
}
