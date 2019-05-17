import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './store'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
import 'element-ui/lib/theme-chalk/display.css'
import global_mod from './utils/global_mod'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
window.$=global_mod; //全局模块(任何vue组件里面都可以用this.$.xxx来调用公共方法)
NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login2') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login2') {
//     next({ path: '/login2' })
//   } else {
//     next()
//   }
// })

router.afterEach(transition => {
NProgress.done();
});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

