/*import XStat from "../engine/XStat"

import M2DFast from "../engine/graphic/M2DFast"
import XDefine from "./XDefine"
import GmConfig from "../game/GmConfig";
import GmRes from "../game/GmRes";

import XNetFast from "./XNetFast"
import PackageTools from "./PackageTools"
import PublicInterface from "./interface/PublicInterface"

import XWavFast from "./XWavFast"
import GmSet from "../game/play/GmSet";
import GmSave from "../game/play/GmSave";*/

import GmPlay from "../engtst/mgm/GmPlay"
import XTouchManager from "../engine/XTouchManager"
import XDefine from "../config/XDefine"
import M3DFast from "../engine/graphics/M3DFast"
import GmConfig from "../config/GmConfig";
import SystemOperate from "../engtst/mgm/gameing/fast/SystemOperate";
import TouchManager from "../engine/TouchManager";
import XInput from "../engine/control/XInput";
import PackageTools from "../engine/PackageTools";
import PublicInterface from "../zero/Interface/PublicInterface";

export default class XOLE {
    constructor()
    {
        this.startTime  = Date.now();
        this.frameCount = 0;
        /*
        // GmEffect.gi();
        Laya.SoundManager.autoReleaseSound=false;
        this.pntf=XNetFast.gi();
        this.ppi=PublicInterface.gi();
        // var pls=PackageTools.gi();
        // pls.iOffset=0;
        // pls.InsertInt(123);
        // pls.InsertString("hello");
        // this.pntf.Send(2000,pls.databuf,pls.iOffset);
        XDefine.sop("start");

        this.iErrorDelay=0;
        this.sErrorDetail="";
        GmRes.rid_loading=M2DFast.gi().LoadImage("res/pic/logo.png",true);

        GmSet.gi().Init();
        // for(var i=0;i<30;i++)XNumber.gi(i);
        */
    }
    SetError(s)
    {
        this.iErrorDelay=5*30;
        this.sErrorDetail=s;
    }
    Init()
    {
        XInput.make_handle();
        Laya.timer.frameLoop(3, this, this.OnTimer);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, _mouse_down_func);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, _mouse_move_func);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, _mouse_up_func);

        Laya.stage.on(Laya.Event.FOCUS, this, _onFocus);//焦点回来
        Laya.stage.on(Laya.Event.BLUR, this, _onBlur);

