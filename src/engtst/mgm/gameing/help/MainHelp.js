
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import AnimaAction from "../../../../engine/graphics/AnimaAction"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../engtst/mgm/frame/format/FormatString"
import MyAttFrame from "../../../../engtst/mgm/gameing/me/MyAttFrame"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"


export default class MainHelp extends BaseClass{
	 constructor( ani)
	{
		super();
		this.sType=["成长历程","装备大全","技能大全","宠物大全","宝石大全"];
		this.s0_levs=["0~9级","10~19级","20~29级","30~39级","40~49级"];
		this.s0_detail=[
				["1.背包中有新手大礼包，打开后获得丰厚的奖励",
				 "2.找到乡水镇铁匠，打造适合自己的装备"],
				 ["1.【为民除害任务】：【西阳城】的【西阳城守卫】 接取任务，完成后获得大量经验奖励。",
					 "2.【门派任务】：每10次任务为一轮，每天前两轮任务双倍奖励，完成任务获得大量经验铜币",
					 "3.【每日签到】：根据提示完成所有加活跃的任务，当活跃度满20以后，方可签到。奖励有强化符等商城道具，会员获得奖励更多哦。",
					 "4.【手艺任务】：【郢城】的【铁匠】接取任务，每10次为一轮，完成后获得大量经验和铜币，一轮任务后可随机获得一项手艺",
					 "5.【每日赛跑】：【临淄城】的【田忌】接取任务，完成后获得大量经验和铜币，并获得一个三级草药。前10名可额外获得商城道具奖励。",
					 "6.【师徒任务】：师徒二人组队至【临淄城】的【慎到】处领取。完成后师傅获得宠物修炼积分，徒弟获得大量经验和铜币。",
					 "7.【活动答题】：每周一至周五中午12点至1点可参与，答题可获得大量经验和储备。",
					 "8.【世界答题】：答出世界频道刷新的题目，即有机会获得丰厚的奖励。",
					 "9.【智者答题】：找到城镇中的【智者】，答对他提出的问题，有几率获得宝石奖励。"],
					 ["1.【强盗任务】：【郢城】的【栾千盛】处接取任务。10次为一轮，完成后获得大量经验和铜币。",
						 "2.【护法任务】：【咸阳】的【商鞅】处接取任务，10次为一轮，完成后获得大量的经验和铜币",
						 "3.【帮派山贼】：周一至周五13:00至13:40，打败帮派内刷出的山贼，获得大量帮贡。",
						 "4.【押镖任务】：【临淄城】的【程镖头】处接取任务，完成后获得大量铜币奖励，并有一定几率获得阵法书，还有可能获得红包（里面有200元宝哦）。",
						"5.【帮派任务】：【青龙任务】【朱雀任务】【玄武任务】，【郢城】的【帮派总管】处进入帮派，完成任务可获取大量帮贡。"],
						["1.【门派闯关】，每周四晚上8点在【咸阳】、【临淄】或者【郢城】的【门派使者】处领取任务，挑战门派护卫。每过一关都有丰厚的奖励，过关最快的队伍更有高等级宝石领取",
							"2.【山贼宝图】，山贼于每个整点在野外地图刷出，组队3人或3人以上前往挑战。战斗胜利后获得大量经验和铜币，并有一定几率获得藏宝图",
							"3.【妖怪叔叔】，可以组队3人或3人以上前往野外挑战妖怪叔叔。战斗胜利后获得大量经验和铜币，并有一定几率获得一级宝石。",
							"4.【坐骑任务】，咸阳城坐骑仙子处领取。完成后获得酷炫坐骑一只"],
							["1.【嚣张任务】：在城镇中找到嚣张， 必须5人组队才能进行战斗。战斗胜利后获得大量经验、铜钱、高级宠书、宝石等等 。",
								"2.【匈奴入侵】：每周一至周四，19:00~20:00，在长城，阴山，云蒙山，匈奴营寨，打败匈奴后获得大量经验和金钱奖励，和一些物品奖励，可能获得匈奴情报，上交还能获得奖励。",
								"3.【执法任务】：【咸阳城】的【商鞅】接取任务，10次为一轮，任务完成后可以得到1级或2级材料。",
								"4.【副本】：【咸阳】的【副本官】处创建副本，打败副本主怪可获得大量经验和副本积分，副本积分可以换取高等级装备图纸，二级材料，三级材料，宠物修炼果。",
								"5.【战队竞技】：在【咸阳】的【神威将军】处创建战队后，战队队长可以挑战比自己排名高的战队，挑战胜利可以提升战队排名。排名越靠前，战队每日声望增长越多。",
								"6.【战队秘境】：在【咸阳】的【神威将军】处，点击【战队属性】中的【战队秘境】进入秘境，击败秘境主怪可以获得不同等级的封印兽魂（兽魂用于宠物进阶）。",
								"7.【比武大会】：每周五中午12点~周六中午12点，玩家可以在【咸阳】的【比武接引人】报名，周六和周日下午13点~15点之间分别进行两场比武，比武获胜方可领取宝箱，即使失败也有其他丰厚奖励。"]
		];
		this.i0LevPoint=0;
	
		this.s1_levs=["0级装备","10级装备","20级装备","30级装备","40级装备","50级装备","60级装备","70级装备","80级装备"];
		this.s1_setids=[
				[9,	1,10,3,4,5,6,7,8],
				[47,53,59,11,19,25,31,37,13],
				[48,54,60,12,20,26,32,38,14],
				[49,55,61,43,21,27,33,39,15],
				[50,56,62,44,22,28,34,40,16],
				[51,57,63,45,23,29,35,41,17],
				[52,58,64,46,24,30,36,42,18],
				[248,249,250,244,245,251,252,253,254],
				[290,291,292,293,294,295,296,297,298,299,300,301]];
	
		this.s2_page=["门派技能","宠物技能","装备特效","装备特技","辅助技能"];
	
	
		 this.s2_sort1=["剑侠居","茅蓬坞","庐医崖","武安阁","溶洞","鬼谷","封神台","仙人洞","神女峰"];//门派技能分类
		 this.s2_skills1=[[7,8,9,10,11,13],
				[21,22,23,24,25,26],
				[34,35,36,37,38,39],
				[47,48,49,50,51,52],
				[60,61,62,63,64,65],
				[73,74,75,76,77,78],
				[86,87,88,89,90,91],
				[99,100,101,102,103,104],
				[112,113,114,115,116,117]];
	
	this.s2_sort2=["主动技能","被动技能"];//主动，被动技能
	
		 this.s2_skills2=[[192,193,194,195,196,284,206,283],
				[134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,205,209,212,215,218,221,224,276,279,282]];
		 this.s2_2ext=[
				[["烈火","以法术攻击一人","嚣张任务、交易、商店购买宠物技能包"],
					["水剑","以法术攻击二人","嚣张任务、交易、商店购买宠物技能包"],
					["风刃","以法术攻击三人","嚣张任务、交易、商店购买宠物技能包"],
					["流沙","以法术攻击单人,同时有20%几率将其困住一回合","嚣张任务、交易、商店购买宠物技能包"],
					["招魂","对处于龟息状态的怪物使用,可使其离开战场,如果目标未死亡,吸取其部分气血和魔法","嚣张任务、交易、商店购买宠物技能包"],
					["奋力一击","物理攻击技能,对目标造成110%物理伤害,忽视目标防御状态","蛮将特有技能,福缘积分兑换"],
					["生死决","物理攻击技能,70%几率造成双倍伤害,30%几率恢复其气血。消耗等级*2+30魔法","仙女特有技能,福缘积分兑换"],
					["巫毒","以法术攻击单人,并有几率降低目标物理和法术抗性持续三回合","萨满特有技能,福缘积分兑换"]],
				[["死守","低级宠物技能书：降低5%所受法术和物理伤害，同时降低5%自身法术和物理伤害#e中级宠物技能书：降低10%所受法术和物理伤害，同时降低10%自身法术和物理伤害#e高级宠物技能书：降低20%所受法术和物理伤害，同时降低20%自身法术和物理伤害，","嚣张活动、交易、商店购买宠物技能书"],
					["致命","低级宠物技能书：物理攻击时增加5%几率出现伤害结果加倍#e中级宠物技能书：物理攻击时增加10%几率出现伤害结果加倍#e高级宠物技能书：物理攻击时增加20%几率出现伤害结果加倍","嚣张活动、交易、商店购买宠物技能书"],
					["追击","低级宠物技能书：45%几率连续两次物理攻击，物理伤害降低25%#e中级宠物技能书：55%几率连续两次物理攻击，物理伤害降低25%#e高级宠物技能书：60%几率连续两次物理攻击，物理伤害降低20%","嚣张活动、交易、商店购买宠物技能书"],
					["急袭","低级宠物技能书：物理攻击效果提高5%#e中级宠物技能书：物理攻击效果提高10%#e高级宠物技能书：物理攻击效果提高20%","嚣张活动、交易、商店购买宠物技能书"],
					["嗜杀","低级宠物技能书：物理攻击伤害会在85%-115%之间波动#e中级宠物技能书：物理攻击伤害会在85%-120%之间波动#e高级宠物技能书：物理攻击伤害会在90%-120%之间波动","嚣张活动、交易、商店购买宠物技能书"],
					["吸血","低级宠物技能书：可以将物理攻击效果的10%转化为自身气血#e中级宠物技能书：可以将物理攻击效果的20%转化为自身气血#e高级宠物技能书：可以将物理攻击效果的30%转化为自身气血","嚣张活动、交易、商店购买宠物技能书"],
					["聚灵","低级宠物技能书：法术攻击时增加5%几率出现伤害结果1.5倍#e中级宠物技能书：法术攻击时增加10%几率出现伤害结果1.5倍#e高级宠物技能书：法术攻击时增加20%几率出现伤害结果1.5倍","嚣张活动、交易、商店购买宠物技能书"],
					["逆灵","低级宠物技能书：5%几率连续两次法术攻击#e中级宠物技能书：10%几率连续两次法术攻击#e高级宠物技能书：20%几率连续两次法术攻击","嚣张活动、交易、商店购买宠物技能书"],
					["灵体","低级宠物技能书：法术攻击效果提高5%#e中级宠物技能书：法术攻击效果提高10%#e高级宠物技能书：法术攻击效果提高20%","嚣张活动、交易、商店购买宠物技能书"],
					["魔魂","低级宠物技能书：法术攻击伤害会在85%-115%之间波动#e中级宠物技能书：法术攻击伤害会在85%-120%之间波动#e高级宠物技能书：法术攻击伤害会在90%-120%之间波动","嚣张活动、交易、商店购买宠物技能书"],
					["吞灵","低级宠物技能书：受到法术攻击时，有10%几率将所受法术伤害转化为气血#e中级宠物技能书：受到法术攻击时，有20%几率将所受法术伤害转化为气血#e高级宠物技能书：受到法术攻击时，有30%几率将所受法术伤害转化为气血","嚣张活动、交易、商店购买宠物技能书"],
					["隐身","低级宠物技能书：进入战斗时能隐身2-3回合，拥有此技能物理和法术伤害降低25%#e中级宠物技能书：进入战斗时能隐身3-4回合，拥有此技能物理和法术伤害降低20%#e高级宠物技能书：进入战斗时能隐身4-5回合，拥有此技能物理和法术伤害降低15%","嚣张活动、交易、商店购买宠物技能书"],
					["火眼","低级宠物技能书：能识破敌人的隐身#e中级宠物技能书：能识破敌人的隐身，同时增加10%的物理命中率#e高级宠物技能书：能识破敌人的隐身，同时增加20%的物理命中率","嚣张活动、交易、商店购买宠物技能书"],
					["反击","低级宠物技能书：受到物理攻击时有10%几率反击，反击伤害为正常伤害的50%#e中级宠物技能书：受到物理攻击时有20%几率反击，反击伤害为正常伤害的75%#e高级宠物技能书：受到物理攻击时有30%几率反击，反击伤害为正常伤害的100%","嚣张活动、交易、商店购买宠物技能书"],
					["反噬","低级宠物技能书：受到物理攻击时有20%几率反噬，反噬伤害为所受伤害的20%#e中级宠物技能书：受到物理攻击时有30%几率反噬，反噬伤害为所受伤害的30%#e高级宠物技能书：受到物理攻击时有40%几率反噬，反噬伤害为所受伤害的40%","嚣张活动、交易、商店购买宠物技能书"],
					["龟息","低级宠物技能书：战斗死亡时不会离开战场#e中级宠物技能书：战斗死亡时不会离开战场，10回合后复活#e高级宠物技能书：战斗死亡时不会离开战场，5回合后复活","嚣张活动、交易、商店购买宠物技能书"],
					["神恩","低级宠物技能书：战斗死亡时有10%几率复活，恢复50%气血#e中级宠物技能书：战斗死亡时有20%几率复活，恢复75%气血#e高级宠物技能书：战斗死亡时有30%几率复活，恢复100%气血","嚣张活动、交易、商店购买宠物技能书"],
					["凝神","低级宠物技能书：抵御封印类技能，降低30%自身物理和法术伤害#e中级宠物技能书：抵御封印类技能，降低20%自身物理和法术伤害#e高级宠物技能书：抵御封印类技能，降低10%自身物理和法术伤害","嚣张活动、交易、商店购买宠物技能书"],
					["幸运","低级宠物技能书：不会受到聚灵攻击，法术攻击能力降低5%#e中级宠物技能书：不会受到聚灵和逆灵攻击，法术攻击能力降低10%#e高级宠物技能书：不会受到聚灵和逆灵攻击，20%几率躲避法术攻击，法术攻击能力降低20%","嚣张活动、交易、商店购买宠物技能书"],
					["专注","低级宠物技能书：不会受到致命攻击，物理攻击能力降低5%#e中级宠物技能书：不会受到致命和追击攻击，物理攻击能力降低10%#e高级宠物技能书：不会受到致命和追击攻击，20%几率躲避物理攻击，物理攻击能力降低20%","嚣张活动、交易、商店购买宠物技能书"],
					["迟钝","低级宠物技能书：速度降低5%#e中级宠物技能书：速度降低10%#e高级宠物技能书：速度降低20%","嚣张活动、交易、商店购买宠物技能书"],
					["敏捷","低级宠物技能书：速度提升5%#e中级宠物技能书：速度提升10%#e高级宠物技能书：速度提升20%","嚣张活动、交易、商店购买宠物技能书"],
					["防御","低级宠物技能书：防御力增加等级*0.6，法术伤害降低20%#e中级宠物技能书：防御力增加等级*1.2，法术伤害降低15%#e高级宠物技能书：防御力增加等级*1.8，法术伤害降低10%","嚣张活动、交易、商店购买宠物技能书"],
					["巨力","低级宠物技能书：攻击力增加等级*0.5，如果对方有防御技能，伤害减少20%#e中级宠物技能书：攻击力增加等级*1，如果对方有防御技能，伤害减少20%#e高级宠物技能书：攻击力增加等级*1.5，如果对方有防御技能，伤害减少20%","嚣张活动、交易、商店购买宠物技能书"],
					["撕裂","低级宠物技能书：物理攻击时，有5%几率使对方流血不止#e中级宠物技能书：物理攻击时，有10%几率使对方流血不止#e高级宠物技能书：物理攻击时，有20%几率使对方流血不止","嚣张活动、交易、商店购买宠物技能书"],
					["冥思","低级宠物技能书：每回合结束时，自动恢复等级/4魔法#e中级宠物技能书：每回合结束时，自动恢复等级/3魔法#e高级宠物技能书：每回合结束时，自动恢复等级/1.5魔法","嚣张活动、交易、商店购买宠物技能书"],
					["自愈","低级宠物技能书：每回合结束时，自动恢复等级/2气血#e中级宠物技能书：每回合结束时，自动恢复等级/1.5气血#e高级宠物技能书：每回合结束时，自动恢复等级/1气血","嚣张活动、交易、商店购买宠物技能书"],
					["招架","低级宠物技能书：有30%的几率招架物理攻击，降低30%所受物理伤害#e中级宠物技能书：有40%的几率招架物理攻击，降低40%所受物理伤害#e高级宠物技能书：有50%的几率招架物理攻击，降低50%所受物理伤害","嚣张活动、交易、商店购买宠物技能书"],
					["噬魂","低级宠物技能书：对带有龟息术技能怪物的物理、法术伤害效果提高125%#e中级宠物技能书：对带有龟息术技能怪物的物理、法术伤害效果提高150%#e高级宠物技能书：对带有龟息术技能怪物的物理、法术伤害效果提高200%","噬魂豹特有技能、福缘积分兑换"],
					["血魄","低级宠物技能书：气血增加等级*1.2，物理伤害降低20%#e中级宠物技能书：气血增加等级*1.2，物理伤害降低15%#e高级宠物技能书：气血增加等级*3.6，物理伤害降低10%","嚣张活动、交易、商店购买宠物技能书"]]];
	
		 this.s2_skills3=[267,268,269,270,271,272,273];//特效
		 this.s2_3ext=["腰带","武器"," 项链","鞋子","鞋子","衣服","帽子"];//出现部位
	
		 this.s2_skills4=[225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266];
	
		 this.s2_skills5=[122,121,123,119,118,120,124,125];
		 this.s2_details=[
				["冶金术","学习后可以提高制作武器和项链的能力#e可在【快捷】按钮中使用,使用需消耗体力,且不同等级的锻造术消耗的体力也不同,每使用一次,会增加相应的熟练度,熟练度越高,越容易打造出好的装备。","郢城铁匠-手艺制作技巧、帮派学院-学技能 "],
				["锻造术","学习后可以提高锻造头盔和腰带的能力#e可在【快捷】按钮中使用,使用需消耗体力,且不同等级的锻造术消耗的体力也不同,每使用一次,会增加相应的熟练度,熟练度越高,越容易打造出好的装备。", "郢城铁匠-手艺制作技巧、帮派学院-学技能"],
				["裁剪术","学习后可以提高制作衣服和靴子的能力#e可在【快捷】按钮中使用,使用需消耗体力,且不同等级的锻造术消耗的体力也不同,每使用一次,会增加相应的熟练度,熟练度越高,越容易打造出好的装备", "郢城铁匠-手艺制作技巧、帮派学院-学技能"],
				["炼丹术","学习后可以提高炼丹的能力#e可在【快捷】按钮中使用,炼丹术等级越高,炼丹成功率也越高,丹药品质也越高", "郢城铁匠-手艺制作技巧、帮派学院-学技能"],
				["强身术","学习后能增加气血上限", "郢城陈子枫-辅助技能、帮派学院-学技能"],
				["烹饪","学习后可以提高制作食物的能力#e可在【快捷】按钮中使用,使用需消耗体力", "郢城陈子枫-辅助技能、帮派学院-学技能"],
				["健体","学习后能增加体力上限", "郢城陈子枫-辅助技能、帮派学院-学技能"],
				["修心","学习后能增加魔法上限", "郢城陈子枫-辅助技能、帮派学院-学技能"]];
	
		 this.s3_type=["物攻宠物","法攻宠物","辅助宠物","神兽"];
		this.s3_petids=[
				[1,10,4,7,14,6,18,20,24,22,27],
				[11,13,5,15,6,19,21,26,27],
				[3,8,9,12,2,4,5,7,14,15,6,18,19,20,21,24,22,23,25,26],
				[16,28]];
		 this.s3_details=[
				[["攻","攻","攻血","攻速","攻防","攻法血","攻血防","攻速","攻速","攻血","攻法"],
				["法","法","法血","法血","攻法血","法速","法速","法速","法血","攻法"],
				["防","速","血","血速","血","攻血","法血","攻速","攻防","法血","攻法血","攻血防","法速","攻速","法速","攻速","攻血","法防","血防","法血"],
				["攻法","攻法"]],
				[["5力","5力","5力,3耐2血","5力,4力1速","5力,3耐2血","5力,5法,3血2耐","5力,3耐2血,3血2耐","5力,2血2耐1速","5力,2耐2血1速","5力,3血2耐","5力,5法"],
				["5法","5法","5法,3血2耐","5法,3血2耐","5力,5法,3血2耐","5法,2血2耐1速","5法,2血2耐1速","5法,3血2耐","5力,5法"],
				["4耐1血","3敏2耐","3血2耐","3耐2血,3速2血","3血2耐","5力,3耐2血","5法,3血2耐","5力,4力1速","5力,3耐2血","5法,3血2耐","5力,5法,3血2耐","5力,3耐2血,3血2耐","5法,2血2耐1速","5力,2血2耐1速","5法,2血2耐1速","5力,2耐2血1速","5力,3血2耐","5法,3耐2血","3血2耐,3耐2血","5法,3血2耐"],
				["5力,5法","5力,5法"]],
				[["郊外、西阳山道抓获，交易","大禹水道、平原山陵抓获，交易","云蒙山、烈焰峰抓获，交易","函谷关、长城抓获，交易","长城、阴山抓获，交易","阴山抓获，交易","地下藏宝洞一层、地下藏宝洞二层抓获，交易","古战场抓获，交易","古战场抓获，交易","匈奴营寨、古战场抓获，交易","蜀山抓获，交易"],
				["平原山陵、巫山抓获，交易","巫山抓获，交易","烈焰峰、函谷关抓获，交易","阴山、地下藏宝洞一层抓获，交易","阴山抓获，交易","地下藏宝洞二层抓获，交易","匈奴营寨抓获，交易","蜀山抓获，交易","蜀山抓获，交易"],
				["乡水镇郊抓获，交易","西阳山道、渡口抓获，交易","渡口、大禹水道抓获，交易","巫山、太行山抓获，交易","太行山、云蒙山抓获，交易","云蒙山、烈焰峰抓获，交易","烈焰峰、函谷关抓获，交易","函谷关、长城抓获，交易","长城、阴山抓获，交易","阴山、地下藏宝洞一层抓获，交易","阴山抓获，交易","地下藏宝洞一层、地下藏宝洞二层抓获，交易","地下藏宝洞二层抓取，交易","古战场抓获，交易","匈奴营寨抓获，交易","古战场抓获，交易","匈奴营寨、古战场抓获，交易","泰山抓获，交易","泰山、蜀山抓获，交易","蜀山抓获，交易"],
				["神兽抽奖活动、新区充值活动、福袋兑换","神兽抽奖活动"]]];
	
		this.i4_ids=[103,105,104,101,102];
		this.s4_detail=["基础属性：1级宝石，血量+40#e升级效果：每升一级血量+40，宝石等级没有上限#e镶嵌部位：衣服，腰带#e合成宝石有概率失败，失败后损失一颗宝石#e郢城铁匠处进行宝石合成和镶嵌操作",
		"基础属性：1级宝石，灵力+6#e升级效果：每升一级灵力+6，宝石等级没有上限#e镶嵌部位：项链，鞋子#e合成宝石有概率失败，失败后损失一颗宝石#e郢城铁匠处进行宝石合成和镶嵌操作",
		"基础属性：1级宝石，速度+8#e升级效果：每升一级速度+8，宝石等级没有上限#e镶嵌部位：腰带，靴子#e合成宝石有概率失败，失败后损失一颗宝石#e郢城铁匠处进行宝石合成和镶嵌操作",
		"基础属性：1级宝石，攻击力+8#e升级效果：每升一级攻击力+8，宝石等级没有上限#e镶嵌部位：武器，头盔#e合成宝石有概率失败，失败后损失一颗宝石#e郢城铁匠处进行宝石合成和镶嵌操作",
		"基础属性：1级宝石，防御+12#e升级效果：每升一级防御+12，宝石等级没有上限#e镶嵌部位：衣服，头盔#e合成宝石有概率失败，失败后损失一颗宝石#e郢城铁匠处进行宝石合成和镶嵌操作"];
		
		var i;
		
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=950;
		this.iH=550;
		this.iX=(GmConfig.SCRW-this.iW)/2+50;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		this.btn_close=new XButtonEx2(GmPlay.xani_nui2);
		this.btn_close.InitButton("关闭按钮");
		this.btn_close.Move(this.iX+this.iW-35, this.iY-25, 60, 60);
		
		this.btn_type=new Array(5);//
		
		for(i=0;i<5;i++)
		{
			this.btn_type[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn_type[i].Move(this.iX-100+1, this.iY+40+i*90, 110, 90);
			this.btn_type[i].InitButton(this.sType[i]);
		}
		this.iTypePoint=0;
		
		this.Init_0();
		this.Init_1();
		this.Init_2();
		this.Init_3();
		this.Init_4();
	}
	Draw()
	{
		var i;
		
		for(i=0;i<5;i++)
		{
			this.btn_type[i].Draw();
			// this.pm3f.DrawText_2(this.btn_type[i].iX+54, this.btn_type[i].iY+68, this.sType[i], 0xff006400, 22, 101, 1, 1, 0, -2, -2, 4, 0xff034031);
			// this.pm3f.DrawText_2(this.btn_type[i].iX+54, this.btn_type[i].iY+68, this.sType[i], 0xff408040, 22, 101, 1, 1, 0, -2, -2, 4, 0xff034031);
			this.pm3f.DrawText_2(this.btn_type[i].iX+54, this.btn_type[i].iY+68, this.sType[i], 0xff000000, 22, 101, 1, 1, 0, -2, -2, 4, 0xff000000);
		}
		DrawMode.new_bigframe(this.iX, this.iY, this.iW, this.iH);
		i=this.iTypePoint;
		GmPlay.xani_nui5.DrawAnima_aa(this.btn_type[i].iX,this.btn_type[i].iY, this.sType[i],1);
		//this.pm3f.DrawText_2(this.btn_type[i].iX+54, this.btn_type[i].iY+68, this.sType[i], 0xffff0000, 24, 101, 1, 1, 0, -2, -2, 4, 0xff034031);
		this.pm3f.DrawText_2(this.btn_type[i].iX+54, this.btn_type[i].iY+68, this.sType[i], 0xffffffff, 24, 101, 1, 1, 0, -2, -2, 4, 0xff000000);
//		DrawMode.new_framein(this.iX+25, this.iY+25, this.iW-50, this.iH-50);

		
		this.bScorlling=false;
		switch(this.iTypePoint)
		{
		case 0://成长历程
			M3DFast.gi().FillRect_2D(this.iX+25, this.iY+25, this.iX+this.iW-25, this.iY+this.iH-25 , 0x807eb6a6);
			this.DrawPublicFrame(this.iX+25, this.iY+25, this.iW-50, this.iH-50,this.aa_f4,20,20);
			this.Draw_0();
			break;
		case 1://装备大全
			M3DFast.gi().FillRect_2D(this.iX+25, this.iY+25, this.iX+this.iW-25, this.iY+this.iH-25 , 0x807eb6a6);
			this.DrawPublicFrame(this.iX+25, this.iY+25, this.iW-50, this.iH-50,this.aa_f4,20,20);
			this.Draw_1();
			break;
		case 2://技能大全
			this.Draw_2();
			break;
		case 3://宠物大全
			M3DFast.gi().FillRect_2D(this.iX+25, this.iY+25, this.iX+this.iW-25, this.iY+this.iH-25 , 0x807eb6a6);
			this.DrawPublicFrame(this.iX+25, this.iY+25, this.iW-50, this.iH-50,this.aa_f4,20,20);
			this.Draw_3();
			break;
		case 4://宝石大全
			this.Draw_4();
			break;
		}
		this.btn_close.Draw();
	}

	 Init_0()
	{
		var i;
		this.btn0_levs=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.btn0_levs[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn0_levs[i].Move(this.iX+50, this.iY+50+i*65, 146, 57);
			this.btn0_levs[i].InitButton("新大按钮");
			this.btn0_levs[i].sName=this.s0_levs[i];
		}
		this.aa_f1=GmPlay.xani_frame.InitAnimaWithName("单色内框a20_20", null);
		this.aa_f2=GmPlay.xani_frame.InitAnimaWithName("单色内框b20_20", null);
//		this.aa_f1=GmPlay.xani_nui5.InitAnimaWithName("内框1", null);
//		this.aa_f2=GmPlay.xani_nui5.InitAnimaWithName("内框2", null);
		this.aa_f3=GmPlay.xani_nui5.InitAnimaWithName("内框3", null);
		this.aa_f4=GmPlay.xani_nui5.InitAnimaWithName("内框4", null);
		this.i0LevPoint=0;
	}

	 Draw_0()
	{//成长历程_fd._fontName = "fonts/msyh.ttf";
		var i,offx,offy;
		
		for(i=0;i<5;i++)
		{
			if(this.i0LevPoint==i)
			{
				this.btn0_levs[i].bMouseDown=true;
			}
			this.btn0_levs[i].Draw();
		}
		
		this.DrawPublicFrame(this.iX+220,this.iY+50,680,450,this.aa_f1,20,20);
		
		this.iSRX=this.iX+220+20;
		this.iSRY=this.iY+50+20;
		this.iSRW=680-40;
		this.iSRH=450-40;
		this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
		this.iSHeight=this.s0_detail[this.i0LevPoint].length*94;
		this.bScorlling=true;
		for(i=0;i<this.s0_detail[this.i0LevPoint].length;i++)
		{
			offx=this.iX+220+20;
			offy=this.iY+50+20+94*i-this.iSOffY;
			if(offy+94<this.iY+50 || offy>this.iY+50+450)continue;
			this.DrawPublicFrame(offx,offy,640,90,this.aa_f2,20,20);
			GmPlay.xani_nui5.DrawAnima_aa(offx+10,offy+5, this.s0_levs[this.i0LevPoint], i);
			FormatString.gi().Format(this.s0_detail[this.i0LevPoint][i], 500, 20);
			FormatString.gi().Draw(offx+110, offy+90/2-FormatString.gi().iH/2);
		}
		this.pm3f.NoClip();
	}
	/////////////////////////////----------------------1---------------------------------------------



	 Init_1()
	{
		var i;
		this.i1LevPoint=0;
		this.bChangeLev=false;
		this.btn1_clev=new XButtonEx2(GmPlay.xani_nui5);
		this.btn1_clev.Move(this.iX+170, this.iY+50, 109, 61);
		this.btn1_clev.InitButton("新中按钮");
		this.btn1_clev.sName=this.s1_levs[0];
		this.btn1_clev.iNameSize=20;
		this.btn1_levs=new Array(9);//
		for(i=0;i<9;i++)
		{
			this.btn1_levs[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn1_levs[i].Move(this.iX+170+(i%3)*(109+5), this.iY+50+parseInt(i/3)*(61+5), 109, 61);
			this.btn1_levs[i].InitButton("新中按钮");
			this.btn1_levs[i].sName=this.s1_levs[i];
			this.btn1_levs[i].iNameSize=20;
		}
		this.btn1_sets=new Array(12);//
		for(i=0;i<12;i++)
		{
			this.btn1_sets[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn1_sets[i].InitButton("最大按钮");
		}
		this.i1SetPoint=0;
	}
	 Draw_1()
	{
		var i,j,k,offx,offy;

//		this.DrawPublicFrame(this.iX+50,this.iY+130,236,380,this.aa_f1,20,20);
		this.iSRX=this.iX+50;
		this.iSRY=this.iY+130;
		this.iSRW=236;
		this.iSRH=380;
		this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
		this.iSHeight=this.s1_setids[this.i1LevPoint].length*(87+5);
		this.bScorlling=true;
		for(i=0;i<this.s1_setids[this.i1LevPoint].length;i++)
		{
			offx=this.iX+50;
			offy=this.iY+130+(87+5)*i-this.iSOffY;
			this.btn1_sets[i].Move(offx,offy, 236, 87);
			if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
			if(this.i1SetPoint==i)this.btn1_sets[i].bMouseDown=true;
			this.btn1_sets[i].Draw();
			GmPlay.xani_nui3.DrawAnima(offx+4,offy+3, "物品格子", 0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+4,offy+3, GmPlay.de_goods.strValue(this.s1_setids[this.i1LevPoint][i], 0, 10), 0);
			this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_goods.strValue(this.s1_setids[this.i1LevPoint][i], 0, 4), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		}
		this.pm3f.NoClip();
		this.DrawPublicFrame(this.iX+290,this.iY+45,610,460,this.aa_f1,20,20);
		
		offx=this.iX+290;
		offy=this.iY+45;
		GmPlay.xani_nui3.DrawAnima(offx+15,offy+15, "物品格子", 0);
		GmPlay.xani_ngoods.DrawAnima_aa(offx+15,offy+15, GmPlay.de_goods.strValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], 0, 10), 0);
		this.pm3f.DrawTextEx(offx+110,offy+15+80/2, GmPlay.de_goods.strValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], 0, 4), 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
		GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+15+80+15, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
		offy+=15+80+15+15;
		var str="未知";
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 16);//类型
		j=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 19);//种族
		k=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 20);//性别
		if(i==0)str="头盔";
		else if(i==1)str="饰品";
		else if(i==2)
		{
			if(j==0)str="剑";
			else if(j==1)str="刀";
			else if(j==2)str="枪";
		}
		else if(i==3)
		{
			if(k==0)str="女衣";
			else str="铠甲";
		}
		else if(i==4)str="腰带";
		else if(i==5)str="鞋子";
		str="类型："+str;
		var gap=31,wsize=25;
		this.pm3f.DrawTextEx(offx+15,offy, str, 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
		offy+=gap;
		this.pm3f.DrawTextEx(offx+15,offy, "基础属性范围：", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
		offy+=gap;
		j=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 9);
		this.pm3f.DrawTextEx(offx+15,offy, "等级："+j, 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
		offy+=gap;
		
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 21);
		if(i>0)
		{
			this.pm3f.DrawTextEx(offx+15,offy, "防御：+"+i+"~"+(i*2)+"（图纸打造+"+(i*11/10)+"~"+(i*11/5)+"）", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
			offy+=gap;
		}
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 22);
		if(i>0)
		{
			this.pm3f.DrawTextEx(offx+15,offy, "魔法：+"+i+"~"+(i*2)+"（图纸打造+"+(i*11/10)+"~"+(i*11/5)+"）", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
			offy+=gap;
		}
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 23);
		if(i>0)
		{
			this.pm3f.DrawTextEx(offx+15,offy, "灵力：+"+i+"~"+(i*2)+"（图纸打造+"+(i*11/10)+"~"+(i*11/5)+"）", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
			offy+=gap;
		}
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 24);
		if(i>0)
		{
			this.pm3f.DrawTextEx(offx+15,offy, "气血：+"+i+"~"+(i*2)+"（图纸打造+"+(i*11/10)+"~"+(i*11/5)+"）", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
			offy+=gap;
		}
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 25);
		if(i>0)
		{
			this.pm3f.DrawTextEx(offx+15,offy, "速度：+"+i+"~"+(i*2)+"（图纸打造+"+(i*11/10)+"~"+(i*11/5)+"）", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
			offy+=gap;
		}
		i=GmPlay.de_goods.intValue(this.s1_setids[this.i1LevPoint][this.i1SetPoint], -1, 3);
		if(i>0)
		{
			this.pm3f.DrawTextEx(offx+15,offy, "攻击：+"+i+"~"+(i*2)+"（图纸打造+"+(i*11/10)+"~"+(i*11/5)+"）", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
			offy+=gap;
		}
		k=j*5+100;
		this.pm3f.DrawTextEx(offx+15,offy, "耐久度："+k+"/"+k, 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
		
		offy=this.iY+this.iH-150;
		this.pm3f.DrawTextEx(offx+15,offy-20-15, "【郢城】【铁匠】处强化装备，可提升装备属性", 0xff000000, wsize, 101, 1, 1, 0, 0, 0);
		GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
		offy+=10;
		this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		offy+=20+10;
		this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
		if(j==0)this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，乡水镇装备店购买，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		else if(j==10)this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，西阳城装备店购买，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		else if(j==20)this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，郢城装备店购买，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		else if(j==30)this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，临淄装备店购买，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		else if(j==40)this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，咸阳装备店购买，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		else if(j==50 || j==60)this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，挖宝，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		else this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		
		//////////////////////
		
		this.pm3f.DrawTextEx(this.btn1_clev.iX-120, this.btn1_clev.iY+61/2, "选择等级", 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		this.DrawPublicFrame(this.btn1_clev.iX-5,this.btn1_clev.iY-5,(109)*1+10,(61)*1+10,this.aa_f3,20,20);
		this.btn1_clev.sName=this.s1_levs[this.i1LevPoint];
		this.btn1_clev.Draw();
		if(this.bChangeLev)
		{
			this.DrawPublicFrame(this.btn1_clev.iX-5,this.btn1_clev.iY-5,(109+5)*3+5,(61+5)*3+5,this.aa_f3,20,20);
			for(i=0;i<9;i++)this.btn1_levs[i].Draw();
		}
	}
	///////////////-----------------------------2--------------------------------------------------


	 
	 Init_2()
	{
		var i;
		this.btn2_page=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.btn2_page[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn2_page[i].Move(this.iX+230+130*i, this.iY+20, 130, 44);
			this.btn2_page[i].InitButton("标签按钮");
			this.btn2_page[i].sName=this.s2_page[i];
			this.btn2_page[i].iNameSize=20;
		}
		this.i2PagePoint=0;
		
		this.btn2_cschool=new XButtonEx2(GmPlay.xani_nui5);
		this.btn2_cschool.Move(this.iX+170, this.iY+80, 109, 61);
		this.btn2_cschool.InitButton("新中按钮");
		this.btn2_cschool.sName=this.s2_sort1[0];
		this.btn2_cschool.iNameSize=20;
		this.i2SchoolPoint=0;
		this.btn2_schools=new Array(9);//
		for(i=0;i<9;i++)
		{
			this.btn2_schools[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn2_schools[i].Move(this.iX+170+(i%3)*(109+5), this.iY+80+parseInt(i/3)*(61+5), 109, 61);
			this.btn2_schools[i].InitButton("新中按钮");
			this.btn2_schools[i].sName=this.s2_sort1[i];
			this.btn2_schools[i].iNameSize=20;
		}
		this.bChangeSchool=false;
		
		this.btn2_czb=new XButtonEx2(GmPlay.xani_nui5);
		this.btn2_czb.Move(this.iX+170, this.iY+80, 109, 61);
		this.btn2_czb.InitButton("新中按钮");
		this.btn2_czb.sName=this.s2_sort1[0];
		this.btn2_czb.iNameSize=20;
		this.i2ZbPoint=0;
		this.btn2_zbs=new Array(9);//
		for(i=0;i<2;i++)
		{
			this.btn2_zbs[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn2_zbs[i].Move(this.iX+170+(i%3)*(109+5), this.iY+80+parseInt(i/3)*(61+5), 109, 61);
			this.btn2_zbs[i].InitButton("新中按钮");
			this.btn2_zbs[i].sName=this.s2_sort2[i];
			this.btn2_zbs[i].iNameSize=20;
		}
		this.bChangeZb=false;
		
		this.btn2_jnlist=new Array(64);//
		for(i=0;i<64;i++)
		{
			this.btn2_jnlist[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn2_jnlist[i].InitButton("最大按钮");
		}
		this.i2SkillPoint=0;
	}
	 Draw_2()
	{//技能大全
		var i,offx,offy;
		for(i=0;i<5;i++)this.btn2_page[i].Draw();
//		M3DFast.gi().FillRect_2D(this.iX+25, this.iY+20+35, this.iX+this.iW-25, this.iY+this.iH-25 , 0x807eb6a6);
		offx=this.iX+25;
		offy=this.iY+20+35;
		// this.aa_f4.iFrame=9;this.aa_f4.DrawEx(offx,offy, 101, 1.0*(this.iW-50)/20, 1.0*(this.iH-20-35-25)/20, 0, -1, -1);
		this.DrawPublicFrame(offx,offy, this.iW-50, this.iH-20-35-25,this.aa_f4,20,20);
		i=this.i2PagePoint;
		this.btn2_page[i].bMouseDown=true;
		this.btn2_page[i].Draw();
		
		switch(this.i2PagePoint)
		{
		case 0://门派技能
			this.iSRX=this.iX+50;
			this.iSRY=this.iY+160;
			this.iSRW=236;
			this.iSRH=350;
			this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
			this.iSHeight=this.s2_skills1[this.i2SchoolPoint].length*(87+5);
			this.bScorlling=true;
			for(i=0;i<this.s2_skills1[this.i2SchoolPoint].length;i++)
			{
				offx=this.iX+50;
				offy=this.iY+160+(87+5)*i-this.iSOffY;
				this.btn2_jnlist[i].Move(offx,offy, 236, 87);
				if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
				if(this.i2SkillPoint==i)this.btn2_jnlist[i].bMouseDown=true;
				this.btn2_jnlist[i].Draw();
				GmPlay.xani_nui2.DrawAnimaEx(offx+4+6,offy+3+7, "技能框", 0,101,0.85,0.85,0,0,0);
				GmPlay.xani_nicon.DrawAnimaEx(offx+4+6,offy+3+7, GmPlay.de_skill.strValue(this.s2_skills1[this.i2SchoolPoint][i], 0, 5), 0,101,0.85,0.85,0,0,0);
				this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_skill.strValue(this.s2_skills1[this.i2SchoolPoint][i], 0, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			}
			this.pm3f.NoClip();
			
			i=this.i2SkillPoint;
			offx=this.iX+290;
			offy=this.iY+75;
			this.DrawPublicFrame(offx,offy, 610,430,this.aa_f1,20,20);
			GmPlay.xani_nui2.DrawAnimaEx(offx+20,offy+20, "技能框", 0,101,1,1,0,0,0);
			GmPlay.xani_nicon.DrawAnimaEx(offx+20,offy+20, GmPlay.de_skill.strValue(this.s2_skills1[this.i2SchoolPoint][i], 0, 5), 0,101,1,1,0,0,0);
			this.pm3f.DrawTextEx(offx+120,offy+20+40, GmPlay.de_skill.strValue(this.s2_skills1[this.i2SchoolPoint][i], 0, 6), 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+20+80+20, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			
			this.pm3f.DrawTextEx(offx+20,offy+20+80+20+20, "技能描述：", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
			FormatString.gi().FormatEx("#c000000"+GmPlay.de_skill.strValue(this.s2_skills1[this.i2SchoolPoint][i], 0, 3), 570, 25, 0, 0, 40);
			FormatString.gi().Draw(offx+20, offy+20+80+20+40);
			
			offy=this.iY+this.iH-150;
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			offy+=10;
			this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			offy+=20+10;
			this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
			this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "使用遁地术回门派学习", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			
			this.pm3f.DrawTextEx(this.btn2_cschool.iX-120, this.btn2_cschool.iY+61/2, "选择门派", 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			this.DrawPublicFrame(this.btn2_cschool.iX-5,this.btn2_cschool.iY-5,(109)*1+10,(61)*1+10,this.aa_f3,20,20);
			this.btn2_cschool.sName=this.s2_sort1[this.i2SchoolPoint];
			this.btn2_cschool.Draw();
			if(this.bChangeSchool)
			{
				this.DrawPublicFrame(this.btn2_cschool.iX-5,this.btn2_cschool.iY-5,(109+5)*3+5,(61+5)*3+5,this.aa_f3,20,20);
				for(i=0;i<9;i++)this.btn2_schools[i].Draw();
			}
			break;
		case 1://宠物技能
			this.iSRX=this.iX+50;
			this.iSRY=this.iY+160;
			this.iSRW=236;
			this.iSRH=350;
			this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
			this.iSHeight=this.s2_skills2[this.i2ZbPoint].length*(87+5);
			this.bScorlling=true;
			for(i=0;i<this.s2_skills2[this.i2ZbPoint].length;i++)
			{
				offx=this.iX+50;
				offy=this.iY+160+(87+5)*i-this.iSOffY;
				this.btn2_jnlist[i].Move(offx,offy, 236, 87);
				if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
				if(this.i2SkillPoint==i)this.btn2_jnlist[i].bMouseDown=true;
				this.btn2_jnlist[i].Draw();
				GmPlay.xani_nui2.DrawAnimaEx(offx+4+6,offy+3+7, "技能框", 0,101,0.85,0.85,0,0,0);
				GmPlay.xani_nicon.DrawAnimaEx(offx+4+6,offy+3+7, GmPlay.de_skill.strValue(this.s2_skills2[this.i2ZbPoint][i], 0, 5), 0,101,0.85,0.85,0,0,0);
				this.pm3f.DrawTextEx(offx+100,offy+87/2, this.s2_2ext[this.i2ZbPoint][i][0], 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			}
			this.pm3f.NoClip();
			
			i=this.i2SkillPoint;
			offx=this.iX+290;
			offy=this.iY+75;
			this.DrawPublicFrame(offx,offy, 610,430,this.aa_f1,20,20);
			GmPlay.xani_nui2.DrawAnimaEx(offx+20,offy+20, "技能框", 0,101,1,1,0,0,0);
			GmPlay.xani_nicon.DrawAnimaEx(offx+20,offy+20, GmPlay.de_skill.strValue(this.s2_skills2[this.i2ZbPoint][i], 0, 5), 0,101,1,1,0,0,0);
			this.pm3f.DrawTextEx(offx+120,offy+20+80/2, this.s2_2ext[this.i2ZbPoint][i][0], 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+20+80+20, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			
			offy+=20+80+20+10;
			FormatString.gi().FormatEx("#c000000"+this.s2_2ext[this.i2ZbPoint][i][1], 570, 25, 0, 0, 30);
			FormatString.gi().Draw(offx+20, offy);
			
			offy=this.iY+this.iH-150;
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			offy+=10;
			this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			offy+=20+10;
			this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
			this.pm3f.DrawTextEx(offx+15+580/2,offy+25, this.s2_2ext[this.i2ZbPoint][i][2], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			
			this.pm3f.DrawTextEx(this.btn2_czb.iX-120, this.btn2_czb.iY+61/2, "选择分类", 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			this.DrawPublicFrame(this.btn2_czb.iX-5,this.btn2_czb.iY-5,(109)*1+10,(61)*1+10,this.aa_f3,20,20);
			this.btn2_czb.sName=this.s2_sort2[this.i2ZbPoint];
			this.btn2_czb.Draw();
			if(this.bChangeZb)
			{
				this.DrawPublicFrame(this.btn2_czb.iX-5,this.btn2_czb.iY-5,(109+5)*2+5,(61+5)*1+5,this.aa_f3,20,20);
				for(i=0;i<2;i++)this.btn2_zbs[i].Draw();
			}
			break;
		case 2://装备特效
			this.iSRX=this.iX+50;
			this.iSRY=this.iY+80;
			this.iSRW=236;
			this.iSRH=430;
			this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
			this.iSHeight=this.s2_skills3.length*(87+5);
			this.bScorlling=true;
			for(i=0;i<this.s2_skills3.length;i++)
			{
				offx=this.iX+50;
				offy=this.iY+80+(87+5)*i-this.iSOffY;
				this.btn2_jnlist[i].Move(offx,offy, 236, 87);
				if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
				if(this.i2SkillPoint==i)this.btn2_jnlist[i].bMouseDown=true;
				this.btn2_jnlist[i].Draw();
				GmPlay.xani_nui2.DrawAnimaEx(offx+4+6,offy+3+7, "技能框", 0,101,0.85,0.85,0,0,0);
				GmPlay.xani_nicon.DrawAnimaEx(offx+4+6,offy+3+7, GmPlay.de_skill.strValue(this.s2_skills3[i], 0, 5), 0,101,0.85,0.85,0,0,0);
				this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_skill.strValue(this.s2_skills3[i], 0, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			}
			this.pm3f.NoClip();
			
			i=this.i2SkillPoint;
			offx=this.iX+290;
			offy=this.iY+75;
			this.DrawPublicFrame(offx,offy, 610,430,this.aa_f1,20,20);
			GmPlay.xani_nui2.DrawAnimaEx(offx+20,offy+20, "技能框", 0,101,1,1,0,0,0);
			GmPlay.xani_nicon.DrawAnimaEx(offx+20,offy+20, GmPlay.de_skill.strValue(this.s2_skills3[i], 0, 5), 0,101,1,1,0,0,0);
			this.pm3f.DrawTextEx(offx+120,offy+20+40, GmPlay.de_skill.strValue(this.s2_skills3[i], 0, 6), 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+20+80+20, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			
			offy+=20+80+20+20;
			this.pm3f.DrawTextEx(offx+20,offy, "对应装备："+this.s2_3ext[i], 0xff000000, 25, 101, 1, 1, 0, 0, 0);
			offy+=40;
			this.pm3f.DrawTextEx(offx+20,offy, "技能描述：", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
			offy+=20;
			FormatString.gi().FormatEx("#c000000"+GmPlay.de_skill.strValue(this.s2_skills3[i], 0, 3), 570, 25, 0, 0, 40);
			FormatString.gi().Draw(offx+20, offy);
			
			offy=this.iY+this.iH-150;
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			offy+=10;
			this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			offy+=20+10;
			this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
			this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			break;
		case 3://装备特技
			this.iSRX=this.iX+50;
			this.iSRY=this.iY+80;
			this.iSRW=236;
			this.iSRH=430;
			this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
			this.iSHeight=this.s2_skills4.length*(87+5);
			this.bScorlling=true;
			for(i=0;i<this.s2_skills4.length;i++)
			{
				offx=this.iX+50;
				offy=this.iY+80+(87+5)*i-this.iSOffY;
				this.btn2_jnlist[i].Move(offx,offy, 236, 87);
				if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
				if(this.i2SkillPoint==i)this.btn2_jnlist[i].bMouseDown=true;
				this.btn2_jnlist[i].Draw();
				GmPlay.xani_nui2.DrawAnimaEx(offx+4+6,offy+3+7, "技能框", 0,101,0.85,0.85,0,0,0);
				GmPlay.xani_nicon.DrawAnimaEx(offx+4+6,offy+3+7, GmPlay.de_skill.strValue(this.s2_skills4[i], 0, 5), 0,101,0.85,0.85,0,0,0);
				this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_skill.strValue(this.s2_skills4[i], 0, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			}
			this.pm3f.NoClip();
			
			i=this.i2SkillPoint;
			offx=this.iX+290;
			offy=this.iY+75;
			this.DrawPublicFrame(offx,offy, 610,430,this.aa_f1,20,20);
			GmPlay.xani_nui2.DrawAnimaEx(offx+20,offy+20, "技能框", 0,101,1,1,0,0,0);
			GmPlay.xani_nicon.DrawAnimaEx(offx+20,offy+20, GmPlay.de_skill.strValue(this.s2_skills4[i], 0, 5), 0,101,1,1,0,0,0);
			this.pm3f.DrawTextEx(offx+120,offy+20+40, GmPlay.de_skill.strValue(this.s2_skills4[i], 0, 6), 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+20+80+20, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			
			offy+=20+80+20+20;
			this.pm3f.DrawTextEx(offx+20,offy, "消耗愤怒："+GmPlay.de_skill.strValue(this.s2_skills4[i], 0, 35), 0xff000000, 25, 101, 1, 1, 0, 0, 0);
			offy+=40;
			this.pm3f.DrawTextEx(offx+20,offy, "技能描述：", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
			offy+=20;
			FormatString.gi().FormatEx("#c000000"+GmPlay.de_skill.strValue(this.s2_skills4[i], 0, 3), 570, 25, 0, 0, 40);
			FormatString.gi().Draw(offx+20, offy);
			
			offy=this.iY+this.iH-150;
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			offy+=10;
			this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			offy+=20+10;
			this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
			this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "装备打造", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			break;
		case 4://辅助技能
			this.iSRX=this.iX+50;
			this.iSRY=this.iY+80;
			this.iSRW=236;
			this.iSRH=430;
			this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
			this.iSHeight=this.s2_skills5.length*(87+5);
			this.bScorlling=true;
			for(i=0;i<this.s2_skills5.length;i++)
			{
				offx=this.iX+50;
				offy=this.iY+80+(87+5)*i-this.iSOffY;
				this.btn2_jnlist[i].Move(offx,offy, 236, 87);
				if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
				if(this.i2SkillPoint==i)this.btn2_jnlist[i].bMouseDown=true;
				this.btn2_jnlist[i].Draw();
				GmPlay.xani_nui2.DrawAnimaEx(offx+4+6,offy+3+7, "技能框", 0,101,0.85,0.85,0,0,0);
				GmPlay.xani_nicon.DrawAnimaEx(offx+4+6,offy+3+7, GmPlay.de_skill.strValue(this.s2_skills5[i], 0, 5), 0,101,0.85,0.85,0,0,0);
				this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_skill.strValue(this.s2_skills5[i], 0, 6), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
			}
			this.pm3f.NoClip();
			
			i=this.i2SkillPoint;
			offx=this.iX+290;
			offy=this.iY+75;
			this.DrawPublicFrame(offx,offy, 610,430,this.aa_f1,20,20);
			GmPlay.xani_nui2.DrawAnimaEx(offx+20,offy+20, "技能框", 0,101,1,1,0,0,0);
			GmPlay.xani_nicon.DrawAnimaEx(offx+20,offy+20, GmPlay.de_skill.strValue(this.s2_skills5[i], 0, 5), 0,101,1,1,0,0,0);
			this.pm3f.DrawTextEx(offx+120,offy+20+40, GmPlay.de_skill.strValue(this.s2_skills5[i], 0, 6), 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+20+80+20, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			
			offy+=20+80+20+20;
			this.pm3f.DrawTextEx(offx+20,offy, "技能描述：", 0xff000000, 25, 101, 1, 1, 0, 0, 0);
			offy+=20;
			FormatString.gi().FormatEx("#c000000"+this.s2_details[i][1], 570, 25, 0, 0, 40);
			FormatString.gi().Draw(offx+20, offy);
			
			offy=this.iY+this.iH-150;
			GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
			offy+=10;
			this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
			offy+=20+10;
			this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
			this.pm3f.DrawTextEx(offx+15+580/2,offy+25, this.s2_details[i][2], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
			break;
		}
	}
	/////////////////------------------------------------------3---宠物-------------------------


	
	 Init_3()
	{
		var i;
		this.i3Type=0;
		this.bChangePT=false;
		this.btn3_cpt=new XButtonEx2(GmPlay.xani_nui5);
		this.btn3_cpt.Move(this.iX+170, this.iY+50, 109, 61);
		this.btn3_cpt.InitButton("新中按钮");
		this.btn3_cpt.sName=this.s3_type[0];
		this.btn3_cpt.iNameSize=20;
		this.btn3_pts=new Array(4);//
		for(i=0;i<4;i++)
		{
			this.btn3_pts[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn3_pts[i].Move(this.iX+170+(i%2)*(109+5), this.iY+50+parseInt(i/2)*(61+5), 109, 61);
			this.btn3_pts[i].InitButton("新中按钮");
			this.btn3_pts[i].sName=this.s3_type[i];
			this.btn3_pts[i].iNameSize=20;
		}
		this.btn3_pets=new Array(36);//
		for(i=0;i<36;i++)
		{
			this.btn3_pets[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn3_pets[i].InitButton("最大按钮");
		}
		this.i3PetPoint=0;
		this.btn3_skills=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.btn3_skills[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn3_skills[i].bSingleButton=true;
//			this.btn3_skills[i].SetCheckRect(x, y, w, h)
		}
		this.i3ShowSkillDetail=-1;
	}
	 Draw_3()
	{
		var i,j,k,offx,offy;
		this.iSRX=this.iX+50;
		this.iSRY=this.iY+130;
		this.iSRW=236;
		this.iSRH=380;
		this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
		this.iSHeight=this.s3_petids[this.i3Type].length*(87+5);
		this.bScorlling=true;
		for(i=0;i<this.s3_petids[this.i3Type].length;i++)
		{
			offx=this.iX+50;
			offy=this.iY+130+(87+5)*i-this.iSOffY;
			this.btn3_pets[i].Move(offx,offy, 236, 87);
			if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
			if(this.i3PetPoint==i)this.btn3_pets[i].bMouseDown=true;
			this.btn3_pets[i].Draw();
			GmPlay.xani_nui2.DrawAnima(offx+7,offy+5, "宠物头像框",0);
			GmPlay.xani_head.DrawAnima_aa(offx+7,offy+5,GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][i], 0, 1),0);
			this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][i], 0, 1), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		}
		this.pm3f.NoClip();
		this.DrawPublicFrame(this.iX+290,this.iY+45,610,460,this.aa_f1,20,20);
		
		offx=this.iX+290;
		offy=this.iY+45;
		this.DrawPublicFrame(offx+15,offy+15,130,180,this.aa_f2,20,20);
		this.pm3f.DrawTextEx(offx+15+130/2,offy+15+20, GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 1), 0xff000000, 20, 101, 1, 1, 0, -2, -2);
		GmPlay.xani_nui2.DrawAnima(offx+15+130/2-80/2,offy+15+40, "宠物头像框",0);
		GmPlay.xani_head.DrawAnima_aa(offx+15+130/2-80/2,offy+15+40, GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 1), 0);
		this.pm3f.DrawTextEx(offx+15+130/2,offy+15+20+80+35, "培养方向:"+this.s3_details[0][this.i3Type][this.i3PetPoint], 0xff000000, 20, 101, 1, 1, 0, -2, -2);
		this.pm3f.DrawTextEx(offx+15+130/2,offy+15+20+80+35+25, "携带等级:"+GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 2), 0xff000000, 20, 101, 1, 1, 0, -2, -2);

		offx+=15+130;
		this.pm3f.DrawTextEx(offx+120,offy+5,"普通资质",0xff000000,25,101,1,1,0,-2,0);
		DrawMode.ui3_Text1_4word(offx+10, offy+30,110,110,"体质资质",GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 3)+"~"+GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 24));
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38,110,110,"法力资质",GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 9)+"~"+GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 25));
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*2,110,110,"力量资质",GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 10)+"~"+GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 22));
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*3,110,110,"耐力资质",GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 11)+"~"+GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 23));
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*4,110,110,"敏捷资质",GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 12)+"~"+GmPlay.de_pet.strValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 36));
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*5,110,110,"成长",MyPets.swapcz(GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 13))+"~"+MyPets.swapcz(GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 21)));
		
		offx+=225;
		this.pm3f.DrawTextEx(offx+110,offy+5,"变异资质",0xff000000,25,101,1,1,0,-2,0);
		i=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 3);
		j=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 24);
		DrawMode.ui3_Text1_4word(offx+10, offy+30,110,110,"体质资质",(i+(j-i)/2)+"~"+(j+100*3));
		i=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 9);
		j=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 25);
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*1,110,110,"法力资质",(i+(j-i)/2)+"~"+(j+100*2));
		i=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 10);
		j=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 22);
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*2,110,110,"力量资质",(i+(j-i)/2)+"~"+(j+100));
		i=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 11);
		j=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 23);
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*3,110,110,"耐力资质",(i+(j-i)/2)+"~"+(j+100));
		i=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 12);
		j=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 36);
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*4,110,110,"敏捷资质",(i+(j-i)/2)+"~"+(j+100));
		DrawMode.ui3_Text1_4word(offx+10, offy+30+38*5,110,110,"成长",MyPets.swapcz(GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 13))+"~"+MyPets.swapcz(GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 21)));

		offx=this.iX+290;
		offy+=240-2;
		this.pm3f.DrawTextEx(offx+15, offy-5, "可能携带技能：", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		this.DrawPublicFrame(offx+15,offy+25,580,100,this.aa_f2,20,20);
		k=0;
		var i_showx=-1,i_showy=-1,i_showid=-1;
		for(i=0;i<5;i++)
		{
			j=GmPlay.de_pet.intValue(this.s3_petids[this.i3Type][this.i3PetPoint], 0, 14+i);
			if(j<=0)continue;
			GmPlay.xani_nui2.DrawAnimaEx(offx+20+k*95+5,offy+35, "技能框", 0,101,1,1,0,0,0);
			GmPlay.xani_nicon.DrawAnimaEx(offx+20+k*95+5,offy+35, GmPlay.de_skill.strValue(j, 0, 5), 0,101,1,1,0,0,0);
			this.btn3_skills[i].Move(offx+20+k*95+5,offy+35, 90,90);
//			if(this.i3ShowSkillDetail==k)
			if(this.btn3_skills[i].bMouseDown)
			{
				i_showid=j;
				i_showx=offx+20+k*95+5;
				i_showy=offy+35;
			}
			k++;
		}
		this.i3SkillCount=k;
		offy+=107;
		this.pm3f.DrawTextEx(offx+15, offy+35, "加点推荐：", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		this.DrawPublicFrame(offx+15+130,offy+30,450,30,this.aa_f2,20,20);
		this.pm3f.DrawTextEx(offx+15+130+450/2, offy+30+30/2, this.s3_details[1][this.i3Type][this.i3PetPoint], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
		offy+=42;
		this.pm3f.DrawTextEx(offx+15, offy+35, "宠物获取途径：", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		this.DrawPublicFrame(offx+15+130,offy+30,450,30,this.aa_f2,20,20);
		this.pm3f.DrawTextEx(offx+15+130+450/2, offy+30+30/2, this.s3_details[2][this.i3Type][this.i3PetPoint], 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
//		GmPlay.xani_nui5.DrawAnimaEx(offx+20,offy+20+80+20, "分隔线", 0, 101, 55.0f, 1, 0, 0, 0);
		
		this.pm3f.DrawTextEx(this.btn3_cpt.iX-120, this.btn3_cpt.iY+61/2, "选择类型", 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		this.DrawPublicFrame(this.btn3_cpt.iX-5,this.btn3_cpt.iY-5,(109)*1+10,(61)*1+10,this.aa_f3,20,20);
		this.btn3_cpt.sName=this.s3_type[this.i3Type];
		this.btn3_cpt.Draw();
		if(this.bChangePT)
		{
			this.DrawPublicFrame(this.btn3_cpt.iX-5,this.btn3_cpt.iY-5,(109+5)*2+5,(61+5)*2+5,this.aa_f3,20,20);
			for(i=0;i<4;i++)this.btn3_pts[i].Draw();
		}
		if(i_showid>=0)
		{
			MyAttFrame.Skill_Detail(i_showid, i_showx, i_showy, -1);
		}
	}
	
	//////---------------------------4---宝石----------------------------------

	 Init_4()
	{
		var i;
		this.btn4_stone=new Array(5);//
		for(i=0;i<5;i++)
		{
			this.btn4_stone[i]=new XButtonEx2(GmPlay.xani_nui5);
			this.btn4_stone[i].InitButton("最大按钮");
//			this.btn4_stone[i].sName=s4_type[i];
		}
		this.i4StonePoint=0;
	}
	 Draw_4()
	{
		var i,j,k,offx,offy;
		this.iSRX=this.iX+50;
		this.iSRY=this.iY+50;
		this.iSRW=236;
		this.iSRH=460;
		this.pm3f.SetViewClip(this.iSRX,this.iSRY,this.iSRX+this.iSRW,this.iSRY+this.iSRH);
		this.iSHeight=this.i4_ids.length*(87+5);
		this.bScorlling=true;
		for(i=0;i<this.i4_ids.length;i++)
		{
			offx=this.iX+50;
			offy=this.iY+50+(87+5)*i-this.iSOffY;
			this.btn4_stone[i].Move(offx,offy, 236, 87);
			if(offy+94<this.iSRY || offy>this.iSRY+this.iSRH)continue;//cx
			if(this.i4StonePoint==i)this.btn4_stone[i].bMouseDown=true;
			this.btn4_stone[i].Draw();
			GmPlay.xani_nui3.DrawAnima(offx+4,offy+3, "物品格子", 0);
			GmPlay.xani_ngoods.DrawAnima_aa(offx+4,offy+3, GmPlay.de_goods.strValue(this.i4_ids[i], 0, 10), 0);
			this.pm3f.DrawTextEx(offx+100,offy+87/2, GmPlay.de_goods.strValue(this.i4_ids[i], 0, 4), 0xffffffff, 25, 101, 1, 1, 0, 0, -2);
		}
		this.pm3f.NoClip();
		this.DrawPublicFrame(this.iX+290,this.iY+45,610,460,this.aa_f1,20,20);
		
		var igid=this.i4_ids[this.i4StonePoint];
		offx=this.iX+290;
		offy=this.iY+45;
		GmPlay.xani_nui3.DrawAnima(offx+15,offy+15, "物品格子", 0);
		GmPlay.xani_ngoods.DrawAnima_aa(offx+15,offy+15, GmPlay.de_goods.strValue(igid, 0, 10), 0);
		this.pm3f.DrawTextEx(offx+110,offy+15+80/2, GmPlay.de_goods.strValue(igid, 0, 4), 0xffffffff, 30, 101, 1, 1, 0, 0, -2);
		GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy+15+80+15, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
		offy+=15+80+15+15;

//		offy+=20+80+20+10;
		FormatString.gi().FormatEx("#c000000"+this.s4_detail[this.i4StonePoint], 570, 25, 0, 0, 40);
		FormatString.gi().Draw(offx+20, offy);

		offy=this.iY+this.iH-150;
//		this.pm3f.DrawTextEx(offx+15,offy-20-15, "【郢城】【铁匠】处强化装备，可提升装备属性", 0xff000000, 20, 101, 1, 1, 0, 0, 0);
		GmPlay.xani_nui5.DrawAnimaEx(offx+15,offy, "分隔线", 0, 101, 55.0, 1, 0, 0, 0);
		offy+=10;
		this.pm3f.DrawTextEx(offx+15,offy, "主要获取途径", 0xffffffff, 20, 101, 1, 1, 0, 0, 0);
		offy+=20+10;
		this.DrawPublicFrame(offx+15,offy,580,50,this.aa_f2,20,20);
		this.pm3f.DrawTextEx(offx+15+580/2,offy+25, "封印叔叔任务，保卫西阳活动，交易", 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
	}
	
	 DrawPublicFrame( x, y, w, h, aa, ww, hh)
	{
		
		if(aa==this.aa_f1)
		{
			M3DFast.gi().FillRect_2D(x,y, x+w, y+h, 0xff68b5ad);
			return;
		}
		if(aa==this.aa_f2)
		{
			M3DFast.gi().FillRect_2D(x,y, x+w, y+h, 0xff37c2c8);
			return;
		}
		if(aa==this.aa_f3)
		{
			M3DFast.gi().FillRect_2D(x,y, x+w, y+h, 0xff000000);
			return;
		}
		if(aa==this.aa_f4)
		{
			M3DFast.gi().FillRect_2D(x,y, x+w, y+h, 0xff9bced8);
			return;
		}
		aa.iFrame=0;aa.DrawEx(-x, y, 101, 1, 1, 0, -2, -2);
		aa.iFrame=1;aa.DrawEx(x+w/2-ww/2 ,y, 101, 1.0*(w-ww*2)/ww, 1, 0, -2, -2);
		aa.iFrame=2;aa.DrawEx(x+w-ww, y, 101, 1, 1, 0, -2, -2);
		
		aa.iFrame=3;aa.DrawEx(x+w-ww ,y+h/2-hh/2, 101, 1.0, 1.0*(h-hh*2)/hh, 0, -2, -2);
		aa.iFrame=4;aa.DrawEx(-(x+w-ww), y+h-hh, 101, 1, 1, 0, -2, -2);

		aa.iFrame=5;aa.DrawEx(x+w/2-ww/2 ,y+h-hh, 101, 1.0*(w-ww*2)/ww, 1, 0, -2, -2);
		aa.iFrame=6;aa.DrawEx(x, y+h-hh, 101, 1, 1, 0, -2, -2);
		aa.iFrame=7;aa.DrawEx(-x ,y+h/2-hh/2, 101, 1.0, 1.0*(h-hh*2)/hh, 0, -2, -2);
		
		if(aa==this.aa_f1)
		{
			M3DFast.gi().FillRect_2D(x,y, x+w, y+h, 0xff68b5ad);
//			var xx=x+ww-1;
//			var yy=y+hh-1;
//			var www=w-ww*2;
//			var hhh=h-hh*2;
//			M3DFast.gi().FillRect_2D(xx,yy, xx+www, yy+hhh, 0xff68b5ad);
		}
		else
		{
			aa.iFrame=8;aa.DrawEx(x+ww-1, y+hh-1, 101, 1.0*(w-ww*2+2)/ww, 1.0*(h-hh*2+2)/hh, 0, -1, -1);
		}
	}
	ProcTouch( msg, x, y)
	{
		var i,j;
		if(this.bScorlling && this.iSHeight>this.iSRH)
		{
			if(msg==1 && XDefine.bInRect(x, y, this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				if(this.iTypePoint==0)this.bLockScorll=true;
				this.iLockX=x;this.iLockY=y;
			}
			if(msg==2 && this.iTypePoint==1 && Math.abs(this.iLockY-y)>10 && XDefine.bInRect(x, y, this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				this.bLockScorll=true;
				for(i=0;i<this.s1_setids[this.i1LevPoint].length;i++)this.btn1_sets[i].SetNormal();
			}
			if(msg==2 && this.iTypePoint==2 && Math.abs(this.iLockY-y)>10 && XDefine.bInRect(x, y, this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				this.bLockScorll=true;
				for(i=0;i<64;i++)this.btn2_jnlist[i].SetNormal();
			}
			if(msg==2 && this.iTypePoint==3 && Math.abs(this.iLockY-y)>10 && XDefine.bInRect(x, y, this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				this.bLockScorll=true;
				for(i=0;i<36;i++)this.btn3_pets[i].SetNormal();
			}
			if(msg==2 && this.iTypePoint==4 && Math.abs(this.iLockY-y)>10 && XDefine.bInRect(x, y, this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				this.bLockScorll=true;
				for(i=0;i<5;i++)this.btn4_stone[i].SetNormal();
			}
			if(this.bLockScorll)
			{
				if(msg==2)
				{
					j=this.iSHeight-this.iSRH;
					this.iSOffY-=(y-this.iLockY);
					this.iLockX=x;this.iLockY=y;
					if(this.iSOffY<0)this.iSOffY=0;
					if(this.iSOffY>j)this.iSOffY=j;
				}
				if(msg==3)this.bLockScorll=false;
				return true;
			}
		}
		switch(this.iTypePoint)
		{
		case 0:
			for(i=0;i<5;i++)
			{
				if(this.btn0_levs[i].ProcTouch(msg, x, y))
				{
					if(this.btn0_levs[i].bCheck())
					{
						this.i0LevPoint=i;
						this.iSOffY=0;
					}
				}
			}
			break;
		case 1:
			if(this.bChangeLev)
			{
				for(i=0;i<9;i++)
				{
					if(this.btn1_levs[i].ProcTouch(msg, x, y))
					{
						if(this.btn1_levs[i].bCheck())
						{
							this.btn1_levs[i].SetNormal();
							this.bChangeLev=false;
							this.i1LevPoint=i;
							this.i1SetPoint=0;
							this.iSOffY=0;
						}
					}
				}
				if(!XDefine.bInRect(x,y,this.btn1_clev.iX, this.btn1_clev.iY, (109+5)*3,(61+5)*3))this.bChangeLev=false;
				return true;
			}
			if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				for(i=0;i<this.s1_setids[this.i1LevPoint].length;i++)
				{
					if(this.btn1_sets[i].ProcTouch(msg, x, y))
					{
						if(this.btn1_sets[i].bCheck())this.i1SetPoint=i;
					}
				}
			}
			if(this.btn1_clev.ProcTouch(msg, x, y))
			{
				if(this.btn1_clev.bCheck())
				{
					this.btn1_clev.SetNormal();
					this.bChangeLev=true;
				}
				return true;
			}
			break;
		case 2://技能大全
			for(i=0;i<5;i++)
			{
				if(this.btn2_page[i].ProcTouch(msg, x, y))
				{
					if(this.btn2_page[i].bCheck())
					{
						this.i2PagePoint=i;
						this.i2SkillPoint=0;
						this.iSOffY=0;
					}
				}
			}
			switch(this.i2PagePoint)
			{
			case 0:
				if(this.bChangeSchool)
				{
					for(i=0;i<9;i++)
					{
						if(this.btn2_schools[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_schools[i].bCheck())
							{
								this.btn2_schools[i].SetNormal();
								this.bChangeSchool=false;
								this.i2SchoolPoint=i;
								this.i2SkillPoint=0;
								this.iSOffY=0;
							}
						}
					}
					if(!XDefine.bInRect(x,y,this.btn2_cschool.iX, this.btn2_cschool.iY, (109+5)*3,(61+5)*3))this.bChangeSchool=false;
					return true;
				}
				if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
				{
					for(i=0;i<this.s2_skills1[this.i2SchoolPoint].length;i++)
					{
						if(this.btn2_jnlist[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_jnlist[i].bCheck())
							{
								this.i2SkillPoint=i;
							}
						}
					}
				}
				if(this.btn2_cschool.ProcTouch(msg, x, y))
				{
					if(this.btn2_cschool.bCheck())
					{
						this.btn2_cschool.SetNormal();
						this.bChangeSchool=true;
					}
				}
				break;
			case 1://宠物技能
				if(this.bChangeZb)
				{
					for(i=0;i<2;i++)
					{
						if(this.btn2_zbs[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_zbs[i].bCheck())
							{
								this.btn2_zbs[i].SetNormal();
								this.bChangeZb=false;
								this.i2ZbPoint=i;
								this.i2SkillPoint=0;
								this.iSOffY=0;
							}
						}
					}
					if(!XDefine.bInRect(x,y,this.btn2_czb.iX, this.btn2_czb.iY, (109+5)*2,(61+5)*1))this.bChangeZb=false;
					return true;
				}
				if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
				{
					for(i=0;i<this.s2_skills2[this.i2ZbPoint].length;i++)
					{
						if(this.btn2_jnlist[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_jnlist[i].bCheck())
							{
								this.i2SkillPoint=i;
							}
						}
					}
				}
				if(this.btn2_czb.ProcTouch(msg, x, y))
				{
					if(this.btn2_czb.bCheck())
					{
						this.btn2_czb.SetNormal();
						this.bChangeZb=true;
					}
				}
				break;
			case 2:
				if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
				{
					for(i=0;i<this.s2_skills3.length;i++)
					{
						if(this.btn2_jnlist[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_jnlist[i].bCheck())
							{
								this.i2SkillPoint=i;
							}
						}
					}
				}
				break;
			case 3:
				if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
				{
					for(i=0;i<this.s2_skills4.length;i++)
					{
						if(this.btn2_jnlist[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_jnlist[i].bCheck())
							{
								this.i2SkillPoint=i;
							}
						}
					}
				}
				break;
			case 4://辅助技能
				if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
				{
					for(i=0;i<this.s2_skills5.length;i++)
					{
						if(this.btn2_jnlist[i].ProcTouch(msg, x, y))
						{
							if(this.btn2_jnlist[i].bCheck())
							{
								this.i2SkillPoint=i;
							}
						}
					}
				}
				break;
			}
			break;
		case 3://宠物
			this.i3ShowSkillDetail=-1;
			
			if(this.bChangePT)
			{
				for(i=0;i<4;i++)
				{
					if(this.btn3_pts[i].ProcTouch(msg, x, y))
					{
						if(this.btn3_pts[i].bCheck())
						{
							this.btn3_pts[i].SetNormal();
							this.bChangePT=false;
							this.i3Type=i;
							this.i3PetPoint=0;
							this.iSOffY=0;
						}
					}
				}
				if(!XDefine.bInRect(x,y,this.btn3_cpt.iX, this.btn3_cpt.iY, (109+5)*2,(61+5)*2))this.bChangePT=false;
				return true;
			}
			if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				for(i=0;i<this.s3_petids[this.i3Type].length;i++)
				{
					if(this.btn3_pets[i].ProcTouch(msg, x, y))
					{
						if(this.btn3_pets[i].bCheck())
						{
							this.i3PetPoint=i;
						}
					}
				}
			}
			for(i=0;i<this.i3SkillCount;i++)
			{
				if(this.btn3_skills[i].ProcTouch(msg, x, y))
				{
					if(this.btn3_skills[i].bCheck())
					{
						this.i3ShowSkillDetail=i;
					}
				}
			}
			if(this.btn3_cpt.ProcTouch(msg, x, y))
			{
				if(this.btn3_cpt.bCheck())
				{
					this.btn3_cpt.SetNormal();
					this.bChangePT=true;
				}
				return true;
			}
			break;
		case 4://宝石
			if(XDefine.bInRect(x,y,this.iSRX,this.iSRY,this.iSRW,this.iSRH))
			{
				for(i=0;i<this.i4_ids.length;i++)
				{
					if(this.btn4_stone[i].ProcTouch(msg, x, y))
					{
						if(this.btn4_stone[i].bCheck())
						{
							this.i4StonePoint=i;
						}
					}
				}
			}
			break;
		}
		for(i=0;i<5;i++)
		if(this.btn_close.ProcTouch(msg, x, y))
		{
			if(this.btn_close.bCheck())
			{
				XStat.gi().PopStat(1);
			}
			return true;
		}
		for(i=0;i<5;i++)
		{
			if(this.btn_type[i].ProcTouch(msg, x, y))
			{
				if(this.btn_type[i].bMouseDown)
				{
					this.iTypePoint=i;
					this.iSOffY=0;
				}
			}
		}
		return false;
	}
}
MainHelp.Open=function()
{
	XStat.gi().PushStat(XStat.GS_MAINHELP);
}