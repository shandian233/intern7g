import XDefine from "../../config/XDefine";


export default class LoadAnimaRes
{
    constructor()
    {
        this.ani_list=new Array();
        this.bLoadFinished=false;
    }
    /**
     * 
     * @param {XAnima} pani 
     */
    PushAnima(pani)
    {
        this.ani_list[this.ani_list.length]=pani;
    }
    LoadInitRes()
    {
        LoadAnimaRes.iLoadingCount=0;
        LoadAnimaRes.iLoadedResCount=0;
        for(var i=0;i<this.ani_list.length;i++)
        {
            LoadAnimaRes.iLoadedResCount+=this.ani_list[i].LoadInitRes(LoadAnimaRes._init_res);
        }
        if(LoadAnimaRes.iLoadedResCount>=LoadAnimaRes.iMaxResCount)
        {
            XDefine.sop("=========load init finished=========")
        }
    }
    LoadOtherRes()
    {
        if(this.bLoadFinished)return;
        LoadAnimaRes.iLoadingCount=0;
        this.bLoadFinished=true;
        for(var i=0;i<this.ani_list.length;i++)
        {
            if(this.ani_list[i].IsResLoadedFinish())continue;
            this.ani_list[i].LoadRes();
            this.bLoadFinished=false;
        }
        if(this.bLoadFinished)
        {
            XDefine.sop("=========load other finished=========")
        }
    }
}
LoadAnimaRes.iMaxLoadThread=4096;
LoadAnimaRes.iLoadingCount=0;
LoadAnimaRes.pp=null;
LoadAnimaRes.gi=function()
{
    if(LoadAnimaRes.pp==null)LoadAnimaRes.pp=new LoadAnimaRes();
    return LoadAnimaRes.pp;
}

LoadAnimaRes._init_res=[
];

LoadAnimaRes.iMaxResCount=LoadAnimaRes._init_res.length;
LoadAnimaRes.iLoadedResCount=0;