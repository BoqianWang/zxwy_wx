<template>
	<div class="take-out-order">
		<!-- <router-script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js" @load-finsh="weixinFinsh"></router-script> -->
		<router-script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js" @load-finsh="weixinFinsh"></router-script>
		<!-- 头部 -->
		<div class="order-title-wrap res">
			<div class="abs order-address bg-white">
				<div class="text-center p-r-ten p-l-ten rel order-title flex-box align-center justify-center" @click="changeAddress">
					<div  v-if="address.recipientAddress" class='a-detail color-3 iconfont icon-more'>
						<p class="font-15">
							<span>{{address.recipientAddress}}</span> 
							<span v-if="address.houseNumber">{{address.houseNumber}}</span>
						</p>
						<p class="p-t-ten font-12">
							<span>{{address.recipientName}}</span>
							<span>{{address.recipientPhone}}</span>
						</p>
					</div>
					<div class="add-address" v-else>
						<div class="add-address-wrap color-main">
							<span class="iconfont icon-add font-b"></span>
							<span class="font-15">新增收货地址</span>
						</div>
					</div>
				</div>
				<div class="p-ten flex-box align-center justify-s-b send">
					<div class="font-15">
						<span class="color-3">立即送出</span>
						<span class="color-main">(大约{{shopInfo['expectTime'] > 0 ? shopInfo['expectTime'] : 40}}分钟后送达)</span>
					</div>
					<!-- <span class="iconfont icon-more font-15"></span> -->
				</div>
			</div>
		</div>
		<!-- 内容 -->
		<div class="order-container p-r-ten p-l-ten">
			<div class="bg-white">
				<div class="p-ten order-shop flex-box align-center">
					<div class="shop-img m-r-ten" :style="'background-image: url(' + shopInfo['shopLogo'] + ');'"></div>
					<p class="color-7 font-18 text_over flex-1">{{shopInfo['shopName']}}</p>
				</div>
				<div class="menu-wrap">
					<li v-for="item in shopCartDetail['list']" class="flex-box menu-list justify-s-b p-l-ten p-r-ten m-b-ten">
						<div class="flex-box">
							<p class="menu-img" :style="'background-image: url(' + item['goodsPic'] + ');'">
							</p>
							<p class="p-l-ten flex-box menu-detail">
								<span class="font-15 color-3">{{item['goodsName']}}</span>
								<span class="font-12 color-9">{{item['goodsTaste']}}</span>
								<span class="font-12 color-9">{{item['goodsNum']}}份</span>
							</p>
						</div>
						<p class="font-15 color-3 p-r-ten">¥{{(item['goodsNum'] * item['discountPrice']).toFixed(2)}}</p>
					</li>
					<!-- <li class="flex-box menu-list justify-s-b p-l-ten p-r-ten m-b-ten">
						<div class="flex-box">
							<p class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
							</p>
							<p class="p-l-ten flex-box menu-detail">
								<span class="font-15 color-3">小锅焖面</span>
								<span class="font-12 color-9">小/微辣/不要葱花</span>
								<span class="font-12 color-9">1份</span>
							</p>
						</div>
						<p class="font-15 color-3 p-r-ten">¥42</p>
					</li> -->
				</div>
				<!-- <div class="show-hide m-b-ten p-ten">
					<span class="color-3 font-15 rel iconfont icon-moreunfold">点击展开</span>
					<span class="color-3 font-15 rel iconfont icon-less">点击收起</span>
				</div> -->
				<div class="p-l-ten p-r-ten p-t-ten font-12 color-3">
					<p class="flex-box justify-s-b p-b-ten">
						<span>包装费</span>
						<span>¥{{shopCartDetail['boxPrice']}}</span>
					</p>
					<p class="flex-box justify-s-b">
						<span>配送费</span>
						<span>¥{{shopInfo['expressFee']}}</span>
					</p>
				</div>
				<!-- 分割线 -->
				<div class="p-t-ten p-b-ten flex-box align-center justify-s-b inline">
					<span class="circle"></span>
					<span></span>
					<span class="circle"></span>
				</div>
				<div class="p-r-ten p-l-ten">
					<!-- 积分抵扣 -->
					<p class="flex-box justify-s-b m-b-ten font-12" v-if="integral['all'] > 0">
						<span>
							<span class="tips-intergral tips"></span>
							<span>积分抵扣(总{{integral['all']}}分)</span>
						</span>
						<span>-¥ {{integral['discount']}}</span>
					</p>
					<!-- 满减 -->
					<p class="flex-box justify-s-b m-b-ten font-12" v-if="moneyOff['discount'] > 0">
						<span>
							<span class="tips-sub tips"></span>
							<span>满减</span>
						</span>
						<span>-¥ {{moneyOff['discount']}}</span>
					</p>
					<!-- 减配送费 -->
					<p class="flex-box justify-s-b m-b-ten font-12" v-if="dispatch.discount">
						<span>
							<span class="tips-sub tips"></span>
							<span>{{ dispatch['activityDescription'] }}</span>
						</span>
						<span>-¥ {{dispatch['discount']}}</span>
					</p>
					<!-- 随机减 -->
					<p class="flex-box justify-s-b m-b-ten font-12" v-if="randomCut > 0">
						<span>
							<span class="tips-random tips"></span>
							<span>随机减</span>
						</span>
						<span>-¥ {{randomCut}}</span>
					</p>
					<!-- 清分费 -->
					<p class="flex-box justify-s-b m-b-ten align-center font-12" v-if="serverMoney > 0">
						<span>
							<span class="tips-server tips"></span>
							<span>清分费</span>
						</span>
						<span>+¥ {{serverMoney}}</span>
					</p>
					<!-- 代金券 -->
					<div v-if="voucherNum > 0" class="flex-box align-center justify-s-b m-t-ten">
						<div class="font-15">
							<span class="tips-ticket tips"></span>
							<span class="color-3">代金券</span>
						</div>
						<div class="font-12 color-main" v-if="tipsVocher">
							{{tipsVocher}}
						</div>
						<div v-else class="font-15" @click="showVoucher('voucher')">
							<span v-if="voucher['discount']" class="color-main">-¥ {{voucher['discount']}}</span>
							<span v-else class="white-f tips p-l-ten p-r-ten" style="background: #FF6E15;">{{voucherNum}}张可用</span>
							<span class="iconfont icon-more"></span>
						</div>
					</div>
				</div>
				<!-- 分割线 -->
				<div class="p-t-ten p-b-ten flex-box align-center justify-s-b inline">
					<span class="circle"></span>
					<span></span>
					<span class="circle"></span>
				</div>
				<div class="p-l-ten p-r-ten p-b-ten flex-box align-center justify-s-b">
					<span class="color-9 font-12">已优惠{{allDiscount}}元</span>
					<span></span>
					<p class="font-15">
						小计
						<span class="acount-money">¥{{surePayMoney}}</span>
					</p>
				</div>
			</div>
			<!-- 备注 -->
			<div class="m-t-ten remark" @click="showVoucher('remark')">
				<mt-cell title="备注" is-link>
				  <p class="text_over" style="width: 2rem; text-align: right;" v-if="remark">{{remark}}</p>
				  <p v-else class="font-15">口味,偏好等要求</p>
				</mt-cell>
			</div>
		</div>
		<!-- 尾部 -->
		<footer class="order-footer">
			<div class="flex-box">
				<div class="font-12 flex-1 color-9 p-l-ten p-r-ten flex-box justify-s-b">
					<span>已优惠{{allDiscount}}元</span>
					<span>
						合计
						<del>¥{{money}}</del>
						<span class="white-f font-18">¥{{surePayMoney}}</span>
					</span>
				</div>
				<p class="order-sumbit white-f text-center font-15" @click="commitOrder">
					提交订单
				</p>
			</div>
		</footer>

		<voucher ref="voucher" 
		:voucher-list="voucherList" 
		:shop-info="shopInfo" 
		:current-money="shopCartDetail['money']" 
		@voucherCount="voucherCountHandle"
		@choseVocher="choseVocherHandle"></voucher>

		<remark ref="remark" 
		@remarkHandle="remarkHandle"></remark>
	</div>
