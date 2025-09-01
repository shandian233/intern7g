

export default class TeamRequestList 
{// 申请列表
	/*
		public int iRid;
		public String sName;
		public int iRas;
		public int iSchoolId;
		public int iLev;
		public Int32Array iColor=new Array(10);//
		public int iWeapTid;
		public String sMapName;
*/
		constructor() 
		{
			this.iRid = 0;
			this.iColor=new Int32Array(10);
		}
		copyfrom( t)
		{
			this.iRid=t.iRid;
			this.sName=t.sName;
			this.iRas=t.iRas;
			this.iSchoolId=t.iSchoolId;
			this.iLev=t.iLev;
			for(var i=0;i<10;i++)this.iColor[i]=t.iColor[i];
			this.iWeapTid=t.iWeapTid;
			this.sMapName=t.sMapName;
		}
}
