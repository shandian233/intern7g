//活跃度
import MapManager from "../../../../../map/MapManager"
import StarEffect from "../../../../../mgm/newmainmenu/StarEffect"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../../engtst/mgm/MyAI"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyTeam from "../../../../../engtst/mgm/gameing/me/team/MyTeam"

class _ALIST
{/*
	public String sName,sDetail;
	public int proc,max,add;*/
	constructor()
	{

	}
}
class _APRICE
{/*
	public int iNeed;
	public int iExp,iMoney;
	public int tid1,tcount1,tid2,tcount2;*/
	constructor()
	{

	}
}


export default class PromptActivity extends BaseClass{


	constructor( ani)
	{
		super();
		this.MAXALIST=15;
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=1100;
		this.iH=600;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.iPage=0;
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		
		this.btn_go=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_go.InitButton("按钮2");
		this.btn_go.sName="前往";
		this.iPoint=0;
		this.btn_list=new Array(20);//
		for(i=0;i<20;i++)
		{
			this.btn_list[i]=new XButtonEx2(GmPlay.xani_nui2);
		}
		this.InitBtnAnima();
		
		this.se=new StarEffect();
		this.se.Init3(0, 0, 50, 50);
		
		this.btn_get=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_get[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_get[i].bSingleButton=true;
		}
		this.iShowGet=-1;
		this.btn_gift=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_gift.InitButton("礼包按钮");
		this.btn_gift.sName="领  取";
		
		this.btn_page=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
		}
		
//		this.btn_list2=new Array(10);//
		this.iPoint2=0;this.iCount2=0;
		this.btn_week=new Array(7);//
//		for(i=0;i<10;i++)
//		{
//			this.btn_list2[i]=new XButtonEx2(GmPlay.xani_nui2);
//		}
		for(i=0;i<7;i++)
		{
			this.btn_week[i]=new XButtonEx2(GmPlay.xani_nui2); 
			this.btn_week[i].InitButton("按钮2");
		}
		this.btn_week[0].sName="星期日";
		this.btn_week[1].sName="星期一";
		this.btn_week[2].sName="星期二";
		this.btn_week[3].sName="星期三";
		this.btn_week[4].sName="星期四";
		this.btn_week[5].sName="星期五";
		this.btn_week[6].sName="星期六";
		this.iWeek=0;
		
		this.btn_cont=new Array(7);//
		for(i=0;i<7;i++)
		{
			this.btn_cont[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_cont[i].InitButton("按钮2");
		}
		this.btn_cont[0].sName="游戏背景";
		this.btn_cont[1].sName="新手玩法";
		this.btn_cont[2].sName="高手进阶";
		this.btn_cont[3].sName="门派介绍";
		
		this.btn_qd=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_qd.InitButton("按钮4");
		this.btn_qd.sName="签  到";
		
		this.btn_vip=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_vip.InitButton("按钮3");
		if(GmMe.me.iFlag[40]<=0)this.btn_vip.sName="开通vip";
		else this.btn_vip.sName="续费vip";
		////////////////////////////////////////////
		
		this.alist=new Array(this.MAXALIST);//
		this.btn_prompt=new Array(this.MAXALIST);//
		this.aprice=new Array(this.MAXALIST);//
		for(i=0;i<this.MAXALIST;i++)
		{
			this.alist[i]=new _ALIST();
			this.btn_prompt[i]=new XButtonEx1(GmPlay.xani_ui3);
			this.btn_prompt[i].InitButton("统一按钮1");
			this.btn_prompt[i].sName="提 示";
			this.aprice[i]=new _APRICE();
		}
		
		
	}

