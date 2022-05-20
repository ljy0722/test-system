<template>
  <div id="test-create">
    <div>
      <el-row style="padding: 0">
        <Top></Top>
      </el-row>
      <el-row>
        <el-col :span="1" :offset="2">
          <br>
          <br>
          <el-button @click="back">返回</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 80%" :offset="2">
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <div align="middle">
            <el-row><p></p></el-row>
            <el-row><p></p></el-row>
            <el-card style="border-radius: 10px">
              <div class="step1">
                <el-row>
                  <el-col :span="3"><span style="margin-left: 10px;vertical-align:middle">习题集名称：</span></el-col>
                  <el-col :span="6" align="left"><el-input v-model="testname"></el-input></el-col>
                </el-row>
                <br>
                <br>
                <el-row>
                  <el-col :span="3"><span style="margin-left: 10px;vertical-align:middle">组题方式：</span></el-col>
                  <el-col :span="6" align="left"><el-select v-model="method1">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select></el-col>
                </el-row>
                <el-row><p></p></el-row>
                <el-row><p></p></el-row>
                <el-row>
                  <el-col :span="3"><span style="margin-left: 10px;vertical-align:middle">起止时间：</span></el-col>
                  <el-col :span="6"><el-date-picker type="datetimerange" range-separator="至" v-model="time1" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" >
                  </el-date-picker></el-col>
                </el-row>
                <el-row><p></p></el-row>
                <el-row><p></p></el-row>
                <el-row>
                  <el-col :span="3"><span style="margin-left: 10px;vertical-align:middle">考试时长：</span></el-col>
                  <el-col :span="5" align="left"><el-input-number v-model="time2"><template slot="append">分钟</template></el-input-number></el-col>
                  <el-col :span="3" align="left"><span style="margin-left: 10px;vertical-align:middle">分钟</span></el-col>
                </el-row>
              </div>
            </el-card>
            <br>
            <el-card style="border-radius: 10px" v-if="method1=='zidong'||method1=='shoudong'">
              <div class="step2.1" v-if="method1=='zidong'" style="" align="left">

                <div style="width: 50%" align="left">
                  <p style="margin-left: 20px">   选择科目</p>
                  <el-row>
                    <span style="margin-left: 20px">科目:</span>
                    <el-select v-model="autoSubject" @change="getRanges" style="margin-left: 8%">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-row>

                </div>
                <el-divider></el-divider>
                <div style="width: 50%" align="left">
                  <p style="margin-left: 20px">   选择考点</p>
                  <el-row>
                    <span style="margin-left: 20px">考点:</span>
                    <el-select v-model="autoRange" multiple style="margin-left: 8%">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-row>

                </div>
                <el-divider></el-divider>
                <div style="margin-left: 15px;width: 60%;" >
                  <p align="left">题量设置</p>
                  <p style="font-size: 10px;color: grey">若系统在该考点下的某题型数量小于您所选择的数量，将提供最大数量</p>
                  <el-row>
                    <span>单项选择题:</span>
                    <el-input-number controls-position="right" min="0" max="20" style="width: 30%;margin-bottom: 6px" v-model="danxuan"  placeholder="单选题数量"></el-input-number>
                  </el-row>
                  <el-row>
                    <span>多项选择题:</span>
                    <el-input-number controls-position="right"  min="0" max="20" style="width: 30%;margin-bottom: 6px" v-model="duoxuan" placeholder="多选题数量"></el-input-number>
                  </el-row>
                  <el-row>
                    <span>填空题:</span>
                    <el-input-number controls-position="right" min="0" max="20" style="width: 30%;margin-bottom: 6px;margin-left: 33px" v-model="tiankong" placeholder="填空题数量"></el-input-number>
                  </el-row>
                  <el-row>
                    <span>问答题:</span>
                    <el-input-number controls-position="right" min="0" max="20" style="width: 30%;margin-bottom: 6px;margin-left: 33px" v-model="wenda" placeholder="问答题数量"></el-input-number>
                  </el-row>
                </div>

              </div>
              <br>
              <br>

              <div class="step2.2" v-if="method1=='shoudong'">
                <el-tabs type="border-card" >
                  <el-tab-pane label="单选题">
                    <el-row>
                      <el-col :span="3">
                        <el-select v-model="selectSubject" placeholder="选择学科" style="float: left" align="left" @change="getRanges">
                          <el-option
                            v-for="item in subjects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="1">
                        <el-select v-model="selectRange" placeholder="选择范围" style="float: left" align="left">
                          <el-option
                            v-for="item in ranges"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input v-model="search" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                      <el-col :span="1" :offset="1">
                        <el-button type="primary" @click="getTeacherProblems">搜索</el-button>
                      </el-col>
                    </el-row>

                    <el-table
                      :data="SingleProblem"
                      ref="list1"
                      style="width: 100%"
                      row-key="id"
                      >
                      <el-table-column
                        fixed="left"
                        type="selection"
                        width="55"
                        :reserve-selection="true">
                      </el-table-column>
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
                        label="答案">
                      </el-table-column>
                      <el-table-column
                        prop="difficultScore"
                        label="难度"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="source"
                        label="来源"
                        width="150">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                      <el-pagination
                        @current-change="change1"
                        :hide-on-single-page="true"
                        layout="prev, pager, next"
                        :total="totalSingle">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="多选题">
                    <el-row>
                      <el-col :span="3">
                        <el-select v-model="selectSubject" placeholder="选择学科" style="float: left" align="left" @change="getRanges">
                          <el-option
                            v-for="item in subjects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="1">
                        <el-select v-model="selectRange" placeholder="选择范围" style="float: left" align="left">
                          <el-option
                            v-for="item in ranges"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                      <el-col :span="1" :offset="1">
                        <el-button type="primary" @click="getTeacherProblems">搜索</el-button>
                      </el-col>
                    </el-row>
                    <el-table
                      :data="MultiProblem"
                      ref="list2"
                      row-key="id"
                      style="width: 100%">
                      <el-table-column
                        fixed="left"
                        type="selection"
                        width="55"
                        :reserve-selection="true">
                      </el-table-column>
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
                        label="答案">
                      </el-table-column>
                      <el-table-column
                        prop="difficultScore"
                        label="难度"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="source"
                        label="来源"
                        width="150">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                      <el-pagination
                        @current-change="change2"
                        :hide-on-single-page="true"
                        layout="prev, pager, next"
                        :total="totalMulti">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="填空题">
                    <el-row>
                      <el-col :span="3">
                        <el-select v-model="selectSubject" placeholder="选择学科" style="float: left" align="left" @change="getRanges">
                          <el-option
                            v-for="item in subjects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="1">
                        <el-select v-model="selectRange" placeholder="选择范围" style="float: left" align="left">
                          <el-option
                            v-for="item in ranges"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                      <el-col :span="1" :offset="1">
                        <el-button type="primary" @click="getTeacherProblems">搜索</el-button>
                      </el-col>
                    </el-row>
                    <el-table
                      :data="FillProblem"
                      ref="list3"
                      style="width: 100%"
                      row-key="id">
                      <el-table-column
                        fixed="left"
                        type="selection"
                        width="55"
                        :reserve-selection="true">
                      </el-table-column>
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
                        label="答案">
                      </el-table-column>
                      <el-table-column
                        prop="difficultScore"
                        label="难度"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="source"
                        label="来源"
                        width="150">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                      <el-pagination
                        @current-change="change3"
                        :hide-on-single-page="true"
                        layout="prev, pager, next"
                        :total="totalFill">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="问答题">
                    <el-row>
                      <el-col :span="3">
                        <el-select v-model="selectSubject" placeholder="选择学科" style="float: left" align="left" @change="getRanges">
                          <el-option
                            v-for="item in subjects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="1">
                        <el-select v-model="selectRange" placeholder="选择范围" style="float: left" align="left">
                          <el-option
                            v-for="item in ranges"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                      <el-col :span="1" :offset="1">
                        <el-button type="primary" @click="getTeacherProblems">搜索</el-button>
                      </el-col>
                    </el-row>
                    <el-table
                      :data="QaProbelm"
                      ref="list4"
                      style="width: 100%"
                      row-key="id">
                      <el-table-column
                        fixed="left"
                        type="selection"
                        width="55"
                        :reserve-selection="true">
                      </el-table-column>
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
                        label="答案">
                      </el-table-column>
                      <el-table-column
                        prop="difficultScore"
                        label="难度"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="source"
                        label="来源"
                        width="150">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                      <el-pagination
                        @current-change="change4"
                        :hide-on-single-page="true"
                        layout="prev, pager, next"
                        :total="totalQa">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-card>
            <br>
            <el-card style="border-radius: 10px">
              <div class="step3" align="left">
                <span>授权用户组</span>
                <el-divider></el-divider>
                <el-card style="margin-bottom: 5px"
                         v-for="(i,index) in user_groups"
                         v-bind:key="index">
                  <div style="margin-top: -15px">
                    <el-button type="text" style="float: left;color: black">{{ i.groupName }}</el-button>
                    <el-checkbox size="medium" style="float: right;margin-top: 5px" @change="checked=>addUserGroup(checked,i.groupId)"></el-checkbox>
                  </div>
                </el-card>
              </div>
              <div class="block">
                <el-pagination
                  @current-change="change5"
                  :hide-on-single-page="true"
                  layout="prev, pager, next"
                  :total="totalGroup">
                </el-pagination>
              </div>
            </el-card>

            <el-row><p></p></el-row>
            <el-row><p></p></el-row>
            <el-row>
              <el-col :span="22">
                <div align="middle">
                  <el-button type="primary" plain @click="submit" style="margin-right: fill">创建题目集</el-button>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-col>
      </el-row>
      <el-row style="padding: 0">
        <Down style="margin-top: 100px"></Down>
      </el-row>

    </div>


  </div>
