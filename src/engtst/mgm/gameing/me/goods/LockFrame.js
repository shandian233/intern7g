
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

import LockOpen from "./LockOpen"

export default class LockFrame extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW = 290;
		this.iH = 220;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_open=new Array(2);//
		for(i=0;i<2;i++)
		{
			this.btn_open[i]=new XButtonEx1(GmPlay.xani_button);
			this.btn_open[i].InitButton("1号按钮210_60");
		}
		this.btn_open[0].sName="解  锁";
		this.btn_open[1].sName="强制解锁";
	}

	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		this.btn_open[0].Move(this.iX + 40, this.iY + 40, 210, 60);
		this.btn_open[0].Draw();
		
		if(GmMe.me.iUnlockTime<100)this.btn_open[1].sName="取消强制解锁";
		else this.btn_open[1].sName="强制解锁";
		
		this.btn_open[1].Move(this.iX + 40, this.iY + 40 + 60 + 20, 210, 60);
		this.btn_open[1].Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_UNLOCK))
		{
			if(Confirm1.bConfirm)
			{//同意丢弃
				GmProtocol.gi().s_SetLock(2, 0, "asdf");
				XStat.gi().PopStat(1);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_open[0].ProcTouch(msg, x, y))
		{
			if(this.btn_open[0].bCheck())
			{
				XStat.gi().PopStat(1);
				LockOpen.Open();
				return true;
			}
		}
		if(this.btn_open[1].ProcTouch(msg, x, y))
		{
			if(this.btn_open[1].bCheck())
			{
				if(GmMe.me.iUnlockTime<100)
				{
					GmProtocol.gi().s_SetLock(3, 0, "asdf");
					XStat.gi().PopStat(1);
					return true;
				}
				else Confirm1.start(Confirm1.CONFIRM_UNLOCK,"强制解锁需要等待3天观察期，是否确定强制解锁？");
//				XStat.gi().PopStat(1);
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}
}

LockFrame.Open=function()
{
	XStat.gi().PushStat(XStat.GS_LOCKFRAME);
//		(SmallSpeaker)(XStat.gi().LastStat(0))
}