
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButton from "../../../../engine/control/XButton"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"

export default class MySelect extends BaseClass{

	
	 constructor( a)
	{
		super();
		this.xm3f=M3DFast.xm3f;
		
		this.iW=700;
		this.iH=320;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.sAnswer=new Array(6);//
		this.iCs=new Int32Array(6);//
		this.btn_ans=new Array(6);//
		for(var i=0;i<6;i++)
		{
			this.btn_ans[i]=new XButton(GmPlay.xani_button);
			this.btn_ans[i].InitButton("普通按钮200_55");
			this.btn_ans[i].Move(this.iX+this.iW-30-200, this.iY+30+i*65, 200, 55);
		}
	}
	

	InitDialog( pls)
	{
		var i;
		
		this.iMType=pls.GetNextByte();
		this.iSType=pls.GetNextByte();
		this.sQuestion=pls.GetNextString();
		this.iCount=pls.GetNextByte();
		for(i=0;i<this.iCount;i++)
		{
			this.sAnswer[i]=pls.GetNextString();
			this.iCs[i]=pls.GetNextInt();
			this.btn_ans[i].sName=this.sAnswer[i];
		}
	}
	
	Draw()
	{
		var i;
		
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		DrawMode.frame_type4("单色内框a20_20", this.iX+30, this.iY+30, 430, this.iH-60, 20, 20);
		
		FormatString.gi().FormatEx(this.sQuestion, 430-30, 25, 0, 0, 35);
		FormatString.gi().Draw(this.iX+30+15, this.iY+30+15);

		for(i=0;i<this.iCount;i++)
		{
			this.btn_ans[i].Draw();
		}
	}

	ProcTouch( msg, x, y)
	{
		if(MySelect.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))
		{
			for(var i=0;i<this.iCount;i++)
			{
				if(this.btn_ans[i].ProcTouch(msg, x, y))
				{
					if(this.btn_ans[i].bCheck())
					{
						GmProtocol.gi().s_SeverSelect(this.iMType, this.iSType, this.iCs[i]);
						XStat.gi().PopStat(1);
					}
				}
			}
		}
		else if(msg==3)
		{
			XStat.gi().PopStat(1);
		}
		return true;
	}

}
MySelect.Open=function( pls)
{
	var ms=XStat.gi().FindStat(XStat.GS_MYSELECT);
	if(ms==null)ms=XStat.gi().PushStat(XStat.GS_MYSELECT);
	ms.InitDialog(pls);
}
MySelect.bInRect=function( x , y, rx, ry, rw, rh)
{
	if(x<=rx)return false;
	if(y<=ry)return false;
	if(x>=rx+rw)return false;
	if(y>=ry+rh)return false;
	return true;
}