import X_FIRST from "./X_FIRST";


export default class _CLASSARRAY extends X_FIRST
{
    constructor(pb)
    {
        super();
        this.phead = null;
        this.pend = null;
        this.pnext = null;
        this.pback = pb;
    }

    copyfrom (pca)
    {
        var pp = pca.phead;
        while (pp !== null)
        {
            this.LinkFirst(pp.GetCopy());
            pp = pp.pdown;
        }
        if (pca.pnext != null)
        {
            var pnext = new _CLASSARRAY(pback);
            pnext.copyfrom(pca.pnext);
        }
    }

    UnLinkFirst (pf)
    {
        if (this.phead === null) return null;
        if (this.phead === pf)
        {
            if (this.pend === pf)
            {
                this.phead = null;
                this.pend = null;
                this.pfront = null;
            }
            else
            {
                this.phead = phead.pdown;
                this.pfront = this.phead;

                this.phead.pup = null;
            }
        }
        else
        {
            var pc = this.phead.pdown;
            while (true)
            {
                if (pc === pf) break;
                if (pc === this.pend) break;
                pc = pc.pdown;
            }
            if (pc === pf)
            {
                if (pc === this.pend) this.pend = pc.pup;
                pc.pup.pdown = pc.pdown;
                if (pc.pdown !== null) pc.pdown.pup = pc.pup;
            }
        }
        pf.pup = null;
        pf.pdown = null;
        pf.pback = null;
        return pf;
    }
    LinkFirst (pfirst)
    {
        if (pfirst !== null)
        {
            pfirst.pback = this.pback;
            if (this.phead === null)
            {
                this.phead = pfirst;
                this.pend = pfirst;
                this.pfront = pfirst;
                pfirst.pup = null;
                pfirst.pdown = null;
            }
            else
            {
                this.pend.pdown = pfirst;
                pfirst.pup = this.pend;
                pfirst.pdown = null;
                this.pend = pfirst;
            }
        }
//		return pfirst;
    }
    AddClass (type)
    {
        var pfirst = null;
        switch (type)
        {
            case 10://数字
                pfirst = new X10_NUMBER();
                break;
            case 20://浮点数
                pfirst = new X20_FLOAT();
                break;
            case 30://文字
                pfirst = new X30_WORD();
                break;
            case 40://data
                pfirst = new X40_CLASS();
                break;
            case 50://code
                pfirst = new X50_CODE();
                break;
            case 60://数据
                pfirst = new X60_DATA();
                break;
        }
        if (pfirst !== null)
        {
            SetXid(pfirst);
            pfirst.pback = this.pback;
            if (this.phead === null)
            {
                this.phead = pfirst;
                this.pend = pfirst;
                this.pfront = pfirst;
                pfirst.pup = null;
                pfirst.pdown = null;
            }
            else
            {
                this.pend.pdown = pfirst;
                pfirst.pup = this.pend;
                pfirst.pdown = null;
                this.pend = pfirst;
            }
        }
        return pfirst;
    }
    FindFirst (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.sName=== name) return pf;

            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindFirst(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }
    FindNumber (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 10)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindNumber(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }
    FindFloat (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 20)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindFloat(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }
    FindWord (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 30)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindWord(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }

    FindClass (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 40)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindClass(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }

    FindCode (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 50)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindCode(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }
    FindData (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 60)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindData(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }
    FindPoint (name, deep)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 70)
            {
                if (pf.sName=== name) return pf;
            }
            if (deep > 0)
            {
                if (pf.iType === 40)
                {
                    var pt = pf.pca.FindPoint(name, deep - 1);
                    if (pt !== null) return pt;
                }
            }
            pf = pf.pdown;
        }
        return null;
    }

    FindMark (mark)
    {
        var pf = this.phead;
        while (pf !== null)
        {
            if (pf.iType === 40)
            {
                var pclass = pf;
                if (pclass.pca.phead === null) return null;//空集合
                if (pclass.pca.phead.sName=== "唯一处理标识")
                {
                    if (pclass.pca.phead.iType === 10)
                    {
                        var pnum = pclass.pca.phead;
                        if (pnum.iNumber === mark)
                        {
                            return pclass;
                        }
                    }
                }
                pclass = pclass.FindMark(mark);
                if (pclass !== null) return pclass;
            }
            pf = pf.pdown;
        }
        return null;
    }

    DeleteObj ()
    {
    }
}