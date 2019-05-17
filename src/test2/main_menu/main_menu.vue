
<template>
  <div>
  <el-table :data="message" border style="width: 100%" @row-dblclick="gonext" @row-contextmenu="ssss" empty-text="此文件夹为空" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="ItemName" label="文件名"  ></el-table-column>
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
           Bus.$on('currenchoose', data => {
              console.log(data);
              this.setCurrent(data);
              console.log(this.message);
       });
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
       setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
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
      gonext(conunt){
        let path2=conunt.FullPath;
        let myarray=[],myarray1=path2,myarray2=true;
        myarray.push(myarray1,myarray2);
        this.$store.commit("setPath",myarray);
        Bus.$emit('sendpath',myarray);
      $.send('List',{Folder:this.$store.state.login.path,listMenu:false},this);},
      List_cb(state,commit,data){
           if(data.listMenu==false)
           {
             console.log(data);
              this.$emit('loginmenu',data.Items);
               Bus.$emit('qqq',data.Items);
           }
      },
    }
  }
</script>