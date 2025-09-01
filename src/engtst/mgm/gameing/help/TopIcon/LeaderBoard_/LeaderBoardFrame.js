
import GameData from "../../../../../../config/GameData"
import GmConfig from "../../../../../../config/GmConfig"
import XDefine from "../../../../../../config/XDefine"
import BaseClass from "../../../../../../engine/BaseClass"
import PackageTools from "../../../../../../engine/PackageTools"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import UIList from "../../../../../../engtst/mgm/frame/UIList"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"

import LeaderBoardRole from "./LeaderBoardRole"
class _EQUIPLIST
{
/*	public int iGid;
	public int iTid;
	public int iRid;
	public String sOwner;
	public int iScore;
	public int iInitProc;*/
	constructor()
	{

	}
}
class _ROLELIST
{
/*	public int iRid;
	public String sName;
	public int iSchoolId;
	public int iScore;
	public int iComplexScore;
	public int iLev;
	public int iInitProc;
	public int iFlag16;
	public int iMoney;//ingot
*/	constructor()
	{
		this.iComplexScore=0;
		this.iScore=0;
	}
}
class _PETLIST
{
/*	public int iPid;
	public int iTid;
	public int iRid;
	public String sOwner;
	public int iScore;
	public int iInitProc;*/
	constructor()
	{

	}
}

export default class LeaderBoardFrame extends BaseClass
{
	constructor( ani)
	{
		super();
		this._titles=[
			["七国第一","七国英杰","七国才俊"],
			["独占鳌头","超群绝伦","出类拔萃"],
			["驯兽大师","驯兽达人","驯兽有方"],
			["会当凌绝顶","山高我为峰","高处不胜寒"],
			["锻器大师","锻器达人","锻器有方"],
			["富甲天下","富可敌国","家财万贯"],
			["壕气冲天","威风壕壕","英雄壕杰"]
		];
		var i;

		this.iLW=660;
		this.iW=340+this.iLW;
		this.iH=530;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		this.iShowH=this.iH-80;
		this.iDestH=0;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_grsl=new XButtonEx2(GmPlay.xani_button);
		this.btn_grsl.InitButton("6号按钮210_60");
		this.btn_grsl.sName="个人实力";
		this.btn_zhpf=new XButtonEx2(GmPlay.xani_button);
		this.btn_zhpf.InitButton("7号按钮180_60");
		this.btn_zhpf.sName="综合评分";
		this.btn_rwpf=new XButtonEx2(GmPlay.xani_button);
		this.btn_rwpf.InitButton("7号按钮180_60");
		this.btn_rwpf.sName="人物评分";
		this.btn_cwpf=new XButtonEx2(GmPlay.xani_button);
		this.btn_cwpf.InitButton("7号按钮180_60");
		this.btn_cwpf.sName="宠物评分";
		this.btn_dj=new XButtonEx2(GmPlay.xani_button);
		this.btn_dj.InitButton("7号按钮180_60");
		this.btn_dj.sName="等级";
		
		this.btn_jssb=new XButtonEx2(GmPlay.xani_button);
		this.btn_jssb.InitButton("6号按钮210_60");
		this.btn_jssb.sName="绝世神兵";
		this.btn_wq=new XButtonEx2(GmPlay.xani_button);
		this.btn_wq.InitButton("7号按钮180_60");
		this.btn_wq.sName="武器";
		this.btn_xl=new XButtonEx2(GmPlay.xani_button);
		this.btn_xl.InitButton("7号按钮180_60");
		this.btn_xl.sName="项链";
		this.btn_yf=new XButtonEx2(GmPlay.xani_button);
		this.btn_yf.InitButton("7号按钮180_60");
		this.btn_yf.sName="衣服";
		this.btn_tk=new XButtonEx2(GmPlay.xani_button);
		this.btn_tk.InitButton("7号按钮180_60");
		this.btn_tk.sName="头盔";
		this.btn_yd=new XButtonEx2(GmPlay.xani_button);
		this.btn_yd.InitButton("7号按钮180_60");
		this.btn_yd.sName="腰带";
		this.btn_xz=new XButtonEx2(GmPlay.xani_button);
		this.btn_xz.InitButton("7号按钮180_60");
		this.btn_xz.sName="鞋子";
		
		this.btn_bwjfb=new XButtonEx2(GmPlay.xani_button);
		this.btn_bwjfb.InitButton("6号按钮210_60");
		this.btn_bwjfb.sName="比武积分榜";
		this.btn_49z=new XButtonEx2(GmPlay.xani_button);
		this.btn_49z.InitButton("7号按钮180_60");
		this.btn_49z.sName="上届49组";
		this.btn_69z=new XButtonEx2(GmPlay.xani_button);
		this.btn_69z.InitButton("7号按钮180_60");
		this.btn_69z.sName="上届69组";
		this.btn_89z=new XButtonEx2(GmPlay.xani_button);
		this.btn_89z.InitButton("7号按钮180_60");
		this.btn_89z.sName="上届80组";
		
		this.btn_qgyh=new XButtonEx2(GmPlay.xani_button);
		this.btn_qgyh.InitButton("6号按钮210_60");
		this.btn_qgyh.sName="七国英豪";
		this.btn_49t=new XButtonEx2(GmPlay.xani_button);
		this.btn_49t.InitButton("7号按钮180_60");
		this.btn_49t.sName="49组";
		this.btn_69t=new XButtonEx2(GmPlay.xani_button);
		this.btn_69t.InitButton("7号按钮180_60");
		this.btn_69t.sName="69组";
		this.btn_89t=new XButtonEx2(GmPlay.xani_button);
		this.btn_89t.InitButton("7号按钮180_60");
		this.btn_89t.sName="80组";
		
		this.btn_cfb=new XButtonEx2(GmPlay.xani_button);
		this.btn_cfb.InitButton("6号按钮210_60");
		this.btn_cfb.sName="财富榜";
		this.btn_money=new XButtonEx2(GmPlay.xani_button);
		this.btn_money.InitButton("7号按钮180_60");
		this.btn_money.sName="铜币榜";
		this.btn_ingot=new XButtonEx2(GmPlay.xani_button);
		this.btn_ingot.InitButton("7号按钮180_60");
		this.btn_ingot.sName="元宝榜";
		
		this.btn_hyb=new XButtonEx2(GmPlay.xani_button);
		this.btn_hyb.InitButton("6号按钮210_60");
		this.btn_hyb.sName="活跃榜";
		this.btn_thisweek=new XButtonEx2(GmPlay.xani_button);
		this.btn_thisweek.InitButton("7号按钮180_60");
		this.btn_thisweek.sName="本周活跃榜";
		this.btn_previousweek=new XButtonEx2(GmPlay.xani_button);
		this.btn_previousweek.InitButton("7号按钮180_60");
		this.btn_previousweek.sName="上周活跃榜";
		
		this.equip_list=new Array(50);//
		this.role_list=new Array(50);//
		this.pet_list=new Array(50);//
		for(i=0;i<50;i++)
		{
			this.equip_list[i]=new _EQUIPLIST();
			this.role_list[i]=new _ROLELIST();
			this.pet_list[i]=new _PETLIST();
		}
		this.ui_equip=new UIList(0,4,this.iW-25-25-20-240-30,this.iH-50-30);//800-25-25-20-210-30=490
		this.ui_equip.SetTitle(0, "排名", 160, false);
		this.ui_equip.SetTitle(1, "神兵名称", 170, false);
		this.ui_equip.SetTitle(2, "拥有者", 170, false);
		this.ui_equip.SetTitle(3, "评分", 160, false);

		this.ui_role=new UIList(0,4,this.iW-25-25-20-240-30,this.iH-50-30);//800-25-25-20-210-30=490
		this.ui_role.SetTitle(0, "排名", 160, false);
		this.ui_role.SetTitle(1, "角色名称", 170, false);
		this.ui_role.SetTitle(2, "门派", 170, false);
		this.ui_role.SetTitle(3, "评分", 160, false);

		this.ui_pet=new UIList(0,4,this.iW-25-25-20-240-30,this.iH-50-30);//800-25-25-20-210-30=490
		this.ui_pet.SetTitle(0, "排名", 160, false);
		this.ui_pet.SetTitle(1, "宠物名称", 170, false);
		this.ui_pet.SetTitle(2, "主人名称", 170, false);
		this.ui_pet.SetTitle(3, "评分", 160, false);

		this.iSelect1=0;
		this.iSelect2=0;
		
		this.iRoleCount=0;
		this.iPetCount=0;
		this.iEquipCount=0;
		GmProtocol.gi().s_LeaderBoardFresh(0, this.iSelect1, this.iSelect2);
		
		GmMe.me.CalcUserScore();
		
		this.btn_explain=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.btn_explain[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_explain[i].InitButton("5号按钮30_30");
			this.btn_explain[i].Move(0, 0, 30, 30);
		}
		
		this.btn_getprice=new XButtonEx2(GmPlay.xani_button);
		this.btn_getprice.InitButton("3号按钮160_42");
		this.btn_getprice.sName="领取奖励";
		
		this.aa_icon=GmPlay.xani_frame.InitAnimaWithName("皇冠图标38_32", null);
		
		this.btn_self=new XButtonEx2(GmPlay.xani_button);
		this.btn_self.bSingleButton=true;
		this.iOffY=0;
		this.bLocked1=false;
	}
	
