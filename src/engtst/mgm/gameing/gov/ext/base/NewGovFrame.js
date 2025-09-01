
import PublicInterface from "../../../../../../zero/Interface/PublicInterface"
import GameData from "../../../../../../config/GameData"
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../../engtst/mgm/frame/UIList"
import FormatString from "../../../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import PromptMessage from "../../../../../../engtst/mgm/frame/message/PromptMessage"
import PrivateChat_Send from "../../../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import GovFrame from "../../../../../../engtst/mgm/gameing/gov/GovFrame"
import MyGov from "../../../../../../engtst/mgm/gameing/gov/MyGov"
import BeginersGuide from "../../../../../../engtst/mgm/gameing/help/BeginersGuide"

import MemberOperate from "./MemberOperate"
import Gov_SetDetail from "./Gov_SetDetail"
import ConfirmApply from "./ConfirmApply"

class GOV_MEMBER
{/*
	public int iRid;
	short iInitStat;
	
	String sName;
	int iSchoolId;
	int this.iLev;
	int iJob;
	int this.iTick;
	int this.iMaxTick;
	String sJoinDate;
	String sLoginTime;
	int iPower;
	int iRas;
	int iOnLine;*/
	
	 constructor()
	{
		this.iRid=0;
	}
}

class GOV_APPLYED
{/*
	public int iRid;
	String sName;
	int this.iLev;
	int iSchoolId;
	int iRas;
	String sATime;
	
    short iInitStat;*/
    constructor()
    {

    }
}

class GOV_EVENT
{
    /*
	public int iEid;
	public String this.sDetail;
	public String sTime;
    int iInitStat;*/
    constructor()
    {

    }
}

export default class NewGovFrame extends BaseClass{

	 constructor( ani)
	{
		super();
        this.sBuildingDetail=[
			"青龙堂：可提升青龙任务的效率以及雇佣工人的收益",
			"白虎堂：可降低维护的安定度消耗，安定度影响技能研究效率",
			"朱雀堂：可提高成员炼丹成功率和副产品率",
			"玄武堂：可提升行动力上限和帮派维护增加的守护兽经验",
			"学院：可提升帮派维护增加的技能经验",
			"金库：可提升帮派资金上限",
			"商会：可增加帮派商店出产道具种类和数量",
			"厢房：可提升帮派人数上限",
            "药房：可增加帮派药房出产道具种类和数量"];

        this._GOVWELFARE=[
                ["帮派修炼","提升修炼，战斗更加得心应手","#c0000001.	物理攻击修炼#e# # 每级提升2%物理攻击的伤害效果#e2.	法术攻击修炼#e# # 每级提升2%法术攻击的伤害效果#e3.	物理防御修炼#e# # 每级降低2%受到的物理伤害效#e4.	法术防御修炼#e# # 每级降低2%受到的法术伤害效果#e5.	封印修炼#e# # 每级提升2%封印命中几率#e6.	抗封修炼#e# # 每级降低2%被封印命中几率"],
                ["帮派技能","学习辅助技能，升级赚钱两不误","#c0000001.	强身术#e# # 学习后能增加气血上限#e2.	修心#e# # 学习后能增加魔法上限#e3.	健体术#e# # 学习后能增加体力上限#e4.	炼丹术#e# # 学习后可以提高炼丹的能力#e5.	烹饪#e# #  学习后可以提高制作食物的能力#e6.	锻造术#e# # 学习后可以提高制作头盔和腰带的能力#e7.	冶金术#e# # 学习后可以提高制作武器和项链的能力#e8.	剪裁术#e# # 学习后可以提高制作衣服和靴子的能力"],
                ["帮派商店","限时折扣，特色产品，仅此一家","#c000000帮派招商，商人们都在帮里开店了，我们有特殊渠道进货，价格有优惠哦#e#e每日11:00,15:00,19:00,23:00，帮派商店会刷新一定数量商品，种类繁多，价格优惠。#e#e升级商会可以增加帮派商店出产种类和数量#e#e"],
                ["帮派药房","卖治病的药，售炼心的炉","#c000000江湖人士，过得都是刀口舔血的日子，楚王感怀，允许各帮各派建立帮派药房。#e#e每日12:00,15:00,18:00,21:00，帮派药房刷新一定数量物品，包括药材，丹方，	以及丹炉。玩家可消耗铜币，元宝或者帮贡选择购买。可能会有惊喜打折物品哦。#e#e升级药房可以增加帮派药房出产种类和数量#e#e"]];
         this._GOVACTIVITY=[
                    ["帮派竞赛","风云起，群帮争霸，狼烟升，万雄交锋。","#c000000# # 帮派竞赛每周周一至周五帮主消耗帮派资金进行报名，报名资金排名前8的帮派入选帮战。#e# # 帮派成功入选后，入帮3天以上等级达到20级的玩家，可于周五周六周日的19:30~20:00由咸阳帮战接引人进入帮战地图。#e# # 帮派竞赛分为粮草争夺战和场地对战，周五周六为粮草争夺战，周日为场地对战。#e# # 粮草争夺战双方初始粮草为100，任意一方粮草归零或者成员全部离开场地为负。#e# # 场地对战以成员全部离开场地者为负。#e帮派竞赛期间每次死亡，损失部分体力，体力为0，自动离场。#e# # 帮派竞赛期间每次赢得战斗或者成功运送粮草获得帮贡等奖励；体力归零自动离场获得经验帮贡，可能获得道具奖励；胜利帮派会在己方场地内刷新10个大宝箱以供捡取。"],
                    ["帮派副本","一段传奇，一个故事，探索小千世界之谜。","#c000000# # 拟定帮派守护兽达到30级时，帮派副本由帮主或拥有开启副本权限的成员消耗200万帮派资金，1000行动力开启，在开启时间内，加入帮派大于5天等级达到35的帮众方可参加，帮派副本开启时间持续2小时。#e#e# # 副本内玩家每三分钟将获得一次经验与帮贡奖励。#e#e# # 完成副本后，副本内所有玩家将获得侠义礼盒，惊喜多多"],
                    ["朱雀任务","访朱雀总管，寻神秘丹方。可获得帮贡，丹方","#c000000# # 玩家达到20后可以在帮派领地里找朱雀堂总管领取朱雀任务，完成任务可获得大量经验，金钱和帮贡，并且在第十次任务完成时获得丹方，丹方是炼丹的必需品。"],
                    ["青龙任务","倾众人之力，为帮派建设。可获得海量帮贡","#c000000# # 玩家达到20后可以在帮派领地里找朱雀堂总管领取青龙任务，完成任务可获得大量经验，金钱和帮贡。#e#e# # 青龙任务可以为帮派提供大量帮派建筑进度。"],
                    ["玄武任务","劳心劳力，为帮派谋取资金。可获得海量帮贡","#c000000# # 玩家达到20后可以在帮派领地里找朱雀堂总管领取玄武任务，完成任务可获得大量经验，金钱和帮贡。#e#e# # 玄武任务可以为帮派提供安定度以及大量帮派资金。"],
                    ["白虎任务","攘外安内，稳固帮内安定。可获得海量帮贡","#c000000# # 玩家达到20后可以在帮派领地里找朱雀堂总管领取白虎任务，完成任务可获得大量经验，金钱和帮贡。#e#e# # 白虎任务可以为帮派提供大量安定度。"]
         ];
            
		var i;
		this.iW=1100;
		this.iH=620;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;

		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);

