
import GmConfig from "../../../../config/GmConfig"
import XDefine from "../../../../config/XDefine"
import BaseClass from "../../../../engine/BaseClass"
import XButtonEx2 from "../../../../engine/control/XButtonEx2"
import M3DFast from "../../../../engine/graphics/M3DFast"
import XAnima from "../../../../engine/graphics/XAnima"
import GmPlay from "../../../../engtst/mgm/GmPlay"
import XStat from "../../../../engtst/mgm/XStat"
import DrawMode from "../../../../engtst/mgm/frame/DrawMode"
import EasyMessage from "../../../../engtst/mgm/frame/message/EasyMessage"
import PrivateChat_Send from "../../../../engtst/mgm/gameing/chat/privatechat/PrivateChat_Send"
import PublicChat_Send from "../../../../engtst/mgm/gameing/chat/publicchat/PublicChat_Send"
import Goods from "../../../../engtst/mgm/gameing/me/goods/Goods"
import MyPets from "../../../../engtst/mgm/gameing/me/pet/MyPets"
	
	
export default class SelectPet extends BaseClass{


	 constructor( ani)
	{
		super();
		var i;
		this.pani=ani;
		this.pm3f=ani.pm3f;
		
		this.iW=250+30+30;
		this.iH=MyPets.mp.iPetCount*50+40;
		this.iX=(GmConfig.SCRW-this.iW)/2;
		this.iY=(GmConfig.SCRH-this.iH)/2;
		
		if(this.btn_sel==null)
		{
			this.btn_sel=new Array(MyPets.mp.iPetCount);//
			
			for(i=0;i<MyPets.mp.iPetCount;i++)
			{
				this.btn_sel[i]=new XButtonEx2(GmPlay.xani_button);
				this.btn_sel[i].InitButton("3号按钮250_42");
				this.btn_sel[i].Move(this.iX+30, this.iY+20+i*50, 250, 42);
//				this.btn_sel[i].iNameSize=30;
				this.btn_sel[i].sName=MyPets.mp.pets[i].sName;
			}
		}
	}


	Draw()
	{
		var i;
		DrawMode.frame_type4("10号框20_20", this.iX, this.iY, this.iW, this.iH, 20, 20);
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			this.btn_sel[i].Draw();
		}
	}
	 ProcTouch( msg, x, y)
	{
		var i;
		for(i=0;i<MyPets.mp.iPetCount;i++)
		{
			if(this.btn_sel[i].ProcTouch(msg, x, y))
			{
				if(this.btn_sel[i].bCheck())
				{
					if(SelectPet.iType==0)PublicChat_Send.AddPet(MyPets.mp.pets[i]);
					else if(SelectPet.iType==1)PrivateChat_Send.AddPet(MyPets.mp.pets[i]);
					XStat.gi().PopStat(1);
				}
				return true;
			}
		}
		if(msg==3 && !XDefine.bInRect(x, y, this.iX, this.iY, this.iW, this.iH))XStat.gi().PopStat(1);
		return false;
	}

}

SelectPet.iType=0;
SelectPet.Open=function( type)
{
    if(MyPets.mp.iPetCount<=0)
    {
        EasyMessage.easymsg.AddMessage("当前没有宠物");
        return;
    }
    SelectPet.iType=type;
    XStat.gi().PushStat(XStat.GS_SELECTPET);
}
// SelectPet.Open=function( g)
// {
//     XStat.gi().PushStat(XStat.GS_SELECTPET);
// }
