
//import java.io.File;
//import java.util.ArrayList;
//import java.util.List;

import PublicInterface from "../../zero/Interface/PublicInterface"

//import com.yunva.im.sdk.lib.core.YunvaImSdk;
//import com.yunva.im.sdk.lib.event.MessageEvent;
//import com.yunva.im.sdk.lib.event.MessageEventListener;
//import com.yunva.im.sdk.lib.event.MessageEventSource;
//import com.yunva.im.sdk.lib.event.RespInfo;
//import com.yunva.im.sdk.lib.event.msgtype.MessageType;
//import com.yunva.im.sdk.lib.model.tool.ImAudioPlayResp;
//import com.yunva.im.sdk.lib.model.tool.ImAudioRecognizeResp;
//import com.yunva.im.sdk.lib.model.tool.ImAudioRecordResp;
//import com.yunva.im.sdk.lib.model.tool.ImUploadFileResp;
//import com.yunva.im.sdk.lib.model.tool.RecordVolumeNotify;

import GameData from "../../config/GameData"

import GmMe from "../../engtst/mgm/gameing/me/GmMe"

export default class VoiceInterface {
	constructor()
	{

	}
	Init()
	{
		return;
		var ret;
		com.yunva.im.sdk.lib.YvLoginInit.context=PublicInterface.mMain; 
		ret=com.yunva.im.sdk.lib.YvLoginInit.initApplicationOnCreate(PublicInterface.mMain.getApplication(), "1000242");
		GmPlay.sop("init voice 1 = "+ret);
		
		ret=YunvaImSdk.getInstance().init(PublicInterface.mMain, "1000242",  GameData.sSDTo+"yy_voice",false);
		GmPlay.sop("init voice 2 = "+ret);
		
		MessageEventSource.getSingleton().addLinstener(MessageType.IM_RECORD_STOP_RESP, this);
		MessageEventSource.getSingleton().addLinstener(MessageType.IM_RECORD_FINISHPLAY_RESP, this);
		MessageEventSource.getSingleton().addLinstener(MessageType.IM_UPLOAD_FILE_RESP, this);
		MessageEventSource.getSingleton().addLinstener(MessageType.IM_RECORD_VOLUME_NOTIFY, this);
		MessageEventSource.getSingleton().addLinstener(MessageType.IM_SPEECH_STOP_RESP, this);
		
//		YunvaImSdk.getInstance().setAppVesion("1.0.0");
		YunvaImSdk.getInstance().setRecordConfig(20,true, 2);
		
		YunvaImSdk.getInstance().setSpeech_language(1,0);//中文，简体
		
		this.CleanVoiceFile();
		//MessageEventSource.getSingleton().removeLinstener(this);
	}
	
	CleanVoiceFile()
	{
		return;
		var dir,f;
		dir=new File(GameData.sSDTo+"yy_voice");
		var children = dir.list();
		for (var i=0; i<children.length; i++)
		{
			if(children[i].indexOf(".amr")>0)
			{
				f=new File(dir, children[i]);
				f.delete();
			}
        }
	}
	Login( aid, rid)
	{
		return;
		/*
		List<String> channelList ;
		channelList  =new ArrayList<String>();
		//添加世界频道
		channelList.add("0x001");

		String tt="{\"uid\":\""+aid+"\",\"nickname\":\""+rid+"\"}";
		GmPlay.sop(tt);
		boolean ret=YunvaImSdk.getInstance().Binding(tt,"1",channelList);
		GmPlay.sop("Binding="+ret);*/
	}
	StartRecord()
	{
		return;
		/*
		String fn="v"+GmMe.me.iRid+"t"+XDefine.get_ms()+".amr";
		this.sRecordName=GameData.sSDTo+"yy_voice/"+fn;
		boolean ret=YunvaImSdk.getInstance().startAudioRecord(this.sRecordName,"123");
		GmPlay.sop("---------StartRecord------------"+ret);
		if(ret)
		{
			this.bRecording=true;
			GmPlay.x_wav.PauseAll();
		}
		return ret;*/
	}
	sGetRecordName()
	{
		return this.sRecordName;
	}

	StopRecord()
	{
		return;
		this.bRecording=false;
		this.sRecordName="empty";
		GmPlay.sop("----------StopRecord-----------"+YunvaImSdk.getInstance().stopAudioRecord());
		GmPlay.x_wav.ResumeAll();
	}
	PlayVoice()
	{
		return;
		GmPlay.x_wav.PauseAll();
		GmPlay.sop("----------PlayVoice-----------"+YunvaImSdk.getInstance().playAudio("", this.sRecordName, "123"));
	}
//	StopPlay()
//	{
//		YunvaImSdk.getInstance().stopPlayAudio();
//	}
	UpLoad()
	{
		return;
		this.sUrlName="empty";
		GmPlay.sop("----------UpLoad-----------"+YunvaImSdk.getInstance().uploadFile(this.sRecordName, "123456"));
	}
	PlayUrlVoice( url)
	{
		return;
		if(this.bPlaying)
		{
			if(this.sPlayingUrl==url)
			{//正在播放相同语音时，先停止播放
				YunvaImSdk.getInstance().stopPlayAudio();
				return;
			}
			GmPlay.sop("----------");
//			return;
		}
		GmPlay.x_wav.PauseAll();
		var ret=YunvaImSdk.getInstance().playAudio(url, "", "123");
		this.sPlayingUrl=url;
		GmPlay.sop("----------PlayUrlVoice-----------"+ret);		
		if(ret)this.bPlaying=true;
	}
	StartRecognize()
	{
		return;
		this.sRecognizeResult="empty";
		YunvaImSdk.getInstance().startAudioRecognize(this.sRecordName,"123");
	}
	
	handleMessageEvent( event) 
	{
		return;
		var msg=event.getMessage();
		GmPlay.sop("message--------------"+event.getbCode());
		switch (event.getbCode()) 
		{ 
		case MessageType.IM_RECORD_STOP_RESP://录音结束
			var iarp=msg.getResultBody();
			if(iarp.getExt().equals("123"))
			{
				this.sRecordName=iarp.getStrfilepath();
				this.iRecordTime=iarp.getTime();
				GmPlay.sop("----------record finish-----------"+this.sRecordName+",,,"+this.iRecordTime);
			}
			this.bRecording=false;
			break;
		case MessageType.IM_RECORD_FINISHPLAY_RESP://播放结束
			var iapr=msg.getResultBody();
			if(iapr.getExt().equals("123"))
			{
				GmPlay.sop("-----------play finish----------"+iapr.getResult()+","+iapr.getDescribe());
				this.bPlaying=false;
			}
			GmPlay.x_wav.ResumeAll();
			break;
			
		case MessageType.IM_UPLOAD_FILE_RESP://上传结束
			var iufr=msg.getResultBody();
			if(iufr.getFileId().equals("123456"))
			{
				GmPlay.sop("---------------------"+iufr.getResult()+","+iufr.getMsg()+","+iufr.getFileUrl()+","+iufr.getPercent()+"%");
				this.sUrlName=iufr.getFileUrl();
			}
			break;
		case MessageType.IM_RECORD_VOLUME_NOTIFY://声音大小通知
			var rvn=msg.getResultBody();
			GmPlay.sop("---------------------"+rvn.getExt()+","+rvn.getVolume());
			break;
		case MessageType.IM_SPEECH_STOP_RESP://语音识别结束
			var iarr=msg.getResultBody();
			this.sRecognizeResult=iarr.getResultInfo();
			GmPlay.sop("-------------------"+this.sRecognizeResult);
			break;
		}
	}
}
