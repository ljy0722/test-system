const user = {
  state:{
    user:""
  },
  mutations:{
    USER_INFO(state,info){
      state.user = info;
    }
  },
  actions:{
    saveUserInfo({ commit },data){
      commit('USER_INFO',data)
    }
  },
  getters:{
    user: state=>state.user
  }
};
export default user
