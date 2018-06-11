<template>
	<div class="takeout-detial">
		<div class="takeout-d-title rel">
			<div class="bg-white title-wrap abs text-center">
				<div class="color-3 p-t-ten p-b-ten" @click="processTrack">
					<p class="font-18 p-ten font-b">
						{{orderStatus[orderDetailStatus]}}
						<!-- <span v-if="orderDetail['distributionType'] == 1">
							{{orderStatus[orderDetail['dadaStatus']]}}
						</span>
						<span v-else>
							{{orderStatus[orderDetail['orderStatus']]}}
						</span> -->
					</p>
					<p class="font-12">感谢您对众享无忧的支持,欢迎下次光临</p>
				</div>
				<div class="text-right p-r-ten title-btn">
					<mt-button 
					v-if="orderDetailStatus == 1" 
					class="takeout-btn font-15" type="primary" @click="restartToPay">点击支付</mt-button>

					<mt-button class="refund-btn font-15" type="primary" 
					v-if="orderDetailStatus == 2" 
					@click="cancelOrder">取消订单</mt-button>

					<mt-button class="refund-btn font-15" type="primary" 
					v-if="canRefundGoods"
					@click="refundOrder">申请退款</mt-button>

					<!-- <span v-if="orderDetail['distributionType'] == 1"> -->
						<!-- <mt-button 
						v-if="orderDetail['dadaStatus'] == 31" 
						class="takeout-btn font-15" type="primary" @click="confirmAcciept">确认收货</mt-button> -->
					<!-- </span> -->
					<!-- <span v-else> -->
						<mt-button 
						v-if="canAccieptGoods" 
						class="takeout-btn font-15" type="primary" @click="confirmAcciept">确认收货</mt-button>
					<!-- </span> -->
					
					<!-- <mt-button 
					v-if="orderDetail['orderStatus'] == 5" 
					class="takeout-btn font-15" type="primary" @click="confirmAcciept">确认收货</mt-button> -->
					<!-- <mt-button 
					v-if="orderDetail['orderStatus'] != 6" 
					class="takeout-btn font-15" type="primary" @click="processTrack">查看进度</mt-button> -->

					<router-link :to="'/takeout/takeOutShop?shopAuthenticateId=' + orderDetail['shopAuthenticateId']">
						<mt-button class="takeout-btn font-15" type="primary">再来一单</mt-button>
					</router-link>
					<!-- <mt-button class="font-15" type="primary">评价</mt-button> -->
				</div>
			</div>
		</div>
		<div class="takeout-container p-r-ten p-l-ten">
			<div class="bg-white">
				<div class="p-ten order-shop flex-box align-center">
					<div v-if="orderDetail['shopLogo']" class="shop-img m-r-ten" :style="'background-image: url(' + orderDetail['shopLogo'] + ');'"></div>
					<p class="color-7 font-18 text_over flex-1">{{orderDetail['shopName']}}</p>
				</div>
				<div class="menu-wrap">
					<li class="flex-box justify-s-b p-ten m-b-ten" v-for="info in orderDetail['detailParams']">
						<div>
							<p class="color-3 font-15">{{info['goodsName']}}</p>
							<p class="color-9 font-12">{{info['goodsTaste']}}</p>
						</div>
						<div>
							<span class="color-9 font-12">x{{info['goodsNum']}}</span>
							<span class="font-15 color-3 text-right" style="width: .7rem; display: inline-block;">¥{{info['subTotal']}}</span>
						</div>
					</li>

				</div>
				<div class="p-l-ten p-r-ten p-t-ten font-12 color-3">
					<p class="flex-box justify-s-b p-b-ten">
						<span>包装费</span>
						<span>¥{{orderDetail['boxFee']}}</span>
					</p>
					<p class="flex-box justify-s-b">
						<span>配送费</span>
						<span>¥{{orderDetail['expressFee']}}</span>
					</p>
				</div>
				<!-- 分割线 -->
				<div class="p-t-ten p-b-ten flex-box align-center justify-s-b inline">
					<span class="circle"></span>
					<span></span>
					<span class="circle"></span>
				</div>
				<div class="p-r-ten p-l-ten">
					<p class="flex-box justify-s-b p-b-ten align-center font-12" v-if="orderDetail['deductedCost'] > 0">
						<span>
							<span class="tips-intergral tips"></span>
							<span>积分抵扣</span>
						</span>
						<span>-¥ {{orderDetail['deductedCost']}}</span>
					</p>
					<!-- <p class="flex-box justify-s-b p-b-ten align-center font-12">
						<span>
							<span class="tips-intergral tips"></span>
							<span>首减</span>
						</span>
						<span>-¥ {{3}}</span>
					</p> -->
					<p class="flex-box justify-s-b p-b-ten align-center font-12" v-if="orderDetail['activityCost'] > 0">
						<span>
							<span class="tips-sub tips"></span>
							<span>满减</span>
						</span>
						<span>-¥ {{orderDetail['activityCost']}}</span>
					</p>
					<p class="flex-box justify-s-b p-b-ten align-center font-12" v-if="orderDetail['randomCut'] > 0">
						<span>
							<span class="tips-random tips"></span>
							<span>随机减</span>
						</span>
						<span>-¥ {{orderDetail['randomCut']}}</span>
					</p>
					<p class="flex-box justify-s-b p-b-ten align-center font-12" v-if="orderDetail['shareGiftsCost'] > 0">
						<span>
							<span class="tips-ticket tips"></span>
							<span>代金券</span>
						</span>
						<span>-¥ {{orderDetail['shareGiftsCost']}}</span>
					</p>
					<p class="flex-box justify-s-b p-b-ten align-center font-12" v-if="orderDetail['qffFee'] > 0 && orderDetail['qffSource'] == 0">
						<span>
							<span class="tips-server tips"></span>
							<span>清分费</span>
						</span>
						<span>+¥ {{orderDetail['qffFee']}}</span>
					</p>
				</div>
				<!-- 分割线 -->
				<div class="p-t-ten p-b-ten flex-box align-center justify-s-b inline">
					<span class="circle"></span>
					<span></span>
					<span class="circle"></span>
				</div>
				<div class="p-l-ten p-r-ten flex-box align-center justify-s-b">
					<span class="color-9 font-12">已优惠{{orderDetail['discount']}}元</span>
					<span></span>
					<p class="font-15">
						小计
						<span class="acount-money">¥{{orderDetail['actualCost']}}</span>
					</p>
				</div>
				<!-- 分割线 -->
				<div class="p-t-ten p-b-ten flex-box align-center justify-s-b inline">
					<span class="circle"></span>
					<span></span>
					<span class="circle"></span>
				</div>
				<div class="p-b-ten flex-box font-15 text-center">
					<a class="flex-1 color-3" :href="'tel: '+ tel">
						<span class="iconfont icon-phone"></span>
						<span>联系商家</span>
					</a>
					<a class="flex-1 color-3" :href="'tel: '+ '18664336845'">
						<span class="iconfont icon-kefu"></span>
						<span>联系客服</span>
					</a>
				</div>
			</div>
			<div class="m-t-ten bg-white p-ten order-detial font-12">
				<p class="flex-box p-b-ten">
					<span class="color-7">订单号</span>
					<span class="flex-1 color-3">{{orderDetail['orderNo']}}</span>
				</p>
				<p class="flex-box p-b-ten">
					<span class="color-7">订单时间</span>
					<span class="flex-1 color-3">{{orderDetail['orderTime']}}</span>
				</p>
				<p class="flex-box p-b-ten">
					<span class="color-7">支付方式</span>
					<span class="flex-1 color-3">{{orderDetail['paymentModeStr']}}</span>
				</p>
				<p class="flex-box p-b-ten">
					<span class="color-7">联系人</span>
					<span class="flex-1 color-3">
						{{orderDetail['recipientName']}} {{orderDetail['recipientPhone']}}
					</span>
				</p>
				<p class="flex-box p-b-ten">
					<span class="color-7">配送地址</span>
					<span class="flex-1 color-3">
						{{orderDetail['recipientAddress']}}
						{{orderDetail['houseNumber'] ? orderDetail['houseNumber'] : ''}}
						<!-- <span v-if="orderDetail['houseNumber']">{{}}</span> -->
					</span>
				</p>
				<p class="flex-box p-b-ten">
					<span class="color-7">配送方式</span>
					<span class="flex-1 color-3">
						{{ distribution[orderDetail['distributionType']] }}
					</span>
				</p>
				<p class="flex-box p-b-ten">
					<span class="color-7">备注</span>
					<span class="flex-1 color-3">
						{{ orderDetail['wmRemark'] }}
					</span>
				</p>
			</div>
		</div>
		<order-status ref="orderStatus" :process-track="processList"></order-status>
	</div>
