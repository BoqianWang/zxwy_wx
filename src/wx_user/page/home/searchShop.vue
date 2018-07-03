<template>
	<div class="search-shop">
		<div class="search-shop-title p-ten flex-box bg-white">
			<div class="flex-1 bg-F9F9F9 p-l-ten align-center flex-box">
				<span class="iconfont icon-search font-b"></span>
				<input class="p-l-ten width-100" type="search" v-model="params['keyword']" @keyup.enter="toSearch" placeholder="请输入搜索名称">
			</div>
			<button class="p-l-ten p-r-ten search-btn bg-white color-main font-15" type="button" @click="toSearch">搜索</button>
		</div>
		
		<div class="searh-container">
			<div class="history font-15 m-b-ten" v-if="historyShopInfo.length > 0">
				<p class="color-7 p-b-ten p-l-ten">历史记录</p>
				<div class="bg-white p-l-ten p-r-ten p-t-ten history-wrap clearfix">
					<span class="color-7 m-r-ten m-b-ten" v-for="item in historyShopInfo" @click="toLink(item)">{{item.shopName}}</span>
				</div>
			</div>
			<shopList :biz-list="shopListData" @load-more="loadMore" @shop-info="setShopInfo" ref="shopList"></shopList>
		</div>
	</div>
</template>
<style scoped>
	.history .history-wrap span{
		float: left;
		border: 1px solid #b3b3b3;
		padding: .05rem .1rem;
		border-radius: 4px;
	}

	.bg-F9F9F9 {
		background: #F9F9F9;
	}
	.search-shop-title {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 1;
		border-bottom: 1px solid #eee;
	}
	.search-shop-title > div {
		height: .34rem;
	}
	.search-shop-title > div > input {
		background: none;
	}
	.search-shop {
		padding-bottom: .6rem;
	}
	.searh-container {
		padding-top: .66rem;
	}
</style>
<script>
	import fetch from '@/config/fetch.js';
	import shopList from '@/wx_user/page/home/children/shopList.vue';
	export default {
		components: {
			shopList
		},
		data() {
			return {
				params: {
					keyword: '',
					pageNo: 1,
					pageSize: 20,
					longitude: Tools.getLocalStorage('positionInfo')['longitude'],
					latitude: Tools.getLocalStorage('positionInfo')['latitude']
				},
				shopList: [],
				historyShopInfo: Tools.getLocalStorage('historyShopInfo') || [],
				shopListData: {}
			}
		},
		mounted() {
			this.getIndustryList();
		},
		methods: {
			//跳转链接
			toLink(info) {
				this.$refs.shopList.toLink('shop', info);
			},
			//保存地址信息
			setShopInfo(info) {
				if(!this.historyShopInfo.includes(info)) {
					this.historyShopInfo.unshift(info);
				}
				if(this.historyShopInfo.length > 5) {
					this.historyShopInfo.pop();
				}
				Tools.setLocalStorage('historyShopInfo', this.historyShopInfo);

			},
			getIndustryList() {
				let type = this.$route.query.industryType
				if(!isNaN(type)) {
					let params = {
						industryType: type,
						longitude: this.params['longitude'],
						latitude: this.params['latitude'],
						pageNo: this.params['pageNo']
					};
					fetch.fetchPost('/index/v3.2/shopListByIndustry', params).then(res => {
						this.shopList = this.shopList.concat(res.data['bizList']);
						this.$set(this.shopListData, 'shopList', this.shopList);
						this.$set(this.shopListData, 'page', {
							pageNo: res.data.pageNo,
							totalPage: res.data.totalPage
						})
						this.$refs.shopList.canLoadMore();
					}).catch(res => {

					})
				}
			},
			toSearch() {
				this.shopList = [];
				this.params['pageNo'] = 1;
				this.getShopList();
			},
			loadMore(info) {
				this.params['pageNo'] = info;
				if(this.params['keyword']) {
					this.getShopList();
				} else {
					this.getIndustryList();
				}
			},
			getShopList() {
				fetch.fetchPost('/index/v3.2/searchShop', this.params).then(res => {
					this.shopList = this.shopList.concat(res.data['shopList']);
					this.$set(this.shopListData, 'shopList', this.shopList);
					this.$set(this.shopListData, 'page', {
						pageNo: res.data.pageNo,
						totalPage: res.data.totalPage
					})
					this.$refs.shopList.canLoadMore();
				}).catch(res => {

				})
			}
		}
	}
</script>