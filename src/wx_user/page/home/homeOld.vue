<template id="">
  <div class="home_body">
    <div class="home_swipe">
      <mt-swipe>
        <mt-swipe-item v-for='aditem in adLists' :key="aditem.adId">
          <div style="height:100%;">
           <img :src="aditem.adImage" alt="">
         </div>
      </mt-swipe-item>
      </mt-swipe>
      <div class="swipe_top">
          <div class="location_div" @click="popupVisible=true">
            <img src="../../images/nav_dz@2x.png">
            <p>{{currentAddress}}</p>
          </div>
          <div class="search_div"></div>
      </div>
    </div>
    <div class="home_middle">
      <div class="home_hangye">
        <div class="asset_cell" @click="hangyeClick(1)">
          <div class="pic_1"></div>
          <p class="min_p">美食</p>
        </div>
        <div class="asset_cell" @click="hangyeClick(2)">
          <div class="pic_2"></div>
          <p class="min_p">丽人</p>
        </div>
        <div class="asset_cell" @click="hangyeClick(3)">
          <div class="pic_3"></div>
          <p class="min_p">便利店</p>
        </div>
        <div class="asset_cell" @click="hangyeClick(4)">
          <div class="pic_4"></div>
          <p class="min_p">商城</p>
        </div>
      </div>
    </div>
    <div class="biz_nearby">
      <div class="cells_title">附近商家</div>
      <div class="biz_list">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100" infinite-scroll-immediate-check="false">
          <li class="biz_li" v-for='bizitem in bizLists'>
            <div class="list_left">
              <img :src="bizitem.shopLogo" alt="">
            </div>
            <div class="list_right">
              <router-link :to="{ path:'/bizdetail',query:{bizId:bizitem.bizId}}" class="biz_ct">
                <div class="row">
                  <p class="bizName">{{bizitem.shopName}}</p>
                </div>
                <div class="row">
                  <p class="text_biz">月销{{bizitem.monthSaleCount==null?'0':bizitem.monthSaleCount}}单</p>
                </div>
                <div class="row text_biz line_p">
                  <p>{{bizitem.businessName}} | 人均：{{bizitem.perAverage}}</p>
                  <p class="juli_p">{{bizitem.distance}}</p>
                </div>
              </router-link>
              <div class="biz_line" v-show='bizitem.activitysVO.length>0'></div>
              <div v-show='bizitem.activitysVO.length<2'>
                <div class="biz_discounts" v-for='acitem in bizitem.activitysVO'>
                  <span v-for='subacitem in acitem.activitys' class="span_discounts">
                    <img src="../../images/pic_shou1@2x.png" alt="" v-if="acitem.activityType==7">
                    <img src="../../images/pic_jian1@2x.png" alt="" v-if="acitem.activityType==0">
                    <img src="../../images/pic_zeng1@2x.png" alt="" v-if="acitem.activityType==8||acitem.activityType==9">
                    {{subacitem.activityDescription}}</span>
                </div>
              </div>
              <div v-show='bizitem.activitysVO.length>1'>
                <div class="biz_discounts">
                  <div v-if='index==0' v-for='(acitem,index) in bizitem.activitysVO' class="span_discounts span_discounts1">
                    <div class="span_left">
                      <img src="../../images/pic_shou1@2x.png" alt="" v-if="acitem.activityType==7">
                      <img src="../../images/pic_jian1@2x.png" alt="" v-if="acitem.activityType==0">
                      <img src="../../images/pic_zeng1@2x.png" alt="" v-if="acitem.activityType==8||acitem.activityType==9">
                      <span v-for='subacitem in acitem.activitys'>{{subacitem.activityDescription}}</span>
                    </div>
                    <span  @click='bizitem.acShow= !bizitem.acShow'>{{bizitem.activitysVO.length}}个活动<span class="triangle" v-bind:class='{rotate:bizitem.acShow}'></span></span>
                  </div>
                  <transition name="fade">
                    <div v-show='bizitem.acShow'>
                    <div v-if='index>0' v-for='(acitem,index) in bizitem.activitysVO' class="span_discounts">
                      <img src="../../images/pic_shou1@2x.png" alt="" v-if="acitem.activityType==7">
                      <img src="../../images/pic_jian1@2x.png" alt="" v-if="acitem.activityType==0">
                      <img src="../../images/pic_zeng1@2x.png" alt="" v-if="acitem.activityType==8||acitem.activityType==9">
                      <span v-for='subacitem in acitem.activitys'>{{subacitem.activityDescription}}</span>
                    </div>
                  </div>
                    </transition>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="nulldata" v-show="bizLists.length==0">
        ----暂无数据----
      </div>
    </div>

    <mt-popup v-model="popupVisible" position="right">
      <div class="">
        <mt-header fixed title="选择收货地址">
          <div slot='left' @click="popupVisible=false"><mt-button icon="back"></mt-button></div>
        </mt-header>
        <div class="seleteadd_inputdiv">
          <input class="selteadd_input" type="text" name="" placeholder="请输入地址" autofocus="autofocus" v-model='addressinput'>
        </div>
        <ul>
          <li v-for='addressitem in addressLists' class="address_li" @click="addressClick(addressitem)">
            <p style="color:#333;">{{addressitem.title}}</p>
            <p style="color:#666;font-size:13px;">{{addressitem.address}}</p>
          </li>
        </ul>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import api from '../../../config/api'
