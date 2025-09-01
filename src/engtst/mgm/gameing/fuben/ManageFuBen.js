
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"

class _FUBENMEMBER
{
    /*
	public String sName;
	public int iRid;
    public byte iOnLine;*/
    
}
export default class ManageFuBen extends BaseClass{
	
	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW = 880;
		this.iH = 550;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX + this.iW-35, this.iY-25, 60, 60);
		
		this.fuben=new Object();
		this.members=new Array(128);//
		this.applyers=new Array(128);//
		for(i=0;i<128;i++)
		{
			this.members[i]=new _FUBENMEMBER();
			this.applyers[i]=new _FUBENMEMBER();
		}

		
		this.btn_leave=new XButtonEx1(GmPlay.xani_button);
		this.btn_leave.InitButton("1号按钮150_60");
		this.btn_leave.Move(this.iX + this.iW-40-320, this.iY + this.iH-40-60, 150, 60);
		this.btn_leave.sName="离开团队";
		
		this.btn_start=new XButtonEx1(GmPlay.xani_button);
		this.btn_start.InitButton("1号按钮150_60");
		this.btn_start.Move(this.iX + this.iW-40-150, this.iY + this.iH-40-60, 150, 60);
		this.btn_start.sName="开始副本";
		
		this.btn_watch=new XButtonEx1(GmPlay.xani_button);
		this.btn_watch.InitButton("1号按钮120_60");
		this.btn_watch.sName="查看";
		
		this.btn_agree=new XButtonEx1(GmPlay.xani_button);
		this.btn_agree.InitButton("1号按钮120_60");
		this.btn_agree.sName="同意";
		
		this.btn_refuse=new XButtonEx1(GmPlay.xani_button);
		this.btn_refuse.InitButton("1号按钮120_60");
		this.btn_refuse.sName="拒绝";
		
		this.btn_kick=new XButtonEx1(GmPlay.xani_button);
		this.btn_kick.InitButton("1号按钮120_60");
		this.btn_kick.sName="踢出";
		
		this.iSelectPoint=-1;
	}

	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW, this.iH, "管", "理", "副", "本");
		this.btn_close.Draw();
		DrawMode.new_framein(this.iX+25, this.iY+25,this.iW-50 , this.iH-50);
		//申请表
		offx = this.iX + 50;
		offy = this.iY + 40;
		M3DFast.gi().DrawText_2(offx + 210 / 2, offy, "申请列表", 0xfffeec7e, 28, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
		DrawMode.frame_type4("2号框20_20", offx, offy+30, 210, 360, 20, 20);
		if (this.iSelectPoint >=0 && this.iSelectPage == 0)
		{
			DrawMode.frame_type1("12号框20_30", offx + 5, offy + 50 + this.iSelectPoint * 20 - 15, 200, 20);
		}
		for (i = 0; i<this.iApplyCount; i++)
		{
			M3DFast.gi().DrawText_2(offx + 10, offy + 50 + i * 20, this.applyers[i].sName, 0xffffffff, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
			if (this.applyers[i].iOnLine == 1)M3DFast.gi().DrawText_2(offx + 200, offy + 50 + i * 20, "在线", 0xffffe0a0, 20, 101, 1, 1, 0, -3, -2, 3, 0xff000000);
		}
		
		//成员
		offx = this.iX + 60 + 210 + 20;
		offy = this.iY + 40;
		M3DFast.gi().DrawText_2(offx + 210 / 2, offy, "团队成员", 0xfffeec7e, 28, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
		DrawMode.frame_type4("2号框20_20", offx, offy + 30, 210, 360, 20, 20);
		if (this.iSelectPoint >=0 && this.iSelectPage == 1)
		{
			DrawMode.frame_type1("12号框20_30", offx + 5, offy + 50 + this.iSelectPoint * 20 - 15, 200, 20);
		}
		for (i = 0; i<this.iMemberCount; i++)
		{
			M3DFast.gi().DrawText_2(offx + 10, offy + 50 + i * 20, this.members[i].sName, 0xffffffff, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
			if (this.members[i].iOnLine == 1)this.pm3f.DrawText_2(offx + 200, offy + 50 + i * 20, "在线", 0xffffe0a0, 20, 101, 1, 1, 0, -3, -2, 3, 0xff000000);
		}
		
		//副本简介
		DrawMode.ui3_Text1(this.iX+520, this.iY+70, 100, 220, "副本名", GmPlay.de_fuben.strValue(this.fuben.iType, 0, 1));
		DrawMode.ui3_Text1(this.iX+520, this.iY+70+35, 100, 220, "团长", this.fuben.sName);
		DrawMode.ui3_Text1(this.iX+520, this.iY+70+35*2, 100, 220, "团长号码", this.fuben.iRid+"("+(this.fuben.iOnLine==0?"离线":"在线")+")");
		DrawMode.ui3_Text1(this.iX+520, this.iY+70+35*3, 100, 220, "人数限制", GmPlay.de_fuben.strValue(this.fuben.iType, 0, 3)+"~"+GmPlay.de_fuben.strValue(this.fuben.iType, 0, 4));
		DrawMode.ui3_Text1(this.iX+520, this.iY+70+35*4, 100, 220, "等级限制", GmPlay.de_fuben.strValue(this.fuben.iType, 0, 5)+"~"+GmPlay.de_fuben.strValue(this.fuben.iType, 0, 6));
		DrawMode.ui3_Text1(this.iX+520, this.iY+70+35*5, 100, 220, "创建时间", this.fuben.tm);

		M3DFast.gi().DrawText_2(this.iX + 520, this.iY + 70 + 35 * 6+5, "团队简介:", 0xfffeec7e, 28, 101, 1, 1, 0, 0, 0, 3, 0xff01152e);
		DrawMode.frame_type4("2号框20_20", this.iX + 520, this.iY + 70 + 35 * 7, 320, 115, 20, 20);
		FormatString.gi().Format(this.fuben.sDetail, 300, 20);
		FormatString.gi().Draw(this.iX+530, this.iY+70+35*7+10);

		if(this.fuben.iRid==GmMe.me.iRid)
		{//我是团长,
			this.btn_leave.Move(this.iX + this.iW - 40 - 320, this.iY + this.iH - 40 - 60, 150, 60);
			this.btn_leave.sName="解散团队";
			this.btn_start.Draw();
			//查看，拒绝申请，同意申请，，，，，查看，踢出团队,,,,,,,,,,,开始副本,解散团队
			if(this.iSelectPoint>=0)
			{
				if (this.iSelectPage == 0)
				{//查看，拒绝申请，同意入团
					this.btn_watch.Move(this.iX + 50 , this.iY + this.iH-40-60, 120, 60);
					this.btn_watch.Draw();
					this.btn_agree.Move(this.iX + 50  +45+ 120, this.iY + this.iH - 40 - 60, 120,60);
					this.btn_agree.Draw();
					this.btn_refuse.Move(this.iX + 50  +45+ 120+45+120, this.iY + this.iH - 40 - 60, 120, 60);
					this.btn_refuse.Draw();
				}
				else
				{//查看，踢出团队
					this.btn_watch.Move(this.iX + 50 + 70, this.iY + this.iH - 40 - 60, 120, 60);
					this.btn_watch.Draw();
					this.btn_kick.Move(this.iX + 50 + 70 + 120+70, this.iY + this.iH - 40 - 60, 120, 60);
					this.btn_kick.Draw();
				}
			}
		}
		else
		{//
			this.btn_leave.Move(this.iX + this.iW - 40 - 150, this.iY + this.iH - 40 - 60, 150, 60);
			this.btn_leave.sName="离开团队";
			//查看
			if(this.iSelectPoint>=0 && this.iSelectPage==1)
			{//查看
				this.btn_watch.Move(this.iX + 50 + 45 + 120, this.iY + this.iH - 40 - 60, 120, 60);
				this.btn_watch.Draw();
			}
		}
		this.btn_leave.Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_LEAVEFUBEN))
		{//
			if(Confirm1.bConfirm)
			{//同意离开副本
				GmProtocol.gi().s_ManageFuBen(0,0,0);
				XStat.gi().PopStat(1);
			}
		}
	}
	 ProcTouch( msg, x, y)
	{
		if(this.iSelectPoint>=0)
		{
			if(this.btn_watch.ProcTouch(msg, x, y))
			{
				if(this.btn_watch.bCheck())
				{
					if(this.iSelectPage==0)GmProtocol.gi().s_WatchOn(0, this.applyers[this.iSelectPoint].iRid, 0,"");
					else GmProtocol.gi().s_WatchOn(0, this.members[this.iSelectPoint].iRid, 0,"");
//					this.iSelectPoint=-1;
				}
				return true;
			}
		}
		if(this.fuben.iRid==GmMe.me.iRid)
		{//我是团长,
			if(this.btn_start.ProcTouch(msg, x, y))
			{
				if(this.btn_start.bCheck())
				{//开始副本
					GmProtocol.gi().s_ManageFuBen(4,0,0);
				}
				return true;
			}
			if(this.iSelectPoint>=0)
			{
				if(this.iSelectPage==0)
				{//查看，拒绝申请，同意入团
					if(this.btn_agree.ProcTouch(msg, x, y))
					{
						if(this.btn_agree.bCheck())
						{
							GmProtocol.gi().s_ManageFuBen(1,this.applyers[this.iSelectPoint].iRid,0);
							this.iSelectPoint=-1;
						}
						return true;
					}
					if(this.btn_refuse.ProcTouch(msg, x, y))
					{
						if(this.btn_refuse.bCheck())
						{
							GmProtocol.gi().s_ManageFuBen(3,this.applyers[this.iSelectPoint].iRid,0);
							this.iSelectPoint=-1;
						}
						return true;
					}
				}
				else
				{//查看，踢出团队
					if(this.btn_kick.ProcTouch(msg, x, y))
					{
						if(this.btn_kick.bCheck())
						{
							GmProtocol.gi().s_ManageFuBen(2,this.members[this.iSelectPoint].iRid,0);
							this.iSelectPoint=-1;
						}
						return true;
					}
				}
			}
		}

		if(this.btn_leave.ProcTouch(msg, x, y))
		{
			if(this.btn_leave.bCheck())
			{
				if(this.fuben.iRid==GmMe.me.iRid)Confirm1.start(Confirm1.CONFIRM_LEAVEFUBEN, "是否确定解散团队？");
				else Confirm1.start(Confirm1.CONFIRM_LEAVEFUBEN, "是否确定退出团队？");
			}
			return true;
		}

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(this.btn_leave.ProcTouch(msg, x, y))
		{
			if(this.btn_leave.bCheck())
			{
//				GmProtocol.gi().s_CreateFuBen(ifblist[0],sDetail);
				XStat.gi().PopStat(1);
			}
		}
		
		this.iSelectPoint=-1;
		var i;
		var xx,yy;
		var offx,offy;
		offx=this.iX+60;
		offy=this.iY+40;
		for(i=0;i<this.iApplyCount;i++)
		{
			xx=offx+10;
			yy=offy+50+i*20;
			if(XDefine.bInRect(x, y, xx, yy-10, 190, 20))
			{
				this.iSelectPage=0;
				this.iSelectPoint=i;
			}
		}
		
		//成员
		offx=this.iX+60+210+20;
		offy=this.iY+40;
		for(i=0;i<this.iMemberCount;i++)
		{
			xx=offx+10;
			yy=offy+50+i*20;
			if(XDefine.bInRect(x, y, xx, yy-10, 190, 20))
			{
				this.iSelectPage=1;
				this.iSelectPoint=i;
			}
		}
		
		return false;
	}
}
