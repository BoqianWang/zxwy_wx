<template id="">
  <div class="tabbar_body">
    <mt-tabbar v-model="selected" fixed>
      <!-- <mt-tab-item id="商家">
        <div v-if='selected=="商家"'>
            <img src="../../wx_user/images/tab_sj_xz@2x.png" slot="icon" >
        </div>
        <div v-else>
          <img src="../../wx_user/images/tab_wd@2x.png" slot="icon" >
        </div>

        商家
      </mt-tab-item> -->
      <mt-tab-item id="订单管理">
        <div v-if='selected=="订单管理"'>
            <img src="../../wx_biz/images/tab_ddgl_pre@2x.png" slot="icon" >
        </div>
        <div v-else>
          <img src="../../wx_biz/images/tab_ddgl@2x.png" slot="icon" >
        </div>
        订单管理
      </mt-tab-item>
      <mt-tab-item id="店铺中心">
        <div v-if='selected=="店铺中心"'>
            <img src="../../wx_biz/images/tab_dpzx_pre@2x.png" slot="icon" >
        </div>
        <div v-else>
          <img src="../../wx_biz/images/tab_dpzx@2x.png" slot="icon" >
        </div>
        店铺中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>



<script>
export default{
  data() {
    return {
      selected:""
    }
  },
  mounted(){
    this.selected = sessionStorage.tabbar_text;
  },
  watch:{
    "selected": {
      handler (val,oldval) {
        if (this.selected == "订单管理") {
          this.$router.push('/bizindex/orderm')

        } else {

        }
        if (this.selected == "店铺中心") {
          this.$router.push('/bizindex/centerm')

        } else {

        }
      },
      deep:true//对象内部的属性监听，也叫深度监听
    }
  }
}
</script>

<style lang="scss">
  // @import "../../wx_user/style/mixin";
.tabbar_body{
  .mint-tabbar{
    height:0.49rem;
    background:rgba(255,255,255,1);
    box-shadow: 0.045rem 0.025rem 0.12rem rgba(255,110,21,0.22);
    .is-selected{
      color: #00c3ff !important;
      background-color: white !important;
    }
    .mint-tab-item-icon{
      margin-bottom: 0.03rem;
      width:0.235rem;
      height:0.235rem;
    }
    .mint-tab-item-label{
      font-size: 0.11rem;
       line-height: 1;
    }
    img{
      width: 0.25rem;
      height: 0.25rem;
    }
  }
}

</style>
