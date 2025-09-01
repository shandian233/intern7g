
import SortAnima from "../../../config/SortAnima"
import XDefine from "../../../config/XDefine"
import DrawBuffer from "../../../map/DrawBuffer"
import MapManager from "../../../map/MapManager"
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import FireworksEffect from "../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../engtst/mgm/GmPlay"
import FormatString from "../../../engtst/mgm/frame/format/FormatString"
import SystemOperate from "../../../engtst/mgm/gameing/fast/SystemOperate"
import JQMode from "../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../engtst/mgm/gameing/me/goods/MyGoods"
import MyPets from "../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../engtst/mgm/gameing/me/pet/Pets"
import MySell from "../../../engtst/mgm/gameing/me/shop/MySell"
import MyTeam from "../../../engtst/mgm/gameing/me/team/MyTeam"

//附近玩家
export default class NearRole {
	
	constructor()
	{
		this.MAXMARK=8;
		var i,j;
		this.aa_body=new AnimaAction();
		this.aa_weapon=new AnimaAction();
		this.aa_mounts=new AnimaAction();
		this.iSpeed=8;
		this.bUseing=false;
		this.iPopoDelay=0;
		
		this.iWeapTid=0;
		this.iDWeapTid=0;
		this.iMountsTid=0;
		this.iDMountsTid=0;
		
		this.iChangeType=0;
		this.iDChangeType=0;
		
		this.bsc=true;
		this.bfc8=false;
		this.bfc6=false;
		this.sStat="站立";
		this.sFace8="左";
		
		this.aa_team=new AnimaAction();
		GmPlay.xani_ui.InitAnimaWithName("队伍图标", this.aa_team);
		this.aa_fighting=new AnimaAction();
		GmPlay.xani_ui.InitAnimaWithName("战斗中头顶", this.aa_fighting);
		
		this.sTitle="";
		this.iFollowPid=0;
		this.iFollowTid=10000;
		this.aa_follow=new AnimaAction();
		
		this.iMarks=new Array(this.MAXMARK);//
		for(i=0;i<this.MAXMARK;i++)this.iMarks[i]=new Int32Array(2);
		
		this.aa_mts=new Array(6);//
		this.aa_bds=new Array(6);//
		this.iColor=new Int32Array(6);//
		this.aa_cls=new Array(6);//
		for(i=0;i<6;i++){
			this.aa_mts[i]=new AnimaAction();
			this.aa_bds[i]=new AnimaAction();
			this.aa_cls[i]=new Array(6);
			this.iColor[i]=0;
			for(j=0;j<6;j++){
				this.aa_cls[i][j]=new AnimaAction();
			}
		}
		this.iFace6 = 0;
	}
	SetMarks()
	{
		var i;
		for(i=0;i<8;i++)
		{
			this.iMarks[i][0]=this.iX;
			this.iMarks[i][1]=this.iY;
		}
	}
	Go()
	{
		var i;
		if(this.iX==this.iDx && this.iY==this.iDy)
		{
//			GmPlay.sop(this.sName+"="+this.iFaceTo+","+this.iDFaceTo);
			if(this.IsStat("跑步"))this.ChangeStat("站立");
			if(this.iDFaceTo!=this.iFaceTo)
			{
				this.bfc8=true;
				this.bfc4=true;
			}
			this.iFaceTo=this.iDFaceTo;
			return;
		}
		var iTick=parseInt(XDefine.llength(this.iX,this.iY,this.iDx,this.iDy)/this.iSpeed);
		if(iTick<=0)
		{
			for(i=this.MAXMARK-1;i>0;i--)
			{
				this.iMarks[i][0]=this.iMarks[i-1][0];
				this.iMarks[i][1]=this.iMarks[i-1][1];
			}
			this.iMarks[0][0]=this.iX;
			this.iMarks[0][1]=this.iY;
			this.iX=this.iDx;
			this.iY=this.iDy;
			if(this.iDFaceTo!=this.iFaceTo)
			{
				this.bfc8=true;
				this.bfc4=true;
			}
			this.iFaceTo=this.iDFaceTo;
			return;
		}
		this.FaceTo();
		for(i=this.MAXMARK-1;i>0;i--)
		{
			this.iMarks[i][0]=this.iMarks[i-1][0];
			this.iMarks[i][1]=this.iMarks[i-1][1];
		}
		this.iMarks[0][0]=this.iX;
		this.iMarks[0][1]=this.iY;
		this.iX=this.iX+(this.iDx-this.iX)/iTick;
		this.iY=this.iY+(this.iDy-this.iY)/iTick;
		if(this.IsStat("站立"))this.ChangeStat("跑步");
	}

