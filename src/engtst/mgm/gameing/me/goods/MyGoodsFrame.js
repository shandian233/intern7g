
import MapManager from "../../../../../map/MapManager"
import GmConfig from "../../../../../config/GmConfig"
import SortAnima from "../../../../../config/SortAnima"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import LianDanShu from "../../../../../engtst/mgm/gameing/fast/LianDanShu"
import NewActivity from "../../../../../engtst/mgm/gameing/help/ang/NewActivity"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"
import PetsFrame from "../../../../../engtst/mgm/gameing/me/pet/PetsFrame"
import WashPet from "../../../../../engtst/mgm/gameing/me/pet/WashPet"

import MyGoods from "./MyGoods"
import GoodsDraw from "./GoodsDraw"
import TmpGoods from "./TmpGoods"
import ExchangeMoney from "./ExchangeMoney"

import LockFrame from "./LockFrame"
import LockSet from "./LockSet"
import Goods from "./Goods"
import SmallSpeaker from "./SmallSpeaker"

export default class MyGoodsFrame extends BaseClass{
		
		
		constructor( ani)
		{
			super();
			var i;
			this.pani=ani;
			this.pm3f=ani.pm3f;
			
			this.iW=1040;
			this.iH=610;
			this.iX=(GmConfig.SCRW-this.iW)/2;
			this.iY=(GmConfig.SCRH-this.iH)/2;
			
			this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_close.InitButton("关闭按钮");
			this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
			
			this.btn_setpoint=new Array(3);//
			for(i=0;i<3;i++)
			{
				this.btn_setpoint[i]=new XButtonEx2(GmPlay.xani_nui3);
				this.btn_setpoint[i].InitButton("装备切换按钮");
				this.btn_setpoint[i].sName=""+(i+1);
			}
			
			this.aa_body=new AnimaAction();
			this.aa_weapon=new AnimaAction();
			this.aa_cls=new Array(5);//
			for(i=0;i<5;i++)this.aa_cls[i]=new AnimaAction();
			this.FreshWeapon();
			
			this.btn_bag1=new XButtonEx2(GmPlay.xani_button);
			this.btn_bag1.InitButton("背包按钮109_61");
			
			this.btn_bag2=new XButtonEx2(GmPlay.xani_button);
			this.btn_bag2.InitButton("行囊按钮109_61");
			
			this.btn_bag3=new XButtonEx2(GmPlay.xani_button);
			this.btn_bag3.InitButton("仓库按钮109_61");
			
			this.btn_locker=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_locker.InitButton("按钮1_110");
			this.btn_locker.sName="锁";
			this.btn_locker.iNameSize=25;
			
			this.iBagPoint=0;
			
			this.btn_use=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_use.InitButton("内框按钮");
			this.btn_use.sName="使 用";
			this.btn_break=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_break.InitButton("内框按钮");
			this.btn_break.sName="分 解";
			this.btn_drop=new XButtonEx2(GmPlay.xani_nui3);
			this.btn_drop.InitButton("内框按钮");
			this.btn_drop.sName="丢 弃";
			
			this.btn_checkmoney=new XButtonEx2(GmPlay.xani_button);
			this.btn_checkmoney.InitButton("10号按钮40_40");
		}
		GetWeaponTid()
		{
			if(MyGoods.gi().goods[1][2].iGid<=0)return -1;
			else return MyGoods.gi().goods[1][2].iTid;
		}
		FreshWeapon()
		{
			var i;
			this.iWeapTid=this.GetWeaponTid();
			this.aa_body=GmPlay.xani_newrole[GmMe.me.iRace*2+GmMe.me.iSex].InitAnimaWithName("站立_下", null);
			if(this.iWeapTid>=0)
			{
				this.aa_weapon=GmPlay.xani_weap[GmMe.me.iRace*2+GmMe.me.iSex][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName("站立_下", null);
			}
			var xb=GmMe.me.iRace*2+GmMe.me.iSex;
			for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
			{
				if(GmMe.me.iColor[i]<=0 || GmMe.me.iColor[i]>=6)continue;
				GmPlay.xani_color[xb][GmMe.me.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_站立_下", this.aa_cls[i]);
			}
		}
		

		Draw()
		{
			this.bOperateGoods=false;
			var i,j;
			var x,y;
			var offx,offy;
		//	GmPlay.sop("this.iX="+this.iX+",this.iY="+this.iY);
			//////////////////////////////////////////////
			DrawMode.new_baseframe2(this.iX,this.iY,this.iW,this.iH,"物","品");
			this.btn_close.Draw();
			
			//左侧：装备切换，装备，任务，属性
			DrawMode.new_framein(this.iX+30,this.iY+30,480,this.iH-60);
			offx=this.iX+30+25;
			offy=this.iY+30+20;
			for(i=0;i<3;i++)
			{
				if((GmMe.me.iFlag[51]%10)==i)
				{
					this.btn_setpoint[i].bMouseDown=true;
					this.btn_setpoint[i].bMouseIn=true;
				}
				this.btn_setpoint[i].Move(offx+i*(117+40), offy, 117, 54);
				this.btn_setpoint[i].Draw();
			}
			offy+=54+20;
			if(MyGoods.gi().goods[1][0].iGid!=-1)GmPlay.xani_nui3.DrawAnimaEx(offx,offy, "物品格子", 0, 101, 1,1, 0, 0, 0);
			else GmPlay.xani_nui3.DrawAnimaEx(offx,offy, "装备格子", 0, 101, 1,1, 0, 0, 0);
			if(MyGoods.gi().goods[1][2].iGid!=-1)GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85, "物品格子", 0, 101, 1,1, 0, 0, 0);
			else GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85, "装备格子", 2, 101, 1,1, 0, 0, 0);
			if(MyGoods.gi().goods[1][4].iGid!=-1)GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85*2, "物品格子", 0, 101, 1,1, 0, 0, 0);
			else GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85*2, "装备格子", 4, 101, 1,1, 0, 0, 0);
			
			offx=this.iX+30+480-25-80;
			if(MyGoods.gi().goods[1][1].iGid!=-1)GmPlay.xani_nui3.DrawAnimaEx(offx,offy, "物品格子", 0, 101, 1,1, 0, 0, 0);
			else GmPlay.xani_nui3.DrawAnimaEx(offx,offy, "装备格子", 1, 101, 1,1, 0, 0, 0);
			if(MyGoods.gi().goods[1][3].iGid!=-1)GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85, "物品格子", 0, 101, 1,1, 0, 0, 0);
			else GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85, "装备格子", 3, 101, 1,1, 0, 0, 0);
			if(MyGoods.gi().goods[1][5].iGid!=-1)GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85*2, "物品格子", 0, 101, 1,1, 0, 0, 0);
			else GmPlay.xani_nui3.DrawAnimaEx(offx,offy+85*2, "装备格子", 5, 101, 1,1, 0, 0, 0);
			this.iSx=this.iX+30+25;
			this.iSy=offy;
			for(i=0;i<2;i++)
			{
				for(j=0;j<3;j++)
				{
					x=this.iX+30+25+i*350;
					y=offy+j*85;

					if(MyGoods.gi().goods[1][j*2+i].iGid!=-1)
					{
//						if(bLocked && MyGoods.gi().goods[1][j*2+i]==this.lockgoods)continue;
						MyGoods.gi().goods[1][j*2+i].aa.Draw(x, y);
					}
				}
			}
			
			GmPlay.xani_nui3.DrawAnima(this.iX+30+240,this.iY+30+240, "人物背景图",0);
			FireworksEffect.DrawAura(0, this.iX+30+240,this.iY+30+280, null, 0);//物品栏
			this.aa_body.Draw(this.iX+30+240,this.iY+30+280);
			var xb=GmMe.me.iRace*2+GmMe.me.iSex;
			for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
			{
				if(GmMe.me.iColor[i]<=0 || GmMe.me.iColor[i]>=6)continue;
				this.aa_cls[i].iFrame=this.aa_body.iFrame;
				this.aa_cls[i].Draw(this.iX+30+240,this.iY+30+280);
			}
			this.aa_body.NextFrame();
			if(this.iWeapTid>=0)
			{
				this.aa_weapon.Draw(this.iX+30+240,this.iY+30+280);
				this.aa_weapon.NextFrame();
			}
			
			offx=this.iX+30+25;
			offy+=85*3+10;
			
			DrawMode.new_TagText2(offx,offy,480-50-67,"气血",GmMe.me.rbs.iHp+"/"+GmMe.me.rbs.iMaxHp);
			offy+=32+15;
			DrawMode.new_TagText2(offx,offy,480-50-67,"魔法",GmMe.me.rbs.iMp+"/"+GmMe.me.rbs.iMaxMp);
			offy+=32+15;
			
			DrawMode.new_TagText2(offx,offy,120,"灵力",""+GmMe.me.rbs.iSpirit);
			DrawMode.new_TagText2(offx+430-67-120,offy,120,"防御",""+GmMe.me.rbs.iDefence);
			offy+=32+15;
			DrawMode.new_TagText2(offx,offy,120,"伤害",""+GmMe.me.rbs.iAttack);
			DrawMode.new_TagText2(offx+430-67-120,offy,120,"速度",""+GmMe.me.rbs.iSpeed);
			
			///////背包/行囊，格子们，铜币储备，加锁
			DrawMode.new_framein(this.iX+30+480+15,this.iY+30,480,this.iH-60);
			
			offx=this.iX+30+480+15+25;
			offy=this.iY+30+25;
			
			this.btn_bag1.Move(offx,offy,109,61);
			this.btn_bag1.Draw();
			this.pm3f.DrawText_2(this.btn_bag1.iX+78,this.btn_bag1.iY+17,"背",0xffffec80,24,101,1,1,0,-2,-2,4,0xff00244d);
			this.pm3f.DrawText_2(this.btn_bag1.iX+78,this.btn_bag1.iY+13+30,"包",0xffffec80,24,101,1,1,0,-2,-2,4,0xff00244d);
			
			this.btn_bag2.Move(offx+(430-109)/2,offy,109,61);
			this.btn_bag2.Draw();
			this.pm3f.DrawText_2(this.btn_bag2.iX+78,this.btn_bag2.iY+17,"行",0xffffec80,24,101,1,1,0,-2,-2,4,0xff00244d);
			this.pm3f.DrawText_2(this.btn_bag2.iX+78,this.btn_bag2.iY+13+30,"囊",0xffffec80,24,101,1,1,0,-2,-2,4,0xff00244d);
			
			this.btn_bag3.Move(offx+480-50-109,offy,109,61);
			this.btn_bag3.Draw();
			this.pm3f.DrawText_2(this.btn_bag3.iX+78,this.btn_bag3.iY+17,"仓",0xffffec80,24,101,1,1,0,-2,-2,4,0xff00244d);
			this.pm3f.DrawText_2(this.btn_bag3.iX+78,this.btn_bag3.iY+13+30,"库",0xffffec80,24,101,1,1,0,-2,-2,4,0xff00244d);
			
			if(this.iBagPoint==0)GmPlay.xani_nui3.DrawAnima(this.btn_bag1.iX, this.btn_bag1.iY, "背包选中框",0);
			else GmPlay.xani_nui3.DrawAnima(this.btn_bag2.iX, this.btn_bag2.iY, "背包选中框",0);
			
			offy+=61+5;
			GoodsDraw.new_DrawGoods(offx,offy, MyGoods.gi().goods[2+this.iBagPoint], null, null);
			MyGoodsFrame.iGx=offx;
			MyGoodsFrame.iGy=offy;
			
			offy+=345+20;
			
			DrawMode.new_TagText2(offx,offy,120,"铜币",""+GmMe.me.rbs.iMoney);
			this.btn_checkmoney.Move(offx+67+120+5, offy-4, 40, 40);
			this.btn_checkmoney.Draw();
			DrawMode.new_TagText2(offx+430-67-120,offy,120,"元宝",""+GmMe.me.rbs.iInGot);
			offy+=32+15;
			DrawMode.new_TagText2(offx,offy,120,"储备",""+GmMe.me.rbs.iReserve);
