<template lang="html">
  <div class="pay-success bg-white">
    <div class="cg_body">
      <img src="../../images/icon_txcg@2x.png" alt="">
      <p class="color-main p-ten">支付成功</p>
      <div v-if="actualCost != originalCost">
        <p>
          <span class="font-12">¥</span>
          <span class="color-3" style="font-size: .4rem;">{{originalCost}}</span>
        </p>
        <p>
          <span class="color-7 font-15">
            实付金额 <span>{{actualCost}}</span>
          </span>
        </p>
      </div>
      <div v-else>
         <p>
            <span class="font-12">¥</span>
            <span class="color-3" style="font-size: .4rem;">{{actualCost}}</span>
          </p>
      </div>

      <div class="text_line_div">
        <div class="line_div"></div>
        <div>本次消费获得</div>
        <div class="line_div"></div>
      </div>
      <div class="p-t-ten m-t-ten width-100 font-15 text-center">
        <router-link to="/redPacket" class="link-wrap redpacket">
              <p>商家红包</p>
              <p>&nbsp;</p>
              <span class="btn-get-vocherlist font-12">领取</span>
          </router-link>
      </div>
      <div class="get-wrap width-100 p-ten font-15 text-center">
          <router-link to="/points" class="link-wrap m-l-ten intergral">
              <p class="color-3">赠送积分</p>
              <p>&nbsp;</p>
              <p style="color:#D51B1B;">{{ getIntegral }}</p>
          </router-link>
          <router-link to="/youhui" class="link-wrap m-l-ten vocherlist">
              <p>商家代金券</p>
              <p class="white-f" v-if="vouchersCount > 0">{{vouchersCount}}张</p>
              <span class="btn-get-vocherlist font-12">查看</span>
          </router-link>
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
      vouchersCount:0,
      originalCost: 0
    }
  },
  mounted(){
      this.getIntegral = this.$route.query.getIntegral;
      this.personalIntegral = this.$route.query.personalIntegral;
      this.vouchersCount = this.$route.query.vouchersCount;
      this.actualCost = Tools.ToCurrency(this.$route.query.actualCost).toFixed(2);
      this.originalCost = Tools.ToCurrency(this.$route.query.originalCost).toFixed(2);
  }
}
</script>

<style lang="scss">
@import "../../style/mixin";
.pay-success {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.cg_body{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  img{
    width: 0.915rem;
    height: 0.915rem;
    margin: 0.2rem 0 0 0;
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
    margin-top: 0.4rem;
    color: #999999;
    .line_div{
      height: 1px;
      width: 100px;
      background-color: #EEEEEE;

    }
  }
  .redpacket, .vocherlist {
    background: #F85252;
  }
  .intergral {
    background: #FEF5EA;
  }
  .link-wrap {
    padding-top: .2rem;
    height: 1.15rem;
    border-radius: 4px;
    width: 33.3%;
    display: inline-block;
    color: #fff;
  }
  .btn-get-vocherlist {
      padding: .02rem .08rem;
      background: #FFB911;
      color: #D51B1B;
      border-radius: .14rem;
  }
}
</style>
