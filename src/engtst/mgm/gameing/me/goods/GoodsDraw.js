
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import MyLand from "../../../../../engtst/mgm/gameing/me/land/MyLand"

import TmpGoods from "./TmpGoods"

export default class GoodsDraw {
}

GoodsDraw.bLocked=false;

GoodsDraw.GOODSEACHLINE=5;
	
GoodsDraw.lockgoods;
GoodsDraw.iTouchDelay;//按下的延迟
GoodsDraw.iLockX,GoodsDraw.iLockY;
GoodsDraw.iOffX,GoodsDraw.iOffY;
GoodsDraw.iMoveX,GoodsDraw.iMoveY;
GoodsDraw.bDrawing;
GoodsDraw.bMoving;
GoodsDraw.lastlock=null;//最后锁定物品
GoodsDraw.swaplock=null;//交换锁定物品
GoodsDraw.bUse=false;
GoodsDraw.bSwap=false;
	
GoodsDraw.aa_block=null;
	
GoodsDraw.Reset=function()
	{
		GoodsDraw.bLocked=false;
		GoodsDraw.lockgoods=null;
		GoodsDraw.iTouchDelay=0;//按下的延迟
//		GoodsDraw.iLockX=0;
//		GoodsDraw.iLockY=0;
//	GoodsDraw.iOffX,GoodsDraw.iOffY;
//	GoodsDraw.iMoveX,GoodsDraw.iMoveY;
		GoodsDraw.bDrawing=false;
		GoodsDraw.bMoving=false;
		GoodsDraw.lastlock=null;//最后锁定物品
		GoodsDraw.swaplock=null;//交换锁定物品
		GoodsDraw.bUse=false;
		GoodsDraw.bSwap=false;
	}
GoodsDraw.new_DrawOneGoods_ext=function( x, y, g, count)
	{
		g.aa.Draw(x, y);
		if(GmPlay.de_goods.intValue(g.iTid,0,28)>1)M3DFast.gi().DrawTextEx(x+5, y+5, ""+count, 0xffffffff, 30, 101, 1, 1, 0, 0, 0);
	}
//GoodsDraw.Draw_OneGoods_ext( x, y,Goods g, count)
//	{
//		GmPlay.xani_goods.DrawAnima_aa(x,y, g.aa);
//		if(GmPlay.de_goods.intValue(g.iTid,0,28)>1)M3DFast.gi().DrawTextEx(x+5, y+5, ""+count, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//	}
//GoodsDraw.Draw_OneGoods( x, y,Goods g,Goods gsub, subc)
//	{
//		var i,j;
//		if(GoodsDraw.bMoving && GoodsDraw.lockgoods==g)
//		{
//			x=GoodsDraw.iMoveX-GoodsDraw.iOffX;
//			y=GoodsDraw.iMoveY-GoodsDraw.iOffY;
//		}
//		if(GmPlay.de_goods.intValue(g.iTid,0,28)>1)
//		{//可叠加
//			j=g.iCount;
//			if(gsub!=null)
//			{
//				for(i=0;i<gsub.length;i++)
//				{
//					if(g==gsub[i] && subc[i]>0)
//					{
//						j-=subc[i];
//					}
//				}
//			}
//			if(j<=0)return;
//			GmPlay.xani_goods.DrawAnima_aa(x,y, g.aa);
//			M3DFast.gi().DrawTextEx(x+5, y+5, ""+j, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
//		}
//		else
//		{//不可叠加
//			if(gsub!=null)
//			{
//				for(i=0;i<gsub.length;i++)
//				{
//					if(g==gsub[i] && subc[i]>0)return;
//				}
//			}
//			GmPlay.xani_goods.DrawAnima_aa(x,y, g.aa);
//		}
//	}
//GoodsDraw.Draw_Goods( offx, offy,Goods gs,Goods subg, subc)
//	{//宽320,高256
//		if(aa_block==null)
//		{
//			aa_block=GmPlay.xani_ui3.InitAnimaWithName("背包格子背景", null);
//		}
//		var i,j;
//		var x,y;
//		var xx=0,yy=0;
//		Goods moving=null;
//		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
//		{
//			for(j=0;j<4;j++)
//			{
//				x=offx+i*64;
//				y=offy+j*64;
//				aa_block.Draw(x,y);
////				GmPlay.xani_ui.DrawAnima(x, y, "物品格",0);
////				pm3f.DrawRect_2D(x,y,x+GW,y+GH, 0xffffffff);
//				if(GoodsDraw.bMoving && GoodsDraw.lockgoods==gs[j*GoodsDraw.GOODSEACHLINE+i])
//				{
//					xx=GoodsDraw.iMoveX-GoodsDraw.iOffX;
//					yy=GoodsDraw.iMoveY-GoodsDraw.iOffY;
//					moving=GoodsDraw.lockgoods;
//				}
//				if(gs[j*GoodsDraw.GOODSEACHLINE+i].iGid!=-1)
//				{
////					if(gs[j*GoodsDraw.GOODSEACHLINE+i]==lg)continue;
//					Draw_OneGoods(x,y,gs[j*GoodsDraw.GOODSEACHLINE+i],subg,subc);
//				}
//			}
//		}
//		if(moving!=null)Draw_OneGoods(xx,yy,moving,subg,subc);
//	}
GoodsDraw.new_DrawOneGoods=function( x, y, g, gsub, subc)
	{
		var i,j;
		if(GoodsDraw.bMoving && GoodsDraw.lockgoods==g)
		{
			x=GoodsDraw.iMoveX-GoodsDraw.iOffX;
			y=GoodsDraw.iMoveY-GoodsDraw.iOffY;
		}
		if(GmPlay.de_goods.intValue(g.iTid,0,28)>1)
		{//可叠加
			j=g.iCount;
			if(gsub!=null)
			{
				for(i=0;i<gsub.length;i++)
				{
					if(g==gsub[i] && subc[i]>0)
					{
						j-=subc[i];
					}
				}
			}
			if(j<=0)return;
			g.aa.Draw(x, y);
			M3DFast.gi().DrawTextEx(x+5, y+5, ""+j, 0xffffffff, 24, 101, 1, 1, 0, 0, 0);
		}
		else
		{//不可叠加
			if(gsub!=null)
			{
				for(i=0;i<gsub.length;i++)
				{
					if(g==gsub[i] && subc[i]>0)return;
				}
			}
			g.aa.Draw(x, y);
		}
	}
GoodsDraw.new_block=null;
GoodsDraw.FRAMEW=80*5+5*6;//430
GoodsDraw.FRAMEH=80*4+5*5;//345
GoodsDraw.new_DrawGoods=function( offx, offy, gs, subg, subc)
	{
		if(GoodsDraw.new_block==null)GoodsDraw.new_block=GmPlay.xani_nui3.InitAnimaWithName("物品格子", null);

		var i,j;
		var x,y;
		var xx=0,yy=0;
		DrawMode.new_frameon(offx, offy, 430, 345, 0);
		offx+=5;offy+=5;
		var moving=null;
		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
		{
			for(j=0;j<4;j++)
			{
				x=offx+i*85;
				y=offy+j*85;
				GoodsDraw.new_block.Draw(x,y);
//				GmPlay.xani_ui.DrawAnima(x, y, "物品格",0);
//				pm3f.DrawRect_2D(x,y,x+GW,y+GH, 0xffffffff);
				if(GoodsDraw.bMoving && GoodsDraw.lockgoods==gs[j*GoodsDraw.GOODSEACHLINE+i])
				{
					xx=GoodsDraw.iMoveX-GoodsDraw.iOffX;
					yy=GoodsDraw.iMoveY-GoodsDraw.iOffY;
					moving=GoodsDraw.lockgoods;
				}
				if(gs[j*GoodsDraw.GOODSEACHLINE+i].iGid!=-1)
				{
//					if(gs[j*GoodsDraw.GOODSEACHLINE+i]==lg)continue;
					GoodsDraw.new_DrawOneGoods(x,y,gs[j*GoodsDraw.GOODSEACHLINE+i],subg,subc);
				}
			}
		}
		if(moving!=null)GoodsDraw.new_DrawOneGoods(xx,yy,moving,subg,subc);
	}
GoodsDraw.new_LockPos=function( offx, offy, gs, g)
	{
		var i,j;
		offx+=5;
		offy+=5;
		
		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
		{//背包位置
			for(j=0;j<4;j++)
			{
				if(gs[j*GoodsDraw.GOODSEACHLINE+i]==g)
				{
						GoodsDraw.iLockX=offx+i*85;
						GoodsDraw.iLockY=offy+j*85;
						GoodsDraw.lastlock=g;
						GoodsDraw.lockgoods=g;
				}
			}
		}
	}
