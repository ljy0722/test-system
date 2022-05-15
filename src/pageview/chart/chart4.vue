<template>
  <div class="test" style="width:500px;height:300px;">
    <div id="myChart" style="width:100%;height:278px;float:left;"></div>
  </div>
</template>

<script>
export default {
  name: 'chart4',
  props:[
    'value1',
    'value2',
    'value3',
    'value4',
  ],
  data () {
    return {
      myChart: '',
      opinionData: [
        { value: this.value1, name: '单项选择题', itemStyle: 'red' },
        { value: this.value2, name: '多项选择题', itemStyle: '#1FC48D' },
        { value: this.value3, name: '填空题', itemStyle: '#6DC8EC' },
        { value: this.value4, name: '问答题', itemStyle: '#3F8FFF' }
      ]
    }
  },
  mounted: function () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      this.myChart = this.$echarts.init(document.getElementById('myChart'))
      this.myChart.setOption({
        title: {
          text: '各题型做题数量占比', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        grid: { containLabel: true },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        // color: ['#1FC48D', '#F5A60A', '#6DC8EC', '#3F8FFF'],
        color: ['red', '#1FC48D', '#6DC8EC', '#3F8FFF'],
        // backgroundColor: '#ffffff',
        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          x: 'right',
          y: 'bottom',
          data: ['单项选择题', '多项选择题', '填空题', '问答题']
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['red', '#1FC48D', '#6DC8EC', '#3F8FFF']
                return colorList[params.dataIndex]
              }
            },
            data: this.opinionData
          }
        ]
      })
    }
  }
}
</script>


<style scoped>

</style>
