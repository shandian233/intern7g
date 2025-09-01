
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import XButton from "../../../../engine/control/XButton"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"

	
export default class SelectFace {
	
	Init()
	{
		this.iSelectStat=0;
	}
	constructor()
	{
		this.aa_face=new AnimaAction();
		SelectFace.iSelectPage=0;
		this.btn_up=null;
		this.btn_down=null;
	}
	Draw()
	{
		var i,j,p;
		
		if(this.btn_up==null)
		{
			this.btn_up=new XButton(GmPlay.xani_button);
			this.btn_up.bSingleButton=true;
			this.btn_up.sName="普通";
			
			this.btn_down=new XButton(GmPlay.xani_button);
			this.btn_down.bSingleButton=true;
			this.btn_down.sName="会员";
		}

		this.BW=80;
		this.BH=80;
		this.WW=5;
		this.HH=5;
		this.iW=this.BW*this.WW;
		this.iH=this.BH*this.HH+60;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		M3DFast.gi().FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0x80000000);
		
		this.btn_up.Move(this.iX, this.iY+this.BH*this.HH, 120, 60);
		this.btn_up.Draw();
		this.btn_down.Move(this.iX+120, this.iY+this.BH*this.HH, 120, 60);
		this.btn_down.Draw();
		
		for(i=0;i<this.WW;i++)
		{
			for(j=0;j<this.HH;j++)
			{
				p=i+j*this.WW;
				if(SelectFace.iSelectPage==0 && p>=0 && p<=21)
				{
					GmPlay.xani_face.InitAnimaWithName("表情"+p, this.aa_face);
					this.aa_face.SetFrame(GmPlay.iDelay);
					GmPlay.xani_face.DrawAnima_aa(this.iX+this.BW/2-GmPlay.xani_face.iAnimaW(this.aa_face)/2+i*this.BW, 
						                                          this.iY+this.BH/2-GmPlay.xani_face.iAnimaH(this.aa_face)/2+j*this.BH, this.aa_face);
				}
				if(SelectFace.iSelectPage==1 && p>=0 && p<=12)
				{
					p+=100;
					GmPlay.xani_face.InitAnimaWithName("表情"+p, this.aa_face);
					this.aa_face.SetFrame(GmPlay.iDelay);
					GmPlay.xani_face.DrawAnima_aa(this.iX+this.BW/2-GmPlay.xani_face.iAnimaW(this.aa_face)/2+i*this.BW, 
						                                          this.iY+this.BH/2-GmPlay.xani_face.iAnimaH(this.aa_face)/2+j*this.BH, this.aa_face);
				}
			}
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j,p;
		if(this.btn_up.ProcTouch(msg, x, y))
		{
			if(this.btn_up.bCheck())
			{
				SelectFace.iSelectPage=0;
			}
		}
		if(this.btn_down.ProcTouch(msg, x, y))
		{
			if(this.btn_down.bCheck())
			{
				SelectFace.iSelectPage=1;
			}
		}
		if(msg==3 && !XDefine.bInRect(x,y,this.iX,this.iY, this.iW, this.iH))
		{
			this.iSelectStat=10;
			return true;
		}
		for(i=0;i<this.WW;i++)
		{
			for(j=0;j<this.HH;j++)
			{
				p=i+j*this.WW;
				if((SelectFace.iSelectPage==0 &&p>=0 && p<=21) ||
						(SelectFace.iSelectPage==1 &&p>=0 && p<=12))
				{
					if(XDefine.bInRect(x, y, this.iX+i*this.BW, this.iY+j*this.BH, this.BW, this.BH))
					{
						this.iSelectPoint=p+SelectFace.iSelectPage*100;
						if(msg==3)
						{
							this.iSelectStat=1;
							return true;
						}
					}
				}
			}
		}
		return false;
	}
}

SelectFace.iSelectPage;
SelectFace.sf=null;
SelectFace.gi=function()
{
	if(SelectFace.sf==null)SelectFace.sf=new SelectFace();
	return SelectFace.sf;
}

