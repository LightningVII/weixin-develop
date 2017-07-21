import * as Vue from "vue";
import * as MuseUI from 'muse-ui';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as VueRx from 'vue-rx';
import * as VueRouter from "vue-router";
// import * as Vuex from 'vuex'
// import Components from './components'
// import { __ } from './service/locale';
// import 'jquery';
// import 'bootstrap';
// import './app.ts';

// require('bootstrap.min.css');
require('muse-ui.css');
require('./style.css');

/** 把所有的组件都初始化，挂在在全局上 */

// Vue.use(VueRouter);
// Vue.use(Components)


// import './service/layout.ts';
// 设置语言国际化
// Vue.use(() => {
//   Vue.mixin({
//     created () {
//       (<any>this).__ = __
//     },
//     destroyed () {
//       (<any>this).__ = null
//     }
//   })
// })


// 初始话apollo，缓存apollo实例
// import apollo from './store/apollo'
// apollo.init()

// import { toUpperCase, toLowerCase } from './service/util'
// import { dateFormat } from './service/date'
// Vue.filter('toUpperCase', toUpperCase)
// Vue.filter('toLowerCase', toLowerCase)
// Vue.filter('dateFormat', dateFormat)

// Vue相关：路由，store
// import store from './store'
// import router from './router'
// const { sync } = require('vuex-router-sync')


// sync(store, router)










Vue.use(MuseUI);
Vue.use(VueRx, { Observable, Subscription })
Vue.use(VueRouter)
const AddInput = Vue.component('AddInput', require('views/Auto-Completed.vue'))
const App = Vue.component('App', require('views/App.vue'))
const Foo = Vue.component('Foo', require('views/Foo.vue'))
const Bar = Vue.component('Bar', require('views/Bar.vue'))

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: AddInput },
    { path: '/', component: AddInput }

]

const router = new VueRouter({
    mode: 'history',
    routes // （缩写）相当于 routes: routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
