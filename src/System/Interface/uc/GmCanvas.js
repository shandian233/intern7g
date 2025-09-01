
//import javax.microedition.khronos.egl.EGLConfig;
//import javax.microedition.khronos.opengles.GL10;

import GmConfig from "../../../config/GmConfig"

import DataFast from "../../../engine/DataFast"
import PackageTools from "../../../engine/PackageTools"
import TouchManager from "../../../engine/TouchManager"
import XAnima from "../../../engine/graphics/XAnima"
//import engine.graphics.XImgFast;
import M3DFast from "../../../engine/graphics/M3DFast"
import WavFast from "../../../engine/sound/WavFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
import XStat from "../../../engtst/mgm/XStat"
import SystemOperate from "../../../engtst/mgm/gameing/fast/SystemOperate"


//import android.opengl.GLSurfaceView;
//import android.os.Debug;

//	float speed =3;
	M3DFast m3f;

	PackageTools mpt;
	XImgFast imf;
	WavFast waf;
    DataFast df;
    GmPlay gp = new GmPlay();

	int ijuli=500;
	float jdh=M3DFast.PI/4;
	float jdz=M3DFast.PI/4;
	int ih=0;
	float ft;

//	float playerDirX =0;
//	float playerDirY =0;
//	float playerX =0;
//	float playerY =0;

	int iAaaAnima;
	int iA1Anima;

	double rotateAngle=0.0 ;
//	private static final String LOG_TAG = VortexView.class.getSimpleName();	
    static long iTime=XDefine.get_ms();
    boolean bFirseDraw=false;

    boolean bIsRunning = false;
    public int iTimeOut=0;
    public int iAddUp=0,iAddCount=0;
	onDrawFrame(GL10 gl) {
//		GmPlay.sop1("--------------aaa----------------");
		bIsRunning = true;
		XAnima.iLoadImageDelay=0;

        
//		int[] maxTextureSize = new int[1];
//		gl.glGetIntegerv(GL10.GL_MAX_TEXTURE_SIZE, maxTextureSize, 0);
//		GmPlay.sop("GL_MAX_TEXTURE_SIZE : "+maxTextureSize[0]);
//		gl.glGetIntegerv(GL10.GL_MAX_TEXTURE_UNITS, maxTextureSize, 0);
//		GmPlay.sop("GL_MAX_TEXTURE_UNITS : "+maxTextureSize[0]);
		// clear the color buffer to show the ClearColor we called above...
		gl.glClear(GL10.GL_COLOR_BUFFER_BIT|GL10.GL_DEPTH_BUFFER_BIT);
		gl.glClearColor(0.0f,0.0f,0.0f,1.0f);
		
		m3f.mgl=gl;
//		m3f.LookAt0(240,160,-277.128f,240,160,0);
		//m3f.LookAt(vlook.x,vlook.y,vlook.z+ih,0+vat.x,0+vat.y,+ih);
		long l1;
		l1=XDefine.get_ms();
		
		gp.GmTimer();
		M3DFast.gi().jniRenderBuffer();
		iAddUp+= (XDefine.get_ms()-l1);
		iAddCount++;
		if(iAddCount>=4)
		{
			SystemOperate.iFPS=iAddUp/iAddCount;
			iAddUp=0;
			iAddCount=0;
		}
		
		iTime=XDefine.get_ms();
		
		iTimeOut=0;
		bIsRunning = false;
		imf.RImage();
//		GmPlay.sop1("--------------bbb----------------");
		
	}

	onSurfaceChanged(GL10 gl, int width, int height) {
		GmConfig.SYSW=width;
		GmConfig.SYSH=height;

		SystemOperate.SetScreenMode(6);

//		GmPlay.sop("aa");
		gl.glViewport(GmConfig.OFFX,GmConfig.OFFY,GmConfig.REALW,GmConfig.REALH);
//		GmPlay.sop("bb");
		m3f.mgl=gl;
		m3f.LookAt(100,100,100,0,0,0,0);
	}

	public boolean bInited=false;
	onSurfaceCreated(GL10 gl, EGLConfig config) {
		GmPlay.sop("GmCanvas onSurfaceCreated");
		
		gl.glClearColor(0,0,0,1);
		
//		m3f = new M3DFast(gl);
		m3f=M3DFast.xm3f;
		m3f.mgl=gl;
		m3f.FirstInit(gl);
		m3f.imf = imf;
		m3f.mpt = mpt;
		//
		gp.xm3f = m3f;
		gp.ximf = imf;
		
		GmPlay.xani_back=new XAnima(m3f);
		GmPlay.xani_back.LoadAnima("back", gp.pls,false);
		
		GmPlay.xani_local=new XAnima(m3f);
		GmPlay.xani_local.LoadAnima("localres/anima", gp.pls,false);
		
		XStat.gi().PushStat(XStat.GS_LEADPAGE);
//		gp.xani.InitImage(m3f);
		bInited=true;
//		GmPlay.sop("cc");
		m3f.LookAt(100,100,100,0,0,0,0);
//		GmPlay.sop("dd");
	}
	boolean dir = true;

	InitGmPlay() {
	}
	
//	playerMove( x, y)
//	{
//	this.playerDirX = x;
//	this.playerDirY = y;
//		
//	}
//	
//	public boolean isArrived()
//	{
//		if((Math.pow(this.playerDirX-this.playerX,2.0)+Math.pow(this.playerDirY-this.playerY,2.0))>=Math.pow(this.speed,2.0))
//				{
//			      return false;
//				}else
//				{
//					return true;
//				}
//	}
}
