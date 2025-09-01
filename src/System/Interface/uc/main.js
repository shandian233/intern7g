/*
//import com.umeng.analytics.MobclickAgent;
//import com.tencent.mid.api.MidService;
//import com.tencent.stat.StatService;

import XDefine from "../../../config/XDefine"
import PublicInterface from "../../../zero/Interface/PublicInterface"
import MapManager from "../../../map/MapManager"
import XInput from "../../../engine/control/XInput"
import WavFast from "../../../engine/sound/WavFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
import GmProtocol from "../../../engtst/mgm/GmProtocol"
import XStat from "../../../engtst/mgm/XStat"
//import android.app.Activity;
//import android.content.Context;
//import android.content.pm.ActivityInfo;
//import android.os.Bundle;
//import android.os.Handler;
//import android.os.Message;
//import android.text.Editable;
//import android.text.InputFilter;
//import android.text.InputType;
//import android.text.TextWatcher;
//import android.view.KeyEvent;
//import android.view.View;
//import android.view.ViewGroup;
//import android.view.Window;
//import android.view.WindowManager;
//import android.view.ViewGroup.LayoutParams;
//import android.view.inputmethod.EditorInfo;
//import android.view.inputmethod.InputMethodManager;
//import android.widget.EditText;
//import android.widget.TextView;
//android:screenOrientation="landscape"
	private MyView _mView;

	public EditText inputEditText;
	
	public XInput in_doing;
	public boolean bEditing;
	
	public static main mMain;
 	
   
    @Override
    onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        mMain=this;
        PublicInterface.mMain=this;
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        
        
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);//强制为横屏
//        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);//竖屏
        
		_mView = new MyView(this);
		
		 setContentView(_mView);
        
		inputEditText= new EditText(this);
		bEditing=false;

//		inputEditText.setInputType(InputType.TYPE_CLASS_NUMBER);  
//		inputEditText.setText("hello");
//		inputEditText.setSingleLine(singleLine);
		
		LayoutParams vg=new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
		main.mMain.addContentView(inputEditText, vg);
		inputEditText.setVisibility(View.INVISIBLE);
		inputEditText.setSingleLine(true);
//		inputEditText.setText("hello");
		inputEditText.setBackgroundColor(0);
		inputEditText.setTextColor(0);
		inputEditText.addTextChangedListener(watcher);
		
		inputEditText.setOnEditorActionListener(new EditText.OnEditorActionListener() {
	        public boolean onEditorAction( v, int actionId, KeyEvent event)
	        {
	            if (actionId == EditorInfo.IME_ACTION_DONE)
	            {
	            	in_doing.sDetail=inputEditText.getText().toString();
	            	in_doing.bDetailChanged=true;
////////	            	GmPlay.sop(inputEditText.getText().toString());
	            	inputEditText.setVisibility(View.INVISIBLE);
	            	in_doing.bFinished=true;
	            }
//	            else in_doing.sDetail=inputEditText.getText().toString();
//	            GmPlay.sop("sdfsdfsdf");
	            return false;
	        }
	    });
		
		PublicInterface.gi().Init();
		
		StatService.startStatService(this, "AF2JX7FD9B5E", com.tencent.stat.common.StatConstants.VERSION);
		GmProtocol.sMid=MidService.getMid(this);

    }
    private TextWatcher watcher = new TextWatcher()
    {   
	    beforeTextChanged( s, int start, int count, int after)
     	{  
	        // TODO Auto-generated method stub        
	    }  
        onTextChanged( s, int start, int before,  int count) 
        {  
  //          GmPlay.sop("text:"+s);
        	String ss=inputEditText.getText().toString();
        	if(in_doing.bNumber)
        	{
            	int i;
            	String s2;
            	if(ss.length>10)s2=ss.substring(0, 9);
            	else s2=ss;
            	if(s2.length>0)i=parseInt(s2);
            	else i=0;
            	if(i>in_doing.iMaxNumber)i=in_doing.iMaxNumber;
            	in_doing.sDetail=""+i;
        		if(in_doing.sDetail.length>0 && ss!=in_doing.sDetail)
        		{
        			inputEditText.setText(in_doing.sDetail);
        			inputEditText.setSelection(in_doing.sDetail.length);
        		}
 //      		GmPlay.sop(""+in_doing.iMaxNumber);
        	}
        	else in_doing.sDetail=ss;
        	in_doing.bDetailChanged=true;
        }
		afterTextChanged( s) {
			// TODO Auto-generated method stub
		}
    };
    protected void onResume()
    {
    	super.onResume();
    	MobclickAgent.onResume(this);
    	
    	WavFast.bPause=false;
   // 	StatService.onResume(this);
    }
    protected void onPause()
    {
    	super.onPause();
    	MobclickAgent.onPause(this);
    	
    	WavFast.bPause=true;
    	PublicInterface.gi().Pause();
 //   	StatService.onPause(this);
    }
    protected void onDestroy()
    {
		super.onDestroy();
		System.out.println("________onDestroy_____________________");
//		android.os.Process.killProcess(android.os.Process.myPid());
		PublicInterface.gi().Exit();
	}
    doit()
    {
//		main.mMain.inputEditText.setFocusable(true);
//		main.mMain.inputEditText.setFocusableInTouchMode(true);
    	GmPlay.sop("doit:"+in_doing.sDetail);
    	inputEditText.setText(in_doing.sDetail);
    	inputEditText.setFilters(new InputFilter[]{new InputFilter.LengthFilter(in_doing.iLength)});
    	if(in_doing.bNumber)
    	{
    		inputEditText.setInputType(InputType.TYPE_CLASS_NUMBER);
    	}
    	else
    	{
    		inputEditText.setInputType(InputType.TYPE_CLASS_TEXT);
    	}
//    	inputEditText.layout(500, 500, 600, 600);

    	inputEditText.setVisibility(View.VISIBLE);
//    	GmPlay.sop("in_doing.sDetail.length"+in_doing.sDetail.length);
//    	if(in_doing.sDetail.length>0)
    		inputEditText.setSelection(in_doing.sDetail.length);
    	inputEditText.setFocusable(true);
    	
		InputMethodManager m=(InputMethodManager)main.mMain.getSystemService(Context.INPUT_METHOD_SERVICE);
		m.showSoftInput(inputEditText, InputMethodManager.SHOW_FORCED);
		bEditing=true;
    }
	public Handler mHandler = new Handler() 
	{
		@Override
		handle( msg)
		{
			super.handleMessage(msg);
			switch (msg.what)
			{
			case 1:
				in_doing=(XInput)msg.obj;
				doit();
				break;
			case 3:
				if(in_doing!=null)
				{
					in_doing.sDetail=inputEditText.getText().toString();
					in_doing.bDetailChanged=true;
					in_doing.bFinished=true;
				}
				InputMethodManager m=(InputMethodManager)main.mMain.getSystemService(Context.INPUT_METHOD_SERVICE);
//				m.hideSoftInputFromWindow(inputEditText.getWindowToken(),InputMethodManager.HIDE_NOT_ALWAYS);
				
//				m.hideSoftInputFromWindow(getCurrentFocus().getApplicationWindowToken(),0);
				m.hideSoftInputFromWindow(inputEditText.getWindowToken(),0);
//				m.hideSoftInputFromWindow(getCurrentFocus().getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS); // 显示软键盘,控件ID可以是 EditText,TextView ((InputMethodManager)getSystemService(INPUT_METHOD_SERVICE)).showSoftInput(控件ID, 0);

				inputEditText.setVisibility(View.INVISIBLE);
				break;
			case PublicInterface.MESSAGE_LOGIN:
				PublicInterface.gi()._Login();
				break;
			case PublicInterface.MESSAGE_EXIT:
				PublicInterface.gi()._Exit();
				break;
			}
		}
	};
	
	@Override
	public boolean onKeyDown( keyCode, KeyEvent event) {
		engtst.mgm.GmPlay.sop("onKeyDown.."+keyCode);
		switch (keyCode) {
		case KeyEvent.KEYCODE_BACK:
			if(MapManager.gi().iMapChangeing!=0)
			{
				MapManager.gi().iMapChangeing=0;
				return true;
			}
			else if(XStat.gi().iXStat==XStat.GS_EXITCONFIRM || XStat.gi().iXStat==XStat.GS_KICKOUT)
			{
				return true;
			}
			else if(XStat.gi().iXStat==XStat.GS_GAMEING)
			{
				PublicInterface.gi().Exit();
				//XStat.gi().PushStat(XStat.GS_EXITCONFIRM);
				return true;
			}
			else
			{
				if(XStat.gi().LastStatType(1)==0)
				{
					PublicInterface.gi().Exit();
				}
				else XStat.gi().PopStat(1);
				return true;
//				XStat.gi().PopStat(1);
//				if(XStat.gi().iXStat!=0)return true;
//				else PublicInterface.gi().Exit();
			}
//			GmPlay.sop("XStat.gi().iXStat="+XStat.gi().iXStat);
//			if(XStat.gi().iXStat!=0)return true;
//			break;
		case KeyEvent.KEYCODE_HOME:
			break;
		}
		return super.onKeyDown(keyCode, event);
	}
}*/