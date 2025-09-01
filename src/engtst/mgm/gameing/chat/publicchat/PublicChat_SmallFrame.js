import PublicInterface from "../../../../../zero/Interface/PublicInterface"
import MapManager from "../../../../../map/MapManager"
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
import LockRect from "../../../../../engtst/mgm/frame/format/LockRect"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import NearRole from "../../../../../engtst/mgm/gameing/NearRole"
import SystemOperate from "../../../../../engtst/mgm/gameing/fast/SystemOperate"
import MyGov from "../../../../../engtst/mgm/gameing/gov/MyGov"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import BackToSchool from "../../../../../engtst/mgm/gameing/me/school/BackToSchool"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"

import _EXTDATA from "./_EXTDATA"
import PublicChat_BigFrame from "./PublicChat_BigFrame"
import PublicChat_Send from "./PublicChat_Send"

class PublicMessage
{
/*	public int channel;//频道
	public int iRid;//发送者ID
	public String sName;//发送者名字
	public int iRax;//种族，性别
	public int iFlag;//各种标记
	public String sMessage;
	
	public _EXTDATA exts[ ];
	public LockRect lrs_small[ ];
	public LockRect lrs_big[ ];
	
	public int ox,oy,ow,oh;
	public int headx,heady;
	*/
	 constructor()
	{
		var i;
		this.sName="";
		this.sMessage="";
		this.exts=new Array(5);//
		this.lrs_small=new Array(5);//
		this.lrs_big=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.exts[i]=new _EXTDATA();
			this.lrs_small[i]=new LockRect();
			this.lrs_big[i]=new LockRect();
		}
	}
	copyfrom( pm)
	{
		this.channel=pm.channel;
		this.iRid=pm.iRid;
		this.sName=pm.sName;
		this.iRax=pm.iRax;
		this.iFlag=pm.iFlag;
		this.sMessage=pm.sMessage;
		this.exts[0].copyfrom(pm.exts[0]);
		this.exts[1].copyfrom(pm.exts[1]);
		this.exts[2].copyfrom(pm.exts[2]);
		this.exts[3].copyfrom(pm.exts[3]);
		this.exts[4].copyfrom(pm.exts[4]);
	}
}

export default class PublicChat_SmallFrame {
	//左下角聊天框