GoodsDraw.new_LockGoods=function( x, y, offx, offy, gs, msg)
	{
		var i,j,xx,yy;
		offx+=5;
		offy+=5;
		if(msg==3)
		{
			if(GoodsDraw.bLocked)
			{
				if(GoodsDraw.bMoving)
				{
					GoodsDraw.bMoving=false;
					for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
					{//背包位置
						for(j=0;j<4;j++)
						{
							xx=offx+i*85;
							yy=offy+j*85;
							
							if(XDefine.bInRect(x, y, xx,yy, 80,80))
							{
								if(gs[j*GoodsDraw.GOODSEACHLINE+i]!=GoodsDraw.lockgoods)
								{//移动交换物品
									GoodsDraw.bSwap=true;
									GoodsDraw.swaplock=gs[j*GoodsDraw.GOODSEACHLINE+i];
									GoodsDraw.lastlock=null;
									return GoodsDraw.lockgoods;
								}
							}
						}
					}
				}
				if(GoodsDraw.lastlock==GoodsDraw.lockgoods)
				{
					//使用
					GoodsDraw.bUse=true;
					GoodsDraw.lastlock=null;
					GoodsDraw.lockgoods=null;
					GoodsDraw.bLocked=false;
				}
				else
				{
					GoodsDraw.lastlock=GoodsDraw.lockgoods;
					GoodsDraw.bUse=false;
				}
			}
		}
		if(msg==1)// || msg==3)
		{
			GoodsDraw.bLocked=false;
			GoodsDraw.bMoving=false;
		}
		if(msg==1)GoodsDraw.bDrawing=false;
//		GmPlay.sop("zzzzzzzzz");
		if(msg==2 && GoodsDraw.bLocked)
		{
			GoodsDraw.iMoveX=x;
			GoodsDraw.iMoveY=y;
			GoodsDraw.bMoving=true;
			return GoodsDraw.lockgoods;
		}
		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
		{//背包位置
			for(j=0;j<4;j++)
			{
				xx=offx+i*85;
				yy=offy+j*85;
				if(XDefine.bInRect(x, y, xx,yy, 80,80))
				{
					if(gs[j*GoodsDraw.GOODSEACHLINE+i].iGid<=0)
					{
						GoodsDraw.lastlock=null;
						return null;
					}
					else
					{
						if(msg==1)
						{//按下，选中，开始计时
							GoodsDraw.bLocked=true;
							GoodsDraw.lockgoods=gs[j*GoodsDraw.GOODSEACHLINE+i];
							GoodsDraw.iLockX=xx;
							GoodsDraw.iLockY=yy;
							GoodsDraw.iOffX=x-xx;
							GoodsDraw.iOffY=y-yy;
							GoodsDraw.iTouchDelay=0;
						}

						return gs[j*GoodsDraw.GOODSEACHLINE+i];
					}
				}
			}
		}
		GoodsDraw.lastlock=null;
		return null;
	}
GoodsDraw.new_DrawRect=function( offx, offy, gs, lg, type)
	{//
		if(lg==null)return;
		var i,j;
		var x,y;
		offx+=5;
		offy+=5;
		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
		{
			for(j=0;j<4;j++)
			{
				x=offx+i*85;
				y=offy+j*85;
//				pm3f.DrawRect_2D(x,y,x+GW,y+GH, 0xffffffff);
				if(gs[j*GoodsDraw.GOODSEACHLINE+i].iGid!=-1)
				{
					if(gs[j*GoodsDraw.GOODSEACHLINE+i]==lg)
					{
						if(type==0)
						{
							GmPlay.xani_nui3.DrawAnimaEx(x, y, "物品选中框", 0, 101, 1, 1, 0, 0, 0);
						}
						else GmPlay.xani_nui3.DrawAnimaEx(x, y, "物品选中框", 1, 101, 1, 1, 0, 0, 0);
//							M3DFast.gi().FillRect_2D(x-w, y-w, x, y+60+w, c);
//							M3DFast.gi().FillRect_2D(x+60, y-w, x+60+w, y+60+w, c);
//							M3DFast.gi().FillRect_2D(x-w, y-w, x+60+w, y, c);
//							M3DFast.gi().FillRect_2D(x-w, y+60, x+60+w, y+60+w, c);
					}
				}
			}
		}
	}
//GoodsDraw.Draw_Rect( offx, offy,Goods gs,Goods lg, type)
//	{//
//		if(lg==null)return;
//		var i,j;
//		var x,y;
//		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
//		{
//			for(j=0;j<4;j++)
//			{
//				x=offx+i*64;
//				y=offy+j*64;
////				pm3f.DrawRect_2D(x,y,x+GW,y+GH, 0xffffffff);
//				if(gs[j*GoodsDraw.GOODSEACHLINE+i].iGid!=-1)
//				{
//					if(gs[j*GoodsDraw.GOODSEACHLINE+i]==lg)
//					{
//						if(type==0)
//						{
//							GmPlay.xani_ui3.DrawAnimaEx(x, y, "背包物品选中", 0, 101, 1, 1, 0, 0, 0);
//						}
//						else GmPlay.xani_goods.DrawAnimaEx(x, y, "物品锁定框", type, 101, 1, 1, 0, 0, 0);
////							M3DFast.gi().FillRect_2D(x-w, y-w, x, y+60+w, c);
////							M3DFast.gi().FillRect_2D(x+60, y-w, x+60+w, y+60+w, c);
////							M3DFast.gi().FillRect_2D(x-w, y-w, x+60+w, y, c);
////							M3DFast.gi().FillRect_2D(x-w, y+60, x+60+w, y+60+w, c);
//					}
//				}
//			}
//		}
//	}

GoodsDraw.NoMove=function()
	{
		GoodsDraw.bMoving=false;
	}
GoodsDraw.Lock_Goods=function( x, y, offx, offy, gs, msg)
	{
		var i,j,xx,yy;
		if(msg==3)
		{
			if(GoodsDraw.bLocked)
			{
				if(GoodsDraw.bMoving)
				{
					GoodsDraw.bMoving=false;
					for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
					{//背包位置
						for(j=0;j<4;j++)
						{
							xx=offx+i*64;
							yy=offy+j*64;
							
							if(XDefine.bInRect(x, y, xx,yy, 60,60))
							{
								if(gs[j*GoodsDraw.GOODSEACHLINE+i]!=GoodsDraw.lockgoods)
								{//移动交换物品
									GoodsDraw.bSwap=true;
									GoodsDraw.swaplock=gs[j*GoodsDraw.GOODSEACHLINE+i];
									GoodsDraw.lastlock=null;
									return GoodsDraw.lockgoods;
								}
							}
						}
					}
				}
				if(GoodsDraw.lastlock==GoodsDraw.lockgoods)
				{
					//使用
					GoodsDraw.bUse=true;
					GoodsDraw.lastlock=null;
					GoodsDraw.lockgoods=null;
					GoodsDraw.bLocked=false;
				}
				else
				{
					GoodsDraw.lastlock=GoodsDraw.lockgoods;
					GoodsDraw.bUse=false;
				}
			}
		}
		if(msg==1)// || msg==3)
		{
			GoodsDraw.bLocked=false;
			GoodsDraw.bMoving=false;
		}
		if(msg==1)GoodsDraw.bDrawing=false;
//		GmPlay.sop("zzzzzzzzz");
		if(msg==2 && GoodsDraw.bLocked)
		{
			GoodsDraw.iMoveX=x;
			GoodsDraw.iMoveY=y;
			GoodsDraw.bMoving=true;
			return GoodsDraw.lockgoods;
		}
		for(i=0;i<GoodsDraw.GOODSEACHLINE;i++)
		{//背包位置
			for(j=0;j<4;j++)
			{
				xx=offx+i*64;
				yy=offy+j*64;
				if(XDefine.bInRect(x, y, xx,yy, 60,60))
				{
					if(gs[j*GoodsDraw.GOODSEACHLINE+i].iGid<=0)
					{
						GoodsDraw.lastlock=null;
						return null;
					}
					else
					{
						if(msg==1)
						{//按下，选中，开始计时
							GoodsDraw.bLocked=true;
							GoodsDraw.lockgoods=gs[j*GoodsDraw.GOODSEACHLINE+i];
							GoodsDraw.iLockX=xx;
							GoodsDraw.iLockY=yy;
							GoodsDraw.iOffX=x-xx;
							GoodsDraw.iOffY=y-yy;
							GoodsDraw.iTouchDelay=0;
						}

						return gs[j*GoodsDraw.GOODSEACHLINE+i];
					}
				}
			}
		}
		GoodsDraw.lastlock=null;
		return null;
	}
GoodsDraw.bCanMove=function()
	{
		if(GoodsDraw.bSwap)
		{
			GoodsDraw.bSwap=false;
			return true;
		}
		else return false;
	}
GoodsDraw.bCanProc=function()
	{
		if(GoodsDraw.bUse)
		{
			GoodsDraw.bUse=false;
			return true;
		}
		else return false;
//		GmPlay.sop("bd="+GoodsDraw.bDrawing);
//		if(GoodsDraw.bDrawing)
//		{//显示详细，不处理点击
//			GoodsDraw.bDrawing=false;
//			return false;
//		}
//		return true;
	}
