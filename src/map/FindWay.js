
//import android.util.Log;
import GmConfig from "../config/GmConfig"
import XDefine from "../config/XDefine"
import M3DFast from "../engine/graphics/M3DFast"
import GmPlay from "../engtst/mgm/GmPlay"
import GmMe from "../engtst/mgm/gameing/me/GmMe"
import MapManager from "./MapManager"
import MapData from "./MapData"


export default class FindWay {
    /*
	public COLLPATH pps;
	int iMapWidth,iMapHeight;
	int iBlockWidth,iBlockHeight;
	int iMx,iMy;
	int boom;
	int iDelay;

	int iBx1,iBy1,iBx2,iBy2;
	
	public int iPathDeep;
	public int iPath;
*/
	 Draw()
	{
		var i,j;
		for(i=0;i<MapData.MAXPATHCOUNT;i++)
		{
			if(this.pps[i]!=null)
			{
				for(j=1;j<this.pps[i].iPathCount;j++)
				{
					M2DFast.xm3f.DrawLine(MapManager.gi().iOffx+this.pps[i].path[j-1][0],MapManager.gi().iOffy+this.pps[i].path[j-1][1],
							MapManager.gi().iOffx+this.pps[i].path[j][0],MapManager.gi().iOffy+this.pps[i].path[j][1], 0xffff00ff);
				}
			}
		}
		this.DrawBoom();
	}
	DrawBoom()
	{
//		iMapWidth=mapw;
//		iMapHeight=maph;
//		iBlockWidth=bw;
//		iBlockHeight=bh;
		var i,j,m,n;
		for(i=0;i<this.iMapWidth/this.iBlockWidth;i++)
		{
			for(j=0;j<this.iMapHeight/this.iBlockHeight;j++)
			{
				if(this.boom[j][i]>=2)
				{
					m=MapManager.gi().iOffx+i*32;
					n=MapManager.gi().iOffy+j*32;
					if(m<0 || m>GmConfig.SCRW || n<0 || n>GmConfig.SCRH)continue;
					M2DFast.xm3f.FillRect_2D(m-3,n-3,m+3,n+3 ,0xffff0000);
				}
			}
		}
	}
	 constructor()
	{
		this.iDelay=0;
        this.iPathDeep=0;
        this.iPath=new Array(256);
        this.boom=new Array(256);
        for(var i=0;i<256;i++)
        {
            this.iPath[i]=new Int32Array(2);
            this.boom[i]=new Int32Array(256);
		}
		
		this.tmpst=new Array(4096);
		for(var i=0;i<4096;i++)
		{
			this.tmpst[i]=new Int32Array(2);
		}
	}
	 bCanMove( x, y, dx, dy)
	{
		//把直线前后延长
		if(dx<0 || dy<0 || dx>MapManager.gi().mapdata.iMapWidth || dy>MapManager.gi().mapdata.iMapHeight)return false;

		var i,j;
		for(i=0;i<MapData.MAXPATHCOUNT;i++)
		{
			if(this.pps[i]!=null)
			{
				for(j=1;j<this.pps[i].iPathCount;j++)
				{
					if(x<this.pps[i].path[j-1][0] &&
						dx<this.pps[i].path[j-1][0] &&
						x<this.pps[i].path[j][0] &&
						dx<this.pps[i].path[j][0])continue;
					if(x>this.pps[i].path[j-1][0] &&
							dx>this.pps[i].path[j-1][0] &&
							x>this.pps[i].path[j][0] &&
							dx>this.pps[i].path[j][0])continue;
					if(y<this.pps[i].path[j-1][1] &&
							dy<this.pps[i].path[j-1][1] &&
							y<this.pps[i].path[j][1] &&
							dy<this.pps[i].path[j][1])continue;
					if(y>this.pps[i].path[j-1][1] &&
							dy>this.pps[i].path[j-1][1] &&
							y>this.pps[i].path[j][1] &&
							dy>this.pps[i].path[j][1])continue;
					if(MapData.llcollision_ai(x,y,dx,dy,
						this.pps[i].path[j-1][0],this.pps[i].path[j-1][1],
						this.pps[i].path[j][0],this.pps[i].path[j][1]))
					{//产生碰撞
						this.iBx1=this.pps[i].path[j-1][0];
						this.iBy1=this.pps[i].path[j-1][1];
						this.iBx2=this.pps[i].path[j][0];
						this.iBy2=this.pps[i].path[j][1];
						return false;
					}
				}
			}
		}
		return true;
	}
	 setboom( x, y, dx, dy, k)
	{
		if(this.boom[dy][dx]==1)
		{
			if(this.bCanMove(x*this.iBlockWidth,y*this.iBlockHeight,dx*this.iBlockWidth,dy*this.iBlockHeight))
			{
				this.boom[dy][dx]=k;
				return true;
			}
		}
		return false;
	}
//	initboom(COLLPATH pl, mx, my, mapw, maph, bw, bh)
//	{
//		var i,j,k,o;
//		pps=pl;
//		iMapWidth=mapw;
//		iMapHeight=maph;
//		iBlockWidth=bw;
//		iBlockHeight=bh;
	initboom( mx, my, mapw, maph, bw, bh)
	{
		var i,j,k,o;
		if(mx<0)mx=0;
		if(my<0)my=0;
		this.pps=MapManager.gi().mapdata.pps;
		this.iMapWidth=mapw;
		this.iMapHeight=maph;
		this.iBlockWidth=bw;
		this.iBlockHeight=bh;

		for(i=0;i<mapw/bw;i++)
		{
			for(j=0;j<maph/bh;j++)
			{
				this.boom[j][i]=1;
			}
		}
		this.boom[parseInt(my/this.iBlockHeight)][parseInt(mx/this.iBlockWidth)]=2;
		//0碰撞，1未到达，2起点
		k=2;o=1;
		while(o>0)
		{
			o=0;
			for(i=1;i<mapw/bw;i++)
			{
				for(j=1;j<maph/bh;j++)
				{
					if(this.boom[j][i]==k)
					{
//						if(this.setboom(i,j,i-1,j,k+1))o++;
//						if(this.setboom(i,j,i+1,j,k+1))o++;
//						if(this.setboom(i,j,i,j-1,k+1))o++;
//						if(this.setboom(i,j,i,j+1,k+1))o++;
						if(this.setboom(i,j,i-1,j,k+1))o++;
						if(this.setboom(i,j,i+1,j,k+1))o++;
						if(this.setboom(i,j,i,j-1,k+1))o++;
						if(this.setboom(i,j,i,j+1,k+1))o++;
					}
				}
			}
			k++;
		}
		for(i=0;i<mapw/bw+1;i++)
		{
			for(j=0;j<maph/bh+1;j++)
			{
				if(this.boom[j][i]==1 || i>=mapw/bw || j>=maph/bh)this.boom[j][i]=0;
			}
		}
	}

