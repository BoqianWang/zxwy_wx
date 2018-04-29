<template lang="html">
  <div class="">
    <div class="five_body" v-if="dataCode==0">
      <img src="../../images/pic_hdjf@2x.png" alt="">
      <p>恭喜您获得500积分</p>
      <router-link to="/mycenter" class="chakandjj">查看</router-link>
    </div>
    <div class="five_body" v-else-if="dataCode==1">
      <img src="../../images/pic_hdjf_d@2x.png" alt="">
      <p>领取积分失败</p>
    </div>
  </div>
</template>

<script>
import api from '../../../config/api'
import { Toast,Indicator} from 'mint-ui'
export default {
  data(){
    return{
      dataCode:2
    }
  },
  mounted(){
    if(!Tools.getCookie('zx_token')){
      return;
    }
    Indicator.open();
    api.toReceiveFive()
    .then(res=>{
      console.log(res);
      this.dataCode = 0;
    })
    .catch(error=>{
      if(error==1){
        this.dataCode = 1;
      }
    })
  }
}
</script>

<style lang="scss">
.five_body{
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  img{
    width: 2.15rem;
    height: 1.5rem;
    margin: 0.72rem 0 0.2rem 0;
  }
  p{
    width: 100%;
    color:#666;
    font-size: 0.16rem;
    text-align: center;
  }
  .chakandjj{
    width:1rem;
    height:0.32rem;
    line-height: 0.32rem;
    background:rgba(255,185,17,1);
    border-radius: 0.05rem ;
    margin-top:14px;
    font-size:0.12rem;
    color:rgba(213,27,27,1);
    text-align: center;
  }
}
</style>
