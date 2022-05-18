<template>
  <div class="test2" style="width:100%;height:400px;">
    <div id="rader" style="width:100%;height:350px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "rader",
  props:[
    'opinion',
    'opinionData'
  ],
  data(){
    return{
      myChart:'',
      dataa:[],
    }
  },
  mounted() {
    this.drawLine();
    console.log(this.opinion);
    console.log(this.opinionData);
  },
  methods:{
    drawLine(){
      this.myChart = this.$echarts.init(document.getElementById('rader'));
      var a=new Array();
      for(let i=0;i<this.opinion.length;i++){
        a.push({name:this.opinion[i],max:100});
      }

      console.log(a);
      console.log(this.dataa);
      var option;
      option = {
        title: {
          text: ''
        },

        radar: {
          shape: 'circle',
          indicator: a
        },
        series: [
          {
            name: '',
            type: 'radar',
            radius:'30%',
            data: [
              {
                value: this.opinionData,
                name: 'Allocated Budget'
              },
            ]
          }
        ],
      };
      option && this.myChart.setOption(option);
    }
  },

}
</script>

<style scoped>

</style>
