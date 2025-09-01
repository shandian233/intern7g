import XDefine from "../config/XDefine"
//import XOLE from "./XOLE";
//import XNetFast from "../engine/network/NetFast";
import GU from "./gbk"

var _plsbackcallfunc=null;
export default class PackageTools
{
    constructor(size)
    {
        if(size==null)size=1024 * 1024 * 4;
        // obs:"",
        // obi:0,

        this.bLoadSuccess=false,

        this.MAXDATALENGTH=size;
        //this.databuf=new ArrayBuffer(this.MAXDATALENGTH);
        this.databuf=new ArrayBuffer(this.MAXDATALENGTH);
        this.pdataview=new DataView(this.databuf);
        this.iLength=0;

        this.b64c=[
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
            'U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n',
            'o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7',
            '8','9','+','/','='];
        this._BASE64CODE=new ArrayBuffer(65);
        this._BASE64DECODE=new ArrayBuffer(256);
        for(var i=0;i<65;i++)
        {
            this._BASE64CODE[i] = this.b64c[i].charCodeAt(0);
            this._BASE64DECODE[this._BASE64CODE[i]] = i;
        }

        this.obd=new ArrayBuffer(64*1024);

        // iErrorID:0,
        // bCompress:false,
    }
    SetDataAndOffset(arr,off,len)
    {
        for(var i=0;i<len;i++)
        {
            this.databuf[i]=arr[i];
        }
        this.iLength=len;
        this.iOffset=off;
    }
    xordata( len)
	{
        for(var i=0;i<len;i++)
        {
            this.databuf[i]=(this.databuf[i]^0xff);
        }
	}
    SetData(arr,len)
    {
        for(var i=0;i<len;i++)
        {
            this.databuf[i]=arr[i];
        }
        this.iLength=len;
        this.iOffset=0;
    }
    GetData2(data)
    {
        this.iLength=data.length;
        for(var i=0;i<this.iLength;i++)
        {
            this.databuf[i]=data.charCodeAt(i);
            this.databuf[i]=this.databuf[i]&0xff;
        }

        this.iOffset=0;
        // this.bLoadSuccess=true;
        // if(this._plsbackcallfunc!=null)this._plsbackcallfunc();
    //    alert("fff");
    }
    GetData3(data)
    {
        var byte=new Laya.Byte();

        byte.clear();
        byte.writeArrayBuffer(data);
        byte.pos=0;
        var b;
        for(var i=0;i<byte.length;i++)
        {
            b=byte.getByte();
            if(b<0)b+=256;
            this.databuf[i]=b&0xff;
        }
        // for(var i=0;i<data.byteLength;i++)
        // {
        //     this.databuf[i]=data[i];
        // }
        this.iOffset=0;
        this.iLength=byte.length;
    }
    GetData(data)
    {
        if(data==null)
        {
            XDefine.sop("load failed "+this.load_fn);
            return;
        }
        XDefine.sop("load success "+this.load_fn);
//        XDefine.sop("len : "+data.length +","+data.substr(0,10));
    //    console.log("size = "+data.length);
    //    console.log(data);
   //     alert("eee"+pls.iLength);
   /*
        this.iLength=data.length;
        for(var i=0;i<this.iLength;i++)
        {
            this.databuf[i]=data.charCodeAt(i);
            this.databuf[i]=this.databuf[i]&0xff;
        }*/
        this.GetData3(data);

        this.iOffset=0;
        this.bLoadSuccess=true;
        if(this._plsbackcallfunc!=null)this._plsbackcallfunc();
    //    alert("fff");
    }
    GetProc(proc)
    {
        XDefine.sop("Loading Proc : "+proc);
    }
    InitDataFromURL(fn,backcall)
    {
        this._plsbackcallfunc=backcall;
        this.bLoadSuccess=false;
        this.load_fn=fn;
        //jQuery.get(BASE_URL+fn, "", this.GetData);
        Ld( fn,Laya.Handler.create(this, this.GetData),Laya.Handler.create(this, this.GetProc),Laya.Loader.BUFFER);
    }
    InitDataFromFile(fn,backcall)
    {
        //sop(fn);
        this._plsbackcallfunc=backcall;
        this.bLoadSuccess=false;
        this.load_fn=fn;
        //jQuery.get(BASE_URL+fn, "", this.GetData);
        Ld(XDefine.BASE_URL+fn,Laya.Handler.create(this, this.GetData),Laya.Handler.create(this, this.GetProc),Laya.Loader.BUFFER);
    }
    JS_DataFromLocal(k)
    {
        var s=localStorage.getItem(k);
        //console.log('ssssssss:',s);
        if(s==null || s == '')return false;
        this.iLength=s.length;
        this.iOffset=0;
        for(var i=0;i<this.iLength;i++)
        {
            this.databuf[i]=s.charCodeAt(i);
            this.databuf[i]=this.databuf[i]&0xff;
        }
        this.Decode_base64();
        return true;
    }
    JS_DataToLocal(k)
    {
        this.Encode_base64();
        localStorage.setItem(k,this.obs);
    }

