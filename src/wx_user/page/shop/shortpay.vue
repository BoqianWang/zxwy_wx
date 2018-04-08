<template lang="html">
  <div class="pay_body">
    <div class="pay_input">
      <keyword v-model="val" :isClick="isClick" @sure="surePay" @show_keyboard="showKeyboard"></keyword>
       <!-- <label for="" style="color:#333;width:80px;">消费金额</label>
       <p style="font-size:24px;"><span style="color:#999;" v-show="val.length>0">￥</span>{{val}}</p>
       <span class="animate" :style="{visibility: linkShow ? 'visible' : 'hidden'}"></span>
       <span style="color:#999;" v-show="val.length==0">询问服务员后输入</span> -->
      <!-- <input type="text" placeholder="请询问服务员输入"  :value="val"  class="input_m" disabled> -->
      <!-- <wc-keyboard v-model="val" inter="5" decimal="2" placeholder="询问服务员后输入" label="消费金额"/> -->
    </div>
    <div class="jisuan_div">
      <mt-cell :title="orderdata.shopName">
        <img slot="icon" :src="orderdata.shopLogo" width="24" height="24">
      </mt-cell>
      <mt-cell :title="orderdata.personalIntegralStr">
        <span>-￥{{jikoJifen}}</span>
      </mt-cell>
      <mt-cell :title="manjiandata.manjianText" v-show="!(orderdata.isFirstOrder&&firstjianData.firstjianArr.length>0)&&manjiandata.manjianArr.length>0">
        <span>-￥{{manjiandata.fullprice}}</span>
      </mt-cell>
      <mt-cell :title="firstjianData.firstjianText" v-show="orderdata.isFirstOrder&&firstjianData.firstjianArr.length>0">
        <span>-￥{{firstjianData.firstjianprice}}</span>
      </mt-cell>
      <mt-cell title="代金券" is-link @click.native="popupClick">
        <span v-if="ksydjjList.length==0">暂无可用</span>
        <span v-if="ksydjjList.length>0&&chooseItem.discount==0" style="color:#ff6e15;">{{ksydjjList.length}}张可用</span>
        <span v-if="ksydjjList.length>0&&chooseItem.discount>0" style="color:#ff6e15;">-￥{{chooseItem.discount}}</span>
      </mt-cell>
      <mt-cell title="实付金额">
        <span style="color:rgba(255,110,21,1);">￥{{realpay}}</span>
      </mt-cell>
      <mt-cell title="支付方式" :value="payname" is-link  @click.native="handleClick"></mt-cell>
    </div>
    <div class="sure_pay">

      <div class="login_btn" @click = "surePay" v-show="showkeyboard">
        确认支付
      </div>
    </div>
