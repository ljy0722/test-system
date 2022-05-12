<template>
  <div>

  <div>

  <div id="common_nav" style="background: #444444;">
    <div class="cf" id="common_nav_L2">
      <ul>


        <li style="background: #444444;">
          <ul id="dropdown">
            <li>
              <a style="color:#eee;background: #444444;" href="#" class="parent ellipsis">{{user_account}}<b class="a_trig"></b></a>
              <ul class="children" style="display: none;">
                <a href="http://zcy.ckcest.cn/usercenter/my/854/" style="color: white">个人中心</a>
                <a href="../logout" style="color: white">退出系统</a>
              </ul>
            </li>
          </ul>
        </li>



        <!-- <li><a title="帮助中心" href="javascript:void(0);">帮助中心</a></li> -->
        <!-- <li><a title="知识中心导航" href="javascript:void(0);">知识中心导航</a></li> -->
        <!-- <li><a title="中医药数据处理平台" href="http://zcy.ckcest.cn/Toolkit/" target="_blank">中医药数据处理平台</a></li>-->
        <li style="background: #444444;"><a style="color:#eee;background: #444444;" href="http://www.ckcest.cn/">知识中心首页</a></li>
        <li style="background: #444444;"><a style="color:#eee;background: #444444;" class="current" href="http://zcy.ckcest.cn/tcm/">中草药系统首页</a></li>
      </ul>
    </div>
  </div>


  <div id="serv" style="z-index: 999; bottom: 80px;" class="onserv">
    <div class="robot-button">
      <div class="bd-img icon ion-happy-outline"></div>
      <div class="bd-words">更多内容</div>
    </div>
    <div class="robot-content">
      <ul class="robot-select">
        <li><a href="javascript:void(0)" onclick="onez.dialog_open('http://zcy.ckcest.cn/smartrobot/dialog','1200','850')"><i class="icon ion-social-reddit-outline"></i>机器人</a></li>


      </ul>
      <div class="wecode"></div>
      <div class="weintro">扫一扫，关注公众号</div>
    </div>
  </div>



  </div><!-- nav end -->



  <!-- logo -->



  <!-- logo -->

  <div class="logo-area clearfix">

    <div class="logo container">

      <a style="width:50%" class="pull-left" href="http://zcy.ckcest.cn/tcm/" target="_blank">

        <img   style="width:66%;height:66%;"   src="http://zcy.ckcest.cn/zcystatic/tcm/resources/home/Images/logo_new.png">

      </a>

    </div>

  </div><!-- logo end -->
</div>




  <!-- logo end -->
</template>

<script>
export default {
  name: "common_nav"
}
</script>

<style scoped>

</style>
