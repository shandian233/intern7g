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
import XRecordFast from "../../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import SelectColor from "../../../../../engtst/mgm/gameing/chat/SelectColor"
import SelectFace from "../../../../../engtst/mgm/gameing/chat/SelectFace"
import SelectGoods from "../../../../../engtst/mgm/gameing/chat/SelectGoods"
import SelectPet from "../../../../../engtst/mgm/gameing/chat/SelectPet"
import PublicChat_SmallFrame from "../../../../../engtst/mgm/gameing/chat/publicchat/PublicChat_SmallFrame"
import _EXTDATA from "../../../../../engtst/mgm/gameing/chat/publicchat/_EXTDATA"
import SystemOperate from "../../../../../engtst/mgm/gameing/fast/SystemOperate"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import Pets from "../../../../../engtst/mgm/gameing/me/pet/Pets"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"

import PrivateChatWatch from "./PrivateChatWatch"
import FriendList from "./FriendList"

export default class PrivateChat_Send extends BaseClass{
	
	////////////////////////////////////////
//	XButton btn_detail;//查看资料
	
//	public boolean bShow;

	 constructor( ani)
	{//有记录模式/无记录模式
		super();
         this.bSend=false;
         
		this.bSelectColor=false;
		this.bSelectFace=false;


		this.btn_voice=new XButtonEx2(GmPlay.xani_button);
		this.btn_voice.InitButton("发送语音");
		
		// this.btn_color=new XButtonEx2(GmPlay.xani_button);
		// this.btn_color.InitButton("发送颜色");
		
		this.btn_face=new XButtonEx2(GmPlay.xani_button);
		this.btn_face.InitButton("发送表情");

		this.btn_goods=new XButtonEx2(GmPlay.xani_button);
		this.btn_goods.InitButton("发送物品");
		
		this.btn_pet=new XButtonEx2(GmPlay.xani_button);
		this.btn_pet.InitButton("发送宠物");
		
		this.btn_team=new XButtonEx2(GmPlay.xani_button);
		this.btn_team.InitButton("发送队伍");

		this.btn_send=new XButtonEx2(GmPlay.xani_button);
		this.btn_send.InitButton("发送聊天按钮");
		this.btn_send.sName="发送";
		
		this.btn_record=new XButtonEx2(GmPlay.xani_button);
		this.btn_record.InitButton("发送聊天按钮");
		this.btn_record.sName="记录";
		
		this.btn_watch=new XButtonEx2(GmPlay.xani_button);
		this.btn_watch.InitButton("发送聊天按钮");
		this.btn_watch.sName="查看";

		if(PrivateChat_Send.in_speak==null)
		{
			PrivateChat_Send.in_speak=new XInput(GmPlay.xani_nui3);
			PrivateChat_Send.in_speak.bHideText=true;
		}
//	PrivateChat_Send.in_speak.OpenInput();
		PrivateChat_Send.in_speak.sDetail="";
		
		this.ResetSize();
		if(PrivateChat_Send.cext==null)
		{
			PrivateChat_Send.cext=new Array(5);//
			for(var i=0;i<5;i++)PrivateChat_Send.cext[i]=new _EXTDATA();
			PrivateChat_Send.ClearCext();
		}
		
        this.iCurrentColor=0xffffff;
        
         this.iRecordStat=0;
         this.iRecordingShow=0;
		 this.iRecordDelay=0;
		 this.iScrollY=0;
	}
	  ResetSize()
	{
		var i=75;
		this.iW=560+50-20;
		if(XRecordFast.iPrivateChatMode==0)
		{
//			this.iW=550;
			this.iH=360;
			this.iX=(GmConfig.SCRW-this.iW)/2;
			this.iY=(GmConfig.SCRH-this.iH)/2-50;
			
			PrivateChat_Send.in_speak.Move(this.iX+25, this.iY+25+60+10, this.iW-50, this.iH-25-65-10-25-60-10);
			
			this.btn_voice.Move(this.iX+25,this.iY+this.iH-25-65, 64, 65);
			// this.btn_color.Move(this.iX+25+i,this.iY+this.iH-25-65, 64, 65);
			this.btn_face.Move(this.iX+25+i*2,this.iY+this.iH-25-65, 64, 65);
			this.btn_goods.Move(this.iX+25+i*3,this.iY+this.iH-25-65, 64, 65);
			this.btn_pet.Move(this.iX+25+i*4,this.iY+this.iH-25-65, 64, 65);
			this.btn_team.Move(this.iX+25+i*5,this.iY+this.iH-25-65, 64, 65);
			this.btn_send.Move(this.iX+this.iW-90-25,this.iY+this.iH-25-65+2, 90, 60);
			this.btn_record.Move(this.iX+this.iW-90-25,this.iY+25, 90, 60);
			this.btn_watch.Move(this.iX+this.iW-90-25-90-10,this.iY+25, 90, 60);
		}
		else
		{
//			this.iW=550;
			this.iH=GmConfig.SCRH;
			this.iX=(GmConfig.SCRW-this.iW)/2;
			this.iY=0;
			PrivateChat_Send.in_speak.Move(this.iX+25, this.iY+this.iH-20-65-10-100, this.iW-50, 100);
			
			this.btn_voice.Move(this.iX+25,this.iY+this.iH-20-65, 64, 65);
			// this.btn_color.Move(this.iX+25+i,this.iY+this.iH-20-65, 64, 65);
			this.btn_face.Move(this.iX+25+i*2,this.iY+this.iH-20-65, 64, 65);
			this.btn_goods.Move(this.iX+25+i*3,this.iY+this.iH-20-65, 64, 65);
			this.btn_pet.Move(this.iX+25+i*4,this.iY+this.iH-20-65, 64, 65);
			this.btn_team.Move(this.iX+25+i*5,this.iY+this.iH-20-65, 64, 65);
			this.btn_send.Move(this.iX+this.iW-90-25,this.iY+this.iH-20-65+2, 90, 60);
			this.btn_record.Move(this.iX+this.iW-90-25,this.iY+20, 90, 60);
			this.btn_watch.Move(this.iX+this.iW-90-25-90-10,this.iY+20, 90, 60);
		}
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
				pms.lrs_small[k].CopyFrom(FormatString.gi().lrs[k]);
				if(pms.exts[k].iShowDelay>0)
				{
					for(var m=0;m<pms.lrs_small[k].iCount;m++)
					{
						var xx1=offx+pms.lrs_small[k].rs[m].iX;
						var yy1=offy+pms.lrs_small[k].rs[m].iY;
						var xx2=offx+pms.lrs_small[k].rs[m].iX+pms.lrs_small[k].rs[m].iW;
						var yy2=offy+pms.lrs_small[k].rs[m].iY+pms.lrs_small[k].rs[m].iH;
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
	 DrawPms( offx, offy, ww, pms)
	{
		var k;
		var detail="#c176b51"+pms.sDetail;
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
				pms.lrs_small[k].CopyFrom(FormatString.gi().lrs[k]);
				break;
			}
		}
		
		var th=FormatString.gi().iH+10+10;//本行高度=对话内容+10+10+24
		if(th<52)th=52;
		var dy=offy-th;
		
		//如果pms是自己，则在右侧
		if(pms.iRid==GmMe.me.iRid)
		{
			pms.ox=offx+ww-52-10-FormatString.gi().iW-10;
			pms.oy=dy+10;
			pms.ow=FormatString.gi().iW;
			pms.oh=FormatString.gi().iH;
			
			pms.headx=offx+ww-52;
			pms.heady=dy;
			
			GmPlay.xani_head.DrawAnimaEx(offx+ww-52, dy, "新头像"+pms.iRax, 0,101,52.0/80,52.0/80,0,0,0);

			DrawMode.frame_type4("聊天内容框20_20", offx+ww-52-10-(FormatString.gi().iW+20), dy, FormatString.gi().iW+20, FormatString.gi().iH+20, 20, 20);
			GmPlay.xani_frame.DrawAnima(offx+ww-52-10, dy+10,"聊天内容框20_20",10);
			
			this.DrawSelect(offx+ww-52-10-FormatString.gi().iW-10, dy+10,pms);
			FormatString.gi().Draw(offx+ww-52-10-FormatString.gi().iW-10, dy+10);
		}
		else
		{
			pms.ox=offx+52+10+10;
			pms.oy=dy+10;
			pms.ow=FormatString.gi().iW;
			pms.oh=FormatString.gi().iH;
			
			pms.headx=offx;
			pms.heady=dy;

			GmPlay.xani_head.DrawAnimaEx(offx, dy, "新头像"+pms.iRax, 0,101,52.0/80,52.0/80,0,0,0);

			DrawMode.frame_type4("聊天内容框20_20", offx+52+10, dy, FormatString.gi().iW+20, FormatString.gi().iH+20, 20, 20);
			GmPlay.xani_frame.DrawAnima(offx+52+10, dy+10,"聊天内容框20_20",9);
			
			this.DrawSelect(offx+52+10+10, dy+10,pms);
			FormatString.gi().Draw(offx+52+10+10, dy+10);
		}
		return th;
	}
	
	 DrawMessage( x, y, w, h)
	{
		x+=10;y+=10;w-=20;h-=20;
		this.iMx=x;this.iMy=y;this.iMw=w;this.iMh=h;
		var i;
		var iDy=y+h+this.iScrollY;
		var ps=PrivateChatWatch.gi();
		
		for(i=0;i<ps.iMessageCount;i++)ps.pms[i].ox=-1;
		
		M3DFast.gi().SetViewClip(x, y, x+w, y+h);

		for(i=0;i<ps.iMessageCount;i++)
		{
			if(ps.pms[i].iRid==PrivateChat_Send.iRid);
			else if(ps.pms[i].iRid==GmMe.me.iRid && ps.pms[i].iDRid==PrivateChat_Send.iRid);
			else continue;
			
			if(ps.pms[i].bWatched==false)
			{
				ps.pms[i].bWatched=true;
				GmPlay.x_record.SavePrivateChat();
				GmProtocol.gi().s_ReviewPrivateChat(ps.pms[i].iSession);//发到服务器
			}
			
			iDy-=this.DrawPms(x,iDy,w,ps.pms[i])+5;

			if(iDy<=y)break;
		}
//		GmPlay.sop(""+ps.iMessageCount+",,,"+i);
		if(i<ps.iMessageCount)this.bCanScroll=true;
		else this.bCanScroll=false;
		M3DFast.gi().NoClip();
	}
	 Draw()
	{
		PrivateChat_Send.in_speak.onscr();
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		DrawMode.frame_type4("聊天显示框亮20_20",PrivateChat_Send.in_speak.iX, PrivateChat_Send.in_speak.iY, PrivateChat_Send.in_speak.iW, PrivateChat_Send.in_speak.iH,20,20);
		if(XRecordFast.iPrivateChatMode==0)
		{//小框
			GmPlay.xani_head.DrawAnimaEx(this.iX+25, this.iY+25, "新头像"+PrivateChat_Send.iRax, 0,101,60.0/80,60.0/80,0,0,0);
			if(PrivateChat_Send.iRid==10000)M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+25, "帮派群发:"+PrivateChat_Send.sName, 0xff000000, 30, 101, 1, 1, 0, 0, 0);
			else M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+25, "名字:"+PrivateChat_Send.sName, 0xff000000, 30, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+25+35+5, "号码:"+PrivateChat_Send.iRid, 0xff000000, 25, 101, 1, 1, 0, 0, 0);
		}
		else
		{//大框
			GmPlay.xani_head.DrawAnimaEx(this.iX+25, this.iY+20, "新头像"+PrivateChat_Send.iRax, 0,101,60.0/80,60.0/80,0,0,0);
			if(PrivateChat_Send.iRid==10000)M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+20, "帮派群发:"+PrivateChat_Send.sName, 0xff000000, 30, 101, 1, 1, 0, 0, 0);
			else M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+20, "名字:"+PrivateChat_Send.sName, 0xff000000, 30, 101, 1, 1, 0, 0, 0);
			M3DFast.gi().DrawTextEx(this.iX+25+65, this.iY+20+35+5, "号码:"+PrivateChat_Send.iRid, 0xff000000, 25, 101, 1, 1, 0, 0, 0);

			DrawMode.frame_type4("聊天显示框暗20_20",this.iX+25, this.iY+20+60+10, this.iW-50, this.iH-20-60-10-20-65-10-100-10,20,20);
			this.DrawMessage(this.iX+25, this.iY+20+60+10, this.iW-50, this.iH-20-60-10-20-65-10-100-10);
		}

		var s="#c176b51"+PrivateChat_Send.in_speak.sDetail;
		for(var i=0;i<4;i++)
		{
			if(PrivateChat_Send.cext[i].type>=100)continue;
			if(s.indexOf("#x"+(i+1))>=0)
			{
				if(i==3)
				{//语音
					s=s.replace("#x"+(i+1), "#c00c000[语音:"+PrivateChat_Send.cext[i].detail+"]#o");
				}
				else s=s.replace("#x"+(i+1), "#c00c000["+PrivateChat_Send.cext[i].name+"]#o");
			}
			else PrivateChat_Send.cext[i].type=100;
		}
