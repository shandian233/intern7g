
import VisualBlock from "../../../../../map/VisualBlock"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import MyAI from "../../../../../engtst/mgm/MyAI"
import XStat from "../../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import XFight from "../../../../../engtst/mgm/gameing/fight/XFight"
import BeginersGuide from "../../../../../engtst/mgm/gameing/help/BeginersGuide"
import GamePost from "../../../../../engtst/mgm/gameing/help/GamePost"


class _EXTBUF
{
/*	public String detail,s1,s2,s3;
	public int type1,type2,type3;
	public int cs1,cs2,cs3;*/
	constructor()
	{

	}
};

export default class ExtHelp extends BaseClass{

	
	
	constructor( ani)
	{
		super();
		var i;
		this.extsel=new Array(3);//
		this.extsel[0]=new _EXTSEL();
		this.extsel[1]=new _EXTSEL();
		this.extsel[2]=new _EXTSEL();
		this.iX=GmConfig.SCRW/4;
		this.iW=GmConfig.SCRW*3/5;
		
		this.iH=GmConfig.SCRH*5/16;
		this.iY=GmConfig.SCRH-this.iH;
		if(GmConfig.SCRH==720)this.fRate=1;
		else this.fRate=1.0*GmConfig.SCRH/720;
		this.fRate=1;
		this.aa=GmPlay.xani_ui4.InitAnimaWithName("琴清", null);
		
		this.btn1_aa=GmPlay.xani_ui4.InitAnimaWithName("引导按钮1", null);
		this.btn2_aa=GmPlay.xani_ui4.InitAnimaWithName("引导按钮2", null);
		
		this.btn_sel=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_sel[i]=new XButton(GmPlay.xani_ui);
			
			this.btn_sel[i].bSingleButton=true;
		}
	}
	
	
	
	Draw()
	{
		FrameMessage.fm.bShow=false;
		EasyMessage.easymsg.Clear();
//		GamePost.gi().Clear();
		var i,w,h;
		i=1;
		DrawMode.ui4_FrameDown(this.iX, this.iY, this.iW, this.iH);
//		M3DFast.gi().FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xa0000000);
		this.aa.DrawEx(this.iX, GmConfig.SCRH, 101, this.fRate,this.fRate, 0, 0, 0);

		FormatString.gi().FormatEx("#c00ff00"+this.sDetail,  (this.iW-this.fRate*100), (this.fRate*(ExtHelp.iWordSize)), 1, 0xff000000, (this.fRate*(ExtHelp.iWordSize+ExtHelp.iWordSize/6)));
		while(FormatString.gi().iH>this.iH-(this.fRate*(38+16))-20)
		{
			ExtHelp.iWordSize--;
			FormatString.gi().FormatEx("#c00ff00"+this.sDetail,  (this.iW-this.fRate*100), (this.fRate*(ExtHelp.iWordSize)), 1, 0xff000000, (this.fRate*(ExtHelp.iWordSize+ExtHelp.iWordSize/6)));
		}
//		FormatString.gi().Format(this.sDetail, iW-80, (this.fRate*30));
		FormatString.gi().Draw( (this.iX+this.fRate*90), this.iY+10);
		
		//38*4=152
		w= (this.fRate*(152+16));
		h= (this.fRate*(38+16));
		for(i=0;i<3;i++)
		{
			if(this.extsel[i].type==0)continue;
			this.btn_sel[i].Move(this.iX+(this.fRate*180)+(w+10)*i, GmConfig.SCRH-h-10, w, h);
			if(this.btn_sel[i].bMouseDown)
			{
				this.btn1_aa.iFrame=1;
				this.btn2_aa.iFrame=1;
			}
			else
			{
				this.btn1_aa.iFrame=0;
				this.btn2_aa.iFrame=0;
			}
			if(i<2)this.btn1_aa.DrawEx(this.btn_sel[i].iX,this.btn_sel[i].iY, 101, this.fRate, this.fRate, 0, 0, 0);
			else this.btn2_aa.DrawEx(this.btn_sel[i].iX,this.btn_sel[i].iY, 101, this.fRate, this.fRate, 0, 0, 0);
//			M3DFast.gi().DrawTextEx(this.btn_sel[i].iX+this.btn_sel[i].iW/2,this.btn_sel[i].iY+this.btn_sel[i].iH/2,this.extsel[i].sel,0x80ffffff,(this.fRate*38),101,1,1,0,-2,-2);
			M3DFast.gi().DrawText_2(this.btn_sel[i].iX+this.btn_sel[i].iW/2,this.btn_sel[i].iY+this.btn_sel[i].iH/2,this.extsel[i].sel,0x80000000,(this.fRate*38),101,1,1,0,-2,-2, 1, 0xffffffff);
		}
	}
	
	ProcTouch( msg, x, y)
	{
		var i;

		for(i=0;i<3;i++)
		{
			if(this.btn_sel[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sel[i].bCheck())
				{
					switch(this.extsel[i].type)
					{
					case 1://选择引导模式,1普通，2语音，3跳过
						if(this.extsel[i].cs==1)
						{//普通引导
							BeginersGuide.iEventGuide=74;
							//GmPlay.sop("aaaaaaaaaaaaaaaaaaaaaaaa");
						}
						XRecordFast.iExtHelp=this.extsel[i].cs;
						GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);
						XStat.gi().PopStat(1);
						break;
					case 2://确定,关闭引导窗口
						XStat.gi().PopStat(1);
						break;
					case 3://自动寻路
						XStat.gi().PopStat(1);
						VisualBlock.iLastProcBase=-1;
						//mapdialog.bDialoging=false;
						MyAI.gi().FindNpc(this.extsel[i].cs,false,false);
						break;
					case 4://上一条
						PreviousHelp();
						break;
					case 5://打开beginersguide
						BeginersGuide.iEventGuide=this.extsel[i].cs;
						XStat.gi().PopStat(1);
						break;
					}
				}
				return true;
			}
		}
		return true;
	}
}

