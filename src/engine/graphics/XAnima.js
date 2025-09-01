import M3DFast from "./M3DFast"

import AnimaAction from "./AnimaAction"
import XDefine from "../../config/XDefine";
import LoadAnimaRes from "./LoadAnimaRes";
import PackageTools from "../PackageTools";


class _RESLIST
{
    constructor()
    {
        this.iRid=-1;
        this.sResName="";
        this.iLoadStat=0;
    }
}

class _BLOCKLIST{
    constructor()
    {
        this.iCp=0,
        this.iMx=0,
        this.iMy=0,
        this.iSw=0,
        this.iSh=0,
        this.iRa=0,
        this.bFlip=false
    }
}

class _FRAMELIST{
    constructor()
    {
        this.iFid=0;
        this.iDelay=0;
        this.iBlockCount=0;
        this.blocklist=null;
    }
}
class _ANIMALIST{
    constructor()
    {
        this.iAnimaId=0,
        this.sAnimaName="",
        this.iOx=0,
        this.iOy=0,
    
        this.iFrameCount=0,
        this.rect=[0,0,0,0],
        this.framelist=null;
    }
}

class _CUTLIST
{
    constructor()
    {
        this.iRp=0,
        this.iX=0,
        this.iY=0,
        this.iW=0,
        this.iH=0
    }
}

export default class XAnima{

    constructor()
    {
        this.pm3f=M3DFast.gi();
        this.iResCount=0;
        this.reslist=null,
    
        this.iAnimaCount=0,
        this.animalist=null,
    
        this.iCutCount=0,
        this.cutlist=null,
    
        this.pathname="";

        this.bLocal=null;
    }
    LoadInitRes(init_res)
    {
        var i,ret=0;
        for(i=0;i<this.iResCount;i++)
        {
            for(var j=0;j<init_res.length;j++){
                if(this.reslist[i].sResPath==init_res[j])break;
            }
            if(j < init_res.length){
                if(LoadAnimaRes.iLoadingCount>=LoadAnimaRes.iMaxLoadThread)return ret;
                if(this.reslist[i].iRid==-1){
                    this.reslist[i].iRid=M3DFast.gi().LoadImage(this.reslist[i].sResPath,this.bLocal);
                    LoadAnimaRes.iLoadingCount++;
                }
                else if(M3DFast.gi().FindImage(this.reslist[i].iRid)==null)LoadAnimaRes.iLoadingCount++;
                else ret++;
            }
        }
        return ret;
    }

    LoadRes(){
        var i;
        for(i=0;i<this.iResCount;i++){
            if(LoadAnimaRes.iLoadingCount>=LoadAnimaRes.iMaxLoadThread){
                return;
            }
            //console.log('加载角色资源：',this.reslist[i].sResPath,this.reslist[i].sResPath.indexOf("nroles"))
            //if(this.reslist[i].sResPath.indexOf("nroles") < 0) continue;
            if(this.reslist[i].iRid==-1){
                this.reslist[i].iRid=M3DFast.gi().LoadImage(this.reslist[i].sResPath,this.bLocal);
                this.reslist[i].iLoadStat=1;
                LoadAnimaRes.iLoadingCount++;
            }else if(M3DFast.gi().FindImage(this.reslist[i].iRid)==null){
                LoadAnimaRes.iLoadingCount++;
            }
        }
    }

