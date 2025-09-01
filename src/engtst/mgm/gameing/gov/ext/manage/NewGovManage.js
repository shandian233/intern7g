
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import PromptMessage from "../../../../../../engtst/mgm/frame/message/PromptMessage"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"

import Gov_SetBuilding from "./Gov_SetBuilding";
import Gov_SetHostility from "./Gov_SetHostility";
import Gov_SetMtLev from "./Gov_SetMtLev";
import Gov_SetName from "./Gov_SetName";
import Gov_SetResearch from "./Gov_SetResearch";

export default class NewGovManage extends BaseClass{
	
	 constructor( a)
	{
		super();
		this.iW=1100;
		this.iH=620;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_detail=new Array(7);//
		this.btn_set=new Array(7);//
		for(var i=0;i<7;i++)
		{
			this.btn_detail[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_detail[i].bSingleButton=true;
			this.btn_set[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_set[i].InitButton("普通按钮140_55");
			this.btn_set[i].sName="设置";
		}
		
		this.bLock3=false;
		this.iOffY3=0;

		this._GOVMANAGE=[
			["帮派建筑","","#c0000001.青龙堂：#e# # 升级后可提高青龙任务效率以及雇佣工人的收益#e2.白虎堂：#e# # 升级后可降低维护的安定度消耗#e3.朱雀堂：#e# # 升级后可提高成员炼丹成功率和副产品率#e4.玄武堂：#e# # 升级后可提升行动力上限和帮派维护增加的守护兽经验#e5.学院：#e# # 升级后可提升帮派维护增加的技能经验#e6.金库：#e# # 升级后可提升帮派资金上限#e7.商会：#e# # 升级后可增加出产道具种类和数量#e8.药房：#e# # 升级后可增加出产药品种类和数量#e9.厢房：#e# # 升级后可提升帮派人数上限"],
			["帮派技能","","#c0000001.强身术#e# # 学习后能增加气血上限#e2.修心#e# # 学习后能增加魔法上限#e3.健体术#e# # 学习后能增加体力上限#e4.炼丹术#e# # 学习后可以提高炼丹的能力#e5.烹饪#e# # 学习后可以提高制作食物的能力#e6.锻造术#e# # 学习后可以提高制作头盔和腰带的能力#e7.冶金术#e# # 学习后可以提高制作武器和项链的能力#e8.剪裁术#e# # 学习后可以提高制作衣服和靴子的能力"],
			["维护等级","","#c0000001.初级维护#e# # 提供基础维护效果#e2.中级维护#e# # 消耗150%基础维护资金，提供150%基础维护效果#e3.高级维护#e# # 消耗200%基础维护资金，提供200%基础维护效果"],
			["帮派升级","","#c000000# # 帮派升级可以提高帮派建筑的等级上限#e#e# # 帮派升级需要消耗繁荣度，繁荣度根据时间恢复，繁荣度上限通过建造建筑提高"],
			["设置敌对","","#c000000# # 设置敌对会使得白虎任务有极高的概率随机到敌对帮派#e#e# # 敌对设置只能由帮主进行。"],
			["帮派改名","",""],
			["解散帮派","",""]
		];
	}

	_GetSet( pls)
	{
		var i;
		var cs1=pls.GetNextInt();
		if(cs1==0)
		{//获取基本信息
			this.building=new Array(4);//
			for(i=0;i<4;i++)this.building[i]=pls.GetNextInt();
			this._GOVMANAGE[0][1]="当前正在建造"+MyGov._GOVBUILDINGS[this.building[0]]+this.building[1]+"级("+this.building[2]+"/"+this.building[3]+")";
			this.research=new Array(4);//
			for(i=0;i<4;i++)this.research[i]=pls.GetNextInt();
			this._GOVMANAGE[1][1]="当前正在研究"+MyGov._GOVSKILLS[this.research[0]]+this.research[1]+"级("+this.research[2]+"/"+this.research[3]+")";
		
			this.mtlev=pls.GetNextInt();
			this._GOVMANAGE[2][1]="当前帮派维护等级："+MyGov._GOVMTLEV[this.mtlev];
			
			this.iExp=pls.GetNextInt();
			this.iMaxExp=pls.GetNextInt();
			this.iUpgradeExp=pls.GetNextInt();
			this._GOVMANAGE[3][1]="升级需要繁荣度："+this.iExp+"/"+this.iUpgradeExp;
			
			this.iHostilityId=pls.GetNextInt();
			this.sHostilityName=pls.GetNextString();
			if(this.iHostilityId==0)this._GOVMANAGE[4][1]="当前没有敌对帮派";
			else this._GOVMANAGE[4][1]="当前敌对帮派："+this.sHostilityName;
		}
	}

	Draw()
	{
		var i;

		DrawMode.new_baseframe4(this.iX, this.iY, this.iW,this.iH,"帮","派","管","理");
		this.btn_close.Draw();
		
		DrawMode.new_framein(this.iX+25, this.iY+25, this.iW-50, this.iH-50);

		M3DFast.gi().SetViewClip(this.iX+25+20, this.iY+25+20, this.iX+this.iW-25-20, this.iY+this.iH-25-20);
		for(i=0;i<7;i++)
		{
			this.DrawEntry(i,this.iX+25+20,this.iY+25+20+i*100+this.iOffY3,this._GOVMANAGE[i][0],this._GOVMANAGE[i][1]);
		}
		M3DFast.gi().NoClip();
		if(!this.bLock3)
		{//100*6=600,,,,,,,,,this.iH-90
			i=(100*7-8)-(this.iH-90);
			if(this.iOffY3>0)this.iOffY3/=2;
			if(i<=0)
			{
				if(this.iOffY3<0)this.iOffY3/=2;
			}
			else if(this.iOffY3<-i)
			{
				i+=this.iOffY3;
				i/=2;
				this.iOffY3-=i;
			}
		}
		
		if(Confirm1.end(Confirm1.CONFIRM_GOVUPGRADE))
		{
			if(Confirm1.bConfirm)
			{//升级帮派
				GmProtocol.gi().s_NewGovOperate(18, 4, 0, 0, 0, "");
				GmProtocol.gi().s_NewGovOperate(18, 0, 0, 0, 0, "");
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_GOVDISBAND))
		{
			if(Confirm1.bConfirm)
			{//解散帮派
				GmProtocol.gi().s_NewGovOperate(18, 7, 0, 0, 0, "");
				XStat.gi().PopStat(1);
			}
		}
	}

	 DrawEntry( p, offx, offy, title, detail)
	{
		DrawMode.frame_type1("帮派福利条a20_92",offx,offy,1010,20);
		
		GmPlay.xani_icon.DrawAnima_aa(offx+20, offy+(92-73)/2, title,0);
		
		M3DFast.gi().DrawText_2(offx+20+73+20,offy+92/2, title, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 4, 0xffa57841);
		if(detail.length>0)M3DFast.gi().DrawTextEx(offx+20+73+20+160, offy+92/2, detail, 0xff000000, 20, 101, 1, 1, 0, 0, -2);
		this.btn_set[p].Move(offx+1010-20-140,offy+(92-55)/2,140,55);
		this.btn_set[p].Draw();
		
		this.btn_detail[p].Move(offx+20, offy+(92-73)/2, 73,73);
	}
	
	 ProcTouch( msg, x, y)
	{
		if(msg==3)
		{
			this.bLock3=false;
		}
		var i;
		if(this.bLock3 && msg==2)
		{
			this.iOffY3+=(y-this.iLock3Y);
			this.iLock3Y=y;
		}

		if(XDefine.bInRect(x, y, this.iX+50, this.iY+50, this.iW-100, this.iH-100))
		{
			for(i=0;i<7;i++)
			{
				if(this.btn_detail[i].ProcTouch(msg, x, y))
				{
					if(this.btn_detail[i].bCheck())
					{
						if(this._GOVMANAGE[i][2].length>0)PromptMessage.Open(this._GOVMANAGE[i][0],this._GOVMANAGE[i][2]);
					}
					return true;
				}
				if(this.btn_set[i].ProcTouch(msg, x, y))
				{
					if(this.btn_set[i].bCheck())
					{
						switch(i)
						{
						case 0://帮派建筑
							if(MyGov.mg.bCheckPower(1))Gov_SetBuilding.Open();
							else FrameMessage.fm.Open("你没有帮派管理权限");
							break;
						case 1://帮派技能
							if(MyGov.mg.bCheckPower(1))Gov_SetResearch.Open();
							else FrameMessage.fm.Open("你没有帮派管理权限");
							break;
						case 2://维护等级
							if(MyGov.mg.bCheckPower(1))Gov_SetMtLev.Open();
							else FrameMessage.fm.Open("你没有帮派管理权限");
							break;
						case 3://升级
							if(MyGov.mg.iJob==0)Confirm1.start(Confirm1.CONFIRM_GOVUPGRADE,"是否确定升级帮派？");
							else FrameMessage.fm.Open("帮主才能升级帮派");
							break;
						case 4://设置敌对
							if(MyGov.mg.iJob==0)
							{
								if(this.iHostilityId==0)Gov_SetHostility.Open();
								else
								{
									GmProtocol.gi().s_NewGovOperate(18, 5, 0, 0, 0, "0");
									GmProtocol.gi().s_NewGovOperate(18, 0, 0, 0, 0, "");
								}
							}
							else FrameMessage.fm.Open("帮主才能设置敌对");
							break;
						case 5://改名
							if(MyGov.mg.iJob==0)Gov_SetName.Open();
							else FrameMessage.fm.Open("帮主才能修改帮派名称");
							break;
						case 6://解散帮派
							if(MyGov.mg.iJob==0)Confirm1.start(Confirm1.CONFIRM_GOVDISBAND,"是否确定解散帮派？");
							else FrameMessage.fm.Open("帮主才能解散帮派");
							break;
						}
					}
					return true;
				}
			}
			if(XDefine.bInRect(x, y, this.iX+25, this.iY+25, this.iW-50, this.iH-50) && msg==1)
			{
				this.bLock3=true;
				this.iLock3Y=y;
				return true;
			}
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}
NewGovManage.Open=function()
{
	var afg;
	if (XStat.gi().iXStat != XStat.GS_NEWGOVMANAGE)afg=XStat.gi().PushStat(XStat.GS_NEWGOVMANAGE);
	else afg = XStat.gi().LastStat(0);
	GmProtocol.gi().s_NewGovOperate(18, 0, 0, 0, 0, "");
}

NewGovManage.GetSet=function( pls)
{
	var afg;
	afg=XStat.gi().FindStat(XStat.GS_NEWGOVMANAGE);
	if (afg!=null)afg._GetSet(pls);
}