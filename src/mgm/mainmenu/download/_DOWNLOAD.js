
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.net.URLConnection;
//import java.security.MessageDigest;
//import java.security.NoSuchAlgorithmException;



import MainMenu from "../../../mgm/mainmenu/MainMenu"
import LeadPage from "../../../mgm/newmainmenu/LeadPage"

import GameData from "../../../config/GameData"
import XDefine from "../../../config/XDefine"

import GmPlay from "../../../engtst/mgm/GmPlay"

export default class _DOWNLOAD
{
	constructor()
	{

	}
	/*
	public int iStat;//当前状态
	public _DOWNFILE downfile;

	public String sUrl;//下载地址
	public String sWriteTo;//写入
//	public String sMD5;//md5校验码
//	public int iFileSize;//文件长度
//	public int iProc;//当前下载进度
	public int iEid;//错误编号
	
	byte downbuf;
	MessageDigest digest;
	Thread thread;
	
	public _DOWNLOAD()
	{
		iStat=0;
		downbuf=new Array(1024*5);//
		try {
			digest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        thread = new Thread(this);
        thread.start();
	}
	public boolean bwaiting()
	{
		if(iStat==0)return true;
		return false;
	}
	downloadstart( sever,_DOWNFILE df)
	{////DownSever+"updateversion.dat", GameData.sSDTo+"updateversion.dat", "",0);
		downfile=df;
		sUrl=sever+df.sName;
		sWriteTo=GameData.sSDTo+df.sName;
		
		df.sWriteTo=sWriteTo;

		downfile.iProc=0;
		downfile.iFlag=10;//开始下载
//		iProc=0;
		iStat=1;//开始下载
	}
	downloadfinish()
	{
		iStat=2;
	}
	error( i)
	{
		0  url错误
		1 获取文件大小失败
		2 文件长度不符
		3 没有下载流，无法获取文件
		4 打开写入文件流失败
		5 未知原因下载失败
		
		iStat=10;
		iEid=i;
	}
	run() {
		while(LeadPage.bProcThread)
		{
//			if(MainMenu.bExitThread)return;
			try {
				switch(iStat)
				{
				case 1:
					downloadfile(this);
					break;
				case 5://下载成功
					downfile.iFlag=20;
					iStat=0;
					break;
				case 10://下载失败
					downfile.iFlag=30;
					iStat=0;
					break;
				default:
					Thread.sleep(50);
				}
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	void downloadfile(_DOWNLOAD pdown)
	{
		URL Url=null;
		InputStream is=null;
		FileOutputStream FOS=null;
		var fileSize;
		
		try {
			GmPlay.sop("download from "+pdown.sUrl);
			Url = new URL(pdown.sUrl);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			pdown.error(0);
			return;
		}
//		var extlog=0;
		//////////////////////////////////////////////////////////////
		URLConnection conn;
		try {
//			extlog=1;
			conn = Url.openConnection();
//			extlog=2;
			conn.connect();
//			extlog=3;
			is = conn.getInputStream();
//			extlog=4;
			fileSize = conn.getContentLength();// 根据响应获取文件大小
			if (fileSize <= 0) 
			{ // 获取内容长度为0
				pdown.error(1);
				return;
			}
			if(pdown.downfile.iFileSize>0 && pdown.downfile.iFileSize!=fileSize)
			{//文件长度不等
				GmPlay.sop("a="+pdown.downfile.iFileSize+",b="+fileSize);
//				pdown.error(2);
//				return;
			}
			if(pdown.downfile.iFileSize==0)pdown.downfile.iFileSize=fileSize;
			if (is == null) 
			{ // 没有下载流
				pdown.error(3);
				return;
			}
			try {//如已有，替换要先删除
				File fPath = new File(pdown.sWriteTo);
				if(fPath.exists())
				{//没有目录，创建目录
					fPath.delete();
				}
				GmPlay.sop("write to "+pdown.sWriteTo);
				FOS = new FileOutputStream(pdown.sWriteTo);
			} catch (Exception e) {
				e.printStackTrace();
				pdown.error(4);
				return;
			} // 创建写入文件内存流，
			var numread;
			try {
				digest.reset();
				while ((numread = is.read(downbuf)) != -1) 
				{
//					GmPlay.sop("numread="+numread);
					digest.update(downbuf, 0, numread);
					FOS.write(downbuf, 0, numread);
//					pdown.iProc+=numread;//下载进度
					pdown.downfile.iProc+=numread;//下载进度
				}
				FOS.close();
				if(pdown.downfile.sMD5!=null && pdown.downfile.sMD5.length>0)
				{
					String ss=XDefine.toHexString(digest.digest());
//					GmPlay.sop(pdown.sMD5+"=="+ss);
					if(pdown.downfile.sMD5!=ss)
					{
						GmPlay.sop("MD5 error:"+pdown.downfile.sMD5.compareTo(ss)+","+pdown.downfile.sMD5.length+","+ss.length);
						pdown.error(7);
						return;
					}
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				pdown.error(6);
				return;
			}
			is.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			pdown.error(5);
//			GmPlay.sop("extlog="+extlog);
			return;
		}
		pdown.iStat=5;
	}*/
}