<template lang="html">
  <div class="finance_body">
    <div class="tixian_biz">
      <p style="color:rgba(0,0,0,0.56);font-size:12px;">可提现金额</p>
      <div class="tixian_money">
        <p>￥{{financeData.balance}}</p>
        <button type="button" @click="tixianClick()">提现</button>
      </div>
    </div>
    <mt-cell title="查看余额流水" to="/yuelist" is-link :value="newFinance"></mt-cell>
  </div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      financeData:'',
      newFinance:''
    }
  },
  mounted(){
    Indicator.open();
    api.financeHome()
    .then(res=>{
      console.log(res);
      this.financeData = res.data;
      if (res.data.deposit) {
        var status = res.data.deposit.auditStatus==0?"正在审核中":(res.data.deposit.auditStatus==1?"审核成功":"审核失败");
        this.newFinance =  new Date(parseInt(res.data.deposit.wdTime)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, "") + "提现" + res.data.deposit.wdMoney + '元' +status;
      }
    })
  },
  methods:{
    tixianClick(){
      if(this.financeData.balance>0){
        this.$router.push('/yuetixian');
      }else{
        Toast("提现金额不能小于10");
      }
    }
  }
}
</script>

<style lang="scss">
@import "../style/common";
.finance_body{
  .tixian_biz{
    display: flex;
    @include wh(100%,0.8rem);
    padding: 0.12rem;
    flex-direction: column;
    background-color: white;
    justify-content: space-around;
    .tixian_money{
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        color: rgba(0,0,0,0.87);
        font-size: 0.24rem;
      }
      button{
        @include wh(0.64rem,0.24rem);
        background-color: $bizMianColor;
        color: white;
      }
    }
  }
  .mint-cell-title{
    font-size: 0.16rem;
    color: #333;
  }
  .mint-cell-value{
    font-size: 0.12rem;
    color: #666;
  }
}
</style>
