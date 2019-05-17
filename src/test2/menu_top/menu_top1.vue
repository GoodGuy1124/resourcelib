<template>
  <div>
<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="true" @select="handleSelect">
  <el-submenu >
    <template slot="title">
      <i class="el-icon-location"></i>
    </template>
    <el-submenu v-for="(li,i) in mitems" :index="i+50+''" >
      <span slot="title">{{li.ItemName}}</span>
      <el-menu-item v-for="(si,j) in subitems[li.FullPath]" :index="i*100+j+''"  >{{si.ItemName}}</el-menu-item>
    </el-submenu>
  </el-submenu>
</el-menu>
  </div>
</template>
<script>
 let id = 100;
import Bus from '../Bus'
  export default {
     created(){
          $.send('List',{Folder:this.$store.state.login.path,listMenu:true},this);
        },
    data() {
      return {
        isCollapse: true,
        mitems:[], 
        subitems:[],
        subitemsnext:[],
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
        handleSelect(key, keyPath) {
          console.log("key, keyPath");
        let i=parseInt(keyPath[0])-50, j=parseInt(keyPath[1])%100;
        let path1=this.mitems[i].FullPath;
        Bus.$emit('come',this.mitems[i]);
        let path2=this.subitems[path1][j].FullPath;
        let myarray=[],myarray1=path2,myarray2=true;
        myarray.push(myarray1,myarray2);
        this.$store.commit("setPath",myarray);
        Bus.$emit('sendpath',myarray);
        $.send('List',{Folder:this.$store.state.login.path,listMenu:false},this);
      },  
         List_cb(state,commit,data){
           if(data.listMenu==false)
           {this.$emit('loginmenu',data.Items);}
                  for( let i =0; i<data.Items.length; i++){
                        if(data.Items[i].Level == 2){
                          this.mitems.push(data.Items[i])
                          this.subitems[data.Items[i].FullPath]=[];
                        }
            else{ 
              this.subitems[data.Items[i].ParentPath].push(data.Items[i])}
                  }
   },
    }
    
  }
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>