</template>
<script type="text/ecmascript-6">
import Left from '../components/navigation/left.vue'
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
import axios from "axios";
export default {
  data(){
    return {
      active:0,
      testname:'',
      selectSubject:null,
      selectRange:null,
      subjects:[],
      ranges:[],
      options1:[
        {
          value:'zidong',
          label:'自动组题'
        },
        {
          value: 'shoudong',
          label: '手动组题'
        }
      ],
      method1:[],
      time1:[new Date(),new Date()],
      time2:60,
      options2:[
        {
          value:'zuti1',
          label:'方案1'
        },
        {
          value:'zuti2',
          label: '方案2'
        }
      ],
      method2:[],
      SingleProblem:[],
      MultiProblem:[],
      FillProblem:[],
      QaProbelm:[],
      problems:[
        {
          id:'1',
          subject:'中医学基础',
          content_type:'绪论',
          question_type:'单项选择题',
          question:'我国现存最早的医学专著是（  ）',
          option:'A．《五十二病方》\nB．《神农本草经》\nC．《黄帝内经》D．《中藏经》\nE．《难经》',
          answer:'A',
          score:'2'
        },
        {
          id:'700',
          subject:'温病学',
          content_type:'温病的辩证',
          question_type:'多项选择题',
          question:'肾阴耗损证的辨证要点是：',
          option:'A．手指蠕动或瘛疭，舌干绛而萎，脉虚\nB．夜热早凉，热退无汗，能食消瘦，舌红苔少\nC．手足心热甚于手足背，口燥咽干，舌绛不鲜，干枯而萎，脉虚\nD．神昏肢厥，舌绛\nE．神志时清时寐，舌苔垢腻',
          answer:'A',
          score: '2'
        },
        {
          id:'3',
          subject:'中药',
          content_type:'基础',
          question_type:'填空题',
          question:'《金匮要略》约成书于________年，是我国现存最早的一部________的专书，作者是我国________著名医学家',
          option:'',
          answer:'公元205 诊治杂病 东汉 张仲景（张机）',
          score: '4'
        }
      ],

      problemSelection:[],
      search:null,
      searchstu:'',
      stuData:[{
      }],
      grantGroup:[],
      dialogVisible:false,
      pageSingle:1,
      pageMulti:1,
      pageFill:1,
      pageQa:1,
      pageGroup:1,
      totalSingle:1,
      totalMulti:1,
      totalFill:1,
      totalQa:1,
      totalGroup:1,
      user_groups:[],
      danxuan:5,
      duoxuan:5,
      tiankong:5,
      wenda:5,
      autoSubject:null,
      autoRange:[],
    }
  },
  computed:{
    // table1() {
    //   const search1='单项选择题';
    //   const search2=this.search;
    //   return this.problems.filter(data=>{
    //     return Object.keys(data).some(key=>{
    //       return String(data[key]).toLowerCase().indexOf(search1)>-1
    //     })
    //   })
    //   return this.problems;
    // },
    // table2() {
    //   const search='多项选择题'
    //   return this.problems.filter(data=>{
    //     return Object.keys(data).some(key=>{
    //       return String(data[key]).toLowerCase().indexOf(search)>-1
    //     })
    //   })
    //   return this.problems;
    // },
    // table3() {
    //   const search='填空题'
    //   return this.problems.filter(data=>{
    //     return Object.keys(data).some(key=>{
    //       return String(data[key]).toLowerCase().indexOf(search)>-1
    //     })
    //   })
    //   return this.problems;
    // },
    // table4() {
    //   const search='问答题'
    //   return this.problems.filter(data=>{
    //     return Object.keys(data).some(key=>{
    //       return String(data[key]).toLowerCase().indexOf(search)>-1
    //     })
    //   })
    //   return this.problems;
    // },
  },
  components:{
    Left,Top,Down
  },
  methods:{
    change1(val){
      this.pageSingle=val;
      this.getTeacherProblems();
    },
    change2(val){
      this.pageMulti=val;
      this.getTeacherProblems();
    },
    change3(val){
      this.pageFill=val;
      this.getTeacherProblems();
    },
    change4(val){
      this.pageQa=val;
      this.getTeacherProblems();
    },
    change5(val){
      this.pageGroup=val;
      this.getUserGroups();
    },
    submit(){
      if(this.method1==='shoudong'){
        this.$refs.list1.selection.forEach(e=>{
          var pro={"id":e.id,"type":'单项选择题'}
          this.problemSelection.push(pro)
        })
        this.$refs.list2.selection.forEach(e=>{
          var pro={"id":e.id,"type":'多项选择题'}
          this.problemSelection.push(pro)
        })
        this.$refs.list3.selection.forEach(e=>{
          var pro={"id":e.id,"type":'填空题'}
          this.problemSelection.push(pro)
        })
        this.$refs.list4.selection.forEach(e=>{
          var pro={"id":e.id,"type":'问答题'}
          this.problemSelection.push(pro)
        })
        console.log(this.problemSelection);
        this.time1[0]=new Date((+new Date(this.time1[0]))+8*3600*1000);
        this.time1[1]=new Date((+new Date(this.time1[1]))+8*3600*1000);
        var manual=new Object();
        manual["testname"]=this.testname;
        manual["time1"]=this.time1;
        manual["time2"]=this.time2;
        manual["problemSelection"]=this.problemSelection;
        manual["grantGroup"]=this.grantGroup;
        axios({
          url:"/exercise/new",
          method:"POST",
          data:manual,
          header:{
            "Content-Type":"application/json"
          }
        })
          .then(res=>{
            alert("创建成功");
            this.$router.go(-1);
          })
      }
      else if(this.method1==='zidong'){
        this.time1[0]=new Date((+new Date(this.time1[0]))+8*3600*1000);
        this.time1[1]=new Date((+new Date(this.time1[1]))+8*3600*1000);
        var auto=new Object();
        auto["testname"]=this.testname;
        auto["danxuan"]=this.danxuan;
        auto["duoxuan"]=this.duoxuan;
        auto["tiankong"]=this.tiankong;
        auto["wenda"]=this.wenda;
        auto["subject"]=this.autoSubject;
        auto["range"]=this.autoRange;
        auto["time2"]=this.time2;
        auto["time1"]=this.time1;
        auto["grantGroup"]=this.grantGroup;
        console.log(this.time1);
        axios({
          url:"/exercise/new1",
          method:"POST",
          data:auto,
          headers:{
            'Content-type':'application/json'
          },
        }).then(res=>{
          this.$message("创建成功");
          this.$router.go(-1);
        })
      }

      //this.$router.push({path:'/teacher',query:{active:'2'}})
    },
    add(){
      this.dialogVisible=true;
    },
    save(){
      console.log();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    chooseProblem(row){

    },
    back(){
      this.$router.go(-1)
    },
    addUserGroup(checked,id){
      if(checked==true)
        this.grantGroup.push(id);
      else
        this.grantGroup.remove(id)
      console.log(this.grantGroup);
    },
    getTeacherProblems(){
      axios.all([
        axios({url:"/problem/teacher_problem",params:{type:"单项选择题",page:this.pageSingle,keyWords:this.search,subject:this.selectSubject,contentType:this.selectRange}}),
        axios({url:"/problem/teacher_problem",params:{type:"多项选择题",page:this.pageMulti,keyWords:this.search,subject:this.selectSubject,contentType:this.selectRange}}),
        axios({url:"/problem/teacher_problem",params:{type:"填空题",page:this.pageFill,keyWords:this.search,subject:this.selectSubject,contentType:this.selectRange}}),
        axios({url:"/problem/teacher_problem",params:{type:"问答题",page:this.pageQa,keyWords:this.search,subject:this.selectSubject,contentType:this.selectRange}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        this.SingleProblem=single.data.data;
        this.MultiProblem=multi.data.data;
        this.FillProblem=fill.data.data;
        this.QaProbelm=qa.data.data;
        this.totalSingle=single.data.total;
        this.totalMulti=multi.data.total;
        this.totalFill=fill.data.total;
        this.totalQa=qa.data.total;
      }))
    },
    getSubjects(){
      axios({
        url:"/problem/allsubjectsnopub",
      }).then(res=>{
        this.subjects=res.data;
      })
    },
    getRanges(){
      axios({
        url:"/problem/rangesnopub",
        params:{
          subject:this.autoSubject
        }
      }).then(res=>{
        this.ranges=res.data;
      })
    },
    getUserGroups() {
      axios({
        url:"/user/groups",
        params:{
          page:this.pageGroup
        }
      }).then(res=>{
        this.user_groups=res.data.data;
      })
    }
  },
  created() {
    this.getTeacherProblems();
    this.getSubjects();
    this.getUserGroups();
  }
}
</script>
<style scoped>
.card-button {
  float: right;
  padding: 8px;
  margin: 2px;
}
#test-create{
  background: url("../assets/images/bg11.jpg") no-repeat;
  background-size: cover;
}
</style>