import { Toast,Indicator} from 'mint-ui'
  export default{
    data(){
      return{
        currentAddress:'',
        pageNo:1,
        lon:'',
        lat:'',
        adLists:[],
        bizLists:[],
        popupVisible:false,
        addressinput:'',
        addressLists:[],
        loading:false,
        totalPage:1
      }
    },
    created(){
      localStorage.tabbar_text = "商家";
    },
    mounted(){
      this.currentAddress = "获取当前地址...";
      var _this = this;
      if(Tools.getCookie('zx_token')){
        // 百度地图API功能
      var geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          console.log('您的位置：'+r.point.lng+','+r.point.lat);
          geoc.getLocation(r.point, function(rs){
          var addComp = rs.addressComponents;
          console.log(rs);
          _this.lon = r.point.lng;
          _this.lat = r.point.lat;
         _this.currentAddress = rs.address;
         _this.reqhomedata();
          });
        }
        else {

        }
      },{enableHighAccuracy: true})
      }
    },
    methods:{
      loadMore:function(){
         this.more();// 上拉触发的分页查询
        //  this.$refs.loadmore.onBottomLoaded();
      },
      more:function(){
        console.log('more');
        this.loading = true;
        Indicator.open();
        api.homeList(this.pageNo+1,this.lon,this.lat)
        .then(res=>{
          console.log(res);
          if(res.code==0){
            for (var i in res.data.bizList) {
              var item = res.data.bizList[i];
              item.acShow = false;
              this.bizLists.push(item);
            }
            this.totalPage = res.data.totalPage;
            this.pageNo = res.data.page;
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
      },
      reqhomedata:function(){
        Indicator.open();
        api.homeList(this.pageNo,this.lon,this.lat)
        .then(res=>{
          console.log(res);
          this.adLists = res.data.advertises;
          for (var i in res.data.bizList) {
            var item = res.data.bizList[i];
            item.acShow = false;
            this.bizLists.push(item);
          }
          // this.bizLists = res.data.bizList;
        })
      },
      addressClick:function(list){
        this.currentAddress = list.title;
        this.lon = list.point.lng;
        this.lat =  list.point.lat;
        this.popupVisible = false;
        this.bizLists =[];
        this.pageNo = 1 ;
        this.reqhomedata();
      },
      hangyeClick:function(num){
        Toast("努力开发中");
      }
    },
    watch:{
      addressinput:function(newValue){
        var th_is = this;
        var map = new BMap.Map("allmap");
        // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        var options = {
              onSearchComplete: function(results){
                  if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        // 判断状态是否正确
                        var s = [];
                        for (var i = 0; i < results.getCurrentNumPois(); i ++){
                            s.push(results.getPoi(i));
                        }
                        th_is.addressLists = s;
                        console.log(s);

                  }
              }
         };
        var local = new BMap.LocalSearch(map, options);
        local.search(newValue);
      }
    }
  }
</script>


