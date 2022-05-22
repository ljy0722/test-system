<template>
  <div className="test2" style="width:100%;height:300px;">
    <div id="stupro" style="width:100%;height:250px;float:left;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "setudentproblem",
  props:[
    'pnum',
    'unum',
    'pid'
  ],
  data(){
    return{
      chart:'',
    }
  },
  mounted() {
    this.drawLine();
  },
  methods:{
    drawLine(){
      this.chart = this.$echarts.init(document.getElementById('stupro'));
      var option;
      axios({
        url:"/exercise/problemcorrect",
        params:{
          exerciseId:this.pid
        }
      }).then(res=>{
        console.log(res.data);

      })

// prettier-ignore
//       const hours = [
//         '1', '2', '3', '4', '5', '6',
//         '7', '8', '9', '10'
//       ];
      var hours=new Array();
      for(let i=0;i<this.pnum;i++){
        hours.push(i.toString());
      }
// prettier-ignore
      const days = [
        '用户组1', '用户组2'
      ];
// prettier-ignore
      const data = [[0,0,1],[0,1,3],[0,2,5],[0,3,8],[0,4,2],[0,5,3],[0,6,0],[0,7,2],[0,8,9],[0,9,4],
      [1,0,2],[1,1,6],[1,2,9],[1,3,8],[1,4,5],[1,5,6],[1,6,4],[1,7,3],[1,8,5],[1,9,1]]
        .map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        });
      option = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          name:'题号',
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [
          {
            name: '答对人数',
            type: 'heatmap',
            data: data,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.chart.setOption(option);

    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>
