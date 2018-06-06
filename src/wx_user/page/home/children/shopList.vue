<template>
	<div class="home-shop-list" 
			infinite-scroll-disabled="loadding" 
			infinite-scroll-distance="100"
			v-infinite-scroll="loadMore">
				<div class="shop-list-block flex-box p-ten bg-white" v-for="item in list['shopList']">
					<div class="block-list-img" :style="'background-image: url(' + item.shopLogo + ');'"></div>
					<div class="p-l-ten flex-1">
						<div @click="toLink('shop', item)">
							<p>
								<span class="font-18 color-3">{{item.shopName}}</span>
								<span class="tips tips-takeout" v-if="item.isWm == 1"></span>
							</p>
							<p class="color-3 font-12 flex-box justify-s-b block-list-order">
								<span>
								 	 <span>月售{{item.monthSaleCount}}单</span>
								</span>	
							 	 <span class="color-7">
							 	 	<span v-if="item.isWm == 1"></span> 
							 	    {{item.distance}}
							    </span>
							 </p>
							 <p class="color-3 font-12 block-list-desc">
							 	<span>{{item.businessName}}</span>
							 	<span v-if="item.isWm == 1">起送¥{{item.startSendFee}}</span>
							 	<span v-if="item.isWm == 1">配送¥{{item.expressFee}}</span>
							 </p>
						</div>
						 <div class="color-3 font-12 block-list-active rel" 
						 :class="{'click-item': item['showActive']}" 
						 @click="showItemActive(item)"
						  v-if="item['activitysVO'].length > 0">
						 	<p 
						 		class="abs l-a-icon flex-box align-center p-ten"
						 		:class="{'icon-sanjiaoxing-up': item['showActive']}">
						 	    <span class="iconfont icon-sanjiaoxing-down"></span>
						 	    <span>{{item['activitysVO'].length}}个活动</span>
						 	</p>
							 <li v-for="info in item['activitysVO']">
								 <p class="flex-box align-center" v-if="info['activityType'] == 0" v-for="item in info['activitys']">
								 	<span class="tips tips-sub"></span>{{item['activityDescription']}}
								 </p>
								 <p class="flex-box align-center" v-if="info['activityType'] >= 8" v-for="item in info['activitys']">
								 	<span class="tips tips-ticket"></span>{{item['activityDescription']}}
								 </p>
							 </li>

						 </div>
					</div>
				</div>
				<div v-show="tips" class="font-15 color-3 text-center p-t-ten">{{tips}}</div>
			</div>
</template>
<style lang="scss">
	.block-list-order {
		padding: .02rem 0;
	}
	.block-list-active {
		transition: height .2 linear;
		height: .24rem;
		overflow: hidden;
	}
	.block-list-active p {
		padding-top: .05rem;
		padding-bottom: .08rem;
	}
	.block-list-desc span + span:before {
		content: "|";
		padding: 0 .1rem;
	}
	.shop-list-block {
		.block-list-img {
			width: .58rem;
			height: .58rem;
			background-size: cover;
		}
	}
	.l-a-icon {
		right: 0;
		top: 0;
	}
	.block-list-active.click-item {
		height: auto;
	}
	.icon-sanjiaoxing-up .icon-sanjiaoxing-down {
		transform: rotate(180deg);
	}
	.icon-sanjiaoxing-down {
		transition: transform .2s linear;
	}
</style>
<script>
	/**
	 * 商品列表组件
	 * <shop-list :biz-list="..." @load-more="..."></shop-list>
	 */
	export default {
		props: {
			bizList: {
				default: () => {
					return {}
				}
			}
		},
		computed: {
			list() {
				let bizList = this.bizList;
				if(bizList['page']) {
					this.totalPage = bizList['page']['totalPage'];
					this.pageNo = bizList['page']['pageNo'];
				}
				return bizList;
			}
		},
		data() {
			return {
				loadding: true,
				totalPage: 1,
				pageNo: 1,
				loadding: true,
				tips: ''
			}
		},
		mounted() {

		},
		methods: {
			//点击跳转
			toLink(type, info) {
				switch(type) {
					case 'shop':
						if(info.isWm == 1) {
							// this.$router.push({
							// 	path: '/takeout/takeOutShop',
							// 	query: {
							// 		shopAuthenticateId: info['shopAuthenticateId']
							// 	}
							// })
							location.href = './index.html#/takeout/takeOutShop?shopAuthenticateId=' + info['shopAuthenticateId'];
						} else {
							this.$router.push({
								path: '/bizdetail',
								query: {
									bizId: info['bizId']
								}
							})
						}
					break;
				}

			},
			//显示或隐藏
			showItemActive(info) {
				if(info['showActive']) {
					this.$set(info, 'showActive', false)
				} else {
					this.$set(info, 'showActive', true)
				}
			},
			//允许下拉加载
			canLoadMore() {
				this.loadding = false;
			},

			//加载更多
			loadMore() {
				this.loadding = true;
				if(this.pageNo >= this.totalPage) {
					this.tips = '没有找到更多内容了~~';
					return;
				} else {
					this.tips = '';
				}
				this.pageNo++;
				this.$emit('load-more', this.pageNo);
			},
		},

	}
</script>