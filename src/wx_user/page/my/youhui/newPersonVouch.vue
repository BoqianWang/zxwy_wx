<template lang="html">
<div class="youhui_page">
  <ul class="ul_div">
    <li v-for="item in uselist">
      <div class="li_div">
        <div class="top_div">
          <div class="row1_div">
            <div class="">
              {{item.voucherTitle}}
            </div>
            <div class="">
              <span style="font-size:12px;">￥</span>{{item.discount}}
            </div>
          </div>
          <div class="row2_div">
            <div class="">
              {{item.beginDateStr}}至{{item.endDateStr}}
            </div>
            <div class="">
              满{{item.fullMoney}}可用
            </div>
          </div>
        </div>
        <div class="min_kachi"></div>
        <div class="bottom_div">
          <div>  <span style="color:#000;" v-for="(subItem,index) in item.districtCodeVOs">
            <span v-if="index==0">{{subItem.districtCode==0?"全平台":"指定商户"}}</span>
          </span> 可用 </div>
          <div>{{item.voucherStatusStr}}</div>
        </div>
      </div>
    </li>
  </ul>
  <div class="bottom_text">
     <span class="color-7">没有更多红包了</span>
  </div>
  <div class="to-attention width-100 p-ten flex-box justify-center align-center" @click="showCodeImg">
  	  <img width="30px" src="../../../images/zxwy/logo.png">
  	  <span class="attention bg-white color-3">关注公众号使用红包</span>
  	  <div class="code abs" v-show="showCode">
  	  	  <p class="white-f p-b-ten">长按识别二维码</p>
  	  	  <img src="../../../images/zxwy/code.jpg" alt="">
  	  </div>
  </div>
  <div class="box-shadow" v-show="showCode" @click="showCodeImg"></div>
</div>
</template>

<script>
import fetch from '@/config/fetch.js';
export default {
  data(){
    return{
      pageNo: 1,
      uselist: [],
      showCode: false,
      sourcesWay: this.$route.query.sourcesWay || 0
    }
  },
  
  mounted(){
      this.getRedPacket();
  },
  methods: {
  	showCodeImg() {
  		this.showCode = !this.showCode;
  	},
  	getRedPacket() {
  		fetch.fetchPost('personal/v3.3/firstOrderReceivePlatVouchers', {
  			conditions: 0,
  			sourcesWay: this.sourcesWay
  		}).then(res => {
  			if(res.code == 0) {
  				this.getRadPacketList();
  			}
  		}).catch(res => {

  		})
  	},
  	//获取红包列表
  	getRadPacketList() {
  		fetch.fetchPost('/personal/v3.3/shopAvailableVoucherList', {}).then(res => {
  			this.uselist = res.data.lists;
  		}).catch(res => {

  		})
  	}
  }
}
</script>

<style lang="scss">
.box-shadow {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0, .6);
}
.to-attention {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 2;
	.attention {
		border-radius: 10px;
		border: 1px solid #ccc;
		padding: .05rem .1rem;
		margin-left: .05rem;
		font-size: 14px;
	}
	.code {
        width: 100px;
        height: 100px;
        left: 50%;
        top: -140px;
        transform: translate3d(-50%, 0, 0);
        font-size: 14px;
        img {
        	width: 100%;
        	height: 100%;
        }

	}
}
.youhui_page{
   padding-bottom: 62px;
  .bottom_text{

    font-size: 0.12rem;
    height: 44px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    a{
      color: rgba(153,153,153,1);
    }
  }
  .ul_div{
    padding: 0px 0.12rem;
    .li_div{
      width: 100%;
      height: 1rem;
      border-radius: 0.04rem ;
      box-shadow: 0 0.045rem 0.12rem rgba(255,110,21,0.26);
      margin-top: 0.12rem;
      background-color: white;
      .top_div{
        height: 0.7rem;
        border-top-left-radius:0.04rem ;
        border-top-right-radius:0.04rem ;
        background: linear-gradient(to right, rgba(255,167,52,1) , rgba(255,110,21,1));
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0px 0.2rem;
        color: white;
        .row1_div{
          display: flex;
          justify-content: space-between;
          font-size: 0.18rem;
        }
        .row2_div{
          display: flex;
          justify-content: space-between;
          font-size: 0.12rem;
        }
      }
      .min_kachi{
        height: 12px;
        background: url('../../../images/pic_xiaojuchi@2x.png') repeat-x;
        background-size:30px 5px;
        margin-top: -5px;
      }
      .bottom_div{
        display: flex;
        align-items: center;
        font-size: 0.12rem;
        padding: 0px 0.2rem;
        color:rgba(85,85,85,1);
        justify-content: space-between;
      }
    }
  }
}
</style>