	InitBtnAnima()
	{
		var i;
		if(this.iPage==0)
		{
			this.iCount=12;
			for(i=0;i<this.iCount;i++)
			{
				this.btn_list[i].InitButton(PromptActivity._ADetail[this.iPage][i][0]);
			}
		}
		if(this.iPage==1)
		{
			this.iCount2=0;
			if(this.iWeek==2)
			{
				this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][0][0]);
				this.btn_list[this.iCount2].exts[0]=0;
				this.iCount2++;
			}
			if(this.iWeek==3)
			{
				this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][1][0]);
				this.btn_list[this.iCount2].exts[0]=1;
				this.iCount2++;
			}
			if(this.iWeek==6 || this.iWeek==7 || this.iWeek==0)
			{
				this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][2][0]);
				this.btn_list[this.iCount2].exts[0]=2;
				this.iCount2++;
			}
			if(this.iWeek==5 || this.iWeek==6 || this.iWeek==7 || this.iWeek==0)
			{
				this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][3][0]);
				this.btn_list[this.iCount2].exts[0]=3;
				this.iCount2++;
			}
			this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][4][0]);
			this.btn_list[this.iCount2].exts[0]=4;
			this.iCount2++;
			this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][5][0]);
			this.btn_list[this.iCount2].exts[0]=5;
			this.iCount2++;
			this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][6][0]);
			this.btn_list[this.iCount2].exts[0]=6;
			this.iCount2++;
			this.btn_list[this.iCount2].InitButton(PromptActivity._ADetail[this.iPage][7][0]);
			this.btn_list[this.iCount2].exts[0]=7;
			this.iCount2++;
		}
		if(this.iPage==3)
		{
			if(iBtn3==0)
			{//游戏介绍
			}
			else if(iBtn3==1)
			{//新手玩法
				this.iCount=9;
				for(i=0;i<this.iCount;i++)
				{
					this.btn_list[i].InitButton(PromptActivity._ADetail[2][i][0]);
				}
			}
			else if(iBtn3==2)
			{//高手进阶
				this.iCount=12;
				for(i=0;i<this.iCount;i++)
				{
					this.btn_list[i].InitButton(PromptActivity._ADetail[3][i][0]);
				}
			}
			else if(iBtn3==3)
			{//门派特色
				this.iCount=9;
				for(i=0;i<this.iCount;i++)
				{
					this.btn_list[i].InitButton(PromptActivity._ADetail[4][i][0]);
				}
			}
		}
	}
	Draw_0()
	{
		var i,j,k,m,n;
		var offx,offy,offw,offh;
		offx=this.iX+30;
		offy=this.iY+30;
		offw=840;
		offh=300;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		offy=this.iY+300+30+15;
		offh=220;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		offx=this.iX+840+30+15;
		offy=this.iY+30;
		offw=180;
		offh=535;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		for(i=0;i<this.iCount;i++)
		{
			offx=this.iX+30+20+i%7*117;
			offy=this.iY+30+18+i/7*140;
			this.btn_list[i].Move(offx,offy, 100, 100);
			this.btn_list[i].Draw();
			
			GmPlay.xani_nui2.DrawAnima(offx+50-78/2, offy+100+3, "活跃进度框",0);
			if(this.alist[i].add>0)
			{
				M3DFast.gi().DrawTextEx(offx+50-78/2+5, offy+100+3+15, this.alist[i].proc+"/"+this.alist[i].max, 0xffffffff, 18, 101, 1, 1, 0, -1, -2);
				M3DFast.gi().DrawTextEx(offx+50+78/2-5, offy+100+3+15, "+"+this.alist[i].add, 0xff00ff00, 18, 101, 1, 1, 0, -3, -2);
			}
			else M3DFast.gi().DrawTextEx(offx+50, offy+100+3+15, this.alist[i].proc+"/"+this.alist[i].max, 0xffffffff, 18, 101, 1, 1, 0, -2, -2);
			if(this.iPoint==i)
			{//画选中，画介绍文字
				FormatString.gi().FormatEx("#c003e57"+PromptActivity._ADetail[this.iPage][i][1], 800, 30, 0, 0, 40);
				FormatString.gi().Draw(this.iX+30+20, this.iY+300+30+15+20);
				this.se.Logic();
				this.se.Draw(offx+50, offy+50);
			}
		}
		if(this.iPoint==0 || this.iPoint==1 || this.iPoint==2 || this.iPoint==3 || this.iPoint==4 || this.iPoint==6 || this.iPoint==7 || this.iPoint==9 || this.iPoint==10 || this.iPoint==11)
		{
			this.btn_go.Move(this.iX+30+840-20-145, this.iY+300+30+15+220-20-56, 145, 56);
			this.btn_go.Draw();
		}
		
		offx=this.iX+840+30+15;
		offy=this.iY+30;
		M3DFast.gi().DrawText_2(offx+90, this.iY+60, "今日活跃度", 0xff3de1e1, 25, 101, 1, 1, 0, -2, -2, 4, 0xff003e57);
		M3DFast.gi().DrawText_2(offx+90, this.iY+95, ""+this.iNumber, 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 4, 0xff003e57);
		
//		M3DFast.gi().SetViewClip(offx+5, offy+5, offx+w1-5+35, offy+h1-5+5);
		
		if(this.iAPPoint+2>=this.iAPCount)k=(this.iAPPoint+2)-this.iAPCount;
		else k=0;
		for(i=0;i<3;i++)
		{
			j=i+this.iAPPoint-1-k;
			
			this.btn_get[i].SetCheckRect(-1, -1, -1, -1);
//			GmPlay.sop(""+j+"=apc="+this.iAPCount);
			if(j>=0 && j<this.iAPCount)
			{//可显示,300宽，60x4
//				GmPlay.sop("tt"+this.aprice[j].iExp);
				m=offx+180/2;
				n=offy+90+i*163;
				M3DFast.gi().DrawTextEx(m,n-5, "活跃度达到"+this.aprice[j].iNeed+"可领", 0xff003e57, 20, 101, 1, 1, 0, -2, 0);
				
				this.btn_get[i].SetCheckRect(offx+(180-94)/2, offy+110+i*163, 94,94);
				this.btn_get[i].exts[0]=j;
				GmPlay.xani_nui2.DrawAnima(offx+(180-94)/2+7, offy+110+i*163+7, "礼品格子",0);
				if(i<2)GmPlay.xani_nui2.DrawAnima(offx+(180-94)/2, offy+110+i*163, "礼品箭头",0);
				
				//礼品包包
				GmPlay.xani_nui2.DrawAnima(offx+(180-94)/2, offy+110+i*163, "礼品包包",this.iNumber<this.aprice[j].iNeed?6:j);
				
				if(this.iAPPoint>j)
				{//已领
					GmPlay.xani_nui2.DrawAnima(offx+(180-94)/2, offy+110+i*163, "已领标记",0);
//					M3DFast.gi().DrawTextEx(m+30-50,n+30-25, "已领标记", 0xffff0000, 50, 101, 1, 1, 30, m+30,n+30 );
				}
			}
		}
	}

	draw_get( j)
	{
		var offx,offy,offw,offh;
		var p=0;
		var m,n;
		
		offw=465;
		offh=381;
		offx=(GmConfig.SCRW-offw)/2;
		offy=(GmConfig.SCRH-offh)/2;
		
		GmPlay.xani_nui2.DrawAnima(offx,offy,"礼包背景框",0);
		
		
		if(this.aprice[j].iExp>0)
		{
			m=offx+60+p%2*190;
			n=offy+100+p/2*100;
			
			GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",1);
			GmPlay.xani_ngoods.DrawAnima(m,n, "物品经验", 0);
			M3DFast.gi().DrawTextEx(m+80,n+80, ""+this.aprice[j].iExp, 0xffffffff, 20, 101, 1, 1, 0, -3, -3);
			
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+11, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+11+11, "经验", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+45, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+45+11, "x 1", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			p++;
		}
		if(this.aprice[j].iMoney>0)
		{
			m=offx+60+p%2*190;
			n=offy+100+p/2*100;
			
			GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",1);
			GmPlay.xani_ngoods.DrawAnima(m,n, "物品钱", 0);
			M3DFast.gi().DrawTextEx(m+80,n+80, ""+this.aprice[j].iMoney, 0xffffffff, 20, 101, 1, 1, 0, -3, -3);
			
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+11, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+11+11, "金钱", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+45, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+45+11, "x 1", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			p++;
		}
		if(this.aprice[j].tid1>0 && this.aprice[j].tcount1>0)
		{
			m=offx+60+p%2*190;
			n=offy+100+p/2*100;
			
			GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",1);
			GmPlay.xani_ngoods.DrawAnima_aa(m, n, GmPlay.de_goods.strValue(this.aprice[j].tid1, -1, 10),0);
			
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+11, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+11+11, GmPlay.de_goods.strValue(this.aprice[j].tid1, -1, 4), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+45, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+45+11, "x "+this.aprice[j].tcount1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			p++;
		}
		if(this.aprice[j].tid2>0 && this.aprice[j].tcount2>0)
		{
			m=offx+60+p%2*190;
			n=offy+100+p/2*100;
			
			GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",1);
			GmPlay.xani_ngoods.DrawAnima_aa(m, n, GmPlay.de_goods.strValue(this.aprice[j].tid2, -1, 10),0);
			  
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+11, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+11+11, GmPlay.de_goods.strValue(this.aprice[j].tid2, -1, 4), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			GmPlay.xani_nui2.DrawAnima(m+80+20,n+45, "礼包文本框",0);
			M3DFast.gi().DrawTextEx(m+80+20+30,n+45+11, "x "+this.aprice[j].tcount2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			p++;
		}
		this.btn_gift.Move( offx+(offw-134)/2, offy+offh-44-40,134,44);
		this.btn_gift.Draw();
	}

	Draw_1()
	{
		var i,j,k;
		var offx,offy,offw,offh;
		offx=this.iX+30;
		offy=this.iY+30;
		offw=840;
		offh=300;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		offy=this.iY+300+30+15;
		offh=220;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		offx=this.iX+840+30+15;
		offy=this.iY+30;
		offw=180;
		offh=535;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		for(i=0;i<7;i++)
		{
			this.btn_week[i].Move(this.iX+903, this.iY+52+i*73, 145, 56);
			if(this.iWeek==i)this.btn_week[i].bMouseDown=true;
			this.btn_week[i].Draw();
		}
		
		for(i=0;i<this.iCount2;i++)
		{
			offx=this.iX+30+20+i%7*117;
			offy=this.iY+30+30+i/7*140;
			this.btn_list[i].Move(offx,offy, 100, 100);
			this.btn_list[i].Draw();
			
			if(this.iPoint2==i)
			{//画选中，画介绍文字
				FormatString.gi().FormatEx("#c003e57"+PromptActivity._ADetail[this.iPage][this.btn_list[i].exts[0]][1], 800, 30, 0, 0, 40);
				FormatString.gi().Draw(this.iX+30+20, this.iY+300+30+15+20);
				this.se.Logic();
				this.se.Draw(offx+50, offy+50);
			}
		}
	}
	Draw_3()
	{
		var i,j,k,m,n;
		var offx,offy,offw,offh;
		
		offx=this.iX+840+30+15;
		offy=this.iY+30;
		offw=180;
		offh=535;
		DrawMode.new_framein(offx,offy,offw,offh);
		for(i=0;i<4;i++)
		{
			this.btn_cont[i].Move(this.iX+903, this.iY+52+i*73, 145, 56);
			if(iBtn3==i)this.btn_cont[i].bMouseDown=true;
			this.btn_cont[i].Draw();
		}
		if(iBtn3==0)
		{//游戏介绍
			offx=this.iX+30;
			offy=this.iY+30;
			offw=840;
			offh=535;
			
			DrawMode.new_framein(offx,offy,offw,offh);
			M3DFast.gi().DrawText_2(offx+offw/2, offy+40, "游戏背景", 0xffffff00, 50, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
			FormatString.gi().FormatEx("# # #c000000春秋战国期间，七雄争霸，豪杰雄起。谋臣运筹帷幄，将士浴血沙场。战争此起彼伏，局势变化跌宕。#e# # 时代赋予三界风云人物神圣使命去掌控国家生死存亡、左右民族荣辱兴衰。#e# # 人族、魔族、仙族率领九大门派弟子卷入了这场声势浩大的征战之中。#e# # 岁月长河涤荡两千余载，那些璀璨的智慧和生命依然熠熠发光，依然动人心魄......", 800, 30, 0, 0, 45);
//			FormatString.gi().Format("春秋一百多年，经过不断兼并，战国初年，约有十几个国。大国有秦，魏，韩，燕，赵，齐，楚，即“战国七雄”。在战国时期涌现了一批伟大的人物，主宰了历史，扭转了乾坤。战国时期，各国人民都踊跃学习本领，希望在乱世之中能够成就一番事业，有志青年投奔人、魔、仙大师级人物门下拜师学艺，勇闯天下。人族，魔族，仙族都卷进了这场举世的大混战之中，三界中所有智慧和能量都得到了极大的发挥。 然而在战火弥漫的战国时期，爱情，亲情，友情光芒不仅仅没有被滚滚硝烟湮没，反而更加令人荡气回肠，回味无穷", 800, 20);
			FormatString.gi().Draw(offx+20, offy+80-15);
		}
		else if(iBtn3==1 || iBtn3==2 || iBtn3==3)
		{
			offx=this.iX+30;
			offy=this.iY+30;
			offw=840;
			offh=260;
			DrawMode.new_framein(offx,offy,offw,offh);
			
			offy=this.iY+260+30+15;
			offh=260;
			DrawMode.new_framein(offx,offy,offw,offh);
			
			for(i=0;i<this.iCount;i++)
			{
				offx=this.iX+30+20+i%7*117;
				offy=this.iY+30+18+i/7*120;
				this.btn_list[i].Move(offx,offy, 100, 100);
				this.btn_list[i].Draw();
				
//				GmPlay.xani_nui2.DrawAnima(offx+50-78/2, offy+100+3, "活跃进度框",0);
//				if(this.alist[i].add>0)
//				{
//					M3DFast.gi().DrawTextEx(offx+50-78/2+5, offy+100+3+15, this.alist[i].proc+"/"+this.alist[i].max, 0xffffffff, 18, 101, 1, 1, 0, -1, -2);
//					M3DFast.gi().DrawTextEx(offx+50+78/2-5, offy+100+3+15, "+"+this.alist[i].add, 0xff00ff00, 18, 101, 1, 1, 0, -3, -2);
//				}
//				else M3DFast.gi().DrawTextEx(offx+50, offy+100+3+15, this.alist[i].proc+"/"+this.alist[i].max, 0xffffffff, 18, 101, 1, 1, 0, -2, -2);
				if(this.iPoint3==i)
				{//画选中，画介绍文字
					FormatString.gi().FormatEx("#c003e57"+PromptActivity._ADetail[iBtn3+1][i][1], 800, 30, 0, 0, 40);
					FormatString.gi().Draw(this.iX+30+20, this.iY+260+30+15+10);
					this.se.Logic();
					this.se.Draw(offx+50, offy+50);
				}
			}
		}
	}
	Draw_2()
	{
		var i,j,k,m,n;
		var offx,offy,offw,offh;
		
		offx=this.iX+30;
		offy=this.iY+30;
		offw=360;
		offh=250;
		DrawMode.new_framein(offx,offy,offw,offh);
		//日期部分45*8=320+40=360
		GmPlay.xani_nui2.DrawAnima(offx+(offw-80)/2, offy+5, "月份底",0);//80*32
		M3DFast.gi().DrawText_2(offx+offw/2, offy+5+16, GameData.sBigNum[this.iMonth]+"月", 0xff3de1e5, 24, 101, 1, 1, 0, -2, -2, 3, 0xff003e57);
		
//		pa.iTodayWeek=pls.GetNextByte();
//		pa.iTodayDay=3;
//		pa.iMaxDay=31;
//		pa.iMonth=3;//计算1号是周几
		
//		if(GmPlay.iDelay%30==0)
//		{
//			this.iTodayWeek++;
//			this.iTodayWeek%=7;
//		}
		j=this.iTodayWeek-this.iTodayDay;
		while(true)
		{//得到1号是周几0~6
			if(j>=7)j-=7;
			else if(j<0)j+=7;
			else break;
		}
//		GmPlay.sop("j="+j);
		for(i=0;i<7;i++)
		{//
			M3DFast.gi().DrawTextEx(offx+i*45+45, offy+55, GameData.sWeek[i], 0xff003e57, 20, 101, 1, 1, 0, -2, -2);
		}
		this.qdtime=0;
		for(i=1;i<=this.iMaxDay;i++)
		{
			k=i+j;
			m=offx+(k%7)*45+45;
			n=offy+85+k/7*27-(j==6?27:0);
			
			if(i==this.iTodayDay)
			{
				M3DFast.gi().FillRect_2D(m-15, n-15, m+15, n+15, 0x30000000);
			}
			M3DFast.gi().DrawTextEx(m,n, ""+i, 0xff000000, 20, 101, 1, 1, 0, -2, -2);

			if((GmMe.me.iFlag[50]&(1<<(i-1)))!=0)
			{
				GmPlay.xani_nui2.DrawAnima(m-16,n-15, "签过圈",0);
				this.qdtime++;//累计签到次数
			}
		}
		
		
		
		
		//基本领取
		offx+=360+15;
		offw=35+80+35+80+35+80+35;
		DrawMode.new_framein(offx,offy,offw,offh);
		M3DFast.gi().DrawText_2(offx+30, offy+42, "当前活跃", 0xff3de1e5, 30, 101, 1, 1, 0, 0, -2, 3, 0xff003e57);
		M3DFast.gi().DrawText_2(offx+30+30*4+5, offy+42, ""+this.iNumber, 0xffffff00, 50, 101, 1, 1, 0, 0, -2, 3, 0xff003e57);
		M3DFast.gi().DrawTextEx(offx+30+30*4+5+50+10, offy+42, "达到20可签到", 0xff003e57, 24, 101, 1, 1, 0, 0, -2);
		m=offx+35;
		n=offy+85;
		GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",0);//lev*4*80
		GmPlay.xani_ngoods.DrawAnima(m,n, "物品经验", 0);
		M3DFast.gi().DrawTextEx(m+80,n+80, ""+GmMe.me.rbs.iLev*4*80*2, 0xffffffff, 20, 101, 1, 1, 0, -3, -3);
		
		m+=80+35;
		GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",0);//lev*4*80
		GmPlay.xani_ngoods.DrawAnima(m,n, "物品钱", 0);
		M3DFast.gi().DrawTextEx(m+80,n+80, ""+GmMe.me.rbs.iLev*4*80, 0xffffffff, 20, 101, 1, 1, 0, -3, -3);
		
		m+=80+35;
		GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",0);//lev*4*80
		GmPlay.xani_ngoods.DrawAnima(m,n, "双倍经验卡", 0);
		M3DFast.gi().DrawTextEx(m+80,n+80, "x1", 0xffffffff, 20, 101, 1, 1, 0, -3, -3);
		
		if((GmMe.me.iFlag[50]&(1<<(this.iTodayDay-1)))!=0)
		{
			M3DFast.gi().DrawTextEx(offx+offw/2,offy+offh-85/2, "已签到", 0xff003e57, 40, 101, 1, 1, 0, -2, -2);
		}
		else
		{
			this.btn_qd.Move(offx+(offw-141)/2, offy+offh-85/2-49/2, 141, 49);
			this.btn_qd.Draw();
		}
		
		//特殊领取
		offx+=35+80+35+80+35+80+35+15;
		offw=270;
		DrawMode.new_framein(offx,offy,offw,offh);
		for(i=0;i<7;i++)
		{
			if(this.qdtime<PromptActivity._SPECIALDAY[i])break;
		}
		if(i<7)
		{
			j=PromptActivity._SPECIALDAY[i]-this.qdtime;
			if(j==1 && (GmMe.me.iFlag[50]&(1<<(this.iTodayDay-1)))==0)M3DFast.gi().DrawTextEx(offx+offw/2, offy+42, "本次签到可获得", 0xff003e57, 24, 101, 1, 1, 0, -2, -2);
			else M3DFast.gi().DrawTextEx(offx+offw/2, offy+42, "继续签到"+j+"次后可获得", 0xff003e57, 24, 101, 1, 1, 0, -2, -2);
			m=offx+35;
			n=offy+85;
			GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",0);//lev*4*80
			if(i==0)GmPlay.xani_ngoods.DrawAnima(m,n, "传送符",0);
			else if(i==1)GmPlay.xani_ngoods.DrawAnima(m,n, "仙灵果",0);
			else if(i==2)GmPlay.xani_ngoods.DrawAnima(m,n, "替身木偶",0);
			else if(i==3)GmPlay.xani_ngoods.DrawAnima(m,n, "装备制造图纸",0);
			else if(i==4)GmPlay.xani_ngoods.DrawAnima(m,n, "青霜丹",0);
			else if(i==5)GmPlay.xani_ngoods.DrawAnima(m,n, "高级仙灵果",0);
			else if(i==6)GmPlay.xani_ngoods.DrawAnima(m,n, "装备制造图纸",0);
			
			m+=80+35;
			GmPlay.xani_nui2.DrawAnima(m,n, "礼品格子",0);//lev*4*80
			GmPlay.xani_ngoods.DrawAnima(m,n, "三倍经验卡", 0);
			GmPlay.xani_nui2.DrawAnima(m,n, "会员专属", 0);
			
			this.btn_vip.Move(offx+(offw-141)/2, offy+offh-85/2-49/2, 141, 49);
			this.btn_vip.Draw();
		}
		offx=this.iX+30;
		offy+=250+15;
		offw=this.iW-60;
		offh=280;
		DrawMode.new_framein(offx,offy,offw,offh);
		j=(1040-128*7)/8;
		for(i=0;i<7;i++)
		{//特殊日子奖励
			this.DrawSpecial(offx+j+(j+128)*i,offy+15,i);
		}
	}

	 DrawSpecial( x, y, num)
	{//1100-60=1040=x*7+y*8=128*7+y*8
		if(PromptActivity.aa_specialframe==null)PromptActivity.aa_specialframe=GmPlay.xani_nui2.InitAnimaWithName("特殊奖励框", null);
		if(PromptActivity.aa_specialframe2==null)PromptActivity.aa_specialframe2=GmPlay.xani_nui2.InitAnimaWithName("特殊奖励框2", null);
		var w,h;
		w=128;
		h=250;
		if(this.qdtime<PromptActivity._SPECIALDAY[num])
		{
			M3DFast.gi().FillRect_2D(x+5, y+5, x+w-10,y+h-10 , 0xff399392);
			PromptActivity.aa_specialframe.iFrame=0;PromptActivity.aa_specialframe.Draw(x, y);
			PromptActivity.aa_specialframe.iFrame=1;PromptActivity.aa_specialframe.Draw(x+w, y);
			PromptActivity.aa_specialframe.iFrame=2;PromptActivity.aa_specialframe.Draw(x+w, y+h);
			PromptActivity.aa_specialframe.iFrame=3;PromptActivity.aa_specialframe.Draw(x, y+h);
			PromptActivity.aa_specialframe.iFrame=4;PromptActivity.aa_specialframe.DrawEx(x+20, y, 101, 1.0*(w-20-20)/20, 1, 0, 0, 0);
			PromptActivity.aa_specialframe.iFrame=5;PromptActivity.aa_specialframe.DrawEx(x, y+20, 101, 1, 1.0*(h-20-20)/20, 0, 0, 0);
			PromptActivity.aa_specialframe.iFrame=6;PromptActivity.aa_specialframe.DrawEx(x+w, y+20, 101, 1, 1.0*(h-20-20)/20, 0, 0, 0);
			PromptActivity.aa_specialframe.iFrame=7;PromptActivity.aa_specialframe.DrawEx(x+20, y+h, 101, 1.0*(w-20-20)/20, 1, 0, 0, 0);
			M3DFast.gi().DrawText_2(x+w/2,y+20, "签到"+PromptActivity._SPECIALDAY[num]+"次获得", 0xffffff00, 20, 101, 1, 1, 0, -2, -2,3, 0xff000000);
		}
		else
		{
			M3DFast.gi().FillRect_2D(x+5, y+5, x+w-10,y+h-10 , 0xff3c739a);
			PromptActivity.aa_specialframe2.iFrame=0;PromptActivity.aa_specialframe2.Draw(x, y);
			PromptActivity.aa_specialframe2.iFrame=1;PromptActivity.aa_specialframe2.Draw(x+w, y);
			PromptActivity.aa_specialframe2.iFrame=2;PromptActivity.aa_specialframe2.Draw(x+w, y+h);
			PromptActivity.aa_specialframe2.iFrame=3;PromptActivity.aa_specialframe2.Draw(x, y+h);
			PromptActivity.aa_specialframe2.iFrame=4;PromptActivity.aa_specialframe2.DrawEx(x+20, y, 101, 1.0*(w-20-20)/20, 1, 0, 0, 0);
			PromptActivity.aa_specialframe2.iFrame=5;PromptActivity.aa_specialframe2.DrawEx(x, y+20, 101, 1, 1.0*(h-20-20)/20, 0, 0, 0);
			PromptActivity.aa_specialframe2.iFrame=6;PromptActivity.aa_specialframe2.DrawEx(x+w, y+20, 101, 1, 1.0*(h-20-20)/20, 0, 0, 0);
			PromptActivity.aa_specialframe2.iFrame=7;PromptActivity.aa_specialframe2.DrawEx(x+20, y+h, 101, 1.0*(w-20-20)/20, 1, 0, 0, 0);
			M3DFast.gi().DrawText_2(x+w/2,y+20, "已获得", 0xffffff00, 24, 101, 1, 1, 0, -2, -2,3, 0xff000000);
		}
		
		GmPlay.xani_nui2.DrawAnima(x+(w-80)/2,y+45, "礼品格子",0);
		if(num==0)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "传送符",0);
		else if(num==1)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "仙灵果",0);
		else if(num==2)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "替身木偶",0);
		else if(num==3)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "装备制造图纸",0);
		else if(num==4)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "青霜丹",0);
		else if(num==5)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "高级仙灵果",0);
		else if(num==6)GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+45, "装备制造图纸",0);
		
		GmPlay.xani_nui2.DrawAnima(x+(w-80)/2,y+150, "礼品格子",0);
		GmPlay.xani_ngoods.DrawAnima(x+(w-80)/2,y+150, "三倍经验卡",0);
		GmPlay.xani_nui2.DrawAnima(x+(w-80)/2,y+150, "会员专属", 0);
	}
	Draw()
	{
		var i;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "活", "动");

		for(i=0;i<4;i++)
		{
			this.btn_page[i].Move(this.iX+this.iW-15, this.iY+40+130*i, 50, 130);
			if(this.iPage==i)this.btn_page[i].bMouseDown=true;
			this.btn_page[i].Draw();
			DrawMode.new_lableword2(this.iX+this.iW-15, this.iY+40+130*i, 40, 130,this.iPage==i,PromptActivity._ALable[i][0],PromptActivity._ALable[i][1]);
		}
		
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		switch(this.iPage)
		{
		case 0://活跃
			this.Draw_0();
			break;
		case 1://活动
			this.Draw_1();
			break;
		case 2://签到
			this.Draw_2();
			break;
		case 3://玩法
			this.Draw_3();
			break;
		}
		if(this.iShowGet>=0 && this.iShowGet<this.iAPCount)
		{//领取当前活跃度奖励的框
			this.draw_get(this.iShowGet);
		}

