
import GmConfig from "../../../../../config/GmConfig"
import GmPlay from "../../../../../engtst/mgm/GmPlay"

export default class MissionFinish {
	constructor()
	{
		var i;
		this.iProc=new Int32Array(4);
		for(i=0;i<4;i++)this.iProc[i]=-1;
	}
	Init()
	{
		var i;
		for(i=0;i<4;i++)this.iProc[i]=6-i*2;
	}
	Draw()
	{
		if(this.iProc[0]<0)return;
		var i,j=0;
		for(i=0;i<4;i++)
		{
			switch(this.iProc[i])
			{
			case 6:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 20, 2.2, 2.2, 0, 0, 0);
				break;
			case 7:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 40, 1.9, 1.9, 0, 0, 0);
				break;
			case 8:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 60, 1.6, 1.6, 0, 0, 0);
				break;
			case 9:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 80, 1.3, 1.3, 0, 0, 0);
				break;
			case 10:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 1.0, 1.0, 0, 0, 0);
				break;
			case 11:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 0.7, 0.7, 0, 0, 0);
				break;
			case 12:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 1.0, 1.0, 0, 0, 0);
				break;
//			case 13:
//				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 1f, 1f, 0, 0, 0);
//				break;
//			case 14:
//				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 0.8f, 0.8f, 0, 0, 0);
//				break;
//			case 15:
//				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 0.9f, 0.9f, 0, 0, 0);
//				break;
			case 16:
			default:
				GmPlay.xani_nui3.DrawAnimaEx(GmConfig.SCRW/2-90-45+i*90, 90+45, "任务完成", i, 101, 1, 1, 0, 0, 0);
				break;
			}
			if(this.iProc[i]<20)this.iProc[i]++;
			else j++;
		}
		if(j==4)this.iProc[0]=-1;
	}
}
MissionFinish.mf=new MissionFinish();