    Encode_base64()
    {
        var i,p;
        var size = (this.iLength-this.iLength%3)/3;
        if (this.iLength % 3 != 0)size++;
        size *= 4;
        p = 0;
        var tmpbuf=this.obd;
        for(i=0;i<tmpbuf.length;i++)tmpbuf[i]=0;
        for (i = 0; i < this.iLength; i++)
        {
            switch (i % 3)
            {
            case 0:
                tmpbuf[p] = this.databuf[i] >> 2;
                p++;
                tmpbuf[p] = (this.databuf[i] & 0x03) << 4;
                break;
            case 1:
                tmpbuf[p] = tmpbuf[p] | (this.databuf[i] >> 4);
                p++;
                tmpbuf[p] = (this.databuf[i] & 0x0f) << 2;
                break;
            case 2:
                tmpbuf[p] = tmpbuf[p] | (this.databuf[i] >> 6);
                p++;
                tmpbuf[p] = this.databuf[i] & 0x3f;
                p++;
                break;
            }
        }
        this.obs="";
        for (i = 0; i < size; i++)
        {
            if (i > p)
            {
                this.databuf[i] = 64;
                this.obs+=this.b64c[64];
            }
            else if(tmpbuf[i]<64)
            {
                this.databuf[i] = this._BASE64CODE[tmpbuf[i]];
                this.obs+=this.b64c[tmpbuf[i]];
            }
            else
            {
                printf("error");
            }
        }
        this.iLength = size;
    }
    Decode_base64()
    {
        if ((this.iLength % 4) !== 0) return;
        var p = 0;
        var c = 0;
        var i;
        for (i = 0; i < this.iLength; i++)
        {
            if (this.databuf[i] === this._BASE64CODE[64])
            {
                this.iLength = p;
                return;
            }
            else c = this._BASE64DECODE[this.databuf[i]];
            switch (i % 4)
            {
                case 0:
                    this.databuf[p] = c << 2;
                    break;
                case 1:
                    this.databuf[p] |= c >> 4;
                    p++;
                    this.databuf[p] = (c & 0x0f) << 4;
                    break;
                case 2:
                    this.databuf[p] |= c >> 2;
                    p++;
                    this.databuf[p] = (c & 0x03) << 6;
                    break;
                case 3:
                    this.databuf[p] |= c;
                    p++;
                    break;
            }
        }
        this.iLength = p;
        for(i=0;i<p;i++)
        {
            this.databuf[i]=this.databuf[i]&0xff;
        }
    }

