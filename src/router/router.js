// import index from './views/index.vue'
// import css from './views/css.vue'
// import stylus from './views/stylus.vue'
// import less from './views/less.vue'
// import sass from './views/sass.vue'
// import image from './views/image.vue'
// import iconfont from './views/iconfont.vue'
// export default {
//     linkActiveClass: 'active',
//     routes: [{
//         path: '/',
//         component: index
//     }, {
//         path: '/css',
//         component: css
//     }, {
//         path: '/stylus',
//         component: stylus
//     }, {
//         path: '/less',
//         component: less
//     }, {
//         path: '/sass',
//         component: sass
//     }, {
//         path: '/image',
//         component: image
//     }, {
//         path: '/iconfont',
//         component: iconfont
//     }/*, {
//         path: '/async',
//         component: () => import(/!* webpackChunkName: "async" *!/'./views/async.vue')
//     }*/]
// }

import app from '../app.vue'
import index from '../page/index/index.vue'
import home from  '../page/home/home.vue'
import orderlist from '../page/order/orderlist.vue'
import mycenter from '../page/my/center.vue'
import orderdetail from '../page/order/orderdetail.vue'
export default{
  routes:[{
    path:'/',
    component:index,
    redirect:'home',
    children:[{
      path:'home',
      component:home
    },{
      path : 'orderlist',
      component: orderlist
    },{
      path: 'mycenter',
      component:mycenter
    }]
  },{
    path:'/orderdetail',
    component:orderdetail
  }]
}
