<template lang="html">
<div class="tel_page">
  <mt-field label="手机号" placeholder="请输入手机号" type="tel" :attr="{ maxlength: 11 }" v-model="phone">
    <!-- <div class="code_btn">获取验证码</div> -->
    <telcode :start='start' @countDown ='start=false' @click.native='sendCode'></telcode>
  </mt-field>
  <mt-field label="验证码" placeholder="请输入手机验证码" type="number" class="body_code" v-model="code"></mt-field>

  <div class="login_btn" :class="{login_active_btn:islogin}" @click="clickLogin">
    绑定手机
  </div>
</div>
</template>

<script>
  import telcode from '../../../../components/phonecode/telcode.vue'
  import api from '../../../../config/api'
  import { Toast,Indicator} from 'mint-ui'
  export default{
    components:{
      telcode
    },
    data(){
      return{
          start :false,
          phone: '',
          code: '',
          isfirst:false,
          randomDisAmount:0
      }
    },
    computed:{
      islogin:function(){
        return this.phone.length==11&&this.code.length>0;
      }
    },
    methods:{
        sendCode(value){
          if(this.start) return ;
          Indicator.open();
          api.telCode(this.phone)
          .then(res=>{
            Toast(res.msg);
            console.log(res);
            this.start = true;
          })

        },
        clickLogin(){
          if(this.phone.length!=11){
            Toast('请输入正确的手机号!');
            return ;
          }
          if(this.code.length<1){
            Toast('请输入手机验证码');
            return ;
          }
          Indicator.open();
          api.getPhone(this.phone,this.code)
              .then(res=>{
                // Indicator.close();
                if(res.code==0){
                  console.log(res);
                  this.$router.go(-1);
                  //
                  // history.back();
                }else {
                  // Toast(res.msg);

                }
                console.log(res);

              })
              .catch(error=>{
                // Indicator.close();
                // Toast(error);
              })

        }
    },
    watch:{

    }
  }
</script>

<style lang="scss">
  @import "../../../style/mixin";
  .tel_page{
    padding: 0.16rem 0.12rem;
    .mint-cell{
      width:100%;
      height:0.5rem;
      background:rgba(255,255,255,1);
      border-radius: 0.04rem;
      .mint-cell-title{
        width: 90px;
        .mint-cell-text{
          font-size: 0.15rem;
        }
      }
      .mint-cell-value{
        font-size: 0.15rem;
      }
    }
    .body_code{
      margin-top: 0.065rem;
      margin-bottom: 0.3rem;
    }

    .login_btn{
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      background-color:rgba(0,0,0,0.2);
      border-radius: 0.04rem ;
      color: white;
      font-size: 0.15rem;
    }
    .login_active_btn{
      background: linear-gradient(to right, $mainColor , rgba(255,185,17,1));
      box-shadow: 0.014rem 0.014rem 0.14rem rgba(233,91,5,0.3);
    }
  }
</style>
