
import MainMenu from "../../../mgm/mainmenu/MainMenu"
import StartGame from "../../../mgm/newmainmenu/StartGame"
import PublicInterface from "../../../zero/Interface/PublicInterface"
import GmConfig from "../../../config/GmConfig"
import XDefine from "../../../config/XDefine"
import BaseClass from "../../../engine/BaseClass"
import XButton from "../../../engine/control/XButton"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import XStat from "../../../engtst/mgm/XStat"
import GameData from "../../../config/GameData";

export default class FastGetin_local  extends BaseClass{
		
	constructor()
	{
		super();
		this.MAXDESTORYUSER=5;
		var i;
		this.pani=GmPlay.xani_ui;
		this.pm3f=GmPlay.xani_ui.pm3f;
		
		this.btn_history=new Array(this.MAXDESTORYUSER);//
		this.btn_delete=new Array(this.MAXDESTORYUSER);//
		for(i=0;i<this.MAXDESTORYUSER;i++)
		{
			this.btn_history[i]=new XButton(GmPlay.xani_ui);
			this.btn_history[i].InitButton("主菜单按钮2");
			
			this.btn_delete[i]=new XButton(GmPlay.xani_ui);
			this.btn_delete[i].sName="x";
			this.btn_delete[i].InitButton("中按钮1");
		}
		this.InitUserBtn();
		
		this.btn_autogetin=new XButton(GmPlay.xani_ui);
		this.btn_autogetin.sName="渠道登陆";
		this.btn_autogetin.InitButton("主菜单按钮2");
		
		this.btn_regist=new XButton(GmPlay.xani_ui);
		this.btn_regist.sName="注册帐号";
		this.btn_regist.InitButton("主菜单按钮2");
		
		this.btn_login=new XButton(GmPlay.xani_ui);
		this.btn_login.sName="登录";
		this.btn_login.InitButton("主菜单按钮2");
	}
	InitUserBtn()
	{
		var i;
		for(i=0;i<GmPlay.x_record.iUserCount;i++)
		{
			this.btn_history[i].sName=GmPlay.x_record.sUser[i];
		}
	}
	Draw()
	{
		var i,j,k;
		StartGame.drawback(true);
		GmPlay.xani_local.DrawAnimaEx(240,150, "七国标题", 0, 101, 1,1, 0, 0, 0);

		this.InitUserBtn();
		j=0;
		k=218;
//		for(i=0;i<GmPlay.x_record.iUserCount;i++)
//		{
//			this.btn_history[i].Move(offx+offw/2-k/2, offy+j*60, k, 50);
//			this.btn_history[i].Draw();
//			
//			this.btn_delete[i].Move(offx+offw/2-k/2+k-51, offy+j*60+6, 40, 40);
//			this.btn_delete[i].Draw();
//			j++;
//		}
		
//		this.btn_autogetin.Move(offx+offw/2-k/2, offy+j*60, k, 50);
//		this.btn_autogetin.Draw();
//		j++;
//		this.btn_regist.Move(offx+offw/2-k/2, offy+j*60, k, 50);
//		this.btn_regist.Draw();
//		j++;
//		this.btn_login.Move(offx+offw/2-k/2, offy+j*60, k, 50);
//		this.btn_login.Draw();
//		j++;
		
		for(i=0;i<GmPlay.x_record.iUserCount;i++)
		{
			this.btn_history[i].Move(GmConfig.SCRW/2-k/2, GmConfig.SCRH/2+j*60, k, 50);
			this.btn_history[i].Draw();
			
			this.btn_delete[i].Move(GmConfig.SCRW/2+k/2-51, GmConfig.SCRH/2+j*60+6, 40, 40);
			this.btn_delete[i].Draw();
			j++;
		}
		this.btn_login.Move(GmConfig.SCRW/2-k/2, GmConfig.SCRH/2+j*60, k, 50);
		this.btn_login.Draw();
		
		j++;
		this.btn_regist.Move(GmConfig.SCRW/2-k/2, GmConfig.SCRH/2+j*60, k, 50);
		this.btn_regist.Draw();
		
		if(GameData.bAutoGetInForDebug)
		{
			XStat.gi().PopStat(1);
			XStat.gi().PushStat(XStat.GS_LOGIN);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		for(i=0;i<GmPlay.x_record.iUserCount;i++)
		{
			if(this.btn_delete[i].ProcTouch(msg, x, y))
			{
				if(this.btn_delete[i].bCheck())
				{
					GmPlay.x_record.iUserCount--;
					for(j=i;j<GmPlay.x_record.iUserCount;j++)
					{
						GmPlay.x_record.sUser[j]=GmPlay.x_record.sUser[j+1];
						GmPlay.x_record.sPass[j]=GmPlay.x_record.sPass[j+1];
					}
					this.InitUserBtn();
					GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);
					return true;
				}
			}
			
			if(this.btn_history[i].ProcTouch(msg, x, y))
			{
				if(this.btn_history[i].bCheck())
				{
					XStat.gi().PushStat(XStat.GS_LOGIN);
					XStat.gi().oCurrentView.in_user.sDetail=GmPlay.x_record.sUser[i];
					XStat.gi().oCurrentView.in_pass.sDetail=GmPlay.x_record.sPass[i];
					XStat.gi().oCurrentView.in_user.OpenInput();
					XStat.gi().oCurrentView.in_pass.OpenInput();
					XStat.gi().oCurrentView.chk_saveuser.bTrue=GmPlay.x_record.bSaveUser;
					XStat.gi().oCurrentView.chk_savepass.bTrue=GmPlay.x_record.bSavePass;
					return true;
				}
			}
		}
		
		if(this.btn_login.ProcTouch(msg, x, y))
		{//登录
			if(this.btn_login.bCheck())
			{
				XStat.gi().PushStat(XStat.GS_LOGIN);
				((XStat.gi().oCurrentView)).in_user.sDetail="";
				((XStat.gi().oCurrentView)).in_pass.sDetail="";
				((XStat.gi().oCurrentView)).in_user.OpenInput();
				((XStat.gi().oCurrentView)).in_pass.OpenInput();
				((XStat.gi().oCurrentView)).chk_saveuser.bTrue=GmPlay.x_record.bSaveUser;
				((XStat.gi().oCurrentView)).chk_savepass.bTrue=GmPlay.x_record.bSavePass;
			}
		}
		if(this.btn_regist.ProcTouch(msg, x, y))
		{//手动注册
			if(this.btn_regist.bCheck())
			{
//				EasyMessage.easymsg.AddMessage("暂时关闭注册功能");
				XStat.gi().PushStat(XStat.GS_REGIST);
				((XStat.gi().oCurrentView)).in_user.sDetail="";
				((XStat.gi().oCurrentView)).in_pass.sDetail="";
			}
		}
		if(true)return false;
		if(this.btn_autogetin.ProcTouch(msg, x, y))
		{
			if(this.btn_autogetin.bCheck())
			{
//				EasyMessage.easymsg.AddMessage("此功能暂未开发");
				PublicInterface.gi().Login();
			}
		}
		
		return false;
	}
}