<!-- <keyword @watchVal="watchVal" @confirmEvent="surePay" :isClick="isClick"></keyword> -->
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="pop_body">
        <div class="pop_cell" @click="payType('wx','微信')" v-show='browerName=="WeiXin"'>
          <img src="../../images/icon_weichat@2x.png" alt="">
          <label for="weixin">微信</label>
          <img src="../../images/checked_small@2x.png" alt="" v-show='paytype=="wx"'>
        </div>
        <div class="pop_cell" @click="payType('zfb','支付宝')" v-show='browerName=="Alipay"'>
          <img src="../../images/icon_zfb@2x.png" alt="">
          <label for="zfb">支付宝</label>
          <img src="../../images/checked_small@2x.png" alt="" v-show='paytype=="zfb"'>
        </div>
        <div class="pop_cell" @click="payType('yue','余额')">
          <img src="../../images/icon_ye@2x.png" alt="">
          <label for="yue">余额(可用余额:{{this.orderdata.personalBalance?this.orderdata.personalBalance:'0'}})</label>
          <img src="../../images/checked_small@2x.png" alt="" v-show='paytype=="yue"'>
        </div>
      </div>
    </mt-popup>

    <mt-popup v-model="popupdjj" position="right">
      <div class="">
        <mt-header fixed title="选择代金券">
          <div slot='left' @click="popupdjj=false"><mt-button icon="back"></mt-button></div>
          <div slot='right' @click="cancelchoosedjjClick()">暂不使用</div>
        </mt-header>
        <ul class="ul_div">
          <li v-for="item in djjList" @click="choosedjjClick(item)">
            <div class="li_div">
              <div v-if="item.activityLevel==0">
                <div class="top_div" :style="{background: item.isUser==1?'':'rgba(204,204,204,1)'}">
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
              </div>
              <div v-else-if="item.activityLevel==4">
                <div class="top_div" :style="{background: item.isUser==1?'':'rgba(204,204,204,1)'}">
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
              </div>
              <div v-else-if="item.activityLevel==5">
                <div class="top_div" :style="{background: item.isUser==1?'':'rgba(204,204,204,1)'}">
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
              </div>
              <div class="min_kachi"></div>
              <div class="bottom_div">
                <div v-if="item.activityLevel==4">
                  <div v-if="item.isUser==0">  仅限 <span style="color:#000;" v-for="subItem in item.districtCodeVOs">{{subItem.shopName}}</span> 可用 </div>
                </div>
                <div v-else-if="item.activityLevel==5">
                  <div v-if="item.isUser==0">  仅限 <span style="color:#000;" v-for="subItem in item.districtCodeVOs">{{subItem.shopName}},</span> 可用 </div>
                </div>
                <div v-if="val<item.fullMoney">  消费金额需满<span style="color:#000;">{{item.fullMoney}}元</span> 可用 </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </mt-popup>

    <div class="first_div" v-show="isFirst">
      <div class="first_context" v-if='orderdata.amountVO'>
        <div class="first_center">
          <img src="../../images/first_yh@2x.png" alt="">
          <span class="spanClass">首单满15减{{orderdata.amountVO.randomDisAmount}}元</span>
          <p>您获得了新用户的使用特权</p>
          <p></p>
          <div class="remake">
            仅限首单哦！
          </div>
        </div>
        <div class="first_sure" @click="backPage">
          朕知道了
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import api from '../../../config/api'
import brower from '../../../config/browser'
import { Toast,Indicator} from 'mint-ui'
import keyword from '../../../components/keyword/KeyboardInput.vue'
export default {
  components:{
    keyword
  },
  data(){
    return{
      popupdjj:false,
      paytype:'wx',
      payname:'微信',
      isClick:true,//确认提交后控制点击事件
      // linkShow:true,//光标闪烁
      showkeyboard:false,
      popupVisible:false,
      orderdata:'',
      manjiandata:{
        manjianText:'',
        manjianArr:[],
        fullprice:0,
        fullId:'',
        activityBelong:''
      },
      firstjianData:{
        firstjianText:'',
        firstjianArr:[],
        amountVO:{
          randomDisAmount:''
        },//首单随机减
        firstjianprice:0,
        firstjianId:'',
        activityBelong:''
      },
      realpay:0,
      browerName:'',
      jikoJifen:0,
      afterDataVO:'',
      isFirst:false,
      isiOS:false,
      val:'',
      djjList:[],
      ksydjjList:[],
      chooseItem:{
        discount:0,
        startBizId:'',
        shareGiftsId:''
      }
    }
  },
  watch:{
    val:function(newValue,oldValue){
      this.manjiandata.fullprice = 0;
      if(this.orderdata.isFirstOrder&&this.firstjianData.firstjianArr.length>0){

      }else{
        for (var i in this.manjiandata.manjianArr) {
          var subacitem = this.manjiandata.manjianArr[i];
          if(subacitem.fullMoney<=newValue){
            if(subacitem.discount>this.manjiandata.fullprice){
              this.manjiandata.fullprice = subacitem.discount;
              this.manjiandata.fullId = subacitem.activityId;
            }
          }
        }
      }
      this.firstjianData.firstjianprice = 0;
      if(this.orderdata.isFirstOrder){
        for (var i in this.firstjianData.firstjianArr) {
          // var subacitem = this.firstjianData.firstjianArr[i];//首单减固定金额
          var subacitem = this.firstjianData.amountVO;//首单减随机金额
          if(subacitem){
            if(subacitem.fullMoney<=newValue){
              if(subacitem.randomDisAmount>this.firstjianData.firstjianprice){
                this.firstjianData.firstjianprice = subacitem.randomDisAmount;
                this.firstjianData.firstjianId = subacitem.activityId;
              }
            }
          }
        }
      }
      // 重新清空选择的优惠劵
      this.chooseItem = {discount:0,startBizId:'',shareGiftsId:''};
      this.jikoJifen = 0;
      var youhuiMoney = newValue - this.manjiandata.fullprice - this.firstjianData.firstjianprice; //优惠后的金额
      if(youhuiMoney<=0){
        this.realpay = 0;
      }else {
        if(this.orderdata.personalIntegralMoney<=youhuiMoney){
          this.realpay = (youhuiMoney - this.orderdata.personalIntegralMoney).toFixed(2);//Math.floor((youhuiMoney - this.orderdata.personalIntegralMoney) * 100) / 100;
          this.jikoJifen = this.orderdata.personalIntegralMoney?this.orderdata.personalIntegralMoney:0;
        }else{
          this.realpay = 0;
          this.jikoJifen =  youhuiMoney.toFixed(2);// Math.floor(youhuiMoney * 100) / 100;
        }
      }

      if(this.realpay <0){
        this.realpay = 0;
      }

      if(this.realpay > this.orderdata.personalBalance&&this.paytype=="yue"){
        if(this.browerName=="WeiXin"){
          this.paytype = 'wx';
          this.payname = '微信';
        }else{
          this.paytype = 'zfb';
          this.payname = '支付宝';
        }
      }

      // 计算满足使用代金券的数量
      this.ksydjjList = [];
      for (var z in this.djjList) {
        var djjitem = this.djjList[z];
        if(djjitem.activityLevel==4){//商圈通用优惠券
          for (var y in djjitem.districtCodeVOs) {
            var subitem = djjitem.districtCodeVOs[y];
            if(subitem.districtCode==this.orderdata.businessCode&&newValue>=djjitem.fullMoney){
              djjitem.isUser = 1;//标记可用
              this.ksydjjList = this.ksydjjList.concat(djjitem);
              break;
            }
          }
        }else if(djjitem.activityLevel==0){
          for (var y in djjitem.districtCodeVOs) {
            var subitem = djjitem.districtCodeVOs[y];
            if(newValue>=djjitem.fullMoney){
              djjitem.isUser = 1;//标记可用
              this.ksydjjList = this.ksydjjList.concat(djjitem);
              break;
            }
          }
        }else if (djjitem.activityLevel==5) {
          for (var y in djjitem.districtCodeVOs) {
            var subitem = djjitem.districtCodeVOs[y];
            if(subitem.districtCode==this.orderdata.bizId&&newValue>=djjitem.fullMoney){
              djjitem.isUser = 1;//标记可用
              this.ksydjjList = this.ksydjjList.concat(djjitem);
              break;
            }
          }
        }
      }
      //  this.chooseItem.discount = 0;
      //  this.chooseItem.shareGiftsId = '';
    console.log(this.ksydjjList);
    }
  },
  created(){
    this.fetchData();
    // Toast("实例创建完成之后函数");

  },
  // destroyed(){
  //   this.$destroy();
  //   console.log('实例销毁完成执行的钩子');
  // },
  methods:{
    fetchData(){
      var u = navigator.userAgent;
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.browerName = brower.IsWeixinOrAlipay();
      if(this.browerName=="WeiXin"){
        this.paytype = 'wx';
        this.payname = '微信';
      }else{
        this.paytype = 'zfb';
        this.payname = '支付宝';
      }
      var bizId = this.$route.query.bizId;
      if(!sessionStorage.token){
        return;
      }
      Indicator.open();
      // var t = Date.now();
      // console.log(t);
      api.shortpay(bizId)
      .then(res=>{
        // alert(JSON.stringify(res));
        this.orderdata = res.data;
        this.isFirst = res.data.isFirstOrder;
        // 加载可用代金券
        this.cxdjjarr();
        for (var i in res.data.activitysVO) {
          var acitem = res.data.activitysVO[i];
          if(acitem.activityType==0){
            this.manjiandata.manjianArr = acitem.activitys;
            this.manjiandata.activityBelong = acitem.activityBelong;
            for (var j in acitem.activitys) {
              var subacitem = acitem.activitys[j];
              this.manjiandata.manjianText = this.manjiandata.manjianText + subacitem.activityDescription + ";";
            }
          }
          if(acitem.activityType==7){
            this.firstjianData.firstjianArr = acitem.activitys;
            this.firstjianData.amountVO = res.data.amountVO;
            this.firstjianData.activityBelong = acitem.activityBelong;
            for (var j in acitem.activitys) {
              var subacitem = acitem.activitys[j];
              // this.firstjianData.firstjianText = this.firstjianData.firstjianText + subacitem.activityDescription;//首单立减
              this.firstjianData.firstjianText = this.firstjianData.firstjianText + res.data.amountVO.describe;//首单随机减
            }
          }
        }

      })
      .catch(error=>{
        // if(error==2){
        //   this.$router.push('/login');
        // }
      })
    },
    showKeyboard(res){
      // console.log(res);
      this.showkeyboard = !res;
      // this.val = res;
    },
    backPage:function(){
      this.isFirst =  false;
    },
    cxdjjarr:function(){
      // console.log('cxdjjarr');
      this.djjList  = [];
      api.useyouhuilist(1,true)
      .then(cts=>{
        console.log('res'+cts);
        for (var z in cts.data.lists) {
            var djjitem = cts.data.lists[z];
            // if(djjitem.startBizId==this.orderdata.bizId){
              this.djjList = this.djjList.concat(djjitem);
              console.log(this.djjList);
            // }
        }
      })
    },
    payType:function(type,name){
      console.log(type);
      if(type=='yue'){
        if(this.realpay > this.orderdata.personalBalance){
          this.popupVisible = false;
            Toast('余额不足');
            return;
        }
      }
      this.paytype = type;
      this.popupVisible = false;
      this.payname = name;

    },
    handleClick:function(){
      this.popupVisible = true;
    },
    popupClick:function(){
      this.popupdjj = true;
      var nouserList = [];
      for (var z in this.djjList) {
        var item  = this.djjList[z];
        if(item.activityLevel==4){
          var isNum = 0;
          for (var y in item.districtCodeVOs) {
            var subitem = item.districtCodeVOs[y];
            if(subitem.districtCode==this.orderdata.businessCode&&this.val>=item.fullMoney){
              isNum = 1;
              break;
            }
          }
          if(isNum==1){

          }else{
            item.isUser = 0;//标记不可用
            nouserList = nouserList.concat(item);
          }
        }else if(item.activityLevel==0){
          var isNum = 0;
          for (var y in item.districtCodeVOs) {
            var subitem = item.districtCodeVOs[y];
            if(this.val>=item.fullMoney){
              isNum = 1;
              break;
            }
          }
          if(isNum==1){

          }else{
            item.isUser = 0;//标记不可用
            nouserList = nouserList.concat(item);
          }
        }else if (item.activityLevel==5) {
          var isNum = 0;
          for (var y in item.districtCodeVOs) {
            var subitem = item.districtCodeVOs[y];
            if(subitem.districtCode==this.orderdata.bizId&&this.val>=item.fullMoney){
              isNum = 1;
              break;
            }
          }
          if(isNum==1){

          }else{
            item.isUser = 0;//标记不可用
            nouserList = nouserList.concat(item);
          }
        }
      }
      this.djjList = this.ksydjjList.concat(nouserList);
      console.log(this.djjList);
    },
    cancelchoosedjjClick:function(){
      this.chooseItem = {discount:0,startBizId:'',shareGiftsId:''};
      this.popupdjj = false;
      this.jikoJifen = 0;
      var youhuiMoney = this.val - this.manjiandata.fullprice - this.firstjianData.firstjianprice-this.chooseItem.discount; //优惠后的金额
      if(youhuiMoney<=0){
        this.realpay = 0;
      }else {
        if(this.orderdata.personalIntegralMoney<=youhuiMoney){
          this.realpay = (youhuiMoney - this.orderdata.personalIntegralMoney).toFixed(2);//Math.floor((youhuiMoney - this.orderdata.personalIntegralMoney) * 100) / 100;
          this.jikoJifen = this.orderdata.personalIntegralMoney?this.orderdata.personalIntegralMoney:0;
        }else{
          this.realpay = 0;
          this.jikoJifen =  youhuiMoney.toFixed(2);// Math.floor(youhuiMoney * 100) / 100;
        }
      }

      if(this.realpay <0){
        this.realpay = 0;
      }
    },
    choosedjjClick:function(item){
      if(item.isUser==1){
        this.user_payMoney(item);
      }
    },
    user_payMoney:function(item){
      this.chooseItem = item;
      this.popupdjj = false;
      // 重新计算金额以及积分抵扣
      this.jikoJifen = 0;
      var youhuiMoney = this.val - this.manjiandata.fullprice - this.firstjianData.firstjianprice-this.chooseItem.discount; //优惠后的金额
      if(youhuiMoney<=0){
        this.realpay = 0;
      }else {
        if(this.orderdata.personalIntegralMoney<=youhuiMoney){
          this.realpay = (youhuiMoney - this.orderdata.personalIntegralMoney).toFixed(2);//Math.floor((youhuiMoney - this.orderdata.personalIntegralMoney) * 100) / 100;
          this.jikoJifen = this.orderdata.personalIntegralMoney?this.orderdata.personalIntegralMoney:0;
        }else{
          this.realpay = 0;
          this.jikoJifen =  youhuiMoney.toFixed(2);// Math.floor(youhuiMoney * 100) / 100;
        }
      }

      if(this.realpay <0){
        this.realpay = 0;
      }
    },
    surePay: function(){

      if(this.isClick==false){
        Toast("可能重复提交，请刷新重试！");
        return;
      }

      var discount = 0;//订单减免金额
      var randomDisAmount = 0;//首单随机减金额
      var activityBelong = '';//订单活动发起方
      var activityId = '';//订单活动ID
      var originalCost = this.val;//订单原价
      var paymentMode = this.paytype=='wx'?1:(this.paytype=='zfb'?2:0);

      if(originalCost.length<=0||originalCost==0){
        Toast("请输入金额");
        return;
      }

      if(this.manjiandata.fullprice>0){
        discount = this.manjiandata.fullprice;
        activityBelong = this.manjiandata.activityBelong;
        activityId = this.manjiandata.fullId;
      }

      if(this.firstjianData.firstjianprice>0){
        discount = this.firstjianData.firstjianprice;
        randomDisAmount = this.firstjianData.firstjianprice;
        activityBelong = this.firstjianData.activityBelong;
        activityId = this.firstjianData.firstjianId;
      }
      discount = discount + this.chooseItem.discount;
      Indicator.open();
      this.isClick = false;
      api.orderSubmit(this.orderdata.bizId,originalCost,this.realpay,this.jikoJifen,discount,activityBelong,activityId,paymentMode,randomDisAmount,this.chooseItem.shareGiftsId)
      .then(res=>{
        console.log(res);
        this.afterDataVO = res.data.afterDataVO;
        if(res.data.orderStatus==1){
          if(this.paytype=="wx"){
            this.weixinPay(res.data.retMap);
            // this.isFirst = res.data.firstOrder;
          }else if(this.paytype=='zfb'){
            const div = document.createElement('div');
            div.innerHTML = res.data.form;
            document.body.appendChild(div);
            document.forms.punchout_form.submit();
          }
        }else if(res.data.orderStatus == 6){
          this.$router.push({path:'/paysuccess',query:{getIntegral:res.data.afterDataVO.getIntegral,
                                                       actualCost:res.data.afterDataVO.actualCost,
                                                       personalIntegral:res.data.afterDataVO.personalIntegral,
                                                       vouchersCount:res.data.afterDataVO.vouchersCount}});
          // if(res.data.firstOrder){
          //     window.location.href = 'http://userside.zhongxiang51.com/order/toRandomPrizePage?token='+sessionStorage.token+'&getpoint='+res.data.givePersonalIntegral;
          // }else{
          //   this.$router.push({path:'/paysuccess',query:{getpoint:res.data.givePersonalIntegral}});
          // }
        }
      })
      .catch(error=>{
        console.log(error);
        this.isClick = true;
        if(error == "2"){
          this.$router.push('/login');
        }
      })

    },
    weixinPay:function(data){
        var vm= this;
        if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
            document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
          }
        }else{
          vm.onBridgeReady(data);
        }
      },
      onBridgeReady:function(data){
        var  vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',{
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.package,
            "signType":data.signType, //微信签名方式：
            "paySign":data.paySign //微信签名
          },
          function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok"){
              vm.$router.push({path:'/paysuccess',query:{getIntegral:vm.afterDataVO.getIntegral,
                                                         actualCost:vm.afterDataVO.actualCost,
                                                         personalIntegral:vm.afterDataVO.personalIntegral,
                                                         vouchersCount:vm.afterDataVO.vouchersCount}});
              // if(vm.isFirst){
              //   window.location.href = 'http://userside.zhongxiang51.com/order/toRandomPrizePage?token='+sessionStorage.token+'&getpoint='+vm.getpoint;
              // }else{
              //   vm.$router.push({path:'/paysuccess',query:{getpoint:vm.getpoint}});
              // }
            }else{
              vm.isClick = true;
            }
          }
        );
      }
  }
}
</script>

