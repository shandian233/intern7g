import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"
	
	
	export default class ImproveEquip extends BaseClass{


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
		
		this.btn_close=new XButton(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
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
		//(this.iX+10,this.iY+65,360,this.iH-75)
		this.btn_goods[0].Move(this.iX+35+80, this.iY+80, 80, 80);//装备
		this.btn_goods[1].Move(this.iX+35+80+(60+80), this.iY+80, 80, 80);//强化符
		this.btn_goods[2].Move(this.iX+35+80, this.iY+180, 80, 80);//幸运符
		this.btn_goods[3].Move(this.iX+35+80+(60+80), this.iY+180, 80, 80);//替身人偶
		
		this.btn_make=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_make.InitButton("按钮1_110");
		this.btn_make.sName="强化";
		this.btn_make.Move(this.iX+270, this.iY+this.iH-40-40, 70, 40);
	}


	 Draw()
	{
		var i,offx,offy;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "强", "化");
		this.btn_close.Draw();
		GmPlay.xani_nui3.DrawAnima(this.iX+230, this.iY+200, "炼丹炉背景",0);
		offx=this.iX+this.iW-30-430-40;
		offy=this.iY+30;
		DrawMode.new_framein(offx,offy, 430+40, this.iH-60);
		
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "双击选择要强化的装备：", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		this.iGx=offx+20;
		this.iGy=offy+20+30;
		GoodsDraw.new_DrawGoods(this.iGx,this.iGy, MyGoods.gi().goods[2], this.gmake,this.igsub);
		if(this.lockgoods!=null)GoodsDraw.new_DrawRect(this.iGx,this.iGy, MyGoods.gi().goods[2], this.lockgoods, 0);
		if(this.gmake[1]!=null)
		{
			if(this.igsub[1]!=this.iNeed)this.igsub[1]=this.iNeed;
			if(this.igsub[1]>this.gmake[1].iCount)this.igsub[1]=this.gmake[1].iCount;
		}
		for(i=0;i<4;i++)
		{
			GmPlay.xani_nui3.DrawAnima(this.btn_goods[i].iX,this.btn_goods[i].iY, "物品格子",0);
//		this.btn_goods[i].Draw();
			if(this.gmake[i]!=null)
			{
				GoodsDraw.new_DrawOneGoods_ext(this.btn_goods[i].iX, this.btn_goods[i].iY, this.gmake[i], this.igsub[i]);
			}
		}
		offy=this.iY+this.iH-30-160;
		DrawMode.new_framein(this.iX+30, offy, 400, 160);
		var s="#c003e57"+this.Check();
		FormatString.gi().FormatEx(s, 360, 25, 0, 0, 30);
		FormatString.gi().Draw(this.iX+30+20, offy+20);
//		this.pm3f.DrawTextEx(this.iX+30+10, this.iY+300+10, , 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		if(this.bCanMake)
		{
			this.btn_make.Move(this.iX+30+400-20-110, offy+160-20-52, 110, 52);
			this.btn_make.Draw();
		}
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
		if(Confirm1.end(Confirm1.CONFIRM_IMPROVEEQUIP))
		{
			if(Confirm1.bConfirm)
			{//
				this.ie();
			}
		}
	}
	 Check()
	{
		this.iNeed=1;
		var k;
		var type,lev;
		var ret="#c00ff00材料齐备，可以强化";
		this.bCanMake=false;
		if(this.gmake[0]==null)
		{
			return "请先放入需要强化的装备";
		}
		type=GmPlay.de_goods.intValue(this.gmake[0].iTid, -1, 16);//装备类型
		if(type==-1)return "数据异常6";
		lev=this.gmake[0].iAtts[3]/10000;//已强化等级
		if(lev>=9)return "装备已经强化到顶层";
		this.iNeed=GmPlay.de_goods.intValue(this.gmake[0].iTid, 0, 9)/10+lev+1;//穿戴要求等级
		if(this.gmake[1]==null)
		{
			return "请放入强化符"+this.iNeed+"张";
		}
		if(this.gmake[1].iCount<this.iNeed)
		{
			return "强化符数量不足，需要"+this.iNeed+"张";
		}
		k=115-lev*15;
		if(this.gmake[3]!=null)k+=20;//幸运符+20%成功率
		if(k>100)k=100;
		ret+="#e强化成功率"+k+"%";
		if(this.gmake[3]==null && k<100)ret+="#e#cff0000幸运符提高强化成功率";
		if(this.gmake[2]==null && k<100)ret+="#e#cff0000替身木偶使装备不损毁";
//		if(this.gmake[2]==null && k<100)
//		{
//			ret+="#e#c00ff00放入替身人偶，强化失败装备不会消失";
//		}
//		if(this.gmake[3]==null)
//		{
//			ret+="#e#c00ff00放入幸运符提高强化成功率，并提高强化幸运度";
//		}

		this.bCanMake=true;
		return ret;
	}
	 ie()
	{
		var i;
		var ids=[0,0,0,0,0,0,0,0];
		for(i=0;i<8;i++)
		{
			if(this.gmake[i]!=null)
			{
				ids[i]=this.gmake[i].iGid;
/*							j=GmPlay.de_goods.intValue(this.gmake[i].iTid, 0, 28);
				if(j>1)
				{
					this.gmake[i].iCount--;
					if(this.gmake[i].iCount<=0)this.gmake[i].iGid=-1;
				}
				else this.gmake[i].iGid=-1;*/
				this.gmake[i].iGid=-1;
				this.gmake[i]=null;
			}
		}
		GmProtocol.gi().s_UseSkill(6, ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]);
	}
	 ProcTouch( msg, x, y)
	{
		var i,j,k;
		if(this.bCanMake)
		{
			if(this.btn_make.ProcTouch(msg, x, y))
			{
				if(this.btn_make.bCheck())
				{
					if(this.gmake[2]==null)Confirm1.start(Confirm1.CONFIRM_IMPROVEEQUIP, "#cff0000没有放入替身木偶，如果强化失败，装备会消失，是否确定继续强化？");
					else this.ie();
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
		
		this.lockgoods=GoodsDraw.new_LockGoods(x,y,this.iGx,this.iGy, MyGoods.gi().goods[2],msg);
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{//点击物品，判断类型，放入格子(制造书，材料，幸运符，手艺)
			var type;
			type=GmPlay.de_goods.intValue(this.lockgoods.iTid, 0, 16);
			if(type!=-1)
			{
				this.gmake[0]=this.lockgoods;//是装备，直接放入第一格
				//放入，强化符，幸运符，替身
				j=GmPlay.de_goods.intValue(this.gmake[0].iTid, 0, 9)/10+this.gmake[0].iAtts[3]/10000+1;//穿戴要求等级
				for(k=0;k<20;k++)
				{//放入强化符
					if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==107 && MyGoods.gi().goods[2][k].iCount>=j)
					{
						this.gmake[1]=MyGoods.gi().goods[2][k];
						break;
					}
				}
				for(k=0;k<20;k++)
				{//放入木偶
					if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==106)
					{
						this.gmake[2]=MyGoods.gi().goods[2][k];
						break;
					}
				}
				for(k=0;k<20;k++)
				{//放入幸运符
					if(MyGoods.gi().goods[2][k].iGid>0 && MyGoods.gi().goods[2][k].iTid==108)
					{
						this.gmake[3]=MyGoods.gi().goods[2][k];
						break;
					}
				}
			}
			else
			{
				if(this.lockgoods.iTid==107)this.gmake[1]=this.lockgoods;//强化符
				if(this.lockgoods.iTid==106)this.gmake[2]=this.lockgoods;//替身人偶
				if(this.lockgoods.iTid==108)this.gmake[3]=this.lockgoods;//幸运符
			}
			this.lockgoods=null;
		}
		for(i=0;i<4;i++)
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
