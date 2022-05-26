<template>
  <div id="student">
    <el-container>
      <el-header style="padding: 0">
        <Top></Top>
      </el-header>
      <el-container style="min-height: 500px;">
        <el-aside style="margin-top: 120px" :width="isCollapse ? '64px' : '140px'">
          <div class="toggle-btn" @click="toggleCollapse">|||</div>
          <el-menu class="menuclass" :default-active="active" :collapse="isCollapse" @select="handleSelect">
            <el-menu-item index="0"><i class="el-icon-s-home"></i><span slot="title">首页</span></el-menu-item>
            <el-menu-item index="1" ><i class="el-icon-s-unfold"></i><span slot="title">开始练习</span></el-menu-item>
            <el-menu-item index="2" v-if="haveTest===true"><i class="el-icon-timer"></i><span slot="title">开始考试 </span></el-menu-item>
            <el-menu-item index="3"><i class="el-icon-s-order"></i><span slot="title">历次题集 </span></el-menu-item>
            <el-menu-item index="4"><i class="el-icon-s-release"></i><span slot="title">我的错题</span> </el-menu-item>
            <el-menu-item index="5"><i class="el-icon-s-grid"></i><span slot="title">数据分析 </span></el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="margin-top: 100px;min-height: 600px">
          <div v-if="active==='0'" style="margin-top: 10px">
            <el-col :span="15">
              <calinder></calinder>
            </el-col>
            <el-col :span="2">
              <span style="font-size: 18px;font-weight: 600;font-family: 黑体">随机测</span>
            </el-col>
            <el-col :span="6">
              <div class="block" @click="showAnswer=true">
                <el-carousel :autoplay=false trigger="click" height="400px" @change="showAnswer=false" class="random">
                  <el-carousel-item  v-for="item in randomProblems" :key="item">
                    <div style="text-align: center">
                      <p class="small" style="font-size: 16px;font-weight: 700;margin-top: 20px;margin-left: 10px;margin-right: 10px">{{ item.question }}</p>
                    </div>
                    <el-divider style="margin-top: 0"></el-divider>
                    <el-row style="margin-top: 20px;font-weight: 600;font-size: 14px">
                        <div style="color: grey;text-align: center">A:{{ item.answerA }}</div>
                    </el-row>
                    <el-row style="margin-top: 20px;font-weight: 600;font-size: 14px">
                      <div style="color: grey;text-align: center">B:{{ item.answerB }}</div>
                    </el-row>
                    <el-row style="margin-top: 20px;font-weight: 600;font-size: 14px">
                      <div style="color: grey;text-align: center">C:{{ item.answerC }}</div>
                    </el-row>
                    <el-row style="margin-top: 20px;font-weight: 600;font-size: 14px">
                      <div style="color: grey;text-align: center">D:{{ item.answerE }}</div>
                    </el-row>
                    <el-row style="margin-top: 20px;font-weight: 600;font-size: 14px">
                      <div style="color: grey;text-align: center">E:{{ item.answerE }}</div>
                    </el-row>
                    <div style="margin-bottom: 5%">
                      <p class="small"  v-if="showAnswer===false">点击查看答案</p>
                      <p class="small" style="margin-bottom: 5%" v-if="showAnswer===true">答案:   {{ item.answer }}</p>
                    </div>

                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>



          </div>
          <div v-if="active==='1'">
            <el-row>
              <el-col :span="16">
                <el-card id="create-exercise" style="width: 90%;margin-left: 10%" align="left">
                  <div slot="header" style="background: lightgray;font-size: x-large;font-family: 'Adobe 黑体 Std R';font-weight: 600">
                    <span>练习生成选项</span>
                  </div>

                  <div style="width: 100%;margin-left: 15px">
                    <h3>选择科目</h3>
                    <el-row>
                      <span>学科：</span>
                      <el-select style="margin-left: 5%;width: 30%" v-model="exercise.subject"  @change="getRange1">
                        <el-option
                          v-for="item in subjects1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-row>
                  </div>
                  <el-divider></el-divider>
                  <div style="width: 100%;margin-left: 15px">
                    <h3>选择考点</h3>
                    <el-row>
                      <span>考点:</span>
                      <el-select style="margin-left: 7%;width: 30%" v-model="exercise.range" multiple>
                        <el-option
                          v-for="item in ranges1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-row>

                  </div>
                  <el-divider></el-divider>
                  <div style="margin-left: 15px">
                    <h3>题量设置</h3>
                    <p style="font-size: 10px;color: grey">若系统在该考点下的某题型数量小于您所选择的数量，将提供最大数量</p>
                    <el-row>
                      <span>单项选择题:</span>
                      <el-input-number controls-position="right" min="0" max="20" style="width: 30%;margin-bottom: 6px" v-model="exercise.danxuan"  placeholder="单选题数量"></el-input-number>
                    </el-row>
                    <el-row>
                      <span>多项选择题:</span>
                      <el-input-number controls-position="right"  min="0" max="20" style="width: 30%;margin-bottom: 6px" v-model="exercise.duoxuan" placeholder="多选题数量"></el-input-number>
                    </el-row>
                    <el-row>
                      <span>填空题:</span>
                      <el-input-number controls-position="right" min="0" max="20" style="width: 30%;margin-bottom: 6px;margin-left: 33px" v-model="exercise.tiankong" placeholder="填空题数量"></el-input-number>
                    </el-row>
                    <el-row>
                      <span>问答题:</span>
                      <el-input-number controls-position="right" min="0" max="20" style="width: 30%;margin-bottom: 6px;margin-left: 33px" v-model="exercise.wenda" placeholder="问答题数量"></el-input-number>
                    </el-row>
                  </div>
                  <el-divider></el-divider>
                  <div style="width: 100%;margin-left: 15px">
                    <h3>练习时长</h3>
                    <el-row>
                      <span>时长设置:</span>
                      <el-input-number style="width: 30%;margin-left: 2%" min="1" max="120" controls-position="right" v-model="exercise.time"><template slot="append">分钟</template></el-input-number>
                    </el-row>
                  </div>
                  <el-divider></el-divider>
                  <div style="width: 50%;margin-left: 15px">
                    <el-button style="margin-left: 40%" type="primary" @click="submitTestRequirement">开始练习</el-button>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card style="height: 50%;margin-left: 10%">
                  <div slot="header" class="clearfix" style="background: lightgray;height: border-box;font-weight: 600">
                    <span >系统题库中当前有：</span>
                  </div>
                  <div style="font-size: 14px">
                    <el-row>
                      <el-col :span="12">
                        学科
                      </el-col>
                      <el-col :span="12">
                        考点
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 10px">
                      <el-col :span="12">
                        <span style="font-family: 'Arial Black';font-weight: 200">{{num[0]}}</span>
                      </el-col>
                      <el-col :span="12">
                        <span style="font-family: 'Arial Black';font-weight: 200">{{num[1]}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        单选题
                      </el-col>
                      <el-col :span="12">
                        多选题
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 10px">
                      <el-col :span="12">
                        <span style="font-family: 'Arial Black';font-weight: 200">{{num[2]}}</span>
                      </el-col>
                      <el-col :span="12">
                        <span style="font-family: 'Arial Black';font-weight: 200">{{num[3]}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        填空题
                      </el-col>
                      <el-col :span="12">
                        问答题
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 10px">
                      <el-col :span="12">
                        <span style="font-family: 'Arial Black';font-weight: 200">{{num[4]}}</span>
                      </el-col>
                      <el-col :span="12">
                        <span style="font-family: 'Arial Black';font-weight: 200">{{num[5]}}</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>

          </div>
          <div v-if="active==='2'">
            <el-card style="margin-bottom: 5px;height: 60px"
                     v-for="(i,index) in exerciseSets"
                     v-bind:key="index"

            >
              <el-row style="margin-top: -15px">
                <el-button type="text"   style="font-size: large;font-size: 17px;color: dodgerblue;margin-left: 20px;float: left" @click="viewSet(i.exerciseId,i.state,i.timeState,i.endTime)"> {{ i.exerciseName }}</el-button>
<!--                <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: yellowgreen;color: white;padding: 0 10px;border-radius: 20%" v-if="i.timeState==='1'">未开始</span></i>-->
                <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: dodgerblue;color: white;padding: 0 10px;border-radius: 20%" v-if="i.timeState==='2'">正在进行</span></i>
<!--                <i><span style="float: right;font-family: 'Adobe 宋体 Std L';font-size: small;background-color: #868686;color: white;padding: 0 10px;border-radius: 20%" v-if="i.timeState==='3'">已结束</span></i>-->
              </el-row>
              <el-row style="margin-top: -5px;float: right">
                <span style="float: left;font-size: small">起止时间：{{i.startTime}}--{{i.endTime}}</span>
              </el-row>
            </el-card>
            <el-pagination
              @current-change="change00"
              page-size="20"
              :hide-on-single-page="true"
              layout="prev, pager, next"
              :total="totalTests">
            </el-pagination>
          </div>
          <div v-if="active==='3'">
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
          <div v-if="active==='4'">
            <el-tabs type="border-card" >
              <el-tab-pane label="单选题">
                <el-row>
                  <el-col :span="3">
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange(searchSubject)">
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
                  stripe
                  border
                  ref="wrongProblem"
                  style="width: 100%;white-space: pre-line">
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="考点"
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
                        type="danger"
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
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange(searchSubject)">
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
                  stripe
                  border
                  ref="wrongProblem"
                  style="width: 100%">
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="考点"
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
                        type="danger"
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
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange(searchSubject)">
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
                  stripe
                  border
                  ref="wrongProblem"
                  style="width: 100%">
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="考点"
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
                        type="danger"
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
                    <el-select v-model="searchSubject" placeholder="选择学科" style="float: left" align="left" @change="getRange(searchSubject)">
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
                  stripe
                  border
                  ref="wrongProblem"
                  style="width: 100%">
                  <el-table-column
                    prop="subject"
                    label="学科"
                    width="130">
                  </el-table-column>
                  <el-table-column
                    prop="contentType"
                    label="考点"
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
                        type="danger"
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
          <div v-if="active==='5'" align="left">
            <el-row>
              <span style="font-size: 25px;font-weight: 600;font-family: 黑体">做题数据</span>
            </el-row>
            <el-row>
              <el-col :span="8">
                <br>
                <el-card class="exer-info" style="width: 100%">
                  <el-button type="text" style="font-size: 50px" @click="gotoTest">{{user.test_num}}</el-button>
                  <i style="font-size: 60px;margin-left: 60%" class="el-icon-finished"></i>
                  <br>
                  <div>
                    <span style="color: #868686">完成的考试次数</span>
                  </div>
                </el-card>
                <el-card class="exer-info" style="width: 100%;margin-top: 10px">
                  <el-button type="text" style="font-size: 50px" @click="gotoExercise">{{user.practiceAttendedNum}}</el-button>
                  <i style="font-size: 60px;margin-left: 60%" class="el-icon-check"></i>
                  <br>
                  <div>
                    <span style="color: #868686">完成的练习次数</span>
                  </div>
                  <div>

                  </div>
                </el-card>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-row>
                  <el-card class="exer-info" style="width: 100%;margin-top: 22px;height: 135px">
                    <el-row>
                      <el-col :span="8">
                        <el-button type="text" style="font-size: 50px" @click="gotoDone">{{user.exer_num}}</el-button>
                      </el-col>
                      <el-col :span="16">
                        <i style="font-size: 60px;margin-left: 60%;margin-top: 10px" class="el-icon-folder-opened"></i>
                      </el-col>
                    </el-row>
                    <el-row>
                      <span style="color: #868686">做过的题目数量</span>
                    </el-row>
                    <br>
                    <div>

                    </div>
                  </el-card>
                </el-row>

                <el-card class="exer-info" style="width: 100%;margin-top: 10px;height: 135px">
                  <el-row>
                    <el-col :span="8">
                      <el-button type="text" style="font-size: 50px" @click="gotoWrong">{{user.wrong_num}}</el-button>
                    </el-col>
                    <el-col :span="16">
                      <i style="font-size: 60px;margin-left: 60%;margin-top: 10px" class="el-icon-close"></i>
                    </el-col>
                  </el-row>

                  <el-row>
                    <span style="color: #868686">错题数量</span>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            <br>
            <br>
            <el-row>
              <span style="font-size: 25px;font-weight: 600;font-family: 黑体">分析与总结</span>
            </el-row>

            <el-row>
              <el-col :span="8">
                <br>
                <br>
                <chart3 :xaxis="[1,2,3,4,5,'下一次']" :yaxis="yaxis"></chart3>
                <br>
              </el-col>
              <el-col :span="8" :offset="2">
                <chart4 style="margin-top: 40px" :value1=user.typeNum[0] :value2=user.typeNum[1] :value3=user.typeNum[2] :value4=user.typeNum[3]></chart4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <Chart5 :opinion="theSubjects" :opinion-data="subjectsRate"></Chart5>
              </el-col>
              <el-col :span="6" :offset="3">
                <Rader :opinion="theSubjects" :opinion-data="subjectsRate"></Rader>
              </el-col>
            </el-row>
            <el-row>

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
import Chart3 from './chart/chart3'
import Chart4 from './chart/chart4'
import Chart5 from './chart/chart5'
import Calinder from './chart/calinder'
import Rader from './chart/rader'
import axios from "axios";

export default {
  name: "student",
  data(){
    return{
      active:'0',
      num:[],
      showAnswer:false,
      randomProblems:[],
      thesubjects1:[],
      yaxis:[10,20,30,40,50],
      haveTest:true,
      setstotal:0,
      setstodo:0,
      setsdoing:0,
      setsundo:0,
      pageTests:1,
      totalTests:1,
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
      subjects1:[],
      ranges1:[],
      searchSubject:null,
      searchRange:null,
      searchWrongPro:null,
      isCollapse:false,
      exercise:{
        danxuan:5,
        duoxuan:5,
        tiankong:5,
        wenda:5,
        subject:'',
        range:[],
        time:20,
        startTimeS:'',
        endTimeS:'',
      },
      exerciseSets:[],
      wrongProblemSingle:[],
      wrongProblemMulti:[],
      wrongProblemFill:[],
      wrongProblemQa:[],
      search:'',
      user:{
        exer_num:10,
        test_num:5,
        wrong_num:20,
        practiceAttendedNum:10,
        typeNum:[0,0,0,0]
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
          label: '已结束',
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
      ],
      theSubjects:[],
      subjectsRate:[]
    }
  },
  methods:{
    handleSelect:function (key,keyPath){
      switch (key){
        case '0':
          this.active='0';
          break;
        case '1':
          this.active='1';
          break;
        case '2':
          this.active='2';
          this.getStudentTests();
          break;
        case '3':
          this.active='3';
          this.getStudentExercise();
          break;
        case '4':
          this.active='4';
          this.getWrongQuestion();
          break;
        case '5':
          this.active='5';

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
        res.data.correctRates.forEach(item=>{
          this.theSubjects.push(item.contentType);
          let rate=(parseInt(item.correctNum)*100)/(parseInt(item.correctNum)+parseInt(item.wrongNum));
          this.subjectsRate.push(rate);
        });
        //this.subjectsRate=[60,70,80];
        this.computeNext();
        this.setstotal=res.data.allSets;
        this.setstodo=res.data.todo;
        this.setsdoing=res.data.doing;
        this.setsundo=res.data.undo;
      })
    },
    computeNext(){
      var avg=function (arr){
        var len=arr.length;
        var sum=0;
        for(var i=0;i<len;i++){
          sum+=arr[i]*1;
        }
        return sum/len;
      }
      var sampleAvg=avg(this.yaxis);
      var length=5;
      var temp=new Array(length);
      for(var i=0;i<length;i++){
        var dev=parseFloat(this.yaxis[i])-sampleAvg;
        temp[i]=Math.pow(dev,2);
      }
      var powSum=0;
      for(var j=0;j<temp.length;j++){
        if(temp[j].toString()!=""||temp[j].toString()!=null){
          powSum=parseFloat(powSum)+parseFloat(temp[j].toString());
        }
      }
      var stddev=Math.sqrt(parseFloat(powSum)/parseFloat(length));
      if(this.yaxis[3]>this.yaxis[4]){
        this.yaxis.push((sampleAvg-stddev));
      }
      else{
        this.yaxis.push((sampleAvg+stddev));
      }

    },
    getStudentTests(){
      axios({
        url:"/exercise/getStudentExercise",
        params:{
          pageNum:this.pageTests,
          test:true,
          state:1,
          order:4
        }
      }).then(res=>{
        this.exerciseSets=res.data.data;
        for(let i=0;i<this.exerciseSets.length;i++){
          if(this.exerciseSets[i].test===false){
            this.exerciseSets[i].exerciseName="练习题"+this.exerciseSets[i].exerciseName.slice(-28,-1)+"0"
          }
          console.log(this.exerciseSets[i].endTime);
          this.exerciseSets[i].endTime=new Date((+new Date(this.exerciseSets[i].endTime))).Format("yyyy-MM-dd hh:mm:ss");
          this.exerciseSets[i].startTime=new Date((+new Date(this.exerciseSets[i].startTime))).Format("yyyy-MM-dd hh:mm:ss");
          //this.exerciseSets[i].endTime=this.exerciseSets[i].endTime.slice(0,10)+" "+this.exerciseSets[i].endTime.slice(11,19);
          //this.exerciseSets[i].startTime=this.exerciseSets[i].startTime.slice(0,10)+" "+this.exerciseSets[i].startTime.slice(11,19);
          console.log(this.exerciseSets[i].endTime);
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
          // if(this.exerciseSets[i].test===false){
          //   this.exerciseSets[i].startTime=null;
          // }
        }

        this.totalTests=res.data.total;
        this.haveTest=false;
        for(let i=0;i<this.exerciseSets.length;i++){
          if(this.exerciseSets[i].state==='U'){
            this.haveTest=true;
          }
        }

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
            this.exerciseSets[i].exerciseName="练习题"+this.exerciseSets[i].exerciseName.slice(-28,-1)+"0"
          }
          console.log(this.exerciseSets[i].endTime);
          this.exerciseSets[i].endTime=new Date((+new Date(this.exerciseSets[i].endTime))).Format("yyyy-MM-dd hh:mm:ss");
          this.exerciseSets[i].startTime=new Date((+new Date(this.exerciseSets[i].startTime))).Format("yyyy-MM-dd hh:mm:ss");
          //this.exerciseSets[i].endTime=this.exerciseSets[i].endTime.slice(0,10)+" "+this.exerciseSets[i].endTime.slice(11,19);
          //this.exerciseSets[i].startTime=this.exerciseSets[i].startTime.slice(0,10)+" "+this.exerciseSets[i].startTime.slice(11,19);
          console.log(this.exerciseSets[i].endTime);
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
          // if(this.exerciseSets[i].test===false){
          //   this.exerciseSets[i].startTime=null;
          // }
        }

        this.totalSets=res.data.total;
      })
    },
    viewSet(id,state,timeState,end) {
      if(timeState==='1'){
        alert("题目集未到开放时间！");
      }
      else if(timeState==='2'&&state==='U'){
        this.$message("请勿中途退出考试！")
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
          var mm=now.getMinutes()+parseInt(t)%60;
          var ss=now.getSeconds();
          if(mm>=60){
            mm=mm-60;
            hh=hh+1;
          }
          if(hh>=24){
            hh=hh-24;
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
      else if(state==='P'){
        alert("考试未结束，无法查看信息");
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
          this.$router.push({name:'viewset',params:{
              setname:res.data.setname,
              grade:res.data.score,
              single:JSON.stringify(res.data.singleChoiceList),
              multi:JSON.stringify(res.data.multiChoiceList),
              fill:JSON.stringify(res.data.fillBlankList),
              qa:JSON.stringify(res.data.questionAnswerList)}})
        }).catch(err=>{
          alert("您未参加该场考试，无法查看信息");
        })
      }
    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
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
          if(hh>=24){
            hh=hh-24;
          }
          var endTime=("0"+hh).slice(-2)+":"+("0"+mm).slice(-2)+":"+("0"+ss).slice(-2);
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
    change00(val){
      this.pageTests=val;
      this.getStudentTests();
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
    getRange1(){
      axios({
        url:"/problem/rangesnopub",
        params:{
          subject:this.exercise.subject
        }
      }).then(res=>{
        this.ranges1=res.data;
        //this.ranges1.shift();
      })
    },
    getRange(sub){
      axios({
        url:"/problem/ranges",
        params:{
          subject:sub
        }
      }).then(res=>{
        this.ranges=res.data;
      })
    },
    gotoTest(){
      this.setType=true;
      this.active='3';
      this.getStudentExercise();
    },
    gotoDone(){
      this.setType=false;
      this.shaixuan='3';
      this.active='3';
      this.getStudentExercise();
    },
    gotoExercise(){
      this.setType=false;
      this.active='3';
      this.getStudentExercise();
    },
    gotoWrong(){
      this.active='4';
      this.getWrongQuestion();
    },
    getRandomProblems(){
      axios({
        url:"/problem/randon",
      }).then(res=>{
        this.randomProblems=res.data;
      })
    },
    getLast5Tests(){
      axios({
        url:"/test/last5"
      }).then(res=>{
        this.yaxis=res.data;
        //this.yaxis=[50,60,90,70,65];
      })
    }

  },
  components:{Top,Down,Chart3,Chart4,Chart5,Calinder,Rader},
  computed:{
  },
  created() {
    axios({
      url:"/problem/allsubjects",
    }).then(res=>{
      this.subjects=res.data;
    })
    axios({
      url:"/problem/allsubjectsnopub",
    }).then(res=>{
      this.subjects1=res.data;
      console.log(this.subjects1);
    })
    axios({
      url:"/problem/tikuInfo",
    }).then(res=>{
      this.num=res.data;
    })
    this.getLast5Tests();
    this.getStuInfo();
    this.getRandomProblems();
    this.getStudentTests();
  }
}
</script>

<style>
#student{
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
.el-table.cell{
  white-space: pre-line;
}
.el-carousel__item p {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 40px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #fffbf0;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #f0ede4;
}

.random{
  border-radius: 12px;
}

.el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 50%;
  opacity: 0.5;
}
.el-carousel__indicator--horizontal.is-active .el-carousel__button{
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 1;
}

</style>
