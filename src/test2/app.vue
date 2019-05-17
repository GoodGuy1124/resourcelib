<template>
<div>
  <xheader></xheader>
  <section class="page">
    <Nav-Menu></Nav-Menu>
  </section>
  <div class="page-container">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
    <Counter></Counter>
    <!--Counter1></Counter1-->
  </div>
</template>

<script>
import store from './store' // import 我们刚刚创建的 store
import Counter from './Counter.vue'
import Xheader from './components/header' //export的是单项
//import { NavMenu, Login } from './components/page/'  //这里出错，loader配置的问题
import {NavMenu} from './components/page' //export的是集合

export default {
  components: {
    Counter,
    Xheader,
    NavMenu
  },
  store // 在根组件加入 store，让它的子组件和 store 连接
}
</script>