//		GmPlay.xani_nui2.DrawAnima(10, 10, "世界抢答",0);
	}
	ProcTouch( msg, x, y)
	{
		var i;
		var offx,offy,offw,offh;

		if(this.iShowGet>=0)
		{
			offw=465;
			offh=381;
			offx=(GmConfig.SCRW-offw)/2;
			offy=(GmConfig.SCRH-offh)/2;
			if(msg==3 && !XDefine.bInRect(x, y,offx,offy,offw,offh))this.iShowGet=-1;
			if(this.btn_gift.ProcTouch(msg, x, y))
			{
				if(this.btn_gift.bCheck())
				{
					if(this.iNumber<this.aprice[this.iShowGet].iNeed)EasyMessage.easymsg.AddMessage("活跃度未达不能领取");
					else if(this.iShowGet<this.iAPPoint)EasyMessage.easymsg.AddMessage("此档奖励已领过");
					else GmProtocol.gi().s_PromptActivity(1, this.iShowGet);
					this.iShowGet=-1;
				}
			}
			return true;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<4;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
					this.iPage=i;
					this.iWeek=this.iTodayWeek;
//					this.iWeek=0;//设置今天周几?
					
					iBtn3=0;
					this.iPoint3=0;
					this.InitBtnAnima();
				}
			}
		}
		if(this.iPage==0)
		{
			if(this.btn_go.ProcTouch(msg, x, y))
			{
				if(this.btn_go.bCheck())
				{
					if(this.iPoint==0)
					{
						if(GmMe.me.rbs.iLev<10)FrameMessage.fm.Open("升到10级，加入门派后才能领取师门任务。#e完成引导剧情即可升到10级以上");
						else if(GmMe.me.rbs.iSchoolId==0)FrameMessage.fm.Open("自动寻路前往门派....#e加入门派后才能领取师门任务");
						else
						{//public final static String sSchools[ ]={"无","剑侠居","茅蓬坞","庐医崖","武安阁","溶洞","鬼谷","封神台","仙人洞","神女峰"};
							//使用遁地术
							if(MyTeam.bNoTeam())
							{
								if(GmMe.me.rbs.iSchoolId>0)
								{
									GmProtocol.gi().s_UseSkill(0,0,0,0,0,0,0);
									XStat.gi().PopStat(1);
									MapManager.gi().iMapChangeing=100;
									FrameMessage.fm.Open("点击右下角“快捷”按钮，使用“遁地术”即可快速回到门派");
								}
							}
							else EasyMessage.easymsg.AddMessage("队伍中不能使用遁地术");
//							if(GmMe.me.rbs.iSchoolId==1)MyAI.gi().FindNpc(5);
//							if(GmMe.me.rbs.iSchoolId==2)MyAI.gi().FindNpc(6);
//							if(GmMe.me.rbs.iSchoolId==3)MyAI.gi().FindNpc(7);
//							if(GmMe.me.rbs.iSchoolId==4)MyAI.gi().FindNpc(21);
//							if(GmMe.me.rbs.iSchoolId==5)MyAI.gi().FindNpc(22);
//							if(GmMe.me.rbs.iSchoolId==6)MyAI.gi().FindNpc(23);
//							if(GmMe.me.rbs.iSchoolId==7)MyAI.gi().FindNpc(24);
//							if(GmMe.me.rbs.iSchoolId==8)MyAI.gi().FindNpc(25);
//							if(GmMe.me.rbs.iSchoolId==9)MyAI.gi().FindNpc(26);
						}
					}
					if(this.iPoint==1)
					{//除害
						MyAI.gi().FindNpc(20,true,true);
						XStat.gi().PopStat(1);
					}
					if(this.iPoint==2)
					{//赛跑
						MyAI.gi().FindNpc(56,true,true);
						XStat.gi().PopStat(1);
					}
					if(this.iPoint==3)
					{//护法
						MyAI.gi().FindNpc(35,true,true);
						XStat.gi().PopStat(1);
					}
					if(this.iPoint==4)
					{//强盗
						MyAI.gi().FindNpc(62,true,true);
						XStat.gi().PopStat(1);
					}
					if(this.iPoint==6)
					{//手艺
						MyAI.gi().FindNpc(74,true,true);
						XStat.gi().PopStat(1);
					}
					if(this.iPoint==7)
					{//押镖
						MyAI.gi().FindNpc(34,true,true);
						FrameMessage.fm.Open("程镖头每过一段时间会改变位置，要在临淄四处找找哦");
						XStat.gi().PopStat(1);
					}
					if(this.iPoint==9 || this.iPoint==10 || this.iPoint==11)
					{//帮派任务
						MyAI.gi().FindNpc(76,true,true);
						XStat.gi().PopStat(1);
					}
				}
			}
			

			for(i=0;i<this.iCount;i++)
			{
				if(this.btn_list[i].ProcTouch(msg,x,y))
				{
					if(this.btn_list[i].bCheck())
					{
						this.iPoint=i;
						//this.iAPPoint++;
					}
					return true;
				}
			}
			for(i=0;i<3;i++)
			{
				if(this.btn_get[i].ProcTouch(msg, x, y))
				{
					if(this.btn_get[i].bCheck())
					{
						this.iShowGet=this.btn_get[i].exts[0];
					}
					return true;
				}
			}
		}
		else if(this.iPage==1)
		{
			for(i=0;i<7;i++)
			{
				if(this.btn_week[i].ProcTouch(msg, x, y))
				{
					if(this.btn_week[i].bCheck())
					{
						this.iPoint2=0;
						this.iWeek=i;
						this.InitBtnAnima();
					}
				}
			}
			for(i=0;i<this.iCount2;i++)
			{
				if(this.btn_list[i].ProcTouch(msg,x,y))
				{
					if(this.btn_list[i].bCheck())
					{
						this.iPoint2=i;
					}
					return true;
				}
			}
		}
		else if(this.iPage==2)
		{//点击签到，开通vip
			if((GmMe.me.iFlag[50]&(1<<(this.iTodayDay-1)))==0)
			{
				if(this.btn_qd.ProcTouch(msg, x, y))
				{
					if(this.btn_qd.bCheck())
					{//点击了签到
						if((GmMe.me.iFlag[50]&(1<<(this.iTodayDay-1)))!=0)
						{
							EasyMessage.easymsg.AddMessage("今日已签到过");
						}
						else GmProtocol.gi().s_GetCodeReward(5, "");
					}
					return true;
				}
			}
			if(this.btn_vip.ProcTouch(msg, x, y))
			{
				if(this.btn_vip.bCheck())
				{
					XStat.gi().PopStat(1);
					MyAttFrame.Open(3);
				}
				return true;
			}
		}
		else if(this.iPage==3)
		{
			for(i=0;i<4;i++)
			{
				if(this.btn_cont[i].ProcTouch(msg, x, y))
				{
					if(this.btn_cont[i].bCheck())
					{
						this.iPoint3=0;
						iBtn3=i;
						this.InitBtnAnima();
					}
				}
			}
			if(iBtn3==1 || iBtn3==2 || iBtn3==3)
			{
				for(i=0;i<this.iCount;i++)
				{
					if(this.btn_list[i].ProcTouch(msg, x, y))
					{
						if(this.btn_list[i].bCheck())
						{
							this.iPoint3=i;
						}
						return true;
					}
				}
			}
		}
		
