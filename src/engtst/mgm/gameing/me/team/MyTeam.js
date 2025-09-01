
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class MyTeam {

//	public static MyTeam mt;
	
	constructor()
	{
//		MyTeam.iTeamRid=new Int32Array(5);//
//		MyTeam.iTmpTeamRid=new Array(5);//
		
//		mt=this;
	}

}
MyTeam.bAway=function()
{//暂离状态
	var i;
	for (i = 1; i < 5; i++) 
	{
		if (MyTeam.iTmpTeamRid[i] == GmMe.me.iRid)
		{//在队伍中
			if(MyTeam.iTeamRid[i]<=0)
			{//处于暂离
				return true;
			}
		}
	}
	return false;
}
MyTeam.bNoTeam=function()
{
	if(MyTeam.iTmpTeamRid[0]<=0)return true;
	return false;
}
MyTeam.bInTeam=function()
{
	if(MyTeam.iTmpTeamRid[0]>0)return true;
	return false;
}
MyTeam.bTeamLeader=function()
{
	if(MyTeam.iTmpTeamRid[0]==GmMe.me.iRid)return true;
	return false;
}
MyTeam.bInTmpTeam=function( rid) 
{
	var i;
	if (MyTeam.iTmpTeamRid[0] <= 0)return false;
	for (i = 0; i < 5; i++) 
	{
		if (MyTeam.iTmpTeamRid[i] == rid)return true;
	}
	return false;
}
MyTeam.bFullTeam=function()
{
	var i;
	for(i=0;i<5;i++)
	{
		if(MyTeam.iTeamRid[i]<=0)return false;
	}
	return true;
}
MyTeam.iTeamRid=[0,0,0,0,0];
MyTeam.iTmpTeamRid=[0,0,0,0,0];
MyTeam.sName=["","","","",""];
MyTeam.iRas=[0,0,0,0,0];
MyTeam.iSchoolId=[0,0,0,0,0];
MyTeam.iLev=[0,0,0,0,0];
MyTeam.iColor=new Array(5);//
for(var i=0;i<5;i++)MyTeam.iColor[i]=new Int32Array(10);
MyTeam.iWeapTid=[0,0,0,0,0];
MyTeam.sMapName=["","","","",""];

MyTeam.iTeamTarget=0;
MyTeam.iLev1=0,MyTeam.iLev2=100;
MyTeam.bLeaderAutoTeaming=false;
MyTeam.bSingleAutoTeaming=false;