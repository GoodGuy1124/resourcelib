<template>
    <el-row>
        <el-col :span='12'>
            <el-col>
                <el-col :span='8' :push='1'>查找类型</el-col>
                <el-col :span='16' :pull='2'>
                    <el-select v-model="region" >
                    <el-option label="组" value="zu"></el-option>
                    <el-option label="用户" value="yonhu"></el-option>
                    </el-select>
                </el-col>
            </el-col>
           
            <el-col>
                 <div style="margin: 25px 0;"></div>
                <el-col :span='8' :push='1'>组名</el-col>
                <el-col :span='16' :pull='2'><el-input size='small' v-model='insert'></el-input></el-col>
            </el-col>
              <el-col>
                 <div style="margin: 25px 0;"></div>
                <el-col :span='8' :push='1'>用户</el-col>
                <el-col :span='16' :pull='2'><el-input size='small' v-model='insertUser'></el-input></el-col>
            </el-col>
            <el-col :push='17'>
                <div style="margin: 25px 0;"></div>
                <el-button size='small' @click='stratselect'>开始查找</el-button></el-col>
        </el-col>
        <el-col :span='12'>
            <el-col :push='2'>
                <select size multiple class="select"  v-model='selecteddata'>
                    <option class="option" v-for='i in selectdata' v-bind:value='i'>{{i}}</option>
                </select>
            </el-col>
            <el-col :push='14'><el-button size='small' @click='choose'>确认选择</el-button></el-col>
        </el-col>
    </el-row>
</template>
<script>
import Bus from '../../Bus.js';
       export default {
       created() {
       Bus.$on('p', data => {
       });
       },
       data() {
       return {
          insert:'',
          insertUser:'',
          region:'',
          selectdata:[],
          selecteddata:[],
       }
       },
       methods:{
           stratselect(){
             if(this.region == 'zu'){
                 let query={};
               query.q = "Search";; 
               query.para=JSON.stringify(["G",this.insert, null]);
               $.send("Query",query,this);
             };
                if(this.region == 'yonhu'){
                 let query={};
               query.q = "Search";; 
               query.para=JSON.stringify(["U",this.insertUser, null]);
               $.send("Query",query,this);
             };
               
           },
           choose(){
              Bus.$emit('choosedata2',this.selecteddata);
           },
           Query_cb(state,commit,data){
               this.selectdata=JSON.parse(data.a);
           }
       },
       }
       
</script>
<style scoped lang="scss">
  .select{
          text-align: center;
          width: 70%;
          height: 150px;
          .option{text-align: left}
      }
</style>