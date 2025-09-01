
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
import PrivateChat_Send from "../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import GovFrame from "../../../../engtst/mgm/gameing/gov/GovFrame"

export default class MemberDetail extends BaseClass{

	constructor( ani)
	{
		super();
		this.iJobList=[0,1,2,3,4,5,10];
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=540;
		this.iH=310+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_ui);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX+this.iW-60-5, this.iY, 60, 60);
		
		var offy=40-5;
		//this.btn_send,this.btn_add,this.btn_kick,this.btn_set
		this.btn_send=new XButton(GmPlay.xani_ui);
		this.btn_send.InitButton("统一中按钮4");
		this.btn_send.Move(this.iX+this.iW-130-30, this.iY+offy+50, 130, 40);
		this.btn_send.sName="发送消息";
		
		this.btn_add=new XButton(GmPlay.xani_ui);
		this.btn_add.InitButton("统一中按钮4");
		this.btn_add.Move(this.iX+this.iW-130-30, this.iY+offy+50*2, 130, 40);
		this.btn_add.sName="加为好友";
		
		this.btn_set=new XButton(GmPlay.xani_ui);
		this.btn_set.InitButton("统一中按钮4");
		this.btn_set.Move(this.iX+this.iW-130-30, this.iY+offy+50*3, 130, 40);
		this.btn_set.sName="职位设置";
		
		this.btn_kick=new XButton(GmPlay.xani_ui);
		this.btn_kick.InitButton("统一中按钮4");
		this.btn_kick.Move(this.iX+this.iW-130-30, this.iY+offy+50*4, 130, 40);
		this.btn_kick.sName="踢出帮派";
		
		this.bInited=false;
		this.bSetJob=false;
	}
	Draw()
	{
		DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"成员属性");
		this.btn_close.Draw();
		DrawMode.Frame2_MD(this.iX+10, this.iY+70-5, this.iW-20, this.iH-80);
		DrawMode.Frame1_BR(this.iX+30, this.iY+90-5, 340, this.iH-120);

//		if(!this.bInited)return;
		var offx=this.iX+30;
		var offy=this.iY+90-5;

		DrawMode.Data1_BR(offx+10, offy+10, "名字",this.sName, 60, 100);
		DrawMode.Data1_BR(offx+180, offy+10, "号码",""+this.iRid, 40, 100);

		DrawMode.Data1_BR(offx+10, offy+10+30, "性别",GmMe.sSex(this.iSex), 60, 60);
		DrawMode.Data1_BR(offx+180, offy+10+30, "种族",GmMe.sRace(this.iRace), 60, 80);

		DrawMode.Data1_BR(offx+10, offy+10+30*2, "等级",""+this.iLev, 60, 50);
		DrawMode.Data1_BR(offx+180, offy+10+30*2, "门派",GameData.sSchools[this.iSchoolId], 60, 80);

		DrawMode.Data1_BR(offx+10, offy+10+30*3, "职位",GovFrame.sJob(this.iJob), 60,80);
		DrawMode.Data1_BR(offx+180, offy+10+30*3, "贡献",""+this.iTick, 60, 80);

		DrawMode.Data1_BR(offx+10, offy+10+30*4, "历史帮贡",""+this.iMaxTick, 100,200);
		DrawMode.Data1_BR(offx+10, offy+10+30*5, "入帮时间",this.sJoinTime, 100,200);
		DrawMode.Data1_BR(offx+10, offy+10+30*6, "登陆时间",this.sLoginTime, 100,200);

