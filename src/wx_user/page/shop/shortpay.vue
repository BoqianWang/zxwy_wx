<template>
	<div class="pay-body p-ten fixed bg-white">
		<!-- 支付内容 -->
		<div class="pay-container">
			<div class="pay-title">
				<div class="shop-img flex-box m-b-ten">
					<img :src="shopInfo.shopLogo">
				</div>
				<div class="shop-name text-center m-b-ten">
					<span>{{ shopInfo.shopName }}</span>
				</div>
				<div v-show="true" class="shop-discount flex-box shop-img m-b-ten">
					<span v-for="item in moneyOffGather['activitys']">{{item.activityDescription}}</span>
					<!-- <span>满50减6</span>
					<span>优惠名称</span> -->
				</div>		
			</div>
			<div class="pay-content">
				<div class="pay-con-detail flex-box space-between">
					<!-- <span>消费金额</span>
					<span>¥16</span> -->
					<keyword v-model="money" 
					:isClick="isClick" 
					@sure="surePay"
					@show_keyboard="showKeyboard"
					label="金额"
					></keyword>
				</div>
			</div>
			<div class="pay-footer">
				<!-- 随机减 -->
				<mt-cell v-show="randomCut > 0 && isShowSureMoney" title="随机减" :value="'- ¥' + randomCut">
					<!-- <span class="color-main">- ¥1</span> -->
				</mt-cell>
				
				<!-- 代金券 -->
				<!-- <mt-cell v-show="userfulVocherCount > 0" title="代金券" is-link  @click.native="showHidePopup(popupVisible)">
				  <span class="pay-foot-discount white-f" v-if="!choseVocher['discount']">{{ userfulVocherCount }}张可用</span>
				  <span v-else>{{'- ¥' + choseVocher['discount']}}</span>
				</mt-cell> -->
				<mt-cell 
				v-show="voucherList['count'] > 0" 
				title="代金券" is-link  
				@click.native="showHidePopup(popupVisible)">
				      <span v-if="choseVocher['discount']">
				      	{{'- ¥' + choseVocher['discount']}}
				      </span>
				      <span v-else class="pay-foot-discount white-f">
				          {{ voucherList['count'] }}张可用
				      </span>
				</mt-cell>
				<!-- 积分抵扣 -->
				<mt-cell v-show="integral['all'] > 0" 
				:title="shopInfo.personalIntegralStr" 
				:value="'- ¥' + integral['discount']"></mt-cell>
				<!-- 满减 -->
				<mt-cell 
				v-show="moneyOff.discount" 
				:title="moneyOff.activityDescription" 
				:value="'- ¥' + moneyOff.discount"></mt-cell>
				<!-- 服务费 -->
				<mt-cell v-show="serverMoney > 0" 
				title="清分费" 
				:value="'+ ¥' + serverMoney"></mt-cell>
			</div>
			<div class="pay-current" v-show="isShowSureMoney">
				<mt-cell title="实付金额" :value="'¥' + surePayMoney"></mt-cell>
			</div>
			<div class="text-center">
				<mt-button v-show="sureBtn" class="pay-sure white-f" type="default" @click="surePay">确认支付</mt-button>
			</div>
		</div>
		<!-- <div class="text-center" style="margin-top: 20px;">
		    <mt-button type="danger" @click='clearCookie'>清除cookies(用于测试)</mt-button>
		</div> -->
		<!-- 代金券 -->
		<mt-popup class="popup" v-model="popupVisible" position="right" :modal="false">
			<mt-header fixed title="选择代金券" style="height: 44px;">
	          <div slot='left' @click="showHidePopup(popupVisible)">
	          	<mt-button icon="back"></mt-button>
	          </div>
	          <div slot='right' @click="choseVocherEevnt(1)">暂不使用</div>
	        </mt-header>
	        <div class="popup-container p-ten">
		        <ul>
		        	<li v-for="info in voucherList['list']" @click="choseVocherEevnt(2, info)">
						<div class="voucher">
							<div class="voucher-above white-f" :style="{background: info.isUserful == 1 ? '' : 'rgba(204,204,204,1)'}">
								<p class="flex-box justify-s-b above-title m-b-ten">
									<span>{{ info.voucherTitle }}</span>
									<span>¥{{ info.discount }}</span>
								</p>
								<p class="flex-box justify-s-b font-12">
									<span>{{ info.beginDateStr }}至{{ info.endDateStr }}</span>
									<span>满{{ info.fullMoney }}可用</span>
								</p>
							</div>
							<div class="voucher-middle"></div>
							<div class="voucher-below font-12">
								<!-- <p>仅限{{ info['districtCodeVOs'][0]['shopName'] }},可用</p> -->
								<p v-for="item in info['districtCodeVOs']">
									仅限{{item['shopName']}}可用
								</p>
								<p>消费金额需满{{ info.fullMoney }}元可用</p>
							</div>
						</div>
		        	</li>
		        </ul>
	        </div>
		</mt-popup>

		<div class="error-shop-info fixed" v-if="errorShopInfo"></div>
	</div>
