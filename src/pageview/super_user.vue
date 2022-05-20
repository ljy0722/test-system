<template>
  <div id="super_user">
    <el-container>
      <el-header style="padding: 0">
        <Top></Top>
      </el-header>
      <br>
      <br>
      <br>
      <el-container style="min-height: 500px;margin-top: 50px">
        <el-aside style="margin-top: 50px;" :width="isCollapse ? '64px' : '170px'">
          <div class="toggle-btn" @click="toggleCollapse">|||</div>
          <el-menu class="menuclass" :default-active="active" :collapse="isCollapse" :unique-opened="true" @select="handleSelect">
            <el-menu-item index="0"><i class="el-icon-s-home"></i><span slot="title">首页</span> </el-menu-item>
            <el-submenu index="11">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group style="background-color: #f0f0f0" align="left">
                <el-menu-item index="1" ><i class="el-icon-user-solid"></i>查看所有学生</el-menu-item>
                <el-menu-item index="2" ><i class="el-icon-s-custom"></i>查看所有教师</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-s-check"></i>待审核教师 </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="22">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>题库管理</span>
              </template>
              <el-menu-item-group style="background-color: #f0f0f0" align="left">
                <el-menu-item index="4"><i class="el-icon-document-remove"></i>待审核题目 </el-menu-item>
                <el-menu-item index="5"><i class="el-icon-document"></i>题库管理 </el-menu-item>
                <el-menu-item index="6"><i class="el-icon-circle-plus"></i>习题上传 </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="margin-top: 50px">
          <div v-if="active==='0'">
            <el-card style="width: 100%;">
              <div slot="header" align="left">
                <span style="font-size: large;font-weight: 600">用户情况概览</span>
              </div>
              <div>
                <el-row>
                  <el-col :span="12">
                    <el-row style="float: left;color: grey">
                      用户数量
                    </el-row>
                    <el-row>
                      <UserChart ></UserChart>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                    <el-row style="float: left;color: grey">
                      通知
                    </el-row>
                    <el-row>
                      <div>
                        <el-card style="border-radius: 10px;margin-top: 10%;width: 80%">
                          <div v-if="totalTocheck===0">
                            <span style="color: #40f23a;font-weight: 400;font-size: 20px">无消息</span>
                          </div>
                          <div v-if="totalTocheck!==0">
                            <span style="color: #f23a3a;font-weight: 400;font-size: 20px"><i class="el-icon-s-flag"></i>当前有未审核教师{{totalTocheck}}人，请前往审核！</span>
                          </div>
                        </el-card>
                      </div>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <el-card style="width: 100%;">
              <div slot="header" align="left">
                <span style="font-size: large;font-weight: 600">题库情况概览</span>
              </div>
              <div>
                <el-row>
                  <el-col :span="10">
                    <el-row style="color: grey;text-align: left">
                    <span>
                      各题型数量
                    </span>
                    </el-row>
                    <br>
                    <br>
                    <el-row align="left">
                      <el-col :span="5" >
                        <span style="margin-top: 30px">选择科目</span>
                      </el-col>
                      <el-col :span="10">
                        <el-select v-model="tikusubject" placeholder="选择学科" style="float: left" align="left" @change="getRange(0)">
                          <el-option
                            v-for="item in subjects"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <el-row align="left" style="margin-top: 30px">
                      <el-col :span="5" >
                        <span style="margin-top: 30px">选择考点</span>
                      </el-col>
                      <el-col :span="10">
                        <el-select v-model="tikurange" placeholder="选择考点" style="float: left" align="left" @change="gettikuinfo">
                          <el-option
                            v-for="item in ranges"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
