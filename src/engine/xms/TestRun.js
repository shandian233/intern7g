
import XmsCButton from "../../engine/xms/control/XmsCButton"
import X40_CLASS from "../../engine/xms/first/X40_CLASS"
import X_FIRST from "../../engine/xms/first/X_FIRST"
import FrameMessage from "../../engtst/mgm/frame/message/FrameMessage"

import RunFirst from "./RunFirst"

export default class TestRun extends RunFirst
{
    constructor()
    {
        super();
    }
    InitBefore()
	{
		var pf=prunclass.FindFirst("行内容1",10);
		var pf1=pf.GetCopy();
		pf1.sName="行内容3";
		var pc=prunclass.FindFirst("行内容",10);
		pc.LinkFirst(pf1);
    }
    InitAfter()
	{
//		X40_CLASS pc;
//		pc=(X40_CLASS) prunclass.FindFirst("福源规则按钮",5);
//		pbtn_fyrule=(XmsCButton) pc.pobj;
    }
    Draw()
	{
		this._Draw();
    }
    ProcTouch( msg, x, y)
	{
		this._ProcTouch(msg,x,y);
//		if(pbtn_fyrule!=null && pbtn_fyrule.bCheck())
//		{//打开福源规则页面
//			FrameMessage.fm.Open("福源规则");
//		}
		return false;
	}
}