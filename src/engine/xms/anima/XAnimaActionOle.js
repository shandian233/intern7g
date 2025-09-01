
import AnimaAction from "../../graphics/AnimaAction"	
	
export default class XAnimaActionOle {
/*
	int this.iUseFlag[ ];
	AnimaAction this.aa[ ];
	String this.sName[ ];*/
	constructor()
	{
        this.MAXAAO=1024;
		this.iUseFlag=new Int32Array(this.MAXAAO);//
		this.sName=new Array(this.MAXAAO);//
		this.aa=new Array(this.MAXAAO);//
		for(var i=0;i<this.MAXAAO;i++)
		{
			this.iUseFlag[i]=0;
			this.aa[i]=new AnimaAction();
			this.sName[i]="";
		}
	}
	 ClearFlag()
	{
		for(var i=0;i<this.MAXAAO;i++)this.iUseFlag[i]=0;
	}
	 AddAA( pa, name)
	{
		for(var i=0;i<this.MAXAAO;i++)
		{
			if(this.iUseFlag[i]==0)
			{
				this.iUseFlag[i]++;
				this.aa[i].copyfrom(pa);
				this.sName[i]=name;
				return i;
			}
		}
		return 0;
	}
	 GetAA( p, name)
	{
		if(p<0 || p>=this.MAXAAO)return null;
		if(this.sName[p]!=name)return null;
		return this.aa[p];
	}
}