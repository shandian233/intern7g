import VisualBlock from "../../map/VisualBlock"
import SE_SELECT from "../../map/npcboomstruct/SE_SELECT"

import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"
import XButtonEx2 from "../../engine/control/XButtonEx2"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import GmPlay from "../../engtst/mgm/GmPlay"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import FormatString from "../../engtst/mgm/frame/format/FormatString"
import FrameMessage from "../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../engtst/mgm/gameing/me/GmMe"

class _DIALOGRECORD
{
    constructor()
    {

    }
/*	public String sName;
	public String sHead;
	public String sDetail;*/
}
class _NEWDIALOG1
{//新剧情模式
    constructor()
    {

    }
/*	public String sName;
	public int iNpcId;
	public AnimaAction aa_shot;
	public String sDetail;*/
}
class _NEWDIALOG2
{//新对话模式
    constructor()
    {

    }
/*	public String sName;
	public int iNpcId;
	public AnimaAction aa_shot;
	public String sDetail;
	public XButtonEx2 btn_sel;*/
}
export default class MapDialog {
	 constructor( m3f, vb)
	{
		this.xm3f=m3f;
		this.vbk=vb;
		this.bDialoging=false;
		
		this.iW=410;
		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

//		this.iX+=100;
		this.iY=GmConfig.SCRH/2-10;

		var i;
		this.drs=new Array(16);//
		for(i=0;i<16;i++)this.drs[i]=new _DIALOGRECORD();

		this.iDRCount=0;
		this.aa_head=new AnimaAction();

		this.nd1=new _NEWDIALOG1();
		this.nd2=new _NEWDIALOG2();
		this.nd2.btn_sel=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.nd2.btn_sel[i]=null;
		}
		
