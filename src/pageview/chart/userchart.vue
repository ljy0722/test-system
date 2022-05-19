<template>
  <div class="test2" style="width:80%;height:300px;">
    <div id="userchart" style="width:100%;height:100%"></div>
  </div>
</template>

<script>
import axios from "axios";
var a=[7,35,32,1];
export default {

  name: "userchart",


  data(){
    return{
      mychart:'',
      num:[],
    }
  },

  mounted() {

      this.drawLine();



  },
  methods:{

    drawLine(){


      this.mychart = this.$echarts.init(document.getElementById('userchart'));
      var option;
      window.addEventListener('resize', () => {
        this.mychart.resize()
      })
      // console.log("sss")
      // console.log(2+this.num);
      const arr=this.num;
      this.$nextTick(axios({
        url:"/user/usernum",
      }).then(res=>{
        console.log(res.data)
        for(let i=0;i<4;i++){
          this.num[i]=parseInt(res.data[i]);
          a[i]=parseInt(res.data[i]);
          console.log(this.num[i]);
        }
      }))

      this.mychart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}'
        },
        xAxis: {
          type: 'category',
          data: ['学生', '教师','未审核教师', '管理员']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: a,
            type: 'bar'
          }
        ]
      });
      //console.log(1+a)

    }
  },
  created() {
    this.$nextTick(axios({
      url:"/user/usernum",
    }).then(res=>{
      console.log(res.data)
      for(let i=0;i<4;i++){
        this.num[i]=parseInt(res.data[i]);
        a[i]=parseInt(res.data[i]);
        console.log(this.num[i]);
      }
    }))

  }
}
</script>

<style scoped>

</style>
