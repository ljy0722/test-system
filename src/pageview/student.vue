<template>
  <div id="student">
    <el-container>
      <el-header>
        <Top></Top>
      </el-header>
      <el-container style="min-height: 500px;">
        <el-aside style="margin-top: 100px" width="140px">
          <div class="toggle-btn" >|||</div>
          <el-menu default-active="active" style="width: 130px" @select="handleSelect">
            <el-menu-item index="1" ><i class="el-icon-s-unfold"></i>开始练习</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-s-order"></i>题目集 </el-menu-item>
            <el-menu-item index="3"><i class="el-icon-s-release"></i>我的错题 </el-menu-item>
            <el-menu-item index="4"><i class="el-icon-s-grid"></i>数据与分析 </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="margin-top: 80px">
          <div v-if="active=='1'">
            <el-card id="create-exercise" style="width: 75%;" align="left">
              <div slot="header" style="background: lightgray;font-size: x-large;font-family: 'Adobe 黑体 Std R'">
                <span>练习生成选项</span>
              </div>
              <div style="width: 30%;margin-left: 15px">
                <p>题量设置</p>
                <el-input v-model="exercise.danxuan" placeholder="单选题"></el-input>
                <el-input v-model="exercise.duoxuan" placeholder="多选题"></el-input>
                <el-input v-model="exercise.tiankong" placeholder="填空题"></el-input>
                <el-input v-model="exercise.wenda" placeholder="问答题"></el-input>
              </div>
              <el-divider></el-divider>
              <div style="width: 30%;margin-left: 15px">
                <p>选择科目</p>
                <el-select v-model="exercise.subject" @change="getRange">
                  <el-option
                    v-for="item in subjects"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
              </div>
              <el-divider></el-divider>
              <div style="width: 30%;margin-left: 15px">
                <p>选择考点</p>
                <el-select v-model="exercise.range" multiple>
                  <el-option
                    v-for="item in ranges"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
              </div>
              <el-divider></el-divider>
              <div style="width: 30%;margin-left: 15px">
                <p>练习时长</p>
                <el-input v-model="exercise.time"><template slot="append">分钟</template></el-input>
              </div>
              <el-divider></el-divider>
              <div style="width: 30%;margin-left: 15px">
                <el-button type="primary" @click="submitTestRequirement">开始练习</el-button>
              </div>
            </el-card>
          </div>
          <div v-if="active=='2'">
            <el-row>
              <el-col :span="1">
                <div style="width: 50px;margin-top: 10px">排序:</div>
              </el-col>
              <el-col :span="3">
                <el-select v-model="sortvalue" placeholder="排序方式" @change="getStudentExercise">
                  <el-option
                    v-for="item in sortInfo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1" :offset="1">
                <div style="width: 50px;margin-top: 10px">筛选:</div>
              </el-col>
              <el-col :span="3">
                <el-select v-model="shaixuan" placeholder="筛选方式" @change="getStudentExercise">
                  <el-option
                    v-for="item in shaixuanInfo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1" :offset="1">
                <div style="width: 50px;margin-top: 10px">分类:</div>
              </el-col>
              <el-col :span="3">
                <el-select v-model="setType" placeholder="分类方式" @change="getStudentExercise">
                  <el-option
                    v-for="item in setTypeInfo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-card style="margin-bottom: 5px;height: 60px"
                     v-for="(i,index) in exerciseSets"
                     v-bind:key="index"
                     >
              <el-row style="margin-top: -15px">
                <el-button type="text"  style="font-size: large;font-size: 17px;color: dodgerblue;margin-left: 20px;float: left" @click="viewSet(i.exerciseId,i.state,i.timeState,i.endTime)"> {{ i.exerciseName }}</el-button>
                <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: yellowgreen;color: white;padding: 0 10px;border-radius: 20%" v-if="i.timeState==='1'">未开始</span></i>
                <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: dodgerblue;color: white;padding: 0 10px;border-radius: 20%" v-if="i.timeState==='2'">正在进行</span></i>
                <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: #868686;color: white;padding: 0 10px;border-radius: 20%" v-if="i.timeState==='3'">已结束</span></i>
              </el-row>
              <el-row style="margin-top: -5px;float: right">
                <span style="float: left;font-size: small">起止时间：{{i.startTime}}--{{i.endTime}}</span>
              </el-row>
            </el-card>
            <div class="block">
              <el-pagination
                @current-change="change0"
                :hide-on-single-page="true"
                layout="prev, pager, next"
                :page-size=20
                :total="totalSets">
              </el-pagination>
            </div>
          </div>
          <div v-if="active=='3'">
            <el-tabs type="border-card" >
              <el-tab-pane label="单选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchWrongPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getWrongQuestion">搜索</el-button>
                  </el-col>
                </el-row>

                <el-table
                  :data="wrongProblemSingle"
                  ref="wrongProblem"
                  style="width: 100%;white-space: pre-line">
                  <el-table-column
                    prop="id"
                    label="题号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="内容"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="270">
                  </el-table-column>
                  <el-table-column
                    prop="answerA"
                    label="选项A"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerB"
                    label="选项B"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerC"
                    label="选项C"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerD"
                    label="选项D"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerE"
                    label="选项E"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answer"
                    label="正确答案">
                  </el-table-column>
                  <el-table-column
                    prop="myanswer"
                    label="我的答案"
                    style="text-line-through-color: red">
                  </el-table-column>
                  <el-table-column
                    fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="deletewrong(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change1"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalWrongSingle">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="多选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchWrongPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getWrongQuestion">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="wrongProblemMulti"
                  ref="wrongProblem"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="题号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="内容"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="270">
                  </el-table-column>
                  <el-table-column
                    prop="answerA"
                    label="选项A"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerB"
                    label="选项B"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerC"
                    label="选项C"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerD"
                    label="选项D"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answerE"
                    label="选项E"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="answer"
                    label="正确答案">
                  </el-table-column>
                  <el-table-column
                    prop="myanswer"
                    label="我的答案">
                  </el-table-column>
                  <el-table-column
                    fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="deletewrong(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change2"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalWrongMulti">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="填空题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchWrongPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getWrongQuestion">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="wrongProblemFill"
                  ref="wrongProblem"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="题号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="内容"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="350">
                  </el-table-column>
                  <el-table-column
                    prop="answer"
                    label="正确答案">
                  </el-table-column>
                  <el-table-column
                    prop="myanswer"
                    label="我的答案">
                  </el-table-column>
                  <el-table-column
                    fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="deletewrong(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change3"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalWrongFill">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="问答题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchWrongPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getWrongQuestion">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="wrongProblemQa"
                  ref="wrongProblem"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="题号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="内容"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="350">
                  </el-table-column>
                  <el-table-column
                    prop="answer"
                    label="正确答案">
                  </el-table-column>
                  <el-table-column
                    align="fixed">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="deletewrong(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change4"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalWrongQa">
                  </el-pagination>
                </div>
              </el-tab-pane>

            </el-tabs>
          </div>
          <div v-if="active=='4'" align="left">
            <el-col :span="8">
              <span style="font-size: x-large">练习数据</span>
              <br>
              <el-card class="exer-info" style="width: 100%;margin-top: 10px">
                <div style="font-size: x-large">{{user.exer_num}}</div>
                <br>
                <div>
                  <span style="color: #868686">做过的题目数</span>
                </div>
              </el-card>
              <el-card class="exer-info" style="width: 100%;margin-top: 10px">
                <div style="font-size: x-large">{{user.test_num}}</div>
                <br>
                <div>
                  <span style="color: #868686">完成的考试数</span>
                </div>
              </el-card>
              <el-card class="exer-info" style="width: 100%;margin-top: 10px">
                <div style="font-size: x-large">{{user.practiceAttendedNum}}</div>
                <br>
                <div>
                  <span style="color: #868686">完成的练习数</span>
                </div>
              </el-card>
              <el-card class="exer-info" style="width: 100%;margin-top: 10px">
                <div style="font-size: x-large">{{user.wrong_num}}</div>
                <br>
                <div>
                  <span style="color: #868686">错题数</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" :offset="2">
              <span style="font-size: x-large">分析与总结</span>
              <br>
              <br>
              <chart3 :xaxis="[1,2,3,4,5]" :yaxis="[50,60,30,90,100]"></chart3>
              <chart4 :value1=user.typeNum[0] :value2=user.typeNum[1] :value3=user.typeNum[2] :value4=user.typeNum[3]></chart4>
              <br>
              <Chart5></Chart5>
            </el-col>
          </div>
        </el-main>
      </el-container>
      <el-footer>
        <Down></Down>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