	findway( mx, my, dx, dy)
	{//把起点和目标点转换到最近的可以到达点
		if(XDefine.llength(mx, my, dx, dy)<20)return false;
		if(dx<0 || dy<0 || dx>=MapManager.gi().mapdata.iMapWidth || dy>=MapManager.gi().mapdata.iMapHeight)return false;
		if(this.bCanMove(mx,my,dx,dy))
		{//直接走,写入路径
			this.iPath[0][0]=mx;
			this.iPath[0][1]=my;
			this.iPath[1][0]=dx;
			this.iPath[1][1]=dy;
			this.iPathDeep=2;
			return true;
		}

		//所点击目标点周围4/5碰撞，直接返回false;
		
		var i,j;
		var mmx,mmy,ddx,ddy;
		for(i=0;i<this.iMapWidth/this.iBlockWidth+2;i++)
		{
			for(j=0;j<this.iMapHeight/this.iBlockHeight+2;j++)
			{
				if(this.boom[j][i]>2)this.boom[j][i]=2;
			}
		}
//		GmPlay.sop("2222222222222222222");

		mmx=parseInt(mx/this.iBlockWidth);
		mmy=parseInt(my/this.iBlockHeight);
		if(this.bCanMove(mmx*this.iBlockWidth,mmy*this.iBlockHeight,mx,my));
		else if(this.bCanMove((mmx+1)*this.iBlockWidth,mmy*this.iBlockHeight,mx,my))mmx++;
		else if(this.bCanMove((mmx-1)*this.iBlockWidth,mmy*this.iBlockHeight,mx,my))mmx--;
		else if(this.bCanMove(mmx*this.iBlockWidth,(mmy+1)*this.iBlockHeight,mx,my))mmy++;
		else if(this.bCanMove(mmx*this.iBlockWidth,(mmy-1)*this.iBlockHeight,mx,my))mmy--;
		else
		{//自己所在位置被卡住，寻找周围可到达点直接设置
			if(this.boom[mmy][mmx]==2);
			else if(this.boom[mmy+1][mmx]==2)mmy+=1;
			else if(this.boom[mmy-1][mmx]==2)mmy-=1;
			else if(this.boom[mmy][mmx+1]==2)mmx+=1;
			else if(this.boom[mmy][mmx-1]==2)mmx-=1;
			else return false;

			this.iPath[0][0]=mx;
			this.iPath[0][1]=my;
			this.iPath[1][0]=mmx*this.iBlockWidth;
			this.iPath[1][1]=mmy*this.iBlockHeight;
			this.iPathDeep=2;
			return true;
//			GmMe.me.iX=mmx*iBlockWidth;
//			GmMe.me.iY=mmy*iBlockHeight;
//			GmPlay.sop("kakakakakakaka");
//			return false;
		}
//		GmPlay.sop("3333333333333333");
		ddx=parseInt(dx/this.iBlockWidth);
		ddy=parseInt(dy/this.iBlockHeight);
		if(this.bCanMove(ddx*this.iBlockWidth,ddy*this.iBlockHeight,dx,dy));
		else if(this.bCanMove((ddx+1)*this.iBlockWidth,ddy*this.iBlockHeight,dx,dy))ddx++;
		else if(this.bCanMove((ddx-1)*this.iBlockWidth,ddy*this.iBlockHeight,dx,dy))ddx--;
		else if(this.bCanMove(ddx*this.iBlockWidth,(ddy+1)*this.iBlockHeight,dx,dy))ddy++;
		else if(this.bCanMove(ddx*this.iBlockWidth,(ddy-1)*this.iBlockHeight,dx,dy))ddy--;
		else return false;
		if(ddx<0 || ddy<0)return false;
//		GmPlay.sop("44444444444444444444444");
		i=0;
		if(this.boom[ddy][ddx]==0)i++;
		if(ddx-1>=0 && this.boom[ddy][ddx-1]==0)i++;
		if(ddy-1>=0 && this.boom[ddy-1][ddx]==0)i++;
		if(this.boom[ddy][ddx+1]==0)i++;
		if(this.boom[ddy+1][ddx]==0)i++;
		if(i>=3)return false;//目标点周围4/5是不可行走区域
//		GmPlay.sop("555555555555555");

/*		if(boom[mmy][mmx]<2 && boom[ddy][ddx]<2)
		{//重新初始化地图碰撞信息
			initboom(MapManager.gi().mapdata.pps, mx, my, MapManager.gi().mapdata.iMapWidth, MapManager.gi().mapdata.iMapHeight, iBlockWidth, iBlockHeight);
			return false;
		}*/
		

//		boom[ddy][ddx]>=2 && 
//		GmPlay.sop("ddx="+ddx+",ddy="+ddy);
//		GmPlay.sop(""+MapManager.gi().mapdata.iMapWidth+",,,"+MapManager.gi().mapdata.iMapHeight);
		if(this.findway_(mmx*this.iBlockWidth,mmy*this.iBlockHeight,ddx*this.iBlockWidth,ddy*this.iBlockHeight))
		{
			this.iPath[0][0]=mx;
			this.iPath[0][1]=my;
			this.iPath[this.iPathDeep-1][0]=dx;
			this.iPath[this.iPathDeep-1][1]=dy;

			this.iDelay++;
//			if(iDelay%2==0)
				this.pullline();//cxcx
			return true;
		}
		else
		{//没有路，走到离目标最近的位置
			if(1==1)return false;
			while(true)
			{
				if(this.bCanMove(mx,my,dx,dy))
				{//直接走,写入路径
					this.iPath[0][0]=mx;
					this.iPath[0][1]=my;
					this.iPath[1][0]=dx;
					this.iPath[1][1]=dy;
					this.iPathDeep=2;
					return true;
				}
				else
				{
					i=XDefine.llength(mx,my,MapData.iJx,MapData.iJy);
					if(i<20)return false;
					dx=parseInt(mx+(MapData.iJx-mx)*(i-10)/i);
					dy=parseInt(my+(MapData.iJy-my)*(i-10)/i);
				}
			}
		}
	}
//	
//	var tmpst=new Int32Array(MAXST)(2);//
	 findway_( mx, my, dx, dy)
	{
		console.log('寻路2')
		if(mx<0 || my<0 || mx>=MapManager.gi().mapdata.iMapWidth || my>=MapManager.gi().mapdata.iMapHeight)return false;
		if(dx<0 || dy<0 || dx>=MapManager.gi().mapdata.iMapWidth || dy>=MapManager.gi().mapdata.iMapHeight)return false;

        var MAXST=4096;
		var i,j,k,o;
		this.boom[parseInt(my/this.iBlockHeight)][parseInt(mx/this.iBlockWidth)]=3;//起点

		var ns,nt,es,et;
		this.tmpst[0][0]=parseInt(mx/this.iBlockWidth);
		this.tmpst[0][1]=parseInt(my/this.iBlockHeight);
		ns=0;
		nt=1;
		es=1;
		et=1;
		k=3;
		while(true)
		{
			for(o=ns;o<nt;o++)
			{
				i=this.tmpst[o%MAXST][0];
				j=this.tmpst[o%MAXST][1];
				if(i-1>=0)
				{
					if(this.boom[j][i-1]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,(i-1)*this.iBlockWidth,j*this.iBlockHeight))
					{
						this.boom[j][i-1]=k+1;
						
						this.tmpst[et%MAXST][0]=i-1;
						this.tmpst[et%MAXST][1]=j;
						et++;
					}
				}
				if(i+1<this.iMapWidth/this.iBlockWidth)
				{
					if(this.boom[j][i+1]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,(i+1)*this.iBlockWidth,j*this.iBlockHeight))
					{
						this.boom[j][i+1]=k+1;
						
						this.tmpst[et%MAXST][0]=i+1;
						this.tmpst[et%MAXST][1]=j;
						et++;
					}
				}
				if(j-1>=0)
				{
					if(this.boom[j-1][i]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,i*this.iBlockWidth,(j-1)*this.iBlockHeight))
					{
						this.boom[j-1][i]=k+1;
						
						this.tmpst[et%MAXST][0]=i;
						this.tmpst[et%MAXST][1]=j-1;
						et++;
					}
				}
				if(j+1<this.iMapHeight/this.iBlockHeight)
				{
					if(this.boom[j+1][i]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,i*this.iBlockWidth,(j+1)*this.iBlockHeight))
					{
						this.boom[j+1][i]=k+1;
						
						this.tmpst[et%MAXST][0]=i;
						this.tmpst[et%MAXST][1]=j+1;
						et++;
					}
				}
			}
			if(this.boom[parseInt(dy/this.iBlockHeight)][parseInt(dx/this.iBlockWidth)]>2)
			{//找到终点//回溯
				this.getback(parseInt(dx/this.iBlockWidth),parseInt(dy/this.iBlockHeight));
				return true;
			}
			if(es==et)break;//没有扩展，退出
			//有扩展，继续搜索
			ns=es;
			nt=et;
			es=et;
			k++;
		}
		return false;
	}
	 findway____( mx, my, dx, dy)
	{
		console.log('寻路3')
		if(mx<0 || my<0 || mx>=MapManager.gi().mapdata.iMapWidth || my>=MapManager.gi().mapdata.iMapHeight)return false;
		if(dx<0 || dy<0 || dx>=MapManager.gi().mapdata.iMapWidth || dy>=MapManager.gi().mapdata.iMapHeight)return false;

		var i,j,k,o;
		boom[parseInt(my/this.iBlockHeight)][parseInt(mx/this.iBlockWidth)]=3;//起点

		k=3;o=1;
		while(o>0)
		{
			o=0;
			for(i=0;i<this.iMapWidth/this.iBlockWidth;i++)
			{
				for(j=0;j<this.iMapHeight/this.iBlockHeight;j++)
				{
					if(this.boom[j][i]==k)
					{
						if(i-1>=0)
						{
							if(this.boom[j][i-1]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,(i-1)*this.iBlockWidth,j*this.iBlockHeight))
							{
								boom[j][i-1]=k+1;
								o++;
							}
						}
						if(i+1<this.iMapWidth/this.iBlockWidth)
						{
							if(this.boom[j][i+1]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,(i+1)*this.iBlockWidth,j*this.iBlockHeight))
							{
								this.boom[j][i+1]=k+1;
								o++;
							}
						}
						if(j-1>=0)
						{
							if(this.boom[j-1][i]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,i*this.iBlockWidth,(j-1)*this.iBlockHeight))
							{
								this.boom[j-1][i]=k+1;
								o++;
							}
						}
						if(j+1<this.iMapHeight/this.iBlockHeight)
						{
							if(this.boom[j+1][i]==2 && this.bCanMove(i*this.iBlockWidth,j*this.iBlockHeight,i*this.iBlockWidth,(j+1)*this.iBlockHeight))
							{
								this.boom[j+1][i]=k+1;
								o++;
							}
						}
					}
				}
			}
			if(this.boom[parseInt(dy/this.iBlockHeight)][parseInt(dx/this.iBlockWidth)]>2)
			{//找到终点
				//回溯
//				String s;
//				GmPlay.sop(""+dy/iBlockHeight+","+dx/iBlockWidth);
//				for(j=0;j<iMapHeight/iBlockHeight;j++)
//				{
//					s="("+j+")";
//					for(i=0;i<iMapWidth/iBlockWidth;i++)
//					{
//						s+=boom[j][i]+",";
//					}
//					GmPlay.sop(s);
//				}
this.getback(parseInt(dx/this.iBlockWidth),parseInt(dy/this.iBlockHeight));
				return true;
			}
			k++;
			if(k>=256)return false;//超过50个中间点
		}
		return false;
	}

	 getback( x, y)
	{
		var i;
		this.iPathDeep=this.boom[y][x];
		i=this.iPathDeep-2;
		while(i>1)
		{
			this.iPath[i][0]=x*this.iBlockWidth;
			this.iPath[i][1]=y*this.iBlockHeight;
			i--;
			if(x-1>=0 && this.boom[y][x-1]==this.boom[y][x]-1 && this.bCanMove(x*this.iBlockWidth,y*this.iBlockHeight,(x-1)*this.iBlockWidth,y*this.iBlockHeight))x--;
			else if(x+1<this.iMapWidth/this.iBlockWidth && this.boom[y][x+1]==this.boom[y][x]-1 && this.bCanMove(x*this.iBlockWidth,y*this.iBlockHeight,(x+1)*this.iBlockWidth,y*this.iBlockHeight))x++;
			else if(y-1>=0 && this.boom[y-1][x]==this.boom[y][x]-1 && this.bCanMove(x*this.iBlockWidth,y*this.iBlockHeight,x*this.iBlockWidth,(y-1)*this.iBlockHeight))y--;
			else if(y+1<this.iMapHeight/this.iBlockHeight && this.boom[y+1][x]==this.boom[y][x]-1 && this.bCanMove(x*this.iBlockWidth,y*this.iBlockHeight,x*this.iBlockWidth,(y+1)*this.iBlockHeight))y++;
		}
		this.iPath[i][0]=x*this.iBlockWidth;
		this.iPath[i][1]=y*this.iBlockHeight;
//		for(i=0;i<iPathDeep;i++)
//		{
//			GmPlay.sop("i="+i+",iPath[i][0]="+iPath[i][0]+",iPath[i][1]="+iPath[i][1]);
//		}
	}
	 bCanMoveEx( x, y, dx, dy)
	{
		var i,j;
		var a,b,c,d,e;
		//计算直线方程
		if(dx!=x)
		{
			a=1.0*(dy-y)/(dx-x);
			b=-1;
			c=1.0*y-a*x;
		}
		else if(dy!=y)
		{
			a=1;
			b=-1.0*(x-dx)/(y-dy);
			c=-(1.0*x-a*y);
		}
		else return false;
		
		for(i=0;i<MapData.MAXPATHCOUNT;i++)
		{
			if(this.pps[i]!=null)
			{
				for(j=0;j<this.pps[i].iPathCount;j++)
				{
					if(this.pps[i].path[j][0]<x && this.pps[i].path[j][0]<dx)continue;
					if(this.pps[i].path[j][0]>x && this.pps[i].path[j][0]>dx)continue;
					
					if(this.pps[i].path[j][1]<y && this.pps[i].path[j][1]<dy)continue;
					if(this.pps[i].path[j][1]>y && this.pps[i].path[j][1]>dy)continue;
					
					//计算点到直线距离│AXo＋BYo＋C│／√（A²＋B²）
					d=a*this.pps[i].path[j][0]+b*this.pps[i].path[j][1]+c;
					if(d<0)d=-d;
					e=Math.sqrt(a*a+b*b);
					d=d/e;
					if(d<10)
					{
//						GmPlay.sop("sdfsaddfasdfsfasfdsdf");
						return false;
					}
				}
			}
		}
		return true;
	}
	 pullline()
	{//去除多余路径点，判断碰撞点到路径的距离
		var i;
		var s;
		s=0;
		for(i=2;i<this.iPathDeep;i++)
		{
			if(i==s+1)
			{
				//Log.e("aaaaaaaaaaaaaaaaaa","bbbbbbbbbbbbbbbbbbbbbbb");
				continue;
			}
			if(this.bCanMoveEx(this.iPath[s][0],this.iPath[s][1],this.iPath[i][0],this.iPath[i][1]) && this.bCanMove(this.iPath[s][0],this.iPath[s][1],this.iPath[i][0],this.iPath[i][1]))
			{
				this.iPath[s+1][0]=this.iPath[i][0];
				this.iPath[s+1][1]=this.iPath[i][1];
			}
			else
			{
				s++;
				i--;
			}
		}
		this.iPathDeep=s+2;
	}
	 checkagain()
	{
		var i;
		
		for(i=1;i<this.iPathDeep;i++)
		{
			if(!this.bCanMove(this.iPath[i-1][0],this.iPath[i-1][1],this.iPath[i][0],this.iPath[i][1]))return false;
		}
		return true;
	}


