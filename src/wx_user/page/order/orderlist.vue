<template>
	<div class="bg-white">
		<div class="order-list-wrap" 
		infinite-scroll-disabled="loadding" 
		infinite-scroll-distance="100"
		v-infinite-scroll="loadMore">
			<li class="p-ten" v-for="item in list">
				<div @click="toLink(item, 'detail')">
					<div class="flex-box justify-s-b">
						<div class="flex-box">
							<p class="order-img" :style="'background-image: url(' + item['shopLogo'] + ');'"></p>
							<div class="p-l-ten order-shop-wrap">
								<p class="color-3 font-b order-shop-name text_over">{{item.shopName}}</p>
								<p class="color-9 order-time">{{item.orderTime}}</p>
							</div>
						</div>
						<p class="color-7 font-12">{{orderStatus[item.orderStatus]}}</p>
					</div>
					<div class="menu-detial order-detail font-12 color-7" v-if="item['takeawayParam']">
						<div class="flex-box justify-s-b p-t-ten" v-for="info in item['takeawayParam']">
							<p>{{info.goodsName}}</p>
							<p>x{{info.goodsNum}}</p>
						</div>
					</div>
					<div class="order-detail font-12 flex-box justify-s-b">
						<p class="color-7">
							<span class="p-r-ten">
								<span>订单金额</span>
								<span class="color-3">¥{{item.originalCost}}</span>
							 
							</span>
						</p>
						<p>
							<span class="color-3">实付<span class="color-main">¥{{item.actualCost}}</span></span>
						</p>
					</div>
				</div>
				<div class="p-t-ten flex-box order-button" v-if="item['takeawayParam']">
					<mt-button class="color-3 bg-white" type="default" size="small" @click="toLink(item, 'again')">再来一单</mt-button>
					<mt-button class="m-l-ten white-f" type="default" size="small">评价</mt-button>
				</div>
			</li>
			<!-- <li class="p-ten">
				<div class="flex-box justify-s-b">
					<div class="flex-box">
						<p class="order-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526570532027&di=8485617bbcc3a8f218914dd8f3d5f974&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F06%2F08%2FFtbZdwHl59eyzTMnG-5AFNiOCsVp.jpg);"></p>
						<div class="p-l-ten order-shop-wrap">
							<p class="color-3 font-b order-shop-name text_over">真功夫(深圳蔡屋围店)</p>
							<p class="color-9 order-time">2017/09/25 17:09</p>
						</div>
					</div>
					<p class="color-7 font-12">订单已取消</p>
				</div>
				<div class="menu-detial order-detail font-12 color-7">
					<div class="flex-box justify-s-b p-t-ten">
						<p>小锅焖面</p>
						<p>x1</p>
					</div>
					<div class="flex-box justify-s-b p-t-ten">
						<p>小锅焖面</p>
						<p>x1</p>
					</div>
				</div>
				<div class="order-detail font-12 flex-box justify-s-b">
					<p class="color-7">
						<span>
							<span>订单金额</span>
							<span class="color-3">¥120</span>
						 
						</span>
						<span>获得积分<span class="color-main">20</span></span>
					</p>
					<p>
						<span class="color-3">实付¥100</span>
					</p>
				</div>
				<div class="p-t-ten flex-box order-button">
					<mt-button class="color-3 bg-white" type="default" size="small">再来一单</mt-button>
					<mt-button class="m-l-ten white-f" type="default" size="small">评价</mt-button>
				</div>
			</li>
			<li class="p-ten">
				<div class="flex-box justify-s-b">
					<div class="flex-box">
						<p class="order-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526569576213&di=42fe9f2f2f9e57ab3e01d780311654ed&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F02%2F05%2FFvkmRKS-753ixEvKG7eE9axWYrXZ.jpg);"></p>
						<div class="p-l-ten order-shop-wrap">
							<p class="color-3 font-b order-shop-name text_over">真功夫(深圳蔡屋围店)</p>
							<p class="color-9 order-time">2017/09/25 17:09</p>
						</div>
					</div>
					<p class="color-7 font-12">订单已取消</p>
				</div>
				<div class="order-detail font-12 flex-box justify-s-b">
					<p class="color-7">
						<span>
							<span>订单金额</span>
							<span class="color-3">¥120</span>
						 
						</span>
						<span>获得积分<span class="color-main">20</span></span>
					</p>
					<p>
						<span class="color-3">实付¥100</span>
					</p>
				</div>
			</li>
			<li class="p-ten">
				<div class="flex-box justify-s-b">
					<div class="flex-box">
						<p class="order-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526570532027&di=8485617bbcc3a8f218914dd8f3d5f974&imgtype=0&src=http%3A%2F%2Fimgqn.koudaitong.com%2Fupload_files%2F2015%2F06%2F08%2FFtbZdwHl59eyzTMnG-5AFNiOCsVp.jpg);"></p>
						<div class="p-l-ten order-shop-wrap">
							<p class="color-3 font-b order-shop-name text_over">真功夫(深圳蔡屋围店)</p>
							<p class="color-9 order-time">2017/09/25 17:09</p>
						</div>
					</div>
					<p class="color-7 font-12">订单已取消</p>
				</div>
				<div class="menu-detial order-detail font-12 color-7">
					<div class="flex-box justify-s-b p-t-ten">
						<p>小锅焖面</p>
						<p>x1</p>
					</div>
					<div class="flex-box justify-s-b p-t-ten">
						<p>小锅焖面</p>
						<p>x1</p>
					</div>
				</div>
				<div class="order-detail font-12 flex-box justify-s-b">
					<p class="color-7">
						<span>
							<span>订单金额</span>
							<span class="color-3">¥120</span>
						 
						</span>
						<span>获得积分<span class="color-main">20</span></span>
					</p>
					<p>
						<span class="color-3">实付¥100</span>
					</p>
				</div>
				<div class="p-t-ten flex-box order-button">
					<mt-button class="color-3 bg-white" type="default" size="small">再来一单</mt-button>
					<mt-button class="m-l-ten white-f" type="default" size="small">评价</mt-button>
				</div>
			</li> -->
		</div>
		<div class="text-center font-15 p-ten" v-show="list.length == 0">
	      ----暂无数据----
	    </div>
	</div>
