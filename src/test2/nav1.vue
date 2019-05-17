<template>
<el-row class="parent">
  <el-col :span="2"><el-button  type="text" @click="parent"><i class="el-icon-caret-top"></i></el-button></el-col>
  <el-col :span="2"><el-button  type="text" @click="retreat"> <i class="el-icon-arrow-left"></i></el-button></el-col>
  <el-col :span="2"><el-button  type="text" @click="goforward"><i class="el-icon-arrow-right"></i></el-button></el-col>
  <el-col :span="18" >
     <el-breadcrumb class="breadcrumb-inner" separator=">">
          <el-breadcrumb-item ><el-button @click="root" type="text">根目录</el-button></el-breadcrumb-item>
		  <el-breadcrumb-item v-for="(i,j) in breaddata" >
              <el-button @click='jump(j)' type="text">{{i}}</el-button>
		  </el-breadcrumb-item>
     </el-breadcrumb>
  </el-col>
</el-row>
</template>
<script>
import Bus from './Bus.js'
       export default {
       created() {
       Bus.$on('sendpath', data => {//将当前目录分离成面包屑样式
           let array=[];
            for(let i=1,array1=[];i<data[0].length;i++){
                if(data[0][i]==="\\"){
                  let a=array1.join("");
                  array1=[];
                  array.push(a);
                }
                else{array1.push(data[0][i]);}
            }
            this.breaddata=array;
            if(data[1])
            this.count=2;
        });
       },
       data() {
          return {
             breaddata:[],//面包屑显示数据
             count:2,
          }
       },

       methods:{
           parent(){//向上一级
              this.jump(this.breaddata.length-2);
           },
           retreat(){//后退
              if(this.count<=this.$store.state.pathlist.length){
                //   console.log(this.back(this.count));
              let myarray=[],myarray1=this.back(this.count),myarray2=false;
              myarray.push(myarray1,myarray2);
              this.$store.commit("setPath",myarray);
              Bus.$emit('sendpath',myarray);
            //   console.log(this.back(this.count));
              $.send('List',{Folder:this.back(this.count),listMenu:false},this);
              this.count+=1;
              }
           },
           goforward(){//前进
              if(this.count>2){
              Bus.$emit('sendpath1',this.back(this.count-2));
              let myarray=[],myarray1=this.back(this.count-2),myarray2=false;
              myarray.push(myarray1,myarray2);
              this.$store.commit("setPath",myarray);
              Bus.$emit('sendpath',myarray);
            //   console.log(this.back(this.count-2));
              $.send('List',{Folder:this.back(this.count-2),listMenu:false},this);
              this.count-=1;
              }
           },
           root(){//跳转到根目录
               this.$store.commit("setPath",'\\');
               $.send('List',{Folder:'\\',listMenu:false},this);
               this.breaddata=[];
           },
           jump(count){//跳转到所点击的面包屑目录
               let array=[],a='\\';
               for(let i=0;i<=count;i++){
                   array.push(this.breaddata[i]);
                   a+=this.breaddata[i];
                   a+='\\';
               }
               this.breaddata=array;
               let myarray=[],myarray1=a,myarray2=true;
               myarray.push(myarray1,myarray2);
               this.$store.commit("setPath",myarray);
               $.send('List',{Folder:a,listMenu:false},this);
           },
       sortNumber(a,b){//排序函数
        
        if(a.HasChild==0){
          return 1;
        }
          else{
            return 0;
          }
      },
           List_cb(state,commit,data){//回调，刷新页面
               console.log(data);
             data.Items=data.Items.sort(this.sortNumber);
               Bus.$emit('refres',data.Items);
           },
           back(n){
               let list=this.$store.state.pathlist;
               return list[list.length-n];
           },
       },
       }
</script>
<style scoped lang="scss">
        
	    .parent{
        background: #F0F0F0;
        }
        
</style>
