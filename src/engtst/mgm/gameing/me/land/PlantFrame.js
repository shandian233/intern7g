
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"

export default class PlantFrame extends BaseClass
{//植物状态
	
	constructor( a)
	{
		super();
		this.iW=400;
		this.iH=320;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_op=new XButtonEx2(GmPlay.xani_button);
		this.btn_op.InitButton("1号按钮90_60");
		this.btn_op.Move(this.iX+250, this.iY+20+215, 90, 60);
		this.btn_op.sName="申请";
		
		this.btn_pick=new XButtonEx2(GmPlay.xani_button);
		this.btn_pick.InitButton("1号按钮90_60");
		this.btn_pick.Move(this.iX+250, this.iY+20+215, 90, 60);
		this.btn_pick.sName="采摘";
		
		this.btn_clear=new XButtonEx2(GmPlay.xani_button);
		this.btn_clear.InitButton("1号按钮90_60");
		this.btn_clear.Move(this.iX+250, this.iY+20+215, 90, 60);
		this.btn_clear.sName="清理";

		 this.sStage=["幼苗期","成长期","采摘期","枯萎","枯萎"];
	}
	

	
	Draw()
	{
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		//植物名称
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20, "名称:"+GmPlay.de_grow.strValue(this.iGType, 0, 1), 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+40, "五行:"+GameData.sWuXing[this.iWx], 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawText_2(this.iX+20, this.iY+20+40, "等级:"+GmPlay.de_grow.intValue(this.iGType, 0, 2), 0xffffff00, 30, 101, 1, 1, 0, 0, 0,1,0xff000000);
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+80, "品质:"+this.iQuality, 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		if(this.iTime>=3)
		{//枯萎，去除
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+120, "成长阶段:"+this.sStage[this.iTime], 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
			
			this.btn_clear.Move(this.iX+250, this.iY+20+120-5, 90, 60);
			this.btn_clear.Draw();
			return;
		}
		if(this.iTime==2)
		{//采摘
			this.btn_pick.Move(this.iX+250, this.iY+20+120-5, 90, 60);
			this.btn_pick.Draw();
		}
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+120, "成长阶段:"+this.sStage[this.iTime], 0xff114e61, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+160,this.iNextTime+"小时后进入"+this.sStage[this.iTime+1], 0xff114e61, 30, 101, 1, 1, 0, 0, 0);

		switch(this.iStat)
		{
		case 0://正常
		default://
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+220, "当前状态:正常", 0xff00ff00, 30, 101, 1, 1, 0, 0, 0);
			break;
		case 1://缺水
			//取水
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+220, "当前状态:干燥", 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			this.btn_op.sName="取水";
			this.btn_op.Draw();
			break;
		case 2://生虫
			//除虫
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+220, "当前状态:虫害", 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			this.btn_op.sName="驱虫";
			this.btn_op.Draw();
			break;
		case 3://长草
			//除草
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+220, "当前状态:杂草", 0xffff0000, 30, 101, 1, 1, 0, 0, 0);
			this.btn_op.sName="除草";
			this.btn_op.Draw();
			break;
		case 4://
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+220, "当前状态:已采摘", 0xffc8bfe7, 30, 101, 1, 1, 0, 0, 0);
			break;
		case 5://
			M3DFast.gi().DrawTextEx(this.iX+20, this.iY+20+220, "当前状态:可采摘", 0xffc8bfe7, 30, 101, 1, 1, 0, 0, 0);
			break;
		}
	}

	ProcTouch( msg,  x,  y)
	{
		if(this.iStat>0)
		{
			if(this.btn_op.ProcTouch(msg, x, y))
			{
				if(this.btn_op.bCheck())
				{
					switch(this.iStat)
					{
					case 1://获得水壶
						GmProtocol.gi().s_LandOperate(1, 0, 0, 0);
						break;
					case 2://杀虫战斗
						GmProtocol.gi().s_LandOperate(2, 0, 0, 0);
						break;
					case 3://消耗体力
						GmProtocol.gi().s_LandOperate(3, 0, 0, 0);
						break;
					}
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		if(this.iTime>=3)
		{//枯萎，去除
			if(this.btn_clear.ProcTouch(msg, x, y))
			{
				if(this.btn_clear.bCheck())
				{//
					GmProtocol.gi().s_LandOperate(5, this.iZid, 0, 0);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		if(this.iTime==2)
		{//采摘
			if(this.btn_pick.ProcTouch(msg, x, y))
			{
				if(this.btn_pick.bCheck())
				{//采摘
					GmProtocol.gi().s_LandOperate(4, this.iZid, 0, 0);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		
		if(msg==3 && !XDefine.bInRect(x, y, this.iX,this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
			return true;
		}
		return false;
	}
}
PlantFrame.Open=function( pls)
{
	var pf;
	if(XStat.gi().iXStat==XStat.GS_PLANTFRAME)pf=XStat.gi().LastStat(0);
	else pf=XStat.gi().PushStat(XStat.GS_PLANTFRAME);
	pf.iZid=pls.GetNextInt();
	pf.iGType=pls.GetNextInt();
	pf.iTime=pls.GetNextInt();//0-3
	pf.iNextTime=pls.GetNextInt();
	pf.iQuality=pls.GetNextInt();//0-100
	pf.iStat=pls.GetNextInt();//当前状态
	pf.iWx=pls.GetNextInt();//五行
}