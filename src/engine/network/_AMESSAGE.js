import XDefine from "../../config/XDefine"

export default class _AMESSAGE {
    constructor()
    {
        this.MAXMESSAGESIZE=2048;
        this.iSize;
        this.data=new Uint8Array(this.MAXMESSAGESIZE);//
    }

	copyfrom( msg)
	{
		this.iSize=msg.iSize;
		XDefine.arraycopy(msg.data, 0, this.data, 0, this.iSize);
	}
}
