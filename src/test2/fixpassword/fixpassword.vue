<template>
  <div>
     <el-button type="text" @click="dialogVisible = true" class="hidden-md-and-down">修改密码</el-button>
     <el-button type="text" @click="dialogVisible = true" class="hidden-lg-and-up"><i class="el-icon-edit"></i></el-button>
<el-dialog title="重命名" :visible.sync="dialogVisible" @close="handclose">
  <el-form :model="form">
    <el-form-item  label="新密码" :label-width="formLabelWidth">
      <el-input type="password" v-model="form.date1" auto-complete="on"></el-input>
    </el-form-item>
    <el-form-item   label="重复输入" :label-width="formLabelWidth">
      <el-input type="password" v-model="form.date2" auto-complete="on" @blur="checkPassword"></el-input>
    </el-form-item>
     <el-form-item  :label-width="formLabelWidth">
       <span style="color:#F00">{{form.name}}</span>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendfixpassword">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
              form: {
          name: '',
          date1: '',
          date2: '',
        },
        formLabelWidth: '80px',
        dialogVisible: false
      };
    },
    methods: {
      checkPassword(){
        if(this.form.date1 !== this.form.date2){ this.form.name="两次密码不一致" }
            else{
              this.form.name=""}},
      sendfixpassword(){
        if(this.form.date1 == this.form.date2){
              let query={};
        query.q = "NewPwd";
        query.para=this.form.date1;
        console.log(query);
        $.send("Query",query,this);
        }else{
           this.form.name="请确认密码是否一致！"
        }
      },
      Query_err(state,commit,data){
            console.log(data.Status);
      },
      Query_cb(state,commit,data){
                 if(data.a=="修改密码成功！"){
                   this.dialogVisible=false;
                                    this.$message({
                          type: 'info',
                          message: data.a
          }); 
                }
      },
      handclose(){
        this.form.name='',
         this.form.date1='',
          this.form.date2=''
      }
    }
  };
</script>