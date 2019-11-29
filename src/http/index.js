import axios from 'axios'
import store from '../store/store'
import router from '../router'
import apiConfig from './api.config'

axios.defaults.baseURL = apiConfig.baseUrl
axios.interceptors.request.use( (config) => {

  // 在发起请求请做一些业务处理
  //判断是否已经登录
  if (store.state.user) {
    // console.log(config.url)
    // console.log(config)
    if(config.method=='get'){
      if(config.url.indexOf('https') ==-1){
        config.headers.Authorization = store.state.user.token
      }
    }else {
      config.headers.Authorization = store.state.user.token
    }
  }
  return config
},  (error) => {
  return Promise.reject(error);
});
/*
* axios 响应拦截器
* */
axios.interceptors.response.use( (response) => {
  // 对响应数据做处理
  return response;
},  (error) => {
  // 对响应错误做处理
  if (error.response) {
    console.log(error.response)
    switch (error.response.status) {
      case 401:
        // // 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT)
        // // 只有在当前路由不是登录页面才跳转
        // console.log(router.currentRoute.path)
        // router.currentRoute.path !== 'login' &&
        // router.replace({
        //   path: '/',
        //   query: { redirect: router.currentRoute.path },
        // })
        break;
    }
  }
  return Promise.reject(error);
});

 export default {
  //get请求
  get(url,params ={}){
    return new Promise((resolve,reject)=>{
      axios({
        method:'get',
        url,
        params:params,
      }).then(res=>{  //axios返回的是一个promise对象
        resolve(res.data)  //resolve在promise执行器内部
      }).catch(err=>{
        console.log(err,'异常')
      })

    })
  },
  post(url,params = {}){
    return new Promise((resolve,reject)=>{
      axios({
        method:'post',
        url,
        data:params,
      }).then(res=>{  //axios返回的是一个promise对象
        resolve(res.data)  //resolve在promise执行器内部
      }).catch(err=>{
        console.log(err,'异常')
      })
    })
  }
}
