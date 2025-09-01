
import XDefine from "../../config/XDefine"
import GmPlay from "../../engtst/mgm/GmPlay"

export default class StarEffect {
	constructor()
	{
	}
	Init3( x, y, r, count)
	{//圆形星星
		var i;
		this.iType=3;
		this.iCount=count;
		this.starlist=new Array(this.iCount);////x,y,to,jd
		for(i=0;i<this.iCount;i++)this.starlist[i]=new Int32Array(4);
		this.iX=x;
		this.iY=y;
		this.iR=r;
		this.iNowX=x;
		this.iNowY=y;
		for(i=0;i<this.iCount;i++)this.starlist[i][0]=-1;
		this.iStat=0;
		this.fJd=0;
	}
	Init1( x, y, w, h, count)
	{//矩形星星
		var i;
		this.iType=1;
		this.iCount=count;
		this.starlist=new Array(this.iCount);////x,y,to
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;
		this.iNowX=x;
		this.iNowY=y;
		for(i=0;i<this.iCount;i++)
		{
			this.starlist[i]=new Int32Array(3);
			this.starlist[i][0]=-1;
		}
		this.iStat=0;
	}
	Init2( x, y, r, count)
	{//向上升直线
		var i;
		this.iType=2;
		this.iCount=count;
		this.starlist=new Array(this.iCount);////x,y,to
		this.iX=x;
		this.iY=y;
		this.iR=r;
		for(i=0;i<this.iCount;i++)
		{
			this.starlist[i]=new Int32Array(3);
			this.starlist[i][0]=-1;
		}
	}
	Logic()
	{
		var i,j,k,x,y;
		if(this.iType==1)
		{//旋转长方形效果
//			j=3;k=0;
			j=0;k=2;
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]==-1)
				{//出现新的星星
					this.starlist[i][0]=12;
					this.starlist[i][1]=XDefine.GetRand(0,j*2)+this.iNowX-j;
					this.starlist[i][2]=XDefine.GetRand(0,j*2)+this.iNowY-j;
//					if(this.iStat==0 || this.iStat==2)
//					{
//						this.starlist[i][1]=XDefine.GetRand(0,j*2)+this.iNowX-j;
//						this.starlist[i][2]=this.iNowY;
//					}
//					else
//					{
//						this.starlist[i][1]=this.iNowX;
//						this.starlist[i][2]=XDefine.GetRand(0,j*2)+this.iNowY-j;
//					}
					  
					k++;
					if(k>=2)break;
				}
			}//3~16
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0)
				{
					this.starlist[i][0]++;
					if(this.starlist[i][0]>=40)this.starlist[i][0]=-1;
				}
			}
			j=10;
			switch(this.iStat)
			{
			case 0://向下
				if(this.iNowY<this.iY+this.iH)this.iNowY+=j;
				else this.iStat=1;
				break;
			case 1://向右
				if(this.iNowX<this.iX+this.iW)this.iNowX+=j;
				else this.iStat=2;
				break;
			case 2://向上
				if(this.iNowY>this.iY)this.iNowY-=j;
				else this.iStat=3;
				break;
			case 3://向左
				if(this.iNowX>this.iX)this.iNowX-=j;
				else this.iStat=0;
				break;
			}
		}
		else if(this.iType==2)
		{
			if(GmPlay.iDelay%2==0)
			{
				for(i=0;i<this.iCount;i++)
				{
					if(this.starlist[i][0]==-1)
					{//出现直线
						this.starlist[i][0]=0;
						do
						{
							x=XDefine.GetRand(0,this.iR*2)-this.iR;
							y=XDefine.GetRand(0,this.iR*2)-this.iR;
						}while(x*x+y*y>this.iR*this.iR);
						this.starlist[i][1]=x;
						this.starlist[i][2]=y/2;
						break;
					}
				}
			}
		}
		else if(this.iType==3)
		{
			this.fJd+=0.15;
			j=0;k=0;
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]==-1)
				{//出现新的星星
					this.starlist[i][0]=16;
					this.starlist[i][1]= (this.iX+Math.sin(this.fJd+0.1*k)*(this.iR+k)+XDefine.GetRand(0,j*2)-j);
					this.starlist[i][2]= (this.iY+Math.cos(this.fJd+0.1*k)*(this.iR+k)+XDefine.GetRand(0,j*2)-j);
					this.starlist[i][3]=XDefine.GetRand(0,360);

					k++;
					if(k>=1)break;
				}
			}//3~16
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0)
				{
					this.starlist[i][0]++;
					if(this.starlist[i][0]>=40)this.starlist[i][0]=-1;
				}
			}
		}
	}
	Draw( offx, offy)
	{
		var i,j,k,x,y;
		if(this.iType==1)
		{//旋转长方形效果
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0)
				{//画出星星
					GmPlay.xani_nui1.DrawAnimaEx(offx+this.starlist[i][1], offy+this.starlist[i][2], "黄金星光", this.starlist[i][0]/2, 101, 1,1, 0, 0, 0);
				}
			}
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0)
				{//画出星星
					GmPlay.xani_nui1.DrawAnimaEx(offx+this.starlist[i][1], offy+this.starlist[i][2], "星星心", this.starlist[i][0]/2, 101, 1,1, 0, 0, 0);
				}
			}
		}
		else if(this.iType==2)
		{
			if(GmPlay.iDelay%2==0)
			{
				for(i=0;i<this.iCount;i++)
				{
					if(this.starlist[i][0]==-1)
					{//出现直线
						this.starlist[i][0]=0;
						do
						{
							x=XDefine.GetRand(0,this.iR*2)-this.iR;
							y=XDefine.GetRand(0,this.iR*2)-this.iR;
						}while(x*x+y*y>this.iR*this.iR);
						this.starlist[i][1]=x;
						this.starlist[i][2]=y/2;
						break;
					}
				}
			}
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0 && this.starlist[i][2]<0)
				{//画出直线
					GmPlay.xani_nui1.DrawAnimaEx(offx+this.starlist[i][1], offy+this.starlist[i][2], "单线", this.starlist[i][0]/2, 101, 1, 0.5, 0, 0, 0);
					//GmPlay.xani_nui1.DrawAnima(offx+this.starlist[i][1], offy+this.starlist[i][2], "冒线条", this.starlist[i][0]/2);
					this.starlist[i][0]++;
					if(this.starlist[i][0]>=18)this.starlist[i][0]=-1;
				}
			}
		}
		else 	if(this.iType==3)
		{//圆形
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0)
				{//画出星星
					GmPlay.xani_nui1.DrawAnimaEx(offx+this.starlist[i][1], offy+this.starlist[i][2], "黄金星光", this.starlist[i][0]/2, 101, 1,1, 0, 0, 0);
				}
			}
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0)
				{//画出星星
					GmPlay.xani_nui1.DrawAnimaEx(offx+this.starlist[i][1], offy+this.starlist[i][2], "星星心", this.starlist[i][0]/2, 101, 1,1, this.starlist[i][3], offx+this.starlist[i][1], offy+this.starlist[i][2]);
				}
			}
		}
	}
	DrawFront( offx, offy)
	{
		var i;
		if(this.iType==2)
		{
			for(i=0;i<this.iCount;i++)
			{
				if(this.starlist[i][0]>=0 && this.starlist[i][2]>=0)
				{//画出直线
					GmPlay.xani_nui1.DrawAnimaEx(offx+this.starlist[i][1], offy+this.starlist[i][2], "单线", this.starlist[i][0]/2, 101, 1, 0.5, 0, 0, 0);
					//GmPlay.xani_nui1.DrawAnima(offx+this.starlist[i][1], offy+this.starlist[i][2], "冒线条", this.starlist[i][0]/2);
					this.starlist[i][0]++;
					if(this.starlist[i][0]>=18)this.starlist[i][0]=-1;
				}
			}
		}
	}
}
