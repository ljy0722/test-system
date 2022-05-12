<template>

  <div style="margin-top: 0px">
    <div>
      <el-row>
        <Top></Top>
      </el-row>

      <el-row>
        <el-col :span="6"><left></left></el-col>
        <el-col :span="18">
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
            <el-col :span="5"><a>组题方式：</a></el-col>
            <el-col :span="6"><el-cascader
              v-model="value1"
              :options="options1"
              @change="handleChange"
              id="step1">
            </el-cascader></el-col>
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
            <el-col :span="5"><a>题目数量：</a></el-col>
            <el-col :span="6"><el-input v-model="value2" placeholder="请输入数字" id="step2">
            </el-input></el-col>
          </el-row>
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <el-row>
            <el-col :span="13"><el-button type="info" plain>开始练习</el-button></el-col>

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
        {value:'luanxu',
        label:'乱序组题'},
        {value:'tixing',
        label:'题型组题',
        children:[{
          value:'danxuan',
          label:'单选题'
        },{
          value:'duoxuan',
          label:'多选题'
        }]},
        {value:'zhuanxiang',
        label:'专项组题',
        children: [{
          value: 'jichulilun',
          label: '中医基础理论'
        },{
          value: 'zhongyaojianding',
          label: '中药鉴定学'
        },{
          value: 'zhongyaoyaoli',
          label: '中药药理学'
        }]}
      ],
      value1:'',

      value2:''
    };
  },
  methods:{
    handleChange(value1){
      console.log(value1);
    }
  },
  components:{
    Left,Top,Down
  }
}
</script>
<style scoped>
#step1{

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
