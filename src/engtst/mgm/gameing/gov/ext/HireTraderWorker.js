
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

export default class HireTraderWorker extends BaseClass{
	 constructor( a)
	{
		super();
		var i;
		
		this.iW=750;
		this.iH=480;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.iCount=new Int32Array(3);//
				
		this.btn_hire=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_hire[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_hire[i].sName="雇佣";
			this.btn_hire[i].InitButton("普通按钮140_55");
		}
	}
	Draw()
	{
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		if(this.iType==0)this.Draw_0();
		else this.Draw_1();
	}
	Draw_0()
	{
		var offx,offy;
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30, "我这里的工人无所不能！", 0xff035d44, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30+40, "当前正在工作的普通工人"+this.iCount[0]+"名，高级工人"+this.iCount[1]+"名，特殊工人"+this.iCount[2]+"名", 0xff155058, 20, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30+80, "维护时增加"+this.iAdd+"建筑进度", 0xff155058, 20, 101, 1, 1, 0, 0, 0);
		
		offx=this.iX+30;
		offy=this.iY+150;
		this.DrawEntry(0,offx,offy,"普通工人","6万铜币(获得60帮贡)");
		this.DrawEntry(1,offx,offy+100,"高级工人","12万铜币(获得90帮贡)");
		this.DrawEntry(2,offx,offy+200,"特殊工人","20元宝(获得120帮贡)");
	}
	Draw_1()
	{
		var offx,offy;
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30, "我这里的商人个个都是好手！", 0xff035d44, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30+40, "当前正在工作的普通商人"+this.iCount[0]+"名，高级商人"+this.iCount[1]+"名，特殊商人"+this.iCount[2]+"名", 0xff155058, 20, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(this.iX+30, this.iY+30+80, "维护时恢复"+this.iAdd+"帮派资金", 0xff155058, 20, 101, 1, 1, 0, 0, 0);
		
		offx=this.iX+30;
		offy=this.iY+150;
		this.DrawEntry(0,offx,offy,"普通商人","6万铜币(获得60帮贡)");
		this.DrawEntry(1,offx,offy+100,"高级商人","12万铜币(获得90帮贡)");
		this.DrawEntry(2,offx,offy+200,"特殊商人","20元宝(获得120帮贡)");
	}
	 DrawEntry( p, offx, offy, title, detail)
	{
		var ww=690;
		DrawMode.frame_type1("帮派福利条a20_92",offx,offy,ww,20);
		
		GmPlay.xani_icon.DrawAnima_aa(offx+20, offy+(92-73)/2, title,0);
		
		M3DFast.gi().DrawText_2(offx+20+73+20,offy+92/2, title, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 4, 0xffa57841);
		if(detail.length>0)M3DFast.gi().DrawTextEx(offx+20+73+20+160, offy+92/2, detail, 0xff000000, 20, 101, 1, 1, 0, 0, -2);
		this.btn_hire[p].Move(offx+ww-20-140,offy+(92-55)/2,140,55);
		this.btn_hire[p].Draw();
	}
	
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<3;i++)
		{
			if(this.btn_hire[i].ProcTouch(msg, x, y))
			{
				if(this.btn_hire[i].bCheck())
				{
					GmProtocol.gi().s_HireWorker(this.iType,i,24);
					XStat.gi().PopStat(1);
				}
				break;
			}
		}
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}

HireTraderWorker.Open=function( pls)
{
	var tt=pls.GetNextInt();
	if(tt!=0)return;
	var htw=XStat.gi().PushStat(XStat.GS_HIRETRADERWORKER);
	
	htw.iType=pls.GetNextInt();
	htw.iCount[0]=pls.GetNextInt();
	htw.iCount[1]=pls.GetNextInt();
	htw.iCount[2]=pls.GetNextInt();
	htw.iAdd=pls.GetNextInt();
}