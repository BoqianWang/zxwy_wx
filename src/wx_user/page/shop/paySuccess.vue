<template lang="html">
  <div class="cg_body">
    <img src="../../images/icon_txcg@2x.png" alt="">
    <p>已支付成功，本次消费</p>
    <p>实付<span style="color:#ff6e15;font-size:24px;">{{actualCost}}</span>元，欢迎下次消费!</p>
    <!-- <router-link to="/mycenter" class="login_btn">
        积分查看
    </router-link> -->
    <div class="text_line_div">
      <div class="line_div"></div>
      <div class="">本次消费获得</div>
      <div class="line_div"></div>
    </div>
    <div class="get_div">
      <router-link to="/mycenter" class="getpoint_div">
        <p style="color:#333;">赠送积分</p>
        <p style="color:#D51B1B;">{{getIntegral}}</p>
        <!-- <router-link to="/mycenter" style="color:#666;margin-top:10px;">已有积分{{personalIntegral}} ></router-link> -->
      </router-link>
      <div class="getdjj_div" v-if="vouchersCount>0">
        <p style="color:#fff;">代金券</p>
        <p style="color:#fff;">{{vouchersCount}}张</p>
        <router-link to="/youhui" class="chakandjj">查看</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      getIntegral:0,
      actualCost:0,
      personalIntegral:0,
      vouchersCount:0
    }
  },
  mounted(){
      this.getIntegral = this.$route.query.getIntegral;
      this.actualCost = this.$route.query.actualCost;
      this.personalIntegral = this.$route.query.personalIntegral;
      this.vouchersCount = this.$route.query.vouchersCount;
  }
}
</script>

<style lang="scss">
@import "../../style/mixin";
.cg_body{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  img{
    width: 0.915rem;
    height: 0.915rem;
    margin: 0.72rem 0 0.2rem 0;
  }
  p{
    width: 100%;
    color:#666;
    font-size: 0.14rem;
    text-align: center;
  }
  .login_btn{
    width: 1.5rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    background-color:rgba(0,0,0,0.2);
    border-radius: 0.04rem ;
    color: white;
    font-size: 0.15rem;
    background: linear-gradient(to right, $mainColor , rgba(255,185,17,1));
    box-shadow: 0.014rem 0.014rem 0.14rem rgba(233,91,5,0.3);
  }
  .text_line_div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 0.8rem;
    color: #999999;
    .line_div{
      height: 1px;
      width: 100px;
      background-color: #EEEEEE;

    }
  }
  .get_div{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    .getpoint_div{
      width: 1.29rem;
      height: 1.25rem;
      background-color: #FEF5EA;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.12rem;
    }
    .getdjj_div{
      width: 1.29rem;
      height: 1.25rem;
      background-color: #F85252;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.12rem;
      color: white;
      .chakandjj{
        width:0.5rem;
        height:0.22rem;
        line-height: 0.22rem;
        background:rgba(255,185,17,1);
        border-radius: 0.11rem ;
        margin-top:10px;
        font-size:0.12rem;
        color:rgba(213,27,27,1);
        text-align: center;
      }
    }
  }
}
</style>
