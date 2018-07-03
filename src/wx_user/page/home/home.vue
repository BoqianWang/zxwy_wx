<template>
	<div class="bg-white home-wrap">
		<router-script src="https://webapi.amap.com/maps?v=1.4.6&key=e50ead2320592e7db5bb32cb484c180b" @load-finsh="AmapFinsh"></router-script>
		<!-- <router-script src="https://api.map.baidu.com/api?v=2.0&ak=kEAyTt64d9z6arhHfsop3yXK&s=1&callback=init" @load-finsh="AmapFinsh"></router-script> -->
		<div class="home-title rel">
			<!-- 轮播图 -->
			<mt-swipe class="swiper-wrap" :auto="3000">
			  <mt-swipe-item 
			  v-for="item in imgDate" 
			  :style="{backgroundImage: 'url(' + item.url + ')'}">
			  </mt-swipe-item>
			</mt-swipe>
			<!-- 地址 -->
			<div class="abs address-wrap flex-box justify-s-b white-f">
				<div class="a-wrap-input flex-box align-center" @click="toLink('location')">
					<span class="iconfont icon-map font-b"></span>
					<input readonly="readonly" class="white-f font-15 font-b flex-1 p-r-ten" type="text" :value="address">
					<!-- <input readonly="readonly" class="white-f font-15 font-b flex-1 p-r-ten" type="text" :value="'中民时代广场成功中民时代广场成功'"> -->
				</div>
				<div class="search-button p-l-ten flex-box align-center" @click="toLink('searchShop')">
					<span class="iconfont icon-search font-b"></span>
					<span class="font-12 font-b" style="padding-left: .05rem;">搜索商家</span>
				</div>
			</div>
		</div>
		<!-- 导航栏 -->
		<div class="home-nav p-ten clearfix font-12 color-3 text-center">
			<li class="p-ten" v-for="item in industryList" @click="toLink('industry', item)">
				<div class="nav-img-wrap">
					<img :src="item.industryUrl">
				</div>
				<p class="p-t-ten">{{item.industryName}}</p>
			</li>
			<!-- <li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_lrmf@2x.png">
				</div>
				<p class="p-t-ten">丽人美发</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_csbl@2x.png">
				</div>
				<p class="p-t-ten">超市便利</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_sxgs@2x.png">
				</div>
				<p class="p-t-ten">新鲜果蔬</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_mshb@2x.png">
				</div>
				<p class="p-t-ten">美食烘焙</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_xhlp@2x.png">
				</div>
				<p class="p-t-ten">鲜花礼品</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_yljk@2x.png">
				</div>
				<p class="p-t-ten">医药健康</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_vip@2x.png">
				</div>
				<p class="p-t-ten">VIP会员</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_jdyl@2x.png">
				</div>
				<p class="p-t-ten">进店有礼</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_jdyl@2x.png">
				</div>
				<p class="p-t-ten">分享有礼</p>
			</li>
			<li class="p-ten">
				<div class="nav-img-wrap">
					<img src="../../images/home/hom_fl_qt@2x.png">
				</div>
				<p class="p-t-ten">其他</p>
			</li> -->
		</div>
		<!-- 推荐 -->
		<div class="home-recommend font-15 flex-box align-center res p-b-ten p-t-ten">
			<img src="../../images/home/home_wntj_z@2x.png">
			<span class="p-l-ten p-r-ten color-3">附近商家</span>
			<img src="../../images/home/home_wntj_y@2x.png">
			<a href="##" class="recommed-more abs color-9 font-12"></a>
		</div>
		<div class="home-shop-wrap">
			<div class="font-12 color-7 shop-wrap-title">
				<span class="color-3">距离优先</span>
				<span>销量最高</span>
			</div>
			<!-- <div class="home-shop-list p-ten" 
			infinite-scroll-disabled="loadding" 
			infinite-scroll-distance="100"
			v-infinite-scroll="loadMore">
				<div class="shop-list-block flex-box p-t-ten p-b-ten" v-for="item in bizList">
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
						  v-if="item['activitysVO'].length > 0" 
						  @click="showItemActive(item)">
						 	<p class="abs l-a-icon flex-box align-center p-ten"
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
			</div> -->
			<shop-list :biz-list="shopListData" @load-more="loadMore" ref="shopList"></shop-list>
		</div>
	</div>
