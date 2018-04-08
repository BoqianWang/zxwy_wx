<template lang="html">
<div class="order_page" :style="{'-webkit-overflow-scrolling': scrollMode}">
  <mt-datetime-picker
    ref="picker"
    type="date"
    year-format="{value} 年"
     month-format="{value} 月"
     date-format="{value} 日"
     :startDate= "startD"
     :endDate = "endD"
     @confirm="handleConfirm">
  </mt-datetime-picker>
  <div class="top_cell" @click="openPicker()">{{orderdate}}<i class="iconfont icon-arrow-right"></i></div>
  <div class="" style="margin-top:44px;">
  <mt-loadmore :autoFill="autofill" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
  <ul class="order_ul">
    <li v-for="item in list" class="order_li">
      <div class="order_No">
        <div class="No_left">
          <div class="p_label">{{item.dayNumber}}</div>
          <div class="p_No">订单号:{{item.orderNo}}</div>
        </div>
        <div class="p_time">{{new Date(parseInt(item.orderTime)).toLocaleTimeString().replace(/日/g, " ")}}</div>
      </div>
      <div class="order_detail">
        <div class="order_user">
          <div class="user_name">{{item.nickname}}</div>
          <p class="user_type">快捷买单</p>
        </div>
        <div class="order_money">
          <div class="money_order moneyClass">
            <p style="color:rgba(255,192,0,1);"><span style="font-size:12px;">￥</span>{{item.orderMoney}}</p>
            <p>订单金额</p>
          </div>
          <div class="money_real moneyClass">
            <p style="color:rgba(0,195,255,1);"><span style="font-size:12px;">￥</span>{{item.actualMoney}}</p>
            <p>实收金额</p>
          </div>
        </div>
        <div class="order_activity">
          <div class="actiity_cell">
            <p>积分抵扣</p>
            <p>-￥{{item.deductionIntegral}}</p>
          </div>
          <!-- <div class="actiity_cell">
            <p>活动减免</p>
            <p>-￥{{item.discountMoney}}</p>
          </div> -->
          <div class="actiity_cell" v-if="item.bizActivityType==0">
            <p>商家满减</p>
            <p>-￥{{item.bizActivityMoney}}</p>
          </div>
          <div class="actiity_cell" v-if="item.platActivityType==7">
            <p>新用户首减(平台补贴)</p>
            <p>-￥{{item.platActivityMoney}}</p>
          </div>
          <div class="actiity_cell" v-if="item.shareGiftsMoney">
            <p>商家代金券</p>
            <p>-￥{{item.shareGiftsMoney}}</p>
          </div>
        </div>
        <div class="order_shouru">
          <div class="actiity_cell">
            <p>顾客实付</p>
            <p>￥{{item.personalActualMoney}}</p>
          </div>
          <div class="actiity_cell">
            <p>本单预计收入</p>
            <p style="color:rgba(0,195,255,1);">￥{{item.actualMoney}}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</mt-loadmore>
</div>
<mt-cell title="暂无数据!" style="text-align:center;color:#333;" v-show="list.length==0"></mt-cell>
</div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      list:[],
      autofill:false,
      allLoaded:false,
      dataTime:'',
      scrollMode:"auto",
      orderdate:'',
      pageNo:1,
      pages:1,
      startD:new Date(),
      endD:new Date()
    }
  },
  mounted(){
    sessionStorage.tabbar_text = "订单管理";
    var date = date || new Date(),
        timestamp, newDate;
    if(!(date instanceof Date)){
        date = new Date(date.replace(/-/g, '/'));
    }
    timestamp = date.getTime();
    this.endD = date;
    this.startD = new Date(timestamp - 6 * 24 * 3600 * 1000);
    // var myData = new Date();
    // var getm = myData.getMonth()+1;
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    this.orderdate = new Date().Format("yyyy-MM-dd");
    this.loadPageList();
  },
  methods:{
    handleConfirm(value) {
      this.orderdate = new Date(value).Format("yyyy-MM-dd");
      this.pageNo  = 1;
      this.loadPageList();

    },
    openPicker(){
      this.$refs.picker.open();
    },
    loadTop(){
      this.pageNo = 1;
      this.loadPageList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){
      // this.allLoaded = true;// 若数据已全部获取完毕
      Indicator.open();
      api.bizOrderList(this.orderdate,this.pageNo+1,3)
      .then(res=>{
        console.log(res);
        this.pageNo = res.data.pageNo;
        this.pages = res.data.pages;
        this.list = this.list.concat(res.data.list);
        if(res.data.list.length==0){
          Toast("没有更多啦！")
        }
      })
      this.$refs.loadmore.onBottomLoaded();
    },
    loadPageList(){
       Indicator.open();
       api.bizOrderList(this.orderdate,this.pageNo,3)
       .then(res=>{
         console.log(res);
         this.pageNo = res.data.pageNo;
         this.pages = res.data.pages;
         this.list = res.data.list;
       })
    }
  }
}
</script>

<style lang="scss">
.order_page{
  padding: 0.12rem;
  height: 100%;
  padding-bottom: 0.6rem;
  .top_cell{
    height: 44px;
    line-height: 44px;
    position: fixed;
    z-index: 10;
    background-color: rgba(0,195,255,1);
    color: white;
    width: 100%;
    top: 0;
    left: 0;
    padding-left: 0.12rem;
  }
  .order_ul{
    .order_li{
      // margin-top: 44px;
    }
    .order_No{
      width: 100%;
      height: 0.52rem;
      padding: 0 0.12rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: rgba(232,232,232,1);
      border-radius: 0.03rem;
      .No_left{
        display: flex;
        align-items: center;
      }
      .p_label{
        width: 0.32rem;
        height: 0.32rem;
        background-color: rgba(0,195,255,1);
        font-size: 0.18rem;
        color: white;
        line-height: 0.32rem;
        text-align: center;
      }
      .p_No{
        color:rgba(0,0,0,0.87);
        font-size:0.12rem;
        margin-left: 0.12rem;
      }
      .p_time{
        color:rgba(0,0,0,0.56);
        font-size:0.12rem;
      }
    }
    .order_detail{
      background-color: white;
      padding: 0.12rem;
    }
    .order_user{
      border-bottom: 1px solid rgba(0,0,0,0.1);
      .user_name{
        color: rgba(0,0,0,0.87);
        font-size: 0.18rem;
      }
      .user_type{
        width: 0.6rem;
        padding: 0.05rem;
        font-size: 0.10rem;
        background-color: rgba(0,0,0,0.06);
        color: rgba(0,0,0,0.87);
        margin-bottom: 10px;
      }
    }
    .order_money{
      display: flex;
      align-items: center;
      padding: 0.05rem 0 0.15rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      .moneyClass{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p:first-child{
          font-size: 0.3rem;
        }
        p:last-child{
          font-size: 0.09rem;
          color: rgba(0,0,0,0.56);
        }
      }
    }
    .order_activity{
      padding: 0.12rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .actiity_cell{
      display: flex;
      justify-content: space-between;
      color: rgba(0,0,0,0.56);
      font-size: 0.15rem;
    }
    .order_shouru{
      padding-top: 0.12rem;
    }
  }
}
</style>
