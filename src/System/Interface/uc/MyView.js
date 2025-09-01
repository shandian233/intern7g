
import DataFast from "../../../engine/DataFast"
import PackageTools from "../../../engine/PackageTools"
import TouchManager from "../../../engine/TouchManager"
//import engine.graphics.XImgFast;
import WavFast from "../../../engine/sound/WavFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
//import android.content.Context;
//import android.opengl.GLSurfaceView;
//import android.view.MotionEvent;

	GmCanvas cvs;
	XImgFast imf;
	PackageTools mpt;
	WavFast waf;
    DataFast df;

	boolean bDestory = false;
	boolean bRunning = true;

	public static MyView myView; 
	
//	public boolean bSetFocus=false;
	public MyView( context) {
		super(context);
		myView=this;
		cvs=new GmCanvas();
		imf=new XImgFast(context);
		mpt=new PackageTools(0);
//		waf = new WavFast(context);
        df = new DataFast(context,mpt);
		cvs.imf=imf;
		cvs.mpt=mpt;
//		cvs.waf = waf;
        cvs.df = df;
        
//        setFocusableInTouchMode(true);
        
		setRenderer(cvs);
		//RENDERMODE_WHEN_DIRTY
		//RENDERMODE_CONTINUOUSLY
		setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);
		
		new Thread()
		{
			run()
			{
				while(true)
				{
					try {
						if(!cvs.bInited)
						{
							Thread.sleep(50);
							continue;
						}
						cvs.iTimeOut++;
						if(cvs.iTimeOut>10 && !cvs.bIsRunning)
						{//退到外面，逻辑继续运行，防止掉线
							cvs.m3f.mgl=null;
							XImgFast.bCanLoad=false;
							cvs.gp.GmTimer();
							XImgFast.bCanLoad=true;
						}
						if (bRunning)
							requestRender();
						
//						Canvas canvas=handle.lockCanvas();
	//					draw(canvas);
		//				canvas.save();
			//			handle.unlockCanvasAndPost(canvas);
						Thread.sleep(50);
						if(bDestory)break;
						
//						if(bSetFocus)
//						{
//							bSetFocus=false;
//							
//						}
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}.start();
	}
    public boolean onTouchEvent(final MotionEvent event) {
    	int x,y;
    	int act;
 //   	act=event.getActionMasked();
    	act=event.getAction();
		x=event.getX();
		y=event.getY();
//		if(x<600)
//		{
//			GmPlay.sop("x="+x+",y="+y+"-----------"+event.getPointerCount());
//			GmPlay.sop("act="+act+",mask="+event.getActionMasked());
//		}

		switch(act)
		{
		case MotionEvent.ACTION_DOWN:
			TouchManager.gi().touch_down(0,x, y);
			break;
		case MotionEvent.ACTION_MOVE:
			TouchManager.gi().touch_move(x, y);
			break;
		case MotionEvent.ACTION_UP:
			TouchManager.gi().touch_up(0,x, y);
			break;
		}
		return true;
    }
    public boolean onTouchEvent1(final MotionEvent event) {
    	int x,y;
    	int act,idx,pid;
    	act=event.getActionMasked();
    	idx=event.getActionIndex();
    	
    	pid=event.getPointerId(idx);

    	GmPlay.sop("zzzzzzzzzzzzzzzzzzz");
		x=event.getX(idx);
		y=event.getY(idx);
//		x=event.getX(pid);
//		y=event.getY(pid);
//    	x=event.getX();
//    	y=event.getY();
		
//		if(act!=MotionEvent.ACTION_MOVE)
//			GmPlay.sop("down id="+idx+","+pid+","+x+","+y);
		switch(act)
		{
		case MotionEvent.ACTION_DOWN:
		case MotionEvent.ACTION_POINTER_DOWN:
			TouchManager.gi().touch_down(pid,x, y);
			break;
		case MotionEvent.ACTION_MOVE:
			for(int i=0;i<event.getPointerCount();i++)
			{
				x=event.getX(i);
				y=event.getY(i);
				TouchManager.gi().touch_move(x, y);
			}
			break;
		case MotionEvent.ACTION_UP:
		case MotionEvent.ACTION_POINTER_UP:
			TouchManager.gi().touch_up(pid,x, y);
			break;
		}

/*    	pcount=event.getPointerCount();
    	for(i=0;i<pcount;i++)
    	{
    		pid=event.getPointerId(i);
    		GmPlay.sop(""+i+",pid = "+pid);
    		x=event.getX(pid);
    		y=event.getY(pid);
    		switch(act)
    		{
    		case MotionEvent.ACTION_DOWN:
    			tm.touch_down(pid,x, y);
    			break;
    		case MotionEvent.ACTION_MOVE:
    			tm.touch_move(pid,x, y);
    			break;
    		case MotionEvent.ACTION_UP:
    			tm.touch_up(pid,x, y);
    			break;
    		}
    	}
    	GmPlay.sop("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");*/
		return true;
    }
    
}
