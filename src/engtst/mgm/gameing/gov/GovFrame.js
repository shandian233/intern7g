
import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButton from "../../../../engine/control/XButton"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import PrivateChat_Send from "../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
class _APPLYLIST
{//申请入帮人员列表
//	public int iRid;
//	public String sName;
constructor()
{

}
}

class _GOVMEMBER
{
/*	public int iRid;
	public int iJob;
	public String sName;*/
	constructor()
	{

	}
}

class _GOVBUILDING
{
	constructor()
	{
		this.iBid=-1;
		this.iLev=0;
		this.iProc=0;
	}
}
class _GOVSKILL
{
	constructor()
	{
		this.iSid=-1;
		this.iLev=0;
		this.iProc=0;
	}
}

export default class GovFrame extends BaseClass{
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=600;
		this.iH=400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_ui);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX+this.iW-60-5, this.iY, 60, 60);
		
		this.btn_base=new Array(6);//
		this.bBaseInited=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn_base[i]=new XButton(GmPlay.xani_ui);
			this.btn_base[i].InitButton("统一中按钮4");
			this.btn_base[i].Move(this.iX+10, this.iY+80+i*50, 130, 40);
			this.bBaseInited[i]=false;
		}
		this.btn_base[0].sName="基本属性";
		this.btn_base[1].sName="帮派成员";
		this.btn_base[2].sName="帮派建筑";
		this.btn_base[3].sName="帮派技能";
		this.btn_base[4].sName="其他功能";
		
		this.btn_base[5].sName="申请列表";
		this.iBasePoint=0;
		
		this.bBaseInited[0]=true;
		GmProtocol.gi().s_GetBaseGovData(0,0);
		
		if(MyGov.mg.iJob==0 ||
				MyGov.mg.iJob==1 ||
				MyGov.mg.iJob==2 ||
				MyGov.mg.iJob==3 ||
				MyGov.mg.iJob==4)this.iBaseCount=6;//帮主，副帮主，护法，长老，可以同意和拒绝
		else this.iBaseCount=5;
		
		this.iApplyCount=0;
		this.applylist=new Array(10);//
		this.btn_agree=new Array(10);//
		this.btn_refuse=new Array(10);//
		for(i=0;i<10;i++)
		{
			this.applylist[i]=new _APPLYLIST();
			this.btn_agree[i]=new XButton(GmPlay.xani_ui);
			this.btn_agree[i].InitButton("统一小按钮2");
			this.btn_agree[i].sName="同意";
			this.btn_refuse[i]=new XButton(GmPlay.xani_ui);
			this.btn_refuse[i].InitButton("统一小按钮2");
			this.btn_refuse[i].sName="拒绝";
		}
		
		this.iMemberCount=0;
		this.govmember=new Array(10);//
		this.govbuilding=new Array(10);//
		this.btn_build=new Array(10);//
		this.govskill=new Array(10);//
		this.btn_skill=new Array(10);//
		for(i=0;i<10;i++)
		{
			this.govmember[i]=new _GOVMEMBER();
			
			this.govbuilding[i]=new _GOVBUILDING();
			this.btn_build[i]=new XButton(GmPlay.xani_ui);
			this.btn_build[i].InitButton("统一小按钮2");
			this.btn_build[i].sName="建造";
			
			this.govskill[i]=new _GOVSKILL();
			this.btn_skill[i]=new XButton(GmPlay.xani_ui);
			this.btn_skill[i].InitButton("统一小按钮2");
			this.btn_skill[i].sName="研究";
		}
		this.btn_left=new XButton(GmPlay.xani_ui);
		this.btn_left.InitButton("统一中按钮3");
		this.btn_left.sName="上一页";
		this.btn_right=new XButton(GmPlay.xani_ui);
		this.btn_right.InitButton("统一中按钮3");
		this.btn_right.sName="下一页";
		
		this.btn_leavegov=new XButton(GmPlay.xani_ui);
		this.btn_leavegov.InitButton("统一中按钮4");
		this.btn_leavegov.sName="离帮";
		
		this.btn_mtlev=new XButton(GmPlay.xani_ui);
		this.btn_mtlev.InitButton("统一中按钮4");
		this.btn_mtlev.sName="离帮";
		
		this.btn_upgrade=new XButton(GmPlay.xani_ui);
		this.btn_upgrade.InitButton("统一中按钮4");
		this.btn_upgrade.sName="升级帮派";
		
		this.btn_swap=new XButton(GmPlay.xani_ui);
		this.btn_swap.InitButton("统一中按钮4");
		this.btn_swap.sName="帮主转让";
		
		this.btn_message=new XButton(GmPlay.xani_ui);
		this.btn_message.InitButton("统一中按钮4");
		this.btn_message.sName="群发邮件";
		
		this.btn_watch=new XButton(GmPlay.xani_ui);
		this.btn_watch.InitButton("统一中按钮2");
		this.btn_watch.sName="查看";
		this.iMemberPoint=-1;
	}

	Draw_0( offx, offy, w, h)
	{//名称，等级，当前繁荣度/繁荣度上限，当前资金/资金上限，升到下一等级所需繁荣度
		DrawMode.Frame1_BR(offx+20, offy+20, w-40, 40);
		DrawMode.Data1_BR(offx+30, offy+30, "我的职位:",sJob(MyGov.mg.iJob),100,70);
		DrawMode.Data1_BR(offx+220, offy+30, "我的帮贡:",""+MyGov.mg.iTick,100,80);

		offy+=60;
		DrawMode.Frame1_BR(offx+20, offy+10, w-40, h-90);
		DrawMode.Data1_BR(offx+30, offy+20, "帮派名称:",MyGov.mg.sName,100,130);
		DrawMode.Data1_BR(offx+270, offy+20, "帮派号码:",""+MyGov.mg.iRealGid,70,60);

		DrawMode.Data1_BR(offx+30, offy+20+25, "帮派等级:",""+this.iLev,100,60);
		DrawMode.Data1_BR(offx+220, offy+20+25,  "帮派人数:",""+this.iAllMemberCount+"/"+this.iMaxMemberCount, 100,80);

		DrawMode.Data1_BR(offx+30, offy+20+25*2, "帮派资金:",""+this.iMoney+"/"+this.iMaxMoney,100,260);

		DrawMode.Data1_BR(offx+30, offy+20+25*3, "当前繁荣度:",""+this.iExp+"/"+this.iMaxExp,120,240);
		DrawMode.Data1_BR(offx+30, offy+20+25*4, "升级繁荣度:",""+this.iUpgradExp,120,240);
		DrawMode.Data1_BR(offx+30, offy+20+25*5, "帮派行动力:",""+this.iTick+"/"+this.iMaxTick,120,240);

		DrawMode.Data1_BR(offx+30, offy+20+25*6, "当前建造建筑:",sBuilding(this.iBuildingId)+"("+this.iBExp+"/"+this.iBMaxExp+")",140,220);
		DrawMode.Data1_BR(offx+30, offy+20+25*7, "当前研究科技:",sSkill(this.iResearchId)+"("+this.iRExp+"/"+this.iRMaxExp+")",140,220);
		
		if(this.iRMtLev==0)DrawMode.Data1_BR(offx+30, offy+20+25*8, "当前维护级别:","普通",140,220);
		else if(this.iRMtLev==1)DrawMode.Data1_BR(offx+30, offy+20+25*8, "当前维护级别:","中级",140,220);
		else if(this.iRMtLev==2)DrawMode.Data1_BR(offx+30, offy+20+25*8, "当前维护级别:","高级",140,220);

//		this.pm3f.DrawTextEx(offx, offy+300, "维护需要资金达到："+(600000+this.iLev*50000), 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
	}


	Draw_1( offx, offy, w, h)
	{//帮派成员列表
		var i;
		var x,y;
		DrawMode.Frame1_BR(offx+20, offy+20, w-40, h-40);
		for(i=0;i<10;i++)
		{
			x=offx+30;
			y=offy+30+i*22;
			DrawMode.Text1_BR(x,y,w-60);
			if(i>=this.iMemberCount)continue;
			this.pm3f.DrawTextEx(x+10, y+10, this.govmember[i].sName, 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(x+160, y, sJob(this.govmember[i].iJob), 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		}
		if(this.iMemberPoint>=0 && this.iMemberPoint<this.iMemberCount)
		{
			x=offx+30;
			y=offy+30+this.iMemberPoint*22;
			this.btn_watch.Move(x+300, y-10, 70, 40);
			this.btn_watch.Draw();
		}
		
		if(this.iTotalLine==0)this.iPageCount=1;
		else this.iPageCount=(this.iTotalLine-1)/this.iLineEachPage+1;
		
		this.pm3f.DrawTextEx(offx+w/2, offy+h-50,""+(iPagePoint+1)+"/"+this.iPageCount, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		
		this.btn_left.Move(offx+w/2-100-80, offy+h-70, 100, 40);
		this.btn_left.Draw();
		
		this.btn_right.Move(offx+w/2+80, offy+h-70, 100, 40);
		this.btn_right.Draw();
	}
	Draw_2( offx, offy, w, h)
	{//帮派建筑列表
		var i;
		var x,y;
		DrawMode.Frame1_BR(offx+20, offy+20, w-40, h-40);
		
		for(i=0;i<8;i++)
		{
			x=offx+30;
			y=offy+38+i*33;
			DrawMode.Text1_BR(x,y,w-60);
			if(this.govbuilding[i].iBid!=-1)
			{
				this.pm3f.DrawTextEx(x+10,y, sBuilding(i)+this.govbuilding[i].iLev+"级", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
				this.pm3f.DrawTextEx(x+220,y, ""+this.govbuilding[i].iProc+"/"+MyGov.iBuildingUpgrad[this.govbuilding[i].iLev]/10, 0xffffffff, 20, 101, 1, 1, 0, -2, 0);
				if(MyGov.mg.iJob==0 || MyGov.mg.iJob==1)
				{//帮主可以设置建造目标
					if(this.iBuildingId==i)
					{
						this.pm3f.DrawTextEx(x+320, y, "建造中", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
					}
					else
					{
						this.btn_build[i].Move(x+320, y-5, 60, 30);
						this.btn_build[i].Draw();
					}
				}
			}
		}
	}
	Draw_3( offx, offy, w, h)
	{//帮派建筑列表
		var i;
		var x,y;
		DrawMode.Frame1_BR(offx+20, offy+20, w-40, h-40);
		for(i=0;i<8;i++)
		{
			x=offx+30;
			y=offy+38+i*33;
			DrawMode.Text1_BR(x,y,w-60);
			if(this.govskill[i].iSid!=-1)
			{
				this.pm3f.DrawTextEx(x+10, y, sSkill(i)+this.govskill[i].iLev+"级", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
				this.pm3f.DrawTextEx(x+220, y, ""+this.govskill[i].iProc+"/"+MyGov.iBuildingUpgrad[this.govskill[i].iLev], 0xffffffff, 20, 101, 1, 1, 0, -2, 0);
				if(MyGov.mg.iJob==0 || MyGov.mg.iJob==1)
				{//帮主可以设置建造目标
					if(this.iResearchId==i)
					{
						this.pm3f.DrawTextEx(x+320, y, "研究中", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
					}
					else
					{
						this.btn_skill[i].Move(x+320, y-5, 60, 30);
						this.btn_skill[i].Draw();
					}
				}
			}
		}
	}
	Draw_4( offx, offy, w, h)
	{//其他功能
		var x,y;
		DrawMode.Frame1_BR(offx+20, offy+20, w-40, h-40);
		
		x=offx+30;
		y=offy+30;
		this.btn_leavegov.Move(x, y, 130, 40);
		if(MyGov.mg.iJob==0)this.btn_leavegov.sName="解散帮派";
		else this.btn_leavegov.sName="离帮";
		this.btn_leavegov.Draw();
		
		if(MyGov.mg.iJob<=1)
		{
			y+=60;
			this.btn_mtlev.Move(x, y, 130, 40);
			if(this.iRMtLev==0)this.btn_mtlev.sName="维护:普通";
			else if(this.iRMtLev==1)this.btn_mtlev.sName="维护:中级";
			else if(this.iRMtLev==2)this.btn_mtlev.sName="维护:高级";
			this.btn_mtlev.Draw();
			
			y+=60;
			this.btn_upgrade.Move(x, y, 130, 40);
			this.btn_upgrade.Draw();
		}
		if(MyGov.mg.iJob<=4)
		{//长老以上职位可群发
			y+=60;
			this.btn_message.Move(x, y, 130, 40);
			this.btn_message.Draw();
		}
		x=offx+30+150;
		y=offy+30-60;
		
		if(MyGov.mg.iJob==0)
		{//帮助让位
			y+=60;
			this.btn_swap.Move(x, y, 130, 40);
			this.btn_swap.Draw();
		}
		
		if(Confirm1.end(Confirm1.CONFIRM_LEAVEGOV))
		{
			if(Confirm1.bConfirm)
			{//离开帮派
				GmProtocol.gi().s_LeaveGov();
				MyGov.mg.iRealGid=-1;
				XStat.gi().PopStat(1);
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_UPGRADEGOV))
		{
			if(Confirm1.bConfirm)
			{//离开帮派
				GmProtocol.gi().s_GovSet(3, 0);
				XStat.gi().PopStat(1);
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_SWAPGOV))
		{
			if(Confirm1.bConfirm)
			{//离开帮派
				GmProtocol.gi().s_GovSet(4, 0);
				XStat.gi().PopStat(1);
			}
		}
	}
	Draw_5( offx, offy, w, h)
	{
		var i;
		var x,y;
		DrawMode.Frame1_BR(offx+20, offy+20, w-40, h-40);
		for(i=0;i<this.iApplyCount;i++)
		{
			x=offx+30;
			y=offy+38+i*33;
			DrawMode.Text1_BR(x,y,w-60);
			this.pm3f.DrawTextEx(x+10, y+10, this.applylist[i].sName, 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
			if(this.applylist[i].iRid==-1)
			{
				this.pm3f.DrawTextEx(x+250, y, "已同意", 0xffff0000, 20, 101, 1, 1, 0, 0, 0);
				continue;
			}
			if(this.applylist[i].iRid==-2)
			{
				this.pm3f.DrawTextEx(x+250, y, "已拒绝", 0xffff0000, 20, 101, 1, 1, 0, 0, 0);
				continue;
			}
			this.btn_agree[i].Move(x+200, y-5, 60, 30);
			this.btn_agree[i].Draw();
			
			this.btn_refuse[i].Move(x+300, y-5, 60, 30);
			this.btn_refuse[i].Draw();
		}
	}
	Draw()
	{
		var i;
		DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"帮派属性");
		this.btn_close.Draw();
		
		for(i=0;i<this.iBaseCount;i++)
		{
			if(this.iBasePoint==i)
			{
				this.btn_base[i].bMouseDown=true;
				this.btn_base[i].bMouseIn=true;
			}
			this.btn_base[i].Draw();
		}
		
		DrawMode.Frame2_MD(this.iX+150, this.iY+65, this.iW-160, this.iH-75);
		
		switch(this.iBasePoint)
		{
		case 0://基本属性
			this.Draw_0(this.iX+150,this.iY+65,this.iW-160,this.iH-75);
			break;
		case 1://帮派人员列表
			this.Draw_1(this.iX+150,this.iY+65,this.iW-160,this.iH-75);
			break;
		case 2://建筑列表
			this.Draw_2(this.iX+150,this.iY+65,this.iW-160,this.iH-75);
			break;
		case 3://技能
			this.Draw_3(this.iX+150,this.iY+65,this.iW-160,this.iH-75);
			break;
		case 4://其他功能
			this.Draw_4(this.iX+150,this.iY+65,this.iW-160,this.iH-75);
			break;
		case 5://申请列表
			this.Draw_5(this.iX+150,this.iY+65,this.iW-160,this.iH-75);
			break;
		}
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<this.iBaseCount;i++)
		{
			if(this.btn_base[i].ProcTouch(msg, x, y))
			{
				if(this.btn_base[i].bCheck())
				{
					switch(i)
					{
					case 0://基本属性
					case 4://其他功能
						this.iBasePoint=i;
						break;
					case 1://任何人，获取帮派成员列表
					case 2://任何人，获取帮派建筑，等级，进度
					case 3://任何人，获取技能等级，进度
					case 5://帮主获取申请列表
						this.iBasePoint=i;
						if(this.bBaseInited[i]==false)
						{//发送数据获取请求
							this.bBaseInited[i]=true;
							GmProtocol.gi().s_GetBaseGovData(i,0);
						}
						break;
					}
				}
				//return true;
			}
		}
		
		if(this.iBasePoint==1)
		{//翻页
			if(MyGov.mg.iJob==0)
			{//帮助对成员操作，任命，踢出，
				
			}
			for(i=0;i<10;i++)
			{
				var xx=this.iX+150+30;
				var yy=this.iY+65+30+i*22;
				if(XDefine.bInRect(x, y, xx, yy, 220, 22) && i<this.iMemberCount)
				{
					this.iMemberPoint=i;
				}
			}
			if(this.iMemberPoint>=0)
			{
				if(this.btn_watch.ProcTouch(msg, x, y))
				{
					if(this.btn_watch.bCheck())
					{//打开查看详细
						GmProtocol.gi().s_GetBaseGovData(6,this.govmember[this.iMemberPoint].iRid);
						XStat.gi().PushStat(XStat.GS_MEMBERDETAIL);
					}
					return true;
				}
			}
			if(this.btn_left.ProcTouch(msg, x, y))
			{
				if(this.btn_left.bCheck())
				{
					if(iPagePoint>0)
					{
						iPagePoint--;
						GmProtocol.gi().s_GetBaseGovData(1,iPagePoint);
					}
				}
			}
			if(this.btn_right.ProcTouch(msg, x, y))
			{
				if(this.btn_right.bCheck())
				{
					if(iPagePoint<this.iPageCount-1)
					{
						iPagePoint++;
						GmProtocol.gi().s_GetBaseGovData(1,iPagePoint);
					}
				}
			}
		}
		if(this.iBasePoint==2 && (MyGov.mg.iJob==0 || MyGov.mg.iJob==1))
		{//帮主设置当前建造建筑
			for(i=0;i<8;i++)
			{
				if(i==this.iBuildingId)continue;
				if(this.btn_build[i].ProcTouch(msg, x, y))
				{
					if(this.btn_build[i].bCheck())
					{//当前建造建筑设置
						this.iBuildingId=i;
						GmProtocol.gi().s_GovSet(0, i);
					}
					return true;
				}
			}
		}
		if(this.iBasePoint==3 && (MyGov.mg.iJob==0 || MyGov.mg.iJob==1))
		{//帮主设置当前建造建筑
			for(i=0;i<8;i++)
			{
				if(i==this.iResearchId)continue;
				if(this.btn_skill[i].ProcTouch(msg, x, y))
				{
					if(this.btn_skill[i].bCheck())
					{//当前建造建筑设置
						this.iResearchId=i;
						GmProtocol.gi().s_GovSet(1, i);
					}
					return true;
				}
			}
		}
		if(this.iBasePoint==4)
		{
			if(this.btn_leavegov.ProcTouch(msg, x, y))
			{
				if(this.btn_leavegov.bCheck())
				{
					if(MyGov.mg.iJob==0)Confirm1.start(Confirm1.CONFIRM_LEAVEGOV,"是否确认解散帮派？");
					else Confirm1.start(Confirm1.CONFIRM_LEAVEGOV,"是否确认离帮？");
				}
				return true;
			}
			if(MyGov.mg.iJob<=1)
			{
				if(this.btn_message.ProcTouch(msg, x, y))
				{
					if(this.btn_message.bCheck())
					{//邮件群发
						PrivateChat_Send.OpenChat( 10000, MyGov.mg.sName,6);
						EasyMessage.easymsg.AddMessage("发送收取5万铜币");
					}
				}
			}
			if(MyGov.mg.iJob<=1)
			{
				if(this.btn_mtlev.ProcTouch(msg, x, y))
				{
					if(this.btn_mtlev.bCheck())
					{
						if(this.iRMtLev<2)this.iRMtLev++;
						else this.iRMtLev=0;
						GmProtocol.gi().s_GovSet(2, this.iRMtLev);
					}
					return true;
				}
				if(this.btn_upgrade.ProcTouch(msg, x, y))
				{
					if(this.btn_upgrade.bCheck())
					{//1级升2级，2个建筑达到10级、消耗80万帮派资金、繁荣度达到
						Confirm1.start(Confirm1.CONFIRM_UPGRADEGOV,"帮派"+this.iLev+"级升"+(this.iLev+1)+"级，要求2个建筑达到"+(this.iLev+1)*10+"级、帮派资金达到"+(this.iLev+1)*80*15/10+"万、繁荣度达到"+this.iUpgradExp+"#e升级成功消耗"+(this.iLev+1)*80+"万帮派资金#e是否确定升级帮派？");
//						GmProtocol.gi().s_GovSet(3, 0);
					}
				}

				if(MyGov.mg.iJob==0)
				{//帮主装让
					if(this.btn_swap.ProcTouch(msg, x, y))
					{
						if(this.btn_swap.bCheck())
						{//1级升2级，2个建筑达到10级、消耗80万帮派资金、繁荣度达到
							Confirm1.start(Confirm1.CONFIRM_SWAPGOV,"是否确定将帮派转让给副帮主？");
//							GmProtocol.gi().s_GovSet(3, 0);
						}
					}
				}
			}
		}
		if(this.iBasePoint==5)
		{//帮助同意玩家加入帮派
			for(i=0;i<this.iApplyCount;i++)
			{
				if(this.applylist[i].iRid<0)continue;
				if(this.btn_agree[i].ProcTouch(msg, x, y))
				{
					if(this.btn_agree[i].bCheck())
					{//同意玩家入帮
						GmProtocol.gi().s_OperateGovMember(this.applylist[i].iRid,0,0);
						this.applylist[i].iRid=-1;
					}
					return true;
				}
				if(this.btn_refuse[i].ProcTouch(msg, x, y))
				{
					if(this.btn_refuse[i].bCheck())
					{//拒绝玩家入帮
						GmProtocol.gi().s_OperateGovMember(this.applylist[i].iRid,1,0);
						this.applylist[i].iRid=-2;
					}
					return true;
				}
			}
		}
		return false;
	}

	getgovdata( pls)
	{
		var i;
		var dtype=pls.GetNextByte();
//		if(dtype!=this.iBasePoint)return;
		switch(dtype)
		{
		case 0://帮派基本属性
			this.iLev=pls.GetNextByte();
			this.iMoney=pls.GetNextInt();
			this.iMaxMoney=pls.GetNextInt();
			this.iExp=pls.GetNextInt();
			this.iMaxExp=pls.GetNextInt();
			this.iTick=pls.GetNextInt();
			this.iMaxTick=pls.GetNextInt();
			this.iAllMemberCount=pls.GetNextInt();
			this.iMaxMemberCount=pls.GetNextInt();
			this.iUpgradExp=pls.GetNextInt();
			this.iBuildingId=pls.GetNextByte();
			this.iBExp=pls.GetNextInt();
			this.iBMaxExp=pls.GetNextInt();
			this.iResearchId=pls.GetNextByte();
			this.iRExp=pls.GetNextInt();
			this.iRMaxExp=pls.GetNextInt();
			this.iRMtLev=pls.GetNextInt();
			break;
		case 1://获得帮派成员列表,根据职位排序的
			this.iTotalLine=pls.GetNextInt();
			this.iLineEachPage=pls.GetNextByte();//每页行数
			iPagePoint=pls.GetNextByte();//当前页数
			this.iMemberCount=pls.GetNextByte();//当前页行数
			for(i=0;i<this.iMemberCount;i++)
			{
				this.govmember[i].iRid=pls.GetNextInt();
				this.govmember[i].iJob=pls.GetNextInt();
				this.govmember[i].sName=pls.GetNextString();
			}
			break;
		case 2://获取帮派建筑等级和进度
			for(i=0;i<8;i++)
			{
				this.govbuilding[i].iBid=i;
				this.govbuilding[i].iLev=pls.GetNextInt();
				this.govbuilding[i].iProc=pls.GetNextInt();
			}
			break;
		case 3://获取技能等级和进度
			for(i=0;i<8;i++)
			{
				this.govskill[i].iSid=i;
				this.govskill[i].iLev=pls.GetNextInt();
				this.govskill[i].iProc=pls.GetNextInt();
			}
			break;
		case 5://获得申请列表
			this.iApplyCount=pls.GetNextByte();
			for(i=0;i<this.iApplyCount;i++)
			{
				this.applylist[i].iRid=pls.GetNextInt();
				this.applylist[i].sName=pls.GetNextString();
			}
			break;
		}
	}
}
GovFrame.iPagePoint;

GovFrame.sBuilding=function( ibuilding)
	{
		switch(ibuilding)
		{
		case 0:return "青龙堂";
		case 1:return "白虎堂";
		case 2:return "朱雀堂";
		case 3:return "玄武堂";
		case 4:return "学院";
		case 5:return "金库";
		case 6:return "商会";
		case 7:return "厢房";
		case 8:return "药房";
		default:return "未知"+ibuilding;
		}
	}

	GovFrame.sSkill=function( iresearch)
	{
		switch(iresearch)
		{
		case 0:return "强身术";
		case 1:return "炼丹术";
		case 2:return "烹饪";
		case 3:return "锻造术";
		case 4:return "冶金术";
		case 5:return "剪裁术";
		case 6:return "健体";
		case 7:return "修心";
		default:return "未知"+iresearch;
		}
	}
	GovFrame.sJob=function( ijob)
	{
		switch(ijob)
		{
		case 0:return "帮主";//1
		case 1:return "副帮主";//1
		case 2:return "左护法";//1
		case 3:return "右护法";//1
		case 4:return "长老";//2
		case 5:return "堂主";//4
		case 6:return "精英";
		case 10:return "帮众";
		default:return "未知"+ijob;
		}
	}

	GovFrame. ReloadMember=function()
	{
		GmProtocol.gi().s_GetBaseGovData(1,iPagePoint);
	}