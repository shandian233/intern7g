
import DrawBuffer from "../../../../../map/DrawBuffer"
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import SortAnima from "../../../../../config/SortAnima"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import XAnima from "../../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import SystemOperate from "../../../../../engtst/mgm/gameing/fast/SystemOperate"
import AddPoint from "../../../../../engtst/mgm/gameing/me/AddPoint"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"
import MySell from "../../../../../engtst/mgm/gameing/me/shop/MySell"

import MyMounts from "./MyMounts"
import FeedMounts from "./FeedMounts"

export default class MountsFrame extends BaseClass{

	constructor( ani)
	{
		super();
		var i,j;
		
		this.iW = 830;
		this.iH = 620;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX + this.iW - 35, this.iY - 25, 60, 60);
		
		this.btn_mountslist=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_mountslist[i]=new XButton(GmPlay.xani_button);
			this.btn_mountslist[i].InitButton("2号按钮150_60");
			this.btn_mountslist[i].Move(this.iX + 50, this.iY + 50 + i * 65, 150, 60);
		}
		this.iMountsPoint=0;
		
		this.btn_joinfight=new XButtonEx2(GmPlay.xani_button);
		this.btn_joinfight.InitButton("1号按钮90_60");
		this.btn_joinfight.Move(this.iX + 270 - 70 - 30, this.iY + 65 + 200, 70, 40);
		this.btn_joinfight.sName="骑乘";
		
		this.iPage=0;
		this.btn_page=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_page[i].InitButton("2号按钮150_60");
		}
		this.btn_page[0].sName="属性";
		this.btn_page[1].sName="资质";
		this.btn_page[2].sName="技能";
		
		this.btn_drop=new XButtonEx2(GmPlay.xani_button);
		this.btn_drop.InitButton("1号按钮90_60");
		this.btn_drop.Move(this.iX+390+10,this.iY+65+80+200,70,40);
		this.btn_drop.sName="放生";
		
		this.btn_addpoint=new XButtonEx2(GmPlay.xani_button);
		this.btn_addpoint.InitButton("1号按钮90_60");
		this.btn_addpoint.Move(this.iX+390+290/2-70/2,this.iY+65+80+200,70,40);
		this.btn_addpoint.sName="加点";
		
		this.btn_train=new XButtonEx2(GmPlay.xani_button);
		this.btn_train.InitButton("1号按钮90_60");
		this.btn_train.Move(this.iX+390+290-80,this.iY+65+80+200,70,40);
		this.btn_train.sName="驯养";
		/////////////////
		this.btn_jj=new XButtonEx2(GmPlay.xani_button);
		this.btn_jj.InitButton("1号按钮90_60");
		this.btn_jj.Move(this.iX+390+10,this.iY+65+80+200,70,40);
		this.btn_jj.sName="进阶";
		
		this.btn_feed=new XButtonEx2(GmPlay.xani_button);
		this.btn_feed.InitButton("1号按钮90_60");
		this.btn_feed.Move(this.iX+390+290-80,this.iY+65+80+200,70,40);
		this.btn_feed.sName="喂食";
		
		this.aa_mts=new Array(6);//
		this.aa_bds=new Array(6);//
		this.aa_cls=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.aa_mts[i]=new AnimaAction();
			this.aa_bds[i]=new AnimaAction();
			this.aa_cls[i]=new Array(5);
			for(j=0;j<5;j++)
			{
				this.aa_cls[i][j]=new AnimaAction();
			}
		}
		this.aa_weapon=new AnimaAction();
		
		this.bChanged=true;



		MountsFrame.cur = this;   //后来添加的
	}

	ChangeColor( xb, sa, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(GmMe.me.iColor[i]<=0 || GmMe.me.iColor[i]>=6)continue;
			GmPlay.xani_color[xb][GmMe.me.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_"+sa, this.aa_cls[m][i]);
//			GmPlay.sop(""+SortAnima._CHANGECOLOR[xb][i]+"_"+sa);
		}
	}
	DrawColor( xb, frame, offy, x, y, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(GmMe.me.iColor[i]<=0 || GmMe.me.iColor[i]>=6)continue;
			this.aa_cls[m][i].iFrame=frame;
			this.aa_cls[m][i].Draw(x, y);
//			DrawBuffer.gi().DrawAnima_aa(offy,null, , );
		}
	}
	
	DrawMounts( x, y, pms, changed, withme)
	{//1鹿,2狮,3马
		var faceto="右下";
		var stat="站立";
//		if(1==1)return;
		var i;
		var xb=GmMe.me.iRace*2+GmMe.me.iSex;
		var ifaceto=GmMe.face_sti(faceto);
		var istat=GmMe.stat_sti(stat);
		var itype=pms.iTid-1;
		var ijj=pms.iJjLev-1;
//{{"前","人前","后","人后","武器"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"后","人","武器","前"},{"左翅膀","人左","身体","人右","右翅膀","武器"},{"左翅膀","人左","身体","人右","右翅膀","武器"},{"左翅膀","人左","身体","人右","右翅膀","武器"}},//二阶
//GmPlay.xani_nmounts[itype]
		var offy=0;
		var lionoff=0;
		if(pms.iTid==2)lionoff=12;
//		iMountsJjLev--;
//		GmPlay.sop("itype="+itype+",,,,ijj="+ijj+",,,,istat="+istat+",,,ifaceto="+ifaceto);
//		this.aa_mts,this.aa_bds，0up     1down      2left     ,3right        ,4middle
		for(i=0;i<SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto].length;i++)
		{
//			GmPlay.sop(i+"="+SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]);
			if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="左翅膀")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(pms.iJjLev+"_"+stat+"_"+faceto+"_左翅膀",this.aa_mts[2]);



				}



				this.aa_mts[2].Draw(x, y+lionoff);
				this.aa_mts[2].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="右翅膀")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(pms.iJjLev+"_"+stat+"_"+faceto+"_右翅膀",this.aa_mts[3]);
				}
				this.aa_mts[3].Draw( x, y+lionoff);
				this.aa_mts[3].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="前")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(pms.iJjLev+"_"+stat+"_"+faceto+"_前",this.aa_mts[0]);
				}
				this.aa_mts[0].Draw( x, y+lionoff);
				this.aa_mts[0].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="后")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(pms.iJjLev+"_"+stat+"_"+faceto+"_后",this.aa_mts[1]);
				}
				this.aa_mts[1].Draw(x, y+lionoff);
				this.aa_mts[1].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="身体")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(pms.iJjLev+"_"+stat+"_"+faceto+"_身体",this.aa_mts[4]);
				}
				this.aa_mts[4].Draw(x, y+lionoff);
				this.aa_mts[4].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="飘带")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(pms.iJjLev+"_"+stat+"_"+faceto+"_飘带",this.aa_mts[5]);
				}
				this.aa_mts[5].Draw(x, y+lionoff);
				this.aa_mts[5].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人前" && withme)
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_前",this.aa_bds[0]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_前",0);
				}
				this.aa_bds[0].Draw(x, y+lionoff);
				this.DrawColor(xb,this.aa_bds[0].iFrame,y+offy,x,y+lionoff,0);
				this.aa_bds[0].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人后" && withme)
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_后",this.aa_bds[1]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_后",1);
				}
				this.aa_bds[1].Draw(x, y+lionoff);
				this.DrawColor(xb,this.aa_bds[1].iFrame,y+offy,x,y+lionoff,1);
				this.aa_bds[1].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人左" && withme)
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_左",this.aa_bds[2]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_左",2);
				}
				this.aa_bds[2].Draw(x, y+lionoff);
				this.DrawColor(xb,this.aa_bds[2].iFrame,y+offy,x,y+lionoff,2);
				this.aa_bds[2].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人右" && withme)
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_右",this.aa_bds[3]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_右",3);
				}
				this.aa_bds[3].Draw(x, y+lionoff);
				this.DrawColor(xb,this.aa_bds[3].iFrame,y+offy,x,y+lionoff,3);
				this.aa_bds[3].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人" && withme)
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto,this.aa_bds[4]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto,4);
				}
				this.aa_bds[4].Draw(x, y+lionoff);
				this.DrawColor(xb,this.aa_bds[4].iFrame,y+offy,x,y+lionoff,4);
				this.aa_bds[4].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="武器" && withme)
			{
				if(changed)
				{
					this.iWeapTid = MyGoods.gi().GetWeaponTid();
					if(this.iWeapTid>=0)GmPlay.xani_weap[xb][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName("骑"+stat+"_"+faceto, this.aa_weapon);
				}
				if(this.iWeapTid>=0)
				{
					this.aa_weapon.Draw(x, y+lionoff);
					this.aa_weapon.NextFrame();
				}
				offy++;
			}
		}
