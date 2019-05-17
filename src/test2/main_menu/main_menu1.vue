
<template>
  <div>
  <el-table :data="message" border style="width: 100%"  @row-click="gonext"  @row-contextmenu="ssss" empty-text="此文件夹为空" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="ItemName" label="文件名"></el-table-column>
    <el-table-column prop="strSize" label="文件大小"  width="100" ></el-table-column>
  </el-table>
  
  </div>
</template>
<script>
import Bus from '../Bus'
  export default {
    created() {
       Bus.$on('refres', data => {
         this.$emit('loginmenu',data);});
       },
    data() {
      return {
        multipleSelection1: [],
        multipleSelection: [],
        dialogVisible: false, 
      }
    },
     props: ['message'],
    methods: {
      ssss(a){//向menu_button传递需要操作的数据
         this.multipleSelection1 = [];
         this.multipleSelection1.push(a);
         Bus.$emit('checkElemnt',this.multipleSelection1);
      },
      handleSelectionChange(val) {
         console.log(val);
        this.multipleSelection = val;
        Bus.$emit('checkElemnt',this.multipleSelection);
        // console.log(this.multipleSelection);
      },
      gonext(conunt, event, column){
        console.log(conunt);
        console.log(event);
        console.log(column);
         if(event.target.nodeName!="INPUT"&&event.target.nodeName!="SPAN"){
                   let path2=conunt.FullPath;
        let myarray=[],myarray1=path2,myarray2=true;
        myarray.push(myarray1,myarray2);
        this.$store.commit("setPath",myarray);
        Bus.$emit('sendpath',myarray);
      $.send('List',{Folder:this.$store.state.login.path,listMenu:false},this);
            } 
    },
      List_cb(state,commit,data){
           if(data.listMenu==false)
           {
              this.$emit('loginmenu',data.Items);
               Bus.$emit('qqq',data.Items);
           }
      },
    }
  }
</script>
<!--<template>
  <div>
  <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    border
    
    @row-click="ssss"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
    
      label="日期"
      width="120">
      <template slot-scope="scope" @cell-click="sss">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      sss(a){
        console.log("cell");
      },
       ssss(a){
        console.log("row");
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>-->