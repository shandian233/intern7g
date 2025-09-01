import MapDialog from "../map/npcboom/MapDialog"
import NewMapDialog from "../map/npcboom/NewMapDialog"
import BASESEQUENCE from "../map/npcboomstruct/BASESEQUENCE"
import SE_BRANCH from "../map/npcboomstruct/SE_BRANCH"
import SE_EVENT from "../map/npcboomstruct/SE_EVENT"
import SE_HEAD from "../map/npcboomstruct/SE_HEAD"
import SE_REQUIREMENT from "../map/npcboomstruct/SE_REQUIREMENT"
import SE_SELECT from "../map/npcboomstruct/SE_SELECT"
import XDefine from "../config/XDefine"
import PackageTools from "../engine/PackageTools"
import AnimaAction from "../engine/graphics/AnimaAction"
import M3DFast from "../engine/graphics/M3DFast"
import XAnima from "../engine/graphics/XAnima"
import FireworksEffect from "../engtst/mgm/FireworksEffect"
import GmPlay from "../engtst/mgm/GmPlay"
import MyAI from "../engtst/mgm/MyAI"
import FormatString from "../engtst/mgm/frame/format/FormatString"
import SteeringWheel from "../engtst/mgm/gameing/fast/SteeringWheel"
import GmMe from "../engtst/mgm/gameing/me/GmMe"
import MyMission from "../engtst/mgm/gameing/me/mission/MyMission"
import MyTeam from "../engtst/mgm/gameing/me/team/MyTeam"
import TeamOperate from "../engtst/mgm/gameing/me/team/TeamOperate"

import _VISUALBLOCK from "./_VISUALBLOCK"
import ProcMap from "./ProcMap"
import DrawBuffer from "./DrawBuffer"

export default class VisualBlock {

   constructor( m3f)
   {
    this.MAXVISUALBLOCK=128
       var i;
       this.vbs=new Array(this.MAXVISUALBLOCK);
       for(i=0;i<this.MAXVISUALBLOCK;i++)this.vbs[i]=null;
       
       this.mapdialog=new MapDialog(m3f,this);
       this.newdialog=new NewMapDialog();
      
       
       this.procmap=new ProcMap();
       this.bNpcLoaded=false;
       this.ani_npcs=new XAnima(m3f);
       
       this.aa_flag1=null;
	   this.aa_flag2=null;
	   
       this.iLockNpcId=-1;
       this.iGoToNpcFlag=-1;
       this.iGoToNpcId=-1;
	   VisualBlock.pvb=this;
	   
	   this.bFaceToFace=false;

   }

