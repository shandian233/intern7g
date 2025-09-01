
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"


export default class MakeEquip extends BaseClass{
	
	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=M3DFast.gi();
		
		MakeEquip.iW=30+420+430+40+30;
		MakeEquip.iH=345+40+60+30;
		MakeEquip.iX=(GmConfig.SCRW-MakeEquip.iW)/2;
		MakeEquip.iY=(GmConfig.SCRH-MakeEquip.iH)/2;
		
		this.btn_close=new XButton(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(MakeEquip.iX+MakeEquip.iW-35, MakeEquip.iY-25, 60, 60);
		
		this.btn_goods=new Array(8);//
		this.gmake=new Array(8);//
		this.igsub=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_goods[i]=new XButton(GmPlay.xani_ui);
			this.btn_goods[i].InitButton("物品格");
			
			this.gmake[i]=null;
			this.igsub[i]=1;
		}
		//(MakeEquip.iX+10,MakeEquip.iY+65,360,MakeEquip.iH-75)
		this.btn_goods[0].Move(MakeEquip.iX+5+60, MakeEquip.iY+80, 80, 80);//图纸
		this.btn_goods[1].Move(MakeEquip.iX+5+60+(80+45), MakeEquip.iY+80, 80, 80);//手艺
		this.btn_goods[2].Move(MakeEquip.iX+5+60+(80+45)*2, MakeEquip.iY+80, 80, 80);//幸运符
		
		this.btn_goods[3].Move(MakeEquip.iX+5+60, MakeEquip.iY+180, 80, 80);//图纸
		this.btn_goods[4].Move(MakeEquip.iX+5+60+(80+45), MakeEquip.iY+180, 80, 80);//手艺
		this.btn_goods[5].Move(MakeEquip.iX+5+60+(80+45)*2, MakeEquip.iY+180, 80, 80);//幸运符
		
