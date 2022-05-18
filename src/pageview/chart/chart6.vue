<template>
  <div class="test2" style="width:300px;height:400px;">
    <div id="myChart6" style="width:100%;height:278px;float:left;"></div>
  </div>
</template>


<script>
export default {
  name: 'chart6',
  props:[
    'value1',
    'value2',
    'value3',
  ],
  data () {
    return {
      myChart6: '',
      opinion6: ['未开始', '正在进行','已结束'],
      opinionData6: [
        { value: this.value1, name: '未开始', itemStyle: '#46d4bc' },
        { value: this.value2, name: '正在进行', itemStyle: '#4699d4' },
        { value: this.value3, name: '已结束', itemStyle: '#eccd6e' },
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
      this.myChart6 = this.$echarts.init(document.getElementById('myChart6'))
      // 绘制图表
      this.myChart6.setOption({
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
          data: this.opinion6
        },
        series: [
          {
            name: '题目集概览',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.opinionData6,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              color: function (params) {
                // 自定义颜色
                var colorList = ['#46d4bc', '#4699d4','#eccd6e']
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