    /////////////////////////////////////////////////////////////////////////////////
    _GetNextString()
    {
        this.obs = "";
        if (this.iOffset < 0 || this.iOffset + 3 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset++] !== PackageTools.PTDT_STRING)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return 0;
            }
        }
        this.obi = this.databuf[this.iOffset++];
        if (this.obi < 0 || this.obi > 256) this.obi = 0;
        if (this.obi > 0)
        {
            var data = new Uint8Array(this.obi);
            for (var i = 0; i < this.obi; i++)
            {
                data[i] = this.databuf[this.iOffset + i];
            }
            //this.obs = this.byteToString(data);
            this.obs=GU.gb2312a_to_utf8(data);
            //var uint8array =  new TextEncoder("gbk",{ NONSTANDARD_allowLegacyEncoding: true }).encode(string);
        }//,&this.databuf[this.iOffset],this.obi);
        // else this.obs = "";
        this.iOffset += this.obi;
        return this.obi;
    }
    DataToString()
    {
        return this.obs;
    }
    str2UTF8(str)
    {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++)
        {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF)
            {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF)
            {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF)
            {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else
            {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    }
    unicode_to_utf8(b1,b2)
    {
        if(b1<0)b1=256+b1;
        if(b2<0)b2=256+b2;
        var c=(b1<<8)|b2;

        var enc = "";
        {// output value
            if (c<0x80) enc += String.fromCharCode(c);
            else if (c<0x800) enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F));
            else if (c<0x10000) enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F));
            else enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+(c&0x3F));
        }
        return enc;
    }
    StringToBuffer(s,buf)
    {
        for(var i=0;i<s.length;i++)
        {
            buf[i]=s.charCodeAt(i);
        }
        return i;
    }
    BufferToString(buf,size)
    {
        var data = new Int8Array(size);
        for (var i = 0; i < size; i++)
        {
            data[i] = buf[i];
        }
        return this.byteToString(data);
    }
    byteToString(arr)
    {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = arr.length;
    
        i = 0;
        while(i < len)
        {
            c = arr[i++];
            switch(c >> 4)
            { 
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
    
                case 12: case 13:
                // 110x xxxx   10xx xxxx
                    char2 = arr[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = arr[i++];
                    char3 = arr[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |((char2 & 0x3F) << 6) |((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }
    InsertString(str)
    {
//        var bytes=this.str2UTF8(str);
        var bytes=GU.utf8_to_gb2312a(str);
        if(this.iOffset<0 || this.iOffset+bytes.length+2>this.MAXDATALENGTH){this.iErrorID=PackageTools.PTEID_OUTOFMEMORY;return 0;}
        var p=this.iOffset;
        if(!this.bCompress)this.databuf[this.iOffset++]=PackageTools.PTDT_STRING;
        this.databuf[this.iOffset++]=bytes.length;
        for(var i=0;i<bytes.length;i++)
        {
            this.databuf[this.iOffset++]=bytes[i];
        }
        return this.iOffset-p;
    }

    GetNextString()
    {
        this._GetNextString();
        return this.obs;
    }
    //////////////////////////////////////////////////////////////////////////
    InsertInt(i){
        if (this.iOffset < 0 || this.iOffset + 5 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        var p = this.iOffset;
        if (!this.bCompress) this.databuf[this.iOffset++] = PackageTools.PTDT_INT;
        this.databuf[this.iOffset++] = (i >> 24) & 0xff;
        this.databuf[this.iOffset++] = (i >> 16) & 0xff;
        this.databuf[this.iOffset++] = (i >> 8) & 0xff;
        this.databuf[this.iOffset++] = i & 0xff;
        return this.iOffset - p;
    }
    GetNextInt()
    {
        if (this.iOffset < 0 || this.iOffset + 3 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset] != PackageTools.PTDT_INT)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return 0;
            }
            this.iOffset++;
        }

        this.obi = ((this.databuf[this.iOffset] << 24) | (this.databuf[this.iOffset + 1] << 16) | (this.databuf[this.iOffset + 2] << 8) | (this.databuf[this.iOffset + 3]));
        if(this.obi >= 0x80000000)
        {
            this.obi = this.obi - 0x100000000;
        }
        this.iOffset += 4;
        return this.obi;
    }
    InsertByte(b)
    {
        if(this.iOffset<0 || this.iOffset+2>this.MAXDATALENGTH){this.iErrorID=PackageTools.PTEID_OUTOFMEMORY;return 0;}
        var p=this.iOffset;
        if(!this.bCompress)this.databuf[this.iOffset++]=PackageTools.PTDT_BYTE;
        this.databuf[this.iOffset++]=b&0xff;
        return this.iOffset-p;
    }
    GetNextByte()
    {
        if (this.iOffset < 0 || this.iOffset + 2 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return -1;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset] != PackageTools.PTDT_BYTE)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return -1;
            }
            this.iOffset++;
        }
        this.obi = this.databuf[this.iOffset];
        if(this.obi >= (1<<7)) this.obi = this.obi - 0x100;
        this.iOffset ++;
        return this.obi;
    }
    InsertShort(s)
    {
        if (this.iOffset < 0 || this.iOffset + 3 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        var p = this.iOffset;
        if (!this.bCompress) this.databuf[this.iOffset++] = PackageTools.PTDT_SHORT;
        this.databuf[this.iOffset++] = (s >> 8) & 0xff;
        this.databuf[this.iOffset++] = s & 0xff;
        return this.iOffset - p;
    }
    GetNextShort()
    {
        if (this.iOffset < 0 || this.iOffset + 3 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset] != PackageTools.PTDT_SHORT)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return 0;
            }
            this.iOffset++;
        }
        this.obi = ((this.databuf[this.iOffset] << 8) | (this.databuf[this.iOffset + 1]));
        if(this.obi >= (1<<15)) this.obi = this.obi - 0x10000;
        this.iOffset += 2;
        return this.obi;
    }
    InsertData(d,len)
    {
        if (this.iOffset < 0 || this.iOffset + len + 2 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        var p = this.iOffset;
        if (!this.bCompress) this.databuf[this.iOffset++] = PackageTools.PTDT_DATA;
        this.databuf[this.iOffset++] = (len >> 8) & 0xff;
        this.databuf[this.iOffset++] = len & 0xff;
        for (var i = 0; i < len; i++)
        {
            this.databuf[this.iOffset++] = d[i];
        }
        return this.iOffset - p;
    }
    GetNextData()
    {
        if (this.iOffset < 0 || this.iOffset + 3 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset++] != PackageTools.PTDT_DATA)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return 0;
            }
        }
        this.obi = (this.databuf[this.iOffset] << 8) | this.databuf[this.iOffset + 1];
        this.iOffset += 2;

        
        var data=new Uint8Array(this.obi);
        for(var i=0;i<this.obi;i++)
        {
            this.obd[i]=this.databuf[this.iOffset+i];
            data[i]=this.databuf[this.iOffset+i];
        }
        this.obs=GU.gb2312a_to_utf8(data);
        //this.obs=this.byteToString(data);

        this.iOffset += this.obi;
        return this.obi;
    }
    InsertFloat(f)
    {
        if (this.iOffset < 0 || this.iOffset + 5 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        var p = this.iOffset;
        if (!this.bCompress) this.databuf[this.iOffset++] = PackageTools.PTDT_FLOAT;
        this.pdataview.setFloat32(0,f,true);
        for(var i=0;i<4;i++)
        {
            this.databuf[this.iOffset++]=this.pdataview.getInt8(i);
        }

        return this.iOffset - p;
    }
    GetNextFloat()
    {
        if (this.iOffset < 0 || this.iOffset + 5 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset++] != PackageTools.PTDT_FLOAT)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return 0;
            }
        }
        for(var i=0;i<4;i++)
        {
            this.pdataview.setInt8(i,this.databuf[this.iOffset+i]);
        }

        this.obf=this.pdataview.getFloat32(0,true);
