
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"
import MapManager from "../../../../../map/MapManager"


//五日礼包
export default class FiveGift {
	constructor()
	{
		this.sGetDetail=["今日可领","明日可领","两天后领","三天后领","四天后领"];

		this.bInited=false;
		this.bShow=false;
		this.btn_open=null;
		this.bShowEffect=false;
		this.bShowFrame=false;
		
		this.iW=905;
		this.iH=585;

	}
	
	SetStatByFlag()
	{
		this.bShow=false;
		if((GmMe.me.iFlag[36]&31)<=0)	
		{//没领过老礼包
			var i=GmMe.me.iFlag[36]>>5;
			if(i<31)
			{//新礼包还没领完
				if((GmMe.me.iFlag[24]&2048)==0)
				{//今日未领
//					this.bShow=true;
//					this.iGetStat=i;
					this.bShowEffect=true;
				}
				this.bShow=true;
				this.iGetStat=i;
			}
		}
	}
	
	Draw()
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(!this.bShow)return;
		var offx=Gameing.iTopIconOffX;
		var offy;
		var i,j,k;
//		GmPlay.xani_nui3.DrawAnima(offx, 0, "开服前五天奖励", 0);

		if(this.btn_open==null)
		{
			this.btn_open=new XButtonEx2(GmPlay.xani_icon);
			this.btn_open.InitButton("五日礼包");
			
			this.btn_get=new XButtonEx2(GmPlay.xani_nui6);
			this.btn_get.InitButton("领取按钮");
			this.btn_get.sName="今日可领";
			this.btn_get.iNameSize=20;
			
			this.gs=new Array(5);//
			this.btn_gs=new Array(5);//
			for(i=0;i<5;i++)
			{
				this.gs[i]=new Array(3);
				this.btn_gs[i]=new Array(3);
				for(j=0;j<3;j++)
				{
					this.gs[i][j]=new Goods();
					this.btn_gs[i][j]=new XButton(GmPlay.xani_nui3);
					this.btn_gs[i][j].bSingleButton=true;
				}
			}
			
			//第一天： 千金藤， 30级项链， 绑铜1W
			this.gs[0][0].SetAtt(0, 88, 1, 0, 0, 0, 0, 0, 0, 0, 1);//千金藤
			this.gs[0][1].SetAtt(0, 21, 1, 13, 20051005, 0, 20000, 0, Goods.GetSetNJ(30), 0, 1);//30级项链
			this.gs[0][2].SetAtt(0, 240, 1, 10000, 0, 0, 0, 0, 0, 0, 1);//绑铜
			
			//第二天： 30级武器，VIP卡， 绑铜5W
			if(GmMe.me.iRace==0)this.gs[1][0].SetAtt(0, 49, 1, 46, 20054005, 0, 20000, 0, Goods.GetSetNJ(30), 0, 1);//30级剑
			else if(GmMe.me.iRace==1)this.gs[1][0].SetAtt(0, 55, 1, 46, 20054005, 0, 20000, 0, Goods.GetSetNJ(30), 0, 1);//
			else this.gs[1][0].SetAtt(0, 61, 1, 46, 20054005, 0, 20000, 0, Goods.GetSetNJ(30), 0, 1);
			this.gs[1][1].SetAtt(0, 237, 1, 0, 0, 0, 0, 0, 0, 0, 1);//vip
			this.gs[1][2].SetAtt(0, 240, 1, 50000, 0, 0, 0, 0, 0, 0, 1);//绑铜
			
			//第三天： 30级鞋子， 双倍卡， 绑铜10W
			this.gs[2][0].SetAtt(0, 15, 1, 60004, 30051005, 0, 20000, 0, Goods.GetSetNJ(30), 0, 1);//30级鞋子
			this.gs[2][1].SetAtt(0, 118, 1, 0, 0, 0, 0, 0, 0, 0, 1);//
			this.gs[2][2].SetAtt(0, 240, 1, 100000, 0, 0, 0, 0, 0, 0, 1);//绑铜
			
			//第四天： 自动遇怪卡，替身木偶， 小喇叭
			this.gs[3][0].SetAtt(0, 208, 1, 0, 0, 0, 0, 0, 0, 0, 1);//自动遇怪卡
			this.gs[3][1].SetAtt(0, 106, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			this.gs[3][2].SetAtt(0, 122, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			
			//第五天： 40级武器， 彩果， 绑铜20W
			if(GmMe.me.iRace==0)this.gs[4][0].SetAtt(0, 50, 1, 46, 20064006, 0, 30000, 0, Goods.GetSetNJ(40), 0, 1);//40级剑
			else if(GmMe.me.iRace==1)this.gs[4][0].SetAtt(0, 56, 1, 46, 20064006, 0, 30000, 0, Goods.GetSetNJ(40), 0, 1);//
			else this.gs[4][0].SetAtt(0, 62, 1, 46, 20064006, 0, 30000, 0, Goods.GetSetNJ(40), 0, 1);
			this.gs[4][1].SetAtt(0, 312, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			this.gs[4][2].SetAtt(0, 240, 1, 200000, 0, 0, 0, 0, 0, 0, 1);//绑铜
			
			this.aa_effect=GmPlay.xani_nui6.InitAnimaWithName("转圈效果", null);
			this.bInited=true;

			this.iX=(GmConfig.SCRW-this.iW)/2;
			this.iY=(GmConfig.SCRH-this.iH)/2;
		}
		this.btn_open.Move(offx, 10, 72, 72);
		this.btn_open.Draw();
		M3DFast.gi().DrawText_2(this.btn_open.iX+36, this.btn_open.iY+71, "五日礼包", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);

		if(this.bShowEffect)
		{
//			this.aa_effect.Draw(offx+40, 0+40);
//			this.aa_effect.NextFrame();
			GmPlay.xani_icon.DrawAnima(offx+48, 2, "红点提示",0);
		}
		
		if(this.bShowFrame)
		{
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "五日礼包背景框", 0);
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "五日礼包背景框", 1);
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "五日礼包背景框", 2);
			
			GmPlay.xani_nui2.DrawAnima(this.iX+this.iW-12, this.iY+12, "梅竹", 0);
			GmPlay.xani_nui2.DrawAnima(this.iX+12, this.iY+this.iH-12, "梅竹", 1);
			
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "五日礼包背景框", 3);
			
