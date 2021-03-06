import Vue from 'vue'
import store from '../store/store'
import Router from 'vue-router'
import plugins from '../cordovaPlugin/index'

Router.prototype.goBack = function () {
  this.isBack = true
  plugins.closeScan()
  window.history.go(-1)
}

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: r => require.ensure([], () => r(require('../view/login.vue')), 'login'),
    },
    {
      path: '/testTracking',
      name: 'testTracking',
      component: r => require.ensure([], () => r(require('../view/testTracking.vue')), 'testTracking'),
    },
    {
      path: '/home',
      name: 'home',
      redirect:'homeChild',
      meta:{
        requireAuth:true,
        index:1,
      },
      component: r => require.ensure([], () => r(require('../view/home.vue')), 'home'),
      children:[
        {
          name:'homeChild',
          path:'/homeChild',
          meta:{
            requireAuth:true,
            menuIndex:0
          },
          component:r => require.ensure([], () => r(require('../view/homeChild.vue')), 'homeChild.vue')
        },
        {
          name:'toudi',
          path:'/toudi',
          meta:{
            requireAuth:true,
            menuIndex:1
          },
          component:r => require.ensure([], () => r(require('../view/toudi.vue')), 'toudi')
        },
        {
          name:'lanshou',
          path:'/lanshou',
          meta:{
            requireAuth:true,
            menuIndex:2
          },
          component:r => require.ensure([], () => r(require('../view/lanshou.vue')), 'lanshou')
        },
        {
          name:'admin',
          path:'/admin',
          meta:{
            requireAuth:true,
            menuIndex:3
          },
          component:r => require.ensure([], () => r(require('../view/admin.vue')), 'admin')
        }
      ]
    },
    {
      path: '/toudiCount',
      name: 'toudiCount',
      meta:{
        requireAuth:true,
      },
      component: r => require.ensure([], () => r(require('../view/toudiCount.vue')), 'toudiCount')
    },
    {
      path: '/updatePassword',
      name: 'updatePassword',
      meta:{
        requireAuth:true,
      },
      component: r => require.ensure([], () => r(require('../view/updatePassword.vue')), 'updatePassword')
    },
    {
      path: '/daka',
      name: 'daka',
      meta:{
        requireAuth:true,
      },
      component: r => require.ensure([], () => r(require('../view/daka.vue')), 'daka')
    },
    {
      path: '/lanshouDetails',
      name: 'lanshouDetails',
      meta:{
        requireAuth:true,
      },
      component: r => require.ensure([], () => r(require('../view/lanshouDetails.vue')), 'lanshouDetails')
    },{
      path: '/jiedanDetails',
      name: 'jiedanDetails',
      meta:{
        requireAuth:true,
      },
      component: r => require.ensure([], () => r(require('../view/jiedanDetails.vue')), 'jiedanDetails')
    },
    {
      path: '/scanPage',
      name: 'scanPage',
      meta:{
        requireAuth:true,
      },
      component: r => require.ensure([], () => r(require('../view/scanPage.vue')), 'scanPage')
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  // 处理 安卓 实体返回键  home 菜单 active 状态不对问题
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.user) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

export default router