</template>
<style scoped lang="scss">
	@import "../../style/mixin";
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
	.acount-money {
		color: #FF2618;
	}
	.text-right {
	  text-align: right;
	}
	.order-detial p span:first-child {
		display: inline-block;
		width: .7rem;
	}
	.takeout-container {
		.order-shop .shop-img {
			width: .4rem;
			height: .4rem;
			border-radius: 50%;
			background-size: cover;
		}
		.menu-wrap {
			li {
				background: #F9F9F9;
			}
		}
		margin-top: .5rem;
	}
	.takeout-detial {
		margin-bottom: .4rem;
		.takeout-d-title {
			height: 1.2rem;
			background: $mainColor;
			.title-wrap {
				height: 1.4rem;
				width: 3.5rem;
				top: .1rem;
				left: .1rem;
			}
			.title-btn > button{
				width: .9rem;
				height: .4rem;
			}
			.title-btn .takeout-btn {
				background-color: $mainColor;
			}
			.title-btn .refund-btn  {
				background-color: #fff;
				border:1px solid #bdb7b7;
				color: #777;
			}
		}
		
	}
</style>
<script>
	import orderStatus from './takeoutDetail/orderStatus.vue';
	import fetch from '@/config/fetch.js';
	import { payType, WeixinPay, AliPay, AliFromPay } from '@/assets/js/Pay.js';
	// import 
	export default {
		components: {
			orderStatus
		},
		data() {
			return {
				params: {
					orderId: this.$route.query.orderId
				},
				orderDetail: {},
				orderStatus: {
					1: '订单待支付',
					2: '已支付',
					3: '已接单',
					4: '已拒单',
					5: '已发货',
					6: '已完成',
					7: '申请退款',
					8: '退款成功',
					9: '拒退款',
					10: '订单已关闭',
					0: '订单已取消',
					//达达
					31: '等待骑手接单',
					32: '骑手已接单',
					33: '配送中',
					34: '已完成',
					35: '骑手接单已取消',
					37: '已过期',
					38: '指派单',
					39: '妥投异常之物品返回中',
					310: '妥投物品异常之返回完成',
					1000: '创建达达运单失败'
				},
				distribution: {
					0: '商家',
					1: '达达'
				},
				processList: [],
				processListLength: 0,
				//确认收货
				canAccieptGoods: false,
				// 申请退款
				canRefundGoods: false
			}
		},
		computed: {
			tel() {
				if(this.orderDetail['tel']) {
					let num = this.orderDetail['tel'].split(',');
					return num[0];
				}
			},
			orderDetailStatus() {
				let status = this.orderDetail['orderStatus'];
				if(status == 3 ||  status == 5 || (status >= 31 && status <= 35)) {
					this.canAccieptGoods = true;
					this.canRefundGoods = true
				} 
				else if(status == 7 || status == 9) {
					this.canAccieptGoods = true;
					this.canRefundGoods = false;
				} else {
					this.canAccieptGoods = false;
					this.canRefundGoods = false
				}
				return status;
			}
		},
		mounted() {
			this.getOrderDetail();

		},
		methods: {
			//查看进度
			processTrack() {
				this.$refs.orderStatus.showHidePoppup();
				this.getProcess();
				// fetch.fetchPost('/order/v3.2/processTrack', this.params).then(res => {
				// 	this.processList = res.data['params'];
				// 	this.processListLength = this.processList.length;
				// 	this.orderDetail['orderStatus'] = this.processList[this.processListLength - 1]['orderStatus'];
				// 	this.orderDetail['distributionType'] = res.data['distributionType'];
				// })
			},
			getProcess() {
				fetch.fetchPost('/order/v3.2/processTrack', this.params).then(res => {
					this.processList = res.data['params'].reverse();
					this.processListLength = this.processList.length;
					this.orderDetail['orderStatus'] = this.processList[0]['orderStatus'];
					this.orderDetail['distributionType'] = res.data['distributionType'];
					// if(this.orderDetail['orderStatus'] == 3 
					// 	|| (this.orderDetail['orderStatus'] >= 31 
					// 	&& this.orderDetail['orderStatus'] <= 34)) {
					// 	this.canAccieptGoods = true
					// } else {
					// 	this.canAccieptGoods = false
					// }
				})
			},
			// 确认收货
			confirmAcciept() {
				fetch.fetchPost('/order/v3.2/confirmAcciept', this.params).then(res => {
					this.orderDetail['orderStatus'] = 6;
				}).catch(res => {

				})
			},
			//立马支付
			restartToPay() {
				fetch.fetchPost('/order/v3.2/restartToPay', this.params).then(res => {
					let result = res.data
					// if(result.orderStatus == 1) {
						if(payType == 'WeiXin') {
							WeixinPay(result.retMap, (res) => {
								if(res == 'success') {
									this.paySuccess();
								} else {
									this.canselPay();
								}
							})
						} else {
							if(result.form) {
								AliFromPay();
							} else {


								// AliPay(result.tradeNo, res => {
								// 	alert('AliPay');
								// });

								this.AliPay(result.tradeNo, res => {
									if(res == 'success') {
										this.paySuccess();
									} else {
										this.canselPay();
									}
								})
								// this.tradePay(result.tradeNo)
							}
						}
					// }
				})
			},
			AliPay(tradeNO, callback) {
				AlipayJSBridge.call("tradePay", {
			        tradeNO: tradeNO
			    }, (data) => {
			         if ("9000" == data.resultCode) {
			             callback('success')
			         } else {
			             callback('error')
			         }
			    })
			},
			//支付宝支付
			// tradePay(tradeNO) {
		 //       AlipayJSBridge.call("tradePay", {
		 //            tradeNO: tradeNO
		 //       },  (data) => {
		 //           if ("9000" == data.resultCode) {
		 //               this.paySuccess();
		 //           } else {
		 //           	   this.canselPay();
		 //           }
		 //       });
		 //    },
			paySuccess() {
				this.getOrderDetail();
			},
			canselPay() {
				this.$toast('请尽快支付, 不然就会订单会失效哦!');
			},
			//取消订单
			cancelOrder() {
				fetch.fetchPost('/order/v3.2/cancelOrder', this.params).then(res => {
					this.orderDetail['orderStatus'] = 0;
					this.$toast('取消订单成功');
				})
			},
			//申请退款
			refundOrder() {
				fetch.fetchPost('/order/v3.2/applyRefund', this.params).then(res => {
					this.orderDetail['orderStatus'] = 7;
					this.$toast('申请退款成功');
				})
			},
			//获取订单
			getOrderDetail() {
				fetch.fetchPost('/personal/v3.2/orderDetail', this.params).
				then(res => {
					this.orderDetail = res.data;
					this.getProcess();
				}).catch(res => {

				})
			}
		}
	}

</script>