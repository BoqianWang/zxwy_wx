import login from '../page/login.vue'
import index from '../page/index.vue'
import orderm from '../page/orderM.vue'
import centerm from  '../page/centerM.vue'
import finance from '../page/financeHome.vue'
import yuetixian from '../page/yuetixian.vue'
import yuelist from '../page/yueList.vue'
import bankdetail from '../page/bankdetail.vue'
//营销协议
// import marketProtocol from '../page/marketProtocol.vue';
const marketProtocol = r => require.ensure([], () => r(require('../page/marketProtocol.vue')), 'marketProtocol');
//注册协议
// import registerProtocol from '../page/registerProtocol.vue';
const registerProtocol = r => require.ensure([], () => r(require('../page/registerProtocol.vue')), 'registerProtocol');

export default{
  routes:[
    {
      path:'/',
      component:login
    },
    {
      path:'/bizindex',
      component:index,
      redirect:'bizindex/orderm',
      children:[
        {
          path:'orderm',
          component:orderm
        },{
          path:'centerm',
          component:centerm
        }
      ]
    },
    {
      path:'/finance',
      component:finance
    },
    {
      path:'/yuetixian',
      component:yuetixian
    },
    {
      path:'/yuelist',
      component:yuelist
    },
    {
      path:'/bankdetail',
      component:bankdetail
    },
    {
      //营销协议
      path: '/marketProtocol',
      component: marketProtocol
    },
    {
      //注册协议
      path: '/registerProtocol',
      component: registerProtocol
    }
  ]
}