//		iMountsJjLev++;
//		iMountsTid
//		if (pms == null) {
//			bsc = true;
//			return;
//		}
		//_ANIMASORT_MOUNT[2马][1二阶][0站立1跑步][方向][切割]
	}
	Draw()
	{
		if(MyMounts.mm.iMountsCount<=0)
		{
			XStat.gi().PopStat(1);
			return;
		}
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "坐", "骑");
		this.btn_close.Draw();

		DrawMode.new_framein(this.iX + 25, this.iY + 25, 190, this.iH - 50);
		var i;
		if(this.iMountsPoint>=MyMounts.mm.iMountsCount)this.iMountsPoint=0;
		var pms=MyMounts.mm.mounts[this.iMountsPoint];
		for(i=0;i<MyMounts.mm.iMountsCount;i++)
		{
			this.btn_mountslist[i].sName=MyMounts.mm.mounts[i].sName;
			if(this.iMountsPoint==i)
			{//选中的宠物，按钮设为按下状态
				this.btn_mountslist[i].bMouseIn=true;
				this.btn_mountslist[i].bMouseDown=true;
			}
			this.btn_mountslist[i].Draw();
		}
		
		var offx = this.iX + 25+190+20;
		var offy = this.iY + 25;
		
		DrawMode.new_framein(offx,offy, 190, this.iH - 50);
		FireworksEffect.DrawAura(0, offx + 95, offy + 240, null, 0);//坐骑
		this.btn_joinfight.Move(offx + 190 - 20 - 90, this.iY + this.iH - 50 - 60, 90, 60);
		if(GmMe.me.iFightMid==pms.iMid)
		{
			this.btn_joinfight.sName="下骑";
			this.DrawMounts(offx + 95, offy + 240, pms, this.bChanged, true);
//			aa_body.Draw(offx+120, offy+160);
//			aa_body.NextFrame();
		}
		else
		{
			this.btn_joinfight.sName="骑乘";
			this.DrawMounts(offx + 95, offy + 240, pms, this.bChanged, false);
		}
		this.bChanged=false;
		this.btn_joinfight.Draw();
		
		DrawMode.ui3_Text1(offx+10, offy+300, 70, 100, "名称", pms.sName);
		DrawMode.ui3_Text1(offx + 10, offy + 300 + 40 * 1, 70, 100, "等级", pms.iLev+ "/"+pms.iMaxLev);
		DrawMode.ui3_Text1(offx + 10, offy + 300 + 40 * 2, 70, 100, "气血", ""+pms.iMaxHp);
		DrawMode.ui3_Text1(offx + 10, offy + 300 + 40 * 3, 70, 100, "魔法", ""+pms.iMaxMp);
		
		offx = this.iX + 25 + 190 + 20+190+20;
		DrawMode.new_framein(offx, offy, 360, this.iH - 50);
		this.btn_page[this.iPage].bMouseDown=true;
		this.btn_page[this.iPage].bMouseIn=true;
		if(this.iPage==0)
		{
			MountsFrame.Draw_Base2(offx + 20, offy + 20+60+20+40, pms);

			this.btn_drop.Move(offx + 20, this.iY + this.iH - 50 - 60, 90, 60);
			this.btn_addpoint.Move(offx + 360/2-90/2, this.iY + this.iH - 50 - 60, 90, 60);
			this.btn_train.Move(offx + 360 - 20 - 90, this.iY + this.iH - 50 - 60, 90, 60);
			this.btn_drop.Draw();
			this.btn_addpoint.Draw();
			this.btn_train.Draw();
		}
		else if(this.iPage==1)
		{
			MountsFrame.Draw_Base3(offx + 20, offy + 20+60+20, pms);

			this.btn_jj.Move(offx + 20, this.iY + this.iH - 50 - 60, 90, 60);
			this.btn_feed.Move(offx + 360 - 20 - 90, this.iY + this.iH - 50 - 60, 90, 60);
			this.btn_jj.Draw();
			this.btn_feed.Draw();
		}
		this.btn_page[0].Move(offx + 20, offy + 20, 150, 60);
		this.btn_page[1].Move(offx + 360-20-150, offy + 20, 150, 60);
		for (i = 0; i<2; i++)this.btn_page[i].Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_DROPMOUNTS))
		{
			if(Confirm1.bConfirm)
			{//同意丢弃宠物
//				Mounts pms=MyMounts.mm.mounts[this.iMountsPoint];
				if(GmMe.me.bHaveLock && GmMe.me.bLocked)EasyMessage.easymsg.AddMessage("未解锁不能放生");
				else
				{
					if(GmMe.me.iFightMid==pms.iMid)
					{
						GmMe.me.iFightMid=0;
						GmMe.me.bsc=true;
					}
					GmProtocol.gi().s_DropMounts(pms.iMid);
					MyMounts.mm.RemoveMounts(pms.iMid);
					this.iMountsPoint=0;
				}
			}
		}
		if(Confirm1.end(Confirm1.CONFIRM_JJMOUNTS))
		{
			if(Confirm1.bConfirm)
			{//同意丢弃宠物
//				Mounts pms=MyMounts.mm.mounts[this.iMountsPoint];
				GmProtocol.gi().s_JJMounts(pms.iMid);
			}
		}
		
		if(AddPoint.end(AddPoint.ADDPOINT_MOUNTS))
		{
			if(AddPoint.bConfirm)
			{
				for(i=0;i<5;i++)pms.att[i]+=AddPoint.iModifys[i];
				pms.CalcFightAtt();
				GmProtocol.gi().s_AddMountsPoint(pms.iMid,AddPoint.iModifys[0],AddPoint.iModifys[1],AddPoint.iModifys[2],AddPoint.iModifys[3],AddPoint.iModifys[4]);
			}
		}
	}
	
	
	
	ProcTouch( msg, x, y)
	{
		var i;
		var pms=MyMounts.mm.mounts[this.iMountsPoint];
		if(this.iPage==0)
		{
			if(this.btn_drop.ProcTouch(msg, x, y))
			{
				if(this.btn_drop.bCheck())
				{//丢弃当前坐骑
					Confirm1.start(Confirm1.CONFIRM_DROPMOUNTS,"是否确认放生？");
				}
				return true;
			}
			if(this.btn_train.ProcTouch(msg, x, y))
			{
				if(this.btn_train.bCheck())
				{//驯养坐骑,lev*4*10*2+100
					var usexp=pms.iLev*4*10*2+100;
					if(pms.iLev>=GmMe.me.rbs.iLev)EasyMessage.easymsg.AddMessage("坐骑不能超过人物等级");
					else if(pms.iLev>=pms.iMaxLev)EasyMessage.easymsg.AddMessage("坐骑等级已达上限");
					else if(GmMe.me.rbs.iPower<10)EasyMessage.easymsg.AddMessage("体力不足10点");
					else if(GmMe.me.rbs.iExp<usexp)EasyMessage.easymsg.AddMessage("人物经验不足");
					else
					{
						GmMe.me.rbs.iExp-=usexp;
						pms.iExp+=usexp;
						GmMe.me.rbs.iPower-=10;
						GmProtocol.gi().s_TrainMounts(pms.iMid);
						XStat.gi().PushStat(XStat.GS_LOADING1);
					}
				}
				return true;
			}
			if(this.btn_addpoint.ProcTouch(msg, x, y))
			{
				if(this.btn_addpoint.bCheck())
				{
					if(pms.nut<=0)EasyMessage.easymsg.AddMessage("当前没有剩余点数可以加");
					else AddPoint.start(AddPoint.ADDPOINT_MOUNTS,pms.tz,pms.fl,pms.ll,pms.nl,pms.mj,pms.nut);
				}
			}
		}
		else if(this.iPage==1)
		{//资质页面
			if(this.btn_feed.ProcTouch(msg, x, y))
			{
				if(this.btn_feed.bCheck())
				{//喂食，打开选择物品页面
					FeedMounts.Open(pms);
				}
				return true;
			}
			if(this.btn_jj.ProcTouch(msg, x, y))
			{
				if(this.btn_jj.bCheck())
				{//进阶
					if(pms.iJjLev>=3)EasyMessage.easymsg.AddMessage("坐骑已是最高阶");
					else if(pms.iLev<pms.iMaxLev || pms.iLingQi<pms.iMaxLingQi)
					{
						FrameMessage.fm.Open("坐骑灵气和等级达到上限后才能进阶");
						//FrameMessage.fm.Open(",,"+pms.iLev+",,"+pms.iMaxLev+",,"+pms.iLingQi+",,"+pms.iMaxLingQi);
					}
					else
					{
						Confirm1.start(Confirm1.CONFIRM_JJMOUNTS,"进阶后#e#c00ff00资质上限=当前资质*110%#e成长上限=当前成长*110%#e#cffffff是否确认进阶？");
					}
				}
				return true;
			}
		}

		for(i=0;i<MyMounts.mm.iMountsCount;i++)
		{
			if(this.btn_mountslist[i].ProcTouch(msg, x, y))
			{
				if(this.btn_mountslist[i].bCheck())
				{
					this.iMountsPoint=i;
					this.bChanged=true;
				}
//				return true;
			}
		}
		if(this.btn_joinfight.ProcTouch(msg, x, y))
		{
			if(this.btn_joinfight.bCheck())
			{
				if(GmMe.me.iFightMid==pms.iMid)
				{
					GmMe.me.iFightMid=0;
					GmProtocol.gi().s_ChangeFightMounts(0);
					this.bChanged=true;
					GmMe.me.CalcFightAtt();
				}
				else
				{
					if(MySell.gi().bSelling)
					{
						EasyMessage.easymsg.AddMessage("摆摊中不能骑乘");
					}
					else
					{
						GmMe.me.iFightMid=pms.iMid;
						GmProtocol.gi().s_ChangeFightMounts(pms.iMid);
						this.bChanged=true;
						GmMe.me.CalcFightAtt();
					}
				}
				GmMe.me.bsc=true;
			}
		}
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
				}
			}
		}
		return false;
	}

}
MountsFrame.Draw_Base2=function( x, y, p)
	{
		DrawMode.ui3_Text1(x, y, 60, 90, "体质", ""+p.tz);
		DrawMode.ui3_Text1(x, y + 40 * 1, 60, 90, "法力", ""+p.fl);
		DrawMode.ui3_Text1(x, y + 40 * 2, 60, 90, "力量", ""+p.ll);
		DrawMode.ui3_Text1(x, y + 40 * 3, 60, 90, "耐力", ""+p.nl);
		DrawMode.ui3_Text1(x, y + 40 * 4, 60, 90, "敏捷", ""+p.mj);

		DrawMode.ui3_Text1(x + 170, y, 60, 90, "灵力", ""+p.iSpirit);
		DrawMode.ui3_Text1(x + 170, y + 40 * 1, 60, 90, "伤害", ""+p.iAttack);
		DrawMode.ui3_Text1(x + 170, y + 40 * 2, 60, 90, "防御", ""+p.iDefence);
		DrawMode.ui3_Text1(x + 170, y + 40 * 3, 60, 90, "速度", ""+p.iSpeed);
		DrawMode.ui3_Text1(x + 170, y + 40 * 4, 60, 90, "剩余", ""+p.nut);

		DrawMode.ui3_Text1(x , y + 40 * 6, 120, 200, "当前经验", ""+p.iExp);
		DrawMode.ui3_Text1(x , y + 40 * 7, 120, 200, "升级经验", ""+parseInt(GameData.iUpgradeExp[p.iLev] / 3));
	}
	