//		if(bScroll1)
//		{
//			if(msg==2)
//			{
//				i=y-iScrollY;
//				iScrollY=y;
//				iOffY1-=i;
//				if(iOffY1<0)iOffY1=0;
//				if(iOffY1>iMaxOffY1)iOffY1=iMaxOffY1;
//			}
//			if(msg==3)bScroll1=false;
//			return true;
//		}
//		if(this.btn_get.ProcTouch(msg, x, y))
//		{
//			if(this.btn_get.bCheck())
//			{//活跃度领取
//				if(this.iNumber<this.aprice[this.iPoint].iNeed)EasyMessage.easymsg.AddMessage("活跃度未达不能领取");
//				else
//				{
//					GmProtocol.gi().s_PromptActivity(1, this.iPoint);
//					XStat.gi().PushStat(XStat.GS_LOADING1);
//				}
//			}
//			return true;
//		}
		
	//	offx=this.iX+78;
	//	offy=this.iY+20+100-30;
		
//		if(XDefine.bInRect(x, y, this.iX+78, this.iY+20+70, 300+35, 300))
//		{
//			for(i=0;i<this.iACount;i++)
//			{
//				if(this.btn_prompt[i].ProcTouch(msg, x, y))
//				{
//					if(this.btn_prompt[i].bCheck())
//					{
//						FrameMessage.fm.Open(this.alist[i].sDetail);
//					}
//					return true;
//				}
//			}
//		}
//		if(msg==1 && XDefine.bInRect(x, y, this.iX+78, this.iY+20+70, 300+35, 300))
//		{
//			bScroll1=true;
//			iScrollY=y;
//		}
//		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
//		{
//			XStat.gi().PopStat(1);
//		}
		return false;
	}
}
PromptActivity._ADetail=[
	[["师门任务","人物等级>=10级#e10级加入门派后，找门派师傅领取任务，每天的前两轮（会员三轮）任务获得双倍奖励。"],
	["为民除害","人物等级>=10级#e在[西阳城守卫]处领取，任务完成后会获得大量的经验奖励。"],
	["每日赛跑","人物等级>=20级#e在[临淄城]的[田忌]处领取，完成可获得大量经验和金钱奖励，并获得一个三级草药。每天前十名更能额外获得道具奖励。#e任务可自动寻路完成"],
	["护法任务","人物等级>=20级#e在[咸阳]的[商鞅]处领取任务，完成获得大量的经验和金钱，10次为一轮，完成每轮的第十次任务可获得制作装备的材料。"],
	["追捕强盗","人物等级>=20级#e可以在[郢城]的[栾千盛]处领取追捕强盗任务，要求至少3人组队才能领取，完成获取经验金钱奖励，10次为一轮，第10次队长必定获得装备制造图纸，其他队员有几率获得道具奖励。"],
	["擂台切磋","在西阳城中间的擂台，跟其他玩家切磋一下，不管输赢都会获得2点活跃哦。"],
	["手艺任务","在郢城的铁匠接取任务，完成任务后会获得大量的经验和金钱，以及高熟练的打造手艺！"],
	["押镖任务","人物等级>=20级#e可前往[临淄城]找[程镖头]领取押镖任务，完成获得大量金钱奖励，并有一定几率获取阵法书，还有可能获得红包（#cff0000里面有200元宝哦#o）。"],
	["消灭山贼","人物等级>=30级#e每天整点，在随机野外地图刷出10只山贼，至少3人组队才能与山贼战斗，打败山贼获得大量的经验和金钱奖励，并有较大几率获得藏宝图。"],
	["帮派青龙","人物等级>=20级#e在[郢城]的[帮派总管]处加入帮派，进入帮派领地，在帮派的领地里面去找青龙堂总管，领取任务，完成任务可获得大量的经验、金钱和帮贡"],
	["帮派玄武","人物等级>=20级#e在帮派的领地里面去找玄武堂总管，领取任务，完成任务可获得大量的经验、金钱和帮贡（帮贡可在学院点帮派修炼）"],
	["帮派朱雀","人物等级>=20级#e在帮派的领地里面去找朱雀堂总管，领取任务，完成任务可获得大量的经验、金钱和帮贡，在第10次并能获取丹方，是炼丹的必备品。"]],

	[["门派闯关","每周四20:00点在[咸阳]或[临淄]的[门派活动使者]处领取任务，然后根据任务挑战门派护卫。每闯过一关都有丰厚的奖励，闯关速度最快的队伍更有高等级稀有宝石领取。"],
	["保卫西阳","每周一20:00点在大禹水道，平原山陵，函谷关，太行山四个地图刷新怪物向西阳城进攻，玩家阻挡怪物，阻止怪物进入西阳城，打败怪物会获得丰厚的奖励，保卫西阳城成功，在西阳城更有稀有宝箱出现。"],
	["比武大会","每周五中午12点~周六中午12点，玩家可以在[咸阳]的[比武接引人]报名，周六和周日下午13点~15点之间分别进行两场比武，比武获胜方可领取宝箱，即使失败也有其他丰厚奖励"],
	["帮派之战","每周五，周六，周日的19点~20点在[咸阳]的[帮战接引先锋]处进入帮战场地（帮主需提前报名），获胜帮派的成员将会获得100点帮贡和大量经验，并在帮战场地内刷出大量宝箱"],
	["封印叔叔","在挖宝时，有一定几率挖出妖怪叔叔，玩家组队去封印妖怪叔叔，会获得稀有的宝石和大量的经验金钱。"],
	["挑战嚣张","每天系统会在城市中刷新出4种嚣张妖怪（有点嚣张、比较嚣张、很嚣张、太嚣张）每种怪物每天可挑战一次，挑战成功，有几率获取丰厚的奖励（如高级宠物技能包）"],
	["战队竞技","在[咸阳]的[神威将军]处创建战队后，战队队长可以挑战比自己排名高的战队，挑战胜利可以提升战队排名。排名越靠前，战队每日声望增长越多"],
	["跑环","玩家在郢城的吉祥处领取跑环任务，完成跑环任务可获得相应等级的装备图纸。"]],
	
	//新手玩法
	[["师门任务","人物等级>=10级#e10级加入门派后，找门派师傅领取任务，每天的前两轮（会员三轮）任务获得双倍奖励。"],
	["为民除害","人物等级>=10级#e在[西阳城守卫]处领取，任务完成后会获得大量的经验奖励。"],
	["每日赛跑","人物等级>=10级#e在[临淄城]的[田忌]处领取，完成获得大量经验和金钱奖励，并获得一个三级草药。每天前十名更能额外获得道具奖励。#e任务可自动寻路完成"],
	["世界抢答","人物等级>=10级#e每隔一段时间，系统会发出一道题目，可在世界频道回答，最先答对的两名玩家各获得一颗宝石，并从前二十名答对的玩家中抽取4名给予66666铜币奖励"],
	["智者答题","无等级要求#e在各城市，每隔一段时间会随机出现一个智者，第一个答对智者问题的人可获得经验和金钱奖励，并有一定几率获得一颗宝石"],
	["押镖任务","人物等级>=20级#e可前往[临淄城]找[程镖头]领取押镖任务，完成获得大量金钱奖励，并有一定几率获取阵法书，还有可能获得红包（#cff0000里面有200元宝哦#o）。"],
	["追捕强盗","人物等级>=20级#e可以在[郢城]的[栾千盛]处领取追捕强盗任务，要求至少3人组队才能领取，完成获取经验金钱奖励，10次为一轮，第10次队长必定获得装备制造图纸，其他队员有几率获得道具奖励。"],
	["护法任务","人物等级>=20级#e在[咸阳]的[商鞅]处领取任务，完成获得大量的经验和金钱，10次为一轮，完成每轮的第十次任务可获得制作装备的材料。"],
	["帮派任务","人物等级>=20级#e在[郢城]的[帮派总管]处加入帮派，进入帮派领地，在帮派领地内可领取各种帮派任务，完成获得经验、金钱和帮贡，不同任务还有额外奖励"]],
	//高手进阶
	[["消灭山贼","人物等级>=30级#e每天整点，在随机野外地图刷出10只山贼，至少3人组队才能与山贼战斗，打败山贼获得大量的经验和金钱奖励，并有较大几率获得藏宝图。"],
	["封印叔叔","在挖宝时，有一定几率挖出妖怪叔叔，玩家组队去封印妖怪叔叔，会获得稀有的宝石和大量的经验金钱。"],
	["挑战嚣张","每天系统会在城市中刷新出4种嚣张妖怪（有点嚣张、比较嚣张、很嚣张、太嚣张）每种怪物每天可挑战一次，挑战成功，有几率获取丰厚的奖励（如高级宠物技能包）"],
	["门派闯关","每周二20:00点在[咸阳]或[临淄]的[门派活动使者]处领取任务，然后根据任务挑战门派护卫。每闯过一关都有丰厚的奖励，闯关速度最快的队伍更有高等级稀有宝石领取。"],
	["保卫西阳","每周三20:00点在大禹水道，平原山陵，函谷关，太行山四个地图刷新怪物向西阳城进攻，玩家阻挡怪物，阻止怪物进入西阳城，打败怪物会获得丰厚的奖励，保卫西阳城成功，在西阳城更有稀有宝箱出现。"],
	["比武大会","每周五中午12点~周六中午12点，玩家可以在[咸阳]的[比武接引人]报名，周六和周日下午13点~15点之间分别进行两场比武，比武获胜方可领取宝箱，即使失败也有其他丰厚奖励"],
	["帮派之战","每周五，周六，周日的19点~20点在[咸阳]的[帮战接引先锋]处进入帮战场地（帮主需提前报名），获胜帮派的成员将会获得100点帮贡和大量经验，并在帮战场地内刷出大量宝箱"],
	["战队竞技","在[咸阳]的[神威将军]处创建战队后，战队队长可以挑战比自己排名高的战队，挑战胜利可以提升战队排名。排名越靠前，战队每日声望增长越多"],
	["战队秘境","战队队长可在[咸阳]的[神威将军]处开启秘境，需要消耗战队声望，战队秘境里掉落大量的稀有道具，以及宠物进阶所必须的封印兽魂"],
	["副本挑战","人物等级>=40级#e在[咸阳]的[副本官]处创建自己的副本，也可申请加入其他玩家创建的副本。副本会掉落大量的稀有物品道具。"],
	["跑环","人物等级>=50级#e在[郢城]的[吉祥]处领取跑环任务，完成跑环任务可获得大量经验快速升级，每50环还可获得相应等级的装备图纸和手艺。"],
	["师徒任务","在[临淄]的[慎到]处拜师或收徒，师徒二人组队在慎到处领取师徒任务，任务会给与大量的经验和金钱奖励。徒弟出师后，师傅可获得宠物修炼积分"]],
	//门派介绍
	[["剑侠居","要求种族：人族#e门派特色：物理攻击型，具有超高物理输出、点杀能力。 #e推荐加点：5力、4力1敏、4力1体。#e●剑侠居算是最热门的一个门派，容易上手，输出可观，是练级不可缺少的一员，相对的装备也比较贵，后期的剑侠居，拥有较高的暴击率，在竞技玩法中更是点杀的一大利器。"],
	["茅棚坞","要求种族：人族#e门派特色：辅助型，具有高速度和强大的封印能力。 #e推荐加点：3敏2体、2敏3体、2敏2体1耐。#e●引以为傲的是速度，同样配置的情况下，先出手的绝对是茅棚，速度决定了竞技玩法的主动权，轮轴术也能很好的利用在卡敏战术中，迷雾让己方的胜率几率更大化，练级时，一个奇谋也能加快脚步。"],
	["庐医崖","要求种族：人族#e门派特色：辅助型、具有强大的加血和救人技能。#e推荐加点：3体2耐、2体2耐1法、2体2敏1耐。#e●作为七国里唯一的纯奶妈，具有强大的加血技能和救人技能，是各种高端任务、活动，竞技玩法不可缺少的一员。"],
	["溶洞","要求种族：魔族#e门派特色：法术攻击型，具有最高法系伤害。#e推荐加点：5法、4法1体#e●输出比封神高，但是目标数量比封神少，总伤害算起来反而不如封神了，不过做为七国的两大法系门派，溶洞更注重于多手段控制，相比封神来说没那么单调。"],
	["鬼谷","要求种族：魔族#e门派特色：辅助型，具有强大的封印和解封技能。#e推荐加点：3敏2体、2敏3体。#e●作为封系，鬼谷最大的特点就是可以为己方解封，还有增加封印几率的增益，在竞技玩法中也是一大强将。"],
	["武安阁","要求种族：魔族#e门派特色：物理攻击型、具有强大的物理攻击能力。#e推荐加点：5力、4力1敏、4力1体。#e●两大物理伤害的武安阁，点杀能力一点都不比剑侠居低，乱舞后还不用休息，单缺点就是太消耗蓝，续航能力不足。在竞技玩法和练级中，与剑侠居有同等的地位。"],
	["封神台","要求种族：仙族#e门派特点：法术伤害型、具有强大群秒技能#e推荐加点：5法、4法1体#e●两大法系之一，练级最受欢迎的门派，当然你要有一定的装备，不然小心免费回城。七国里的怪物理攻击较高，所以很多玩家都注重于物理防御，导致在竞技玩法中，法系的输出也相当的可观。"],
	["仙人洞","要求种族：仙族#e门派特点：辅助攻击型，具有固定伤害和持续恢复，以及各种增益。#e推荐加点：3体2耐、2体2耐1速#e●在前期，玩家伤害普遍不高，血量也低的时候，仙人洞的固定伤害就是一大利器，又肉又能输出，是前期练级最重要的一员。"],
	["神女峰","要求种族：仙族#e门派特点：辅助攻击型，具有单体高伤、复活、持续蓝恢复、封印#e推荐加点：4力1体、3力2法(攻击型)、3体2耐(辅助型)#e●神女是又能输出又能复活又能封的门派，绝对可以省下奶妈与控制的位置，多加一个输出，大大加快练级速度。"]],
	//实力提升
	[["人物升级",""],
	["装备打造",""],
	["修炼提升",""],
	["宠物进阶",""],
	["坐骑养成",""]],
	//辅助能力
	[["辅助技能",""],
	["剧情技能",""],
	["家园种植",""]],
];

