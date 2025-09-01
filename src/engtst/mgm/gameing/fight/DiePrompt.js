
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"
import MyGov from "../../../../engtst/mgm/gameing/gov/MyGov"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyMounts from "../../../../engtst/mgm/gameing/me/mounts/MyMounts"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../engtst/mgm/gameing/me/pet/Pets"
import TeamCreate from "../../../../engtst/mgm/gameing/me/team/TeamCreate"

export default class DiePrompt extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.btn_ids=new Int32Array(15);//
		this.btn_open=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn_open[i]=new XButtonEx2(GmPlay.xani_nui4);
		}
		this.InitButton();
	}

	
	 InitButton()
	{//根据情况初始化按钮
		var i,p=0;
		this.iBtnCount=0;
		this.btn_ids[p++]=0;
		this.btn_ids[p++]=1;
		
		if(GmMe.me.rbs.iLev<20)
		{//10-20
			this.btn_ids[p++]=2;
			if(GmMe.me.rbs.nut>0)this.btn_ids[p++]=3;
			if(GmMe.me.iFightPid<=0)this.btn_ids[p++]=4;
			else
			{
//				GmPlay.sop(""+GmMe.me.iFightPid);
				var pet=MyPets.mp.FindPet(GmMe.me.iFightPid);
//				GmPlay.sop(""+pet);
				if(pet==null)this.btn_ids[p++]=4;
				else
				{
					if(pet.nut>0)this.btn_ids[p++]=4;
				}
			}
			this.btn_ids[p++]=5;
		}
		else if(GmMe.me.rbs.iLev<30)
		{//20-30
			if(MyGov.mg.iRealGid>0)
			{
				this.btn_ids[p++]=6;
				this.btn_ids[p++]=7;
			}
			this.btn_ids[p++]=8;
			this.btn_ids[p++]=9;
		}
		else
		{//30-40
			if(MyMounts.mm.iMountsCount>0)this.btn_ids[p++]=10;
			if(MyGov.mg.iRealGid>0)
			{
				this.btn_ids[p++]=11;
				this.btn_ids[p++]=12;
			}
			this.btn_ids[p++]=13;
			this.btn_ids[p++]=14;
		}
		
		if(p>4)p=4;
		for(i=0;i<p;i++)
		{
			
			this.btn_open[i].InitButton("提示"+DiePrompt._PROMPTS[this.btn_ids[i]][1]);
			this.btn_open[i].Move(GmConfig.SCRW/2-170/2-170-40+i*170, 340, 80, 80);
			this.btn_open[i].sAnimaName=DiePrompt._PROMPTS[this.btn_ids[i]][1];
		}
		this.iBtnCount=p;
	}

	Draw()
	{
		var i;
		M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, 0x80000000);
		//画背景
		GmPlay.xani_nui4.DrawAnima(GmConfig.SCRW/2, 280, "死亡提示框",0);
		//损失经验
		if(DiePrompt.iLostExp>0 || DiePrompt.iLostMoney>0)
		{
			var s="死亡损失";
			if(DiePrompt.iLostExp>0)s+=DiePrompt.iLostExp+"经验，";
			if(DiePrompt.iLostMoney>0)s+=DiePrompt.iLostMoney+"金钱";
			M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 300, s, 0xff98d9ed, 20, 101, 1, 1, 0, -2, 0);
		}
		else M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 300, DiePrompt.sDetail, 0xff98d9ed, 20, 101, 1, 1, 0, -2, 0);
		//画中间按钮
		for(i=0;i<this.iBtnCount;i++)
		{
			this.btn_open[i].Draw();
			M3DFast.gi().DrawText_2(this.btn_open[i].iX+40, this.btn_open[i].iY+80, this.btn_open[i].sAnimaName, 0xffffffff, 26, 101, 1, 1, 0, -2, -2,3,0xff000000);
			M3DFast.gi().DrawTextEx(this.btn_open[i].iX+40, this.btn_open[i].iY+80+22, DiePrompt._PROMPTS[this.btn_ids[i]][2], 0xff9ac2b9, 15, 101, 1, 1, 0, -2, -2);
		}
		
		M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 460, "胜败乃江湖常事，少侠请提升实力再战", 0xffffffff, 20, 101, 1, 1, 0, -2, 0);
		
		M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 540-2, "点击空白处消失", 0xff9ac2b9, 20, 101, 1, 1, 0, -2, -2);

	}
	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<this.iBtnCount;i++)
		{
			if(this.btn_open[i].ProcTouch(msg, x, y))
			{
				if(this.btn_open[i].bCheck())
				{
					switch(this.btn_ids[i])
					{
					case 0://升级
						GmProtocol.gi().s_PromptActivity(0, 0);//请求获得活跃度数据
						XStat.gi().PushStat(XStat.GS_LOADING1);
						break;
					case 1://组队
						TeamCreate.Open();
						break;
					case 2://技能
					case 8:
						if(GmMe.me.rbs.iSchoolId==0)FrameMessage.fm.Open("拜师之后才能学习门派技能");
						else XStat.gi().PushStat(XStat.GS_LEARNSKILL);
						break;
					case 3://人物
						MyAttFrame.Open(0);
						break;
					case 4://宝宝
					case 9:
					case 14:
						if(MyPets.mp.iPetCount>0)XStat.gi().PushStat(XStat.GS_PETSFRAME);
						else FrameMessage.fm.Open("你还没有宠物");
						break;
					case 5://vip
					case 13:
						MyAttFrame.Open(3);
						break;
					case 6://帮派技能
					case 11:
						GmProtocol.gi().s_GovOperateFrame(0);
						break;
					case 7://帮派修炼
					case 12:
						GmProtocol.gi().s_GovOperateFrame(1);
						break;
					case 10://坐骑
						if(MyMounts.mm.iMountsCount>0)XStat.gi().PushStat(XStat.GS_MOUNTSFRAME);
						else EasyMessage.easymsg.AddMessage("你还没有坐骑");
						break;
					}
				}
			}
		}
		if(!XDefine.bInRect(x, y, 300, 280, 680, 220))XStat.gi().PopStat(1);
		return false;
	}
}