</template>
<style>
	.pay-body .error-shop-info {
	    /*position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;*/
	    background: rgba(0, 0, 0, .5);
	    z-index: 2;
	 }
	 .fixed {
	 	position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	 }
	.pay-body {
		overflow: auto;
	}

	.shop-img {
		justify-content: center;
	}
	.shop-img > img {
		width: .58rem;
		height: .58rem;
		border-radius: 50%;
		overflow: hidden;
	}
	.shop-name {
		font-size: .18rem;
		color: #000;
		font-weight: bold;
	}
	.shop-discount > span {
		color: #FF6E15;
		padding: .02rem .05rem;
		border: 1px solid #FF6E15;
		font-size: .09rem;
		margin-left: .05rem;
	}
	.pay-content {
		padding: .1rem 0;
	}
	.pay-con-detail {
		/*height: .6rem;*/
		padding: .05rem .1rem;
		border: 1px solid #FF6E15;
		border-radius: 4px;
	}
	.pay-footer .mint-cell-title{
		font-size: .15rem;
		color: #777;
	}
	.pay-footer .mint-cell-value {
		color: #333;
	}
	.pay-footer .pay-foot-discount {
		 background: #FF6F15;
		 padding: .05rem .1rem;
		 font-size: .14rem;
		 border-radius: 5px;
	}
	.pay-footer .mint-cell {
		background-image: linear-gradient(0deg,#EEE,#EEE 50%,transparent 0);
		background-size: 100% 1px;
        background-repeat: no-repeat;
        background-position: bottom;
	}
	.pay-current .mint-cell {
		background-image: none;
	}
	.pay-current .mint-cell .mint-cell-wrapper {
		font-size: .18rem;
	}
	.pay-current .mint-cell .mint-cell-value {
		color: #333;
	}
	.pay-body .pay-sure {
		margin-top: .5rem;
		background: linear-gradient(90deg,#ff6e15,#ffb911);
		background: -webkit-linear-gradient(left, #ff6e15, #ffb911);
		box-shadow: 0.014rem 0.014rem 0.14rem rgba(233,91,5,0.3);
		width: 2.3rem;
		height: .4rem;
		color: #fff;
	}

	/*代金券内容*/
	.popup {
		width: 100%;
		height: 100%;
		background: #F9F9F9;
	}
	.popup .mint-header {
		background: #ff6e15;
	}
	.popup .popup-container {
		margin-top: 40px;
		height: 100%;
		overflow: auto;
	}
	.popup-container > ul {
		padding-bottom: .4rem;
	}
	.popup-container > ul > li {
		margin-bottom: .14rem;
		box-shadow: 0 0.045rem 0.12rem rgba(255,110,21,.26);
	}
	
	.voucher-above {
		padding: .2rem;
		background: -webkit-linear-gradient(left, #FFB911, #FF6E15);
		border-radius: 5px 5px 0 0;
	}
	.voucher-above .above-title {
		font-size: .18rem;
	}
	.voucher-middle {
		height: 5px;
		background: url('../../images/pic_xiaojuchi@2x.png');
		background-size:30px 5px;
		margin-top: -5px;
	}
	.voucher-below {
		padding: .1rem .2rem;
		background: #fff;
		border-radius:  0 0 5px 5px;
		color: #777;
	}
	.pay-con-detail .input-box .content .input {
		font-size: .4rem;
	}
</style>
<script>
	// import api from '@/config/api';
	// import voucher from '@/components/voucher.vue';
	import keyword from '@/components/keyword/KeyboardInput.vue';
	import fetch from '@/config/fetch.js';
	import { payType, WeixinPay, AliPay, AliFromPay } from '@/assets/js/Pay.js';
	import {canUserMoneyOff, calculateRandomCut, canUserVoucherList, calculateServerMoney, calculateIntegral} from '@/assets/js/ActiveCalculcate.js';
	export default {
		components: {
			keyword
		},
		data() {
			return {
				// 代金券显示状态
				popupVisible: false,
				//输入金额
				money: '',
				//实付金额
				surePayMoney: 0,
				//服务费用
				serverMoney: 0,
				// 虚拟键盘确认支付按钮
				isClick: true,
				//页面确认支付按钮
				sureBtn: false,
				voucherListDate: [],
				//处理过后代金券列表
				voucherList: {},
				//原始代金券列表
				//可用代金券数量
				// userfulVocherCount: 0,
				//选择代金券的金额
				
				// 店铺详情
				shopInfo: {},
				//满减集合
				moneyOffGather: {},
				//选择代金券
				choseVocher: {},
				//适合使用的满减活动
				moneyOff: {},
				//积分
				integral: {
					all: 0,
					//积分抵扣
					discount: 0
				},
				afterDataVO: {},
				errorShopInfo: false,
				// 是否显示实付
				isShowSureMoney: false,
				//随机减
				randomCut: 0,
				//随机减原价
				randomCutOrigin: 0,
				params: {
					bizId: this.$route.query.bizId || '',
					merNo: this.$route.query.merNo || ''
				}
			}
		},
		computed: {
			
		},
		watch: {
			money(currenValue) {
				//监听能够使用的代金券;
				this.voucherList = canUserVoucherList(currenValue, this.voucherListDate, this.shopInfo);
				// this.canUserVoucherList(this.voucherList, currenValue);
				//监听适合的满减
				// this.canUserMoneyOff(currenValue);
				this.moneyOff = canUserMoneyOff(currenValue, this.moneyOffGather['activitys'])
				//实付金额
				this.surePayMoneyHandle(currenValue);
			}
		},
		mounted() {
			this.getShopDetail();
		},
		methods:{

			// 清除cookies
		    // clearCookie() {
		    //     alert('已清除缓存');
		    //     Tools.clearCookies('zx_token');
		    // },
			//显示或者隐藏代金券
			showHidePopup(type) {
				this.popupVisible = !this.popupVisible
			},
			//虚拟键盘显示或隐藏后的回调
			showKeyboard(val) {
				this.sureBtn = !val;
			},
			//确认支付
			surePay() {
				let bizId = this.shopInfo['bizId'],
					// 输入金额
					originalCost = this.money,
					//实付
					actualCost = this.surePayMoney,
					//积分
					deductedCost = this.integral['discount'],
					// 随机减
					randomCut = this.randomCut,
					//代金券减免
					choseVocherDiscount = this.choseVocher['discount'] || 0,
					shareGiftsId = this.choseVocher['shareGiftsId'] || '',
					receiveId = this.choseVocher['receiveId'] || '',
					//满减 + 代金券 
					discount = (this.moneyOff['discount'] + choseVocherDiscount + randomCut).toFixed(2),

					activityBelong = this.moneyOffGather['activityBelong'] || '',
					activityId = this.moneyOff['activityId'] || '',
					//1表示微信, 2表示支付宝, 0表示余额
					paymentMode = payType == 'WeiXin' ? 1 :  2,
					// paymentMode = 0,
					orderSource = payType == 'WeiXin' ? 1 :  2,
					// 清风费
					qffFee = this.serverMoney;
				if(this.money <= 0 || this.money == '') {
					this.$toast('请输入金额')
					return;
				}
				this.isClick = false;
				fetch.fetchPost('/order/v3.2/shortcutSubmit', {
					bizId,
					originalCost,
					actualCost,
					deductedCost,
					discount,
					activityBelong,
					activityId,
					paymentMode,
					randomCut,
					orderSource,
					shareGiftsId,
					receiveId,
					qffFee,
				})
				.then(res => {
					this.afterDataVO = res.data.afterDataVO;
					if(res.data.orderStatus == 6) {
						this.paySuccess();
					} 
					else if(res.data.orderStatus == 1) {
						if(payType == 'WeiXin') {
							// this.weixinPay(res.data.retMap);
							WeixinPay(res.data.retMap, res => {
								if(res == 'success') {
									this.paySuccess();
								} else {
									this.isClick = true;
								}
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
				              this.Alipay(res.data.tradeNo)
				            }
						}
					}
				}).catch(res => {
					this.isClick = true;
				})
			},
			//支付宝支付
		    Alipay(tradeNO) {
		       AlipayJSBridge.call("tradePay", {
		            tradeNO: tradeNO
		       },  (data) => {
		           if ("9000" == data.resultCode) {
		               this.paySuccess();
		           } else {
		           	   // callback('error')
		               this.isClick = true;
		           }
		       });
		    },
			//支付成功后跳转
		    paySuccess() {
		          this.$router.push({
		            path: '/paysuccess',
		            query: {
		              getIntegral: this.afterDataVO.getIntegral,
		              actualCost: this.afterDataVO.actualCost,
		              personalIntegral: this.afterDataVO.personalIntegral,
		              vouchersCount: this.afterDataVO.vouchersCount
		            }
		          });
		    },
			//计算实付金额
			surePayMoneyHandle(currenValue) {
				// let moneyOffDiscount = 0;
				//随机减
				// 使用满减
				// if(!this.moneyOff.discount) {
				// 	// moneyOffDiscount = this.moneyOff.discount;
				// 	this.moneyOff.discount = 0;
				// }
				// 使用满减
				this.surePayMoney = currenValue - this.moneyOff.discount;

				// 随机减
				// if(this.surePayMoney < this.randomCutOrigin) {
				// 	this.randomCut = this.surePayMoney;
				// 	this.surePayMoney = 0;
				// } else {
				// 	this.randomCut = this.randomCutOrigin;
				// 	this.surePayMoney -= this.randomCutOrigin;
				// }
				// 随机减
				let randomObj = calculateRandomCut(this.surePayMoney, this.randomCutOrigin);
				this.surePayMoney = randomObj['surePayMoney'];
				this.randomCut = randomObj['random'];

				// 使用代金券
				if(this.choseVocher['isUserful'] == 1) {
					if(this.surePayMoney < this.choseVocher['discount']) {
						this.$toast('实付金额小于代金券金额,无法使用该代金券!');
						this.choseVocher = {};
					} else {
						this.surePayMoney -= this.choseVocher['discount'];
					}
				} 
				// else {
				// 	this.choseVocher['discount'] = 0;
				// }

				// 使用积分
				// if(this.integral['all'] > 0 && this.surePayMoney > 0) {
				// 	if(this.surePayMoney >= this.integral['all']) {
				// 		this.surePayMoney -= this.integral['all'];
				// 		this.integral['discount'] = this.integral['all'];
				// 	} 
				// 	else {
				// 		this.integral['discount'] = this.surePayMoney;
				// 		this.surePayMoney = 0;
				// 	}
				// }
				// 
				// 使用积分
				let IntegralObj = calculateIntegral(this.integral['all'], this.surePayMoney);
				this.integral['discount'] = IntegralObj['intergralDiscount'];
				this.surePayMoney = IntegralObj['surePayMoney'];

				if(currenValue == '') {
					this.integral['discount'] = 0;
				}

				if(this.surePayMoney <= 0) {
					this.surePayMoney = 0;
				} 


				//收取服务费
				// this.calculateServerMoney();
				this.serverMoney = calculateServerMoney(this.integral['discount'], this.choseVocher['discount'], this.shopInfo);

				this.surePayMoney = (this.surePayMoney + parseFloat(this.serverMoney)).toFixed(2);

				this.isShowSureMoney = parseFloat(this.surePayMoney) != parseFloat(this.money) && this.money;
			},
			//计算清风费
			// calculateServerMoney() {
			// 	let serverMoney = this.integral['discount'] + this.choseVocher['discount'];
			// 	if(this.shopInfo['serviceFeeObject'] == 0 && serverMoney >= this.shopInfo['standardFee']) {
			// 		if(this.shopInfo['marketType'] == 0) {
			// 			this.serverMoney = parseFloat(this.shopInfo['serviceRate']);
			// 		} 
			// 		else if(this.shopInfo['marketType'] == 1) {
			// 			this.serverMoney = (parseFloat(this.shopInfo['serviceRate']) * serverMoney).toFixed(2);
			// 		}
			// 	} else {
			// 		this.serverMoney = 0;
			// 	}
			// },
			//选择使用代金券
			choseVocherEevnt(type, info) {
				if(type == 1) {
					this.choseVocher = {};
					this.showHidePopup();
				} else {
					if(info['isUserful'] == 1) {
						this.choseVocher = info;
						this.showHidePopup();
					} 
				}
				this.surePayMoneyHandle(this.money);
			},
			//商店优惠活动
			shopDiscounts() {
				let discountList = this.shopInfo['activitysVO'];
				for(let item of discountList) {
					// 满减
					if(item.activityType == 0) {
						this.moneyOffGather = item;
					}
				}
			},

			// 监听适合的满减活动
			// canUserMoneyOff(currentMoney) {
			// 	this.moneyOff = {};
			// 	if(this.moneyOffGather['activitys']) {
			// 		for(let item of this.moneyOffGather['activitys']) {
			// 			if(currentMoney >= item.fullMoney ) {
			// 				if(this.moneyOff.discount) {
			// 					if(this.moneyOff.discount < item.discount) {
			// 						this.moneyOff = item;
			// 					}
			// 				}else{
			// 					this.moneyOff = item;
			// 				}
			// 			}
			// 		}
			// 	}
			// },
			// 监听适合能用的代金券
			// canUserVoucherList(list, currentMoney) {
			// 	for(let item of list) {
			// 		if(currentMoney >= item.fullMoney) {
			// 			//等级为5, 店铺别代金券
			// 			if(item.activityLevel == 5) {
			// 				for(let info of item['districtCodeVOs']) {
			// 					if(this.shopInfo['bizId'] == info['districtCode']) {
			// 						item['isUserful'] = 1;
			// 						break;
			// 					}
			// 				}	
			// 			} 
			// 			//等级为0, 全平台别代金券
			// 			else if(item.activityLevel == 0) {
			// 				item['isUserful'] = 1;
			// 			}
			// 			//等级为4, 商家级别代金券
			// 			else if(item.activityLevel == 4) {
			// 				for(let info of item['districtCodeVOs']) {
			// 					if(info['districtCode'] == this.shopInfo['businessCode']) {
			// 						item['isUserful'] = 1;
			// 						break;
			// 					}
			// 				}
			// 			}
			// 		} 
			// 		else {
			// 			item['isUserful'] = 0;
			// 		}
					
			// 	}
			// 	this.searchVocherLength(list);
			// },
			// 监听能用代金券数量
			// searchVocherLength(list) {
			// 	let count = 0,
			// 		arr = [];
			// 	for(let item of list) {
			// 		if(item['isUserful'] == 1) {
			// 			count++;
			// 			arr.unshift(item);
			// 		} else {
			// 			arr.push(item)
			// 		}
			// 	};
			// 	this.choseVocher = {};
			// 	this.userfulVocherCount = count;
			// 	this.voucherList = arr;
			// },
			//获取店铺信息
			getShopDetail() {
				
				fetch.fetchPost('/order/ShopDetails', this.params).then(res => {
					this.shopInfo = res.data;
					this.integral['all'] = this.shopInfo['personalIntegralMoney'];

					this.getVoucherList();
					// 处理商店优惠活动
					this.shopDiscounts();
					
				}).catch(res => {
					//无该店铺信息
			        if(res == 1) {
			           this.errorShopInfo = true;
			        }
			        //token不合法
			        if(res == 2) {
			        	Tools.clearCookies('zx_token');
			        	// location.reload(); 
			        }
				})
			},
			//获取代金券
			getVoucherList() {
				fetch.fetchPost('/personal/voucherList', {
					pageNo: 1,
					canUse: true
				}).then(res => {
					this.voucherListDate = res.data.lists;
					this.getRanDomSub();
				}).catch(res => {

				})
			},
			//随机减
			getRanDomSub() {
				fetch.fetchPost('/order/v3.2/randomSub', this.params).
				then(res => {
					// this.randomCut = res.data;
					this.randomCutOrigin = res.data;
				})
			},
		}
	}
</script>