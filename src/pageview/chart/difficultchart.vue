<template>
  <div class="test2" style="width:80%;height:300px;">
    <div id="diff" style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "difficultchart",
  data(){
    return{
      mychart:'',
    }
  },
  mounted() {
    this.drawLine();
  },
  methods:{
    drawLine(){
      this.mychart = this.$echarts.init(document.getElementById('diff'));
      window.addEventListener('resize', () => {
        this.mychart.resize()
      })
      let a=0;
      let b=0;
      let c=0;
      axios({
        url:"/problem/diff"
      }).then(res=>{
        console.log(res.data);
        a=res.data[0];
        b=res.data[1];
        c=res.data[2];
        this.mychart.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: a, name: '简单' },
                { value: b, name: '一般' },
                { value: c, name: '困难' },
              ]
            }
          ]
        })
      })
      console.log(a);
      console.log(b);
      console.log(c);

    }
  }
}
</script>

<style scoped>

</style>
