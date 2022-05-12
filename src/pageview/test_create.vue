<template>
  <div id="test-create">
    <div>
      <el-row>
        <Top></Top>
      </el-row>

      <el-row>
        <el-col style="width: 80%" :offset="2">
          <el-row><p></p></el-row>
          <el-row><p></p></el-row>
          <div align="middle">
            <el-row><p></p></el-row>
            <el-row><p></p></el-row>
            <el-card>
              <div class="step1">
                <el-row>
                  <el-col :span="3"><a>习题集名称：</a></el-col>
                  <el-col :span="6" align="left"><el-input v-model="testname"></el-input></el-col>
                </el-row>
                <br>
                <br>
                <el-row>
                  <el-col :span="3"><a>组题方式：</a></el-col>
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
                  <el-col :span="3"><a>起止时间：</a></el-col>
                  <el-col :span="6"><el-date-picker type="datetimerange" range-separator="至" v-model="time1" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" >
                  </el-date-picker></el-col>
                </el-row>
                <el-row><p></p></el-row>
                <el-row><p></p></el-row>
                <el-row>
                  <el-col :span="3"><a>考试时长：</a></el-col>
                  <el-col :span="6"><el-input v-model="time2"><template slot="append">分钟</template></el-input></el-col>
                </el-row>
              </div>
            </el-card>
            <br>
            <el-card v-if="method1=='zidong'||method1=='shoudong'">
              <div class="step2.1" v-if="method1=='zidong'">
                <el-row><p></p></el-row>
                <el-row><p></p></el-row>
                <el-row>
                  <el-col :span="3"><a>自动选题方案：</a></el-col>
                  <el-col :span="6" align="left"><el-select v-model="method2">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select></el-col>
                </el-row>
              </div>
              <br>
              <br>

              <div class="step2.2" v-if="method1=='shoudong'">
                <el-tabs type="border-card" >
                  <el-tab-pane label="单选题">
                    <el-row>
                      <el-col :span="3">
                        <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input v-model="search" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                    </el-row>

                    <el-table
                      :data="table1"
                      ref="list1"
                      style="width: 100%"
                      row-key="id"
                      >
                      <el-table-column
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
                        prop="content_type"
                        label="内容"
                        width="130">
                      </el-table-column>
                      <el-table-column
                        prop="question"
                        label="题目"
                        width="350">
                      </el-table-column>
                      <el-table-column
                        prop="option"
                        label="选项"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="answer"
                        label="答案">
                      </el-table-column>
                      <el-table-column
                        prop="degree"
                        label="难度"
                        width="50">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="多选题">
                    <el-row>
                      <el-col :span="3">
                        <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                    </el-row>
                    <el-table
                      :data="table2"
                      ref="list2"
                      row-key="id"
                      style="width: 100%">
                      <el-table-column
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
                        prop="content_type"
                        label="内容"
                        width="130">
                      </el-table-column>
                      <el-table-column
                        prop="question"
                        label="题目"
                        width="350">
                      </el-table-column>
                      <el-table-column
                        prop="option"
                        label="选项"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="answer"
                        label="答案">
                      </el-table-column>
                      <el-table-column
                        prop="degree"
                        label="难度"
                        width="50">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="填空题">
                    <el-row>
                      <el-col :span="3">
                        <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                    </el-row>
                    <el-table
                      :data="table3"
                      ref="list3"
                      style="width: 100%"
                      row-key="id">
                      <el-table-column
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
                        prop="content_type"
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
                        prop="degree"
                        label="难度"
                        width="50">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="问答题">
                    <el-row>
                      <el-col :span="3">
                        <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                      </el-col>
                      <el-col :span="8">
                        <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                      </el-col>
                    </el-row>
                    <el-table
                      :data="table4"
                      ref="list4"
                      style="width: 100%"
                      row-key="id">
                      <el-table-column
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
                        prop="content_type"
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
                        prop="degree"
                        label="难度"
                        width="50">
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
                <!--              <el-table-->
                <!--                ref="tableData"-->
                <!--                :data="tables1"-->
                <!--                border-->
                <!--                style="width: 100%"-->
                <!--                @selection-change="handleSelectionChange1">-->
                <!--                <el-table-column-->
                <!--                  type="selection"-->
                <!--                  width="55">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                  fixed-->
                <!--                  prop="qid"-->
                <!--                  label="题号"-->
                <!--                  width="80">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                  prop="question"-->
                <!--                  label="题目"-->
                <!--                  width="450">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                  prop="options"-->
                <!--                  label="选项"-->
                <!--                  width="260">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                  prop="answer"-->
                <!--                  label="答案"-->
                <!--                  width="100">-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                  prop="degree"-->
                <!--                  label="难度"-->
                <!--                  width="100">-->
                <!--                </el-table-column>-->

                <!--              </el-table>-->
                <!--              <el-pagination-->
                <!--                @size-change="handleSizeChange"-->
                <!--                @current-change="handleCurrentChange"-->
                <!--                :current-page="current"-->
                <!--                :page-sizes="[100, 200, 300, 400]"-->
                <!--                :page-size="size"-->
                <!--                layout="total, sizes, prev, pager, next, jumper"-->
                <!--                :total="total">-->
                <!--              </el-pagination>-->