	Draw()
	{
		var i;
		DrawMode.new_baseframe3(this.iX, this.iY, this.iW, this.iH, "排", "行","榜");
		this.btn_close.Draw();
		
		if(!this.bLocked1)
		{
			if(this.iOffY>0)this.iOffY/=2;
			if(this.iOffY<0)
			{
				if(this.iDestH<this.iY+this.iH-40)
				{
					i=this.iY+this.iH-40-this.iDestH;
					this.iOffY+=i/2;
				}
			}
		}

		DrawMode.new_framein(this.iX+25,this.iY+25,240,this.iH-50);
		M3DFast.gi().SetViewClip(this.iX+40, this.iY+40, this.iX+40+210, this.iY+this.iH-40);
		var offx=this.iX+25+15;
		var offy=this.iY+25+15+this.iOffY;
		this.btn_grsl.Move(offx, offy, 210, 60);
		if(this.iSelect1==0)this.btn_grsl.setdown();
		this.btn_grsl.Draw();
		offy+=60;
		if(this.iSelect1==0)
		{
			this.btn_zhpf.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==0)this.btn_zhpf.setdown();
			this.btn_zhpf.Draw();
			offy+=60;
			this.btn_rwpf.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==1)this.btn_rwpf.setdown();
			this.btn_rwpf.Draw();
			offy+=60;
			this.btn_cwpf.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==2)this.btn_cwpf.setdown();
			this.btn_cwpf.Draw();
			offy+=60;
			this.btn_dj.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==3)this.btn_dj.setdown();
			this.btn_dj.Draw();
			offy+=60;
		}
		
		this.btn_jssb.Move(offx, offy, 210, 60);
		if(this.iSelect1==1)this.btn_jssb.setdown();
		this.btn_jssb.Draw();
		offy+=60;
		if(this.iSelect1==1)
		{
			this.btn_wq.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==0)this.btn_wq.setdown();
			this.btn_wq.Draw();
			offy+=60;
			this.btn_xl.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==1)this.btn_xl.setdown();
			this.btn_xl.Draw();
			offy+=60;
			this.btn_yf.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==2)this.btn_yf.setdown();
			this.btn_yf.Draw();
			offy+=60;
			this.btn_tk.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==3)this.btn_tk.setdown();
			this.btn_tk.Draw();
			offy+=60;
			this.btn_yd.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==4)this.btn_yd.setdown();
			this.btn_yd.Draw();
			offy+=60;
			this.btn_xz.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==5)this.btn_xz.setdown();
			this.btn_xz.Draw();
			offy+=60;
		}
		
		this.btn_bwjfb.Move(offx, offy, 210, 60);
		if(this.iSelect1==2)this.btn_bwjfb.setdown();
		this.btn_bwjfb.Draw();
		offy+=60;
		if(this.iSelect1==2)
		{
			this.btn_49z.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==0)this.btn_49z.setdown();
			this.btn_49z.Draw();
			offy+=60;
			this.btn_69z.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==1)this.btn_69z.setdown();
			this.btn_69z.Draw();
			offy+=60;
			this.btn_89z.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==2)this.btn_89z.setdown();
			this.btn_89z.Draw();
			offy+=60;
		}
		
		this.btn_qgyh.Move(offx, offy, 210, 60);
		if(this.iSelect1==3)this.btn_qgyh.setdown();
		this.btn_qgyh.Draw();
		offy+=60;
		if(this.iSelect1==3)
		{
			this.btn_49t.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==0)this.btn_49t.setdown();
			this.btn_49t.Draw();
			offy+=60;
			this.btn_69t.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==1)this.btn_69t.setdown();
			this.btn_69t.Draw();
			offy+=60;
			this.btn_89t.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==2)this.btn_89t.setdown();
			this.btn_89t.Draw();
			offy+=60;
		}
		
		this.btn_cfb.Move(offx, offy, 210, 60);
		if(this.iSelect1==5)this.btn_cfb.setdown();
		this.btn_cfb.Draw();
		offy+=60;
		if(this.iSelect1==5)
		{
			this.btn_money.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==0)this.btn_money.setdown();
			this.btn_money.Draw();
			offy+=60;
			this.btn_ingot.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==1)this.btn_ingot.setdown();
			this.btn_ingot.Draw();
			offy+=60;
		}
		
		this.btn_hyb.Move(offx, offy, 210, 60);
		if(this.iSelect1==6)this.btn_hyb.setdown();
		this.btn_hyb.Draw();
		offy+=60;
		if(this.iSelect1==6)
		{
			this.btn_thisweek.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==0)this.btn_thisweek.setdown();
			this.btn_thisweek.Draw();
			offy+=60;
			this.btn_previousweek.Move(offx+15, offy, 180, 60);
			if(this.iSelect2==1)this.btn_previousweek.setdown();
			this.btn_previousweek.Draw();
			offy+=60;
		}
		
		this.iDestH=offy;
		M3DFast.gi().NoClip();
		//////////////////////////////////////////////////////////////
		var offw=this.iW-25-25-20-240;
		DrawMode.new_framein(this.iX+25+240+20,this.iY+25,offw,this.iH-50);
		offx=this.iX+25+240+20;
		offy=this.iY+25;
		this.myrank=-1;
