
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import PackageTools from "../../../../../engine/PackageTools"
import TouchManager from "../../../../../engine/TouchManager"
import XButton from "../../../../../engine/control/XButton"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../../engtst/mgm/gameing/me/MyAttFrame"
import PetsFrame from "../../../../../engtst/mgm/gameing/me/pet/PetsFrame"
import WashPet from "../../../../../engtst/mgm/gameing/me/pet/WashPet"
import Goods from "./Goods"

export default class MyGoods {




	constructor()
	{
		var i,j;
		this.pm3f=M3DFast.xm3f;
		
		MyGoods.iW=750;
		MyGoods.iH=450;
		MyGoods.iX=(GmConfig.SCRW-MyGoods.iW)/2;
		MyGoods.iY=(GmConfig.SCRH-MyGoods.iH)/2;
		//////////////////////////////////////////////
		
		this.iW1=MyGoods.GW*2;
		this.iH1=MyGoods.GW*3;
		this.iX1=MyGoods.iX-this.iW1;
		this.iY1=MyGoods.iY+(this.iH-this.iH1)/2;
		
		this.bShow=false;
		
		this.btn_close=new XButton(GmPlay.xani_ui);
		this.btn_close.InitButton("属性关闭按钮");
		this.btn_close.sName="";
		
		this.btn_bag1=new XButton(GmPlay.xani_ui);
		this.btn_bag1.InitButton("亮蓝按钮");
		this.btn_bag1.sName="背包";
		
		this.btn_bag2=new XButton(GmPlay.xani_ui);
		this.btn_bag2.InitButton("亮蓝按钮");
		this.btn_bag2.sName="行囊";
		
//		btn_switch[2].bSingleButton=false;
//		btn_switch[2].InitButton("大按钮2");
		
		this.goods=new Array(30);
		this.goods[1]=new Array(6);//装备
		for(i=0;i<6;i++)
		{
			this.goods[1][i]=new Goods();
			this.goods[1][i].iOid=1;
			this.goods[1][i].iPos=i;
		}
		this.goods[2]=new Array(20);//背包
		this.goods[3]=new Array(20);//行囊
		for(i=0;i<20;i++)
		{
			this.goods[2][i]=new Goods();
			this.goods[2][i].iOid=2;
			this.goods[2][i].iPos=i;
			this.goods[3][i]=new Goods();
			this.goods[3][i].iOid=3;
			this.goods[3][i].iPos=i;
		}
		for(j=10;j<30;j++)
		{//仓库
			this.goods[j]=new Array(20);
			for(i=0;i<20;i++)
			{
				this.goods[j][i]=new Goods();
				this.goods[j][i].iOid=j;
				this.goods[j][i].iPos=i;
			}
		}

		this.swapgoods=new Goods();
		
		this.bLocked=false;
		this.bDested=false;
		
		this.bTiming=false;
		this.iTouchDelay=0;
		this.bShowDetail=false;
	}

	
	  GetGid( gtype)
	{
		var i;
		for(i=0;i<20;i++)
		{
			if(this.goods[2][i].iGid>0 && this.goods[2][i].iTid==gtype)return this.goods[2][i].iGid;
		}
		return -1;
	}
	
