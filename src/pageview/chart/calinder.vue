<template>
  <div className="test2" >
    <div id="calinder" style="width: 900px;height: 600px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
var da=[[]];
var dalinks=[{}];
export default {
  name: "calinder",

  data() {
    return {
      myChart: '',
      testdata:[],
      finaldata:[],

    }
  },
  mounted() {

    this.drawLine();
  },
  methods:{

    drawLine(){

      this.myChart = this.$echarts.init(document.getElementById('calinder'))
      var option;
      axios({
        url:"/test/test1month",
        params:{
          year:'2022',
          month:'05',
        }
      }).then(res=>{
        let endtime0=new String();
        for(let i=0;i<res.data.length;i++){
          var l=new Array();
          let endtime=res.data[i].endTime.slice(0,10);
          let state=res.data[i].state;
          let d=new Number();
          let s=new String();
          if(state==='U'){
            s='未参加';
          }
          else if(state==='P'){
            s='待审核';
          }
          else if(state==='D'){
            s='已完成';
          }
          l.push(endtime);
          d=1;
          l.push(d);
          if(endtime!==endtime0){
            da.push(l);
            endtime0=endtime;
          }

        }
      })

      function getVirtulData(year) {
        year = year || '2022';
        let date = +echarts.number.parseDate(year + '-01-01');
        let end = +echarts.number.parseDate(+year + 1 + '-01-01');
        let dayTime = 3600 * 24 * 1000;
        let data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000)
          ]);
        }
        console.log(data[data.length - 1]);
        return data;
      }
      // const graphData = [
      //   ['2022-05-01', 260],
      //   ['2022-05-04', 200],
      //   ['2022-05-09', 279],
      //   ['2022-05-13', 847],
      //   ['2022-05-18', 241],
      //   ['2022-05-23', 411],
      //   ['2022-05-27', 985]
      // ];
      const graphData=this.testdata;
      //console.log(this.testdata);
      //console.log(graphData);
      //da=this.testdata;
      console.log(da);
      const links = da.map(function (item, idx) {
        return {
          source: idx,
          target: idx + 1
        };
      });
      links.pop();
      // if(dalinks===null){
      //   dalinks=links;
      // }
      dalinks=links;
      console.log(links);
      this.myChart.setOption({
        title: {
          text: '考试日历',
        },
        tooltip: {
          position: 'top'
        },
        visualMap: [
        ],
        calendar: [
          {
            orient: 'vertical',
            yearLabel: {
              margin: 80
            },
            monthLabel: {
              nameMap: 'cn',
              margin: 20
            },
            dayLabel: {
              firstDay: 1,
              nameMap: 'cn'
            },
            cellSize:  [80,60],
            range: '2022-05'
          },
        ],
        series: [
          {
            type: 'graph',
            edgeSymbol: ['none', 'arrow'],
            coordinateSystem: 'calendar',
            links: dalinks,
            symbolSize: 10,
            calendarIndex: 0,
            itemStyle: {
              emphasis:{
                shadowBlur:10,
                shadowOffsetX:0,
                shadowColor:'rgb(30,144,255,0.5)'
              }
            },
            data: da
          },
        ]
      })

    }
  },
  created() {
    // axios({
    //   url: "/test/test1month",
    //   params: {
    //     year: '2022',
    //     month: '05',
    //   }
    // }).then(res => {
    //   let endtime0 = new String();
    //   for (let i = 0; i < res.data.length; i++) {
    //     var l = new Array();
    //     let endtime = res.data[i].endTime.slice(0, 10);
    //     let state = res.data[i].state;
    //     let d = new Number();
    //     let s = new String();
    //     if (state === 'U') {
    //       s = '未参加';
    //     } else if (state === 'P') {
    //       s = '待审核';
    //     } else if (state === 'D') {
    //       s = '已完成';
    //     }
    //     l.push(endtime);
    //     d = 1;
    //     l.push(d);
    //     if (endtime !== endtime0) {
    //       da.push(l);
    //       endtime0 = endtime;
    //     }
    //
    //   }
    //
    // })
  }
}
</script>

<style scoped>

</style>
