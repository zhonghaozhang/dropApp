// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/store'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible'
import Vconsole from 'vconsole'
import './assets/font_icon/iconfont.css'
import Http from './http/index'
import plugins from './cordovaPlugin/index'
import Debounce from './utils/index'

Vue.component('Debounce',Debounce)
var vcanonso = new Vconsole()
Vue.use(Vant);
Vue.prototype.$get = Http.get
Vue.prototype.$post = Http.post
Vue.prototype.plugins = plugins
Vue.config.productionTip = false

// Router.prototype.back = false;
// Router.prototype.goBack = function () {
//   this.back = true;
//   this.go(-1)
// }

/* eslint-disable no-new */
Vue.use(Vuex)

document.addEventListener("deviceready", () => {
  // alert('准备完成,开始初始化vue')
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}, false);




