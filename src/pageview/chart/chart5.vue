<template>
  <div class="test2" style="width:100%;height:400px;">
    <div id="myChart4" style="width:100%;height:400px;"></div>
  </div>
</template>


<script>
export default {
  name: 'chart5',
  props:[
    // opinion:{
    //   type:Array,
    //   default:[]
    // },
    // opinionData:{
    //   type:Array,
    //   default: []
    // }
    'opinion',
    'opinionData'
  ],
  data () {
    return {
      myChart4: '',
      // opinion: ['中医学基础', '温病学','中医外科学'],
      // opinionData: [
      //   { value: 85, itemStyle: '#37eaf0' },
      //   { value: 15, itemStyle: '#37eaf0' },
      //   { value: 25, itemStyle: '#37eaf0' }
      // ]
    }
  },
  mounted: function () {
    this.drawLine4()
  },
  methods: {
    drawLine4 () {
      this.myChart4 = this.$echarts.init(document.getElementById('myChart4'))
      this.myChart4.setOption({
        title: {
          text: '学科考点正确率'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'top',
          data: ['得分']
        },
        xAxis: {
          data: this.opinion,
          axisLabel:{
            interval:0,
            rotate:-30
          }
        },
        yAxis: {},
        series: [{
          name: '得分情况',
          type: 'bar',
          data: this.opinionData,
          barMaxWidth:'60',
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: '#1FC48D'
            },
            color: function (params) {
              // 自定义颜色
              var colorList = ['#1FC48D', '#1FC48D','#1FC48D']
              return colorList[params.dataIndex]
            }
          }
        }]
      })
    }
  }
}
</script>
