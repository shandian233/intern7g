
import GmConfig from "../../../../../config/GmConfig"
import BaseClass from "../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XAnima from "../../../../../engine/graphics/XAnima"
import X30_WORD from "../../../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../../../engine/xms/first/X40_CLASS"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../engtst/mgm/frame/UIList"

import ShowActivityDetail from "./ShowActivityDetail"

export default class WeeklyActivity extends BaseClass{
	

	constructor( a)
	{
		super();
		this.titles=["时间","星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		
		this.iW=130*7+170+90;
		this.iH=50+50*6+90;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.ui_list=new UIList(0,8,130*7+170,50+50*6);
		this.ui_list.SetTitle(0, "活动时间",170,false);
		this.ui_list.SetTitle(1, "星期日", 130,true);
		this.ui_list.SetTitle(2, "星期一", 130,true);
		this.ui_list.SetTitle(3, "星期二", 130,true);
		this.ui_list.SetTitle(4, "星期三", 130,true);
		this.ui_list.SetTitle(5, "星期四", 130,true);
		this.ui_list.SetTitle(6, "星期五", 130,true);
		this.ui_list.SetTitle(7, "星期六", 130,true);
		this.ui_list.iRowHeight=50;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
	}
	
	Draw()
	{
		var i=0,j;
		var pc=this.pc_weekly.pca.phead,pc_w;
		var pw;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "周", "历");
		this.btn_close.Draw();
		
		var chk_line=this.ui_list.iCheckPoint;
		var chk_x=this.ui_list.iCheckX;
		this.ui_list.iCheckPoint=-1;
		this.ui_list.iLockPoint=-1;
		this.ui_list.BeginDraw(this.iX+45, this.iY+45);
		while(pc!=null)
		{
			for(j=0;j<this.titles.length;j++)
			{
				if(j==0)
				{
					pw=pc.FindWord(this.titles[j]);
					if(pw!=null)this.ui_list.DrawUnit(j,i, pw.pword);
				}
				else
				{
					pc_w=pc.FindClass(this.titles[j]);
					if(pc_w!=null)
					{
						pw=pc_w.FindWord("活动名称");
						if(pw!=null)
						{
							this.ui_list.DrawUnit(j,i, pw.pword);
							if(chk_line==i && j==chk_x)
							{//打开详细
								ShowActivityDetail.Open(pc_w,0,"");
							}
						}
					}
				}
			}
			pc=pc.pdown;
			i++;
		}
		this.ui_list.FinishDraw();
	}
	ProcTouch( msg, x, y)
	{
		if(this.ui_list.ProcTouch(msg, x, y))
		{
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}

WeeklyActivity.Open=function( pc)
{
	var wa=XStat.gi().PushStat(XStat.GS_WEEKLYACTIVITY);
	wa.pc_weekly=pc;
}
