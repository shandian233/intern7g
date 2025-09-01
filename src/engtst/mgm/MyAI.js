
import GameData from "../../config/GameData"
import XDefine from "../../config/XDefine"
import MapManager from "../../map/MapManager"
import VisualBlock from "../../map/VisualBlock"
import _VISUALBLOCK from "../../map/_VISUALBLOCK"
import MapDialog from "../../map/npcboom/MapDialog"
import PackageTools from "../../engine/PackageTools"
import E_DATA from "../../engine/data/E_DATA"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../engtst/mgm/frame/message/FrameMessage"
import XFight from "../../engtst/mgm/gameing/fight/XFight"
import FastGoods from "../../engtst/mgm/gameing/help/FastGoods"
import GmMe from "../../engtst/mgm/gameing/me/GmMe"
import GoodsDraw from "../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../engtst/mgm/gameing/me/goods/MyGoods"
import NormalMission from "../../engtst/mgm/gameing/me/mission/missionstruct/NormalMission"
import SpecialMission from "../../engtst/mgm/gameing/me/mission/missionstruct/SpecialMission"
import MySell from "../../engtst/mgm/gameing/me/shop/MySell"
import NpcShop from "../../engtst/mgm/gameing/me/shop/NpcShop"
import NpcShopFrame from "../../engtst/mgm/gameing/me/shop/NpcShopFrame"
import MyTeam from "../../engtst/mgm/gameing/me/team/MyTeam"
import GmPlay from "./GmPlay"
import GmProtocol from "./GmProtocol"
import XStat from "./XStat"

class _MAPLINK
	{
	/*	var iType;//0地图传送点，1npc传送，2遁地术
		var iMapId;//目标地图id
		var iGoid;//传送id
		var iSx,iSy;
		*/
		constructor()
		{

		}
		 Set( type, mid, gid, sx, sy)
		{
			this.iType=type;
			this.iMapId=mid;
			this.iGoid=gid;
			this.iSx=sx;
			this.iSy=sy;
		}
	}

//自动寻路
export default class MyAI {

	constructor()
	{
		this.bFinding=false;
		
		this.iMapPath=new Int32Array(16);//
		
		this.bDown=false;

		 this.bByNpc=false;
		 this.bByDundi=false;
		 this.tmp_path=new Array(128);
		 this.last_path=new Array(128);

		  this.iDelay=0;
		  this.iLogicStat=0;
		  this.iLogic_npc1,this.iLogic_npc2;
		  this.iLogic_shop1;
		  this.iLogic_goods1;
		  this.iLogic_count1;
		  this.iLogic_map1;
		  this.iLogic_px1,this.iLogic_px2,this.iLogic_py1,this.iLogic_py2;
	 
		  this.sm_doing;
	}
	
