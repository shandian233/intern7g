
import GmConfig from "../../../../config/GmConfig"
import MapManager from "../../../../map/MapManager"
import VisualBlock from "../../../../map/VisualBlock"
import _VISUALBLOCK from "../../../../map/_VISUALBLOCK"
import E_DATA from "../../../../engine/data/E_DATA"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import MyAI from "../../../../engtst/mgm/MyAI"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import XFight from "../../../../engtst/mgm/gameing/fight/XFight"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import TeamOperate from "../../../../engtst/mgm/gameing/me/team/TeamOperate"

export default class JQMode {
//真剧情模式，脚本分解
	
	
	
	constructor()
	{
		this.iStat=0;
	}
	bNearToNpc( npcid)
	{
		var pnpc=GmPlay.de_npc.fdata(npcid);
		if(pnpc==null)return false;
		var dd=pnpc.intValue(4);
		var dx=pnpc.intValue(5);
		var dy=pnpc.intValue(6);
		if(dd==MapManager.gi().iCurrentMapId && VisualBlock.bInCircle(GmMe.me.iX,GmMe.me.iY,dx,dy,60))return true;
		return false;
	}
	StartJQ( stat)
	{
		this.iStat=stat;
		this.iProc=0;
		
		this.iGoToNpc=0;
		this.sGoToDetail="";
		
		this.iTalkNpc=0;
		this.iTalkDelay=0;
		
		this.iFightId=0;
		
		this.iCSID=0;
	}
	JQLogic()
	{
		switch(this.iStat)
		{
		case 0://看是否满足触发剧情的状态，满足就触发剧情
			if(MapManager.gi().iCurrentMapId==56 && !this.bJQ1Finished)
			{
				this.StartJQ(1);
			}
			break;
		case 1://进行JQ1
			this.JQProc1();
			this.JQDraw1();
			break;
		case 2://进行剧情2
		{
			var i,j,k;
			//显示黑屏提示语
			if(this.iProc<(GmConfig.SCRW-1100)/2)this.iProc=(GmConfig.SCRW-1100)/2;
			if(this.iProc<GmConfig.SCRW+255)
			{
				i=255;
				j=101;
			}
			else
			{
				k=this.iProc-GmConfig.SCRW-255;
				if(k<255)
				{
					i=255-k;
					j=100-k*100/255;
				}
				else
				{
					i=0;
					j=0;
				}
			}
			M3DFast.gi().FillRect_2D(0, 0, GmConfig.SCRW, GmConfig.SCRH, i<<24);
			if(this.iProc<GmConfig.SCRW)M3DFast.gi().SetViewClip(0, 0, this.iProc, GmConfig.SCRH);
//			GmPlay.xani_other.DrawAnima((GmConfig.SCRW-1100)/2, (GmConfig.SCRH-54)/2, "首次登陆黑屏提示语",0);
			GmPlay.xani_other.DrawAnimaEx((GmConfig.SCRW-1100)/2, (GmConfig.SCRH-54)/2, "首次登陆黑屏提示语",0, j, 1, 1, 0, 0, 0);
			if(this.iProc<GmConfig.SCRW)M3DFast.gi().NoClip();
			M3DFast.gi().DrawTextEx(GmConfig.SCRW-20, 5, "点击屏幕继续 》", 0xff6eacc8, 30, 101, 1, 1, 0, -3, 0);
			this.iProc+=10;
			if(this.iProc>=GmConfig.SCRW+255+255)
			{
				this.iProc=GmConfig.SCRW;
				this.iStat=0;
			}
		}
			break;
		}
	}
	JQDraw1()
	{
		if(this.iStat==0)return;
//		if(this.iTalkNpc>0)
		{//对话时，屏幕上下变暗
			GmPlay.xani_nui4.DrawAnimaEx(0, 0-100, "阴影",1,101,1.0*GmConfig.SCRW/20,1,0,0,0);
			GmPlay.xani_nui4.DrawAnimaEx(0, GmConfig.SCRH+100+100, "阴影",0,101,1.0*GmConfig.SCRW/20,1,0,0,0);
		}
		if(MapManager.gi().iCurrentMapId==1)this.iStat=0;
		if(this.iTalkNpc>0)
		{
			M3DFast.gi().DrawTextEx(GmConfig.SCRW-20, 5, "点击屏幕跳过对话 》", 0xff6eacc8, 30, 101, 1, 1, 0, -3, 0);
		}
		if(this.iGoToNpc>0)
		{
			if(this.sGoToDetail.length>0)
			{
				M3DFast.gi().DrawTextEx(GmConfig.SCRW/2, 5, this.sGoToDetail, 0xffc8f3f3, 28, 101, 1, 1, 0, -2, 0);
			}
			return;
		}
	}
	ProcTouch( msg, x, y)
	{
		if(this.iStat==0)return false;
		if(msg==3)
		{
			if(this.iTalkNpc>0)
			{
				if(this.iTalkNpc==500)
				{//自己说话
					GmMe.me.iPopoDelay=0;
				}
				else
				{//npc说话
					MapManager.gi().vbk._npctalk(0, this.iTalkNpc, "",0);
				}
				this.iTalkNpc=0;
				this.iTalkDelay=0;
			}
			if(this.iStat==2)
			{//首次登陆黑屏提示
				if(this.iProc<GmConfig.SCRW)this.iProc=GmConfig.SCRW;
				else this.iProc=GmConfig.SCRW*2;
			}
		}
		return true;
	}
	bJQLock()
	{
		if(this.iStat==0)return false;
		return true;
	}
	JQProc1()
	{
		if(this.iGoToNpc>0)
		{
			if(this.bNearToNpc(this.iGoToNpc))this.iGoToNpc=0;
			return;
		}
		if(this.iTalkNpc>0)
		{
			this.iTalkDelay--;
			if(this.iTalkDelay<=0)
			{
				this.iTalkNpc=0;
				this.iTalkDelay=0;
			}
			else return;
		}
		if(this.iFightId>0)
		{
			if(XFight.bFighting && this.iFightStat==0)this.iFightStat=1;
			if(!XFight.bFighting && this.iFightStat==1)this.iFightId=0;
			return;
		}
		
		if(this.iCSID>0)
		{
			if(this.iNowMap!=MapManager.gi().iCurrentMapId)this.iCSID=0;
			return;
		}
		if(JQMode.JQ1[this.iProc][0]=="start")this.iProc++;
		else if(JQMode.JQ1[this.iProc][0]=="end")
		{
			this.iStat=0;
			this.bJQ1Finished=true;
		}
		else if(JQMode.JQ1[this.iProc][0]=="gotonpc")
		{//寻路前往npc
			this.iGoToNpc=parseInt(JQMode.JQ1[this.iProc][1]);
			MyAI.gi().FindNpc(this.iGoToNpc,false,false);
			if(JQMode.JQ1[this.iProc].length>2)
			{//有提示内容
				this.sGoToDetail=JQMode.JQ1[this.iProc][2];
			}
			else this.sGoToDetail="";
			this.iProc++;
		}
		else if(JQMode.JQ1[this.iProc][0]=="talk")
		{
			this.iTalkNpc=parseInt(JQMode.JQ1[this.iProc][1]);
			var tk=JQMode.JQ1[this.iProc][2];
			if(JQMode.JQ1[this.iProc].length>3 && GmMe.me.iSex==1)tk=JQMode.JQ1[this.iProc][3];
			if(this.iTalkNpc==500)
			{//自己说话
				GmMe.me.sPopoString=tk;
				GmMe.me.iPopoDelay=100;
			}
			else
			{//npc说话
				MapManager.gi().vbk._npctalk(0, this.iTalkNpc, tk,100);
			}
			this.iTalkDelay=98;
			this.iProc++;
		}
		else if(JQMode.JQ1[this.iProc][0]=="fight")
		{
			this.iFightId=parseInt(JQMode.JQ1[this.iProc][1]);
			//让服务器开始战斗
			GmProtocol.gi().s_SeverEvent(24,0,this.iFightId,0,0);
			this.iFightStat=0;
			this.iProc++;
		}
		else if(JQMode.JQ1[this.iProc][0]=="cs")
		{//传送
			this.iNowMap=MapManager.gi().iCurrentMapId;
			this.iCSID=parseInt(JQMode.JQ1[this.iProc][1]);
			GmProtocol.gi().s_ChangeMapNew(2,this.iCSID);
			this.iProc++;
		}
		else if(JQMode.JQ1[this.iProc][0]=="special")
		{
			this.DoSpecial(parseInt(JQMode.JQ1[this.iProc][1]));
			this.iProc++;
		}
	}
	DoSpecial( sid)
	{
		switch(sid){	
		case 1:this.DoSpecial1();break;
		}
	}
	DoSpecial1()
	{//添加,秦雪涧,沈无名,王沐风,
		var k;
		GmMe.me.iDx=GmMe.me.iSx+1;
		GmMe.me.iDy=GmMe.me.iSy-1;
		GmMe.me.FaceTo();
		GmMe.me.bfc4=false;
		GmMe.me.bfc6=false;
		GmMe.me.bfc8=false;
		GmPlay.xani_newrole[0].InitAnimaWithName("站立_右上", GmMe.me.aa_body);
		GmMe.me.iWeapTid=291;
		GmMe.me.aa_weapon=TeamOperate.ResetWeapon(GmMe.me.iWeapTid, 0, "站立_右上", GmMe.me.aa_weapon);
		
		//猪妖
		this.pnpc1=VisualBlock.pvb.AddVoidNpc();
		this.pnpc1.bCurrentBlock=true;
		this.pnpc1.iNpcId=1;
		this.pnpc1.iSid=0;
		this.pnpc1.iX=831;
		this.pnpc1.iY=1007;
		this.pnpc1.iDx=this.pnpc1.iX;
		this.pnpc1.iDy=this.pnpc1.iY;
		this.pnpc1.sNpcName="猪妖";
		this.pnpc1.iAnimaType=200003;
		this.pnpc1.sAniName="站立_右下";
		this.pnpc1.iR=30;
		this.pnpc1.iStandFlag=-1;
		this.pnpc1.iWeapId=this.pnpc1.iAnimaType%10000;//怪物ID
		k=this.pnpc1.iAnimaType/10000%10;//是否变异
		GmPlay.xani_pets[this.pnpc1.iWeapId].InitAnimaWithName((k==0?"":"变异_")+this.pnpc1.sAniName,this.pnpc1.aa_body);
		
		//秦雪涧
		this.pnpc2=VisualBlock.pvb.AddVoidNpc();
		this.pnpc2.bCurrentBlock=true;
		this.pnpc2.iNpcId=2;
		this.pnpc2.iSid=0;
		this.pnpc2.iX=1109;
		this.pnpc2.iY=987;
		this.pnpc2.iDx=this.pnpc2.iX;
		this.pnpc2.iDy=this.pnpc2.iY;
		this.pnpc2.sNpcName="秦雪涧";
		this.pnpc2.iAnimaType=100291;
		this.pnpc2.sAniName="站立_上";
		this.pnpc2.iR=30;
		this.pnpc2.iStandFlag=-1;
		this.pnpc2.iWeapId=291;
		GmPlay.xani_newrole[0].InitAnimaWithName(this.pnpc2.sAniName, this.pnpc2.aa_body);
		if(this.pnpc2.iWeapId>0)TeamOperate.ResetWeapon(this.pnpc2.iWeapId, 0, this.pnpc2.sAniName, this.pnpc2.aa_weapon);
		
		//沈无名,仙男
		this.pnpc3=VisualBlock.pvb.AddVoidNpc();
		this.pnpc3.bCurrentBlock=true;
		this.pnpc3.iNpcId=2;
		this.pnpc3.iSid=0;
		this.pnpc3.iX=1234;
		this.pnpc3.iY=985;
		this.pnpc3.iDx=this.pnpc3.iX;
		this.pnpc3.iDy=this.pnpc3.iY;
		this.pnpc3.sNpcName="沈无名";
		this.pnpc3.iAnimaType=150295;
		this.pnpc3.sAniName="站立_左上";
		this.pnpc3.iR=30;
		this.pnpc3.iStandFlag=-1;
		this.pnpc3.iWeapId=295;
		GmPlay.xani_newrole[5].InitAnimaWithName(this.pnpc3.sAniName, this.pnpc3.aa_body);
		if(this.pnpc3.iWeapId>0)TeamOperate.ResetWeapon(this.pnpc3.iWeapId, 1, this.pnpc3.sAniName, this.pnpc3.aa_weapon);
		
		//王沐风,魔男
		this.pnpc4=VisualBlock.pvb.AddVoidNpc();
		this.pnpc4.bCurrentBlock=true;
		this.pnpc4.iNpcId=2;
		this.pnpc4.iSid=0;
		this.pnpc4.iX=1300;
		this.pnpc4.iY=898;
		this.pnpc4.iDx=this.pnpc4.iX;
		this.pnpc4.iDy=this.pnpc4.iY;
		this.pnpc4.sNpcName="王沐风";
		this.pnpc4.iAnimaType=130293;
		this.pnpc4.sAniName="站立_左";
		this.pnpc4.iR=30;
		this.pnpc4.iStandFlag=-1;
		this.pnpc4.iWeapId=293;
		GmPlay.xani_newrole[3].InitAnimaWithName(this.pnpc4.sAniName, this.pnpc4.aa_body);
		if(this.pnpc4.iWeapId>0)TeamOperate.ResetWeapon(this.pnpc4.iWeapId, 1, this.pnpc4.sAniName, this.pnpc4.aa_weapon);
	}
}
JQMode.JQ1=[
	["start"],
	["special","1"],//加入3个npc站立
	["end"],
	["gotonpc","84"],
	["talk","84","看你这迷茫的小眼神，真让人心疼！"],
	["talk","500","你是谁？这里是哪里？我的心为何这般痛！"],
	["talk","84","因为死亡都无法令你忘怀的那个人曾经就在这里等你，爱情本来就是最伤人的东西！"],
	["talk","500","不！爱情是这世上最美妙的，你是无论如何都不能理解的！"],
	["talk","84","那么你还坚持宁可经受一季冰寒，再忍一季炙烤，宁可忘记自己也要记住那个人么？"],
	["talk","500","我意已决，绝不更改！"],
	["gotonpc","85","要经受转生的煎熬，只为能记住那个心跳，去桃花岛岛主那里渡过劫难！"],
	["talk","85","如果你的爱不够真挚，你会元神幻灭，魂飞魄散！你要三思！"],
	["talk","500","这世上没有他活着可笑，来吧！","这世上没有她活着可笑，来吧！"],
	["talk","85","我敬你重情义，但是我并不会手下留情，接受考验吧！"],
	["fight","1"],
	["talk","85","你有姐妹厚意，更有英雄情深！感情真挚日月可鉴，现在我为你转生，重新开始新的生命旅程吧！","你有兄弟厚意，更有佳人情深！感情真挚日月可鉴，现在我为你转生，重新开始新的生命旅程吧！"],
	["cs","96"],//传送
	["end"]
/*		["start"],
	["gotonpc","84"],
	["talk","84","看你这迷茫的小眼神，真让人心疼！"],
	["talk","500","你是谁？这里是哪里？我的心为何这般痛！"],
	["talk","84","因为死亡都无法令你忘怀的那个人曾经就在这里等你，爱情本来就是最伤人的东西！"],
	["talk","500","不！爱情是这世上最美妙的，你是无论如何都不能理解的！"],
	["talk","84","那么你还坚持宁可经受一季冰寒，再忍一季炙烤，宁可忘记自己也要记住那个人么？"],
	["talk","500","我意已决，绝不更改！"],
	["gotonpc","85","要经受转生的煎熬，只为能记住那个心跳，去桃花岛岛主那里渡过劫难！"],
	["talk","85","如果你的爱不够真挚，你会元神幻灭，魂飞魄散！你要三思！"],
	["talk","500","这世上没有他活着可笑，来吧！","这世上没有她活着可笑，来吧！"],
	["talk","85","我敬你重情义，但是我并不会手下留情，接受考验吧！"],
	["fight","1"],
	["talk","85","你有姐妹厚意，更有英雄情深！感情真挚日月可鉴，现在我为你转生，重新开始新的生命旅程吧！","你有兄弟厚意，更有佳人情深！感情真挚日月可鉴，现在我为你转生，重新开始新的生命旅程吧！"],
	["cs","96"],//传送
	["end"]*/
];
JQMode.jq=new JQMode();