GoodsDraw.bShowDetail=function()
	{
		if(GoodsDraw.lastlock==null)return false;
		GoodsDraw.iTouchDelay++;
//		GmPlay.sop("td="+GoodsDraw.iTouchDelay);
//		if(GoodsDraw.iTouchDelay<6)return false;
		return true;
	}
GoodsDraw.new_DrawDetailEx1=function( tid, x, y, detail)
	{
		GoodsDraw.iDetailW=320;
		FormatString.gi().FormatEx(detail, GoodsDraw.iDetailW-30, 24, 0, 0, 28);
		GoodsDraw.iDetailH=20+80+10+FormatString.gi().iH+20;
		
		if(x<GoodsDraw.iDetailW+20)x+=80;
		else x=x-GoodsDraw.iDetailW;
		y=y+40-GoodsDraw.iDetailH/2;
		if(y<0)y=0;
		if(y+GoodsDraw.iDetailH>GmConfig.SCRH)y=GmConfig.SCRH-GoodsDraw.iDetailH;
		GoodsDraw.iDetailX=x;
		GoodsDraw.iDetailY=y;
		
		DrawMode.new_framewatch(x, y, GoodsDraw.iDetailW, GoodsDraw.iDetailH);
		if(GoodsDraw.new_block==null)GoodsDraw.new_block=GmPlay.xani_nui3.InitAnimaWithName("物品格子", null);
		GoodsDraw.new_block.Draw(x+20, y+20);
		GmPlay.xani_ngoods.DrawAnima_aa(x+20, y+20, GmPlay.de_goods.strValue(tid, 0, 10),0);
		M3DFast.gi().DrawTextEx(x+20+80+10, y+20, GmPlay.de_goods.strValue(tid, 0, 4), 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(x+20+80+10, y+20+32, sType, 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
//		M3DFast.gi().DrawTextEx(x+20+80+10, y+20+56, sLev, 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
		FormatString.gi().Draw(x+20, y+20+80+10);
	}
GoodsDraw.detail_add="";
GoodsDraw.new_DrawDetail=function( g, x, y, mh)
	{
		if(g==null)g=GoodsDraw.lockgoods;
		if(x==-1)x=GoodsDraw.iLockX;
		if(y==-1)y=GoodsDraw.iLockY;

		var sName,sType="",sLev="",s="";
//		String s,s1="",s2="";//类型，等级
		var i,j,m,n,type;
		sName=GmPlay.de_goods.strValue(g.iTid, -1, 4);
		type=GmPlay.de_goods.intValue(g.iTid, -1, 16);
		if(type!=-1)
		{//装备cx
			s="基本属性";
			sLev="等级："+GmPlay.de_goods.strValue(g.iTid, -1, 9);
			var add1,add2;
			var bs_base=[8,12,40,8,6];//攻，防，血，速，灵
			var bs_add=[0,0,0,0,0];
			add1=parseInt(g.iAtts[0]/10000);//基本属性加成
			add2=g.iAtts[0]%10000;
			i=parseInt(g.iAtts[2]/10000);//宝石1加成
			if(i>0)bs_add[parseInt(i/1000)]=bs_base[parseInt(i/1000)]*(i%1000);
			i=g.iAtts[2]%10000;//宝石2加成
			if(i>0)bs_add[parseInt(i/1000)]=bs_base[parseInt(i/1000)]*(i%1000);
			switch(type)
			{
			case 0:
				sType="类型：头盔";
				s+="#e# #cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
				s+="#e# #cffff00魔法 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 22)+add2);
				bs_add[1]=0;
				break;
			case 1://饰品
				sType="类型：饰品";
				s+="#e# #cffff00灵力 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 23)+add2+bs_add[4]);
				bs_add[4]=0;
				break;
			case 2://武器
				j=GmPlay.de_goods.intValue(g.iTid, -1, 19);
				if(j==0)sType="类型：武器(剑)";
				else if(j==1)sType="类型：武器(刀)";
				else sType="类型：武器(枪)";
//				sType="类型：武器";
				s+="#e# #cffff00伤害 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 3)+add2+bs_add[0]);
				bs_add[0]=0;
				break;
			case 3://铠甲
				j=GmPlay.de_goods.intValue(g.iTid, -1, 20);
				if(j==0)sType="类型：女衣";
				else sType="类型：铠甲";
				s+="#e# #cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add2+bs_add[1]);
				bs_add[1]=0;
				break;
			case 4://腰带
				sType="类型：腰带";
				s+="#e# #cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
				s+="#e# #cffff00气血 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 24)+add2+bs_add[2]);
				bs_add[1]=0;
				bs_add[2]=0;
				break;
			case 5://鞋子
				sType="类型：鞋子";
				s+="#e# #cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
				s+="#e# #cffff00速度 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 25)+add2+bs_add[3]);
				bs_add[1]=0;
				bs_add[3]=0;
				break;
			}
			if(bs_add[0]>0)s+="#e# 伤害 +"+bs_add[0];
			if(bs_add[1]>0)s+="#e# 防御 +"+bs_add[1];
			if(bs_add[2]>0)s+="#e# 气血 +"+bs_add[2];
			if(bs_add[3]>0)s+="#e# 速度 +"+bs_add[3];
			if(bs_add[4]>0)s+="#e# 灵力 +"+bs_add[4];
			add1=parseInt(g.iAtts[1]/10000);
			add2=g.iAtts[1]%10000;
			if(add1>0)
			{
				if(parseInt(add1/1000)==0)s+="#e# #c00ff00体质 +"+add1%1000;
				else if(parseInt(add1/1000)==1)s+="#e# #c00ff00法力 +"+add1%1000;
				else if(parseInt(add1/1000)==2)s+="#e# #c00ff00力量 +"+add1%1000;
				else if(parseInt(add1/1000)==3)s+="#e# #c00ff00耐力 +"+add1%1000;
				else if(parseInt(add1/1000)==4)s+="#e# #c00ff00敏捷 +"+add1%1000;
			}
			if(add2>0)
			{
				if(add1<=0)s+="#e# #c00ff00";
				else s+=" ";
				if(parseInt(add2/1000)==0)s+="体质 +"+add2%1000;
				else if(parseInt(add2/1000)==1)s+="法力 +"+add2%1000;
				else if(parseInt(add2/1000)==2)s+="力量 +"+add2%1000;
				else if(parseInt(add2/1000)==3)s+="耐力 +"+add2%1000;
				else if(parseInt(add2/1000)==4)s+="敏捷 +"+add2%1000;
			}
			if(g.iAtts[4]>0)
			{//特技特效
				i=(g.iAtts[4]>>20)&0x3ff;//无级别简易
				if(i>0)
				{
					s+="#e# #cff8020"+GmPlay.de_skill.strValue(i, 0, 6);//技能名称
				}
				i=(g.iAtts[4]>>10)&0x3ff;//特效
				if(i>0)
				{
					s+="#e# #c80c0ff特效 : "+GmPlay.de_skill.strValue(i, 0, 6);//技能名称
				}
				i=g.iAtts[4]&0x3ff;//特技
				if(i>0)
				{
					s+="#e# #c80c0ff特技 : "+GmPlay.de_skill.strValue(i, 0, 6);//技能名称
				}
			}
			s+="#e# #cffffff耐久度"+parseInt((g.iAtts[5]%100000+19)/20)+"/"+parseInt(g.iAtts[5]/100000);

			m=parseInt(g.iAtts[2]/10000);
			n=g.iAtts[2]%10000;
			if(m>0 || n>0)
			{//
				s+="#e#cb48cc8镶嵌等级 "+(m%1000+n%1000);
				s+="#e# 已镶嵌 ";
				if(m>0)s+=GmPlay.de_goods.strValue(parseInt(m/1000)+101, 0, 4);
				if(n>0)s+=","+GmPlay.de_goods.strValue(parseInt(n/1000)+101, 0, 4);
			}
			g.CalcSetScore();
			if(g.iScore>0)s+="#e# #cffffff评分："+g.iScore;

			i=parseInt(g.iAtts[3]/10000);//强化等级
			if(i>0)sName+=" +"+i;
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 31);
		if(type>0)
		{//材料
			sType="类型：材料";
			if(type==1)sLev="等级：一级";
			if(type==2)sLev+="等级：二级";
			if(type==3)sLev+="等级：三级";
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 27);
		if(type!=-1)
		{//草药
			sType="类型："+GameData.sBigNum[type]+"级草药";
	//		sLev="等级："+;
			var restorehp=GmPlay.de_goods.intValue(g.iTid, -1, 1);
			var restoremp=GmPlay.de_goods.intValue(g.iTid, -1, 2);
			if(restorehp!=-1)s+="#e# #c00ff00恢复气血"+restorehp;
			if(restoremp!=-1)s+="#e# #c00ff00恢复魔法"+restoremp;
			if(type==3)
			{
				switch(g.iTid)
				{
				case 85://黑莲花
					s+="#e# #c00ff00随机增加5~20点临时愤怒(进入战斗时恢复)";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 86://七星草	+速度
					s+="#e# #c00ff00随机增加5~20点敏捷";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 87://://幻心草
					s+="#e# #c00ff00随机增加5%~10%治疗能力";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 88://://千金藤	+力量
					s+="#e# #c00ff00随机增加5~20点力量";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 89://龙葵花	+耐力
					s+="#e# #c00ff00随机增加5~20点耐力";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 90://曼陀罗
					s+="#e# #c00ff00随机增加5%~20%固定伤害";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 91://九香虫
					s+="#e# #c00ff00随机增加5%~10%物理和法术命中";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 92://凤尾草		+魔力
					s+="#e# #c00ff00随机增加5~20点魔力";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 93://龙胆	+体质
					s+="#e# #c00ff00随机增加5~20点体质";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				case 94://辛夷花
					s+="#e# #c00ff00随机增加1%~5%物理和法术暴击";
					s+="#e# #cb48cc8效果持续24小时";
					break;
				}
			}
			if(s.length>0)s="#cffff00功效："+s;
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 33);
		if(type!=-1)
		{//丹药
			if(type==1)
			{
				sType="一级丹药";
				sLev="品质："+g.iAtts[0];
			}
			if(type==2)sType="二级丹药";
			if(type==3)
			{
				sType="三级丹药";
				if(g.iAtts[0]<40)sLev="品质：低";
				else if(g.iAtts[0]<80)sLev="品质：中";
				else sLev="品质：高";
			}
			if(type==4)sType="四级丹药";
			if(g.iTid==302 || g.iTid==303 || g.iTid==304 || g.iTid==305 || g.iTid==306 || g.iTid==307 || g.iTid==308 || g.iTid==309 || g.iTid==310 || g.iTid==311)
			{
				s+="#e#cff0000只能在擂台使用";
			}
			switch(g.iTid)
			{
			case 185://天魂溶血丹
				if(g.iAtts[0]<40)s+="#e# #c00ff00临时提高人物修炼一级";
				else if(g.iAtts[0]<80)s+="#e# #c00ff00临时提高人物修炼二级";
				else s+="#e# #c00ff00临时提高人物修炼三级";
				s+="#e# #cb48cc8效果持续24小时";
				break;
			case 187://七命玄门丹
				if(g.iAtts[0]<40)s+="#e# #c00ff00临时提高伤害结果20点";
				else if(g.iAtts[0]<80)s+="#e# #c00ff00临时提高伤害结果40点";
				else s+="#e# #c00ff00临时提高伤害结果60点";
				s+="#e# #cb48cc8效果持续24小时";
				break;
			case 188://三纹清灵丹
				if(g.iAtts[0]<40)s+="#e# #c00ff00临时提高宠物全属性8点";
				else if(g.iAtts[0]<80)s+="#e# #c00ff00临时提高宠物全属性13点";
				else s+="#e# #c00ff00临时提高宠物全属性18点";
				s+="#e# #cb48cc8效果持续24小时";
				break;
			case 165://安神丸+血蓝
			case 302:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*6+300);
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*2+100);
				break;
			case 166://小还丹+血
			case 303:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*9+450);
				break;
			case 167://大还丹+血
			case 311:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*12+600);
				break;
			case 168://护心丸+蓝
			case 310:
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*3+150);
				break;
			case 169://补心丸+蓝
			case 309:
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*5+200);
				break;
			case 170://天王补心丹+血蓝
			case 308:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*9+450);
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*3+150);
				break;
			case 171://舒筋活骨散解封
			case 307:
				s+="#e#cffffff解封并恢复气血"+(g.iAtts[0]*2+100);
				break;
			case 172://天仙玉露解封
			case 306:
				s+="#e#cffffff解封并恢复气血"+(g.iAtts[0]*6+300);
				break;
			case 173://还魂丹救活
			case 305:
				s+="#e#cffffff复活并恢复气血"+(g.iAtts[0]*2+100);
				break;
			case 174://九转还魂丹救活
			case 304:
				s+="#e#cffffff复活并恢复气血"+(g.iAtts[0]*6+300);
				break;
				///~~~~~~~~~~~~~~~~~二级丹药
			case 175://		金乌丹		攻
				s+="#e#cffffff增加坐骑力量资质";
				break;
			case 176://		风神丹		速
				s+="#e#cffffff增加坐骑敏捷资质";
				break;
			case 177://		火灵丹		魔
				s+="#e#cffffff增加坐骑法力资质";
				break;
			case 178://		培元丹		防
				s+="#e#cffffff增加坐骑耐力资质";
				break;
			case 179://		赤血丹		体
				s+="#e#cffffff增加坐骑体质资质";
				break;
			case 180://		青霜丹	
				s+="#e#cffffff增加200点宠物寿命";
				break;
			case 181://		养魂丹		灵气
				s+="#e#cffffff恢复坐骑灵气";
				break;
			case 182://		合气丹		成长
				s+="#e#cffffff增加坐骑成长";
				break;
			case 183://		地灵丹		
				s+="#e#cffffff使用后立即恢复50点体力，3小时内恢复体力速度翻倍";
				break;
			case 184://		天灵丹	
				s+="#e#cffffff使用后立即恢复人物等级*4+50体力值";
				break;

			case 191://涅盘丹
				s+="#e#c00ff00重置人物属性点";
				break;
			}
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 34);
		if(type!=-1)
		{//烹饪
			sType="类型：烹饪";
			sLev="品质："+g.iAtts[0];
			switch(g.iTid)
			{
			case 197://艾窝窝
				s+="#e#c00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
				break;
			case 198://三丁包子
				//漫游恢复
				s+="#e#c00ff00使用后增加愤怒=15，只能在漫游中使用";
				break;
			case 199://双塔鱼
				s+="#e#c00ff00恢复自身愤怒=品质*1.2，减少自身防御=品质*1，只能在战斗中使用";
				break;
			case 200://粉蒸牛肉
				s+="#e#c00ff00增加宠物寿命=品质/2";
				break;
			case 201://赖汤圆
				s+="#e#c00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
				break;
			case 202://臭豆腐
				s+="#e#c00ff00使用后增加愤怒=15，只能在战斗中使用";
				break;
			case 203://竹简饭
				s+="#e#c00ff00使用后增加愤怒=品质*0.5，只能在战斗中使用";
				break;
			case 204://清汤鱼圆
				s+="#e#c00ff00使用后增加愤怒=品质*0.8，附加中毒状态，只能在战斗中使用";
				break;
			case 205://蛇胆酒
				s+="#e#c00ff00使用后增加愤怒=品质*1，附加疯狂状态3~4回合，只能在战斗中使用";
				break;
			case 206://烤肉
				s+="#e#c00ff00使用后增加愤怒=品质/2，只能在漫游中使用";
				break;
			}
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 30);
		if(type!=-1)
		{//道具
			sType="类型：道具";
			switch(g.iTid)
			{
			case 116://血池
				s+="#e#c00ff00+1万血池上限";
				break;
			case 117://蓝池
				s+="#e#c00ff00+1万蓝池上限";
				break;
			case 377://大血
				s+="#e#c00ff00+10万血池上限";
				break;
			case 378://大蓝
				s+="#e#c00ff00+10万蓝池上限";
				break;
			case 240://绑铜
				s+="#e#c00ff00含有"+g.iAtts[0]+"绑铜";
				break;
			case 96://宝图
			case 230://高级宝图
//			case 327://破坏符咒
				s+="#e#c00ff00"+GmPlay.de_map.strValue(g.iAtts[0], 0, 1)+"("+parseInt(g.iAtts[1]/16)+","+parseInt(g.iAtts[2]/16)+")";
				break;
			case 97://装备制造图纸，显示
				s+="#e#cffff00等级 "+GmPlay.de_goods.intValue(g.iAtts[0], -1, 9);//穿戴等级要求
				i=GmPlay.de_goods.intValue(g.iAtts[0], -1, 16);
				if(i==0)s+="#e种类 头盔";
				else if(i==1)s+="#e种类 项链";
				else if(i==2)
				{//武器
					i=GmPlay.de_goods.intValue(g.iAtts[0], -1, 19);
					if(i==0)s+="#e种类 剑";
					else if(i==1)s+="#e种类 刀";
					else if(i==2)s+="#e种类 枪";
				}
				else if(i==3)
				{//衣服
					i=GmPlay.de_goods.intValue(g.iAtts[0], -1, 20);
					if(i==0)s+="#e种类 女衣";
					else if(i==1)s+="#e种类 男衣";
				}
				else if(i==4)s+="#e种类 腰带";
				else if(i==5)s+="#e种类 靴子";
				/////////////打造所需材料
//				s+="#e所需材料:";
				for(i=1;i<6;i++)
				{
					if(g.iAtts[i]==0)break;
					s+="#e材料"+i+" "+GmPlay.de_goods.strValue(g.iAtts[i], -1, 4);
				}
				break;
			case 98://显示等级，熟练度
			case 99:
			case 100:
				if(g.iTid==98)s+="#e#c00ff00制造 头盔，腰带";
				else if(g.iTid==99)s+="#e#c00ff00制造 武器，项链";
				else if(g.iTid==100)s+="#e#c00ff00制造 衣服，靴子";
				s+="#e等级 "+g.iAtts[0];
				s+="#e熟练度 "+g.iAtts[1];
				break;
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
				if(g.iTid==101)s+="#e#cb48cc8镶嵌部位 头盔,武器#e#c00ff00伤害 +8";
				else if(g.iTid==102)s+="#e#cb48cc8镶嵌部位 头盔,衣服#e#c00ff00防御 +12";
				else if(g.iTid==103)s+="#e#cb48cc8镶嵌部位 衣服,腰带#e#c00ff00气血 +40";
				else if(g.iTid==104)s+="#e#cb48cc8镶嵌部位 腰带,鞋子#e#c00ff00速度 +8";
				else if(g.iTid==105)s+="#e#cb48cc8镶嵌部位 项链,鞋子#e#c00ff00灵力 +6";
				s+="#e#cffff00"+g.iAtts[0]+"级";
				break;
			case 119://传送符
				if(g.iAtts[0]==0)s+="#e#c00ff00未定目的地";
				else
				{
					s+="#e#c00ff00剩余使用次数 "+g.iAtts[1];
					s+="#e#c00ff00"+GmPlay.de_map.strValue(g.iAtts[2], 0, 1)+"("+Math.floor(g.iAtts[3]/16)+","+Math.floor(g.iAtts[4]/16)+")";
				}
				break;
			case 154://低级宠物技能书
			case 155:
			case 156:
				s+="#e#c00ff00"+GmPlay.de_skill.strValue(g.iAtts[0], 0, 5);
				s+="#e#cffffff"+GmPlay.de_skill.strValue(g.iAtts[0], 0, 3);
				break;
			case 162://新手礼包
				s+="#e#c00ff00等级到达"+g.iAtts[0]+"级可开启";
				break;
			case 195://丹方
			case 328://2
			case 329://3
			case 330://4
			case 331://5
				sLev="等级："+GameData.sBigNum[g.iAtts[0]]+"级";
				if(g.iAtts[2]>0)
				{
					s+="#e#c00ff00"+GmPlay.de_goods.strValue(g.iAtts[1], 0, 4);//丹药名字
					s+="#e#cb48cc8剩余使用次数:"+g.iAtts[2];
					for(i=3;i<7;i++)
					{//材料1,2,3
						if(g.iAtts[i]<=0)break;
						s+="#e#cffff00配料"+(i-2)+":"+GmPlay.de_goods.strValue(g.iAtts[i], 0, 4);
					}
				}
				break;
//			case 332://店里的丹方
//			case 333://店里的丹方
//			case 334://店里的丹方
//			case 335://店里的丹方
//			case 336://店里的丹方
//				s+="#e#cffffff"+GameData.sBigNum[g.iTid-331]+"级";
//				break;
			case 342://丹炉
			case 343:
			case 344:
			case 345:
			case 346:
				sLev="等级："+GameData.sBigNum[g.iTid-341]+"级";
				if(g.iAtts[1]>0)
				{
					s+="#e#cb48cc8剩余使用次数："+g.iAtts[1];
					if(g.iAtts[2]==0)s+="#e#c00ff00品质：随机";
					else s+="#e#c00ff00品质："+g.iAtts[2];
					s+="#e#c00ff00增加炼药成功率："+g.iAtts[3]+"%";
				}
				break;
			case 196://阵书
				s+="#e#c00ff00"+GameData.sZhenName[g.iAtts[0]];
				break;
			case 226://玉灵果，体质，魔力，力量，耐力，敏捷
			case 227://仙露，木，火，金，土，水
				if(g.iAtts[0]==0)s+="#e#c00ff00属性：木";
				else if(g.iAtts[0]==1)s+="#e#c00ff00属性：火";
				else if(g.iAtts[0]==2)s+="#e#c00ff00属性：金";
				else if(g.iAtts[0]==3)s+="#e#c00ff00属性：土";
				else if(g.iAtts[0]==4)s+="#e#c00ff00属性：水";
				break;
			case 231://0tid
			case 232://1skillid
			case 233://2time
			case 234:
			case 235:
				s+="#e#c00ff00卡片类型："+GmPlay.de_pet.strValue(g.iAtts[0], 0, 1);//变化类型
				if(g.iTid==231)s+="#e#c00ff00技能要求：一级变身术";
				else if(g.iTid==232)s+="#e#c00ff00技能要求：二级变身术";
				else if(g.iTid==233)s+="#e#c00ff00技能要求：三级变身术";
				else if(g.iTid==234)s+="#e#c00ff00技能要求：四级变身术";
				else if(g.iTid==235)s+="#e#c00ff00技能要求：五级变身术";
				//附加技能，属性影响
				if(g.iAtts[1]>0)s+="#e#c00ff00附加技能："+GmPlay.de_skill.strValue(g.iAtts[1],0,6);
				if(g.iAtts[3]>0)
				{//0气血，1灵力，2攻击，3防御，4速度
					i=(g.iAtts[3]%1000-100);
					switch((g.iAtts[3]/1000)%10)
					{
					case 0://气血
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%气血";
						break;
					case 1://灵力
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%灵力";
						break;
					case 2://攻击
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%伤害";
						break;
					case 3://防御
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%防御";
						break;
					case 4://速度
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%速度";
						break;
					}
					
				}
				s+="#e#cb48cc8剩余使用次数："+g.iAtts[2];
				break;
			case 255://一级种子
			case 256://2
			case 257://3
			case 258://4
			case 259://5
				s+="#e#c00ff00种类:"+GmPlay.de_grow.strValue(g.iAtts[0], 0, 1);
				s+="#e#c00ff00等级:"+GmPlay.de_grow.strValue(g.iAtts[0], 0, 2);
				s+="#e#c00ff00品质:"+g.iAtts[1];
				s+="#e#c00ff00五行:"+GameData.sWuXing[g.iAtts[2]];
				break;
			case 261://地契
				if(g.iAtts[0]==0)s+="#e#c00ff00空白地契，可将土地登记其中，便于交易";
				else
				{//
					s+="#e#c00ff00风格:"+MyLand.sLandName[g.iAtts[1]/100];
					s+="#e#c00ff00风水:"+g.iAtts[2];
					s+="#e#c00ff00金灵气"+g.iAtts[3]/1000+"#e木灵气"+g.iAtts[3]%1000+"#e水灵气"+g.iAtts[4]/1000+"#e火灵气"+g.iAtts[4]%1000+"#e土灵气"+g.iAtts[5]/1000;
				}
				break;
			case 265:
				s+="#e#c00ff00可提高一，二级植物的品质";
				break;
			case 266://灵石
			case 267:
			case 268:
			case 269:
			case 270:
				i=g.iTid-266;
				s+="#e#c00ff00可提高"+GameData._sWXS[i]+"灵石的灵气";
				s+="#e#c00ff00可降低"+GameData._sWXK[i]+"灵石的灵气";
				break;
			case 271:
			case 272:
			case 273:
			case 274:
			case 275:
				s+="#e#c00ff00"+GameData.sWeek[g.iTid-270]+"级果实";
				s+="#e#c00ff00种类:"+GmPlay.de_grow.strValue(g.iAtts[0], 0, 1);
				s+="#e#c00ff00品质:"+g.iAtts[1];
				break;
			case 276://经验丹
			case 277://高级经验丹
				s+="#e#c00ff00品质:"+g.iAtts[0];
				break;
			case 397://军需锦囊
				s+="#e#c00ff00打开后获得一个宠物经验丹，赠送2个二级材料";
				break;
			case 398://战略奇椟
				s+="#e#c00ff00打开后获得一个低级人物经验丹，赠送2个七国旗";
				break;
			}
		}
		var detail=GmPlay.de_goods.strValue(g.iTid, -1, 29);//描述//描述在最后
		if(detail!="-1")s+="#e#c99d9ea"+detail;
		if((g.iAtts[7]&1)!=0)s+="#e#ca0a0a0系统绑定";
		
		s+=GoodsDraw.detail_add;
		GoodsDraw.iDetailW=320;