	UseGoods()
	{//检测物品类型，根据物品类型，来判断是装备，还是使用药品，还是其他
		var i,type;
		if(this.lockgoods.iOid==1)
		{//脱下装备
			for(i=0;i<20;i++)
			{//背包里找一个空格
				if(this.goods[2][i].iGid==-1)
				{
					this.destgoods=this.goods[2][i];
					this.MoveGoods(this.lockgoods,this.destgoods);
					return;
				}
			}
		}
		if(this.lockgoods.iOid!=2)return;//只有在背包里的物品才能使用
		type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 16);//装备
		if(type!=-1)
		{//使用装备，根据部位穿戴
			this.destgoods=this.goods[1][type];
			this.MoveGoods(this.lockgoods,this.destgoods);
			return;
		}
		type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 33);
		GmPlay.sop(""+this.lockgoods.iTid+",,,"+type);
		if(type!=-1)
		{
			GmProtocol.gi().s_UseGoods(this.lockgoods.iGid, 1,"");//if(this.lockgoods.iTid==191)
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
			if(i<=0)
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
					this.bLocked=false;
				}
				
				GmMe.me.CalcFightAtt();
			}
			return;
		}
		type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 30);//道具
		if(type!=-1)
		{
			if(type==1)
			{//漫游中使用
				if(this.lockgoods.iTid==160 || this.lockgoods.iTid==161)
				{//仙灵果洗宝宝
					var pf=PetsFrame.Open();
					if(pf!=null)pf.iPage=1;
//					WashPet.Open(this.lockgoods);
				}
				else if(this.lockgoods.iTid==122)
				{//小喇叭，输入聊天文字
					FrameMessage.fm.Open("请在公聊发送窗口选择喇叭频道");
				}
				else
				{
					GmProtocol.gi().s_UseGoods(this.lockgoods.iGid, 1,"");
					if(this.lockgoods.iTid==119)
					{//看是否已经定过位置
						this.bShow=false;//使用了传送符，关闭显示框
					}
					if(this.lockgoods.iTid==237)
					{//vip界面
						MyAttFrame.Open(3);
						this.bShow=false;
					}
				}
			}
			else if(this.lockgoods.iTid==97)FrameMessage.fm.Open("请前往乡水镇找铁匠打造装备");
			else EasyMessage.easymsg.AddMessage("不能直接使用");
			return;
		}
		type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 31);//道具
		if(type!=-1)
		{
			EasyMessage.easymsg.AddMessage("不能直接使用");
			return;
		}
		EasyMessage.easymsg.AddMessage("未知物品使用失败");
	}
	MoveGoods( from, to)
	{
		var i,j;
		if(to.iOid==1)
		{//目标位置是装备位，判断是否满足穿戴条件
			if(!bCheckEquipment(from,to.iPos))//可佩戴，移动或交换
			{//检测失败
				return;
			}
		}
		if(from.iOid==1 && to.iGid!=-1)
		{//装备位和背包交换
			if(!bCheckEquipment(to,from.iPos))//可佩戴，移动或交换
			{//检测失败
				return;
			}
		}
		if(from.iTid==318 || from.iTid==319 || from.iTid==320 || from.iTid==321 || from.iTid==322 || from.iTid==323)
		{
			if(from.iOid==2 && to.iOid!=2)
			{
				FrameMessage.fm.Open("礼包不能移动到行囊和仓库");
				return;
			}
		}
		GmProtocol.gi().s_MoveGoods(from.iGid, from.iOid, from.iPos, to.iGid, to.iOid, to.iPos);
		if(to.iGid==-1)
		{//移动物品
			to.copyfrom(from);
			from.iGid=-1;
		}
		else
		{//交换/叠加物品
			i=GmPlay.de_goods.intValue(from.iTid, 0, 28);
			if(from.iTid==to.iTid && i>1)
			{
				if(to.iCount>=i)
				{//目标物品满，不改变
					for(var z=0;z<100;z++)GmPlay.sop("zzzzzzzzzzzzzzz");
				}
				else if(from.iCount+to.iCount<=i)
				{
					to.iCount+=from.iCount;
					from.iGid=-1;
				}
				else
				{
					j=from.iCount+to.iCount;
					to.iCount=i;
					from.iCount=j-i;
				}
			}
			else
			{
				this.swapgoods.copyfrom(to);
				to.copyfrom(from);
				from.copyfrom(this.swapgoods);
			}
		}
		if(from.iOid==1 || to.iOid==1)
		{//装备更换，重新计算人物属性
			if((from.iOid==1 && from.iPos==2) ||
					(to.iOid==1 && to.iPos==2))
			{//是武器，更换效果
				GmMe.me.bwc=true;
//				FreshWeapon();
			}
			GmMe.me.CalcFightAtt();
		}
	}
	GetWeaponTid()
	{
		if(this.goods[1][2].iGid<=0)return -1;
		else return this.goods[1][2].iTid;
	}
	Open()
	{
		XStat.gi().PushStat(XStat.GS_MYGOODSFRAME);
		/*
		if(this.bShow)return;
		this.bShow=true;
		this.iBagPoint=0;
		FreshWeapon();*/
	}


	UpdateOneGoods( pls)
	{
		var i;
		var rt=pls.GetNextByte();
		var gid,tid,rid,oid,pos,count;
		var pg=null;
		GmPlay.sop("rt="+rt);
		switch(rt)
		{
		case 0://清除一个自己的物品
			gid=pls.GetNextInt();
			oid=pls.GetNextByte();
			pos=pls.GetNextByte();
			if(oid==1 && pos==2)GmMe.me.bwc=true;

			if(gid==this.goods[oid][pos].iGid)this.goods[oid][pos].iGid=-1;
			break;
		case 1://更新一个自己的物品
			gid=pls.GetNextInt();
			tid=pls.GetNextShort();
			rid=pls.GetNextInt();
			oid=pls.GetNextByte();
			pos=pls.GetNextByte();
			count=pls.GetNextByte();

			if(oid==1 && pos==2)GmMe.me.bwc=true;
			pg=this.goods[oid][pos];

			pg.iGid=gid;
			pg.iTid=tid;
			pg.iCount=count;
			for(i=0;i<8;i++)pg.iAtts[i]=pls.GetNextInt();
			GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(tid, -1, 10), pg.aa);
			break;
		}
	}
	GetGoods( pls)
	{//oid:0丢弃，1装备，2背包，3行囊，10-20储物栏
		var i;
		var gid,tid,pos;
		var oid=pls.GetNextByte();
		var pg=null;

		GmPlay.sop("get this.goods oid="+oid);
		for(i=0;i<this.goods[oid].length;i++)this.goods[oid][i].iGid=-1;

		while(true)
		{
			gid=pls.GetNextInt();
			if(gid==-1)break;
			tid=pls.GetNextShort();//type id
			pos=pls.GetNextByte();
			if(oid==1 && pos==2)GmMe.me.bwc=true;
			
			pg=this.goods[oid][pos];
//			{
//				pls.GetNextByte();
//				for(i=0;i<8;i++)pls.GetNextInt();
//			}
			pg.iGid=gid;
			pg.iTid=tid;
			pg.iPos=pos;
			pg.iCount=pls.GetNextByte();
			for(i=0;i<8;i++)pg.iAtts[i]=pls.GetNextInt();
			GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(tid, -1, 10), pg.aa);
		}
		if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
	}
}
MyGoods.mg=null;
MyGoods.gi=function()
{
	if(MyGoods.mg==null)MyGoods.mg=new MyGoods();
	return MyGoods.mg;
}

