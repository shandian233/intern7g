import SystemOperate from "../../engtst/mgm/gameing/fast/SystemOperate";
import GmPlay from "../../engtst/mgm/GmPlay";
import XDefine from "../../config/XDefine";

export default class WavFast
{
    constructor(){
        this.bMusicEnabled=true;
        this.bPause=false;
    }
    StartWav(s,bLoop)
    {
        if(SystemOperate.iSound==0)return;
		if(this.bPause)return;
		// if(GmPlay.m_vi.bRecording || GmPlay.m_vi.bPlaying)return;
        for(var i=0;i<WavFast._d2.length;i++)
        {
            if(WavFast._d2[i]==s)
            {
                Laya.SoundManager.playSound(XDefine.BASE_URL+"res/datapackage/sound/sound/"+WavFast._d2[i]+".xxx");
            }
        }
    }
    StartWav_Pet(tid,type){
        if(SystemOperate.iSound==0)return;
		if(this.bPause)return;
		// if(GmPlay.m_vi.bRecording || GmPlay.m_vi.bPlaying)return;
		if(tid<=0 || tid>=20 || tid==17 || type<0 || type>=4)return;
        Laya.SoundManager.playSound(XDefine.BASE_URL+"res/datapackage/sound/sound/pets/"+parseInt(tid/10)+(tid%10)+"/"+WavFast._d1[type]+".xxx");
    }
    StartBackMusic( fn, bIsLoop){
        if (this.bMusicEnabled){
            this.StopBackMusic();
            console.log('音乐id:',fn);
            XDefine.sop(XDefine.BASE_URL+"res/datapackage/sound/music/"+fn+".xxx");
            WavFast._music_channel = Laya.SoundManager.playMusic(XDefine.BASE_URL+"res/datapackage/sound/music/"+fn+".xxx");
		}
	}
	StopBackMusic()
	{
        if(WavFast._music_channel!=null){
    		WavFast._music_channel.stop();
        }
    }
}
WavFast._d1=["attack","magic","hurt","die"];
WavFast._d2=["defence",
"escape",
"role0_attack",
"role0_magic",
"role0_hurt",
"role0_die",
"role1_attack",
"role1_magic",
"role1_hurt",
"role1_die",
""];
WavFast._music_channel=null;
WavFast.MusicContinue=function()
{
    if(WavFast._music_channel==null)return;
    WavFast._music_channel.play();
}