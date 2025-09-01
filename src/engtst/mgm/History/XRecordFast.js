
import GmConfig from "../../../config/GmConfig"
import PackageTools from "../../../engine/PackageTools"
import GmPlay from "../../../engtst/mgm/GmPlay"
import PrivateChatWatch from "../../../engtst/mgm/gameing/chat/privatechat/PrivateChatWatch"
import SystemOperate from "../../../engtst/mgm/gameing/fast/SystemOperate"
import GmMe from "../../../engtst/mgm/gameing/me/GmMe"
import XDefine from "../../../config/XDefine";

export default class XRecordFast {
	
	constructor( p)
	{
		this.pls=new PackageTools(1024*512);
		
		var i;
		this.v=0;
		this.iUserCount=0;
		this.sUser=new Array(5);//
		this.sPass=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.sUser[i]="";
			this.sPass[i]="";
		}
		XRecordFast.iGuideFlags=new Int32Array(16);//
		for(i=0;i<16;i++)XRecordFast.iGuideFlags[i]=0;
		XRecordFast.iExtHelp=1;//普通引导
		XRecordFast.iQQSay=0;
	}
	
	SaveTo( fn)
	{
		var i;
		this.pls.iOffset=0;
		this.pls.InsertByte(this.v);
		this.pls.InsertByte(this.iUserCount);
		for(i=0;i<this.iUserCount;i++)
		{
			this.pls.InsertString(this.sUser[i]);
			this.pls.InsertString(this.sPass[i]);
		}
		if(this.bSaveUser)this.pls.InsertByte(1);
		else this.pls.InsertByte(0);
		if(this.bSavePass)this.pls.InsertByte(1);
		else this.pls.InsertByte(0);
		
		for(i=0;i<16;i++)this.pls.InsertInt(XRecordFast.iGuideFlags[i]);
		
		if(SystemOperate.bShowName)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		if(SystemOperate.bShowRole)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		if(SystemOperate.bShowSell)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		
		this.pls.InsertByte(SystemOperate.iNearRoleCount);
		this.pls.InsertByte(SystemOperate.iPictureQuality);
		this.pls.InsertByte(SystemOperate.iPictureBuffer);
		this.pls.InsertByte(SystemOperate.iRenderType);
		
		if(GmPlay.bCheckRes)this.pls.InsertByte(1);
		else this.pls.InsertByte(0);
		
		this.pls.InsertByte(SystemOperate.iMusic);
		this.pls.InsertByte(SystemOperate.iSound);
		
		this.pls.InsertByte(XRecordFast.iHaveSeverRecord);
		this.pls.InsertInt(XRecordFast.iLastSector);
		this.pls.InsertInt(XRecordFast.iLastSever);
		
		this.pls.InsertByte(SystemOperate.iWheel);
		
		this.pls.InsertInt(SystemOperate.iSameRate);
		this.pls.InsertInt(SystemOperate.iScreenLS);
		if(SystemOperate.iScreenLS<0 || SystemOperate.iScreenLS>400)SystemOperate.iScreenLS=0;
		this.pls.InsertInt(XRecordFast.iClientID);
		
		this.pls.InsertInt(XRecordFast.iExtHelp);
		this.pls.InsertInt(XRecordFast.iQQSay);
//		for(i=0;i<10;i++)GmPlay.sop("save XRecordFast.XRecordFast.iExtHelp="+XRecordFast.XRecordFast.iExtHelp);
		
		if(SystemOperate.bShowMount)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		if(SystemOperate.bShowWeapon)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		if(SystemOperate.bShowColor)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		if(SystemOperate.bShowFollow)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		if(SystemOperate.bShowTitle)this.pls.InsertByte(0);
		else this.pls.InsertByte(1);
		
		this.pls.InsertInt(XRecordFast.iPublicVoiceShow);
		this.pls.InsertByte(XRecordFast.iPrivateChatMode);
		
		this.pls.InsertInt(XRecordFast.iFilterChannel);
		this.pls.InsertInt(XRecordFast.iAutoPlay);
		this.pls.InsertInt(XRecordFast.iFastVoice);
		this.pls.iLength=this.pls.iOffset;
		this.pls.JS_DataToLocal(fn);
		XDefine.sop("SaveTo 1"+SystemOperate.iMusic+","+SystemOperate.iSound);
	}
	ReadFrom( fn)
	{
		var i;
		XDefine.sop("ReadFrom 1");
		if(!this.pls.JS_DataFromLocal(fn))//cxunmz
		{//第一次进入游戏，初始化数据
			console.log('初始存储数据')
			XRecordFast.iFirstOpen=true;
			this.SaveTo(fn);
			if(!this.pls.JS_DataFromLocal(fn))
			{
				XDefine.sop("ReadFrom 2");
				return;
			}
		}
		XDefine.sop("ReadFrom 3");
		this.v=this.pls.GetNextByte();
		this.iUserCount=this.pls.GetNextByte();//记录的用户数量
		for(i=0;i<this.iUserCount;i++)
		{
			this.sUser[i]=this.pls.GetNextString();
			this.sPass[i]=this.pls.GetNextString();
		}
		if(this.pls.GetNextByte()==0)this.bSaveUser=false;
		else this.bSaveUser=true;
		if(this.pls.GetNextByte()==0)this.bSavePass=false;
		else this.bSavePass=true;
		
		for(i=0;i<16;i++)XRecordFast.iGuideFlags[i]=this.pls.GetNextInt();
//		for(i=0;i<16;i++)XRecordFast.iGuideFlags[i]=0;
		
		if(this.pls.GetNextByte()==0)SystemOperate.bShowName=true;
		else SystemOperate.bShowName=false;
		if(this.pls.GetNextByte()==0)SystemOperate.bShowRole=true;
		else SystemOperate.bShowRole=false;
		if(this.pls.GetNextByte()==0)SystemOperate.bShowSell=true;
		else SystemOperate.bShowSell=false;
//		GmPlay.sop("aa"+this.bSaveUser+"bb"+this.bSavePass);
//		GmPlay.sop("Load "+fn+" OK");
//		this.iUserCount=1;
//		this.sUser[0]="userb";
//		this.sPass[0]="pass";
		SystemOperate.iNearRoleCount=this.pls.GetNextByte();
		SystemOperate.iNearRoleCount=25;
		SystemOperate.iPictureQuality=this.pls.GetNextByte();
		SystemOperate.iPictureQuality=1;
		SystemOperate.iPictureBuffer=this.pls.GetNextByte();//
		SystemOperate.iPictureBuffer=50;//每次启动设置为50
		SystemOperate.iRenderType=this.pls.GetNextByte();
		SystemOperate.iRenderType=1;//渲染模式固定为1

		if(SystemOperate.iNearRoleCount<5)SystemOperate.iNearRoleCount=5;
		
		if(GmConfig.SYSW<=800)i=10;
		else if(GmConfig.SYSW<1280)i=25;
		else if(GmConfig.SYSW==1280)i=40;
		else i=50;
		
		if(this.pls.GetNextByte()==1)
		{
			GmPlay.bCheckRes=true;
			
			if(SystemOperate.iNearRoleCount>20)SystemOperate.iNearRoleCount-=10;
			else SystemOperate.iNearRoleCount=10;
			
//			if(SystemOperate.iPictureBuffer>i)SystemOperate.iPictureBuffer=i;
//			else if(SystemOperate.iPictureBuffer>5)SystemOperate.iPictureBuffer-=5;
//			else SystemOperate.iPictureBuffer=0;
		}
		else
		{
			GmPlay.bCheckRes=false;
//			if(SystemOperate.iPictureBuffer<i)
		}
		if(XRecordFast.iFirstOpen)
		{
			SystemOperate.iPictureBuffer=i;
		}
		
		SystemOperate.iMusic=this.pls.GetNextByte();
		SystemOperate.iSound=this.pls.GetNextByte();
		
		XRecordFast.iHaveSeverRecord=this.pls.GetNextByte();
		XRecordFast.iLastSector=this.pls.GetNextInt();
		XRecordFast.iLastSever=this.pls.GetNextInt();
		
		SystemOperate.iWheel=this.pls.GetNextByte();
		
		SystemOperate.iSameRate=this.pls.GetNextInt();
		SystemOperate.iSameRate=0;
		SystemOperate.iScreenLS=this.pls.GetNextInt();
		if(GmConfig.SYSW>=1280)SystemOperate.iScreenLS=(1280-800)*400/(GmConfig.SYSW-800);
		else SystemOperate.iScreenLS=(GmConfig.SYSW-800)*400/(1280-800);
		
		XRecordFast.iClientID=this.pls.GetNextInt();
		
		XRecordFast.iExtHelp=this.pls.GetNextInt();
		XRecordFast.iQQSay=this.pls.GetNextInt();
//		for(i=0;i<10;i++)GmPlay.sop("load XRecordFast.XRecordFast.iExtHelp="+XRecordFast.XRecordFast.iExtHelp);
//		GmPlay.sop("read XRecordFast.iExtHelp="+XRecordFast.iExtHelp);
		
		if(this.pls.GetNextByte()==0)SystemOperate.bShowMount=true;
		else SystemOperate.bShowMount=false;
		if(this.pls.GetNextByte()==0)SystemOperate.bShowWeapon=true;
		else SystemOperate.bShowWeapon=false;
		if(this.pls.GetNextByte()==0)SystemOperate.bShowColor=true;
		else SystemOperate.bShowColor=false;
		if(this.pls.GetNextByte()==0)SystemOperate.bShowFollow=true;
		else SystemOperate.bShowFollow=false;
		if(this.pls.GetNextByte()==0)SystemOperate.bShowTitle=true;
		else SystemOperate.bShowTitle=false;
		
//		SystemOperate.bShowName=true;
//		SystemOperate.bShowRole=true;
//		SystemOperate.bShowSell=true;

		if(SystemOperate.iPictureQuality==0)SystemOperate.iPictureBuffer=50;
		else if(SystemOperate.iPictureQuality==1)SystemOperate.iPictureBuffer=25;
		else SystemOperate.iPictureBuffer=0;
		
		XRecordFast.iPublicVoiceShow=this.pls.GetNextInt();
		XRecordFast.iPrivateChatMode=this.pls.GetNextByte();
		
		if(this.pls.iOffset>=this.pls.iLength)XRecordFast.iFilterChannel=255;
		else XRecordFast.iFilterChannel=this.pls.GetNextInt();
		
		if(this.pls.iOffset>=this.pls.iLength)XRecordFast.iAutoPlay=0;
		else XRecordFast.iAutoPlay=this.pls.GetNextInt();

		if(this.pls.iOffset>=this.pls.iLength)XRecordFast.iFastVoice=3;
		else XRecordFast.iFastVoice=this.pls.GetNextInt();
	}
	
	SavePrivateChat()
	{//保存watch过的记录chatrecord_rid.dat
		var i,j;
		var ps=PrivateChatWatch.gi();
		this.pls.iOffset=0;
		for(i=0;i<ps.iMessageCount;i++)
		{
			if(ps.pms[i].bWatched)
			{
				this.pls.InsertInt(ps.pms[i].iRid);//from
				this.pls.InsertString(ps.pms[i].sName);
				this.pls.InsertByte(ps.pms[i].iRax);
				this.pls.InsertInt(ps.pms[i].iDRid);//to
				this.pls.InsertString(ps.pms[i].sTime);
				this.pls.InsertString(ps.pms[i].sDetail);
				for(j=1;j<5;j++)
				{
					this.pls.InsertByte(ps.pms[i].exts[j].type);
					switch(ps.pms[i].exts[j].type)
					{
					case 0://物品
					case 1://宠物
						this.pls.InsertInt(ps.pms[i].exts[j].eid);
						this.pls.InsertShort(ps.pms[i].exts[j].tid);
						break;
					case 2://语音
						this.pls.InsertInt(ps.pms[i].exts[j].eid);
						this.pls.InsertString(ps.pms[i].exts[j].name);
						this.pls.InsertString(ps.pms[i].exts[j].detail);
						break;
					}
				}
			}
		}
		this.pls.InsertInt(123454321);
		this.pls.JS_DataFromLocal("recordchat_"+GmMe.me.iRid+".dat");
	}

	ReadPrivateChat()
	{//进入游戏，获得rid时，载入记录chatrecord_rid.dat
		if(!this.pls.JS_DataFromLocal("recordchat_"+GmMe.me.iRid+".dat"))return;
		var i,j;
//		for(i=0;i<100;i++)GmPlay.sop("-------");
		var ps=PrivateChatWatch.gi();
		for(i=0;i<PrivateChatWatch.MAXMESSAGE;i++)
		{
			j=this.pls.GetNextInt();
			if(j==123454321)break;
			ps.pms[i].iRid=j;//from
			ps.pms[i].sName=this.pls.GetNextString();
			ps.pms[i].iRax=this.pls.GetNextByte();
			ps.pms[i].iDRid=this.pls.GetNextInt();//to
			ps.pms[i].sTime=this.pls.GetNextString();
			ps.pms[i].sDetail=this.pls.GetNextString();
			ps.pms[i].exts[0].type=3;//自己名字
			ps.pms[i].exts[0].eid=ps.pms[i].iRid;
			for(j=1;j<5;j++)
			{
				ps.pms[i].exts[j].type=this.pls.GetNextByte();
				switch(ps.pms[i].exts[j].type)
				{
				case 0://物品
				case 1://宠物
					ps.pms[i].exts[j].eid=this.pls.GetNextInt();
					ps.pms[i].exts[j].tid=this.pls.GetNextShort();
					break;
				case 2://语音
					ps.pms[i].exts[j].eid=this.pls.GetNextInt();
					ps.pms[i].exts[j].name=this.pls.GetNextString();
					ps.pms[i].exts[j].detail=this.pls.GetNextString();
					break;
				}
			}
			ps.pms[i].bWatched=true;
			ps.pms[i].iSession=0;
		}
//		GmPlay.sop("-------"+i);
		ps.iMessageCount=i;
	}
}

XRecordFast.iGuideFlags;
XRecordFast.iExtHelp;
 XRecordFast.iQQSay;

 XRecordFast.iHaveSeverRecord=0;
XRecordFast.iLastSector=0;
XRecordFast.iLastSever=0;
XRecordFast.iClientID=0;
XRecordFast.sLastSeverName="";

XRecordFast.iPublicVoiceShow=1;//快捷语音图标显示开关
XRecordFast.iPrivateChatMode=0;//私聊对话框模式0小框，1带记录
 XRecordFast.iFilterChannel=255;//全开
XRecordFast.iAutoPlay=0;//全关
XRecordFast.iFastVoice=3;//当前，队伍

XRecordFast.iFirstOpen=false;