//        console.log(""+this.obf);
        this.iOffset += 4;
        return this.obf;
    }
    InsertLong(i)
    {
        if (this.iOffset < 0 || this.iOffset + 5 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        var p = this.iOffset;
        if (!this.bCompress) this.databuf[this.iOffset++] = PackageTools.PTDT_LONG;
        var k;
        for(var j=0;j<8;j++)
        {
            k=i%256;
            this.databuf[this.iOffset+7-j]=k;
            i-=k;
            i/=256;
        }
        this.iOffset+=8;
        return this.iOffset - p;
    }
    GetNextLong()
    {
        if (this.iOffset < 0 || this.iOffset + 3 > this.MAXDATALENGTH)
        {
            this.iErrorID = PackageTools.PTEID_OUTOFMEMORY;
            return 0;
        }
        if (!this.bCompress)
        {
            if (this.databuf[this.iOffset] != PackageTools.PTDT_LONG)
            {
                this.iErrorID = PackageTools.PTEID_TYPEMISMATCH;
                return 0;
            }
            this.iOffset++;
        }
        //var uint8=new Uint8Array(8);
        //for(var i=0;i<8;i++)uint8[i]=this.databuf[this.iOffset+i];
        //this.obi=uint8[0]*0x100000000000000+uint8[1]*0x1000000000000+uint8[2]*0x10000000000+uint8[3]*0x100000000+uint8[4]*0x1000000+uint8[5]*0x10000+uint8[6]*0x100+uint8[7];
        this.obi=0;
        var i,j=1;
        for(i=0;i<8;i++)
        {
            this.obi+=this.databuf[this.iOffset+7-i]*j;
            j*=256;
        }
        // this.obi=uint8[0]*0x100000000000000+uint8[1]*0x1000000000000+uint8[2]*0x10000000000+uint8[3]*0x100000000+uint8[4]*0x1000000+uint8[5]*0x10000+uint8[6]*0x100+uint8[7];
        // this.obi = ((this.databuf[this.iOffset] << 56) | (this.databuf[this.iOffset+1] << 48) | (this.databuf[this.iOffset+2] << 40) | (this.databuf[this.iOffset+3] << 32) | (this.databuf[this.iOffset+4] << 24) | (this.databuf[this.iOffset + 5] << 16) | (this.databuf[this.iOffset + 6] << 8) | (this.databuf[this.iOffset + 7]));
        this.iOffset += 8;
        return this.obi;
    }
}
PackageTools.PTEID_NON =0
PackageTools.PTEID_OUTOFMEMORY =1
PackageTools.PTEID_TYPEMISMATCH =2

PackageTools.PTDT_BYTE=1
PackageTools.PTDT_SHORT=2
PackageTools.PTDT_INT=3//4字节
PackageTools.PTDT_STRING=4//<256字节
PackageTools.PTDT_DATA=5//<65536
PackageTools.PTDT_FLOAT=6//32位浮点数
PackageTools.PTDT_LONG=7//8字节

PackageTools.pls=null;
PackageTools.gi=function()
{
    if(PackageTools.pls==null)PackageTools.pls=new PackageTools();
    return PackageTools.pls;
}