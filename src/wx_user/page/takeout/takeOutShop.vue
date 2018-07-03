<template>
	<div class="bg-white" :class="{'blur': !isInBussiness['is']}">
		<router-script src="https://webapi.amap.com/maps?v=1.4.6&key=e50ead2320592e7db5bb32cb484c180b" @load-finsh="AmapFinsh"></router-script>
		<div class="takeout-wrap" id="takeout-wrap">
			<div class="takeout-shop-t-w" @click="showShopDetial">
				<!-- 头部 -->
				<div class="shop-title rel" :style="{backgroundImage: 'url(' + defaultImg + ')'}">
					<p class="abs" v-if="shopInfo['shopLogo']" :style="'background-image: url(' + shopInfo['shopLogo'] + ');'">
					</p>
				</div>
				<!-- 描述 -->
				<div class="shop-desc">
					<p class="text-center">
						<b class="shop-name">{{shopInfo['shopName']}}</b>
						<span class="tips tips-takeout" v-if="shopInfo['isWm'] == 1"></span>
					</p>
					<div class="text-center shop-desc-detail">
						<div class="p-t-ten detail-sales color-3">
							<!-- <span>4.7</span> -->
							<span>销量{{shopInfo['goodsSales']}}</span>
							<span>{{shopInfo['businessName']}}</span>
							<span>{{shopInfo['distance']}} {{shopInfo['expectTime'] > 0 ? shopInfo['expectTime'] : '40'}}分钟</span>
						</div>
						<div class="p-t-ten font-12 color-7">
							<!-- 欢迎光临，用餐高峰期请提前下单，谢谢	 -->
							{{shopInfo['shopIntro']}}
						</div>
						<div class="p-t-ten color-6" v-if="shopInfo['activitysList'] && shopInfo['activitysList'].length > 0">
							<span v-if="shopInfo['activitysList'][0]['activityType'] == 0" class="tips tips-sub"></span>
							<span v-else-if="shopInfo['activitysList'][0]['activityType'] >= 8" class="tips tips-ticket"></span>
							<span class="p-r-ten">
								{{shopInfo['activitysList'][0]['activitys'][0]['activityDescription']}}
							</span>
							<span class="color-9 font-12 p-l-ten rel">
							  <span class="shop-down iconfont icon-sanjiaoxing-down abs"></span>
							  <span>{{shopInfo['activitysList'].length}}个活动</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 推荐 -->
			<div class="p-l-ten p-r-ten m-t-ten flex-box text-center selected">
				<span class="flex-1" 
				:class="{actived: switchSelectType == 'shop'}" 
				@touchstart="switchSelect('shop')">商品</span>
				<span class="flex-1">评价</span>
				<span class="flex-1" :class="{actived: switchSelectType == 'merchant'}"  @touchstart="switchSelect('merchant')">商家</span>
			</div>
			<!-- 菜单详情 -->
			<div class="shop-container">
				<div v-show="switchSelectType == 'shop'">
					<div class="shop-con-wrap flex-box" :style="{height: height - 42 + 'px'}">
						<ul class="font-12 color-7" id="classify-list">
							<li v-for="(item, index) in menuList" @click="changeScroll(index)">
								<span style="-webkit-box-orient: vertical;">{{item.categoryName}}</span>
								<mt-badge v-show="shopCartDetail['goodsCategoryId'][item['categoryId']]" class="abs category-tips" type="error" size="small" >
									{{shopCartDetail['goodsCategoryId'][item['categoryId']]}}
								</mt-badge>
							</li>
							<!-- 
							<li>
								<span style="-webkit-box-orient: vertical;">分类名称4</span>
							</li> 
						-->
						</ul>
						<section class="flex-1 p-ten section-menu" id="section-menu">
							<div class="scoller-list" v-for="item in menuList">
								<p class="color-3 con-wrap-title">
									{{item.categoryName}}
									<span class="color-9 font-12">{{item.categoryDescribe}}</span>
								</p>
								<div>
									<div class="wrap-block flex-box p-t-ten p-b-ten" v-for="info in item['goodsList']">
										<div class="menu-img font-15" :style="'background-image: url(' + info['goodsPic'] + ');'">
											<div v-if="info['isAvailable'] == 0" 
											class="goods-is-available white-f text-center">
												不可售
											</div>
											<div v-if="info['shelves'] == 0" 
											class="goods-is-available white-f text-center">
												已下架
											</div>
										</div>
										<div class="flex-1 p-l-ten menu-detail">
											<p class="color-3 menu-d-title text_over">
												<span>{{info.goodsName}}</span>
											</p>
											<p class="font-12 color-6 menu-d-desc text_over">
												<span>{{info.goodsDescribe}}</span>
											</p>
											<p class="font-12 color-6">
												<span v-if="info['sku'][0].inventory != -1">库存{{info['sku'][0].inventory}}</span>
												<span>销量{{info.goodsSales}} </span>
											</p>
											<!-- <p class="menu-d-tag"> -->
												<!-- <span class="tag-desc">商品标签</span> -->
												<!-- <span class="tag-desc">6折</span>
												<span>每单限2份</span>
												<span class="tag-residue">剩9分</span> -->
											<!-- </p> -->
											<div class="p-t-ten flex-box align-justify">
												<div v-if="info['sku'].length == 1">
													<span class="price">¥{{info['sku'][0].discountPrice}}</span>
													<span class="color-7" style="font-size: 8px;">
														/
														<span>{{info.goodsUnit}}</span> 
														<del v-if="info['sku'][0].price != info['sku'][0].discountPrice">¥{{info['sku'][0].price}}</del>
													</span>
												</div>
												<div v-else>
													<span class="price">¥{{info['sku'][0].discountPrice}}</span>
													<span class="color-7" style="font-size: 8px;">起</span>
												</div>
												<add-menu :menu-data="info" @send-item="choseAttributeHanlde"></add-menu>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- <div class="scoller-list">
								<p class="color-3 con-wrap-title">分类名称2</p>
								<div>
									<div class="wrap-block flex-box p-t-ten p-b-ten">
										<div class="menu-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526031684705&di=07454173311abceebfdd3c1578fa0527&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081110%2F0042040253000423_b.jpg);">
											
										</div>
										<div class="flex-1 p-l-ten menu-detail">
											<p class="color-3 menu-d-title text_over">
												<span>菜品名称撒旦法阿斯顿发送到防守打法</span>
											</p>
											<p class="font-12 color-6 menu-d-desc text_over">
												<span>菜品描述菜品描述菜品描述是的范德萨防守打法是</span>
											</p>
											<p class="font-12 color-6">
												<span>月首355</span>
											</p>
											<p class="menu-d-tag">
												<span class="tag-desc">商品标签</span>
											</p>
											<div class="p-t-ten flex-box align-justify">
												<div>
													<span class="price">¥38.6</span>
													<span class="color-7" style="font-size: 8px;">
														/份 <del>¥44</del>
													</span>
												</div>
												<addMenu></addMenu>
											</div>
										</div>
									</div>
								</div>
							</div> -->
						</section>
					</div>
					<footer class="shop-cart align-justify rel flex-box" style="z-index: 3333;">
						<div v-if="!isInBussiness['is']" class="abs is-in-bussiness color-3 font-15 p-r-ten p-l-ten">{{isInBussiness['tips']}}</div>
						<div class="shop-cart-icon text-center abs animated" :class="{'empty-cart': shopCartDetail['count'] <= 0, 'bounce': bounce > 0 }" @click="showShopCartDetail">
							<mt-badge class="abs cart-tips" type="error" size="small" v-if="shopCartDetail['count'] > 0">
								{{shopCartDetail['count']}}
						    </mt-badge>
							<span class="iconfont icon-cart white-f"></span>
						</div>
						<div class="shop-cart-money">
							<p class="white-f" v-show="shopCartDetail['money'] > 0">¥{{shopCartDetail['money']}}</p>
							<p class="color-9 addtion-money">另需要配送费{{shopInfo['expressFee']}}元</p>
						</div>
						<div v-if="shopCartDetail['money'] > 0 && shopCartDetail['money'] >= shopInfo['startSendFee']" class="white-f text-center shop-cat-pay to-pay" @click="toPay()">
							<span>去结算</span>
						</div>
						<div v-else-if="shopCartDetail['money']" class="white-f text-center shop-cat-pay to-pay cano-to-pay">
							<span>还差¥{{(shopInfo['startSendFee'] - shopCartDetail['money']).toFixed(2)}}</span>
						</div>
						<div v-else class="white-f text-center shop-cat-pay to-pay cano-to-pay">
							<span>¥{{shopInfo['startSendFee']}}起送</span>
						</div>
					</footer>
				</div>
				<div v-show="switchSelectType == 'merchant'" class="shop-detial" :style="{height: height - 42 + 'px',display: 'none'}">
					<div class="p-ten">
						<div class="flex-box p-b-ten m-t-ten addresss-wrap">
							<div class="flex-box align-justify">
								<span class="iconfont icon-map p-r-ten address-m color-9">
								</span>
								<span class="font-15 color-3">  
									{{shopInfo['shopStreet']}}
								</span>
							</div>
							<a :href="'tel:' + tel">
								<p class="iconfont icon-phone m-l-ten p-l-ten p-r-ten address-p color-7"></p>
							</a>
						</div>
						<div class="shop-detial-img p-t-ten p-b-ten">
							<ul class="clearfix" style="width: 1200px;">
								<li class="m-r-ten" 
								:style="'background-image: url(' + shopInfo['shopImgs'] + ');'"></li>
								<li class="m-r-ten" 
								:style="'background-image: url(' + shopInfo['businessLicense'] + ');'"></li>
								<li class="m-r-ten" 
								:style="'background-image: url(' + shopInfo['cateringLicence'] + ');'"></li>
								<li class="m-r-ten"></li>
								<li class="m-r-ten"></li>
							</ul>
						</div>
						<div class="shop-cell m-t-ten">
							<div class="flex-box align-justify p-t-ten p-b-ten shop-cell-list">
								<p class="flex-box align-center">
									<span class="iconfont icon-webicon203 cell-safe color-9"></span>
									<span class="color-3 font-15">查看店铺安全档案</span>
								</p>
								<p class="iconfont icon-more color-9"></p>
							</div>
							<div class="flex-box align-justify p-t-ten p-b-ten shop-cell-list">
								<p class="flex-box align-center">
									<span class="cell-server color-9 iconfont icon-shigongrenyuan p-r-ten"></span>
									<span class="color-3 font-15">配送服务: 高品质配送服务</span>
								</p>
							</div>
							<div class="flex-box align-justify p-t-ten p-b-ten shop-cell-list">
								<p class="flex-box align-center">
									<span class="cell-server color-9 iconfont icon-task-management p-r-ten"></span>
									<span class="color-3 font-15">配送时间: {{shopInfo['distributionTime']}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 店铺详情 -->
			<mt-popup v-model="popupVisible" position="bottom">
			  <div class="p-ten popup-shop-detail rel">
			  	  <span class="shop-d-close abs iconfont icon-close p-ten"  @click="showShopDetial"></span>
			  	  <p class="color-3 font-15 p-b-ten m-t-ten">优惠</p>
			  	  <div class="color-3 font-12" style="max-height: 400px; overflow: auto;">
			  	  	  <li v-for="info in shopInfo['activitysList']">
						 <p class="flex-box align-center p-b-ten" v-if="info['activityType'] <= 2" v-for="item in info['activitys']">
						 	<span class="tips tips-sub"></span>{{item['activityDescription']}}
						 </p>
						 <p class="flex-box align-center p-b-ten" v-if="info['activityType'] >= 8" v-for="item in info['activitys']">
						 	<span class="tips tips-ticket"></span>{{item['activityDescription']}}
						 </p>
					  </li>
				  	  <p class="color-3 font-15 shop-d-top">配送</p>
					  <div class="color-6 font-12">
					   	 <p>
					   	 	<span>起送¥{{shopInfo['startSendFee']}} </span>
					   	 	<span>配送¥{{shopInfo['expressFee']}} </span>  
					   	 	<span>{{shopInfo['expectTime'] > 0 ? shopInfo['expectTime'] : '40'}}分钟</span>
					   	 </p>
					   	 <p>
					   	 	配送时间: 
					   	    {{shopInfo['distributionTime']}}
					     </p>
					  </div>
				  	  <p class="color-3 font-15 shop-d-top">公告</p>
					  <div class="color-6 font-12">
					  	   {{shopInfo['shopNotices']}}
					  </div>
			  	  </div>
			  </div>
			</mt-popup>
			<!-- 购物车 -->
			<mt-popup v-model="shopCartVisible" position="bottom">
				<div class="popup-shop-detail popup-short-cat font-15">
					<div class="p-ten flex-box justify-s-b p-short-c-t">
						<p class="color-3 font-b">已选商品</p>
						<p class="color-7" @click="clearShopCart">
							<span class="iconfont icon-delete"></span>
							<span>清空</span>
						</p>
					</div>
					<div class="short-cart-block p-l-ten p-r-ten ">
						<li v-for="item in shopCartDetail['list']" class="flex-box align-center justify-s-b p-t-ten p-b-ten">
							<div>
								<p>{{item['goodsName']}}</p>
								<span class="font-12 color-9">{{item['goodsTaste']}}</span>
							</div>
							<span>
								<span class="moeny price">¥{{item['discountPrice']}}</span>
								<shopCartAddMenu :menu-data-detail="item"></shopCartAddMenu>
							</span>
						</li>
					</div>
					<p class="p-t-ten" style="background: #F9F9F9;"></p>
					<div class="flex-box align-center justify-s-b p-ten">
						<p>打包盒</p>
						<p class="price p-r-ten">¥{{shopCartDetail['boxPrice']}}</p>
					</div>
				</div>
			</mt-popup>
			<chose-attribute ref="choseAttribute"></chose-attribute>
		</div>
	</div>
</template>

<script>
	import routerScript from '@/components/routerScript.vue';
	import addMenu from './children/takeoutshop/addMenu.vue';
	import shopCartAddMenu from './children/takeoutshop/shopCartAddMenu.vue';
	import choseAttribute from './children/takeoutshop/choseAttribute.vue';
	import fetch from '@/config/fetch.js';
	import { getCurrentPosition } from '@/assets/js/Amap.js';
	export default {
		components: {
		    addMenu,
		    shopCartAddMenu,
		    choseAttribute,
		    routerScript
		},
		data() {
			return {
				defaultImg: 'https://ico.zhongxiang51.com/sj_pic_tp@2x.png',
				height: 0,
				popupVisible: false,
				shopCartVisible: false,
				switchSelectType: 'shop',
				// positionInfo: Tools.getLocalStorage('positionInfo'),
				params: {
					longitude: this.$route.query.longitude,
					latitude: this.$route.query.latitude,
					shopAuthenticateId: this.$route.query.shopAuthenticateId
				},
				shopInfo: {},
				//分类列表数据
				categoryListDate: [],
				//菜单列表数据
				MenuListDate: [],
				//菜单列表
				menuList: [],

				bounce: false,
				// itemMenudata: {},
				//是不在在营业中
				isInBussiness: {
					is: true,
					tips: ''
				}
			}
		},
		mounted() {
			// this.init();
		},
		created() {
			this.$store.commit('initShopCart', this.params['shopAuthenticateId']);
		},
		computed: {
			//购物车详细信息
			shopCartDetail() {
				let detail = this.$store.getters.shopCartDetail;
				if(detail['count'] <= 0) {
					this.shopCartVisible = false;
				} else {
					this.changeBounce();
				}
				return detail;
			},
			tel() {
				if(this.shopInfo['tel']) {
					return this.shopInfo['tel'].split(',')[0];
				}
			}
		},
		methods: {
			isInBussinessHandle(shopInfo) {
				if(shopInfo['isWm'] == 0) {
					this.isInBussiness['is'] = false;
					this.isInBussiness['tips'] = '该商家没有开启外卖功能!';
				} else if(shopInfo['shopStatus'] == 0 || shopInfo['shopStatus'] == 3) {
					this.isInBussiness['is'] = false;
					this.isInBussiness['tips'] = '该商家休息中,暂不营业!';
				} else if(shopInfo['isDistributionTime'] == 0) {
					this.isInBussiness['is'] = false;
					this.isInBussiness['tips'] = '不在配送时间内!';
				}
			},
			//选择属性规格
			choseAttributeHanlde(date) {
				// alert(1)
				// this.itemMenudata = date;
				this.$refs.choseAttribute.initShopCart();
			},
			//购物车特效
			changeBounce() {
				this.bounce = true;
				setTimeout(() => {
					this.bounce = false;
				}, 1000)
			},
			//清空购物车
			clearShopCart() {
				this.$store.commit('clearShopCart');
			},
			//去结算
			toPay() {
				if(this.isInBussiness['is']) {
					location.href = './index.html#/pay/takeOutOrder?shopAuthenticateId=' + this.params['shopAuthenticateId'];
				}	
				
			},
			//显示商家信息
			showShopDetial() {
				this.popupVisible = !this.popupVisible;
			},
			//显示购物车商品
			showShopCartDetail() {
				if(this.shopCartDetail['count'] <= 0) {
					return
				}
				this.shopCartVisible = !this.shopCartVisible;
			},
			// init() {
			// 	// this.getTakeOutShop();
				
			// },
			//获取外卖菜单
			getTakeoutMenu() {
				fetch.fetchPost('/goods/v3.2/toGoodsList', {
					shopAuthenticateId: this.params['shopAuthenticateId']
				}).then(res => {
					let data = res.data;
					for(let item of data) {
						if(item['goodsList'].length <= 0) {
							continue;
						}
						let categoryItem = { 
							categoryName: item['categoryName'],
							categoryId: item['categoryId']
						};
						let MenuListItem = {
							categoryDescribe: item['categoryDescribe'],
							goodsList: item['goodsList'],
							categoryName: item['categoryName'],
							
						};
						this.categoryListDate.push(categoryItem);
						this.MenuListDate.push(MenuListItem);

					}
					this.menuList = this.menuListSort(data)
					setTimeout(() => {					
						this.DOMOptions();
					}, 10)
				}).catch(res => {

				})
			},
			//排序
			menuListSort(arr) {
				let tem = null,
					len = arr.length;
				for(var i = 0; i < len; i++) {
					if(arr[i]['goodsList'] && arr[i]['goodsList'].length) {
						this.menuListSort(arr[i]['goodsList']);
					}
					for(var j = 0; j < len - 1; j++) {
						if(arr[j]['sequence'] > arr[j + 1]['sequence']) {
							tem = arr[j];
							arr[j] = arr[j + 1];
							arr[j + 1] = tem;
						}
					}
				}
				return arr;
			},
			AmapFinsh() {
				if(sessionStorage.geoHash) {
					this.getTakeOutShop();
				} else {
					this.$indicator.open('定位中...');
					getCurrentPosition((type, res) => {
						if(res == 'success') {
							sessionStorage.geoHash = 'finishLocation';
							this.getTakeOutShop();
						}
					})
				}
			},
			//获取店铺位置
			// getShopPosition() {
			// 	if(this.params['longitude']) {
			// 		this.getTakeOutShop();
			// 	} else {

			// 	}
			// },
			//获取店铺资料
			getTakeOutShop() {
				// if(this.positionInfo) {
				let positionInfo = Tools.getLocalStorage('positionInfo');
				this.params['longitude'] = positionInfo['longitude'];
				this.params['latitude'] = positionInfo['latitude']
				// }
				fetch.fetchPost('/index/v3.2/toBizPage', this.params).then(res => {
					this.getTakeoutMenu();
					this.shopInfo = res.data;
					Tools.setLocalStorage('shopInfo', this.shopInfo);
					this.isInBussinessHandle(this.shopInfo);
					//获取菜单
				}).catch(res => {

				})
			},
			//tab切换
			switchSelect(type) {
				this.switchSelectType = type;
			},
			//dom操作
			DOMOptions() {
				//计算屏幕高度
				this.height = document.documentElement.clientHeight;
				//菜单容器
				this.sectionMenu = document.querySelector('#section-menu');
				//左侧菜单列表
				this.classifyList = document.querySelectorAll('#classify-list > li');
				//分类数量
				this.ListCount = this.classifyList.length;
				//右侧菜单列表
				this.sectionMenuList = this.sectionMenu.children;
				// 菜单起始高度
				this.MenuListInitTop = this.sectionMenuList[0].offsetTop;
				//初始菜单index
				this.currentIndex = 0;
				this.sectionMenu.addEventListener('scroll', (e) => {
					this.scollEvent();
				});
				this.showCurrentClassify(this.currentIndex, 'rel active');
				// this.clickEvent();
			},
			// 滚动事件
			scollEvent() {
				//body滚动条滚动
				let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
					MenuScrollTop = this.sectionMenu.scrollTop;

				document.documentElement.scrollTop = document.body.scrollTop = MenuScrollTop;

				for(let i = 0; i < this.ListCount; i++){
					let MenuListTop = this.sectionMenuList[i].offsetTop - this.MenuListInitTop;
					if(MenuScrollTop >= MenuListTop) {
						this.currentIndex = i;
					}
				}
				this.showCurrentClassify(this.currentIndex, 'rel active');
			},
			changeScroll(index) {
				this.sectionMenu.scrollTop = this.sectionMenuList[index].offsetTop - this.MenuListInitTop;
				// this.scrollAniamted(this.sectionMenu, this.sectionMenuList[index].offsetTop - this.MenuListInitTop);
			},
			//高亮显示当前分类
			showCurrentClassify(index, className) {
				for(let i = 0; i < this.ListCount; i++) {
					this.classifyList[i].className = 'rel';
				}
				this.classifyList[index].className = className;
			},
			// 滚动动画
			scrollAniamted(element, target) {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					let speed = (target  - element.scrollTop) / 12;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if(element.scrollTop == target) {
						clearInterval(this.timer);
						return;
					}
					element.scrollTop = element.scrollTop + speed;
				}, 16);

			}
		}
	}
