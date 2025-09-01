
//import java.io.File;

import GameVersion from "../../../../zero/Interface/GameVersion"
import PublicInterface from "../../../../zero/Interface/PublicInterface"

import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XAdjust from "../../../../engine/control/XAdjust"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../engine/control/XCheckBox"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import Gameing from "../../../../engtst/mgm/gameing/Gameing"
import FriendList from "../../../../engtst/mgm/gameing/chat/privatechat/FriendList"
import PublicChat_SmallFrame from "../../../../engtst/mgm/gameing/chat/publicchat/PublicChat_SmallFrame"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import XDefine from "../../../../config/XDefine";
import TouchManager from "../../../../engine/TouchManager"

export default class SystemOperate extends BaseClass{
	
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;

		SystemOperate.iW=980;
		SystemOperate.iH=640;
		SystemOperate.iX=(GmConfig.SCRW-SystemOperate.iW)/2;
		SystemOperate.iY=(GmConfig.SCRH-SystemOperate.iH)/2;

		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(SystemOperate.iX+SystemOperate.iW-35, SystemOperate.iY-25, 60, 60);
		
		this.btn_page=new Array(3);//
		for(i=0;i<3;i++)
		{//145,56
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2); 
			this.btn_page[i].InitButton("按钮2");
		}
		this.btn_page[0].sName="显示";
		this.btn_page[1].sName="声音";
		this.btn_page[2].sName="其他";
		this.iPage=0;

		this.chk_show=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.chk_show[i]=new XCheckBox(GmPlay.xani_nui3);
			this.chk_show[i].InitBox("统一勾选");
			this.chk_show[i].Move(SystemOperate.iX+SystemOperate.iW-25-50-60, SystemOperate.iY+25+55*i, 50, 50);
			this.chk_show[i].bTrue=true;
//			if(i>0)chk_switch[i].bTrue=SingleChatFrame.chat.bMessageSwitch[i-1];
		}
		this.chk_show[0].sDetail="显示人物";
		this.chk_show[1].sDetail="显示坐骑";
		this.chk_show[2].sDetail="显示武器";
		this.chk_show[3].sDetail="显示换色";
		this.chk_show[4].sDetail="显示跟随宠物";
		this.chk_show[5].sDetail="显示名字";
		this.chk_show[6].sDetail="显示称谓";
		this.chk_show[7].sDetail="显示摊位";
		this.chk_show[0].bTrue=SystemOperate.bShowRole;
		this.chk_show[1].bTrue=SystemOperate.bShowMount;
		this.chk_show[2].bTrue=SystemOperate.bShowWeapon;
		this.chk_show[3].bTrue=SystemOperate.bShowColor;
		this.chk_show[4].bTrue=SystemOperate.bShowFollow;
		this.chk_show[5].bTrue=SystemOperate.bShowName;
		this.chk_show[6].bTrue=SystemOperate.bShowTitle;
		this.chk_show[7].bTrue=SystemOperate.bShowSell;

		this.btn_resetrate=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_resetrate.InitButton("按钮1_110");
		this.btn_resetrate.sName="重置";
