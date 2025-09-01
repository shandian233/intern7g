import GameData from "../../../../config/GameData"
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import PackageTools from "../../../../engine/PackageTools"
import XButton from "../../../../engine/control/XButton"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FriendList from "../../../../engtst/mgm/gameing/chat/privatechat/FriendList"
import MyFriends from "../../../../engtst/mgm/gameing/chat/privatechat/MyFriends"
import PrivateChat_Send from "../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../engtst/mgm/gameing/me/pet/Pets"
import PetsFrame from "../../../../engtst/mgm/gameing/me/pet/PetsFrame"

export default class WatchOn extends BaseClass{
	
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=530;
		this.iH=340;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.goods=new Goods();
		this.goods.iGid=-1;
		this.pet=new Pets();
		this.pet.iPid=-1;
//		btn_base=new XButton(GmPlay.xani_ui);
//		btn_base.InitButton("统一中按钮4");
//		btn_base.sName="基础属性";
//		btn_skill=new XButton(GmPlay.xani_ui);
//		btn_skill.InitButton("统一中按钮4");
//		btn_skill.sName="资质技能";
		
		this.btn_send=new XButtonEx2(GmPlay.xani_button);
		this.btn_send.InitButton("1号按钮90_60");
		this.btn_send.sName="发送";
		
		this.btn_friend=new XButtonEx2(GmPlay.xani_button);
		this.btn_friend.InitButton("1号按钮90_60");
		this.btn_friend.sName="好友";
		
		this.bInited=false;
		