	InitLink()
	{//link
		var i,j,k,type,start,end,gid,startx,starty;
		var maxcount=0;
		this.iMapLink=new Array(64);//
		for(i=0;i<64;i++)this.iMapLink[i]=new Array(32);
		this.iMapLinkCount=new Int32Array(64);//
		this.iMapLinkSize=0;
		for(i=0;i<GmPlay.de_chuan_song.iDataCount;i++)
		{
//			if(GmPlay.de_chuan_song.datas[i].intValue(1)!=0)continue;//跳过npc传送
			type=GmPlay.de_chuan_song.datas[i].intValue(1);//0地图，1npc
			start=GmPlay.de_chuan_song.datas[i].intValue(2);//起始地图
			end=GmPlay.de_chuan_song.datas[i].intValue(5);//目标地图
			gid=GmPlay.de_chuan_song.datas[i].iDid;//
			startx=GmPlay.de_chuan_song.datas[i].intValue(3);
			starty=GmPlay.de_chuan_song.datas[i].intValue(4);
			
			for(j=0;j<this.iMapLinkSize;j++)
			{
				if(this.iMapLink[j][0].iMapId==start)
				{
					this.iMapLink[j][this.iMapLinkCount[j]].Set(type, end, gid,startx,starty);
//					this.iMapLink[j][this.iMapLinkCount[j]].iMapId=end;
					this.iMapLinkCount[j]++;
					if(this.iMapLinkCount[j]>maxcount)maxcount=this.iMapLinkCount[j];
					break;
				}
			}
			if(j>=this.iMapLinkSize)
			{//没有找到，新建
//				this.iMapLink[this.iMapLinkSize]=new _MAPLINK[32];
				for(k=0;k<32;k++)this.iMapLink[this.iMapLinkSize][k]=new _MAPLINK();
				this.iMapLink[this.iMapLinkSize][0].Set(2, start, -1,-1,-1);
				this.iMapLink[this.iMapLinkSize][1].Set(type, end, gid,startx,starty);
//				this.iMapLink[this.iMapLinkSize][0].iMapId=start;
//				this.iMapLink[this.iMapLinkSize][1].iMapId=end;
				this.iMapLinkCount[this.iMapLinkSize]=2;
				this.iMapLinkSize++;
			}
		}
//		GmPlay.sop1("this.iMapLinkSize=="+this.iMapLinkSize+",,,,,,,,,,maxcount="+maxcount);
//		for(i=0;i<this.iMapLinkSize;i++)
//		{
//			for(j=0;j<this.iMapLinkCount[i];j++)
//			{
//				GmPlay.sop1(""+this.iMapLink[i][j]+",");
//			}
//		}
	}

	FindNpc( npcid, bynpc, bydd)
	{//从当前地图前往目标NPC
		//确定目标NPC所在地图ID
		var pnpc=GmPlay.de_npc.fdata(npcid);
		if(pnpc==null)
		{
			EasyMessage.easymsg.AddMessage("目标NPC不能寻路");
			return;
		}
		this.iDestMapId=pnpc.intValue(4);
		this.iDestX=pnpc.intValue(5);
		this.iDestY=pnpc.intValue(6);
		if(this.iDestMapId<=0 || this.iDestX<=0 || this.iDestY<=0)
		{
			EasyMessage.easymsg.AddMessage("目标NPC不能寻路");
			return;
		}
		this.bByNpc=bynpc;
		this.bByDundi=bydd;
		GmPlay.sop("start find npc = "+npcid);
		this._findway(npcid);
		VisualBlock.iLastProcBase=-1;
	}
	  FindMap( mapid, x, y, bynpc, bydd)
	{
		this.iDestMapId=mapid;
		this.iDestX=x;
		this.iDestY=y;
		this.bByNpc=bynpc;
		this.bByDundi=bydd;
		return this._findway(-1);
	}
	_findway( npcid)
	{
		var i;
		for(i=0;i<this.iMapLinkSize;i++)
		{//找到我所在地图
//			GmPlay.sop1(""+this.iMapLink[i][0].iMapId+"============"+MapManager.gi().iCurrentMapId);
			if(this.iMapLink[i][0].iMapId==MapManager.gi().iCurrentMapId)break;
		}
		if(i>=this.iMapLinkSize)
		{
			EasyMessage.easymsg.AddMessage("你当前所在地图不能寻路");
			return false;
		}
		MapManager.gi().vbk.iGoToNpcFlag=-1;
		if(MapManager.gi().iCurrentMapId==this.iDestMapId)
		{
			this.bFinding=true;
			this.iFindStat=0;
			this.iFindPoint=0;
			this.last_path[0]=new _MAPLINK();
			this.last_path[0].Set(0, MapManager.gi().iCurrentMapId,0,0,0);
			this.last_path[1]=new _MAPLINK();
			this.last_path[1].Set(0, this.iDestMapId,0,this.iDestX,this.iDestY);
			this.pathlength=2;
			MapManager.gi().vbk.iGoToNpcId=npcid;
			return true;
		}
		var oldcurrentmaplinkcount=this.iMapLinkCount[i];
		if(this.bByDundi && GmMe.me.rbs.iSchoolId>0 && MyTeam.bNoTeam() && (!MySell.gi().bSelling))
		{
			this.iMapLink[i][this.iMapLinkCount[i]].Set(2, GameData.iSchoolMapIds[GmMe.me.rbs.iSchoolId], 0,0,0);
			this.iMapLinkCount[i]++;
		}
		//开始扩散寻找
		this.pathlength=999;
		this._dig(this.iMapLink[i][0],this.iDestMapId,0);
		if(this.pathlength<999)
		{//找到路径，开始行走
			this.bFinding=true;
			this.iFindStat=0;
			this.iFindPoint=0;
			MapManager.gi().vbk.iGoToNpcId=npcid;
			this.iMapLinkCount[i]=oldcurrentmaplinkcount;
			return true;
		}
		else EasyMessage.easymsg.AddMessage("目标地图不能寻路");
		this.iMapLinkCount[i]=oldcurrentmaplinkcount;
		return false;
	}


