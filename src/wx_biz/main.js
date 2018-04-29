import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router/router';
import '../config/rem'
// import  '~/css/base.css'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/common.scss'
import "../assets/css/font/iconfont.css"

import axios from 'axios'
axios.defaults.baseURL = 'http://merchant.zhongxiang51.com'; //正式配置接口地址
// axios.defaults.baseURL = 'http://112.74.84.94:8082/zxwy-merchant/'; //测试配置接口地址
var router = new VueRouter(routerConfig)
Vue.use(VueRouter);
Vue.use(MintUI);


new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    data:{
      Bus:new Vue()
    }
});
