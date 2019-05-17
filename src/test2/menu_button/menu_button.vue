<template>
<div class="block" >
	<el-row >
    <el-col span='1' ><el-button type="success" @click="newone"  size="medium">新建</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"> <el-button type="warning"@click="delet"size="medium">删除</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"> <el-button type="danger"@click="shownot"  size="medium">改名</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><el-button type="info" @click="copy" icon="document" size="medium" >复制</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><el-button type="info" :class="{'is-disabled': pasteDisable}" @click="paste" icon="document" size="medium">粘贴</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><el-button type="success" @click="refre" icon="plus" size="medium">刷新</el-button></el-col>
	  <el-col span='1' style="margin-left: 2%" ><upload></upload></el-col>
    <el-col span='1' style="margin-left: 2%"><el-button type="info" icon="document" @click="Getid" size="medium">下载</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><grant></grant></el-col>    
    <el-col span='1' style="margin-left: 2%"><el-button type="warning" @click="favorite" icon="star-on" size="medium">收藏</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><el-button type="info" @click="play" icon="star-on" size="medium">播放</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><el-button type="info"  icon="share" @click="sharefor" size="medium">分享</el-button></el-col>
    <el-col span='1' style="margin-left: 2%"><search></search></el-col>
    <el-col span='1' style="margin-left: 2%"><concern></concern></el-col>
  </el-row>
<el-dialog title="重命名" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="请输入" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="on"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="rename">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
  <span>存在重名文件,是否覆盖或替换？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="repaste">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="提示" :visible.sync="dialogVisible2" size="tiny">
  <span>是否删除该文件？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="suredelet">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="添加到收藏夹" :visible.sync="dialogVisible3" size="tiny">
  <el-button type="primary" style="width: 100%" @click="dialogVisible4 = true">新的收藏夹</el-button>
  <div style="margin: 20px 0;"></div>
  <el-table :data="tableData1" style="width: 100%" @row-click="finishFav">
  <el-table-column prop="lableName"  ></el-table-column> </el-table>
</el-dialog>
<el-dialog title="新建收藏夹" :visible.sync="dialogVisible4" size="tiny">
      <el-input v-model="colleces" placeholder="请输入收藏夹名" ></el-input>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4 = false">取 消</el-button>
    <el-button type="primary" @click="newColle">确 定</el-button>
  </div>
