<template>
  <div class="test2" style="width:100%;height:300px;">
    <div id="tiku1" style="width:100%;height:100%"></div>
  </div>
</template>

<script>
export default {
  name: "tiku",
  data(){
    return{
      mychart:''
    }
  },
  props:[
    'a',
    'b',
    'c',
    'd'
  ],
  mounted() {
    this.$nextTick(this.drawLine());

  },
  methods:{
    drawLine(){
      this.mychart = this.$echarts.init(document.getElementById('tiku1'));
      var option;

      option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.a, name: '单项选择题' },
              { value: this.b, name: '多项选择题' },
              { value: this.c, name: '填空题' },
              { value: this.d, name: '问答题' },

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.mychart.setOption(option,true);
    }
  }
}
</script>

<style scoped>

</style>
