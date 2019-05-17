<template>
<div>
  <el-menu  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
<el-submenu v-for="(li,i) in mitems" :index="i+50+''">
      <template slot="title">{{li.ItemName}}</template>
      <el-menu-item v-for="(si,j) in subitems[li.FullPath]" :index="i*100+j+''">{{si.ItemName}}</el-menu-item>
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
        activeIndex: '1',
        activeIndex2: '1',
        mitems:[], 
        subitems:[],
        subitemsnext:[],
      };
    },
    methods: {
     handleSelect(key, keyPath) {
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
                          // console.log(data.Items[i].FullPath);
                           
                        }
            else{ 
              // console.log(this.subitems[data.Items[i].ParentPath]);  
              this.subitems[data.Items[i].ParentPath].push(data.Items[i])
          
          }
                  }
   },
 
    }
  }
</script>