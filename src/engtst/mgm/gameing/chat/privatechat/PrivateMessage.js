import LockRect from "../../../../../engtst/mgm/frame/format/LockRect"
import _EXTDATA from "../../../../../engtst/mgm/gameing/chat/publicchat/_EXTDATA"
	
export default class PrivateMessage {
	
	 constructor()
	{
		this.iRid=0;
		this.sName="";
		this.sTime="";
		this.sDetail="";
		this.bFriend=false;
		
		var i;
		this.exts=new Array(5);//
		this.lrs_small=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.exts[i]=new _EXTDATA();
			this.lrs_small[i]=new LockRect();
		}
	}
	 copyfrom( pvm)
	{
		this.iSession=pvm.iSession;
		this.iRid=pvm.iRid;
		this.sName=pvm.sName;
		this.iDRid=pvm.iDRid;
		this.sTime=pvm.sTime;
		this.sDetail=pvm.sDetail;
		this.bFriend=pvm.bFriend;
		
		this.iRax=pvm.iRax;
		this.iFlag=pvm.iFlag;

		this.exts[0].copyfrom(pvm.exts[0]);
		this.exts[1].copyfrom(pvm.exts[1]);
		this.exts[2].copyfrom(pvm.exts[2]);
		this.exts[3].copyfrom(pvm.exts[3]);
		this.exts[4].copyfrom(pvm.exts[4]);
	}
}
