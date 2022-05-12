<template>
  <div id="test">
    <el-header>
      <Top></Top>
    </el-header>
    <el-main style="margin-top: 80px">
      <el-row style="display: block;">
        <el-row class="backstyle" >
          <el-col :span="18" style="min-height: 1px;">
            <el-container>
              <el-container>
                <el-main class="content_style" style="margin-right: 15px;">
                  <el-container>
                    <el-header class="other_header" style="height: 40px;line-height: 40px;text-align: center; color:black;font-weight: bold ;">中医药基础</el-header>
                    <el-main>
                      <el-row style="background: #ffffff">
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">单项选择题</h2>
                          <p style="background: #409EFF;font-size: small;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 50px;line-height: 30px">
                            <span>共</span>
                            <i>{{ singleChoiceList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classa${index+1}`" v-for="(item,index) in singleChoiceList" :key="'single'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.question}}
                            </el-row>
                            <el-row style="margin-top: 20px;" v-for="(citem,indx) in item.result" :key="indx">
                              <a @click="gotobutton1(index)">
                                <el-radio v-model="item.radio" :label="citem.outanswer">{{citem.outcome}}</el-radio>
                              </a>
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">多项选择题</h2>
                          <p style="background: #409EFF;font-size: small;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 50px;line-height: 30px">
                            <span>共</span>
                            <i>{{ multiChoiceList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classb${index+1}`" v-for="(item,index) in multiChoiceList" :key="'multi'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.question}}
                            </el-row>
                            <el-row style="margin-top: 20px;" v-for="(citem,indx) in item.result" :key="indx">
                              <a @click="gotobutton2(index)">
                                <el-checkbox-group v-model="item.radio">
                                  <el-checkbox  :label="citem.outanswer">{{citem.outcome}}</el-checkbox>
                                </el-checkbox-group>

                              </a>
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">填空题</h2>
                          <p style="background: #409EFF;font-size: small;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 50px;line-height: 30px">
                            <span>共</span>
                            <i>{{ fillBlankList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classc${index+1}`" v-for="(item,index) in fillBlankList" :key="'fill'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.question}}
                            </el-row>
                            <el-input v-model="item.blank"></el-input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">问答题</h2>
                          <p style="background: #409EFF;font-size: small;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 50px;line-height: 30px">
                            <span>共</span>
                            <i>{{ questionAnswerList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classd${index+1}`" v-for="(item,index) in questionAnswerList" :key="'question'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.question}}
                            </el-row>
                            <el-input v-model="item.blank"></el-input>
                          </el-col>
                        </el-row>
                        <el-row style="margin-top: 60px;text-align: center;">
                          <el-col>
                            <div>
                              <el-button @click="submit" type="primary" round>提交</el-button>
                            </div>
                          </el-col>
                        </el-row>
                      </el-row>
                    </el-main>
                  </el-container>
                </el-main>
              </el-container>
            </el-container>
          </el-col>
          <el-col :span="6">
            <el-container style="margin-right: 50px;margin-top: -80px;height: 80%;position: fixed">
              <el-header class="header_style" style="line-height: 40px;height: 40px;background-color: lightblue"><span style="font-size: large;font-family: 'Adobe 黑体 Std R'">答题卡</span><span style="margin-left: 15px;color: red">{{resTime}}</span></el-header>
              <el-main class="content_style">
                <el-row style="margin-top: -15px;">
                  单项选择题
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-button size="mini" @click="Submit1(index+1)" class="button_style" v-for="(item,index) in singleChoiceList" :key="index" :style="item.show">{{index+1}}</el-button>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top: -15px;">
                  多项选择题
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-button size="mini" @click="Submit2(index+1)" class="button_style" v-for="(item,index) in multiChoiceList" :key="index" :style="item.show">{{index+1}}</el-button>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top: -15px;">
                  填空题
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-button size="mini" @click="Submit3(index+1)" class="button_style" v-for="(item,index) in fillBlankList" :key="index" :style="item.show">{{index+1}}</el-button>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top: -15px;">
                  问答题
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-button size="mini" @click="Submit4(index+1)" class="button_style" v-for="(item,index) in questionAnswerList" :key="index" :style="item.show">{{index+1}}</el-button>
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </el-row>
      <el-backtop></el-backtop>
    </el-main>
    <el-footer>
      <Down></Down>
    </el-footer>
  </div>

