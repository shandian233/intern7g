
import PackageTools from "../../../../engine/PackageTools"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XStat from "../../../../engtst/mgm/XStat"

export default class MyGov {
	
	constructor()
	{
		this.sName="";
		this.iGovSkillLev=new Int32Array(10);
		 this.GOVPOWER_0=0;//人员管理权限：允许/拒绝申请者，设置/撤销/转让职位，踢出帮众
		 this.GOVPOWER_1=1;//帮派管理
		 this.GOVPOWER_2=2;//副本开启权限
		var i;
		this.iRealGid=-1;
		for(i=0;i<MyGov.MAXGOVBUILDINGLEV;i++)
		{//建筑升级，每级所需经验
			if(i==0)MyGov.iBuildingUpgrad[i]=1500;
			else MyGov.iBuildingUpgrad[i]=MyGov.iBuildingUpgrad[i-1]+(i-1)*200+600;

			if(i==0)MyGov.iBuildingTotal[i]=MyGov.iBuildingUpgrad[i];
			else MyGov.iBuildingTotal[i]=MyGov.iBuildingTotal[i-1]+MyGov.iBuildingUpgrad[i];
		}
		for(i=0;i<21;i++)
		{//帮派等级升级每级所需繁荣度
			MyGov.iGovUpgrad[i]=MyGov.iBuildingTotal[i*5+4]*4;
		}
	}
	bCheckPower( power)
	{//0人员管理，1帮派管理，2副本开启
		if(this.iRealGid<0)return false;
		if((this.iPower&(1<<power))!=0)return true;
		return false;
	}
	initmygov( pls)
	{
		this.iRealGid=pls.GetNextInt();
//		if(this.iRealGid==-1)return;
		this.iJob=pls.GetNextInt();
		this.iTick=pls.GetNextInt();
		this.sName=pls.GetNextString();
		this.iPower=pls.GetNextShort();
		this.iZhuQueLev=pls.GetNextShort();
		this.iShsLev=pls.GetNextShort();
	}
	
	govoperateframe( pls)
	{
		var i;
		var type=pls.GetNextByte();
		switch(type)
		{
		case 0://学技能
			this.iGovTick=pls.GetNextInt();
			for(i=0;i<8;i++)
			{
				this.iGovSkillLev[i]=pls.GetNextInt();
			}
			if(XStat.gi().iXStat!=XStat.GS_LEARNGOVSKILL)XStat.gi().PushStat(XStat.GS_LEARNGOVSKILL);
			break;
		case 1://修炼
			this.iGovTick=pls.GetNextInt();
			if(XStat.gi().iXStat!=XStat.GS_GOVXIU)XStat.gi().PushStat(XStat.GS_GOVXIU);
			break;
		}
	}
}

MyGov.MAXGOVBUILDINGLEV=120;
MyGov.MAXGOVLEV=25;
MyGov.iBuildingUpgrad=new Int32Array(MyGov.MAXGOVBUILDINGLEV);//
MyGov.iBuildingTotal=new Int32Array(MyGov.MAXGOVBUILDINGLEV);//
MyGov.iGovUpgrad=new Int32Array(MyGov.MAXGOVLEV);//

MyGov.mg=new MyGov();

MyGov._GOVBUILDINGS=["青龙堂","白虎堂","朱雀堂","玄武堂","学院","金库","商会","厢房","药房"];
MyGov._GOVSKILLS=["强身术","炼丹术","烹饪","锻造","冶金","剪裁","健体","修心"];
MyGov._GOVMTLEV=["低级维护","中级维护","高级维护"]; 
MyGov._GOVJOBS=["帮主","副帮主","左护法","右护法","长老","堂主","精英","帮众"];
MyGov._JOBIDS=[0,1,2,3,4,5,6,10];

MyGov.sJob=function( ijob)
{
	switch(ijob)
	{
	case 0:return "帮主";//1
	case 1:return "副帮主";//1
	case 2:return "左护法";//1
	case 3:return "右护法";//1
	case 4:return "长老";//2
	case 5:return "堂主";//4
	case 6:return "精英";
	case 10:return "帮众";
	default:return "未知"+ijob;
	}
}