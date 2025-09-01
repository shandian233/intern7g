import XDefine from "../../config/XDefine";

class _ImageList
{
    constructor(i)
    {
        this.bUseing=false;
        this.bLoaded=false;
        this.iImageId=i;
        this.blocks=new Array();
        this.iBlockCount=0;
    }
    GetBlock(x,y,w,h)
    {
        var i;
        for(i=0;i<this.iBlockCount;i++)
        {
            if(this.blocks[i].x==x && 
                this.blocks[i].y==y && 
                this.blocks[i].w==w && 
                this.blocks[i].h==h)
            {
                return this.blocks[i].image;
            }
        }
        return this.CreateBlock(x,y,w,h).image;
    }
    CreateBlock(x,y,w,h)
    {
        this.blocks[this.iBlockCount]=new Object();
        this.blocks[this.iBlockCount].x=x;
        this.blocks[this.iBlockCount].y=y;
        this.blocks[this.iBlockCount].w=w;
        this.blocks[this.iBlockCount].h=h;
        //this.image.scaleRate=1;
        this.blocks[this.iBlockCount].image=Laya.Texture.createFromTexture(this.image,x,y,w,h);
    //    this.blocks[this.iBlockCount].image.bitmap.filterMode=0;
        this.iBlockCount++;
        return this.blocks[this.iBlockCount-1];
    }
}
class _TextBuffer
{
    constructor()
    {
        this._txts=new Array(_TextBuffer.SIZE);
        for(var i=0;i<_TextBuffer.SIZE;i++)
        {
            this._txts[i]=new Object();
            this._txts[i].bUseing=false;
            this._txts[i].bUsed=false;
            this._txts[i].txt=new Laya.Text();
            this._txts[i].iTimeOut=0;
            this._txts[i].s="";
            this._txts[i].c=0;
            this._txts[i].size=0;
            this._txts[i].ab=0;
            this._txts[i].sw=0;
            this._txts[i].sh=0;
            this._txts[i].ra=0;
            this._txts[i].ratx=0;
            this._txts[i].raty=0;
            this._txts[i].x=0;
            this._txts[i].y=0;
        }
        this.iMaxPoint=0;
    }
    Find(s,c,size,ab,sw,sh,ra,ratx,raty)
    {
        for(var i=0;i<this.iMaxPoint;i++)
        {
            if(!this._txts[i].bUseing)continue;
            if(this._txts[i].bUsed)continue;
            if(this._txts[i].s!=s)continue;
            if(this._txts[i].c!=c)continue;
            if(this._txts[i].size!=size)continue;
            if(this._txts[i].ab!=ab)continue;
            if(this._txts[i].sw!=sw)continue;
            if(this._txts[i].sh!=sh)continue;
            if(this._txts[i].ra!=ra)continue;
            if(this._txts[i].ratx!=ratx)continue;
            if(this._txts[i].raty!=raty)continue;
            this._txts[i].iTimeOut=_TextBuffer.iTick+30;
            this._txts[i].bUsed=true;
            return this._txts[i];
        }
        return null;
    }
    Get(s,c,size,ab,sw,sh,ra,ratx,raty)
    {
        for(var i=0;i<_TextBuffer.SIZE;i++)
        {
            if(!this._txts[i].bUseing)
            {
                this._txts[i].bUseing=true;
                this._txts[i].s=s;
                this._txts[i].c=c;
                this._txts[i].size=size;
                this._txts[i].ab=ab;
                this._txts[i].sw=sw;
                this._txts[i].sh=sh;
                this._txts[i].ra=ra;
                this._txts[i].ratx=ratx;
                this._txts[i].raty=raty;
                this._txts[i].iTimeOut=_TextBuffer.iTick+30;
                this._txts[i].bUsed=true;
                return this._txts[i];
            }
        }
        return null;
    }
    Clear()
    {
        this.iCount=0;
        this.iMaxPoint=0;
        for(var i=0;i<_TextBuffer.SIZE;i++)
        {
            if(this._txts[i].bUseing)
            {
                if(this._txts[i].iTimeOut<_TextBuffer.iTick)this._txts[i].bUseing=false;
                else
                {
                    this._txts[i].bUsed=false;
                    this.iCount++;
                    this.iMaxPoint=i;
                }
            }
        }
        this.iMaxPoint++;
    }
}
_TextBuffer.SIZE=1024;
_TextBuffer.iTick=0;

