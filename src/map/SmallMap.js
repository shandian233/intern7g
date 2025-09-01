
import GmConfig from "../config/GmConfig"
import XDefine from "../config/XDefine"
import BaseClass from "../engine/BaseClass"
import XButtonEx2 from "../engine/control/XButtonEx2"
import M3DFast from "../engine/graphics/M3DFast"
import XAnima from "../engine/graphics/XAnima"
//import engine.graphics.XImgFast;
import GmPlay from "../engtst/mgm/GmPlay"
import XStat from "../engtst/mgm/XStat"
import DrawMode from "../engtst/mgm/frame/DrawMode"
import EasyMessage from "../engtst/mgm/frame/message/EasyMessage"
import SteeringWheel from "../engtst/mgm/gameing/fast/SteeringWheel"
import SystemOperate from "../engtst/mgm/gameing/fast/SystemOperate"
import GmMe from "../engtst/mgm/gameing/me/GmMe"
import MySell from "../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../engtst/mgm/gameing/me/team/MyTeam"

import MapManager from "./MapManager"
export default class SmallMap extends BaseClass{

	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iNpcCount=0;
		this.btn_npcs=new Array(64);//
		for(i=0;i<64;i++)
		{
			this.btn_npcs[i]=new XButtonEx2(GmPlay.xani_nui3);
//			this.btn_npcs[i].InitButton("按钮1");
			this.btn_npcs[i].bSingleButton=true;
		}
		
