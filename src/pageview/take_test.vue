<template>
  <div class="exam-detail">
    <div class="inner" style="height: 100vh">
      <div class="title">
        <Top></Top>
      </div>

      <div class="content">
        <br>
        <br>
        <el-card style="margin-left: 10px;float: left;width: 65%;background:#eeeeee">
          <div align="left" style="font-size: small;font-family: 'Adobe 宋体 Std L' ">
            <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">单项选择题</h2>
            <p style="background: #409EFF;display: block;margin-left: 150px;color: white;border-radius: 30px;padding: 10px 10px;height: 30px;width: 50px;line-height: 30px">
              <span>共</span>
              <i>10</i>
              <span>题</span>
            </p>
          </div>
          <div class="item" v-for="(i,index) in singleChoiceList " v-bind:key="index" align="left" style="background: white;margin-bottom: 5px">
            <div class="subject">{{index+1}}、{{i.question}}</div>
            <el-radio-group
              v-model="singleChoiceAnswer[index]"
              class="option"
              @change="test(singleChoiceAnswer[index])">
              <el-radio
                :label="options"
                v-for="(options,indx) in i.result"
                v-bind:key="indx">{{options.outanswer+"、"+options.outcome}}<br></el-radio>
            </el-radio-group>
          </div>
          <div align="left" style="font-size: small;font-family: 'Adobe 宋体 Std L' ">
            <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">多项选择题</h2>
            <p style="background: #409EFF;display: block;margin-left: 150px;color: white;border-radius: 30px;padding: 10px 10px;height: 30px;width: 50px;line-height: 30px">
              <span>共</span>
              <i>10</i>
              <span>题</span>
            </p>
          </div>
          <div class="item" v-for="(i,index) in multiChoiceList " v-bind:key="index" align="left" style="background: white;margin-bottom: 5px">
            <div class="subject">{{index+1}}、{{i.question}}</div>
            <el-checkbox-group
              v-model="multiChoiceAnswer[index]"

              @change="handleMultiChange">
              <el-checkbox
                v-for="options in i.result"
                :label="options"
                :key="options">{{options.outanswer+"、"+options.outcome}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div align="left" style="font-size: small;font-family: 'Adobe 宋体 Std L' ">
            <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">填空题</h2>
            <p style="background: #409EFF;display: block;margin-left: 150px;color: white;border-radius: 30px;padding: 10px 10px;height: 30px;width: 50px;line-height: 30px">
              <span>共</span>
              <i>10</i>
              <span>题</span>
            </p>
          </div>
          <div class="item" v-for="(i,index) in fillBlankList " v-bind:key="index" align="left" style="background: white;margin-bottom: 5px">
            <div class="subject">{{index+1}}、{{i.question}}</div>
            <el-radio-group
              v-model="fillBlankAnswer[index]"
              class="option"
              @change="test(fillBlankAnswer[index])">
              <el-radio
                :label="options"
                v-for="(options,indx) in i.result"
                v-bind:key="indx">{{options.outanswer+"、"+options.outcome}}<br></el-radio>
            </el-radio-group>
          </div>
          <div align="left" style="font-size: small;font-family: 'Adobe 宋体 Std L' ">
            <h2 style="padding: 0 30px;float: left;display: block;margin-bottom: 5px">问答题</h2>
            <p style="background: #409EFF;display: block;margin-left: 150px;color: white;border-radius: 30px;padding: 10px 10px;height: 30px;width: 50px;line-height: 30px">
              <span>共</span>
              <i>10</i>
              <span>题</span>
            </p>
          </div>
          <div class="item" v-for="(i,index) in questionAnswerList " v-bind:key="index" align="left" style="background: white;margin-bottom: 5px">
            <div class="subject">{{index+1}}、{{i.question}}</div>
            <el-radio-group
              v-model="questionAnswerAnswer[index]"
              class="option"
              @change="test(questionAnswerAnswer[index])">
              <el-radio
                :label="options"
                v-for="(options,indx) in i.result"
                v-bind:key="options">{{options.outanswer+"、"+options.outcome}}<br></el-radio>
            </el-radio-group>
          </div>
          <el-button type="primary">结束考试</el-button>
        </el-card>
        <el-card style="float: right;width: 30%">
          <div slot="header">
            离考试结束还有{{countdown}}
          </div>
        </el-card>
      </div>
      <div class="footer">
        <Down></Down>
      </div>

    </div>


  </div>
</template>

<script>
import Left from '../components/navigation/left.vue'
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
export default {
  name: "take_test",
  data(){
    return{
      countdown:'',
      totalTime:10,
      singleChoiceList:[
        {
          question:"如果地球对应的是球，那么煎饼对应的是？",
          answer:"A",
          result:[
            {
              outanswer:"A",
              outcome:"平坦"
            },
            {
              outanswer:"B",
              outcome:"旗子"
            },
            {
              outanswer:"C",
              outcome:"足球"
            },
            {
              outanswer:"D",
              outcome:"圆盘"
            },
          ]
        },
        {
          question:"如果地球对应的是球，那么煎饼对应的是？",
          answer:"A",
          result:[
            {
              outanswer:"A",
              outcome:"平坦"
            },
            {
              outanswer:"B",
              outcome:"旗子"
            },
            {
              outanswer:"C",
              outcome:"足球"
            },
            {
              outanswer:"D",
              outcome:"圆盘"
            },
          ]
        }
      ],
      multiChoiceList:[
        {
          question:"如果地球对应的是球，那么煎饼对应的是？",
          answer:"A",
          result:[
            {
              outanswer:"A",
              outcome:"平坦"
            },
            {
              outanswer:"B",
              outcome:"旗子"
            },
            {
              outanswer:"C",
              outcome:"足球"
            },
            {
              outanswer:"D",
              outcome:"圆盘"
            },
          ]
        }
      ],
      fillBlankList:[
        {
          question:'',
          answer:'',
        }
      ],
      questionAnswerList:[
        {
          question:'',
          answer:'',
        }
      ],
      singleChoiceAnswer:[],
      multiChoiceAnswer:[],
      fillBlankAnswer:[],
      questionAnswerAnswer:[]
    }
  },
  components:{
    Left,Top,Down
  },
  methods:{
    test(options){
      console.log(options)
      var arrSelect=this.singleChoiceAnswer;
      var rList=this.singleChoiceList;
      var arrAll=[];
      arrSelect.forEach(function (e){
        console.log(e);
        arrAll.push(e.outanswer)
      });
      rList.map((item,index)=>{
        if(arrSelect[index]){
          item.className='green-bg'
        }
      });
      this.singleChoiceList=rList;
    },
    rList(){
      var rList=this.singleChoiceList;
      var rArr=[];
      rList.map((item,index)=>{
        rArr.push(Object.assign({},item,{className:'gray-bg'}));
      });
      console.log(rArr);
      this.singleChoiceList=rArr;
    },
    handleMultiChange(){
      console.log();
    }
  },
  // created() {
  //   this.countdown=this.totalTime+'s';
  //   let clock=window.setInterval(()=>{
  //     this.totalTime--;
  //     this.countdown=this.totalTime+'s';
  //     if(this.totalTime<=0){
  //       window.clearInterval(clock);
  //     }
  //   },1000)
  // },
  mounted() {
    this.countdown=this.totalTime+'s';
    let clock=window.setInterval(()=>{
      this.totalTime--;
      this.countdown=this.totalTime+'s';
      if(this.totalTime<=0){
        window.clearInterval(clock);
      }
    },1000)
  }
}
</script>

<style scoped>
  .exam-detail{
    background: #fafafa;
    padding: 20px 0;
    box-sizing: border-box;
  }
  .title{
    margin-top: 0;
    border: 0;
    padding: 0;
  }
  .inner{
    height: 1000px;
  }
  .content{
    display: flex;
    justify-content: space-between;
    background: #fff;
    min-height: 600px;
  }
  .item{
    padding: 15px 26px;
    box-sizing: border-box;
  }
  .subject{
    margin-bottom: 20px;
  }
  el-radio{
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  ul{
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
  }
</style>
