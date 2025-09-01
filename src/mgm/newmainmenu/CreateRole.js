
//import java.io.UnsupportedEncodingException;

import MainMenu from "../../mgm/mainmenu/MainMenu"

import GameData from "../../config/GameData"
import GmConfig from "../../config/GmConfig"
import XDefine from "../../config/XDefine"

import BaseClass from "../../engine/BaseClass"
import PackageTools from "../../engine/PackageTools"
import XButton from "../../engine/control/XButton"
import XButtonEx2 from "../../engine/control/XButtonEx2"
import XInput from "../../engine/control/XInput"
import AnimaAction from "../../engine/graphics/AnimaAction"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import XRecordFast from "../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../engtst/mgm/frame/DrawMode"
import FormatString from "../../engtst/mgm/frame/format/FormatString"
import EasyMessage from "../../engtst/mgm/frame/message/EasyMessage"
import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate"
import GU from "../../engine/gbk";

export default class CreateRole extends BaseClass{

	 constructor( ani)
	{
		super();
		var i;
		this.WHEELGAP=1000;
		this.WHEELMAX=this.WHEELGAP*6;
		 this.school_special=[
			"物理输出、点杀","高敏、封系、控制","辅助、奶妈、复活、恢复",
			"物理输出、群攻","最高法系伤害、群秒(但目标数量较少)","封印、解封、控制",	
			"较高法系伤害、群秒(目标数量多)","固定伤害、随机群秒、辅助、持续恢复","单体高伤、复活、持续蓝恢复、封印"];

		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.bDown=false;
		this.iWheel=this.WHEELGAP/2;
		this.iSelectPoint=0;
		
		this.in_nick=new XInput(ani);
		this.bCanRand=true;
		this.iRandNameDelay=0;
		this.btn_randname=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_randname.InitButton("随机按钮");
		this.btn_randname.Move(706*GmConfig.SCRW/1280, 634, 48, 48);
		
		this.btn_create=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_create.InitButton("创建按钮");
		this.btn_create.Move(GmConfig.SCRW-126-25, 576, 126, 128);
		
		this.btn_back=new XButtonEx2(GmPlay.xani_nui1);
		this.btn_back.InitButton("返回按钮");
		this.btn_back.Move(25, 576, 126, 128);
		
		this.aa_roles=new Array(6);//
		this.aa_weapons=new Array(6);//
		for(i=0;i<6;i++)
		{
			this.aa_roles[i]=new AnimaAction();
			GmPlay.xani_newrole[i].InitAnimaWithName("站立_下", this.aa_roles[i]);
		}
	}
	wheeldraw( wheel)
	{
		var i,j,k,m;
		var lor;//-1left，1right
		while(wheel<0)wheel+=this.WHEELMAX;
		wheel%=this.WHEELMAX;
		for(i=0;i<6;i++)
		{
			if(i*this.WHEELGAP<=wheel && wheel<=(i+1)*this.WHEELGAP)
			{
				this.iSelectPoint=i;//当前指向人物
				break;
			}
		}
		//画出6个人物
		for(m=0;m<2;m++)
		{
			for(i=0;i<6;i++)
			{
				j=i*this.WHEELGAP+this.WHEELGAP/2;//正中位置
				k=Math.abs(j-wheel);//距离
				if(j<wheel)lor=-1;
				else lor=1;
				if(k>this.WHEELMAX/2)
				{
					k=Math.abs(j+this.WHEELMAX-wheel);
					if(j+this.WHEELMAX<wheel)lor=-1;
					else lor=1;
				}
				if(k>this.WHEELMAX/2)
				{
					k=Math.abs(j-this.WHEELMAX-wheel);
					if(j-this.WHEELMAX<wheel)lor=-1;
					else lor=1;
				}//365,575
				var ttt=300*GmConfig.SCRW/1280;
				if(k<this.WHEELGAP)
				{//边上到中间过渡,,100%<>50%
					if(m==1)
					{
						GmPlay.xani_nui1.DrawAnimaEx(558*GmConfig.SCRW/1280+lor*ttt*k/this.WHEELGAP, 544-100*k/this.WHEELGAP, "人物原画", i, 101                                  , 0.65+0.35*(this.WHEELGAP-k)/this.WHEELGAP, 0.65+0.35*(this.WHEELGAP-k)/this.WHEELGAP, 
												  0, -2,-2);
					}
				}
				else if(k<this.WHEELGAP*2)
				{//没有到边上过渡
					if(m==0)
					{
						GmPlay.xani_nui1.DrawAnimaEx(558*GmConfig.SCRW/1280+lor*ttt                , 544-100                , "人物原画", i, 100*(this.WHEELGAP*2-k)/this.WHEELGAP, 0.65                                     , 0.65                                     , 
												  0, -2,-2);
					}
				}
			}
		}
	}
	Draw()
	{
		var i,j;
		
		CreateRole.drawback();
		
		this.wheeldraw(this.iWheel+(this.bDown?(this.iLockX-this.iMoveX)*2:0));
		if(!this.bDown)
		{
			while(this.iWheel<0)this.iWheel+=this.WHEELMAX;
			this.iWheel%=this.WHEELMAX;
			
			i=this.iSelectPoint*this.WHEELGAP+this.WHEELGAP/2;
			j=100;
			if(this.iWheel<i-j)this.iWheel+=j;
			else if(this.iWheel>i+j)this.iWheel-=j;
			else this.iWheel=i;
		}
		
		GmPlay.xani_nui1.DrawAnima(557*GmConfig.SCRW/1280-(557-512),15, "种族性别",this.iSelectPoint);
		
		for(i=0;i<3;i++)
		{//右侧可选门派描述
			j=parseInt(this.iSelectPoint/2)*3+i;
			M3DFast.gi().DrawTextEx(1137*GmConfig.SCRW/1280, 47+i*106, GameData.sSchools[j+1], 0xffffffff, SystemOperate.WordSize(20), 101, 1, 1, 0, -2, -2);
			FormatString.gi().Format(this.school_special[j], SystemOperate.WordSize(120)*GmConfig.SCRW/1280, SystemOperate.WordSize(20));
//			FormatString.gi().FormatEx(this.school_special[j], SystemOperate.WordSize(120), SystemOperate.WordSize(20), 3, 0xff000000, 0);
			FormatString.gi().Draw(1076*GmConfig.SCRW/1280, 72+i*106);
		}
		
		GmPlay.xani_nui1.DrawAnimaEx(1140*GmConfig.SCRW/1280,525, "选中角色底", GmPlay.iDelay, 101, 0.5, 0.5, 0, -2, -2);
		this.aa_roles[this.iSelectPoint].Draw(1140*GmConfig.SCRW/1280,525);
		this.aa_roles[this.iSelectPoint].NextFrame();
		
		this.in_nick.Move(365*GmConfig.SCRW/1280, 629,330*GmConfig.SCRW/1280, 56);
		
		if(this.in_nick.sDetail.length<=0)M3DFast.gi().DrawTextEx(536*GmConfig.SCRW/1280,657,"角  色  昵  称",0x70ffffff,SystemOperate.WordSize(33), 101,1,1,0,-2,-2);
		else M3DFast.gi().DrawTextEx(536*GmConfig.SCRW/1280,657,this.in_nick.sDetail,0xffffffff,SystemOperate.WordSize(30), 101,1,1,0,-2,-2);
		if(this.iRandNameDelay<=0)
		{
			if(this.bCanRand)this.btn_randname.Draw();
		}
		else this.iRandNameDelay--;
//		this.in_nick.DrawText();
		this.in_nick.onscr();
		
		this.btn_create.Draw();
		this.btn_back.Draw();
	}

