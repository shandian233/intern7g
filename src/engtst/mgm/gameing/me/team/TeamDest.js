
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInputNumber from "../../../../../engine/control/XInputNumber"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class TeamDest extends BaseClass{
	

	constructor( ani)
	{
		super();
		var i;
		this.iW=630;
		this.iH=600;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		
		this.btn_change=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_change.InitButton("按钮1");
		this.btn_change.sName="确定";
		
		this.btncs=new Array(16);////组队类型,地图参数,<箭头方向>,最低等级，最高等级
		this.btn_dest=new Array(16);//
		for(i=0;i<16;i++)
		{
			this.btncs[i]=new Int32Array(5);
			this.btn_dest[i]=new XButton(GmPlay.xani_nui4);
		}
		this.iDestPoint=0;
		this.iOpenPoint=-1;
		this.iOffH=0;
		this.iShowH=this.iH-30-30-20-20;
		this.ResetButton(true);
		this.bLocked1=false;
		
		this.in_lev1=new XInputNumber(GmPlay.xani_nui3);
		this.in_lev1.iNumber=0;
		this.in_lev1.MinMax(0, 100);
		
		this.in_lev2=new XInputNumber(GmPlay.xani_nui3);
		this.in_lev2.iNumber=80;
		this.in_lev2.MinMax(0, 100);
		
		for(i=0;i<this.iDestCount;i++)
		{
			if(this.btncs[i][0]==MyTeam.iTeamTarget)
			{
				this.iDestPoint=i;
				this.in_lev1.iNumber=MyTeam.iLev1;
				this.in_lev2.iNumber=MyTeam.iLev2;
				
//				this.in_lev1.MinMax(0, this.in_lev2.iNumber);
//				this.in_lev2.MinMax(this.in_lev1.iNumber,100);
			}
		}
	}

	ResetButton( dopen)
	{
		var op;
		this.iDestCount=0;
		this.btn_dest[this.iDestCount].InitButton("组队类型1");
		this.btn_dest[this.iDestCount].sName="无目标";
		this.btncs[this.iDestCount][0]=0;
		this.btncs[this.iDestCount][1]=0;
		this.btncs[this.iDestCount][2]=0;//无
		this.btncs[this.iDestCount][3]=0;
		this.btncs[this.iDestCount][4]=80;
		this.iDestCount++;
		
		if(GmMe.me.rbs.iLev>=10)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="为民除害";
			this.btncs[this.iDestCount][0]=1;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;
			this.btncs[this.iDestCount][3]=10;
			this.btncs[this.iDestCount][4]=80;
//			if(this.iOpenPoint==1)this.btncs[this.iDestCount][2]=1;//箭头向上
//			else this.btncs[this.iDestCount][2]=2;//箭头向下
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=20)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="追捕强盗";
			this.btncs[this.iDestCount][0]=2;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=20;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=30)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="山贼宝图";
			this.btncs[this.iDestCount][0]=3;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=30;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=40)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="挑战嚣张";
			this.btncs[this.iDestCount][0]=4;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=40;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		if(GmMe.me.rbs.iLev>=20)
		{
			this.btn_dest[this.iDestCount].InitButton("组队类型1");
			this.btn_dest[this.iDestCount].sName="封印叔叔";
			this.btncs[this.iDestCount][0]=5;
			this.btncs[this.iDestCount][1]=0;
			this.btncs[this.iDestCount][2]=0;//无
			this.btncs[this.iDestCount][3]=20;
			this.btncs[this.iDestCount][4]=80;
			this.iDestCount++;
		}
		this.btn_dest[this.iDestCount].InitButton("组队类型1");
		this.btn_dest[this.iDestCount].sName="定时活动";
		this.btncs[this.iDestCount][0]=99;
		this.btncs[this.iDestCount][1]=0;
		if(dopen)this.iOpenPoint=this.iDestCount;
		op=this.iDestCount;
		if(this.iOpenPoint==op)this.btncs[this.iDestCount][2]=1;//箭头向上
		else this.btncs[this.iDestCount][2]=2;//箭头向下
		this.btncs[this.iDestCount][3]=20;
		this.btncs[this.iDestCount][4]=80;
		this.iDestCount++;
		
		if(this.iOpenPoint==op)
		{//定时活动
			if(GmMe.me.rbs.iLev>=30)
			{
				this.btn_dest[this.iDestCount].InitButton("组队类型2");
				this.btn_dest[this.iDestCount].sName="门派闯关";
				this.btncs[this.iDestCount][0]=6;
				this.btncs[this.iDestCount][1]=0;
				this.btncs[this.iDestCount][2]=0;//无
				this.btncs[this.iDestCount][3]=30;
				this.btncs[this.iDestCount][4]=80;
				this.iDestCount++;
				
				this.btn_dest[this.iDestCount].InitButton("组队类型2");
				this.btn_dest[this.iDestCount].sName="保卫西阳";
				this.btncs[this.iDestCount][0]=7;
				this.btncs[this.iDestCount][1]=0;
				this.btncs[this.iDestCount][2]=0;//无
				this.btncs[this.iDestCount][3]=30;
				this.btncs[this.iDestCount][4]=80;
				this.iDestCount++;
			}
		}
		this.iDestH=this.iDestCount*85-5+40;
	}
	Draw()
	{
		var i,j;
		var offx,offy;
		var offw,offh;
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
//		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		
		if(!this.bLocked1)
		{
			if(this.iOffH>0)this.iOffH/=2;
			if(this.iDestH<this.iShowH)i=this.iDestH;
			else i=this.iShowH;
			j=this.iDestH+this.iOffH;
			if(j<i)
			{
				this.iOffH+=(i-j)/2;
			}
		}

		offx=this.iX+30;offy=this.iY+30;
		offw=270;offh=this.iH-60;
		DrawMode.new_framein(offx,offy,offw,offh);
		M3DFast.gi().SetViewClip(offx+20, offy+20, offx+20+230, offy+20+this.iShowH);
		for(i=0;i<this.iDestCount;i++)
		{
			this.btn_dest[i].Move(offx+20, offy+20+i*85+this.iOffH, 230, 80);
			if(i==this.iDestPoint)
			{
				this.btn_dest[i].bMouseIn=true;
				this.btn_dest[i].bMouseDown=true;
			}
			this.btn_dest[i].Draw();
			if(this.btncs[i][2]==1)GmPlay.xani_nui4.DrawAnima(this.btn_dest[i].iX, this.btn_dest[i].iY, "组队目录开关",1);
			else if(this.btncs[i][2]==2)GmPlay.xani_nui4.DrawAnima(this.btn_dest[i].iX, this.btn_dest[i].iY, "组队目录开关",0);
		}
		M3DFast.gi().NoClip();
		
		offx+=300;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		if(this.btncs[this.iDestPoint][0]<90)
		{
			M3DFast.gi().DrawTextEx(offx+30, offy+100, "等级下限:", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
			this.in_lev1.Move(offx+90, offy+100+40, 150);
			this.in_lev1.Draw();
			
			M3DFast.gi().DrawTextEx(offx+30, offy+100+120, "等级上限:", 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
			this.in_lev2.Move(offx+90, offy+100+40+120, 150);
			this.in_lev2.Draw();
			
			this.btn_change.Move(this.iX+this.iW-30-30-161, this.iY+this.iH-30-30-53, 161, 53);
			this.btn_change.Draw();
		}
	}
	ProcTouch( msg, x, y)
	{
		if(msg==3)
		{
			if(this.bLocked1)
			{
				this.bLocked1=false;
				return true;
			}
		}
		
		var i;
		var offx,offy;

		offx=this.iX+30;
		offy=this.iY+30;
		if(XDefine.bInRect(x, y, offx, offy, 270, 20+this.iShowH))
		{
			for(i=0;i<this.iDestCount;i++)
			{
				if(this.btn_dest[i].ProcTouch(msg, x, y))
				{
					if(this.btn_dest[i].bCheck())
					{//点击任意一个按钮，获取队伍信息
						this.iDestPoint=i;
						this.in_lev1.iNumber=this.btncs[i][3];
						this.in_lev2.iNumber=this.btncs[i][4];
						if(this.btncs[i][0]==99)
						{//开关除害地图
							if(this.iOpenPoint<0)this.iOpenPoint=i;
							else this.iOpenPoint=-1;
							this.ResetButton(false);
						}
//						GmProtocol.gi().s_TeamOperate(12, this.btncs[this.iDestPoint][0], this.btncs[this.iDestPoint][1]);//获取对应队伍
					}
				}
			}
			if(msg==1)this.iLockY=y;
			if(msg==2)
			{
				if(!this.bLocked1)
				{
					i=this.iLockY-y;
					if(i<-15 || i>15)
					{//取消按键按下状态
						this.bLocked1=true;
						for(i=0;i<this.iDestCount;i++)this.btn_dest[i].bMouseDown=false;
					}
				}
			}
		}
		if(msg==2)
		{
			if(this.bLocked1)
			{
				i=this.iLockY-y;
				this.iOffH-=i;
				this.iLockY=y;
				return true;
			}
		}
		if(this.btncs[this.iDestPoint][0]<90)
		{
			if(this.in_lev2.bShow)
			{
				if(this.in_lev2.ProcTouch(msg, x, y))
				{
					if(!this.in_lev2.bShow)
					{
						if(this.in_lev2.iNumber<this.in_lev1.iNumber)this.in_lev2.iNumber=this.in_lev1.iNumber;
					}
					return true;
				}
			}
			else
			{
				if(this.in_lev1.ProcTouch(msg, x, y))
				{
					if(!this.in_lev1.bShow)
					{
						if(this.in_lev1.iNumber>this.in_lev2.iNumber)this.in_lev1.iNumber=this.in_lev2.iNumber;
					}
					return true;
				}
				if(this.in_lev2.ProcTouch(msg, x, y))return true;
			}
			
			if(this.btn_change.ProcTouch(msg, x, y))
			{
				if(this.btn_change.bCheck())
				{//
					GmProtocol.gi().s_TeamOperateEx(13, this.btncs[this.iDestPoint][0], this.btncs[this.iDestPoint][1],this.in_lev1.iNumber,this.in_lev2.iNumber);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}
TeamDest.Open=function()
{
	if(XStat.gi().CheckStat(XStat.GS_TEAMDEST))return;
	XStat.gi().PushStat(XStat.GS_TEAMDEST);
}