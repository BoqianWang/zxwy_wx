import login from '../page/login.vue'
import index from '../page/index.vue'
import orderm from '../page/orderM.vue'
import centerm from  '../page/centerM.vue'
import finance from '../page/financeHome.vue'
import yuetixian from '../page/yuetixian.vue'
import yuelist from '../page/yueList.vue'
import bankdetail from '../page/bankdetail.vue'
export default{
  routes:[{
    path:'/',
    component:login
  },{
    path:'/bizindex',
    component:index,
    redirect:'bizindex/orderm',
    children:[{
      path:'orderm',
      component:orderm
    },{
      path:'centerm',
      component:centerm
    }]
  },{
    path:'/finance',
    component:finance
  },{
    path:'/yuetixian',
    component:yuetixian
  },{
    path:'/yuelist',
    component:yuelist
  },{
    path:'/bankdetail',
    component:bankdetail
  }]
}
