
import GmConfig from "../../../config/GmConfig"
import BaseClass from "../../../engine/BaseClass"
import XButton from "../../../engine/control/XButton"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import XCheckBox from "../../../engine/control/XCheckBox"
import XInput from "../../../engine/control/XInput"
import XInputNumber from "../../../engine/control/XInputNumber"
import M3DFast from "../../../engine/graphics/M3DFast"
import XAnima from "../../../engine/graphics/XAnima"
import GmPlay from "../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../engtst/mgm/GmProtocol"
import XStat from "../../../engtst/mgm/XStat"
import EasyMessage from "../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../engtst/mgm/gameing/me/GmMe"
import DrawMode from "./DrawMode"

export default class InNumber extends BaseClass{

	
	
//	public static ShelvesFrame sf=new ShelvesFrame();
	constructor( ani)
	{
		super();
		this.iW=320;
		this.iH=230;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_ok.InitButton("内框按钮");
		this.btn_ok.sName="确定";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_cancel.InitButton("内框按钮");
		this.btn_cancel.sName="取消";
		
		this.in_num=new XInputNumber(GmPlay.xani_nui3);
		this.in_num.iNumber=0;
		
		InNumber.bOk=false;
	}
	
	Draw()
	{
//		DrawMode.Frame1_BR(this.iX, this.iY, this.iW, this.iH);
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30, InNumber.sTitle, 0xffffffff, 30, 100, 1, 1, 0, 0, 0);

		this.in_num.Move(this.iX+30+30, this.iY+30+30+20, 220);
		this.in_num.Draw();
		
		this.btn_ok.Move(this.iX+30, this.iY+this.iH-30-50, 98, 50);
		this.btn_cancel.Move(this.iX+this.iW-30-98, this.iY+this.iH-30-50, 98, 50);
		this.btn_ok.Draw();
		this.btn_cancel.Draw();
	}
	
	ProcTouch( msg, x, y)
	{
		if(this.in_num.ProcTouch(msg, x, y))return true;
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{//确定
				if(this.in_num.iNumber>=0)
				{
					InNumber.iNumber=this.in_num.iNumber;
					InNumber.bFinished=true;
					InNumber.bOk=true;
					XStat.gi().PopStat(1);
					//
					if(InNumber.iIid==InNumber.IN_RID)
					{
						GmProtocol.gi().s_SeverEvent(17, //mtype
								2, //stype
								InNumber.iNumber, 
								0, 
								0);
					}
				}
				else
				{
					EasyMessage.easymsg.AddMessage("请先输入数字");
				}
			}
			return true;
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}
}
	InNumber.IN_IN=10;//存入
	InNumber.IN_OUT=20;//取出
	InNumber.IN_RID=30;//输入人物ID
	InNumber.iNumber;
	InNumber.iIid;


	
 InNumber.bFinished=false;
 InNumber.bOk;
 InNumber.sTitle;

 InNumber.start=function( iid, title, num, max)
	{
		if(XStat.gi().LastStatType(0)==XStat.GS_INNUMBER)return;
		InNumber.iIid=iid;
		InNumber.sTitle=title;
		InNumber.iNumber=num;
		var _in=XStat.gi().PushStat(XStat.GS_INNUMBER);
		//XStat.gi().LastStat(0);
		_in.in_num.MinMax(0, max);
		_in.in_num.iNumber=num;
	}
	InNumber.end=function( iid)
	{
		if(InNumber.bFinished && InNumber.iIid==iid)
		{
			InNumber.iIid=0;
			InNumber.bFinished=false;
			return true;
		}
		return false;
	}