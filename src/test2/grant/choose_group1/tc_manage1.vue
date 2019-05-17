<template>
<el-row :span="24" :gutter="20" class="container">
  <el-col :span="8" class="boxcard">
     <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col :span="19" class="name">1.部门</el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000 multiple class="select" >
               <option v-for='i in department'  @click="departmentclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
  </el-col>
  <el-col :span="8" class="boxcard">
     <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col :span="19" class="name">2.教职工</el-col>
            <el-col :span="5" class="btn">
              <el-button type='text' size="small" @click="choose">选定用户</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000 multiple class="select" v-model='selectdata'>
               <option v-for='i in teachers' v-bind:value='i' @click="teachersclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
  </el-col>
  
</el-row>
</template>
<script>
import Bus from '../../Bus.js';
export default {
       created(){
        let query={};
        query.q = "Select";; 
        query.para=JSON.stringify(["T", "1", null]);
        $.send("Query",query,this); 
       },
		data() {
			return { 
        class1:[],
        stu:[],
        department:[],
        teachers:[],
        power:[],
        node:['','','','','','',''],
        selectdata:[],
			    	}
		    	},
		methods: {
      choose(){
        Bus.$emit('choosedata1',this.selectdata);
      },
      mymethod1(node,count){
        let length=this.node.length;
        for(let i=4;i<length;i++){
          if(i==count){this.node[i]=node.target.label;}
          if(i!=2&&i>count){this.node[i]=''}
        }
      },
      teachersclick(node){
        this.mymethod1(node,6);
        let query={};
        query.q = "Select";
        query.para=JSON.stringify(["T", "3", node.target.label]);
        $.send("Query",query,this); 
      },
      departmentclick(node){
        this.mymethod1(node,5);
        let query={};
        query.q = "Select";
        query.para=JSON.stringify(["T", "2", node.target.label]);
        $.send("Query",query,this); 
        },
      Query_cb(state,commit,data){
        let school=JSON.parse(data.a);
               switch(school[1]){
           case '1':
               this.department = [];
               for(let i=0; i<school.length;i++){
               if(i==0 || i==1 || i==2){continue;}
               this.department.push(school[i]);};
               break;
           case '2':
               this.teachers = [];
               for(let i=0; i<school.length;i++){
               if(i==0 || i==1){continue;}
               this.teachers.push(school[i]);};
               break;
           case '3':
               this.power = [];
               for(let i=0; i<school.length;i++){
               if(i==0 || i==1){continue;}
               this.power.push(school[i]);};
               break;
               }
      }
	},

}
</script>
<style scoped lang="scss">
  
     .container{
         .boxcard {
            width: 275px;
            height: 380px;
            margin-bottom:20px;
            overflow: hidden;
            .head{
            line-height: 25px;
            .name{
                font-size: 13px;
                color: #000000;
                height: 15px;
                font-weight:bold;
            }
            .btn{
                
                height: 15px;
             }
            }
            .line{
                position: relative;
                top:8px;
            }
            .main{
                width: 250px;
                height: 350px;
                .select{
                    width: 246px;
                    height: 350px;
                }
             }
          }
      }
</style>
