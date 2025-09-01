import XDefine from "../config/XDefine"
import BASESEQUENCE from "../map/npcboomstruct/BASESEQUENCE"
import AnimaAction from "../engine/graphics/AnimaAction"
import GmPlay from "../engtst/mgm/GmPlay"

export default class _VISUALBLOCK
{/*
	public int this.iDownFlag;//下标
	public int this.iNpcId,iSid;
	public boolean bCurrentBlock;//是否本地的虚拟块
	public static int MAXBASESEQUENCE=16;
	public int this.iX,this.iY,this.iR;
	public int this.iDx,this.iDy;
	public String this.sNpcName;
	public int this.iAnimaType,this.iWeapId;
	public String this.sBaseAniName,this.sAniName;
	public int this.iActionStat;
	public AnimaAction this.aa_body,this.aa_weapon;
	public int this.iFlag;
	
	public int this.iStandFlag;//0,1,2,3,10000+petid
	public String this.sStandName;//
	public int this.iFaceTo;//0,1,2,3,4,5,6,7
	
	public String this.sPopoString;
	public int iPopoDelay;
//	public int iLinkToX,iLinkToY;
	public BASESEQUENCE this.pss;*/
	
	constructor( df)
	{
		this.iDownFlag=df;
		var i;
		this.iR=30;
		this.sNpcName="";
		this.sBaseAniName="";
		this.sAniName="";
		this.pss=new Array(_VISUALBLOCK.MAXBASESEQUENCE);//
		for(i=0;i<_VISUALBLOCK.MAXBASESEQUENCE;i++)this.pss[i]=null;
		this.aa_body=new AnimaAction();
		this.aa_weapon=new AnimaAction();
		this.iFlag=0;
		this.iAnimaType=0;
		this.iPopoDelay=0;
	}
	
	  ResetStandAnima( x, y)
	{
		if(this.iStandFlag<0)return;
		var i;
		if(parseInt(this.iStandFlag/10000)==1)
		{//pet
			this.iFaceTo=this.GetFace4(x,y);
			i=this.iStandFlag%10000;//pid
			if(i>=1000);//变异
			i=i%1000;
			GmPlay.xani_pets[i].InitAnimaWithName("站立_"+this.FaceTo(this.iFaceTo), this.aa_body);
		}
		if(this.iStandFlag==0 || this.iStandFlag==1 || this.iStandFlag==2)
		{//直接npcid
			this.iFaceTo=this.GetFace4(x,y);
			GmPlay.xani_stand[this.iStandFlag].InitAnimaWithName(this.sStandName+"_"+this.FaceTo(this.iFaceTo), this.aa_body);
//			GmPlay.de_npc.strValue(this.iStandFlag, 0, 8);
		}
	}
	
	 GetFace4( x, y)
	{
		if(x<this.iX)
		{
			if(y<this.iY)return 1;
			else return 3;
		}
		else
		{
			if(y<this.iY)return 7;
			else return 5;
		}
	}
	 GetFace8( x, y)
	{
		var i;

		i = 360 - XDefine.GetAngleXY(this.iDx, this.iDy, this.iX, this.iY);
		i %= 360;

		if (45 * 1 - 23 < i && i < 45 * 1 + 23)return 7;
		else if (45 * 2 - 23 < i && i < 45 * 2 + 23)return 0;
		else if (45 * 3 - 23 < i && i < 45 * 3 + 23)return 1;
		else if (45 * 4 - 23 < i && i < 45 * 4 + 23)return 2;
		else if (45 * 5 - 23 < i && i < 45 * 5 + 23)return 3;
		else if (45 * 6 - 23 < i && i < 45 * 6 + 23)return 4;
		else if (45 * 7 - 23 < i && i < 45 * 7 + 23)return 5;
		else return 6;
	}
	
	 FaceTo( ft)
	{
		switch(ft)
		{
		case 0:return "上";
		case 1:return "左上";
		case 2:return "左";
		case 3:return "左下";
		case 4:return "下";
		case 5:return "右下";
		case 6:return "右";
		case 7:return "右上";
		}
		return "下";
	}
	 ToFace( fc)
	{
		if(fc=="上")return 0;
		else if(fc=="左上")return 1;
		else if(fc=="左")return 2;
		else if(fc=="左下")return 3;
		else if(fc=="下")return 4;
		else if(fc=="右下")return 5;
		else if(fc=="右")return 6;
		else if(fc=="右上")return 7;
		else return 0;
	}
	  ToX( ft)
	{
		if(ft==0 || ft==4)return this.iX;
		if(ft==1 || ft==2 || ft==3)return this.iX-10;
		return this.iX+10;
	}
	  ToY( ft)
	{
		if(ft==2 || ft==6)return this.iY;
		if(ft==0 || ft==1 || ft==7)return this.iY-10;
		return this.iY+10;
	}
}
_VISUALBLOCK.MAXBASESEQUENCE=16;