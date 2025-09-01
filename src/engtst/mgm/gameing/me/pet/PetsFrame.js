
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import XInput from "../../../../../engine/control/XInput"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"
import AddPoint from "../../../../../engtst/mgm/gameing/me/AddPoint"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../../engtst/mgm/gameing/me/MyAttFrame"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import MyGoods from "../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import FusePet from "../../../../../engtst/mgm/gameing/me/pet/fuse/FusePet"

import MyPets from "./MyPets"
import LearnPetSkill from "./LearnPetSkill"
import WashPet from "./WashPet"
import PetEat from "./PetEat"
import { eventMgr } from "../../../../../engine/event/EventManager"

export default class PetsFrame extends BaseClass{
	
	constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=915;
		this.iH=610;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_skilllist=new Array(12);
		this.btn_page=new Array(2);
		for(i=0;i<2;i++)
		{
			this.btn_page[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_page[i].Move(this.iX+this.iW-15, this.iY+40+130*i, 50, 140);
			this.btn_page[i].InitButton("右侧标签");
			//if(i==0)this.btn_page[i].InitButton("标签按钮上");
			//else if(i==1)this.btn_page[i].InitButton("标签按钮下");
			//else this.btn_page[i].InitButton("标签按钮中");
		}
		
		
		//this.iX+56+i%4*92, this.iY+391+i/4*92
		
		this.btn_petlist=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_petlist[i]=new XButton(GmPlay.xani_ui);
			this.btn_petlist[i].bSingleButton=true;
			//this.btn_petlist[i].InitButton("统一按钮2");
			this.btn_petlist[i].Move(this.iX+56+i%4*92,this.iY+391+parseInt(i/4)*92, 83, 83);
			this.btn_petlist[i].iNameSize=25;
		}
		this.iPetPoint=0;
		this.aa_pet=null;
		
		this.btn_joinfight=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_joinfight.InitButton("按钮1_110");
		this.btn_joinfight.sName="参 战";
		this.btn_joinfight.Move(this.iX+471,this.iY+446,110,52);
		
		this.btn_fusepet=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_fusepet.InitButton("按钮1_110");
		this.btn_fusepet.sName="炼 妖";
		this.btn_fusepet.Move(this.iX+603,this.iY+446,110,52);
		
		this.btn_follow=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_follow.InitButton("按钮1_110");
		this.btn_follow.sName="观 看";
		this.btn_follow.Move(this.iX+471 ,this.iY+512,110,52);
		
		this.btn_changename=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_changename.InitButton("宠物改名按钮");
		//this.btn_changename.sName="改 名";
		this.btn_changename.Move(this.iX+300,this.iY+50,60,60);
		
		this.iPage=0;
	/*	btn_base=new XButton(GmPlay.xani_ui);
		btn_base.InitButton("统一中按钮4");
		btn_base.sName="基本属性";
		btn_base.Move(this.iX+390,this.iY,130,40);
		
		btn_skill=new XButton(GmPlay.xani_ui);
		btn_skill.InitButton("统一中按钮4");
		btn_skill.sName="资质技能";
		btn_skill.Move(this.iX+390+130+40,this.iY,130,40);
		*/
		this.btn_drop=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_drop.InitButton("按钮1_110");
		this.btn_drop.sName="放 生";
		this.btn_drop.Move(this.iX+735,this.iY+512,110,52);
		
		this.btn_addpoint=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_addpoint.InitButton("按钮1_110");
		this.btn_addpoint.sName="加 点";
		this.btn_addpoint.Move(this.iX+735,this.iY+446,110,52);
		
		this.btn_learn=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_learn.InitButton("按钮1_110");
		this.btn_learn.sName="学技能";
		this.btn_learn.Move(this.iX+460,this.iY+260,110,52);
		
		this.btn_wash=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_wash.InitButton("按钮1_110");
		this.btn_wash.sName="洗 炼";
		this.btn_wash.Move(this.iX+460+145,this.iY+260,110,52);
		
		this.btn_eat=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_eat.InitButton("按钮1_110");
		this.btn_eat.sName="喂 养";
		this.btn_eat.Move(this.iX+460+145*2,this.iY+260,110,52);
		
		this.in_name=new XInput(GmPlay.xani_ui);
		this.in_name.Move(GmConfig.SCRW, GmConfig.SCRH, 10,10);
		this.in_name.sDetail="";
		this.bEditingName=false;

