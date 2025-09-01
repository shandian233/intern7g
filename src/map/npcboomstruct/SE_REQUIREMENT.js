import BASESEQUENCE from "./BASESEQUENCE"

export default class SE_REQUIREMENT extends BASESEQUENCE
{//序列-条件3
//	public static int MAXREQUIREMENTVALUE=8;
//	public int iRid;//条件ID
//	public String sValues;
//	public BASESEQUENCE next;
	constructor()
	{
        super();
		this.iRid=-1;
		this.next=null;
		var i;
		this.sValues=new Array(SE_REQUIREMENT.MAXREQUIREMENTVALUE);
		for(i=0;i<SE_REQUIREMENT.MAXREQUIREMENTVALUE;i++)
		{
			this.sValues[i]="";
		}
	}
};
SE_REQUIREMENT.MAXREQUIREMENTVALUE=8;