	 constructor()
	{
		var i;
		this.pm3f=M3DFast.gi();
		
		this.bMessageSwitch=new Array(10);//
		for(i=0;i<10;i++)this.bMessageSwitch[i]=true;//各频道开关默认打开

		PublicChat_SmallFrame.iW=480-5;//GmConfig.SCRW*2/5;
		PublicChat_SmallFrame.iH=160;//125;
		
		PublicChat_SmallFrame.iModifyW=PublicChat_SmallFrame.iW;
		PublicChat_SmallFrame.iModifyH=PublicChat_SmallFrame.iH;
		
		this.bOpen=true;
		this.bOpening=false;
		this.bCloseing=false;
		//最最左下角

		this.btn_open=null;
		this.btn_speak=null;
		this.btn_close=null;
		this.btn_full=null;
		this.btn_voice=null;
		
		this.pms=new Array(PublicChat_SmallFrame.MAXMESSAGE);//
		for(i=0;i<PublicChat_SmallFrame.MAXMESSAGE;i++)
		{
			this.pms[i]=new PublicMessage();
		}
		this.iMessageCount=0;
		
		PublicChat_SmallFrame.bLock=false;
		
		this.sSpeakers=new Array(32);//
		this.iSpeakerCount=-1;
		this.iSpeakerX=0;
        this.iSpeakerWidth=0;
        
         this.iRecordDelay=0;
         this.iRecordStat=0;
         this.iVoiceChannelPoint=0;
         this.iRecordingShow=0;
        this._CHANNELSHORT=["当","队","门","帮","世","传","系","副"];
        this._CHANNELCOLORS=["#cffffff","#cff8000","#cff0000","#c00ff00","#c00ffff","#c80a0ff","#cffff00","#cff00ff"];
    //	public String this._CHANNELCOLORS={"#c00ffff","#cff8000","#cff0000","#c00ff00","#cffffff","#c80a0ff","#cffff00","#cff00ff"};
        this._CHANNELCOLORI=[0xffffffff,0xffff8000,0xffff0000,0xff00ff00,0xff00ffff,0xff80a0ff,0xffffff00,0xffff00ff];
    //	public int this._CHANNELCOLORI={0xff00ffff,0xffff8000,0xffff0000,0xff00ff00,0xffffffff,0xff80a0ff,0xffffff00,0xffff00ff};

	}
	 AddSpeaker( name, msg)
	{
		if(this.iSpeakerCount==-1)
		{
			this.iSpeakerCount=1;
			this.sSpeakers[1]=name+":"+msg;
			this.NextSpeaker();
		}
		else if(this.iSpeakerCount<30)
		{
			this.iSpeakerCount++;
			this.sSpeakers[this.iSpeakerCount]=name+":"+msg;
		}
	}
	 DrawSpeaker()
	{
		if(this.iSpeakerCount<0)return;
		if(this.iSpeakerX+this.iSpeakerWidth<0)this.NextSpeaker();
		this.iSpeakerX-=(GmConfig.SCRW/100);
//		this.pm3f.FillRect_2D(this.iSpeakerX, 60, this.iSpeakerX+this.iSpeakerWidth, 60+30, 0x80000000);
		this.pm3f.FillRect_2D(0, 60, GmConfig.SCRW, 60+30, 0x80000000);
		this.pm3f.DrawTextEx(this.iSpeakerX, 60+15, this.sSpeakers[0], 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
	}
	 NextSpeaker()
	{
		var i;
		for(i=0;i<this.iSpeakerCount;i++)
		{
			this.sSpeakers[i]=this.sSpeakers[i+1];
		}
		this.iSpeakerCount--;
		this.iSpeakerWidth=this.pm3f.GetTextWidth(this.sSpeakers[0], 30);
		this.iSpeakerX=GmConfig.SCRW;
	}

	DrawMessage( iX, iY)
	{
		var i,j,k;
		var iDy=GmConfig.SCRH-10;
		var x,y,w,h;
		var detail="";
		var offx,offy;
		x=iX+36;
		y=iY;
		w=PublicChat_SmallFrame.iW-40;
		h=PublicChat_SmallFrame.iH;
		for(i=0;i<this.iMessageCount;i++)this.pms[i].ox=-1;

		this.pm3f.SetViewClip(x-40+3, y+3, x+w-3, y+h-3);
		for(i=0;i<this.iMessageCount;i++)
		{
			if(this.pms[i].channel<10)
			{
				if(!this.bMessageSwitch[this.pms[i].channel])continue;//过滤信息
			}

			if((XRecordFast.iFilterChannel&1)==0 && this.pms[i].channel==0)continue;
			if((XRecordFast.iFilterChannel&2)==0 && this.pms[i].channel==1)continue;
			if((XRecordFast.iFilterChannel&4)==0 && this.pms[i].channel==2)continue;
			if((XRecordFast.iFilterChannel&8)==0 && this.pms[i].channel==3)continue;
			if((XRecordFast.iFilterChannel&16)==0 && (this.pms[i].channel==4 || this.pms[i].channel==50))continue;
			if((XRecordFast.iFilterChannel&32)==0 && this.pms[i].channel==5)continue;
			if((XRecordFast.iFilterChannel&64)==0 && (this.pms[i].channel==6 || this.pms[i].channel==7))continue;
			switch(this.pms[i].channel)
			{
			case 0://当前
			case 1://队伍
			case 2://门派
			case 3://帮派
			case 4://世界
			case 50://喇叭
				detail="["+this.pms[i].sName+"]:"+this.pms[i].sMessage;
				break;
			case 5://传闻
			case 6://系统
			case 7://副本
				if(this.pms[i].sName=="")detail=this.pms[i].sMessage;//传闻天蓝
				else detail="["+this.pms[i].sName+"]:"+this.pms[i].sMessage;
				break;
			}
			
			

	//			M3DFast.gi().FillRect_2D(x, iDy-FormatString.gi().iH, x+w, iDy, 0x80000000);

			j=this.pms[i].channel;
			if(j==50)j=4;
			if(j<0 || j>7)j=0;
			detail=this._CHANNELCOLORS[j]+detail;
			
			for(k=0;k<5;k++)
			{
				switch(this.pms[i].exts[k].type)
				{
				case 0://物品
					detail=FormatString.gi().InsertLocker(k, detail, "["+GmPlay.de_goods.strValue(this.pms[i].exts[k].tid, 0, 4)+"]",GameData.EXTCOLOR,"#c00ff00");
//					GmPlay.sop(detail);
					break;
				case 1://宠物
					detail=FormatString.gi().InsertLocker(k, detail, "["+GmPlay.de_pet.strValue(this.pms[i].exts[k].tid, 0, 1)+"]",GameData.EXTCOLOR,"#c00ff00");
					break;
				case 2://语音
					detail=FormatString.gi().InsertLocker(k, detail, "[语音:"+this.pms[i].exts[k].detail+"]",GameData.EXTCOLOR,"#c00ff00");
					break;
				case 3://名字
					detail=FormatString.gi().InsertLocker(k, detail, "["+this.pms[i].sName+"]",this._CHANNELCOLORS[j],this._CHANNELCOLORS[j]);
					break;
				case 4://队伍
					detail=FormatString.gi().InsertLocker(k, detail, "[申请入队]",GameData.EXTCOLOR,"#c00ff00");
					break;
				}
			}
			FormatString.gi().Format(detail,w,SystemOperate.WordSize(24));
//			GmPlay.sop("i="+i+",,"+detail);
			FormatString.gi().CheckOutRect();
			offx=x;
			offy=iDy-FormatString.gi().iH;
			for(k=0;k<5;k++)
			{
				switch(this.pms[i].exts[k].type)
				{
				case 0://物品
				case 1://宠物
				case 2://语音
				case 3://自己名字
				case 4://队伍
					this.pms[i].lrs_small[k].CopyFrom(FormatString.gi().lrs[k]);
					if(this.pms[i].exts[k].iShowDelay>0)
					{
						for(var m=0;m<this.pms[i].lrs_small[k].iCount;m++)
						{
							var xx1=offx+this.pms[i].lrs_small[k].rs[m].iX;
							var yy1=offy+this.pms[i].lrs_small[k].rs[m].iY;
							var xx2=offx+this.pms[i].lrs_small[k].rs[m].iX+this.pms[i].lrs_small[k].rs[m].iW;
							var yy2=offy+this.pms[i].lrs_small[k].rs[m].iY+this.pms[i].lrs_small[k].rs[m].iH;
							M3DFast.gi().FillRect_2D(xx1,yy1,xx2,yy2, 0xff00ff|(this.pms[i].exts[k].iShowDelay<<24));
//							GmPlay.sop("i="+i+",,,x="+xx1+",,,,y="+yy1+",,,,,x2="+xx2+",,,y2="+yy2+",,,ox="+offx+",,,oy="+offy);
//							GmPlay.sop("check x="+this.pms[i].lrs_small[k].rs[m].iX+"    check y="+this.pms[i].lrs_small[k].rs[m].iY);
//							M3DFast.gi().DrawTextEx(xx1, yy1, "@@@@@@@@@@@", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
						}
						if(this.pms[i].exts[k].iShowDelay>200)this.pms[i].exts[k].iShowDelay-=3;
						else if(this.pms[i].exts[k].iShowDelay>150)this.pms[i].exts[k].iShowDelay-=6;
						else if(this.pms[i].exts[k].iShowDelay>100)this.pms[i].exts[k].iShowDelay-=9;
						else if(this.pms[i].exts[k].iShowDelay>50)this.pms[i].exts[k].iShowDelay-=12;
						else this.pms[i].exts[k].iShowDelay=0;
					}
					break;
				}
			}
			
//				GmPlay.xani_frame.DrawAnima(x-18-12, iDy-FormatString.gi().iH+1, "聊天频道框24_24",0);
//				M3DFast.gi().DrawTextEx(x-18, iDy-FormatString.gi().iH+12+1, this._CHANNELSHORT[j], this._CHANNELCOLORI[j], 20, 101, 1, 1, 0, -2, -2);
			GmPlay.xani_frame.DrawAnima(x-16-12, iDy-FormatString.gi().iH+FormatString.gi().iLineH[0]-24-1, "聊天频道框24_24",0);
			M3DFast.gi().DrawTextEx(x-16, iDy-FormatString.gi().iH+12+FormatString.gi().iLineH[0]-24-1, this._CHANNELSHORT[j], this._CHANNELCOLORI[j], 20, 101, 1, 1, 0, -2, -2);

			FormatString.gi().Draw(x, iDy-FormatString.gi().iH);
			this.pms[i].ox=x;
			this.pms[i].oy=iDy-FormatString.gi().iH;
			this.pms[i].ow=FormatString.gi().iW;
			this.pms[i].oh=FormatString.gi().iH;
			iDy-=FormatString.gi().iH;
	//		iDy-=SystemOperate.WordSize(2);
			if(iDy<=y)break;
//			this.pm3f.DrawTextEx(iX, iY+PublicChat_SmallFrame.iH-20*(i+1), , 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		}
		this.pm3f.NoClip();
		
//		for(i=0;i<this.iMessageCount;i++)this.pms[i].bSelected=false;
	}
	LoadButtons()
	{
		if(this.btn_open==null)
		{
			this.btn_open=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_open.InitButton("左下开关2");
//			this.btn_open.bCheckByRect=true;
		}
		if(this.btn_close==null)
		{
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("左下开关1");
//		this.btn_close.bCheckByRect=true;
		}
		if(this.btn_speak==null)
		{
		this.btn_speak=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_speak.InitButton("左下发言");
//		this.btn_speak.bCheckByRect=true;
		}
		if(this.btn_full==null)
		{
		this.btn_full=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_full.InitButton("左下展开");
//		this.btn_full.bCheckByRect=true;
		}
		if(this.btn_voice==null)
		{
			this.btn_voice=new Array(10);//
			for(var i=0;i<6;i++)
			{
				this.btn_voice[i]=new XButtonEx2(GmPlay.xani_button);
				this.btn_voice[i].InitButton("喇叭按钮60_60");
			}
		}
	}
	 Draw()
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		this.LoadButtons();
		var i=5;
		if(this.bOpening)
		{
			if(PublicChat_SmallFrame.iModifyW+PublicChat_SmallFrame.iW/i<PublicChat_SmallFrame.iW)PublicChat_SmallFrame.iModifyW+=PublicChat_SmallFrame.iW/i;
			else PublicChat_SmallFrame.iModifyW=PublicChat_SmallFrame.iW;
			
			if(PublicChat_SmallFrame.iModifyH+PublicChat_SmallFrame.iH/i<PublicChat_SmallFrame.iH)PublicChat_SmallFrame.iModifyH+=PublicChat_SmallFrame.iH/i;
			else PublicChat_SmallFrame.iModifyH=PublicChat_SmallFrame.iH;
			
			if(PublicChat_SmallFrame.iModifyW==PublicChat_SmallFrame.iW && PublicChat_SmallFrame.iModifyH==PublicChat_SmallFrame.iH)
			{
				this.bOpening=false;
				this.bOpen=true;
			}
		}
		else if(this.bCloseing)
		{
//			GmPlay.sop("aaa="+PublicChat_SmallFrame.iModifyW+",,,bbb="+PublicChat_SmallFrame.iW);
			if(PublicChat_SmallFrame.iModifyW>0)PublicChat_SmallFrame.iModifyW-=PublicChat_SmallFrame.iW/i;
			else PublicChat_SmallFrame.iModifyW=0;
			
			if(PublicChat_SmallFrame.iModifyH>0)PublicChat_SmallFrame.iModifyH-=PublicChat_SmallFrame.iH/i;
			else PublicChat_SmallFrame.iModifyH=0;
			
			if(PublicChat_SmallFrame.iModifyW==0 && PublicChat_SmallFrame.iModifyH==0)
			{
				this.bCloseing=false;
				this.bOpen=false;
			}
		}
//		GmPlay.sop("PublicChat_SmallFrame.iW="+PublicChat_SmallFrame.iW+",,,,,iModify="+PublicChat_SmallFrame.iModifyW+",,this.bCloseing="+this.bCloseing+",,,this.bOpening="+this.bOpening);
//		GmPlay.sop("GmConfig.SCRW="+GmConfig.SCRW+",l,,GmConfig.SCRH="+GmConfig.SCRH);
var iX=0;
var iY=GmConfig.SCRH-PublicChat_SmallFrame.iModifyH;
//		this.pm3f.FillRect_2D(iX, iY, iX+PublicChat_SmallFrame.iModifyW, iY+PublicChat_SmallFrame.iModifyH, 0x80000000);
		if(PublicChat_SmallFrame.iModifyW>0 && PublicChat_SmallFrame.iModifyH>0)
		{
			this.pm3f.FillRect_2D(iX,iY,iX+PublicChat_SmallFrame.iModifyW,iY+PublicChat_SmallFrame.iModifyH, 0x80000000);
		}

		if(this.bOpen)this.DrawMessage(iX,iY);

		this.btn_open.Move(0, GmConfig.SCRH-60, 60, 60);
		this.btn_open.SetCheckRect(0, GmConfig.SCRH-60, 60, 60);
//		this.btn_open.Move(0, GmConfig.SCRH-(PublicChat_SmallFrame.iModifyH+60)/2, 60, 60);
//		this.btn_open.SetCheckRect(0, GmConfig.SCRH-(PublicChat_SmallFrame.iModifyH+60)/2, 60, 60);

		this.btn_close.Move(PublicChat_SmallFrame.iModifyW-60, GmConfig.SCRH-(PublicChat_SmallFrame.iModifyH+60)/2, 60, 60);
		this.btn_close.SetCheckRect(PublicChat_SmallFrame.iModifyW-60, GmConfig.SCRH-(PublicChat_SmallFrame.iModifyH+60)/2, 60, 60);

//////////////////////////////////////////////////////////////////////////////////////
var offx=0;
if(PublicInterface.gi().iLHX>0)offx=PublicInterface.gi().iLHX;
var offy=GmConfig.SCRH-PublicChat_SmallFrame.iModifyH-80;
var ww=72,hh=72;
		this.btn_speak.Move(offx, offy, ww, hh);
		this.btn_speak.SetCheckRect(offx, offy, ww, hh);
		offx+=80;
		this.btn_full.Move(offx, offy, ww, hh);
		this.btn_full.SetCheckRect(offx, offy, ww, hh);
		offx+=80;
		for(i=0;i<6;i++)
		{//根据设置
			if((XRecordFast.iFastVoice&(1<<i))!=0)
			{
				this.btn_voice[i].Move(offx, offy, ww, hh);
				offx+=80;
			}
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////
		if(this.bOpen || this.bOpening || this.bCloseing)
		{	
			GmPlay.xani_frame.DrawAnima(this.btn_speak.iX,this.btn_speak.iY, "右下底框72_72",0);
			GmPlay.xani_icon.DrawAnima(this.btn_speak.iX,this.btn_speak.iY, "公聊发送",0);
			
			GmPlay.xani_frame.DrawAnima(this.btn_full.iX,this.btn_full.iY, "右下底框72_72",0);
			GmPlay.xani_icon.DrawAnima(this.btn_full.iX,this.btn_full.iY, "公聊半屏",0);
//			this.btn_speak.Draw();
//			this.btn_full.Draw();
//			j=-1;
			for(i=0;i<6;i++)
			{
				if((XRecordFast.iFastVoice&(1<<i))!=0)
				{
					GmPlay.xani_frame.DrawAnima(this.btn_voice[i].iX,this.btn_voice[i].iY, "右下底框72_72",0);
//					DrawMode.new_framepc(this.btn_voice[i].iX,this.btn_voice[i].iY,this.btn_voice[i].iW,this.btn_voice[i].iH);
					GmPlay.xani_icon.DrawAnima(this.btn_voice[i].iX,this.btn_voice[i].iY, "公聊话筒",0);
//					M3DFast.gi().DrawText_2(this.btn_voice[i].iX+ww-10,this.btn_voice[i].iY+10,this._CHANNELSHORT[i],0xffffec80,40,101,1,1,0,-2,-2,4,0xff00244d);
					M3DFast.gi().DrawText_2(this.btn_voice[i].iX+ww-10,this.btn_voice[i].iY+10,this._CHANNELSHORT[i],0xffffffff,30,101,1,1,0,-2,-2,4,0xff00244d);
				}
//				this.btn_voice[i].Draw();
			}
			
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
			
			this.btn_close.Move(PublicChat_SmallFrame.iModifyW-60, GmConfig.SCRH-(PublicChat_SmallFrame.iModifyH+60)/2, 60, 60);
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
		if(this.bOpening || this.bCloseing);
		else
		{
			if(this.bOpen)this.btn_close.Draw();
			else this.btn_open.Draw();
		}
	}
	SwichFrame()
	{//开关窗口
		if(this.bOpening)
		{
			this.bOpening=false;
			this.bCloseing=true;
		}
		else if(this.bCloseing)
		{
			this.bOpening=true;
			this.bCloseing=false;
		}
		else if(this.bOpen)
		{
			this.bOpening=false;
			this.bCloseing=true;
		}
		else if(!this.bOpen)
		{
			this.bOpening=true;
			this.bCloseing=false;
		}
	}
	 ProcTouch( msg, x, y)
	{
		var iX=0;
		var iY=GmConfig.SCRH-PublicChat_SmallFrame.iModifyH;
//		GmPlay.sop("m  x="+x+",y="+y);
		if(PublicChat_SmallFrame.bLock)
		{//拖动框体大小
			switch(msg)
			{
			case 2:
				PublicChat_SmallFrame.iW=PublicChat_SmallFrame.iW+(x-this.iLockX);
				if(PublicChat_SmallFrame.iW<240-5)PublicChat_SmallFrame.iW=240-5;
//				iY=iY+(y-this.iLockY);
//				if(iY>GmConfig.SCRH-50-60)iY=GmConfig.SCRH-50-60;
//				PublicChat_SmallFrame.iH=GmConfig.SCRH-iY;
				PublicChat_SmallFrame.iH=PublicChat_SmallFrame.iH-(y-this.iLockY);
				if(PublicChat_SmallFrame.iH<50+60)PublicChat_SmallFrame.iH=50+60;
				
				if(x>this.iLockX && PublicChat_SmallFrame.iW>GmConfig.SCRW-40)PublicChat_SmallFrame.iW=GmConfig.SCRW;
				if(PublicChat_SmallFrame.iW>GmConfig.SCRW)PublicChat_SmallFrame.iW=GmConfig.SCRW;
				if(y<this.iLockY && PublicChat_SmallFrame.iH>GmConfig.SCRH-40)PublicChat_SmallFrame.iH=GmConfig.SCRH;
				if(PublicChat_SmallFrame.iH>GmConfig.SCRH)PublicChat_SmallFrame.iH=GmConfig.SCRH;
				this.iLockX=x;
				this.iLockY=y;
				
				PublicChat_SmallFrame.iModifyW=PublicChat_SmallFrame.iW;
				PublicChat_SmallFrame.iModifyH=PublicChat_SmallFrame.iH;
				break;
			case 3:
				PublicChat_SmallFrame.bLock=false;
				break;
			}
			return true;
		}
		
		if(!this.bOpen && this.btn_open.ProcTouch(msg, x, y))
		{
			if(this.btn_open.bCheck())
			{
				this.SwichFrame();
			}
			return true;
		}
		if(this.bOpen && this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				this.SwichFrame();
			}
			return true;
		}
//		if(btn_channel.ProcTouch(msg, x, y))
//		{
//			return true;
//		}
//		if(in_speak.ProcTouch(msg, x, y))
//		{
//			return true;
//		}
		var i,j;
		if(this.bOpen)
		{
			if(this.btn_speak.ProcTouch(msg, x, y))
			{//
				if(this.btn_speak.bCheck())
				{
					PublicChat_Send.Open();
//					BackToSchool.Open("asdf");
				}
				return true;
			}
			if(this.btn_full.ProcTouch(msg, x, y))
			{
				if(this.btn_full.bCheck())
				{
					PublicChat_BigFrame.Open();
				}
				return true;
			}
			j=-1;
			for(i=0;i<6;i++)
			{//根据设置
				if((XRecordFast.iFastVoice&(1<<i))!=0)
				{
					if(XDefine.bInRect(x, y, this.btn_voice[i].iX, this.btn_voice[i].iY, this.btn_voice[i].iW, this.btn_voice[i].iH))
					{
						if(this.iRecordStat==0 && msg==1)
						{
							if(i==1 && MyTeam.bNoTeam())
							{
								EasyMessage.easymsg.AddMessage("还未组队");
								return true;
							}
							if(i==2 && GmMe.me.rbs.iSchoolId<=0)
							{
								EasyMessage.easymsg.AddMessage("还未加入门派");
								return true;
							}
							if(i==3 && MyGov.mg.iRealGid<=0)
							{
								EasyMessage.easymsg.AddMessage("还未加入帮派");
								return true;
							}
						}
						if(this.iRecordStat>=2)
						{
							return true;
						}
						j=i;
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
								this.iVoiceChannelPoint=i;
							}
						}
						else if(msg==3)
						{//放开手指，发送录音
							if(this.iRecordStat==1)
							{
								if(j==this.iVoiceChannelPoint)
								{
									GmPlay.m_vi.StopRecord();
									this.iRecordStat=2;
								}
								else
								{
									GmPlay.m_vi.StopRecord();
									this.iRecordStat=0;
								}
							}
						}
					}
				}
			}
			if(this.iRecordStat==1)
			{
				if(j==this.iVoiceChannelPoint)
				{//手指在按钮上
					this.iRecordingShow=1;
				}
				else
				{//手指移出按钮
					if(msg==2)
					{//提示松开手指停止录音
					
					}
					if(msg==3)
					{//取消录音
						GmPlay.m_vi.StopRecord();
						this.iRecordStat=0;
					}
					this.iRecordingShow=2;
				}
				return true;
			}
			this.iRecordingShow=0;
//			GmPlay.sop(""+msg+",,,"+this.iMessageCount);
			if(msg==3)
			{
				for(i=0;i<this.iMessageCount;i++)
				{
//					GmPlay.sop(""+this.pms[i].ox+""+this.pms[i].oy);
					if(this.pms[i].ox==-1)continue;
					if(!XDefine.bInRect(x, y, this.pms[i].ox, this.pms[i].oy, this.pms[i].ow, this.pms[i].oh))continue;
					for(j=0;j<5;j++)
					{
						GmPlay.sop(""+this.pms[i].exts[j].type);
						if(this.pms[i].exts[j].type>=100)continue;
						if(this.pms[i].exts[j].iShowDelay>0)continue;
					
						if(this.pms[i].lrs_small[j].bIn(x-this.pms[i].ox, y-this.pms[i].oy))
						{
							switch(this.pms[i].exts[j].type)
							{
							case 0://物品
								GmProtocol.gi().s_WatchOn(1, this.pms[i].exts[j].eid, 0,"");
								this.pms[i].exts[j].iShowDelay=255;
//								EasyMessage.easymsg.AddMessage("正在获取["+this.pms[i].exts[j].name+"]信息");
								break;
							case 1://宠物
								GmProtocol.gi().s_WatchOn(2, this.pms[i].exts[j].eid, 0,"");
								this.pms[i].exts[j].iShowDelay=255;
//								EasyMessage.easymsg.AddMessage("正在获取["+this.pms[i].exts[j].name+"]信息");
								break;
							case 2://语音
								GmPlay.m_vi.PlayUrlVoice(this.pms[i].exts[j].name);
								this.pms[i].exts[j].iShowDelay=255;
//								EasyMessage.easymsg.AddMessage("正在播放[语音]信息");
								break;
							case 3://自己
								//GmPlay.sop("~~~~~~~~~~~~~"+i+"~"+j+"~~"+this.pms[i].exts[j].eid);
								if(this.pms[i].exts[j].eid>1000)GmProtocol.gi().s_WatchOn(0, this.pms[i].exts[j].eid, 0,"");
								this.pms[i].exts[j].iShowDelay=255;
//								EasyMessage.easymsg.AddMessage("正在获取["+this.pms[i].sName+"]信息");
								break;
							case 4://队伍
								if(MyTeam.bInTeam())EasyMessage.easymsg.AddMessage("已有队伍");
								else
								{
									GmProtocol.gi().s_TeamOperate(3,this.pms[i].exts[j].eid,0);
								}
								this.pms[i].exts[j].iShowDelay=255;
								break;
							}
						}
					}
				}
			}
		}

		if(XDefine.bInRect(x, y, iX+PublicChat_SmallFrame.iW-60, iY, 60, 60))
		{
			if(msg==1)
			{
				PublicChat_SmallFrame.bLock=true;
				this.iLockX=x;
				this.iLockY=y;
				return true;
			}
		}

		PublicChat_SmallFrame.bLock=false;

		if(XDefine.bInRect(x, y, iX, iY, PublicChat_SmallFrame.iModifyW, PublicChat_SmallFrame.iModifyH))return true;
		return false;
	}

