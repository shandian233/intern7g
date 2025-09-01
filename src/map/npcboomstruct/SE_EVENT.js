
import BASESEQUENCE from "./BASESEQUENCE"


export default class SE_EVENT extends BASESEQUENCE
{//序列-事件5
//	public static int MAXEVENTVALUE=8;
//	public int iEid;
//	public String sValues;
//	public BASESEQUENCE next;
	constructor()
	{
        super();
		this.iEid=-1;
		this.next=null;
		var i;
		this.sValues=new Array(SE_EVENT.MAXEVENTVALUE);
		for(i=0;i<SE_EVENT.MAXEVENTVALUE;i++)
		{
			this.sValues[i]="";
		}
	}
};
SE_EVENT.MAXEVENTVALUE=8;