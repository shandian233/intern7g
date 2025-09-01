export default class _LISTLINE {
//	public Object pfiled[ ];
//	public XmsCFrame pcoverframe[ ];//选中覆盖框
//	public _LISTLINE pnext;

	constructor()
	{
		this.pnext=null;
		this.pfiled=new Array(32);//
		this.pcoverframe=new Array(32);//
	}
}