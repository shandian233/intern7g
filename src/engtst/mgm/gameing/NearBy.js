
import GmConfig from "../../../config/GmConfig"
import XDefine from "../../../config/XDefine"
import XButton from "../../../engine/control/XButton"
import M3DFast from "../../../engine/graphics/M3DFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../engtst/mgm/GmProtocol"
import DrawMode from "../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../engtst/mgm/frame/message/EasyMessage"
import PrivateChat_Send from "../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import GmMe from "../../../engtst/mgm/gameing/me/GmMe"
import GiveGoods from "../../../engtst/mgm/gameing/me/goods/GiveGoods"
import MyBuy from "../../../engtst/mgm/gameing/me/shop/MyBuy"
import MySell from "../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../engtst/mgm/gameing/me/team/MyTeam"
import Gameing from "./Gameing"
class SelectList
{/*
	int type;
	String name;
	Object point;*/
	
	constructor()
	{
		this.name="";
	}
}
export default class NearBy {

	constructor()
	{
		this.OFFX=GmConfig.SCRW/4*3;
		this.OFFY=GmConfig.SCRH/4*1;
		
		var i;
		this.sls=new Array(NearBy.MAXSELECTCOUNT);//
		for(i=0;i<NearBy.MAXSELECTCOUNT;i++)
		{
			this.sls[i]=new SelectList();
		}
		this.iSelectCount=0;
		
		this.btn_operate=new Array(16);//
		for(i=0;i<16;i++)
		{
			this.btn_operate[i]=new XButton(GmPlay.xani_nui3);
			this.btn_operate[i].Move(this.OFFX+50+i%2*80,this.OFFY+50+parseInt(i/2)*50, 80, 50);
			this.btn_operate[i].InitButton("附近操作按钮");
			this.btn_operate[i].sName="无无";//80x50
		}
	}
	Clear()
	{
		this.iSelectCount=0;
		this.iSelectPoint=-1;
		this.iOperatePoint=-1;
	}
	Add( type, name, point)
	{
		if(this.iSelectCount>=NearBy.MAXSELECTCOUNT)return;
		this.sls[this.iSelectCount].type=type;
		this.sls[this.iSelectCount].name=name;
		this.sls[this.iSelectCount].point=point;
		this.iSelectCount++;
	}
	OpenMyBuy( name, drid, sl)
	{
		if(MyBuy.gi().bBuying)return;
		MyBuy.gi().InitBuy(drid,name,sl);
		GmProtocol.gi().s_StartBuy(drid);
	}
	Draw()
	{
		var i;
		var sw=160;
		if(this.iSelectCount<=0)return;
		this.OFFX=GmConfig.SCRW/8*5;
		this.OFFY=GmConfig.SCRH/4*1;
		for(i=0;i<16;i++)
		{
			this.btn_operate[i].Move(this.OFFX+80+10+i%2*77,this.OFFY+80+parseInt(i/2)*53, 72, 50);
		}
		if(this.iSelectCount==1)
		{//
			if(this.iOperatePoint!=0)
			{
				this.iOperatePoint=0;
				var nr=this.sls[this.iOperatePoint].point;
				this.iORid=nr.iRid;
			}
			else
			{
				var nr=this.sls[this.iOperatePoint].point;
				if(this.iORid!=nr.iRid)
				{
					this.iSelectCount=0;
					return;
//					GmPlay.sop(".....................................@@@@@@@@@@@@--@@@@@@@@@@@@@@@@@---@@@@@@@@@@@@@@");
				}
			}
			if(this.sls[this.iOperatePoint].type==3)
			{//直接打开摊位
				var nr=this.sls[this.iOperatePoint].point;
				this.OpenMyBuy(nr.sSellName,nr.iRid,nr.sName);
				this.iSelectCount=0;
				return;
			}
		}
		if(this.iOperatePoint==-1)
		{//选择目标阶段
			this.x1=this.OFFX+100;
			this.y1=this.OFFY;
			this.x2=this.x1+10+10+sw;
			this.y2=this.y1+10+10+this.iSelectCount*30;
			DrawMode.new_framepc(this.x1-5,this.y1-5, this.x2-this.x1+10,this.y2-this.y1+10);
//			DrawMode.DrawFrame1(this.x1,this.y1, this.x2-this.x1,this.y2-this.y1);
//			M3DFast.gi().FillRect_2D(this.x1,this.y1,this.x2,this.y2, 0xff505050);
			M3DFast.gi().SetViewClip(this.x1, this.y1, this.x2, this.y2);
			for(i=0;i<this.iSelectCount;i++)
			{
//				if(i%2==0)M3DFast.gi().FillRect_2D(this.x1+10, this.y1+10+i*30, this.x1+10+sw, this.y1+10+i*30+30, 0x30000000);
				if(this.iSelectPoint==i)M3DFast.gi().FillRect_2D(this.x1+10, this.y1+10+i*30, this.x1+10+sw, this.y1+10+i*30+30, 0xff0000ff);
				if(this.sls[i].type==2)M3DFast.gi().DrawTextEx(this.x1+10, this.y1+10+i*30+2, "[队]"+this.sls[i].name, 0xffffffff, 25, 101, 1, 1, 0, -1, -1);
				else M3DFast.gi().DrawTextEx(this.x1+10, this.y1+10+i*30+2, this.sls[i].name, 0xffffffff, 25, 101, 1, 1, 0, -1, -1);
			}
			M3DFast.gi().NoClip();
		}
		else
		{//操作目标阶段
			switch(this.sls[this.iOperatePoint].type)
			{
			case 1://主角
				var me=this.sls[this.iOperatePoint].point;
			//	GmPlay.xani_head.DrawAnima(GmConfig.SCRW - 500 - i * 83,0, "新头像"+(iRace * 2 + iSex),0 );
				GmPlay.xani_head.DrawAnima(this.OFFX-33,this.OFFY-10, "新头像"+(me.iRace*2+me.iSex),0);
				GmPlay.xani_ui.DrawAnimaEx(this.OFFX+50,this.OFFY-10, "附近操作框",0,101,1,1,0,0,0);
				M3DFast.gi().DrawTextEx(this.OFFX+60,this.OFFY-5, me.sName, 0xffffffff, 25, 101, 1, 1, 0, -1, -1);
				M3DFast.gi().DrawTextEx(this.OFFX+60,this.OFFY+25, "号码:"+me.iRid, 0xffffffff, 20, 101, 1, 1, 0, -1, -1);
				
//				M3DFast.gi().FillRect_2D(this.OFFX+50,this.OFFY,this.OFFX+50+200,this.OFFY+25, 0xff505050);
//				M3DFast.gi().DrawTextEx(this.OFFX+50,this.OFFY, me.sName, 0xffffffff, 25, 101, 1, 1, 0, -1, -1);
//				M3DFast.gi().FillRect_2D(this.OFFX+50,this.OFFY+25,this.OFFX+50+200,this.OFFY+50, 0xff505050);
//				M3DFast.gi().DrawTextEx(this.OFFX+50,this.OFFY+25, "ID:"+me.iRid, 0xffffffff, 25, 101, 1, 1, 0, -1, -1);
				this.btn_operate[0].sName="组队";//80x50
				this.btn_operate[0].Draw();
				this.btn_operate[1].sName="摆摊";//80x50
				this.btn_operate[1].Draw();
//				this.btn_operate[3].sName="给予";//80x50
//				this.btn_operate[3].Draw();
				break;
			case 2://队长
			case 4://人
				var nr=this.sls[this.iOperatePoint].point;
				GmPlay.xani_head.DrawAnima(this.OFFX,this.OFFY, "新头像"+(nr.iRace*2+nr.iSex),0);
				DrawMode.new_framepc(this.OFFX+80, this.OFFY, 169, 297);
				M3DFast.gi().DrawTextEx(this.OFFX+80+10,this.OFFY+22, nr.sName, 0xffffffff, 25, 101, 1, 1, 0, -1, -2);
				M3DFast.gi().DrawTextEx(this.OFFX+80+10,this.OFFY+58, "号码:"+nr.iRid, 0xffffffff, 25, 101, 1, 1, 0, -1, -2);

				if(this.sls[this.iOperatePoint].type==2)this.btn_operate[0].sName="入队";
				else this.btn_operate[0].sName="组队";//80x50
				this.btn_operate[0].Draw();
				this.btn_operate[1].sName="好友";//80x50
				this.btn_operate[1].Draw();
				this.btn_operate[2].sName="发送";//80x50
				this.btn_operate[2].Draw();
				this.btn_operate[3].sName="给予";//80x50
				this.btn_operate[3].Draw();
				this.btn_operate[4].sName="攻击";//80x50
				this.btn_operate[4].Draw();
				this.btn_operate[5].sName="查看";//80x50
				this.btn_operate[5].Draw();
				this.btn_operate[6].sName="交易";//80x50
				this.btn_operate[6].Draw();
				break;
			case 3://摊位
				break;
			}
		}
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		if(this.iSelectCount<=0)return false;

		if(this.iOperatePoint==-1)
		{//选择目标阶段
			this.iSelectPoint=-1;
			for(i=0;i<this.iSelectCount;i++)
			{
				if(XDefine.bInRect(x, y, this.x1+10, this.y1+10+i*30, 160, 30))
				{
					this.iSelectPoint=i;
				}
			}
			if(this.iSelectPoint!=-1 && msg==3)
			{//选择了某个，放开按键，对其操作
				this.iOperatePoint=this.iSelectPoint;
				//如果是摊位，直接打开
				if(this.sls[this.iOperatePoint].type==3)
				{//直接打开摊位
					var nr=this.sls[this.iOperatePoint].point;
					this.OpenMyBuy(nr.sSellName,nr.iRid,nr.sName);
					this.iSelectCount=0;
					return true;
				}
			}
			if(XDefine.bInRect(x, y, this.x1, this.y1, this.x2-this.x1, this.y2-this.y1))return true;
		}
		else
		{
			switch(this.sls[this.iOperatePoint].type)
			{
			case 1://主角
				if(this.btn_operate[0].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[0].bCheck())
					{
						var me=this.sls[this.iOperatePoint].point;
						if(MyTeam.bNoTeam())GmProtocol.gi().s_TeamOperate(0,0,0);//组队
//						else GmProtocol.gi().s_TeamOperate(1,0);//离开/解散队伍
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[1].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[1].bCheck())
					{//摆摊
						if(MyTeam.bInTeam())EasyMessage.easymsg.AddMessage("队伍中不能摆摊");
						else if(MySell.gi().bSelling)MySell.gi().bShow=true;
						else
						{//开始摆摊
							GmProtocol.gi().s_StartSell(0,0,0,"");
						}
						this.Clear();
					}
					return true;
				}
//				if(this.btn_operate[3].ProcTouch(msg, x, y))
//				{
//					if(this.btn_operate[3].bCheck())
//					{//给与
//						GiveGoods.GiveTo(GmMe.me.iRid,GmMe.me.sName);
//						this.Clear();
//					}
//					return true;
//				}
				break;
			case 2://队长
			case 4://普通玩家
				if(this.btn_operate[0].ProcTouch(msg, x, y))
				{//组队
					if(this.btn_operate[0].bCheck())
					{
						var nr=this.sls[this.iOperatePoint].point;
						var me=Gameing.gameing.me;
						if(MyTeam.bTeamLeader())
						{//自己是队长，邀请对方入队
							GmProtocol.gi().s_TeamOperate(6,nr.iRid,0);
						}
						else if(MyTeam.bNoTeam() && nr.iIsLeader==1)
						{//自己没队，对方是队长，请求入队
							GmProtocol.gi().s_TeamOperate(3,nr.iRid,0);
						}
						else if(MyTeam.bNoTeam())
						{//自己没队，对方也没队，先自己组队，并且邀请对方入队
						}
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[1].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[1].bCheck())
					{//好友
						var nr=this.sls[this.iOperatePoint].point;
						GmProtocol.gi().s_FriendOperate(0,nr.iRid,0);
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[2].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[2].bCheck())
					{//发送
						var nr=this.sls[this.iOperatePoint].point;
						PrivateChat_Send.OpenChat( nr.iRid, nr.sName,nr.iRace*2+nr.iSex);
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[3].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[3].bCheck())
					{//给与
						if(GmMe.me.bHaveLock && GmMe.me.bLocked)
						{
							EasyMessage.easymsg.AddMessage("未解锁不能给予");
							return true;
						}
						if(MySell.gi().bSelling)
						{
							EasyMessage.easymsg.AddMessage("摆摊中不能给予");
							return true;
						}
						var nr=this.sls[this.iOperatePoint].point;
						GiveGoods.GiveTo(nr.iRid,nr.sName);
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[4].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[4].bCheck())
					{//攻击
						var nr=this.sls[this.iOperatePoint].point;
						GmProtocol.gi().s_PK(nr.iRid);
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[5].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[5].bCheck())
					{//查看
						var nr=this.sls[this.iOperatePoint].point;
						GmProtocol.gi().s_WatchOn(0, nr.iRid, 0,"");
						//GmProtocol.gi().s_PK(nr.iRid);
						this.Clear();
					}
					return true;
				}
				if(this.btn_operate[6].ProcTouch(msg, x, y))
				{
					if(this.btn_operate[6].bCheck())
					{//查看
						if(GmMe.me.bHaveLock && GmMe.me.bLocked)
						{
							EasyMessage.easymsg.AddMessage("未解锁不能交易");
							return true;
						}
						var nr=this.sls[this.iOperatePoint].point;
						GmProtocol.gi().s_Trade(0,nr.iRid,0,0,0,0,0,0,0,0,0);
//						GmProtocol.gi().s_WatchOn(0, nr.iRid, 0,"");
						//GmProtocol.gi().s_PK(nr.iRid);
						this.Clear();
					}
					return true;
				}
				break;
			}			
		}
		return false;
	}
}
NearBy.MAXSELECTCOUNT=15;