	 FaceTo()
	{
		var i,j;
		var iFace4;
		var s;
		
		i=360-XDefine.GetAngleXY(this.iDx,this.iDy,this.iX,this.iY);
		i%=360;
		
		if(0<=i && i<=90)iFace4=0;
		else if(90<=i && i<=180)iFace4=3;
		else if(180<=i && i<=270)iFace4=2;
		else iFace4=1;
//		GmPlay.sop("a="+iFace4+",,b="+this.iFaceTo/10);
		if(iFace4!=parseInt(this.iFaceTo/10))this.bfc4=true;
		
		j=this.iFace6;
		if(0<=i && i<=30)this.iFace6=0;
		else if(30<i && i<=90)this.iFace6=5;
		else if(90<i && i<=150)this.iFace6=4;
		else if(150<i && i<=210)this.iFace6=3;
		else if(210<i && i<=270)this.iFace6=2;
		else if(270<i && i<=330)this.iFace6=1;
		else this.iFace6=0;
		if(j!=this.iFace6)this.bfc6=true;
//		GmPlay.sop("ffff="+this.iFace6);
		
		s=this.sFace8;
		if(45*1-23<i && i<45*1+23)
		{
			this.iFaceTo=1;
			this.sFace8="右上";
		}
		else if(45*2-23<i && i<45*2+23)
		{
			this.iFaceTo=2;
			this.sFace8="上";
		}
		else if(45*3-23<i && i<45*3+23)
		{
			this.iFaceTo=3;
			this.sFace8="左上";
		}
		else if(45*4-23<i && i<45*4+23)
		{
			this.iFaceTo=4;
			this.sFace8="左";
		}
		else if(45*5-23<i && i<45*5+23)
		{
			this.iFaceTo=5;
			this.sFace8="左下";
		}
		else if(45*6-23<i && i<45*6+23)
		{
			this.iFaceTo=6;
			this.sFace8="下";
		}
		else if(45*7-23<i && i<45*7+23)
		{
			this.iFaceTo=7;
			this.sFace8="右下";
		}
		else
		{
			this.iFaceTo=0;
			this.sFace8="右";
		}
		
		this.iFaceTo=iFace4*10+this.iFaceTo;
//		if(i<180)
//		{
//			this.iFaceTo=1;
//			sFaceTo="右";
//		}
//		else
//		{
//			this.iFaceTo=0;
//			sFaceTo="左";
//		}
		if(s!=this.sFace8)this.bfc8=true;
//		if(j!=this.iFaceTo)bfc=true;
	}
	bFaceChanged6()
	{
		if(this.bfc6)
		{
			this.bfc6=false;
			return true;
		}
		return false;
	}
	 bFaceChanged4()
	{
		if(this.bfc4)
		{
			switch(parseInt(this.iFaceTo/10))
			{
			case 0:this.sFace4="右";break;
			case 1:this.sFace4="右下";break;
			case 2:this.sFace4="左下";break;
			case 3:this.sFace4="左";break;
			}
			this.bfc4=false;
			return true;
		}
		return false;
	}
	bFaceChanged8()
	{
		if(this.bfc8)
		{
			switch(this.iFaceTo%10)
			{
			case 0:this.sFace8="右";break;
			case 1:this.sFace8="右上";break;
			case 2:this.sFace8="上";break;
			case 3:this.sFace8="左上";break;
			case 4:this.sFace8="左";break;
			case 5:this.sFace8="左下";break;
			case 6:this.sFace8="下";break;
			case 7:this.sFace8="右下";break;
			}
			this.bfc8=false;
			return true;
		}
		return false;
	}
	 bStatChanged()
	{
		if(this.bsc)
		{
			this.bsc=false;
			return true;
		}
		return false;
	}
	ChangeStat( s)
	{
		if(this.sStat!=s)
		{
			this.sStat=s;
			this.bsc=true;
		}
	}
	IsStat( s)
	{
		if(this.sStat==s)return true;
		else return false;
	}
	 sSex()
	{
		return (this.iSex==0?"女":"男");
	}
	 sRace()
	{
		if(this.iRace==0)return "人";
		else if(this.iRace==1)return "魔";
		else return "仙";
	}
	
