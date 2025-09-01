
export default class E_DATA
{
	 E_DATA()
	{
		
	}
	
	 fitem( iid)
	{
		var i;
		for(i=0;i<this.iItemCount;i++)
		{
			if(this.items[i].iItemId==iid)return this.items[i];
		}
		return null;
	}
	intValue( vid)
	{
		return parseInt(this.strValue(vid));
	}
	strValue( vid)
	{
		var i,j;
		for(i=0;i<this.iItemCount;i++)
		{
			for(j=0;j<this.items[i].iValueCount;j++)
			{
				if(this.items[i].values[j].iVid==vid)return this.items[i].values[j].sValue;
			}
		}
		return "-1";
	}
}
