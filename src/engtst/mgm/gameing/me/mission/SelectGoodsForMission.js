
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import SpecialItem from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/SpecialItem"
import SpecialMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/SpecialMission"
import MyMission from "./MyMission"

export default class SelectGoodsForMission extends BaseClass{

	


	InitFrame( mpoint, gtype, gcount)
	{
		var i;
		this.iTurnCount=0;
		for(i=0;i<20;i++)
		{
			if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==gtype && MyGoods.gi().goods[2][i].iCount>=gcount)
			{
				this.gs[this.iTurnCount].copyfrom(MyGoods.gi().goods[2][i]);
				this.iTurnCount++;
			}
		}
		this.iMPoint=mpoint;
		this.lockgoods=this.gs[0];
		GoodsDraw.new_LockPos(this.iX+30, this.iY+30,this.gs,this.lockgoods);
	}
	 constructor( a)
	{
		super();
		var i;
		this.gs=new Array(20);//
		for(i=0;i<20;i++)this.gs[i]=new Goods();
		
		this.iW=490;
		this.iH=345+60+55+20;
		this.iX=GmConfig.SCRW-this.iW-20;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.lockgoods=null;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_turn=new XButtonEx2(GmPlay.xani_button);
		this.btn_turn.InitButton("普通按钮140_55");
		this.btn_turn.sName="上  交";
//		this.btn_turn.Move(this.iX+this.iW/2-140/2,this.iY+this.iH-30-55,140,55);
		this.btn_turn.Move(this.iX+this.iW-140-30,this.iY+this.iH-30-55,140,55);
	}
	Draw()
	{
		DrawMode.frame_type4("中等框a52_50",this.iX,this.iY,this.iW,this.iH,52,50);
//		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
//		this.btn_close.Draw();
				
		GoodsDraw.new_DrawGoods(this.iX+30, this.iY+30, this.gs, null, null);
		
		if(this.lockgoods!=null)
		{
			GoodsDraw.new_DrawRect(this.iX+30, this.iY+30, this.gs,this.lockgoods, 0);
		}
		this.btn_turn.Draw();
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_turn.ProcTouch(msg, x, y))
		{
			if(this.btn_turn.bCheck())
			{
				if(this.lockgoods==null)EasyMessage.easymsg.AddMessage("请先选择所交物品");
				else
				{
					if(this.iMPoint==10 && this.lockgoods.iTid==163)
					{//押镖，并交的是标银，寻路回镖头
						if((GmMe.me.iFlag[1]/100000000)==1)
						{//自动押镖，可执行自动寻路
//							FindMap(15, -1, -1, true,false);
//							MapManager.gi().vbk.iGoToNpcId=34;
//							iLogic_map1=15;
//							iLogicStat=114;
//							MyAI.gi().AutoSpecialMission(SelectGoodsForMission.psm);
						}
					}
					GmProtocol.gi().s_FinishMission(1,this.iMPoint,this.lockgoods.iGid,0);
					XStat.gi().PopStat(1);
				}
			}
			return true;
		}

		var g=GoodsDraw.new_LockGoods(x,y,this.iX+30, this.iY+30, this.gs,msg);
		GoodsDraw.NoMove();
		if(msg==3 && g!=null)
		{//点击物品，选中准备购买
			this.lockgoods=g;
		}
		else if(g==null)this.lockgoods=null;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}
SelectGoodsForMission.psm;
	
SelectGoodsForMission.Open=function( mpoint)
{
	var i,j;
	
	var si;
	for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
	{
		if(MyMission.m.smlist[i].bUseing)
		{
			SelectGoodsForMission.psm=MyMission.m.smlist[i];
			if(SelectGoodsForMission.psm.iMPoint==mpoint)
			{
				for(j=0;j<SelectGoodsForMission.psm.iItemCount;j++)
				{
					si=SelectGoodsForMission.psm.si[j];
					if(si.iMType==0 && si.iSType==0)
					{//交物品
						if(MyGoods.bHaveGoods(si.iV1, si.iV2))
						{//找到任务和物品，打开窗口
							var sgfm=XStat.gi().PushStat(XStat.GS_SELECTGOODSFORMISSION);
							sgfm.InitFrame(mpoint,si.iV1,si.iV2);
							return true;
						}
					}
					if(si.iMType==0 && si.iSType==16)
					{//交物品
						if(MyGoods.bHaveGoods(si.iV3, 1))
						{//找到任务和物品，打开窗口
							var sgfm=XStat.gi().PushStat(XStat.GS_SELECTGOODSFORMISSION);
							sgfm.InitFrame(mpoint,si.iV3,1);
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}