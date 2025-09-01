
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.security.MessageDigest;
//import java.security.NoSuchAlgorithmException;

import GameVersion from "../../zero/Interface/GameVersion"
import PublicInterface from "../../zero/Interface/PublicInterface"

import _DOWNFILE from "../../mgm/mainmenu/download/_DOWNFILE"
import _DOWNLOAD from "../../mgm/mainmenu/download/_DOWNLOAD"

//import android.content.Intent;
//import android.net.Uri;

import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"

import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButton from "../../engine/control/XButton"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import XStat from "../../engtst/mgm/XStat"
import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate"

class _CHECKFILE
{
//	public String sName,sMd5;
constructor()
{

}
}

export default class MainMenu  extends BaseClass
{//检测更新
//	String DownSever="http://42.121.105.109:7999/7gol/";
//	String DownSever="http://115.28.16.199:7999/7gol/";


	 constructor( ani)
	{
		super();
		MainMenu.pics=new Array(3);//
		for(var i=0;i<3;i++)MainMenu.pics[i]=new Int32Array(2);
		MainMenu.pics[0][0]=-1;
		MainMenu.pics[0][1]=-1;
//		MainMenu.pics[1][0]=M3DFast.gi().LoadFromFile("bk/ba.xxx",-1,false);
//		MainMenu.pics[1][1]=M3DFast.gi().LoadFromFile("bk/bb.xxx",-1,false);
//		MainMenu.pics[2][0]=M3DFast.gi().LoadFromFile("bk/ca.xxx",-1,false);
//		MainMenu.pics[2][1]=M3DFast.gi().LoadFromFile("bk/cb.xxx",-1,false);
		var i;
		this.pm3f=M3DFast.xm3f;
		
		this.iStat=10;
		
		this.downlist=new Array(this.MAXTHREAD);//
		for(i=0;i<this.MAXTHREAD;i++)
		{
			this.downlist[i]=new _DOWNLOAD();
		}
		
		this.down_version=new _DOWNFILE();
		this.down_version.InitData("updateversion.dat", null, 0);
		this.down_detail=new _DOWNFILE();
		this.down_detail.InitData("updatedetail.dat", null, 0);
		
		this.down_apkversion=new _DOWNFILE();
		this.down_apkversion.InitData("apkversion.dat", null, 0);
		
		this.down_apk=new _DOWNFILE();
		this.down_apk.InitData("7gol.apk", null, 0);
		

			MainMenu.digest = MessageDigest.getInstance("MD5");

		this.pls=new PackageTools(128*1024);
		
		this.fPath = new File(GameData.sSDTo);
		if(!this.fPath.exists())
		{//没有目录，创建目录
			this.fPath.mkdir();
			
			this.iStat=0;//第一次安装，
		}
		if(!this.fPath.isDirectory())
		{
			this.fPath.delete();
			this.fPath.mkdir();
		}
		if(GmPlay.bCheckRes)
		{//删除三个文件，重新检测
			this.fPath=new File(GameData.sSDTo+"currentcheck.dat");
			if(this.fPath.exists())
			{
				this.fPath.delete();
			}
			this.fPath=new File(GameData.sSDTo+"updateversion.dat");
			if(this.fPath.exists())
			{
				this.fPath.delete();
			}
			//把
			SystemOperate.iNearRoleCount=25;
//			SystemOperate.iPictureBuffer=SystemOperate.iPictureBuffer/2;
		}
		
		this.fPath = new File(GameData.sSDTo+"7gol.apk");
		if(this.fPath.exists())
		{//存在
			if(this.fPath.isDirectory())
			{//是目录删掉
				this.fPath.delete();
			}
		}
		
		MainMenu.mybuf=new Array(this.MAXBUF);//
		this.bCheckFinish=false;
		this.thread_check=new Thread(this);
		//-------------------------------------------------------------
		
		this.btn_update=null;
		this.btn_exit=null;
	//	btn_later=null;

	 this.bm=true;
	 this.iRetry=10;
	 this.iDecPoint;//解压指向
	 this.xdown;
	 this.sError="";
	
	}
	
