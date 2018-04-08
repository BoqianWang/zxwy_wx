<template id="">
  <div class="login_body">
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" :attr="{ maxlength: 11 }" v-model="phone">
      <!-- <div class="code_btn">获取验证码</div> -->
      <telcode :start='start' @countDown ='start=false' @click.native='sendCode'></telcode>
    </mt-field>
    <mt-field label="验证码" placeholder="请输入手机验证码" type="number" class="body_code" v-model="code"></mt-field>

    <div class="login_btn" :class="{login_active_btn:islogin}" @click="clickLogin">
      登录
    </div>
    <div class="login_explain">
        登录代表你已同意《众享无忧用户协议》
    </div>


    <div class="first_div" v-show="isfirst">
      <div class="first_context">
        <div class="first_center">
          <img src="../../images/first_yh@2x.png" alt="">
          <span class="spanClass">首单满15减{{randomDisAmount}}元</span>
          <p>您获得了新用户的使用特权</p>
          <p></p>
          <div class="remake">
            仅限首单哦！
          </div>
        </div>
        <div class="login_active_btn first_sure" @click="backPage">
          朕知道了
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import telcode from '../../../components/phonecode/telcode.vue'
  import api from '../../../config/api'
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
          api.telLogin(this.phone,this.code)
              .then(res=>{
                // Indicator.close();
                if(res.code==0){
                  console.log(res);
                  if(res.data&&res.data.isNewUser==true){
                    this.isfirst =  true;
                    this.randomDisAmount = res.data.randomDisAmount;
                  }else {
                    this.$router.go(-1);
                  }
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

        },
        backPage:function(){
          this.isfirst =  false;
          this.$router.go(-1);
        }
    },
    watch:{

    }
  }
</script>

<style lang="scss">
  @import "../../style/mixin";
  .login_body{
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
      margin-bottom: 0.6rem;
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
    .login_explain{
      margin-top: 0.181rem;
      font-size: 0.12rem;
      text-align: center;
      color: #666;
    }
    .first_div{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.3);
      .first_context{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .first_center{
        width:3.4rem;
        height:3.4rem;
        background:rgba(255,255,255,1);
        border-radius: 0.02rem ;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        img{
          width: 2.69rem;
          height: 1.66rem;
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        p{
          font-size: 0.18rem;
          color: rgba(51,51,51,1);

        }
        .spanClass{
           color:  rgba(255,110,21,1);
           font-size: 0.2rem;
           margin-bottom: 0.09rem;
        }
        .remake{
          color:rgba(102,102,102,1);
          font-size: 0.12rem;
          margin-top: 0.14rem;
        }
      }
      .first_sure{
        height: 0.44rem;
        line-height: 0.44rem;
        color:white;
        text-align: center;
        font-size: 0.18rem;
      }
    }
  }
</style>
