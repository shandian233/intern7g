
import GameData from "../../../../../config/GameData"
import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import XButtonEx1 from "../../../../../engine/control/XButtonEx1"
import XInput from "../../../../../engine/control/XInput"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../../../engtst/mgm/GmProtocol"
import XStat from "../../../../../engtst/mgm/XStat"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"
import FrameMessage from "../../../../../engtst/mgm/frame/message/FrameMessage"

export default class NoviceHelp extends BaseClass {


	constructor( ani) {
		super();
		var i, j;
		this.pani = ani;
		this.pm3f = ani.pm3f;

		this.iW = 800;
		this.iH = 480;
		this.iX = (GmConfig.SCRW - this.iW) / 2;
		this.iY = (GmConfig.SCRH - this.iH) / 2;

		this.btn_help = new Array(10);//
		for (i = 0; i < 10; i++) {
			this.btn_help[i] = new XButton(GmPlay.xani_ui3);
			this.btn_help[i].InitButton("统一按钮2");
			this.btn_help[i].Move(this.iX + 50, this.iY + 45 + i * 50, 128, 32);
			this.btn_help[i].iNameSize = 25;
		}
		this.btn_help[0].sName = "游戏介绍";
		this.btn_help[1].sName = "新手玩法";
		this.btn_help[2].sName = "门派介绍";
		this.btn_help[3].sName = "日常活动";
		this.btn_help[4].sName = "游戏公告";
		this.btn_help[5].sName = "新手提问";
		this.btn_help[6].sName = "高手解答";

		this.btn_btns = new Array(2);//
		for (i = 0; i < 2; i++) {
			this.btn_btns[i]=new Array(6);
			for (j = 0; j < 6; j++) {
				this.btn_btns[i][j] = new XButton(GmPlay.xani_ui);
				this.btn_btns[i][j].Move(this.iX + 20 + i * 130, this.iY + 20 + j * 60, 130,
						60);
				this.btn_btns[i][j].bSingleButton = true;
				// this.btn_btns[i][j].sName="";
			}
		}
		this.btn_btns[0][0].sName = "新手提问";
		this.btn_btns[1][0].sName = "高手解答";

		this.btn_btns[0][1].sName = "0~10级";
		this.btn_btns[1][1].sName = "基本操作";

		this.btn_btns[0][2].sName = "10~20级";
		this.btn_btns[1][2].sName = "门派介绍";

		this.btn_btns[0][3].sName = "20~30级";
		// this.btn_btns[1][3].sName="基本操作";

		this.btn_btns[0][4].sName = "30~40级";
		// this.btn_btns[1][4].sName="基本操作";

		this.btn_close = new XButtonEx1(GmPlay.xani_ui3);
		this.btn_close.InitButton("统一关闭按钮");
		this.btn_close.Move(this.iX + 748, this.iY, 60, 60);

		this.ip1 = 0;
		this.ip2 = 0;
		this.btn_rmx = new Array(3);//
		this.btn_mp = new Array(3);//
		for (i = 0; i < 3; i++) {
			this.btn_rmx[i] = new XButtonEx1(GmPlay.xani_ui3);
			this.btn_rmx[i].InitButton("统一按钮3");
			this.btn_mp[i] = new XButtonEx1(GmPlay.xani_ui3);
			this.btn_mp[i].InitButton("统一按钮3");
		}
		this.btn_rmx[0].sName = "人";
		this.btn_rmx[1].sName = "魔";
		this.btn_rmx[2].sName = "仙";

		// NoviceHelp.sDetail="要求接入竖屏论坛，#e即关闭NdCommplatform.getInstance().ndSetScreenOrientation的调用（仅针对91MM计费的产品）";
		NoviceHelp.sDetail = "";
	}

