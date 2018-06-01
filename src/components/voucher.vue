<template>
	<div>
		<mt-popup class="popup" v-model="popupVisible" position="right" :modal="false">
			<mt-header fixed title="选择代金券" style="height: 44px;">
	          <div slot='left' @click="showHidePopup(popupVisible)">
	          	<mt-button icon="back"></mt-button>
	          </div>
	          <div slot='right' @click="choseVocherEevnt(1)">暂不使用</div>
	        </mt-header>
	        <div class="popup-container p-ten">
		        <ul>
		        	<li v-for="info in computedVoucherList" @click="choseVocherEevnt(2, info)">
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
	</div>
</template>
<style scoped>
	.popup {
		width: 100%;
		height: 100%;
		background: #F9F9F9;
		/*overflow: auto;*/
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
		background: url('../wx_user/images/pic_xiaojuchi@2x.png');
		background-size:30px 5px;
		margin-top: -5px;
	}
	.voucher-below {
		padding: .1rem .2rem;
		background: #fff;
		border-radius:  0 0 5px 5px;
		color: #777;
	}
</style>
<script>
	/**
	 * 代金券组件
	 * <vuecher :voucher-list="data" :shop-info="data" :current-money="data"></vuecher>
	 */
	export default {
		props: {
			voucherList: {
				default: () => {
					return [];
				}
			},
			shopInfo: {
				default: () => {
					return {};
				}
			},
			currentMoney: {
				default: () => {
					return 0
				}
			}
		},
		data() {
			return {
				popupVisible: false,
				// shopCartDetail: this.$store.getters.shopCartDetail
			}
		},
		computed: {
			computedVoucherList() {
				let voucherList = this.canUserVoucherList(this.voucherList, this.currentMoney),
					arrList = voucherList['list'];
				this.$emit('voucherCount', voucherList['count']);
				return arrList;
			},
			// listData() {
			// 	return this.canUserVoucherList(this.computedVoucherList, this.currentMoney);
			// }
		},
		mounted() {
			
		},
		methods: {
			//显示隐藏
			showHidePopup() {
				this.popupVisible = !this.popupVisible;
			},
			//选择代金券
			choseVocherEevnt(type, info) {
				if(type == 1) {
					this.$emit('choseVocher', {});
				} else if(type == 2) {
					this.$emit('choseVocher', info);
				}

				this.showHidePopup();
			},
			canUserVoucherList(list, currentMoney) {
				let arr = [],
					count = 0;
				for(let item of list) {
					if(currentMoney >= item.fullMoney) {
						//等级为5, 店铺别代金券
						if(item.activityLevel == 5) {
							for(let info of item['districtCodeVOs']) {
								if(this.shopInfo['bizId'] == info['districtCode']) {
									item['isUserful'] = 1;
									break;
								}
							}	
						// if(this.shopInfo['bizId'] == item['districtCodeVOs'][0]['districtCode']) {
						// 	item['isUserful'] = 1;
						}  
						//等级为0, 全平台别代金券
						else if(item.activityLevel == 0) {
							item['isUserful'] = 1;
						}
						//等级为4, 商家级别代金券
						else if(item.activityLevel == 4) {
							for(let info of item['districtCodeVOs']) {
								if(info['districtCode'] == this.shopInfo['businessCode']) {
									item['isUserful'] = 1;
									break;
								}
							}
						}
						
					} else {
						item['isUserful'] = 0;
					}
					if(item['isUserful'] == 1) {
						count++;
						arr.unshift(item)
					} else {
						arr.push(item);
					}
				}
				return {
					count: count,
					list: arr
				};
			}
		}
	}
</script>