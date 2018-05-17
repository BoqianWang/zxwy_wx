<template>
	<div class="bg-white">
		<div class="home-title">
			<!-- 轮播图 -->
			<mt-swipe class="swiper-wrap" :auto="3000">
			  <mt-swipe-item v-for="item in imgDate" 
			  :style="{backgroundImage: 'url(' + item.url + ')'}">
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- 导航栏 -->
		<div class="home-nav p-ten clearfix font-12 color-3 text-center">
			<li class="p-ten">
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
			</li>
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
			<div class="home-shop-list p-ten">
				<div class="shop-list-block flex-box p-t-ten p-b-ten">
					<!-- <img src="https://fuss10.elemecdn.com/e/7d/9854d2f95050092a008b4e3ee29e6png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/"> -->
					<div class="block-list-img" style="background-image: url(https://fuss10.elemecdn.com/e/7d/9854d2f95050092a008b4e3ee29e6png.png?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/);"></div>
					<div class="p-l-ten flex-1">
						<p>
							<span class="font-18 color-3">九毛九(华强茂业店)</span>
							<span class="tips tips-takeout"></span>
						</p>
						<p class="color-3 font-12 flex-box justify-s-b block-list-order">
							<span>
							 	 <span>4.7</span>
							 	 <span class="p-l-ten">月售9999单</span>
							</span>	
						 	 <span class="color-7">44分钟 661km</span>
						 </p>
						 <p class="color-3 font-12 block-list-desc">
						 	<span>笋岗商圈</span>
						 	<span>起送¥25</span>
						 	<span>配送¥5</span>
						 </p>
						 <div class="color-3 font-12 block-list-active">
							 <p class="flex-box justify-s-b">
							 	<span>
							 		<span class="tips tips-first"></span>
							 		新用户首单立减
							 	</span>
							 	<span class="color-7 flex-box align-center">
							 	  <span class="iconfont icon-sanjiaoxing-down"></span>3个活动
							 	</span>
							 </p>
							 <div style="display: none;">
								 <p>
								 	<span class="tips tips-sub"></span>
								 	满减活动
								 </p>
								 <p>
								 	<span class="tips tips-ticket"></span>
								 	代金券优惠
								 </p>
								 <p>
								 	<span class="tips tips-intergral"></span>
								 	现金积分
								 </p>
							 </div>
						 </div>
					</div>
				</div>
				<div class="shop-list-block flex-box p-t-ten p-b-ten">
					<!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393563458&di=492f063402dafe3aeb1ab57df2d7c3f3&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170601%2F826183f936d0454c8e43265ad26d5021_th.jpg"> -->
					<div class="block-list-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393563458&di=492f063402dafe3aeb1ab57df2d7c3f3&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170601%2F826183f936d0454c8e43265ad26d5021_th.jpg);"></div>
					<div class="p-l-ten flex-1">
						<p>
							<span class="font-18 color-3">九毛九(华强茂业店)</span>
							<!-- <span class="tips tips-takeout"></span> -->
						</p>
						<p class="color-3 font-12 flex-box justify-s-b block-list-order">
							<span>
							 	 <span>4.7</span>
							 	 <span class="p-l-ten">月售9999单</span>
							</span>	
						 	 <span class="color-7">44分钟 661km</span>
						 </p>
						 <p class="color-3 font-12 block-list-desc">
						 	<span>笋岗商圈</span>
						 	<span>起送¥25</span>
						 	<span>配送¥5</span>
						 </p>
						 <div class="color-3 font-12 block-list-active">
							 <p class="flex-box justify-s-b">
							 	<span>
							 		<span class="tips tips-first"></span>
							 		新用户首单立减
							 	</span>
							 	<span class="color-7 flex-box align-center">
							 	  <span class="iconfont icon-sanjiaoxing-down"></span>3个活动
							 	</span>
							 </p>
							 <div style="display: block;">
								 <p>
								 	<span class="tips tips-sub"></span>
								 	满减活动
								 </p>
								 <p>
								 	<span class="tips tips-ticket"></span>
								 	代金券优惠
								 </p>
								 <p>
								 	<span class="tips tips-intergral"></span>
								 	现金积分
								 </p>
							 </div>
						 </div>
					</div>
				</div>
				<div class="shop-list-block flex-box p-t-ten p-b-ten">
					<!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393667465&di=caa2346f4acc7b414fbb4b92871defc9&imgtype=0&src=http%3A%2F%2Fwww.szquanli.com%2Fuploads%2Fallimg%2F160621%2F2-160621091242-51.png"> -->
					<div class="block-list-img" style="background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393667465&di=caa2346f4acc7b414fbb4b92871defc9&imgtype=0&src=http%3A%2F%2Fwww.szquanli.com%2Fuploads%2Fallimg%2F160621%2F2-160621091242-51.png);"></div>
					<div class="p-l-ten flex-1">
						<p>
							<span class="font-18 color-3">九毛九(华强茂业店)</span>
							<span class="tips tips-takeout"></span>
						</p>
						<p class="color-3 font-12 flex-box justify-s-b block-list-order">
							<span>
							 	 <span>4.7</span>
							 	 <span class="p-l-ten">月售9999单</span>
							</span>	
						 	 <span class="color-7">44分钟 661km</span>
						 </p>
						 <p class="color-3 font-12 block-list-desc">
						 	<span>笋岗商圈</span>
						 	<span>起送¥25</span>
						 	<span>配送¥5</span>
						 </p>
						 <div class="color-3 font-12 block-list-active">
							 <p class="flex-box justify-s-b">
							 	<span>
							 		<span class="tips tips-first"></span>
							 		新用户首单立减
							 	</span>
							 	<span class="color-7 flex-box align-center">
							 	  <span class="iconfont icon-sanjiaoxing-down"></span>3个活动
							 	</span>
							 </p>
							 <div style="display: none;">
								 <p>
								 	<span class="tips tips-sub"></span>
								 	满减活动
								 </p>
								 <p>
								 	<span class="tips tips-ticket"></span>
								 	代金券优惠
								 </p>
								 <p>
								 	<span class="tips tips-intergral"></span>
								 	现金积分
								 </p>
							 </div>
						 </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import "../../style/mixin";
	.block-list-order {
		padding: .02rem 0;
	}
	.block-list-active p {
		padding-top: .05rem;
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
	export default {
		data() {
			return {
				imgDate: [
					{url: 'http://chuantu.biz/t6/311/1526372344x-1404795840.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372482x-1404792897.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372570x-1404792897.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372600x-1404792897.jpg'},
					{url: 'http://chuantu.biz/t6/311/1526372628x-1404792897.jpg'},
				]
			}
		},
		mounted() {

		},
		methods: {

		},
	}
</script>