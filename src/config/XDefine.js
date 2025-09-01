import XStat from "../engtst/mgm/XStat";

export default class XDefine
{
    constructor()
    {

    }
}

XDefine.RECORDFILENAME="record.dat";
XDefine.PRIVATECHATRECORD="chatrecord.dat";

XDefine.bInRect=function( x , y, rx, ry, rw, rh)
	{
		if(x<=rx)return false;
		if(y<=ry)return false;
		if(x>=rx+rw)return false;
		if(y>=ry+rh)return false;
		return true;
	}
    XDefine.bInLX=function( x, y, lx, ly, lw, lh)
	{//点是否在菱形内
		if(x<lx-lw/2)return false;
		if(x>lx+lw/2)return false;
		if(y<ly-lh/2)return false;
		if(y>ly+lh/2)return false;
		x=lx>x?lx-x:x-lx;
		y=ly>y?ly-y:y-ly;
		y=y*lw/lh;
		if(x+y>lw/2)return false;
		
		return true;
	}
	XDefine.bOnRect=function( x , y, rx, ry, rw, rh)
	{
		if(x<rx)return false;
		if(y<ry)return false;
		if(x>rx+rw)return false;
		if(y>ry+rh)return false;
		return true;
	}
	XDefine.llength=function( x1, y1, x2, y2)
	{
		return parseInt(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
	}
	XDefine.CalcRate=function( a, b, m)
	{
		return parseInt(1.0*a*m/b);
	}
	XDefine.PI=3.1415926;
	XDefine.GetAngleXY=function( dx, dy, ox, oy)
	{//角度
		var tx,ty,tjd;
		
		tx=dx-ox;
		ty=dy-oy;
		if(tx==0)tx=(0.0000001);
		tjd=(Math.atan(ty/tx));
		if(tx<0)tjd+=(XDefine.PI);

		return  parseInt(tjd*180/XDefine.PI);
	}
	XDefine.GetAngleXY_ext=function( dx, dy, ox, oy)
	{//弧度
		var tx,ty,tjd;
		
		tx=dx-ox;
		ty=dy-oy;
		if(tx==0)tx=(0.0000001);
		tjd=Math.atan(ty/tx);
		if(tx<0)tjd+=XDefine.PI;

		return tjd;
	}
	
	XDefine.ShowFM=function()
	{/*
		ActivityManager att=(ActivityManager)PublicInterface.mMain.getSystemService(Context.ACTIVITY_SERVICE);
		ActivityManager.MemoryInfo mi=new ActivityManager.MemoryInfo();
		att.getMemoryInfo(mi);
//		M3DFast.gi().DrawText_2(0, 60, "[FM:"+(mi.availMem/1024/1024)+"M]", 0xffffffff);
		M3DFast.gi().DrawText_2(0, 60, "[FM:"+(mi.availMem/1024/1024)+"M]", 0xffffffff, 30, 101, 1, 1, 0, 0, 0, 2, 0xff000000);
		GmPlay.sop1("[FM:"+(mi.availMem/1024/1024)+"M]");*/
	}

	XDefine.getFileMD5=function(file) 
	{
		  return "";
	}
	XDefine.SecondToTime=function( sec)
	{
		var i;
		var ret="";
		i=sec/3600;
		if(i==0)ret=ret+"00";
		else if(i<10)ret=ret+"0"+i;
		else ret=ret+i;
		ret+=":";
		i=sec/60%60;
		if(i==0)ret=ret+"00";
		else if(i<10)ret=ret+"0"+i;
		else ret=ret+i;
		ret+=":";
		i=sec%60;
		if(i==0)ret=ret+"00";
		else if(i<10)ret=ret+"0"+i;
		else ret=ret+i;
		return ret;
	}
	
	XDefine.HEX_DIGITS = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  'a', 'b', 'c', 'd', 'e', 'f' ];
	XDefine.toHexString=function(b)
	{
        var s=""; 
	    for (var i = 0; i < b.length; i++)
	    {
            s+=HEX_DIGITS[(b[i] & 0xf0) >> 4];
            s+=HEX_DIGITS[b[i] & 0x0f];
	    }
	    return s;
	}
	
    XDefine.grnd=function(min,max)
    {
        if(min>=max)return min;
        return Math.floor(Math.random()*(max-min+1))+min;
	}
	XDefine.GetRand=function(min,max)
    {
        if(min>=max)return min;
        return Math.floor(Math.random()*(max-min+1))+min;
	}

	/**
	 * 地图资源加载蒙版
	 * @param {number} state 加载状态 （1加载中 2加载完成）
	 */
	XDefine.addLoadMask = function(state){
		switch (state) {
			case 1:
				clearTimeout(this.id);
				if(!XStat.gi().CheckStat(XStat.GS_LOADING2)){
					XStat.gi().PushStat(XStat.GS_LOADING2);
				}
				break;
			case 2:
				this.id = setTimeout(()=>{
					if (XStat.gi().LastStatType(0) != XStat.GS_GAMEING){
						XStat.gi().PopStat(1);
					}
				},2000)
				break;
		}
	}

    XDefine.get_ms=function()
    {
        return Date.now();
    }

    XDefine._debuglist=null;
    XDefine.sop=function(s)
    {
		// if(s=="\"res/datapackage/uis/nui1/res9.png\",")
        // {
        //     var a=1;
        // }
        if(XDefine._debuglist==null)XDefine._debuglist=new Array(20);
    
        for(var i=20;i>0;i--)
        {
            XDefine._debuglist[i]=XDefine._debuglist[i-1];
        }
        XDefine._debuglist[0]=s;
        console.log(s);
    //    if(BridgeInterface.pp!=null)BridgeInterface.pp.SendMessage("log",s);
	}
	
XDefine.arraycopy=function(fromb, fromo, tod, too, len)
{
	for(var i=0;i<len;i++)
	{
		tod[too+i]=fromb[fromo+i];
	}
}

XDefine.BASE_URL="https://xiazai.qi-guo.cn/qiguo/xiaoyouxi/7g/";
//XDefine.BASE_URL="https://xiazai.qi-guo.cn/QiGuo_H5Res/";
//XDefine.BASE_URL="http://ccnto.f3322.net:5050/7g/";
// XDefine.BASE_URL="http://syno10c898ec20dc.qicp.vip:5050/7g/";
// XDefine.BASE_URL="http://139.129.160.118:9999/";