	FindNpcByName( name)
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].sNpcName.length>0)
				{
//					GmPlay.sop(""+this.vbs[i].sNpcName+"=========="+name);
					if(this.vbs[i].sNpcName==name)return this.vbs[i];
				}
			}
		}
		return null;
	}
	

	 ClearNpcFlag()
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				this.vbs[i].iFlag=0;
			}
		}
	}
	 SetNpcFlag( npcid, flag)
	{//flag=0 无，1可交（感叹号），2可接（问好）
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].bCurrentBlock && this.vbs[i].iNpcId==npcid)
				{
					this.vbs[i].iFlag=flag;
					return;
				}
			}
		}
	}
	 LoadNpcs( pls, path)
	{
		this.ani_npcs.LoadAnima_fullpath(path,pls,true,this._LoadNpcs);
	}
	_LoadNpcs()
	{
		VisualBlock.pvb.bNpcLoaded=true;
	}
	 DrawPopo( vb, iOffx, iOffy)
	{
		if(vb.iPopoDelay<=0)return;

		vb.iPopoDelay--;
		FormatString.gi().Format(vb.sPopoString, 151, 25);
		var x=iOffx+vb.iX-FormatString.gi().iW/2;
//		y-=(FormatString.gi().iH-iOffY-40);iOffY=aa_body.pani.iAnimaY(aa_body)-30;
		var sy=iOffy+vb.iY+vb.aa_body.pani.iAnimaY(vb.aa_body)-FormatString.gi().iH;
		DrawBuffer.gi().FillRect(iOffy+vb.iY, x, sy, x+FormatString.gi().iW, sy+FormatString.gi().iH, 0x50000000);
		FormatString.gi().DrawToBuffer(iOffy+vb.iY+1,x,sy);
	}
	DrawNpcInBuffer( pdbf, iOffx, iOffy)
	{
		var i,j;
		if(!this.bNpcLoaded)return;
		if(this.aa_flag1==null)this.aa_flag1=GmPlay.xani_ui.InitAnimaWithName("交任务感叹号", null);
		if(this.aa_flag2==null)this.aa_flag2=GmPlay.xani_ui.InitAnimaWithName("接任务问号", null);
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].sNpcName.length>0)
				{//是npc
					if(this.vbs[i].iDx!=this.vbs[i].iX || this.vbs[i].iDy!=this.vbs[i].iY)
					{//npc行走
						j=XDefine.llength(this.vbs[i].iX,this.vbs[i].iY,this.vbs[i].iDx,this.vbs[i].iDy);
						if(j>8)
						{
							this.vbs[i].iX=(this.vbs[i].iDx-this.vbs[i].iX)*8/j+this.vbs[i].iX;
							this.vbs[i].iY=(this.vbs[i].iDy-this.vbs[i].iY)*8/j+this.vbs[i].iY;
						}
						else
						{
							this.vbs[i].iX=this.vbs[i].iDx;
							this.vbs[i].iY=this.vbs[i].iDy;							
						}
					}
//					GmPlay.sop(""+this.vbs[i].sNpcName);
//					if(this.vbs[i].iX<0 || this.vbs[i].iY<0 || this.vbs[i].iX>MapManager.gi().mapdata.iMapWidth || this.vbs[i].iY>MapManager.gi().mapdata.iMapHeight)continue;
					if(this.vbs[i].iX<0 || this.vbs[i].iY<0)continue;
					this.DrawPopo(this.vbs[i],iOffx,iOffy);
					if(parseInt(this.vbs[i].iAnimaType/100000)==3)
					{//植物
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY-20,null,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY-20,this.vbs[i].aa_body);
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY,null,iOffx+this.vbs[i].iX-40,iOffy+this.vbs[i].iY,this.vbs[i].aa_body);
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY,null,iOffx+this.vbs[i].iX+40,iOffy+this.vbs[i].iY,this.vbs[i].aa_body);
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY+20,null,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY+20,this.vbs[i].aa_body);
						continue;
					}
					if(parseInt(this.vbs[i].iAnimaType/100000)==4)
					{//树木
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY,null,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY,this.vbs[i].aa_body);
						continue;
					}
					if(this.vbs[i].sAniName!="传送点")
					{//不是传送点的阴影
						FireworksEffect.DrawAura(0, iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY, pdbf, iOffy+this.vbs[i].iY-1);//npc影子
					}
					pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY,this.ani_npcs,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY,this.vbs[i].aa_body);
					if(parseInt(this.vbs[i].iAnimaType/100000)==1 && this.vbs[i].iWeapId>0)
					{//带武器的角色
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY+1,this.ani_npcs,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY,this.vbs[i].aa_weapon);
						this.vbs[i].aa_weapon.NextFrame();
					}
					
					if(this.vbs[i].iDx!=this.vbs[i].iX || this.vbs[i].iDy!=this.vbs[i].iY)
					{//行走状态
						if(parseInt(this.vbs[i].iAnimaType/100000)==1)
						{//人物
							if(this.vbs[i].iActionStat!=1 || this.vbs[i].iFaceTo!=this.vbs[i].GetFace8(this.vbs[i].iDx, this.vbs[i].iDy))
							{
								this.vbs[i].iActionStat=1;
								this.vbs[i].iFaceTo=this.vbs[i].GetFace8(this.vbs[i].iDx, this.vbs[i].iDy);

								GmPlay.xani_newrole[parseInt(this.vbs[i].iAnimaType/10000)%10].InitAnimaWithName("跑步_"+this.vbs[i].FaceTo(this.vbs[i].iFaceTo), this.vbs[i].aa_body);
								if(this.vbs[i].iWeapId>0)
								{
									TeamOperate.ResetWeapon(this.vbs[i].iWeapId, (parseInt(this.vbs[i].iAnimaType/10000)%10)%2, this.vbs[i].sAniName, this.vbs[i].aa_weapon);
								}
							}
						}
						else if(parseInt(this.vbs[i].iAnimaType/100000)==2)
						{//怪物
							if(this.vbs[i].iActionStat!=1 || this.vbs[i].iFaceTo!=this.vbs[i].GetFace4(this.vbs[i].iDx, this.vbs[i].iDy))
							{
								this.vbs[i].iActionStat=1;
								this.vbs[i].iFaceTo=this.vbs[i].GetFace8(this.vbs[i].iDx, this.vbs[i].iDy);

								GmPlay.xani_pets[this.vbs[i].iWeapId].InitAnimaWithName(((parseInt(this.vbs[i].iAnimaType/10000)%10)==0?"":"变异_")+"跑步_"+this.vbs[i].FaceTo(this.vbs[i].iFaceTo),this.vbs[i].aa_body);
							}
						}
					}
					else
					{//站立状态
						if(this.vbs[i].iActionStat!=0)
						{
							this.vbs[i].iActionStat=0;
							if(parseInt(this.vbs[i].iAnimaType/100000)==1)
							{//人物
								GmPlay.xani_newrole[parseInt(this.vbs[i].iAnimaType/10000)%10].InitAnimaWithName("站立_"+this.vbs[i].FaceTo(this.vbs[i].iFaceTo), this.vbs[i].aa_body);
								if(this.vbs[i].iWeapId>0)
								{
									TeamOperate.ResetWeapon(this.vbs[i].iWeapId, (parseInt(this.vbs[i].iAnimaType/10000)%10)%2, this.vbs[i].sAniName, this.vbs[i].aa_weapon);
								}
							}
							else if(parseInt(this.vbs[i].iAnimaType/100000)==2)
							{//怪物
								GmPlay.xani_pets[this.vbs[i].iWeapId].InitAnimaWithName(((parseInt(this.vbs[i].iAnimaType/10000)%10)==0?"":"变异_")+"站立_"+this.vbs[i].FaceTo(this.vbs[i].iFaceTo),this.vbs[i].aa_body);
							}
						}
					}
					//名字
					pdbf.DrawText_2(iOffy+this.vbs[i].iY,1,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY+20,this.vbs[i].sNpcName,0xffffff00,20,1,0xff000000);