//		this.ui_role.BeginDraw(offx+15, offy+15);
//		this.ui_role.DrawUnit(0, 0, "adsf");
//		this.ui_role.FinishDraw();
//		if(1==1)return;
		if(this.iSelect1==0)
		{
			if(this.iSelect2!=2)
			{
				if(this.iSelect2==3)this.ui_role.SetTitle(3, "等级", 160, false);
				else this.ui_role.SetTitle(3, "评分", 160, false);
				this.ui_role.BeginDraw(offx+15, offy+15);
				for(i=0;i<this.iRoleCount+1;i++)
				{
					if(i<this.iRoleCount && this.role_list[i].iRid==GmMe.me.iRid)this.myrank=i;
					if(!this.ui_role.bShow(i))continue;
					if(i==this.iRoleCount)
					{
						this.ui_role.DrawUnit(0, i, "");
						break;
					}
					this.ui_role.DrawUnit(0, i, ""+(i+1));
					if(i<3)
					{
						this.aa_icon.iFrame= i;
						this.ui_role.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
						this.ui_role.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
					}
					
					switch(this.role_list[i].iInitProc)
					{
					case 0:
						GmProtocol.gi().s_LeaderBoardFresh(2, this.role_list[i].iRid, 0);
						this.role_list[i].iInitProc=1;
						break;
					case 1:
						this.ui_role.DrawUnit(1, i, "获取中...");
						break;
					case 2:
						this.ui_role.DrawUnit(1, i, this.role_list[i].sName);
						this.ui_role.DrawUnit(2, i, GameData.sSchools[this.role_list[i].iSchoolId]);
						if(this.iSelect2==0)this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iComplexScore);
						else if(this.iSelect2==1)this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iScore);
						else if(this.iSelect2==3)this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iLev);
						break;
					}
				}
				this.ui_role.FinishDraw();
				
				{//综合评分
					offy+=50+9*40;
//					M3DFast.gi().FillRect_2D(offx+15, offy+15, offx+15+this.iLW, offy+15+40, 0x80ffffff);
					this.btn_self.Move(offx+15, offy+15, this.iLW, 40);
					DrawMode.frame_type4("22号框20_20", offx+15, offy+15, this.iLW, 40, 20, 20);
					if(this.myrank>=0)
					{
						if(this.myrank<3)this.aa_icon.Draw(this.ui_role.OffX(0)-38/2, offy+15+20-32/2, this.myrank);
						else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,""+(this.myrank+1),0xffffffff,20,101,1,1,0,-2,-2);
					}
					else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,"未上榜",0xffffffff,20,101,1,1,0,-2,-2);
					M3DFast.gi().DrawTextEx(this.ui_role.OffX(1),offy+35,GmMe.me.sName,0xffffffff,20,101,1,1,0,-2,-2);
					M3DFast.gi().DrawTextEx(this.ui_role.OffX(2),offy+35,GameData.sSchools[GmMe.me.rbs.iSchoolId],0xffffffff,20,101,1,1,0,-2,-2);
					if(this.iSelect2==0)M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.iComplexScore,0xffffffff,20,101,1,1,0,-2,-2);
					if(this.iSelect2==1)M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.iScore,0xffffffff,20,101,1,1,0,-2,-2);
					if(this.iSelect2==3)M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.rbs.iLev,0xffffffff,20,101,1,1,0,-2,-2);
				}
			}
			else
			{
				this.ui_pet.BeginDraw(offx+15, offy+15);
				for(i=0;i<this.iPetCount+1;i++)
				{
					if(!this.ui_pet.bShow(i))continue;
					if(i==this.iPetCount)
					{
						this.ui_pet.DrawUnit(0, i, "");
						continue;
					}
					this.ui_pet.DrawUnit(0, i, ""+(i+1));
					if(i<3)
					{
						this.aa_icon.iFrame= i;
						this.ui_pet.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
						this.ui_pet.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
					}
					
					switch(this.pet_list[i].iInitProc)
					{
					case 0:
						GmProtocol.gi().s_LeaderBoardFresh(3, this.pet_list[i].iPid, 0);
						this.pet_list[i].iInitProc=1;
						break;
					case 1:
						this.ui_pet.DrawUnit(1, i, "获取中...");
						break;
					case 2:
						this.ui_pet.DrawUnit(1, i, GmPlay.de_pet.strValue(this.pet_list[i].iTid, 0, 1));
						this.ui_pet.DrawUnit(2, i, this.pet_list[i].sOwner);
						this.ui_pet.DrawUnit(3, i, ""+this.pet_list[i].iScore);
						break;
					}
				}
				this.ui_pet.FinishDraw();
				//GmPlay.sop(""+this.iPetCount);
			}
		}

		if(this.iSelect1==1)
		{
			this.ui_equip.BeginDraw(offx+15, offy+15);
			for(i=0;i<this.iEquipCount;i++)
			{
				if(!this.ui_equip.bShow(i))continue;
				this.ui_equip.DrawUnit(0, i, ""+(i+1));
				
				if(i<3)
				{
					this.aa_icon.iFrame=i;
					this.ui_equip.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
					this.ui_equip.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
				}
				
				switch(this.equip_list[i].iInitProc)
				{
				case 0://获取装备信息
					GmProtocol.gi().s_LeaderBoardFresh(1, this.equip_list[i].iGid, 0);
					this.equip_list[i].iInitProc=1;
					break;
				case 1://loading
					this.ui_equip.DrawUnit(1, i, "获取中...");
					break;
				case 2://显示装备信息
					this.ui_equip.DrawUnit(1, i, GmPlay.de_goods.strValue(this.equip_list[i].iTid, 0, 4));
					this.ui_equip.DrawUnit(2, i, this.equip_list[i].sOwner);
					this.ui_equip.DrawUnit(3, i, ""+this.equip_list[i].iScore);
					break;
				}
			}
			this.ui_equip.FinishDraw();
		}
		
		if(this.iSelect1==2)
		{
			this.ui_role.SetTitle(3, "积分", 160, false);
			this.ui_role.BeginDraw(offx+15, offy+15);
			for(i=0;i<this.iRoleCount+1;i++)
			{
				if(i<this.iRoleCount && this.role_list[i].iRid==GmMe.me.iRid)this.myrank=i;
				if(!this.ui_role.bShow(i))continue;
				if(i==this.iRoleCount)
				{
					this.ui_role.DrawUnit(0, i, "");
					break;
				}
				this.ui_role.DrawUnit(0, i, ""+(i+1));
				if(i<3)
				{
					this.aa_icon.iFrame=i;
					this.ui_role.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
//					this.ui_role.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
				}
				switch(this.role_list[i].iInitProc)
				{
				case 0:
					GmProtocol.gi().s_LeaderBoardFresh(2, this.role_list[i].iRid, 0);
					this.role_list[i].iInitProc=1;
					break;
				case 1:
					this.ui_role.DrawUnit(1, i, "获取中...");
					break;
				case 2:
					this.ui_role.DrawUnit(1, i, this.role_list[i].sName);
					this.ui_role.DrawUnit(2, i, GameData.sSchools[this.role_list[i].iSchoolId]);
					this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iFlag16);
					break;
				}
			}
			this.ui_role.FinishDraw();
			
			offy+=50+9*40;
