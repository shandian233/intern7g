
//import com.tencent.mid.api.MidService;

import GameVersion from "../../zero/Interface/GameVersion"
import PublicInterface from "../../zero/Interface/PublicInterface"
//import android.util.Log;
import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"
import MapManager from "../../map/MapManager"
import PackageTools from "../../engine/PackageTools"
import NetFast from "../../engine/network/NetFast"
import XRecordFast from "../../engtst/mgm/History/XRecordFast"
import Gameing from "../../engtst/mgm/gameing/Gameing"
import NearRole from "../../engtst/mgm/gameing/NearRole"
import PrivateChat_Send from "../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import PublicChat_Send from "../../engtst/mgm/gameing/chat/publicchat/PublicChat_Send"
import GmMe from "../../engtst/mgm/gameing/me/GmMe"
import MyTeam from "../../engtst/mgm/gameing/me/team/MyTeam"
import GmPlay from "./GmPlay";

export default class GmProtocol {

	constructor( p, n)
	{
		this.pls=new PackageTools(1024*3);
		this.xntf=n;
		this.iEchoId=0;

		this.pos1=0,this.pos2,this.pos3=0;
 		this.ox,this.oy;
	}
	GetBase( pls)
	{
		this.iSid=pls.GetNextInt();
		this.iPid=pls.GetNextInt();
		this.iUid=pls.GetNextInt();
		this.xntf.msg.SetStartMessage(pls.iLength, pls.databuf);
	}
	set_Head()
	{
		this.pls.iOffset=0;
		this.pls.InsertShort(500);
		this.pls.InsertInt(this.iSid);
		this.pls.InsertInt(this.iPid);
		this.pls.InsertInt(this.iUid);
		this.pls.InsertInt(GameData.APKVersion);
		this.pls.InsertByte(this.iEchoId);
		this.xntf.msg.SetStartMessage(this.pls.iOffset, this.pls.databuf);
	}

	s_CheckVersion()
	{
//		for(int i=0;i<100;i++)GmPlay.sop("ffffffffffffffffffffffffff");
		if(GmProtocol.sMid=="0")GmProtocol.sMid="";//设备号
		this.pls.iOffset=0;
		this.pls.InsertInt(GameData.APKVersion);
		this.pls.InsertInt(XRecordFast.iClientID);
		this.pls.InsertString(GmProtocol.sMid);
		this.xntf.InQueue(510, this.pls.iOffset, this.pls.databuf);
	}
	s_CheckReply( i)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(i);
		this.xntf.InQueue(512, this.pls.iOffset, this.pls.databuf);
	}
	s_Check2Reply( i)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(i);
		this.xntf.InQueue(514, this.pls.iOffset, this.pls.databuf);
	}
	s_ClientExp( s)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(s);
		this.xntf.InQueue(513, this.pls.iOffset, this.pls.databuf);
	}
	s_Regist( user, pass)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(user);
		this.pls.InsertString(pass);
		this.xntf.InQueue(1000, this.pls.iOffset, this.pls.databuf);
	}
	s_Login( user, pass)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(user);
		this.pls.InsertString(pass);
		this.xntf.InQueue(1001, this.pls.iOffset, this.pls.databuf);
	}
	s_Login_xyx(qudao,token,cs)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(qudao);
		this.pls.InsertString(token);
		this.pls.InsertString(cs);
		this.xntf.InQueue(4002, this.pls.iOffset, this.pls.databuf);
	}
	s_GetRoleList( sectorid, severid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(sectorid);
		this.pls.InsertInt(severid);
		this.xntf.InQueue(1006, this.pls.iOffset, this.pls.databuf);
	}
	s_GetSeverList( sid)
	{//区id
		this.pls.iOffset=0;
		this.pls.InsertByte(sid);
		this.xntf.InQueue(1003, this.pls.iOffset, this.pls.databuf);
	}
	s_CreateRole( secId, sevId, name, sex, race)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(secId);
		this.pls.InsertInt(sevId);
		this.pls.InsertString(name);
		this.pls.InsertByte(sex);
		this.pls.InsertByte(race);
		this.xntf.InQueue(1004, this.pls.iOffset, this.pls.databuf);
	}
	s_StartGame( rid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(rid);
		this.pls.InsertInt(GameData.GV);
		console.log('请求进入游戏：',rid,this.pls);
		this.xntf.InQueue(1005, this.pls.iOffset, this.pls.databuf);
	}
	s_GetRandName( sex)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(sex);
		this.xntf.InQueue(1007, this.pls.iOffset, this.pls.databuf);
	}
