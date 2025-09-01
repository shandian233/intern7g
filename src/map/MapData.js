import M3DMath from "../engine/graphics/M3DMath"
import GmPlay from "../engtst/mgm/GmPlay"
import ANIMALEVEL from "./ANIMALEVEL"

import COLLPATH from "./COLLPATH"

export default class MapData
{/*
	public int iMapWidth,iMapHeight;
	public int iGroundSourceId;
	int iBCW,iBCH;
	public String sMapName;
	public String sMapDetail;
	public int iMapFlag;
	
	short cutlevel;
	ANIMALEVEL animalevel;
	
	
	public COLLPATH pps;*/
	constructor()
	{
		this.pps=new COLLPATH(MapData.MAXPATHCOUNT);
	}
	 InitCutLevel()
	{
		var i,j,k;
		this.cutlevel=null;
        this.animalevel=null;
        
        this.cutlevel=new Array(3);
        this.animalevel=new Array(3);
        for(i=0;i<3;i++)
        {
            this.cutlevel[i]=new Array(this.iBCH);
            this.animalevel[i]=new ANIMALEVEL(256);
            for(j=0;j<this.iBCH;j++)
            {
                this.cutlevel[i][j]=new Array(this.iBCW);
                for(k=0;k<this.iBCW;k++)
                {
                    this.cutlevel[i][j][k]=new Int16Array(2);
                }
            }
        }
//		this.cutlevel=new short(3)(this.iBCH)(this.iBCW)(2);//
//		this.animalevel=new ANIMALEVEL(3)(256);//
		for(i=0;i<3;i++)
		{
			for(j=0;j<this.iBCH;j++)
			{
				for(k=0;k<this.iBCW;k++)
				{
					this.cutlevel[i][j][k][0]=-1;
				}
			}
			for(j=0;j<256;j++)this.animalevel[i][j]=null;
		}
		
		for(i=0;i<MapData.MAXPATHCOUNT;i++)
		{
			this.pps[i]=null;
		}
	}
	 bCanMove( x, y, dx, dy)
	{
		var i,j;
		for(i=0;i<MapData.MAXPATHCOUNT;i++)
		{
			if(this.pps[i]!=null)
			{
				for(j=1;j<this.pps[i].iPathCount;j++)
				{
					if(MapData.llcollision_ai(x,y,dx,dy,
						this.pps[i].path[j-1][0],this.pps[i].path[j-1][1],
						this.pps[i].path[j][0],this.pps[i].path[j][1]))
					{//产生碰撞
						return false;
					}
				}
			}
		}
		return true;
    }
}
MapData.bInNumber=function( num, n1, n2)
	{
		if(n1<n2)
		{
			if(n1<=num && num<=n2)return true;
		}
		else
		{
			if(n1>=num && num>=n2)return true;
		}
		return false;
	}
    MapData. lJx;//碰撞点
	MapData. lJy;
	MapData. iJx;//碰撞点
	MapData. iJy;
	MapData. fJx;
	MapData. fJy;
    MapData. iD1,
    MapData.iD2;//点到直线距离
	//随机数序列按顺序成为坐标后的效果
	MapData.llcollision_ext=function( x1, y1, x2, y2, x3, y3, x4, y4)
	{
		var k1;
		var b1;

		var k2;
		var b2;
		
//		float k3,b3;

		if(x1==x2)k1=0;
		else if(y1==y2)k1=0;
		else k1=1.0*(y2-y1)/(x2-x1);
		b1=1.0*y1-k1*x1;

		if(x3==x4)k2=0;
		else if(y3==y4)k2=0;
		else k2=1.0*(y4-y3)/(x4-x3);
		b2=1.0*y3-k2*x3;

		if(x1==x2)
		{//平行于y轴斜率不存在
			if(x3==x4)
			{
				if(x1==x3)
				{//在同一平行于y轴的直线上
					MapData.fJx=x1;
					if((y1>=y3 && y1<=y4) || (y1>=y4 && y1<=y3))
					{
						MapData.fJy=y1;
						return true;
					}
					if((y2>=y3 && y2<=y4) || (y2>=y4 && y2<=y3))
					{
						MapData.fJy=y2;
						return true;
					}
					if((y3>=y1 && y3<=y2) || (y3>=y1 && y3<=y2))
					{
						MapData.fJy=y3;
						return true;
					}
					if((y4>=y1 && y4<=y2) || (y4>=y1 && y4<=y2))
					{
						MapData.fJy=y4;
						return true;
					}
					return false;
				}
				return false;
			}
			///x=x1
			MapData.fJx=x1;
			MapData.fJy=k2*(MapData.fJx)+b2;
		}
		else if(x3==x4)
		{//平行于y轴斜率不存在
			MapData.fJx=x3;
			MapData.fJy=k1*(MapData.fJx)+b1;

//			if((y1>=y3 && y1<=y4) || (y1>=y4 && y1<=y3))
//			{
//				iD1=x1>x3?x1-x3:x3-x1;
//				if(iD1<10)return true;
//			}
//			if((y2>=y3 && y2<=y4) || (y2>=y4 && y2<=y3))
//			{
//				iD2=x2>x3?x2-x3:x3-x2;
//				if(iD2<10)return true;
//			}
		}
		else
		{
//			k3=1.0f/k2;//垂直于直线2
//			b3=1.0f*y1-k3*x1;//经过点1
//			//和直线2交点，求垂足
//			fJx=-(b3-b2)/(k3-k2);
//			fJy=k3*(fJx)+b3;
//			//如果垂足在直线2上，求距离
//			if((fJy>=y3 && fJy<=y4) || (fJy>=y4 && fJy<=y3))
//			{
//				iD1=XDefine.llength(fJx, fJy, x1, y1);
//				if(iD1<10)return true;
//			}
//			
//			b3=1.0f*y2-k3*x2;//经过点2
//			//和直线2交点，求垂足
//			fJx=-(b3-b2)/(k3-k2);
//			fJy=k3*(fJx)+b3;
//			//如果垂足在直线2上，求距离
//			if((fJy>=y3 && fJy<=y4) || (fJy>=y4 && fJy<=y3))
//			{
//				iD1=XDefine.llength(fJx, fJy, x2, y2);
//				if(iD2<10)return true;
//			}
			
MapData.fJx=-(b1-b2)/(k1-k2);
MapData.fJy=k1*(MapData.fJx)+b1;
		}

		if(MapData.fJx<x1 && MapData.fJx<x2)return false;
		if(MapData.fJx<x3 && MapData.fJx<x4)return false;
		if(MapData.fJx>x1 && MapData.fJx>x2)return false;
		if(MapData.fJx>x3 && MapData.fJx>x4)return false;
		if(MapData.fJy<y1 && MapData.fJy<y2)return false;
		if(MapData.fJy<y3 && MapData.fJy<y4)return false;
		if(MapData.fJy>y1 && MapData.fJy>y2)return false;
		if(MapData.fJy>y3 && MapData.fJy>y4)return false;

		return true;
	}
	 MapData.llcollision_ai=function( ax, ay, bx, by, cx, cy, dx, dy)
	{
		var result=M3DMath.intersect(ax, ay, bx, by, cx, cy, dx, dy);
		if(!result)return false;
		//求交点
		var area_abc = (ax - cx) * (by - cy) - (ay - cy) * (bx - cx);  
		var area_abd = (ax - dx) * (by - dy) - (ay - dy) * (bx - dx);   
		var area_cda = (cx - ax) * (dy - ay) - (cy - ay) * (dx - ax);  
//		long area_cdb = area_cda + area_abc - area_abd ;  
		var t = 1.0*area_cda / ( area_abd- area_abc );  
		MapData.iJx=  parseInt(t*(bx - ax)+ax);
		MapData.iJy=  parseInt(t*(by - ay)+ay);
		return true;
	}
	MapData. llcollision_ai1=function( ax, ay, bx, by, cx, cy, dx, dy)
	{
		// 三角形abc 面积的2倍  
		var area_abc = (ax - cx) * (by - cy) - (ay - cy) * (bx - cx);  
		 // 三角形abd 面积的2倍  
		var area_abd = (ax - dx) * (by - dy) - (ay - dy) * (bx - dx);   
		// 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
//		if ( area_abc*area_abd>0 )return false;  
		if ( (area_abc>0 && area_abd>0) ||
				(area_abc<0 && area_abd<0))return false;  
		
		// 三角形cda 面积的2倍  
		var area_cda = (cx - ax) * (dy - ay) - (cy - ay) * (dx - ax);  
		// 三角形cdb 面积的2倍  
		// 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
		var area_cdb = area_cda + area_abc - area_abd ;  
//		if (  area_cda * area_cdb > 0 )return false;
		if (  (area_cda>0 && area_cdb>0) ||
				(area_cda<0 && area_cdb<0))return false;
		
		//计算交点坐标 
//		GmPlay.sop("abd="+area_abd+",abc="+area_abc+",cda="+area_cda+",area_cdb="+area_cdb+"cda*cdd="+area_cda * area_cdb);
		var t = 1.0*area_cda / ( area_abd- area_abc );  
		MapData.iJx=  parseInt(t*(bx - ax)+ax);
		MapData.iJy=  parseInt(t*(by - ay)+ay);
//		GmPlay.sop("("+ax+","+ay+","+bx+","+by+")");
//		GmPlay.sop("("+cx+","+cy+","+dx+","+dy+")t="+t+",jx="+iJx+",jy="+iJy);
		return true;
	}
	MapData.llcollision=function( x1, y1, x2, y2, x3, y3, x4, y4)
	{
		var b=llcollision_ext(x1,y1,x2,y2,x3,y3,x4,y4);
		if(b)
		{
			MapData.iJx=parseInt(MapData.fJx);
			MapData.iJy=parseInt(MapData.fJy);
		}
		return b;
//		boolean b=llcollision_(x1*10,y1*10,x2*10,y2*10,x3*10,y3*10,x4*10,y4*10);
//		if(b)
//		{
//			iJx= (lJx/10);
//			iJy= (lJy/10);
//		}
//		return b;
	}
	MapData.llcollision_=function( x1, y1, x2, y2, x3, y3, x4, y4)
	{
		var x,y,k;//交点
		if(x1==x2)
		{
			if(x3==x4)
			{
				if(x1==x3)
				{
					if(bInNumber(y1,y3,y4) || bInNumber(y2,y3,y4))
					{
						MapData.lJx=x1;
						MapData.lJy=y1;
						return true;
					}
				}
				return false;
			}
			if(y3==y4)
			{
				if(!MapData.bInNumber(x1,x3,x4) || !MapData.bInNumber(y3,y1,y2))return false;
				MapData.lJx=x1;
				MapData.lJy=y3;
				return true;
			}
			if(!MapData.bInNumber(x1,x3,x4))return false;
			x=x1;
//			k=(y3-y4)/(x3-x4);
//			b=y3-k*x3;
//			y=kx+b;
//			y=k*x+y3-k*x3;
//			y=(x-x3)*k+y3;
			y=(x-x3)*(y3-y4)/(x3-x4)+y3;
			if(!bInNumber(y,y1,y2))return false;
			if(!bInNumber(y,y3,y4))return false;
			MapData.lJx=x1;
			MapData.lJy=y;
			return true;
		}
		if(x3==x4)
		{
			if(y1==y2)
			{
				if(!MapData.bInNumber(x3,x1,x2) || !MapData.bInNumber(y1,y3,y4))return false;
				MapData.lJx=x3;
				MapData.lJy=y1;
				return true;
			}
			if(!MapData.bInNumber(x3,x1,x2))return false;
			x=x3;
//			k=(y3-y4)/(x3-x4);
//			b=y3-k*x3;
//			y=kx+b;
//			y=k*x+y3-k*x3;
//			y=(x-x3)*k+y3;
			y=(x-x1)*(y1-y2)/(x1-x2)+y1;
			if(!MapData.bInNumber(y,y1,y2))return false;
			if(!MapData.bInNumber(y,y3,y4))return false;
			MapData.lJx=x3;
			MapData.lJy=y;
			return true;
		}
		if(y1==y2)
		{
			if(y3==y4)
			{
				if(y1==y3)
				{
					MapData.lJx=x1;
					if(MapData.bInNumber(x1,x3,x4) || MapData.bInNumber(x2,x3,x4))
					{
						MapData.lJy=y1;
						return true;
					}
				}
				return false;
			}
			if(!MapData.bInNumber(y1,y3,y4))return false;
			y=y1;
//			k=(y3-y4)/(x3-x4);
//			b=y3-k*x3;
//			x=(y-b)/k;
//			x=(y-y3+k*x3)/k;
//			x=(y-y3)/k+x3;
			x=(y-y3)*(x3-x4)/(y3-y4)+x3;
			if(!MapData.bInNumber(x,x1,x2))return false;
			if(!MapData.bInNumber(x,x3,x4))return false;
			lJx=x;
			lJy=y1;
			return true;
		}
		if(y3==y4)
		{
			if(!MapData.bInNumber(y3,y1,y2))return false;
			y=y3;
//			k=(y3-y4)/(x3-x4);
//			b=y3-k*x3;
//			x=(y-b)/k;
//			x=(y-y3+k*x3)/k;
//			x=(y-y3)/k+x3;
			x=(y-y1)*(x1-x2)/(y1-y2)+x1;
			if(!MapData.bInNumber(x,x1,x2))return false;
			if(!MapData.bInNumber(x,x3,x4))return false;
			MapData.lJx=x;
			MapData.lJy=y3;
			return true;
		}
//		k1=(y1-y2)/(x1-x2);
//		b1=y1-k1*x1;
//		k2=(y3-y4)/(x3-x4);
//		b2=y3-k2*x3;
//		x=-(b1-b2)/(k1-k2);
//		x=-(y1-k1*x1-y3+k2*x3)/(k1-k2);
//		k=(y1-y2)/(x1-x2)-(y3-y4)/(x3-x4)
		k=((y1-y2)*(x3-x4)-(y3-y4)*(x1-x2));
		if(k==0)
		{//斜率相等(平行)
//			var ty1=y1-x1*(y1-y2)/(x1-x2);
//			var ty2=y3-x3*(y3-y4)/(x3-x4);
//			if(ty1==ty2)
			if(((y1-y3)*(x1-x2)*(x3-x4)+x3*(y3-y4)*(x1-x2)-x1*(y1-y2)*(x3-x4))==0)
			{//重叠
				if(MapData.bInNumber(x1,x3,x4))
				{
					MapData.lJx=x1;
					MapData.lJy=y1;
					return true;
				}
				return false;
			}
			return false;
		}
//		k=k/((x1-x2)*(x3-x4));
//		x=-(y1-x1*(y1-y2)/(x1-x2)-y3+x3*(y3-y4)/(x3-x4))/(k);
//		x=-(y1-x1*(y1-y2)/(x1-x2)-y3+x3*(y3-y4)/(x3-x4))*((x1-x2)*(x3-x4))/k;
		x=-((y1-y3)*(x1-x2)*(x3-x4)-x1*(y1-y2)*(x3-x4)+x3*(y3-y4)*(x1-x2))/k;

		var modify=20;
		if((x>x1+modify && x>x2+modify) || (x<x1-modify && x<x2-modify))return false;
		if((x>x3+modify && x>x4+modify) || (x<x3-modify && x<x4-modify))return false;

//		y=k1*x+y1-k1*x1;
//		y=(x-x1)*k1+y1;
//		y=(x-x1)*(y1-y2)/(x1-x2)+y1;
		y=(((y1-y3)*(x1-x2)*(x3-x4)-x1*(y1-y2)*(x3-x4)+x3*(y3-y4)*(x1-x2))+x1*k)*(y2-y1)/(k*(x1-x2))+y1;
//		y=((((y1-y3)*(x1-x2)*(x3-x4)-x1*(y1-y2)*(x3-x4)+x3*(y3-y4)*(x1-x2))+x1*k)*(y2-y1)+y1*k*(x1-x2))/(k*(x1-x2));

		if((y>y1+modify && y>y2+modify) || (y<y1-modify && y<y2-modify))return false;
		if((y>y3+modify && y>y4+modify) || (y<y3-modify && y<y4-modify))return false;
		
		MapData.lJx=x;
		MapData.lJy=y;
		return true;
	}

    MapData.MAXPATHCOUNT=128;