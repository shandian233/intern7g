
import PackageTools from "../../../../../engine/PackageTools"
import GmPlay from "../../../../../engtst/mgm/GmPlay"

class MyGrow
{//当前植物
	constructor()
	{

	}
}

export default class MyLand {
	
	constructor()
	{
		var i;
		this.grow=new Array(6);////初始化6块地
		for(i=0;i<6;i++)this.grow[i]=new MyGrow();
		
		MyLand.ml=this;
	}

	Init( pls)
	{
		var i;
		MyLand.iMaxArable=pls.GetNextByte();
		GmPlay.sop("MyLand.iMaxArable"+MyLand.iMaxArable);
		for(i=0;i<MyLand.iMaxArable;i++)
		{
			MyLand.iArableOff[i][0]=pls.GetNextInt();
			MyLand.iArableOff[i][1]=pls.GetNextInt();
			GmPlay.sop(""+MyLand.iArableOff[i][0]);
		}
		MyLand.iArableGrow=pls.GetNextInt();
		
		MyLand.bShowBlock=false;
	}
}
MyLand.bShowBlock=false;
MyLand.iMaxArable=6;
MyLand.iArableOff=new Array(12);
for(var i=0;i<12;i++)MyLand.iArableOff[i]=new Int32Array(2);
MyLand.iArableGrow=0;

MyLand.sLandName=["雪域高原","碧湖翠陵","神秘楼兰","琼玉天宫","迷幻鬼蜮"];
	
MyLand.ml;