//			DrawMode.new_TagText2(offx+430-67-120,offy,120,"速度",""+GmMe.me.rbs.iSpeed);

			if(GmMe.me.bHaveLock)
			{
				if(GmMe.me.bLocked)this.btn_locker.sName="解  锁";
				else this.btn_locker.sName="改锁密";
			}
			else this.btn_locker.sName="加  锁";
			this.btn_locker.Move(this.iX+30+480+15+480-110-25, offy-15, 110, 52);
			this.btn_locker.Draw();
			
			if(Confirm1.end(Confirm1.CONFIRM_DROPPET))
			{
				if(Confirm1.bConfirm)
				{//输入锁
					LockSet.Open();
				}
			}
			
			if(this.lockgoods!=null && this.lockgoods.iOid==1)
			{//选中装备格子
				i=this.lockgoods.iPos%2;
				j=parseInt(this.lockgoods.iPos/2);
				x=this.iSx+i*(350);
				y=this.iSy+j*85;
				
				GmPlay.xani_nui3.DrawAnimaEx(x, y, "物品选中框", 0, 101, 1, 1, 0, 0, 0);
				GoodsDraw.new_DrawDetail(this.lockgoods,x,y,0);
			}
			else 	if(GoodsDraw.bShowDetail())
			{
				GoodsDraw.new_DrawRect(MyGoodsFrame.iGx,MyGoodsFrame.iGy, MyGoods.gi().goods[2+this.iBagPoint], this.lockgoods, 0);
				if(GoodsDraw.lastlock.iOid==2)
				{//背包中，有丢弃和使用按钮
					GoodsDraw.new_DrawDetail(null,-1,-1,55+20);
					this.bOperateGoods=true;
					this.btn_drop.Move(GoodsDraw.iDetailX+10, GoodsDraw.iDetailY+GoodsDraw.iDetailH-55-20, 98, 55);
					this.btn_drop.Draw();
					
					if(GmPlay.de_goods.intValue(GoodsDraw.lastlock.iTid, 0, 16)>=0)
					{
						this.btn_break.Move(GoodsDraw.iDetailX+GoodsDraw.iDetailW/2-98/2, GoodsDraw.iDetailY+GoodsDraw.iDetailH-55-20, 98, 55);
						this.btn_break.Draw();
					}
					
					this.btn_use.Move(GoodsDraw.iDetailX+GoodsDraw.iDetailW-98-10, GoodsDraw.iDetailY+GoodsDraw.iDetailH-55-20, 98, 55);
					this.btn_use.Draw();
				}
				else GoodsDraw.new_DrawDetail(null,-1,-1,0);
			}
			if(Confirm1.end(Confirm1.CONFIRM_BREAKGOODS))
			{
				if(Confirm1.bConfirm)
				{//同意分解
					if(this.lockgoods!=null && this.lockgoods.iGid>0 && this.lockgoods.iOid==2)
					{
						if(GmMe.me.bHaveLock && GmMe.me.bLocked)EasyMessage.easymsg.AddMessage("未解锁不能分解");
						else
						{
							if(GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 16)<0)FrameMessage.fm.Open("只有装备才能分解！");
							else
							{
								GmProtocol.gi().s_RecoverGoods(this.lockgoods.iGid);
								//GmProtocol.gi().s_DropGoods();
								this.lockgoods.iGid=-1;
							}
						}
					}
				}
				GoodsDraw.bMoving=false;
				GoodsDraw.lastlock=null;
			}
			
			if(Confirm1.end(Confirm1.CONFIRM_DROPGOODS))
			{
				if(Confirm1.bConfirm)
				{//同意丢弃
					if(this.lockgoods!=null && this.lockgoods.iGid>0 && this.lockgoods.iOid==2)
					{
						if(GmMe.me.bHaveLock && GmMe.me.bLocked)
							EasyMessage.easymsg.AddMessage("未解锁不能丢弃");
						else
						{
							if(GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 35)==1){
								FrameMessage.fm.Open("该物品不可丢弃！");
							}
							else
							{
								GmProtocol.gi().s_DropGoods(this.lockgoods.iGid);
								this.lockgoods.iGid=-1;
							}
						}
					}
				}
				GoodsDraw.bMoving=false;
				GoodsDraw.lastlock=null;
			}
			TmpGoods.Draw();
		}

		 ProcTouch( msg, x, y)
		{
			if(TmpGoods.ProcTouch(msg, x, y))return true;
			if(this.bOperateGoods)
			{
				if(this.btn_drop.ProcTouch(msg, x, y))
				{
					if(this.btn_drop.bCheck())
					{
						Confirm1.start(Confirm1.CONFIRM_DROPGOODS,"是否确定丢弃？");
						this.btn_drop.SetNormal();
					}
					return true;
				}
				if(GoodsDraw.lastlock&&GmPlay.de_goods.intValue(GoodsDraw.lastlock.iTid, 0, 16)>=0)
				{
					if(this.btn_break.ProcTouch(msg, x, y)){
						if(this.btn_break.bCheck())
						{//分解
							Confirm1.start(Confirm1.CONFIRM_BREAKGOODS,"是否确定分解？");
							this.btn_break.SetNormal();
						}
						return true;
					}
				}
				if(this.btn_use.ProcTouch(msg, x, y))
				{
					if(this.btn_use.bCheck())
					{
						this.UseGoods();
						this.lockgoods=null;
						GoodsDraw.lastlock=null;
						this.btn_use.fScale=1;
						this.btn_use.iAnimaStat=0;
					}
					return true;
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
			if(this.btn_bag1.ProcTouch(msg, x, y))
			{
				if(this.btn_bag1.bCheck())
				{
					this.iBagPoint=0;
				}
			}
			if(this.btn_bag2.ProcTouch(msg, x, y))
			{
				if(this.btn_bag2.bCheck())
				{
					this.iBagPoint=1;
				}
			}
			if(this.btn_bag3.ProcTouch(msg, x, y))
			{
				if(this.btn_bag3.bCheck())
				{
					if(GmMe.me.iFlag[20]>60)
					{
						XStat.gi().PopStat(1);
						XStat.gi().PushStat(XStat.GS_GOODSSTOREFROME);
						XStat.gi().PushStat(XStat.GS_LOADING1);
						GmProtocol.gi().s_OpenStore(0, 0,0);
					}
					else
					{
						FrameMessage.fm.Open("仓库管理员在西阳城(103,23)#e#e会员剩余天数>60可随时打开仓库");
					}
				}
				return true;
			}
			var i;
				for(i=0;i<3;i++)
				{
					if(this.btn_setpoint[i].ProcTouch(msg, x, y))
					{
						if(this.btn_setpoint[i].bCheck())
						{//发送切换装备消息，清空装备列表
							if((GmMe.me.iFlag[51]%10)==i)continue;
							if(MyGoodsFrame.bSELock){
								EasyMessage.easymsg.AddMessage("请勿频繁更换装备");
								continue;
							}
							GmProtocol.gi().s_SwapEquipment(i);
							MyGoods.gi().goods[1][0].iGid=-1;
							MyGoods.gi().goods[1][1].iGid=-1;
							MyGoods.gi().goods[1][2].iGid=-1;
							MyGoods.gi().goods[1][3].iGid=-1;
							MyGoods.gi().goods[1][4].iGid=-1;
							MyGoods.gi().goods[1][5].iGid=-1;
							GmMe.me.iFlag[51]=GmMe.me.iFlag[51]/10*10+i;
							MyGoodsFrame.bSELock=true;
						}
					}
				}
			if(this.btn_checkmoney.ProcTouch(msg, x, y))
			{
				if(this.btn_checkmoney.bCheck())
				{
					ExchangeMoney.Open();
				}
			}
			if(this.btn_locker.ProcTouch(msg, x, y))
			{
				if(this.btn_locker.bCheck())
				{
					if(GmMe.me.bHaveLock)
					{
						if(GmMe.me.bLocked)
						{//解锁
							LockFrame.Open();
//							Confirm1.start(Confirm1.CONFIRM_DROPPET,"加锁后，每次登陆需要解锁才能进行（交易，摆摊，丢弃，给予，放生）等功能，是否确定加锁？");
						}
						else
						{
							LockSet.Open();
//							Confirm1.start(Confirm1.CONFIRM_DROPPET,"加锁后，每次登陆需要解锁才能进行（交易，摆摊，丢弃，给予，放生）等功能，是否确定加锁？");
						}
					}
					else
					{
						Confirm1.start(Confirm1.CONFIRM_DROPPET,"加锁后，每次登陆需要解锁才能进行（交易，摆摊，丢弃，给予，放生）等功能，是否确定加锁？");
					}
				}
			}
			var j;
			var xx,yy;
			for(i=0;i<2;i++)
			{
				for(j=0;j<3;j++)
				{//装备位点击，特殊处理
					xx=this.iSx+i*345;
					yy=this.iSy+j*85;
					
					if(XDefine.bInRect(x, y, xx, yy, 80, 80))
					{
						if(msg==3)
						{
							if(MyGoods.gi().goods[1][j*2+i].iGid==-1)break;
							else
							{
								if(this.lockgoods==MyGoods.gi().goods[1][j*2+i])
								{//已锁定，使用
									this.UseGoods();
									this.lockgoods=null;
								}
								else this.lockgoods=MyGoods.gi().goods[1][j*2+i];//未锁定，锁定
							}
						}
						return true;
					}
				}
			}
			if(msg==3 && this.lockgoods!=null && GoodsDraw.bMoving)
			{///看是否移动到按钮上
				if(XDefine.bInRect(x,y,this.btn_bag1.iX,this.btn_bag1.iY,this.btn_bag1.iW,this.btn_bag1.iH))
				{//背包按钮
					for(i=0;i<20;i++)
					{
						if(MyGoods.gi().goods[2][i].iGid==-1)
						{
							GoodsDraw.swaplock=MyGoods.gi().goods[2][i];
							this.MoveGoods(GoodsDraw.swaplock);
							break;
						}
					}
				}
				else if(XDefine.bInRect(x,y,this.btn_bag2.iX,this.btn_bag2.iY,this.btn_bag2.iW,this.btn_bag2.iH))
				{//行囊按钮
					for(i=0;i<20;i++)
					{
						if(MyGoods.gi().goods[3][i].iGid==-1)
						{
							GoodsDraw.swaplock=MyGoods.gi().goods[3][i];
							this.MoveGoods(GoodsDraw.swaplock);
							break;
						}
					}
				}
				else if(XDefine.bInRect(x, y, this.iSx,this.iSy,345+80,85*3))
				{
					if(this.iBagPoint==0)this.UseGoods();
					GoodsDraw.lastlock=null;
				}
				else 	if(!XDefine.bInRect(x, y, MyGoodsFrame.iGx, MyGoodsFrame.iGy, 85*5, 85*4))
				{
					if(this.lockgoods.iOid!=2)
					{
						EasyMessage.easymsg.AddMessage("道具栏的物品才能丢弃");
						GoodsDraw.bMoving=false;
					}
					else Confirm1.start(Confirm1.CONFIRM_DROPGOODS,"是否确定丢弃？");
					return true;
				}
			}
			this.lockgoods=GoodsDraw.new_LockGoods(x, y, MyGoodsFrame.iGx,MyGoodsFrame.iGy, MyGoods.gi().goods[2+this.iBagPoint], msg);
			if(GoodsDraw.bCanProc())
			{
				if(this.iBagPoint==0)this.UseGoods();
				GoodsDraw.lastlock=null;
			}
			if(GoodsDraw.bCanMove())
			{//交换物品
				this.MoveGoods(GoodsDraw.swaplock);
			}
			return false;
		}
		MoveGoods( destgoods)
		{
			var i,j;
			if(destgoods.iOid==1)
			{//目标位置是装备位，判断是否满足穿戴条件
				if(!MyGoods.bCheckEquipment(this.lockgoods,destgoods.iPos))//可佩戴，移动或交换
				{//检测失败
					return;
				}
			}
			if(this.lockgoods.iOid==1 && destgoods.iGid!=-1)
			{//装备位和背包交换
				if(!MyGoods.bCheckEquipment(destgoods,this.lockgoods.iPos))//可佩戴，移动或交换
				{//检测失败
					return;
				}
			}
			if(this.lockgoods.iTid==318 || this.lockgoods.iTid==319 || this.lockgoods.iTid==320 || this.lockgoods.iTid==321 || this.lockgoods.iTid==322 || this.lockgoods.iTid==323)
			{
				if(this.lockgoods.iOid==2 && destgoods.iOid!=2)
				{
					FrameMessage.fm.Open("礼包不能移动到行囊和仓库");
					return;
				}
			}
			GmProtocol.gi().s_MoveGoods(this.lockgoods.iGid, this.lockgoods.iOid, this.lockgoods.iPos, destgoods.iGid, destgoods.iOid, destgoods.iPos);
			if(destgoods.iGid==-1)
			{//移动物品
				destgoods.copyfrom(this.lockgoods);
				this.lockgoods.iGid=-1;
			}
			else
			{//交换/叠加物品
				i=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 28);
				if(this.lockgoods.iTid==destgoods.iTid && i>1)
				{
					if(destgoods.iCount>=i)
					{//目标物品满，不改变
//						for(int z=0;z<100;z++)GmPlay.sop("zzzzzzzzzzzzzzz");
					}
					else if(this.lockgoods.iCount+destgoods.iCount<=i)
					{
						destgoods.iCount+=this.lockgoods.iCount;
						this.lockgoods.iGid=-1;
					}
					else
					{
						j=this.lockgoods.iCount+destgoods.iCount;
						destgoods.iCount=i;
						this.lockgoods.iCount=j-i;
					}
				}
				else
				{
					var swapgoods=new Goods();
					swapgoods.copyfrom(destgoods);
					destgoods.copyfrom(this.lockgoods);
					this.lockgoods.copyfrom(swapgoods);
				}
			}
			console.log(this.lockgoods.iOid)
			if(this.lockgoods.iOid==1 || destgoods.iOid==1)
			{//装备更换，重新计算人物属性
				if((this.lockgoods.iOid==1 && this.lockgoods.iPos==2) ||
						(destgoods.iOid==1 && destgoods.iPos==2))
				{//是武器，更换效果
					GmMe.me.bwc=true;
					this.FreshWeapon();
				}
				EasyMessage.easymsg.snapatt();
				GmMe.me.CalcFightAtt();
				EasyMessage.easymsg.calcattchanged();
			}
		}
		UseGoods()
		{//检测物品类型，根据物品类型，来判断是装备，还是使用药品，还是其他
			if(this.lockgoods==null)return;
			var i,type;
			if(this.lockgoods.iOid==1)
			{//脱下装备
				for(i=0;i<20;i++)
				{//背包里找一个空格
					if(MyGoods.gi().goods[2][i].iGid==-1)
					{
						this.MoveGoods(MyGoods.gi().goods[2][i]);
						return;
					}
				}
			}
			if(this.lockgoods.iOid!=2)return;//只有在背包里的物品才能使用
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 16);//装备
			if(type!=-1)
			{//使用装备，根据部位穿戴
				this.MoveGoods(MyGoods.gi().goods[1][type]);
				return;
			}
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 27);
			if(type!=-1)
			{//草药,可在战斗和pk中使用
				i=0;
				var usecount=1;
				var restorehp=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 1);
				var restoremp=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 2);
				while((restorehp!=-1 && GmMe.me.rbs.iHp< GmMe.me.rbs.iMaxHp) ||
						(restoremp!=-1 &&  GmMe.me.rbs.iMp< GmMe.me.rbs.iMaxMp))
					{//可加血，而且血不满，可加蓝，而且蓝不满
						if(usecount<=0)break;//符合使用数量
						if(restorehp!=-1) GmMe.me.rbs.iHp+=restorehp;
						if(restoremp!=-1) GmMe.me.rbs.iMp+=restoremp;
						usecount--;
						i++;
					}
				if(type==3)
				{
					i=1;
				}
				if(i<=0 && type<3)
				{
					EasyMessage.easymsg.AddMessage("您的状态很好，不需要恢复");
				}
				else
				{
					GmProtocol.gi().s_UseGoods(this.lockgoods.iGid, i,"");
					this.lockgoods.iCount-=i;
					if(this.lockgoods.iCount<=0)
					{
						this.lockgoods.iGid=-1;
						this.lockgoods=null;
					}
					
					GmMe.me.CalcFightAtt();
				}
				return;
			}
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 33);
			if(type!=-1)
			{
				GmProtocol.gi().s_UseGoods(this.lockgoods.iGid, 1,"");//if(this.lockgoods.iTid==191)
				return;
			}
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 30);//道具
			if(type!=-1)
			{
				if(type==1)
				{//漫游中使用
					if(this.lockgoods.iTid==195 || this.lockgoods.iTid==328 || this.lockgoods.iTid==329 || this.lockgoods.iTid==330 || this.lockgoods.iTid==331)
					{//丹方
						if(GmMe.me.rbs.iGovSkill[1]>0)
						{//炼丹
							XStat.gi().PopStat(1);
							LianDanShu.Open(this.lockgoods, null);
						}
						else EasyMessage.easymsg.AddMessage("还未学习炼丹术");
					}
					else if(this.lockgoods.iTid>=342 && this.lockgoods.iTid<=346)
					{
						if(GmMe.me.rbs.iGovSkill[1]>0)
						{//炼丹
							XStat.gi().PopStat(1);
							LianDanShu.Open(null, this.lockgoods);
						}
						else EasyMessage.easymsg.AddMessage("还未学习炼丹术");
					}
					else if(this.lockgoods.iTid==160 || this.lockgoods.iTid==161)
					{//仙灵果洗宝宝
						var pf=PetsFrame.Open();
						if(pf!=null)pf.iPage=1;
//						WashPet.Open(this.lockgoods);
					}
					else if(this.lockgoods.iTid==122)
					{//小喇叭，输入聊天文字
						SmallSpeaker.Open(this.lockgoods);
					}
					else if(this.lockgoods.iTid==386 || this.lockgoods.iTid==387 || this.lockgoods.iTid==388)
					{
						GmProtocol.gi().s_PromptActivity(0, 0);//请求获得活跃度数据
						NewActivity.iOpenFlag=1;
						XStat.gi().PushStat(XStat.GS_LOADING1);
					}
					else
					{
						GmProtocol.gi().s_UseGoods(this.lockgoods.iGid, 1,"");
						if(this.lockgoods.iTid==119)
						{//看是否已经定过位置
							XStat.gi().PopStat(1);//使用了传送符，关闭显示框
							if(this.lockgoods.iAtts[0]!=0)MapManager.gi().iMapChangeing=100;
						}
					}
				}
				else EasyMessage.easymsg.AddMessage("不能直接使用");
				return;
			}
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 31);//道具
			if(type!=-1)
			{//材料
				EasyMessage.easymsg.AddMessage("不能直接使用");
				return;
			}
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 34);
			if(type!=-1)
			{//烹饪
				if(type!=1 && type!=3)
				{
					EasyMessage.easymsg.AddMessage("不能直接使用");
					return;
				}
				GmProtocol.gi().s_UseGoods(this.lockgoods.iGid, 1,"");
				switch(type)
				{
				case 197://艾窝窝
//					s+="#e00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
					break;
				case 198://三丁包子
					//漫游恢复
	//				s+="#e00ff00使用后增加愤怒=15，只能在漫游中使用";
					break;
				case 199://双塔鱼
					break;
				case 200://粉蒸牛肉
	//				s+="#e00ff00增加宠物寿命=品质/2";
					break;
				case 201://赖汤圆
		//			s+="#e00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
					break;
				case 202://臭豆腐
		//			s+="#e00ff00使用后增加愤怒=15，只能在战斗中使用";
					break;
				case 203://竹简饭
		//			s+="#e00ff00使用后增加愤怒=品质/2，只能在战斗中使用";
					break;
				case 204://清汤鱼圆
		//			s+="#e00ff00使用后增加愤怒=品质，附加中毒状态，只能在战斗中使用";
					break;
				case 205://蛇胆酒
		//			s+="#e00ff00使用后增加愤怒=品质*1.5，减少防御=品质*1，只能在战斗中使用";
					break;
				case 206://烤肉
		//			s+="#e00ff00使用后增加愤怒=品质/2，只能在漫游中使用";
					break;
				}
				return;
			}
			EasyMessage.easymsg.AddMessage("未知物品使用失败");
		}
}

MyGoodsFrame.bSELock=false;
MyGoodsFrame.iGx,MyGoodsFrame.iGy;//物品偏移位置