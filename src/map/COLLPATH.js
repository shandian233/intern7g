export default class COLLPATH
{
//	public int iPathCount;
//	public int path;
	constructor( pc)
	{
        this.iPathCount=pc;
        this.path=new Array(pc);
        for(var i=0;i<pc;i++)this.path[i]=new Int32Array(2);
		//this.path=new Int32Array(pc)(2);//
	}
}