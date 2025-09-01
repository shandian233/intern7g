
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import MapManager from "../../../../../map/MapManager"
import StarEffect from "../../../../../mgm/newmainmenu/StarEffect"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import IngotMall from "../../../../../engtst/mgm/gameing/fast/IngotMall"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../../engtst/mgm/gameing/me/MyAttFrame"
import Goods from "../../../../../engtst/mgm/gameing/me/goods/Goods"
import GoodsDraw from "../../../../../engtst/mgm/gameing/me/goods/GoodsDraw"

//首充礼包
export default class FirstCharge {

	constructor()
	{
		this.bInited=false;
		this.bShow=false;
		this.btn_charge=null;
		this.bShowEffect=true;
		this.bShowFrame=false;
		
		this.iW=742;
		this.iH=486;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
	}
	
	SetStatByFlag()
	{
		this.bShow=false;
		if(GmMe.me.iFlag[59]/100000000==0)
		{//没领过首充礼包
			this.bShow=true;
			this.iChargeProc=GmMe.me.iFlag[59]%100000000;
			this.iChargeProc/=10;
			if(this.iChargeProc>60)this.iChargeProc=60;
		}
	}
	Draw()
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(!this.bShow)return;
		if(GmMe.me.rbs.iLev<20)return;
		var offx=Gameing.iTopIconOffX;
		var i,j;
		