	 savepath( deep)
	{
		var i;
		
		if(deep<this.pathlength)
		{
			for(i=0;i<deep;i++)
			{
				this.last_path[i]=this.tmp_path[i];
			}
			this.pathlength=deep;
		}
//		GmPlay.sop1("path-------------start----------------");
//		for(i=0;i<deep;i++)
//		{
//			GmPlay.sop1(""+this.tmp_path[i]);
//		}
//		GmPlay.sop1("path--------------end---------------");
	}
	 _dig( smap, dmap, deep)
	{
		var i,j,k;
		if(deep>=16)return;
		GmPlay.sop("deep="+deep);
//		GmPlay.sop1(""+smap.iMapId+"=="+deep);
		for(i=0;i<this.iMapLinkSize;i++)
		{
			if(this.iMapLink[i][0].iMapId==smap.iMapId)
			{
				this.tmp_path[deep]=smap;
//				for(j=1;j<this.iMapLinkCount[i];j++)
				for(j=this.iMapLinkCount[i]-1;j>=1;j--)//从后往前，优先遁地
				{
					if(this.bByNpc==false && this.iMapLink[i][j].iType!=0)continue;//不能使用npc传送
					if(this.iMapLink[i][j].iMapId==dmap)
					{//找到，检测是否最短，返回
						this.tmp_path[deep+1]=this.iMapLink[i][j];
						this.savepath(deep+2);
						return;
					}
					for(k=0;k<deep;k++)
					{//查看已有链路中是否已有this.iMapLink[i][j]，如有，不深入，以免重复进入死循环
						if(this.tmp_path[k]==this.iMapLink[i][j])break;
					}
					if(k>=deep && deep<this.pathlength-1)this._dig(this.iMapLink[i][j],dmap,deep+1);
				}
			}
		}
	}
	
