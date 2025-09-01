
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XInput from "../../../../engine/control/XInput"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../engtst/mgm/frame/UIList"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"

// class _FUBEN
// {/*
// 	public int iFid;
// 	public int iType;
// 	public int iRid;
// 	public String sName;
// 	public int iLev;
// 	public int ras;
// 	public String tm;
// 	public String sDetail;
//     public byte iOnLine;//0不在线,1在线*/
//     constructor()
//     {

//     }
// }
export default class ApplyFuBen extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW = 950;
		this.iH = 610;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX + this.iW - 35, this.iY - 25, 60, 60);
		
		this.fblist=new Array(10);//
		for(i=0;i<10;i++)
		{
			this.fblist[i]=new Object();
		}
		this.iCount=0;
		
		this.btn_apply=new XButtonEx1(GmPlay.xani_button);
		this.btn_apply.InitButton("1号按钮150_60");
		this.btn_apply.Move(this.iX + this.iW - 40 - 150, this.iY + this.iH - 40 - 60, 150, 60);
		this.btn_apply.sName="申 请";
		
		this.btn_up=new XButtonEx1(GmPlay.xani_button);
		this.btn_up.InitButton("1号按钮150_60");
		this.btn_up.Move(this.iX + 50, this.iY + this.iH-40-60, 150, 60);
		this.btn_up.sName="上一页";
		
		this.btn_down=new XButtonEx1(GmPlay.xani_button);
		this.btn_down.InitButton("1号按钮150_60");
		this.btn_down.Move(this.iX + 50+520-150, this.iY + this.iH -40 - 60, 150, 60);
		this.btn_down.sName="下一页";
		
		this.ui_fblist=new UIList(0, 4, 520, 50 + 40 * 10);
