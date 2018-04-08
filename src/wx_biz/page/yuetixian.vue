<template lang="html">
  <div class="yue_body">
    <div class="white_body">
      <div class="bank_biz">
        <!-- <img src="../images/logo-jh@2x.png" alt=""> -->
        <div class="bank_message" v-show="bankData.bankCard">
          <div class="bank_text">
            <p>{{bankData.bankId+'  '+bankData.bankAddress}}</p>
            <p>{{bankData.bankAccount}}</p>
          </div>
          <p>{{bankData.bankCard}}</p>
        </div>
        <router-link class="bank_message" v-show="bankData.bankCard==null||bankData.bankCard==''" to='/bankdetail'>
          <p>填写银行卡资料</p>
        </router-link>
        <i class="iconfont icon-arrow-right" v-show="bankData.bankCard==null||bankData.bankCard==''"></i>
      </div>
      <p class="keyongyue">提现余额:{{bankData.balance}}</p>
      <div class="pay_input">
        <label for="" style="color:#333;">￥</label>
        <input type="number" placeholder="请输入提现金额"  value=""  v-on:input ="inputFunc" ref="input1" class="input_m">
      </div>
    </div>
    <div class="" style="padding:0 12px;margin-top:20px;">
      <mt-button type="primary" size='large' @click="sureClick()">确认提现</mt-button>
    </div>

  </div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      bankData:''
    }
  },
  mounted(){
    Indicator.open();
    api.banktixian()
    .then(res=>{
      console.log(res);
      this.bankData = res.data;
    })
  },
  methods:{
    inputFunc:function(){
      this.$refs.input1.value = this.$refs.input1.value.replace(/[^\d.]/g,"");
      this.$refs.input1.value = this.$refs.input1.value.replace(/\.{2,}/g,".");
      this.$refs.input1.value = this.$refs.input1.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    },
    sureClick:function(){
      console.log('111');
      var tixianmney = this.$refs.input1.value;
      if(tixianmney<10||tixianmney==0){
        Toast("金额不能小于10");
        return;
      }

      Indicator.open();
      api.suretixian(tixianmney)
      .then(res=>{
        history.back();
      })

    }
  }
}
</script>

<style lang="scss">
@import "../style/common";
.white_body{
  background-color: white;
  padding: 0.12rem;
  .bank_biz{
    @include wh(100%,1.1rem);
    background: url('../images/pic_yhk@2x.png') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.12rem;
    color: white;
    img{
      @include wh(0.37rem , 0.4rem);
    }
    .bank_message{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      width: 3rem;
      height: 80%;
      .bank_text{
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .keyongyue{
    font-size: 0.12rem;
    color: rgba(0,0,0,0.56);
    margin: 0.2rem 0 ;
  }
  .pay_input{
    width: 100%;
    height: 0.6rem;
    background-color: white;
    margin:0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    .input_m{
      flex: 1;
      margin-left: 10px;
      font-size: 0.18rem;
    }
  }
}
</style>
