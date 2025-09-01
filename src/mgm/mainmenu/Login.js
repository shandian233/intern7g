
import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"
import BaseClass from "../../engine/BaseClass"
import XButton from "../../engine/control/XButton"
import XCheckBox from "../../engine/control/XCheckBox"
import XInput from "../../engine/control/XInput"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"

export default class Login  extends BaseClass{


	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;

		this.in_user=new XInput(this.pani);
		this.in_user.Move(GmConfig.SCRW/2-100, GmConfig.SCRH/2-100, 200, 50);
		this.in_user.sDetail="user";

		this.in_pass=new XInput(this.pani);
		this.in_pass.Move(GmConfig.SCRW/2-100, GmConfig.SCRH/2-20, 200, 50);
		this.in_pass.sDetail="pass";

		this.btn_login=new XButton(ani);
		this.btn_login.sName="确定登录";
		this.btn_login.Move(GmConfig.SCRW/2-70, GmConfig.SCRH/2+60, 140, 50);
		this.btn_login.InitButton("主菜单按钮2");

		this.chk_saveuser=new XCheckBox(ani);
		this.chk_saveuser.Move(GmConfig.SCRW/2+120, GmConfig.SCRH/2-100+5, 40, 40);
		this.chk_saveuser.sDetail="";//"记住帐号";
		this.chk_saveuser.InitBox("复选框");

		this.chk_savepass=new XCheckBox(ani);
		this.chk_savepass.Move(GmConfig.SCRW/2+120, GmConfig.SCRH/2-20+5, 40, 40);
		this.chk_savepass.sDetail="";//"记住密码";
		this.chk_savepass.InitBox("复选框");

		this.iErrorDelay=0;
	}
	Draw()
	{
//		this.pm3f.FillRect_2D(0, 0, this.pm3f.imf.SCRW, this.pm3f.imf.SCRH, 0xff000000);
//		this.pm3f.DrawText(0, 0, "登录", 0xffffffff);
		var offx,offy;
		
		MainMenu.dpics(1);
		GmPlay.xani_ui3.DrawAnimaEx((GmConfig.SCRW-354)/2, GmConfig.SCRH/2-204, "登陆logo", 0, 101, 1,1, 0, 0, 0);

		offx=280;
//		GmPlay.xani_back.DrawAnimaEx(0, 0, "大背景", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
//		this.pm3f.FillRect_2D(offx, 0, offx+offw, GmConfig.SCRH, 0x50000000);
//		GmPlay.xani_ui.DrawAnimaEx(offx+offw/2,20, "七国名", 0, 101, 1.0f*GmConfig.SCRW/800, 1.0f*GmConfig.SCRH/480, 0, 0, 0);
		
		offy=200-20;
		GmPlay.xani_ui.DrawAnimaEx(offx-70,offy+55, "账号密码", 0, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(offx+30,offy+50, "账号密码", 2, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		this.in_user.Move(offx+30,offy+50, 215, 47);
		this.in_user.DrawText();
		this.chk_saveuser.Move(offx+30+215+10, offy+53, 40, 40);
		this.chk_saveuser.Draw();
		
		offy=300-20;
		GmPlay.xani_ui.DrawAnimaEx(offx-70,offy+55, "账号密码", 1, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(offx+30,offy+50, "账号密码", 2, 101, 1.0*GmConfig.SCRW/800, 1.0*GmConfig.SCRH/480, 0, 0, 0);
		this.in_pass.Move(offx+30,offy+50, 215, 47);
		this.in_pass.DrawText();
		this.chk_savepass.Move(offx+30+215+10, offy+53, 40, 40);
		this.chk_savepass.Draw();

		this.in_user.onscr();
		this.in_pass.onscr();
		
//		DrawMode.DrawTextFrame1(this.in_user.iX, this.in_user.iY,this.in_user.iW);
//		DrawMode.DrawTextFrame1(this.in_pass.iX, this.in_pass.iY,this.in_pass.iW);
//		this.in_user.Draw();
//		this.in_pass.Draw();
//		this.chk_saveuser.Draw();
//		this.chk_savepass.Draw();
		
		offy=400;
		this.btn_login.Move(GmConfig.SCRW/2-218/2, offy, 218, 50);
		this.btn_login.Draw();
		
		if(GameData.bAutoGetInForDebug)
		{
			XStat.gi().PopStat(1);
			GmProtocol.gi().s_Login(this.in_user.sDetail, this.in_pass.sDetail);
			XStat.gi().PushStat(XStat.GS_LOADING1);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		this.in_user.ProcTouch(msg, x, y);
		this.in_pass.ProcTouch(msg, x, y);
		
		this.chk_saveuser.ProcTouch(msg, x, y);
		this.chk_savepass.ProcTouch(msg, x, y);

		if(this.btn_login.ProcTouch(msg, x, y))
		{
			if(this.btn_login.bCheck())
			{//判断输入的是否复合帐号和密码规范
				if(!Regist.bCheckString(this.in_user.sDetail,4,24))
				{//帐号格式有误
					this.iErrorDelay=30;
					EasyMessage.easymsg.AddMessage("帐号格式有误");
					this.sErrorDetail="帐号格式有误";
				}
				else if(!Regist.bCheckString(this.in_pass.sDetail,4,24))
				{//密码格式有误
					this.iErrorDelay=30;
					EasyMessage.easymsg.AddMessage("密码格式有误");
					this.sErrorDetail="密码格式有误";
				}
				else
				{//没问题，提交到服务器，进入等待状态
//					GmProtocol.gi().s_Login("", "");
					GmProtocol.gi().s_Login(this.in_user.sDetail, this.in_pass.sDetail);
					XStat.gi().PushStat(XStat.GS_LOADING1);
					
					if(this.chk_saveuser.bTrue)
					{
						GmPlay.x_record.sUser[0]=this.in_user.sDetail;
						if(this.chk_savepass.bTrue)GmPlay.x_record.sPass[0]=this.in_pass.sDetail;
						else GmPlay.x_record.sPass[0]="";
						GmPlay.x_record.iUserCount=1;

//						for(i=0;i<GmPlay.x_record.iUserCount;i++)
//						{
//							if(GmPlay.x_record.sUser[i]==this.in_user.sDetail)break;
//						}
//						if(i>=GmPlay.x_record.iUserCount)
//						{
//							i=GmPlay.x_record.iUserCount;
//							GmPlay.x_record.iUserCount++;
//							
//							GmPlay.x_record.sUser[i]=this.in_user.sDetail;
//						}
//						
//						if(this.chk_savepass.bTrue)
//						{
//							GmPlay.x_record.sPass[i]=this.in_pass.sDetail;
//						}
//						else GmPlay.x_record.sPass[i]="";
						
						GmPlay.x_record.bSaveUser=this.chk_saveuser.bTrue;
						GmPlay.x_record.bSavePass=this.chk_savepass.bTrue;
						
						GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);
					}
				}
			}
		}
		return false;
	}
}