//		GoodsDraw.iDetailX=x-GoodsDraw.iDetailW;
//		GoodsDraw.iDetailY=y-100;
//		FormatString.gi().Format(s, GoodsDraw.iDetailW-30, 20);
		if(s.length>2)
		{
			do
			{
				//GmPlay.sop(s);
				var tmp=s.substring(0, 2);
				//GmPlay.sop(tmp);
				if(tmp=="#e")
				{
					s=s.substring(2, s.length);
				}
				else break;
			}
			while(s.length>2);
		}
		FormatString.gi().FormatEx(s, GoodsDraw.iDetailW-30, 24, 0, 0, 28);
		GoodsDraw.iDetailH=20+80+10+FormatString.gi().iH+20+mh;
		
		if(x<GoodsDraw.iDetailW+20)x+=80;
		else x=x-GoodsDraw.iDetailW;
		y=y+40-GoodsDraw.iDetailH/2;
//		y-=100;
		if(y<0)y=0;
		if(y+GoodsDraw.iDetailH>GmConfig.SCRH)y=GmConfig.SCRH-GoodsDraw.iDetailH;
		GoodsDraw.iDetailX=x;
		GoodsDraw.iDetailY=y;
		
		DrawMode.new_framewatch(x, y, GoodsDraw.iDetailW, GoodsDraw.iDetailH);
		if(GoodsDraw.new_block==null)GoodsDraw.new_block=GmPlay.xani_nui3.InitAnimaWithName("物品格子", null);
		GoodsDraw.new_block.Draw(x+20, y+20);
		g.aa.Draw(x+20, y+20);
		M3DFast.gi().DrawTextEx(x+20+80+10, y+20, sName, 0xffffff00, 30, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x+20+80+10, y+20+32, sType, 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x+20+80+10, y+20+56, sLev, 0xffffff00, 22, 101, 1, 1, 0, 0, 0);
		FormatString.gi().Draw(x+20, y+20+80+10);
		
