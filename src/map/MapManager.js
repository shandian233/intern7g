
import MapData from "./MapData"
import FindWay from "./FindWay"
import VisualBlock from "./VisualBlock"
import MainMenu from "../mgm/mainmenu/MainMenu"
import LeadPage from "../mgm/newmainmenu/LeadPage"
import GameData from "../config/GameData"
import GmConfig from "../config/GmConfig"
import AnimaAction from "../engine/graphics/AnimaAction"
import GmPlay from "../engtst/mgm/GmPlay"
import SystemOperate from "../engtst/mgm/gameing/fast/SystemOperate"
import JQMode from "../engtst/mgm/gameing/help/JQMode"
import GmMe from "../engtst/mgm/gameing/me/GmMe"
import MyLand from "../engtst/mgm/gameing/me/land/MyLand"
import PackageTools from "../engine/PackageTools"
import M3DFast from "../engine/graphics/M3DFast"
import XAnima from "../engine/graphics/XAnima"
//import engine.graphics.XImgFast;
import ANIMALEVEL from "./ANIMALEVEL"
import COLLPATH from "./COLLPATH"
import TouchEffect from "./TouchEffect"
import XDefine from "../config/XDefine";

class SourceFrom
{
//	int iSid;
//	byte iType;
//	String sName;
	constructor()
	{
		this.sName="";
	}
}

class FromAnima extends SourceFrom
{
//	XAnima xani;
    constructor( imf)
    {
        super();
		this.xani=new XAnima(imf);
	}
}

class FromCut extends SourceFrom
{
//	String sImageName;
//	int iBw,iBh;
//	int iRid;
	constructor()
	{
        super();
		this.sImageName="";
		this.iRid=-1;
	}
}
class FromPng extends SourceFrom
{
//	int w,h;
//	int ww,hh;
//	int iRid;
//	String sImagePath;
	constructor()
	{
        super();
		var i,j;
		this.iRid=new Array(10);
//		sResName=new String(10)(10);//
		for(i=0;i<10;i++)
		{
            this.iRid[i]=new Int32Array(10);
			for(j=0;j<10;j++)
			{
				this.iRid[i][j]=-1;
//				sResName[i][j]="";
			}
		}
	}
};


class MAPLIST
{//地图<->ID对应表
//	public int iMapId;
//	public String sMapName;
	constructor()
	{
		this.sMapName="";
		this.iMapId=-1;
	}
}

