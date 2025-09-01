
import AnimaAction from "../../../../../engine/graphics/AnimaAction"

export default class Mounts {
/*	public String this.sAnimaName;
	public int iMid;
	public String this.sName;
	public int iTid,this.iJjLev,this.iLingQi;//类型，进阶等级，灵气
	public int this.att;//属性
	public int this.zz;//资质
	public int this.maxzz;//资质上限
	public int this.cz,this.maxcz;//成长，成长上限
	public int this.iLev,this.iMaxLev,this.iExp;//等级，等级上限，经验
	public int this.iBSD;//饱食度
	public int this.iFlag;//每日标记

	public int this.nut;
	public int this.tz,this.fl,this.ll,this.nl,this.mj;
	public int this.iMaxHp,this.iMaxMp;
	public int this.iSpirit,this.iSpeed,this.iAttack,this.iDefence;
	
	public int this.iMaxLingQi;*/
	
	constructor()
	{
		this.iMid=-1;
		this.att=new Int32Array(5);
		this.zz=new Int32Array(5);
		this.maxzz=new Int32Array(5);
	}
	CalcFightAtt()
	{
		var i=this.iLev*5;//当前可能的属性上限
		var j=this.att[0]+this.att[1]+this.att[2]+this.att[3]+this.att[4];//当前已加属性
		this.nut=i-j;//剩余属性点//潜力点

		this.tz=this.att[0]+10+this.iLev;
		this.fl=this.att[1]+10+this.iLev;
		this.ll=this.att[2]+10+this.iLev;
		this.nl=this.att[3]+10+this.iLev;
		this.mj=this.att[4]+10+this.iLev;

		this.iMaxHp=this.iLev*this.zz[0]+this.tz*this.cz*6;
		this.iMaxMp=this.iLev*this.zz[1]+this.fl*this.cz*6;
		this.iSpirit=this.iLev*(this.zz[1]+1640)*(this.cz+1000)/7500+this.tz*300+this.fl*700+this.ll*400+this.nl*200;
		this.iSpeed=this.zz[4]*this.mj;
		this.iAttack=this.iLev*this.zz[2]*(1400+this.cz)/750+this.cz*this.ll;
		this.iDefence=this.iLev*this.zz[3]*(1900/3+this.cz)/750+this.cz*this.nl*4/3;

		this.iMaxHp=parseInt((this.iMaxHp+500)/1000);
		this.iMaxMp=parseInt((this.iMaxMp+500)/1000);
		this.iSpirit=parseInt((this.iSpirit+500)/1000);
		this.iAttack=parseInt((this.iAttack+500)/1000);
		this.iDefence=parseInt((this.iDefence+500)/1000);
		this.iSpeed=parseInt((this.iSpeed+500)/1000);
		
		if(this.iJjLev==1)this.iMaxLingQi=50;
		else if(this.iJjLev==2)this.iMaxLingQi=100;
		else if(this.iJjLev==3)this.iMaxLingQi=200;
	}
}
