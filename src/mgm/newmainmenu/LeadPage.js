
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.security.MessageDigest;
//import java.security.NoSuchAlgorithmException;

//import android.content.Intent;
//import android.net.Uri;

import main from "../../System/Interface/uc/main"

import GameVersion from "../../zero/Interface/GameVersion"
import PublicInterface from "../../zero/Interface/PublicInterface"

import MainMenu from "../../mgm/mainmenu/MainMenu"
import _DOWNFILE from "../../mgm/mainmenu/download/_DOWNFILE"
import _DOWNLOAD from "../../mgm/mainmenu/download/_DOWNLOAD"

import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"

import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButtonEx2 from "../../engine/control/XButtonEx2"
import M3DFast from "../../engine/graphics/M3DFast"
import GmPlay from "../../engtst/mgm/GmPlay"
import XStat from "../../engtst/mgm/XStat"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import FormatString from "../../engtst/mgm/frame/format/FormatString"
import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate"
import M2DFast from "../../engine/graphics/M2DFast";
import XOLE from "../../ui/XOLE";

class _CHECKFILE
{
//	public String sName,sMd5;
constructor()
{

}
}

export default class LeadPage  extends BaseClass {

	GetFreeDownload()
	{
		var i;
		for(i=0;i<this.MAXTHREAD;i++)
		{
			if(this.downlist[i].bwaiting())return this.downlist[i];
		}
		return null;
	}
	
	constructor()
	{
		super();
		this.iStat=0;
		LeadPage.sLeadAddr="http://"+GameData.sDSURL+":9999/"
		LeadPage.sResAddr="http://"+GameData.sDSURL+":7999/7gol_test/";
		LeadPage.sLeadAddr=XDefine.BASE_URL;
		this.pls=new PackageTools(256*1024);
		LeadPage.sResSeverList=new Array(16);




		this.MAXTHREAD=8;
		this.background=-1;
		
		this.iLocalApkVersion=GameData.APKVersion;
		//if(this.pls.InitDataFromSD(GameData.sSDTo+"currentversion.dat"))this.iLocalResVersion=this.pls.GetNextInt();//读取本地资源版本号
		//else 
		this.iLocalResVersion=0;
		
		this.iNewApkVersion=-1;
		this.iNewResVersion=-1;
		/*
		this.down_lead=new _DOWNFILE();
		this.down_lead.InitData("lead.dat", null, 0);
		this.down_resfrom=new _DOWNFILE();
		this.down_resfrom.InitData("resfrom.dat", null, 0);
		this.down_apkfrom=new _DOWNFILE();
		this.down_apkfrom.InitData("apkfrom.dat", null, 0);
		
		this.down_apkaddr=new _DOWNFILE();
		this.down_apkaddr.InitData("apkaddr.dat", null, 0);
		
		this.down_apk=new _DOWNFILE();
//		this.down_apk.InitData("apkaddr.dat", null, 0);
		
		this.down_detail=new _DOWNFILE();
		this.down_detail.InitData("updatedetail.dat", null, 0);
		*/
		var i;
		this.downlist=new Array(this.MAXTHREAD);//
		for(i=0;i<this.MAXTHREAD;i++)
		{
			this.downlist[i]=new _DOWNLOAD();
		}
		
		this.bCheckFinish=false;
		///this.thread_check=new Thread(this);
		///this.thread_check.start();
		
	
		///	LeadPage.digest = MessageDigest.getInstance("MD5");

		
		this.btn_ok=new XButtonEx2(GmPlay.xani_local);
		this.btn_ok.InitButton("通用按钮1");
		this.btn_ok.sName="确  定";
		this.btn_ok.iNameSize=SystemOperate.WordSize(30);
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_local);
		this.btn_cancel.InitButton("通用按钮1");
		this.btn_cancel.sName="取  消";
		this.btn_cancel.iNameSize=SystemOperate.WordSize(30);
		
		