</template>

<script>
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
import axios from "axios";

export default {
  data() {
    return {
      resTime: "", // 剩余时间
      startTime: "2022-5-8 12:00:00", // 开始时间，自己设置或数据库获取
      endTime: "2022-5-8 22:00:00", // 结束时间，自己设置或数据库获取
      showModal: false,
      grades: 0,
      time1:this.$route.query.time,
      singleChoiceList: [{
        question: '中医四大经典著作是（  ）',
        answer: 'C',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '《五十二病方》',
        }, {
          outanswer: 'B',
          outcome: '《神农本草经》',
        }, {
          outanswer: 'C',
          outcome: '《黄帝内经》',
        }, {
          outanswer: 'D',
          outcome: '《中藏经》',
        },{
          outanswer: 'E',
          outcome: '《难经》',
        }]
      }, {
        question: '我国第一部药物学专著是（  ）',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '《本草纲目》',
        }, {
          outanswer: 'B',
          outcome: '《新修本草》',
        }, {
          outanswer: 'C',
          outcome: '《黄帝内经》',
        },{
          outanswer: 'D',
          outcome: '《备急千金要方》',
        },{
          outanswer: 'E',
          outcome: '《神农本草经》'
          }]
      },{
        question: '下列著名医家中被称为“寒凉派”的代表是（  ）',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '叶天士',
        }, {
          outanswer: 'B',
          outcome: '张从正',
        },{
          outanswer: 'C',
          outcome: '刘完素',
        }, {
          outanswer: 'D',
          outcome: '朱丹溪',
        },{
          outanswer: 'E',
          outcome: '李杲'
        }]
      }, {
        question: '常被称为“中医四大经典”的著作是（  ）',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '《难经》',
        }, {
          outanswer: 'B',
          outcome: '《黄帝内经》',
        },{
          outanswer: 'C',
          outcome: '《伤寒杂病论》',
        }, {
          outanswer: 'D',
          outcome: '《神农本草经》',
        },{
          outanswer: 'E',
          outcome: '《备急千金要方》'
        }]
      },{
        question: '“阴在内，阳之守也；阳在外，阴之使也。”此语主要说明了阴阳的哪一关系（  ）',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '对立制约',
        }, {
          outanswer: 'B',
          outcome: '互根互用',
        },{
          outanswer: 'C',
          outcome: '消长平衡',
        }, {
          outanswer: 'D',
          outcome: '相互交感',
        }]
      },{
        question: '言人身脏腑之阴阳，则肝为（  ）',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '阳中之太阳',
        }, {
          outanswer: 'B',
          outcome: '阳中之少阴',
        },{
          outanswer: 'C',
          outcome: '阴中之少阳',
        },{
          outanswer: 'D',
          outcome: '阴中之至阴'
        }]
      }, {
        question: '在医学领域中，下列何项功能属阳（  ）',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '滋润',
        }, {
          outanswer: 'B',
          outcome: '抑制',
        }, {
          outanswer: 'C',
          outcome: '凝聚',
        }]
      }],
      multiChoiceList:[
        {
          question: '属于母病及子的是（  ）',
          answer: 'A',
          radio:[],
          show:'',
          result: [{
            outanswer: 'A',
            outcome: '肺病影响心',
          }, {
            outanswer: 'B',
            outcome: '肺病影响肝',
          },{
            outanswer: 'C',
            outcome: '肺病影响肾',
          }, {
            outanswer: 'D',
            outcome: '肺病传脾',
          },{
            outanswer: 'E',
            outcome: '脾病传肾'
          }]
        }
      ],
      fillBlankList:[
        {
          question:'《金匮要略》约成书于________年，是我国现存最早的一部________的专书，作者是我国________著名医学家',
          answer:'公元205 诊治杂病 东汉 张仲景（张机）',
          blank:'',
          show:'',
        }
      ],
      questionAnswerList:[
        {
          question:'木防己汤证的特点是什么？',
          answer:'木防己汤为温通、温化、温补并举的方剂，方中木防己去膈间水饮，桂枝通阳化气利水；正虚饮结，阳气被郁，易于化热，故用石膏清解郁热，且降逆以平喘；人参甘温益气补虚，主治支饮重证。木防己汤证的特纛是①得之数十日，说明其病程长；②证候繁多，病情重：喘满，心下痞坚，面色黧黑，脉沉紧；③病机复杂：医吐下之不愈，说明邪气买、饮邪盛、正气已伤。',
          blank:'',
          show:'',
        },
      ],
      letTimes:{
        nowTime:{

        }
      }
    };
  },
  methods: {
    Submit1(i) {
      var wei = "classa" + i
      var el = document.getElementsByClassName(wei)[0];
      console.log(el.offsetTop);
      this.$nextTick(function() {
        window.scrollTo({
          "behavior": "smooth",
          "top": el.offsetTop
        });
      });
    },
    Submit2(i) {
      var wei = "classb" + i
      var el = document.getElementsByClassName(wei)[0];
      console.log(el.offsetTop);
      this.$nextTick(function() {
        window.scrollTo({
          "behavior": "smooth",
          "top": el.offsetTop
        });
      });
    },
    Submit3(i) {
      var wei = "classc" + i
      var el = document.getElementsByClassName(wei)[0];
      console.log(el.offsetTop);
      this.$nextTick(function() {
        window.scrollTo({
          "behavior": "smooth",
          "top": el.offsetTop
        });
      });
    },
    Submit4(i) {
      var wei = "classd" + i
      var el = document.getElementsByClassName(wei)[0];
      console.log(el.offsetTop);
      this.$nextTick(function() {
        window.scrollTo({
          "behavior": "smooth",
          "top": el.offsetTop
        });
      });
    },
    PrintGrade() {
      let a;
      for (a in this.$data.singleChoiceList) {
        if (this.$data.singleChoiceList[a].answer === this.$data.singleChoiceList[a].radio) {
          this.$data.grades = this.$data.grades + 1;
        }
      }
      alert("提交成功"+this.$data.grades);
    },
    submit(){
      axios({
        url:"/test/submit",
        method:"POST",
        data:{
          id:this.id,
          setname:this.setname,
          singleChoiceList:this.singleChoiceList,
          multiChoiceList:this.multiChoiceList,
          fillBlankList:this.fillBlankList,
          questionAnswerList:this.questionAnswerList
        }
      }).then(res=>{
        this.$message("提交成功");
        this.$router.push({path:'/viewset',query:{'single':JSON.stringify(this.singleChoiceList),'multi':JSON.stringify(this.multiChoiceList),'fill':JSON.stringify(this.fillBlankList),'qa':JSON.stringify(this.questionAnswerList)}})
      })
      this.$router.push({path:'/viewset',query:{'single':JSON.stringify(this.singleChoiceList),'multi':JSON.stringify(this.multiChoiceList),'fill':JSON.stringify(this.fillBlankList),'qa':JSON.stringify(this.questionAnswerList)}})
    },
    gotobutton1(index) {
      this.$data.singleChoiceList[index].show = 'background: #00ABEA;';
    },
    gotobutton2(index){
      this.$data.multiChoiceList[index].show = 'background: #00ABEA;';
    },
//     countDown(times) {
//       const _this = this
//       let timer = null
//       timer = setInterval(function() {
//         let day = 0,
//           hour = 0,
//           minute = 0,
//           second = 0// 时间默认值
//         if (times > 0) {
//           day = Math.floor(times / (60 * 60 * 24))
//           hour = Math.floor(times / (60 * 60)) - (day * 24)
//           minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60)
//           second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
//         }
//         if (day <= 9) day = '0' + day
//         if (hour <= 9) hour = '0' + hour
//         if (minute <= 9) minute = '0' + minute
//         if (second <= 9) second = '0' + second
//         _this.$set(_this.letTimes, 'nowTime', `${day !== '00' ? `${day}天:` : ''}${hour}小时：${minute}分钟：${second}秒`)
//         times--
//       }, 1000)
//       if (times <= 0) {
//         _this.$set(_this.letTimes, 'nowTime', '')
//         clearInterval(timer)
//       }
//     },
//   resetTime(time){
//   var timer=null;
//   var t=time;
//   var m=0;
//   var s=0;
//   m=Math.floor(t/60%60);
//   m<10&&(m='0'+m);
//   s=Math.floor(t%60);
//   function countDown(){
//     s--;
//     s<10&&(s='0'+s);
//     if(s.length>=3){
//       s=59;
//       m="0"+(Number(m)-1);
//     }
//     if(m.length>=3){
//       m='00';
//       s='00';
//       clearInterval(timer);
//     }
//     console.log(m+"分钟"+s+"秒");
//   }
//   timer=setInterval(countDown,1000);
// },
    // 时间戳转时分秒
    toHHmmss (data) {
      var s;
      var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (data % (1000 * 60)) / 1000;
      s = (hours < 10 ? ('0' + hours) : hours) + ":" + (minutes < 10 ? ('0' + minutes) : minutes) + ":" + (seconds < 10 ? ('0' + seconds) : seconds);
      if (s.length>8){
        s= s.slice(0,8)
      }
      return s;
    },
    // 时分秒转时间戳
    toTimeStamp(date) {
      var s = "";
      var hour = date.split(":")[0];
      var min = date.split(":")[1];
      var sec = date.split(":")[2];
      s = Number(hour * 3600) + Number(min * 60) + Number(sec);
      s = s*1000
      return s;
    },
    // 倒计时逻辑
    getRestTime () {
      // 处理字符串为时间类型
      this.startTime = new Date(Date.parse(this.startTime));
      this.endTime = new Date(Date.parse(this.endTime));
      // 调用moment插件计算时间差
      const time = this.$moment(this.endTime).diff(this.$moment(new Date()));
      // 赋值转时分秒
      this.resTime = this.toHHmmss(time);
      // 转时间戳，不能直接给界面显示的属性转，不然显示会有问题
      let timeStamp = this.toTimeStamp(this.resTime); // timeStamp字符串类型
      // 调用
      this.resTime = this.toHHmmss(timeStamp);
      // 判断时间戳是否大于等于1秒，大于1秒的原因在于如果要显示在界面会有异常
      // 所以不是大于0秒
      if (timeStamp>= 1000) {
        // 1000为一秒
        // 如果大于1秒
        timeStamp = time -1000;
      } else {
        // 倒计时最后一秒将剩余时间修改
        this.resTime= "00:00:00";
        // 清除定时器
        clearInterval(this.timer)
        // 在这里编写考试交卷的功能
        this.submit();
      }
    }
  },
  created() {
    this.getRestTime();
  },
  mounted() {
    // console.log(this.time1);
    // this.countDown(this.time1*60);
    //this.resetTime(256);
    this.timer = setInterval(this.getRestTime,1000)
  },
  components:{Top,Down}
}
</script>

<style scoped>
.header_style {
  margin-top: 5px;
  border: 1px solid rgb(228, 228, 228);
  text-align: left;
  padding-left: 10px;
}

.other_header {
  font-size: 20px;
  font-weight: 400;

}

.content_style {
  border: 1px solid rgb(255, 255, 255);
  text-align: left;
  padding-left: 10px;
}

.button_style {
  margin-top: 10px;
  margin-left: 6px;
  width: 36px;
  text-align: center;
}

.i_style {
  background: rgb(93, 156, 236);
  font-weight: bold;
  border-radius: 50%;
}

/deep/ .el-radio__inner {}
.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 300px;
  left: 550px;
  width: calc(100% - 1000px);
  height:calc(100% - 570px);
  z-index: 2
}
.btn {
  background-color:rgb(255, 156, 236);;
  border-radius: 4px;
  border: 1px solid blue;
  padding: 4px 12px;
}
#test{
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;
  overflow: auto;
}
</style>

