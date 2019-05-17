<template>
  <div>
   <el-button type="text" @click="showConcern" class="hidden-md-and-down">我的关注</el-button>
    <el-button type="text" @click="showConcern" class="hidden-lg-and-up"><i class="el-icon-star-on"></i></el-button>
    <el-dialog title="我的关注" :visible.sync="dialogFormVisible1">
  
            <div class="Concern">
                 <el-col v-for="i in files" >
                  
                    <el-button type="text" size="small" style="float:right;margin-right:20px;" @click="deletConcern(i)">不再关注</el-button>
                   <el-button type="text" size="small" style="float:right;margin-right:10px;" @click="jumpTOshare(i)">查看他(她)的分享</el-button>
                  
                   <div style="margin-left:10px; margin-top:20px;"><span>姓名：{{i.userRealName}} </span> </div>
                   
                   <div style="margin-left:10px; margin-top:20px;"><span>学号：{{i.userName}}，备注：{{i.note}}</span> </div>
                   <div style=" margin:10px auto;width:90%;height:1px;background-color:#97CBFF;overflow:hidden;margin-top: 15px;"></div>
                 </el-col>
               </div>
    </el-dialog>
    <el-dialog title="我的分享" :visible.sync="myshare">
               <div class="ShareS">
                 <el-col v-for="i in shareFiles" >
                   <div style="text-align: center; margin-top:20px;"><span>{{i.shareTime}}</span></div>
                   <el-button type="text" size="small" style="float:right;margin-right:10px;" @click="jumpTOpath(i)">查看</el-button>
                  
                   <div style="margin-left:10px; margin-top:20px;"><span>{{i.shareName}}</span>
<el-tag
  :key="tag"
  v-for="tag in i.labelName"
  :disable-transitions="false"

  @close="handleClose(tag,i.shareMark)">
  {{tag}}
</el-tag>
                   </div>
                   <div style=" margin:10px auto;width:90%;height:1px;background-color:#97CBFF;overflow:hidden;margin-top: 15px;"></div>
                 </el-col>
               </div>
</el-dialog>
  </div>
</template>
<script>
import Bus from '../Bus.js';
       export default {
       data() {
       return {
           dialogFormVisible1:false,
           files:[],
           shareFiles:[],
           myshare:false,
      
       }
       },
      methods: {
          showConcern(){
              this.dialogFormVisible1=true;
              $.send('myConcern',{},this); 
          },
          myConcern_cb(state,commit,data){
              console.log(data);
              this.files=[];
              this.files=data.myConcernInfo

          },
          deletConcern(a){
               $.send('deleteConcern',{userName:a.userName},this); 
               
          },
          deleteConcern_cb(state,commit,data){
              $.send('myConcern',{},this);


          },
          jumpTOshare(a){
               $.send('ShareFile',{q:"selectShare",userName:a.userName},this);
          },
                jumpTOpath(a){
             Bus.$emit('sendpath',[a.sharePath,true]);
            let myarray=[],myarray1=a.sharePath,myarray2=true;
                myarray.push(myarray1,myarray2);
                // console.log(myarray);
            this.$store.commit("setPath",myarray);
            $.send('List',{Folder:a.sharePath,listMenu:false},this);
           this.myshare=false;
           this.dialogFormVisible1=false;
          },
             List_cb(state,commit,data){
         
                  Bus.$emit('refres',data.Items); },
          ShareFile_cb(state,commit,data){
              console.log(data);
               this.myshare=true;
               this.shareFiles=data.shareFileInfos;

          },
 
 
      }
       }
       
</script>
<style>
.Concern{height:440px; border: 1px solid black; overflow-y: scroll;}
.ShareS{height:440px; border: 1px solid black; overflow-y: scroll;}
</style>
