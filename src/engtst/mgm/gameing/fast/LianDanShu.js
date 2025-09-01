import GmConfig from "../../../../config/GmConfig"
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
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
    
export default class LianDanShu extends BaseClass{
	

	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=30+420+430+40+30;
		this.iH=345+40+60+30;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_goods=new Array(8);//
		this.gmake=new Array(8);//
		this.igsub=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_goods[i]=new XButton(GmPlay.xani_nui3);
			this.btn_goods[i].InitButton("物品格子");
			
			this.gmake[i]=null;
			this.igsub[i]=1;
		}
		//(this.iX+10,this.iY+65,360,this.iH-75)
		this.btn_goods[0].Move(this.iX+30+400/2-40, this.iY+120-60, 80, 80);//丹方
		this.btn_goods[1].Move(this.iX+30+400/2-40, this.iY+120+60, 80, 80);//炼丹炉
		
		this.btn_goods[2].Move(this.iX+30+400/2-40-100, this.iY+120-80, 80, 80);//材料1
		this.btn_goods[3].Move(this.iX+30+400/2-40+100, this.iY+120-80, 80, 80);//材料2
		this.btn_goods[4].Move(this.iX+30+400/2-40-100, this.iY+120+80, 80, 80);//材料3
		this.btn_goods[5].Move(this.iX+30+400/2-40+100, this.iY+120+80, 80, 80);//材料4
		
		this.btn_make=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_make.InitButton("按钮1_110");
		this.btn_make.sName="炼药";
		
		this.btn_close=new XButton(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
	}

	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "炼", "丹");
//		DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"炼丹");
		this.btn_close.Draw();
//		DrawMode.Frame2_MD(this.iX+10, this.iY+65,360, this.iH-75);
//		DrawMode.Frame2_MD(this.iX+380, this.iY+65,360, this.iH-75);
		GmPlay.xani_nui3.DrawAnima(this.iX+230, this.iY+200, "炼丹炉背景",0);
		offx=this.iX+this.iW-30-430-40;
		offy=this.iY+30;
		DrawMode.new_framein(offx,offy, 430+40, this.iH-60);
		
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "双击选择丹方：", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		this.iGx=offx+20;
		this.iGy=offy+20+30;
		GoodsDraw.new_DrawGoods(this.iGx,this.iGy, MyGoods.gi().goods[2], this.gmake,this.igsub);
		if(this.lockgoods!=null)GoodsDraw.new_DrawRect(this.iGx,this.iGy, MyGoods.gi().goods[2], this.lockgoods, 0);
		for(i=0;i<6;i++)
		{
			this.btn_goods[i].Draw();
			if(this.gmake[i]!=null)
			{
				GoodsDraw.new_DrawOneGoods_ext(this.btn_goods[i].iX, this.btn_goods[i].iY, this.gmake[i], 1);
			}
		}
		offy=this.iY+this.iH-30-160;
		DrawMode.new_framein(this.iX+30, offy, 400, 160);

		var s=this.Check();
//		FormatString.gi().Format(s, 360, 30);
		FormatString.gi().FormatEx(s, 360, 25, 0, 0, 30);
		FormatString.gi().Draw(this.iX+30+20, offy+20);
