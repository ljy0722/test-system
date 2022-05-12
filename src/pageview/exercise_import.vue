<template>

  <div>
    <div>
      <el-row>
        <Top></Top>
      </el-row>

      <el-row>
        <el-col span="6"><left></left></el-col>
        <el-col span="18">
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
            <el-col span="5"><a>组题方式：</a></el-col>
            <el-col span="6"><el-select v-model="value1" id="step1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></el-col>
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
            <el-col span="5"><a>题目数量：</a></el-col>
            <el-col span="6"><el-select v-model="value2" id="step2">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></el-col>
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
            <el-col span="13"><el-button type="info" plain>开始练习</el-button></el-col>

          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <Down></Down>
      </el-row>

    </div>


  </div>

</template>

<script type="text/ecmascript-6">
import Left from '../components/navigation/left.vue'
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
export default {
  data(){
    return {
      options1:[
        {value:'选项1',
          label:'乱序组题'},
        {value:'选项2',
          label:'题型组题'},
        {value:'选项3',
          label:'专项组题'},
        {value:'选项4',
          label:'知识点组题'}
      ],
      value1:'',
      options2:[
        {value:'选项1',
          label:'10题'},
        {value:'选项2',
          label:'20题'},
        {value:'选项3',
          label:'30题'},
        {value:'选项4',
          label:'40题'}
      ],
      value2:''
    };
  },
  components:{
    Left,Top,Down
  }
}
</script>
<style scoped>
#step1{
  position: absolute;
  overflow: hidden;
  background-size: cover;
  margin-left: 300px;
  margin-top: 300px;
}
#step2{
  position: absolute;
  overflow: hidden;
  background-size: cover;
  margin-left: 300px;
  margin-top: 300px;
}
.navi{
  overflow: hidden;
}
</style>