//		s="a bc def";
//		s=s.replace("bc", "def");
//		GmPlay.sop1(""+s);
		FormatString.gi().FormatEx(s, PrivateChat_Send.in_speak.iW-30, 29,0,0,35);//"#c000000"+
		FormatString.gi().Draw(PrivateChat_Send.in_speak.iX+15, PrivateChat_Send.in_speak.iY+10);

//		btn_close.Draw();
		
		this.btn_voice.Draw();
		// if(this.iCurrentColor==0xffffff)this.btn_color.Draw();
		// else M3DFast.gi().FillRect_2D(this.btn_color.iX, this.btn_color.iY, this.btn_color.iX+this.btn_color.iW, this.btn_color.iY+this.btn_color.iH, 0xff000000|this.iCurrentColor);
		this.btn_face.Draw();
		this.btn_goods.Draw();
		this.btn_pet.Draw();
		this.btn_team.Draw();
		
		this.btn_send.Draw();
		this.btn_record.Draw();
		this.btn_watch.Draw();

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
				PrivateChat_Send.cext[3].type=2;
				PrivateChat_Send.cext[3].eid=GmPlay.m_vi.iRecordTime;
				if(PrivateChat_Send.in_speak.sDetail.indexOf("#x4")==-1)
				{
					PrivateChat_Send.in_speak.sDetail+="#x4";
					PrivateChat_Send.in_speak.OpenInput();
				}
				PrivateChat_Send.cext[3].name="";
				PrivateChat_Send.cext[3].detail="";
				
				GmPlay.m_vi.UpLoad();
				this.iRecordStat=3;
			}
			break;
		case 3://等待上传完
			if(GmPlay.m_vi.sUrlName!="empty")
			{
				this.iRecordDelay=GameData.VOICETIMEOUT;
				PrivateChat_Send.cext[3].name=GmPlay.m_vi.sUrlName;
				
				GmPlay.m_vi.StartRecognize();
				this.iRecordStat=4;
			}
			break;
		case 4://等待翻译完
			if(GmPlay.m_vi.sRecognizeResult!="empty")
			{//上传完 并 翻译完
				PrivateChat_Send.cext[3].detail=GmPlay.m_vi.sRecognizeResult;
				
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
		if(this.bSelectFace)
		{
			if(SelectFace.gi().ProcTouch(msg, x, y))
			{
				if(SelectFace.gi().iSelectStat!=0)
				{
					if(SelectFace.gi().iSelectStat==1)
					{
						PrivateChat_Send.in_speak.sDetail+="#f"+SelectFace.gi().iSelectPoint;
						PrivateChat_Send.in_speak.OpenInput();
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
						PrivateChat_Send.in_speak.sDetail+="#c"+SelectColor.sc.tostr();
						this.iCurrentColor=SelectColor.sc.iColor;
						PrivateChat_Send.in_speak.OpenInput();
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
// //				PrivateChat_Send.in_speak.sDetail+="#cff0000";
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

		if(this.btn_record.ProcTouch(msg, x, y))
		{
			if(this.btn_record.bCheck())
			{
				if(XRecordFast.iPrivateChatMode==0)XRecordFast.iPrivateChatMode=1;
				else XRecordFast.iPrivateChatMode=0;
				this.ResetSize();
			}
			return true;
		}
		if(this.btn_watch.ProcTouch(msg, x, y))
		{
			if(this.btn_watch.bCheck())
			{
				GmProtocol.gi().s_WatchOn(0, PrivateChat_Send.iRid, 0,"");
			}
			return true;
		}
		if(this.btn_goods.ProcTouch(msg, x, y))
		{
			if(this.btn_goods.bCheck())
			{
				SelectGoods.Open(1);
			}
			return true;
		}
		if(this.btn_pet.ProcTouch(msg, x, y))
		{
			if(this.btn_pet.bCheck())
			{
				SelectPet.Open(1);
			}
			return true;
		}
		if(this.btn_team.ProcTouch(msg, x, y))
		{
			if(this.btn_team.bCheck())
			{
				PrivateChat_Send.AddTeam();
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
		if(PrivateChat_Send.in_speak.ProcTouch(msg, x, y))
		{
		}
		if(this.btn_send.ProcTouch(msg, x, y))
		{
			if(this.btn_send.bCheck())
			{//发送私聊消息
				this.bSend=true;
				if(this.iRecordStat!=0)EasyMessage.easymsg.AddMessage("正在处理中，请稍后...");
			}
			return true;
		}
		if(XRecordFast.iPrivateChatMode==1)
		{
		if(msg==3)
		{
			var i,j;
			var ps=PrivateChatWatch.gi();
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
				
					if(ps.pms[i].lrs_small[j].bIn(x-ps.pms[i].ox, y-ps.pms[i].oy))
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
						}
					}
				}
			}
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
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
	
	 SendMessage()
	{
		if(PrivateChat_Send.in_speak.sDetail.length>100)
		{
			EasyMessage.easymsg.AddMessage("文字太长");
			PrivateChat_Send.in_speak.sDetail="";
		}
		else if(PrivateChat_Send.in_speak.sDetail.length>0)
		{
			var s=PrivateChat_Send.in_speak.sDetail;
			for(var i=0;i<4;i++)
			{
				if(PrivateChat_Send.cext[i].type>=100)continue;
				if(s.indexOf("#x"+(i+1))>=0)
				{
					if(i==3)
					{//语音
						s=s.replace("#x"+(i+1), GameData.EXTCOLOR+"[语音:"+PrivateChat_Send.cext[i].detail+"]#o");
					}
					else s=s.replace("#x"+(i+1), GameData.EXTCOLOR+"["+PrivateChat_Send.cext[i].name+"]#o");
				}
				else PrivateChat_Send.cext[i].type=100;
			}
			//GmProtocol.gi().s_PublicChat(iChannelPoint,s);
			GmProtocol.gi().s_PrivateChat(PrivateChat_Send.iRid,PrivateChat_Send.sName,s);
			FriendList.gi().Close();
			FriendList.gi().AddTmpChat(PrivateChat_Send.iRid, PrivateChat_Send.sName,PrivateChat_Send.iRax);
//			PrivateChatWatch.gi().AddSelfMessage(session, rid, name, time, detail)
			PrivateChat_Send.in_speak.sDetail="";
			PrivateChat_Send.in_speak.OpenInput();
			PrivateChat_Send.ClearCext();
			if(XRecordFast.iPrivateChatMode==0)XStat.gi().PopStat(1);
		}
		else EasyMessage.easymsg.AddMessage("请先输入文字");
	}
}
PrivateChat_Send.iRid;
PrivateChat_Send.sName;
PrivateChat_Send.iRax;
PrivateChat_Send.in_speak=null;
PrivateChat_Send.cext=null;
PrivateChat_Send.AddTeam=function()
{
    var i;
    if(!MyTeam.bTeamLeader())
    {
        EasyMessage.easymsg.AddMessage("队长才能添加");
        return;
	}
	if(PrivateChat_Send.cext==null)
	{
		PrivateChat_Send.ClearCext();
	}
    for(i=0;i<3;i++)
    {
        if(PrivateChat_Send.cext[i].type==100)
        {
            PrivateChat_Send.cext[i].type=4;
            
            PrivateChat_Send.cext[i].eid=GmMe.me.iRid;
            PrivateChat_Send.cext[i].tid=0;
            PrivateChat_Send.cext[i].name="申请入队";
			PrivateChat_Send.in_speak.sDetail+="#x"+(i+1);
			PrivateChat_Send.in_speak.OpenInput();
            return;
        }
    }
    EasyMessage.easymsg.AddMessage("最多添加3个发送项目");
}
//	public static PrivateChat pc=new PrivateChat();
PrivateChat_Send.AddGoods=function( g)
{
	var i;
	if(PrivateChat_Send.cext==null)
	{
		PrivateChat_Send.ClearCext();
	}
    for(i=0;i<3;i++)
    {
        if(PrivateChat_Send.cext[i].type==100)
        {
            PrivateChat_Send.cext[i].type=0;
            PrivateChat_Send.cext[i].eid=g.iGid;
            PrivateChat_Send.cext[i].tid=g.iTid;
            PrivateChat_Send.cext[i].name=GmPlay.de_goods.strValue(g.iTid, 0, 4);
			PrivateChat_Send.in_speak.sDetail+="#x"+(i+1);
			PrivateChat_Send.in_speak.OpenInput();
            return;
        }
    }
    EasyMessage.easymsg.AddMessage("最多添加3个物品或宠物");
}
PrivateChat_Send.AddPet=function( p)
{
	var i;
	if(PrivateChat_Send.cext==null)
	{
		PrivateChat_Send.ClearCext();
	}
    for(i=0;i<3;i++)
    {
        if(PrivateChat_Send.cext[i].type==100)
        {
            PrivateChat_Send.cext[i].type=1;
            PrivateChat_Send.cext[i].eid=p.iPid;
            PrivateChat_Send.cext[i].tid=p.iTid;
            PrivateChat_Send.cext[i].name=GmPlay.de_pet.strValue(p.iTid, 0, 1);
			PrivateChat_Send.in_speak.sDetail+="#x"+(i+1);
			PrivateChat_Send.in_speak.OpenInput();
            return;
        }
    }
    EasyMessage.easymsg.AddMessage("最多添加3个物品或宠物");
}
PrivateChat_Send.OpenChat=function( rid, name, rax)
{//
    PrivateChat_Send.iRid=rid;
    PrivateChat_Send.sName=name;
    PrivateChat_Send.iRax=rax;
    if(PrivateChat_Send.iRax<0 || PrivateChat_Send.iRax>6)PrivateChat_Send.iRax=6;

    XStat.gi().PushStat(XStat.GS_PRIVATECHAT);
//		bShow=true;
//		PrivateChat_Send.in_speak.sDetail="";
}

PrivateChat_Send.ClearCext=function()
{
    if(PrivateChat_Send.cext==null)
    {
        PrivateChat_Send.cext=new Array(5);//
        for(var i=0;i<5;i++)PrivateChat_Send.cext[i]=new _EXTDATA();
    }
    for(var i=0;i<5;i++)PrivateChat_Send.cext[i].type=100;
}