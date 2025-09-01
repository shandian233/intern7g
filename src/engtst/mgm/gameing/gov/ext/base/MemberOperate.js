
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import PrivateChat_Send from "../../../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

import SetGovPower from "./SetGovPower"

export default class MemberOperate extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.iW=131*2+20+10+20;
		this.iH=52*3+20+10+10+20+80+20;
		
		this.iX=(GmConfig.SCRW-this.iW)/2+150;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_operates=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn_operates[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_operates[i].InitButton("成员操作131_52");
		}
		this.btn_operates[0].sName="聊天";
		this.btn_operates[1].sName="好友";
		this.btn_operates[2].sName="任命";
		this.btn_operates[3].sName="踢出";
		this.btn_operates[4].sName="权限";
		
		this.jW=10+131+10+131+10;
		this.jH=10+52+10+52+10+52+10+52+10;
		this.jX=this.iX-this.jW-20;
		this.jY=this.iY+70;
		this.btn_joblist=new Array(10);//
		for(i=0;i<8;i++)
		{
			this.btn_joblist[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_joblist[i].Move(this.jX+10+i%2*(131+10), this.jY+10+Math.floor(i/2)*(52+10), 131, 52);
			this.btn_joblist[i].InitButton("成员操作131_52");
			this.btn_joblist[i].sName=MyGov._GOVJOBS[i];
		}
	}
	
	Draw()
	{
		var i,j;
		DrawMode.new_framepc(this.iX,this.iY,this.iW,this.iH);
		
//		GmPlay.xani_ui.DrawAnima(this.iX+20,this.iY+20, "右上UI", 0);// 右上角头像
//		GmPlay.xani_ui.DrawAnima(this.iX+20,this.iY+20, "头像", iRace * 2 + iSex);
//		GmPlay.sop(""+this.pgm.iRas);
		GmPlay.xani_head.DrawAnima(this.iX+20,this.iY+20,"新头像"+this.pgm.iRas,0);
		M3DFast.gi().DrawTextEx(this.iX+20+80+10, this.iY+20+20, this.pgm.sName, 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		M3DFast.gi().DrawTextEx(this.iX+20+80+10, this.iY+20+20+40, "号码："+this.pgm.iRid, 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		i=0;j=0;
		this.btn_operates[j].Move(this.iX+20+i%2*(131+10),this.iY+20+80+20+Math.floor(i/2)*(52+10),131,52);
		this.btn_operates[j].Draw();
		i++;j++;
		
		this.btn_operates[j].Move(this.iX+20+i%2*(131+10),this.iY+20+80+20+Math.floor(i/2)*(52+10),131,52);
		this.btn_operates[j].Draw();
		i++;j++;
		
		if(this.pgm.iJob>MyGov.mg.iJob && MyGov.mg.bCheckPower(0))
		{//任命
			this.btn_operates[j].Move(this.iX+20+i%2*(131+10),this.iY+20+80+20+Math.floor(i/2)*(52+10),131,52);
			this.btn_operates[j].Draw();
			i++;
		}
		else this.btn_operates[j].Move(-100, -100, 5,5);
		j++;
		
		if(this.pgm.iJob>MyGov.mg.iJob && MyGov.mg.bCheckPower(0))
		{//踢出
			this.btn_operates[j].Move(this.iX+20+i%2*(131+10),this.iY+20+80+20+Math.floor(i/2)*(52+10),131,52);
			this.btn_operates[j].Draw();
			i++;
		}
		else this.btn_operates[j].Move(-100, -100, 5,5);
		j++;
		
		if(MyGov.mg.iJob==0)
		{//权限--帮主
			this.btn_operates[j].Move(this.iX+20+i%2*(131+10),this.iY+20+80+20+Math.floor(i/2)*(52+10),131,52);
			this.btn_operates[j].Draw();
			i++;
		}
		else this.btn_operates[j].Move(-100, -100, 5,5);
		j++;
		

		
		if(this.bAppoint)
		{//左侧画出职位选择按钮
			DrawMode.new_framepc(this.jX,this.jY,this.jW,this.jH);
			for(i=0;i<8;i++)this.btn_joblist[i].Draw();
			
			if(Confirm1.end(Confirm1.CONFIRM_GOVAPPOINT))
			{
				if(Confirm1.bConfirm)
				{//
					GmProtocol.gi().s_NewGovOperate(7, this.pgm.iRid, this.iTmpJob, 0,0,this.pgm.sName);
					XStat.gi().PopStat(1);
				}
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_GOVKICKMEMBER))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_NewGovOperate(7, this.pgm.iRid, 100, 0,0,this.pgm.sName);
				XStat.gi().PopStat(1);
			}
		}
	}
	
	ProcTouch( msg, x, y)
	{
		var i;
		if(this.bAppoint)
		{
			for(i=0;i<8;i++)
			{
				if(this.btn_joblist[i].ProcTouch(msg, x, y))
				{
					if(this.btn_joblist[i].bCheck())
					{
						this.iTmpJob=MyGov._JOBIDS[i];
						if(MyGov._JOBIDS[i]<MyGov.mg.iJob)FrameMessage.fm.Open("不能任命高于自己的职位");
						else if(MyGov._JOBIDS[i]==MyGov.mg.iJob)Confirm1.start(Confirm1.CONFIRM_GOVAPPOINT,"确定将自己的帮派职位转让给他（转让后自己将成为帮众）？");//转让确认
						else
						{//直接任命
							GmProtocol.gi().s_NewGovOperate(7, this.pgm.iRid, this.iTmpJob, 0,0,this.pgm.sName);
							XStat.gi().PopStat(1);
//							this.pgm.iJob=this.iTmpJob;
						}
					}
				}
			}
			if(XDefine.bInRect(x, y, this.jX, this.jY, this.jW,this.jH))return true;
		}
		for(i=0;i<5;i++)
		{
			if(this.btn_operates[i].ProcTouch(msg, x, y))
			{
				if(this.btn_operates[i].bCheck())
				{
					switch(i)
					{
					case 0://聊天
						XStat.gi().PopStat(1);
						PrivateChat_Send.OpenChat( this.pgm.iRid, this.pgm.sName,this.pgm.iRas);
						break;
					case 1://好友
						GmProtocol.gi().s_FriendOperate(0,this.pgm.iRid,0);
						XStat.gi().PopStat(1);
						break;
					case 2://任命
						this.bAppoint=true;
						break;
					case 3://踢出
						Confirm1.start(Confirm1.CONFIRM_GOVKICKMEMBER,"是否确定将#e"+this.pgm.sName+"("+this.pgm.iRid+")#e踢出帮派？");//转让确认
						break;
					case 4://权限
						XStat.gi().PopStat(1);
						SetGovPower.Open(this.pgm);
						break;
					}
				}
				return true;
			}
		}
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW,this.iH) && msg==3)
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}
}

MemberOperate.Open=function( gm)
{
    if(gm.iRid==GmMe.me.iRid)return;
    var afg;
    if (XStat.gi().iXStat != XStat.GS_MEMBEROPERATE)afg=XStat.gi().PushStat(XStat.GS_MEMBEROPERATE);
    else afg = XStat.gi().LastStat(0);

    afg.pgm=gm;

    var i=2;
    if(gm.iJob>MyGov.mg.iJob && MyGov.mg.bCheckPower(0))i+=2;
    if(MyGov.mg.iJob==0)i++;

    if(i==1 || i==2)afg.iH=52+20+20+80+20;
    else if(i==3 || i==4)afg.iH=52*2+20+10+20+80+20;
    else afg.iH=52*3+20+10+10+20+80+20;
}