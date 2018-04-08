import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router/router';
import '../config/rem'
// import  '~/css/base.css'

import wcKeyBoard from 'wc-keyboard'
 import 'wc-keyboard/style.css'

// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/common.scss'

import "../assets/css/font/iconfont.css"

import api from '../config/api'

import axios from 'axios'
// axios.defaults.baseURL = 'http://userside.zhongxiang51.com'; //正式配置接口地址
// axios.defaults.baseURL = 'http://192.169.18.77:8081/zxwy-userside'; //本地配置接口地址
axios.defaults.baseURL = 'http://test.zhongxiang51.com/zxwy-userside'; //测试配置接口地址
var router = new VueRouter(routerConfig)
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.use(wcKeyBoard);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  console.log(to);
  if(sessionStorage.token){
    next()
  }else{
    if(to.query.openid){
      console.log('openId:'+to.query.openid);
      sessionStorage.token =to.query.openid;
      next()
    }else {
      var url =  to.fullPath;
      api.author(url)
      .then(res=>{
        window.location.href = res.data;
      })
      // sessionStorage.token = 'oV3Y2s_R0ZDF9Xqj5Wp1FapeK70s';
      // next();
    }
  }
  //  console.log(sessionStorage.token);

})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    data:{
      Bus:new Vue()
    }
});
