
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import GmPlay from "../../../../engtst/mgm/GmPlay"

class NumberEffectOle
{
/*	public boolean bUseing;
	public int iNumber;
	public int iType;//0加血还是1减血(红/绿)
	public int iX,iY;
	public int iProc;*/
	 NumberEffectOle()
	{
		bUseing=false;
	}
}
export default class NumberEffect {
	
	constructor()
	{
		var i;
		this.MAXNUMBEREFFECT=20;
		this.neo=new Array(this.MAXNUMBEREFFECT);//
		for(i=0;i<this.MAXNUMBEREFFECT;i++)
		{
			this.neo[i]=new NumberEffectOle();
        }
        this.nlist=new Int8Array(8);
	}
	AddEffect( x, y, num)
	{
		var i;
		if(num==0)return;
		for(i=0;i<this.MAXNUMBEREFFECT;i++)
		{
			if(!this.neo[i].bUseing)
			{
				if(num>0)
				{//加血
					this.neo[i].iNumber=num;
					this.neo[i].iType=0;
				}
				else
				{//减血
					this.neo[i].iNumber=-num;
					this.neo[i].iType=1;
				}
				this.neo[i].iX=x;
				this.neo[i].iY=y;
				this.neo[i].iProc=0;
				this.neo[i].bUseing=true;
				return;
			}
		}
	}
	
	DrawNeo11( pne)
	{
		if(this.aa_add==null)
		{
			this.aa_add=GmPlay.xani_ui.InitAnimaWithName("加血数字", null);
			this.aa_sub=GmPlay.xani_ui.InitAnimaWithName("减血数字", null);
		}
		var i,j;
		var count=0;
		i=pne.iNumber;
		while(i>0)
		{
			this.nlist[count++]=i%10;
			i/=10;
		}
		if(count==0)
		{
			this.nlist[0]=0;
			count=1;
		}
		var w=12;
		var offy;
		j=pne.iProc;
		for(i=count-1;i>=0;i--)
		{
			if(j>=0 && j<3)
			{
				offy=-j*5;
			}
			else if(j>=3 && j<6)
			{
				offy=-(6-j)*5;
			}
			else offy=0;
			j-=2;
			if(pne.iType==0)
			{
				this.aa_add.iFrame= this.nlist[i];
				this.aa_add.Draw(pne.iX+(count-1)*w/2-i*w, pne.iY+offy);
			}
			else
			{
				this.aa_sub.iFrame=this.nlist[i];
				this.aa_sub.Draw(pne.iX+(count-1)*w/2-i*w, pne.iY+offy);
			}
		}
	
		pne.iProc++;
		if(pne.iProc>=count*6+5)pne.bUseing=false;
	}
	 DrawNeo( pne)
	{
		if(this.aa_add==null)
		{
			this.aa_add=GmPlay.xani_ui4.InitAnimaWithName("加血数字", null);
			this.aa_sub=GmPlay.xani_ui4.InitAnimaWithName("掉血数字", null);
		}
		var i,j;
		var count=0;
		i=pne.iNumber;
		while(i>0)
		{
			this.nlist[count++]=i%10;
			i=parseInt(i/10);
		}
		if(count==0)
		{
			this.nlist[0]=0;
			count=1;
		}
		var w=20;
		var offy;
		j=pne.iProc;
		for(i=count-1;i>=0;i--)
		{
			if(j>=0 && j<3)
			{
				offy=-j*10;
			}
			else if(j>=3 && j<6)
			{
				offy=-(6-j)*10;
			}
			else offy=0;
			j-=2;
			if(pne.iType==0)
			{
				this.aa_add.iFrame= this.nlist[i];
				this.aa_add.Draw(pne.iX+(count-1)*w/2-i*w, pne.iY+offy);
			}
			else
			{
				this.aa_sub.iFrame=this.nlist[i];
				this.aa_sub.Draw(pne.iX+(count-1)*w/2-i*w, pne.iY+offy);
			}
		}
	
		pne.iProc++;
		if(pne.iProc>=count*6+6)pne.bUseing=false;
	}
	Draw()
	{
		var i,c;
		for(i=0;i<this.MAXNUMBEREFFECT;i++)
		{
			if(this.neo[i].bUseing)
			{
				this.DrawNeo(this.neo[i]);
				/*
				if(this.neo[i].iType==0)c=0xff00ff00;
				else c=0xffff0000;
				M3DFast.gi().DrawTextEx(this.neo[i].iX, this.neo[i].iY, ""+this.neo[i].iNumber, c, 30, 101, 1, 1, 0, -2, -2);
				this.neo[i].iY--;
				this.neo[i].iProc++;
				if(this.neo[i].iProc>=20)this.neo[i].bUseing=false;*/
			}
		}
	}
	
	Draw_TimeNumber( x, y, num)
	{
		if(num<10)GmPlay.xani_nui4.DrawAnimaEx(x, y, "倒计时数字", num, 101, 1, 1, 0, 0, 0);
		else if(num<100)
		{
			GmPlay.xani_nui4.DrawAnimaEx(x-25, y, "倒计时数字", num/10, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_nui4.DrawAnimaEx(x+25, y, "倒计时数字", num%10, 101, 1, 1, 0, 0, 0);
		}
	}
	Draw_RoundNumber( x, y, num)
	{
		if(num<10)GmPlay.xani_nui4.DrawAnimaEx(x, y, "回合数字", num, 101, 1, 1, 0, 0, 0);
		else if(num<100)
		{
			GmPlay.xani_nui4.DrawAnimaEx(x-15, y, "回合数字", num/10, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_nui4.DrawAnimaEx(x+15, y, "回合数字", num%10, 101, 1, 1, 0, 0, 0);
		}
		else if(num<1000)
		{
			GmPlay.xani_nui4.DrawAnimaEx(x-30, y, "回合数字", num/100, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_nui4.DrawAnimaEx(x, y, "回合数字", num/10%10, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_nui4.DrawAnimaEx(x+30, y, "回合数字", num%10, 101, 1, 1, 0, 0, 0);
		}
	}
}
NumberEffect.ne=new NumberEffect();