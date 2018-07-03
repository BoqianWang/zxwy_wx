<template>
	<div class="pay-success bg-white">
		<div class="pay-container p-l-ten p-r-ten">
			<div class="pay-title text-center">
				<img src="../../images/paySuccess/icon_txcg@2x.png" alt="">
				<p class="font-15 color-main">支付成功</p>
			</div>
			<div class="text-center">
				<p>
					<span class="font-12">¥</span>
					<span class="color-3" style="font-size: .4rem;">{{ params.originalCost }}</span>
				</p>
				<p class="font-12 color-7" v-if="params.actualCost != params.originalCost">
					实付金额 {{ params.actualCost }}
				</p>
			</div>
			<div class="pay-line text-center color-9 rel">
				<span class="p-l-ten p-r-ten bg-white font-12">本次消费获得</span>
			</div>
			<div class="repacket-wrap p-t-ten">
					<div class="img-wrap p-t-ten rel" v-if="redPacketMoney">
						<p class="get-redpacket abs width-100 text-center font-15 color-3">
							获得<span class="font-b" style="color: #D53125;">{{ redPacketMoney }}元</span>外卖红包
						</p>
						<router-link  to="/redPacket">
							<img src="../../images/paySuccess/redpacket.jpg" width="100%;">
						</router-link>
					</div>
			</div>
			<div class="text-center font-15">
				<p class="p-t-five" v-if="params.getIntegral > 0">
					<router-link to="/points" class="color-3">
						本次消费您获得{{params.getIntegral}}积分
					</router-link>
				</p>
				<p class="p-t-five" v-if="params.vouchersCount > 0">
					<router-link to="/youhui" class="color-3">
						获得{{ params.vouchersCount }}张商户代金券【查看】
					</router-link>
				</p>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.p-t-five {
		padding-top: 0.05rem;
	}
	.pay-success {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.pay-container > .pay-title {
		padding-top: .4rem;
	}
	.pay-container > .pay-title > img {
		width: .7rem;
		height: .7rem;
	}
	.pay-container > .pay-line {
		margin-top: .3rem;
	}
	.pay-container > .pay-line:after {
		content: "";
		position: absolute;
		width: 100%;
		height: 1px;
		background: #eee;
		z-index: -1;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.repacket-wrap .img-wrap {
		width: 2.2rem;
		margin: 0 auto;
	}
	.repacket-wrap .get-redpacket {
		top: .7rem;
	}
</style>
<script>
	import fetch from '@/config/fetch.js';
	export default {
		data() {
			return {
				params: {
					getIntegral: this.$route.query.getIntegral,
					personalIntegral: this.$route.query.personalIntegral,
					vouchersCount: this.$route.query.vouchersCount,
					actualCost:  Tools.ToCurrency(this.$route.query.actualCost).toFixed(2),
					originalCost: Tools.ToCurrency(this.$route.query.originalCost).toFixed(2)
				},
				uselist:[],
			    bizId: this.$route.query.bizId || '',
			    redPacketMoney: 0
			}
		},
		mounted() {
			this.getRedPacket();
		},
		methods: {
			getRedPacket() {
		  		fetch.fetchPost('/personal/v3.3/reveivePlatVouchers', {
		  			bizId: this.bizId,
		  			conditions: 0
		  		}).then(res => {
		  			if(res.code == 0) {
		  				this.getRadPacketList();
		  			}
		  		}).catch(res => {

		  		})
		  	},
		  	//获取红包列表
		  	getRadPacketList() {
		  		fetch.fetchPost('/personal/v3.3/shopAvailableVoucherList', {}).then(res => {
		  			this.uselist = res.data.lists;
		  			for(let item of this.uselist) {
		  				this.redPacketMoney += item['discount'];
		  			}
		  		}).catch(res => {

		  		})
		  	}
		}
	}
</script>