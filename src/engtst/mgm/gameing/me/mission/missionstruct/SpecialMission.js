import SpecialItem from "./SpecialItem"

export default class SpecialMission
{
/*	public int iMid;
	
	public int iType;//>=1
	public String sDetail;//detail
	public int iMPoint;//特殊任务类型
	public int iCount;//当前次数
	*/
	constructor()
	{
		var i;
		this.bUseing=false;
		this.iItemCount=0;
		this.si=new Array(SpecialMission.MAXSPECIALITEM);//
		for(i=0;i<SpecialMission.MAXSPECIALITEM;i++)
		{
			this.si[i]=new SpecialItem();
		}
		this.sName="";
		this.bDetailed=false;
	}
}
SpecialMission.MAXSPECIALITEM=10;