</template>
<style lang="scss">
	@import "../../style/mixin";
	.home-wrap {
		padding-bottom: .6rem;
	}
	
	.address-wrap > div {
		height: 30px;
		background: rgba(0, 0, 0, .4);
	}
	.address-wrap {
		width: 100%;
		left: 0;
		top: 0;
		padding: .05rem .1rem;
		.a-wrap-input {
			width: 2rem;
			border-radius: .4rem;
			.icon-map {
				padding: 0 .05rem;
			}
			input {
				width: 1.8rem;
				background: none;
			}
		}
		.search-button {
			width: 1.2rem;
			/*border-radius: 50%;*/
			border-radius: .4rem;
			/*line-height: 30px;*/
		}
	}
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
	.home-shop-wrap {
		
		.shop-wrap-title {
			span {
				padding: .05rem .1rem;
			}
		}
	}
	.home-recommend {
		img {
			width: .4rem;
		}
		justify-content: center;
		.recommed-more {
			right: .2rem;
		}
	}
	.home-nav img {
		width: 100%;
		height: 100%;
	}
	.home-nav {
		li {
			width: 20%;
			float: left;
			.nav-img-wrap {
				width: .5rem;
				height: .5rem;
				border-radius: 50%;
			}
		}
	}
	.home-nav li:nth-of-type(1) .nav-img-wrap {
		background: #FC7EA7;
	}
	.home-nav li:nth-of-type(2) .nav-img-wrap {
		background: #78B8FF;
	}
	.home-nav li:nth-of-type(3) .nav-img-wrap {
		background: #9BDE56;
	}
	.home-nav li:nth-of-type(4) .nav-img-wrap {
		background: #FFAF50;
	}
	.home-nav li:nth-of-type(5) .nav-img-wrap {
		background: #FA7070;
	}
	.home-nav li:nth-of-type(6) .nav-img-wrap {
		background: #63D5D5;
	}
	.home-nav li:nth-of-type(7) .nav-img-wrap {
		background: #FDD35F;
	}
	.home-nav li:nth-of-type(8) .nav-img-wrap {
		background: #D97AEB;
	}
	.home-nav li:nth-of-type(9) .nav-img-wrap {
		background: #5D9EFA;
	}
	.home-nav li:nth-of-type(10) .nav-img-wrap {
		background: #9574E7;
	}
	.home-title {
		height: 1.5rem;
	}
	.swiper-wrap .mint-swipe-item {
		background-size: cover;
	}
	.swiper-wrap .mint-swipe-indicator {
		opacity: 1;
		background: rgba(0, 0, 0, .4);
	}
	.swiper-wrap .mint-swipe-indicator.is-active  {
		background: $mainColor;
	}
</style>
<script>
	import routerScript from '@/components/routerScript.vue';
	import fetch from '@/config/fetch.js';
	import { getCurrentPosition } from '@/assets/js/Amap.js';
	// import { getCurrentPosition } from '@/assets/js/Bmap.js';
	import shopList from '@/wx_user/page/home/children/shopList.vue';

	export default {
		components: {
			routerScript,
			shopList
		},
		data() {
			return {
				imgDate: [
					{url: 'https://ico.zhongxiang51.com/20180515161817.jpg'},
					{url: 'https://ico.zhongxiang51.com/20180515161824.jpg'},
					{url: 'https://ico.zhongxiang51.com/20180515161829.jpg'},
					{url: 'https://ico.zhongxiang51.com/20180515161839.jpg'},
					{url: 'https://ico.zhongxiang51.com/20180515161834.jpg'}
				],
				address: '正在定位...',
				params: {
					pageNo: 1
				},
				tips: '',
				industryList: {},
				bizList: [],
				loadding: true,
				totalPage: 1,
				shopListData: {}
			}
		},
		created() {

		},
		mounted() {
			// this.getPositon();
		},
		methods: {
			//地图加载完毕
			AmapFinsh() {
				this.getPositon();
				// window.init = () => {
				// 	this.getPositon();
				// }
			},
			// 加载更多
			loadMore(pageNo) {
				this.params['pageNo'] = pageNo;
				this.getIndexList();
			},
			// 点击跳转
			toLink(type, info) {
				switch(type) {
					case 'location': 
						this.$router.push({
							path: '/home/homeAddress'
						})
					break;
					case 'searchShop':
						this.$router.push({
							path: '/searchShop'
						})
					break;
					case 'industry': 
						let industryType = '';
						if(info.industryCode == '101') {
							industryType = 1;
						}  
						else if(info.industryCode == '103') {
							industryType = 0;
						} else {
							return;
						}

						this.$router.push({
							path: '/searchShop',
							query: {
								industryType: industryType
							}
						})
					break;
				}

			},
			//店铺列表
			getIndexList() {
				fetch.fetchGet('/index/v3.2/index', this.params).then(res => {
					let result = res.data;
					if(result.industryList) {
						this.industryList = res.data.industryList;
					}
					this.bizList = this.bizList.concat(result.bizList);

					this.$set(this.shopListData, 'shopList', this.bizList);
					this.$set(this.shopListData, 'page', {
						pageNo: res.data.pageNo,
						totalPage: res.data.totalPage
					})
					this.$refs.shopList.canLoadMore();

				}).catch(res => {

				})
			},
			//获取本地缓存定位信息
			getLocalStoragePosition() {
				let positionInfo = Tools.getLocalStorage('positionInfo');
				this.params['longitude'] = positionInfo['longitude'];
				this.params['latitude'] = positionInfo['latitude'];
				this.address = positionInfo['address'];
				this.getIndexList();
			},
			//定位回调
			positionCallBack(type, result) {
				if(result == 'success') {
					sessionStorage.geoHash = 'finishLocation';
					this.getLocalStoragePosition();
				}
			},
			//地理位置定位
			getPositon() {
				if(sessionStorage.geoHash) {
					this.getLocalStoragePosition();
					return;
				}
				this.$indicator.open();
				getCurrentPosition(this.positionCallBack);
			}
		},
	}
</script>