class _SpanBuffer
{
    constructor()
    {
        this._spans=new Array(_SpanBuffer.SIZE);
        for(var i=0;i<_SpanBuffer.SIZE;i++)
        {
            this._spans[i]=new Object();
            this._spans[i].bUseing=false;
            this._spans[i].bUsed=false;
            this._spans[i].span=new Laya.HTMLDivElement();
            this._spans[i].iTimeOut=0;
            this._spans[i].s="";
            this._spans[i].x=0;
            this._spans[i].y=0;
        }
        this.iMaxPoint=0;
    }
    Find(s)
    {
        for(var i=0;i<this.iMaxPoint;i++)
        {
            if(!this._spans[i].bUseing)continue;
            if(this._spans[i].bUsed)continue;
            if(this._spans[i].s!=s)continue;
            this._spans[i].iTimeOut=_TextBuffer.iTick+30;
            this._spans[i].bUsed=true;
            return this._spans[i];
        }
        return null;
    }
    Get(s)
    {
        for(var i=0;i<_SpanBuffer.SIZE;i++)
        {
            if(!this._spans[i].bUseing)
            {
                this._spans[i].bUseing=true;
                this._spans[i].span.innerHTML=s;
                this._spans[i].s=s;
                this._spans[i].iTimeOut=_TextBuffer.iTick+30;
                this._spans[i].bUsed=true;
                return this._spans[i];
            }
        }
        return null;
    }
    Clear()
    {
        this.iCount=0;
        this.iMaxPoint=0;
        for(var i=0;i<_SpanBuffer.SIZE;i++)
        {
            if(this._spans[i].bUseing)
            {
                if(this._spans[i].iTimeOut<_TextBuffer.iTick)
                {
                    this._spans[i].bUseing=false;
                }
                else
                {
                    this._spans[i].bUsed=false;
                    this.iCount++;
                    this.iMaxPoint=i;
                }
            }
        }
        this.iMaxPoint++;
    }
}
_SpanBuffer.SIZE=16;

