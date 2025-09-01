
//import java.io.FileInputStream;
//import java.io.FileOutputStream;
//import java.io.IOException;

//import android.content.Context;
//import android.util.Log;

export default class DataFast {

	constructor( context, pls)
	{
		this.ct=context;
		this.pps=pls;
	}
	
	SaveTo( fn)
	{

			this.fOut=this.ct.openFileOutput(fn,Context.MODE_PRIVATE);
			this.fOut.write(this.pps.databuf, 0, this.pps.iOffset);
			Log.i("Write "+fn+" Length",""+this.pps.iOffset);

	}
	ReadFrom( fn)
	{
	
			this.fIn=this.ct.openFileInput(fn);
			this.pps.iLength=this.fIn.read(this.pps.databuf, 0, 64*1024);
			this.pps.iOffset=0;
			Log.i("Read "+fn+" Length",""+this.pps.iLength);

	}

    deleteBy( fn) {
      
            this.ct.deleteFile(fn);
  
    }

     fileLength( fn) {
    
			this.fIn=this.ct.openFileInput(fn);
            return this.fIn.read();

    }
}
