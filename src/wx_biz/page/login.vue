<template lang="html">
  <div class="" style="background-color:white;">
    <div class="top_bg">
      <img src="../images/pic_LOGO@2x.png" alt="">
    </div>
    <div class="login_input">
      <div class="input_tel input_cell">
        <i class="iconfont icon-zhanghao"></i>
        <mt-field placeholder="请输入用户名" type="tel" :attr="{ maxlength: 11 }" v-model="username"></mt-field>
      </div>
      <div class="input_tel input_cell">
        <i class="iconfont icon-mima"></i>
        <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
    </div>
    <div class="login_btn" :class="{login_active_btn:islogin}" @click="clickLogin">
      登录
    </div>
  </div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  mounted(){
    if(localStorage.token){
      sessionStorage.token = localStorage.token;
      this.$router.push('/bizindex');
    }
  },
  computed:{
    islogin:function(){
      return this.username.length==11&&this.password.length>0;
    }
  },
  methods:{
    clickLogin(){
      if(this.username.length!=11){
        Toast('请输入正确的手机号!');
        return ;
      }
      if(this.password.length<1){
        Toast('请输入验码');
        return ;
      }
      Indicator.open();
      api.bizLogin(this.username,this.password)
      .then(res=>{
        console.log(res);
        sessionStorage.token = res.data.token;
        localStorage.token = res.data.token;
        this.$router.push('/bizindex');
      })
    }
  }
}
</script>

<style lang="scss">
@import "../style/common";
@import "../../assets/css/font/iconfont.css";
.top_bg{
  width:100%;
  height:2.24rem;
  background-color: $bizMianColor;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  img{
    width: 1.64rem;
    height: 0.56rem;
    margin-top: 0.955rem;
    margin-left: 1.055rem;
  }
}
.login_input{
  margin-top: 0.8rem;
  .input_cell{
    display: flex;
    align-items: center;
    margin-left: 0.67rem;
    width: 2.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    .mint-cell-wrapper{
      background-size: 0px;
    }
    .mint-cell:last-child{
      background-size: 0px;
    }
    i{
      font-size: 30px;
      margin-right: 10px;
    }
  }
}
.login_btn{
  width: 2.4rem;
  margin-left: 0.67rem;
  margin-top: 0.4rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background-color:rgba(0,0,0,0.2);
  border-radius: 0.04rem ;
  color: white;
  font-size: 0.18rem;
}
.login_active_btn{
  background: linear-gradient(to right, rgba(1,168,248,1),$bizMianColor );
  box-shadow: 0.014rem 0.014rem 0.14rem rgba(233,91,5,0.3);
}
</style>
