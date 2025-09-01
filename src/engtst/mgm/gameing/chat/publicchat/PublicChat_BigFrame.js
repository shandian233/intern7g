import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"

import BaseClass from "../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../../engine/control/XCheckBox"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import SelectFace from "../../../../../engtst/mgm/gameing/chat/SelectFace"
import SystemOperate from "../../../../../engtst/mgm/gameing/fast/SystemOperate"
import MyGov from "../../../../../engtst/mgm/gameing/gov/MyGov"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"
import PublicChat_SmallFrame from "./PublicChat_SmallFrame"
import PublicInterface from "../../../../../zero/Interface/PublicInterface"

import PublicChat_Send from "./PublicChat_Send"
import SetChatValue from "./SetChatValue"

export default class PublicChat_BigFrame extends BaseClass{
	InitButton()
	{
		if(this.bInited)return;
		var i;
		this.btn_set=new XButtonEx2(GmPlay.xani_button);
		this.btn_set.InitButton("聊天设置");
		
		this.btn_face=new XButtonEx2(GmPlay.xani_button);
		this.btn_face.InitButton("发送表情");
		
		this.btn_send=new XButtonEx2(GmPlay.xani_button);
		this.btn_send.InitButton("发送聊天按钮");
		this.btn_send.sName="发送";
		
		this.in_words=new XInput(GmPlay.xani_ui);
		this.in_words.sDetail="";
		this.in_words.sBackPrompt="点击这里输入聊天信息";
		this.in_words.iBackSize=20;
		this.in_words.iTextSize=30;
		this.in_words.iTextColor=0xff176b51;
		
		this.btn_channel=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_channel[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_channel[i].InitButton("频道选择");
		}
		this.btn_channel[0].sName="全";
		this.btn_channel[1].sName="当";
		this.btn_channel[2].sName="队";
		this.btn_channel[3].sName="门";
		this.btn_channel[4].sName="帮";
		this.btn_channel[5].sName="世";
		this.btn_channel[6].sName="传";
		this.btn_channel[7].sName="系";
		
		this.btn_voice=new XButtonEx2(GmPlay.xani_button);
		this.btn_voice.InitButton("发送语音");
		
		this.btn_opensend=new XButtonEx2(GmPlay.xani_button);
		this.btn_opensend.InitButton("打开公聊输入框");
		
		this.btn_close=new XButtonEx2(GmPlay.xani_frame);
		this.btn_close.InitButton("聊天半屏关闭框45_106");
		
		this.bInited=true;
	}
	constructor( ani)
	{
		super();
		var i;
		///////////////////////////////////////////////////////////////////////
		this.chk_switch=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.chk_switch[i]=new XCheckBox(GmPlay.xani_nui3);
			this.chk_switch[i].InitBox("统一勾选");
			this.chk_switch[i].Move(this.iX+this.iW-25-50-60, this.iY+25+55*i, 50, 50);
			this.chk_switch[i].bTrue=true;
			if(i>0)this.chk_switch[i].bTrue=PublicChat_SmallFrame.gi().bMessageSwitch[i-1];
		}

		this.chk_switch[1].sDetail="当前";
		this.chk_switch[2].sDetail="队伍";
		this.chk_switch[3].sDetail="门派";
		this.chk_switch[4].sDetail="帮派";
		this.chk_switch[5].sDetail="世界";
		this.chk_switch[6].sDetail="传闻";

		this.bScrolling=false;

