import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router/router';
import '../config/rem';

//引入工具库
import '../config/Tools.js';

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
// axios.defaults.baseURL = 'https://userside.zhongxiang51.com'; //正式配置接口地址

//本地配置接口地址
// axios.defaults.baseURL = 'http://192.169.18.77:8081/zxwy-userside'; 

// 测试配置接口地址
axios.defaults.baseURL = 'https://test.zhongxiang51.com/zxwy-userside'; 

var router = new VueRouter(routerConfig)
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.use(wcKeyBoard);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(Tools.getCookie('zx_token') && 
    Tools.getCookie('zx_token') != 'null' && 
    Tools.getCookie('zx_token') != '') {
    next()
  }else{
    if(to.query.openid){
      Tools.setCookies('zx_token', to.query.openid);
      next()
    }else {
      var url =  to.fullPath;
      api.author(url)
      .then(res => {
        window.location.href = res.data;
      })

      // Tools.setCookies('zx_token', 'oV3Y2s_R0ZDF9Xqj5Wp1FapeK70s');
      // next();
    }
  }


})

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    data:{
      Bus:new Vue()
    }
});