PromptActivity.Open=function( pls)
	{
		var pa;
		if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
		if(XStat.gi().iXStat==XStat.GS_PROMPTACTIVITY)pa=XStat.gi().LastStat(0);
		else pa=XStat.gi().PushStat(XStat.GS_PROMPTACTIVITY);

		var i=0;
		while(true)
		{
			if(pls.GetNextByte()==0)break;
			pa.alist[i].sName=pls.GetNextString();
			pa.alist[i].proc=pls.GetNextByte();
			pa.alist[i].max=pls.GetNextByte();
			pa.alist[i].add=pls.GetNextByte();
			pa.alist[i].sDetail=pls.GetNextString();
			i++;
		}
		pa.iACount=i;
		pa.iNumber=pls.GetNextShort();
		pa.iAPPoint=pls.GetNextByte();//当前礼品指向
		pa.iAPCount=pls.GetNextByte();//礼品包数量
		for(i=0;i<pa.iAPCount;i++)
		{
			pa.aprice[i].iNeed=pls.GetNextShort();
			pa.aprice[i].iExp=pls.GetNextInt();
			pa.aprice[i].iMoney=pls.GetNextInt();
			
			pa.aprice[i].tid1=pls.GetNextShort();
			pa.aprice[i].tcount1=pls.GetNextByte();
			pa.aprice[i].tid2=pls.GetNextShort();
			pa.aprice[i].tcount2=pls.GetNextByte();
		}
		pa.iTodayWeek=pls.GetNextByte();
		pa.iTodayDay=pls.GetNextByte();
		pa.iMaxDay=pls.GetNextByte();
		pa.iMonth=pls.GetNextByte();
//		pa.iTodayDay=20;
//		pa.iMaxDay=31;
//		pa.iMonth=3;
//		GmPlay.sop("iweek="+pa.iWeek);
	}

PromptActivity._SPECIALDAY=[1,3,7,10,15,20,28];
PromptActivity._SPECIALTID=[ ];
PromptActivity.aa_specialframe=null;
PromptActivity.aa_specialframe2=null;

PromptActivity._ALable=[["活","跃"],
		["活","动"],
		["签","到"],
		["玩","法"]
];

