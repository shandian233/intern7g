

export default class GmString {
	constructor()
	{
		this.bShowDebug=false;
	}

	
}
GmString.sDebug=new Array(20);
GmString.GetStrWidth=function( s)
    {
    	return 40;
	}
	GmString.atoi=function( s)
	{
		var i,j=0,k;
		for(i=0;i<s.length;i++)
		{
			k=s.charAt(i);
			if(k>='0' && k<='9')
			{
				j=j*10+k-'0';
			}
			else break;
		}
		return j;
	}

	GmString.iTimeAdd=function( it, ia)
	{
		var _ih,_im,_is;
		_is=it%100+ia%100;
		if(_is>=60)
		{
			_is-=60;
			it+=100;
		}
		_im=it/100%100+ia/100%100;
		if(_im>=60)
		{
			_im-=60;
			it+=10000;
		}
		_ih=it/10000+ia/10000;

		return _ih*10000+_im*100+_is;
	}
	GmString.iTimeSub=function( id1, it1, id2, it2)
	{
		var _ih,_im,_is;
		if(id1>id2)it1=it1+240000;
		if(id1<id2)it2=it2+240000;
		_ih=it1/10000-it2/10000;
		_im=it1/100%100-it2/100%100;
		_is=it1%100-it2%100;

		if(_is<0)
		{
			_is+=60;
			_im--;
		}
		if(_im<0)
		{
			_im+=60;
			_ih--;
		}
		return _ih*10000+_im*100+_is;
	}
	GmString._days=[0,31,28,31,30,31,30,31,31,30,31,30,31];
	GmString.iDataAdd=function( id, ia)
	{
		var _iy,_im,_id,_ids;
		_iy=id/10000;
		_im=id/100%100;
		if(_im>12)
		{
			_im=12;
//			SaveLogo("log.txt","out of buffer\r\n");
		}
		if((((_iy%4==0)&&(_iy%100!=0))||(_iy%400==0))&&_im==2)_ids=29;//�������29��
		else _ids=GmString._days[_im];
		_id=id%100+ia%100;
		if(_id>_ids)
		{
			_id-=_ids;
			_im++;
		}
		_im=_im+ia/100%100;
		if(_im>12)
		{
			_im-=12;
			_iy++;
		}
		_iy=_iy+ia/10000;
		return _iy*10000+_im*100+_id;
	}
	GmString.sop=function( s)
	{
		System.out.println(s);
		var i;
		for(i=19;i>0;i--)GmString.sDebug[i]=GmString.sDebug[i-1];
		GmString.sDebug[0]=s;
	}
	GmString._sqrt=function( dest)
	{
		var i,j;
		i=256;
		j=128;
		while(j>0)
		{
			if(i*i>dest)i-=j;
			else i+=j;
			j/=2;
		}
		return i;
	}