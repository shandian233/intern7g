import PublicInterface from "../../zero/Interface/PublicInterface"
import XDefine from "../../config/XDefine"
//import android.os.Message;
import TouchManager from "../../engine/TouchManager"
import M3DFast from "../../engine/graphics/M3DFast"
import XAnima from "../../engine/graphics/XAnima"

export default class XInput
{
    constructor(ani)
    {
        this.pani=ani;
		this.pm3f=ani.pm3f;
		this.bMouseDown=false;
		this.sDetail="";
		this.sBackPrompt="";
		this.bDetailChanged=false;
		this.bFinished=false;
		this.bHideText=false;
		this.iTextSize=30;
		this.iBackSize=30;
		this.bNumber=false;
		this.iMaxNumber=0x7fffffff;
		this.iLength=64;//默认可输入64个字
		this.iTextColor=0xffffffff;

		// if(XInput.input_handle==null)XInput.input_handle=XInput.init_handle();

		this.bShowing=false;
	}
	onscr()
	{
		this.ph=XInput.GetFreeHandle(this);
		
		if(!this.ph.handle.focus)
		{
			this.ph.handle.pos(this.iX,this.iY);
			this.ph.handle.width=this.iW;
			this.ph.handle.height=this.iH;
		}

		this.ph.iLife=3;
	}
    Draw()
	{
		this.bShowing=true;
		if(this.bMouseDown)this.pm3f.FillRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0x40ffffff);
		this.pm3f.DrawRect_2D(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH, 0xffffffff);
		this.DrawText();
	}

	
	DrawText()
	{
		this.bShowing=true;
		if(this.bHideText)return;
		this.pm3f.SetViewClip(this.iX, this.iY, this.iX+this.iW, this.iY+this.iH);
		if(this.sDetail.length<=0)
		{
			if(this.sBackPrompt.length>0)this.pm3f.DrawTextEx(this.iX+5, this.iY+this.iH/2, this.sBackPrompt,0x30000000, this.iBackSize, 101, 1, 1, 0, 0, -2);
		}
		else
		{
			this.pm3f.DrawTextEx(this.iX+5, this.iY+this.iH/2, this.sDetail,this.iTextColor, this.iTextSize, 101, 1, 1, 0, 0, -2);
		}
		this.pm3f.NoClip();
	}
	OpenInput()
	{
		this.bDetailChanged=false;
		this.bFinished=false;
		this.bMouseDown=false;
// //		message=new Message();
// //		message.what=1;
// //		message.obj=this;
// //		PublicInterface.mMain.mHandler.sendMessage(message);
// //Laya.stage.removeChild(XInput.input_handle);
// XInput.input_handle.text=this.sDetail;
// XInput.input_handle.focus=true;
// //Laya.stage.addChild(XInput.input_handle);
// XInput.lock_x=this;

this.ph=XInput.GetFreeHandle(this);
this.ph.handle.text=this.sDetail;
		XDefine.sop("OpenInput");
	}
	bChanged()
	{
		if(this.bDetailChanged)
		{
			this.bDetailChanged=false;
			return true;
		}
		return false;
	}
	ProcTouch( msg, x, y)
	{
		if(!XDefine.bInRect(x,y,this.iX,this.iY,this.iW,this.iH))
		{
			this.bMouseDown=false;
			return false;
		}
		switch(msg)
		{
		case TouchManager.TOUCH_DOWN:
			this.bMouseDown=true;
			break;
		case TouchManager.TOUCH_UP:
			this.OpenInput();

			break;
		}
		return true;
	}
	Move( x, y, w, h)
	{
		this.iX=x;
		this.iY=y;
		this.iW=w;
		this.iH=h;

		// XInput.input_handle.pos(x,y);
		// XInput.input_handle.width=w;
		// XInput.input_handle.height=h;
	}
}

