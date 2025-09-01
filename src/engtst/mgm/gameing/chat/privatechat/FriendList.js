import MapManager from "../../../../../map/MapManager"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import XFight from "../../../../../engtst/mgm/gameing/fight/XFight"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MySell from "../../../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"
import MyFriends from "./MyFriends"

import PrivateChatWatch from "./PrivateChatWatch"
import PublicInterface from "../../../../../zero/Interface/PublicInterface";
import PrivateChat_Send from "./PrivateChat_Send"
import PrivateChatRecord from "./PrivateChatRecord"
import FriendTeam from "./FriendTeam"

class TempChat
{
//	public int iRid;
//	public String sName;
//	public int iRax;
    constructor()
    {

    }
	 copyfrom( t)
	{
		this.iRid=t.iRid;
		this.sName=t.sName;
		this.iRax=t.iRax;
	}
}


export default class FriendList {
	
//	XButton btn_near;//附近玩家列表
//	XButton btn_online;
//	XButton btn_offline;
//	XButton btn_black;//黑名单
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	constructor()
	{
		var i;
		this.pm3f=M3DFast.gi();

		this.bShow=false;

		this.btn_section=new Array(3);//
		this.btn_mpl=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_section[i]=new XButton(GmPlay.xani_nui3);
			this.btn_section[i].InitButton("分类标签按钮");
			
			this.btn_mpl[i]=new XButton(GmPlay.xani_nui3);
			this.btn_mpl[i].InitButton("分组标签按钮");
		}
		this.btn_mpl[0].sName="密";
		this.btn_mpl[1].sName="普";
		this.btn_mpl[2].sName="临";

		this.btn_operate=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_operate[i]=new XButton(GmPlay.xani_nui3);
			this.btn_operate[i].InitButton("好友功能按钮");
		}
		//查看，前往，攻击
		//发送，记录，分组，查看
		//分组

		////////////////////////////////////////////////////////////////////////////////////

		this.iSectPoint=1;
		this.iScrollOff=0;
		this.iNameSize=24;
		this.iSelectPoint=-1;

		this.friends=new Array(FriendList.MAXFRIEND);//
		for(i=0;i<FriendList.MAXFRIEND;i++)this.friends[i]=new MyFriends();
		this.iOnLineFriendCount=0;
		this.iOffLineFriendCount=0;
		this.iBlackFriendCount=0;

		this.btn_chat0=new XButtonEx2(GmPlay.xani_icon);
//		this.btn_chat0.Move(this.iCbx,this.iCby, 60, 60);
		this.btn_chat0.InitButton("好友功能按钮");
		this.btn_chat0.bCheckByRect=true;
		this.btn_chat1=new XButtonEx2(GmPlay.xani_icon);
//		this.btn_chat1.Move(this.iCbx,this.iCby, 60, 60);
		this.btn_chat1.InitButton("好友功能按钮");
		this.btn_chat1.bCheckByRect=true;
