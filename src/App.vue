<template>
  <div id="app">
    <!-- 组件是一个 functional 组件，渲染路径匹配到的视图组件。-->

    <router-view></router-view>
  </div>

</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;

}
</style>
