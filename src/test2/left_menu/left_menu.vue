
<template>
  <div>
<el-tree :data="mitems" class="filter-tree" :props="defaultProps" node-key="id" :expand-on-click-node="true" @node-expand="appendd" :filter-node-method="filterNode"
 ref="tree2" highlight-current :render-content="renderContent"></el-tree>
  </div>
</template>
<script>
  let id = 1001;
  var q=1;
import Bus from '../Bus'
  export default {
        watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
       created(){
         $.send('List',{Folder:this.$store.state.login.path,listMenu:true},this);
            Bus.$on('come', data => {
              this.mitems=[];
              this.coce=true;
              $.send('List',{Folder:data.FullPath,listMenu:false},this);
              });
               Bus.$on('refreLeft', data => {//接受其他组件的数据，进行树的同步响应
                //  console.log(data);
                //  console.log(this.mitems);
                 if(this.UseStore.length !==0){

                 }
                   });
           },
    data() {
      return {
        UseStore:[],
        filterText: '',
        treeData:'',
        coce:false,
        mitems:[],
        addelement:[],
        parent:[],
        defaultProps: {
          children: 'children',
          label: 'ItemName' }
      }
    },
    methods: {
        filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    },
      appendd(data, store) {
        let path2=data.FullPath;
        this.$store.commit("setPath",[path2,true]);
        Bus.$emit('sendpath',[path2,true]);
         this.parent=data;
         this.addelement=store.store;
         $.send('List',{Folder:data.FullPath,listMenu:false},this);
      },
        append(store, data) {
        let path2=data.FullPath;
        this.$store.commit("setPath",[path2,true]);
        Bus.$emit('sendpath',[path2,true]);
         this.parent=data;
         this.addelement=store;
         this.UseStore=store;
        //  console.log( this.addelement);
         $.send('List',{Folder:data.FullPath,listMenu:false},this);
      },
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span on-click={ () => this.append(store, data) }>{node.label}</span>
            </span>
          </span>
          
          );
         
      },
        sortNumber(a,b){//排序函数
        if(a.HasChild==0){
          return 1
        }
          else{
            return 0;
          }
      },
          List_cb(state,commit,data){
            console.log(data);
            data.Items=data.Items.sort(this.sortNumber);//把有子文件的排序到前面
             if(this.coce==true){
                 for( let i =0; i<data.Items.length; i++){
                   if( data.Items[i].HasChild == 1){
                          data.Items[i].children = [{ id: id++, label: 'testtest', children: [] }];
                          data.Items[i].id = id++;
                          data.Items[i].qq = 1;
                          this.mitems.push(data.Items[i]);
                          this.coce=false;
                   }
                   else{
                     this.mitems.push(data.Items[i]);
                          this.coce=false;
                   }
                }
             };
            if(data.Folder == null){
              Bus.$emit('refres',this.mitems);
            }
            else{
             Bus.$emit('refres',data.Items);
            }
           if(data.listMenu==false)
           {         
             if(this.parent.qq == 1){
                this.parent.qq = 0;
               for( let i=0; i<data.Items.length; i++){
                 if(data.Items[i].Ext !== ""){continue}
                 if(data.Items[i].HasChild==1){
                   data.Items[i].children = [{ id: id++, label: 'testtest', children: [] }];
               }
                 else{
                   data.Items[i].children = [];
                     }
                          data.Items[i].id = id++;
                          data.Items[i].qq = 1;
                 this.addelement.remove(this.parent.children[0]);//树状控件使用remove和append对树的data没有改变。
                 this.addelement.append(data.Items[i],this.parent);
        
                   
             }
                  }
           }
           else{
                for( let i =0; i<data.Items.length; i++){
                        if(data.Items[i].Level == 2){
                          data.Items[i].children = [{ id: id++, label: 'testtest', children: [] }];
                          data.Items[i].id = id++;
                          data.Items[i].qq = 1;
                          this.mitems.push(data.Items[i]);
                        }        
                }
           }      
   },
    }
  };
</script>