	GetMessage( pls)
	{
		var channel=pls.GetNextByte();
		var rid=pls.GetNextInt();
		var name=pls.GetNextString();
		var rax=pls.GetNextByte();
		var flag=pls.GetNextByte();
		var detail=pls.GetNextString();
		if(channel==50)
		{//小喇叭
			this.AddSpeaker(name,detail);
//			return;
		}

		this.AddMessage(channel,rid,name,rax,flag,detail,pls);
//		FormatString.gi().Format(ts2, 100);
		if(channel==0 || channel==1)
		{//当前，看发送者是否在附近玩家列表内，是则头上冒气泡框
			if(rid==GmMe.me.iRid)
			{
				GmMe.me.sPopoString=detail;
				GmMe.me.iPopoDelay=200;
			}
			else
			{
				var nr=Gameing.gameing.findnrs(rid);
				if(nr!=null)
				{
					nr.sPopoString=detail;
					nr.iPopoDelay=200;
				}
			}
		}
	}
	 AddMessage( channel, rid, name, rax, flag, message, pls)
	{
		var i;
		if(this.iMessageCount>=PublicChat_SmallFrame.MAXMESSAGE)this.iMessageCount=PublicChat_SmallFrame.MAXMESSAGE-1;
		for(i=this.iMessageCount;i>0;i--)
		{
			this.pms[i].copyfrom(this.pms[i-1]);
		}
//		GmPlay.sop("channel="+channel);
		this.pms[0].channel=channel;
		this.pms[0].iRid=rid;
		this.pms[0].sName=name;
		this.pms[0].iRax=rax;
		this.pms[0].iFlag=flag;
		this.pms[0].sMessage=message;
		
		if(channel==5 && rid<1000)
		{
			this.pms[0].iRax=6;
			this.pms[0].sName="某某";
		}
		if(channel<5)
		{
			this.pms[0].exts[0].type=3;//自己名字
			this.pms[0].exts[0].eid=rid;
		}
		else this.pms[0].exts[0].type=100;
		for(i=1;i<5;i++)
		{
			if(pls==null)break;
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
				if((XRecordFast.iAutoPlay&1)!=0 && channel==0)GmPlay.m_vi.PlayUrlVoice(this.pms[0].exts[i].name);
				else if((XRecordFast.iAutoPlay&2)!=0 && channel==1)GmPlay.m_vi.PlayUrlVoice(this.pms[0].exts[i].name);
				else if((XRecordFast.iAutoPlay&4)!=0 && channel==2)GmPlay.m_vi.PlayUrlVoice(this.pms[0].exts[i].name);
				else if((XRecordFast.iAutoPlay&8)!=0 && channel==3)GmPlay.m_vi.PlayUrlVoice(this.pms[0].exts[i].name);
				else if((XRecordFast.iAutoPlay&16)!=0 && (channel==4 || channel==50))GmPlay.m_vi.PlayUrlVoice(this.pms[0].exts[i].name);
				else if((XRecordFast.iAutoPlay&32)!=0 && channel==5)GmPlay.m_vi.PlayUrlVoice(this.pms[0].exts[i].name);
				break;
			}
//			GmPlay.sop(this.pms[0].exts[i].type+",,"+i+",,"+this.pms[0].exts[i].eid+",,"+this.pms[0].exts[i].detail);
		}
		
		this.iMessageCount++;
	}
}

PublicChat_SmallFrame.iW;PublicChat_SmallFrame.iH;
PublicChat_SmallFrame.iModifyW;PublicChat_SmallFrame.iModifyH;
PublicChat_SmallFrame.bLock;
PublicChat_SmallFrame.MAXMESSAGE=100;
PublicChat_SmallFrame.chat=null;
PublicChat_SmallFrame.gi=function()
{
	if(PublicChat_SmallFrame.chat==null)PublicChat_SmallFrame.chat=new PublicChat_SmallFrame();
	return PublicChat_SmallFrame.chat;
}


 PublicChat_SmallFrame.CHANNEL_DANGQIAN =0;
  PublicChat_SmallFrame.CHANNEL_DUIWU =1;
  PublicChat_SmallFrame.CHANNEL_MENPAI =2;
  PublicChat_SmallFrame.CHANNEL_BANGPAI =3;
  PublicChat_SmallFrame.CHANNEL_SHIJIE= 4;
  PublicChat_SmallFrame.CHANNEL_CHUANWEN =5;
  PublicChat_SmallFrame.CHANNEL_XITONG =6;
  PublicChat_SmallFrame.CHANNEL_FUBEN =7;