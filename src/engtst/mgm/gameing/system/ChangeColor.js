
import DrawBuffer from "../../../../map/DrawBuffer"
import GmConfig from "../../../../config/GmConfig"
import SortAnima from "../../../../config/SortAnima"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../engtst/mgm/XStat"
import Confirm1 from "../../../../engtst/mgm/frame/Confirm1"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import SystemOperate from "../../../../engtst/mgm/gameing/fast/SystemOperate"
import GmMe from "../../../../engtst/mgm/gameing/me/GmMe"
import MyGoods from "../../../../engtst/mgm/gameing/me/goods/MyGoods"

export default class ChangeColor extends BaseClass{


	constructor( ani)
	{
		super();
		var i,j;
		this.iW=900;
		this.iH=550;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		this.aa_cls=new Array(6);//
		this.iColor=new Int32Array(6);//
		this.btn_color=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.btn_color[i]=new Array(6);
			this.aa_cls[i]=new Array(6);
			for(j=0;j<6;j++)
			{
				this.aa_cls[i][j]=new AnimaAction();
				this.btn_color[i][j]=new XButtonEx2(GmPlay.xani_nui3);
				this.btn_color[i][j].InitButton("仓库按钮");
				if(j==0)this.btn_color[i][j].sName="原";
				else this.btn_color[i][j].sName=""+j;
			}
			this.iColor[i]=GmMe.me.iColor[i];
		}
		this.aa_body=new AnimaAction();
		this.bChange=true;
		
		this.btn_left=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_left.InitButton("打开任务");
		this.btn_right=new XButtonEx2(GmPlay.xani_nui3);
		this.btn_right.InitButton("向右转");
		
