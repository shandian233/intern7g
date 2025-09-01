import AnimaAction from "../engine/graphics/AnimaAction"
import M3DFast from "../engine/graphics/M3DFast"
import XAnima from "../engine/graphics/XAnima"

class ONEBUFFER
{/*
	int iLockY;//锚点，用于排序
	int iGroupId;//组
	int iX,iY;//实际绘制坐标
	int iType;//可能有3种情况，0动画,1切片,2文字
	
	AnimaAction aa;
	
	int iRid_dest_ra;
	int iBx_type_x2_ratx;
	int iBy_size_y2_raty;
	int iBw_color_alpha;
	int iBh_c2;
	
	float sw,sh;

	String sStr;*/
	constructor()
	{
		this.aa=new AnimaAction();
		this.sStr="12345";
	}
};

export default class DrawBuffer {
	/*
	int this.ibfp;
	boolean this.bGroup;
	int this.igfp;//组
	ONEBUFFER this.bfs;
	int this.sort;
	
	M3DFast this.xm3f;
	public static DrawBuffer dbf=new DrawBuffer();
	*/
	constructor() {
		var i;
		this.xm3f=M3DFast.gi();
		
		this.bfs=new Array(DrawBuffer.MAXONEBUFFER);//
		this.sort=new Int32Array(DrawBuffer.MAXONEBUFFER);//
		for(i=0;i<DrawBuffer.MAXONEBUFFER;i++)
		{
			this.bfs[i]=new ONEBUFFER();
		}
	}
	ClearBuffer()
	{
		this.ibfp=0;
		this.igfp=0;
		this.bGroup=false;
	}
	BeginGroup()
	{
		this.igfp++;
		this.bGroup=true;
	}
	EndGroup()
	{
		this.bGroup=false;
	}
	DrawAnima_aa( ly, p, x, y, a)
	{//最简单pani
		if(a.pani==null)return;
		this.bfs[this.ibfp].iLockY=ly;
		this.bfs[this.ibfp].iX=x;
		this.bfs[this.ibfp].iY=y;
		this.bfs[this.ibfp].iType=0;
		if(this.bGroup)this.bfs[this.ibfp].iGroupId=this.igfp;
		else this.bfs[this.ibfp].iGroupId=0;

		this.bfs[this.ibfp].aa.copyfrom(a);

		this.ibfp++;
	}
	DrawImage( x, y, rid, sx, sy, w, h)
	{
		this.bfs[this.ibfp].iLockY=y+h;
		this.bfs[this.ibfp].iX=x;
		this.bfs[this.ibfp].iY=y;
		this.bfs[this.ibfp].iType=1;
		if(this.bGroup)this.bfs[this.ibfp].iGroupId=this.igfp;
		else this.bfs[this.ibfp].iGroupId=0;

		this.bfs[this.ibfp].iRid_dest_ra=rid;
		this.bfs[this.ibfp].iBx_type_x2_ratx=sx;
		this.bfs[this.ibfp].iBy_size_y2_raty=sy;
		this.bfs[this.ibfp].iBw_color_alpha=w;
		this.bfs[this.ibfp].iBh_c2=h;

		this.ibfp++;
	}
	DrawText( ly, dest, x, y, s, c, size)
	{
		this.bfs[this.ibfp].iLockY=ly;
		this.bfs[this.ibfp].iX=x;
		this.bfs[this.ibfp].iY=y;
		this.bfs[this.ibfp].iType=2;
		if(this.bGroup)this.bfs[this.ibfp].iGroupId=this.igfp;
		else this.bfs[this.ibfp].iGroupId=0;

		this.bfs[this.ibfp].sStr=s;
		this.bfs[this.ibfp].iRid_dest_ra=dest;
		this.bfs[this.ibfp].iBw_color_alpha=c;
		this.bfs[this.ibfp].iBy_size_y2_raty=size;
		this.bfs[this.ibfp].iBx_type_x2_ratx=0;

		this.ibfp++;
	}
	DrawText_2( ly, dest, x, y, s, c, size, type, c2)
	{
		this.bfs[this.ibfp].iLockY=ly;
		this.bfs[this.ibfp].iX=x;
		this.bfs[this.ibfp].iY=y;
		this.bfs[this.ibfp].iType=2;
		if(this.bGroup)this.bfs[this.ibfp].iGroupId=this.igfp;
		else this.bfs[this.ibfp].iGroupId=0;

		this.bfs[this.ibfp].sStr=s;
		this.bfs[this.ibfp].iRid_dest_ra=dest;
		this.bfs[this.ibfp].iBw_color_alpha=c;
		this.bfs[this.ibfp].iBy_size_y2_raty=size;
		this.bfs[this.ibfp].iBx_type_x2_ratx=type;
		this.bfs[this.ibfp].iBh_c2=c2;

		this.ibfp++;
	}

