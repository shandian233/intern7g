import PublicInterface from "../../../../../zero/Interface/PublicInterface"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XRecordFast from "../../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import SystemOperate from "../../../../../engtst/mgm/gameing/fast/SystemOperate"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"
    
import PrivateMessage from "./PrivateMessage"
import FriendList from "./FriendList"
import PrivateChat_Send from "./PrivateChat_Send"

export default class PrivateChatWatch {

	 constructor()
	{
		this.pm3f=M3DFast.gi();
		
		var i;
		this.pms=new Array(PrivateChatWatch.MAXMESSAGE);//
		for(i=0;i<PrivateChatWatch.MAXMESSAGE;i++)
		{
			this.pms[i]=new PrivateMessage();
		}
		this.iMessageCount=0;
		
		this.bShow=false;
		
		this.iW=550;
		this.iH=360;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2-50;
		
		this.btn_record=new XButtonEx2(GmPlay.xani_button);
		this.btn_record.Move(this.iX+this.iW-25-90,this.iY+25, 90, 60);
		this.btn_record.InitButton("发送聊天按钮");
		this.btn_record.sName="记录";
		
		this.btn_watch=new XButtonEx2(GmPlay.xani_button);
		this.btn_watch.Move(this.iX+this.iW-25-90-10-90,this.iY+25, 90, 60);
		this.btn_watch.InitButton("发送聊天按钮");
		this.btn_watch.sName="查看";
		
		this.btn_reply=new XButtonEx2(GmPlay.xani_button);
		this.btn_reply.Move(this.iX+this.iW-25-90,this.iY+this.iH-60-25, 90, 60);
		this.btn_reply.InitButton("发送聊天按钮");
		this.btn_reply.sName="回复";
	}
	GetPrivateMessage( pls)
	{
		var i;
		GmPlay.sop("aaaaaaaaaaaaaaaaa"+this.iMessageCount);
		if(this.iMessageCount>=PrivateChatWatch.MAXMESSAGE)this.iMessageCount=PrivateChatWatch.MAXMESSAGE-1;
		for(i=this.iMessageCount;i>0;i--)
		{
//			this.pms[i].copyfrom(this.pms[i-1]);
			this.pms[i]=this.pms[i-1];
		}
		this.pms[0]=new PrivateMessage();
		this.pms[0].iSession=pls.GetNextInt();
		this.pms[0].iRid=pls.GetNextInt();
		this.pms[0].sName=pls.GetNextString();
		this.pms[0].iRax=pls.GetNextByte();
		this.pms[0].iFlag=pls.GetNextByte();
		this.pms[0].iDRid=pls.GetNextInt();
		this.pms[0].sTime=pls.GetNextString();
		this.pms[0].sDetail=pls.GetNextString();
		this.pms[0].exts[0].type=3;//自己名字
		this.pms[0].exts[0].eid=this.pms[0].iRid;
		for(i=1;i<5;i++)
		{
			if(pls.iOffset>=pls.iLength)
			{
				this.pms[0].exts[i].type=100;
				continue;
			}
			this.pms[0].exts[i].type=pls.GetNextByte();
			switch(this.pms[0].exts[i].type)
			{
			case 0://物品
			case 1://宠物
			case 4://队伍
				this.pms[0].exts[i].eid=pls.GetNextInt();
				this.pms[0].exts[i].tid=pls.GetNextShort();
				break;
			case 2://语音
				this.pms[0].exts[i].eid=pls.GetNextInt();
				this.pms[0].exts[i].name=pls.GetNextString();
				this.pms[0].exts[i].detail=pls.GetNextString();
				break;
			}
		}

		if(this.pms[0].iRid==GmMe.me.iRid)
		{//自己的返回消息
			this.pms[0].bFriend=false;
			
			this.pms[0].bWatched=true;
			GmPlay.x_record.SavePrivateChat();
			GmPlay.sop("bbbbbbbbb");
		}
		else
		{
			if(FriendList.gi().FindFriend(this.pms[0].iRid)==null)this.pms[0].bFriend=false;
			else this.pms[0].bFriend=true;
			
			this.pms[0].bWatched=false;
			FriendList.gi().AddTmpChat(this.pms[0].iRid, this.pms[0].sName,this.pms[0].iRax);
			FriendList.gi().bPrivateChatFlash=true;//右下角好友图标开始闪烁
			GmPlay.sop("cccccccccccc");
		}
		
		this.iMessageCount++;
	}