		if(this.btn_charge==null)
		{
			this.btn_charge=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_charge.InitButton("礼包按钮");
			this.btn_charge.sName="充  值";
			
			this.btn_open=new XButtonEx2(GmPlay.xani_icon);
			this.btn_open.InitButton("首充图标");
//			btn_get.iNameSize=20;
			
			this.gs=new Array(2);
			this.btn_gs=new Array(2);//
			for(i=0;i<2;i++)
			{
				this.gs[i]=new Array(4);
				this.btn_gs[i]=new Array(4);
				for(j=0;j<4;j++)
				{
					this.gs[i][j]=new Goods();
					this.btn_gs[i][j]=new XButton(GmPlay.xani_nui3);
					this.btn_gs[i][j].bSingleButton=true;
				}
			}

			this.gs[0][0].SetAtt(0, 116, 1, 0, 0, 0, 0, 0, 0, 0, 1);//红池， 蓝池， 双倍经验卡， 三倍经验卡，
			this.gs[0][1].SetAtt(0, 117, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			this.gs[0][2].SetAtt(0, 118, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			this.gs[0][3].SetAtt(0, 236, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			
			this.gs[1][0].SetAtt(0, 208, 1, 0, 0, 0, 0, 0, 0, 0, 1);//自动遇怪卡， 传送符， 10W绑铜，  绑定变异花魅
			this.gs[1][1].SetAtt(0, 119, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			this.gs[1][2].SetAtt(0, 240, 1, 100000, 0, 0, 0, 0, 0, 0, 1);
//			this.gs[1][3].SetAtt(0, 236, 1, 0, 0, 0, 0, 0, 0, 0, 1);
			
			this.aa_effect=GmPlay.xani_nui6.InitAnimaWithName("转圈效果", null);
			
			this.bInited=true;
		}
		this.btn_open.Move(offx, 10, 72, 72);
		this.btn_open.Draw();
		M3DFast.gi().DrawText_2(this.btn_open.iX+36, this.btn_open.iY+71, "首充礼包", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);

		if(this.bShowEffect)
		{
//			this.aa_effect.Draw(offx+36, 0+40);
//			this.aa_effect.NextFrame();
			GmPlay.xani_icon.DrawAnima(offx+48, 2, "红点提示",0);
		}
		
		if(this.bShowFrame)
		{
			this.iX=(GmConfig.SCRW-this.iW)/2;
			this.iY=(GmConfig.SCRH-this.iH)/2;
			var iLockX=-1,iLockY=-1;
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "首充背景框", 0);
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "首充背景框", 1);
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "首充背景框", 2);
			
			GmPlay.xani_nui2.DrawAnima(this.iX+this.iW-12, this.iY+12, "梅竹", 0);
			GmPlay.xani_nui2.DrawAnima(this.iX+12, this.iY+this.iH-12, "梅竹", 1);
			
			GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "首充背景框", 3);
			
			for(i=0;i<2;i++)
			{
				for(j=0;j<4;j++)
				{
					this.btn_gs[i][j].Move(this.iX+361+j*85, this.iY+203+i*85, 75, 76);
					if(i!=1 || j!=3)
					{
						this.gs[i][j].aa.Draw(this.iX+361+j*85, this.iY+203+i*85);
						if(this.btn_gs[i][j].bMouseDown)
						{
							iLockX=i;
							iLockY=j;
						}
					}
					else
					{
						GmPlay.xani_head.DrawAnimaEx(this.iX+361+j*85+5, this.iY+203+i*85+5, "花魅",0,101,0.9,0.9,0,0,0);
					}
				}
			}
			M3DFast.gi().DrawText_2(this.iX+366, this.iY+75, "豪华大礼包，升级助力，极品宝宝", 0xffffffff, 20, 101, 1, 1, 0, 0, 0, 4, 0xff73332a);
			M3DFast.gi().DrawText_2(this.iX+386, this.iY+115, "坠入凡间的花魅，伴您纵情仙侠。", 0xffffffff, 20, 101, 1, 1, 0, 0,0, 4, 0xff73332a);

			M3DFast.gi().DrawTextEx(this.iX+83-8, this.iY+402-6, ""+this.iChargeProc, 0xff000000, 16, 101, 0.8, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(this.iX+83, this.iY+402, "/", 0xff000000, 26, 101, 1, 1, 0, -2, -2);
			M3DFast.gi().DrawTextEx(this.iX+83+8, this.iY+402+6, "60", 0xff000000, 16, 101, 0.8, 1, 0, -2, -2);
			for(i=0;i<this.iChargeProc/10;i++)
			{
				GmPlay.xani_nui6.DrawAnima(this.iX, this.iY, "首充进度条", i);
			}
			
//			GmPlay.xani_nui1.DrawAnimaEx(this.iX+213,this.iY+395, "站台", 0, 101, 0.6f, 0.6f, 0, 0, 0);
			GmPlay.xani_nui1.DrawAnimaEx(this.iX+210,this.iY+395, "选中角色底", GmPlay.iDelay, 101, 0.6, 0.6, 0, 0, 0);
			
			GmPlay.xani_pets[11].DrawAnimaEx(this.iX+210,this.iY+395-10, "变异_站立_右下",GmPlay.iDelay/3,101,1.3,1.3,0,0,0);
			
			if(this.iChargeProc<60)this.btn_charge.sName="立即充值";
			else this.btn_charge.sName="领  取";
			this.btn_charge.Move(this.iX+460, this.iY+385, 134, 44);
			this.btn_charge.Draw();
			
			
			if(iLockX>=0)
			{
				if(this.gs[iLockX][iLockY].iGid>=0)
				{
					GoodsDraw.new_DrawDetail(this.gs[iLockX][iLockY], this.btn_gs[iLockX][iLockY].iX, this.btn_gs[iLockX][iLockY].iY,0);
				}
			}
		}
		
		Gameing.iTopIconOffX+=90;
	}
	ProcTouch( msg, x, y)
	{
		if(MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return false;
		if(!this.bShow)return false;
		if(GmMe.me.rbs.iLev<20)return false;
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
			if(this.btn_charge.ProcTouch(msg, x, y))
			{
				if(this.btn_charge.bCheck())
				{//充值/领奖
					if(this.iChargeProc<60)
					{
//						MyAttFrame.Open(3);
						GmProtocol.gi().s_IngotMall(0, 0);
						IngotMall.iLastSelect=1;
					}
					else
					{//领取
						GmProtocol.gi().s_SeverEvent(28, 0, 0, 0, 0);
					}
					this.bShowFrame=false;
				}
				return true;
			}

			for(i=0;i<2;i++)
			{
				for(j=0;j<4;j++)
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
FirstCharge.fg=new FirstCharge();