	Draw()
	{//如果有剧情，提示点击寻路/停止寻路
//		GmPlay.sop(""+this.bFinding);
		if(!this.bFinding)return;
		
		switch(this.iFindStat)
		{
		case 3://等待到达dest
			if(XDefine.llength(GmMe.me.iX, GmMe.me.iY, this.iDestX,this.iDestY)<30)
			{//到达
					this.bFinding=false;
			}
			else if(MapDialog.md.bDialoging)this.bFinding=false;
			else if(GmMe.me.sStat!="跑步")
			{
				if(this.dodelay())this.iFindStat=0;//走到下个地图，重新寻路
			}
			break;
		case 0://看是否在目标地图，是前往目标，否前往传送点
			if(MapManager.gi().iCurrentMapId==this.iDestMapId)
			{//在目标地图，寻路前往目标
				if(this.iDestX<0 || this.iDestY<0)
				{
					this.bFinding=false;
				}
				else
				{
					if(XDefine.llength(GmMe.me.iX, GmMe.me.iY, this.iDestX,this.iDestY)<30)this.bFinding=false;
					else if(MapDialog.md.bDialoging)this.bFinding=false;
					else
					{
						if(this.to_pos(this.iDestX,this.iDestY))this.iFindStat=3;
						else this.bFinding=false;
					}
				}
			}
			else
			{//不在目标地图，寻找传送点前往目标
				if(MapManager.gi().iCurrentMapId==this.last_path[this.iFindPoint].iMapId)this.iFindPoint++;
				else
				{//从MapManager.gi().iCurrentMapId->this.last_path[this.iFindPoint]传送点行走
					if(this.last_path[this.iFindPoint].iType==0)
					{//走地图传送
						this.to_pos(this.last_path[this.iFindPoint].iSx,this.last_path[this.iFindPoint].iSy);
						this.iFindStat=1;
					}
					if(this.last_path[this.iFindPoint].iType==1)
					{//npc传送，进入模式2
						this.to_pos(this.last_path[this.iFindPoint].iSx,this.last_path[this.iFindPoint].iSy);
						this.iFindStat=2;//
					}
					if(this.last_path[this.iFindPoint].iType==2)
					{//遁地术
						GmProtocol.gi().s_UseSkill(0,0,0,0,0,0,0);
						MapManager.gi().iMapChangeing=100;
						this.iFindStat=1;
					}
					this.iDelay=0;
//					if(this.map_to_map(MapManager.gi().iCurrentMapId,this.last_path[this.iFindPoint]))this.iFindStat=1;
//					else
//					{
//						EasyMessage.easymsg.AddMessage("未找到路径");
//						this.bFinding=false;
//					}
				}
			}
			break;
		case 1://等待切换地图
			if(MapManager.gi().iCurrentMapId==this.last_path[this.iFindPoint].iMapId)
			{
				if(this.dodelay())this.iFindStat=0;//走到下个地图，重新寻路
			}
			else if(GmMe.me.sStat!="跑步" && MapManager.gi().iMapChangeing==0)
			{//可能经过战斗，重新寻路
				if(this.dodelay())this.iFindStat=0;//走到下个地图，重新寻路
			}
			//没有行走(战斗完)，重新开始寻路
			break;
		case 2://等待与目标距离小于30
//			GmPlay.sop("tttt="+XDefine.llength(GmMe.me.iX, GmMe.me.iY, this.last_path[this.iFindPoint].iSx, this.last_path[this.iFindPoint].iSy));
			if(XDefine.llength(GmMe.me.iX, GmMe.me.iY, this.last_path[this.iFindPoint].iSx, this.last_path[this.iFindPoint].iSy)<30)
			{//到达，传送
				if(this.dodelay())
				{
					GmProtocol.gi().s_ChangeMapNew(2,this.last_path[this.iFindPoint].iGoid);
					this.iFindStat=1;
				}
			}
			else if(GmMe.me.sStat!="跑步")
			{
				if(this.dodelay())this.iFindStat=0;//走到下个地图，重新寻路
			}
			break;
		}
	}//de_chuan_song
	 dodelay()
	{
		this.iDelay++;
		if(this.iDelay>=10)
		{
			this.iDelay=0;
			return true;
		}
		return false;
	}

	 map_to_map( mid1, mid2)
	{
		var i,j,k;
		
		for(i=0;i<GmPlay.de_chuan_song.iDataCount;i++)
		{
			if(GmPlay.de_chuan_song.datas[i].intValue(1)!=0)continue;
			if(GmPlay.de_chuan_song.datas[i].intValue(2)!=mid1)continue;
			if(GmPlay.de_chuan_song.datas[i].intValue(5)!=mid2)continue;
			j=GmPlay.de_chuan_song.datas[i].intValue(3);
			k=GmPlay.de_chuan_song.datas[i].intValue(4);
			this.to_pos(j,k);
			break;
		}
		if(i>=GmPlay.de_chuan_song.iDataCount)return false;
		return true;
	}
	 to_pos( x, y)
	{
		if(MySell.gi().bSelling)
		{
			EasyMessage.easymsg.AddMessage("摆摊中不能行走");
		}
		else if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
		{//没队伍，或是队长，才能走
			if(MapManager.gi().mfy.findway(GmMe.me.iX,GmMe.me.iY,x,y))
			{
				GmPlay.sop("check again start");
				if(MapManager.gi().mfy.checkagain())
				{//前往npc
//					MapManager.gi().vbk.iNpcX=npcs[i].MyAI.iX;
//					MapManager.gi().vbk.iNpcY=npcs[i].MyAI.iY;
//					MapManager.gi().vbk.iGoToNpcId=npcs[i].iDownFlag;
					GmMe.me.start(MapManager.gi().mfy.iPath,MapManager.gi().mfy.iPathDeep);
					return true;
				}
				else GmPlay.sop("check again end2");
			}
		}
		return false;
	}