<!--                    <Tiku :a="totalAllSingle" :b="totalAllMulti" :c="totalAllFill" :d="totalAllQa"></Tiku>-->
                    <div class="test2" style="width:100%;height:300px;">
                      <div id="tiku1" style="width:100%;height:100%"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-row style="float: left;color: grey">
                      题目难度分布
                    </el-row>
                    <el-row>
                      <Diff style="margin-top: 20px"></Diff>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>

          </div>
          <div v-if="active==='1'">
            <el-table
              :data="users"
              border
              stripe
              max-height="400"
            >
              <el-table-column
                prop="userId"
                label="用户ID"
                width="180">
              </el-table-column>
              <el-table-column
                prop="userName"
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
                prop="phone"
                label="手机号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="200">
              </el-table-column>
              <el-table-column
                fixed="right"
                width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="modifyUser(scope.row)">修改信息</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="change1"
                :hide-on-single-page="true"
                layout="prev, pager, next"
                :total="totalUser">
              </el-pagination>
            </div>
            <el-dialog
              :visible.sync="modifyuser"
              title="修改用户信息">
              <el-form :model="modifyUserInfo" label-width="60px">
                <el-form-item label="用户ID:">
                  <span style="float: left">{{modifyUserInfo.userId}}</span>
                </el-form-item>
                <el-form-item label="姓名:">
                  <el-input v-model="modifyUserInfo.userName"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                  <el-input v-model="modifyUserInfo.sex"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                  <el-input v-model="modifyUserInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机:">
                  <el-input v-model="modifyUserInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址:">
                  <el-input v-model="modifyUserInfo.address"></el-input>
                </el-form-item>
                <el-button @click="submitModify">确定</el-button>
              </el-form>
            </el-dialog>
          </div>
          <div v-if="active=='2'">
            <el-table
              :data="teacher"
              border
              stripe
              max-height="400"
              >
              <el-table-column
                prop="userId"
                label="用户ID"
                width="100">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="姓名"
                width="100">
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="80">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="200">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="200">
              </el-table-column>
              <el-table-column
                prop="license"
                label="教师资格证编号"
                width="200">
              </el-table-column>
              <el-table-column
                fixed="right"
                width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="modifyUser(scope.row)">修改信息</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="change2"
                :hide-on-single-page="true"
                layout="prev, pager, next"
                :total="totalTeacher">
              </el-pagination>
            </div>
            <el-dialog
              :visible.sync="modifyuser"
              title="修改用户信息">
              <el-form :model="modifyUserInfo" label-width="60px">
                <el-form-item label="用户ID:">
                  <span style="float: left">{{modifyUserInfo.userId}}</span>
                </el-form-item>
                <el-form-item label="姓名:">
                  <el-input v-model="modifyUserInfo.userName"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                  <el-input v-model="modifyUserInfo.sex"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                  <el-input v-model="modifyUserInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机:">
                  <el-input v-model="modifyUserInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址:">
                  <el-input v-model="modifyUserInfo.address"></el-input>
                </el-form-item>
                <el-button @click="submitModify">确定</el-button>
              </el-form>
            </el-dialog>
          </div>
          <div v-if="active=='3'">
            <el-table
              :data="teacher2Check"
              border
              stripe
              max-height="400"
              >
              <el-table-column
                prop="userId"
                label="用户ID"
                width="100">
              </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="200">
              </el-table-column>
              <el-table-column
                prop="license"
                label="教师资格证编号"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="是否审核通过"
                width="150">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="teacherAgree(scope.row.userId)">是</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="teacherNot(scope.row.userId)">否</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="change3"
                :hide-on-single-page="true"
                layout="prev, pager, next"
                :total="totalTocheck">
              </el-pagination>
            </div>
          </div>
          <div v-if="active==4">
            <el-tabs type="border-card" >
              <el-tab-pane label="单选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject1" placeholder="选择学科" style="float: left" align="left" @change="getRange(1)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange1" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchCheckPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getTocheckProblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problems2CheckSingle"
                  stripe
                  border
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
                    label="考点"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="275">
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
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="passproblem(scope.row.id)">通过</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="notpassproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change4"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalTocheckSingle">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="多选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject1" placeholder="选择学科" style="float: left" align="left" @change="getRange(1)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange1" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchCheckPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getTocheckProblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problems2CheckMulti"
                  stripe
                  border
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
                    label="考点"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="275">
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
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="passproblem(scope.row.id)">通过</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="notpassproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change5"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalTocheckMulti">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="填空题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject1" placeholder="选择学科" style="float: left" align="left" @change="getRange(1)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange1" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchCheckPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getTocheckProblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problems2CheckFill"
                  stripe
                  border
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
                    label="考点"
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
                    prop="difficultScore"
                    label="难度"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="passproblem(scope.row.id)">通过</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="notpassproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change6"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalTocheckFill">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="问答题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject1" placeholder="选择学科" style="float: left" align="left" @change="getRange(1)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange1" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchCheckPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getTocheckProblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problems2CheckQa"
                  stripe
                  border
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
                    label="考点"
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
                    prop="difficultScore"
                    label="难度"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="success"
                        @click="passproblem(scope.row.id)">通过</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="notpassproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change7"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalTocheckQa">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>

          </div>
          <div v-if="active=='5'">
            <el-tabs type="border-card" >
              <el-tab-pane label="单选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject2" placeholder="选择学科" style="float: left" align="left" @change="getRange(2)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange2" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchAllPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getAllproblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problemsSingle"
                  stripe
                  border
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
                    label="考点"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="275">
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
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="modifyproblem(scope.row)">修改</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="deleteproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change8"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalAllSingle">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="多选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject2" placeholder="选择学科" style="float: left" align="left" @change="getRange(2)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange2" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchAllPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getAllproblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problemsMulti"
                  stripe
                  border
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
                    label="考点"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="question"
                    label="题目"
                    width="275">
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
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="modifyproblem(scope.row)">修改</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="deleteproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change9"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalAllMulti">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="填空题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject2" placeholder="选择学科" style="float: left" align="left" @change="getRange(2)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange2" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchAllPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getAllproblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problemsFill"
                  stripe
                  border
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
                    label="考点"
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
                    prop="difficultScore"
                    label="难度"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="modifyproblem(scope.row)">修改</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="deleteproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change10"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalAllFill">
                  </el-pagination>
                </div>
              </el-tab-pane>
              <el-tab-pane label="问答题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject2" placeholder="选择学科" style="float: left" align="left" @change="getRange(2)">
                      <el-option
                        v-for="item in subjects"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="searchRange2" placeholder="选择考点" style="float: left" align="left">
                      <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="searchAllPro" placeholder="题目关键字搜索" style="margin-left: 20px"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" @click="getAllproblems">搜索</el-button>
                  </el-col>
                </el-row>
                <el-table
                  :data="problemsQa"
                  stripe
                  border
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
                    label="考点"
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
                    prop="difficultScore"
                    label="难度"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="source"
                    label="来源"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="modifyproblem(scope.row)">修改</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="deleteproblem(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @current-change="change11"
                    :hide-on-single-page="true"
                    layout="prev, pager, next"
                    :total="totalAllQa">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
            <el-dialog
              title="修改题目"
              :visible.sync="modify">
              <el-form :model="modifyProblem" label-width="60px">
                <el-form-item label="题号:">
                  <span style="float: left">{{modifyProblem.id}}</span>
                </el-form-item>
                <el-form-item label="学科:">
                  <el-input :disabled="true" v-model="modifyProblem.subject"></el-input>
                </el-form-item>
                <el-form-item label="考点:">
                  <el-input :disabled="true" v-model="modifyProblem.contentType"></el-input>
                </el-form-item>
                <el-form-item label="题目:">
                  <el-input v-model="modifyProblem.question"></el-input>
                </el-form-item>
                <el-form-item label="选项A:" v-if="modifyProblem.questionType==='单项选择题'||modifyProblem.questionType==='多项选择题'">
                  <el-input v-model="modifyProblem.answerA"></el-input>
                </el-form-item>
                <el-form-item label="选项B:" v-if="modifyProblem.questionType==='单项选择题'||modifyProblem.questionType==='多项选择题'">
                  <el-input v-model="modifyProblem.answerB"></el-input>
                </el-form-item>
                <el-form-item label="选项C:" v-if="modifyProblem.questionType==='单项选择题'||modifyProblem.questionType==='多项选择题'">
                  <el-input v-model="modifyProblem.answerC"></el-input>
                </el-form-item>
                <el-form-item label="选项D:" v-if="modifyProblem.questionType==='单项选择题'||modifyProblem.questionType==='多项选择题'">
                  <el-input v-model="modifyProblem.answerD"></el-input>
                </el-form-item>
                <el-form-item label="选项E:" v-if="modifyProblem.questionType=='单项选择题'||modifyProblem.questionType=='多项选择题'">
                  <el-input v-model="modifyProblem.answerE"></el-input>
                </el-form-item>
                <el-form-item label="答案:">
                  <el-input v-model="modifyProblem.answer"></el-input>
                </el-form-item>
                <el-form-item label="难度:">
                  <el-input v-model="modifyProblem.difficultScore"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitmodify">确定</el-button>
              </el-form>
            </el-dialog>
          </div>
          <div v-if="active=='6'">
            <el-row>
              <el-col :span="12">
                <el-card style="width:100%;margin-left: 5%;margin-bottom: 50px">
                  <div slot="header" align="left">
                    <span>管理员新建题目</span>
                  </div>
                  <div align="left">
                    <span style="font-weight: 200;font-size: small">选择题型</span>
                    <el-select style="margin-left: 40px" v-model="addques.type" default-first-option>
                      <el-option
                        v-for="item in tixing"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <br>
                  <el-form  v-if="addques.type==='单项选择题'" :model="addques" label-position="left" label-width="100px">
                    <el-row>
                      <el-col :span="10">
                        <el-form-item label="学科">
                          <el-input v-model="addques.subject_new"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <el-form-item label="考点">
                          <el-input v-model="addques.content_type_new"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="题目">
                      <el-col :span="20">
                        <el-input type="textarea" v-model="addques.question_new"></el-input>
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
                  <el-form  v-if="addques.type==='多项选择题'" :model="addques" label-position="left" label-width="100px">
                    <el-row>
                      <el-col :span="10">
                        <el-form-item label="学科">
                          <el-input v-model="addques.subject_new"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <el-form-item label="考点">
                          <el-input v-model="addques.content_type_new"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="题目">
                      <el-col :span="20">
                        <el-input type="textarea" v-model="addques.question_new"></el-input>
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
                  <el-form  v-if="addques.type==='填空题'" :model="addques" label-position="left" label-width="100px">
                    <el-row>
                      <el-col :span="10">
                        <el-form-item label="学科">
                          <el-input v-model="addques.subject_new"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <el-form-item label="考点">
                          <el-input v-model="addques.content_type_new"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="题目">
                      <el-col :span="20">
                        <el-input type="textarea" v-model="addques.question_new"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="答案">
                      <el-col :span="18">
                        <el-input type="textarea" v-model="addques.answer"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-form>
                  <el-form  v-if="addques.type==='问答题'" :model="addques" label-position="left" label-width="100px">
                    <el-row>
                      <el-col :span="10">
                        <el-form-item label="学科">
                          <el-input v-model="addques.subject_new"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <el-form-item label="考点">
                          <el-input v-model="addques.content_type_new"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="题目">
                      <el-col :span="20">
                        <el-input type="textarea" v-model="addques.question_new"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="答案">
                      <el-col :span="18">
                        <el-input type="textarea" v-model="addques.answer"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-form>
                  <el-button type="primary" @click="createProblem">添加</el-button>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card  style="width: 80%;margin-left: 20%">
                  <div slot="header" align="left">
                    <span>批量导入题库</span>
                  </div>
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    :on-change="handleChange"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="fileList"
                    accept=".xlsx"
                    :auto-upload="false"
                    align="left">
                    <el-button  size="small" type="primary">点击上传</el-button>
                    <div slot="tip" align="left" class="el-upload__tip">批量导入说明：只能上传.xslx文件，一次上传一份文件，仅限单选题、多选题、填空题和多选题四种题型,具体格式请下载模板查看</div>
                    <el-button @click="download" size="small" type="plain">下载模板</el-button>
                  </el-upload>
                  <el-button type="primary" size="small" style="margin-top: 60px;margin-bottom: 20px;float: left" @click="uploadFile">导入题库</el-button>
                </el-card>
              </el-col>
            </el-row>


          </div>
        </el-main>
      </el-container>
      <el-footer style="padding: 0">
        <Down></Down>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
