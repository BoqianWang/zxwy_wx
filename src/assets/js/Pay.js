/**
 * 支付模块
 * author    wzh
 * created   2018-5-31 19:19
 */

import brower from '@/config/browser.js';


/**
 * 判断浏览器类型
 * 默认Alipay, 如果是微信返回WeiXin
 */
export const payType = brower.IsWeixinOrAlipay() == 'false' ? 'Alipay' : brower.IsWeixinOrAlipay();

/**
 * 微信支付
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function WeixinPay(data, callback) {
	if (typeof WeixinJSBridge == "undefined") {//微信浏览器内置对象。参考微信官方文档
      if(document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data, callback), false);
      }
      else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data, callback));
        document.attachEvent('onWeixinJSBridgeReady',onBridgeReady(data, callback));
      }
    } 
    else{
      onBridgeReady(data, callback);
    }
}

function onBridgeReady(data, callback) {
	WeixinJSBridge.invoke(
      'getBrandWCPayRequest',{
        "appId": data.appId,     //公众号名称，由商户传入
        "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
        "nonceStr": data.nonceStr, //随机串
        "package": data.package,
        "signType": data.signType, //微信签名方式：
        "paySign": data.paySign //微信签名
      },(res) => {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        if(res.err_msg == "get_brand_wcpay_request:ok"){
             callback('success')
        }else{
            callback('error')
        }
      }
    );
}
/**
 * 支付宝api支付
 */
export function AliPay(tradeNo, callback) {
    // document.addEventListener('AlipayJSBridgeReady', tradePay(tradeNo, callback), false);
    AlipayJSBridge.call("tradePay", {
        tradeNO: tradeNo
    }, (data) => {
         if ("9000" == data.resultCode) {
             callback('success')
         } else {
             callback('error')
         }
    })

}
/**
 * 支付宝网页支付
 * @param {[type]} formDate [description]
 */
export function AliFromPay(formDate) {
	  const div = document.createElement('div');
    div.innerHTML = formDate;
    document.body.appendChild(div);
    document.forms.punchout_form.submit();
}




