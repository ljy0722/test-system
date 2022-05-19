<template>
  <div id="view_set">
    <el-header style="padding: 0">
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
                      <span style="float: right;color: red">得分：{{score}}</span>
                    </el-header>
                    <el-main>
                      <el-row style="background: #ffffff;border-radius: 10px">
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">单项选择题</h2>
                          <p style="background: #ade1f7;font-size: medium;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 70px;line-height: 30px">
                            <span>共</span>
                            <i>{{singleChoiceList.length}}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classa${index+1}`" v-for="(item,index) in singleChoiceList" :key="'single'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button size="mini" class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.problemInfo.question}}
                            </el-row>
                            <el-row style="margin-top: 20px;" v-for="(citem,indx) in item.problemInfo.result" :key="indx">
                              <a @click="gotobutton1(index)">
                                <el-radio v-model="item.myAnswer" :label="citem.outanswer">{{citem.outcome}}</el-radio>
                              </a>
                            </el-row>
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.problemInfo.answer}}
                            </el-row>
                            <el-row style="color: red;margin-top: 10px">
                              得分：{{item.fenzhi}}
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">多项选择题</h2>
                          <p style="background: #ade1f7;font-size: medium;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 70px;line-height: 30px">
                            <span>共</span>
                            <i>{{ multiChoiceList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classb${index+1}`" v-for="(item,index) in multiChoiceList" :key="'multi'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button size="mini" class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.problemInfo.question}}
                            </el-row>
                            <el-row style="margin-top: 20px;" v-for="(citem,indx) in item.problemInfo.result" :key="indx">
                              <a @click="gotobutton2(index)">
                                <el-checkbox-group v-model="item.myAnswer">
                                  <el-checkbox  :label="citem.outanswer">{{citem.outcome}}</el-checkbox>
                                </el-checkbox-group>

                              </a>
                            </el-row>
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.problemInfo.answer}}
                            </el-row>
                            <el-row style="color: red;margin-top: 10px">
                              得分：{{item.fenzhi}}
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">填空题</h2>
                          <p style="background: #ade1f7;font-size: medium;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 70px;line-height: 30px">
                            <span>共</span>
                            <i>{{ fillBlankList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row :class="`classc${index+1}`" v-for="(item,index) in fillBlankList" :key="'fill'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button size="mini" class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.problemInfo.question}}
                            </el-row>
                            <el-input v-model="item.myAnswer"></el-input>
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.problemInfo.answer}}
                            </el-row>
                            <el-row style="color: red;margin-top: 10px">
                              得分：{{item.fenzhi}}
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row>
                          <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">问答题</h2>
                          <p style="background: #ade1f7;font-size: medium;display: block;margin-left: 200px;color: white;border-radius: 30px;padding: 10px 30px;height: 30px;width: 70px;line-height: 30px">
                            <span>共</span>
                            <i>{{ questionAnswerList.length }}</i>
                            <span>题</span>
                          </p>
                        </el-row>
                        <el-divider style="height: 10px"></el-divider>
                        <el-row :class="`classd${index+1}`" v-for="(item,index) in questionAnswerList" :key="'qa'+index" style="margin-bottom: 20px;">
                          <el-col :span="2">
                            <el-button size="mini" class="i_style">{{index+1}}</el-button>
                          </el-col>
                          <el-col :span="21">
                            <el-row style="border-bottom: 1px solid rgb(228,228,228);line-height: 40px;height: 40px;">
                              {{item.problemInfo.question}}
                            </el-row>
                            <el-input v-model="item.myAnswer"></el-input>
                            <el-row style="color: dodgerblue;margin-top: 20px">
                              正确答案：{{item.problemInfo.answer}}
                            </el-row>
                            <el-row style="color: red;margin-top: 10px">
                              得分：{{item.fenzhi}}
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-row style="margin-top: 60px;text-align: center;">
                          <el-col>
                            <div>
                              <el-button @click="back" type="primary" style="border-radius: 10px">返回</el-button>
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
            <el-container style="background: #EEE8D5;border-radius: 10px;margin-right: 50px;margin-top: -60px;height: 80%;position:fixed;min-width: 250px">
              <el-header class="header_style" style="line-height: 40px;height: 40px;background-color: lightblue"><span style="font-size: large;font-family: 'Adobe 黑体 Std R'">答题卡</span></el-header>
              <el-main class="content_style">
                <el-row style="margin-top: -15px;">
                  单项选择题
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-button size="mini" @click="Submit1(index+1)" class="button_style" v-for="(item,index) in singleChoiceList" :key="index" :style="item.show"><span style="color: #f0f0f0">{{index+1}}</span></el-button>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top: -15px;">
                  多项选择题
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-button size="mini" @click="Submit2(index+1)" class="button_style" v-for="(item,index) in multiChoiceList" :key="index" :style="item.show"><span style="color: #f0f0f0">{{index+1}}</span></el-button>
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
    <el-footer style="padding: 0">
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
      showModal: false,
      setname:'',
      score: '',
      singleChoiceList: [],
      multiChoiceList:[],
      fillBlankList:[],
      questionAnswerList:[],
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
      axios({
        url:"/user/userInfo",
      }).then(res=>{
        if(res.data.type==='S'){
          this.$router.push({path:'/student'})
        }
        else{
          this.$router.go(-1);
        }
      })

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
        this.$data.singleChoiceList[index].show = 'background: #e14545;';
      }
    },
    gotobutton2(index){
      this.$data.multiChoiceList[index].show = 'background: #00ABEA;';
    },
  },
  created() {
    this.setname=this.$route.params.setname;
    this.score=this.$route.params.grade;
    this.singleChoiceList=JSON.parse(this.$route.params.single);
    this.multiChoiceList=JSON.parse(this.$route.params.multi);
    console.log(this.multiChoiceList);
    this.fillBlankList=JSON.parse(this.$route.params.fill);
    this.questionAnswerList=JSON.parse(this.$route.params.qa);
    for(let i=0;i<this.singleChoiceList.length;i++){
      if(this.singleChoiceList[i].correct===true){
        this.singleChoiceList[i]["show"] = 'background: #00ABEA;color:write;';
      }
      else{
        this.singleChoiceList[i]["show"] = 'background: #d47373;';
      }
    }
    for(let i=0;i<this.multiChoiceList.length;i++){
      if(this.multiChoiceList[i].correct===true){
        this.multiChoiceList[i]["show"] = 'background: #00ABEA;';
      }
      else{
        this.multiChoiceList[i]["show"] = 'background: #d47373;';
      }
      var radio=this.multiChoiceList[i].myAnswer.split(" ");
      this.multiChoiceList[i].myAnswer=radio;
    }
    for(let i=0;i<this.fillBlankList.length;i++){
      if(this.fillBlankList[i].correct===true){
        this.fillBlankList[i]["show"]='background: #00ABEA;';
      }
      else{
        this.fillBlankList[i]["show"]='background: #d47373;';
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
  background: #ade1f7;
  font-weight: bold;
  border-radius: 13px;
  margin-top: 8px;
  margin-left: 5px;
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
}
</style>

