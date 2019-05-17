<template>
<div>
<el-row :span="24" class="container">
  <el-col :span="16">
    <el-row :gutter="20" :span="24">
      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="14" class="name">1.学院（系）</el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Create',['院系'])">添加</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Delete',['院系'])">删除</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Modify',['院系'])">修改</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000  class="select">
               <option v-for='i in schooltable' @click="schoolclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="17" class="name">3.年级</el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small">刷新</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" >测试</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000  class="select">
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
            <el-col  :span="14" class="name">2.专业</el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Create',['专业','院系'])">添加</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Delete',['专业','院系'])">删除</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Modify',['专业','院系'])">修改</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000  class="select">
               <option v-for='i in major' @click="majorclick">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="12" class="boxcard">
        <el-card :body-style="{ padding: '0px' }">
          <el-col class="head" :span="24">
            <el-col  :span="14" class="name">4.教学班</el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Create',['班级','专业','年级'])">添加</el-button>
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Delete',['班级','专业','年级'])">删除</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Modify',['班级','专业','年级'])">修改</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size=1000  class="select">
               <option v-for='i in class1' @click="class11">{{i}}</option>
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
            <el-col  :span="9" class="name">5.学生</el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Create',['学生','班级'])">添加</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Delete',['学生','班级'])">删除</el-button>    
            </el-col>
            <el-col :span="3" class="btn">
              <el-button type='text' size="small" @click="open('Modify',['学生','班级'])">修改</el-button>    
            </el-col>
            <el-col :span="6" class="btn">
              <el-button type='text' size="small" @click="open('Reset',['学生','班级'])">重置密码</el-button>    
            </el-col>
          </el-col>
          <hr class="line">
          <el-col  class="main" :span="24">
            <select size multiple class="select">
               <option v-for='i in stu' @click="student">{{i}}</option>
            </select>
          </el-col>
        </el-card>
      </el-col>
  </el-col>
</el-row>
</div>
</template>
<script>
import Bus from '../Bus.js';
export default {
       created(){
            this.schoolselect();
            this.gradeselect();
            Bus.$on('ADURstu',data => {
            
              let userman={};
              userman.op=data[0];
              if(data[2]){userman.oldID=data[2];}
              else userman.oldID=data[1][0];
              userman.ID=data[1][0];
              userman.pID=''
              if(data[1][1]){ userman.pID=data[1][1]; }
              data[1][1];
              userman.info='';
              if(data[1][2]){ userman.info=data[1][2];}
              console.log(userman);
              $.send("UserMan",userman,this);
            })
       },
        data(){
			return {
                schooltable: [],
                gradetable: [],
                major:[],
                class1:[],
                stu:[],
                nodes:['','','','',''],
                majorNode:'',
                gradeNode:'',
             }
		},
		methods: {
      UserMan_cb(state,commit,data){
        console.log(data);
        let aa =data.op.split("_");
        console.log(aa);
        console.log(this.nodes);
        if(data.flag==true){
              if(data.op=="A_Dep" || data.op=="A_Maj" || data.op=="A_Cls" || data.op=="A_Stu")
              {
                          this.$message({
                          type: 'info',
                          message: '添加成功'
          }); 
              }
              else{
                   if(data.op=="D_Dep" || data.op=="D_Maj" || data.op=="D_Cls" || data.op=="D_Stu")
              {
                          this.$message({
                          type: 'info',
                          message: '删除成功'
          }); 
              }
              else{
                          if(data.op=="U_Dep" || data.op=="U_Maj" || data.op=="U_Cls" || data.op=="U_Stu")
              {
                          this.$message({
                          type: 'info',
                          message: '修改成功'
          }); 
              }
              else{
                          if(data.op=="R_Stu")
              {
                          this.$message({
                          type: 'info',
                          message: '重置成功'
          });  } }  } };
                  switch(aa[1]){
            case 'Dep':
                this.schoolselect();
                break;
            case 'Maj':
            let query={};
                query.q = "Select";
                query.para=JSON.stringify(["S", "2", this.nodes[0]]);
                $.send("Query",query,this);
                break;
            case 'Cls':
            let query1={};
                  query1.q = "Select";
                  query1.para=JSON.stringify(["S", "3",this.nodes[1],this.nodes[2]]);
                  $.send("Query",query1,this);
                break;
             case 'Stu':
            let query2={};
                  query2.q = "Select";
                  query2.para=JSON.stringify(["S", "4",this.nodes[3]]);
                  $.send("Query",query2,this);
                break;
         }
        
       }
         },
      open(obj1,obj2){
      let obj3= "stu3";
        Bus.$emit('manager_open',[obj1,obj2,this.nodes,obj3])
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
        let length=this.nodes.length;
        for(let i=0;i<length;i++){
          if(i==count){this.nodes[i]=node.target.label};
          if(i!=2&&i>count){this.nodes[i]=''}
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
        if(this.nodes[2]!== ''){
            let query={};
            query.q = "Select";
            query.para=JSON.stringify(["S", "3",node.target.label,this.nodes[2]]);
            $.send("Query",query,this); 
         }
      },
      gradeclick(node){
        this.mymethod1(node,2);
        this.class1=[];this.stu=[];
           if(this.nodes[1] !== ''){
             let query={};
        query.q = "Select";
        query.para=JSON.stringify(["S", "3",this.nodes[1],node.target.label]);
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
      student(node){
        this.mymethod1(node,4);
      },
      showusermanage(){
        this.dialogVisible = true;
        let query={};
        query.q = "Select";
        query.para=JSON.stringify(["S", "1", null]);
        $.send('Query',query,this); 
      },
      handleClick(tab, event){
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
            width: 270px;
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
                width: 250px;
                height: 150px;
                .select{
                    width: 240px;
                    height: 150px;
                }
             }
          }
          .boxcard1 {
            width: 265px;
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
                width: 265px;
                height: 350px;
                .select{
                    width: 265px;
                    height: 350px;
                }
             }
          }
      }
</style>