//		var offx=x+20,offy=y+20;
//		DrawBuffer.gi().ClearBuffer();
//		if(GoodsDraw.new_block==null)GoodsDraw.new_block=GmPlay.xani_nui3.InitAnimaWithName("物品格子", null);
//		DrawBuffer.gi().DrawAnima_aa(100, null, offx, offy, GoodsDraw.new_block);
//		offx+=80+10;
//		
//		//如果是装备，强化等级加在后面
//		DrawBuffer.gi().DrawText(100, 0, offx, offy, sName, 0xffff00, 30);
		//类型(如果有)
		//等级(如果有)
//		String detail=GmPlay.de_goods.strValue(g.iTid, -1, 29);//描述//描述在最后
//		if(detail!="-1")s+="#e#cffffff"+detail;
	}
GoodsDraw.bUseGoods=function()
	{
		if(GoodsDraw.bUse)
		{
			GoodsDraw.bUse=false;
			return GoodsDraw.lastlock;
		}
		else return GoodsDraw.lastlock;
	}
GoodsDraw.iDetailX,GoodsDraw.iDetailY;
GoodsDraw.iDetailW,GoodsDraw.iDetailH;
//GoodsDraw.Draw_Detail(Goods g, x, y)
//	{
//		GoodsDraw.bDrawing=true;
//		if(g==null)g=GoodsDraw.lockgoods;
//		if(x==-1)x=GoodsDraw.iLockX;
//		if(y==-1)y=GoodsDraw.iLockY;
//		String s=GetGoodsDetail(g);
//		GoodsDraw.iDetailW=270;
//		FormatString.gi().Format(s, GoodsDraw.iDetailW-70, 20);
//
//		GoodsDraw.iDetailH=FormatString.gi().iH;
//		if(GoodsDraw.iDetailH<100)GoodsDraw.iDetailH=100;
//
//		GoodsDraw.iDetailX=x-GoodsDraw.iDetailW;
//		GoodsDraw.iDetailY=y-GoodsDraw.iDetailH/2;
//
//		if(GoodsDraw.iDetailX<0)GoodsDraw.iDetailX=x+60+10;
//		if(GoodsDraw.iDetailY<5)GoodsDraw.iDetailY=5;
//		DrawMode.Frame1_BR(GoodsDraw.iDetailX-5, GoodsDraw.iDetailY-5, GoodsDraw.iDetailW+10, GoodsDraw.iDetailH+10);
//		GmPlay.xani_goods.DrawAnima_aa(GoodsDraw.iDetailX, GoodsDraw.iDetailY, g.aa);
//		FormatString.gi().Draw(GoodsDraw.iDetailX+65, GoodsDraw.iDetailY);
//	}
//GoodsDraw.Draw_Detailex(Goods g, x, y)
//	{
//		GoodsDraw.bDrawing=true;
//		if(g==null)g=GoodsDraw.lockgoods;
//		if(x==-1)x=GoodsDraw.iLockX;
//		if(y==-1)y=GoodsDraw.iLockY;
//		String s=GetGoodsDetail(g);
//		GoodsDraw.iDetailW=270;
//		FormatString.gi().Format(s, GoodsDraw.iDetailW-70, 20);
//
//		GoodsDraw.iDetailH=FormatString.gi().iH+60;
//		if(GoodsDraw.iDetailH<100)GoodsDraw.iDetailH=100;
//
//		GoodsDraw.iDetailX=x-GoodsDraw.iDetailW;
//		GoodsDraw.iDetailY=y-GoodsDraw.iDetailH/2;
//
//		if(GoodsDraw.iDetailX<0)GoodsDraw.iDetailX=x+60+10;
//		if(GoodsDraw.iDetailY<5)GoodsDraw.iDetailY=5;
//		DrawMode.Frame1_BR(GoodsDraw.iDetailX-5, GoodsDraw.iDetailY-5, GoodsDraw.iDetailW+10, GoodsDraw.iDetailH+10);
//		GmPlay.xani_goods.DrawAnima_aa(GoodsDraw.iDetailX, GoodsDraw.iDetailY, g.aa);
//		FormatString.gi().Draw(GoodsDraw.iDetailX+65, GoodsDraw.iDetailY);
//	}
	/*
GoodsDraw.GetGoodsDetail(Goods g)
	{
		var i,m,n;
		var type;
		String s;
		
		s="#cffff00"+GmPlay.de_goods.strValue(g.iTid, -1, 4);//物品名称
		String detail=GmPlay.de_goods.strValue(g.iTid, -1, 29);//描述
		if(detail!="-1")s+="#e#cffffff"+detail;
		
		type=GmPlay.de_goods.intValue(g.iTid, -1, 16);
		if(type!=-1)
		{//-----------------------------------------------------------------------------------是装备
			s+="#e#cffff00等级 "+GmPlay.de_goods.strValue(g.iTid, -1, 9);//穿戴等级要求
			var add1,add2;
			var bs_base={8,12,40,8,6};//攻，防，血，速，灵
			var bs_add={0,0,0,0,0};
			add1=g.iAtts[0]/10000;//基本属性加成
			add2=g.iAtts[0]%10000;
			i=g.iAtts[2]/10000;//宝石1加成
			if(i>0)bs_add[i/1000]=bs_base[i/1000]*(i%1000);
			i=g.iAtts[2]%10000;//宝石2加成
			if(i>0)bs_add[i/1000]=bs_base[i/1000]*(i%1000);
			switch(type)
			{
			case 0://头盔
//				s+="#e#cffff00头盔";
				s+="#e#cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
				s+="#e#cffff00魔法 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 22)+add2);
				bs_add[1]=0;
				break;
			case 1://饰品
//				s+="#e#cffff00饰品";
				s+="#e#cffff00灵力 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 23)+add2+bs_add[4]);
				bs_add[4]=0;
				break;
			case 2://武器
//				s+="#e#cffff00武器";
				s+="#e#cffff00伤害 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 3)+add2+bs_add[0]);
				bs_add[0]=0;
				break;
			case 3://铠甲
//				s+="#e#cffff00铠甲";
				s+="#e#cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add2+bs_add[1]);
				bs_add[1]=0;
				break;
			case 4://腰带
//				s+="#e#cffff00腰带";
				s+="#e#cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
				s+="#e#cffff00气血 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 24)+add2+bs_add[2]);
				bs_add[1]=0;
				bs_add[2]=0;
				break;
			case 5://鞋子
//				s+="#e#cffff00鞋子";
				s+="#e#cffff00防御 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
				s+="#e#cffff00速度 +"+(GmPlay.de_goods.intValue(g.iTid, -1, 25)+add2+bs_add[3]);
				bs_add[1]=0;
				bs_add[3]=0;
				break;
			}
			if(bs_add[0]>0)s+="#e伤害 +"+bs_add[0];
			if(bs_add[1]>0)s+="#e防御 +"+bs_add[1];
			if(bs_add[2]>0)s+="#e气血 +"+bs_add[2];
			if(bs_add[3]>0)s+="#e速度 +"+bs_add[3];
			if(bs_add[4]>0)s+="#e灵力 +"+bs_add[4];
			
			add1=g.iAtts[1]/10000;
			add2=g.iAtts[1]%10000;
			if(add1>0)
			{
				if(add1/1000==0)s+="#e#c00ff00体质 +"+add1%1000;
				else if(add1/1000==1)s+="#e#c00ff00法力 +"+add1%1000;
				else if(add1/1000==2)s+="#e#c00ff00力量 +"+add1%1000;
				else if(add1/1000==3)s+="#e#c00ff00耐力 +"+add1%1000;
				else if(add1/1000==4)s+="#e#c00ff00敏捷 +"+add1%1000;
			}
			if(add2>0)
			{
				if(add1<=0)s+="#e#c00ff00";
				else s+=" ";
				if(add2/1000==0)s+="体质 +"+add2%1000;
				else if(add2/1000==1)s+="法力 +"+add2%1000;
				else if(add2/1000==2)s+="力量 +"+add2%1000;
				else if(add2/1000==3)s+="耐力 +"+add2%1000;
				else if(add2/1000==4)s+="敏捷 +"+add2%1000;
			}
//			i=g.iAtts[2]/10000;//宝石1加成
//			if(i>0)s+="#e"+GmPlay.de_goods.strValue(i/1000+101, 0, 4)+i%1000+"级";
//			i=g.iAtts[2]%10000;//宝石2加成
//			if(i>0)s+="#e"+GmPlay.de_goods.strValue(i/1000+101, 0, 4)+i%1000+"级";
			if(g.iAtts[4]>0)
			{//特技特效
				i=(g.iAtts[4]>>20)&0x3ff;//无级别简易
				if(i>0)
				{
					s+="#e#cff8020"+GmPlay.de_skill.strValue(i, 0, 6);//技能名称
				}
				i=(g.iAtts[4]>>10)&0x3ff;//特效
				if(i>0)
				{
					s+="#e#c80c0ff特效 : "+GmPlay.de_skill.strValue(i, 0, 6);//技能名称
				}
				i=g.iAtts[4]&0x3ff;//特技
				if(i>0)
				{
					s+="#e#c80c0ff特技 : "+GmPlay.de_skill.strValue(i, 0, 6);//技能名称
				}
			}
			
			m=g.iAtts[2]/10000;
			n=g.iAtts[2]%10000;
			if(m>0 || n>0)
			{//
				s+="#e#cb48cc8镶嵌等级 "+(m%1000+n%1000);
				s+="#e已镶嵌 ";
				if(m>0)s+=GmPlay.de_goods.strValue(m/1000+101, 0, 4);
				if(n>0)s+=","+GmPlay.de_goods.strValue(n/1000+101, 0, 4);
			}

			i=g.iAtts[3]/10000;
			if(i>0)s+="#e#c80c0ff强化等级 "+i;
					//攻，防，血，速，灵
			
			s+="#e#cffffff耐久度"+(g.iAtts[5]%100000)/20+"/"+g.iAtts[5]/100000;
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 31);
		if(type>0)
		{
			if(type==1)s+="#e#cffff00一级材料";
			if(type==2)s+="#e#cffff00二级材料";
			if(type==3)s+="#e#cffff00三级材料";
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 27);
		if(type!=-1)
		{//----------------------------------------------------------------------------------是草药
			s+="#e#cffff00"+type+"级草药";
			var restorehp=GmPlay.de_goods.varValue(g.iTid, -1, 1);
			var restoremp=GmPlay.de_goods.varValue(g.iTid, -1, 2);
			if(restorehp!=-1)s+="#e#c00ff00恢复气血"+restorehp;
			if(restoremp!=-1)s+="#e#c00ff00恢复魔法"+restoremp;
			if(type==3)
			{
				switch(g.iTid)
				{
				case 85://黑莲花
					s+="#e#c00ff00随机增加5~20点临时愤怒(进入战斗时恢复)";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 86://七星草	+速度
					s+="#e#c00ff00随机增加5~20点敏捷";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 87://://幻心草
					s+="#e#c00ff00随机增加5%~10%治疗能力";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 88://://千金藤	+力量
					s+="#e#c00ff00随机增加5~20点力量";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 89://龙葵花	+耐力
					s+="#e#c00ff00随机增加5~20点耐力";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 90://曼陀罗	
					s+="#e#c00ff00随机增加5%~20%固定伤害";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 91://九香虫	
					s+="#e#c00ff00随机增加5%~10%物理和法术命中";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 92://凤尾草		+魔力
					s+="#e#c00ff00随机增加5~20点魔力";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 93://龙胆	+体质
					s+="#e#c00ff00随机增加5~20点体质";
					s+="#e#cb48cc8效果持续24小时";
					break;
				case 94://辛夷花
					s+="#e#c00ff00随机增加1%~5%物理和法术暴击";
					s+="#e#cb48cc8效果持续24小时";
					break;
				}
			}
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 30);
		if(type!=-1)
		{//-------------------------------------------------------------------------------是道具
			switch(g.iTid)
			{
			case 96://宝图
			case 230://高级宝图
				s+="#e#c00ff00"+GmPlay.de_map.strValue(g.iAtts[0], 0, 1)+"("+g.iAtts[1]/16+","+g.iAtts[2]/16+")";
				break;
			case 97://装备制造图纸，显示
				s+="#e#cffff00等级 "+GmPlay.de_goods.intValue(g.iAtts[0], -1, 9);//穿戴等级要求
				i=GmPlay.de_goods.intValue(g.iAtts[0], -1, 16);
				if(i==0)s+="#e种类 头盔";
				else if(i==1)s+="#e种类 项链";
				else if(i==2)
				{//武器
					i=GmPlay.de_goods.intValue(g.iAtts[0], -1, 19);
					if(i==0)s+="#e种类 剑";
					else if(i==1)s+="#e种类 刀";
					else if(i==2)s+="#e种类 枪";
				}
				else if(i==3)
				{//衣服
					i=GmPlay.de_goods.intValue(g.iAtts[0], -1, 20);
					if(i==0)s+="#e种类 女衣";
					else if(i==1)s+="#e种类 男衣";
				}
				else if(i==4)s+="#e种类 腰带";
				else if(i==5)s+="#e种类 靴子";
				/////////////打造所需材料
//				s+="#e所需材料:";
				for(i=1;i<6;i++)
				{
					if(g.iAtts[i]==0)break;
					s+="#e材料"+i+" "+GmPlay.de_goods.strValue(g.iAtts[i], -1, 4);
				}
				break;
			case 98://显示等级，熟练度
			case 99:
			case 100:
				if(g.iTid==98)s+="#e#c00ff00制造 头盔，腰带";
				else if(g.iTid==99)s+="#e#c00ff00制造 武器，项链";
				else if(g.iTid==100)s+="#e#c00ff00制造 衣服，靴子";
				s+="#e等级 "+g.iAtts[0];
				s+="#e熟练度 "+g.iAtts[1];
				break;
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
				if(g.iTid==101)s+="#e#cb48cc8镶嵌部位 头盔,武器#e#c00ff00伤害 +8";
				else if(g.iTid==102)s+="#e#cb48cc8镶嵌部位 头盔,衣服#e#c00ff00防御 +12";
				else if(g.iTid==103)s+="#e#cb48cc8镶嵌部位 衣服,腰带#e#c00ff00气血 +40";
				else if(g.iTid==104)s+="#e#cb48cc8镶嵌部位 腰带,鞋子#e#c00ff00速度 +8";
				else if(g.iTid==105)s+="#e#cb48cc8镶嵌部位 项链,鞋子#e#c00ff00灵力 +6";
				s+="#e#cffff00"+g.iAtts[0]+"级";
				break;
			case 119://传送符
				if(g.iAtts[0]==0)s+="#e#c00ff00未定目的地";
				else
				{
					s+="#e#c00ff00剩余使用次数 "+g.iAtts[1];
					s+="#e#c00ff00"+GmPlay.de_map.strValue(g.iAtts[2], 0, 1)+"("+g.iAtts[3]/16+","+g.iAtts[4]/16+")";
				}
				break;
			case 154://低级宠物技能书
			case 155:
			case 156:
				s+="#e#c00ff00"+GmPlay.de_skill.strValue(g.iAtts[0], 0, 5);
				s+="#e#cffffff"+GmPlay.de_skill.strValue(g.iAtts[0], 0, 3);
				break;
			case 162://新手礼包
				s+="#e#c00ff00等级到达"+g.iAtts[0]+"级可开启";
				break;
			case 195://丹方
			case 328://2
			case 329://3
			case 330://4
			case 331://5
				if(g.iAtts[0]==1)s+="#e#cffffff一级";
				if(g.iAtts[1]>0)s+="#e#c00ff00"+GmPlay.de_goods.strValue(g.iAtts[1], 0, 4);//丹药名字
				s+="#e#cb48cc8剩余使用次数:"+g.iAtts[2];
//				s+="#e#cff00ff配方:";
				for(i=3;i<7;i++)
				{//材料1,2,3
					if(g.iAtts[i]<=0)break;
//					if(i>3)s+=",";
//					s+=GmPlay.de_goods.strValue(g.iAtts[i], 0, 4);
					s+="#e#cffff00配料"+(i-2)+":"+GmPlay.de_goods.strValue(g.iAtts[i], 0, 4);
				}
				break;
			case 332://店里的丹方
				s+="#e#cffffff一级";
				break;
			case 333://店里的丹方
				s+="#e#cffffff二级";
				break;
			case 334://店里的丹方
				s+="#e#cffffff三级";
				break;
			case 335://店里的丹方
				s+="#e#cffffff四级";
				break;
			case 336://店里的丹方
				s+="#e#cffffff五级";
				break;
			case 196://阵书
				s+="#e#c00ff00"+GameData.sZhenName[g.iAtts[0]];
				break;
			case 226://玉灵果，体质，魔力，力量，耐力，敏捷
			case 227://仙露，木，火，金，土，水
				if(g.iAtts[0]==0)s+="#e#c00ff00属性：木";
				else if(g.iAtts[0]==1)s+="#e#c00ff00属性：火";
				else if(g.iAtts[0]==2)s+="#e#c00ff00属性：金";
				else if(g.iAtts[0]==3)s+="#e#c00ff00属性：土";
				else if(g.iAtts[0]==4)s+="#e#c00ff00属性：水";
				break;
			case 231://0tid
			case 232://1skillid
			case 233://2time
			case 234:
			case 235:
				s+="#e#c00ff00卡片类型："+GmPlay.de_pet.strValue(g.iAtts[0], 0, 1);//变化类型
				if(g.iTid==231)s+="#e#c00ff00技能要求：一级变身术";
				else if(g.iTid==232)s+="#e#c00ff00技能要求：二级变身术";
				else if(g.iTid==233)s+="#e#c00ff00技能要求：三级变身术";
				else if(g.iTid==234)s+="#e#c00ff00技能要求：四级变身术";
				else if(g.iTid==235)s+="#e#c00ff00技能要求：五级变身术";
				//附加技能，属性影响
				if(g.iAtts[1]>0)s+="#e#c00ff00附加技能："+GmPlay.de_skill.strValue(g.iAtts[1],0,6);
				if(g.iAtts[3]>0)
				{//0气血，1灵力，2攻击，3防御，4速度
					i=(g.iAtts[3]%1000-100);
					switch((g.iAtts[3]/1000)%10)
					{
					case 0://气血
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%气血";
						break;
					case 1://灵力
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%灵力";
						break;
					case 2://攻击
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%伤害";
						break;
					case 3://防御
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%防御";
						break;
					case 4://速度
						s+="#e#c00ff00属性影响："+(i>0?"+"+i:i)+"%速度";
						break;
					}
					
				}
				s+="#e#cb48cc8剩余使用次数："+g.iAtts[2];
				break;
			case 255://一级种子
			case 256://2
			case 257://3
			case 258://4
			case 259://5
				s+="#e#c00ff00种类:"+GmPlay.de_grow.strValue(g.iAtts[0], 0, 1);
				s+="#e#c00ff00等级:"+GmPlay.de_grow.strValue(g.iAtts[0], 0, 2);
				s+="#e#c00ff00品质:"+g.iAtts[1];
				s+="#e#c00ff00五行:"+GameData.sWuXing[g.iAtts[2]];
				break;
			case 261://地契
				if(g.iAtts[0]==0)s+="#e#c00ff00空白地契，可将土地登记其中，便于交易";
				else
				{//
					s+="#e#c00ff00风格:"+MyLand.sLandName[g.iAtts[1]/100];
					s+="#e#c00ff00风水:"+g.iAtts[2];
					s+="#e#c00ff00金灵气"+g.iAtts[3]/1000+"#e木灵气"+g.iAtts[3]%1000+"#e水灵气"+g.iAtts[4]/1000+"#e火灵气"+g.iAtts[4]%1000+"#e土灵气"+g.iAtts[5]/1000;
				}
				break;
			case 266://灵石
			case 267:
			case 268:
			case 269:
			case 270:
				i=g.iTid-266;
				s+="#e#c00ff00可提高"+GameData._sWXS[i]+"灵石的灵气";
				s+="#e#c00ff00可降低"+GameData._sWXK[i]+"灵石的灵气";
				break;
			case 271:
			case 272:
			case 273:
			case 274:
			case 275:
				s+="#e#c00ff00"+GameData.sWeek[g.iTid-270]+"级果实";
				s+="#e#c00ff00种类:"+GmPlay.de_grow.strValue(g.iAtts[0], 0, 1);
				s+="#e#c00ff00品质:"+g.iAtts[1];
				break;
			case 276://经验丹
			case 277://高级经验丹
				s+="#e#c00ff00品质:"+g.iAtts[0];
				break;
			}
		}
		GmPlay.sop("tid="+g.iTid);
		type=GmPlay.de_goods.intValue(g.iTid, -1, 33);
		if(type!=-1)
		{//重置人物属性点
			if(type==1)
			{
				s+="#e#cffff00一级丹药";
				s+="#e#c00ff00品质:"+g.iAtts[0];
			}
			if(type==2)s+="#e#cffff00二级丹药";
			if(type==3)s+="#e#cffff00三级丹药";
			if(type==4)s+="#e#cffff00四级丹药";
			GmPlay.sop("tid="+g.iTid);
			switch(g.iTid)
			{
			case 165://安神丸+血蓝1000
			case 302:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*6+300);
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*2+100);
				break;
			case 166://小还丹+血1000
			case 303:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*9+450);
				break;
			case 167://大还丹+血2000
			case 311:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*12+600);
				break;
			case 168://护心丸+蓝1000
			case 310:
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*3+150);
				break;
			case 169://补心丸+蓝2000
			case 309:
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*5+200);
				break;
			case 170://天王补心丹+血蓝2000
			case 308:
				s+="#e#cffffff恢复气血"+(g.iAtts[0]*9+450);
				s+="#e#cffffff恢复魔法"+(g.iAtts[0]*3+150);
				break;
			case 171://舒筋活骨散解封1000
			case 307:
				s+="#e#cffffff解封并恢复气血"+(g.iAtts[0]*2+100);
				break;
			case 172://天仙玉露解封2000
			case 306:
				s+="#e#cffffff解封并恢复气血"+(g.iAtts[0]*6+300);
				break;
			case 173://还魂丹救活1000
			case 305:
				s+="#e#cffffff复活并恢复气血"+(g.iAtts[0]*2+100);
				break;
			case 174://九转还魂丹救活2000
			case 304:
				s+="#e#cffffff复活并恢复气血"+(g.iAtts[0]*6+300);
				break;
				///~~~~~~~~~~~~~~~~~二级丹药
			case 175://		金乌丹		攻
				s+="#e#cffffff增加坐骑力量资质";
				break;
			case 176://		风神丹		速
				s+="#e#cffffff增加坐骑敏捷资质";
				break;
			case 177://		火灵丹		魔
				s+="#e#cffffff增加坐骑法力资质";
				break;
			case 178://		培元丹		防
				s+="#e#cffffff增加坐骑耐力资质";
				break;
			case 179://		赤血丹		体
				s+="#e#cffffff增加坐骑体质资质";
				break;
			case 180://		青霜丹	
				s+="#e#cffffff增加200点宠物寿命";
				break;
			case 181://		养魂丹		灵气
				s+="#e#cffffff恢复坐骑灵气";
				break;
			case 182://		合气丹		成长
				s+="#e#cffffff增加坐骑成长";
				break;
			case 183://		地灵丹		
				s+="#e#cffffff使用后立即恢复50点体力，3小时内恢复体力速度翻倍";
				break;
			case 184://		天灵丹	
				s+="#e#cffffff使用后立即恢复人物等级*4+50体力值";
				break;

			case 191://涅盘丹
				s+="#e#c00ff00重置人物属性点";
				break;
			}
		}
		type=GmPlay.de_goods.intValue(g.iTid, -1, 34);
		if(type!=-1)
		{//烹饪
			switch(g.iTid)
			{
			case 197://艾窝窝
				s+="#e#c00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
				break;
			case 198://三丁包子
				//漫游恢复
				s+="#e#c00ff00使用后增加愤怒=15，只能在漫游中使用";
				break;
			case 199://双塔鱼
				s+="#e#c00ff00恢复自身愤怒=品质*1.2，减少自身防御=品质*1，只能在战斗中使用";
				break;
			case 200://粉蒸牛肉
				s+="#e#c00ff00增加宠物寿命=品质/2";
				break;
			case 201://赖汤圆
				s+="#e#c00ff00增加宠物寿命=品质*2，有几率被噎住降低资质";
				break;
			case 202://臭豆腐
				s+="#e#c00ff00使用后增加愤怒=15，只能在战斗中使用";
				break;
			case 203://竹简饭
				s+="#e#c00ff00使用后增加愤怒=品质*0.5，只能在战斗中使用";
				break;
			case 204://清汤鱼圆
				s+="#e#c00ff00使用后增加愤怒=品质*0.8，附加中毒状态，只能在战斗中使用";
				break;
			case 205://蛇胆酒
				s+="#e#c00ff00使用后增加愤怒=品质*1，附加疯狂状态3~4回合，只能在战斗中使用";
				break;
			case 206://烤肉
				s+="#e#c00ff00使用后增加愤怒=品质/2，只能在漫游中使用";
				break;
			}
			s+="#e#cffffff品质"+g.iAtts[0];
		}
		if((g.iAtts[7]&1)!=0)s+="#e#ca0a0a0系统绑定";
		return s;
	}
*/

