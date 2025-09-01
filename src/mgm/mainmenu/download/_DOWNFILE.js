
export default class _DOWNFILE
{//所需下载的文件列表
	constructor()
	{

	}
//	public String sName,sWriteTo;//包含相对路径的文件名
//	public String sMD5;
//	public int iProc,iFileSize;
//	public byte iFlag;//0初始化，10下载中，20成功下载，30下载失败，40,50结束
	InitData( name, md5, size)
	{
		this.sName=name;
		this.sMD5=md5;
		this.iFileSize=size;
		this.iFlag=0;
	}
	bProcing()
	{
		if(iFlag==10)return true;
		return false;
	}
	bSuccress()
	{
		if(iFlag==20)return true;
		else return false;
	}
	bFailed()
	{
		if(iFlag==30)return true;
		else return false;
	}
}
