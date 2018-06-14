import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router/router';
import store from './store';
import '../config/rem';

//引入工具库
import '../assets/js/Tools.js';

// import  '~/css/base.css'

import wcKeyBoard from 'wc-keyboard'
import 'wc-keyboard/style.css'

// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './style/common.scss'

// import api from '../config/api'
// import fetch from '@/config/fetch.js'

// import axios from 'axios'




var router = new VueRouter(routerConfig)
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.use(wcKeyBoard);

// Tools.setCookies('zx_token', 'oV3Y2s_Wi_GMbZnEN7x0rRFuKov8');

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(Tools.getCookie('zx_token')) {
    next()
  }else{
    if(to.path != '/pay/author' && !to.query.openid) {
       Tools.setCookies('beforeLoginUrl', to.fullPath);
       next('/pay/author');

    } else {
      // console.log(to);
       next();
    }
    // if(to.query.openid){
    //   Tools.setCookies('zx_token', to.query.openid);
    //   next()
    // }else {
    //   var url =  to.fullPath;
    //   // fetch.fetchPost('/grant/auth',{
    //   //   authorUrl: url
    //   // }).then(res => {
    //   //   window.location.href = res.data;
    //   // })

    //   Tools.setCookies('zx_token', 'oV3Y2s_Wi_GMbZnEN7x0rRFuKov8');
    //   // Tools.setCookies('zx_token', '2088702608497683');
    //   next();
    // }
  }


})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data:{
      Bus:new Vue()
    }
});
