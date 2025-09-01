
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

class _FTAGREE
{/*
	public int rid,lev;
	public String name;
    public int online;*/
    constructor()
    {

    }
};
//战队属性界面
export default class FTAgree extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=560;
		this.iH=30+50+50+40*10+20+60+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_refuse=new XButtonEx2(GmPlay.xani_button);
		this.btn_refuse.Move(this.iX+30,this.iY+this.iH-30-60, 150, 60);
		this.btn_refuse.InitButton("1号按钮150_60");
		this.btn_refuse.sName="拒绝";
		
		this.btn_agree=new XButtonEx2(GmPlay.xani_button);
		this.btn_agree.Move(this.iX+this.iW/2-150/2,this.iY+this.iH-30-60, 150, 60);
		this.btn_agree.InitButton("1号按钮150_60");
		this.btn_agree.sName="同意";
		
		this.btn_watch=new XButtonEx2(GmPlay.xani_button);
		this.btn_watch.Move(this.iX+this.iW-30-150,this.iY+this.iH-30-60, 150, 60);
		this.btn_watch.InitButton("1号按钮150_60");
		this.btn_watch.sName="查看";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.InitButton("关闭按钮");
		
		this.ui_mlist=new UIList(0,4,500,50+40*10);
		this.ui_mlist.SetTitle(0, "序号", 80, false);
		this.ui_mlist.SetTitle(1, "名字", 200, false);
		this.ui_mlist.SetTitle(2, "等级", 80, false);
		this.ui_mlist.SetTitle(3, "是否在线", 140, false);
	}
	
	Draw()
	{
		var i;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+30+25, "申请列表", 0xfffeec7e, 36, 101, 1, 1, 0, -2, -2,2,0xff01152e);
		
		this.ui_mlist.BeginDraw(this.iX+30, this.iY+30+50);
		for(i=0;i<this.iAppCount;i++)
		{
			this.ui_mlist.DrawUnit(0, i, ""+(i+1));
			this.ui_mlist.DrawUnit(1, i, this.applist[i].name);
			this.ui_mlist.DrawUnit(2, i, ""+this.applist[i].lev);

			if(this.applist[i].online!=0)this.ui_mlist.DrawUnit(3, i, "在线");
		}
		this.ui_mlist.FinishDraw();
		if(this.iPoint>=0 && this.iPoint<this.iAppCount)
		{
			this.btn_agree.Draw();
			this.btn_refuse.Draw();
			this.btn_watch.Draw();
		}

		this.btn_close.Draw();
		this.iPoint=this.ui_mlist.iLockPoint;
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.ui_mlist.ProcTouch(msg, x, y))return true;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.iPoint>=0 && this.iPoint<this.iAppCount)
		{
			if(this.btn_agree.ProcTouch(msg, x, y))
			{
				if(this.btn_agree.bCheck())
				{//同意
					GmProtocol.gi().s_FTAgree(0,this.applist[this.iPoint].rid);
					XStat.gi().PopStat(1);
					XStat.gi().PushStat(XStat.GS_LOADING1);
				}
				return true;
			}
			if(this.btn_refuse.ProcTouch(msg, x, y))
			{
				if(this.btn_refuse.bCheck())
				{//拒绝
					GmProtocol.gi().s_FTAgree(1,this.applist[this.iPoint].rid);
					XStat.gi().PopStat(1);
					XStat.gi().PushStat(XStat.GS_LOADING1);
				}
				return true;
			}
			if(this.btn_watch.ProcTouch(msg, x, y))
			{
				if(this.btn_watch.bCheck())
				{//查看
					GmProtocol.gi().s_WatchOn(0, this.applist[this.iPoint].rid, 0, "");
				}
				return true;
			}
		}
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}

FTAgree.Open=function( pls)
{
    if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
    var i;
    var fta;
    if(XStat.gi().iXStat==XStat.GS_FTAGREE)
    {
        fta= XStat.gi().oCurrentView;
    }
    else
    {
        fta= XStat.gi().PushStat(XStat.GS_FTAGREE);
        fta.applist=new Array(10);//
        for(i=0;i<10;i++)fta.applist[i]=new _FTAGREE();
    }
    fta.iAppCount=pls.GetNextInt();//当前页码
    for(i=0;i<fta.iAppCount;i++)
    {
        fta.applist[i].rid=pls.GetNextInt();
        fta.applist[i].online=pls.GetNextByte();
        fta.applist[i].name=pls.GetNextString();
        fta.applist[i].lev=pls.GetNextInt();
    }
    fta.iPoint=-1;
}