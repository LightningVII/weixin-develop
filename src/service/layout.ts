import * as Vue from "vue";

const Nav = Vue.component('Nav', require('../views/Nav.vue'))
const BottomNav = Vue.component('BottomNav', require('../views/BottomNav.vue'))
const AddInput = Vue.component('AddInput', require('../views/Auto-Completed.vue'))
// const App = Vue.component('App', require('../views/App.vue'))

// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

// const routes = [
//   { path: '/foo', component: Foo },
//   { path: '/bar', component: Bar }
// ]

// const router = new VueRouter({
//   routes // （缩写）相当于 routes: routes
// })

new Vue({
    el: '#bottomNav',
    render: h => h(BottomNav)
})

new Vue({
    el: '#content',
    render: h => h(AddInput)
})

new Vue({
    el: '#content',
    render: h => h(Nav)
})
