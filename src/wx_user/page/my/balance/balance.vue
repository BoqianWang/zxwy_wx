<template id="">
  <div class="">
    <div class="balance_body">
      <div class="cu_point">
        <p style="font-size:0.415rem;padding-top:0.175rem;">{{userbalance}}</p>
        <p class="tixian_btn">提现</p>
        <div class="pic_1">
          <div class="pic_2"></div>
        </div>
      </div>
      <div class="point_title">
        <mt-cell title="资金明细">
          <img slot="icon" src="../../../images/my/icon_qb@2x.png" width="26" height="24">
        </mt-cell>
      </div>
      <div class="body_mini_ct">
        <div class="ct_left ct_div"></div>
        <div class="ct_right ct_div"></div>
      </div>
      <div class="point_list">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
          <li v-for='item in balanceLists'>
            <mt-cell :title="item.transTypeDesc" :label="item.transDate">
              <div><p>{{item.transAmounts}}</p><p style="font-size:0.08rem;color:#ff6e15;"></p></div>
            </mt-cell>
          </li>
        </ul>
        <mt-cell title="暂无数据!" style="text-align:center;color:#333;" v-show="balanceLists.length==0"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../../config/api'
import { Toast,Indicator} from 'mint-ui'
  export default {
    data(){
      return{
        pageNo:1,
        balanceLists:[],
        loading:false,
        totalPage:1,
        userbalance:0
      }
    },
    mounted(){
      this.loadPageList();
      this.userbalance = this.$route.query.balance?this.$route.query.balance:0;
    },
    methods:{
      loadMore:function(){
         this.more();// 上拉触发的分页查询
        //  this.$refs.loadmore.onBottomLoaded();
      },
      loadPageList:function(){
        Indicator.open();
        api.balanedetail(this.pageNo)
        .then(res=>{
          // Indicator.close();
          if(res.code==0){
            this.balanceLists = res.data.lists;
            this.totalPage = res.data.totalPage;
          }else{
            // Toast(res.msg);
          }
          console.log(res);


        })
        .catch(error=>{
          // Indicator.close();
          console.log(error);
          // Toast(error);
        })
      },
      more:function(){
        console.log('more');
        this.loading = true;
        api.balanedetail(this.pageNo+1)
        .then(res=>{
          console.log(res);
          if(res.code==0){
            this.balanceLists = this.balanceLists.concat(res.data.lists);
            this.totalPage = res.data.totalPage;
            this.pageNo = res.data.pageNo;
            this.isHaveMore();
          }else {
            console.log(error);
          }

        })
        .catch(error=>{
          console.log(error);
        })
      },
      isHaveMore:function(){
        this.loading = false;
        if(this.pageNo == this.totalPage){
          this.loading = true;
        }
      }
    }
  }
</script>

<style lang="scss">

  .balance_body{
    padding: 0.16rem 0.115rem;
    .cu_point{
      position: relative;
      width: 100%;
      height: 1.4rem;
      background-color: #FFC962;
      border-radius: 0.04rem;
      box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
      p{
        text-align: center;
        color: white;
      }
      .tixian_btn{
        font-size: 0.12rem;
        width:0.602rem;
        height:0.22rem;
        border:1px solid white;
        line-height: 0.22rem;
        margin-left: 1.458rem;
        border-radius: 0.11rem;
      }
      .pic_1{
        background: url(../../../images/pic_bg_jf3@2x.png) no-repeat center;
        background-size:100% 100%;
        width: 100%;
        height: 0.5rem;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .pic_2{
        background: url(../../../images/pic_bg_jf2@2x.png) no-repeat center;
        background-size:100% 100%;
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        top: 0;
      }
    }
    .point_title{
      width: 100%;
      border-radius: 0.04rem;
      box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
      margin-top: 0.12rem;
      .mint-cell {
        img{
          margin-right: 10px;
        }
        .mint-cell-text{
          font-family: PingFang-SC-Regular;
        }
      }
    }
    .body_mini_ct{
      width: 100%;
      height: 0.11rem;
      .ct_div{
        background: url(../../../images/my/mini_ct@2x.png) no-repeat center;
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
    .point_list{
      width: 100%;
      border-radius: 0.04rem;
      box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
      .mint-cell {
        padding:3px 0;
        .mint-cell-title{
          .mint-cell-text{
            font-size: 0.12rem;
          }
          .mint-cell-label{
            font-size: 0.09rem;
            color: rgba(0,0,0,0.56);
          }
        }
        .mint-cell-value{
          font-size: 13px;
          font-family: PingFang-SC-Regular;
          text-align: right;
        }
      }
    }
  }
</style>
