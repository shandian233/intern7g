import _CLASSARRAY from "./_CLASSARRAY"
import X_FIRST from "./X_FIRST";

export default class X40_CLASS extends X_FIRST
{
    constructor()
    {
        super();
        this.iType = 40;
        this.iLen = 8;
        this.sName = "";
        this.iArray = 1;
        this.pobj=null;
        this.pca=new _CLASSARRAY(this);
        this.bOpenTree=false;
    }

    copyfrom(p)
{
    this.iX=p.iX;
    this.iY=p.iY;
    this.sName=p.sName;
    this.iArray=p.iArray;
//    this.pca.copyfrom(p.pca);
}
_NEW_x40()
{
    var i;
    var pf;
    var pclass;
    var pold,pnew;
    pold=this.pca;
    for(i=1;i<this.iArray;i++)
    {
        pnew=new _CLASSARRAY(this);
        pf=this.pca.phead;
        while(pf!==null)
        {
            pnew.LinkFirst(pf.GetCopy());
            pf=pf.pdown;
        }
        pold.pnext=pnew;
        pold=pnew;
    }
    for(i=0;i<iArray;i++)
    {
        pf=pca.phead;
        while(pf!=null)
        {
            if(pf.iType==40)
            {
                pclass=pf;
                pclass._NEW_x40();
            }
            pf=pf.pdown;
        }
    }
}
MoveUpFirst(pf)
{
    pca.MoveUpFirst(pf);
}
MoveDownFirst(pf)
{
}
UnLinkFirst(pf)
{
    return this.pca.UnLinkFirst(pf);
}

LinkFirst(pfirst)
{
    this.pca.LinkFirst(pfirst);
}
AddClass(type)
{
    return this.pca.AddClass(type);
}
FindFirst(name,deep)
{
    if(deep==null)deep=0;
    return this.pca.FindFirst(name,deep);
}
// FindFirst: function(name)
// {
//     return this.pca.FindFirst(name,0);
// },
FindFirstByPath(path)
{
    var tt=path.split("/");
    var pc=null;
    for(var i=1;i<tt.length;i++)
    {
        if(pc==null)pc=this.FindFirst(tt[i]);
        else pc=pc.FindFirst(tt[i]);
    }
    return pc;

    var i;
    var p=0;
    var name;
    var deep = 0;
    var pc=this;

    i = 0;
    for (p; p < path.length; p++)
    {
        if (path[p] === '/')
        {
            name[i] = 0;
            if (deep === 0)
            {
                if (pc.sName!== name)return null;
            }
            else
            {
                pc = pc.FindFirst(name);
                if (pc === null)return null;
            }
            deep++;
            i = 0;
        }
        else
        {
            name[i++] = path[p];
        }
    }
    name[i] = 0;
    return pc.FindFirst(name);
}
FindNumber(name)
{
    return this.pca.FindNumber(name,0);
}

FindFloat(name)
{
    return this.pca.FindFloat(name,0);
}
/*
X30_WORD *X40_CLASS::FindWord( ap, const char *name)
{
	_CLASSARRAY *p=pca;
	for(int i=0;i<ap;i++)p=p.pnext;
	return p.FindWord(name,0);
}*/
FindWord(name)
{
    return this.pca.FindWord(name,0);
}
FindCode(name)
{
    return this.pca.FindCode(name, 0);
}
FindClass(name)
{
    return this.pca.FindClass(name,0);
}
FindPoint(name)
{
    return this.pca.FindPoint(name,0);
}
FindMark(mark)
{
    return this.pca.FindMark(mark);
}

DeleteObj()
{
}
    GetCopy()
    {
        var pret=new X40_CLASS();
        pret.copyfrom(this);
        var pp=this.pca.phead;
        while(pp!=null)
        {
            pret.LinkFirst(pp.GetCopy());
            pp=pp.pdown;
        }
        return pret;
    }
}