			offx=280;
			offy=97;
			FormatString.gi().FormatEx("# 储备物资，临时提升，享仙侠之游！", 200, 18, 4, 0xff174e62, 25);
			FormatString.gi().Draw(this.iX+offx, this.iY+offy);
			FormatString.gi().FormatEx("# 高阶武器，贵宾身份，让你畅行三界！", 200, 18, 4, 0xff174e62, 25);
			FormatString.gi().Draw(this.iX+offx, this.iY+offy+97*1);
			FormatString.gi().FormatEx("# 双倍经验，光速升级，通往强者之路！", 200, 18, 4, 0xff174e62, 25);
			FormatString.gi().Draw(this.iX+offx, this.iY+offy+97*2);
			FormatString.gi().FormatEx("# 替身木偶，悍不畏死，为你阻灾挡祸！", 200, 18, 4, 0xff174e62, 25);
			FormatString.gi().Draw(this.iX+offx, this.iY+offy+97*3);
			FormatString.gi().FormatEx("# 绝世神兵，稀有彩果，助你叱咤风云！", 200, 18, 4, 0xff174e62, 25);
			FormatString.gi().Draw(this.iX+offx, this.iY+offy+97*4);
			
			offx=this.iX+490;
			offy=this.iY+87;
			k=0;
			this.iLockX=-1;
			this.iLockY=-1;
			for(i=0;i<5;i++)
			{
				for(j=0;j<3;j++)
				{
					if(j==1 || (i==4 && j==0))GmPlay.xani_nui6.DrawAnima(offx+j*87,offy+i*97 ,"主打物品框", 0);
					else GmPlay.xani_nui3.DrawAnima(offx+j*87,offy+i*97, "物品格子", 0);
					
					if(this.gs[i][j].iGid>=0)
					{
//						this.btn_gs[i][j].Move(offx+150+j*92, offy, 80, 80);
//						GmPlay.xani_nui3.DrawAnima(offx+150+j*92, offy, "物品格子", 0);
						this.gs[i][j].aa.Draw(offx+j*87,offy+i*97);
						this.btn_gs[i][j].Move(offx+j*87,offy+i*97,80,80);
						if(this.btn_gs[i][j].bMouseDown)
						{
							this.iLockX=i;
							this.iLockY=j;
						}
//						if(iGPoint1==i && iGPoint2==j)GmPlay.xani_nui3.DrawAnimaEx(offx+150+j*92, offy, "物品选中框", 0, 101, 1, 1, 0, 0, 0);
//						this.btn_gs[i][j].Draw();
					}
				}
				if(k==0)
				{
					if((this.iGetStat&(1<<i))==0)
					{//没领，显示领取按钮
						k=1;
						if((GmMe.me.iFlag[24]&2048)==0)
						{//今日未领
							this.btn_get.Move(offx+272, offy+i*97+15, 104, 48);
							this.btn_get.Draw();
						}
						//else GmPlay.xani_nui6.DrawAnima(offx+272, offy+i*97+12, "已领取", 0);
						else
						{
							M3DFast.gi().DrawTextEx(offx+270, offy+i*97+40, this.sGetDetail[k++], 0xff000000, 28, 101, 1, 1, 0, 0, -2);
						}
					}
					else
					{//已领
						GmPlay.xani_nui6.DrawAnima(offx+272, offy+i*97+12, "已领取", 0);
					}
				}
				else
				{
					M3DFast.gi().DrawTextEx(offx+270, offy+i*97+40, this.sGetDetail[k++], 0xff000000, 28, 101, 1, 1, 0, 0, -2);
				}
			}
			if(this.iLockX>=0)
			{
				if(this.gs[this.iLockX][this.iLockY].iGid>=0)
				{
					GoodsDraw.new_DrawDetail(this.gs[this.iLockX][this.iLockY], this.btn_gs[this.iLockX][this.iLockY].iX, this.btn_gs[this.iLockX][this.iLockY].iY,0);
				}
			}
		}
		
		Gameing.iTopIconOffX+=90;
	}

	ProcTouch( msg, x, y)
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return false;
		if(!this.bShow)return false;
		if(!this.bInited)return false;
		if(this.btn_open.ProcTouch(msg, x, y))
		{
			if(this.btn_open.bCheck())
			{
				this.bShowEffect=false;
				this.bShowFrame=true;
			}
			return true;
		}
		if(this.bShowFrame)
		{
			var i,j;
			if((GmMe.me.iFlag[24]&2048)==0)
			{
				if(this.btn_get.ProcTouch(msg, x, y))
				{
					if(this.btn_get.bCheck())
					{//领取当日奖励
						GmProtocol.gi().s_SeverEvent(14, 0, 0, 0, 0);
						this.bShowFrame=false;
					}
					return true;
				}
			}
			for(i=0;i<5;i++)
			{
				for(j=0;j<3;j++)
				{
					if(this.btn_gs[i][j].ProcTouch(msg, x, y))
					{
					}
				}
			}
			if(!XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH) && msg==3)this.bShowFrame=false;
			else return true;
		}
		return false;
	}
}
FiveGift.fg=new FiveGift();
	