		this.iPage=0;
		this.btn_page=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
			this.btn_page[i].Move(this.iX+this.iW-15, this.iY+40+125*i, 50, 140);
		}

		this.btn0_fastback=new XButtonEx2(GmPlay.xani_button);
		this.btn0_fastback.InitButton("普通按钮170_55");
		this.btn0_fastback.Move(this.iX+this.iW-25-20-170, this.iY+25+20, 170, 55);
		this.btn0_fastback.sName="快速回帮";

		this.btn0_govstatus=new XButtonEx2(GmPlay.xani_button);
		this.btn0_govstatus.bSingleButton=true;

		this.btn0_govbuilding=new XButtonEx2(GmPlay.xani_button);
		this.btn0_govbuilding.bSingleButton=true;
		
		this.btn0_editdetail=new XButtonEx2(GmPlay.xani_button);
		this.btn0_editdetail.bSingleButton=true;

		this.i0Table=0;
		this.i0ShowExplain=-1;

		this.btn1_page=new Array(3);//
		this.btn1_page[0]=new XButtonEx2(GmPlay.xani_button);
		this.btn1_page[0].InitButton("选择按钮145_56");
		this.btn1_page[0].sName="成员列表";
		
		this.btn1_page[1]=new XButtonEx2(GmPlay.xani_button);
		this.btn1_page[1].InitButton("选择按钮145_56");
		this.btn1_page[1].sName="申请列表";
		
		this.btn1_page[2]=new XButtonEx2(GmPlay.xani_button);
		this.btn1_page[2].InitButton("选择按钮145_56");
		this.btn1_page[2].sName="帮派事件";
		
		this.btn1_message=new XButtonEx2(GmPlay.xani_button);
		this.btn1_message.InitButton("喇叭按钮60_60");
		
		this.btn1_leavegov=new XButtonEx2(GmPlay.xani_button);
		this.btn1_leavegov.InitButton("普通按钮170_55");
		this.btn1_leavegov.sName="脱离帮派";
		
		this.ui1a_memberlist=new UIList(0,9,this.iW-90,50+40*10);
		this.ui1a_memberlist.SetTitle(0, "编号", 70,false);
		this.ui1a_memberlist.SetTitle(1, "名字", 180,true);
		this.ui1a_memberlist.SetTitle(2, "门派", 80,true);
		this.ui1a_memberlist.SetTitle(3, "等级", 70,true);
		this.ui1a_memberlist.SetTitle(4, "职位", 80,true);
		this.ui1a_memberlist.SetTitle(5, "剩余帮贡", 110,true);
		this.ui1a_memberlist.SetTitle(6, "历史帮贡", 110,true);
		this.ui1a_memberlist.SetTitle(7, "入帮时间", 155,true);
		this.ui1a_memberlist.SetTitle(8, "离线时间", 155,true);
		
		this.ui1b_applylist=new UIList(0,6,this.iW-90,50+40*10);
		this.ui1b_applylist.SetTitle(0, "序号", 70,false);
		this.ui1b_applylist.SetTitle(1, "名字", 180,false);
		this.ui1b_applylist.SetTitle(2, "门派", 80,false);
		this.ui1b_applylist.SetTitle(3, "等级", 70,false);
		this.ui1b_applylist.SetTitle(4, "号码", 120,false);
		this.ui1b_applylist.SetTitle(5, "申请时间", 490,false);
		
		this.ui1c_govevent=new UIList(0,2,this.iW-90,50+40*10);
		this.ui1c_govevent.SetTitle(0, "日期", 250,false);
		this.ui1c_govevent.SetTitle(1, "事件", 760,false);
		this.ui1c_govevent.iTitleHeight=0;
		this.ui1c_govevent.iAlign[1]=0;
		
		this.iSortType=-1;
		this.iSortUD=0;
		
		this.btn2_go=new Array(4);//
		this.btn2_detail=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn2_go[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn2_go[i].InitButton("普通按钮140_55");
			this.btn2_go[i].sName="前往";
			this.btn2_detail[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn2_detail[i].bSingleButton=true;
		}
		this.bLock2=false;
		this.iOffY2=0;
		
		this.btn3_go=new Array(6);//
		this.btn3_detail=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn3_go[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn3_go[i].InitButton("普通按钮140_55");
			this.btn3_go[i].sName="前往";
			this.btn3_detail[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn3_detail[i].bSingleButton=true;
		}
		this.bLock3=false;
		this.iOffY3=0;
	}

	_InitMemberDetail( pls)
	{
		var rid=pls.GetNextInt();
		var i;
		for(i=0;i<this.iMCount;i++)
		{
			if(this.gov_members[i].iInitStat==2 && this.gov_members[i].iRid==rid)
			{
				this.gov_members[i].sName=pls.GetNextString();
				this.gov_members[i].iSchoolId=pls.GetNextByte();
				this.gov_members[i].iLev=pls.GetNextShort();
				this.gov_members[i].iJob=pls.GetNextShort();
				this.gov_members[i].iTick=pls.GetNextInt();
				this.gov_members[i].iMaxTick=pls.GetNextInt();
				this.gov_members[i].sJoinDate=pls.GetNextString();
				this.gov_members[i].sLoginTime=pls.GetNextString();
				this.gov_members[i].iPower=pls.GetNextShort();
				this.gov_members[i].iRas=pls.GetNextByte();
				this.gov_members[i].iOnLine=pls.GetNextByte();
				this.gov_members[i].iInitStat=3;
				return;
			}
		}
	}

	 _ApplyDetail( pls)
	{
		var i;
		var rid=pls.GetNextInt();
		for(i=0;i<this.iACount;i++)
		{
			if(this.gov_applys[i].iInitStat==2 && this.gov_applys[i].iRid==rid)
			{
				this.gov_applys[i].sName=pls.GetNextString();
				this.gov_applys[i].iSchoolId=pls.GetNextInt();
				this.gov_applys[i].iRas=pls.GetNextInt();
				this.gov_applys[i].iLev=pls.GetNextInt();
				this.gov_applys[i].sATime=pls.GetNextString();
				this.gov_applys[i].iInitStat=3;
				break;
			}
		}
	}

	 _ApplyList( pls)
	{
		var i;
		this.iACount=pls.GetNextShort();
		if(this.iACount<=0)return;
		this.gov_applys=new Array(this.iACount);//
		for(i=0;i<this.iACount;i++)
		{
			this.gov_applys[i]=new GOV_APPLYED();
			this.gov_applys[i].iRid=pls.GetNextInt();
			this.gov_applys[i].iInitStat=1;
		}
	}

	 _InitEventDetail( pls)
	{
		var eid=pls.GetNextInt();
		for(var i=0;i<this.iECount;i++)
		{
			if(this.gov_events[i].iEid==eid)
			{
				this.gov_events[i].sTime=pls.GetNextString();
				this.gov_events[i].sDetail=pls.GetNextString();
				this.gov_events[i].iInitStat=3;
			}
		}
	}

	 _InitGovEvent( pls)
	{
		this.iECount=pls.GetNextInt();
		this.gov_events=new Array(this.iECount);//
		for(var i=0;i<this.iECount;i++)
		{
			this.gov_events[i]=new GOV_EVENT();
			this.gov_events[i].iEid=pls.GetNextInt();
			this.gov_events[i].iInitStat=1;
		}
	}

	_InitMemberList( pls)
	{
		var i;
		var st=pls.GetNextByte();//排序方式
		var ac=pls.GetNextShort();//总数
		var start=pls.GetNextShort();//起始偏移量
		
//		GmPlay.sop("type="+st+"  allcount="+ac+"    start="+start);
		
		if(start==0)
		{//重新分配内存
			this.gov_members=new Array(ac);//
			for(i=0;i<ac;i++)
			{
				this.gov_members[i]=new GOV_MEMBER();
				this.gov_members[i].iInitStat=0;
			}
			this.iMCount=ac;
			this.iSortType=st;
		}
		while(start<this.iMCount)
		{
			i=pls.GetNextInt();
			if(i==0)break;
//			GmPlay.sop(""+start+"==="+i);
			this.gov_members[start].iRid=i;
			this.gov_members[start].iInitStat=1;
			start++;
		}
	}
	
	GetBase( pls)
	{
		this.iLev=pls.GetNextInt();
		this.sMasterName=pls.GetNextString();
		this.iMasterId=pls.GetNextInt();
		this.sFightGovName=pls.GetNextString();
		this.iFightGovId=pls.GetNextShort();
		this.sDetail=pls.GetNextString();
		
		this.iMemberCount=pls.GetNextInt();
		this.iMaxMemberCount=pls.GetNextInt();
		this.iMoney=pls.GetNextInt();
		this.iMaxMoney=pls.GetNextInt();
		this.iExp=pls.GetNextInt();
		this.iMaxExp=pls.GetNextInt();
		this.iUpgradeExp=pls.GetNextInt();
		this.iStable=pls.GetNextInt();
		this.iMaxStable=pls.GetNextInt();//安定度
		this.iTick=pls.GetNextInt();
		this.iMaxTick=pls.GetNextInt();//行动力
		this.iBuildingId=pls.GetNextByte();
		this.iBuildingProc=pls.GetNextInt();
		this.iBuildingUpgrade=pls.GetNextInt();
		this.iReserchId=pls.GetNextByte();
		this.iReserchProc=pls.GetNextInt();
		this.iReserchUpgrade=pls.GetNextInt();
		this.iMtLev=pls.GetNextInt();//维护等级
		
		this.iBuildingLevs=new Int32Array(9);
		this.iBuildingProcs=new Int32Array(9);
		for(var i=0;i<9;i++)
		{
			pls.GetNextByte();
			this.iBuildingLevs[i]=pls.GetNextShort();
			this.iBuildingProcs[i]=pls.GetNextInt();
		}
	}
	
	Draw()
	{
		var i;

		DrawMode.new_baseframe4(this.iX, this.iY, this.iW,this.iH,"帮","派","列","表");
		this.btn_close.Draw();
		
		for(i=0;i<4;i++)
		{
			if(this.iPage==i)
			{
				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
		}
		DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*0-4, 40, 70,this.iPage==0,"帮","派","信","息");
		DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*1-8, 40, 70,this.iPage==1,"帮","派","成","员");
		DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*2-12, 40, 70,this.iPage==2,"帮","派,","福","利");
		DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*3-16, 40, 70,this.iPage==3,"帮","派","活","动");
		
		switch(this.iPage)
		{
		case 0:
			this.Draw_0();
			break;
		case 1:
			this.Draw_1();
			break;
		case 2:
			this.Draw_2();
			break;
		case 3:
			this.Draw_3();
			break;
		}
	}
	 Draw_0()
	{
		var i;
		var offx,offy;
		var w,h;
		
		offx=this.iX+25;
		offy=this.iY+25;
		w=this.iW-50;
		h=this.iH-50;
		DrawMode.new_framein(offx, offy, w, h);
		
		offx=this.iX+25+20;offy=this.iY+25+20;
		DrawMode.frame_type4("淡蓝色a30_30", offx, offy, 500, 440, 30, 30);
		
		offx+=10;offy+=20;
		this.DrawMessage(offx,offy,160,300,"帮派名称",MyGov.mg.sName);
		this.DrawMessage(offx,offy+50,160,80,"帮派等级",""+(this.iLev+1));
		this.DrawMessage(offx+160+80,offy+50,140,80,"帮派号码",""+MyGov.mg.iRealGid);
		this.DrawMessage(offx,offy+100,160,300,"帮      主",this.sMasterName);
		this.DrawMessage(offx,offy+150,160,300,"敌对帮派",this.iFightGovId==0?"无":this.sFightGovName);
		
		offx+=20;offy+=200;
		this.btn0_editdetail.Move(offx,offy,440,200);
		DrawMode.frame_type3("纯色b10_10",offx,offy,440,200,10,10);
		DrawMode.frame_type2("外边框a10_10",offx,offy,440,200,10,10);
		DrawMode.frame_type1("帮派宣言a20_44",offx+220-60,offy+20,120,20);
		M3DFast.gi().DrawTextEx(offx+220,offy+20+22, "帮派宣言", 0xff000000, 25, 101, 1, 1, 0, -2, -2);

		FormatString.gi().FormatEx("#c000000"+this.sDetail, 400, 20, 0, 0, 20);
		FormatString.gi().Draw(offx+20,offy+80);
		
		offx=this.iX+25+20;offy=this.iY+25+20+440+10;
		DrawMode.frame_type4("淡蓝色a30_30", offx, offy, 500, 80, 30, 30);
		
		offx+=10;offy+=20;
		this.DrawMessage(offx,offy,160,100,"我的职位",GovFrame.sJob(MyGov.mg.iJob));
		this.DrawMessage(offx+180+80,offy,100,100,"帮贡",""+MyGov.mg.iTick);
		
		offx=this.iX+25+20+500+10;offy=this.iY+25+20;
		this.btn0_fastback.Draw();
		this.btn0_govstatus.Move(offx+30, offy, 140, 70);
		this.btn0_govbuilding.Move(offx+30+145, offy, 140, 70);
		DrawMode.frame_type4(this.i0Table==0?"淡蓝色a30_30":"蓝色a30_30", offx+30, offy, 140, 90, 30, 30);
		DrawMode.frame_type4(this.i0Table==1?"淡蓝色a30_30":"蓝色a30_30", offx+30+145, offy, 140, 90, 30, 30);
		DrawMode.frame_type4("淡蓝色a30_30", offx, offy+60, 500, 470, 30, 30);
		
		offx+=10;offy+=60+15;
		i=45;
		if(this.i0Table==0)
		{
			M3DFast.gi().DrawText_2(this.btn0_govstatus.iX+this.btn0_govstatus.iW/2,this.btn0_govstatus.iY+this.btn0_govstatus.iH/2,"帮派状态",0xffffff00,30,101,1,1,0,-2,-2,4,0xff00244d);
			M3DFast.gi().DrawTextEx(this.btn0_govbuilding.iX+this.btn0_govbuilding.iW/2,this.btn0_govbuilding.iY+this.btn0_govbuilding.iH/2,"帮派建筑",0xff000000,30,101,1,1,0,-2,-2);
			DrawMode.frame_type3("纯色c30_30", this.btn0_govstatus.iX+2, this.btn0_govstatus.iY+60, 140-4, 30, 30, 30);
			
			this.DrawMessage1(offx,offy+i*0,200,260,XDefine.CalcRate(this.iMemberCount,this.iMaxMemberCount,260),"成员数量",this.iMemberCount+"/"+this.iMaxMemberCount);
			this.DrawMessage1(offx,offy+i*1,200,260,XDefine.CalcRate(this.iMoney,this.iMaxMoney,260),"帮派资金",this.iMoney+"/"+this.iMaxMoney);
			this.DrawMessage1(offx,offy+i*2,200,260,XDefine.CalcRate(this.iExp,this.iMaxExp,260),"当前繁荣度",this.iExp+"/"+this.iMaxExp);
			this.DrawMessage1(offx,offy+i*3,200,260,0,"升级繁荣度",""+this.iUpgradeExp);
			this.DrawMessage1(offx,offy+i*4,200,260,XDefine.CalcRate(this.iStable,this.iMaxStable,260),"安定度",this.iStable+"/"+this.iMaxStable);
			this.DrawMessage1(offx,offy+i*5,200,260,XDefine.CalcRate(this.iTick,this.iMaxTick,260),"帮派行动力",this.iTick+"/"+this.iMaxTick);
			this.DrawMessage1(offx,offy+i*6,200,260,XDefine.CalcRate(this.iBuildingProc,this.iBuildingUpgrade,260),"当前建造建筑",GovFrame.sBuilding(this.iBuildingId)+"("+this.iBuildingProc+"/"+this.iBuildingUpgrade+")");
			this.DrawMessage1(offx,offy+i*7,200,260,XDefine.CalcRate(this.iReserchProc,this.iReserchUpgrade,260),"当前研究科技",GovFrame.sSkill(this.iReserchId)+"("+this.iReserchProc+"/"+this.iReserchUpgrade+")");
			this.DrawMessage1(offx,offy+i*8,200,260,0,"当前维护级别",this.iMtLev==0?"低":(this.iMtLev==1?"中":"高"));
			this.DrawMessage1(offx,offy+i*9,200,260,0,"守护兽等级",""+MyGov.mg.iShsLev);
		}
		else
		{
			M3DFast.gi().DrawTextEx(this.btn0_govstatus.iX+this.btn0_govstatus.iW/2,this.btn0_govstatus.iY+this.btn0_govstatus.iH/2,"帮派状态",0xff000000,30,101,1,1,0,-2,-2);
			M3DFast.gi().DrawText_2(this.btn0_govbuilding.iX+this.btn0_govbuilding.iW/2,this.btn0_govbuilding.iY+this.btn0_govbuilding.iH/2,"帮派建筑",0xffffff00,30,101,1,1,0,-2,-2,4,0xff00244d);
			DrawMode.frame_type3("纯色c30_30", this.btn0_govbuilding.iX+2, this.btn0_govbuilding.iY+60, 140-4, 30, 30, 30);

			for(i=0;i<9;i++)
			{
				this.DrawMessage1(offx,offy+i*50,200,260,XDefine.CalcRate(this.iBuildingProcs[i],MyGov.iBuildingUpgrad[this.iBuildingLevs[i]]/10,260),GovFrame.sBuilding(i),this.iBuildingProcs[i]+"/"+MyGov.iBuildingUpgrad[this.iBuildingLevs[i]]/10);
				M3DFast.gi().DrawTextEx(offx+10+110,offy+20+i*50, this.iBuildingLevs[i]+"级", 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			}
		}
		this.i0Lx=offx;
		this.i0Ly=offy;
		if(this.i0ShowExplain>=0)
		{
			FormatString.gi().FormatEx(this.sBuildingDetail[this.i0ShowExplain], 260, 20, 0, 0, 25);
			DrawMode.frame_type4("蓝色a30_30", offx-300, offy+this.i0ShowExplain*50-FormatString.gi().iH/2, 300, 40+FormatString.gi().iH, 30, 30);
			FormatString.gi().Draw(offx-300+20, offy+this.i0ShowExplain*50-FormatString.gi().iH/2+20);
		}

		if(Confirm1.end(Confirm1.CONFIRM_BACKGOV))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_NewGovOperate(4, 0, 0, 0,0,"");
				XStat.gi().PopStat(1);
			}
		}
	}

	 DrawMessage1( x, y, w1, w2, w3, s1, s2)
	{
		M3DFast.gi().DrawTextEx(x+10,y+20, s1, 0xff000000, 30, 101, 1, 1, 0, 0, -2);
		DrawMode.frame_type1("进度条背景a20_38", x+w1, y+1, w2, 20);
		var ox=3;
		w3=XDefine.CalcRate(w3,w2,w2-ox-ox);
		if(w3>0)
		{
			M3DFast.gi().SetViewClip(x+w1+ox, y, x+w1+w3/2+ox, y+50);
			GmPlay.xani_frame.DrawAnima(x+w1+ox, y+5,"进度条a150_30",0);
			M3DFast.gi().NoClip();
			
			M3DFast.gi().SetViewClip(x+w1+w3/2+ox, y, x+w1+w3+ox, y+50);
			GmPlay.xani_frame.DrawAnima(x+w1-150+w3+ox, y+5,"进度条a150_30",1);
			M3DFast.gi().NoClip();
		}
		M3DFast.gi().DrawTextEx(x+w1+w2/2,y+20, s2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
	}
	 DrawMessage( x, y, w1, w2, s1, s2)
	{
		M3DFast.gi().DrawTextEx(x+w1/2,y+20, s1, 0xff000000, 30, 101, 1, 1, 0, -2, -2);
		DrawMode.frame_type1("文本框a20_40", x+w1, y, w2, 20);
		M3DFast.gi().DrawTextEx(x+w1+w2/2,y+20, s2, 0xffffffff, 25, 101, 1, 1, 0, -2, -2);		
	}
	 Draw_1()
	{
		var i;
		var offx,offy;
		var w,h;

		offx=this.iX+25;
		offy=this.iY+25;
		w=this.iW-50;
		h=this.iH-50;
		DrawMode.new_framein(offx, offy, w, h);

		offx+=20;
		offy+=20;
		
		this.btn1_page[this.i1Page].bMouseIn=true;
		this.btn1_page[this.i1Page].bMouseDown=true;

		for(i=0;i<3;i++)
		{
			this.btn1_page[i].Move(offx+i*165, offy, 145, 56);
			this.btn1_page[i].Draw();
		}

		switch(this.i1Page)
		{
		case 0:	this.Draw_1a(offx,offy);	break;
		case 1:	this.Draw_1b(offx,offy);	break;
		case 2:	this.Draw_1c(offx,offy);	break;
		}
	}

	 Draw_1a( offx, offy)
	{
		var i,j;
		if(MyGov.mg.bCheckPower(3))
		{
			this.btn1_message.Move(offx+600, offy, 60, 60);
			this.btn1_message.Draw();
		}
		this.btn1_leavegov.Move(this.iX+this.iW-25-20-170, offy, 170, 55);
		this.btn1_leavegov.Draw();
		
		offy+=75;
		this.ui1a_memberlist.BeginDraw(offx, offy);
		for(j=0;j<this.iMCount;j++)
		{
			if(this.iSortUD==0)i=j;
			else i=this.iMCount-j-1;
			this.ui1a_memberlist.DrawUnit(0, j, ""+(j+1));
			
			if(this.ui1a_memberlist.bShow(j) && this.gov_members[i]!=null)
			{
				if(this.gov_members[i].iInitStat==1)
				{//获取信息
					GmProtocol.gi().s_NewGovOperate(6, this.gov_members[i].iRid, 0, 0,0,"");
					this.gov_members[i].iInitStat=2;
				}
				else if(this.gov_members[i].iInitStat==2)
				{
					this.ui1a_memberlist.DrawUnit(1, j, "获取中...");
				}
				else if(this.gov_members[i].iInitStat==3)
				{///显示
					this.ui1a_memberlist.DrawUnit(1, j, this.gov_members[i].sName);
					this.ui1a_memberlist.DrawUnit(2, j, GameData.sSchools[this.gov_members[i].iSchoolId]);
					this.ui1a_memberlist.DrawUnit(3, j, ""+this.gov_members[i].iLev);
					this.ui1a_memberlist.DrawUnit(4, j, GovFrame.sJob(this.gov_members[i].iJob));
					this.ui1a_memberlist.DrawUnit(5, j, ""+this.gov_members[i].iTick);
					this.ui1a_memberlist.DrawUnit(6, j, ""+this.gov_members[i].iMaxTick);
					this.ui1a_memberlist.DrawUnit(7, j, this.gov_members[i].sJoinDate);
					this.ui1a_memberlist.DrawUnit(8, j, this.gov_members[i].iOnLine==0?this.gov_members[i].sLoginTime:"在线");
				}
			}
		}
		this.ui1a_memberlist.FinishDraw();
		if(this.iSortType==this.ui1a_memberlist.iSortType)
		{
			if(this.iSortUD!=this.ui1a_memberlist.iSortUD)
			{//本地翻转
				this.iSortUD=this.ui1a_memberlist.iSortUD;
//				this.ui1a_memberlist.iOffY=0;
//				SortMember();
			}
		}
		else
		{
			this.iSortType=this.ui1a_memberlist.iSortType;
			this.iSortUD=0;
			if(this.iSortType>=1 && this.iSortType<=8)
			{
				GmProtocol.gi().s_NewGovOperate(5, this.iSortType, 0, 0,0,"");
				this.iMCount=0;
				this.ui1a_memberlist.iOffY=0;
			}
		}
		i=this.ui1a_memberlist.iChecked();
		if(i>=0)
		{//点击了，弹出操作框
			if(this.iSortUD==0);
			else i=this.iMCount-i-1;
			MemberOperate.Open(this.gov_members[i]);
		}
		if(Confirm1.end(Confirm1.CONFIRM_LEAVEGOV))
		{
			if(Confirm1.bConfirm)
			{//离开帮派
				GmProtocol.gi().s_LeaveGov();
				MyGov.mg.iRealGid=-1;
				XStat.gi().PopStat(1);
			}
		}
	}
	 Draw_1b( offx, offy)
	{
		var i,j;
		offy+=75;
		this.ui1b_applylist.BeginDraw(offx, offy);
		for(j=0;j<this.iACount;j++)
		{
			i=j;
			this.ui1b_applylist.DrawUnit(0, j, ""+(j+1));
			
			if(this.ui1b_applylist.bShow(j) && this.gov_applys[i]!=null)
			{
//				GmPlay.sop("sdf"+this.gov_applys[i].iInitStat);
				if(this.gov_applys[i].iInitStat==1)
				{//获取信息
					GmProtocol.gi().s_NewGovOperate(10, this.gov_applys[i].iRid, 0, 0,0,"");
					this.gov_applys[i].iInitStat=2;
				}
				else if(this.gov_applys[i].iInitStat==2)
				{
					this.ui1b_applylist.DrawUnit(1, j, "获取中...");
				}
				else if(this.gov_applys[i].iInitStat==3)
				{///显示
					
					this.ui1b_applylist.DrawUnit(1, j, this.gov_applys[i].sName);
					this.ui1b_applylist.DrawUnit(2, j, GameData.sSchools[this.gov_applys[i].iSchoolId]);
					this.ui1b_applylist.DrawUnit(3, j, ""+this.gov_applys[i].iLev);
					this.ui1b_applylist.DrawUnit(4, j, ""+this.gov_applys[i].iRid);
					this.ui1b_applylist.DrawUnit(5, j, this.gov_applys[i].sATime);
				}
			}
		}
		this.ui1b_applylist.FinishDraw();
		i=this.ui1b_applylist.iChecked();
		if(i>=0 && i<this.iACount)
		{//点击了，弹出操作框
			ConfirmApply.Open(this.gov_applys[i]);
		}
    }

	 Draw_1c( offx, offy)
	{
		var i,j;
		offy+=75;
		this.ui1c_govevent.BeginDraw(offx, offy);
		for(j=0;j<this.iECount;j++)
		{
			i=j;
//			this.ui1c_govevent.DrawUnit(0, j, ""+(j+1));
			
			if(this.ui1c_govevent.bShow(j) && this.gov_events[i]!=null)
			{
//				GmPlay.sop("sdf"+this.gov_applys[i].iInitStat);
				if(this.gov_events[i].iInitStat==1)
				{//获取信息
					GmProtocol.gi().s_NewGovOperate(13, this.gov_events[i].iEid, 0, 0,0,"");
					this.gov_events[i].iInitStat=2;
				}
				else if(this.gov_events[i].iInitStat==2)
				{
					this.ui1c_govevent.DrawUnit(1, j, "获取中...");
				}
				else if(this.gov_events[i].iInitStat==3)
				{///显示
					this.ui1c_govevent.DrawUnit(0, j, this.gov_events[i].sTime);
					this.ui1c_govevent.DrawUnit(1, j, this.gov_events[i].sDetail);
				}
			}
		}
		this.ui1c_govevent.FinishDraw();
	}

	 Draw_2()
	{//帮派福利
		var i;

		DrawMode.new_framein(this.iX+25, this.iY+25, this.iW-50, this.iH-50);

		M3DFast.gi().SetViewClip(this.iX+25+20, this.iY+25+20, this.iX+this.iW-25-20, this.iY+this.iH-25-20);
		for(i=0;i<4;i++)
		{
			this.Draw2Entry(i,this.iX+25+20,this.iY+25+20+i*100+this.iOffY2,this._GOVWELFARE[i][0],this._GOVWELFARE[i][1]);
		}
		M3DFast.gi().NoClip();
		if(!this.bLock2)
		{
			if(this.iOffY2>0 || this.iOffY2<0)this.iOffY2/=2;
		}
		for(i=0;i<4;i++)
		{
			if(Confirm1.end(Confirm1.CONFIRM_GOVCONVEY1[i]))
			{
				if(Confirm1.bConfirm)
				{//
					GmProtocol.gi().s_NewGovOperate(4, 1, i, 0,0,"");
					XStat.gi().PopStat(1);
				}
			}
		}
	}
	 Draw2Entry( p, offx, offy, title, detail)
	{
		DrawMode.frame_type1("帮派福利条a20_92",offx,offy,1010,20);
		
		GmPlay.xani_icon.DrawAnima_aa(offx+20, offy+(92-73)/2, title,0);
		M3DFast.gi().DrawText_2(offx+20+73+20,offy+92/2, title, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 4, 0xffa57841);
		M3DFast.gi().DrawTextEx(offx+20+73+20+160, offy+92/2, detail, 0xff000000, 20, 101, 1, 1, 0, 0, -2);
		this.btn2_go[p].Move(offx+1010-20-140,offy+(92-55)/2,140,55);
		this.btn2_go[p].Draw();
		
		this.btn2_detail[p].Move(offx+20, offy+(92-73)/2, 73,73);
	}


	 Draw_3()
	{//帮派活动
		var i;

		DrawMode.new_framein(this.iX+25, this.iY+25, this.iW-50, this.iH-50);

		M3DFast.gi().SetViewClip(this.iX+25+20, this.iY+25+20, this.iX+this.iW-25-20, this.iY+this.iH-25-20);
		for(i=0;i<6;i++)
		{
			this.Draw3Entry(i,this.iX+25+20,this.iY+25+20+i*100+this.iOffY3,this._GOVACTIVITY[i][0],this._GOVACTIVITY[i][1]);
		}
		M3DFast.gi().NoClip();
		if(!this.bLock3)
		{//100*6=600,,,,,,,,,this.iH-90
			i=(100*6-8)-(this.iH-90);
			if(this.iOffY3>0)this.iOffY3/=2;
			if(i<=0)
			{
				if(this.iOffY3<0)this.iOffY3/=2;
			}
			else if(this.iOffY3<-i)
			{
				i+=this.iOffY3;
				i/=2;
				this.iOffY3-=i;
			}
		}
		for(i=0;i<6;i++)
		{
			if(Confirm1.end(Confirm1.CONFIRM_GOVCONVEY2[i]))
			{
				if(Confirm1.bConfirm)
				{//
					GmProtocol.gi().s_NewGovOperate(4, 2, i, 0,0,"");
					XStat.gi().PopStat(1);
				}
			}
		}
	}
	 Draw3Entry( p, offx, offy, title, detail)
	{
		DrawMode.frame_type1("帮派福利条a20_92",offx,offy,1010,20);
		
		GmPlay.xani_icon.DrawAnima_aa(offx+20, offy+(92-73)/2, title,0);
		M3DFast.gi().DrawText_2(offx+20+73+20,offy+92/2, title, 0xffffff00, 30, 101, 1, 1, 0, 0, -2, 4, 0xffa57841);
		M3DFast.gi().DrawTextEx(offx+20+73+20+160, offy+92/2, detail, 0xff000000, 20, 101, 1, 1, 0, 0, -2);
		this.btn3_go[p].Move(offx+1010-20-140,offy+(92-55)/2,140,55);
		this.btn3_go[p].Draw();
		
		this.btn3_detail[p].Move(offx+20, offy+(92-73)/2, 73,73);
	}
	ProcTouch( msg, x, y)
	{
		var i;
		if(msg==3)
		{
			this.bLock2=false;
			this.bLock3=false;
		}
		for(i=0;i<4;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
					if(this.iPage!=i)
					{
						this.iPage=i;
						if(i==1)
						{
							GmProtocol.gi().s_NewGovOperate(5, 0, 0, 0,0,"");
							this.iMCount=0;
							this.i1Page=0;
							this.ui1a_memberlist.Clean();
							this.iSortType=-1;
							this.iSortUD=0;
						}
					}
				}
			}
		}
		switch(this.iPage)
		{
		case 0:
			this.i0ShowExplain=-1;
			if((msg==1 || (msg==2 && this.i0ShowExplain>=0)) && this.i0Table==1)
			{
				this.i0ShowExplain=-1;
				for(i=0;i<9;i++)
				{
					if(XDefine.bInRect(x, y, this.i0Lx, this.i0Ly+i*50, 120, 40))
					{
						this.i0ShowExplain=i;
					}
				}
			}
			else this.i0ShowExplain=-1;
			if(this.btn0_govstatus.ProcTouch(msg, x, y))
			{
				if(this.btn0_govstatus.bCheck())this.i0Table=0;
			}
			if(this.btn0_govbuilding.ProcTouch(msg, x, y))
			{
				if(this.btn0_govbuilding.bCheck())this.i0Table=1;
			}
			if(this.btn0_fastback.ProcTouch(msg, x, y))
			{
				if(this.btn0_fastback.bCheck())
				{
					if(BeginersGuide.gi().bCheckGuideExt(100))
					{//确认传送
						Confirm1.start(Confirm1.CONFIRM_BACKGOV,"每次使用快速回帮需要花费6000游戏币，是否确定快速回帮？");
					}
					else
					{//直接传送
						GmProtocol.gi().s_NewGovOperate(4, 0, 0, 0,0,"");
						XStat.gi().PopStat(1);
					}
				}
				return true;
			}
			if(this.btn0_editdetail.ProcTouch(msg, x, y))
			{
				if(this.btn0_editdetail.bCheck())
				{//改宣言
					if(MyGov.mg.iJob==0)
					{
						Gov_SetDetail.Open(this.sDetail);
					}
				}
			}
			break;
		case 1://帮派成员
			for(i=0;i<3;i++)
			{
				if(this.btn1_page[i].ProcTouch(msg, x, y))
				{
					if(this.btn1_page[i].bCheck())
					{
						if(this.i1Page!=i)
						{
							if(i==0)
							{//成员列表
								GmProtocol.gi().s_NewGovOperate(5, 0, 0, 0,0,"");
								this.iMCount=0;
								this.ui1a_memberlist.Clean();
								this.iSortType=-1;
								this.iSortUD=0;
							}
							if(i==1)
							{//申请列表
								GmProtocol.gi().s_NewGovOperate(9, 0, 0, 0,0,"");
								this.iACount=0;
								this.ui1b_applylist.Clean();
							}
							if(i==2)
							{
								GmProtocol.gi().s_NewGovOperate(12, 0, 0, 0,0,"");
								this.iECount=0;
								this.ui1c_govevent.Clean();
							}
							this.i1Page=i;
						}
					}
				}
			}
			switch(this.i1Page)
			{
			case 0:
				if(this.ui1a_memberlist.ProcTouch(msg, x, y))return true;
				if(MyGov.mg.bCheckPower(3))
				{
					if(this.btn1_message.ProcTouch(msg, x, y))
					{
						if(this.btn1_message.bCheck())
						{
//							if(MyGov.mg.bCheckPower(3))
							{
								PrivateChat_Send.OpenChat( 10000, MyGov.mg.sName,6);
								EasyMessage.easymsg.AddMessage("发送收取5万铜币");
							}
//							else EasyMessage.easymsg.AddMessage("你没有群发消息权限");
						}
						return true;
					}
				}
				if(this.btn1_leavegov.ProcTouch(msg, x, y))
				{
					if(this.btn1_leavegov.bCheck())
					{
						if(MyGov.mg.iJob==0)FrameMessage.fm.Open("请先任命其他人为帮主后再脱离帮派");
						else
						{
							Confirm1.start(Confirm1.CONFIRM_LEAVEGOV,"是否确认脱离帮派？");
						}
					}
					return true;
				}
				break;
			case 1:
				this.ui1b_applylist.ProcTouch(msg, x, y);
				break;
			case 2:
				this.ui1c_govevent.ProcTouch(msg, x, y);
				break;
			}
			break;
		case 2://帮派福利
			for(i=0;i<4;i++)
			{
				if(this.btn2_go[i].ProcTouch(msg, x, y))
				{
					if(this.btn2_go[i].bCheck())
					{//101,102,103,104
						if(BeginersGuide.gi().bCheckGuideExt(101+i))Confirm1.start(Confirm1.CONFIRM_GOVCONVEY1[i],"每次传送需要花费8000游戏币，是否确定传送？");
						else
						{//直接传送
							GmProtocol.gi().s_NewGovOperate(4, 1, i, 0,0,"");
							XStat.gi().PopStat(1);
						}
					}
					return true;
				}
				if(this.btn2_detail[i].ProcTouch(msg, x, y))
				{
					if(this.btn2_detail[i].bCheck())
					{
						PromptMessage.Open(this._GOVWELFARE[i][0],this._GOVWELFARE[i][2]);
					}
					return true;
				}
			}

			if(this.bLock2 && msg==2)
			{
				this.iOffY2+=(y-this.iLock2Y);
				this.iLock2Y=y;
			}
			if(XDefine.bInRect(x, y, this.iX+25, this.iY+25, this.iW-50, this.iH-50) && msg==1)
			{
				this.bLock2=true;
				this.iLock2Y=y;
				return true;
			}
			break;
		case 3://帮派活动
			for(i=0;i<6;i++)
			{
				if(this.btn3_go[i].ProcTouch(msg, x, y))
				{
					if(this.btn3_go[i].bCheck())
					{//105,106,107,108,109,110
						if(BeginersGuide.gi().bCheckGuideExt(105+i))Confirm1.start(Confirm1.CONFIRM_GOVCONVEY2[i],"每次传送需要花费8000游戏币，是否确定传送？");
						else
						{//直接传送
							GmProtocol.gi().s_NewGovOperate(4, 2, i, 0,0,"");
							XStat.gi().PopStat(1);
						}
					}
					return true;
				}
				if(this.btn3_detail[i].ProcTouch(msg, x, y))
				{
					if(this.btn3_detail[i].bCheck())
					{
						PromptMessage.Open(this._GOVACTIVITY[i][0],this._GOVACTIVITY[i][2]);
					}
					return true;
				}
			}

			if(this.bLock3 && msg==2)
			{
				this.iOffY3+=(y-this.iLock3Y);
				this.iLock3Y=y;
			}
			if(XDefine.bInRect(x, y, this.iX+25, this.iY+25, this.iW-50, this.iH-50) && msg==1)
			{
				this.bLock3=true;
				this.iLock3Y=y;
				return true;
			}
			break;
		}

		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}

