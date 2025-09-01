
import MapManager from "../../../../map/MapManager"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import PackageTools from "../../../../engine/PackageTools"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../engtst/mgm/MyAI"
import XStat from "../../../../engtst/mgm/XStat"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import LianDanShu from "../../../../engtst/mgm/gameing/fast/LianDanShu"
import XFight from "../../../../engtst/mgm/gameing/fight/XFight"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
import SmallSpeaker from "../../../../engtst/mgm/gameing/me/goods/SmallSpeaker"
import PetsFrame from "../../../../engtst/mgm/gameing/me/pet/PetsFrame"
import WashPet from "../../../../engtst/mgm/gameing/me/pet/WashPet"

import JQMode from "./JQMode"

//右下角快捷使用物品
class _GOODSLIST
{/*
	public int iStat;//0无，1未初始化状态，2初始化等待状态，3合并状态，4移动到右下角状态，5等待被点击使用状态
	public int this.iX,this.iY;
	public int iGid;//id
	public int iTid;//类型
	public int iDelay;
	public int iDX,iDY;*/

	constructor()
	{
		this.iStat=0;
	}
	copyfrom( p)
	{
		this.iStat=p.iStat;
		this.iX=p.iX;
		this.iY=p.iY;
		this.iDX=p.iDX;
		this.iDY=p.iDY;
		this.iGid=p.iGid;
		this.iTid=p.iTid;
	}
}

export default class FastGoods {
	
	constructor()
	{
		var i;
		this.glist=new Array(FastGoods.MAXCOUNT);//
		for(i=0;i<FastGoods.MAXCOUNT;i++)
		{
			this.glist[i]=new _GOODSLIST();
		}
		this.iListPoint=0;
		this.btn_use=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_use.InitButton("按钮1_110");
		this.btn_use.sName="使用";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");

		this.bTouch=false;
		this.bShowDetail=false;
	}
	