//		btn_samerate=new XCheckBox(GmPlay.xani_nui3);
//		btn_samerate.InitBox("统一勾选");
//		btn_samerate.sDetail="等比拉伸";
//		if(SystemOperate.iSameRate==1)btn_samerate.bTrue=true;
//		else btn_samerate.bTrue=false;
		this.adj_ls=new XAdjust(GmPlay.xani_nui3);
		this.adj_ls.InitAdjust("左右调节");
		this.adj_ls.SetPos(0, 400, SystemOperate.iScreenLS);

		this.btn_pq=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_pq[i]=new XCheckBox(GmPlay.xani_nui3);
			this.btn_pq[i].InitBox("圆形选中");
			this.btn_pq[i].bTrue=false;
		}
		XDefine.sop("SystemOperate.iPictureQuality"+SystemOperate.iPictureQuality);
		XDefine.sop("SystemOperate.iMusic"+SystemOperate.iMusic);
		this.btn_pq[SystemOperate.iPictureQuality].bTrue=true;
		this.btn_pq[0].sDetail="高";
		this.btn_pq[1].sDetail="中";
		this.btn_pq[2].sDetail="低";
		this.adj_pb=new XAdjust(GmPlay.xani_nui3);
		this.adj_pb.InitAdjust("左右调节");
		this.adj_pb.SetPos(0,50,SystemOperate.iPictureBuffer);
		this.adj_nrc=new XAdjust(GmPlay.xani_nui3);
		this.adj_nrc.InitAdjust("左右调节");
		this.adj_nrc.SetPos(10, 50, SystemOperate.iNearRoleCount);

		this.chk_music=new XCheckBox(GmPlay.xani_nui3);
		this.chk_music.InitBox("统一勾选");
		if(SystemOperate.iMusic==1)this.chk_music.bTrue=true;
		else this.chk_music.bTrue=false;
		this.chk_music.sDetail="音乐";
		
		this.chk_sound=new XCheckBox(GmPlay.xani_nui3);
		this.chk_sound.InitBox("统一勾选");
		if(SystemOperate.iSound==1)this.chk_sound.bTrue=true;
		else this.chk_sound.bTrue=false;
		this.chk_sound.sDetail="音效";
		//////////////////////////////////////////////////
		this.chk_wheel=new XCheckBox(GmPlay.xani_nui3);
		this.chk_wheel.InitBox("统一勾选");
		if(SystemOperate.iWheel==0)this.chk_wheel.bTrue=true;
		else this.chk_wheel.bTrue=false;
		this.chk_wheel.sDetail="方向盘控制";
		
		this.chk_exthelp=new XCheckBox(GmPlay.xani_nui3);
		this.chk_exthelp.InitBox("统一勾选");
		if(XRecordFast.iExtHelp==1)this.chk_exthelp.bTrue=true;
		else this.chk_exthelp.bTrue=false;
		this.chk_exthelp.sDetail="开启新手引导";
		
		SystemOperate.bAllowTeam=(GmMe.me.iFlag[2]&256)>0;
		SystemOperate.bAllowGoods=(GmMe.me.iFlag[2]&512)>0;
		SystemOperate.bAllowTrade=(GmMe.me.iFlag[2]&1024)>0;
		SystemOperate.bAllowChat=(GmMe.me.iFlag[2]&128)>0;
		
		this.chk_allowteam=new XCheckBox(GmPlay.xani_nui3);
		this.chk_allowteam.InitBox("统一勾选");
		this.chk_allowteam.bTrue=SystemOperate.bAllowTeam;
		this.chk_allowteam.sDetail="拒绝其他玩家发起的组队邀请";//组队邀请
		
		this.chk_allowgoods=new XCheckBox(GmPlay.xani_nui3);
		this.chk_allowgoods.InitBox("统一勾选");
		this.chk_allowgoods.bTrue=SystemOperate.bAllowGoods;
		this.chk_allowgoods.sDetail="拒绝接受其他玩家给予的物品";//接受物品
		
		this.chk_allowtrade=new XCheckBox(GmPlay.xani_nui3);
		this.chk_allowtrade.InitBox("统一勾选");
		this.chk_allowtrade.bTrue=SystemOperate.bAllowTrade;
		this.chk_allowtrade.sDetail="屏蔽其他玩家发起的交易";//交易
		
		this.chk_allowchat=new XCheckBox(GmPlay.xani_nui3);
		this.chk_allowchat.InitBox("统一勾选");
		this.chk_allowchat.bTrue=SystemOperate.bAllowChat;
		this.chk_allowchat.sDetail="屏蔽陌生人的私聊信息";//陌生人聊天

		// this.btn_checkres=new XButtonEx2(GmPlay.xani_button);
		// this.btn_checkres.InitButton("普通按钮200_55");
		// this.btn_checkres.sName="客户端检测";

//		btn_pb[0].sName="";
//		btn_pb[1].sName="";
//		btn_pb[2].sName="";
//		this.btn_pq[0].sName="";
//		this.btn_pq[1].sName="";
//		this.btn_pq[2].sName="";

