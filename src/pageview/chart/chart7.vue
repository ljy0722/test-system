<template>
  <div class="test2" style="width:350px;height:400px;">
    <div id="myChart7" style="width:100%;height:278px;"></div>
  </div>
</template>


<script>
export default {
  name: 'chart7',
  props:[
    'value1',
    'value2',
    'value3',
    'value4',
  ],
  data () {
    return {
      myChart7: '',
      opinion7: ['单项选择题', '多项选择题','填空题','问答题'],
      opinionData7: [
        { value: this.value1, name: '单项选择题', itemStyle: '#2bb559' },
        { value: this.value2, name: '多项选择题', itemStyle: '#2bb5aa' },
        { value: this.value3, name: '填空题', itemStyle: '#8cb52b' },
        { value: this.value4, name: '问答题', itemStyle: '#e6a863' },
      ]
    }
  },
  mounted: function () {
    this.drawLine2()
  },
  methods: {
    drawLine2 () {
      // console.log("开始画饼图")
      // 基于准备好的dom，初始化echarts实例
      this.myChart7 = this.$echarts.init(document.getElementById('myChart7'))
      // 绘制图表
      this.myChart7.setOption({
        title: {
          text: '', // 主标题
          subtext: '', // 副标题
          x: 'left' // x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',

          bottom: 'bottom',
          data: this.opinion7
        },
        series: [
          {
            name: '题目集概览',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.opinionData7,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['#2bb559', '#2bb5aa','#8cb52b','#e6a863']
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      })
    }
  }
}
</script>