//					this.ani_npcs.DrawAnima_aa(pm3f,iOffx+this.vbs[i]->iX,iOffy+this.vbs[i]->iY,&this.vbs[i]->aa);
					this.vbs[i].aa_body.NextFrame();
					
					switch(this.vbs[i].iFlag)
					{
					case 1://感叹号
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY,GmPlay.xani_ui,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY-100,this.aa_flag1);
//						pdbf.DrawText(iOffy+this.vbs[i].iY+20,1,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY-110,"!",0xff00ff00,50);
						break;
					case 2://问好
						pdbf.DrawAnima_aa(iOffy+this.vbs[i].iY,GmPlay.xani_ui,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY-100,this.aa_flag2);
//						pdbf.DrawText(iOffy+this.vbs[i].iY+20,1,iOffx+this.vbs[i].iX,iOffy+this.vbs[i].iY-110,"?",0xff00ff00,50);
						break;
					}
//					pm3f->DrawTextEx(iOffx+this.vbs[i]->iX,iOffy+this.vbs[i]->iY+20,this.vbs[i]->sNpcName,0xffffffff,15,1);
				}
			}
		}
		GmPlay.xani_ui.NextFrame(this.aa_flag1);
		GmPlay.xani_ui.NextFrame(this.aa_flag2);
	}
	npctalk( pls)
	{
		var npctype=pls.GetNextByte();//0本地npc,1动态npc
		var npcid=pls.GetNextInt();//npcid
		var tk=pls.GetNextString();//内容
		this._npctalk(npctype,npcid,tk,200);
	}
	_npctalk( npctype, npcid, tk, tm)
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)continue;
			if(npctype==0)
			{//本地npc
				if(!this.vbs[i].bCurrentBlock)continue;
				if(this.vbs[i].iNpcId==npcid)
				{
					this.vbs[i].sPopoString=tk;
					this.vbs[i].iPopoDelay=tm;
					break;
				}
			}
			else if(npctype==1)
			{//
				if(this.vbs[i].bCurrentBlock)continue;
				if(this.vbs[i].iNpcId==npcid)
				{
					this.vbs[i].sPopoString=tk;
					this.vbs[i].iPopoDelay=200;
					break;
				}
			}
		}
	}
	 npcmove( pls)
	{
		var npctype=pls.GetNextByte();//0本地npc,1动态npc
		var npcid=pls.GetNextInt();//npcid
//		String tk=pls.GetNextString();//内容
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)continue;
			if(npctype==1)
			{
				if(this.vbs[i].bCurrentBlock)continue;
				if(this.vbs[i].iNpcId==npcid)
				{
//					this.vbs[i].iX=pls.GetNextInt();
//					this.vbs[i].iY=pls.GetNextInt();
					this.vbs[i].iDx=pls.GetNextInt();
					this.vbs[i].iDy=pls.GetNextInt();
	//				GmPlay.sop("aa="+this.vbs[i].iDx+"bb="+this.vbs[i].iDy);
//					this.vbs[i].iDx=this.vbs[i].iX;
//					this.vbs[i].iDy=this.vbs[i].iY;
					break;
				}
			}
		}
	}
	AddVoidNpc()
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)break;
		}
		if(i>=this.MAXVISUALBLOCK)return null;//npc池满了
		this.vbs[i]=new _VISUALBLOCK(i);
		return this.vbs[i];
	}
	clearnpc( pls)
	{
		var i;
		var npcid=pls.GetNextInt();
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)continue;
			if(this.vbs[i].bCurrentBlock)continue;
			if(this.vbs[i].iNpcId==npcid)
			{
				if(VisualBlock.iLastProcBase==i)VisualBlock.iLastProcBase=-1;
				this.vbs[i]=null;
				break;
			}
		}
	}
	 getnpctalkext( pls)
	{
		var i,j,k;
		var npcid=pls.GetNextInt();
		var sid=pls.GetNextInt();
		
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)continue;
			if(this.vbs[i].bCurrentBlock)continue;
			if(this.vbs[i].iNpcId==npcid && this.vbs[i].iSid==sid)break;
		}
		if(i<this.MAXVISUALBLOCK)
		{//找到了npc，更新数据，一般为更新是否战斗标记
			k=0;
			while(true)
			{
				GmPlay.sop("off="+pls.iOffset);
				j=pls.GetNextByte();
				GmPlay.sop(""+j);
				if(j==-1)break;
				this.vbs[i].pss[k]=this.LoadBase(j,pls);
				k++;
			}
			return;
		}
	}
	 getnpc( pls)
	{//2060
		var i,j,k;
		var npcid=pls.GetNextInt();
		var sid=pls.GetNextInt();
		
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)continue;
			if(this.vbs[i].bCurrentBlock)continue;
			if(this.vbs[i].iNpcId==npcid && this.vbs[i].iSid==sid)break;
		}
		if(i<this.MAXVISUALBLOCK)
		{//找到了npc，更新数据，一般为更新是否战斗标记
			return;
		}
		//没找到，新建一个
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]==null)break;
		}
		if(i>=this.MAXVISUALBLOCK)return;//npc池满了
		var ppp=i;
		this.vbs[i]=new _VISUALBLOCK(i);
		this.vbs[i].bCurrentBlock=false;
		this.vbs[i].iNpcId=npcid;
		this.vbs[i].iSid=sid;
		this.vbs[i].iX=pls.GetNextInt();
		this.vbs[i].iY=pls.GetNextInt();
		this.vbs[i].iDx=this.vbs[i].iX;
		this.vbs[i].iDy=this.vbs[i].iY;
		this.vbs[i].sNpcName=pls.GetNextString();
		this.vbs[i].iAnimaType=pls.GetNextInt();
		this.vbs[i].sAniName=pls.GetNextString();
		this.vbs[i].sBaseAniName=this.vbs[i].sAniName;
		this.vbs[i].iActionStat=0;
		this.vbs[i].iR=30;
		j=parseInt(this.vbs[i].iAnimaType/100000);
		
		this.vbs[i].iStandFlag=-1;
