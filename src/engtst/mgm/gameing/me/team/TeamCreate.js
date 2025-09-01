
import MapManager from "../../../../../map/MapManager"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../../engtst/mgm/MyAI"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FastButton from "../../../../../engtst/mgm/gameing/fast/FastButton"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

import MyTeam from "./MyTeam"

class _TEAMLIST
{/*
	public int iRid;
	public String sName;
	public int iMapId;
	public int iLev;
	public int iRaX;
	public int iSchool;
	public int iTarget;
	public int iTargetMap;
	public int iCount;//队伍人数
	*/
	swap( t)
	{
		var i;
		var s;
		i=t.iRid;
		t.iRid=this.iRid;
		this.iRid=i;
		
		s=t.sName;
		t.sName=this.sName;
		this.sName=s;
		
		i=t.iMapId;
		t.iMapId=this.iMapId;
		this.iMapId=i;
		
		i=t.iLev;
		t.iLev=this.iLev;
		this.iLev=i;
		
		i=t.iRaX;
		t.iRaX=this.iRaX;
		this.iRaX=i;
		
		i=t.iSchool;
		t.iSchool=this.iSchool;
		this.iSchool=i;
		
		i=t.iTarget;
		t.iTarget=this.iTarget;
		this.iTarget=i;
		
		i=t.iTargetMap;
		t.iTargetMap=this.iTargetMap;
		this.iTargetMap=i;
		
		i=t.iCount;//队伍人数
		t.iCount=this.iCount;
		this.iCount=i;
		
		i=t.iSort;
		t.iSort=this.iSort;
		this.iSort=i;
	}
	
	constructor()
	{
		this.btn_apply=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_apply.InitButton("按钮1_110");
//		btn_apply.sName="一键申请";
	}
}

export default class TeamCreate extends BaseClass{
	 constructor( ani)
	{
		super();
		var i;
		this.iW=1020;
		this.iH=610;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		
		this.btn_applyall=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_applyall.InitButton("按钮1");
		this.btn_applyall.sName="一键申请";
		
		this.btn_autoteam=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_autoteam.InitButton("按钮1");
		this.btn_autoteam.sName="自动匹配";
		
		this.btn_fresh=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_fresh.InitButton("按钮1");
		this.btn_fresh.sName="刷新";
		
		this.btn_create=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_create.InitButton("按钮1");
		this.btn_create.sName="创建队伍";
		
		this.btncs=new Array(16);////组队类型,地图参数
		this.btn_dest=new Array(16);//
		for(i=0;i<16;i++)
		{
			this.btncs[i]=new Int32Array(5);
			this.btn_dest[i]=new XButton(GmPlay.xani_nui4);
		}
		this.iDestPoint=0;
		this.iOpenPoint=-1;
		this.iOffH=0;
		this.iShowH=85*5+15;
		this.ResetButton(true);
		this.bLocked1=false;
		this.bLocked2=false;

		this.iTlCount=0;
		this.tl=new Array(64);//
		this.iOffY=0;
		this.iLockY=-1;
		this.iTeamPoint=-1;
	}
	
