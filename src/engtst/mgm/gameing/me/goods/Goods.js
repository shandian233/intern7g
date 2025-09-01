
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import GmPlay from "../../../../../engtst/mgm/GmPlay"

export default class Goods
{/*
	public int this.iGid;//物品ID
	public int this.iTid;//物品类型ID
	public int this.iOid;//容器ID
	public int this.iPos;
	public int this.iCount;
	public int this.iAtts;//物品附加属性
	public AnimaAction this.aa;
	
	public int this.iScore;
	*/
	constructor()
	{
		var i;
		this.iGid=-1;
		this.iAtts=new Int32Array(8);
		this.aa=new AnimaAction();
		for(i=0;i<8;i++)this.iAtts[i]=0;
	}
	copyfrom( g)
	{
		var i;
		this.iGid=g.iGid;
		this.iTid=g.iTid;
		this.iCount=g.iCount;
		for(i=0;i<8;i++)this.iAtts[i]=g.iAtts[i];
		this.aa.copyfrom(g.aa);
	}
	SetAtt( gid, tid, count, a0, a1, a2, a3, a4, a5, a6, a7)
	{
		this.iGid=gid;
		this.iTid=tid;
		this.iCount=count;
		this.iAtts[0]=a0;
		this.iAtts[1]=a1;
		this.iAtts[2]=a2;
		this.iAtts[3]=a3;
		this.iAtts[4]=a4;
		this.iAtts[5]=a5;
		this.iAtts[6]=a6;
		this.iAtts[7]=a7;
		
		GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(tid, -1, 10), this.aa);
	}

	CalcSetScore()
	{
		var place=GmPlay.de_goods.intValue(this.iTid, 0, 16);//装备部位
		if (place >= 0)
		{//是装备
			if (this.iAtts[1] <= 0)
			{//无属性，不参与评分
				this.iScore = 0;
				return 0;
			}
			var i;
			var b,c=0,d;
			var a = 0;
			switch (place)
			{
			case 0://帽子
				a = 1.2*(GmPlay.de_goods.intValue(this.iTid, 0, 21) + this.iAtts[0]/10000)+
					0.5*(GmPlay.de_goods.intValue(this.iTid, 0, 22) + this.iAtts[0] % 10000);
				break;
			case 1://项链
				a = 2.0*(GmPlay.de_goods.intValue(this.iTid, 0, 23) + this.iAtts[0]);
				break;
			case 2://武器
				a = 1.5*(GmPlay.de_goods.intValue(this.iTid, 0, 3)+this.iAtts[0]);
				break;
			case 3://衣服
				a = 1.2*(GmPlay.de_goods.intValue(this.iTid, 0, 21) + this.iAtts[0]);
				break;
			case 4://腰带
				a = 1.2*(GmPlay.de_goods.intValue(this.iTid, 0, 21) + this.iAtts[0] / 10000) +
					1.0*(GmPlay.de_goods.intValue(this.iTid, 0, 24) + this.iAtts[0] % 10000);
				break;
			case 5://鞋子
				a = 1.2*(GmPlay.de_goods.intValue(this.iTid, 0, 21) + this.iAtts[0] / 10000) +
					1.5*(GmPlay.de_goods.intValue(this.iTid, 0, 25) + this.iAtts[0] % 10000);
				break;
			}
			a += ((this.iAtts[1] / 10000)%100 + (this.iAtts[1] % 10000)%100) * 2;
			b= GmPlay.de_goods.intValue(this.iTid, 0, 9);//装备等级评分
			i = (this.iAtts[4] >> 20) & 0x3ff;
			if (i>0)
			{
				c += GmPlay.de_skill.intValue(i, 0, 38);//特技评分
				a = a*1.05;
			}
			i = (this.iAtts[4] >> 10) & 0x3ff;
			if (i>0)
			{
				c += GmPlay.de_skill.intValue(i, 0, 38);//特技评分
				a = a*1.05;
			}
			i = this.iAtts[4] & 0x3ff;
			if (i>0)
			{
				c += GmPlay.de_skill.intValue(i, 0, 38);//特技评分
				a = a*1.05;
			}
			d = ((this.iAtts[2] / 10000) % 100 + (this.iAtts[2] % 10000) % 100) * 15;//宝石评分

			this.iScore =  parseInt(a + b + c + d);
//			GmPlay.sop(""+this.iGid+"==="+a+"+"+b+"+"+c+"+"+d);
//			2240627
			return this.iScore;
		}
		return 0;
	}
}

Goods.GetSetNJ=function( lev)
{
	var i=100+lev*5;
	return i*100000+i*20;
}