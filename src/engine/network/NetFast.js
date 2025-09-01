import XDefine from "../../config/XDefine";
import PackageTools from "../PackageTools";
import GmPlay from "../../engtst/mgm/GmPlay";
import XStat from "../../engtst/mgm/XStat";
import GmProtocol from "../../engtst/mgm/GmProtocol";
import _MESSAGEBUFFER from "./_MESSAGEBUFFER";
export default class NetFast {
  constructor(desturl) {
    this.socket = new Laya.Socket();

    this.socket.on(Laya.Event.OPEN, this, this.onConnect);
    this.socket.on(Laya.Event.MESSAGE, this, this.onReceive);
    this.socket.on(Laya.Event.CLOSE, this, this.onClose);
    this.socket.on(Laya.Event.ERROR, this, this.onError);

    this.sConnectUrl = desturl;
    //this.sConnectUrl="ws://"+ip+":"+port;
    this.socket.connectByUrl(this.sConnectUrl);
    // this.socket.connect(ip,port);

    this.bConnected = false;
    this.pls = new PackageTools(10240);
    this.pls_package = new PackageTools(10240);
    this.pls_ext = new PackageTools(10240);

    this.msg = new _MESSAGEBUFFER();
    this.iLastSendMs = XDefine.get_ms();
    this.bAllow = true;
    this.bReconnect = false;
    this.byte = new Laya.Byte();

    this.bWaitingClose = false;
    /*
    	iLastConnectDelay=0;
    	iMaxConnectDelay=0;
    	iStat=0;
    	recvhead=new Int8Array(10);//
    	
    	this.ResetSever(ip,port);
 //   	this.ResetSever("192.168.1.100",8002);
//    	this.Init1();
    	
        thread = new Thread(this);
		thread.start();*/

    this.iReconnectDelay = 0;
    this.iReTryCount = 0;
  }

  onConnect() {
    this.bConnected = true;
    XDefine.sop("onConnect");
    if (GmPlay.gi().mapChanging.changed) {
      // 如果已经地图传送，重连的时候再传送一次
      let type = GmPlay.gi().mapChanging.type;
      let dest = GmPlay.gi().mapChanging.dest;
      GmProtocol.gi().s_ChangeMapNew(type, dest);
    }
  }

  onReceive(msg) {
    //XDefine.sop("onReceive");
    this.byte.clear();
    this.byte.writeArrayBuffer(msg);
    this.byte.pos = 0;
    for (var i = 0; i < this.byte.length; i++) {
      var b = this.byte.getByte();
      if (b < 0) {
        b = 256 + b;
      }
      this.pls_package.databuf[i] = b;
    }
    this.pls_package.iLength = this.byte.length;
    this.pls_package.iOffset = 0;

    this.AnalyzePackage();
  }
  onClose() {
    XDefine.sop("onClose");
    this.bConnected = false;
    this.bWaitingClose = false;
  }
  onError() {
    XDefine.sop("onError");
    this.socket.close();
    this.bConnected = false;
  }

  Init1() {
    this.pls_ext.iOffset = 0;
    this.pls_ext.InsertInt(0);
    this.pls_ext.InsertInt(0);
    this.pls_ext.InsertInt(0);
    this.InQueue(500, this.pls_ext.iOffset, this.pls_ext.databuf);
  }

  InQueue(iid, ilen, data) {
    XDefine.sop("---send " + iid + " : " + ilen);
    this.pls.iOffset = 0;
    this.pls.InsertShort(iid);
    XDefine.arraycopy(data, 0, this.pls.databuf, this.pls.iOffset, ilen);
    return this.msg.InSendQueue(this.pls.iOffset + ilen, this.pls.databuf);
  }

  GetQueue() {
    return this.msg.OutRecvQueue();
  }

  CreatePackage() {
    var i = 0;
    if (XStat.gi().bGameing()) GmProtocol.gi().s_UploadMyPos();
    this.pls_package.iOffset = 10;
    if (this.msg.bStartMessage) {
      this.pls_package.InsertData(
        this.msg.startmessage.data,
        this.msg.startmessage.iSize
      );
      i++;
    } else if (this.msg.iSendTail - this.msg.iSendHead <= 0) {
      //没有头，并且没有身体
      this.Init1();
      //			GmPlay.sop("Init1");
    }
    while (this.msg.OutSendQueue()) {
      this.pls_package.InsertData(
        this.msg.sendout.data,
        this.msg.sendout.iSize
      );
      i++;
      if (this.pls_package.iOffset >= 1024) break;
    }
    if (this.msg.bEndMessage) {
      this.pls_package.InsertData(
        this.msg.endmessage.data,
        this.msg.endmessage.iSize
      );
      i++;
    }
    this.pls_package.databuf[this.pls_package.iOffset++] = "E".charCodeAt(0);
    this.pls_package.databuf[this.pls_package.iOffset++] = "O".charCodeAt(0);
    this.pls_package.databuf[this.pls_package.iOffset++] = "F".charCodeAt(0);
    this.pls_package.databuf[0] = "s".charCodeAt(0);
    this.pls_package.databuf[1] = "o".charCodeAt(0);
    this.pls_package.databuf[2] = "s".charCodeAt(0);
    this.pls_package.databuf[3] = 0;
    this.pls_package.databuf[4] = 0;
    this.pls_package.databuf[5] = 0;
    this.pls_package.databuf[6] = 0;
    this.pls_package.databuf[7] = i;
    this.pls_package.databuf[8] = (this.pls_package.iOffset >> 8) & 0xff;
    this.pls_package.databuf[9] = this.pls_package.iOffset & 0xff;
  }

