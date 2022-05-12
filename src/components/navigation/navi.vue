<template>

  <div>
    <div>
      <el-row>
        <Top></Top>
      </el-row>

      <el-row>
        <el-col :span="6"><left></left></el-col>
        <el-col :span="18">
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>

        </el-col>
      </el-row>
      <el-row>
        <Down></Down>
      </el-row>

    </div>


  </div>

</template>

<script type="text/ecmascript-6">
import Left from './left.vue'
import Top from './top.vue'
import Down from './down.vue'
export default {

  components:{
    Left,Top,Down
  }
}
</script>
<style scoped>

</style>
