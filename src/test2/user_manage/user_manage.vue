<template>
  <div>
    <el-button type="text" @click="showusermanage" class="hidden-md-and-down">用户管理</el-button>
    <el-button type="text" @click="showusermanage" class="hidden-lg-and-up"><i class="el-icon-tickets"></i></el-button>
    <el-dialog  title="用户管理" :visible.sync="dialogFormVisible" width="900px">
      <el-tabs v-model="activeName"  type="border-card">
    <el-tab-pane style="width:810px" label="学生用户管理" name="first"><stumanage></stumanage></el-tab-pane>
    <el-tab-pane style="width:810px" label="教师用户管理" name="second"><tcmanage></tcmanage></el-tab-pane>
  </el-tabs>
    </el-dialog>
    <cre></cre>
    <group></group>
  </div>
</template>
<script>
import stumanage from './stu_manage.vue';
import tcmanage from './tc_manage.vue';
import cre from './dialog';
import group from './choose_group/choose_group.vue';
       export default {
       data() {
       return {
        dialogFormVisible: false,
        activeName:'first',
       }
       },
       methods:{
           submit(){
             this.dialogFormVisible = false
           },
           showusermanage(){
             this.dialogFormVisible=true
           }
       },
       components: {
         stumanage,
         tcmanage,
         cre,
         group,
       },
       }
       
</script>