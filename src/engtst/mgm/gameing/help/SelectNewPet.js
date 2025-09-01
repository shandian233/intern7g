
import DrawBuffer from "../../../../map/DrawBuffer"
import MapManager from "../../../../map/MapManager"
import StarEffect from "../../../../mgm/newmainmenu/StarEffect"
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyMission from "../../../../engtst/mgm/gameing/me/mission/MyMission"

export default class SelectNewPet extends BaseClass{


	 constructor( ani)
	{
		super();
		var i;
		this.iW=50+200+30+200+50;
		this.iH=70+260+20+55+70;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_select=new Array(3);//
		for(i=0;i<2;i++)
		{
			this.btn_select[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_select[i].InitButton("普通按钮140_55");
			this.btn_select[i].sName="选择";
		}
		this.aa_np=new Array(2);//
		this.aa_np[0]=GmPlay.xani_pets[29].InitAnimaWithName("站立_右下", null);
		this.aa_np[1]=GmPlay.xani_pets[30].InitAnimaWithName("站立_右下", null);
	}
	Draw()
	{
		DrawMode.frame_type4("中等框a52_50", this.iX,this.iY, this.iW, this.iH, 52, 50);
		
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+45, "选择宠物", 0xff274f4f, 30, 101, 1, 1, 0, -2, -2);
		
		DrawMode.frame_type4("蓝色a30_30", this.iX+50,this.iY+70, 200, 260, 30, 30);
		FireworksEffect.DrawAura(0,this.iX+50+100, this.iY+80+200-50,null,0);
		this.aa_np[0].Draw(this.iX+50+100, this.iY+80+200-50);
		this.aa_np[0].NextFrame();
		M3DFast.gi().DrawTextEx(this.iX+50+100,                this.iY+80+200, "耳兔", 0xffffffff, 25, 101, 1, 1, 0, -2, -2);

		DrawMode.frame_type4("蓝色a30_30", this.iX+50+200+30,this.iY+70, 200, 260, 30, 30);
		FireworksEffect.DrawAura(0,this.iX+50+200+30+100, this.iY+80+200-50,null,0);
		this.aa_np[1].Draw(this.iX+50+200+30+100, this.iY+80+200-50);
		this.aa_np[1].NextFrame();
		M3DFast.gi().DrawTextEx(this.iX+50+200+30+100, this.iY+80+200, "猁猁", 0xffffffff, 25, 101, 1, 1, 0, -2, -2);

		this.btn_select[0].Move(this.iX+50+100-140/2, this.iY+70+260+20, 140, 55);
		this.btn_select[0].Draw();
		this.btn_select[1].Move(this.iX+50+200+30+100-140/2, this.iY+70+260+20, 140, 55);
		this.btn_select[1].Draw();
		
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2, this.iY+70+260+20+55+35, "除了外形它们没有任何区别", 0xff274f4f, 20, 101, 1, 1, 0, -2, -2);
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<2;i++)
		{
			if(this.btn_select[i].ProcTouch(msg, x, y))
			{
				if(this.btn_select[i].bCheck())
				{//领取
					GmProtocol.gi().s_SeverEvent(33, i, 0, 0, 0);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		return false;
	}
}
SelectNewPet.Open=function()
{
	XStat.gi().PushStat(XStat.GS_SELECTNEWPET);
}