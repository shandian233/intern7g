
import PackageTools from "../../../../engine/PackageTools"
import XStat from "../../../../engtst/mgm/XStat"
import FrameMessage from "../../../../engtst/mgm/frame/message/FrameMessage"

export default class MyFuBen {
    constructor()
    {
        
    }
}
MyFuBen.OpenCreate=function( pls)
{
    var i;
    var cfb;
    if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
    if(XStat.gi().iXStat==XStat.GS_CREATEFUBEN)cfb=XStat.gi().LastStat(0);
    else cfb=XStat.gi().PushStat(XStat.GS_CREATEFUBEN);
    
    cfb.iCount=pls.GetNextByte();
    for(i=0;i<cfb.iCount;i++)cfb.ifblist[i]=pls.GetNextInt();
}
MyFuBen.OpenManage=function( pls)
{
    var i;
    var mfb;
    if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
    if(XStat.gi().iXStat==XStat.GS_MANAGEFUBEN)mfb=XStat.gi().LastStat(0);
    else mfb=XStat.gi().PushStat(XStat.GS_MANAGEFUBEN);
    
    mfb.fuben.iFid=pls.GetNextInt();
    mfb.fuben.iType=pls.GetNextByte();
    mfb.fuben.iRid=pls.GetNextInt();
    mfb.fuben.sName=pls.GetNextString();
    mfb.fuben.iLev=pls.GetNextShort();
    mfb.fuben.ras=pls.GetNextByte();
    mfb.fuben.tm=pls.GetNextString();
    mfb.fuben.sDetail=pls.GetNextString();
    mfb.fuben.iOnLine= pls.GetNextByte();
    
    pls.GetNextByte();//0招募中,1进行中
    
    mfb.iMemberCount=pls.GetNextShort();
    for(i=0;i<mfb.iMemberCount;i++)
    {
        mfb.members[i].sName=pls.GetNextString();
        mfb.members[i].iRid=pls.GetNextInt();
        mfb.members[i].iOnLine=pls.GetNextByte();
    }
    
    mfb.iApplyCount=pls.GetNextShort();
    for(i=0;i<mfb.iApplyCount;i++)
    {
        mfb.applyers[i].sName=pls.GetNextString();
        mfb.applyers[i].iRid=pls.GetNextInt();
        mfb.applyers[i].iOnLine= pls.GetNextByte();
    }
}
MyFuBen.OpenApply=function( pls)
{
    var i;
    var afb;
    if(XStat.gi().iXStat==XStat.GS_LOADING1)XStat.gi().PopStat(1);
    if(XStat.gi().iXStat==XStat.GS_APPLYFUBEN)afb=XStat.gi().LastStat(0);
    else afb=XStat.gi().PushStat(XStat.GS_APPLYFUBEN);
    
    afb.iTotalLine=pls.GetNextShort();
    afb.iPage=pls.GetNextByte();
    afb.iCount=pls.GetNextByte();
    
    afb.iTotalPage=(afb.iTotalLine-1)/10+1;
    
    for(i=0;i<afb.iCount;i++)
    {
        afb.fblist[i].iFid=pls.GetNextInt();
        afb.fblist[i].iType=pls.GetNextByte();
        afb.fblist[i].iRid=pls.GetNextInt();
        afb.fblist[i].sName=pls.GetNextString();
        afb.fblist[i].iLev=pls.GetNextShort();
        afb.fblist[i].ras=pls.GetNextByte();
        afb.fblist[i].tm=pls.GetNextString();
        afb.fblist[i].sDetail=pls.GetNextString();
        afb.fblist[i].iOnLine= pls.GetNextByte();
    }
}

MyFuBen.iStat=0;//0不在副本中，1在副本中未开，2在副本中进行中
MyFuBen.iFbid;//副本ID
MyFuBen.iFbType;//副本类型
MyFuBen.iHead;//头
MyFuBen.iFbProc;//进度
MyFuBen.GetStat=function( pls)
{
    MyFuBen.iStat=pls.GetNextShort();
    MyFuBen.iFbid=pls.GetNextInt();
    MyFuBen.iFbType=pls.GetNextInt();
    MyFuBen.iHead=pls.GetNextInt();
    MyFuBen.iFbProc=pls.GetNextInt();
}
MyFuBen.sDetail;//头
MyFuBen.sTarget;//进度
MyFuBen.GetTarget=function( pls)
{
    MyFuBen.sDetail=pls.GetNextString();
    MyFuBen.sTarget=pls.GetNextString();
    FrameMessage.fm.Open("#cffffff"+MyFuBen.sDetail+"#e#c00ff00"+MyFuBen.sTarget);
}