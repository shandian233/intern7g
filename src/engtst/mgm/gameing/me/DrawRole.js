
export default class DrawRole {/*
	public int jd;//面向角度
	int rs;//种族性别
	
	int iFighting;//战斗中
	int iLeader;//队长
	String sSelling;//摆摊名
	int iChangeType;//变身为怪物的类型
	String sName;
	String sAct;
	int iMountTid;//坐骑类型
	int iWeapTid;//武器类型
//	int iPetTid;//跟随宠物类型
	*/
	SetFighting( ft)
	{
		this.iFighting=ft;
	}
	SetLeader( ld)
	{
		this.iLeader=ld;
	}
	SetSelling( sl)
	{
		this.sSelling=sl;
	}
	SetChange( ct)
	{//变身
		this.iChangeType=ct;
	}
	SetMW( mount, weap)
	{//武器，坐骑
		this.iMountTid=mount;
		this.iWeapTid=weap;
	}

	SetBase( name, race, sex)
	{
		sName=name;
		this.rs=race*2+sex;
	}
	SetStat( act, jd)
	{//动作，面向角度
		
	}
}
