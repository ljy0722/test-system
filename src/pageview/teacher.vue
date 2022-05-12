<template>
  <div id="teacher">
    <el-container>
      <el-header>
        <Top></Top>
      </el-header>
      <el-container style="min-height: 500px;">
        <el-aside style="margin-top: 100px" width="140px">
          <div class="toggle-btn" @click="toggleCollapse">|||</div>
          <el-menu default-active="active" style="width: 130px;" unique-opened:collapse="true" @select="handleSelect">
            <el-menu-item index="1" ><i class="el-icon-s-unfold"></i>概览</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-s-order"></i>题目集 </el-menu-item>
            <el-menu-item index="3"><i class="el-icon-s-grid"></i>题目 </el-menu-item>
            <el-menu-item index="4"><i class="el-icon-s-custom"></i>用户组 </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div v-if="active=='1'">
            <el-row>
              <el-col :span="8">
                <el-card style="background:#eeeeee;min-height: 150px;width:250px;margin-top: 80px">
                  <div slot="header" style="color: #409EFF;font-size: large">
                    <span>题目集</span>
                  </div>
                  <div align="left" style="font-family: 黑体;color: gray;font-weight: bold;font-size: large;margin-left: 20%">
                    <el-row><span>总数：     {{exerciseSets.length}}</span></el-row>
                    <el-row><span>未开始：   {{getval1}}</span></el-row>
                    <el-row><span>正在进行：  {{getval2}}</span></el-row>
                    <el-row><span>已结束：   {{getval3}}</span></el-row>
                  </div>
                </el-card>
                <Chart6 :value1="getval1" :value2="getval2" :value3="getval3" style="margin-top: 60px"></Chart6>
              </el-col>
              <el-col :span="8">
                <el-card style="background:#eeeeee;min-height: 150px;width:250px;margin-top: 80px">
                  <div slot="header" style="color: #409EFF;font-size: large">
                    <span>题目</span>
                  </div>
                  <div align="left" style="font-family: 黑体;color: gray;font-weight: bold;font-size: large;margin-left: 20%">
                    <el-row><span>总数：     {{problems.single.length+problems.multi.length+problems.fill.length+problems.quesans.length}}</span></el-row>
                    <el-row><span>单项选择题：   {{problems.single.length}}</span></el-row>
                    <el-row><span>多项选择题：  {{problems.multi.length}}</span></el-row>
                    <el-row><span>填空题：   {{problems.fill.length}}</span></el-row>
                    <el-row><span>问答题：   {{problems.quesans.length}}</span></el-row>
                  </div>
                </el-card>
                <Chart7 :value1="problems.single.length" :value2="problems.multi.length" :value3="problems.fill.length" :value4="problems.quesans.length" style="margin-top: 40px"></Chart7>
              </el-col>
              <el-col :span="8">
                <el-card style="background:#eeeeee;width: 270px;min-height: 150px;margin-top: 80px;margin-right: 40px">
                  <div slot="header" style="color: #409EFF;font-size: large">
                    <span>用户组</span>
                  </div>
                  <div align="left" style="font-family: 黑体;color: gray;font-weight: bold;font-size: large;margin-left: 20%">
                    <el-row><span>总数：   {{user_groups.length}}</span></el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">

              </el-col>
            </el-row>
          </div>
          <div v-if="active=='2'">
            <div v-if="setdetail==false">
              <el-row style="margin-top: 80px;">
                <el-col :span="2">
                  <el-button type="primary" align="left"  @click="handleCreate">创建题目集</el-button>
                </el-col>
                <el-col :span="1" :offset="2">
                  <div style="width: 50px;margin-top: 10px">排序:</div>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="sortvalue" placeholder="排序方式" @change="sortBy(sortvalue)">
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
                  <el-select v-model="shaixuan" placeholder="筛选方式">
                    <el-option
                      v-for="item in shaixuanInfo"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-card style="margin-bottom: 5px;height: 60px"
                         v-for="(i,index) in exerciseSets"
                         v-bind:key="index"
                         v-if="shaixuan==''||i.state==shaixuan">
                  <el-row style="margin-top: -15px">
                    <el-button type="text"  style="font-size: large;font-size: 17px;color: dodgerblue;margin-left: 20px;float: left" @click="viewSet(i.exerciseId)"> {{ i.exerciseName }}</el-button>
                    <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: yellowgreen;color: white;padding: 0 10px;border-radius: 20%" v-if="i.state=='1'">未开始</span></i>
                    <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: dodgerblue;color: white;padding: 0 10px;border-radius: 20%" v-if="i.state=='2'">正在进行</span></i>
                    <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: #868686;color: white;padding: 0 10px;border-radius: 20%" v-if="i.state=='3'">已结束</span></i>
                  </el-row>
                  <el-row style="margin-top: -5px;float: right">
                    <span style="float: left;font-size: small">结束时间：{{i.endTime}}</span>
                  </el-row>
                </el-card>
              </el-row>
              <div class="block" style="float: right;margin-bottom: -200px">
                <el-pagination
                  :current-change="change"
                  layout="prev, pager, next"
                  :total="totalSet">
                </el-pagination>
              </div>
            </div>
            <div v-if="setdetail==true" style="margin-top: 80px">
              <el-button type="plain" style="float: left" size="mini" @click="setdetail=false">返回</el-button>
              <span style="font-size: x-large;font-weight: bold;margin-left: -6%">{{ setDetail.setname }}</span>
              <br>
              <br>
              <el-row>
              </el-row>


              <br>
              <br>
              <el-row>
                <el-col>
                  <span style="margin-bottom: 30px;font-size: large;font-weight: bold;color: #444444">题目</span>
                </el-col>
              </el-row>

              <el-tabs type="border-card" >
                <el-tab-pane label="单选题" style="margin-bottom: 30px">
                  <el-row>
                    <el-col :span="3">
                      <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                    </el-col>
                    <el-col :span="8">
                      <el-input placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                    </el-col>
                  </el-row>

                  <el-table
                    :data="setDetail.singleChoiceList"
                    ref="setDetail.problems.single"
                    style="width: 100%;margin-bottom: 30px;white-space: pre-wrap">
                    <el-table-column
                      prop="id"
                      label="题号"
                      width="50">
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
                      prop="option"
                      label="选项"
                      width="180"
                      style="white-space: pre-wrap">
                    </el-table-column>
                    <el-table-column
                      prop="answer"
                      label="答案">
                    </el-table-column>
                    <el-table-column
                      prop="score"
                      label="分值">
                    </el-table-column>
                    <el-table-column
                      prop="degree"
                      label="难度"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="plain"
                          @click="modifyScore(scope.$index,scope.row)">修改分值</el-button>
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
                    :data="setDetail.multiChoiceList"
                    ref="setDetail.problems.multi"
                    style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="题号"
                      width="50">
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
                      prop="option"
                      label="选项"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="answer"
                      label="答案">
                    </el-table-column>
                    <el-table-column
                      prop="score"
                      label="分值">
                    </el-table-column>
                    <el-table-column
                      prop="degree"
                      label="难度"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="plain"
                          @click="modifyScore(scope.$index,scope.row)">修改分值</el-button>
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
                    :data="setDetail.fillBlankList"
                    ref="setDetail.problems.fill"
                    style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="题号"
                      width="50">
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
                      prop="answer"
                      label="答案">
                    </el-table-column>
                    <el-table-column
                      prop="score"
                      label="分值">
                    </el-table-column>
                    <el-table-column
                      prop="degree"
                      label="难度"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="plain"
                          @click="modifyScore(scope.$index,scope.row)">修改分值</el-button>
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
                    :data="setDetail.questionAnswerList"
                    ref="setDetail.problems.quesans"
                    style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="题号"
                      width="50">
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
                      prop="answer"
                      label="答案">
                    </el-table-column>
                    <el-table-column
                      prop="score"
                      label="分值">
                    </el-table-column>
                    <el-table-column
                      prop="degree"
                      label="难度"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="plain"
                          @click="modifyScore(scope.$index,scope.row)">修改分值</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <el-dialog title="修改分值" :visible.sync="editScore">
                <el-form label-position="left" label-width="80px" :model="scoreForm">
                  <el-form-item label="分值">
                    <el-input-number v-model="scoreForm.newScore"></el-input-number>
                  </el-form-item>
                </el-form>
                <el-button type="primary" @click="changeScore">确定</el-button>
              </el-dialog>
              <br>
              <br>
              <span style="font-size: large;margin-top: 100px;font-weight: bold;color: #444444">用户组</span>
              <el-row>
                <el-col :span="2">
                  <div style="margin-top: 5px">筛选：</div>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="chooseGroup" @change="seeAnalyse(chooseGroup)" placeholder="选择用户组" style="float: left">
                    <el-option
                      v-for="(item,index) in setDetail.groups"
                      :key="item.id"
                      :label="item.group_name"
                      :value="item.id"></el-option>
                  </el-select>
                </el-col>

              </el-row>
              <el-table
                :data="showGroup"
              >
                <el-table-column
                  prop="id"
                  label="用户ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="邮箱"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="得分"
                  width="100">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  width="250">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="viewStudentSet(scope.row.id,setDetail.id)">查看试卷</el-button>
                    <el-button
                      size="mini" icon="el-icon-download"
                      @click="exportExercise(scope.row)">导出试卷</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-row style="margin-top: 80px">
                <el-col :span="12">
                  <Chart :value1="10" :value2="10" :value3="10" :value4="10"></Chart>
                </el-col>
                <el-col :span="12">
                  <chart2 :xaxis="[1,2,3,4]" :yaxis="[100,90,80,23]"></chart2>
                </el-col>
                <br>

              </el-row>


            </div>
          </div>
          <div v-if="active=='3'">
            <el-row>
              <el-col :span="2">
                <el-button type="primary" align="left" style="margin-top: 80px" @click="dispatch=true;addques={}">新建题目</el-button>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button type="primary" align="left" style="margin-top: 80px" @click="dispatch2=true">从题库添加</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-tabs type="border-card" >
                <el-tab-pane label="单选题">
                  <el-row>
                    <el-col :span="3">
                      <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-input v-model="keywords1" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                    </el-col>
                    <el-col :span="1" :offset="1">
                      <el-button type="primary" @click="searchProblems('单项选择题')">搜索</el-button>
                    </el-col>
                    <el-col :span="8" :offset="1">
                      <el-input v-model="search1" placeholder="输入关键字可进行筛选" style="margin-left: 20px"></el-input>
                    </el-col>
                  </el-row>

                  <el-table
                    :data="table1"
                    ref="problems.single"
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
                    <el-table-column
                      fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="remove(scope.$index,scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change1"
                      layout="prev, pager, next"
                      :total="totalSingle">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="多选题">
                  <el-row>
                    <el-col :span="3">
                      <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-input v-model="keywords1" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                    </el-col>
                    <el-col :span="1" :offset="1">
                      <el-button type="primary" @click="searchProblems('多项选择题')">搜索</el-button>
                    </el-col>
                    <el-col :span="8" :offset="1">
                      <el-input v-model="search1" placeholder="输入关键字可进行筛选" style="margin-left: 20px"></el-input>
                    </el-col>
                  </el-row>
                  <el-table
                    :data="table2"
                    ref="problems.multi"
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
                    <el-table-column
                      fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="remove(scope.$index,scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change2"
                      layout="prev, pager, next"
                      :total="totalMulti">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="填空题">
                  <el-row>
                    <el-col :span="3">
                      <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-input v-model="keywords1" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                    </el-col>
                    <el-col :span="1" :offset="1">
                      <el-button type="primary" @click="searchProblems('填空题')">搜索</el-button>
                    </el-col>
                    <el-col :span="8" :offset="1">
                      <el-input v-model="search1" placeholder="输入关键字可进行筛选" style="margin-left: 20px"></el-input>
                    </el-col>
                  </el-row>
                  <el-table
                    :data="table3"
                    ref="problems.fill"
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
                      label="答案">
                    </el-table-column>
                    <el-table-column
                    prop="degree"
                    label="难度"
                    width="50">
                  </el-table-column>
                    <el-table-column
                      fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="remove(scope.$index,scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change3"
                      layout="prev, pager, next"
                      :total="totalFill">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="问答题">
                  <el-row>
                    <el-col :span="3">
                      <el-select value="" placeholder="选择学科" style="float: left" align="left"></el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-input v-model="keywords1" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                    </el-col>
                    <el-col :span="1" :offset="1">
                      <el-button type="primary" @click="searchProblems('问答题')">搜索</el-button>
                    </el-col>
                    <el-col :span="8" :offset="1">
                      <el-input v-model="search1" placeholder="输入关键字可进行筛选" style="margin-left: 20px"></el-input>
                    </el-col>
                  </el-row>
                  <el-table
                    :data="table4"
                    ref="problems.quesans"
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
                      label="答案">
                    </el-table-column>
                    <el-table-column
                      prop="degree"
                      label="难度"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="remove(scope.$index,scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change4"
                      layout="prev, pager, next"
                      :total="totalQa">
                    </el-pagination>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-row>
            <el-dialog
              title="添加题目"
              :visible.sync="dispatch"
              append-to-body>
              <div>
                <span>添加题型</span>
                <el-select style="margin-left: 40px" v-model="addques.type" default-first-option>
                  <el-option
                    v-for="item in tixing"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
              </div>
              <br>
              <el-form  v-if="addques.type=='单项选择题'" :model="addques" label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="学科">
                      <el-input v-model="addques.subject_new"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="范围">
                      <el-input v-model="addques.content_type_new"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="题目">
                  <el-col :span="20">
                    <el-input v-model="addques.question_new"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项A">
                  <el-col :span="18">
                    <el-input v-model="addques.answerA"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项B">
                  <el-col :span="18">
                    <el-input v-model="addques.answerB"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项C">
                  <el-col :span="18">
                    <el-input v-model="addques.answerC"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项D">
                  <el-col :span="18">
                    <el-input v-model="addques.answerD"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项E">
                  <el-col :span="18">
                    <el-input v-model="addques.answerE"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="答案">
                  <el-col :span="6">
                    <el-input v-model="addques.answer"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <el-form  v-if="addques.type=='多项选择题'" :model="addques" label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="学科">
                      <el-input v-model="addques.subject_new"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="范围">
                      <el-input v-model="addques.content_type_new"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="题目">
                  <el-col :span="20">
                    <el-input v-model="addques.question_new"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项A">
                  <el-col :span="18">
                    <el-input v-model="addques.answerA"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项B">
                  <el-col :span="18">
                    <el-input v-model="addques.answerB"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项C">
                  <el-col :span="18">
                    <el-input v-model="addques.answerC"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项D">
                  <el-col :span="18">
                    <el-input v-model="addques.answerD"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="选项E">
                  <el-col :span="18">
                    <el-input v-model="addques.answerE"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="答案">
                  <el-col :span="6">
                    <el-input v-model="addques.answer"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <el-form  v-if="addques.type=='填空题'" :model="addques" label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="学科">
                      <el-input v-model="addques.subject_new"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="范围">
                      <el-input v-model="addques.content_type_new"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="题目">
                  <el-col :span="20">
                    <el-input v-model="addques.question_new"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="答案">
                  <el-col :span="18">
                    <el-input v-model="addques.answer"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <el-form  v-if="addques.type=='问答题'" :model="addques" label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="学科">
                      <el-input v-model="addques.subject_new"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <el-form-item label="范围">
                      <el-input v-model="addques.content_type_new"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="题目">
                  <el-col :span="20">
                    <el-input v-model="addques.question_new"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="答案">
                  <el-col :span="18">
                    <el-input v-model="addques.answer"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dispatch = false">取 消</el-button>
                <el-button type="primary" @click="createProblem">保存</el-button>
              </div>
            </el-dialog>
            <el-dialog
              title="从题库添加"
              :visible.sync="dispatch2"
              append-to-body
              width="80%">
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
                    :data="allProblemSingle"
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
                      prop="contentType"
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
                          @click="addProblemFromTiku(scope.row.id,'单项选择题')">添加</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change5"
                      layout="prev, pager, next"
                      :total="totalAllSingle">
                    </el-pagination>
                  </div>
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
                    :data="allProblemMulti"
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
                      prop="contentType"
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
                          @click="addProblemFromTiku(scope.row.id,'多项选择题')">添加</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change6"
                      layout="prev, pager, next"
                      :total="totalAllMulti">
                    </el-pagination>
                  </div>
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
                    :data="allProblemFill"
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
                      prop="contentType"
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
                          @click="addProblemFromTiku(scope.row.id,'填空题')">添加</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change7"
                      layout="prev, pager, next"
                      :total="totalAllFill">
                    </el-pagination>
                  </div>
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
                    :data="allProblemQa"
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
                      prop="contentType"
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
                          @click="addProblemFromTiku(scope.row.id,'问答题')">添加</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                    <el-pagination
                      :current-change="change8"
                      layout="prev, pager, next"
                      :total="totalAllQa">
                    </el-pagination>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-dialog>
          </div>
          <div v-if="active=='4'&&userGroupDetail==false">
            <el-row>
              <el-col :span="2">
                <el-button type="primary" align="left" style="margin-top: 80px" @click="createUserGroup=true">创建用户组</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-card style="margin-bottom: 5px"
                       v-for="(i,index) in user_groups"
                       v-bind:key="index">
                <div style="margin-top: -15px">
                  <el-button type="text" style="float: left;color: black" @click="checkGroupDetail(i.groupId)">{{ i.groupName }}</el-button>
                  <el-button align="right" class="card-button" type="danger" icon="el-icon-delete" @click="deleteGroup(i.groupId)" circle></el-button>
                  <el-button align="right" class="card-button" type="primary" icon="el-icon-view" style="margin-right: 10px" @click="checkGroupDetail(i.groupId)" circle></el-button>
                </div>
              </el-card>
            </el-row>
            <div class="block" style="float: right">
              <el-pagination
                :current-change="change9"
                layout="prev, pager, next"
                :total="totalGroup">
              </el-pagination>
            </div>
            <el-dialog title="创建用户组" :visible.sync="createUserGroup">
              <el-form ref="newUserGroup" :model="newUserGroup" label-width="150px" align="left">
                <el-form-item label="用户组名称">
                  <el-input v-model="newUserGroup.groupName"></el-input>
                </el-form-item>
                <el-form-item label="批量导入用户组成员">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :before-upload="beforeUploadFile"
                    :on-change="handleChange"
                    :on-exceed="exceedFile"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :on-remove="handleRemove"
                    :file-list="fileList1"
                    accept=".xlsx"
                    :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <el-button size="small" type="plain" align="left"  @click="downloadTemplate">下载模板</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
                  </el-upload>
                </el-form-item>
                <el-button type="primary" style="margin-left: 45%" @click="createNewUserGroup">创建</el-button>
              </el-form>
            </el-dialog>
          </div>
          <div v-if="active=='4'&&userGroupDetail==true">
            <el-row>
              <el-col :span="2">
                <el-button type="plain" style="float: left;margin-top: 80px" size="mini" @click="userGroupDetail=false">返回</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" align="left" style="margin-top: 80px" @click="addUser=true;searchUserInfo=[];searchUserId=''">添加用户</el-button>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button type="primary" align="left" style="margin-top: 80px" @click="addUsers=true">批量导入</el-button>
              </el-col>
            </el-row>
            <el-table
              :data="userGroup"
            >
              <el-table-column
                prop="id"
                label="用户ID"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="180">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="200">
              </el-table-column>
              <el-table-column
                align="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                :current-change="change10"
                layout="prev, pager, next"
                :total="totalUser">
              </el-pagination>
            </div>
            <el-dialog title="添加用户" :visible.sync="addUser">
              <el-row>
                <el-col :span="4">
                  <el-input v-model="searchUserId" placeholder="通过ID搜索" style="width: 200px;float: left"></el-input>
                </el-col>
                <el-col :span="2" :offset="5">
                  <el-button size="mini" type="plain" @click="searchUser" style="margin-top: 7px">搜索</el-button>
                </el-col>
              </el-row>

              <el-table
                ref="multipleTable"
                :data="searchUserInfo"
              >
                <el-table-column
                  prop="id"
                  label="用户ID"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="邮箱"
                  width="200">
                </el-table-column>
                <el-table-column
                  align="right">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="addUser2group(scope.row.id)">添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
            <el-dialog title="批量导入" :visible.sync="addUsers" align="left">
              <el-upload
                class="upload-demo"
                ref="upload"
                :limit="1"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeUploadFile"
                :on-change="handleChange"
                :on-exceed="exceedFile"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList2"
                accept=".xlsx"
                :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
                <el-button size="small" type="plain" align="left"  @click="downloadTemplate">下载模板</el-button>
                <div slot="tip" class="el-upload__tip">只能上传.xlsx文件</div>
              </el-upload>
              <el-button type="primary" style="margin-top: 80px;margin-left: 40%" @click="addUsersByFile">添加</el-button>
            </el-dialog>
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
import * as echarts from "echarts";
import Chart from './chart/chart'
import Chart2 from './chart/chart2'
import Chart6 from './chart/chart6'
import Chart7 from './chart/chart7'
import Problems from '../components/AllProblems.vue'
import axios from "axios";
export default {
  name: "teacher",
  components: {Top, Down,Chart,Chart2,Chart6,Chart7,Problems},
  data(){
    return{
      // getactive:this.$route.params.active,
      active:this.$route.query.active?this.$route.query.active:'1',
      isCollapse:false,
      dispatch:false,
      dispatch2:false,
      setdetail:false,
      userGroupDetail:false,
      createUserGroup:false,
      addUser:false,
      addUsers:false,
      search1:'',
      keywords1:'',
      subject1:'',
      sortvalue:'',
      totalSet:1,
      totalSingle:1,
      totalMulti:1,
      totalFill:1,
      totalQa:1,
      totalAllSingle:1,
      totalAllMulti:1,
      totalAllFill:1,
      totalAllQa:1,
      totalGroup:1,
      totalUser:1,
      pageSet:1,
      pageSingle:1,
      pageMulti:1,
      pageFill:1,
      pageQa:1,
      pageAllSingle:1,
      pageAllMulti:1,
      pageAllFill:1,
      pageAllQa:1,
      pageGroup:1,
      pageUser:1,
      sortInfo:[
        {
          value:'1',
          label:'最近结束',
        },
        {
          value:'2',
          label:'最早创建',
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
          label: '已结束',
        },
        {
          value: '',
          label: '全部',
        }
      ],
      detailSetName:'',
      tixing:[
        {
          value:'单项选择题',
          label:'单项选择题'
        },
        {
          value:'多项选择题',
          label:'多项选择题'
        },
        {
          value:'填空题',
          label:'填空题'
        },
        {
          value:'问答题',
          label:'问答题'
        },
      ],
      value:'',
      addques:{
        type:'',
        subject_new:'',
        content_type_new:'',
        question_new:'',
        answerA:'',
        answerB:'',
        answerC:'',
        answerD:'',
        answerE:'',
        answer:'',
        source:''
      },
      chooseGroup:'',
      setDetail:{
        setname:'中医药基础卷1',
        id:'1',
        singleChoiceList:[
          {
            id:'1',
            subject:'中医学基础',
            contentType:'绪论',
            question_type:'单项选择题',
            question:'我国现存最早的医学专著是（  ）',
            option:'A．《五十二病方》\nB．《神农本草经》\nC．《黄帝内经》D．《中藏经》\nE．《难经》',
            answer:'A',
            score:'2'
          }
        ],
        multiChoiceList:[
          {
            id:'700',
            subject:'温病学',
            contentType:'温病的辩证',
            question_type:'多项选择题',
            question:'肾阴耗损证的辨证要点是：',
            option:'A．手指蠕动或瘛疭，舌干绛而萎，脉虚\nB．夜热早凉，热退无汗，能食消瘦，舌红苔少\nC．手足心热甚于手足背，口燥咽干，舌绛不鲜，干枯而萎，脉虚\nD．神昏肢厥，舌绛\nE．神志时清时寐，舌苔垢腻',
            answer:'A',
            score: '2'
          }
        ],
        fillBlankList:[],
        questionAnswerList:[],
        groups:[
          {
            group_name:'用户组1',
            id:'1',
            users:[
              {
                id:'1',
                name:'tom',
                score:'90',
                sex:'男',
                email:'123@qq.com',
              }
            ],
          }
        ],
        endTime:'2022-4-30'
      },
      exerciseSets:[
        {
          setname:'中医药基础卷1',
          id:'1',
          user_group:[
            {
              group_name:'',
              id:''
            }
          ],
          state:'1',
          endTime:'2022-4-29'
        },
        {
          setname: '中药基础问题',
          id:'2',
          state:'2',
          endTime:'2022-4-30'
        }
      ],
      filter:{
        type:"单项选择题"
      },
      problems:{
        single:[],
        multi:[{
          id:'700',
          subject:'温病学',
          contentType:'温病的辩证',
          question_type:'多项选择题',
          question:'肾阴耗损证的辨证要点是：',
          option:'A．手指蠕动或瘛疭，舌干绛而萎，脉虚\nB．夜热早凉，热退无汗，能食消瘦，舌红苔少\nC．手足心热甚于手足背，口燥咽干，舌绛不鲜，干枯而萎，脉虚\nD．神昏肢厥，舌绛\nE．神志时清时寐，舌苔垢腻',
          answer:'A',
          score: '2'
        },],
        fill:[],
        quesans:[],
      },
      allProblemSingle:[
        {
          id:'1',
          subject:'中医学基础',
          contentType:'绪论',
          question_type:'单项选择题',
          question:'我国现存最早的医学专著是（  ）',
          option:'A．《五十二病方》\nB．《神农本草经》\nC．《黄帝内经》D．《中藏经》\nE．《难经》',
          answer:'A',
          score:'2'
        }
      ],
      allProblemMulti:[],
      allProblemFill:[],
      allProblemQa:[],
      user_groups:[
        {
          groupName:'组1',
          groupId:''
        }
      ],
      viewGroupId:'',
      userGroup:[
        {
          id:'1',
          name:'tom',
          sex:'男',
          email:'123@qq.com',
        }
      ],
      newUserGroup:{
        groupName:'',
      },
      fileList1:[],
      fileList2:[],
      editScore:false,
      scoreForm:{
        newScore:''
      },
      editData:'',

      pageNum:1,
      searchUserId:'',
      searchUserInfo:[],
    }
  },
  mounted() {

  },
  methods:{

    change(val){
      this.pageSet=val;
    },
    change1(val){
      this.pageSingle=val;
    },
    change2(val){
      this.pageMulti=val;
    },
    change3(val){
      this.pageFill=val;
    },
    change4(val){
      this.pageQa=val;
    },
    change5(val){
      this.pageAllSingle=val;
    },
    change6(val){
      this.pageAllMulti=val;
    },
    change7(val){
      this.pageAllFill=val;
    },
    change8(val){
      this.pageAllQa=val;
    },
    change9(val){
      this.pageGroup=val;
    },
    change10(val){
      this.pageUser=val;
    },
    getAllproblems(){
      axios.all([
        axios({url:"/problem/all_problem",params:{page:this.pageAllSingle,keyWords:null,subject:null,contentType:null,type:'单项选择题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllMulti,keyWords:null,subject:null,contentType:null,type:'多项选择题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllFill,keyWords:null,subject:null,contentType:null,type:'填空题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllQa,keyWords:null,subject:null,contentType:null,type:'问答题'}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        if(single.data.size!=0){
          this.allProblemSingle=[];
          for(let i=0;i<single.data.data.length;i++){
            var pro=new Object();
            console.log(single.data.data[i]);
            pro["id"]=single.data.data[i].id;
            pro["subject"]=single.data.data[i].subject;
            pro["question"]=single.data.data[i].question;
            pro["contentType"]=single.data.data[i].contentType;
            pro["question_type"]=single.data.data[i].questionType;
            pro["option"]=single.data.data[i].answerA+"\n"+single.data.data[i].answerB+"\n"+single.data.data[i].answerC+"\n"+single.data.data[i].answerD+"\n"+single.data.data[i].answerE;
            pro["answer"]=single.data.data[i].answer;
            pro["score"]="2";
            this.allProblemSingle.push(pro);
            console.log(this.allProblemSingle);
          }
        }
        if(multi.data.size!=0){
          this.allProblemMulti=[];
          for(let i=0;i<multi.data.data.length;i++){
            var pro=new Object();
            console.log(multi.data.data[i]);
            pro["id"]=multi.data.data[i].id;
            pro["subject"]=multi.data.data[i].subject;
            pro["question"]=multi.data.data[i].question;
            pro["contentType"]=multi.data.data[i].contentType;
            pro["question_type"]=multi.data.data[i].questionType;
            pro["option"]=multi.data.data[i].answerA+"\n"+multi.data.data[i].answerB+"\n"+multi.data.data[i].answerC+"\n"+multi.data.data[i].answerD+"\n"+multi.data.data[i].answerE;
            pro["answer"]=multi.data.data[i].answer;
            pro["score"]="2";
            this.allProblemMulti.push(pro);
          }
        }
        if(fill.data.size!=0){
          this.allProblemFill=[];
          for(let i=0;i<fill.data.data.length;i++){
            var pro=new Object();
            console.log(fill.data.data[i]);
            pro["id"]=fill.data.data[i].id;
            pro["subject"]=fill.data.data[i].subject;
            pro["question"]=fill.data.data[i].question;
            pro["contentType"]=fill.data.data[i].contentType;
            pro["question_type"]=fill.data.data[i].questionType;
            pro["option"]=fill.data.data[i].answerA+"\n"+fill.data.data[i].answerB+"\n"+fill.data.data[i].answerC+"\n"+fill.data.data[i].answerD+"\n"+fill.data.data[i].answerE;
            pro["answer"]=fill.data.data[i].answer;
            pro["score"]="2";
            this.allProblemFill.push(pro);
          }
        }
        if(qa.data.size!=0){
          this.allProblemQa=[];
          for(let i=0;i<qa.data.data.length;i++){
            var pro=new Object();
            console.log(qa.data.data[i]);
            pro["id"]=qa.data.data[i].id;
            pro["subject"]=qa.data.data[i].subject;
            pro["question"]=qa.data.data[i].question;
            pro["contentType"]=qa.data.data[i].contentType;
            pro["question_type"]=qa.data.data[i].questionType;
            pro["option"]=qa.data.data[i].answerA+"\n"+qa.data.data[i].answerB+"\n"+qa.data.data[i].answerC+"\n"+qa.data.data[i].answerD+"\n"+qa.data.data[i].answerE;
            pro["answer"]=qa.data.data[i].answer;
            pro["score"]="2";
            this.allProblemQa.push(pro);
          }
        }
      }))
    },
    getTeacherProblems(){
      axios.all([
        axios({url:"/problem/teacher_problem",params:{type:"单项选择题",page:this.pageSingle,keyWords:null,subject:null,contentType:null}}),
        axios({url:"/problem/teacher_problem",params:{type:"多项选择题",page:this.pageMulti,keyWords:null,subject:null,contentType:null}}),
        axios({url:"/problem/teacher_problem",params:{type:"填空题",page:this.pageFill,keyWords:null,subject:null,contentType:null}}),
        axios({url:"/problem/teacher_problem",params:{type:"问答题",page:this.pageQa,keyWords:null,subject:null,contentType:null}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        if(single.data.size!=0){
          this.problems.single=[];
          for(let i=0;i<single.data.data.length;i++){
            var pro=new Object();
            pro["id"]=single.data.data[i].id;
            pro["subject"]=single.data.data[i].subject;
            pro["question"]=single.data.data[i].question;
            pro["contentType"]=single.data.data[i].contentType;
            pro["question_type"]=single.data.data[i].questionType;
            pro["option"]=single.data.data[i].answerA+"\n"+single.data.data[i].answerB+"\n"+single.data.data[i].answerC+"\n"+single.data.data[i].answerD+"\n"+single.data.data[i].answerE;
            pro["answer"]=single.data.data[i].answer;
            pro["score"]="2";
            this.problems.single.push(pro);
          }
        }
        if(multi.data.size!=0){
          this.problems.multi=[];
          for(let i=0;i<multi.data.data.length;i++){
            var pro=new Object();
            pro["id"]=multi.data.data[i].id;
            pro["subject"]=multi.data.data[i].subject;
            pro["question"]=multi.data.data[i].question;
            pro["contentType"]=multi.data.data[i].contentType;
            pro["question_type"]=multi.data.data[i].questionType;
            pro["option"]=multi.data.data[i].answerA+"\n"+multi.data.data[i].answerB+"\n"+multi.data.data[i].answerC+"\n"+multi.data.data[i].answerD+"\n"+multi.data.data[i].answerE;
            pro["answer"]=multi.data.data[i].answer;
            pro["score"]="2";
            this.problems.multi.push(pro);
          }
        }
        if(fill.data.size!=0){
          this.problems.fill=[];
          for(let i=0;i<fill.data.data.length;i++){
            var pro=new Object();
            pro["id"]=fill.data.data[i].id;
            pro["subject"]=fill.data.data[i].subject;
            pro["question"]=fill.data.data[i].question;
            pro["contentType"]=fill.data.data[i].contentType;
            pro["question_type"]=fill.data.data[i].questionType;
            pro["option"]=fill.data.data[i].answerA+"\n"+fill.data.data[i].answerB+"\n"+fill.data.data[i].answerC+"\n"+fill.data.data[i].answerD+"\n"+fill.data.data[i].answerE;
            pro["answer"]=fill.data.data[i].answer;
            pro["score"]="2";
            this.problems.fill.push(pro);
          }
        }
        if(qa.data.size!=0) {
          this.problems.quesans = [];
          for (let i = 0; i < qa.data.data.length; i++) {
            var pro = new Object();
            pro["id"] = qa.data.data[i].id;
            pro["subject"] = qa.data.data[i].subject;
            pro["question"]= qa.data.data[i].question;
            pro["contentType"] = qa.data.data[i].contentType;
            pro["question_type"] = qa.data.data[i].questionType;
            pro["option"] = qa.data.data[i].answerA + "\n" + qa.data.data[i].answerB + "\n" + qa.data.data[i].answerC + "\n" + qa.data.data[i].answerD + "\n" + qa.data.data[i].answerE;
            pro["answer"] = qa.data.data[i].answer;
            pro["score"] = "2";
            this.problems.quesans.push(pro);
          }
        }
      }))
    },
    downloadTemplate(){
      window.location.href='/static/userTemplate.xlsx'
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
    handleSelect:function (key,keyPath){
      switch (key){
        case '1':
          this.active='1';
          console.log(1);
          break;
        case '2':
          this.active='2';
          console.log(2);
          break;
        case '3':
          this.active='3';
          this.getTeacherProblems();
          this.getAllproblems();
          console.log(3);
          break;
        case '4':
          this.active='4';
          this.getUserGroups();
          console.log(4);
          break;
      }
    },
    handleCreate(){
      this.$router.push('/test_create')
    },
    getUserGroups(){
      axios({
        url:"/user/groups",
        params:{
          page:this.pageGroup
        }
      }).then(res=>{
        this.user_groups=res.data.data;
      })
    },

    checkGroupDetail(id){
      this.userGroupDetail=true;
      this.viewGroupId=id;
      axios({
        url:"/user/groupDetail",
        params:{
          page:this.pageUser,
          groupId:id,
        }
      }).then(res=>{
        this.userGroup=res.data.data;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    viewSet(id){
      this.setdetail=true;
      axios({
        url:"/exercise/setDetail",
        params:{
          id:id,
        }
      }).then(res=>{
        this.setDetail=res.data;
        console.log(this.setDetail);
      })

    },
    viewStudentSet(studentId,exerciseId){
      axios({
        url:"/exercise/viewStudentSet",
        params:{
          studentId:studentId,
          exerciseId:exerciseId,
        }
      }).then(res=>{
        this.$router.push({path:'/viewset',query:{
          setname:res.data.setname,
          score:res.data.score,
          single:res.data.singleChoiceList,
          multi:res.data.multiChoiceList,
          fill:res.data.fillBlankList,
          qa:res.data.questionAnswerList}})
      })
    },
    seeAnalyse(groupId){

    },
    modifyScore(index,data){
      this.editScore=true;
      this.scoreForm.newScore=data.score;
      this.editData=data;
    },
    changeScore(){
      this.editScore=false;
      this.editData.score=this.scoreForm.newScore;
      axios({
        url:"/exercise/modifyProblemScore",
        params:{
          exerciseId:this.setDetail.id,
          problemId:this.editData.id,
          newScore: this.editData.score,
        }
      }).then(res=>{

      })
    },
    searchProblems(type){
      axios({
        url:"/problem/teacher_problem",
        params:{
          keyWords:this.keywords1,
          subject:this.subject1,
          contentType:'',
          type:type,
          page:1
        }
      }).then(res=>{
        if(type==='单项选择题'){
          this.problems.single=res.data.data;
        }
        else if(type==='多项选择题'){
          this.problems.multi=res.data.data;
        }
        else if(type==='填空题'){
          this.problems.fill=res.data.data;
        }
        else if(type==='问答题'){
          this.problems.quesans=res.data.data;
        }
      })

    },
    addProblemFromTiku(id,type){
      let page=0;
      if(type==='单项选择题'){
        page=this.pageSingle;
      }
      else if(type==='多项选择题'){
        page=this.pageMulti;
      }
      else if(type==='填空题'){
        page=this.pageFill;
      }
      else if(type==='问答题'){
        page=this.pageQa;
      }
      axios({
        url:"/problem/add2TeacherProblems",
        params:{
          id:id,
          page:page,
          type:type
        }
      }).then(res=>{
        if(type==='单项选择题'){
          this.problems.single=res.data.data;
        }
        else if(type==='多项选择题'){
          this.problems.multi=res.data.data;
        }
        else if(type==='填空题'){
          this.problems.fill=res.data.data;
        }
        else if(type==='问答题'){
          this.problems.quesans=res.data.data;
        }
      })
    },
    createProblem(){
      axios({
        url:"/problem/newTeacherProblem",
        method:"POST",
        data:this.addques
      }).then(res=>{

      })
    },
    remove(row){
      let page=1;
      if(row.type=='单项选择题'){
        page=this.pageSingle;
      }
      if(row.type=='多项选择题'){
        page=this.pageMulti;
      }
      if(row.type=='填空题'){
        page=this.pageFill;
      }if(row.type=='问答题'){
        page=this.pageQa;
      }
      axios({
        url:"/problem/deleteTeacherProblem",
        params:{
          problemId:row.id,
          type:row.type,
          page:page
        }
      }).then(res=>{
        if(row.type=='单项选择题'){
          this.problems.single=res.data;
        }
        if(row.type=='多项选择题'){
          this.problems.multi=res.data;
        }
        if(row.type=='填空题'){
          this.problems.fill=res.data;
        }if(row.type=='问答题'){
          this.problems.quesans=res.data;
        }
      })
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
    },
    beforeUploadFile(file){
      console.log('before upload');
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.')+1);
      let size = file.size / 1024 / 1024;
      if(extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件');
      }
      if(size > 10) {
        this.$message.warning('文件大小不得超过10M');
      }
    },
    exceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleChange(file, fileList) {
      if(this.userGroupDetail==false){
        this.fileList1.push(file.raw);
      }
      else{
        this.fileList2.push(file.raw);
      }
    },
    handleSuccess(res,file,fileList){
      this.$message.success('文件上传成功');
    },
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败');
    },
    handleRemove(){
      this.$refs.upload.clearFiles();
    },
    addUser2group(id){
      axios({
        url:"user/add2group",
        params:{
          groupId:this.viewGroupId,
          studentId:id,
          page:this.pageUser
        }
      }).then(res=>{
        this.userGroup=res.data.data;
      })
    },
    addUsersByFile(){
      if(this.fileList.length===0){
        this.$message.warning('请上传文件');
      }
      else{
        let form=new FormData();
        form.append('file',this.fileList2);

        axios({
          method:"POST",
          url:"/user/add2group",
          headers:{
            'Content-type':'multipart/form-data'
          },
          data:form
        }).then(res=>{

        }).catch(err=>{

        });
      }
    },
    exportExercise(row){
      axios({
        method:"GET",
        url:"",
        params:{
          userId:row.id,
          exerciseId:this.setDetail.id,
        }
      })
      .then(res=>{
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        let url = window.URL.createObjectURL(blob);
        window.location.href = url;
      })
      .catch(err=>{
        console.log(err);
      })
    },
    createNewUserGroup(){
      let form=new FormData();
      form.append('file',this.fileList1);
      axios({
        url:"/user/createGroup",
        method:"POST",
        headers:{
          'Content-type':'multipart/form-data'
        },
        params:{
          groupName:this.newUserGroup.groupName,
        },
        data:form
      }).then(res=>{
        this.$message('创建成功');
      });
      this.createUserGroup=false;
    },
    searchUser(){
      axios({
        url:"user/searchuser",
        params:{
          id:this.searchUserId,
        }
      }).then(res=>{
        var user=new Object();
        user["id"]=res.data.userId;
        user["sex"]=res.data.sex;
        user["email"]=res.data.email;
        user["name"]=res.data.userName;
        this.searchUserInfo.push(user);
      })
    },
    deleteUser(id){
      axios({
        url:"/user/deleteUser",
        params:{
          groupId:this.viewGroupId,
          studentId:id,
          page:this.pageUser
        }
      }).then(res=>{
        this.userGroup=res.data.data;
      })
    },
    deleteGroup(id){
      axios({
        url:"/user/deleteGroup",
        params:{
          groupId:id,
        }
      }).then(res=>{
        this.user_groups=res.data;
      })
    }
  },
  computed:{
    getval1(){
      let l=0;
      for(let i=0;i<this.exerciseSets.length;i++){
        if(this.exerciseSets[i].state=='1'){
          l=l+1;
        }
      }
      return l;
    },
    getval2(){
      let l=0;
      for(let i=0;i<this.exerciseSets.length;i++){
        if(this.exerciseSets[i].state=='2'){
          l=l+1;
        }
      }
      return l;
    },
    getval3(){
      let l=0;
      for(let i=0;i<this.exerciseSets.length;i++){
        if(this.exerciseSets[i].state=='3'){
          l=l+1;
        }
      }
      return l;
    },
    table1() {
      const search1='中医学基础';
      if(this.active=='2'){
        return this.setDetail.problems.single.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search1)>-1
          })
        })
        return this.setDetail.problems.single;
      }
      if(this.active=='3'){
        return this.problems.single.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search1)>-1
          })
        })
        return this.problems.single;
      }
    },
    table2() {
      const search='多项选择题'
      if(this.active=='2'){
        return this.setDetail.problems.multi.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search)>-1
          })
        })
        return this.setDetail.problems.multi;
      }
      if(this.active=='3'){
        return this.problems.multi.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search)>-1
          })
        })
        return this.problems.multi;
      }
    },
    table3() {
      const search='填空题'
      if(this.active=='2'){
        return this.setDetail.problems.fill.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search)>-1
          })
        })
        return this.setDetail.problems.fill;
      }
      if(this.active=='3'){
        return this.problems.fill.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search)>-1
          })
        })
        return this.problems.fill;
      }
    },
    table4() {
      const search='问答题'
      if(this.active=='2'){
        return this.setDetail.problems.quesans.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search)>-1
          })
        })
        return this.setDetail.problems.quesans;
      }
      if(this.active=='3'){
        return this.problems.quesans.filter(data=>{
          return Object.keys(data).some(key=>{
            return String(data[key]).toLowerCase().indexOf(search)>-1
          })
        })
        return this.problems.quesans;
      }
    },
    showGroup(){
      for(let i=0;i<this.setDetail.groups.length;i++){
        if(this.setDetail.groups[i].id==this.chooseGroup){
          return this.setDetail.groups[i].users;
        }
      }
      return this.setDetail.groups[0].users;
    },
  },
  created() {
    axios({
      url:"/exercise/getTeacherExercise",
      params:{
        pageNum:this.pageSet,
      }
    }).then(res=>{
      if(res.data.size!=0){
        this.exerciseSets=res.data.data;
      }
    }).catch(err=>{

    });
    //this.getAllproblems();

  }

}
</script>

<style scoped>
.card-button {
  float: right;
  padding: 8px;
  margin: 2px;
}
#teacher{
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;
  overflow: auto;
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

</style>