		this.btn_rs=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_rs.InitButton("按钮1_110");
		this.btn_rs.sName="染色";
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.iRote=4;
	}
	 fx()
	{
		if(this.iRote<0)this.iRote+=8;
		if(this.iRote>=8)this.iRote-=8;
		switch(this.iRote)
		{
		case 0:return "上";
		case 1:return "左上";
		case 2:return "左";
		case 3:return "左下";
		case 4:return "下";
		case 5:return "右下";
		case 6:return "右";
		case 7:return "右上";
		}
		return "下";
	}
	
	ChangeColor1( xb, sa, m)
	{
//		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			GmPlay.xani_color[xb][this.iColor[i]-1].InitAnimaWithName(SortAnima._CHANGECOLOR[xb][i]+"_"+sa, this.aa_cls[m][i]);
			GmPlay.sop(""+SortAnima._CHANGECOLOR[xb][i]+"_"+sa);
		}
	}
	DrawColor( xb, frame, offy, x, y, m)
	{
//		if(!SystemOperate.bShowColor)return;
		var i;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{
			if(this.iColor[i]<=0 || this.iColor[i]>=6)continue;
			this.aa_cls[m][i].iFrame=frame;
			this.aa_cls[m][i].Draw(x,y);
//			DrawBuffer.gi().DrawAnima_aa(offy,null, x, y, this.aa_cls[m][i]);
		}
	}
	DrawRole( x,  y, faceto, stat, changed) 
	{
		var i;
		var xb=GmMe.me.iRace*2+GmMe.me.iSex;
		var ifaceto=GmMe.face_sti(faceto);
		var istat=GmMe.stat_sti(stat);
//		GmPlay.sop("SortAnima="+SortAnima.iii);
//		GmPlay.sop("xb="+xb+",,,istat="+istat+",,,ifaceto="+ifaceto+",,,"+stat);
//		GmPlay.sop("AnimaSort._ANIMASORT="+AnimaSort._ANIMASORT.length);
		var offy=0;
		for(i=0;i<SortAnima._ANIMASORT[xb][istat][ifaceto].length;i++)
		{
//			GmPlay.sop("");
			if(SortAnima._ANIMASORT[xb][istat][ifaceto][i]=="人物")
			{
				if(changed)
				{
					GmPlay.xani_newrole[xb].InitAnimaWithName(stat+"_"+faceto, this.aa_body);
					this.ChangeColor1(xb,stat+"_"+faceto,0);
//					iOffY = this.aa_body.pani.iAnimaY(this.aa_body) - 30;
				}
				this.aa_body.Draw(x, y);
//				DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y, this.aa_body);
				this.DrawColor(xb,this.aa_body.iFrame,y+offy,x,y,0);
				this.aa_body.NextFrame();
				offy++;
			}
			else if(SortAnima._ANIMASORT[xb][istat][ifaceto][i]=="武器")
			{
//				if(changed)
//				{
//					this.iWeapTid = MyGoods.gi().GetWeaponTid();
//					if(this.iWeapTid>=0)GmPlay.xani_weap[xb][SortAnima.WeapFlag(this.iWeapTid)].InitAnimaWithName(stat+"_"+faceto, aa_weapon);
//				}
//				if(this.iWeapTid>=0)
//				{
////					GmPlay.sop("SortAnima.WeapFlag(this.iWeapTid)="+SortAnima.WeapFlag(this.iWeapTid));
//					if(SystemOperate.bShowWeapon)DrawBuffer.gi().DrawAnima_aa(y+offy,null, x, y, aa_weapon);
//					aa_weapon.NextFrame();
//				}
////				GmPlay.sop("this.iWeapTid="+this.iWeapTid);
//				offy++;
			}
		}
		// int xb=race*2+sex;
		// xani_newrole[0]
	}
	
	Draw()
	{
		var i,j,k,m,n,o;
		
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		this.btn_close.Draw();
		
		GmPlay.xani_nui2.DrawAnima(this.iX+30+140-130,this.iY+100 ,"宠物背景",0);
		
		this.DrawRole(this.iX+30+140,this.iY+290,this.fx(),"站立",this.bChange);
		this.bChange=false;
		
		this.btn_left.Move(this.iX+30+140-100-25, this.iY+200, 50, 70);
		this.btn_left.Draw();
		this.btn_right.Move(this.iX+30+140+100-25, this.iY+200, 50, 70);
		this.btn_right.Draw();
		
		var xb=GmMe.me.iRace*2+GmMe.me.iSex;
		m=360;
		n=SortAnima._CHANGECOLOR[xb].length;
		k=(m-60*n)/(n+1);
		
		var cost="";
		o=0;
		this.iNeed=0;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{//颜色数
//			M3DFast.gi().DrawTextEx(this.iX+330, this.iY+50+i*80+30, SortAnima._CHANGECOLOR[xb][i], 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			M3DFast.gi().DrawTextEx(this.iX+310, this.iY+50+i*(k+60)+k+30, "部位"+(i+1), 0xff003e57, 30, 101, 1, 1, 0, 0, -2);
			for(j=0;j<6;j++)
			{//可换5种，和一种本色
				if(this.iColor[i]==j)
				{
					this.btn_color[i][j].bMouseDown=true;
					this.btn_color[i][j].bMouseIn=true;
				}
				this.btn_color[i][j].Move(this.iX+400+j*80, this.iY+50+i*(k+60)+k, 60, 60);
				this.btn_color[i][j].Draw();
			}
			if(this.iColor[i]!=GmMe.me.iColor[i] && this.iColor[i]>0)
			{
				if(o>0)cost+="+";
				cost+="部位"+(i+1)+"需"+SortAnima._CHANGECOLORCOST[xb][i]+"彩果";
				o++;
				this.iNeed+=SortAnima._CHANGECOLORCOST[xb][i];
			}
		}
		//跟原来的color比较，改变了多少，就需要多少个彩果
		M3DFast.gi().DrawTextEx(this.iX+50, this.iY+450, "共需"+this.iNeed+"个彩果", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		this.btn_rs.Move(this.iX+this.iW-110-50, this.iY+450-11, 110, 52);
		this.btn_rs.Draw();
//		if(p>0)
//		{
//			M3DFast.gi().DrawTextEx(this.iX+50, this.iY+450, cost, 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
//			M3DFast.gi().DrawTextEx(this.iX+50, this.iY+500, "共需"+p+"个彩果", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
//		}
		
		//计算当前背包中彩果数量
		this.iCGCount=0;
		for(i=0;i<20;i++)
		{
			if(MyGoods.gi().goods[2][i].iGid>0 && MyGoods.gi().goods[2][i].iTid==312)
			{
				this.iCGCount+=MyGoods.gi().goods[2][i].iCount;
			}
		}
		M3DFast.gi().DrawTextEx(this.iX+50, this.iY+450+35, "背包中有"+this.iCGCount+"个彩果", 0xff003e57, 30, 101, 1, 1, 0, 0, 0);
		
		if(Confirm1.end(Confirm1.CONFIRM_CHANGECOLOR))
		{
			if(Confirm1.bConfirm)
			{//
				GmProtocol.gi().s_SeverEvent(23, 0, this.iDestColor, 0,0);
				XStat.gi().PopStat(1);
			}
		}
	}

	ProcTouch( msg, x, y)
	{
		var i,j;
		var xb=GmMe.me.iRace*2+GmMe.me.iSex;
		for(i=0;i<SortAnima._CHANGECOLOR[xb].length;i++)
		{//颜色数
			for(j=0;j<6;j++)
			{//可换5种，和一种本色
				if(this.btn_color[i][j].ProcTouch(msg, x, y))
				{
					if(this.btn_color[i][j].bCheck())
					{
						this.iColor[i]=j;
						this.bChange=true;
					}
				}
			}
		}
		
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		if(this.btn_rs.ProcTouch(msg, x, y))
		{
			if(this.btn_rs.bCheck())
			{//确定染色
//				i=(((((((this.iColor[0]<<3)|this.iColor[1])<<3)|this.iColor[2])<<3)|this.iColor[3])<<3)|this.iColor[4];
				i=(((((((this.iColor[4]<<3)|this.iColor[3])<<3)|this.iColor[2])<<3)|this.iColor[1])<<3)|this.iColor[0];
				if(this.iNeed>this.iCGCount)EasyMessage.easymsg.AddMessage("拥有彩果不足");
				else if(GmMe.me.iFlag[53]==i)EasyMessage.easymsg.AddMessage("修改颜色后再染色");
				else
				{//发送染色消息
					this.iDestColor=i;
					Confirm1.start(Confirm1.CONFIRM_CHANGECOLOR,"是否确定染成所选颜色？");
				}
			}
			return true;
		}
		if(this.btn_left.ProcTouch(msg, x, y))
		{
			if(this.btn_left.bCheck())
			{
				this.iRote--;
				this.bChange=true;
			}
		}
		if(this.btn_right.ProcTouch(msg, x, y))
		{
			if(this.btn_right.bCheck())
			{
				this.iRote++;
				this.bChange=true;
			}
		}
		return true;
	}
}
ChangeColor.Open=function()
{
	XStat.gi().PushStat(XStat.GS_CHANGECOLOR);
}