	 AILogic()
	{
		var i,j;
		switch(this.iLogicStat)
		{
		case 0://等待
			break;
		case 100://自动进行特殊任务
			if(this.sm_doing.iMPoint==50 || this.sm_doing.iMPoint==52 || this.sm_doing.iMPoint==54)
			{//自动师门--------找到npc问好
				for(i=0;i<this.sm_doing.iItemCount;i++)
				{
					if(this.sm_doing.si[i].iMType==0)
					{//任务目标
						if(this.sm_doing.si[i].iSType==1 || this.sm_doing.si[i].iSType==5)
						{//找到npc                             静态npc战斗
							this.FindNpc(this.sm_doing.si[i].iV1,true,true);
							this.iLogicStat=0;
							return;
						}
					}
				}
			}
			if(this.sm_doing.iMPoint==53)
			{
				for(i=0;i<this.sm_doing.iItemCount;i++)
				{
					if(this.sm_doing.si[i].iMType==0)
					{//任务目标
						if(this.sm_doing.si[i].iSType==1 || this.sm_doing.si[i].iSType==4)
						{//巡逻
							this.iLogic_map1=this.sm_doing.si[i].iV1;
							this.FindMap(this.sm_doing.si[i].iV1, -1, -1,true,true);
							
							this.iLogic_px1=-1;
							GmProtocol.gi().s_SeverEvent(29, 0, this.iLogic_map1, 0, 0);
							
							this.iLogicStat=110;
							return;
						}
					}
				}
			}
			if(this.sm_doing.iMPoint==10)
			{//押镖
				for(i=0;i<this.sm_doing.iItemCount;i++)
				{
					if(this.sm_doing.si[i].iMType==0)
					{//任务目标
						if(this.sm_doing.si[i].iSType==0)
						{//stype=0 找到物品 v1物品id v2物品数量 v3交给目标npcid
							if(MyGoods.bHaveGoods(this.sm_doing.si[i].iV1, this.sm_doing.si[i].iV2))
							{//有物品，上交
								if(this.sm_doing.si[i].iV3==34)
								{//回去镖头
									if(MapManager.gi().iCurrentMapId==15)
									{//在郢城，前往镖头位置
										//从npc列表中找到镖头
										var pvb=VisualBlock.pvb.FindNpcByName("程镖头");
										if(pvb!=null)
										{
//											GmPlay.sop(""+pvb.MyAI.iX+"====="+pvb.MyAI.iY);
											this.FindMap(15, pvb.iX,pvb.iY, true,false);
											//this.to_pos(pvb.MyAI.iX,pvb.MyAI.iY);
											MapManager.gi().vbk.iGoToNpcId=pvb.iNpcId;
										}
										this.iLogicStat=0;
									}
									else
									{//先到郢城
										//this.FindNpc(58,true,false);//找孙膑
										this.FindMap(15, -1, -1, true,false);
										MapManager.gi().vbk.iGoToNpcId=34;
										this.iLogic_map1=15;
										this.iLogicStat=114;
									}
								}
								else
								{//正常
									this.FindNpc(this.sm_doing.si[i].iV3,true,false);
									this.iLogic_npc2=this.sm_doing.si[i].iV3;
									FastGoods.gi().iListPoint=0;
									this.iLogicStat=0;
								}
								return;
							}
						}
					}
				}
			}
			if(this.sm_doing.iMPoint==51)
			{//自动师门-------买东西
//				SpecialItem si;
				for(i=0;i<this.sm_doing.iItemCount;i++)
				{
					if(this.sm_doing.si[i].iMType==0)
					{//任务目标
						if(this.sm_doing.si[i].iSType==0)
						{//stype=0 找到物品 v1物品id v2物品数量 v3交给目标npcid
							if(MyGoods.bHaveGoods(this.sm_doing.si[i].iV1, this.sm_doing.si[i].iV2))
							{//有物品，上交
								GmPlay.sop("上交物品");
								this.FindNpc(this.sm_doing.si[i].iV3,true,true);
								this.iLogic_npc2=this.sm_doing.si[i].iV3;
								FastGoods.gi().iListPoint=0;
								this.iLogicStat=0;
							}
							else
							{//没物品，去买物品
								this.iLogic_goods1=this.sm_doing.si[i].iV1;
								this.iLogic_count1=this.sm_doing.si[i].iV2;
								j=this.getnpcbygoods(this.sm_doing.si[i].iV1);
								if(j==-1)EasyMessage.easymsg.AddMessage("所需物品来源未知");
								else
								{
									this.iLogic_npc1=MyAI.npc_shop_goods[j][0];
									this.iLogic_shop1=MyAI.npc_shop_goods[j][1];
									this.FindNpc(this.iLogic_npc1,true,true);
//									VisualBlock.pvb.SetTalkingNpc(this.iLogic_npc1);
									this.iLogicStat=101;
									VisualBlock.talkingnpc=null;
								}
							}
							return;
						}
					}
				}
			}
			break;
		case 101://前往打开npcshop
			if(GmMe.me.sStat=="站立" && VisualBlock.talkingnpc!=null)
			{
				if(VisualBlock.talkingnpc.bCurrentBlock && VisualBlock.talkingnpc.iNpcId==this.iLogic_npc1)
				{
					GmProtocol.gi().s_NpcShop(this.iLogic_shop1);
					this.iLogicStat=102;
				}
			}
			break;
		case 102://等待商店打开后，指向物品
			if(XStat.gi().CheckStat(XStat.GS_SHOPFRAME))
			{
				var nsf=XStat.gi().LastStat(0);
				for(i=0;i<20;i++)
				{
					if(NpcShop.ns.goods[i].iGid>0 && NpcShop.ns.goods[i].iTid==this.iLogic_goods1)
					{
						nsf._lockgoods(NpcShop.ns.goods[i]);
						GoodsDraw.new_LockPos(nsf.iX+30, nsf.iY+30,NpcShop.ns.goods,NpcShop.ns.goods[i]);
						this.iLogicStat=103;
						return;
					}
				}
			}
			break;
		case 103://如果背包中有任务物品，关闭对话框，寻路回去交任务
			if(MyGoods.bHaveGoods(this.iLogic_goods1, this.iLogic_count1))
			{//关闭当前对话框
				MapDialog.md.bDialoging=false;
				if(XStat.gi().CheckStat(XStat.GS_SHOPFRAME))XStat.gi().PopStat(1);
//				while(!XStat.gi().CheckStat(XStat.GS_GAMEING))XStat.gi().PopStat(1);
				this.iLogicStat=100;
			}
			break;
		case 110://等待到达目标地图后，进入巡逻状态
			if(MapManager.gi().iCurrentMapId==this.iLogic_map1)
			{//发送消息获取巡逻路劲
				this.iLogicStat=111;
			}
			break;
		case 111://等待取得路径后，开始来回走
			if(this.iLogic_px1>0)
			{
				this.to_pos(this.iLogic_px2,this.iLogic_py2);
				this.iLogicStat=112;
			}
			break;
		case 112://走向
			//进入战斗时结束
			if(XDefine.llength(GmMe.me.iX, GmMe.me.iY, this.iLogic_px2, this.iLogic_py2)<50)
			{
				this.to_pos(this.iLogic_px1,this.iLogic_py1);
				this.iLogicStat=113;
			}
			if(XFight.bFighting || !this.bFinding)this.iLogicStat=0;
			break;
		case 113://走向
			//进入战斗时结束
			if(XDefine.llength(GmMe.me.iX, GmMe.me.iY, this.iLogic_px1, this.iLogic_py1)<50)
			{//
				this.to_pos(this.iLogic_px2,this.iLogic_py2);
				this.iLogicStat=112;
			}
			if(XFight.bFighting || !this.bFinding)this.iLogicStat=0;
			break;
		case 114://到达某地图后，回到100状态
	//		GmPlay.sop(""+MapManager.gi().iCurrentMapId+",,,,,"+this.iLogic_map1);
			if(MapManager.gi().iCurrentMapId==this.iLogic_map1)
			{//发送消息获取巡逻路劲
				this.iLogicStat=100;
			}
			break;
		case 200:
			if(this.nm_doing.iMPoint==56 || this.nm_doing.iMPoint==59)
			{//抓猪，杀狼前往郊外
				
				this.iLogic_map1=4;
				this.FindMap(4, -1, -1,true,true);//前往郊外
				
				this.iLogic_px1=-1;
				GmProtocol.gi().s_SeverEvent(29, 0, this.iLogic_map1, 0, 0);
				this.iLogicStat=110;
			}
			if(this.nm_doing.iMPoint==139 || this.nm_doing.iMPoint==140)
			{//根据当前地图，找地图上的师傅对话
				this.iLogicStat=0;
				for(i=1;i<10;i++)
				{
					if(MapManager.gi().iCurrentMapId==MyAI._MENPAIMAP[i])
					{
						this.FindNpc(MyAI._TEACHERID[i], false,true);
						return;
					}
				}
				FrameMessage.fm.Open("寻找门派师傅对话");
			}
			if(this.nm_doing.iMPoint==141 || this.nm_doing.iMPoint==144)
			{//与自己师傅对话
				this.iLogicStat=0;
				this.FindNpc(MyAI._TEACHERID[GmMe.me.rbs.iSchoolId], true,true);
			}
			break;
		}
	}

