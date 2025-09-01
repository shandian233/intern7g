
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XAnima from "../../../../../engine/graphics/XAnima"
import MyAI from "../../../../../engtst/mgm/MyAI"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class BackToSchool extends BaseClass{

	constructor( a)
	{
		super();
	}
	Draw()
	{
		if (Confirm1.end(Confirm1.CONFIRM_BACKTOSCHOOL))
		{//
			if (Confirm1.bConfirm) 
			{// 同意，寻路到师门
				if(GmMe.me.rbs.iSchoolId>0)
				{
//					MyAI.gi().FindNpc(MyAI._TEACHERID[GmMe.me.rbs.iSchoolId], true);
					MyAI.gi().FindNpc(BackToSchool.iNpcId, true,true);
				}
			}
			XStat.gi().PopStat(1);
		}
	}
	ProcTouch( msg, x, y)
	{
		return false;
	}
}
BackToSchool.iNpcId;
BackToSchool.Open=function( pls)
{
	XStat.gi().PushStat(XStat.GS_BACKTOSCHOOL);
	BackToSchool.iNpcId=pls.GetNextInt();//npcid???
	Confirm1.start(Confirm1.CONFIRM_BACKTOSCHOOL, pls.GetNextString());
}