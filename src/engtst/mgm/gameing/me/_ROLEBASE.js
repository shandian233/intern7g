
import LearnSkill from "../../../../engtst/mgm/gameing/me/school/LearnSkill"

export default class _ROLEBASE
{/*
	public Int32Array iGovXiu=new Int32Array(10)(2);//
	public Int32Array iGovSkill=new Int32Array(8);//
	public Int32Array iSchoolSkill=new Int32Array(LearnSkill.MAXSKILLCOUNT);//
	public int iHp,iMaxHp;
	public int iMp,iMaxMp;
	public int iPower,iMaxPower;//体力
	public int iMoney,iInGot;
	public int iStore;
	public int iReserve;
	public int iAnger;
	public int iExp;
	public int iLev;
	public int iSchoolId;
	public int iGovId;
	public Int32Array iBaseAtt=new Int32Array(5);//
	public int nut;//潜力点
	public int tz,fl,ll,nl,mj;
	public int iSpirit,iAttack,iDefence,iSpeed;
	public int iRenQi;
	public String sTitle;
	*/
	constructor()
	{
		this.sTitle="";
		this.iLev=0;

		this.iGovXiu=new Array(10);
		for(var i=0;i<10;i++)this.iGovXiu[i]=new Int32Array(2);

		this.iGovSkill=new Int32Array(8);

		this.iSchoolSkill=new Int32Array(LearnSkill.MAXSKILLCOUNT);
		this.iBaseAtt=new Int32Array(5);
	}
}