	Draw_0( offy) {// 游戏介绍
		var x = this.iX + 485;
		var y = offy + 60;
		M3DFast.gi().DrawText_2(x, y, "~~~ 游戏介绍 ~~~", 0xffffC800, 25, 101, 1,
				1, 0, -2, -2, 3, 0xff000000);
		y += 30;
		M3DFast.gi().DrawText_2(x - 21 * 10 + 2 * 20, y, "春秋战国期间，七雄争霸，豪杰雄起。谋臣",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
		y += 25;
		M3DFast.gi().DrawText_2(x - 21 * 10, y, "运筹帷幄，将士浴血沙场。战争此起彼伏，局势",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
		y += 25;
		M3DFast.gi().DrawText_2(x - 21 * 10, y, "变化跌宕。时代赋予三界风云人物神圣使命去掌",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
		y += 25;
		M3DFast.gi().DrawText_2(x - 21 * 10, y, "控国家生死存亡、左右民族荣辱兴衰。人族、魔",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
		y += 25;
		M3DFast.gi().DrawText_2(x - 21 * 10, y, "族、仙族率领九大门派弟子卷入了这场声势浩大",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
		y += 25;
		M3DFast.gi().DrawText_2(x - 21 * 10, y, "的征战之中。岁月长河涤荡两千余载，那些璀璨",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
		y += 25;
		M3DFast.gi().DrawText_2(x - 21 * 10, y, "的智慧和生命依然熠熠发光，依然动人心魄......",
				0xff000000, 20, 101, 1, 1, 0, 0, -2, 0, 0xff000000);
	}

	// 春秋战国期间，七雄争霸，豪杰雄起。谋臣
	// 运筹帷幄，将士浴血沙场。战争此起彼伏，局势
	// 变化跌宕。时代赋予三界风云人物神圣使命去掌
	// 控国家生死存亡、左右民族荣辱兴衰。人族、魔
	// 族、仙族率领九大门派弟子卷入了这场声势浩大
	// 征战之中。岁月长河涤荡两千余载，那些璀璨的
	// 智慧和生命依然熠熠发光，依然动人心魄......
	Draw_1( offy) {
		var x = this.iX + 485;
		var y = offy + 60;
		M3DFast.gi().DrawText_2(x, y, "0级~10级", 0xffffC800, 25, 101, 1, 1, 0,
				-2, -2, 3, 0xff000000);
		y += 30;
		M3DFast.gi().DrawText_2(x, y, "打开任务提示，跟随引导剧情可快速升级", 0xff000000, 20,
				101, 1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "剧情战斗难度较高，建议组队完成", 0xff000000, 20, 101,
				1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "0~5级可在郊外组队练级", 0xff000000, 20, 101,
				1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "5~10级可在西阳山道组队练级", 0xff000000, 20, 101,
				1, 1, 0, -2, -2, 0, 0xff000000);

		y += 30;
		M3DFast.gi().DrawText_2(x, y, "10级~20级", 0xffffC800, 25, 101, 1, 1, 0,
				-2, -2, 3, 0xff000000);
		y += 30;
		M3DFast.gi().DrawText_2(x, y, "西阳城<门派传送人>处传送加入门派,学门派技能", 0xff000000,
				20, 101, 1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "每天前2轮门派任务可获得双倍奖励", 0xff000000, 20, 101,
				1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "10~25级之间可拜40级以上玩家为师", 0xff000000, 20,
				101, 1, 1, 0, -2, -2, 0, 0xff000000);

		y += 30;
		M3DFast.gi().DrawText_2(x, y, "20级~30级", 0xffffC800, 25, 101, 1, 1, 0,
				-2, -2, 3, 0xff000000);
		y += 30;
		M3DFast.gi().DrawText_2(x, y, "郢城<栾千盛>组队进行强盗任务", 0xff000000, 20, 101,
				1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "郢城<帮派总管>处申请加入帮派", 0xff000000, 20, 101,
				1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "帮派内可学到打造，强身，炼丹等辅助技能", 0xff000000, 20,
				101, 1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "临淄<程镖头>可领取押镖任务，有几率得到阵法书", 0xff000000,
				20, 101, 1, 1, 0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "咸阳<商鞅>处领取材料任务(限30次/天)", 0xff000000, 20,
				101, 1, 1, 0, -2, -2, 0, 0xff000000);
		// FrameMessage.fm.Open("#cffffff咸阳坐骑使者领取坐骑剧情#e#cffff00组队完成强盗任务#e#cffffff实力较强可组队挑战妖怪叔叔和山贼，能得到宝石，藏宝图等丰富奖励");
	}

	Draw_2( offy) {// 门派介绍
		var i;
		for (i = 0; i < 3; i++) {
			this.btn_rmx[i].Move(this.iX + 280 + i * 160, offy + 40, 110, 40);
			this.btn_rmx[i].Draw();
			if (this.ip1 == i)
				GmPlay.xani_ui3.DrawAnima_aa(this.btn_rmx[i].iX, this.btn_rmx[i].iY,
						"按钮选中框", 0);

			this.btn_mp[i].Move(this.iX + 280 + i * 160, offy + 40 + 50, 110, 40);
			this.btn_mp[i].sName = GameData.sSchools[this.ip1 * 3 + i + 1];
			this.btn_mp[i].Draw();
			if (this.ip2 == i)
				GmPlay.xani_ui3.DrawAnima(this.btn_mp[i].iX, this.btn_mp[i].iY, "按钮选中框",
						0);
		}
		// {"无","剑侠居","茅蓬坞","卢医崖","武安阁","溶洞","鬼谷","封神台","仙人洞","神女峰"};
		if (this.ip1 == 0) {
			switch (this.ip2) {
			case 0:// 剑侠居
				FormatString.fs
						.FormatEx(
								"#cffff00师父：盖聂#e门派特点：物理型，拥有强大的物理攻击技能。#e门派加点：推荐4力1速、3力1体1耐或全力。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"浩然剑气:对目标造成伤害的同时以剑气伤害另外两个敌方单位，消耗25魔法。#e无双剑法：连续攻击目标三次，使用后休息一回合，要求当前气血40%以上，消耗10%当前气血。#e幻影剑法：分身攻击后主体攻击，要求当前气血60%以上，不消耗气血和魔法 。#e凝神聚气：临时增加自身攻击，消耗20魔法。#e虎啸：增加我方士气，消耗20魔法。#e先发制人：对目标造成伤害的同时降低目标速度，消耗20魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			case 1:// 茅蓬坞
				FormatString.fs
						.FormatEx(
								"#cffff00师父：孙武#e门派特点：辅助型，拥有强大封印技能。#e门派加点：推荐3体2速、2体1耐2速或2体3速。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"奇谋：临时降低目标防御和法防，消耗30魔法。#e陷阱：有几率控制对方，使对方无法攻击和使用技能，消耗20魔法。#e烈焰阵：攻击全体对方气血和魔法，消耗30魔法。#e轮轴术：临时提高己方单人速度，消耗20魔法。#e迷雾：使己方全体有几率躲避物理伤害，消耗40魔法。#e兵诡：持续降低敌方士气，消耗20魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			case 2:// 卢医崖
				FormatString.fs
						.FormatEx(
								"#cffff00师父：扁鹊#e门派特点：辅助型，拥有强大的加血技能，是七国唯一的奶妈。#e门派加点：推荐3体1法1耐、3体1耐1速或4体1耐。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"推功过血：群体恢复气血，恢复人数随着技能等级增加,作用人数（技能等级+10）/20+1，消耗作用人数*15魔法。#e起死回生：救活死亡的队友并恢复一定气血，消耗50魔法。#e练气化神：转化部分气血为魔法，消耗技能等级*1气血。#e浑圆气功：法术攻击2人，消耗20魔法。#e知己知彼：命中后能看到对方当前剩于气血，消耗20魔法。#e针灸：单人加血，并临时提高目标攻击和法防，消耗20魔法。#e神农本草：增加使用药物的效果。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			}
		} else if (this.ip1 == 1) {
			switch (this.ip2) {
			case 0:// 武安阁
				FormatString.fs
						.FormatEx(
								"#cffff00师父：白起#e门派特点：物攻型，拥有强大的物理伤害技能。#e门派加点：推荐4力1体或全力。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"狂暴诀：临时增加自身攻击，减少防御，并进入狂暴状态，无法和定心状态叠加，消耗15魔法。#e连环刀：在狂暴状态下，攻击对方多人。攻击人数=（技能等级+10）/20+1，使用后休息一回合，消耗攻击人数*15魔法。#e乱舞：连续攻击1一3次，狂暴状态下可连续攻击2一4次消耗25魔法。#e定心诀：临时增加防御和法术防御，减少攻击力，并进入定心状态，无法和狂暴状态叠加，消耗15魔法。#e魔甲术：处定心状态下使用，减免受到的法术伤害并有几率躲避对方的法术攻击，消耗20魔法。#e壁垒：使用后受到普通物理攻击时会反击，若处于定心状态则反击伤害加倍消耗25魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			case 1:// 溶洞
				FormatString.fs
						.FormatEx(
								"#cffff00师父：祝融#e门派特点：法术攻击型，拥有强大的法术伤害技能。#e门派加点：推荐4法1体、3法2体或全法。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"火流星：法术攻击对方多人，攻击人数随着技能等级增加，攻击人数=（技能等级+10）/20+1，，消耗攻击人数*15魔法。#e毒火术：攻击单人并临时降低目标防御，消耗30魔法。#e火牢：有几率控制对方，使目标无法使用普通攻击，消耗25魔法。#e炎爆术：法术攻击对方单人，消耗30魔法。#e火甲术：被物理攻击时，对方受到反震伤害，消耗25魔法。#e火灵诀：临时增加法术暴击率和封系法术抗性，消耗40魔法。#e遁地术：非战斗时回到门派",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			case 2:// 鬼谷
				FormatString.fs
						.FormatEx(
								"#cffff00师父：鬼谷子#e门派特点：辅助型，拥有强大的封印技能。#e门派加点：推荐3体2速或2体3速。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"飞钳术：有几率控制对方，使对方无法使用普通攻击和法术，消耗20魔法。#e凝神诀：增加飞钳术成功率消耗20魔法。#e鬼谷刀法：连续攻击目标两次，要求当前气血70%以上，消耗25魔法。#e散势法：降低对方士气，消耗20魔法。#e清心咒：解除已方队员封类状态，消耗20魔法。#e鬼符：对中了飞钳术的敌方目标造成固定伤害，并降低法术防御，消耗15魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			}
		} else if (this.ip1 == 2) {
			switch (this.ip2) {
			case 0:// 封神台
				FormatString.fs
						.FormatEx(
								"#cffff00师父：姜太公#e门派特点：法术型，拥有强大的法术伤害技能。#e门派加点：推荐4法1耐、3法1体1耐或全法。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"呼风：法术攻击对方多人，攻击人数随技能等级增加，攻击人数为技能等级/15+2，消耗攻击人数*15魔法。#e唤雨：攻击对方全体气血和魔法，消耗30魔法。#e天雷封魔：法术攻击对方单人，消耗30魔法。#e仙甲术：临时增加自已防御，消耗25魔法。#e天神助威：提高已方士气，消耗20魔法。#e灵智术：临时增加我方单体灵力，消耗25魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			case 1:
				FormatString.fs
						.FormatEx(
								"#cffff00师父：风后#e门派特点：辅助攻击型，拥有加血技能与固伤技能。#e门派加点：2体2耐1速、3体1耐1速或3体2耐。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"天阵：提高已方全体物理和法术攻击，使用后休息2回合，消耗50魔法。#e地阵：提高已方全体物理和法术防御，使用后休息2回合，消耗50魔法。#e五行击：固定伤害攻击随机1一5个目标，消耗40魔法。#e五行甲：临时提高目标法术攻击和防御，并持续恢复气血若干回合，消耗25魔法。#e孤虚法：降低对方士气并增加已方士气，消耗20魔法。#e归元法：解除五行甲效果并立即回复目标五行甲剩余治疗效果的气血，消耗20魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			case 2:
				FormatString.fs
						.FormatEx(
								"#cffff00师父：九天玄女#e门派特点：辅助攻击型，拥有封印、恢复和攻击技能。#e门派加点：推荐2体1耐2速或2体2耐1速。#e门派技能",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 150);
				FormatString.fs
						.FormatEx(
								"穿云箭：加入灵气的箭，伤害受自身灵和攻击的影响，被攻击者降低速度，消耗15魔法。#e定天弓：提高穿云箭伤害，使穿云箭有几率击晕目标，使目标无法进行任何操作。消耗15魔法。#e驱魔符：驱除对方单人状态，并造成一定的伤害，消耗20魔法。#e天地同寿：救活一个队友。#e灵动九天：临时增加己方单体灵力，并持续恢复其魔法，消耗20魔法。#e仙绫缚：有几率束缚目标，使其无法使用技能消耗20魔法。#e遁地术：非战斗时回到门派。",
								500, 18, 1, 0xff000000, 20);
				FormatString.gi().Draw(this.iX + 240, this.iY + 230);
				break;
			}
		}
	}

	Draw_3( offy) {// 日常活动
		var x = this.iX + 485;
		var y = offy + 60;
		M3DFast.gi().DrawText_2(x, y, "~~~ 日常活动 ~~~", 0xffffC800, 25, 101, 1,
				1, 0, -2, -2, 3, 0xff000000);
		y += 30;
		M3DFast.gi().DrawText_2(x, y, "1.师门任务", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "2.强盗任务", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "3.师徒任务", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "4.为民除害", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "5.帮派-朱雀任务", 0xff000000, 20, 101, 1, 1,
				0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "6.帮派-青龙任务", 0xff000000, 20, 101, 1, 1,
				0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "7.帮派-玄武任务", 0xff000000, 20, 101, 1, 1,
				0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "8.商鞅-护法任务", 0xff000000, 20, 101, 1, 1,
				0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "9.商鞅-执法任务", 0xff000000, 20, 101, 1, 1,
				0, -2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "10.押镖任务", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "11.手艺任务", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "12.周末比武", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "13.准点山贼", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "14.智者答题", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "15.世界抢答", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
		y += 23;
		M3DFast.gi().DrawText_2(x, y, "16.副本", 0xff000000, 20, 101, 1, 1, 0,
				-2, -2, 0, 0xff000000);
	}

	Draw() {
		var i, j;
		var x, y, w, h;
		DrawMode.ui3_BaseFrame2(this.iX, this.iY, "帮", "助");
		this.btn_close.Draw();

		for (i = 0; i < 7; i++) {
			if (this.iPoint == i) {// 选中的宠物，按钮设为按下状态
				this.btn_help[i].bMouseIn = true;
				this.btn_help[i].bMouseDown = true;
				GmPlay.xani_ui3.DrawAnimaEx(this.iX + 40, this.iY + 30 + i * 50 + 10,
						"选中背景", 0, 101, 0.9, 0.71, 0, 0, 0);// this.iX+50,
																// this.iY+65+i*45,
																// 128, 32
			}
			this.btn_help[i].Draw();
		}
		GmPlay.xani_ui3.DrawAnima(this.iX + 190, this.iY, "大框分割线", 0);
		switch (this.iPoint) {
		case 0:// 游戏介绍
			this.Draw_0(this.iY);
			break;
		case 1:// 新手玩法
			this.Draw_1(this.iY);
			break;
		case 2:// 门派介绍
			this.Draw_2(this.iY);
			break;
		case 3:// 日常活动
			this.Draw_3(this.iY);
			break;
		case 4:// 游戏公告
			M3DFast.gi().DrawText_2(this.iX + 485, this.iY + 60, NoviceHelp.sTitle, 0xffffC800, 25,
					101, 1, 1, 0, -2, -2, 3, 0xff000000);

			FormatString.gi().FormatEx(NoviceHelp.sDetail, 500, 20, 1, 0xff000000, 25);
			FormatString.gi().Draw(this.iX + 240, this.iY + 100);
			break;
		}
	}

	ProcTouch( msg,  x,  y) {
		var i, j;

		if (this.iPoint == 2) {
			for (i = 0; i < 3; i++) {
				if (this.btn_rmx[i].ProcTouch(msg, x, y)) {
					if (this.btn_rmx[i].bCheck()) {
						this.ip1 = i;
					}
					return true;
				}
				if (this.btn_mp[i].ProcTouch(msg, x, y)) {
					if (this.btn_mp[i].bCheck()) {
						this.ip2 = i;
					}
					return true;
				}
			}
		}

		for (i = 0; i < 7; i++) {
			if (this.btn_help[i].ProcTouch(msg, x, y)) {
				if (this.btn_help[i].bCheck()) {
					if (i == 5)
						Send_NoviceAsk.Open();
					else if (i == 6)
						NoviceQuestionList.Open();
					else {
						if (i == 4 && this.iPoint != i)
							GmProtocol.gi().s_SeverEvent(2, 10, 0, 0, 0);// 获取游戏公告
						this.iPoint = i;
					}
				}
				return true;
			}
		}
		if (this.btn_close.ProcTouch(msg, x, y)) {
			if (this.btn_close.bCheck()) {
				XStat.gi().PopStat(1);
			}
			return true;
		}
		// for(i=0;i<2;i++)
		// {
		// for(j=0;j<6;j++)
		// {
		// if(this.btn_btns[i][j].ProcTouch(msg, x, y))
		// {
		// if(this.btn_btns[i][j].bCheck())
		// {
		// if(i==0 && j==0)
		// {
		// Send_NoviceAsk.Open();
		// }
		// if(i==1 && j==0)
		// {//高手解答，获取问题列表
		// NoviceQuestionList.Open();
		// }
		// if(i==1 && j==1)
		// {//基本操作
		// FrameMessage.fm.Open("#cffffff屏幕左上角打开小地图和世界地图#e#cffff00屏幕右上角打开人物属性页面#e#cffffff左下方公共频道聊天");
		// }
		// if(i==1 && j==2)
		// {//门派介绍
		// FrameMessage.fm.Open("#cffffff剑侠居(人族,攻击)#e茅棚邬(人族,封)#e庐医崖(人族,辅助)#e#cffff00溶洞(魔族,法术)#e鬼谷(魔族,封)#e武安阁(魔族,攻击)#e#cffffff封神台(仙族,法术)#e仙人洞(仙族,辅助)#e神女峰(仙族,全能)");
		// }
		// if(i==0 && j==1)
		// {//0-10级指引
		// FrameMessage.fm.Open("#cffffff打开任务提示，跟随引导剧情可快速升级和了解游戏#e#cffff00剧情战斗难度较高，建议组队完成#e#cffffff0~5级可在新手村郊外组队练级#e#cffff005~10级可在西阳山道组队练级");
		// }
		// if(i==0 && j==2)
		// {//10-20级指引
		// FrameMessage.fm.Open("#cffffff等级到达10级可到西阳城门派传送人处传送加入门派，学习门派技能，每天前2轮门派任务可获得大量经验和金钱#e#cffff0010~20级可拜40级以上玩家为师");
		// }
		// if(i==0 && j==3)
		// {//20-30级指引
		// FrameMessage.fm.Open("#cffffff郢城帮派总管处申请加入帮派，在帮派可学到打造，强身，炼丹等帮派技能#e#cffff00临淄程镖头可领取押镖任务，有几率得到阵书#e#cffffff咸阳商鞅处领取材料任务(限30次/天)");
		// }
		// if(i==0 && j==4)
		// {//30-40级指引
		// FrameMessage.fm.Open("#cffffff咸阳坐骑使者领取坐骑剧情#e#cffff00组队完成强盗任务#e#cffffff实力较强可组队挑战妖怪叔叔和山贼，能得到宝石，藏宝图等丰富奖励");
		// }
		// }
		// }
		// }
		// }
		// if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW,
		// this.iH))XStat.gi().PopStat(1);
		return false;
	}

}
NoviceHelp.sDetail;
NoviceHelp.sTitle;
