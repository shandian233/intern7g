
import GmConfig from "../../config/GmConfig"
import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButton from "../../engine/control/XButton"
import XButtonEx1 from "../../engine/control/XButtonEx1"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"
import CreateFuBen from "../../engtst/mgm/gameing/fuben/CreateFuBen"

class _SEVERLIST
{/*
	public int iSeverId;
	public String sName;
	public int iStatus;//0维护，1正常，3爆满，5爆满无法进入
	public int iTuiJian;//是否推荐
	*/
	constructor()
	{

	}
}

export default class SelectSever extends BaseClass{

	constructor( ani)
	{
		super();
		 this.MAXSECTORCOUNT=10;
		 this.MAXSEVERCOUNT=10;
		this.iW=800;
		this.iH=480;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		this.sSectorName=new Array(this.MAXSECTORCOUNT);//
		this.iSectorId=new Int32Array(this.MAXSECTORCOUNT);//
		
		this.slist=new Array(this.MAXSEVERCOUNT);//
		for(i=0;i<this.MAXSEVERCOUNT;i++)
		{
			this.slist[i]=new _SEVERLIST();
		}
		this.iSeverCount=0;
		this.iSectorCount=0;
		this.iCurrentSectorId=0;
		
		this.btn_sector=new Array(this.MAXSECTORCOUNT);//
		for(i=0;i<this.MAXSECTORCOUNT;i++)this.btn_sector[i]=new XButton(GmPlay.xani_ui3);
		this.btn_sever=new Array(this.MAXSEVERCOUNT);//
		for(i=0;i<this.MAXSEVERCOUNT;i++)this.btn_sever[i]=new XButton(GmPlay.xani_ui3);
	}

	InitBtn()
	{
		var i;
		for(i=0;i<this.iSectorCount;i++)
		{
			this.btn_sector[i].InitButton("选区按钮");
			this.btn_sector[i].sName=this.sSectorName[i];
			this.btn_sector[i].Move(50+i*150+55, 80, 135, 52);
		}
		for(i=0;i<this.iSeverCount;i++)
		{
			this.btn_sever[i].InitButton("选择服务器背景按钮");
			this.btn_sever[i].sName=this.slist[i].sName;
			if(this.slist[i].iTuiJian==1)this.btn_sever[i].sName+="-推荐";
			if(this.slist[i].iStatus==0)this.btn_sever[i].sName+="(维护中)";
			else if(this.slist[i].iStatus==1)this.btn_sever[i].sName+="(正常)";
			else if(this.slist[i].iStatus==3)this.btn_sever[i].sName+="(爆满)";
			else if(this.slist[i].iStatus==5)this.btn_sever[i].sName+="(爆满)";
			this.btn_sever[i].Move(GmConfig.SCRW/2-508/2-20, 20+100+i*70+30, 508, 47);
		}
	}
	InitSeverList( pls)
	{
		var i;
		this.iCurrentSectorId=pls.GetNextInt();
		this.iSectorCount=pls.GetNextByte();
		for(i=0;i<this.iSectorCount;i++)
		{
			this.sSectorName[i]=pls.GetNextString();
			this.iSectorId[i]=pls.GetNextInt();
			this.btn_sector[i].bMouseIn=false;
			this.btn_sector[i].bMouseDown=false;
		}
		/////////////
		this.iSeverCount=pls.GetNextByte();
		for(i=0;i<this.iSeverCount;i++)
		{
			this.slist[i].sName=pls.GetNextString();
			this.slist[i].iSeverId=pls.GetNextInt();
			this.slist[i].iStatus=pls.GetNextByte();
			this.slist[i].iTuiJian=pls.GetNextByte();
		}
		GmPlay.sop("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz="+this.iCurrentSectorId+"?="+this.iSectorId[0]);
		this.InitBtn();
	}
	Draw()
	{
		var i;
		MainMenu.dpics(0);
		
		
//		this.pm3f.FillRect_2D(0, 0, this.pm3f.imf.SCRW, this.pm3f.imf.SCRH, 0xff000000);
//		GmPlay.xani_back.DrawAnimaEx(0, 0, "大背景", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
		this.pm3f.FillRect_2D(this.iX, this.iY, this.iW,this.iH, 0x50000000);

		DrawMode.ui3_Frame4(83, 30, 632, 445);
		
		GmPlay.xani_ui3.DrawAnimaEx(GmConfig.SCRW/2-225, GmConfig.SCRH/2-235, "选择服务器标题", 0, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		
		
		for(i=0;i<this.iSectorCount;i++)
		{
			if(this.iSectorId[i]==this.iCurrentSectorId)
			{
				this.btn_sector[i].bMouseIn=true;
				this.btn_sector[i].bMouseDown=true;
			}
			else {
			//	this.btn_sector[i].bMouseDown=false;
			//	this.btn_sector[i].bMouseIn=false;
			}
				
			this.btn_sector[i].Draw();
		}
		for(i=0;i<this.iSeverCount;i++)this.btn_sever[i].Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<this.iSectorCount;i++)
		{
			if(this.btn_sector[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sector[i].bCheck())
				{
					if(this.iSectorId[i]!=this.iCurrentSectorId)
					{
						XStat.gi().PushStat(XStat.GS_LOADING1);
						GmProtocol.gi().s_GetSeverList(this.iSectorId[i]);
					}
				}
			}
		}
		for(i=0;i<this.iSeverCount;i++)
		{
			if(this.btn_sever[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sever[i].bCheck())
				{//选择了某个服务器，进入创建角色
					if(this.slist[i].iStatus==0)
					{
						EasyMessage.easymsg.AddMessage("服务器维护中，不能进入");
					}
					else
					{//根据所选服务器，获取角色列表
						iCurrentSeverId=this.slist[i].iSeverId;
						GmProtocol.gi().s_GetRoleList(this.iCurrentSectorId,iCurrentSeverId);
						XStat.gi().PushStat(XStat.GS_LOADING1);
//						GmPlay.sop1("aa="+this.iCurrentSectorId+",bb="+iCurrentSeverId);
//						XStat.gi().PushStat(XStat.GS_CREATEROLE);
					}
				}
			}
		}
		return false;
	}
}
SelectSever.Open=function( pls)
{
	var ss;
	while(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
	if(XStat.gi().iXStat==XStat.GS_SELECTSEVER)ss=XStat.gi().LastStat(0);
	else ss=XStat.gi().PushStat(XStat.GS_SELECTSEVER);
	
	ss.InitSeverList(pls);
}