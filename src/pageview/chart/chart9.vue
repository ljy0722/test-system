<template>
  <div className="test2" style="width:100%;height:300px;">
    <div id="myChart9" style="width:100%;height:250px;float:left;"></div>
  </div>
</template>


<script>
export default {
  name: 'chart9',
  props: [
    'opinion',
    'opinionData'
  ],
  data() {
    return {
      myChart4: '',

    }
  },
  mounted: function () {
    this.drawLine4()
  },
  methods: {
    drawLine4() {
      this.myChart4 = this.$echarts.init(document.getElementById('myChart9'))
      this.myChart4.setOption({
        title: {
          text: '各题正确率'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'top',
         // data: ['得分情况']
        },
        xAxis: {
          data: this.opinion
        },
        yAxis: {},
        series: [{
          //name: '正确率',
          type: 'bar',
          data: this.opinionData,
          // itemStyle: {
          //   emphasis: {
          //     shadowBlur: 10,
          //     shadowOffsetX: 0,
          //     shadowColor: 'rgba(255, 0, 0, 0.5)'
          //   },
          //   color: function (params) {
          //     // 自定义颜色
          //     var colorList = ['#37eaf0', '#37eaf0', '#37eaf0']
          //     return colorList[params.dataIndex]
          //   }
          // }
        }]
      })
    }
  }
}
</script>