export default class MapManager {
/*	
	PackageTools pls;
	String sProjectPath;
	public int iBlockWidth,iBlockHeight;
	
	int iSourceCount;
	SourceFrom pSourceList;
	SourceFrom pSourceIndex;
	
	public MapData mapdata;
	public FindWay mfy;
	public VisualBlock vbk;
	
	MAPLIST maplist; 
	
	String sCurrentMapName;
	public int iCurrentMapId;
	public int iVisualMapId;
	
	public boolean bMapLoaded;
	public int iMapChangeing;//10->0变亮，100->110变暗
	*/
	
	
	constructor()
	{
		this.iOffx=0;
		this.iOffy=0;
		var i;
		this.xm3f=M3DFast.gi();
		this.pSourceIndex=new SourceFrom(MapManager.SOURCECOUNT);
		this.pSourceList=new SourceFrom(MapManager.SOURCECOUNT);
		for(i=0;i<MapManager.SOURCECOUNT;i++)
		{
			this.pSourceIndex[i]=null;
			this.pSourceList[i]=null;
		}
		this.mapdata=new MapData();
		this.mfy=new FindWay();
		this.vbk=new VisualBlock(this.xm3f);
		
		this.maplist=new MAPLIST(MapManager.MAXMAPCOUNT);
		for(i=0;i<MapManager.MAXMAPCOUNT;i++)this.maplist[i]=new MAPLIST();
		
		this.sCurrentMapName="";
//		mm=this;
		
this.bMapLoaded=false;
this.iMapChangeing=0;
		
//		TouchEffect.te=new TouchEffect();
this.bOpenProjected=false;
this.bLoadSourced=false;
this.iLoadStat=0;

this.iKeepDetialAsMapId=-1;
	}
	LoadMapList()
	{
		var i,j,k;
		var mid,vid;
		for(i=0;i<GmPlay.de_map.iDataCount;i++)
		{
			mid=GmPlay.de_map.datas[i].iDid;
			this.maplist[mid].iMapId=mid;
			for(j=0;j<GmPlay.de_map.datas[i].iItemCount;j++)
			{
				for(k=0;k<GmPlay.de_map.datas[i].items[j].iValueCount;k++)
				{
					vid=GmPlay.de_map.datas[i].items[j].values[k].iVid;
					if(vid==2)this.maplist[mid].sMapName=GmPlay.de_map.datas[i].items[j].values[k].sValue;
				}
			}
		}
		/*
		var i=0;
		
		pls.InitDataFromResFile(sProjectPath+"/maplist.dat");
		maplist[i].iMapId=pls.GetNextInt();
		while(maplist[i].iMapId!=-1)
		{
			maplist[i].sMapName=pls.GetNextString();
//			GmPlay.sop(""+maplist[i].iMapId+"MapName:"+maplist[i].sMapName);
			i++;
			maplist[i].iMapId=pls.GetNextInt();
		}
		*/
	}
	 IdToName(inid)
	{
		var i;
		for(i=0;i<MapManager.MAXMAPCOUNT;i++)
		{
			if(this.maplist[i].iMapId==inid)return this.maplist[i].sMapName;
//			if(maplist[i].iMapId==-1)return "";
		}
		return "";
	}
	 NameToId( name)
	{
		var i;
		for(i=0;i<MapManager.MAXMAPCOUNT;i++)
		{
			GmPlay.sop("------------"+this.maplist[i].sMapName+"==="+name+"------------");
			if(this.maplist[i].sMapName==name)return this.maplist[i].iMapId;
//			if(maplist[i].iMapId==-1)return -1;
		}
		return -1;
	}
	LoadLogic()
	{
		switch(this.iLoadStat)
		{
		case 0:
			this.sProjectPath="res/datapackage/maps";
			this.pls=PackageTools.gi();
			this.OpenProject();
			this.iLoadStat=1;
			break;
		case 1:
			if(this.bOpenProjected)
			{
				this.iLoadStat=2;
				this.LoadSource();
			}
			break;
		case 2:
			if(this.bLoadSourced)
			{
				this.iLoadStat=3;
				this.Load2Source();

			}
			break;
		case 3:
			for(var i=0;i<this.iSourceCount;i++)
			{
				if(!this.pSourceList[i].bLoaded)return false;
			}
			this.iLoadStat=4;
			this.vbk.LoadNpcs(this.pls, this.sProjectPath+"/npcs");
			break;
		case 4:
			if(this.vbk.ani_npcs.bLoadSuccess)this.iLoadStat=5;
			break;
		case 5:
			return true;
			break;
		}
		return false;
	}
	Load2Source()
	{
		for(var i=0;i<this.iSourceCount;i++)
		{
			GmPlay.sop("载入:"+this.pSourceList[i].iType+","+this.pSourceList[i].sName);
			this.pSourceList[i].bLoaded=false;

			this._Load2Source(i,XDefine.BASE_URL+this.sProjectPath+"/source_"+this.pSourceList[i].sName+"/config.dat");
		}
	}
	_Load2Source(i,path,data)
	{
		if(data==null)
		{
			Laya.loader.load(path,Laya.Handler.create(this, this._Load2Source,[i,path]),null,Laya.Loader.BUFFER);
			return;
		}
		this.pSourceList[i].bLoaded=true;
		this.pls.GetData3(data);
		var pani;
		var pcut;
		var ppng;

		var tp="datapackage/maps";

			this.pls.GetNextByte();
			this.pls.GetNextByte();
			switch(this.pSourceList[i].iType)
			{
			case 0:
				pani=this.pSourceList[i];
				this.pls.GetNextString();
				this.pls.GetNextString();
				pani.iSid=this.pls.GetNextInt();
				
				pani.xani.LoadAnima_fullpath(this.sProjectPath+"/source_"+this.pSourceList[i].sName,this.pls,true);
				this.pSourceIndex[pani.iSid]=pani;
				break;
			case 1:
				pcut=this.pSourceList[i];
				this.pls.GetNextString();
				this.pls.GetNextString();
				pcut.iSid=this.pls.GetNextInt();
				this.pls.GetNextString();
				pcut.sImageName=this.pls.GetNextString();
				pcut.iBw=this.pls.GetNextInt();
				pcut.iBh=this.pls.GetNextInt();
				
				GmPlay.sop(this.sProjectPath+"/source_"+this.pSourceList[i].sName+"/"+pcut.sImageName);
				pcut.sImageName=tp+"/source_"+this.pSourceList[i].sName+"/"+pcut.sImageName;
				pcut.iRid=-1;
//				pcut.iRid=M3DFast.gi().LoadFromFile(sProjectPath+"/source_"+pSourceList[i].sName+"/"+pcut.sImageName, -1);
this.pSourceIndex[pcut.iSid]=pcut;
//				GmPlay.sop("111");
				break;
			case 2:
				ppng=this.pSourceList[i];
				this.pls.GetNextString();
				this.pls.GetNextString();
				ppng.iSid=this.pls.GetNextInt();
				this.pls.GetNextString();
				this.pls.GetNextString();
				ppng.ww=this.pls.GetNextInt();
				ppng.hh=this.pls.GetNextInt();
				ppng.w=this.pls.GetNextInt();
				ppng.h=this.pls.GetNextInt();
				ppng.sImagePath=tp+"/source_"+this.pSourceList[i].sName+"/";
//				GmPlay.sop(sProjectPath+"/source_"+pSourceList[i].sName+"/"+pcut.sImageName);
//				pcut.sImageName=sProjectPath+"/source_"+pSourceList[i].sName+"/"+pcut.sImageName;
//				pcut.iRid=-1;
//				pcut.iRid=gi().LoadFromFile(sProjectPath+"/source_"+pSourceList[i].sName+"/"+pcut.sImageName, -1);
this.pSourceIndex[ppng.iSid]=ppng;
//				GmPlay.sop("111");
				break;
			}
	}
	OpenProject()
	{
		this._OpenProject(this,XDefine.BASE_URL+this.sProjectPath+"/project.dat");
	}
	_OpenProject(p,path,data)//"/res/cx"
	{
		if(data==null)
		{
			Laya.loader.load(path,Laya.Handler.create(this, this._OpenProject,[this,path]),null,Laya.Loader.BUFFER);
			return;
		}
		this.pls.GetData3(data);
		this.pls.GetNextByte();
		GmPlay.sop("打开工程:"+this.pls.GetNextString());
		this.iBlockWidth=this.pls.GetNextInt();
		this.iBlockHeight=this.pls.GetNextInt();
		GmPlay.sop("BW:"+this.iBlockWidth+",BH:"+this.iBlockHeight);
		
//		this.LoadSource();
		this.LoadMapList();
		
		
		this.bOpenProjected=true;
	}
	LoadSource()
	{
		this._LoadSource(this,XDefine.BASE_URL+this.sProjectPath+"/sourceconfig.dat");
	}
	_LoadSource(p,path,data)
	{
		if(data==null)
		{
			Laya.loader.load(path,Laya.Handler.create(this, this._LoadSource,[this,path]),null,Laya.Loader.BUFFER);
			return;
		}
		this.bLoadSourced=true;	
		var i,j;
		i=0;
		this.pls.GetData3(data);
		
		this.pls.GetNextByte();//10
		
		i=0;
		j=this.pls.GetNextByte();
		while(j>=0)
		{
			switch(j)
			{
			case 0://anima
            this.pSourceList[i]=new FromAnima(this.xm3f);
				break;
			case 1://cut
            this.pSourceList[i]=new FromCut();
				break;
			case 2://ground
            this.pSourceList[i]=new FromPng();
				break;
			}
			
			this.pSourceList[i].iType=j;
			this.pSourceList[i].sName=this.pls.GetNextString();
			GmPlay.sop("["+i+"]Source:"+j+","+this.pSourceList[i].sName);
			
			j=this.pls.GetNextByte();
			i++;
		}
		this.iSourceCount=i;
	}
	LoadMap( mapid, vmapid, mx, my)//bbb.map
{
		this.iVisualMapId=vmapid;
		if(this.iCurrentMapId==mapid)return;
//		if(this.NameToId(mn)==-1)return;
		GmPlay.gi().mapChanging.changed = false;
		this.sCurrentMapName=this.IdToName(mapid);
		this.iCurrentMapId=mapid;
//		iVisualMapId=vmapid;
		this._LoadMap(this,XDefine.BASE_URL+this.sProjectPath+"/maps/"+this.sCurrentMapName)
		GmPlay.sop(this.sProjectPath+"/"+this.sCurrentMapName);
	}
	_LoadMap(p,path,data)
	{
		if(data==null){
			Laya.loader.load(path,Laya.Handler.create(p, p._LoadMap,[p,path]),null,Laya.Loader.BUFFER);
			return;
		}
		var i,j,k,m,n;
		this.pls.GetData3(data);
		this.pls.xordata(this.pls.iLength);
		this.pls.GetNextByte();
		this.pls.GetNextInt();
//		iCurrentMapId=pls.GetNextInt();//mapid
		this.mapdata.sMapName=this.pls.GetNextString();//文件名
		if(this.iCurrentMapId==this.iKeepDetialAsMapId){
			this.iKeepDetialAsMapId=-1;
			this.pls.GetNextString();//detail中文名
		}
		else this.mapdata.sMapDetail=this.pls.GetNextString();//detail中文名
		this.mapdata.iMapWidth=this.pls.GetNextInt();
		this.mapdata.iMapHeight=this.pls.GetNextInt();
		this.mapdata.iGroundSourceId=this.pls.GetNextInt();
		this.mapdata.iMapFlag=0;
				
		this.mapdata.iBCW=parseInt((this.mapdata.iMapWidth+this.iBlockWidth-1)/this.iBlockWidth);
		this.mapdata.iBCH=parseInt((this.mapdata.iMapHeight+this.iBlockHeight-1)/this.iBlockHeight);
		GmPlay.sop("open map:"+this.mapdata.sMapName+","+this.mapdata.iMapWidth+","+this.mapdata.iMapHeight+","+this.mapdata.iBCW+","+this.mapdata.iBCH);
		this.mapdata.InitCutLevel();
		//
		GmPlay.sop("at 1="+this.pls.iOffset);
		//三层地面
		m=this.pls.GetNextInt();
		n=0;
		for(i=0;i<3;i++)
		{
			for(j=0;j<this.mapdata.iBCH;j++)
			{
				for(k=0;k<this.mapdata.iBCW;k++)
				{
					if(n>=m)
					{
						if(j==18 && k==14)
						{
					//	GmPlay.sop("zzzzzzzzzzzzzzzzz");
						}
						//GmPlay.sop("at x="+pls.iOffset);
						this.mapdata.cutlevel[i][j][k][0]=this.pls.GetNextShort();
					//	GmPlay.sop("pt:"+mapdata.cutlevel[i][j][k][0]);
						if(this.mapdata.cutlevel[i][j][k][0]==-1)
						{
							m=this.pls.GetNextInt();
							n=0;
						//	GmPlay.sop("m="+m);
						}
						else
						{
							this.mapdata.cutlevel[i][j][k][1]=this.pls.GetNextShort();
							//绑定到sf
							/*
							for(o=0;o<SOURCECOUNT;o++)
							{
								if(sf[o]->bUseing && sf[o]->iSid==mapdata.blocks[i].level[j][k].sourceId)
								{//
									mapdata.blocks[i].level[j][k].sf=sf[o];
									break;
								}
							}
							if(o>=SOURCECOUNT)
							{
								mapdata.blocks[i].level[j][k].sourceId=-1;
							}*/
						}
					}
					n++;
				}
			}
		}
		GmPlay.sop("at 2="+this.pls.iOffset);
		//景物层
		var pani;
		for(i=0;i<3;i++)
		{
			j=0;
			while(1==1)
			{
				k=this.pls.GetNextShort();
				if(k==-1)break;
				this.mapdata.animalevel[i][j]=new ANIMALEVEL();
				this.mapdata.animalevel[i][j].sourceId=k;
				this.mapdata.animalevel[i][j].iX=this.pls.GetNextInt();
				this.mapdata.animalevel[i][j].iY=this.pls.GetNextInt();
				this.mapdata.animalevel[i][j].sName=this.pls.GetNextString();
//				GmPlay.sop("k="+k+","+mapdata.animalevel[i][j].sourceId);
				pani=this.pSourceIndex[this.mapdata.animalevel[i][j].sourceId];
				pani.xani.InitAnimaWithName(this.mapdata.animalevel[i][j].sName, this.mapdata.animalevel[i][j].aa);
				/////
				j++;
			}
		}
		//√
		i=0;
		k=this.pls.GetNextByte();
		while(k>0)
		{
			this.mapdata.pps[i]=new COLLPATH(k);
			for(j=0;j<k;j++)
			{
				this.mapdata.pps[i].path[j][0]=this.pls.GetNextShort();
				this.mapdata.pps[i].path[j][1]=this.pls.GetNextShort();
			}
			i++;
			k=this.pls.GetNextByte();
		}
		GmPlay.sop("at 3="+this.pls.iOffset);
		this.vbk.LoadVisual(this.pls);//npc事件
//		mfy.initboom(mx, my, mapdata.iMapWidth, mapdata.iMapHeight, iBlockWidth, iBlockHeight);
		this.mfy.initboom(this.vbk.iBoomX, this.vbk.iBoomY, this.mapdata.iMapWidth, this.mapdata.iMapHeight, this.iBlockWidth, this.iBlockHeight);
		
		GmPlay.sop("at 4="+this.pls.iOffset);
		
		//console.log('地图加载完成')
		this.bMapLoaded=true;
		
		if(GmPlay.iTraverse==1)
		{//无障碍
			this.RemoveTraverse(0);
		}
	}
	
