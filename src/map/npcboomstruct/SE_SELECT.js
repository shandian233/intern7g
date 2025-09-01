import BASESEQUENCE from "./BASESEQUENCE"

export default class SE_SELECT extends BASESEQUENCE
{//序列-选择4
/*	public static int MAXSELECTCOUNT=6;
	public int iCount;//答案数量
	public String sHead;
	public String sQuestion;
	public String sAnswers;
	public BASESEQUENCE next;
    */
   constructor()
   {
       super();
       this.sHead="";
       this.iCount=0;
       this.sQuestion="";
       var i;
       this.sAnswers=new Array(SE_SELECT.MAXSELECTCOUNT);
       this.next=new Array(SE_SELECT.MAXSELECTCOUNT);
       for(i=0;i<SE_SELECT.MAXSELECTCOUNT;i++)
       {
           this.next[i]=null;
           this.sAnswers[i]="";
       }
   }
	  copyfrom( se)
	{
		this.iCount=se.iCount;
		this.sHead=se.sHead;
		this.sQuestion=se.sQuestion;
		for(var i=0;i<SE_SELECT.MAXSELECTCOUNT;i++)
		{
			this.sAnswers[i]=se.sAnswers[i];
			this.next[i]=se.next[i];
		}
	}
	 AddSelect( answer, sn)
	{
		if(this.iCount>=SE_SELECT.MAXSELECTCOUNT)return;
		this.sAnswers[this.iCount]=answer;
		this.next[this.iCount]=sn;
		this.iCount++;
	}

}
SE_SELECT.MAXSELECTCOUNT=6;