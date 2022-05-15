// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Navi from './components/navigation/navi.vue'
import axios from 'axios'
import router from './router/index'
import store from './store/index'
import storage from './storage/index.js'
import Cookie from 'js-cookie'

Vue.use(ElementUI);
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts   //Vue.prototype.$echarts = echarts
Vue.config.silent=true
import moment from "moment"
import {process} from "vue-jest";
import {config} from "shelljs";
Vue.prototype.$moment = moment;

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


axios.defaults.withCredentials=true;
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$storage=storage;
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}

// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {    // 需要登录
    if(window.localStorage.token && window.localStorage.isLogin === '1'){
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token;
      if (token === 'null' || token === '' || token === undefined){
        next({path: '/login'})
        Toast({ message: '检测到您还未登录,请登录后操作！', duration: 1500 })
      }
    } else {
      next()
    }
  } else {   // 不需要登录
    next()
  }
})



// 配置公共url
axios.defaults.baseURL = "http://localhost:8080"

//添加请求拦截器
axios.interceptors.request.use(
  config =>{
    if(store.state.token){
      config.headers.common['token'] =store.state.token
    }
    return config;
  },
  error =>{
    //对请求错误做什么
    return Promise.reject(error);
  })

//http reponse响应拦截器
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error=>{
    if(error.response){
      switch(error.response.status){
        case 401:
          localStorage.removeItem('token');
          router.replace({
            path: '/',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }
  })



/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  el: '#app',
  store,
  router,
  //render: h => h(Navi),
  components:{App},
  template:'<App/>'
  // render: function (createElement){
  //   return createElement(Navi)
  // }
})
