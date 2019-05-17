<template>
<div>
   <el-button type="text" @click="openMyshare"  class="hidden-md-and-down">我的分享</el-button>
      <el-button type="text" @click="openMyshare"  class="hidden-lg-and-up"><i class="el-icon-share"></i></el-button>
   <el-dialog title="我的分享" :visible.sync="myshare">
               <div class="ShareS">
                 <el-col v-for="i in files" >
                   <div style="text-align: center; margin-top:20px;"><span >{{i.shareTime}}</span></div>
                     <el-button type="text" size="small" style="float:right;margin-right:20px;" @click="deletShare(i)">删除</el-button>
                   <el-button type="text" size="small" style="float:right;margin-right:10px;" @click="jumpTOpath(i)">查看</el-button>
                  
                   <div style="margin-left:10px; margin-top:20px;"><span>{{i.shareName}}</span>
<el-tag
  :key="tag"
  v-for="tag in i.labelName"
  closable
  :disable-transitions="false"
  @close="handleClose(tag,i.shareMark)">
  {{tag}}
</el-tag>
<el-button  class="button-new-tag" size="small" @click="showInput(i.shareMark)">+ New Tag</el-button>
                   </div>
                   <div style=" margin:10px auto;width:90%;height:1px;background-color:#97CBFF;overflow:hidden;margin-top: 15px;"></div>
                 </el-col>
               </div>
</el-dialog>
<el-dialog title="标签" :visible.sync="inputVisible" size="tiny">
      <el-input v-model="inputValue" placeholder="请输入标签内容" ></el-input>
  <div slot="footer" class="dialog-footer">
    <el-button @click="inputVisible = false">取 消</el-button>
    <el-button type="primary" @click="newTag">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import Bus from '../Bus.js';
       export default {
       data() {
       return {
             files:[],
             myshare: false,
             tableData2:[],
             dynamicTags: [],
             thisfile:'',
             inputVisible: false,
             inputValue: ''
       }
       },
        methods: {
          newTag(){
            if(this.inputValue==''){
                             this.$message({
                          type: 'info',
                          message: '请输入标签的内容'
          }); 
            }else{
                $.send('addLabel',{shareMark: this.thisfile,labelNames:[this.inputValue]},this);  
            }

          },
          addLabel_cb(state,commit,data){
            console.log(data);
           if(data.status=="添加标签成功！"){
             this.inputVisible=false;
              $.send('ShareFile',{q:"selectShare"},this); 
           }

          },
          deletShare(a){
             $.send('ShareFile',{q:"deleteShare",shareInfos:[{shareMark:a.shareMark}]},this);  
          },
               jumpTOpath(a){
             Bus.$emit('sendpath',[a.sharePath,true]);
            let myarray=[],myarray1=a.sharePath,myarray2=true;
                myarray.push(myarray1,myarray2);
                // console.log(myarray);
            this.$store.commit("setPath",myarray);
            $.send('List',{Folder:a.sharePath,listMenu:false},this);
           this.myshare=false;
           this.dialogVisible=false;
          },
             List_cb(state,commit,data){
                  Bus.$emit('refres',data.Items); },
         openMyshare(){
       $.send('ShareFile',{q:"selectShare"},this);  
       
     },
        ShareFile_cb(state,commit,data){
          console.log(data);
      switch(data.q){
            case 'selectShare':
           this.myshare=true;
           this.files=data.shareFileInfos;
                 break;
                   case 'deleteShare':
            $.send('ShareFile',{q:"selectShare"},this); 
                 break;
      }
   },
       handleClose(tag,b) {
           this.thisfile=b;
         $.send('delLabel',{shareMark: this.thisfile,labelNames:[tag]},this);  
      },
      delLabel_cb(state,commit,data){
         
              $.send('ShareFile',{q:"selectShare"},this); 
           

          },

      showInput(a) {
        
        this.thisfile=a;
        this.inputVisible = true;
   
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
        }
       }
</script>
<style>
.ShareS{height:440px; border: 1px solid black; overflow-y: scroll;}
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>