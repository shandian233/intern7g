import BASESEQUENCE from "./BASESEQUENCE"

export default class SE_BRANCH extends BASESEQUENCE
{//序列-分支2
//	public static int MAXSELECTCOUNT=6;
//	public int iCount;
//	public BASESEQUENCE next;
	 constructor()
	{
        super();
        this.iType=0;
		this.iCount=0;
		var i;
		this.next=new BASESEQUENCE(SE_BRANCH.MAXSELECTCOUNT);
		for(i=0;i<SE_BRANCH.MAXSELECTCOUNT;i++)
		{
			this.next[i]=null;
		}
	}
};
SE_BRANCH.MAXSELECTCOUNT=6;