	DrawMounts( x, y, faceto, stat, changed)
	{//1鹿,2狮,3马
//		if(1==1)return;
		var i,j=0;
		var xb=this.iRace*2+this.iSex;
		var ifaceto=GmMe.face_sti(faceto);
		var istat=GmMe.stat_sti(stat);
		var itype=parseInt(this.iMountsTid/100)-1;
		var iMountsJjLev=this.iMountsTid%100;
		var ijj=iMountsJjLev-1;
//{{"前","人前","后","人后","武器"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"武器","右翅膀","人右","身体","人左","左翅膀"},{"后","人","武器","前"},{"左翅膀","人左","身体","人右","右翅膀","武器"},{"左翅膀","人左","身体","人右","右翅膀","武器"},{"左翅膀","人左","身体","人右","右翅膀","武器"}},//二阶
//GmPlay.xani_nmounts[itype]
		var offy=0;
		if(changed)this.iOffY=0;
		var lionoff=0;
		if(parseInt(this.iMountsTid/100)==2)lionoff=12;
//		iMountsJjLev--;
//		GmPlay.sop("itype="+itype+",,,,ijj="+ijj+",,,,istat="+istat+",,,ifaceto="+ifaceto);
//		this.aa_mts,this.aa_bds，0up     1down      2left     ,3right        ,4middle
		for(i=0;i<SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto].length;i++)
		{
//			GmPlay.sop(i+"="+SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]);
			if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="左翅膀")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(iMountsJjLev+"_"+stat+"_"+faceto+"_左翅膀",this.aa_mts[2]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[2]);
				this.aa_mts[2].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="右翅膀")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(iMountsJjLev+"_"+stat+"_"+faceto+"_右翅膀",this.aa_mts[3]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[3]);
				this.aa_mts[3].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="前")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(iMountsJjLev+"_"+stat+"_"+faceto+"_前",this.aa_mts[0]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[0]);
				this.aa_mts[0].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="后")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(iMountsJjLev+"_"+stat+"_"+faceto+"_后",this.aa_mts[1]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[1]);
				this.aa_mts[1].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="身体")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(iMountsJjLev+"_"+stat+"_"+faceto+"_身体",this.aa_mts[4]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[4]);
				this.aa_mts[4].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="飘带")
			{
				if(changed)
				{
					GmPlay.xani_nmounts[itype][ijj].InitAnimaWithName(iMountsJjLev+"_"+stat+"_"+faceto+"_飘带",this.aa_mts[5]);
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_mts[5]);
				this.aa_mts[5].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人前")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_前",this.aa_bds[0]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_前",0);
					j=this.aa_bds[0].pani.iAnimaY(this.aa_bds[0]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[0]);
				this.DrawColor(xb,this.aa_bds[0].iFrame,y+offy,x,y+lionoff,0);
				this.aa_bds[0].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人后")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_后",this.aa_bds[1]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_后",1);
					j=this.aa_bds[1].pani.iAnimaY(this.aa_bds[1]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[1]);
				this.DrawColor(xb,this.aa_bds[1].iFrame,y+offy,x,y+lionoff,1);
				this.aa_bds[1].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人左")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_左",this.aa_bds[2]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_左",2);
					j=this.aa_bds[2].pani.iAnimaY(this.aa_bds[2]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[2]);
				this.DrawColor(xb,this.aa_bds[2].iFrame,y+offy,x,y+lionoff,2);
				this.aa_bds[2].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人右")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto+"_右",this.aa_bds[3]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto+"_右",3);
					j=this.aa_bds[3].pani.iAnimaY(this.aa_bds[3]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[3]);
				this.DrawColor(xb,this.aa_bds[3].iFrame,y+offy,x,y+lionoff,3);
				this.aa_bds[3].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="人")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName("骑"+stat+"_"+faceto,this.aa_bds[4]);
					this.ChangeColor(xb,"骑"+stat+"_"+faceto,4);
					j=this.aa_bds[4].pani.iAnimaY(this.aa_bds[4]) - 30;
					if(this.iOffY>j)this.iOffY=j;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_bds[4]);
				this.DrawColor(xb,this.aa_bds[4].iFrame,y+offy,x,y+lionoff,4);
				this.aa_bds[4].NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT_MOUNT[itype][ijj][istat][ifaceto][i]=="武器")
			{
				if(changed)
				{
					this.iWeapTid=this.iDWeapTid;
					if(this.iWeapTid>=0)GmPlay.xani_weap[xb][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName("骑"+stat+"_"+faceto, this.aa_weapon);
				}
				if(this.iWeapTid>=0)
				{
					if(SystemOperate.bShowWeapon)DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y+lionoff, this.aa_weapon);
					this.aa_weapon.NextFrame();
				}
				offy++;
			}
		}