<!--                <el-dialog title="新增题目" :visible.sync="dialogVisible">-->
<!--                  <el-form :model="form">-->
<!--                    <el-form-item label="题目" :label-width="'60px'">-->
<!--                      <el-input v-model="form.question" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="选项A" :label-width="'60px'">-->
<!--                      <el-input v-model="form.answerA" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="选项B" :label-width="'60px'">-->
<!--                      <el-input v-model="form.answerB" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="选项C" :label-width="'60px'">-->
<!--                      <el-input v-model="form.answerC" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="选项D" :label-width="'60px'">-->
<!--                      <el-input v-model="form.answerD" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="选项E" :label-width="'60px'">-->
<!--                      <el-input v-model="form.answerE" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="答案" :label-width="'60px'">-->
<!--                      <el-input v-model="form.answer" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="难度" :label-width="'60px'">-->
<!--                      <el-input v-model="form.degree" auto-complete="off"></el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-form>-->
<!--                  <div slot="footer">-->
<!--                    <el-button @click="dialogVisible=false">取消</el-button>-->
<!--                    <el-button type="primary" @click="save">添加</el-button>-->
<!--                  </div>-->
<!--                </el-dialog>-->
              </div>
            </el-card>
            <br>
            <el-card>
              <div class="step3" align="left">
                <span>授权用户组</span>
                <el-divider></el-divider>
                <el-card style="margin-bottom: 5px"
                         v-for="(i,index) in user_groups"
                         v-bind:key="index">
                  <div style="margin-top: -15px">
                    <el-button type="text" style="float: left;color: black">{{ i.group_name }}</el-button>
                    <el-checkbox size="medium" style="float: right;margin-top: 5px" @change="checked=>addUserGroup(checked,i.groupId)"></el-checkbox>
                  </div>
                </el-card>
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
      <el-row>
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
      time2:'',
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
      search:'',
      searchstu:'',
      stuData:[{
      }],
      grantGroup:[],
      dialogVisible:false,
      current:1,
      size:10,
      total:100,
      form:{
        question:'',
        answerA:'',
        answerB:'',
        answerC:'',
        answerD:'',
        answerE:'',
        answer:'',
        degree:''
      },
      user_groups:[
        {
          group_name:'组1',
          groupId:'1'
        },
        {
          group_name:'组2',
          groupId:'2'
        }
      ],
    }
  },
  computed:{
    table1() {
      const search1='单项选择题';
      const search2=this.search;
      return this.problems.filter(data=>{
        return Object.keys(data).some(key=>{
          return String(data[key]).toLowerCase().indexOf(search1)>-1
        })
      })
      return this.problems;
    },
    table2() {
      const search='多项选择题'
      return this.problems.filter(data=>{
        return Object.keys(data).some(key=>{
          return String(data[key]).toLowerCase().indexOf(search)>-1
        })
      })
      return this.problems;
    },
    table3() {
      const search='填空题'
      return this.problems.filter(data=>{
        return Object.keys(data).some(key=>{
          return String(data[key]).toLowerCase().indexOf(search)>-1
        })
      })
      return this.problems;
    },
    table4() {
      const search='问答题'
      return this.problems.filter(data=>{
        return Object.keys(data).some(key=>{
          return String(data[key]).toLowerCase().indexOf(search)>-1
        })
      })
      return this.problems;
    },
  },
  components:{
    Left,Top,Down
  },
  methods:{
    submit(){
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
            this.$router.push({path:'/teacher',params:{active:'3'}})
          })

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
    addUserGroup(checked,id){
      if(checked==true)
        this.grantGroup.push(id);
      else
        this.grantGroup.remove(id)
      console.log(this.grantGroup);
    }
  },
}
</script>
<style scoped>
.card-button {
  float: right;
  padding: 8px;
  margin: 2px;
}
#test-create{
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;
  overflow: auto;
}
</style>
