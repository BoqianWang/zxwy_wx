<template>
	<div class="search-shop">
		<div class="search-shop-title p-ten flex-box bg-white">
			<div class="flex-1 bg-F9F9F9 p-l-ten align-center flex-box">
				<span class="iconfont icon-search font-b"></span>
				<input autofocus="autofocus" class="p-l-ten width-100" type="search" v-model="params['keyword']" @keyup.enter="toSearch" placeholder="请输入搜索名称">
			</div>
			<button class="p-l-ten p-r-ten search-btn bg-white color-main font-15" type="button" @click="toSearch">搜索</button>
		</div>
		<div class="searh-container">
			<shopList :biz-list="shopListData" @load-more="loadMore" ref="shopList"></shopList>
		</div>
	</div>
</template>
<style scoped>
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
		padding-top: .76rem;
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
				shopListData: {}
			}
		},
		mounted() {

		},
		methods: {
			toSearch() {
				this.shopList = [];
				this.params['pageNo'] = 1;
				this.getShopList();
			},
			loadMore(info) {
				this.params['pageNo'] = info;
				this.getShopList();
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