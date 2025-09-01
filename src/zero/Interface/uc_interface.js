
//import cn.uc.gamesdk.UCGameSdk;
//import cn.uc.gamesdk.exception.UCCallbackListenerNullException;
//import cn.uc.gamesdk.exception.UCMissActivityException;
//import cn.uc.gamesdk.open.GameParamInfo;
//import cn.uc.gamesdk.open.OrderInfo;
//import cn.uc.gamesdk.open.PaymentInfo;
//import cn.uc.gamesdk.open.UCCallbackListener;
//import cn.uc.gamesdk.open.UCGameSdkStatusCode;
//import cn.uc.gamesdk.open.UCLogLevel;
//import cn.uc.gamesdk.open.UCOrientation;
import Logo from "../../mgm/mainmenu/Logo"
import GameData from "../../config/GameData"
//import android.os.Message;
import main from "../../System/Interface/uc/main"
import PackageTools from "../../engine/PackageTools"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"
import GmMe from "../../engtst/mgm/gameing/me/GmMe"

export default class uc_interface {
	String sSid;
	PackageTools pls;
	static boolean bDestoryed;
	
	public static uc_interface uc=new uc_interface();
	constructor()
	{
		pls=new PackageTools(1024);
		bDestoryed=false;
	}
	public static void Exit()
	{
		if(bDestoryed)return;
		try {
			UCGameSdk.defaultSdk().exitSDK(PublicInterface.mMain, new UCCallbackListener<String>()
					{
	            @Override
	            callback(final int statuscode, final String data)
	            {
	                switch (statuscode) 
	                {
	                case UCGameSdkStatusCode.SDK_EXIT:
	            		bDestoryed=true;
	            		GmPlay.sop("uc interface exited");
	                    UCGameSdk.defaultSdk().destoryFloatButton(main.mMain);
//	                    GameActivity.finish();
	                    //                        // 退出程序
//	                    Intent intent = new Intent(Intent.ACTION_MAIN);
//	                    intent.addCategory(Intent.CATEGORY_HOME);
//	                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//	                    startActivity(intent);
	                    android.os.Process.killProcess(android.os.Process.myPid());
	                    //System.exit(0);
	                case UCGameSdkStatusCode.SDK_EXIT_CONTINUE:
	                    break;
	                case UCGameSdkStatusCode.NO_INIT:
	                }
	            }
	        });
	    } catch (UCCallbackListenerNullException e) {
	        e.printStackTrace();
	    } catch (UCMissActivityException e) {
	        e.printStackTrace();
	    }
	}

	Pay( amount)
	{
		PaymentInfo pInfo = new PaymentInfo(); //创建Payment对象，用于传递充值信息
		pInfo.setAllowContinuousPay(true); //设置成功提交订单后是否允许用户连续充值，默认为true。
		pInfo.setCustomInfo(""+GmMe.me.iRid); //设置充值自定义参数，此参数不作任何处理，在充值完成后通知游戏服务器充值结果时原封不动传给游戏服务器。此参数为可选参数，默认为空。
		pInfo.setServerId(2272); //设置充值的游戏服务器ID，此为可选参数，默认是0，不设置或设置为0 时，会使用初始化时设置的服务器ID。必须使用正确的ID值（UC分配的serverId）才可以打开支付页面。如使用正确ID仍无法打开时，请在开放平台检查是否已经配置了对应环境对应ID的回调地址，如无请配置，如有但仍无法支付请联系UC技术接口人。
		pInfo.setRoleId(""+GmMe.me.iRid); //设置用户的游戏角色的ID，此为可选参数
		pInfo.setRoleName(GmMe.me.sName); //设置用户的游戏角色名字，此为可选参数
		pInfo.setGrade(""+GmMe.me.rbs.iLev); //设置用户的游戏角色等级，此为可选参数
		pInfo.setAmount(amount); //设置允许充值的金额，此为可选参数，默认为0。如果设置了此金额不为0，则表示只允许用户按指定金额充值；如果不指定金额或指定为0，则表示用户在充值时可以自由选择或输入希望充入的金额。
		try {
			UCGameSdk.defaultSdk().pay(pInfo,new UCCallbackListener<OrderInfo>() 
				{
				@Override
				callback( statudcode, orderInfo) 
				{
					if (statudcode == UCGameSdkStatusCode.NO_INIT) 
					{
					//没有初始化就进行登录调用，需要游戏调用SDK初始化方法
					}
					if (statudcode == UCGameSdkStatusCode.SUCCESS)
					{
						//成功充值
						if (orderInfo != null)
						{
							String ordered = orderInfo.getOrderId();//获取订单号
							float amount = orderInfo.getOrderAmount();//获取订单金额
							var payWay = orderInfo.getPayWay();//获取充值类型，具体可参考支付通道编码列表
							String payWayName = orderInfo.getPayWayName();//充值类型的中文名称
							GmProtocol.gi().s_Pay(GameVersion.QUDAO, ordered, (amount*100), payWay, payWayName);
						}
					}
					if (statudcode == UCGameSdkStatusCode.PAY_USER_EXIT) {
						//用户退出充值界面。
					}
				}
			}
		);
		} catch (UCCallbackListenerNullException e) {
		//异常处理
		}
	}

