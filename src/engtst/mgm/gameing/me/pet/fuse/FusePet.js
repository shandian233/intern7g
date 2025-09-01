
import GmConfig from "../../../../../../config/GmConfig"
import BaseClass from "../../../../../../engine/BaseClass"
import XButton from "../../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import XCheckBox from "../../../../../../engine/control/XCheckBox"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import FrameMessage from "../../../../../../engtst/mgm/frame/message/FrameMessage"
import MyAttFrame from "../../../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyGoods from "../../../../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../../engtst/mgm/gameing/me/pet/Pets"

import SelectMyPet from "./SelectMyPet"
//合成
export default class FusePet extends BaseClass{
	 constructor( ani)
	{
		super();
		this.pets=new Array(2);//
		this.pets[0]=null;
		this.pets[1]=null;
		
		this.btn_selpet=new Array(2);//
		this.btn_selpet[0]=new XButton(GmPlay.xani_nui1);
		this.btn_selpet[0].bSingleButton=true;
		this.btn_selpet[1]=new XButton(GmPlay.xani_nui1);
		this.btn_selpet[1].bSingleButton=true;
		
		this.chk_uselock=new Array(2);//
		this.chk_uselock[0]=new XCheckBox(GmPlay.xani_nui3);
		this.chk_uselock[0].InitBox("统一勾选");
		this.chk_uselock[0].bTrue=false;
		this.chk_uselock[0].sDetail="使用定形符";
		this.chk_uselock[1]=new XCheckBox(GmPlay.xani_nui3);
		this.chk_uselock[1].InitBox("统一勾选");
		this.chk_uselock[1].bTrue=false;
		this.chk_uselock[1].sDetail="使用定形符";
		
		this.iW=920;
		this.iH=630;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_fuse=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_fuse.InitButton("按钮4");
		this.btn_fuse.Move(this.iX+(this.iW-141)/2, this.iY+this.iH-30-49, 141, 49);
		this.btn_fuse.sName="炼妖";
	}