	//--------------------------------------------------
	checkfile( f)
	{
		var i;
		var name=f.getPath();
		var md5;
		var iFileSize=0;
		var _in = null;
		
		name=name.substring(GameData.sSDTo.length, name.length);
		this.sChecking=name;
		var len;

		    _in = new FileInputStream(f);
		    MainMenu.digest.reset();
		    while ((len = _in.read(MainMenu.mybuf)) != -1)
		    {
			     MainMenu.digest.update(MainMenu.mybuf, 0, len);
			     iFileSize+=len;
		    }
		    md5=XDefine.toHexString(MainMenu.digest.MainMenu.digest());
		    _in.close();

		//正常情况，跟newfile比对
		for(i=0;i<this.iNewFileCount;i++)
		{
			if(this.newfiles[i].iFlag==50)continue;
//			//什么情况下不更新apk
//			if(this.newfiles[i].sName=="7gol.apk")
//			{
//				if(!GameData.bAutoUpdateAPK)
//				{//自主更新apk文件
//					if(!(GameData.APKVersion<this.iApkVersion))
//					{
//						this.newfiles[i].iFlag=50;//不需要更新
//						this.iUpdateFileCount--;
//						this.iUpdateLength-=this.newfiles[i].iFileSize;
//						return;
//					}
//				}
//			}
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
		//没有找到对应，删除此文件
//		f.delete();
		GmPlay.sop("delete "+name);
	}
	indir( dir)
	{
		var i;
		var flist=dir.listFiles();
		for(i=0;i<flist.length;i++)
		{
			if(flist[i].isDirectory())
			{
				this.indir(flist[i]);
			}
			else
			{//文件
				MainMenu.checkfile(flist[i]);
			}
		}
	}
	savecurrentversion()
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(this.iOldVersion);
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
	run()
	 {
		var i;

		this.iUpdateLength=0;
		this.iUpdateFileCount=this.iNewFileCount;
		this.iProcLength=0;
		this.iProcFileCount=0;
		for(i=0;i<this.iNewFileCount;i++)
		{
//			if(GameData.APKVersion>=this.iApkVersion || !GameData.bAutoUpdateAPK)
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
		this.indir(new File(GameData.sSDTo));
		
		this.bCheckFinish=true;
	}
	
	GetFreeDownload()
	{
		var i;
		for(i=0;i<this.MAXTHREAD;i++)
		{
			if(this.downlist[i].bwaiting())return this.downlist[i];
		}
		return null;
	}

	Draw()
	{
		if(this.btn_update==null)
		{
			this.btn_update=new XButton(GmPlay.xani_back);
			this.btn_update.InitButton("统一中按钮4");

			this.btn_exit=new XButton(GmPlay.xani_back);
			this.btn_exit.InitButton("统一中按钮4");
		}
		var i,j,k,m;
		var offx,offy;
		var pdown;
//		GmPlay.xani_back.DrawAnimaEx(0, 0, "大背景", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
		dMainMenu.pics(0);
		
		this.iW=GmConfig.SCRW/2;
		this.iH=GmConfig.SCRH/2;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		this.pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0x80000000);
		offx=this.iX+30;
		offy=this.iY+30;
		var intent;
		switch(this.iStat)
		{
		case 0://第一次运行，判断本地是否带有资源包，是，则复制本地资源包到7gol目录下
			if(this.pls.InitDataFromResFile("datapackage/updatedetail.dat"))
			{//本地有数据文件，开始复制
				this.pls.GetNextInt();//资源版本
				this.pls.GetNextInt();//apk版本
				j=this.pls.GetNextInt();//目录数
				this.iNewFileCount=this.pls.GetNextInt();//文件数
				
				for(i=0;i<j;i++)
				{
					this.fPath = new File(GameData.sSDTo+this.pls.GetNextString());
					if(!this.fPath.exists())
					{//没有目录，创建目录
						this.fPath.mkdir();
					}
					else if(!this.fPath.isDirectory())
					{
						this.fPath.delete();
						this.fPath.mkdir();
					}
				}
				
				//新文件列表
				this.newfiles=new Array(this.iNewFileCount);//
				for(i=0;i<this.iNewFileCount;i++)
				{
					this.newfiles[i]=new _DOWNFILE();
					this.newfiles[i].sName=this.pls.GetNextString();
					this.newfiles[i].sMD5=this.pls.GetNextString();
					this.newfiles[i].iFileSize=this.pls.GetNextInt();
				}
				this.iStat=1;
				this.iDecPoint=0;
				this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在解压文件...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			}
			else this.iStat=10;//本地没有数据文件，直接跳转
			break;
		case 1://解压大包中的文件
			var FOS;
			var ins;
			for(j=0;j<10;j++)
			{
				if(this.iDecPoint>=this.iNewFileCount)
				{
					this.iStat=10;
					break;
				}


					ins=this.pls.mRes.getAssets().open("datapackage/"+this.newfiles[this.iDecPoint].sName);
					FOS = new FileOutputStream(GameData.sSDTo+this.newfiles[this.iDecPoint].sName);
					while(true)
					{
						i=ins.read(this.pls.databuf, 0, 1024*128);
						if(i<=0)break;
						FOS.write(this.pls.databuf, 0, i);
					}
					FOS.close();
					ins.close();

				
				this.iDecPoint++;
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在解压文件"+this.iDecPoint*100/this.iNewFileCount+"%", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			break;
		case 10://开启下载updateversion.dat
			pdown=this.GetFreeDownload();
			if(pdown!=null)
			{
				pdown.downloadstart(GameData.sUpdateSeverList[MainMenu.iSeverPoint],this.down_version);
				this.iStat=11;
				this.xdown=pdown;
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在检测客户端版本...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			break;
		case 11://等待版本文件下载完
			if(this.down_version.bSuccress())
			{//版本文件下载完，打开校验
				if(this.pls.InitDataFromSD(this.xdown.sWriteTo))
				{//打开成功
					this.iNewVersion=this.pls.GetNextInt();
					this.iApkVersion=this.pls.GetNextInt();
					this.iStat=12;
				}
				else
				{
					this.iStat=200;
					this.sError="E1:"+this.xdown.sWriteTo;
				}
			}
			if(this.down_version.bFailed())
			{//下载错误
				if(this.iRetry>0)
				{
//					this.down_version.iFlag=0;
					this.iStat=10;
					this.iRetry--;
					break;
				}
				this.iStat=200;
				this.sError="E2:校验失败";
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在检测客户端版本...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			if(this.down_version.bProcing())
			{
				if(this.down_version.iFileSize>0)this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2+40, ""+this.down_version.iProc*100/this.down_version.iFileSize+"%", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			}
			break;
		case 12:
			if(this.pls.InitDataFromSD(GameData.sSDTo+"currentversion.dat"))
			{//打开本地版本文件
//				GmPlay.sop1("this.iOldVersion="+this.iOldVersion+",,,this.iNewVersion="+this.iNewVersion);
				this.iOldVersion=this.pls.GetNextInt();
				if(this.iNewVersion!=this.iOldVersion)// || GameData.APKVersion<this.iApkVersion)
				{
					pdown=this.GetFreeDownload();
					if(pdown!=null)
					{
						pdown.downloadstart(GameData.sUpdateSeverList[MainMenu.iSeverPoint],this.down_detail);
						this.iStat=20;
						this.xdown=pdown;
					}
					this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在进行数据校验...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
				}
				else this.iStat=100;
			}
			else
			{//本地无版本文件，进行校验
				pdown=this.GetFreeDownload();
				if(pdown!=null)
				{
					pdown.downloadstart(GameData.sUpdateSeverList[MainMenu.iSeverPoint],this.down_detail);
					this.iStat=20;
					this.xdown=pdown;
				}
				this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在进行数据校验...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			}
			break;
		case 20://等待下载detail
			if(this.down_detail.bSuccress())
			{//版本文件下载完，打开校验
				if(this.pls.InitDataFromSD(this.xdown.sWriteTo))
				{//打开成功
					this.pls.GetNextInt();//资源版本
					this.pls.GetNextInt();//apk版本
					j=this.pls.GetNextInt();//目录数
					this.iNewFileCount=this.pls.GetNextInt();//文件数
					if(this.iNewFileCount<500)
					{
						this.iStat=200;
						this.sError="E8";
						break;
					}
					
					for(i=0;i<j;i++)
					{
						this.fPath = new File(GameData.sSDTo+this.pls.GetNextString());
						if(!this.fPath.exists())
						{//没有目录，创建目录
							this.fPath.mkdir();
						}
						else if(!this.fPath.isDirectory())
						{
							this.fPath.delete();
							this.fPath.mkdir();
						}
					}
					
					//新文件列表
					this.newfiles=new Array(this.iNewFileCount);//
					for(i=0;i<this.iNewFileCount;i++)
					{
						this.newfiles[i]=new _DOWNFILE();
						this.newfiles[i].sName=this.pls.GetNextString();
						this.newfiles[i].sMD5=this.pls.GetNextString();
						this.newfiles[i].iFileSize=this.pls.GetNextInt();
					}
					this.sChecking="无";
					this.bCheckFinish=false;
					this.thread_check.start();
					this.iStat=21;
				}
				else
				{
					this.iStat=200;
					this.sError="E3:"+this.xdown.sWriteTo;
				}
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在进行数据校验...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			if(this.down_detail.bProcing())
			{
				if(this.down_detail.iFileSize>0)this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2+40, ""+this.down_detail.iProc*100/this.down_detail.iFileSize+"%", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			}
			if(this.down_detail.bFailed())
			{
				this.iStat=200;
				this.sError="E4";
			}
			break;
		case 21://本地文件校验
			if(this.bCheckFinish)
			{//完成本地文件的校验，退出
				if(this.iUpdateFileCount==0)
				{//版本号也要重新保存，否则重复校验
					this.iOldVersion=this.iNewVersion;
					this.savecurrentversion();
					this.iStat=100;
				}
				else this.iStat=30;//开始下载文件
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在进行数据校验...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2+40, this.sChecking, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			break;
		case 30://显示多少数据需要更新，是否更新
			this.pm3f.DrawTextEx(offx,offy, "有 "+this.iUpdateFileCount+" 个文件需要更新", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			//1,048,576
			this.pm3f.DrawTextEx(offx,offy+30, "合计下载"+this.iUpdateLength/1024+"K("+1.0*(this.iUpdateLength/10486)/100+"M)", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//			this.pm3f.DrawTextEx(offx,offy+60, "不更新可能导致无法正常游戏，", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			this.pm3f.DrawTextEx(offx,offy+60, "是否马上更新？", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			
			this.btn_update.Move(this.iX+20, this.iY+this.iH-40-20, 130, 40);
			this.btn_update.sName="马上更新";
			this.btn_update.Draw();
			
			this.btn_exit.Move(this.iX+this.iW-20-130, this.iY+this.iH-40-20, 130, 40);
			this.btn_exit.sName="退出游戏";
			this.btn_exit.Draw();
			break;
		case 31://更新文件
			j=0;
			for(i=0;i<this.iNewFileCount;i++)
			{
				if(this.newfiles[i].iFlag==0)
				{//需要更新
					pdown=this.GetFreeDownload();
					if(pdown==null)break;//更新线程已满
					pdown.downloadstart(GameData.sUpdateSeverList[MainMenu.iSeverPoint],this.newfiles[i]);
				}
			}
			k=0;
			for(i=0;i<this.iNewFileCount;i++)
			{
				if(this.newfiles[i].iFlag==10)
				{//正在更新中
					j+=this.newfiles[i].iProc;//下载中文件已下载大小
				}
				else if(this.newfiles[i].iFlag==20)
				{//下载成功
					this.iProcLength+=this.newfiles[i].iFileSize;
					this.iProcFileCount++;
					this.newfiles[i].iFlag=40;
				}
				else if(this.newfiles[i].iFlag==30)
				{//下载失败
					this.newfiles[i].iFlag=0;
//					this.iStat=32;
					
//					this.iStat=31;
				}
				if(this.newfiles[i].iFlag<20)k++;
			}
			if(k==0)
			{//更新完毕，写入当前版本号
				this.iOldVersion=this.iNewVersion;
				this.savecurrentversion();
				this.iStat=100;
			}
//			this.pm3f.DrawTextEx(offx,offy, "当前下载："+downloading.sName, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//			this.pm3f.DrawTextEx(offx,offy+30, "文件大小："+this.downlist[0].iProc/1024+"/"+downloading.iFileSize/1024+"K", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			
			this.pm3f.DrawTextEx(offx,offy+30*0, "总文件数："+this.iProcFileCount+"/"+this.iUpdateFileCount, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			i=(this.iProcLength+j);//已完成
			j=this.iUpdateLength;
			this.pm3f.DrawTextEx(offx,offy+30*1, "已完成："+i/1024+"K("+1.0*(i/10486)/100+"M)", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			this.pm3f.DrawTextEx(offx,offy+30*2, "总大小："+j/1024+"K("+1.0*(j/10486)/100+"M)", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			
			j=this.iUpdateLength-i;//未完成
			if(i>0)
			{
				this.lnow=XDefine.get_ms();
				this.lcalc=(this.lnow-this.lstart)/1000;//已经下载的秒数
				if(this.lcalc<=0)this.lcalc=1;
//				this.pm3f.DrawTextEx(offx, offy+30*3, "平均速度："+1.0f*(i/this.lcalc*100/1024)/100+"k/s", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
				this.pm3f.DrawTextEx(offx, offy+30*3, "平均速度："+i/this.lcalc/1024+"K/s", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
				this.pm3f.DrawTextEx(offx, offy+30*4, "已用时间："+XDefine.SecondToTime(this.lcalc), 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
				this.pm3f.DrawTextEx(offx, offy+30*5, "预计还需："+XDefine.SecondToTime(this.lcalc*j/i), 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			}
			break;
		case 32://下载
			this.pm3f.DrawTextEx(offx,offy, "下载出错，检查网络连接是否正常("+this.downlist[0].iEid+")", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			
			this.btn_update.Move(this.iX+20, this.iY+this.iH-40-20, 130, 40);
			this.btn_update.sName="重试";
			this.btn_update.Draw();
			
			this.btn_exit.Move(this.iX+this.iW-20-130, this.iY+this.iH-40-20, 130, 40);
			this.btn_exit.sName="退出游戏";
			this.btn_exit.Draw();
			
//			btn_later.Move(this.iX+this.iW/2-130/2, this.iY+this.iH-40-20, 130, 40);
//			btn_later.sName="暂不更新";
//			btn_later.Draw();
			break;
		case 110://下载版本校验文件
			if(this.down_apkversion.bSuccress())
			{//版本文件下载完，打开校验
				if(this.pls.InitDataFromSD(GameData.sSDTo+"apkversion.dat"))
				{//打开成功
					j=this.pls.GetNextShort();
					for(i=0;i<j;i++)
					{
						k=this.pls.GetNextShort();
						m=this.pls.GetNextShort();
						this.pls.GetNextString();//对应客户端文件的md5
//						GmPlay.sop1("版本编号:"+k+",版本号:"+m);
						if(k==i && k==GameVersion.QUDAO)
						{//渠道对应
							if(GameData.APKVersion<m)
							{//下载apk来更新
								this.iStat=111;
								pdown=this.GetFreeDownload();
								if(pdown!=null)
								{
									pdown.downloadstart(GameData.sUpdateClientList[MainMenu.iSeverPoint]+GameVersion.QUDAO+"/",this.down_apk);
								}
							}
							else
							{//不下载，直接进入游戏
								this.iStat=102;
							}
							break;
						}
					}
				}
				else
				{
					this.iStat=200;
					this.sError="E5";
				}
			}
			if(this.down_apkversion.bFailed())
			{//下载错误
				this.iStat=200;
				this.sError="E6";
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在检测客户端版本...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			if(this.down_apkversion.bProcing())
			{
				if(this.down_apkversion.iFileSize>0)this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2+40, ""+this.down_apkversion.iProc*100/this.down_apkversion.iFileSize+"%", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			}
			break;
		case 111://等待客户端下载完成
			if(this.down_apk.bSuccress())
			{
				intent = new Intent(Intent.ACTION_VIEW);  
				intent.setDataAndType(Uri.fromFile(new File(GameData.sSDTo+"7gol.apk")),"application/vnd.android.package-archive");  
				PublicInterface.mMain.startActivity(intent);  
				PublicInterface.gi().Exit();
			}
			if(this.down_apk.bFailed())
			{//下载错误
				this.iStat=200;
				this.sError="E7";
			}
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在下载最新客户端...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			if(this.down_apk.bProcing())
			{
				if(this.down_apk.iFileSize>0)this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2+40, ""+this.down_apk.iProc*100/this.down_apk.iFileSize+"%", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			}
			break;
		case 100:
			if(GameVersion.bAutoUpdateAPK)
			{//自主更新apk文件
				GmPlay.sop1("版本:"+GameData.APKVersion+","+this.iApkVersion);
				if(GameData.APKVersion<this.iApkVersion)
				{//下载客户端版本校验文件
					pdown=this.GetFreeDownload();
					if(pdown!=null)
					{
						pdown.downloadstart(GameData.sUpdateClientList[MainMenu.iSeverPoint],this.down_apkversion);
					}
					this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在检测客户端版本...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);

					this.iStat=110;
					
					break;
				}
			}
		case 102:
/*			if(apkfile!=null)
			{

			}*/
			this.iStat=101;
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "载入中...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			/*载入版本检测文件*/
			if(this.pls.InitDataFromSD(GameData.sSDTo+"currentcheck.dat"))
			{//有这个文件
				MainMenu.iCheckCount=this.pls.GetNextInt();
				MainMenu.checkfile=new Array(MainMenu.iCheckCount);//
				for(i=0;i<MainMenu.iCheckCount;i++)
				{
					MainMenu.checkfile[i]=new _CHECKFILE();
					MainMenu.checkfile[i].sName=this.pls.GetNextString();
					MainMenu.checkfile[i].sMd5=this.pls.GetNextString();
				}
			}
			else
			{//没找到，重新检测
				pdown=this.GetFreeDownload();
				if(pdown!=null)
				{
					pdown.downloadstart(GameData.sUpdateSeverList[MainMenu.iSeverPoint],this.down_detail);
					this.iStat=20;
				}
			}
			break;
		case 101:
			MainMenu.bExitThread=true;
			GmPlay.gp.InitAnimaAndData();
			this.pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "载入中...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);

			XStat.gi().PopStat(1);
			XStat.gi().PushStat(XStat.GS_FASTLOGIN);
			break;
		case 200:
			this.pm3f.DrawTextEx(offx,offy, "连接出错，检查网络连接是否正常", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			if(this.sError.length>0)
			{
				this.pm3f.DrawTextEx(offx,offy+50, this.sError, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);				
			}
			if(MainMenu.iSeverPoint<3)
			{
				MainMenu.iSeverPoint++;
				this.iStat=10;
				this.iRetry=10;
			}
			break;
		}
//		btn_fastlogin.Draw();
//		btn_message.Draw();
		
		
//		this.pm3f.FillRect_2D(0, GmConfig.SCRH-30, GmConfig.SCRW, GmConfig.SCRH, 0x80000000);
//		this.pm3f.DrawTextEx(0, GmConfig.SCRH, "第一次封测版", 0xffffffff, 30, 101, 1, 1, 0, 0, -3);
//		i=iDelay*10%200;
//		if(i>=100)i=200-i;
//		this.pm3f.DrawTextEx(GmConfig.SCRW, GmConfig.SCRH, "任意触摸开始游戏", 0xffffffff,30,i,1,1,0,-3,-3);
//		iDelay++;
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.iStat==30 || this.iStat==32)
		{
//			if(btn_later.ProcTouch(msg, x, y))
//			{
//				if(btn_later.bCheck())
//				{
//					this.iStat=101;
//				}
//				return true;
//			}
			if(this.btn_update.ProcTouch(msg, x, y))
			{
				if(this.btn_update.bCheck())
				{
					this.lstart=XDefine.get_ms();
					this.iStat=31;
				}
				return true;
			}
			if(this.btn_exit.ProcTouch(msg, x, y))
			{
				if(this.btn_exit.bCheck())
				{
//					this.iStat=101;
					PublicInterface.gi().Exit();
				}
				return true;
			}
		}
//		if(btn_fastlogin.ProcTouch(msg, x, y))
//		{
//			if(btn_fastlogin.bCheck())
//			{
//				XStat.gi().PushStat(XStat.GS_FASTLOGIN);
//			}
//		}
//		if(btn_message.ProcTouch(msg, x, y))
//		{
//			if(btn_message.bCheck())
//			{
//				if(this.bm)GmPlay.x_wav.StartWav(0, true);
//				else GmPlay.x_wav.StopWav(0);
//				this.bm=!this.bm;
//			}
//		}

		return false;
	}

}
MainMenu.iCheckCount;
MainMenu.checkfile;
MainMenu.digest;
MainMenu.mybuf;
MainMenu.bExitThread=false;
MainMenu.pics;

MainMenu.dpics=function( type)
{
	if(MainMenu.pics[0][0]<0)MainMenu.pics[0][0]=M3DFast.gi().LoadFromFile("bk/aa.xxx",-1,false);
	if(MainMenu.pics[0][1]<0)MainMenu.pics[0][1]=M3DFast.gi().LoadFromFile("bk/ab.xxx",-1,false);

	M3DFast.gi().DrawImageEx(0, 0, 0, MainMenu.pics[0][0], 0, 0, 512, 480, 101, 1, 1, 0, 0, 0);
	M3DFast.gi().DrawImageEx(0, 512, 0, MainMenu.pics[0][1], 0, 0, 800-512, 480, 101, 1, 1, 0, 0, 0);
}

MainMenu.CheckFile=function( fn)
	{
		var i;
		var smd5=getFileMD5(new File(GameData.sSDTo+fn));
		for(i=0;i<MainMenu.iCheckCount;i++)
		{
			if(fn==MainMenu.checkfile[i].sName)
			{
				if(smd5==MainMenu.checkfile[i].sMd5)return true;
				else break;
			}
		}
		//校验出错，关闭客户端
		var f=new File(GameData.sSDTo+"currentversion.dat");
		f.delete();
		PublicInterface.gi().Exit();
		return false;
	}
	MainMenu.getFileMD5=function( file) 
	{
		if (!file.isFile())return "false";
		var ss;
		var _in = null;
		var len;

		    _in = new FileInputStream(file);
		    MainMenu.digest.reset();
		    while ((len = _in.read(MainMenu.mybuf)) != -1) {
		     MainMenu.digest.update(MainMenu.mybuf, 0, len);
		    }
		    ss=XDefine.toHexString(MainMenu.digest.MainMenu.digest());
		    _in.close();
		   
		return ss;
	}
	MainMenu.iSeverPoint=0;