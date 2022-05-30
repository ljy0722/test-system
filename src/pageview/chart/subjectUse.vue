<template>
  <div class="test2" style="width:100%;height:300px;">
    <div id="subjectUse" style="width:100%;height:300px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "subjectUse",
  data(){
    return{
      mychart:''
    }
  },
  mounted() {
    this.drawLine();
  },
  methods:{
    drawLine(){
      this.mychart = this.$echarts.init(document.getElementById('subjectUse'));
      var option;
      axios({
        url:"/problem/subjectUsage"
      }).then(res=>{
        option = {
          title:{
            text:'科目关注情况'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}'
          },
          xAxis: {
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data:res.data.subjects
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              //data: [120, 200, 150, 80, 70, 110, 130],
              data:res.data.usage,
              type: 'bar'
            }
          ]
        };

        this.mychart.setOption(option);
      })



    }
  }
}
</script>

<style scoped>

</style>