	_Login()
	{
		try {
			UCGameSdk.defaultSdk().login(
			new UCCallbackListener<String>()
			{
				@Override
				callback( code, String msg) 
				{
					if (code == UCGameSdkStatusCode.SUCCESS)
					{//登录成功，可以执行后续操作
						GmPlay.sop("uc interface Login OK = "+UCGameSdk.defaultSdk().getSid());
					}
					if (code == UCGameSdkStatusCode.LOGIN_EXIT)
					{//登录界面关闭，游戏需判断此时是否已登录成功进行相应操作
						sSid=UCGameSdk.defaultSdk().getSid();
						GmPlay.sop1("uc interface Login exit = "+sSid);
						if(sSid.length>0)
						{
							s_Login(sSid);
							XStat.gi().PushStat(XStat.GS_LOADING1);
						}
					}
					if (code == UCGameSdkStatusCode.NO_INIT)
					{//没有初始化就进行登录调用，需要游戏调用SDK初始化方法
						GmPlay.sop("uc interface Login error");
					}
				}});
			} catch (UCCallbackListenerNullException e) {
			//异常处理
			}
	}

	s_Login( sid)
	{
		pls.iOffset=0;
		pls.InsertString(sid);
		GmPlay.xntf.InQueue(1101, pls.iOffset, pls.databuf);
	}
	Init()
	{
		GameParamInfo gpi = new GameParamInfo();//下面的值仅供参考
		gpi.setCpId(21108);
		gpi.setGameId(523258);
		gpi.setServerId(2272);
		//gpi.setChannelId(2); // 渠道号统一处理，已不需设置，此参数已废弃
		//设置是否支持查询充值历史和显示切换账号功能，如果不设置，默认具有查询充值历史记录和切换账户功能
//		gpi.setFeatureSwitch(new FeatureSwitch(true, false));
		gpi.setEnablePayHistory(true);//开启查询充值历史功能
		gpi.setEnableUserChange(false);//开启账号切换功能
		//界面风格已经统一，不再需要设置
		//UCGameSDK.defaultSDK().setUIStyle(UCUIStyle.STANDARD);
		//对于需要支持试玩用户激活的游戏，必须在此设置试玩用户激活绑定的操作
//		UCGameSDK.defaultSDK().setUCBindGuest(ucBindGuest);
		//对于需要支持账户切换/退出账号的游戏，必须在此设置退出侦听器
//		UCGameSDK.defaultSDK().setLogoutNotifyListener(logoutListener);
		//设置登录界面：
		//USE_WIDGET - 简版登录界面
		//USE_STANDARD - 标准版登录界面
		gpi.setOrientation(UCOrientation.LANDSCAPE);
//		UCGameSdk.defaultSdk().setOrientation(UCOrientation.LANDSCAPE);
		GmPlay.sop("uc interface Init ....");
		//getApplicationContext()
		try {
				UCGameSdk.defaultSdk().initSdk(main.mMain,UCLogLevel.DEBUG, GameVersion.bDebugMode, gpi, new UCCallbackListener<String>() {
					@Override
					callback( code, String msg) 
					{
						System.out.println("msg:" + msg);//返回的消息
						switch (code)
						{
						case UCGameSdkStatusCode.SUCCESS:
							//初始化成功,可以执行后续的登录充值操作
							Logo.bInited=true;
							GmPlay.sop("uc interface Init Ok");

							UCGameSdk.defaultSdk().createFloatButton(main.mMain);
							//显示悬浮图标
							UCGameSdk.defaultSdk().showFloatButton(main.mMain, 100, 25);

							break;
						case UCGameSdkStatusCode.INIT_FAIL:
							//初始化失败,不能进行后续操作
							GmPlay.sop("uc interface Init Fail");
							break;
						default:
							break;
						}
					}
				});
			} catch (UCMissActivityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		catch (UCCallbackListenerNullException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
