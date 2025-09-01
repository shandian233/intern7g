
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../engtst/mgm/gameing/me/pet/Pets"

class SellGoods
{/*
	int iGid;
	int iPrice;
	int iTid;
	int iCount;
	Goods gp;*/
	constructor()
	{
		this.iGid=0;
		this.gp=null;
	}
}
class SellPets
{/*
	int iPid;
	int iPrice;
	int iTid;*/
	constructor()
	{
		this.iPid=0;
	}
}

export default class MySell {

	constructor()
	{
		var i;
		this.bSelling=false;
		if(MySell.sg==null)
		{
			MySell.sg=new Array(20);//
			MySell.sp=new Array(8);//
			for(i=0;i<20;i++)MySell.sg[i]=new SellGoods();
			for(i=0;i<8;i++)MySell.sp[i]=new SellPets();
		}
		else
		{//第二次摆摊，保持上次摆摊内容
		}
		
		this.iW=900;
		this.iH=580;
		
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		
		this.btn_changename=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_changename.InitButton("宠物改名按钮");
		
		this.in_name=new XInput(GmPlay.xani_ui);
		this.in_name.Move(GmConfig.SCRW, GmConfig.SCRH, 10,10);
		this.in_name.sDetail="";
		this.in_name.iLength=8;
		this.bEditingName=false;
		
		this.btn_putup=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_putup.InitButton("按钮1_110");
		this.btn_putup.sName="上架";

		this.btn_record=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_record.InitButton("按钮1_110");
		this.btn_record.sName="记录";
		
		this.btn_exit=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_exit.InitButton("按钮1_110");
		this.btn_exit.sName="收摊";
	}

