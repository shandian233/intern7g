
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import GmPlay from "../../../../../engtst/mgm/GmPlay"

export default class Pets
{/*
	public int this.iPid;
	public int this.iTid;//type id
	public int this.iLife;//寿命
	public int this.iAddAtt;
	public int this.iBaobao;
	public int this.iFlag;
	
	public int this.iHp,this.iMaxHp;
	public int this.iMp,this.iMaxMp;
	public int this.iExp;
	public int this.iLev;
	public Int32Array this.iBaseAtt=new Int32Array(5);//
	public int this.nut;//潜力点
	public int this.tz,this.fl,this.ll,this.nl,this.mj;
	public int this.iSpirit,this.iAttack,this.iDefence,this.iSpeed;
	public Int32Array this.zz=new Int32Array(5);////资质
	public int this.cz;//成长
	public Int32Array this.jn=new Int32Array(12);//
	public String this.sName;
	public int this.iStar;
	public int this.iSkillBlock;//技能格子数量，8/9
	
	public AnimaAction this.aa_body;*/
	//技能
	bHaveSkill( sid)
	{
		for(var i=0;i<12;i++)
		{
			if(this.jn[i]==sid)return true;
		}
		return false;
	}
	constructor()
	{
		this.iPid=-1;
		this.sName="";
		this.aa_body=new AnimaAction();

		this.iBaseAtt=new Int32Array(5);
		this.zz=new Int32Array(5);//资质
		this.jn=new Int32Array(12);
	}
	copyfrom( p)
	{
		var i;
		this.iPid=p.iPid;
		this.iTid=p.iTid;
		this.iLife=p.iLife;
		this.iAddAtt=p.iAddAtt;
		this.iBaobao=p.iBaobao;
		this.iFlag=p.iFlag;
		
		this.iHp=p.iHp;
		this.iMp=p.iMp;
		this.iMaxHp=p.iMaxHp;
		this.iMaxMp=p.iMaxMp;
		this.iExp=p.iExp;
		this.iLev=p.iLev;
		for(i=0;i<5;i++)this.iBaseAtt[i]=p.iBaseAtt[i];
		this.nut=p.nut;
		this.tz=p.tz;
		this.fl=p.fl;
		this.ll=p.ll;
		this.nl=p.nl;
		this.mj=p.mj;
		this.iSpirit=p.iSpirit;
		this.iAttack=p.iAttack;
		this.iDefence=p.iDefence;
		this.iSpeed=p.iSpeed;
		for(i=0;i<5;i++)this.zz[i]=p.zz[i];
		this.cz=p.cz;
		for(i=0;i<12;i++)this.jn[i]=p.jn[i];
		this.sName=p.sName;
		this.iStar=p.iStar;
		
		this.aa_body.copyfrom(p.aa_body);
	}
	CalcPetScore()
	{
		var i;

		var a=GmPlay.de_pet.intValue(this.iTid, 0, 2);//携带等级评分
		var b = ((this.zz[0] + this.zz[1]) / 10 + (this.zz[2] + this.zz[3] + this.zz[4]) / 6)*this.cz / 1000;//基础资质成长评分
		var c = this.iStar * 100000 / (2000 - this.cz);//
		var d = 1;
		var e = 0;
		for (i = 0; i < 8; i++)
		{
			if (this.jn[i] > 0)
			{
				d = d*1.05;
				e += GmPlay.de_skill.intValue(this.jn[i], 0, 37);
			}
		}
		i =  parseInt(d*(b + e) + a + c);
		if(i!= this.iScore)
		{
			this.iScore = i;
		}
		return this.iScore;
	}
}