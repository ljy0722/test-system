<template>
  <div class="test2" style="width:100%;height:300px;">
    <div id="userpermonth" style="width:100%;height:300px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userPerMonth",
  data(){
    return{
      mychart:'',
    }
  },
  mounted() {
    this.drawLine();
  },
  methods:{
    drawLine(){
      this.mychart = this.$echarts.init(document.getElementById('userpermonth'));
      var option;
      axios({
        url:"/user/userspermonth"
      }).then(res=>{
        option = {
          title:{
            text:'每月答题人次'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} : {c}'
          },
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月', '九月', '十月', '十一月', '十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              //data: [820, 932, 901, 934, 1290, 1330, 1320],
              data:res.data,
              type: 'line',
              smooth: true
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
