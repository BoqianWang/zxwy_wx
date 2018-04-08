<template id="">
  <div class="orderlist_body">
    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100" infinite-scroll-immediate-check="false">
        <li class="order_li" v-for='item in orderLists'>
          <router-link class="order_data" :to="{ path:'/orderdetail',query:{orderId:item.orderId}}">
            <img :src="item.shopLogo" alt="">
            <div class="data_body">
              <div class="data_top">
                <p class="shopname">{{item.shopName}}</p>
                <p class="ordertype">{{item.orderTypeStr}}</p>
                <p class="orderstatus">{{item.orderStatusName}}</p>
              </div>
              <div><p class="order_time">{{item.orderTime}}</p></div>
              <div class="order_money">
                <p>订单金额<span style="font-family: PingFangSC-Semibold, sans-serif;">￥{{item.originalCost}}</span></p>
                <p style="margin:0 12px;">实付<span style="color:#ff6e15;">￥{{item.actualCost}}</span></p>
                <p>获得积分:<span style="color:#FFB911;">{{item.transIntegral}}</span></p>
              </div>
            </div>

          </router-link>
        </li>
      </ul>
    <!-- </mt-loadmore> -->
    <div class="nulldata" v-show="orderLists.length==0">
      ----暂无数据----
    </div>
  </div>
</template>

<script>
import api from '../../../config/api'
import { Toast,Indicator} from 'mint-ui'
  export default {
    data(){
      return{
        pageNo:1,
        orderLists:[],
        loading:false,
        totalPage:1
      }
    },
    created(){
      sessionStorage.tabbar_text = "订单";
    },
    mounted(){
      this.loadPageList();
    },
    methods:{
      loadMore:function(){
         this.more();// 上拉触发的分页查询
        //  this.$refs.loadmore.onBottomLoaded();
      },
      loadPageList:function(){
        Indicator.open();
        api.orderList(this.pageNo)
        .then(res=>{
          // Indicator.close();
          if(res.code==0){
            this.orderLists = res.data.itemList;
            this.totalPage = res.data.totalPage;
          }else{
            // Toast(res.msg);
          }
          console.log(res);


        })
        .catch(error=>{
          // Indicator.close();
          console.log(error);
          // Toast(error);
        })
      },
      more:function(){
        console.log('more');
        this.loading = true;
        api.orderList(this.pageNo+1)
        .then(res=>{
          console.log(res);
          if(res.code==0){
            this.orderLists = this.orderLists.concat(res.data.itemList);
            this.totalPage = res.data.totalPage;
            this.pageNo = res.data.pageNo;
            this.isHaveMore();
          }else {
            console.log(error);
          }

        })
        .catch(error=>{
          console.log(error);
        })
      },
      isHaveMore:function(){
        this.loading = false;
        if(this.pageNo >= this.totalPage){
          this.loading = true;
        }
      }
    }
  }
</script>

<style lang="scss">
@import "../../style/mixin";
  .orderlist_body{
     padding-bottom: 0.5rem;
     .nulldata{
       text-align: center;
       font-size: 0.14rem;
       color: #666;
       margin-top: 20px;
     }
     .order_li{
       padding: 0.24rem 0.12rem;
       background-color: white;
       border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
       .order_data{
         display: flex;
         align-items: flex-start;
         img{
           width: 0.301rem;
           height: 0.301rem;
           margin-right: 0.12rem;
         }
         .data_body{
           width: 100%;
         }
         .data_top{
           font-size: 0.15rem;
           width: 100%;
           p{
             display: inline-block;
           }
           .shopname{
            font-weight: bold;
            text-align: left;
             max-width: 1.5rem;
             font-size: 0.15rem;
             color: #333;
             float: left;
             @include text_over;
           }
           .orderstatus{
             font-size: 0.12rem;
             float:right;
             color: #333;
           }
           .ordertype{
             font-size: 0.102rem;
             color: $mainColor;
             border: 1px solid $mainColor;
             padding: 0 8px;
             margin-left: 0.03rem;
           }
         }
         .order_time{
           font-size: 0.09rem;
           color: #666;
           margin-top: 0.03rem;
         }
         .order_money{
           font-size: 0.12rem;
           margin-top: 0.215rem;
           p{
             display: inline;
             color: #666;
           }
         }
       }
     }
  }
</style>
