
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
import PrivateChat_Send from "../../../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

export default class ConfirmApply extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.iW=131*2+20+10+20;
		this.iH=52*2+20+10+20+80+20;
		
		this.iX=(GmConfig.SCRW-this.iW)/2+150;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_operates=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_operates[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_operates[i].InitButton("成员操作131_52");
		}
		this.btn_operates[0].sName="聊天";
		this.btn_operates[1].sName="好友";
		this.btn_operates[2].sName="同意";
		this.btn_operates[3].sName="拒绝";
	}

	Draw()
	{
		var i;
		DrawMode.new_framepc(this.iX,this.iY,this.iW,this.iH);
		
//		GmPlay.xani_ui.DrawAnima(this.iX+20,this.iY+20, "右上UI", 0);// 右上角头像
//		GmPlay.xani_ui.DrawAnima(this.iX+20,this.iY+20, "头像", iRace * 2 + iSex);
//		GmPlay.sop(""+this.pgm.iRas);
		GmPlay.xani_head.DrawAnima(this.iX+20,this.iY+20,"新头像"+this.pgm.iRas,0);
		M3DFast.gi().DrawTextEx(this.iX+20+80+10, this.iY+20+20, this.pgm.sName, 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		M3DFast.gi().DrawTextEx(this.iX+20+80+10, this.iY+20+20+40, "号码："+this.pgm.iRid, 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		for(i=0;i<(MyGov.mg.bCheckPower(0)?4:2);i++)
		{
			this.btn_operates[i].Move(this.iX+20+i%2*(131+10),this.iY+20+80+20+Math.floor(i/2)*(52+10),131,52);
			this.btn_operates[i].Draw();
		}
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<(MyGov.mg.bCheckPower(0)?4:2);i++)
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
					case 2://同意
						GmProtocol.gi().s_NewGovOperate(11, this.pgm.iRid, 1, 0,0,this.pgm.sName);
						XStat.gi().PopStat(1);
						break;
					case 3://拒绝
						GmProtocol.gi().s_NewGovOperate(11, this.pgm.iRid, 0, 0,0,this.pgm.sName);
						XStat.gi().PopStat(1);
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
ConfirmApply.Open=function( gm)
{
    if(gm.iRid==GmMe.me.iRid)return;
    var afg;
    if (XStat.gi().iXStat != XStat.GS_CONFIRMAPPLY)afg=XStat.gi().PushStat(XStat.GS_CONFIRMAPPLY);
    else afg =  XStat.gi().LastStat(0);

    afg.pgm=gm;
    
    if(MyGov.mg.bCheckPower(0))afg.iH=52*2+20+10+20+80+20;
    else afg.iH=52+20+20+80+20;
}