//		GmPlay.sop("npcid="+npcid+" x="+this.vbs[i].iX/16+" y="+this.vbs[i].iY/16+" name="+this.vbs[i].sNpcName);
		if(j==0)this.ani_npcs.InitAnimaWithName(this.vbs[i].sAniName, this.vbs[i].aa_body);//npc
		else if(j==1)
		{//人物
			this.vbs[i].iWeapId=this.vbs[i].iAnimaType%10000;
			k=parseInt(this.vbs[i].iAnimaType/10000)%10;//race*2+sex
			GmPlay.xani_newrole[k].InitAnimaWithName(this.vbs[i].sAniName, this.vbs[i].aa_body);
			if(this.vbs[i].iWeapId>0)
			{
				TeamOperate.ResetWeapon(this.vbs[i].iWeapId, k%2, this.vbs[i].sAniName, this.vbs[i].aa_weapon);
//				GmPlay.xani_role[k].InitAnimaWithName(GmPlay.de_goods.strValue(this.vbs[i].iWeapId, 0, 4)+"_"+this.vbs[i].sAniName, this.vbs[i].aa_weapon);
			}
		}
		else if(j==2)
		{//怪物
//			for(int zz=0;zz<100;zz++)GmPlay.sop("j="+this.vbs[i].iAnimaType);
			this.vbs[i].iWeapId=this.vbs[i].iAnimaType%10000;//怪物ID
			k=parseInt(this.vbs[i].iAnimaType/10000)%10;//是否变异
			GmPlay.xani_pets[this.vbs[i].iWeapId].InitAnimaWithName((k==0?"":"变异_")+this.vbs[i].sAniName,this.vbs[i].aa_body);
		}
		else if(j==3 || j==4)
		{//植物
			GmPlay.xani_grow.InitAnimaWithName(this.vbs[i].sAniName, this.vbs[i].aa_body);
		}
		this.vbs[i].pss[0]=new SE_SELECT();
		var pselect=this.vbs[i].pss[0];
		var pevent;
		pselect.iType=4;
		pselect.iCount=pls.GetNextShort();
		pselect.sQuestion=pls.GetNextString();
		for(i=0;i<pselect.iCount;i++)
		{
			pselect.sAnswers[i]=pls.GetNextString();
			pselect.next[i]=new SE_EVENT();
			pevent=pselect.next[i];
			pevent.iType=5;
			pevent.iEid=pls.GetNextShort();
			pevent.sValues[0]=""+pls.GetNextInt();//npcid
			pevent.sValues[1]=""+pls.GetNextByte();//order
		}
		//////////使用定义的形象
		j=pls.GetNextInt();//standflag
		if(j!=100000)
		{
			i=ppp;
			k=pls.GetNextInt();//define id
			if(GmPlay.de_npc.intValue(k, 0, 7)==j)
			{
				this.vbs[i].iStandFlag=j;
				this.vbs[i].sStandName=GmPlay.de_npc.strValue(k, 0, 8);
				this.vbs[i].iFaceTo=pls.GetNextByte();
				this.vbs[i].ResetStandAnima(this.vbs[i].ToX(this.vbs[i].iFaceTo),this.vbs[i].ToY(this.vbs[i].iFaceTo));
//				GmPlay.sop("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz123");
			}
		}
	}
	ClearVisual()
	{
		console.log('清除npc')
		for(var i=0;i<this.MAXVISUALBLOCK;i++)this.vbs[i]=null;
		VisualBlock.iLastProcBase=-1;
		
		this.ClearNpcFlag();
		MyMission.m.linktonpc();
	}