NewGovFrame.Open=function(pls)
{
	var afg;
	if (XStat.x_stat.iXStat != XStat.GS_NEWGOVFRAME)afg= XStat.x_stat.PushStat(XStat.GS_NEWGOVFRAME);
	else afg =  XStat.x_stat.LastStat(0);
	afg.GetBase(pls);
}

NewGovFrame.InitMemberDetail=function(pls)
{
	var afg;
	afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
	if (afg!=null)afg._InitMemberDetail(pls);
}

NewGovFrame.ChangeJob=function(pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)
		{
			var rid=pls.GetNextInt();
			var job=pls.GetNextInt();
			var power=pls.GetNextInt();
			if(job==100)
			{//踢出，清除
				var j=0;
				for(var i=0;i<afg.iMCount-1;i++)
				{
					if(afg.gov_members[i].iRid==rid)j=1;
					if(j==1)afg.gov_members[i]=afg.gov_members[i+1];
				}
				if(j==1)afg.iMCount--;
			}
			else
			{
				for(var i=0;i<afg.iMCount;i++)
				{
					if(afg.gov_members[i].iRid==rid)
					{
						afg.gov_members[i].iJob=job;
						afg.gov_members[i].iPower=power;
					}
				}
			}
		}
	}

	NewGovFrame.ApplyCheck=function(pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)
		{
			var j=0;
			var rid=pls.GetNextInt();
			for(var i=0;i<afg.iACount-1;i++)
			{
				if(afg.gov_applys[i].iRid==rid)j=1;
				if(j==1)afg.gov_applys[i]=afg.gov_applys[i+1];
			}
			afg.iACount--;
		}
	}
	NewGovFrame. ApplyDetail=function(pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)afg._ApplyDetail(pls);
	}
	NewGovFrame. ApplyList=function( pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)afg._ApplyList(pls);
	}
	NewGovFrame. UpdateDetail=function( pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)afg.sDetail=pls.GetNextString();
	}
	NewGovFrame. InitEventDetail=function( pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)afg._InitEventDetail(pls);
	}
	NewGovFrame. InitGovEvent=function( pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)afg._InitGovEvent(pls);
	}
	NewGovFrame. InitMemberList=function( pls)
	{
		var afg;
		afg=XStat.x_stat.FindStat(XStat.GS_NEWGOVFRAME);
		if (afg!=null)afg._InitMemberList(pls);
	}