	getlogicpath( pls)
	{
		var i=pls.GetNextInt();
		this.iLogic_px1=i/10000;
		this.iLogic_py1=i%10000;
		i=pls.GetNextInt();
		this.iLogic_px2=i/10000;
		this.iLogic_py2=i%10000;
	}

	 getnpcbygoods( gid)
	{
		var i,j;
		for(i=0;i<MyAI.npc_shop_goods.length;i++)
		{
			for(j=2;j<MyAI.npc_shop_goods[i].length;j++)
			{
				if(MyAI.npc_shop_goods[i][j]==gid)return i;
			}
		}
		return -1;
	}


	AutoSpecialMission( sm)
	{
		this.sm_doing=sm;
		this.iLogicStat=100;
	}
	AutoNormalMission( nm)
	{
		this.nm_doing=nm;
		this.iLogicStat=200;
	}
	 ProcTouch( msg, x, y)
	{
		return false;
	}
}
 MyAI.iX,MyAI.iY,MyAI.iW,MyAI.iH;
 MyAI._TEACHERID=[0,5,6,7,21,22,23,24,25,26];
MyAI._MENPAIMAP=[0,5,6,7,10,8,9,11,12,13];
 MyAI.npc_shop_goods=[
[27,4,66,67,69,70,73,74],////西阳药店老板
[28,2,47,53,59,11,19,25,31,37,13],////西阳装备店老板
[3,3,65,66,68,69,71,72],////新手村药店老板
[2,1,1,3,4,5,6,7,8,9,10],////新手村装备店老板
[41,5,78,81,83,67,71,75],////郢城药店
[93,9,14,12,20,48,54,60,26,32,38],//
[42,6,79,80,82,72,73,76],////临淄
[94,10,15,43,21,49,55,61,27,33,39],//
[43,7,82,83,84,77,80,81],////咸阳
[95,11,16,44,22,50,56,62,28,34,40]];//


MyAI.ma=null;
MyAI.gi=function()
{
	if(MyAI.ma==null)MyAI.ma=new MyAI();
	return MyAI.ma;
}