import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import IngotMall from "../../../../engtst/mgm/gameing/fast/IngotMall"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

export default class RepairEquip extends BaseClass{

	 constructor( ani)
    {//att[5]=耐久上限*10,0000+当前耐久*20
        super();
        this._costmoney=
        [[50000 ,55132 ,68678 ,89593 ,117319 ,151466 ,191736 ,237882 ,289700 ,347010 ,409655],
         [10000 ,11539 ,15603 ,21878 ,30196 ,40440 ,52521 ,66365 ,81910 ,99103 ,117897]
         ];

		this.pm3f=M3DFast.gi();
		var i,j,k;
		this.iNeedTid=new Int32Array(5);//
		this.iNeedCount=new Int32Array(5);//
		this.iHaveCount=new Int32Array(5);//
		this.materials=new Array(5);//
		this.btn_detail=new Array(5);//
		
		for(i=0;i<5;i++)this.materials[i]=null;
		this.btn_getfrom=new XButtonEx2(GmPlay.xani_button);
		this.btn_getfrom.InitButton("1号按钮150_60");
		this.btn_getfrom.sName="商城购买";
		this.showgoods=new Goods();
		for(i=0;i<5;i++)
		{
			this.btn_detail[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_detail[i].bSingleButton=true;
		}
		this.iShowDetail=-1;

		this.equips=new Array(32);
		var sortby=new Int32Array(32);
		this.iCount=0;this.iWearCount=0;
		for(i=0;i<6;i++)
		{
			if(MyGoods.gi().goods[1][i].iGid>0)
			{
				if(MyGoods.gi().goods[1][i].iAtts[0]>0)
				{
					k=GmPlay.de_goods.intValue(MyGoods.gi().goods[1][i].iTid, -1, 9)*5+100;//应该上限
					if((MyGoods.gi().goods[1][i].iAtts[5]%100000+19)/20<MyGoods.gi().goods[1][i].iAtts[5]/100000 || MyGoods.gi().goods[1][i].iAtts[5]/100000<k)
					{
						sortby[this.iCount]=(MyGoods.gi().goods[1][i].iAtts[5]%100000)*10000+MyGoods.gi().goods[1][i].iAtts[5]/100000;
						this.equips[this.iCount++]=MyGoods.gi().goods[1][i];
						this.iWearCount++;
					}
				}
			}
		}
		for(i=0;i<20;i++)
		{
			if(MyGoods.gi().goods[2][i].iGid>0)
			{//有物品
				if(MyGoods.gi().goods[2][i].iAtts[0]==0)continue;
				if(GmPlay.de_goods.intValue(MyGoods.gi().goods[2][i].iTid, 0, 16)>=0)
				{//是装备
					k=GmPlay.de_goods.intValue(MyGoods.gi().goods[2][i].iTid, -1, 9)*5+100;//应该上限
					if((MyGoods.gi().goods[2][i].iAtts[5]%100000+19)/20<MyGoods.gi().goods[2][i].iAtts[5]/100000 || MyGoods.gi().goods[2][i].iAtts[5]/100000<k)
					{//耐久不足
						sortby[this.iCount]=(MyGoods.gi().goods[2][i].iAtts[5]%100000)*10000+MyGoods.gi().goods[2][i].iAtts[5]/100000;
						this.equips[this.iCount++]=MyGoods.gi().goods[2][i];
					}
				}
			}
		}
		var tg;
		for(i=0;i<this.iWearCount;i++)
		{
			for(j=i+1;j<this.iWearCount;j++)
			{
				if(sortby[j]<sortby[i])
				{
					k=sortby[j];
					sortby[j]=sortby[i];
					sortby[i]=k;
					tg=this.equips[j];
					this.equips[j]=this.equips[i];
					this.equips[i]=tg;
				}
			}
		}
		for(i=this.iWearCount;i<this.iCount;i++)
		{
			for(j=i+1;j<this.iCount;j++)
			{
				if(sortby[j]<sortby[i])
				{
					k=sortby[j];
					sortby[j]=sortby[i];
					sortby[i]=k;
					tg=this.equips[j];
					this.equips[j]=this.equips[i];
					this.equips[i]=tg;
				}
			}
		}
		if(this.iCount>0)this.iPoint=0;
		else this.iPoint=-1;
		
		this.iW=1030;
		this.iH=580;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_equips=new Array(this.iCount);//
		for(i=0;i<this.iCount;i++)
		{
			this.btn_equips[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_equips[i].InitButton("11号按钮250_102");
		}
		this.btn_repairtype=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_repairtype[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_repairtype[i].InitButton("1号按钮150_60");
		}
		this.btn_repairtype[0].sName="普通修理";
		this.btn_repairtype[1].sName="特殊修理";
		this.btn_repairtype[2].sName="装备修复";
		
		this.btn_repair=new XButtonEx2(GmPlay.xani_button);
		this.btn_repair.InitButton("1号按钮150_60");
		this.btn_repair.sName="修理";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.iOffY1=0;
		this.bLocked1=false;
		
		this.iOffY2=0;
		this.bLocked2=false;
	}

	_open( gid, type)
	{
		if(type>=0 && type<=2)this.iRepairType=type;
		else this.iRepairType=-1;
		
		this.LockGoods();
	}
	
	
	 Draw()
	{
		var i,j,k;
		var offx,offy;
		var tx=0,ty=0,tw;
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW, this.iH, "装", "备","修","理");
		this.btn_close.Draw();
		DrawMode.new_framein(this.iX+25, this.iY+25, 250+40, this.iH-50);
		
		
		
		if(!this.bLocked1)
		{
			if(this.iOffY1>0)this.iOffY1/=2;
			if(this.iOffY1<0)
			{
				if(this.iDestH1<this.iY+this.iH-45)
				{
					i=this.iY+this.iH-45-this.iDestH1;
					this.iOffY1+=i/2;
				}
			}
		}
		
		if(!this.bLocked2)
		{
			if(this.iOffY2>0)this.iOffY2/=2;
			if(this.iOffY2<0)
			{
				if(this.iDestH2<220-20)
				{
					i=220-20-this.iDestH2;
					this.iOffY2+=i/2;
				}
			}
		}
		
		offx=this.iX+25+20;
		offy=this.iY+25+20+this.iOffY1;
//		offw=250;
//		offh=this.iH-50-40;
		this.pm3f.SetViewClip(this.iX+25+20, this.iY+25+20, this.iX+25+20+250, this.iY+this.iH-25-20);
		for(i=0;i<this.iCount;i++)
		{
			this.btn_equips[i].Move(offx,offy,250, 102);
			if(i==this.iPoint)this.btn_equips[i].setdown();
			this.btn_equips[i].Draw();
			
			GmPlay.xani_nui3.DrawAnima(offx+11, offy+11, "物品格子",0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+11, offy+11, GmPlay.de_goods.strValue(this.equips[i].iTid, 0, 10),0);
			if(i<this.iWearCount)
			{//已穿戴
				GmPlay.xani_other.DrawAnima(offx+11+80, offy+11, "已装备标签",0);
			}
			k=Math.floor(this.equips[i].iAtts[5]/100000);
			j=Math.floor((this.equips[i].iAtts[5]%100000)/20);
			if(j==0)GmPlay.xani_other.DrawAnima(offx+11, offy+11+80, "耐久度过低",1);
			else if(j<50)GmPlay.xani_other.DrawAnima(offx+11, offy+11+80, "耐久度过低",0);
			
//			M3DFast.gi().DrawText_2(dx, dy, s, c, size, ab, sw, sh, ra, ratx, raty, type, c2)
			M3DFast.gi().DrawText_2(offx+11+80+10,offy+11+5,GmPlay.de_goods.strValue(this.equips[i].iTid, 0, 4),0xfffeec7e,30,101,1,1,0,0,0,3,0xff01152e);
			
			M3DFast.gi().DrawTextEx(offx+11+80+10, offy+11+80-5, "耐久度"+j+"/"+k, 0xfffeec7e, 20, 101, 1, 1, 0, 0, -3);
			offy+=105;
		}
		this.iDestH1=offy;
		this.pm3f.NoClip();
		
		DrawMode.new_framein(this.iX+25+250+40+20, this.iY+25, 670, this.iH-50);
		
		offx=this.iX+25+250+40+20+20;
		offy=this.iY+25+20;
		DrawMode.frame_type4("2号框20_20", offx, offy, 220, 220, 20, 20);
		DrawMode.frame_type4("2号框20_20", offx+220+20, offy, 220, 220, 20, 20);
		
		for(i=0;i<3;i++)
		{
			this.btn_repairtype[i].Move(offx+220+20+220+20, offy+i*80, 150, 60);
			if(i==this.iRepairType)this.btn_repairtype[i].setdown();
			this.btn_repairtype[i].Draw();
		}
		if(this.iPoint>=0 && this.iPoint<this.iCount)
		{
			i=this.iPoint;
			GmPlay.xani_nui3.DrawAnima(offx+70, offy+70, "物品格子",0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+70, offy+70, GmPlay.de_goods.strValue(this.equips[i].iTid, 0, 10),0);
			if(i<this.iWearCount)
			{//已穿戴
				GmPlay.xani_other.DrawAnima(offx+70+80, offy+70, "已装备标签",0);
			}
			M3DFast.gi().DrawText_2(offx+70+40,offy+70+80+10,GmPlay.de_goods.strValue(this.equips[i].iTid, 0, 4),0xfffeec7e,30,101,1,1,0,-2,0,3,0xff01152e);
			
			this.DrawAtts(offx+220+20+10,offy+10,this.equips[i]);
			
			if(this.iRepairType>=0)DrawMode.frame_type4("2号框20_20", offx, offy+220+20, 220+20+220+20+150, 160, 20, 20);
			tx=offx;
			ty=offy+220+20;
			tw=220+20+220+20+150;
//			th=160;
			
			this.iELev=GmPlay.de_goods.intValue(this.equips[i].iTid, 0, 9);
			this.iLimitNJ=100+this.iELev*5;
			this.iMaxNJ=this.equips[i].iAtts[5]/100000;
			this.iCurNJ=(this.equips[i].iAtts[5]%100000)/20;
			this.iEType=GmPlay.de_goods.intValue(this.equips[i].iTid, 0, 16);
			
			tx=tx+tw/2;
			
			if(this.iRepairType==0)
			{//普通修理
				this.iNeedMoney=this._costmoney[this.iRepairType][this.iELev/10];
				
				this.btn_detail[0].Move(tx-40, ty+5,80,80);
				GmPlay.xani_nui3.DrawAnima(tx-40, ty+5, "物品格子",0);
				GmPlay.xani_ngoods.DrawAnima_aa(tx-40, ty+5, GmPlay.de_goods.strValue(this.iNeedTid[0], 0, 10),0);
				if(this.materials[0]==null)this.pm3f.DrawText_2(tx, ty+5+80+5, "0/1", 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				else this.pm3f.DrawText_2(tx, ty+5+80+5, "1/1", 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				this.pm3f.DrawText_2(tx, ty+5+80+5+20, (this.materials[0]==null?this.iELev:this.materials[0].iAtts[0])+"级"+GmPlay.de_goods.strValue(this.iNeedTid[0], 0, 4), 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				this.pm3f.DrawTextEx(tx, ty+5+80+10+20+20, "普通修理会消耗耐久上限，耐久上限低于20%无法普通修理", 0xffffffff, 18, 101, 1, 1, 0, -2, 0);
				
				if(this.iNeedMoney>GmMe.me.rbs.iMoney)this.btn_repair.bDisable=true;//铜币不够
				else if(this.materials[0]==null)this.btn_repair.bDisable=true;//缺少材料
				else if(this.iMaxNJ<this.iLimitNJ/5)this.btn_repair.bDisable=true;//耐久上限低于20%
				else this.btn_repair.bDisable=false;
			}
			else if(this.iRepairType==1)
			{//特殊修理
				this.iNeedMoney=this._costmoney[this.iRepairType][this.iELev/10];
				
				this.btn_detail[0].Move(tx-50-80, ty+5,80,80);
				GmPlay.xani_nui3.DrawAnima(tx-50-80, ty+5, "物品格子",0);
				GmPlay.xani_ngoods.DrawAnima_aa(tx-50-80, ty+5, GmPlay.de_goods.strValue(this.iNeedTid[0], 0, 10),0);
				if(this.materials[0]==null)this.pm3f.DrawText_2(tx-50-40, ty+5+80+5, "0/1", 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				else this.pm3f.DrawText_2(tx-50-40, ty+5+80+5, "1/1", 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				this.pm3f.DrawText_2(tx-50-40, ty+5+80+5+20, (this.materials[0]==null?this.iELev:this.materials[0].iAtts[0])+"级"+GmPlay.de_goods.strValue(this.iNeedTid[0], 0, 4), 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				
				this.btn_detail[1].Move(tx+50, ty+5,80,80);
				GmPlay.xani_nui3.DrawAnima(tx+50, ty+5, "物品格子",0);
				GmPlay.xani_ngoods.DrawAnima_aa(tx+50, ty+5, GmPlay.de_goods.strValue(this.iNeedTid[1], 0, 10),0);
				this.pm3f.DrawText_2(tx+50+40, ty+5+80+5, this.iHaveCount[1]+"/"+this.iNeedCount[1], 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				this.pm3f.DrawText_2(tx+50+40, ty+5+80+5+20, GmPlay.de_goods.strValue(this.iNeedTid[1], 0, 4), 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);

				this.pm3f.DrawTextEx(tx, ty+5+80+10+20+20, "特殊修理恢复100点耐久，不会损耗耐久上限", 0xffffffff, 18, 101, 1, 1, 0, -2, 0);
				
				if(this.iNeedMoney>GmMe.me.rbs.iMoney)this.btn_repair.bDisable=true;//铜币不够
				else if(this.materials[0]==null)this.btn_repair.bDisable=true;//缺少材料
				else if(this.iHaveCount[1]<this.iNeedCount[1])this.btn_repair.bDisable=true;//缺少洛池水
				else this.btn_repair.bDisable=false;
			}
			else if(this.iRepairType==2)
			{//装备修复
				this.iNeedMoney=0;
				
				this.btn_detail[0].Move(tx-40, ty+5,80,80);
				GmPlay.xani_nui3.DrawAnima(tx-40, ty+5, "物品格子",0);
				GmPlay.xani_ngoods.DrawAnima_aa(tx-40, ty+5, GmPlay.de_goods.strValue(this.iNeedTid[0], 0, 10),0);
				this.pm3f.DrawText_2(tx, ty+5+80+5, this.iHaveCount[0]+"/"+this.iNeedCount[0], 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				this.pm3f.DrawText_2(tx, ty+5+80+5+20, GmPlay.de_goods.strValue(this.iNeedTid[0], 0, 4), 0xfffeec7e, 20, 101, 1, 1, 0, -2, 0, 3, 0xff01152e);
				this.pm3f.DrawTextEx(tx, ty+5+80+10+20+20, "装备修复可以完全修复装备耐久和耐久上限", 0xffffffff, 18, 101, 1, 1, 0, -2, 0);
				
				if(this.iHaveCount[0]<this.iNeedCount[0])this.btn_repair.bDisable=true;//耐久上限低于20%
				else this.btn_repair.bDisable=false;
			}
			else this.btn_repair.bDisable=true;
			
			DrawMode.ui3_Text1(offx, offy+220+20+160+20, 100, 220, "需要铜币", ""+(this.iRepairType<0?"":this.iNeedMoney));
			DrawMode.ui3_Text1(offx, offy+220+20+160+20+40, 100, 220, "拥有铜币", ""+GmMe.me.rbs.iMoney);
			
			this.btn_repair.Move(this.iX+this.iW-25-20-150, this.iY+this.iH-25-20-60, 150, 60);

			this.btn_repair.Draw();
			
			this.LockGoods();
		}
		
		if(this.iShowDetail>=0)
		{
			if(this.iRepairType==0)
			{
				this.showgoods.SetAtt(1, this.iNeedTid[0], 1, this.iELev, 0, 0, 0, 0, 0, 0, 0);
				
				if(this.materials[0]==null)
				{
					GoodsDraw.detail_add="#e#cc8bfe7获取途径：1生活技能  2手艺任务";
					GoodsDraw.new_DrawDetail(this.showgoods, this.btn_detail[0].iX, this.btn_detail[0].iY, 0);
					GoodsDraw.detail_add="";
				}
				else GoodsDraw.new_DrawDetail(this.materials[0], this.btn_detail[0].iX, this.btn_detail[0].iY, 0);
			}
			else if(this.iRepairType==1)
			{
				if(this.iShowDetail==0)
				{
					this.showgoods.SetAtt(1, this.iNeedTid[0], 1, this.iELev, 0, 0, 0, 0, 0, 0, 0);
					
					if(this.materials[0]==null)
					{
						GoodsDraw.detail_add="#e#cc8bfe7获取途径：1生活技能  2手艺任务";
						GoodsDraw.new_DrawDetail(this.showgoods, this.btn_detail[0].iX, this.btn_detail[0].iY, 0);
						GoodsDraw.detail_add="";
					}
					else GoodsDraw.new_DrawDetail(this.materials[0], this.btn_detail[0].iX, this.btn_detail[0].iY, 0);
				}
				else if(this.iShowDetail==1)
				{
					this.showgoods.SetAtt(1, this.iNeedTid[1], 1, 0, 0, 0, 0, 0, 0, 0, 0);
					
					if(this.materials[1]==null || this.iHaveCount[1]<this.iNeedCount[1])
					{
						GoodsDraw.detail_add="#e#cc8bfe7获取途径：";
						GoodsDraw.new_DrawDetail(this.showgoods, this.btn_detail[1].iX, this.btn_detail[1].iY, 60+20);
						GoodsDraw.detail_add="";
						this.btn_getfrom.Move(GoodsDraw.iDetailX+GoodsDraw.iDetailW/2-150/2, GoodsDraw.iDetailY+GoodsDraw.iDetailH-60-20, 150, 60);
						this.btn_getfrom.Draw();
					}
					else GoodsDraw.new_DrawDetail(this.materials[1], this.btn_detail[1].iX, this.btn_detail[1].iY, 0);
				}
			}
			else if(this.iRepairType==2)
			{
				this.showgoods.SetAtt(1, this.iNeedTid[0], 1, 0, 0, 0, 0, 0, 0, 0, 0);
				
				if(this.materials[0]==null || this.iHaveCount[0]<this.iNeedCount[0])
				{
					GoodsDraw.detail_add="#e#cc8bfe7获取途径：";
					GoodsDraw.new_DrawDetail(this.showgoods, this.btn_detail[0].iX, this.btn_detail[0].iY, 60+20);
					GoodsDraw.detail_add="";
					this.btn_getfrom.Move(GoodsDraw.iDetailX+GoodsDraw.iDetailW/2-150/2, GoodsDraw.iDetailY+GoodsDraw.iDetailH-60-20, 150, 60);
					this.btn_getfrom.Draw();
				}
				else GoodsDraw.new_DrawDetail(this.materials[0], this.btn_detail[0].iX, this.btn_detail[0].iY, 0);
			}
		}
	}
	DrawAtts( x, y, g)
	{
		this.iDAX=x;
		this.iDAY=y;
		var i,j,m,n;
		var s="基本属性";
		var sLev="等级："+GmPlay.de_goods.strValue(g.iTid, -1, 9);
		var add1,add2;
		var bs_base=[8,12,40,8,6];//攻，防，血，速，灵
		var bs_add=[0,0,0,0,0];
		add1 = Math.floor(g.iAtts[0]/10000);//基本属性加成
		add2 = g.iAtts[0]%10000;
		i = Math.floor(g.iAtts[2]/10000);//宝石1加成
		if(i>0) bs_add[Math.floor(i/1000)] = bs_base[Math.floor(i/1000)]*(i%1000);
		i = g.iAtts[2]%10000;//宝石2加成

		if(i > 0) bs_add[Math.floor(i/1000)] = bs_base[Math.floor(i/1000)]*(i%1000);
		
		var type=GmPlay.de_goods.intValue(g.iTid, -1, 16);
		var sType="";
		switch(type)
		{
		case 0:
			sType="类型：头盔";
			s+="#e# #cffff00防御 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
			s+="#e# #cffff00魔法 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 22)+add2);
			bs_add[1]=0;
			break;
		case 1://饰品
			sType="类型：饰品";
			s+="#e# #cffff00灵力 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 23)+add2+bs_add[4]);
			bs_add[4]=0;
			break;
		case 2://武器
			j=GmPlay.de_goods.intValue(g.iTid, -1, 19);
			if(j==0)sType="类型：武器(剑)";
			else if(j==1)sType="类型：武器(刀)";
			else sType="类型：武器(枪)";
//			sType="类型：武器";
			s+="#e# #cffff00伤害 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 3)+add2+bs_add[0]);
			bs_add[0]=0;
			break;
		case 3://铠甲
			j=GmPlay.de_goods.intValue(g.iTid, -1, 20);
			if(j==0)sType="类型：女衣";
			else sType="类型：铠甲";
			s+="#e# #cffff00防御 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add2+bs_add[1]);
			bs_add[1]=0;
			break;
		case 4://腰带
			sType="类型：腰带";
			s+="#e# #cffff00防御 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
			s+="#e# #cffff00气血 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 24)+add2+bs_add[2]);
			bs_add[1]=0;
			bs_add[2]=0;
			break;
		case 5://鞋子
			sType="类型：鞋子";
			s+="#e# #cffff00防御 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 21)+add1+bs_add[1]);
			s+="#e# #cffff00速度 +"+Math.floor(GmPlay.de_goods.intValue(g.iTid, -1, 25)+add2+bs_add[3]);
			bs_add[1]=0;
			bs_add[3]=0;
			break;
		}

		if(bs_add[0]>0)s+="#e# 伤害 +"+bs_add[0];
		if(bs_add[1]>0)s+="#e# 防御 +"+bs_add[1];
		if(bs_add[2]>0)s+="#e# 气血 +"+bs_add[2];
		if(bs_add[3]>0)s+="#e# 速度 +"+bs_add[3];
		if(bs_add[4]>0)s+="#e# 灵力 +"+bs_add[4];

		add1 = Math.floor(g.iAtts[1]/10000);
		add2 = g.iAtts[1]%10000;

		if(add1>0)
		{
			const add = Math.floor(add1/1000);
			if(add==0)s+="#e# #c00ff00体质 +"+add1%1000;
			else if(add==1)s+="#e# #c00ff00法力 +"+add1%1000;
			else if(add==2)s+="#e# #c00ff00力量 +"+add1%1000;
			else if(add==3)s+="#e# #c00ff00耐力 +"+add1%1000;
			else if(add==4)s+="#e# #c00ff00敏捷 +"+add1%1000;
		}
		if(add2>0)
		{
			const add = Math.floor(add2/1000);
			if(add1<=0)s+="#e# #c00ff00";
			else s+=" ";
			if(add==0)s+="体质 +"+add2%1000;
			else if(add==1)s+="法力 +"+add2%1000;
			else if(add==2)s+="力量 +"+add2%1000;
			else if(add==3)s+="耐力 +"+add2%1000;
			else if(add==4)s+="敏捷 +"+add2%1000;
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
		s+="#e# #cffffff耐久度 : "+Math.floor((g.iAtts[5]%100000+19)/20)+"/"+Math.floor(g.iAtts[5]/100000);

		m= Math.floor(g.iAtts[2]/10000);
		n=g.iAtts[2]%10000;
		if(m>0 || n>0)
		{//
			s+="#e #cb48cc8镶嵌等级 : "+(m%1000+n%1000);
			s+="#e# 已镶嵌 : ";
			if(m>0)s+=GmPlay.de_goods.strValue(Math.floor(m/1000)+101, 0, 4);
			if(n>0)s+=","+GmPlay.de_goods.strValue(Math.floor(n/1000)+101, 0, 4);
		}
		g.CalcSetScore();
		if(g.iScore>0)s+="#e# #cffffff评分："+g.iScore;

		i= Math.floor(g.iAtts[3]/10000);//强化等级
//		if(i>0)sName+=" +"+i;
		var tt=sType+"#e"+sLev+"#e"+s;
//		GmPlay.sop(tt);
		this.pm3f.SetViewClip(x,y,x+200,y+200);
		this.pm3f.DrawText_2(x, y+this.iOffY2, "装备属性", 0xfffeec7e, 24, 101, 1, 1, 0, 0, 0, 3, 0xff01152e);
		FormatString.gi().FormatEx(tt, 200, 20, 0, 0, 22);
		FormatString.gi().Draw(x, y+this.iOffY2+26);
		this.iDestH2=FormatString.gi().iH+this.iOffY2+26;
		this.pm3f.NoClip();
	}
	 ProcTouch( msg, x, y)
	{
		if(this.iShowDetail>=0)
		{
			if((this.iRepairType==1 && this.iShowDetail==1) || this.iRepairType==2)
			{
				if(this.btn_getfrom.ProcTouch(msg, x, y))
				{
					if(this.btn_getfrom.bCheck())
					{
						GmProtocol.gi().s_IngotMall(1, 0);
						this.btn_getfrom.SetNormal();
					}
				}
			}
			if(msg==3)this.iShowDetail=-1;
			return true;
		}
		var i,j;
		if(msg==3)
		{
			if(this.bLocked1)
			{
				this.bLocked1=false;
				return true;
			}
			if(this.bLocked2)
			{
				this.bLocked2=false;
				return true;
			}
		}
		if(msg==2)
		{
			if(this.bLocked1)
			{
				i=this.iLockY1-y;
				this.iOffY1-=i;
				this.iLockY1=y;
				return true;
			}
			if(this.bLocked2)
			{
				i=this.iLockY2-y;
				this.iOffY2-=i;
				this.iLockY2=y;
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
		
		for(i=0;i<this.iCount;i++)
		{
			if(this.btn_equips[i].ProcTouch(msg, x, y))
			{
				if(this.btn_equips[i].bCheck())
				{
					this.iPoint=i;
					for(j=0;j<5;j++)this.materials[j]=null;
					this.LockGoods();//锁定背包中物品
				}
			}
		}
		for(i=0;i<3;i++)
		{
			if(this.btn_repairtype[i].ProcTouch(msg, x, y))
			{
				if(this.btn_repairtype[i].bCheck())
				{
					this.iRepairType=i;
					for(j=0;j<5;j++)this.materials[j]=null;
					this.LockGoods();//锁定背包中物品
				}
			}
		}

		if(this.btn_detail[0].ProcTouch(msg,x,y))
		{
			if(this.btn_detail[0].bCheck())
			{
				this.iShowDetail=0;
			}
		}
		if(this.iRepairType==1)
		{
			if(this.btn_detail[1].ProcTouch(msg,x,y))
			{
				if(this.btn_detail[1].bCheck())
				{
					this.iShowDetail=1;
				}
			}
		}

		if(this.btn_repair.ProcTouch(msg, x, y))
		{
			if(this.btn_repair.bCheck())
			{
				GmProtocol.gi().s_UseSkill(11, this.equips[this.iPoint].iGid, this.iRepairType, 0, 0, 0, 0);
//				XStat.gi().PopStat(1);
			}
		}
		if(XDefine.bInRect(x, y, this.iX+25, this.iY+25, 250+40, this.iH-50))
		{
			if(msg==1)this.iLockY1=y;
			if(msg==2)
			{
				if(!this.bLocked1)
				{
					i=this.iLockY1-y;
					if(i<-15 || i>15)
					{//取消按键按下状态
						this.bLocked1=true;
						for(i=0;i<this.iCount;i++)
						{
							this.btn_equips[i].SetNormal();
						}
					}
				}
			}
		}
		if(XDefine.bInRect(x, y, this.iDAX, this.iDAY,220, 220))
		{
			if(msg==1)this.iLockY2=y;
			if(msg==2)
			{
				if(!this.bLocked2)
				{
					i=this.iLockY2-y;
					if(i<-15 || i>15)
					{//取消按键按下状态
						this.bLocked2=true;
					}
				}
			}
		}
		return false;
	}
	
	 LockGoods()
	{
		var i;
		for(i=0;i<5;i++)this.materials[i]=null;
		i=this.iPoint;
		var type=this.iRepairType;
		if(i<0)return;
		this.iELev=GmPlay.de_goods.intValue(this.equips[i].iTid, 0, 9);
		this.iLimitNJ=100+this.iELev*5;
		this.iMaxNJ=this.equips[i].iAtts[5]/100000;
		this.iCurNJ=(this.equips[i].iAtts[5]%100000)/20;
		this.iEType=GmPlay.de_goods.intValue(this.equips[i].iTid, 0, 16);
	
		if(type==0)
		{//普通，需要手艺
			this.iNeedCount[0]=1;
			if(this.iEType==0 || this.iEType==4)this.iNeedTid[0]=98;
			else if(this.iEType==1 || this.iEType==2)this.iNeedTid[0]=99;
			else if(this.iEType==3 || this.iEType==5)this.iNeedTid[0]=100;

			for(i=0;i<20;i++)
			{
				if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==this.iNeedTid[0] && MyGoods.gi().goods[2][i].iAtts[0]>=this.iELev)
				{
					if(this.materials[0]==null)this.materials[0]=MyGoods.gi().goods[2][i];
					else if(this.materials[0].iAtts[0]>MyGoods.gi().goods[2][i].iAtts[0])this.materials[0]=MyGoods.gi().goods[2][i];
					else if(this.materials[0].iAtts[1]>MyGoods.gi().goods[2][i].iAtts[1])this.materials[0]=MyGoods.gi().goods[2][i];
				}
			}
		}
		else if(type==1)
		{//洛池水特殊修理
			this.iNeedCount[0]=1;
			if(this.iEType==0 || this.iEType==4)this.iNeedTid[0]=98;
			else if(this.iEType==1 || this.iEType==2)this.iNeedTid[0]=99;
			else if(this.iEType==3 || this.iEType==5)this.iNeedTid[0]=100;
			for(i=0;i<20;i++)
			{
				if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==this.iNeedTid[0] && MyGoods.gi().goods[2][i].iAtts[0]>=this.iELev)
				{
					if(this.materials[0]==null)this.materials[0]=MyGoods.gi().goods[2][i];
					else if(this.materials[0].iAtts[0]>MyGoods.gi().goods[2][i].iAtts[0])this.materials[0]=MyGoods.gi().goods[2][i];
					else if(this.materials[0].iAtts[1]>MyGoods.gi().goods[2][i].iAtts[1])this.materials[0]=MyGoods.gi().goods[2][i];
				}
			}
			
			this.iNeedTid[1]=399;
			if(this.iELev<=40)this.iNeedCount[1]=1;
			else if(this.iELev<=60)this.iNeedCount[1]=2;
			else if(this.iELev<=80)this.iNeedCount[1]=3;
			else this.iNeedCount[1]=4;
			this.iHaveCount[1]=0;
			for(i=0;i<20;i++)
			{
				if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==this.iNeedTid[1])
				{
					if(this.materials[1]==null)this.materials[1]=MyGoods.gi().goods[2][i];
					this.iHaveCount[1]+=MyGoods.gi().goods[2][i].iCount;
				}
			}
			if(this.iHaveCount[1]>this.iNeedCount[1])this.iHaveCount[1]=this.iNeedCount[1];
		}
		else if(type==2)
		{//需要1个
			this.iNeedTid[0]=400;
			if(this.iELev<=40)this.iNeedCount[0]=3;
			else if(this.iELev<=60)this.iNeedCount[0]=4;
			else if(this.iELev<=80)this.iNeedCount[0]=5;
			else this.iNeedCount[0]=6;
			this.iHaveCount[0]=0;
			for(i=0;i<20;i++)
			{
				if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==this.iNeedTid[0])
				{
					if(this.materials[0]==null)this.materials[0]=MyGoods.gi().goods[2][i];
					this.iHaveCount[0]+=MyGoods.gi().goods[2][i].iCount;
				}
			}
			if(this.iHaveCount[0]>this.iNeedCount[0])this.iHaveCount[0]=this.iNeedCount[0];
		}
	}
}
RepairEquip.Open=function( gid, type)
{
    var re;
    if(XStat.gi().iXStat==XStat.GS_REPAIREQUIP)
    {
        re=XStat.gi().oCurrentView;
    }
    else
    {
        re=XStat.gi().PushStat(XStat.GS_REPAIREQUIP);
    }
    re._open(gid, type);
    
    if (re.iCount <= 0)
    {
        FrameMessage.fm.Open("当前没有可修理的装备，只有有附加属性或者经过强化的装备才能修理。");
        XStat.gi().PopStat(1);
    }
}