export default class M2DFast
{
    constructor()
    {
        this.tb=new _TextBuffer();
        this.sb=new _SpanBuffer();

        this.m_ImageList=new Array(M2DFast.MAXIMAGECOUNT);
        for(var i=0;i<M2DFast.MAXIMAGECOUNT;i++)
        {
            this.m_ImageList[i]=new _ImageList(i);
        }
        this.view_sprite = new Laya.Sprite();
        Laya.stage.addChild(this.view_sprite);
        this.view_sprite.graphics.clear();
        this.Clear();

        this.block_sprites=new Array();
        this.iSpritePoint=0;
        this.iSpriteCount=0;

        this.block_texts=new Array();
        this.iTextPoint=0;
        this.iTextCount=0;

        this.iClipSpriteCount=0;
        this.clip_sprites=new Array();

        this.bClip=false;
        this.iFlashDelay=0;//震动屏幕延迟

        this.iTextWidth=-1;//宽度限制，超过换行

        this.txt_w=new Laya.Text();

        // this.div.appendHTML("asdf");
        // this.div.layout();
        this.drawrect=new Int32Array(4);
    }
    _SpanText(s,c,size)
    {
        return "<span style='font-size:"+size+"px;color:"+this.c_to_c(c)+"'>"+s+"</span>";
    }
    _DrawSpanText(x,y,s,width)
    {
        var tt=this.sb.Find(s);
        if(tt==null)
        {
            tt=this.sb.Get(s);
            if(tt==null)return;
        }
        // var s=this._MakeTextEx("testaaatestaaatests",0x00ff00,30)+
        //     this._MakeTextEx("testaaatestaaatests",0xff0000,20);
        // this.div=new Laya.HTMLDivElement();
        // this.div.innerHTML=s;

        // this.div.pos(x,y);
        // this.div.style.wordWrap=true;
        // this.div.style.width=width;

        // this.view_sprite.addChild(this.div);
        tt.span.pos(x,y);
        tt.span.style.wordWrap=true;
        tt.span.style.width=width;

        this.view_sprite.addChild(tt.span);
    }
    FindFreeText()
    {
        if(this.iTextPoint>=this.iTextCount)
        {
            this.block_texts[this.iTextCount]=new Laya.Text();
            this.iTextCount++;
        }
        this.iTextPoint++;
        return this.block_texts[this.iTextPoint-1];
    }
    FindFreeSprite()
    {
        if(this.iSpritePoint>=this.iSpriteCount)
        {
            this.block_sprites[this.iSpriteCount]=new Laya.Sprite();
            this.iSpriteCount++;
        }
        this.iSpritePoint++;
        return this.block_sprites[this.iSpritePoint-1];
    }
    Clear()
    {
        var i;
        // for(i=0;i<this.iSpritePoint;i++)
        // {
        //     this.block_sprites[i].removeChildren();
        // }
        // for(i=0;i<this.iTextCount;i++)
        // {
        //     this.block_texts[i].removeChildren();
        // }
        this.view_sprite.removeChildren();
        this.iSpritePoint=0;
        this.iTextPoint=0;

        for(i=0;i<this.iClipSpriteCount;i++)
        {
            this.clip_sprites[i].scrollRect=null;
            this.clip_sprites[i].removeChildren();
        }
        this.iClipSpriteCount=0;

        if(this.iFlashDelay>0)
        {
            this.iFlashDelay--;
            this.view_sprite.pos(XDefine.grnd(-5,5),XDefine.grnd(-5,5));
        }
        else
        {
            this.view_sprite.pos(0,0);
        }
        _TextBuffer.iTick++;
        this.tb.Clear();
        this.sb.Clear();
    }

    FindFreeImage()
    {
        for(var i=0;i<M2DFast.MAXIMAGECOUNT;i++)
        {
            if(!this.m_ImageList[i].bUseing)return this.m_ImageList[i];
        }
        return null;
    }
    FindImage(i)
    {
        if(this.m_ImageList[i].bUseing && this.m_ImageList[i].bLoaded)return this.m_ImageList[i];
        return null;
    }
    LoadedImage(pm2f,fn,blocal,pimage,img)
    {

       

        if(img==null)
        {
            if(fn.indexOf('spirit')>0){
                XDefine.addLoadMask(1);
            }
            Laya.loader.load((blocal?"":XDefine.BASE_URL)+fn, Laya.Handler.create(pm2f, pm2f.LoadedImage,[pm2f,fn,blocal,pimage]),null,Laya.Loader.IMAGE);
            return;
        }
        if(fn.indexOf('spirit')>0){
            XDefine.addLoadMask(2);
        }
        //XDefine.sop("Loaded "+fn,img);
        pimage.image = img;
        pimage.bLoaded = true;
        pimage.fn = fn;
    }

