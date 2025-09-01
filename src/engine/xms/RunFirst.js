
import BaseClass from "../../engine/BaseClass"
import M3DFast from "../../engine/graphics/M3DFast"
import XmsCAnima from "../../engine/xms/control/XmsCAnima"
import XmsCButton from "../../engine/xms/control/XmsCButton"
import XmsCFrame from "../../engine/xms/control/XmsCFrame"
import XmsCList from "../../engine/xms/control/XmsCList"
import XmsCOle from "../../engine/xms/control/XmsCOle"
import XmsCSlider from "../../engine/xms/control/XmsCSlider"
import XmsCTab from "../../engine/xms/control/XmsCTab"
import XmsCText from "../../engine/xms/control/XmsCText"
import _LISTLINE from "../../engine/xms/control/head/_LISTLINE"
import _LISTTITLE from "../../engine/xms/control/head/_LISTTITLE"
import _CLASSARRAY from "../../engine/xms/first/_CLASSARRAY"
import GmPlay from "../../engtst/mgm/GmPlay"
import GmProtocol from "../../engtst/mgm/GmProtocol"
import XStat from "../../engtst/mgm/XStat"

import XmsEngine from "./XmsEngine"
import GmConfig from "../../config/GmConfig";

export default class RunFirst extends BaseClass
{
    constructor()
    {
        super();
        this.bClose=false;

    }
    _Init()
	{
        RunFirst.paaole=XmsEngine.paaole;
		RunFirst.panimaole=XmsEngine.panimaole;
		this.pm3f=M3DFast.gi();
		
		this.pbaseclass= this.prunclass.GetBase();
		
		this.prunclass= this.prunclass.GetCopy();
		this.pface=this.prunclass;

		this.InitBefore();
		
		this.InitMemory(this.pbaseclass.FindFirst("初始化",3));
		this.InitMemory(this.prunclass);
//		this.InitMemory(this.pbaseclass);
		
		this.InitAfter();
    }
    InitBefore()
	{
    }
    InitAfter()
	{
		this.RunCode(this.prunclass.FindCode("初始化后执行"));
    }
    Draw()
	{
		this._Draw();
//		if(this.bClose)XStat.x_stat.PopStat(1);
    }
    ProcTouch( msg, x, y)
	{
		if (this._ProcTouch(msg, x, y))
		{
//			if (this.bClose)XStat.x_stat.PopStat(1);
			return true;
		}
		return false;
    }
    InitMemory( pfirst)
	{//初始化内存，数组模式的创建数组，
		//pfirst.GetBase().GetCopy();
		var pclass;
		if(pfirst.iType==10 && pfirst.sName=="唯一处理标识")
		{//
			var pnum=pfirst;
			pclass=pnum.pback;
			switch(pnum.iNumber)
			{
			case 301://载入动画
				RunFirst.panimaole.LoadOleAnima(pclass.FindWord("载入到索引").pword,pclass.FindWord("动画文件").pword);
				break;
			case 501://屏幕尺寸
				RunFirst.SCRW=pclass.FindNumber("屏幕宽度").iNumber;
				RunFirst.SCRH=pclass.FindNumber("屏幕高度").iNumber;
				RunFirst.SCRW=GmConfig.SCRW;
				RunFirst.SCRH=GmConfig.SCRH;
				break;

			//控件部分
			case 101://按钮
				pclass.pobj=new XmsCButton(this.pm3f,pclass,this);
				return true;
			case 102://列表
				pclass.pobj=new XmsCList(this.pm3f,pclass,this);
				return true;
			case 103://容器
				pclass.pobj=new XmsCOle(this.pm3f,pclass,this);
				return true;
			case 104://标签
				pclass.pobj=new XmsCTab(this.pm3f,pclass,this);
				return true;
			case 105://
				pclass.pobj=new XmsCSlider(this.pm3f,pclass,this);
				return true;
			case 201://框体
				pclass.pobj=new XmsCFrame(this.pm3f,pclass,this);
				return true;
			case 202://动画
				pclass.pobj=new XmsCAnima(this.pm3f,pclass,this);
				return true;
			case 203://文本
				pclass.pobj=new XmsCText(this.pm3f,pclass,this);
				return true;
			}
		}
		if(pfirst.iType==40)
		{//class
			var i;
			var pf;
			var pca;
			pclass=pfirst;
			pca=pclass.pca;
			for(i=0;i<pclass.iArray;i++)
			{
				pf=pca.phead;
				while(pf!=null)
				{
					if(this.InitMemory(pf))break;
					pf=pf.pdown;
				}
				pca=pca.pnext;
			}
		}
		return false;
    }
    _Draw()
	{
		if(this.pface!=null)
		{
			this.DrawFirst(this.pface,0,0);
		}
    }
    DrawFirst( pfirst, offx, offy)
	{
		var pclass;
		if(pfirst.iType==10 && pfirst.sName=="唯一处理标识")
		{//
			var pnum=pfirst;
			pclass=pnum.pback;
			switch(pnum.iNumber)
			{
			case 400://界面
				this.Draw_Interface400(pclass);
				return true;

			case 101://按钮
				this.Draw_CButton(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				return true;
			case 102://列表
				this.Draw_CList(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				return true;
			case 104://
				this.Draw_CTab104(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				return true;
			case 105:
				this.Draw_Slider105(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				return true;
			case 201://框体
				this.Draw_CFrame201(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				return true;
			case 202://动画
				this.Draw_CAnima202(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				//Draw_202(pclass,this.iInterfaceX,this.iInterfaceY);
				return true;
			case 203://文字
				this.Draw_CText203(pclass.pobj,this.iInterfaceX,this.iInterfaceY);
				//Draw_203(pclass,this.iInterfaceX,this.iInterfaceY);
				return true;
			}
		}
		if(pfirst.iType==40)
		{//class
			var i;
			pclass=pfirst;
			var pca=pclass.pca;
			var pf;
			for(i=0;i<pclass.iArray;i++)
			{
				pf=pca.phead;
				while(pf!=null)
				{
					if(this.DrawFirst(pf,offx,offy))return false;
					pf=pf.pdown;
				}
				pca=pca.pnext;
			}
		}
		return false;
    }
    Draw_Interface400( pclass)
	{
		var pc;
		var pw;
		pc=pclass.FindClass("界面区域");//界面区域
		if(pc!=null)
		{
			this.iInterfaceX=pc.FindNumber("坐标X").iNumber;
			this.iInterfaceY=pc.FindNumber("坐标X").iNumber;
			this.iInterfaceW=pc.FindNumber("宽度").iNumber;
			this.iInterfaceH=pc.FindNumber("高度").iNumber;
		}
		pw=pclass.FindWord("对齐方式");
		if(pw!=null)
		{
			if(pw.pword=="上"){			this.iInterfaceX=(RunFirst.SCRW-this.iInterfaceW)/2;			this.iInterfaceY=0;		}
			else if(pw.pword=="左上"){			this.iInterfaceX=0;			this.iInterfaceY=0;		}
			else if(pw.pword=="左"){			this.iInterfaceX=0;			this.iInterfaceY=(RunFirst.SCRH-this.iInterfaceH)/2;		}
			else if(pw.pword=="左下"){			this.iInterfaceX=0;			this.iInterfaceY=RunFirst.SCRH-this.iInterfaceH;		}
			else if(pw.pword=="下"){			this.iInterfaceX=(RunFirst.SCRW-this.iInterfaceW)/2;			this.iInterfaceY=RunFirst.SCRH-this.iInterfaceH;		}
			else if(pw.pword=="右下"){			this.iInterfaceX=RunFirst.SCRW-this.iInterfaceW;			this.iInterfaceY=RunFirst.SCRH-this.iInterfaceH;		}
			else if(pw.pword=="右"){			this.iInterfaceX=RunFirst.SCRW-this.iInterfaceW;			this.iInterfaceY=(RunFirst.SCRH-this.iInterfaceH)/2;		}
			else if(pw.pword=="右上"){			this.iInterfaceX=RunFirst.SCRW-this.iInterfaceW;			this.iInterfaceY=0;		}
			else if(pw.pword=="居中"){			this.iInterfaceX=(RunFirst.SCRW-this.iInterfaceW)/2;			this.iInterfaceY=(RunFirst.SCRH-this.iInterfaceH)/2;		}
		}
    }
     Draw_CList( pclist, offx, offy)
	{
		pclist.Draw(offx,offy);
	}
	 Draw_COle( pcole, offx, offy)
	{
		pcole.Draw(offx,offy);
	}

	 Draw_CButton( pbtn, offx, offy)
	{
		pbtn.Draw(offx,offy);
	}

	 Draw_CTab104( ptab, offx, offy)
	{//整框
		ptab.Draw(offx,offy);
	}
	 Draw_Slider105( pslider, offx, offy)
	{
		pslider.Draw(offx,offy);
	}
	 Draw_CFrame201( pframe, offx, offy)
	{//整框
		if(pframe!=null)pframe.Draw(offx,offy);
	}

	 Draw_CText203( pctext, offx, offy)
	{
		pctext.Draw(offx,offy);
	}

	 Draw_CAnima202( panima, offx, offy)
	{
		panima.Draw(offx,offy);
    }
    _ProcTouch( msg, x, y)
	{
		if(this.pface!=null)
		{
			var ret=this.ProcTouchFirst(this.pface,msg,x,y);
			if(this.bClose)
			{
				XStat.x_stat.PopStat(1);
				return true;
			}
			return false;
		}
		return false;
    }
    ProcTouchFirst( pfirst, msg, x, y)
	{
		var pclass;
		if(pfirst.iType==10 && pfirst.sName=="唯一处理标识")
		{//
			var pnum=pfirst;
			pclass=pnum.pback;

			switch(pnum.iNumber)
			{
			case 400://界面
				return false;
			case 101://按钮
				if(this.Touch_CButton(pclass,msg,x,y))return true;
				return false;
			case 102://列表
				if(this.Touch_CList(pclass,msg,x,y))return true;
				return false;
			case 104:
				if(this.Touch_CTab(pclass,msg,x,y))return true;
				return false;
			case 105:
				if(this.Touch_Control(pclass,msg,x,y))return true;
				return false;
			case 201://框体
				if(this.Touch_CFrame(pclass,msg,x,y))return true;
				return false;
			}
		}
		if(pfirst.iType==40)
		{//class
			var i;
			pclass=pfirst;
			var pca=pclass.pca;
			var pf;
			for(i=0;i<pclass.iArray;i++)
			{
				pf=pca.phead;
				while(pf!=null)
				{
//					GmPlay.sop("\\"+pf.sName);
					if(this.ProcTouchFirst(pf,msg,x,y))return true;
					pf=pf.pdown;
				}
				pca=pca.pnext;
			}
		}
		return false;
    }
    Touch_CButton( pclass, msg, x, y)
	{
		if(pclass.pobj==null)return false;
		var pbtn=pclass.pobj;
		if(pbtn.ProcTouch(msg,x,y))
		{
//			if(pbtn.bCheck())
//			{
//				pclass.FindNumber("被点击次数").iNumber++;
//			}
			return true;
		}
		return false;
	}
	
	 Touch_CTab( pclass, msg,x, y)
	{
		if(pclass.pobj==null)return false;
		var ptab=pclass.pobj;
		if(ptab.ProcTouch(msg,x,y))
		{
			return true;
		}
		return false;
	}


	 Touch_CList( pclass, msg, x, y)
	{
		var plist=pclass.pobj;
//		GmPlay.sop("--"+pclass.sName+plist);
		if(plist.ProcTouch(msg,x,y))
		{
			return true;
		}
		return false;
	}
	 Touch_CFrame( pclass, msg, x, y)
	{
		if(pclass.pobj==null)return false;
		var pframe=pclass.pobj;
		if(pframe.ProcTouch(msg,x,y))
		{
			return true;
		}
		return false;
	}
	 Touch_Control( pclass, msg, x, y)
	{
		if(pclass.pobj==null)return false;
		if((pclass.pobj).ProcTouch(msg,x,y))
		{
			return true;
		}
		return false;
	}
	
	/////////////////////
	 FindControl( pc, name)
	{
		pc=pc.FindFirst(name, 10);
		if(pc==null)return null;
		GmPlay.sop("find"+name);
		return  pc.pobj;
	}
	
	 ReloadControl( pfirst)
	{
		if (pfirst == null)return false;
		var pclass;
		if (pfirst.iType == 10 && pfirst.sName=="唯一处理标识")
		{//
			var pnum = pfirst;
			pclass = pnum.pback;
			GmPlay.sop("Reload Type = "+pnum.iNumber);
			switch (pnum.iNumber)
			{
				//控件部分
			case 101://按钮
				((pclass.pobj)).ReLoad();
				return true;
			case 102://列表
				((pclass.pobj)).ReLoad();
				return true;
			case 103://容器
				((pclass.pobj)).ReLoad();
				return true;
			case 104://标签
				((pclass.pobj)).ReLoad();
				return true;
			case 105://滑杆
				((pclass.pobj)).ReLoad();
				return true;

			case 201://框体
				((pclass.pobj)).ReLoad();
				return true;
			case 202://动画
				((pclass.pobj)).ReLoad();
				return true;
			case 203://文本
				((pclass.pobj)).ReLoad();
				return true;
			}
		}
		if (pfirst.iType == 40)
		{//class
			var i;
			var pf;
			var pca;
			pclass = pfirst;
			pca = pclass.pca;
			for (i = 0; i<pclass.iArray; i++)
			{
				pf = pca.phead;
				while (pf != null)
				{
					if (this.ReloadControl(pf))break;
					pf = pf.pdown;
				}
				pca = pca.pnext;
			}
		}
		return false;
	}
	 atoi( s)
	{
		return parseInt(s);
	}
	
	
	 getnextword(s, p, len)
	{
        var i,j=0;
        var mid=new Array();
		for(i=0;i<len-p;i++)
		{
			if(s[p+i]!=' ' && s[p+i]!='\r' && s[p+i]!='\n')break;
		}
		this.out="";
		if(i>=len-p)
		{
			//this.out="";
			return 1024;
		}
		for(i=i;i<len-p;i++)
		{
			if(s[p+i]==0)break;
			if(s[p+i]!=' ' && s[p+i]!='\r' && s[p+i]!='\n')
			{
				mid[j++]=s[p+i];
				this.out+=s[p+i];
			}
			else
			{
					//this.out=new String(mid,0,j,"gb2312");
				return i;
			}
		}
		if(j>0)
		{

				//this.out=new String(mid,0,j,"gb2312");

			return i;
		}
		return 1024;
	}
	 RunCode( pcode)
	{
//		GmPlay.sop("RunCode = "+pcode);
		if (pcode == null)return;
		var i;
		var stat = 0;
		var p = 0;
		
//		String string1;
//		String string2;
		var strings=new Array(5);

		var operatetype;//操作类型1string

		var fromtype=0;//来源类型0source  1current  2direct  3memory
		var fromdetail="";//来源详细
		var pfrom=0;

		var totype=0;//目标类型1current
		var todetail="";//目标详细
		var pto=0;

		var comptype1=0;//0int,1string
		var comptype2=2;//0<  1<=  2=  3>= 4>

		var pf=null;
		var pn;
		var pw;
		var pc;
		while (true)
		{
//			GmPlay.sop(""+stat);
			switch (stat)
			{
			case 0:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				
				if (this.out=="set")
				{
					stat = 100;
				}
				else if (this.out=="string")
				{
					stat = 300;
				}
				else if (this.out=="reload")
				{
					stat = 200;
				}
				else if (this.out=="if")
				{
					stat = 400;
				}
				else if (this.out=="button")
				{
					stat = 500;
				}
				else if (this.out=="run")
				{
					stat = 600;
				}
				else if (this.out=="send")
				{
					stat = 700;
				}
				else if (this.out=="close")
				{
					this.bClose = true;
				}
				if (p >= pcode.iLen)return;
				break;
			case 700:
			{
				var values=new Array(7);
				for (i = 0; i < 7; i++)
				{
					p += this.getnextword(pcode.Get(),p,pcode.iLen);
					if (this.out=="string1")values[i]= strings[1];
					else if (this.out=="string2")values[i]= strings[2];
					else values[i]= this.out;
				}
				GmProtocol.pt.xms_send(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
				stat = 0;
			}
			break;
			case 600:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				pf = this.prunclass.FindFirstByPath(this.out);
				if (pf == null)
				{
					return;
				}
				else if (pf.iType == 50)
				{
					this.RunCode(pf);
				}
				break;
			case 500:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				fromdetail=this.out;
				stat = 501;
				break;
			case 501:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="pressdown")
				{
					pf = this.prunclass.FindFirstByPath(fromdetail);
					if (pf == null)
					{
						return;
					}
					else if (pf.iType == 40)
					{
						pc = pf;
						((pc.pobj)).bMouseIn = true;
						((pc.pobj)).bMouseDown = true;
					}
				}
				stat = 0;
				break;
			case 400://if
				p +=this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="compint")comptype1 = 0;
				else if (this.out=="compstr")comptype1 = 1;
				else return;
				stat = 410;
				break;
			case 410:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="fromdirect")
				{
					stat = 411;
				}
				break;
			case 411:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				fromdetail=this.out;
				stat = 420;
				break;
			case 420:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="<")comptype2 = 0;
				else if (this.out=="<=")comptype2 = 1;
				else if (this.out=="=")comptype2 = 2;
				else if (this.out==">=")comptype2 = 3;
				else if (this.out==">")comptype2 = 4;
				else
					return;
				stat = 430;
				break;
			case 430:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="tocurrent")
				{
					totype = 1;
					stat = 431;
				}
				break;
			case 431:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				pf = this.prunclass.FindFirstByPath(this.out);
				if (pf.iType == 10)
				{
					pn = pf;
					todetail= ""+pn.iNumber;
				}
				else if (pf.iType == 30)
				{
					pw = pf;
					todetail= pw.Get();
				}
				else return;
				stat = 440;
				break;
			case 440:
				i = 0;
				if (comptype1 == 0)
				{
					if (comptype2 == 0 && this.atoi(fromdetail) < this.atoi(todetail))i = 1;
					if (comptype2 == 1 && this.atoi(fromdetail) <= this.atoi(todetail))i = 1;
					if (comptype2 == 2 && this.atoi(fromdetail) == this.atoi(todetail))i = 1;
					if (comptype2 == 3 && this.atoi(fromdetail) >= this.atoi(todetail))i = 1;
					if (comptype2 == 4 && this.atoi(fromdetail) > this.atoi(todetail))i = 1;
				}
				else if (comptype1 == 1)
				{
					if (comptype2 == 0 && fromdetail< todetail)i = 1;
					if (comptype2 == 2 && fromdetail==todetail)i = 1;
					if (comptype2 == 4 && fromdetail> todetail)i = 1;
				}
				if (i == 0)
				{//一直跳过到endif
					while (true)
					{
						p += this.getnextword(pcode.Get(),p,pcode.iLen);
						if (p >= pcode.iLen)return;
						if (this.out=="endif")break;
					}
				}
				stat = 0;
				break;
			case 300://
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="append")
				{
					stat = 310;
				}
				else stat = 0;
				break;
			case 310://string append
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="string1")pto = 1;
				else if (this.out=="string2")pto = 2;
				else
				{
					return;
				}
				stat = 311;
				break;
			case 311:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="fromdirect")
				{
					fromtype = 2;
					stat = 312;
				}
				else if (this.out=="frommemory")
				{
					fromtype = 3;
					stat = 313;
				}
				break;
			case 312://fromdirect
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				fromdetail=this.out;
				stat = 320;
				break;
			case 313://frommemory
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="string1")pfrom = 1;
				else if (this.out=="string2")pfrom = 2;
				else
					return;
				stat = 320;
				break;
			case 320:
				if (fromtype == 2)
				{
					this.out= fromdetail;
				}
				else if (fromtype == 3)
				{
					this.out= strings[pfrom];
				}
				strings[pto]+=this.out;
				stat = 0;
				break;
			case 200://reload
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				GmPlay.sop("???????="+this.out);
				if (this.out=="all")
				{
					this.ReloadControl(this.prunclass);
					stat = 0;
				}
				else stat = 0;
				break;
			case 100://数据类型方式
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="string")
				{
					operatetype = 1;
					stat = 110;
				}
				else stat = 0;
				break;
			case 110://来源
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="fromsource")
				{
					stat = 111;
					fromtype = 0;
				}
				else if (this.out=="frommemory")
				{
					stat = 112;
					fromtype = 3;
				}
				else if (this.out=="fromdirect")
				{
					stat = 111;
					fromtype = 2;
				}
				else if(this.out=="fromcurrent")
				{
					stat=111;
					fromtype=1;
				}
				else stat = 0;
				break;
			case 111://获得来源
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				fromdetail=this.out;
				stat = 120;
				break;
			case 112:
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="string1")pfrom = 1;
				else if (this.out=="string2")pfrom = 2;
				else
					return;
				stat = 120;
				break;
			case 120://目标
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="tocurrent")
				{
					stat = 121;
					totype = 1;
				}
				else if (this.out=="tomemory")
				{
					totype = 2;
					stat = 122;
				}
				break;
			case 121://获得目标
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				todetail= this.out;
				stat = 130;
				break;
			case 122://
				p += this.getnextword(pcode.Get(),p,pcode.iLen);
				if (this.out=="string1")pto = 1;
				else if (this.out=="string2")pto = 2;
				else
				{
					return;
				}
				stat = 130;
				break;
			case 130://执行
				if (fromtype == 0 || fromtype == 1)
				{
					if (fromtype == 0)pf = this.pbaseclass.FindFirstByPath(fromdetail);
					if (fromtype == 1)pf = this.prunclass.FindFirstByPath(fromdetail);
					if (pf == null)
					{
						return;
					}
					else if (pf.iType == 10)
					{
						pn = pf;
						this.out=""+pn.iNumber;
					}
					else if (pf.iType == 30)
					{
						pw = pf;
						this.out= pw.Get();
					}
					else
					{
						return;
					}
				}
				else if (fromtype == 2)
				{
					this.out= fromdetail;
				}
				else if (fromtype == 3)
				{
					this.out= strings[pfrom];
				}
				if (totype == 1)
				{
					pf = this.prunclass.FindFirstByPath(todetail);
					if (pf == null)
					{
						return;
					}
					else if (pf.iType == 10)
					{
						pn = pf;
						pn.iNumber = this.atoi(this.out);
					}
					else if (pf.iType == 30)
					{
						pw = pf;
						pw.Set(this.out);
					}
					else
					{
						return;
					}
				}
				else if (totype == 2)
				{
					strings[pto] =this.out;
				}
				stat = 0;
				break;
			default:
				break;
			}
		}
	}
}

RunFirst.paaole;
RunFirst.panimaole;
RunFirst.SCRW,RunFirst.SCRH;