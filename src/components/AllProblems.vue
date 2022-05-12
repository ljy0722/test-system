<template>
  <el-tabs type="border-card" >
    <el-tab-pane label="单选题">
      <el-row>
        <el-col :span="3">
          <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
        </el-col>
      </el-row>
      <el-table
        :data="table1"
        ref="problems"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="题号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="学科"
          width="80">
        </el-table-column>
        <el-table-column
          prop="content_type"
          label="内容"
          width="100">
        </el-table-column>
        <el-table-column
          prop="question"
          label="题目"
          width="275">
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
          width="55">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="55">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="operate(scope.row.id)">添加</el-button>
          </template>
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
        ref="problems2Check"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="题号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="学科"
          width="80">
        </el-table-column>
        <el-table-column
          prop="content_type"
          label="内容"
          width="100">
        </el-table-column>
        <el-table-column
          prop="question"
          label="题目"
          width="275">
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
          width="55">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="55">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="operate(scope.row.id)">添加</el-button>
          </template>
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
        ref="problems2Check"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="题号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="学科"
          width="80">
        </el-table-column>
        <el-table-column
          prop="content_type"
          label="内容"
          width="100">
        </el-table-column>
        <el-table-column
          prop="question"
          label="题目"
          width="350">
        </el-table-column>
        <el-table-column
          prop="answer"
          label="答案"
          width="180">
        </el-table-column>
        <el-table-column
          prop="degree"
          label="难度"
          width="55">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="55">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="operate(scope.row.id)">添加</el-button>
          </template>
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
        ref="problems2Check"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="题号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="学科"
          width="80">
        </el-table-column>
        <el-table-column
          prop="content_type"
          label="内容"
          width="100">
        </el-table-column>
        <el-table-column
          prop="question"
          label="题目"
          width="350">
        </el-table-column>
        <el-table-column
          prop="answer"
          label="答案"
          width="180">
        </el-table-column>
        <el-table-column
          prop="degree"
          label="难度"
          width="55">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源"
          width="55">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="operate(scope.row.id)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "AllProblems",
  data(){
    return{
      problems:[

      ]
    }
  },
  methods:{

    table1() {
      const search = '单项选择题'
      return this.problems.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLowerCase().indexOf(search) > -1
        })
      })
      return this.problems;
    },
    table2() {
      const search = '多项选择题'
      return this.problems.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLowerCase().indexOf(search) > -1
        })
      })
      return this.problems;
    },
    table3() {
      const search = '填空题'
      return this.problems.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLowerCase().indexOf(search) > -1
        })
      })
      return this.problems;
    },
    table4() {
      const search = '问答题'
      return this.problems.filter(data => {
        return Object.keys(data).some(key => {
          return String(data[key]).toLowerCase().indexOf(search) > -1
        })
      })
      return this.problems;
    },
  }
}
</script>

<style scoped>

</style>