MountsFrame.Draw_Base3=function( x, y, p)
	{
		DrawMode.ui3_Text1(x, y + 40 * 0, 120, 200, "体质资质", p.zz[0] +"/"+p.maxzz[0]);
		DrawMode.ui3_Text1(x, y + 40 * 1, 120, 200, "法力资质", p.zz[1] +"/"+p.maxzz[1]);
		DrawMode.ui3_Text1(x, y + 40 * 2, 120, 200, "力量资质", p.zz[2] +"/"+ p.maxzz[2]);
		DrawMode.ui3_Text1(x, y + 40 * 3, 120, 200, "耐力资质", p.zz[3] +"/"+p.maxzz[3]);
		DrawMode.ui3_Text1(x, y + 40 * 4, 120, 200, "敏捷资质", p.zz[4] +"/"+p.maxzz[4]);
		DrawMode.ui3_Text1(x, y + 40 * 5, 120, 200, "成长", MyPets.swapcz(p.cz)+ "/"+MyPets.swapcz(p.maxcz));

		if (p.iJjLev == 1)DrawMode.ui3_Text1(x, y + 40 * 6, 120, 200, "阶段", "初级");
		else if (p.iJjLev == 2)DrawMode.ui3_Text1(x, y + 40 * 6, 120, 200, "阶段", "中级");
		else if (p.iJjLev == 3)DrawMode.ui3_Text1(x, y + 40 * 6, 120, 200, "阶段", "高级");

		DrawMode.ui3_Text1(x, y + 40 * 7, 120, 200, "灵气", p.iLingQi+ "/"+ p.iMaxLingQi);
		DrawMode.ui3_Text1(x, y + 40 * 8, 120, 200, "饱食度", p.iBSD / 10+ "/100");
	}