///////////////////////////////////////////////////////////////////
	s_UpgradeMe( to)
	{//升到to级
		this.pls.iOffset=0;
		this.pls.InsertShort(to);
		this.xntf.InQueue(2001, this.pls.iOffset, this.pls.databuf);
	}
	s_AddPoint( tz, fl, ll, nl, mj)
	{
		this.pls.iOffset=0;
		this.pls.InsertShort(tz);
		this.pls.InsertShort(fl);
		this.pls.InsertShort(ll);
		this.pls.InsertShort(nl);
		this.pls.InsertShort(mj);
		this.xntf.InQueue(2002, this.pls.iOffset, this.pls.databuf);
	}
	s_GetInSchool( sid)
	{//school id
		this.pls.iOffset=0;
		this.pls.InsertByte(sid);
		this.xntf.InQueue(2003, this.pls.iOffset, this.pls.databuf);
	}
	s_learnschoolskill( sid, point)
	{//skill id
		this.pls.iOffset=0;
		this.pls.InsertInt(sid);
		this.pls.InsertByte(point);
		this.xntf.InQueue(2004, this.pls.iOffset, this.pls.databuf);
	}
	s_setflag( flagid, type, value)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(flagid);
		this.pls.InsertInt(type);
		this.pls.InsertInt(value);
		this.xntf.InQueue(2005, this.pls.iOffset, this.pls.databuf);
	}
	s_getflag()
	{
		this.pls.iOffset=0;
		this.xntf.InQueue(2006, this.pls.iOffset, this.pls.databuf);
	}
	s_proctitle( type, title)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertString(title);
		this.xntf.InQueue(2007, this.pls.iOffset, this.pls.databuf);
	}
	s_changenick( nick)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(nick);
		this.xntf.InQueue(2008, this.pls.iOffset, this.pls.databuf);
	}
	s_SetLock( type, cs, detail)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs);
		this.pls.InsertString(detail);
		this.xntf.InQueue(2009, this.pls.iOffset, this.pls.databuf);
	}
	//////////////////////////////////////////////////////////////////////
	s_PublicChat( channel, s)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(channel);//当前所在频道
		this.pls.InsertString(s);
		for(var i=0;i<4;i++)
		{
			this.pls.InsertByte(PublicChat_Send.cext[i].type);
			if(PublicChat_Send.cext[i].type>=100)continue;
			if(PublicChat_Send.cext[i].type==0 || PublicChat_Send.cext[i].type==1 || PublicChat_Send.cext[i].type==4)
			{//物品，宠物
				this.pls.InsertInt(PublicChat_Send.cext[i].eid);
				this.pls.InsertShort(PublicChat_Send.cext[i].tid);
			}
			else if(PublicChat_Send.cext[i].type==2)
			{//语音
				this.pls.InsertInt(PublicChat_Send.cext[i].eid);
				this.pls.InsertString(PublicChat_Send.cext[i].name);
				this.pls.InsertString(PublicChat_Send.cext[i].detail);
			}
		}
		this.xntf.InQueue(2020, this.pls.iOffset, this.pls.databuf);
	}
	s_FriendOperate( type, rid, cs)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(rid);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2021, this.pls.iOffset, this.pls.databuf);
	}
	s_PrivateChat( rid, name, s)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(rid);//发给目标的ID
		this.pls.InsertString(name);//发给目标的名字
		this.pls.InsertString(s);
		
		for(var i=0;i<4;i++)
		{
			this.pls.InsertByte(PrivateChat_Send.cext[i].type);
			if(PrivateChat_Send.cext[i].type>=100)continue;
			if(PrivateChat_Send.cext[i].type==0 || PrivateChat_Send.cext[i].type==1 || PrivateChat_Send.cext[i].type==4)
			{//物品，宠物
				this.pls.InsertInt(PrivateChat_Send.cext[i].eid);
				this.pls.InsertShort(PrivateChat_Send.cext[i].tid);
			}
			else if(PrivateChat_Send.cext[i].type==2)
			{//语音
				this.pls.InsertInt(PrivateChat_Send.cext[i].eid);
				this.pls.InsertString(PrivateChat_Send.cext[i].name);
				this.pls.InsertString(PrivateChat_Send.cext[i].detail);
			}
		}
		this.xntf.InQueue(2022, this.pls.iOffset, this.pls.databuf);
	}
	s_ReviewPrivateChat( session)
	{//看过了私聊消息,让服务器设置标记
		this.pls.iOffset=0;
		this.pls.InsertInt(session);
		this.xntf.InQueue(2023, this.pls.iOffset, this.pls.databuf);
	}
	//////////////////////////
	s_ChangeMapNew( type, dest)
	{
		GmPlay.gi().mapChanging.changed = true;
		GmPlay.gi().mapChanging.type = type;
		GmPlay.gi().mapChanging.dest = dest;
		
		this.pls.iOffset=0;
		this.pls.InsertInt(type);//目标地图ID
		this.pls.InsertInt(dest);
		this.xntf.InQueue(2032, this.pls.iOffset, this.pls.databuf);
		MapManager.gi().iMapChangeing=100;//变暗
	}
	s_ChangeMap( to, dx, dy)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(to);//目标地图ID
		this.pls.InsertInt(dx);
		this.pls.InsertInt(dy);
		this.xntf.InQueue(2030, this.pls.iOffset, this.pls.databuf);
		MapManager.gi().iMapChangeing=100;//变暗
	}

	s_UploadMyPos()
	{
		var i;
		if(GmMe.me.iRid==0)return;
		this.pls.iOffset=0;
		this.pls.InsertInt(MapManager.gi().iVisualMapId);//当前所在地图ID
		this.pls.InsertInt(Gameing.gameing.me.iX);
		this.pls.InsertInt(Gameing.gameing.me.iY);
		this.pls.InsertByte(GmMe.me.iFace8+GmMe.me.iFace4*10);
		this.pos2=(XDefine.get_ms()%100000000);
		this.pls.InsertInt(parseInt(this.pos2));
//		this.pos2=(XDefine.get_ms()%100000);
//		GmPlay.sop("this.pos2="+this.pos2);
//		GmPlay.sop("new="+this.pos2+","+GmMe.me.iX+","+GmMe.me.iY);
//		GmPlay.sop("this.pos2="+this.pos2+",,,,,len="+XDefine.llength(this.ox, this.oy, GmMe.me.iX, GmMe.me.iY)*10000);

//		if(GmMe.me.iWeapLev>=0 && GmMe.me.iWeapLev<=160)this.pls.InsertByte(GmMe.me.iWeapLev/10);
//		else this.pls.InsertByte(100);
		
		//前行路径
		
		if(MyTeam.bTeamLeader())
		{//带着队伍,更新队伍成员位置
			this.pls.InsertByte(1);
			for(i=1;i<5;i++)
			{
				if(MyTeam.iTeamRid[i]!=0)
				{//
					var nr=Gameing.gameing.findnrs(MyTeam.iTeamRid[i]);
					if(nr!=null)
					{
						this.pls.InsertInt(nr.iRid);
						this.pls.InsertShort(nr.iDx);
						this.pls.InsertShort(nr.iDy);
						this.pls.InsertByte(nr.iDFaceTo);
//						GmPlay.sop("x="+nr.iDx+",y="+nr.iDy+",f="+nr.iDFaceTo);
					}
				}
			}
			this.pls.InsertInt(0);
		}
		else this.pls.InsertByte(0);
		
		if(this.pos1==0)this.pos1=XDefine.get_ms();
		else
		{
			this.pos2=XDefine.get_ms()-this.pos1;
			
//			GmPlay.sop("speed="+XDefine.llength(this.ox, this.oy, GmMe.me.iX, GmMe.me.iY)*10000/this.pos2);
			
			//距离除以时间差
			this.pos1=XDefine.get_ms();

			this.ox=GmMe.me.iX;
			this.oy=GmMe.me.iY;
		}
		this.xntf.InQueue(2031, this.pls.iOffset, this.pls.databuf);
	}
	s_TeamOperate( type, rid, did)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(rid);
		this.pls.InsertInt(did);