XInput.init_handle=function()
{
	var it = new Laya.TextInput(this.sDetail);

	it.width = 200;//width：[override] 表示显示对象的宽度，以像素为单位。 注：当值为0时，宽度为自适应大小。    //height：[override] 表示显示对象的高度，以像素为单位。 注：当值为0时，高度为自适应大小。    
	it.height = 50;
	it.pos(0,-50);//设置组件显示的坐标位置，相当于分别设置x和y属性，继承自父类 Sprite

	it.maxChars=64;
	// textInput.wordWrap = true;//此属性继承自父类 Label     //wordWrap 表示文本是否自动换行，默认为false。 若值为true，则自动换行；否则不自动换行    
	//textInput.multiline =true;//设置textInput的多行输入
	it.color="#ffffff";
	it.bgColor = "#303030";//文本背景颜色，以字符串表示。 继承自父类 Label
	it.fontSize = 22;//指定文本的字体大小（以像素为单位）。 默认为20像素，可以通过 Text.defaultSize 设置默认大小。     //继承自父类 Label
	// this.input_user.focus = true;//设置输入框默认获得焦点
	it.alpha=0.01;
	it.textField.alpha=0.01;

	Laya.stage.addChild(it);
	return it;
}
XInput.input_handle=null;
XInput.lock_x=null;
XInput.move_handle=function(x,y,w,h)
{
	XInput.input_handle.width = w;//width：[override] 表示显示对象的宽度，以像素为单位。 注：当值为0时，宽度为自适应大小。    //height：[override] 表示显示对象的高度，以像素为单位。 注：当值为0时，高度为自适应大小。    
	XInput.input_handle.height = h;
	XInput.input_handle.pos(x,y);//设置组件显示的坐标位置，相当于分别设置x和y属性，继承自父类 Sprite
}

class InputHandle
{
	constructor()
	{
		this.bUseing=false;
		this.handle=XInput.init_handle();
		this.iLife=3;
		this.pinput=null;
	}
	Logic()
	{
		if(this.iLife>0)
		{
			this.iLife--;
			this.pinput.sDetail=this.handle.text;
		}
		else
		{
			this.bUseing=false;
			this.iLife=3;
			this.handle.pos(-5,-5);
			this.handle.width=1;
			this.handle.height=1;
			this.handle.text="";
		}
	}
	Logic2()
	{
		if(this.handle.focus)
		{
			this.handle.pos(-5,-5);
			this.handle.width=1;
			this.handle.height=1;
		}
	}
}
InputHandle.pp=new Array();

XInput.make_handle=function()
{
	for(var i=0;i<10;i++)InputHandle.pp[i]=new InputHandle();
}
XInput.GetFreeHandle=function(pinput)
{
	for(var i=0;i<InputHandle.pp.length;i++)
	{
		if(InputHandle.pp[i].bUseing)
		{
			if(InputHandle.pp[i].pinput==pinput)return InputHandle.pp[i];
		}
	}
	for(var i=0;i<InputHandle.pp.length;i++)
	{
		if(InputHandle.pp[i].bUseing==false)
		{
			InputHandle.pp[i].bUseing=true;
			InputHandle.pp[i].pinput=pinput;
			InputHandle.pp[i].handle.text="";
			return InputHandle.pp[i];
		}
	}
	InputHandle.pp[i]=new InputHandle();
	InputHandle.pp[i].bUseing=true;
	InputHandle.pp[i].pinput=pinput;
	InputHandle.pp[i].handle.text="";
	return InputHandle.pp[i];
}
XInput.HandleLogic=function()
{
	for(var i=0;i<InputHandle.pp.length;i++)
	{
		if(InputHandle.pp[i].bUseing)
		{
			InputHandle.pp[i].Logic();
		}
	}
}
XInput.HandleLogic2=function()
{
	for(var i=0;i<InputHandle.pp.length;i++)
	{
		if(InputHandle.pp[i].bUseing)
		{
			InputHandle.pp[i].Logic2();
		}
	}
}
