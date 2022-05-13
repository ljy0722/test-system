<template>
  <div id="user_info">
    <div>
      <el-row>
        <Top></Top>
      </el-row>
      <el-row>
        <el-button size="mini" style="margin-left: -750px;margin-bottom: -50px" @click="back">返回</el-button>
      </el-row>
      <el-row>
          <br>
          <el-card align="medium" style="width: 65%;margin-left: 17.5%;min-height: 500px">
            <div slot="header" style="color: #409EFF;font-size: large">
              <span>个人信息</span>
            </div>
            <el-row><p></p></el-row>
            <el-row><p></p></el-row>

            <el-descriptions title="用户信息" size="medium" direction="vertical">
              <el-descriptions-item label="用户ID">{{user_info.userId}}</el-descriptions-item>
              <el-descriptions-item label="姓名">{{user_info.userName}}</el-descriptions-item>
              <el-descriptions-item label="性别">{{user_info.sex}}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{user_info.phoneNum}}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ user_info.email }}</el-descriptions-item>
<!--              <el-descriptions-item label="生日">{{user_info.birthday}}</el-descriptions-item>-->
              <el-descriptions-item label="地址">{{ user_info.address }}</el-descriptions-item>
              <el-descriptions-item label="身份">
                <el-tag size="small">{{ user_info.identity }}</el-tag>
              </el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" @click="dialogVisible=true" style="margin-top: 200px">修改</el-button>
            <el-dialog :visible.sync="dialogVisible">
              <el-row>
                <el-col :span="5"><a>姓名：</a></el-col>
                <el-col :span="6"><el-input label="姓名" v-model="user_info.userName" placeholder="name"></el-input></el-col>
              </el-row>
              <el-row><p></p></el-row>
              <el-row><p></p></el-row>
              <el-row>
                <el-col :span="5"><a>性别：</a></el-col>
                <el-col :span="6"><el-select v-model="user_info.sex" placeholder="sex">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select></el-col>
              </el-row>
              <el-row><p></p></el-row>
              <el-row><p></p></el-row>
<!--              <el-row>-->
<!--                <el-col :span="5"><a>生日：</a></el-col>-->
<!--                <el-col :span="6"><el-date-picker v-model="user_info.birthday" type="date" placeholder="birthday" value-format="yyyy-MM-dd"></el-date-picker></el-col>-->
<!--              </el-row>-->
<!--              <el-row><p></p></el-row>-->
<!--              <el-row><p></p></el-row>-->
              <el-row>
                <el-col :span="5"><a>手机：</a></el-col>
                <el-col :span="6"><el-input v-model="user_info.phoneNum" type="text" maxlength="11" show-word-limit placeholder="12345678901" style="width: 200px"></el-input></el-col>
              </el-row>
              <el-row><p></p></el-row>
              <el-row><p></p></el-row>
              <el-row>
                <el-col :span="5"><a>邮箱：</a></el-col>
                <el-col :span="6"><el-input v-model="user_info.email" type="text" placeholder="email" style="width:250px"></el-input></el-col>
              </el-row>
              <el-row><p></p></el-row>
              <el-row><p></p></el-row>
              <el-row>
                <el-col :span="5"><a>地址：</a></el-col>
                <el-col :span="6"><el-input v-model="user_info.address" type="text" placeholder="address" style="width:250px"></el-input></el-col>
              </el-row>
              <br>
<!--              <br>-->
<!--              <el-row>-->
<!--                <el-checkbox v-model="user_info.applyTeacher" style="margin-left: -400px">申请成为教师</el-checkbox>-->
<!--              </el-row>-->
<!--              <br>-->
<!--              <el-row>-->
<!--                <el-input v-model="license" v-if="user_info.applyTeacher==true" style="width: 80%" placeholder="请输入教师资格证编号"></el-input>-->
<!--              </el-row>-->
              <el-button type="primary" style="margin-top: 30px" @click="modifyInfo">确定</el-button>
              <el-button type="plain">取消</el-button>
            </el-dialog>
          </el-card>

      </el-row>
      <el-row>
        <Down></Down>
      </el-row>

    </div>


  </div>
</template>

<script>
import Left from '../components/navigation/left.vue'
import Top from '../components/navigation/top.vue'
import Down from '../components/navigation/down.vue'
import axios from "axios";
export default {
  name: "user_info",
  data(){
    return{
      options:[
        {
          value:'男',
          label:'男'
        },
        {
          value:'女',
          label: '女'
        }
      ],
      user_info:{
        userId:'',
        userName:'Tim',
        sex:'男',
        birthday:'1999-7-22',
        identity:'学生',
        phoneNum:'13898772264',
        email:'1063922263@qq.com',
        address:'浙江省杭州市西湖区浙江大学',
        applyTeacher:false,
      },
      license:'',
      dialogVisible:false
    }
  },
  methods:{
    modifyInfo(){
      console.log(this.user_info);
      this.dialogVisible=false;
      axios({
        url:"/user/userInfo",
        method:"POST",
        data:this.user_info,
      }).then(res=>{
        this.user_info.userName=res.data.userName;
        this.user_info.sex=res.data.sex;
        this.user_info.email=res.data.email;
        this.user_info.address=res.data.address;
        this.user_info.birthday=res.data.birthday;
        this.user_info.phoneNum=res.data.phone;
        if(res.data.state=='T'){
          this.user_info.identity='老师';
        }
        else if(res.data.state=='S'){
          this.user_info.identity='学生';
        }
        else if(res.data.state=='A'){
          this.user_info.identity='管理员';
        }
      }).catch(err=>{

      });
      // if(this.user_info.applyTeacher==true){
      //   axios({
      //     url:'/user/applyTeacher',
      //     params:{
      //       license:this.license,
      //     }
      //   }).then(res=>{
      //     this.$message('成功提交教师申请');
      //   }).catch(err=>{
      //
      //   })
      // }
    },
    back(){
      this.$router.go(-1);
    }
  },
  components:{
    Left,Top,Down
  },
  created() {
    axios(
      {
        url:'/user/userInfo',
      }
    ).then(res=>{
      console.log(res);
      this.user_info.userId=res.data.userId;
      this.user_info.userName=res.data.userName;
      this.user_info.sex=res.data.sex;
      this.user_info.email=res.data.email;
      this.user_info.address=res.data.address;
      this.user_info.birthday=res.data.birthday;
      this.user_info.phoneNum=res.data.phone;
      if(res.data.type==='T'){
        this.user_info.identity='教师';
      }
      else if(res.data.type==='S'){
        this.user_info.identity='学生';
      }
      else if(res.data.type==='A'){
        this.user_info.identity='管理员';
      }
    }).catch(err=>{

    })
  }
}
</script>

<style scoped>
#user_info{
  background: url("../assets/images/img.png") no-repeat;
  background-size: cover;
}
</style>
