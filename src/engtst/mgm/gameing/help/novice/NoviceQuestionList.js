
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

class _QUESTION
{
/*	public int iRid;
	public int iSid;
	public String sName;
	public String sDetail;*/
	constructor()
	{

	}
}

export default class NoviceQuestionList extends BaseClass{

	
	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=400;
		this.iH=320;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.iQuestionCount=0;
		this.qlist=new Array(10);//
		for(i=0;i<10;i++)this.qlist[i]=new _QUESTION();
		this.iPoint=-1;
		
		this.btn_answer=new XButton(GmPlay.xani_ui);
		this.btn_answer.InitButton("统一中按钮2");
		this.btn_answer.sName="回答";
		
		this.btn_delete=new XButton(GmPlay.xani_ui);
		this.btn_delete.InitButton("统一中按钮2");
		this.btn_delete.sName="去除";
	}

	Draw()
	{
		var i;
		DrawMode.Frame1_BR(this.iX, this.iY, this.iW, this.iH);
		for(i=0;i<this.iQuestionCount;i++)
		{
			M3DFast.gi().FillRect_2D(this.iX+10, this.iY+10+i*60, this.iX+this.iW-10, this.iY+10+i*60+60, i%2==0?0x50303030:0x50101010);
			FormatString.gi().Format(this.qlist[i].sName+":"+this.qlist[i].sDetail, this.iW-40, 20);
			FormatString.gi().Draw(this.iX+20, this.iY+10+i*60+(60-FormatString.gi().iH)/2);
//			M3DFast.gi().DrawTextEx(this.iX+10, this.iY+10+i*30, this.qlist[i].sName+":"+this.qlist[i].sDetail, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			
			if(this.iPoint==i)
			{
				this.btn_answer.Move(this.iX+this.iW-20-70, this.iY+10+i*60+10, 70, 40);
				this.btn_answer.Draw();
				this.btn_delete.Move(this.iX+this.iW-20-70-80, this.iY+10+i*60+10, 70, 40);
				this.btn_delete.Draw();
			}
		}
	}
	RemoveQuestion()
	{
		var i;
		for(i=this.iPoint;i<this.iQuestionCount-1;i++)
		{
			this.qlist[i].iRid=this.qlist[i+1].iRid;
			this.qlist[i].iSid=this.qlist[i+1].iSid;
			this.qlist[i].sName=this.qlist[i+1].sName;
			this.qlist[i].sDetail=this.qlist[i+1].sDetail;
		}
		this.iQuestionCount--;
		this.iPoint=-1;
		if(this.iQuestionCount<=0)XStat.gi().PopStat(1);
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		if(this.iPoint>=0 && this.iPoint<this.iQuestionCount)
		{
			if(this.btn_delete.ProcTouch(msg, x, y))
			{
				if(this.btn_delete.bCheck())
				{
					GmProtocol.gi().s_NoviceHelp(3, this.qlist[this.iPoint].iRid, this.qlist[this.iPoint].iSid, "");
					this.RemoveQuestion();
				}
			}
			if(this.btn_answer.ProcTouch(msg, x, y))
			{
				if(this.btn_answer.bCheck())
				{
					Send_AceAnswer.Open();
				}
			}
		}
		for(i=0;i<this.iQuestionCount;i++)
		{
			if(XDefine.bInRect(x, y, this.iX+10, this.iY+10+i*60,this.iW-20,60))this.iPoint=i;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}
}
NoviceQuestionList.AnswerTheQuestion=function( answer)
	{
		if(XStat.gi().LastStatType(1)!=XStat.GS_NOVICEQUESTIONLIST)return;
		var pnql=(XStat.gi().LastStat(1));
		GmProtocol.gi().s_NoviceHelp(2, pnql.qlist[pnql.iPoint].iRid, pnql.qlist[pnql.iPoint].iSid, answer);
		pnql.RemoveQuestion();
	}
	NoviceQuestionList.Open=function()
	{
		XStat.gi().PushStat(XStat.GS_NOVICEQUESTIONLIST);
		GmProtocol.gi().s_NoviceHelp(1, 0, 0, "");
	}
	NoviceQuestionList.getquestion=function( pls)
	{
		if(XStat.gi().LastStatType(0)!=XStat.GS_NOVICEQUESTIONLIST)XStat.gi().PushStat(XStat.GS_NOVICEQUESTIONLIST);
		var pnql=(XStat.gi().LastStat(0));
		
		var i;
		pnql.iQuestionCount=pls.GetNextByte();
		if(pnql.iQuestionCount==0)
		{
			XStat.gi().PopStat(1);
			return;
		}
		for(i=0;i<pnql.iQuestionCount;i++)
		{
			pnql.qlist[i].iRid=pls.GetNextInt();
			pnql.qlist[i].iSid=pls.GetNextInt();
			pnql.qlist[i].sName=pls.GetNextString();
			pnql.qlist[i].sDetail=pls.GetNextString();
		}
	}