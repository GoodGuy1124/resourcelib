<template>
  <el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="u.name"   auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="u.pwd"   auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="GetRsakey"   >登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        u:{name: 'admin',pwd:'1'},
        checked: true
      };
    },
 
   methods:{
 
    GetRsakey(){$.send('GetRsakey',{ver:'json'},this)},
    GetRsakey_cb(state,commit,data){
      let user = {OEAP:false}; 
      user.UserName= $.RSA_encrypt(data.RsaXMLPublicKey,this.u.name);
      user.UserPWD = $.RSA_encrypt(data.RsaXMLPublicKey,this.u.pwd);
      $.send('Login',user,this);
    },
    Login_err(state,commit,data){
      alert("data.Status"+data.Status);
    },
    Login_cb(state,commit,data){
      let userID=[];
      userID[0] = this.u.name;
      userID[1] = this.u.pwd;
      commit("setUser",userID);
        commit("setStatus",data.Status);
        this.$router.push({ path: '/main' });
        // console.log(this.$store.state.login.status)
    },
  }
  }
</script>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    border: 2px solid #8492A6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>