	ResetButton( dopen)
	{
		var op;
		this.iDestCount=0;
		this.btn_dest[this.iDestCount].InitButton("组队类型1");
		this.btn_dest[this.iDestCount].sName="附近";
		this.btncs[this.iDestCount][0]=0;
		this.btncs[this.iDestCount][1]=0;
		this.btncs[this.iDestCount][2]=0;//无
		this.btncs[this.iDestCount][3]=0;
		this.btncs[this.iDestCount][4]=80;
		this.iDestCount++;
		
		if(GmMe.me.rbs.iLev>=10)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="为民除害";
			this.btncs[this.iDestCount][0]=1;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;
			this.btncs[this.iDestCount][3]=10;
			this.btncs[this.iDestCount][4]=80;
//			if(this.iOpenPoint==1)this.btncs[this.iDestCount][2]=1;//箭头向上
//			else this.btncs[this.iDestCount][2]=2;//箭头向下
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=20)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="追捕强盗";
			this.btncs[this.iDestCount][0]=2;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=20;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=30)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="山贼宝图";
			this.btncs[this.iDestCount][0]=3;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=30;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=40)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="挑战嚣张";
			this.btncs[this.iDestCount][0]=4;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=40;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=20)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="封印叔叔";
			this.btncs[this.iDestCount][0]=5;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=20;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		this.btn_dest[this.iDestCount].InitButton("组队类型1");
		this.btn_dest[this.iDestCount].sName="定时活动";
		this.btncs[this.iDestCount][0]=99;
		this.btncs[this.iDestCount][1]=0;
		if(dopen)this.iOpenPoint=this.iDestCount;
		op=this.iDestCount;
		if(this.iOpenPoint==op)this.btncs[this.iDestCount][2]=1;//箭头向上
		else this.btncs[this.iDestCount][2]=2;//箭头向下
		this.btncs[this.iDestCount][3]=20;
		this.btncs[this.iDestCount][4]=80;
		this.iDestCount++;
		
		if(this.iOpenPoint==op)
		{//定时活动
			if(GmMe.me.rbs.iLev>=30)
			{
				this.btn_dest[this.iDestCount].InitButton("组队类型2");
				this.btn_dest[this.iDestCount].sName="门派闯关";
				this.btncs[this.iDestCount][0]=6;
				this.btncs[this.iDestCount][1]=0;
				this.btncs[this.iDestCount][2]=0;//无
				this.btncs[this.iDestCount][3]=30;
				this.btncs[this.iDestCount][4]=80;
				this.iDestCount++;
				
				this.btn_dest[this.iDestCount].InitButton("组队类型2");
				this.btn_dest[this.iDestCount].sName="保卫西阳";
				this.btncs[this.iDestCount][0]=7;
				this.btncs[this.iDestCount][1]=0;
				this.btncs[this.iDestCount][2]=0;//无
				this.btncs[this.iDestCount][3]=30;
				this.btncs[this.iDestCount][4]=80;
				this.iDestCount++;
			}
		}
		this.iDestH=this.iDestCount*85-5+40;
	}
	

	Draw()
	{
		var i,j;
		var offx,offy;
		var offw,offh;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH,"组","队");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		
		if(!this.bLocked1)
		{
			if(this.iOffH>0)this.iOffH/=2;
			if(this.iDestH<this.iShowH)i=this.iDestH;
			else i=this.iShowH;
			j=this.iDestH+this.iOffH;
			if(j<i)
			{
				this.iOffH+=(i-j)/2;
			}
		}
		if(!this.bLocked2)
		{
			if(this.iOffY>0)this.iOffY/=2;
			if(this.iTlCount*83<83*5+30)i=this.iTlCount*83;
			else i=83*5+30;
			j=this.iTlCount*83+this.iOffY;
			if(j<i)
			{
				this.iOffY+=(i-j)/2;
			}
		}
		offx=this.iX+30;offy=this.iY+30;
		offw=270;offh=this.iH-60;
		DrawMode.new_framein(offx,offy,offw,offh);
		M3DFast.gi().SetViewClip(offx+20, offy+20, offx+20+230, offy+20+this.iShowH);
		for(i=0;i<this.iDestCount;i++)
		{
			this.btn_dest[i].Move(offx+20, offy+20+i*85+this.iOffH, 230, 80);
			if(i==this.iDestPoint)
			{
				this.btn_dest[i].bMouseIn=true;
				this.btn_dest[i].bMouseDown=true;
			}
			this.btn_dest[i].Draw();
			if(this.btncs[i][2]==1)GmPlay.xani_nui4.DrawAnima(this.btn_dest[i].iX, this.btn_dest[i].iY, "组队目录开关",1);
			else if(this.btncs[i][2]==2)GmPlay.xani_nui4.DrawAnima(this.btn_dest[i].iX, this.btn_dest[i].iY, "组队目录开关",0);
		}
		M3DFast.gi().NoClip();
		
		this.btn_create.Move(offx+offw/2-161/2, offy+offh-20-53, 161, 53);
		this.btn_create.Draw();

		offx=this.iX+30+270+20;offy=this.iY+30;
		offw=this.iW-30-30-270-20;offh=this.iH-60;
		DrawMode.new_framein(offx,offy,offw,offh);