//		System.
//		Log.e("SOP","jh="+rid+","+did);
		this.xntf.InQueue(2035, this.pls.iOffset, this.pls.databuf);
	}
	s_TeamOperateEx( type, rid, did, lev1, lev2)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(rid);
		this.pls.InsertInt(did);
		this.pls.InsertInt(lev1);
		this.pls.InsertInt(lev2);
		this.xntf.InQueue(2035, this.pls.iOffset, this.pls.databuf);
	}
	s_TeamOperateEx( type, rid, did, s)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(rid);
		this.pls.InsertInt(did);
		this.pls.InsertString(s);
		this.xntf.InQueue(2035, this.pls.iOffset, this.pls.databuf);
	}
	s_ChangeZhen( zhen)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(zhen);
		this.xntf.InQueue(2036, this.pls.iOffset, this.pls.databuf);
	}
	///////////////////////////////////////
	s_SwapEquipment( swapto)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(swapto);
		this.xntf.InQueue(2044, this.pls.iOffset, this.pls.databuf);
	}
	s_MoveGoods( gid, oid, pos, dgid, doid, dpos)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(gid);
		this.pls.InsertByte(oid);
		this.pls.InsertByte(pos);
		this.pls.InsertInt(dgid);
		this.pls.InsertByte(doid);
		this.pls.InsertByte(dpos);
		this.xntf.InQueue(2040, this.pls.iOffset, this.pls.databuf);
	}
	s_DropGoods( gid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(gid);
		this.xntf.InQueue(2041, this.pls.iOffset, this.pls.databuf);
	}
	s_GiveGoods( type, drid, gid, count)
	{//0给钱，1给物品
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(drid);
		this.pls.InsertInt(gid);
		this.pls.InsertInt(count);
		this.xntf.InQueue(2042, this.pls.iOffset, this.pls.databuf);
	}
	s_StartSell( type, point, price, sn)
	{//type=0开始摆摊，1上架物品，2下架物品，3上架宠物，4下架宠物，5结束摆摊，6修改摊名
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(point);
		this.pls.InsertInt(price);
		this.pls.InsertString(sn);
		this.xntf.InQueue(2043, this.pls.iOffset, this.pls.databuf);
	}
	s_StartBuy( drid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(drid);
		this.xntf.InQueue(2045, this.pls.iOffset, this.pls.databuf);
	}
	s_MyBuy( type, drid, gid, count)
	{//type=0买物品，type=1买宠物
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(drid);
		this.pls.InsertInt(gid);
		this.pls.InsertInt(count);
		this.xntf.InQueue(2046,this.pls.iOffset, this.pls.databuf);
	}
	s_UseGoods( gid, count, msg)
	{//非战斗使用物品
		this.pls.iOffset=0;
		this.pls.InsertInt(gid);
		this.pls.InsertByte(count);
		this.pls.InsertString(msg);
		this.xntf.InQueue(2047,this.pls.iOffset, this.pls.databuf);
	}
	s_RecoverGoods( gid)
	{//回收物品
		this.pls.iOffset=0;
		this.pls.InsertInt(gid);
		this.xntf.InQueue(2048,this.pls.iOffset, this.pls.databuf);
	}
	s_NewShopBuy( shopid, pos, tid, count)
	{//在npc商店购买
		this.pls.iOffset=0;
		this.pls.InsertInt(shopid);
		this.pls.InsertInt(pos);
		this.pls.InsertInt(tid);
		this.pls.InsertInt(count);
		this.xntf.InQueue(2049, this.pls.iOffset, this.pls.databuf);
	}
	////////////////////////////////////////
	s_ChangePetName( pid, name)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.pls.InsertString(name);
		this.xntf.InQueue(2050, this.pls.iOffset, this.pls.databuf);
	}
	s_ChangeFightPet( pid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.xntf.InQueue(2051, this.pls.iOffset, this.pls.databuf);
	}
	s_ChangeFollowPet( pid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.xntf.InQueue(2057, this.pls.iOffset, this.pls.databuf);
	}
	s_PetJJ( pid, type, cs)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.pls.InsertInt(type);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2058, this.pls.iOffset, this.pls.databuf);
	}
	s_DropPet( pid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.xntf.InQueue(2052, this.pls.iOffset, this.pls.databuf);
	}
	s_AddPetPoint( pid, tz, fl, ll, nl, mj)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.pls.InsertShort(tz);
		this.pls.InsertShort(fl);
		this.pls.InsertShort(ll);
		this.pls.InsertShort(nl);
		this.pls.InsertShort(mj);
		this.xntf.InQueue(2053, this.pls.iOffset, this.pls.databuf);
	}
	s_LearnPetSkill( pid, gid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.pls.InsertInt(gid);
		this.xntf.InQueue(2054, this.pls.iOffset, this.pls.databuf);
	}
	s_WashPet( pid, gid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(pid);
		this.pls.InsertInt(gid);
		this.xntf.InQueue(2055, this.pls.iOffset, this.pls.databuf);
	}
	s_OpenStore( type, order, iid)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(order);
		this.pls.InsertInt(iid);
		this.xntf.InQueue(2056, this.pls.iOffset, this.pls.databuf);
	}
	/////////////////////////////////////////////////////////
	s_SeverSelect( mtype, stype, cs)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(mtype);
		this.pls.InsertByte(stype);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2061, this.pls.iOffset, this.pls.databuf);
	}
	s_SevConfirm( cmd)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(cmd);
		this.xntf.InQueue(2068, this.pls.iOffset, this.pls.databuf);
	}
	s_NpcReply( npcid, sid, order)
	{//回答npc的问题
		this.pls.iOffset=0;
		this.pls.InsertInt(npcid);
		this.pls.InsertInt(sid);
		this.pls.InsertByte(order);
		this.xntf.InQueue(2062, this.pls.iOffset, this.pls.databuf);
	}
	s_NpcCmd( fromsev, npcid, sid, cmd, cs2, cs3, cs4, cs5)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(fromsev);
		this.pls.InsertString(npcid);
		this.pls.InsertString(sid);
		this.pls.InsertString(cmd);
		
		this.pls.InsertString(cs2);
		this.pls.InsertString(cs3);
		this.pls.InsertString(cs4);
		this.pls.InsertString(cs5);

		this.xntf.InQueue(2063, this.pls.iOffset, this.pls.databuf);
	}
	s_NpcShop( shopid)
	{//打开npc商店
		console.log('打开商店：',shopid)
		//return;
		this.pls.iOffset=0;
		this.pls.InsertInt(shopid);
		this.xntf.InQueue(2064, this.pls.iOffset, this.pls.databuf);
	}
	s_NpcShopBuy( shopid, gtype, count)
	{//在npc商店购买
		this.pls.iOffset=0;
		this.pls.InsertInt(shopid);
		this.pls.InsertInt(gtype);
		this.pls.InsertInt(count);
		this.xntf.InQueue(2065, this.pls.iOffset, this.pls.databuf);
	}
	s_IngotMall( cs1, cs2)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.xntf.InQueue(2066, this.pls.iOffset, this.pls.databuf);
	}
	s_IngotMallBuy( shopid, gtype, count)
	{//在npc商店购买
		this.pls.iOffset=0;
		this.pls.InsertInt(shopid);
		this.pls.InsertInt(gtype);
		this.pls.InsertInt(count);
		this.xntf.InQueue(2067, this.pls.iOffset, this.pls.databuf);
	}
	////////////////////////////////////////////
	s_GetSchoolMission( sid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(sid);
		this.xntf.InQueue(2070, this.pls.iOffset, this.pls.databuf);
	}
	s_GetMissionDetail( mid, type)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.pls.InsertByte(type);
		this.xntf.InQueue(2071, this.pls.iOffset, this.pls.databuf);
	}
	s_FinishMission( type, mpoint, extgid, extpid)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(mpoint);
		this.pls.InsertInt(extgid);
		this.pls.InsertInt(extpid);
		this.xntf.InQueue(2072, this.pls.iOffset, this.pls.databuf);
	}
	s_GetMission( type, mid)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(mid);
		this.xntf.InQueue(2073, this.pls.iOffset, this.pls.databuf);
	}
	s_CancelMission( mid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.xntf.InQueue(2074, this.pls.iOffset, this.pls.databuf);
	}
	////////////////////////////////////////////帮派
	s_CreateGov( name, detail)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(name);
		this.pls.InsertString(detail);
		this.xntf.InQueue(2080, this.pls.iOffset, this.pls.databuf);
	}
	s_GetGovList( page)
	{//获取帮派列表,页数
		this.pls.iOffset=0;
		this.pls.InsertByte(page);
		this.xntf.InQueue(2081, this.pls.iOffset, this.pls.databuf);
	}
	s_ApplyForGov( govid)
	{//申请加入帮派
		this.pls.iOffset=0;
		this.pls.InsertInt(govid);
		this.xntf.InQueue(2082, this.pls.iOffset, this.pls.databuf);
	}
	s_GetBaseGovData( dtype, cs)
	{//获取基本帮派资料
		this.pls.iOffset=0;
		this.pls.InsertByte(dtype);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2083, this.pls.iOffset, this.pls.databuf);
	}
	s_OperateGovMember( rid, type, cs)
	{//对帮派成员操作，设置职位，踢出，允许加入
		this.pls.iOffset=0;
		this.pls.InsertInt(rid);
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2084, this.pls.iOffset, this.pls.databuf);
	}
	s_GetIntoGov( govid)
	{//进入帮派
		this.pls.iOffset=0;
		this.pls.InsertInt(govid);
		this.xntf.InQueue(2085, this.pls.iOffset, this.pls.databuf);
		MapManager.gi().iMapChangeing=100;//变暗
	}
	s_HireWorker( type, lev, time)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertByte(lev);
		this.pls.InsertByte(time);
		this.xntf.InQueue(2086, this.pls.iOffset, this.pls.databuf);
	}
	s_GovSet( type, cs)
	{//帮主对帮派设置
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2087, this.pls.iOffset, this.pls.databuf);
	}
	s_GovOperateFrame( type)
	{//打开帮派操作页面
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.xntf.InQueue(2088, this.pls.iOffset, this.pls.databuf);
	}
	s_LearnGovSkill( sid, point)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(sid);
		this.pls.InsertInt(point);
		this.xntf.InQueue(2089, this.pls.iOffset, this.pls.databuf);
	}
	s_GovXiu( sid, point)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(sid);
		this.pls.InsertInt(point);
		this.xntf.InQueue(2090, this.pls.iOffset, this.pls.databuf);
	}
	s_LeaveGov()
	{
		this.pls.iOffset=0;
		this.xntf.InQueue(2091, this.pls.iOffset, this.pls.databuf);
	}
	s_UseSkill( skillid, cs1, cs2, cs3, cs4, cs5, cs6)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(skillid);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.pls.InsertInt(cs3);
		this.pls.InsertInt(cs4);
		this.pls.InsertInt(cs5);
		this.pls.InsertInt(cs6);
		this.xntf.InQueue(2092, this.pls.iOffset, this.pls.databuf);
	}
	s_WatchOn( type, iid, flag, name)
	{//类型0角色，1物品，2宠物
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(iid);
		this.pls.InsertInt(flag);
		this.pls.InsertString(name);
		this.xntf.InQueue(2093, this.pls.iOffset, this.pls.databuf);
	}
	s_NewGovOperate( type, cs1, cs2, cs3, cs4, detail)
	{//类型0，1cs，2cs，3detail
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.pls.InsertInt(cs3);
		this.pls.InsertInt(cs4);
		this.pls.InsertString(detail);
		this.xntf.InQueue(2095, this.pls.iOffset, this.pls.databuf);
		if(type==4)MapManager.gi().iMapChangeing=100;
	}
	//////////////////////////////////////////
	s_ChangeFightMounts( mid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.xntf.InQueue(2101, this.pls.iOffset, this.pls.databuf);
	}
	s_DropMounts( mid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.xntf.InQueue(2102, this.pls.iOffset, this.pls.databuf);
	}
	s_TrainMounts( mid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.xntf.InQueue(2103, this.pls.iOffset, this.pls.databuf);
	}
	s_AddMountsPoint( mid, tz, fl, ll, nl, mj)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.pls.InsertShort(tz);
		this.pls.InsertShort(fl);
		this.pls.InsertShort(ll);
		this.pls.InsertShort(nl);
		this.pls.InsertShort(mj);
		this.xntf.InQueue(2104, this.pls.iOffset, this.pls.databuf);
	}
	s_FeedMounts( mid, gid, tid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.pls.InsertInt(gid);
		this.pls.InsertInt(tid);
		this.xntf.InQueue(2105, this.pls.iOffset, this.pls.databuf);
	}
	s_JJMounts( mid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(mid);
		this.xntf.InQueue(2106, this.pls.iOffset, this.pls.databuf);
	}
	//////////////////////////////////////////
	s_FightOperate( rop, cmd)
	{//发送战斗操作
		this.pls.iOffset=0;
		this.pls.InsertByte(rop);//人物还是宠物?
		this.pls.InsertByte(cmd[0]);//操作类型
		this.pls.InsertInt(cmd[1]);//操作参数
		this.pls.InsertInt(cmd[2]);//操作目标
		this.xntf.InQueue(2200, this.pls.iOffset, this.pls.databuf);
	}
	s_PK( rid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(rid);
		this.xntf.InQueue(2201, this.pls.iOffset, this.pls.databuf);
	}
	s_WatchFight( type, rid)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);//0进入观战，1离开观战
		this.pls.InsertInt(rid);
		this.xntf.InQueue(2202, this.pls.iOffset, this.pls.databuf);
	}
	s_Trade( type, g1, c1, g2, c2, g3, c3, p1, p2, p3, money)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(g1);
		this.pls.InsertInt(c1);
		this.pls.InsertInt(g2);
		this.pls.InsertInt(c2);
		this.pls.InsertInt(g3);
		this.pls.InsertInt(c3);
		this.pls.InsertInt(p1);
		this.pls.InsertInt(p2);
		this.pls.InsertInt(p3);
		this.pls.InsertInt(money);
		this.xntf.InQueue(2010, this.pls.iOffset, this.pls.databuf);
	}
	s_SeverEvent( mtype, stype, cs1, cs2, cs3)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(mtype);
		this.pls.InsertByte(stype);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.pls.InsertInt(cs3);
		this.xntf.InQueue(2100, this.pls.iOffset, this.pls.databuf);
	}
	////////////////////
	s_NoviceHelp( type, cs1, cs2, s)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.pls.InsertString(s);
		this.xntf.InQueue(2300, this.pls.iOffset, this.pls.databuf);
	}
	s_GetCodeReward( type, s)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertString(s);
		this.xntf.InQueue(2301, this.pls.iOffset, this.pls.databuf);
	}
	s_Pay( qudao, oid, amount, extid, extdetail)
	{//充值订单号->服务器:渠道ID，订单号，金额，extid,extdetail
		this.pls.iOffset=0;
		this.pls.InsertInt(GameVersion.QUDAO);
		this.pls.InsertString(oid);
		this.pls.InsertInt(amount);
		this.pls.InsertInt(extid);
		this.pls.InsertString(extdetail);
		this.xntf.InQueue(2302, this.pls.iOffset, this.pls.databuf);
	}
	s_PromptActivity( type, cs)
	{//活跃度请求
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2304, this.pls.iOffset, this.pls.databuf);
	}
	s_FuBen( type, cs1)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs1);
		this.xntf.InQueue(2400, this.pls.iOffset, this.pls.databuf);
	}
	s_CreateFuBen( fbid, detail)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(fbid);
		this.pls.InsertString(detail);
		this.xntf.InQueue(2401, this.pls.iOffset, this.pls.databuf);
	}
	s_ApplyFuBen( fbid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(fbid);
		this.xntf.InQueue(2402, this.pls.iOffset, this.pls.databuf);
	}
	s_ManageFuBen( type, cs1, cs2)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.xntf.InQueue(2403, this.pls.iOffset, this.pls.databuf);
	}
	s_FuBenMail( cs)
	{//获取副本积分兑换
		this.pls.iOffset=0;
		this.pls.InsertInt(cs);
		this.xntf.InQueue(2408, this.pls.iOffset, this.pls.databuf);
	}
	s_FubenMallBuy( flag, tid, price)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(flag);
		this.pls.InsertInt(tid);
		this.pls.InsertInt(price);
		this.xntf.InQueue(2409, this.pls.iOffset, this.pls.databuf);
	}
	s_LandOperate( type, cs1, cs2, cs3)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.pls.InsertInt(cs3);
		this.xntf.InQueue(2150, this.pls.iOffset, this.pls.databuf);
	}
	/////////////////////////////////////////战队
	s_CreateFT( name, detail)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(name);
		this.pls.InsertString(detail);
		this.xntf.InQueue(2500, this.pls.iOffset, this.pls.databuf);
	}
	s_ApplyFT( fid)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(fid);
		this.xntf.InQueue(2502, this.pls.iOffset, this.pls.databuf);
	}
	s_GetApply( page)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(page);
		this.xntf.InQueue(2503, this.pls.iOffset, this.pls.databuf);
	}
	s_FTAgree( type, rid)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(rid);
		this.xntf.InQueue(2504, this.pls.iOffset, this.pls.databuf);
	}
	s_FTChallenge( type, cs, cs2)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs);
		this.pls.InsertInt(cs2);
		this.xntf.InQueue(2505, this.pls.iOffset, this.pls.databuf);
	}
	s_FTOperate( type, cs1, cs2)
	{
		this.pls.iOffset=0;
		this.pls.InsertByte(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.xntf.InQueue(2506, this.pls.iOffset, this.pls.databuf);
	}
	//商会
	s_CreateShop( name, type)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(name);
		this.pls.InsertInt(type);
		this.xntf.InQueue(2600, this.pls.iOffset, this.pls.databuf);
	}
	//活动
	s_AfternoooQuestion( type, cs1, cs2)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.xntf.InQueue(2700, this.pls.iOffset, this.pls.databuf);
	}
	//
	s_ExtendCmd( cmd, cs1, cs2, cs3, cs4, cs5, cs6, cs7)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(cmd);
		this.pls.InsertString(cs1);
		this.pls.InsertString(cs2);
		this.pls.InsertString(cs3);
		this.pls.InsertString(cs4);
		this.pls.InsertString(cs5);
		this.pls.InsertString(cs6);
		this.pls.InsertString(cs7);
		this.xntf.InQueue(2800, this.pls.iOffset, this.pls.databuf);
	}
	xms_send( cmd, cs1, cs2, cs3, cs4, cs5, cs6)
	{
		this.pls.iOffset=0;
		this.pls.InsertString(cmd);
		this.pls.InsertString(cs1);
		this.pls.InsertString(cs2);
		this.pls.InsertString(cs3);
		this.pls.InsertString(cs4);
		this.pls.InsertString(cs5);
		this.pls.InsertString(cs6);
		this.xntf.InQueue(5000, this.pls.iOffset, this.pls.databuf);
	}
	s_LeaderBoardFresh( type, cs1, cs2)
	{
		this.pls.iOffset=0;
		this.pls.InsertInt(type);
		this.pls.InsertInt(cs1);
		this.pls.InsertInt(cs2);
		this.xntf.InQueue(2910, this.pls.iOffset, this.pls.databuf);
	}
}
GmProtocol.sMid="0";
GmProtocol.pt=null;
GmProtocol.gi=function()
{
	if(GmProtocol.pt==null)GmProtocol.pt=new GmProtocol(null,GmPlay.xntf);
	return GmProtocol.pt;
}