MyGoods.bCheckEquipment=function( g, dpos)
	{//检测装备是否能佩戴
		var pos=GmPlay.de_goods.intValue(g.iTid, -1, 16);
		if(pos==-1)
		{
			EasyMessage.easymsg.AddMessage("不是装备");
			return false;
		}
		if(pos!=dpos)
		{//
			EasyMessage.easymsg.AddMessage("穿戴装备种类不符");
			return false;
		}
		var level=GmPlay.de_goods.intValue(g.iTid, -1, 9);//穿戴要求等级
		if(level!=-1 && GmMe.me.rbs.iLev<level)
		{//
			var i=(g.iAtts[4]>>10)&0x3ff;
			var j=(g.iAtts[4]>>20)&0x3ff;
			if(i==266 || (i==265 && GmMe.me.rbs.iLev+5>=level))
			{//无级别，简易
			}
			else if(j==266 || (j==265 && GmMe.me.rbs.iLev+5>=level))
			{//无级别，简易
			}
			else
			{
				EasyMessage.easymsg.AddMessage("装备等级太高");
				return false;
			}
		}
		var race=GmPlay.de_goods.intValue(g.iTid, -1, 19);//穿戴种族
		if(race!=-1 && race!=GmMe.me.iRace)
		{
			EasyMessage.easymsg.AddMessage("装备种族不匹配");
			return false;
		}
		var sex=GmPlay.de_goods.intValue(g.iTid, -1, 20);//穿戴性别
		if(sex!=-1 && sex!=GmMe.me.iSex)
		{
			EasyMessage.easymsg.AddMessage("装备性别不匹配");
			return false;
		}
		return true;
	}

	MyGoods.iHaveGoodsCount=function()
	{
		var i,j=0;
		for(i=0;i<20;i++)
		{
			if(MyGoods.mg.goods[2][i].iGid>0)j++;
		}
		return j;
	}
	MyGoods.bHaveGoods=function( gtype, count)
	{
		var i;
		for(i=0;i<20;i++)
		{
			if(MyGoods.mg.goods[2][i].iGid>0 && MyGoods.mg.goods[2][i].iTid==gtype && MyGoods.mg.goods[2][i].iCount>=count)return true;
		}
		return false;
	}

	MyGoods.iX,MyGoods.iY,MyGoods.iW,MyGoods.iH;

MyGoods.GW=60;//单个物品格子大小
MyGoods.GH=60;