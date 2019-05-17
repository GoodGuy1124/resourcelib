
<template>
    <div>
<el-button size="medium" type="primary" @click="alertfile" icon="upload" >上传</el-button>
<el-dialog title="提示" :visible.sync="dialogVisible1" size="tiny">
  <span>是否续传？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="nogoon">取 消</el-button>
    <el-button type="primary" @click="goon">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="提示" :visible.sync="dialogVisible2" size="tiny">
  <span>文件已存在，是否替换？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="nogoon1">取 消</el-button>
    <el-button type="primary" @click="goon1">确 定</el-button>
  </span>
</el-dialog>
<input type="file" multiple="multiple"  @change="addFile"  ref="ss" style="visibility:hidden" />
    </div>
</template>
<script>
import Bus from './Bus'
export default {
	 created(){
            Bus.$on('deleteProgress', data => {  
				this.RemoveUpload(data);
			});
	 },
    data() {
      return {
         dialogVisible1 : false,
		 dialogVisible2 : false,
         mIsUploading: false,
         nub:0,
         news:[],
         mUploads:[],
		 progressName:[],
        };
    },
    methods: {
		
alertfile(){
	this.$refs.ss.type='text';
	this.$refs.ss.type='file';
	this.$refs.ss.click();},
containsFileID(mUploads,FileID)
{
    for (let i = 0; i < mUploads.length; i++)
		if(mUploads[i].FileID==FileID) return true;
	return false;
},
     addFile()
 {     
	let mFolder=this.$store.state.login.path;
    let fileList = this.$refs.ss.files;
    for (let i = 0; i < fileList.length; i++)
	{
		let FileID= $.md5(mFolder+fileList[i].name);
		if(this.containsFileID(this.mUploads,FileID)) continue; //文件ID已经存在
		//selFiles.push(fileList[i]);
		var upInfo={};
		upInfo.file=fileList[i]; //!!!
		upInfo.FileID=FileID;
		upInfo.Folder=mFolder;
		upInfo.Name = fileList[i].name;
        upInfo.totalBytes = fileList[i].size;
		upInfo.finBytes=0;
		upInfo.PackagesSize=1024*512;
		this.progressName[1]=null;
		this.progressName[2]=fileList[i].name;
		Bus.$emit('refresProgress',this.progressName);
		this.mUploads.push(upInfo);
	}
	this.StartUpload();
 },
 StartUpload()
{   
	if (!this.mIsUploading)
	{
		this.mIsUploading = true;
		this.UploadItem();
	}
},
UploadItem() //发送Upload命令，服务器检查上传文件的现状
{
	// console.log("UploadItem:"+this.mIsUploading);
	if (this.mIsUploading)
	{
		// console.log("this.mUploads.length:"+this.mUploads.length);
		if (this.mUploads.length == 0)
		{
			this.mIsUploading = false;
			return;
		}
		var info = this.mUploads[0]; //UploadInfo info 
		// console.log("this.mUploads[0]:"+this.mUploads[0].Name);
		var upload = {}; //Protocols.Upload upload
		upload.FileName = info.Name;
		upload.Folder = info.Folder;
		upload.Size = info.totalBytes;
		upload.PackagesSize = info.PackagesSize;
		$.send("Upload",upload,this);
	}
},
Upload_err(state,commit,data){alert(data.Status);},
  goon(){
	  this.dialogVisible1 = false;
	  var confirm = {}; //Protocols.UploadConfirm confirm
						confirm.delOldFile = false; //续传不删除旧的".up"文件
						$.send("UploadConfirm",confirm,this); //这次发送，还是返回UploadResponse，由本函数Upload处理
  },
  nogoon(){
	   this.dialogVisible1 = false;
    this.RemoveFirstUpload();
  },
    goon1(){
	  this.dialogVisible2 = false;
	  	var confirm = {}; //Protocols.UploadConfirm confirm
						confirm.delOldFile = true;
						$.send("UploadConfirm",confirm,this); //这次发送，还是返回UploadResponse，由本函数Upload处理

  },
  nogoon1(){
	   this.dialogVisible2 = false;
   this.RemoveFirstUpload();
  },
  UploadConfirm_cb(state,commit,data){
  this.Upload_cb(state,commit,data);
  },
Upload_cb(state,commit,data) //Upload返回数据处理
{	if (data.QuestionOverride) //文件存在，询问是否替换
	{	if (data.uploading) {this.dialogVisible1 = true;}
		else{this.dialogVisible2=true;}
		return;	
	}
	if (data.Status != null) alert("错误:\n" + data.Status);
	else
		{
		let info = this.mUploads[0];
		let packages = {}; //Protocols.UploadPackage package
		packages.FileID = info.FileID;
		packages.fileLength = info.totalBytes;
		if (data.uploading) //续传
		{
			//服务器端.up文件比本地文件还要大
			if (data.uploadSize >= info.totalBytes)
			   {alert("服务器端文件长度超过本地文件“" + info.File.Name + "”，无法续传！"); return;}
			packages.start = data.uploadSize; //默认为0，如果有".up文件"存在，则为返回的".up文件"长度
		}
		else
		packages.start = 0; //从头开始(可能是文件不存在，可能是经过确认后删除了)
		var reader = new FileReader();
		reader.onload = (ev)=>{
			var view = new Uint8Array(ev.target.result); //ev.target.result是ArrayBuffer
			packages.Data=new Array(ev.target.result.byteLength);
			for (var i=0;i<packages.Data.length;i++) {
				packages.Data[i]=view[i];
			}
			// console.log("Upload:packages.Data"+packages.Data);
			this.progressName[0]=packages.fileLength;
			$.send("UploadPackage",packages,this);
		}
		var blob = this.mUploads[0].file.slice(packages.start,packages.start+info.PackagesSize);
		reader.readAsArrayBuffer(blob);
	}
},
 UploadPackage_cb(state,commit,data){
// 	 	 if(this.mUploads.length==0){
// 		this.progressName[2]=this.ss;
// 	 }
// 	 else{
// this.progressName[2]=this.mUploads[0].Name;
// 	 };
this.progressName[2]=this.mUploads[0].Name;
this.progressName[1]=data.nextStart;
Bus.$emit('refresProgress',this.progressName);
	$.send('List',{Folder:this.$store.state.login.path},this);
	if (this.mUploads.length == 0) return;
	var info = this.mUploads[0];
	if (data.FileID != info.FileID) return;
	if (data.Status != null) {alert("错误:\n" + data.Status); return;}

	var fileLength = info.totalBytes;
	// console.log(data.nextStart);
	// console.log(fileLength);
	if (data.nextStart >= fileLength) //已经上传完毕
	{
		this.RemoveFirstUpload();
		//UploadItem();  //RemoveFirstUpload()中已经调用了一次
	}
	else //未上传完，继续传下一个块
	{
		
	  //根据服务器返回的实际字节数，更新客户端的完成字节数
		// refreshUploadList($('#gUpload'),this.mUploads);//进度条显示同步
		var packages = {}; //Protocols.UploadPackage package
		packages.FileID = info.FileID;
		packages.start = data.nextStart;
		packages.fileLength = info.totalBytes;
		
		var reader = new FileReader();
		reader.onload = (ev)=>{
			// console.log("Upload:ev.target.result.length:"+ev.target.result.byteLength);
			var view = new Uint8Array(ev.target.result); //ev.target.result是ArrayBuffer
			packages.Data=new Array(ev.target.result.byteLength);
			for (var i=0;i<packages.Data.length;i++) {
				packages.Data[i]=view[i];
			}
			// console.log("ccccc");
			// console.log("Upload:packages.Data"+packages.Data);
			$.send("UploadPackage",packages,this);
		}
		var blob = this.mUploads[0].file.slice(packages.start,packages.start+info.PackagesSize);
		reader.readAsArrayBuffer(blob);
	}
},
  List_cb(state,commit,data){
        this.news.push(data.Items);
        Bus.$emit('refres',data.Items);
      },
RemoveUpload(fileID)
{
	for (var i = 0; i < this.mUploads.length; i++)
	{
		if (this.mUploads[i].Name == fileID)
		{
			this.mUploads.splice(i,1); //删除一项
			// refreshUploadList($('#gUpload'),this.mUploads);
			if (i == 0)
				this.UploadItem();
			break; 
		}
	}
},
RemoveFirstUpload()
{
	if (this.mUploads.length > 0)
	{
		 this.mUploads.splice(0,1);
		//  refreshUploadList($('#gUpload'),this.mUploads);
	}
	this.UploadItem();
},
    }
}
</script>