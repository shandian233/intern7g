
import AnimaAction from "../../../engine/graphics/AnimaAction"
import M3DFast from "../../../engine/graphics/M3DFast"
import GmPlay from "../../../engtst/mgm/GmPlay"
import SystemOperate from "../../../engtst/mgm/gameing/fast/SystemOperate"

export default class DrawMode {
	constructor()
	{
	}
}
DrawMode.aa_tmp=new AnimaAction();
DrawMode.dm=new DrawMode();
	DrawMode.ui3_frame1=null;
	DrawMode.ui3_frame2=null;
	DrawMode.ui3_frame3=null;
	DrawMode.ui3_frame4=null;
	DrawMode.ui3_frame5=null;
	DrawMode.ui3_text2=null;
	
	DrawMode.ui4_frame1=null;
	DrawMode.ui4_frame2=null;
	
 DrawMode.ui4_FrameUp=function( x, y, w)
	{//上方红框
		if(DrawMode.ui4_frame1==null)
		{
			DrawMode.ui4_frame1=GmPlay.xani_ui4.InitAnimaWithName("对话框上", null);
		}
		DrawMode.ui4_frame1.iFrame=1;DrawMode.ui4_frame1.DrawEx(x+40, y, 101, 1.0*(w-80)/40, 1, 0, 0, 0);
		DrawMode.ui4_frame1.iFrame=0;DrawMode.ui4_frame1.Draw(x, y);
		DrawMode.ui4_frame1.iFrame=2;DrawMode.ui4_frame1.Draw(x+w-40, y);
	}
 DrawMode.ui4_FrameDown=function( x, y, w, h)
	{//下方红框
		if(DrawMode.ui4_frame2==null)
		{
			DrawMode.ui4_frame2=GmPlay.xani_ui4.InitAnimaWithName("对话框下", null);
		}
		DrawMode.ui4_frame2.iFrame=8;DrawMode.ui4_frame2.DrawEx(x+40, y+40, 101, 1.0*(w-80)/40, 1.0*(h-80)/40, 0, 0, 0);
		
		DrawMode.ui4_frame2.iFrame=0;DrawMode.ui4_frame2.Draw(x, y);
		DrawMode.ui4_frame2.iFrame=2;DrawMode.ui4_frame2.Draw(x+w-40, y);
		DrawMode.ui4_frame2.iFrame=4;DrawMode.ui4_frame2.Draw(x+w-40, y+h-40);
		DrawMode.ui4_frame2.iFrame=6;DrawMode.ui4_frame2.Draw(x, y+h-40);
		
		DrawMode.ui4_frame2.iFrame=1;DrawMode.ui4_frame2.DrawEx(x+40, y, 101, 1.0*(w-80)/40, 1, 0, 0, 0);
		DrawMode.ui4_frame2.iFrame=5;DrawMode.ui4_frame2.DrawEx(x+40, y+h-40, 101, 1.0*(w-80)/40, 1, 0, 0, 0);
		
		DrawMode.ui4_frame2.iFrame=3;DrawMode.ui4_frame2.DrawEx(x+w-40, y+40, 101, 1,1.0*(h-80)/40, 0, 0, 0);
		DrawMode.ui4_frame2.iFrame=7;DrawMode.ui4_frame2.DrawEx(x, y+40, 101, 1,1.0*(h-80)/40, 0, 0, 0);
	}
	
	//自定义大框
	DrawMode.ui3_DefineFrame=function( x, y, w, h)
	{
		if(DrawMode.ui3_frame5==null)
		{
			DrawMode.ui3_frame5=GmPlay.xani_ui3.InitAnimaWithName("基本框5", null);
		}
		
		M3DFast.gi().SetViewClip(x+5, y+5, x+w-5, y+h-5);
		GmPlay.xani_ui3.DrawAnima(x+w/2-800/2, y+h/2-480/2, "基本大框",0);
		M3DFast.gi().NoClip();
		DrawMode.ui3_frame5.iFrame=0;DrawMode.ui3_frame5.DrawEx(x, y, 101, 1, 1, 0, 0, 0);
		
		DrawMode.ui3_frame5.iFrame=2;DrawMode.ui3_frame5.DrawEx(x+w-50, y, 101, 1, 1, 0, 0, 0);
		
		DrawMode.ui3_frame5.iFrame=4;DrawMode.ui3_frame5.DrawEx(x+w-50, y+h-50, 101, 1, 1, 0, 0, 0);
		
		DrawMode.ui3_frame5.iFrame=6;DrawMode.ui3_frame5.DrawEx(x, y+h-50, 101, 1, 1, 0, 0, 0);
		
		if(w>100)
		{
			DrawMode.ui3_frame5.iFrame=1;
			DrawMode.ui3_frame5.DrawEx(x+50, y, 101, 1.0*(w-100)/200, 1, 0, 0, 0);
			
			DrawMode.ui3_frame5.iFrame=5;
			DrawMode.ui3_frame5.DrawEx(x+50, y+h-11, 101, 1.0*(w-100)/200, 1, 0, 0, 0);
		}
		if(h>100)
		{
			DrawMode.ui3_frame5.iFrame=3;
			DrawMode.ui3_frame5.DrawEx(x+w-11, y+50, 101, 1, 1.0*(h-100)/200, 0, 0, 0);
			
			DrawMode.ui3_frame5.iFrame=7;
			DrawMode.ui3_frame5.DrawEx(x, y+50, 101, 1, 1.0*(h-100)/200, 0, 0, 0);
		}
	}
	
	DrawMode.ui3_TagText4=function( x, y, s1, s2, s3, s4)
	{//宽30，高80，右测小字
//		M3DFast.gi().DrawText_2(x+15, y+14+18*0, s1, 0xffC8A000, 17, 101, 1, 1, 0,-2,-2, 3, 0xff000000);
//		M3DFast.gi().DrawText_2(x+15, y+14+18*1, s2, 0xffC8A000, 17, 101, 1, 1, 0,-2,-2, 3, 0xff000000);
//		M3DFast.gi().DrawText_2(x+15, y+14+18*2, s3, 0xffC8A000, 17, 101, 1, 1, 0,-2,-2, 3, 0xff000000);
//		M3DFast.gi().DrawText_2(x+15, y+14+18*3, s4, 0xffC8A000, 17, 101, 1, 1, 0,-2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+5+18*0, s1, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+5+18*1, s2, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+5+18*2, s3, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+5+18*3, s4, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
	}
	DrawMode.ui3_TagText3=function( x, y, s1, s2, s3)
	{//宽30，高80
		M3DFast.gi().DrawText_2(x+15, y+10+22*0, s1, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+10+22*1, s2, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+10+22*2, s3, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
	}
	DrawMode.ui3_TagText2=function( x, y, s1, s2)
	{//宽30，高80
		M3DFast.gi().DrawText_2(x+15, y+18+26*0, s1, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+15, y+18+26*1, s2, 0xffC8A000, 17, 101, 1, 1, 0,-2,0, 3, 0xff000000);
	}
	DrawMode.ui3_BaseFrame2=function( x, y, s1, s2)
	{
		GmPlay.xani_ui3.DrawAnima(x, y, "基本大框",0);
		M3DFast.gi().DrawText_2(x+21, y+130-23, s1, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+21, y+130+23, s2, 0xffffffff, 20, 101, 1, 1, 0,-2,-2, 3, 0xff000000);
	}
	
	DrawMode.ui3_BaseFrame3=function( x, y, s1, s2, s3)
	{
		GmPlay.xani_ui3.DrawAnima(x, y, "基本大框",0);
		M3DFast.gi().DrawText_2(x+21, y+130-35, s1, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+21, y+130, s2, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+21, y+130+35, s3, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
	}
	
	DrawMode.ui3_BaseFrame4=function( x, y, s1, s2, s3, s4)
	{
		GmPlay.xani_ui3.DrawAnima(x, y, "基本大框",0);
		M3DFast.gi().DrawText_2(x+21, y+130-45, s1, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+21, y+130-15, s2, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+21, y+130+15, s3, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+21, y+130+45, s4, 0xffffffff, 20, 101, 1, 1, 0, -2,-2, 3, 0xff000000);
	}
	
	DrawMode.ui3_Frame1=function( x, y, w, h)
	{
		if(DrawMode.ui3_frame1==null)
		{
			DrawMode.ui3_frame1=GmPlay.xani_ui3.InitAnimaWithName("基本框1", null);
		}
		GmPlay.xani_ui3.DrawAnima_aa(x, y, DrawMode.ui3_frame1.iAnimaPoint,0);
		GmPlay.xani_ui3.DrawAnimaEx(x+10, y, DrawMode.ui3_frame1.iAnimaPoint,1,101,1.0*(w-20)/10,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-10, y, DrawMode.ui3_frame1.iAnimaPoint,2);
		GmPlay.xani_ui3.DrawAnimaEx(x+w-10, y+10, DrawMode.ui3_frame1.iAnimaPoint,3,101,1,1.0*(h-20)/10,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-10, y+h-10, DrawMode.ui3_frame1.iAnimaPoint,4);
		GmPlay.xani_ui3.DrawAnimaEx(x+10, y+h-10, DrawMode.ui3_frame1.iAnimaPoint,5,101,1.0*(w-20)/10,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x, y+h-10, DrawMode.ui3_frame1.iAnimaPoint,6);
		GmPlay.xani_ui3.DrawAnimaEx(x, y+10, DrawMode.ui3_frame1.iAnimaPoint,7,101,1,1.0*(h-20)/10,0,0,0);
		
		GmPlay.xani_ui3.DrawAnimaEx(x+10, y+10, DrawMode.ui3_frame1.iAnimaPoint,8,101,1.0*(w-20)/10,1.0*(h-20)/10,0,0,0);
	}
	DrawMode. ui3_Frame2=function( x, y, w, h)
	{
		if(DrawMode.ui3_frame2==null)
		{
			DrawMode.ui3_frame2=GmPlay.xani_ui3.InitAnimaWithName("基本框2", null);
		}
		GmPlay.xani_ui3.DrawAnima_aa(x, y, DrawMode.ui3_frame2.iAnimaPoint,0);
		GmPlay.xani_ui3.DrawAnimaEx(x+10, y, DrawMode.ui3_frame2.iAnimaPoint,1,101,1.0*(w-20)/10,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-10, y, DrawMode.ui3_frame2.iAnimaPoint,2);
		GmPlay.xani_ui3.DrawAnimaEx(x+w-10, y+10, DrawMode.ui3_frame2.iAnimaPoint,3,101,1,1.0*(h-20)/10,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-10, y+h-10, DrawMode.ui3_frame2.iAnimaPoint,4);
		GmPlay.xani_ui3.DrawAnimaEx(x+10, y+h-10, DrawMode.ui3_frame2.iAnimaPoint,5,101,1.0*(w-20)/10,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x, y+h-10, DrawMode.ui3_frame2.iAnimaPoint,6);
		GmPlay.xani_ui3.DrawAnimaEx(x, y+10, DrawMode.ui3_frame2.iAnimaPoint,7,101,1,1.0*(h-20)/10,0,0,0);
		
		GmPlay.xani_ui3.DrawAnimaEx(x+10, y+10, DrawMode.ui3_frame2.iAnimaPoint,8,101,1.0*(w-20)/10,1.0*(h-20)/10,0,0,0);
	}
	DrawMode.ui3_Frame3=function( x, y, w, h)
	{
		if(DrawMode.ui3_frame3==null)
		{
			DrawMode.ui3_frame3=GmPlay.xani_ui3.InitAnimaWithName("基本框3", null);
		}
		GmPlay.xani_ui3.DrawAnima_aa(x, y, DrawMode.ui3_frame3.iAnimaPoint,0);
		GmPlay.xani_ui3.DrawAnimaEx(x+13, y, DrawMode.ui3_frame3.iAnimaPoint,1,101,1.0*(w-26)/13,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-13, y, DrawMode.ui3_frame3.iAnimaPoint,2);
		GmPlay.xani_ui3.DrawAnimaEx(x+w-13, y+13, DrawMode.ui3_frame3.iAnimaPoint,3,101,1,1.0*(h-26)/13,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-13, y+h-13, DrawMode.ui3_frame3.iAnimaPoint,4);
		GmPlay.xani_ui3.DrawAnimaEx(x+13, y+h-13, DrawMode.ui3_frame3.iAnimaPoint,5,101,1.0*(w-26)/13,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x, y+h-13, DrawMode.ui3_frame3.iAnimaPoint,6);
		GmPlay.xani_ui3.DrawAnimaEx(x, y+13, DrawMode.ui3_frame3.iAnimaPoint,7,101,1,1.0*(h-26)/13,0,0,0);
		
//		GmPlay.xani_ui3.DrawAnimaEx(x+10, y+10, DrawMode.ui3_frame2.iAnimaPoint,8,101,1.0*(w-20)/10,1.0*(h-20)/10,0,0,0);
	}
	DrawMode.ui3_Frame4=function( x, y, w, h)
	{
		if(DrawMode.ui3_frame4==null)
		{
			DrawMode.ui3_frame4=GmPlay.xani_ui3.InitAnimaWithName("基本框4", null);
		}
		GmPlay.xani_ui3.DrawAnima_aa(x, y, DrawMode.ui3_frame4.iAnimaPoint,0);
		GmPlay.xani_ui3.DrawAnimaEx(x+30, y, DrawMode.ui3_frame4.iAnimaPoint,1,101,1.0*(w-60)/30,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-30, y, DrawMode.ui3_frame4.iAnimaPoint,2);
		GmPlay.xani_ui3.DrawAnimaEx(x+w-30, y+30, DrawMode.ui3_frame4.iAnimaPoint,3,101,1,1.0*(h-60)/30,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w-30, y+h-30, DrawMode.ui3_frame4.iAnimaPoint,4);
		GmPlay.xani_ui3.DrawAnimaEx(x+30, y+h-30, DrawMode.ui3_frame4.iAnimaPoint,5,101,1.0*(w-60)/30,1,0,0,0);
		GmPlay.xani_ui3.DrawAnima_aa(x, y+h-30, DrawMode.ui3_frame4.iAnimaPoint,6);
		GmPlay.xani_ui3.DrawAnimaEx(x, y+30, DrawMode.ui3_frame4.iAnimaPoint,7,101,1,1.0*(h-60)/30,0,0,0);
		
		GmPlay.xani_ui3.DrawAnimaEx(x+30, y+30, DrawMode.ui3_frame4.iAnimaPoint,8,101,1.0*(w-60)/30,1.0*(h-60)/30,0,0,0);
	}
	DrawMode.ui3_Text1=function( x, y, w1, w2, s1, s2)
	{
		DrawMode.frame_type1("3号框20_30", x, y, w1, 20);
		DrawMode.frame_type1("4号框20_30", x + w1, y, w2, 20);
		M3DFast.gi().DrawText_2(x + w1 / 2, y + 16, s1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 0, 0xff000000);
		M3DFast.gi().DrawText_2(x + w1 + w2 / 2, y + 16, s2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 0, 0xff000000);
	}
	//两个字，w1/w2 都固定 
	DrawMode.ui3_Text1_=function( x, y, w1, w2, s1, s2)
	{
	/*	if(ui3_text1==null)
		{
			ui3_text1=GmPlay.xani_ui3.InitAnimaWithName("标签文本1", null);
		}
		GmPlay.xani_ui3.DrawAnima_aa(x, y, ui3_text1.iAnimaPoint,0);
		GmPlay.xani_ui3.DrawAnima_aa(x+w1+w2-110, y, ui3_text1.iAnimaPoint,2);
		GmPlay.xani_ui3.DrawAnima_aa(x+w1-58, y, ui3_text1.iAnimaPoint,1);
		*/
		
		GmPlay.xani_nui2.DrawAnima(x, y, "提示1",0);
		GmPlay.xani_nui2.DrawAnimaEx(x+w1, y, "可变长文字框",0,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w1+15, y, "可变长文字框",1,101,1.0*(w2-30)/20,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w1+w2-20, y, "可变长文字框",2,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		
	//	M3DFast.gi().DrawText_2(x+w1/2, y+16, s1, 0xffffe0a0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	//	M3DFast.gi().DrawText_2(x+w1+w2/2, y+16, s2, 0xffffe0a0, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		M3DFast.gi().DrawText_2(x+w1/2, y+16, s1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+w1+w2/2, y+16, s2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	
	}
	// 两个字，w1固定／w2 为可变长度
	DrawMode.ui3_Text1__=function( x, y, w1, w2, s1, s2)
	{
		
		GmPlay.xani_nui2.DrawAnima(x, y, "提示1",0);
		GmPlay.xani_nui2.DrawAnimaEx(x+w1, y, "可变长文字框",0,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w1+20, y, "可变长文字框",1,101,(w2-40)/20,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w1+20+w2-40, y, "可变长文字框",2,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
			
		M3DFast.gi().DrawText_2(x+w1/2, y+16, s1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+w1+w2/2, y+16, s2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	
	}
	//四个字，w1固定／w2固定
	DrawMode.ui3_Text1_4word=function( x, y, w1, w2, s1, s2)
	{	
		GmPlay.xani_nui2.DrawAnima(x, y, "提示1",2);
		GmPlay.xani_nui2.DrawAnimaEx(x+w1, y, "可变长文字框",0,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w1+18, y, "可变长文字框",1,101,1.0*(w2-36)/20,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w1+w2-20, y, "可变长文字框",2,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
			
		M3DFast.gi().DrawText_2(x+w1/2, y+16, s1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		M3DFast.gi().DrawText_2(x+w1+w2/2, y+16, s2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	
	}
	//四个字，w1固定／w2可变长度
	DrawMode.ui3_Text1_4word_=function( x, y, w1, w2, s1, s2)
		{	
			GmPlay.xani_nui2.DrawAnima(x, y, "提示1",2);
			GmPlay.xani_nui2.DrawAnimaEx(x+w1, y, "可变长文字框",0,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
			GmPlay.xani_nui2.DrawAnimaEx(x+w1+20, y, "可变长文字框",1,101,(w2-40)/20,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
			GmPlay.xani_nui2.DrawAnimaEx(x+w1+20+w2-40, y, "可变长文字框",2,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
				
			M3DFast.gi().DrawText_2(x+w1/2, y+16, s1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
			M3DFast.gi().DrawText_2(x+w1+w2/2, y+16, s2, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
		
		}
	
	//width = 整个背景条宽度； length ＝ 单个切片宽度
	DrawMode.new_bgbar=function( x,  y,  width,  length,  str)
	{
		GmPlay.xani_nui2.DrawAnimaEx(x, y, str,0,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+length,y, str,1,101,(width-length*2)/length,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+width-length, y, str,2,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		
	}
	DrawMode.ui3_Text2=function( x, y, w1, w2, s1, s2)
	{
		if(DrawMode.ui3_text2==null)
		{
			DrawMode.ui3_text2=GmPlay.xani_ui3.InitAnimaWithName("标签文本2", null);
		}
//		GmPlay.xani_ui3.DrawAnima_aa(x, y, ui3_text1.iAnimaPoint,0);
//		GmPlay.xani_ui3.DrawAnima_aa(x+w1+w2-110, y, ui3_text1.iAnimaPoint,2);
//		GmPlay.xani_ui3.DrawAnima_aa(x+w1-58, y, ui3_text1.iAnimaPoint,1);
		if(w2<124)
		{
			GmPlay.xani_ui3.DrawAnima_aa(x+w1, y+4, DrawMode.ui3_text2.iAnimaPoint,2);
			GmPlay.xani_ui3.DrawAnima_aa(x+w1+w2-64, y+4, DrawMode.ui3_text2.iAnimaPoint,3);
		}
		else
		{
			GmPlay.xani_ui3.DrawAnima_aa(x+w1, y+4, DrawMode.ui3_text2.iAnimaPoint,0);
			GmPlay.xani_ui3.DrawAnima_aa(x+w1+w2-122, y+4, DrawMode.ui3_text2.iAnimaPoint,1);
		}

		M3DFast.gi().DrawText_2(x+w1/2, y+20, s1, 0xff80ff00, 22, 101, 1, 1, 0, -2, -2, 3,0xff000000 );
		M3DFast.gi().DrawText_2(x+w1+w2/2, y+20, s2, 0xff80ff00, 22, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	}
	
	//xuc 0326 新增===========
	DrawMode.ui3_Text2_=function( x, y, w1, w2, s1, s2)
	{
		GmPlay.xani_nui2.DrawAnima(x+10, y+33, "快捷提示分割条",0);
		
		M3DFast.gi().DrawTextEx(x+w1/2, y+20, s1, 0xff003e57, 20, 101, 1, 1, 0, -2, -2);
		M3DFast.gi().DrawTextEx(x+w1+w2/2, y+20, s2, 0xff003e57, 20, 101, 1, 1, 0, -2, -2);
	}
	
	DrawMode.Tag1_TW=function( x, y, w)
	{
		
	}

	DrawMode.Data1_BR=function( x, y, name, value, offx, w)
	{//名字+框+数据
		M3DFast.gi().DrawTextEx(x, y+10, name, 0xffffffff, 20, 101, 1, 1, 0, 0, -2);
		DrawMode.Text1_BR(x+offx,y,w);
		M3DFast.gi().DrawTextEx(x+offx+w/2,y+10, value, 0xffffffff, 20, 101, 1, 1, 0, -2, -2);
	}
	
	DrawMode.Text1_BR=function( x, y, w)
	{//参数条子
		GmPlay.xani_ui.InitAnimaWithName("统一文本框1", DrawMode.aa_tmp);
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,0, 101, 1, 1, 0, 0, 0);//左
		GmPlay.xani_ui.DrawAnimaEx(x+w-20, y, DrawMode.aa_tmp.iAnimaPoint,1, 101, 1, 1, 0, 0, 0);//右
		GmPlay.xani_ui.DrawAnimaEx(x+20, y, DrawMode.aa_tmp.iAnimaPoint,2, 101, 1.0*(w-40)/20, 1, 0, 0, 0);
		
	}
	DrawMode.Frame1_BR=function( x, y, w, h)
	{
		GmPlay.xani_ui.InitAnimaWithName("统一红黑框", DrawMode.aa_tmp);
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,0, 101, 1.0*w/404, 1.0*h/222, 0, 0, 0);//主背景
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,2, 101, 1.0*w/10, 1, 0, 0, 0);//上边
		GmPlay.xani_ui.DrawAnimaEx(x, y+h-3, DrawMode.aa_tmp.iAnimaPoint,6, 101, 1.0*w/10, 1, 0, 0, 0);//下边
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,8, 101, 1,1.0*h/10, 0, 0, 0);//左边
		GmPlay.xani_ui.DrawAnimaEx(x+w-3, y, DrawMode.aa_tmp.iAnimaPoint,4, 101, 1,1.0*h/10, 0, 0, 0);//右边
		
		GmPlay.xani_ui.DrawAnima_aa(x, y, DrawMode.aa_tmp.iAnimaPoint, 1);//左上
		GmPlay.xani_ui.DrawAnima_aa(x+w-10, y, DrawMode.aa_tmp.iAnimaPoint, 3);//右上
		GmPlay.xani_ui.DrawAnima_aa(x+w-10, y+h-10, DrawMode.aa_tmp.iAnimaPoint, 5);//右下
		GmPlay.xani_ui.DrawAnima_aa(x, y+h-10, DrawMode.aa_tmp.iAnimaPoint, 7);//左下
	}
	DrawMode.Frame2_MD=function( x, y, w, h)
	{
		// M3DFast.gi().FillRect_2D(x, y, x+w,y+h , 0xffffff00);//0xffbfded6
		DrawMode.new_framein(x,y,w,h,0xfffbd688);
		return;

		GmPlay.xani_ui.InitAnimaWithName("统一中间层", DrawMode.aa_tmp);
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,0, 101, 1.0*w/250, 1.0*h/250, 0, -1, -1);//主背景
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,6, 101, 1.0*w/22, 1, 0, -1, -1);//上边
		GmPlay.xani_ui.DrawAnimaEx(x, y+h-8, DrawMode.aa_tmp.iAnimaPoint,6, 101, 1.0*w/22, 1, 0, -1, -1);//下边
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,5, 101, 1,1.0*h/22, 0, -1, -1);//左边
		GmPlay.xani_ui.DrawAnimaEx(x+w-8, y, DrawMode.aa_tmp.iAnimaPoint,5, 101, 1,1.0*h/22, 0, -1, -1);//右边
		
		GmPlay.xani_ui.DrawAnima_aa(x, y, DrawMode.aa_tmp.iAnimaPoint, 1);//左上
		GmPlay.xani_ui.DrawAnima_aa(x+w-22, y, DrawMode.aa_tmp.iAnimaPoint, 2);//右上
		GmPlay.xani_ui.DrawAnima_aa(x+w-22, y+h-22, DrawMode.aa_tmp.iAnimaPoint, 3);//右下
		GmPlay.xani_ui.DrawAnima_aa(x, y+h-22, DrawMode.aa_tmp.iAnimaPoint, 4);//左下
	}

	DrawMode.Frame3_BK=function( x, y, w, h, title)
	{//64,128,192,256,320,384,448,512,576,640,704,768,832,896,960,1024
		var i,j;
		GmPlay.xani_ui.InitAnimaWithName("统一背景框", DrawMode.aa_tmp);
		
		M3DFast.gi().SetViewClip(x, y, x+w, y+h);
		for(i=0;i<w/64+1;i++)
		{
			for(j=0;j<h/64+1;j++)
			{
				GmPlay.xani_ui.DrawAnimaEx(x+i*64, y+j*64, DrawMode.aa_tmp.iAnimaPoint,0, 101, 1,1, 0, 0, 0);//主背景
			}
		}
		M3DFast.gi().NoClip();
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,8, 101, 1.0*w/192, 1.0*h/192, 0, 0, 0);//蒙版
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,1, 101, 1.0*w/250, 1, 0, 0, 0);//标题栏
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,2, 101, 1.0*w/250, 1, 0, 0, 0);//上边
		GmPlay.xani_ui.DrawAnimaEx(x, y+h, DrawMode.aa_tmp.iAnimaPoint,2, 101, 1.0*w/250, 1, 0, 0, 0);//下边
		
		GmPlay.xani_ui.DrawAnimaEx(x, y, DrawMode.aa_tmp.iAnimaPoint,3, 101, 1,1.0*h/250, 0, 0, 0);//左边
		GmPlay.xani_ui.DrawAnimaEx(x+w, y, DrawMode.aa_tmp.iAnimaPoint,3, 101, 1,1.0*h/250, 0, 0, 0);//右边
		
		GmPlay.xani_ui.DrawAnima_aa(x, y, DrawMode.aa_tmp.iAnimaPoint, 4);//左上
		GmPlay.xani_ui.DrawAnima_aa(x+w, y, DrawMode.aa_tmp.iAnimaPoint, 5);//右上
		GmPlay.xani_ui.DrawAnima_aa(x+w, y+h, DrawMode.aa_tmp.iAnimaPoint, 7);//右下
		GmPlay.xani_ui.DrawAnima_aa(x, y+h, DrawMode.aa_tmp.iAnimaPoint, 6);//左下
		
		M3DFast.gi().DrawTextEx(x+10-2, y+10, title, 0xff000000, 40, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x+10+2, y+10, title, 0xff000000, 40, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x+10, y+10-2, title, 0xff000000, 40, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x+10, y+10+2, title, 0xff000000, 40, 101, 1, 1, 0, 0, 0);
		M3DFast.gi().DrawTextEx(x+10, y+10, title, 0xffffffff, 40, 101, 1, 1, 0, 0, 0);
	}
	
	DrawMode.DrawFrame3=function( x, y, h)
	{//宽410固定,,,原图高222进行缩放
		GmPlay.xani_ui.DrawAnimaEx(x, y, "提示对话框",0, 101, 1, 1.0*h/222, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(x, y, "提示对话框",1, 101, 1, 1, 0, 0, 0);
		GmPlay.xani_ui.DrawAnimaEx(x, y+h-5, "提示对话框",2, 101, 1, 1, 0, -1, -1);
	}
	DrawMode.DrawFrame1=function( x, y, w, h)
	{
		DrawFrame("公共框1",x,y,w,h);
	}
	DrawMode.DrawFrame2=function( x, y, w, h)
	{
		DrawFrame("公共框2",x,y,w,h);
	}
	DrawMode.DrawFrame=function( mn, x, y, w, h)
	{
		GmPlay.xani_ui.DrawAnima_aa(x, y, mn, 0);
		GmPlay.xani_ui.DrawAnima_aa(x+w-50, y, mn, 2);
		GmPlay.xani_ui.DrawAnima_aa(x+w-50, y+h-50, mn, 4);
		GmPlay.xani_ui.DrawAnima_aa(x, y+h-50, mn, 6);
		
		if(w>100)
		{
			GmPlay.xani_ui.DrawAnimaEx(x+50, y, mn, 1, 101, 1.0*(w-100)/50, 1, 0, 0, 0);
			GmPlay.xani_ui.DrawAnimaEx(x+50, y+h-50, mn, 5, 101, 1.0*(w-100)/50, 1, 0, 0, 0);
		}
		if(h>100)
		{
			GmPlay.xani_ui.DrawAnimaEx(x, y+50, mn, 7, 101, 1, 1.0*(h-100)/50, 0, 0, 0);
			GmPlay.xani_ui.DrawAnimaEx(x+w-50, y+50, mn, 3, 101, 1, 1.0*(h-100)/50, 0, 0, 0);
		}
		if(w>100 && h>100)
		{
			GmPlay.xani_ui.DrawAnimaEx(x+50, y+50, mn, 8, 101, 1.0*(w-100)/50, 1.0*(h-100)/50, 0, 0, 0);
		}
	}
	DrawMode.DrawTextFrame1=function( x, y, w)
	{
		DrawMode.DrawTextFrame("大文本框",x,y,w);
	}
	DrawMode.DrawTextFrame=function( mn, x, y, w)
	{
		if(w<=50)
		{
			GmPlay.xani_ui.DrawAnimaEx(x, y, mn, 0, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_ui.DrawAnimaEx(x, y, mn, 1, 101, 1, 1, 0, 0, 0);
		}
		else
		{
			GmPlay.xani_ui.DrawAnimaEx(x, y, mn, 0, 101, 1, 1, 0, 0, 0);
			GmPlay.xani_ui.DrawAnimaEx(x+25-25*(w-50)/30, y, mn, 2, 101, 1.0*(w-50)/30, 1, 0, 0, 0);
			GmPlay.xani_ui.DrawAnimaEx(x+w-50, y, mn, 1, 101, 1, 1, 0, 0, 0);
		}
	}
	
	 DrawMode.local_frameani=null;
	DrawMode.local_titleframe=function( x, y, w, h, withcut)
	{
		if(DrawMode.local_frameani==null)DrawMode.local_frameani=GmPlay.xani_local.InitAnimaWithName("提示框", null);
		M3DFast.gi().FillRect_2D(x, y, x+w,y+h , 0x59000000);
		DrawMode.local_frameani.iFrame=0;DrawMode.local_frameani.Draw(x, y);
		DrawMode.local_frameani.iFrame=1;DrawMode.local_frameani.DrawEx(x, y+80, 101, 1, 1.0*(h-80-57)/183, 0, 0, 0);
		DrawMode.local_frameani.iFrame=2;DrawMode.local_frameani.Draw(x, y+h);
		DrawMode.local_frameani.iFrame=3;DrawMode.local_frameani.DrawEx(x+42, y+h, 101, 1.0*(w-42-42)/373, 1, 0, 0, 0);
		DrawMode.local_frameani.iFrame=4;DrawMode.local_frameani.Draw(x+w, y+h);
		DrawMode.local_frameani.iFrame=5;DrawMode.local_frameani.DrawEx(x+w, y+80, 101, 1, 1.0*(h-80-57)/183, 0, 0, 0);
		DrawMode.local_frameani.iFrame=6;DrawMode.local_frameani.Draw(x+w, y);
		DrawMode.local_frameani.iFrame=7;DrawMode.local_frameani.DrawEx(x+35, y, 101, 1.0*(w-35-35)/373, 1, 0, 0, 0);
		if(withcut)GmPlay.xani_local.DrawAnimaEx(x+w/6, y+SystemOperate.WordSize(80), "分隔条", 0,101,2.0*w/3/400,1,0,0,0);
	}
	 DrawMode.local_frameani1=null;
	DrawMode.local_frame1=function( x, y, w, h)
	{
		if(DrawMode.local_frameani1==null)DrawMode.local_frameani1=GmPlay.xani_nui1.InitAnimaWithName("背景框1", null);
		M3DFast.gi().FillRect_2D(x, y, x+w,y+h , 0x59000000);
		DrawMode.local_frameani1.iFrame=0;DrawMode.local_frameani1.Draw(x, y);
		DrawMode.local_frameani1.iFrame=1;DrawMode.local_frameani1.DrawEx(x, y+50, 101, 1, 1.0*(h-100)/50, 0, 0, 0);
		DrawMode.local_frameani1.iFrame=2;DrawMode.local_frameani1.Draw(x, y+h);
		DrawMode.local_frameani1.iFrame=3;DrawMode.local_frameani1.DrawEx(x+50, y+h, 101, 1.0*(w-100)/50, 1, 0, 0, 0);
		DrawMode.local_frameani1.iFrame=4;DrawMode.local_frameani1.Draw(x+w, y+h);
		DrawMode.local_frameani1.iFrame=5;DrawMode.local_frameani1.DrawEx(x+w, y+50, 101, 1, 1.0*(h-100)/50, 0, 0, 0);
		DrawMode.local_frameani1.iFrame=6;DrawMode.local_frameani1.Draw(x+w, y);
		DrawMode.local_frameani1.iFrame=7;DrawMode.local_frameani1.DrawEx(x+50, y, 101, 1.0*(w-100)/50, 1, 0, 0, 0);
		DrawMode.local_frameani1.iFrame=8;DrawMode.local_frameani1.DrawEx(x+50, y+50, 101, 1.0*(w-100)/50, 1.0*(h-100)/50, 0, 0, 0);
	}
	
	DrawMode.local_frameani2=null;
	DrawMode.local_frame2=function( x, y, w, h)
	{
		if(DrawMode.local_frameani2==null)DrawMode.local_frameani2=GmPlay.xani_nui1.InitAnimaWithName("背景框2", null);
		M3DFast.gi().FillRect_2D(x, y, x+w,y+h , 0x59000000);
		DrawMode.local_frameani2.iFrame=0;DrawMode.local_frameani2.Draw(x, y);
		DrawMode.local_frameani2.iFrame=1;DrawMode.local_frameani2.DrawEx(x, y+81, 101, 1, 1.0*(h-81-39)/28, 0, 0, 0);
		DrawMode.local_frameani2.iFrame=2;DrawMode.local_frameani2.Draw(x, y+h);
		DrawMode.local_frameani2.iFrame=3;DrawMode.local_frameani2.DrawEx(x+65, y+h, 101, 1.0*(w-65-65)/32, 1, 0, 0, 0);
		DrawMode.local_frameani2.iFrame=4;DrawMode.local_frameani2.Draw(x+w, y+h);
		DrawMode.local_frameani2.iFrame=5;DrawMode.local_frameani2.DrawEx(x+w, y+81, 101, 1, 1.0*(h-81-39)/28, 0, 0, 0);
		DrawMode.local_frameani2.iFrame=6;DrawMode.local_frameani2.Draw(x+w, y);
		DrawMode.local_frameani2.iFrame=7;DrawMode.local_frameani2.DrawEx(x+65, y, 101, 1.0*(w-65-65)/32, 1, 0, 0, 0);
		//DrawMode.local_frameani2.iFrame=8;DrawMode.local_frameani1.DrawEx(x+50, y+50, 101, 1.0*(w-100)/50, 1.0*(h-100)/50, 0, 0, 0);
	}
	
	DrawMode.new_frame1=null;
	DrawMode.new_frame2;
	DrawMode.new_frame3=null;
	DrawMode.new_bigframe=function( x, y, w, h)
	{
		if(DrawMode.new_frame1==null)
		{
			DrawMode.new_frame1=GmPlay.xani_nui2.InitAnimaWithName("大边框", null);
			DrawMode.new_frame2=GmPlay.xani_nui2.InitAnimaWithName("梅竹", null);
		}
		M3DFast.gi().FillRect_2D(x, y, x+w,y+h , 0xffbfded6);
		DrawMode.new_frame2.iFrame=0;DrawMode.new_frame2.Draw(x+w-12,y+12);
		DrawMode.new_frame2.iFrame=1;DrawMode.new_frame2.Draw(x+12,y+h-12);
		
		DrawMode.new_frame1.iFrame=0;DrawMode.new_frame1.Draw(x, y);
		DrawMode.new_frame1.iFrame=1;DrawMode.new_frame1.Draw(x+w, y);
		DrawMode.new_frame1.iFrame=2;DrawMode.new_frame1.Draw(x+w, y+h);
		DrawMode.new_frame1.iFrame=3;DrawMode.new_frame1.Draw(x, y+h);
		
		if(w>=400)
		{
			DrawMode.new_frame1.iFrame=4;DrawMode.new_frame1.DrawEx(x+200, y, 101, 1.0*(w-400)/40, 1, 0, 0, 0);
			DrawMode.new_frame1.iFrame=5;DrawMode.new_frame1.DrawEx(x+200, y+h-1, 101, 1.0*(w-400)/40, 1, 0, 0, 0);
		}
		if(h>=400)
		{
			DrawMode.new_frame1.iFrame=6;DrawMode.new_frame1.DrawEx(x, y+200, 101, 1, 1.0*(h-400)/40, 0, 0, 0);
			DrawMode.new_frame1.iFrame=7;DrawMode.new_frame1.DrawEx(x+w, y+200, 101, 1, 1.0*(h-400)/40, 0, 0, 0);
		}
	}
	DrawMode.new_framein=function( x, y, w, h,c=0x807eb6a6)
	{//内绿框
		if(DrawMode.new_frame3==null)DrawMode.new_frame3=GmPlay.xani_nui2.InitAnimaWithName("内框", null);
		M3DFast.gi().FillRect_2D(x, y, x+w,y+h , c);
		
		DrawMode.new_frame3.iFrame=0;DrawMode.new_frame3.Draw(x, y);
		DrawMode.new_frame3.iFrame=1;DrawMode.new_frame3.Draw(x+w, y);
		DrawMode.new_frame3.iFrame=3;DrawMode.new_frame3.Draw(x+w, y+h);
		DrawMode.new_frame3.iFrame=2;DrawMode.new_frame3.Draw(x, y+h);
		
		if(w>=80)
		{
			DrawMode.new_frame3.iFrame=4;DrawMode.new_frame3.DrawEx(x+40, y, 101, 1.0*(w-80)/17, 1, 0, 0, 0);
			DrawMode.new_frame3.iFrame=4;DrawMode.new_frame3.DrawEx(x+40, y+h-3, 101, 1.0*(w-80)/17, 1, 0, 0, 0);
		}
		if(h>=80)
		{
			DrawMode.new_frame3.iFrame=5;DrawMode.new_frame3.DrawEx(x, y+40, 101, 1, 1.0*(h-80)/14, 0, 0, 0);
			DrawMode.new_frame3.iFrame=6;DrawMode.new_frame3.DrawEx(x+w, y+40, 101, 1, 1.0*(h-80)/14, 0, 0, 0);
		}
	}
	DrawMode.new_baseframe2=function( x, y, w, h, s1, s2)
	{
		DrawMode.new_bigframe(x,y,w,h);
		GmPlay.xani_nui2.DrawAnima(x, y, "卷轴",0);
		M3DFast.gi().DrawText_2(x-11, y+190, s1, 0xff003e57, 30, 101, 1, 1, 0, -2,-2, 4, 0xff8dffff);
		M3DFast.gi().DrawText_2(x-11, y+270, s2, 0xff003e57, 30, 101, 1, 1, 0,-2,-2, 4, 0xff8dffff);
	}
	DrawMode.new_baseframe3=function( x, y, w, h, s1, s2, s3)
	{
		DrawMode.new_bigframe(x,y,w,h);
		GmPlay.xani_nui2.DrawAnima(x, y, "卷轴",0);
		M3DFast.gi().DrawText_2(x-11, y+180, s1, 0xff003e57, 30, 101, 1, 1, 0, -2,-2, 4, 0xff8dffff);
		M3DFast.gi().DrawText_2(x-11, y+230, s2, 0xff003e57, 30, 101, 1, 1, 0,-2,-2, 4, 0xff8dffff);
		M3DFast.gi().DrawText_2(x-11, y+280, s3, 0xff003e57, 30, 101, 1, 1, 0,-2,-2, 4, 0xff8dffff);
	}
	DrawMode.new_baseframe4=function( x, y, w, h, s1, s2, s3, s4)
	{
		DrawMode.new_bigframe(x,y,w,h);
		GmPlay.xani_nui2.DrawAnima(x, y, "卷轴",0);
		M3DFast.gi().DrawText_2(x-11, y+165, s1, 0xff003e57, 30, 101, 1, 1, 0, -2,-2, 4, 0xff8dffff);
		M3DFast.gi().DrawText_2(x-11, y+205, s2, 0xff003e57, 30, 101, 1, 1, 0,-2,-2, 4, 0xff8dffff);
		M3DFast.gi().DrawText_2(x-11, y+245, s3, 0xff003e57, 30, 101, 1, 1, 0,-2,-2, 4, 0xff8dffff);
		M3DFast.gi().DrawText_2(x-11, y+285, s4, 0xff003e57, 30, 101, 1, 1, 0,-2,-2, 4, 0xff8dffff);
	}
	DrawMode.new_lableword2=function( x, y, w, h, bsel, s1, s2)
	{
		if(bsel)
		{//选中，有边框
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3, s1, 0xffffff00, 22, 101, 1, 1, 0, -2,-2, 3, 0xff003e57);
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3*2, s2, 0xffffff00, 22, 101, 1, 1, 0,-2,-2, 3, 0xff003e57);
		}
		else
		{//没选中，单色
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3, s1, 0xff003e57, 22, 101, 1, 1, 0, -2,-2);
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3*2, s2, 0xff003e57, 22, 101, 1, 1, 0,-2,-2);
		}
	}
	DrawMode.new_lableword3=function( x, y, w, h, bsel, s1, s2, s3)
	{
		if(bsel)
		{//选中，有边框
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3, s1, 0xffffff00, 22, 101, 1, 1, 0, -2,-2, 3, 0xff003e57);
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3*2, s2, 0xffffff00, 22, 101, 1, 1, 0,-2,-2, 3, 0xff003e57);
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3*3, s3, 0xffffff00, 22, 101, 1, 1, 0,-2,-2, 3, 0xff003e57);
			
		}
		else
		{//没选中，单色
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3, s1, 0xff003e57, 22, 101, 1, 1, 0, -2,-2);
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3*2, s2, 0xff003e57, 22, 101, 1, 1, 0,-2,-2);
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3*3, s3, 0xff003e57, 22, 101, 1, 1, 0,-2,-2);
			
		}
	}
	DrawMode.new_lableword4=function( x, y, w, h, bsel, s1, s2, s3, s4)
	{
		if(bsel)
		{//选中，有边框
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3, s1, 0xffffff00, 22, 101, 1, 1, 0, -2,-2, 3, 0xff003e57);
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3*2, s2, 0xffffff00, 22, 101, 1, 1, 0,-2,-2, 3, 0xff003e57);
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3*3, s3, 0xffffff00, 22, 101, 1, 1, 0,-2,-2, 3, 0xff003e57);
			M3DFast.gi().DrawText_2(x+w/2-2, y+h/3*4, s4, 0xffffff00, 22, 101, 1, 1, 0,-2,-2, 3, 0xff003e57);
			
		}
		else
		{//没选中，单色
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3, s1, 0xff003e57, 22, 101, 1, 1, 0, -2,-2);
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3*2, s2, 0xff003e57, 22, 101, 1, 1, 0,-2,-2);
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3*3, s3, 0xff003e57, 22, 101, 1, 1, 0,-2,-2);
			M3DFast.gi().DrawTextEx(x+w/2-2, y+h/3*4, s4, 0xff003e57, 22, 101, 1, 1, 0,-2,-2);
			
		}
	}
	
	DrawMode.new_frame4=null,DrawMode.new_frame5=null;
	DrawMode.new_frameon=function( x, y, w, h, type)
	{//队伍宗旨边框
		if(DrawMode.new_frame4==null)DrawMode.new_frame4=GmPlay.xani_nui2.InitAnimaWithName("特殊奖励框", null);
		if(DrawMode.new_frame5==null)DrawMode.new_frame5=GmPlay.xani_nui2.InitAnimaWithName("特殊奖励框2", null);
		var aa;
		var c;
		if(type==0)
		{
			aa=DrawMode.new_frame4;
			c=0xff399392;
		}
		else if(type==1)
		{
			aa=DrawMode.new_frame5;
			c=0xff3c739a;
		}
		else return;
		
		M3DFast.gi().FillRect_2D(x+5, y+5, x+w-10,y+h-10 , c);
		aa.iFrame=0;aa.Draw(x, y);
		aa.iFrame=1;aa.Draw(x+w, y);
		aa.iFrame=2;aa.Draw(x+w, y+h);
		aa.iFrame=3;aa.Draw(x, y+h);
		aa.iFrame=4;aa.DrawEx(x+20, y, 101, 1.0*(w-20-20)/20, 1, 0, 0, 0);
		aa.iFrame=5;aa.DrawEx(x, y+20, 101, 1, 1.0*(h-20-20)/20, 0, 0, 0);
		aa.iFrame=6;aa.DrawEx(x+w, y+20, 101, 1, 1.0*(h-20-20)/20, 0, 0, 0);
		aa.iFrame=7;aa.DrawEx(x+20, y+h, 101, 1.0*(w-20-20)/20, 1, 0, 0, 0);
	}
	 DrawMode.new_frame6=null;
	DrawMode.new_framepc=function( x, y, w, h)
	{//公共聊天外边框
		if(DrawMode.new_frame6==null)DrawMode.new_frame6=GmPlay.xani_nui3.InitAnimaWithName("公共聊天外框", null);
		M3DFast.gi().FillRect_2D(x+3, y+3, x+w-3,y+h-3 , 0x80000000);
		DrawMode.new_frame6.iFrame=0;DrawMode.new_frame6.Draw(x+w, y);
		DrawMode.new_frame6.iFrame=1;DrawMode.new_frame6.DrawEx(x+19, y, 101, 1.0*(w-38)/20, 1, 0, 0, 0);
		DrawMode.new_frame6.iFrame=2;DrawMode.new_frame6.Draw(x, y);
		DrawMode.new_frame6.iFrame=3;DrawMode.new_frame6.DrawEx(x, y+19, 101, 1,1.0*(h-38)/20, 0, 0, 0);
		DrawMode.new_frame6.iFrame=4;DrawMode.new_frame6.Draw(x, y+h);
		DrawMode.new_frame6.iFrame=5;DrawMode.new_frame6.DrawEx(x+19, y+h, 101, 1.0*(w-38)/20, 1, 0, 0, 0);
		DrawMode.new_frame6.iFrame=6;DrawMode.new_frame6.Draw(x+w, y+h);
		DrawMode.new_frame6.iFrame=7;DrawMode.new_frame6.DrawEx(x+w, y+19, 101, 1,1.0*(h-38)/20, 0, 0, 0);
	}
	DrawMode.new_TagText2=function( x, y, w, s1, s2)
	{//67,87,110
		GmPlay.xani_nui2.DrawAnima(x, y, "提示1",0);
		DrawMode.new_Text(x+67,y,w,s2);
		M3DFast.gi().DrawText_2(x+67/2, y+16, s1, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	}
	DrawMode.new_Text=function( x, y, w, s)
	{
		GmPlay.xani_nui2.DrawAnimaEx(x, y, "可变长文字框",0,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+15, y, "可变长文字框",1,101,1.0*(w-30)/20,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		GmPlay.xani_nui2.DrawAnimaEx(x+w-20, y, "可变长文字框",2,101,1.0,1.0,0,0,0);//iX+50, iY+65+i*45, 128, 32
		
		M3DFast.gi().DrawText_2(x+w/2, y+16, s, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	}
	 DrawMode.new_frame7=null;
	DrawMode.new_framewatch=function( x, y, w, h)
	{//弹出框，物品详细信息
		if(DrawMode.new_frame7==null)DrawMode.new_frame7=GmPlay.xani_nui3.InitAnimaWithName("公共内框1", null);
		
		DrawMode.new_frame7.iFrame=8;DrawMode.new_frame7.DrawEx(x+29, y+29, 101, 1.0*(w-58)/20, 1.0*(h-29-21)/20, 0, 0, 0);//背景
		
		DrawMode.new_frame7.iFrame=1;DrawMode.new_frame7.DrawEx(x+29, y, 101, 1.0*(w-58)/20, 1, 0, 0, 0);//上横线
		DrawMode.new_frame7.iFrame=5;DrawMode.new_frame7.DrawEx(x+29, y+h, 101, 1.0*(w-58)/20, 1, 0, 0, 0);//下横线
		
		DrawMode.new_frame7.iFrame=7;DrawMode.new_frame7.DrawEx(x, y+29, 101, 1,1.0*(h-29-21)/20, 0, 0, 0);//左竖线
		DrawMode.new_frame7.iFrame=3;DrawMode.new_frame7.DrawEx(x+w, y+29, 101, 1,1.0*(h-29-21)/20, 0, 0, 0);//右竖线
		
		DrawMode.new_frame7.iFrame=0;DrawMode.new_frame7.Draw(x, y);//左上
		DrawMode.new_frame7.iFrame=2;DrawMode.new_frame7.Draw(x+w, y);
		DrawMode.new_frame7.iFrame=4;DrawMode.new_frame7.Draw(x+w, y+h);
		DrawMode.new_frame7.iFrame=6;DrawMode.new_frame7.Draw(x, y+h);
	}
	DrawMode.new_frame8=null;
	DrawMode.new_numberframe=function( x, y, w, detail)
	{//数字输入框
		if(DrawMode.new_frame8==null)DrawMode.new_frame8=GmPlay.xani_nui3.InitAnimaWithName("数字输入框", null);
		DrawMode.new_frame8.iFrame=1;DrawMode.new_frame8.DrawEx(x+15,y,101,1.0*(w-30)/20,1,0,0,0);
		DrawMode.new_frame8.iFrame=0;DrawMode.new_frame8.Draw(x, y);
		DrawMode.new_frame8.iFrame=2;DrawMode.new_frame8.Draw(x+w-20, y);
		
		M3DFast.gi().DrawTextEx(x+w/2, y+25, detail, 0xff003e57, 30, 101, 1, 1, 0, -2, -2);	
//		M3DFast.gi().DrawText_2(x+w/2, y+20, detail, 0xffffffff, 20, 101, 1, 1, 0, -2, -2, 3, 0xff000000);
	}
	DrawMode.frame_type1=function( name, x, y, w, bw)
	{//横向框
		if(w<bw*2)
		{
			GmPlay.xani_frame.DrawAnimaEx(x, y, name, 0, 101, 1.0*w/2/bw, 1, 0, 0, 0);
			GmPlay.xani_frame.DrawAnimaEx(x+w/2, y, name, 2, 101, 1.0*w/2/bw, 1, 0, 0, 0);
		}
		else
		{
			GmPlay.xani_frame.DrawAnimaEx(x+bw/2, y, name, 1, 101, 1.0*(w-bw)/bw, 1, 0, 0, 0);
			
			GmPlay.xani_frame.DrawAnima(x,y,name,0);
			GmPlay.xani_frame.DrawAnima(x+w-bw,y,name,2);
		}
	}
	DrawMode.frame_type2=function( name, x, y, w, h, bw, bh)
	{//外边框
		GmPlay.xani_frame.DrawAnima(x,y,name,0);
		GmPlay.xani_frame.DrawAnimaEx(x+bw, y, name, 1, 101, 1.0*(w-bw-bw)/bw, 1, 0, 0, 0);
		GmPlay.xani_frame.DrawAnima(x+w-bw,y,name,2);
		GmPlay.xani_frame.DrawAnimaEx(x+w-bw, y+bh, name, 3, 101, 1,1.0*(h-bh-bh)/bh, 0, 0, 0);
		GmPlay.xani_frame.DrawAnima(x+w-bw,y+h-bh,name,4);
		GmPlay.xani_frame.DrawAnimaEx(x+bw, y+h-bh, name, 5, 101, 1.0*(w-bw-bw)/bw, 1, 0, 0, 0);
		GmPlay.xani_frame.DrawAnima(x,y+h-bh,name,6);
		GmPlay.xani_frame.DrawAnimaEx(x, y+bh, name, 7, 101, 1,1.0*(h-bh-bh)/bh,  0, 0, 0);
	}
	DrawMode.frame_type3=function( name, x, y, w, h, bw, bh)
	{//纯色拉伸
		GmPlay.xani_frame.DrawAnimaEx(x, y, name, 1, 101, 1.0*w/bw, 1.0*h/bh, 0, 0, 0);
	}
	/*
	 * 整框
	 * */
//	DrawMode.frame_type4=function( name, x, y, w, h, bw, bh)
	DrawMode.frame_type4=function( name, xx, yy, iW, iH, iBw, iBh)
	{//整框
//		GmPlay.xani_frame.DrawAnima_aa(x,y,name,0);
//		GmPlay.xani_frame.DrawAnimaEx(x+bw, y, name, 1, 101, 1.0*(w-bw-bw)/bw, 1, 0, 0, 0);
//		GmPlay.xani_frame.DrawAnima_aa(x+w-bw,y,name,2);
//		GmPlay.xani_frame.DrawAnimaEx(x+w-bw, y+bh, name, 3, 101, 1,1.0*(h-bh-bh)/bh, 0, 0, 0);
//		GmPlay.xani_frame.DrawAnima_aa(x+w-bw,y+h-bh,name,4);
//		GmPlay.xani_frame.DrawAnimaEx(x+bw, y+h-bh, name, 5, 101, 1.0*(w-bw-bw)/bw, 1, 0, 0, 0);
//		GmPlay.xani_frame.DrawAnima_aa(x,y+h-bh,name,6);
//		GmPlay.xani_frame.DrawAnimaEx(x, y+bh, name, 7, 101, 1,1.0*(h-bh-bh)/bh,  0, 0, 0);
//		
//		GmPlay.xani_frame.DrawAnimaEx(x+bw, y+bh, name, 8, 101, 1.0*(w-bw-bw)/bw, 1.0*(h-bh-bh)/bh, 0, 0, 0);
		
		
		if(iW-iBw-iBw>0 && iH-iBh-iBh>0)GmPlay.xani_frame.DrawAnimaEx(xx+iBw-2, yy+iBh-2,name, 8, 101, 1.0*(iW-iBw-iBw+4)/iBw, 1.0*(iH-iBh-iBh+4)/iBh, 0, 0, 0);
		if(iW-iBw-iBw>0)GmPlay.xani_frame.DrawAnimaEx(xx+iBw-2, yy,name, 1, 101, 1.0*(iW-iBw-iBw+4)/iBw, 1, 0, 0, 0);
		if(iH-iBh-iBh>0)GmPlay.xani_frame.DrawAnimaEx(xx+iW-iBw, yy+iBh-2,name, 3, 101, 1,1.0*(iH-iBh-iBh+4)/iBh, 0, 0, 0);
		if(iW-iBw-iBw>0)GmPlay.xani_frame.DrawAnimaEx(xx+iBw-2, yy+iH-iBh,name, 5, 101, 1.0*(iW-iBw-iBw+4)/iBw, 1, 0, 0, 0);
		if(iH-iBh-iBh>0)GmPlay.xani_frame.DrawAnimaEx(xx, yy+iBh-2,name, 7, 101, 1,1.0*(iH-iBh-iBh+4)/iBh,  0, 0, 0);
		
		GmPlay.xani_frame.DrawAnimaEx(xx,yy,name,0,101,1,1,0,0,0);
		GmPlay.xani_frame.DrawAnimaEx( (xx+iW-1*(iBw)),yy,name,2,101,1,1,0,0,0);
		GmPlay.xani_frame.DrawAnimaEx( (xx+iW-1*(iBw)), (yy+iH-1*(iBh)),name,4,101,1,1,0,0,0);
		GmPlay.xani_frame.DrawAnimaEx(xx, (yy+iH-1*(iBh)),name,6,101,1,1,0,0,0);
	}