	PushGoods( pls)
	{
		if(MyAI.gi().iLogicStat>0)return;//正在进行AI不弹出
		if(this.iListPoint>=FastGoods.MAXCOUNT)return;
		this.glist[this.iListPoint].iStat=1;
		this.glist[this.iListPoint].iGid=pls.GetNextInt();
		this.glist[this.iListPoint].iTid=pls.GetNextShort();
		this.iListPoint++;
		
		this.iX=GmConfig.SCRW-230-54;
		this.iY=GmConfig.SCRH-310-30;
		this.iW=188;
		this.iH=256;
		this.iGx=this.iX+54;
		this.iGy=this.iY+30;
	}
	RemoveGoods( i)
	{
		for(;i<this.iListPoint-1;i++)
		{
			this.glist[i].copyfrom(this.glist[i+1]);
		}
		this.iListPoint--;
	}
	CheckGoods()
	{//检查堆栈中物品，不在背包中的话，取消掉
		var i,j;
		for(i=0;i<this.iListPoint;i++)
		{
			for(j=0;j<20;j++)
			{
				if(MyGoods.gi().goods[2][j].iGid<=0)continue;
				if(MyGoods.gi().goods[2][j].iGid==this.glist[i].iGid)break;
			}
			if(j>=20)
			{
//				GmPlay.sop("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
				this.RemoveGoods(i);
			}
		}
	}
	FindGoods( gid)
	{
		var j;
		for(j=0;j<20;j++)
		{
			if(MyGoods.gi().goods[2][j].iGid<=0)continue;
			if(MyGoods.gi().goods[2][j].iGid==gid)return MyGoods.gi().goods[2][j];
		}
		return null;
	}
	Draw()
	{
		this.bTouch=false;
		if(GmMe.me.rbs.iLev>30)return;
		if(XFight.bFighting)return;
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(this.iListPoint<=0)return;
		this.CheckGoods();
		if(this.iListPoint<=0)return;
		
		var i,j,k;
		var stat1=0,stat2=0;
		for(i=0;i<this.iListPoint;i++)
		{
			if(this.glist[i].iStat==1)stat1++;
			if(this.glist[i].iStat==2)stat2++;
		}
	
		j=GmConfig.SCRW/2-100+stat1*50;
		k=GmConfig.SCRW/2-20+stat1*10;
//		for(i=this.iListPoint-1;i>=0;i--)
		for(i=0;i<this.iListPoint;i++)
		{
			switch(this.glist[i].iStat)
			{
			case 1://未初始化，进行初始化
				this.glist[i].iStat=2;
				this.glist[i].iX=j+10;
				this.glist[i].iDX=k;
				this.glist[i].iY=GmConfig.SCRH/2-40;
				this.glist[i].iDY=this.glist[i].iY;
				this.glist[i].iDelay=10;
				j-=100;
				k-=20;
				break;
			case 2://初始化完后等待
				this.glist[i].iDelay--;
				if(this.glist[i].iDelay<=0)
				{
					if(stat2<=1)
					{//只有一个，直接移动
						this.glist[i].iDelay=10;
						this.glist[i].iStat=4;
						if(XStat.gi().iXStat==XStat.GS_GAMEING)
						{
							this.glist[i].iDX=GmConfig.SCRW-230;
							this.glist[i].iDY=GmConfig.SCRH-310;
							this.iMoveType=0;
						}
						else
						{
							this.glist[i].iDX=GmConfig.SCRW-100;
							this.glist[i].iDY=GmConfig.SCRH-100;
							this.iMoveType=1;
							this.fMoveScal=1;
						}
					}
					else
					{
						this.glist[i].iDelay=10;
						this.glist[i].iStat=3;
					}
				}
				GmPlay.xani_nui3.DrawAnima(this.glist[i].iX,this.glist[i].iY, "物品格子", 0);
				GmPlay.xani_ngoods.DrawAnima_aa(this.glist[i].iX,this.glist[i].iY, GmPlay.de_goods.strValue(this.glist[i].iTid, 0, 10), 0);
				break;
			case 3://向中心位置移动
				this.glist[i].iDelay--;
				if(this.glist[i].iDelay<=0)
				{//
					this.glist[i].iDelay=10;
					this.glist[i].iStat=4;
					if(XStat.gi().iXStat==XStat.GS_GAMEING)
					{
						this.glist[i].iDX=GmConfig.SCRW-230;
						this.glist[i].iDY=GmConfig.SCRH-310;
						this.iMoveType=0;
					}
					else
					{
						this.glist[i].iDX=GmConfig.SCRW-100;
						this.glist[i].iDY=GmConfig.SCRH-100;
						this.iMoveType=1;
						this.fMoveScal=1;
					}
				}
				else
				{//移动
					this.glist[i].iX+=(this.glist[i].iDX-this.glist[i].iX)/this.glist[i].iDelay;
					this.glist[i].iY+=(this.glist[i].iDY-this.glist[i].iY)/this.glist[i].iDelay;
				}
				GmPlay.xani_nui3.DrawAnima(this.glist[i].iX,this.glist[i].iY, "物品格子", 0);
				GmPlay.xani_ngoods.DrawAnima_aa(this.glist[i].iX,this.glist[i].iY, GmPlay.de_goods.strValue(this.glist[i].iTid, 0, 10), 0);
				break;
			case 4://移动到右下角
				this.glist[i].iDelay--;
				if(this.glist[i].iDelay<=0)
				{//
					this.glist[i].iStat=5;
					this.glist[i].iX=this.glist[i].iDX;
					this.glist[i].iY=this.glist[i].iDY;
				}
				else
				{
					this.glist[i].iX+=(this.glist[i].iDX-this.glist[i].iX)/this.glist[i].iDelay;
					this.glist[i].iY+=(this.glist[i].iDY-this.glist[i].iY)/this.glist[i].iDelay;
				}
				if(this.iMoveType==0)
				{
					GmPlay.xani_nui3.DrawAnima(this.glist[i].iX,this.glist[i].iY, "物品格子", 0);
					GmPlay.xani_ngoods.DrawAnima_aa(this.glist[i].iX,this.glist[i].iY, GmPlay.de_goods.strValue(this.glist[i].iTid, 0, 10), 0);
				}
				else
				{
					GmPlay.xani_nui3.DrawAnimaEx(this.glist[i].iX,this.glist[i].iY, "物品格子", 0,101,this.fMoveScal,this.fMoveScal,0,0,0);
					GmPlay.xani_ngoods.DrawAnimaEx(this.glist[i].iX,this.glist[i].iY, GmPlay.de_goods.strValue(this.glist[i].iTid, 0, 10), 0,101,this.fMoveScal,this.fMoveScal,0,0,0);
					this.fMoveScal*=0.9;
					GmPlay.sop("sdfsdf");
				}
				break;
			case 5://等待点击使用，画框体，按钮，图标
				if(XStat.gi().iXStat!=XStat.GS_GAMEING)break;
				if(XFight.bFighting)break;
				j=GmConfig.SCRW-230-54;
				k=GmConfig.SCRH-310-30;
				GmPlay.xani_nui5.DrawAnima(j,k, "快捷使用物品大框", 0);
				GmPlay.xani_nui3.DrawAnima(j+54,k+30, "物品格子", 0);
				GmPlay.xani_ngoods.DrawAnima_aa(j+54,k+30, GmPlay.de_goods.strValue(this.glist[i].iTid, 0, 10), 0);
				M3DFast.gi().DrawTextEx(j+54+40,k+30+90, GmPlay.de_goods.strValue(this.glist[i].iTid, 0, 4), 0xffffffff, 25, 101, 1, 1, 0, -2, 0);
				this.btn_use.Move(j+188/2-110/2, k+30+90+50, 110,52);
				this.btn_use.Draw();
				this.btn_close.Move(j+188-35,k-25, 60, 60);
				this.btn_close.Draw();
				if(this.bShowDetail && i==this.iListPoint-1)
				{
					GoodsDraw.new_DrawDetail(this.FindGoods(this.glist[i].iGid), this.iGx, this.iGy,0);
				}
				this.bTouch=true;
				break;
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		if(GmMe.me.rbs.iLev>30)return false;
		if(XFight.bFighting)return false;
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return false;
		if(!this.bTouch)return false;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				if(this.iListPoint>0)this.iListPoint--;
			}
			return true;
		}
		if(this.iListPoint>0)
		{
			this.bShowDetail=false;
			if((msg==1 || msg==2) && XDefine.bInRect(x, y, this.iGx, this.iGy, 80, 80))this.bShowDetail=true;
			
			if(this.btn_use.ProcTouch(msg, x, y))
			{
				if(this.btn_use.bCheck())
				{//使用物品
					for(var i=0;i<20;i++)
					{
						if(MyGoods.gi().goods[2][i].iGid<=0)continue;
						if(MyGoods.gi().goods[2][i].iGid==this.glist[this.iListPoint-1].iGid)
						{
							EasyMessage.easymsg.snapatt();
							this.UseGoods(MyGoods.gi().goods[2][i]);
							EasyMessage.easymsg.calcattchanged();
							break;
						}
					}
					this.iListPoint--;
				}
			}
		}
		if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))return true;

		return false;
	}
	
	MoveGoods( lockgoods, destgoods)
	{
		var i,j;
		if(destgoods.iOid==1)
		{//目标位置是装备位，判断是否满足穿戴条件
			if(!MyGoods.bCheckEquipment(lockgoods,destgoods.iPos))//可佩戴，移动或交换
			{//检测失败
				return;
			}
		}
		if(lockgoods.iOid==1 && destgoods.iGid!=-1)
		{//装备位和背包交换
			if(!MyGoods.bCheckEquipment(destgoods,lockgoods.iPos))//可佩戴，移动或交换
			{//检测失败
				return;
			}
		}
		if(lockgoods.iTid==318 || lockgoods.iTid==319 || lockgoods.iTid==320 || lockgoods.iTid==321 || lockgoods.iTid==322 || lockgoods.iTid==323)
		{
			if(lockgoods.iOid==2 && destgoods.iOid!=2)
			{
				FrameMessage.fm.Open("礼包不能移动到行囊和仓库");
				return;
			}
		}
		GmProtocol.gi().s_MoveGoods(lockgoods.iGid, lockgoods.iOid, lockgoods.iPos, destgoods.iGid, destgoods.iOid, destgoods.iPos);
		if(destgoods.iGid==-1)
		{//移动物品
			destgoods.copyfrom(lockgoods);
			lockgoods.iGid=-1;
		}
		else
		{//交换/叠加物品
			i=GmPlay.de_goods.intValue(lockgoods.iTid, 0, 28);
			if(lockgoods.iTid==destgoods.iTid && i>1)
			{
				if(destgoods.iCount>=i)
				{//目标物品满，不改变
//					for(int z=0;z<100;z++)GmPlay.sop("zzzzzzzzzzzzzzz");
				}
				else if(lockgoods.iCount+destgoods.iCount<=i)
				{
					destgoods.iCount+=lockgoods.iCount;
					lockgoods.iGid=-1;
				}
				else
				{
					j=lockgoods.iCount+destgoods.iCount;
					destgoods.iCount=i;
					lockgoods.iCount=j-i;
				}
			}
			else
			{
				var swapgoods=new Goods();
				swapgoods.copyfrom(destgoods);
				destgoods.copyfrom(lockgoods);
				lockgoods.copyfrom(swapgoods);
			}
		}
		if(lockgoods.iOid==1 || destgoods.iOid==1)
		{//装备更换，重新计算人物属性
			if((lockgoods.iOid==1 && lockgoods.iPos==2) ||
					(destgoods.iOid==1 && destgoods.iPos==2))
			{//是武器，更换效果
				GmMe.me.bwc=true;
//				FreshWeapon();
			}
			GmMe.me.CalcFightAtt();
		}
	}
	UseGoods( lockgoods)
	{//检测物品类型，根据物品类型，来判断是装备，还是使用药品，还是其他
		if(lockgoods==null)return;
		var i,type;
		if(lockgoods.iOid!=2)return;//只有在背包里的物品才能使用
		type=GmPlay.de_goods.intValue(lockgoods.iTid, -1, 16);//装备
		if(type!=-1)
		{//使用装备，根据部位穿戴
			this.MoveGoods(lockgoods,MyGoods.gi().goods[1][type]);
			return;
		}
		type=GmPlay.de_goods.intValue(lockgoods.iTid, -1, 27);
		if(type!=-1)
		{//草药,可在战斗和pk中使用
			i=0;
			var usecount=1;
			var restorehp=GmPlay.de_goods.intValue(lockgoods.iTid, 0, 1);
			var restoremp=GmPlay.de_goods.intValue(lockgoods.iTid, 0, 2);
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
				GmProtocol.gi().s_UseGoods(lockgoods.iGid, i,"");
				lockgoods.iCount-=i;
				if(lockgoods.iCount<=0)
				{
					lockgoods.iGid=-1;
					lockgoods=null;
				}
				
				GmMe.me.CalcFightAtt();
			}
			return;
		}
		type=GmPlay.de_goods.intValue(lockgoods.iTid, -1, 33);
		if(type!=-1)
		{
			GmProtocol.gi().s_UseGoods(lockgoods.iGid, 1,"");//if(lockgoods.iTid==191)
			return;
		}
		type=GmPlay.de_goods.intValue(lockgoods.iTid, -1, 30);//道具
		if(type!=-1)
		{
			if(type==1)
			{//漫游中使用
				if(lockgoods.iTid==195 || lockgoods.iTid==328 || lockgoods.iTid==329 || lockgoods.iTid==330 || lockgoods.iTid==331)
				{//丹方
					if(GmMe.me.rbs.iGovSkill[1]>0)
					{//炼丹
//						XStat.gi().PopStat(1);
						LianDanShu.Open(lockgoods, null);
					}
					else EasyMessage.easymsg.AddMessage("还未学习炼丹术");
				}
				else if(lockgoods.iTid>=342 && lockgoods.iTid<=346)
				{
					if(GmMe.me.rbs.iGovSkill[1]>0)
					{//炼丹
						XStat.gi().PopStat(1);
						LianDanShu.Open(null, lockgoods);
					}
					else EasyMessage.easymsg.AddMessage("还未学习炼丹术");
				}
				else if(lockgoods.iTid==160 || lockgoods.iTid==161)
				{//仙灵果洗宝宝
					var pf=PetsFrame.Open();
					if(pf!=null)pf.iPage=1;
//					WashPet.Open(lockgoods);
				}
				else if(lockgoods.iTid==122)
				{//小喇叭，输入聊天文字
					SmallSpeaker.Open(lockgoods);
				}
				else
				{
					GmProtocol.gi().s_UseGoods(lockgoods.iGid, 1,"");
					if(lockgoods.iTid==119)
					{//看是否已经定过位置
//						XStat.gi().PopStat(1);//使用了传送符，关闭显示框
						if(lockgoods.iAtts[0]!=0)MapManager.gi().iMapChangeing=100;
					}
				}
			}
			else EasyMessage.easymsg.AddMessage("不能直接使用");
			return;
		}
		type=GmPlay.de_goods.intValue(lockgoods.iTid, -1, 31);//道具
		if(type!=-1)
		{//材料
			EasyMessage.easymsg.AddMessage("不能直接使用");
			return;
		}
		type=GmPlay.de_goods.intValue(lockgoods.iTid, -1, 34);
		if(type!=-1)
		{//烹饪
			if(type!=1 && type!=3)
			{
				EasyMessage.easymsg.AddMessage("不能直接使用");
				return;
			}
			GmProtocol.gi().s_UseGoods(lockgoods.iGid, 1,"");
			switch(type)
			{
			case 197://艾窝窝
//				s+="#e00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
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
FastGoods.MAXCOUNT=32;
FastGoods.fg=null;
FastGoods.gi=function()
{
	if(FastGoods.fg==null)FastGoods.fg=new FastGoods();
	return FastGoods.fg;
}