<template id="">
  <div class="">
    <div class="top_bg">
    </div>
    <div class="main_body">
        <div class="body_userInfo" @click="click_userInfo">
          <img class="tx_pic" src="../../images/pic_tx@2x.png" alt="头像">
          <div>
            <p class="userInfo_name">{{mydata.username}}</p>
            <div class="userInfo_edit">
              <p>编辑个人详细资料</p>
              <div class="min_arrow"></div>
            </div>
          </div>
          <!-- <div v-else>
            <p class="userInfo_name">登录/注册</p>
          </div> -->
        </div>
        <div class="body_mini_ct">
          <div class="ct_left ct_div"></div>
          <div class="ct_right ct_div"></div>
        </div>
        <div class="body_userAsset">
          <router-link :to="{ path:'/balance',query:{balance:mydata.balance}}" class="asset_cell">
            <p class="big_p" v-if='isLogin'><span class="min_span">￥</span>{{mydata.balance}}</p>
            <div class="asset_pic1" v-else></div>
            <p class="min_p">我的钱包</p>
          </router-link>
          <router-link :to="{path:'/youhui',query:{youhui:mydata.vouchersCount}}" class="asset_cell">
            <p class="big_p" v-if='isLogin'>{{mydata.vouchersCount}}<span class="min_span">张</span></p>
            <div class="asset_pic2" v-else></div>
            <p class="min_p">我的优惠</p>
          </router-link>
          <router-link :to="{path:'/points',query:{points:mydata.integral}}" class="asset_cell">
            <p class="big_p" v-if='isLogin'>{{mydata.integral}}</p>
            <div class="asset_pic3" v-else></div>
            <p class="min_p">我的积分</p>
          </router-link>
        </div>
        <div class="body_userList">
          <mt-cell title="收货地址" is-link>
            <img slot="icon" src="../../images/icon_dz@2x.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="修改手机号" v-if='mydata.username && mydata.username.length==11' is-link to="/settel">
            <img slot="icon" src="../../images/icon_dh@2x.png" width="24" height="24">
            <span>{{mydata.username}}</span>
          </mt-cell>
          <mt-cell title="绑定手机号" v-else is-link to="/settel">
            <img slot="icon" src="../../images/icon_dh@2x.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="客服" is-link>
            <img slot="icon" src="../../images/icon_kf@2x.png" width="24" height="24">
          </mt-cell>
          <mt-cell is-link to="./static/zxwy_intergral_origin/intergralLogin.html" title="移动积分兑换" >
            <img slot="icon" src="../../images/icon_dz@2x.png" width="24" height="24">
          </mt-cell>
        </div>
        <!-- <div class="body_exit">
          退出登录
        </div> -->
    </div>
  </div>
</template>

<script>
 import api from '../../../config/api'
  export default{
    data(){
      return{
        mydata:'',
        isLogin:false
      }
    },
    methods:{
      click_userInfo(){
        if(this.isLogin){
          return;
        }
        // this.$router.push('/login');
      }
    },
    created(){
      localStorage.tabbar_text = "我的";
    },
    mounted(){
      api.personCenter()
      .then(res=>{
        this.mydata = res.data;
        this.isLogin = true;
      })
    }
  }
</script>


<style lang="scss">
    @import "../../style/mixin";
    .top_bg{
      width:100%;
      height:1.0rem;
      background: linear-gradient(to right, $mainColor , rgba(255,185,17,1));
      border-bottom-left-radius: 10%;
      border-bottom-right-radius: 10%;

    }
    .main_body{
      margin-bottom: 60px !important;
      background-color: clear;
      margin: 0.155rem 0.12rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      .body_userInfo{
        width: 100%;
        height: 1.83rem;
        background-color: white;
        border-radius: 0.04rem;
        box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
        text-align: center;
        .tx_pic{
          margin: 0.25rem 0;
          width: 0.7rem;
          height: 0.7rem;
        }
        .userInfo_name{
          font-size: 0.15rem;
          color: rgba(7, 7 , 7, 1);
          margin-bottom: 0.035rem;
          margin-top: -12px;
        }
        .userInfo_edit{
          font-size: 0.09rem;
          color: rgba(7, 7 , 7, 1);
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .min_arrow{
            margin-left: 5px;
            width: 0.1rem;
            height: 0.12rem;
            background: url(../../images/icon_xq@2x.png) no-repeat;
            background-size:100% 100%;
          }
        }
      }
      .body_mini_ct{
        width: 100%;
        height: 0.11rem;
        .ct_div{
          background: url(../../images/mini_ct@2x.png) no-repeat center;
          background-size:100% 100%;
          width: 0.165rem;
          height: 100%;
        }
        .ct_left{
          float: left;
          margin-left: 0.085rem;
        }
        .ct_right{
          float: right;
          margin-right: 0.085rem;
        }
      }
      .body_userAsset{
        width: 100%;
        height: 1.05rem;
        border-radius: 0.04rem;
        box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
        .asset_cell{
          float: left;
          width:33.33%;
          height:100%;
          background-color: white;

          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid rgba(255,110,21,0.22);
          .big_p{
            text-align: center;
            width: 100%;
            font-size: 0.3rem;
            color: $mainColor;
            @include text_over;
            .min_span{
              color: $mainColor;
              font-size: 0.09rem;
            }
          }
          .min_p{
            font-size: 0.09rem;
            color: #333;
          }
          .asset_pic1{
            background: url(../../images/icon_qb@2x.png) no-repeat center;
            background-size:100% 100%;
            width: 0.4rem;
            height: 0.4rem;
          }
          .asset_pic2{
            background: url(../../images/icon_yh@2x.png) no-repeat center;
            background-size:100% 100%;
            width: 0.4rem;
            height: 0.4rem;
          }
          .asset_pic3{
            background: url(../../images/icon_jf@2x.png) no-repeat center;
            background-size:100% 100%;
            width: 0.4rem;
            height: 0.4rem;
          }
        }
      }
      .body_userList{
        width: 100%;
        border-radius: 0.04rem;
        box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
        margin: 0.12rem 0;
        .mint-cell {
          &:before{
            content: " ";
            position: absolute;
            bottom: 0;
            right: 15px;
            height: 1px;
            border-top: 1px solid #d9d9d9;
            color: #d9d9d9;
            transform-origin: 0 0;
            transform: scaleY(.5);
            left: 15px;
          }
          img{
            margin-right: 10px;
          }
        }
      }
      .body_exit{
        height: 0.43rem;
        line-height: 0.43rem;
        text-align: center;
        width: 100%;
        background-color: white;
        border-radius: 0.04rem;
        box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
        font-size: 0.15rem;
        color: #ff0101;
      }
    }
</style>