	Draw()
	{
		var i,j;
		var ox,oy;
		var offx,offy;
		if(!this.bShow)return;
		this.iX = Math.floor(GmConfig.SCRW-this.iW)/2;
		this.iY = Math.floor(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.new_baseframe2(this.iX,this.iY,this.iW,this.iH,"摆","摊");
		
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		
		//框子
		DrawMode.new_framein(this.iX+30,this.iY+30,this.iW-60,this.iH-60);
		
		//我的摊位名，改名
//		DrawMode.new_Text(this.iX+this.iW/2-150, this.iY+30+30, 300, this.sSellName);
		DrawMode.new_numberframe(this.iX+30+20, this.iY+30+30-5, 700, this.sSellName);
//		M3DFast.gi().DrawTextEx(this.iX+30+20, this.iY+30+30+40/2, this.sSellName, 0xff003e57, 40, 101, 1, 1, 0, 0, -2);
		this.btn_changename.Move(this.iX+30+20+700,this.iY+30+20,60,60);
		this.btn_changename.Draw();
		if(this.bEditingName)
		{
			this.in_name.onscr();
			this.sSellName=this.in_name.sDetail;
			if(this.in_name.bFinished)
			{//编辑完成//发送到服务器改名
//				GmPlay.sop("send sell name");
				this.bEditingName=false;
				this.in_name.bFinished=false;
				GmProtocol.gi().s_StartSell(6, 0, 0,this.sSellName);
			}
		}
		
		//道具部分
		offx=this.iX+30+20;
		offy=this.iY+30+30+40+30;
		GmPlay.xani_nui3.DrawAnima(offx, offy, "摊位分类框",0);
		M3DFast.gi().DrawTextEx(offx+105/2, offy+33/2, "物品", 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
		offy+=33+10;
		this.iGx=offx;
		this.iGy=offy;
		GoodsDraw.new_DrawGoods(offx,offy, MyGoods.gi().goods[2], null,null);
		for(i=0;i<20;i++)
		{//画锁定框子，已上架的红框
			if(MySell.sg[i].iGid>0)GoodsDraw.new_DrawRect(offx,offy, MyGoods.gi().goods[2], MySell.sg[i].gp, 1);
		}
		
		var gap=32+20;
		//宠物部分
		offx=this.iX+30+20+430+20;
		offy=this.iY+30+30+40+30;
		GmPlay.xani_nui3.DrawAnima(offx, offy, "摊位分类框",0);
		M3DFast.gi().DrawTextEx(offx+105/2, offy+33/2, "宠物", 0xffffffff, 25, 101, 1, 1, 0, -2, -2);
		offy += 33+10;
		this.iPx = offx;
		this.iPy = offy;
		DrawMode.new_frameon(offx, offy, 345, 175, 0);
		for(i=0;i<8;i++)
		{
			ox=offx+5+i%4*85;
			oy=offy+5+Math.floor(i/4)*85;
			
			GmPlay.xani_nui3.DrawAnima(ox,oy, "基本头像框",0);

			if(i>=MyPets.mp.iPetCount)continue;

			GmPlay.xani_head.DrawAnima_aa(ox+3,oy+3,GmPlay.de_pet.strValue(MyPets.mp.pets[i].iTid, 0, 1),0);//宠物头像

			if((parseInt(MyPets.mp.pets[i].iFlag/100)%10)!=0)
			{//系统绑定
				M3DFast.gi().DrawText_2(ox-6+3,oy+80+3, "绑", 0xff6bfff4, 26, 101, 1, 1, 0, 0, -3, 4, 0xff000000);
			}
			
			if(this.lockpet==MyPets.mp.pets[i])
			{//选中，显示名字
				GmPlay.xani_nui3.DrawAnimaEx(ox, oy, "物品选中框", 0, 101, 1, 1, 0, 0, 0);
				DrawMode.new_TagText2(this.iPx, this.iPy+175+15, 150, "名称", MyPets.mp.pets[i].sName);
			}
			for(j=0;j<8;j++)
			{
				if(MySell.sp[j].iPid>0 && MyPets.mp.pets[i].iPid==MySell.sp[j].iPid)
				{//上架的，显示价格
					GmPlay.xani_nui3.DrawAnimaEx(ox, oy, "物品选中框", 1, 101, 1, 1, 0, 0, 0);
					if(this.lockpet==MyPets.mp.pets[i])
					{//显示价格
						if(MySell.sp[j].iPrice==0)DrawMode.new_TagText2(this.iPx, this.iPy+175+15+gap, 150, "价格", "观赏");
						else DrawMode.new_TagText2(this.iPx, this.iPy+175+15+gap, 150, "单价", ""+MySell.sp[j].iPrice);
					}
				}
			}
		}
		//名称,单价,总价,铜币
		//数量，购买
		
		//右下角功能按钮
		this.btn_putup.Move(this.iPx+345-110,this.iPy+175+15,110,52);
		this.btn_record.Move(this.iPx,this.iPy+175+15+gap*2,110,52);
		this.btn_exit.Move(this.iPx+345-110,this.iPy+175+15+gap*2,110,52);
		if(this.lockgoods!=null)
		{//选中了物品，画选中框
			GoodsDraw.new_DrawRect(this.iGx, this.iGy, MyGoods.gi().goods[2], this.lockgoods, 0);
			DrawMode.new_TagText2(this.iPx, this.iPy+175+15, 150, "名称", GmPlay.de_goods.strValue(this.lockgoods.iTid, -1, 4));
			this.bPutUp=true;
			for(i=0;i<20;i++)
			{
				if(MySell.sg[i].iGid!=0 && MySell.sg[i].iGid==this.lockgoods.iGid)
				{//已上架
					if(MySell.sg[i].iPrice==0)DrawMode.new_TagText2(this.iPx, this.iPy+175+15+gap, 150, "价格", "观赏");
					else DrawMode.new_TagText2(this.iPx, this.iPy+175+15+gap, 150, "单价", ""+MySell.sg[i].iPrice);
					this.bPutUp=false;
				}
			}
			if(this.bPutUp)this.btn_putup.sName="上架";
			else this.btn_putup.sName="下架";
			this.btn_putup.Draw();
		}
		if(this.lockpet!=null)
		{
			this.bPutUp=true;
			for(i=0;i<MyPets.mp.iPetCount;i++)
			{
				if(MySell.sp[i].iPid!=0 && MySell.sp[i].iPid==this.lockpet.iPid)
				{
					this.bPutUp=false;
				}
			}
			if(this.bPutUp)this.btn_putup.sName="上架";
			else this.btn_putup.sName="下架";
			this.btn_putup.Draw();
		}
		this.btn_exit.Draw();
		this.btn_record.Draw();

		if(GoodsDraw.bShowDetail())
		{
			GoodsDraw.new_DrawDetail(null,-1,-1,0);
		}
	}
	
	 ProcTouch( msg, x, y)
	{
		var i;
		var xx,yy;
		
		if(this.lockgoods!=null)
		{//选中了物品，可以点击上架按钮
			if(this.btn_putup.ProcTouch(msg, x, y))
			{
				if(this.btn_putup.bCheck())
				{
					if(this.bPutUp)
					{//锁定的物品上架
						if(this.lockgoods.iAtts[7]!=0)
						{
							EasyMessage.easymsg.AddMessage("绑定物品不可上架");
							return true;
						}
						XStat.gi().PushStat(XStat.GS_SHELVESFRAME);
						this.lockpet=null;
					}
					else
					{//下架
						GmProtocol.gi().s_StartSell(2, this.lockgoods.iGid, 0,"");//
					}
				}
				return true;
			}
		}
		if(this.lockpet!=null)
		{//选择了宠物，上下架
			if(this.btn_putup.ProcTouch(msg, x, y))
			{
				if(this.btn_putup.bCheck())
				{
					if(this.bPutUp)
					{//锁定的宠物上架
						if((parseInt(this.lockpet.iFlag/100)%10)==0)
						{
							XStat.gi().PushStat(XStat.GS_SHELVESFRAME);
							this.lockgoods=null;
						}
						else EasyMessage.easymsg.AddMessage("绑定宠物不能上架");
					}
					else
					{//下架
						GmProtocol.gi().s_StartSell(4, this.lockpet.iPid, 0,"");//
					}
				}
				return true;
			}
		}
		
		this.lockgoods=GoodsDraw.new_LockGoods(x,y,this.iGx,this.iGy, MyGoods.gi().goods[2],msg);
		GoodsDraw.NoMove();
		if(msg==3 && this.lockgoods!=null && GoodsDraw.bCanProc())
		{
		}
		var ox,oy;
		this.lockpet=null;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			ox=this.iPx+5+i%4*85;
			oy=this.iPy+5+i/4*85;
			if(XDefine.bInRect(x, y, ox,oy, 80,80))
			{
				this.lockpet=MyPets.mp.pets[i];
				break;
			}
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				this.bShow=false;
			}
			return true;
		}
		if(this.btn_exit.ProcTouch(msg, x, y))
		{
			if(this.btn_exit.bCheck())
			{
				this.bSelling=false;
				GmProtocol.gi().s_StartSell(5, 0, 0,"");//收摊
			}
			return true;
		}
		if(this.btn_changename.ProcTouch(msg, x, y))
		{
			if(this.btn_changename.bCheck())
			{
				this.in_name.Move(this.btn_changename.iX,this.btn_changename.iY,this.btn_changename.iW,this.btn_changename.iH);
				this.in_name.sDetail=this.sSellName;
				this.in_name.Move(GmConfig.SCRW, GmConfig.SCRH, 10,10);
				this.in_name.ProcTouch(3,GmConfig.SCRW+1,GmConfig.SCRH+1);
				this.bEditingName=true;
			}
		}
		if(this.btn_record.ProcTouch(msg, x, y))
		{
			if(this.btn_record.bCheck())
			{
				var s="";
				for(i=0;i<10;i++)
				{
					s+=MySell.sSellRecord[i];
					if(i<9)s+="#e";
				}
				FrameMessage.fm.Open(s);
			}
			return true;
		}
		return false;
	}
	