	ShowMessage()
	{
		var i;
		for(i=this.iMessageCount-1;i>=0;i--)
		{
			if(this.pms[i].bWatched==false)break;
		}
		if(i>=0)
		{
//			XRecordFast.iPrivateChatMode=1;
			if(XRecordFast.iPrivateChatMode==0)
			{//简单模式
				this.showpms=this.pms[i];
				GmProtocol.gi().s_ReviewPrivateChat(this.pms[i].iSession);//发到服务器
				this.pms[i].bWatched=true;
				GmPlay.x_record.SavePrivateChat();
				this.bShow=true;
			}
			else
			{//直接打开发送框，并设置此名字的全为已读
				PrivateChat_Send.OpenChat(this.pms[i].iRid, this.pms[i].sName,this.pms[i].iRax);
			}
		}
	}
	bHaveUnWatched()
	{
		for(var i=0;i<this.iMessageCount;i++)
		{
			if(this.pms[i].bWatched==false)return true;
		}
		return false;
	}
	 Draw()
	{
		if(!this.bShow)return;
//		this.iW=400;
//		this.iH=240;
//		
//		this.iX=(GmConfig.SCRW-this.iW)/2;
//		this.iY=(GmConfig.SCRH-this.iH)/2;
		
//		this.btn_watch.Move(this.iX+20, this.iY+this.iH-60, 70, 40);
//		this.btn_reply.Move(this.iX+this.iW-70-20, this.iY+this.iH-40-20, 70, 40);
//		btn_close.Move(this.iX+this.iW-90, this.iY+10, 80, 50);
		
//		this.pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xff000000);
		var k=0;
		if(!this.showpms.bFriend)
		{//陌生人外框
			var i=GmPlay.iDelay%20;
			var j=i>=10?20-i:i;
			k=((j*25)<<24)|0xff0000;
			//if((GmPlay.iDelay/5%2)==0)
			M3DFast.gi().FillRect_2D(this.iX-10, this.iY-10, this.iX+this.iW+10, this.iY+this.iH+10, k);
			
		}
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		DrawMode.frame_type4("聊天显示框亮20_20",this.iX+25, this.iY+25+60+10, this.iW-50, this.iH-25-60-10-25-60-10,20,20);

		GmPlay.xani_head.DrawAnimaEx(this.iX+25, this.iY+25, "新头像"+this.showpms.iRax, 0,101,60.0/80,60.0/80,0,0,0);
		M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+25, "名字:"+this.showpms.sName, 0xff000000, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+25+35+5, "号码:"+this.showpms.iRid, 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		
		this.pm3f.DrawTextEx(this.iX+25, this.iY+this.iH-25-30, ""+this.showpms.sTime, 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		
		this.btn_record.Draw();
		this.btn_watch.Draw();
		this.btn_reply.Draw();
		
//		this.pm3f.DrawRect_2D(fx, fy, fx+fw, fy+fh, 0xffffffff);
		
		this.DrawPms(this.iX+25,this.iY+25+60+10);
//		FormatString.gi().FormatEx(this.showpms.sDetail, this.iW-50-30, 29,0,0,35);
//		FormatString.gi().Draw(this.iX+25+15, this.iY+25+55+10+10);
		
//		btn_close.Draw();
	}
	 DrawPms( offx, offy)
	{
		var k;
		var detail="#c176b51"+this.showpms.sDetail;
		for(k=1;k<5;k++)
		{
			switch(this.showpms.exts[k].type)
			{
			case 0://物品
				detail=FormatString.gi().InsertLocker(k, detail, "["+GmPlay.de_goods.strValue(this.showpms.exts[k].tid, 0, 4)+"]",GameData.EXTCOLOR,"#c00c000");
				break;
			case 1://宠物
				detail=FormatString.gi().InsertLocker(k, detail, "["+GmPlay.de_pet.strValue(this.showpms.exts[k].tid, 0, 1)+"]",GameData.EXTCOLOR,"#c00c000");
				break;
			case 2://语音
				detail=FormatString.gi().InsertLocker(k, detail, "[语音:"+this.showpms.exts[k].detail+"]",GameData.EXTCOLOR,"#c00c000");
				break;
			case 4://队伍
				detail=FormatString.gi().InsertLocker(k, detail, "[申请入队]",GameData.EXTCOLOR,"#c00c000");
				break;
			}
		}
		FormatString.gi().Format(detail, this.iW-50-30, SystemOperate.WordSize(24));
		FormatString.gi().CheckOutRect();
		for(k=1;k<5;k++)
		{
			switch(this.showpms.exts[k].type)
			{
			case 0://物品
			case 1://宠物
			case 2://语音
			case 3://人名
			case 4://队伍
				this.showpms.lrs_small[k].CopyFrom(FormatString.gi().lrs[k]);
				break;
			}
		}
		
		this.showpms.ox=offx+15;
		this.showpms.oy=offy+10;
		this.showpms.ow=FormatString.gi().iW;
		this.showpms.oh=FormatString.gi().iH;

		this.DrawSelect(offx+15, offy+10);
		FormatString.gi().Draw(offx+15, offy+10);
	}
	 DrawSelect( offx, offy)
	{
		var k;
		for(k=1;k<5;k++)
		{
			switch(this.showpms.exts[k].type)
			{
			case 0://物品
			case 1://宠物
			case 2://语音
				this.showpms.lrs_small[k].CopyFrom(FormatString.gi().lrs[k]);
				if(this.showpms.exts[k].iShowDelay>0)
				{
					for(var m=0;m<this.showpms.lrs_small[k].iCount;m++)
					{
						var xx1=offx+this.showpms.lrs_small[k].rs[m].iX;
						var yy1=offy+this.showpms.lrs_small[k].rs[m].iY;
						var xx2=offx+this.showpms.lrs_small[k].rs[m].iX+this.showpms.lrs_small[k].rs[m].iW;
						var yy2=offy+this.showpms.lrs_small[k].rs[m].iY+this.showpms.lrs_small[k].rs[m].iH;
						M3DFast.gi().FillRect_2D(xx1,yy1,xx2,yy2, 0xff00ff|(this.showpms.exts[k].iShowDelay<<24));
					}
					if(this.showpms.exts[k].iShowDelay>200)this.showpms.exts[k].iShowDelay-=3;
					else if(this.showpms.exts[k].iShowDelay>150)this.showpms.exts[k].iShowDelay-=6;
					else if(this.showpms.exts[k].iShowDelay>100)this.showpms.exts[k].iShowDelay-=9;
					else if(this.showpms.exts[k].iShowDelay>50)this.showpms.exts[k].iShowDelay-=12;
					else this.showpms.exts[k].iShowDelay=0;
				}
				break;
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		if(!this.bShow)return false;
		if(XDefine.bInRect(x, y, this.showpms.ox, this.showpms.oy, this.showpms.ow, this.showpms.oh))
		{
			for( j=1;j<5;j++)
			{
//				GmPlay.sop(""+this.pms[i].exts[j].type);
				if(this.showpms.exts[j].type>=100)continue;
				if(this.showpms.exts[j].iShowDelay>0)continue;
			
				if(this.showpms.lrs_small[j].bIn(x-this.showpms.ox, y-this.showpms.oy))
				{
					switch(this.showpms.exts[j].type)
					{
					case 0://物品
						GmProtocol.gi().s_WatchOn(1, this.showpms.exts[j].eid, 0,"");
						this.showpms.exts[j].iShowDelay=255;
//						EasyMessage.easymsg.AddMessage("正在获取["+this.pms[i].exts[j].name+"]信息");
						break;
					case 1://宠物
						GmProtocol.gi().s_WatchOn(2, this.showpms.exts[j].eid, 0,"");
						this.showpms.exts[j].iShowDelay=255;
//						EasyMessage.easymsg.AddMessage("正在获取["+this.pms[i].exts[j].name+"]信息");
						break;
					case 2://语音
						GmPlay.m_vi.PlayUrlVoice(this.showpms.exts[j].name);
						this.showpms.exts[j].iShowDelay=255;
//						EasyMessage.easymsg.AddMessage("正在播放[语音]信息");
						break;
//					case 3://自己
//						GmProtocol.gi().s_WatchOn(0, ps.pms[i].exts[j].eid, 0,"");
//						ps.pms[i].exts[j].iShowDelay=255;
//						EasyMessage.easymsg.AddMessage("正在获取["+this.pms[i].sName+"]信息");
//						break;
					case 4://队伍
						if(MyTeam.bInTeam())EasyMessage.easymsg.AddMessage("已有队伍");
						else GmProtocol.gi().s_TeamOperate(3,this.showpms.exts[j].eid,0);
						this.showpms.exts[j].iShowDelay=255;
						break;
					}
				}
			}
		}
		if(this.btn_watch.ProcTouch(msg, x, y))
		{
			if(this.btn_watch.bCheck())
			{
				GmProtocol.gi().s_WatchOn(0, this.showpms.iRid, 0,"");
			}
		}
		if(this.btn_record.ProcTouch(msg, x, y))
		{
			if(this.btn_record.bCheck())
			{
				XRecordFast.iPrivateChatMode=1;
				PrivateChat_Send.OpenChat(this.showpms.iRid, this.showpms.sName,this.showpms.iRax);
				this.bShow=false;
			}
		}
		if(this.btn_reply.ProcTouch(msg, x, y))
		{
			if(this.btn_reply.bCheck())
			{
				PrivateChat_Send.OpenChat(this.showpms.iRid, this.showpms.sName,this.showpms.iRax);
				this.bShow=false;
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			this.bShow=false;
		}
		return true;
//		return false;
	}
}

PrivateChatWatch.pp=null;
PrivateChatWatch.gi=function()
{
	if(PrivateChatWatch.pp==null)PrivateChatWatch.pp=new PrivateChatWatch();
	return PrivateChatWatch.pp;
}

PrivateChatWatch.MAXMESSAGE=1024;