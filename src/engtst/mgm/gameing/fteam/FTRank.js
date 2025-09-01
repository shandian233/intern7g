
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import MyFT from "./MyFT"
import FTChallenge from "./FTChallenge";

class _FTRANK
{/*
	public int fid,rank;
	public String name,leader;
    public int nowar;*/
    constructor()
    {

    }
};
//战队属性界面
export default class FTRank extends BaseClass{

	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=600;
		this.iH=480;
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
		
		this.btn_fight=new XButtonEx2(GmPlay.xani_button);
		this.btn_fight.Move(this.iX+this.iW/2-120/2,this.iY+this.iH-30-60, 120, 60);
		this.btn_fight.InitButton("1号按钮120_60");
		this.btn_fight.sName="挑战";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.Move(this.iX+this.iW-30, this.iY-20, 60, 60);
		this.btn_close.InitButton("关闭按钮");
	}
	
	Draw()
	{
		var i,x,y,w;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.pm3f.DrawText_2(this.iX+this.iW/2, this.iY+15, "战队排行", 0xfffeec7e, 40, 101, 1, 1, 0, -2, 0,2,0xff01152e);
		
		for(i=0;i<10;i++)
		{
			x=this.iX+20+Math.floor(i/5)*this.iW/2;
			y=this.iY+60+i%5*65;
			
			if(this.iPoint==i)this.pm3f.FillRect_2D(x, y, x+this.iW/2-40,y+60, 0x80000080);
			else if(i<this.iCount && this.ranklist[i].fid==MyFT.mft.iFTid)this.pm3f.FillRect_2D(x, y, x+this.iW/2-40,y+60, 0x80008000);
			else DrawMode.frame_type4("2号框20_20", x, y, this.iW/2-40, 60, 20, 20);
		}
		w=this.iW/2-40;
		for(i=0;i<this.iCount;i++)
		{
			x=this.iX+20+Math.floor(i/5)*this.iW/2;
			y=this.iY+60+i%5*65;
			this.pm3f.DrawText_2(x+15, y+30, ""+this.ranklist[i].rank, 0xffffC800, 50, 101, 1, 1, 0, 0, -2,2,0xff000000);
			
			this.pm3f.DrawTextEx(x+w-10, y+5, "队名:"+this.ranklist[i].name, 0xffffffff, 20, 101, 1, 1, 0, -3, 0);
			this.pm3f.DrawTextEx(x+w-10, y+5+30, "队长:"+this.ranklist[i].leader, 0xffffffff, 20, 101, 1, 1, 0, -3, 0);
			if(this.ranklist[i].nowar>0)
			{
				M3DFast.gi().DrawTextEx(x+w/2-50,y+30-25, "免战", 0xffff0000, 50, 101, 1, 1, 30, x+w/2,y+30 );
			}
			if(this.ranklist[i].fid==FTRank.iDFid)
			{
				M3DFast.gi().DrawTextEx(x+w/2-50,y+30-25, "挑战", 0xffff0000, 50, 101, 1, 1, 30, x+w/2,y+30 );				
			}
		}
//		GmPlay.sop(""+this.ranklist[this.iPoint].rank+"___"+this.iMyRank+"___"+ this.ranklist[this.iPoint].fid+"___"+MyFT.mft.iFTid +"___"+this.ranklist[this.iPoint].nowar);
		if(this.iNoWar>0)
		{
			this.pm3f.DrawTextEx(this.btn_fight.iX,this.btn_fight.iY, "免战中", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		}
		else if(FTRank.iFTStat==2)
		{//挑战查询
			this.btn_fight.sName="挑战查询";
			this.btn_fight.Draw();
		}
		else if(FTRank.iFTStat==1)
		{
			if(FTRank.iDFid==0)
			{
				this.btn_fight.sName="发起挑战";
				if(this.iPoint>=0 && this.iPoint<this.iCount && this.ranklist[this.iPoint].rank<this.iMyRank && this.ranklist[this.iPoint].fid!=MyFT.mft.iFTid && this.ranklist[this.iPoint].nowar==0)
				{
					this.btn_fight.Draw();
				}
			}
			else
			{
				this.btn_fight.sName="取消挑战";
				this.btn_fight.Draw();
			}
		}

		GmPlay.sop("ftstat="+FTRank.iFTStat);
		
		this.btn_pageup.Draw();
		this.btn_pagedown.Draw();

		this.btn_close.Draw();
	}
	
	ProcTouch( msg, x, y)
	{
		var i,j,k;
		if(FTRank.iFTStat==2)
		{
			if(this.btn_fight.ProcTouch(msg, x, y))
			{
				if(this.btn_fight.bCheck())
				{//弹出挑战框
					GmProtocol.gi().s_FTChallenge(3, 0, 0);
				}
				return true;
			}
		}
		else if(FTRank.iFTStat==1)
		{
			if(FTRank.iDFid==0)
			{
				if(this.iPoint>=0 && this.iPoint<this.iCount && this.ranklist[this.iPoint].rank<this.iMyRank && this.ranklist[this.iPoint].fid!=MyFT.mft.iFTid && this.ranklist[this.iPoint].nowar==0)
				{
					if(this.btn_fight.ProcTouch(msg, x, y))
					{
						if(this.btn_fight.bCheck())
						{//弹出挑战框
							FTChallenge.Open(this.ranklist[this.iPoint].name,this.ranklist[this.iPoint].fid);
						}
						return true;
					}
				}
			}
			else
			{
					if(this.btn_fight.ProcTouch(msg, x, y))
					{
						if(this.btn_fight.bCheck())
						{//弹出挑战框
							GmProtocol.gi().s_FTChallenge(2, 0, 0);
						}
						return true;
					}
			}
		}
		
		this.iPoint=-1;
		for(i=0;i<10;i++)
		{
			j=this.iX+20+Math.floor(i/5)*this.iW/2;
			k=this.iY+60+i%5*65;
			if(XDefine.bInRect(x, y, j, k, this.iW/2-40, 60))this.iPoint=i;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(this.btn_pageup.ProcTouch(msg, x, y))
		{
			if(this.btn_pageup.bCheck())
			{//上一页
				if(this.iPage>0)
				{
					this.iPage--;
					GmProtocol.gi().s_FTChallenge(0, this.iPage,0);
				}
				else EasyMessage.easymsg.AddMessage("已到首页");
			}
			return true;
		}
		if(this.btn_pagedown.ProcTouch(msg, x, y))
		{
			if(this.btn_pagedown.bCheck())
			{//下一页
//				if(iFtCount>=10)
				{
					this.iPage++;
					GmProtocol.gi().s_FTChallenge(0, this.iPage,0);
				}
//				else EasyMessage.easymsg.AddMessage("已到末页");
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;
		return false;
	}
}

FTRank.iFTStat;
FTRank.iDFid;
FTRank.iDMoney;

FTRank._2506c=function( pls)
{
   FTRank.iFTStat=pls.GetNextInt();
   FTRank.iDFid=pls.GetNextInt();
   FTRank.iDMoney=pls.GetNextInt();
   if(FTRank.iDMoney<=0)FTRank.iDFid=0;
}
FTRank.Open=function( pls)
{
   if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
   var i;
   var ftr;
   if(XStat.gi().iXStat==XStat.GS_FTRANK)
   {
       ftr= XStat.gi().oCurrentView;
   }
   else
   {
       ftr= XStat.gi().PushStat(XStat.GS_FTRANK);
       ftr.ranklist=new Array(10);//
       for(i=0;i<10;i++)ftr.ranklist[i]=new _FTRANK();
   }
   ftr.iNoWar=pls.GetNextInt();
   ftr.iMyRank=pls.GetNextInt();
   ftr.iPage=pls.GetNextInt();//当前页码
   ftr.iCount=pls.GetNextInt();
   for(i=0;i<ftr.iCount;i++)
   {
       ftr.ranklist[i].rank=pls.GetNextInt();
       ftr.ranklist[i].fid=pls.GetNextInt();
       ftr.ranklist[i].name=pls.GetNextString();
       ftr.ranklist[i].leader=pls.GetNextString();
       ftr.ranklist[i].nowar=pls.GetNextInt();
   }
   ftr.iPoint=-1;
}