<template>
  <div>
    <el-button type="text" @click="showfavorite" ><i class="el-icon-star-on"></i></el-button>
    <el-dialog top='20%' size="65%" title="我的收藏" :visible.sync="dialogFormVisible1">
      <span>双击收藏内容跳转到收藏内容目录</span>
      <el-popover ref="popover5" placement="top" width="160" :visible.sync="visible2">
        <el-col span="12"><el-button @click="reName" size="small">改名</el-button></el-col>
        <!--<el-col span="8"><el-button @click="sharefor" size="small">分享</el-button></el-col>-->
        <el-col span="12"> <el-button @click="deleteFav" size="small">删除</el-button></el-col>
</el-popover>
<el-button v-popover:popover5>操作</el-button>
  <el-button @click="goBack">返回</el-button>
       <el-table v-if="this.ss=='1'" class="usertable" :data="tableData" border style="width: 100%" 
      ref="multipleTable" @row-click="gonext"  @selection-change="handleSelectionChange" >
       <el-table-column type="selection" width="55">
    </el-table-column>
       <el-table-column  prop="lableName" label="收藏文件" width="300">
          </el-table-column>
       <el-table-column  prop="date" label="创建日期" width="200">
          </el-table-column>
       
      </el-table>
         <el-table v-else class="usertable" :data="tableData"  border style="width: 100%" 
      ref="multipleTable"  @row-click="gonext"  @selection-change="handleSelectionChange" >
       <el-table-column type="selection" width="55">
    </el-table-column>
          <el-table-column  prop="lableName" label="收藏夹" width="300">
          </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="修改收藏夹" :visible.sync="dialogVisible4" size="tiny">
      <el-input v-model="colleces" placeholder="请输入新收藏夹名" ></el-input>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible4 = false">取 消</el-button>
    <el-button type="primary" @click="sureReName">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import Bus from './Bus.js'
       export default {
       data() {
       return {
         ss: '',
         dialogVisible4:false,
         colleces:[],
         multipleSelection:[],
        deleteVisible:false,
        visible2: false,
        dialogFormVisible1: false,
         tableData: [],
         cont:[],
       }
       },
      methods: {
  //         sharefor(){
  //       if(this.multipleSelection[0].hasOwnProperty("lablePath") == true){
  //          this.colleces=this.multipleSelection[0].lableName;
  //           this.dialogVisible4=true;
  //        }
  //                     else{
  //                 $.send('ShareFile',{q:"selectQunName"},this);      
  //                     }
  //  },
        goBack(){
          $.send('Favorite',{q:"select",Folder:this.$store.state.login.path},this);
        },
         handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sureReName(){
      $.send('Favorite',{q:"update",Fav_lable:[this.multipleSelection[0].lableName],NewLableName:this.colleces},this);
      this.dialogVisible4 = false;
      },
        reName(){
         if(this.multipleSelection[0].hasOwnProperty("lablePath") == true){
           this.colleces=this.multipleSelection[0].lableName;
            this.dialogVisible4=true;
         }
         else{
                           this.$message({
                          type: 'info',
                          message: '只有收藏夹支持改名'
          }); 
         }
      },
        deleteFav(a){
              if(this.multipleSelection[0].hasOwnProperty("lablePath") == true){//删除收藏夹
           for(let i=0;i<this.multipleSelection.length;i++){
         $.send('Favorite',{q:"delete",Folder:this.$store.state.login.path,Fav_lable:[this.multipleSelection[i].lableName]},this);
          }
         }
         else{//删除收藏内容
           console.log(this.multipleSelection);
                let some=[];
             for(let i=0;i<this.multipleSelection.length;i++){
                some.push({
                ItemName: this.multipleSelection[i].lableName,
                FullPath: this.multipleSelection[i].path,
             })
          };
           $.send('Favorite',{q:"delete_file",Items:some,Folder:this.$store.state.login.path,Fav_lable:[this.cont]},this);
         }
        },
        gonext(a,event){
          if(event.target.nodeName!="INPUT"&&event.target.nodeName!="SPAN"){
          if(a.hasOwnProperty("lablePath") == true){
           this.tableData=[];
           this.cont=a.lableName;
           $.send('Favorite',{q:"select",Folder:this.$store.state.login.path,Fav_lable:[a.lableName]},this);
          }
          else{
            console.log(a.parentPath);
            Bus.$emit('sendpath',[a.parentPath,true]);
            let myarray=[],myarray1=a.parentPath,myarray2=true;
                myarray.push(myarray1,myarray2);
            this.$store.commit("setPath",myarray);
            $.send('List',{Folder:a.path,listMenu:false},this);
            this.dialogFormVisible1=false;
          }
          }
        },
        List_cb(state,commit,data){
                  Bus.$emit('refres',data.Items); },
       submit(){ this.dialogFormVisible1 = false },
           showfavorite(){
             this.ss='';
              $.send('Favorite',{q:"select",Folder:this.$store.state.login.path},this);
              this.dialogFormVisible1=true },
           Favorite_cb(state,commit,data){
             console.log(data);
                  switch(data.q){
                case 'select':
                if(data.message=="查询单个标签信息"){
                  this.ss='1';
               for(let i=0; i<data.pathAll.length;i++){
                //  console.log( data.pathAll[i].lablePath.split("\\"));
                 if(data.pathAll[i].lablePath.split("\\")[data.pathAll[i].lablePath.split("\\").length-1]==""){
                        this.tableData.push({
                      lableName: data.pathAll[i].lablePath.split("\\")[data.pathAll[i].lablePath.split("\\").length-2],
                      path: data.pathAll[i].lablePath,
                      date:data.pathAll[i].favTime,
                      parentPath: data.pathAll[i].parentPath,
                    });

                 }
                 else{
                        this.tableData.push({
                      lableName: data.pathAll[i].lablePath.split("\\")[data.pathAll[i].lablePath.split("\\").length-1],
                      path: data.pathAll[i].lablePath,
                      date:data.pathAll[i].favTime,
                      parentPath: data.pathAll[i].parentPath,
                    });
                 }
                
                }
                   }
                    else{
                      this.ss='0';
                  this.tableData=data.pathAll;
                    };
                    break;
              case 'delete':
             $.send('Favorite',{q:"select",Folder:this.$store.state.login.path},this);
                 break;
                 case 'delete_file':
             $.send('Favorite',{q:"select",Folder:this.$store.state.login.path},this);
                 break;
                       case 'update':
             $.send('Favorite',{q:"select",Folder:this.$store.state.login.path},this);
                 break;
                  };
                }
    },
    
       }
       
</script>
<style>
  .del{
    float: right;
    margin: 5px;

  }
</style>