//			M3DFast.gi().FillRect_2D(offx+15, offy+15, offx+15+this.iLW, offy+15+40, 0x80ffffff);
			this.btn_self.Move(offx+15, offy+15, this.iLW, 40);
			DrawMode.frame_type4("22号框20_20", offx+15, offy+15, this.iLW, 40, 20, 20);
			if(this.myrank>=0)
			{
				if(this.myrank<3)this.aa_icon.Draw(this.ui_role.OffX(0)-38/2, offy+15+20-32/2, this.myrank);
				else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,""+(this.myrank+1),0xffffffff,20,101,1,1,0,-2,-2);
			}
			else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,"未上榜",0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(1),offy+35,GmMe.me.sName,0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(2),offy+35,GameData.sSchools[GmMe.me.rbs.iSchoolId],0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.iFlag[16],0xffffffff,20,101,1,1,0,-2,-2);
		}
		if(this.iSelect1==3)
		{
			this.ui_role.SetTitle(3, "综合评分", 160, false);
			this.ui_role.BeginDraw(offx+15, offy+15);
			for(i=0;i<this.iRoleCount+1;i++)
			{
				if(i<this.iRoleCount && this.role_list[i].iRid==GmMe.me.iRid)this.myrank=i;
				if(!this.ui_role.bShow(i))continue;
				if(i==this.iRoleCount)
				{
					this.ui_role.DrawUnit(0, i, "");
					break;
				}
				this.ui_role.DrawUnit(0, i, ""+(i+1));
				if(i<3)
				{
					this.aa_icon.iFrame= i;
					this.ui_role.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
//					this.ui_role.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
				}
				
				switch(this.role_list[i].iInitProc)
				{
				case 0:
					GmProtocol.gi().s_LeaderBoardFresh(2, this.role_list[i].iRid, 0);
					this.role_list[i].iInitProc=1;
					break;
				case 1:
					this.ui_role.DrawUnit(1, i, "获取中...");
					break;
				case 2:
					this.ui_role.DrawUnit(1, i, this.role_list[i].sName);
					this.ui_role.DrawUnit(2, i, GameData.sSchools[this.role_list[i].iSchoolId]);
					this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iComplexScore);
					break;
				}
			}
			this.ui_role.FinishDraw();
			
			offy+=50+9*40;
//			M3DFast.gi().FillRect_2D(offx+15, offy+15, offx+15+this.iLW, offy+15+40, 0x80ffffff);
			this.btn_self.Move(offx+15, offy+15, this.iLW, 40);
			DrawMode.frame_type4("22号框20_20", offx+15, offy+15, this.iLW, 40, 20, 20);
			if(this.myrank>=0)
			{
				if(this.myrank<3)this.aa_icon.Draw(this.ui_role.OffX(0)-38/2, offy+15+20-32/2, this.myrank);
				else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,""+(this.myrank+1),0xffffffff,20,101,1,1,0,-2,-2);
			}
			else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,"未上榜",0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(1),offy+35,GmMe.me.sName,0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(2),offy+35,GameData.sSchools[GmMe.me.rbs.iSchoolId],0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.iComplexScore,0xffffffff,20,101,1,1,0,-2,-2);
		}
		if(this.iSelect1==5)
		{
			if(this.iSelect2==0)this.ui_role.SetTitle(3, "铜币", 160, false);
			else this.ui_role.SetTitle(3, "元宝", 160, false);
			this.ui_role.BeginDraw(offx+15, offy+15);
			for(i=0;i<this.iRoleCount+1;i++)
			{
				if(i<this.iRoleCount && this.role_list[i].iRid==GmMe.me.iRid)this.myrank=i;
				if(!this.ui_role.bShow(i))continue;
				if(i==this.iRoleCount)
				{
					this.ui_role.DrawUnit(0, i, "");
					break;
				}
				this.ui_role.DrawUnit(0, i, ""+(i+1));
				if(i<3)
				{
					this.aa_icon.iFrame= i;
					this.ui_role.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
					this.ui_role.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
				}
				
				switch(this.role_list[i].iInitProc)
				{
				case 0:
					GmProtocol.gi().s_LeaderBoardFresh(2, this.role_list[i].iRid, 0);
					this.role_list[i].iInitProc=1;
					break;
				case 1:
					this.ui_role.DrawUnit(1, i, "获取中...");
					break;
				case 2:
					this.ui_role.DrawUnit(1, i, this.role_list[i].sName);
					this.ui_role.DrawUnit(2, i, GameData.sSchools[this.role_list[i].iSchoolId]);
					this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iMoney);
					break;
				}
			}
			this.ui_role.FinishDraw();
			
			offy+=50+9*40;
