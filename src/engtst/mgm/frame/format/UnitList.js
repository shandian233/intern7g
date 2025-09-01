//#123表情
//#cffffff颜色
export default class UnitList
{/*
	public int iType;//0文字，1表情，2锁定头，3锁定尾
	public int iLp;//行号
	public int iX,iY;//偏移
	public int this.iW,iH;//宽高
	public int iColor;//颜色
	public String sDetail;//具体内容
	*/
	constructor()
	{
		this.sDetail="";
	}
	
	copyfrom( ul)
	{
		this.iType=ul.iType;
		this.iLp=ul.iLp;
		this.iX=ul.iX;
		this.iY=ul.iY;
		this.iW=ul.iW;
		this.iH=ul.iH;
		this.iColor=ul.iColor;
		this.sDetail=ul.sDetail;
	}
}