	ProcTouch( msg, x, y)
	{
		var i;
		if(y<570)
		{
			if(msg==1)
			{
				this.bDown=true;
				this.iLockX=x;
				this.iMoveX=x;
			}
		}
		if(this.bDown)
		{
			if(msg==2)
			{
				this.iMoveX=x;
			}
			if(msg==3)
			{
				this.iWheel+=(this.iLockX-this.iMoveX)*2;
				this.bDown=false;
			}
		}
		if(this.iRandNameDelay<=0 && this.bCanRand)
		{
			if(this.btn_randname.ProcTouch(msg, x, y))
			{
				if(this.btn_randname.bCheck())
				{
					this.iRandNameDelay=20;
					this.bCanRand=false;
					GmProtocol.gi().s_GetRandName(this.iSelectPoint%2);
				}
				return true;
			}
		}
		this.in_nick.ProcTouch(msg, x, y);
		
		if(this.btn_create.ProcTouch(msg, x, y))
		{
			if(this.btn_create.bCheck())
			{//检测输入昵称是否正确，发送创建信息
				if(!CreateRole.bCheckNick(this.in_nick.sDetail,4,24))
				{//昵称格式有问题
					EasyMessage.easymsg.AddMessage("请填写正确的昵称");
				}
				else
				{//昵称没问题,申请注册
					GmProtocol.gi().s_CreateRole(XRecordFast.iLastSector,
							XRecordFast.iLastSever,
							this.in_nick.sDetail, this.iSelectPoint%2, this.iSelectPoint/2);
					XStat.gi().PushStat(XStat.GS_LOADING1);
//					((Loading1)(XStat.gi().LastStat(0))).sDetail="创建中...";
				}
			}
			return true;
		}
		if(this.btn_back.ProcTouch(msg, x, y))
		{
			if(this.btn_back.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		return false;
	}

}
CreateRole.res_bk=-1;
CreateRole.drawback=function()
{
	if(CreateRole.res_bk<0)CreateRole.res_bk=M3DFast.gi().LoadFromFile("datapackage/others/createrole.png",-1,true);
	M3DFast.gi().DrawImageEx(0, 0, 0, CreateRole.res_bk, 0, 0, 1280, 720, 101, SystemOperate.BASEW/1280, 1, 0, 0, 0);
}

CreateRole.GetRandName=function( pls)
{
	if (XStat.gi().LastStatType(0) != XStat.GS_CREATEROLE)return;
	var cr=XStat.gi().LastStat(0);
	cr.in_nick.sDetail=pls.GetNextString();
	cr.in_nick.OpenInput();
	cr.bCanRand=true;
}

CreateRole.bCheckNick=function( s, min, max)
{
	var i;
	var buf=GU.utf8_to_gb2312a(s);
	if(buf.length<min || buf.length>max)return false;
	for(i=0;i<buf.length;i++)
	{
			if(buf[i]=='\\'.charCodeAt(0))return false;
			if(buf[i]=='/'.charCodeAt(0))return false;
			if(buf[i]=='|'.charCodeAt(0))return false;
//				if(buf[i]>='a' && buf[i]<='z')continue;
//				if(buf[i]>='A' && buf[i]<='Z')continue;
//				if(buf[i]>='0' && buf[i]<='9')continue;
//				return false;
	}
	return true;

}