<template>
  <div>
    <el-button size="medium" type="success" icon="document" @click="showusermanage">授权</el-button>
    <el-dialog top='10%' size="80%" title="用户授权" :visible.sync="dialogFormVisible" width="850px">
  <el-row :gutter="20" class="row">
      <el-col span="6"><span>授权目录</span></el-col>
      <el-col span="18"><el-input type="textarea" rows="2" v-model=this.$store.state.login.path ></el-input></el-col>
  </el-row>
  <el-row :gutter="20" class="row">
      <el-col span="6"><span>授权对象</span></el-col>
      <el-col span="18">
          <el-radio class="radio" v-model="radio" label="U">用户</el-radio>
          <el-radio class="radio" v-model="radio" label="G">组</el-radio>
     </el-col>
  </el-row>
  <el-row :gutter="20" class="row">
      <el-col span="6"><span>用户(组)名</span></el-col>
      <el-col span="13"><el-input type="textarea" rows="5" v-model="sel" ></el-input></el-col>
      <el-col span="5">
          <el-button class="button1" @click="open_group">选择.......</el-button>
          <el-button @click="findHer">自动找人</el-button>
          <el-button @click="rePwd">重置密码</el-button>
      </el-col>
  </el-row>
   <el-row :gutter="20" class="row">
       <div class="checkGroup">
           <el-row >
               <el-col span="4">
            <el-radio class="radio1" v-model="radio1" label="1">允许</el-radio>
               </el-col>
               <el-col span="20">
            <el-radio class="radio1" v-model="radio1" label="0">拒绝</el-radio>
               </el-col>
           </el-row>
           <el-row>
           <div style="margin: 20px 0;"></div>
           <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
           <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
           </el-checkbox-group>
           </el-row>
           <el-row>
                <div style="margin: 25px 0;"></div>
                <el-col span="5">
               <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                </el-col>
                <el-col span="5" offset='9'>
                <el-button type="info" size="small" @click="grant">授权</el-button>
                </el-col>
                <el-col span="5">
                    <el-button type="danger" size="small"  @click="cleanGrant">清除全部授权</el-button>
                </el-col>
           </el-row>
       </div>
  </el-row>
  <el-row :gutter="20" class="row">
      <div style="margin-left: 30px;">
      <el-button type="info" @click="myGrant" >查询本人权限</el-button>
      <el-button type="info" @click="otherGrant">查询用户(组)权限</el-button>
      <el-button type="info" @click="pasGrant">查询目录权限</el-button>
     </div>
  </el-row>
<el-row :gutter="20">
    <div style="margin: 25px 0;"></div>
    <el-input type="textarea" rows="8" v-model="grants"></el-input>
</el-row>
    </el-dialog>
  </div>
</template>
<script>
import Bus from '../Bus.js';
const cityOptions = ['列举', '创建文件夹', '上传文件', '下载文件','粘贴','删除','改名','授权'];
       export default {
              created() {
       Bus.$on('mss', data => {
         this.sel=data[0];
       });
       Bus.$on('mss1', data => {
         this.sel=data[0];
       });
       },
       data() {
       return {
           grants:[],
           sel:'',
           checkAll: true,
           checkedCities: [],
           cities: cityOptions,
           isIndeterminate: true,
           radio: 'U',
           radio1:'1',
           dialogFormVisible: false,
           activeName:'first',
       }
       },
       methods:{
           pasGrant(){
                   let query={};
               query.q = "Path";
               query.para=this.$store.state.login.path;
               $.send("Query",query,this); 

           },
           otherGrant(){
                let query={};
               query.q = "Group";
               query.para=this.sel;
               $.send("Query",query,this); 

           },
           myGrant(){
                 let query={};
               query.q = "User";
               query.para=this.$store.state.login.uid;
               $.send("Query",query,this); 
           },
           cleanGrant(){
                      let query={};
               query.q = "ClearGrant";
               query.para=this.$store.state.login.path;
               $.send("Query",query,this); 

           },
           Query_err(state,commit,data){
                      alert(data.errMsg);
           },
           grant(){
             let j=0;
             for(let i=0; i<this.checkedCities.length;i++){
                 if(this.checkedCities[i]=="列举"){
                     j=j+1;
                 };
                 if(this.checkedCities[i]=="创建文件夹"){
                     j=j+2;
                 };
                 if(this.checkedCities[i]=="上传文件"){
                     j=j+16;
                 };
                 if(this.checkedCities[i]=="下载文件"){
                     j=j+32;
                 };
                 if(this.checkedCities[i]=="粘贴"){
                     j=j+64;
                 };
                  if(this.checkedCities[i]=="删除"){
                     j=j+4;
                 };
                  if(this.checkedCities[i]=="改名"){
                     j=j+8;
                 };
                  if(this.checkedCities[i]=="授权"){
                     j=j+128;
                 };
             };
             $.send('Grant',{Folder:this.$store.state.login.path,type: this.radio,UGName:this.sel,r:j,allow:this.radio1},this);
           },
           Grant_cb(state,commit,data){
                       if(data.OK== true){
                          this.$message({
                          type: 'info',
                          message: '授权成功'
          }); 
                      }
                      else{
                          this.$message({
                          type: 'info',
                          message: data.errMsg
          }); 
                      }
           },
           findHer(){
           let ss=this.$store.state.login.path.split("\\")[this.$store.state.login.path.split("\\").length-2];
           console.log(ss);
               let query={};
               query.q = "FindUser";
               query.para=ss;
               $.send("Query",query,this); 
           },
           rePwd(){
               if(this.sel == []){
                          this.$message({
                          type: 'info',
                          message: '请选择重置密码对象'
          }); 
               }
               else{
               let query={};
               query.q = "ResetPwd";
               query.para=JSON.stringify(this.sel);
               $.send("Query",query,this); 
           }
           },
           Query_cb(state,commit,data){
               console.log(data);
               switch(data.q){
            case 'User':
                 this.grants=data.a;
                 break;
            case 'Path':
                 this.grants=data.a;
                 break;
            case 'FindUser':
                 this.sel=data.a;
                 break;
            case 'Group':
                 this.grants=data.a;
                 break;
            case 'ResetPwd':
                          this.$message({
                          type: 'info',
                          message: data.a
          }); 
                  break;
            case 'ClearGrant':
                          this.$message({
                          type: 'info',
                          message: data.a
          }); 
                  break;
              };
           },
             open_group(){
                 if(this.radio == 'U'){
             Bus.$emit('qwer',this.radio);
                 };
                 if( this.radio == 'G'){
             Bus.$emit('qwer1',this.radio);
                 }
           },
           submit(){
             this.dialogFormVisible = false
           },
           showusermanage(){
             this.dialogFormVisible=true
           },
     handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
       },
       }
       
</script>
<style lang="scss" scoped>
.row{
    margin-top: 30px;
}
.button1{
 margin-left: 10px;
}
.checkGroup{
 width: 700px;
 height: 120px;
 border:2px solid #f0f0f0;
 margin-left: 30px;
}
</style>