//		iMountsJjLev++;
//		this.iMountsTid
//		if (pms == null) {
//			this.bsc = true;
//			return;
//		}
		//_ANIMASORT_MOUNT[2马][1二阶][0站立1跑步][方向][切割]
	}
	ChangeColor( xb, sa, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			GmPlay.xani_color[xb][this.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_"+sa, this.aa_cls[m][i]);
		}
	}
	DrawColor( xb, frame, offy, x, y, m)
	{
		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			this.aa_cls[m][i].iFrame=frame;
			DrawBuffer.gi().DrawAnima_aa(offy,null, x, y, this.aa_cls[m][i]);
		}
	}
	DrawRole( x,  y, faceto, stat, changed) 
	{
		var i;
		var xb=this.iRace*2+this.iSex;
		var roff=0;//有坐骑动作起始
//		if (iFightMid <= 0 || MySell.gi().bSelling)roff=2;
//		else
//		{//根据坐骑类型设置起始
//		}
		var ifaceto=GmMe.face_sti(faceto);
		var istat=GmMe.stat_sti(stat)+roff;
//		GmPlay.sop("SortAnima="+SortAnima.iii);
//		GmPlay.sop("xb="+xb+",,,istat="+istat+",,,ifaceto="+ifaceto+",,,"+stat);
//		GmPlay.sop("AnimaSort._ANIMASORT="+AnimaSort._ANIMASORT.length);
		var offy=0;
		for(i=0;i<SortAnima._ANIMASORT[xb][istat][ifaceto].length;i++)
		{
//			GmPlay.sop("");
			if(SortAnima._ANIMASORT[xb][istat][ifaceto][i]=="人物")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName(stat+"_"+faceto, this.aa_body);
					this.ChangeColor(xb,stat+"_"+faceto,0);
					this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
				}
				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y, this.aa_body);
				this.DrawColor(xb,this.aa_body.iFrame,y+offy,x,y,0);
				this.aa_body.NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT[xb][istat][ifaceto][i]=="武器")
			{
				if(changed)
				{
					this.iWeapTid=this.iDWeapTid;
					//this.iWeapTid = MyGoods.gi().GetWeaponTid();
					if(this.iWeapTid>=0)GmPlay.xani_weap[xb][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName(stat+"_"+faceto, this.aa_weapon);
				}
				//GmPlay.sop(this.sName+"==="+this.iWeapTid+",,,"+SortAnima.WeapFlag(this.iWeapTid));
				if(this.iWeapTid>=0)
				{
//					GmPlay.sop("SortAnima.WeapFlag(this.iWeapTid)="+SortAnima.WeapFlag(this.iWeapTid));
					if(SystemOperate.bShowWeapon)DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y, this.aa_weapon);
					this.aa_weapon.NextFrame();
				}
//				GmPlay.sop("this.iWeapTid="+this.iWeapTid);
				offy++;
			}
		}
		// int xb=race*2+sex;
		// xani_newrole[0]
	}
	Draw()
	{
		if(JQMode.jq.bJQLock())return;
		var i;
		var bchanged=false;
		if(this.iDMountsTid!=this.iMountsTid)bchanged=true;//坐骑改变
		this.iMountsTid=this.iDMountsTid;
		if(this.iDChangeType!=this.iChangeType)bchanged=true;//变身改变
		this.iChangeType=this.iDChangeType;
		if(this.iChangeType>0)
		{//变身状态，改变动画成怪物动画
			bchanged=this.bStatChanged()|bchanged;
			bchanged=this.bFaceChanged6()|bchanged;
			if(bchanged)
			{
				if(this.iFace6==0)this.sFace6="右";
				else if(this.iFace6==1)this.sFace6="右下";
				else if(this.iFace6==2)this.sFace6="左下";
				else if(this.iFace6==3)this.sFace6="左";
				else if(this.iFace6==4)this.sFace6="左上";
				else if(this.iFace6==5)this.sFace6="右上";
				
				if(this.iChangeType>=10000)GmPlay.xani_pets[this.iChangeType%10000].InitAnimaWithName("变异_"+this.sStat+"_"+this.sFace6, this.aa_body);
				else GmPlay.xani_pets[this.iChangeType%10000].InitAnimaWithName(this.sStat+"_"+this.sFace6, this.aa_body);
				this.iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
			}
		}
		else if(this.iMountsTid>0 && this.iIsSelling==0 && SystemOperate.bShowMount)
		{//有坐骑
			bchanged = this.bWeapChanged() | bchanged;//武器变化
			bchanged=this.bFaceChanged8()|bchanged;
			bchanged=this.bStatChanged()|bchanged;
		}
		else
		{//没坐骑或摆摊
			//this.iMountsTid/100   坐骑tid
			//%100                  jjlev
			bchanged = this.bStatChanged() | bchanged;//动作变化
			bchanged = this.bFaceChanged8() | bchanged;//方向变化
			bchanged = this.bWeapChanged() | bchanged;//武器变化

//			i=this.iMountsTid/100;
//			j=this.iMountsTid%100;
//			if(bchanged)
//			{
//				switch(this.iFaceTo/10)
//				{
//				case 0:this.sFace4="右";break;
//				case 1:this.sFace4="右下";break;
//				case 2:this.sFace4="左下";break;
//				case 3:this.sFace4="左";break;
//				}
//				GmPlay.xani_mounts[i].InitAnimaWithName(j+"_"+this.sStat+"_"+this.sFace4,this.aa_mounts);
//				GmPlay.xani_role[this.iRace*2+this.iSex].InitAnimaWithName(GmPlay.de_mounts.strValue(i, 0, 2)+j+"_"+this.sStat+"_"+this.sFace4, this.aa_body);
//				this.iOffY=this.aa_body.pani.iAnimaY(this.aa_body)-30;
////				GmPlay.sop(GmPlay.de_mounts.strValue(i, 0, 2)+j+"_"+this.sStat+"_"+this.sFace4);
////				GmPlay.sop(this.iMountsTid+"");
//			}
		}

//		if(this.bWeapChanged())
//		{//获得当前武器栏
//			this.iWeapTid=this.iDWeapTid;
//			if(this.iWeapTid>0)
//			{
//				if(this.iWeapTid==248 || this.iWeapTid==249 || this.iWeapTid==250)
//				{//70武器xani_weap70
//					GmPlay.xani_weap70.InitAnimaWithName(GmMe.sSex(this.iSex)+GmPlay.de_goods.strValue(this.iWeapTid, 0, 4)+"_"+this.sStat+"_"+this.sFace8, this.aa_weapon);
//				}
//				else GmPlay.xani_role[this.iRace*2+this.iSex].InitAnimaWithName(GmPlay.de_goods.strValue(this.iWeapTid, 0, 4)+"_"+this.sStat+"_"+this.sFace8, this.aa_weapon);
//				this.aa_weapon.iFrame=this.aa_body.iFrame;
//				this.aa_weapon.iDelay=this.aa_body.iDelay;
//			}
//		}
		
		if(SystemOperate.bShowRole && this.iFollowPid>0 && SystemOperate.bShowFollow)
		{//展示的宠物
				{//跟人物对应起来
					var iFollowX=this.iMarks[5][0];
					var iFollowY=this.iMarks[5][1];
					var s="";
					if(parseInt(this.iFollowTid/1000)==0)s="";
					else s="变异_";
					if(iFollowX>this.iX)s+=this.sStat+"_左";
					else s+=this.sStat+"_右";
					GmPlay.xani_pets[this.iFollowTid%1000].InitAnimaWithName(s, this.aa_follow);//左
					this.aa_follow.SetFrame(GmPlay.iDelay);
					
					DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+iFollowY,null, MapManager.gi().iOffx+iFollowX, MapManager.gi().iOffy+iFollowY, this.aa_follow);//跟随的宠物
					FireworksEffect.DrawAura(0, MapManager.gi().iOffx+iFollowX, MapManager.gi().iOffy+iFollowY, DrawBuffer.gi(), MapManager.gi().iOffy+iFollowY-1);//附近玩家
//					DrawBuffer.gi().DrawText(MapManager.gi().iOffy+iFollowY, 1, MapManager.gi().iOffx+iFollowX+1, MapManager.gi().iOffy+iFollowY+30+1, this.sFollowName, 0xff000000,20);
//					DrawBuffer.gi().DrawText(MapManager.gi().iOffy+iFollowY+1, 1, MapManager.gi().iOffx+iFollowX, MapManager.gi().iOffy+iFollowY+30, this.sFollowName, 0xffffff00,20);
					DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy+iFollowY-1, 1, MapManager.gi().iOffx+iFollowX, MapManager.gi().iOffy+iFollowY+30, this.sFollowName, 0xffffb080,20,1,0xff000000);
				}
		}
		DrawBuffer.gi().BeginGroup();

		//2称谓名字
		if(SystemOperate.bShowName || MyTeam.bInTmpTeam(this.iRid))
		{
			if(this.sTitle.length>0 && SystemOperate.bShowTitle)
			{
				DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy+this.iY, 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+20, this.sTitle, 0xff80c0ff,20,1,0xff000000);//蓝色
				DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy+this.iY, 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+20+20, this.sName, 0xff80ff80,20,1,0xff000000);//绿色
			}
			else
			{
				DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy+this.iY, 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+30, this.sName, 0xff80ff80,20,1,0xff000000);
			}
		}
		//3人物
		if(SystemOperate.bShowRole || MyTeam.bInTmpTeam(this.iRid))
		{
			//1影子
			FireworksEffect.DrawAura(this.iAura, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY, DrawBuffer.gi(), MapManager.gi().iOffy+this.iY);//附近玩家
			if(this.iChangeType>0)
			{
				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY,this.aa_body.xani, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY, this.aa_body);
				this.aa_body.NextFrame();
			}
			else if(this.iMountsTid>0 && this.iIsSelling==0 && SystemOperate.bShowMount)
			{
				this.DrawMounts(MapManager.gi().iOffx+this.iX,MapManager.gi().iOffy+this.iY,this.sFace8,this.sStat,bchanged);
			}
			else
			{
				this.DrawRole(MapManager.gi().iOffx+this.iX,MapManager.gi().iOffy+this.iY,this.sFace8,this.sStat,bchanged);
//				this.iWeapTid=this.iDWeapTid;
//				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY,GmPlay.xani_role[this.iRace*2+this.iSex], MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY, this.aa_mounts);
//				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY+1,GmPlay.xani_role[this.iRace*2+this.iSex], MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY, this.aa_body);
//				this.aa_mounts.NextFrame();
//				this.aa_body.NextFrame();
			}

			
			if(this.iIsLeader==1)
			{
				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY,GmPlay.xani_ui,MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+this.iOffY,this.aa_team);