<style lang="scss">
@import "../../style/mixin";
.pay_body{
.mint-cell-text{
  font-size:0.15rem;
  font-family:PingFang-SC-Medium;
  color:#000;
  // letter-spacing:2px;
}
.pay_input{
  width: 3.51rem;
  height: 0.6rem;
  background-color: white;
  margin: 0.12rem 0.125rem;
  padding: 0.12rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .input_m{
    flex: 1;
    font-size: 0.18rem;
  }
}
.jisuan_div{
  .mint-cell-wrapper{
    background-size: 120% 1px;
  }
}
.mint-popup{
  width: 100%;
  .pop_cell{
    height: 0.6rem;
    display: flex;
    align-items: center;
    color: #333;
    font-size: 0.15rem;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    img{
      width: 0.22rem;
      height: 0.22rem;
      margin-left: 0.15rem;
    }
    label{
      padding: 0 0 0 0.125rem;
      width: 2.2rem;
    }
  }
}
.sure_pay{
  padding: 0.4rem 0.52rem;
  .login_btn{
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background-color:rgba(0,0,0,0.2);
    border-radius: 0.04rem ;
    color: white;
    font-size: 0.15rem;
    background: linear-gradient(to right, $mainColor , rgba(255,185,17,1));
    box-shadow: 0.014rem 0.014rem 0.14rem rgba(233,91,5,0.3);
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
    height: 50px;
  }
  .ul_div{
    padding: 0px 0.12rem;
    position: absolute;
    left: 0;
    top: 64px;
    right: 0;
    bottom: 10px;
    overflow-y: scroll;
    .li_div{
      width: 100%;
      // height: 1rem;
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
        background: url('../../images/pic_xiaojuchi@2x.png') repeat-x;
        background-size:30px 5px;
        margin-top: -5px;
      }
      .bottom_div{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: 0.12rem;
        padding: 0px 0.2rem 0.1rem 0.2rem;
        color:rgba(85,85,85,1);
      }
    }
  }
}
.first_div{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  .first_context{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .first_center{
    width:3.4rem;
    height:3.4rem;
    background:rgba(255,255,255,1);
    border-radius: 0.02rem ;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    img{
      width: 2.69rem;
      height: 1.66rem;
      margin-top: 0.35rem;
      margin-bottom: 0.25rem;
    }
    p{
      font-size: 0.18rem;
      color: rgba(51,51,51,1);

    }
    .spanClass{
       color:  rgba(255,110,21,1);
       font-size: 0.2rem;
       margin-bottom: 0.09rem;
    }
    .remake{
      color:rgba(102,102,102,1);
      font-size: 0.12rem;
      margin-top: 0.14rem;
    }
  }
  .first_sure{
    height: 0.44rem;
    line-height: 0.44rem;
    color:white;
    text-align: center;
    font-size: 0.18rem;
    background: linear-gradient(to right, $mainColor , rgba(255,185,17,1));
  }
}
}

</style>
