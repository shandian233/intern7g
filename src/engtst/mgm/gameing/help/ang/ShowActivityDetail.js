
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import X10_NUMBER from "../../../../../engine/xms/first/X10_NUMBER"
import X30_WORD from "../../../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../../../engine/xms/first/X40_CLASS"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"


export default class ShowActivityDetail extends BaseClass{

	constructor( xani)
	{
		super();
		this.iW=650;
		this.iH=400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.pc_price=new Array(8);//
		this.btn_price=new Array(8);//
		for(var i=0;i<8;i++)
		{
			this.btn_price[i]=new XButtonEx2(GmPlay.xani_ui);
			this.btn_price[i].bSingleButton=true;
		}
		this.ishowdetail=-1;
		this.gd=new Goods();
	}

	Draw()
	{
		var pc_detail,pc;
		var pw_time;
		var pw_allow;
		var pn_gid;
		var pw_detail;
		var pw_name;
		
		pc_detail=this.pc_show.FindClass("详细信息");
		DrawMode.frame_type4("半透明内容框a50_50", this.iX, this.iY, this.iW, this.iH, 50, 50);
		
		GmPlay.xani_frame.DrawAnima(this.iX+40,this.iY+40, "活跃图标框73_73",0);
		
		pw_name=this.pc_show.FindWord("活动名称");
		if(pw_name==null)
		{
			GmPlay.xani_icon.DrawAnima_aa(this.iX+40,this.iY+40, this.pc_show.sName, 0);
			M3DFast.gi().DrawText_2(this.iX+150, this.iY+55, this.pc_show.sName, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 2, 0xff000000);
		}
		else
		{
			GmPlay.xani_icon.DrawAnima_aa(this.iX+40,this.iY+40, pw_name.pword, 0);
			M3DFast.gi().DrawText_2(this.iX+150, this.iY+55, pw_name.pword, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 2, 0xff000000);			
		}
		var offy=130;
		if(this.iType==0 || this.iType==1)
		{
			M3DFast.gi().DrawTextEx(this.iX+150, this.iY+50+40, this.sExtShow, 0xffffffff, 20,101, 1, 1, 0, 0, -2);
			
			M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy, "活动时间：", 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			pw_time=pc_detail.FindWord("活动时间");
			M3DFast.gi().DrawTextEx(this.iX+150, this.iY+offy, pw_time.pword, 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			
			offy+=30;
			
			pw_allow=pc_detail.FindWord("限制单位");
			if(pw_allow==null)M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy, "等级限制：", 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			else M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy,pw_allow.pword+"：", 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			pw_time=pc_detail.FindWord("等级限制");
			M3DFast.gi().DrawTextEx(this.iX+150, this.iY+offy, pw_time.pword, 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			
			offy+=30;
			M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy, "任务形式：", 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			pw_time=pc_detail.FindWord("任务形式");
			M3DFast.gi().DrawTextEx(this.iX+150, this.iY+offy, pw_time.pword, 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			
			offy+=30;
			M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy, "任务介绍：", 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			pw_time=pc_detail.FindWord("任务介绍");
			FormatString.gi().FormatEx(pw_time.pword, 425, 20, 0, 0, 25);
			FormatString.gi().Draw(this.iX+150, this.iY+offy);
//			M3DFast.gi().DrawTextEx(this.iX+160, this.iY+offy, pw_time.pword, 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			
			offy+=FormatString.gi().iH+10;
			
			pc=pc_detail.FindClass("任务奖励");
			if(pc!=null){
				pc=pc.pca.phead;
				M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy, "任务奖励：", 0xffffffff, 20,101, 1, 1, 0, 0, 0);
			}else{
				offy-=100;
			}
			this.iPriceCount=0;
			while(pc!=null)
			{
				pn_gid=pc.FindNumber("物品id");
				pw_detail=pc.FindWord("物品介绍");
				GmPlay.xani_nui3.DrawAnima(this.iX+150+this.iPriceCount*100, this.iY+offy, "物品格子",0);
				GmPlay.xani_ngoods.DrawAnima_aa(this.iX+150+this.iPriceCount*100, this.iY+offy, GmPlay.de_goods.strValue(pn_gid.iNumber, 0, 10),0);
			//	GmPlay.sop(""+GmPlay.de_goods.strValue(pn_gid.iNumber, 0, 10));
				
				this.pc_price[this.iPriceCount]=pc;
				this.btn_price[this.iPriceCount].Move(this.iX+160+this.iPriceCount*100, this.iY+offy, 80,80);
				this.iPriceCount++;
				pc=pc.pdown;
			}
			
			if(this.ishowdetail>=0)
			{//物品介绍
				pn_gid=this.pc_price[this.ishowdetail].FindNumber("物品id");
				pw_detail=this.pc_price[this.ishowdetail].FindWord("物品介绍");
				if(pw_detail!=null)
				{
					GoodsDraw.new_DrawDetailEx1(pn_gid.iNumber,this.iX+150+this.ishowdetail*100, this.iY+offy,pw_detail.pword);
				}
				else
				{
					this.gd.SetAtt(0, pn_gid.iNumber, 1, 0, 0, 0, 0, 0, 0, 0, 0);
					GoodsDraw.new_DrawDetail(this.gd,this.iX+150+this.ishowdetail*100, this.iY+offy,0);
				}
			}
			
			offy+=100;
		}
		else if(this.iType==4)
		{
			pc=pc_detail.pca.phead;
			while(pc!=null)
			{
				pw_name=pc.FindWord("小标题");
				pw_detail=pc.FindWord("详细内容");
				if(pw_name!=null)
				{
					M3DFast.gi().DrawTextEx(this.iX+40, this.iY+offy, pw_name.pword, 0xffffffff, 20,101, 1, 1, 0, 0, 0);
					offy+=30;
				}
				if(pw_detail!=null)
				{
					FormatString.gi().Format(pw_detail.pword, this.iW-80, 20);
					FormatString.gi().Draw(this.iX+40, this.iY+offy);
					offy+=FormatString.gi().iH+10;
				}
				pc=pc.pdown;
			}
		}
		if(this.iH<offy+20)this.iH=offy+20;
		this.iY=(GmConfig.SCRH-this.iH)/2;
	}
	ProcTouch( msg, x, y)
	{
		var i;
		this.ishowdetail=-1;
		for(i=0;i<this.iPriceCount;i++)
		{
			if(this.btn_price[i].ProcTouch(msg, x, y))
			{
				if(this.btn_price[i].bCheck())
				{
					this.ishowdetail=i;
				}
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
		}
		return false;
	}
}
ShowActivityDetail.Open=function( pc, type, ext)
{
	var psad=XStat.gi().PushStat(XStat.GS_SHOWACTIVITYDETAIL);
	psad.pc_show=pc;
	psad.iType=type;
	psad.sExtShow=ext;
}