//        XStat.gi().PushStat(XStat.STAT_LOADING);
        XTouchManager.gi().Init();
    }

    
    OnTimer()
    {
        // this.frameCount++;
        // const currentTime = Date.now();
        // const elapsedTime = currentTime - this.startTime;
        // if (elapsedTime >= 1000) {
        //   const fps = this.frameCount / (elapsedTime / 1000);
        //   console.log(`帧率: ${fps.toFixed(2)}`);
        //   this.frameCount = 0;
        //   this.startTime = currentTime;
        // }

        XInput.HandleLogic2();
        // if(XInput.lock_x!=null)XInput.lock_x.bShowing=false;
        PublicInterface.gi().Logic();
        XOLE.iDelay++;
        // if(!GmMap.bWaiting && GmMap.iMapStat<16 && XTouchManager.TOUCH_STAT==3 && !GmMap.bPaused)
        // {//减速
        //     if(XOLE.iSlowDelay<20)XOLE.iSlowDelay++;
        //     XOLE.iSlowDelay=0;
        // }
        // else if(XOLE.iSlowDelay>15)XOLE.iSlowDelay--;
        // else XOLE.iSlowDelay=0;

        // if(XOLE.iSlowDelay>=20)XOLE.iSlowRate=10;
        // else XOLE.iSlowRate=1;
        
//        XDefine.InitSecond();

        GmConfig.SYSW=Laya.stage.width;
        GmConfig.SYSH=Laya.stage.height;
        GmConfig.OX=(GmConfig.SYSW-1280)/2;
        SystemOperate.BASEW=Laya.stage.width;
        SystemOperate.BASEH=Laya.stage.height;
        SystemOperate.SetScreenMode(6);
        //GmConfig.SYSW=width;
        //GmConfig.SYSH=height;

        //SystemOperate.SetScreenMode(6);

        M3DFast.gi().Clear();

        GmPlay.gi().GmTimer();
        PublicInterface.gi().DrawBoundRect();

        // if(XInput.input_handle!=null)
        // {
        //     if(XInput.lock_x!=null)// && XInput.lock_x.bShowing)
        //     {
        //         XInput.lock_x.sDetail=XInput.input_handle.text;
        //         // XInput.input_handle.pos(XInput.lock_x.iX,XInput.lock_x.iY);
        //         // XInput.input_handle.width=XInput.lock_x.iW;
        //         // XInput.input_handle.height=XInput.lock_x.iH;

        //         // XInput.input_handle.pos(0,0);
        //         // XInput.input_handle.width=Laya.stage.width;
        //         // XInput.input_handle.height=Laya.stage.height;
        //     }
        //     else
        //     {
        //         XInput.input_handle.pos(-1,-1);
        //         XInput.input_handle.width=1;
        //         XInput.input_handle.height=1;
        //     }
        // }
        XInput.HandleLogic();
        return;

        XStat.gi().Draw();

        while(true)
        {
            var ret=XTouchManager.gi().PopTouch();
            if(ret==null)break;
            XStat.gi().ProcTouch(ret.type,ret.x,ret.y);
        }
        this.pntf.Logic();
        this.ppi.Logic();

        // GmSave.gi().LoadLogic();
        GmSave.gi().SaveLogic();
        // GmSave.gi().SaveLogic();

        if(this.iErrorDelay>0)
        {
            this.iErrorDelay--;
            M2DFast.gi().DrawTextEx(320+2,400+2,this.sErrorDetail,0xffffff,45,100,1,1,0,-2,-2);
            M2DFast.gi().DrawTextEx(320,400,this.sErrorDetail,0xff0000,45,100,1,1,0,-2,-2);
        }

        // if(XOLE.iSlowDelay>15)
        // {
        //     M2DFast.pm2f.FillRect(0,0,Laya.stage.width,Laya.stage.height,0,1,(XOLE.iSlowDelay-15)*6);
        //     if(XOLE.iSlowDelay>=20)
        //     {
        //         // GmMap.gi().DrawKeepItem2();
        //     }
        // }

        // Laya.SoundManager.autoStopMusic=false;
        // M2DFast.gi().DrawTextEx(100,100,"背景音乐（不包括音效）是否静音"+Laya.SoundManager.musicMuted,0xffffff,30,100,1,1,0,-1,-1);
        // M2DFast.gi().DrawTextEx(100,100+40,"失去焦点后是否自动停止背景音乐"+Laya.SoundManager.autoStopMusic,0xffffff,30,100,1,1,0,-1,-1);
        // M2DFast.gi().DrawTextEx(100,100+40*2,"背景音乐和所有音效是否静音"+Laya.SoundManager.muted,0xffffff,30,100,1,1,0,-1,-1);
        // M2DFast.gi().DrawTextEx(100,100+40*3,"所有音效（不包括背景音乐）是否静音"+Laya.SoundManager.soundMuted,0xffffff,30,100,1,1,0,-1,-1);
        // M2DFast.gi().DrawTextEx(100,100+40*4,"音效音量"+Laya.SoundManager.soundVolume,0xffffff,30,100,1,1,0,-1,-1);
// XDefine.showdebug();


        // M2DFast.gi().DrawTextEx(200,700,this.iCheckCount+",,"+XTouchManager.gi()._test(),0xffffff,50,101,1,1,0,-2,-2);
        // M2DFast.gi().DrawTextEx(720,1280,"+",0xffffff,50,101,1,1,0,-2,-2);

        // M2DFast.gi().DrawRect(0,0,640,1136,0xff0000)
        // M2DFast.gi().DrawCircle(100,100,100,0xff0000);
        // M2DFast.gi().DrawTextEx(100,100,Laya.Browser.clientWidth+","+Laya.Browser.clientHeight,0xffffff,50,101,1,1,0,-2,-2);

        // M2DFast.gi().DrawTextEx(100,200,Laya.stage.width+","+Laya.stage.height,0xffffff,50,101,1,1,0,-2,-2);

        

        // M2DFast.gi().DrawTextEx(0,0,"abc",0xffffff,30,101,1,1,this.iDelay++,-2,-2);
        // M2DFast.gi().DrawTextEx(0,0,"def",0xffffff,30,101,1,1,this.iDelay,-2,-2);
        // M2DFast.gi().DrawTextEx(0,0,"ghi",0xffffff,30,101,1,1,this.iDelay,-3,-3);
        
    }
    get_file_string(fn)
    {
        var pls=this.get_file_data(fn);
        return pls.byteToString(pls.databuf,pls.iLength);
    }
    get_file_data(fn)
    {
        for(var i=0;i<XOLE.data_all.length;i+=2)
        {
            if(fn==XOLE.data_all[i])
            {
                var pls=PackageTools.gi();
                pls.GetData2(XOLE.data_all[i+1]);
                pls.Decode_base64();
                return pls;
            }
        }
        return null;
    }
}
XOLE._float=function(distance,offset)
{
    var i=(XOLE.iDelay+offset)%(distance*2);
    if(i<distance)return i;
    else return distance*2-i;
}
XOLE.data_all=null;

XOLE.iSlowRate=1;
XOLE.iSlowDelay=0;
XOLE.iDelay=0;
XOLE.pole=null;
XOLE.gi=function()
{
    if(XOLE.pole==null)XOLE.pole=new XOLE();
    return XOLE.pole;
}

function _mouse_down_func()
{
    TouchManager.gi().touch_down(0,Laya.stage.mouseX,Laya.stage.mouseY);
//    XTouchManager.gi().TouchDown(0,Laya.stage.mouseX,Laya.stage.mouseY);
}
function _mouse_move_func()
{
    TouchManager.gi().touch_move(Laya.stage.mouseX,Laya.stage.mouseY);
//    XTouchManager.gi().TouchMove(0,Laya.stage.mouseX,Laya.stage.mouseY);
}
function _mouse_up_func()
{
    TouchManager.gi().touch_up(0,Laya.stage.mouseX,Laya.stage.mouseY);
//    XTouchManager.gi().TouchUp(0,Laya.stage.mouseX,Laya.stage.mouseY);
};

function _onFocus()
{
    //XOLE.gi().SetError("_onFocus");
};

function _onBlur()
{
    //XOLE.gi().SetError("_onBlur");
};