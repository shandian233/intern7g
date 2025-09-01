
import GmConfig from "../../../../config/GmConfig"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XStat from "../../../../engtst/mgm/XStat"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"

class MessageList
{/*
	public int iDelay;
	public String sMessage;*/
	constructor()
	{
		this.sMessage="";
	}
}
export default class EasyMessage{

	constructor()
	{
		var i;
		this.pm3f=M3DFast.xm3f;
		
		this.iMessageCount=0;
		this.messages=new Array(EasyMessage.MAXMESSAGE);//
		for(i=0;i<EasyMessage.MAXMESSAGE;i++)
		{
			this.messages[i]=new MessageList();
		}
		this.snap_atts=new Int32Array(6);//
		this.iShowDelay=-1;
		this.bDisable=false;
	}
	snapatt()
	{
		this.snap_atts[0]=GmMe.me.rbs.iMaxHp;
		this.snap_atts[1]=GmMe.me.rbs.iMaxMp;
		this.snap_atts[2]=GmMe.me.rbs.iAttack;
		this.snap_atts[3]=GmMe.me.rbs.iDefence;
		this.snap_atts[4]=GmMe.me.rbs.iSpirit;
		this.snap_atts[5]=GmMe.me.rbs.iSpeed;
//		GmPlay.sop("record attack="+GmMe.me.rbs.iAttack);
	}
	calcattchanged()
	{
//		GmPlay.sop("now attack="+GmMe.me.rbs.iAttack);
		this.snap_atts[0]=GmMe.me.rbs.iMaxHp-this.snap_atts[0];
		this.snap_atts[1]=GmMe.me.rbs.iMaxMp-this.snap_atts[1];
		this.snap_atts[2]=GmMe.me.rbs.iAttack-this.snap_atts[2];
		this.snap_atts[3]=GmMe.me.rbs.iDefence-this.snap_atts[3];
		this.snap_atts[4]=GmMe.me.rbs.iSpirit-this.snap_atts[4];
		this.snap_atts[5]=GmMe.me.rbs.iSpeed-this.snap_atts[5];
		this.iShowCount=0;
		for(var i=0;i<6;i++){
			if(this.snap_atts[i]!=0){
				this.iShowCount++;
				this.AddMessage(this.getdetail(i,this.snap_atts[i]));
			}
		}
//		if(this.iShowCount>0)this.iShowDelay=201;
	}
	addflag( d){
		if(d>0)return "+"+d;
		else return ""+d;
	}
	getdetail(p, d){
		switch(p){
			case 0:return "气血上限"+this.addflag(d);
			case 1:return "魔法上限"+this.addflag(d);
			case 2:return "攻击力"+this.addflag(d);
			case 3:return "防御力"+this.addflag(d);
			case 4:return "灵力"+this.addflag(d);
			case 5:return "速度"+this.addflag(d);
			default:return "null";
		}
	}
	drawattchanged()
	{
		if(this.iShowDelay<=0)return;
		var offy=GmConfig.SCRH/2-(this.iShowCount*80)/2;
		var j=0;
		for(var i=0;i<6;i++){
			if(this.snap_atts[i]!=0){
				this.pm3f.DrawTextEx(GmConfig.SCRW/2-2, offy+j*80, this.getdetail(i,this.snap_atts[i]), 0xff000000, 60, this.iShowDelay, 1, 1, 0, -2, 0);
				this.pm3f.DrawTextEx(GmConfig.SCRW/2+2, offy+j*80, this.getdetail(i,this.snap_atts[i]), 0xff000000, 60, this.iShowDelay, 1, 1, 0, -2, 0);
				this.pm3f.DrawTextEx(GmConfig.SCRW/2, offy+j*80-2, this.getdetail(i,this.snap_atts[i]), 0xff000000, 60, this.iShowDelay, 1, 1, 0, -2, 0);
				this.pm3f.DrawTextEx(GmConfig.SCRW/2, offy+j*80+2, this.getdetail(i,this.snap_atts[i]), 0xff000000, 60, this.iShowDelay, 1, 1, 0, -2, 0);
				this.pm3f.DrawTextEx(GmConfig.SCRW/2, offy+j*80, this.getdetail(i,this.snap_atts[i]), this.snap_atts[i]>0?0xff00ff00:0xffff0000, 60, this.iShowDelay>101?101:this.iShowDelay, 1, 1, 0, -2, 0);
				j++;
			}
		}
		this.iShowDelay-=5;
	}
	Clear()
	{
		this.iMessageCount=0;
	}
	AddMessage( msg)
	{
		var i;
		if(this.iMessageCount>=EasyMessage.MAXMESSAGE)this.iMessageCount=EasyMessage.MAXMESSAGE-1;
		for(i=this.iMessageCount;i>0;i--)
		{
			this.messages[i].sMessage=this.messages[i-1].sMessage;
			this.messages[i].iDelay=this.messages[i-1].iDelay;
		}
		this.messages[0].sMessage=msg;
		this.messages[0].iDelay=EasyMessage.MESSAGEDELAY;
		this.iMessageCount++;
	}

	Draw()
	{
		if(this.bDisable)
		{
			if(XStat.gi().iXStat!=XStat.GS_PROMPTACTIVITY)this.bDisable=false;
			return;
		}
		this.drawattchanged();
		var i;
		var m,n;

		var w,h;
		for(i=0;i<this.iMessageCount;i++)
		{
//			j=this.pm3f.GetTextWidth(this.messages[i].sMessage, 20);
//			m=(GmConfig.SCRW-j-4)/2;
//			n=GmConfig.SCRH-24*(i+1);
//			this.pm3f.FillRect_2D(m, n, m+j+4, n+24, 0x50000000);
//			this.pm3f.DrawRect_2D(m, n, m+j+4, n+24, 0xffffffff);
//			this.pm3f.DrawTextEx(m+2,n+2, this.messages[i].sMessage, 0xffffff00, 20, 101, 1, 1, 0, 0, 0);
//			this.messages[i].iDelay--;
			FormatString.gi().Format("#cffff00"+this.messages[i].sMessage, 800, 26);
			w=FormatString.gi().iW;
			h=32;
			m=(GmConfig.SCRW-w-4)/2;
			n=GmConfig.SCRH-h*(i+1)-1;
			EasyMessage.new_Text(m,n,w+4);
//			this.pm3f.FillRect_2D(m, n, m+w+4, n+h, 0x50000000);
//			this.pm3f.DrawRect_2D(m, n, m+w+4, n+h, 0xffffffff);
			FormatString.gi().Draw(m+2, n+3);
//			this.pm3f.DrawTextEx(m+2,n+2, this.messages[i].sMessage, 0xffffff00, 20, 101, 1, 1, 0, 0, 0);
			this.messages[i].iDelay--;
		}
		if(this.iMessageCount>0 && this.messages[this.iMessageCount-1].iDelay<=0)this.iMessageCount--;
	}
	ProcTouch( msg, x, y)
	{
		return false;
	}
}
EasyMessage.MAXMESSAGE=10;
EasyMessage.MESSAGEDELAY=100;

EasyMessage.easymsg=new EasyMessage();
EasyMessage.new_Text=function( x, y, w)
{
	GmPlay.xani_nui2.DrawAnimaEx(x, y, "可变长文字框",0,60,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
	GmPlay.xani_nui2.DrawAnimaEx(x+15, y, "可变长文字框",1,60,1.0*(w-30)/20,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
	GmPlay.xani_nui2.DrawAnimaEx(x+w-20, y, "可变长文字框",2,60,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
}