require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from "./plugins/vuetify";

Vue.use(VueRouter)

import Home from "./pages/Home/Home";
import incercare from "./pages/Board/Board";
import App from "./layout/App/App";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/Board',
            name: 'incercare',
            component: incercare,
        },

    ],
});

const app = new Vue({
    el: '#app',
    vuetify,
    components: { App },
    router,
});
