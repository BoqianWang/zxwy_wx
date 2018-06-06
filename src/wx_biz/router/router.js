// import login from '../page/login.vue';
// import index from '../page/index.vue'
// import orderm from '../page/orderM.vue'
// import centerm from  '../page/centerM.vue'
// import finance from '../page/financeHome.vue'
// import yuetixian from '../page/yuetixian.vue'
// import yuelist from '../page/yueList.vue'
// import bankdetail from '../page/bankdetail.vue';

const login = r => require.ensure([], () => r(require('../page/login.vue')), 'login');
const index = r => require.ensure([], () => r(require('../page/index.vue')), 'index');
const orderm = r => require.ensure([], () => r(require('../page/orderM.vue')), 'orderm');
const centerm = r => require.ensure([], () => r(require('../page/centerM.vue')), 'centerm');
const finance = r => require.ensure([], () => r(require('../page/financeHome.vue')), 'finance');
const yuetixian = r => require.ensure([], () => r(require('../page/yuetixian.vue')), 'yuetixian');
const yuelist = r => require.ensure([], () => r(require('../page/yueList.vue')), 'yuelist');
const bankdetail = r => require.ensure([], () => r(require('../page/bankdetail.vue')), 'bankdetail');
//营销协议
// import marketProtocol from '../page/marketProtocol.vue';
const marketProtocol = r => require.ensure([], () => r(require('../page/marketProtocol.vue')), 'marketProtocol');
//注册协议
// import registerProtocol from '../page/registerProtocol.vue';
const registerProtocol = r => require.ensure([], () => r(require('../page/registerProtocol.vue')), 'registerProtocol');
//结算协议
const accountProtocol = r => require.ensure([], () => r(require('../page/accountProtocol.vue')), 'accountProtocol');
//外卖费用
const takeoutFree = r => require.ensure([], () => r(require('../page/takeout/takeoutFree.vue')), 'takoutFree');
//打印使用说明
const printExplain = r => require.ensure([], () => r(require('../page/takeout/printExplain.vue')), 'printExplain');
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
    },
    {
      //注册协议
      path: '/accountProtocol',
      component: accountProtocol
    },
    {
      //注册协议
      path: '/takeout/takeoutFree',
      component: takeoutFree
    },
    {
      //注册协议
      path: '/takeout/printExplain',
      component: printExplain
    }
  ]
}