DiePrompt.bOpen=false;
DiePrompt.iLostExp,DiePrompt.iLostMoney;
DiePrompt.sDetail="";

DiePrompt._PROMPTS=
[["0","升级","参加活动升级"],//必有
["1","组队","组队再战"],//必有

["2","技能","人物技能升级"],//10~20，必有
["3","人物","升级加点"],//10~20，条件：人物没加点
["4","宝宝","增强宝宝"],//10~20，条件：宝宝没出战，或宝宝没加点
["5","VIP","更多福利"],//10~20，附加

["6","帮派技能","提升帮派技能"],//20~30，条件：已加入帮会
["7","帮派修炼","提升修炼等级"],//20~30，条件：已加入帮会
["8","技能","人物技能升级"],//20~30，附加
["9","宝宝","学习宝宝技能"],//20~30，附加

["10","坐骑","加强坐骑"],//30~40，条件：拥有坐骑
["11","帮派技能","提升修炼等级"],//30~40，条件：已加入帮会
["12","帮派修炼","提升帮派技能"],// 30~40，条件：已加入帮会
["13","VIP","更多福利"],//30~40，附加
["14","宝宝","炼出更强宝宝"],//30~40，附加
];

DiePrompt.Open=function()
{
//		DiePrompt.bOpen=true;
    if(DiePrompt.bOpen)
    {
        DiePrompt.bOpen=false;
        
        if(GmMe.me.rbs.iLev<10)return;
        if(GmMe.me.rbs.iLev>=40)return;
        
        XStat.gi().PushStat(XStat.GS_DIEPROMPT);
        if(FrameMessage.fm.bShow)FrameMessage.fm.bShow=false;
    }
}