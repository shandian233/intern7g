
import DrawBuffer from "../../../../../../map/DrawBuffer"
import MapManager from "../../../../../../map/MapManager"
import GmConfig from "../../../../../../config/GmConfig"
import SortAnima from "../../../../../../config/SortAnima"
import BaseClass from "../../../../../../engine/BaseClass"
import XButtonEx2 from "../../../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../../engine/graphics/XAnima"
import FireworksEffect from "../../../../../../engtst/mgm/FireworksEffect"
import GmPlay from "../../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../../engtst/mgm/frame/format/FormatString"

export default class LeaderBoardRole extends BaseClass{

	constructor( ani)
	{
		super();
		this.iW=500;
		this.iH=320;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_button);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.iColor=new Int32Array(6);//
	}
	//Open(role_list[i].iRid,role_list[i].sName,role_list[i].iComplexScore,role_list[i].iScore,ras,color,weap);

	Draw()
	{
		var i;
		var ww=200;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		this.btn_close.Draw();
		
		FireworksEffect.DrawAura(0,this.iX+30+ww/2, this.iY+this.iH-30-30-60,null,0);
		GmPlay.xani_newrole[this.iRas].DrawAnima(this.iX+30+ww/2, this.iY+this.iH-30-30-60, "站立_下", GmPlay.iDelay/2);
		for(i=0;i<SortAnima._CHANGECOLOR[this.iRas].length;i++)
		{
			if(this.iColor[i]<=0)continue;
			GmPlay.xani_color[this.iRas][this.iColor[i]-1].DrawAnima(this.iX+30+ww/2, this.iY+this.iH-30-30-60, SortAnima._CHANGECOLOR[this.iRas][i]+"_站立_下",GmPlay.iDelay/2);
		}
		GmPlay.xani_weap[this.iRas][SortAnima.WeapFlag(this.iWeapId)].DrawAnima(this.iX+30+ww/2, this.iY+this.iH-30-30-60, "站立_下", GmPlay.iDelay/2);
		
		DrawMode.frame_type1("4号框20_30", this.iX+30, this.iY+this.iH-30-30, ww, 20);
		M3DFast.gi().DrawTextEx(this.iX+30+ww/2, this.iY+this.iH-30-15, this.sName, 0xffffffff, 24, 101, 1, 1, 0, -2, -2);
		
		if(this.iRank==0)M3DFast.gi().DrawText_2(this.iX+30+ww+30, this.iY+30, "未上榜", 0xffffec7e, 24, 101, 1, 1, 0, 0, 0, 3, 0xff01152e);
		else if(this.iRank==1)M3DFast.gi().DrawText_2(this.iX+30+ww+30, this.iY+30, "超越下一名："+this.iGap, 0xffffec7e, 24, 101, 1, 1, 0, 0, 0, 3, 0xff01152e);
		else M3DFast.gi().DrawText_2(this.iX+30+ww+30, this.iY+30, "距离上一名："+this.iGap, 0xffffec7e, 24, 101, 1, 1, 0, 0, 0, 3, 0xff01152e);
		M3DFast.gi().DrawText_2(this.iX+30+ww+30, this.iY+30+30, "综合评分："+this.iComplexScore, 0xffffec7e, 24, 101, 1, 1, 0, 0, 0, 3, 0xff01152e);
		
		DrawMode.frame_type4("11号框20_20", this.iX+30+ww+30, this.iY+30+60, this.iW-30-ww-30-30, (this.iH-30-60-30-20)/2, 20, 20);
		M3DFast.gi().DrawTextEx(this.iX+30+ww+30+15, this.iY+30+60+15, "人物评分："+this.iScore, 0xff124c60, 20, 101, 1, 1, 0, 0, 0);
		FormatString.gi().Format("#c124c60(与等级，技能，修炼，装备，阵法相关)", this.iW-30-ww-30-30-30, 16);
		FormatString.gi().Draw(this.iX+30+ww+30+15, this.iY+30+60+15+25);
		
		DrawMode.frame_type4("11号框20_20", this.iX+30+ww+30, this.iY+30+60+(this.iH-30-60-30-20)/2+20, this.iW-30-ww-30-30, (this.iH-30-60-30-20)/2, 20, 20);
		M3DFast.gi().DrawTextEx(this.iX+30+ww+30+15, this.iY+30+60+15+(this.iH-30-60-30-20)/2+20, "宠物评分："+(this.iComplexScore-this.iScore), 0xff124c60, 20, 101, 1, 1, 0, 0, 0);
		FormatString.gi().Format("#c124c60(与携带评分最高的四只宠物相关)", this.iW-30-ww-30-30-30, 16);
		FormatString.gi().Draw(this.iX+30+ww+30+15, this.iY+30+60+15+25+(this.iH-30-60-30-20)/2+20);
	}
	ProcTouch( msg, x, y)
	{
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
				return true;
			}
		}
		return false;
	}
}
LeaderBoardRole.Open=function( rid, name, compscore, rolescore, ras, color, weap, rank, gap)
{
	var lbr=XStat.gi().PushStat(XStat.GS_LEADERBOARDROLE);
	lbr.iRid=rid;
	lbr.sName=name;
	lbr.iComplexScore=compscore;
	lbr.iScore=rolescore;
	lbr.iPetScore=compscore-rolescore;
	lbr.iRas=ras;
//		lbr.iColor=color;
	lbr.iWeapId=weap;
	lbr.iRank=rank;
	lbr.iGap=gap;
	
	lbr.iColor[0]=color&7;
	lbr.iColor[1]=(color>>3)&7;
	lbr.iColor[2]=(color>>6)&7;
	lbr.iColor[3]=(color>>9)&7;
	lbr.iColor[4]=(color>>12)&7;
}