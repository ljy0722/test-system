<template>
  <div class="test2" style="width:100%;height:400px;">
    <div id="myChart7" style="width:100%;height:278px;"></div>
  </div>
</template>


<script>
import axios from "axios";

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
      axios.all([
        axios({url:"/problem/teacher_problem",params:{type:"单项选择题",page:1,keyWords:null,subject:null,contentType:null}}),
        axios({url:"/problem/teacher_problem",params:{type:"多项选择题",page:1,keyWords:null,subject:null,contentType:null}}),
        axios({url:"/problem/teacher_problem",params:{type:"填空题",page:1,keyWords:null,subject:null,contentType:null}}),
        axios({url:"/problem/teacher_problem",params:{type:"问答题",page:1,keyWords:null,subject:null,contentType:null}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        let totalSingle=single.data.total;
        let totalMulti=multi.data.total;
        let totalFill=fill.data.total;
        let totalQa=qa.data.total;
        var opinionData7=[
          { value: totalSingle, name: '单项选择题', itemStyle: '#2bb559' },
          { value: totalMulti, name: '多项选择题', itemStyle: '#2bb5aa' },
          { value: totalFill, name: '填空题', itemStyle: '#8cb52b' },
          { value: totalQa, name: '问答题', itemStyle: '#e6a863' },
        ];

        this.myChart7.setOption({
          title: {
            text: '收藏题目概览', // 主标题
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
            data:['单项选择题', '多项选择题','填空题','问答题'],
          },
          series: [
            {
              name: '题目集概览',
              type: 'pie',
              radius: '50%',
              center: ['50%', '50%'],
              data: opinionData7,
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
      }))

    }
  }
}
</script>
