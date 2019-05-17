<template>
  <el-dialog :modal=false top='10%' size="65%" title="选择组" :visible.sync="dialogFormVisible" width="1000px">
    <el-row :span='24'  >
      <el-col :span='17'>
        <el-tabs v-model="activeName"  type="card">
          <el-tab-pane label="选择学生用户（组）" name="first"><stumanage></stumanage></el-tab-pane>
          <el-tab-pane label="选择教师用户（组）" name="second"><tcmanage></tcmanage></el-tab-pane>
          <el-tab-pane label="查询" name="third"><groupselect></groupselect></el-tab-pane>
        </el-tabs>
      </el-col>
    <el-col :span='7' class="authority">
      <el-col class="head">被授权用户：{{manageID}}</el-col>
      <el-col class="top_btn"><el-button type="success" @click='authority'>授权该用户管理以下组</el-button></el-col>
      <el-col class="title">已选择的组</el-col>
      <el-col class="title">
        <select size multiple class="select" v-model='selecteddata'>
          <option class="option" v-for='i in selectdata' v-bind:value='i'>{{i}}</option>
        </select>
      </el-col>
      <el-col class="bottom_btn">
        <el-col :span='12'><el-button @click='deletedata'>删除</el-button></el-col>
        <el-col :span='12'><el-button @click='emptydata'>清空</el-button></el-col>
      </el-col>
    </el-col>

  </el-row>
</el-dialog>
    
</template>
<script>
import Bus from '../../Bus.js';
import stumanage from './stu_manage.vue';
import tcmanage from './tc_manage.vue';
import groupselect from './select.vue';
       export default {
       created() {
       Bus.$on('open_group', data => {
         this.dialogFormVisible=true;
         this.manageID=data;
         this.selectdata=[];
       });
       Bus.$on('choosedata', data => {//对比选中的数据和原有的数据，相同的跳过，不同的追加进去
         for(let i=0,m=1,array=this.selectdata;i<data.length;i++){
           if(!array[0]){this.selectdata=data;break;}
           for(let j=0;j<array.length;j++){
             if(data[i]==array[j]){m=0;break;}
           }
           if(m==1) this.selectdata.push(data[i]);m=1;
         }
       });
       },
       data() {
       return {
        dialogFormVisible: false,
        activeName:'first',
        manageID:'',
        selectdata:[],
        selecteddata:[],
       }
       },
       methods:{
           submit(){
             this.dialogFormVisible = false
           },
           mymethod(){
             let array=this.manageID.split(",");
             return array[0];
           },
           deletedata(){
             for(let i=0,a=this.selecteddata;i<a.length;i++){
               for(let j=0,b=this.selectdata;j<b.length;j++){
                  if(a[i]==b[j]){
                    this.selectdata.splice(j,1);
                    break;
                  }
               }
             }
           },
           emptydata(){
             this.selectdata=[];
           },
           authority(){
             let usergrant={};
             usergrant.type='A';
             usergrant.userID=this.mymethod();
             usergrant.groupIDs=this.selectdata;
             $.send("UserGrant",usergrant,this);
           },
           UserGrant_err(state,commit,data){
             alert(data.Status);
           },
           UserGrant_cb(state,commit,data){
              if(data.OK == true){
                             this.$message({
                          type: 'info',
                          message: '授权成功！'
          }); 
              }
           }
       },
       components: {
           stumanage,
           tcmanage,
           groupselect,
       },
       }
       
</script>
<style scoped lang="scss">
  .authority{
      .head{
         text-align: center;
      }
      .top_btn{
         text-align: center;
      }
      .title{
         margin-top: 10px;
         text-align: center;
         font-size: 20px;
         color:blue;
      }
      .select{
          text-align: center;
          width: 70%;
          height: 200px;
          .option{text-align: left}
      }
      .bottom_btn{
          text-align: center;
      }
  }
</style>