	FillRect( ly, x1, y1, x2, y2, c)
	{
		this.bfs[this.ibfp].iLockY=ly;
		this.bfs[this.ibfp].iX=x1;
		this.bfs[this.ibfp].iY=y1;
		this.bfs[this.ibfp].iType=3;
		if(this.bGroup)this.bfs[this.ibfp].iGroupId=this.igfp;
		else this.bfs[this.ibfp].iGroupId=0;

		this.bfs[this.ibfp].iBx_type_x2_ratx=x2;
		this.bfs[this.ibfp].iBy_size_y2_raty=y2;
		this.bfs[this.ibfp].iBw_color_alpha=c;

		this.ibfp++;
	}
	DrawAnimaEx( ly, x, y, a, alpha,  sw,  sh,  ra,  ratx,  raty)
	{
		if(a.pani==null)return;
		this.bfs[this.ibfp].iLockY=ly;
		this.bfs[this.ibfp].iX=x;
		this.bfs[this.ibfp].iY=y;
		this.bfs[this.ibfp].iType=4;
		if(this.bGroup)this.bfs[this.ibfp].iGroupId=this.igfp;
		else this.bfs[this.ibfp].iGroupId=0;

		this.bfs[this.ibfp].aa.copyfrom(a);
		this.bfs[this.ibfp].iBw_color_alpha=alpha;
		this.bfs[this.ibfp].sw=sw;
		this.bfs[this.ibfp].sh=sh;
		this.bfs[this.ibfp].iRid_dest_ra=ra;
		this.bfs[this.ibfp].iBx_type_x2_ratx=ratx;
		this.bfs[this.ibfp].iBy_size_y2_raty=raty;

		this.ibfp++;
	}

	SortAndDraw()
	{
		var i,j,k,m;
		k=0;
		this.bfs[this.ibfp].iGroupId=0;
		for(i=0;i<this.ibfp;i++)
		{
			this.sort[k]=i;
			k++;
//			this.sort[i][1]=this.bfs[i].iLockY;
			if(this.bfs[i].iGroupId>0)
			{
				j=this.bfs[i].iGroupId;
				while(this.bfs[i+1].iGroupId==j)i++;
			}
		}
		for(i=0;i<k-1;i++)
		{
			for(j=i+1;j<k;j++)
			{
				if(this.bfs[this.sort[i]].iLockY>this.bfs[this.sort[j]].iLockY)
				{
					m=this.sort[i];
					this.sort[i]=this.sort[j];
					this.sort[j]=m;
				}
			}
		}
		var pbf;
		for(i=0;i<k;i++)
		{
			j=this.sort[i];
			m=this.bfs[j].iGroupId;
			while(true)
			{
				pbf=this.bfs[j];
				switch(this.bfs[j].iType)
				{
				case 0://动画
					this.bfs[j].aa.Draw(this.bfs[j].iX,this.bfs[j].iY);
					// this.xm3f.DrawTextEx(this.bfs[j].iX,this.bfs[j].iY,"%",0xffffffff,30,101,1,1,0,-3,-3);
					break;
				case 1://1切片
					this.xm3f.DrawImageEx(0,this.bfs[j].iX,this.bfs[j].iY,this.bfs[j].iRid_dest_ra,this.bfs[j].iBx_type_x2_ratx,this.bfs[j].iBy_size_y2_raty,this.bfs[j].iBw_color_alpha,this.bfs[j].iBh_c2,100,1,1,0,0,0);
					break;
				case 2://2文字
//					this.xm3f.DrawText(this.bfs[j].iX,this.bfs[j].iY,pbf2.sStr,pbf2.color);
					if(this.bfs[j].iBx_type_x2_ratx==0)
					{
						if(pbf.iRid_dest_ra==0)this.xm3f.DrawTextEx(this.bfs[j].iX,this.bfs[j].iY,pbf.sStr,pbf.iBw_color_alpha,pbf.iBy_size_y2_raty,101,1,1,0,-1,-1);
						else if(pbf.iRid_dest_ra==1)this.xm3f.DrawTextEx(this.bfs[j].iX,this.bfs[j].iY,pbf.sStr,pbf.iBw_color_alpha,pbf.iBy_size_y2_raty,101,1,1,0,-2,-2);
						else this.xm3f.DrawTextEx(this.bfs[j].iX,this.bfs[j].iY,pbf.sStr,pbf.iBw_color_alpha,pbf.iBy_size_y2_raty,101,1,1,0,-3,-3);
					}
					else
					{
						if(pbf.iRid_dest_ra==0)this.xm3f.DrawText_2(this.bfs[j].iX,this.bfs[j].iY,pbf.sStr,pbf.iBw_color_alpha,pbf.iBy_size_y2_raty,101,1,1,0,-1,-1,pbf.iBx_type_x2_ratx,pbf.iBh_c2);
						else if(pbf.iRid_dest_ra==1)this.xm3f.DrawText_2(this.bfs[j].iX,this.bfs[j].iY,pbf.sStr,pbf.iBw_color_alpha,pbf.iBy_size_y2_raty,101,1,1,0,-2,-2,pbf.iBx_type_x2_ratx,pbf.iBh_c2);
						else this.xm3f.DrawText_2(this.bfs[j].iX,this.bfs[j].iY,pbf.sStr,pbf.iBw_color_alpha,pbf.iBy_size_y2_raty,101,1,1,0,-3,-3,pbf.iBx_type_x2_ratx,pbf.iBh_c2);
					}
					break;
				case 3://fill
					this.xm3f.FillRect_2D(this.bfs[j].iX, this.bfs[j].iY, pbf.iBx_type_x2_ratx, pbf.iBy_size_y2_raty, pbf.iBw_color_alpha);
					break;
				case 4://drawex
					pbf.aa.DrawEx(this.bfs[j].iX,this.bfs[j].iY, pbf.iBw_color_alpha, pbf.sw, pbf.sh, pbf.iRid_dest_ra, pbf.iBx_type_x2_ratx, pbf.iBy_size_y2_raty);
					break;
				}
				if(m>0)
				{
					if(this.bfs[j+1].iGroupId==m)
					{
						j++;
						continue;
					}
				}
				break;
			}
		}
	}
}

DrawBuffer.MAXONEBUFFER=1024;

DrawBuffer.dbf=null;
DrawBuffer.gi=function()
{
	if(DrawBuffer.dbf==null)DrawBuffer.dbf=new DrawBuffer();
	return DrawBuffer.dbf;
}