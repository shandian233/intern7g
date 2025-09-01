
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import DrawBuffer from "../../../../map/DrawBuffer"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import GmPlay from "../../../../engtst/mgm/GmPlay"

class _EFFECT
{
/*	public boolean bUseing;
	public AnimaAction aa,aa1;
	public int iX,iY;
	public int iTX,iTY;
	public int iTFrame;//到达目标剩余帧数
	public int iRa;//飞刀旋转角度
	public int iType;//0普通，1飞刀
	public int iRate;//缩放比例，10正常
	public int iSkillId;*/
	constructor()
	{
		this.bUseing=false;
		this.aa=new AnimaAction();
		this.aa1=new AnimaAction();
	}
}
export default class XFightEffect {

	
//	_EFFECT list_sky[ ];
//	_EFFECT this.list_middle[ ];
//	_EFFECT list_ground[ ];
	
	
	constructor()
	{
		var i;
//		list_sky=new Array(XFightEffect.MAXEFFECT);//
//		for(i=0;i<XFightEffect.MAXEFFECT;i++)list_sky[i]=new _EFFECT();
		
		this.list_middle=new Array(XFightEffect.MAXEFFECT);//
		for(i=0;i<XFightEffect.MAXEFFECT;i++)this.list_middle[i]=new _EFFECT();
		
//		list_ground=new Array(XFightEffect.MAXEFFECT);//
//		for(i=0;i<XFightEffect.MAXEFFECT;i++)list_ground[i]=new _EFFECT();
	}
	AddDarts( x, y, tx, ty, type, frame)
	{
		var i;
		for(i=0;i<XFightEffect.MAXEFFECT;i++)
		{
			if(!this.list_middle[i].bUseing)
			{
				this.list_middle[i].bUseing=true;
				this.list_middle[i].iX=x;
				this.list_middle[i].iY=y-60;
				this.list_middle[i].iRate=10;
				this.list_middle[i].iSkillId=type;//飞刀类型
				this.list_middle[i].iType=1;//飞刀
				this.list_middle[i].iTFrame=frame;
				this.list_middle[i].iTX=tx;
				this.list_middle[i].iTY=ty-60;
				this.list_middle[i].iRa=XDefine.GetAngleXY(x, y,tx, ty);
				if(this.list_middle[i].iRa<0)this.list_middle[i].iRa+=360;
				//GmPlay.sop("jd==="+this.list_middle[i].iRa+"("+x+","+y+","+tx+","+ty+")");
				switch(type)
				{
				case 0://载入飞刀动画
					GmPlay.xani_skills[0].InitAnimaWithName("飞刀",this.list_middle[i].aa);
					break;
				case 1://
				case 2:
				case 3:
				case 4:
				case 5:
					GmPlay.xani_skills[0].InitAnimaWithName("五行攻击"+type,this.list_middle[i].aa);
					break;
				case 6:
					GmPlay.xani_skills[8].InitAnimaWithName("穿云箭",this.list_middle[i].aa);
					break;
				default:
					GmPlay.xani_skills[0].InitAnimaWithName("飞刀",this.list_middle[i].aa);
					break;
				}
				break;
			}
		}
	}
	AddEffect( x, y, effectid, rot)
	{//位置，效果id,是否旋转
		//根据效果id获得效果名称，是否翻转
		var i;
		if(effectid>=XFightEffect.EFFECTNAME.length)return;
//		GmPlay.sop1("add effect  = "+effectid);
		for(i=0;i<XFightEffect.MAXEFFECT;i++)
		{
			if(!this.list_middle[i].bUseing)
			{
				this.list_middle[i].bUseing=true;
				this.list_middle[i].iX=x;
				this.list_middle[i].iY=y;
				this.list_middle[i].iRate=10;
				this.list_middle[i].iSkillId=effectid;
				this.list_middle[i].iType=0;
				
				switch(effectid)
				{
				case 9://迷雾
				case 11://兵诡
					break;
				case 54://普通攻击
				case 61://加血效果
				case 62://加蓝效果
					GmPlay.xani_skills[0].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid],this.list_middle[i].aa);
					break;
				case 0://浩然剑气--------------------------------------------------------------------------------
				case 1://"无双剑法",//1
				case 2://"幻影剑法",//2
				case 57://幻影剑法2
				case 3://"凝神聚气",//3
				case 4://"虎啸",//4
				case 5://"先发制人",//5
					GmPlay.xani_skills[1].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
				case 6://陷阱---------------------------------------------------------------------------------------
				case 8://轮轴术
				case 10://奇谋
					GmPlay.xani_skills[2].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
				case 7://烈焰阵
					GmPlay.xani_skills[2].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"1_右":"1_左"),this.list_middle[i].aa);
					GmPlay.xani_skills[2].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"2_右":"2_左"),this.list_middle[i].aa1);
					this.list_middle[i].iRate=20;
					break;
				case 12://推宫过血-------------------------------------------------------------------------------
				case 15://"气功",//15
				case 16://"知己知彼",//16
				case 17://"针灸",//17
					GmPlay.xani_skills[3].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
				case 13://起死回生
				case 14://"练气化神",//14
					GmPlay.xani_skills[3].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"1_右":"1_左"),this.list_middle[i].aa);
					GmPlay.xani_skills[3].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"2_右":"2_左"),this.list_middle[i].aa1);
					this.list_middle[i].iRate=20;
					break;
					
				case 18://狂暴使用
				case 19://连环刀
				case 20://乱舞
				case 21://定心诀
				case 23://壁垒
					GmPlay.xani_skills[4].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
					
				case 24://火流星
					GmPlay.xani_skills[5].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"1_右":"1_左"),this.list_middle[i].aa);
					GmPlay.xani_skills[5].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"2_右":"2_左"),this.list_middle[i].aa1);
					this.list_middle[i].iRate=20;
					break;

				case 25://"毒火术",//17
				case 26://火牢
				case 27://炎爆术
				case 28://火甲术
				case 29://火灵决
					GmPlay.xani_skills[5].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					if(effectid==28)this.list_middle[i].iRate=10;
					break;
					
				case 30://飞箝术
				case 32://鬼谷刀法
				case 33://散势法
				case 34://清心咒
				case 35://鬼符
					GmPlay.xani_skills[6].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
					
				case 60://唤雨新
					GmPlay.xani_skills[7].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=30;
					break;
				case 36://"呼风",//36
				case 40://"天神助威",//40
				case 41://"灵智术",//41
					GmPlay.xani_skills[7].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
				case 37://"唤雨",//37
				case 38://"天雷封魔",//38
				case 39://"仙甲术",//39
					GmPlay.xani_skills[7].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					break;
					
				case 42://天阵
				case 43://地阵
					break;
				case 44://五行击
				case 46://弧虚法
				case 47://归元法
					GmPlay.xani_skills[9].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
					
				case 48://穿云箭爆
				case 50://驱魔符
				case 51://天地同寿
				case 52://灵动
				case 53://仙绫缚
					GmPlay.xani_skills[8].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
					
				case 56://生死决
				case 63://奋力一击
				case 64://烈火
				case 65://水箭
				case 66://风刃
				case 67://流沙
				case 68://巫毒
				case 69://招魂
					GmPlay.xani_skills[11].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
				case 58://出场烟雾
				case 59://五行攻击爆炸
					GmPlay.xani_skills[0].InitAnimaWithName(XFightEffect.EFFECTNAME[effectid],this.list_middle[i].aa);
					this.list_middle[i].iRate=20;
					break;
				default:
					GmPlay.xani_skill.InitAnimaWithName(XFightEffect.EFFECTNAME[effectid]+(rot?"_右":"_左"),this.list_middle[i].aa);
					break;
				}
				break;
			}
		}
	}
	AddEffect2( x, y, ext, en, rot)
	{
		var i;
		for(i=0;i<XFightEffect.MAXEFFECT;i++)
		{
			if(!this.list_middle[i].bUseing)
			{
				this.list_middle[i].bUseing=true;
				this.list_middle[i].iX=x;
				this.list_middle[i].iY=y;
				this.list_middle[i].iRate=ext%100;
				GmPlay.xani_skills[parseInt(ext/100)].InitAnimaWithName(en+(rot?"_右":"_左"),this.list_middle[i].aa);
				this.list_middle[i].iSkillId=-1;
				this.list_middle[i].iType=0;
				break;
			}
		}
	}
	/*0 other
	 * 1~9 人物
	 * 10 装备
	 * 11 宠物
	 * */
	DrawGround()
	{
		var i;
		//排序
		for(i=0;i<XFightEffect.MAXEFFECT;i++)
		{
			if(this.list_middle[i].bUseing)
			{
				if(this.list_middle[i].iType==1)
				{//飞刀飞行
					DrawBuffer.gi().DrawAnimaEx(GmConfig.SCRH, this.list_middle[i].iX, this.list_middle[i].iY, this.list_middle[i].aa,101,0.1*this.list_middle[i].iRate, 0.1*this.list_middle[i].iRate,this.list_middle[i].iRa,-2,-2);
					this.list_middle[i].iX=this.list_middle[i].iTX+(this.list_middle[i].iX-this.list_middle[i].iTX)*this.list_middle[i].iTFrame/(this.list_middle[i].iTFrame+1);
					this.list_middle[i].iY=this.list_middle[i].iTY+(this.list_middle[i].iY-this.list_middle[i].iTY)*this.list_middle[i].iTFrame/(this.list_middle[i].iTFrame+1);
					
					if(this.list_middle[i].iTFrame<=0)
					{
						this.list_middle[i].bUseing=false;
					}
					else this.list_middle[i].iTFrame--;
					this.list_middle[i].aa.NextFrame();
					continue;
				}
//				GmPlay.sop("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa="+this.list_middle[i].iX+","+this.list_middle[i].iY);
//				this.list_middle[i].aa.Draw(this.list_middle[i].iX, this.list_middle[i].iY);
//				this.list_middle[i].aa.DrawEx(this.list_middle[i].iX, this.list_middle[i].iY, 101, 0.1f*this.list_middle[i].iRate, 0.1f*this.list_middle[i].iRate, 0, -1, -1);
//				this.list_middle[i].aa.DrawEx(this.list_middle[i].iX, this.list_middle[i].iY, 101, 1,1, 0, 0, 0);
				
//				this.list_middle[i].aa.DrawEx(this.list_middle[i].iX, this.list_middle[i].iY, 101, 0.1f*this.list_middle[i].iRate, 0.1f*this.list_middle[i].iRate, 0, -1, -1);
				if(this.list_middle[i].iSkillId==7 ||
						this.list_middle[i].iSkillId==13 ||
						this.list_middle[i].iSkillId==14 ||
						this.list_middle[i].iSkillId==24)
				{//0先地面，1天空
					DrawBuffer.gi().DrawAnimaEx(this.list_middle[i].iY-1, this.list_middle[i].iX, this.list_middle[i].iY, this.list_middle[i].aa,101,0.1*this.list_middle[i].iRate, 0.1*this.list_middle[i].iRate,0,-2,-2);
					DrawBuffer.gi().DrawAnimaEx(GmConfig.SCRH, this.list_middle[i].iX, this.list_middle[i].iY, this.list_middle[i].aa1,101,0.1*this.list_middle[i].iRate, 0.1*this.list_middle[i].iRate,0,-2,-2);
					this.list_middle[i].aa1.NextFrame();
				}
				else
				{
					DrawBuffer.gi().DrawAnimaEx(GmConfig.SCRH, this.list_middle[i].iX, this.list_middle[i].iY, this.list_middle[i].aa,101,0.1*this.list_middle[i].iRate, 0.1*this.list_middle[i].iRate,0,-2,-2);
				}
				
				if(this.list_middle[i].aa.NextFrame())
				{
					this.list_middle[i].bUseing=false;
				}
			}
		}
	}
	DrawMiddle()
	{
	}
	DrawSky()
	{
	}
}

