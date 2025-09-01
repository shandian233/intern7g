import NormalItem from "./NormalItem"

export default class NormalMission
{
//	public int iMid;
//	public int iType;//=0
//	public int iMPoint;//de_mission point
	
	constructor()
	{
		var i;
		this.bUseing=false;
		this.sName="";
		this.iItemCount=0;
		this.ni=new Array(NormalMission.MAXNORMALITEM);
		for(i=0;i<NormalMission.MAXNORMALITEM;i++)
		{
			this.ni[i]=new NormalItem();
		}
		this.bDetailed=false;
	}
}
NormalMission.MAXNORMALITEM=10;