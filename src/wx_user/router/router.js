
// import app from '../app.vue'
// import index from '../page/index/index.vue'
// import home from  '../page/home/home.vue'
// import orderlist from '../page/order/orderlist.vue'
// import mycenter from '../page/my/center.vue'
// import orderdetail from '../page/order/orderdetail.vue'
// import login from '../page/my/login.vue'
// import points from '../page/my/points/points.vue'
// import balance from '../page/my/balance/balance.vue'
// import bizdetail from '../page/shop/shopdetail.vue'
// import shortpay from '../page/shop/shortpay.vue'
// import pay from '../page/shop/pay.vue'
// import paySuccess from '../page/shop/paySuccess.vue'
// import homeaddress from '../page/home/chooseAddress.vue'
// import youhuilist  from  '../page/my/youhui/youhuilist.vue'
// import wuxiaoYH from '../page/my/youhui/wuxiaoyH.vue'
// import settel from '../page/my/setTel/setTel.vue'
// import fiveHundred from '../page/activity/fiveHundred.vue'
// import oneThousand from '../page/activity/toReceiveTen.vue';

const app = r => require.ensure([], () => r(require('../app.vue')), 'app');
const indexPage = r => require.ensure([], () => r(require('../page/index/index.vue')), 'indexPage');

const home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home');
const orderlist = r => require.ensure([], () => r(require('../page/order/orderlist.vue')), 'orderlist');
const mycenter = r => require.ensure([], () => r(require('../page/my/center.vue')), 'mycenter');
const orderdetail = r => require.ensure([], () => r(require('../page/order/orderdetail.vue')), 'orderdetail');
const login = r => require.ensure([], () => r(require('../page/my/login.vue')), 'login');
const points = r => require.ensure([], () => r(require('../page/my/points/points.vue')), 'points');
const balance = r => require.ensure([], () => r(require('../page/my/balance/balance.vue')), 'balance');

const bizdetail = r => require.ensure([], () => r(require('../page/shop/shopdetail.vue')), 'bizdetail');
const shortpay = r => require.ensure([], () => r(require('../page/shop/shortpay.vue')), 'shortpay');

const pay = r => require.ensure([], () => r(require('../page/shop/pay.vue')), 'pay');
const paySuccess = r => require.ensure([], () => r(require('../page/shop/paySuccess.vue')), 'paySuccess');

const youhuilist = r => require.ensure([], () => r(require('../page/my/youhui/youhuilist.vue')), 'youhuilist');
const wuxiaoYH = r => require.ensure([], () => r(require('../page/my/youhui/wuxiaoyH.vue')), 'wuxiaoYH');
const settel = r => require.ensure([], () => r(require('../page/my/setTel/setTel.vue')), 'settel');
const fiveHundred = r => require.ensure([], () => r(require('../page/activity/fiveHundred.vue')), 'fiveHundred');
const oneThousand = r => require.ensure([], () => r(require('../page/activity/toReceiveTen.vue')), 'oneThousand');

// 新用户领取三张券
const newyouhui = r => require.ensure([], () => r(require('../page/my/youhui/newYouHui.vue')), 'newyouhui');

//首页选择地址
const homeaddress = r => require.ensure([], () => r(require('@/wx_user/page/home/children/chooseAddress.vue')), 'homeaddress');
//店铺搜索
const searchShop = r => require.ensure([], () => r(require('@/wx_user/page/home/searchShop.vue')), 'searchShop');
// 外卖模块
const takeOutShop = r => require.ensure([], () => r(require('@/wx_user/page/takeout/takeOutShop.vue')), 'takeOutShop');
//提交订单
const takeOutOrder = r => require.ensure([], () => r(require('@/wx_user/page/takeout/takeOutOrder.vue')), 'takeOutOrder');
//选择收货地址
const addressList = r => require.ensure([], () => r(require('@/wx_user/page/takeout/children/addressList.vue')), 'addressList');
//添加收货地址
const addAddress = r => require.ensure([], () => r(require('@/wx_user/page/takeout/children/addAddress.vue')), 'addAddress');
//搜索地址
const searchAddress = r => require.ensure([], () => r(require('@/wx_user/page/takeout/children/children/searchAddress.vue')), 'searchAddress');
//外卖订单
const takeoutDetail = r => require.ensure([], () => r(require('@/wx_user/page/order/takeoutDetail.vue')), 'takeoutDetail');
//外卖订单
const author = r => require.ensure([], () => r(require('@/wx_user/page/wxAuth/author.vue')), 'author');
// 店铺首页搜索
// const takeoutDetail = r => require.ensure([], () => r(require('@/wx_user/page/order/takeoutDetail.vue')), 'takeoutDetail');