</el-dialog>
<group></group>
<group1></group1>
</div>
</template>
<script>
import Bus from '../Bus'
import upload from '../upload'
import grant from '../grant/grant'
import search from '../search/search'
import concern from '../concern/concern'
import group from '../grant/choose_group1/choose_group1.vue';
import group1 from '../grant/choose_group2/choose_group2.vue';
    export default {
         created() {
             Bus.$on('checkElemnt', data => {this.Check=data}) 
             Bus.$on('qqq', data => {this.message=data})
             Bus.$on('doload', data => {this.Getid()})
             Bus.$on('copy1', data => {this.copy()})
              Bus.$on('newone1', data => {this.newone()})
             Bus.$on('paste1', data => {this.paste()})
           },
         data() {
      return {
        Check:null,
        tableData1:[],
        tableData2:[],
        colleces:[],
        nameOfqun:[],
        message:[],
		    dialogVisible1 : false,
		    dialogVisible2 : false,
        dialogVisible3 : false,
        dialogVisible4 : false,
         dialogVisible5 : false,
         dialogVisible6 : false,
        dialogFormVisible: false,
        dialogVisible: false,
        mIsUploading: false,
        mUploads:[],
        mites:[],
        mitesName:[],
        fileid:null,
        count: true,
        news:[],
        form: {
          name: ''
        },
        formLabelWidth: '80px'
      };
    },
 methods: {
   play(){
          if(this.Check == null || this.Check.length==0){
                          this.$message({
                          type: 'info',
                          message: '请选择播放内容'
          }); 
                      }
                      else{
             let item = this.Check[0];
             let	sp = "+#%&".split("");
             for(let i=0; i<sp.length;i++){
               	if(item.ItemName.indexOf(sp[i])!= -1)
				{
                         this.$message({
                          type: 'info',
                          message: '文件名字中包含#、+、%、&等特殊字符，无法正确播放。'
          }); 
				}
  };
  		if(item.ItemName.toLowerCase().slice(item.ItemName.toLowerCase().split("").length-4)==".mp4"||
       item.ItemName.toLowerCase().slice(item.ItemName.toLowerCase().split("").length-4)==".flv")
			{
				 let qq=window.location.host+":8000"+this.Check[0].FullPath;
				 qq="../../play.asp?f="+encodeURI(qq.split("\\").join('/'));
				window.open(qq);
			}
   }
   },
   finishFav(a){
     let some=[];
     for(let i=0; i<this.Check.length;i++){
            //  some[i].ItemName=this.Check[i].ItemName;
            //  some[i].ItemType=this.Check[i].ItemType;
             some.push({
                ItemName: this.Check[i].ItemName,
                ItemType: this.Check[i].ItemType,
                FullPath: this.Check[i].FullPath,
             })
     };
  $.send('Favorite',{q:"create",Items: some,Folder:this.$store.state.login.path,Fav_lable:[a.lableName]},this);
   },
   sharefor(){

         if(this.Check == null || this.Check.length==0){
                          this.$message({
                          type: 'info',
                          message: '选择需要分享的内容'
          }); 
                      }
                      else{
     let somes=[];
     for(let i=0; i<this.Check.length;i++){
            //  some[i].ItemName=this.Check[i].ItemName;
            //  some[i].ItemType=this.Check[i].ItemType;
             somes.push({
                shareName: this.Check[i].ItemName,
                sharePath: this.Check[i].FullPath,

             })
     };
                  $.send('ShareFile',{q:"addShare", shareInfos:somes},this);      
                      }
   },
   ShareFile_cb(state,commit,data){
  
     if(data.status=="分享成功"){
             this.$message({
                          type: 'info',
                          message: '分享成功！'  }); 
      }
   },
   newColle(){
     $.send('Favorite',{q:"create",Folder:this.$store.state.login.path,Fav_lable:[this.colleces]},this);
     this.dialogVisible4 = false;
   },
   Favorite_cb(state,commit,data){
      switch(data.q){
            case 'select':
           this.tableData1=data.pathAll;
                 break;
            case 'create':
            if(data.message=="create file"){
                          this.$message({
                          type: 'info',
                          message: '收藏完成,请在我的收藏中查看'
          }); 
          this.dialogVisible3=false;
            };
            $.send('Favorite',{q:"select",Folder:this.$store.state.login.path},this);
            break;
      }
  
   },
	refre(){
 $.send('List',{Folder:this.$store.state.login.path},this);
  },
     newone(){
        $.send('CreateFolder',{Path:this.$store.state.login.path},this);
     },
     CreateFolder_err(state,commit,data){
      alert(data.Status);
     },
     CreateFolder_cb(state,commit,data){
         $.send('List',{Folder:this.$store.state.login.path},this);
     },
    delet(){
                      if(this.Check == null || this.Check.length==0){
                          this.$message({
                          type: 'info',
                          message: '请选择需要删除的内容'
          }); 
                      }
                      else{
                        this.dialogVisible2=true;
                      }
   },
   suredelet(){
    this.dialogVisible2=false;
         $.send('Favorite',{q:"delPath",Items:this.Check,Fav_lable:null},this);
        $.send('Delete',{Folder:this.$store.state.login.path,Items:this.Check},this);
        $.send('List',{Folder:this.$store.state.login.path},this);
   },
   Delete_cb(state,commit,data){
        $.send('List',{Folder:this.$store.state.login.path},this);
   },
   Delete_err(state,commit,data){
          alert(data.Status);
   },
   shownot(){
     this.form.name=this.Check[0].ItemName;
           if(this.Check == null || this.Check.length==0){
                          this.$message({
                          type: 'info',
                          message: '请选择重命名对象'
          }); 
    }
                      else{
             this.dialogFormVisible = true
                      }
   },
   rename(){
         this.dialogFormVisible = false;
          $.send('Favorite',{q:"update_file",Items:this.Check,NewLableName:this.form.name},this);
        $.send('Rename',{Folder:this.$store.state.login.path,Item:this.Check[0],NewName:this.form.name},this);                  
   },
   Rename_err(state,commit,data){
       alert(data.Status);
   },
   Rename_cb(state,commit,data){
        $.send('List',{Folder:this.$store.state.login.path},this);
   },
   copy(){
     console.log("data");
       this.mites=this.Check;
       for(let i=0;i<this.mites.length;i++){
           this.mitesName.push(this.mites[i].ItemName)
       };
    //    console.log(this.mitesName);
       if(this.mites.length>0){
           this.count=false;
       }
   },
   paste(){
     console.log(this.message);
    for(let i=0; i<this.mitesName.length;i++){//重名文件的替换
        if(this.message.length==0){$.send('Paste',{IsCut:false,Folder:this.mites[0].ParentPath,Items:this.mites,Target:this.$store.state.login.path},this);}
        for( let j=0; j<this.message.length; j++){
                if(this.mitesName[i]==this.message[j].ItemName){
                this.dialogVisible = true;
        }
        else{
        $.send('Paste',{IsCut:false,Folder:this.mites[0].ParentPath,Items:this.mites,Target:this.$store.state.login.path},this);
        }  }   } },
   repaste(){
       this.dialogVisible = false;
       $.send('Paste',{IsCut:false,Folder:this.mites[0].ParentPath,Items:this.mites,Target:this.$store.state.login.path},this);
   },
    Paste_cb(){
            $.send('List',{Folder:this.$store.state.login.path},this);
            this.count=true;
  },
  Getid(){
    if(this.Check == null || this.Check.length==0){
      alert("请选择下载内容");
    }
    else{
      console.log(this.Check);
          $.send("DownloadWeb",{Folder:this.Check[0].ParentPath,Name:this.Check[0].ItemName},this);
    }  
          },
  favorite(){
        if(this.Check == null || this.Check.length==0){
                          this.$message({
                          type: 'info',
                          message: '请选择需要收藏的内容'
          }); 
                      }
       else{
                       $.send('Favorite',{q:"create",Folder:this.$store.state.login.path,Fav_lable:["我的收藏"]},this);
                        this.dialogVisible3=true;
                      }
    },
        DownloadWeb_err(state,commit,data){
             alert(data.Status);
         }, 
        DownloadWeb_cb(state,commit,data){
           window.open("http://172.16.2.55/docmanager/www/download.ashx?fileID="+data.fileID);
            },
    List_cb(state,commit,data){
              this.news.push(data.Items);
              this.$emit('loginmenu',data.Items);
      },
 },
  computed: {
      pasteDisable(){
              return this.count;
   },
 },
 		components: {
		    upload,
        grant,
        group,
        group1,
        search,
        concern
}
    }
</script>


