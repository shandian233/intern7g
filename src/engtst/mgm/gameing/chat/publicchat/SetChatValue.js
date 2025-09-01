import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XCheckBox from "../../../../../engine/control/XCheckBox"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
	
	export default class SetChatValue extends BaseClass{

	 constructor( a)
	{
		super();
         this._FCLIST=["当前频道","队伍频道","门派频道","帮派频道","世界频道","传闻频道","系统频道"];
         this._AUTO=["当前语音","队伍语音","门派语音","帮派语音","世界语音","传闻语音"];
         this._FAST=["当前语音","队伍语音","门派语音","帮派语音","世界语音","传闻语音"];


		this.iW=200*3+25*4;
		this.iH=570;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		var i;
		
		this.chk_fchannel=new Array(8);//
		this.chk_autoplay=new Array(8);//
		this.chk_fastvoice=new Array(8);//
		for(i=0;i<7;i++)
		{
			this.chk_fchannel[i]=new XCheckBox(GmPlay.xani_button);
			this.chk_fchannel[i].InitBox("复选框50_53");
			if((XRecordFast.iFilterChannel&(1<<i))==0)this.chk_fchannel[i].bTrue=false;
			else this.chk_fchannel[i].bTrue=true;
			this.chk_fchannel[i].sDetail=this._FCLIST[i];
		}
		for(i=0;i<6;i++)
		{
			this.chk_autoplay[i]=new XCheckBox(GmPlay.xani_button);
			this.chk_autoplay[i].InitBox("复选框50_53");
			if((XRecordFast.iAutoPlay&(1<<i))==0)this.chk_autoplay[i].bTrue=false;
			else this.chk_autoplay[i].bTrue=true;
			this.chk_autoplay[i].sDetail=this._AUTO[i];
			
			this.chk_fastvoice[i]=new XCheckBox(GmPlay.xani_button);
			this.chk_fastvoice[i].InitBox("复选框50_53");
			if((XRecordFast.iFastVoice&(1<<i))==0)this.chk_fastvoice[i].bTrue=false;
			else this.chk_fastvoice[i].bTrue=true;
			this.chk_fastvoice[i].sDetail=this._FAST[i];
        }
        

 	}

	Draw()
	{
		var i;
		var offx,offy,w,h;
		DrawMode.frame_type4("中等框a52_50", this.iX, this.iY, this.iW, this.iH, 52, 50);
		
		h=this.iH-50;
		w=200;
		offx=this.iX+25;
		offy=this.iY+25;
		DrawMode.frame_type4("聊天显示框暗20_20", offx,offy, 200, this.iH-50, 20, 20);
		DrawMode.frame_type4("单色内框a20_20", offx+20,offy+20, 200-40, 50, 20, 20);
		M3DFast.gi().DrawTextEx(offx+100, offy+20+25, "频道过滤", 0xff176b51, 30, 101, 1, 1, 0, -2, -2);
		for(i=0;i<7;i++)
		{
			this.chk_fchannel[i].Move(offx+20, offy+20+50+20+i*60, 50, 50);
			this.chk_fchannel[i].Draw();
		}
		
		offx+=225;
		DrawMode.frame_type4("聊天显示框暗20_20", offx,offy, 200, this.iH-50, 20, 20);
		DrawMode.frame_type4("单色内框a20_20", offx+20,offy+20, 200-40, 50, 20, 20);
		M3DFast.gi().DrawTextEx(offx+100, offy+20+25, "自动播放", 0xff176b51, 30, 101, 1, 1, 0, -2, -2);
		for(i=0;i<6;i++)
		{
			this.chk_autoplay[i].Move(offx+20, offy+20+50+20+i*60, 50, 50);
			this.chk_autoplay[i].Draw();
		}
		
		offx+=225;
		DrawMode.frame_type4("聊天显示框暗20_20", offx,offy, 200, this.iH-50, 20, 20);
		DrawMode.frame_type4("单色内框a20_20", offx+20,offy+20, 200-40, 50, 20, 20);
		M3DFast.gi().DrawTextEx(offx+100, offy+20+25, "快捷语音", 0xff176b51, 30, 101, 1, 1, 0, -2, -2);
		for(i=0;i<6;i++)
		{
			this.chk_fastvoice[i].Move(offx+20, offy+20+50+20+i*60, 50, 50);
			this.chk_fastvoice[i].Draw();
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<7;i++)
		{
			if(this.chk_fchannel[i].ProcTouch(msg, x, y))
			{
				XRecordFast.iFilterChannel=XRecordFast.iFilterChannel&(~(1<<i));
				if(this.chk_fchannel[i].bTrue)XRecordFast.iFilterChannel|=(1<<i);
			}
		}
		for(i=0;i<6;i++)
		{
			if(this.chk_autoplay[i].ProcTouch(msg, x, y))
			{
				XRecordFast.iAutoPlay=XRecordFast.iAutoPlay&(~(1<<i));
				if(this.chk_autoplay[i].bTrue)XRecordFast.iAutoPlay|=(1<<i);
			}
			if(this.chk_fastvoice[i].ProcTouch(msg, x, y))
			{
				XRecordFast.iFastVoice=XRecordFast.iFastVoice&(~(1<<i));
				if(this.chk_fastvoice[i].bTrue)XRecordFast.iFastVoice|=(1<<i);
			}
		}
		if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)XStat.gi().PopStat(1);
		return false;
	}
}
SetChatValue.Open=function()
{
    XStat.gi().PushStat(XStat.GS_SETCHATVALUE);
}