		MapDialog.md=this;
		this.aa_f1=null;
		this.aa_f2=null;
		this.res_shadow=-1;
	}
	 btstring( b, off, len)
	{
		var ret="";
		for(var i=0;i<len;i++)
		{
			ret+=b[off+i];
		}

		return ret;
	}
	InitDialog( ps, npcname)
	{
		GmPlay.sop("head==="+ps.sHead);
		var s;
		this.iW=GmConfig.SCRW/2;
//		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		var i,j,k;
		
		this.pSelect=ps;
		this.iPoint=-1;
		this.bDown=false;

//		this.iX+=100;
		this.iY=GmConfig.SCRH/2-10;
		
		///判断类型
		//@:n村长@:h村长@:d大家好
/*		var bs=new Array();
		for(var i=0;i<ps.sQuestion.length;i++)
		{
			bs[i]=ps.sQuestion.
		}*/
		var bs=ps.sQuestion.split("");
//		var bs=ps.sQuestion.getBytes();
		if(bs[0]=='@' && bs[1]=='0')
		{//新剧情模式@0n001t主句
			this.nd1.aa_shot=null;
			this.bDialoging=true;
			this.iDialogType=4;
			this.bDown=false;
			for(i=0;i<bs.length;i++)
			{
				if(bs[i]=='n')
				{//固定后3个字符
					this.nd1.iNpcId=parseInt(""+bs[i+1]+bs[i+2]+bs[i+3]);//npcid
					//取出n080->name，shot
					if(this.nd1.iNpcId==501)
					{//自己未来
						this.nd1.sName=GmMe.me.sName+"(未来)";
						s=GmMe.sRace(GmMe.me.iRace)+"_"+GmMe.sSex(GmMe.me.iSex)+"未来";
						this.nd1.aa_shot=GmPlay.xani_shot[0].InitAnimaWithName(s, null);
					}
					else if(this.nd1.iNpcId==500)
					{//主角
						this.nd1.sName=GmMe.me.sName;
						s=GmMe.sRace(GmMe.me.iRace)+"_"+GmMe.sSex(GmMe.me.iSex);
						this.nd1.aa_shot=GmPlay.xani_shot[0].InitAnimaWithName(s, null);
					}
					else
					{//npc
						this.nd1.sName=GmPlay.de_npc.strValue(this.nd1.iNpcId, 0, 1);
						if(npcname!=null && npcname.length>0)this.nd1.sName=npcname;
						j=GmPlay.de_npc.intValue(this.nd1.iNpcId, 0, 9);
						if(j>=0 && j<=1)this.nd1.aa_shot=GmPlay.xani_shot[j].InitAnimaWithName(GmPlay.de_npc.strValue(this.nd1.iNpcId, 0, 10), null);
						GmPlay.sop(this.nd1.iNpcId+this.nd1.sName+j);
					}
					if(ps.sHead.length>0)this.nd1.sName=ps.sHead;
//					s=(char(bs[i+1])+char(bs[i+2])+char(bs[i+3]));
					i+=3;
				}
				if(bs[i]=='t')
				{//对话内容//取出t......->detail
					this.nd1.sDetail=this.btstring(bs,i+1,bs.length-i-1);
				}
			}
			return;
		}
		if(bs[0]=='@' && bs[1]=='1')
		{//新对话框模式，只有一句话
			//@1n080t一见刘郎动心弦，只羡鸳鸯不羡仙
			//@1n082t一心惟愿踏青云，平步玉宇与琼林
			//@1n081t少侠武术修为深厚，却长时间原地徘徊无法突破提升？建议你以退为进，厚积薄发！
			if(this.pSelect.iCount>0)
			{
				for(i=0;i<this.pSelect.iCount;i++)
				{
					if(this.nd2.btn_sel[i]==null)
					{
						this.nd2.btn_sel[i]=new XButtonEx2(GmPlay.xani_nui4);
						this.nd2.btn_sel[i].InitButton("操作选项按钮");//272,54
					}
					this.nd2.btn_sel[i].sName=this.pSelect.sAnswers[i];
					this.nd2.btn_sel[i].Move(GmConfig.SCRW-40-30-272, GmConfig.SCRH-160-20-((this.pSelect.iCount-1)*20+2*20+this.pSelect.iCount*54)+20+i*(54+20), 272, 54);
				}
			}
			this.nd2.aa_shot=null;
			this.bDialoging=true;
			this.iDialogType=3;
			for(i=0;i<bs.length;i++)
			{
				if(bs[i]=='n')
				{//固定后3个字符
					this.nd2.iNpcId=parseInt(""+bs[i+1]+bs[i+2]+bs[i+3]);//npcid
					//取出n080->name，shot
					if(this.nd2.iNpcId==500)
					{//主角
						this.nd2.sName=GmMe.me.sName;
						s=GmMe.sRace(GmMe.me.iRace)+"_"+GmMe.sSex(GmMe.me.iSex);
						this.nd2.aa_shot=GmPlay.xani_shot[0].InitAnimaWithName(s, null);
					}
					else
					{//npc
						this.nd2.sName=GmPlay.de_npc.strValue(this.nd2.iNpcId, 0, 1);
						if(npcname!=null && npcname.length>0)this.nd2.sName=npcname;
						j=GmPlay.de_npc.intValue(this.nd2.iNpcId, 0, 9);
						if(j>=0 && j<=1)this.nd2.aa_shot=GmPlay.xani_shot[j].InitAnimaWithName(GmPlay.de_npc.strValue(this.nd2.iNpcId, 0, 10), null);
						GmPlay.sop(this.nd2.iNpcId+this.nd2.sName+j);
					}
					if(ps.sHead.length>0)this.nd2.sName=ps.sHead;
//					s=(char(bs[i+1])+char(bs[i+2])+char(bs[i+3]));
					i+=3;
				}
				if(bs[i]=='t')
				{//对话内容//取出t......->detail
					this.nd2.sDetail=this.btstring(bs,i+1,bs.length-i-1);
				}
			}
			return;
		}
		if(bs[0]=='@' && bs[1]=='2')
		{//framemessage
			FrameMessage.fm.Open(this.btstring(bs,2,bs.length-2));
			return;
		}
		if(bs[0]=='@' && bs[1]==':')
		{//剧情模式
			if(this.bDialoging && this.iDialogType==1)
			{
			}
			else
			{
				this.iDRCount=0;
				this.iH=60;
			}
			
			this.drs[this.iDRCount].sName="";
			this.drs[this.iDRCount].sHead="";
			this.drs[this.iDRCount].sDetail="";
			
			for(i=0;i<bs.length;i++)
			{
				if(bs[i]=='@' && bs[i+1]==':')
				{//遇到一个节点
					j=i+3;
					k=0;
					while(j+k<bs.length)
					{
						if(bs[j+k]=='@' && bs[j+k+1]==':')break;
						k++;
					}
					GmPlay.sop1("len="+bs.length+",j="+j+",k="+k);
					if(bs[i+2]=='n')
					{//名字
						this.drs[this.iDRCount].sName=this.btstring(bs,j,k);
						GmPlay.sop1("name="+this.drs[this.iDRCount].sName);
					}
					else if(bs[i+2]=='h')
					{//头像动画
						this.drs[this.iDRCount].sHead=this.btstring(bs,j,k);
						GmPlay.sop1("head="+this.drs[this.iDRCount].sHead);
					}
					else if(bs[i+2]=='d')
					{//对话详细内容
						this.drs[this.iDRCount].sDetail=this.btstring(bs,j,k);
						GmPlay.sop1("detail="+this.drs[this.iDRCount].sDetail);
						this.tmwait=200+this.drs[this.iDRCount].sDetail.length*50;
						this.tmwait=50;
					}
				}
			}
			this.bDialoging=true;
			this.iDialogType=1;
			this.iDRCount++;
//			if(this.tmwait<1000)this.tmwait=1000;
//			else if(this.tmwait>3000)this.tmwait=3000;
			this.tm1=XDefine.get_ms();
			return;
		}
		if(bs[0]=='!' && bs[1]==':')
		{//新对话模式,有头像n，名字h，内容d
//			if(this.bDialoging && this.iDialogType==2)
//			{
//			}
//			else
//			{
//				this.iDRCount=0;
//				this.iH=60;
//			}
			
			this.drs[0].sName="";
			this.drs[0].sHead="";
			this.drs[0].sDetail="";

			for(i=0;i<bs.length;i++)
			{
				if(bs[i]=='!' && bs[i+1]==':')
				{//遇到一个节点
					j=i+3;
					k=0;
					while(j+k<bs.length)
					{
						if(bs[j+k]=='!' && bs[j+k+1]==':')break;
						k++;
					}
					GmPlay.sop1("len="+bs.length+",j="+j+",k="+k);
					if(bs[i+2]=='n')
					{//名字
						this.drs[0].sName=this.btstring(bs,j,k);
						GmPlay.sop1("name="+this.drs[0].sName);
					}
					else if(bs[i+2]=='h')
					{//头像动画
						this.drs[0].sHead=this.btstring(bs,j,k);
						GmPlay.sop1("head="+this.drs[0].sHead);
					}
					else if(bs[i+2]=='d')
					{//对话详细内容
						this.drs[0].sDetail=this.btstring(bs,j,k);
						GmPlay.sop1("detail="+this.drs[0].sDetail);
						//this.tmwait=200+this.drs[0].sDetail.length*50;
					}
				}
			}
			this.bDialoging=true;
			this.iDialogType=2;
			//this.iDRCount++;
//			this.tm1=XDefine.get_ms();
			this.iX=(GmConfig.SCRW-this.iW)/2;
			this.iY=(GmConfig.SCRH-this.iH)/2;
			return;
		}

		this.iW=GmConfig.SCRW/2;
		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

		this.bDialoging=true;
		this.iDialogType=0;
	}

	Draw_0()
	{
		this.fRate=1.0*GmConfig.SCRH/720;
		this.iTextSize= parseInt(32*this.fRate);
		var i;
		this.iW=GmConfig.SCRW/2;
		if(this.iW>750)this.iW=750;
		this.iH=200;
		
		FormatString.gi().FormatEx(this.pSelect.sQuestion, this.iW-20, this.iTextSize, 1, 0xff000000, this.iTextSize*7/6);
//		FormatString.gi().FormatEx("#c80ff80"+this.pSelect.sQuestion, this.iW-20, this.iTextSize, 1, 0xff000000, this.iTextSize*7/6);
		//FormatString.gi().Format(this.pSelect.sQuestion, this.iW-20, this.iTextSize);
		this.iH=FormatString.gi().iH+20+this.pSelect.iCount*(this.iTextSize*7/6)+this.iTextSize/2;
		if(this.iH<GmConfig.SCRH/4)this.iH=GmConfig.SCRH/4;
		this.iY=GmConfig.SCRH/2;
		if(this.iY+this.iH+20>GmConfig.SCRH)this.iY=GmConfig.SCRH-this.iH-20;
//		this.iY=(gi().SCRH-this.iH)/2;
		
//		DrawMode.Frame1_BR(this.iX, this.iY, this.iW,this.iH);
//		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, this.iH);
		DrawMode.ui4_FrameUp(this.iX, this.iY-40, this.iW);
		DrawMode.ui4_FrameDown(this.iX, this.iY, this.iW, this.iH);
		//this.xm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xc0000000);
		FormatString.gi().Draw(this.iX+15, this.iY+10);
		this.iOffX=this.iX+15;
		this.iOffY=this.iY+10+FormatString.gi().iH+this.iTextSize/2;
		for(i=0;i<this.pSelect.iCount;i++)
		{
			if(this.iPoint==i)
			{
				GmPlay.xani_ui4.DrawAnimaEx(this.iOffX, this.iOffY+i*this.iTextSize*7/6+this.iTextSize/2, "对话框条", 0,101,1.0*(this.iW-30)/250,this.fRate,0,0,0);
				//this.xm3f.FillRect_2D(this.iOffX, this.iOffY+i*this.iTextSize*7/6-this.iTextSize/12, this.iOffX+this.iW-30, this.iOffY+(i+1)*this.iTextSize*7/6-this.iTextSize/12, 0x80a050a0);
//				GmPlay.xani_ui.DrawAnimaEx(this.iX+3, this.iOffY+i*this.iTextSize*7/6, "统一红黑框",9, 101, 1.0f*(this.iW-10)/10, 1, 0,0, 0);
//				this.xm3f.FillRect_2D(this.iOffX, this.iOffY+i*this.iTextSize, this.iOffX+this.iW-20, this.iOffY+i*this.iTextSize+30, 0xff0000ff);
			}
			//0xff99d9ea,0xffff7f27
//			this.xm3f.DrawText_2(this.iOffX, this.iOffY+i*this.iTextSize*7/6, this.pSelect.sAnswers[i], 0xffb5e61d, this.iTextSize, 101, 1, 1, 0, 0, 0, 1, 0xff000000);
			this.xm3f.DrawTextEx(this.iOffX, this.iOffY+i*this.iTextSize*7/6+this.iTextSize/2, this.pSelect.sAnswers[i], 0xfff8f078, this.iTextSize, 101, 1, 1, 0, 0, -2);//, 1, 0xff000000);
	//		this.xm3f.DrawTextEx(this.iOffX, this.iOffY+i*this.iTextSize*7/6, this.pSelect.sAnswers[i], 0xffff0000, this.iTextSize, 101, 1, 1, 0, 0, 0);
//			this.xm3f.DrawText(this.iOffX, this.iOffY+i*this.iTextSize, this.pSelect.sAnswers[i], 0xffff0000);
		}
	}

	 DrawChatFrame( faceto, x, y, w, h)
	{
		if(faceto==1)
		{
			if(this.aa_f1==null)this.aa_f1=GmPlay.xani_nui2.InitAnimaWithName("左侧框", null);
			M3DFast.gi().FillRect_2D(x+2, y-h/2+2, x+w-2, y+h/2-2, 0xff477f6f);
			this.aa_f1.iFrame=0;this.aa_f1.Draw(x, y-h/2);
			this.aa_f1.iFrame=1;this.aa_f1.Draw(x+w, y-h/2);
			this.aa_f1.iFrame=2;this.aa_f1.Draw(x+w, y+h/2);
			this.aa_f1.iFrame=3;this.aa_f1.Draw(x, y+h/2);
			
			this.aa_f1.iFrame=4;this.aa_f1.DrawEx(x+10, y-h/2, 101, 1.0*(w-20)/10, 1, 0, 0, 0);
			this.aa_f1.iFrame=7;this.aa_f1.DrawEx(x+10, y+h/2, 101, 1.0*(w-20)/10, 1, 0, 0, 0);
			
			this.aa_f1.iFrame=5;this.aa_f1.DrawEx(x, y-h/2+10, 101, 1,1.0*(h-20)/10,  0, 0, 0);
			this.aa_f1.iFrame=6;this.aa_f1.DrawEx(x+w, y-h/2+10, 101, 1,1.0*(h-20)/10,  0, 0, 0);
			
			this.aa_f1.iFrame=8;this.aa_f1.Draw(x, y);
		}
		else if(faceto==2)
		{
			if(this.aa_f2==null)this.aa_f2=GmPlay.xani_nui2.InitAnimaWithName("右侧框", null);
			M3DFast.gi().FillRect_2D(x+2, y-h/2+2, x+w-2, y+h/2-2, 0xff7a774b);
			this.aa_f2.iFrame=0;this.aa_f2.Draw(x, y-h/2);
			this.aa_f2.iFrame=1;this.aa_f2.Draw(x+w, y-h/2);
			this.aa_f2.iFrame=2;this.aa_f2.Draw(x+w, y+h/2);
			this.aa_f2.iFrame=3;this.aa_f2.Draw(x, y+h/2);
			
			this.aa_f2.iFrame=4;this.aa_f2.DrawEx(x+10, y-h/2, 101, 1.0*(w-20)/10, 1, 0, 0, 0);
			this.aa_f2.iFrame=7;this.aa_f2.DrawEx(x+10, y+h/2, 101, 1.0*(w-20)/10, 1, 0, 0, 0);
			
			this.aa_f2.iFrame=5;this.aa_f2.DrawEx(x, y-h/2+10, 101, 1,1.0*(h-20)/10,  0, 0, 0);
			this.aa_f2.iFrame=6;this.aa_f2.DrawEx(x+w, y-h/2+10, 101, 1,1.0*(h-20)/10,  0, 0, 0);
			
			this.aa_f2.iFrame=8;this.aa_f2.Draw(x+w, y);
		}
	}
	 DrawSpeek( offy, last, head, name, detail)
	{//新手剧情，微信聊天模式
		var dww=650;
		var hx,hy;
		var wx,wy;
		var iWordSize=30;
		var h=0;//至少
		FormatString.gi().FormatEx(detail, dww-20, iWordSize, 1, 0xff000000, iWordSize+2);
		if(h<FormatString.gi().iH+20+20)h=FormatString.gi().iH+20+20;
//		if(h<80)h=80;
		if(FormatString.gi().iW+20<dww)dww=FormatString.gi().iW+20;
		
		if(name=="我")
		{//显示在右方
			GmPlay.xani_head.InitAnimaWithName("新头像"+(GmMe.me.iRace*2+GmMe.me.iSex),this.aa_head);
			
			hx=this.iX+this.iW-80-20;
			hy=this.iY+offy+h/2-40;
//			M3DFast.gi().FillRect_2D(hx,hy,hx+60,hy+60, 0xff00ff00);
			this.aa_head.Draw(hx-3, hy);
			
			wx=this.iX+this.iW-20-80-20-dww;
			wy=this.iY+offy+h/2-FormatString.gi().iH/2-10;
			this.DrawChatFrame(2,wx,this.iY+offy+h/2,dww,FormatString.gi().iH+20);
//			M3DFast.gi().FillRect_2D(wx,wy,wx+dww,wy+FormatString.gi().iH+20, 0x80b0f050);
//			M3DFast.gi().DrawRect_2D(wx,wy,wx+400,wy+FormatString.gi().iH+20, 0xff00ff00);
			FormatString.gi().Draw(wx+10, wy+10);
			
			if(last)
			{
				this.tm2=XDefine.get_ms()-this.tm1;//已过去的时间
//				if(this.tm2>this.tmwait)this.tm2=this.tmwait;
				if(this.tm2>this.tmwait)return h;
				if(this.tm2<this.tmwait/2)
				{
					GmPlay.xani_head.DrawAnima(wx-50, hy+40, "进度红", 0);
					GmPlay.xani_head.DrawAnimaEx(wx-50, hy+40, "进度绿", 0, 101, 1, 1, (180-this.tm2*360/this.tmwait), wx-50, hy+40);
					GmPlay.xani_head.DrawAnimaEx(wx-50, hy+40, "进度红", 0, 101, 1, 1, 180, wx-50, hy+40);
				}
				else
				{
					GmPlay.xani_head.DrawAnimaEx(wx-50, hy+40, "进度红", 0, 101, 1, 1, 180, wx-50, hy+40);
					GmPlay.xani_head.DrawAnima(wx-50, hy+40, "进度绿", 0);
					GmPlay.xani_head.DrawAnimaEx(wx-50, hy+40, "进度绿", 0, 101, 1, 1, (360+180-this.tm2*360/this.tmwait), wx-50, hy+40);
				}
			}
		}
		else
		{
			if(name=="未来")GmPlay.xani_head.InitAnimaWithName("新头像"+(GmMe.me.iRace*2+GmMe.me.iSex),this.aa_head);
			else GmPlay.xani_head.InitAnimaWithName(head,this.aa_head);
			hx=this.iX+20;
			hy=this.iY+offy+h/2-40;
//			M3DFast.gi().FillRect_2D(hx,hy,hx+60,hy+60, 0xff00ff00);
			this.aa_head.Draw(hx+3, hy);
			
			wx=this.iX+20+80+20;
			wy=this.iY+offy+h/2-FormatString.gi().iH/2-10;
			
			this.DrawChatFrame(1,wx,this.iY+offy+h/2,dww,FormatString.gi().iH+20);
			//M3DFast.gi().FillRect_2D(wx,wy,wx+dww,wy+FormatString.gi().iH+20, 0x8050f0b0);
//			M3DFast.gi().DrawRect_2D(wx,wy,wx+400,wy+FormatString.gi().iH+20, 0xff00ff00);
			FormatString.gi().Draw(wx+10, wy+10);
			
			if(last)
			{
				this.tm2=XDefine.get_ms()-this.tm1;//已过去的时间
//				if(this.tm2>this.tmwait)this.tm2=this.tmwait;
				if(this.tm2>this.tmwait)return h;
				if(this.tm2<this.tmwait/2)
				{
					GmPlay.xani_head.DrawAnima(wx+dww+50, hy+40, "进度红", 0);
					GmPlay.xani_head.DrawAnimaEx(wx+dww+50, hy+40, "进度绿", 0, 101, 1, 1, (180-this.tm2*360/this.tmwait), wx+dww+50, hy+40);
					GmPlay.xani_head.DrawAnimaEx(wx+dww+50, hy+40, "进度红", 0, 101, 1, 1, 180, wx+dww+50, hy+40);
				}
				else
				{
					GmPlay.xani_head.DrawAnimaEx(wx+dww+50, hy+40, "进度红", 0, 101, 1, 1, 180, wx+dww+50, hy+40);
					GmPlay.xani_head.DrawAnima(wx+dww+50, hy+40, "进度绿", 0);
					GmPlay.xani_head.DrawAnimaEx(wx+dww+50, hy+40, "进度绿", 0, 101, 1, 1, (360+180-this.tm2*360/this.tmwait), wx+dww+50, hy+40);
				}
			}
			//tm/this.tmwait
		}
		return h;
	}
	 Draw_1()
	{//特殊
		var i,j;
		var offy;
		
		this.iW=1000;
		var hh;
		
		if(this.iH>300)
		{
			j=this.iH-300;
			hh=300;
		}
		else
		{
			j=0;
			hh=this.iH;
		}
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=GmConfig.SCRH-hh-10;
//		DrawMode.ui3_DefineFrame(this.iX, this.iY, this.iW, hh);
		
		M3DFast.gi().SetViewClip(this.iX, this.iY, this.iX+this.iW, this.iY+hh);
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, hh);
		DrawMode.new_framein(this.iX+15, this.iY+15, this.iW-30, hh-30);
		M3DFast.gi().NoClip();
		M3DFast.gi().SetViewClip(this.iX+20, this.iY+20, this.iX+this.iW-20, this.iY+hh-20);
		
		offy=0;
		for(i=0;i<this.iDRCount;i++)
		{
			offy+=this.DrawSpeek(offy+20-j,i==this.iDRCount-1?true:false,this.drs[i].sHead,this.drs[i].sName,this.drs[i].sDetail);
		}
		if(this.iH<offy+40-20)this.iH+=20;
		else this.iH=offy+40;