XFightEffect.EFFECTNAME=["浩然剑气",//0
"无双剑法",//1
"幻影剑法1",//2
"凝神聚气",//3
"虎啸",//4
"先发制人",//5

"陷阱",//6
"烈焰阵",//7
"轮轴术",//8
"迷雾",//9         不用，直接结果
"奇谋",//10
"兵诡",//11      不用，直接结果

"推功过血",//12
"起死回生",//13
"练气化神",//14
"气功",//15
"知己知彼",//16
"针灸",//17

"狂暴前奏",//18
"连环刀",//19
"乱舞",//20乱舞
"定心诀",//21
"魔甲术",//22
"壁垒",//23

"火流星",//24
"毒火术",//25
"火牢",//26
"炎爆术",//27
"火甲术",//28
"火灵诀",//29

"飞箝术",//30
"凝神诀",//31
"鬼谷刀法",//32
"散势法",//33
"清心咒",//34
"鬼符",//35

"呼风",//36
"唤雨",//37
"天雷封魔",//38
"仙甲术",//39
"天神助威",//40
"灵智术前奏",//41

"天阵",//42
"地阵",//43
"五行击",//44
"五行甲",//45
"孤虚法",//46
"归元法",//47

"穿云箭爆",//48
"定天弓",//49
"驱魔符",//50
"天地同寿",//51
"灵动九天",//52
"仙绫缚",//53

"普通攻击",//54普通攻击
"暴击",//55暴击

"生死决",//56生死决

"幻影剑法2",//57
"出场烟雾",//58
"五行攻击爆炸",//59

"唤雨新",//60
"加血效果",//61
"加蓝效果",//62

"奋力一击",//63
"烈火",//64
"水箭",//65
"风刃",//66
"流沙",//67
"巫毒",//68
"招魂",//69
];
XFightEffect.MAXEFFECT=64;

XFightEffect.fe=new XFightEffect();
