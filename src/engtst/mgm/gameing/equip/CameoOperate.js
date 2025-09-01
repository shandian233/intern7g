import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

export default class CameoOperate extends BaseClass{
	constructor( ani){
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
			this.btn_goods[i]=new XButton(GmPlay.xani_button);
			this.btn_goods[i].InitButton("物品格");
			this.btn_goods[i].bSingleButton=true;
			this.gmake[i]=null;
			this.igsub[i]=1;
		}
		//(this.iX+10,this.iY+65,360,this.iH-75)//360=60*2+x*3
		this.btn_goods[0].Move(this.iX+35+80, this.iY+120, 80, 80);//装备/宝石
		this.btn_goods[1].Move(this.iX+35+80+(60+80), this.iY+120, 80, 80);//宝石
		
		this.btn_make=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_make.InitButton("按钮1_110");
		this.btn_make.sName="制造";
	}

	Draw(){
		var i,offx,offy;
		DrawMode.new_baseframe4(this.iX, this.iY, this.iW, this.iH, "镶", "嵌","合","成");
		this.btn_close.Draw();
		GmPlay.xani_nui3.DrawAnima(this.iX+230, this.iY+200, "炼丹炉背景",0);
		offx=this.iX+this.iW-30-430-40;
		offy=this.iY+30;
		DrawMode.new_framein(offx,offy, 430+40, this.iH-60);
		
		M3DFast.gi().DrawTextEx(offx+20, offy+20, "双击选择装备或宝石：", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		this.iGx=offx+20;
		this.iGy=offy+20+30;
		GoodsDraw.new_DrawGoods(this.iGx,this.iGy, MyGoods.gi().goods[2], this.gmake,this.igsub);
		if(this.lockgoods!=null)GoodsDraw.new_DrawRect(this.iGx,this.iGy, MyGoods.gi().goods[2], this.lockgoods, 0);
		
		for(i=0;i<2;i++)
		{
			GmPlay.xani_nui3.DrawAnima(this.btn_goods[i].iX,this.btn_goods[i].iY, "物品格子",0);
			//this.btn_goods[i].Draw();
			if(this.gmake[i]!=null)
			{
				GoodsDraw.new_DrawOneGoods_ext(this.btn_goods[i].iX, this.btn_goods[i].iY, this.gmake[i], 1);
			}
		}
		offy=this.iY+this.iH-30-160;
		DrawMode.new_framein(this.iX+30, offy, 400, 160);
		var s="#c003e57"+this.Check();
		FormatString.gi().FormatEx(s, 360, 25, 0, 0, 30);
		FormatString.gi().Draw(this.iX+30+20, offy+20);
//		this.pm3f.DrawTextEx(this.iX+30+10, this.iY+300+10, , 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		this.btn_make.Move(this.iX+30+400-20-110, offy+160-20-52, 110, 52);
		if(this.iCanMake==1)
		{
			this.btn_make.sName="合成";
			this.btn_make.Draw();
		}
		else if(this.iCanMake==2)
		{
			this.btn_make.sName="镶嵌";
			this.btn_make.Draw();
		}
		else if(this.iCanMake==3)
		{
			this.btn_make.sName="使用";
			this.btn_make.Draw();
		}
		
		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}

	 Check()
	{
		var i,j,m,n;
		var type,lev;
		this.iCanMake=0;
		if(this.gmake[0]==null)
		{
			return "请先放入镶嵌的装备或合成的宝石";
		}
		//有图纸，检查手艺，和所需材料
		type=GmPlay.de_goods.intValue(this.gmake[0].iTid, -1, 16);//装备类型
		if(type==-1)
		{//第一格是宝石，判断第二格
			if(this.gmake[1]==null)
			{
				return "请先放入同类型同等级的宝石进行合成";
			}
			else if(this.gmake[1].iTid!=this.gmake[0].iTid)
			{
				return "宝石类型不同，不能合成";
			}
			else if(this.gmake[1].iAtts[0]!=this.gmake[0].iAtts[0])
			{
				return "宝石等级不同，不能合成";
			}
			this.iCanMake=1;
			return "#c00ff00宝石齐备，可以合成";
		}
		else
		{//第一格是装备，判断宝石是否可打到装备上
			//根据装备类型，判断宝石是否可镶嵌种类
			if(this.gmake[1]!=null && this.gmake[1].iTid==229)
			{
				this.iCanMake=3;
				return "碎石锤可以除去装备上的宝石";
			}
			switch(type)
			{
			case 0:
				if(this.gmake[1]==null)return "放入红宝石或月光石进行镶嵌";
				else if(this.gmake[1].iTid!=101 && this.gmake[1].iTid!=102)return "只能镶嵌红宝石或月光石";
				break;
			case 1:
				if(this.gmake[1]==null)return "放入碧玺石进行镶嵌";
				else if(this.gmake[1].iTid!=105)return "只能镶嵌碧玺石";
				break;
			case 2:
				if(this.gmake[1]==null)return "放入红宝石进行镶嵌";
				else if(this.gmake[1].iTid!=101)return "只能镶嵌红宝石";
				break;
			case 3:
				if(this.gmake[1]==null)return "放入紫鸦石或月光石进行镶嵌";
				else if(this.gmake[1].iTid!=103 && this.gmake[1].iTid!=102)return "只能镶嵌紫鸦石或月光石";
				break;
			case 4:
				if(this.gmake[1]==null)return "放入紫鸦石或墨晶石进行镶嵌";
				else if(this.gmake[1].iTid!=103 && this.gmake[1].iTid!=104)return "只能镶嵌紫鸦石或墨晶石";
				break;
			case 5:
				if(this.gmake[1]==null)return "放入墨晶石或碧玺石进行镶嵌";
				else if(this.gmake[1].iTid!=104 && this.gmake[1].iTid!=105)return "只能镶嵌墨晶石或碧玺石";
				break;
			default:
				return "数据错误3";
			}
			//看装备上是否已有同类宝石，并提高镶嵌等级
			m = Math.floor(this.gmake[0].iAtts[2]/10000);//宝石1
			n = this.gmake[0].iAtts[2]%10000;//宝石2
			lev=1;
			if(m!=0)lev+=m%1000;
			if(n!=0)lev+=n%1000;
			if(this.gmake[1].iAtts[0]!=lev)return "必须镶嵌"+lev+"级宝石";
			//等级过关，看是否有同类型直接提升
			if(m!=0 && Math.floor(m/1000) == this.gmake[1].iTid-101)
			{//直接提升
				this.iCanMake=2;
				return "#c00ff00宝石齐备，可以镶嵌";
			}
			if(n!=0 && Math.floor(n/1000) == this.gmake[1].iTid-101)
			{//直接提升
				this.iCanMake=2;
				return "#c00ff00宝石齐备，可以镶嵌";
			}
			if(m!=0 && n!=0)return "已经镶嵌两种不同类型宝石";
			
			//看装备上已镶嵌数量，超过2种不同的，则无法再镶嵌其他宝石
			this.iCanMake=2;
			return "#c00ff00宝石齐备，可以镶嵌";
		}
	}
	ProcTouch( msg, x, y)
	{
		for(i=0;i<2;i++)
		{
			if(this.btn_goods[i].ProcTouch(msg, x, y))
			{
				console.log('点击物品')
				if(this.btn_goods[i].bCheck())
				{
					this.gmake[i]=null;
				}
				return true;
			}
		}

		var i,j;
		if(this.iCanMake>0)
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
					GmProtocol.gi().s_UseSkill(5, ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]);
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
			if(type!=-1)this.gmake[0]=this.lockgoods;//是装备，直接放入第一格
			else
			{
				if(this.lockgoods.iTid>=101 && this.lockgoods.iTid<=105)
				{//是宝石，看是否能放入第一格，不能则放入第二格
					if(this.gmake[0]==null)this.gmake[0]=this.lockgoods;
					else if(this.gmake[1]==null && this.gmake[0]!=this.lockgoods)this.gmake[1]=this.lockgoods;
				}
				if(this.lockgoods.iTid==229)this.gmake[1]=this.lockgoods;
/*				if(this.gmake[0]==null)
				{//第一格为空，如果是宝石直接放入第一格
					if(this.lockgoods.iTid>=101 && this.lockgoods.iTid<=105)
					{
						this.gmake[0]=this.lockgoods;
					}
				}
				else
				{//判断第一格的是宝石还是装备，是宝石，则需要同类才能合成
					type=GmPlay.de_goods.intValue(this.gmake[0].iTid, 0, 16);
					if(type!=1)
					{//第一格是装备，判断点击的宝石是否符合镶嵌要求
					}
					else if(this.gmake[0].iTid>=101 && this.gmake[0].iTid<=105)
					{//第一格是宝石，要同类同等级
						if(this.lockgoods.iTid==this.gmake[0].iTid && this.lockgoods.iAtts[0]==this.gmake[0].iAtts[0])
						{
							this.gmake[1]=this.lockgoods;
						}
					}
				}*/
			}
			
			this.lockgoods=null;
		}
		
		return false;
	}
}
