<template lang="html">
  <div class="orderdetail_body">
    <div class="detail_section">
      <img :src='orderdetail.shopLogo' alt="">
      <p>{{orderdetail.shopName}}</p>
    </div>
    <div class="ordermessage_section">
      <mt-cell title="订单信息"></mt-cell>
      <mt-cell title="订单号" :value="orderdetail.orderNo"></mt-cell>
      <mt-cell title="支付方式" :value="orderdetail.paymentModeStr"></mt-cell>
      <mt-cell title="下单时间" :value="orderdetail.orderTimeStr"></mt-cell>
    </div>

    <div class="ordermessage_section">
      <mt-cell title="金额信息"></mt-cell>
      <mt-cell title="订单金额" :value="orderdetail.originalCost"></mt-cell>
      <div v-for="item in orderdetail.activityList">
        <div v-if="item.activityType==0">
          <mt-cell title="满减活动" :value="'-￥'+item.discount"></mt-cell>
        </div>
        <div v-if="item.activityType==1">
          <mt-cell title="首单减" :value="'-￥'+item.discount"></mt-cell>
        </div>
        <div v-if="item.activityType==7">
          <mt-cell title="随机首减" :value="'-￥'+item.discount"></mt-cell>
        </div>
        <div v-if="item.activityType==8">
          <mt-cell title="商家代金券" :value="'-￥'+item.discount"></mt-cell>
        </div>
        <div v-if="item.activityType==9">
          <mt-cell title="平台代金券" :value="'-￥'+item.discount"></mt-cell>
        </div>
      </div>
      <mt-cell title="积分抵扣" :value="'-￥'+orderdetail.deductedCost"></mt-cell>
      <mt-cell title="返积分" :value="orderdetail.retPersonal"></mt-cell>
      <mt-cell title="随机减" :value="orderdetail.randomCut"></mt-cell>
      <mt-cell title="清风费" :value="orderdetail.qffFee"></mt-cell>
      <mt-cell title="实付" :value="'￥'+orderdetail.actualCost"></mt-cell>
    </div>
  </div>
</template>

<script>
import api from '../../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      orderdetail:''
    }
  },
  mounted(){
    Indicator.open();
    api.orderdetail(this.$route.query.orderId)
    .then(res=>{
      this.orderdetail = res.data;
    })
  }
}
</script>

<style lang="scss">
.orderdetail_body{
  .detail_section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 15px;
    img{
      width: 0.65rem;
      height: 0.65rem;
      border-radius: 50%;
    }
    p{
      margin-top: 10px;
    }
  }
  .ordermessage_section{
    margin-top: 20px;
    .mint-cell-title{
      font-size: 0.14rem;
      color: rgba(0,0,0,0.78);
    }
    .mint-cell-value{
      font-size: 0.12rem;
      color: rgba(0,0,0,0.56);
    }
  }
}
</style>
