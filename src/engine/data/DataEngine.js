
import GameData from "../../config/GameData"
import PackageTools from "../../engine/PackageTools"
import GmPlay from "../../engtst/mgm/GmPlay"
import E_DATA from "./E_DATA"
import E_ITEM from "./E_ITEM"
import E_VALUE from "./E_VALUE"
import XDefine from "../../config/XDefine";
import XOLE from "../../ui/XOLE";



export default class DataEngine {
	GetData(pde,filepath,retry_time,data)
    {
		if(data==null)
		{
			if(retry_time>0)XDefine.sop("retry "+retry_time+","+filepath);
			Laya.loader.load(filepath,Laya.Handler.create(pde, pde.GetData,[pde,filepath,retry_time+1]),null,Laya.Loader.BUFFER);
			return;
		}
        var pls=PackageTools.gi();
        pls.GetData3(data);

		pde._LoadData(pls);
		this.bLoadSuccess=true;
    }
	constructor( pls, fn, blocal)//"data/mission.dat"
	{
		if(blocal)
		{
			this.GetData(this,XDefine.BASE_URL+"res/datapackage/"+fn,0);
			// var pls=XOLE.gi().get_file_data("res/datapackage/"+fn);
			// this.bLoadSuccess=true;
			// this._LoadData(pls);
		}
		this.bLoadSuccess=false;
	}
	_LoadData(pls)
	{
		var i,j,k;
		this.iValueIndex=new Int32Array(DataEngine.MAXVALUEINDEX);//
		for(i=0;i<DataEngine.MAXVALUEINDEX;i++)this.iValueIndex[i]=-1;
		pls.GetNextByte();
		this.iDataCount=pls.GetNextInt();
		this.datas=new Array(this.iDataCount);//
		for(i=0;i<this.iDataCount;i++)
		{
			this.datas[i]=new E_DATA();
			this.datas[i].iDid=pls.GetNextInt();
			this.iValueIndex[this.datas[i].iDid]=i;
			this.datas[i].iItemCount=pls.GetNextInt();
			this.datas[i].items=new Array(this.datas[i].iItemCount);
			for(j=0;j<this.datas[i].iItemCount;j++)
			{
				this.datas[i].items[j]=new E_ITEM();
				this.datas[i].items[j].iItemId=pls.GetNextInt();
				this.datas[i].items[j].iType=pls.GetNextInt();
				this.datas[i].items[j].iValueCount=pls.GetNextInt();
				this.datas[i].items[j].values=new Array(this.datas[i].items[j].iValueCount);
				for(k=0;k<this.datas[i].items[j].iValueCount;k++)
				{
					this.datas[i].items[j].values[k]=new E_VALUE();
					this.datas[i].items[j].values[k].iVid=pls.GetNextInt();
					this.datas[i].items[j].values[k].sValue=pls.GetNextString();
				}
			}
		}
	}
	fdata( did)
	{
		if(did>=DataEngine.MAXVALUEINDEX)
		{
			return null;
		}
		var i=this.iValueIndex[did];
		if(i==-1)return null;
		return this.datas[i];
	}
	intValue( did, number, vid)
	{
		return parseInt(this.strValue(did,number,vid));
	}
	strValue( did, number, vid)
	{
		var i,j,k,n;
		if(did<0 || did>=DataEngine.MAXVALUEINDEX)
		{
			this.sResult="-1";
			return this.sResult;
		}
		i=this.iValueIndex[did];
		n=0;
//		for(i=0;i<this.iDataCount;i++)
		if(i!=-1)
		{
			if(this.datas[i].iDid==did)
			{
				for(j=0;j<this.datas[i].iItemCount;j++)
				{
//					if(itemid==-1 || this.datas[i].items[j].iItemId==itemid)
//					{
						for(k=0;k<this.datas[i].items[j].iValueCount;k++)
						{
							if(this.datas[i].items[j].values[k].iVid==vid)
							{
								if(n>=number)
								{
									this.sResult=this.datas[i].items[j].values[k].sValue;
		//							GmPlay.sop(","+i+","+j+","+k+","+this.datas[i].items[j].values[k].sValue);
									if(this.sResult.length<=0)this.sResult="-1";
									return this.sResult;
								}
								else
								{
									n++;
									break;
								}
							}
						}
//					}
				}
			}
		}
		return "-1";
	}
}
DataEngine.MAXVALUEINDEX=1024;