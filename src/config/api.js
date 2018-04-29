import fetch from './fetch'

export default{

   /**
    * 验证码获取
    */
    telCode(tel) {
        return fetch.fetchPost('personal/randCode', {username:tel});
    },
    /**
     * 用户登录
     */
     telLogin(tel,code) {
        return fetch.fetchPost('personal/loginOrRegist', {username:tel,operateType:2,verificationCode:code});
    },

    /**
     * 订单列表
     */
     orderList(pageNo) {
        return fetch.fetchPost('personal/orderList', {pageNo:pageNo});
    },

    /**
     * 首页
     */
     homeList(pageNo,lon,lat) {
        return fetch.fetchGet('index/toIndexPage', {pageNo:pageNo,longitude:lon,latitude:lat});
    },

    /**
     * 店铺详情
     */
     bizdetail(bizId) {
        return fetch.fetchPost('index/toEachBizPage', {bizId:bizId});
    },

    /**
     * 快捷买单
     */
     shortpay(bizId) {
        return fetch.fetchPost('order/ShopDetails', {bizId:bizId});
    },

    /**
     * 授权登录获取openId
     */
     author(authorUrl) {
        return fetch.fetchPost('grant/auth',{authorUrl:authorUrl});
    },

    /**
     * 提交订单
     */
     orderSubmit(bizId,originalCost,actualCost,deductedCost,discount,activityBelong,activityId,paymentMode,randomDisAmount,shareGiftsId) {
        return fetch.fetchPost('order/orderSubmitShortcut',{bizId:bizId,originalCost:originalCost,actualCost:actualCost,deductedCost:deductedCost,discount:discount,activityBelong:activityBelong,activityId:activityId,paymentMode:paymentMode,randomDisAmount:randomDisAmount,shareGiftsId:shareGiftsId});
    },

    /**
     * 积分详情
     */

    pointdetail(pageNo){
      return fetch.fetchPost('personal/integralDetailList',{pageNo:pageNo});
    },

    /**
     * 余额详情
     */

     balanedetail(pageNo){
       return fetch.fetchPost('personal/fundDetailList',{pageNo:pageNo});
     },
     /**
      * 个人中心
      */

      personCenter(){
        return fetch.fetchPost('personal/personalCenter');
      },
      /**
       * 订单详情
       */
      orderdetail(orderId){
        return fetch.fetchPost('personal/orderDetail',{orderId:orderId});
      },
      /**
       * 优惠列表
       */
      userCenterVoucherList(pageNo,canUsed){
        return fetch.fetchPost('personal/userCenterVoucherList',{pageNo:pageNo,canUse:canUsed});
      },
      /**
       * 优惠列表
       */
      useyouhuilist(pageNo,canUsed){
        return fetch.fetchPost('personal/voucherList',{pageNo:pageNo,canUse:canUsed});
      },
      /**
       * 修改绑定手机号
       */
      getPhone(phoneNum,randomCode){
        return fetch.fetchPost('personal/changePhoneNum',{phoneNum:phoneNum,randomCode:randomCode});
      },
      /**
       * 赠送500积分
       */
      toReceiveFive(){
        return fetch.fetchPost('personal/toReceiveFive');
      },
      /**
       * 赠送1000积分
       */
      toReceiveTen(){
        return fetch.fetchPost('personal/toReceiveTen');
      },
      newPersonalGetVouchers(){
        return fetch.fetchPost('personal/newPersonalGetVouchers');
      },
      /*------------------------商家接口-----------------------*/
      /**
       * 商家登录
       */
      bizLogin(tel,password){
        return fetch.fetchPost('login/login',{username:tel,loginPassword:password});
      },
      /**
       * 订单管理
       */

      bizOrderList(dataTime,pageNumber,pageSize){
        return fetch.fetchPost('order/orderList',{dateTime:dataTime,pageNo:pageNumber,pageSize:pageSize});
      },

      /**
       * 商家中心
       */

      bizcenter(){
        return fetch.fetchPost('shopcentor/index');
      },

      /**
       * 财务首页
       */

      financeHome(){
        return fetch.fetchPost('bill/bizBill');
      },

      /**
       * 提现界面
       */

      banktixian(){
        return fetch.fetchPost('bill/toWithdrawals');
      },

      /**
       * 确认提现
       */

      suretixian(tiixanmoney){
        return fetch.fetchPost('bill/applyWithdrawals',{balance:tiixanmoney});
      },

      /**
       * 余额流水
       */

      yuelist(pageNo,pageSize){
        return fetch.fetchPost('bill/balanceList',{pageNo:pageNo,pageSize:pageSize});
      },

      /**
       * 查询银行列表
       */

      banklist(){
        return fetch.fetchPost('bill/blankList');
      }
      ,

      /**
       * 绑定银行卡
       */

      bindBank(bankId,bankCard,bankAccount,bankAddress){
        return fetch.fetchPost('bill/bindBank',{bankId:bankId,bankCard:bankCard,bankAccount:bankAccount,bankAddress:bankAddress});
      },

      /**
       * 提交code
       */
      commitCode(code) {
        return fetch.fetchGet('grant/v1.2/getWxOpenid', {code: code});
      }
}