  Sleep(t) {
    Thread.sleep(t);
  }
  send() {
    for (var i = 0; i < this.pls_package.iOffset; i++) {
      this.socket.output.writeByte(this.pls_package.databuf[i]);
    }
    this.socket.flush();

    return true;
  }
  recv() {
    var i;

    this.pls_package.iLength = 0;
    while (true) {
      // 			long t1,t2;
      // 			t1=XDefine.get_ms();
      i = m_is.read(
        this.pls_package.databuf,
        this.pls_package.iLength,
        1024 * 2
      );
      //  			t2=XDefine.get_ms()-t1;
      //  			if(t2>500)GmPlay.sop("555555555");
      //  			GmPlay.sop("recv size = "+i);
      if (i <= 0) break;
      this.pls_package.iLength += i;
      if (
        this.pls_package.databuf[this.pls_package.iLength - 3] == "E" &&
        this.pls_package.databuf[this.pls_package.iLength - 2] == "O" &&
        this.pls_package.databuf[this.pls_package.iLength - 1] == "F"
      ) {
        this.pls_package.iOffset = 0;
        return true;
      }
      if (iLastConnectDelay > 1000) {
        this.bReconnect = true;
        break;
      }
    }

    return false;
  }
  AnalyzePackage() {
    var mcount;
    var realen;
    var p = 0;

    if (this.pls_package.iLength < 13 || this.pls_package.iLength >= 4096)
      return -1;
    realen =
      ((this.pls_package.databuf[p + 8] << 8) & 0xff00) |
      (this.pls_package.databuf[p + 9] & 0xff);
    if (realen == 0) {
    }
    if (this.pls_package.iLength < realen || realen < 13 || realen >= 4096)
      return -1;
    mcount = this.pls_package.databuf[p + 7];
    //		for(int i=0;i<this.pls_package.iLength;i++)System.out.println("ii="+i+"="+this.pls_package.databuf[i]);

    this.pls_package.iOffset = 10;
    //		this.pls_package.iOpenType=1;
    while (mcount > 0) {
      this.pls_package.GetNextData();
      this.msg.InRecvQueue(this.pls_package.obi, this.pls_package.obd);
      mcount--;
    }

    return realen;
  }
  //	long lstart,lend;
  ResetSever(desturl) {
    if (this.sConnectUrl == desturl) return;
    this.sConnectUrl = desturl;
    XDefine.sop("ResetSever:" + desturl);
    this.msg.ResetQueue();
    this.bReconnect = true;
    this.socket.close();

    this.bWaitingClose = true;
  }
  NetLogic() {
    if (!this.bAllow) return;
    if (this.bWaitingClose) return;
    if (!this.bConnected) {
      if (this.bReconnect) {
        // this.socket=new Laya.Socket();
        // this.socket.on(Laya.Event.OPEN,this,this.onConnect);
        // this.socket.on(Laya.Event.MESSAGE,this,this.onReceive);
        // this.socket.on(Laya.Event.CLOSE,this,this.onClose);
        // this.socket.on(Laya.Event.ERROR,this,this.onError);

        this.socket.connectByUrl(this.sConnectUrl);
        XDefine.sop("do connect");
        this.bReconnect = false;
      } else if (this.iReTryCount < 10) {
        this.iReconnectDelay++;
        if (this.iReconnectDelay >= 60) {
          this.iReconnectDelay = 0;
          this.bReconnect = true;
          this.iReTryCount++;
        }
      }
      return;
    }

    if (this.iLastSendMs + 600 > XDefine.get_ms()) return;
    this.iLastSendMs = XDefine.get_ms();
    this.CreatePackage();
    this.send();

    //    		this.recv();

    //    		this.AnalyzePackage();
  }
  //    long ltime1,ltime2;
  //    boolean bWatching;
  //   int iNetBusy=0;
  NetBusy() {
    /*    	var i;
    	if(bWatching)
    	{
    		ltime2=(XDefine.get_ms()-ltime1)/1000;
    		if(ltime2<10)i= ltime2;
    		else i=10;
    		if(iNetBusy<i)iNetBusy=i;
    	}
		return iNetBusy;*/
    return 3;
  }

  InitClient(ip, port) {
    //

    //       	SeverURL.delete(0, SeverURL.length).append("http://").append(ip).append(":").append(port);
    //           SeverURL.delete(0, SeverURL.length).append("socket://").append(ip).append(":").append(port);
    //            nc = (StreamConnection) Connector.open(SeverURL.toString());
    //            m_os = nc.openOutputStream();
    //            m_is = nc.openInputStream();
    //            System.out.println(SeverURL.toString());
    //            URL url = new URL(SeverURL.toString());
    //            System.out.println(SeverURL.toString());
    GmPlay.sop("connect:" + ip + ":" + port);
    sock = new Socket(ip, port);
    //            GmPlay.sop("connect ok");
    m_os = sock.getOutputStream();
    m_is = sock.getInputStream();
    //            nc = url.openConnection();
    //            m_os = nc.getOutputStream();
    //            m_is = nc.getInputStream();
    /*
        } catch (IOException e) {
            // TODO Auto-generated catch block
 //           e.printStackTrace();
            CloseClient();
            GmPlay.sop("Connect Failed !!!");
            iNetBusy=10;
            return false;
        }*/
    return true;
  }
  CloseClient() {
    if (m_os != null) m_os.close();
    m_os = null;
    if (m_is != null) m_is.close();
    m_is = null;
    if (sock != null) sock.close();
    sock = null;
  }
}
