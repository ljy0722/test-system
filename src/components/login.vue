<template>
  <div class="login" clearfix>
    <div style="margin-bottom: 50px">
      <span style="font-size: xx-large;font-weight: bolder">中医药在线考试系统</span>
    </div>
    <div class="login-wrap">

      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <h3>登录</h3>
          <hr>
          <el-form-item prop="email" label="用户名">
            <el-input v-model="user.userId" placeholder="请使用注册用户名登录" prefix-icon></el-input>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
<!--          <router-link to="/">找回密码</router-link>-->
          <router-link to="/register">没有账号？注册一个</router-link>
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookie from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      user: {
        userId: "",
        password: ""
      },
      rules:{
        email:[{
          message:'请输入正确的邮箱地址',
          trigger:['blur','change']
        }],

      }
    };
  },
  created() {},
  methods: {
    doLogin() {
      //this.setCookie(this.user.username,this.user.password,7);
      if (!this.user.userId) {
        this.$message.error("请输入注册id！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      } else {
        //校验用户名和密码是否正确;
        //this.$router.push({ path: "/navi" });
        let token = localStorage.getItem("token")
        Cookie.set('token',token)
        Cookie.get('token')
        axios({
          url:"/user/login",
          params:{
            userId: this.user.userId,
            password: this.user.password
          }
          })
          .then(res => {
             //console.log("输出response.data.status", res.data.status);
            if (res.data.result === true) {
              var userToken=res.data.token;
              this.$store.dispatch('saveUserInfo',res.data.userInfo.userId);
              this.$store.commit('$_setToken',userToken);
              this.$store.commit('$_setUserId',this.user.userId);
              let token = localStorage.getItem("token")
              let userid = localStorage.getItem("userId")
              Cookie.set('token',token)
              Cookie.set('userId',userid)
              Cookie.get('token')
              if(res.data.userInfo.type==='S'){
                this.$router.push('/student' );
              }
              else if(res.data.userInfo.type==='A'){
                this.$router.push('/super_user');
              }
              else if(res.data.userInfo.type==='T'){
                this.$router.push('/teacher');
              }

            } else {
              alert("您输入的用户名或密码错误！");
            }
          });
      }
    },
    setCookie(c_email,c_pwd,exdays){
      var exdate=new Date();
      exdate.setTime(exdate.getTime()+24*60*60*1000*exdays);
      window.document.cookie="email"+"="+c_email+";path=/;expires="+exdate.toString();
      window.document.cookie="password"+"="+c_pwd+";path=/;expires="+exdate.toString();
    },
    getCookie:function (){
      if(document.cookie.length>0){
        var arr=document.cookie.split(";");
        for(var i=0;i<arr.length;i++){
          var arr2=arr[i].split("=");
          if(arr2[0]=="email"){
            this.user.email=arr2[1];
          }
          else if(arr2[0]=="password"){
            this.user.password=arr2[1];
          }
        }
      }
    },
    clearCookie:function (){
      this.setCookie("","",-1);
    }
  },
  mounted() {
    this.getCookie();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/images/loginbg.png") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;
  width: 400px;
  height: 300px;
  margin-left: 35%;
  overflow: hidden;
  padding-top: 10px;
  line-height: 40px;
}
#password {
  margin-bottom: 5px;
}
h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}
a {
  text-decoration: none;
  color: #aaa;
  font-size: 15px;
}
a:hover {
  color: coral;
}
.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>
