
import GmConfig from "../../../../../../config/GmConfig"
import BaseClass from "../../../../../../engine/BaseClass"
import XButton from "../../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import MyPets from "../../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../../engtst/mgm/gameing/me/pet/Pets"

export default class SelectMyPet extends BaseClass{
	constructor( xani)
	{
		super();
		var i;
		this.iW=885;
		this.iH=460;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_select=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_select.InitButton("按钮1");
		this.btn_select.sName="确定";
		
		this.btn_petlist=new Array(8);//
		for(i=0;i<8;i++)
		{
			this.btn_petlist[i]=new XButton(GmPlay.xani_ui);
			this.btn_petlist[i].bSingleButton=true;
		}
		this.iPetPoint=0;
	}

	Draw()
	{
		var i;
		var offx,offy;
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		offx=this.iX+30;
		offy=this.iY+30;
		DrawMode.new_framein(offx, offy, 392, 400);
		
		var ox,oy;
		for(i=0;i<8;i++)
		{
			ox=offx+20+i%4*92;
			oy=offy+20+parseInt(i/4)*92;
			GmPlay.xani_nui2.DrawAnima(ox,oy, "宠物头像框",0);
			this.btn_petlist[i].Move(ox,oy, 83, 83);
			if(i>=MyPets.mp.iPetCount)continue;

			GmPlay.xani_head.DrawAnima_aa(ox,oy,GmPlay.de_pet.strValue(MyPets.mp.pets[i].iTid, 0, 1),0);//宠物头像
			if((parseInt(MyPets.mp.pets[i].iFlag/100)%10)!=0)
			{//系统绑定
				M3DFast.gi().DrawText_2(ox-6,oy+80, "绑", 0xff6bfff4, 26, 101, 1, 1, 0, 0, -3, 4, 0xff000000);
			}
//			if(GmMe.me.iFightPid==MyPets.mp.pets[i].iPid)
//				GmPlay.xani_nui2.DrawAnima(ox,oy, "宠物头像框",1);//参战标签

			if(this.iPetPoint==i)
			{
				GmPlay.xani_nui2.DrawAnimaEx(ox,oy, "头像选中框",0,101,1,1,0,0,0);//this.iX+50, this.iY+65+i*45, 128, 32
				
				M3DFast.gi().DrawTextEx(offx+20, offy+210, "宠物名称："+MyPets.mp.pets[i].sName, 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20, offy+210+30, "体质资质："+MyPets.mp.pets[i].zz[0], 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20, offy+210+60, "法力资质："+MyPets.mp.pets[i].zz[1], 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20, offy+210+90, "力量资质："+MyPets.mp.pets[i].zz[2], 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20, offy+210+120, "耐力资质："+MyPets.mp.pets[i].zz[3], 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20, offy+210+150, "敏捷资质："+MyPets.mp.pets[i].zz[4], 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				
				M3DFast.gi().DrawTextEx(offx+20+200, offy+210+30, "等级："+MyPets.mp.pets[i].iLev, 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20+200, offy+210+60, "成长："+MyPets.swapcz(MyPets.mp.pets[i].cz), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20+200, offy+210+90, "寿命："+MyPets.mp.pets[i].iLife, 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
				M3DFast.gi().DrawTextEx(offx+20+200, offy+210+120, "进阶："+MyPets.mp.pets[i].iStar, 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
			}
		}
		offx+=(392+20);
		DrawMode.new_framein(offx, offy, 415, 400);

		for(i=0;i<12;i++)
		{
			ox=offx+20+i%4*(92+7);
			oy=offy+20+parseInt(i/4)*(92+5);

			GmPlay.xani_nui2.DrawAnima(ox, oy, "技能框",0);
			if(this.iPetPoint>=MyPets.mp.iPetCount)continue;
			if(i>=MyPets.mp.pets[this.iPetPoint].iSkillBlock)GmPlay.xani_nui2.DrawAnima(ox, oy, "技能框",1);
			if(MyPets.mp.pets[this.iPetPoint].jn[i]>0)GmPlay.xani_nicon.DrawAnima_aa(ox, oy, GmPlay.de_skill.strValue(MyPets.mp.pets[this.iPetPoint].jn[i], 0, 5),0);
		}
		this.btn_select.Move(offx+(415-161)/2,offy+325, 161, 53);
		this.btn_select.Draw();
		
		this.btn_close.Draw();
	}
	ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{//选择宠物
			if(this.btn_petlist[i].ProcTouch(msg, x, y))
			{
				if(this.btn_petlist[i].bCheck())
				{
					this.iPetPoint=i;
				}
				return true;
			}
		}
		if(this.btn_select.ProcTouch(msg, x, y))
		{
			if(this.btn_select.bCheck())
			{
				if(this.iPetPoint<MyPets.mp.iPetCount)
				{
					SelectMyPet.bSelect=true;
					SelectMyPet.selpet=MyPets.mp.pets[this.iPetPoint];
				}
				XStat.gi().PopStat(1);
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
SelectMyPet.wo;
SelectMyPet.selpet;
SelectMyPet.bSelect=false;
SelectMyPet.iFlag=0;

SelectMyPet.Open=function( without, f)
{
	XStat.gi().PushStat(XStat.GS_SELECTMYPET);
	SelectMyPet.wo=without;
	SelectMyPet.iFlag=f;
}