//		btn_chat.bSingleButton=true;
//		btn_chat.sName="好友";

		this.bOpening=false;
		this.bCloseing=false;
		this.iModifyX=0;

		this.bLocked=false;
		this.bDrag=false;
		this.iModifyY=0;
		this.iDragDelay=0;
		this.iOffY=0;

		this.iF1Count=0;
		this.iF2Count=0;
		this.iF3Count=0;
		this.iF4Count=0;
		this.tmpchat=new Array(FriendList.MAXTEMPCHAT);//
		for(i=0;i<FriendList.MAXTEMPCHAT;i++)
		{
			this.tmpchat[i]=new TempChat();
			this.tmpchat[i].iRid=0;
		}
	}
	//附近    发送，查看，记录
	//在线离线   发送，查看，记录，删除
	//临时    发送，查看，记录，删除
	Draw()
	{
		var i,j,k;
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		var mf;
		var offlinecolor=0xffa0a0a0;
		this.iW=200;
		this.iH=GmConfig.SCRH-20;
		this.iX=GmConfig.SCRW-this.iW;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		if(PublicInterface.gi().iBx>0)
		{
			this.iY=PublicInterface.gi().iBy+PublicInterface.gi().iBh;
			this.iH=GmConfig.SCRH-this.iY-10;
		}
		
		this.iCbx=GmConfig.SCRW-80;
		
		if(XFight.bFighting && XFight.gi().iAlphaEffect>=GmConfig.SCRW)this.iCby=GmConfig.SCRH-80-85*4;
		else this.iCby=GmConfig.SCRH-80-85*3-5;
		if(this.bOpening)
		{
			this.iModifyX+=this.iW/4;
			if(this.iModifyX>=this.iW)
			{
				this.iModifyX=this.iW;
				this.bOpening=false;
			}
		}
		if(this.bCloseing)
		{
			this.iModifyX-=this.iW/4;
			if(this.iModifyX<0)
			{
				this.iModifyX=0;
				this.bCloseing=false;
				this.bShow=false;
			}
		}
		
		if(this.bPrivateChatFlash)
		{
			this.bPrivateChatFlash=PrivateChatWatch.gi().bHaveUnWatched();
		}
		if(this.bShow)
		{
			this.btn_chat1.Move(this.iCbx-this.iModifyX,this.iCby, 72, 72);//关闭按钮
//			this.btn_chat1.SetCheckRect(this.iCbx-this.iModifyX,this.iCby-30, 60, 60);
//			if(this.bPrivateChatFlash && GmPlay.iDelay/2%2==0)this.btn_chat1.Move(this.iCbx+2-this.iModifyX,this.iCby+2, 60, 60);
			if(this.bPrivateChatFlash && parseInt(GmPlay.iDelay/2)%2==0)this.btn_chat1.Move(this.iCbx-this.iModifyX+2,this.iCby+2, 72, 72);
//			{
//				aa_mail.Draw(this.iCbx-this.iModifyX,this.iCby-30);
//				aa_mail.NextFrame();
//			}
//			else 
				this.btn_chat1.Draw();
				M3DFast.gi().DrawText_2(this.btn_chat1.iX+36, this.btn_chat1.iY+80, "好友", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
		}
		else
		{
			this.btn_chat0.Move(this.iCbx-this.iModifyX,this.iCby, 72, 72);//打开按钮
//			this.btn_chat1.SetCheckRect(this.iCbx-this.iModifyX,this.iCby-30, 60, 60);
//			if(this.bPrivateChatFlash && GmPlay.iDelay/2%2==0)this.btn_chat0.Move(this.iCbx+2-this.iModifyX,this.iCby+2, 60, 60);
			if(this.bPrivateChatFlash && parseInt(GmPlay.iDelay/2)%2==0)this.btn_chat0.Move(this.iCbx-this.iModifyX+2,this.iCby+2, 72, 72);
//			{
//				aa_mail.Draw(this.iCbx-this.iModifyX,this.iCby-30);
//				aa_mail.NextFrame();
//			}
//			else 
				this.btn_chat0.Draw();
				M3DFast.gi().DrawText_2(this.btn_chat0.iX+36, this.btn_chat0.iY+80, "好友", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
		}
		

		
		if(!this.bShow)return;

		this.iX=GmConfig.SCRW-this.iModifyX;
		
		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);
//		DrawMode.new_framepc(this.iX, this.iY, this.iW, this.iH);
//		GmPlay.xani_ui.DrawAnima(this.iX, (GmConfig.SCRH-480)/2, "好友列表框", 0);
//		this.pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xffff8040);
//		this.btn_section[0].sName="附近("+Gameing.gameing.iNearRoleCount+")";
//		this.btn_section[1].sName="在线("+this.iOnLineFriendCount+")";
//		this.btn_section[2].sName="离线("+this.iOffLineFriendCount+")";
//		this.btn_section[3].sName="黑名单("+this.iBlackFriendCount+")";
		var x,y;
		for(i=0;i<3;i++)
		{
			x=this.iX+5;
			if(i<=this.iSectPoint)y= this.iY+5+45*i;
			else y=this.iY+this.iH-45*3+45*i;

			this.btn_section[i].Move(x, y, 190, 40);
			this.btn_section[i].Draw();
			if(i==this.iSectPoint)GmPlay.xani_nui3.DrawAnima(x+4, y+10, "打开关闭小箭头",1);
			else GmPlay.xani_nui3.DrawAnima(x+4+6, y+4, "打开关闭小箭头",0);

			M3DFast.gi().DrawTextEx(x+50, y+20, FriendList.btnstr[i], 0xffffffff, 30, 100, 1, 1, 0, 0, -2);
			switch(i)
			{//数量
			case 0:M3DFast.gi().DrawTextEx(x+185, y+20, ""+Gameing.gameing.iNearRoleCount, 0xffffffff, 30, 100, 1, 1, 0, -3, -2);break;
			case 1:M3DFast.gi().DrawTextEx(x+185, y+20, ""+(this.iF1Count+this.iF2Count+this.iF3Count), 0xffffffff, 30, 100, 1, 1, 0, -3, -2);break;
			case 2:M3DFast.gi().DrawTextEx(x+185, y+20, ""+this.iF4Count, 0xffffffff, 30, 100, 1, 1, 0, -3, -2);break;
			}
		}
		this.iOx=this.iX+5;
		this.iOy=this.iY+5+45*(this.iSectPoint+1);
		this.iDx=this.iOx+190;
		this.iDy=this.iY+this.iH-45*3+45*(this.iSectPoint+1)-5;
		
//		this.pm3f.DrawRect_2D(this.iOx, this.iOy, this.iDx, this.iDy, 0xff000000);
		this.pm3f.SetViewClip(this.iOx-60, this.iOy-3, this.iDx, this.iDy);
		
		this.iOy+=(this.iModifyY+this.iOffY);
		/////////////////////////////////////////////////////
		j=0;
		var offx,offy;
		this.bSelected=false;
		switch(this.iSectPoint)
		{
		case 0://附近玩家列表,nrs
			j=0;
			for(i=0;i<Gameing.iNearMax;i++)
			{
				if(Gameing.gameing.nrs[i].bUseing)
				{
					offx=this.iOx;
					offy=this.iOy+j*40;
					if(this.iSelectPoint==j)
					{
						GmPlay.xani_nui3.DrawAnima(offx, offy-1, "选中好友",0);
						
						this.bSelected=true;
						this.iSelectX=offx;this.iSelectY=offy;
						this.iSelectRid=Gameing.gameing.nrs[i].iRid;
						this.sSelectName=Gameing.gameing.nrs[i].sName;
						this.iSelectRax=Gameing.gameing.nrs[i].iRace*2+Gameing.gameing.nrs[i].iSex;
						this.iGoX=Gameing.gameing.nrs[i].iX;
						this.iGoY=Gameing.gameing.nrs[i].iY;
						this.iSBCount=3;
						this.btn_operate[0].sName="查看";//，前往，攻击
						this.btn_operate[1].sName="前往";
						this.btn_operate[2].sName="攻击";
					}
					GmPlay.xani_nui3.DrawAnima(offx, offy, "小头像",Gameing.gameing.nrs[i].iRace*2+Gameing.gameing.nrs[i].iSex);
					this.pm3f.DrawTextEx(offx+42,offy+20, Gameing.gameing.nrs[i].sName, 0xffffffff, this.iNameSize, 101, 1, 1, 0, 0, -2);
//					if(Gameing.gameing.nrs[i].iIsLeader>0)this.pm3f.DrawTextEx(this.iOx+3-12, this.iOy+3+j*this.iNameSize+this.iNameSize/2, "[队]"+Gameing.gameing.nrs[i].sName, 0xffffff00, this.iNameSize, 101, 1, 1, 0, 0, -2);
//					else this.pm3f.DrawTextEx(this.iOx+3, this.iOy+3+j*this.iNameSize+this.iNameSize/2, Gameing.gameing.nrs[i].sName, 0xffffffff, this.iNameSize, 101, 1, 1, 0, 0, -2);
					j++;
				}
			}
			break;
		case 1://好友，亲密，普通，临时
			for(i=0;i<3;i++)
			{
				if(FriendList.iMplPoint==i)
				{
					this.btn_mpl[i].bMouseDown=true;
					this.btn_mpl[i].bMouseIn=true;
				}
				this.btn_mpl[i].Move(this.iOx+i*63, this.iOy-(this.iModifyY+this.iOffY)-3, 62, 50);
				this.btn_mpl[i].Draw();
			}
			this.iOy+=50;
			this.pm3f.SetViewClip(this.iOx-60, this.iOy-(this.iModifyY+this.iOffY)-3, this.iDx, this.iDy);
			if(FriendList.iMplPoint==0)
			{//亲密好友
				for(i=0;i<this.iF1Count;i++)
				{
					offx=this.iOx;
					offy=this.iOy+i*40;
					mf=this.friends[this.flist1[i]];
					if(this.iSelectPoint==i)
					{
						GmPlay.xani_nui3.DrawAnima(offx, offy-1, "选中好友",0);
						
						this.bSelected=true;
						this.iSelectX=offx;this.iSelectY=offy;
						this.iSelectRid=mf.iRid;
						this.sSelectName=mf.sName;
						this.iSelectRax=mf.iImportant%100;
						//发送，记录，分组，查看
						if(mf.bOnLine)this.iSBCount=4;
						else this.iSBCount=3;
						this.btn_operate[0].sName="发送";//，前往，攻击
						this.btn_operate[1].sName="记录";
						this.btn_operate[2].sName="分组";
						this.btn_operate[3].sName="查看";
					}
					GmPlay.xani_nui3.DrawAnima(offx, offy, "小头像",mf.iImportant%100);
					this.pm3f.DrawTextEx(offx+42,offy+20, mf.sName, mf.bOnLine?0xffffffff:offlinecolor, this.iNameSize, 101, 1, 1, 0, 0, -2);
				}
				j=this.iF1Count;
			}
			if(FriendList.iMplPoint==1)
			{//普通好友
				for(i=0;i<this.iF2Count;i++)
				{
					offx=this.iOx;
					offy=this.iOy+i*40;
					mf=this.friends[this.flist2[i]];
					if(this.iSelectPoint==i)
					{
						GmPlay.xani_nui3.DrawAnima(offx, offy-1, "选中好友",0);
						
						this.bSelected=true;
						this.iSelectX=offx;this.iSelectY=offy;
						this.iSelectRid=mf.iRid;
						this.sSelectName=mf.sName;
						this.iSelectRax=mf.iImportant%100;
						//发送，记录，分组，查看
						if(mf.bOnLine)this.iSBCount=4;
						else this.iSBCount=3;
						this.btn_operate[0].sName="发送";//，前往，攻击
						this.btn_operate[1].sName="记录";
						this.btn_operate[2].sName="分组";
						this.btn_operate[3].sName="查看";
					}
					GmPlay.xani_nui3.DrawAnima(offx, offy, "小头像",mf.iImportant%100);
					this.pm3f.DrawTextEx(offx+42,offy+20, mf.sName, mf.bOnLine?0xffffffff:offlinecolor, this.iNameSize, 101, 1, 1, 0, 0, -2);
				}
				j=this.iF2Count;
			}
			if(FriendList.iMplPoint==2)
			{//临时好友
				for(i=0;i<this.iF3Count;i++)
				{
					offx=this.iOx;
					offy=this.iOy+i*40;
					if(this.iSelectPoint==i)
					{
						GmPlay.xani_nui3.DrawAnima(offx, offy-1, "选中好友",0);
						
						this.bSelected=true;
						this.iSelectX=offx;this.iSelectY=offy;
						this.iSelectRid=this.tmpchat[i].iRid;
						this.sSelectName=this.tmpchat[i].sName;
						this.iSelectRax=this.tmpchat[i].iRax;
						//发送，记录，分组，查看
						this.iSBCount=4;
						this.btn_operate[0].sName="发送";//，前往，攻击
						this.btn_operate[1].sName="记录";
						this.btn_operate[2].sName="分组";
						this.btn_operate[3].sName="查看";
					}
//					GmPlay.xani_nui3.DrawAnima(offx, offy, "小头像",mf.iImportant%100);
//					this.pm3f.DrawTextEx(offx+42,offy+20, mf.sName, mf.bOnLine?0xffffffff:0xff808080, this.iNameSize, 101, 1, 1, 0, 0, -2);
					this.pm3f.DrawTextEx(offx+2,offy+20, this.tmpchat[i].sName, 0xffffffff, this.iNameSize, 101, 1, 1, 0, 0, -2);
				}
				j=this.iF3Count;
			}
			this.pm3f.NoClip();
			break;
		case 2://黑名单
			for(i=0;i<this.iF4Count;i++)
			{
				offx=this.iOx;
				offy=this.iOy+i*40;
				mf=this.friends[this.flist4[i]];
				if(this.iSelectPoint==i)
				{
					GmPlay.xani_nui3.DrawAnima(offx, offy-1, "选中好友",0);
					
					this.bSelected=true;
					this.iSelectX=offx;this.iSelectY=offy;
					this.iSelectRid=mf.iRid;
					this.sSelectName=mf.sName;
					//发送，记录，分组，查看
					this.iSBCount=1;
					this.btn_operate[0].sName="分组";//，前往，攻击
//					this.btn_operate[1].sName="记录";
//					this.btn_operate[2].sName="分组";
//					this.btn_operate[3].sName="查看";
				}
				GmPlay.xani_nui3.DrawAnima(offx, offy, "小头像",mf.iImportant%100);
				this.pm3f.DrawTextEx(offx+42,offy+20, mf.sName, mf.bOnLine?0xffffffff:offlinecolor, this.iNameSize, 101, 1, 1, 0, 0, -2);
			}
			j=this.iF4Count;
			break;

		}
		this.iOy-=(this.iModifyY+this.iOffY);
		this.pm3f.NoClip();
		
		if(this.bSelected)
		{
			if(this.iSelectY>GmConfig.SCRH-this.iSBCount*51)this.iSelectY=GmConfig.SCRH-this.iSBCount*51;
			for(i=0;i<4;i++)
			{
//				if(this.iSectPoint==0 && i==3)break;
				if(i<this.iSBCount)
				{
					this.btn_operate[i].Move(this.iSelectX-80,this.iSelectY+i*51, 80, 51);
					this.btn_operate[i].Draw();
				}
				else this.btn_operate[i].Move(0,0,0,0);
				//查看，前往，攻击
				//发送，记录，分组，查看
				//分组
			}
		}

		this.iSelectCount=j;
		k=j*40-(this.iDy-this.iOy);
		if(k<0)k=0;
//		GmPlay.sop(""+(this.iDy-this.iOy));
		if(this.iDragDelay!=0)
		{
			this.iDragDelay=this.iDragDelay/2;
			if(this.iDragDelay>10 || this.iDragDelay<-10)this.iOffY+=this.iDragDelay;
			else this.iDragDelay=0;
		}
		else if(this.iOffY<-k)
		{
			i=(-k-this.iOffY)/2;
			if(i>10)this.iOffY+=i;
			else this.iOffY=-k;
		}
		else if(this.iOffY>0)
		{
			i=this.iOffY/2;
			if(i>10)this.iOffY-=i;
			else this.iOffY=0;
		}

		if(this.bDrag)
		{
			this.iDragTime++;
		}
	}
	Close()
	{
//		if(bOpen || this.bOpening)
		{
			this.bCloseing=true;
			this.bOpening=false;
//			this.iModifyX=this.iW;
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		var btn_chat;
		if(this.bShow)btn_chat=this.btn_chat1;
		else btn_chat=this.btn_chat0;
		
		if(!this.bShow)
		{
			if(btn_chat.ProcTouch(msg, x, y))
			{
				if(btn_chat.bCheck())
				{//打开好友列表
					if(this.bPrivateChatFlash)
					{//看其他人发来的私聊消息
						PrivateChatWatch.gi().ShowMessage();
					}
					else
					{
						if(FriendList.gi().bShow)
						{
							this.Close();
						}
						else
						{
							this.bShow=true;
							this.bCloseing=false;
							this.bOpening=true;
							this.iModifyX=0;
						}
					}
				}
				return true;
			}
			return false;
		}

		switch(msg)
		{
		case 2://移动，如果是锁定状态，看移动距离是否超过15像素，超过责进入拖动状态
			if(this.bLocked)
			{
				this.iDragY=y;
				this.iModifyY=this.iDragY-this.iLockY;
				///
				i=this.iOffY+this.iModifyY;
				if(i>0)
				{
					this.iModifyY-=i/2;
					this.iDragTime=10;
				}
				///
				j=this.iSelectCount*40-(this.iDy-this.iOy);
				if(j<0)j=0;
//				GmPlay.sop(""+(this.iDy-this.iOy));
				if(i<-j)
				{
					this.iModifyY-=(i+j)/2;
					this.iDragTime=10;
				}
				///
				if(this.iModifyY>15 || this.iModifyY<-15)
				{
					this.bDrag=true;
					this.iSelectPoint=-1;
					return true;
				}
			}
			break;
		case 3:
			this.bLocked=false;
			if(this.bDrag)
			{
				this.iOffY+=this.iModifyY;
				if(this.iDragTime<=0)this.iDragTime=1;
				if(this.iDragTime<5)this.iDragDelay=this.iModifyY*3/this.iDragTime;
				GmPlay.sop("this.iDragDelay="+this.iDragDelay);
				//this.iDragDelay=0;//惯性
				this.iModifyY=0;
				this.bDrag=false;
				return true;
			}
			break;
		}
		
		for(i=0;i<3;i++)
		{//大分页
			if(this.btn_section[i].ProcTouch(msg, x, y))
			{
				if(this.btn_section[i].bCheck())
				{
					if(this.iSectPoint==i)this.iSectPoint=10;
					else this.iSectPoint=i;
					this.iScrollOff=0;
					this.iOffY=0;
					this.iSelectPoint=-1;
				}
				return true;
			}
		}
		if(this.iSectPoint==1)
		{//密普临小分页
			for(i=0;i<3;i++)
			{
				if(this.btn_mpl[i].ProcTouch(msg, x, y))
				{
					if(this.btn_mpl[i].bCheck())
					{
						FriendList.iMplPoint=i;
					}
				}
			}
		}
		if(this.bSelected)
		{
			for(i=0;i<this.iSBCount;i++)
			{
				if(this.btn_operate[i].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[i].bCheck())
					{
						if(this.iSectPoint==0)
						{//查看，前往，攻击
							if(i==0)GmProtocol.gi().s_WatchOn(0, this.iSelectRid, 0, "");
							if(i==1)
							{
								if(this.iSectPoint==0)
								{
									if(MySell.gi().bSelling)
									{
										EasyMessage.easymsg.AddMessage("摆摊中不能行走");
									}
									else if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
									{//没队伍，或是队长，才能走
										if(MapManager.gi().mfy.findway(GmMe.me.iX,GmMe.me.iY,this.iGoX,this.iGoY))
										{
											GmPlay.sop("check again start");
											if(MapManager.gi().mfy.checkagain())
											{
												MapManager.gi().vbk.iGoToNpcFlag=-1;
												MapManager.gi().vbk.iGoToNpcId=-1;
												GmMe.me.start(MapManager.gi().mfy.iPath,MapManager.gi().mfy.iPathDeep);
											}
											else GmPlay.sop("check again end2");
										}
									}
								}
							}
							if(i==2)GmProtocol.gi().s_PK(this.iSelectRid);
						}
						if(this.iSectPoint==1)
						{//发送，记录，分组，查看
							if(i==0)PrivateChat_Send.OpenChat(this.iSelectRid,this.sSelectName,this.iSelectRax);
							if(i==1)PrivateChatRecord.OpenRecord(this.iSelectRid,this.sSelectName,this.iSelectRax);
							if(i==2)FriendTeam.Open(this.sSelectName, this.iSelectRid);//分组
							if(i==3)GmProtocol.gi().s_WatchOn(0, this.iSelectRid, 0, "");
						}
						if(this.iSectPoint==2)
						{//分组
							if(i==0)FriendTeam.Open(this.sSelectName, this.iSelectRid);
						}
						this.iSelectPoint=-1;
					}
					return true;
				}
			}
		}
		this.iSelectPoint=-1;
		if(XDefine.bInRect(x,y,this.iOx, this.iOy, this.iDx-this.iOx, this.iDy-this.iOy))
		{
			switch(msg)
			{
			case 1://按下，锁定当前位置
//			case 2:
				if(!this.bLocked)
				{
					this.bLocked=true;
					this.iLockY=y;
					this.iModifyY=0;
					this.iDragTime=0;
					this.iDragDelay=0;
				}
				break;
			}
//			this.iOy+=(this.iModifyY+this.iOffY);
			this.iSelectPoint=-1;
			for(i=0;i<this.iSelectCount;i++)
			{
				if(XDefine.bInRect(x, y, this.iOx, this.iOy+this.iOffY+i*40, this.iW-10,40))
				{
					this.iSelectPoint=i;
				}
			}
		}
		if(btn_chat.ProcTouch(msg, x, y))
		{
			if(btn_chat.bCheck())
			{//打开好友列表
				if(this.bPrivateChatFlash)
				{//看其他人发来的私聊消息
					PrivateChatWatch.gi().ShowMessage();
				}
				else
				{
					if(FriendList.gi().bShow)
					{
						this.Close();
					}
					else
					{
						this.bShow=true;
						this.bCloseing=false;
						this.bOpening=true;
						this.iModifyX=0;
					}
				}
			}
			return true;
		}
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW+10, this.iH+1))return true;
		return false;
	}
	 GetFreeFriendOle()
	{
		var i;
		for(i=0;i<FriendList.MAXFRIEND;i++)
		{
			if(!this.friends[i].bUseing)return this.friends[i];
		}
		return null;
	}
	FindFriend( rid)
	{
		var i;
		for(i=0;i<FriendList.MAXFRIEND;i++)
		{
			if(this.friends[i].bUseing && this.friends[i].iRid==rid)return this.friends[i];
		}
		return null;
	}
	Clean()
	{
		var i;
		for(i=0;i<FriendList.MAXFRIEND;i++)
		{
			this.friends[i].bUseing=false;
		}
		this.SortFriends();
	}
	 GetFriends( pls)
	{
		var rid;
		var stat;
		var mf;
		while(true)
		{
//			GmPlay.sop("1111111111");
			stat=pls.GetNextByte();
			if(stat==0)break;
			rid=pls.GetNextInt();
			mf=this.FindFriend(rid);
			if(mf==null)mf=this.GetFreeFriendOle();
			if(mf==null)break;
			
			if((stat&2)==0)mf.bOnLine=false;
			else mf.bOnLine=true;
			mf.iRid=rid;
			mf.sName=pls.GetNextString();
			
			mf.iRelation=pls.GetNextByte();
			mf.iAmity=pls.GetNextShort();
			mf.iTeam=pls.GetNextByte();//分组
			mf.iImportant=pls.GetNextByte();//头像

			mf.bUseing=true;
//			GmPlay.sop("2222222222="+mf.sName);
		}
		this.SortFriends();
	}
	
	//亲密，普通，临时，黑名单
	
	 SortFriends()
	{//
		var i;
		if(this.flist1==null)this.flist1=new Int32Array(FriendList.MAXFRIEND);
		if(this.flist2==null)this.flist2=new Int32Array(FriendList.MAXFRIEND);
		if(this.flist4==null)this.flist4=new Int32Array(FriendList.MAXFRIEND);
		
		this.iF1Count=0;
		this.iF2Count=0;
		this.iF4Count=0;
		
		for(i=0;i<FriendList.MAXFRIEND;i++)
		{
			if(this.friends[i].bUseing)
			{
				if(this.friends[i].iTeam==0 && this.friends[i].bOnLine)
				{
					this.flist1[this.iF1Count]=i;
					this.iF1Count++;
				}
				if(this.friends[i].iTeam==1 && this.friends[i].bOnLine)
				{
					this.flist2[this.iF2Count]=i;
					this.iF2Count++;
				}
				if(this.friends[i].iTeam==3 && this.friends[i].bOnLine)
				{
					this.flist4[this.iF4Count]=i;
					this.iF4Count++;
				}
			}
		}
		for(i=0;i<FriendList.MAXFRIEND;i++)
		{
			if(this.friends[i].bUseing)
			{
				if(this.friends[i].iTeam==0 && !this.friends[i].bOnLine)
				{
					this.flist1[this.iF1Count]=i;
					this.iF1Count++;
				}
				if(this.friends[i].iTeam==1 && !this.friends[i].bOnLine)
				{
					this.flist2[this.iF2Count]=i;
					this.iF2Count++;
				}
				if(this.friends[i].iTeam==3 && !this.friends[i].bOnLine)
				{
					this.flist4[this.iF4Count]=i;
					this.iF4Count++;
				}
			}
		}
	}
	DelTmpChat( rid)
	{
		var i,j;
		for(i=0;i<FriendList.MAXTEMPCHAT;i++)
		{
			if(this.tmpchat[i].iRid==rid)
			{//找到
				for(j=i;j<FriendList.MAXTEMPCHAT-1;j++)
				{
					this.tmpchat[j].iRid=this.tmpchat[j+1].iRid;
					this.tmpchat[j].sName=this.tmpchat[j+1].sName;
					this.tmpchat[j].iRax=this.tmpchat[j+1].iRax;
				}
				if(this.iF3Count>0)this.iF3Count--;
				return;
			}
		}
	}
	 AddTmpChat( rid, name, rax)
	{//添加临时好友，发送，接受对话时加入
		var i,j;
		//已有，提高到最前
		for(i=0;i<FriendList.MAXTEMPCHAT;i++)
		{
			if(this.tmpchat[i].iRid==rid)
			{//找到
				for(j=i;j>0;j--)
				{
					this.tmpchat[j].copyfrom(this.tmpchat[j-1]);
				}
				this.tmpchat[0].iRid=rid;
				this.tmpchat[0].sName=name;
				this.tmpchat[0].iRax=rax;
				return;
			}
		}
		//没有，加入到最前
		for(j=FriendList.MAXTEMPCHAT-1;j>0;j--)
		{
			this.tmpchat[j].copyfrom(this.tmpchat[j-1]);
		}
		this.tmpchat[0].iRid=rid;
		this.tmpchat[0].sName=name;
		this.tmpchat[0].iRax=rax;
		if(this.iF3Count<FriendList.MAXTEMPCHAT)this.iF3Count++;
	}
}

FriendList.MAXFRIEND=128;
FriendList.iMplPoint=0;
FriendList.MAXTEMPCHAT=16;
FriendList.btnstr=["附近","好友","黑名单"];
FriendList.flist=null;
FriendList.gi=function()
{
	if(FriendList.flist==null)FriendList.flist=new FriendList();
	return FriendList.flist;
}