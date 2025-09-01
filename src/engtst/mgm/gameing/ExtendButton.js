
import GmConfig from "../../../config/GmConfig"
import PackageTools from "../../../engine/PackageTools"
import XButtonEx2 from "../../../engine/control/XButtonEx2"
import GmPlay from "../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../engtst/mgm/GmProtocol"
import DrawMode from "../../../engtst/mgm/frame/DrawMode"

class _EXTBTNS
{/*
	int iShow;//1漫游，2战斗，3同时
	XButtonEx2 btn_icon;
	String sAnima;
	String sCmd;*/
	constructor()
	{

	}
}
export default class ExtendButton {

	
	constructor()
	{
		var i;
		this.btns=new Array(ExtendButton.MAXBTN);//
		for(i=0;i<ExtendButton.MAXBTN;i++)this.btns[i]=null;
	}
	
	SetIcon( pls)
	{
		var show=pls.GetNextInt();
		var iconanima=pls.GetNextString();
		var iconcmd=pls.GetNextString();
		
		var i;
		if(show==0)
		{
			for(i=0;i<ExtendButton.MAXBTN;i++)
			{
				if(this.btns[i]!=null)
				{
					if(this.btns[i].sCmd==iconcmd &&
							this.btns[i].sAnima==iconanima)
					{
						this.btns[i]=null;
						return;
					}
				}
			}
		}
		else
		{
			for(i=0;i<ExtendButton.MAXBTN;i++)
			{
				if(this.btns[i]!=null)
				{
					if(this.btns[i].sCmd==iconcmd &&
							this.btns[i].sAnima==iconanima)
					{//已有相同按钮存在
						return;
					}
				}
			}
			for(i=0;i<ExtendButton.MAXBTN;i++)
			{
				if(this.btns[i]==null)
				{
					this.btns[i]=new _EXTBTNS();
					this.btns[i].btn_icon=new XButtonEx2(GmPlay.xani_button);
					this.btns[i].btn_icon.InitButton(iconanima);
					this.btns[i].sAnima=iconanima;
					this.btns[i].sCmd=iconcmd;
					this.btns[i].iShow=show;
					return;
				}
			}
		}
	}
	
	Draw( showtype)
	{
		var i;
		var iOffX=GmConfig.SCRW-120-ExtendButton.BW;
		var iOffY=GmConfig.SCRH-120-ExtendButton.BH;
		for(i=0;i<ExtendButton.MAXBTN;i++)
		{
			if(this.btns[i]!=null)
			{
				if((this.btns[i].iShow&showtype)!=0)
				{
					DrawMode.new_framepc(iOffX, iOffY, ExtendButton.BW, ExtendButton.BH);
					this.btns[i].btn_icon.Move(iOffX, iOffY, ExtendButton.BW, ExtendButton.BH);
					this.btns[i].btn_icon.Draw();
					iOffX-=ExtendButton.BW-20;
				}
			}
		}
	}
	ProcTouch( showtype, msg, x, y)
	{
		var i;
		for(i=0;i<ExtendButton.MAXBTN;i++)
		{
			if(this.btns[i]!=null)
			{
				if((this.btns[i].iShow&showtype)!=0)
				{
					if(this.btns[i].btn_icon.ProcTouch(msg, x, y))
					{
						if(this.btns[i].btn_icon.bCheck())
						{//点击后，发送按钮所触发的命令
							GmProtocol.gi().s_ExtendCmd(this.btns[i].sCmd,"","","","","","","");
						}
						return true;
					}
				}
			}
		}
		return false;
	}
}

ExtendButton.MAXBTN=3;
ExtendButton.BW=80;
ExtendButton.BH=80;
ExtendButton.peb=new ExtendButton();