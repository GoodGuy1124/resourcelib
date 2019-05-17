<template>
<div>
<el-row :span="24" class="container">
  <el-col :span="16">

    <el-row :gutter="20" :span="24">

      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="18" class="name">1.学院（系）</el-col>
            <el-col :span="6" class="btn">
              <el-button type='text' size="small" @click="choose(1)">选定组</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000 multiple class="select" v-model='selectdata.select1'>
               <option v-for='i in schooltable' v-bind:value='i' @click="schoolclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="20" class="name">3.年级</el-col>
            <el-col :span="4" class="btn">
              <el-button type='text' size="small" @click='test'>刷新</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000 class="select">
               <option v-for='i in gradetable' @click="gradeclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>

    </el-row>
    <el-row :gutter="20" :span="24">

      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="18" class="name">2.专业</el-col>
            <el-col :span="6" class="btn">
              <el-button type='text' size="small" @click="choose(2)">选定组</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000 multiple class="select" v-model='selectdata.select2'>
               <option v-for='i in major' v-bind:value='i' @click="majorclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="18" class="name">4.教学班</el-col>
            <el-col :span="6" class="btn">
              <el-button type='text' size="small" @click="choose(3)">选定组</el-button>
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000 multiple class="select" v-model='selectdata.select3'>
               <option v-for='i in class1' v-bind:value='i' @click="class11">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>

    </el-row>
  </el-col>
  <el-col :span="8">
      <el-col :span="12" class="boxcard1">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="24" class="name">5.学生</el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size multiple class="select">
               <option v-for='i in stu'>{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>
  </el-col>
</el-row>
</div>
</template>
<script>
import Bus from '../../Bus.js';
export default {
       created(){
            this.schoolselect();
            this.gradeselect();
       },
        data(){
			return {
                selectdata:{select1:[],select2:[],select3:[]},
                schooltable: [],
                gradetable: [],
                major:[],
                class1:[],
                stu:[],
                node:['','','','',''],
             }
		},
		methods: {
      test(){
        
      },
      choose(i){
        Bus.$emit('choosedata',eval('this.selectdata.select'+i));
      },
      open(obj){
        // Bus.$emit('manage_open',[obj,this.node])
      },
      schoolselect(){
        let query={};
        query.q = "Select";
        query.para=JSON.stringify(["S", "1", null]);
        $.send("Query",query,this);
      },
      gradeselect(){
        let query={};
        query.q = "Select";
        query.para=JSON.stringify(["S", "0", null]);
        $.send("Query",query,this);
      },
      mymethod1(node,count){
        let length=this.node.length;
        for(let i=0;i<length;i++){
          if(i==count){this.node[i]=node.target.label;}
          if(i!=2&&i>count){this.node[i]=''}
        }
      },
      schoolclick(node){
        this.mymethod1(node,0);
        this.major=[];this.class1=[];this.stu=[];
        let query={};
        query.q = "Select";
        query.para=JSON.stringify(["S", "2", node.target.label]);
       $.send("Query",query,this);
      },
      majorclick(node){
        this.mymethod1(node,1)
        this.class1=[];this.stu=[];
        this.majorNode = node.target.label;
        // console.log(this.majorNode);
        if(this.node[2]!== ''){
            let query={};
            query.q = "Select";
            query.para=JSON.stringify(["S", "3",node.target.label,this.node[2]]);
            $.send("Query",query,this); 
         }
      },
      gradeclick(node){
        this.mymethod1(node,2);
        this.class1=[];this.stu=[];
           if(this.node[1] !== ''){
             let query={};
        query.q = "Select";
        query.para=JSON.stringify(["S", "3",this.node[1],node.target.label]);
       $.send("Query",query,this);
           }
      },
      class11(node){
         this.mymethod1(node,3);
         this.stu=[];
         let query={};
         query.q = "Select";
         query.para=JSON.stringify(["S", "4",node.target.label]);
         $.send("Query",query,this); 
      },
      Query_cb(state,commit,data){
        let school=JSON.parse(data.a);
              switch(school[1]){
            case '0':
                    this.gradetable = [];
                for(let i=0; i<school.length;i++){
                if(i==0 || i==1){ continue;}
                this.gradetable.push(school[i]);}
                break;
            case '1':
                   this.schooltable = [];
                for(let i=0; i<school.length;i++){
                if(i==0 || i==1){ continue;}
                this.schooltable.push(school[i]);};
                    break;
            case '2':
                  this.major = [];
                for(let i=0; i<school.length;i++){
                if(i==0 || i==1){ continue;}
                this.major.push(school[i]);};
                    break;
            case '3':
                  this.class1 = [];
                for(let i=0; i<school.length;i++){
                if(i==0 || i==1){ continue;}
                this.class1.push(school[i]);};
                    break;
            case '4':
                  this.stu = [];
                for(let i=0; i<school.length;i++){
                if(i==0 || i==1){ continue;}
                this.stu.push(school[i]);};
                    break;
         }
         }
	},
       }
</script>
<style scoped lang="scss">
  
     .container{
         .boxcard {
            width: 215px;
            height: 180px;
            margin-bottom:20px;
            overflow: hidden;
            .head{
            line-height: 25px;
            .name{
                font-weight:bold;
                font-size: 13px;
                color: #000000;
                height: 15px;
                
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
                width: 195px;
                height: 150px;
                .select{
                    width: 183px;
                    height: 150px;
                }
             }
          }
          .boxcard1 {
            width: 200px;
            height: 360px;
            margin-bottom:20px;
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
                width: 200px;
                height: 350px;
                .select{
                    width: 200px;
                    height: 350px;
                }
             }
          }
      }
</style>
