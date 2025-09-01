
import PackageTools from "../../../../../engine/PackageTools"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import Pets from "../../../../../engtst/mgm/gameing/me/pet/Pets"

export default class MyTrade {
	

	
	constructor()
	{
		var i;
		MyTrade.bCheckTradeing=false;
		this.dgs=new Array(3);//
		this.dgcount=new Int32Array(3);//
		this.dps=new Array(3);//
		for(i=0;i<3;i++)
		{
			this.dgs[i]=new Goods();
			this.dps[i]=new Pets();
		}
		
		this.mgs=new Array(3);//
//		mgcount=new Int32Array(3);//
		this.mps=new Array(3);//
	}
	
	tradestart( pls)
	{
		var i;
		this.iDRid=pls.GetNextInt();
		this.sDName=pls.GetNextString();
		for(i=0;i<3;i++)
		{
			this.dgs[i].iGid=-1;
			this.dgcount[i]=1;
			this.dps[i].iPid=-1;
			
			this.mgs[i]=null;
//			mgcount[i]=1;
			this.mps[i]=null;
		}
		this.dproc=0;
		this.mproc=0;
		
		XStat.gi().PushStat(XStat.GS_MYTRADEFRAME);
		MyTrade.bCheckTradeing=true;
	}
	tradeready( pls)
	{//对方准备
		var i;
		var type;
		var gp=0,pp=0;
		while(true)
		{
			type=pls.GetNextByte();
			switch(type)
			{
			case 0://结束准备
				this.dproc=1;
				return;
			case 1://物品
				this.dgs[gp].iGid=pls.GetNextInt();
				this.dgs[gp].iTid=pls.GetNextShort();
				this.dgs[gp].iCount=pls.GetNextByte();
				for(i=0;i<8;i++)this.dgs[gp].iAtts[i]=pls.GetNextInt();
				GmPlay.xani_ngoods.InitAnimaWithName(GmPlay.de_goods.strValue(this.dgs[gp].iTid, -1, 10), this.dgs[gp].aa);
				gp++;
				break;
			case 2://宠物
				this.dps[pp].iPid=pls.GetNextInt();
				this.dps[pp].iTid=pls.GetNextShort();
				this.dps[pp].sName=pls.GetNextString();
				this.dps[pp].iLev=pls.GetNextShort();
				this.dps[pp].iExp=pls.GetNextInt();
				this.dps[pp].iHp=pls.GetNextShort();
				this.dps[pp].iMp=pls.GetNextShort();
				this.dps[pp].iLife=pls.GetNextShort();
				for(i=0;i<5;i++)this.dps[pp].iBaseAtt[i]=pls.GetNextShort();
				for(i=0;i<5;i++)this.dps[pp].zz[i]=pls.GetNextShort();
				this.dps[pp].cz=pls.GetNextShort();
				for(i=0;i<8;i++)this.dps[pp].jn[i]=pls.GetNextShort();
				this.dps[pp].iAddAtt=pls.GetNextByte();
				this.dps[pp].iBaobao=pls.GetNextByte();
				this.dps[pp].iFlag=pls.GetNextShort();
				
				this.dps[pp].sName=GmPlay.de_pet.strValue(this.dps[pp].iTid, 0, 1);
				if((this.dps[pp].iBaobao&1)!=0)this.dps[pp].sName=this.dps[pp].sName+"宝宝";
				if((this.dps[pp].iBaobao&2)!=0)this.dps[pp].sName="变异"+this.dps[pp].sName;
				
				pp++;
				break;
			case 3://钱
				this.dmoney=pls.GetNextInt();
				break;
			}
		}
	}
}
MyTrade.bCheckTradeing=false;
	
MyTrade.mt=new MyTrade();