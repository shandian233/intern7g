
import XDefine from "../../config/XDefine"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol";
import WavFast from "../../engine/sound/WavFast"
import { eventMgr } from "../../engine/event/EventManager";
//import android.os.Message;

export default class PublicInterface {

	constructor(){
		//  this.bShowFloatButton=false;
		//  this.bAtLeft,this.bLockFB,this.bOutSide;
		//  this.iFBOffY;
		//  this.iFBOffX;
		//  this.iOldX,this.iOldY;
		//  this.iLockX,this.iLockY;
		this.iStat=0;
		this.iBx=-1;
		this.iLHX=-1;
		if(PublicInterface.QUDAO == 1){//微信胶囊位置
			setTimeout(()=>{
				var dd = wx.getMenuButtonBoundingClientRect();
				console.log('菜单按键宽度：',dd.width)
				console.log('菜单按键高度：',dd.height)
				console.log('菜单按键上边界坐标：',dd.top)
				console.log('菜单按键右边界坐标：',dd.right)
				console.log('菜单按键下边界坐标：',dd.bottom)
				console.log('菜单按键左边界坐标：',dd.left)
				var info=wx.getSystemInfoSync();

				this.iScreenW = info.windowWidth;
				this.iScreenH = info.windowHeight;
				
				this.iBx = dd.left*Laya.stage.width/this.iScreenW;
				this.iBy = dd.top*Laya.stage.height/this.iScreenH;
				this.iBw = dd.width*Laya.stage.width/this.iScreenW;
				this.iBh = dd.height*Laya.stage.height/this.iScreenH;

				var safeArea=info.safeArea;
				this.iLHX=safeArea.left;
			},5000)

			wx.onKeyboardComplete(()=>{
				console.log('键盘收起');
				eventMgr.dispatchEvent('onKeyboardComplete');
			})
		}else{
			
		}
		// this.iBx=Laya.stage.width-200;
		// this.iBy=100;
		// this.iBw=100;
		// this.iBh=50;
	}
	bInBound(x,y,w,h)
	{
		if(this.iBx<0)return false;
		if(x+w<this.iBx)return false;
		if(this.iBx+this.iBw<x)return false;
		if(y+h<this.iBy)return false;
		if(this.iBy+this.iBh<y)return false;
		return true;
	}
	DrawBoundRect()
	{
		// if(this.iBx<0)return;
		// M3DFast.gi().FillRect(this.iBx,this.iBy,this.iBw,this.iBh,0xff0000,1,100);
	}
	Logic()
	{
		if(!GmPlay.bConnected)return;
		if(GmPlay.gi().iLoadStat<7)return;
		if(PublicInterface.QUDAO==1)this.Logic_wx();
	}
	Logic_wx()
	{
		switch(this.iStat)
        {
            case 0:
                wx.onShow(function()
				{//回到界面继续播放背景音乐
					WavFast.MusicContinue();
				})
				wx.setKeepScreenOn({
					keepScreenOn: true,
					success() {
						console.log('常亮打开成功');
					},
					fail(err) {
						console.log(err, '常亮打开失败');
					}
				});
                wx.login({
                    success(res){
                        if (res.code){// 发起网络请求
							XDefine.sop("wx login success");
							GmProtocol.gi().s_Login_xyx(PublicInterface.QUDAO,res.code,"");
                        }
                        else XDefine.sop("登录失败！"+res.errMsg);
                    }
                });
                this.iStat=1;
                this.iTimeOut=0;
                break;
            case 1:
                this.iTimeOut++;
                if(this.iTimeOut>=3*30)this.iStat=0;
                break;
        }
	}
	Init()
	{
		// uc_interface.uc.Init();
	}
	Pause()
	{
	}
	_Login()
	{
		// uc_interface.uc._Login();
	}
	Pay( price)
	{
		// uc_interface.uc.Pay(price);
	}
	_Exit()
	{
		// GmPlay.bCheckRes=false;//改成下次登录需要更新，如果中间异常退出，就自动检测客户顿
		// GmPlay.x_record.SaveTo(XDefine.RECORDFILENAME);

		// uc_interface.Exit();
	}
	Exit()
	{
/*		Message message=new Message();
		message.what=MESSAGE_EXIT;
		message.obj=this;
		main.mMain.mHandler.sendMessage(message);*/
	}
	Login()
	{
/*		Message message=new Message();
		message.what=MESSAGE_LOGIN;
		message.obj=this;
		main.mMain.mHandler.sendMessage(message);*/
	}
	OnReceive( pls)
	{
	}
	mta_record( type, cs, detail)
	{//
		switch(type)
		{
		case 0://游戏启动和关闭
			break;
		case 1://统计玩家账户,rid,name-
			break;
		case 2://lev,sever-
			break;
		case 3://追踪玩家充值
			break;
		case 4://跟踪获赠虚拟币
			break;
		case 5://跟踪游戏消费点-
			break;
		}
	}

	InitFloatButton()
	{
		// this.bShowFloatButton=true;
		// this.bAtLeft=true;
		// this.bLockFB=false;
		// this.iFBOffY=GmConfig.SCRH/2-30;
	}
	Draw()
	{
		// if(this.bShowFloatButton)
		// {
		// 	if(!this.bLockFB)
		// 	{
		// 		if(this.bAtLeft)this.iFBOffX=0;
		// 		else this.iFBOffX=GmConfig.SCRW-60;
		// 	}
		// 	M3DFast.gi().FillRect_2D_ex(this.iFBOffX, this.iFBOffY, this.iFBOffX+60, this.iFBOffY+60, 0xff000000, 0xffff0000, 0xff00ff00, 0xff0000ff);
		// }
	}
	ProcTouch( msg, x, y)
	{
// 		if(this.bShowFloatButton)
// 		{
// 			if(XDefine.bInRect(x, y, this.iFBOffX, this.iFBOffY, 60, 60) && msg==1)
// 			{
// 				this.iOldX=this.iFBOffX;
// 				this.iOldY=this.iFBOffY;
// 				this.iLockX=x;
// 				this.iLockY=y;
// 				this.bLockFB=true;
// 				this.bOutSide=false;
// 			}
// 			if(this.bLockFB)
// 			{
// 				if(x<GmConfig.SCRW/2)this.bAtLeft=true;
// 				else this.bAtLeft=false;
// 				this.iFBOffY=this.iOldY+y-this.iLockY;
// 				if(XDefine.llength(x, y, this.iLockX, this.iLockY)>30)
// 				{//拖动距离超过50个像素
// 					this.iFBOffX=this.iOldX+x-this.iLockX;
// 					this.bOutSide=true;//离开过区域范围，回去也不触发
// 				}
// 				else
// 				{
// 					this.iFBOffX=this.iOldX;
// 					if(msg==3 && !this.bOutSide)
// 					{//放开时，触发打开页面\
// //						mmy_interface.mmy.usercenter.go2Ucenter();
// 					}
// 				}
				
// 				if(this.iFBOffY<0)this.iFBOffY=0;
// 				else if(this.iFBOffY+60>GmConfig.SCRH)this.iFBOffY=GmConfig.SCRH-60;
// 				if(msg==3)this.bLockFB=false;
// 				return true;
// 			}
// 		}
// 		return false;
	}
	QUDAO()
	{
		return GameVersion.QUDAO;
	}
}

PublicInterface.pp=null;
PublicInterface.gi=function()
{
	if(PublicInterface.pp==null)PublicInterface.pp=new PublicInterface();
	return PublicInterface.pp;
}

PublicInterface.QUDAO=0;
if("undefined" != typeof wx)
{//微信平台
	PublicInterface.QUDAO=1;
}