import UserChart from './chart/userchart'
import ProblemNumChart from './chart/problemchart'
import Tiku from './chart/tiku'
import Diff from './chart/difficultchart'
import axios from "axios";
export default {
  name: "super_user",

  data(){
    return{
      active:'0',
      isCollapse:false,
      num:[],
      mychart:'',
      tikusubject:'',
      tikurange:'',
      totalUser:1,
      pageUser:1,
      totalTeacher:1,
      pageTeacher:1,
      totalTocheck:1,
      pageTocheck:1,
      totalAllSingle:2098,
      pageAllSingle:1,
      totalAllMulti:1076,
      pageAllMulti:1,
      totalAllFill:1,
      pageAllFill:1,
      totalAllQa:1,
      pageAllQa:1,
      totalTocheckSingle:1,
      pageTocheckSingle:1,
      totalTocheckMulti:1,
      pageTocheckMulti:1,
      totalTocheckFill:1,
      pageTocheckFill:1,
      totalTocheckQa:1,
      pageTocheckQa:1,
      searchcontent1:'',
      searchcontent2:'',
      subject1:'',
      subject2:'',
      users:[],
      teacher:[],
      teacher2Check:[],
      fileList:[],
      problems2CheckSingle:[],
      problems2CheckMulti:[],
      problems2CheckFill:[],
      problems2CheckQa:[],
      problemsSingle:[],
      problemsMulti:[],
      problemsFill:[],
      problemsQa:[],
      modify:false,
      modifyProblem:{
        id:'',
        question:'',
        answerA:'',
        answerB:'',
        answerC:'',
        answerD:'',
        answerE:'',
        answer:'',
        subject:'',
        contentType:'',
        questionType:'',
        difficultScore:'',
        source:''
      },
      subjects:[],
      ranges:[],
      searchSubject1:null,
      searchRange1:null,
      searchSubject2:null,
      searchRange2:null,
      searchCheckPro:null,
      searchAllPro:null,
      modifyuser:false,
      modifyUserInfo:{
        userId:'',
        userName:'',
        email:'',
        address:'',
        sex:'',
        phone:''
      },
      addques:{
        type:'单项选择题',
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
    }
  },
  mounted() {
    this.$nextTick(this.drawLine());
  },
  components:{
    Top,Down,UserChart,ProblemNumChart,Tiku,Diff
  },
  methods:{
    drawLine(){
      this.mychart = this.$echarts.init(document.getElementById('tiku1'));
      var option;

      option = {
        title: {
          text: '题型数量占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.totalAllSingle, name: '单项选择题' },
              { value: this.totalAllMulti, name: '多项选择题' },
              { value: this.totalAllFill, name: '填空题' },
              { value: this.totalAllQa, name: '问答题' },

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.mychart.setOption(option,true);
    },
    handleSelect:function (key,keyPath){
      switch (key){
        case '0':
          this.active='0';

          console.log(this.active);
          break;
        case '1':
          this.active='1';
          this.getAllUsers();
          console.log(this.active);
          break;
        case '2':
          this.active='2';
          this.getAllTeachers();
          console.log(this.active);
          break;
        case '3':
          this.active='3';
          this.getTocheckTeachers();
          console.log(this.active);
          break;
        case '4':
          this.active='4';
          this.getTocheckProblems();
          console.log(this.active);
          break;
        case '5':
          this.active='5';
          this.getAllproblems();
          console.log(this.active);
          break;
        case '6':
          this.active='6';
          console.log(6);
          break;
      }
    },
    getAllUsers(){
      axios({
        url:"/user/alluser",
        params:{
          page:this.pageUser,
        }
      })
        .then(res=>{
          this.users=res.data.data;
          this.totalUser=res.data.total;
        })
        .catch(err=>{
          console.log(err);
        })
    },
    getAllTeachers(){
      axios({
        url:"/user/teachers",
        params:{
          page:this.pageTeacher,
        }
      })
        .then(res=>{
          this.teacher=res.data.data;
          this.totalTeacher=res.data.total;
        })
        .catch(err=>{
          console.log(err);
        })
    },
    getTocheckTeachers(){
      axios({
        url:"/user/tocheck",
        params:{
          page:this.pageTocheck,
        }
      })
        .then(res=>{
          this.teacher2Check=res.data.data;
          this.totalTocheck=res.data.total;
        })
        .catch(err=>{
          console.log(err);
        })
    },
    getTocheckProblems(){
      axios.all([
        axios({url:"/problem/tocheck",params:{page:this.pageTocheckSingle,keyWords:this.searchCheckPro,subject:this.searchSubject1,contentType:this.searchRange1,type:'单项选择题'}}),
        axios({url:"/problem/tocheck",params:{page:this.pageTocheckMulti,keyWords:this.searchCheckPro,subject:this.searchSubject1,contentType:this.searchRange1,type:'多项选择题'}}),
        axios({url:"/problem/tocheck",params:{page:this.pageTocheckFill,keyWords:this.searchCheckPro,subject:this.searchSubject1,contentType:this.searchRange1,type:'填空题'}}),
        axios({url:"/problem/tocheck",params:{page:this.pageTocheckQa,keyWords:this.searchCheckPro,subject:this.searchSubject1,contentType:this.searchRange1,type:'问答题'}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        this.problems2CheckSingle=single.data.data;
        this.problems2CheckMulti=multi.data.data;
        this.problems2CheckFill=fill.data.data;
        this.problems2CheckQa=qa.data.data;
        this.totalTocheckSingle=single.data.total;
        this.totalTocheckMulti=multi.data.total;
        this.totalTocheckFill=fill.data.total;
        this.totalTocheckQa=qa.data.total;
      }))
    },
    getAllproblems(){
      axios.all([
        axios({url:"/problem/all_problem",params:{page:this.pageAllSingle,keyWords:this.searchAllPro,subject:this.searchSubject2,contentType:this.searchRange2,type:'单项选择题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllMulti,keyWords:this.searchAllPro,subject:this.searchSubject2,contentType:this.searchRange2,type:'多项选择题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllFill,keyWords:this.searchAllPro,subject:this.searchSubject2,contentType:this.searchRange2,type:'填空题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllQa,keyWords:this.searchAllPro,subject:this.searchSubject2,contentType:this.searchRange2,type:'问答题'}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        this.problemsSingle=single.data.data;
        this.problemsMulti=multi.data.data;
        this.problemsFill=fill.data.data;
        this.problemsQa=qa.data.data;
        this.totalAllSingle=single.data.total;
        this.totalAllMulti=multi.data.total;
        this.totalAllFill=fill.data.total;
        this.totalAllQa=qa.data.total;
      }))
    },
    modifyUser(row){
      console.log(row.userId);
      this.modifyUserInfo=row;
      this.modifyuser=true;
    },
    submitModify(){
      axios({
        url:"/user/modifyUserInfo",
        method:"POST",
        data:{
          userId:this.modifyUserInfo.userId,
          userName:this.modifyUserInfo.userName,
          sex:this.modifyUserInfo.sex,
          birthday:null,
          identity:null,
          phoneNum:this.modifyUserInfo.phone,
          email:this.modifyUserInfo.email,
          address:this.modifyUserInfo.address,
          applyTeacher:null
        }
      }).then(res=>{
        this.getAllUsers();
        this.getAllTeachers();
      })
      this.modifyuser=false;
    },
    teacherAgree(id){
      let tid=id;
      axios({
        url:"/user/checkApply",
        params:{
          check:1,
          teacherId:tid,
        }
      })
      .then(res=>{
        if(res.data==="通过"){
          this.$message('审核通过！');
        }
        else{
          this.$message('审核不通过！');
        }
        this.getTocheckTeachers();
      })
        .catch(err=>{
          console.log(err);
        })
    },
    teacherNot(id){
      let tid=id
      axios({
        url:"/user/checkApply",
        params:{
          check:0,
          teacherId:tid,
        }
      })
        .then(res=>{
          this.$message('审核不通过！');
          this.getTocheckTeachers();
        })
        .catch(err=>{
          console.log(err);
        })
    },
    passproblem(pid){
      axios({
        url:"/problem/checkProblem",
        params:{
          check:1,
          pid:pid,
        }
      })
        .then(res=>{
          this.$message('审核通过！');
          this.problems2Check=res.data;
          this.getTocheckProblems();
        })
      .catch(err=>{
        console.log(err);
      })
    },
    notpassproblem(pid){
      axios({
        url:"/problem/checkProblem",
        params:{
          check:0,
          id:pid,
        }
      })
        .then(res=>{
          this.$message('审核不通过！');
          this.getTocheckProblems();
        })
        .catch(err=>{
          console.log(err);
        })
    },
    modifyproblem(row){
      this.modify=true;
      this.modifyProblem.id=row.id;
      this.modifyProblem.question=row.question;
      if(row.questionType=='单项选择题'||row.questionType=='多项选择题'){
        this.modifyProblem.answerA=row.answerA;
        this.modifyProblem.answerB=row.answerB;
        this.modifyProblem.answerC=row.answerC;
        this.modifyProblem.answerD=row.answerD;
        this.modifyProblem.answerE=row.answerE;
      }
      this.modifyProblem.answer=row.answer;
      this.modifyProblem.questionType=row.questionType;
      this.modifyProblem.subject=row.subject;
      this.modifyProblem.contentType=row.contentType;
      this.modifyProblem.difficultScore=row.difficultScore;
    },
    submitmodify(){
      this.modify=false;
      axios({
        url:"/problem/modifyProblem",
        method:"POST",
        data:this.modifyProblem
      }).then(res=>{
        this.getAllproblems();
        this.$message('修改成功');
      }).catch(err=>{
        this.$message('修改失败');
      })
    },
    deleteproblem(id){
      axios({
        url:"/problem/deleteProblem",
        params:{
          problemId:id,
        }
      }).then(res=>{
        this.getAllproblems();
        this.$message('删除成功');
      }).catch(err=>{
        this.$message('删除失败');
      })
    },

    change1(val){
      this.pageUser=val;
      this.getAllUsers();
    },
    change2(val){
      this.pageTeacher=val;
      this.getAllTeachers();
    },
    change3(val){
      this.pageTocheck=val;
      this.getTocheckTeachers();
    },
    change4(val){
      this.pageTocheckSingle=val;
      this.getTocheckProblems();
    },
    change5(val){
      this.pageTocheckMulti=val;
      this.getTocheckProblems();
    },
    change6(val){
      this.pageTocheckFill=val;
      this.getTocheckProblems();
    },
    change7(val){
      this.pageTocheckQa=val;
      this.getTocheckProblems();
    },
    change8(val){
      this.pageAllSingle=val;
      this.getAllproblems();
    },
    change9(val){
      this.pageAllMulti=val;
      this.getAllproblems();
    },
    change10(val){
      this.pageAllFill=val;
      this.getAllproblems();
    },
    change11(val){
      this.pageAllQa=val;
      this.getAllproblems();
    },


    operate(index,row){

      console.log(index,row);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    download() {
      window.location.href='/static/problemTemplate.xlsx'
    },
    handleChange(file, fileList) {
      this.fileList.push(file.raw);
    },
    createProblem(){
      axios({
        url:"/problem/newTeacherProblem",
        method:"POST",
        data:this.addques
      }).then(res=>{
      })
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
    },
    uploadFile(){
      if(this.fileList.length===0){
        this.$message.warning('请上传文件');
      }
      else{
        let form=new FormData();
        form.append('file',this.fileList[0]);
        axios({
          method:"POST",
          url:"/problem/importProblems",
          headers:{
            'Content-type':'multipart/form-data'
          },
          data:form
        }).then(res=>{
          this.fileList=[];
        }).catch(err=>{

        });
      }
    },
    getRange(n){
      let sub=this.searchSubject1;
      if(n===2){
        sub=this.searchSubject2;
      }
      if (n===0){
        sub=this.tikusubject;
      }
      axios({
        url:"/problem/ranges",
        params:{
          subject:sub
        }
      }).then(res=>{
        this.ranges=res.data;
      })
    },
    gettikuinfo(){
      axios.all([
        axios({url:"/problem/all_problem",params:{page:this.pageAllSingle,keyWords:this.searchAllPro,subject:this.tikusubject,contentType:this.tikurange,type:'单项选择题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllMulti,keyWords:this.searchAllPro,subject:this.tikusubject,contentType:this.tikurange,type:'多项选择题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllFill,keyWords:this.searchAllPro,subject:this.tikusubject,contentType:this.tikurange,type:'填空题'}}),
        axios({url:"/problem/all_problem",params:{page:this.pageAllQa,keyWords:this.searchAllPro,subject:this.tikusubject,contentType:this.tikurange,type:'问答题'}}),
      ]).then(axios.spread((single,multi,fill,qa)=>{
        this.problemsSingle=single.data.data;
        this.problemsMulti=multi.data.data;
        this.problemsFill=fill.data.data;
        this.problemsQa=qa.data.data;
        this.totalAllSingle=single.data.total;
        this.totalAllMulti=multi.data.total;
        this.totalAllFill=fill.data.total;
        this.totalAllQa=qa.data.total;
      }))
      this.drawLine();
      this.$forceUpdate();
    }
  },
  computed: {
    table1() {
      //const search = '单项选择题'
      const search1=this.searchcontent1;
      const search2=this.searchcontent2;
      if(this.active=='4'){
        if(search1!=''){
          return this.problems2CheckSingle.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search1) > -1
            })
          })
        }
        return this.problems2CheckSingle;
      }
      if(this.active=='5'){
        if(search2!=''){
          return this.problemsSingle.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search2) > -1
            })
          })
        }
        return this.problemsSingle;
      }
    },
    table2() {
      //const search = '多项选择题'
      const search1=this.searchcontent1;
      const search2=this.searchcontent2;
      if(this.active=='4'){
        if(search1!=''){
          return this.problems2CheckMulti.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search1) > -1
            })
          })
        }
        return this.problems2CheckMulti;
      }
      if(this.active=='5'){
        if(search2!=''){
          return this.problemsMulti.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search2) > -1
            })
          })
        }
        return this.problemsMulti;
      }
    },
    table3() {
      //const search = '填空题'
      const search1=this.searchcontent1;
      const search2=this.searchcontent2;
      if(this.active=='4'){
        if(search1!=''){
          return this.problems2CheckFill.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search1) > -1
            })
          })
        }
        return this.problems2CheckFill;
      }
      if(this.active=='5'){
        if(search2!=''){
          return this.problemsFill.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search2) > -1
            })
          })
        }
        return this.problemsFill;
      }
    },
    table4() {
      //const search = '问答题'
      const search1=this.searchcontent1;
      const search2=this.searchcontent2;
      if(this.active=='4'){
        if(search1!=''){
          return this.problems2CheckQa.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search1) > -1
            })
          })
        }
        return this.problems2CheckQa;
      }
      if(this.active=='5'){
        if(search2!=''){
          return this.problemsQa.filter(data => {
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search2) > -1
            })
          })
        }
        return this.problemsQa;
      }
    },
  },
  created() {
    axios({
      url:"/problem/allsubjects",
    }).then(res=>{
      this.subjects=res.data;
    })
    this.getAllproblems();
    this.getTocheckTeachers();

    //console.log(this.num);
  }
}
</script>

<style scoped>
#super_user{
  background: url("../assets/images/bg11.jpg") no-repeat;
  background-size: cover;
}
.toggle-btn{
  width: 150px;
  background: dimgrey;
  font-size:10px;
  line-height:24px;
  color:#fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor:pointer;
}
.menuclass:not(.el-menu--collapse) {
  width: 150px;
  min-height: 200px;
  border-radius: 10px;
}
</style>
