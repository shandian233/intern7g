
//import java.io.UnsupportedEncodingException;

import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButton from "../../../../engine/control/XButton"
import XButtonEx1 from "../../../../engine/control/XButtonEx1"
import XInput from "../../../../engine/control/XInput"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"

export default class Tetris extends BaseClass{

	
	constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=14;this.iH=14;
		this.matrix=new Array(this.iW);//
		this.tmpmatrix=new Array(this.iW);//
		this.frame=new Array(this.iW);//
		for(var i=0;i<this.iW;i++)
		{
			this.matrix[i]=new Int32Array(this.iH);
			this.tmpmatrix[i]=new Int32Array(this.iH);
			this.frame[i]=new Int32Array(this.iH);
		}
		this.block=new Array(4);//
		this.tmpblock=new Array(4);//
		for(var i=0;i<4;i++)
		{
			this.block[i]=new Int32Array(4);
			this.tmpblock[i]=new Int32Array(4);
		}
		this.InitMatrix();
		this.ResetBlock();

		//32x32
		//43x43
		//54x54
		this.iBW=32;
		this.iBH=32;
		this.aa_frame=GmPlay.xani_ui.InitAnimaWithName("统一小按钮1", null);
		this.aa_back=GmPlay.xani_ui.InitAnimaWithName("统一小按钮1", null);
		this.aa_back.iFrame=1;
		this.aa_block=GmPlay.xani_ngoods.InitAnimaWithName("高级经验丹", null);
		this.aa_block2=GmPlay.xani_ngoods.InitAnimaWithName("普通经验丹", null);

		this._BLOCKS=[
			[
				[1,1,0,0],
				[0,1,0,0],
				[0,1,0,0],
				[0,0,0,0]
			],
			[
				[ ],
				[ ],
				[ ],
				[ ]
			]];
	}

	ResetBlock()
	{
		var i,j,k;
		k=XDefine.GetRand(0, 0);
		for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				this.block[i][j]=this._BLOCKS[k][i][j]+2;
			}
		}
		this.iX=1;
		this.iY=1;
	}
	InitMatrix()
	{
		var i,j;
		for(i=0;i<this.iW;i++)
		{
			for(j=0;j<this.iH;j++)
			{
				if(i==0 || j==0 || i==this.iW-1 || j==this.iH-1)
				{//边框
					this.matrix[i][j]=0;
				}
//				else if(j>=this.iH/2 && i<=j-this.iH/2+1)this.matrix[i][j]=1;
//				else if(i>=this.iW/2 && j<=i-this.iW/2+1)this.matrix[i][j]=1;
				else this.matrix[i][j]=2;
				
				if(i==0 || j==0 || i==this.iW-1 || j==this.iH-1)
				{//边框
					this.frame[i][j]=0;
				}
				else if(j>=this.iH/2 && i<=j-this.iH/2+1)this.frame[i][j]=1;
				else if(i>=this.iW/2 && j<=i-this.iW/2+1)this.frame[i][j]=1;
				else this.frame[i][j]=2;
			}
		}
		this.iDelay=0;
		this.iFx=0;
	}
	 _boom( x, y)
	{
		var i,j;
		for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				if(this.block[i][j]!=2 && this.matrix[this.iX+i+x][this.iY+j+y]!=2)
				{
					return true;
				}
			}
		}
		return false;
	}
	Draw()
	{
		var i,j;
		var boom=false;
		this.iDelay++;
		if(this.iDelay%10==0)
		{
			if(this.iFx==0)
			{//左下y++
				if(this._boom(0,1))
				{
					if(this._boom(1,0))
					{
						boom=true;
					}
					else
					{
						this.iX++;
						this.iFx=1-this.iFx;
					}
				}
				else this.iY++;
			}
			else
			{//右下x++
				if(this._boom(1,0))
				{
					if(this._boom(0,1))
					{
						boom=true;
					}
					else
					{
						this.iY++;
						this.iFx=1-this.iFx;
					}
				}
				else this.iX++;
			}
			this.iFx=1-this.iFx;
			if(boom)
			{
				for(i=0;i<4;i++)
				{
					for(j=0;j<4;j++)
					{
						if(this.block[i][j]!=2)this.matrix[this.iX+i][this.iY+j]=4;
					}
				}
				this.ResetBlock();
			}
		}
		/////////////////
		for(i=0;i<this.iW;i++)
		{
			for(j=0;j<this.iH;j++)
			{
				this.tmpmatrix[i][j]=this.matrix[i][j];
			}
		}
		for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				if(this.block[i][j]!=2)this.tmpmatrix[this.iX+i][this.iY+j]=this.block[i][j];
			}
		}
		for(i=0;i<this.iW;i++)
		{
			for(j=0;j<this.iH;j++)
			{
				if(this.frame[i][j]==0)
				{//边框
					this.aa_frame.Draw(100+i*this.iBW, 100+j*this.iBH);
				}
				else if(this.frame[i][j]==1)
				{//背景
					this.aa_back.Draw(100+i*this.iBW, 100+j*this.iBH);
				}
//			}
//		}
//		for(i=0;i<this.iW;i++)
//		{
//			for(j=0;j<this.iH;j++)
//			{
//				if(this.tmpmatrix[i][j]==0)
//				{//边框
//					this.aa_frame.Draw(100+i*this.iBW, 100+j*this.iBH);
//				}
//				else if(this.tmpmatrix[i][j]==1)
//				{//背景
//					this.aa_back.Draw(100+i*this.iBW, 100+j*this.iBH);
//				}
				if(this.tmpmatrix[i][j]==3)
				{
					this.aa_block.Draw(100+i*this.iBW-30+this.iBW/2, 100+j*this.iBH-30+this.iBW/2);
				}
				else if(this.tmpmatrix[i][j]==4)
				{
					this.aa_block2.Draw(100+i*this.iBW-30+this.iBW/2, 100+j*this.iBH-30+this.iBW/2);
				}
			}
		}
	}
	rota()
	{
		var i,j;
		for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				this.tmpblock[i][j]=this.block[j][3-i];
			}
		}
		for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				if(this.tmpblock[i][j]!=2 && this.matrix[this.iX+i][this.iY+j]!=2)
				{//碰撞
					return;
				}
			}
		}
		for(i=0;i<4;i++)
		{
			for(j=0;j<4;j++)
			{
				this.block[i][j]=this.tmpblock[i][j];
			}
		}
	}
	 ProcTouch( msg, x, y)
	{
		if(XDefine.bInRect(x, y, 100, 100, this.iW*this.iBW, this.iH*this.iBH))
		{//旋转
		}
		else if(x<GmConfig.SCRW/2)
		{//向左
		}
		else
		{//向右
		}
		return false;
	}
}
Tetris.Open=function()
{
	XStat.gi().PushStat(XStat.GS_TETRIS);
}