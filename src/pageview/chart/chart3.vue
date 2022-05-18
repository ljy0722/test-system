<template>
  <div class="test2" style="width:400px;height:300px;">
    <div id="myChart2" style="width:100%;height:278px;"></div>
  </div>
</template>


<script>
export default {
  name: 'chart3',
  props:[
    'xaxis',
    'yaxis',
  ],
  data () {
    return {
      myChart2: ''
    }
  },
  mounted: function () {
    this.drawLine1()
  },
  methods: {
    drawLine1 () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表
      this.myChart2.setOption({
        title: {
          text: '近五次考试得分率及预测', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        tooltip: {
          trigger: 'axis' // axis   item   none三个值
        },
        xAxis: {
          type: 'category', // 还有其他的type，可以去官网喵两眼哦
          data: this.xaxis, // x轴数据
          name: '' // x轴名称
          // x轴名称样式
          // nameTextStyle: {
          //   fontWeight: 600,
          //   fontSize: 18
          // }
        },
        yAxis: {
          type: 'value',
          name: '得分率' // y轴名称
          // y轴名称样式
          // nameTextStyle: {
          //   fontWeight: 600,
          //   fontSize: 18
          // }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'top',
          data: ['得分率']
        },
        series: [
          {
            name: '得分率',
            data: this.yaxis,
            type: 'line'
          }
        ]
      })
    }
  }
}
</script>


<style scoped>

</style>