import Chart3 from './chart/chart3'
import Chart4 from './chart/chart4'
import Chart5 from './chart/chart5'
import axios from "axios";

export default {
  name: "student",
  data(){
    return{
      active:'',
      totalSets:1,
      pageSets:1,
      totalWrongSingle:1,
      totalWrongMulti:1,
      totalWrongFill:1,
      totalWrongQa:1,
      pageWrongSingle:1,
      pageWrongMulti:1,
      pageWrongFill:1,
      pageWrongQa:1,
      selectSubject:null,
      subjects:[],
      ranges:[],
      searchSubject:null,
      searchRange:null,
      searchWrongPro:null,
      exercise:{
        danxuan:'',
        duoxuan:'',
        tiankong:'',
        wenda:'',
        subject:'',
        range:[],
        time:'',
        startTimeS:'',
        endTimeS:'',
      },
      exerciseSets:[],
      wrongProblemSingle:[
        {
          id:'1',
          subject:'中医学基础',
          contentType:'绪论',
          type:'单项选择题',
          question:'我国现存最早的医学专著是（  ）',
          option:'A．《五十二病方》\nB．《神农本草经》\nC．《黄帝内经》\nD．《中藏经》\nE．《难经》',
          answer:'A',
          myanswer:'B',
          score:'2'
        },
      ],
      wrongProblemMulti:[
        {
          id:'700',
          subject:'温病学',
          contentType:'温病的辩证',
          type:'多项选择题',
          question:'肾阴耗损证的辨证要点是：',
          option:'A．手指蠕动或瘛疭，舌干绛而萎，脉虚\nB．夜热早凉，热退无汗，能食消瘦，舌红苔少\nC．手足心热甚于手足背，口燥咽干，舌绛不鲜，干枯而萎，脉虚\nD．神昏肢厥，舌绛\nE．神志时清时寐，舌苔垢腻',
          answer:'AC',
          myanswer: 'AB',
          score: '2'
        },
      ],
      wrongProblemFill:[
        {
          id:'3',
          subject:'中药',
          contentType:'基础',
          type:'填空题',
          question:'《金匮要略》约成书于________年，是我国现存最早的一部________的专书，作者是我国________著名医学家',
          option:'',
          answer:'公元205 诊治杂病 东汉 张仲景（张机）',
          score: '4'
        }
      ],
      wrongProblemQa:[

      ],
      search:'',
      user:{
        exer_num:10,
        test_num:5,
        wrong_num:20,
        practiceAttendedNum:10,
        typeNum:[0,0,0,0]
      },
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      },
      sortvalue:'1',
      sortInfo:[
        {
          value:'1',
          label:'最早开始',
        },
        {
          value:'2',
          label:'最早结束',
        },
        {
          value:'3',
          label:'最晚开始',
        },
        {
          value:'4',
          label:'最晚结束',
        },
      ],
      shaixuan:'',
      shaixuanInfo:[
        {
          value:'1',
          label:'未开始',
        },
        {
          value:'2',
          label:'正在进行',
        },
        {
          value: '3',
          label: '已完成',
        },
        {
          value: '',
          label: '全部',
        }
      ],
      setType:false,
      setTypeInfo:[
        {
          value:false,
          label:'我的练习'
        },
        {
          value:true,
          label: '我的考试'
        },
      ]
    }
  },
  methods:{
    handleSelect:function (key,keyPath){
      switch (key){
        case '1':
          this.active='1';
          console.log(1);
          break;
        case '2':
          this.active='2';
          console.log(2);
          this.getStudentExercise();
          break;
        case '3':
          this.active='3';
          console.log(3);
          this.getWrongQuestion();
          break;
        case '4':
          this.active='4';

          console.log(4);
          break;
      }
    },
    getStuInfo(){
      axios({
        url:"/user/exerciseInfo",
      }).then(res=>{
        this.user.exer_num=res.data.correctNum+res.data.wrongNum;
        this.user.test_num=res.data.testAttendedNum;
        this.user.wrong_num=res.data.wrongNum;
        this.user.practiceAttendedNum=res.data.practiceAttendedNum;
        for(let i=0;i<res.data.typeStatistics.length;i++){
          if(res.data.typeStatistics[i].type==="单项选择题"){
            this.user.typeNum[0]=res.data.typeStatistics[i].number;
          }
          if(res.data.typeStatistics[i].type==="多项选择题"){
            this.user.typeNum[1]=res.data.typeStatistics[i].number;
          }
          if(res.data.typeStatistics[i].type==="填空题"){
            this.user.typeNum[2]=res.data.typeStatistics[i].number;
          }
          if(res.data.typeStatistics[i].type==="问答题"){
            this.user.typeNum[3]=res.data.typeStatistics[i].number;
          }
        }
        console.log(this.user.typeNum[0]);
        console.log(this.user.typeNum[1]);
      })
    },
    getStudentExercise(){
      axios({
        url:"/exercise/getStudentExercise",
        params:{
          pageNum:this.pageSets,
          test:this.setType,
          state:Number(this.shaixuan)-1,
          order:this.sortvalue
        }
      }).then(res=>{
        this.exerciseSets=res.data.data;
        for(let i=0;i<this.exerciseSets.length;i++){
          if(this.exerciseSets[i].test===false){
            this.exerciseSets[i].exerciseName="练习题"+this.exerciseSets[i].exerciseName.slice(-28,-9);
          }
          this.exerciseSets[i].endTime=new Date((+new Date(this.exerciseSets[i].endTime))+8*3600*1000).Format("yyyy-MM-dd hh:mm:ss");
          this.exerciseSets[i].startTime=new Date((+new Date(this.exerciseSets[i].startTime))+8*3600*1000).Format("yyyy-MM-dd hh:mm:ss");
          //this.exerciseSets[i].endTime=this.exerciseSets[i].endTime.slice(0,10)+" "+this.exerciseSets[i].endTime.slice(11,19);
          //this.exerciseSets[i].startTime=this.exerciseSets[i].startTime.slice(0,10)+" "+this.exerciseSets[i].startTime.slice(11,19);
          var now=new Date();
          //let nowTime=now.getFullYear()+"-"+String(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
          let nowTime=now.Format("yyyy-MM-dd hh:mm:ss");
          console.log(nowTime);
          if(nowTime<this.exerciseSets[i].startTime){
            this.exerciseSets[i]["timeState"]='1';
          }
          else if(nowTime<this.exerciseSets[i].endTime){
            this.exerciseSets[i]["timeState"]='2';
          }
          else{
            this.exerciseSets[i]["timeState"]='3';
          }
        }

        this.totalSets=res.data.total;
      })
    },
    viewSet(id,state,timeState,end) {
      if(timeState==='1'){
        alert("题目集未到开放时间！");
      }
      else if(timeState==='2'&&(state==='D'||state==='U')){
        axios({
          url:"/test/take",
          params:{
            exerciseId:id
          }
        })
        .then(res=>{
          var lasttime=res.data.lastTime;
          const hourTime = parseInt(lasttime.slice(0,2));
          const minuteTime = parseInt(lasttime.slice(3,5));
          let t=hourTime*60+minuteTime;
          var now=new Date();
          var hh=now.getHours()+parseInt(parseInt(t)/60);
          if(hh>=24){
            hh=hh-24;
          }
          var mm=now.getMinutes()+parseInt(t)%60;
          var ss=now.getSeconds();
          if(mm>=60){
            mm=mm-60;
            hh=hh+1;
          }
          let endTime=("0"+hh).slice(-2)+":"+("0"+mm).slice(-2)+":"+("0"+ss).slice(-2);
          console.log(endTime);
          let end1=end.slice(11,19);
          console.log(end1);
          // if(endTime>end1){
          //   endTime=end1
          // }
          console.log(endTime);
          this.$router.push({name:'test',params:{endTime:endTime,exerciseInfo:JSON.stringify(res.data)}});
        })
      }
      else{
        axios({
          url:"exercise/viewresult",
          params:{
            exerciseId:id
          }
        })
        .then(res=>{
          var now=new Date();
          var hh=now.getHours()+parseInt(parseInt("50")/60);
          var mm=now.getMinutes()+parseInt("50")%60;
          var ss=now.getSeconds();
          if(mm>=60){
            mm=mm-60;
            hh=hh+1;
          }
          var endTime=hh+":"+mm+":"+ss;
          this.$router.push({name:'test',params:{endTime:endTime,exerciseInfo:JSON.stringify(res.data)}});
        })
      }
    },
    submitTestRequirement(){
      this.exercise.startTimeS='2022-1-1 22:30:00'
      this.exercise.endTimeS='2030-1-1 20:00:00'
      axios({
        url:"/exercise/createExercise",
        method:"POST",
        data:this.exercise,
        headers:{
          'Content-type':'application/json'
        },
      })
        .then(res=>{
          var now=new Date();
          var hh=now.getHours()+parseInt(parseInt(this.exercise.time)/60);
          var mm=now.getMinutes()+parseInt(this.exercise.time)%60;
          var ss=now.getSeconds();
          if(mm>=60){
            mm=mm-60;
            hh=hh+1;
          }
          var endTime=hh+":"+mm+":"+ss;
          this.$router.push({name:'test',params:{endTime:endTime,exerciseInfo:JSON.stringify(res.data)}});
        })
      console.log(this.exercise)
      //this.$router.push({path:'/test',query:{time:this.exercise.time}})
    },
    getAnswerInfo() {
      //分页查询所有试卷信息
      this.$axios(`/api/students/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data;
      }).catch(error => {});
    },
    getWrongQuestion(){
      axios.all([
        axios({url:"/problem/wrongquestion",params:{page:this.pageWrongSingle,keyWords:this.searchWrongPro,subject:this.searchSubject,contentType:this.searchRange,type:'单项选择题'}}),
        axios({url:"/problem/wrongquestion",params:{page:this.pageWrongMulti,keyWords:this.searchWrongPro,subject:this.searchSubject,contentType:this.searchRange,type:'多项选择题'}}),
        axios({url:"/problem/wrongquestion",params:{page:this.pageWrongFill,keyWords:this.searchWrongPro,subject:this.searchSubject,contentType:this.searchRange,type:'填空题'}}),
        axios({url:"/problem/wrongquestion",params:{page:this.pageWrongQa,keyWords:this.searchWrongPro,subject:this.searchSubject,contentType:this.searchRange,type:'问答题'}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        this.wrongProblemSingle=single.data.data;
        this.wrongProblemMulti=multi.data.data;
        this.wrongProblemFill=fill.data.data;
        this.wrongProblemQa=qa.data.data;
        this.totalWrongSingle=single.data.total;
        this.totalWrongMulti=multi.data.total;
        this.totalWrongFill=fill.data.total;
        this.totalWrongQa=qa.data.total;
        //console.log("返回错题")
      }))
    },

    change0(val){
      this.pageSets=val;
      this.getStudentExercise();
    },
    change1(val){
      this.pageWrongSingle=val;
      this.getWrongQuestion();
    },
    change2(val){
      this.pageWrongMulti=val;
      this.getWrongQuestion();
    },
    change3(val){
      this.pageWrongFill=val;
      this.getWrongQuestion();
    },
    change4(val){
      this.pageWrongQa=val;
      this.getWrongQuestion();
    },
    deletewrong(id){
      axios({
        url:"/problem/deletewrong",
        params:{
          problemId:id,
        }
      }).then(res=>{
        this.getWrongQuestion();
      })
    },
    checkGrade(studentId) {
      this.$router.push({ path: "/grade", query: { studentId: studentId } });
    },
    sortBy(value){
      console.log(value);
      if(value=='1'){
        let needSort=[{"endTime":"desc"}];
        this.exerciseSets=this.sortForList(this.exerciseSets,needSort);
        console.log(this.exerciseSets)
      }
      if(value=='2'){
        let needSort=[{"endTime":"asc"}];
        this.exerciseSets=this.sortForList(this.exerciseSets,needSort);
        console.log(this.exerciseSets)
      }
    },
    sortForList(arr, needSorts) {
    this.reverse(needSorts);//反转待排序字段, 从后往前排
    for (let i = 0; i < needSorts.length; i++) {
      const item = needSorts[i];
      const sortByStr = Object.keys(item)[0];///正在排序的字段
      const sortBy = Object.values(item)[0];//按照升/降序排序
      for (let j = 0; j < arr.length; j++) {//冒泡排序
        for (let k = 0; k < arr.length - 1 - j; k++) {
          let val1 = arr[k][sortByStr];
          let val2 = arr[k+1][sortByStr];
          if(sortBy==="desc"){//降序
            if (val1 < val2) {
              let tmp = arr[k];
              arr[k] = arr[k+1];
              arr[k+1] = tmp;
            }
          }else{//升序
            if (val1 > val2) {
              let tmp = arr[k];
              arr[k] = arr[k+1];
              arr[k+1] = tmp;
            }
          }
        }
      }
    }
    return arr;
  },
  reverse(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
      const item = arr[i];
      arr[i] = arr[arr.length - i - 1];
      arr[arr.length - i - 1] = item;
    }
  },
    getRange(){
      axios({
        url:"/problem/ranges",
        params:{
          subject:this.exercise.subject
        }
      }).then(res=>{
        this.ranges=res.data;
        this.ranges.shift();
      })
    }

  },
  components:{Top,Down,Chart3,Chart4,Chart5},
  computed:{
    // exerciseSetsFilter(shaixuan){
    //   if(shaixuan=='1'){
    //     let _this=this;
    //     let exer= _this.exerciseSets.filter(item=>item.state==='1').reverse();
    //     return exer;
    //   }
    // },
    // table1() {
    //   //const search1='单项选择题';
    //   const search=this.search;
    //   if(search!=''){
    //     return this.wrongProblemSingle.filter(data=>{
    //       return Object.keys(data).some(key=>{
    //         return String(data[key]).toLowerCase().indexOf(search)>-1
    //       })
    //     })
    //   }
    //   return this.wrongProblemSingle;
    // },
    // table2() {
    //   //const search='多项选择题'
    //   const search=this.search;
    //   if(search!=''){
    //     return this.wrongProblemMulti.filter(data=>{
    //       return Object.keys(data).some(key=>{
    //         return String(data[key]).toLowerCase().indexOf(search)>-1
    //       })
    //     })
    //   }
    //   return this.wrongProblemMulti;
    // },
    // table3() {
    //   //const search='填空题'
    //   const search=this.search;
    //   if(search!=''){
    //     return this.wrongProblemFill.filter(data=>{
    //       return Object.keys(data).some(key=>{
    //         return String(data[key]).toLowerCase().indexOf(search)>-1
    //       })
    //     })
    //   }
    //   return this.wrongProblemFill;
    // },
    // table4() {
    //   //const search='问答题'
    //   const search=this.search;
    //   if(search!=''){
    //     return this.wrongProblemQa.filter(data=>{
    //       return Object.keys(data).some(key=>{
    //         return String(data[key]).toLowerCase().indexOf(search)>-1
    //       })
    //     })
    //   }
    //   return this.wrongProblemQa;
    // },
  },
  created() {
    axios({
      url:"/problem/allsubjects",
    }).then(res=>{
      this.subjects=res.data;
      this.subjects.shift();
    })
    this.getStuInfo();
  }
}
</script>

<style>
#student{
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;

}
.toggle-btn{
  width: 130px;
  background: dimgrey;
  font-size:10px;
  line-height:24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor:pointer;
}
.el-table.cell{
  white-space: pre-line;
}

</style>
