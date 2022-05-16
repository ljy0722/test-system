<template>
  <div class="login clearfix">
    <div style="margin-bottom: 50px;margin-top: 100px">
      <span style="font-size: xx-large;font-weight: bolder">中医药在线考试系统</span>
    </div>
    <div class="login-wrap">
      <el-row type="flex" justify="center">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="110px">
          <h3>注册</h3>
          <hr>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="user.userId" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="设置密码">
            <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="applyTeacher" label="申请教师资格">
            <el-checkbox v-model="user.applyTeacher" style="float: left"></el-checkbox>
          </el-form-item>
          <el-form-item pro="license" label="教师资格证编号" v-if="user.applyTeacher==true">
            <el-input v-model="user.license" placeholder="请输入教师资格证编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {

    return {
      user: {
        userId: "",
        email: "",
        password: "",
        applyTeacher: false,
        license:""
      },
      rules:{
        email:[{
          required:true,
          message:'邮箱不能为空',
          trigger:'blur'
        },{
          type:'email',
          message:'请输入正确的邮箱地址',
          trigger:['blur','change']
        }],
        userId:[{
          required:true,
          message:'用户名不能为空',
          trigger:'blur'
        },{
          min:3,
          max:8,
          message:'长度在3到8个字符',
          trigger: 'blur'
        }],
        password:[{
          required:true,
          message:'密码不能为空',
          trigger:'blur',
          },{
          min:6,
          max:13,
          message: '密码长度为6到13个字符',
          trigger: 'blur'
        }
        ]
      }
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
    doRegister() {
      if (!this.user.userId) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else {
          //this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
          axios({
            url:"/user/signup",
            method:"POST",
            data:{
              userId: this.user.userId,
              userName:"",
              password: this.user.password,
              type:this.user.applyTeacher?'T':'S',
              createTime:new Date(),
              email: this.user.email,
              sex:"",
              phone:"",
              state:"",
              address:"",
              applyTeacher:this.user.applyTeacher
              },
            params:{
              license:this.user.license
            }})
            .then(res => {
              // console.log("输出response.data", res.data);
              // console.log("输出response.data.status", res.data.status);
              if (res.data.result === true) {
                this.$router.push({ path: "/" });
              } else {
                alert("请等待管理员进行审核");
                this.$router.push({path:"/"});
              }
            });
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100%;
  height: 740px;
  background: url("../assets/images/login_register.png") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-wrap {
  background: white;
  border-color: black;
  background-size: cover;
  width: 400px;
  height: auto;
  margin-left: 35%;
  overflow: hidden;
  padding-top: 10px;
  line-height: 20px;
  padding-bottom: 10px;
}

h3 {
  color: #0babeab8;
  font-size: 24px;
}
hr {
  background-color: #444;
  margin: 20px auto;
}

.el-button {
  width: 80%;
  margin-left: -50px;
}
</style>