    LoadImage(fn,blocal,cb)
    {
        if(blocal==null)blocal=false;
        blocal=false;
        var pimage=this.FindFreeImage();
        if(pimage==null)return -1;
        pimage.bUseing=true;
        this.LoadedImage(this,fn,blocal,pimage);
        return pimage.iImageId;
    }
    _SetViewClip(x,y,w,h)
    {
        this.bClip=true;
        this.iClipX=x;
        this.iClipY=y;
        this.iClipW=w;
        this.iClipH=h;
    }
    NoClip()
    {
        this.bClip=false;
    }
    _DrawImageEx(x,y,index,sx,sy,w,h,ab,sw,sh,ra,ratx,raty,turn)
    {
        if(w>2048 || h>2048)return;
        turn=turn||false;
        var pimage=this.FindImage(index);
        if(pimage==null)return;
        if(w==-1)w=pimage.image.width;
        if(h==-1)h=pimage.image.height;

       

        // if(x>640)return;
        // if(y>Laya.stage.height)return;
        // if(x+w*sw<0)return;
        // if(y+h*sh<0)return;
        if(this.bClip)
        {
            // if(x>this.iClipX+this.iClipW)return;
            // if(y>this.iClipY+this.iClipH)return;
            // if(x+w*sw<this.iClipX)return;
            // if(y+h*sh<this.iClipY)return;
        }
        var ape = this.FindFreeSprite();

        if(this.bClip)
        {
            var ape2 = this.FindFreeSprite();
            ape2.graphics.clear();
            ape2.pos(this.iClipX,this.iClipY);
            ape2.rotation=0;
            ape2.alpha=1;
            ape2.scale(1,1);
            ape2.scrollRect=new Laya.Rectangle(this.iClipX,this.iClipY,this.iClipW,this.iClipH);
            this.view_sprite.addChild(ape2);
            ape2.addChild(ape);
            this.clip_sprites[this.iClipSpriteCount++]=ape2;
        }
        else this.view_sprite.addChild(ape);
        ape.graphics.clear();

        // if(w%2!=0)w++;
        // if(h%2!=0)h++;
        // var t1=x+w/2;
        // var t2=y+h/2;
        // if(t1==429.5 && t2==450)
        // {
        //     ratx=t1;
        //     raty=t2;
        // }

        if(ratx==-1)ratx=x;
        else if(ratx==-2)ratx=x+w/2;
        else if(ratx==-3)ratx=x+w;

        if(raty==-1)raty=y;
        else if(raty==-2)raty=y+h/2;
        else if(raty==-3)raty=y+h;

        var nt=pimage.GetBlock(sx,sy,w,h);

        //if(this.bClip)

        //this._setuv(pimage.image,sx,sy,w,h);
        ape.graphics.drawImage(nt,x-ratx, y-raty,w,h);
        // ape.pivot(x+w/2,y+h/2);
        ape.pos(ratx,raty);
        ape.alpha=ab/100;
        ape.rotation=ra;
        ape.scale(turn?-sw:sw,sh);
    }
    c_to_c(c)
    {
        var ret=c.toString(16);
        while(ret.length<6)ret="0"+ret;
        return "#"+ret;
    }
    TextWidth(s,size)
    {
        this.txt_w.text=s;
        this.txt_w.fontSize=size;
        this.iTextHeight=this.txt_w.textHeight;
        return this.txt_w.textWidth;
    }