//		GmPlay.sop1("SystemOperate.iScreenLS="+SystemOperate.iScreenLS);
		
		// this.btn_logout=new XButtonEx2(GmPlay.xani_button);
		// this.btn_logout.InitButton("1号按钮150_60");
		// this.btn_logout.sName="注销登录";
	}
	ResetAnima()
	{
		var j;
		for (j = 0; j < Gameing.iNearMax; j++)
		{
			if (Gameing.gameing.nrs[j].bUseing)Gameing.gameing.nrs[j].bfc8=true;
		}
		GmMe.me.bfc8=true;
	}
	Draw()
	{
		var i,offy;
//		iW=800;
//		SystemOperate.iH=480;
		SystemOperate.iX=(GmConfig.SCRW-SystemOperate.iW)/2;
		SystemOperate.iY=(GmConfig.SCRH-SystemOperate.iH)/2;
	
		//12.19   画左按钮图标、文字、以及 基本大框
		DrawMode.new_baseframe2(SystemOperate.iX,SystemOperate.iY,SystemOperate.iW,SystemOperate.iH,"系","统");
		
		this.btn_close.Draw();
		
		var offx,w,h;
		offx=SystemOperate.iX+30;
		offy=SystemOperate.iY+30;
		w=145+40;
		h=SystemOperate.iH-60;
		DrawMode.new_framein(offx, offy, w, h);
		for(i=0;i<3;i++)
		{
			if(this.iPage==i)
			{
				this.btn_page[i].bMouseDown=true;
				this.btn_page[i].bMouseIn=true;
			}
			this.btn_page[i].Move(offx+20, offy+20+i*(56+20), 145, 56);
			this.btn_page[i].Draw();
		}

		offx+=w+20;
		w=SystemOperate.iW-60-20-w;
		DrawMode.new_framein(offx, offy, w, h);
		if(this.iPage==0)
		{//显示
			offx+=20;
			offy+=20;
//			DrawMode.new_frameon(offx, offy, w-40, 30+50*3+20, 0);
			offx+=15;
			offy+=15;
			this.chk_show[0].Move(offx, offy, 50, 50);
			this.chk_show[1].Move(offx+200, offy, 50, 50);
			this.chk_show[2].Move(offx+400, offy, 50, 50);
			
			offy+=60;
			this.chk_show[3].Move(offx+200, offy, 50, 50);
			this.chk_show[4].Move(offx+400, offy, 50, 50);
			
			offy+=60;
			this.chk_show[5].Move(offx, offy, 50, 50);
			this.chk_show[6].Move(offx+200, offy, 50, 50);
			this.chk_show[7].Move(offx+400, offy, 50, 50);
			for(i=0;i<8;i++)
			{
				this.chk_show[i].Draw();
			}

			if(SystemOperate.bShowRole!=this.chk_show[0].bTrue)
			{
				SystemOperate.bShowRole=this.chk_show[0].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowMount!=this.chk_show[1].bTrue)
			{
				SystemOperate.bShowMount=this.chk_show[1].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowWeapon!=this.chk_show[2].bTrue)
			{
				SystemOperate.bShowWeapon=this.chk_show[2].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowColor!=this.chk_show[3].bTrue)
			{
				SystemOperate.bShowColor=this.chk_show[3].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowFollow!=this.chk_show[4].bTrue)
			{
				SystemOperate.bShowFollow=this.chk_show[4].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowName!=this.chk_show[5].bTrue)
			{
				SystemOperate.bShowName=this.chk_show[5].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowTitle!=this.chk_show[6].bTrue)
			{
				SystemOperate.bShowTitle=this.chk_show[6].bTrue;
				this.ResetAnima();
			}
			if(SystemOperate.bShowSell!=this.chk_show[7].bTrue)
			{
				SystemOperate.bShowSell=this.chk_show[7].bTrue;
				this.ResetAnima();
			}
			
			offx-=15;
			offy+=50+15+10;

			offx+=15;
//cx			offy+=15;
//cx			M3DFast.gi().DrawTextEx(offx,offy+10, "画面拉伸", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			SystemOperate.iSameRate=0;

//cx			this.btn_resetrate.Move(offx+400,offy-1, 110, 52);
//cx			this.btn_resetrate.Draw();
			
//cx			offy+=50+20;
//cx			M3DFast.gi().DrawTextEx(offx,offy, "拉伸调整", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
//cx			this.adj_ls.Move(offx+150,offy-5, 450, 40);
//cx			this.adj_ls.Draw();
			
//cx			offy+=35+15+10;
			offx-=15;

			offx+=15;
			offy+=15;
			M3DFast.gi().DrawTextEx(offx,offy+10, "画面缓存", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			DrawMode.new_numberframe(offx+150,offy,70,""+parseInt(this.adj_pb.iPos));
			this.adj_pb.Move(offx+150+100, offy+10, 350, 30);
			this.adj_pb.Draw();
			offy+=50;
			M3DFast.gi().DrawTextEx(offx,offy+10, "画面质量", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			for(i=0;i<3;i++)
			{
				if(this.btn_pq[i].bTrue)
				{

				}
				this.btn_pq[i].Move(offx+150+i*180, offy, 50, 50);//人物，名字，摊位
				this.btn_pq[i].Draw();
			}
			offy+=50;
			M3DFast.gi().DrawTextEx(offx,offy+10, "周围玩家数", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
			DrawMode.new_numberframe(offx+150,offy,70,""+parseInt(this.adj_nrc.iPos));
			this.adj_nrc.Move(offx+150+100, offy+10, 350, 30);
			this.adj_nrc.Draw();
			
			// this.btn_logout.Move(SystemOperate.iX+SystemOperate.iW-150-50, SystemOperate.iY+SystemOperate.iH-60-50, 150, 60);
			// if(GameVersion.QUDAO!=4 && GameVersion.QUDAO!=6)this.btn_logout.Draw();
		}
		if(this.iPage==1)
		{//声音
			offx+=20;
			offy+=20;
			this.chk_music.Move(offx, offy, 50, 50);
			if(this.chk_music.bTrue)SystemOperate.iMusic=1;
			else SystemOperate.iMusic=0;
			this.chk_music.Draw();
			
			this.chk_sound.Move(offx+200, offy, 50, 50);
			if(this.chk_sound.bTrue)SystemOperate.iSound=1;
			else SystemOperate.iSound=0;
			this.chk_sound.Draw();
		}
		if(this.iPage==2)
		{//其他
			offx+=20;
			offy+=20;
			this.chk_wheel.Move(offx, offy, 50, 50);
			if(this.chk_wheel.bTrue)SystemOperate.iWheel=0;
			else SystemOperate.iWheel=1;
			this.chk_wheel.Draw();
			
			offy+=70;
			this.chk_exthelp.Move(offx, offy, 50, 50);
			if(this.chk_exthelp.bTrue)XRecordFast.iExtHelp=1;
			else XRecordFast.iExtHelp=3;
			this.chk_exthelp.Draw();
			
			offy+=70;
			this.chk_allowteam.Move(offx, offy, 50, 50);
			if(SystemOperate.bAllowTeam!=this.chk_allowteam.bTrue)
			{
				SystemOperate.bAllowTeam=this.chk_allowteam.bTrue;
				GmProtocol.gi().s_setflag(2, 8, SystemOperate.bAllowTeam?1:0);
				if(SystemOperate.bAllowTeam)GmMe.me.iFlag[2]=GmMe.me.iFlag[2]|(1<<8);
				else GmMe.me.iFlag[2]=GmMe.me.iFlag[2]&(~(1<<8));
			}
			this.chk_allowteam.Draw();//组队邀请
			
			offy+=70;
			this.chk_allowgoods.Move(offx, offy, 50, 50);
			if(SystemOperate.bAllowGoods!=this.chk_allowgoods.bTrue)
			{
				SystemOperate.bAllowGoods=this.chk_allowgoods.bTrue;
				GmProtocol.gi().s_setflag(2, 9, SystemOperate.bAllowGoods?1:0);
				if(SystemOperate.bAllowGoods)GmMe.me.iFlag[2]=GmMe.me.iFlag[2]|(1<<9);
				else GmMe.me.iFlag[2]=GmMe.me.iFlag[2]&(~(1<<9));
			}
			this.chk_allowgoods.Draw();//接受物品
			
			offy+=70;
			this.chk_allowtrade.Move(offx, offy, 50, 50);
			if(SystemOperate.bAllowTrade!=this.chk_allowtrade.bTrue)
			{
				SystemOperate.bAllowTrade=this.chk_allowtrade.bTrue;
				GmProtocol.gi().s_setflag(2, 10, SystemOperate.bAllowTrade?1:0);
				if(SystemOperate.bAllowTrade)GmMe.me.iFlag[2]=GmMe.me.iFlag[2]|(1<<10);
				else GmMe.me.iFlag[2]=GmMe.me.iFlag[2]&(~(1<<10));
			}
			this.chk_allowtrade.Draw();//交易
			
			offy+=70;
			this.chk_allowchat.Move(offx, offy, 50, 50);
			if(SystemOperate.bAllowChat!=this.chk_allowchat.bTrue)
			{
				SystemOperate.bAllowChat=this.chk_allowchat.bTrue;
				GmProtocol.gi().s_setflag(2, 7, SystemOperate.bAllowChat?1:0);
				if(SystemOperate.bAllowChat)GmMe.me.iFlag[2]=GmMe.me.iFlag[2]|(1<<7);
				else GmMe.me.iFlag[2]=GmMe.me.iFlag[2]&(~(1<<7));
			}
			this.chk_allowchat.Draw();//陌生人聊天
			
			offy+=70;
			// this.btn_checkres.Move(offx, offy, 200, 55);
			// this.btn_checkres.Draw();
		}
////////////////////////////////////////////////////////////////////////////////音乐，音效，方向盘

		/////////////////////////////////////////////////////////////////////////////////

//		btn_scrfull.Move(SystemOperate.iX+224,SystemOperate.iY+offy,70,40);
//		M3DFast.gi().DrawTextEx(SystemOperate.iX+224+35,SystemOperate.iY+offy+2, "拉伸", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
//		
//		btn_scrnice.Move(SystemOperate.iX+224+140,SystemOperate.iY+offy,70,40);
//		M3DFast.gi().DrawTextEx(SystemOperate.iX+224+140+35,SystemOperate.iY+offy+2, "高清", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
//				
//		btn_scrmiddle.Move(SystemOperate.iX+224+2*140,SystemOperate.iY+offy,70,40);
//		M3DFast.gi().DrawTextEx(SystemOperate.iX+224+2*140+35,SystemOperate.iY+offy+2, "居中", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
//		
//		btn_double.Move(SystemOperate.iX+224+3*140,SystemOperate.iY+offy,70,40);
//		M3DFast.gi().DrawTextEx(SystemOperate.iX+224+3*140+35,SystemOperate.iY+offy+2, "两倍", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
		
//		switch(iScreenSet)
//		{
//		case 0:
//			btn_scrfull.bMouseDown=true;
//			btn_scrfull.bMouseIn=true;
//			break;
//		case 1:
//			btn_scrnice.bMouseDown=true;
//			btn_scrnice.bMouseIn=true;
//			break;
//		case 2:
//			btn_scrmiddle.bMouseDown=true;
//			btn_scrmiddle.bMouseIn=true;
//			break;
//		case 3:
//			btn_double.bMouseDown=true;
//			btn_double.bMouseIn=true;
//			break;
//		}
//		btn_scrfull.Draw();
//		btn_scrnice.Draw();
//		btn_scrmiddle.Draw();
//		btn_double.Draw();
		

	}

	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<3;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
					this.iPage=i;
				}
			}
		}
		if(this.iPage==0)
		{
			for(i=0;i<8;i++)
			{
				this.chk_show[i].ProcTouch(msg, x, y);
			}
//			btn_samerate.ProcTouch(msg, x, y);//等比勾选
/*cx			if(this.btn_resetrate.ProcTouch(msg, x, y))
			{//重置按钮
				if(this.btn_resetrate.bCheck())
				{
					if(GmConfig.SYSW>=1280)SystemOperate.SystemOperate.iScreenLS=(1280-800)*400/(GmConfig.SYSW-800);
					else SystemOperate.SystemOperate.iScreenLS=(GmConfig.SYSW-800)*400/(1280-800);
					SystemOperate.iSameRate=0;
					this.adj_ls.iPos=SystemOperate.SystemOperate.iScreenLS;
				}
			}
			if(this.adj_ls.ProcTouch(msg, x, y))
			{//拉伸调整
				SystemOperate.iScreenLS=this.adj_ls.iPos;
				SetScreenMode(0);
				return true;
			}*/
			if(this.adj_pb.ProcTouch(msg, x, y))
			{
				SystemOperate.iPictureBuffer=parseInt(this.adj_pb.iPos);
				return true;
			}
			for(i=0;i<3;i++)
			{
				if(this.btn_pq[i].ProcTouch(msg, x, y))
				{
					if(msg==3)
					{
						this.btn_pq[0].bTrue=false;
						this.btn_pq[1].bTrue=false;
						this.btn_pq[2].bTrue=false;
						this.btn_pq[i].bTrue=true;
						EasyMessage.easymsg.AddMessage("调整画面质量需重启游戏后才生效");
						
						SystemOperate.iPictureQuality=i;
						if(SystemOperate.iPictureQuality==0)SystemOperate.iPictureBuffer=50;
						else if(SystemOperate.iPictureQuality==1)SystemOperate.iPictureBuffer=25;
						else SystemOperate.iPictureBuffer=0;
						this.adj_pb.SetPos(0,50,SystemOperate.iPictureBuffer);
					}
				}
			}
			if(this.adj_nrc.ProcTouch(msg, x, y))
			{
				SystemOperate.iNearRoleCount=parseInt(this.adj_nrc.iPos);
				return true;
			}

			// if(GameVersion.QUDAO!=4 && GameVersion.QUDAO!=6 && this.btn_logout.ProcTouch(msg, x, y))
			// {
			// 	if(this.btn_logout.bCheck())
			// 	{
			// 		PublicChat_SmallFrame.gi().iMessageCount=0;
			// 		FriendList.gi().Clean();
			// 		PublicInterface.gi().Logout();
			// 		return true;
			// 	}
			// }
		}
		if(this.iPage==1)
		{
			if(msg == TouchManager.TOUCH_UP){
				if(this.chk_music.ProcTouch(msg, x, y)){
					if(this.chk_music.bTrue){
						SystemOperate.iMusic=1;
					}else{
						SystemOperate.iMusic=0
					}
					GmPlay.ResetSound();
				}

				if(this.chk_sound.ProcTouch(msg, x, y)){
					if(this.chk_sound.bTrue){
						SystemOperate.iSound = 1
					}else{
						SystemOperate.iSound = 0
					}
				}
			}
		}
		if(this.iPage==2)
		{
			this.chk_wheel.ProcTouch(msg, x, y);
			this.chk_exthelp.ProcTouch(msg, x, y);
			this.chk_allowteam.ProcTouch(msg, x, y);
			this.chk_allowgoods.ProcTouch(msg, x, y);
			this.chk_allowtrade.ProcTouch(msg, x, y);
			this.chk_allowchat.ProcTouch(msg, x, y);
			// if(this.btn_checkres.ProcTouch(msg, x, y))
			// {
			// 	if(this.btn_checkres.bCheck())
			// 	{
			// 		var f;
			// 		f=new File(GameData.sSDTo+"currentcheck.dat");
			// 		f.delete();
			// 		f=new File(GameData.sSDTo+"currentversion.dat");
			// 		f.delete();
			// 		f=new File(GameData.sSDTo+"updatedetail.dat");
			// 		f.delete();
			// 		f=new File(GameData.sSDTo+"lead.dat");
			// 		f.delete();
			// 		f=new File(GameData.sSDTo+"resfrom.dat");
			// 		f.delete();
			// 		FrameMessage.fm.Open("已设置检测标记，将在下次重启客户端时自动进行检测");
			// 	}
			// }
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
//						if(SystemOperate.bShowRole)Gameing.gameing.FreshNearRole();
		return false;
	}

}
SystemOperate.iX=0;
SystemOperate.iY=0;
SystemOperate.iW=0;
SystemOperate.iH=0;
SystemOperate.bShowRole=true;
SystemOperate.bShowMount=true;
SystemOperate.bShowWeapon=true;
SystemOperate.bShowColor=true;
SystemOperate.bShowFollow=true;
SystemOperate.bShowName=true;
SystemOperate.bShowSell=true;
SystemOperate.bShowTitle=true;
SystemOperate.bAllowTeam=true;
SystemOperate.bAllowGoods=true;
SystemOperate.bAllowTrade=true;
SystemOperate.bAllowChat=true;

	SystemOperate.iSameRate=0;//0等真实屏幕比例拉伸，1不等比拉伸
	SystemOperate.iScreenLS=0;//----------------------------------------------
	SystemOperate.iPictureQuality=0;////画质：高0，中1，低2-----
	SystemOperate.iPictureBuffer=50;//-----------------------------------------------
	SystemOperate.iNearRoleCount=25;//-------------------------------------------------
	SystemOperate.iMusic=1,SystemOperate.iSound=1;
	SystemOperate.iWheel=1;//0是开,1是关
	SystemOperate.iFPS;
	SystemOperate.iRenderType=1;//渲染方式
	SystemOperate.BASEW=1280;
	SystemOperate.BASEH=720;
	SystemOperate.MAXW=1280,SystemOperate.MAXH=720;
	SystemOperate.iWordRate=1000;

	SystemOperate.SetScreenMode=function( mode)
	{
		mode=6;
		if(XStat.gi().bGameing())
		{
			SystemOperate.BASEH=SystemOperate.BASEW*GmConfig.SYSH/GmConfig.SYSW;
			SystemOperate.MAXH=SystemOperate.BASEH;
		}
//		if(mode<10)mode=0;///全局永远为拉伸1280*720模式
//		
//		if(mode==11)mode=iOldMode;
//		if(mode<4)iScreenSet=mode;
		if(mode==10)
		{//用于局部拉伸，用于地图缩放控制
			//iOldMode=1;
			
			GmConfig.SCRW = 800;
			GmConfig.SCRH = 480;
			
			if(GmConfig.SYSW>SystemOperate.MAXW)SystemOperate.MAXW=GmConfig.SYSW;
			if(GmConfig.SYSH>SystemOperate.MAXH)SystemOperate.MAXH=GmConfig.SYSH;
			
			GmConfig.SCRW = 800+(SystemOperate.iScreenLS*(SystemOperate.MAXW-800)/400);
			if(SystemOperate.iSameRate==0)GmConfig.SCRH=GmConfig.SCRW*GmConfig.SYSH/GmConfig.SYSW;//
			else GmConfig.SCRH = 480+(SystemOperate.iScreenLS*(SystemOperate.MAXH-480)/400);
//			GmPlay.sop("SystemOperate.iSameRate="+SystemOperate.iSameRate+",,,GmConfig.SCRW="+GmConfig.SCRW+",,,,,GmConfig.SCRH="+GmConfig.SCRH);
			
			M3DFast.iNVPW = GmConfig.SCRW;
			M3DFast.iNVPH = GmConfig.SCRH;
			GmConfig.REALW=GmConfig.SYSW;//拉伸
			GmConfig.REALH=GmConfig.SYSH;
			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
		}
		else// if(mode==0)
		{//绝对拉伸到basew,baseh，用于ui
			GmConfig.SCRW = SystemOperate.BASEW;
			GmConfig.SCRH = SystemOperate.BASEH;
			
//			GmConfig.SCRW = SystemOperate.BASEW+(SystemOperate.iScreenLS*(GmConfig.SYSW-SystemOperate.BASEW)/400);
//			GmConfig.SCRH = SystemOperate.BASEH+(SystemOperate.iScreenLS*(GmConfig.SYSH-SystemOperate.BASEH)/400);
			
			//M3DFast.iNVPW = GmConfig.SCRW;
			//M3DFast.iNVPH = GmConfig.SCRH;
			GmConfig.REALW=GmConfig.SYSW;//拉伸
			GmConfig.REALH=GmConfig.SYSH;
			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
		}
//		else if(mode==1)
//		{//高清
//			GmConfig.SCRW = GmConfig.SYSW;
//			GmConfig.SCRH = GmConfig.SYSH;
//			if(GmConfig.SCRW<SystemOperate.BASEW)GmConfig.SCRW=SystemOperate.BASEW;
//			if(GmConfig.SCRH<SystemOperate.BASEH)GmConfig.SCRH=SystemOperate.BASEH;
//			M3DFast.iNVPW = GmConfig.SCRW;
//			M3DFast.iNVPH = GmConfig.SCRH;
//			GmConfig.REALW=GmConfig.SYSW;
//			GmConfig.REALH=GmConfig.SYSH;
//			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
//			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
//		}
//		else if(mode==2)
//		{//居中
//			GmConfig.SCRW = SystemOperate.BASEW;
//			GmConfig.SCRH = SystemOperate.BASEH;
//			M3DFast.iNVPW = GmConfig.SCRW;
//			M3DFast.iNVPH = GmConfig.SCRH;
//			GmConfig.REALW=GmConfig.SCRW;
//			GmConfig.REALH=GmConfig.SCRH;
//			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
//			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
//		}
//		else if(mode==3)
//		{//两倍
////			GmConfig.SCRW = 800;
////			GmConfig.SCRH = 480;
//			GmConfig.SCRW =GmConfig.SYSW/2;
//			GmConfig.SCRH =GmConfig.SYSH/2;
//			M3DFast.iNVPW = GmConfig.SCRW;
//			M3DFast.iNVPH = GmConfig.SCRH;
//			GmConfig.REALW=GmConfig.SCRW*2;
//			GmConfig.REALH=GmConfig.SCRH*2;
//			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
//			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
//		}
//		else if(mode==4)
//		{//BIG UI 模式
//			GmConfig.SCRW = GmConfig.BUW;
//			GmConfig.SCRH = GmConfig.BUH;
//			M3DFast.iNVPW = GmConfig.SCRW;
//			M3DFast.iNVPH = GmConfig.SCRH;
//			GmConfig.REALW=GmConfig.SYSW;//拉伸
//			GmConfig.REALH=GmConfig.SYSH;
//			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
//			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
//		}
//		else if(mode==5)
//		{//主菜单，固定分辨率
//			GmConfig.SCRW = SystemOperate.BASEW;
//			GmConfig.SCRH = SystemOperate.BASEH;
//			
//			M3DFast.iNVPW = GmConfig.SCRW;
//			M3DFast.iNVPH = GmConfig.SCRH;
//			GmConfig.REALW=GmConfig.SYSW;//拉伸
//			GmConfig.REALH=GmConfig.SYSH;
//			GmConfig.OFFX=(GmConfig.SYSW-GmConfig.REALW)/2;
//			GmConfig.OFFY=(GmConfig.SYSH-GmConfig.REALH)/2;
//		}
//		else if(mode==6)
//		{
//			GmConfig.SCRW = 1280;
//			GmConfig.SCRH = 720;
//			
//			M3DFast.iNVPW = GmConfig.SCRW;
//			M3DFast.iNVPH = GmConfig.SCRH;
//			GmConfig.REALW=GmConfig.SYSW;//拉伸
//			GmConfig.REALH=GmConfig.SYSH;
//			GmConfig.OFFX=0;
//			GmConfig.OFFY=0;
//		}
///		M3DFast.gi().SetScreenMode();
//		iW=580;
//		SystemOperate.iH=400;
		SystemOperate.iX=(GmConfig.SCRW-SystemOperate.iW)/2;
		SystemOperate.iY=(GmConfig.SCRH-SystemOperate.iH)/2;
		
//		if(!SingleChatFrame.chat.bLock)
//		{
//			SingleChatFrame.iW=GmConfig.SCRW*500/1280;
//			SingleChatFrame.SystemOperate.iH=GmConfig.SCRH*160/720;
//		}
//		if(SingleChatFrame.chat.bOpen && !SingleChatFrame.chat.bCloseing && !SingleChatFrame.chat.bOpening)
//		{
//			SingleChatFrame.iModifyW=SingleChatFrame.iW;
//			SingleChatFrame.iModifyH=SingleChatFrame.SystemOperate.iH;
//		}
//		SystemOperate.iWordRate=GmConfig.SCRH*1000/720;
	}
	SystemOperate.WordSize=function( size)
	{
		return size*SystemOperate.iWordRate/1000;
	}