</script>
<style scoped lang="scss">
@import "../../style/mixin";
@import "../../style/iconfont/iconfont.css";

	.blur {
		-webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
	    filter: grayscale(100%);
	}
	.animated {
	  -webkit-animation-duration: 1s;
	  animation-duration: 1s;
	  -webkit-animation-fill-mode: both;
	  animation-fill-mode: both;
	}
	@-webkit-keyframes bounce {
	  from,
	  20%,
	  53%,
	  80%,
	  to {
	    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	    -webkit-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }

	  40%,
	  43% {
	    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    -webkit-transform: translate3d(0, -30px, 0);
	    transform: translate3d(0, -30px, 0);
	  }

	  70% {
	    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    -webkit-transform: translate3d(0, -15px, 0);
	    transform: translate3d(0, -15px, 0);
	  }

	  90% {
	    -webkit-transform: translate3d(0, -4px, 0);
	    transform: translate3d(0, -4px, 0);
	  }
	}

	@keyframes bounce {
	  from,
	  20%,
	  53%,
	  80%,
	  to {
	    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
	    -webkit-transform: translate3d(0, 0, 0);
	    transform: translate3d(0, 0, 0);
	  }

	  40%,
	  43% {
	    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    -webkit-transform: translate3d(0, -30px, 0);
	    transform: translate3d(0, -30px, 0);
	  }

	  70% {
	    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
	    -webkit-transform: translate3d(0, -15px, 0);
	    transform: translate3d(0, -15px, 0);
	  }

	  90% {
	    -webkit-transform: translate3d(0, -4px, 0);
	    transform: translate3d(0, -4px, 0);
	  }
	}

	.bounce {
	  -webkit-animation-name: bounce;
	  animation-name: bounce;
	  -webkit-transform-origin: center bottom;
	  transform-origin: center bottom;
	}
	.category-tips {
		right: 0;
		top: .04rem;
	}
	.popup-short-cat {
		/*padding-bottom: .7rem;*/
		.p-short-c-t {
			background: #F9F9F9;
		}
		.moeny {
			padding-right: .3rem;
		}
		.short-cart-block {
			max-height: 244px;
			overflow: auto;
			li {
				border-bottom: 1px solid #F9F9F9;
			}
		}
	}
	.popup-shop-detail {
		width: 3.76rem;
		padding-bottom: .8rem;
		.shop-d-top {
			padding: .2rem 0 .1rem 0;
		}
		.shop-d-close {
			font-size: .2rem;
			right: 0;
			top: 0;
			font-weight: bold;
		}
	}
	.shop-detial {
		.addresss-wrap {
			border-bottom: 1px solid #eee;
			.address-m {
				font-size: .24rem;
			}
			.address-p {
				font-size: .24rem;
			}
			.address {
				border-right: 1px solid #eee;
			}
		}
		.shop-detial-img {
			width: 100%;
			overflow: auto;
			li {
				float: left;
				width: .94rem;
				height: .7rem;
				background: #eee;
				background-size: cover;
			}
		}
		.shop-cell {
			.cell-safe {
				font-size: .3rem;
			}
			.cell-server {
				font-size: .24rem;
			}
			.shop-cell-list {
				border-bottom: 1px solid #eee;
			}
			.shop-cell-list:first-child {
				border-top: 1px solid #eee;
			}
		}
	}
	.align-justify {
		align-items: center;
		justify-content: space-between;
	}
	.shop-cart {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: .52rem;
		background: #313131;
		z-index: 3333;
		/*align-items: center;
		justify-content: space-between;*/
		.is-in-bussiness {
			filter: none;
			height: .2rem;
			line-height: .2rem;
			right: 0;
			top: -.2rem;
			background: #eee;
		}
		.shop-cart-money {
			padding-left: .7rem;
			font-size: .18rem;
		}
		.addtion-money {
			font-size: .09rem;
		}
		 .shop-cat-pay {
		 	width: 1.2rem;
		 	height: 100%;
		 	line-height: .52rem;
		 	font-size: .15rem;
		 }
		 .to-pay {
		 	background: linear-gradient(left, #FFB911, $mainColor);
		 	background: -webkit-linear-gradient(left, #FFB911, $mainColor);
		 }
		 .cano-to-pay {
		 	color: #999;
		 	background: none;
		 }
		 .cart-tips {
		 	right: -.04rem;
		 	top: 0;
		 }
		.shop-cart-icon {
			height: .5rem;
			width: .5rem;
			background: #FF771A;
			border-radius: 50%;
			left: .1rem;
			top: -.1rem;
			.icon-cart {
				font-size: .24rem;
				line-height: .5rem;
				font-weight: bold;
			}
		}
		.empty-cart {
			background: #EEE;
			.icon-cart {
				color: #777;
			}
		}
	}
	.takeout-wrap {
		width: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}
	.shop-title {
		height: 1.2rem;
/*		background: #FF6E15;
*/		background-size: cover;
	}
	.shop-title > p {
		width: .8rem;
		height: .8rem;
		background-size: cover;
		left: 50%;
		transform: translateX(-50%);
		bottom: -.2rem;	
	}
	.shop-desc {
		padding: .3rem .1rem 0;
		.p-t-ten {
			padding-top: .02rem;
		}
	}
	.shop-name {
		color: #333;
		font-size: .2rem;
	}
	.shop-desc-detail {
		font-size: .118rem;
		.shop-down {
			left: -.05rem;
			top: 0rem;	
		}
	}
	.shop-desc-detail .detail-sales span + span:before {
		content: "|";
		padding: 0 .1rem;
		color: #d0cece;
	}
	.selected {
		/*height: 42px;*/
		line-height: 42px;
		border-bottom: 1px solid #EEE;
		color: #999;
	}
	.selected .actived {
		border-bottom: 1px solid $mainColor;
		color: #333;
	}
	.shop-recommend {
		overflow: auto;
	}
	.shop-recommend .recommed-block {
		float: left;
		width: 1.24rem;
	}
	.shop-con-wrap {
		/*overflow: auto;*/
		.con-wrap-title {
			font-size: .15rem;
		}
		section, ul{
			height: 100%;
			overflow-y: scroll;
			padding-bottom: .52rem;
		}
		ul{
			width: .7rem;
			background: #f8f8f8;
			height: 100%;
			overflow: auto;
		}
		ul li {
			padding: .2rem .1rem;
			border-bottom: 1px solid #e8e8e8;
		}
		ul li.active {
			background: #fff;
		}
		ul li span {
			display: -webkit-box;
			-webkit-line-clamp: 3;
			overflow: hidden;
			-webkit-box-orient: vertical;
		}
	}
	.section-menu {
	}
	.wrap-block {
		.menu-img {
			width: .78rem;
			height: .8rem;
			background-size: cover;
			border-radius: 2px;
			.goods-is-available {
				width: 100%;
				height: 100%;
				line-height: .8rem;
				background: rgba(0, 0, 0, .5);
			}
		}
		.menu-detail {
			width: 1.6rem;
		}
		.menu-detail .menu-d-title{
			font-size: .18rem;
		}
		.menu-detail .menu-d-desc {
			padding: .02rem 0;

		}
		.menu-detail .menu-d-tag {
			padding-top: .04rem;
			color: $mainColor;
			font-size: .08rem;
		}
		
	}
	.price {
		color: #FF2618;
		font-size: .15rem;
	}
	.tag-desc {
		border:1px solid $mainColor;
		padding: .01rem .04rem;
		border-radius: 4px;
	}
	.tag-residue {
		border: 1px solid #FF2618;
		color: #FF2618;
		padding: .01rem .04rem;
		background-color: #FFD4D1;
		border-radius: 4px;
	}
</style>