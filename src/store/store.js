/**
 * 创建全局状态管理  19/11/08
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import apiConfig from '../http/api.config'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') == undefined ? null:localStorage.getItem('user'),
    menuIndex: 0,
    baseUrl: apiConfig.baseUrl,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.user = data;
      state.user = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('user');
      state.user = null
    },
    [types.UPDATEMENU]: (state,data) => {
      state.menuIndex = data
    }
  },
  actions:{

  }
})
