
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import MyFT from "../../../../../engtst/mgm/gameing/fteam/MyFT"


export default class FTMiJing  extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=500;
		this.iH=60+105*3+40;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_open=new Array(5);//
		for(var i=0;i<3;i++)
		{
			this.btn_open[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_open[i].InitButton("1号按钮90_60");
			this.btn_open[i].sName="开启";
		}
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
	}
	Draw()
	{
		var offx,offy,offw,offh;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+15, "战队秘境", 0xfffeec7e, 40, 101, 1, 1, 0, -2, 0,2,0xff01152e);
		
		offx=this.iX+20;
		offy=this.iY+60;
		offw=this.iW-40;
		offh=100;
		DrawMode.frame_type4("2号框20_20", offx, offy, offw, offh, 20, 20);
		this.pm3f.DrawText_2(offx+5, offy+5, "封印之地1", 0xfffeec7e, 30, 101, 1, 1, 0, 0, 0,2,0xff01152e);
		this.pm3f.DrawTextEx(offx+5, offy+5+30, "进入条件：本战队成员且等级>=40", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx+5, offy+5+50, "消耗：100声望", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx+5, offy+5+70, "通关掉落：一级封印兽魂", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//		FormatString.gi().Format("#e#e", offw-130, 20);
//		FormatString.gi().Draw(offx+5, offy+5);
		this.btn_open[0].Move(offx+offw-20-90,offy+offh/2-60/2, 90, 60);
		this.btn_open[0].Draw();
		
		offy+=105;
		DrawMode.frame_type4("2号框20_20", offx, offy, offw, offh, 20, 20);
		this.pm3f.DrawText_2(offx+5, offy+5, "封印之地2", 0xfffeec7e, 30, 101, 1, 1, 0, 0, 0,2,0xff01152e);
		this.pm3f.DrawTextEx(offx+5, offy+5+30, "进入条件：本战队成员且等级>=40", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx+5, offy+5+50, "消耗：200声望", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx+5, offy+5+70, "通关掉落：二级封印兽魂", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.btn_open[1].Move(offx+offw-20-90,offy+offh/2-60/2, 90, 60);
		this.btn_open[1].Draw();
		
		offy+=105;
		DrawMode.frame_type4("2号框20_20", offx, offy, offw, offh, 20, 20);
		this.pm3f.DrawText_2(offx+5, offy+5, "封印之地3", 0xfffeec7e, 30, 101, 1, 1, 0, 0, 0,2,0xff01152e);
		this.pm3f.DrawTextEx(offx+5, offy+5+30, "进入条件：本战队成员且等级>=60", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx+5, offy+5+50, "消耗：400声望", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.pm3f.DrawTextEx(offx+5, offy+5+70, "通关掉落：三级封印兽魂", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.btn_open[2].Move(offx+offw-20-90,offy+offh/2-60/2, 90, 60);
		this.btn_open[2].Draw();
		
		this.pm3f.DrawTextEx(offx, this.iY+this.iH-40, "注：加入战队七天以上才能参与秘境", 0xff114e61, 20, 101, 1, 1, 0, 0, 0);
//		FormatString.gi().Format("#e#e", offw-130, 20);
//		FormatString.gi().Draw(offx+5, offy+5);
//		this.btn_open[0].Move(offx+offw-120,offy-offh/2+40/2, 110, 40);
//		this.btn_open[0].Draw();
		
		this.btn_close.Draw();
		if(Confirm1.end(Confirm1.CONFIRM_FTMJ1))
		{
			if(Confirm1.bConfirm)
			{//开启秘境1
				GmProtocol.gi().s_FTOperate(7, 1, 0);
				XStat.gi().PopStat(2);
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_FTMJ2))
		{
			if(Confirm1.bConfirm)
			{//开启秘境1
				GmProtocol.gi().s_FTOperate(7, 2, 0);
				XStat.gi().PopStat(2);
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_FTMJ3))
		{
			if(Confirm1.bConfirm)
			{//开启秘境1
				GmProtocol.gi().s_FTOperate(7, 3, 0);
				XStat.gi().PopStat(2);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<3;i++)
		{
			if(this.btn_open[i].ProcTouch(msg, x, y))
			{
				if(this.btn_open[i].bCheck())
				{
					if(MyFT.mft.iFTJob==0)Confirm1.start(Confirm1.CONFIRM_FTMJ1+i, "战队秘境开启后只能持续一小时，未完成计算为失败，是否确定开启？");
					else EasyMessage.easymsg.AddMessage("队长才能开启秘境");
				}
			}
		}

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{//
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}
FTMiJing.Open=function()
{
    var fmj;
    if(XStat.gi().iXStat==XStat.GS_FTMIJING)
    {
        fmj= XStat.gi().oCurrentView;
    }
    else
    {
        fmj= XStat.gi().PushStat(XStat.GS_FTMIJING);
    }
}