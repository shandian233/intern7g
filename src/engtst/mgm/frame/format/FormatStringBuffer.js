
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import FormatString from "./FormatString"
import UnitList from "./UnitList"

export default class FormatStringBuffer {
	Init()
	{	
		var i;
		this.bEx=FormatString.gi().bEx;
		this.WORDSIZE=FormatString.gi().WORDSIZE;
		this.iExType=FormatString.gi().iExType;
		this.iExColor=FormatString.gi().iExColor;
		this.iulc=0;
		for(i=0;i<FormatString.MAXUNIT;i++)
		{
			if(FormatString.gi().uls[i].iLp==-1)break;
			this.iulc++;
		}
		this.uls=new Array(this.iulc);//
		for(i=0;i<this.iulc;i++)
		{
			this.uls[i]=new UnitList();
			this.uls[i].copyfrom(FormatString.gi().uls[i]);
		}
	}
	Draw( iOx, iOy)
	{
		var i;
		for(i=0;i<this.iulc;i++)
		{
//			GmPlay.sop("lp : "+this.uls[i].iLp);
			switch(this.uls[i].iType)
			{
			case 0:
//				GmPlay.sop("Draw : "+this.uls[i].sDetail);
				if(this.bEx)M3DFast.gi().DrawText_2(iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.uls[i].sDetail, this.uls[i].iColor, this.WORDSIZE, 101, 1, 1, 0, 0, 0,this.iExType,this.iExColor);
				else M3DFast.gi().DrawTextEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY, this.uls[i].sDetail, this.uls[i].iColor, this.WORDSIZE, 101, 1, 1, 0, 0, 0);
				break;
			case 1://表情
//				GmPlay.sop("face="+this.uls[i].sDetail);
				GmPlay.xani_face.InitAnimaWithName(this.uls[i].sDetail, GmPlay.aaa);
				GmPlay.aaa.SetFrame(GmPlay.iDelay);
//				DrawBuffer.gi().DrawAnima_aa(iOy+iH+100, null, iOx+this.uls[i].iX, iOy+this.uls[i].iY+20, aa_face);
//				aa_face.xani.DrawAnimaEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY+20, aa_face, 101, 1, 1, 0, 0, 0);
				GmPlay.aaa.DrawEx(iOx+this.uls[i].iX, iOy+this.uls[i].iY, 101, 1, 1, 0, -1, -1);
				break;
			}
		}
	}
}
