import Vue from 'vue'
import Vuex from 'vuex'
import boardStore from '../pages/Board/store/index'
import loginStore from '../pages/Login/store/index'
import settingsStore from '../pages/Settings/store/index'
import globalStore from './global/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        boardStore: boardStore,
        loginStore: loginStore,
        settingsStore: settingsStore,
        globalStore: globalStore,

    }
})
