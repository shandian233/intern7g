
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class LeaderBoard
{

	

	 constructor()
	{
		this.btn_open=null;

	}

	Draw()
	{
//		if(1==1)return;
		var offx=Gameing.iTopIconOffX;

		Gameing.iTopIconOffX+=90;
		if(this.btn_open==null)
		{
			this.btn_open=new XButtonEx2(GmPlay.xani_icon);
			this.btn_open.InitButton("排行榜");
		}
		
		this.btn_open.Move(offx, 10, 72, 72);
		this.btn_open.Draw();
		M3DFast.gi().DrawText_2(this.btn_open.iX+36, this.btn_open.iY+71, "排行榜", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
	}

	ProcTouch( msg, x, y)
	{
//		if(1==1)return false;
		if(this.btn_open.ProcTouch(msg, x, y))
		{
			if(this.btn_open.bCheck())
			{
				GmMe.me.CalcUserScore();
				
				XStat.gi().PushStat(XStat.GS_LEADERBOARDFRAME);
			}
			return true;
		}
		return false;
	}
}
LeaderBoard.lb=new LeaderBoard();