	Draw()
	{
		var offx,offy;///420;
		
		DrawMode.new_baseframe2(this.iX, this.iY, this.iW, this.iH, "炼", "妖");
		
		offx=this.iX+30;
		offy=this.iY+30;
		
		this.DrawSide(offx,offy,0);
		this.DrawSide(offx+420+20,offy,1);
		
		if(SelectMyPet.bSelect)
		{
			SelectMyPet.bSelect=false;
			this.pets[SelectMyPet.iFlag]=SelectMyPet.selpet;
		}
		
		this.btn_close.Draw();
	}
	DrawSide( offx, offy, side)
	{
		var i,xx,yy;
		
		DrawMode.new_framein(offx, offy, 420, 510);
		
		GmPlay.xani_nui2.DrawAnima(offx+20,offy+15, "宠物头像框",0);
		if(this.pets[side]!=null)GmPlay.xani_head.DrawAnima_aa(offx+20,offy+15,GmPlay.de_pet.strValue(this.pets[side].iTid, 0, 1),0);//宠物头像
		this.btn_selpet[side].Move(offx+20, offy+15, 83, 83);
		
		if(this.pets[side]==null)M3DFast.gi().DrawTextEx(offx+20+83+20, offy+15, "宠物：", 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		else
		{
			M3DFast.gi().DrawTextEx(offx+20+83+20, offy+15, "宠物："+this.pets[side].sName+((this.pets[side].iBaobao&2)==0?"":"(变异)"), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		}
		
		M3DFast.gi().DrawTextEx(offx+20+83+20, offy+15+30, "等级："+(this.pets[side]==null?"":this.pets[side].iLev), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		
		this.chk_uselock[side].Move(offx+20+83+20, offy+15+30+30, 50, 50);
		this.chk_uselock[side].Draw();
		
		M3DFast.gi().DrawTextEx(offx+20, offy+15+83+30, "体质资质："+(this.pets[side]==null?"":this.pets[side].zz[0]), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+20, offy+15+83+30+30, "法力资质："+(this.pets[side]==null?"":this.pets[side].zz[1]), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+20, offy+15+83+30+60, "力量资质："+(this.pets[side]==null?"":this.pets[side].zz[2]), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);

		M3DFast.gi().DrawTextEx(offx+20+180, offy+15+83+30, "耐力资质："+(this.pets[side]==null?"":this.pets[side].zz[3]), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+20+180, offy+15+83+30+30, "敏捷资质："+(this.pets[side]==null?"":this.pets[side].zz[4]), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(offx+20+180, offy+15+83+30+60, "成长："+(this.pets[side]==null?"":MyPets.swapcz(this.pets[side].cz)), 0xff003e57, 22, 101, 1, 1, 0, 0, 0);

		for(i=0;i<12;i++)
		{
			xx=offx+20+i%4*(92+7);
			yy=offy+215+parseInt(i/4)*(92+5);

			GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",0);
			if(i>=(this.pets[side]==null?8:this.pets[side].iSkillBlock))GmPlay.xani_nui2.DrawAnima(xx, yy, "技能框",1);
			if(this.pets[side]!=null && this.pets[side].jn[i]>0)GmPlay.xani_nicon.DrawAnima_aa(xx, yy, GmPlay.de_skill.strValue(this.pets[side].jn[i], 0, 5),0);
		}
//		if(this.pets[0]!=null)
		{
			
		}
		this.btn_fuse.Draw();
		
		if(Confirm1.end(Confirm1.CONFIRM_FUSEPET))
		{
			if(Confirm1.bConfirm)
			{//发送炼妖消息
				if(this.pets[0]!=null && this.pets[1]!=null)
				{
					if(this.chk_uselock[0].bTrue)i=0;
					else if(this.chk_uselock[1].bTrue)i=1;
					else i=2;
					GmProtocol.gi().s_SeverEvent(26, 0, this.pets[0].iPid, this.pets[1].iPid, i);
					XStat.gi().PopStat(1);
				}
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_selpet[0].ProcTouch(msg, x, y))
		{
			if(this.btn_selpet[0].bCheck())
			{//选择宠物
				if(this.pets[0]==null)SelectMyPet.Open(this.pets[1],0);
				else this.pets[0]=null;
			}
		}
		if(this.btn_selpet[1].ProcTouch(msg, x, y))
		{
			if(this.btn_selpet[1].bCheck())
			{//选择宠物
				if(this.pets[1]==null)SelectMyPet.Open(this.pets[0],1);
				else this.pets[1]=null;
			}
		}
		if(this.chk_uselock[0].ProcTouch(msg, x, y))
		{
			if(this.chk_uselock[0].bTrue)this.chk_uselock[1].bTrue=false;
		}
		if(this.chk_uselock[1].ProcTouch(msg, x, y))
		{
			if(this.chk_uselock[1].bTrue)this.chk_uselock[0].bTrue=false;
		}
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_fuse.ProcTouch(msg, x, y))
		{
			if(this.btn_fuse.bCheck())
			{
				if(this.pets[0]==null || this.pets[1]==null)FrameMessage.fm.Open("请选择参与炼妖的宠物");
				else if(this.pets[0].iLev<20 || this.pets[1].iLev<20)FrameMessage.fm.Open("20级以上的宠物才能参与炼妖");
				else if(this.pets[0]==this.pets[1])FrameMessage.fm.Open("不能选择同一个宠物");
				else if((this.pets[0].iBaobao&2)!=0 || (this.pets[1].iBaobao&2)!=0)FrameMessage.fm.Open("变异宠物无法炼妖");
				else
				{
					if(this.chk_uselock[0].bTrue || this.chk_uselock[1].bTrue)
					{//使用定形符
						if(MyGoods.bHaveGoods(315, 1))
						{//有定形符
							Confirm1.start(Confirm1.CONFIRM_FUSEPET,"本次炼妖将消耗一枚定形符，生成形象为所选形象");
						}
						else
						{
							FrameMessage.fm.Open("背包中没有可消耗的定形符");
						}
					}
					else
					{//没有使用定形符
						Confirm1.start(Confirm1.CONFIRM_FUSEPET,"本次炼妖没有使用定形符，炼妖形象将随机生成");
					}
				}
			}
		}
		return false;
	}
}
FusePet.Open=function()
{
	XStat.gi().PushStat(XStat.GS_FUSEPET);
}