//		this.ui_fblist.UIList_init(0, 4, 520, 50 + 40 * 10);
		this.ui_fblist.SetTitle(0, "副本名", 100, false);
		this.ui_fblist.SetTitle(1, "团长", 200, false);
		this.ui_fblist.SetTitle(2, "团长等级", 120, false);
		this.ui_fblist.SetTitle(3, "状态", 100, false);
	}

	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW, this.iH, "加", "入", "副", "本");
		DrawMode.new_framein(this.iX + 25, this.iY + 25, this.iW - 50, this.iH - 50);
		this.btn_close.Draw();
		
		this.ui_fblist.BeginDraw(this.iX+50, this.iY+50);
		for (i = 0; i < 10; i++)
		{
			if (i >= this.iCount)continue;
			this.ui_fblist.DrawUnit(0, i, GmPlay.de_fuben.strValue(this.fblist[i].iType, 0, 1));
			this.ui_fblist.DrawUnit(1, i, this.fblist[i].sName);
			this.ui_fblist.DrawUnit(2, i, ""+this.fblist[i].iLev);
			this.ui_fblist.DrawUnit(3, i, "招募中");
		}
		this.ui_fblist.FinishDraw();
		
		M3DFast.gi().DrawText_2(this.iX+50+260,this.iY+ this.iH-40-30, ""+(this.iPage+1)+" / "+this.iTotalPage, 0xffffe0a0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		this.btn_up.Draw();
		this.btn_down.Draw();
		
		if(this.ui_fblist.iLockPoint>=0 && this.ui_fblist.iLockPoint<this.iCount)
		{//副本描述
			DrawMode.ui3_Text1(this.iX+590, this.iY+50, 100, 220, "副本名", GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 1));
			DrawMode.ui3_Text1(this.iX+590, this.iY+50+35, 100, 220, "团长", this.fblist[this.ui_fblist.iLockPoint].sName);
			DrawMode.ui3_Text1(this.iX+590, this.iY+50+35*2, 100, 220, "团长号码", this.fblist[this.ui_fblist.iLockPoint].iRid+"("+(this.fblist[this.ui_fblist.iLockPoint].iOnLine==0?"离线":"在线")+")");
			DrawMode.ui3_Text1(this.iX+590, this.iY+50+35*3, 100, 220, "人数限制", GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 3)+"~"+GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 4));
			DrawMode.ui3_Text1(this.iX+590, this.iY+50+35*4, 100, 220, "等级限制", GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 5)+"~"+GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 6));
			DrawMode.ui3_Text1(this.iX+590, this.iY+50+35*5, 100, 220, "创建时间", GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 5)+"~"+GmPlay.de_fuben.strValue(this.fblist[this.ui_fblist.iLockPoint].iType, 0, 6));
			
			M3DFast.gi().DrawText_2(this.iX+590, this.iY+50+35*6+5, "团队简介:", 0xffffe0a0, 28, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
			DrawMode.frame_type4("2号框20_20", this.iX + 590, this.iY + 50 + 35 * 7, 320, 205, 20, 20);
			FormatString.gi().Format(this.fblist[this.ui_fblist.iLockPoint].sDetail, 300, 20);
			FormatString.gi().Draw(this.iX+600, this.iY+50+35*7+10);
			
			this.btn_apply.Draw();
		}

		/*
		//具体描述
		DrawMode.ui3_Frame2(this.iX+230, this.iY+40, 500, 120);
		FormatString.gi().Format(GmPlay.de_fuben.strValue(ifblist[iPoint], 0, 2), 480, 20);
		FormatString.gi().Draw(this.iX+230+10, this.iY+40+10);
		
		//难度，副本时间，
		//人数区间，等级区间，创建花费，
		DrawMode.ui3_Text1(this.iX+230, this.iY+180, 100, 130, "人数", GmPlay.de_fuben.strValue(ifblist[iPoint], 0, 3)+"~"+GmPlay.de_fuben.strValue(ifblist[iPoint], 0, 4));
		DrawMode.ui3_Text1(this.iX+230+270, this.iY+180, 100, 130, "等级", GmPlay.de_fuben.strValue(ifblist[iPoint], 0, 5)+"~"+GmPlay.de_fuben.strValue(ifblist[iPoint], 0, 6));
		DrawMode.ui3_Text1(this.iX+230, this.iY+180+50, 100, 130, "创建花费", GmPlay.de_fuben.strValue(ifblist[iPoint], 0, 8)+"金钱");
		
		M3DFast.gi().DrawText_2(this.iX+230, this.iY+180+100, "团队简介:", 0xffffe0a0, 20, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		DrawMode.ui3_Frame2(this.iX+230, this.iY+180+100+30, 350, 120);
		FormatString.gi().Format(sDetail, 330, 20);
		FormatString.gi().Draw(this.iX+230+10, this.iY+180+100+30+10);
		
		btn_detail.Draw();
		btn_create.Draw();
		
		if(bEditingName)
		{
			sDetail=in_detail.sDetail;
			if(in_detail.bFinished)
			{//编辑完成//发送到服务器改名
//				GmPlay.sop("send name");
				bEditingName=false;
				in_detail.bFinished=false;
//				GmProtocol.gi().s_ChangePetName(ppet.iPid, in_name.sDetail);
			}
		}*/
	}
	ProcTouch( msg, x, y)
	{
		if (this.ui_fblist.ProcTouch(msg, x, y))return true;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		
		if(this.btn_apply.ProcTouch(msg, x, y))
		{
			if(this.btn_apply.bCheck())
			{
				GmProtocol.gi().s_ApplyFuBen(this.fblist[this.ui_fblist.iLockPoint].iFid);
//				XStat.gi().PopStat(1);
			}
		}
		
		if(this.btn_up.ProcTouch(msg, x, y))
		{
			if(this.btn_up.bCheck())
			{
				if(this.iPage>0)
				{
					this.iPage--;
					GmProtocol.gi().s_FuBen(2,this.iPage);
					XStat.gi().PushStat(XStat.GS_LOADING1);
				}
			}
		}
		if(this.btn_down.ProcTouch(msg, x, y))
		{
			if(this.btn_down.bCheck())
			{
				if(this.iPage<this.iTotalPage-1)
				{
					this.iPage++;
					GmProtocol.gi().s_FuBen(2,this.iPage);
					XStat.gi().PushStat(XStat.GS_LOADING1);
				}
			}
		}
		
		return false;
	}
}