		this.iRankCount=0;
		this.sRankDetail=new Array(10);//
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
	}
	
	
	Draw_Pet()
	{
		var i;
		
		this.iW=915;
		this.iH=610;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.new_bigframe(this.iX,this.iY,this.iW,this.iH);
		
		var offxx,offyy,offww,offhh;
		
		offxx=this.iX+28;
		offyy=this.iY+28;
		offww=406;
		offhh=553;
		
		DrawMode.new_framein(offxx,offyy,offww,offhh);//左背景
		
		offxx=offxx+offww+15;
		offww=450-10;
		offhh=553;
		
		DrawMode.new_framein(offxx,offyy,offww,offhh);//右背景
		
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		this.btn_close.Draw();
		
		//以下为左边大显示
		
		//int offx=this.iX+150;
		//int offy=this.iY+65;
		
		GmPlay.xani_nui2.DrawAnima(this.iX+28+406/2-260/2,this.iY+50,"宠物背景",0);
		FireworksEffect.DrawAura(0, this.iX+28+406/2, this.iY+240, null, 0);//查看世界频道的宠物
		this.pet.aa_body.Draw(this.iX+28+406/2, this.iY+240);
		this.pet.aa_body.NextFrame();
		
		//this.pet's name
		PetsFrame.wordframe(this.iX+28+406/2-200/2,this.iY+50,200);
		M3DFast.gi().DrawText_2(this.iX+28+406/2, this.iY+50+16, this.pet.sName, 0xffffffff, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		this.pet.CalcPetScore();
		M3DFast.gi().DrawText_2(this.iX+28+406/2, this.iY+50+16 + 50, "评分:"+this.pet.iScore, 0xffffffff, 26, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		//？ 逻辑为加入
		//进阶星星
		for(i=0;i<5;i++)
		{//ppet.iStar
			if(i<this.pet.iStar)GmPlay.xani_nui2.DrawAnima(this.iX+54,this.iY+60+40*i, "宠物进阶星星",1);
			else GmPlay.xani_nui2.DrawAnima(this.iX+54,this.iY+60+40*i, "宠物进阶星星",0);
//			GmPlay.xani_ui4.DrawAnima(this.iX+220+30+i*30, this.iY+40+180-30, "黄色五角星",0);
		}
//		GmPlay.xani_nui2.DrawAnima(this.iX+54,this.iY+85, "宠物进阶星星",1);
//		GmPlay.xani_nui2.DrawAnima(this.iX+54,this.iY+85+39, "宠物进阶星星",0);

		//？ 逻辑未加入
		//宠物类型红印
		GmPlay.xani_nui2.DrawAnima(this.iX+380,this.iY+128, "宠物类型红印",this.pet.iBaobao&3);
//		GmPlay.xani_nui2.DrawAnima(this.iX+380,this.iY+128, "宠物类型红印",2);
		
		M3DFast.gi().DrawText_2(this.iX+130,this.iY+239, this.pet.iLev+"级", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(this.iX+350,this.iY+239, "仙露仙桃："+this.pet.iFlag%100, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		
		var xx,yy,x=this.iX+45,y=this.iY+285;
		
		for(i=0;i<12;i++)
		{
			{//有技能
				xx=x+i%4*(92+5);
				yy=y+parseInt(i/4)*(92+5);
			
				GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",0);

				if(i<this.pet.iSkillBlock && this.pet.jn[i]>0)
				{
					GmPlay.xani_nicon.DrawAnima_aa(xx, yy, GmPlay.de_skill.strValue(this.pet.jn[i], 0, 5),0);
				}
				if(i>=this.pet.iSkillBlock)GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",1);
			}
		}
		for(i=0;i<12;i++)
		{
			xx=x+i%4*(92+5);
			yy=y+parseInt(i/4)*(92+5);
			
			if(WatchOn.btn_skilllist[i]==null)
			{
				WatchOn.btn_skilllist[i]=new XButtonEx2(GmPlay.xani_nui2);
				WatchOn.btn_skilllist[i].bSingleButton=true;
			}
			WatchOn.btn_skilllist[i].Move(xx,yy,92,92);

			if(WatchOn.btn_skilllist[i].bMouseDown && this.pet.jn[i]>0)
			{
				MyAttFrame.Skill_Detail(this.pet.jn[i], xx, yy, -1);
			}
		}
		
		
		//以下为右边大显示
		x = this.iX+470+10; y=this.iY+49;
		GmPlay.xani_nui2.DrawAnima(x, y, "提示1",0);
		M3DFast.gi().DrawText_2(x+67/2, y+16, "气血", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmPlay.xani_nui2.DrawAnima(x, y+38, "提示1",0);
		M3DFast.gi().DrawText_2(x+67/2, y+38+16, "魔法", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		GmPlay.xani_nui2.DrawAnima(x, y+76, "提示1",0);
		M3DFast.gi().DrawText_2(x+67/2, y+76+16, "经验", 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		
		var w=67,h=36;
		
		GmPlay.xani_nui2.DrawAnima(x+w, y, "宠物大血条",0);
		GmPlay.xani_nui2.DrawAnima(x+w, y+h, "宠物大血条",0);
		GmPlay.xani_nui2.DrawAnima(x+w, y+h*2, "宠物大血条",0);

		M3DFast.gi().SetViewClip(x, y, x+w+311*this.pet.iHp/this.pet.iMaxHp, y+480);
		GmPlay.xani_nui2.DrawAnima(x+w+2, y+3, "宠物大血条",1);
		M3DFast.gi().NoClip();
		M3DFast.gi().SetViewClip(x, y, x+w+311*this.pet.iMp/this.pet.iMaxMp, y+480);
		GmPlay.xani_nui2.DrawAnima(x+w+2, y+h+3, "宠物大血条",2);
		M3DFast.gi().NoClip();
		M3DFast.gi().SetViewClip(x, y, x+w+311*this.pet.iExp/(GameData.iUpgradeExp[this.pet.iLev]/3), y+480);
		GmPlay.xani_nui2.DrawAnima(x+w+2, y+h*2+3, "宠物大血条",3);
		
		M3DFast.gi().NoClip();
	
		M3DFast.gi().DrawTextEx(x+w+311/2, y+15,this.pet.iHp+"/"+this.pet.iMaxHp, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(x+w+311/2, y+40+13,this.pet.iMp+"/"+this.pet.iMaxMp, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(x+w+311/2, y+80+12,this.pet.iExp+"/"+parseInt(GameData.iUpgradeExp[this.pet.iLev]/3), 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		
		//
		x=this.iX+470+10; y=this.iY+176;
		y+=105;
		DrawMode.ui3_Text1_(x, y-60-45,67,100,"体质",""+this.pet.tz);
		DrawMode.ui3_Text1_(x, y-20-45-2,67,100,"法力",""+this.pet.fl);
		DrawMode.ui3_Text1_(x, y+20-45-4,67,100,"力量",""+this.pet.ll);
		DrawMode.ui3_Text1_(x, y+60-45-6,67,100,"耐力",""+this.pet.nl);
		DrawMode.ui3_Text1_(x, y+100-45-8,67,100,"敏捷",""+this.pet.mj);
		
		DrawMode.ui3_Text1_(x+220, y-60-45,67,100,"灵力",""+this.pet.iSpirit);
		DrawMode.ui3_Text1_(x+220, y-20-45-2,67,100,"伤害",""+this.pet.iAttack);
		DrawMode.ui3_Text1_(x+220, y+20-45-4,67,100,"防御",""+this.pet.iDefence);
		DrawMode.ui3_Text1_(x+220, y+60-45-6,67,100,"速度",""+this.pet.iSpeed);
		DrawMode.ui3_Text1_(x+220, y+100-45-8,67,100,"潜能",""+this.pet.nut);
		
		//
		x=this.iX+470+10; y=this.iY+378;
		DrawMode.ui3_Text1_4word(x, y,110,100,"体质资质",""+this.pet.zz[0]);
		DrawMode.ui3_Text1_4word(x, y+40-2,110,100,"法力资质",""+this.pet.zz[1]);
		DrawMode.ui3_Text1_4word(x, y+80-4,110,100,"力量资质",""+this.pet.zz[2]);
		DrawMode.ui3_Text1_4word(x, y+120-6,110,100,"耐力资质",""+this.pet.zz[3]);
		DrawMode.ui3_Text1_4word(x, y+160-8,110,100,"敏捷资质",""+this.pet.zz[4]);
		
		DrawMode.ui3_Text1_(x+220, y,67,100,"成长",""+MyPets.swapcz(this.pet.cz));
		
		if(this.pet.iLife>30000)DrawMode.ui3_Text1_(x+220, y+40-2,67,100,"寿命","永生");
		else DrawMode.ui3_Text1_(x+220, y+40-2,67,100,"寿命",""+this.pet.iLife);
	}
	
//	Draw_Pet_()
//	{
////		DrawMode.Frame3_BK(this.iX, this.iY, this.iW, this.iH,"宠物属性");
////		
////		if(this.pet.iPid<=0)return;
////		
////		GmPlay.aa_shadow.Draw(this.iX+10+100,this.iY+240);
////		this.pet.aa.Draw(this.iX+10+100, this.iY+240);
////		this.pet.aa.NextFrame();
////		
////		PetsFrame.Draw_Base1(this.iX+10, this.iY+285, this.pet);
////		
////		btn_base.Move(this.iX+10+210, this.iY+65+10, 130, 40);
////		btn_base.Draw();
////		btn_skill.Move(this.iX+10+210+170, this.iY+65+10, 130, 40);
////		btn_skill.Draw();
////		
////		PetsFrame.Draw_Base2(this.iX+10+210, this.iY+65+60, this.pet);
////		PetsFrame.Draw_Base3(this.iX+10+210, this.iY+65+60, this.pet);
//		
//		this.iW=580;
//		this.iH=420;
//		this.iX=(GmConfig.SCRW-this.iW)/2;
//		this.iY=(GmConfig.SCRH-this.iH)/2;
//		
//		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
//		
//		if(this.pet.iPid<=0)return;
//		
//		GmPlay.aa_shadow.Draw(this.iX+10+100,this.iY+180);
//		this.pet.aa_body.Draw(this.iX+10+100, this.iY+180);
//		this.pet.aa_body.NextFrame();
//		for(int i=0;i<this.pet.iStar;i++)GmPlay.xani_ui4.DrawAnima(this.iX+110-60+i*30, this.iY+40+180, "黄色五角星",0);
//		
//		PetsFrame.Draw_Base1(this.iX-30, this.iY+300, this.pet);
//		
////		if(iPetPage==0)
////		{
////			PetsFrame.Draw_Base2(this.iX+200, this.iY+160, this.pet);
////			
////			btn_base.bMouseDown=true;
////			btn_base.bMouseIn=true;
////		}
////		if(iPetPage==1)
////		{
////			PetsFrame.Draw_Base3(this.iX+200, this.iY+160, this.pet);
////			
////			btn_skill.bMouseDown=true;
////			btn_skill.bMouseIn=true;
////		}
////		
////		btn_base.Move(this.iX+10+210, this.iY+10, 130, 40);
////		btn_base.Draw();
////		btn_skill.Move(this.iX+10+210+170, this.iY+10, 130, 40);
////		btn_skill.Draw();
//	}

	Draw_Role()
	{//可加为好友,发送私聊,,,名字，等级，门派，帮派，头像
		var j;
		this.iW = 500;
		this.iH = 335;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.frame_type4("7号框52_52", this.iX, this.iY, this.iW, this.iH, 52, 52);
		
//		GmPlay.xani_ui.DrawAnimaEx(this.iX+20+5, this.iY+20, "头像", this.r_head, 101, 1, 1, 0, 0, 0);//120*120
		GmPlay.xani_head.DrawAnima(this.iX+ 20+350+20, this.iY+20, "新头像"+this.r_head,0);
		
		this.btn_send.Move(this.iX + 20+350+20-5, this.iY + 20 + 60 + 20+50, 90, 60);
		this.btn_send.Draw();
		this.btn_friend.Move(this.iX + 20+350+20-5, this.iY + 20 + 60 + 20 + 60+20 + 70, 90, 60);
		this.btn_friend.Draw();

		j = 260;
		DrawMode.frame_type4("11号框20_20", this.iX+20, this.iY+20, 350, 295, 20, 20);
		DrawMode.ui3_Text1(this.iX+30, this.iY+30, 70, j, "名字", this.r_name);
		DrawMode.ui3_Text1(this.iX + 30, this.iY + 30+35, 70, j, "号码", ""+(this.r_rid));
		DrawMode.ui3_Text1(this.iX + 30, this.iY + 30+35*2, 70, j, "等级", ""+(this.r_lev));
		DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 3, 70, j, "门派", GameData.sSchools[this.r_school]);
		if (this.r_title.length <= 0)DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 4, 70, j, "称谓", "无");
		else DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 4, 70, j, "称谓", this.r_title);
		DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 5, 70, j, "帮派", this.r_gov);
 
		if (this.r_relation == 0)DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 6, 70, j, "关系", "陌生人");
		else
		{//有关系，&1普通朋友，&2他是徒弟，&4他是师傅
			var s="";
			if ((this.r_relation & 2) != 0 || (this.r_relation & 8) != 0)s+= "徒弟";
			if ((this.r_relation & 4) != 0)s+= "师傅";
			if (s.length<=0)s= "普通朋友";
			DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 6, 70, j, "关系", s);
		}
		DrawMode.ui3_Text1(this.iX + 30, this.iY + 30 + 35 * 7, 70, j, "友好度", ""+(this.r_amity));
	}
	Draw_Goods()
	{
		this.iX=(GmConfig.SCRW+270)/2;
		this.iY=(GmConfig.SCRH)/2;
		this.iW=270;
		this.iH=270;
		GoodsDraw.new_DrawDetail(this.goods, this.iX,this.iY,0);
		this.iX-=270;
		this.iY-=270/2;
	}
	Draw()
	{
		if(!this.bInited)return;
		switch(this.iType)
		{
		case 0:
		case 4:
			this.Draw_Role();
			break;
		case 1:
			this.Draw_Goods();
			break;
		case 2:
			this.Draw_Pet();
			break;
		case 10://排行榜
		case 11:
		case 12:
		case 13:
			this.Draw_Rank();
			break;
		}
	}
	 Draw_Rank()
	{
		var i;
		
		this.iW=300;
		this.iH=350;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		DrawMode.Frame2_MD(this.iX, this.iY, this.iW, this.iH);
		
		if(this.iType==10)M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, "~~~实力排行榜~~~", 0xff000000, 30, 101, 1, 1, 0, -2, -2);
		else if(this.iType==11)M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, "~~~财富排行榜~~~", 0xff000000, 30, 101, 1, 1, 0, -2, -2);
		else if(this.iType==12)M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, "~~~帮派排行榜~~~", 0xff000000, 30, 101, 1, 1, 0, -2, -2);
		else if(this.iType==13)M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+30, this.sRankTitle, 0xff000000, 30, 101, 1, 1, 0, -2, -2);
		
		M3DFast.gi().DrawTextEx(this.iX+50, this.iY+30+40, "排名", 0xff000000, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(this.iX+200, this.iY+30+40, "名称", 0xff000000, 20, 101, 1, 1, 0, -2, -2);
		
		for(i=0;i<this.iRankCount;i++)
		{
			if(i%2==0)M3DFast.gi().FillRect_2D(this.iX+20, this.iY+30+40+30+i*25-13,          this.iX+this.iW-20, this.iY+30+40+30+i*25+13, 0x20000000);
			M3DFast.gi().DrawTextEx(this.iX+50, this.iY+30+40+30+i*25, ""+(i+1), 0xff000000, 20, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(this.iX+200, this.iY+30+40+30+i*25,this.sRankDetail[i], 0xff000000, 20, 101, 1, 1, 0, -2, -2);
		}
	}
	
	 ProcTouch( msg, x, y)
	{
		var i;
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
				return true;
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
		{
			XStat.gi().PopStat(1);
			return true;
		}
		switch(this.iType)
		{
		case 0:
		case 4:
			if(this.btn_send.ProcTouch(msg, x, y))
			{
				if(this.btn_send.bCheck())
				{
					XStat.gi().PopStat(1);
					PrivateChat_Send.OpenChat(this.r_rid, this.r_name,this.r_head);
				}
				return true;
			}
			if(this.btn_friend.ProcTouch(msg, x, y))
			{
				if(this.btn_friend.bCheck())
				{
					GmProtocol.gi().s_FriendOperate(0,this.r_rid,0);
					XStat.gi().PopStat(1);
				}
				return true;
			}
			break;
		case 1:
			break;
		case 2:
//			if(btn_base.ProcTouch(msg, x, y))
//			{
//				if(btn_base.bCheck())
//				{
//					iPetPage=0;
//				}
//			}
//			if(btn_skill.ProcTouch(msg, x, y))
//			{
//				if(btn_skill.bCheck())
//				{
//					iPetPage=1;
//				}
//			}
			for(i=0;i<12;i++)
			{
				if(WatchOn.btn_skilllist[i]==null)continue;
				WatchOn.btn_skilllist[i].ProcTouch(msg, x, y);
			}
			break;
		}
		return false;
	}
	
	InitData( pls)
	{
		var i,k;
		this.iType=pls.GetNextByte();
		this.iId=pls.GetNextInt();
		this.iFlag=pls.GetNextInt();
		if(this.iType==0 || this.iType==4)
		{
			this.r_name=pls.GetNextString();
			this.r_rid=pls.GetNextInt();
			this.r_lev=pls.GetNextInt();
			this.r_school=pls.GetNextByte();
			this.r_head=pls.GetNextByte();
			this.r_gov=pls.GetNextString();
			this.r_relation=pls.GetNextByte();

			this.r_amity=pls.GetNextInt();//友好度
			this.r_title=pls.GetNextString();
//			MyFriends pmf=FriendList.gi().FindFriend(this.r_rid);
//			if(pmf!=null)this.r_amity=pmf.iAmity;
//			else this.r_amity=0;
		}
		else if(this.iType==1)
		{
			this.goods.iGid=pls.GetNextInt();
			this.goods.iTid=pls.GetNextShort();
			pls.GetNextInt();//rid
			pls.GetNextByte();//oid
			pls.GetNextByte();//pos
			this.goods.iCount=pls.GetNextByte();//count
			for(i=0;i<8;i++)this.goods.iAtts[i]=pls.GetNextInt();
			GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(this.goods.iTid, -1, 10), this.goods.aa);
		}
		else if(this.iType==2)
		{
			this.pet.iPid=pls.GetNextInt();
			this.pet.iTid=pls.GetNextShort();
			this.pet.sName=pls.GetNextString()+"("+GmPlay.de_pet.strValue(this.pet.iTid, 0, 1)+")";
			this.pet.iLev=pls.GetNextShort();
			this.pet.iExp=pls.GetNextInt();
			this.pet.iHp=pls.GetNextShort();
			this.pet.iMp=pls.GetNextShort();
			this.pet.iLife=pls.GetNextShort();
			for(k=0;k<5;k++)this.pet.iBaseAtt[k]=pls.GetNextShort();
			for(k=0;k<5;k++)this.pet.zz[k]=pls.GetNextShort();
			this.pet.cz=pls.GetNextShort();
			for(k=0;k<8;k++)this.pet.jn[k]=pls.GetNextShort();
			this.pet.iAddAtt=pls.GetNextByte();
			this.pet.iBaobao=pls.GetNextByte();
			this.pet.iFlag=pls.GetNextShort();
			this.pet.jn[8]=pls.GetNextShort();
			this.pet.jn[9]=pls.GetNextShort();
			this.pet.jn[10]=pls.GetNextShort();
			this.pet.jn[11]=pls.GetNextShort();
			if((this.pet.iBaobao&2)==0)GmPlay.xani_pets[this.pet.iTid].InitAnimaWithName("站立_右下", this.pet.aa_body);
			else GmPlay.xani_pets[this.pet.iTid].InitAnimaWithName("变异_站立_右下", this.pet.aa_body);
			MyPets.CalcFightAtt(this.pet);
		}
		else if(this.iType==10)
		{//实力排行榜
			this.iRankCount=pls.GetNextInt();
			for(k=0;k<this.iRankCount;k++)this.sRankDetail[k]=pls.GetNextString();
		}
		else if(this.iType==11)
		{//财富排行榜
			this.iRankCount=pls.GetNextInt();
			for(k=0;k<this.iRankCount;k++)this.sRankDetail[k]=pls.GetNextString();
		}
		else if(this.iType==12)
		{//帮派排行榜
			this.iRankCount=pls.GetNextInt();
			for(k=0;k<this.iRankCount;k++)this.sRankDetail[k]=pls.GetNextString();
		}
		else if(this.iType==13)
		{//其他排行榜
			this.sRankTitle=pls.GetNextString();
			this.iRankCount=pls.GetNextInt();
			for(k=0;k<this.iRankCount;k++)this.sRankDetail[k]=pls.GetNextString();
		}
		else XStat.gi().PopStat(1);
		this.bInited=true;
	}
	

}

WatchOn.btn_skilllist=new Array(12);//

WatchOn.Init_Pet=function( p)
{
    XStat.gi().PushStat(XStat.GS_WATCHON);
    var wo=XStat.gi().LastStat(0);
    wo.pet.copyfrom(p);
    wo.pet.sName=p.sName+"("+GmPlay.de_pet.strValue(p.iTid, 0, 1)+")";
    if((wo.pet.iBaobao&2)==0)GmPlay.xani_pets[wo.pet.iTid].InitAnimaWithName("站立_右下", wo.pet.aa_body);
    else GmPlay.xani_pets[wo.pet.iTid].InitAnimaWithName("变异_站立_右下", wo.pet.aa_body);
    MyPets.CalcFightAtt(wo.pet);
    wo.iType=2;
    wo.bInited=true;
}