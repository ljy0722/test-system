<template>
  <div class="common_nav" style="margin-top:0px;font-size: 12px">
    <div style="background-color: #444444;height: min-content;">
      <el-menu class="menu" mode="horizontal" style="background-color: #444444;height:min-content;margin-left: 60%; overflow: hidden">
        <el-menu-item style="color:#eee;background: #444444;" class="menu-item" ><a href="http://www.ckcest.cn/" style="text-decoration: none">知识中心首页</a></el-menu-item>
        <el-menu-item style="color:#eee;background: #444444;" class="menu-item" ><a href="http://zcy.ckcest.cn/tcm/" style="text-decoration: none">中草药系统首页</a></el-menu-item>
        <el-menu-item style="color:#eee;background: #444444;" class="menu-item" @click="handleClick1"><a style="text-decoration: none">个人中心</a></el-menu-item>
        <el-menu-item style="color:#eee;background: #444444;" class="menu-item" @click="handleClick2"><a>退出系统</a></el-menu-item>

      </el-menu>
    </div>

    <br>
    <div class="logo-area">
      <a style="width:50%;margin-right: 50%" class="pull-left" href="http://zcy.ckcest.cn/tcm/" target="_blank">

        <img   style="width:33%;height:33%;"   src="http://zcy.ckcest.cn/zcystatic/tcm/resources/home/Images/logo_new.png">

      </a>
    </div>

  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  name: "top",
  methods:{
    handleClick1(){
      this.$router.push('/user_info');
    },
    handleClick2(){
      //this.$router.push('/');
      this.$confirm('确认退出？','提示',{confirmButtonText:'确定',cancelButtonText:'取消',type:'warning'}).then(action => {
        this.$store.commit('$_removeStorage');    // 清除登录信息
        Cookie.remove('token');
        Cookie.remove('userId');
        this.$router.push({
          path:'/'
        });
      }).catch(()=>{})
    }
  }
}
</script>

<style scoped>

</style>