//				GmPlay.xani_ui.DrawAnima_aa(MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-120, this.aa_team);
				GmPlay.xani_ui.NextFrame(this.aa_team);
			}
			if(this.iFighting==1)
			{
				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY,GmPlay.xani_ui,MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+this.iOffY,this.aa_fighting);
//				GmPlay.xani_ui.DrawAnima_aa(MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-120, this.aa_team);
				GmPlay.xani_ui.NextFrame(this.aa_fighting);
			}
			this.DrawPopo(MapManager.gi().iOffx+this.iX,MapManager.gi().iOffy+this.iY);
		}

		if(this.iIsSelling==1 && SystemOperate.bShowSell)
		{//摆摊中
			this.iSellWidth=M3DFast.gi().GetTextWidth(this.sSellName, 25);
			i=(this.iSellWidth-60)/30+2;
			if(i<2)i=2;
			else if(i>6)i=6;
			
			GmPlay.xani_ui2.InitAnimaWithName("普通摊位", GmPlay.aaa);
//			GmPlay.xani_ui.InitAnimaWithName("摊位"+i, GmPlay.aaa);
//			DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.iY,GmPlay.xani_ui, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-140, GmPlay.aaa);
			GmPlay.aaa.iFrame=0;DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy+this.iY-2, MapManager.gi().iOffx+this.iX-this.iSellWidth/2-9, MapManager.gi().iOffy+this.iY-140+5, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
			GmPlay.aaa.iFrame=1;DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy+this.iY-2, MapManager.gi().iOffx+this.iX-this.iSellWidth/2, MapManager.gi().iOffy+this.iY-140+5, GmPlay.aaa, 101, 1.0*this.iSellWidth/10, 1, 0, 0, 0);
			GmPlay.aaa.iFrame=2;DrawBuffer.gi().DrawAnimaEx(MapManager.gi().iOffy+this.iY-2, MapManager.gi().iOffx+this.iX+this.iSellWidth/2, MapManager.gi().iOffy+this.iY-140+5, GmPlay.aaa, 101, 1, 1, 0, 0, 0);
