
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import XFight from "../../../../engtst/mgm/gameing/fight/XFight"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyTeam from "../../../../engtst/mgm/gameing/me/team/MyTeam"

export default class AQStart extends BaseClass{

	 constructor( ani)
	{
		super();
		this.btn_start=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_start.InitButton("按钮1");
		this.btn_start.sName="立刻参加";
		
		this.btn_later=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_later.InitButton("按钮1");
		this.btn_later.sName="稍后再去";
		
		this.iW=800;
		this.iH=500;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
	}

	 Draw()
	{
		DrawMode.new_bigframe(this.iX,this.iY,this.iW,this.iH);
		
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, "趣味答题", 0xff003e57, 40, 101, 1, 1, 0, -2, 0);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30+50, "答题活动已经开启，少侠是否参加？", 0xff003e57, 30, 101, 1, 1, 0, -2, 0);
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30+50+40, "(活动时间12:00:00~13:00:00)", 0xff003e57, 30, 101, 1, 1, 0, -2, 0);
		FormatString.gi().FormatEx("#c003e57活动介绍：#e1，共15道题，每次答对可获得经验和绑铜奖励，每题限20秒内回答#e2，累计答错3题计算为失败#e3，完成答题（至少答对12个），可参与额外抽奖#e3，答题途中离开答题页面视为放弃活动，计算为失败", this.iW-60, 30,0, 0, 35);
		FormatString.gi().Draw(this.iX+30, this.iY+30+50+40+40);
		
		this.btn_start.Move(this.iX+40, this.iY+this.iH-40-53, 161, 53);
		this.btn_start.Draw();
		
		this.btn_later.Move(this.iX+this.iW-40-161, this.iY+this.iH-40-53, 161, 53);
		this.btn_later.Draw();
	}
	 ProcTouch( msg, x, y)
	{
		if(this.btn_start.ProcTouch(msg, x, y))
		{
			if(this.btn_start.bCheck())
			{//点击开始
				if(XFight.bFighting)FrameMessage.fm.Open("战斗中不能开始答题活动，请在战斗结束后，点击答题图标重新参与");
				else if(MyTeam.bInTeam())FrameMessage.fm.Open("队伍中不能开始答题活动，请离开队伍后，点击答题图标重新参与");
				else
				{
					AQStart.bShow=false;
					//发送开始活动消息
					GmProtocol.gi().s_AfternoooQuestion(0, 0, 0);//开始答题
				}
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_later.ProcTouch(msg, x, y))
		{
			if(this.btn_later.bCheck())
			{//
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}
AQStart.bShow=false;
AQStart. Open=function()
{
    XStat.gi().PushStat(XStat.GS_AQSTART);
}
