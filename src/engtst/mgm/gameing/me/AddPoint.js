
import GmConfig from "../../../../config/GmConfig"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"

export default class AddPoint extends BaseClass
{
	constructor( ani)
	{
		super();
		 this.sAttName=["体质","法力","力量","耐力","敏捷"];
		 this.sAttDetail=["提高气血上限","提高灵力","提高伤害值","提高防御","提高速度"];
	
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=364+160+50;
		this.iH=504;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_ok=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_ok.InitButton("按钮1_110");
		this.btn_ok.sName="确 定";
		//this.btn_ok.Move(this.iX+10,this.iY+this.iH-60, 80, 50);
		
		this.btn_cancel=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_cancel.InitButton("按钮1_110");
		this.btn_cancel.sName="取 消";
		//this.btn_cancel.Move(this.iX+this.iW-90,this.iY+this.iH-60, 80, 50);
		
		this.btn_sub=new Array(5);//
		this.btn_add=new Array(5);//
		for(var i=0;i<5;i++)
		{
			this.btn_sub[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_sub[i].InitButton("加点按钮-");
		//	this.btn_sub[i].sName="-";
			this.btn_add[i]=new XButtonEx2(GmPlay.xani_nui2);
			this.btn_add[i].InitButton("加点按钮+");
		//	this.btn_add[i].sName="+";
		}
	}
	
	Draw()
	{
		var i;
		var ts;
//xuc	DrawMode.Frame1_BR(this.iX, this.iY, this.iW, this.iH);
//		DrawMode.DrawFrame2(this.iX, this.iY, this.iW, this.iH);
		
		DrawMode.new_bigframe(this.iX,this.iY,this.iW,this.iH);
		
		for(i=0;i<5;i++)
		{
			this.pm3f.DrawTextEx(this.iX+40, this.iY+65+i*65, this.sAttName[i], 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			this.pm3f.DrawTextEx(this.iX+350+50, this.iY+65+i*65, this.sAttDetail[i], 0xff003e57, 25, 101, 1, 1, 0, 0, -2);
			if(AddPoint.iModifys[i]>0)ts=AddPoint.iAtts[i]+"+"+AddPoint.iModifys[i];
			else ts=""+AddPoint.iAtts[i];
			this.pm3f.DrawTextEx(this.iX+200, this.iY+65+i*65, ts, 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			this.btn_sub[i].Move(this.iX+124, this.iY+65+i*65-30, 59, 60);this.btn_sub[i].Draw();
			this.btn_add[i].Move(this.iX+280+50, this.iY+65+i*65-30, 59, 60);this.btn_add[i].Draw();
		}
		this.pm3f.DrawTextEx(this.iX+40, this.iY+65+i*65, "潜能", 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
		this.pm3f.DrawTextEx(this.iX+200, this.iY+65+i*65, ""+(AddPoint.iNut-AddPoint.iModifys[0]-AddPoint.iModifys[1]-AddPoint.iModifys[2]-AddPoint.iModifys[3]-AddPoint.iModifys[4]), 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
		
		this.btn_ok.Move(this.iX+45,this.iY+347+15+60, 110, 52);
		this.btn_ok.Draw();
		this.btn_cancel.Move(this.iX+this.iW-110-45,this.iY+347+15+60, 110, 52);
		this.btn_cancel.Draw();
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<5;i++)
		{
			if(this.btn_sub[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sub[i].bCheck())
				{
					if(AddPoint.iModifys[i]>0)AddPoint.iModifys[i]--;
				}
			}
			if(this.btn_add[i].ProcTouch(msg, x, y))
			{
				if(this.btn_add[i].bCheck())
				{
					if((AddPoint.iNut-AddPoint.iModifys[0]-AddPoint.iModifys[1]-AddPoint.iModifys[2]-AddPoint.iModifys[3]-AddPoint.iModifys[4])>0)AddPoint.iModifys[i]++;
				}
			}
		}
		if(this.btn_ok.ProcTouch(msg, x, y))
		{
			if(this.btn_ok.bCheck())
			{
				AddPoint.bConfirm=true;
				AddPoint.bFinished=true;
				XStat.gi().PopStat(1);
			}
		}
		if(this.btn_cancel.ProcTouch(msg, x, y))
		{
			if(this.btn_cancel.bCheck())
			{
				AddPoint.bConfirm=false;
				AddPoint.bFinished=true;
				XStat.gi().PopStat(1);
			}
		}
		return false;
	}
}
AddPoint.ADDPOINT_USER=10;
AddPoint.ADDPOINT_PET=20;
AddPoint.ADDPOINT_MOUNTS=30;

AddPoint.iCid;
AddPoint.iModifys=new Int32Array(5);
AddPoint.iAtts=new Int32Array(5);
AddPoint.iNut;
AddPoint.bFinished=false;
AddPoint.bConfirm;

AddPoint.start=function( cid, tz, fl, ll, nl, mj, nut)
{
	AddPoint.iCid=cid;
	AddPoint.iAtts[0]=tz;
	AddPoint.iAtts[1]=fl;
	AddPoint.iAtts[2]=ll;
	AddPoint.iAtts[3]=nl;
	AddPoint.iAtts[4]=mj;
	
	AddPoint.iModifys[0]=0;
	AddPoint.iModifys[1]=0;
	AddPoint.iModifys[2]=0;
	AddPoint.iModifys[3]=0;
	AddPoint.iModifys[4]=0;
	
	AddPoint.iNut=nut;
	
	XStat.gi().PushStat(XStat.GS_ADDPOINT);
	AddPoint.bFinished=false;
}
AddPoint.end=function( cid)
{
	if(AddPoint.bFinished && AddPoint.iCid==cid)
	{
		AddPoint.bFinished=false;
		return true;
	}
	return false;
}
