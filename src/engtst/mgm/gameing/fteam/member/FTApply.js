
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../engtst/mgm/frame/UIList"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"

class _FTAPPLIST
{
//	public int fid,rank;
//	public String name,header;
constructor()
{

}
};
//战队属性界面
export default class FTApply extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=560;
		this.iH=30+50+50+40*10+20+60+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_pageup=new XButtonEx2(GmPlay.xani_button);
		this.btn_pageup.Move(this.iX+30,this.iY+this.iH-30-60, 120, 60);
		this.btn_pageup.InitButton("1号按钮120_60");
		this.btn_pageup.sName="上一页";
		
		this.btn_pagedown=new XButtonEx2(GmPlay.xani_button);
		this.btn_pagedown.Move(this.iX+this.iW-30-120,this.iY+this.iH-30-60, 120, 60);
		this.btn_pagedown.InitButton("1号按钮120_60");
		this.btn_pagedown.sName="下一页";
		
		this.btn_apply=new XButtonEx2(GmPlay.xani_button);
		this.btn_apply.Move(this.iX+this.iW/2-120/2,this.iY+this.iH-30-60, 120, 60);
		this.btn_apply.InitButton("1号按钮120_60");
		this.btn_apply.sName="申请";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
		
		this.ui_mlist=new UIList(0,3,500,50+40*10);
		this.ui_mlist.SetTitle(0, "序号", 100, false);
		this.ui_mlist.SetTitle(1, "战队名称", 200, false);
		this.ui_mlist.SetTitle(2, "队长", 200, false);
	}
	
	Draw()
	{
		var i;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+30+25, "申请加入战队", 0xfffeec7e, 36, 101, 1, 1, 0, -2, -2,2,0xff01152e);
		
		this.ui_mlist.BeginDraw(this.iX+30, this.iY+30+50);
		for(i=0;i<this.iFtCount;i++)
		{
			this.ui_mlist.DrawUnit(0, i, ""+(this.iPage*10+1+i));
			this.ui_mlist.DrawUnit(1, i, this.ftlist[i].name);
			this.ui_mlist.DrawUnit(2, i, this.ftlist[i].header);
		}
		this.ui_mlist.FinishDraw();
		
		this.iPoint=this.ui_mlist.iLockPoint;
		if(this.iPoint>=0 && this.iPoint<this.iFtCount)this.btn_apply.Draw();
		
		this.btn_pageup.Draw();
		this.btn_pagedown.Draw();
		this.btn_close.Draw();
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.ui_mlist.ProcTouch(msg, x, y)	)return true;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.iPoint>=0 && this.iPoint<this.iFtCount)
		{
			if(this.btn_apply.ProcTouch(msg, x, y))
			{
				if(this.btn_apply.bCheck())
				{//申请
					GmProtocol.gi().s_ApplyFT(this.ftlist[this.iPoint].fid);
				}
				return true;
			}
		}
		
		if(this.btn_pageup.ProcTouch(msg, x, y))
		{
			if(this.btn_pageup.bCheck())
			{//上一页
				if(this.iPage>0)
				{
					this.iPage--;
					GmProtocol.gi().s_SeverEvent(18,2,this.iPage,0,0);
				}
				else EasyMessage.easymsg.AddMessage("已到首页");
			}
			
			return true;
		}
		if(this.btn_pagedown.ProcTouch(msg, x, y))
		{
			if(this.btn_pagedown.bCheck())
			{//下一页
				if(this.iFtCount>=10)
				{
					this.iPage++;
					GmProtocol.gi().s_SeverEvent(18,2,this.iPage,0,0);
				}
				else EasyMessage.easymsg.AddMessage("已到末页");
			}
			
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}

FTApply.Open=function( pls)
	{
		var i;
		var fta;
		if(XStat.gi().iXStat==XStat.GS_FTAPPLY)
		{
			fta= XStat.gi().oCurrentView;
		}
		else
		{
			fta= XStat.gi().PushStat(XStat.GS_FTAPPLY);
			fta.ftlist=new Array(10);//
			for(i=0;i<10;i++)fta.ftlist[i]=new _FTAPPLIST();
		}
		fta.iPage=pls.GetNextShort();
		fta.iFtCount=pls.GetNextByte();//当前页码
		for(i=0;i<fta.iFtCount;i++)
		{
			fta.ftlist[i].fid=pls.GetNextInt();
			fta.ftlist[i].rank=pls.GetNextInt();
			fta.ftlist[i].name=pls.GetNextString();
			fta.ftlist[i].header=pls.GetNextString();
		}
		fta.iPoint=-1;
	}