//		M3DFast.gi().DrawText_2(offx+offw/2, offy+30, "附 近 队 伍("+this.iTlCount+")", 0xff000000, 30, 101, 1, 1, 0, -2, -2, 3, 0xff80ffff);
		this.btn_applyall.Move(offx+20, offy+offh-20-53, 161, 53);
		this.btn_applyall.Draw();
		
		if(MyTeam.bSingleAutoTeaming)this.btn_autoteam.sName="匹配中...";
		else this.btn_autoteam.sName="自动匹配";
		this.btn_autoteam.Move(offx+20+161+70, offy+offh-20-53, 161, 53);
		this.btn_autoteam.Draw();
		
		this.btn_fresh.Move(offx+20+161+70+161+70, offy+offh-20-53, 161, 53);
		this.btn_fresh.Draw();
		
		if(this.iTlCount<=0)
		{
			M3DFast.gi().DrawTextEx(offx+offw/2, offy+offh/2-40, "当前目标没有队伍", 0xff003e57, 35, 101, 1, 1, 0, -2, -2);
		}
		
		offx+=20;
		offy+=20;
		
		M3DFast.gi().SetViewClip(offx, offy, offx+630, offy+83*5+30);
		offy+=this.iOffY;
		for(i=0;i<this.iTlCount;i++)
		{
			GmPlay.xani_nui4.DrawAnima(offx, offy, "队伍条",0);
			GmPlay.xani_nui4.DrawAnima(offx, offy, "队伍条",this.tl[i].iCount);
			GmPlay.xani_head.DrawAnimaEx(offx+8, offy+8, "新头像"+(this.tl[i].iRaX), 0, 101, 0.8, 0.8, 0, 0, 0);
//			GmPlay.xani_head.DrawAnima(offx+4, offy+4, "新头像"+(this.tl[i].iRaX), 0);
			M3DFast.gi().DrawTextEx(offx+8+80, offy+20, this.tl[i].sName, 0xffffffff, 22, 101, 1, 1, 0, 0, -2);
			M3DFast.gi().DrawTextEx(offx+8+80, offy+57, GameData.sSchools[this.tl[i].iSchool], 0xffffffff, 22, 101, 1, 1, 0, 0, -2);
			M3DFast.gi().DrawTextEx(offx+8+80+70, offy+57, this.tl[i].iLev+"级", 0xffffff00, 22, 101, 1, 1, 0, 0, -2);
			
			M3DFast.gi().DrawTextEx(offx+375, offy+27, GmPlay.de_map.strValue(this.tl[i].iMapId, 0, 1), 0xffffffff, 20, 101, 1, 1, 0, -3, -2);
			if(this.tl[i].iTarget>0 && this.tl[i].iTarget<5)M3DFast.gi().DrawTextEx(offx+385, offy+27, TeamCreate._TARGET[this.tl[i].iTarget], 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
			M3DFast.gi().DrawTextEx(offx+390, offy+61, this.tl[i].iCount+"/5", 0xff000000, 20, 101, 1, 1, 0, -2, -2);
			
			this.tl[i].btn_apply.Move(offx+500, offy+78/2-52/2, 110, 52);
			if(MapManager.gi().iCurrentMapId==this.tl[i].iMapId)this.tl[i].btn_apply.sName="申请";
			else this.tl[i].btn_apply.sName="前往";
			if(this.tl[i].bApplyed)M3DFast.gi().DrawTextEx(this.tl[i].btn_apply.iX+this.tl[i].btn_apply.iW/2,this.tl[i].btn_apply.iY+this.tl[i].btn_apply.iH/2,"已申请",0xff003e57,30,101,1,1,0,-2,-2);
			else this.tl[i].btn_apply.Draw();
			//this.tl[i].sName
			offy+=83;
		}
		M3DFast.gi().NoClip();
		

	}
	
	
	ProcTouch( msg, x, y)
	{
		if(msg==3)
		{
			if(this.bLocked1)
			{
				this.bLocked1=false;
				return true;
			}
			if(this.bLocked2)
			{
				this.bLocked2=false;
				return true;
			}
		}
		
		var i,j;
		var offx,offy;

		offx=this.iX+30;
		offy=this.iY+30;
		if(XDefine.bInRect(x, y, offx, offy, 270, 20+this.iShowH))
		{
			for(i=0;i<this.iDestCount;i++)
			{
				if(this.btn_dest[i].ProcTouch(msg, x, y))
				{
					if(this.btn_dest[i].bCheck())
					{//点击任意一个按钮，获取队伍信息
						this.iDestPoint=i;
						if(this.btncs[i][0]==99)
						{//开关除害地图
							if(this.iOpenPoint<0)this.iOpenPoint=i;
							else this.iOpenPoint=-1;
							this.ResetButton(false);
						}
						GmProtocol.gi().s_TeamOperate(12, this.btncs[this.iDestPoint][0], this.btncs[this.iDestPoint][1]);//获取对应队伍
					}
				}
			}
			if(msg==1)this.iLockY=y;
			if(msg==2)
			{
				if(!this.bLocked1)
				{
					i=this.iLockY-y;
					if(i<-15 || i>15)
					{//取消按键按下状态
						this.bLocked1=true;
						for(i=0;i<this.iDestCount;i++)this.btn_dest[i].bMouseDown=false;
					}
				}
			}
		}
		if(msg==2)
		{
			if(this.bLocked1)
			{
				i=this.iLockY-y;
				this.iOffH-=i;
				this.iLockY=y;
				return true;
			}
		}
		
		offx=this.iX+30+270+20+20;offy=this.iY+30+20;
		if(XDefine.bInRect(x, y, offx, offy, 630, 83*5+30))
		{//前往/申请按钮
			for(i=0;i<this.iTlCount;i++)
			{
				if(this.tl[i].bApplyed)continue;
				if(this.tl[i].btn_apply.ProcTouch(msg, x, y))
				{
					if(this.tl[i].btn_apply.bCheck())
					{//申请或前往
						if(MapManager.gi().iCurrentMapId==this.tl[i].iMapId)
						{//this.tl[i].btn_apply.sName="申请";
							GmProtocol.gi().s_TeamOperate(3, this.tl[i].iRid, 0);
							this.tl[i].bApplyed=true;
						}
						else
						{//this.tl[i].btn_apply.sName="前往";
							if(MyAI.gi().FindMap(this.tl[i].iMapId, -1, -1,false,true))
							{
								TeamCreate.iWaitingApplyMapId=this.tl[i].iMapId;
								TeamCreate.iWaitingApplyRid=this.tl[i].iRid;
							}
							XStat.gi().PopStat(1);
						}
					}
				}
			}
			if(msg==1)this.iLockY=y;
			if(msg==2)
			{
				if(!this.bLocked2)
				{
					i=this.iLockY-y;
					if(i<-15 || i>15)
					{//取消按键按下状态
						this.bLocked2=true;
//						for(i=0;i<this.iDestCount;i++)this.btn_dest[i].bMouseDown=false;
					}
				}
			}
		}
		if(msg==2)
		{
			if(this.bLocked2)
			{
				i=this.iLockY-y;
				this.iOffY-=i;
				this.iLockY=y;
				return true;
			}
		}

		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{
//				if(this.btncs[this.iDestPoint][0]<0 || this.btncs[this.iDestPoint][0]>7)EasyMessage.easymsg.AddMessage("请先选择队伍目标");
//				else
				{
				GmProtocol.gi().s_TeamOperate(0, this.btncs[this.iDestPoint][0], this.btncs[this.iDestPoint][1]);// 组队
				XStat.gi().PopStat(1);
				FastButton.gi().iTeamButtonDelay=30;
				}
			}
			return true;
		}
		if(this.btn_fresh.ProcTouch(msg, x, y))
		{
			if(this.btn_fresh.bCheck())
			{//刷新
				GmProtocol.gi().s_TeamOperate(12, this.btncs[this.iDestPoint][0], this.btncs[this.iDestPoint][1]);//获取对应队伍
			}
			return true;
		}
		if(this.btn_applyall.ProcTouch(msg, x, y))
		{
			if(this.btn_applyall.bCheck())
			{//一键申请
				j=0;
				for(i=0;i<this.iTlCount;i++)
				{
					if(this.tl[i].bApplyed)continue;
					if(MapManager.gi().iCurrentMapId==this.tl[i].iMapId)
					{//this.tl[i].btn_apply.sName="申请";
						GmProtocol.gi().s_TeamOperate(3, this.tl[i].iRid, 0);
						this.tl[i].bApplyed=true;
						j++;
					}
				}
				if(j==0)EasyMessage.easymsg.AddMessage("附近没有队伍可申请");
			}
			return true;
		}

		if(this.btn_autoteam.ProcTouch(msg, x, y))
		{
			if(this.btn_autoteam.bCheck())
			{
				if(this.btncs[this.iDestPoint][0]<0 || this.btncs[this.iDestPoint][0]>7)EasyMessage.easymsg.AddMessage("请先选择队伍目标");
				else
				{
					GmProtocol.gi().s_TeamOperate(25,this.btncs[this.iDestPoint][0],0);
				}
			}
			return true;
		}

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}
TeamCreate.iWaitingApplyMapId=0;//
TeamCreate.iWaitingApplyRid=0;//等待申请目标ID
TeamCreate._LEV_MAP=[
	[10,14,18,19], //渡口 大禹水道
	[15,19,18,19,20], //渡口 大禹水道 平原山陵
	[20,24,19,20,21], //大禹水道 平原山陵 巫山
	[25,29,20,21,22], //平原山陵 巫山 太行山
	[30,34,21,22,23], //巫山 太行山 云蒙山
	[35,39,22,23,24], //太行山 云蒙山 烈焰峰
	[40,44,23,24,25],//云蒙山 烈焰峰 函谷关
	[45,49,24,25,26], //烈焰峰 函谷关 长城
	[50,54,25,26,27], //函谷关 长城 阴山
	[55,59,26,27,35], //长城 阴山 地1
	[60,64,27,35,36], //阴山 地1地2
	[65,69,25,26,50 ],//地1 地2 匈奴营寨
	[70,72,36,50,51], //地2 匈奴营寨 古战场
	[73,74,50,51,52], //匈奴营寨 古战场 泰山
	[75,76,51,52,53], //古战场 泰山 蜀山
	[77,100,52,53] //泰山 蜀山
	];
