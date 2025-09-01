
import GameData from "../../../../../config/GameData"
import MapManager from "../../../../../map/MapManager"
import XButtonEx2 from "../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XmsEngine from "../../../../../engine/xms/XmsEngine"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import Gameing from "../../../../../engtst/mgm/gameing/Gameing"
import BeginersGuide from "../../../../../engtst/mgm/gameing/help/BeginersGuide"
import JQMode from "../../../../../engtst/mgm/gameing/help/JQMode"
import GmMe from "../../../../../engtst/mgm/gameing/me/GmMe"
import MyAttFrame from "../../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyPets from "../../../../../engtst/mgm/gameing/me/pet/MyPets"
import Pets from "../../../../../engtst/mgm/gameing/me/pet/Pets"
import PetsFrame from "../../../../../engtst/mgm/gameing/me/pet/PetsFrame"

//实力提升
export default class StrengthUpgrade {

	constructor()
	{
		this.bInited=false;
		this.bOpen=false;
	}
	 calcshow()
	{
		if(GmMe.me.rbs.nut>0)return true;
		if(GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev])return true;
		var pet=MyPets.mp.GetUseingPet();
		if(MyPets.mp.iPetCount>0 && pet==null)return true;
		if(pet!=null && pet.nut>0)return true;
		return false;
	}
	Draw()
	{// flag[35]0,1,2,3,4时
		if (MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return;
		if(GmMe.me.rbs.iLev>=40)return;
		this.bShow=this.calcshow();
		if (!this.bShow)return;
		if (!this.bInited)
		{
			this.btn_upgrade=new XButtonEx2(GmPlay.xani_icon);
			this.btn_upgrade.InitButton("实力提升");

			this.btn_addpoint=new XButtonEx2(GmPlay.xani_button);
			this.btn_addpoint.InitButton("1号按钮150_60");
			this.btn_addpoint.sName="人物加点";

			this.btn_upgrademe=new XButtonEx2(GmPlay.xani_button);
			this.btn_upgrademe.InitButton("1号按钮150_60");
			this.btn_upgrademe.sName="人物升级";

			this.btn_petfight=new XButtonEx2(GmPlay.xani_button);
			this.btn_petfight.InitButton("1号按钮150_60");
			this.btn_petfight.sName="宠物出战";

			this.btn_petpoint=new XButtonEx2(GmPlay.xani_button);
			this.btn_petpoint.InitButton("1号按钮150_60");
			this.btn_petpoint.sName="宠物加点";

			this.bInited=true;
		}
		var offx = Gameing.iTopIconOffX;
		
		this.btn_upgrade.Move(offx, 10, 72, 72);
		this.btn_upgrade.Draw();
		GmPlay.xani_icon.DrawAnima(this.btn_upgrade.iX + 48, 2, "红点提示", 0);
		M3DFast.gi().DrawText_2(this.btn_upgrade.iX+36, this.btn_upgrade.iY+71, "提升", 0xfffdf5e8, 22, 101, 1, 1, 0, -2, -3,3,0xff1a0000);
		
		if(this.bOpen)
		{
			offx+=6;
			var offy=90,offh=90;
			var pet=MyPets.mp.GetUseingPet();
			
			if(GmMe.me.rbs.nut>0)offh+=65;
			if(GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev])offh+=65;
			if(MyPets.mp.iPetCount>0 && pet==null)offh+=65;
			if(pet!=null && pet.nut>0)offh+=65;
			
			
			this.frame_type4("17号框20_20", offx-50-5, offy-5, 160, offh-offy+5, 20, 20);
			
			if(GmMe.me.rbs.nut>0)
			{
				this.btn_addpoint.Move(offx-50, offy, 150, 60);
				this.btn_addpoint.Draw();
				offy+=65;
			}
			if(GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev])
			{
				this.btn_upgrademe.Move(offx-50, offy, 150, 60);
				this.btn_upgrademe.Draw();
				offy+=65;
			}
			if(MyPets.mp.iPetCount>0 && pet==null)
			{
				this.btn_petfight.Move(offx-50, offy, 150, 60);
				this.btn_petfight.Draw();
				offy+=65;
			}
			if(pet!=null && pet.nut>0)
			{
				this.btn_petpoint.Move(offx-50, offy, 150, 60);
				this.btn_petpoint.Draw();
				offy+=65;
			}
		}
		
		Gameing.iTopIconOffX += 90;
	}
	frame_type4( name, xx, yy, iW, iH, iBw, iBh)
	{
		M3DFast.gi().FillRect_2D(xx,yy,xx+iW,yy+iH, 0x80000000);
//		if(iW-iBw-iBw>0 && iH-iBh-iBh>0)GmPlay.xani_frame.DrawAnimaEx(xx+iBw-2, yy+iBh-2,name, 8, 101, 1.0f*(iW-iBw-iBw+4)/iBw, 1.0f*(iH-iBh-iBh+4)/iBh, 0, 0, 0);
		if(iW-iBw-iBw>0)GmPlay.xani_frame.DrawAnimaEx(xx+iBw-2, yy,name, 1, 101, 1.0*(iW-iBw-iBw+4)/iBw, 1, 0, 0, 0);
		if(iH-iBh-iBh>0)GmPlay.xani_frame.DrawAnimaEx(xx+iW-iBw, yy+iBh-2,name, 3, 101, 1,1.0*(iH-iBh-iBh+4)/iBh, 0, 0, 0);
		if(iW-iBw-iBw>0)GmPlay.xani_frame.DrawAnimaEx(xx+iBw-2, yy+iH-iBh,name, 5, 101, 1.0*(iW-iBw-iBw+4)/iBw, 1, 0, 0, 0);
		if(iH-iBh-iBh>0)GmPlay.xani_frame.DrawAnimaEx(xx, yy+iBh-2,name, 7, 101, 1,1.0*(iH-iBh-iBh+4)/iBh,  0, 0, 0);
		
		GmPlay.xani_frame.DrawAnimaEx(xx,yy,name,0,101,1,1,0,0,0);
		GmPlay.xani_frame.DrawAnimaEx( (xx+iW-1*(iBw)),yy,name,2,101,1,1,0,0,0);
		GmPlay.xani_frame.DrawAnimaEx( (xx+iW-1*(iBw)), (yy+iH-1*(iBh)),name,4,101,1,1,0,0,0);
		GmPlay.xani_frame.DrawAnimaEx(xx, (yy+iH-1*(iBh)),name,6,101,1,1,0,0,0);
		
		GmPlay.xani_frame.DrawAnimaEx(xx+iW/2,yy+1,name,8,101,1,1,0,0,0);
	}
	ProcTouch( msg, x, y)
	{
		if (MapManager.gi().vbk.mapdialog.bHideUI() || JQMode.jq.bJQLock())return false;
		if(GmMe.me.rbs.iLev>=40)return false;
		if (!this.bShow)return false;
		if (!this.bInited)return false;
		
		if(this.bOpen)
		{
			var pet=MyPets.mp.GetUseingPet();
			
			if(GmMe.me.rbs.nut>0)
			{
				if(this.btn_addpoint.ProcTouch(msg, x, y))
				{
					if(this.btn_addpoint.bCheck())
					{
						XmsEngine.pxe.RunXms("人物加点");
						this.bOpen=false;
					}
					return true;
				}
			}
			if(GmMe.me.rbs.iExp>=GameData.iUpgradeExp[GmMe.me.rbs.iLev])
			{
				if(this.btn_upgrademe.ProcTouch(msg, x, y))
				{
					if(this.btn_upgrademe.bCheck())
					{
						var maf=MyAttFrame.Open(0);
						maf.Draw();
						BeginersGuide.gi().SetGuideExt(maf.btn_upgrade.iX, maf.btn_upgrade.iY, maf.btn_upgrade.iW, maf.btn_upgrade.iH, -1, "");
						this.bOpen=false;
					}
					return true;
				}
			}
			if(MyPets.mp.iPetCount>0 && pet==null)
			{
				if(this.btn_petfight.ProcTouch(msg, x, y))
				{
					if(this.btn_petfight.bCheck())
					{
						var pf=PetsFrame.Open();
						pf.Draw();
						BeginersGuide.gi().SetGuideExt(pf.btn_joinfight.iX, pf.btn_joinfight.iY, pf.btn_joinfight.iW, pf.btn_joinfight.iH, -1, "");
						this.bOpen=false;
					}
					return true;
				}
			}
			if(pet!=null && pet.nut>0)
			{
				if(this.btn_petpoint.ProcTouch(msg, x, y))
				{
					if(this.btn_petpoint.bCheck())
					{
						var pf=PetsFrame.Open();
						pf.Draw();
						BeginersGuide.gi().SetGuideExt(pf.btn_addpoint.iX, pf.btn_addpoint.iY, pf.btn_addpoint.iW, pf.btn_addpoint.iH, -1, "");
						this.bOpen=false;
					}
					return true;
				}
			}
		}
		if(this.btn_upgrade.ProcTouch(msg, x, y))
		{
			if(this.btn_upgrade.bCheck())
			{
				this.btn_addpoint.SetNormal();
				this.btn_upgrademe.SetNormal();
				this.btn_petfight.SetNormal();
				this.btn_petpoint.SetNormal();
				this.bOpen=true;
			}
			return true;
		}
		this.bOpen=false;
		return false;
	}
}
StrengthUpgrade.su = new StrengthUpgrade();