<style lang="scss">
@import "../../style/mixin";
.nulldata{
  text-align: center;
  font-size: 0.14rem;
  color: #666;
  margin-top: 20px;
}
  .home_body{
    margin-bottom: 0.6rem;
    .home_swipe{
      width: 100%;
      height: 1.5rem;
      .mint-swipe{
        .mint-swipe-item{
          img{
            width: 100%;
            height: 100%;
          }
        }
        .mint-swipe-indicators{
          .mint-swipe-indicator{
            background-color: #CCCCCC;
            opacity: 1;
          }
          .mint-swipe-indicator.is-active{
            background-color: $mainColor;
          }
        }
      }
      .swipe_top{
        position: absolute;
        top: 0.065rem;
        left: 0;
        height:0.3rem;
        width: 100%;
        padding: 0 0.12rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .location_div{
          max-width:3.01rem;
          height:100%;
          background:rgba(0,0,0,0.4);
          border-radius: 0.15rem ;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          padding: 0 0.05rem;
          img{
            width: 0.2rem;
            height: 0.2rem;
          }
          p{
            font-size: 0.152rem;
            color: white;
            @include text_over;
            margin-left: 0.08rem;
            margin-right: 0.08rem;
          }
        }
        .search_div{
          background: url(../../images/nav_ss@2x.png) no-repeat center;
          background-color:rgba(0,0,0,0.4);
          background-size:0.2rem 0.2rem;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.15rem;
        }
      }
    }
    .home_middle{
      padding: 0 0.12rem;
    }
    .home_hangye{
      width: 100%;
      height: 1.14rem;
      border-radius: 0.04rem;
      box-shadow: 0.045rem 0.025rem 0.12rem rgba(233,91,5,0.22);
      position: relative;
      top: -10px;
      .asset_cell{
        float: left;
        width:25%;
        height:100%;
        background-color: white;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .min_p{
          font-size: 0.09rem;
          color:rgba(0,0,0,0.78);
          margin-top: 0.09rem;
        }
        .pic_1{
          background: url(../../images/hom_fl_ms@2x.png) no-repeat center;
          background-size:0.33rem 0.33rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: rgba(250,112,112,1);
          border-radius: 50%;
        }
        .pic_2{
          background: url(../../images/hom_fl_lr@2x.png) no-repeat center;
          background-size:0.33rem 0.33rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: #78B0FF;
          border-radius: 50%;
        }
        .pic_3{
          background: url(../../images/hom_fl_bld@2x.png) no-repeat center;
          background-size:0.33rem 0.33rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: rgba(155,222,86,1);
          border-radius: 50%;
        }
        .pic_4{
          background: url(../../images/hom_fl_sc@2x.png) no-repeat center;
          background-size:0.33rem 0.33rem;
          width: 0.5rem;
          height: 0.5rem;
          background-color: rgba(155,222,86,1);
          border-radius: 50%;
        }
      }
    }
    .biz_nearby{
      .cells_title{
        width: 100%;
        height: 0.315rem;
        color: #000;
        font-size: 0.15rem;
        line-height: 0.315rem;
         text-align: center;
      }
      .biz_li{
        padding: 0.15rem 0.12rem;
        background-color: white;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
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
              color: #000;
            }
            .text_biz{
              font-size: 0.1rem;
              color: rgba(51, 51, 51, 0.78);
            }
            .line_p{
              p{
                display: inline-block;
              }
              .juli_p{
                float: right;
              }
            }
          }
          .biz_line{
            width: 100%;
            height: 1px;
            background-color: rgba(0, 0, 0, 0.1);
          }
          .biz_discounts{
            font-size: 0.12rem;
            color: #666;
            padding-top: 5px;
            .span_discounts1{
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .span_discounts{
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              .span_left{
                display: flex;
                align-items: center;
              }
              img{
                height: 16px;
                width: 16px;
                margin-right: 5px;
              }
            }

            .triangle{
              display: inline-block;
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 10px solid rgba(0,0,0,0.2);
              position: relative;
              right: 0px;

            }
            .fade-enter-active, .fade-leave-active {
              transition: opacity .5s
            }
            .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
              opacity: 0
            }
            .rotate{
              transform:rotate(180deg);
            }
          }
        }
      }
    }

    .mint-popup-right{
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translate3d(0,0,0);
      background: #f5f5f5;
      .mint-header{
        background-color: #ff6e15;
      }
      .seleteadd_inputdiv
      {
          height: 44px;
          margin-top: 40px;
          padding: 0 20px;
          background-color: #ff6e15;
          .selteadd_input
          {
              font-size: 14px;

              width: 100%;
              height: 30px;
              padding: 0 10px;

              border: none;
              border-radius: 12px;
              outline: none;
          }
      }
      .address_li{
        background-color: white;
        padding: 8px 20px;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
</style>
