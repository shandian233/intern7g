import _AMESSAGE from "./_AMESSAGE"
import XDefine from "../../config/XDefine"

export default class _MESSAGEBUFFER
{
	constructor()
	{
        this.MAXRECVBUFFERCOUNT=64;
        this.MAXSENDBUFFERCOUNT=64;

		var i;
		this.iRecvHead=0;
		this.iRecvTail=0;
		this.recv=new Array(this.MAXRECVBUFFERCOUNT);//
		for(i=0;i<this.MAXRECVBUFFERCOUNT;i++)this.recv[i]=new _AMESSAGE();
		this.recvout=new _AMESSAGE();
		
		this.iSendHead=0;
		this.iSendTail=0;
		this.send=new Array(this.MAXSENDBUFFERCOUNT);//
		for(i=0;i<this.MAXSENDBUFFERCOUNT;i++)this.send[i]=new _AMESSAGE();
		this.sendout=new _AMESSAGE();
		
		this.bStartMessage=false;
		this.bEndMessage=false;
		this.startmessage=new _AMESSAGE();
		this.endmessage=new _AMESSAGE();
	}
	 ResetQueue()
	{
		this.iRecvHead=0;
		this.iRecvTail=0;
		this.iSendHead=0;
		this.iSendTail=0;
	}
	
	 SetStartMessage( size, buf)
	{
		this.startmessage.iSize=size;
		XDefine.arraycopy(buf, 0, this.startmessage.data, 0, size);
		this.bStartMessage=true;
	}
	 SetEndMessage( size, buf)
	{
		this.endmessage.iSize=size;
		XDefine.arraycopy(buf, 0, this.endmessage.data, 0, size);
		this.bEndMessage=true;
	}
	
	 InSendQueue( size, buf)
	{
		while(this.iSendTail-this.iSendHead>=this.MAXSENDBUFFERCOUNT)
		{
//			if(!slp->bUseing)return false;
			return false;
		}
		var j=this.iSendTail%this.MAXSENDBUFFERCOUNT;
		this.send[j].iSize=size;
		XDefine.arraycopy(buf, 0,this.send[j].data,0,size);
		this.iSendTail++;
		return true;
	}
	 OutSendQueue()
	{
		if(this.iSendTail-this.iSendHead<=0)return false;
		this.sendout.copyfrom(this.send[this.iSendHead%this.MAXSENDBUFFERCOUNT]);
		this.iSendHead++;
		return true;
	}
	
	 InRecvQueue( size, buf)
	{
		while(this.iRecvTail-this.iRecvHead>=this.MAXRECVBUFFERCOUNT)
		{
			return false;
		}
//		if (isFull) DebugOutput("满了~\n");

		var j=this.iRecvTail%this.MAXRECVBUFFERCOUNT;
		this.recv[j].iSize=size;
		XDefine.arraycopy(buf, 0,this.recv[j].data,0,size);
		this.iRecvTail++;
		return true;
	}
	 OutRecvQueue()
	{
		if(this.iRecvTail-this.iRecvHead<=0)return false;
		this.recvout.copyfrom(this.recv[this.iRecvHead%this.MAXRECVBUFFERCOUNT]);
		this.iRecvHead++;
		return true;
	}
}