    _DrawTextEx(x,y,s,c,size,ab,sw,sh,ra,ratx,raty)
    {
        if(s==null)return;

        // s="asdf";


        // if(x>640)return;
        if(y>Laya.stage.height)return;
    
        var text;

        var tt=this.tb.Find(s,c,size,ab,sw,sh,ra,ratx,raty);
        if(tt==null)
        {
            tt=this.tb.Get(s,c,size,ab,sw,sh,ra,ratx,raty);
            if(tt==null)return;
            text=tt.txt;
            text.text=s;
            text.color=this.c_to_c(c);
            text.fontSize=size;
            text.width = text.textWidth;//设置宽度后超过自动换行
            text.height = text.textHeight;
            if(this.iTextWidth>0)
            {
                text.wordWrap=true;//自动换行
                text.width=this.iTextWidth;
            }
            else text.wordWrap=false;
            text.alpha=ab/100;
            text.rotation=ra;
            text.scale(sw,sh);

            tt.x=-1;
            tt.y=-1;
        }
        else text=tt.txt;
        this.drawrect[0]=x;
        this.drawrect[1]=y;
        this.drawrect[2]=x+text.textWidth;
        this.drawrect[3]=y+text.textHeight;
        
        if(tt.x!=x || tt.y!=y)
        {
            var px,py;
            if(ratx==0 || ratx==-1)px=0;
            else if(ratx==-2)px=text.textWidth/2;
            else if(ratx==-3)px=text.textWidth;
            else px=ratx-x;
            if(raty==0 || raty==-1)py=0;
            else if(raty==-2)py=text.textHeight/2;
            else if(raty==-3)py=text.textHeight;
            else py=raty-y;
            text.pivot(px,py);
    
            text.x=x;
            text.y=y;

            tt.x=x;
            tt.y=y;
        }

        if(this.bClip)
        {
            var ape2 = this.FindFreeSprite();
            ape2.graphics.clear();
            ape2.pos(this.iClipX,this.iClipY);
            ape2.rotation=0;
            ape2.alpha=1;
            ape2.scale(1,1);
            ape2.scrollRect=new Laya.Rectangle(this.iClipX,this.iClipY,this.iClipW,this.iClipH);
            this.view_sprite.addChild(ape2);
            ape2.addChild(text);
            this.clip_sprites[this.iClipSpriteCount++]=ape2;
        }
        else this.view_sprite.addChild(text);
        // this.view_sprite.addChild(text);

        return text.textWidth;
    }
    DrawTextEx22(x,y,s,c,size,ab,sw,sh,ra,ratx,raty)
    {
        if(s==null)return;

        if(x>640)return;
        if(y>Laya.stage.height)return;

        var text=this.FindFreeText();

        // if(x+text.textWidth<0)return;
        // if(y+text.textHeight<0)return;
        // if(this.bClip)
        // {
        //     if(x>this.iClipX+this.iClipW)return;
        //     if(y>this.iClipY+this.iClipH)return;
        //     if(x+text.textWidth<this.iClipX)return;
        //     if(y+text.textHeight<this.iClipY)return;
        // }

        if(this.bClip)
        {
            var ape2 = this.FindFreeSprite();
            ape2.graphics.clear();
            ape2.pos(this.iClipX,this.iClipY);
            ape2.rotation=0;
            ape2.alpha=1;
            ape2.scale(1,1);
            ape2.scrollRect=new Laya.Rectangle(this.iClipX,this.iClipY,this.iClipW,this.iClipH);
            this.view_sprite.addChild(ape2);
            ape2.addChild(text);
            this.clip_sprites[this.iClipSpriteCount++]=ape2;
        }
        else this.view_sprite.addChild(text);
        // this.view_sprite.addChild(text);


        text.text=s;
        text.color=this.c_to_c(c);
        text.fontSize=size;
        // if(ratx==-1)text.align="left";
        // else if(ratx==-2)text.align="center";
        // else if(ratx==-3)text.align="right";
        // if(raty==-1)text.valign="top";
        // else if(raty==-2)text.valign="middle";
        // else if(raty==-3)text.valign="bottom";
        
        //text.bgColor="#ffffff";//背景色
        //text.bold=true;//粗体
        //borderColor;//边框背景色
        
        //text.font="Arial";
        
        //text.isComplexText=false;//拆分文字渲染
        //text.italic=true;//斜体

        //leading//垂直行间距
        //overflow//超出范围后"hidden"、"visible"和"scroll"
        //padding边距
        //RightToLeft
        //stroke描边宽度
        //strokeColor描边颜色
        text.width = text.textWidth;//设置宽度后超过自动换行
        text.height = text.textHeight;

        if(this.iTextWidth>0)
        {
            text.wordWrap=true;//自动换行
            text.width=this.iTextWidth;
        }
        else text.wordWrap=false;

        var px,py;
        if(ratx==-1)px=0;
        else if(ratx==-2)px=text.textWidth/2;
        else if(ratx==-3)px=text.textWidth;
        else px=ratx-x;
        if(raty==-1)py=0;
        else if(raty==-2)py=text.textHeight/2;
        else if(raty==-3)py=text.textHeight;
        else py=raty-y;
        text.pivot(px,py);
        text.alpha=ab/100;
        text.rotation=ra;
        text.scale(sw,sh);

        text.x=x;
        text.y=y;
    }
    DrawCircle(x,y,radius,color,linew)
    {
        if(linew==null)linew=1;
        var sp=this.FindFreeSprite();
        this.view_sprite.addChild(sp);
        sp.graphics.clear();
        sp.graphics.drawCircle(x,y,radius,null,this.c_to_c(color),linew);

        sp.pivot(0,0);
        sp.rotation=0;
        sp.alpha=100;
        sp.scale(1,1);
        sp.pos(0,0);
    }
    FillCircle(x,y,radius,color,linew)
    {
        if(x-radius>640)return;
        if(y-radius>Laya.stage.height)return;
        if(x+radius<0)return;
        if(y+radius<0)return;
        if(this.bClip)
        {
            if(x-radius>this.iClipX+this.iClipW)return;
            if(y-radius>this.iClipY+this.iClipH)return;
            if(x+radius<this.iClipX)return;
            if(y+radius<this.iClipY)return;
        }

        if(linew==null)linew=1;
        var sp=this.FindFreeSprite();
        this.view_sprite.addChild(sp);
        sp.graphics.clear();
        sp.graphics.drawCircle(x,y,radius,this.c_to_c(color),null,linew);

        sp.pivot(0,0);
        sp.rotation=0;
        sp.alpha=100;
        sp.scale(1,1);
        sp.pos(0,0);
    }

