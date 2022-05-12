<template>
  <div id="view_set">
    <el-header>
      <Top></Top>
    </el-header>
    <el-container style="margin-top: 80px">

          <el-col :span="18">
            <el-container>
              <el-container>
                <el-main class="content_style" style="margin-right: 15px;">
                  <el-container>
                    <el-header class="other_header" style="height: 40px;line-height: 40px;text-align: center; color:black;font-weight: bold ;">
                      {{ setname }}
                      <span style="float: right;color: red">{{score}}分</span>
                    </el-header>
                    <el-main>
                      <el-row style="background: #ffffff">
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">单项选择题</h2>
                          <p style="background: #409EFF;font-size: small;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 50px;line-height: 30px">
                            <span>共</span>
                            <i>{{singleChoiceList.length}}</i>
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
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.answer}}
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
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.answer}}
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
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.answer}}
                            </el-row>
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
                        <el-row :class="`classd${index+1}`" v-for="(item,index) in questionAnswerList" :key="'qa'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.question}}
                            </el-row>
                            <el-input v-model="item.blank"></el-input>
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.answer}}
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row style="margin-top: 60px;text-align: center;">
                          <el-col>
                            <div>
                              <el-button @click="back" type="primary" round>返回</el-button>
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
            <el-container style="margin-right: 50px;margin-top: -60px;height: 80%;position:fixed">
              <el-header class="header_style" style="line-height: 40px;height: 40px;background-color: lightblue"><span style="font-size: large;font-family: 'Adobe 黑体 Std R'">答题卡</span></el-header>
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

      <el-backtop></el-backtop>
    </el-container>
    <el-footer>
      <Down></Down>
    </el-footer>

  </div>

</template>

<script>
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'

export default {
  data() {
    return {
      showModal: false,
      setname:'中医药基础卷',
      score: '',
      singleChoiceList: [{
        question: '如果地球对应的是球，那么煎饼对应的是？',
        answer: 'A',
        radio:'A',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '平坦',
        }, {
          outanswer: 'B',
          outcome: '旗子',
        }, {
          outanswer: 'C',
          outcome: '足球',
        }, {
          outanswer: 'D',
          outcome: '圆盘',
        }]
      }, {
        question: '条件1:所有的法国人都是正常人；条件2:所有的法国人都是喝酒的人；那么我们能得到的结论是:',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '至少有部分喝酒的人市正常的',
        }, {
          outanswer: 'B',
          outcome: '没有正常人是喝酒的人',
        }, {
          outanswer: 'C',
          outcome: '没有喝酒的人是正常人',
        }]
      },{
        question: '根据规律选出的数 0  1  3  6  10  ？',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '16',
        }, {
          outanswer: 'B',
          outcome: '15',
        },{
          outanswer: 'C',
          outcome: '12',
        }, {
          outanswer: 'D',
          outcome: '6',
        }]
      }, {
        question: '如果左对应的是右，那么水平对应的是？',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '下方',
        }, {
          outanswer: 'B',
          outcome: '中间',
        },{
          outanswer: 'C',
          outcome: '下面',
        }, {
          outanswer: 'D',
          outcome: '垂直',
        }]
      },{
        question: '如果夜晚对应的是早晨，那么正餐对应的是？',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '早餐',
        }, {
          outanswer: 'B',
          outcome: '汤',
        },{
          outanswer: 'C',
          outcome: '咖啡',
        }, {
          outanswer: 'D',
          outcome: '时光',
        }]
      },{
        question: '如果去玩一场实地CS，你希望在哪里玩?',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '森林里',
        }, {
          outanswer: 'B',
          outcome: '废工厂',
        },{
          outanswer: 'C',
          outcome: '小岛上',
        }]
      }, {
        question: '条件一：没有老师是哑巴；条件2:所有的老师都是法国人；那么我们能得到的结论是:',
        answer: 'A',
        radio:'',
        show:'',
        result: [{
          outanswer: 'A',
          outcome: '部分法国人不是哑巴',
        }, {
          outanswer: 'B',
          outcome: '没有法国人是哑巴',
        }, {
          outanswer: 'C',
          outcome: '所有的法国人都是哑巴',
        }]
      }],
      multiChoiceList:[
        {
          question: '根据规律选出的数 0  1  3  6  10  ？',
          answer: 'A',
          radio:[],
          show:'',
          result: [{
            outanswer: 'A',
            outcome: '16',
          }, {
            outanswer: 'B',
            outcome: '15',
          },{
            outanswer: 'C',
            outcome: '12',
          }, {
            outanswer: 'D',
            outcome: '6',
          }]
        }
      ],
      fillBlankList:[
        {
          question:'这里填__?',
          answer:'',
          blank:'',
          show:'',
        }
      ],
      questionAnswerList:[
        {
          question:'请问?',
          answer:'',
          blank:''
        },
      ],
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
    back(){
      this.$router.push({path:'/student'})
    },
    PrintGrade() {
      let a;
      for (a in this.$data.singleChoiceList) {
        if (this.$data.singleChoiceList[a].answer === this.$data.singleChoiceList[a].radio) {
          this.$data.score = this.$data.score + 1;
        }
      }
      alert("提交成功"+this.$data.score);
    },
    gotobutton1(index) {
      if(this.$data.singleChoiceList[index].answer==this.$data.singleChoiceList[index].radio){
        this.$data.singleChoiceList[index].show = 'background: #00ABEA;';
      }
      else{
        this.$data.singleChoiceList[index].show = 'background: red;';
      }
    },
    gotobutton2(index){
      this.$data.multiChoiceList[index].show = 'background: #00ABEA;';
    },
  },
  created() {
    this.setname=JSON.parse(this.$route.query.setname);
    this.score=JSON.parse(this.$route.query.score);
    this.singleChoiceList=JSON.parse(this.$route.query.single);
    this.multiChoiceList=JSON.parse(this.$route.query.multi);
    this.fillBlankList=JSON.parse(this.$route.query.fill);
    this.questionAnswerList=JSON.parse(this.$route.query.qa);
    for(let i=0;i<this.singleChoiceList.length;i++){
      if(this.$data.singleChoiceList[i].answer==this.$data.singleChoiceList[i].radio){
        this.$data.singleChoiceList[i].show = 'background: #00ABEA;';
      }
      else{
        this.$data.singleChoiceList[i].show = 'background: red;';
      }
    }
    for(let i=0;i<this.multiChoiceList.length;i++){
      if(this.$data.multiChoiceList[i].answer==this.$data.multiChoiceList[i].radio){
        this.$data.multiChoiceList[i].show = 'background: #00ABEA;';
      }
      else{
        this.$data.multiChoiceList[i].show = 'background: red;';
      }
    }
    for(let i=0;i<this.fillBlankList.length;i++){
      if(this.$data.fillBlankList[i].answer==this.$data.fillBlankList[i].blank){
        this.$data.fillBlankList[i].show='background: #00ABEA;';
      }
      else{
        this.$data.fillBlankList[i].show='background: red;';
      }
    }
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
  border: 1px solid rgb(228, 228, 228);
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
#view_set{
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;
  overflow: auto;
}
</style>

