
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
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"

export default class DayAttend extends BaseClass{


	
	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=460;
		this.iH=350;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_get=new XButton(GmPlay.xani_button);
		this.btn_get.InitButton("统一大按钮2");
		this.btn_get.Move(this.iX+this.iW-60-5, this.iY, 60, 60);
		this.btn_get.sName="签到";
		
		this.iNeedDay=new Int32Array(6);//
		this.sGiveDetail=new Array(6);//
	}
	
	Draw()
	{
		var i,j,k,m;
		var offx,offy,w,h;
		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
		
		offx=this.iX+20;
		offy=this.iY+20;
		w=200;
		h=230;
		M3DFast.gi().FillRect_2D(offx, offy, offx+w, offy+h, 0x20000000);
		if(this.iWeek==0)k=7;
		else k=this.iWeek;
		m=0;
		for(i=0;i<7;i++)
		{
			if(i==0)j=7;
			else j=i;
			if(j<k)
			{//显示是否签到过
				M3DFast.gi().DrawTextEx(offx+10, offy+10+j*30-30, "周"+GameData.sWeek[j], 0xff000000, 20, 101, 1, 1, 0, 0, 0);
				if((this.iFlag19&(1<<i))==0)M3DFast.gi().DrawTextEx(offx+10+120, offy+10+j*30-30, "未签到", 0xffff0000, 20, 101, 1, 1, 0, 0, 0);
				else
				{
					M3DFast.gi().DrawTextEx(offx+10+120, offy+10+j*30-30, "已签到", 0xff00ff00, 20, 101, 1, 1, 0, 0, 0);
					m++;
				}
			}
			else if(k==j)
			{
				M3DFast.gi().FillRect_2D(offx+10, offy+10+j*30-30,offx+w-10, offy+10+j*30-30+20, 0x20000000);
				M3DFast.gi().DrawTextEx(offx+10, offy+10+j*30-30, "周"+GameData.sWeek[j], 0xff000000, 20, 101, 1, 1, 0, 0, 0);
				if((this.iFlag19&(1<<i))!=0)
				{
					M3DFast.gi().DrawTextEx(offx+10+120, offy+10+j*30-30, "已签到", 0xff00ff00, 20, 101, 1, 1, 0, 0, 0);
					m++;
				}
			}
			else
			{
				M3DFast.gi().DrawTextEx(offx+10, offy+10+j*30-30, "周"+GameData.sWeek[j], 0xff000000, 20, 101, 1, 1, 0, 0, 0);
			}
		}
		
		offy+=h;
		M3DFast.gi().DrawTextEx(offx+10, offy+10, "当前活跃度"+this.iAct, 0xff000000, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+10, offy+50, "活跃度达到"+this.iNeedAct+"可签到", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		
		offx+=w+20;
		offy=this.iY+20;
		M3DFast.gi().FillRect_2D(offx, offy, offx+w, offy+h, 0x20000000);
		var s="#cffff00本周已累计签到"+m+"次#e#e#c000000";
		for(i=0;i<this.iGiveCount;i++)
		{
			s+="累计签到"+this.iNeedDay[i]+"次可获得:#e"+this.sGiveDetail[i];
			s+="#e#e";
		}
		FormatString.gi().Format(s, 180, 20);
		FormatString.gi().Draw(offx+10, offy+10);
		
		offy+=h;
		
		this.btn_get.Move(offx+w/2-80/2,offy+20,80,50);
		this.btn_get.Draw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_get.ProcTouch(msg, x, y))
		{
			if(this.btn_get.bCheck())
			{
				if(this.iAct<this.iNeedAct)EasyMessage.easymsg.AddMessage("活跃度未达不能签到");
				else
				{                                                                                                         
					GmProtocol.gi().s_GetCodeReward(3, "");
					XStat.gi().PopStat(1);
				}
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}

}
DayAttend.Open=function( pls)
{
	var i;
	var da=XStat.gi().PushStat(XStat.GS_DAYATTEND);
	da.iWeek=pls.GetNextByte();//今天周几
	da.iFlag19=pls.GetNextInt();//本周签到情况
	da.iAct=pls.GetNextInt();//当前活跃
	da.iNeedAct=pls.GetNextInt();//需要活跃
	
	da.iGiveCount=pls.GetNextByte();
	for(i=0;i<da.iGiveCount;i++)
	{
		da.iNeedDay[i]=pls.GetNextByte();
		da.sGiveDetail[i]=pls.GetNextString();
	}
}