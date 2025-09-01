
import XDefine from "../../../../config/XDefine"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import DrawBuffer from "../../../../map/DrawBuffer"
import MapManager from "../../../../map/MapManager"

//向玩家指示路径
export default class ShowPath {
	constructor()
	{
		this.bShow=false;
		this.paths=new Array(256);//x,y,fx
		for(var i=0;i<256;i++)this.paths[i]=new Int32Array(3);
		this.aa_direct=null;
		this.icmid=-1;
	}
	InitPath( dx, dy)
	{
		if(MapManager.gi().mfy.findway(GmMe.me.iX,GmMe.me.iY,dx,dy))
		{//记录路径
			console.log('路径')
			var i,j,k=0,m;
			var x1,y1,x2,y2;
			var len;
			var step=60;
			x1=MapManager.gi().mfy.iPath[0][0];
			y1=MapManager.gi().mfy.iPath[0][1];
			for(i=1;i<MapManager.gi().mfy.iPathDeep;i++)
			{
				x2=MapManager.gi().mfy.iPath[i][0];
				y2=MapManager.gi().mfy.iPath[i][1];
				len=XDefine.llength(x1, y1, x2, y2);
				
				if(i==1)j=0;
				else j=step;
				for(;j<len;j+=step)
				{
					this.paths[k][0]=x1+(x2-x1)*j/len;
					this.paths[k][1]=y1+(y2-y1)*j/len;
					if(k>0)
					{
						m=XDefine.GetAngleXY(this.paths[k][0],this.paths[k][1], this.paths[k-1][0],this.paths[k-1][1]);
						if(m<11)this.paths[k][2]=12;
						else if(m<34)this.paths[k][2]=11;
						else if(m<56)this.paths[k][2]=10;
						else if(m<79)this.paths[k][2]=9;
						else if(m<101)this.paths[k][2]=8;
						else if(m<124)this.paths[k][2]=7;
						else if(m<146)this.paths[k][2]=6;
						else if(m<169)this.paths[k][2]=5;
						else if(m<191)this.paths[k][2]=4;
						else if(m<214)this.paths[k][2]=3;
						else if(m<236)this.paths[k][2]=2;
						else if(m<259)this.paths[k][2]=1;
						else if(m<281)this.paths[k][2]=0;
						else if(m<304)this.paths[k][2]=15;
						else if(m<326)this.paths[k][2]=14;
						else if(m<349)this.paths[k][2]=13;
						else this.paths[k][2]=12;
/*
						if(m<11)this.paths[k][2]=6;
						else if(m<23+45)this.paths[k][2]=5;
						else if(m<23+45*2)this.paths[k][2]=4;
						else if(m<23+45*3)this.paths[k][2]=3;
						else if(m<23+45*4)this.paths[k][2]=2;
						else if(m<23+45*5)this.paths[k][2]=1;
						else if(m<23+45*6)this.paths[k][2]=0;
						else if(m<23+45*7)this.paths[k][2]=7;
						else this.paths[k][2]=6;*/
					}
					k++;
				}
				if(k>0)
				{
					x1=this.paths[k-1][0];
					y1=this.paths[k-1][1];
				}
				else
				{
					x1=x2;
					y1=y2;
				}
			}
			this.iPathSize=k;
			this.bShow=true;
			if(this.aa_direct==null)this.aa_direct=GmPlay.xani_nui5.InitAnimaWithName("步行指向", null);
			this.icmid=MapManager.gi().iCurrentMapId;
		}
	}

	Draw()
	{
		if(this.bShow)
		{
			if(this.icmid!=MapManager.gi().iCurrentMapId)
			{
				this.bShow=false;
				return;
			}
//			GmPlay.sop("11111111111111111111111="+this.iPathSize);
			for(var i=1;i<this.iPathSize-1;i++)
			{
				this.aa_direct.iFrame= this.paths[i][2];
//				this.aa_direct.Draw(MapManager.gi().iOffx+this.paths[i][0], MapManager.gi().iOffy+this.paths[i][1]);
				DrawBuffer.gi().DrawAnima_aa(MapManager.gi().iOffy+this.paths[i][1]-50, null, MapManager.gi().iOffx+this.paths[i][0], MapManager.gi().iOffy+this.paths[i][1], this.aa_direct);
				//this.aa_direct.Draw(this.paths[i][0], this.paths[i][1]);
			}
		}
	}
}
ShowPath.psp=new ShowPath();

