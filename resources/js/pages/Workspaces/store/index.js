import state from './state'
import {mutations} from './mutations'
import {getters} from './getters'
import Vue from 'vue'
import Vuex from 'vuex'
import {actions} from './actions'

Vue.use(Vuex)

export default {
  namespaced: false,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
}