//		this.pm3f.DrawTextEx(this.iX+30+10, this.iY+300+10, , 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		GmPlay.sop("aaa="+s);
		if(this.bCanMake)
		{
			this.btn_make.Move(this.iX+30+400-20-110, offy+160-20-52, 110, 52);
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
		var flag=[0,0,0,0,0,0,0,0,0,0];
		var ret="#c003e57";
		this.bCanMake=false;
		if(this.gmake[0]==null)
		{
			return "请先放入丹方";
		}
		//检查所需材料
		m=0;
		for(i=3;i<7;i++)
		{//材料1,2,3
			j=this.gmake[0].iAtts[i];
			if(j<=0)break;
			//检测列表中是否有材料j
			for(k=2;k<6;k++)
			{
				if(this.gmake[k]==null)continue;
				if(this.gmake[k].iTid==j && flag[k]==0)
				{
					flag[k]=1;
					break;
				}
			}
			if(k>=6)
			{
				ret=ret+"缺少草药："+GmPlay.de_goods.strValue(j, -1, 4)+"#e";
				m++;
			}
		}
		if(m>0)return ret;
//		if(this.gmake[2]!=null)ret="#e至少获得一项附加属性";
		i=60;
		if(this.gmake[0].iTid==195)i=60;
		else if(this.gmake[0].iTid==328)i=50;
		else if(this.gmake[0].iTid==329)i=40;
		else if(this.gmake[0].iTid==330)i=10;
		else i=5;
		ret="#e炼药成功率"+i+"%";
		if(this.gmake[1]!=null && this.gmake[1].iGid>0)
		{
			ret+="#e炼丹炉提高成功率"+this.gmake[1].iAtts[3]+"%";
		}
		if(MyGov.mg.iZhuQueLev>0)
		{
			i=MyGov.mg.iZhuQueLev/5;
			i*=5;
			ret+="#e朱雀堂提高成功率"+(i/10)+"."+(i%10)+"%";
		}
//		if(i>100)i=100;
//		ret="#e炼药成功率"+i+"%";//一级丹药
		this.bCanMake=true;
		return "#c00ff00材料齐备"+ret;
	}
	 ProcTouch( msg, x, y)
	{//195
		var i,j,k,m;
		if(this.bCanMake)
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
					GmProtocol.gi().s_UseSkill(8, ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]);
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
		this.lockgoods=GoodsDraw.new_LockGoods(x,y,this.iGx, this.iGy, MyGoods.gi().goods[2],msg);
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{//点击物品，判断类型，放入格子(制造书，材料，幸运符，手艺)
//			var type;
			j=GmPlay.de_goods.intValue(this.lockgoods.iTid, -1, 27);
			if(this.lockgoods.iTid==195 || this.lockgoods.iTid==328 || this.lockgoods.iTid==329 || this.lockgoods.iTid==330 || this.lockgoods.iTid==331)
			{
				this.gmake[0]=this.lockgoods;//丹方
				//自动检测所需草药放入
				m=2;
				for(i=3;i<7;i++)
				{
					j=this.lockgoods.iAtts[i];
					if(j>0)
					{//草药id，从背包中搜索直接放入
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
			else if(this.lockgoods.iTid>=342 && this.lockgoods.iTid<=343)this.gmake[1]=this.lockgoods;
			else 	if(j!=-1 || (this.lockgoods.iTid>=337 && this.lockgoods.iTid<=341))
			{//是草药，放入空闲的this.gmake里面
				for(i=2;i<6;i++)
				{
					if(this.gmake[i]==null)
					{
						this.gmake[i]=this.lockgoods;
						break;
					}
				}
			}
			else EasyMessage.easymsg.AddMessage("请选择丹方");
//			if(this.lockgoods.iTid==98 ||
//				this.lockgoods.iTid==99 ||
//				this.lockgoods.iTid==100)this.gmake[1]=this.lockgoods;//炼丹炉
//			if(this.lockgoods.iTid==108)this.gmake[2]=this.lockgoods;//幸运符
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
//		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
//		{
//			XStat.gi().PopStat(1);
//		}
		return false;
	}
	 AutoPutGoods( g)
	{
		var i,j,k,m;
		m=2;
		for(i=3;i<7;i++)
		{
			j=g.iAtts[i];
			if(j>0)
			{//草药id，从背包中搜索直接放入
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
}

LianDanShu.Open=function( df, dl)
{
    var lds=XStat.gi().PushStat(XStat.GS_LIANDANSHU);
    
    lds.gmake[0]=df;
    lds.gmake[1]=dl;
    if(df!=null)
    {
        lds.AutoPutGoods(df);
    }
    GmProtocol.gi().s_NewGovOperate(22, 0, 0, 0, 0, "");
}