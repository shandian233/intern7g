import BaseClass from "../../../../engine/BaseClass"

class _RANKLIST
{
    constructor()
    {

    }
//	public int iRank;
//	public String sName;
//	public int iSchoolId;
//	public int iScore;
}

export default class PeakFight extends BaseClass{
	 constructor( ani)
	{
		super();
		this.campscore=new Int32Array(3);
		this.ranklist=new _RANKLIST(6);
		for(var i=0;i<6;i++)this.ranklist[i]=new _RANKLIST();
		this.iW=950;
		this.iH=570;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.sAttack=new Array(2);
		this.btn_attack=new Array(2);
		for(i=0;i<2;i++)
		{
			this.btn_attack[i]=new XButtonEx2(GmPlay.xani_button);
			this.btn_attack[i].InitButton("巅峰决战进攻173_94");
		}
		
		this.list_rank=new UIList(0,4,490,50+40*6);
		this.list_rank.SetTitle(0, "排名",80 ,false);
		this.list_rank.SetTitle(1, "玩家名称", 160,false);
		this.list_rank.SetTitle(2, "门派", 100,false);
		this.list_rank.SetTitle(3, "个人积分", 150,false);
		
		this.iCountDown=[[0,0,0],[0,0,0]];
	}

	_open( pls)
	{
		var i;
		
		this.campscore[0]=pls.GetNextInt();
		this.campscore[1]=pls.GetNextInt();
		this.campscore[2]=pls.GetNextInt();
		
		for(i=0;i<5;i++)
		{
			this.ranklist[i].iRank=i+1;
			this.ranklist[i].sName=pls.GetNextString();
			this.ranklist[i].iSchoolId=pls.GetNextByte();
			this.ranklist[i].iScore=pls.GetNextInt();
		}
		this.ranklist[5].iRank=pls.GetNextInt()+1;
		this.ranklist[5].sName=GmMe.me.sName;
		this.ranklist[5].iSchoolId=GmMe.me.rbs.iSchoolId;
		this.ranklist[5].iScore=pls.GetNextInt();
		this.iMyCamp=pls.GetNextInt();
		
		this.iCountDown[0][0]=pls.GetNextInt();//进攻倒计时上限
		this.iCountDown[0][1]=pls.GetNextInt();//进攻倒计时剩余
		this.iCountDown[0][2]=XDefine.get_ms();
		
		this.iCountDown[1][0]=pls.GetNextInt();//防守倒计时上限
		this.iCountDown[1][1]=pls.GetNextInt();//防守倒计时剩余
		this.iCountDown[1][2]=XDefine.get_ms();
	}
	
	Draw()
	{
		var i,j,k;
		var m;
		
		DrawMode.frame_type4("主背景框a150_150", this.iX,this.iY, this.iW, this.iH, 150, 150);
		DrawMode.frame_type4("子背景框b35_35", this.iX+30, this.iY+30, this.iW-60, this.iH-60, 35, 35);
		
		this.btn_close.Draw();
		
		for(i=0;i<3;i++)
		{
			GmPlay.xani_frame.DrawAnima(this.iX+100+i*260, this.iY+50, "巅峰决战国家框172_84",0);
			GmPlay.xani_icon.DrawAnima(this.iX+100+i*260, this.iY+50, "巅峰决战国"+(i+1),0);
			M3DFast.gi().DrawTextEx(this.iX+100+i*260+115, this.iY+50+42, ""+this.campscore[i], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		}
		
		this.list_rank.BeginDraw(this.iX+100, this.iY+150);
		for(i=0;i<6;i++)
		{
			if(this.ranklist[i].iScore>0)
			{
				this.list_rank.DrawUnit(0,i, ""+this.ranklist[i].iRank);
				this.list_rank.DrawUnit(1,i, this.ranklist[i].sName);
				this.list_rank.DrawUnit(2,i, GameData.sSchools[this.ranklist[i].iSchoolId]);
				this.list_rank.DrawUnit(3,i, ""+this.ranklist[i].iScore);
			}
		}
		this.list_rank.FinishDraw();
		
		switch(this.iMyCamp)
		{
		case 0:
			this.sAttack[0]="伐楚";
			this.sAttack[1]="伐齐";
			break;
		case 1:
			this.sAttack[0]="伐秦";
			this.sAttack[1]="伐齐";
			break;
		case 2:
			this.sAttack[0]="伐秦";
			this.sAttack[1]="伐楚";
			break;
		}
		for(i=0;i<2;i++)
		{
			this.btn_attack[i].Move(this.iX+620, this.iY+180+i*130, 173, 94);
			this.btn_attack[i].Draw();
			GmPlay.xani_icon.DrawAnima(this.btn_attack[i].iX+10, this.btn_attack[i].iY+8, "巅峰决战旗",0);
			M3DFast.gi().DrawText_2(this.btn_attack[i].iX+100, this.btn_attack[i].iY+47, this.sAttack[i],0xffffff00,30,101,1,1,0,-2,-2,4,0xff00244d);
		}
		
		DrawMode.frame_type1("文本框a20_40", this.iX+this.iW/2-650/2, this.iY+this.iH-90, 650, 20);
		
		DrawMode.frame_type1("活跃进度外框a20_24", this.iX+50, this.iY+this.iH-100, 850, 20);
		
		j=this.iY+this.iH-100+2;
		m=this.iCountDown[0][1]*1000-(XDefine.get_ms()-this.iCountDown[0][2]);
		if(m<0)m=0;
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2-60, this.iY+this.iH-80+4, "进攻冷却倒计时："+m/1000+"秒", 0xffffff00, 24, 101, 1, 1, 0, -3, 0);
		k= (m*425/this.iCountDown[0][0]/1000);
		i=this.iX+50+2+425-k;
		DrawMode.frame_type1("活跃进度内框a10_18", i,j, k, 10);
		i=this.iX+50+425+2;
		m=this.iCountDown[1][1]*1000-(XDefine.get_ms()-this.iCountDown[1][2]);
		if(m<0)m=0;
		M3DFast.gi().DrawTextEx(this.iX+this.iW/2+60, this.iY+this.iH-80+4, "防守冷却倒计时："+m/1000+"秒", 0xffffff00, 24, 101, 1, 1, 0, -1, 0);
		k= (m*425/this.iCountDown[1][0]/1000);
		DrawMode.frame_type1("活跃进度内框a10_18", i,j, k, 10);
		
		GmPlay.xani_icon.DrawAnima(this.iX+this.iW/2-126/2, this.iY+this.iH-125, "巅峰决战狮子头",0);
	}
	ProcTouch( msg, x, y)
	{
		var i;
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<2;i++)
		{
			if(this.btn_attack[i].ProcTouch(msg, x, y))
			{
				if(this.btn_attack[i].bCheck())
				{
					GmProtocol.gi().s_SevConfirm("巅峰之战进攻"+i);
				}
			}
		}
		return false;
	}
}

PeakFight.Open=function( pls)
{
    var pk=XStat.gi().FindStat(XStat.GS_PEAKFIGHT);
    if(pk==null)pk=XStat.gi().PushStat(XStat.GS_PEAKFIGHT);
    pk._open(pls);
}