	RemoveTraverse( type)
	{
		var i;
		if(type==0)
		{
			if(this.iCurrentMapId==3)
			{
				for(i=0;i<MapData.MAXPATHCOUNT;i++)
				{
					if(this.mapdata.pps[i]==null)break;
					if(this.mapdata.pps[i].path[0][0]==1248 && this.mapdata.pps[i].path[0][1]==713)
					{
						this.mapdata.pps[i].iPathCount=0;
						this.mfy.initboom(this.vbk.iBoomX, this.vbk.iBoomY, this.mapdata.iMapWidth, this.mapdata.iMapHeight, this.iBlockWidth, this.iBlockHeight);
						return;
					}
				}
			}
		}
		
	}
	 mto( mx, my)
	{
		var dox,doy;
		this.vbk.CheckNow(mx,my);
		if(this.vbk.bFaceToFace)
		{
			this.vbk.bFaceToFace=false;
			JQMode.jq.iGoToNpc=0;
			//停下
			GmMe.me.ChangeStat("站立");
		}
		dox=GmConfig.SCRW/2-mx;
		doy=GmConfig.SCRH/2-my;
		if(dox>0)dox=0;
		if(dox<GmConfig.SCRW-this.mapdata.iMapWidth)dox=GmConfig.SCRW-this.mapdata.iMapWidth;
		if(doy>0)doy=0;
		if(doy<GmConfig.SCRH-this.mapdata.iMapHeight)doy=GmConfig.SCRH-this.mapdata.iMapHeight;
		this.iOffx=dox;
		this.iOffy=doy;
		if(this.mapdata.iMapWidth<GmConfig.SCRW)
		{
			this.iOffx=(GmConfig.SCRW-this.mapdata.iMapWidth)/2;
		}
		if(this.mapdata.iMapHeight<GmConfig.SCRH)
		{
			this.iOffy=(GmConfig.SCRH-this.mapdata.iMapHeight)/2;
		}
	}
	 Draw()
	{
		var i,j,k;
		var pcut;
		var pani;
//		if(1==1)return;
		var sx,sy,sw,sh;
		sx=-this.iOffx/this.iBlockWidth;
		sy=-this.iOffy/this.iBlockHeight;
		sw=sx+(GmConfig.SCRW+this.iBlockWidth-1)/this.iBlockWidth+1;
		sh=sy+(GmConfig.SCRH+this.iBlockHeight-1)/this.iBlockHeight+1;
		if(sw>this.mapdata.iBCW)sw=this.mapdata.iBCW;
		if(sh>this.mapdata.iBCH)sh=this.mapdata.iBCH;
//		GmPlay.sop("sx="+sx+",sw="+sw);
//		GmPlay.sop("sy="+sy+",sh="+sh);
		for(i=0;i<3;i++)
		{
			for(j=sy;j<sh;j++)
			{
				for(k=sx;k<sw;k++)
				{
					if(this.mapdata.cutlevel[i][j][k][0]!=-1)
					{
//						GmPlay.sop("i="+i+"j="+j+"k="+k);
//						GmPlay.sop("mapdata.cutlevel[i][j][k][0]="+mapdata.cutlevel[i][j][k][0]);
						pcut=this.pSourceIndex[this.mapdata.cutlevel[i][j][k][0]];
						if(pcut.iRid==-1)pcut.iRid=M3DFast.gi().LoadFromFile(pcut.sImageName, -1,GameData.bFromSD);
						this.xm3f.DrawImageEx(0, this.iOffx+k*this.iBlockWidth,this.iOffy+j*this.iBlockHeight, pcut.iRid,
                            this.mapdata.cutlevel[i][j][k][1]%pcut.iBw*this.iBlockWidth,this.mapdata.cutlevel[i][j][k][1]/pcut.iBw*this.iBlockHeight,
                            this.iBlockWidth,this.iBlockHeight,100,1,1,0,0,0);
					}
				}
			}
			for(j=0;j<256;j++)
			{
				if(this.mapdata.animalevel[i][j]!=null)
				{
					pani=this.pSourceIndex[this.mapdata.animalevel[i][j].sourceId];
					pani.xani.DrawAnima_aa(this.iOffx+this.mapdata.animalevel[i][j].iX, this.iOffy+this.mapdata.animalevel[i][j].iY, this.mapdata.animalevel[i][j].aa);
					pani.xani.NextFrame(this.mapdata.animalevel[i][j].aa);
				}
			}
		}
	}
	//int this.idsx,this.idsy,this.idsw,this.idsh;
	DrawGround()
	{
		var i,j,k;
		var x,y;
		var pcut;
		var pani;
//		if(1==1)return;
		this.idsx=-this.iOffx/this.iBlockWidth;
		this.idsy=-this.iOffy/this.iBlockHeight;
		this.idsw=this.idsx+(GmConfig.SCRW+this.iBlockWidth-1)/this.iBlockWidth+1;
		this.idsh=this.idsy+(GmConfig.SCRH+this.iBlockHeight-1)/this.iBlockHeight+1;
		if(this.idsx<0)this.idsx=0;
		if(this.idsy<0)this.idsy=0;
		if(this.idsw>this.mapdata.iBCW)this.idsw=this.mapdata.iBCW;
		if(this.idsh>this.mapdata.iBCH)this.idsh=this.mapdata.iBCH;
//		GmPlay.sop("sx="+sx+",sw="+sw);
//		GmPlay.sop("sy="+sy+",sh="+sh);
		// if(SystemOperate.iPictureQuality==1)XImgFast.bLow=true;
		if(this.mapdata.iGroundSourceId>=0)
		{//整图底面
//			GmPlay.sop("mapdata.iGroundSourceId="+mapdata.iGroundSourceId);
			var ppng=this.pSourceIndex[this.mapdata.iGroundSourceId];
			for(i=0;i<ppng.ww;i++)
			{
				for(j=0;j<ppng.hh;j++)
				{
					x=this.iOffx+i*512;
					y=this.iOffy+j*512;

					if(ppng.iRid[j][i]==-1)
					{
						//console.log('地图：',ppng.sImagePath)
						ppng.iRid[j][i]=M3DFast.gi().LoadFromFile(ppng.sImagePath+"spirit_"+i+"_"+j+".png", -1,GameData.bFromSD);
					}
					if(x+512<0)continue;
					if(x>=GmConfig.SCRW)continue;
					if(y+512<0)continue;
					if(y>=GmConfig.SCRH)continue;
//					GmPlay.sop("i="+i+",j="+j+",fn="+ppng.sImagePath+"spirit_"+i+"_"+j+".png");
					this.xm3f.DrawImageEx(0, x,y, ppng.iRid[j][i],
							0,0,512,512,
							100,1,1,0,0,0);
				}
			}
		}
		// if(SystemOperate.iPictureQuality==1)XImgFast.bLow=false;
		i=0;
		{
			if(1==0)
			{//切片层，暂时屏蔽
			for(j=this.idsy;j<this.idsh;j++)
			{
				for(k=this.idsx;k<this.idsw;k++)
				{
//					GmPlay.sop("i="+i+"j="+j+"k="+k);
//					GmPlay.sop("mapdata.cutlevel[i][j][k][0]="+mapdata.cutlevel[i][j][k][0]);
					if(this.mapdata.cutlevel[i][j][k][0]!=-1)
					{
						pcut=this.pSourceIndex[this.mapdata.cutlevel[i][j][k][0]];
						if(pcut.iRid==-1)pcut.iRid=M3DFast.gi().LoadFromFile(pcut.sImageName, -1,true);
						this.xm3f.DrawImageEx(0, this.iOffx+k*this.iBlockWidth,this.iOffy+j*this.iBlockHeight, pcut.iRid,
                            this.mapdata.cutlevel[i][j][k][1]%pcut.iBw*this.iBlockWidth,this.mapdata.cutlevel[i][j][k][1]/pcut.iBw*this.iBlockHeight,
                            this.iBlockWidth,this.iBlockHeight,100,1,1,0,0,0);
					}
				}
			}
			}
			for(j=0;j<256;j++)
			{
				if(this.mapdata.animalevel[i][j]!=null)
				{
					pani=this.pSourceIndex[this.mapdata.animalevel[i][j].sourceId];
					pani.xani.DrawAnima_aa(this.iOffx+this.mapdata.animalevel[i][j].iX, this.iOffy+this.mapdata.animalevel[i][j].iY, this.mapdata.animalevel[i][j].aa);
					pani.xani.NextFrame(this.mapdata.animalevel[i][j].aa);
				}
			}
		}
		if(this.mapdata.iMapWidth<GmConfig.SCRW && this.mapdata.iMapWidth%512!=0)
		{
			M2DFast.xm3f.FillRect_2D(this.iOffx+this.mapdata.iMapWidth, this.iOffy, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
		}
		if(this.mapdata.iMapHeight<GmConfig.SCRH && this.mapdata.iMapHeight%512!=0)
		{
			M2DFast.xm3f.FillRect_2D(this.iOffx, this.iOffy+this.mapdata.iMapHeight, GmConfig.SCRW, GmConfig.SCRH, 0xff000000);
		}
		if(this.iCurrentMapId>=41 && this.iCurrentMapId<=45)
		{
			for(i=0;i<MyLand.iMaxArable;i++)
			{
				if((MyLand.iArableGrow&(1<<i))!=0)
				{//有土地，画土地，根据当前地类型
					GmPlay.xani_grow.DrawAnima(this.iOffx+MyLand.iArableOff[i][0], this.iOffy+MyLand.iArableOff[i][1], MyLand.sLandName[this.iCurrentMapId-41]+"地块",0);
				}
				//画地面格子
				else if(MyLand.bShowBlock)GmPlay.xani_grow.DrawAnima(this.iOffx+MyLand.iArableOff[i][0], this.iOffy+MyLand.iArableOff[i][1], "选择地块",0);
			}
		}
		if(GmPlay.iTraverse==1)
		{
			if(this.iCurrentMapId==3)
			{
				//GmPlay.sop1("补路");
				GmPlay.xani_ui4.DrawAnima(this.iOffx+1218, this.iOffy+718, "西阳补路",0);
			}
		}
		TouchEffect.te.Draw();
	}
	DrawMiddleDirect()
	{
		var i,j,k;
		var pcut;
		var pani;

		i=1;
		{
			if(1==0)
			{
			for(j=this.idsy;j<this.idsh;j++)
			{
				for(k=this.idsx;k<this.idsw;k++)
				{
					if(this.mapdata.cutlevel[i][j][k][0]!=-1)
					{
//						GmPlay.sop("i="+i+"j="+j+"k="+k);
//						GmPlay.sop("mapdata.cutlevel[i][j][k][0]="+mapdata.cutlevel[i][j][k][0]);
						pcut=this.pSourceIndex[this.mapdata.cutlevel[i][j][k][0]];
						if(pcut.iRid==-1)pcut.iRid=M3DFast.gi().LoadFromFile(pcut.sImageName, -1,true);
						this.xm3f.DrawImageEx(0, this.iOffx+k*this.iBlockWidth,this.iOffy+j*this.iBlockHeight, pcut.iRid,
                            this.mapdata.cutlevel[i][j][k][1]%pcut.iBw*this.iBlockWidth,this.mapdata.cutlevel[i][j][k][1]/pcut.iBw*this.iBlockHeight,
                            this.iBlockWidth,this.iBlockHeight,100,1,1,0,0,0);
					}
				}
			}
			}
			for(j=0;j<256;j++)
			{
				if(this.mapdata.animalevel[i][j]!=null)
				{
					pani=this.pSourceIndex[this.mapdata.animalevel[i][j].sourceId];
					pani.xani.DrawAnima_aa(this.iOffx+this.mapdata.animalevel[i][j].iX, this.iOffy+this.mapdata.animalevel[i][j].iY, this.mapdata.animalevel[i][j].aa);
					pani.xani.NextFrame(this.mapdata.animalevel[i][j].aa);
				}
			}
		}
	}
	DrawMiddle( pdbf)
	{
		var i,j,k;
		var pcut;
		var pani;
//		if(1==1)return;

		i=1;
		{
			if(1==0)
			{
			for(j=this.idsy;j<this.idsh;j++)
			{
				for(k=this.idsx;k<this.idsw;k++)
				{
					if(this.mapdata.cutlevel[i][j][k][0]!=-1)
					{
//						GmPlay.sop("i="+i+"j="+j+"k="+k);
//						GmPlay.sop("mapdata.cutlevel[i][j][k][0]="+mapdata.cutlevel[i][j][k][0]);
						pcut=this.pSourceIndex[mapdata.cutlevel[i][j][k][0]];
						if(pcut.iRid==-1)pcut.iRid=M3DFast.gi().LoadFromFile(pcut.sImageName, -1,true);
						pdbf.DrawImage(this.iOffx+k*this.iBlockWidth,this.iOffy+j*this.iBlockHeight, pcut.iRid,
                            this.mapdata.cutlevel[i][j][k][1]%pcut.iBw*this.iBlockWidth,this.mapdata.cutlevel[i][j][k][1]/pcut.iBw*this.iBlockHeight,
                            this.iBlockWidth,this.iBlockHeight);
					}
				}
			}
			}
			for(j=0;j<256;j++)
			{
				if(this.mapdata.animalevel[i][j]!=null)
				{
					pani=this.pSourceIndex[this.mapdata.animalevel[i][j].sourceId];
                    pdbf.DrawAnima_aa(this.iOffy+this.mapdata.animalevel[i][j].iY,pani.xani,this.iOffx+this.mapdata.animalevel[i][j].iX, 
                        this.iOffy+this.mapdata.animalevel[i][j].iY, this.mapdata.animalevel[i][j].aa);
					pani.xani.NextFrame(this.mapdata.animalevel[i][j].aa);
				}
			}
		}
		this.vbk.DrawNpcInBuffer(pdbf,this.iOffx,this.iOffy);
	}
	DrawSky()
	{
		var i,j,k;
		var pcut;
		var pani;
//		if(1==1)return;

//		this.idsx=-this.iOffx/iBlockWidth;
//		this.idsy=-this.iOffy/iBlockHeight;
//		this.idsw=this.idsx+(gi().SCRW+iBlockWidth-1)/iBlockWidth+1;
//		this.idsh=this.idsy+(gi().SCRH+iBlockHeight-1)/iBlockHeight+1;
//		if(this.idsx<0)this.idsx=0;
//		if(this.idsy<0)this.idsy=0;
//		if(this.idsw>mapdata.iBCW)this.idsw=mapdata.iBCW;
//		if(this.idsh>mapdata.iBCH)this.idsh=mapdata.iBCH;
//		GmPlay.sop("sx="+sx+",sw="+sw);
//		GmPlay.sop("sy="+sy+",sh="+sh);
		i=2;
		{
			if(1==0)
			{
			for(j=this.idsy;j<this.idsh;j++)
			{
				for(k=this.idsx;k<this.idsw;k++)
				{
					if(this.mapdata.cutlevel[i][j][k][0]!=-1)
					{
//						GmPlay.sop("i="+i+"j="+j+"k="+k);
//						GmPlay.sop("mapdata.cutlevel[i][j][k][0]="+mapdata.cutlevel[i][j][k][0]);
						pcut=this.pSourceIndex[this.mapdata.cutlevel[i][j][k][0]];
						this.xm3f.DrawImageEx(0, this.iOffx+k*this.iBlockWidth,this.iOffy+j*this.iBlockHeight, pcut.iRid,
                            this.mapdata.cutlevel[i][j][k][1]%pcut.iBw*this.iBlockWidth,this.mapdata.cutlevel[i][j][k][1]/pcut.iBw*this.iBlockHeight,
                            this.iBlockWidth,this.iBlockHeight,100,1,1,0,0,0);
					}
				}
			}
			}
			for(j=0;j<256;j++)
			{
				if(this.mapdata.animalevel[i][j]!=null)
				{
					pani=this.pSourceIndex[this.mapdata.animalevel[i][j].sourceId];
					pani.xani.DrawAnima_aa(this.iOffx+this.mapdata.animalevel[i][j].iX, this.iOffy+this.mapdata.animalevel[i][j].iY, this.mapdata.animalevel[i][j].aa);
					pani.xani.NextFrame(this.mapdata.animalevel[i][j].aa);
				}
			}
		}
//		vbk.mapdialog.Draw();
	}
}
MapManager.MAXMAPCOUNT=128;
MapManager.SOURCECOUNT=128;
MapManager.mm=null;
MapManager.gi=function()
{
	if(MapManager.mm==null)MapManager.mm=new MapManager();
	return MapManager.mm;
}