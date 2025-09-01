
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"

export default class NoviceCheckAnswer extends BaseClass{


	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=400;
		this.iH=300;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_yes=new XButton(GmPlay.xani_ui);
		this.btn_yes.InitButton("统一中按钮2");
		this.btn_yes.sName="解决";
		
		this.btn_no=new XButton(GmPlay.xani_ui);
		this.btn_no.InitButton("统一中按钮3");
		this.btn_no.sName="未解决";
		
		this.btn_ts=new XButton(GmPlay.xani_ui);
		this.btn_ts.InitButton("统一中按钮2");
		this.btn_ts.sName="投诉";
	}

	Draw()
	{
		var offx,offy;
		
		FormatString.gi().Format("您提的问题:"+this.sQDetail+"#e#e"+this.sAName+"的回答:"+this.sADetail+"#e#e如果对回答不满意，或者有不和谐文字，点击投诉", this.iW-20, 20);

		this.iH=FormatString.gi().iH+20+60;
		DrawMode.Frame1_BR(this.iX, this.iY, this.iW, this.iH);
		
		FormatString.gi().Draw(this.iX+10, this.iY+10);
		
		this.btn_yes.Move(this.iX+10, this.iY+this.iH-50, 70, 40);
		this.btn_yes.Draw();
		
		this.btn_no.Move(this.iX+this.iW/2-50, this.iY+this.iH-50, 100, 40);
		this.btn_no.Draw();
		
		this.btn_ts.Move(this.iX+this.iW-80, this.iY+this.iH-50, 70, 40);
		this.btn_ts.Draw();
		
//		offx=this.iX+10;
//		offy=this.iY+10;
//		FormatString.gi().Format("你提的问题："+this.sQDetail, this.iW-20, 20);
//		FormatString.gi().Draw(offx, offy);
//		offy+=FormatString.gi().iH+20;
//		
//		FormatString.gi().Format(this.sAName+"的回答："+this.sADetail, this.iW-20, 20);
//		FormatString.gi().Draw(offx, offy);
//		offy+=FormatString.gi().iH+20;
		
		
	}
	 ProcTouch( msg, x, y)
	{
		if(this.btn_yes.ProcTouch(msg, x, y))
		{
			if(this.btn_yes.bCheck())
			{//解答完成
				GmProtocol.gi().s_NoviceHelp(4, GmMe.me.iRid, this.iQSid, "");
				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_no.ProcTouch(msg, x, y))
		{
			if(this.btn_no.bCheck())
			{//重新解答
				GmProtocol.gi().s_NoviceHelp(5, GmMe.me.iRid, this.iQSid, "");
				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_ts.ProcTouch(msg, x, y))
		{
			if(this.btn_ts.bCheck())
			{//投诉
				GmProtocol.gi().s_NoviceHelp(6, GmMe.me.iRid, this.iQSid, "");
				XStat.gi().PopStat(1);
			}
		}
//		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
//		{
//			XStat.gi().PopStat(1);
//			return true;
//		}
		return false;
	}
}
NoviceCheckAnswer.getanswer=function( pls)
{
	if(XStat.gi().LastStatType(0)!=XStat.GS_NOVICECHECKANSWER)XStat.gi().PushStat(XStat.GS_NOVICECHECKANSWER);
	var pnca=(XStat.gi().LastStat(0));
	pnca.iQSid=pls.GetNextInt();
	pnca.sQDetail=pls.GetNextString();
	pnca.iARid=pls.GetNextInt();
	pnca.sAName=pls.GetNextString();
	pnca.sADetail=pls.GetNextString();
}