</template>
<style scoped lang="scss">
	@import "../../style/mixin";
	.order-list-wrap {
		padding-bottom: .6rem;
		.order-button {
			justify-content: flex-end;
			button {
				width: 80px;
			}
			button:last-child {
				background: $mainColor;
			}
		}
		.menu-detial.order-detail {
			padding: .1rem 0 0 .46rem;
		}
		.order-detail {
			padding: .2rem 0 0 .46rem;
		}
		.order-shop-wrap {
			width: 2rem;
		}
		.order-shop-name {
			font-size: .18rem;
		}
		.order-img {
			width: .36rem;
			height: .36rem;
			background-size: cover;
		}
		.order-time {
			font-size: .1rem;
		}
	}
	.order-list-wrap > li {
		border-bottom: 1px solid #eee;
	}
</style>
<script>
	import fetch from '@/config/fetch.js';
	export default {
		data() {
			return {
				params: {
					pageNo: 1
				},
				list: [],
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
					0: '订单已取消'

				},
				positionInfo: Tools.getLocalStorage('positionInfo'),
				loadding: true
			}
		},
		mounted() {
			this.getPersonalList();
		},
		methods: {
			loadMore() {
				this.loadding = true;
				this.params['pageNo']++;
				this.getPersonalList();
			},
			//跳转
			toLink(info, option) {
				if(info['orderType'] == 1) {
					this.$router.push({
						path: '/orderdetail',
						query: { orderId: info['orderId'] }
					})
				} else if(info['orderType'] == 2) {
					if(option == 'again') {
						this.$router.push({
							path: '/takeout/takeOutShop',
							query: {
								shopAuthenticateId: info['shopAuthenticateId'],
								longitude: this.positionInfo['longitude'],
								latitude: this.positionInfo['latitude']
							}
						})
					} else if(option == 'detail') {
						this.$router.push({
							path: '/takeoutDetail',
							query: { orderId: info['orderId'] }
						})
					}
				}
			},
			getPersonalList() {
				fetch.fetchPost('/personal/v3.2/orderList', this.params).then(res => {
					this.list = this.list.concat(res.data);
					this.loadding = false;
				})
			}
		}
	}
</script>