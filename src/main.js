import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router/router';
import './config/rem'
// import  '~/css/base.css'
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/common.scss'


var router = new VueRouter(routerConfig)
Vue.use(VueRouter);
Vue.use(MintUI);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