		this.btn_make=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_make.InitButton("按钮1_110");
		this.btn_make.sName="制造";
		this.btn_make.Move(MakeEquip.iX+260, MakeEquip.iY+MakeEquip.iH-50-40, 70, 40);
	}

	Draw()
	{
		var i,offx,offy;
		DrawMode.new_baseframe2(MakeEquip.iX, MakeEquip.iY, MakeEquip.iW, MakeEquip.iH, "打", "造");
		this.btn_close.Draw();
		GmPlay.xani_nui3.DrawAnima(MakeEquip.iX+230, MakeEquip.iY+200, "炼丹炉背景",0);
		offx=MakeEquip.iX+MakeEquip.iW-30-430-40;
		offy=MakeEquip.iY+30;
		DrawMode.new_framein(offx,offy, 430+40, MakeEquip.iH-60);
		
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "双击选择装备制造图纸：", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		MakeEquip.iGx=offx+20;
		MakeEquip.iGy=offy+20+30;
		GoodsDraw.new_DrawGoods(MakeEquip.iGx,MakeEquip.iGy, MyGoods.gi().goods[2], this.gmake,this.igsub);
		if(this.lockgoods!=null)GoodsDraw.new_DrawRect(MakeEquip.iGx,MakeEquip.iGy, MyGoods.gi().goods[2], this.lockgoods, 0);
		
		for(i=0;i<6;i++)
		{
			GmPlay.xani_nui3.DrawAnima(this.btn_goods[i].iX,this.btn_goods[i].iY, "物品格子",0);
//			GmPlay.xani_nui3.DrawAnimaEx(this.btn_goods[i].iX,this.btn_goods[i].iY, "物品选中框", 0, 101, 1, 1, 0, 0, 0);
//			this.btn_goods[i].Draw();
			if(this.gmake[i]!=null)
			{
				GoodsDraw.new_DrawOneGoods_ext(this.btn_goods[i].iX, this.btn_goods[i].iY, this.gmake[i], 1);
			}
		}
		offy=MakeEquip.iY+MakeEquip.iH-30-160;
		DrawMode.new_framein(MakeEquip.iX+30, offy, 400, 160);
		var s="#c003e57"+this.Check();
		FormatString.gi().FormatEx(s, 360, 25, 0, 0, 30);
		FormatString.gi().Draw(MakeEquip.iX+30+20, offy+20);
//		this.pm3f.DrawTextEx(MakeEquip.iX+30+10, MakeEquip.iY+300+10, , 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		if(MakeEquip.bCanMake)
		{
			this.btn_make.Move(MakeEquip.iX+30+400-20-110, offy+160-20-52, 110, 52);
			this.btn_make.Draw();
		}
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	
	Check()
	{
		var i,j,k,m;
		var type,lev;
		var ret="#c003e57";
		MakeEquip.bCanMake=false;
		if(this.gmake[0]==null)
		{
			return "请先放入装备制造图纸";
		}
		//有图纸，检查手艺，和所需材料
		type=GmPlay.de_goods.intValue(this.gmake[0].iAtts[0], -1, 16);//装备类型
		lev=GmPlay.de_goods.intValue(this.gmake[0].iAtts[0], -1, 9);//装备等级
		if(type==-1 || lev==-1)return "数据错误1";
		if(this.gmake[1]!=null && this.gmake[1].iTid==382);
		else
		{
			if(type==0 || type==4)
			{//需要锻造手艺
				if(this.gmake[1]==null || this.gmake[1].iTid!=98)return "需要放入锻造手艺";
				if(this.gmake[1].iAtts[0]<lev)return "锻造手艺等级不够";
			}
			else if(type==1 || type==2)
			{//需要锻造手艺
				if(this.gmake[1]==null || this.gmake[1].iTid!=99)return "需要放入冶金手艺";
				if(this.gmake[1].iAtts[0]<lev)return "冶金手艺等级不够";
			}
			else if(type==3 || type==5)
			{//需要锻造手艺
				if(this.gmake[1]==null || this.gmake[1].iTid!=100)return "需要放入剪裁手艺";
				if(this.gmake[1].iAtts[0]<lev)return "剪裁手艺等级不够";
			}
			else return "数据错误2";
		}
		//检查所需材料
		m=0;
		for(i=1;i<4;i++)
		{//材料1,2,3
			j=this.gmake[0].iAtts[i];
			if(j<=0)break;
			//检测列表中是否有材料j
			for(k=3;k<6;k++)
			{
				if(this.gmake[k]==null)continue;
				if(this.gmake[k].iTid==j)
				{
					break;
				}
			}
			if(k>=6)
			{
				ret=ret+"需要放入材料："+GmPlay.de_goods.strValue(j, -1, 4)+"#e";
				m++;
			}
		}
		if(m>0)return ret;
		if(this.gmake[2]!=null)ret="#e至少获得一项附加属性";
		else ret="#e#cff0000放入幸运符可附加属性";
		MakeEquip.bCanMake=true;
		return "#c00ff00材料齐备"+ret;
	}
	 ProcTouch( msg, x, y)
	{
		var i,j,k,m;
		if(MakeEquip.bCanMake)
		{
			if(this.btn_make.ProcTouch(msg, x, y))
			{
				if(this.btn_make.bCheck())
				{
					var ids=[0,0,0,0,0,0,0,0];
					for(i=0;i<8;i++)
					{
						if(this.gmake[i]!=null)
						{
							ids[i]=this.gmake[i].iGid;
							j=GmPlay.de_goods.intValue(this.gmake[i].iTid, 0, 28);
							if(j>1)
							{
								this.gmake[i].iCount--;
								if(this.gmake[i].iCount<=0)this.gmake[i].iGid=-1;
							}
							else this.gmake[i].iGid=-1;
							this.gmake[i]=null;
						}
					}
					GmProtocol.gi().s_UseSkill(4, ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]);
				}
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

		this.lockgoods=GoodsDraw.new_LockGoods(x,y,MakeEquip.iGx,MakeEquip.iGy, MyGoods.gi().goods[2],msg);
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{//点击物品，判断类型，放入格子(制造书，材料，幸运符，手艺)
			var type;
			if(this.lockgoods.iTid==97)
			{
				this.gmake[0]=this.lockgoods;//图纸
				//判断是什么类型图纸，需要什么手艺,,0帽子，1项链，2武器，3衣服，4腰带，5鞋子
				i=GmPlay.de_goods.intValue(this.lockgoods.iAtts[0], 0, 16);
				if(i==2 || i==1)j=99;//冶金
				else if(i==3 || i==5)j=100;//剪裁
				else if(i==0 || i==4)j=98;//锻造
				else j=-1;
				for(k=0;k<20;k++)
				{
					if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==j)
					{
						this.gmake[1]=MyGoods.gi().goods[2][k];
						break;
					}
				}
				for(k=0;k<20;k++)
				{//放入幸运符
					if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==108)
					{
						this.gmake[2]=MyGoods.gi().goods[2][k];
						break;
					}
				}
				m=3;
				for(i=1;i<4;i++)
				{
					j=this.lockgoods.iAtts[i];
					if(j>0)
					{//材料id，从背包中搜索直接放入
						for(k=0;k<20;k++)
						{
							if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==j)
							{//直接放入格子
								this.gmake[m++]=MyGoods.gi().goods[2][k];
								break;
							}
						}
					}
				}
			}
			if(this.lockgoods.iTid==98 ||
				this.lockgoods.iTid==99 ||
				this.lockgoods.iTid==100 ||
				this.lockgoods.iTid==382)this.gmake[1]=this.lockgoods;//手艺
			if(this.lockgoods.iTid==108)this.gmake[2]=this.lockgoods;//幸运符

			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 31);
			if(type!=-1)
			{//是草药，放入空闲的this.gmake里面
				for(i=3;i<6;i++)
				{
					if(this.gmake[i]==null)
					{
						this.gmake[i]=this.lockgoods;
						break;
					}
				}
			}
			this.lockgoods=null;
		}
		for(i=0;i<6;i++)
		{
			if(this.btn_goods[i].ProcTouch(msg, x, y))
			{
				if(this.btn_goods[i].bCheck())
				{
					this.gmake[i]=null;
				}
			}
		}
		return false;
	}
}


MakeEquip.iX,MakeEquip.iY,MakeEquip.iW,MakeEquip.iH;

MakeEquip.iGx,MakeEquip.iGy;

MakeEquip.bCanMake;