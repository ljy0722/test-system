import Vue from 'vue'
import Router from 'vue-router'
import ExerciseCreate from '../pageview/exercise_create.vue'
// import ExerciseSet from '../pageview/exercise_set'
// import Import_exercise from '../pageview/exercise_import'
// import WrongQuestion from '../pageview/wrong_question.vue'
import TestCreate from '../pageview/test_create.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
// import Navi from '../components/navigation/navi.vue'
import UserInfo from '../pageview/user_info'
// import TakeTest from '../pageview/take_test'
import SuperUser from '../pageview/super_user'
import Teacher from '../pageview/teacher'
import Student from '../pageview/student'
import Test from '../pageview/test'
import Chart from '../pageview/chart/chart'
import Viewset from '../pageview/view_set'
import Storage from '../storage'
import storage from "../storage";
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path:'/viewset',
      name:'viewset',
      component:Viewset
    },
    {
      path:'/chart',
      name:'chart',
      component:Chart
    },
    {
      path:'/test',
      name:'test',
      component:Test
    },
    {
      path:'/student',
      name:'student',
      component:Student
    },
    {
      path:'/teacher',
      name:'teacher',
      component:Teacher
    },
    {
      path:'/super_user',
      name:'super_user',
      component:SuperUser
    },
    // {
    //   path:'/navi',
    //   name:'navi',
    //   component:Navi
    // },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path: '/exercise_create',
      name: 'exercise_create',
      component: ExerciseCreate
    },
    // {
    //   path:'/exercise_set',
    //   name:'exercise_Set',
    //   component:ExerciseSet
    // },
    // {
    //   path: '/import_exercise',
    //   name: 'import_exercise',
    //   component: Import_exercise
    // },
    // {
    //   path: '/wrong_question',
    //   name: 'wrong_question',
    //   component: WrongQuestion
    // },
    {
      path: '/test_create',
      name: 'test_create',
      component: TestCreate,
      meta:{
        requireAuth:false,
      }
    },
    {
      path: '/user_info',
      name: 'user_info',
      component: UserInfo
    },
    // {
    //   path:'/take_test',
    //   name:'take_test',
    //   component:TakeTest
    // }
  ],
  mode:"history"
})
router.beforeEach((to, from, next) => {
  // 默认requiresAuth为false才不需要登录，其他都要
  // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
  if (to.matched.some(r => r.meta.requireAuth) !== false) {
    let tokenInfo = storage.get('TOKEN')
    if (tokenInfo) {
      console.log("有token")
      next();

    } else {
      storage.remove('TOKEN')
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  } else {
    next(); //如果无需token,那么随它去吧
  }
});

//路由跳转后，页面回到顶部
router.afterEach(() => { document.body.scrollTop = 0; document.documentElement.scrollTop = 0;})

export default router;

