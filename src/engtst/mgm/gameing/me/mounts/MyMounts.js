
import PackageTools from "../../../../../engine/PackageTools"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../engtst/mgm/gameing/me/pet/Pets"
import Mounts from "./Mounts"

import MountsFrame from "./MountsFrame"

export default class MyMounts {
	
	constructor()
	{
		var i;
		this.iMountsCount=0;
		this.mounts=new Array(8);
		for(i=0;i<8;i++)
		{
			this.mounts[i]=new Mounts();
		}
	}
	
	UpdateOneMounts( pls)
	{
		var i,j;
		var type=pls.GetNextByte();
		var mid=pls.GetNextInt();
		if(type==0)
		{//去掉一个坐骑
			this.RemoveMounts(mid);
		}
		else
		{//更新或增加一个坐骑
			for(i=0;i<8;i++)
			{//找到已有，更新数据
				if(this.mounts[i].iMid==mid)break;
			}
			if(i>=8)
			{//没有找到，寻找一个空位放入
				for(i=0;i<8;i++)
				{
					if(this.mounts[i].iMid<=0)break;
				}
			}
			if(i>=8)return;//没有空位，异常
			
			this.mounts[i].iMid=mid;
			this.mounts[i].iTid=pls.GetNextShort();
			this.mounts[i].sName=pls.GetNextString();
	//		GmPlay.sop(""+i+","+this.mounts[i].sName);
			this.mounts[i].iJjLev=pls.GetNextByte();
			this.mounts[i].iLingQi=pls.GetNextShort();

			for(j=0;j<5;j++)this.mounts[i].att[j]=pls.GetNextShort();
			for(j=0;j<5;j++)this.mounts[i].zz[j]=pls.GetNextShort();
			for(j=0;j<5;j++)this.mounts[i].maxzz[j]=pls.GetNextShort();

			this.mounts[i].cz=pls.GetNextShort();
			this.mounts[i].maxcz=pls.GetNextShort();

			this.mounts[i].iLev=pls.GetNextShort();
			this.mounts[i].iMaxLev=pls.GetNextShort();
			this.mounts[i].iExp=pls.GetNextInt();

			this.mounts[i].iBSD=pls.GetNextShort();

			this.mounts[i].iFlag=pls.GetNextInt();
//			GmPlay.sop(""+this.mounts[i].iJjLev+"_站立_右下"+this.mounts[i].iTid);
			this.mounts[i].sAnimaName=GmPlay.de_mounts.strValue(this.mounts[i].iTid, 0, 2);
			
			
			
			this.mounts[i].CalcFightAtt();
			if(this.mounts[i].iMid==GmMe.me.iFightMid)GmMe.me.CalcFightAtt();



//后面修改的
            // 通知打开的 MountsFrame 刷新（若界面正打开）
            if (typeof MountsFrame !== "undefined" && MountsFrame.cur) {
                MountsFrame.cur.bChanged = true;
            }


		}
		
		this.iMountsCount=0;
		for(i=0;i<8;i++)if(this.mounts[i].iMid>0)this.iMountsCount++;
	}
	
	RemoveMounts( mid)
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(this.mounts[i].iMid==mid)break;
		}
		if(i>=8)return;
		var tmp=this.mounts[i];
		for(;i<7;i++)
		{
			this.mounts[i]=this.mounts[i+1];
		}
		this.mounts[7]=tmp;
		this.mounts[7].iMid=-1;
		this.iMountsCount=0;
		for(i=0;i<8;i++)if(this.mounts[i].iMid>0)this.iMountsCount++;
	}
	 FindMounts( mid)
	{
		var i;
		for(i=0;i<8;i++)
		{
			if(this.mounts[i].iMid>0 && mid==this.mounts[i].iMid)return this.mounts[i];
		}
		return null;
	}
}
MyMounts.mm=new MyMounts();