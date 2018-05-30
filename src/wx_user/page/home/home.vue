<template>
	<div class="bg-white">
		<div class="home-title rel">
			<!-- 轮播图 -->
			<mt-swipe class="swiper-wrap" :auto="3000">
			  <mt-swipe-item v-for="item in imgDate" 
			  :style="{backgroundImage: 'url(' + item.url + ')'}">
			  </mt-swipe-item>
			</mt-swipe>
			<!-- 地址 -->
			<div class="abs address-wrap flex-box justify-s-b white-f">
				<div class="a-wrap-input flex-box align-center" @click="toLink('location')">
					<span class="iconfont icon-map font-b"></span>
					<input readonly="readonly" class="white-f font-15 font-b flex-1 p-r-ten" type="text" :value="address">
				</div>
				<div class="search-button font-b text-center" @click="toLink('searchShop')">
					<span class="iconfont icon-search"></span>
				</div>
			</div>
		</div>
		<!-- 导航栏 -->
		<div class="home-nav p-ten clearfix font-12 color-3 text-center">
			<li class="p-ten" v-for="item in industryList">
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
			<div class="home-shop-list p-ten" 
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
								 	 <!-- <span class="p-r-ten">4.7</span> -->
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
						 <div class="color-3 font-12 block-list-active rel" :class="{'click-item': item['showActive']}" @click="showItemActive(item)">
							 	<!-- <span>
							 		<span class="tips tips-first"></span>
							 		新用户首单立减
							 	</span> -->
						 	<p v-if="item['activitysVO'].length > 0" 
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
								 <!-- <p>
								 	<span class="tips tips-intergral"></span>现金积分
								 </p> -->
							 </li>
							 <!-- <p>
								 <span class="tips tips-intergral"></span>现金积分
							 </p> -->
							 <!-- <p>
							 	<span class="tips tips-ticket"></span>代金券优惠
							 </p>
							 <p>
							 	<span class="tips tips-intergral"></span>现金积分
							 </p> -->
						 </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import "../../style/mixin";
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
			width: 3rem;
			border-radius: .4rem;
			.icon-map {
				padding: 0 .05rem;
			}
			input {
				background: none;
			}
		}
		.search-button {
			width: .3rem;
			border-radius: 50%;
			line-height: 30px;
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
	.home-shop-wrap {
		padding-bottom: .6rem;
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
	import fetch from '@/config/fetch.js';
	export default {
		data() {
			return {
				imgDate: [
					{url: 'http://chuantu.biz/t6/311/1526372344x-1404795840.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372482x-1404792897.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372570x-1404792897.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372600x-1404792897.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372628x-1404792897.jpg'},
				],
				address: '正在定位...',
				params: {
					pageNo: 1
				},
				industryList: {},
				bizList: [],
				loadding: true,
				totalPage: 1
			}
		},
		created() {

		},
		mounted() {
			this.getPositon();
		},
		methods: {

			showItemActive(info) {
				if(info['showActive']) {
					this.$set(info, 'showActive', false)
				} else {
					this.$set(info, 'showActive', true)
				}
			},
			//加载更多
			loadMore() {
				this.loadding = true;
				if(this.params['pageNo'] >= this.totalPage) {
					return;
				}
				this.params['pageNo']++;
				this.getIndexList();
			},
			// 点击跳转
			toLink(type, info) {
				console.log(type);
				switch(type) {
					case 'location': 
						this.$router.push({
							path: '/home/homeAddress'
						})
					break;
					case 'searchShop':

					break;
					case 'shop':
						if(info.isWm == 1) {
							this.$router.push({
								path: '/takeout/takeOutShop',
								query: {
									longitude: this.params['longitude'],
									latitude: this.params['latitude'],
									shopAuthenticateId: info['shopAuthenticateId']
								}
							})
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
			//店铺列表
			getIndexList() {
				fetch.fetchGet('/index/v3.2/index', this.params).then(res => {
					if(res.data.industryList) {
						this.industryList = res.data.industryList;
					}
					this.bizList = this.bizList.concat(res.data.bizList);
					this.totalPage = res.data.totalPage;
					this.loadding = false;
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
				let positionInfo = {};
				if(type == 'gps') {
					positionInfo['address'] = result['formattedAddress']
					positionInfo['longitude'] = result['position']['lng'];
					positionInfo['latitude'] = result['position']['lat'];
				} else {
					positionInfo['address'] =  result['province'] + result['city'];
					positionInfo['longitude'] = result['center'][0];
					positionInfo['latitude'] = result['center'][1];
				}
				Tools.setLocalStorage('positionInfo', positionInfo);
				sessionStorage.geoHash = 'finishLocation';
				this.getLocalStoragePosition();
			},
			//地理位置定位
			getPositon() {
				if(sessionStorage.geoHash) {
					this.getLocalStoragePosition();
					return;
				}
				AMap.plugin(['AMap.Geolocation', 'AMap.CitySearch'], () => {
					this.geolocation = new AMap.Geolocation({
						timeout: 10000,
					});
					this.geolocation.getCurrentPosition((status, result) => {
						if(status == 'complete') {
							this.positionCallBack('gps', result)
						} else {
							this.geolocation.getCityInfo((status, result) => {
								this.positionCallBack('ip', result)
							})
						}
					})
				})
			}
		},
	}
</script>