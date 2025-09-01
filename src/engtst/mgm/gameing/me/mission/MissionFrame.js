
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import E_DATA from "../../../../../engine/data/E_DATA"
import E_ITEM from "../../../../../engine/data/E_ITEM"
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
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import NormalMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/NormalMission"
import SpecialMission from "../../../../../engtst/mgm/gameing/me/mission/missionstruct/SpecialMission"

import MyMission from "./MyMission"

export default class MissionFrame extends BaseClass
{
	
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		MissionFrame.iW=800;
		MissionFrame.iH=600;
		
		MissionFrame.iX=(GmConfig.SCRW-MissionFrame.iW)/2;
		MissionFrame.iY=(GmConfig.SCRH-MissionFrame.iH)/2;
		
		this.iNameW=130;
		
		this.iPoint=-1;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(MissionFrame.iX+MissionFrame.iW-35, MissionFrame.iY-25, 60, 60);
		
		
		this.btn_missionNamelist=new Array(MyMission.MAXMISSIONCOUNT);//
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			this.btn_missionNamelist[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_missionNamelist[i].InitButton("按钮2");
//			this.btn_missionNamelist[i].Move(MissionFrame.iX+50, MissionFrame.iY+45+i*50, 128, 32);
		}
		
		
		this.btn_sort=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_sort[i]=new XButton(GmPlay.xani_ui);
			this.btn_sort[i].InitButton("htab4");
			this.btn_sort[i].Move(MissionFrame.iX+MissionFrame.iW-15, MissionFrame.iY+i*50+20, 140, 50);
		}
		this.btn_sort[0].sName="全部";
		this.btn_sort[1].sName="门派任务";
		this.btn_sort[2].sName="剧情任务";
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_cancel.InitButton("按钮1");
		this.btn_cancel.sName="取消任务";
		this.btn_cancel.Move(MissionFrame.iX+MissionFrame.iW-25-20-110-195-195, MissionFrame.iY+MissionFrame.iH-25-20-53, 161, 53);
		
		this.btn_findway=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_findway.InitButton("按钮1");
		this.btn_findway.sName="自动寻路";
		this.btn_findway.Move(MissionFrame.iX+MissionFrame.iW-25-20-110-195, MissionFrame.iY+MissionFrame.iH-25-20-53, 161, 53);
		
		this.btn_prompt=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_prompt.InitButton("按钮1_110");
		this.btn_prompt.sName="提 示";
		this.btn_prompt.Move(MissionFrame.iX+MissionFrame.iW-25-20-110, MissionFrame.iY+MissionFrame.iH-25-20-53, 110, 53);
		
		this.bOpenPrompt=false;
		this.bShowPrompt=false;
		
		this.btn_page=new Array(2);//
		for(i=0;i<2;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].InitButton("右侧标签");
			this.btn_page[i].Move(MissionFrame.iX+MissionFrame.iW-15, MissionFrame.iY+40+125*i, 50, 140);
		}
		
		this.btn_go=new XButtonEx2(GmPlay.xani_button);
		this.btn_go.InitButton("普通按钮140_55");
		this.btn_go.sName="前往";

		this.iPage=0;
		this.iScrollY=0;
		this.iLockStat=0;
		
		this.pc_main=XmsEngine.pxe.FindMain("七国");
		this.pc_mission=this.pc_main.FindFirst("可接任务列表", 3);
		
		this.btn_price=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.btn_price[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_price[i].bSingleButton=true;
		}
		this.pc_price=new Array(5);//
		this.ishowdetail=-1;
		this.gd=new Goods();
	}
	DrawNormalMission( nm)
	{//剧情任务
		var i;
		var st;
		var pde=MyMission.de_mission.fdata(nm.iMPoint);
		
		FormatString.gi().FormatEx(MyMission.de_mission.strValue(nm.iMPoint, 0, 23), this.iDw-20, 24,0,0,32);
		FormatString.gi().Draw(this.iDx1+10,this.iDy1+10);
		st="";
		
		if(this.bOpenPrompt)this.sPrompt="提示：#e";
//		GmPlay.sop("nm.iItemCount="+nm.iItemCount);
		for(i=0;i<nm.iItemCount;i++)
		{
//			GmPlay.sop("nm.ni[i].iItemId="+nm.ni[i].iItemId);
			var pie=pde.fitem(nm.ni[i].iItemId);
			if(pie==null)continue;
			switch(pie.iType)
			{
			case 10://npc对话'
				MyAI.gi().iDestNpcId=pde.intValue(5);
				MyAI.gi().sDestDetail=pde.strValue(16);
				this.bCanFindWay=true;
				st+="#e#cffffff目标"+(i+1)+":#c00ff00"+pie.strValue(16);
				if(this.bOpenPrompt)
				{
					var npcid,mapid,atx,aty;
					npcid=pie.intValue(5);
					mapid=GmPlay.de_npc.intValue(npcid, 0, 4);
					atx=GmPlay.de_npc.intValue(npcid, 0, 5);
					aty=GmPlay.de_npc.intValue(npcid, 0, 6);
					this.sPrompt+="#cff0000"+GmPlay.de_npc.strValue(npcid, 0, 1)+"#cffffff在#cff0000"+GmPlay.de_map.strValue(mapid, 0, 1);
					if(atx>0 && aty>0)this.sPrompt+="("+atx/16+","+aty/16+")";
				}
				break;
			case 14://杀怪
				st+="#e#cffffff目标"+(i+1)+":#c00ff00"+pie.strValue(17);
				if(this.bOpenPrompt)
				{
					this.sPrompt+="#cff0000"+pie.strValue(17);
				}
				break;
			case 15://交物品
				MyAI.gi().iDestNpcId=pde.intValue(33);
				MyAI.gi().sDestDetail=pde.strValue(18);
				this.bCanFindWay=true;
				st+="#e#cffffff目标"+(i+1)+":#c00ff00"+pie.strValue(18);
				if(this.bOpenPrompt)
				{
					this.sPrompt+="#cff0000"+pie.strValue(17);
				}
				break;
			case 20://npc战斗
				MyAI.gi().iDestNpcId=pde.intValue(15);
				MyAI.gi().sDestDetail=pde.strValue(24);
				this.bCanFindWay=true;
				st+="#e#cffffff目标"+(i+1)+":#c00ff00"+pie.strValue(24);
				if(this.bOpenPrompt)
				{
					var npcid,mapid,atx,aty;
					npcid=pie.intValue(15);
					mapid=GmPlay.de_npc.intValue(npcid, 0, 4);
					atx=GmPlay.de_npc.intValue(npcid, 0, 5);
					aty=GmPlay.de_npc.intValue(npcid, 0, 6);
//					GmPlay.sop("a="+npcid+",b="+mapid);
					this.sPrompt+="#cff0000"+GmPlay.de_npc.strValue(npcid, 0, 1)+"#cffffff在#cff0000"+GmPlay.de_map.strValue(mapid, 0, 1);
					if(atx>0 && aty>0)this.sPrompt+="("+atx/16+","+aty/16+")";
					this.sPrompt+="#e#c0000ff需战斗#e建议组队前往";
				}
				break;
			case 26://捕捉怪物
				st+="#e#cffffff目标"+(i+1)+":#c00ff00"+pie.strValue(32);
				break;
			}
//			GmPlay.sop("="+pie.iType);
		}
		
		if(this.bOpenPrompt)
		{
			this.bOpenPrompt=false;
			this.bShowPrompt=true;
		}
		if(st.length>2)
		{
			do
			{
				//GmPlay.sop(s);
				var tmp=st.substring(0, 2);
				//GmPlay.sop(tmp);
				if(tmp=="#e")
				{
					st=st.substring(2, st.length);
				}
				else break;
			}
			while(st.length>2);
		}
		FormatString.gi().FormatEx(st, this.iDw-20, 24,0,0,26);
		FormatString.gi().Draw(this.iDx2+10,this.iDy2+10);
	}
	DrawSpecialMission( sm)
	{
		var i,j;
		var st;
		FormatString.gi().FormatEx(sm.sDetail, this.iDw-20, 24,0,0,32);
		FormatString.gi().Draw(this.iDx1+10,this.iDy1+10);
		st="";
//		if(sm.iMPoint==1 || sm.iMPoint==35)
		{
			if(this.bCC(sm.iMPoint))
			{
				this.bCanCancel=true;
				this.iCancelMid=sm.iMid;
			}
		}
		if(this.bOpenPrompt)this.sPrompt="提示：#e";
		for(i=0;i<sm.iItemCount;i++)
		{
			if(sm.si[i].iMType==0)
			{//任务目标
				if(sm.si[i].iSType==9)
				{//杀怪数量
					st+="#e#cffffff目标"+(i+1)+":#c00ff00"+sm.si[i].sDetail+"("+sm.si[i].iProc+"/"+sm.si[i].iV2+")";
				}
				else if(sm.si[i].iProc>=100)
				{//绿色完成
					st+="#e#cffffff目标"+(i+1)+":#c00ff00"+sm.si[i].sDetail+"(已完成)";//+"#c00ff00(完成)";
				}
				else
				{//黄色未完成
					switch(sm.si[i].iSType)
					{
					case 1://找到npc  v1npcid
					case 5://与静态npc战斗
					case 7://找到静态npc，需要对话完成
					case 8://与静态npc战斗
						MyAI.gi().iDestNpcId=sm.si[i].iV1;
						MyAI.gi().sDestDetail=sm.si[i].sDetail;
						this.bCanFindWay=true;
						break;
					case 12://等待剩余时间
						//GmPlay.sop("aa"+(GmPlay.iNowMillis-GmMe.iMillis)/1000);//从进入游戏到现在，过去了多少秒
						//GmPlay.sop("bb"+(sm.si[i].iV1-GmMe.iSecond));//
						j=(sm.si[i].iV1-(GmPlay.iNowMillis-GmMe.iMillis)/1000-GmMe.iSecond)/60;
						//
						sm.si[i].sDetail="剩余"+j+"分钟";
						break;
					}
					st+="#e#cffffff目标"+(i+1)+":#cffff00"+sm.si[i].sDetail;
					if(this.bOpenPrompt)
					{
						switch(sm.si[i].iSType)
						{
						case 0://找到物品 v1物品id v2物品数量 v3进度
							var gtype;
							gtype=GmPlay.de_goods.intValue(sm.si[i].iV1, 0, 16);
							if(gtype>=0)
							{
								this.sPrompt+="#e#cffffff装备可通过图纸+材料打造获得";
								switch(GmPlay.de_goods.intValue(sm.si[i].iV1, 0, 9))
								{
								case 0:this.sPrompt+="#e#cffffff0级装备可在乡水镇装备商人处购买";break;
								case 10:this.sPrompt+="#e#cffffff10级装备可在西阳城装备商人处购买";break;
								case 20:this.sPrompt+="#e#cffffff20级装备可在郢城装备商人处购买";break;
								case 30:this.sPrompt+="#e#cffffff30级装备可在临淄城装备商人处购买";break;
								case 40:this.sPrompt+="#e#cffffff40级装备可在咸阳城装备商人处购买";break;
								case 50:
								case 60:
									break;
								}
								break;
							}
							gtype=GmPlay.de_goods.intValue(sm.si[i].iV1, 0, 27);
							if(gtype>=0)
							{
								if(gtype<=2)
								{
									switch(sm.si[i].iV1)
									{
									case 65:this.sPrompt+="#e#cffffff竹叶可在【乡水镇】药品商购买";break;
									case 66:this.sPrompt+="#e#cffffff香草可在【乡水镇】或【西阳城】药品商购买";break;
									case 67:this.sPrompt+="#e#cffffff薄荷可在【西阳城】或【郢城】药品商购买";break;
									case 68:this.sPrompt+="#e#cffffff夏枯草可在【乡水镇】药品商购买";break;
									case 69:this.sPrompt+="#e#cffffff石蜜可在【乡水镇】或【西阳城】药品商购买";break;
									case 70:this.sPrompt+="#e#cffffff止血草可在【西阳城】药品商购买";break;
									case 71:this.sPrompt+="#e#cffffff甘草可在【乡水镇】或【郢城】药品商购买";break;
									case 72:this.sPrompt+="#e#cffffff勺药可在【乡水镇】或【临淄】药品商购买";break;
									case 73:this.sPrompt+="#e#cffffff蜂蜜可在【西阳城】或【临淄】药品商购买";break;
									case 74:this.sPrompt+="#e#cffffff松脂可在【西阳城】药品商购买";break;
									
									case 75:this.sPrompt+="#e#cffffff云母可在【郢城】药品商购买";break;
									case 76:this.sPrompt+="#e#cffffff麝香可在【临淄】药品商购买";break;
									case 77:this.sPrompt+="#e#cffffff赤芝可在【咸阳】药品商购买";break;
									case 78:this.sPrompt+="#e#cffffff人参可在【郢城】药品商购买";break;
									case 79:this.sPrompt+="#e#cffffff鹿茸可在【临淄】药品商购买";break;
									case 80:this.sPrompt+="#e#cffffff熊胆可在【临淄】或【咸阳】药品商购买";break;
									case 81:this.sPrompt+="#e#cffffff雄黄可在【郢城】或【咸阳】药品商购买";break;
									case 82:this.sPrompt+="#e#cffffff当归可在【临淄】或【咸阳】药品商购买";break;
									case 83:this.sPrompt+="#e#cffffff白石英可在【郢城】或【咸阳】药品商购买";break;
									case 84:this.sPrompt+="#e#cffffff紫石英可在【咸阳】药品商购买";break;
									}
								}
								else this.sPrompt+="3级草药通过挖宝或副本获得";
								break;
							}
							/*
 咸阳药店  ：当归，白石英，紫石英，赤芝，熊胆，雄黄
							 * */
							gtype=GmPlay.de_goods.intValue(sm.si[i].iV1, 0, 24);
							if(gtype>=0)
							{
								if(gtype<=2)this.sPrompt+="#e#cffffff1级和2级材料可在野外战斗中掉落，也可在挖宝时获得";
								else this.sPrompt+="3级材料通过挖宝获得或副本掉落";
								break;
							}
							break;
						case 1://找到npc  v1npcid
						case 5://与静态npc战斗
						case 7://找到静态npc，需要对话完成
						case 8://与静态npc战斗
							var npcid,mapid,atx,aty;
							npcid=sm.si[i].iV1;
							mapid=GmPlay.de_npc.intValue(npcid, 0, 4);
							atx=GmPlay.de_npc.intValue(npcid, 0, 5);
							aty=GmPlay.de_npc.intValue(npcid, 0, 6);
							this.sPrompt+="#cff0000"+GmPlay.de_npc.strValue(npcid, 0, 1)+"#cffffff在#cff0000"+GmPlay.de_map.strValue(mapid, 0, 1);
							if(atx>0 && aty>0)this.sPrompt+="("+atx/16+","+aty/16+")";
							break;
						case 2://与动态npc战斗(强盗任务，师门冒充)
						case 6://与动态npc交谈
						case 9://杀狼
							this.sPrompt+="仔细查看任务描述";
							break;
						case 3://抓到宠物上交
							this.sPrompt+="#cffffff";
							switch(sm.si[i].iV1)
							{
							case 3:this.sPrompt+="野猪在郊外抓";break;
							case 1:this.sPrompt+="狼在郊外或西阳山道抓";break;
							case 8:this.sPrompt+="盗贼在西阳山道或渡口抓";break;
							case 9:this.sPrompt+="僵尸在渡口或大禹水道抓";break;
							case 10:this.sPrompt+="鲛人在大禹水道或平原山陵抓";break;
							case 11:this.sPrompt+="花魅在平原山陵或巫山抓";break;
							case 12:this.sPrompt+="狐狸精在巫山或太行山抓";break;
							case 2:this.sPrompt+="阴灵在太行山或云蒙山抓";break;
							case 4:this.sPrompt+="机关兽在云蒙山或烈焰峰抓";break;
							case 5:this.sPrompt+="火妖在烈焰峰或函谷关抓";break;
							case 7:this.sPrompt+="修罗在函谷关或长城抓";break;
							case 14:this.sPrompt+="小刑天在长城或阴山抓";break;
							case 15:this.sPrompt+="蛟龙在阴山抓";break;
							}
							break;
						case 4://巡逻
							this.sPrompt+="在任务提示地图来回走动";
							break;
						}
					}
				}
			}
		}
		st+="#e";
		for(i=0;i<sm.iItemCount;i++)
		{
			if(sm.si[i].iMType==1)
			{//任务奖励
				st+="#e任务奖励"+(i+1)+":";
			}
		}
		if(this.bOpenPrompt)
		{
			this.bOpenPrompt=false;
			this.bShowPrompt=true;
		}
		if(st.length>2)
		{
			do
			{
				//GmPlay.sop(s);
				var tmp=st.substring(0, 2);
				//GmPlay.sop(tmp);
				if(tmp=="#e")
				{
					st=st.substring(2, st.length);
				}
				else break;
			}
			while(st.length>2);
		}
		FormatString.gi().FormatEx(st, this.iDw-20, 24,0,0,26);
		FormatString.gi().Draw(this.iDx2+10,this.iDy2+10);
	}
	
	Draw_0()
	{//已接任务
		var offx,offy,w,h;
		offx=MissionFrame.iX+25+185+20;
		offy=MissionFrame.iY+25;
		w=MissionFrame.iW-185-50-20;
		h=MissionFrame.iH-50;
		this.iDw=w-40;
		DrawMode.new_framein(offx,offy,w,h);
		
		M3DFast.gi().DrawText_2(offx+20, offy+20, "任务描述", 0xffffe0a0, 28, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		this.iDx1=offx+20;
		this.iDy1=offy+20+30;
		DrawMode.new_frameon(this.iDx1,this.iDy1, this.iDw, 180,0);
		
		offy+=20+30+180;
		M3DFast.gi().DrawText_2(offx+20, offy+20, "任务目标", 0xffffe0a0, 28, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		this.iDx2=offx+20;
		this.iDy2=offy+20+30;
		DrawMode.new_frameon(this.iDx2,this.iDy2, this.iDw, 180,0);
		
		var i,x,y;
		//左侧名称列表
		offx=MissionFrame.iX+25;
		offy=MissionFrame.iY+25;
		w=185;
		h=MissionFrame.iH-50;
		DrawMode.new_framein(offx,offy,w,h);
		offy+=10;
		
		DrawMode.frame_type1("列表标题a20_50", offx+10, offy, w-20, 20);
		M3DFast.gi().DrawTextEx(offx+w/2,offy+25, "剧情任务", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
		offy+=50;
		this.iCount=0;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(MyMission.m.nmlist[i].bUseing)
			{
//				if(iFilter!=0 && iFilter!=2)continue;
				x=offx+10;
				y=offy;
				offy+=50;
				
				this.pm3f.FillRect_2D(x, y, x+w-20, y+50,this.iCount%2==0?0xff3c739a:0xff6b98b9);
				if(this.iPoint==this.iCount)
				{
					//this.pm3f.FillRect_2D(x, y, x+w-20, y+50,0xff6b98b9);
					this.DrawNormalMission(MyMission.m.nmlist[i]);
					DrawMode.frame_type2("黄色透明框a25_25", x, y, w-20, 50,25,25);
				}
				
				this.pm3f.DrawTextEx(x+(w-20)/2,y+25, MyMission.m.nmlist[i].sName, 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
				this.btn_missionNamelist[this.iCount].Move(x, y, w-20, 50);
				
				this.iCount++;
			}
		}
		DrawMode.frame_type1("列表标题a20_50", offx+10, offy, w-20, 20);
		M3DFast.gi().DrawTextEx(offx+w/2,offy+25, "普通任务", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
		offy+=50;
		for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
		{
			if(MyMission.m.smlist[i].bUseing)
			{
				if(MyMission.m.smlist[i].iType==1)
				{//门派任务
//					if(iFilter!=0 && iFilter!=1)continue;
				}
				x=offx+10;
				y=offy;
				offy+=50;
				this.pm3f.FillRect_2D(x, y, x+w-20, y+50,this.iCount%2==0?0xff3c739a:0xff6b98b9);
				if(this.iPoint==this.iCount)
				{
					//this.pm3f.FillRect_2D(x, y, x+w-20, y+50,0xff6b98b9);
					this.DrawSpecialMission(MyMission.m.smlist[i]);
					DrawMode.frame_type2("黄色透明框a25_25", x, y, w-20, 50,25,25);
				}
				this.pm3f.DrawTextEx(x+(w-20)/2,y+25, MyMission.m.smlist[i].sName, 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
				this.btn_missionNamelist[this.iCount].Move(x, y, w-20, 50);
				
				this.iCount++;
			}
		}
		if(this.bCanCancel)this.btn_cancel.Draw();
		if(this.bCanFindWay)this.btn_findway.Draw();
		this.btn_prompt.Draw();
	}
	 bCC( mp)
	{
		var pc=this.pc_mission.pca.phead;
		var pc_id;
		var pn;
		var pw;
		while(pc!=null)
		{
			pc_id=pc.FindClass("任务id列表");
			if(pc_id!=null)
			{
				pn=pc_id.pca.phead;
				while(pn!=null)
				{
					if(mp==pn.iNumber)
					{
						pw=pc.FindWord("是否可放弃");
						if(pw!=null)
						{
							if(pw.pword=="是")return true;
						}
						return false;
					}
					pn=pn.pdown;
				}
			}
			pc=pc.pdown;
		}
		return false;
	}
	 IsInList( pc)
	{///是否在已接列表中
		var i;
		var pn=pc.pca.phead;
		while(pn!=null)
		{
			for(i=0;i<MyMission.MAXMISSIONCOUNT;i++)
			{
				if(MyMission.m.smlist[i].bUseing)
				{
					if(MyMission.m.smlist[i].iMPoint==pn.iNumber)return true;
				}
			}
			pn=pn.pdown;
		}
		return false;
	}
	 IsFinished( name)
	{
		if(name=="门派任务")
		{
			if((GmMe.me.iFlag[1]%1000)>=20)return true;
		}
		else if(name=="除害任务")
		{
			if((GmMe.me.iFlag[12]&(1<<6))!=0)return true;
		}
		else if(name=="追捕强盗")
		{
			if((GmMe.me.iFlag[1]/1000%1000)>=30)return true;
		}
		else if(name=="押镖任务")
		{
			if((GmMe.me.iFlag[1]/1000%1000)>=15)return true;
		}
		else if(name=="宝图任务")
		{
			if((GmMe.me.iFlag[60]&0xf)>=10)return true;
		}
		else if(name=="每日赛跑")
		{
			if((GmMe.me.iFlag[15]&32)!=0)return true;
		}
		else if(name=="护法任务")
		{
			if((GmMe.me.iFlag[9]%1000)>=30)return true;
		}
		else if(name=="帮派-玄武任务")
		{
			if((GmMe.me.iFlag[15]&2)!=0)return true;
		}
		else if(name=="帮派-朱雀任务")
		{
			if((GmMe.me.iFlag[15]&4)!=0)return true;
		}
		else if(name=="帮派-青龙任务")
		{
			if((GmMe.me.iFlag[15]&1)!=0)return true;
		}
		else if(name=="帮派-白虎任务")
		{
			if((GmMe.me.iFlag[15]&128)!=0)return true;
		}
		else if(name=="手艺任务")
		{
			if((GmMe.me.iFlag[15]&16)!=0)return true;
		}
		else if(name=="执法任务")
		{
			if((GmMe.me.iFlag[10]%1000)>=10)return true;
		}
		else if(name=="跑环任务")
		{
//			return true;
		}

		return false;
	}
	Draw_1()
	{//可接任务
		var offx,offy,w,h;
		var x,y;
		
		offx=MissionFrame.iX+25+185+20;
		offy=MissionFrame.iY+25;
		w=MissionFrame.iW-185-50-20;
		h=MissionFrame.iH-50;
		this.iDw=w-40;
		DrawMode.new_framein(offx,offy,w,h);
		
		M3DFast.gi().DrawText_2(offx+20, offy+20, "任务简介", 0xffffe0a0, 28, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		this.iDx1=offx+20;
		this.iDy1=offy+20+30;
		DrawMode.new_frameon(this.iDx1,this.iDy1, this.iDw, 180,0);
		
		offy+=20+30+180;
		M3DFast.gi().DrawText_2(offx+20, offy+20, "任务奖励", 0xffffe0a0, 28, 101, 1, 1, 0, 0, 0, 3, 0xff000000);
		this.iDx2=offx+20;
		this.iDy2=offy+20+30;
		DrawMode.new_frameon(this.iDx2,this.iDy2, this.iDw, 180,0);

		var pc=this.pc_mission.pca.phead;
		var pn;
		var pw;
		var pc_point=null;
		
		offx=MissionFrame.iX+25;
		offy=MissionFrame.iY+25;
		w=185;
		h=MissionFrame.iH-50;
		DrawMode.new_framein(offx,offy,w,h);
		offy+=10;
		
		DrawMode.frame_type1("列表标题a20_50", offx+10, offy, w-20, 20);
		M3DFast.gi().DrawTextEx(offx+w/2,offy+25, "可接任务", 0xffffffff, 30, 101, 1, 1, 0, -2, -2);
		offy+=50;
		
		this.CX=MissionFrame.iX+25;
		this.CY=MissionFrame.iY+25+10+50;
		this.CW=185;
		this.CH=MissionFrame.iH-120;
		M3DFast.gi().SetViewClip(this.CX,this.CY,this.CX+this.CW,this.CY+this.CH);
		this.iCount=0;
		while(pc!=null)
		{
//			GmPlay.sop(""+pc.sName);
			pn=pc.FindNumber("出现等级");
			if(GmMe.me.rbs.iLev<pn.iNumber);//等级未达
			else if(this.IsInList(pc.FindClass("任务id列表")));//已接
			else if(this.IsFinished(pc.sName));//已完成上限
			else
			{
//				GmPlay.sop("show");
				x=offx+10;
				y=offy-this.iScrollY;
				offy+=50;

				this.pm3f.FillRect_2D(x, y, x+w-20, y+50,this.iCount%2==0?0xff3c739a:0xff6b98b9);
				if(this.iPoint==this.iCount)
				{
					pc_point=pc;
					DrawMode.frame_type2("黄色透明框a25_25", x, y, w-20, 50,25,25);
				}
				
				this.pm3f.DrawTextEx(x+(w-20)/2,y+25, pc.sName, 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
				this.btn_missionNamelist[this.iCount].Move(x, y, w-20, 50);
				
				this.iCount++;
			}
			pc=pc.pdown;
		}
		M3DFast.gi().NoClip();
		this.iPriceCount=0;
		if(pc_point!=null)
		{//画简介
			pw=pc_point.FindWord("任务简介");
			FormatString.gi().FormatEx(pw.pword, this.iDw-20, 24,0,0,32);
			FormatString.gi().Draw(this.iDx1+10, this.iDy1+10);
			
			pc=pc_point.FindClass("任务奖励");
			pc=pc.pca.phead;
			while(pc!=null)
			{
				pn=pc.FindNumber("物品id");
				pw=pc.FindWord("物品介绍");
				GmPlay.xani_nui3.DrawAnima(this.iDx2+50+this.iPriceCount*120, this.iDy2+50, "物品格子",0);
				GmPlay.xani_ngoods.DrawAnima_aa(this.iDx2+50+this.iPriceCount*120, this.iDy2+50, GmPlay.de_goods.strValue(pn.iNumber, 0, 10),0);
			//	GmPlay.sop(""+GmPlay.de_goods.strValue(pn_gid.iNumber, 0, 10));
				
				this.pc_price[this.iPriceCount]=pc;
				this.btn_price[this.iPriceCount].Move(this.iDx2+50+this.iPriceCount*120, this.iDy2+50, 80,80);
				this.iPriceCount++;
				pc=pc.pdown;
			}
			
			pn=pc_point.FindNumber("前往npcid");
			if(pn!=null)
			{
				this.iGoToNpcId=pn.iNumber;
				this.btn_go.Move(MissionFrame.iX+MissionFrame.iW-25-140-20, MissionFrame.iY+MissionFrame.iH-25-55-20, 140, 55);
				this.btn_go.Draw();
			}
			else this.iGoToNpcId=-1;
		}
		
		if(this.ishowdetail>=0)
		{//物品介绍
			pn=this.pc_price[this.ishowdetail].FindNumber("物品id");
			pw=this.pc_price[this.ishowdetail].FindWord("物品介绍");
			if(pw!=null)
			{
				GoodsDraw.new_DrawDetailEx1(pn.iNumber,this.btn_price[this.ishowdetail].iX, this.btn_price[this.ishowdetail].iY,pw.pword);
			}
			else
			{
				this.gd.SetAtt(0, pn.iNumber, 1, 0, 0, 0, 0, 0, 0, 0, 0);
				GoodsDraw.new_DrawDetail(this.gd,this.btn_price[this.ishowdetail].iX, this.btn_price[this.ishowdetail].iY,0);
			}
		}
	}
	Draw()
	{
		var i;
		
		this.bCanCancel=false;
		this.bCanFindWay=false;
		//12.20   画左按钮图标、文字、以及 基本大框
//		DrawMode.ui3_BaseFrame4(MissionFrame.iX,MissionFrame.iY,"快","捷","操","作");
//		DrawMode.ui3_BaseFrame2(MissionFrame.iX,MissionFrame.iY,"任","务");
		DrawMode.new_baseframe2(MissionFrame.iX, MissionFrame.iY, MissionFrame.iW, MissionFrame.iH, "任", "务");

		//12.18
//		GmPlay.xani_ui3.DrawAnima(MissionFrame.iX+210, MissionFrame.iY, "大框分割线",0);
		this.btn_close.Draw();
		
		for(i=0;i<2;i++)
		{
			if(this.iPage==i)
			{
				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
			
			DrawMode.new_lableword4(MissionFrame.iX+MissionFrame.iW-15, MissionFrame.iY+50+130*0-4, 40, 70,this.iPage==0,"已","接","任","务");
			DrawMode.new_lableword4(MissionFrame.iX+MissionFrame.iW-15, MissionFrame.iY+50+130*1-8, 40, 70,this.iPage==1,"可","接","任","务");
		}
		
		switch(this.iPage)
		{
		case 0://已接任务
			this.Draw_0();
			break;
		case 1://可接任务
			this.Draw_1();
			break;
		}

		if(Confirm1.end(Confirm1.CONFIRM_CANCELMISSION))
		{
			if(Confirm1.bConfirm)
			{//同意放弃
				GmProtocol.gi().s_CancelMission(this.iCancelMid);
//				XStat.gi().PopStat(1);
			}
		}
		
		if(this.bShowPrompt)
		{
			FrameMessage.fm.Open(this.sPrompt);
			this.bShowPrompt=false;
//			w=400;
//			FormatString.gi().Format(this.sPrompt, w-40, 20);
//			h=FormatString.gi().iH+40;
//			x=(GmConfig.SCRW-w)/2;
//			y=(GmConfig.SCRH-h)/2;
//			DrawMode.Frame2_MD(x, y, w, h);
//			FormatString.gi().Draw(x+20, y+20);
		}
//		for(i=0;i<3;i++)
//		{
//			if(iFilter==i)
//			{
//				this.btn_sort[i].bMouseIn=true;
//				this.btn_sort[i].bMouseDown=true;
//			}
//			this.btn_sort[i].Draw();
//		}
	}
	ProcTouch( msg, x, y)
	{
		var i;

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
					this.iPoint=0;
				}
			}
		}
		
		if(this.iPage==0)
		{
			
			if(this.bShowPrompt)
			{
				if(msg==3)this.bShowPrompt=false;
				return true;
			}
			
			for(i=0;i<this.iCount;i++)
			{
				if(this.btn_missionNamelist[i].ProcTouch(msg, x, y))
				{
					if(this.btn_missionNamelist[i].bCheck())
					{
						this.iPoint=i;
					}
				}
			}
			
//			if(msg==3 && !XDefine.bInRect(x, y, MissionFrame.iX, MissionFrame.iY,MissionFrame.iW, MissionFrame.iH))
//			{
//				XStat.gi().PopStat(1);
//			}
			if(this.btn_prompt.ProcTouch(msg, x, y))
			{
				if(this.btn_prompt.bCheck())
				{
					this.bOpenPrompt=true;
				}
			}
			if(this.bCanFindWay)
			{
				if(this.btn_findway.ProcTouch(msg, x, y))
				{
					if(this.btn_findway.bCheck())
					{
						MyAI.gi().FindNpc(MyAI.gi().iDestNpcId,false,false);
						XStat.gi().PopStat(1);
					}
				}
			}
			if(this.bCanCancel)
			{
				if(this.btn_cancel.ProcTouch(msg, x, y))
				{
					if(this.btn_cancel.bCheck())
					{
						Confirm1.start(Confirm1.CONFIRM_CANCELMISSION,"是否花费10000铜币放弃该任务?");
					}
				}
			}
		}
		else if(this.iPage==1)
		{
			this.ishowdetail=-1;
			
			if(this.iLockStat==2)
			{
				this.iScrollY+=(this.iLockY-y);
				this.iLockY=y;
				
				if(this.iScrollY>this.iCount*50-this.CH+60)this.iScrollY=this.iCount*50-this.CH+60;
				if(this.iScrollY<0)this.iScrollY=0;
				if(msg==3)this.iLockStat=0;
				return true;
			}
			for(i=0;i<this.iCount;i++)
			{
				if(this.btn_missionNamelist[i].ProcTouch(msg, x, y))
				{
					if(this.btn_missionNamelist[i].bCheck())
					{
						this.iPoint=i;
					}
				}
			}
			if(this.iGoToNpcId>0)
			{
				if(this.btn_go.ProcTouch(msg, x, y))
				{
					if(this.btn_go.bCheck())
					{
						if(this.iGoToNpcId==10000)MyAI.gi().FindNpc(GameData.iMasterids[GmMe.me.rbs.iSchoolId], true, true);
						else MyAI.gi().FindNpc(this.iGoToNpcId, true, true);
						XStat.gi().PopStat(1);
					}
				}
			}
			if(XDefine.bInRect(x, y, this.CX, this.CY, this.CW, this.CH))
			{
				if(msg==1)
				{
					this.iLockY=y;
					this.iLockStat=1;
				}
				if(msg==2 && this.iLockStat==1)
				{
					if(Math.abs(this.iLockY-y)>15)
					{
						this.iLockStat=2;
					}
				}
			}
			else this.iLockStat=0;
			
			for(i=0;i<this.iPriceCount;i++)
			{
				if(this.btn_price[i].ProcTouch(msg, x, y))
				{
					if(this.btn_price[i].bCheck())
					{
						this.ishowdetail=i;
					}
				}
			}
		}
//		for(i=0;i<3;i++)
//		{
//			if(this.btn_sort[i].ProcTouch(msg, x, y))
//			{
//				if(this.btn_sort[i].bCheck())
//				{
//					iFilter=i;
//					this.iPoint=0;
//				}
//			}
//		}
		return false;
	}
}
MissionFrame.Open=function( page)
{
	var mf=XStat.gi().PushStat(XStat.GS_MISSIONFRAME);
	mf.iPage=page;
	mf.iPoint=0;
}

MissionFrame.iX,MissionFrame.iY,MissionFrame.iW,MissionFrame.iH;