    GetResLoadedCount()
    {
        var i,j=0;
        for(i=0;i<this.iResCount;i++)
        {
            if(this.reslist[i].iRid==-1)continue;
            if(M3DFast.gi().FindImage(this.reslist[i].iRid)!=null)j++;
        }
        return j;
    }
    IsResLoadedFinish()
    {
        return this.GetResLoadedCount()==this.iResCount;
    }
    LoadAnima_fullpath(pn,pls,blocal,call_back=null)
    {
        this.bLocal=blocal;
        this.pathname=pn;

        XAnima._PUT(this.pathname,this);

        this.GetAnimaData(this.pathname,this,0)

        this.load_finished=call_back;
        this.bLoadSuccess=false;
        return true;
    }
    GetAnimaData(filepath,pani,retry_time,data)
    {
        if(data==null)
        {//加载失败，重新加载
            if(retry_time>0)XDefine.sop("retry "+retry_time+","+filepath);
            //console.log('filepath：加载动画：',filepath)
            Laya.loader.load(XDefine.BASE_URL+ filepath+"/xa.ax",Laya.Handler.create(pani, pani.GetAnimaData,[filepath,pani,retry_time+1]),null,Laya.Loader.BUFFER);
            return;
        }
        var pls=PackageTools.gi();
        pls.GetData3(data);
        //console.log('二进制数据：',data);
        // XDefine.sop("loaded anima : "+filepath)
        pani._LoadAnima(filepath,pls,pani.bLocal);
        if(this.load_finished!=null)this.load_finished();
        this.bLoadSuccess=true;
    }
    _LoadAnima(pn,pls,blocal)
    {
        this.bLocal=blocal;
        this.pathname=pn;
        var i,j,k;
        var iVar=pls.GetNextByte();
        pls.GetNextByte();

        this.iResCount=pls.GetNextShort();
        this.reslist=new Array(this.iResCount);
        for(i=0;i<this.iResCount;i++)
        {
            this.reslist[i]=new _RESLIST();
            this.reslist[i].iRid=pls.GetNextShort();
            this.reslist[i].sResName=pls.GetNextString();
            this.reslist[i].sResPath=this.pathname+"/"+this.reslist[i].sResName;
            this.reslist[i].iRid=-1;
            this.reslist[i].bNotUsed=true;

}

        this.iAnimaCount=pls.GetNextShort();
        this.animalist=new Array(this.iAnimaCount);
        for(i=0;i<this.iAnimaCount;i++)
        {
            this.animalist[i]=new _ANIMALIST();
            this.animalist[i].iAnimaId=pls.GetNextShort();
            this.animalist[i].sAnimaName=pls.GetNextString();
            pls.GetNextString();
            this.animalist[i].iOx=pls.GetNextShort();
            this.animalist[i].iOy=pls.GetNextShort();
            pls.GetNextShort();
            pls.GetNextShort();

            this.animalist[i].iFrameCount=pls.GetNextShort();
            this.animalist[i].framelist=new Array(this.animalist[i].iFrameCount);
            for(j=0;j<this.animalist[i].iFrameCount;j++)
            {
                this.animalist[i].framelist[j]=new _FRAMELIST();
                this.animalist[i].framelist[j].iFid=pls.GetNextShort();
                this.animalist[i].framelist[j].iDelay=pls.GetNextShort();
                this.animalist[i].framelist[j].iBlockCount=pls.GetNextShort();
                this.animalist[i].framelist[j].blocklist=new Array(this.animalist[i].framelist[j].iBlockCount);
                for(k=0;k<this.animalist[i].framelist[j].iBlockCount;k++)
                {
                    this.animalist[i].framelist[j].blocklist[k]=new _BLOCKLIST();

                    this.animalist[i].framelist[j].blocklist[k].iCp=pls.GetNextShort();

                    if(iVar==10)
                    {
                        this.animalist[i].framelist[j].blocklist[k].iMx=pls.GetNextShort();
                        this.animalist[i].framelist[j].blocklist[k].iMy=pls.GetNextShort();
                        this.animalist[i].framelist[j].blocklist[k].iSw=pls.GetNextShort();
                        this.animalist[i].framelist[j].blocklist[k].iSh=pls.GetNextShort();
                        this.animalist[i].framelist[j].blocklist[k].iRa=pls.GetNextShort();
                        this.animalist[i].framelist[j].blocklist[k].fAlpha=pls.GetNextShort()/100;   
                        if((this.animalist[i].framelist[j].blocklist[k].iRa&0x1000)==0x1000)
                        {
                            this.animalist[i].framelist[j].blocklist[k].bFlip=true;
                            this.animalist[i].framelist[j].blocklist[k].iRa-=0x1000;
                        }
                    }
                    else
                    {
                        this.animalist[i].framelist[j].blocklist[k].iMx=pls.GetNextFloat();
                        this.animalist[i].framelist[j].blocklist[k].iMy=pls.GetNextFloat();
                        this.animalist[i].framelist[j].blocklist[k].iSw=pls.GetNextFloat();
                        this.animalist[i].framelist[j].blocklist[k].iSh=pls.GetNextFloat();
                        this.animalist[i].framelist[j].blocklist[k].iRa=pls.GetNextFloat();
                        this.animalist[i].framelist[j].blocklist[k].fAlpha=pls.GetNextShort()/100;
    
                        if(pls.GetNextByte()==1)this.animalist[i].framelist[j].blocklist[k].bFlip=true;
                    }
                }
            }
        }
        this.iCutCount=pls.GetNextShort();
        this.cutlist=new Array(this.iCutCount);
        for(i=0;i<this.iCutCount;i++)
        {
            this.cutlist[i]=new _CUTLIST();
            this.cutlist[i].iRp=pls.GetNextShort();
            this.cutlist[i].iX=pls.GetNextShort();
            this.cutlist[i].iY=pls.GetNextShort();
            this.cutlist[i].iW=pls.GetNextShort();
            this.cutlist[i].iH=pls.GetNextShort();
        }

        var ap,cp,x,y,w,h;
        for(ap=0;ap<this.iAnimaCount;ap++)
        {
            this.animalist[ap].rect[0]=99999999;
            this.animalist[ap].rect[1]=99999999;
            this.animalist[ap].rect[2]=-99999999;
            this.animalist[ap].rect[3]=-99999999;

            for(i=0;i<this.animalist[ap].iFrameCount;i++)
            {
                for(j=0;j<this.animalist[ap].framelist[i].iBlockCount;j++)
                {
                    cp=this.animalist[ap].framelist[i].blocklist[j].iCp;

                    x=this.animalist[ap].framelist[i].blocklist[j].iMx;
                    y=this.animalist[ap].framelist[i].blocklist[j].iMy;

                    w=parseInt(0.01*this.animalist[ap].framelist[i].blocklist[j].iSw*this.cutlist[cp].iW);
                    h=parseInt(0.01*this.animalist[ap].framelist[i].blocklist[j].iSh*this.cutlist[cp].iH);

                    if(i==0 && j==0)this.animalist[ap].rect[0]=x;
                    else if(x<this.animalist[ap].rect[0])this.animalist[ap].rect[0]=x;

                    if(i==0 && j==0)this.animalist[ap].rect[2]=x+w;
                    else if(x+w>this.animalist[ap].rect[2])this.animalist[ap].rect[2]=x+w;

                    if(i==0 && j==0)this.animalist[ap].rect[1]=y;
                    else if(y<this.animalist[ap].rect[1])this.animalist[ap].rect[1]=y;

                    if(i==0 && j==0)this.animalist[ap].rect[3]=y+h;
                    else if(y+h>this.animalist[ap].rect[3])this.animalist[ap].rect[3]=y+h;
                }
            }
        }
        LoadAnimaRes.gi().PushAnima(this);
        
        //this.LoadRes();
        // if(blocal)this.LoadRes();
        // else
        // {
        //     blocal=blocal;
        // }
    }
    iAnimaX( aa)
	{
		return this.animalist[aa.iAnimaPoint].rect[0];
	}
	iAnimaY( aa)
	{
        return this.animalist[aa.iAnimaPoint].rect[1];
	}
	iAnimaH( aa)
	{
		return this.animalist[aa.iAnimaPoint].rect[3]-this.animalist[aa.iAnimaPoint].rect[1];
	}
	iAnimaW( aa)
	{
		return this.animalist[aa.iAnimaPoint].rect[2]-this.animalist[aa.iAnimaPoint].rect[0];
	}
    InitAnimaWithName(name,out_aa)
    {
        if(this.aaa==null)this.aaa=new AnimaAction();
        var i;
        this.aaa.iAnimaPoint = -1;
        this.aaa.pani = this;
        for (i = 0; i<this.iAnimaCount; i++)
        {
            if (this.animalist[i].sAnimaName== name)
            {
                this.aaa.iAnimaPoint = i;
                this.aaa.iFrame = 0;
                this.aaa.iDelay = 0;

                this.aaa.iRect[0] = this.animalist[i].rect[0];
                this.aaa.iRect[1] = this.animalist[i].rect[1];
                this.aaa.iRect[2] = this.animalist[i].rect[2];
                this.aaa.iRect[3] = this.animalist[i].rect[3];
                if(out_aa==null)out_aa=new AnimaAction();
                out_aa.copyfrom(this.aaa);
                return out_aa;
            }
        }
        this.aaa.iDelay = -1;
        XDefine.sop("cant find anima "+name+" from "+this.pathname);
        if(out_aa==null)out_aa=new AnimaAction();
        // out_aa.iAnimaPoint=0;
        // out_aa.iFrame=0;
        out_aa.pani=this;
        return this.aaa;
    }
    DrawAnima(x,y,name,frameoffset)
    {
        if(typeof(name)=="object")
        {
            this.DrawAnimaEx_ByOffset(x,y,name.iAnimaPoint,name.iFrame,101,1,1,0,0,0);
            return;
        }
        if(this.aaa==null)this.aaa=new AnimaAction();
        this.InitAnimaWithName(name);
        this.DrawAnimaEx_ByOffset(x,y,this.aaa.iAnimaPoint,frameoffset,101,1,1,0,0,0);
    }
    DrawAnima_aa(x,y,aa,x_fp)
    {
        if(typeof(aa)=="string")
        {
            this.DrawAnima(x,y,aa,x_fp);
            return;
        }
        if(typeof(aa)=="number")
        {
            this.DrawAnimaEx_ByOffset(x,y,aa,x_fp,101,1,1,0,0,0);
            return;
        }
        this.DrawAnimaEx_ByOffset(x,y,aa.iAnimaPoint,aa.iFrame,101,1,1,0,0,0);
    }
    DrawAnimaEx(x,y,name,frameoffset,alpha,sw,sh,ra,ratx,raty)
    {
        if(typeof(name)=="object")
        {
            this.DrawAnimaEx_ByOffset(x,y,name.iAnimaPoint,name.iFrame,frameoffset,alpha,sw,sh,ra,ratx);
            return;
        }
        if(this.aaa==null)this.aaa=new AnimaAction();
        this.InitAnimaWithName(name);
        this.DrawAnimaEx_ByOffset(x,y,this.aaa.iAnimaPoint,frameoffset,alpha,sw,sh,ra,ratx,raty);
    }
    DrawAnimaEx_ByName(x,y,name,frameoffset,alpha,sw,sh,ra,ratx,raty,turn)
    {
        if(this.aaa==null)this.aaa=new AnimaAction();
        this.InitAnimaWithName(name);
        this.DrawAnimaEx_ByOffset(x,y,this.aaa.iAnimaPoint,frameoffset,alpha,sw,sh,ra,ratx,raty,turn);
    }
    DrawAnimaEx_ByOffset(x,y,ap,fp,alpha,sw,sh,ra,ratx,raty,turn)
    {
        fp=parseInt(fp);
        turn=turn||false;
        if((ra&0x1000)==0x1000)
        {
            turn=!turn;
            ra-=0x1000;
        }

        var i;
        var cp;
        var xx,yy,rsw,rsh,rra;
        var useturn;

//        if(ratx==-2)ratx=x;
//        if(raty==-2)raty=y;

        if(ap<0 || ap>this.iAnimaCount || fp<0 || this.animalist[ap].iFrameCount<=0)return;
        fp=fp%this.animalist[ap].iFrameCount;
        for(i=0;i<this.animalist[ap].framelist[fp].iBlockCount;i++)
        {
            cp=this.animalist[ap].framelist[fp].blocklist[i].iCp;

            useturn=turn;
            if (this.animalist[ap].framelist[fp].blocklist[i].bFlip)useturn = !useturn;
            // if(turn)xx=x-this.animalist[ap].framelist[fp].blocklist[i].iMx-this.cutlist[cp].iW;
            // else xx=x+this.animalist[ap].framelist[fp].blocklist[i].iMx;

            //xx=x+this.animalist[ap].framelist[fp].blocklist[i].iMx;
            rsw=0.01*this.animalist[ap].framelist[fp].blocklist[i].iSw*sw;
            rsh=0.01*this.animalist[ap].framelist[fp].blocklist[i].iSh*sh;
            
            if(ratx==-2)xx=x+this.animalist[ap].framelist[fp].blocklist[i].iMx;
            else xx=(x+this.animalist[ap].framelist[fp].blocklist[i].iMx+(useturn?1:0)*this.cutlist[cp].iW)/rsw;
            if(raty==-2)yy=y+this.animalist[ap].framelist[fp].blocklist[i].iMy;
            else yy=(y+this.animalist[ap].framelist[fp].blocklist[i].iMy)/rsh;
            if(useturn)xx=-xx;

            rra=this.animalist[ap].framelist[fp].blocklist[i].iRa+ra;

            // if(turn)xx=x-this.animalist[ap].framelist[fp].blocklist[i].iMx*sh-this.cutlist[cp].iW*sh;
            // else xx=x+this.animalist[ap].framelist[fp].blocklist[i].iMx*sh;
           
           
           
           
            if(this.reslist[this.cutlist[cp].iRp].iRid==-1)
            {
                this.reslist[this.cutlist[cp].iRp].iRid=M3DFast.gi().LoadImage(this.reslist[this.cutlist[cp].iRp].sResPath,this.bLocal);
                continue;
            }
            M3DFast.gi()._DrawImageEx(xx,
                yy,
                this.reslist[this.cutlist[cp].iRp].iRid,
                this.cutlist[cp].iX,
                this.cutlist[cp].iY,
                this.cutlist[cp].iW,
                this.cutlist[cp].iH,
                alpha*this.animalist[ap].framelist[fp].blocklist[i].fAlpha,
                rsw,
                rsh,
                rra,
                (rra==0 || ratx>0)?ratx:-2,(rra==0 || raty>0)?raty:-2,useturn);
            if(this.reslist[this.cutlist[cp].iRp].bNotUsed)
            {
                // XDefine.sop("pngusesort\""+this.pathname+"/"+this.reslist[this.cutlist[cp].iRp].sResName+"\",");
                this.reslist[this.cutlist[cp].iRp].bNotUsed=false;
            }
        }
    }
    bInAnima( aa, ax, ay, mx, my)
	{
		if(aa==null)return false;
		if(aa.iAnimaPoint<0 || aa.iAnimaPoint>=this.iAnimaCount)return false;
		var x1=this.animalist[aa.iAnimaPoint].rect[0];
		var y1=this.animalist[aa.iAnimaPoint].rect[1];
		var x2=this.animalist[aa.iAnimaPoint].rect[2];
		var y2=this.animalist[aa.iAnimaPoint].rect[3];
		if(mx>ax+x1 && mx<ax+x2 &&
			my>ay+y1 && my<ay+y2)
		{
//			GmPlay.sop("mx="+mx+",my="+my+",x1="+(ax+x1)+"x2="+(ax+x2)+"y1="+(ay+y1)+"y2="+(ay+y2));
	//		GmPlay.sop("x1="+x1+"y1="+y1);
			return true;
		}
//		GmPlay.sop("false");
		return false;
	}
    RotationVertex_2D2 (vx, vy, dx, dy, jd)
    {
        var l;
        var tx, ty, tjd;

        tx = vx - dx;
        ty = vy - dy;
        if (tx == 0) tx = 0.0000001;
        tjd = Math.atan(ty / tx);
        if (tx < 0) tjd += Math.PI;
        tjd = tjd + Math.PI * jd / 180;
        l = Math.sqrt(tx * tx + ty * ty);
        this.rdx = (Math.cos(tjd) * l + dx);
        this.rdy = (Math.sin(tjd) * l + dy);
    }
    NextFrame(aa)
    {
        aa.iDelay++;
        if (aa.iAnimaPoint < 0 || aa.iAnimaPoint >= this.iAnimaCount) return false;
        if (aa.iFrame < 0 || aa.iFrame >= this.animalist[aa.iAnimaPoint].iFrameCount)
        {
            aa.iFrame = 0;
            aa.iDelay = 0;
        }
        if (this.animalist[aa.iAnimaPoint].iFrameCount == 0) return false;
        if (aa.iDelay > this.animalist[aa.iAnimaPoint].framelist[aa.iFrame].iDelay)
        {
            aa.iDelay = 0;
            aa.iFrame++;
            if (aa.iFrame >= this.animalist[aa.iAnimaPoint].iFrameCount)
            {
                aa.iFrame = 0;
                return true;
            }
        }
        return false;
    }
    SetFrame( aa, tick)
	{//计算总delay数量
		var i,j=0,k,m;
		var al=this.animalist[aa.iAnimaPoint];
		for(i=0;i<al.iFrameCount;i++)
		{
			j+=al.framelist[i].iDelay+1;
		}
		if(j==0)return;
		k=tick%j;
		m=0;
		for(i=0;i<al.iFrameCount;i++)
		{
			m+=al.framelist[i].iDelay+1;
			if(m>=k)
			{
				aa.iFrame= i;
				return;
			}
		}
	}
};

XAnima._ALL=new Array();
XAnima._GET=function(fn)
{
    for(var i=0;i<XAnima._ALL.length;i++)
    {
        if(XAnima._ALL[i].fn==fn)return XAnima._ALL[i].ani;
    }
    return null;
}
XAnima._PUT=function(fn,ani)
{
    var p=XAnima._ALL.length;
    XAnima._ALL[p]=new Object();
    XAnima._ALL[p].fn=fn;
    XAnima._ALL[p].ani=ani;
}