//  store.js 中都mutation中增加添加和删除token的方法
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
Vue.use(Vuex)

const state = {     // 全局管理的数据存储
  isLogin:'0',
  ser:null,
  token:localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
  userId:localStorage.getItem('userId')?localStorage.getItem('userId'):'',
};
export default new Vuex.Store({
  state,
  modules:{
    user
  },
  getters:{    // 监听数据变化的
    getStorage(state){   // 获取本地存储的登录信息
      if(!state.token){
        state.token =JSON.parse(localStorage.getItem(key))
      }
      return state.token
    },
    getUserInfo(){
      return user.state.user;
    }
  },
  mutations:{
    $_setToken(state, value) { // 设置存储token
      state.token = value;
      localStorage.setItem('token', value);
    },
    $_setUserId(state,value){
      state.userId=value;
      localStorage.setItem('userId',value);
    },
    $_removeStorage(state, value){  // 删除token
      localStorage.removeItem('token');
    },
  }
})
