<template>
  <div class="test2" style="width:70%;height:300px;">
    <div id="problemchart" style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "problemchart",
  data(){
    return{
      mychart:''
    }
  },
  mounted() {

  },
  methods:{
    drawLine(){
      this.mychart = this.$echarts.init(document.getElementById('problemchart'));
      var option;
      window.addEventListener('resize', () => {
        this.mychart.resize()
      })
      option = {
        xAxis: {
          type: 'category',
          data: ['单项选择题', '多项选择题', '填空题','问答题']
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            data: this.num,
            type: 'bar',
            itemStyle:{
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: '#1FC48D'
              },
            }
          }
        ]
      };

      option && this.mychart.setOption(option);
    },
    getproblemsnum(){
      axios({
        url:"/problem/problemnum",
        params:{
          subject:'',
          range:'',
        }
      }).then(res=>{
        this.num=res.data;
      })
    }
  },
  created() {

    this.num=[20,5,4]
  }
}
</script>

<style scoped>

</style>