//	public int this.iBoomX,this.iBoomY;
	 LoadVisual( pls)
	{
		//console.log('加载npc')
		//this.ClearVisual();
		var i,j,k;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			// this.vbs[i]=null;
			if(this.vbs[i]==null)break;
		}
//		ReleaseVisual();
		this.iBoomX=0;this.iBoomY=0;
		// i=0;
		while(true)
		{
			j=pls.GetNextByte();
			if(j==-1)break;
			this.vbs[i]=new _VISUALBLOCK(i);
			this.vbs[i].bCurrentBlock=true;
			this.vbs[i].iX=pls.GetNextInt();
			this.vbs[i].iY=pls.GetNextInt();
			this.vbs[i].iDx=this.vbs[i].iX;
			this.vbs[i].iDy=this.vbs[i].iY;
			this.vbs[i].iR=pls.GetNextByte();
			pls.GetNextInt();//LinkToX
			this.vbs[i].iNpcId=pls.GetNextInt();//动画用ID所定义的,名字任意取
			this.vbs[i].sNpcName=pls.GetNextString();
			this.vbs[i].sAniName=pls.GetNextString();
			this.vbs[i].sBaseAniName=this.vbs[i].sAniName;
			this.vbs[i].iActionStat=0;
			this.ani_npcs.InitAnimaWithName(this.vbs[i].sAniName, this.vbs[i].aa_body);
			
			this.vbs[i].iStandFlag=GmPlay.de_npc.intValue(this.vbs[i].iNpcId, 0, 7);
			if(this.vbs[i].iStandFlag>=0)
			{
				this.vbs[i].sStandName=GmPlay.de_npc.strValue(this.vbs[i].iNpcId, 0, 8);
				this.vbs[i].iFaceTo=GmPlay.de_npc.intValue(this.vbs[i].iNpcId, 0, 11);
				this.vbs[i].ResetStandAnima(this.vbs[i].ToX(this.vbs[i].iFaceTo),this.vbs[i].ToY(this.vbs[i].iFaceTo));
			}
			
			if(this.iBoomX==0 && this.vbs[i].iX>0)
			{
				this.iBoomX=this.vbs[i].iX;
				this.iBoomY=this.vbs[i].iY;
			}

			k=0;
			while(true)
			{
				j=pls.GetNextByte();
				if(j==-1)break;
				this.vbs[i].pss[k]=this.LoadBase(j,pls);
				k++;
			}

			i++;
		}
		VisualBlock.iLastProcBase=-1;
		
		this.ClearNpcFlag();
		MyMission.m.linktonpc();
	}
	 LoadBase( type, pls)
	{
		var i,j;
		var bs = null;
		var phead;
		var pbranch;
		var prequirement;
		var pselect;
		var pevent;

		switch(type)
		{
		case 0:
			break;
		case 1:
			phead=new SE_HEAD();
			phead.sName=pls.GetNextString();
			j=pls.GetNextByte();
			if(j!=-1)phead.next=this.LoadBase(j,pls);
			bs=phead;
			break;
		case 2:
			pbranch=new SE_BRANCH();
			pbranch.iCount=pls.GetNextByte();
			i=0;
			while(true)
			{
				j=pls.GetNextByte();
				if(j==-1)break;
				pbranch.next[i]=this.LoadBase(j,pls);
				i++;
			}
			bs=pbranch;
			break;
		case 3:
			prequirement=new SE_REQUIREMENT();
			prequirement.iRid=pls.GetNextShort();
			for(i=0;i<SE_REQUIREMENT.MAXREQUIREMENTVALUE;i++)
			{
				prequirement.sValues[i]=pls.GetNextString();
			}
			j=pls.GetNextByte();
			if(j!=-1)prequirement.next=this.LoadBase(j,pls);
			bs=prequirement;
			break;
		case 4:
			pselect=new SE_SELECT();
			pselect.sHead=pls.GetNextString();
			pselect.iCount=pls.GetNextShort();
			pselect.sQuestion=pls.GetNextString();
			GmPlay.sop(pselect.sHead+":"+pselect.sQuestion);
			for(i=0;i<SE_SELECT.MAXSELECTCOUNT;i++)
			{
				pselect.sAnswers[i]=pls.GetNextString();
			}
			i=0;
			while(true)
			{
				j=pls.GetNextByte();
				if(j==-1)break;
				pselect.next[i]=this.LoadBase(j,pls);
				i++;
			}
			bs=pselect;
			break;
		case 5:
			pevent=new SE_EVENT();
			pevent.iEid=pls.GetNextShort();
			for(i=0;i<SE_EVENT.MAXEVENTVALUE;i++)
			{
				pevent.sValues[i]=pls.GetNextString(); 
//				GmPlay.sop("event 5 cs ="+pevent.sValues[i]);
			}
			j=pls.GetNextByte();
			if(j!=-1)pevent.next=this.LoadBase(j,pls);
			bs=pevent;
			break;
		}
		bs.iType=type;
		return bs;
	}
	ProcBase( bs)
	{
		var i;
		var phead;
		var pbranch;
		var prequirement;
		var pselect;
		var pevent;
//		GmPlay.sop("222222222222222222222222222222222222222222222222222222222222222222222222222222222="+bs.iType);
		if(bs==null)return false;
		GmPlay.sop("Checking"+bs.iType);
		switch(bs.iType)
		{
		case 1:
			phead=bs;
			if(phead.next!=null)return this.ProcBase(phead.next);
//			phead.sName=pls.GetNextString();
//			j=pls.GetNextByte();
//			if(j!=-1)phead.next=this.LoadBase(j,pls);
//			bs=phead;
			break;
		case 2://分支
			pbranch=bs;
			for(i=0;i<pbranch.iCount;i++)
			{
				if(pbranch.next[i]!=null)
				{
					if(this.ProcBase(pbranch.next[i]))return true;
				}
			}
			break;
		case 3://条件，需要回调
			prequirement=bs;
			if(this.procmap.RequirementCheck(prequirement))
			{//满足条件，往下执行
				if(prequirement.next!=null)return this.ProcBase(prequirement.next);
			}
			if(true)return false;
			//break;
		case 4:
			pselect=bs;
			if(VisualBlock.iLastProcBase>=0 && VisualBlock.iLastProcBase<this.MAXVISUALBLOCK && this.vbs[VisualBlock.iLastProcBase]!=null)this.mapdialog.InitDialog(pselect,this.vbs[VisualBlock.iLastProcBase].sNpcName);
			else this.mapdialog.InitDialog(pselect,"");
			//打开对话框，停止行走
			GmMe.me.ChangeStat("站立");
			SteeringWheel.sw.bLocked=false;
			if(true)return true;
			//break;
		case 5://事件
			pevent=bs;
			this.procmap.ProcEvent(pevent);
			if(pevent.next!=null)return this.ProcBase(pevent.next);
			else return true;
//			break;
		}
		return false;
	}
	SetTalkingNpc( npcid)
	{
		for(var i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].bCurrentBlock)continue;
				if(this.vbs[i].iNpcId==npcid)
				{
					VisualBlock.iLastProcBase=i;
					return;
				}
			}
		}
	}