//		var this.iRid;
//		String this.sName;
//		var this.iRace,this.iSex;
//		var this.iLev,this.iSchoolId;
//		var this.iJob,this.iTick;
//		String this.sJoinTime,this.sLoginTime;
		
		this.btn_send.Draw();
		this.btn_add.Draw();
		
		if(MyGov.mg.iJob==0 || MyGov.mg.iJob==1)
		{
			if(MyGov.mg.iJob<this.iJob)
			{
				if(Confirm1.end(Confirm1.CONFIRM_GOVKICK))
				{//
					if(Confirm1.bConfirm)
					{//确认踢人
						GmProtocol.gi().s_OperateGovMember(this.iRid,2,0);
						XStat.gi().PopStat(1);
						GovFrame.ReloadMember();
					}
				}
				
				this.btn_kick.Draw();
				this.btn_set.Draw();
			}
		}
		if(this.bSetJob)
		{
			var i;
			var ow=100+40;
			var oh=7*30+55;
			var ox=(GmConfig.SCRW-ow)/2;
			var oy=(GmConfig.SCRH-oh)/2;
			
			DrawMode.Frame2_MD(ox,oy,ow,oh);
			DrawMode.Frame1_BR(ox+20, oy+20, ow-40, oh-40);
			
			for(i=0;i<7;i++)
			{
				offx=ox+30;
				offy=oy+30+i*30;
				if(i==this.iJobPoint)this.pm3f.FillRect_2D(offx,offy,offx+ow-60,offy+30,0xff00ff00);
				if(this.iJobList[i]<=MyGov.mg.iJob)this.pm3f.DrawTextEx(offx, offy, GovFrame.sJob(this.iJobList[i]), 0xff808080, 25, 101, 1, 1, 0, 0, 0);
				else this.pm3f.DrawTextEx(offx, offy, GovFrame.sJob(this.iJobList[i]), 0xffffffff, 25, 101, 1, 1, 0, 0, 0);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if(this.bSetJob)
		{
			var ow=100+40;
			var oh=7*30+55;
			var ox=(GmConfig.SCRW-ow)/2;
			var oy=(GmConfig.SCRH-oh)/2;
			this.iJobPoint=-1;
			for(i=0;i<7;i++)
			{
				var offx=ox+30;
				var offy=oy+30+i*30;
				if(XDefine.bInRect(x, y, offx, offy, ow-60, 30))
				{
					if(this.iJobList[i]<MyGov.mg.iJob)this.iJobPoint=-1;
					else this.iJobPoint=i;
				}
			}
			if(msg==3 && this.iJobPoint!=-1)
			{//设置职位
				this.iJob=this.iJobList[this.iJobPoint];
				GmProtocol.gi().s_OperateGovMember(this.iRid,3,this.iJob);
				this.bSetJob=false;
				XStat.gi().PopStat(1);
				GovFrame.ReloadMember();
			}
			if(msg==1 && !XDefine.bInRect(x, y, ox, oy, ow, oh))this.bSetJob=false;
			return false;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
//		if(!this.bInited)return false
		if(this.btn_send.ProcTouch(msg, x, y))
		{
			if(this.btn_send.bCheck())
			{
				PrivateChat_Send.OpenChat( this.iRid, this.sName,this.iRace*2+this.iSex);
			}
			return true;
		}
		if(this.btn_add.ProcTouch(msg, x, y))
		{
			if(this.btn_add.bCheck())
			{
				GmProtocol.gi().s_FriendOperate(0,this.iRid,0);
			}
			return true;
		}
		if(MyGov.mg.iJob==0 ||
				MyGov.mg.iJob==1 ||
				MyGov.mg.iJob==4)
		{////帮主，副帮主，长老
			if(MyGov.mg.iJob<this.iJob)
			{
				if(this.btn_kick.ProcTouch(msg, x, y))
				{
					if(this.btn_kick.bCheck())
					{
						Confirm1.start(Confirm1.CONFIRM_GOVKICK, "是否确定把"+this.sName+"踢出帮派？");
					}
					return true;
				}
				if(this.btn_set.ProcTouch(msg, x, y))
				{
					if(this.btn_set.bCheck())
					{
						this.iJobPoint=-1;
						this.bSetJob=true;
					}
					return true;
				}
			}
		}
		return false;
	}
	
	getgovdata( pls)
	{
		var dtype=pls.GetNextByte();
		if(dtype!=6)return;
		
		this.iRid=pls.GetNextInt();
		this.sName=pls.GetNextString();
		this.iRace=pls.GetNextByte();
		this.iSex=pls.GetNextByte();
		
		this.iLev=pls.GetNextInt();
		this.iSchoolId=pls.GetNextByte();
		
		this.iJob=pls.GetNextInt();
		this.iTick=pls.GetNextInt();
		this.sJoinTime=pls.GetNextString();
		this.sLoginTime=pls.GetNextString();
		this.iMaxTick=pls.GetNextInt();
		this.bInited=true;
	}
}
