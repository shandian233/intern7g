
import GmConfig from "../../../../../../config/GmConfig"
import BaseClass from "../../../../../../engine/BaseClass"
import XButton from "../../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../../engtst/mgm/frame/format/FormatString"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import GmMe from "../../../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyPets from "../../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../../engtst/mgm/gameing/me/pet/Pets"

//认证
export default class ApprovePet extends BaseClass{
	
	 constructor( ani)
	{
		super();
		var i;
		this.iW=885;
		this.iH=580;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_approve=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_approve.InitButton("按钮1");
		this.btn_approve.sName="认证";
		
		this.btn_selpet=new Array(12);//
		this.btn_selskill=new Array(12);//
		for(i=0;i<12;i++)
		{
			this.btn_selpet[i]=new XButton(GmPlay.xani_button);
			this.btn_selpet[i].bSingleButton=true;
			this.btn_selskill[i]=new XButton(GmPlay.xani_button);
			this.btn_selskill[i].bSingleButton=true;
		}
		this.iPetPoint=0;
		this.iSkillPoint=-1;
	}

	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "认","证");
//		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		offx=this.iX+30;
		offy=this.iY+30;
		DrawMode.new_framein(offx, offy, 392, 520);
		
		M3DFast.gi().DrawTextEx(offx+392/2, offy+30, "请选择你要认证的宠物", 0xff003e57, 30, 101, 1, 1, 0, -2, 0);
		var ox,oy;
		for(i=0;i<8;i++)
		{
			ox=offx+20+i%4*92;
			oy=offy+90+i/4*92;
			GmPlay.xani_nui2.DrawAnima(ox,oy, "宠物头像框",0);
			this.btn_selpet[i].Move(ox,oy, 83, 83);
			if(i>=MyPets.mp.iPetCount)continue;

			GmPlay.xani_head.DrawAnima_aa(ox,oy,GmPlay.de_pet.strValue(MyPets.mp.pets[i].iTid, 0, 1),0);//宠物头像
			if(((MyPets.mp.pets[i].iFlag/100)%10)!=0)
			{//系统绑定
				M3DFast.gi().DrawText_2(ox-6,oy+80, "绑", 0xff6bfff4, 26, 101, 1, 1, 0, 0, -3, 4, 0xff000000);
			}
//			if(GmMe.me.iFightPid==MyPets.mp.pets[i].iPid)
//				GmPlay.xani_nui2.DrawAnima(ox,oy, "宠物头像框",1);//参战标签

			if(this.iPetPoint==i)
			{
				GmPlay.xani_nui2.DrawAnimaEx(ox,oy, "头像选中框",0,101,1,1,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32
			}
		}
		FormatString.gi().FormatEx("#c003e57技能认证条件#e1,要求宠物第9技能格为开启状态(炼妖有几率开启)#e2,技能认证花费=参战等级*1万+90万#e3,认证过的宠物不能重复认证#e4,认证的技能打书时不会被覆盖", 392-40, 25, 0, 0, 32);
		FormatString.gi().Draw(offx+20, offy+280);
	//	M3DFast.gi().DrawTextEx(offx+20, offy+270, "技能认证条件", 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		
		offx+=(392+20);
		DrawMode.new_framein(offx, offy, 415, 520);

		M3DFast.gi().DrawTextEx(offx+20, offy+30, "宠物名称："+MyPets.mp.pets[this.iPetPoint].sName, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);

		M3DFast.gi().DrawTextEx(offx+392/2, offy+90, "请选择你要认证的宠物", 0xff003e57, 30, 101, 1, 1, 0, -2, 0);

		for(i=0;i<12;i++)
		{
			ox=offx+20+i%4*(92+7);
			oy=offy+150+i/4*(92+5);
			
			this.btn_selskill[i].Move(ox, oy, 92, 92);

			GmPlay.xani_nui2.DrawAnima(ox, oy, "技能框",0);
			if(this.iPetPoint>=MyPets.mp.iPetCount)continue;
			if(i>=MyPets.mp.pets[this.iPetPoint].iSkillBlock)GmPlay.xani_nui2.DrawAnima(ox, oy, "技能框",1);
			if(MyPets.mp.pets[this.iPetPoint].jn[i]>0)GmPlay.xani_nicon.DrawAnima_aa(ox, oy, GmPlay.de_skill.strValue(MyPets.mp.pets[this.iPetPoint].jn[i], 0, 5),0);
			if(this.iSkillPoint==i)
			{
				GmPlay.xani_nui4.DrawAnima(ox-7, oy-7, "选中技能",0);
				MyAttFrame.Skill_Detail(MyPets.mp.pets[this.iPetPoint].jn[i], ox,oy, -1);
			}
		}
		this.btn_approve.Move(offx+(415-161)/2,offy+455, 161, 53);
		this.btn_approve.Draw();
		
		this.btn_close.Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_APPROVEPET))
		{
			if(Confirm1.bConfirm)
			{//发送炼妖消息
//				if(pets[0]!=null && pets[1]!=null)
				{
//					if(chk_uselock[0].bTrue)i=0;
//					else if(chk_uselock[1].bTrue)i=1;
//					else i=2;
					GmProtocol.gi().s_SeverEvent(26, 1, MyPets.mp.pets[this.iPetPoint].iPid, MyPets.mp.pets[this.iPetPoint].jn[this.iSkillPoint], this.iSkillPoint);
					XStat.gi().PopStat(1);
				}
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{//选择宠物
			if(this.btn_selpet[i].ProcTouch(msg, x, y))
			{
				if(this.btn_selpet[i].bCheck())
				{
					this.iPetPoint=i;
					this.iSkillPoint=-1;
				}
				return true;
			}
		}
		for(i=0;i<8;i++)
		{
			if(this.btn_selskill[i].ProcTouch(msg, x, y))
			{
				if(this.btn_selskill[i].bCheck())
				{
					if(MyPets.mp.pets[this.iPetPoint].jn[i]>0)this.iSkillPoint=i;
				}
			}
		}
		if(this.btn_approve.ProcTouch(msg, x, y))
		{
			if(this.btn_approve.bCheck())
			{
				i=GmPlay.de_pet.intValue(MyPets.mp.pets[this.iPetPoint].iTid, 0, 2)*10000+900000;
				
				if(this.iSkillPoint<0 || this.iSkillPoint>7 || MyPets.mp.pets[this.iPetPoint].jn[this.iSkillPoint]==0)FrameMessage.fm.Open("请先选择要认证的技能");
				else if((MyPets.mp.pets[this.iPetPoint].iBaobao&128)==0)FrameMessage.fm.Open("没有开启第九个技能格无法认证宠物（第九个技能格在炼妖时有几率开启）");
				else if(GmMe.me.rbs.iMoney<i)FrameMessage.fm.Open("认证资金不足");
				else if(MyPets.mp.pets[this.iPetPoint].jn[8]>0)FrameMessage.fm.Open("已有认证技能");
				else
				{//认证
					Confirm1.start(Confirm1.CONFIRM_APPROVEPET,"本次认证花费"+i+"铜币，技能认证后不可更改，是否确定认证？");
				}
//				if(this.iPetPoint<MyPets.mp.iPetCount)
//				{
//					bSelect=true;
//					selpet=MyPets.mp.pets[this.iPetPoint];
//				}
//				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}
ApprovePet.Open=function()
{
	if(MyPets.mp.iPetCount<=0)FrameMessage.fm.Open("当前没有宠物");
	else XStat.gi().PushStat(XStat.GS_APPROVEPET);
}