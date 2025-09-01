
import GmConfig from "../../../../config/GmConfig"
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
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"

export default class CreateFuBen extends BaseClass{
	
	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=800;
		this.iH=480;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_ui3);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX+748, this.iY, 60, 60);
		
		this.ifblist=new Int32Array(16);//
		this.btn_fuben=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_fuben[i]=new XButton(GmPlay.xani_ui3);
			this.btn_fuben[i].InitButton("统一按钮2");
			this.btn_fuben[i].Move(this.iX+60, this.iY+40+i*50, 128, 32);
			this.btn_fuben[i].iNameSize=20;
		}
		this.iPoint=0;
		
		this.btn_create=new XButtonEx1(GmPlay.xani_ui3);
		this.btn_create.InitButton("统一按钮1");
		this.btn_create.Move(this.iX+620, this.iY+390, 117, 40);
		this.btn_create.sName="创 建";
		
		this.btn_detail=new XButtonEx1(GmPlay.xani_ui3);
		this.btn_detail.InitButton("统一按钮1");
		this.btn_detail.Move(this.iX+620, this.iY+310, 117, 40);
		this.btn_detail.sName="修改简介";
		this.btn_detail.iNameSize=25;
		
		this.sDetail="无";
		
		this.in_detail=new XInput(GmPlay.xani_frame);
		this.in_detail.Move(GmConfig.SCRW, GmConfig.SCRH, 10,10);
		this.in_detail.sDetail="";
		this.bEditingName=false;
	}

	Draw()
	{
		var i;
		DrawMode.ui3_BaseFrame4(this.iX, this.iY, "创", "建","副","本");
		this.btn_close.Draw();
		
		for(i=0;i<this.iCount;i++)
		{
			if(this.iPoint==i)
			{
				GmPlay.xani_ui3.DrawAnimaEx(this.iX+45, this.iY+30+i*50+5, "选中背景",0,101,0.9,0.71,0,0,0);
			}
			this.btn_fuben[i].sName=GmPlay.de_fuben.strValue(this.ifblist[i], 0, 1);
			
			this.btn_fuben[i].Draw();
		}
		GmPlay.xani_ui3.DrawAnima(this.iX+200, this.iY, "大框分割线",0);
		
		//具体描述
		DrawMode.ui3_Frame2(this.iX+230, this.iY+40, 500, 120);
		FormatString.gi().Format(GmPlay.de_fuben.strValue(this.ifblist[this.iPoint], 0, 2), 480, 20);
		FormatString.gi().Draw(this.iX+230+10, this.iY+40+10);
		
		//难度，副本时间，
		//人数区间，等级区间，创建花费，
		DrawMode.ui3_Text1(this.iX+230, this.iY+180, 100, 130, "人数限制", GmPlay.de_fuben.strValue(this.ifblist[this.iPoint], 0, 3)+"~"+GmPlay.de_fuben.strValue(this.ifblist[this.iPoint], 0, 4));
		DrawMode.ui3_Text1(this.iX+230+270, this.iY+180, 100, 130, "等级限制", GmPlay.de_fuben.strValue(this.ifblist[this.iPoint], 0, 5)+"~"+GmPlay.de_fuben.strValue(this.ifblist[this.iPoint], 0, 6));
		DrawMode.ui3_Text1(this.iX+230, this.iY+180+50, 100, 130, "创建花费", GmPlay.de_fuben.strValue(this.ifblist[this.iPoint], 0, 8)+"金钱");
		
		M3DFast.gi().DrawText_2(this.iX+230, this.iY+180+100, "团队简介:", 0xffffe0a0, 20, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		DrawMode.ui3_Frame2(this.iX+230, this.iY+180+100+30, 350, 120);
		FormatString.gi().Format(this.sDetail, 330, 20);
		FormatString.gi().Draw(this.iX+230+10, this.iY+180+100+30+10);
		
		this.btn_detail.Draw();
		this.btn_create.Draw();
		
		if(this.bEditingName)
		{
			this.in_detail.onscr();
			this.sDetail=this.in_detail.sDetail;
			if(this.in_detail.bFinished)
			{//编辑完成//发送到服务器改名
//				GmPlay.sop("send name");
				this.bEditingName=false;
				this.in_detail.bFinished=false;
//				GmProtocol.gi().s_ChangePetName(ppet.iPid, in_name.sDetail);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<this.iCount;i++)
		{
			if(this.btn_fuben[i].ProcTouch(msg, x, y))
			{
				if(this.btn_fuben[i].bCheck())
				{
					this.iPoint=i;
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
		
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{
				GmProtocol.gi().s_CreateFuBen(this.ifblist[this.iPoint],this.sDetail);
				XStat.gi().PopStat(1);
			}
		}
		
		if(this.btn_detail.ProcTouch(msg, x, y))
		{
			if(this.btn_detail.bCheck())
			{
				this.in_detail.Move(this.btn_detail.iX,this.btn_detail.iY,this.btn_detail.iW,this.btn_detail.iH);
				this.in_detail.sDetail=this.sDetail;
				this.in_detail.OpenInput();
				this.in_detail.ProcTouch(3,GmConfig.SCRW+1,GmConfig.SCRH+1);
				this.bEditingName=true;
			}
		}
		return false;
	}
}