</template>
<style scoped lang="scss">
	@import "../../style/mixin";
	
	.add-address {
		/*padding: .2rem 0;*/
		.add-address-wrap {
			/*margin: 0 auto;*/
			width: 2rem;
			height: .4rem;
			border:1px solid $mainColor;
			line-height: .4rem;
			border-radius: .2rem;
		}
	}
	.order-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 3.75rem;
		height: .5rem;
		line-height: .5rem;
		background: #3B3B3B;
		.order-sumbit {
			height: 100%;
			width: 1.2rem;
			background: linear-gradient(left, #FFB911, $mainColor);
		 	background: -webkit-linear-gradient(left, #FFB911, $mainColor);
		}
	}
	.remark .mint-cell:last-child {
		background-image: none;
	}
	.acount-money {
		color: #FF2618;
	}
	/*.tips {
		padding: .02rem .04rem;
		background: #FFC000;
	}*/
	.inline {
		.circle {
			width: .1rem;
			height: .2rem;
			background: #F9F9F9;
		}
		span:nth-of-type(1) {
			border-radius: 0 .1rem .1rem 0;
		}
		span:nth-of-type(2) {
			border-bottom: 1px dashed #eee;
			width: 100%;

		}
		span:nth-of-type(3) {
			border-radius: .1rem 0 0 .1rem;
		}
	}
	.show-hide {
		text-align: right;
		.icon-moreunfold:before {
			position: absolute;
			right: .15rem;
			top: 50%;
			transform: translate3d(0, -50%, 0);
		}
		.icon-less:before {
			position: absolute;
			right: .15rem;
			top: 50%;
			transform: translate3d(0, -50%, 0);
		}
	}
	.show-hide > span {
		padding: .1rem .4rem .1rem .1rem;
		border:1px solid #eee;
	}
	.menu-list {
		background: #F9F9F9;
		padding: .2rem 0;
		.menu-detail {
			flex-wrap: wrap;
			align-content: space-between;
			/*align-content: center;*/
			span {
				width: 100%;
			}
		}
	}
	.menu-list .menu-img {
		width: .6rem;
		height: .6rem;
		background-size: cover;
	}
	.order-container {
		padding-top: .6rem;
		.order-shop {
			.shop-img {
				width: .4rem;
				height: .4rem;
				background-size: cover;
				border-radius: 50%;
			}
		}

	}
	.order-title-wrap {
		height: 1.2rem;
		background: #FF6E15;
		.order-address {
			width: 3.5rem;
			top: .1rem;
			left: 50%;
			transform: translate3d(-50%, 0, 0);
			box-shadow: 0 1px 8px 0 #eee;
			.order-title {
				min-height: 1rem;
				border-bottom: 1px solid #eee;
			}
		}
	}

	.a-detail.icon-more:before {
		position: absolute;
		top: 50%;
		right: .1rem;
		/*width:18px;
		height:18px;*/
		font-size: .15rem;
	}
	.send {
		padding: .14rem .1rem;
	}
	.take-out-order {
		background-color: #F9F9F9;
		padding-bottom: .9rem;
	}
</style>
<script>
	import routerScript from '@/components/routerScript.vue';
	import fetch from '@/config/fetch.js';
	import voucher from '@/components/voucher.vue';
	import remark from './children/takeoutorder/remark.vue';
	import brower from '@/config/browser';
	import { payType, WeixinPay, AliPay, AliFromPay } from '@/assets/js/Pay.js';
	import { canUserMoneyOff, calculateRandomCut, calculateServerMoney, calculateIntegral, calculateExpressFree } from '@/assets/js/ActiveCalculcate.js';
	export default {
		components: {
			voucher,
			remark,
			routerScript
		},
		data() {
			return {
				address: Tools.getLocalStorage('address') || {},
				shopInfo: Tools.getLocalStorage('shopInfo') || {},
				shopAuthenticateId: this.$route.query.shopAuthenticateId,
				tipsVocher: '',
				params: {
				},
				//代金券列表
				voucherList: [],
				//可用代金券数量
				voucherNum: 0,
				//选中代金券
				voucher: {

				},
				//代金券列表
				moneyOffGather: {},
				//选中的满减
				moneyOff: {},
				//总金额
				money: 0,
				//个人积分
				// personalIntegral: {},
				integral: {
					all: 0,
					discount: 0
				},
				//清风费
				serverMoney: 0,
				//支付方式
				paymentMode: '',
				//获取提示
				errorMessage: '',
				//随机减
				randomCut: 0,
				//满减
				randomCutOrigin: 0,
				//优惠金额
				allDiscount: 0,
				//减配送费集合
				dispatchGather: {},
				//减配送费
				dispatch: {}
			}
		},
		created() {
			this.$store.commit('initShopCart', this.shopAuthenticateId);
		},
		computed: {
			//备注
			remark() {
				return this.$store.state.remark;
			},
			//购物车详情
			shopCartDetail() {
				return this.$store.getters.shopCartDetail;
			},
			surePayMoney() {
				this.money = Tools.ToCurrency(this.shopCartDetail['money'] + this.shopInfo['expressFee']);
				let surePay = this.money;


				//减配送费
				// let expressFeeObject = calculateExpressFree(surePay, this.shopInfo['expressFee'], this.dispatchGather);
				// surePay = expressFeeObject['sureMoney'];
				// this.dispatch = expressFeeObject['dispatchDiscount']

				//满减
				this.moneyOff = canUserMoneyOff(surePay, this.moneyOffGather['activitys']);
				surePay -= this.moneyOff['discount']; 


				// 随机减
				let randomObj = calculateRandomCut(surePay, this.randomCutOrigin);
				surePay = randomObj['surePayMoney'];
				this.randomCut = randomObj['random'];

				//代金券
				if(this.voucher['discount']) {
					surePay -= this.voucher['discount'];
				} else {
					this.voucher['discount'] = 0;
				}
				surePay = Tools.ToCurrency(surePay, 2);

				if(surePay <= 0) {
					surePay = 0;
				}
				// 积分
				let IntegralObj = calculateIntegral(this.integral['all'], surePay);
				this.integral['discount'] = IntegralObj['intergralDiscount'];
				surePay = IntegralObj['surePayMoney'];

				//清风费
				this.serverMoney = calculateServerMoney(this.integral['discount'], this.voucher['discount'], this.shopInfo);
				
				surePay += this.serverMoney;
				this.allDiscount = Tools.ToCurrency(this.money - surePay + this.serverMoney);
				return Tools.ToCurrency(surePay);
			},
		},
		mounted() {
			this.getIntegral();
			this.isCanUserVoucher();
			this.getMoneyOffList();
			this.getVoucherList();
			this.getRanDomSub();
		},
		methods: {
			weixinFinsh() {
				console.log('小程序api加载完成')
			},
			//检查是否能用代金券
			isCanUserVoucher() {
				if(!this.address['recipientId']) {
					this.tipsVocher = '填写地址使用代金券';
				}
			},
			//小程序支付跳转
			miniProgramPay(orderId) {
				wx.miniProgram.navigateTo({
					url: `/pages/pay/pay?orderId=${orderId}&zx_token=${Tools.getCookie('zx_token')}`
				});
			},
			remarkHandle(work) {
				this.remark = work;
			},
			getMoneyOffList() {
				for(let item of this.shopInfo['activitysList']) {
					// 满减
					if(item.activityType == 0) {
						this.moneyOffGather = item;
					}
					// 减配送费
					else if(item.activityType == 2) {
						this.dispatchGather = item;
					}
				}
			},
			//选择使用的代金券
			choseVocherHandle(info) {
				this.voucher = info;
			},
			//获取可用代金券数量
			voucherCountHandle(count) {
				this.voucherNum = count;
			},
			orderData() {
					//积分抵扣金额
				let deductedCost = this.integral['discount'] || 0,
					randomCut = this.randomCut,
					//减配送费id
					deliverActivityId = this.dispatch['activityId'] || '',
					//减免配送费金额
					disExpressFee = this.dispatch['discount'] || 0,
					//总优惠
					discount = Tools.ToCurrency(this.moneyOff['discount'] + this.voucher['discount'] + randomCut + disExpressFee),
					activityId = this.moneyOff['activityId'] || '',
					activityBelong = this.moneyOffGather['activityBelong'] || '',
					shareGiftsId = this.voucher['shareGiftsId'] || '',
					receiveId = this.voucher['receiveId'] || '',
					//支付方式
					paymentMode = payType == 'WeiXin' ? 1 :  2,
					// paymentMode = 0,
					// 订单来源
					orderSource = payType == 'WeiXin' ? 1 :  2,
					//清风费
					qffFee = this.serverMoney,
					//订单明细
					detailList = this.getDetailList(this.shopCartDetail['list']),
					currentTime = (+new Date() + 1200 * 1000) / 1000,
					addressId = this.address['recipientId'];
				this.params = {
					addressId: addressId,
					expressFee: this.shopInfo['expressFee'],

					expectTime: Tools.TimestampToDate('YYYY-M-D h:m:s', currentTime),
					//配送方式
					invoiced: 0,
					wmRemark: this.remark,
					bizId: this.shopInfo['bizId'],
					originalCost: this.money,
					actualCost: this.surePayMoney,
					deductedCost,
					discount,
					activityId,
					activityBelong,
					shareGiftsId,
					receiveId,
					paymentMode,
					orderSource,
					qffFee,
					detailList,
					randomCut,
					// deliverActivityId,
					// disExpressFee
				};
			},
			//处理菜单列表
			getDetailList(detailList) {
				let list = [];
				for(let item of detailList) {
					delete item['shopAuthenticateId'];
					delete item['goodsCategoryId'];
					delete item['goodsId'];
					list.push(item);
				}
				return list;
			},
			//提交订单
			commitOrder() {
				if(!this.address['recipientId']) {
					this.errorMessage = '请填写收货地址';
					this.$toast(this.errorMessage);
					return;
				}
				this.orderData();
				fetch.fetchPost('/order/v3.2/takeawaySubmit', {
					json: JSON.stringify(this.params)
				}).then( res => {
					this.payDetail = res.data;
					if(res.data.orderStatus >= 2 ) {
						this.paySuccess();
					}
					else if(res.data.orderStatus == 1) {
						if(window.__wxjs_environment && window.__wxjs_environment === 'miniprogram') {
							this.miniProgramPay(this.payDetail['orderId']);
							return;
						}
						if(payType == 'WeiXin') {
							// this.weixinPay(res.data.retMap);
							WeixinPay(res.data.retMap, (res) => {
								this.paySuccess()
							})
						}
						else if(payType == 'Alipay') {
							 if(res.data.form) {
				              // const div = document.createElement('div');
				              // div.innerHTML = res.data.form;
				              // document.body.appendChild(div);
				              // document.forms.punchout_form.submit();
				              AliFromPay(res.data.form)
				            } else {
				              //支付宝浏览器api支付
				              // document.addEventListener('AlipayJSBridgeReady', this.tradePay(res.data.tradeNo), false);
				              // this.Alipay(res.data.tradeNo);
				              Alipay(res.data.tradeNo, (res) => {
				              	  this.paySuccess();
				              })
				              // AliPay(res.data.tradeNo, (res) => {
				              // 	 this.paySuccess()
				              // })
				            }
						}
					}
				}).catch(res => {
					
				})
			},
			//支付宝支付
		    // Alipay(tradeNO) {
		    //    AlipayJSBridge.call("tradePay", {
		    //         tradeNO: tradeNO
		    //    },  (data) => {
		    //        if ("9000" == data.resultCode) {
		    //            this.paySuccess();
		    //        } else {
		    //            this.paySuccess();
		    //        }
		    //    });
		    // },
			paySuccess() {
				this.$store.commit('clearShopCart');
				location.replace('./index.html#/pay/takeoutDetail?orderId=' + this.payDetail['orderId']);
				// this.$router.replace({
				// 	path: '/pay/takeoutDetail',
				// 	query: {
				// 		orderId: this.payDetail['orderId']
				// 	}
				// })
			},
			//选择代金券
			showVoucher(type) {
				if(type == 'voucher') {
					this.$refs.voucher.showHidePopup();
				} else if(type == 'remark') {
					this.$refs.remark.showHidePopup();
				}
			},
			//修改收货地址
			changeAddress() {
				this.$router.push({
					path: '/takeout/addressList'
				})
			},
			//获取积分
			getIntegral() {
				fetch.fetchPost('/personal/personalCenter', {

				}).then(res => {
					this.integral['all'] = res.data.integral;
				}).catch(res => {

				})
			},
			getVoucherList() {
				fetch.fetchPost('/personal/v3.3/shopAvailableVoucherList', {
					bizId: this.shopInfo['bizId'],
					orderType: 2
				}).then(res => {
					this.voucherList = res.data.lists;
				}).catch(res => {

				})
			},
			//获取代金券
			// getVoucherList() {
			// 	fetch.fetchPost('/personal/voucherList', {
			// 		pageNo: 1,
			// 		canUse: true
			// 	}).then(res => {
			// 		this.voucherList = res.data.lists;
			// 	}).catch(res => {

			// 	})
			// },
			//获取随机减
			getRanDomSub() {
				fetch.fetchPost('/order/v3.2/randomSub', {
					bizId: this.shopInfo['bizId'],
					// merNo: ''
				}).
				then(res => {
					// this.randomCut = res.data;
					this.randomCutOrigin = res.data;
				})
			},
		}
	}
</script>