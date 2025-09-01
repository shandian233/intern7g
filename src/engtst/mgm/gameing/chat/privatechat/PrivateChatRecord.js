import GmConfig from "../../../../../config/GmConfig"
import XDefine from "../../../../../config/XDefine"
import BaseClass from "../../../../../engine/BaseClass"
import XButton from "../../../../../engine/control/XButton"
import M3DFast from "../../../../../engine/graphics/M3DFast"
import XAnima from "../../../../../engine/graphics/XAnima"
import GmPlay from "../../../../../engtst/mgm/GmPlay"
import XStat from "../../../../../engtst/mgm/XStat"
import XRecordFast from "../../../../../engtst/mgm/History/XRecordFast"
import DrawMode from "../../../../../engtst/mgm/frame/DrawMode"
import FormatString from "../../../../../engtst/mgm/frame/format/FormatString"

import PrivateChat_Send from "./PrivateChat_Send"

class _ChatRecord
{
    constructor()
    {

    }
/*	public int fromid;
	public int toid;
	public String sName;
	public String sDetail;
	public String sTime;*/
}

export default class PrivateChatRecord extends BaseClass{
	
	
	 constructor( ani)
	{
		super();
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=600;
		this.iH=500;
//		this.iW=400;
//		this.iH=300;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		this.iOffY=0;
		this.bLock=false;
	}

	Draw()
	{
		var i;
		var x;
		var h;
		var offy;
		DrawMode.new_framewatch(this.iX, this.iY, this.iW, this.iH);
		M3DFast.gi().SetViewClip(this.iX+20, this.iY+20, this.iX+this.iW-20, this.iY+this.iH-20);
		x=this.iX+20;
		offy=this.iOffY+this.iY+20;
//		GmPlay.sop("fffffffff"+iRecordPoint);
		for(i=0;i<iRecordPoint;i++)
		{
			if(crs[i].fromid!=iRid && crs[i].toid!=iRid)continue;
			FormatString.gi().FormatEx(crs[i].sName+":"+crs[i].sDetail, this.iW-40,25,0,0,27);
//			GmPlay.sop("asdfsdffsdf"+x+"zzz"+offy);
			h=FormatString.gi().iH;
			FormatString.gi().Draw(x, offy);
			offy+=h+3;
			if(offy>=this.iY+this.iH-20)break;
		}
		if(i>=iRecordPoint)
		{//拉到顶了，不能再向上拉
			this.bCanDown=false;
		}
		else this.bCanDown=true;
		M3DFast.gi().NoClip();
	}
	ProcTouch( msg, x, y)
	{
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		if(msg==1)
		{//锁定位置
			if(XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))
			{
				this.bLock=true;
				this.iLockY=y;
			}
		}
		else if(msg==2)
		{//手指移动，上下拉动
			if(this.bLock)
			{
				var i=y-this.iLockY;
				if(i>0 && this.iOffY<0)this.iOffY+=i;
				else if(this.bCanDown)this.iOffY+=i;
				if(this.iOffY>0)this.iOffY=0;
				this.iLockY=y;
			}
		}
		else if(msg==3)
		{//解锁
			this.bLock=false;
		}
		return false;
	}
}

PrivateChatRecord.AddChatRecord=function( fid, tid, name, detail, time)
{
    crs[iRecordPoint]=new _ChatRecord();
    crs[iRecordPoint].fromid=fid;
    crs[iRecordPoint].toid=tid;
    crs[iRecordPoint].sName=name;
    crs[iRecordPoint].sDetail=detail;
    crs[iRecordPoint].sTime=time;
    iRecordPoint++;
    
    if(iRecordPoint>=PrivateChatRecord.MAXCHATRECORD)
    {
        var i;
        for(i=0;i<PrivateChatRecord.MAXCHATRECORD/2;i++)
        {
            crs[i]=crs[PrivateChatRecord.MAXCHATRECORD/2+i];
        }
        iRecordPoint=PrivateChatRecord.MAXCHATRECORD/2;
    }
}

PrivateChatRecord.OpenRecord=function( rid, name, rax)
{
    XRecordFast.iPrivateChatMode=1;
    PrivateChat_Send.OpenChat(rid, name,rax);
//		iRid=rid;
//		XStat.gi().PushStat(XStat.GS_PRIVATECHATRECORD);
}

PrivateChatRecord.iRid;
PrivateChatRecord.iRecordPoint=0;
PrivateChatRecord.MAXCHATRECORD=1000;
PrivateChatRecord.crs=new Array(PrivateChatRecord.MAXCHATRECORD);//
