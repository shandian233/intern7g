
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../config/GmConfig"

import BaseClass from "../../engine/BaseClass"
import XButton from "../../engine/control/XButton"
import XInput from "../../engine/control/XInput"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"

export default class Regist  extends BaseClass{
	constructor( ani)
	{
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.in_user=new XInput(this.pani);
		this.in_user.Move(GmConfig.SCRW/2-100, GmConfig.SCRH/2-100, 300, 50);
		this.in_user.sDetail="user";
		
		this.in_pass=new XInput(this.pani);
		this.in_pass.Move(GmConfig.SCRW/2-100, GmConfig.SCRH/2-20, 300, 50);
		this.in_pass.sDetail="pass";
		
		this.btn_regist=new XButton(ani);
		this.btn_regist.sName="确定注册";
		this.btn_regist.Move(GmConfig.SCRW/2-70, GmConfig.SCRH/2+80, 140, 50);
		this.btn_regist.InitButton("大按钮4");
		
		this.iErrorDelay=0;
	}
	Draw()
	{
		this.pm3f.FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0xff202020);
		this.pm3f.DrawText(0, 0, "注册帐号", 0xffffffff);

		this.pm3f.DrawText(GmConfig.SCRW/2-200, GmConfig.SCRH/2-100+10, "账号:", 0xffffffff);
		this.pm3f.DrawText(GmConfig.SCRW/2-200, GmConfig.SCRH/2-20+10, "密码:", 0xffffffff);
		this.in_user.Draw();
		this.in_pass.Draw();
		this.btn_regist.Draw();

		this.in_user.onscr();
		this.in_pass.onscr();
	}
	ProcTouch( msg, x, y)
	{
		this.in_user.ProcTouch(msg, x, y);
		this.in_pass.ProcTouch(msg, x, y);

		if(this.btn_regist.ProcTouch(msg, x, y))
		{
			if(this.btn_regist.bCheck())
			{//判断输入的是否复合帐号和密码规范
				if(!bCheckString(this.in_user.sDetail,4,24))
				{//帐号格式有误
					this.iErrorDelay=30;
					EasyMessage.easymsg.AddMessage("帐号格式有误");
					this.sErrorDetail="帐号格式有误";
				}
				else if(!bCheckString(this.in_pass.sDetail,4,24))
				{//密码格式有误
					this.iErrorDelay=30;
					EasyMessage.easymsg.AddMessage("密码格式有误");
					this.sErrorDetail="密码格式有误";
				}
				else
				{//没问题，提交到服务器，进入等待状态
					GmProtocol.gi().s_Regist(this.in_user.sDetail, this.in_pass.sDetail);
					XStat.gi().PushStat(XStat.GS_LOADING1);
				}
			}
		}
		return false;
	}
	
}
Regist.bCheck=function( s, min, max)
	{//判断字符串是否符合规范
		var i;
		var buf;

			buf=s.getBytes("GBK");
			if(buf.length<min || buf.length>max)return false;
			for(i=0;i<buf.length;i++)
			{
				if(buf[i]>='a' && buf[i]<='z')continue;
				if(buf[i]>='A' && buf[i]<='Z')continue;
				if(buf[i]>='0' && buf[i]<='9')continue;
				return false;
			}

		return true;
	}