		this.sDetail="";
		this.iProcTo=-1;
		this.iRetry=5;
		this.sError="";
		this.MAXBUF=1024*64;
		this.iThreadStat=0;
		this.iCheckProc=0;
	}
	dpics( type)
	{
		if(this.background<0)
		{
			var i= XDefine.grnd(0,5);
			this.background=M3DFast.gi().LoadFromFile("localres/logo/kj"+i+".xxx",-1,true);
		}
		
		M3DFast.gi().DrawImageEx(0, 0, 0, this.background, 0, 0, 1280, 720, 101, SystemOperate.BASEW/1280, 1, 0, 0, 0);
	}
	
	// LoadFinished(path,p,stat,data)
	// {
	// 	if(data==null)
	// 	{
	// 		XDefine.sop("Load Fail , Retry ..."+path);
	// 		Ld(path,Laya.Handler.create(p, p.LoadFinished,[path,p,stat]),null,stat==20?Laya.Loader.BUFFER:Laya.Loader.TEXT);
	// 		return;
	// 	}
	// 	switch(stat)
	// 	{
	// 	case 20:

	// 		break;
	// 	case 22:
	// 		this.bLoadFinished22=true;
	// 		XOLE.data_all=data.split("*");
	// 		break;
	// 	}
	// }
	LoadProc(pt)
	{
		console.log("proc to : "+pt);
	}
	LoadLeadData(path,data)
	{
		if(data==null)
		{
			Laya.loader.load(path,Laya.Handler.create(this, this.LoadLeadData,[path]),null,Laya.Loader.BUFFER);
			return;
		}
		this.bLoadFinished20=true;
		this.pls.GetData3(data);
		this.iNewApkVersion=this.pls.GetNextInt();
		this.iNewResVersion=this.pls.GetNextInt();
		var i=this.pls.GetNextInt();
		if(GameVersion.QUDAO==0)this.iNewResVersion=i;
		GmPlay.sLoginIp=this.pls.GetNextString();//login ip;
		GmPlay.iLoginPort=this.pls.GetNextInt();//login port
		XDefine.sop(GmPlay.sLoginIp+"==="+GmPlay.iLoginPort);
	}
	Draw()
	{
		var i,j,k;
		
		this.dpics(0);//画背景
		M3DFast.gi().CheckImageLoaded();
//		if(GameData.bShowAbout)
//		{
//			M3DFast.gi().DrawTextEx(12,18, "当前版本：v1.9.15", 0xffffffff, 28, 101, 1, 1, 0, 0, 0);//当前版本号：1.客户端版本.资源版本
/////			if(this.iNewApkVersion>=0)M3DFast.gi().DrawTextEx(12,58, "最新版本：1."+this.iNewApkVersion+"."+this.iNewResVersion, 0xffffffff, 28, 101, 1, 1, 0, 0, 0);//当前版本号			
//		}
//		else
//		{
		M3DFast.gi().DrawTextEx(12,18, "当前版本：1."+this.iLocalApkVersion+"."+this.iLocalResVersion, 0xffffffff, 28, 101, 1, 1, 0, 0, 0);//当前版本号：1.客户端版本.资源版本
		if(this.iNewApkVersion>=0)M3DFast.gi().DrawTextEx(12,58, "最新版本：1."+this.iNewApkVersion+"."+this.iNewResVersion, 0xffffffff, 28, 101, 1, 1, 0, 0, 0);//当前版本号
//		}
//		if(GameVersion.QUDAO==0)M3DFast.gi().DrawTextEx(600,18, "调试信息："+this.iStat, 0xffffffff, 28, 101, 1, 1, 0, 0, 0);

		M3DFast.gi().DrawTextEx(GmConfig.SCRW-168,0, "健康游戏忠告", 0xffffffff, 25, 101, 1, 1, 0, -2, 0);
		M3DFast.gi().DrawTextEx(GmConfig.SCRW,30, "抵制不良游戏，拒绝盗版游戏。", 0xffffffff, 25, 101, 1, 1, 0, -3, 0);
		M3DFast.gi().DrawTextEx(GmConfig.SCRW,30*2, "注意自我保护，谨防受骗上当。", 0xffffffff, 25, 101, 1, 1, 0, -3, 0);
		M3DFast.gi().DrawTextEx(GmConfig.SCRW,30*3, "适度游戏益脑，沉迷游戏伤身。", 0xffffffff, 25, 101, 1, 1, 0, -3, 0);
		M3DFast.gi().DrawTextEx(GmConfig.SCRW,30*4, "合理安排时间，享受健康生活。", 0xffffffff, 25, 101, 1, 1, 0, -3, 0);

		if(!LeadPage.bInited)
		{
			M3DFast.gi().DrawTextEx(5,GmConfig.SCRH-5, "正在初始化", 0xffffffff, 28, 101, 1, 1, 0, 0, -3);
			LeadPage.bInited=true;//cx_flag等待渠道登陆成功后设置为true
			return;
		}
		switch(this.iStat)
		{
		case 0://判断是否首次登陆,并且有资源包
			this.iStat=20;//已有目录，直接检测资源版本
			this.sDetail="正在打开";
			break;
		case 20://获取本地资源版本号，下载版本校验文件
			XDefine.sop(LeadPage.sLeadAddr+"lead.dat");
			this.LoadLeadData(LeadPage.sLeadAddr+"lead.dat");
			this.bLoadFinished20=false;
			this.iStat=21;
			this.sDetail="正在获取版本信息，请保持网络畅通";
			break;
		case 21://获取版本校验文件进行对比
			if(this.bLoadFinished20)
			{//版本文件下载完，打开校验
				this.iStat=102;
				// XDefine.sop(LeadPage.sLeadAddr+"res/data.b64");
				// Ld(LeadPage.sLeadAddr+"res/data.b64",Laya.Handler.create(this, this.LoadFinished,[LeadPage.sLeadAddr+"res/data.b64",this,22]),Laya.Handler.create(this, this.LoadProc),Laya.Loader.TEXT);
				// this.bLoadFinished22=false;
			}

			//if(this.down_lead.iFileSize>0)this.iProcTo=this.down_lead.iProc*100/this.down_lead.iFileSize;
			this.sDetail="正在对比版本信息，请保持网络畅通";
			break;
		case 22://下载数据包
			if(this.bLoadFinished22)
			{
				this.iStat=102;
			}
			this.sDetail="载入中";
			break;
		// case 30://获取资源下载地址
		// 	if(this.pls.bLoadSuccess)
		// 	{//版本文件下载完，打开校验
		// 			LeadPage.iResSeverCount=this.pls.GetNextInt();
		// 			for(i=0;i<LeadPage.iResSeverCount;i++)
		// 			{
		// 				LeadPage.sResSeverList[i]=this.pls.GetNextString();//资源路径
		// 				if(GameVersion.QUDAO==0)
		// 				{
		// 					LeadPage.sResSeverList[i]="http://"+GameData.sDSURL+":7999/7gol_test/";
		// 				}
		// 			}
		// 			LeadPage.iResSeverPoint=0;
		// 			this.iStat=31;//开始检测资源
		// 	}
		// 	//if(this.down_resfrom.iFileSize>0)this.iProcTo=this.down_resfrom.iProc*100/this.down_resfrom.iFileSize;
		// 	this.sDetail="正在获取资源地址，请保持网络畅通";
		// 	break;
		// case 31://下载资源检查对比文件detail.dat
		// 	this.pls.InitDataFromURL(LeadPage.sResSeverList[LeadPage.iResSeverPoint]+"updatedetail.dat",this.LoadFinished);
		// 	this.iStat=32;
		// 	this.sDetail="正在获取资源列表，请保持网络畅通";
		// 	break;
		// case 32://等待detail下载完
		// 	if(this.pls.bLoadSuccess)
		// 	{//版本文件下载完，打开校验
		// 			this.pls.GetNextInt();//资源版本
		// 			this.pls.GetNextInt();//apk版本
		// 			j=this.pls.GetNextInt();//目录数
		// 			this.iNewFileCount=this.pls.GetNextInt();//文件数
		// 			if(this.iNewFileCount<500)
		// 			{
		// 				this.iStat=200;
		// 				this.sError="E8";
		// 				break;
		// 			}
					
		// 			for(i=0;i<j;i++)
		// 			{//目录列表
		// 				this.pls.GetNextString();
		// 			}
					
		// 			//新文件列表
		// 			this.newfiles=new Array(this.iNewFileCount);//
		// 			for(i=0;i<this.iNewFileCount;i++)
		// 			{
		// 				this.newfiles[i]=new Object();
		// 				this.newfiles[i].sName=this.pls.GetNextString();
		// 				this.newfiles[i].sMD5=this.pls.GetNextString();
		// 				this.newfiles[i].iFileSize=this.pls.GetNextInt();
		// 				//if(i<500)XDefine.sop(i+","+this.newfiles[i].sName+","+this.newfiles[i].sMD5+","+this.newfiles[i].iFileSize);
		// 			}
		// 			this.iStat=103;
		// 	}
		// 	//if(this.down_detail.iFileSize>0)this.iProcTo=this.down_detail.iProc*100/this.down_detail.iFileSize;
		// 	this.sDetail="正在获取资源列表，请保持网络畅通";
		// 	break;
		case 102:
			if(GmPlay.gi().InitAnimaAndData())this.iStat=103;
			this.sDetail="正在载入数据，请保持网络畅通";
			break;
		case 103://正在连接服务器
			if(PublicInterface.QUDAO!=0)
			{
				if(PublicInterface.gi().iStat==10)
				{
					
				}
			}
			else if(GmPlay.xntf.bConnected)
			{
				XStat.gi().PopStat(1);
				XStat.gi().PushStat(XStat.GS_FASTLOGIN);
				return;
			}
			this.sDetail="正在登陆";
			break;
		case 200://显示错误信息
			DrawMode.local_titleframe(GmConfig.SCRW/2-200, GmConfig.SCRH/2-150, 400, 300,true);
			M3DFast.gi().DrawText_2(GmConfig.SCRW/2, GmConfig.SCRH/2-150+SystemOperate.WordSize(40), "提  示", 0xfffaffcc, SystemOperate.WordSize(50), 101, 1, 1, 0, -2, -2,4,0xff056070);
//			FormatString.gi().Format("#cfaffcc"+this.sDetail, 340, SystemOperate.WordSize(30));
			FormatString.gi().FormatEx("#cfaffcc"+this.sDetail, 340, SystemOperate.WordSize(30), 0, 0, SystemOperate.WordSize(35));
			FormatString.gi().Draw(GmConfig.SCRW/2-170, GmConfig.SCRH/2-150+100);
			this.btn_ok.Move(GmConfig.SCRW/2-100-141/2, GmConfig.SCRH/2+150-49-40, 141, 49);
			this.btn_ok.Draw();
			this.btn_cancel.Move(GmConfig.SCRW/2+100-141/2, GmConfig.SCRH/2+150-49-40, 141, 49);
			this.btn_cancel.Draw();
			this.sDetail=this.sError;
			break;
		}
		if(this.iProcTo>=0)
		{
			if(this.iProcTo>100)this.iProcTo=100;
			GmPlay.xani_local.DrawAnima(GmConfig.SCRW-100,GmConfig.SCRH-50, "跑步载入", GmPlay.iDelay);
			M3DFast.gi().DrawTextEx(GmConfig.SCRW-100,GmConfig.SCRH-50+20, (this.iProcTo)+"%", 0xffffffff, 28, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().FillRect_2D(0, GmConfig.SCRH-2,  (this.iProcTo*GmConfig.SCRW/100), GmConfig.SCRH, 0xffffff00);
		}
		if(this.iStat!=200)
		{
			switch((GmPlay.iDelay/5)%3)
			{
			case 0:
				this.sDetail+=".";
				break;
			case 1:
				this.sDetail+="..";
				break;
			case 2:
				this.sDetail+="...";
				break;
			}
		}
		M3DFast.gi().DrawTextEx(5,GmConfig.SCRH-5, this.sDetail, 0xffffffff, 28, 101, 1, 1, 0, 0, -3);
	}
	ProcTouch( msg, x, y)
	{
		if(this.iStat==200)
		{
			if(this.btn_ok.ProcTouch(msg, x, y))
			{
				if(this.btn_ok.bCheck())
				{
					this.iStat=0;
				}
			}
			if(this.btn_cancel.ProcTouch(msg, x, y))
			{
				if(this.btn_cancel.bCheck())
				{
					PublicInterface.gi().Exit();
				}
			}
		}
		return false;
	}



	run() {
		var i,j;
		while(LeadPage.bProcThread)
		{
			if(this.iThreadStat==1)
			{//解压
				var FOS;
				var ins;
				for(i=0;i<this.iNewFileCount;i++)
				{
					this.iProcTo=i*100/this.iNewFileCount;

						ins=this.pls.mRes.getAssets().open("datapackage/"+this.newfiles[i].sName);
						FOS = new FileOutputStream(GameData.sSDTo+this.newfiles[i].sName);
						while(true)
						{
							j=ins.read(this.pls.databuf, 0, 1024*256);
							if(j<=0)break;
							FOS.write(this.pls.databuf, 0, j);
						}
						FOS.close();
						ins.close();

				}
				this.iThreadStat=0;
				this.bCheckFinish=true;
			}
			if(this.iThreadStat==2)
			{//下载更新
				this.iUpdateLength=0;
				this.iUpdateFileCount=this.iNewFileCount;
				this.iProcLength=0;
				this.iProcFileCount=0;
				for(i=0;i<this.iNewFileCount;i++)
				{
//					if(GameData.APKVersion>=iApkVersion || !GameData.bAutoUpdateAPK)
					{//本地客户端版本 >= 服务器版本，不自动更新
						if(this.newfiles[i].sName=="7gol.apk")
						{
							this.newfiles[i].iFlag=50;
							this.iUpdateFileCount--;
							continue;
						}
					}

					this.newfiles[i].iFlag=0;//需要更新
					this.iUpdateLength+=this.newfiles[i].iFileSize;
				}
				this.iCheckProc=0;
				this.indir(new File(GameData.sSDTo));
				this.iThreadStat=0;
				this.bCheckFinish=true;
			}
			if(this.iThreadStat==3)
			{
				GmPlay.gp.InitAnimaAndData();
				this.iThreadStat=0;
				this.bCheckFinish=true;
			}
	
				Thread.sleep(100);

		}
	}
	indir( dir)
	{
		var i;
		var flist=dir.listFiles();
		for(i=0;i<flist.length;i++)
		{
			if(flist[i].isDirectory())this.indir(flist[i]);
			else LeadPage.checkfile(flist[i]);
		}
	}
	 
	checkfile( f)
	{
		var i;
		this.iCheckProc++;
		this.iProcTo=this.iCheckProc*100/this.iNewFileCount;
		var name=f.getPath();
		var md5;
		var iFileSize=0;
		var _in = null;
		
		name=name.substring(GameData.sSDTo.length, name.length);
		this.sChecking=name;
		var len;

		    _in = new FileInputStream(f);
		    LeadPage.digest.reset();
		    while ((len = _in.read(LeadPage.mybuf)) != -1)
		    {
			     LeadPage.digest.update(LeadPage.mybuf, 0, len);
			     iFileSize+=len;
		    }
		    md5=XDefine.toHexString(LeadPage.digest.LeadPage.digest());
		    _in.close();

		//正常情况，跟newfile比对
		for(i=0;i<this.iNewFileCount;i++)
		{
			if(this.newfiles[i].iFlag==50)continue;
			if(this.newfiles[i].iFileSize==iFileSize)
			{//长度相同
				if(this.newfiles[i].sMD5.equals(md5))
				{//校验相同
					if(this.newfiles[i].sName.equals(name))
					{//名字相同
						this.newfiles[i].iFlag=50;//不需要更新
						this.iUpdateFileCount--;
						this.iUpdateLength-=this.newfiles[i].iFileSize;
						return;
					}
				}
			}
		}
		//没有找到对应，删除此文件//f.delete();//GmPlay.sop("delete "+name);
	}
	savecurrentversion()
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(this.iLocalResVersion);
		this.pls.SaveDataToSD(GameData.sSDTo+"currentversion.dat");
		//保存同步版本号
		//保存所有文件对应md5
		var i;
		this.pls.iOffset=0;
		this.pls.InsertInt(this.iNewFileCount);
		for(i=0;i<this.iNewFileCount;i++)
		{
			this.pls.InsertString(this.newfiles[i].sName);
			this.pls.InsertString(this.newfiles[i].sMD5);
		}
		this.pls.SaveDataToSD(GameData.sSDTo+"currentcheck.dat");
	}
}
	LeadPage.iCheckCount;
	LeadPage.iProcDest;
	LeadPage.iResSeverCount=0,LeadPage.iResSeverPoint=0;

	LeadPage.apk_path;
	LeadPage.apk_name;

	LeadPage.checkfile;
	LeadPage.CheckFile=function( fn)
	{
		var i;
		var smd5=getFileMD5(new File(GameData.sSDTo+fn));
		for(i=0;i<LeadPage.iCheckCount;i++)
		{
			if(fn==LeadPage.checkfile[i].sName)
			{
				if(smd5==LeadPage.checkfile[i].sMd5)return true;
				else break;
			}
		}
		//校验出错，关闭客户端
		var f=new File(GameData.sSDTo+"currentversion.dat");
		f.delete();
		PublicInterface.gi().Exit();
		return false;
	}
	LeadPage.getFileMD5=function( file) 
	{
		if (!file.isFile())return "false";
		var ss;
		var _in = null;
		var len;

		    _in = new FileInputStream(file);
		    LeadPage.digest.reset();
		    while ((len = _in.read(LeadPage.mybuf)) != -1) {
		     LeadPage.digest.update(LeadPage.mybuf, 0, len);
		    }
		    ss=XDefine.toHexString(LeadPage.digest.LeadPage.digest());
		    _in.close();

		return ss;
	}
	
	LeadPage.iProcDest;
//	int this.iProcTo=-1;

LeadPage.sLeadSeverList=["http://"+GameData.sDSURL+":6666/","http://115.28.16.199:9999/"];
	
LeadPage.iResSeverCount=0,LeadPage.iResSeverPoint=0;
LeadPage.sResSeverList=new Array(6);//

LeadPage.digest;

LeadPage.bInited=false;

LeadPage.mybuf=new Int8Array(1024*64);
	
LeadPage.bProcThread=true;