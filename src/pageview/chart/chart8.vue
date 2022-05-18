<template>
  <div class="test2" style="width:100%;height:300px;">
    <div id="myChart8" style="width:100%;height:250px;float:left;"></div>
  </div>
</template>


<script>
export default {
  name: 'chart8',
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
      this.myChart4 = this.$echarts.init(document.getElementById('myChart8'))
      this.myChart4.setOption({
        title: {
          text: '各分数段人数分布'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'top',
          data: ['得分情况']
        },
        xAxis: {
          data: this.opinion
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: this.opinionData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 0, 0, 0.5)'
            },
            color: function (params) {
              // 自定义颜色
              var colorList = ['#37eaf0', '#37eaf0','#37eaf0']
              return colorList[params.dataIndex]
            }
          }
        }]
      })
    }
  }
}
</script>
