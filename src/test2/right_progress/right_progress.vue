<template>
<div>
    <div class="uploadprogress">
         <span>上传任务</span>
        <el-row v-for="(li,i) in mission"  >
    <el-col><span >{{li.fileName}}</span></el-col>
    <el-col span="20"><el-progress :percentage="li.progress1"></el-progress></el-col>
    <el-col span="4"><span @click="deleteProgress(li.fileName)">x</span></el-col>
    </el-row>
    </div>
    <div class="outLink">
        <div class="centerLink">
            <el-row ><el-button @click="webKind" class="buttons">教学资源云平台Web版</el-button></el-row>
            <el-row ><el-button @click="xuniShi" class="buttons">虚拟实训室</el-button></el-row>
            <el-row ><el-button @click="far" class="buttons">远程辅导</el-button></el-row>
            <el-row ><el-button @click="muKe" class="buttons">慕课试验区</el-button></el-row>
            <el-row ><el-button @click="highSchool" class="buttons">高等职业教育教学资源中心</el-button></el-row>
            <el-row ><el-button @click="country" class="buttons">国家基础教育资源网</el-button></el-row>
        </div>
    </div>
</div>
</template>
<script>
import Bus from '../Bus'
  export default {
       created(){
            Bus.$on('refresProgress', data => { 
                      let aa=data[0];
                      let bb=data[1]; 
                      let cc=((bb/aa)*100)-(((bb/aa)*100)%1);  
                if(data[2] !== this.count)
                {
                    this.count=data[2];
                    if(this.mission.length==0){
                   this.mission.push({
                    fileName: data[2],
                    progress1: '0',              
                });
                    }
                    else{
                for(let i=0; i<this.mission.length; i++){
                           if( this.mission[i].fileName == data[2]){ break;}
                           else{
                   this.count=data[2];
                   this.mission.push({
                    fileName: data[2],
                    progress1: '0',              
                });
                break;
                           }
                }
                    };
                     if(cc==100){
                           this.count='';
                            for(let i=0; i<this.mission.length; i++){
                               
                           if( this.mission[i].fileName == data[2]){
                               this.mission[i].progress1=cc;
                               this.mission.splice(i,1);
                           }
                      };
                      };
                }
                else{  
            
                    let j=0;
                       for(let i=0; i<this.mission.length; i++){
                           if( this.mission[i].fileName == data[2]){
                               j++;
                             this.mission[i].progress1=cc;
                             if( this.mission[i].progress1 == 100){
                                 this.count='';
                                 if( this.mission[i].fileName == data[2]){
                                     this.mission[i].progress1=cc;
                                           this.mission.splice(i,1);
                                 }
                             }
                           }
                      };
                      if(j==0){
                             this.mission.push({
                    fileName: data[2],
                    progress1: '0',              
                });
                      };
                }; 
               });

        },
       data() {
      return {
         mission:[],
          count:'',
      };
    },
    methods: {
        country(){
              window.open("http://so.eduyun.cn/national/index");
        },
        highSchool(){
             window.open("http://www.cchve.com.cn/hep/plugin/gaozhi/index/index.jsp");
        },
        far(){
              window.open("http://vl.cqvie.edu.cn/Conf/jsp/main/mainAction.do?uid="+this.$store.state.login.uid);
        },
        muKe(){
              window.open("http://mooc.cqvie.edu.cn/default.ashx");
        },
        xuniShi(){
            
             window.open("http://172.16.2.55//jump.asp?a=url1&uid="+this.$store.state.login.uid);
        },
        webKind(){
            
          window.open("http://jx.cqvie.com/DocManager/www/");
        },
             deleteProgress(node){
     for(let i=0; i<this.mission.length; i++){
        if( this.mission[i].fileName == node){
            this.mission.splice(i,1);
                           }
                      };
           Bus.$emit('deleteProgress',node);
    }
   
    }
  }
</script>
<style scoped lang="scss">
.uploadprogress{
    height: 50%;
    top:0px;
    right: 0px;
    left:0px;
    overflow-y: scroll;
}
.outLink{
    margin-top: 50%;
    height: 50%;
    bottom:0px;
    right: 0px;
    left:0px;
    border-top: 2px solid #97CBFF;
}
.centerLink{
      margin: 5px auto;
      width: 80%;
      height: 90%;
}
.buttons{
    margin-top: 2px;
    width: 230px;
    height: 30px;
    background: #C4E1FF;
}
</style>
