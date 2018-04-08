<template lang="html">
<div class="center_body">
  <div class="center_biz">
    <img :src="bizData.shopLogo" alt="">
    <div class="biz_detail">
      <p>{{bizData.shopName}}</p>
      <p>{{bizData.address}}</p>
    </div>
  </div>
  <div class="biz_ul">
    <router-link to='/finance' class="biz_cell cell_line">
      <p>账务对账</p>
      <i class="iconfont icon-arrow-right"></i>
    </router-link>
    <div class="biz_cell">
      <p>联系业务经理</p>
      <i class="iconfont icon-arrow-right"></i>
    </div>
  </div>

  <div class="login_btn login_active_btn" @click="exitLoginBtn">
    退出登录
  </div>
</div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      bizData:''
    }
  },
  mounted(){
    sessionStorage.tabbar_text = "商家中心";
    Indicator.open();
    api.bizcenter()
    .then(res=>{
      console.log(res);
      this.bizData = res.data;
    })
  },
  methods:{
    exitLoginBtn:function(){
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
@import "../style/common";
.center_biz{
  display: flex;
  // align-items: center;
  @include wh(100%,0.765rem);
  background-color: $bizMianColor;
  padding: 0.12rem;
  img{
    @include wh(0.52rem,0.52rem);
    margin-right: 0.15rem;
    border-radius: 4px;
  }
  .biz_detail{
    color: white;
    p:first-child{
      font-size: 0.18rem;
      font-weight: bold;
    }
    p:last-child{
      font-size: 0.12rem;
      color: rgba(255,255,255,0.64);
      margin-top: 5px;
    }
  }
}
.biz_ul{
  padding: 0 0.12rem;
  background-color: white;
  margin-top: 20px;
  .cell_line{
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  .biz_cell{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.5rem;
    p{
      font-size: 0.15rem;
      color: rgba(0,0,0,0.87);
    }
    i{
      font-size: 0.15rem;
      color: rgba(0,0,0,0.4);
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
