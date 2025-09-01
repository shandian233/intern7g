

export default class _EXTDATA {
//	public int type;//扩展类型：0物品，1宠物，2语音，3自己，4队伍
//	public int eid,tid;//真实id,类型
//	public String name,detail;//名称,语音的翻译结果
//	public int iShowDelay;
	 _EXTDATA()
	{
		this.iShowDelay=0;
	}
	copyfrom( e)
	{
		this.type=e.type;
		this.eid=e.eid;
		this.tid=e.tid;
		this.name=e.name;
		this.detail=e.detail;
		this.iShowDelay=e.iShowDelay;
	}
}
