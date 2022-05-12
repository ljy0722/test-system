<template>
  <div style="margin-top:5px;width: 200px;background-size: cover;overflow: hidden;">
    <el-row :gutter="10">
      <el-col :xs="15" :sm="15" :md="15" :lg="15">
        <div>
          <el-menu default-active="getAcktive" class="el-menu-vertical-demo" style="min-height:800px" @select="handleSelect">
            <el-menu-item index="1"><i class="el-icon-message"></i>组题练习</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-edit"></i>在线考试</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-tickets"></i>创建考试</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-view"></i>考试查看</el-menu-item>
            <el-menu-item index="5"><i class="el-icon-document"></i>我的题集</el-menu-item>
            <el-menu-item index="6"><i class="el-icon-time"></i>多人考试</el-menu-item>
            <el-menu-item index="7"><i class="el-icon-circle-plus"></i>习题导入</el-menu-item>
          </el-menu>
        </div>
      </el-col>
<!--      <el-col :xs="20" :sm="20" :md="20" :lg="20">-->
        <!--          <div>-->
        <!--            <div style="border: 1px solid #563633; border-radius:6px; padding:5px; margin:2px; background-color: #ffffff">-->
        <!--              <el-breadcrumb separator="/">-->
        <!--                <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id">{{item}}</el-breadcrumb-item>-->
        <!--              </el-breadcrumb>-->
        <!--            </div>-->
        <!--          </div>-->

<!--        <div style="margin-top:10px">-->
<!--          <router-view></router-view>-->
<!--        </div>-->
<!--      </el-col>-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "left",

  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push('/exercise_create');
          //this.active='1';
          //this.breadcrumbItems = ['试卷生成选项']
          break;
        case '2':
          this.$router.push('/wrong_question')
          //this.active='2';
          this.breadcrumbItems = ['导航二']
          break;
        case '3':
          this.$router.push('/test_create')
          //this.active='3';
          this.breadcrumbItems = ['导航三']
          break;
        case '5':
          this.$router.push('/exercise_set')
          break;
        case '7':
          //this.active='7';
          this.$router.push('/import_exercise')
          break;
      }
    },
  },
  computed:{
    getActive:function (){
      var path=this.$router.path.split("/");
      return path[1];
    }
  }
}
</script>

<style>

</style>
