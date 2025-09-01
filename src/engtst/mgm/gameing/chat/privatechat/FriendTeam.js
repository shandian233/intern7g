import BaseClass from "../../../../../engine/BaseClass"



import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"

import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"

export default class FriendTeam extends BaseClass{
	

	
	 constructor( ani)
	{
		super();
		var i;
		this.iW=150;
		this.iH=340;
		this.iX=GmConfig.SCRW-this.iW-230;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		this.btn_team=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_team[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_team[i].InitButton("按钮1_110");
		}
		this.btn_team[0].sName="亲密";
		this.btn_team[1].sName="普通";
		this.btn_team[2].sName="黑名单";
		this.btn_team[3].sName="删除";
	}
	 Draw()
	{
		var i;
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+20, FriendTeam.sName, 0xffffffff, 25, 101, 1, 1, 0, -2, 0);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+20+30, ""+FriendTeam.iRid, 0xffffffff, 25, 101, 1, 1, 0, -2, 0);
		for(i=0;i<4;i++)
		{
			this.btn_team[i].Move(this.iX+20, this.iY+20+30+30+i*60, 110, 52);
			this.btn_team[i].Draw();
		}
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<4;i++)
		{
			if(this.btn_team[i].ProcTouch(msg, x, y))
			{
				if(this.btn_team[i].bCheck())
				{
					GmProtocol.gi().s_FriendOperate(2,FriendTeam.iRid,i);
					if(i==3)
					{//删除
						var mf=FriendList.gi().FindFriend(FriendTeam.iRid);
						if(mf!=null)
						{
							mf.bUseing=false;
						}
						FriendList.gi().SortFriends();
					}
					XStat.gi().PopStat(1);
				}
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return true;
	}
}
FriendTeam.sName;
FriendTeam.iRid;

FriendTeam.Open=function( name, rid)
{
    FriendTeam.sName=name;
    FriendTeam.iRid=rid;
    XStat.gi().PushStat(XStat.GS_FRIENDTEAM);
}