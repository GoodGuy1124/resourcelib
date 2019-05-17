<template>
<div>
<el-button type="info"  icon="share" @click="changeview= true" size="medium">查找</el-button>
<el-dialog title="查找文件":visible.sync="changeview" width="900px" >
    <el-row>
        <el-col span="1"><span style="font-size:10px">范围</span></el-col>
        <el-col span="3">  <el-select v-model="value" size="mini" >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">  </el-option>
        </el-select></el-col>
        <el-col span="1"><span style="font-size:10px">关键字</span></el-col>
        <el-col span="5"><el-input v-model="input" size="mini"></el-input> </el-col>
        <el-col span="3"><el-button  @click="starSearch"  size="mini">开始查找</el-button></el-col>
        <el-col span="7"><div class="block"><el-pagination layout="prev, pager, next":total="totalDataNumber"  :page-sizes="pageSizesList"
  :page-size="pageSize" @current-change="jumpto"> </el-pagination></div></el-col>
    </el-row>
    <el-row style="margin-top:30px">
      <el-table :data="tableData" border  @row-dblclick="gonext"  style="width:100%" >
    <el-table-column prop="name" label="文件名" ></el-table-column>
    <el-table-column prop="FullPath" label="文件路径" ></el-table-column>
  </el-table>
    </el-row>
</el-dialog>
</div>
</template>
<script>
import Bus from '../Bus'
    export default {
          data() {
      return {
          pageSize:10,
          PageIndex:0,
          pageSizesList: [10, 15, 20, 30],
          totalDataNumber: 0,//数据的总数,
            tableData: [],
              options: [{
          value: 'all',
          label: '全部'
        }, {
          value: 'here',
          label: '当前目录'
        }],
        value: 'all',
        input:'',
          changeview:false,
      }
    },
     methods: {
         jumpto(val){
             this.PageIndex=val;
             this.starSearch();
         },
             gonext(conunt){
        let path2=conunt.FullPath;
        let myarray=[],myarray1=path2,myarray2=true;
        myarray.push(myarray1,myarray2);
        this.$store.commit("setPath",myarray);
        Bus.$emit('sendpath',myarray);
      $.send('List',{Folder:conunt.ParentPath,listMenu:false},this);
        Bus.$emit('currenchoose',conunt);
},
          List_cb(state,commit,data){
           if(data.listMenu==false)
           {
             Bus.$emit('refres',data.Items);
             
           }
           this.changeview=false;
      },
      
         starSearch(){
               if (this.input =='') {console.log("请输入关键字") }
               else{
             let search={};   
            search.key = this.input;
            search.perPage = this.pageSize;
            if (this.PageIndex == 0){
                search.offset = 0;
            }
            else{
                search.offset = (this.PageIndex - 1) * this.pageSize;
            };
            if (this.value == 'all') //全部
                {search.path = "";}
           if  (this.value == 'here')
               { search.path = this.$store.state.login.path;}
          
      $.send('Search',search,this);
               }
    
         },
         Search_cb(state,commit,data){
             console.log(data);
             this.tableData=[];
             this.totalDataNumber=data.total;
                   for( let i =0; i<data.Items.length; i++){
                       if(data.Items[i].FullPath.split("\\")[data.Items[i].FullPath.split("\\").length-1] !==""){
                               this.tableData.push({
                    name: data.Items[i].FullPath.split("\\")[data.Items[i].FullPath.split("\\").length-1],
                    FullPath: data.Items[i].FullPath, 
                    ParentPath:  data.Items[i].ParentPath,  
                      });
                       }
                       else{
                               this.tableData.push({
                    name: data.Items[i].FullPath.split("\\")[data.Items[i].FullPath.split("\\").length-2],
                    FullPath: data.Items[i].FullPath,    
                     ParentPath:  data.Items[i].ParentPath,            
                      });
                       }            
                  }
         }
     }
    }
</script>