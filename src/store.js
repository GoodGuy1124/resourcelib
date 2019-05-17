import Vue from 'vue'
import Vuex from 'vuex'
// 告诉 vue “使用” vuex
Vue.use(Vuex)
const state = {
  login:{
  key:'',
  uid:'admin',
  pwd:'1',
  status:null,
  path:'\\'
  },
  menu_top:{
  path:'\\',
  Items:null,
  },
  pathlist:[]
}
const mutations = {
   setPath(state,n)
  {
    state.login.path=n[0];
    if(n[1]){
    state.pathlist.push(n[0]);
    if(state.pathlist.length>20)
    state.pathlist.shift();
    }
  },
  setItems(state,n){
    state.login.Items=n;},
  setUser(state,n){
   state.login.uid=n[0];
   state.login.pwd=n[1]; 
  },
  setStatus(state,n)
  { 
    state.login.status=n;
  },
  setKey:(state,k)=>state.login.key=k
}
export default new Vuex.Store({
  state,    //数据
  mutations //操作
})