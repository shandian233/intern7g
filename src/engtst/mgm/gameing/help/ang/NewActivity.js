
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
import XmsEngine from "../../../../../engine/xms/XmsEngine"
import X10_NUMBER from "../../../../../engine/xms/first/X10_NUMBER"
import X30_WORD from "../../../../../engine/xms/first/X30_WORD"
import X40_CLASS from "../../../../../engine/xms/first/X40_CLASS"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../../engtst/mgm/MyAI"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"

import WeeklyActivity from "./WeeklyActivity"
import ShowActivityDetail from "./ShowActivityDetail"

class _ACTLIST
{
//	public String sName;
//	public int proc,max,add;
constructor()
{

}
}

class _ACTPRICE
{
//	public int iNeed;
//	public int iExp,iMoney;
//	public int tid1,tcount1,tid2,tcount2;
constructor()
{

}
}

export default class NewActivity extends BaseClass{
	constructor( xani)
	{
		super();
		this.sKeyName=["青铜钥匙","白银钥匙","黄金钥匙"];
		this.iRoundSpeed=5;
		this.bwaiting=false;
		var i;
		this.iW=1130;
		this.iH=600;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.iPage=0;
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_page=new Array(2);//
		for(i=0;i<2;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
		}
		
		this.i0Sort=0;
		this.btn0_sort=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.btn0_sort[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn0_sort[i].InitButton("选择按钮145_56");
		}
		this.btn0_sort[0].sName="日常活动";
		this.btn0_sort[1].sName="定时活动";
		this.btn0_sort[2].sName="活动周历";
		this.btn0_sort[3].sName="幸运转盘";
		this.btn0_sort[4].sName="实力提升";
		
		this.btn_getact=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn_getact[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_getact[i].bSingleButton=true;
		}
		this.btn_sign=new Array(31);//
		this.pc_price=new Array(31);//
		for(i=0;i<31;i++)
		{
			this.btn_sign[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_sign[i].bSingleButton=true;
		}
		
		var pc= XmsEngine.pxe.FindMain("七国");
		this.pc_act=pc.FindFirst("活动界面资料", 5);
		
		this.btn0_go=new Array(32);//
		this.btn0_detail=new Array(32);//
		this.alist=new Array(32);//
		this.aprice=new Array(32);//
		for(i=0;i<32;i++)
		{
			this.btn0_go[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn0_go[i].InitButton("普通按钮100_55");
			this.btn0_go[i].sName="前往";
			
			this.btn0_detail[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn0_detail[i].bSingleButton=true;
			
			this.alist[i]=new _ACTLIST();
			this.aprice[i]=new _ACTPRICE();
		}
		this.i0GoToNpcIdList=new Int32Array(32);//
		this.pc_detail=new Array(32);//
		this.sExtShow=new Array(32);//
		this.b0LockScroll=false;
		this.i0OffY=0;
		
		this.ishowdetail=-1;
		this.gd=new Goods();
		
		this.btn_extbuy=new XButtonEx2(GmPlay.xani_button);
		this.btn_extbuy.InitButton("普通按钮100_55");
		this.btn_extbuy.sName="购买";
		
		this.btn_extsign=new XButtonEx2(GmPlay.xani_button);
		this.btn_extsign.InitButton("选择按钮145_56");
		this.btn_extsign.sName="补签";
		
		this.iShowGet=-1;
		this.btn_gift=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_gift.InitButton("礼包按钮");
		this.btn_gift.sName="领  取";
		
		this.btn_watchprice=new Array(16);//
		for(i=0;i<16;i++)
		{
			this.btn_watchprice[i]=new XButtonEx2(GmPlay.xani_ui2);
			this.btn_watchprice[i].bSingleButton=true;
		}
		
		this.aa_point=GmPlay.xani_skills[0].InitAnimaWithName("物品突出", null);
		
		this.btn_lottery=new Array(3);//
		this.iKeyCount=new Int32Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_lottery[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_lottery[i].InitButton("抽奖小按钮167_183");
		}
	}

	 findactbyname( name)
	{
		var i;
		for(i=0;i<this.iActCount;i++)
		{
			if(this.alist[i].sName==name)return this.alist[i];
		}
		return null;
	}
	lottery_startround( d)
	{
		this.iLotteryResult=d-1;//抽奖结果
		EasyMessage.easymsg.Clear();
		EasyMessage.easymsg.bDisable=true;//屏蔽物品获得显示
		NewActivity.iLotteryRound=NewActivity.iLotteryRound%16;
		NewActivity.iRoundDest=16+16+16+this.iLotteryResult;
		this.iRoundSpeed=1;
		this.iRoundDelay=this.iRoundSpeed;
	}
	
	draw_lottery( offx, offy)
	{
		this.iRoundDelay--;
		if(this.iRoundDelay<=0)
		{
			if(NewActivity.iLotteryRound<NewActivity.iRoundDest)
			{
				if(NewActivity.iRoundDest-NewActivity.iLotteryRound<15)
				{
					this.iRoundSpeed++;
				}
				NewActivity.iLotteryRound++;
			}
			else if(this.iLotteryResult>=0)
			{
				this.iLotteryResult=-1;
				EasyMessage.easymsg.bDisable=false;
				this.bwaiting=false;
			}
			this.iRoundDelay=this.iRoundSpeed;
		}
		var i;
		var pc=this.pc_act.FindClass("抽奖物品");
		pc=pc.pca.phead;
		var pn_x,pn_y;
		var pn_gid;
		var pw_detail;
		var pc_show=null;
		var showx=0,showy=0;
		var BW=119+19;
		var BH=85+13;
		var xx,yy;
		this.iCjCount=0;
		while(pc!=null)
		{
			pn_x=pc.FindNumber("x");
			pn_y=pc.FindNumber("y");
			pn_gid=pc.FindNumber("物品id");
			pw_detail=pc.FindWord("物品描述");
			xx=offx+20+pn_x.iNumber*BW;
			yy=offy+20+pn_y.iNumber*BH;
			GmPlay.xani_frame.DrawAnima(xx, yy, "抽奖物品框119_85", 0);
			GmPlay.xani_ngoods.DrawAnima_aa(xx+(119-80)/2, yy+(85-80)/2, GmPlay.de_goods.strValue(pn_gid.iNumber, -1, 10),0);
			if(NewActivity.iLotteryRound%16==this.iCjCount)
			{
				DrawMode.frame_type2("黄色透明框a25_25", xx, yy, 119, 85, 25, 25);//选中
			}
	//		GmPlay.sop(""+this.iCjCount);
			this.btn_watchprice[this.iCjCount].Move(xx, yy, 119, 85);
			if(this.ishowdetail==this.iCjCount)
			{
				pc_show=pc;
				showx=xx;
				showy=yy;
			}
			pc=pc.pdown;
			this.iCjCount++;
		}
		for(i=0;i<3;i++)this.iKeyCount[i]=0;
		for(i=0;i<20;i++)
		{
			if(MyGoods.gi().goods[2][i].iGid>0)
			{
				if(MyGoods.gi().goods[2][i].iTid==386)this.iKeyCount[0]+=MyGoods.gi().goods[2][i].iCount;
				if(MyGoods.gi().goods[2][i].iTid==387)this.iKeyCount[1]+=MyGoods.gi().goods[2][i].iCount;
				if(MyGoods.gi().goods[2][i].iTid==388)this.iKeyCount[2]+=MyGoods.gi().goods[2][i].iCount;
			}
		}
		for(i=0;i<3;i++)
		{
			xx=offx+20+BW+(167+15)*i;
			yy=offy+20+BH;
			this.btn_lottery[i].Move(xx,yy, 167, 183);
			this.btn_lottery[i].Draw();
			GmPlay.xani_ngoods.DrawAnima_aa(xx+167/2-40, yy+183/2-40-30, this.sKeyName[i],0);
			//根据背包中钥匙数量
			M3DFast.gi().DrawText_2(xx+167/2, yy+183/2+40, ""+this.iKeyCount[i], 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		//M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2-30, "抽   奖", 0xffffff00, 80, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		}
//		if(this.iActNumber>=45 && (GmMe.me.iFlag[24]&32768)==0)
//		{
//			M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "本次抽奖免费", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//		}
//		else
//		{
//			i=(GmMe.me.iFlag[61]/100000)%10;
//			switch(i)
//			{
//			case 0:
//				M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "本次抽奖需花费5万游戏币", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//				break;
//			case 1:
//				M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "本次抽奖需花费10万游戏币", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//				break;
//			case 2:
//				M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "本次抽奖需花费20元宝", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//				break;
//			case 3:
//				M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "本次抽奖需花费40元宝", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//				break;
//			case 4:
//				M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "本次抽奖需花费80元宝", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//				break;
//			default:
//				M3DFast.gi().DrawText_2(offx+20+BW+533/2, offy+20+BH+183/2+50, "当日抽奖次数已用完", 0xffffff00, 30, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
//				break;
//			}
//		}
		
		if(this.ishowdetail>=0 && pc_show!=null)
		{
			pn_gid=pc_show.FindNumber("物品id");
			pw_detail=pc_show.FindWord("物品描述");
			if(pw_detail !=null)
			{
				GoodsDraw.new_DrawDetailEx1(pn_gid.iNumber,showx,showy,pw_detail.pword);
			}
			else
			{
				this.gd.SetAtt(0, pn_gid.iNumber, 1, 0, 0, 0, 0, 0, 0, 0, 0);
				GoodsDraw.new_DrawDetail(this.gd,showx,showy,0);
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
			n=offy+100//+p%2/2*100;
			
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
			n=offy+100//+p%2/2*100;
			
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
			n=offy+100+1*100;
			
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
			n=offy+100+1*100;
			
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
	Draw()
	{
		if(XStat.gi().FindStat(XStat.GS_WEEKLYACTIVITY)!=null)return;
		var i;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "活", "动");

		for(i=0;i<2;i++)
		{
			this.btn_page[i].Move(this.iX+this.iW-15, this.iY+40+130*i, 50, 130);
			if(this.iPage==i)this.btn_page[i].bMouseDown=true;
			this.btn_page[i].Draw();
			if(i==0)DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+40+130*i, 40, 80,this.iPage==i,"日","常","活","动");
			else DrawMode.new_lableword2(this.iX+this.iW-15, this.iY+40+130*i, 40, 130,this.iPage==i,"签","到");
		}
		this.btn_close.Draw();
		
		this.Draw_act(this.iX+35, this.iY+this.iH-90);
		
		switch(this.iPage)
		{
		case 0://日常活动
			this.Draw_0();
			break;
		case 1://签到
			this.Draw_1();
			break;
		}
		
		if(this.iShowGet>=0)
		{
			this.draw_get(this.iShowGet);
		}
	}
	 Draw_1()
	{
		var i,k;
		var xx,yy;
		var offx,offy,offw,offh;
		offx=this.iX+30;
		offy=this.iY+30;
		offw=200;
		offh=420;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		M3DFast.gi().DrawTextEx(offx+100, offy+40, "最新动态", 0xff003e57, 30, 101, 1, 1, 0, -2, -2);
		
		offx+=offw+20;
		offw=630;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		this.iR0X=offx;
		this.iR0Y=offy;
		this.iR0W=offw;
		this.iR0H=offh;
		
		var pc;
		var pn_gid;
		var pw_detail;
		
		pc=this.pc_act.FindClass("签到奖励");
		pc=pc.pca.phead;
		
		this.i0Count=0;
		M3DFast.gi().SetViewClip(offx+20, offy+20, offx+offw-20, offy+offh-20);
		GmPlay.sop(""+this.iSignCount);
		while(pc!=null)
		{
			pn_gid=pc.FindNumber("物品id");
			pw_detail=pc.FindWord("描述");
			
			xx=offx+25+(this.i0Count%6)*100;
			yy=offy+20+parseInt(this.i0Count/6)*100-this.i0OffY;
			//格子,图标
			GmPlay.xani_nui3.DrawAnima(offx+25+(this.i0Count%6)*100,offy+20+parseInt(this.i0Count/6)*100-this.i0OffY, "物品格子",0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+25+(this.i0Count%6)*100,offy+20+parseInt(this.i0Count/6)*100-this.i0OffY, GmPlay.de_goods.strValue(pn_gid.iNumber, 0, 10),0);
			
			if(this.i0Count<this.iSignCount)M3DFast.gi().FillRect_2D(xx,yy,xx+80,yy+80, 0x80000000);//阴影
			else if(this.i0Count==this.iSignCount)
			{
				if((GmMe.me.iFlag[50]&(1<<(this.iTodayDay-1)))==0)
				{//今日未签提示
					this.aa_point.Draw(xx, yy);
					this.aa_point.NextFrame();
					//DrawMode.frame_type2("黄色透明框a25_25", xx, yy, 80, 80, 25, 25);//选中
				}
				//else M3DFast.gi().FillRect_2D(xx,yy,xx+80,yy+80, 0x80000000);//阴影
			}
			if(this.ishowdetail==this.i0Count)
			{//选中效果
				DrawMode.frame_type2("黄色透明框a25_25", xx, yy, 80, 80, 25, 25);//选中
			}
			this.pc_price[this.i0Count]=pc;
			this.btn_sign[this.i0Count].Move(offx+25+(this.i0Count%6)*100,offy+20+parseInt(this.i0Count/6)*100-this.i0OffY, 80,80);
			
			pc=pc.pdown;
			this.i0Count++;
			if(this.i0Count>=this.iMaxDay)break;
		}
		M3DFast.gi().NoClip();
		this.i0OffH=parseInt((this.i0Count+5)/6)*100-offh+40;
		if(this.i0OffH<0)this.i0OffH=0;
		
		offx+=offw+20;
		offw=200;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		if(GmMe.me.iFlag[20]>0)this.iExtSignCount=5-(GmMe.me.iFlag[62]/10000)%10;//vip
		else this.iExtSignCount=0;
		this.iExtSignCount+=Math.floor((GmMe.me.iFlag[62]/1000)%10);
		
		if((this.ishowdetail<0 && ((this.iTodayDay-1)%6)==1) || (this.ishowdetail>=0 && (this.ishowdetail%6)==1))
		{//指向储备，vip额外得到双倍
			M3DFast.gi().DrawTextEx(offx+100, offy+40, "会员专属", 0xff003e57, 30, 101, 1, 1, 0, -2, -2);
			
			GmPlay.xani_nui3.DrawAnima(offx+100-40,offy+40+40, "物品格子",0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+100-40,offy+40+40, GmPlay.de_goods.strValue(118, 0, 10),0);

			M3DFast.gi().DrawTextEx(offx+100, offy+40+40+80+40, "签到额外获得", 0xff003e57, 25, 101, 1, 1, 0, -2, -2);
		}
		else if((this.ishowdetail<0 && ((this.iTodayDay-1)%6)==3) || (this.ishowdetail>=0 && (this.ishowdetail%6)==3))
		{//指向传送，vip可40元宝购买高级仙灵果
			M3DFast.gi().DrawTextEx(offx+100, offy+40, "会员折扣", 0xff003e57, 30, 101, 1, 1, 0, -2, -2);
			
			GmPlay.xani_nui3.DrawAnima(offx+100-40,offy+40+40, "物品格子",0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+100-40,offy+40+40, GmPlay.de_goods.strValue(161, 0, 10),0);

			M3DFast.gi().DrawTextEx(offx+100, offy+40+40+80+40, "40元宝", 0xff003e57, 25, 101, 1, 1, 0, -2, -2);

			//购买
			this.btn_extbuy.Move(offx+50, offy+40+40+80+40+25+20, 100, 55);
			this.btn_extbuy.Draw();
		}
		else
		{//正常显示
//			FormatString.gi().Format("#c003e57VIP拥有5次当月补签次数，连续签到七天可获得一次党羽补签次数，每天只能补签一次", 165, 20);
			FormatString.gi().FormatEx("#c003e57会员拥有5次当月补签次数，连续签到七天可获得一次当月补签次数，每天只能补签一次", 165, 20, 0, 0, 25);
			FormatString.gi().Draw(offx+20, offy+20);
			
			M3DFast.gi().DrawTextEx(offx+20, offy+20+FormatString.gi().iH+40, "累计签到"+this.iSignCount+"天", 0xff003e57, 20, 101, 1, 1, 0, 0, -2);
			M3DFast.gi().DrawTextEx(offx+20, offy+20+FormatString.gi().iH+40+40, "连续签到"+(GmMe.me.iFlag[62]%10)+"天", 0xff003e57, 20, 101, 1, 1, 0, 0, -2);

			M3DFast.gi().DrawTextEx(offx+20, offy+20+FormatString.gi().iH+40+80, "剩余补签次数"+this.iExtSignCount+"次", 0xff003e57, 20, 101, 1, 1, 0, 0, -2);
		}
		this.btn_extsign.Move(offx+100-145/2, offy+offh-30-56, 145, 56);
		this.btn_extsign.Draw();
		
		if(this.ishowdetail>=0)
		{
			pn_gid=this.pc_price[this.ishowdetail].FindNumber("物品id");
			pw_detail=this.pc_price[this.ishowdetail].FindWord("描述");
			if(pw_detail!=null)
			{
//				GmPlay.sop(""+(this.iX+30+220+25+(this.ishowdetail%6)*100)+""+(this.iY+30+20+(this.ishowdetail/6)*100-this.i0OffY));
				GoodsDraw.new_DrawDetailEx1(pn_gid.iNumber,this.iX+30+220+25+(this.ishowdetail%6)*100,this.iY+30+20+parseInt(this.ishowdetail/6)*100-this.i0OffY,pw_detail.pword);
			}
			else
			{
				this.gd.SetAtt(0, pn_gid.iNumber, 1, 0, 0, 0, 0, 0, 0, 0, 0);
				GoodsDraw.new_DrawDetail(this.gd,this.iX+30+220+25+(this.ishowdetail%6)*100,this.iY+30+20+parseInt(this.ishowdetail/6)*100-this.i0OffY,0);
			}
		}
	}
	 Draw_act( offx, offy)
	{
		var i,x;
		var w=this.iW-150-6;//实际长度
		var maxact=120;//全部完成
		M3DFast.gi().DrawText_2(offx,offy, "活跃度", 0xff003e57, 25, 101, 1, 1, 0, 0, -2, 1, 0xff000000);
		offx+=80;
		DrawMode.frame_type1("活跃进度外框a20_24", offx,offy-12,this.iW-150, 20);
		DrawMode.frame_type1("活跃进度内框a10_18", offx+3,offy-12+3,this.iActNumber*w/maxact, 10);
		M3DFast.gi().DrawTextEx(offx+w-5,offy, ""+this.iActNumber, 0xffffffff, 20, 101, 1, 1, 0, -3, -2);
		for(i=0;i<6;i++)
		{
			x=offx+3+w*(15*(i+1))/maxact;
			if(this.iActNumber>=15*(i+1))GmPlay.xani_nui2.DrawAnima(x-50, offy-50, "礼品包包",i);
			else GmPlay.xani_nui2.DrawAnima(x-50, offy-50, "礼品包包",6);
			this.btn_getact[i].Move(x-50, offy-50, 100,100);
			
			M3DFast.gi().DrawText_2(x,offy+35, (15*(i+1))+"活跃", 0xffffff00, 25, 101, 1, 1, 0, -2, 0, 3, 0xff000000);
			
			if(i<this.iActGetPoint)GmPlay.xani_nui6.DrawAnima(x-50, offy-25, "已领取", 0);
		}
	}
	 Draw_0_lable( x, y, name, actnum, count, btn, btnicon)
	{
		DrawMode.frame_type1("活跃标签框a10_84", x,y,400, 10);
		GmPlay.xani_frame.DrawAnima(x+5, y+5, "活跃图标框73_73",0);
		GmPlay.xani_icon.DrawAnima_aa(x+5, y+5, name, 0);
//		DrawMode.frame_type4("语音输入背景20_20", x, y, 400, 90, 20, 20);
		M3DFast.gi().DrawText_2(x+85, y+26, name, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 2, 0xff000000);
		M3DFast.gi().DrawTextEx(x+85, y+64, actnum+"   "+count, 0xffffffff, 18,101, 1, 1, 0, 0, -2);
		if(btn!=null)
		{
			btn.Move(x+400-100-20, y+84/2-55/2, 100, 55);
			btn.Draw();
		}
		btnicon.Move(x+5, y+5, 73, 73);
	}

	 Draw_0()
	{
		var i;
		var offx,offy,offw,offh;
		offx=this.iX+30;
		offy=this.iY+30;
		offw=850;
		offh=420;
		DrawMode.new_framein(offx,offy,offw,offh);
		this.iR0X=offx;
		this.iR0Y=offy;
		this.iR0W=offw;
		this.iR0H=offh;
		
		var pc;
		var pn_openlev;
		var pn_maxact;
		var pw_countunit;
		var pn_maxcount;
		var pn_gotonpcid;
		
		var sact;
		var scount;
		var pa;

		this.i0Count=0;
		if(this.i0Sort==0 || this.i0Sort==1 || this.i0Sort==4)
		{//日常活动
			if(this.i0Sort==0)pc=this.pc_act.FindClass("日常活动列表");
			else if(this.i0Sort==1)pc=this.pc_act.FindClass("定时活动列表");
			else if(this.i0Sort==4)pc=this.pc_act.FindClass("实力提升");
			else return;
			pc=pc.pca.phead;
			M3DFast.gi().SetViewClip(offx+20, offy+20, offx+offw-20, offy+offh-20);
			while(pc!=null)
			{
				pn_openlev=pc.FindNumber("开启等级");
				if(pn_openlev.iNumber>GmMe.me.rbs.iLev)
				{
					pc=pc.pdown;
					continue;
				}
				pn_maxact=pc.FindNumber("活跃上限");
				pw_countunit=pc.FindWord("次数单位");
				pn_maxcount=pc.FindNumber("次数上限");
				pn_gotonpcid=pc.FindNumber("前往npcid");
				pa=this.findactbyname(pc.sName);
				
				if(pn_maxact!=null && pa!=null)sact="活跃 "+pa.add+"/"+pn_maxact.iNumber;
				else sact="";
				if(pw_countunit!=null && pa!=null)
				{
					scount=pw_countunit.pword+" "+pa.proc+"/"+pn_maxcount.iNumber;
					this.sExtShow[this.i0Count]=pa.proc+"/"+pn_maxcount.iNumber;
				}
				else
				{
					scount="";
					this.sExtShow[this.i0Count]="";
				}
				if(pn_gotonpcid!=null)this.i0GoToNpcIdList[this.i0Count]=pn_gotonpcid.iNumber;
				
				this.Draw_0_lable(offx+20+(this.i0Count%2)*410,offy+25+parseInt(this.i0Count/2)*100-this.i0OffY,pc.sName,sact,scount,pn_gotonpcid==null?null:this.btn0_go[this.i0Count],this.btn0_detail[this.i0Count]);
				this.pc_detail[this.i0Count]=pc;
				
				pc= pc.pdown;
				this.i0Count++;
			}
			M3DFast.gi().NoClip();
			this.i0OffH=(this.i0Count+1)/2*100-offh+40;
			if(this.i0OffH<0)this.i0OffH=0;
		}
		if(this.i0Sort==3)
		{
			this.draw_lottery(offx,offy);
		}
		
		offx+=offw+20;
		offw=200;
		DrawMode.new_framein(offx,offy,offw,offh);
		
		for(i=0;i<5;i++)
		{
			this.btn0_sort[i].Move(offx+(200-145)/2, offy+30+i*75, 145, 56);
			if(this.i0Sort==i)this.btn0_sort[i].bMouseDown=true;
			this.btn0_sort[i].Draw();
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		
		if(this.iShowGet>=0)
		{
			var offw,offh,offx,offy;
			offw=465;
			offh=381;
			offx=(GmConfig.SCRW-offw)/2;
			offy=(GmConfig.SCRH-offh)/2;
			if(msg==3 && !XDefine.bInRect(x, y,offx,offy,offw,offh))this.iShowGet=-1;
			if(this.btn_gift.ProcTouch(msg, x, y))
			{
				if(this.btn_gift.bCheck())
				{
					if(this.iActNumber<this.aprice[this.iShowGet].iNeed)EasyMessage.easymsg.AddMessage("活跃度未达不能领取");
					else if(this.iShowGet<this.iActGetPoint)EasyMessage.easymsg.AddMessage("此档奖励已领过");
					else if(this.iShowGet>this.iActGetPoint)EasyMessage.easymsg.AddMessage("按顺序领取奖励");
					else GmProtocol.gi().s_PromptActivity(1, this.iShowGet);
					this.iShowGet=-1;
				}
			}
			return true;
		}
		
		var pn_npcid;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<2;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
					this.iPage=i;
					this.i0OffY=0;
					this.ishowdetail=-1;
					NewActivity.iLotteryRound=NewActivity.iRoundDest;
				}
			}
		}
		for(i=0;i<6;i++)
		{
			if(this.btn_getact[i].ProcTouch(msg, x, y))
			{
				if(this.btn_getact[i].bCheck())
				{
					this.iShowGet=i;
				}
				return true;
			}
		}
		switch(this.iPage)
		{
		case 0:
			for(i=0;i<5;i++)
			{
				if(this.btn0_sort[i].ProcTouch(msg, x, y))
				{
					if(this.btn0_sort[i].bCheck())
					{
						if(i==2)WeeklyActivity.Open(this.pc_act.FindClass("周历"));
						else
						{
							this.i0Sort=i;
							this.i0OffY=0;
							this.ishowdetail=-1;
							NewActivity.iLotteryRound=NewActivity.iRoundDest;
						}
					}
//					return true;
				}
			}
			switch(this.i0Sort)
			{
			case 0:
			case 1:
			case 4:
				if(this.b0LockScroll)
				{
					if(msg==2)
					{
						this.i0OffY+=(this.i0LockY-y);
						this.i0LockY=y;
						if(this.i0OffY<0)this.i0OffY=0;
						if(this.i0OffY>this.i0OffH)this.i0OffY=this.i0OffH;
//						GmPlay.sop(""+this.i0OffY+"=="+this.i0OffH);
					}
					if(msg==3)this.b0LockScroll=false;
					return true;
				}
				if(XDefine.bInRect(x, y, this.iR0X, this.iR0Y, this.iR0W, this.iR0H))
				{
					for(i=0;i<this.i0Count;i++)
					{
						if(this.btn0_go[i].ProcTouch(msg, x, y))
						{
							if(this.btn0_go[i].bCheck())
							{//前往this.i0GoToNpcIdList[i];
								pn_npcid=this.pc_detail[i].FindNumber("前往npcid");
								if(pn_npcid!=null)
								{
									XStat.gi().PopStat(1);
									if(pn_npcid.iNumber==10000)
									{
										MyAI.gi().FindNpc(GameData.iMasterids[GmMe.me.rbs.iSchoolId], true, true);
									}
									else MyAI.gi().FindNpc(pn_npcid.iNumber, true, true);
								}
							}
							return true;
						}
						if(this.btn0_detail[i].ProcTouch(msg, x, y))
						{
							if(this.btn0_detail[i].bCheck())
							{//打开详细this.pc_detail[i]
								ShowActivityDetail.Open(this.pc_detail[i],this.i0Sort,this.sExtShow[i]);
							}
							return true;
						}
					}
					if(msg==1)
					{
						this.b0LockScroll=true;
						this.i0LockY=y;
					}
				}

				break;
			case 3://抽奖
				this.ishowdetail=-1;
				for(i=0;i<this.iCjCount;i++)
				{
					if(this.btn_watchprice[i].ProcTouch(msg, x, y))
					{
						if(this.btn_watchprice[i].bCheck())
						{
							this.ishowdetail=i;
						}
						return true;
					}
				}
				if(!this.bwaiting)
				{
					for(i=0;i<3;i++)
					{
						if(this.btn_lottery[i].ProcTouch(msg, x, y))
						{
							if(this.btn_lottery[i].bCheck())
							{//点击抽奖按钮
								if(i==1 && ((GmMe.me.iFlag[63]>>8)&0xf)>=5)EasyMessage.easymsg.AddMessage("今日已使用过5次白银钥匙");
								else if(i==2 && ((GmMe.me.iFlag[63]>>12)&0xf)>=5)EasyMessage.easymsg.AddMessage("今日已使用过5次黄金钥匙");
								else if(this.iKeyCount[i]>0)
								{
									GmProtocol.gi().s_PromptActivity(6, i);
									this.iLotteryResult=-1;
									this.bwaiting=true;
								}
								else
								{
									EasyMessage.easymsg.AddMessage("背包中没有"+this.sKeyName[i]);
								}
							}
							return true;
						}
					}
				}
				break;
			}
			break;
		case 1://签到
			if((this.ishowdetail<0 && ((this.iTodayDay-1)%6)==3) || (this.ishowdetail>=0 && (this.ishowdetail%6)==3))
			{
				if(this.btn_extbuy.ProcTouch(msg, x, y))
				{
					if(this.btn_extbuy.bCheck())
					{//购买打折高级仙灵果
						if((GmMe.me.iFlag[24]&8192)!=0)EasyMessage.easymsg.AddMessage("折扣商品只能购买一次");
						else GmProtocol.gi().s_PromptActivity(4, 0);
					}
					return true;
				}
			}
			if(this.btn_extsign.ProcTouch(msg, x, y))
			{
				if(this.btn_extsign.bCheck())
				{//补签
					if(this.iExtSignCount<=0)EasyMessage.easymsg.AddMessage("当前没有剩余补签次数");
					else if((GmMe.me.iFlag[24]&16384)!=0)EasyMessage.easymsg.AddMessage("每天只能补签一次");
					else GmProtocol.gi().s_PromptActivity(3, 0);
				}
				return true;
			}
			if(msg==3)this.ishowdetail=-1;
			if(this.b0LockScroll)
			{
				if(msg==3)this.b0LockScroll=false;
				else
				{
//					GmPlay.sop("a="+this.i0LockY+",,b="+y);
					if(Math.abs(this.i0LockY-y)>=10)this.b0Scrolling=true;
					if(this.b0Scrolling)
					{
						if(msg==2)
						{
							this.i0OffY+=(this.i0LockY-y);
							this.i0LockY=y;
							if(this.i0OffY<0)this.i0OffY=0;
							if(this.i0OffY>this.i0OffH)this.i0OffY=this.i0OffH;
//							GmPlay.sop(""+this.i0OffY+"=="+this.i0OffH);
						}
						for(i=0;i<this.i0Count;i++)this.btn_sign[i].bMouseDown=false;
						return true;
					}
				}
			}
			if(XDefine.bInRect(x, y, this.iR0X, this.iR0Y, this.iR0W, this.iR0H))
			{
				for(i=0;i<this.i0Count;i++)
				{
	//				GmPlay.sop(x+",,"+y+"=="+this.btn_sign[0].iX+",,"+this.btn_sign[0].iY);
					if(this.btn_sign[i].ProcTouch(msg, x, y))
					{
						if(this.btn_sign[i].bCheck())
						{
							if(i<this.iSignCount);//阴影
							else if(i==this.iSignCount)
							{//真正签到
								if((GmMe.me.iFlag[50]&(1<<(this.iTodayDay-1)))==0)GmProtocol.gi().s_PromptActivity(2, 0);
								else this.ishowdetail=i;
							}
							else this.ishowdetail=i;
						}
					}
				}
				if(msg==1)
				{
					this.b0LockScroll=true;
					this.b0Scrolling=false;
					this.i0LockY=y;
				}
			}
			break;
		}
		return true;
	}
}
NewActivity.iLotteryRound=0;
NewActivity.iRoundDest=0;
NewActivity.iOpenFlag=0;
NewActivity.Open=function( pls)
{
	var na;
	if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
	if(XStat.gi().iXStat==XStat.GS_PROMPTACTIVITY)na=XStat.gi().LastStat(0);
	else na=XStat.gi().PushStat(XStat.GS_PROMPTACTIVITY);

	var i=0;
	while(true)
	{
		if(pls.GetNextByte()==0)break;
		na.alist[i].sName=pls.GetNextString();
		na.alist[i].proc=pls.GetNextByte();
		na.alist[i].max=pls.GetNextByte();
		na.alist[i].add=pls.GetNextByte();
		i++;
	}
	na.iActCount=i;
	GmPlay.sop("actcount"+i);
	
	na.iActNumber=pls.GetNextShort();
	na.iActGetPoint=pls.GetNextByte();//当前礼品指向
	na.iActPriceCount=pls.GetNextByte();//礼品包数量
	for(i=0;i<na.iActPriceCount;i++)
	{
		na.aprice[i].iNeed=pls.GetNextShort();
		na.aprice[i].iExp=pls.GetNextInt();
		na.aprice[i].iMoney=pls.GetNextInt();
		
		na.aprice[i].tid1=pls.GetNextShort();
		na.aprice[i].tcount1=pls.GetNextByte();
		na.aprice[i].tid2=pls.GetNextShort();
		na.aprice[i].tcount2=pls.GetNextByte();
	}
	
	//根据flag[50]计算已签几次
	na.iSignCount=0;
	for(i=0;i<31;i++)
	{
		if((GmMe.me.iFlag[50]&(1<<i))!=0)na.iSignCount++;
	}
	na.iTodayDay=pls.GetNextByte();
	na.iMaxDay=pls.GetNextByte();
	na.iWeekDay=pls.GetNextByte();
/*		pa.iTodayWeek=pls.GetNextByte();
	pa.iMonth=pls.GetNextByte();*/
	
	if(NewActivity.iOpenFlag==1)
	{
		NewActivity.iOpenFlag=0;
		na.i0Sort=3;
	}
}