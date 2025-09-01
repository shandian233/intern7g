
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import PackageTools from "../../../../engine/PackageTools"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XRecordFast from "../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MainMenu from "../../../../mgm/mainmenu/MainMenu"
import _DOWNFILE from "../../../../mgm/mainmenu/download/_DOWNFILE"
import _DOWNLOAD from "../../../../mgm/mainmenu/download/_DOWNLOAD"
import LeadPage from "../../../../mgm/newmainmenu/LeadPage"

class _POST
{/*
	public String sTitle;
	public String sDetail;
	public String sDate;
	public String sAuthor;
	public int iSeverID;*/
	constructor()
	{

	}
}

//每次进入游戏的弹窗公告
export default class GamePost {
	
	
	constructor()
	{
		this.iStat=200;
		
		this.down_post=new _DOWNFILE();
		this.down_post.InitData("post.dat", null, 0);
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
//		this.btn_close.sName="关闭";
		
		this.btn_up=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_up.InitButton("按钮1");
		this.btn_up.sName="上一条";
		
		this.btn_down=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_down.InitButton("按钮1");
		this.btn_down.sName="下一条";

		this.bLock=false;
	}
	
	Draw()
	{
		if(GmMe.me.iRid<=0)return;
		var i;
		var pls;
		switch(this.iStat)
		{
		case 0://开始，下载post.dat
			LeadPage.bProcThread=true;
//			MainMenu.bExitThread=false;
			this.dproc=new _DOWNLOAD();
			
			this.dproc.downloadstart(LeadPage.sResSeverList[LeadPage.iResSeverPoint], this.down_post);
			this.iStat=10;
//			GmPlay.sop1("===="+LeadPage.sResSeverList[LeadPage.iResSeverPoint]);
//			GmPlay.sop1("===="+GameData.sUpdateSeverList[MainMenu.iSeverPoint]);
			break;
		case 10:
//			GmPlay.sop1("===ddd");
			if(this.down_post.bSuccress())
			{//
//				GmPlay.sop1("===success");
				pls=GmPlay.gp.pls;
				if(pls.InitDataFromSD(this.down_post.sWriteTo))
				{//打开成功，读取数据
					pls.GetNextByte();
					this.iPostCount=pls.GetNextInt();
					this.posts=new Array(this.iPostCount);//
					for(i=0;i<this.iPostCount;i++)
					{
//						GmPlay.sop1("===success c"+i);
						this.posts[i]=new _POST();
						this.posts[i].sTitle=pls.GetNextString();
						pls.GetNextData();
						this.posts[i].sDetail=pls.DataToString();
						this.posts[i].sDate=pls.GetNextString();
						this.posts[i].sAuthor=pls.GetNextString();
						this.posts[i].iSeverID=pls.GetNextInt();
						if(this.posts[i].iSeverID==0)continue;
						if(this.posts[i].iSeverID!=XRecordFast.iLastSever)
						{
							i--;
							this.iPostCount--;
						}
					}
//					GmPlay.sop("this.iPostCount="+this.iPostCount+",,,,GmMe.me.rbs.iLev"+GmMe.me.rbs.iLev);
					if(this.iPostCount>0)
					{
						this.iStat=20;
						this.iPostPoint=this.iPostCount-1;
						this.iW=400;
						this.iH=400;
						this.iX=(GmConfig.SCRW-this.iW)/2;
						this.iY=(GmConfig.SCRH-this.iH)/2;
						this.iTextOff=0;
						if(GmMe.me.rbs.iLev<25)this.iStat=200;
					}
					else this.iStat=200;
				}
				else
				{
					this.iStat=200;
//					sError="E1:"+xdown.sWriteTo;
				}
			}
			if(this.down_post.bFailed())
			{//下载错误
//				GmPlay.sop("failed");
				this.iStat=200;
			}
//			pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2, "正在检测客户端版本...", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			if(this.down_post.bProcing())
			{
//				if(this.down_post.iFileSize>0)pm3f.DrawTextEx(this.iX+this.iW/2,this.iY+this.iH/2+40, ""+down_version.iProc*100/down_version.iFileSize+"%", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			}
//			GmPlay.sop("this.iStat="+this.iStat);
			break;
		case 20://弹出显示
//			GmPlay.sop("this.iPostCount="+this.iPostCount);
			this.DrawDetail();
			break;
		case 200:
			LeadPage.bProcThread=false;
//			MainMenu.bExitThread=true;
			this.iStat=300;
			break;
		}
	}
	Clear()
	{
		if(this.iStat<200)this.iStat=200;
	}
	DrawDetail()
	{
//		GmPlay.sop("draw......");
		var offx,offy;
		var offw,offh;

		this.iW=800;
		this.iH=480;

		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_framein(this.iX+25, this.iY+35, this.iW-50, this.iH-65);
		GmPlay.xani_nui2.DrawAnima(this.iX+this.iW/2,this.iY,"公告栏标题",0);
		
	//	M3DFast.gi().DrawText_2(this.iX+this.iW/2, this.iY+70, this.posts[this.iPostPoint].sTitle, 0xffff0000, 30, 101, 1, 1, 0, -2,-2, 2, 0xff000000);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+70, this.posts[this.iPostPoint].sTitle, 0xffff0000, 32, 101, 1, 1, 0, -2,-2);
		
		offx=this.iX+25;
		offy=this.iY+95;
		offw=this.iW-50;
		offh=this.iH-200;
		M3DFast.gi().SetViewClip(offx, offy+5,offx+offw,offy+offh-5);
		FormatString.gi().FormatEx("#c1e5c6b"+this.posts[this.iPostPoint].sDetail, offw-50, 25, 0, 0xff000000, 32);
//		FormatString.gi().Format("#c1e5c6b"+this.posts[this.iPostPoint].sDetail, offw-50, 25);
		this.iTextH=FormatString.gi().iH;
		if(this.iTextH+this.iTextOff<offh-10)this.iTextOff=offh-10-this.iTextH;
		if(this.iTextOff>0)this.iTextOff=0;
		FormatString.gi().Draw(offx+25,offy+5+this.iTextOff);
		M3DFast.gi().NoClip();
//		GmPlay.sop("this.iTextH="+this.iTextH+",,,this.iTextOff="+this.iTextOff+",,,offh="+offh);
//		GmPlay.sop("abc="+this.posts[this.iPostPoint].sDetail);

		this.btn_up.Move(this.iX+100, this.iY+this.iH-100, 161, 53);
		this.btn_up.Draw();

		this.btn_down.Move(this.iX+this.iW-100-161, this.iY+this.iH-100, 161, 53);
		this.btn_down.Draw();
		
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		if(1==1)return;
		
//		offx=this.iX+20;
//		offy=this.iY+60+20;
//		offw=this.iW-40;
//		offh=this.iH-60-40-20-10-20;
//		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, this.iH);
//		M3DFast.gi().DrawText_2(this.iX+this.iW/2, this.iY+35, this.posts[this.iPostPoint].sTitle, 0xffffffff, 30, 101, 1, 1, 0, -2,-2, 2, 0xff000000);
		M3DFast.gi().DrawText_2(this.iX+this.iW/2, this.iY+65, this.posts[this.iPostPoint].sDate, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 2, 0xff000000);

//		DrawMode.ui3_Frame3(offx, offy,offw,offh);
		M3DFast.gi().SetViewClip(offx, offy+5,offx+offw,offy+offh-5);
		FormatString.gi().FormatEx(this.posts[this.iPostPoint].sDetail, offw-10, 20, 2, 0xff000000, 20);
		this.iTextH=FormatString.gi().iH;
		if(this.iTextH+this.iTextOff<offh-10)this.iTextOff=offh-10-this.iTextH;
		if(this.iTextOff>0)this.iTextOff=0;
		FormatString.gi().Draw(offx+5,offy+5+this.iTextOff);
		M3DFast.gi().NoClip();
		
		M3DFast.gi().DrawText_2(this.iX+this.iW/2, this.iY+this.iH-20-20, (this.iPostPoint+1)+"/"+(this.iPostCount), 0xffffffff, 30, 101, 1, 1, 0, -2,-2, 2, 0xff000000);
//		if(this.iPostPoint>0)
		{
			this.btn_up.Move(this.iX+100, this.iY+this.iH-100, 161, 53);
			this.btn_up.Draw();
		}
//		if(this.iPostPoint<this.iPostCount-1)
		{
			this.btn_down.Move(this.iX+this.iW-100-161, this.iY+this.iH-100, 161, 53);
			this.btn_down.Draw();
		}
		

	}
	
	ProcTouch( msg, x, y)
	{
		if(this.iStat==20)
		{
			
			{
				if(this.btn_up.ProcTouch(msg, x, y))
				{
					if(this.btn_up.bCheck())
					{
						if(this.iPostPoint>0)this.iPostPoint--;
					}
					return true;
				}
			}
			
			{
				if(this.btn_down.ProcTouch(msg, x, y))
				{
					if(this.btn_down.bCheck())
					{
						if(this.iPostPoint<this.iPostCount-1)this.iPostPoint++;
					}
					return true;
				}
			}
			if(this.btn_close.ProcTouch(msg, x, y))
			{
				if(this.btn_close.bCheck())
				{
					this.iStat=200;
				}
				return true;
			}
			if(msg==2 && this.bLock)
			{
				this.iTextOff+=(y-this.iLockY);
				this.iLockY=y;
				return true;
			}
			if(msg==3 && this.bLock)
			{
				this.bLock=false;
				return true;
			}
			if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
			{
				var offx,offy;
				var offw,offh;
				offx=this.iX+20;
				offy=this.iY+60;
				offw=this.iW-40;
				offh=this.iH-60-40-20-10;
				if(XDefine.bInRect(x, y, offx, offy, offw, offh) && msg==1)
				{
					this.bLock=true;
					this.iLockY=y;
				}
			}
			else this.iStat=200;
			return true;
		}
		return false;
	}


}
GamePost.gp=null;
GamePost.gi=function()
{
	if(GamePost.gp==null)GamePost.gp=new GamePost();
	return GamePost.gp;
}