//	public boolean bFaceToFace=false;
	 CheckNow( x, y)
	{
		var i,j,k,r;
		if(VisualBlock.iLastProcBase!=-1)
		{
//			GmPlay.sop("VisualBlock.iLastProcBase="+VisualBlock.iLastProcBase);
			if(this.vbs[VisualBlock.iLastProcBase].sAniName=="传送点")r=30;
			else r=60;
			if(VisualBlock.bInCircle(x,y,this.vbs[VisualBlock.iLastProcBase].iX,this.vbs[VisualBlock.iLastProcBase].iY,r))return true;
			VisualBlock.iLastProcBase=-1;
			this.mapdialog.bDialoging=false;
		}
		
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
//				GmPlay.sop("Checking Now");
				//半径重新计算
				if(!this.vbs[i].bCurrentBlock && (parseInt(this.vbs[i].iAnimaType/100000)==3 || parseInt(this.vbs[i].iAnimaType/100000)==4))r=30;//植物
				else if(this.vbs[i].sAniName=="传送点")r=30;
				else r=60;
				if(VisualBlock.bInCircle(x,y,this.vbs[i].iX,this.vbs[i].iY,r))
				{
					if(VisualBlock.iLastProcBase==i)continue;//防止反复触发
//					if(this.iGoToNpcId>=0 && this.iGoToNpcId!=i && this.vbs[i].iNpcId!=-1)continue;
					//GmPlay.sop("flag="+this.iGoToNpcFlag+",id="+this.iGoToNpcId);
					if(MyTeam.bInTeam() && !MyTeam.bTeamLeader() && !MyTeam.bAway())
					{//在队伍中，自己不是队长，不在暂离状态
						continue;
					}
					if(this.vbs[i].sAniName!="传送点")
					{
						if(this.iGoToNpcFlag>=0 && this.iGoToNpcFlag!=i)continue;
						if(this.iGoToNpcId>=0 && this.iGoToNpcId!=this.vbs[i].iNpcId)continue;
					}
					VisualBlock.iLastProcBase=i;
					VisualBlock.talkingnpc=this.vbs[i];
					
					GmPlay.sop(""+this.vbs[i].sNpcName+"============"+this.vbs[i].iNpcId);
					if(this.vbs[i].sNpcName.length>0)
					{//npc面向主角，根据主角位置
						if(this.vbs[i].iStandFlag>=0)
						{
							this.bFaceToFace=true;
							this.vbs[i].ResetStandAnima(x,y);
						}
						if(parseInt(this.vbs[i].iAnimaType/100000)==2)
						{//怪物
							k=parseInt(this.vbs[i].iAnimaType/10000)%10;//是否变异
							this.vbs[i].sAniName="站立_"+this.vbs[i].FaceTo(this.vbs[i].GetFace4(x,y));
							GmPlay.xani_pets[this.vbs[i].iWeapId].InitAnimaWithName((k==0?"":"变异_")+this.vbs[i].sAniName,this.vbs[i].aa_body);
							
							this.bFaceToFace=true;
						}
					}
					
					if(this.vbs[i].bCurrentBlock && MyAI.gi().iLogicStat==101 && MyAI.gi().iLogic_npc1==this.vbs[i].iNpcId)continue;
					/////////////////////////////////////////////////////////////////////////////1本地npc对应剧情任务，2特殊任务对应npc，3默认满足条件后
					if(this.vbs[i].iNpcId>=0)this.newdialog.Open(this.vbs[i]);
					else
					{//直接执行
						for(j=0;j<_VISUALBLOCK.MAXBASESEQUENCE;j++)
						{
							if(this.vbs[i].pss[j]!=null)
							{
								if(this.ProcBase(this.vbs[i].pss[j]))return true;
							}
						}
					}


////					if()
//					//和npc碰撞，检测是否完成某些任务
//					//GmPlay.sop("npcid="+this.vbs[i].iNpcId);
//					if(this.vbs[i].iNpcId>=0 && this.vbs[i].bCurrentBlock)MyMission.m.CheckMission1(this.vbs[i].iNpcId);
//					//GmPlay.sop("yyyyyyyyyy"+this.vbs[i].sNpcName+this.vbs[i].iStandFlag);
//
//					for(j=0;j<_VISUALBLOCK.MAXBASESEQUENCE;j++)
//					{
//						if(this.vbs[i].pss[j]!=null)
//						{
//							if(this.ProcBase(this.vbs[i].pss[j]))return true;
////							if(this.procmap.bMapChanged)
////							{
////								VisualBlock.iLastProcBase=-1;
////								this.procmap.bMapChanged=false;
////								return true;
////							}
//						}
//					}
//					//碰撞，打开选择页面
					return true;
				}
			}
		}

		return false;
	}


	 bOnNpc( x, y)
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].sNpcName.length>0)//是npc
				{
//					if(VisualBlock.bInCircle(x,y,this.vbs[i].iX,this.vbs[i].iY,this.vbs[i].iR))
					if(this.vbs[i].aa_body.bIn(this.vbs[i].iX, this.vbs[i].iY, x, y))
					{
						return true;
					}
				}
			}
		}
		return false;
	}
	 GoToNpc_byid( nid)
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].sNpcName.length>0)//是npc
				{
//					if(VisualBlock.bInCircle(x,y,this.vbs[i].iX,this.vbs[i].iY,this.vbs[i].iR))
					if(this.vbs[i].iNpcId==nid)
					{
//						GmPlay.sop("x="+x+",y="+y+",vbx"+this.vbs[i].iX+"vby"+this.vbs[i].iY);
						this.iNpcX=this.vbs[i].iX;
						this.iNpcY=this.vbs[i].iY;
						GmPlay.sop("go to npc");
						this.iGoToNpcFlag=this.vbs[i].iDownFlag;
						this.iLockNpcId=this.vbs[i].iNpcId;
						if(VisualBlock.iLastProcBase==i)VisualBlock.iLastProcBase=-1;
						return;
					}
				}
			}
		}
	}
	GoToNpc( x, y)
	{
		var i;
		for(i=0;i<this.MAXVISUALBLOCK;i++)
		{
			if(this.vbs[i]!=null)
			{
				if(this.vbs[i].sNpcName.length>0)//是npc
				{
//					if(VisualBlock.bInCircle(x,y,this.vbs[i].iX,this.vbs[i].iY,this.vbs[i].iR))
					if(this.vbs[i].aa_body.bIn(this.vbs[i].iX, this.vbs[i].iY, x, y))
					{
//						GmPlay.sop("x="+x+",y="+y+",vbx"+this.vbs[i].iX+"vby"+this.vbs[i].iY);
						this.iNpcX=this.vbs[i].iX;
						this.iNpcY=this.vbs[i].iY;
						GmPlay.sop("go to npc");
						this.iGoToNpcFlag=this.vbs[i].iDownFlag;
						this.iLockNpcId=this.vbs[i].iNpcId;
						if(VisualBlock.iLastProcBase==i)VisualBlock.iLastProcBase=-1;
						return true;
					}
				}
			}
		}
		return false;
	}
}

VisualBlock.talkingnpc=null;
VisualBlock.iLastProcBase=-1;
VisualBlock.pvb=null;
VisualBlock.bInCircle=function( x, y, rx, ry, rr)
{
    rx=rx-x;
    ry=ry-y;
    if(rx*rx+ry*ry>rr*rr)return false;
    else return true;
}