//		GmPlay.sop("this.iH="+this.iH);
		
		M3DFast.gi().NoClip();
	}
	Draw_2()
	{
		this.fRate=1.0*GmConfig.SCRH/720;
		this.iTextSize= parseInt(32*this.fRate);
		var i;
		this.iW=GmConfig.SCRW/2;
		if(this.iW>750)this.iW=750;
		this.iH=200;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		
		FormatString.gi().FormatEx(this.drs[0].sDetail, this.iW-20, this.iTextSize, 1, 0xff000000, this.iTextSize*7/6);
		this.iH=FormatString.gi().iH+20+this.pSelect.iCount*(this.iTextSize*7/6)+this.iTextSize/2;
		if(this.iH<GmConfig.SCRH/4)this.iH=GmConfig.SCRH/4;
		this.iY=GmConfig.SCRH/2;
		GmPlay.sop(""+this.iY);
		if(this.iY+this.iH+20>GmConfig.SCRH)this.iY=GmConfig.SCRH-this.iH-20;

		DrawMode.ui4_FrameUp(this.iX, this.iY-40, this.iW);
		DrawMode.ui4_FrameDown(this.iX, this.iY, this.iW, this.iH);
//		this.xm3f.FillRect_2D(this.iX, this.iY-40, this.iX+this.iW, this.iY, 0xc0ff0000);//上框
//		this.xm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xc0000000);//下框
		if(this.drs[0].sHead=="我")
		{//显示在右方//头像,名字
			GmPlay.xani_head.InitAnimaWithName("新头像"+(GmMe.me.iRace*2+GmMe.me.iSex),this.aa_head);
			this.aa_head.Draw(this.iX+this.iW-80-30, this.iY-80);
			this.xm3f.DrawTextEx(this.iX+this.iW-60-30-10, this.iY-20, GmMe.me.sName, 0xfff8f078, 32, 101, 1, 1, 0, -3, -2);
		}
		else
		{
			GmPlay.xani_head.InitAnimaWithName(this.drs[0].sHead,this.aa_head);
			this.aa_head.Draw(this.iX+30, this.iY-80);
			this.xm3f.DrawTextEx(this.iX+30+60+10, this.iY-20, this.drs[0].sName, 0xfff8f078, 32, 101, 1, 1, 0, 0, -2);
		}

		FormatString.gi().Draw(this.iX+15, this.iY+10);
		this.iOffX=this.iX+15;
		this.iOffY=this.iY+10+FormatString.gi().iH+this.iTextSize/2;
		for(i=0;i<this.pSelect.iCount;i++)
		{
			if(this.iPoint==i)
			{
				GmPlay.xani_ui4.DrawAnimaEx(this.iOffX, this.iOffY+i*this.iTextSize*7/6+this.iTextSize/2, "对话框条", 0,101,1.0*(this.iW-30)/250,this.fRate,0,0,0);
				//this.xm3f.FillRect_2D(this.iOffX, this.iOffY+i*this.iTextSize*7/6-this.iTextSize/12, this.iOffX+this.iW-30, this.iOffY+(i+1)*this.iTextSize*7/6-this.iTextSize/12, 0x80a050a0);
//				GmPlay.xani_ui.DrawAnimaEx(this.iX+3, this.iOffY+i*this.iTextSize*7/6, "统一红黑框",9, 101, 1.0f*(this.iW-10)/10, 1, 0,0, 0);
//				this.xm3f.FillRect_2D(this.iOffX, this.iOffY+i*this.iTextSize, this.iOffX+this.iW-20, this.iOffY+i*this.iTextSize+30, 0xff0000ff);
			}
			this.xm3f.DrawTextEx(this.iOffX, this.iOffY+i*this.iTextSize*7/6+this.iTextSize/2, this.pSelect.sAnswers[i], 0xfff8f078, this.iTextSize, 101, 1, 1, 0, 0, -2);//, 1, 0xff000000);
		}
	}

	DrawBack()
	{//					this.nd2.btn_sel[i].Move(GmConfig.SCRW-40-30-272, GmConfig.SCRH-160-20-((this.pSelect.iCount-1)*20+2*20+this.pSelect.iCount*54)+20+i*(54+20), 272, 54);
		if(this.pSelect.iCount<=0)return;
		this.iFx=GmConfig.SCRW-40-30-272-30;
		this.iFy=GmConfig.SCRH-160-20-((this.pSelect.iCount-1)*20+2*20+this.pSelect.iCount*54);
		this.iFw=30+272+30;
		this.iFh=(this.pSelect.iCount-1)*20+2*20+this.pSelect.iCount*54;
		var iPx=this.iFx+this.iFw/2;
		var iPy=this.iFy+this.iFh;
		if(this.aa_frame==null)this.aa_frame=GmPlay.xani_nui3.InitAnimaWithName("键盘框", null);
		this.aa_frame.iFrame=0;this.aa_frame.Draw(this.iFx, this.iFy);//左上
		this.aa_frame.iFrame=1;this.aa_frame.DrawEx(this.iFx+10, this.iFy, 101, 1.0*(this.iFw-20)/20, 1, 0, 0, 0);//上
		this.aa_frame.iFrame=2;this.aa_frame.Draw(this.iFx+this.iFw, this.iFy);//右上
		this.aa_frame.iFrame=3;this.aa_frame.DrawEx(this.iFx+this.iFw, this.iFy+10, 101, 1,1.0*(this.iFh-20)/20, 0, 0, 0);//右
		this.aa_frame.iFrame=4;this.aa_frame.Draw(this.iFx+this.iFw, this.iFy+this.iFh);//右下
		this.aa_frame.iFrame=5;this.aa_frame.DrawEx(this.iFx+10, this.iFy+this.iFh, 101, 1.0*(this.iFw-20)/20, 1, 0, 0, 0);//下
		this.aa_frame.iFrame=6;this.aa_frame.Draw(this.iFx, this.iFy+this.iFh);//左下
		this.aa_frame.iFrame=7;this.aa_frame.DrawEx(this.iFx, this.iFy+10, 101, 1,1.0*(this.iFh-20)/20, 0, 0, 0);//左
		this.aa_frame.iFrame=8;this.aa_frame.DrawEx(this.iFx+10, this.iFy+10, 101, 1.0*(this.iFw-20)/20,1.0*(this.iFh-20)/20, 0, 0, 0);//中
		this.aa_frame.iFrame=9;this.aa_frame.Draw(iPx, iPy);//箭头
	}
	
	Draw_3()
	{
		DrawMode.new_framewatch(40,GmConfig.SCRH-160,GmConfig.SCRW-80,150);
		
		GmPlay.xani_nui4.DrawAnima(220, GmConfig.SCRH-10-37, "形象台",0);
		M3DFast.gi().DrawTextEx(220, GmConfig.SCRH-10-15, this.nd2.sName, 0xff003e57, 26, 101, 1, 1, 0, -2, -2);
		//0xffc8f3f3
		GmPlay.xani_nui4.DrawAnima(220, GmConfig.SCRH-10-37, "形象背光",0);
		if(this.nd2.aa_shot==null)
		{
			if(this.res_shadow<0)this.res_shadow=M3DFast.gi().LoadFromFile("bk/sss.xxx",-1,false);
			M3DFast.gi().DrawImageEx(0, 220-95, GmConfig.SCRH-10-37-251, this.res_shadow, 2, 0, 183, 251, 101, 1, 1, 0, 0, 0);
		}
		else this.nd2.aa_shot.Draw(220, GmConfig.SCRH-10-37);
		
		FormatString.gi().FormatEx("#cc8f3f3"+this.nd2.sDetail, 800, 28, 0, 0, 32);
		//总高度150
		FormatString.gi().Draw(400, GmConfig.SCRH-160+(150-FormatString.gi().iH)/2);
		
		var i;
		this.DrawBack();
		if(this.pSelect.iCount>0)
		{
			for(i=0;i<this.pSelect.iCount;i++)
			{
				this.nd2.btn_sel[i].Move(GmConfig.SCRW-40-30-272, GmConfig.SCRH-160-20-((this.pSelect.iCount-1)*20+2*20+this.pSelect.iCount*54)+20+i*(54+20), 272, 54);
				this.nd2.btn_sel[i].Draw();
	//			this.nd2.btn_sel[i].Move(GmConfig.SCRW-40-30-272-30, GmConfig.SCRH-160-20-((this.pSelect.iCount-1+2)*30+this.pSelect.iCount*54)+30+i*(54+30), 272, 54);
			}
		}
	}
	Draw_4()
	{//隐藏UI
		//画上下阴影
		//GmPlay.xani_nui4.DrawAnimaEx(0, 0, "阴影",1,101,1.0f*GmConfig.SCRW/20,1,0,0,0);
//		GmPlay.xani_nui4.DrawAnimaEx(GmConfig.SCRW, 0, "阴影",0,101,1.0f*GmConfig.SCRW/20,1,180,GmConfig.SCRW,0);
//		GmPlay.xani_nui4.DrawAnimaEx(GmConfig.SCRW-1,500, "阴影",0,101,1.0f*GmConfig.SCRW/20,1,180,GmConfig.SCRW-1,500);
		GmPlay.xani_nui4.DrawAnimaEx(0, 0, "阴影",1,101,1.0*GmConfig.SCRW/20,1,0,0,0);
		GmPlay.xani_nui4.DrawAnimaEx(0, GmConfig.SCRH, "阴影",0,101,1.0*GmConfig.SCRW/20,1,0,0,0);
		
		M3DFast.gi().DrawTextEx(GmConfig.SCRW-50, 50, "点击屏幕继续 》", 0xff6eacc8, 30, 101, 1, 1, 0, -3, -3);
		
		if(this.nd1.iNpcId==500)
		{//主角
			GmPlay.xani_nui4.DrawAnima(GmConfig.SCRW-220, GmConfig.SCRH-10-37, "名字框",0);
			M3DFast.gi().DrawTextEx(GmConfig.SCRW-220, GmConfig.SCRH-10-15, this.nd1.sName, 0xff6eacc8, 26, 101, 1, 1, 0, -2, -2);
			GmPlay.xani_nui4.DrawAnima(GmConfig.SCRW-220, GmConfig.SCRH-10-37, "形象背光",0);
			if(this.nd1.aa_shot!=null)this.nd1.aa_shot.Draw(GmConfig.SCRW-220, GmConfig.SCRH-10-37);
			
			FormatString.gi().FormatEx("#cc8f3f3"+this.nd1.sDetail, 800, 28, 0, 0, 32);
			//总高度150
			FormatString.gi().Draw(GmConfig.SCRW-400-FormatString.gi().iW, GmConfig.SCRH-160+(150-FormatString.gi().iH)/2);
			return;
		}
		GmPlay.xani_nui4.DrawAnima(220, GmConfig.SCRH-10-37, "名字框",0);
		M3DFast.gi().DrawTextEx(220, GmConfig.SCRH-10-15, this.nd1.sName, 0xff6eacc8, 26, 101, 1, 1, 0, -2, -2);
		GmPlay.xani_nui4.DrawAnima(220, GmConfig.SCRH-10-37, "形象背光",0);
		
		if(this.nd1.aa_shot==null)
		{
			if(this.res_shadow<0)this.res_shadow=M3DFast.gi().LoadFromFile("bk/sss.xxx",-1,false);
			M3DFast.gi().DrawImageEx(0, 220-95, GmConfig.SCRH-10-37-251, this.res_shadow, 2, 0, 183, 251, 101, 1, 1, 0, 0, 0);
		}
		else this.nd1.aa_shot.Draw(220, GmConfig.SCRH-10-37);
		
		FormatString.gi().FormatEx("#cc8f3f3"+this.nd1.sDetail, 800, 28, 0, 0, 32);
		//总高度150
		FormatString.gi().Draw(400, GmConfig.SCRH-160+(150-FormatString.gi().iH)/2);
	}
	bHideUI()
	{//剧情模式隐藏UI
		if(this.bDialoging && this.iDialogType==4)return true;
		return false;
	}
	 Draw()
	{
		if(!this.bDialoging)return;
		
		if(this.iDialogType==0)this.Draw_0();
		else if(this.iDialogType==1)this.Draw_1();
		else if(this.iDialogType==2)this.Draw_2();
		else if(this.iDialogType==3)this.Draw_3();
		else if(this.iDialogType==4)this.Draw_4();
	}
	 LockPoint( x, y)
	{
		var i;
		this.iPoint=-1;
		
		for(i=0;i<this.pSelect.iCount;i++)
		{
			if(this.bInRect(x,y,this.iOffX, this.iOffY+i*this.iTextSize*7/6,this.iW,this.iTextSize*7/6))
			{
				this.iPoint=i;
				return;
			}
		}
	}
	 ProcTouch( msg, x, y)
	{
		if(!this.bDialoging)return false;
		var i;
		if(this.iDialogType==3)
		{//无选项，直接关闭，有选项先判断选项
			if(this.pSelect.iCount>0)
			{
				if(XDefine.bInRect(x, y, this.iFx, this.iFy, this.iFw, this.iFh))
				{
					for(i=0;i<this.pSelect.iCount;i++)
					{
						if(this.nd2.btn_sel[i].ProcTouch(msg, x, y))
						{
							if(this.nd2.btn_sel[i].bCheck())
							{
								this.nd2.btn_sel[i].SetNormal();
								this.bDialoging=false;
								this.vbk.ProcBase(this.pSelect.next[i]);
							}
							return true;
						}
					}
					return true;
				}
			}
			if(msg==3)
			{
				this.bDialoging=false;
			}
			return true;
		}
		if(this.iDialogType==4)
		{//必定触发
			if(msg==1)this.bDown=true;
			if(!this.bDown)return true;
			if(msg==3)
			{
				if(this.pSelect.next[0]==null)this.bDialoging=false;
				else if(this.pSelect.next[0].iType!=4)this.bDialoging=false;
				this.vbk.ProcBase(this.pSelect.next[0]);
				this.bDown=false;
			}
			return true;
		}
		if(this.iDialogType==1)
		{//必定触发
			if(XDefine.get_ms()-this.tm1<this.tmwait)return true;
			if(msg==1)this.bDown=true;
			if(!this.bDown)return true;
			if(msg==3)
			{
				if(this.pSelect.next[0]==null)this.bDialoging=false;
				else if(this.pSelect.next[0].iType!=4)this.bDialoging=false;
				this.vbk.ProcBase(this.pSelect.next[0]);
			}
			return true;
		}
		if(msg==1)this.bDown=true;
		if(!this.bDown)return true;
		if(this.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))
		{
			switch(msg)
			{
			case 1://按下
			case 2://移动
				this.LockPoint(x,y);
				break;
			case 3://放开
				if(this.iPoint!=-1)
				{
					this.bDialoging=false;
					this.vbk.ProcBase(this.pSelect.next[this.iPoint]);
				}
				break;
			}
		}
		else if(msg==3)
		{
			this.bDialoging=false;
		}
		return true;
	}
	bInRect( x , y, rx, ry, rw, rh)
	{
		if(x<=rx)return false;
		if(y<=ry)return false;
		if(x>=rx+rw)return false;
		if(y>=ry+rh)return false;
		return true;
	}
}