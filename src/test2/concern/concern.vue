<template>
<div>
<el-button type="info"  icon="share" @click="changeview= true" size="medium">关注</el-button>
<el-dialog title="查找关注":visible.sync="changeview" >
    <el-row>
   
        <el-col span="3"><span style="font-size:14px">关键字：</span></el-col>
        <el-col span="8">
           <el-autocomplete
  v-model="state4"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
  size="mini"
>
  <template slot-scope="props">
    <div class="name">姓名：{{ props.item.value }}</div>
    <span class="addr">学号：{{ props.item.nub }}</span>
  </template>
</el-autocomplete>
</el-col>
<el-col span="3"><span style="font-size:14px">备注：</span></el-col>
      <el-col span="6"> <el-input v-model="beizhu" placeholder="添加备注" size="mini" ></el-input></el-col>
        <el-col span="2"><el-button  @click="starSearch"  size="mini">关注</el-button></el-col>
       
    </el-row>
    <!--<el-row style="margin-top:30px">
      <el-table :data="tableData" border  @row-dblclick="gonext"  style="width:100%" >
    <el-table-column prop="name" label="文件名" ></el-table-column>
    <el-table-column prop="FullPath" label="文件路径" ></el-table-column>
  </el-table>
    </el-row>-->
</el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
          changeview:false,
        restaurants: [],
        state4: '',
        timeout:  null,
        dataUser:[],
        info:'',
        beizhu:'',
      };
    },
    methods: {
        starSearch(){
          console.log(this.info);
            if(this.info.concern==true){
                             this.$message({
                          type: 'info',
                          message: '你已经关注了该用户！'
          }); 

            }
            else{
                   if(this.info.length>1){
                               this.$message({
                          type: 'info',
                          message: '存在重名，请根据学号辨别！'
          }); 
            }else{
                  if(this.info[0].nub==null){
                               this.$message({
                          type: 'info',
                          message: '暂无此人！'
          }); 
            }else{
              
                if(this.beizhu==""){
                 
                      $.send('concernUser',{userName:this.info[0].nub,note:"无"},this); 
                }
                else{
                      $.send('concernUser',{userName:this.info[0].nub,note:this.beizhu},this); 
                }
                 
            }}
            }
        },
        concernUser_cb(state,commit,data){

          console.log(data);
            if(data.status=="关注成功!"){
                               this.$message({
                          type: 'info',
                          message: '关注成功！'
          }); 
            };
          

        },
 
             searchUser_cb(state,commit,data){
            console.log(data);
            this.dataUser=[];
               this.info=[];
            if(data.status=="搜索成功！"){
                for( let i =0; i<data.userInfo.length; i++){
             this.dataUser.push({
                    concern: data.userInfo[i].concern,
                    value: data.userInfo[i].userRealName ,
                    nub: data.userInfo[i].userName ,              
                });
                
                };

                 this.info=this.dataUser; 
                
                  };
                  if(data.status=="没有找到!"){
                    this.info.push({
                      nub: null, 

                    });
                  }

        },
      querySearchAsync(queryString, cb) {
          $.send('searchUser',{content:queryString},this); 
        
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
                var restaurants = this.dataUser;
                console.log( restaurants);
        var results = queryString ? restaurants : restaurants;
          cb(results);
           console.log("here");
        }, 3000 * Math.random());
      },
      // createStateFilter(queryString) {
      //   return (state) => {
      //     console.log("here1");
      //     return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      //   };
      // },
      handleSelect(item) {
        this.info=[];
        this.info.push({
                    concern: item.concern,
                    value: item.value ,
                    nub: item.nub ,              
                }); 
      }
    },
  
  };
</script>