//	public boolean findway2( mx, my, dx, dy)
//	{
//		if(dx<0 || dy<0 || dx>MapManager.gi().mapdata.iMapWidth || dy>MapManager.gi().mapdata.iMapHeight)return false;
//
//		return false;
//	}
	
	findway1( mx, my, dx, dy)
	{//找到一个最近的交点
		if(XDefine.llength(mx, my, dx, dy)<20)return false;
		var i,j,k;
		var ijx=0,ijy=0,ijl;
		var bj;
		
		if(dx<0 || dy<0 || dx>MapManager.gi().mapdata.iMapWidth || dy>MapManager.gi().mapdata.iMapHeight)return false;

		ijl=999999;
		bj=false;
		FindWay.bAutoBoom=false;
		for(i=0;i<MapData.MAXPATHCOUNT;i++)
		{
			if(this.pps[i]!=null)
			{
				for(j=1;j<this.pps[i].iPathCount;j++)
				{
					if(mx<this.pps[i].path[j-1][0] &&
						dx<this.pps[i].path[j-1][0] &&
						mx<this.pps[i].path[j][0] &&
						dx<this.pps[i].path[j][0])continue;
					if(mx>this.pps[i].path[j-1][0] &&
							dx>this.pps[i].path[j-1][0] &&
							mx>this.pps[i].path[j][0] &&
							dx>this.pps[i].path[j][0])continue;
					if(my<this.pps[i].path[j-1][1] &&
							dy<this.pps[i].path[j-1][1] &&
							my<this.pps[i].path[j][1] &&
							dy<this.pps[i].path[j][1])continue;
					if(my>this.pps[i].path[j-1][1] &&
							dy>this.pps[i].path[j-1][1] &&
							my>this.pps[i].path[j][1] &&
							dy>this.pps[i].path[j][1])continue;
//					if(MapData.llcollision(mx,my,dx,dy,
//						pps[i].path[j-1][0],pps[i].path[j-1][1],
//						pps[i].path[j][0],pps[i].path[j][1]))
					if(MapData.llcollision_ai(mx,my,dx,dy,
						this.pps[i].path[j-1][0],this.pps[i].path[j-1][1],
						this.pps[i].path[j][0],this.pps[i].path[j][1]))
					{//产生碰撞
						//交线
						k=XDefine.llength(mx, my, MapData.iJx, MapData.iJy);
						if(k<ijl || !bj)
						{
							this.iBx1=this.pps[i].path[j-1][0];
							this.iBy1=this.pps[i].path[j-1][1];
							this.iBx2=this.pps[i].path[j][0];
							this.iBy2=this.pps[i].path[j][1];
							ijx=MapData.iJx;
							ijy=MapData.iJy;
							ijl=k;
							bj=true;
							FindWay.bAutoBoom=true;
						}
					}
				}
			}
		}
		if(bj)
		{//碰撞了
			//根据交点，速度，计算修正的两个偏移点
			var x1,y1;
			var f1,f2,f3;
			var a = 0,b=0,c=0,d=0,e=0,f=0;
			//-----------------------------------------
			f1=XDefine.GetAngleXY_ext(iBx1, iBy1, iBx2, iBy2);
			a= (Math.cos(f1+0.15)*80);
			b= (Math.sin(f1+0.15)*80);
			c= (Math.cos(f1-0.15)*80);
			d= (Math.sin(f1-0.15)*80);
			e= (Math.cos(f1)*80);
			f= (Math.sin(f1)*80);
			i=XDefine.llength(mx, my, ijx+e, ijy+f);
			j=XDefine.llength(mx, my, ijx-e, ijy-f);
			if(i>j)
			{
//				a=mx+a;
//				b=my+b;
//				c=mx+c;
//				d=my+d;
//				e=mx+e;
//				f=my+f;
			}
			else
			{
				a=-a;
				b=-b;
				c=-c;
				d=-d;
				e=-e;
				f=-f;
			}
			var bb1=this.bCanMove(mx,my,(mx+a),(my+b));
			var bb2=this.bCanMove(mx,my,(mx+c),(my+d));
			var bb3=this.bCanMove(mx,my,(mx+e),(my+f));
			
			if(!bb3)return false;//中不通
			if(bb1 && bb2)
			{//两边都通，走中路
				this.iPath[0][0]=mx;
				this.iPath[0][1]=my;
				this.iPath[1][0]=(mx+e*5/8);
				this.iPath[1][1]=(my+f*5/8);
				this.iPathDeep=2;
				return true;
			}
			else if(!bb1 && bb2)
			{
				this.iPath[0][0]=mx;
				this.iPath[0][1]=my;
				this.iPath[1][0]=(mx+c*5/8);
				this.iPath[1][1]=(my+d*5/8);
				this.iPathDeep=2;
				return true;
			}
			else if(bb1 && !bb2)
			{
				this.iPath[0][0]=mx;
				this.iPath[0][1]=my;
				this.iPath[1][0]=(mx+a*5/8);
				this.iPath[1][1]=(my+b*5/8);
				this.iPathDeep=2;
				return true;
			}
			else return false;
//			
//			boolean bext=false;
//			if(iBx1==iBx2)
//			{
//				x1=iBx1;
//				y1=GmMe.me.iSpeed;
//			}
//			else if(iBy1==iBy2)
//			{
//				y1=iBy1;
//				x1=GmMe.me.iSpeed;
//			}
//			else
//			{
//				f1=XDefine.GetAngleXY_ext(iBx1, iBy1, iBx2, iBy2);
//				f2= (Math.sin(f1)*50);//y
//				f3= (Math.cos(f1)*50);//x
//				x1=f3;
//				y1=f2;
//				
//				a= (Math.cos(f1+0.35)*80);
//				b= (Math.sin(f1+0.35)*80);
//				c= (Math.cos(f1-0.35)*80);
//				d= (Math.sin(f1-0.35)*80);
//				e= (Math.cos(f1)*80);
//				f= (Math.sin(f1)*80);
//				
//				bext=true;
////				GmPlay.sop("jd="+(f1*180/3.1415926));
//			}
//			i=XDefine.llength(mx, my, ijx+x1, ijy+y1);
//			j=XDefine.llength(mx, my, ijx-x1, ijy-y1);
//			if(i>j)
//			{
//				dx=mx+x1;
//				dy=my+y1;
//				if(bext)
//				{
//					a=mx+a;
//					b=my+b;
//					c=mx+c;
//					d=my+d;
//					e=mx+e;
//					f=my+f;
//				}
//			}
//			else
//			{
//				dx=mx-x1;
//				dy=my-y1;
//				if(bext)
//				{
//					a=mx-a;
//					b=my-b;
//					c=mx-c;
//					d=my-d;
//					e=mx-e;
//					f=my-f;
//				}
//			}
//			GmPlay.sop("x1="+x1+",y1="+y1);
//			if(this.bCanMove(mx,my,dx,dy))
//			{
//				if(bext)
//				{
//					boolean b1=this.bCanMove(mx,my,a,b);
//					boolean b2=this.bCanMove(mx,my,c,d);
//					boolean b3=this.bCanMove(mx,my,e,f);
//					
//					if(!b1 && b2)
//					{
//						iPath[0][0]=mx;
//						iPath[0][1]=my;
//						iPath[1][0]=c;
//						iPath[1][1]=d;
//						iPathDeep=2;
//						return true;
//					}
//					else if(b1 && !b2)
//					{
//						iPath[0][0]=mx;
//						iPath[0][1]=my;
//						iPath[1][0]=a;
//						iPath[1][1]=b;
//						iPathDeep=2;
//						return true;
//					}
//					else if(!b1 && !b2)
//					{
//						return false;
//					}
//				}
//				iPath[0][0]=mx;
//				iPath[0][1]=my;
//				iPath[1][0]=dx;
//				iPath[1][1]=dy;
//				iPathDeep=2;
//				return true;
//			}
//			return false;
		}
		else
		{//不碰撞
			this.iPath[0][0]=mx;
			this.iPath[0][1]=my;
			this.iPath[1][0]=dx;
			this.iPath[1][1]=dy;
			this.iPathDeep=2;
			return true;
		}
//		return false;
	}
}
FindWay.bAutoBoom=false;