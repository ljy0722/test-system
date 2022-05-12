<template>
  <div class="footer">
    <div class="footer_table" style="color: #868686">
      <div class="footer_left">
        <div class="footer_intro">
          <div class="footer_intro_name">
            <a href="http://zcy.ckcest.cn/tcm/" style="text-decoration: none">中草药专业知识服务系统</a>
          </div>
          <div class="footer_intro_content">
            中草药专业知识服务系统旨在利用大数据和知识技术汇聚打通中医药的各种数据资源， 围绕中医药的核心要素中药， 分析挖掘错综复杂的“药方病证”关系与知识，构建不断演化的知识网络，为用户的学习、科研和交流提供知识服务。
          </div>
        </div>
        <div class="footer_friendly_links">
          <div>
            友情链接：
            <a href="http://www.ckcest.cn/home/" style="text-decoration: none">中国工程科技知识中心</a>
          </div>
        </div>
        <div class="footer_copy_right">
          <div>主办单位：浙江大学</div>
          <div>© 2013中国工程科技知识中心</div>
          <div>ICP备案号：京ICP备05023557号</div>
        </div>
      </div>
      <div class="footer_right">
        <div>
          <a id="FAQ_link" href="http://zcy.ckcest.cn/usercenter/feedback/FAQ/FAQPage" rel="nofollow" target="_blank" style="text-decoration: none">常见问题</a>
        </div>
        <div>
          <a href="http://zcy.ckcest.cn/tcm/user/getmanual" rel="nofollow" target="_blank" style="text-decoration: none">操作指南</a>
        </div>
        <div>
          <a id="feedback_link" href="http://zcy.ckcest.cn/usercenter/feedback/feedback/askPage?iu=222.205.61.182" rel="nofollow" target="_blank" style="text-decoration: none">意见反馈</a>
        </div>
        <div>
          <a href="http://zcy.ckcest.cn/tcm/user/join_us" rel="nofollow" target="_blank" style="text-decoration: none">加入我们</a>
        </div>
        <div>
          <a href="http://zcy.ckcest.cn/tcm/user/aboutuspage#contact_us" rel="nofollow" target="_blank" style="text-decoration: none">联系我们</a>
        </div>
        <div>
          <a href="http://zcy.ckcest.cn/tcm/user/agreementpage" rel="nofollow" target="_blank" style="text-decoration: none">法律声明</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "down"
}
</script>

<style scoped>
.footer{
  color: rgba(255,255,255,0.8);
  font-size: 15px;
  padding: 0 6%;
  background: #444444;
}

.footer a{
  color: rgba(255,255,255,0.8);
}
.footer_table {
  display: flex;
  justify-content: center;
}
.footer_left{
  width: 70%;
  padding: 2% 5%;
}

.footer_right {
  width: 30%;
  padding: 4% 5% 0 5%;
}

.footer_intro_name a{
  font-size: 20px;
}

.footer_intro_name  {
  color: rgba(255,255,255,0.8);
  justify-content: left;
  text-align: left;
}

.footer_intro_content {
  padding-top: 2%;
  color: rgba(255,255,255,0.8);
  text-align: left;
  font-size: 15px;
}

.footer_friendly_links {
  padding-top: 2%;
  display: flex;
  justify-content: left;
  color: rgba(255,255,255,0.8);
}

.footer_friendly_links div {
  padding-right: 2%;
}

.footer_copy_right {
  padding-top: 2%;
  display: flex;
  justify-content: space-between;
  color: rgba(255,255,255,0.8);
}

.footer_right {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.footer_right div {
  width: 25%;
  padding: 0 6%;
}
</style>
