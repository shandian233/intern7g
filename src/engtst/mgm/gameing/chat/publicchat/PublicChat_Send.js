import GameVersion from "../../../../../zero/Interface/GameVersion"
import PublicInterface from "../../../../../zero/Interface/PublicInterface"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import SelectColor from "../../../../../engtst/mgm/gameing/chat/SelectColor"
import SelectFace from "../../../../../engtst/mgm/gameing/chat/SelectFace"
import SelectGoods from "../../../../../engtst/mgm/gameing/chat/SelectGoods"
import SelectPet from "../../../../../engtst/mgm/gameing/chat/SelectPet"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import Pets from "../../../../../engtst/mgm/gameing/me/pet/Pets"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"
import TeamCreate from "../../../../../engtst/mgm/gameing/me/team/TeamCreate"

import _EXTDATA from "./_EXTDATA"

export default class PublicChat_Send extends BaseClass{
//公聊发送框
	constructor( ani)
	{
		super();
		var i;
		
		this.iW=560+50-20;
		this.iH=360;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2-50;
//		this.iY=0;
		
		this.btn_channel=new Array(7);//
		for(i=0;i<7;i++)
		{
			this.btn_channel[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_channel[i].Move(this.iX+25+i*80,this.iY+25, 60, 60);
			this.btn_channel[i].InitButton("频道选择");
		}
		this.btn_channel[0].sName="当";
		this.btn_channel[1].sName="队";
		this.btn_channel[2].sName="门";
		this.btn_channel[3].sName="帮";
		this.btn_channel[4].sName="世";
		this.btn_channel[5].sName="传";
		this.btn_channel[6].sName="叭";
//		btn_close=new XButton(GmPlay.xani_ui);
//		btn_close.Move(this.iX+this.iW-60,this.iY, 60, 60);
//		btn_close.InitButton("统一关闭按钮");
		
		this.bSelectColor=false;
		this.bSelectFace=false;
		
		i=75;
		
		this.btn_voice=new XButtonEx2(GmPlay.xani_button);
		this.btn_voice.Move(this.iX+25,this.iY+this.iH-25-65, 64, 65);
		this.btn_voice.InitButton("发送语音");
		
		// this.btn_color=new XButtonEx2(GmPlay.xani_button);
		// this.btn_color.Move(this.iX+25+i,this.iY+this.iH-25-65, 64, 65);
		// this.btn_color.InitButton("发送颜色");
		
		this.btn_face=new XButtonEx2(GmPlay.xani_button);
		this.btn_face.Move(this.iX+25+i+i,this.iY+this.iH-25-65, 64, 65);
		this.btn_face.InitButton("发送表情");

		this.btn_goods=new XButtonEx2(GmPlay.xani_button);
		this.btn_goods.Move(this.iX+25+i+i+i,this.iY+this.iH-25-65, 64, 65);
		this.btn_goods.InitButton("发送物品");
		
		this.btn_pet=new XButtonEx2(GmPlay.xani_button);
		this.btn_pet.Move(this.iX+25+i+i+i+i,this.iY+this.iH-25-65, 64, 65);
		this.btn_pet.InitButton("发送宠物");
		
		this.btn_team=new XButtonEx2(GmPlay.xani_button);
		this.btn_team.Move(this.iX+25+i*5,this.iY+this.iH-25-65, 64, 65);
		this.btn_team.InitButton("发送队伍");

		this.btn_send=new XButtonEx2(GmPlay.xani_button);
		this.btn_send.Move(this.iX+this.iW-90-25,this.iY+this.iH-25-65+2, 90, 60);
		this.btn_send.InitButton("发送聊天按钮");
		this.btn_send.sName="发送";
		
//		btn_close=new XButtonEx1(GmPlay.xani_nui2);
//		btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
//		btn_close.InitButton("关闭按钮");
//		btn_close.sName="发送";
		
//		if(PublicChat_Send.in_speak==null)
		{
			PublicChat_Send.in_speak=new XInput(GmPlay.xani_nui3);
			PublicChat_Send.in_speak.Move(this.iX+25, this.iY+25+60+10, this.iW-50, this.iH-25-65-10-25-60-10);
			PublicChat_Send.in_speak.bHideText=true;
		}
		if(PublicChat_Send.bOpenInput)PublicChat_Send.in_speak.OpenInput();
		PublicChat_Send.bOpenInput=true;
		
//		this.iCurrentColor=SelectColor.sc.iColor;
		this.iCurrentColor=0xffffff;

		if(PublicChat_Send.cext==null)
		{
			PublicChat_Send.cext=new Array(5);//
			for(i=0;i<5;i++)PublicChat_Send.cext[i]=new _EXTDATA();
			PublicChat_Send.ClearCext();
		}

		this.iRecordDelay=0;
		this.iRecordStat=0;
		this.iRecordingShow=0;
		 this.bSend=false;
	}

	Draw()
	{
		if(PublicChat_Send.iChannelPoint<0)PublicChat_Send.iChannelPoint=0;
		if(PublicChat_Send.iChannelPoint>6)PublicChat_Send.iChannelPoint=6;
		var i;
		var s;
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		DrawMode.frame_type4("聊天显示框亮20_20",PublicChat_Send.in_speak.iX, PublicChat_Send.in_speak.iY, PublicChat_Send.in_speak.iW, PublicChat_Send.in_speak.iH,20,20);
		
//		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, this.iH);
//		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
//		DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH, "公聊");
//		DrawMode.Frame1_BR(this.iX+20, this.iY+70, this.iW-40, this.iH-70-80);
//		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20, "公聊", 0xff000000, 40, 101, 1, 1, 0, 0, 0);
		for(i=0;i<7;i++)
		{
			if(PublicChat_Send.iChannelPoint==i)
			{
				this.btn_channel[i].bMouseIn=true;
				this.btn_channel[i].bMouseDown=true;
			}
			this.btn_channel[i].Draw();
		}
		PublicChat_Send.in_speak.onscr();
//		PublicChat_Send.in_speak.Draw();
		
		s="#c176b51"+PublicChat_Send.in_speak.sDetail;
		for(i=0;i<4;i++)
		{
			if(PublicChat_Send.cext[i].type>=100)continue;
			if(s.indexOf("#x"+(i+1))>=0)
			{
				if(i==3)
				{//语音
					s=s.replace("#x"+(i+1), "#c00c000[语音:"+PublicChat_Send.cext[i].detail+"]#o");
				}
				else s=s.replace("#x"+(i+1), "#c00c000["+PublicChat_Send.cext[i].name+"]#o");
			}
			else PublicChat_Send.cext[i].type=100;
		}
//		s="a bc def";
//		s=s.replace("bc", "def");
//		GmPlay.sop1(""+s);
		FormatString.gi().FormatEx(s, PublicChat_Send.in_speak.iW-30, 29,0,0,35);//"#c000000"+
		FormatString.gi().Draw(PublicChat_Send.in_speak.iX+15, PublicChat_Send.in_speak.iY+10);

//		btn_close.Draw();
		
		this.btn_voice.Draw();
		// if(this.iCurrentColor==0xffffff)this.btn_color.Draw();
		// else M3DFast.gi().FillRect_2D(this.btn_color.iX, this.btn_color.iY, this.btn_color.iX+this.btn_color.iW, this.btn_color.iY+this.btn_color.iH, 0xff000000|this.iCurrentColor);
		this.btn_face.Draw();
		this.btn_goods.Draw();
		this.btn_pet.Draw();
		this.btn_team.Draw();
		
		this.btn_send.Draw();

		// if(this.bSelectColor)SelectColor.sc.Draw();
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
				if(GmPlay.m_vi.iRecordTime<=1000)
				{
					EasyMessage.easymsg.AddMessage("录音时间太短");
					this.iRecordStat=0;
					break;
				}
				this.iRecordDelay=GameData.VOICETIMEOUT;
				PublicChat_Send.cext[3].type=2;
				PublicChat_Send.cext[3].eid=GmPlay.m_vi.iRecordTime;
				if(PublicChat_Send.in_speak.sDetail.indexOf("#x4")==-1)
				{
					PublicChat_Send.in_speak.sDetail+="#x4";
					PublicChat_Send.in_speak.OpenInput();
				}
				PublicChat_Send.cext[3].name="";
				PublicChat_Send.cext[3].detail="";
				
				GmPlay.m_vi.UpLoad();
				this.iRecordStat=3;
			}
			break;
		case 3://等待上传完
			if(GmPlay.m_vi.sUrlName!="empty")
			{
				this.iRecordDelay=GameData.VOICETIMEOUT;
				PublicChat_Send.cext[3].name=GmPlay.m_vi.sUrlName;
				
				GmPlay.m_vi.StartRecognize();
				this.iRecordStat=4;
			}
			break;
		case 4://等待翻译完
			if(GmPlay.m_vi.sRecognizeResult!="empty")
			{//上传完 并 翻译完
				PublicChat_Send.cext[3].detail=GmPlay.m_vi.sRecognizeResult;
				
				this.iRecordStat=0;
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
		if(this.bSend)
		{
			if(this.iRecordStat==0)
			{
				this.bSend=false;
				this.SendMessage();
			}
		}
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(this.bSelectFace)
		{
			if(SelectFace.gi().ProcTouch(msg, x, y))
			{
				if(SelectFace.gi().iSelectStat!=0)
				{
					if(SelectFace.gi().iSelectStat==1)
					{
						PublicChat_Send.in_speak.sDetail+="#f"+SelectFace.gi().iSelectPoint;
						PublicChat_Send.in_speak.OpenInput();
					}
					this.bSelectFace=false;
				}
			}
			return true;
		}
		if(this.bSelectColor)
		{
			if(SelectColor.sc.ProcTouch(msg, x, y))
			{
				if(SelectColor.sc.iSelectStat!=0)
				{
					if(SelectColor.sc.iSelectStat==1)
					{//选择了颜色
						PublicChat_Send.in_speak.sDetail+="#c"+SelectColor.sc.tostr();
						PublicChat_Send.in_speak.OpenInput();
						this.iCurrentColor=SelectColor.sc.iColor;
					}
					this.bSelectColor=false;
				}
			}
			return true;
		}
// 		if(this.btn_color.ProcTouch(msg, x, y))
// 		{
// 			if(this.btn_color.bCheck())
// 			{
// 				this.bSelectColor=true;
// 				SelectColor.sc.Init(-1);
// //				PublicChat_Send.in_speak.sDetail+="#cff0000";
// 			}
// 			return true;
// 		}
		if(this.btn_face.ProcTouch(msg, x, y))
		{
			if(this.btn_face.bCheck())
			{
				this.bSelectFace=true;
				SelectFace.gi().Init();
			}
			return true;
		}
		if(this.btn_goods.ProcTouch(msg, x, y))
		{
			if(this.btn_goods.bCheck())
			{
				SelectGoods.Open(0);
			}
			return true;
		}
		if(this.btn_pet.ProcTouch(msg, x, y))
		{
			if(this.btn_pet.bCheck())
			{
				SelectPet.Open(0);
			}
			return true;
		}
		if(this.btn_team.ProcTouch(msg, x, y))
		{
			if(this.btn_team.bCheck())
			{
				PublicChat_Send.AddTeam();
			}
			return true;
		}
		if(XDefine.bInRect(x, y, this.btn_voice.iX, this.btn_voice.iY, this.btn_voice.iW, this.btn_voice.iH))
		{
			if(msg==1)
			{//按下，开始录音
				if(this.iRecordStat==0)
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

		for(i=0;i<7;i++)
		{
			if(this.btn_channel[i].ProcTouch(msg, x, y))
			{
				if(this.btn_channel[i].bCheck())
				{
//					if(i==5)EasyMessage.easymsg.AddMessage("传闻频道每次发送花费2000铜币");
					if(i==6)
					{
						if(MyGoods.bHaveGoods(122, 1))PublicChat_Send.iChannelPoint=i;
						else EasyMessage.easymsg.AddMessage("背包中没有小喇叭");
					}
					else PublicChat_Send.iChannelPoint=i;
				}
			}
		}
		if(PublicChat_Send.in_speak.ProcTouch(msg, x, y))
		{
		}
		if(this.btn_send.ProcTouch(msg, x, y))
		{
			if(this.btn_send.bCheck())
			{
				this.bSend=true;
				if(this.iRecordStat!=0)EasyMessage.easymsg.AddMessage("正在处理中，请稍后...");
			}
			return true;
		}
//		if(btn_close.ProcTouch(msg, x, y))
//		{
//			if(btn_close.bCheck())
//			{
//				XStat.gi().PopStat(1);
//			}
//		}
		if(XDefine.bOnRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		else if(msg==3)XStat.gi().PopStat(1);
		return false;
	}

	 SendMessage()
	{
		var i;
		if(PublicChat_Send.in_speak.sDetail.length>100)
		{
			EasyMessage.easymsg.AddMessage("文字太长");
			PublicChat_Send.in_speak.sDetail="";
		}
		else if(PublicChat_Send.in_speak.sDetail.length>0)
		{
			var s=PublicChat_Send.in_speak.sDetail;
			for(i=0;i<4;i++)
			{
				if(PublicChat_Send.cext[i].type>=100)continue;
				if(s.indexOf("#x"+(i+1))>=0)
				{
					if(i==3)
					{//语音
						s=s.replace("#x"+(i+1), GameData.EXTCOLOR+"[语音:"+PublicChat_Send.cext[i].detail+"]#o");
					}
					else s=s.replace("#x"+(i+1), GameData.EXTCOLOR+"["+PublicChat_Send.cext[i].name+"]#o");
				}
				else PublicChat_Send.cext[i].type=100;
			}
			GmProtocol.gi().s_PublicChat(PublicChat_Send.iChannelPoint,s);
			
			PublicChat_Send.in_speak.sDetail="";
			PublicChat_Send.ClearCext();
			XStat.gi().PopStat(1);
		}
		else EasyMessage.easymsg.AddMessage("请先输入文字");
	}
}

PublicChat_Send.iChannelPoint=0;
PublicChat_Send.in_speak=null;
PublicChat_Send.cext=null;
	
PublicChat_Send.AddTeam=function()
	{
		var i;
		if(!MyTeam.bTeamLeader())
		{
			EasyMessage.easymsg.AddMessage("队长才能添加");
			return;
		}
		if(PublicChat_Send.cext==null)
		{
			PublicChat_Send.ClearCext();
		}
		for(i=0;i<3;i++)
		{
			if(PublicChat_Send.cext[i].type==100)
			{
				PublicChat_Send.cext[i].type=4;
				
				PublicChat_Send.cext[i].eid=GmMe.me.iRid;
				PublicChat_Send.cext[i].tid=0;
				PublicChat_Send.cext[i].name="申请入队";
				PublicChat_Send.in_speak.sDetail+=TeamCreate._TARGET[MyTeam.iTeamTarget]+""+MyTeam.iLev1+"级~"+MyTeam.iLev2+"级"+"#x"+(i+1);
				PublicChat_Send.in_speak.OpenInput();
				return;
			}
		}
		EasyMessage.easymsg.AddMessage("最多添加3个发送项目");
	}
	PublicChat_Send.AddGoods=function( g)
	{
		var i;
		if(PublicChat_Send.cext==null)
		{
			PublicChat_Send.ClearCext();
		}
		for(i=0;i<3;i++)
		{
			if(PublicChat_Send.cext[i].type==100)
			{
				PublicChat_Send.cext[i].type=0;
				PublicChat_Send.cext[i].eid=g.iGid;
				PublicChat_Send.cext[i].tid=g.iTid;
				PublicChat_Send.cext[i].name=GmPlay.de_goods.strValue(g.iTid, 0, 4);
				PublicChat_Send.in_speak.sDetail+="#x"+(i+1);
				PublicChat_Send.in_speak.OpenInput();
				return;
			}
		}
		EasyMessage.easymsg.AddMessage("最多添加3个物品或宠物");
	}
	PublicChat_Send.AddPet=function( p)
	{
		var i;
		if(PublicChat_Send.cext==null)
		{
			PublicChat_Send.ClearCext();
		}
		for(i=0;i<3;i++)
		{
			if(PublicChat_Send.cext[i].type==100)
			{
				PublicChat_Send.cext[i].type=1;
				PublicChat_Send.cext[i].eid=p.iPid;
				PublicChat_Send.cext[i].tid=p.iTid;
				PublicChat_Send.cext[i].name=GmPlay.de_pet.strValue(p.iTid, 0, 1);
				PublicChat_Send.in_speak.sDetail+="#x"+(i+1);
				PublicChat_Send.in_speak.OpenInput();
				return;
			}
		}
		EasyMessage.easymsg.AddMessage("最多添加3个物品或宠物");
	}
	PublicChat_Send.bOpenInput=true;
	PublicChat_Send.Open=function()
	{
		XStat.gi().PushStat(XStat.GS_SENDPUBLICCHAT);
//		((PublicChat)(XStat.gi().LastStat(0))).PublicChat_Send.in_speak.OpenInput();
    }
	PublicChat_Send.ClearCext=function()
	{
		var i;
		if(PublicChat_Send.cext==null)
		{
			PublicChat_Send.cext=new Array(5);//
			for(i=0;i<5;i++)PublicChat_Send.cext[i]=new _EXTDATA();
		}
		for(i=0;i<5;i++)PublicChat_Send.cext[i].type=100;
	}