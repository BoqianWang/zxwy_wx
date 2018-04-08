<template lang="html">
<div class="wxyouhui_page">
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
  <div class="nulldata" v-show="uselist.length==0">
    ----暂无数据----
  </div>
</div>
</template>

<script>
import api from '../../../../config/api';
import { Toast,Indicator} from 'mint-ui';
export default {
  data(){
    return{
      pageNo:1,
      uselist:[]
    }
  },
  mounted(){
    Indicator.open();
    api.userCenterVoucherList(this.pageNo,false)
    .then(res=>{
      this.uselist = res.data.lists;
    })
  }
}
</script>

<style lang="scss">
.wxyouhui_page{

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
        background: rgba(204,204,204,1);
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