TeamCreate._TARGET=[
				"无目标",
				"为民除害",//1
				"追捕强盗",
				"山贼宝图",
				"挑战嚣张",//4
				"封印叔叔",
				"门派闯关",
				"保卫西阳"//7
		];

		TeamCreate.Open=function()
		{
			if(XStat.gi().CheckStat(XStat.GS_TEAMCREATE))return;
			XStat.gi().PushStat(XStat.GS_TEAMCREATE);
			//发送获取周围队伍列表申请
			GmProtocol.gi().s_TeamOperate(12,0,0);
		}

		TeamCreate.teamlist=function( pls)
	{
		if(!XStat.gi().CheckStat(XStat.GS_TEAMCREATE))return;
		var tc=XStat.gi().LastStat(0);
		var i,j=0;
		tc.iTlCount=0;
		while(true)
		{
			i=pls.GetNextInt();
			if(i==0)break;
			tc.tl[j]=new _TEAMLIST();
			tc.tl[j].iRid=i;
			tc.tl[j].sName=pls.GetNextString();
			tc.tl[j].iMapId=pls.GetNextShort();
			tc.tl[j].iLev=pls.GetNextShort();
			i=pls.GetNextByte();
			tc.tl[j].iRaX=i%10;
			tc.tl[j].iSchool=parseInt(i/10);
			tc.tl[j].iTarget=pls.GetNextByte();
			tc.tl[j].iTargetMap=pls.GetNextShort();
			tc.tl[j].iCount=pls.GetNextByte();
			tc.tl[j].bApplyed=false;
			tc.tl[j].iSort=GmMe.me.rbs.iLev-tc.tl[j].iLev;
			if(tc.tl[j].iSort<0)tc.tl[j].iSort=-tc.tl[j].iSort;
			j++;
			if(j>=60)break;
		}
		tc.iTlCount=j;
		
		//根据等级差，队伍人数排序
		for(i=0;i<tc.iTlCount-1;i++)
		{
			for(j=i+1;j<tc.iTlCount;j++)
			{
				if(tc.tl[i].iSort>tc.tl[j].iSort)
				{//等级越接近，放到越前面
					tc.tl[i].swap(tc.tl[j]);
				}
			}
		}
		//////////////////////////////
//		for(i=1;i<7;i++)
//		{
//			tc.tl[i]=new _TEAMLIST();
//			tc.tl[i].iRid=tc.tl[0].iRid;
//			tc.tl[i].sName=tc.tl[0].sName+i;
//			tc.tl[i].iLev=tc.tl[0].iLev;
//			tc.tl[i].iRaX=tc.tl[0].iRaX;
//			tc.tl[i].iSchool=tc.tl[0].iSchool;
//			tc.tl[i].sTarget=tc.tl[0].sTarget;
//		}
//		tc.iTlCount=7;
		
	}