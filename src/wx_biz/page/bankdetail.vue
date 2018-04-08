<template lang="html">
  <div class="bankdetail_body">
    <div class="" style="color:#333;padding:12px;"> 银行账户 </div>
    <div class="">
      <mt-cell title="银行名称">
        <input type="text" placeholder="如:招商银行" style="text-align:right;" v-model="bankname">
      </mt-cell>
      <!-- <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model="bankNum"></mt-field> -->
      <mt-cell title="银行卡号">
        <input type="tel" placeholder="请输入银行卡号" style="text-align:right;" ref="input1" onkeyup="this.value=this.value.replace(/\D/g,'').replace(/....(?!$)/g,'$& ')">
      </mt-cell>
      <mt-cell title="开户行">
        <input type="text" placeholder="如：深圳市八卦岭支行" style="text-align:right;" v-model="bankaddress">
      </mt-cell>
      <mt-cell title="户名">
        <input type="text" placeholder="请输入持卡人名字" style="text-align:right;" v-model="bankuser">
      </mt-cell>

      <div class="" style="padding:0 12px;margin-top:20px;">
        <mt-button type="primary" size='large' @click="sureClick()">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      bankNum:'',
      bankname:'',
      bankaddress:'',
      bankuser:''
    }
  },
  mounted(){
  },
  methods:{
    sureClick:function(){
      this.bankNum = this.$refs.input1.value;
      if(this.bankname==null||this.bankNum==null||this.bankuser==null||this.bankaddress==null){
        Toast("请填写完整的资料");
        return;
      }
    var card1 = this.bankNum.replace(/\s/g,"");
    if (card1.length<16 || card1.length>19 ) {
   			Toast("银行卡号长度必须在16到19之间");
   			return;
   		}
      Indicator.open();
      api.bindBank(this.bankname,card1,this.bankuser,this.bankaddress)
      .then(res=>{
        history.back();
      })
    }
  }
}
</script>

<style lang="scss">
.bankdetail_body{
  input{
    min-width: 2rem;
    font-size: 0.15rem;
    color: #333;
  }
}
</style>
