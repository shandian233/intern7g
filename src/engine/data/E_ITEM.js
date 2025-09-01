
export default class E_ITEM
{
	constructor()
	{
		
	}
	
	intValue( vid)
	{
		return parseInt(this.strValue(vid));
	}
	strValue( vid)
	{
		var i;
		for(i=0;i<this.iValueCount;i++)
		{
			if(this.values[i].iVid==vid)return this.values[i].sValue;
		}
		return "-1";
	}
}