    DrawRect(x1,y1,w,h,color,linew)
    {
        if(linew==null)linew=1;
        var sp=this.FindFreeSprite();

        if(this.bClip)
        {
            var ape2 = this.FindFreeSprite();
            ape2.graphics.clear();
            ape2.pos(this.iClipX,this.iClipY);
            ape2.rotation=0;
            ape2.alpha=1;
            ape2.scale(1,1);
            ape2.scrollRect=new Laya.Rectangle(this.iClipX,this.iClipY,this.iClipW,this.iClipH);
            this.view_sprite.addChild(ape2);
            ape2.addChild(sp);
            this.clip_sprites[this.iClipSpriteCount++]=ape2;
        }
        else this.view_sprite.addChild(sp);
        // this.view_sprite.addChild(sp);
        sp.graphics.clear();
        sp.graphics.drawRect(x1,y1,w,h,null,this.c_to_c(color),linew);

        sp.pivot(0,0);
        sp.rotation=0;
        sp.alpha=100;
        sp.scale(1,1);
        sp.pos(0,0);
    }
    FillRect(x1,y1,w,h,color,linew,alpha)
    {
        if(w<=0)return;
        if(h<=0)return;
        if(linew==null)linew=1;
        if(alpha==null)alpha=100;
        var sp=this.FindFreeSprite();
        if(this.bClip)
        {
            var ape2 = this.FindFreeSprite();
            ape2.graphics.clear();
            ape2.pos(this.iClipX,this.iClipY);
            ape2.rotation=0;
            ape2.alpha=1;
            ape2.scale(1,1);
            ape2.scrollRect=new Laya.Rectangle(this.iClipX,this.iClipY,this.iClipW,this.iClipH);
            this.view_sprite.addChild(ape2);
            ape2.addChild(sp);
            this.clip_sprites[this.iClipSpriteCount++]=ape2;
        }
        else this.view_sprite.addChild(sp);
        sp.graphics.clear();
        sp.graphics.drawRect(x1,y1,w,h,this.c_to_c(color),this.c_to_c(color),linew);

        sp.pivot(0,0);
        sp.rotation=0;
        sp.alpha=alpha/100;
        sp.scale(1,1);
        sp.pos(0,0);
    }
    DrawLine(x1,y1,x2,y2,color,linew)
    {
        if(linew==null)linew=1;
        var sp=this.FindFreeSprite();
        this.view_sprite.addChild(sp);
        sp.graphics.clear();
        sp.graphics.drawLine(x1,y1,x2,y2,color,linew);

        sp.pivot(0,0);
        sp.rotation=0;
        sp.alpha=1;
        sp.scale(1,1);
        sp.pos(0,0);

    }
}

M2DFast.pm2f=null;
M2DFast.xm3f=null;
M2DFast.gi=function()
{
    if(M2DFast.pm2f==null)
    {
        M2DFast.pm2f=new M2DFast();
        M2DFast.xm3f=M2DFast.pm2f;
    }
    return M2DFast.pm2f;
}

M2DFast.MAXIMAGECOUNT=2500;