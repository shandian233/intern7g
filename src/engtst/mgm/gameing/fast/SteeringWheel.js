import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import FindWay from "../../../../map/FindWay"
import MapManager from "../../../../map/MapManager"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import Gameing from "../../../../engtst/mgm/gameing/Gameing"
import PublicChat_SmallFrame from "../../../../engtst/mgm/gameing/chat/publicchat/PublicChat_SmallFrame"
import JQMode from "../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MySell from "../../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../../engtst/mgm/gameing/me/team/MyTeam"
import SystemOperate from "./SystemOperate"
export default class SteeringWheel {

	SteeringWheel()
	{
		this.iW=160;
		this.iH=160;
		this.pm3f=M3DFast.xm3f;
	}
	Draw()
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(SystemOperate.iWheel==1)return;
		var i,j,k;
		this.iX=this.iW/2;
		if(PublicChat_SmallFrame.gi().bOpen)this.iY=GmConfig.SCRH-PublicChat_SmallFrame.gi().iModifyH-this.iH/2-70;
		else this.iY=GmConfig.SCRH-this.iH/2;
		if(this.iY>GmConfig.SCRH-this.iH/2)this.iY=GmConfig.SCRH-this.iH/2;
//		if(PublicChat_SmallFrame.gi().iModifyH<110)this.iY=GmConfig.SCRH-110-this.iH/2;
		
		GmPlay.xani_ui.DrawAnima(this.iX, this.iY, "方向盘",0);
//		GmPlay.xani_ui.DrawAnimaEx(this.iX, this.iY, "方向盘",0, this.bLocked?101:50, 1, 1, 0, 0, 0);
//		this.pm3f.DrawCircle(this.iX, this.iY, this.iW/2, this.iH/2, 0xffffffff);

		if(this.bLocked)
		{
			this.iLockTime++;//按下后的时间
			i=XDefine.llength(this.iLockX, this.iLockY, this.iX, this.iY);
			var f=XDefine.GetAngleXY(this.iLockX, this.iLockY, this.iX, this.iY);


			j= (Math.cos(f*Math.PI/180)*50);
			k= (Math.sin(f*Math.PI/180)*50);

			if(Gameing.iFindWayOnce<=0)
			{
				Gameing.iFindWayOnce++;
				if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
				{//没队伍，或是队长，才能走
					if(MapManager.gi().mfy.findway1(GmMe.me.iX,GmMe.me.iY,GmMe.me.iX+j,GmMe.me.iY+k))
					{
						if(FindWay.bAutoBoom && this.bAutoRun)
						{//自动走碰到障碍物，停下
							this.bAutoRun=false;
							this.bLocked=false;
							GmPlay.xani_ui.DrawAnima(this.iX, this.iY, "方向盘",1);
							return;
						}
						else if(MapManager.gi().mfy.checkagain())
						{
							MapManager.gi().vbk.iGoToNpcFlag=-1;
							MapManager.gi().vbk.iGoToNpcId=-1;
							GmMe.me.start(MapManager.gi().mfy.iPath,MapManager.gi().mfy.iPathDeep);
						}
					}
					else if(this.bAutoRun)
					{//自动走碰到障碍物，停下
						this.bAutoRun=false;
						this.bLocked=false;
						GmPlay.xani_ui.DrawAnima(this.iX, this.iY, "方向盘",1);
						return;
					}

//					else
//					{
//						j= (Math.cos(f*Math.PI/180)*300);
//						k= (Math.sin(f*Math.PI/180)*300);
//						if(MapManager.gi().mfy.findway(GmMe.me.iX,GmMe.me.iY,GmMe.me.iX+j,GmMe.me.iY+k))
//						{
//							if(MapManager.gi().mfy.checkagain())
//							{
//								GmMe.me.start(MapManager.gi().mfy.iPath,MapManager.gi().mfy.iPathDeep);
//							}
//						}
//					}
				}
			}
			if(i>80-30)
			{
				j= (Math.cos(f*Math.PI/180)*(80-30));
				k= (Math.sin(f*Math.PI/180)*(80-30));
			}
			else
			{
				j=this.iLockX-this.iX;
				k=this.iLockY-this.iY;
			}
//			this.pm3f.DrawCircle(this.iX+j, this.iY+k, 30, 30, 0xffffffff);
		}
		else
		{
			j=0;k=0;
		}
		if(this.bAutoRun)
		{
			j=0;k=0;
		}
		GmPlay.xani_ui.DrawAnima(this.iX+j, this.iY+k, "方向盘",1);
	}
	ProcTouch( msg, x, y)
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return false;
		if(MySell.gi().bSelling)return false;
		if(SystemOperate.iWheel==1)return false;
		if(msg==1)
		{//按下
			if(this.bAutoRun)
			{
				this.bAutoRun=false;
				this.bLocked=false;
			}
			if(XDefine.llength(x, y, this.iX, this.iY)<=80)
			{
				this.iLockTime=0;
				this.bLocked=true;
				this.iLockX=x;
				this.iLockY=y;
			}
		}
		
		if(this.bLocked && !this.bAutoRun)
		{
			if(msg==2)
			{
				this.iLockX=x;
				this.iLockY=y;
			}
			if(msg==3)
			{
				if(this.iLockTime>=6 || XDefine.llength(x, y, this.iX, this.iY)<=80)this.bLocked=false;
				return true;
			}
			return true;
		}
		
		return false;
	}
}
SteeringWheel.sw=new SteeringWheel();