<template lang="html">
  <div class="yuelist_body">
    <div class="" style="padding:0.12rem;font-size:0.12rem;color:#666;">
      最近流水
    </div>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30" infinite-scroll-immediate-check="false">
      <li v-for="item in yuelist">
        <mt-cell :title="item.transType==1?'购买积分':(item.transType==2?'余额提现':(item.transType==3?'平台奖励':(item.transType==4?'订单收入':(item.transType==5?'提现手续费':'提现失败退回资金'))))"
         :label='(new Date(parseInt(item.created)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "))+"   "+(item.auditStatus==0?"审核中":(item.auditStatus==1?"审核成功":"审核失败"))'>
          <div class=""><p style="color:rgba(255,93,93,1);">{{(item.transType==3||item.transType==4||item.transType==6)?"+":""}}{{item.transAmount}}</p><p style="font-size:12px;">金额{{item.currentBalance}}</p></div>
        </mt-cell>
      </li>
    </ul>
    <mt-cell title="暂无数据!" style="text-align:center;color:#333;" v-show="yuelist.length==0"></mt-cell>
  </div>
</template>

<script>
import api from '../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      yuelist:[],
      pageSize:20,
      pageNo:1,
      totalPage:1,
      loading:false
    }
  },
  mounted(){
    Indicator.open();
    api.yuelist(this.pageNo,this.pageSize)
    .then(res=>{
      this.yuelist = res.data.list;
      this.totalPage = res.data.pages;
      this.pageNo = res.data.pageNo;
    })
  },
  methods:{
    loadMore:function(){
       this.more();// 上拉触发的分页查询
      //  this.$refs.loadmore.onBottomLoaded();
    },
    more:function(){
      console.log('more');
      this.loading = true;
      api.yuelist(this.pageNo+1,this.pageSize)
      .then(res=>{
        console.log(res);
        if(res.code==0){
          this.yuelist = this.yuelist.concat(res.data.list);
          this.totalPage = res.data.pages;
          this.pageNo = res.data.pageNo;
          this.isHaveMore();
        }else {
          console.log(error);
        }

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
.yuelist_body{
  .mint-cell-value{
    font-size: 0.15rem;
    // font-family: PingFang-SC-Regular;
    text-align: right;
  }
}
</style>
