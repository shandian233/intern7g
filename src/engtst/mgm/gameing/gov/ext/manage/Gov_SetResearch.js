
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"
export default class Gov_SetResearch extends BaseClass{

	 constructor( a)
	{
		super();
		var i;
		var w,h;
		
		w=140;
		h=60;
		
		this.iW=30+w*3-(w-131)+30;
		this.iH=30+h*3-(h-52)+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_research=new Array(8);
		for(i=0;i<8;i++)
		{
			this.btn_research[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_research[i].InitButton("成员操作131_52");
			this.btn_research[i].Move(this.iX+30+(i%3)*w, this.iY+30+Math.floor(i/3)*h, 131, 52);
			this.btn_research[i].sName=MyGov._GOVSKILLS[i];
		}
	}

	Draw()
	{
		var i;
		DrawMode.frame_type4("中等框a52_50",this.iX,this.iY,this.iW,this.iH,52,50);
//		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+20+15, "选择所需建造的建筑", 0xff005b41, 30, 101, 1, 1, 0, -2, -2);

		for(i=0;i<8;i++)this.btn_research[i].Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(this.btn_research[i].ProcTouch(msg, x, y))
			{
				if(this.btn_research[i].bCheck())
				{
					GmProtocol.gi().s_NewGovOperate(18, 2, i, 0, 0, "");
					GmProtocol.gi().s_NewGovOperate(18, 0, 0, 0, 0, "");
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}
Gov_SetResearch.Open=function()
{
	XStat.gi().PushStat(XStat.GS_GOV_SETRESEARCH);
}