	IndexSell( pls)
	{
		var i,j;
		for(i=0;i<20;i++)MySell.sg[i].iGid=0;
		for(i=0;i<8;i++)MySell.sp[i].iPid=0;
		for(i=0;i<20;i++)
		{
			j=pls.GetNextByte();
			if(j==0)break;
			MySell.sg[i].iGid=pls.GetNextInt();
			MySell.sg[i].iPrice=pls.GetNextInt();
			MySell.sg[i].iTid=pls.GetNextInt();
			MySell.sg[i].gp=null;
			
			for(j=0;j<20;j++)
			{
				if(MyGoods.gi().goods[2][j].iGid>0 && MyGoods.gi().goods[2][j].iGid==MySell.sg[i].iGid)
				{
					MySell.sg[i].gp=MyGoods.gi().goods[2][j];
				}
			}
		}
		for(i=0;i<8;i++)
		{
			j=pls.GetNextByte();
			if(j==0)break;
			MySell.sp[i].iPid=pls.GetNextInt();
			MySell.sp[i].iPrice=pls.GetNextInt();
			MySell.sp[i].iTid=pls.GetNextInt();
		}
	}
	InitSell( pls)
	{
		var i;
		this.sSellName=pls.GetNextString();
//		in_sellname.sDetail=pls.GetNextString();
		this.bSelling=true;
		//清除出售的物品
		for(i=0;i<20;i++)
		{
//			MySell.sg[i].iGid=0;
			if(MySell.sg[i].iGid>0)
			{
//				GmPlay.sop(""+MySell.sg[i].iGid+"__"+MySell.sg[i].gp.iGid+"__"+MySell.sg[i].iPrice);
				if(MySell.sg[i].gp==null)MySell.sg[i].iGid=0;
				else if(MySell.sg[i].gp.iGid!=MySell.sg[i].iGid)MySell.sg[i].iGid=0;
				else if(MySell.sg[i].gp.iOid!=2)MySell.sg[i].iGid=0;
				else if(MySell.sg[i].gp.iTid>=101 && MySell.sg[i].gp.iTid<=105)MySell.sg[i].iGid=0;//宝石不上架
				else
				{//上架
					GmProtocol.gi().s_StartSell(1, MySell.sg[i].iGid, MySell.sg[i].iPrice,"");
				}
			}
		}
		for(i=0;i<8;i++)
		{
			if(MySell.sp[i].iPid>0)
			{
				if(MyPets.mp.FindPet(MySell.sp[i].iPid)==null)MySell.sp[i].iPid=0;
				else GmProtocol.gi().s_StartSell(3, MySell.sp[i].iPid, MySell.sp[i].iPrice,"");
			}
//			MySell.sp[i].iPid=0;
		}
		this.bShow=true;
		this.lockgoods=null;
	}
	
	AddSellRecord( pls)
	{
		var i;
		for(i=9;i>0;i--)
		{
			MySell.sSellRecord[i]=MySell.sSellRecord[i-1];
		}
		MySell.sSellRecord[i]=pls.GetNextString();
	}
}
MySell.sSellRecord=["","","","","","","","","",""];

MySell.ms=null;
MySell.gi=function()
{
	if(MySell.ms==null)MySell.ms=new MySell();
	return MySell.ms;
}