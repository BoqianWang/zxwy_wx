<template id="">
  <div class="">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="商家">
        <img :src="img1" slot="icon">
        商家
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" :src="img2">
        订单
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" :src="img3">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>



<script>
export default{
  data() {
    return {
      selected:"商家",
      img1: "/src/images/tab_wd@2x.png",
      img2:'/src/images/tab_wd1@2x.png',
      img3:'/src/images/tab_wd2@2x.png'
    }
  },
  watch:{
    "selected": {
      handler (val,oldval) {
        if (this.selected == "商家") {
          this.$router.push('/home');
          this.img1="/src/images/tab_sj_xz@2x.png";
        } else {
          this.img1="/src/images/tab_wd@2x.png";
        }
        if (this.selected == "订单") {
          this.$router.push('/orderlist')
          this.img2="/src/images/tab_dd_xz@2x.png";
        } else {
          this.img2='/src/images/tab_wd1@2x.png';
        }
        if (this.selected == "我的") {
          this.$router.push('/mycenter')
          this.img3="/src/images/tab_wd_xz@2x.png";
        } else {
          this.img3='/src/images/tab_wd2@2x.png';
        }
      },
      deep:true//对象内部的属性监听，也叫深度监听
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "../../style/mixin";

.mint-tabbar{
  height:4.9rem;
  background:rgba(255,255,255,1);
  box-shadow: 0.45rem 0.25rem 1.2rem rgba(255,110,21,0.22);
  .is-selected{
    color: $mainColor;
    background-color: white;

  }
  img{
    width:2.15rem;
    height:2.15rem;
  }
  .mint-tab-item-label{
    font-size:0.9rem;

  }

}
</style>