// const newShortpay = r => require.ensure([], () => r(require('../page/shop/newShortpay.vue')), 'newShortpay');
export default{
  routes:[
    {
      path:'/',
      component:indexPage,
      redirect:'home',
      children:[
      {
        path:'home',
        component:home,
        meta:{
          title:'首页'
        },
      },
      {
        path : 'orderlist',
        component: orderlist,
        meta:{
          title:'订单列表'
        }
      },
      {
        path : 'searchShop',
        component: searchShop,
        meta:{
          title:'店铺搜索'
        }
      },
      {
        path: 'mycenter',
        component:mycenter,
        meta:{
          title:'个人中心'
        }
      }]
    },
    {
      path:'/orderdetail',
      component:orderdetail,
      meta:{
        title:'订单详情'
      }
    },
     {
      path: '/pay/takeoutDetail',
      component: takeoutDetail,
      meta:{
        title: '外卖订单详情'
      }
    },
    {
      path:'/login',
      component:login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'/points',
      component:points,
      meta:{
        title:'积分'
      }
    },
    {
      path:'/youhui',
      component:youhuilist,
      meta:{
        title:'我的优惠'
      }
    },
    {
      path:'/newyouhui',
      component:newyouhui,
      meta:{
        title:'新用户领取代金券'
      }
    },
    {
      path:'/wuxiaoYH',
      component:wuxiaoYH,
      meta:{
        title:'无效优惠'
      }
    },
    {
      path: '/balance',
      component:balance,
      meta:{
        title:'余额'
      }
    },
    {
      path: '/settel',
      component:settel,
      meta:{
        title:'绑定手机号'
      }
    },
    {
      path: '/bizdetail',
      component:bizdetail,
      meta:{
        title:'商家详情'
      }
    },
    {
      path:'/pay',
      component:pay,
      children:[
        {
          path:'shortpay',
          component:shortpay,
          meta:{title:'快捷买单'}
        },
      ]
    },{
      path:'/paysuccess',
      component:paySuccess,
      meta: {
        title:'支付成功'
      }
    },
    {
      path: '/home/homeAddress',
      component: homeaddress,
      meta: {
        title:'选择地址'
      }
    },
    {
      path:'/fiveHundred',
      component:fiveHundred,
      meta:{title:'领取500积分'}
    },
    {
      path:'/oneThousand',
      component:oneThousand,
      meta:{
        title:'领取1000积分'
      }
    },
    {
      path: '/takeout/takeOutShop',
      component: takeOutShop,
      meta: {
        title: '外卖商家'
      }
    },
    {
      path: '/pay/takeOutOrder',
      component: takeOutOrder,
      meta: {
        title: '提交订单'
      }
    },
    {
      path: '/takeout/addressList',
      component: addressList,
      meta: {
        title: '选择收货地址'
      }
    },
    {
      path: '/takeout/addAddress',
      component: addAddress,
      meta: {
        title: '添加收货地址'
      },
      children: [
         {
            path: '/takeout/addAddress/searchAddress',
            component: searchAddress,
            meta: {
              title: '搜索地址'
            }
         }
      ]
    },
    {
      path: '/author',
      component: author,
      meta: {
           title: '正在登陆...'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
     return { x: 0, y: 0 }
  }
}
