
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../config/GmConfig"

import BaseClass from "../../engine/BaseClass"
import XButton from "../../engine/control/XButton"
import XInput from "../../engine/control/XInput"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import XRecordFast from "../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"

export default class CreateRole extends BaseClass{
	
	 constructor( ani)
	{
		super();
		var i;
		
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iSelectPoint=0;
		
		this.btn_selectrole=new Array(6);////3个种族x2性别
		this.aa_roles=new Array(6);//
		this.aa_weapons=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn_selectrole[i]=new XButton(ani);
			this.btn_selectrole[i].Move(50+(i%3)*100, (50+i/3*80), 80, 40);
			this.btn_selectrole[i].bSingleButton=true;
			this.btn_selectrole[0].sName="暂无";
			
			this.aa_roles[i]=new AnimaAction();
			GmPlay.xani_newrole[i].InitAnimaWithName("站立_左下", this.aa_roles[i]);
		}
		
		this.btn_create=new XButton(GmPlay.xani_ui3);
		this.btn_create.InitButton("创建按钮图标");
		this.btn_create.sName="";
		
		this.in_nick=new XInput(ani);
	}
	Draw()
	{
		var i;
		var ox,oy;
		var bw,bh;
		var space;
		
		MainMenu.dpics(2);
		
		
//		this.pm3f.FillRect_2D(0, 0, this.pm3f.imf.SCRW, this.pm3f.imf.SCRH, 0xff000000);
//		GmPlay.xani_back.DrawAnimaEx(0, 0, "大背景", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
//		this.pm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0x50000000);
		
		ox=50;
		oy=80;
		bw=130;
		bh=130;
		space=10;
	
		GmPlay.xani_ui.DrawAnimaEx(ox+0*(bw+space)+bw/2, oy-10, "人魔仙",0, 101, 1, 1, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(ox+1*(bw+space)+bw/2, oy-10, "人魔仙",1, 101, 1, 1, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(ox+2*(bw+space)+bw/2, oy-10, "人魔仙",2, 101, 1, 1, 0, 0, 0);
		
//		GmPlay.xani_ui.DrawAnimaEx(GmConfig.SCRW/2+100+105, GmConfig.SCRH/2, "人物底座",0, 101, 1, 1, 0, 0, 0);
		GmPlay.xani_ui3.DrawAnimaEx(GmConfig.SCRW/2+100+70, GmConfig.SCRH/2+50, "莲花座", 0, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		
		
		for(i=0;i<6;i++)
		{
//			GmPlay.sop("this.iSelectPoint="+this.iSelectPoint);
			this.btn_selectrole[i].Move(ox+(i/2)*(bw+10), oy+i%2*(bh+10), bw, bh);
			DrawMode.DrawFrame1(this.btn_selectrole[i].iX, this.btn_selectrole[i].iY, bw,bh);
			
			GmPlay.xani_ui.DrawAnimaEx(ox+(i/2)*(bw+10), oy+i%2*(bh+10), "选择头像",i, 101, 1, 1, 0, 0, 0);
			
			
//			else this.pm3f.DrawTextEx(this.btn_selectrole[i].iX+bw/2, this.btn_selectrole[i].iY+bh/2, "开发中", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
			if(this.iSelectPoint==i)
			{
//				if(i==3)
				{
					this.aa_roles[i].xani.DrawAnima_aa(GmConfig.SCRW/2+100+105+35, GmConfig.SCRH/2+70, this.aa_roles[i]);
					this.aa_roles[i].xani.NextFrame(this.aa_roles[i]);
				}
//				this.btn_selectrole[i].bMouseIn=true;
//				this.btn_selectrole[i].bMouseDown=true;
				this.pm3f.DrawRect_2D(ox+(i/2)*(bw+10), oy+i%2*(bh+10), ox+(i/2)*(bw+10)+bw, oy+i%2*(bh+10)+bh, 0xffffff00);
			}
		}
		
		GmPlay.xani_ui3.DrawAnimaEx(90, 403+5, "角色昵称标题", 0, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(90+105, 395+5, "账号密码",2, 101, 1, 1, 0, 0, 0);
	//	GmPlay.xani_ui3.DrawAnimaEx(50+105, 400, "角色昵称输入框", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
		this.in_nick.Move(90+105, 395+5,215, 47);
		this.in_nick.DrawText();
		this.in_nick.onscr();

//		this.in_nick.Draw();
		
//		if(this.iSelectPoint==3)this.btn_create.bDisable=false;
//		else this.btn_create.bDisable=true;
		this.btn_create.Move(GmConfig.SCRW/2+135, 400-16+5, 204, 66);
		this.btn_create.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<6;i++)
		{
			if(this.btn_selectrole[i].ProcTouch(msg, x, y))
			{
				if(this.btn_selectrole[i].bCheck())
				{//更换性别种族
					this.iSelectPoint=i;
				}
			}
		}
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{//检测输入昵称是否正确，发送创建信息
				if(!bCheckNick(this.in_nick.sDetail,4,24))
				{//昵称格式有问题
					EasyMessage.easymsg.AddMessage("昵称填写有误");
				}
				else
				{//昵称没问题,申请注册
					GmProtocol.gi().s_CreateRole(XRecordFast.iLastSector,
							XRecordFast.iLastSever,
							this.in_nick.sDetail, this.iSelectPoint%2, this.iSelectPoint/2);
					XStat.gi().PushStat(XStat.GS_LOADING1);
//					((Loading1)(XStat.gi().LastStat(0))).sDetail="创建中...";
				}
			}
		}
		this.in_nick.ProcTouch(msg, x, y);

		return false;
	}

}
CreateRole.bCheckNick=function( s, min, max)
{
	var i;
	var buf;

		buf=s.getBytes("GBK");
		if(buf.length<min || buf.length>max)return false;
		for(i=0;i<buf.length;i++)
		{
			if(buf[i]=='\\')return false;
			if(buf[i]=='/')return false;
			if(buf[i]=='|')return false;
//				if(buf[i]>='a' && buf[i]<='z')continue;
//				if(buf[i]>='A' && buf[i]<='Z')continue;
//				if(buf[i]>='0' && buf[i]<='9')continue;
//				return false;
		}
		return true;

}