		this.iRecordDelay=0;
		this.iRecordStat=0;
		this.iVoiceChannelPoint=0;
		this.iRecordingShow=0;
	}
	 DrawSelect( offx, offy, pms)
	{
		var k;
		for(k=0;k<5;k++)
		{
			switch(pms.exts[k].type)
			{
			case 0://物品
			case 1://宠物
			case 2://语音
				pms.lrs_big[k].CopyFrom(FormatString.gi().lrs[k]);
				if(pms.exts[k].iShowDelay>0)
				{
					for(var m=0;m<pms.lrs_big[k].iCount;m++)
					{
						var xx1=offx+pms.lrs_big[k].rs[m].iX;
						var yy1=offy+pms.lrs_big[k].rs[m].iY;
						var xx2=offx+pms.lrs_big[k].rs[m].iX+pms.lrs_big[k].rs[m].iW;
						var yy2=offy+pms.lrs_big[k].rs[m].iY+pms.lrs_big[k].rs[m].iH;
						M3DFast.gi().FillRect_2D(xx1,yy1,xx2,yy2, 0xff00ff|(pms.exts[k].iShowDelay<<24));
					}
					if(pms.exts[k].iShowDelay>200)pms.exts[k].iShowDelay-=3;
					else if(pms.exts[k].iShowDelay>150)pms.exts[k].iShowDelay-=6;
					else if(pms.exts[k].iShowDelay>100)pms.exts[k].iShowDelay-=9;
					else if(pms.exts[k].iShowDelay>50)pms.exts[k].iShowDelay-=12;
					else pms.exts[k].iShowDelay=0;
				}
				break;
			}
		}
	}
	 DrawPms( offx, offy, ww, channel, pms)
	{
		var k;
		var ps=PublicChat_SmallFrame.gi();
		var detail="#c176b51"+pms.sMessage;
		for(k=1;k<5;k++)
		{
			switch(pms.exts[k].type)
			{
			case 0://物品
				detail=FormatString.gi().InsertLocker(k, detail, "["+GmPlay.de_goods.strValue(pms.exts[k].tid, 0, 4)+"]",GameData.EXTCOLOR,"#c00c000");
				break;
			case 1://宠物
				detail=FormatString.gi().InsertLocker(k, detail, "["+GmPlay.de_pet.strValue(pms.exts[k].tid, 0, 1)+"]",GameData.EXTCOLOR,"#c00c000");
				break;
			case 2://语音
				detail=FormatString.gi().InsertLocker(k, detail, "[语音:"+pms.exts[k].detail+"]",GameData.EXTCOLOR,"#c00c000");
				break;
			case 4://队伍
				detail=FormatString.gi().InsertLocker(k, detail, "[申请入队]",GameData.EXTCOLOR,"#c00c000");
				break;
			}
		}
		FormatString.gi().Format(detail, ww-90, SystemOperate.WordSize(24));
		FormatString.gi().CheckOutRect();
		for(k=0;k<5;k++)
		{
			switch(pms.exts[k].type)
			{
			case 0://物品
			case 1://宠物
			case 2://语音
			case 3://人名
			case 4://队伍
				pms.lrs_big[k].CopyFrom(FormatString.gi().lrs[k]);
				break;
			}
		}
		
		var th=FormatString.gi().iH+10+10+24;//本行高度=对话内容+10+10+24
		var dy=offy-th;
		
		//如果pms是自己，则在右侧
		if(pms.iRid==GmMe.me.iRid)
		{
			pms.ox=offx+ww-52-10-FormatString.gi().iW-10;
			pms.oy=dy+24+10;
			pms.ow=FormatString.gi().iW;
			pms.oh=FormatString.gi().iH;
			
			pms.headx=offx+ww-52;
			pms.heady=dy;
			
			GmPlay.xani_head.DrawAnimaEx(offx+ww-52, dy, "新头像"+pms.iRax, 0,101,52.0/80,52.0/80,0,0,0);
			GmPlay.xani_frame.DrawAnima(offx+ww-52-10-24, dy, "聊天频道框24_24",0);
			M3DFast.gi().DrawTextEx(offx+ww-52-10-24+12, dy+12, ps._CHANNELSHORT[channel], ps._CHANNELCOLORI[channel], 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(offx+ww-52-10-24-5, dy+12, pms.sName, 0xff176b51, 24, 101, 1, 1, 0, -3, -2);
			DrawMode.frame_type4("聊天内容框20_20", offx+ww-52-10-(FormatString.gi().iW+20), dy+24, FormatString.gi().iW+20, FormatString.gi().iH+20, 20, 20);
			GmPlay.xani_frame.DrawAnima(offx+ww-52-10, dy+24,"聊天内容框20_20",10);
			
			this.DrawSelect(offx+ww-52-10-FormatString.gi().iW-10, dy+24+10,pms);
			FormatString.gi().Draw(offx+ww-52-10-FormatString.gi().iW-10, dy+24+10);
		}
		else
		{
			pms.ox=offx+52+10+10;
			pms.oy=dy+24+10;
			pms.ow=FormatString.gi().iW;
			pms.oh=FormatString.gi().iH;
			
			pms.headx=offx;
			pms.heady=dy;

			GmPlay.xani_head.DrawAnimaEx(offx, dy, "新头像"+pms.iRax, 0,101,52.0/80,52.0/80,0,0,0);
			GmPlay.xani_frame.DrawAnima(offx+52+10, dy, "聊天频道框24_24",0);
			M3DFast.gi().DrawTextEx(offx+52+10+12, dy+12, ps._CHANNELSHORT[channel], ps._CHANNELCOLORI[channel], 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(offx+52+10+24+5, dy+12, pms.sName, 0xff176b51, 24, 101, 1, 1, 0, 0, -2);
			DrawMode.frame_type4("聊天内容框20_20", offx+52+10, dy+24, FormatString.gi().iW+20, FormatString.gi().iH+20, 20, 20);
			GmPlay.xani_frame.DrawAnima(offx+52+10, dy+24,"聊天内容框20_20",9);
			
			this.DrawSelect(offx+52+10+10, dy+24+10,pms);
			FormatString.gi().Draw(offx+52+10+10, dy+24+10);
		}
		return th;
	}
	 DrawPmsEx( offx, offy, ww, channel, pms)
	{//系统频道
		var ps=PublicChat_SmallFrame.gi();
		var detail=ps._CHANNELCOLORS[channel]+pms.sMessage;
		FormatString.gi().Format(detail, ww-60, SystemOperate.WordSize(24));
		var th=FormatString.gi().iH+10;//本行高度=对话内容+10+10
		var dy=offy-th;
		
		GmPlay.xani_frame.DrawAnima(offx, dy, "聊天频道框24_24",0);
		M3DFast.gi().DrawTextEx(offx+12, dy+12, ps._CHANNELSHORT[channel], ps._CHANNELCOLORI[channel], 20, 101, 1, 1, 0, -2, -2);
		FormatString.gi().Draw(offx+24+10, dy);

		return th;
	}
	DrawMessage( x, y, w, h)
	{
		x+=10;y+=10;w-=20;h-=20;
		this.iMx=x;this.iMy=y;this.iMw=w;this.iMh=h;
		var i,j;
		var iDy=y+h+this.iScrollY;
		var ps=PublicChat_SmallFrame.gi();
		
		for(i=0;i<ps.iMessageCount;i++)ps.pms[i].ox=-1;
		
		M3DFast.gi().SetViewClip(x, y, x+w, y+h);

		for(i=0;i<ps.iMessageCount;i++)
		{
			if(this.iChannelPoint==1 && ps.pms[i].channel!=0)continue;
			else if(this.iChannelPoint==2 && ps.pms[i].channel!=1)continue;
			else if(this.iChannelPoint==3 && ps.pms[i].channel!=2)continue;
			else if(this.iChannelPoint==4 && ps.pms[i].channel!=3)continue;
			else if(this.iChannelPoint==5 && ps.pms[i].channel!=4 && ps.pms[i].channel!=50)continue;
			else if(this.iChannelPoint==6 && ps.pms[i].channel!=5)continue;
			else if(this.iChannelPoint==7 && ps.pms[i].channel!=6 && ps.pms[i].channel!=7)continue;

			if(ps.pms[i].channel==0)j=0;//当前
			else if(ps.pms[i].channel==1)j=1;//队伍
			else if(ps.pms[i].channel==2)j=2;//门派
			else if(ps.pms[i].channel==3)j=3;//帮派
			else if(ps.pms[i].channel==4 || ps.pms[i].channel==50)j=4;//世界，喇叭
			else if(ps.pms[i].channel==5)j=5;//传闻
			else if(ps.pms[i].channel==6)j=6;//系统
			else if(ps.pms[i].channel==7)j=7;//副本
			else continue;
//			j=this.iChannelPoint-1;
			if(j<=5)
			{//当前，队伍，门派，帮派，世界,传闻
				iDy-=this.DrawPms(x,iDy,w,j,ps.pms[i])+5;
			}
			else
			{//系统
				iDy-=this.DrawPmsEx(x,iDy,w,j,ps.pms[i])+5;
			}
			if(iDy<=y)break;
		}
		if(i<PublicChat_SmallFrame.gi().iMessageCount)this.bCanScroll=true;
		else this.bCanScroll=false;
		M3DFast.gi().NoClip();
	}
	Draw()
	{
		if(!this.bShow)return;

		this.InitButton();
		var i;
		var offx,offy;
		
		if(this.bOpening)
		{
			if(this.iX<0-this.iW/5)this.iX+=this.iW/5;
			else
			{
				this.iX=PublicInterface.gi().iLHX;
				this.bOpening=false;
			}
		}
		else if(this.bCloseing)
		{
			if(this.iX>-this.iW)this.iX-=this.iW/5;
			else
			{
				this.iX=-this.iW;
				this.bCloseing=false;
				this.bShow=false;
				return;
			}
		}
		
		this.btn_close.Move(this.iX+this.iW, this.iY+GmConfig.SCRH/2-106/2, 45, 106);
		this.btn_close.Draw();

		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		
		offx=this.iX+15;
		offy=this.iY+15;
		this.btn_set.Move(offx,offy, 64, 65);
		this.btn_set.Draw();
		
		offx+=64+5;
		this.in_words.Move(offx,offy+9, 235, 47);
		DrawMode.frame_type1("输入框a20_47",this.in_words.iX,this.in_words.iY,this.in_words.iW,20);
		this.in_words.DrawText();
		this.in_words.onscr();
		
		offx+=235+5;
		this.btn_face.Move(offx, offy, 64, 65);
		this.btn_face.Draw();
		
		offx+=64+5;
		this.btn_send.Move(offx, offy+2, 90, 60);
		this.btn_send.Draw();
		
		offx=this.iX+15;
		offy+=64+5;
		for(i=0;i<8;i++)
		{
			this.btn_channel[i].Move(offx+2, offy+i*60, 60, 60);
			this.btn_channel[i].Draw();
		}
		
		var ww=400;
		var hh=this.iH-15-15-64-5;
		DrawMode.frame_type4("聊天显示框暗20_20",offx+64+5, offy, ww,hh,20,20);
		this.DrawMessage(offx+64+5,offy,ww,hh);//聊天内容
		
		this.btn_opensend.Move(this.iX+15, this.iY+this.iH-15-65, 64, 65);
		this.btn_opensend.Draw();
		
		this.btn_voice.Move(this.iX+15, this.iY+this.iH-15-65-5-65, 64, 65);
		this.btn_voice.Draw();
		
		for(i=0;i<8;i++)
		{
			if(this.iChannelPoint==i)
			{
				this.btn_channel[i].bMouseIn=true;
				this.btn_channel[i].bMouseDown=true;
			}
			this.btn_channel[i].Draw();
		}
		
		if(this.bSelectFace)SelectFace.gi().Draw();
		
		switch(this.iRecordStat)
		{
		case 0://开始录音
			break;
		case 1://录音中
			DrawMode.frame_type4("语音输入背景20_20", GmConfig.SCRW/2-120, GmConfig.SCRH/2-120, 240, 240+35+30, 20, 20);
			DrawMode.frame_type1("语音输入字底框20_35", GmConfig.SCRW/2-100, GmConfig.SCRH/2+100+20, 200, 20);
			var xx=GmConfig.SCRW/2-100;
			var yy=GmConfig.SCRH/2+100+20;
			M3DFast.gi().FillRect_2D(xx, yy, xx+200*(GameData.VOICETIMEOUT-this.iRecordDelay)/GameData.VOICETIMEOUT, yy+35, 0x30ffffff);
			if(this.iRecordingShow==1)
			{
				GmPlay.xani_other.DrawAnima(GmConfig.SCRW/2-100, GmConfig.SCRH/2-100, "录音中",0);
				M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, GmConfig.SCRH/2+100+20+35/2, "手指划开，取消录制", 0xffffffff, 18, 101, 1, 1, 0, -2, -2);
			}
			else if(this.iRecordingShow==2)
			{
				GmPlay.xani_other.DrawAnima(GmConfig.SCRW/2-100, GmConfig.SCRH/2-100, "移开手指",0);
				M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, GmConfig.SCRH/2+100+20+35/2, "手指划开，取消发送", 0xffffffff, 18, 101, 1, 1, 0, -2, -2);
			}
			break;
		case 2://开始上传
			if(GmPlay.m_vi.sRecordName!="empty")
			{
				this.iRecordDelay=GameData.VOICETIMEOUT;
				GmPlay.m_vi.UpLoad();
				this.iRecordStat=3;
			}
			break;
		case 3://等待上传完
			if(GmPlay.m_vi.sUrlName!="empty")
			{
				this.iRecordDelay=GameData.VOICETIMEOUT;
				GmPlay.m_vi.StartRecognize();
				this.iRecordStat=4;
			}
			break;
		case 4://等待翻译完
			if(GmPlay.m_vi.sRecognizeResult!="empty")
			{//上传完 并 翻译完
				if(GmPlay.m_vi.iRecordTime<=1000)
				{
					EasyMessage.easymsg.AddMessage("录音时间太短");
					this.iRecordStat=0;
					break;
				}
				PublicChat_Send.ClearCext();
				
				PublicChat_Send.cext[3].type=2;
				PublicChat_Send.cext[3].eid=GmPlay.m_vi.iRecordTime;
				PublicChat_Send.cext[3].name=GmPlay.m_vi.sUrlName;
				PublicChat_Send.cext[3].detail=GmPlay.m_vi.sRecognizeResult;
				this.iRecordStat=0;

				GmProtocol.gi().s_PublicChat(this.iVoiceChannelPoint,GameData.EXTCOLOR+"[语音:"+PublicChat_Send.cext[3].detail+"]#o");
			}
			break;
		}
		if(this.iRecordStat>0)
		{
			this.iRecordDelay--;
			if(this.iRecordDelay<=0)
			{
				this.iRecordStat=0;
				GmPlay.m_vi.StopRecord();
				EasyMessage.easymsg.AddMessage("录音超时取消");
			}
		}
	}


	ProcTouch( msg, x, y)
	{
		if(!this.bShow)return false;
		var i,j;
		if(this.bSelectFace)
		{
			if(SelectFace.gi().ProcTouch(msg, x, y))
			{
				if(SelectFace.gi().iSelectStat!=0)
				{
					if(SelectFace.gi().iSelectStat==1)this.in_words.sDetail+="#f"+SelectFace.gi().iSelectPoint;
					this.bSelectFace=false;
				}
			}
			return true;
		}
		if(this.btn_close.bMouseDown)
		{
			if(msg==2)
			{//左右
				this.iX-=(this.iLockX-x);
				this.iLockX=x;
				if(this.iX>0)this.iX=0;
			}
			else if(msg==3)
			{
				if(Math.abs(this.iLockX_old-x)<10)this.bCloseing=true;
				else if(this.iX<-this.iW/2)this.bCloseing=true;
				else this.bOpening=true;
				this.btn_close.bMouseDown=false;
				this.btn_close.iAnimaStat=11;
			}
			return true;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bMouseDown)
			{
				this.iLockX=x;
				this.iLockX_old=x;
			}
			if(this.btn_close.bCheck())
			{
				this.bCloseing=true;
			}
			return true;
		}
		if(this.btn_opensend.ProcTouch(msg, x, y))
		{
			if(this.btn_opensend.bCheck())
			{
				PublicChat_Send.Open();
				PublicChat_Send.iChannelPoint=this.iChannelPoint-1;
			}
			return true;
		}

		for(i=0;i<8;i++)
		{
			if(this.btn_channel[i].ProcTouch(msg, x, y))
			{
				if(this.btn_channel[i].bCheck())
				{
					if(this.iChannelPoint!=i)
					{
						this.iChannelPoint=i;
						this.iScrollY=0;
					}
				}
			}
		}

		if(XDefine.bInRect(x, y, this.btn_voice.iX, this.btn_voice.iY, this.btn_voice.iW, this.btn_voice.iH))
		{
			if(msg==1)
			{//按下，开始录音
				if(this.iChannelPoint==0)EasyMessage.easymsg.AddMessage("不能在全部频道发言");
				else if(this.iChannelPoint==7)EasyMessage.easymsg.AddMessage("不能在系统频道发言");
				else if(this.iChannelPoint==2 && MyTeam.bNoTeam())EasyMessage.easymsg.AddMessage("还未组队");
				else if(this.iChannelPoint==3 && GmMe.me.rbs.iSchoolId<=0)EasyMessage.easymsg.AddMessage("还未加入门派");
				else if(this.iChannelPoint==4 && MyGov.mg.iRealGid<=0)EasyMessage.easymsg.AddMessage("还未加入帮派");
				else if(this.iRecordStat==0)
				{//暂停背景音乐
					if(GmPlay.m_vi.StartRecord())
					{
						this.iRecordStat=1;
						this.iRecordDelay=GameData.VOICETIMEOUT;
					}
					else
					{
						EasyMessage.easymsg.AddMessage("启动录音失败");
						return true;
					}
					this.iVoiceChannelPoint=this.iChannelPoint-1;
				}
			}
			else if(msg==3)
			{//放开手指，发送录音
				if(this.iRecordStat==1)
				{
					GmPlay.m_vi.StopRecord();
					this.iRecordStat=2;
				}
			}
			this.iRecordingShow=1;
			return true;
		}
		else if(this.iRecordStat==1)
		{//手指移出按钮
			if(msg==3)
			{//取消录音
				GmPlay.m_vi.StopRecord();
				this.iRecordStat=0;
			}
			this.iRecordingShow=2;
			return true;
		}
		this.iRecordingShow=0;
		if(msg==3)
		{
			var ps=PublicChat_SmallFrame.gi();
			for(i=0;i<ps.iMessageCount;i++)
			{
//				GmPlay.sop(""+pms[i].ox+""+pms[i].oy);
				if(ps.pms[i].ox==-1)continue;
				if(XDefine.bInRect(x, y, ps.pms[i].headx, ps.pms[i].heady, 52, 52))
				{
					if(ps.pms[i].iRid>1000)GmProtocol.gi().s_WatchOn(0, ps.pms[i].iRid, 0,"");
				}
				if(!XDefine.bInRect(x, y, ps.pms[i].ox, ps.pms[i].oy, ps.pms[i].ow, ps.pms[i].oh))continue;
				for(j=1;j<5;j++)
				{
//					GmPlay.sop(""+pms[i].exts[j].type);
					if(ps.pms[i].exts[j].type>=100)continue;
					if(ps.pms[i].exts[j].iShowDelay>0)continue;
				
					if(ps.pms[i].lrs_big[j].bIn(x-ps.pms[i].ox, y-ps.pms[i].oy))
					{
						switch(ps.pms[i].exts[j].type)
						{
						case 0://物品
							GmProtocol.gi().s_WatchOn(1, ps.pms[i].exts[j].eid, 0,"");
							ps.pms[i].exts[j].iShowDelay=255;
//							EasyMessage.easymsg.AddMessage("正在获取["+pms[i].exts[j].name+"]信息");
							break;
						case 1://宠物
							GmProtocol.gi().s_WatchOn(2, ps.pms[i].exts[j].eid, 0,"");
							ps.pms[i].exts[j].iShowDelay=255;
//							EasyMessage.easymsg.AddMessage("正在获取["+pms[i].exts[j].name+"]信息");
							break;
						case 2://语音
							GmPlay.m_vi.PlayUrlVoice(ps.pms[i].exts[j].name);
							ps.pms[i].exts[j].iShowDelay=255;
//							EasyMessage.easymsg.AddMessage("正在播放[语音]信息");
							break;
//						case 3://自己
//							GmProtocol.gi().s_WatchOn(0, ps.pms[i].exts[j].eid, 0,"");
//							ps.pms[i].exts[j].iShowDelay=255;
//							EasyMessage.easymsg.AddMessage("正在获取["+pms[i].sName+"]信息");
//							break;
						case 4://队伍
							if(MyTeam.bInTeam())EasyMessage.easymsg.AddMessage("已有队伍");
							else GmProtocol.gi().s_TeamOperate(3,ps.pms[i].exts[j].eid,0);
							ps.pms[i].exts[j].iShowDelay=255;
							break;
						}
					}
				}
			}
		}
		
		if(this.btn_send.ProcTouch(msg,x,y))
		{
			if(this.btn_send.bCheck())
			{
				if(this.iChannelPoint==0)EasyMessage.easymsg.AddMessage("不能在全部频道发言");
				else if(this.iChannelPoint==7)EasyMessage.easymsg.AddMessage("不能在系统频道发言");
				else if(this.in_words.sDetail.length>100)
				{
					EasyMessage.easymsg.AddMessage("文字太长");
					this.in_words.sDetail="";
				}
				else if(this.in_words.sDetail.length>0)
				{
					PublicChat_Send.ClearCext();
					GmProtocol.gi().s_PublicChat(this.iChannelPoint-1,this.in_words.sDetail);
					
					this.in_words.sDetail="";
				}
				else EasyMessage.easymsg.AddMessage("请先输入文字");
			}
		}
		if(this.btn_face.ProcTouch(msg, x, y))
		{
			if(this.btn_face.bCheck())
			{
				this.bSelectFace=true;
				SelectFace.gi().Init();
			}
			return true;
		}
		if(this.in_words.ProcTouch(msg, x, y))return true;
		if(this.btn_set.ProcTouch(msg, x, y))
		{
			if(this.btn_set.bCheck())
			{
				SetChatValue.Open();
			}
			return true;
		}
		
		if(XDefine.bInRect(x,y,this.iMx,this.iMy,this.iMw,this.iMh) && msg==1)
		{
			this.bScrolling=true;
			this.iLockY=y;
		}
		if(this.bScrolling)
		{
			if(msg==2)
			{
				if(y>this.iLockY)
				{//往前翻
					if(this.bCanScroll)this.iScrollY+=(y-this.iLockY);
				}
				else this.iScrollY+=(y-this.iLockY);
				
				if(this.iScrollY<0)this.iScrollY=0;
				this.iLockY=y;
			}
			if(msg==3)this.bScrolling=false;
		}
		if(XDefine.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))return true;
		return false;
	}
}

PublicChat_BigFrame.bg=null;
PublicChat_BigFrame.gi=function()
{
	if(PublicChat_BigFrame.bg==null)PublicChat_BigFrame.bg=new PublicChat_BigFrame(null);
	return PublicChat_BigFrame.bg;
}
	
PublicChat_BigFrame.Open=function()
{
	var bg=PublicChat_BigFrame.gi();
//		XStat.gi().PushStat(XStat.GS_FULLCHATFRAME);
    bg.iW=500;
    bg.iH=GmConfig.SCRH;
    
    bg.iX=-bg.iW;
    bg.iY=0;
    
    bg.bShow=true;
    bg.bOpening=true;
//		bg.iChannelPoint=0;//指向当前频道
    bg.iScrollY=0;
    
    bg.InitButton();
    for(var i=0;i<8;i++)bg.btn_channel[i].SetNormal();
    
    bg.bSelectFace=false;
}