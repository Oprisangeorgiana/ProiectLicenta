require('./bootstrap')
import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
// import '@mdi/font/css/materialdesignicons.css'
import Settings from './pages/Settings/Settings'
import Workspaces from './pages/Workspaces/Workspaces'
import Help from './pages/Help/Help'
import store from './store/store'
import EmployeeProfile from '../js/layout/UI-kit/EmployeeProfile'

Vue.use(VueRouter)

import Home from './pages/Home/Home'
import Board from './pages/Board/Board'
import App from './layout/App/App'
import Calendar from './pages/Calendar/Calendar'
import Login from './pages/Login/Login'
import AddEmployee from './pages/AddEmployee/AddEmployee'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/workspaces',
      name: 'workspaces',
      component: Workspaces
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/workspaces/:id',
      name: 'employee-profile',
      component: EmployeeProfile
    },
    {
      path: '/admin',
      name: 'admin',
      component: AddEmployee
    }

  ]
})

const app = new Vue({
  el: '#app',
  vuetify,
  components: { App },
  router, store

})
