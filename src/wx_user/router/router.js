
import app from '../app.vue'
import index from '../page/index/index.vue'
import home from  '../page/home/home.vue'
import orderlist from '../page/order/orderlist.vue'
import mycenter from '../page/my/center.vue'
import orderdetail from '../page/order/orderdetail.vue'
import login from '../page/my/login.vue'
import points from '../page/my/points/points.vue'
import balance from '../page/my/balance/balance.vue'
import bizdetail from '../page/shop/shopdetail.vue'
import shortpay from '../page/shop/shortpay.vue'
import pay from '../page/shop/pay.vue'
import paySuccess from '../page/shop/paySuccess.vue'
import homeaddress from '../page/home/chooseAddress.vue'
import youhuilist  from  '../page/my/youhui/youhuilist.vue'
import wuxiaoYH from '../page/my/youhui/wuxiaoyH.vue'
import settel from '../page/my/setTel/setTel.vue'
import fiveHundred from '../page/activity/fiveHundred.vue'
import oneThousand from '../page/activity/toReceiveTen.vue'
// 新用户领取三张券
import newyouhui  from  '../page/my/youhui/newYouHui.vue'

// const shortpay = r => require.ensure([], () => r(require('../page/shop/shortpay.vue')), 'shortpay');
export default{
  routes:[{
    path:'/',
    component:index,
    redirect:'home',
    children:[{
      path:'home',
      component:home,
      meta:{title:'首页'},
    },{
      path : 'orderlist',
      component: orderlist,
      meta:{title:'订单列表'}
    },{
      path: 'mycenter',
      component:mycenter,
      meta:{title:'个人中心'}
    }]
  },{
    path:'/orderdetail',
    component:orderdetail,
    meta:{title:'订单详情'}
  },{
    path:'/login',
    component:login,
    meta:{title:'登录'}
  },{
    path:'/points',
    component:points,
    meta:{title:'积分'}
  },{
    path:'/youhui',
    component:youhuilist,
    meta:{title:'我的优惠'}
  },{
    path:'/newyouhui',
    component:newyouhui,
    meta:{title:'新用户领取代金券'}
  },{
    path:'/wuxiaoYH',
    component:wuxiaoYH,
    meta:{title:'无效优惠'}
  },{
    path: '/balance',
    component:balance,
    meta:{title:'余额'}
  },{
    path: '/settel',
    component:settel,
    meta:{title:'绑定手机号'}
  },{
    path: '/bizdetail',
    component:bizdetail,
    meta:{title:'商家详情'}
  },{
    path:'/pay',
    component:pay,
    children:[{
      path:'shortpay',
      component:shortpay,
      meta:{title:'快捷买单'}
    }]
  },{
    path:'/paysuccess',
    component:paySuccess,
    meta:{title:'支付成功'}
  },{
    path:'/homeaddress',
    component:homeaddress,
    meta:{title:'选择地址'}
  },{
    path:'/fiveHundred',
    component:fiveHundred,
    meta:{title:'领取500积分'}
  },{
    path:'/oneThousand',
    component:oneThousand,
    meta:{title:'领取1000积分'}
  }]
}