//			DrawBuffer.gi().FillRect(MapManager.gi().iOffy+this.iY, MapManager.gi().iOffx+this.iX-this.iSellWidth/2, MapManager.gi().iOffy+this.iY-140, MapManager.gi().iOffx+this.iX+this.iSellWidth/2, MapManager.gi().iOffy+this.iY-100, 0xff000000);
//			DrawBuffer.gi().DrawText_2(MapManager.gi().iOffy+this.iY-1, 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-120, this.sSellName, 0xff40c0ff,25,1,0xff000000);
			DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY-1, 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY-120, this.sSellName, 0xff40c0ff,25);
		}
		DrawBuffer.gi().EndGroup();
//		DrawBuffer.gi().DrawText(MapManager.gi().iOffy+this.iY+20, 1, MapManager.gi().iOffx+this.iX, MapManager.gi().iOffy+this.iY+20, this.sName+"["+this.sRace()+"]["+this.sSex()+"]", 0xffffff00,25);

	}
	DrawPopo( x, y)
	{
		if(this.iPopoDelay<=0)return;

		this.iPopoDelay--;
		FormatString.gi().Format(this.sPopoString, 151, 25);
		x-=FormatString.gi().iW/2;
		var sy=y+this.iOffY+40-FormatString.gi().iH;
		DrawBuffer.gi().FillRect(y, x, sy, x+FormatString.gi().iW, sy+FormatString.gi().iH, 0x50000000);
		FormatString.gi().DrawToBuffer(y+1,x,sy);
	}
	bWeapChanged()
	{
		if(this.bwc)
		{
			this.bwc=false;
			return true;
		}
		return false;
	}
}
