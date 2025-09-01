
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import PackageTools from "../../../../../engine/PackageTools"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"

export default class PetStoreFrame extends BaseClass{
	
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW = 510;
		this.iH = 400;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_io=new XButtonEx2(GmPlay.xani_button);
		this.btn_io.InitButton("1号按钮90_60");
		
		this.btn_watch=new XButtonEx2(GmPlay.xani_button);
		this.btn_watch.InitButton("1号按钮90_60");
		this.btn_watch.sName="查看";
		
		this.iPid=new Int32Array(16);//
		this.sPName=new Array(16);//
		
		this.iPetPoint=-1;
		
		this.btn_switch=new Array(20);//
		for(i=0;i<20;i++)
		{
			this.btn_switch[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_switch[i].InitButton("4号按钮60_60");
			this.btn_switch[i].Move(this.iX + 20 + i * 70, this.iY + this.iH-30-60, 60, 60);
			this.btn_switch[i].sName=""+(i+1);
		}
	}

	Draw()
	{
		var i;
		var offx,offy;
		var w,h;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		
		offx=this.iX+20;
		offy=this.iY+20;
		w=180;
		h=260;
		DrawMode.frame_type4("11号框20_20", offx, offy, w, h, 20, 20);
		for(i=0;i<this.iCount;i++)
		{//仓库内的宠物列表
			if(this.iPetPoint>=0 && this.iPagePoint==0 && this.iPetPoint==i)
			{
				DrawMode.frame_type1("12号框20_30", offx + 10, offy + 10 + i * 30, w - 20, 20);
			}
			M3DFast.gi().DrawTextEx(offx + 10, offy + 10 + 15 + i * 30, this.sPName[i], 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		}
		
		if(this.iPetPoint>=0)
		{
			if(this.iPagePoint==0)this.btn_io.sName="取出";
			else this.btn_io.sName="存入";
			this.btn_io.Move(offx + w + 10, offy + h / 2 - 30-60, 90, 60);
			this.btn_io.Draw();
			
			this.btn_watch.Move(offx + w + 10, offy + h / 2 + 30, 90, 60);
			this.btn_watch.Draw();
		}
		
		offx = this.iX + 20 + w + 10+90+10;
		DrawMode.frame_type4("11号框20_20", offx, offy, w, h, 20, 20);
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{//仓库内的宠物列表
			if(this.iPetPoint>=0 && this.iPagePoint==1 && this.iPetPoint==i)
			{
				DrawMode.frame_type1("12号框20_30", offx + 10, offy + 10 + i * 30, w - 20, 20);
			}
			M3DFast.gi().DrawTextEx(offx+10, offy+10+15+i*30, MyPets.mp.pets[i].sName, 0xff114e61, 20, 101, 1, 1, 0, 0, -2);
		}
//		this.btn_io.Move(x, y, w, h)
		
		for(i=0;i<6;i++)
		{
			if(i==this.iStorePoint)
			{
				this.btn_switch[i].bMouseDown=true;
				this.btn_switch[i].bMouseIn=true;
			}
			if(i<PetStoreFrame.iStoreCount)
			{
				this.btn_switch[i].sName=""+(i+1);
				this.btn_switch[i].Draw();
			}
			else
			{
				this.btn_switch[i].sName="开";
				this.btn_switch[i].Draw();
				break;
			}
		}
		
		if(Confirm1.end(Confirm1.CONFIRM_BUYSTORE))
		{//
			if(Confirm1.bConfirm)
			{//购买一个宠物仓库
				GmProtocol.gi().s_OpenStore(11, 10*(PetStoreFrame.iStoreCount-PetStoreFrame.MAXFREESTORE+1),0);
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		var offx,offy;
		
		if(this.iPetPoint>=0)
		{
			if(this.btn_io.ProcTouch(msg, x, y))
			{
				if(this.btn_io.bCheck())
				{
					if(this.iPagePoint==0)
					{
						GmProtocol.gi().s_OpenStore(31, this.iStorePoint,this.iPid[this.iPetPoint]);
						this.btn_io.sName="取出";
					}
					else
					{
						GmProtocol.gi().s_OpenStore(30, this.iStorePoint,MyPets.mp.pets[this.iPetPoint].iPid);
						this.btn_io.sName="存入";
					}
				}
				return true;
			}
			if(this.btn_watch.ProcTouch(msg, x, y))
			{
				if(this.btn_watch.bCheck())
				{//查看
					if(this.iPagePoint==0)GmProtocol.gi().s_WatchOn(2,this.iPid[this.iPetPoint],0,"");
					else GmProtocol.gi().s_WatchOn(2,MyPets.mp.pets[this.iPetPoint].iPid,0,"");
				}
				return true;
			}
		}
		
		this.iPetPoint=-1;
		offx=this.iX+20;
		offy=this.iY+20;
		for(i=0;i<this.iCount;i++)
		{//仓库内的宠物列表
			if(XDefine.bInRect(x, y, offx+10, offy+10+i*30, 160, 30))
			{
				this.iPagePoint=0;
				this.iPetPoint=i;
				return true;
			}
		}
		offx=this.iX+20+180+10+90+10;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{//仓库内的宠物列表
			if(XDefine.bInRect(x, y, offx+10, offy+10+i*30, 160, 30))
			{
				this.iPagePoint=1;
				this.iPetPoint=i;
				return true;
			}
		}
		
		for(i=0;i<6;i++)
		{
			if(this.btn_switch[i].ProcTouch(msg, x, y))
			{
				if(this.btn_switch[i].bCheck())
				{
					if(i<PetStoreFrame.iStoreCount)
					{
						if(i!=this.iStorePoint)
						{
							this.iStorePoint=i;
							XStat.gi().PushStat(XStat.GS_LOADING1);
							GmProtocol.gi().s_OpenStore(1, i,0);
						}
					}
					else if(i==PetStoreFrame.iStoreCount)
					{//开启新背包格子
						Confirm1.start(Confirm1.CONFIRM_BUYSTORE,"是否确认花费"+10*(PetStoreFrame.iStoreCount-PetStoreFrame.MAXFREESTORE+1)+"元宝开启一个宠物仓库？");
					}
				}
			}
		}
		
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}
}

PetStoreFrame.MAXFREESTORE=1;
	
PetStoreFrame.iStoreCount;
	
PetStoreFrame.ResetStoreCount=function( flag8)
	{
		PetStoreFrame.iStoreCount=flag8/100+PetStoreFrame.MAXFREESTORE;
	}
	
PetStoreFrame.Open=function( pls)
	{
		var i;
		if(XStat.gi().LastStatType(0)==XStat.GS_LOADING1)XStat.gi().PopStat(1);
		if(XStat.gi().LastStatType(0)!=XStat.GS_PETSTOREFRAME)XStat.gi().PushStat(XStat.GS_PETSTOREFRAME);
		
		var psf=(XStat.gi().LastStat(0));
		
		psf.iStorePoint=pls.GetNextByte();
		psf.iCount=pls.GetNextByte();
		for(i=0;i<psf.iCount;i++)
		{
			psf.iPid[i]=pls.GetNextInt();
			psf.sPName[i]=pls.GetNextString();
		}
		psf.iPetPoint=-1;
	}