ExtHelp.iWordSize;
ExtHelp.iShowDelay=0;
ExtHelp.iHead;
ExtHelp.iTall;
ExtHelp.iPrev;
ExtHelp.extbuf=null;

ExtHelp.eh;

ExtHelp.Open=function()
	{
		var i,j;
		if(ExtHelp.extbuf==null)
		{
			ExtHelp.iHead=0;
			ExtHelp.iTall=0;
			ExtHelp.iPrev=0;//向前指向
			ExtHelp.extbuf=new Array(8);//
			for(i=0;i<8;i++)
			{
				ExtHelp.extbuf[i]=new _EXTBUF();
			}
		}
	//	GmPlay.sop1("222222=");
		if(XStat.gi().iXStat!=XStat.GS_GAMEING && 
				XStat.gi().iXStat!=XStat.GS_MYGOODSFRAME)return;
	//	GmPlay.sop1("33333=");
		if(XFight.bFighting)return;
		if(BeginersGuide.gi().iGuideing!=-1)return;
	//	GmPlay.sop1("44444=");
		if(XStat.gi().bHaveStat(XStat.GS_EXTHELP))return;//当前正在提示中也要跳过
	//	GmPlay.sop1("5555=");
		if(ExtHelp.iShowDelay>0)
		{
			ExtHelp.iShowDelay--;
			return;
		}
//		GmPlay.sop("ss"+ExtHelp.iShowDelay);
		if(ExtHelp.iHead<ExtHelp.iTall)
		{
			j=ExtHelp.iHead%8;
			ExtHelp.iHead++;
	//		GmPlay.sop1("1111111111111111111="+j);
			ExtHelp.eh=XStat.gi().PushStat(XStat.GS_EXTHELP);
			_Init(ExtHelp.extbuf[j].detail,ExtHelp.extbuf[j].type1,ExtHelp.extbuf[j].cs1,ExtHelp.extbuf[j].s1,
					ExtHelp.extbuf[j].type2,ExtHelp.extbuf[j].cs2,ExtHelp.extbuf[j].s2,
					ExtHelp.extbuf[j].type3,ExtHelp.extbuf[j].cs3,ExtHelp.extbuf[j].s3);
			

//			GmPlay.sop1("22222222222");
			ExtHelp.iShowDelay=20;//两次出框之间有3秒延迟
		}
	}
	ExtHelp.PreviousHelp=function()
	{//ExtHelp.iPrev往前
		if(XStat.gi().iXStat!=XStat.GS_EXTHELP)return;
		if(ExtHelp.iPrev<=0 || ExtHelp.iPrev<=ExtHelp.iTall-6)return;
		else ExtHelp.iPrev--;
		
		var j=ExtHelp.iPrev%8;
		if(ExtHelp.extbuf[j].type1==0)
		{
			ExtHelp.extbuf[j].type1=4;
			//ExtHelp.extbuf[j].cs1
			ExtHelp.extbuf[j].s1="上一条";
		}
		_Init(ExtHelp.extbuf[j].detail,ExtHelp.extbuf[j].type1,ExtHelp.extbuf[j].cs1,ExtHelp.extbuf[j].s1,
				ExtHelp.extbuf[j].type2,ExtHelp.extbuf[j].cs2,ExtHelp.extbuf[j].s2,
				ExtHelp.extbuf[j].type3,ExtHelp.extbuf[j].cs3,ExtHelp.extbuf[j].s3);
////		var j;
//		if(ExtHelp.iHead<=0 || ExtHelp.iHead<=ExtHelp.iTall-8)return;
//		else ExtHelp.iHead--;
////		j=ExtHelp.iHead%8;
////		if(ExtHelp.extbuf[j].type1==0 && ExtHelp.iHead>0 && ExtHelp.iHead>ExtHelp.iTall-8)
////		{
////			ExtHelp.extbuf[j].type1=4;
////			ExtHelp.extbuf[j].cs1=0;
////			ExtHelp.extbuf[j].s1="上一条";
////		}
	}

	ExtHelp.Init=function( pls)
	{
		if(1==1)return;
		var i=ExtHelp.iTall%8;

		ExtHelp.extbuf[i].detail=pls.GetNextString();
		ExtHelp.extbuf[i].type1=pls.GetNextByte();
		ExtHelp.extbuf[i].cs1=pls.GetNextInt();
		ExtHelp.extbuf[i].s1=pls.GetNextString();
		ExtHelp.extbuf[i].type2=pls.GetNextByte();
		ExtHelp.extbuf[i].cs2=pls.GetNextInt();
		ExtHelp.extbuf[i].s2=pls.GetNextString();
		ExtHelp.extbuf[i].type3=pls.GetNextByte();
		ExtHelp.extbuf[i].cs3=pls.GetNextInt();
		ExtHelp.extbuf[i].s3=pls.GetNextString();
		
		if(ExtHelp.iTall>0)
		{
			var eb=ExtHelp.extbuf[(ExtHelp.iTall-1)%8];
			if(eb.detail==ExtHelp.extbuf[i].detail)
			{
				if(this.ExtHelp.iHead<ExtHelp.iTall)return;
			}
		}
		ExtHelp.iTall++;
		/*
		ExtHelp.eh=(ExtHelp) XStat.gi().PushStat(XStat.GS_EXTHELP);
		ExtHelp.eh.sDetail=pls.GetNextString();
		ExtHelp.eh.extsel[0].type=pls.GetNextByte();
		ExtHelp.eh.extsel[0].cs=pls.GetNextInt();;
		ExtHelp.eh.extsel[0].sel=pls.GetNextString();
		ExtHelp.eh.extsel[1].type=pls.GetNextByte();
		ExtHelp.eh.extsel[1].cs=pls.GetNextInt();;
		ExtHelp.eh.extsel[1].sel=pls.GetNextString();
		ExtHelp.eh.extsel[2].type=pls.GetNextByte();
		ExtHelp.eh.extsel[2].cs=pls.GetNextInt();;
		ExtHelp.eh.extsel[2].sel=pls.GetNextString();*/
	}
	ExtHelp.Initex=function( detail,
			 type0, cs0, sel0,
			 type1, cs1, sel1,
			 type2, cs2, sel2)
	{
		if(1==1)return;
//		GmPlay.sop("inited ---- "+detail);
		var i=ExtHelp.iTall%8;
		ExtHelp.extbuf[i].detail=detail;
		ExtHelp.extbuf[i].type1=type0;
		ExtHelp.extbuf[i].cs1=cs0;
		ExtHelp.extbuf[i].s1=sel0;
		ExtHelp.extbuf[i].type2=type1;
		ExtHelp.extbuf[i].cs2=cs1;
		ExtHelp.extbuf[i].s2=sel1;
		ExtHelp.extbuf[i].type3=type2;
		ExtHelp.extbuf[i].cs3=cs2;
		ExtHelp.extbuf[i].s3=sel2;
		ExtHelp.iTall++;
	}
	ExtHelp._Init=function( detail,
			 type0, cs0, sel0,
			 type1, cs1, sel1,
			 type2, cs2, sel2)
	{
		ExtHelp.eh.sDetail=detail;
		ExtHelp.eh.extsel[0].type=type0;
		ExtHelp.eh.extsel[0].cs=cs0;
		ExtHelp.eh.extsel[0].sel=sel0;
		ExtHelp.eh.extsel[1].type=type1;
		ExtHelp.eh.extsel[1].cs=cs1;
		ExtHelp.eh.extsel[1].sel=sel1;
		ExtHelp.eh.extsel[2].type=type2;
		ExtHelp.eh.extsel[2].cs=cs2;
		ExtHelp.eh.extsel[2].sel=sel2;
		ExtHelp.iWordSize=38;
	}