<template lang="html">
  <div class="bizdetail_body">
    <div class="first_section">
      <ul>
          <li class="biz_li">
            <div class="list_left">
              <img :src="bizdata.shopLogo" alt="">
            </div>
            <div class="list_right">
              <div class="biz_ct">
                <div class="row">
                  <p class="bizName">{{bizdata.shopName}}</p>
                </div>
                <div class="row">
                  <p class="text_biz">月销{{bizdata.monthSaleCount==null?'0':bizdata.monthSaleCount}}单</p>
                </div>
                <div class="row text_biz line_p">
                    <p>{{bizdata.businessName}} | 人均：{{bizdata.perAverage}}</p>
                </div>
              </div>
            </div>
        </li>
        <li>
          <!-- <mt-cell :title="bizdata.shopAddress">
            <i slot="icon" class="iconfont icon-dingwei"></i>
             <span style="color: green">电话</span>
          </mt-cell> -->
          <div class="section_div">
            <div class="address_div">
              <i slot="icon" class="iconfont icon-dingwei"></i>
              <p>{{bizdata.shopAddress}}</p>
            </div>
            <a class="tel_div" :href="tel">
              <i slot="icon" class="iconfont icon-icon32206"></i>
            </a>
          </div>
        </li>
        <li>
          <mt-cell title="快捷买单">
            <img slot="icon" src="../../images/icon_kjmd@2x.png" width="30" height="30">
             <router-link :to="{ path:'/pay/shortpay',query:{bizId:bizdata.bizId}}" class="md_btn">买单</router-link>
          </mt-cell>
        </li>
      </ul>
    </div>
    <div class="second_section" v-show='bizdata.activitysVO.length>0'>
      <p class="ac_title">优惠活动</p>
      <div class="ac_cell">
        <div v-for="acitem in bizdata.activitysVO" class="ac_div">
          <img src="../../images/pic_shou1@2x.png" alt="" v-if="acitem.activityType==7">
          <img src="../../images/pic_jian1@2x.png" alt="" v-if="acitem.activityType==0">
          <img src="../../images/pic_zeng1@2x.png" alt="" v-if="acitem.activityType==8||acitem.activityType==9">
          <span v-for='subacitem in acitem.activitys'>
            {{subacitem.activityDescription}}
          </span>
        </div>
      </div>
    </div>
    <div class="second_section">
      <p class="ac_title">商家信息</p>
      <div class="ac_cell">
        <p>{{bizdata.openTime}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../config/api'
import { Toast,Indicator} from 'mint-ui'
export default {
  data(){
    return{
      bizdata:'',
      tel:''
    }
  },
  mounted(){
    var bizId = this.$route.query.bizId;
    Indicator.open();
    api.bizdetail(bizId)
    .then(res=>{
      console.log(res);
      this.bizdata  = res.data;
      this.tel = "tel:"+res.data.tel;
    })
  }
}
</script>

<style lang="scss">
  .bizdetail_body{
    .first_section{
      .biz_li{
        padding: 0.24rem 0.12rem;
        background-color: white;
        // border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: flex-start;
        .list_left{
          width: 0.52rem;
          height: 0.52rem;
          // background-color: red;
          margin-right: 0.17rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .list_right{
          width: 2.82rem;
          .biz_ct{
            width: 100%;
            height: 0.6rem;
            display: flex;
            flex-direction: column;
            .row{
              flex-grow: 1;
            }
            .bizName{
              font-size: 0.15rem;
              font-weight: bold;
              height: 0.15rem;
              line-height: 0.15rem;
            }
            .text_biz{
              font-size: 0.1rem;
              color: rgba(51, 51, 51, 0.78);
            }
            .line_p{
              p{
                display: inline-block;
              }
            }
          }
        }
      }
      .md_btn{
        width:0.6rem;
        height:0.25rem;
        line-height: 0.25rem;
        text-align: center;
        border:1px solid rgba(156,222,86,1);
        border-radius: 0.02rem ;
        color: rgba(156,222,86,1);
      }
    }
    .second_section{
      background-color: white;
      width: 100%;
      padding: 0.14rem 0.21rem;
      margin-top: 0.125rem;
      .ac_title{
        font-size: 0.15rem;
      }
      .ac_cell{
        .ac_div{
          font-size: 0.12rem;
          color: rgba(0, 0 , 0, 0.78);
          display: flex;
          align-items: center;
        }
        img{
          height: 16px;
          width: 16px;
          margin-right: 5px;
        }
      }
    }
    .section_div{
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: white;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      .address_div{
        display: flex;
        align-items: center;

        i{
          color: #666;
          font-size: 18px;
          margin-right: 10px;
        }
        p{
          font-size: 15px;
        }
      }
      .tel_div{
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        i{
          color: #666;
          font-size: 20px;
        }
      }
    }
  }
</style>