//			M3DFast.gi().FillRect_2D(offx+15, offy+15, offx+15+this.iLW, offy+15+40, 0x80ffffff);
			this.btn_self.Move(offx+15, offy+15, this.iLW, 40);
			DrawMode.frame_type4("22号框20_20", offx+15, offy+15, this.iLW, 40, 20, 20);
			if(this.myrank>=0)
			{
				if(this.myrank<3)this.aa_icon.Draw(this.ui_role.OffX(0)-38/2, offy+15+20-32/2, this.myrank);
				else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,""+(this.myrank+1),0xffffffff,20,101,1,1,0,-2,-2);
			}
			else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,"未上榜",0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(1),offy+35,GmMe.me.sName,0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(2),offy+35,GameData.sSchools[GmMe.me.rbs.iSchoolId],0xffffffff,20,101,1,1,0,-2,-2);
			if(this.iSelect2==0)M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+(GmMe.me.rbs.iMoney+GmMe.me.rbs.iStore),0xffffffff,20,101,1,1,0,-2,-2);
			else M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.rbs.iInGot,0xffffffff,20,101,1,1,0,-2,-2);
		}
		
		if(this.iSelect1==6)
		{
			this.ui_role.SetTitle(3, "活跃度积分", 160, false);
			this.ui_role.BeginDraw(offx+15, offy+15);
			for(i=0;i<this.iRoleCount+1;i++)
			{
				if(i<this.iRoleCount && this.role_list[i].iRid==GmMe.me.iRid)this.myrank=i;
				if(!this.ui_role.bShow(i))continue;
				if(i==this.iRoleCount)
				{
					this.ui_role.DrawUnit(0, i, "");
					break;
				}
				this.ui_role.DrawUnit(0, i, ""+(i+1));
				if(i<3)
				{
					this.aa_icon.iFrame= i;
					this.ui_role.DrawUnitEx_Anima(0, i, this.aa_icon, 80-38/2,20-32/2 );
					this.ui_role.DrawUnitEx_Button(0, i, this.btn_explain[i], 100, 5);
				}
				
				switch(this.role_list[i].iInitProc)
				{
				case 0:
					GmProtocol.gi().s_LeaderBoardFresh(2, this.role_list[i].iRid, 0);
					this.role_list[i].iInitProc=1;
					break;
				case 1:
					this.ui_role.DrawUnit(1, i, "获取中...");
					break;
				case 2:
					this.ui_role.DrawUnit(1, i, this.role_list[i].sName);
					this.ui_role.DrawUnit(2, i, GameData.sSchools[this.role_list[i].iSchoolId]);
					this.ui_role.DrawUnit(3, i, ""+this.role_list[i].iMoney);
					break;
				}
			}
			this.ui_role.FinishDraw();
			
			offy+=50+9*40;
//			M3DFast.gi().FillRect_2D(offx+15, offy+15, offx+15+this.iLW, offy+15+40, 0x80ffffff);
			this.btn_self.Move(offx+15, offy+15, this.iLW, 40);
			DrawMode.frame_type4("22号框20_20", offx+15, offy+15, this.iLW, 40, 20, 20);
			if(this.myrank>=0)
			{
				if(this.myrank<3)this.aa_icon.Draw(this.ui_role.OffX(0)-38/2, offy+15+20-32/2, this.myrank);
				else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,""+(this.myrank+1),0xffffffff,20,101,1,1,0,-2,-2);
			}
			else M3DFast.gi().DrawTextEx(this.ui_role.OffX(0),offy+15+20,"未上榜",0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(1),offy+35,GmMe.me.sName,0xffffffff,20,101,1,1,0,-2,-2);
			M3DFast.gi().DrawTextEx(this.ui_role.OffX(2),offy+35,GameData.sSchools[GmMe.me.rbs.iSchoolId],0xffffffff,20,101,1,1,0,-2,-2);
			if(this.iSelect2==0)M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+(GmMe.me.iFlagExt[25]+GmMe.me.iFlagExt[24]),0xffffffff,20,101,1,1,0,-2,-2);
			else
			{
				M3DFast.gi().DrawTextEx(this.ui_role.OffX(3),offy+35,""+GmMe.me.iFlagExt[26],0xffffffff,20,101,1,1,0,-2,-2);
				if(this.myrank>=0 && this.myrank<3)
				{
					this.btn_getprice.Move(this.ui_role.OffX(3)-80,offy+15-1, 160, 42);
					this.btn_getprice.Draw();
				}
			}
		}
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(msg==3)
		{
			if(this.bLocked1)
			{
				this.bLocked1=false;
				return true;
			}
		}
		if(msg==2)
		{
			if(this.bLocked1)
			{
				i=this.iLockY-y;
				this.iOffY-=i;
				this.iLockY=y;
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
		if(this.iSelect1==0)
		{
			if(this.iSelect2!=2)
			{
				if(this.btn_self.ProcTouch(msg, x, y))
				{
					if(this.btn_self.bCheck())
					{
						if(this.iSelect2==0)GmProtocol.gi().s_LeaderBoardFresh(4, GmMe.me.iRid, 0);
						if(this.iSelect2==1 || this.iSelect2==3)GmProtocol.gi().s_WatchOn(0, GmMe.me.iRid, 0, "");
					}
					return true;
				}
				if(this.ui_role.ProcTouch(msg, x, y))
				{
					for(i=0;i<3;i++)
					{
						if(this.btn_explain[i].bCheck())
						{
							FrameMessage.fm.Open("每日0点前排名第"+(i+1)+"的玩家获得称谓"+this._titles[this.iSelect2][i]+"，持续一天");
						}
					}
					i=this.ui_role.iChecked();
					if(i>=0)
					{
						if(i<this.iRoleCount)
						{//点击了一行，获取详细信息
							if(this.iSelect2==0)GmProtocol.gi().s_LeaderBoardFresh(4, this.role_list[i].iRid, 0);
							if(this.iSelect2==1 || this.iSelect2==3)GmProtocol.gi().s_WatchOn(0, this.role_list[i].iRid, 0, "");
						}
					}
					return true;
				}
			}
			else
			{
				if(this.ui_pet.ProcTouch(msg, x, y))
				{
					for(i=0;i<3;i++)
					{
						if(this.btn_explain[i].bCheck())
						{
							FrameMessage.fm.Open("每日0点前排名第"+(i+1)+"的玩家获得称谓"+this._titles[this.iSelect2][i]+"，持续一天");
						}
					}
					i=this.ui_pet.iChecked();
					if(i>=0)
					{
						if(i<this.iPetCount)
						{//点击了一行，获取详细信息
							GmProtocol.gi().s_WatchOn(2, this.pet_list[i].iPid, 0, "");
						}
					}
					return true;
				}
			}
		}
		else if(this.iSelect1==1)
		{
			if(this.ui_equip.ProcTouch(msg, x, y))
			{
				for(i=0;i<3;i++)
				{
					if(this.btn_explain[i].bCheck())
					{
						FrameMessage.fm.Open("每日0点前排名第"+(i+1)+"的玩家获得称谓"+this._titles[4][i]+"，持续一天");
					}
				}
				i=this.ui_equip.iChecked();
				if(i>=0)
				{
					if(i<this.iEquipCount)
					{//点击了一行，获取详细信息
						GmProtocol.gi().s_WatchOn(1, this.equip_list[i].iGid, 0, "");
					}
				}
				return true;
			}
		}
		else if(this.iSelect1==2)
		{
			if(this.btn_self.ProcTouch(msg, x, y))
			{
				if(this.btn_self.bCheck())
				{
					GmProtocol.gi().s_WatchOn(0, GmMe.me.iRid, 0, "");
				}
				return true;
			}
			if(this.ui_role.ProcTouch(msg, x, y))
			{
				i=this.ui_role.iChecked();
				if(i>=0)
				{
					if(i<this.iRoleCount)
					{//点击了一行，获取详细信息
						GmProtocol.gi().s_WatchOn(0, this.role_list[i].iRid, 0, "");
					}
				}
				return true;
			}
		}
		else if(this.iSelect1==3)
		{
			if(this.btn_self.ProcTouch(msg, x, y))
			{
				if(this.btn_self.bCheck())
				{
					GmProtocol.gi().s_LeaderBoardFresh(4, GmMe.me.iRid, 0);
				}
				return true;
			}
			if(this.ui_role.ProcTouch(msg, x, y))
			{
				i=this.ui_role.iChecked();
				if(i>=0)
				{
					if(i<this.iRoleCount)
					{//点击了一行，获取详细信息
						GmProtocol.gi().s_LeaderBoardFresh(4, this.role_list[i].iRid, 0);
					}
				}
				return true;
			}
		}
		else if(this.iSelect1==5 || this.iSelect1==6)
		{
			if(this.iSelect1==6 && this.iSelect2==1)
			{
				if(this.myrank>=0 && this.myrank<3)
				{
					if(this.btn_getprice.ProcTouch(msg, x, y))
					{
						if(this.btn_getprice.bCheck())
						{
							GmProtocol.gi().s_ExtendCmd("领取活跃排行奖励", "", "", "", "", "", "", "");
						}
						return true;
					}
				}
			}
			if(this.btn_self.ProcTouch(msg, x, y))
			{
				if(this.btn_self.bCheck())
				{
					GmProtocol.gi().s_WatchOn(0, GmMe.me.iRid, 0, "");
				}
				return true;
			}
			if(this.ui_role.ProcTouch(msg, x, y))
			{
				for(i=0;i<3;i++)
				{
					if(this.btn_explain[i].bCheck())
					{
						if(this.iSelect1==5)
						{
								if(this.iSelect2==0)FrameMessage.fm.Open("每日0点前排名第"+(i+1)+"的玩家获得称谓"+this._titles[5][i]+"，持续一天");
								else if(this.iSelect2==1)FrameMessage.fm.Open("每日0点前排名第"+(i+1)+"的玩家获得称谓"+this._titles[6][i]+"，持续一天");
						}
						else if(this.iSelect1==6)
						{
							if(i==0)FrameMessage.fm.Open("每周活跃第一的玩家将获得活跃礼包，可获得丰厚奖励，更有概率获得特级技能书");
							else if(i==1)FrameMessage.fm.Open("每周活跃第二的玩家将获得活跃礼包，可获得丰厚奖励");
							else FrameMessage.fm.Open("每周活跃第三的玩家将获得活跃礼包，可获得丰厚奖励");
						}
					}
				}
				i=this.ui_role.iChecked();
				if(i>=0)
				{
					if(i<this.iRoleCount)
					{//点击了一行，获取详细信息
						GmProtocol.gi().s_WatchOn(0, this.role_list[i].iRid, 0, "");
					}
				}
				return true;
			}
		}
		
		//////////////////////////////////////////////////////
		var doget=false;
		if(this.btn_grsl.ProcTouch(msg, x, y))
		{
			if(this.btn_grsl.bCheck())
			{
				if(this.iSelect1!=0)
				{
					this.iSelect1=0;
					this.iSelect2=0;
					doget=true;
				}
			}
		}
		if(this.iSelect1==0)
		{
			if(this.btn_zhpf.ProcTouch(msg, x, y))
			{
				if(this.btn_zhpf.bCheck() && this.iSelect2!=0)
				{
					this.iSelect2=0;
					doget=true;
				}
			}
			if(this.btn_rwpf.ProcTouch(msg, x, y))
			{
				if(this.btn_rwpf.bCheck() && this.iSelect2!=1)
				{
					this.iSelect2=1;
					doget=true;
				}
			}
			if(this.btn_cwpf.ProcTouch(msg, x, y))
			{
				if(this.btn_cwpf.bCheck() && this.iSelect2!=2)
				{
					this.iSelect2=2;
					doget=true;
				}
			}
			if(this.btn_dj.ProcTouch(msg, x, y))
			{
				if(this.btn_dj.bCheck() && this.iSelect2!=3)
				{
					this.iSelect2=3;
					doget=true;
				}
			}
		}
		if(this.btn_jssb.ProcTouch(msg, x, y))
		{
			if(this.btn_jssb.bCheck())
			{
				if(this.iSelect1!=1)
				{
					this.iSelect1=1;
					this.iSelect2=0;
					doget=true;
				}
			}
		}
		if(this.iSelect1==1)
		{
			if(this.btn_wq.ProcTouch(msg, x, y))
			{
				if(this.btn_wq.bCheck() && this.iSelect2!=0)
				{
					this.iSelect2=0;
					doget=true;
				}
			}
			if(this.btn_xl.ProcTouch(msg, x, y))
			{
				if(this.btn_xl.bCheck() && this.iSelect2!=1)
				{
					this.iSelect2=1;
					doget=true;
				}
			}
			if(this.btn_yf.ProcTouch(msg, x, y))
			{
				if(this.btn_yf.bCheck() && this.iSelect2!=2)
				{
					this.iSelect2=2;
					doget=true;
				}
			}
			if(this.btn_tk.ProcTouch(msg, x, y))
			{
				if(this.btn_tk.bCheck() && this.iSelect2!=3)
				{
					this.iSelect2=3;
					doget=true;
				}
			}
			if(this.btn_yd.ProcTouch(msg, x, y))
			{
				if(this.btn_yd.bCheck() && this.iSelect2!=4)
				{
					this.iSelect2=4;
					doget=true;
				}
			}
			if(this.btn_xz.ProcTouch(msg, x, y))
			{
				if(this.btn_xz.bCheck() && this.iSelect2!=5)
				{
					this.iSelect2=5;
					doget=true;
				}
			}
		}
		if(this.btn_bwjfb.ProcTouch(msg, x, y))
		{
			if(this.btn_bwjfb.bCheck())
			{
				this.iSelect1=2;
				this.iSelect2=0;
				doget=true;
			}
		}
		if(this.iSelect1==2)
		{
			if(this.btn_49z.ProcTouch(msg, x, y))
			{
				if(this.btn_49z.bCheck() && this.iSelect2!=0)
				{
					this.iSelect2=0;
					doget=true;
				}
			}
			if(this.btn_69z.ProcTouch(msg, x, y))
			{
				if(this.btn_69z.bCheck() && this.iSelect2!=1)
				{
					this.iSelect2=1;
					doget=true;
				}
			}
			if(this.btn_89z.ProcTouch(msg, x, y))
			{
				if(this.btn_89z.bCheck() && this.iSelect2!=2)
				{
					this.iSelect2=2;
					doget=true;
				}
			}
		}
		if(this.btn_qgyh.ProcTouch(msg, x, y))
		{
			if(this.btn_qgyh.bCheck())
			{
				this.iSelect1=3;
				this.iSelect2=0;
				doget=true;
			}
		}
		if(this.iSelect1==3)
		{
			if(this.btn_49t.ProcTouch(msg, x, y))
			{
				if(this.btn_49t.bCheck() && this.iSelect2!=0)
				{
					this.iSelect2=0;
					doget=true;
				}
			}
			if(this.btn_69t.ProcTouch(msg, x, y))
			{
				if(this.btn_69t.bCheck() && this.iSelect2!=1)
				{
					this.iSelect2=1;
					doget=true;
				}
			}
			if(this.btn_89t.ProcTouch(msg, x, y))
			{
				if(this.btn_89t.bCheck() && this.iSelect2!=2)
				{
					this.iSelect2=2;
					doget=true;
				}
			}
		}
		if(this.btn_cfb.ProcTouch(msg, x, y))
		{
			if(this.btn_cfb.bCheck())
			{
				this.iSelect1=5;
				this.iSelect2=0;
				doget=true;
			}
		}
		if(this.iSelect1==5)
		{
			if(this.btn_money.ProcTouch(msg, x, y))
			{
				if(this.btn_money.bCheck() && this.iSelect2!=0)
				{
					this.iSelect2=0;
					doget=true;
				}
			}
			if(this.btn_ingot.ProcTouch(msg, x, y))
			{
				if(this.btn_ingot.bCheck() && this.iSelect2!=1)
				{
					this.iSelect2=1;
					doget=true;
				}
			}
		}
		if(this.btn_hyb.ProcTouch(msg, x, y))
		{
			if(this.btn_hyb.bCheck())
			{
				this.iSelect1=6;
				this.iSelect2=0;
				doget=true;
			}
		}
		if(this.iSelect1==6)
		{
			if(this.btn_thisweek.ProcTouch(msg, x, y))
			{
				if(this.btn_thisweek.bCheck() && this.iSelect2!=0)
				{
					this.iSelect2=0;
					doget=true;
				}
			}
			if(this.btn_previousweek.ProcTouch(msg, x, y))
			{
				if(this.btn_previousweek.bCheck() && this.iSelect2!=1)
				{
					this.iSelect2=1;
					doget=true;
				}
			}
		}
		if(doget)
		{
			this.iRoleCount=0;
			this.iPetCount=0;
			this.iEquipCount=0;
			GmProtocol.gi().s_LeaderBoardFresh(0, this.iSelect1, this.iSelect2);
			XStat.gi().PushStat(XStat.GS_LOADING1);
		}
		if(XDefine.bInRect(x, y, this.iX+40, this.iY+40, 210, this.iH-80))
		{
			if(msg==1)this.iLockY=y;
			if(msg==2)
			{
				if(!this.bLocked1)
				{
					i=this.iLockY-y;
					if(i<-15 || i>15)
					{//取消按键按下状态
						this.bLocked1=true;
						this.btn_grsl.SetNormal();//个人实力
						this.btn_zhpf.SetNormal();//综合评分
						this.btn_rwpf.SetNormal();//人物评分
						this.btn_cwpf.SetNormal();//宠物评分
						this.btn_dj.SetNormal();//等级

						this.btn_jssb.SetNormal();//绝世神兵
						this.btn_wq.SetNormal();//武器
						this.btn_xl.SetNormal();//项链
						this.btn_yf.SetNormal();//衣服
						this.btn_tk.SetNormal();//头盔
						this.btn_yd.SetNormal();//腰带
						this.btn_xz.SetNormal();//鞋子
						
						this.btn_bwjfb.SetNormal();//上届比武积分榜
						this.btn_49z.SetNormal();
						this.btn_69z.SetNormal();
						this.btn_89z.SetNormal();
						
						this.btn_qgyh.SetNormal();//七国英豪
						this.btn_49t.SetNormal();
						this.btn_69t.SetNormal();
						this.btn_89t.SetNormal();
						
						this.btn_cfb.SetNormal();//财富榜
						this.btn_money.SetNormal();
						this.btn_ingot.SetNormal();
						
						this.btn_hyb.SetNormal();//活跃榜
						this.btn_thisweek.SetNormal();
						this.btn_previousweek.SetNormal();
					}
				}
			}
		}

		return false;
	}


	_LeaderBoardFresh( pls)
	{
		var i,j;
		var type=pls.GetNextInt();
		var cs1=pls.GetNextInt();
		var cs2=pls.GetNextInt();
		switch(type)
		{
		case 0:
			if(cs1==0)
			{
//				GmPlay.sop("cs1="+cs1+",,,,cs2="+cs2);
//				GmPlay.sop("this.iSelect1="+this.iSelect1+",,,,this.iSelect2="+this.iSelect2);
				if(this.iSelect2!=2 && this.iSelect2==cs2)
				{
					this.iRoleCount=pls.GetNextByte();
					for(i=0;i<this.iRoleCount;i++)
					{
						this.role_list[i].iRid=pls.GetNextInt();
						this.role_list[i].iInitProc=0;
					}
				}
				else if(this.iSelect2==cs2)
				{
					this.iPetCount=pls.GetNextByte();
					for(i=0;i<this.iPetCount;i++)
					{
						this.pet_list[i].iPid=pls.GetNextInt();
						this.pet_list[i].iInitProc=0;
					}
				}
			}
			if(cs1==1)
			{
				if(this.iSelect1==1 && this.iSelect2==cs2)
				{
					this.iEquipCount=pls.GetNextByte();
					for(i=0;i<this.iEquipCount;i++)
					{
						this.equip_list[i].iGid=pls.GetNextInt();
						this.equip_list[i].iInitProc=0;
					}
				}
			}
			if(cs1==2)
			{
				if(this.iSelect1==cs1 && this.iSelect2==cs2)
				{
					this.iRoleCount=pls.GetNextByte();
					for(i=0;i<this.iRoleCount;i++)
					{
						this.role_list[i].iRid=pls.GetNextInt();
						this.role_list[i].iFlag16=pls.GetNextInt();
						this.role_list[i].iInitProc=0;
					}
				}
			}
			if(cs1==3)
			{
				if(this.iSelect1==cs1 && this.iSelect2==cs2)
				{
					this.iRoleCount=pls.GetNextByte();
					for(i=0;i<this.iRoleCount;i++)
					{
						this.role_list[i].iRid=pls.GetNextInt();
						this.role_list[i].iInitProc=0;
					}
				}
			}
			if(cs1==5 || cs1==6)
			{
				if(this.iSelect1==cs1 && this.iSelect2==cs2)
				{
					this.iRoleCount=pls.GetNextByte();
					for(i=0;i<this.iRoleCount;i++)
					{
						this.role_list[i].iRid=pls.GetNextInt();
						this.role_list[i].iMoney=pls.GetNextInt();
						this.role_list[i].iInitProc=0;
					}
				}
			}
			break;
		case 1:
			if(this.iSelect1==1)
			{
				for(i=0;i<this.iEquipCount;i++)
				{
					if(this.equip_list[i].iInitProc==1 && this.equip_list[i].iGid==cs1)
					{
						this.equip_list[i].iTid=pls.GetNextInt();
						this.equip_list[i].iRid=pls.GetNextInt();
						this.equip_list[i].iScore=pls.GetNextInt();
						this.equip_list[i].sOwner=pls.GetNextString();
						this.equip_list[i].iInitProc=2;
					}
				}
			}
			break;
		case 2:
			if((this.iSelect1==0 && this.iSelect2!=2) || this.iSelect1==2 || this.iSelect1==3 || this.iSelect1==5 || this.iSelect1==6)
			{
					for(i=0;i<this.iRoleCount;i++)
					{
						if(this.role_list[i].iInitProc==1 && this.role_list[i].iRid==cs1)
						{
							this.role_list[i].sName=pls.GetNextString();
							this.role_list[i].iSchoolId=pls.GetNextInt();
							this.role_list[i].iComplexScore=pls.GetNextInt();
							this.role_list[i].iScore=pls.GetNextInt();
							this.role_list[i].iLev=pls.GetNextInt();
							this.role_list[i].iInitProc=2;
						}
					}
			}
			break;
		case 3:
			if(this.iSelect1==0)
			{
				if(this.iSelect2==2)
				{
					for(i=0;i<this.iPetCount;i++)
					{
						if(this.pet_list[i].iInitProc==1 && this.pet_list[i].iPid==cs1)
						{
							this.pet_list[i].iTid=pls.GetNextInt();
							this.pet_list[i].iScore=pls.GetNextInt();
							this.pet_list[i].iRid=pls.GetNextInt();
							this.pet_list[i].sOwner=pls.GetNextString();
							this.pet_list[i].iInitProc=2;
						}
					}
				}
			}
			break;
		case 4://获得人物种族性别染色武器，并打开信息界面
			for(i=0;i<this.iRoleCount;i++)
			{
				if(this.role_list[i].iRid==cs1)
				{
					var ras=pls.GetNextInt();
					var color=pls.GetNextInt();
					var weap=pls.GetNextInt();
					if(i==0)j=this.role_list[i].iComplexScore-this.role_list[i+1].iComplexScore;
					else j=this.role_list[i-1].iComplexScore-this.role_list[i].iComplexScore;
					LeaderBoardRole.Open(this.role_list[i].iRid,this.role_list[i].sName,this.role_list[i].iComplexScore,this.role_list[i].iScore,ras,color,weap,i+1,j);
					return;
				}
			}
			if(cs1==GmMe.me.iRid)
			{
				var ras=pls.GetNextInt();
				var color=pls.GetNextInt();
				var weap=pls.GetNextInt();
				LeaderBoardRole.Open(GmMe.me.iRid,GmMe.me.sName,GmMe.me.iComplexScore,GmMe.me.iScore,ras,color,weap,0,0);
			}
			break;
		}
	}
}
LeaderBoardFrame.LeaderBoardFresh=function( pls)
{
	while(XStat.gi().LastStatType(0)==XStat.GS_LOADING1)XStat.gi().PopStat(1);
	if(XStat.gi().LastStatType(0)==XStat.GS_LEADERBOARDFRAME)
	{
		var lbf= XStat.gi().LastStat(0);
		lbf._LeaderBoardFresh(pls);
	}
}