		this.btn_worldmap=new XButtonEx2(GmPlay.xani_ui2);
		this.btn_worldmap.InitButton("世界地图按钮");
	}
	 Draw_smallmap()
	{
		var i,j,x,y,w,h,dw,dh;
		w=MapManager.gi().mapdata.iMapWidth;
		h=MapManager.gi().mapdata.iMapHeight;
//		if(w>h)i=w;//得到一个大的用以计算比例
//		else i=h;
//		this.iRate=700.0f/i;//得到缩放比例

//		iMapX= (SmallMap.iX+10+(700-iMapW)/2);
//		SmallMap.iMapY= (SmallMap.iY+10+());

//		SmallMap.iW=iMapW+20+160;
//		SmallMap.iH=iMapH+20;
//		SmallMap.iX=(GmConfig.SCRW-SmallMap.iW)/2;
//		SmallMap.iY=(GmConfig.SCRH-SmallMap.iH)/2;
		
		
//		DrawMode.Frame1_BR(SmallMap.iX, SmallMap.iY, SmallMap.iW, SmallMap.iH);
	
		
		// if(SystemOperate.iPictureQuality==1)XImgFast.bLow=true;
		if(MapManager.gi().mapdata.iGroundSourceId>=0)
		{//整图底面
			var ppng=MapManager.gi().pSourceIndex[MapManager.gi().mapdata.iGroundSourceId];
			for(i=0;i<ppng.ww;i++)
			{
				for(j=0;j<ppng.hh;j++)
				{
					x= parseInt(this.iRate*i*512) + SmallMap.iMapX;
					y= parseInt(this.iRate*j*512) + SmallMap.iMapY;
					
					if(w<(i+1)*512)dw=w%512;
					else dw=512;
					if(h<(j+1)*512)dh=h%512;
					else dh=512;
//					dw=(i+1)*512;//去掉白边
//					if(dw>w)dw=w%512;
//					dh=(j+1)*512;
//					if(dh>h)dh=h%512;
					
					if(ppng.iRid[j][i]==-1)
					{
						ppng.iRid[j][i]=M3DFast.gi().LoadFromFile(ppng.sImagePath+"spirit_"+i+"_"+j+".png", -1,true);
					}
					M3DFast.gi().DrawImageEx(0, x,y, ppng.iRid[j][i],
							0,0,dw,dh,
							100,this.iRate,this.iRate,0,-1,-1);
				}
			}
		}
//		DrawMode.ui3_Frame3(SmallMap.iMapX, SmallMap.iMapY, iMapW, iMapH);
		// if(SystemOperate.iPictureQuality==1)XImgFast.bLow=false;
		x= parseInt(this.iRate*GmMe.me.iX+SmallMap.iMapX);
		y= parseInt(this.iRate*GmMe.me.iY+SmallMap.iMapY);
		M3DFast.gi().FillRect_2D(x-5,y-5,x+5,y+5, 0xffff0000);

//			if(mapdata.iMapWidth<GmConfig.SCRW && mapdata.iMapWidth%512!=0)
//			{
//				M3DFast.gi().FillRect_2D(iOffx+mapdata.iMapWidth, iOffy, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
//			}
//			if(mapdata.iMapHeight<GmConfig.SCRH && mapdata.iMapHeight%512!=0)
//			{
//				M3DFast.gi().FillRect_2D(iOffx, iOffy+mapdata.iMapHeight, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
//			}
	}
	Draw()
	{
		var w,h;
		//根据当前地图大小，重新计算框体长宽
		w=MapManager.gi().mapdata.iMapWidth;
		h=MapManager.gi().mapdata.iMapHeight;
		if(w>h)this.iRate=700/w;
		else this.iRate=700/h;
		SmallMap.iMapW= parseInt(w*this.iRate);
		SmallMap.iMapH= parseInt(h*this.iRate);
		SmallMap.iW=SmallMap.iMapW+20;
		SmallMap.iH=SmallMap.iMapH+20;
		SmallMap.iX=(GmConfig.SCRW-SmallMap.iW)/2;
		SmallMap.iY=(GmConfig.SCRH-SmallMap.iH)/2;
		SmallMap.iMapX=SmallMap.iX+10;
		SmallMap.iMapY=SmallMap.iY+10;
		DrawMode.new_bigframe(SmallMap.iX,SmallMap.iY,SmallMap.iW,SmallMap.iH);
		
		this.Draw_smallmap();
		this.Draw_npc();
		
		this.iFindWayOnce=0;
		
		this.btn_worldmap.Move(SmallMap.iX+10, SmallMap.iY+10, 60, 60);
		this.btn_worldmap.Draw();
	}
	 Draw_npc()
	{
		var i;
		var x,y,w;
		var vbk=MapManager.gi().vbk;
		this.iNpcCount=0;
		for(i=0;i<vbk.MAXVISUALBLOCK;i++)
		{
			if(vbk.vbs[i]!=null)
			{
				if(!vbk.vbs[i].bCurrentBlock)continue;
				if(vbk.vbs[i].iX>0 && vbk.vbs[i].iY>0)
				{
					if(vbk.vbs[i].sNpcName.length>0)
					{			
						w=M3DFast.gi().GetTextWidth(vbk.vbs[i].sNpcName, 20)+20;
						x= parseInt(this.iRate*vbk.vbs[i].iX)-w/2+SmallMap.iMapX;
						y= parseInt(this.iRate*vbk.vbs[i].iY)-16+SmallMap.iMapY;
						
						if(x<SmallMap.iMapX)x=SmallMap.iMapX;
						if(y<SmallMap.iMapY)y=SmallMap.iMapY;
						if(x+w>SmallMap.iMapX+SmallMap.iMapW)x=SmallMap.iMapX+SmallMap.iMapW-w;
						if(y+32>SmallMap.iMapY+SmallMap.iMapH)y=SmallMap.iMapY+SmallMap.iMapH-32;
						if(this.iNpcPoint==i)
						{//所前往的npc
							M3DFast.gi().FillRect_2D(x-3,y-3,x+w+3,y+32+3, 0xffff0000);
						}
						//DrawMode.new_Text(x, y, w, vbk.vbs[i].sNpcName);
						EasyMessage.new_Text(x, y, w);
						M3DFast.gi().DrawText_2(x+w/2, y+16, vbk.vbs[i].sNpcName, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
						this.btn_npcs[this.iNpcCount].Move(x,y,w,32);
						this.btn_npcs[this.iNpcCount].exts[0]=vbk.vbs[i].iX;
						this.btn_npcs[this.iNpcCount].exts[1]=vbk.vbs[i].iY;
						this.btn_npcs[this.iNpcCount].exts[2]=vbk.vbs[i].iDownFlag;
						this.btn_npcs[this.iNpcCount].sName=vbk.vbs[i].sNpcName;
						if(vbk.vbs[i].sNpcName=="前往郊外")
						{
							SmallMap.x_x=x;
							SmallMap.x_y=y;
							SmallMap.x_w=w;
							SmallMap.x_h=32;
						}
						this.iNpcCount++;//30
					}
				}
			}
		}
	}
	

	ProcTouch( msg, x, y)
	{
		var i;
		var xx,yy;
		
		
		if(this.btn_worldmap.ProcTouch(msg, x, y))
		{
			if(this.btn_worldmap.bCheck())
			{
				XStat.gi().PushStat(XStat.GS_WORLDMAP);
			}
			return true;
		}
		
		if(XDefine.bInRect(x, y, SmallMap.iX, SmallMap.iY, SmallMap.iW, SmallMap.iH))
		{//点击npc列表
			for(i=0;i<this.iNpcCount;i++)
			{
				if(XDefine.bInRect(x, y, this.btn_npcs[i].iX, this.btn_npcs[i].iY, this.btn_npcs[i].iW, this.btn_npcs[i].iH))GmPlay.sop("3");
				if(this.btn_npcs[i].ProcTouch(msg, x, y))
				{
					if(this.btn_npcs[i].bCheck())
					{
								if(MySell.gi().bSelling)
								{
									EasyMessage.easymsg.AddMessage("摆摊中不能行走");
								}
								else if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
								{//没队伍，或是队长，才能走
									if(MapManager.gi().mfy.findway(GmMe.me.iX,GmMe.me.iY,this.btn_npcs[i].exts[0],this.btn_npcs[i].exts[1]))
									{
										GmPlay.sop("check again start");
										if(MapManager.gi().mfy.checkagain())
										{//前往npc
											EasyMessage.easymsg.AddMessage("自动寻路："+this.btn_npcs[i].sName);
											MapManager.gi().vbk.iNpcX=this.btn_npcs[i].exts[0];
											MapManager.gi().vbk.iNpcY=this.btn_npcs[i].exts[1];
											MapManager.gi().vbk.iGoToNpcFlag=this.btn_npcs[i].exts[2];
											GmMe.me.start(MapManager.gi().mfy.iPath,MapManager.gi().mfy.iPathDeep);
											this.iNpcPoint=i;
										}
										else GmPlay.sop("check again end2");
									}
								}
								XStat.gi().PopStat(1);
								return true;
					}
				}
			}
		}
		else if(msg==3)XStat.gi().PopStat(1);
		this.iNpcPoint=-1;
		var m_map=MapManager.gi();
		if(XDefine.bInRect(x, y, SmallMap.iMapX, SmallMap.iMapY, SmallMap.iMapW, SmallMap.iMapH))
		{//点击在小地图内，直接走过去
			if(this.iFindWayOnce<=0 && !MySell.gi().bSelling)
			{
				if(MyTeam.bNoTeam() || MyTeam.bTeamLeader() || MyTeam.bAway())
				{////没队伍，或是队长，才能走
					xx= parseInt(1.0*(x-SmallMap.iMapX)/this.iRate);//转换为真实地图坐标
					yy= parseInt(1.0*(y-SmallMap.iMapY)/this.iRate);
					SteeringWheel.sw.bAutoRun=false;
					SteeringWheel.sw.bLocked=false;
					if(m_map.mfy.findway(GmMe.me.iX,GmMe.me.iY,xx,yy))
					{
						GmPlay.sop("check again start");
						if(m_map.mfy.checkagain())
						{
							MapManager.gi().vbk.iGoToNpcFlag=-1;
							MapManager.gi().vbk.iGoToNpcId=-1;
							GmPlay.sop("check again end1");
							GmMe.me.start(m_map.mfy.iPath,m_map.mfy.iPathDeep);
						}
						else GmPlay.sop("check again end2");
					}
					else
					{
						SteeringWheel.sw.bLocked=true;
						SteeringWheel.sw.iLockX=xx-(MapManager.gi().iOffx+GmMe.me.iX)+SteeringWheel.sw.iX;
						SteeringWheel.sw.iLockY=yy-(MapManager.gi().iOffy+GmMe.me.iY)+SteeringWheel.sw.iY;
						SteeringWheel.sw.bAutoRun=true;
					}
					this.iFindWayOnce++;
				}
			}
		}
		return false;
	}
}

SmallMap.iX,SmallMap.iY,SmallMap.iW,SmallMap.iH;
SmallMap.iMapX,SmallMap.iMapY;
SmallMap.iMapW,SmallMap.iMapH;
SmallMap.x_x;SmallMap.x_y;SmallMap.x_w;SmallMap.x_h;