		 this.iScrollY=0;
		 this.iLockScroll=-1;
	}

	Draw()
	{
		if(MyPets.mp.iPetCount<=0)
		{
			XStat.gi().PopStat(1);
			return;
		}
		var i;
		var ppet;
		//DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"宠物");
//		GmPlay.xani_ui3.DrawAnima(this.iX, this.iY, "基本大框",0);

		//xuc 0327 =============
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "宠", "物");

		var offxx,offyy,offww,offhh;
		
		offxx=this.iX+28;
		offyy=this.iY+28;
		offww=395;
		offhh=553;
		
		DrawMode.new_framein(offxx,offyy,offww,offhh);//左背景
		
		if(this.iPage == 0){
			
			offxx=offxx+offww+15;
			offww=450;
			offhh=385;
			
			DrawMode.new_framein(offxx,offyy,offww,offhh);//右上背景
			
			offyy=offyy+offhh+15;
			offhh=153;
		
			DrawMode.new_framein(offxx,offyy,offww,offhh);//右下背景
		}
		else{
			
			offxx=offxx+offww+15;
			offww=450;
			offhh=553;
			
			DrawMode.new_framein(offxx,offyy,offww,offhh);//右背景
		}
		//12.17
		//if(this.iPage==0)DrawMode.ui3_BaseFrame4(this.iX,this.iY,"宠","物","属","性");
		//else if(this.iPage==1)DrawMode.ui3_BaseFrame4(this.iX,this.iY,"资","质","技","能");

		//12.17 宠物图标背景框
		//DrawMode.ui3_Frame1(this.iX+220, this.iY+40, 180, 180);
		
		//12.18
		//GmPlay.xani_ui3.DrawAnima(this.iX+190, this.iY, "大框分割线",0);
		
		//12.17
		for(i=0;i<2;i++)
		{
			if(this.iPage==i)
			{
				this.btn_page[i].bMouseIn=true;
				this.btn_page[i].bMouseDown=true;
			}
			this.btn_page[i].Draw();
//			GmPlay.xani_ui3.DrawAnima(this.btn_page[i].iX, this.btn_page[i].iY, "标签文字_人物",i);
		
			//if(i==0)DrawMode.ui3_TagText4(this.btn_page[i].iX, this.btn_page[i].iY,"宠","物","属","性");
			//else if(i==1)DrawMode.ui3_TagText4(this.btn_page[i].iX, this.btn_page[i].iY,"资","质","技","能");
			if(this.iPage==0)
			{	DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*0, 40, 70,true,"宠","物","属","性");
				DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*1, 40, 70,false,"资","质","技","能");
			}
			else{
				DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*0, 40, 70,false,"宠","物","属","性");
				DrawMode.new_lableword4(this.iX+this.iW-15, this.iY+50+130*1, 40, 70,true,"资","质","技","能");
			}
		}

		this.btn_close.Draw();
		if(this.iPetPoint>=MyPets.mp.iPetCount)this.iPetPoint=0;
		ppet=MyPets.mp.pets[this.iPetPoint];
		var ox,oy;
		for(i=0;i<8;i++)
		{
//			this.btn_petlist[i].sName=MyPets.mp.pets[i].sName;
			GmPlay.xani_nui2.DrawAnima(this.iX+56+i%4*92,this.iY+391+parseInt(i/4)*92, "宠物头像框",0);

			if(i>=MyPets.mp.iPetCount)continue;
			ox=this.iX+56+i%4*92;
			oy=this.iY+391+parseInt(i/4)*92;
			GmPlay.xani_head.DrawAnima_aa(ox,oy,GmPlay.de_pet.strValue(MyPets.mp.pets[i].iTid, 0, 1),0);//宠物头像
			
			if(GmMe.me.iFightPid==MyPets.mp.pets[i].iPid)
				GmPlay.xani_nui2.DrawAnima(ox,oy, "宠物头像框",1);//参战标签

			if((parseInt(MyPets.mp.pets[i].iFlag/100)%10)!=0)
			{//系统绑定
				M3DFast.gi().DrawText_2(ox-6,oy+80, "绑", 0xff6bfff4, 26, 101, 1, 1, 0, 0, -3, 4, 0xff000000);
			}
			if(this.iPetPoint==i)
			{//选中的宠物，按钮设为按下状态
//				this.btn_petlist[i].bMouseIn=true;
//				this.btn_petlist[i].bMouseDown=true;
				GmPlay.xani_nui2.DrawAnimaEx(ox,oy, "头像选中框",0,101,1,1,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32
			}
			//this.btn_petlist[i].Draw();
		}
	//	DrawMode.Frame2_MD(this.iX+150, this.iY+65, this.iW-160, this.iH-75);
		
		
		//////怪物身体
//		if(this.aa_pet==null || iLastPetPoint!=this.iPetPoint)
//		{
//			this.aa_pet=GmPlay.xani_pets[ppet.iTid].InitAnimaWithName("站立_右下",null);
//			iLastPetPoint=this.iPetPoint;
//		}
		GmPlay.xani_nui2.DrawAnima(this.iX+28+395/2-260/2,this.iY+112, "宠物背景",0);
		FireworksEffect.DrawAura(0, this.iX+220, this.iY+280, null, 0);//宠物
		ppet.aa_body.Draw(this.iX+220, this.iY+280);
		ppet.aa_body.NextFrame();
		
		
//		for(i=0;i<ppet.iStar;i++)GmPlay.xani_ui4.DrawAnima(this.iX+220+30+i*30, this.iY+40+180-30, "黄色五角星",0);
//		this.aa_pet.Draw(offx+120, offy+140);
//		this.aa_pet.NextFrame();
		
		PetsFrame.wordframe(this.iX+28+395/2-160/2,this.iY+63,160);
		M3DFast.gi().DrawText_2(this.iX+28+395/2, this.iY+63+16, MyPets.mp.pets[this.iPetPoint].sName, 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		this.btn_changename.Draw();
		MyPets.mp.pets[this.iPetPoint].CalcPetScore();
		M3DFast.gi().DrawText_2(this.iX+28+395/2, this.iY+63+16 + 40, "评分:"+MyPets.mp.pets[this.iPetPoint].iScore, 0xffffffff, 26, 101, 1, 1, 0, -2, -2, 3, 0xff000000);

		//进阶星星
		for(i=0;i<5;i++)
		{//ppet.iStar
			if(i<ppet.iStar)GmPlay.xani_nui2.DrawAnima(this.iX+54,this.iY+129+40*i, "宠物进阶星星",1);
			else GmPlay.xani_nui2.DrawAnima(this.iX+54,this.iY+129+40*i, "宠物进阶星星",0);
//			GmPlay.xani_ui4.DrawAnima(this.iX+220+30+i*30, this.iY+40+180-30, "黄色五角星",0);
		}
		
//		DrawMode.new_frameon(10, 10, 100, 100, 0);
		
//		//宠物类型红印
//		if((ppet.iBaobao&1)!=0)
//		{//宝宝
//			if((ppet.iBaobao&2)!=0);//变异宝宝
//			else;//宝宝
//		}
//		else
//		{//野生
//			if((ppet.iBaobao&2)!=0);//变异野生
//			else;//野生
//		}
		GmPlay.xani_nui2.DrawAnima(this.iX+380,this.iY+173, "宠物类型红印",ppet.iBaobao&3);
		
	//	DrawMode.ui3_Text1(this.iX+184,this.iY+341,70,105,"等级",""+ppet.iLev);
		M3DFast.gi().DrawText_2(this.iX+224,this.iY+340, ppet.iLev+"级", 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(this.iX+340,this.iY+340, "仙露仙桃："+ppet.iFlag%100, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);

		if(this.iPage==0)
		{
	//		btn_base.bMouseIn=true;
	//		btn_base.bMouseDown=true;
			PetsFrame.Draw_Base1(this.iX+470,this.iY+60,ppet);
			PetsFrame.Draw_Base2(this.iX+470,this.iY+190,ppet);
			
			this.btn_drop.Draw();
			this.btn_addpoint.Draw();
			
			if(GmMe.me.iFightPid==ppet.iPid)
				{
					this.btn_joinfight.sName="休 息";
				}
			else this.btn_joinfight.sName="参 战";
			this.btn_joinfight.Draw();
			this.btn_fusepet.Draw();
			if(GmMe.me.iFollowPid==ppet.iPid)this.btn_follow.sName="隐 藏";
			else this.btn_follow.sName="跟 随";
			this.btn_follow.Draw();
			
		}
		else if(this.iPage==1)
		{
			this.btn_eat.Draw();
			this.btn_learn.Draw();
			this.btn_wash.Draw();
			
			this.Draw_Base3(this.iX+460,this.iY+58,ppet);
		}

		if(this.bEditingName){
			this.in_name.onscr();
			ppet.sName=this.in_name.sDetail;
			if(this.in_name.bFinished)
			{//编辑完成//发送到服务器改名
//				GmPlay.sop("send name");
				this.bEditingName=false;
				this.in_name.bFinished=false;
				GmProtocol.gi().s_ChangePetName(ppet.iPid, this.in_name.sDetail);
			}
		}
		
		if(Confirm1.end(Confirm1.CONFIRM_DROPPET))
		{
			if(Confirm1.bConfirm)
			{//同意丢弃宠物
				if(GmMe.me.bHaveLock && GmMe.me.bLocked)EasyMessage.easymsg.AddMessage("未解锁不能放生");
				else
				{
					if(GmMe.me.iFightPid==ppet.iPid)GmMe.me.iFightPid=0;
					GmProtocol.gi().s_DropPet(ppet.iPid);
					MyPets.mp.RemovePet(ppet.iPid);
					this.iPetPoint=0;
				}
			}
		}
		
		if(Confirm1.end(Confirm1.CONFIRM_WASHPET) || Confirm1.end(Confirm1.CONFIRM_WASHPETBYINGOT))
		{
			if(Confirm1.bConfirm)
			{//洗宝宝
				GmProtocol.gi().s_WashPet(MyPets.mp.pets[this.iPetPoint].iPid, this.iWashGid);
			}
		}
		
		if(AddPoint.end(AddPoint.ADDPOINT_PET))
		{
			if(AddPoint.bConfirm)
			{
				GmProtocol.gi().s_AddPetPoint(ppet.iPid,AddPoint.iModifys[0],AddPoint.iModifys[1],AddPoint.iModifys[2],AddPoint.iModifys[3],AddPoint.iModifys[4]);
				for(i=0;i<5;i++)ppet.iBaseAtt[i]+=AddPoint.iModifys[i];
				MyPets.CalcFightAtt(ppet);
			}
		}
	}

	Draw_Base3( x, y, p)
	{
		var i;
		var xx,yy;
		
		DrawMode.ui3_Text1_4word(x+3, y,110,100,"体质资质",""+p.zz[0]);
		DrawMode.ui3_Text1_4word(x+3, y+40,110,100,"法力资质",""+p.zz[1]);
		DrawMode.ui3_Text1_4word(x+3, y+80,110,100,"力量资质",""+p.zz[2]);
		DrawMode.ui3_Text1_4word(x+3, y+120,110,100,"耐力资质",""+p.zz[3]);
		DrawMode.ui3_Text1_4word(x+3, y+160,110,100,"敏捷资质",""+p.zz[4]);
		
		DrawMode.ui3_Text1_(x+236, y,67,100,"成长",""+MyPets.swapcz(p.cz));
		
		if(p.iLife>30000)DrawMode.ui3_Text1_(x+236, y+40,67,100,"寿命","永生");
		else DrawMode.ui3_Text1_(x+236, y+40,67,100,"寿命",""+p.iLife);
		
		y+=223;
		x+=6;
		y+=47;
		
		this.iScrollRectX=x;
		this.iScrollRectY=y;
		this.iScrollRectW=102*4;
		this.iScrollRectH=97*2+40;
		
		var detailx=-1,detaily=-1,detailp=-1;
		M3DFast.gi().SetViewClip(x-6, y-6, x+400, y+97*2+40);
		for(i=0;i<12;i++)
		{
//			if(p.jn[i]>0)
			{//有技能
				xx=x+i%4*102;
				yy=y+parseInt(i/4)*97-this.iScrollY;
				if(this.btn_skilllist[i]==null)
				{
					this.btn_skilllist[i]=new XButtonEx2(GmPlay.xani_nui2);
					this.btn_skilllist[i].bSingleButton=true;
				}
				this.btn_skilllist[i].Move(xx,yy,92,92);
			//	GmPlay.xani_ui.DrawAnima(xx, yy, "物品格",0);
				GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",0);
//				M3DFast.gi().DrawRect_2D(xx, yy, xx+60, yy+60, 0xffffffff);
				if(i<p.iSkillBlock && p.jn[i]>0)
				{
					GmPlay.xani_nicon.DrawAnima_aa(xx, yy, GmPlay.de_skill.strValue(p.jn[i], 0, 5),0);
					if(this.btn_skilllist[i].bMouseDown)
					{
						detailp=i;
						detailx=xx;
						detaily=yy;
					}
				}
				if(i>=p.iSkillBlock)GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",1);
			}
		}
		M3DFast.gi().NoClip();
		if(detailp>=0)MyAttFrame.Skill_Detail(p.jn[detailp], detailx, detaily, -1);
	}

	ProcTouch( msg, x, y)
	{
		var i;
		
		for(i=0;i<2;i++)
		{
			if(this.btn_page[i].ProcTouch(msg, x, y))
			{
				if(this.btn_page[i].bCheck())
				{
					//if(i==4)EasyMessage.easymsg.AddMessage("功能暂未开放");
					//else this.iPage=i;
					this.iPage = i;
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
		
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{//选择宠物
			if(this.btn_petlist[i].ProcTouch(msg, x, y))
			{
				if(this.btn_petlist[i].bCheck())
				{
					this.iPetPoint=i;
				}
//				return true;
			}
		}
		
/*		if(btn_base.ProcTouch(msg, x, y))
		{
			if(btn_base.bCheck())
			{
				this.iPage=0;
			}
		}
		if(btn_skill.ProcTouch(msg, x, y))
		{
			if(btn_skill.bCheck())
			{
				this.iPage=1;
			}
		}
	*/	
		if(this.btn_changename.ProcTouch(msg, x, y))
		{
			if(this.btn_changename.bCheck())
			{
				console.log('改名')
				this.bEditingName=true;
				this.in_name.Move(this.btn_changename.iX,this.btn_changename.iY,this.btn_changename.iW,this.btn_changename.iH);
				this.in_name.sDetail=MyPets.mp.pets[this.iPetPoint].sName;
				this.in_name.ProcTouch(3,GmConfig.SCRW+1,GmConfig.SCRH+1);
				eventMgr.eventOnce("onKeyboardComplete",()=>{
					if(this.in_name.sDetail!='')
						this.in_name.bFinished = true;
					else{
						this.bEditingName = false;
						this.in_name.sDetail=MyPets.mp.pets[this.iPetPoint].sName;
					}
				},this);
			}
		}
		if(this.iPage==0)
		{//参战，跟随，放生，加点
			if(this.btn_fusepet.ProcTouch(msg, x, y))
			{
				if(this.btn_fusepet.bCheck())
				{
					XStat.gi().PopStat(1);
					FusePet.Open();
				}
			}
			if(this.btn_joinfight.ProcTouch(msg, x, y))
			{
				if(this.btn_joinfight.bCheck())
				{
					if(GmMe.me.iFightPid==MyPets.mp.pets[this.iPetPoint].iPid)
					{
						GmMe.me.iFightPid=0;
						GmProtocol.gi().s_ChangeFightPet(GmMe.me.iFightPid);
					}
					else
					{
						if(MyPets.mp.pets[this.iPetPoint].iLev>GmMe.me.rbs.iLev+10)FrameMessage.fm.Open("宠物超过人物10级不会出战");
						else if(GmMe.me.rbs.iLev<GmPlay.de_pet.intValue(MyPets.mp.pets[this.iPetPoint].iTid,0,2))FrameMessage.fm.Open("参战要求人物达到"+GmPlay.de_pet.intValue(MyPets.mp.pets[this.iPetPoint].iTid,0,2)+"级");
						else
						{
							GmMe.me.iFightPid=MyPets.mp.pets[this.iPetPoint].iPid;
							GmProtocol.gi().s_ChangeFightPet(GmMe.me.iFightPid);
						}
					}
				}
			}
			if(this.btn_follow.ProcTouch(msg, x, y))
			{
				if(this.btn_follow.bCheck())
				{
					if(GmMe.me.iFollowPid==MyPets.mp.pets[this.iPetPoint].iPid)GmMe.me.iFollowPid=0;
					else GmMe.me.iFollowPid=MyPets.mp.pets[this.iPetPoint].iPid;
					GmProtocol.gi().s_ChangeFollowPet(GmMe.me.iFollowPid);
				}
			}
			if(this.btn_drop.ProcTouch(msg, x, y))
			{
				if(this.btn_drop.bCheck())
				{
					Confirm1.start(Confirm1.CONFIRM_DROPPET,"是否确认把#c00ff00["+MyPets.mp.pets[this.iPetPoint].sName+"]#o放生？");
				}
			}
			if(this.btn_addpoint.ProcTouch(msg, x, y))
			{
				if(this.btn_addpoint.bCheck())
				{//加点
					var ppet=MyPets.mp.pets[this.iPetPoint];
					if(MyPets.mp.pets[this.iPetPoint].nut<=0)EasyMessage.easymsg.AddMessage("当前没有剩余点数可以加");
					else AddPoint.start(AddPoint.ADDPOINT_PET,ppet.tz, ppet.fl, ppet.ll, ppet.nl, ppet.mj, ppet.nut);
				}
			}
		}
		else if(this.iPage==1)
		{//学习，喂养，点技能
			if(this.btn_learn.ProcTouch(msg, x, y))
			{
				if(this.btn_learn.bCheck())
				{
					LearnPetSkill.Open(MyPets.mp.pets[this.iPetPoint]);
				}
			}
			if(this.btn_eat.ProcTouch(msg, x, y))
			{
				if(this.btn_eat.bCheck())
				{//食用
					PetEat.Open(MyPets.mp.pets[this.iPetPoint]);
				}
			}
			if(this.btn_wash.ProcTouch(msg, x, y))
			{
				if(this.btn_wash.bCheck())
				{//洗练,
					if(MyPets.mp.pets[this.iPetPoint].iPid==GmMe.me.iFightPid)FrameMessage.fm.Open("不能洗练参战宠物");
					else if((MyPets.mp.pets[this.iPetPoint].iBaobao&2)==0)
					{
						if(MyGoods.bHaveGoods(160, 1))
						{
							this.iWashGid=MyGoods.gi().GetGid(160);
							Confirm1.start(Confirm1.CONFIRM_WASHPET,"是否确定消耗一个仙灵果对#c00ff00["+MyPets.mp.pets[this.iPetPoint].sName+"]#o进行洗练？");
						}
						else if(GmMe.me.rbs.iInGot>=10)
						{
							this.iWashGid=0;
							Confirm1.start(Confirm1.CONFIRM_WASHPETBYINGOT,"背包中没有仙灵果，是否花费10元宝购买仙灵果对#c00ff00["+MyPets.mp.pets[this.iPetPoint].sName+"]#o进行洗练？");
						}
						else FrameMessage.fm.Open("背包中没有仙灵果");
					}
					else
					{
						if(MyGoods.bHaveGoods(161, 1))
						{
							this.iWashGid=MyGoods.gi().GetGid(161);
							Confirm1.start(Confirm1.CONFIRM_WASHPET,"是否确定消耗一个高级仙灵果对#c00ff00["+MyPets.mp.pets[this.iPetPoint].sName+"]#o进行洗练？");
						}
						else if(GmMe.me.rbs.iInGot>=50)
						{
							this.iWashGid=0;
							Confirm1.start(Confirm1.CONFIRM_WASHPETBYINGOT,"背包中没有高级仙灵果，是否花费50元宝购买高级仙灵果对#c00ff00["+MyPets.mp.pets[this.iPetPoint].sName+"]#o进行洗练？");
						}
						else FrameMessage.fm.Open("背包中没有高级仙灵果");
					}
				}
			}
			if(this.iLockScroll>0)
			{
				if(msg==2)
				{
					i=this.iLockScroll-y;
					this.iLockScroll=y;
					this.iScrollY+=i;
					if(this.iScrollY<0)this.iScrollY=0;
					if(this.iScrollY>50)this.iScrollY=50;
				}
				if(msg==3)this.iLockScroll=-1;
			}
			if(XDefine.bInRect(x, y, this.iScrollRectX, this.iScrollRectY, this.iScrollRectW, this.iScrollRectH))
			{
				if(msg==1)
				{
					this.iLockScroll=y;
				}
			}
			for(i=0;i<12;i++)
			{
				if(this.btn_skilllist[i]==null)continue;
				this.btn_skilllist[i].ProcTouch(msg,x,y);
			}
		}
		return false;
	}
}
PetsFrame.Open=function()
{
	var pf=null;
	if(MyPets.mp.iPetCount>0)
	{
		pf=XStat.gi().PushStat(XStat.GS_PETSFRAME);
		//默认选中出战宠物
		var mp=MyPets.mp.GetUseingPet();
		if(mp==null)
		{
			for(var i=0;i<MyPets.mp.iPetCount;i++)
			{
				if(MyPets.mp.pets[i].iLife>50)
				{
					pf.iPetPoint=i;
					break;
				}
			}
		}
		else
		{
			for(var i=0;i<MyPets.mp.iPetCount;i++)
			{
				if(MyPets.mp.pets[i]==mp)
				{
					pf.iPetPoint=i;
					break;
				}
			}
		}
	}
	else EasyMessage.easymsg.AddMessage("你还没有宠物");
	///
//		PetsFrame pf=(PetsFrame)XStat.gi().LastStat(0);
	return pf;
}
PetsFrame.wordframe=function( x, y, w)
{
	GmPlay.xani_nui2.DrawAnimaEx(x,y, "可变长文字框",0,101,1.0,1.0,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32
	GmPlay.xani_nui2.DrawAnimaEx(x+15,y, "可变长文字框",1,101,1.0*(w-30)/20,1.0,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32
	GmPlay.xani_nui2.DrawAnimaEx(x+w-20,y, "可变长文字框",2,101,1.0,1.0,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32
}
PetsFrame.Draw_Base2=function( x, y, p)
{
//		DrawMode.Frame1_BR(x, y, 300, 260);
	
/*		DrawMode.Data1_BR(x+10, y+10, "体质", ""+p.tz, 50, 70);
	DrawMode.Data1_BR(x+10, y+10+20, "法力", ""+p.fl, 50, 70);
	DrawMode.Data1_BR(x+10, y+10+20*2, "力量", ""+p.ll, 50, 70);
	DrawMode.Data1_BR(x+10, y+10+20*3, "耐力", ""+p.nl, 50, 70);
	DrawMode.Data1_BR(x+10, y+10+20*4, "敏捷", ""+p.mj, 50, 70);
	
	DrawMode.Data1_BR(x+10+160, y+10, "灵力", ""+p.iSpirit, 50, 70);
	DrawMode.Data1_BR(x+10+160, y+10+20, "伤害", ""+p.iAttack, 50, 70);
	DrawMode.Data1_BR(x+10+160, y+10+20*2, "防御", ""+p.iDefence, 50, 70);
	DrawMode.Data1_BR(x+10+160, y+10+20*3, "速度", ""+p.iSpeed, 50, 70);
	DrawMode.Data1_BR(x+10+160, y+10+20*4, "剩余", ""+p.nut, 50, 70);
	
	DrawMode.Data1_BR(x+10, y+10+20*6, "当前经验", ""+p.iExp, 90, 190);
	DrawMode.Data1_BR(x+10, y+10+20*7, "升级经验", ""+GameData.iUpgradeExp[p.iLev]/3, 90, 190);
*/	
	
	//
	y+=105;
	DrawMode.ui3_Text1_(x, y-60-45,67,100,"体质",""+p.tz);
	DrawMode.ui3_Text1_(x, y-20-45,67,100,"法力",""+p.fl);
	DrawMode.ui3_Text1_(x, y+20-45,67,100,"力量",""+p.ll);
	DrawMode.ui3_Text1_(x, y+60-45,67,100,"耐力",""+p.nl);
	DrawMode.ui3_Text1_(x, y+100-45,67,100,"敏捷",""+p.mj);
	
	DrawMode.ui3_Text1_(x+210, y-60-45,67,100,"灵力",""+p.iSpirit);
	DrawMode.ui3_Text1_(x+210, y-20-45,67,100,"伤害",""+p.iAttack);
	DrawMode.ui3_Text1_(x+210, y+20-45,67,100,"防御",""+p.iDefence);
	DrawMode.ui3_Text1_(x+210, y+60-45,67,100,"速度",""+p.iSpeed);
	DrawMode.ui3_Text1_(x+210, y+100-45,67,100,"潜能",""+p.nut);
	
	//M3DFast.gi().DrawText_2(x+190,y+115-45, "剩余："+p.nut, 0xffffff00, 22, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
	
	
	/*
	DrawMode.ui3_Text1(x+20, y-60-45,70,90,"体质",""+p.tz);
	DrawMode.ui3_Text1(x+20, y-20-45,70,90,"法力",""+p.fl);
	DrawMode.ui3_Text1(x+20, y+20-45,70,90,"力量",""+p.ll);
	DrawMode.ui3_Text1(x+20, y+60-45,70,90,"耐力",""+p.nl);
	DrawMode.ui3_Text1(x+20, y+100-45,70,90,"敏捷",""+p.mj);
	
	DrawMode.ui3_Text1(x+190, y-60-45,70,90,"灵力",""+p.iSpirit);
	DrawMode.ui3_Text1(x+190, y-20-45,70,90,"伤害",""+p.iAttack);
	DrawMode.ui3_Text1(x+190, y+20-45,70,90,"防御",""+p.iDefence);
	DrawMode.ui3_Text1(x+190, y+60-45,70,90,"速度",""+p.iSpeed);
//	DrawMode.ui3_Text1(x+40, y-60,90,140,"体质",""+GmMe.me.iRid);
	M3DFast.gi().DrawText_2(x+190,y+115-45, "剩余："+p.nut, 0xffffff00, 22, 101, 1, 1, 0, 0, -2, 3, 0xff000000);
	
	*/
	
	
//	DrawMode.ui3_Text1(this.iX+390,this.iY+40*4,70,90,"体质",""+GmMe.me.rbs.tz);
	
	
}
PetsFrame.Draw_Base1=function( x, y, p)
{
//		DrawMode.Frame1_BR(x, y, 210, 100);
	
//		DrawMode.Data1_BR(x+10, y+10, "名称", p.sName, 50, 130);
//		DrawMode.Data1_BR(x+10, y+30, "等级", ""+p.iLev, 50, 130);
//		DrawMode.Data1_BR(x+10, y+50, "气血", ""+p.iHp+"/"+p.iMaxHp, 50, 130);
//		DrawMode.Data1_BR(x+10, y+70, "魔法", ""+p.iMp+"/"+p.iMaxMp, 50, 130);
//		M3DFast.gi().DrawTextEx(x+10, y+10, p.sName, 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
	
	
	//DrawMode.ui3_Text1(x+52, y-60,70,105,"等级",""+p.iLev);
	GmPlay.xani_nui2.DrawAnima(x, y, "提示1",0);
	M3DFast.gi().DrawText_2(x+67/2, y+16, "气血", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	GmPlay.xani_nui2.DrawAnima(x, y+38, "提示1",0);
	M3DFast.gi().DrawText_2(x+67/2, y+38+16, "魔法", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	GmPlay.xani_nui2.DrawAnima(x, y+76, "提示1",0);
	M3DFast.gi().DrawText_2(x+67/2, y+76+16, "经验", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	
	
	var w=67,h=38;
	
	GmPlay.xani_nui2.DrawAnima(x+w, y, "宠物大血条",0);
	GmPlay.xani_nui2.DrawAnima(x+w, y+h, "宠物大血条",0);
	GmPlay.xani_nui2.DrawAnima(x+w, y+h*2, "宠物大血条",0);

	M3DFast.gi().SetViewClip(x, y, x+w+311*p.iHp/p.iMaxHp, y+480);
	GmPlay.xani_nui2.DrawAnima(x+w+2, y+3, "宠物大血条",1);
	M3DFast.gi().NoClip();
	M3DFast.gi().SetViewClip(x, y, x+w+311*p.iMp/p.iMaxMp, y+480);
	GmPlay.xani_nui2.DrawAnima(x+w+2, y+h+3, "宠物大血条",2);
	M3DFast.gi().NoClip();
	var l=311;
	l=l*p.iExp/(GameData.iUpgradeExp[p.iLev]/3);
	M3DFast.gi().SetViewClip(x, y,  (x+w+l), y+480);
	GmPlay.xani_nui2.DrawAnima(x+w+2, y+h*2+3, "宠物大血条",3);
	
	M3DFast.gi().NoClip();

	M3DFast.gi().DrawTextEx(x+w+311/2, y+15,p.iHp+"/"+p.iMaxHp, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
	M3DFast.gi().DrawTextEx(x+w+311/2, y+40+13,p.iMp+"/"+p.iMaxMp, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
	M3DFast.gi().DrawTextEx(x+w+311/2, y+80+12,p.iExp+"/"+parseInt(GameData.iUpgradeExp[p.iLev]/3), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);

	//DrawMode.ui3_Text2(x+20,y+110-30,90,230,"当前经验",""+p.iExp);
	//DrawMode.ui3_Text2(x+20,y+150-30,90,230,"升级经验",""+GameData.iUpgradeExp[p.iLev]/3);
}