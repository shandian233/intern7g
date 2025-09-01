
export default class X_FIRST
{
    constructor()
    {
        this.iType=0;
        this.iX=0;
        this.iY=0;
        this.sName="";
        this.iLen=0;
        this.iXID=0;
        this.pup=null;
        this.pback=null;
        this.pfront=null;
        this.pdown=null;
    }
    Init()
    {
        this.iType=0;
    }

    SetName(nm)
    {
        this.sName=nm;
    }

    SetPos(x,y)
    {
        this.iX = x;
        this.iY = y;
    }

    GetBase(pf)
    {
        if(pf==null)pf=this;
        if(pf.pback==null)return pf;
        else return this.GetBase(pf.pback);
    }

    copyfrom(pf)
    {
        this.iX=pf.iX;
        this.iY=pf.iY;
        this.sName=pf.sName;
    }
    GetCopy()
    {
        
    }
/*
    GetCopy(pf)
    {
        if(pf==null)pf=this;
        var pnum;
		var pfloat;
		var pword;
		var pclass;
		var pcode;
		var pdata;

		var pret=null;

		var pp;

		switch(pf.iType)
		{
		case 10:
			pnum=new X10_NUMBER();
			pret=pnum;
			pnum.copyfrom(pf);
			break;
		case 20:
			pfloat=new X20_FLOAT();
			pret=pfloat;
			pfloat.copyfrom(pf);
			break;
		case 30:
			pword=new X30_WORD();
			pret=pword;
			pword.copyfrom(pf);
			break;
		case 40:
			pclass=new X40_CLASS();
			pret=pclass;
			pclass.copyfrom(pf);
			pp=(pf).pca.phead;
			while(pp!=null)
			{
				pclass.LinkFirst(this.GetCopy(pp));
				pp=pp.pdown;
			}
			break;
		case 50:
			pcode=new X50_CODE();
			pret=pcode;
			pcode.copyfrom(pf);
			break;
		case 60:
			pdata=new X60_DATA();
			pret=pdata;
			pdata.copyfrom(pf);
			break;
		}

		return pret;
    }*/
}
