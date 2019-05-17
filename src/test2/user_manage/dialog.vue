<template>
<div>
      <el-dialog :modal=false size="35%" :title='title' :visible.sync="changeview" @close='close'>
        <el-row v-for='(i,j) in quantity' style="margin-bottom:10px">
            <el-col :span='4'>{{i}}:</el-col>
            <el-col :span='20'><el-input :disabled='isdisabled' v-model="inputdata[j]"></el-input></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">{{btn}}</el-button>
        </span>
      </el-dialog>
</div>
</template>
<script>
import Bus from '../Bus.js';
export default {
      created() {
           Bus.$on('manager_open', data => {
             
             this.stuortc = data[3];
               this.mymethod(data);
               if(data[0]=='Create'){
                 this.title='添加'+data[1][0];
                 this.inputdata[0]='';
                 this.quantity=data[1];
                 this.changeview=true;
                 this.btn='添加';
               }
               if(data[0]=='Delete'){
                 if(this.inputdata[0]==''){
                   this.$message({
                     message: '请选择一项',
                     type: 'warning'
                   });
                   this.inputdata=[];
                 }
                 else{
                   this.title='删除'+data[1][0];
                   this.quantity=data[1];
                   this.isdisabled=true;
                   this.changeview=true;
                   this.btn='删除';
                 }
               }
               
               if(data[0]=='Modify'){
                 if(this.inputdata[0]==''){
                   this.$message({
                     message: '请选择一项',
                     type: 'warning'
                   });
                   this.inputdata=[];
                 }
                 else{
                   this.title='修改'+data[1][0];
                   this.quantity=data[1];
                   console.log(data);
                   this.changeview=true;
                   this.btn='修改';
                 }
               }
               if(data[0]=='Reset'){
                 if(this.inputdata[1]==''){
                   this.$message({
                     message: '请选择一项',
                     type: 'warning'
                   });
                   this.inputdata=[];
                 }
                 else{
                 if(data[2].length==5)  
                 this.title='重置学生密码';
                 if(data[2].length==7)  
                 this.title='重置教师密码';
                 this.btn='重置';
                 this.isdisabled=true;
                 this.quantity=data[1];
                 this.changeview=true;
                 }
               }
       });
       },
        data(){
			return {
                changeview:false,
                title:'',
                stuortc:'',
                quantity:[],
                inputdata:[],
                isdisabled:false,
                btn:'确定',
                oldID:[]
            }

		},
		methods: {
           mymethod(data){
            //  console.log(data);
             let compare=[[0,'院系'],[1,'专业'],[2,'年级'],[3,'班级'],[4,'学生'],[5,'部门'],[6,'教师']];
             for(let i=0;i<data[1].length;i++){
               for(let j=0;j<compare.length;j++){
                  if(data[1][i]==compare[j][1]){
                    this.inputdata.push(data[2][j]);
                    this.oldID.push(data[2][j]);
                  }
               }
             }
           },
           submit(){
               let array=this.title.split("");
               let operation=array[0]+array[1],obj=array[2]+array[3];
               let compare1={添加:'A',删除:'D',修改:'U',重置:'R',院系:'Dep',专业:'Maj',班级:'Cls',学生:'Stu',部门:'Dep2',教师:'Tch'};
               operation=compare1[operation];
               obj=compare1[obj];
               operation=operation+'_'+obj;
               if(this.stuortc== "stu3"){
               Bus.$emit('ADURstu',[operation,this.inputdata,this.oldID[0]]);
               }
               else{
               Bus.$emit('ADUR',[operation,this.inputdata,this.oldID[0]]);
               };
               this.changeview = false;
               this.isdisabled = false;
               this.btn='确定';
               this.inputdata=[];
           },
           close(){
               this.changeview = false;
               this.isdisabled = false;
               this.btn='确定';
               this.inputdata=[];
               this.oldID=[];
           },
		},
       }
</script>